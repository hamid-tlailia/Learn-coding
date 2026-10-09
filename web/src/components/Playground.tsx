"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import type { FileKind, Files } from "@/content/types";
import type { Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionary";
import Link from "next/link";
import { canUseEditor, useProgress } from "@/lib/progress";
import { LockIcon } from "./Icons";
import { useMounted } from "./ui";
import { Workspace } from "./Workspace";

const KEY = "satr-playground-v1";

const starter: Files = {
  html: '<main class="card">\n  <h1>Hello, Code Master 👋</h1>\n  <p>Edit me and watch the result.</p>\n  <button id="btn">Click me</button>\n</main>\n',
  css: "body {\n  font-family: system-ui;\n  display: grid;\n  place-items: center;\n  min-height: 90vh;\n  background: #f3f6f6;\n}\n\n.card {\n  background: white;\n  padding: 24px;\n  border-radius: 20px;\n  box-shadow: 0 10px 30px #0001;\n}\n\nbutton {\n  background: #0e8c7f;\n  color: white;\n  border: 0;\n  padding: 10px 18px;\n  border-radius: 12px;\n}\n",
  js: 'const btn = document.querySelector("#btn");\nlet clicks = 0;\n\nbtn.addEventListener("click", () => {\n  clicks++;\n  btn.textContent = `Clicked ${clicks} times`;\n});\n',
};

export function Playground({ locale }: { locale: Locale }) {
  const mounted = useMounted();
  const router = useRouter();
  const dict = getDictionary(locale);
  const [files, setFiles] = useState<Files>(starter);
  const progress = useProgress();

  useEffect(() => {
    try {
      const saved = window.localStorage.getItem(KEY);
      if (saved) setFiles(JSON.parse(saved));
    } catch {
      // Start from the sample.
    }
  }, []);

  useEffect(() => {
    const id = window.setTimeout(() => {
      try {
        window.localStorage.setItem(KEY, JSON.stringify(files));
      } catch {
        // Saving is a convenience.
      }
    }, 500);
    return () => window.clearTimeout(id);
  }, [files]);

  if (!mounted) return <div className="min-h-dvh bg-code-bg" />;

  if (!canUseEditor(progress)) {
    return (
      <div className="grid min-h-dvh place-items-center bg-paper p-6 text-center">
        <div className="flex max-w-sm flex-col items-center gap-4">
          <span className="grid size-20 place-items-center rounded-3xl bg-surface-2 text-muted">
            <LockIcon className="size-10" />
          </span>
          <p className="text-lg">{dict.practice.locked}</p>
          <Link href={`/${locale}/learn/`} className="btn-grad rounded-2xl px-6 py-3 font-display font-bold">
            {dict.practice.toPath}
          </Link>
        </div>
      </div>
    );
  }

  return (
    <Workspace
      locale={locale}
      title={dict.practice.playground}
      kinds={["html", "css", "js"]}
      files={files}
      onChange={(kind: FileKind, v: string) => setFiles((f) => ({ ...f, [kind]: v }))}
      onClose={() => router.push(`/${locale}/practice/`)}
    />
  );
}
