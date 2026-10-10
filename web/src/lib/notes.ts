"use client";

import { createStore } from "./store";

/** The learner's own notes, one per lesson, keyed "stage/slug". */
export type Note = { text: string; at: string };

const store = createStore<Record<string, Note>>("cm-notes-v1", {});

export const useNotes = store.use;

export function saveNote(key: string, text: string) {
  store.set((all) => {
    const next = { ...all };
    if (text.trim()) next[key] = { text, at: new Date().toISOString() };
    else delete next[key];
    return next;
  });
}

export function clearNotes() {
  store.set({});
}
