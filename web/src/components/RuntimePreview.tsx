"use client";

import { useEffect, useState } from "react";
import type { Files, Runtime } from "@/content/types";
import { buildPreview, compile } from "@/lib/runner";

/** A sandboxed live preview that compiles JSX first when the lesson needs it. */
export function RuntimePreview({ files, runtime, title, className }: { files: Files; runtime?: Runtime; title: string; className?: string }) {
  const [doc, setDoc] = useState(() => (runtime ? "" : buildPreview(files)));
  useEffect(() => {
    let live = true;
    compile(files, runtime).then((f) => live && setDoc(buildPreview(f, { runtime })));
    return () => {
      live = false;
    };
  }, [files, runtime]);
  return <iframe title={title} sandbox="allow-scripts allow-forms" srcDoc={doc} className={className} />;
}
