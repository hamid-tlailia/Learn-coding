import { printed } from "./check";
import type { Exam, Lesson } from "./types";

/**
 * Web-track lessons that mirror the mobile ones: strings, saving in the browser and browser
 * powers (JavaScript); loading data and pages (React); real SQL and real authentication (Backend).
 */

/** Exact match, for lessons where letter case is the point. */
const exact = (logs: string[], value: string) => logs.some((l) => l.trim() === value);
const c = (logs: string[], name: string, value: string | number | boolean) => printed(logs, `__c__ ${name} ${value}`);
const reading = (l: Omit<Lesson, "files" | "starter" | "solution" | "tasks" | "hints">): Lesson => ({ ...l, files: [], starter: {}, solution: {}, tasks: [], hints: [] });

const steps = (body: string) =>
  `(async function () { var wait = function () { return new Promise(function (r) { setTimeout(r, 40); }); }; var root = document.getElementById("root"); var txt = function () { return root.textContent; }; var btn = function (label) { return Array.prototype.find.call(root.querySelectorAll("button"), function (b) { return b.textContent.trim().toLowerCase() === label.toLowerCase(); }); }; ${body} })();`;

/* ------------------------------------------------------------------ JavaScript */

export const strings: Lesson = {
  slug: "strings",
  title: { ar: "النصوص: تنظيف ومقارنة", en: "Strings: clean and compare" },
  body: [
    { icon: "🧵", ar: "أغلب ما يكتبه المستخدم **نصوص**: أسماء، بريد، بحث. ونادرًا ما تصل نظيفة: مسافات زائدة، أو حروف كبيرة وصغيرة مختلطة. JavaScript تعطيك **دوالًا جاهزة** تكتبها بعد النص ونقطة.", en: "Most of what users type is **text**: names, emails, searches. It rarely arrives clean: extra spaces, or mixed capital and small letters. JavaScript gives you **ready-made methods** you write after the text and a dot." },
    { icon: "🧹", ar: "`trim()` يحذف المسافات من البداية والنهاية: `\"  Sara  \".trim()` يصبح `\"Sara\"`.", en: "`trim()` removes spaces at the start and end: `\"  Sara  \".trim()` becomes `\"Sara\"`." },
    { icon: "🔠", ar: "`toUpperCase()` يجعل كل الحروف كبيرة، و `toLowerCase()` يجعلها صغيرة: `\"Sara\".toUpperCase()` يصبح `\"SARA\"`.", en: "`toUpperCase()` makes every letter capital and `toLowerCase()` makes them small: `\"Sara\".toUpperCase()` becomes `\"SARA\"`." },
    { icon: "🔍", ar: "`includes(\"@\")` يسأل: هل النص يحتوي هذا؟ ويُرجع `true` أو `false`. و `length` (بدون أقواس) عدد الحروف: `\"Sara\".length` يساوي `4`.", en: "`includes(\"@\")` asks: does the text contain this? It returns `true` or `false`. And `length` (no parentheses) is the number of characters: `\"Sara\".length` is `4`." },
    { icon: "🔗", ar: "يمكنك وصلها معًا: `name.trim().toUpperCase()` ينظّف ثم يكبّر. وكل دالة **تُرجع نصًا جديدًا** ولا تغيّر الأصلي، فاحفظ النتيجة في متغير.", en: "You can chain them: `name.trim().toUpperCase()` cleans, then capitalizes. Each method **returns a new string** and leaves the original alone, so keep the result in a variable." },
  ],
  example: {
    code: 'const raw = "   hELLo   ";\nconst clean = raw.trim();\nconsole.log(clean);                 // "hELLo"\nconsole.log(clean.toLowerCase());   // "hello"\nconsole.log(clean.length);          // 5\nconsole.log("a@b.co".includes("@")); // true',
    note: { ar: "كل سطر يطبّق دالة واحدة.", en: "Each line applies one method." },
    lang: "js",
  },
  files: ["js"],
  starter: { js: 'const raw = "   Sara Ali   ";\nconst email = "sara@mail.com";\n\n' },
  solution: { js: 'const raw = "   Sara Ali   ";\nconst email = "sara@mail.com";\n\nconst name = raw.trim();\nconsole.log(name);\nconsole.log(name.toUpperCase());\nconsole.log(name.length);\nconsole.log(email.includes("@"));\n' },
  tasks: [
    { id: "trim", label: { ar: "اطبع `raw` بدون المسافات الزائدة: `Sara Ali`", en: "Print `raw` without the extra spaces: `Sara Ali`" }, test: ({ logs }) => exact(logs, "Sara Ali") },
    { id: "upper", label: { ar: "اطبع الاسم بحروف كبيرة: `SARA ALI`", en: "Print the name in capital letters: `SARA ALI`" }, test: ({ logs }) => exact(logs, "SARA ALI") },
    { id: "length", label: { ar: "اطبع عدد حروف الاسم بعد التنظيف (`8`)", en: "Print how many characters the cleaned name has (`8`)" }, test: ({ logs, files }) => exact(logs, "8") && /\.length\b/.test(files.js ?? "") },
    { id: "includes", label: { ar: "اطبع هل `email` يحتوي `@` (يجب أن تظهر `true`)", en: "Print whether `email` contains `@` (it should show `true`)" }, test: ({ logs, files }) => exact(logs, "true") && /includes\(/.test(files.js ?? "") },
  ],
  hints: [
    { ar: "`const name = raw.trim();` ثم `console.log(name);`", en: "`const name = raw.trim();` then `console.log(name);`" },
    { ar: "`console.log(name.toUpperCase());` و `console.log(name.length);` و `console.log(email.includes(\"@\"));`", en: "`console.log(name.toUpperCase());`, `console.log(name.length);` and `console.log(email.includes(\"@\"));`" },
  ],
  deep: {
    more: [
      { icon: "🧊", ar: "النصوص **غير قابلة للتغيير** (immutable): `name.toUpperCase()` لا يغيّر `name`. احفظ النتيجة: `const big = name.toUpperCase();`.", en: "Strings are **immutable**: `name.toUpperCase()` doesn't change `name`. Keep the result: `const big = name.toUpperCase();`." },
      { icon: "🔎", ar: "للمقارنة دون اعتبار لحالة الأحرف وحّد الطرفين: `a.toLowerCase() === b.toLowerCase()`. هكذا يعمل البحث في معظم المواقع.", en: "To compare ignoring letter case, normalize both sides: `a.toLowerCase() === b.toLowerCase()`. That's how most site searches work." },
      { icon: "📏", ar: "`length` يعدّ المسافات أيضًا، لذلك نظّف بـ `trim()` قبل أن تتحقق من طول اسم أو كلمة سر.", en: "`length` counts spaces too, so clean with `trim()` before checking the length of a name or password." },
    ],
    mistakes: [
      { ar: "`name.toUppercase()` ← الاسم الصحيح `toUpperCase()` بحرف C كبير؛ JavaScript تفرّق بين الحروف.", en: "`name.toUppercase()` → the right name is `toUpperCase()` with a capital C; JavaScript is case-sensitive." },
      { ar: "`name.length()` بأقواس يسبب خطأ ← `length` خاصية وليست دالة: `name.length`.", en: "`name.length()` with parentheses is an error → `length` is a property, not a method: `name.length`." },
      { ar: "`raw.trim();` وحدها ثم طباعة `raw` يُظهر المسافات ← النتيجة في نص جديد: `const name = raw.trim();`.", en: "Calling `raw.trim();` alone and printing `raw` still shows the spaces → the result is a new string: `const name = raw.trim();`." },
    ],
  },
  xp: 25,
};

export const splitJoin: Lesson = {
  slug: "split-join",
  title: { ar: "النصوص: تقطيع وجمع", en: "Strings: split and join" },
  body: [
    { icon: "✂️", ar: "`split(\" \")` يقطّع النص عند كل مسافة ويُرجع **مصفوفة** كلمات: `\"learn js fast\".split(\" \")` تصبح `[\"learn\", \"js\", \"fast\"]`.", en: "`split(\" \")` cuts the text at every space and returns an **array** of words: `\"learn js fast\".split(\" \")` becomes `[\"learn\", \"js\", \"fast\"]`." },
    { icon: "🧷", ar: "`join(\"-\")` يعمل العكس: يجمع عناصر المصفوفة في نص واحد مع الفاصل الذي تختاره: `[\"learn\", \"js\"].join(\"-\")` تصبح `\"learn-js\"`.", en: "`join(\"-\")` does the opposite: it glues an array back into one string with the separator you choose: `[\"learn\", \"js\"].join(\"-\")` becomes `\"learn-js\"`." },
    { icon: "🍰", ar: "`slice(0, 1)` يأخذ **قطعة** من النص: من الموقع 0 حتى قبل 1، أي الحرف الأول. و `slice(1)` يأخذ كل شيء بعد الحرف الأول.", en: "`slice(0, 1)` takes a **piece** of the text: from position 0 up to (not including) 1, so the first letter. `slice(1)` takes everything after the first letter." },
  ],
  example: {
    code: 'const sentence = "code is fun";\nconst words = sentence.split(" ");\nconsole.log(words);             // ["code","is","fun"]\nconsole.log(words.length);      // 3\nconsole.log(words.join("_"));   // "code_is_fun"\nconsole.log(sentence.slice(0, 4)); // "code"',
    note: { ar: "من نص إلى مصفوفة ثم إلى نص من جديد.", en: "From text to an array, and back to text." },
    lang: "js",
  },
  files: ["js"],
  starter: { js: 'const sentence = "learn js fast";\n\n' },
  solution: { js: 'const sentence = "learn js fast";\n\nconst words = sentence.split(" ");\nconsole.log(words);\nconsole.log(words.length);\nconsole.log(words.join("-"));\nconsole.log(sentence.slice(0, 1).toUpperCase());\n' },
  tasks: [
    { id: "split", label: { ar: "قطّع `sentence` إلى كلمات بـ `split(\" \")` واطبع المصفوفة", en: "Split `sentence` into words with `split(\" \")` and print the array" }, test: ({ logs, files }) => exact(logs, '["learn","js","fast"]') && /split\(/.test(files.js ?? "") },
    { id: "count", label: { ar: "اطبع عدد الكلمات (`3`)", en: "Print how many words there are (`3`)" }, test: ({ logs }) => exact(logs, "3") },
    { id: "join", label: { ar: "اجمع الكلمات بـ `-` واطبع `learn-js-fast`", en: "Join the words with `-` and print `learn-js-fast`" }, test: ({ logs, files }) => exact(logs, "learn-js-fast") && /join\(/.test(files.js ?? "") },
    { id: "slice", label: { ar: "اطبع أول حرف من `sentence` كبيرًا بـ `slice`: `L`", en: "Print the first letter of `sentence` as a capital with `slice`: `L`" }, test: ({ logs, files }) => exact(logs, "L") && /slice\(/.test(files.js ?? "") },
  ],
  hints: [
    { ar: '`const words = sentence.split(" ");` ثم `console.log(words);` و `console.log(words.length);`', en: '`const words = sentence.split(" ");` then `console.log(words);` and `console.log(words.length);`' },
    { ar: '`console.log(words.join("-"));` و `console.log(sentence.slice(0, 1).toUpperCase());`', en: '`console.log(words.join("-"));` and `console.log(sentence.slice(0, 1).toUpperCase());`' },
  ],
  deep: {
    more: [
      { icon: "🧩", ar: "`split` و `join` مع دوال المصفوفات التي تعرفها قوية جدًا: `title.split(\" \").map((w) => w.toLowerCase()).join(\"-\")` يصنع رابطًا نظيفًا (slug) من أي عنوان.", en: "`split` and `join` combined with the array methods you know are powerful: `title.split(\" \").map((w) => w.toLowerCase()).join(\"-\")` makes a clean link (slug) from any title." },
      { icon: "🔢", ar: "المواقع في النص تبدأ من **0**: في `\"code\"` الحرف `c` في الموقع 0. و `slice(-3)` بعدد سالب يأخذ آخر 3 حروف.", en: "Positions in text start at **0**: in `\"code\"`, `c` is at position 0. `slice(-3)` with a negative number takes the last 3 characters." },
      { icon: "🔁", ar: "`replaceAll(\" \", \"-\")` طريقة أقصر لاستبدال كل المسافات مرة واحدة دون تقطيع.", en: "`replaceAll(\" \", \"-\")` is a shorter way to replace every space at once without splitting." },
    ],
    mistakes: [
      { ar: "`split(\" \")` على نص فيه مسافتان متتاليتان يعطي كلمة فارغة `\"\"` ← نظّف بـ `trim()` أولًا، أو صفِّ بـ `filter((w) => w)`.", en: "`split(\" \")` on text with two spaces in a row gives an empty word `\"\"` → clean with `trim()` first, or filter with `filter((w) => w)`." },
      { ar: "`join()` بدون فاصل يضع فواصل `,` ← حدّد الفاصل: `join(\" \")` أو `join(\"-\")`.", en: "`join()` with no separator uses commas `,` → name the separator: `join(\" \")` or `join(\"-\")`." },
      { ar: "`slice(1, 1)` يعطي نصًا فارغًا لأن النهاية لا تُحتسب ← للحرف الأول اكتب `slice(0, 1)`.", en: "`slice(1, 1)` gives empty text because the end isn't included → for the first letter write `slice(0, 1)`." },
    ],
  },
  xp: 25,
};

const STORAGE_HTML = '<h1>My page</h1>\n<p id="visits">Visits: 0</p>\n';

export const webStorage: Lesson = {
  slug: "web-storage",
  title: { ar: "الحفظ في المتصفح: localStorage", en: "Saving in the browser: localStorage" },
  body: [
    { icon: "💾", ar: "المتغيرات تُمسح عند إعادة تحميل الصفحة. لحفظ أشياء صغيرة على جهاز المستخدم (الثيم، اللغة، تقدّم لعبة) يعطيك المتصفح **localStorage**.", en: "Variables vanish when the page reloads. To keep small things on the user's device (theme, language, game progress), the browser gives you **localStorage**." },
    { icon: "🔑", ar: "مفاتيح وقيم نصية: `localStorage.setItem(\"theme\", \"dark\")` للحفظ، و `localStorage.getItem(\"theme\")` للقراءة (تُرجع `null` إن لم يوجد)، و `removeItem` للحذف.", en: "Text keys and values: `localStorage.setItem(\"theme\", \"dark\")` to save, `localStorage.getItem(\"theme\")` to read (it returns `null` if missing), and `removeItem` to delete." },
    { icon: "🔢", ar: "القيم دائمًا نصوص. للأرقام: `Number(localStorage.getItem(\"visits\") ?? 0)`. وللكائنات: احفظ `JSON.stringify(obj)` واقرأ بـ `JSON.parse(text)`.", en: "Values are always text. For numbers: `Number(localStorage.getItem(\"visits\") ?? 0)`. For objects: save `JSON.stringify(obj)` and read with `JSON.parse(text)`." },
    { icon: "🧪", ar: "هنا في المحرر يبدأ التخزين فارغًا مع كل تشغيل، أما في موقعك الحقيقي فيبقى حتى بعد إغلاق المتصفح.", en: "In this editor storage starts empty on every run; on your real site it stays even after the browser closes." },
      { icon: "❔", ar: "المعامل `??` يعني «إن لم توجد قيمة فخذ هذه»: `localStorage.getItem(\"visits\") ?? 0` يعطي `0` إذا كانت النتيجة `null`.", en: "The `??` operator means \"if there's no value, use this\": `localStorage.getItem(\"visits\") ?? 0` gives `0` when the result is `null`." },
  ],
  example: {
    code: 'const saved = JSON.parse(localStorage.getItem("profile") ?? "null");\nconsole.log("Before:", saved);\n\nlocalStorage.setItem("profile", JSON.stringify({ name: "Sara", level: 3 }));\nconst profile = JSON.parse(localStorage.getItem("profile"));\nconsole.log("After:", profile.name, profile.level);',
    note: { ar: "حفظ كائن وقراءته بـ JSON.", en: "Saving and reading an object with JSON." },
    lang: "js",
  },
  files: ["js", "html"],
  starter: { js: "", html: STORAGE_HTML },
  solution: {
    js: 'const visits = Number(localStorage.getItem("visits") ?? 0) + 1;\nlocalStorage.setItem("visits", String(visits));\ndocument.querySelector("#visits").textContent = `Visits: ${visits}`;\n',
    html: STORAGE_HTML,
  },
  harness: 'console.log("__c__ visits " + localStorage.getItem("visits")); console.log("__c__ shown " + (document.querySelector("#visits") || {}).textContent);',
  tasks: [
    { id: "read", label: { ar: "اقرأ `visits` بـ `getItem` وحوّله إلى رقم بـ `Number`، ثم زِده واحدًا", en: "Read `visits` with `getItem`, turn it into a number with `Number`, then add one" }, test: ({ files }) => /getItem\(\s*["'`]visits["'`]\s*\)/.test(files.js ?? "") && /Number\(|parseInt\(|\+\s*localStorage/.test(files.js ?? "") },
    { id: "count", label: { ar: "احفظ العدد الجديد بـ `setItem(\"visits\", ...)`", en: "Save the new count with `setItem(\"visits\", ...)`" }, test: ({ logs }) => c(logs, "visits", 1) },
    { id: "show", label: { ar: "اعرضه في `#visits` بالشكل `Visits: 1`", en: "Show it in `#visits` as `Visits: 1`" }, test: ({ logs }) => c(logs, "shown", "Visits: 1") },
  ],
  hints: [
    { ar: '`const visits = Number(localStorage.getItem("visits") ?? 0) + 1;`', en: '`const visits = Number(localStorage.getItem("visits") ?? 0) + 1;`' },
    { ar: '`localStorage.setItem("visits", String(visits));` ثم `document.querySelector("#visits").textContent = `Visits: ${visits}`;`', en: '`localStorage.setItem("visits", String(visits));` then `document.querySelector("#visits").textContent = `Visits: ${visits}`;`' },
  ],
  deep: {
    more: [
      { icon: "📏", ar: "السعة حوالي 5 ميغابايت لكل موقع، والقراءة **متزامنة** توقف الصفحة لحظة. للبيانات الكبيرة أو الصور استخدم **IndexedDB**.", en: "The quota is about 5 MB per site, and reads are **synchronous**, briefly blocking the page. For big data or images use **IndexedDB**." },
      { icon: "🔐", ar: "localStorage يقرؤه أي سكربت على صفحتك، لذلك **لا تحفظ فيه كلمات سر أو رموز دخول حساسة**؛ ثغرة XSS واحدة تكشفها. الرموز الأفضل في كوكي `HttpOnly`.", en: "Any script on your page can read localStorage, so **never keep passwords or sensitive login tokens there**; one XSS hole exposes them. Tokens belong in an `HttpOnly` cookie." },
      { icon: "🗂️", ar: "`sessionStorage` له نفس الدوال لكنه يُمسح عند إغلاق التبويب: مناسب لمسودة نموذج مؤقتة.", en: "`sessionStorage` has the same methods but clears when the tab closes: good for a temporary form draft." },
    ],
    mistakes: [
      { ar: "`localStorage.setItem(\"user\", user)` يحفظ `[object Object]` ← استخدم `JSON.stringify(user)`.", en: "`localStorage.setItem(\"user\", user)` stores `[object Object]` → use `JSON.stringify(user)`." },
      { ar: "`getItem(\"visits\") + 1` يعطي `\"01\"` لأن القيمة نص ← حوّلها بـ `Number(...)` أولًا.", en: "`getItem(\"visits\") + 1` gives `\"01\"` because the value is text → convert with `Number(...)` first." },
      { ar: "`JSON.parse(null)` لا يفشل لكن `JSON.parse(\"\")` يفشل ← استخدم قيمة افتراضية: `?? \"null\"` أو `try/catch`.", en: "`JSON.parse(null)` is fine but `JSON.parse(\"\")` throws → use a default: `?? \"null\"` or `try/catch`." },
    ],
  },
  xp: 30,
};

export const browserApis: Lesson = reading({
  slug: "browser-apis",
  title: { ar: "قدرات المتصفح: الموقع والحافظة والإشعارات", en: "Browser powers: location, clipboard and notifications" },
  body: [
    { icon: "🧭", ar: "المتصفح الحديث يقدّم قدرات تشبه التطبيقات: **الموقع** `navigator.geolocation`، **الحافظة** `navigator.clipboard`، **الإشعارات** `Notification`، وحتى الكاميرا عبر `getUserMedia`.", en: "Modern browsers offer app-like powers: **location** `navigator.geolocation`, the **clipboard** `navigator.clipboard`, **notifications** `Notification`, even the camera via `getUserMedia`." },
    { icon: "🙋", ar: "القدرات الحساسة تطلب **إذن المستخدم** وتعمل فقط على **HTTPS**. المتصفح يعرض نافذة السؤال بنفسه، وأنت تتعامل مع الموافقة أو الرفض.", en: "Sensitive powers ask for the **user's permission** and only work on **HTTPS**. The browser shows the prompt itself; you handle yes or no." },
    { icon: "📋", ar: "زر \"نسخ\": `await navigator.clipboard.writeText(code)`. وللموقع: `navigator.geolocation.getCurrentPosition((pos) => …, (err) => …)` ثم `pos.coords.latitude`.", en: "A \"Copy\" button: `await navigator.clipboard.writeText(code)`. For location: `navigator.geolocation.getCurrentPosition((pos) => …, (err) => …)` then `pos.coords.latitude`." },
    { icon: "🔔", ar: "للإشعارات: `const p = await Notification.requestPermission();` ثم إذا كانت `\"granted\"`: `new Notification(\"Saved!\")`. اطلبها فقط بعد أن يضغط المستخدم زرًا يريد ذلك.", en: "For notifications: `const p = await Notification.requestPermission();` then, if `\"granted\"`: `new Notification(\"Saved!\")`. Only ask after the user taps a button that wants it." },
  ],
  example: {
    code: 'async function copyCode(text) {\n  try {\n    await navigator.clipboard.writeText(text);\n    alert("Copied!");\n  } catch {\n    alert("Copy not allowed here");\n  }\n}\n\nnavigator.geolocation.getCurrentPosition(\n  (pos) => console.log(pos.coords.latitude, pos.coords.longitude),\n  (err) => console.log("No location:", err.message),\n);',
    note: { ar: "نسخ نص، وقراءة الموقع مع التعامل مع الرفض.", en: "Copying text, and reading the location while handling a refusal." },
    lang: "none",
  },
  quiz: [
    { id: "q1", prompt: { ar: "لماذا لا تعمل قدرة الموقع على صفحة `http://` عادية؟", en: "Why doesn't location work on a plain `http://` page?" }, options: [{ ar: "القدرات الحساسة تتطلب HTTPS", en: "Sensitive powers require HTTPS" }, { ar: "لأنها قديمة", en: "Because it's outdated" }, { ar: "تعمل دائمًا", en: "It always works" }], answer: 0 },
    { id: "q2", prompt: { ar: "كيف تنسخ نصًا إلى الحافظة؟", en: "How do you copy text to the clipboard?" }, options: [{ ar: "`await navigator.clipboard.writeText(text)`", en: "`await navigator.clipboard.writeText(text)`" }, { ar: "`document.copy(text)`", en: "`document.copy(text)`" }, { ar: "`localStorage.copy(text)`", en: "`localStorage.copy(text)`" }], answer: 0 },
    { id: "q3", prompt: { ar: "متى تطلب إذن الإشعارات؟", en: "When should you ask for notification permission?" }, options: [{ ar: "بعد أن يضغط المستخدم زرًا يطلبها", en: "After the user taps a button that wants it" }, { ar: "فور فتح الموقع", en: "As soon as the site opens" }, { ar: "لا داعي للإذن", en: "No permission needed" }], answer: 0 },
  ],
  deep: {
    more: [
      { icon: "📲", ar: "مع **PWA** (تطبيق ويب تقدّمي) يمكن تثبيت موقعك على الشاشة الرئيسية، والعمل دون اتصال عبر Service Worker، واستقبال إشعارات حتى والموقع مغلق.", en: "With a **PWA** (progressive web app) your site can be installed on the home screen, work offline through a Service Worker, and receive notifications even when closed." },
      { icon: "🧪", ar: "تحقق من دعم الميزة قبل استخدامها: `if (\"geolocation\" in navigator) { … }`. هذا يسمى **feature detection** ويحمي موقعك على المتصفحات القديمة.", en: "Check support before using a feature: `if (\"geolocation\" in navigator) { … }`. This is **feature detection**, and it protects your site on older browsers." },
      { icon: "🔍", ar: "`navigator.permissions.query({ name: \"geolocation\" })` يخبرك بحالة الإذن (`granted` أو `denied` أو `prompt`) دون أن تزعج المستخدم بسؤال.", en: "`navigator.permissions.query({ name: \"geolocation\" })` tells you the permission state (`granted`, `denied` or `prompt`) without bothering the user with a prompt." },
    ],
    mistakes: [
      { ar: "تجاهل حالة الرفض فيبقى الموقع ينتظر ← مرّر دالة خطأ ثانية واعرض بديلًا.", en: "Ignoring a refusal so the site waits forever → pass a second error callback and show a fallback." },
      { ar: "طلب الإشعارات عند أول زيارة فيرفضها المستخدم للأبد ← اطلبها في لحظة يفهم فيها الفائدة.", en: "Asking for notifications on the first visit so the user blocks them for good → ask at a moment where the benefit is clear." },
      { ar: "اختبار الميزة على `http://` عبر الشبكة المحلية ثم الحيرة لماذا لا تعمل ← استخدم `localhost` أو HTTPS.", en: "Testing on `http://` over the local network and wondering why it fails → use `localhost` or HTTPS." },
    ],
  },
  xp: 20,
});

/* ------------------------------------------------------------------ React */

const PEOPLE_URL = `data:application/json,${encodeURIComponent(JSON.stringify([{ id: 1, name: "Sara" }, { id: 2, name: "Omar" }, { id: 3, name: "Lina" }]))}`;

export const dataLoading: Lesson = {
  slug: "data-loading",
  runtime: "react",
  title: { ar: "تحميل البيانات: انتظر ثم اعرض", en: "Loading data: wait, then show" },
  body: [
    { icon: "🌐", ar: "الآن نجمع `useEffect` و `fetch`: نجلب البيانات **مرة واحدة** عند ظهور المكوّن، لذلك نستعمل `[]` فارغة.", en: "Now we combine `useEffect` and `fetch`: fetch the data **once** when the component shows, so use an empty `[]`." },
    { icon: "🗃️", ar: "حالتان بـ `useState`: `const [people, setPeople] = useState([]);` للبيانات، و `const [loading, setLoading] = useState(true);` لنعرف هل ما زلنا ننتظر.", en: "Two pieces of state with `useState`: `const [people, setPeople] = useState([]);` for the data, and `const [loading, setLoading] = useState(true);` to know if we're still waiting." },
    { icon: "⏳", ar: "دالة `useEffect` نفسها لا تكون `async`، فنعرّف داخلها دالة `async function load() { … }` ونستدعيها. وبعد وصول البيانات: `setPeople(...)` ثم `setLoading(false)`. وفي العرض: `if (loading) return <p>Loading…</p>;`.", en: "The `useEffect` callback itself can't be `async`, so define `async function load() { … }` inside it and call it. When the data arrives: `setPeople(...)`, then `setLoading(false)`. In the render: `if (loading) return <p>Loading…</p>;`." },
  ],
  example: {
    code: 'function App() {\n  const [loading, setLoading] = useState(true);\n  useEffect(() => {\n    const id = setTimeout(() => setLoading(false), 1200);\n    return () => clearTimeout(id);\n  }, []);\n  if (loading) return <p>⏳ Loading…</p>;\n  return <h2>Ready ✅</h2>;\n}',
    note: { ar: "حالة تحميل ثم المحتوى.", en: "A loading state, then the content." },
  },
  files: ["js"],
  starter: { js: `const PEOPLE_URL = "${PEOPLE_URL}";\n\nexport default function App() {\n  \n}\n` },
  solution: {
    js: `const PEOPLE_URL = "${PEOPLE_URL}";\n\nexport default function App() {\n  const [people, setPeople] = useState([]);\n  const [loading, setLoading] = useState(true);\n\n  useEffect(() => {\n    async function load() {\n      const res = await fetch(PEOPLE_URL);\n      setPeople(await res.json());\n      setLoading(false);\n    }\n    load();\n  }, []);\n\n  if (loading) return <p>Loading…</p>;\n\n  return (\n    <ul>\n      {people.map((p) => (\n        <li key={p.id}>{p.name}</li>\n      ))}\n    </ul>\n  );\n}\n`,
  },
  settle: 1200,
  harness: `(function () {
    var root = document.getElementById("root");
    console.log("__c__ loading " + /loading/i.test(root.textContent));
    setTimeout(function () {
      var lis = root.querySelectorAll("li");
      console.log("__c__ list " + (lis.length === 3 && /Sara/.test(root.textContent) && /Lina/.test(root.textContent)));
      console.log("__c__ done " + !/loading/i.test(root.textContent));
    }, 500);
  })();`,
  tasks: [
    { id: "loading", label: { ar: "حالة `loading` تبدأ `true`، واعرض `Loading…` ما دامت كذلك", en: "A `loading` state starting at `true`, and show `Loading…` while it is" }, test: ({ logs, files }) => c(logs, "loading", true) || (/useState\(\s*true\s*\)/.test(files.js ?? "") && /if\s*\(\s*loading\s*\)/.test(files.js ?? "")) },
    { id: "fetch", label: { ar: "اجلب `PEOPLE_URL` داخل `useEffect` مع `[]`", en: "Fetch `PEOPLE_URL` inside `useEffect` with `[]`" }, test: ({ files }) => /useEffect\([\s\S]*fetch\(\s*PEOPLE_URL\s*\)/.test(files.js ?? "") },
    { id: "list", label: { ar: "بعد الوصول أوقف التحميل واعرض كل اسم في `<li>`", en: "When it arrives, stop loading and show each name in an `<li>`" }, test: ({ logs }) => c(logs, "list", true) && c(logs, "done", true) },
  ],
  hints: [
    { ar: '`const [loading, setLoading] = useState(true);` و `if (loading) return <p>Loading…</p>;`', en: '`const [loading, setLoading] = useState(true);` and `if (loading) return <p>Loading…</p>;`' },
    { ar: "`useEffect(() => { async function load() { const res = await fetch(PEOPLE_URL); setPeople(await res.json()); setLoading(false); } load(); }, []);`", en: "`useEffect(() => { async function load() { const res = await fetch(PEOPLE_URL); setPeople(await res.json()); setLoading(false); } load(); }, []);`" },
  ],
  deep: {
    more: [
      { icon: "📡", ar: "`fetch` لا يرمي خطأ عند `404` أو `500`؛ يرمي فقط إذا انقطعت الشبكة. تحقق بنفسك: `if (!res.ok) throw new Error(res.status);`.", en: "`fetch` doesn't throw on `404` or `500`; it only throws when the network fails. Check yourself: `if (!res.ok) throw new Error(res.status);`." },
      { icon: "🧯", ar: "الخطوة التالية في المشاريع الحقيقية: حالة **خطأ**. ضع الجلب داخل `try { … } catch { setError(\"…\") } finally { setLoading(false) }` واعرض `if (error) return <p>{error}</p>;`.", en: "The next step in real projects: an **error** state. Wrap the fetch in `try { … } catch { setError(\"…\") } finally { setLoading(false) }` and render `if (error) return <p>{error}</p>;`." },
      { icon: "🦴", ar: "بدل كلمة \"Loading\" يستخدم المحترفون **هياكل عظمية** (skeletons): مستطيلات رمادية بشكل المحتوى، فيبدو التحميل أسرع.", en: "Instead of the word \"Loading\", pros use **skeletons**: grey shapes of the content, which make loading feel faster." },
      { icon: "🧰", ar: "في التطبيقات الكبيرة، **TanStack Query** أو `use()` مع Suspense في React 19 يديران التحميل والتخزين المؤقت وإعادة المحاولة عنك.", en: "In bigger apps, **TanStack Query**, or `use()` with Suspense in React 19, handle loading, caching and retries for you." },
    ],
    mistakes: [
      { ar: "جعل دالة `useEffect` نفسها `async` ← عرّف دالة async بداخلها واستدعها.", en: "Making the `useEffect` callback itself `async` → define an async function inside and call it." },
      { ar: "نسيان `[]` في `useEffect` فيُعاد الجلب مع كل عرض إلى ما لا نهاية ← أضف مصفوفة الاعتماديات.", en: "Forgetting `[]` in `useEffect` so it refetches on every render forever → add the dependency array." },
      { ar: "عرض `people.map` قبل وصول البيانات وهي `undefined` ← ابدأ الحالة بمصفوفة فارغة `useState([])`.", en: "Rendering `people.map` before data arrives while it's `undefined` → start the state as an empty array `useState([])`." },
    ],
  },
  xp: 35,
};

export const routing: Lesson = {
  slug: "routing",
  runtime: "react",
  title: { ar: "الصفحات والتوجيه", en: "Pages and routing" },
  body: [
    { icon: "🗺️", ar: "الموقع الحقيقي عدة **صفحات**: الرئيسية، من نحن، تواصل. في تطبيقات React الصفحة تتبدل دون إعادة تحميل كاملة، وهذا يسمى **التوجيه** (routing).", en: "A real site has several **pages**: home, about, contact. In React apps the page switches without a full reload; this is **routing**." },
    { icon: "🧭", ar: "مع **React Router**: `<Route path=\"/about\" element={<About />} />` و `<Link to=\"/about\">About</Link>`. ومع **Next.js** كل ملف في `app/` صفحة: `app/about/page.tsx` هي `/about`، والرابط `<Link href=\"/about\">`.", en: "With **React Router**: `<Route path=\"/about\" element={<About />} />` and `<Link to=\"/about\">About</Link>`. With **Next.js**, every file in `app/` is a page: `app/about/page.tsx` is `/about`, linked with `<Link href=\"/about\">`." },
    { icon: "🧠", ar: "تحت كل ذلك فكرة واحدة: حالة تحفظ **الصفحة الحالية**، وتعرض المكوّن المناسب. سنبنيها بأنفسنا بـ `useState` لنفهم ما تفعله المكتبات.", en: "Underneath is one idea: state holding the **current page**, rendering the matching component. We'll build it ourselves with `useState` to understand what the libraries do." },
  ],
  example: {
    code: 'const pages = { home: <h1>🏠 Home</h1>, about: <h1>ℹ️ About</h1> };\n\nfunction App() {\n  const [page, setPage] = useState("home");\n  return (\n    <div>\n      <nav>\n        <button onClick={() => setPage("home")}>Home</button>\n        <button onClick={() => setPage("about")}>About</button>\n      </nav>\n      {pages[page]}\n    </div>\n  );\n}',
    note: { ar: "قائمة تنقل تبدّل الصفحة الظاهرة.", en: "A menu that switches the visible page." },
  },
  files: ["js"],
  starter: { js: "function Home() {\n  return <h1>Home</h1>;\n}\n\nfunction About() {\n  return <h1>About</h1>;\n}\n\nfunction Contact() {\n  return <h1>Contact</h1>;\n}\n\nexport default function App() {\n  \n}\n" },
  solution: {
    js: 'function Home() {\n  return <h1>Home</h1>;\n}\n\nfunction About() {\n  return <h1>About</h1>;\n}\n\nfunction Contact() {\n  return <h1>Contact</h1>;\n}\n\nexport default function App() {\n  const [page, setPage] = useState("home");\n  return (\n    <div>\n      <nav>\n        <button className={page === "home" ? "active" : ""} onClick={() => setPage("home")}>Home</button>\n        <button className={page === "about" ? "active" : ""} onClick={() => setPage("about")}>About</button>\n        <button className={page === "contact" ? "active" : ""} onClick={() => setPage("contact")}>Contact</button>\n      </nav>\n      {page === "home" && <Home />}\n      {page === "about" && <About />}\n      {page === "contact" && <Contact />}\n    </div>\n  );\n}\n',
  },
  settle: 900,
  harness: steps(`var h1 = function () { var h = root.querySelector("h1"); return h ? h.textContent.trim() : ""; };
    console.log("__c__ start " + (h1() === "Home" && root.querySelectorAll("nav button").length >= 3));
    var a = btn("about"); if (a) a.click(); await wait();
    console.log("__c__ about " + (h1() === "About" && !!btn("about") && btn("about").classList.contains("active")));
    var c2 = btn("contact"); if (c2) c2.click(); await wait();
    console.log("__c__ contact " + (h1() === "Contact" && !btn("about").classList.contains("active")));`),
  tasks: [
    { id: "state", label: { ar: "حالة `page` تبدأ بـ `\"home\"`", en: "A `page` state starting at `\"home\"`" }, test: ({ files }) => /useState\(\s*["'`]home["'`]\s*\)/.test(files.js ?? "") },
    { id: "nav", label: { ar: "`<nav>` فيه أزرار `Home` و `About` و `Contact`، وتبدأ بصفحة Home", en: "A `<nav>` with `Home`, `About` and `Contact` buttons, starting on Home" }, test: ({ logs }) => c(logs, "start", true) },
    { id: "about", label: { ar: "زر About يعرض صفحة About ويأخذ الصنف `active`", en: "About shows the About page and gets the `active` class" }, test: ({ logs }) => c(logs, "about", true) },
    { id: "contact", label: { ar: "زر Contact يعرض صفحة Contact، و `active` ينتقل معه", en: "Contact shows the Contact page, and `active` moves with it" }, test: ({ logs }) => c(logs, "contact", true) },
  ],
  hints: [
    { ar: '`const [page, setPage] = useState("home");` ثم اعرض `{page === "home" && <Home />}` وهكذا، أو استخدم كائنًا يربط الاسم بالمكوّن.', en: '`const [page, setPage] = useState("home");` then render `{page === "home" && <Home />}` and so on, or use an object mapping names to components.' },
    { ar: '`<button className={page === "about" ? "active" : ""} onClick={() => setPage("about")}>About</button>`', en: '`<button className={page === "about" ? "active" : ""} onClick={() => setPage("about")}>About</button>`' },
  ],
  deep: {
    more: [
      { icon: "🔗", ar: "المكتبات الحقيقية تربط الصفحة **بالرابط** في شريط العنوان (History API)، فيعمل زر الرجوع، ويمكن مشاركة رابط صفحة معينة وحفظها في المفضلة.", en: "Real libraries tie the page to the **URL** in the address bar (History API), so the back button works and a specific page can be shared or bookmarked." },
      { icon: "🧩", ar: "المسارات الديناميكية: `/products/:id` في React Router أو `app/products/[id]/page.tsx` في Next.js، صفحة واحدة تعرض أي منتج حسب رقمه.", en: "Dynamic routes: `/products/:id` in React Router or `app/products/[id]/page.tsx` in Next.js: one page that shows any product by its id." },
      { icon: "🔍", ar: "لمحركات البحث، Next.js أفضل من التوجيه في المتصفح فقط: يرسل HTML جاهزًا لكل صفحة، فيقرؤها Google بسهولة ويظهر موقعك أسرع.", en: "For search engines, Next.js beats browser-only routing: it sends ready HTML for each page, so Google reads it easily and your site shows up faster." },
    ],
    mistakes: [
      { ar: "استخدام `<a href>` للتنقل الداخلي فيُعاد تحميل التطبيق كله ← استخدم `<Link>` من المكتبة.", en: "Using `<a href>` for internal navigation so the whole app reloads → use the library's `<Link>`." },
      { ar: "نسيان صفحة 404 لمسار غير موجود ← أضف مسارًا افتراضيًا يعرض \"الصفحة غير موجودة\".", en: "Forgetting a 404 page for unknown paths → add a fallback route that shows \"Page not found\"." },
      { ar: "تكرار نفس الترويسة والقائمة في كل صفحة ← ضعها في **layout** مشترك يغلّف الصفحات.", en: "Repeating the same header and menu on every page → put them in a shared **layout** that wraps the pages." },
    ],
  },
  xp: 35,
};

/* ------------------------------------------------------------------ Backend */

const SQL_START =
  'const Database = require("better-sqlite3");\nconst db = new Database(":memory:");\n\ndb.exec(`\n  CREATE TABLE users (id INTEGER PRIMARY KEY, name TEXT NOT NULL, city TEXT, age INTEGER);\n  INSERT INTO users (name, city, age) VALUES\n    (\'Sara\', \'Tunis\', 24), (\'Omar\', \'Cairo\', 17), (\'Lina\', \'Rabat\', 31), (\'Adam\', \'Tunis\', 19);\n`);\n\n';

const SQL_HARNESS = (body: string) => `try { ${body} } catch (e) { console.log("__q__ error " + (e && e.message)); }`;
/** No value glued into SQL text with + or \${}. */
const safeSql = (js: string) => !/prepare\(\s*`[^`]*\$\{/.test(js) && !/prepare\([^)]*\+/.test(js);

export const sqlPractice: Lesson = {
  slug: "sql-practice",
  runtime: "server",
  title: { ar: "SQL عمليًا: القراءة بـ SELECT", en: "SQL in practice: reading with SELECT" },
  body: [
    { icon: "🗄️", ar: "هنا قاعدة بيانات **SQLite حقيقية** تعمل داخل التطبيق، وفيها جدول `users` جاهز بأربعة أشخاص. نستخدمها من Node.js بمكتبة `better-sqlite3`، كما في المشاريع الصغيرة الحقيقية.", en: "Here's a **real SQLite** database running inside the app, with a ready `users` table of four people. We use it from Node.js with the `better-sqlite3` library, as small real projects do." },
    { icon: "🔎", ar: "القراءة خطوتان: `db.prepare(\"SELECT …\")` يجهّز الاستعلام، ثم `.all(…)` تُرجع **مصفوفة صفوف**، كل صف كائن مثل `{ name: \"Sara\" }`.", en: "Reading takes two steps: `db.prepare(\"SELECT …\")` prepares the query, then `.all(…)` returns an **array of rows**, each an object like `{ name: \"Sara\" }`." },
    { icon: "🛡️", ar: "علامة `?` مكان القيمة، والقيمة تُمرَّر داخل `.all(18)`. هكذا تضعها القاعدة بأمان. `WHERE age >= ?` يختار، و `ORDER BY name` يرتّب أبجديًا.", en: "A `?` stands for the value, which you pass in `.all(18)`. That way the database inserts it safely. `WHERE age >= ?` picks rows, and `ORDER BY name` sorts them alphabetically." },
  ],
  example: {
    code: SQL_START + 'const rows = db.prepare("SELECT name, age FROM users WHERE age < ?").all(20);\nconsole.log(rows);\nconsole.log(rows.map((row) => row.name));',
    note: { ar: "الصفوف كاملة، ثم الأسماء فقط بـ map.", en: "The full rows, then just the names with map." },
  },
  files: ["js"],
  starter: { js: SQL_START + "// adults(): names of users aged 18 or more, sorted by name\n\n" },
  solution: {
    js: SQL_START + 'function adults() {\n  const rows = db.prepare("SELECT name FROM users WHERE age >= ? ORDER BY name").all(18);\n  return rows.map((row) => row.name);\n}\n\nconsole.log(adults());\n',
  },
  settle: 2500,
  harness: SQL_HARNESS('console.log("__q__ adults " + JSON.stringify(adults()));'),
  tasks: [
    { id: "adults", label: { ar: "اكتب دالة `adults()` تُرجع أسماء من عمرهم 18 فأكثر مرتبة: `[\"Adam\", \"Lina\", \"Sara\"]`", en: "Write a function `adults()` returning the names of users aged 18+, sorted: `[\"Adam\", \"Lina\", \"Sara\"]`" }, test: ({ logs }) => exact(logs, '__q__ adults ["Adam","Lina","Sara"]') },
    { id: "safe", label: { ar: "مرّر 18 عبر `?` وليس داخل نص SQL", en: "Pass 18 through `?`, not inside the SQL text" }, test: ({ files }) => /age\s*>=?\s*\?/i.test(files.js ?? "") && safeSql(files.js ?? "") },
  ],
  hints: [
    { ar: '`db.prepare("SELECT name FROM users WHERE age >= ? ORDER BY name").all(18)`', en: '`db.prepare("SELECT name FROM users WHERE age >= ? ORDER BY name").all(18)`' },
    { ar: "الناتج صفوف، فحوّلها لأسماء: `rows.map((row) => row.name)`", en: "The result is rows, so turn them into names: `rows.map((row) => row.name)`" },
  ],
  deep: {
    more: [
      { icon: "🔗", ar: "الجداول المرتبطة تُجمع بـ **JOIN**: `SELECT orders.id, users.name FROM orders JOIN users ON users.id = orders.user_id`. هذا قلب قواعد البيانات العلائقية.", en: "Related tables come together with **JOIN**: `SELECT orders.id, users.name FROM orders JOIN users ON users.id = orders.user_id`. That's the heart of relational databases." },
      { icon: "⚡", ar: "**الفهرس** (index) يسرّع البحث كفهرس الكتاب: `CREATE INDEX idx_users_city ON users(city);`. بدونه تقرأ القاعدة كل الصفوف.", en: "An **index** speeds up lookups like a book's index: `CREATE INDEX idx_users_city ON users(city);`. Without one the database reads every row." },
      { icon: "☁️", ar: "SQLite ممتاز للبداية والتطبيقات الصغيرة. للمواقع الكبيرة يستخدم الناس **PostgreSQL** (مثل Supabase و Neon)، ونفس SQL تقريبًا يعمل هناك.", en: "SQLite is great for starting out and small apps. Big sites use **PostgreSQL** (e.g. Supabase or Neon), and almost the same SQL works there." },
    ],
    mistakes: [
      { ar: "`prepare(\"… WHERE name = '\" + name + \"'\")` يفتح ثغرة SQL injection ← استخدم `?` ومرّر القيمة.", en: "`prepare(\"… WHERE name = '\" + name + \"'\")` opens an SQL injection hole → use `?` and pass the value." },
      { ar: "`UPDATE users SET age = 20` بدون `WHERE` يغيّر **كل** الصفوف ← اكتب الشرط دائمًا وجرّب بـ `SELECT` أولًا.", en: "`UPDATE users SET age = 20` without `WHERE` changes **every** row → always write the condition and try it as a `SELECT` first." },
      { ar: "انتظار ترتيب معيّن دون `ORDER BY` ← القاعدة لا تضمن أي ترتيب إلا إذا طلبته.", en: "Expecting a particular order without `ORDER BY` → the database guarantees no order unless you ask." },
    ],
  },
  xp: 35,
};

export const sqlWrite: Lesson = {
  slug: "sql-write",
  runtime: "server",
  title: { ar: "SQL عمليًا: الإضافة بـ INSERT", en: "SQL in practice: adding with INSERT" },
  body: [
    { icon: "✍️", ar: "لإضافة صف: `INSERT INTO users (name, city, age) VALUES (?, ?, ?)`. الأعمدة بين القوسين الأولين، وعلامة `?` لكل قيمة.", en: "To add a row: `INSERT INTO users (name, city, age) VALUES (?, ?, ?)`. The columns go in the first brackets, and one `?` per value." },
    { icon: "▶️", ar: "للكتابة نستعمل `.run(name, city, age)` بدل `.all`، والقيم تملأ علامات `?` بالترتيب.", en: "For writing, use `.run(name, city, age)` instead of `.all`; the values fill the `?` marks in order." },
    { icon: "🆔", ar: "`.run` تُرجع كائنًا فيه `lastInsertRowid`: رقم الصف الجديد الذي أعطته القاعدة تلقائيًا.", en: "`.run` returns an object with `lastInsertRowid`: the new row's id, given by the database automatically." },
  ],
  example: {
    code: SQL_START + 'const result = db.prepare("INSERT INTO users (name, city, age) VALUES (?, ?, ?)").run("Hana", "Tunis", 28);\nconsole.log(result.lastInsertRowid);',
    note: { ar: "صف جديد، ورقمه 5 لأن الجدول فيه 4.", en: "A new row, id 5 since the table had 4." },
  },
  files: ["js"],
  starter: { js: SQL_START + "// addUser(name, city, age): insert a row safely with ? and return its new id\n\n" },
  solution: {
    js: SQL_START + 'function addUser(name, city, age) {\n  const result = db.prepare("INSERT INTO users (name, city, age) VALUES (?, ?, ?)").run(name, city, age);\n  return result.lastInsertRowid;\n}\n\nconsole.log(addUser("Nour", "Cairo", 22));\n',
  },
  settle: 2500,
  harness: SQL_HARNESS('var id = addUser("Hana", "Rabat", 28); var last = db.prepare("SELECT MAX(id) AS id FROM users").get().id; console.log("__q__ id " + (id === last)); console.log("__q__ added " + JSON.stringify(db.prepare("SELECT name, city, age FROM users WHERE id = ?").get(last)));'),
  tasks: [
    { id: "insert", label: { ar: "اكتب دالة `addUser(name, city, age)` تضيف صفًا بـ `INSERT`", en: "Write a function `addUser(name, city, age)` that adds a row with `INSERT`" }, test: ({ logs }) => exact(logs, '__q__ added {"name":"Hana","city":"Rabat","age":28}') },
    { id: "id", label: { ar: "وتُرجع رقم الصف الجديد `lastInsertRowid`", en: "and returns the new row's `lastInsertRowid`" }, test: ({ logs }) => exact(logs, "__q__ id true") },
    { id: "safe", label: { ar: "كل القيم عبر `VALUES (?, ?, ?)` وليس بلصقها في النص", en: "Every value goes through `VALUES (?, ?, ?)`, never pasted into the text" }, test: ({ files }) => /VALUES\s*\(\s*\?\s*,\s*\?\s*,\s*\?\s*\)/i.test(files.js ?? "") && safeSql(files.js ?? "") },
  ],
  hints: [
    { ar: '`db.prepare("INSERT INTO users (name, city, age) VALUES (?, ?, ?)").run(name, city, age)`', en: '`db.prepare("INSERT INTO users (name, city, age) VALUES (?, ?, ?)").run(name, city, age)`' },
    { ar: "احفظ النتيجة ثم `return result.lastInsertRowid;`", en: "Keep the result, then `return result.lastInsertRowid;`" },
  ],
  deep: {
    more: [
      { icon: "♻️", ar: "`UPDATE users SET city = ? WHERE id = ?` يغيّر صفًا، و `DELETE FROM users WHERE id = ?` يحذفه. ومعهما `.run` أيضًا، و `result.changes` يقول كم صفًا تغيّر.", en: "`UPDATE users SET city = ? WHERE id = ?` changes a row and `DELETE FROM users WHERE id = ?` removes it. Both use `.run` too, and `result.changes` says how many rows changed." },
      { icon: "📦", ar: "لإضافة صفوف كثيرة بسرعة وأمان استخدم **transaction**: إما أن تنجح كلها أو لا يُحفظ شيء.", en: "To add many rows quickly and safely, use a **transaction**: either they all succeed or nothing is saved." },
      { icon: "🧱", ar: "`NOT NULL` في تعريف الجدول تمنع صفًا بلا اسم، و `UNIQUE` تمنع تكرار بريد مثلًا: القاعدة نفسها تحرس بياناتك.", en: "`NOT NULL` in the table definition blocks a row without a name, and `UNIQUE` blocks a repeated email, for example: the database itself guards your data." },
    ],
    mistakes: [
      { ar: "`VALUES ('\" + name + \"', …)` ← ثغرة SQL injection. استخدم `?` دائمًا.", en: "`VALUES ('\" + name + \"', …)` → an SQL injection hole. Always use `?`." },
      { ar: "عدد علامات `?` لا يساوي عدد القيم في `.run` ← خطأ. علامة لكل قيمة وبنفس الترتيب.", en: "The number of `?` marks doesn't match the values in `.run` → error. One mark per value, in the same order." },
      { ar: "استعمال `.all` مع `INSERT` ← `.all` للقراءة. للكتابة استعمل `.run`.", en: "Using `.all` with `INSERT` → `.all` is for reading. Use `.run` for writing." },
    ],
  },
  xp: 35,
};

export const sqlGroup: Lesson = {
  slug: "sql-group",
  runtime: "server",
  title: { ar: "SQL عمليًا: العدّ بـ GROUP BY", en: "SQL in practice: counting with GROUP BY" },
  body: [
    { icon: "📊", ar: "`COUNT(*)` يعدّ الصفوف: `SELECT COUNT(*) AS total FROM users` يعطي `{ total: 4 }`. و `AS total` يعطي النتيجة اسمًا.", en: "`COUNT(*)` counts rows: `SELECT COUNT(*) AS total FROM users` gives `{ total: 4 }`. `AS total` gives the result a name." },
    { icon: "🧺", ar: "`GROUP BY city` يجمع الصفوف التي لها نفس المدينة في مجموعة، و `COUNT(*)` يعدّ كل مجموعة على حدة.", en: "`GROUP BY city` puts rows with the same city in one group, and `COUNT(*)` counts each group separately." },
    { icon: "🔤", ar: "الترتيب في الآخر: `… GROUP BY city ORDER BY city`.", en: "Sorting goes last: `… GROUP BY city ORDER BY city`." },
  ],
  example: {
    code: SQL_START + 'const all = db.prepare("SELECT COUNT(*) AS total FROM users").get();\nconsole.log(all.total);\n\nconst byAge = db.prepare("SELECT age >= 18 AS adult, COUNT(*) AS total FROM users GROUP BY adult").all();\nconsole.log(byAge);',
    note: { ar: "عدد الكل، ثم العدد في كل مجموعة.", en: "The total count, then the count per group." },
  },
  files: ["js"],
  starter: { js: SQL_START + 'db.prepare("INSERT INTO users (name, city, age) VALUES (?, ?, ?)").run("Nour", "Cairo", 22);\n\n// countByCity(): [{ city, total }] using GROUP BY, sorted by city\n\n' },
  solution: {
    js: SQL_START + 'db.prepare("INSERT INTO users (name, city, age) VALUES (?, ?, ?)").run("Nour", "Cairo", 22);\n\nfunction countByCity() {\n  return db.prepare("SELECT city, COUNT(*) AS total FROM users GROUP BY city ORDER BY city").all();\n}\n\nconsole.log(countByCity());\n',
  },
  settle: 2500,
  harness: SQL_HARNESS('console.log("__q__ cities " + JSON.stringify(countByCity()));'),
  tasks: [
    { id: "group", label: { ar: "اكتب دالة `countByCity()` تعدّ المستخدمين لكل مدينة بـ `COUNT(*)` و `GROUP BY city`", en: "Write a function `countByCity()` that counts users per city with `COUNT(*)` and `GROUP BY city`" }, test: ({ files, logs }) => /GROUP\s+BY\s+city/i.test(files.js ?? "") && logs.some((l) => /^__q__ cities \[\{.*"total":\d/.test(l)) },
    { id: "shape", label: { ar: "النتيجة مرتبة بالمدينة: `[{ city: \"Cairo\", total: 2 }, …]`", en: "The result is sorted by city: `[{ city: \"Cairo\", total: 2 }, …]`" }, test: ({ logs }) => exact(logs, '__q__ cities [{"city":"Cairo","total":2},{"city":"Rabat","total":1},{"city":"Tunis","total":2}]') },
  ],
  hints: [
    { ar: '`db.prepare("SELECT city, COUNT(*) AS total FROM users GROUP BY city ORDER BY city").all()`', en: '`db.prepare("SELECT city, COUNT(*) AS total FROM users GROUP BY city ORDER BY city").all()`' },
    { ar: "اسم العمود يجب أن يكون `total`، لذلك اكتب `COUNT(*) AS total`.", en: "The column must be named `total`, so write `COUNT(*) AS total`." },
  ],
  deep: {
    more: [
      { icon: "➕", ar: "دوال تجميع أخرى: `SUM(price)` للمجموع، `AVG(age)` للمتوسط، `MAX` و `MIN` للأكبر والأصغر.", en: "Other aggregate functions: `SUM(price)` for a total, `AVG(age)` for an average, `MAX` and `MIN` for the largest and smallest." },
      { icon: "🧹", ar: "`HAVING` يصفّي المجموعات بعد العدّ: `… GROUP BY city HAVING COUNT(*) > 1` يُظهر المدن التي فيها أكثر من شخص.", en: "`HAVING` filters groups after counting: `… GROUP BY city HAVING COUNT(*) > 1` shows cities with more than one person." },
      { icon: "📈", ar: "هذه الاستعلامات قلب لوحات الإحصاءات: عدد الطلبات كل يوم، المبيعات لكل منتج، المستخدمون لكل بلد.", en: "These queries power dashboards: orders per day, sales per product, users per country." },
    ],
    mistakes: [
      { ar: "اختيار عمود ليس في `GROUP BY` مثل `SELECT name, city, COUNT(*) … GROUP BY city` ← القيمة عشوائية. اختر أعمدة المجموعة والدوال فقط.", en: "Selecting a column not in `GROUP BY`, like `SELECT name, city, COUNT(*) … GROUP BY city` → the value is arbitrary. Select only grouped columns and aggregates." },
      { ar: "وضع `ORDER BY` قبل `GROUP BY` ← خطأ صياغة. الترتيب: `SELECT … FROM … WHERE … GROUP BY … ORDER BY …`.", en: "Putting `ORDER BY` before `GROUP BY` → syntax error. The order is `SELECT … FROM … WHERE … GROUP BY … ORDER BY …`." },
      { ar: "استعمال `WHERE COUNT(*) > 1` ← `WHERE` يعمل قبل العدّ. استخدم `HAVING`.", en: "Writing `WHERE COUNT(*) > 1` → `WHERE` runs before counting. Use `HAVING`." },
    ],
  },
  xp: 35,
};

const AUTH_START =
  'const express = require("express");\nconst bcrypt = require("bcryptjs");\nconst jwt = require("jsonwebtoken");\n\nconst app = express();\napp.use(express.json());\n\nconst SECRET = "dev-only-secret"; // in production: process.env.JWT_SECRET\nconst users = [];\n\n';

const AUTH_HARNESS =
`(async function () {
    if (typeof app === "undefined") { console.log("__a__ app false"); return; }
    var log = function (name, r) { console.log("__a__ " + name + " " + r.status + " " + JSON.stringify(r.body === undefined ? null : r.body)); };
    log("short", await app.request("POST", "/register", { email: "sara@mail.com", password: "123" }));
    var reg = await app.request("POST", "/register", { email: "sara@mail.com", password: "secret123" }); log("register", reg);
    log("dupe", await app.request("POST", "/register", { email: "sara@mail.com", password: "secret123" }));
    log("wrong", await app.request("POST", "/login", { email: "sara@mail.com", password: "nope-nope" }));
    var login = await app.request("POST", "/login", { email: "sara@mail.com", password: "secret123" });
    console.log("__a__ login " + login.status + " " + !!(login.body && login.body.token));
    log("anon", await app.request("GET", "/me", null, {}));
    var token = login.body && login.body.token;
    log("me", await app.request("GET", "/me", null, { Authorization: "Bearer " + token }));
    var stored = typeof users !== "undefined" && users[0] ? JSON.stringify(users[0]) : "";
    console.log("__a__ stored " + (stored.indexOf("secret123") < 0 && /\\$2[aby]?\\$/.test(stored)));
    console.log("__a__ leak " + (JSON.stringify(reg.body).indexOf("secret123") >= 0 || JSON.stringify(reg.body).indexOf("$2") >= 0));
  })();`;
/** The pieces of the auth server, built up over three lessons. */
const REGISTER = 'app.post("/register", async (req, res) => {\n  const { email, password } = req.body;\n  if (!email || !password || password.length < 8) {\n    return res.status(400).json({ error: "Email and a password of 8+ characters are required" });\n  }\n  if (users.some((u) => u.email === email)) {\n    return res.status(409).json({ error: "Email already registered" });\n  }\n  const passwordHash = await bcrypt.hash(password, 10);\n  users.push({ email, passwordHash });\n  res.status(201).json({ email });\n});\n\n';
const LOGIN = 'app.post("/login", async (req, res) => {\n  const { email, password } = req.body;\n  const user = users.find((u) => u.email === email);\n  if (!user || !(await bcrypt.compare(password, user.passwordHash))) {\n    return res.status(401).json({ error: "Wrong email or password" });\n  }\n  const token = jwt.sign({ email }, SECRET, { expiresIn: "1h" });\n  res.json({ token });\n});\n\n';
const ME = 'function requireAuth(req, res, next) {\n  const token = (req.headers.authorization ?? "").replace("Bearer ", "");\n  try {\n    req.user = jwt.verify(token, SECRET);\n    next();\n  } catch {\n    res.status(401).json({ error: "Please log in" });\n  }\n}\n\napp.get("/me", requireAuth, (req, res) => {\n  res.json({ email: req.user.email });\n});\n\n';
const LISTEN = "app.listen(3000);\n";

export const authRegister: Lesson = {
  slug: "auth-register",
  runtime: "server",
  title: { ar: "تسجيل حساب: تجزئة كلمة السر", en: "Signing up: hashing the password" },
  body: [
    { icon: "🔐", ar: "سنبني نظام دخول حقيقيًا على ثلاث خطوات: **التسجيل** (هذا الدرس)، ثم الدخول، ثم صفحة محمية. ونستعمل نفس مكتبات المشاريع الحقيقية.", en: "We'll build a real login system in three steps: **sign-up** (this lesson), then login, then a protected page, with the same libraries real projects use." },
    { icon: "🚦", ar: "تحقق أولًا ثم أجب: كلمة سر أقصر من 8 ← `400`، بريد مسجّل من قبل ← `409` (تعارض)، وإلا أضف المستخدم وأجب `201` (أُنشئ).", en: "Check first, then answer: a password under 8 characters → `400`, an email already registered → `409` (conflict), otherwise add the user and answer `201` (created)." },
    { icon: "🧂", ar: "**لا تحفظ كلمة السر كما هي أبدًا.** خزّن تجزئتها: `const passwordHash = await bcrypt.hash(password, 10);` ثم `users.push({ email, passwordHash });`. ولأن فيها `await` يكون المعالج `async`.", en: "**Never store a password as is.** Store its hash: `const passwordHash = await bcrypt.hash(password, 10);` then `users.push({ email, passwordHash });`. Since it uses `await`, the handler is `async`." },
  ],
  example: {
    code: 'const bcrypt = require("bcryptjs");\n\nasync function demo() {\n  const hash = await bcrypt.hash("secret123", 10);\n  console.log(hash);  // $2a$10$… never the real password\n}\n\ndemo();',
    note: { ar: "التجزئة نص طويل لا يكشف كلمة السر.", en: "The hash is a long text that doesn't reveal the password." },
    lang: "none",
  },
  files: ["js"],
  starter: { js: AUTH_START + "// POST /register  { email, password }\n\n" + LISTEN },
  solution: { js: AUTH_START + REGISTER + LISTEN },
  settle: 1500,
  harness: AUTH_HARNESS,
  tasks: [
    { id: "short", label: { ar: "`POST /register` يُرجع `400` لكلمة سر أقصر من 8", en: "`POST /register` answers `400` for a password under 8 characters" }, test: ({ logs }) => logs.some((l) => l.startsWith("__a__ short 400")) },
    { id: "created", label: { ar: "تسجيل صحيح يُرجع `201`، وتكرار البريد يُرجع `409`", en: "A valid sign-up answers `201`, and a repeated email `409`" }, test: ({ logs }) => logs.some((l) => l.startsWith("__a__ register 201")) && logs.some((l) => l.startsWith("__a__ dupe 409")) },
    { id: "hash", label: { ar: "احفظ تجزئة كلمة السر بـ `bcrypt.hash` في `users`، ولا تُرجعها في الرد", en: "Store the password's hash from `bcrypt.hash` in `users`, and never send it back" }, test: ({ logs }) => exact(logs, "__a__ stored true") && exact(logs, "__a__ leak false") },
  ],
  hints: [
    { ar: '`if (!password || password.length < 8) return res.status(400).json({ error: "…" });` و `if (users.some((u) => u.email === email)) return res.status(409).json({ … });`', en: '`if (!password || password.length < 8) return res.status(400).json({ error: "…" });` and `if (users.some((u) => u.email === email)) return res.status(409).json({ … });`' },
    { ar: "`const passwordHash = await bcrypt.hash(password, 10); users.push({ email, passwordHash }); res.status(201).json({ email });`", en: "`const passwordHash = await bcrypt.hash(password, 10); users.push({ email, passwordHash }); res.status(201).json({ email });`" },
  ],
  deep: {
    more: [
      { icon: "🧂", ar: "`bcrypt` يضيف **ملحًا** عشوائيًا لكل كلمة سر، فكلمتا سر متطابقتان تعطيان تجزئتين مختلفتين. ورقم `10` هو التكلفة: أبطأ قليلًا لك وأبطأ بآلاف المرات للمهاجم.", en: "`bcrypt` adds a random **salt** to each password, so two identical passwords hash differently. The `10` is the cost: slightly slower for you, thousands of times slower for an attacker." },
      { icon: "🔁", ar: "التجزئة **باتجاه واحد**: لا يمكن إرجاعها لكلمة السر. لذلك لا يستطيع أي موقع جيد أن يرسل لك كلمة سرك القديمة، بل رابطًا لتغييرها.", en: "Hashing is **one-way**: it can't be turned back into the password. That's why a good site can never send you your old password, only a link to reset it." },
      { icon: "🗃️", ar: "هنا المستخدمون في مصفوفة للتبسيط. في مشروع حقيقي يكونون في جدول قاعدة بيانات مع `UNIQUE` على البريد.", en: "Users live in an array here to keep it simple. In a real project they're in a database table with `UNIQUE` on the email." },
    ],
    mistakes: [
      { ar: "نسيان `await` قبل `bcrypt.hash` ← تحفظ Promise بدل التجزئة.", en: "Forgetting `await` before `bcrypt.hash` → you store a Promise instead of the hash." },
      { ar: "إرجاع المستخدم كاملًا `res.json(user)` ← تكشف التجزئة. أرجع البريد فقط.", en: "Returning the whole user, `res.json(user)` → leaks the hash. Return just the email." },
      { ar: "نسيان `return` قبل `res.status(400)` ← يكمل الكود ويحاول الرد مرتين.", en: "Forgetting `return` before `res.status(400)` → the code carries on and tries to answer twice." },
    ],
  },
  xp: 35,
};

export const authLogin: Lesson = {
  slug: "auth-login",
  runtime: "server",
  title: { ar: "تسجيل الدخول: مقارنة ورمز", en: "Logging in: compare and token" },
  body: [
    { icon: "🔑", ar: "التسجيل جاهز في المحرر. الآن الدخول: ابحث عن المستخدم بالبريد، ثم قارن كلمة السر بالتجزئة: `await bcrypt.compare(password, user.passwordHash)` تُرجع `true` أو `false`.", en: "Sign-up is ready in the editor. Now login: find the user by email, then compare the password with the hash: `await bcrypt.compare(password, user.passwordHash)` returns `true` or `false`." },
    { icon: "🚫", ar: "إذا لم يوجد المستخدم أو كانت كلمة السر خاطئة أجب `401` برسالة **واحدة عامة** مثل \"Wrong email or password\".", en: "If the user isn't found or the password is wrong, answer `401` with **one general** message like \"Wrong email or password\"." },
    { icon: "🎟️", ar: "إذا نجح أعطه **رمزًا** (JWT): `const token = jwt.sign({ email }, SECRET, { expiresIn: \"1h\" });` ثم `res.json({ token });`. سيرسله مع طلباته القادمة.", en: "On success, give them a **token** (JWT): `const token = jwt.sign({ email }, SECRET, { expiresIn: \"1h\" });` then `res.json({ token });`. They'll send it with their next requests." },
  ],
  example: {
    code: 'const ok = await bcrypt.compare("secret123", user.passwordHash);\nif (!ok) {\n  return res.status(401).json({ error: "Wrong email or password" });\n}\nconst token = jwt.sign({ email: user.email }, SECRET, { expiresIn: "1h" });',
    note: { ar: "مقارنة ثم رمز.", en: "Compare, then sign a token." },
    lang: "none",
  },
  files: ["js"],
  starter: { js: AUTH_START + REGISTER + "// POST /login  { email, password }  →  { token }\n\n" + LISTEN },
  solution: { js: AUTH_START + REGISTER + LOGIN + LISTEN },
  settle: 1500,
  harness: AUTH_HARNESS,
  tasks: [
    { id: "wrong", label: { ar: "`POST /login` بكلمة سر خاطئة يُرجع `401`", en: "`POST /login` with a wrong password answers `401`" }, test: ({ logs }) => logs.some((l) => l.startsWith("__a__ wrong 401")) },
    { id: "token", label: { ar: "بكلمة السر الصحيحة يُرجع `{ token }` من `jwt.sign`", en: "With the right password it answers `{ token }` from `jwt.sign`" }, test: ({ logs }) => exact(logs, "__a__ login 200 true") },
  ],
  hints: [
    { ar: "`const user = users.find((u) => u.email === email);` ثم `if (!user || !(await bcrypt.compare(password, user.passwordHash))) return res.status(401).json({ … });`", en: "`const user = users.find((u) => u.email === email);` then `if (!user || !(await bcrypt.compare(password, user.passwordHash))) return res.status(401).json({ … });`" },
    { ar: '`const token = jwt.sign({ email }, SECRET, { expiresIn: "1h" }); res.json({ token });`', en: '`const token = jwt.sign({ email }, SECRET, { expiresIn: "1h" }); res.json({ token });`' },
  ],
  deep: {
    more: [
      { icon: "🔏", ar: "الـ JWT **موقّع وليس مشفّرًا**: أي أحد يقرأ محتواه، لكن لا أحد يعدّله دون المفتاح السري. لا تضع فيه معلومات سرية، واجعل مدته قصيرة.", en: "A JWT is **signed, not encrypted**: anyone can read it, but nobody can change it without the secret key. Don't put secrets in it, and keep it short-lived." },
      { icon: "🧱", ar: "الرمز ثلاثة أجزاء مفصولة بنقاط: الترويسة، المحتوى (`{ email }`)، والتوقيع. جرّب لصق رمز في موقع jwt.io لترى محتواه.", en: "A token has three parts separated by dots: header, payload (`{ email }`) and signature. Paste one into jwt.io to see its contents." },
      { icon: "⏱️", ar: "حدّ المحاولات (rate limiting) يمنع تخمين كلمات السر: بعد 5 محاولات فاشلة مثلًا انتظر دقيقة.", en: "Rate limiting stops password guessing: after, say, 5 failed attempts, wait a minute." },
    ],
    mistakes: [
      { ar: "رسالتان مختلفتان \"البريد غير موجود\" و \"كلمة السر خاطئة\" ← تكشفان للمهاجم أي البريدات مسجلة. استخدم رسالة واحدة.", en: "Two different errors, \"email not found\" and \"wrong password\" → tell attackers which emails exist. Use one message." },
      { ar: "نسيان `await` قبل `bcrypt.compare` فيكون الشرط دائمًا صحيحًا (Promise) ← انتظر النتيجة.", en: "Forgetting `await` before `bcrypt.compare`, so the check is always truthy (a Promise) → await the result." },
      { ar: "مقارنة `password === user.passwordHash` ← لن تتطابق أبدًا. استعمل `bcrypt.compare`.", en: "Comparing `password === user.passwordHash` → never matches. Use `bcrypt.compare`." },
    ],
  },
  xp: 35,
};

export const authPractice: Lesson = {
  slug: "auth-practice",
  runtime: "server",
  title: { ar: "صفحة محمية: الوسيط middleware", en: "A protected page: middleware" },
  body: [
    { icon: "🎟️", ar: "التسجيل والدخول جاهزان في المحرر. المستخدم يرسل رمزه مع كل طلب في الترويسة `Authorization: Bearer <token>`.", en: "Sign-up and login are ready in the editor. The user sends their token with each request in the `Authorization: Bearer <token>` header." },
    { icon: "🚧", ar: "**الوسيط** (middleware) دالة تعمل قبل المعالج: `function requireAuth(req, res, next) { … }`. تقرأ الرمز وتتحقق منه بـ `jwt.verify(token, SECRET)`، ثم `next()` إذا كان صالحًا، أو `401` إذا لم يكن.", en: "**Middleware** is a function that runs before the handler: `function requireAuth(req, res, next) { … }`. It reads the token, checks it with `jwt.verify(token, SECRET)`, then calls `next()` if valid or answers `401` if not." },
    { icon: "🧷", ar: "`jwt.verify` **يرمي خطأ** إذا كان الرمز خاطئًا، فضعه داخل `try/catch`. ونضع الوسيط قبل المعالج: `app.get(\"/me\", requireAuth, handler)`.", en: "`jwt.verify` **throws** when the token is bad, so put it inside `try/catch`. The middleware goes before the handler: `app.get(\"/me\", requireAuth, handler)`." },
  ],
  example: {
    code: 'function requireAuth(req, res, next) {\n  const header = req.headers.authorization ?? "";\n  const token = header.replace("Bearer ", "");\n  try {\n    req.user = jwt.verify(token, SECRET);\n    next();\n  } catch {\n    res.status(401).json({ error: "Please log in" });\n  }\n}',
    note: { ar: "وسيط يسمح بالمرور فقط مع رمز صالح.", en: "Middleware that only lets a valid token through." },
    lang: "none",
  },
  files: ["js"],
  starter: { js: AUTH_START + REGISTER + LOGIN + "// GET /me  (protected by a requireAuth middleware)  →  { email }\n\n" + LISTEN },
  solution: { js: AUTH_START + REGISTER + LOGIN + ME + LISTEN },
  settle: 1500,
  harness: AUTH_HARNESS,
  tasks: [
    { id: "anon", label: { ar: "اكتب وسيطًا `requireAuth`: `GET /me` بدون رمز يُرجع `401`", en: "Write a `requireAuth` middleware: `GET /me` without a token answers `401`" }, test: ({ logs }) => logs.some((l) => l.startsWith("__a__ anon 401")) },
    { id: "me", label: { ar: "ومع رمز صالح يُرجع `{ email }` صاحب الرمز", en: "With a valid token it answers `{ email }` of the token's owner" }, test: ({ logs }) => exact(logs, '__a__ me 200 {"email":"sara@mail.com"}') },
  ],
  hints: [
    { ar: '`const token = (req.headers.authorization ?? "").replace("Bearer ", "");` ثم `try { req.user = jwt.verify(token, SECRET); next(); } catch { res.status(401).json({ … }); }`', en: '`const token = (req.headers.authorization ?? "").replace("Bearer ", "");` then `try { req.user = jwt.verify(token, SECRET); next(); } catch { res.status(401).json({ … }); }`' },
    { ar: "`app.get(\"/me\", requireAuth, (req, res) => { res.json({ email: req.user.email }); });`", en: "`app.get(\"/me\", requireAuth, (req, res) => { res.json({ email: req.user.email }); });`" },
  ],
  deep: {
    more: [
      { icon: "🔗", ar: "يمكن وضع الوسيط على كل المسارات مرة واحدة: `app.use(\"/api/private\", requireAuth);` فيحمي كل ما يبدأ بهذا المسار.", en: "You can put middleware on many routes at once: `app.use(\"/api/private\", requireAuth);` guards everything under that path." },
      { icon: "🍪", ar: "في المتصفح، الأفضل حفظ الرمز في كوكي `HttpOnly; Secure; SameSite` بدل localStorage، فلا يصل إليه JavaScript الضار. وخدمات مثل Auth.js و Clerk تبني كل هذا لك.", en: "In browsers, keep the token in an `HttpOnly; Secure; SameSite` cookie instead of localStorage so malicious JavaScript can't reach it. Services like Auth.js and Clerk build all of this for you." },
      { icon: "🛂", ar: "`401` يعني «لم تسجّل دخولك»، و `403` يعني «سجّلت لكن ليس لك إذن» مثل مستخدم عادي يطلب صفحة المدير.", en: "`401` means \"you're not logged in\", and `403` means \"you are, but you're not allowed\", like a regular user asking for an admin page." },
    ],
    mistakes: [
      { ar: "نسيان `next()` في الوسيط ← الطلب يعلق للأبد دون رد.", en: "Forgetting `next()` in the middleware → the request hangs forever with no answer." },
      { ar: "`jwt.verify` بدون `try/catch` ← رمز خاطئ يرمي خطأ يوقف الخادم بدل أن يُرجع `401`.", en: "`jwt.verify` without `try/catch` → a bad token throws and breaks the request instead of answering `401`." },
      { ar: "كتابة المفتاح السري داخل الكود ورفعه إلى GitHub ← ضعه في متغير بيئة `process.env.JWT_SECRET`.", en: "Hard-coding the secret key and pushing it to GitHub → keep it in an environment variable, `process.env.JWT_SECRET`." },
    ],
  },
  xp: 35,
};

/** Extra exam questions for these lessons. */
export const jsMoreExam: Exam["questions"] = [
  { id: "w1", prompt: { ar: "ماذا تُرجع `\"  Hi  \".trim()`؟", en: "What does `\"  Hi  \".trim()` return?" }, options: [{ ar: "`\"Hi\"`", en: "`\"Hi\"`" }, { ar: "`\"  Hi\"`", en: "`\"  Hi\"`" }, { ar: "`\"hi\"`", en: "`\"hi\"`" }], answer: 0 },
  { id: "w2", prompt: { ar: "كيف تحفظ كائنًا في localStorage؟", en: "How do you save an object in localStorage?" }, options: [{ ar: "`setItem(\"k\", JSON.stringify(obj))`", en: "`setItem(\"k\", JSON.stringify(obj))`" }, { ar: "`setItem(\"k\", obj)`", en: "`setItem(\"k\", obj)`" }, { ar: "`save(obj)`", en: "`save(obj)`" }], answer: 0 },
];
export const reactWebExam: Exam["questions"] = [
  { id: "w1", prompt: { ar: "متى يرمي `fetch` خطأ؟", en: "When does `fetch` throw?" }, options: [{ ar: "عند فشل الشبكة فقط، وليس عند 404", en: "Only on network failure, not on a 404" }, { ar: "عند أي رمز غير 200", en: "On any non-200 status" }, { ar: "أبدًا", en: "Never" }], answer: 0 },
  { id: "w2", prompt: { ar: "في Next.js، ما الملف الذي يصنع الصفحة `/about`؟", en: "In Next.js, which file makes the `/about` page?" }, options: [{ ar: "`app/about/page.tsx`", en: "`app/about/page.tsx`" }, { ar: "`about.html`", en: "`about.html`" }, { ar: "`pages.json`", en: "`pages.json`" }], answer: 0 },
];
export const backendWebExam: Exam["questions"] = [
  { id: "w1", prompt: { ar: "ما الطريقة الآمنة لوضع قيمة من المستخدم في استعلام SQL؟", en: "What's the safe way to put a user's value into an SQL query?" }, options: [{ ar: "معامل `?` وتمرير القيمة", en: "A `?` parameter and passing the value" }, { ar: "لصقها بـ `+`", en: "Gluing it with `+`" }, { ar: "قالب نصي `${}`", en: "A template literal `${}`" }], answer: 0 },
  { id: "w2", prompt: { ar: "كيف تُحفظ كلمات السر؟", en: "How are passwords stored?" }, options: [{ ar: "تجزئة بـ bcrypt", en: "Hashed with bcrypt" }, { ar: "كما هي", en: "As they are" }, { ar: "داخل JWT", en: "Inside a JWT" }], answer: 0 },
  { id: "w3", prompt: { ar: "ماذا يفعل الوسيط `requireAuth`؟", en: "What does `requireAuth` middleware do?" }, options: [{ ar: "يتحقق من الرمز ثم `next()` أو `401`", en: "Checks the token, then `next()` or `401`" }, { ar: "ينشئ المستخدمين", en: "Creates users" }, { ar: "يرسل البريد", en: "Sends email" }], answer: 0 },
];
