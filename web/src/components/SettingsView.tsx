"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { locales, t, type Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionary";
import { play } from "@/lib/feedback";
import { photoToDataUrl } from "@/lib/image";
import { LOCALE_KEY } from "@/lib/keys";
import { levelOf, resetProgress, useProgress } from "@/lib/progress";
import { syncReminder } from "@/lib/reminder";
import {
  accents,
  avatars,
  studyHours,
  updateSettings,
  useSettings,
  type Accent,
  type Backdrop,
  type StudyTime,
  type ThemeMode,
} from "@/lib/settings";
import { SITE_URL } from "@/lib/site";
import { Avatar } from "./Avatar";
import { TrashIcon } from "./Icons";
import { Press, rise, Stagger, Toggle, useMounted } from "./ui";

const SCROLL_KEY = "cm-settings-scroll";
const APP_VERSION = "1.0.0";

/** A titled group of rows, each row separated by a hairline. */
function Section({ icon, title, children }: { icon: string; title: string; children: React.ReactNode }) {
  return (
    <motion.section variants={rise} className="flex flex-col gap-2">
      <h2 className="flex items-center gap-2 px-1 text-sm font-bold text-muted">
        <span aria-hidden="true">{icon}</span>
        {title}
      </h2>
      <div className="glass flex flex-col divide-y divide-line overflow-hidden rounded-3xl shadow-card">{children}</div>
    </motion.section>
  );
}

/** A label with its control: on the same line when it fits, or stacked below for wide controls. */
function Row({ label, hint, htmlFor, children, stack }: { label: string; hint?: string; htmlFor?: string; children: React.ReactNode; stack?: boolean }) {
  return (
    <div className={`flex gap-3 px-5 py-4 ${stack ? "flex-col" : "items-center justify-between"}`}>
      <label htmlFor={htmlFor} className="flex min-w-0 flex-col">
        <span className="font-semibold">{label}</span>
        {hint && <span className="text-xs text-muted">{hint}</span>}
      </label>
      {children}
    </div>
  );
}

/** A segmented control with a sliding highlight; wraps to two columns past three options. */
function Segmented<T extends string | number>({
  id,
  value,
  options,
  onChange,
}: {
  id: string;
  value: T;
  options: { value: T; label: string }[];
  onChange: (v: T) => void;
}) {
  return (
    <div
      className="grid gap-1 rounded-2xl bg-surface-2 p-1"
      style={{ gridTemplateColumns: `repeat(${options.length > 3 ? 2 : options.length}, minmax(0, 1fr))` }}
      role="radiogroup"
    >
      {options.map((o) => (
        <button
          key={String(o.value)}
          type="button"
          role="radio"
          aria-checked={value === o.value}
          onClick={() => {
            play("select");
            onChange(o.value);
          }}
          className={`relative min-w-0 rounded-xl px-2 py-2 text-sm font-semibold ${value === o.value ? "text-on-accent" : "text-muted"}`}
        >
          {value === o.value && (
            <motion.span layoutId={`seg-${id}`} className="btn-grad absolute inset-0 rounded-xl" transition={{ type: "spring", stiffness: 500, damping: 38 }} />
          )}
          <span className="relative">{o.label}</span>
        </button>
      ))}
    </div>
  );
}

/** Removes every key the app stores, then reloads at the welcome screens. */
function wipeEverything() {
  try {
    for (const key of Object.keys(window.localStorage)) {
      if (key.startsWith("satr-") || key.startsWith("cm-")) window.localStorage.removeItem(key);
    }
    window.sessionStorage.clear();
  } catch {
    // Nothing stored.
  }
  window.location.replace("/");
}

