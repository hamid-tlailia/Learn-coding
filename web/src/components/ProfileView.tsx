"use client";

import Link from "next/link";
import { motion } from "motion/react";
import { stages } from "@/content/curriculum";
import { t, type Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionary";
import { levelOf, liveStreak, useProgress, type Progress } from "@/lib/progress";
import { useSettings } from "@/lib/settings";
import { TechIcon } from "./TechIcon";
import { Card, rise, Stagger, StatPills, useMounted } from "./ui";

const badgeList: { id: "first" | "three" | "streak3" | "exam" | "xp200" | "perfect"; emoji: string; earned: (p: Progress) => boolean }[] = [
  { id: "first", emoji: "✍️", earned: (p) => p.completed.length >= 1 },
  { id: "three", emoji: "🚀", earned: (p) => p.completed.length >= 3 },
  { id: "streak3", emoji: "🔥", earned: (p) => p.streak.count >= 3 },
  { id: "exam", emoji: "🏆", earned: (p) => stages.some((s) => s.exam && (p.exams[s.slug] ?? 0) >= s.exam.passPercent) },
  { id: "xp200", emoji: "⚡", earned: (p) => p.xp >= 200 },
  { id: "perfect", emoji: "💯", earned: (p) => Object.values(p.exams).some((v) => v === 100) },
];

export function ProfileView({ locale }: { locale: Locale }) {
  const mounted = useMounted();
  const dict = getDictionary(locale);
  const pr = dict.profile;
  const progress = useProgress();
  const settings = useSettings();
  if (!mounted) return <div className="min-h-dvh" />;

  const { level, into, need } = levelOf(progress.xp);
  const examsPassed = stages.filter((s) => s.exam && (progress.exams[s.slug] ?? 0) >= s.exam.passPercent).length;

  return (
    <Stagger className="mx-auto flex max-w-3xl flex-col gap-5 px-4 py-6 lg:py-10">
      <motion.div variants={rise} className="flex justify-end">
        <StatPills labels={dict.stats} />
      </motion.div>

      <motion.div variants={rise}>
        <Card className="flex flex-col items-center gap-3 text-center">
          <motion.span
            className="grid size-24 place-items-center rounded-[2rem] bg-accent-soft text-6xl"
            initial={{ scale: 0.5, rotate: -20 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ type: "spring", stiffness: 260, damping: 14 }}
          >
            {settings.avatar}
          </motion.span>
          <h1 className="text-2xl font-bold">{settings.name || dict.home.coder}</h1>
          <span className="rounded-full btn-grad px-4 py-1 font-display font-semibold">
            {pr.level} {level}
          </span>
          <div className="w-full max-w-sm">
            <div className="h-3 overflow-hidden rounded-full bg-surface-2">
              <motion.div
                className="h-full rounded-full bg-gradient-to-l from-saffron to-accent"
                initial={{ width: 0 }}
                animate={{ width: `${(into / need) * 100}%` }}
                transition={{ duration: 1, delay: 0.3 }}
              />
            </div>
            <p className="mt-1 text-sm text-muted">{pr.toNext.replace("{n}", String(need - into))}</p>
          </div>
          <Link href={`/${locale}/settings/`} className="text-sm font-semibold text-accent">
            ✏️ {pr.edit}
          </Link>
        </Card>
      </motion.div>

      <motion.div variants={rise} className="grid grid-cols-3 gap-3 text-center">
        {[
          { v: progress.completed.length, l: pr.lessons, e: "📘" },
          { v: examsPassed, l: pr.exams, e: "🏆" },
          { v: liveStreak(progress), l: pr.best, e: "🔥" },
        ].map((s) => (
          <Card key={s.l} className="flex flex-col items-center gap-1 p-4">
            <span className="text-2xl" aria-hidden="true">
              {s.e}
            </span>
            <span className="font-display text-2xl font-bold tabular-nums">{s.v}</span>
            <span className="text-xs text-muted">{s.l}</span>
          </Card>
        ))}
      </motion.div>

      <motion.section variants={rise} className="flex flex-col gap-3">
        <h2 className="text-xl font-bold">{pr.badges}</h2>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
          {badgeList.map((b, i) => {
            const earned = b.earned(progress);
            const info = dict.badges[b.id];
            return (
              <motion.div
                key={b.id}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2 + i * 0.06, type: "spring", stiffness: 300, damping: 20 }}
                whileHover={earned ? { y: -4, rotate: -2 } : undefined}
                className={`flex flex-col items-center gap-1 rounded-3xl border p-4 text-center ${
                  earned ? "border-saffron bg-saffron-soft" : "border-line bg-surface/70 opacity-55 grayscale"
                }`}
              >
                <span className="text-4xl" aria-hidden="true">
                  {b.emoji}
                </span>
                <span className="font-display font-bold">{info.title}</span>
                <span className="text-xs text-muted">{info.text}</span>
              </motion.div>
            );
          })}
        </div>
      </motion.section>

      <motion.section variants={rise} className="flex flex-col gap-3">
        <h2 className="text-xl font-bold">🎓 {pr.certificates}</h2>
        <div className="no-scrollbar -mx-4 flex snap-x gap-4 overflow-x-auto px-4 pb-2">
          {stages
            .filter((s) => s.certificate)
            .map((s) => (
              <div key={s.slug} className="w-72 flex-none snap-start rounded-3xl p-[2px]" style={{ background: "var(--grad)" }}>
                <div className="relative flex h-full flex-col items-center gap-2 overflow-hidden rounded-[22px] bg-surface p-5 text-center">
                  <span className="absolute inset-3 rounded-2xl border border-line" aria-hidden="true" />
                  <span className="relative font-display text-sm font-bold">
                    <span className="text-grad">سطر · Satr</span>
                  </span>
                  <span className="relative text-xs text-muted">{pr.certificateOf}</span>
                  <span className="relative font-display text-lg font-bold">{t(s.certificate!, locale)}</span>
                  <span className="relative font-display text-muted">{settings.name || dict.home.coder}</span>
                  <span className="relative grid size-16 place-items-center rounded-full bg-gradient-to-br from-[#fde68a] to-[#d97706] text-2xl shadow-lg">
                    <TechIcon tech={s.icon} className="size-8" />
                  </span>
                  <span className="relative rounded-full bg-surface-2 px-3 py-1 text-xs font-semibold text-muted">🔒 {pr.locked}</span>
                </div>
              </div>
            ))}
        </div>
        <p className="text-sm text-muted">{pr.certificatesText}</p>
      </motion.section>
    </Stagger>
  );
}
