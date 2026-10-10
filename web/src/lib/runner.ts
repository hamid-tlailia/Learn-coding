import type { CheckInput, Files, Runtime, Task } from "@/content/types";

/**
 * Sent from inside the preview iframe to the app: console output and errors.
 * The iframe is sandboxed without same-origin, so postMessage is the only channel out.
 */
const consoleBridge = (token: string) => `<script>(function(){
var send=function(type,args){try{parent.postMessage({cm:${JSON.stringify(token)},type:type,text:Array.prototype.map.call(args,function(a){if(typeof a==="string")return a;if(a instanceof Error)return a.message;try{return JSON.stringify(a)}catch(e){return String(a)}}).join(" ")},"*")}catch(e){}};
["log","info","warn","error"].forEach(function(k){var o=console[k];console[k]=function(){send(k,arguments);o.apply(console,arguments)}});
window.addEventListener("error",function(e){send("error",[e.message])});
window.addEventListener("unhandledrejection",function(e){send("error",[e.reason&&e.reason.message||String(e.reason)])});
})();</script>`;

const escapeScript = (code: string) => code.replace(/<\/script/gi, "<\\/script");

/** Lines starting with "__" are written by checks for the app, not by the learner. */
export const isInternalLog = (line: string) => line.startsWith("__");

export type RunOptions = {
  token?: string;
  harness?: string;
  settle?: number;
  runtime?: Runtime;
  /** For checks: print the rendered React tree so tasks can inspect it. */
  snapshot?: boolean;
};

/**
 * JSX and `import` statements need compiling before a browser can run them.
 * Sucrase is loaded only when a lesson needs it, and works offline.
 */
export async function compile(files: Files, runtime?: Runtime): Promise<Files> {
  if (!runtime || !files.js) return files;
  const { transform } = await import("sucrase");
  try {
    const { code } = transform(files.js, { transforms: ["jsx", "imports"], production: true });
    return { ...files, js: code };
  } catch (e) {
    const message = e instanceof Error ? e.message : String(e);
    return { ...files, js: `console.error(${JSON.stringify(`SyntaxError: ${message}`)});` };
  }
}

/** Globals the compiled code expects: require() for imports, and React's hooks. */
const PRELUDE = `var exports = {}, module = { exports: exports };
function require(name) {
  if (name === "react") return React;
  if (name === "react-dom" || name === "react-dom/client") return ReactDOM;
  if (name === "react-native") return window.ReactNative;
  if (name === "express") return window.express;
  throw new Error("Cannot find module '" + name + "'");
}
var useState = window.React && React.useState, useEffect = window.React && React.useEffect,
    useRef = window.React && React.useRef, useMemo = window.React && React.useMemo;`;

/** Renders the learner's component: export default, or a top-level function App. */
const MOUNT = `(function () {
  var C = (module.exports && module.exports.default) || (typeof App !== "undefined" ? App : null);
  if (!C) { console.error("Define a component called App (or export default)."); return; }
  var root = ReactDOM.createRoot(document.getElementById("root"));
  ReactDOM.flushSync(function () { root.render(React.createElement(C)); });
})();`;

const PHONE_CSS = `body{margin:0;min-height:100vh;display:grid;place-items:center;background:#e9e9f2;font-family:system-ui,sans-serif}
#root{width:340px;height:620px;max-width:100%;border-radius:36px;border:10px solid #111827;background:#fff;overflow:auto;display:flex;flex-direction:column;box-shadow:0 20px 50px rgba(0,0,0,.25)}
#root>div{flex:1}`;

const SERVER_HTML = `<div style="font-family:ui-monospace,monospace;color:#a7f3d0;background:#0c1230;min-height:100vh;margin:-16px;padding:24px">
<div style="color:#9aa3cc">$ node server.js</div><div>🟢 Server running in Code Master. Requests and responses appear in the console below.</div></div>`;

/**
 * Forms submit inside the preview (the sandbox allows it) so learners' submit handlers run,
 * but a window-level listener, which fires last, stops the page from navigating away.
 */
const FORM_GUARD = `<script>addEventListener("submit",function(e){e.preventDefault()})</script>`;

/**
 * Builds the document shown in the sandboxed preview iframe.
 * Plain lessons: the learner's HTML, CSS and JS. A learner who writes a full page
 * (<!DOCTYPE html>…) gets it as-is, with CSS and JS injected.
 * React / mobile / server lessons: the vendored runtime, then the compiled code.
 */
