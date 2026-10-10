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
import { Onboarding } from "./Onboarding";
import { useMounted } from "./ui";

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
  const immersive = /^\/learn\/[^/]+\/[^/]+$/.test(rest) || rest === "/playground" || rest === "/challenge" || rest === "/review";
  const active = tabs.find((t) => t.href && rest.startsWith(t.href))?.key ?? (rest === "" ? "home" : null);

  const mounted = useMounted();
  const { onboarded } = useSettings();

  if (immersive) return <>{children}</>;
  // First launch: questions before anything else.
  if (mounted && !onboarded) return <Onboarding locale={locale} />;

  return (
    <div className="relative min-h-full">
      <Backdrop />

      {/* Side rail on wide screens */}
      <motion.nav
        layoutRoot
        aria-label="Main"
        className="fixed inset-y-0 start-0 z-30 hidden w-24 flex-col items-center gap-2 border-e border-line bg-surface/80 py-6 backdrop-blur-xl lg:flex"
      >
        <Link href={`/${locale}/`} className="mb-6 text-ink">
          <Logo withName={false} />
        </Link>
        {tabs.map(({ key, href, Icon }) => (
          <Link
            key={key}
            href={`/${locale}${href}/`}
            onClick={() => play("tap")}
            className={`flex w-20 flex-col items-center gap-1 py-1.5 text-xs font-bold transition-colors ${
              active === key ? "text-accent" : "text-muted hover:text-ink"
            }`}
          >
            <span className="relative grid h-10 w-14 place-items-center">
              {active === key && (
                <motion.span layoutId="rail-active" className="btn-grad absolute inset-0 rounded-2xl" transition={{ type: "spring", stiffness: 500, damping: 38 }} />
              )}
              <Icon className={`relative size-6 ${active === key ? "text-white" : ""}`} />
            </span>
            <span className={active === key ? "text-grad" : ""}>{dict.tabs[key]}</span>
          </Link>
        ))}
      </motion.nav>

      <div className="relative z-10 pb-28 lg:ps-24 lg:pb-10">{children}</div>

      {/* Bottom tab bar on phones */}
      <motion.nav
        layoutRoot
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
                className={`flex flex-col items-center gap-1 py-1 text-[11px] font-bold ${active === key ? "text-accent" : "text-muted"}`}
              >
                <motion.span whileTap={{ scale: 0.85 }} className="relative grid h-8 w-14 place-items-center">
                  {active === key && (
                    <motion.span layoutId="tab-active" className="btn-grad absolute inset-0 rounded-full" transition={{ type: "spring", stiffness: 500, damping: 38 }} />
                  )}
                  <Icon className={`relative size-[22px] ${active === key ? "text-white" : ""}`} />
                </motion.span>
                <span className={active === key ? "text-grad" : ""}>{dict.tabs[key]}</span>
              </Link>
            </li>
          ))}
        </ul>
      </motion.nav>
    </div>
  );
}
