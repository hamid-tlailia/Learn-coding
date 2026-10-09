"use client";

import { useSettings } from "@/lib/settings";

/** The learner's photo if they added one, otherwise their emoji avatar. */
export function Avatar({ className = "size-14 rounded-2xl text-3xl" }: { className?: string }) {
  const { photo, avatar } = useSettings();
  return photo ? (
    // eslint-disable-next-line @next/next/no-img-element
    <img src={photo} alt="" className={`${className} object-cover`} />
  ) : (
    <span className={`${className} grid place-items-center bg-accent-soft`}>{avatar}</span>
  );
}
