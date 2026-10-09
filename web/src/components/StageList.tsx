"use client";

import Link from "next/link";
import { lessonKey, stages } from "@/content/curriculum";
import { t, type Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionary";
import { isStageUnlocked, useProgress } from "@/lib/progress";

export function StageList({ locale }: { locale: Locale }) {
  const dict = getDictionary(locale).learn;
  const progress = useProgress();

  return (
    <ol className="relative flex flex-col gap-4 border-s-2 border-line ps-6">
      {stages.map((stage) => {
        const unlocked = isStageUnlocked(stage.slug, progress);
        const doneCount = stage.lessons.filter((l) => progress.completed.includes(lessonKey(stage.slug, l.slug))).length;
        const nextLesson = stage.lessons.find((l) => !progress.completed.includes(lessonKey(stage.slug, l.slug)));
        const examScore = progress.exams[stage.slug];
        const examPassed = !!stage.exam && (examScore ?? 0) >= stage.exam.passPercent;

        return (
          <li key={stage.slug} className="relative">
            <span
              aria-hidden="true"
              className={`absolute -start-[34px] top-6 size-4 rounded-full border-4 border-paper ${
                examPassed ? "bg-ok" : unlocked ? "bg-teal" : "bg-line"
              }`}
            />
            <div className={`flex flex-col gap-4 rounded-2xl border border-line bg-surface p-5 ${unlocked ? "" : "opacity-70"}`}>
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div className="flex items-start gap-4">
                  <span className="grid h-12 min-w-12 place-items-center rounded-xl bg-teal-soft px-2 font-mono text-sm font-semibold text-teal">
                    {stage.badge}
                  </span>
                  <div className="flex flex-col gap-1">
                    <h2 className="text-lg font-bold">{t(stage.title, locale)}</h2>
                    <p className="text-sm text-muted">{t(stage.description, locale)}</p>
                    {stage.certificate && <span className="text-sm font-medium text-teal">🎓 {t(stage.certificate, locale)}</span>}
                  </div>
                </div>
                <span className="rounded-full bg-paper px-3 py-1 text-xs font-semibold text-muted">
                  {stage.status === "soon"
                    ? dict.soon
                    : !unlocked
                      ? dict.locked
                      : `${doneCount}/${stage.lessons.length} ${dict.lessons}`}
                </span>
              </div>

              {stage.status === "available" && unlocked && (
                <div className="flex flex-col gap-2">
                  <ul className="grid gap-2 sm:grid-cols-2">
                    {stage.lessons.map((lesson, i) => {
                      const done = progress.completed.includes(lessonKey(stage.slug, lesson.slug));
                      return (
                        <li key={lesson.slug}>
                          <Link
                            href={`/${locale}/learn/${stage.slug}/${lesson.slug}`}
                            className="flex items-center gap-3 rounded-xl border border-line px-3 py-2 hover:border-teal"
                          >
                            <span
                              className={`grid size-7 flex-none place-items-center rounded-full text-xs font-semibold tabular-nums ${
                                done ? "bg-ok text-white" : "bg-paper text-muted"
                              }`}
                            >
                              {done ? "✓" : i + 1}
                            </span>
                            <span className="text-sm">{t(lesson.title, locale)}</span>
                          </Link>
                        </li>
                      );
                    })}
                  </ul>
                  <div className="flex flex-wrap items-center gap-2 pt-1">
                    {nextLesson && (
                      <Link
                        href={`/${locale}/learn/${stage.slug}/${nextLesson.slug}`}
                        className="rounded-xl bg-teal px-4 py-2 font-display text-sm font-semibold text-white"
                      >
                        {doneCount === 0 ? dict.start : dict.continue}
                      </Link>
                    )}
                    {stage.exam && (
                      <Link
                        href={`/${locale}/learn/${stage.slug}/exam`}
                        className={`rounded-xl px-4 py-2 font-display text-sm font-semibold ${
                          examPassed ? "bg-ok/15 text-ink" : "bg-saffron text-ink"
                        }`}
                      >
                        {dict.exam}
                        {examPassed ? ` · ${dict.examPassed} ${examScore}%` : ""}
                      </Link>
                    )}
                  </div>
                </div>
              )}
            </div>
          </li>
        );
      })}
    </ol>
  );
}
