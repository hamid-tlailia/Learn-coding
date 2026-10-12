"use client";

import type { L } from "@/i18n/config";
import { createStore } from "./store";

/**
 * The app's own notes on each lesson, written while the learner works: failed checks, hints,
 * whether the solution was needed, quiz and review slips, fill-in-the-blank results, time.
 * They decide when a lesson comes back for review, and show strengths and weaknesses.
 */
export type LessonStats = {
  fails: number;
  hints: number;
  solution: boolean;
  quizSlips: number;
  seconds: number;
  reviews: number;
  reviewSlips: number;
  blanksRight: number;
  blanksWrong: number;
  /** Day the lesson was finished, YYYY-MM-DD. */
  done?: string;
};

const empty: LessonStats = { fails: 0, hints: 0, solution: false, quizSlips: 0, seconds: 0, reviews: 0, reviewSlips: 0, blanksRight: 0, blanksWrong: 0 };

const store = createStore<Record<string, LessonStats>>("cm-insights-v1", {});
export const useInsights = store.use;

function bump(key: string, change: (s: LessonStats) => Partial<LessonStats>) {
  store.set((all) => {
    const current = { ...empty, ...all[key] };
    return { ...all, [key]: { ...current, ...change(current) } };
  });
}

export const noteFail = (key: string) => bump(key, (s) => ({ fails: s.fails + 1 }));
export const noteHint = (key: string) => bump(key, (s) => ({ hints: s.hints + 1 }));
export const noteSolution = (key: string) => bump(key, () => ({ solution: true }));
export const noteQuizSlip = (key: string) => bump(key, (s) => ({ quizSlips: s.quizSlips + 1 }));
/** Only the first finish counts: redoing a finished lesson doesn't rewrite how it went. */
export const noteDone = (key: string, seconds: number, day: string) =>
  bump(key, (s) => (s.done ? {} : { seconds: Math.round(seconds), done: day }));
export const noteReview = (key: string, clean: boolean) => bump(key, (s) => ({ reviews: s.reviews + 1, reviewSlips: s.reviewSlips + (clean ? 0 : 1) }));
export const noteBlank = (key: string, right: boolean) =>
  bump(key, (s) => (right ? { blanksRight: s.blanksRight + 1 } : { blanksWrong: s.blanksWrong + 1 }));

export function statsOf(key: string): LessonStats {
  return { ...empty, ...store.get()[key] };
}

export function resetInsights() {
  store.set({});
}

/** 0–100: how solid a lesson looks from everything recorded about it. */
export function mastery(s: LessonStats): number {
  let m = 100;
  m -= Math.min(s.fails, 5) * 10;
  m -= Math.min(s.hints, 3) * 5;
  if (s.solution) m -= 35;
  m -= Math.min(s.quizSlips, 4) * 8;
  m -= s.reviewSlips * 15;
  m += (s.reviews - s.reviewSlips) * 5;
  m -= s.blanksWrong * 6;
  m += Math.min(s.blanksRight, 5) * 2;
  return Math.max(0, Math.min(100, Math.round(m)));
}

export type Level = "strong" | "ok" | "weak";
export const levelOf = (m: number): Level => (m >= 80 ? "strong" : m >= 55 ? "ok" : "weak");

/** The first review gap in days: weak lessons come back tomorrow, solid ones after a few days. */
export function firstGap(s: LessonStats): number {
  const m = mastery(s);
  return m >= 85 ? 3 : m >= 60 ? 2 : 1;
}

/** Short, factual notes the app keeps on a lesson, in the learner's language. */
export function notesFor(s: LessonStats): L[] {
  const out: L[] = [];
  if (s.done && s.fails === 0 && s.hints === 0 && !s.solution && s.quizSlips === 0) {
    out.push({ ar: "نجحت من أول محاولة دون تلميحات 💪", en: "Passed on the first try with no hints 💪" });
  } else {
    if (s.fails > 0) out.push({ ar: `${s.fails} محاولة تحقق غير ناجحة قبل النجاح`, en: `${s.fails} unsuccessful check${s.fails > 1 ? "s" : ""} before passing` });
    if (s.hints > 0) out.push({ ar: `استخدمت ${s.hints} تلميح`, en: `Used ${s.hints} hint${s.hints > 1 ? "s" : ""}` });
    if (s.solution) out.push({ ar: "احتجت إلى الحل، لذلك يعود للمراجعة قريبًا", en: "Needed the solution, so it comes back for review soon" });
    if (s.quizSlips > 0) out.push({ ar: `${s.quizSlips} إجابة خاطئة في أسئلة الدرس`, en: `${s.quizSlips} wrong answer${s.quizSlips > 1 ? "s" : ""} in the lesson quiz` });
  }
  if (s.reviews > 0) {
    out.push(
      s.reviewSlips === 0
        ? { ar: `راجعته ${s.reviews} مرة دون أخطاء`, en: `Reviewed ${s.reviews} time${s.reviews > 1 ? "s" : ""} with no mistakes` }
        : { ar: `أخطأت في ${s.reviewSlips} من ${s.reviews} مراجعات`, en: `Slipped in ${s.reviewSlips} of ${s.reviews} reviews` },
    );
  }
  if (s.blanksRight + s.blanksWrong > 0) {
    out.push({ ar: `تمارين الفراغات: ${s.blanksRight} صحيحة، ${s.blanksWrong} خاطئة`, en: `Fill-in-the-blanks: ${s.blanksRight} right, ${s.blanksWrong} wrong` });
  }
  if (s.seconds >= 60) out.push({ ar: `استغرق حوالي ${Math.round(s.seconds / 60)} دقيقة`, en: `Took about ${Math.round(s.seconds / 60)} min` });
  return out;
}
