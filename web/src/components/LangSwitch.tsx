"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { locales, type Locale } from "@/i18n/config";

const labels: Record<Locale, string> = { ar: "عربي", en: "EN" };

export function LangSwitch({ locale }: { locale: Locale }) {
  const pathname = usePathname();
  const rest = pathname.split("/").slice(2).join("/");
  return (
    <div className="inline-flex overflow-hidden rounded-full border border-line text-sm" role="group" aria-label="Language">
      {locales.map((l) => (
        <Link
          key={l}
          href={`/${l}${rest ? `/${rest}` : ""}`}
          aria-current={l === locale ? "true" : undefined}
          className={`px-3 py-1 ${l === locale ? "bg-ink text-paper" : "text-muted hover:text-ink"}`}
        >
          {labels[l]}
        </Link>
      ))}
    </div>
  );
}
