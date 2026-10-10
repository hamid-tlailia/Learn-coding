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
  title: { ar: "النصوص: تنظيف وتحويل وتقطيع", en: "Strings: clean, transform and split" },
  body: [
    { icon: "🧵", ar: "أغلب ما يكتبه المستخدم **نصوص**: أسماء، بريد، بحث. ونادرًا ما تصل نظيفة: مسافات زائدة، حروف كبيرة وصغيرة مختلطة. JavaScript تعطيك دوالًا جاهزة لترتيبها.", en: "Most of what users type is **text**: names, emails, searches. It rarely arrives clean: extra spaces, mixed capital and small letters. JavaScript gives you ready methods to tidy it." },
    { icon: "🧹", ar: "`trim()` يحذف المسافات من الطرفين، و `toLowerCase()` و `toUpperCase()` يغيّران حالة الأحرف، و `includes(\"@\")` يسأل: هل النص يحتوي هذا؟", en: "`trim()` removes spaces at both ends, `toLowerCase()` and `toUpperCase()` change letter case, and `includes(\"@\")` asks: does the text contain this?" },
    { icon: "✂️", ar: "`split(\" \")` يقطّع النص إلى مصفوفة كلمات، و `join(\"-\")` يجمعها من جديد. و `slice(0, 1)` يأخذ جزءًا منه: هنا الحرف الأول.", en: "`split(\" \")` cuts text into an array of words, and `join(\"-\")` glues them back. `slice(0, 1)` takes a piece: here, the first letter." },
    { icon: "🔁", ar: "`replaceAll(\"a\", \"b\")` يستبدل كل ظهور. وكل هذه الدوال **تُرجع نصًا جديدًا** ولا تغيّر الأصلي: النصوص في JavaScript لا تتغير.", en: "`replaceAll(\"a\", \"b\")` replaces every match. All these methods **return a new string** and leave the original alone: strings in JavaScript never change." },
  ],
  example: {
    code: 'const raw = "   hELLo   WoRLD  ";\nconst clean = raw.trim().toLowerCase();\nconsole.log(clean);                       // "hello   world"\nconst words = clean.split(" ").filter((w) => w);\nconsole.log(words);                       // ["hello", "world"]\nconsole.log(words.join("-"));            // "hello-world"\nconsole.log("code".slice(0, 1).toUpperCase() + "code".slice(1)); // "Code"',
    note: { ar: "تنظيف نص فوضوي خطوة بخطوة.", en: "Tidying messy text step by step." },
    lang: "js",
  },
  files: ["js"],
  starter: { js: "// 1) formatName(raw)  →  \"  sARA   aLI \" becomes \"Sara Ali\"\n\n// 2) slugify(title)   →  \"Learn JS Fast\" becomes \"learn-js-fast\"\n\n// 3) initials(name)   →  \"Sara Ali\" becomes \"S.A.\"\n" },
  solution: {
    js: 'function formatName(raw) {\n  return raw\n    .trim()\n    .split(" ")\n    .filter((word) => word)\n    .map((word) => word.slice(0, 1).toUpperCase() + word.slice(1).toLowerCase())\n    .join(" ");\n}\n\nfunction slugify(title) {\n  return title.trim().toLowerCase().split(" ").filter((w) => w).join("-");\n}\n\nfunction initials(name) {\n  return name.split(" ").map((w) => w.slice(0, 1).toUpperCase() + ".").join("");\n}\n\nconsole.log(formatName("  sARA   aLI "));\n',
  },
  harness: 'try { console.log("__s__ name " + formatName("  sARA   aLI ")); console.log("__s__ name2 " + formatName("omar")); } catch (e) { console.log("__s__ name error"); } try { console.log("__s__ slug " + slugify("  Learn JS   Fast ")); } catch (e) { console.log("__s__ slug error"); } try { console.log("__s__ ini " + initials("Sara Ali")); } catch (e) { console.log("__s__ ini error"); }',
  tasks: [
    { id: "name", label: { ar: "`formatName` ينظّف المسافات ويجعل أول حرف كبيرًا والباقي صغيرًا", en: "`formatName` trims spaces and capitalizes only the first letter of each word" }, test: ({ logs }) => exact(logs, "__s__ name Sara Ali") && exact(logs, "__s__ name2 Omar") },
    { id: "slug", label: { ar: "`slugify` يحوّل العنوان إلى `learn-js-fast`", en: "`slugify` turns the title into `learn-js-fast`" }, test: ({ logs }) => exact(logs, "__s__ slug learn-js-fast") },
    { id: "ini", label: { ar: "`initials` يُرجع `S.A.`", en: "`initials` returns `S.A.`" }, test: ({ logs }) => exact(logs, "__s__ ini S.A.") },
  ],
  hints: [
    { ar: '`raw.trim().split(" ").filter((w) => w)` يعطيك الكلمات بدون الفراغات الزائدة.', en: '`raw.trim().split(" ").filter((w) => w)` gives you the words without the extra blanks.' },
    { ar: "لكل كلمة: `word.slice(0, 1).toUpperCase() + word.slice(1).toLowerCase()` ثم `join(\" \")`.", en: "For each word: `word.slice(0, 1).toUpperCase() + word.slice(1).toLowerCase()`, then `join(\" \")`." },
  ],
  deep: {
    more: [
      { icon: "🧊", ar: "النصوص **غير قابلة للتغيير** (immutable): `name.toUpperCase()` لا يغيّر `name`. احفظ النتيجة: `const big = name.toUpperCase();`.", en: "Strings are **immutable**: `name.toUpperCase()` doesn't change `name`. Keep the result: `const big = name.toUpperCase();`." },
      { icon: "🔎", ar: "للمقارنة دون اعتبار لحالة الأحرف وحّد الطرفين: `a.toLowerCase() === b.toLowerCase()`. هكذا يعمل البحث في معظم المواقع.", en: "To compare ignoring letter case, normalize both sides: `a.toLowerCase() === b.toLowerCase()`. That's how most site searches work." },
      { icon: "🌍", ar: "للغات مثل العربية والتركية استخدم `localeCompare` للترتيب، و `Intl` لتنسيق الأرقام والتواريخ: `new Intl.NumberFormat(\"ar\").format(1234)`.", en: "For languages like Arabic or Turkish, sort with `localeCompare` and format numbers and dates with `Intl`: `new Intl.NumberFormat(\"ar\").format(1234)`." },
    ],
    mistakes: [
      { ar: "`name.toUppercase()` ← الاسم الصحيح `toUpperCase()` بحرف C كبير؛ JavaScript تفرّق بين الحروف.", en: "`name.toUppercase()` → the right name is `toUpperCase()` with a capital C; JavaScript is case-sensitive." },
      { ar: "`text.replace(\"a\", \"b\")` يستبدل أول ظهور فقط ← استخدم `replaceAll` لكل الظهورات.", en: "`text.replace(\"a\", \"b\")` only replaces the first match → use `replaceAll` for every one." },
      { ar: "`split(\" \")` على نص فيه مسافات متتالية يعطي كلمات فارغة ← أضف `.filter((w) => w)`.", en: "`split(\" \")` on text with double spaces gives empty words → add `.filter((w) => w)`." },
    ],
  },
  xp: 30,
};

