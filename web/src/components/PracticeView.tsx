"use client";

import Link from "next/link";
import { motion } from "motion/react";
import { stages, lessonKey } from "@/content/curriculum";
import type { Lesson, Stage } from "@/content/types";
import { challenges } from "@/content/challenges";
import { shortcuts } from "@/content/shortcuts";
import { t, type Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionary";
import { play } from "@/lib/feedback";
import { levelOf, mastery, notesFor, useInsights } from "@/lib/insights";
import { canUseEditor, useProgress } from "@/lib/progress";
import { CheckIcon, CodeIcon, LockIcon } from "./Icons";
import { Card, PageHeader, rise, Stagger, useMounted } from "./ui";

export function PracticeView({ locale }: { locale: Locale }) {
  const mounted = useMounted();
  const dict = getDictionary(locale);
  const p = dict.practice;
  const progress = useProgress();
  const insights = useInsights();
  if (!mounted) return <div className="min-h-dvh" />;

  const done = stages.flatMap((s) =>
    s.lessons.filter((l) => progress.completed.includes(lessonKey(s.slug, l.slug))).map((l) => ({ stage: s, lesson: l })),
  );

  return (
    <Stagger className="mx-auto flex max-w-5xl flex-col gap-6 px-4 py-6 lg:py-10">
      <motion.div variants={rise}>
        <PageHeader title={p.title} labels={dict.stats} />
      </motion.div>

      <motion.div variants={rise}>
        {!canUseEditor(progress) ? (
          <div className="glass flex items-center gap-5 rounded-3xl p-6 shadow-card">
            <span className="grid size-16 flex-none place-items-center rounded-2xl bg-surface-2 text-muted">
              <LockIcon className="size-8" />
            </span>
            <div className="flex flex-col gap-1">
              <h2 className="text-xl font-bold">{p.playground}</h2>
              <p className="text-sm text-muted">{p.locked}</p>
              <Link href={`/${locale}/learn/`} className="mt-1 font-semibold text-accent">
                {p.toPath} {locale === "ar" ? "←" : "→"}
              </Link>
            </div>
          </div>
        ) : (
        <Link
          href={`/${locale}/playground/`}
          onClick={() => play("whoosh")}
          className="relative flex items-center gap-5 overflow-hidden rounded-3xl bg-code-bg p-6 text-code-fg shadow-card"
        >
          <span className="shine absolute inset-0" aria-hidden="true" />
          <motion.span
            className="grid size-16 flex-none place-items-center rounded-2xl btn-grad"
            animate={{ rotate: [0, 6, -6, 0] }}
            transition={{ duration: 2.4, repeat: Infinity, repeatDelay: 1 }}
          >
            <CodeIcon className="size-8" />
          </motion.span>
          <div className="relative flex flex-col gap-1">
            <h2 className="text-xl font-bold">{p.playground}</h2>
            <p className="text-sm text-[#93a5a7]">{p.playgroundText}</p>
            <span className="mt-1 font-semibold text-saffron">{p.open} {locale === "ar" ? "←" : "→"}</span>
          </div>
        </Link>
        )}
      </motion.div>

      <motion.div variants={rise}>
        <Link
          href={`/${locale}/challenge/`}
          onClick={() => play("whoosh")}
          className="btn-grad relative flex items-center gap-5 overflow-hidden rounded-3xl p-6 shadow-card"
        >
          <span aria-hidden="true" className="absolute -bottom-4 end-3 font-mono text-7xl font-bold opacity-20">
            {"<_>"}
          </span>
          <motion.span
            className="grid size-16 flex-none place-items-center rounded-2xl bg-white/20 text-3xl"
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ duration: 1.6, repeat: Infinity }}
            aria-hidden="true"
          >
            🧩
          </motion.span>
          <div className="relative flex flex-col gap-1">
            <h2 className="text-xl font-bold">{p.challenge}</h2>
            <p className="text-sm opacity-90">
              {challenges.filter((x) => progress.completed.includes(x.after)).length
                ? p.challengeCount.replace("{n}", String(challenges.filter((x) => progress.completed.includes(x.after)).length))
                : p.challengeLocked}
            </p>
            <span className="mt-1 font-semibold">{p.play} {locale === "ar" ? "←" : "→"}</span>
          </div>
        </Link>
      </motion.div>

      <motion.section variants={rise} className="flex flex-col gap-3">
        <div>
          <h2 className="text-xl font-bold">⚡ {p.shortcuts}</h2>
          <p className="text-sm text-muted">{p.shortcutsText}</p>
        </div>
        <div className="no-scrollbar -mx-4 flex snap-x gap-3 overflow-x-auto px-4 pb-2">
          {[...shortcuts].sort((a, b) => Number(progress.completed.includes(b.after)) - Number(progress.completed.includes(a.after))).map((s) => {
            const open = progress.completed.includes(s.after);
            return (
            <Card key={s.abbr} className={`flex w-64 flex-none snap-start flex-col gap-2 p-4 ${open ? "" : "opacity-45"}`} whileHover={open ? { y: -4 } : undefined}>
              <code className="flex items-center gap-2 self-start rounded-lg bg-accent-soft px-2.5 py-1 font-mono font-bold text-accent" dir="ltr">
                {s.abbr}
                {!open && <LockIcon className="size-3.5" />}
              </code>
              <pre className="max-h-28 overflow-auto rounded-xl bg-code-bg p-3 font-mono text-xs text-code-fg">{s.output}</pre>
              <p className="text-sm text-muted">{t(s.text, locale)}</p>
            </Card>
            );
          })}
        </div>
      </motion.section>

      <motion.section variants={rise} className="flex flex-col gap-3">
        <h2 className="text-xl font-bold">🔁 {p.review}</h2>
        {done.length === 0 ? (
          <Card className="text-muted">{p.reviewEmpty}</Card>
        ) : (
          <div className="grid gap-3 sm:grid-cols-2">
            {done.map(({ stage, lesson }) => (
              <Link
                key={lesson.slug}
                href={`/${locale}/learn/${stage.slug}/${lesson.slug}/`}
                onClick={() => play("select")}
                className="flex items-center gap-3 rounded-2xl glass p-4 shadow-card"
              >
                <span className="grid size-9 flex-none place-items-center rounded-full bg-saffron text-ink">
                  <CheckIcon className="size-4" />
                </span>
                <span className="flex flex-col">
                  <span className="text-xs text-muted">{stage.badge}</span>
                  <span className="font-semibold">{t(lesson.title, locale)}</span>
                </span>
              </Link>
            ))}
          </div>
        )}
      </motion.section>

      <CoachNotes locale={locale} done={done} insights={insights} />
    </Stagger>
  );
}

