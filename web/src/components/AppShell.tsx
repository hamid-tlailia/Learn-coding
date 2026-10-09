"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "motion/react";
import { useEffect } from "react";
import type { Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionary";
import { play } from "@/lib/feedback";
import { useSettings } from "@/lib/settings";
import { Backdrop } from "./Backdrop";
import { CodeIcon, GearIcon, HomeIcon, PathIcon, UserIcon } from "./Icons";
import { Logo } from "./Logo";

const tabs = [
  { key: "home", href: "", Icon: HomeIcon },
  { key: "learn", href: "/learn", Icon: PathIcon },
  { key: "practice", href: "/practice", Icon: CodeIcon },
  { key: "profile", href: "/profile", Icon: UserIcon },
  { key: "settings", href: "/settings", Icon: GearIcon },
] as const;

/** Keeps <html data-theme / data-accent> in step with settings and the system theme. */
function useThemeSync() {
  const { theme, accent } = useSettings();
  useEffect(() => {
    const root = document.documentElement;
    const media = window.matchMedia("(prefers-color-scheme: dark)");
    const apply = () => {
      root.dataset.theme = theme === "dark" || (theme === "system" && media.matches) ? "dark" : "light";
      root.dataset.accent = accent;
    };
    apply();
    media.addEventListener("change", apply);
    return () => media.removeEventListener("change", apply);
  }, [theme, accent]);
}

export function AppShell({ locale, children }: { locale: Locale; children: React.ReactNode }) {
  useThemeSync();
  const pathname = usePathname();
  const dict = getDictionary(locale);
  const rest = pathname.replace(/^\/(ar|en)/, "").replace(/\/$/, "");
  // Lessons, exams and the playground take the whole screen: no tab bar.
  const immersive = /^\/learn\/[^/]+\/[^/]+$/.test(rest) || rest === "/playground" || rest === "/challenge";
  const active = tabs.find((t) => t.href && rest.startsWith(t.href))?.key ?? (rest === "" ? "home" : null);

  if (immersive) return <>{children}</>;

  return (
    <div className="relative min-h-full">
      <Backdrop />

      {/* Side rail on wide screens */}
      <nav
        aria-label="Main"
        className="fixed inset-y-0 start-0 z-30 hidden w-24 flex-col items-center gap-2 border-e border-line bg-surface/80 py-6 backdrop-blur-xl lg:flex"
      >
        <Link href={`/${locale}/`} className="mb-6 text-ink">
          <Logo locale={locale} />
        </Link>
        {tabs.map(({ key, href, Icon }) => (
          <Link
            key={key}
            href={`/${locale}${href}/`}
            onClick={() => play("tap")}
            className={`relative flex w-20 flex-col items-center gap-1 rounded-2xl py-2.5 text-xs font-semibold transition-colors ${
              active === key ? "text-accent" : "text-muted hover:text-ink"
            }`}
          >
            {active === key && (
              <motion.span layoutId="rail-active" className="absolute inset-0 rounded-2xl bg-accent-soft" transition={{ type: "spring", stiffness: 500, damping: 38 }} />
            )}
            <Icon className="relative size-6" />
            <span className="relative">{dict.tabs[key]}</span>
          </Link>
        ))}
      </nav>

      <div className="relative z-10 pb-28 lg:ps-24 lg:pb-10">{children}</div>

      {/* Bottom tab bar on phones */}
      <nav
        aria-label="Main"
        className="fixed inset-x-0 bottom-0 z-30 border-t border-line bg-surface/85 px-2 pt-1.5 backdrop-blur-xl lg:hidden"
        style={{ paddingBottom: "calc(env(safe-area-inset-bottom, 0px) + 6px)" }}
      >
        <ul className="mx-auto flex max-w-lg justify-between">
          {tabs.map(({ key, href, Icon }) => (
            <li key={key} className="flex-1">
              <Link
                href={`/${locale}${href}/`}
                onClick={() => play("tap")}
                className={`relative flex flex-col items-center gap-0.5 rounded-2xl py-1.5 text-[11px] font-semibold ${
                  active === key ? "text-accent" : "text-muted"
                }`}
              >
                {active === key && (
                  <motion.span layoutId="tab-active" className="absolute inset-x-2 inset-y-0 rounded-2xl bg-accent-soft" transition={{ type: "spring", stiffness: 500, damping: 38 }} />
                )}
                <motion.span whileTap={{ scale: 0.85 }} className="relative">
                  <Icon className="size-6" />
                </motion.span>
                <span className="relative">{dict.tabs[key]}</span>
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
}
