"use client";

import { SETTINGS_KEY } from "./keys";
import { createStore } from "./store";

export type ThemeMode = "system" | "light" | "dark";
export type Accent = "neon" | "zellige" | "saffron" | "ocean" | "rose" | "violet";
export type Backdrop = "cosmic" | "aurora" | "code" | "waves" | "none";

export type Goal = "career" | "projects" | "study" | "fun";
export type Level = "new" | "some" | "dev";
export type StudyTime = "morning" | "afternoon" | "evening" | "night";

export type Settings = {
  /** Set once the first-launch questions are answered. */
  onboarded: boolean;
  name: string;
  /** Real full name, printed on certificates. */
  fullName: string;
  avatar: string;
  /** Profile photo as a small JPEG data URL, or "" to use the emoji avatar. */
  photo: string;
  goal: Goal;
  level: Level;
  studyTime: StudyTime;
  /** A daily local notification at the study time (Android app). */
  reminder: boolean;
  theme: ThemeMode;
  accent: Accent;
  backdrop: Backdrop;
  sound: boolean;
  volume: number;
  haptics: boolean;
  dailyGoal: number;
  editorFontSize: number;
};

export const defaultSettings: Settings = {
  onboarded: false,
  name: "",
  fullName: "",
  avatar: "🦊",
  photo: "",
  goal: "career",
  level: "new",
  studyTime: "evening",
  reminder: true,
  theme: "dark",
  accent: "neon",
  backdrop: "cosmic",
  sound: true,
  volume: 0.6,
  haptics: true,
  dailyGoal: 50,
  editorFontSize: 15,
};

export const accents: Record<Accent, { color: string; label: { ar: string; en: string } }> = {
  neon: { color: "linear-gradient(135deg, #22d3ee, #8b5cf6, #e040fb)", label: { ar: "نيون", en: "Neon" } },
  zellige: { color: "#0E8C7F", label: { ar: "زليج", en: "Zellige" } },
  saffron: { color: "#E08A00", label: { ar: "زعفران", en: "Saffron" } },
  ocean: { color: "#1F6FD1", label: { ar: "محيط", en: "Ocean" } },
  rose: { color: "#D6336C", label: { ar: "ورد", en: "Rose" } },
  violet: { color: "#7048E8", label: { ar: "بنفسج", en: "Violet" } },
};

export const avatars = ["🦊", "🐱", "🦉", "🐼", "🐯", "🦁", "🐧", "🐙", "🚀", "🌙", "⭐", "🧠"];

export const settingsStore = createStore<Settings>(SETTINGS_KEY, defaultSettings);
export const useSettings = settingsStore.use;

export function updateSettings(patch: Partial<Settings>) {
  settingsStore.set((s) => ({ ...s, ...patch }));
}

/** The hour of the daily reminder for each study time. */
export const studyHours: Record<StudyTime, number> = { morning: 8, afternoon: 14, evening: 19, night: 22 };
