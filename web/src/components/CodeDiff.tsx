import type { FileKind, Files } from "@/content/types";
import { cleanCode } from "@/lib/runner";

type Line = { kind: "same" | "wrong" | "right"; text: string } | { kind: "pair"; mine: string; right: string };

/**
 * How a line compares: spacing and a final `;` don't matter, and phone characters
 * (curly quotes, special spaces) count as the plain ones.
 */
const norm = (s: string) =>
  cleanCode(s)
    .trim()
    // Text inside quotes is kept as is: a space there changes what gets printed.
    .split(/("(?:[^"\\]|\\.)*"|'(?:[^'\\]|\\.)*'|`(?:[^`\\]|\\.)*`)/)
    .map((part, i) => (i % 2 ? part : part.replace(/\s+/g, " ").replace(/ ?([^\w\s$]) ?/g, "$1")))
    .join("")
    .replace(/;$/, "");

/** Line diff by longest common subsequence; a wrong line next to its fix becomes one "pair". */
export function diffLines(mine: string, right: string): Line[] {
  const a = mine.replace(/\s+$/, "").split("\n");
  const b = right.replace(/\s+$/, "").split("\n");
  const n = a.length;
  const m = b.length;
  const lcs = Array.from({ length: n + 1 }, () => new Array<number>(m + 1).fill(0));
  for (let i = n - 1; i >= 0; i--) {
    for (let j = m - 1; j >= 0; j--) {
      lcs[i][j] = norm(a[i]) === norm(b[j]) ? lcs[i + 1][j + 1] + 1 : Math.max(lcs[i + 1][j], lcs[i][j + 1]);
    }
  }
  const raw: Line[] = [];
  let i = 0;
  let j = 0;
  while (i < n || j < m) {
    if (i < n && j < m && norm(a[i]) === norm(b[j])) {
      raw.push({ kind: "same", text: b[j] });
      i++;
      j++;
    } else if (i < n && (j >= m || lcs[i + 1][j] >= lcs[i][j + 1])) {
      if (a[i].trim()) raw.push({ kind: "wrong", text: a[i] });
      i++;
    } else {
      if (b[j].trim()) raw.push({ kind: "right", text: b[j] });
      j++;
    }
  }
  // Pair each run of wrong lines with the run of right lines next to it, line by line,
  // when the two lines are alike enough to be "the same line, fixed".
  const out: Line[] = [];
  for (let k = 0; k < raw.length; ) {
    if (raw[k].kind === "same") {
      out.push(raw[k++]);
      continue;
    }
    const wrong: string[] = [];
    const fixes: string[] = [];
    while (k < raw.length && raw[k].kind !== "same") {
      const l = raw[k++] as { kind: "wrong" | "right"; text: string };
      (l.kind === "wrong" ? wrong : fixes).push(l.text);
    }
    const paired = Math.min(wrong.length, fixes.length);
    for (let p = 0; p < paired; p++) {
      if (likeness(wrong[p], fixes[p]) >= 0.4) out.push({ kind: "pair", mine: wrong[p], right: fixes[p] });
      else out.push({ kind: "wrong", text: wrong[p] }, { kind: "right", text: fixes[p] });
    }
    for (const t of wrong.slice(paired)) out.push({ kind: "wrong", text: t });
    for (const t of fixes.slice(paired)) out.push({ kind: "right", text: t });
  }
  return out;
}

const tokens = (s: string) => s.match(/\s+|[\w$]+|[^\w\s$]/g) ?? [];

/** Which tokens of each line are shared (by LCS over non-space tokens). */
function tokenDiff(mine: string, right: string) {
  const a = tokens(cleanCode(mine));
  const b = tokens(cleanCode(right));
  // Spaces count too (one space inside a text changes what is printed), except the indentation.
  const pick = (list: string[]) => list.map((t, i) => [t.trim() ? t : " ", i] as const).filter(([, i]) => i > 0 || list[0].trim());
  const sa = pick(a);
  const sb = pick(b);
  const n = sa.length;
  const m = sb.length;
  const lcs = Array.from({ length: n + 1 }, () => new Array<number>(m + 1).fill(0));
  for (let i = n - 1; i >= 0; i--) for (let j = m - 1; j >= 0; j--) lcs[i][j] = sa[i][0] === sb[j][0] ? lcs[i + 1][j + 1] + 1 : Math.max(lcs[i + 1][j], lcs[i][j + 1]);
  const keepA = new Set<number>();
  const keepB = new Set<number>();
  for (let i = 0, j = 0; i < n && j < m; ) {
    if (sa[i][0] === sb[j][0]) {
      keepA.add(sa[i][1]);
      keepB.add(sb[j][1]);
      i++;
      j++;
    } else if (lcs[i + 1][j] >= lcs[i][j + 1]) i++;
    else j++;
  }
  // A final `;` is optional in JavaScript, so it is never shown as a mistake.
  const lastSemi = (list: string[], keep: Set<number>) => {
    let i = list.length - 1;
    while (i >= 0 && !list[i].trim()) i--;
    if (list[i] === ";") keep.add(i);
  };
  lastSemi(a, keepA);
  lastSemi(b, keepB);
  return { a, b, keepA, keepB, common: lcs[0]?.[0] ?? 0, total: Math.max(n, m, 1) };
}

const likeness = (mine: string, right: string) => {
  const d = tokenDiff(mine, right);
  return d.common / d.total;
};

/** One line with the tokens that differ marked (a differing space shows as a colored gap). */
function Marked({ parts, keep, tone }: { parts: string[]; keep: Set<number>; tone: "wrong" | "right" }) {
  return (
    <>
      {parts.map((t, i) =>
        keep.has(i) || (i === 0 && !t.trim()) ? (
          <span key={i}>{t}</span>
        ) : !t.trim() ? (
          <mark key={i} className={`rounded ${tone === "wrong" ? "bg-coral/60" : "bg-ok/60"}`}>
            {t}
          </mark>
        ) : (
          <mark key={i} className={`rounded px-0.5 font-bold text-white ${tone === "wrong" ? "bg-coral/80 line-through decoration-2" : "bg-ok/70"}`}>
            {t}
          </mark>
        ),
      )}
    </>
  );
}

const style = {
  same: "text-code-fg/60",
  wrong: "bg-coral/20 text-[#ffb4b6]",
  right: "bg-ok/20 text-[#a7f3c9]",
};
const mark = { same: " ", wrong: "−", right: "+" };

function Row({ kind, children }: { kind: "same" | "wrong" | "right"; children: React.ReactNode }) {
  return (
    <div className={`flex gap-2 px-3 ${style[kind]}`}>
      <span className="w-3 flex-none select-none text-center opacity-80">{mark[kind]}</span>
      <span className="min-w-0 whitespace-pre-wrap [overflow-wrap:anywhere]">{children}</span>
    </div>
  );
}

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
              {diffLines(mine[k] ?? "", solution[k] ?? "").map((l, i) => {
                if (l.kind !== "pair") {
                  return (
                    <Row key={i} kind={l.kind}>
                      {l.text || " "}
                    </Row>
                  );
                }
                const d = tokenDiff(l.mine, l.right);
                return (
                  <div key={i} className="my-1">
                    <Row kind="wrong">
                      <Marked parts={d.a} keep={d.keepA} tone="wrong" />
                    </Row>
                    <Row kind="right">
                      <Marked parts={d.b} keep={d.keepB} tone="right" />
                    </Row>
                  </div>
                );
              })}
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
