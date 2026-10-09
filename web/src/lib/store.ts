"use client";

import { useSyncExternalStore } from "react";

/**
 * A tiny persisted store: state lives in memory, is mirrored to localStorage,
 * and React components subscribe with `use()`.
 */
export function createStore<T extends object>(key: string, initial: T) {
  let state = initial;
  let loaded = false;
  const listeners = new Set<() => void>();

  function get(): T {
    if (!loaded && typeof window !== "undefined") {
      loaded = true;
      try {
        const raw = window.localStorage.getItem(key);
        if (raw) state = { ...initial, ...JSON.parse(raw) };
      } catch {
        state = initial;
      }
    }
    return state;
  }

  function set(next: T | ((prev: T) => T)) {
    state = typeof next === "function" ? (next as (prev: T) => T)(get()) : next;
    try {
      window.localStorage.setItem(key, JSON.stringify(state));
    } catch {
      // Storage can be unavailable (private mode); state then lasts for the session.
    }
    listeners.forEach((l) => l());
  }

  function subscribe(listener: () => void) {
    listeners.add(listener);
    return () => listeners.delete(listener);
  }

  function use(): T {
    return useSyncExternalStore(subscribe, get, () => initial);
  }

  return { get, set, use, initial };
}
