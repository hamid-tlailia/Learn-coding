"use client";

import Link from "next/link";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useMemo, useState } from "react";
import { getStage } from "@/content/curriculum";
import type { Question } from "@/content/types";
import { t, type Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionary";
import { celebrate, play } from "@/lib/feedback";
import { awardXp, useProgress } from "@/lib/progress";
import { dueReviews, recordReview, reviewQuestions, scheduleMissing, useReviews } from "@/lib/review";
import { useSettings } from "@/lib/settings";
import { CloseIcon } from "./Icons";
import { RichText } from "./RichText";
import { Press, useMounted } from "./ui";

const XP_PER_LESSON = 5;

type Item = { key: string; q: Question };

function lessonTitle(key: string, locale: Locale) {
  const [stage, slug] = key.split("/");
  const lesson = getStage(stage)?.lessons.find((l) => l.slug === slug);
  return lesson ? t(lesson.title, locale) : key;
}

/** Today's spaced review: a few questions from every lesson whose review day has come. */
export function ReviewView({ locale }: { locale: Locale }) {
  const mounted = useMounted();
  const r = getDictionary(locale).review;
  const progress = useProgress();
  const reviews = useReviews();
  const { track } = useSettings();
  const [started, setStarted] = useState(false);
  const [i, setI] = useState(0);
  const [picked, setPicked] = useState<number | null>(null);
  const [slips, setSlips] = useState<Record<string, boolean>>({});
  const [finished, setFinished] = useState<string[] | null>(null);

  useEffect(() => {
    if (mounted) scheduleMissing(progress.completed);
  }, [mounted, progress.completed]);

  const due = useMemo(() => dueReviews(reviews, progress, track), [reviews, progress, track]);
  // The queue is fixed when the session starts, so answering doesn't reshuffle it.
  const [queue, setQueue] = useState<Item[]>([]);

  if (!mounted) return <div className="min-h-dvh bg-paper" />;

  const back = `/${locale}/`;
  const item = queue[i];

  function start() {
    play("whoosh");
    setQueue(due.flatMap((key) => reviewQuestions(key).map((q) => ({ key, q }))));
    setStarted(true);
  }

  function choose(oi: number) {
    if (picked !== null) return;
    setPicked(oi);
    if (oi === item.q.answer) play("correct");
    else {
      play("wrong");
      setSlips((s) => ({ ...s, [item.key]: true }));
    }
  }

  function next() {
    const last = i === queue.length - 1;
    // A lesson's review is recorded after its last question.
    if (last || queue[i + 1].key !== item.key) recordReview(item.key, !slips[item.key]);
    if (last) {
      const keys = [...new Set(queue.map((x) => x.key))];
      awardXp(keys.length * XP_PER_LESSON);
      play("levelUp");
      celebrate(true);
      setFinished(keys);
      return;
    }
    setPicked(null);
    setI((n) => n + 1);
  }

  const shell = (children: React.ReactNode) => (
    <div className="fixed inset-0 z-40 flex flex-col bg-paper" style={{ paddingTop: "env(safe-area-inset-top, 0px)" }}>
      <div className="mx-auto flex w-full max-w-2xl items-center gap-3 px-4 py-3">
        <Link href={back} aria-label={r.close} className="grid size-10 place-items-center rounded-xl text-muted hover:bg-surface-2">
          <CloseIcon className="size-6" />
        </Link>
        {started && !finished && (
          <div className="h-2.5 flex-1 overflow-hidden rounded-full bg-line" aria-hidden="true">
            <motion.div className="btn-grad h-full rounded-full" animate={{ width: `${((i + (picked !== null ? 1 : 0)) / queue.length) * 100}%` }} />
          </div>
        )}
      </div>
      <div className="mx-auto flex w-full max-w-2xl flex-1 flex-col overflow-y-auto px-5 pb-6">{children}</div>
    </div>
  );

  if (finished) {
    return shell(
      <div className="flex flex-1 flex-col items-center justify-center gap-5 text-center">
        <span className="text-7xl" aria-hidden="true">
          🧠
        </span>
        <h1 className="text-3xl font-bold">{r.doneTitle}</h1>
        <p className="text-lg text-muted">{r.doneText.replace("{n}", String(finished.length)).replace("{xp}", String(finished.length * XP_PER_LESSON))}</p>
        <ul className="flex w-full flex-col gap-2 text-start">
          {finished.map((k) => (
            <li key={k} className="glass flex items-center justify-between gap-3 rounded-2xl p-3">
              <span className="font-semibold">{lessonTitle(k, locale)}</span>
              <span className={`text-sm font-bold ${slips[k] ? "text-coral" : "text-ok"}`}>{slips[k] ? r.again : r.solid}</span>
            </li>
          ))}
        </ul>
        <Link href={back} className="btn-grad rounded-2xl px-8 py-3 font-display font-bold">
          {r.home}
        </Link>
      </div>,
    );
  }

  if (!started) {
    const upcoming = Object.entries(reviews)
      .filter(([k, v]) => v.due && progress.completed.includes(k))
      .map(([, v]) => v.due!)
      .sort()[0];
    return shell(
      <div className="flex flex-1 flex-col items-center justify-center gap-5 text-center">
        <span className="text-7xl" aria-hidden="true">
          {due.length ? "🔁" : "🌙"}
        </span>
        <h1 className="text-3xl font-bold">{r.title}</h1>
        <p className="text-lg text-muted">{due.length ? r.dueText.replace("{n}", String(due.length)) : r.empty}</p>
        {!due.length && upcoming && <p className="text-sm text-muted">{r.nextOn.replace("{date}", upcoming)}</p>}
        {due.length > 0 && (
          <>
            <ul className="flex w-full flex-col gap-2 text-start">
              {due.map((k) => (
                <li key={k} className="glass rounded-2xl p-3 font-semibold">
                  {lessonTitle(k, locale)}
                </li>
              ))}
            </ul>
            <Press onClick={start} className="btn-grad h-14 w-full rounded-2xl font-display text-lg font-bold">
              {r.start}
            </Press>
          </>
        )}
        <p className="text-xs text-muted">{r.why}</p>
      </div>,
    );
  }

  if (!item) return shell(<p className="m-auto text-muted">{r.empty}</p>);
  const [stage, slug] = item.key.split("/");

  return shell(
    <AnimatePresence mode="wait">
      <motion.div
        key={i}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        className="flex flex-1 flex-col gap-4 py-4"
      >
        <span className="text-sm font-bold text-accent">🔁 {lessonTitle(item.key, locale)}</span>
        <h2 className="text-2xl font-bold">
          <RichText text={t(item.q.prompt, locale)} />
        </h2>
        {item.q.code && (
          <pre dir="ltr" className="select-none overflow-x-auto rounded-2xl bg-code-bg p-4 font-mono text-sm text-code-fg">
            {item.q.code}
          </pre>
        )}
        <div className="flex flex-col gap-2">
          {item.q.options.map((opt, oi) => {
            const right = picked !== null && oi === item.q.answer;
            const wrong = picked === oi && oi !== item.q.answer;
            return (
              <Press
                key={oi}
                silent
                onClick={() => choose(oi)}
                className={`rounded-2xl border-2 p-4 text-start font-semibold ${
                  right ? "border-ok bg-ok/15" : wrong ? "border-coral bg-coral/15" : "glass border-line"
                }`}
              >
                <RichText text={t(opt, locale)} />
              </Press>
            );
          })}
        </div>
        {picked !== null && (
          <div className="mt-auto flex flex-col gap-2">
            {picked !== item.q.answer && (
              <Link href={`/${locale}/learn/${stage}/${slug}/`} className="text-sm font-semibold text-accent">
                📖 {r.reread}
              </Link>
            )}
            <Press onClick={next} className="btn-grad h-14 rounded-2xl font-display text-lg font-bold">
              {i === queue.length - 1 ? r.finish : r.next}
            </Press>
          </div>
        )}
      </motion.div>
    </AnimatePresence>,
  );
}
