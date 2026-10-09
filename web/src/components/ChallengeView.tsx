"use client";

import Link from "next/link";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useMemo, useState } from "react";
import { challenges } from "@/content/challenges";
import { t, type Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionary";
import { celebrate, play } from "@/lib/feedback";
import { awardXp, useProgress } from "@/lib/progress";
import { Celebration } from "./Celebration";
import { CloseIcon } from "./Icons";
import { Press, useMounted } from "./ui";

const POINTS = 10;
const ROUNDS = 5;

function shuffle<T>(items: T[]) {
  const a = [...items];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

export function ChallengeView({ locale }: { locale: Locale }) {
  const mounted = useMounted();
  const dict = getDictionary(locale);
  const p = dict.practice;
  const [round, setRound] = useState(0);
  const [filled, setFilled] = useState<(number | null)[]>([]);
  const [verdict, setVerdict] = useState<"right" | "wrong" | null>(null);
  const [score, setScore] = useState(0);
  const [seconds, setSeconds] = useState(0);
  const [finished, setFinished] = useState(false);
  const [game, setGame] = useState(0);

  const progress = useProgress();
  // Only challenges from finished lessons; a fresh random set of up to 5 each game.
  const pool = useMemo(
    () => shuffle(challenges.filter((x) => progress.completed.includes(x.after))).slice(0, ROUNDS),
    [game, mounted], // eslint-disable-line react-hooks/exhaustive-deps
  );
  const c = pool[round] ?? challenges[0];
  const parts = c.code.split("_");
  const blanks = parts.length - 1;
  // Each chip keeps its original index so duplicates (two "h1") stay distinct.
  const chips = useMemo(() => shuffle(c.chips.map((text, i) => ({ text, i }))), [c, game]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => setFilled(Array(blanks).fill(null)), [round, blanks, game]);

  useEffect(() => {
    if (finished) return;
    const id = window.setInterval(() => setSeconds((s) => s + 1), 1000);
    return () => window.clearInterval(id);
  }, [finished]);

  if (!mounted) return <div className="min-h-dvh bg-paper" />;

  if (pool.length === 0) {
    return (
      <div className="grid min-h-dvh place-items-center bg-paper p-6 text-center">
        <div className="flex max-w-sm flex-col items-center gap-4">
          <span className="text-6xl" aria-hidden="true">
            🧩
          </span>
          <p className="text-lg">{p.challengeLocked}</p>
          <Link href={`/${locale}/learn/`} className="btn-grad rounded-2xl px-6 py-3 font-display font-bold">
            {p.toPath}
          </Link>
        </div>
      </div>
    );
  }

  const full = filled.length === blanks && filled.every((f) => f !== null);

  function pick(chipIndex: number) {
    if (verdict) return;
    const slot = filled.findIndex((f) => f === null);
    if (slot === -1) return;
    play("select");
    setFilled((f) => f.map((v, i) => (i === slot ? chipIndex : v)));
  }

  function unpick(slot: number) {
    if (verdict || filled[slot] === null) return;
    play("tap");
    setFilled((f) => f.map((v, i) => (i === slot ? null : v)));
  }

  function check() {
    const ok = filled.every((ci, i) => ci !== null && c.chips[ci] === c.answers[i]);
    setVerdict(ok ? "right" : "wrong");
    if (ok) {
      play("correct");
      setScore((s) => s + POINTS);
    } else {
      play("wrong");
    }
  }

  function next() {
    setVerdict(null);
    if (round + 1 < pool.length) {
      play("whoosh");
      setRound((r) => r + 1);
    } else {
      setFinished(true);
      awardXp(score);
      play("complete");
      celebrate();
    }
  }

  function restart() {
    setRound(0);
    setScore(0);
    setSeconds(0);
    setVerdict(null);
    setFinished(false);
    setGame((g) => g + 1);
  }

  const time = `${String(Math.floor(seconds / 60)).padStart(2, "0")}:${String(seconds % 60).padStart(2, "0")}`;

  return (
    <div className="fixed inset-0 z-40 flex flex-col bg-paper" style={{ paddingTop: "env(safe-area-inset-top, 0px)" }}>
      <div className="mx-auto flex w-full max-w-2xl items-center gap-3 px-4 py-3">
        <Link href={`/${locale}/practice/`} aria-label={p.back} className="grid size-10 place-items-center rounded-xl text-muted hover:bg-surface-2">
          <CloseIcon className="size-6" />
        </Link>
        <span className="glass rounded-full px-3 py-1 text-sm font-bold tabular-nums">⏱ {time}</span>
        <div className="flex flex-1 gap-1" aria-hidden="true">
          {pool.map((_, i) => (
            <span key={i} className={`h-2 flex-1 rounded-full ${i < round || finished ? "btn-grad" : i === round ? "bg-saffron" : "bg-line"}`} />
          ))}
        </div>
        <span className="glass rounded-full px-3 py-1 text-sm font-bold tabular-nums">
          🏆 {score} {p.points}
        </span>
      </div>

      <div className="mx-auto flex w-full max-w-2xl flex-1 flex-col gap-5 overflow-y-auto px-4 py-4">
        <AnimatePresence mode="wait">
          <motion.div
            key={`${game}-${round}`}
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -30 }}
            className="flex flex-col gap-5"
          >
            <div>
              <h1 className="text-2xl font-bold">{t(c.prompt, locale)}</h1>
              <p className="text-sm text-muted">{p.fill}</p>
            </div>

            <motion.pre
              animate={verdict === "wrong" ? { x: [0, -8, 8, -5, 5, 0] } : { x: 0 }}
              className={`glow-ring overflow-x-auto rounded-3xl bg-code-bg p-5 font-mono text-lg leading-[2.6] text-code-fg ${
                verdict === "right" ? "ring-2 ring-ok" : ""
              }`}
            >
              {parts.map((part, i) => (
                <span key={i}>
                  {part}
                  {i < blanks && (
                    <motion.button
                      type="button"
                      layout
                      onClick={() => unpick(i)}
                      className={`mx-0.5 inline-block min-w-14 rounded-lg border-2 px-2 align-middle leading-8 ${
                        filled[i] === null || filled[i] === undefined
                          ? "border-dashed border-[#8b5cf6]/70 bg-white/5 text-transparent"
                          : verdict === "wrong" && c.chips[filled[i]!] !== c.answers[i]
                            ? "border-coral bg-coral/20 text-coral"
                            : verdict === "right"
                              ? "border-ok bg-ok/20 text-ok"
                              : "border-[#22d3ee] bg-[#22d3ee]/15 text-[#a5f3fc]"
                      }`}
                    >
                      {filled[i] !== null && filled[i] !== undefined ? c.chips[filled[i]!] : "···"}
                    </motion.button>
                  )}
                </span>
              ))}
            </motion.pre>

            <div className="grid grid-cols-3 gap-3" dir="ltr">
              {chips.map(({ text, i }) => {
                const used = filled.includes(i);
                return (
                  <motion.button
                    key={i}
                    type="button"
                    disabled={used || !!verdict}
                    onClick={() => pick(i)}
                    whileTap={{ scale: 0.9 }}
                    animate={{ opacity: used ? 0.25 : 1, scale: used ? 0.92 : 1 }}
                    className="rounded-2xl p-[2px]"
                    style={{ background: "var(--grad)" }}
                  >
                    <span className="block rounded-[14px] bg-code-bg px-3 py-3 font-mono text-lg text-code-fg">{text}</span>
                  </motion.button>
                );
              })}
            </div>

            <AnimatePresence>
              {verdict && (
                <motion.div
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  role="status"
                  className={`rounded-2xl p-4 font-semibold ${verdict === "right" ? "bg-ok/15 text-ok" : "bg-coral/10 text-coral"}`}
                >
                  {verdict === "right" ? `✓ ${p.right} +${POINTS}` : `${p.wrong} ${c.answers.join(" · ")}`}
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="mx-auto w-full max-w-2xl px-4 pt-3" style={{ paddingBottom: "calc(env(safe-area-inset-bottom, 0px) + 16px)" }}>
        <Press
          silent
          onClick={verdict ? next : check}
          disabled={!full && !verdict}
          className="btn-grad h-14 w-full rounded-2xl font-display text-lg font-bold disabled:opacity-40"
        >
          {verdict ? p.next : p.check}
        </Press>
      </div>

      <AnimatePresence>
        {finished && (
          <Celebration emoji="🏆" title={p.finish} subtitle={`⏱ ${time}`} xp={score}>
            <Press onClick={restart} className="btn-grad rounded-2xl py-3 font-display text-lg font-bold">
              {p.again}
            </Press>
            <Link href={`/${locale}/practice/`} className="py-2 font-semibold text-muted">
              {p.back}
            </Link>
          </Celebration>
        )}
      </AnimatePresence>
    </div>
  );
}
