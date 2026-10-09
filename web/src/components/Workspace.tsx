"use client";

import type { EditorView } from "@uiw/react-codemirror";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useRef, useState } from "react";
import type { FileKind, Files } from "@/content/types";
import type { Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionary";
import { play } from "@/lib/feedback";
import { buildPreview } from "@/lib/runner";
import { useSettings } from "@/lib/settings";
import { CodeEditor, insertAtCursor, insertPair } from "./CodeEditor";
import { CloseIcon, ExpandIcon, ShrinkIcon } from "./Icons";
import { Press } from "./ui";

const fileNames: Record<FileKind, string> = { html: "index.html", css: "style.css", js: "script.js" };
const quickTags: Record<FileKind, [string, string, string][]> = {
  html: [
    ["<h1>", "<h1>", "</h1>"],
    ["<p>", "<p>", "</p>"],
    ["<div>", "<div>", "</div>"],
    ["<a>", '<a href="">', "</a>"],
    ["<img>", '<img src="" alt="', '">'],
    ["<ul>", "<ul>\n  <li>", "</li>\n</ul>"],
    ["<li>", "<li>", "</li>"],
  ],
  css: [
    ["{ }", " {\n  ", "\n}"],
    ["color", "color: ", ";"],
    ["flex", "display: flex;\n", ""],
    ["px", "", "px"],
  ],
  js: [
    ["=>", "() => {\n  ", "\n}"],
    ["fn", "function name() {\n  ", "\n}"],
    ["log", "console.log(", ");"],
    ["const", "const ", " = "],
    ["if", "if (", ") {\n\n}"],
  ],
};

const symbols = ["Tab", "<", ">", "/", "=", '"', "{", "}", "(", ")", ";", ":", ".", "#", "'", "[", "]"];

type Pane = "code" | "result" | "side";

/**
 * The full-screen coding surface used by lessons and the playground:
 * editor, live result and an optional side panel (tasks, hints).
 * Wide screens show all three side by side; phones switch between them with tabs.
 */
export function Workspace({
  locale,
  title,
  kinds,
  files,
  onChange,
  onClose,
  side,
  sideLabel,
  sideBadge,
  actions,
  forcePane,
}: {
  locale: Locale;
  title: string;
  kinds: FileKind[];
  files: Files;
  onChange: (kind: FileKind, value: string) => void;
  onClose: () => void;
  side?: React.ReactNode;
  sideLabel?: string;
  sideBadge?: string;
  actions?: React.ReactNode;
  /** Lets the parent switch the phone tab, e.g. to show tasks after a check. */
  forcePane?: { pane: Pane; at: number };
}) {
  const dict = getDictionary(locale).lesson;
  const { editorFontSize } = useSettings();
  const [active, setActive] = useState<FileKind>(kinds[0]);
  const [pane, setPane] = useState<Pane>("code");
  // The preview reports console output through postMessage, tagged with this token.
  const [token] = useState(() => Math.random().toString(36).slice(2));
  const [preview, setPreview] = useState(() => buildPreview(files, { token }));
  const [logs, setLogs] = useState<{ type: string; text: string }[]>([]);
  const frame = useRef<HTMLIFrameElement | null>(null);
  const showConsole = kinds.includes("js");
  const [full, setFull] = useState(false);
  const view = useRef<EditorView | null>(null);

  useEffect(() => {
    const id = window.setTimeout(() => {
      setLogs([]);
      setPreview(buildPreview(files, { token }));
    }, 350);
    return () => window.clearTimeout(id);
  }, [files, token]);

  useEffect(() => {
    const onMessage = (e: MessageEvent) => {
      if (e.source !== frame.current?.contentWindow || e.data?.cm !== token || e.data.type === "done") return;
      setLogs((l) => [...l.slice(-49), { type: e.data.type, text: e.data.text }]);
    };
    window.addEventListener("message", onMessage);
    return () => window.removeEventListener("message", onMessage);
  }, [token]);

  useEffect(() => {
    if (forcePane) setPane(forcePane.pane);
  }, [forcePane]);

  useEffect(() => {
    const onChange = () => setFull(!!document.fullscreenElement);
    document.addEventListener("fullscreenchange", onChange);
    return () => document.removeEventListener("fullscreenchange", onChange);
  }, []);

  function toggleFull() {
    if (document.fullscreenElement) document.exitFullscreen().catch(() => {});
    else document.documentElement.requestFullscreen?.().catch(() => {});
  }

  const panes: { key: Pane; label: string; badge?: string }[] = [
    { key: "code", label: dict.code },
    { key: "result", label: dict.result },
    ...(side ? [{ key: "side" as Pane, label: sideLabel ?? dict.tasks, badge: sideBadge }] : []),
  ];

  return (
    <div className="fixed inset-0 z-40 flex flex-col bg-code-bg text-code-fg" style={{ paddingTop: "env(safe-area-inset-top, 0px)" }}>
      {/* Top bar */}
      <div className="flex items-center gap-2 px-3 py-2">
        <Press onClick={onClose} aria-label={dict.close} className="grid size-10 place-items-center rounded-xl text-[#93a5a7] hover:bg-white/5">
          <CloseIcon className="size-6" />
        </Press>
        <span className="min-w-0 flex-1 truncate font-display font-semibold">{title}</span>
        <Press onClick={toggleFull} aria-label={full ? dict.exitFullscreen : dict.fullscreen} className="grid size-10 place-items-center rounded-xl text-[#93a5a7] hover:bg-white/5">
          {full ? <ShrinkIcon className="size-5" /> : <ExpandIcon className="size-5" />}
        </Press>
      </div>

      {/* Phone pane switcher */}
      <div className="mx-3 mb-2 flex rounded-2xl bg-white/5 p-1 lg:hidden" role="tablist">
        {panes.map((p) => (
          <button
            key={p.key}
            type="button"
            role="tab"
            aria-selected={pane === p.key}
            onClick={() => {
              play("tap");
              setPane(p.key);
            }}
            className={`relative flex-1 rounded-xl py-2 text-sm font-semibold ${pane === p.key ? "text-[#0f1b1e]" : "text-[#93a5a7]"}`}
          >
            {pane === p.key && <motion.span layoutId="pane-pill" className="absolute inset-0 rounded-xl bg-white" transition={{ type: "spring", stiffness: 500, damping: 38 }} />}
            <span className="relative">
              {p.label}
              {p.badge && <span className="ms-1.5 rounded-full bg-saffron px-1.5 text-xs text-ink">{p.badge}</span>}
            </span>
          </button>
        ))}
      </div>

      <div
        className={`relative flex min-h-0 flex-1 lg:grid lg:gap-3 lg:px-3 lg:pb-3 ${
          side ? "lg:grid-cols-[minmax(280px,340px)_minmax(0,1.2fr)_minmax(0,1fr)]" : "lg:grid-cols-[minmax(0,1.2fr)_minmax(0,1fr)]"
        }`}
      >
        {/* Side panel (tasks / hints) */}
        {side && (
          <aside
            className={`${pane === "side" ? "flex" : "hidden"} min-h-0 flex-1 flex-col overflow-y-auto bg-surface p-4 text-ink lg:flex lg:rounded-2xl`}
          >
            {side}
          </aside>
        )}

        {/* Editor */}
        <section className={`${pane === "code" ? "flex" : "hidden"} min-h-0 min-w-0 flex-1 flex-col lg:flex lg:overflow-hidden lg:rounded-2xl lg:border lg:border-white/10`}>
          <div className="flex gap-1 px-2 pt-1" dir="ltr">
            {kinds.map((kind) => (
              <button
                key={kind}
                type="button"
                onClick={() => setActive(kind)}
                className={`relative rounded-t-lg px-3 py-1.5 font-mono text-xs ${active === kind ? "text-code-fg" : "text-[#6c8589]"}`}
              >
                {active === kind && <motion.span layoutId="file-tab" className="absolute inset-0 rounded-t-lg bg-white/[0.07]" />}
                <span className="relative">{fileNames[kind]}</span>
              </button>
            ))}
          </div>
          <div className="min-h-0 flex-1 overflow-hidden" dir="ltr">
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={active}
                className="h-full"
                initial={{ opacity: 0, x: 12 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -12 }}
                transition={{ duration: 0.15 }}
              >
                <CodeEditor
                  kind={active}
                  value={files[active] ?? ""}
                  onChange={(v) => onChange(active, v)}
                  label={fileNames[active]}
                  fontSize={editorFontSize}
                  onReady={(v) => (view.current = v)}
                />
              </motion.div>
            </AnimatePresence>
          </div>
          {/* Quick tags and the symbols that are hard to reach on a phone keyboard */}
          <div className="no-scrollbar flex gap-1.5 overflow-x-auto border-t border-white/10 px-2 pt-2 lg:hidden" dir="ltr">
            {quickTags[active].map(([label, before, after]) => (
              <button
                key={label}
                type="button"
                onMouseDown={(e) => e.preventDefault()}
                onClick={() => {
                  play("tap");
                  insertPair(view.current, before, after);
                }}
                className="flex-none rounded-lg border border-[#8b5cf6]/50 bg-[#8b5cf6]/15 px-2.5 py-1.5 font-mono text-sm text-[#c4b5fd] active:bg-[#8b5cf6]/30"
              >
                {label}
              </button>
            ))}
          </div>
          <div className="no-scrollbar flex gap-1.5 overflow-x-auto px-2 py-2 lg:hidden" dir="ltr">
            {symbols.map((s) => (
              <button
                key={s}
                type="button"
                onMouseDown={(e) => e.preventDefault()}
                onClick={() => {
                  play("tap");
                  insertAtCursor(view.current, s);
                }}
                className={`flex-none rounded-lg bg-white/[0.08] py-1.5 font-mono text-base active:bg-white/20 ${s === "Tab" ? "px-3 text-saffron" : "min-w-10 px-2"}`}
              >
                {s}
              </button>
            ))}
          </div>
        </section>

        {/* Result */}
        <section className={`${pane === "result" ? "flex" : "hidden"} min-h-0 flex-1 flex-col overflow-hidden bg-white lg:flex lg:rounded-2xl`}>
          <div className="flex items-center gap-1.5 border-b border-black/5 bg-[#f3f6f6] px-3 py-2" dir="ltr">
            <span className="size-3 rounded-full bg-[#e5484d]" />
            <span className="size-3 rounded-full bg-[#f2a322]" />
            <span className="size-3 rounded-full bg-[#2e9e5b]" />
            <span className="ms-2 font-mono text-xs text-[#5b6b6e]">{dict.result}</span>
          </div>
          <iframe ref={frame} title={dict.result} sandbox="allow-scripts" srcDoc={preview} className="w-full flex-1 bg-white" />
          {showConsole && (
            <div className="flex max-h-[40%] min-h-28 flex-col border-t border-white/10 bg-[#070b1c]" dir="ltr">
              <span className="px-3 pt-2 font-mono text-[11px] uppercase tracking-wider text-[#6c7bb0]">Console</span>
              <pre className="flex-1 overflow-auto px-3 py-2 font-mono text-[13px] leading-relaxed">
                {logs.length === 0 ? (
                  <span className="text-[#4c5a8a]">{"// console.log() output appears here"}</span>
                ) : (
                  logs.map((l, i) => (
                    <div key={i} className={l.type === "error" ? "text-[#f87171]" : l.type === "warn" ? "text-[#fbbf24]" : "text-[#a7f3d0]"}>
                      {"> "}
                      {l.text}
                    </div>
                  ))
                )}
              </pre>
            </div>
          )}
        </section>
      </div>

      {/* Bottom actions */}
      {actions && (
        <div
          className="flex items-center gap-2 border-t border-white/10 bg-code-bg px-3 pt-2.5"
          style={{ paddingBottom: "calc(env(safe-area-inset-bottom, 0px) + 10px)" }}
        >
          {actions}
        </div>
      )}
    </div>
  );
}
