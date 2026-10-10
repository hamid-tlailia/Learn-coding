"use client";

import { challenges, type Challenge } from "@/content/challenges";
import { stages, trackParts, type Track } from "@/content/curriculum";
import type { Question } from "@/content/types";
import type { L } from "@/i18n/config";
import { dayKey, type Progress } from "./progress";
import { createStore } from "./store";

/**
 * Spaced review: every finished lesson comes back after 1, 3, 7, 14 and 30 days.
 * A clean review moves it to the next gap; a mistake brings it back tomorrow.
 * Reviews for a track end once its certificate is issued.
 */
export const GAPS = [1, 3, 7, 14, 30];

/** `box` is how many reviews in a row went well; `due` is the next review day, or null once done. */
export type ReviewEntry = { box: number; due: string | null };

const store = createStore<Record<string, ReviewEntry>>("cm-review-v1", {});
export const useReviews = store.use;

function addDays(days: number) {
  return dayKey(new Date(Date.now() + days * 86_400_000));
}

/** Called when a lesson is finished for the first time. */
export function scheduleReview(key: string) {
  store.set((all) => (all[key] ? all : { ...all, [key]: { box: 0, due: addDays(GAPS[0]) } }));
}

/** Lessons finished before reviews existed join the schedule from tomorrow, at most five a day. */
export function scheduleMissing(completed: string[]) {
  const all = store.get();
  const missing = completed.filter((k) => !all[k]);
  if (!missing.length) return;
  store.set((cur) => ({ ...cur, ...Object.fromEntries(missing.map((k, i) => [k, { box: 0, due: addDays(1 + Math.floor(i / 5)) }])) }));
}

export function recordReview(key: string, clean: boolean) {
  store.set((all) => {
    const box = clean ? (all[key]?.box ?? 0) + 1 : 0;
    return { ...all, [key]: { box, due: box >= GAPS.length ? null : addDays(GAPS[box]) } };
  });
}

export function resetReviews() {
  store.set({});
}

/** The certificate that closes a track: the last certified stage of its own part. */
function trackCert(track: Track) {
  return [...trackParts(track).own].reverse().find((s) => s.certificate)?.slug;
}

/** Whether a stage's lessons are still reviewed: until the certificate of the track they belong to is issued. */
export function reviewsOpen(stageSlug: string, progress: Progress, track: Track) {
  const other: Track = track === "web" ? "mobile" : "web";
  const owner = trackParts(track).own.some((s) => s.slug === stageSlug)
    ? track
    : trackParts(other).own.some((s) => s.slug === stageSlug)
      ? other
      : null;
  const cert = owner ? trackCert(owner) : stageSlug;
  return !cert || !progress.certs[cert];
}

/** Lesson keys whose review day has come, in study order. */
export function dueReviews(reviews: Record<string, ReviewEntry>, progress: Progress, track: Track) {
  const today = dayKey();
  return stages.flatMap((s) =>
    s.lessons
      .map((l) => `${s.slug}/${l.slug}`)
      .filter((k) => {
        const r = reviews[k];
        return progress.completed.includes(k) && r?.due && r.due <= today && reviewsOpen(s.slug, progress, track);
      }),
  );
}

/** A stable shuffle, so a review shows the same order while it's open. */
function seeded<T>(items: T[], seed: string) {
  let h = 2166136261;
  for (const ch of seed) h = Math.imul(h ^ ch.charCodeAt(0), 16777619) >>> 0;
  const out = [...items];
  for (let i = out.length - 1; i > 0; i--) {
    h = Math.imul(h ^ (h >>> 15), 2246822507) >>> 0;
    const j = h % (i + 1);
    [out[i], out[j]] = [out[j], out[i]];
  }
  return out;
}

/** A fill-in-the-blank challenge as a multiple-choice question: pick the words for the blanks, in order. */
function fromChallenge(c: Challenge, seed: string): Question | null {
  const pool = [...c.chips];
  for (const a of c.answers) pool.splice(pool.indexOf(a), 1);
  const right = c.answers.join("  ·  ");
  const wrong = new Set<string>();
  for (let i = 0; i < c.answers.length; i++) {
    for (const d of pool) {
      const alt = [...c.answers];
      alt[i] = d;
      wrong.add(alt.join("  ·  "));
    }
  }
  if (c.answers.length > 1) wrong.add([...c.answers].reverse().join("  ·  "));
  wrong.delete(right);
  const distractors = seeded([...wrong], seed).slice(0, 2);
  if (!distractors.length) return null;
  const options = seeded([right, ...distractors], seed + "o");
  let n = 0;
  const code = c.code.replace(/_/g, () => `[${++n}]`);
  const text = (s: string): L => ({ ar: s, en: s });
  return { id: c.id, prompt: c.prompt, code, options: options.map(text), answer: options.indexOf(right) };
}

/** Up to three questions for a lesson: its own quiz questions, then its fill-in-the-blank challenges. */
export function reviewQuestions(key: string): Question[] {
  const [stageSlug, lessonSlug] = key.split("/");
  const lesson = stages.find((s) => s.slug === stageSlug)?.lessons.find((l) => l.slug === lessonSlug);
  if (!lesson) return [];
  const fromQuiz = lesson.quiz ?? [];
  const fromChallenges = challenges
    .filter((c) => c.after === key)
    .map((c) => fromChallenge(c, `${key}/${c.id}/${dayKey()}`))
    .filter((q): q is Question => !!q);
  return seeded([...fromQuiz, ...fromChallenges], key + dayKey()).slice(0, 3);
}
