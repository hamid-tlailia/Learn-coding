"use client";

import { useEffect } from "react";
import { Capacitor } from "@capacitor/core";
import { App } from "@capacitor/app";
import { StatusBar, Style } from "@capacitor/status-bar";

/**
 * Android app behaviour: the status bar follows the app theme, and the back button
 * walks back through screens before closing the app.
 */
export function NativeBridge() {
  useEffect(() => {
    if (!Capacitor.isNativePlatform()) return;
    const root = document.documentElement;
    const syncStatusBar = () => {
      const dark = root.dataset.theme === "dark";
      StatusBar.setStyle({ style: dark ? Style.Dark : Style.Light }).catch(() => {});
      StatusBar.setBackgroundColor({ color: dark ? "#0a1214" : "#f3f6f6" }).catch(() => {});
    };
    syncStatusBar();
    const observer = new MutationObserver(syncStatusBar);
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
