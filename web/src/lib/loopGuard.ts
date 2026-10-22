import { parse } from "acorn";

/**
 * Infinite-loop protection for learner code. The preview reruns on every keystroke, so a
 * half-typed `while (n)` would spin forever and freeze the whole app. Every loop body gets a
 * cheap guard call; the guard throws once the page has been stuck in loops for 0.4 s. On Android the preview
 * shares the app's thread, so this is also how long the app can freeze.
 *
 * The clock is refreshed by a timer, which can only fire while the page is free: a loop that
 * keeps the page busy stops the refresh, and the guard notices. Loops that run in short bursts
 * (inside timers or event handlers) never trip it.
 */

const GUARD = "__cmLoop()";

/** Defines `__cmLoop` in the preview, before the learner's code. */
export const LOOP_GUARD_RUNTIME = `(function () {
  var last = Date.now(), n = 0;
  setInterval(function () { last = Date.now(); }, 100);
  window.__cmLoop = function () {
    if (++n % 100 === 0 && Date.now() - last > 400) {
      last = Date.now();
      throw new RangeError("Infinite loop stopped (its condition never becomes false) · أُوقفت حلقة لا تنتهي (شرطها لا يصبح false)");
    }
  };
})();`;

type Node = { type: string; start: number; end: number; body?: Node; [key: string]: unknown };

const LOOPS = new Set(["ForStatement", "ForInStatement", "ForOfStatement", "WhileStatement", "DoWhileStatement"]);

/** Every loop body in the code, found by walking the syntax tree. */
function loopBodies(root: Node): Node[] {
  const out: Node[] = [];
  const visit = (node: unknown) => {
    if (!node || typeof node !== "object") return;
    if (Array.isArray(node)) {
      node.forEach(visit);
      return;
    }
    const n = node as Node;
    if (typeof n.type !== "string") return;
    if (LOOPS.has(n.type) && n.body) out.push(n.body);
    for (const key of Object.keys(n)) if (key !== "type" && key !== "start" && key !== "end") visit(n[key]);
  };
  visit(root);
  return out;
}

/** Adds the guard call at the top of every loop body. Code that doesn't parse yet is returned as is. */
export function protectLoops(code: string): string {
  if (!/\b(for|while|do)\b/.test(code)) return code;
  let tree: Node;
  try {
    tree = parse(code, { ecmaVersion: "latest", sourceType: "script", allowReturnOutsideFunction: true, allowAwaitOutsideFunction: true }) as unknown as Node;
  } catch {
    // Half-typed code: it won't run anyway (a syntax error stops it before any loop starts).
    return code;
  }
  const edits: { at: number; text: string }[] = [];
  for (const body of loopBodies(tree)) {
    if (body.type === "BlockStatement") edits.push({ at: body.start + 1, text: `${GUARD};` });
    else {
      edits.push({ at: body.start, text: `{${GUARD};` });
      edits.push({ at: body.end, text: "}" });
    }
  }
  // Apply from the end, so earlier positions stay valid.
  edits.sort((a, b) => b.at - a.at);
  let out = code;
  for (const e of edits) out = out.slice(0, e.at) + e.text + out.slice(e.at);
  return out;
}
