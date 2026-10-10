"use client";

import Link from "next/link";
import { motion } from "motion/react";
import { lessonKey, orderedStages, trackParts } from "@/content/curriculum";
import { t, type Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionary";
import { play } from "@/lib/feedback";
import { isStageUnlocked, useProgress } from "@/lib/progress";
import { useSettings } from "@/lib/settings";
import { CheckIcon, LockIcon } from "./Icons";
import { TechIcon } from "./TechIcon";
import { PageHeader, useMounted } from "./ui";

/** Divides the path into the chosen track, the track that opens after it, and the finale. */
function PartHeading({ icon, label, title, action }: { icon: string; label: string; title: string; action?: { href: string; text: string } }) {
  return (
    <div className="mt-2 flex items-center gap-3">
      <span className="grid size-11 flex-none place-items-center rounded-2xl bg-surface-2 text-2xl" aria-hidden="true">
        {icon}
      </span>
      <div className="flex min-w-0 flex-1 flex-col">
        <span className="text-xs font-semibold text-muted">{label}</span>
        <h2 className="font-display text-lg font-bold leading-tight">{title}</h2>
      </div>
      {action && (
        <Link href={action.href} className="flex-none rounded-full bg-surface-2 px-3 py-1.5 text-xs font-semibold text-accent">
          {action.text}
        </Link>
      )}
    </div>
  );
}

const HEX = "polygon(50% 0, 100% 25%, 100% 75%, 50% 100%, 0 75%, 0 25%)";

function Hex({ children, tone, pulse }: { children: React.ReactNode; tone: "done" | "current" | "locked" | "stage"; pulse?: boolean }) {
  const bg = {
    done: "linear-gradient(135deg,#34d399,#0e8c7f)",
    current: "var(--grad)",
    locked: "var(--surface-2)",
    stage: "linear-gradient(135deg, rgba(255,255,255,0.14), rgba(255,255,255,0.04))",
  }[tone];
  return (
    <span className="relative grid size-14 flex-none place-items-center">
      {pulse && (
        <motion.span
          aria-hidden="true"
          className="absolute inset-0"
          style={{ clipPath: HEX, background: "var(--grad)" }}
          animate={{ scale: [1, 1.4], opacity: [0.6, 0] }}
          transition={{ duration: 1.6, repeat: Infinity, ease: "easeOut" }}
        />
      )}
      <span className="absolute inset-0" style={{ clipPath: HEX, background: "var(--line)" }} />
      <span className={`absolute inset-[2px] grid place-items-center ${tone === "locked" ? "text-muted" : "text-white"}`} style={{ clipPath: HEX, background: bg }}>
        {children}
      </span>
    </span>
  );
}

export function PathMap({ locale }: { locale: Locale }) {
  const mounted = useMounted();
  const dict = getDictionary(locale);
  const d = dict.learn;
  const progress = useProgress();
  const { track } = useSettings();
  if (!mounted) return <div className="min-h-dvh" />;

  const o = dict.onboarding;
  const ordered = orderedStages(track);
  const parts = trackParts(track);
  const totalLessons = ordered.reduce((n, s) => n + s.lessons.length, 0);
  const pct = totalLessons ? Math.round((progress.completed.length / totalLessons) * 100) : 0;

  return (
    <div className="mx-auto flex max-w-2xl flex-col gap-8 px-4 py-6 lg:py-10">
      <div className="flex flex-col gap-3">
        <PageHeader title={d.title} subtitle={d.subtitle} labels={dict.stats} />
        <div className="flex items-center gap-3">
          <div className="h-2.5 flex-1 overflow-hidden rounded-full bg-surface-2">
            <motion.div className="btn-grad h-full rounded-full" initial={{ width: 0 }} animate={{ width: `${pct}%` }} transition={{ duration: 1 }} />
          </div>
          <span className="text-sm font-semibold tabular-nums text-muted">{pct}%</span>
        </div>
      </div>

      {ordered.map((stage, si) => {
        const unlocked = isStageUnlocked(stage.slug, progress, track);
        const heading =
          si === 1 ? (
            <PartHeading icon={track === "web" ? "🌐" : "📱"} label={d.yourTrack} title={o.tracks[track].t} action={{ href: `/${locale}/settings/#learning`, text: d.changeTrack }} />
          ) : stage === parts.other[0] ? (
            <PartHeading icon="🔓" label={d.thenOpens} title={o.tracks[track === "web" ? "mobile" : "web"].t} />
          ) : stage === parts.final[0] ? (
            <PartHeading icon="🏆" label={d.finalPart} title={t(stage.certificate ?? stage.title, locale)} />
          ) : null;
        const done = (slug: string) => progress.completed.includes(lessonKey(stage.slug, slug));
        const current = stage.lessons.findIndex((l) => !done(l.slug));
        const examScore = progress.exams[stage.slug] ?? 0;
        const examPassed = !!stage.exam && examScore >= stage.exam.passPercent;
        const allLessonsDone = current === -1;
        const stageDone = stage.lessons.filter((l) => done(l.slug)).length;

        return (
          <motion.section
            key={stage.slug}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ type: "spring", stiffness: 200, damping: 24 }}
            className="flex flex-col gap-3"
          >
            {heading}
            {/* Stage header: the course card */}
            <div className="relative overflow-hidden rounded-3xl p-5 text-white shadow-card" style={{ background: stage.gradient, opacity: unlocked ? 1 : 0.55 }}>
              <span className="absolute -end-6 -top-6 size-28 rounded-full bg-white/10" aria-hidden="true" />
              <div className="relative flex items-center gap-4">
                <span className="grid size-16 flex-none place-items-center rounded-2xl bg-white/15 backdrop-blur">
                  <TechIcon tech={stage.icon} className="size-10" />
                </span>
                <div className="flex min-w-0 flex-1 flex-col">
                  <span className="text-xs font-semibold opacity-85">
                    {d.stage} {si + 1} · {stage.status === "soon" ? d.soon : unlocked ? `${stageDone}/${stage.lessons.length} ${d.lessons}` : d.locked}
                  </span>
                  <h2 className="text-lg font-bold">{t(stage.title, locale)}</h2>
                  <p className="text-sm opacity-90">{t(stage.description, locale)}</p>
                  {stage.certificate && <span className="mt-1 text-sm font-semibold">🎓 {t(stage.certificate, locale)}</span>}
                  {stage.standard && (
                    <span className="mt-1.5 self-start rounded-full bg-black/20 px-2.5 py-0.5 text-[11px] font-semibold">
                      ✓ {d.updated} {t(stage.standard, locale)}
                    </span>
                  )}
                </div>
                {(stage.status === "soon" || !unlocked) && <LockIcon className="size-6 flex-none opacity-80" />}
              </div>
            </div>

            {/* Timeline */}
            {stage.status === "available" && unlocked && (
              <ol className="relative flex flex-col gap-3 ps-1">
                <span aria-hidden="true" className="absolute inset-y-7 start-[30px] w-0.5 bg-line" />
                {stage.lessons.map((lesson, i) => {
                  const isDone = done(lesson.slug);
                  const isCurrent = i === current;
                  const open = isDone || isCurrent;
                  const card = (
                    <motion.div
                      whileTap={open ? { scale: 0.98 } : undefined}
                      className={`flex flex-1 items-center gap-3 rounded-2xl p-4 ${
                        isCurrent ? "btn-grad glow-ring" : "glass"
                      } ${open ? "" : "opacity-60"}`}
                    >
                      <div className="flex min-w-0 flex-1 flex-col">
                        <span className="font-display font-semibold">{t(lesson.title, locale)}</span>
                        <span className={`text-xs ${isCurrent ? "text-white/85" : "text-muted"}`}>
                          <bdi>⏱ {d.minutes}</bdi> · <bdi>⚡ {lesson.xp} XP</bdi>
                        </span>
                      </div>
                      {isDone && (
                        <span className="grid size-7 place-items-center rounded-full bg-ok text-white">
                          <CheckIcon className="size-4" />
                        </span>
                      )}
                      {isCurrent && <span className="rounded-full bg-white/20 px-3 py-1 text-xs font-bold">{d.start}</span>}
                      {!open && <LockIcon className="size-5 text-muted" />}
                    </motion.div>
                  );
                  return (
                    <li key={lesson.slug} className="relative flex items-center gap-3">
                      <Hex tone={isDone ? "done" : isCurrent ? "current" : "locked"} pulse={isCurrent}>
                        {isDone ? <CheckIcon className="size-6" /> : <span className="font-display font-bold">{i + 1}</span>}
                      </Hex>
                      {open ? (
                        <Link href={`/${locale}/learn/${stage.slug}/${lesson.slug}/`} onClick={() => play("select")} className="flex flex-1">
                          {card}
                        </Link>
                      ) : (
                        card
                      )}
                    </li>
                  );
                })}

                {stage.exam && (
                  <li className="relative flex items-center gap-3">
                    <Hex tone={examPassed ? "done" : allLessonsDone ? "current" : "locked"} pulse={allLessonsDone && !examPassed}>
                      <span className="text-2xl">🏆</span>
                    </Hex>
                    {allLessonsDone ? (
                      <Link href={`/${locale}/learn/${stage.slug}/exam/`} onClick={() => play("select")} className="flex flex-1">
                        <motion.div whileTap={{ scale: 0.98 }} className="glass flex flex-1 items-center justify-between gap-3 rounded-2xl border-saffron! p-4">
                          <span className="font-display font-semibold">{d.exam}</span>
                          <span className="rounded-full bg-saffron px-3 py-1 text-xs font-bold text-ink">
                            {examPassed ? `${d.examPassed} ${examScore}%` : d.start}
                          </span>
                        </motion.div>
                      </Link>
                    ) : (
                      <div className="glass flex flex-1 items-center justify-between rounded-2xl p-4 opacity-60">
                        <span className="font-display font-semibold">{d.exam}</span>
                        <LockIcon className="size-5 text-muted" />
                      </div>
                    )}
                  </li>
                )}
              </ol>
            )}
          </motion.section>
        );
      })}
    </div>
  );
}
