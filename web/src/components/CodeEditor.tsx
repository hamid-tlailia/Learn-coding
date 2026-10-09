"use client";

import CodeMirror, { EditorView } from "@uiw/react-codemirror";
import { html } from "@codemirror/lang-html";
import { css } from "@codemirror/lang-css";
import { javascript } from "@codemirror/lang-javascript";
import { keymap } from "@codemirror/view";
import { Prec } from "@codemirror/state";
import { abbreviationTracker, EmmetKnownSyntax, expandAbbreviation } from "@emmetio/codemirror6-plugin";
import { useMemo } from "react";
import type { FileKind } from "@/content/types";

function extensionsFor(kind: FileKind, fontSize: number) {
  const emmetTab = Prec.highest(keymap.of([{ key: "Tab", run: expandAbbreviation }]));
  const look = EditorView.theme({
    "&": { fontSize: `${fontSize}px`, height: "100%" },
    ".cm-content": { padding: "12px 0" },
    ".cm-gutters": { border: "none", color: "#4c6468" },
    ".cm-activeLine": { backgroundColor: "rgba(255,255,255,0.04)" },
    ".cm-activeLineGutter": { backgroundColor: "transparent", color: "#93a5a7" },
  });
  switch (kind) {
    case "html":
      return [html(), abbreviationTracker(), emmetTab, look, EditorView.lineWrapping];
    case "css":
      return [css(), abbreviationTracker({ syntax: EmmetKnownSyntax.css }), emmetTab, look, EditorView.lineWrapping];
    case "js":
      return [javascript(), look, EditorView.lineWrapping];
  }
}

/** Inserts text at the cursor; "Tab" expands an Emmet abbreviation or indents. */
export function insertAtCursor(view: EditorView | null, text: string) {
  if (!view) return;
  if (text === "Tab") {
    if (!expandAbbreviation(view)) view.dispatch(view.state.replaceSelection("  "));
  } else {
    view.dispatch(view.state.replaceSelection(text));
  }
  view.focus();
}

/** Wraps the cursor with `before` and `after`, e.g. a tag pair, leaving the cursor between them. */
export function insertPair(view: EditorView | null, before: string, after: string) {
  if (!view) return;
  const { from, to } = view.state.selection.main;
  const inner = view.state.sliceDoc(from, to);
  view.dispatch({
    changes: { from, to, insert: before + inner + after },
    selection: { anchor: from + before.length + inner.length },
  });
  view.focus();
}

export function CodeEditor({
  kind,
  value,
  onChange,
  label,
  fontSize,
  onReady,
}: {
  kind: FileKind;
  value: string;
  onChange: (value: string) => void;
  label: string;
  fontSize: number;
  onReady?: (view: EditorView) => void;
}) {
  const extensions = useMemo(() => extensionsFor(kind, fontSize), [kind, fontSize]);
  return (
    <CodeMirror
      value={value}
      onChange={onChange}
      extensions={extensions}
      theme="dark"
      height="100%"
      aria-label={label}
      onCreateEditor={(view) => onReady?.(view)}
      basicSetup={{ lineNumbers: true, foldGutter: false, highlightActiveLine: true, autocompletion: true }}
      className="h-full"
    />
  );
}
