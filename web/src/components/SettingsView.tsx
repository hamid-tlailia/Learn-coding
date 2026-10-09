"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState } from "react";
import { locales, t, type Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionary";
import { play } from "@/lib/feedback";
import { LOCALE_KEY } from "@/lib/keys";
import { resetProgress } from "@/lib/progress";
import { accents, avatars, updateSettings, useSettings, type Accent, type Backdrop, type ThemeMode } from "@/lib/settings";
import { Card, PageHeader, Press, rise, Stagger, Toggle, useMounted } from "./ui";

const SCROLL_KEY = "cm-settings-scroll";

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <motion.section variants={rise} className="flex flex-col gap-2">
      <h2 className="px-1 text-sm font-semibold text-muted">{title}</h2>
      <Card className="flex flex-col divide-y divide-line p-0">{children}</Card>
    </motion.section>
  );
}

function Row({ label, htmlFor, children, stack }: { label: string; htmlFor?: string; children: React.ReactNode; stack?: boolean }) {
  return (
    <div className={`flex gap-3 px-5 py-4 ${stack ? "flex-col" : "items-center justify-between"}`}>
      <label htmlFor={htmlFor} className="font-semibold">
        {label}
      </label>
      {children}
    </div>
  );
}

/** A segmented control with a sliding highlight. */
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
    <div className="flex rounded-2xl bg-surface-2 p-1" role="radiogroup">
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
          className={`relative flex-1 rounded-xl px-3 py-2 text-sm font-semibold ${value === o.value ? "text-on-accent" : "text-muted"}`}
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

export function SettingsView({ locale }: { locale: Locale }) {
  const mounted = useMounted();
  const dict = getDictionary(locale);
  const st = dict.settings;
  const s = useSettings();
  const pathname = usePathname();
  const [confirming, setConfirming] = useState(false);
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
  if (!mounted) return <div className="min-h-dvh" />;

  const rest = pathname.split("/").slice(2).join("/");

  return (
    <Stagger className="mx-auto flex max-w-2xl flex-col gap-6 px-4 py-6 lg:py-10">
      <motion.div variants={rise}>
        <PageHeader title={st.title} labels={dict.stats} />
      </motion.div>

      <Section title={st.profile}>
        <Row label={st.name} htmlFor="name" stack>
          <input
            id="name"
            value={s.name}
            maxLength={24}
            placeholder={st.namePlaceholder}
            onChange={(e) => updateSettings({ name: e.target.value })}
            className="rounded-2xl border border-line bg-surface-2 px-4 py-3 outline-none focus:border-accent"
          />
        </Row>
        <Row label={st.avatar} stack>
          <div className="grid grid-cols-6 gap-2">
            {avatars.map((a) => (
              <motion.button
                key={a}
                type="button"
                whileTap={{ scale: 0.85 }}
                aria-pressed={s.avatar === a}
                onClick={() => {
                  play("select");
                  updateSettings({ avatar: a });
                }}
                className={`grid aspect-square place-items-center rounded-2xl text-2xl ${
                  s.avatar === a ? "bg-accent-soft ring-2 ring-accent" : "bg-surface-2"
                }`}
              >
                {a}
              </motion.button>
            ))}
          </div>
        </Row>
      </Section>

      <Section title={st.appearance}>
        <Row label={st.theme} stack>
          <Segmented<ThemeMode>
            id="theme"
            value={s.theme}
            onChange={(theme) => updateSettings({ theme })}
            options={(["system", "light", "dark"] as const).map((v) => ({ value: v, label: st.themes[v] }))}
          />
        </Row>
        <Row label={st.accent} stack>
          <div className="flex flex-wrap gap-3">
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
                className="flex flex-col items-center gap-1 text-xs text-muted"
              >
                <span
                  className={`grid size-12 place-items-center rounded-full text-white ${s.accent === a ? "ring-4 ring-offset-2 ring-offset-surface" : ""}`}
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
                className={`flex h-20 flex-col items-center justify-center gap-1 rounded-2xl border-2 text-sm font-semibold ${
                  s.backdrop === b ? "border-accent bg-accent-soft" : "border-line bg-surface-2"
                }`}
              >
                <span className="text-2xl" aria-hidden="true">
                  {{ cosmic: "✨", aurora: "🌌", code: "</>", waves: "🌊", none: "⬜" }[b]}
                </span>
                {st.backdrops[b]}
              </motion.button>
            ))}
          </div>
        </Row>
      </Section>

      <Section title={st.soundSection}>
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
            className="w-40 accent-[var(--accent)]"
          />
        </Row>
        <Row label={st.haptics} htmlFor="haptics">
          <Toggle id="haptics" label={st.haptics} checked={s.haptics} onChange={(haptics) => updateSettings({ haptics })} />
        </Row>
        <div className="px-5 py-4">
          <Press silent onClick={() => play("complete")} className="rounded-2xl bg-surface-2 px-4 py-2 font-semibold">
            🔊 {st.test}
          </Press>
        </div>
      </Section>

      <Section title={st.learning}>
        <Row label={st.dailyGoal} stack>
          <Segmented<number>
            id="goal"
            value={s.dailyGoal}
            onChange={(dailyGoal) => updateSettings({ dailyGoal })}
            options={[20, 50, 100].map((v) => ({ value: v, label: `${st.goals[v]} · ${v}` }))}
          />
        </Row>
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

      <Section title={st.language}>
        <div className="px-5 py-4">
          <div className="flex rounded-2xl bg-surface-2 p-1">
            {locales.map((l) => (
              <Link
                key={l}
                href={`/${l}/${rest}`}
                scroll={false}
                onClick={() => {
                  play("select");
                  try {
                    window.sessionStorage.setItem(SCROLL_KEY, String(window.scrollY));
                  } catch {
                    // Keeping the scroll position is a convenience.
                  }
                  try {
                    window.localStorage.setItem(LOCALE_KEY, l);
                  } catch {
                    // Remembering the language is a convenience only.
                  }
                }}
                className={`flex-1 rounded-xl py-2 text-center text-sm font-semibold ${l === locale ? "btn-grad" : "text-muted"}`}
              >
                {l === "ar" ? "العربية" : "English"}
              </Link>
            ))}
          </div>
        </div>
      </Section>

      <Section title={st.data}>
        <div className="flex flex-col gap-3 px-5 py-4">
          <AnimatePresence mode="wait" initial={false}>
            {confirming ? (
              <motion.div key="confirm" initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="flex flex-col gap-3">
                <p className="text-sm">{st.resetConfirm}</p>
                <div className="flex gap-2">
                  <Press
                    silent
                    onClick={() => {
                      resetProgress();
                      play("wrong");
                      setConfirming(false);
                      setToast(st.resetDone);
                      window.setTimeout(() => setToast(null), 2200);
                    }}
                    className="rounded-2xl bg-coral px-4 py-2 font-semibold text-white"
                  >
                    {st.resetYes}
                  </Press>
                  <Press onClick={() => setConfirming(false)} className="rounded-2xl bg-surface-2 px-4 py-2 font-semibold">
                    {st.cancel}
                  </Press>
                </div>
              </motion.div>
            ) : (
              <motion.div key="button" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                <Press onClick={() => setConfirming(true)} className="rounded-2xl border border-coral px-4 py-2 font-semibold text-coral">
                  {st.reset}
                </Press>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </Section>

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
