"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { AnimatePresence, motion } from "motion/react";
import { useRef, useState } from "react";
import { stages, type Track } from "@/content/curriculum";
import type { Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionary";
import { celebrate, play } from "@/lib/feedback";
import { photoToDataUrl } from "@/lib/image";
import { LOCALE_KEY } from "@/lib/keys";
import { syncReminder } from "@/lib/reminder";
import { avatars, studyHours, updateSettings, useSettings, type Goal, type Level, type StudyTime } from "@/lib/settings";
import { Avatar } from "./Avatar";
import { Logo } from "./Logo";
import { Press, Toggle } from "./ui";

type Step = "welcome" | "name" | "photo" | "goal" | "track" | "level" | "time" | "ready";
const order: Step[] = ["welcome", "name", "photo", "goal", "track", "level", "time", "ready"];

function Choice({ on, onClick, icon, title, text }: { on: boolean; onClick: () => void; icon: string; title: string; text?: string }) {
  return (
    <motion.button
      type="button"
      whileTap={{ scale: 0.97 }}
      onClick={() => {
        play("select");
        onClick();
      }}
      aria-pressed={on}
      className={`flex items-center gap-4 rounded-2xl border-2 p-4 text-start ${on ? "border-transparent glow-ring bg-accent-soft" : "glass border-line"}`}
    >
      <span className="text-3xl" aria-hidden="true">
        {icon}
      </span>
      <span className="flex flex-col">
        <span className="font-display font-bold">{title}</span>
        {text && <span className="text-sm text-muted">{text}</span>}
      </span>
    </motion.button>
  );
}

/** First launch: learn who the learner is and build a plan before the first lesson. */
export function Onboarding({ locale }: { locale: Locale }) {
  const o = getDictionary(locale).onboarding;
  const router = useRouter();
  const s = useSettings();
  const [i, setI] = useState(0);
  const file = useRef<HTMLInputElement>(null);
  const step = order[i];

  const canNext = step !== "name" || s.name.trim().length > 0;

  function next() {
    if (!canNext) {
      play("wrong");
      return;
    }
    play("whoosh");
    setI((n) => Math.min(n + 1, order.length - 1));
  }

  async function finish() {
    updateSettings({ onboarded: true });
    syncReminder(s.reminder, studyHours[s.studyTime], { title: o.reminderTitle, body: o.reminderBody });
    play("levelUp");
    celebrate(true);
    // Everyone starts at the beginning; stages unlock in order.
    const stage = stages[0];
    router.push(`/${locale}/learn/${stage.slug}/${stage.lessons[0].slug}/`);
  }

  const card = (title: string, body: React.ReactNode, text?: string) => (
    <div className="flex flex-col gap-5">
      <div>
        <h1 className="text-3xl font-bold">{title}</h1>
        {text && <p className="mt-1 text-muted">{text}</p>}
      </div>
      {body}
    </div>
  );

  return (
    <div className="fixed inset-0 z-50 flex flex-col bg-paper" style={{ paddingTop: "env(safe-area-inset-top, 0px)" }}>
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
        <span className="absolute -top-40 -end-40 size-[30rem] rounded-full bg-[#4f46e5] opacity-25 blur-[100px]" />
        <span className="absolute -bottom-40 -start-40 size-[26rem] rounded-full bg-[#a21caf] opacity-20 blur-[100px]" />
      </div>

      {step !== "welcome" && (
        <div className="relative mx-auto flex w-full max-w-lg items-center gap-3 px-5 py-4">
          <button type="button" onClick={() => setI((n) => n - 1)} className="font-semibold text-muted">
            {o.back}
          </button>
          <div className="flex flex-1 gap-1.5" aria-hidden="true">
            {order.slice(1).map((_, k) => (
              <span key={k} className={`h-1.5 flex-1 rounded-full ${k < i ? "btn-grad" : "bg-line"}`} />
            ))}
          </div>
        </div>
      )}

      <div className="relative mx-auto flex w-full max-w-lg flex-1 flex-col justify-center overflow-y-auto px-5 py-4">
        <AnimatePresence mode="wait">
          <motion.div
            key={step}
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -24 }}
            transition={{ type: "spring", stiffness: 260, damping: 26 }}
          >
            {step === "welcome" && (
              <div className="flex flex-col items-center gap-6 text-center">
                <motion.div initial={{ scale: 0.6, rotate: -10 }} animate={{ scale: 1, rotate: 0 }} transition={{ type: "spring", stiffness: 200, damping: 12 }}>
                  <Logo size="xl" withName={false} />
                </motion.div>
                <h1 className="text-3xl font-bold">{o.welcomeTitle}</h1>
                <p className="text-lg text-muted">{o.welcomeText}</p>
                <div className="flex rounded-2xl bg-surface-2 p-1">
                  {(["ar", "en"] as const).map((l) => (
                    <Link
                      key={l}
                      href={`/${l}/`}
                      onClick={() => {
                        try {
                          window.localStorage.setItem(LOCALE_KEY, l);
                        } catch {
                          // Remembering the language is a convenience only.
                        }
                      }}
                      className={`rounded-xl px-5 py-2 text-sm font-semibold ${l === locale ? "btn-grad" : "text-muted"}`}
                    >
                      {l === "ar" ? "العربية" : "English"}
                    </Link>
                  ))}
                </div>
              </div>
            )}

            {step === "name" &&
              card(
                o.nameTitle,
                <>
                  <input
                    id="onboarding-name"
                    autoFocus
                    value={s.name}
                    maxLength={24}
                    placeholder={o.namePlaceholder}
                    onChange={(e) => updateSettings({ name: e.target.value })}
                    onKeyDown={(e) => e.key === "Enter" && next()}
                    className="glass rounded-2xl px-5 py-4 text-xl outline-none focus:glow-ring"
                  />
                  <AnimatePresence>
                    {s.name.trim() && (
                      <motion.p initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="text-lg font-semibold text-accent">
                        {o.nice.replace("{name}", s.name.trim())}
                      </motion.p>
                    )}
                  </AnimatePresence>
                </>,
                o.nameText,
              )}

            {step === "photo" &&
              card(
                o.photoTitle,
                <div className="flex flex-col items-center gap-4">
                  <Avatar className="size-32 rounded-[2.5rem] text-6xl" />
                  <input
                    ref={file}
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={async (e) => {
                      const f = e.target.files?.[0];
                      if (f) updateSettings({ photo: await photoToDataUrl(f) });
                    }}
                  />
                  <div className="flex gap-2">
                    <Press onClick={() => file.current?.click()} className="btn-grad rounded-2xl px-5 py-2.5 font-semibold">
                      📷 {o.pickPhoto}
                    </Press>
                    {s.photo && (
                      <Press onClick={() => updateSettings({ photo: "" })} className="rounded-2xl bg-surface-2 px-4 py-2.5 font-semibold">
                        {o.removePhoto}
                      </Press>
                    )}
                  </div>
                  <span className="text-sm text-muted">{o.orEmoji}</span>
                  <div className="grid grid-cols-6 gap-2">
                    {avatars.map((a) => (
                      <button
                        key={a}
                        type="button"
                        onClick={() => {
                          play("select");
                          updateSettings({ avatar: a, photo: "" });
                        }}
                        className={`grid size-12 place-items-center rounded-2xl text-2xl ${!s.photo && s.avatar === a ? "bg-accent-soft ring-2 ring-accent" : "bg-surface-2"}`}
                      >
                        {a}
                      </button>
                    ))}
                  </div>
                </div>,
                o.photoText,
              )}

            {step === "goal" &&
              card(
                o.goalTitle,
                <div className="flex flex-col gap-3">
                  {(Object.keys(o.goals) as Goal[]).map((g) => (
                    <Choice
                      key={g}
                      on={s.goal === g}
                      onClick={() => updateSettings({ goal: g })}
                      icon={{ career: "💼", projects: "🚀", study: "🎓", fun: "🎮" }[g]}
                      title={o.goals[g].t}
                      text={o.goals[g].d}
                    />
                  ))}
                </div>,
              )}

            {step === "track" &&
              card(
                o.trackTitle,
                <div className="flex flex-col gap-3">
                  {(["web", "mobile"] as Track[]).map((tr) => (
                    <Choice
                      key={tr}
                      on={s.track === tr}
                      onClick={() => updateSettings({ track: tr })}
                      icon={tr === "web" ? "🌐" : "📱"}
                      title={o.tracks[tr].t}
                      text={o.tracks[tr].d}
                    />
                  ))}
                </div>,
                o.trackText,
              )}

            {step === "level" &&
              card(
                o.levelTitle,
                <div className="flex flex-col gap-3">
                  {(Object.keys(o.levels) as Level[]).map((l) => (
                    <Choice
                      key={l}
                      on={s.level === l}
                      onClick={() => updateSettings({ level: l })}
                      icon={{ new: "🌱", some: "🌿", dev: "🌳" }[l]}
                      title={o.levels[l].t}
                      text={o.levels[l].d}
                    />
                  ))}
                </div>,
              )}

            {step === "time" &&
              card(
                o.timeTitle,
                <div className="flex flex-col gap-5">
                  <div className="grid grid-cols-2 gap-3">
                    {(Object.keys(o.times) as StudyTime[]).map((tm) => (
                      <Choice key={tm} on={s.studyTime === tm} onClick={() => updateSettings({ studyTime: tm })} icon="" title={o.times[tm]} />
                    ))}
                  </div>
                  <div className="flex flex-col gap-2">
                    <h2 className="font-bold">{o.minutesTitle}</h2>
                    <div className="grid grid-cols-3 gap-2">
                      {[20, 50, 100].map((g) => (
                        <button
                          key={g}
                          type="button"
                          onClick={() => {
                            play("select");
                            updateSettings({ dailyGoal: g });
                          }}
                          className={`rounded-2xl py-3 font-semibold ${s.dailyGoal === g ? "btn-grad" : "glass"}`}
                        >
                          {o.minutes[g]}
                        </button>
                      ))}
                    </div>
                  </div>
                  <label htmlFor="onboarding-reminder" className="glass flex items-center justify-between rounded-2xl p-4 font-semibold">
                    🔔 {o.reminder}
                    <Toggle id="onboarding-reminder" label={o.reminder} checked={s.reminder} onChange={(reminder) => updateSettings({ reminder })} />
                  </label>
                </div>,
                o.timeText,
              )}

            {step === "ready" && (
              <div className="flex flex-col items-center gap-5 text-center">
                <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: "spring", stiffness: 220, damping: 12 }}>
                  <Avatar className="size-28 rounded-[2.2rem] text-6xl" />
                </motion.div>
                <h1 className="text-3xl font-bold">{o.readyTitle}</h1>
                <p className="text-lg text-muted">
                  {o.readyText.replace("{minutes}", o.minutes[s.dailyGoal] ?? "").replace("{time}", o.times[s.studyTime])}
                </p>
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="relative mx-auto w-full max-w-lg px-5 pt-3" style={{ paddingBottom: "calc(env(safe-area-inset-bottom, 0px) + 18px)" }}>
        <Press
          silent
          onClick={step === "ready" ? finish : next}
          disabled={!canNext}
          className="btn-grad h-14 w-full rounded-2xl font-display text-lg font-bold disabled:opacity-40"
        >
          {step === "welcome" ? o.begin : step === "ready" ? o.go : o.next}
        </Press>
        {step === "photo" && (
          <button type="button" onClick={next} className="mt-2 w-full py-2 text-sm font-semibold text-muted">
            {o.skip}
          </button>
        )}
      </div>
    </div>
  );
}
