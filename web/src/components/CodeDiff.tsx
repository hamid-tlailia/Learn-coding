import type { FileKind, Files } from "@/content/types";

type Line = { kind: "same" | "wrong" | "right"; text: string };

/** Line diff by longest common subsequence; indentation and trailing spaces don't count as differences. */
export function diffLines(mine: string, right: string): Line[] {
  const a = mine.replace(/\s+$/, "").split("\n");
  const b = right.replace(/\s+$/, "").split("\n");
  const norm = (s: string) => s.trim().replace(/\s+/g, " ");
  const n = a.length;
  const m = b.length;
  const lcs = Array.from({ length: n + 1 }, () => new Array<number>(m + 1).fill(0));
  for (let i = n - 1; i >= 0; i--) {
    for (let j = m - 1; j >= 0; j--) {
      lcs[i][j] = norm(a[i]) === norm(b[j]) ? lcs[i + 1][j + 1] + 1 : Math.max(lcs[i + 1][j], lcs[i][j + 1]);
    }
  }
  const out: Line[] = [];
  let i = 0;
  let j = 0;
  while (i < n || j < m) {
    if (i < n && j < m && norm(a[i]) === norm(b[j])) {
      out.push({ kind: "same", text: b[j] });
      i++;
      j++;
    } else if (i < n && (j >= m || lcs[i + 1][j] >= lcs[i][j + 1])) {
      if (a[i].trim()) out.push({ kind: "wrong", text: a[i] });
      i++;
    } else {
      if (b[j].trim()) out.push({ kind: "right", text: b[j] });
      j++;
    }
  }
  return out;
}

const style = {
  same: "text-code-fg/60",
  wrong: "bg-coral/20 text-[#ffb4b6]",
  right: "bg-ok/20 text-[#a7f3c9]",
};
const mark = { same: " ", wrong: "−", right: "+" };

/**
 * The learner's code next to the solution, line by line: red lines are theirs and wrong or extra,
 * green lines are what the solution has instead.
 */
export function CodeDiff({
  kinds,
  mine,
  solution,
  names,
  labels,
  onUse,
  onKeep,
}: {
  kinds: FileKind[];
  mine: Files;
  solution: Files;
  names: Record<FileKind, string>;
  labels: { title: string; wrong: string; right: string; same: string; use: string; keep: string };
  onUse: () => void;
  onKeep: () => void;
}) {
  const changed = kinds.filter((k) => diffLines(mine[k] ?? "", solution[k] ?? "").some((l) => l.kind !== "same"));
  return (
    <div className="flex h-full flex-col">
      <div className="flex flex-col gap-2 border-b border-white/10 p-3 text-code-fg" dir="auto">
        <h2 className="font-bold">{labels.title}</h2>
        <div className="flex flex-wrap gap-2 text-xs">
          <span className="rounded-md bg-coral/20 px-2 py-1 text-[#ffb4b6]">− {labels.wrong}</span>
          <span className="rounded-md bg-ok/20 px-2 py-1 text-[#a7f3c9]">+ {labels.right}</span>
        </div>
      </div>
      <div className="min-h-0 flex-1 overflow-auto py-2" dir="ltr">
        {(changed.length ? changed : kinds).map((k) => (
          <div key={k} className="mb-3">
            {kinds.length > 1 && <div className="px-3 pb-1 font-mono text-xs text-[#6c8589]">{names[k]}</div>}
            <pre className="font-mono text-sm leading-6">
              {diffLines(mine[k] ?? "", solution[k] ?? "").map((l, i) => (
                <div key={i} className={`flex gap-2 px-3 ${style[l.kind]}`}>
                  <span className="w-3 flex-none select-none text-center opacity-80">{mark[l.kind]}</span>
                  <span className="whitespace-pre-wrap break-words">{l.text || " "}</span>
                </div>
              ))}
            </pre>
          </div>
        ))}
        {!changed.length && <p className="px-3 text-sm text-code-fg/70" dir="auto">{labels.same}</p>}
      </div>
      <div className="flex gap-2 border-t border-white/10 p-2">
        <button type="button" onClick={onKeep} className="h-11 flex-1 rounded-xl bg-white/[0.08] px-3 text-sm font-semibold text-code-fg">
          {labels.keep}
        </button>
        <button type="button" onClick={onUse} className="btn-grad h-11 flex-1 rounded-xl px-3 text-sm font-bold">
          {labels.use}
        </button>
      </div>
    </div>
  );
}
