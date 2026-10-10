"use client";

import { Capacitor } from "@capacitor/core";
import { LocalNotifications } from "@capacitor/local-notifications";
import { getDictionary } from "@/i18n/dictionary";
import { settingsStore, studyHours } from "./settings";

const REMINDER_ID = 1001;

/** Schedules (or cancels) the daily study reminder. Only the Android app can notify. */
export async function syncReminder(on: boolean, hour: number, text: { title: string; body: string }) {
  if (!Capacitor.isNativePlatform()) return;
  try {
    await LocalNotifications.cancel({ notifications: [{ id: REMINDER_ID }] });
    if (!on) return;
    const perm = await LocalNotifications.requestPermissions();
    if (perm.display !== "granted") return;
    await LocalNotifications.schedule({
      notifications: [
        {
          id: REMINDER_ID,
          title: text.title,
          body: text.body,
          schedule: { on: { hour, minute: 0 }, allowWhileIdle: true },
          smallIcon: "ic_stat_code",
          iconColor: "#8B5CF6",
        },
      ],
    });
  } catch {
    // Reminders are optional; the app works without them.
  }
}

/**
 * On app start, schedules the reminder again so it picks up the current icon and text.
 * Only when notifications are already allowed, so it never shows a permission prompt.
 */
export async function refreshReminder() {
  if (!Capacitor.isNativePlatform()) return;
  const s = settingsStore.get();
  if (!s.onboarded || !s.reminder) return;
  try {
    if ((await LocalNotifications.checkPermissions()).display !== "granted") return;
  } catch {
    return;
  }
  const o = getDictionary(document.documentElement.lang === "en" ? "en" : "ar").onboarding;
  await syncReminder(true, studyHours[s.studyTime], { title: o.reminderTitle, body: o.reminderBody });
}
