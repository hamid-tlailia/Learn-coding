"use client";

import { useProgress } from "@/lib/progress";

export function StatsPills({ labels }: { labels: { xp: string; streak: string } }) {
  const progress = useProgress();
  return (
    <div className="flex items-center gap-2 text-sm font-semibold tabular-nums">
      <span className="rounded-full bg-teal-soft px-3 py-0.5" title="Streak">
        🔥 {progress.streak.count} {labels.streak}
      </span>
      <span className="rounded-full bg-saffron-soft px-3 py-0.5" title="XP">
        ⚡ {progress.xp} {labels.xp}
      </span>
    </div>
  );
}
