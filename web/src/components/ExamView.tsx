"use client";

import Link from "next/link";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { getStage } from "@/content/curriculum";
import { t, type Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionary";
import { celebrate, play } from "@/lib/feedback";
import { isStageUnlocked, recordExam, useProgress } from "@/lib/progress";
import { lessonKey } from "@/content/curriculum";
import { useSettings } from "@/lib/settings";
import { useMounted } from "./ui";
import { CheckIcon, CloseIcon } from "./Icons";
import { RichText } from "./RichText";
import { Press } from "./ui";

export function ExamView({ locale, stageSlug }: { locale: Locale; stageSlug: string }) {
  const dict = getDictionary(locale).exam;
  const stage = getStage(stageSlug)!;
  const exam = stage.exam!;
  const progress = useProgress();
  const { track } = useSettings();
  const mounted = useMounted();
  const total = exam.questions.length;
  const [current, setCurrent] = useState(0);
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [score, setScore] = useState<number | null>(null);
  const back = `/${locale}/learn/`;
  // One minute per question; the exam submits itself when time runs out.
  const [left, setLeft] = useState(total * 60);
  const submitRef = useRef<() => void>(() => {});

  useEffect(() => {
    if (score !== null) return;
    const id = window.setInterval(() => setLeft((s) => s - 1), 1000);
    return () => window.clearInterval(id);
  }, [score]);

  useEffect(() => {
    if (left <= 0 && score === null) submitRef.current();
  }, [left, score]);

  const q = exam.questions[current];
  const chosen = answers[q.id];
  const last = current === total - 1;

  function submit() {
    const correct = exam.questions.filter((x) => answers[x.id] === x.answer).length;
    const s = Math.round((correct / total) * 100);
    recordExam(stage.slug, s, exam.passPercent);
    setScore(s);
    if (s >= exam.passPercent) {
      play("levelUp");
      celebrate(true);
    } else {
      play("wrong");
    }
  }
  submitRef.current = submit;

  function nextOrSubmit() {
    if (!last) {
      play("whoosh");
      setCurrent((c) => c + 1);
      return;
    }
    submit();
  }

  function retry() {
    setAnswers({});
    setCurrent(0);
    setScore(null);
    setLeft(total * 60);
  }

  // The exam opens only after every lesson of an unlocked stage is done.
  const ready =
    isStageUnlocked(stage.slug, progress, track) && stage.lessons.every((l) => progress.completed.includes(lessonKey(stage.slug, l.slug)));
  if (!mounted) return <div className="min-h-dvh bg-paper" />;
  if (!ready && score === null) {
    return (
      <div className="grid min-h-dvh place-items-center bg-paper p-6 text-center">
        <div className="flex max-w-sm flex-col items-center gap-4">
          <span className="text-6xl" aria-hidden="true">
            🔒
          </span>
          <p className="text-lg">{getDictionary(locale).learn.lockedLesson}</p>
          <Link href={back} className="btn-grad rounded-2xl px-6 py-3 font-display font-bold">
            {getDictionary(locale).practice.toPath}
          </Link>
        </div>
      </div>
    );
  }

  // ------------------------------------------------------------ Results
  if (score !== null) {
    const passed = score >= exam.passPercent;
    const r = 52;
    const c = 2 * Math.PI * r;
    return (
      <div className="fixed inset-0 z-40 overflow-y-auto bg-paper" style={{ paddingTop: "env(safe-area-inset-top, 0px)" }}>
        <div className="mx-auto flex max-w-xl flex-col items-center gap-6 px-4 py-10 text-center">
          <div className="relative grid place-items-center">
            <svg viewBox="0 0 120 120" className="size-44 -rotate-90" aria-hidden="true">
              <circle cx="60" cy="60" r={r} fill="none" stroke="var(--line)" strokeWidth="12" />
              <motion.circle
                cx="60"
                cy="60"
                r={r}
                fill="none"
                stroke={passed ? "var(--ok)" : "var(--coral)"}
                strokeWidth="12"
                strokeLinecap="round"
                strokeDasharray={c}
                initial={{ strokeDashoffset: c }}
                animate={{ strokeDashoffset: c * (1 - score / 100) }}
                transition={{ duration: 1.2, ease: "easeOut" }}
              />
            </svg>
            <motion.span
              className="absolute font-display text-4xl font-bold tabular-nums"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.6, type: "spring" }}
            >
              {score}%
            </motion.span>
          </div>
          <div>
            <h1 className="text-3xl font-bold">
              {passed ? "🏆 " : ""}
              {passed ? dict.passed : dict.failed}
            </h1>
            <p className="text-muted">{dict.score.replace("{score}", String(score))}</p>
          </div>

          <div className="flex w-full flex-col gap-2">
            {!passed && (
              <Press onClick={retry} className="h-14 rounded-2xl btn-grad font-display text-lg font-bold">
                {dict.retry}
              </Press>
            )}
            {passed && stage.project && (
              <Link href={`/${locale}/learn/${stage.slug}/project/`} className="btn-grad grid h-14 place-items-center rounded-2xl font-display text-lg font-bold">
                🏗️ {getDictionary(locale).project.row}
              </Link>
            )}
            <Link
              href={back}
              className={`grid h-14 place-items-center rounded-2xl font-display text-lg font-bold ${passed && !stage.project ? "btn-grad" : "border border-line bg-surface"}`}
            >
              {dict.backToPath}
            </Link>
          </div>

          <section className="flex w-full flex-col gap-3 text-start">
            <h2 className="font-bold">{dict.review}</h2>
            {exam.questions.map((x, i) => {
              const ok = answers[x.id] === x.answer;
              return (
                <motion.div
                  key={x.id}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.8 + i * 0.08 }}
                  className={`flex gap-3 rounded-2xl p-4 ${ok ? "bg-ok/12" : "bg-coral/10"}`}
                >
                  <span className={`grid size-6 flex-none place-items-center rounded-full text-xs font-bold text-white ${ok ? "bg-ok" : "bg-coral"}`}>
                    {ok ? <CheckIcon className="size-3.5" /> : "✕"}
                  </span>
                  <div className="flex flex-col gap-1 text-sm">
                    <span className="font-semibold">
                      <RichText text={t(x.prompt, locale)} />
                    </span>
                    <span className="text-muted">
                      ✓ <RichText text={t(x.options[x.answer], locale)} />
                    </span>
                  </div>
                </motion.div>
              );
            })}
          </section>
        </div>
      </div>
    );
  }

  // ------------------------------------------------------------ One question at a time
  return (
    <div className="fixed inset-0 z-40 flex flex-col bg-paper" style={{ paddingTop: "env(safe-area-inset-top, 0px)" }}>
      <div className="mx-auto flex w-full max-w-2xl items-center gap-3 px-4 py-3">
        <Link href={back} aria-label="Close" className="grid size-10 place-items-center rounded-xl text-muted hover:bg-surface-2">
          <CloseIcon className="size-6" />
        </Link>
        <div className="h-3 flex-1 overflow-hidden rounded-full bg-line" aria-hidden="true">
          <motion.div className="h-full rounded-full bg-saffron" animate={{ width: `${(current / total) * 100}%` }} transition={{ type: "spring", stiffness: 120, damping: 20 }} />
        </div>
        <span
          className={`flex items-center gap-1 rounded-full px-3 py-1 text-sm font-bold tabular-nums ${
            left <= 30 ? "animate-pulse bg-coral/15 text-coral" : "bg-saffron-soft text-ink"
          }`}
          aria-label="Time left"
        >
          ⏱ {String(Math.floor(Math.max(left, 0) / 60)).padStart(2, "0")}:{String(Math.max(left, 0) % 60).padStart(2, "0")}
        </span>
      </div>

      <div className="mx-auto flex w-full max-w-2xl flex-1 flex-col overflow-y-auto px-4 py-4">
        <AnimatePresence mode="wait">
          <motion.div
            key={q.id}
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -24 }}
            transition={{ duration: 0.25 }}
            className="flex flex-col gap-5"
          >
            <span className="text-sm font-semibold text-accent">
              🏆 {dict.title} · {dict.question.replace("{n}", String(current + 1)).replace("{total}", String(total))}
            </span>
            <h1 className="text-2xl font-bold leading-relaxed">
              <RichText text={t(q.prompt, locale)} />
            </h1>
            {q.code && <pre className="overflow-x-auto rounded-2xl bg-code-bg p-4 font-mono text-code-fg">{q.code}</pre>}
            <div className="flex flex-col gap-3" role="radiogroup">
              {q.options.map((opt, oi) => {
                const on = chosen === oi;
                return (
                  <motion.button
                    key={oi}
                    id={`${q.id}-${oi}`}
                    type="button"
                    role="radio"
                    aria-checked={on}
                    whileTap={{ scale: 0.97 }}
                    onClick={() => {
                      play("select");
                      setAnswers((a) => ({ ...a, [q.id]: oi }));
                    }}
                    className={`flex items-center gap-3 rounded-2xl border-2 bg-surface p-4 text-start text-lg shadow-[0_3px_0_0_var(--line)] transition-colors ${
                      on ? "border-accent bg-accent-soft shadow-[0_3px_0_0_var(--accent)]" : "border-line"
                    }`}
                  >
                    <span
                      className={`grid size-8 flex-none place-items-center rounded-xl border-2 font-mono text-sm font-bold ${
                        on ? "btn-grad border-transparent" : "border-line text-muted"
                      }`}
                    >
                      {String.fromCharCode(65 + oi)}
                    </span>
                    <RichText text={t(opt, locale)} />
                  </motion.button>
                );
              })}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="mx-auto w-full max-w-2xl px-4 pt-3" style={{ paddingBottom: "calc(env(safe-area-inset-bottom, 0px) + 16px)" }}>
        <Press
          silent
          onClick={nextOrSubmit}
          disabled={chosen === undefined}
          className="h-14 w-full rounded-2xl btn-grad font-display text-lg font-bold shadow-[0_4px_0_0_rgba(0,0,0,0.2)] disabled:opacity-40"
        >
          {last ? dict.submit : dict.next}
        </Press>
      </div>
    </div>
  );
}
