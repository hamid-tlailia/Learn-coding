import type { Metadata, Viewport } from "next";
import { IBM_Plex_Sans_Arabic, JetBrains_Mono, Readex_Pro } from "next/font/google";
import { notFound } from "next/navigation";
import { AppShell } from "@/components/AppShell";
import { Loader } from "@/components/Loader";
import { NativeBridge } from "@/components/NativeBridge";
import { ThemeScript } from "@/components/ThemeScript";
import { dirOf, isLocale, locales } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionary";
import "../globals.css";

const readex = Readex_Pro({ subsets: ["arabic", "latin"], weight: ["400", "600", "700"], variable: "--font-readex" });
const plexArabic = IBM_Plex_Sans_Arabic({ subsets: ["arabic", "latin"], weight: ["400", "500", "600"], variable: "--font-plex-arabic" });
const jetbrains = JetBrains_Mono({ subsets: ["latin"], weight: ["400", "600"], variable: "--font-jetbrains" });

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f3f6f6" },
    { media: "(prefers-color-scheme: dark)", color: "#0a1214" },
  ],
};

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const dict = getDictionary(locale);
  return { title: { default: `${dict.brand} · ${dict.tagline}`, template: `%s · ${dict.brand}` }, description: dict.description };
}

export default async function LocaleLayout({ children, params }: { children: React.ReactNode; params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const dict = getDictionary(locale);

  return (
    <html
      lang={locale}
      dir={dirOf(locale)}
      className={`${readex.variable} ${plexArabic.variable} ${jetbrains.variable}`}
      suppressHydrationWarning
    >
      <head>
        <ThemeScript />
      </head>
      <body className="antialiased" style={{ paddingTop: "env(safe-area-inset-top, 0px)" }}>
        <Loader label={dict.onboarding.loading} />
        <NativeBridge />
        <AppShell locale={locale}>{children}</AppShell>
      </body>
    </html>
  );
}
