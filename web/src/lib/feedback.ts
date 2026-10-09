"use client";

import { Capacitor } from "@capacitor/core";
import { Haptics, ImpactStyle, NotificationType } from "@capacitor/haptics";
import { settingsStore } from "./settings";

/**
 * Sounds are synthesized with the Web Audio API, so the app ships no audio files
 * and works offline. Each cue is a few short notes.
 */
type Note = { f: number; t: number; d: number; type?: OscillatorType; g?: number };

const cues: Record<string, Note[]> = {
  tap: [{ f: 880, t: 0, d: 0.05, type: "triangle", g: 0.25 }],
  select: [{ f: 660, t: 0, d: 0.06, type: "triangle", g: 0.35 }, { f: 990, t: 0.04, d: 0.07, type: "triangle", g: 0.25 }],
  correct: [
    { f: 784, t: 0, d: 0.12, type: "sine" },
    { f: 1175, t: 0.09, d: 0.2, type: "sine" },
  ],
  wrong: [
    { f: 220, t: 0, d: 0.14, type: "square", g: 0.18 },
    { f: 185, t: 0.1, d: 0.2, type: "square", g: 0.18 },
  ],
  complete: [
    { f: 523, t: 0, d: 0.14, type: "triangle" },
    { f: 659, t: 0.11, d: 0.14, type: "triangle" },
    { f: 784, t: 0.22, d: 0.14, type: "triangle" },
    { f: 1047, t: 0.33, d: 0.35, type: "triangle" },
  ],
  levelUp: [
    { f: 392, t: 0, d: 0.12, type: "sawtooth", g: 0.15 },
    { f: 523, t: 0.1, d: 0.12, type: "sawtooth", g: 0.15 },
    { f: 659, t: 0.2, d: 0.12, type: "sawtooth", g: 0.15 },
    { f: 784, t: 0.3, d: 0.5, type: "triangle" },
    { f: 1047, t: 0.3, d: 0.5, type: "triangle", g: 0.5 },
  ],
  whoosh: [{ f: 300, t: 0, d: 0.12, type: "sine", g: 0.12 }],
};

export type Cue = keyof typeof cues;

let ctx: AudioContext | null = null;

function audio() {
  if (!ctx) {
    const Ctor = window.AudioContext ?? (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    if (!Ctor) return null;
    ctx = new Ctor();
  }
  if (ctx.state === "suspended") ctx.resume().catch(() => {});
  return ctx;
}

export function play(cue: Cue) {
  const s = settingsStore.get();
  if (s.sound && typeof window !== "undefined") {
    const ac = audio();
    if (ac) {
      const now = ac.currentTime;
      for (const n of cues[cue]) {
        const osc = ac.createOscillator();
        const gain = ac.createGain();
        osc.type = n.type ?? "sine";
        osc.frequency.setValueAtTime(n.f, now + n.t);
        if (cue === "whoosh") osc.frequency.exponentialRampToValueAtTime(900, now + n.t + n.d);
        const peak = (n.g ?? 0.35) * s.volume;
        gain.gain.setValueAtTime(0.0001, now + n.t);
        gain.gain.exponentialRampToValueAtTime(peak, now + n.t + 0.012);
        gain.gain.exponentialRampToValueAtTime(0.0001, now + n.t + n.d);
        osc.connect(gain).connect(ac.destination);
        osc.start(now + n.t);
        osc.stop(now + n.t + n.d + 0.05);
      }
    }
  }
  buzz(cue);
}

function buzz(cue: Cue) {
  if (!settingsStore.get().haptics) return;
  if (Capacitor.isNativePlatform()) {
    if (cue === "complete" || cue === "levelUp" || cue === "correct") Haptics.notification({ type: NotificationType.Success }).catch(() => {});
    else if (cue === "wrong") Haptics.notification({ type: NotificationType.Error }).catch(() => {});
    else Haptics.impact({ style: ImpactStyle.Light }).catch(() => {});
    return;
  }
  const pattern = cue === "wrong" ? [40, 40, 40] : cue === "complete" || cue === "levelUp" ? [20, 30, 60] : 10;
  try {
    navigator.vibrate?.(pattern);
  } catch {
    // Vibration is optional.
  }
}

export async function celebrate(intense = false) {
  if (typeof window === "undefined" || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
  const confetti = (await import("canvas-confetti")).default;
  const colors = ["#0E8C7F", "#F2A322", "#2BB5A5", "#F5B544", "#E5484D", "#FFFFFF"];
  confetti({ particleCount: intense ? 160 : 90, spread: intense ? 100 : 70, origin: { y: 0.7 }, colors, disableForReducedMotion: true });
  if (intense) {
    setTimeout(() => confetti({ particleCount: 80, angle: 60, spread: 70, origin: { x: 0, y: 0.8 }, colors }), 250);
    setTimeout(() => confetti({ particleCount: 80, angle: 120, spread: 70, origin: { x: 1, y: 0.8 }, colors }), 400);
  }
}
