"use client";

import { lessonKey, orderedStages, stages, type Track } from "@/content/curriculum";
import type { FileKind } from "@/content/types";
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
};

export type Cert = { id: string; name: string; date: string; photo: string };

const store = createStore<Progress>("satr-progress-v1", {
  completed: [],
  xp: 0,
  daily: {},
  streak: { count: 0, last: null },
  exams: {},
  certs: {},
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

/** Returns true when this call completed the lesson for the first time. */
export function completeLesson(key: string, xp: number): boolean {
  const p = store.get();
  if (p.completed.includes(key)) return false;
  store.set(award({ ...p, completed: [...p.completed, key] }, xp));
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

/** A stage's certificate is earned when its exam is passed (and every stage before it, by order). */
export function certEarned(stageSlug: string, p: Progress) {
  const stage = stages.find((s) => s.slug === stageSlug);
  return !!stage?.certificate && !!stage.exam && (p.exams[stage.slug] ?? 0) >= stage.exam.passPercent;
}

/** A short, readable ID like CM-2026-7Q4K-M2XD, derived from the name, stage and date. */
function certId(name: string, stage: string, date: string) {
  let h = 2166136261;
  for (const ch of `${name}|${stage}|${date}`) h = Math.imul(h ^ ch.charCodeAt(0), 16777619) >>> 0;
  const code = h.toString(36).toUpperCase().padStart(8, "0").slice(-8);
  return `CM-${date.slice(0, 4)}-${code.slice(0, 4)}-${code.slice(4)}`;
}

export function issueCert(stage: string, name: string, photo: string): Cert {
  const date = dayKey();
  const cert = { id: certId(name, stage, date), name, date, photo };
  store.set((p) => ({ ...p, certs: { ...p.certs, [stage]: cert } }));
  return cert;
}

export function resetProgress() {
  store.set(store.initial);
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
