import type { Lesson } from "./types";

const has = (v: string) => v.length > 0;
import { printed } from "./check";

/* ------------------------------------------------------------------ HTML */

export const mediaA11y: Lesson = {
  slug: "media-a11y",
  title: { ar: "الوسائط وإتاحة الوصول", en: "Media and accessibility" },
  body: [
    {
      icon: "🎬",
      ar: "`<video controls>` و `<audio controls>` يعرضان الفيديو والصوت مع أزرار تشغيل جاهزة. الخاصية `controls` تُظهر الأزرار، و `poster` صورة قبل التشغيل.",
      en: "`<video controls>` and `<audio controls>` play video and sound with ready-made buttons. `controls` shows the buttons, and `poster` is the image before playback.",
    },
    {
      icon: "♿",
      ar: "**إتاحة الوصول** (accessibility) تعني أن يستخدم موقعك الجميع، ومنهم مستخدمو قارئات الشاشة ولوحة المفاتيح. ابدأ بالوسوم الصحيحة: `<button>` للأزرار وليس `<div>`.",
      en: "**Accessibility** means everyone can use your site, including screen-reader and keyboard users. Start with the right tags: `<button>` for buttons, not a `<div>`.",
    },
    {
      icon: "🏷️",
      ar: "زر فيه أيقونة فقط يحتاج اسمًا: `<button aria-label=\"Close\">✕</button>`. وأعطِ الصور `width` و `height` حتى لا تقفز الصفحة أثناء التحميل.",
      en: "An icon-only button needs a name: `<button aria-label=\"Close\">✕</button>`. Give images `width` and `height` so the page doesn't jump while loading.",
    },
  ],
  example: {
    code: '<video controls width="320" poster="https://picsum.photos/320/180">\n  <source src="movie.mp4" type="video/mp4">\n</video>\n<button aria-label="Close">✕</button>\n<img src="https://picsum.photos/200" alt="A random photo" width="200" height="200">',
    note: { ar: "فيديو بأزرار، زر أيقونة له اسم، وصورة بأبعاد ثابتة.", en: "A video with controls, a named icon button, and an image with fixed dimensions." },
  },
  modern: {
    old: '<div class="btn" onclick="close()">✕</div>',
    now: '<button aria-label="Close">✕</button>',
    text: {
      ar: "الـ div لا يُضغط بلوحة المفاتيح ولا تفهمه قارئات الشاشة. `<button>` يعمل للجميع دون أي كود إضافي.",
      en: "A div can't be reached by keyboard and screen readers don't understand it. `<button>` works for everyone with no extra code.",
    },
  },
  files: ["html"],
  starter: { html: "" },
  solution: {
    html: '<video controls width="320" poster="https://picsum.photos/320/180">\n  <source src="intro.mp4" type="video/mp4">\n</video>\n<button aria-label="Play music">▶</button>\n<img src="https://picsum.photos/200" alt="A mountain" width="200" height="200">\n',
  },
  tasks: [
    { id: "video", label: { ar: "أضف `<video>` مع `controls`", en: "Add a `<video>` with `controls`" }, test: ({ doc }) => !!doc.querySelector("video[controls]") },
    { id: "aria", label: { ar: "أضف زرًا `<button>` فيه أيقونة واسم `aria-label`", en: "Add an icon `<button>` named with `aria-label`" }, test: ({ doc }) => (doc.querySelector("button[aria-label]")?.getAttribute("aria-label") ?? "").trim().length > 1 },
    {
      id: "img",
      label: { ar: "أضف صورة لها `alt` و `width` و `height`", en: "Add an image with `alt`, `width` and `height`" },
      test: ({ doc }) => {
        const img = doc.querySelector("img");
        return !!img && (img.getAttribute("alt") ?? "").length > 2 && img.hasAttribute("width") && img.hasAttribute("height");
      },
    },
  ],
  hints: [
    { ar: '`<video controls width="320"><source src="intro.mp4" type="video/mp4"></video>`', en: '`<video controls width="320"><source src="intro.mp4" type="video/mp4"></video>`' },
    { ar: '`<button aria-label="Play music">▶</button>`', en: '`<button aria-label="Play music">▶</button>`' },
  ],
  xp: 30,
};

/* ------------------------------------------------------------------ CSS */

