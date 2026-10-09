export const locales = ["ar", "en"] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = "ar";

export function isLocale(value: string): value is Locale {
  return (locales as readonly string[]).includes(value);
}

export function dirOf(locale: Locale): "rtl" | "ltr" {
  return locale === "ar" ? "rtl" : "ltr";
}

/** Bilingual text: every learner-facing string in the content exists in both languages. */
export type L = { ar: string; en: string };

export function t(text: L, locale: Locale): string {
  return text[locale];
}