/**
 * The app's notes on the learner, built from how each finished lesson went:
 * strengths, lessons that need work (which also come back for review sooner), and per-lesson notes.
 */
function CoachNotes({
  locale,
  done,
  insights,
}: {
  locale: Locale;
  done: { stage: Stage; lesson: Lesson }[];
  insights: ReturnType<typeof useInsights>;
}) {
  const c = getDictionary(locale).coach;
  const rated = done
    .map((d) => ({ ...d, key: lessonKey(d.stage.slug, d.lesson.slug), stats: insights[lessonKey(d.stage.slug, d.lesson.slug)] }))
    .filter((d) => d.stats?.done)
    .map((d) => ({ ...d, m: mastery(d.stats!) }));
  const strong = rated.filter((d) => levelOf(d.m) === "strong").sort((a, b) => b.m - a.m).slice(0, 4);
  const weak = rated.filter((d) => levelOf(d.m) === "weak").sort((a, b) => a.m - b.m).slice(0, 4);
  const recent = [...rated].sort((a, b) => (b.stats!.done ?? "").localeCompare(a.stats!.done ?? "")).slice(0, 6);

  return (
    <motion.section variants={rise} className="flex flex-col gap-3">
      <div className="flex flex-col gap-1">
        <h2 className="text-xl font-bold">🧭 {c.title}</h2>
        <p className="text-sm text-muted">{c.subtitle}</p>
      </div>
      {rated.length === 0 ? (
        <Card className="text-muted">{c.empty}</Card>
      ) : (
        <>
          <div className="grid gap-3 sm:grid-cols-2">
            <Card className="flex flex-col gap-2">
              <h3 className="font-bold text-ok">💪 {c.strengths}</h3>
              {strong.length ? (
                <ul className="flex flex-col gap-1 text-sm">
                  {strong.map((d) => (
                    <li key={d.key} className="flex justify-between gap-2">
                      <span>{t(d.lesson.title, locale)}</span>
                      <bdi className="font-bold tabular-nums text-ok">{d.m}%</bdi>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-sm text-muted">{c.noStrengths}</p>
              )}
            </Card>
            <Card className="flex flex-col gap-2">
              <h3 className="font-bold text-coral">🎯 {c.weaknesses}</h3>
              {weak.length ? (
                <ul className="flex flex-col gap-1 text-sm">
                  {weak.map((d) => (
                    <li key={d.key}>
                      <Link href={`/${locale}/learn/${d.stage.slug}/${d.lesson.slug}/`} className="flex justify-between gap-2">
                        <span className="underline decoration-dotted">{t(d.lesson.title, locale)}</span>
                        <bdi className="font-bold tabular-nums text-coral">{d.m}%</bdi>
                      </Link>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-sm text-muted">{c.noWeaknesses}</p>
              )}
              {weak.length > 0 && <p className="text-xs text-muted">{c.weakHint}</p>}
            </Card>
          </div>
          <div className="flex flex-col gap-2">
            <h3 className="font-bold">{c.recent}</h3>
            {recent.map((d) => (
              <Card key={d.key} className="flex flex-col gap-1.5">
                <div className="flex items-center justify-between gap-2">
                  <span className="font-semibold">
                    <span className="text-xs text-muted">{d.stage.badge} · </span>
                    {t(d.lesson.title, locale)}
                  </span>
                  <span className={`rounded-full px-2.5 py-0.5 text-xs font-bold ${levelOf(d.m) === "strong" ? "bg-ok/15 text-ok" : levelOf(d.m) === "weak" ? "bg-coral/15 text-coral" : "bg-saffron-soft"}`}>
                    {c.levels[levelOf(d.m)]}
                  </span>
                </div>
                <ul className="list-inside list-disc text-sm text-muted">
                  {notesFor(d.stats!).map((n, i) => (
                    <li key={i}>{t(n, locale)}</li>
                  ))}
                </ul>
              </Card>
            ))}
          </div>
        </>
      )}
    </motion.section>
  );
}
