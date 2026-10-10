"use client";

import { lessonKey, orderedStages, stages, type Track } from "@/content/curriculum";
import type { FileKind } from "@/content/types";
import { resetReviews, scheduleReview } from "./review";
import { settingsStore } from "./settings";
import { createStore } from "./store";

/**
 * Learner progress, kept in localStorage for now.
 * The shape is what the server-side store (Supabase) will hold later.
 */
export type Progress = {
  completed: string[];
  xp: number;
  /** XP earned per day, keyed YYYY-MM-DD, for the daily goal and the week strip. */
  daily: Record<string, number>;
  streak: { count: number; last: string | null };
  exams: Record<string, number>;
  /** Issued certificates by stage slug. */
  certs: Record<string, Cert>;
  /** Best project score (0–100) by stage slug. */
  projects: Record<string, number>;
};

/**
 * `score` and `grade` are frozen when the certificate is issued. `registered` means the public
 * registry knows this ID, so its QR code can be verified online.
 */
export type Cert = { id: string; name: string; date: string; photo: string; score?: number; grade?: Grade; registered?: boolean; token?: string };

const store = createStore<Progress>("satr-progress-v1", {
  completed: [],
  xp: 0,
  daily: {},
  streak: { count: 0, last: null },
  exams: {},
  certs: {},
  projects: {},
});

export const useProgress = store.use;

export function dayKey(date = new Date()) {
  const d = new Date(date.getTime() - date.getTimezoneOffset() * 60_000);
  return d.toISOString().slice(0, 10);
}

function bumpStreak(streak: Progress["streak"]): Progress["streak"] {
  const now = dayKey();
  if (streak.last === now) return streak;
  const yesterday = dayKey(new Date(Date.now() - 86_400_000));
  return { count: streak.last === yesterday ? streak.count + 1 : 1, last: now };
}

function award(p: Progress, xp: number): Progress {
  const today = dayKey();
  return { ...p, xp: p.xp + xp, daily: { ...p.daily, [today]: (p.daily[today] ?? 0) + xp }, streak: bumpStreak(p.streak) };
}

/** Reads the stored progress directly, for effects that run before a component has re-rendered with it. */
export function isCompleted(key: string) {
  return store.get().completed.includes(key);
}

/** Returns true when this call completed the lesson for the first time. */
export function completeLesson(key: string, xp: number): boolean {
  const p = store.get();
  if (p.completed.includes(key)) return false;
  store.set(award({ ...p, completed: [...p.completed, key] }, xp));
  scheduleReview(key);
  return true;
}

/** XP from practice challenges: counts toward the daily goal and streak. */
export function awardXp(xp: number) {
  if (xp > 0) store.set(award(store.get(), xp));
}

export function recordExam(stage: string, score: number, passPercent: number) {
  const p = store.get();
  const best = Math.max(score, p.exams[stage] ?? 0);
  const firstPass = (p.exams[stage] ?? 0) < passPercent && score >= passPercent;
  store.set(award({ ...p, exams: { ...p.exams, [stage]: best } }, firstPass ? 100 : 0));
}

/** A project counts once at least this share of its rubric passes. */
export const PROJECT_PASS = 60;

/** Keeps the best submission of a stage's project. Returns true the first time it passes. */
export function recordProject(stage: string, score: number) {
  const p = store.get();
  const before = p.projects?.[stage] ?? 0;
  const firstPass = before < PROJECT_PASS && score >= PROJECT_PASS;
  store.set(award({ ...p, projects: { ...p.projects, [stage]: Math.max(score, before) } }, firstPass ? 150 : 0));
  return firstPass;
}

/** A stage's certificate is earned when its exam is passed and, when it has one, its project too. */
export function certEarned(stageSlug: string, p: Progress) {
  const stage = stages.find((s) => s.slug === stageSlug);
  if (!stage?.certificate || !stage.exam || (p.exams[stage.slug] ?? 0) < stage.exam.passPercent) return false;
  return !stage.project || (p.projects?.[stage.slug] ?? 0) >= PROJECT_PASS;
}

export type Grade = "excellent" | "veryGood" | "good" | "pass";

/** The overall result printed on a certificate: 40% exam, 60% project (or the exam alone). */
export function certGrade(stageSlug: string, p: Progress): { score: number; grade: Grade } {
  const stage = stages.find((s) => s.slug === stageSlug);
  const exam = p.exams[stageSlug] ?? 0;
  const score = stage?.project ? Math.round(exam * 0.4 + (p.projects?.[stageSlug] ?? 0) * 0.6) : exam;
  const grade: Grade = score >= 90 ? "excellent" : score >= 80 ? "veryGood" : score >= 70 ? "good" : "pass";
  return { score, grade };
}

