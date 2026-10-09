"use client";

import { useEffect } from "react";
import { Capacitor, registerPlugin } from "@capacitor/core";
import { App } from "@capacitor/app";

/** Native side: android/app/src/main/java/com/satr/learn/ThemePlugin.java */
const CmTheme = registerPlugin<{ set(options: { dark: boolean; color: string }): Promise<void> }>("CmTheme");

/**
 * Android app behaviour: the system bars follow the app theme, and the back button
 * walks back through screens before closing the app.
 */
export function NativeBridge() {
  useEffect(() => {
    if (!Capacitor.isNativePlatform()) return;
    const root = document.documentElement;
    const syncBars = () => {
      const dark = root.dataset.theme === "dark";
      const color = getComputedStyle(root).getPropertyValue("--paper").trim() || (dark ? "#0a0f24" : "#f3f6f6");
      CmTheme.set({ dark, color }).catch(() => {});
    };
    syncBars();
    const observer = new MutationObserver(syncBars);
    observer.observe(root, { attributes: true, attributeFilter: ["data-theme"] });

    const listener = App.addListener("backButton", ({ canGoBack }) => {
      if (canGoBack) window.history.back();
      else App.exitApp();
    });
    return () => {
      observer.disconnect();
      listener.then((l) => l.remove());
    };
  }, []);

  return null;
}
