"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { getStage, lessonKey } from "@/content/curriculum";
import type { FileKind, Files } from "@/content/types";
import { dirOf, t, type Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionary";
import { completeLesson, useProgress } from "@/lib/progress";
import { buildPreview, runChecks } from "@/lib/runner";
import { CodeEditor } from "./CodeEditor";
import { RichText } from "./RichText";

const fileNames: Record<FileKind, string> = { html: "index.html", css: "style.css", js: "script.js" };

function draftKey(key: string) {
  return `satr-draft-v1:${key}`;
}

export function LessonView({ locale, stageSlug, lessonSlug }: { locale: Locale; stageSlug: string; lessonSlug: string }) {
  const dict = getDictionary(locale).lesson;
  const stage = getStage(stageSlug)!;
  const index = stage.lessons.findIndex((l) => l.slug === lessonSlug);
  const lesson = stage.lessons[index];
  const next = stage.lessons[index + 1];
  const key = lessonKey(stage.slug, lesson.slug);
  const progress = useProgress();
  const alreadyDone = progress.completed.includes(key);

  // Explanation language can differ from the interface language, so learners can peek at the other one.
  const [textLang, setTextLang] = useState<Locale>(locale);
  const [files, setFiles] = useState<Files>(lesson.starter);
  const [active, setActive] = useState<FileKind>(lesson.files[0]);
  const [results, setResults] = useState<Record<string, boolean> | null>(null);
  const [hintsShown, setHintsShown] = useState(0);
  const [preview, setPreview] = useState(() => buildPreview(lesson.starter));

  useEffect(() => {
    try {
      const saved = window.localStorage.getItem(draftKey(key));
      if (saved) setFiles(JSON.parse(saved));
    } catch {
      // No saved draft: keep the starter code.
    }
  }, [key]);

  // Live preview, debounced so the iframe doesn't reload on every keystroke.
  useEffect(() => {
    const id = window.setTimeout(() => {
      setPreview(buildPreview(files));
      try {
        window.localStorage.setItem(draftKey(key), JSON.stringify(files));
      } catch {
        // Drafts are a convenience; ignore storage failures.
      }
    }, 300);
    return () => window.clearTimeout(id);
  }, [files, key]);

  const allPassed = useMemo(() => !!results && lesson.tasks.every((task) => results[task.id]), [results, lesson.tasks]);

  function check() {
    const r = runChecks(lesson.tasks, files);
    setResults(r);
    if (lesson.tasks.every((task) => r[task.id])) completeLesson(key, lesson.xp);
  }

  function setFile(kind: FileKind, value: string) {
    setFiles((f) => ({ ...f, [kind]: value }));
  }

  const tl = textLang;
  const fwd = locale === "ar" ? "←" : "→";
  const backArrow = locale === "ar" ? "→" : "←";
  const tdir = dirOf(tl);

  return (
    <div className="mx-auto max-w-[1400px] px-4 py-4">
      <div className="mb-3 flex flex-wrap items-center justify-between gap-3 text-sm">
        <div className="flex items-center gap-3 text-muted">
          <Link href={`/${locale}/learn`} className="hover:text-ink">
            {backArrow} {dict.back}
          </Link>
          <span>
            {stage.badge} · {index + 1} {dict.of} {stage.lessons.length}
          </span>
          <div className="h-2 w-32 overflow-hidden rounded-full bg-line" aria-hidden="true">
            <div className="h-full rounded-full bg-teal" style={{ width: `${((index + (alreadyDone ? 1 : 0)) / stage.lessons.length) * 100}%` }} />
          </div>
        </div>
        <div className="inline-flex overflow-hidden rounded-full border border-line" role="group" aria-label="Explanation language">
          {(["ar", "en"] as const).map((l) => (
            <button
              key={l}
              type="button"
              onClick={() => setTextLang(l)}
              aria-pressed={tl === l}
              className={`px-3 py-1 ${tl === l ? "bg-teal text-white" : "text-muted hover:text-ink"}`}
            >
              {l === "ar" ? "شرح عربي" : "English"}
            </button>
          ))}
        </div>
      </div>

      <div className="grid overflow-hidden rounded-2xl border border-line bg-surface shadow-[0_18px_50px_-30px_rgba(15,27,30,.45)] lg:grid-cols-[minmax(0,1fr)_minmax(0,1.25fr)]">
        {/* Explanation */}
        <article dir={tdir} lang={tl} className="flex min-w-0 flex-col gap-5 border-line p-6 max-lg:border-b lg:border-e lg:max-h-[calc(100vh-150px)] lg:overflow-y-auto">
          <h1 className="text-2xl font-bold">{t(lesson.title, tl)}</h1>

          {lesson.body.map((p, i) => (
            <p key={i} className="max-w-[62ch]">
              <RichText text={t(p, tl)} />
            </p>
          ))}

          {lesson.example && (
            <figure className="flex flex-col gap-2">
              <pre className="overflow-x-auto rounded-xl bg-code-bg p-4 font-mono text-sm text-code-fg">{lesson.example.code}</pre>
              <figcaption className="text-sm text-muted">{t(lesson.example.note, tl)}</figcaption>
            </figure>
          )}

          {lesson.tip && (
            <aside className="flex flex-col gap-2 rounded-xl bg-saffron-soft p-4">
              <b className="font-display">⚡ {getDictionary(tl).lesson.tip}</b>
              <p className="text-[0.95rem]">
                <RichText text={t(lesson.tip.text, tl)} />
              </p>
              {lesson.tip.code && <code className="self-start rounded-md bg-surface px-2 py-1 font-mono text-sm">{lesson.tip.code}</code>}
            </aside>
          )}

          <section className="flex flex-col gap-2 rounded-xl border border-dashed border-teal p-4">
            <b className="font-display">{getDictionary(tl).lesson.task}</b>
            <ul className="flex flex-col gap-2">
              {lesson.tasks.map((task) => {
                const state = results ? (results[task.id] ? "ok" : "fail") : "todo";
                return (
                  <li key={task.id} className="flex items-start gap-2 text-[0.95rem]">
                    <span
                      aria-hidden="true"
                      className={`mt-1 grid size-4 flex-none place-items-center rounded-full text-[10px] text-white ${
                        state === "ok" ? "bg-ok" : state === "fail" ? "bg-coral" : "border-2 border-line"
                      }`}
                    >
                      {state === "ok" ? "✓" : state === "fail" ? "!" : ""}
                    </span>
                    <span>
                      <RichText text={t(task.label, tl)} />
                    </span>
                  </li>
                );
              })}
            </ul>
          </section>

          {hintsShown > 0 && (
            <ol className="flex list-inside list-decimal flex-col gap-1 rounded-xl bg-teal-soft p-4 text-[0.95rem]">
              {lesson.hints.slice(0, hintsShown).map((h, i) => (
                <li key={i}>
                  <RichText text={t(h, tl)} />
                </li>
              ))}
            </ol>
          )}

          {results && (
            <div role="status" className={`rounded-xl p-4 font-display font-semibold ${allPassed ? "bg-ok/15" : "bg-coral/10"}`}>
              {allPassed ? `${dict.allPassed} +${lesson.xp} XP` : dict.somePassed}
            </div>
          )}

          {(allPassed || alreadyDone) && (
            <div className="flex">
              {next ? (
                <Link href={`/${locale}/learn/${stage.slug}/${next.slug}`} className="rounded-xl bg-teal px-5 py-2.5 font-display font-semibold text-white">
                  {dict.next} {fwd}
                </Link>
              ) : stage.exam ? (
                <Link href={`/${locale}/learn/${stage.slug}/exam`} className="rounded-xl bg-saffron px-5 py-2.5 font-display font-semibold text-ink">
                  {dict.toExam}
                </Link>
              ) : null}
            </div>
          )}
        </article>

        {/* Workspace */}
        <div className="flex min-w-0 flex-col">
          <div className="flex gap-1 bg-code-bg px-3 pt-2" dir="ltr">
            {lesson.files.map((kind) => (
              <button
                key={kind}
                type="button"
                onClick={() => setActive(kind)}
                className={`rounded-t-lg px-3 py-1.5 font-mono text-xs ${active === kind ? "bg-[#1d3236] text-code-fg" : "text-[#93a5a7]"}`}
              >
                {fileNames[kind]}
              </button>
            ))}
          </div>
          <div className="h-[320px] bg-code-bg lg:h-[42vh]">
            <CodeEditor kind={active} value={files[active] ?? ""} onChange={(v) => setFile(active, v)} label={fileNames[active]} />
          </div>
          <div className="flex flex-wrap items-center justify-between gap-2 border-y border-line px-4 py-2.5">
            <span className="text-xs text-muted">{dict.liveNote}</span>
            <div className="flex flex-wrap gap-2">
              <button type="button" onClick={() => setFiles(lesson.starter)} className="rounded-lg border border-line px-3 py-1.5 text-sm">
                {dict.reset}
              </button>
              {hintsShown < lesson.hints.length ? (
                <button type="button" onClick={() => setHintsShown((n) => n + 1)} className="rounded-lg border border-line px-3 py-1.5 text-sm">
                  {dict.hint} ({hintsShown + 1}/{lesson.hints.length})
                </button>
              ) : (
                <button type="button" onClick={() => setFiles(lesson.solution)} className="rounded-lg border border-line px-3 py-1.5 text-sm">
                  {dict.solution}
                </button>
              )}
              <button type="button" onClick={check} className="rounded-lg bg-teal px-5 py-1.5 font-display text-sm font-semibold text-white">
                {dict.check} ▸
              </button>
            </div>
          </div>
          <div className="flex min-h-[260px] flex-1 flex-col">
            <span className="px-4 pt-2 text-xs text-muted">{dict.result}</span>
            <iframe title={dict.result} sandbox="allow-scripts" srcDoc={preview} className="min-h-[240px] w-full flex-1 bg-white" />
          </div>
        </div>
      </div>
    </div>
  );
}
