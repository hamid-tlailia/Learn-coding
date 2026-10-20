"use client";

import Link from "next/link";
import { motion } from "motion/react";
import { useEffect, useState } from "react";
import { lessonKey, orderedStages, trackParts } from "@/content/curriculum";
import type { Lesson, Stage } from "@/content/types";
import { t, type L, type Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionary";
import { play } from "@/lib/feedback";
import { isStageUnlocked, PROJECT_PASS, useProgress } from "@/lib/progress";
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

/** A round marker on the timeline; the current step pulses. */
function Marker({ children, tone, pulse }: { children: React.ReactNode; tone: "done" | "current" | "locked" | "stage"; pulse?: boolean }) {
  const bg = {
    done: "linear-gradient(135deg,#34d399,#0e8c7f)",
    current: "var(--grad)",
    locked: "var(--surface-2)",
    stage: "linear-gradient(135deg, rgba(255,255,255,0.14), rgba(255,255,255,0.04))",
  }[tone];
  return (
    <span className="relative grid size-11 flex-none place-items-center">
      {pulse && (
        <motion.span
          aria-hidden="true"
          className="absolute inset-0 rounded-full"
          style={{ background: "var(--grad)" }}
          animate={{ scale: [1, 1.35], opacity: [0.55, 0] }}
          transition={{ duration: 1.6, repeat: Infinity, ease: "easeOut" }}
        />
      )}
      <span
        className={`absolute inset-0 grid place-items-center rounded-full border-2 border-line ${tone === "locked" ? "text-muted" : "border-transparent text-white"}`}
        style={{ background: bg }}
      >
        {children}
      </span>
    </span>
  );
}

type Unit = { title: L | null; items: { lesson: Lesson; index: number }[] };

/** A stage's lessons in groups: its own units, or even chunks of about six for long stages. */
function unitsOf(stage: Stage, part: L): Unit[] {
  const items = stage.lessons.map((lesson, index) => ({ lesson, index }));
  if (stage.units?.length) {
    const starts = stage.units.map((u) => Math.max(0, stage.lessons.findIndex((l) => l.slug === u.from)));
    return stage.units.map((u, i) => ({ title: u.title, items: items.slice(starts[i], starts[i + 1] ?? items.length) }));
  }
  if (items.length <= 8) return [{ title: null, items }];
  const count = Math.ceil(items.length / 6);
  const size = Math.ceil(items.length / count);
  return Array.from({ length: count }, (_, i) => ({
    title: { ar: `${part.ar} ${i + 1}`, en: `${part.en} ${i + 1}` },
    items: items.slice(i * size, (i + 1) * size),
  }));
}

export function PathMap({ locale }: { locale: Locale }) {
  const mounted = useMounted();
  const dict = getDictionary(locale);
  const d = dict.learn;
  const progress = useProgress();
  const { track } = useSettings();
  // Which units and finished stages the learner opened or closed by hand; the rest follow their defaults.
  const [toggled, setToggled] = useState<Record<string, boolean>>({});
  const flip = (key: string, now: boolean) => setToggled((all) => ({ ...all, [key]: !now }));

  // Opening the path scrolls to where the learner is: the first current step on the page.
  useEffect(() => {
    if (!mounted) return;
    const id = window.setTimeout(() => {
      document.querySelector("[data-current]")?.scrollIntoView({ behavior: "smooth", block: "center" });
    }, 200);
    return () => window.clearTimeout(id);
  }, [mounted]);

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
        const projectScore = progress.projects?.[stage.slug] ?? 0;
        const allLessonsDone = current === -1;
        const stageDone = stage.lessons.filter((l) => done(l.slug)).length;
        const stageComplete = allLessonsDone && (!stage.exam || examPassed) && (!stage.project || projectScore >= PROJECT_PASS);
        const stageOpen = toggled[stage.slug] ?? !stageComplete;

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

            {/* Timeline: finished stages fold away; long stages come in units, only the current one open. */}
            {stage.status === "available" && unlocked && stageComplete && (
              <button
                type="button"
                onClick={() => flip(stage.slug, stageOpen)}
                className="flex items-center justify-between rounded-2xl bg-surface-2 px-4 py-2.5 text-sm font-semibold"
                aria-expanded={stageOpen}
              >
                <span className="flex items-center gap-2 text-ok">
                  <CheckIcon className="size-4" /> {d.stageDone}
                </span>
                <span className="text-accent">{stageOpen ? d.hideLessons : d.showLessons}</span>
              </button>
            )}
            {stage.status === "available" && unlocked && stageOpen && (
              <ol className="relative flex flex-col gap-2 ps-1">
                <span aria-hidden="true" className="absolute inset-y-6 start-[26px] w-0.5 bg-line" />
                {unitsOf(stage, { ar: getDictionary("ar").learn.part, en: getDictionary("en").learn.part }).map((unit, ui) => {
                  const unitKey = `${stage.slug}/${ui}`;
                  const doneCount = unit.items.filter(({ lesson }) => done(lesson.slug)).length;
                  const unitDone = doneCount === unit.items.length;
                  const hasCurrent = unit.items.some(({ index }) => index === current);
                  const unitOpen = !unit.title || (toggled[unitKey] ?? hasCurrent);
                  return (
                    <li key={unitKey} className="flex flex-col gap-2">
                      {unit.title && (
                        <button
                          type="button"
                          onClick={() => flip(unitKey, unitOpen)}
                          aria-expanded={unitOpen}
                          className="relative flex items-center gap-3 text-start"
                        >
                          <Marker tone={unitDone ? "done" : hasCurrent ? "current" : "locked"}>
                            {unitDone ? <CheckIcon className="size-5" /> : <span className="font-display text-sm font-bold">{ui + 1}</span>}
                          </Marker>
                          <span className="flex min-w-0 flex-1 items-center gap-2 rounded-2xl bg-surface-2 px-4 py-2.5">
                            <span className="min-w-0 flex-1 truncate font-display font-bold">{t(unit.title, locale)}</span>
                            <span className={`flex-none text-xs font-semibold tabular-nums ${unitDone ? "text-ok" : "text-muted"}`}>
                              {doneCount}/{unit.items.length}
                            </span>
                            <motion.span animate={{ rotate: unitOpen ? 180 : 0 }} className="flex-none text-muted" aria-hidden="true">
                              ▾
                            </motion.span>
                          </span>
                        </button>
                      )}
                      {unitOpen && (
                        <ol className="flex flex-col gap-2">
                          {unit.items.map(({ lesson, index: i }) => {
                            const isDone = done(lesson.slug);
                            const isCurrent = i === current;
                            const open = isDone || isCurrent;
                            const card = (
                              <motion.div
                                whileTap={open ? { scale: 0.98 } : undefined}
                                className={`flex flex-1 items-center gap-3 rounded-2xl px-4 py-3 ${isCurrent ? "btn-grad glow-ring" : "glass"} ${open ? "" : "opacity-60"}`}
                              >
                                <div className="flex min-w-0 flex-1 flex-col">
                                  <span className="font-display text-[0.95rem] font-semibold">{t(lesson.title, locale)}</span>
                                  {isCurrent && (
                                    <span className="text-xs text-white/85">
                                      <bdi>⏱ {d.minutes}</bdi> · <bdi>⚡ {lesson.xp} XP</bdi>
                                    </span>
                                  )}
                                </div>
                                {isCurrent && <span className="rounded-full bg-white/20 px-3 py-1 text-xs font-bold">{d.start}</span>}
                                {!open && <LockIcon className="size-4 flex-none text-muted" />}
                              </motion.div>
                            );
                            return (
                              <li key={lesson.slug} className="relative flex items-center gap-3" data-current={isCurrent || undefined}>
                                <Marker tone={isDone ? "done" : isCurrent ? "current" : "locked"} pulse={isCurrent}>
                                  {isDone ? <CheckIcon className="size-5" /> : <span className="font-display text-sm font-bold">{i + 1}</span>}
                                </Marker>
                                {open ? (
                                  <Link href={`/${locale}/learn/${stage.slug}/${lesson.slug}/`} onClick={() => play("select")} className="flex min-w-0 flex-1">
                                    {card}
                                  </Link>
                                ) : (
                                  card
                                )}
                              </li>
                            );
                          })}
                        </ol>
                      )}
                    </li>
                  );
                })}

                {stage.exam && (
                  <li className="relative flex items-center gap-3" data-current={(allLessonsDone && !examPassed) || undefined}>
                    <Marker tone={examPassed ? "done" : allLessonsDone ? "current" : "locked"} pulse={allLessonsDone && !examPassed}>
                      <span className="text-xl">🏆</span>
                    </Marker>
                    {allLessonsDone ? (
                      <Link href={`/${locale}/learn/${stage.slug}/exam/`} onClick={() => play("select")} className="flex flex-1">
                        <motion.div whileTap={{ scale: 0.98 }} className="glass flex flex-1 items-center justify-between gap-3 rounded-2xl border-saffron! px-4 py-3">
                          <span className="font-display font-semibold">{d.exam}</span>
                          <span className="rounded-full bg-saffron px-3 py-1 text-xs font-bold text-ink">
                            {examPassed ? `${d.examPassed} ${examScore}%` : d.start}
                          </span>
                        </motion.div>
                      </Link>
                    ) : (
                      <div className="glass flex flex-1 items-center justify-between rounded-2xl px-4 py-3 opacity-60">
                        <span className="font-display font-semibold">{d.exam}</span>
                        <LockIcon className="size-5 text-muted" />
                      </div>
                    )}
                  </li>
                )}

                {stage.project && (
                  <li className="relative flex items-center gap-3" data-current={(examPassed && projectScore < PROJECT_PASS) || undefined}>
                    <Marker tone={projectScore >= PROJECT_PASS ? "done" : examPassed ? "current" : "locked"} pulse={examPassed && projectScore < PROJECT_PASS}>
                      <span className="text-xl">🏗️</span>
                    </Marker>
                    {examPassed ? (
                      <Link href={`/${locale}/learn/${stage.slug}/project/`} onClick={() => play("select")} className="flex flex-1">
                        <motion.div whileTap={{ scale: 0.98 }} className="glass flex flex-1 items-center justify-between gap-3 rounded-2xl px-4 py-3">
                          <span className="flex flex-col">
                            <span className="font-display font-semibold">{dict.project.row}</span>
                            <span className="text-xs text-muted">{t(stage.project.title, locale)}</span>
                          </span>
                          <span className="flex-none rounded-full bg-accent px-3 py-1 text-xs font-bold text-white">
                            {projectScore > 0 ? `${projectScore}%` : d.start}
                          </span>
                        </motion.div>
                      </Link>
                    ) : (
                      <div className="glass flex flex-1 items-center justify-between rounded-2xl px-4 py-3 opacity-60">
                        <span className="font-display font-semibold">{dict.project.row}</span>
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
