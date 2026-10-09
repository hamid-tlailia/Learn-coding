import type { Locale } from "@/i18n/config";

/** The Satr wordmark: the Arabic word followed by a saffron typing cursor. */
export function Logo({ locale, size = "md" }: { locale: Locale; size?: "md" | "xl" }) {
  const big = size === "xl";
  return (
    <span
      className={`inline-flex items-end gap-1 font-display font-bold leading-none ${big ? "text-7xl sm:text-8xl" : "text-2xl"}`}
      aria-label={locale === "ar" ? "سطر" : "Satr"}
    >
      <span aria-hidden="true">سطر</span>
      <span
        aria-hidden="true"
        className={`cursor-blink inline-block rounded-sm bg-saffron ${big ? "mb-3 h-2.5 w-9" : "mb-1 h-1 w-2.5"}`}
      />
    </span>
  );
}
