"use client";

import { useEffect } from "react";
import { LOCALE_KEY } from "@/lib/keys";
import { LoaderMark } from "./Loader";

/** The app's entry page: shows the launch screen while it picks the saved language. */
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
    <div className="fixed inset-0 grid place-items-center bg-paper">
      <LoaderMark />
    </div>
  );
}
