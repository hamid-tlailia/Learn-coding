"use client";

import Link from "next/link";
import { motion } from "motion/react";
import { stages, lessonKey } from "@/content/curriculum";
import { shortcuts } from "@/content/shortcuts";
import { t, type Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionary";
import { play } from "@/lib/feedback";
import { useProgress } from "@/lib/progress";
import { CheckIcon, CodeIcon } from "./Icons";
import { Card, PageHeader, rise, Stagger, useMounted } from "./ui";

export function PracticeView({ locale }: { locale: Locale }) {
  const mounted = useMounted();
  const dict = getDictionary(locale);
  const p = dict.practice;
  const progress = useProgress();
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
            <p className="text-sm opacity-90">{p.challengeText}</p>
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
          {shortcuts.map((s) => (
            <Card key={s.abbr} className="flex w-64 flex-none snap-start flex-col gap-2 p-4" whileHover={{ y: -4 }}>
              <code className="self-start rounded-lg bg-accent-soft px-2.5 py-1 font-mono font-bold text-accent" dir="ltr">
                {s.abbr}
              </code>
              <pre className="max-h-28 overflow-auto rounded-xl bg-code-bg p-3 font-mono text-xs text-code-fg">{s.output}</pre>
              <p className="text-sm text-muted">{t(s.text, locale)}</p>
            </Card>
          ))}
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
    </Stagger>
  );
}
