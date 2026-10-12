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
  title: { ar: "البحث والجمع: find و reduce", en: "Find and total: find and reduce" },
  body: [
    {
      icon: "🔎",
      ar: "`find` يُرجع **أول** عنصر يحقق شرطًا: `cart.find((item) => item.price > 30)` يعطي أول منتج سعره أكبر من 30. (بينما `filter` الذي تعلمته يُرجع **كل** العناصر في مصفوفة.)",
      en: "`find` returns the **first** item that matches: `cart.find((item) => item.price > 30)` gives the first product over 30. (The `filter` you learned returns **every** match, in an array.)",
    },
    {
      icon: "🧮",
      ar: "`reduce` يجمع المصفوفة في قيمة واحدة: `prices.reduce((sum, p) => sum + p, 0)` يحسب المجموع. `sum` هو المجموع حتى الآن، و `0` قيمة البداية.",
      en: "`reduce` folds an array into one value: `prices.reduce((sum, p) => sum + p, 0)` adds them up. `sum` is the total so far, and `0` is the starting value.",
    },
    {
      icon: "🧾",
      ar: "عناصر السلة هنا **كائنات**، لذلك نقرأ السعر بـ `item.price` والاسم بـ `item.name`.",
      en: "The cart items here are **objects**, so read the price with `item.price` and the name with `item.name`.",
    },
  ],
  example: {
    code: 'const items = [\n  { name: "Pen", price: 5 },\n  { name: "Book", price: 30 },\n  { name: "Bag", price: 45 },\n];\n\nconst pricey = items.find((i) => i.price > 20);\nconsole.log(pricey.name);  // Book\n\nconst total = items.reduce((sum, i) => sum + i.price, 0);\nconsole.log(total);        // 80',
    note: { ar: "أول منتج غالٍ، ثم المجموع.", en: "The first pricey item, then the total." },
    lang: "js",
  },
  modern: {
    old: "var total = 0;\nfor (var i = 0; i < items.length; i++) {\n  total += items[i].price;\n}",
    now: "const total = items.reduce((sum, i) => sum + i.price, 0);",
    text: { ar: "دوال المصفوفات تصف **ماذا** تريد بدل **كيف** تحسبه خطوة بخطوة. والحلقة مع `let total = 0` صحيحة أيضًا.", en: "Array methods describe **what** you want instead of **how** to compute it step by step. A loop with `let total = 0` is also correct." },
  },
  files: ["js"],
  starter: { js: 'const cart = [\n  { name: "Mouse", price: 20 },\n  { name: "Keyboard", price: 40 },\n  { name: "Cable", price: 5 },\n];\n\n' },
  solution: {
    js: 'const cart = [\n  { name: "Mouse", price: 20 },\n  { name: "Keyboard", price: 40 },\n  { name: "Cable", price: 5 },\n];\n\nconst pricey = cart.find((item) => item.price > 30);\nconsole.log(pricey.name);\n\nconst total = cart.reduce((sum, item) => sum + item.price, 0);\nconsole.log(total);\n',
  },
  tasks: [
    { id: "find", label: { ar: "بـ `find` اطبع اسم أول منتج سعره أكبر من 30 (`Keyboard`)", en: "With `find`, print the name of the first product over 30 (`Keyboard`)" }, test: ({ files, logs }) => /\.find\(/.test(files.js ?? "") && printed(logs, "Keyboard") },
    { id: "reduce", label: { ar: "احسب مجموع الأسعار بـ `reduce` واطبعه (`65`)", en: "Total the prices with `reduce` and print it (`65`)" }, test: ({ files, logs }) => /\.reduce\(/.test(files.js ?? "") && printed(logs, "65") },
  ],
  hints: [
    { ar: "`const pricey = cart.find((item) => item.price > 30);` ثم `console.log(pricey.name);`", en: "`const pricey = cart.find((item) => item.price > 30);` then `console.log(pricey.name);`" },
    { ar: "`const total = cart.reduce((sum, item) => sum + item.price, 0);` ثم `console.log(total);`", en: "`const total = cart.reduce((sum, item) => sum + item.price, 0);` then `console.log(total);`" },
  ],
  xp: 30,
};

export const classes: Lesson = {
  slug: "classes",
  title: { ar: "الأصناف: class", en: "Classes" },
  body: [
    {
      icon: "🏭",
      ar: "**الصنف** (class) قالب تصنع منه كائنات متشابهة: كل حساب بنكي له صاحب ورصيد ودالة للإيداع. تصنع نسخة جديدة بـ `new Account(\"Sara\")`.",
      en: "A **class** is a template for similar objects: every bank account has an owner, a balance and a way to deposit. Make a new one with `new Account(\"Sara\")`.",
    },
    {
      icon: "🔧",
      ar: "`constructor` يعمل مرة عند الإنشاء ويجهّز البيانات. الكلمة `this` تعني «هذا الكائن نفسه»: `this.owner = owner;` يحفظ الاسم داخله.",
      en: "The `constructor` runs once on creation and sets up the data. `this` means \"this very object\": `this.owner = owner;` stores the name inside it.",
    },
    {
      icon: "⚙️",
      ar: "الدوال داخل الصنف تسمى **methods** وتُكتب بدون كلمة `function`: `deposit(amount) { this.balance += amount; }`. وتستدعيها بالنقطة: `acc.deposit(50)`.",
      en: "Functions inside a class are called **methods** and are written without the `function` keyword: `deposit(amount) { this.balance += amount; }`. Call one with a dot: `acc.deposit(50)`.",
    },
  ],
  example: {
    code: 'class Dog {\n  constructor(name) {\n    this.name = name;\n    this.tricks = 0;\n  }\n\n  learn() {\n    this.tricks += 1;\n  }\n}\n\nconst rex = new Dog("Rex");\nrex.learn();\nconsole.log(rex.name, rex.tricks);  // Rex 1',
    note: { ar: "صنف، ثم نسخة منه، ثم استدعاء دالة.", en: "A class, an instance of it, then a method call." },
    lang: "js",
  },
  modern: {
    old: "function Account(owner) { this.owner = owner; }\nAccount.prototype.deposit = function (n) { … };",
    now: "class Account {\n  constructor(owner) { this.owner = owner; }\n  deposit(n) { … }\n}",
    text: { ar: "صيغة class أوضح من prototype القديمة، وتعمل بنفس الطريقة تحت الغطاء.", en: "class syntax is clearer than old prototypes and works the same way under the hood." },
    since: "ES2015",
  },
  files: ["js"],
  starter: { js: "" },
  solution: {
    js: 'class Account {\n  constructor(owner) {\n    this.owner = owner;\n    this.balance = 0;\n  }\n\n  deposit(amount) {\n    this.balance += amount;\n  }\n}\n\nconst acc = new Account("Sara");\nacc.deposit(50);\nconsole.log(acc.balance);\n',
  },
  harness: 'try { const a = new Account("Ali"); const start = a.balance; let after = "none"; if (typeof a.deposit === "function") { a.deposit(30); a.deposit(12); after = a.balance; } console.log("__acc__", a.owner, start, after); } catch (e) { console.log("__acc__", "missing"); }',
  tasks: [
    { id: "class", label: { ar: "أنشئ `class Account` فيه `constructor(owner)` يحفظ `this.owner` ويبدأ `this.balance` من 0", en: "Create `class Account` with a `constructor(owner)` that saves `this.owner` and starts `this.balance` at 0" }, test: ({ logs }) => logs.some((l) => l.startsWith("__acc__ Ali 0 ")) },
    { id: "deposit", label: { ar: "أضف دالة `deposit(amount)` تزيد الرصيد بالمبلغ", en: "Add a `deposit(amount)` method that adds the amount to the balance" }, test: ({ logs }) => printed(logs, "__acc__ Ali 0 42") },
    { id: "use", label: { ar: "اصنع حسابًا بـ `new`، أودِع 50، واطبع رصيده (`50`)", en: "Make an account with `new`, deposit 50, and print its balance (`50`)" }, test: ({ files, logs }) => /new\s+Account\(/.test(files.js ?? "") && printed(logs, "50") },
  ],
  hints: [
    { ar: "`class Account { constructor(owner) { this.owner = owner; this.balance = 0; } }`", en: "`class Account { constructor(owner) { this.owner = owner; this.balance = 0; } }`" },
    { ar: '`deposit(amount) { this.balance += amount; }` ثم `const acc = new Account("Sara"); acc.deposit(50); console.log(acc.balance);`', en: '`deposit(amount) { this.balance += amount; }` then `const acc = new Account("Sara"); acc.deposit(50); console.log(acc.balance);`' },
  ],
  xp: 35,
};

export const errors: Lesson = {
  slug: "errors",
  title: { ar: "التعامل مع الأخطاء: try و catch", en: "Handling errors: try and catch" },
  body: [
    {
      icon: "💥",
      ar: "الأخطاء تحدث: بيانات تالفة، شبكة مقطوعة. إذا لم تتعامل معها يتوقف البرنامج كله عند الخطأ، ولا يُنفَّذ ما بعده.",
      en: "Errors happen: broken data, no network. Unhandled, the whole program stops at the error and nothing after it runs.",
    },
    {
      icon: "🥅",
      ar: "`try { … } catch (error) { … }` يجرّب الكود داخل `try`، فإن حدث خطأ ينتقل إلى `catch` بدل أن يتوقف، ثم يكمل البرنامج بعدها. ونص الخطأ في `error.message`.",
      en: "`try { … } catch (error) { … }` tries the code inside `try`; if it fails, it jumps to `catch` instead of stopping, and the program carries on after it. The error's text is in `error.message`.",
    },
    {
      icon: "📄",
      ar: "`JSON.parse(text)` يحوّل نصًا مثل `'{\"name\": \"Sara\"}'` إلى كائن. إذا كان النص ناقصًا أو تالفًا **يرمي خطأ**، وهذا ما سنلتقطه.",
      en: "`JSON.parse(text)` turns text like `'{\"name\": \"Sara\"}'` into an object. If the text is incomplete or broken it **throws an error**, and that's what we'll catch.",
    },
  ],
  example: {
    code: 'const good = \'{"city": "Tunis"}\';\n\ntry {\n  const data = JSON.parse(good);\n  console.log(data.city);\n} catch (error) {\n  console.log("Could not read it");\n}\n\nconsole.log("Still running");',
    note: { ar: "بنص سليم يعمل `try` كاملًا. جرّب حذف `}` من النص لترى `catch`.", en: "With good text `try` runs fully. Try deleting the `}` to see `catch` run." },
    lang: "js",
  },
  files: ["js"],
  starter: { js: 'const text = \'{"name": "Sara"\'; // the closing } is missing\n\n' },
  solution: {
    js: 'const text = \'{"name": "Sara"\'; // the closing } is missing\n\ntry {\n  const user = JSON.parse(text);\n  console.log(user.name);\n} catch (error) {\n  console.log("Bad data");\n}\n\nconsole.log("Done");\n',
  },
  tasks: [
    { id: "try", label: { ar: "ضع `JSON.parse(text)` داخل `try`", en: "Put `JSON.parse(text)` inside `try`" }, test: ({ files }) => /try\s*\{[^}]*JSON\.parse\(\s*text\s*\)/.test(files.js ?? "") && /catch\s*(\(|\{)/.test(files.js ?? "") },
    { id: "catch", label: { ar: "في `catch` اطبع `Bad data`", en: "In `catch`, print `Bad data`" }, test: ({ logs }) => printed(logs, "Bad data") },
    { id: "after", label: { ar: "بعد `try/catch` اطبع `Done` لترى أن البرنامج أكمل", en: "After the `try/catch`, print `Done` to see the program carry on" }, test: ({ logs }) => { const i = logs.findIndex((l) => /^bad data$/i.test(l.trim())); const j = logs.findIndex((l) => /^done$/i.test(l.trim())); return i >= 0 && j > i; } },
  ],
  hints: [
    { ar: "`try { const user = JSON.parse(text); console.log(user.name); } catch (error) { … }`", en: "`try { const user = JSON.parse(text); console.log(user.name); } catch (error) { … }`" },
    { ar: '`catch (error) { console.log("Bad data"); }` ثم بعدها `console.log("Done");`', en: '`catch (error) { console.log("Bad data"); }` then after it `console.log("Done");`' },
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
      ar: "الناتج هنا **مصفوفة كائنات**، فتستعمل ما تعلمته: `users.length` للعدد و `users[0].name` لاسم أول مستخدم. والعنوان `USERS_URL` جاهز ويعمل حتى بدون إنترنت.",
      en: "The result here is an **array of objects**, so use what you know: `users.length` for the count and `users[0].name` for the first user's name. `USERS_URL` is ready and works even offline.",
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
  files: ["js"],
  starter: { js: `const USERS_URL = "${USERS_URL}";\n\n` },
  solution: {
    js: `const USERS_URL = "${USERS_URL}";\n\nasync function loadUsers() {\n  const res = await fetch(USERS_URL);\n  const users = await res.json();\n  console.log(users.length);\n  console.log(users[0].name);\n}\n\nloadUsers();\n`,
  },
  settle: 700,
  tasks: [
    { id: "fetch", label: { ar: "داخل دالة `async` اجلب `USERS_URL` بـ `await fetch` ثم حوّله بـ `await res.json()`", en: "Inside an `async` function, fetch `USERS_URL` with `await fetch`, then parse it with `await res.json()`" }, test: ({ files }) => /await\s+fetch\(\s*USERS_URL/.test(files.js ?? "") && /await\s+\w+\.json\(\)/.test(files.js ?? "") },
    { id: "count", label: { ar: "اطبع عدد المستخدمين (`3`)", en: "Print the number of users (`3`)" }, test: ({ logs }) => printed(logs, "3") },
    { id: "first", label: { ar: "اطبع اسم أول مستخدم (`Sara`)", en: "Print the first user's name (`Sara`)" }, test: ({ logs }) => printed(logs, "Sara") },
  ],
  hints: [
    { ar: "`async function loadUsers() { const res = await fetch(USERS_URL); const users = await res.json(); … }` ثم `loadUsers();`", en: "`async function loadUsers() { const res = await fetch(USERS_URL); const users = await res.json(); … }` then `loadUsers();`" },
    { ar: "`console.log(users.length);` و `console.log(users[0].name);`", en: "`console.log(users.length);` and `console.log(users[0].name);`" },
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
