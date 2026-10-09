import Link from "next/link";
import type { Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionary";
import { Logo } from "./Logo";
import { LangSwitch } from "./LangSwitch";
import { StatsPills } from "./StatsPills";

export function Header({ locale }: { locale: Locale }) {
  const dict = getDictionary(locale);
  return (
    <header className="sticky top-0 z-20 border-b border-line bg-paper/90 backdrop-blur">
      <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-3 px-4 py-3">
        <div className="flex items-center gap-6">
          <Link href={`/${locale}`} className="text-ink">
            <Logo locale={locale} />
          </Link>
          <nav className="text-sm">
            <Link href={`/${locale}/learn`} className="font-medium text-muted hover:text-ink">
              {dict.nav.learn}
            </Link>
          </nav>
        </div>
        <div className="flex items-center gap-2">
          <StatsPills labels={dict.stats} />
          <LangSwitch locale={locale} />
        </div>
      </div>
    </header>
  );
}
