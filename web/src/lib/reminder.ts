"use client";

import { Capacitor } from "@capacitor/core";
import { LocalNotifications } from "@capacitor/local-notifications";

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
        },
      ],
    });
  } catch {
    // Reminders are optional; the app works without them.
  }
}
