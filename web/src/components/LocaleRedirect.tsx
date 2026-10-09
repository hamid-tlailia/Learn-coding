"use client";

import Link from "next/link";
import { useEffect } from "react";
import { LOCALE_KEY } from "@/lib/keys";

export function LocaleRedirect() {
  useEffect(() => {
    let locale = "ar";
    try {
      if (window.localStorage.getItem(LOCALE_KEY) === "en") locale = "en";
    } catch {
      // No storage: default to Arabic.
    }
    window.location.replace(`/${locale}/`);
  }, []);

  return (
    <p style={{ padding: 24, textAlign: "center" }}>
      <Link href="/ar/">العربية</Link> · <Link href="/en/">English</Link>
    </p>
  );
}