const STORAGE_HTML = '<h1>My settings</h1>\n<p id="visits">Visits: 0</p>\n<button id="theme">Toggle theme</button>\n';

export const webStorage: Lesson = {
  slug: "web-storage",
  title: { ar: "الحفظ في المتصفح: localStorage", en: "Saving in the browser: localStorage" },
  body: [
    { icon: "💾", ar: "المتغيرات تُمسح عند إعادة تحميل الصفحة. لحفظ أشياء صغيرة على جهاز المستخدم (الثيم، اللغة، تقدّم لعبة) يعطيك المتصفح **localStorage**.", en: "Variables vanish when the page reloads. To keep small things on the user's device (theme, language, game progress), the browser gives you **localStorage**." },
    { icon: "🔑", ar: "مفاتيح وقيم نصية: `localStorage.setItem(\"theme\", \"dark\")` للحفظ، و `localStorage.getItem(\"theme\")` للقراءة (تُرجع `null` إن لم يوجد)، و `removeItem` للحذف.", en: "Text keys and values: `localStorage.setItem(\"theme\", \"dark\")` to save, `localStorage.getItem(\"theme\")` to read (it returns `null` if missing), and `removeItem` to delete." },
    { icon: "🔢", ar: "القيم دائمًا نصوص. للأرقام: `Number(localStorage.getItem(\"visits\") ?? 0)`. وللكائنات: احفظ `JSON.stringify(obj)` واقرأ بـ `JSON.parse(text)`.", en: "Values are always text. For numbers: `Number(localStorage.getItem(\"visits\") ?? 0)`. For objects: save `JSON.stringify(obj)` and read with `JSON.parse(text)`." },
    { icon: "🧪", ar: "هنا في المحرر يبدأ التخزين فارغًا مع كل تشغيل، أما في موقعك الحقيقي فيبقى حتى بعد إغلاق المتصفح.", en: "In this editor storage starts empty on every run; on your real site it stays even after the browser closes." },
  ],
  example: {
    code: 'const saved = JSON.parse(localStorage.getItem("profile") ?? "null");\nconsole.log("Before:", saved);\n\nlocalStorage.setItem("profile", JSON.stringify({ name: "Sara", level: 3 }));\nconst profile = JSON.parse(localStorage.getItem("profile"));\nconsole.log("After:", profile.name, profile.level);',
    note: { ar: "حفظ كائن وقراءته بـ JSON.", en: "Saving and reading an object with JSON." },
    lang: "js",
  },
  files: ["js", "html"],
  starter: { js: "", html: STORAGE_HTML },
  solution: {
    js: 'const visits = Number(localStorage.getItem("visits") ?? 0) + 1;\nlocalStorage.setItem("visits", String(visits));\ndocument.querySelector("#visits").textContent = `Visits: ${visits}`;\n\nconst saved = localStorage.getItem("theme");\nif (saved === "dark") document.body.classList.add("dark");\n\ndocument.querySelector("#theme").addEventListener("click", () => {\n  document.body.classList.toggle("dark");\n  localStorage.setItem("theme", document.body.classList.contains("dark") ? "dark" : "light");\n});\n',
    html: STORAGE_HTML,
  },
  harness: 'console.log("__c__ visits " + localStorage.getItem("visits")); console.log("__c__ shown " + (document.querySelector("#visits") || {}).textContent); var t = document.querySelector("#theme"); if (t) t.click(); console.log("__c__ theme " + localStorage.getItem("theme") + " " + document.body.classList.contains("dark")); if (t) t.click(); console.log("__c__ theme2 " + localStorage.getItem("theme"));',
  tasks: [
    { id: "count", label: { ar: "اقرأ `visits` وزِده واحدًا واحفظه بـ `setItem`", en: "Read `visits`, add one and save it with `setItem`" }, test: ({ logs }) => c(logs, "visits", 1) },
    { id: "show", label: { ar: "اعرضه في `#visits` بالشكل `Visits: 1`", en: "Show it in `#visits` as `Visits: 1`" }, test: ({ logs }) => c(logs, "shown", "Visits: 1") },
    { id: "theme", label: { ar: "زر `#theme` يبدّل `dark` على `<body>` ويحفظ `dark` أو `light`", en: "`#theme` toggles `dark` on `<body>` and saves `dark` or `light`" }, test: ({ logs }) => c(logs, "theme", "dark true") && c(logs, "theme2", "light") },
    { id: "load", label: { ar: "عند البداية اقرأ الثيم المحفوظ وطبّقه", en: "On start, read the saved theme and apply it" }, test: ({ files }) => /getItem\(\s*["']theme["']\s*\)/.test(files.js ?? "") },
  ],
  hints: [
    { ar: '`const visits = Number(localStorage.getItem("visits") ?? 0) + 1; localStorage.setItem("visits", String(visits));`', en: '`const visits = Number(localStorage.getItem("visits") ?? 0) + 1; localStorage.setItem("visits", String(visits));`' },
    { ar: '`localStorage.setItem("theme", document.body.classList.contains("dark") ? "dark" : "light");`', en: '`localStorage.setItem("theme", document.body.classList.contains("dark") ? "dark" : "light");`' },
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
  title: { ar: "تحميل البيانات: الانتظار والأخطاء", en: "Loading data: waiting and errors" },
  body: [
    { icon: "🌐", ar: "كل واجهة تجلب بيانات تمر بثلاث حالات: **تحميل**، **نجاح**، أو **خطأ**. المستخدم يجب أن يعرف دائمًا أين هو، لا شاشة فارغة.", en: "Every interface that fetches data goes through three states: **loading**, **success** or **error**. The user should always know which, never stare at a blank screen." },
    { icon: "🗃️", ar: "ثلاث حالات بـ `useState`: `const [users, setUsers] = useState([]);` و `const [loading, setLoading] = useState(true);` و `const [error, setError] = useState(\"\");`.", en: "Three pieces of state with `useState`: `const [users, setUsers] = useState([]);`, `const [loading, setLoading] = useState(true);` and `const [error, setError] = useState(\"\");`." },
    { icon: "🧯", ar: "داخل `useEffect`: `try { … } catch { setError(…) } finally { setLoading(false) }`. ثم اعرض: `if (loading) return <p>Loading…</p>;` و `if (error) return <p>{error}</p>;`.", en: "Inside `useEffect`: `try { … } catch { setError(…) } finally { setLoading(false) }`. Then render: `if (loading) return <p>Loading…</p>;` and `if (error) return <p>{error}</p>;`." },
  ],
  example: {
    code: 'function App() {\n  const [loading, setLoading] = useState(true);\n  useEffect(() => {\n    const id = setTimeout(() => setLoading(false), 1200);\n    return () => clearTimeout(id);\n  }, []);\n  if (loading) return <p>⏳ Loading…</p>;\n  return <h2>Ready ✅</h2>;\n}',
    note: { ar: "حالة تحميل ثم المحتوى.", en: "A loading state, then the content." },
  },
  files: ["js"],
  starter: { js: `const PEOPLE_URL = "${PEOPLE_URL}";\n\nexport default function App() {\n  \n}\n` },
  solution: {
    js: `const PEOPLE_URL = "${PEOPLE_URL}";\n\nexport default function App() {\n  const [people, setPeople] = useState([]);\n  const [loading, setLoading] = useState(true);\n  const [error, setError] = useState("");\n\n  useEffect(() => {\n    async function load() {\n      try {\n        const res = await fetch(PEOPLE_URL);\n        setPeople(await res.json());\n      } catch (e) {\n        setError("Could not load people");\n      } finally {\n        setLoading(false);\n      }\n    }\n    load();\n  }, []);\n\n  if (loading) return <p>Loading…</p>;\n  if (error) return <p>{error}</p>;\n\n  return (\n    <ul>\n      {people.map((p) => (\n        <li key={p.id}>{p.name}</li>\n      ))}\n    </ul>\n  );\n}\n`,
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
    { id: "loading", label: { ar: "اعرض `Loading…` أثناء الانتظار", en: "Show `Loading…` while waiting" }, test: ({ logs, files }) => c(logs, "loading", true) || /if\s*\(\s*loading\s*\)/.test(files.js ?? "") },
    { id: "fetch", label: { ar: "اجلب `PEOPLE_URL` داخل `useEffect`", en: "Fetch `PEOPLE_URL` inside `useEffect`" }, test: ({ files }) => /useEffect\([\s\S]*fetch\(\s*PEOPLE_URL\s*\)/.test(files.js ?? "") },
    { id: "list", label: { ar: "اعرض الأسماء في `<li>` لكل شخص", en: "Show the names in an `<li>` per person" }, test: ({ logs }) => c(logs, "list", true) },
    { id: "error", label: { ar: "حالة خطأ بـ `try/catch` وأوقف التحميل في النهاية", en: "An error state with `try/catch`, and stop loading at the end" }, test: ({ logs, files }) => /try\s*\{[\s\S]*catch/.test(files.js ?? "") && /setError\(/.test(files.js ?? "") && c(logs, "done", true) },
  ],
  hints: [
    { ar: '`const [loading, setLoading] = useState(true);` و `if (loading) return <p>Loading…</p>;`', en: '`const [loading, setLoading] = useState(true);` and `if (loading) return <p>Loading…</p>;`' },
    { ar: "`try { const res = await fetch(PEOPLE_URL); setPeople(await res.json()); } catch (e) { setError(\"…\"); } finally { setLoading(false); }`", en: "`try { const res = await fetch(PEOPLE_URL); setPeople(await res.json()); } catch (e) { setError(\"…\"); } finally { setLoading(false); }`" },
  ],
  deep: {
    more: [
      { icon: "📡", ar: "`fetch` لا يرمي خطأ عند `404` أو `500`؛ يرمي فقط إذا انقطعت الشبكة. تحقق بنفسك: `if (!res.ok) throw new Error(res.status);`.", en: "`fetch` doesn't throw on `404` or `500`; it only throws when the network fails. Check yourself: `if (!res.ok) throw new Error(res.status);`." },
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
    js: 'function Home() {\n  return <h1>Home</h1>;\n}\n\nfunction About() {\n  return <h1>About</h1>;\n}\n\nfunction Contact() {\n  return <h1>Contact</h1>;\n}\n\nconst pages = { home: Home, about: About, contact: Contact };\n\nexport default function App() {\n  const [page, setPage] = useState("home");\n  const Page = pages[page];\n  return (\n    <div>\n      <nav>\n        {Object.keys(pages).map((name) => (\n          <button key={name} className={name === page ? "active" : ""} onClick={() => setPage(name)}>\n            {name[0].toUpperCase() + name.slice(1)}\n          </button>\n        ))}\n      </nav>\n      <Page />\n    </div>\n  );\n}\n',
  },
  settle: 900,
  harness: steps(`var h1 = function () { var h = root.querySelector("h1"); return h ? h.textContent.trim() : ""; };
    console.log("__c__ start " + (h1() === "Home" && root.querySelectorAll("nav button").length >= 3));
    var a = btn("about"); if (a) a.click(); await wait();
    console.log("__c__ about " + (h1() === "About" && !!btn("about") && btn("about").classList.contains("active")));
    var c2 = btn("contact"); if (c2) c2.click(); await wait();
    console.log("__c__ contact " + (h1() === "Contact" && !btn("about").classList.contains("active")));`),
  tasks: [
    { id: "state", label: { ar: "حالة `page` تبدأ بـ `\"home\"`", en: "A `page` state starting at `\"home\"`" }, test: ({ files }) => /useState\(\s*["']home["']\s*\)/.test(files.js ?? "") },
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

export const sqlPractice: Lesson = {
  slug: "sql-practice",
  runtime: "server",
  title: { ar: "SQL عمليًا: استعلامات حقيقية", en: "SQL in practice: real queries" },
  body: [
    { icon: "🗄️", ar: "هنا قاعدة بيانات **SQLite حقيقية** تعمل داخل التطبيق. نستخدمها من Node.js بمكتبة `better-sqlite3`، وهي نفس الطريقة في المشاريع الحقيقية الصغيرة.", en: "Here's a **real SQLite** database running inside the app. We use it from Node.js with the `better-sqlite3` library, exactly as small real projects do." },
    { icon: "🔎", ar: "القراءة: `db.prepare(\"SELECT name FROM users WHERE age >= ? ORDER BY name\").all(18)` تُرجع مصفوفة صفوف. و `.get(…)` تُرجع صفًا واحدًا.", en: "Reading: `db.prepare(\"SELECT name FROM users WHERE age >= ? ORDER BY name\").all(18)` returns an array of rows. `.get(…)` returns a single row." },
    { icon: "✍️", ar: "الكتابة: `db.prepare(\"INSERT INTO users (name, city, age) VALUES (?, ?, ?)\").run(name, city, age)` وتُرجع `lastInsertRowid` رقم الصف الجديد.", en: "Writing: `db.prepare(\"INSERT INTO users (name, city, age) VALUES (?, ?, ?)\").run(name, city, age)`, which returns `lastInsertRowid`, the new row's id." },
    { icon: "🛡️", ar: "علامات `?` هي **المعاملات**: القاعدة تضع القيم بأمان. لا تلصق مدخلات المستخدم داخل نص SQL أبدًا، وإلا فتحت الباب لـ **SQL injection**.", en: "The `?` marks are **parameters**: the database inserts values safely. Never paste user input into the SQL text, or you open the door to **SQL injection**." },
    { icon: "📊", ar: "للتجميع: `SELECT city, COUNT(*) AS total FROM users GROUP BY city ORDER BY city` يعطي عدد المستخدمين في كل مدينة.", en: "For grouping: `SELECT city, COUNT(*) AS total FROM users GROUP BY city ORDER BY city` counts users per city." },
  ],
  example: {
    code: SQL_START + 'const young = db.prepare("SELECT name, age FROM users WHERE age < ?").all(20);\nconsole.log(young);\n\nconst sara = db.prepare("SELECT * FROM users WHERE name = ?").get("Sara");\nconsole.log(sara.city);',
    note: { ar: "استعلامان على جدول المستخدمين.", en: "Two queries on the users table." },
  },
  files: ["js"],
  starter: { js: SQL_START + "// 1) adults(): names of users aged 18+, sorted by name\n\n// 2) addUser(name, city, age): insert safely with ? and return the new id\n\n// 3) countByCity(): [{ city, total }] using GROUP BY, sorted by city\n" },
  solution: {
    js:
      SQL_START +
      'function adults() {\n  return db.prepare("SELECT name FROM users WHERE age >= ? ORDER BY name").all(18).map((row) => row.name);\n}\n\nfunction addUser(name, city, age) {\n  const result = db.prepare("INSERT INTO users (name, city, age) VALUES (?, ?, ?)").run(name, city, age);\n  return result.lastInsertRowid;\n}\n\nfunction countByCity() {\n  return db.prepare("SELECT city, COUNT(*) AS total FROM users GROUP BY city ORDER BY city").all();\n}\n\nconsole.log(adults());\n',
  },
  settle: 2500,
  harness:
    'try { console.log("__q__ adults " + JSON.stringify(adults())); } catch (e) { console.log("__q__ adults error"); } try { var id = addUser("Nour", "Cairo", 22); console.log("__q__ id " + id); console.log("__q__ added " + JSON.stringify(db.prepare("SELECT name, city, age FROM users WHERE id = ?").get(id))); } catch (e) { console.log("__q__ id error"); } try { console.log("__q__ cities " + JSON.stringify(countByCity())); } catch (e) { console.log("__q__ cities error"); }',
  tasks: [
    { id: "adults", label: { ar: "`adults()` تُرجع `[\"Adam\", \"Lina\", \"Sara\"]`", en: "`adults()` returns `[\"Adam\", \"Lina\", \"Sara\"]`" }, test: ({ logs }) => exact(logs, '__q__ adults ["Adam","Lina","Sara"]') },
    { id: "insert", label: { ar: "`addUser` يضيف صفًا ويُرجع رقمه الجديد", en: "`addUser` inserts a row and returns its new id" }, test: ({ logs }) => exact(logs, "__q__ id 5") && exact(logs, '__q__ added {"name":"Nour","city":"Cairo","age":22}') },
    { id: "group", label: { ar: "`countByCity()` يعدّ المستخدمين لكل مدينة بـ `GROUP BY`", en: "`countByCity()` counts users per city with `GROUP BY`" }, test: ({ logs }) => exact(logs, '__q__ cities [{"city":"Cairo","total":2},{"city":"Rabat","total":1},{"city":"Tunis","total":2}]') },
    { id: "safe", label: { ar: "كل القيم عبر `?` وليس بلصقها في نص SQL", en: "Every value goes through `?`, never pasted into the SQL" }, test: ({ files }) => { const js = files.js ?? ""; return /VALUES\s*\(\s*\?\s*,\s*\?\s*,\s*\?\s*\)/i.test(js) && !/prepare\(\s*`[^`]*\$\{/.test(js) && !/prepare\([^)]*\+/.test(js); } },
  ],
  hints: [
    { ar: '`db.prepare("SELECT name FROM users WHERE age >= ? ORDER BY name").all(18).map((row) => row.name)`', en: '`db.prepare("SELECT name FROM users WHERE age >= ? ORDER BY name").all(18).map((row) => row.name)`' },
    { ar: '`db.prepare("INSERT INTO users (name, city, age) VALUES (?, ?, ?)").run(name, city, age).lastInsertRowid`', en: '`db.prepare("INSERT INTO users (name, city, age) VALUES (?, ?, ?)").run(name, city, age).lastInsertRowid`' },
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
  xp: 40,
};

const AUTH_START =
  'const express = require("express");\nconst bcrypt = require("bcryptjs");\nconst jwt = require("jsonwebtoken");\n\nconst app = express();\napp.use(express.json());\n\nconst SECRET = "dev-only-secret"; // in production: process.env.JWT_SECRET\nconst users = [];\n\n';

export const authPractice: Lesson = {
  slug: "auth-practice",
  runtime: "server",
  title: { ar: "تسجيل الدخول عمليًا: تشفير ورموز", en: "Login in practice: hashing and tokens" },
  body: [
    { icon: "🔐", ar: "سنبني نظام دخول حقيقيًا: تسجيل، دخول، وصفحة محمية. نفس المكتبات المستخدمة في المشاريع: `bcryptjs` لتجزئة كلمات السر و `jsonwebtoken` للرموز.", en: "We'll build a real login system: sign-up, login and a protected page, with the libraries real projects use: `bcryptjs` to hash passwords and `jsonwebtoken` for tokens." },
    { icon: "🧂", ar: "**لا تحفظ كلمة السر أبدًا كما هي.** خزّن تجزئتها: `const passwordHash = await bcrypt.hash(password, 10);`. وعند الدخول قارن: `await bcrypt.compare(password, user.passwordHash)`.", en: "**Never store a password as is.** Store its hash: `const passwordHash = await bcrypt.hash(password, 10);`. At login, compare: `await bcrypt.compare(password, user.passwordHash)`." },
    { icon: "🎟️", ar: "بعد الدخول الناجح أعطِ المستخدم **رمزًا** (JWT): `jwt.sign({ email }, SECRET, { expiresIn: \"1h\" })`. يرسله مع كل طلب في الترويسة `Authorization: Bearer <token>`.", en: "After a successful login, give the user a **token** (JWT): `jwt.sign({ email }, SECRET, { expiresIn: \"1h\" })`. They send it with each request in the `Authorization: Bearer <token>` header." },
    { icon: "🚧", ar: "**الوسيط** (middleware) يحرس المسارات: يقرأ الرمز ويتحقق منه بـ `jwt.verify`، ثم `next()` إذا كان صالحًا، أو `401` إذا لم يكن. نضعه قبل المعالج: `app.get(\"/me\", requireAuth, handler)`.", en: "**Middleware** guards routes: it reads the token, checks it with `jwt.verify`, then calls `next()` if valid or answers `401` if not. It goes before the handler: `app.get(\"/me\", requireAuth, handler)`." },
  ],
  example: {
    code: 'function requireAuth(req, res, next) {\n  const header = req.headers.authorization ?? "";\n  const token = header.replace("Bearer ", "");\n  try {\n    req.user = jwt.verify(token, SECRET);\n    next();\n  } catch {\n    res.status(401).json({ error: "Please log in" });\n  }\n}\n\napp.get("/me", requireAuth, (req, res) => {\n  res.json({ email: req.user.email });\n});',
    note: { ar: "وسيط يحمي المسار `/me`.", en: "Middleware protecting the `/me` route." },
    lang: "none",
  },
  files: ["js"],
  starter: { js: AUTH_START + "// POST /register  { email, password }\n// POST /login     { email, password }  →  { token }\n// GET  /me        (protected by a requireAuth middleware)\n\napp.listen(3000);\n" },
  solution: {
    js:
      AUTH_START +
      'app.post("/register", async (req, res) => {\n  const { email, password } = req.body;\n  if (!email || !password || password.length < 8) {\n    return res.status(400).json({ error: "Email and a password of 8+ characters are required" });\n  }\n  if (users.some((u) => u.email === email)) {\n    return res.status(409).json({ error: "Email already registered" });\n  }\n  const passwordHash = await bcrypt.hash(password, 10);\n  users.push({ email, passwordHash });\n  res.status(201).json({ email });\n});\n\napp.post("/login", async (req, res) => {\n  const { email, password } = req.body;\n  const user = users.find((u) => u.email === email);\n  if (!user || !(await bcrypt.compare(password, user.passwordHash))) {\n    return res.status(401).json({ error: "Wrong email or password" });\n  }\n  const token = jwt.sign({ email }, SECRET, { expiresIn: "1h" });\n  res.json({ token });\n});\n\nfunction requireAuth(req, res, next) {\n  const token = (req.headers.authorization ?? "").replace("Bearer ", "");\n  try {\n    req.user = jwt.verify(token, SECRET);\n    next();\n  } catch {\n    res.status(401).json({ error: "Please log in" });\n  }\n}\n\napp.get("/me", requireAuth, (req, res) => {\n  res.json({ email: req.user.email });\n});\n\napp.listen(3000);\n',
  },
  settle: 1500,
  harness: `(async function () {
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
  })();`,
  tasks: [
    { id: "register", label: { ar: "`POST /register` يرفض كلمة سر أقل من 8 (`400`) والبريد المكرر (`409`)، ويُرجع `201`", en: "`POST /register` rejects passwords under 8 (`400`) and a taken email (`409`), else `201`" }, test: ({ logs }) => logs.some((l) => l.startsWith("__a__ short 400")) && logs.some((l) => l.startsWith("__a__ register 201")) && logs.some((l) => l.startsWith("__a__ dupe 409")) },
    { id: "hash", label: { ar: "كلمة السر تُحفظ مجزّأة بـ `bcrypt.hash` ولا تُرجع أبدًا", en: "The password is stored hashed with `bcrypt.hash` and never returned" }, test: ({ logs }) => exact(logs, "__a__ stored true") && exact(logs, "__a__ leak false") },
    { id: "login", label: { ar: "`POST /login`: كلمة سر خاطئة `401`، وصحيحة تُرجع `token`", en: "`POST /login`: a wrong password gives `401`, a right one returns a `token`" }, test: ({ logs }) => logs.some((l) => l.startsWith("__a__ wrong 401")) && exact(logs, "__a__ login 200 true") },
    { id: "protect", label: { ar: "`GET /me` محمي بوسيط: بدون رمز `401`، ومع الرمز يُرجع البريد", en: "`GET /me` is guarded by middleware: `401` without a token, the email with one" }, test: ({ logs }) => logs.some((l) => l.startsWith("__a__ anon 401")) && exact(logs, '__a__ me 200 {"email":"sara@mail.com"}') },
  ],
  hints: [
    { ar: "`const passwordHash = await bcrypt.hash(password, 10); users.push({ email, passwordHash });` والمعالج يجب أن يكون `async`.", en: "`const passwordHash = await bcrypt.hash(password, 10); users.push({ email, passwordHash });` and the handler must be `async`." },
    { ar: '`if (!user || !(await bcrypt.compare(password, user.passwordHash))) return res.status(401).json({ … });` ثم `jwt.sign({ email }, SECRET, { expiresIn: "1h" })`.', en: '`if (!user || !(await bcrypt.compare(password, user.passwordHash))) return res.status(401).json({ … });` then `jwt.sign({ email }, SECRET, { expiresIn: "1h" })`.' },
    { ar: '`function requireAuth(req, res, next) { try { req.user = jwt.verify(token, SECRET); next(); } catch { res.status(401).json({ … }); } }`', en: '`function requireAuth(req, res, next) { try { req.user = jwt.verify(token, SECRET); next(); } catch { res.status(401).json({ … }); } }`' },
  ],
  deep: {
    more: [
      { icon: "🧂", ar: "`bcrypt` يضيف **ملحًا** عشوائيًا لكل كلمة سر، فكلمتا سر متطابقتان تعطيان تجزئتين مختلفتين. ورقم `10` هو التكلفة: أبطأ قليلًا للمهاجم بآلاف المرات.", en: "`bcrypt` adds a random **salt** to each password, so two identical passwords hash differently. The `10` is the cost: slightly slower for you, thousands of times slower for an attacker." },
      { icon: "🔏", ar: "الـ JWT **موقّع وليس مشفّرًا**: أي أحد يقرأ محتواه، لكن لا أحد يعدّله دون المفتاح السري. لا تضع فيه معلومات سرية، واجعل مدته قصيرة.", en: "A JWT is **signed, not encrypted**: anyone can read it, but nobody can change it without the secret key. Don't put secrets in it, and keep it short-lived." },
      { icon: "🍪", ar: "في المتصفح، الأفضل حفظ الرمز في كوكي `HttpOnly; Secure; SameSite` بدل localStorage، فلا يصل إليه JavaScript الضار. وخدمات مثل Auth.js و Clerk تبني كل هذا لك.", en: "In browsers, keep the token in an `HttpOnly; Secure; SameSite` cookie instead of localStorage so malicious JavaScript can't reach it. Services like Auth.js and Clerk build all of this for you." },
    ],
    mistakes: [
      { ar: "رسالتا خطأ مختلفتان: \"البريد غير موجود\" و \"كلمة السر خاطئة\" تكشفان للمهاجم أي البريدات مسجلة ← استخدم رسالة واحدة عامة.", en: "Two different errors, \"email not found\" and \"wrong password\", tell attackers which emails exist → use one general message." },
      { ar: "نسيان `await` قبل `bcrypt.compare` فيكون الشرط دائمًا صحيحًا (Promise) ← انتظر النتيجة دائمًا.", en: "Forgetting `await` before `bcrypt.compare`, so the check is always truthy (a Promise) → always await the result." },
      { ar: "كتابة المفتاح السري داخل الكود ورفعه إلى GitHub ← ضعه في متغير بيئة `process.env.JWT_SECRET`.", en: "Hard-coding the secret key and pushing it to GitHub → keep it in an environment variable, `process.env.JWT_SECRET`." },
    ],
  },
  xp: 40,
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
