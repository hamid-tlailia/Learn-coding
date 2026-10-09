"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import type { FileKind, Files } from "@/content/types";
import type { Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionary";
import { useMounted } from "./ui";
import { Workspace } from "./Workspace";

const KEY = "satr-playground-v1";

const starter: Files = {
  html: '<main class="card">\n  <h1>Hello, Satr 👋</h1>\n  <p>Edit me and watch the result.</p>\n  <button id="btn">Click me</button>\n</main>\n',
  css: "body {\n  font-family: system-ui;\n  display: grid;\n  place-items: center;\n  min-height: 90vh;\n  background: #f3f6f6;\n}\n\n.card {\n  background: white;\n  padding: 24px;\n  border-radius: 20px;\n  box-shadow: 0 10px 30px #0001;\n}\n\nbutton {\n  background: #0e8c7f;\n  color: white;\n  border: 0;\n  padding: 10px 18px;\n  border-radius: 12px;\n}\n",
  js: 'const btn = document.querySelector("#btn");\nlet clicks = 0;\n\nbtn.addEventListener("click", () => {\n  clicks++;\n  btn.textContent = `Clicked ${clicks} times`;\n});\n',
};

export function Playground({ locale }: { locale: Locale }) {
  const mounted = useMounted();
  const router = useRouter();
  const dict = getDictionary(locale);
  const [files, setFiles] = useState<Files>(starter);

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
