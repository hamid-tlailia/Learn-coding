"use client";

import { useSyncExternalStore } from "react";
import { stages } from "@/content/curriculum";

/**
 * Learner progress, kept in localStorage for now.
 * The shape is what the server-side store (Supabase) will hold later.
 */
export type Progress = {
  completed: string[];
  xp: number;
  streak: { count: number; last: string | null };
  exams: Record<string, number>;
};

const KEY = "satr-progress-v1";
const empty: Progress = { completed: [], xp: 0, streak: { count: 0, last: null }, exams: {} };

let cache: Progress = empty;
let loaded = false;
const listeners = new Set<() => void>();

function load(): Progress {
  if (loaded) return cache;
  loaded = true;
  try {
    const raw = window.localStorage.getItem(KEY);
    if (raw) cache = { ...empty, ...JSON.parse(raw) };
  } catch {
    cache = empty;
  }
  return cache;
}

function save(next: Progress) {
  cache = next;
  try {
    window.localStorage.setItem(KEY, JSON.stringify(next));
  } catch {
    // Storage can be unavailable (private mode); progress then lasts for the session.
  }
  listeners.forEach((l) => l());
}

function subscribe(listener: () => void) {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

export function useProgress(): Progress {
  return useSyncExternalStore(subscribe, load, () => empty);
}

function today() {
  return new Date().toISOString().slice(0, 10);
}

function bumpStreak(streak: Progress["streak"]): Progress["streak"] {
  const now = today();
  if (streak.last === now) return streak;
  const yesterday = new Date(Date.now() - 86_400_000).toISOString().slice(0, 10);
  return { count: streak.last === yesterday ? streak.count + 1 : 1, last: now };
}

export function completeLesson(key: string, xp: number) {
  const p = load();
  if (p.completed.includes(key)) return;
  save({ ...p, completed: [...p.completed, key], xp: p.xp + xp, streak: bumpStreak(p.streak) });
}

export function recordExam(stage: string, score: number, passPercent: number) {
  const p = load();
  const best = Math.max(score, p.exams[stage] ?? 0);
  const firstPass = (p.exams[stage] ?? 0) < passPercent && score >= passPercent;
  save({ ...p, exams: { ...p.exams, [stage]: best }, xp: p.xp + (firstPass ? 100 : 0), streak: bumpStreak(p.streak) });
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
