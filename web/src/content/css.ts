import type { Exam, Lesson } from "./types";

const has = (v: string) => v.length > 0;

const cardPage = `<div class="card">
  <h1>Code Master</h1>
  <p>I am learning CSS.</p>
</div>
`;

export const cssLessons: Lesson[] = [
  {
    slug: "what-is-css",
    title: { ar: "ما هي CSS؟", en: "What is CSS?" },
    body: [
      {
        icon: "🎨",
        ar: "**CSS** (Cascading Style Sheets) هي لغة الشكل: الألوان والخطوط والمسافات وترتيب العناصر. HTML تبني الصفحة، و CSS تجمّلها.",
        en: "**CSS** (Cascading Style Sheets) is the language of looks: colors, fonts, spacing and layout. HTML builds the page, CSS makes it beautiful.",
      },
      {
        icon: "🎯",
        ar: "كل قاعدة CSS لها **محدِّد** (selector) يختار العناصر، ثم بين `{ }` **خصائص** وقيمها: `h1 { color: blue; }` تعني «كل عناوين h1 لونها أزرق».",
        en: "Each CSS rule has a **selector** that picks elements, then between `{ }` **properties** and values: `h1 { color: blue; }` means \"every h1 is blue\".",
      },
      {
        icon: "🔗",
        ar: "نكتب CSS في ملف منفصل `style.css` ونربطه في `<head>` بالسطر `<link rel=\"stylesheet\" href=\"style.css\">`. في هذا التطبيق الربط جاهز تلقائيًا.",
        en: "We write CSS in a separate `style.css` file and link it in `<head>` with `<link rel=\"stylesheet\" href=\"style.css\">`. In this app the link is already done for you.",
      },
      {
        icon: "🏷️",
        ar: "المحددات الأساسية: اسم الوسم `p`، والـ class بنقطة `.card`، والـ id بعلامة `#main`. استخدم class أغلب الوقت لأنه قابل لإعادة الاستخدام.",
        en: "Basic selectors: a tag name `p`, a class with a dot `.card`, an id with a hash `#main`. Use classes most of the time; they're reusable.",
      },
    ],
    example: {
      code: "h1 {\n  color: royalblue;\n}\n\n.card p {\n  color: gray;\n}",
      note: { ar: "العنوان أزرق، والفقرات داخل .card رمادية.", en: "The heading is blue, paragraphs inside .card are gray." },
      lang: "css",
    },
    modern: {
      old: '<h1 style="color: blue">\n<font color="red">Hi</font>',
      now: "h1 { color: blue; }",
      text: {
        ar: "وسم `<font>` محذوف من HTML، والتنسيق داخل الوسوم صعب الصيانة. اجمع كل التنسيق في ملف CSS واحد.",
        en: "`<font>` was removed from HTML, and inline styles are hard to maintain. Keep all styling in one CSS file.",
      },
    },
    files: ["css", "html"],
    starter: { html: cardPage, css: "/* اكتب CSS هنا / Write CSS here */\n" },
    solution: { html: cardPage, css: "h1 {\n  color: royalblue;\n}\n\n.card p {\n  color: gray;\n}\n" },
    tasks: [
      {
        id: "h1",
        label: { ar: "اجعل لون `h1` أزرق: `color`", en: "Make `h1` blue with `color`" },
        test: ({ rule }) => has(rule("h1", "color")),
      },
      {
        id: "p",
        label: { ar: "لوّن الفقرة باستخدام المحدد `.card p`", en: "Color the paragraph using the `.card p` selector" },
        test: ({ rule }) => has(rule(".card p", "color")),
      },
    ],
    hints: [
      { ar: "ابدأ بـ `h1 {` ثم `color: royalblue;` ثم `}`", en: "Start with `h1 {` then `color: royalblue;` then `}`" },
      { ar: "المحدد `.card p` يعني: الفقرات داخل عنصر class=\"card\".", en: "`.card p` means: paragraphs inside an element with class=\"card\"." },
    ],
    xp: 20,
  },
  {
    slug: "colors-fonts",
    title: { ar: "الألوان والخطوط والمتغيرات", en: "Colors, fonts and variables" },
    body: [
      {
        icon: "🌈",
        ar: "تكتب الألوان بالاسم `tomato`، أو بالرمز `#0e8c7f`، أو `rgb(14 140 127)`. و `background-color` للخلفية و `color` للنص.",
        en: "Write colors by name `tomato`, hex `#0e8c7f`, or `rgb(14 140 127)`. `background-color` is the background and `color` is the text.",
      },
      {
        icon: "🔠",
        ar: "`font-family` لنوع الخط، و `font-size` لحجمه. استخدم وحدة `rem` للأحجام: `1rem` هو حجم النص الأساسي، فيكبر كل شيء معًا إذا كبّر المستخدم الخط.",
        en: "`font-family` sets the typeface and `font-size` its size. Use `rem` for sizes: `1rem` is the base text size, so everything scales if the user enlarges text.",
      },
      {
        icon: "📦",
        ar: "**المتغيرات** (custom properties) تحفظ قيمة لتستخدمها في كل مكان: `--main: #7c5cff;` ثم `color: var(--main);`. تغيّرها مرة واحدة فتتغير في كل الموقع.",
        en: "**Variables** (custom properties) store a value to reuse everywhere: `--main: #7c5cff;` then `color: var(--main);`. Change it once and the whole site follows.",
      },
    ],
    example: {
      code: ":root {\n  --main: #7c5cff;\n}\n\nbody {\n  font-family: system-ui, sans-serif;\n  background-color: #f3f6f6;\n}\n\nh1 {\n  color: var(--main);\n  font-size: 2rem;\n}",
      note: { ar: "لون رئيسي واحد في متغير، يستخدمه العنوان.", en: "One main color in a variable, used by the heading." },
      lang: "css",
    },
    modern: {
      old: "color: #7c5cff;  /* repeated 40 times */",
      now: ":root { --main: #7c5cff; }\ncolor: var(--main);",
      text: {
        ar: "المتغيرات جعلت تغيير ألوان الموقع كله (مثل الوضع الداكن) سطرًا واحدًا بدل البحث والاستبدال.",
        en: "Variables turn re-theming a whole site (like dark mode) into one line instead of find-and-replace.",
      },
      since: "Baseline 2017",
    },
    files: ["css", "html"],
    starter: { html: cardPage, css: ":root {\n  \n}\n" },
    solution: {
      html: cardPage,
      css: ":root {\n  --main: #7c5cff;\n}\n\nbody {\n  font-family: system-ui, sans-serif;\n  background-color: #f3f6f6;\n}\n\nh1 {\n  color: var(--main);\n  font-size: 2rem;\n}\n",
    },
    tasks: [
      {
        id: "var",
        label: { ar: "عرّف متغيرًا `--main` داخل `:root`", en: "Define a `--main` variable in `:root`" },
        test: ({ rule }) => has(rule(":root", "--main")),
      },
      {
        id: "bg",
        label: { ar: "أعطِ `body` لون خلفية `background-color`", en: "Give `body` a `background-color`" },
        test: ({ rule }) => has(rule("body", "background-color")) || has(rule("body", "background")),
      },
      {
        id: "use",
        label: { ar: "لوّن `h1` بـ `var(--main)`", en: "Color `h1` with `var(--main)`" },
        test: ({ rule }) => rule("h1", "color").includes("var(--main)"),
      },
      {
        id: "rem",
        label: { ar: "اجعل حجم `h1` بوحدة `rem`", en: "Size `h1` in `rem`" },
        test: ({ rule }) => /rem$/.test(rule("h1", "font-size")),
      },
    ],
    hints: [
      { ar: "داخل `:root { }` اكتب `--main: #7c5cff;`", en: "Inside `:root { }` write `--main: #7c5cff;`" },
      { ar: "ثم `h1 { color: var(--main); font-size: 2rem; }`", en: "Then `h1 { color: var(--main); font-size: 2rem; }`" },
    ],
    xp: 25,
  },
  {
    slug: "box-model",
    title: { ar: "نموذج الصندوق: المسافات والحدود", en: "The box model: spacing and borders" },
    body: [
      {
        icon: "📦",
        ar: "كل عنصر في الصفحة **صندوق**. من الداخل للخارج: المحتوى، ثم `padding` (مسافة داخلية)، ثم `border` (الحد)، ثم `margin` (مسافة خارجية).",
        en: "Every element is a **box**. From inside out: the content, then `padding` (inner space), then `border`, then `margin` (outer space).",
      },
      {
        icon: "⭕",
        ar: "`border-radius` يدوّر الزوايا، و `box-shadow` يضيف ظلًا. هكذا تصنع بطاقات عصرية مثل بطاقات هذا التطبيق.",
        en: "`border-radius` rounds corners and `box-shadow` adds a shadow. That's how you build modern cards like the ones in this app.",
      },
    ],
    example: {
      code: ".card {\n  padding: 24px;\n  border: 1px solid #ddd;\n  border-radius: 16px;\n  box-shadow: 0 8px 24px rgb(0 0 0 / 10%);\n}",
      note: { ar: "بطاقة بمسافة داخلية وحد وزوايا دائرية وظل.", en: "A card with padding, a border, rounded corners and a shadow." },
      lang: "css",
    },
    tip: {
      text: {
        ar: "ابدأ كل مشروع بـ `* { box-sizing: border-box; }` حتى يُحسب `padding` و `border` داخل العرض الذي تحدده، فلا تتفاجأ بعناصر أعرض من المتوقع.",
        en: "Start every project with `* { box-sizing: border-box; }` so `padding` and `border` count inside the width you set, with no surprise overflow.",
      },
      code: "* { box-sizing: border-box; }",
    },
    modern: {
      old: "width: 300px;  /* + padding = 348px?! */",
      now: "box-sizing: border-box;",
      text: {
        ar: "بدون `border-box` يضاف `padding` إلى العرض فيكبر الصندوق. اليوم كل المواقع الحديثة تستخدم `border-box`.",
        en: "Without `border-box`, `padding` adds to the width and the box grows. Every modern site uses `border-box` today.",
      },
    },
    files: ["css", "html"],
    starter: { html: cardPage, css: ".card {\n  \n}\n" },
    solution: {
      html: cardPage,
      css: "* {\n  box-sizing: border-box;\n}\n\n.card {\n  padding: 24px;\n  border: 1px solid #ddd;\n  border-radius: 16px;\n  box-shadow: 0 8px 24px rgb(0 0 0 / 10%);\n}\n",
    },
    tasks: [
      { id: "padding", label: { ar: "أضف `padding` للبطاقة `.card`", en: "Add `padding` to `.card`" }, test: ({ rule }) => has(rule(".card", "padding")) },
      { id: "border", label: { ar: "أضف حدًا `border`", en: "Add a `border`" }, test: ({ rule }) => has(rule(".card", "border")) || has(rule(".card", "border-width")) },
      { id: "radius", label: { ar: "دوّر الزوايا بـ `border-radius`", en: "Round corners with `border-radius`" }, test: ({ rule }) => has(rule(".card", "border-radius")) },
      { id: "sizing", label: { ar: "أضف `box-sizing: border-box` لكل العناصر `*`", en: "Add `box-sizing: border-box` to every element `*`" }, test: ({ rule }) => rule("*", "box-sizing") === "border-box" },
    ],
    hints: [
      { ar: "داخل `.card { }`: `padding: 24px; border: 1px solid #ddd; border-radius: 16px;`", en: "Inside `.card { }`: `padding: 24px; border: 1px solid #ddd; border-radius: 16px;`" },
      { ar: "قاعدة جديدة: `* { box-sizing: border-box; }`", en: "A new rule: `* { box-sizing: border-box; }`" },
    ],
    xp: 25,
  },
  {
    slug: "flexbox",
    title: { ar: "Flexbox: ترتيب العناصر", en: "Flexbox: arranging elements" },
    body: [
      {
        icon: "↔️",
        ar: "`display: flex` على العنصر الأب يرتّب أبناءه في صف واحد. وهي أسهل طريقة لصنع قوائم وأشرطة وبطاقات متجاورة.",
        en: "`display: flex` on a parent lines its children up in a row. It's the easiest way to build menus, bars and side-by-side cards.",
      },
      {
        icon: "📏",
        ar: "`gap` يضع مسافة متساوية بين العناصر. `justify-content` يوزعها على الخط الأفقي (`center`، `space-between`)، و `align-items` يحاذيها عموديًا.",
        en: "`gap` puts equal space between items. `justify-content` spreads them along the row (`center`, `space-between`), and `align-items` aligns them vertically.",
      },
      {
        icon: "↕️",
        ar: "`flex-direction: column` يجعلها عمودًا، و `flex-wrap: wrap` ينقلها لسطر جديد إذا ضاقت الشاشة.",
        en: "`flex-direction: column` stacks them in a column, and `flex-wrap: wrap` moves them to a new line on narrow screens.",
      },
    ],
    example: {
      code: ".row {\n  display: flex;\n  gap: 12px;\n  justify-content: space-between;\n  align-items: center;\n}",
      note: { ar: "صف من العناصر بمسافات متساوية، موزعة على العرض.", en: "A row of items with equal gaps, spread across the width." },
      lang: "css",
    },
    modern: {
      old: ".item { float: left; margin-right: 12px; }\n.row::after { clear: both; }",
      now: ".row { display: flex; gap: 12px; }",
      text: {
        ar: "كان المطورون يستخدمون `float` وحيلًا كثيرة لترتيب العناصر. Flexbox و `gap` جعلا ذلك سطرين.",
        en: "Developers used `float` and many hacks to arrange items. Flexbox and `gap` made it two lines.",
      },
      since: "Baseline 2021 (gap)",
    },
    files: ["css", "html"],
    starter: {
      html: '<nav class="row">\n  <a href="#">Home</a>\n  <a href="#">Lessons</a>\n  <a href="#">Profile</a>\n</nav>\n',
      css: ".row {\n  \n}\n",
    },
    solution: {
      html: '<nav class="row">\n  <a href="#">Home</a>\n  <a href="#">Lessons</a>\n  <a href="#">Profile</a>\n</nav>\n',
      css: ".row {\n  display: flex;\n  gap: 12px;\n  justify-content: space-between;\n  align-items: center;\n}\n",
    },
    tasks: [
      { id: "flex", label: { ar: "اجعل `.row` يستخدم `display: flex`", en: "Make `.row` use `display: flex`" }, test: ({ rule }) => rule(".row", "display") === "flex" },
      { id: "gap", label: { ar: "أضف مسافة بين الروابط بـ `gap`", en: "Space the links with `gap`" }, test: ({ rule }) => has(rule(".row", "gap")) || has(rule(".row", "column-gap")) },
      { id: "justify", label: { ar: "وزّعها بـ `justify-content`", en: "Spread them with `justify-content`" }, test: ({ rule }) => has(rule(".row", "justify-content")) },
    ],
    hints: [{ ar: "`display: flex; gap: 12px; justify-content: space-between;`", en: "`display: flex; gap: 12px; justify-content: space-between;`" }],
    xp: 30,
  },
  {
    slug: "responsive",
    title: { ar: "التصميم المتجاوب مع الهاتف", en: "Responsive design for phones" },
    body: [
      {
        icon: "📱",
        ar: "أغلب الزوار يفتحون المواقع من الهاتف. التصميم **المتجاوب** يتكيف مع عرض الشاشة.",
        en: "Most visitors browse on phones. A **responsive** design adapts to the screen width.",
      },
      {
        icon: "📐",
        ar: "**Media query** تطبق قواعد فقط عندما يتحقق شرط: `@media (max-width: 600px) { ... }` تعني «على الشاشات الأضيق من 600px».",
        en: "A **media query** applies rules only when a condition holds: `@media (max-width: 600px) { ... }` means \"on screens narrower than 600px\".",
      },
      {
        icon: "🪄",
        ar: "الدالة `clamp()` تجعل الحجم مرنًا بحدود: `font-size: clamp(1.5rem, 5vw, 3rem)` = حجم يكبر مع الشاشة دون أن يصغر أو يكبر أكثر من اللازم.",
        en: "`clamp()` makes sizes fluid within limits: `font-size: clamp(1.5rem, 5vw, 3rem)` grows with the screen but never too small or too big.",
      },
    ],
    example: {
      code: "h1 {\n  font-size: clamp(1.5rem, 5vw, 3rem);\n}\n\n@media (max-width: 600px) {\n  .row {\n    flex-direction: column;\n  }\n}",
      note: { ar: "عنوان مرن، وصف يصبح عمودًا على الهاتف.", en: "A fluid heading, and a row that becomes a column on phones." },
      lang: "css",
    },
    modern: {
      old: "@media (max-width: 600px) { h1 { font-size: 24px } }\n@media (max-width: 900px) { h1 { font-size: 32px } }",
      now: "h1 { font-size: clamp(1.5rem, 5vw, 3rem); }",
      text: {
        ar: "بدل كتابة حجم لكل شاشة، `clamp()` يعطي حجمًا مرنًا بسطر واحد.",
        en: "Instead of a size per screen, `clamp()` gives a fluid size in one line.",
      },
      since: "Baseline 2020",
    },
    files: ["css", "html"],
    starter: {
      html: '<h1>Code Master</h1>\n<nav class="row">\n  <a href="#">Home</a>\n  <a href="#">Lessons</a>\n  <a href="#">Profile</a>\n</nav>\n',
      css: ".row {\n  display: flex;\n  gap: 12px;\n}\n",
    },
    solution: {
      html: '<h1>Code Master</h1>\n<nav class="row">\n  <a href="#">Home</a>\n  <a href="#">Lessons</a>\n  <a href="#">Profile</a>\n</nav>\n',
      css: ".row {\n  display: flex;\n  gap: 12px;\n}\n\nh1 {\n  font-size: clamp(1.5rem, 5vw, 3rem);\n}\n\n@media (max-width: 600px) {\n  .row {\n    flex-direction: column;\n  }\n}\n",
    },
    tasks: [
      { id: "clamp", label: { ar: "اجعل حجم `h1` مرنًا بـ `clamp()`", en: "Make `h1` fluid with `clamp()`" }, test: ({ rule }) => rule("h1", "font-size").startsWith("clamp(") },
      { id: "media", label: { ar: "أضف `@media (max-width: 600px)`", en: "Add `@media (max-width: 600px)`" }, test: ({ media }) => media.some((m) => /max-width/.test(m)) },
      { id: "column", label: { ar: "داخلها اجعل `.row` عمودًا بـ `flex-direction: column`", en: "Inside it, stack `.row` with `flex-direction: column`" }, test: ({ css }) => /@media[^{]*\{[\s\S]*flex-direction\s*:\s*column/.test(css) },
    ],
    hints: [
      { ar: "`h1 { font-size: clamp(1.5rem, 5vw, 3rem); }`", en: "`h1 { font-size: clamp(1.5rem, 5vw, 3rem); }`" },
      { ar: "`@media (max-width: 600px) { .row { flex-direction: column; } }`", en: "`@media (max-width: 600px) { .row { flex-direction: column; } }`" },
    ],
    xp: 30,
  },
];

export const cssExam: Exam = {
  passPercent: 80,
  questions: [
    {
      id: "q-grid",
      prompt: { ar: "ماذا تعني `grid-template-columns: repeat(3, 1fr)`؟", en: "What does `grid-template-columns: repeat(3, 1fr)` mean?" },
      options: [
        { ar: "ثلاثة أعمدة متساوية", en: "Three equal columns" },
        { ar: "ثلاثة صفوف", en: "Three rows" },
        { ar: "عمود واحد عرضه 3", en: "One column 3 wide" },
        { ar: "تكرار العنصر 3 مرات", en: "Repeat the element 3 times" },
      ],
      answer: 0,
    },
    {
      id: "q-hover",
      prompt: { ar: "أي محدد يطبّق تنسيقًا عند مرور الفأرة على الزر؟", en: "Which selector styles a button when the pointer is over it?" },
      options: [
        { ar: "`.btn:hover`", en: "`.btn:hover`" },
        { ar: "`.btn.hover`", en: "`.btn.hover`" },
        { ar: "`.btn::mouse`", en: "`.btn::mouse`" },
        { ar: "`#btn-hover`", en: "`#btn-hover`" },
      ],
      answer: 0,
    },
    {
      id: "q-position",
      prompt: { ar: "لتثبيت شارة في زاوية البطاقة، البطاقة تكون…", en: "To pin a badge in a card's corner, the card is…" },
      options: [
        { ar: "`position: relative` والشارة `absolute`", en: "`position: relative` and the badge `absolute`" },
        { ar: "`position: absolute` والشارة `relative`", en: "`position: absolute` and the badge `relative`" },
        { ar: "`display: grid` فقط", en: "Just `display: grid`" },
        { ar: "`float: right`", en: "`float: right`" },
      ],
      answer: 0,
    },
    {
      id: "q1",
      prompt: { ar: "ما المحدد الذي يختار كل العناصر التي لها class=\"card\"؟", en: "Which selector picks every element with class=\"card\"?" },
      options: [
        { ar: "`#card`", en: "`#card`" },
        { ar: "`.card`", en: "`.card`" },
        { ar: "`card`", en: "`card`" },
        { ar: "`*card`", en: "`*card`" },
      ],
      answer: 1,
    },
    {
      id: "q2",
      prompt: { ar: "أي خاصية تضع مسافة **داخل** الصندوق؟", en: "Which property adds space **inside** the box?" },
      options: [
        { ar: "`margin`", en: "`margin`" },
        { ar: "`padding`", en: "`padding`" },
        { ar: "`gap`", en: "`gap`" },
        { ar: "`border`", en: "`border`" },
      ],
      answer: 1,
    },
    {
      id: "q3",
      prompt: { ar: "ما الطريقة الحديثة لترتيب عناصر في صف مع مسافات؟", en: "What's the modern way to line items up in a row with spacing?" },
      options: [
        { ar: "`float: left` مع `margin`", en: "`float: left` with `margin`" },
        { ar: "`display: flex` مع `gap`", en: "`display: flex` with `gap`" },
        { ar: "جدول `<table>`", en: "A `<table>`" },
        { ar: "`<center>`", en: "`<center>`" },
      ],
      answer: 1,
    },
    {
      id: "q4",
      prompt: { ar: "ماذا تفعل هذه القاعدة؟", en: "What does this rule do?" },
      code: "@media (max-width: 600px) {\n  .row { flex-direction: column; }\n}",
      options: [
        { ar: "تخفي `.row` على الهاتف", en: "Hides `.row` on phones" },
        { ar: "تجعل `.row` عمودًا على الشاشات الضيقة", en: "Stacks `.row` on narrow screens" },
        { ar: "تجعل `.row` عمودًا دائمًا", en: "Always stacks `.row`" },
        { ar: "لا شيء", en: "Nothing" },
      ],
      answer: 1,
    },
    {
      id: "q5",
      prompt: { ar: "كيف تستخدم المتغير `--main`؟", en: "How do you use the `--main` variable?" },
      options: [
        { ar: "`color: --main;`", en: "`color: --main;`" },
        { ar: "`color: var(--main);`", en: "`color: var(--main);`" },
        { ar: "`color: $main;`", en: "`color: $main;`" },
        { ar: "`color: main();`", en: "`color: main();`" },
      ],
      answer: 1,
    },
    { id: "x-keyframes", prompt: { ar: "كيف تعرّف حركة باسم `pulse`؟", en: "How do you define an animation named `pulse`?" }, options: [{ ar: "`@keyframes pulse { … }`", en: "`@keyframes pulse { … }`" }, { ar: "`@animation pulse { … }`", en: "`@animation pulse { … }`" }, { ar: "`.pulse:animate { … }`", en: "`.pulse:animate { … }`" }], answer: 0 },
    { id: "x-vars", prompt: { ar: "كيف تستخدم متغير CSS اسمه `--brand`؟", en: "How do you use a CSS variable named `--brand`?" }, options: [{ ar: "`color: var(--brand);`", en: "`color: var(--brand);`" }, { ar: "`color: $brand;`", en: "`color: $brand;`" }, { ar: "`color: --brand;`", en: "`color: --brand;`" }], answer: 0 },
  ],
};
