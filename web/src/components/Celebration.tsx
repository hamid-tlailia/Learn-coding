"use client";

import { animate, motion, useMotionValue, useTransform } from "motion/react";
import { useEffect } from "react";

/** A full-screen reward moment: big emoji, counted-up XP, and the next steps. */
export function Celebration({
  emoji,
  title,
  subtitle,
  xp,
  levelUp,
  children,
}: {
  emoji: string;
  title: string;
  subtitle: string;
  xp?: number;
  levelUp?: string;
  children: React.ReactNode;
}) {
  const count = useMotionValue(0);
  const shown = useTransform(count, (v) => `+${Math.round(v)} XP`);

  useEffect(() => {
    if (!xp) return;
    const controls = animate(count, xp, { duration: 1.1, delay: 0.35, ease: "easeOut" });
    return () => controls.stop();
  }, [count, xp]);

  return (
    <motion.div
      className="fixed inset-0 z-50 grid place-items-center bg-ink/60 p-4 backdrop-blur-sm"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      role="dialog"
      aria-modal="true"
      aria-label={title}
    >
      <motion.div
        className="flex w-full max-w-sm flex-col items-center gap-4 rounded-[2rem] bg-surface p-7 text-center shadow-2xl"
        initial={{ scale: 0.6, y: 40, opacity: 0 }}
        animate={{ scale: 1, y: 0, opacity: 1 }}
        transition={{ type: "spring", stiffness: 260, damping: 18 }}
      >
        <motion.span
          className="text-7xl"
          initial={{ scale: 0, rotate: -30 }}
          animate={{ scale: [0, 1.3, 1], rotate: 0 }}
          transition={{ delay: 0.15, duration: 0.6 }}
          aria-hidden="true"
        >
          {emoji}
        </motion.span>
        <div>
          <h2 className="text-3xl font-bold">{title}</h2>
          <p className="text-muted">{subtitle}</p>
        </div>
        {!!xp && <motion.span className="rounded-2xl bg-saffron-soft px-5 py-2 font-display text-2xl font-bold tabular-nums">{shown}</motion.span>}
        {levelUp && (
          <motion.span
            className="rounded-full btn-grad px-4 py-1 font-display font-semibold"
            initial={{ scale: 0 }}
            animate={{ scale: [0, 1.2, 1] }}
            transition={{ delay: 1.2 }}
          >
            ⭐ {levelUp}
          </motion.span>
        )}
        <div className="mt-2 flex w-full flex-col gap-2">{children}</div>
      </motion.div>
    </motion.div>
  );
}
