"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useMemo, useState } from "react";
import { getStage, lessonKey, stages } from "@/content/curriculum";
import type { FileKind, Files, Lesson } from "@/content/types";
import { dirOf, t, type Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionary";
import { celebrate, play } from "@/lib/feedback";
import { completeLesson, isLessonOpen, levelOf, useProgress } from "@/lib/progress";
import { buildPreview, collectLogs, runChecks } from "@/lib/runner";
import { Celebration } from "./Celebration";
import { BulbIcon, CheckIcon, CloseIcon, UndoIcon } from "./Icons";
import { RichText } from "./RichText";
import { Press, useMounted } from "./ui";
import { Workspace } from "./Workspace";

/** Where the learner stopped in a lesson: the card, or the editor. */
function positionKey(key: string) {
  return `cm-position-v1:${key}`;
}

function draftKey(key: string) {
  return `satr-draft-v1:${key}`;
}

type Step = { kind: "text" | "example" | "tip" | "modern" | "quiz" | "task"; q?: number };

/** One idea per card: paragraphs, example, shortcut, old-vs-modern, then the quiz or the task. */
function stepsOf(lesson: Lesson): Step[] {
  return [
    ...lesson.body.map(() => ({ kind: "text" as const })),
    ...(lesson.example ? [{ kind: "example" as const }] : []),
    ...(lesson.tip ? [{ kind: "tip" as const }] : []),
    ...(lesson.modern ? [{ kind: "modern" as const }] : []),
    ...(lesson.quiz ? lesson.quiz.map((_, q) => ({ kind: "quiz" as const, q })) : [{ kind: "task" as const }]),
  ];
}

/** Runs a JavaScript example on demand and shows what it prints. */
function ExampleOutput({ code, html, label }: { code: string; html?: string; label: string }) {
  const [logs, setLogs] = useState<string[] | null>(null);
  return (
    <div className="flex flex-col gap-2">
      <Press
        onClick={async () => setLogs(await collectLogs({ js: code, html: html ?? "" }))}
        className="self-start rounded-xl bg-ok px-4 py-2 font-display font-semibold text-white"
      >
        ▶ {label}
      </Press>
      {logs && (
        <pre className="max-h-40 overflow-auto rounded-2xl bg-black/80 p-3 font-mono text-sm text-[#a7f3d0]">
          {logs.length ? logs.map((l) => `> ${l}`).join("\n") : "> (no output)"}
        </pre>
      )}
    </div>
  );
}

export function LessonView({ locale, stageSlug, lessonSlug }: { locale: Locale; stageSlug: string; lessonSlug: string }) {
  const mounted = useMounted();
  const router = useRouter();
  const stage = getStage(stageSlug)!;
  const index = stage.lessons.findIndex((l) => l.slug === lessonSlug);
  const lesson = stage.lessons[index];
  const next = stage.lessons[index + 1];
  const key = lessonKey(stage.slug, lesson.slug);
  const progress = useProgress();

  // The explanation language can differ from the interface, so learners can peek at the other one.
  const [tl, setTl] = useState<Locale>(locale);
  // Everything in the lesson, buttons included, follows the explanation language.
  const dict = getDictionary(tl);
  const d = dict.lesson;
  const [phase, setPhase] = useState<"learn" | "code" | "done">("learn");
  const [step, setStep] = useState(0);
  const [dir, setDir] = useState(1);
  const [files, setFiles] = useState<Files>(lesson.starter);
  const [results, setResults] = useState<Record<string, boolean> | null>(null);
  const [hintsShown, setHintsShown] = useState(0);
  const [shake, setShake] = useState(0);
  const [won, setWon] = useState<{ xp: number; levelUp: boolean } | null>(null);
  const [forcePane, setForcePane] = useState<{ pane: "side"; at: number }>();
  const [checking, setChecking] = useState(false);
  // Quiz: wrong options tried per question, and which questions are solved.
  const [tried, setTried] = useState<Record<string, number[]>>({});
  const [solved, setSolved] = useState<Record<string, boolean>>({});

  const steps = useMemo(() => stepsOf(lesson), [lesson]);
  const back = `/${locale}/learn/`;
  // The Start stage is one continuous run: lesson after lesson, then straight into HTML.
  const flowing = stage.slug === stages[0].slug;
  const following = stages[stages.indexOf(stage) + 1];
  const nextHref = next
    ? `/${locale}/learn/${stage.slug}/${next.slug}/`
    : stage.exam
      ? `/${locale}/learn/${stage.slug}/exam/`
      : flowing && following?.lessons[0]
        ? `/${locale}/learn/${following.slug}/${following.lessons[0].slug}/`
        : back;
  const [countdown, setCountdown] = useState(3);

  useEffect(() => {
    if (!won || !flowing) return;
    if (countdown <= 0) {
      router.push(nextHref);
      return;
    }
    const id = window.setTimeout(() => setCountdown((c) => c - 1), 1000);
    return () => window.clearTimeout(id);
  }, [won, flowing, countdown, nextHref, router]);

  useEffect(() => {
    try {
      const pos = JSON.parse(window.localStorage.getItem(positionKey(key)) ?? "null") as { step: number; phase: "learn" | "code" } | null;
      if (pos) {
        setStep(Math.min(pos.step, stepsOf(lesson).length - 1));
        setPhase(pos.phase);
      }
    } catch {
      // Start from the first card.
    }
  }, [key, lesson]);

  useEffect(() => {
    if (phase === "done") return;
    try {
      window.localStorage.setItem(positionKey(key), JSON.stringify({ step, phase }));
    } catch {
      // Remembering the position is a convenience.
    }
  }, [key, step, phase]);

  useEffect(() => {
    try {
      const saved = window.localStorage.getItem(draftKey(key));
      if (saved) setFiles(JSON.parse(saved));
    } catch {
      // No saved draft: keep the starter code.
    }
  }, [key]);

  useEffect(() => {
    const id = window.setTimeout(() => {
      try {
        window.localStorage.setItem(draftKey(key), JSON.stringify(files));
      } catch {
        // Drafts are a convenience; ignore storage failures.
      }
    }, 500);
    return () => window.clearTimeout(id);
  }, [files, key]);

  if (!mounted) return <div className="min-h-dvh bg-paper" />;

  // Lessons open in order: no jumping ahead by link.
  if (!won && !isLessonOpen(stage.slug, lesson.slug, progress)) {
    return (
      <div className="grid min-h-dvh place-items-center bg-paper p-6 text-center">
        <div className="flex max-w-sm flex-col items-center gap-4">
          <span className="text-6xl" aria-hidden="true">
            🔒
          </span>
          <p className="text-lg">{dict.learn.lockedLesson}</p>
          <Link href={back} className="btn-grad rounded-2xl px-6 py-3 font-display font-bold">
            {dict.practice.toPath}
          </Link>
        </div>
      </div>
    );
  }

  function win() {
    const before = levelOf(progress.xp).level;
    const first = completeLesson(key, lesson.xp);
    const xp = first ? lesson.xp : 0;
    const levelUp = first && levelOf(progress.xp + xp).level > before;
    play(levelUp ? "levelUp" : "complete");
    celebrate(levelUp);
    setWon({ xp, levelUp });
    // The exercise is over: close the editor and show what was built.
    if (phase === "code") setPhase("done");
  }

  function go(delta: number) {
    const target = step + delta;
    if (target < 0) return;
    const cur = steps[step];
    if (delta > 0 && cur.kind === "quiz" && !solved[lesson.quiz![cur.q!].id]) {
      play("wrong");
      setShake((n) => n + 1);
      return;
    }
    if (target >= steps.length) {
      if (lesson.quiz) {
        win();
        return;
      }
      play("whoosh");
      setPhase("code");
      return;
    }
    play("whoosh");
    setDir(delta);
    setStep(target);
  }

  function answer(qi: number, oi: number) {
    const q = lesson.quiz![qi];
    if (solved[q.id]) return;
    if (oi === q.answer) {
      play("correct");
      setSolved((s) => ({ ...s, [q.id]: true }));
    } else {
      play("wrong");
      setTried((t) => ({ ...t, [q.id]: [...(t[q.id] ?? []), oi] }));
    }
  }

  async function check() {
    if (checking) return;
    setChecking(true);
    const r = await runChecks(lesson.tasks, files, lesson.harness, lesson.settle);
    setChecking(false);
    setResults(r);
    if (lesson.tasks.every((task) => r[task.id])) {
      win();
    } else {
      play("wrong");
      setShake((n) => n + 1);
      setForcePane({ pane: "side", at: Date.now() });
    }
  }

  const passedCount = results ? lesson.tasks.filter((task) => results[task.id]).length : 0;
  const tdir = dirOf(tl);

  const langSwitch = (
    <div className="inline-flex overflow-hidden rounded-full border border-line bg-surface text-xs" role="group" aria-label="Explanation language">
      {(["ar", "en"] as const).map((l) => (
        <button
          key={l}
          type="button"
          onClick={() => {
            play("tap");
            setTl(l);
          }}
          aria-pressed={tl === l}
          className={`px-3 py-1.5 font-semibold ${tl === l ? "btn-grad" : "text-muted"}`}
        >
          {l === "ar" ? "عربي" : "EN"}
        </button>
      ))}
    </div>
  );

  const taskList = (
    <ul className="flex flex-col gap-2">
      {lesson.tasks.map((task, i) => {
        const state = results ? (results[task.id] ? "ok" : "fail") : "todo";
        return (
          <motion.li
            key={task.id}
            className={`flex items-start gap-3 rounded-2xl p-3 text-[0.95rem] ${
              state === "ok" ? "bg-ok/12" : state === "fail" ? "bg-coral/10" : "bg-surface-2"
            }`}
            animate={state === "fail" ? { x: [0, -6, 6, -4, 4, 0] } : { x: 0 }}
            transition={{ duration: 0.4, delay: i * 0.05 }}
          >
            <motion.span
              key={state}
              initial={{ scale: 0.4 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 500, damping: 15, delay: i * 0.08 }}
              className={`mt-0.5 grid size-6 flex-none place-items-center rounded-full text-xs font-bold text-white ${
                state === "ok" ? "bg-ok" : state === "fail" ? "bg-coral" : "border-2 border-line"
              }`}
            >
              {state === "ok" ? <CheckIcon className="size-3.5" /> : state === "fail" ? "!" : ""}
            </motion.span>
            <span>
              <RichText text={t(task.label, tl)} />
            </span>
          </motion.li>
        );
      })}
    </ul>
  );

  const celebration = (
    <AnimatePresence>
      {won && (
        <Celebration
          emoji={won.levelUp ? "🚀" : "🎉"}
          title={dict.done.title}
          subtitle={`${dict.done.lessonDone}: ${t(lesson.title, tl)}`}
          xp={won.xp}
          levelUp={won.levelUp ? dict.done.levelUp : undefined}
        >
          <Link
            href={nextHref}
            onClick={() => play("whoosh")}
            className="rounded-2xl btn-grad py-3 font-display text-lg font-bold shadow-[0_4px_0_0_rgba(0,0,0,0.2)]"
          >
            {next || (flowing && following) ? dict.done.continue : stage.exam ? dict.done.toExam : dict.done.back}
            {flowing && ` (${countdown})`}
          </Link>
          {!flowing && (
            <button type="button" onClick={() => setWon(null)} className="py-2 font-semibold text-muted">
              {dict.done.again}
            </button>
          )}
        </Celebration>
      )}
    </AnimatePresence>
  );

  // ------------------------------------------------------------ Done: editor closed, show the result
  if (phase === "done") {
    return (
      <div dir={tdir} lang={tl} className="fixed inset-0 z-40 flex flex-col overflow-y-auto bg-paper" style={{ paddingTop: "env(safe-area-inset-top, 0px)" }}>
        <div className="mx-auto flex w-full max-w-2xl flex-col gap-5 px-4 py-6">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold">{d.doneTitle}</h1>
            <Link href={back} aria-label={d.close} className="grid size-10 place-items-center rounded-xl text-muted hover:bg-surface-2">
              <CloseIcon className="size-6" />
            </Link>
          </div>
          <iframe title={d.result} sandbox="allow-scripts" srcDoc={buildPreview(files)} className="h-64 w-full rounded-3xl border border-line bg-white shadow-card" />
          {lesson.files.map((kind) => (
            <div key={kind} className="flex flex-col gap-1.5">
              <span className="text-sm font-semibold text-muted">
                {d.yourCode} · {kind.toUpperCase()}
              </span>
              <pre className="max-h-64 overflow-auto rounded-2xl bg-code-bg p-4 font-mono text-sm text-code-fg">{files[kind]}</pre>
            </div>
          ))}
          <Link href={nextHref} className="btn-grad grid h-14 place-items-center rounded-2xl font-display text-lg font-bold">
            {next ? dict.done.continue : stage.exam ? dict.done.toExam : dict.done.back}
          </Link>
        </div>
        {celebration}
      </div>
    );
  }

  // ------------------------------------------------------------ Code phase
  if (phase === "code") {
    return (
      <>
        <Workspace
          locale={tl}
          title={t(lesson.title, tl)}
          kinds={lesson.files}
          files={files}
          onChange={(kind: FileKind, v: string) => setFiles((f) => ({ ...f, [kind]: v }))}
          onClose={() => router.push(back)}
          sideLabel={d.tasks}
          sideBadge={results ? `${passedCount}/${lesson.tasks.length}` : undefined}
          forcePane={forcePane}
          side={
            <div dir={tdir} lang={tl} className="flex flex-col gap-4">
              <div className="flex items-center justify-between gap-2">
                <h2 className="font-bold">{d.task}</h2>
                {langSwitch}
              </div>
              {taskList}
              {lesson.example && (
                <details className="rounded-2xl bg-surface-2 p-3">
                  <summary className="cursor-pointer font-semibold">{d.peek}</summary>
                  <pre className="mt-2 overflow-x-auto rounded-xl bg-code-bg p-3 font-mono text-xs text-code-fg">{lesson.example.code}</pre>
                </details>
              )}
              {results && passedCount < lesson.tasks.length && <p className="text-sm font-semibold text-coral">{d.almost}</p>}
              <AnimatePresence>
                {hintsShown > 0 && (
                  <motion.ol
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    className="flex list-inside list-decimal flex-col gap-1 overflow-hidden rounded-2xl bg-saffron-soft p-4 text-[0.95rem]"
                  >
                    {lesson.hints.slice(0, hintsShown).map((h, i) => (
                      <li key={i}>
                        <RichText text={t(h, tl)} />
                      </li>
                    ))}
                  </motion.ol>
                )}
              </AnimatePresence>
              <button
                type="button"
                onClick={() => {
                  play("whoosh");
                  setPhase("learn");
                }}
                className="self-start text-sm font-semibold text-accent"
              >
                {tl === "ar" ? "→" : "←"} {d.learn}
              </button>
            </div>
          }
          actions={
            <>
              <Press
                onClick={() => setFiles(lesson.starter)}
                aria-label={d.reset}
                className="grid size-12 place-items-center rounded-2xl bg-white/[0.08] text-code-fg"
              >
                <UndoIcon className="size-5" />
              </Press>
              <Press
                onClick={() => {
                  if (hintsShown < lesson.hints.length) setHintsShown((n) => n + 1);
                  else setFiles(lesson.solution);
                  setForcePane({ pane: "side", at: Date.now() });
                }}
                className="flex h-12 items-center gap-2 rounded-2xl bg-white/[0.08] px-4 text-sm font-semibold text-code-fg"
              >
                <BulbIcon className="size-5 text-saffron" />
                {hintsShown < lesson.hints.length ? `${d.hint} ${hintsShown + 1}/${lesson.hints.length}` : d.solution}
              </Press>
              <motion.div className="flex-1" key={shake} animate={shake ? { x: [0, -10, 10, -6, 6, 0] } : undefined} transition={{ duration: 0.4 }}>
                <Press
                  silent
                  onClick={check}
                  className="h-12 w-full rounded-2xl btn-grad font-display text-lg font-bold shadow-[0_4px_0_0_rgba(0,0,0,0.25)] active:translate-y-0.5 active:shadow-none"
                >
                  {checking ? "…" : d.check}
                </Press>
              </motion.div>
            </>
          }
        />
        {celebration}
      </>
    );
  }

  // ------------------------------------------------------------ Learn phase: one idea per card
  const s = steps[step];
  // Text steps come first, so the step number is also the paragraph number.
  const textIndex = step;
  const variants = {
    enter: (dx: number) => ({ x: dx * (tdir === "rtl" ? -60 : 60), opacity: 0, scale: 0.97 }),
    center: { x: 0, opacity: 1, scale: 1 },
    exit: (dx: number) => ({ x: dx * (tdir === "rtl" ? 60 : -60), opacity: 0, scale: 0.97 }),
  };

  return (
    <div dir={tdir} lang={tl} className="fixed inset-0 z-40 flex flex-col bg-paper" style={{ paddingTop: "env(safe-area-inset-top, 0px)" }}>
      <div className="mx-auto flex w-full max-w-2xl items-center gap-3 px-4 py-3">
        <Link href={back} aria-label={d.close} className="grid size-10 place-items-center rounded-xl text-muted hover:bg-surface-2">
          <CloseIcon className="size-6" />
        </Link>
        <div className="flex flex-1 gap-1.5" aria-hidden="true">
          {steps.map((_, i) => (
            <div key={i} className="h-2.5 flex-1 overflow-hidden rounded-full bg-line">
              <motion.div className="btn-grad h-full rounded-full" initial={false} animate={{ width: i <= step ? "100%" : "0%" }} transition={{ duration: 0.35 }} />
            </div>
          ))}
        </div>
        {langSwitch}
      </div>

      <div className="relative mx-auto flex w-full max-w-2xl flex-1 items-center overflow-hidden px-4">
        <AnimatePresence mode="popLayout" custom={dir} initial={false}>
          <motion.article
            key={step}
            custom={dir}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0.25}
            onDragEnd={(_, info) => {
              const forward = tdir === "rtl" ? info.offset.x > 80 : info.offset.x < -80;
              const backward = tdir === "rtl" ? info.offset.x < -80 : info.offset.x > 80;
              if (forward) go(1);
              else if (backward) go(-1);
            }}
            dir={tdir}
            lang={tl}
            className="flex max-h-full w-full cursor-grab flex-col gap-5 overflow-y-auto glass rounded-[2rem] p-7 shadow-card active:cursor-grabbing"
          >
            <span className="text-sm font-semibold text-accent">
              {stage.badge} · {t(lesson.title, tl)}
            </span>

            {s.kind === "text" && (
              <div className="flex flex-col gap-4">
                {lesson.body[textIndex].icon && (
                  <motion.span
                    className="grid size-20 place-items-center rounded-3xl bg-accent-soft text-5xl"
                    initial={{ scale: 0.5, rotate: -15 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{ type: "spring", stiffness: 300, damping: 14 }}
                    aria-hidden="true"
                  >
                    {lesson.body[textIndex].icon}
                  </motion.span>
                )}
                <p className="font-display text-xl leading-loose sm:text-2xl">
                  <RichText text={t(lesson.body[textIndex], tl)} />
                </p>
              </div>
            )}

            {s.kind === "example" && lesson.example && (
              <>
                <h2 className="text-2xl font-bold">{d.example}</h2>
                <pre className="overflow-x-auto rounded-2xl bg-code-bg p-4 font-mono text-sm text-code-fg">{lesson.example.code}</pre>
                {lesson.example.lang === "js" ? (
                  <ExampleOutput code={lesson.example.code} html={lesson.starter.html} label={d.run} />
                ) : (
                  <iframe
                    title={d.result}
                    sandbox=""
                    srcDoc={buildPreview(
                      lesson.example.lang === "css" ? { html: lesson.starter.html, css: lesson.example.code } : { html: lesson.example.code },
                    )}
                    className="h-40 w-full rounded-2xl border border-line bg-white"
                  />
                )}
                <p className="text-muted">{t(lesson.example.note, tl)}</p>
              </>
            )}

            {s.kind === "tip" && lesson.tip && (
              <div className="flex flex-col gap-4">
                <motion.span
                  className="text-5xl"
                  animate={{ rotate: [0, -12, 12, 0] }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                  aria-hidden="true"
                >
                  ⚡
                </motion.span>
                <h2 className="text-2xl font-bold">{d.tip}</h2>
                <p className="text-lg">
                  <RichText text={t(lesson.tip.text, tl)} />
                </p>
                {lesson.tip.code && (
                  <code className="self-start rounded-xl bg-saffron-soft px-3 py-2 font-mono text-base font-semibold">{lesson.tip.code}</code>
                )}
              </div>
            )}

            {s.kind === "modern" && lesson.modern && (
              <div className="flex flex-col gap-4">
                <div className="flex items-center gap-2">
                  <h2 className="text-2xl font-bold">{d.modern}</h2>
                  {lesson.modern.since && <span className="rounded-full bg-ok/15 px-2.5 py-0.5 text-xs font-bold text-ok">{lesson.modern.since}</span>}
                </div>
                <div className="flex flex-col gap-1">
                  <span className="text-sm font-bold text-coral">✗ {d.oldWay}</span>
                  <pre className="overflow-x-auto rounded-2xl border border-coral/40 bg-coral/10 p-3 font-mono text-sm line-through decoration-coral/50">{lesson.modern.old}</pre>
                </div>
                <div className="flex flex-col gap-1">
                  <span className="text-sm font-bold text-ok">✓ {d.newWay}</span>
                  <pre className="overflow-x-auto rounded-2xl border border-ok/40 bg-ok/10 p-3 font-mono text-sm">{lesson.modern.now}</pre>
                </div>
                <p className="text-lg">
                  <RichText text={t(lesson.modern.text, tl)} />
                </p>
              </div>
            )}

            {s.kind === "quiz" && lesson.quiz && (() => {
              const q = lesson.quiz[s.q!];
              const done = solved[q.id];
              return (
                <motion.div className="flex flex-col gap-4" key={shake} animate={shake ? { x: [0, -8, 8, -4, 4, 0] } : undefined}>
                  <span className="text-sm font-bold text-saffron">
                    ❓ {s.q! + 1}/{lesson.quiz.length}
                  </span>
                  <h2 className="text-2xl font-bold leading-relaxed">
                    <RichText text={t(q.prompt, tl)} />
                  </h2>
                  <div className="flex flex-col gap-2.5">
                    {q.options.map((opt, oi) => {
                      const wrong = tried[q.id]?.includes(oi);
                      const right = done && oi === q.answer;
                      return (
                        <motion.button
                          key={oi}
                          type="button"
                          whileTap={{ scale: 0.97 }}
                          animate={wrong ? { x: [0, -6, 6, 0] } : undefined}
                          disabled={wrong || done}
                          onPointerDown={(e) => e.stopPropagation()}
                          onClick={() => answer(s.q!, oi)}
                          className={`rounded-2xl border-2 p-4 text-start text-lg ${
                            right ? "border-ok bg-ok/15" : wrong ? "border-coral/60 bg-coral/10 opacity-60" : "border-line bg-surface hover:border-accent"
                          }`}
                        >
                          {right ? "✓ " : wrong ? "✗ " : ""}
                          <RichText text={t(opt, tl)} />
                        </motion.button>
                      );
                    })}
                  </div>
                  {done && <p className="font-semibold text-ok">{d.correct}</p>}
                </motion.div>
              );
            })()}

            {s.kind === "task" && (
              <div className="flex flex-col gap-4">
                <span className="text-5xl" aria-hidden="true">
                  🎯
                </span>
                <h2 className="text-2xl font-bold">{d.task}</h2>
                {taskList}
              </div>
            )}
          </motion.article>
        </AnimatePresence>
      </div>

      <div className="mx-auto flex w-full max-w-2xl gap-3 px-4 pt-3" style={{ paddingBottom: "calc(env(safe-area-inset-bottom, 0px) + 16px)" }}>
        {step > 0 && (
          <Press onClick={() => go(-1)} silent className="h-14 rounded-2xl border border-line bg-surface px-6 font-display font-semibold">
            {d.prev}
          </Press>
        )}
        <Press
          silent
          onClick={() => go(1)}
          className="h-14 flex-1 rounded-2xl btn-grad font-display text-lg font-bold shadow-[0_4px_0_0_rgba(0,0,0,0.2)] active:translate-y-0.5 active:shadow-none"
        >
          {s.kind === "task" ? d.startPractice : step === steps.length - 1 && lesson.quiz ? d.finish : d.next}
        </Press>
      </div>
      {celebration}
    </div>
  );
}