export const keyframes: Lesson = {
  slug: "keyframes",
  title: { ar: "الرسوم المتحركة: @keyframes", en: "Animations: @keyframes" },
  body: [
    {
      icon: "🎬",
      ar: "`transition` تحرّك من حالة إلى أخرى عند حدث. أما `@keyframes` فتصف حركة كاملة بمراحلها، وتعمل وحدها وتتكرر: مؤشر تحميل، نبض، اهتزاز.",
      en: "`transition` animates between two states on an event. `@keyframes` describes a whole motion with its stages, running on its own and looping: a loader, a pulse, a shake.",
    },
    {
      icon: "📈",
      ar: "تعرّف الحركة باسم ومراحل من `0%` إلى `100%` (أو `from` و `to`)، ثم تطبقها: `animation: pulse 1s ease-in-out infinite;`.",
      en: "Name the motion and its stages from `0%` to `100%` (or `from` and `to`), then apply it: `animation: pulse 1s ease-in-out infinite;`.",
    },
    {
      icon: "🧘",
      ar: "حرّك `transform` و `opacity` فقط قدر الإمكان، فهي الأنعم أداءً. ولا تنسَ احترام `prefers-reduced-motion`.",
      en: "Animate `transform` and `opacity` whenever you can; they're the smoothest. And remember to respect `prefers-reduced-motion`.",
    },
  ],
  example: {
    code: "@keyframes pulse {\n  0%, 100% { transform: scale(1); opacity: 1; }\n  50% { transform: scale(1.3); opacity: 0.5; }\n}\n\n.dot {\n  width: 24px;\n  height: 24px;\n  border-radius: 50%;\n  background: #8b5cf6;\n  animation: pulse 1s ease-in-out infinite;\n}",
    note: { ar: "نقطة تنبض بلا توقف.", en: "A dot that pulses forever." },
    lang: "css",
  },
  files: ["css", "html"],
  starter: { html: '<div class="dot"></div>\n', css: ".dot {\n  width: 24px;\n  height: 24px;\n  border-radius: 50%;\n  background: #8b5cf6;\n}\n" },
  solution: {
    html: '<div class="dot"></div>\n',
    css: "@keyframes pulse {\n  0%, 100% { transform: scale(1); opacity: 1; }\n  50% { transform: scale(1.3); opacity: 0.5; }\n}\n\n.dot {\n  width: 24px;\n  height: 24px;\n  border-radius: 50%;\n  background: #8b5cf6;\n  animation: pulse 1s ease-in-out infinite;\n}\n",
  },
  tasks: [
    { id: "kf", label: { ar: "عرّف حركة بـ `@keyframes pulse`", en: "Define a motion with `@keyframes pulse`" }, test: ({ css }) => /@keyframes\s+pulse\s*\{/.test(css) },
    { id: "stages", label: { ar: "استخدم `transform` داخل مراحلها", en: "Use `transform` in its stages" }, test: ({ css }) => /@keyframes[\s\S]*transform\s*:/.test(css) },
    { id: "apply", label: { ar: "طبّقها على `.dot` بـ `animation` تتكرر `infinite`", en: "Apply it to `.dot` with an `infinite` `animation`" }, test: ({ rule }) => /pulse/.test(rule(".dot", "animation") || rule(".dot", "animation-name")) && /infinite/.test(rule(".dot", "animation") || rule(".dot", "animation-iteration-count")) },
  ],
  hints: [
    { ar: "`@keyframes pulse { 50% { transform: scale(1.3); } }`", en: "`@keyframes pulse { 50% { transform: scale(1.3); } }`" },
    { ar: "في `.dot`: `animation: pulse 1s ease-in-out infinite;`", en: "In `.dot`: `animation: pulse 1s ease-in-out infinite;`" },
  ],
  xp: 30,
};

const modernCards = `<div class="wrap">
  <article class="card">
    <img src="https://picsum.photos/120" alt="Photo" width="120" height="120">
    <h2>With image</h2>
  </article>
  <article class="card">
    <h2>Text only</h2>
  </article>
</div>
`;

export const modernCss: Lesson = {
  slug: "modern-css",
  title: { ar: "CSS الحديثة: التداخل و :has و @container", en: "Modern CSS: nesting, :has and @container" },
  body: [
    {
      icon: "🪆",
      ar: "**التداخل** (nesting) أصبح جزءًا من CSS نفسها: تكتب قواعد العناصر الداخلية داخل قاعدة الأب `.card { & h2 { … } }`، دون أدوات مثل Sass.",
      en: "**Nesting** is now part of CSS itself: write child rules inside the parent `.card { & h2 { … } }`, no Sass needed.",
    },
    {
      icon: "🔍",
      ar: "المحدد `:has()` يختار الأب حسب ما بداخله: `.card:has(img)` = «البطاقات التي فيها صورة». كان هذا مستحيلًا بـ CSS سابقًا.",
      en: "The `:has()` selector picks a parent by what it contains: `.card:has(img)` = \"cards that contain an image\". This used to be impossible in CSS.",
    },
    {
      icon: "📦",
      ar: "**استعلامات الحاوية** `@container` تغيّر شكل المكوّن حسب عرض **حاويته** وليس الشاشة كلها. عرّف الحاوية بـ `container-type: inline-size`.",
      en: "**Container queries** `@container` restyle a component by the width of its **container**, not the whole screen. Declare the container with `container-type: inline-size`.",
    },
  ],
  example: {
    code: ".wrap {\n  container-type: inline-size;\n}\n\n.card {\n  padding: 16px;\n  border-radius: 16px;\n  background: #eef;\n\n  & h2 {\n    margin: 0;\n  }\n}\n\n.card:has(img) {\n  background: #fde68a;\n}\n\n@container (min-width: 500px) {\n  .card {\n    display: flex;\n    gap: 16px;\n  }\n}",
    note: { ar: "تداخل، وبطاقة تتلون إذا كان فيها صورة، وتخطيط حسب الحاوية.", en: "Nesting, a card that changes color when it has an image, and a container-based layout." },
    lang: "css",
  },
  modern: {
    old: "/* Sass */ .card { h2 { … } }\n/* + JavaScript to style a parent */",
    now: ".card { & h2 { … } }\n.card:has(img) { … }",
    text: { ar: "ميزات كانت تحتاج أدوات أو JavaScript أصبحت CSS عادية مدعومة في كل المتصفحات.", en: "Features that needed tools or JavaScript are now plain CSS, supported in every browser." },
    since: "Baseline 2023",
  },
  files: ["css", "html"],
  starter: { html: modernCards, css: ".card {\n  padding: 16px;\n  border-radius: 16px;\n  background: #eef;\n}\n" },
  solution: {
    html: modernCards,
    css: ".wrap {\n  container-type: inline-size;\n}\n\n.card {\n  padding: 16px;\n  border-radius: 16px;\n  background: #eef;\n\n  & h2 {\n    margin: 0;\n  }\n}\n\n.card:has(img) {\n  background: #fde68a;\n}\n\n@container (min-width: 500px) {\n  .card {\n    display: flex;\n    gap: 16px;\n  }\n}\n",
  },
  tasks: [
    { id: "nest", label: { ar: "اكتب قاعدة متداخلة `& h2` داخل `.card`", en: "Write a nested `& h2` rule inside `.card`" }, test: ({ css }) => /\.card\s*\{[^}]*&\s*h2\s*\{/.test(css) },
    { id: "has", label: { ar: "لوّن `.card:has(img)` بخلفية مختلفة", en: "Give `.card:has(img)` a different background" }, test: ({ rule }) => has(rule(".card:has(img)", "background")) || has(rule(".card:has(img)", "background-color")) },
    { id: "container", label: { ar: "اجعل `.wrap` حاوية وأضف `@container`", en: "Make `.wrap` a container and add an `@container` rule" }, test: ({ css }) => /container-type\s*:\s*inline-size/.test(css) && /@container/.test(css) },
  ],
  hints: [
    { ar: "داخل `.card { }` أضف: `& h2 { margin: 0; }`", en: "Inside `.card { }` add: `& h2 { margin: 0; }`" },
    { ar: "`.wrap { container-type: inline-size; }` ثم `@container (min-width: 500px) { … }`", en: "`.wrap { container-type: inline-size; }` then `@container (min-width: 500px) { … }`" },
  ],
  xp: 35,
};

/* ------------------------------------------------------------------ JavaScript */

export const arrayMethods: Lesson = {
  slug: "array-methods",
  title: { ar: "قوة المصفوفات: find و filter و reduce", en: "Array power: find, filter and reduce" },
  body: [
    {
      icon: "🔎",
      ar: "`find` يُرجع **أول** عنصر يحقق شرطًا، و `filter` يُرجع **كل** العناصر التي تحققه، و `some` يقول هل يوجد واحد على الأقل.",
      en: "`find` returns the **first** item that matches, `filter` returns **every** match, and `some` tells whether at least one exists.",
    },
    {
      icon: "🧮",
      ar: "`reduce` يجمع المصفوفة في قيمة واحدة: `prices.reduce((sum, p) => sum + p, 0)` يحسب المجموع. الرقم `0` هو قيمة البداية.",
      en: "`reduce` folds an array into one value: `prices.reduce((sum, p) => sum + p, 0)` adds them up. `0` is the starting value.",
    },
    {
      icon: "🌊",
      ar: "عامل النشر `...` ينسخ ويدمج: `[...a, ...b]` يدمج مصفوفتين، و `{ ...user, age: 22 }` ينسخ كائنًا ويغيّر خاصية دون تعديل الأصل.",
      en: "The spread `...` copies and merges: `[...a, ...b]` joins arrays, and `{ ...user, age: 22 }` copies an object and changes one property without touching the original.",
    },
  ],
  example: {
    code: 'const items = [\n  { name: "Pen", price: 5 },\n  { name: "Book", price: 30 },\n  { name: "Bag", price: 45 },\n];\n\nconsole.log(items.find((i) => i.price > 20).name);\nconsole.log(items.filter((i) => i.price < 40).length);\nconsole.log(items.reduce((sum, i) => sum + i.price, 0));',
    note: { ar: "أول منتج غالٍ، عدد الرخيص، والمجموع.", en: "The first pricey item, the count of cheap ones, and the total." },
    lang: "js",
  },
  modern: {
    old: "var total = 0;\nfor (var i = 0; i < items.length; i++) {\n  total += items[i].price;\n}",
    now: "const total = items.reduce((sum, i) => sum + i.price, 0);",
    text: { ar: "دوال المصفوفات تصف **ماذا** تريد بدل **كيف** تحسبه خطوة بخطوة.", en: "Array methods describe **what** you want instead of **how** to compute it step by step." },
  },
  files: ["js", "html"],
  starter: { js: 'const cart = [\n  { name: "Mouse", price: 20 },\n  { name: "Keyboard", price: 40 },\n  { name: "Cable", price: 5 },\n];\n\n', html: "<h1>Cart</h1>\n" },
  solution: {
    js: 'const cart = [\n  { name: "Mouse", price: 20 },\n  { name: "Keyboard", price: 40 },\n  { name: "Cable", price: 5 },\n];\n\nconst total = cart.reduce((sum, item) => sum + item.price, 0);\nconsole.log(total);\n\nconst cheap = cart.filter((item) => item.price < 25);\nconsole.log(cheap.length);\n\nconst withHub = [...cart, { name: "Hub", price: 15 }];\nconsole.log(withHub.length);\n',
    html: "<h1>Cart</h1>\n",
  },
  tasks: [
    { id: "reduce", label: { ar: "احسب مجموع الأسعار بـ `reduce` واطبعه (65)", en: "Total the prices with `reduce` and print it (65)" }, test: ({ files, logs }) => /\.reduce\(/.test(files.js ?? "") && printed(logs, "65") },
    { id: "filter", label: { ar: "بـ `filter` اطبع عدد المنتجات الأرخص من 25 (2)", en: "With `filter`, print how many cost under 25 (2)" }, test: ({ files, logs }) => /\.filter\(/.test(files.js ?? "") && printed(logs, "2") },
    { id: "spread", label: { ar: "انسخ السلة مع منتج جديد بـ `...` واطبع طولها (4)", en: "Copy the cart plus a new item with `...` and print its length (4)" }, test: ({ files, logs }) => /\.\.\.cart\b/.test(files.js ?? "") && printed(logs, "4") },
  ],
  hints: [
    { ar: "`cart.reduce((sum, item) => sum + item.price, 0)`", en: "`cart.reduce((sum, item) => sum + item.price, 0)`" },
    { ar: '`[...cart, { name: "Hub", price: 15 }]`', en: '`[...cart, { name: "Hub", price: 15 }]`' },
  ],
  xp: 30,
};

export const classes: Lesson = {
  slug: "classes",
  title: { ar: "الأصناف: class", en: "Classes" },
  body: [
    {
      icon: "🏭",
      ar: "**الصنف** (class) قالب تصنع منه كائنات متشابهة: كل حساب بنكي له رصيد ودوال للإيداع والسحب. تصنع نسخة بـ `new`.",
      en: "A **class** is a template for similar objects: every bank account has a balance and methods to deposit and withdraw. Make one with `new`.",
    },
    {
      icon: "🔧",
      ar: "`constructor` يعمل عند الإنشاء ويجهّز البيانات بـ `this`. والدوال داخل الصنف تسمى **methods**.",
      en: "The `constructor` runs on creation and sets up data with `this`. Functions inside the class are called **methods**.",
    },
    {
      icon: "🔒",
      ar: "الحقول الخاصة تبدأ بـ `#`: `#balance` لا يمكن تغييرها من الخارج، فقط عبر الدوال. هكذا تحمي البيانات من الأخطاء.",
      en: "Private fields start with `#`: `#balance` can't be changed from outside, only through methods. That's how you protect data from mistakes.",
    },
      { icon: "🔍", ar: "**الـ getter** دالة تُقرأ كأنها خاصية: `get balance() { return this.#balance; }` ثم `account.balance` بدون أقواس. مفيد لقيمة محسوبة أو خاصة.", en: "A **getter** is a method you read like a property: `get balance() { return this.#balance; }` then `account.balance` with no parentheses. Handy for a computed or private value." },
  ],
  example: {
    code: "class Counter {\n  #count = 0;\n\n  increment() {\n    this.#count++;\n  }\n\n  get value() {\n    return this.#count;\n  }\n}\n\nconst c = new Counter();\nc.increment();\nc.increment();\nconsole.log(c.value);",
    note: { ar: "عدّاد بحقل خاص لا يُعدّل إلا بالدالة.", en: "A counter with a private field changed only through its method." },
    lang: "js",
  },
  modern: {
    old: "function Account(owner) { this.owner = owner; }\nAccount.prototype.deposit = function (n) { … };",
    now: "class Account {\n  #balance = 0;\n  deposit(n) { … }\n}",
    text: { ar: "صيغة class أوضح من prototype القديمة، والحقول الخاصة `#` تحمي البيانات فعليًا.", en: "class syntax is clearer than old prototypes, and private `#` fields truly protect data." },
    since: "ES2022 (#private)",
  },
  files: ["js", "html"],
  starter: { js: "", html: "<h1>Classes</h1>\n" },
  solution: {
    js: 'class Account {\n  #balance = 0;\n\n  constructor(owner) {\n    this.owner = owner;\n  }\n\n  deposit(amount) {\n    this.#balance += amount;\n  }\n\n  get balance() {\n    return this.#balance;\n  }\n}\n\nconst acc = new Account("Sara");\nacc.deposit(50);\nconsole.log(acc.balance);\n',
    html: "<h1>Classes</h1>\n",
  },
  harness: 'try { const a = new Account("Ali"); a.deposit(30); a.deposit(12); console.log("__acc__", a.owner, a.balance, "balance" in a && Object.keys(a).includes("balance") ? "public" : "private"); } catch (e) { console.log("__acc__", "missing"); }',
  tasks: [
    { id: "class", label: { ar: "أنشئ `class Account` فيه `constructor(owner)` يحفظ `this.owner`", en: "Create `class Account` with a `constructor(owner)` that saves `this.owner`" }, test: ({ logs }) => logs.some((l) => l.startsWith("__acc__ Ali")) },
    { id: "deposit", label: { ar: "أضف دالة `deposit(amount)` و getter اسمه `balance`", en: "Add a `deposit(amount)` method and a `balance` getter" }, test: ({ logs }) => logs.some((l) => /^__acc__ Ali 42 /.test(l)) },
    { id: "private", label: { ar: "اجعل الرصيد حقلًا خاصًا `#balance`", en: "Keep the balance in a private `#balance` field" }, test: ({ files, logs }) => /#balance/.test(files.js ?? "") && printed(logs, "__acc__ Ali 42 private") },
  ],
  hints: [
    { ar: "`class Account { #balance = 0; constructor(owner) { this.owner = owner; } }`", en: "`class Account { #balance = 0; constructor(owner) { this.owner = owner; } }`" },
    { ar: "`deposit(amount) { this.#balance += amount; }` و `get balance() { return this.#balance; }`", en: "`deposit(amount) { this.#balance += amount; }` and `get balance() { return this.#balance; }`" },
  ],
  xp: 35,
};

export const errors: Lesson = {
  slug: "errors",
  title: { ar: "التعامل مع الأخطاء: try و catch", en: "Handling errors: try and catch" },
  body: [
    {
      icon: "💥",
      ar: "الأخطاء تحدث: مدخلات خاطئة، شبكة مقطوعة. إذا لم تتعامل معها يتوقف البرنامج. `try { … } catch (error) { … }` يلتقط الخطأ ويكمل.",
      en: "Errors happen: bad input, no network. Unhandled, they stop your program. `try { … } catch (error) { … }` catches the error and carries on.",
    },
    {
      icon: "🚨",
      ar: "أنت أيضًا ترمي أخطاء عندما يكون شيء غير صالح: `throw new Error(\"Age must be a number\")`. والرسالة تصل إلى `error.message`.",
      en: "You throw errors too when something is invalid: `throw new Error(\"Age must be a number\")`. The text arrives as `error.message`.",
    },
    {
      icon: "🧹",
      ar: "`finally` يعمل دائمًا، سواء نجح الكود أو فشل: مكان مناسب لإخفاء مؤشر التحميل مثلًا.",
      en: "`finally` always runs, success or failure: a good place to hide a loading spinner, for example.",
    },
  ],
  example: {
    code: 'function parsePrice(text) {\n  const n = Number(text);\n  if (Number.isNaN(n)) throw new Error(`"${text}" is not a price`);\n  return n;\n}\n\ntry {\n  console.log(parsePrice("12"));\n  console.log(parsePrice("abc"));\n} catch (error) {\n  console.log("Oops:", error.message);\n} finally {\n  console.log("Done");\n}',
    note: { ar: "الأول ينجح، والثاني يرمي خطأ يُلتقط بهدوء.", en: "The first works; the second throws an error that's caught calmly." },
    lang: "js",
  },
  files: ["js", "html"],
  starter: { js: "", html: "<h1>Errors</h1>\n" },
  solution: {
    js: 'function parseAge(text) {\n  const age = Number(text);\n  if (Number.isNaN(age)) {\n    throw new Error("Age must be a number");\n  }\n  return age;\n}\n\ntry {\n  parseAge("ten");\n} catch (error) {\n  console.log(error.message);\n}\n',
    html: "<h1>Errors</h1>\n",
  },
  harness: 'try { console.log("__ok__", parseAge("21")); } catch (e) { console.log("__ok__", "threw"); } try { parseAge("x"); console.log("__bad__", "no-throw"); } catch (e) { console.log("__bad__", e instanceof Error ? "Error" : "other"); }',
  tasks: [
    { id: "valid", label: { ar: "اكتب `parseAge(text)` تُرجع الرقم للنص الصحيح", en: "Write `parseAge(text)` returning the number for valid text" }, test: ({ logs }) => printed(logs, "__ok__ 21") },
    { id: "throw", label: { ar: "وترمي `new Error(...)` إذا لم يكن رقمًا", en: "and throwing `new Error(...)` when it isn't a number" }, test: ({ logs }) => printed(logs, "__bad__ Error") },
    { id: "catch", label: { ar: "استدعها بنص خاطئ داخل `try/catch` واطبع `error.message`", en: "Call it with bad text in `try/catch` and print `error.message`" }, test: ({ files, logs }) => /try\s*\{[\s\S]*catch\s*\(/.test(files.js ?? "") && logs.some((l) => !l.startsWith("__") && !l.startsWith("Error:") && l.length > 3) },
  ],
  hints: [
    { ar: '`if (Number.isNaN(age)) { throw new Error("Age must be a number"); }`', en: '`if (Number.isNaN(age)) { throw new Error("Age must be a number"); }`' },
    { ar: '`try { parseAge("ten"); } catch (error) { console.log(error.message); }`', en: '`try { parseAge("ten"); } catch (error) { console.log(error.message); }`' },
  ],
  xp: 30,
};

/** A tiny "API" bundled as a data URL, so fetch works offline and in the sandbox. */
const USERS_URL = `data:application/json,${encodeURIComponent(JSON.stringify([{ id: 1, name: "Sara", city: "Tunis" }, { id: 2, name: "Omar", city: "Cairo" }, { id: 3, name: "Lina", city: "Rabat" }]))}`;

export const fetchJson: Lesson = {
  slug: "fetch-json",
  title: { ar: "جلب البيانات: fetch و JSON", en: "Fetching data: fetch and JSON" },
  body: [
    {
      icon: "🌐",
      ar: "التطبيقات تجلب البيانات من **API**: عنوان على الإنترنت يُرجع بيانات بصيغة **JSON** (نص يشبه كائنات JavaScript).",
      en: "Apps get data from an **API**: an address on the internet that returns data as **JSON** (text that looks like JavaScript objects).",
    },
    {
      icon: "📥",
      ar: "`const res = await fetch(url)` يرسل الطلب، ثم `await res.json()` يحوّل الرد إلى كائنات. وتحقق من `res.ok` قبل الاستخدام.",
      en: "`const res = await fetch(url)` sends the request, then `await res.json()` turns the reply into objects. Check `res.ok` before using it.",
    },
    {
      icon: "🖼️",
      ar: "بعدها تعرض البيانات في الصفحة: حلقة على المصفوفة وإنشاء عناصر. في هذا الدرس، العنوان `USERS_URL` جاهز ويعمل حتى بدون إنترنت.",
      en: "Then show the data on the page: loop over the array and create elements. In this lesson `USERS_URL` is ready and works even offline.",
    },
  ],
  example: {
    code: `const USERS_URL = "${USERS_URL}";\n\nasync function load() {\n  const res = await fetch(USERS_URL);\n  const users = await res.json();\n  console.log(users.length, "users");\n  console.log(users[0].name);\n}\n\nload();`,
    note: { ar: "طلب، ثم تحويل JSON، ثم استخدام البيانات.", en: "Request, parse JSON, use the data." },
    lang: "js",
  },
  modern: {
    old: "const xhr = new XMLHttpRequest();\nxhr.onload = function () { JSON.parse(xhr.responseText) … };\nxhr.open(\"GET\", url); xhr.send();",
    now: "const res = await fetch(url);\nconst data = await res.json();",
    text: { ar: "`XMLHttpRequest` القديم طويل ومربك. `fetch` مع `await` سطران.", en: "The old `XMLHttpRequest` is long and confusing. `fetch` with `await` is two lines." },
  },
  files: ["js", "html"],
  starter: { js: `const USERS_URL = "${USERS_URL}";\n\n`, html: '<h1>Users</h1>\n<ul id="list"></ul>\n' },
  solution: {
    js: `const USERS_URL = "${USERS_URL}";\n\nasync function showUsers() {\n  const res = await fetch(USERS_URL);\n  if (!res.ok) throw new Error("Request failed");\n  const users = await res.json();\n  const list = document.querySelector("#list");\n  for (const user of users) {\n    const li = document.createElement("li");\n    li.textContent = user.name;\n    list.append(li);\n  }\n  console.log(users.length);\n}\n\nshowUsers();\n`,
    html: '<h1>Users</h1>\n<ul id="list"></ul>\n',
  },
  settle: 700,
  harness: 'setTimeout(function () { console.log("__li__", document.querySelectorAll("#list li").length); }, 600);',
  tasks: [
    { id: "fetch", label: { ar: "اجلب `USERS_URL` بـ `await fetch` و `await res.json()`", en: "Fetch `USERS_URL` with `await fetch` and `await res.json()`" }, test: ({ files }) => /await\s+fetch\(\s*USERS_URL/.test(files.js ?? "") && /await\s+\w+\.json\(\)/.test(files.js ?? "") },
    { id: "count", label: { ar: "اطبع عدد المستخدمين (3)", en: "Print the number of users (3)" }, test: ({ logs }) => printed(logs, "3") },
    { id: "render", label: { ar: "أضف اسم كل مستخدم كعنصر `<li>` داخل `#list`", en: "Add each user's name as an `<li>` in `#list`" }, test: ({ logs }) => printed(logs, "__li__ 3") },
  ],
  hints: [
    { ar: "`const res = await fetch(USERS_URL); const users = await res.json();` داخل دالة `async`", en: "`const res = await fetch(USERS_URL); const users = await res.json();` inside an `async` function" },
    { ar: '`const li = document.createElement("li"); li.textContent = user.name; list.append(li);`', en: '`const li = document.createElement("li"); li.textContent = user.name; list.append(li);`' },
  ],
  xp: 40,
};

export const modules: Lesson = {
  slug: "modules-tooling",
  title: { ar: "الوحدات وأدوات المحترفين: npm و Vite", en: "Modules and pro tools: npm and Vite" },
  body: [
    {
      icon: "📦",
      ar: "المشاريع الحقيقية تُقسَّم إلى ملفات **وحدات** (modules): ملف يصدّر `export function sum() {}` وآخر يستورد `import { sum } from \"./math.js\"`.",
      en: "Real projects split code into **module** files: one exports `export function sum() {}`, another imports `import { sum } from \"./math.js\"`.",
    },
    {
      icon: "📚",
      ar: "**npm** مخزن لملايين المكتبات الجاهزة. تثبّت مكتبة بـ `npm install date-fns`، وتُسجّل في ملف `package.json` مع إصدارها.",
      en: "**npm** is a store of millions of ready-made libraries. Install one with `npm install date-fns`; it's recorded in `package.json` with its version.",
    },
    {
      icon: "⚡",
      ar: "**Vite** يجهّز مشروعك في ثوانٍ: `npm create vite@latest` ثم `npm run dev` لخادم تطوير سريع، و `npm run build` لنسخة مضغوطة جاهزة للنشر.",
      en: "**Vite** sets up a project in seconds: `npm create vite@latest`, then `npm run dev` for a fast dev server, and `npm run build` for an optimized version ready to deploy.",
    },
    {
      icon: "🟢",
      ar: "لتشغيل npm تحتاج **Node.js** على حاسوبك (من `nodejs.org`، اختر نسخة LTS). Node يشغّل JavaScript خارج المتصفح، وستستخدمه في مرحلة Backend.",
      en: "npm needs **Node.js** on your computer (from `nodejs.org`, pick the LTS version). Node runs JavaScript outside the browser, and you'll use it in the Backend stage.",
    },
  ],
  modern: {
    old: '<script src="jquery.js"></script>\n<script src="plugin.js"></script>\n<script src="app.js"></script>',
    now: 'import { format } from "date-fns";\n// npm + Vite bundle everything',
    text: { ar: "بدل ترتيب عشرات ملفات script يدويًا، الوحدات تحدد بوضوح من يعتمد على من، و Vite يجمعها.", en: "Instead of ordering dozens of script tags by hand, modules state who depends on whom, and Vite bundles them." },
  },
  files: [],
  starter: {},
  solution: {},
  tasks: [],
  hints: [],
  quiz: [
    {
      id: "q1",
      prompt: { ar: "كيف تستورد الدالة `sum` من الملف `math.js`؟", en: "How do you import `sum` from `math.js`?" },
      options: [
        { ar: '`import { sum } from "./math.js"`', en: '`import { sum } from "./math.js"`' },
        { ar: '`include math.js`', en: '`include math.js`' },
        { ar: '`<script src="sum">`', en: '`<script src="sum">`' },
      ],
      answer: 0,
    },
    {
      id: "q2",
      prompt: { ar: "أين تُسجَّل المكتبات التي يستخدمها المشروع؟", en: "Where are a project's libraries recorded?" },
      options: [
        { ar: "`index.html`", en: "`index.html`" },
        { ar: "`package.json`", en: "`package.json`" },
        { ar: "`style.css`", en: "`style.css`" },
      ],
      answer: 1,
    },
    {
      id: "q3",
      prompt: { ar: "أي أمر يصنع نسخة الإنتاج الجاهزة للنشر؟", en: "Which command makes the production build to deploy?" },
      options: [
        { ar: "`npm run dev`", en: "`npm run dev`" },
        { ar: "`npm run build`", en: "`npm run build`" },
        { ar: "`npm install`", en: "`npm install`" },
      ],
      answer: 1,
    },
  ],
  xp: 20,
};
