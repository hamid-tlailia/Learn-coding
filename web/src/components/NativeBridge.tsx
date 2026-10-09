"use client";

import { useEffect } from "react";
import { Capacitor } from "@capacitor/core";
import { App } from "@capacitor/app";
import { StatusBar, Style } from "@capacitor/status-bar";

/** Android app behaviour: the back button walks back through lessons before closing the app. */
export function NativeBridge() {
  useEffect(() => {
    if (!Capacitor.isNativePlatform()) return;
    const dark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    StatusBar.setStyle({ style: dark ? Style.Dark : Style.Light }).catch(() => {});
    StatusBar.setBackgroundColor({ color: dark ? "#0b1416" : "#f6f8f8" }).catch(() => {});

    const listener = App.addListener("backButton", ({ canGoBack }) => {
      if (canGoBack) window.history.back();
      else App.exitApp();
    });
    return () => {
      listener.then((l) => l.remove());
    };
  }, []);

  return null;
}
