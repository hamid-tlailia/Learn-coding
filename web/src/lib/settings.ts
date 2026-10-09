"use client";

import { SETTINGS_KEY } from "./keys";
import { createStore } from "./store";

export type ThemeMode = "system" | "light" | "dark";
export type Accent = "neon" | "zellige" | "saffron" | "ocean" | "rose" | "violet";
export type Backdrop = "cosmic" | "aurora" | "code" | "waves" | "none";

export type Settings = {
  name: string;
  avatar: string;
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
  name: "",
  avatar: "🦊",
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
