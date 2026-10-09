"use client";

import { motion, type HTMLMotionProps } from "motion/react";
import { useEffect, useState } from "react";
import { play } from "@/lib/feedback";
import { liveStreak, useProgress } from "@/lib/progress";

/** A pressable button with a spring press, a tap sound and a light haptic. */
export function Press({ onClick, silent, ...props }: HTMLMotionProps<"button"> & { silent?: boolean }) {
  return (
    <motion.button
      type="button"
      whileTap={{ scale: 0.95 }}
      transition={{ type: "spring", stiffness: 600, damping: 30 }}
      onClick={(e) => {
        if (!silent) play("tap");
        onClick?.(e);
      }}
      {...props}
    />
  );
}

export function Card({ className = "", ...props }: HTMLMotionProps<"div">) {
  return <motion.div className={`glass rounded-3xl p-5 shadow-card ${className}`} {...props} />;
}

/** Cards that rise in one after another. Wrap a list of them in <Stagger>. */
export function Stagger({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <motion.div
      className={className}
      initial="hidden"
      animate="show"
      variants={{ hidden: {}, show: { transition: { staggerChildren: 0.06 } } }}
    >
      {children}
    </motion.div>
  );
}

export const rise = {
  hidden: { opacity: 0, y: 18 },
  show: { opacity: 1, y: 0, transition: { type: "spring" as const, stiffness: 260, damping: 26 } },
};

/** Streak and XP in one compact chip, so headers stay calm. */
export function StatPills({ labels }: { labels: { xp: string; streak: string } }) {
  const progress = useProgress();
  return (
    <div className="glass flex items-center gap-2 rounded-full px-3 py-1.5 text-sm font-bold tabular-nums">
      <span className="flex items-center gap-1 text-saffron" title={labels.streak}>
        🔥 {liveStreak(progress)}
      </span>
      <span className="h-4 w-px bg-line" aria-hidden="true" />
      <span className="flex items-center gap-1" title={labels.xp}>
        ⚡ {progress.xp}
      </span>
    </div>
  );
}

export function PageHeader({ title, subtitle, labels }: { title: string; subtitle?: string; labels: { xp: string; streak: string } }) {
  return (
    <header className="flex flex-wrap items-end justify-between gap-3">
      <div>
        <h1 className="text-3xl font-bold">{title}</h1>
        {subtitle && <p className="text-muted">{subtitle}</p>}
      </div>
      <StatPills labels={labels} />
    </header>
  );
}

export function Toggle({ checked, onChange, label, id }: { checked: boolean; onChange: (v: boolean) => void; label: string; id: string }) {
  return (
    <button
      id={id}
      type="button"
      role="switch"
      aria-checked={checked}
      aria-label={label}
      onClick={() => {
        play("select");
        onChange(!checked);
      }}
      className={`relative h-8 w-14 flex-none rounded-full transition-colors ${checked ? "btn-grad" : "bg-line"}`}
    >
      <motion.span
        layout
        transition={{ type: "spring", stiffness: 700, damping: 35 }}
        className={`absolute top-1 size-6 rounded-full bg-white shadow ${checked ? "end-1" : "start-1"}`}
      />
    </button>
  );
}

/** True after the first client render. Gates UI that depends on the clock or localStorage. */
export function useMounted() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  return mounted;
}
