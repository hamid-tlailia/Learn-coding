import type { CheckInput, Files, Task } from "@/content/types";

/**
 * Sent from inside the preview iframe to the app: console output and errors.
 * The iframe is sandboxed without same-origin, so postMessage is the only channel out.
 */
const consoleBridge = (token: string) => `<script>(function(){
var send=function(type,args){try{parent.postMessage({cm:${JSON.stringify(token)},type:type,text:Array.prototype.map.call(args,function(a){if(typeof a==="string")return a;try{return JSON.stringify(a)}catch(e){return String(a)}}).join(" ")},"*")}catch(e){}};
["log","info","warn","error"].forEach(function(k){var o=console[k];console[k]=function(){send(k,arguments);o.apply(console,arguments)}});
window.addEventListener("error",function(e){send("error",[e.message])});
})();</script>`;

const escapeScript = (code: string) => code.replace(/<\/script/gi, "<\\/script");

/**
 * Builds the document shown in the sandboxed preview iframe.
 * A learner who writes a full page (<!DOCTYPE html>…) gets it as-is, with CSS and JS injected.
 */
export function buildPreview(files: Files, opts: { token?: string; harness?: string } = {}): string {
  const html = files.html ?? "";
  const style = `<style>${files.css ?? ""}</style>`;
  const bridge = opts.token ? consoleBridge(opts.token) : "";
  const script =
    `<script>${escapeScript(files.js ?? "")}</script>` +
    (opts.harness ? `<script>${escapeScript(opts.harness)}</script>` : "") +
    (opts.token ? `<script>setTimeout(function(){parent.postMessage({cm:${JSON.stringify(opts.token)},type:"done"},"*")},50)</script>` : "");

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
        } else if (r instanceof CSSMediaRule) {
          media.push(r.conditionText ?? r.media.mediaText);
          walk(r.cssRules);
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

/** Runs the learner's JavaScript in a hidden sandboxed iframe and collects what it prints. */
export function collectLogs(files: Files, harness?: string): Promise<string[]> {
  return new Promise((resolve) => {
    const token = Math.random().toString(36).slice(2);
    const logs: string[] = [];
    const frame = document.createElement("iframe");
    frame.setAttribute("sandbox", "allow-scripts");
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
    const timer = window.setTimeout(finish, 1500);
    window.addEventListener("message", onMessage);
    frame.srcdoc = buildPreview(files, { token, harness });
    document.body.appendChild(frame);
  });
}

/** Runs every task check against the learner's code. Checks never see the live preview. */
export async function runChecks(tasks: Task[], files: Files, harness?: string): Promise<Record<string, boolean>> {
  const source = files.html ?? "";
  const doc = new DOMParser().parseFromString(source, "text/html");
  const { rule, media } = parseCss(files.css ?? "");
  const logs = files.js !== undefined ? await collectLogs(files, harness) : [];
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