export function buildPreview(files: Files, opts: RunOptions = {}): string {
  const html = files.html ?? "";
  const style = `<style>${files.css ?? ""}</style>`;
  const bridge = FORM_GUARD + (opts.token ? consoleBridge(opts.token) : "");
  const done = opts.token
    ? `<script>setTimeout(function(){parent.postMessage({cm:${JSON.stringify(opts.token)},type:"done"},"*")},${opts.settle ?? 50})</script>`
    : "";

  if (opts.runtime) {
    const origin = typeof window !== "undefined" ? window.location.origin : "";
    const ui = opts.runtime === "react" || opts.runtime === "native";
    const vendor =
      (ui ? `<script src="${origin}/vendor/react.js"></script><script src="${origin}/vendor/react-dom.js"></script>` : "") +
      (opts.runtime === "native" ? `<script src="${origin}/vendor/rn-shim.js"></script>` : "") +
      (opts.runtime === "server" ? `<script src="${origin}/vendor/server-shim.js"></script>` : "");
    // Checks interact (harness) once the UI has rendered, then read the rendered tree.
    const after = ui
      ? `<script>setTimeout(function(){try{${opts.harness ?? ""}}catch(e){console.error(e.message)}${
          opts.snapshot ? `setTimeout(function(){var r=document.getElementById("root");console.log("__dom__ "+(r?r.innerHTML:""))},150)` : ""
        }},80)</script>`
      : opts.harness
        ? `<script>${escapeScript(opts.harness)}</script>`
        : "";
    const body = ui ? `<div id="root"></div>` : SERVER_HTML;
    const pageCss = opts.runtime === "native" ? PHONE_CSS : "body{font-family:system-ui,sans-serif;padding:16px;margin:0;line-height:1.5}img{max-width:100%}";
    return `<!doctype html><html><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">${bridge}
<style>${pageCss}</style>${style}${vendor}</head><body>${body}
<script>${PRELUDE}</script><script>${escapeScript(files.js ?? "")}</script>${ui ? `<script>${MOUNT}</script>` : ""}${after}${done}</body></html>`;
  }

  const script =
    `<script>${escapeScript(files.js ?? "")}</script>` + (opts.harness ? `<script>${escapeScript(opts.harness)}</script>` : "") + done;

  if (/<html[\s>]/i.test(html)) {
    let doc = html;
    doc = /<\/head>/i.test(doc) ? doc.replace(/<\/head>/i, `${bridge}${style}</head>`) : bridge + style + doc;
    doc = /<\/body>/i.test(doc) ? doc.replace(/<\/body>/i, `${script}</body>`) : doc + script;
    return doc;
  }

  return `<!doctype html><html><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">${bridge}
<style>body{font-family:system-ui,sans-serif;padding:16px;margin:0;line-height:1.5}img{max-width:100%}</style>
${style}</head><body>${html}${script}</body></html>`;
}

function parseCss(css: string) {
  const rules = new Map<string, CSSStyleDeclaration>();
  const media: string[] = [];
  try {
    const sheet = new CSSStyleSheet();
    sheet.replaceSync(css);
    const walk = (list: CSSRuleList) => {
      for (const r of Array.from(list)) {
        if (r instanceof CSSStyleRule) {
          for (const sel of r.selectorText.split(",").map((s) => s.trim().replace(/\s+/g, " "))) {
            if (!rules.has(sel)) rules.set(sel, r.style);
          }
          // Nested rules (CSS nesting) are walked too.
          if (r.cssRules?.length) walk(r.cssRules);
        } else if (r instanceof CSSMediaRule) {
          media.push(r.conditionText ?? r.media.mediaText);
          walk(r.cssRules);
        } else if ("cssRules" in r && (r as CSSGroupingRule).cssRules) {
          // @container, @supports and other grouping rules.
          media.push((r as CSSGroupingRule & { conditionText?: string }).conditionText ?? r.cssText.split("{")[0].trim());
          walk((r as CSSGroupingRule).cssRules);
        }
      }
    };
    walk(sheet.cssRules);
  } catch {
    // Unparseable CSS simply has no rules.
  }
  return {
    rule: (selector: string, property: string) => rules.get(selector.replace(/\s+/g, " "))?.getPropertyValue(property).trim() ?? "",
    media,
  };
}

/** Runs the learner's code in a hidden sandboxed iframe and collects what it prints. */
export async function collectLogs(files: Files, opts: Omit<RunOptions, "token"> = {}): Promise<string[]> {
  const compiled = await compile(files, opts.runtime);
  const settle = opts.settle ?? (opts.runtime ? 500 : 50);
  return new Promise((resolve) => {
    const token = Math.random().toString(36).slice(2);
    const logs: string[] = [];
    const frame = document.createElement("iframe");
    frame.setAttribute("sandbox", "allow-scripts allow-forms");
    frame.style.display = "none";
    const finish = () => {
      window.removeEventListener("message", onMessage);
      window.clearTimeout(timer);
      frame.remove();
      resolve(logs);
    };
    const onMessage = (e: MessageEvent) => {
      if (e.source !== frame.contentWindow || e.data?.cm !== token) return;
      if (e.data.type === "done") finish();
      else logs.push(e.data.type === "error" ? `Error: ${e.data.text}` : e.data.text);
    };
    // Code that never finishes (an endless loop) still gets an answer.
    const timer = window.setTimeout(finish, 2500 + settle);
    window.addEventListener("message", onMessage);
    frame.srcdoc = buildPreview(compiled, { ...opts, token, settle });
    document.body.appendChild(frame);
  });
}

/** Runs every task check against the learner's code. Checks never see the live preview. */
export async function runChecks(
  tasks: Task[],
  files: Files,
  opts: { harness?: string; settle?: number; runtime?: Runtime } = {},
): Promise<Record<string, boolean>> {
  const source = files.html ?? "";
  const { rule, media } = parseCss(files.css ?? "");
  const logs = files.js !== undefined ? await collectLogs(files, { ...opts, snapshot: true }) : [];
  // React and mobile lessons are checked against what actually rendered.
  const rendered = logs.find((l) => l.startsWith("__dom__ "));
  const doc = new DOMParser().parseFromString(rendered ? rendered.slice(8) : source, "text/html");
  const input: CheckInput = { files, doc, css: files.css ?? "", source, logs, rule, media };
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