export function SettingsView({ locale }: { locale: Locale }) {
  const mounted = useMounted();
  const dict = getDictionary(locale);
  const st = dict.settings;
  const o = dict.onboarding;
  const s = useSettings();
  const progress = useProgress();
  const pathname = usePathname();
  const photoInput = useRef<HTMLInputElement>(null);
  const [emojiOpen, setEmojiOpen] = useState(false);
  const [modal, setModal] = useState(false);
  const [toast, setToast] = useState<string | null>(null);

  // After switching language, come back to the same spot instead of the top of the page.
  useEffect(() => {
    if (!mounted) return;
    try {
      const y = window.sessionStorage.getItem(SCROLL_KEY);
      if (y !== null) {
        window.sessionStorage.removeItem(SCROLL_KEY);
        requestAnimationFrame(() => window.scrollTo({ top: Number(y), behavior: "instant" as ScrollBehavior }));
      }
    } catch {
      // Nothing to restore.
    }
  }, [mounted]);

  useEffect(() => {
    if (!modal) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setModal(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [modal]);

  if (!mounted) return <div className="min-h-dvh" />;

  const rest = pathname.split("/").slice(2).join("/");
  const { level } = levelOf(progress.xp);
  const reminder = (on: boolean, time: StudyTime) => syncReminder(on, studyHours[time], { title: o.reminderTitle, body: o.reminderBody });

  return (
    <Stagger className="mx-auto flex max-w-2xl flex-col gap-6 px-4 py-6 lg:py-10">
      <motion.h1 variants={rise} className="text-3xl font-bold">
        {st.title}
      </motion.h1>

      {/* Profile card: photo first (tap to change), then name and emoji */}
      <motion.section variants={rise} className="glass flex flex-col items-center gap-4 rounded-3xl p-6 shadow-card">
        <input
          ref={photoInput}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={async (e) => {
            const f = e.target.files?.[0];
            if (f) updateSettings({ photo: await photoToDataUrl(f) });
            e.target.value = "";
          }}
        />
        <div className="relative">
          <motion.button
            type="button"
            whileTap={{ scale: 0.95 }}
            onClick={() => {
              play("tap");
              photoInput.current?.click();
            }}
            aria-label={o.pickPhoto}
            className="group relative block overflow-hidden rounded-[2rem]"
          >
            <Avatar className="size-28 rounded-[2rem] text-6xl" />
            <span className="absolute inset-0 grid place-items-center bg-black/45 text-3xl opacity-0 transition-opacity group-hover:opacity-100 group-active:opacity-100">
              📷
            </span>
          </motion.button>
          <span className="btn-grad pointer-events-none absolute -bottom-1 -end-1 grid size-9 place-items-center rounded-full shadow-card" aria-hidden="true">
            📷
          </span>
          {s.photo && (
            <Press
              onClick={() => updateSettings({ photo: "" })}
              aria-label={o.removePhoto}
              title={o.removePhoto}
              className="absolute -top-1 -start-1 grid size-9 place-items-center rounded-full bg-coral text-white shadow-card"
            >
              <TrashIcon className="size-4" />
            </Press>
          )}
        </div>
        <input
          id="name"
          value={s.name}
          maxLength={24}
          placeholder={st.namePlaceholder}
          aria-label={st.name}
          onChange={(e) => updateSettings({ name: e.target.value })}
          className="w-full max-w-xs rounded-2xl border border-line bg-surface-2 px-4 py-3 text-center text-lg font-semibold outline-none focus:border-accent"
        />
        <span className="btn-grad rounded-full px-3 py-0.5 text-xs font-bold">
          {dict.profile.level} {level}
        </span>
        <button type="button" onClick={() => setEmojiOpen((v) => !v)} className="text-sm font-semibold text-accent">
          {st.emoji} {emojiOpen ? "▲" : "▼"}
        </button>
        <AnimatePresence initial={false}>
          {emojiOpen && (
            <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="w-full overflow-hidden">
              <div className="grid grid-cols-6 gap-2 pt-1">
                {avatars.map((a) => (
                  <motion.button
                    key={a}
                    type="button"
                    whileTap={{ scale: 0.85 }}
                    aria-pressed={!s.photo && s.avatar === a}
                    onClick={() => {
                      play("select");
                      updateSettings({ avatar: a, photo: "" });
                    }}
                    className={`grid aspect-square place-items-center rounded-2xl text-2xl ${!s.photo && s.avatar === a ? "bg-accent-soft ring-2 ring-accent" : "bg-surface-2"}`}
                  >
                    {a}
                  </motion.button>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.section>

      <Section icon="🎨" title={st.appearance}>
        <Row label={st.theme} stack>
          <Segmented<ThemeMode>
            id="theme"
            value={s.theme}
            onChange={(theme) => updateSettings({ theme })}
            options={(["system", "light", "dark"] as const).map((v) => ({ value: v, label: st.themes[v] }))}
          />
        </Row>
        <Row label={st.accent} stack>
          <div className="grid grid-cols-6 gap-1">
            {(Object.keys(accents) as Accent[]).map((a) => (
              <motion.button
                key={a}
                type="button"
                whileTap={{ scale: 0.85 }}
                aria-pressed={s.accent === a}
                aria-label={t(accents[a].label, locale)}
                onClick={() => {
                  play("select");
                  updateSettings({ accent: a });
                }}
                className="flex min-w-0 flex-col items-center gap-1 text-[11px] text-muted"
              >
                <span
                  className={`grid size-10 place-items-center rounded-full text-white ${s.accent === a ? "ring-[3px] ring-offset-2 ring-offset-surface" : ""}`}
                  style={{ background: accents[a].color, ["--tw-ring-color" as string]: a === "neon" ? "#8b5cf6" : accents[a].color }}
                >
                  {s.accent === a ? "✓" : ""}
                </span>
                {t(accents[a].label, locale)}
              </motion.button>
            ))}
          </div>
        </Row>
        <Row label={st.backdrop} stack>
          <div className="grid grid-cols-3 gap-2 sm:grid-cols-5">
            {(["cosmic", "aurora", "code", "waves", "none"] as Backdrop[]).map((b) => (
              <motion.button
                key={b}
                type="button"
                whileTap={{ scale: 0.95 }}
                aria-pressed={s.backdrop === b}
                onClick={() => {
                  play("select");
                  updateSettings({ backdrop: b });
                }}
                className={`flex h-16 flex-col items-center justify-center gap-0.5 rounded-2xl border-2 text-xs font-semibold ${
                  s.backdrop === b ? "border-accent bg-accent-soft" : "border-line bg-surface-2"
                }`}
              >
                <span className="text-xl" aria-hidden="true">
                  {{ cosmic: "✨", aurora: "🌌", code: "</>", waves: "🌊", none: "⬜" }[b]}
                </span>
                {st.backdrops[b]}
              </motion.button>
            ))}
          </div>
        </Row>
      </Section>

      <Section icon="🎯" title={st.learning}>
        <Row label={st.dailyGoal} stack>
          <Segmented<number>
            id="goal"
            value={s.dailyGoal}
            onChange={(dailyGoal) => updateSettings({ dailyGoal })}
            options={[20, 50, 100].map((v) => ({ value: v, label: o.minutes[v] }))}
          />
        </Row>
        <Row label={o.timeTitle} stack>
          <Segmented<StudyTime>
            id="study-time"
            value={s.studyTime}
            onChange={(studyTime) => {
              updateSettings({ studyTime });
              reminder(s.reminder, studyTime);
            }}
            options={(["morning", "afternoon", "evening", "night"] as const).map((v) => ({ value: v, label: o.times[v] }))}
          />
        </Row>
        <Row label={o.reminder} hint={o.timeText} htmlFor="reminder">
          <Toggle
            id="reminder"
            label={o.reminder}
            checked={s.reminder}
            onChange={(on) => {
              updateSettings({ reminder: on });
              reminder(on, s.studyTime);
            }}
          />
        </Row>
      </Section>

      <Section icon="🔊" title={st.soundSection}>
        <Row label={st.sound} htmlFor="sound">
          <Toggle id="sound" label={st.sound} checked={s.sound} onChange={(sound) => updateSettings({ sound })} />
        </Row>
        <Row label={st.volume} htmlFor="volume">
          <input
            id="volume"
            type="range"
            min={0.1}
            max={1}
            step={0.1}
            value={s.volume}
            disabled={!s.sound}
            onChange={(e) => updateSettings({ volume: Number(e.target.value) })}
            onPointerUp={() => play("correct")}
            className="w-36 accent-[var(--accent)]"
          />
        </Row>
        <Row label={st.haptics} htmlFor="haptics">
          <Toggle id="haptics" label={st.haptics} checked={s.haptics} onChange={(haptics) => updateSettings({ haptics })} />
        </Row>
        <div className="px-5 py-3">
          <Press silent onClick={() => play("complete")} className="rounded-2xl bg-surface-2 px-4 py-2 text-sm font-semibold">
            🔊 {st.test}
          </Press>
        </div>
      </Section>

      <Section icon="⌨️" title={st.editor}>
        <Row label={st.fontSize} stack>
          <div className="flex items-center gap-4">
            <input
              id="font-size"
              type="range"
              min={12}
              max={22}
              step={1}
              value={s.editorFontSize}
              onChange={(e) => updateSettings({ editorFontSize: Number(e.target.value) })}
              className="flex-1 accent-[var(--accent)]"
              aria-label={st.fontSize}
            />
            <code className="rounded-xl bg-code-bg px-3 py-1.5 font-mono text-code-fg" style={{ fontSize: s.editorFontSize }}>
              {"<p>"}
            </code>
          </div>
        </Row>
      </Section>

      <Section icon="🌐" title={st.language}>
        <div className="px-5 py-4">
          <div className="grid grid-cols-2 gap-1 rounded-2xl bg-surface-2 p-1">
            {locales.map((l) => (
              <Link
                key={l}
                href={`/${l}/${rest}`}
                scroll={false}
                onClick={() => {
                  play("select");
                  try {
                    window.sessionStorage.setItem(SCROLL_KEY, String(window.scrollY));
                    window.localStorage.setItem(LOCALE_KEY, l);
                  } catch {
                    // Remembering the language is a convenience only.
                  }
                }}
                className={`rounded-xl py-2 text-center text-sm font-semibold ${l === locale ? "btn-grad" : "text-muted"}`}
              >
                {l === "ar" ? "العربية" : "English"}
              </Link>
            ))}
          </div>
        </div>
      </Section>

      <Section icon="ℹ️" title={st.about}>
        <Row label={st.version}>
          <span className="font-mono text-sm text-muted">{APP_VERSION}</span>
        </Row>
        <Row label={st.website}>
          <span className="truncate font-mono text-sm text-muted" dir="ltr">
            {SITE_URL.replace("https://", "")}
          </span>
        </Row>
      </Section>

      <Section icon="⚠️" title={st.danger}>
        <button
          type="button"
          onClick={() => {
            play("tap");
            setModal(true);
          }}
          className="flex items-center justify-between px-5 py-4 text-start"
        >
          <span className="flex flex-col">
            <span className="font-semibold text-coral">{st.resetAll}</span>
            <span className="text-xs text-muted">{st.resetAllHint}</span>
          </span>
          <span className="text-coral" aria-hidden="true">
            {locale === "ar" ? "‹" : "›"}
          </span>
        </button>
      </Section>

      {/* Reset modal, rendered on <body> so it sits above the tab bar */}
      {createPortal(
      <AnimatePresence>
        {modal && (
          <motion.div
            className="fixed inset-0 z-[60] grid place-items-end bg-black/60 p-4 backdrop-blur-sm sm:place-items-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setModal(false)}
          >
            <motion.div
              role="dialog"
              aria-modal="true"
              aria-labelledby="reset-title"
              onClick={(e) => e.stopPropagation()}
              initial={{ y: 60, opacity: 0, scale: 0.96 }}
              animate={{ y: 0, opacity: 1, scale: 1 }}
              exit={{ y: 60, opacity: 0 }}
              transition={{ type: "spring", stiffness: 320, damping: 28 }}
              className="flex w-full max-w-md flex-col gap-4 rounded-[2rem] bg-surface p-6 shadow-2xl"
              style={{ marginBottom: "env(safe-area-inset-bottom, 0px)" }}
            >
              <div className="flex flex-col items-center gap-2 text-center">
                <span className="grid size-14 place-items-center rounded-2xl bg-coral/15 text-3xl" aria-hidden="true">
                  ⚠️
                </span>
                <h2 id="reset-title" className="text-xl font-bold">
                  {st.modalTitle}
                </h2>
                <p className="text-sm text-muted">{st.modalText}</p>
              </div>
              <button
                type="button"
                onClick={() => {
                  resetProgress();
                  play("wrong");
                  setModal(false);
                  setToast(st.resetDone);
                  window.setTimeout(() => setToast(null), 2200);
                }}
                className="flex flex-col rounded-2xl border border-coral/50 p-4 text-start hover:bg-coral/10"
              >
                <span className="font-bold text-coral">{st.progressOnly}</span>
                <span className="text-xs text-muted">{st.progressOnlyText}</span>
              </button>
              <button type="button" onClick={wipeEverything} className="flex flex-col rounded-2xl bg-coral p-4 text-start text-white">
                <span className="font-bold">{st.everything}</span>
                <span className="text-xs opacity-90">{st.everythingText}</span>
              </button>
              <button type="button" onClick={() => setModal(false)} className="py-2 font-semibold text-muted">
                {st.cancel}
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>,
      document.body,
      )}

      <AnimatePresence>
        {toast && (
          <motion.div
            role="status"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="fixed inset-x-4 bottom-28 z-50 mx-auto max-w-sm rounded-2xl bg-ink px-4 py-3 text-center font-semibold text-paper lg:bottom-8"
          >
            {toast}
          </motion.div>
        )}
      </AnimatePresence>
    </Stagger>
  );
}
