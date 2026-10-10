"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState } from "react";
import { getStage, lessonKey } from "@/content/curriculum";
import type { FileKind, Files } from "@/content/types";
import { dirOf, t, type L, type Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionary";
import { celebrate, play } from "@/lib/feedback";
import { lintCode } from "@/lib/lint";
import { certEarned, isStageUnlocked, PROJECT_PASS, recordProject, useProgress } from "@/lib/progress";
import { runChecks } from "@/lib/runner";
import { useSettings } from "@/lib/settings";
import { CheckIcon, UndoIcon } from "./Icons";
import { RichText } from "./RichText";
import { Press, useMounted } from "./ui";
import { Workspace } from "./Workspace";

/**
 * The end-of-stage project: a brief, an editor, and a rubric. Submitting scores the build
 * (share of rubric items passed); the best score counts toward the certificate grade.
 */
export function ProjectView({ locale, stageSlug }: { locale: Locale; stageSlug: string }) {
  const mounted = useMounted();
  const router = useRouter();
  const stage = getStage(stageSlug)!;
  const project = stage.project!;
  const key = lessonKey(stage.slug, "project");
  const d = getDictionary(locale).project;
  const progress = useProgress();
  const { track } = useSettings();
  const [files, setFiles] = useState<Files>(project.starter);
  const [results, setResults] = useState<Record<string, boolean> | null>(null);
  const [warnings, setWarnings] = useState<L[]>([]);
  const [checking, setChecking] = useState(false);
  const [score, setScore] = useState<number | null>(null);
  const [forcePane, setForcePane] = useState<{ pane: "side"; at: number }>();

  useEffect(() => {
    try {
      const saved = window.localStorage.getItem(`satr-draft-v1:${key}`);
      if (saved) setFiles(JSON.parse(saved));
    } catch {
      // Start from the starter files.
    }
  }, [key]);

  useEffect(() => {
    const id = window.setTimeout(() => {
      try {
        window.localStorage.setItem(`satr-draft-v1:${key}`, JSON.stringify(files));
      } catch {
        // Drafts are a convenience.
      }
    }, 500);
    return () => window.clearTimeout(id);
  }, [files, key]);

  if (!mounted) return <div className="min-h-dvh bg-code-bg" />;

  const back = `/${locale}/learn/`;
  const examPassed = !!stage.exam && (progress.exams[stage.slug] ?? 0) >= stage.exam.passPercent;
  if (!isStageUnlocked(stage.slug, progress, track) || !examPassed) {
    return (
      <div className="grid min-h-dvh place-items-center bg-paper p-6 text-center">
        <div className="flex max-w-sm flex-col items-center gap-4">
          <span className="text-6xl" aria-hidden="true">
            🔒
          </span>
          <p className="text-lg">{d.locked}</p>
          <Link href={back} className="btn-grad rounded-2xl px-6 py-3 font-display font-bold">
            {d.toPath}
          </Link>
        </div>
      </div>
    );
  }

  const best = progress.projects?.[stage.slug] ?? 0;

  async function submit() {
    if (checking) return;
    setChecking(true);
    const r = await runChecks(project.tasks, files, { harness: project.harness, settle: project.settle, runtime: project.runtime });
    setChecking(false);
    setResults(r);
    setWarnings(lintCode(files, project.runtime));
    const s = Math.round((project.tasks.filter((task) => r[task.id]).length / project.tasks.length) * 100);
    setScore(s);
    recordProject(stage.slug, s);
    if (s >= PROJECT_PASS) {
      play("levelUp");
      celebrate(true);
    } else {
      play("wrong");
      setForcePane({ pane: "side", at: Date.now() });
    }
  }

  const passed = project.tasks.filter((task) => results?.[task.id]).length;

  return (
    <>
      <Workspace
        runtime={project.runtime}
        locale={locale}
        title={t(project.title, locale)}
        kinds={project.files}
        files={files}
        onChange={(kind: FileKind, v: string) => setFiles((f) => ({ ...f, [kind]: v }))}
        onClose={() => router.push(back)}
        sideLabel={d.brief}
        sideBadge={results ? `${passed}/${project.tasks.length}` : undefined}
        forcePane={forcePane}
        side={
          <div dir={dirOf(locale)} className="flex flex-col gap-4">
            <div className="flex items-center justify-between gap-2">
              <h2 className="font-bold">🏗️ {t(project.title, locale)}</h2>
              {best > 0 && <span className="rounded-full bg-accent-soft px-3 py-1 text-xs font-bold">{d.best.replace("{n}", String(best))}</span>}
            </div>
            {project.body.map((para, i) => (
              <p key={i} className="flex gap-2 text-[0.95rem] leading-relaxed">
                {para.icon && <span aria-hidden="true">{para.icon}</span>}
                <span>
                  <RichText text={t(para, locale)} />
                </span>
              </p>
            ))}
            <h3 className="font-bold">{d.rubric}</h3>
            <ul className="flex flex-col gap-2">
              {project.tasks.map((task) => {
                const state = results ? (results[task.id] ? "ok" : "fail") : "todo";
                return (
                  <li
                    key={task.id}
                    className={`flex items-center gap-3 rounded-2xl p-3 text-sm ${state === "ok" ? "bg-ok/15" : state === "fail" ? "bg-coral/10" : "bg-surface-2"}`}
                  >
                    <span className={`grid size-6 flex-none place-items-center rounded-full ${state === "ok" ? "bg-ok text-white" : "border-2 border-line"}`}>
                      {state === "ok" && <CheckIcon className="size-4" />}
                    </span>
                    <RichText text={t(task.label, locale)} />
                  </li>
                );
              })}
            </ul>
            {warnings.length > 0 && (
              <div className="flex flex-col gap-2 rounded-2xl border border-saffron/40 bg-saffron-soft p-4 text-sm">
                <h3 className="font-bold">⚠️ {getDictionary(locale).lesson.warnings}</h3>
                <ul className="flex list-inside list-disc flex-col gap-1">
                  {warnings.map((w, i) => (
                    <li key={i}>
                      <RichText text={t(w, locale)} />
                    </li>
                  ))}
                </ul>
              </div>
            )}
            <p className="text-xs text-muted">{d.howScored.replace("{n}", String(PROJECT_PASS))}</p>
          </div>
        }
        actions={
          <>
            <Press
              onClick={() => setFiles(project.starter)}
              aria-label={d.reset}
              className="grid size-12 place-items-center rounded-2xl bg-white/[0.08] text-code-fg"
            >
              <UndoIcon className="size-5" />
            </Press>
            <Press
              silent
              onClick={submit}
              className="h-12 flex-1 rounded-2xl btn-grad font-display text-lg font-bold shadow-[0_4px_0_0_rgba(0,0,0,0.25)] active:translate-y-0.5 active:shadow-none"
            >
              {checking ? "…" : d.submit}
            </Press>
          </>
        }
      />

      <AnimatePresence>
        {score !== null && score >= PROJECT_PASS && (
          <motion.div
            className="fixed inset-0 z-[60] grid place-items-center bg-black/60 p-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            role="dialog"
            aria-label={d.passedTitle}
          >
            <motion.div
              dir={dirOf(locale)}
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              className="flex w-full max-w-sm flex-col items-center gap-4 rounded-3xl bg-paper p-6 text-center shadow-card"
            >
              <span className="text-6xl" aria-hidden="true">
                🏗️
              </span>
              <h2 className="text-2xl font-bold">{d.passedTitle}</h2>
              <p className="font-display text-5xl font-bold text-accent">{score}%</p>
              <p className="text-muted">{score < 100 ? d.improve : d.perfect}</p>
              {stage.certificate && certEarned(stage.slug, progress) ? (
                <Link href={`/${locale}/certificate/${stage.slug}/`} className="btn-grad w-full rounded-2xl py-3 font-display font-bold">
                  🎓 {d.toCert}
                </Link>
              ) : (
                <Link href={back} className="btn-grad w-full rounded-2xl py-3 font-display font-bold">
                  {d.toPath}
                </Link>
              )}
              <button type="button" onClick={() => setScore(null)} className="text-sm font-semibold text-muted">
                {d.keepWorking}
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
