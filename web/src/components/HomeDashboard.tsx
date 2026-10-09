"use client";

import Link from "next/link";
import { motion } from "motion/react";
import { lessonKey, stages } from "@/content/curriculum";
import { shortcuts } from "@/content/shortcuts";
import { t, type Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionary";
import { dayKey, levelOf, liveStreak, nextLesson, useProgress } from "@/lib/progress";
import { useSettings } from "@/lib/settings";
import { PlayIcon } from "./Icons";
import { TechIcon } from "./TechIcon";
import { Card, rise, Stagger, StatPills, useMounted } from "./ui";

function dayOfYear() {
  const now = new Date();
  return Math.floor((now.getTime() - new Date(now.getFullYear(), 0, 0).getTime()) / 86_400_000);
}

function GoalRing({ value, goal }: { value: number; goal: number }) {
  const r = 42;
  const c = 2 * Math.PI * r;
  const pct = Math.min(1, value / goal);
  return (
    <svg viewBox="0 0 100 100" className="size-20 -rotate-90 sm:size-28" aria-hidden="true">
      <circle cx="50" cy="50" r={r} fill="none" stroke="var(--line)" strokeWidth="10" />
      <motion.circle
        cx="50"
        cy="50"
        r={r}
        fill="none"
        stroke={pct >= 1 ? "var(--saffron)" : "var(--accent)"}
        strokeWidth="10"
        strokeLinecap="round"
        strokeDasharray={c}
        initial={{ strokeDashoffset: c }}
        animate={{ strokeDashoffset: c * (1 - pct) }}
        transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
      />
    </svg>
  );
}

export function HomeDashboard({ locale }: { locale: Locale }) {
  const mounted = useMounted();
  const dict = getDictionary(locale);
  const h = dict.home;
  const progress = useProgress();
  const settings = useSettings();
  const next = nextLesson(progress);
  const today = progress.daily[dayKey()] ?? 0;
  const streak = liveStreak(progress);
  const { level, into, need } = levelOf(progress.xp);
  const hour = new Date().getHours();
  const greeting = hour < 12 ? h.morning : hour < 18 ? h.afternoon : h.evening;
  const seed = dayOfYear();
  const quote = dict.quotes[seed % dict.quotes.length];
  const tip = shortcuts[seed % shortcuts.length];
  const fwd = locale === "ar" ? "←" : "→";

  // The last 7 days, oldest first, ending today.
  const week = Array.from({ length: 7 }, (_, i) => {
    const d = new Date(Date.now() - (6 - i) * 86_400_000);
    return { label: dict.week[d.getDay()], xp: progress.daily[dayKey(d)] ?? 0, today: i === 6 };
  });

  if (!mounted) return <div className="min-h-dvh" />;

  return (
    <Stagger className="mx-auto flex max-w-5xl flex-col gap-5 px-4 py-6 lg:py-10">
      <motion.header variants={rise} className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <motion.span
            className="grid size-14 place-items-center rounded-2xl bg-accent-soft text-3xl"
            animate={{ rotate: [0, -8, 8, 0] }}
            transition={{ duration: 1.2, delay: 0.5 }}
          >
            {settings.avatar}
          </motion.span>
          <div>
            <p className="text-sm text-muted">{greeting}</p>
            <h1 className="text-2xl font-bold">{settings.name || h.coder} 👋</h1>
          </div>
        </div>
        <StatPills labels={dict.stats} />
      </motion.header>

      {/* Continue: the one thing to do next */}
      <motion.div variants={rise}>
        {next ? (
          <Link
            href={`/${locale}/learn/${next.stage.slug}/${next.lesson.slug}/`}
            className="group relative block overflow-hidden rounded-3xl btn-grad p-6 shadow-card"
          >
            <span className="shine absolute inset-0" aria-hidden="true" />
            <span aria-hidden="true" className="absolute -bottom-6 end-4 font-mono text-8xl font-bold opacity-15">
              {"</>"}
            </span>
            <div className="relative flex items-center justify-between gap-4">
              <div className="flex flex-col gap-2">
                <span className="text-sm font-semibold opacity-85">{progress.completed.length ? h.continue : h.start}</span>
                <span className="font-display text-2xl font-bold leading-snug">{t(next.lesson.title, locale)}</span>
                <span className="text-sm opacity-85">
                  {next.stage.badge} · {h.lesson} {next.index + 1}/{next.stage.lessons.length}
                </span>
                <div className="mt-1 h-2 w-48 overflow-hidden rounded-full bg-white/25">
                  <motion.div
                    className="h-full rounded-full bg-white"
                    initial={{ width: 0 }}
                    animate={{ width: `${(next.index / next.stage.lessons.length) * 100}%` }}
                    transition={{ duration: 0.9, delay: 0.3 }}
                  />
                </div>
              </div>
              <motion.span
                className="grid size-16 flex-none place-items-center rounded-full bg-white text-accent shadow-lg"
                animate={{ scale: [1, 1.08, 1] }}
                transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
              >
                <PlayIcon className="size-7 rtl:-scale-x-100" />
              </motion.span>
            </div>
          </Link>
        ) : (
          <Card className="text-center">{h.allDone}</Card>
        )}
      </motion.div>

      {/* Courses: every stage as a colorful card */}
      <motion.section variants={rise} className="flex flex-col gap-3">
        <div className="flex items-baseline justify-between">
          <h2 className="text-xl font-bold">{h.courses}</h2>
          <Link href={`/${locale}/learn/`} className="text-sm font-semibold text-accent">
            {h.seeAll}
          </Link>
        </div>
        <div className="no-scrollbar -mx-4 flex snap-x gap-3 overflow-x-auto px-4 pb-2">
          {stages.map((stage, i) => {
            const doneCount = stage.lessons.filter((l) => progress.completed.includes(lessonKey(stage.slug, l.slug))).length;
            const pct = stage.lessons.length ? Math.round((doneCount / stage.lessons.length) * 100) : 0;
            return (
              <motion.div
                key={stage.slug}
                className="flex-none snap-start"
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.15 + i * 0.06, type: "spring", stiffness: 220, damping: 22 }}
                whileHover={{ y: -6 }}
                whileTap={{ scale: 0.96 }}
              >
                <Link
                  href={`/${locale}/learn/`}
                  className="relative flex h-44 w-40 flex-col justify-between overflow-hidden rounded-3xl p-4 text-white shadow-card"
                  style={{ background: stage.gradient }}
                >
                  <span className="absolute -end-5 -top-5 size-20 rounded-full bg-white/15" aria-hidden="true" />
                  <span className="relative grid size-14 place-items-center rounded-2xl bg-white/20 backdrop-blur">
                    <TechIcon tech={stage.icon} className="size-9" />
                  </span>
                  <span className="relative flex flex-col gap-1.5">
                    <span className="font-display font-bold leading-tight">{stage.badge}</span>
                    <span className="h-1.5 overflow-hidden rounded-full bg-white/30">
                      <span className="block h-full rounded-full bg-white" style={{ width: `${pct}%` }} />
                    </span>
                    <span className="text-[11px] font-semibold opacity-90">
                      {stage.status === "soon" ? dict.learn.soon : `${pct}%`}
                    </span>
                  </span>
                </Link>
              </motion.div>
            );
          })}
        </div>
      </motion.section>

      <div className="grid gap-5 md:grid-cols-2">
        {/* Daily goal + week */}
        <motion.div variants={rise}>
          <Card className="flex h-full items-center gap-4">
            <div className="relative grid place-items-center">
              <GoalRing value={today} goal={settings.dailyGoal} />
              <span className="absolute text-center font-display text-lg font-bold tabular-nums leading-tight">
                {today}
                <span className="block text-xs font-normal text-muted">/ {settings.dailyGoal}</span>
              </span>
            </div>
            <div className="flex min-w-0 flex-1 flex-col gap-3">
              <div>
                <h2 className="font-bold">{today >= settings.dailyGoal ? h.goalDone : h.dailyGoal}</h2>
                <p className="text-sm text-muted">
                  🔥 {streak} {h.streak}
                </p>
              </div>
              <ol className="flex justify-between gap-0.5">
                {week.map((d, i) => (
                  <li key={i} className="flex flex-col items-center gap-1 text-[11px] text-muted">
                    <motion.span
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: 0.3 + i * 0.05, type: "spring", stiffness: 400, damping: 18 }}
                      className={`grid size-6 place-items-center rounded-full text-[10px] sm:size-7 ${
                        d.xp > 0 ? "bg-saffron text-ink" : "bg-surface-2"
                      } ${d.today ? "ring-2 ring-accent ring-offset-2 ring-offset-surface" : ""}`}
                    >
                      {d.xp > 0 ? "🔥" : ""}
                    </motion.span>
                    {d.label}
                  </li>
                ))}
              </ol>
            </div>
          </Card>
        </motion.div>

        {/* Level */}
        <motion.div variants={rise}>
          <Card className="flex h-full flex-col justify-center gap-3">
            <div className="flex items-baseline justify-between">
              <h2 className="font-bold">
                {h.level} {level}
              </h2>
              <span className="text-sm tabular-nums text-muted">
                {into}/{need} XP
              </span>
            </div>
            <div className="h-3 overflow-hidden rounded-full bg-surface-2">
              <motion.div
                className="h-full rounded-full bg-gradient-to-l from-saffron to-accent"
                initial={{ width: 0 }}
                animate={{ width: `${(into / need) * 100}%` }}
                transition={{ duration: 1, delay: 0.3 }}
              />
            </div>
            <div className="grid grid-cols-2 gap-3 text-center">
              <div className="rounded-2xl bg-surface-2 p-3">
                <div className="font-display text-2xl font-bold tabular-nums">{progress.completed.length}</div>
                <div className="text-xs text-muted">{h.lessonsDone}</div>
              </div>
              <div className="rounded-2xl bg-surface-2 p-3">
                <div className="font-display text-2xl font-bold tabular-nums">{progress.xp}</div>
                <div className="text-xs text-muted">{h.totalXp}</div>
              </div>
            </div>
          </Card>
        </motion.div>

        {/* Quote */}
        <motion.div variants={rise}>
          <Card className="flex h-full flex-col gap-2 bg-saffron-soft/80">
            <span className="text-sm font-semibold text-muted">💬 {h.quote}</span>
            <p className="font-display text-xl font-semibold leading-relaxed">{quote}</p>
          </Card>
        </motion.div>

        {/* Shortcut of the day */}
        <motion.div variants={rise}>
          <Card className="flex h-full flex-col gap-3">
            <span className="text-sm font-semibold text-muted">⚡ {h.tip}</span>
            <div className="flex items-center gap-3" dir="ltr">
              <code className="rounded-xl bg-accent-soft px-3 py-1.5 font-mono font-semibold text-accent">{tip.abbr}</code>
              <span className="text-muted">Tab ⇥</span>
            </div>
            <pre className="overflow-x-auto rounded-xl bg-code-bg p-3 font-mono text-xs text-code-fg">{tip.output}</pre>
            <p className="text-sm text-muted">{t(tip.text, locale)}</p>
            <Link href={`/${locale}/playground/`} className="self-start text-sm font-semibold text-accent">
              {dict.practice.open} {fwd}
            </Link>
          </Card>
        </motion.div>
      </div>
    </Stagger>
  );
}
