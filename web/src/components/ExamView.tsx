"use client";

import Link from "next/link";
import { useState } from "react";
import { getStage } from "@/content/curriculum";
import { t, type Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionary";
import { recordExam } from "@/lib/progress";
import { RichText } from "./RichText";

export function ExamView({ locale, stageSlug }: { locale: Locale; stageSlug: string }) {
  const dict = getDictionary(locale).exam;
  const stage = getStage(stageSlug)!;
  const exam = stage.exam!;
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [score, setScore] = useState<number | null>(null);

  const complete = exam.questions.every((q) => answers[q.id] !== undefined);

  function submit() {
    const correct = exam.questions.filter((q) => answers[q.id] === q.answer).length;
    const s = Math.round((correct / exam.questions.length) * 100);
    setScore(s);
    recordExam(stage.slug, s, exam.passPercent);
  }

  function retry() {
    setAnswers({});
    setScore(null);
  }

  const passed = score !== null && score >= exam.passPercent;

  return (
    <div className="mx-auto flex max-w-3xl flex-col gap-6 px-4 py-10">
      <header className="flex flex-col gap-2">
        <span className="font-mono text-sm text-teal">{stage.badge}</span>
        <h1 className="text-3xl font-bold">
          {dict.title}: {t(stage.title, locale)}
        </h1>
        <p className="text-muted">{dict.intro.replace("{pass}", String(exam.passPercent))}</p>
      </header>

      <ol className="flex flex-col gap-4">
        {exam.questions.map((q, qi) => (
          <li key={q.id} className="flex flex-col gap-3 rounded-2xl border border-line bg-surface p-5">
            <fieldset className="flex flex-col gap-3" disabled={score !== null}>
              <legend className="mb-2 font-display font-semibold">
                {qi + 1}. <RichText text={t(q.prompt, locale)} />
              </legend>
              {q.code && <pre className="overflow-x-auto rounded-lg bg-code-bg p-3 font-mono text-sm text-code-fg">{q.code}</pre>}
              <div className="grid gap-2 sm:grid-cols-2">
                {q.options.map((opt, oi) => {
                  const chosen = answers[q.id] === oi;
                  const reveal = score !== null;
                  const tone = reveal
                    ? oi === q.answer
                      ? "border-ok bg-ok/10"
                      : chosen
                        ? "border-coral bg-coral/10"
                        : "border-line"
                    : chosen
                      ? "border-teal bg-teal-soft"
                      : "border-line hover:border-teal";
                  return (
                    <label key={oi} className={`flex cursor-pointer items-center gap-2 rounded-xl border-2 px-3 py-2 ${tone}`}>
                      <input
                        id={`${q.id}-${oi}`}
                        type="radio"
                        name={q.id}
                        checked={chosen}
                        onChange={() => setAnswers((a) => ({ ...a, [q.id]: oi }))}
                        className="accent-teal"
                      />
                      <span>
                        <RichText text={t(opt, locale)} />
                      </span>
                    </label>
                  );
                })}
              </div>
            </fieldset>
          </li>
        ))}
      </ol>

      {score === null ? (
        <button
          type="button"
          onClick={submit}
          disabled={!complete}
          className="self-start rounded-xl bg-teal px-6 py-3 font-display font-semibold text-white disabled:opacity-40"
        >
          {dict.submit}
        </button>
      ) : (
        <div role="status" className={`flex flex-col gap-3 rounded-2xl p-5 ${passed ? "bg-ok/15" : "bg-coral/10"}`}>
          <p className="font-display text-lg font-semibold">
            {(passed ? dict.passed : dict.failed).replace("{score}", String(score))}
          </p>
          <div className="flex gap-2">
            {!passed && (
              <button type="button" onClick={retry} className="rounded-xl bg-teal px-5 py-2 font-display font-semibold text-white">
                {dict.retry}
              </button>
            )}
            <Link href={`/${locale}/learn`} className="rounded-xl border border-line px-5 py-2 font-display font-semibold">
              {dict.backToPath}
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
