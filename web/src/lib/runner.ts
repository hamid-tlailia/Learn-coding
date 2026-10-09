import type { CheckInput, Files, Task } from "@/content/types";

/** Builds the document shown in the sandboxed preview iframe. */
export function buildPreview(files: Files): string {
  return `<!doctype html><html><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<style>body{font-family:system-ui,sans-serif;padding:16px;margin:0;line-height:1.5}img{max-width:100%}</style>
<style>${files.css ?? ""}</style></head><body>${files.html ?? ""}<script>${(files.js ?? "").replace(/<\/script/gi, "<\\/script")}</script></body></html>`;
}

/** Runs every task check against the learner's code. Checks never see the live iframe. */
export function runChecks(tasks: Task[], files: Files): Record<string, boolean> {
  const doc = new DOMParser().parseFromString(files.html ?? "", "text/html");
  const input: CheckInput = { files, doc, css: files.css ?? "" };
  const results: Record<string, boolean> = {};
  for (const task of tasks) {
    try {
      results[task.id] = task.test(input);
    } catch {
      results[task.id] = false;
    }
  }
  return results;
}
