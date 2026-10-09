"use client";

import { lessonKey, stages } from "@/content/curriculum";
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
};

const store = createStore<Progress>("satr-progress-v1", {
  completed: [],
  xp: 0,
  daily: {},
  streak: { count: 0, last: null },
  exams: {},
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

/** The free editor opens after the first lesson where the learner writes code. */
export function canUseEditor(p: Progress) {
  return stages.some((s) => s.lessons.some((l) => l.files.length > 0 && p.completed.includes(lessonKey(s.slug, l.slug))));
}

/** A stage opens once every earlier stage that has an exam has been passed. */
export function isStageUnlocked(slug: string, progress: Progress): boolean {
  for (const stage of stages) {
    if (stage.slug === slug) return stage.status === "available";
    if (stage.status === "available" && stage.exam && (progress.exams[stage.slug] ?? 0) < stage.exam.passPercent) {
      return false;
    }
  }
  return false;
}

/** The next lesson to study: the first unfinished lesson in an unlocked stage. */
export function nextLesson(progress: Progress) {
  for (const stage of stages) {
    if (!isStageUnlocked(stage.slug, progress)) continue;
    const lesson = stage.lessons.find((l) => !progress.completed.includes(lessonKey(stage.slug, l.slug)));
    if (lesson) return { stage, lesson, index: stage.lessons.indexOf(lesson) };
  }
  return null;
}
