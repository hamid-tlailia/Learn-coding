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

/** Outdated habits: the code still works, but there's a modern way the course teaches. */
const OLD_JS: [RegExp, L][] = [
  [/(^|[;{}\s])var\s+[A-Za-z_$]/m, { ar: "`var` طريقة قديمة لتعريف المتغيرات ← استخدم `const`، أو `let` إذا كانت القيمة ستتغير.", en: "`var` is the old way to declare variables → use `const`, or `let` if the value will change." }],
  [/[^=!<>]==[^=]|!=[^=]/, { ar: "`==` و `!=` يحوّلان الأنواع بصمت ← استخدم `===` و `!==`.", en: "`==` and `!=` silently convert types → use `===` and `!==`." }],
  [/document\.write\s*\(/, { ar: "`document.write` قديمة وتمسح الصفحة أحيانًا ← استخدم `textContent` أو `append`.", en: "`document.write` is outdated and can wipe the page → use `textContent` or `append`." }],
  [/new\s+XMLHttpRequest/, { ar: "`XMLHttpRequest` قديمة ← استخدم `fetch` مع `await`.", en: "`XMLHttpRequest` is outdated → use `fetch` with `await`." }],
  [/\.(innerText)\s*=/, { ar: "`innerText` يعمل لكن `textContent` أسرع وهو المعيار الحديث.", en: "`innerText` works, but `textContent` is faster and the modern standard." }],
];

const OLD_HTML: [RegExp, L][] = [
  [/<b>/i, { ar: "`<b>` للشكل فقط ← للكلمة المهمة استخدم `<strong>`.", en: "`<b>` is only visual → for an important word use `<strong>`." }],
  [/<i>/i, { ar: "`<i>` للشكل فقط ← للتأكيد استخدم `<em>`.", en: "`<i>` is only visual → for emphasis use `<em>`." }],
  [/<(center|font|marquee|big|strike|tt)\b/i, { ar: "هذا الوسم أُزيل من HTML الحديثة ← استخدم CSS للتنسيق.", en: "This tag was removed from modern HTML → style it with CSS." }],
  [/<[a-z][^>]*\s(bgcolor|align|valign)\s*=/i, { ar: "سمات التنسيق مثل `bgcolor` و `align` قديمة ← ضع التنسيق في CSS.", en: "Styling attributes like `bgcolor` and `align` are outdated → put the styling in CSS." }],
  [/(<br\s*\/?>\s*){2,}/i, { ar: "تكرار `<br>` للمسافات قديم ← استخدم `margin` في CSS أو فقرات `<p>`.", en: "Stacking `<br>` for spacing is outdated → use CSS `margin` or `<p>` paragraphs." }],
  [/\son(click|load|submit|change)\s*=/i, { ar: "الأحداث داخل HTML مثل `onclick=` قديمة ← استخدم `addEventListener` في JavaScript.", en: "Inline events like `onclick=` are outdated → use `addEventListener` in JavaScript." }],
];

const OLD_CSS: [RegExp, L][] = [
  [/\bfloat\s*:\s*(left|right)/i, { ar: "`float` للتخطيط طريقة قديمة ← استخدم Flexbox أو Grid.", en: "`float` for layout is outdated → use Flexbox or Grid." }],
  [/-(webkit|moz|ms)-(border-radius|box-shadow|transition|transform|box-sizing)/i, { ar: "البادئات مثل `-webkit-` لم تعد لازمة لهذه الخاصية ← اكتبها بدونها.", en: "Prefixes like `-webkit-` are no longer needed for this property → write it without." }],
  [/(!important[\s\S]*){3,}/i, { ar: "`!important` كثيرًا يعني أن القواعد تتصارع ← رتّب المحددات بدل فرض الأولوية.", en: "Lots of `!important` means rules are fighting → organize your selectors instead of forcing priority." }],
];

/** Warnings about outdated style in HTML and CSS (the code works; there's a better way). */
function lintOld(files: Files): L[] {
  const out: L[] = [];
  const html = (files.html ?? "").replace(/<!--[\s\S]*?-->/g, "");
  const css = (files.css ?? "").replace(/\/\*[\s\S]*?\*\//g, "");
  for (const [re, msg] of OLD_HTML) if (re.test(html)) out.push(msg);
  for (const [re, msg] of OLD_CSS) if (re.test(css)) out.push(msg);
  return out;
}

export function lintCode(files: Files, runtime?: Runtime): L[] {
  const src = files.js;
  if (!src) return lintOld(files);
  const code = codeOnly(src);
  const out: L[] = lintOld(files);
  for (const [re, msg] of OLD_JS) if (re.test(code)) out.push(msg);

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