/** A short, readable ID like CM-2026-7Q4K-M2XD, derived from the name, stage and date. */
function certId(name: string, stage: string, date: string) {
  let h = 2166136261;
  for (const ch of `${name}|${stage}|${date}`) h = Math.imul(h ^ ch.charCodeAt(0), 16777619) >>> 0;
  const code = h.toString(36).toUpperCase().padStart(8, "0").slice(-8);
  return `CM-${date.slice(0, 4)}-${code.slice(0, 4)}-${code.slice(4)}`;
}

/** Issues a certificate; `remote` is the registry's record when it could be reached. */
export function issueCert(stage: string, name: string, photo: string, remote?: { id: string; date: string; token: string } | null): Cert {
  const date = remote?.date ?? dayKey();
  const cert = { id: remote?.id ?? certId(name, stage, date), name, date, photo, ...certGrade(stage, store.get()), registered: !!remote, token: remote?.token };
  store.set((p) => ({ ...p, certs: { ...p.certs, [stage]: cert } }));
  return cert;
}

/** A certificate issued offline gets its registry ID once the registry is reached. */
export function markRegistered(stage: string, id: string, date: string, token: string) {
  store.set((p) => (p.certs[stage] ? { ...p, certs: { ...p.certs, [stage]: { ...p.certs[stage], id, date, token, registered: true } } } : p));
}

export function resetProgress() {
  store.set(store.initial);
  resetReviews();
}

/** A streak only counts while it was kept today or yesterday. */
export function liveStreak(p: Progress) {
  const yesterday = dayKey(new Date(Date.now() - 86_400_000));
  return p.streak.last === dayKey() || p.streak.last === yesterday ? p.streak.count : 0;
}

/** Levels grow by 100 XP more each time: 100, 200, 300... */
export function levelOf(xp: number) {
  let level = 1;
  let need = 100;
  let rest = xp;
  while (rest >= need) {
    rest -= need;
    level += 1;
    need += 100;
  }
  return { level, into: rest, need };
}

/**
 * Which files the free editor offers: HTML once the learner can build a whole page,
 * CSS after a CSS lesson on top of that, and JavaScript after the first JavaScript lesson
 * (on its own for mobile learners, who start with JavaScript).
 */
export function editorKinds(p: Progress): FileKind[] {
  const kinds: FileKind[] = [];
  if (p.completed.includes("html/page-skeleton")) kinds.push("html");
  if (kinds.length && p.completed.some((k) => k.startsWith("css/"))) kinds.push("css");
  if (p.completed.some((k) => k.startsWith("javascript/"))) kinds.push("js");
  return kinds;
}

export function canUseEditor(p: Progress) {
  return editorKinds(p).length > 0;
}

/** The learner's chosen track. Read when needed; screens that show the order also subscribe to settings. */
export function currentTrack(): Track {
  return settingsStore.get().track ?? "web";
}

/**
 * Stages open strictly in the track's order: a stage unlocks once every earlier stage is finished,
 * meaning all its lessons are done and, when it has one, its exam is passed. No skipping.
 */
export function isStageUnlocked(slug: string, progress: Progress, track: Track = currentTrack()): boolean {
  for (const stage of orderedStages(track)) {
    if (stage.slug === slug) return stage.status === "available";
    if (stage.status !== "available") return false;
    const lessonsDone = stage.lessons.every((l) => progress.completed.includes(lessonKey(stage.slug, l.slug)));
    const examDone = !stage.exam || (progress.exams[stage.slug] ?? 0) >= stage.exam.passPercent;
    if (!lessonsDone || !examDone) return false;
  }
  return false;
}

/** A lesson can be opened when it is done, or it is the next one in an unlocked stage. */
export function isLessonOpen(stageSlug: string, lessonSlug: string, progress: Progress, track: Track = currentTrack()): boolean {
  if (!isStageUnlocked(stageSlug, progress, track)) return false;
  const stage = stages.find((s) => s.slug === stageSlug);
  if (!stage) return false;
  const next = stage.lessons.find((l) => !progress.completed.includes(lessonKey(stage.slug, l.slug)));
  return progress.completed.includes(lessonKey(stageSlug, lessonSlug)) || next?.slug === lessonSlug;
}

/** The next lesson to study: the first unfinished lesson in an unlocked stage. */
export function nextLesson(progress: Progress, track: Track = currentTrack()) {
  for (const stage of orderedStages(track)) {
    if (!isStageUnlocked(stage.slug, progress, track)) continue;
    const lesson = stage.lessons.find((l) => !progress.completed.includes(lessonKey(stage.slug, l.slug)));
    if (lesson) return { stage, lesson, index: stage.lessons.indexOf(lesson) };
  }
  return null;
}
