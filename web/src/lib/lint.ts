import type { Files, Runtime } from "@/content/types";
import type { L } from "@/i18n/config";

/**
 * Friendly warnings about mistakes the checks can't explain on their own:
 * reserved words used as names, and wrong letter case in names JavaScript is strict about.
 */

const RESERVED = [
  "break", "case", "catch", "class", "const", "continue", "debugger", "default", "delete", "do", "else", "enum", "export",
  "extends", "false", "finally", "for", "function", "if", "import", "in", "instanceof", "new", "null", "return", "super",
  "switch", "this", "throw", "true", "try", "typeof", "var", "void", "while", "with", "yield", "let", "static", "await",
  "implements", "interface", "package", "private", "protected", "public",
];

/** Wrong spelling → right spelling. Matched as whole words, case-sensitively. */
const CASE_FIXES: [RegExp, string][] = [
  [/\bConsole\s*\./, "console."],
  [/\bconsole\.(Log|LOG|Error|Warn)\b/, "console.log / console.error / console.warn"],
  [/\bDocument\s*\./, "document."],
  [/\.(QuerySelector|queryselector|Queryselector)\b/, "querySelector"],
  [/\.(querySelectorall|QuerySelectorAll)\b/, "querySelectorAll"],
  [/\.(getElementByID|getElementbyId|GetElementById)\b/, "getElementById"],
  [/\.(addEventlistener|addeventlistener|AddEventListener)\b/, "addEventListener"],
  [/\.(innerHtml|InnerHTML|innerhtml)\b/, "innerHTML"],
  [/\.(textcontent|TextContent|Textcontent)\b/, "textContent"],
  [/^\s*(Let|Const|Var|Function|Return|If|Else|For|While|Class)\b/m, "let / const / function / return / if / else / for / while / class"],
  [/[=(,:]\s*(True|False|Null|Undefined)\b/, "true / false / null / undefined"],
  [/\b(UseState|usestate|Usestate)\b/, "useState"],
  [/\b(UseEffect|useeffect|Useeffect)\b/, "useEffect"],
  [/\b(Stylesheet|styleSheet|stylesheet)\.create\b/, "StyleSheet.create"],
  [/\bJson\.(parse|stringify)\b/, "JSON.parse / JSON.stringify"],
  [/\bmath\.(random|floor|round|max|min)\b/, "Math.random / Math.floor …"],
];

/** Removes comments and the inside of quotes, so words in text don't raise warnings. */
function codeOnly(src: string) {
  return src
    .replace(/\/\*[\s\S]*?\*\//g, "")
    .replace(/(^|[^:])\/\/.*$/gm, "$1")
    .replace(/"(?:[^"\\\n]|\\.)*"|'(?:[^'\\\n]|\\.)*'/g, '""');
}

export function lintCode(files: Files, runtime?: Runtime): L[] {
  const src = files.js;
  if (!src) return [];
  const code = codeOnly(src);
  const out: L[] = [];

  const reserved = new RegExp(`\\b(?:let|const|var|function|class)\\s+(${RESERVED.join("|")})\\b`);
  const r = code.match(reserved);
  if (r) {
    out.push({
      ar: `\`${r[1]}\` كلمة **محجوزة** في JavaScript ولا تصلح اسمًا. اختر اسمًا آخر مثل \`my${r[1][0].toUpperCase()}${r[1].slice(1)}\`.`,
      en: `\`${r[1]}\` is a **reserved word** in JavaScript and can't be a name. Pick another, like \`my${r[1][0].toUpperCase()}${r[1].slice(1)}\`.`,
    });
  }

  for (const [wrong, right] of CASE_FIXES) {
    const m = code.match(wrong);
    if (m) {
      out.push({
        ar: `انتبه لحالة الأحرف: \`${m[0].trim()}\` ← اكتبها \`${right}\`. JavaScript تفرّق بين الحروف الكبيرة والصغيرة.`,
        en: `Watch the letter case: \`${m[0].trim()}\` → write \`${right}\`. JavaScript treats capital and small letters differently.`,
      });
    }
  }

  if (runtime === "react" || runtime === "native") {
    const comp = code.match(/\bfunction\s+([a-z]\w*)\s*\([^)]*\)\s*\{[\s\S]*?return\s*\(?\s*</);
    if (comp) {
      const name = comp[1][0].toUpperCase() + comp[1].slice(1);
      out.push({
        ar: `اسم المكوّن \`${comp[1]}\` يجب أن يبدأ بحرف **كبير**: \`${name}\`. وإلا تظنه React وسم HTML عاديًا.`,
        en: `The component name \`${comp[1]}\` must start with a **capital** letter: \`${name}\`. Otherwise React treats it as a plain HTML tag.`,
      });
    }
    if (/<\w+[^>]*\sclass=/.test(src) && runtime === "react") {
      out.push({ ar: "في JSX نكتب `className` بدل `class`.", en: "In JSX, write `className` instead of `class`." });
    }
    const ev = src.match(/\s(onclick|onchange|onsubmit|onpress)=/);
    if (ev) {
      out.push({
        ar: `أسماء الأحداث في React بحرف كبير بعد on: \`${ev[1]}\` ← \`on${ev[1].slice(2, 3).toUpperCase()}${ev[1].slice(3)}\`.`,
        en: `React event names are camelCase: \`${ev[1]}\` → \`on${ev[1].slice(2, 3).toUpperCase()}${ev[1].slice(3)}\`.`,
      });
    }
  }
  return out;
}
