"use client";

import CodeMirror from "@uiw/react-codemirror";
import { html } from "@codemirror/lang-html";
import { css } from "@codemirror/lang-css";
import { javascript } from "@codemirror/lang-javascript";
import { keymap } from "@codemirror/view";
import { Prec } from "@codemirror/state";
import { abbreviationTracker, EmmetKnownSyntax, expandAbbreviation } from "@emmetio/codemirror6-plugin";
import { useMemo } from "react";
import type { FileKind } from "@/content/types";

function extensionsFor(kind: FileKind) {
  const emmetTab = Prec.highest(keymap.of([{ key: "Tab", run: expandAbbreviation }]));
  switch (kind) {
    case "html":
      return [html(), abbreviationTracker(), emmetTab];
    case "css":
      return [css(), abbreviationTracker({ syntax: EmmetKnownSyntax.css }), emmetTab];
    case "js":
      return [javascript()];
  }
}

export function CodeEditor({
  kind,
  value,
  onChange,
  label,
}: {
  kind: FileKind;
  value: string;
  onChange: (value: string) => void;
  label: string;
}) {
  const extensions = useMemo(() => extensionsFor(kind), [kind]);
  return (
    <CodeMirror
      value={value}
      onChange={onChange}
      extensions={extensions}
      theme="dark"
      height="100%"
      aria-label={label}
      basicSetup={{ lineNumbers: true, foldGutter: false, highlightActiveLine: true, autocompletion: true }}
      className="h-full text-[0.92rem]"
    />
  );
}
