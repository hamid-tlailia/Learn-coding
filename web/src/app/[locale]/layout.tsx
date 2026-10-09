import type { Metadata } from "next";
import { IBM_Plex_Sans_Arabic, JetBrains_Mono, Readex_Pro } from "next/font/google";
import { notFound } from "next/navigation";
import { Header } from "@/components/Header";
import { dirOf, isLocale, locales } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionary";
import "../globals.css";

const readex = Readex_Pro({ subsets: ["arabic", "latin"], weight: ["400", "600", "700"], variable: "--font-readex" });
const plexArabic = IBM_Plex_Sans_Arabic({ subsets: ["arabic", "latin"], weight: ["400", "500", "600"], variable: "--font-plex-arabic" });
const jetbrains = JetBrains_Mono({ subsets: ["latin"], weight: ["400", "600"], variable: "--font-jetbrains" });

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const dict = getDictionary(locale);
  return { title: { default: `${dict.brand} · ${dict.tagline}`, template: `%s · ${dict.brand}` }, description: dict.hero.subtitle };
}

export default async function LocaleLayout({ children, params }: { children: React.ReactNode; params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const dict = getDictionary(locale);

  return (
    <html lang={locale} dir={dirOf(locale)} className={`${readex.variable} ${plexArabic.variable} ${jetbrains.variable}`}>
      <body className="flex min-h-screen flex-col antialiased">
        <Header locale={locale} />
        <main className="flex-1">{children}</main>
        <footer className="border-t border-line px-4 py-6 text-center text-sm text-muted">{dict.footer}</footer>
      </body>
    </html>
  );
}
