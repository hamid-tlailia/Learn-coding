import type { Lesson } from "./types";

const has = (v: string) => v.length > 0;

const buttons = `<nav class="menu">
  <a href="#">Home</a>
  <a href="#">Lessons</a>
  <a href="#">Profile</a>
</nav>
<button class="btn">Start</button>
`;

/** CSS lessons that round out the stage: selectors and states, Grid, positioning, motion. */
export const selectorsStates: Lesson = {
  slug: "selectors-states",
  title: { ar: "المحددات والحالات: hover و focus", en: "Selectors and states: hover and focus" },
  body: [
    {
      icon: "🎯",
      ar: "يمكن دمج المحددات: `.menu a` تعني «الروابط داخل .menu»، و `h1, h2` تعني «الاثنين معًا». هكذا تستهدف بدقة دون إضافة class لكل عنصر.",
      en: "Selectors combine: `.menu a` means \"links inside .menu\", and `h1, h2` means \"both\". You target precisely without a class on every element.",
    },
    {
      icon: "👆",
      ar: "**الحالات** (pseudo-classes) تطبق تنسيقًا في لحظة معيّنة: `:hover` عند مرور الفأرة، و `:focus-visible` عند الوصول بلوحة المفاتيح، و `:nth-child(2)` للعنصر الثاني.",
      en: "**Pseudo-classes** style a moment: `:hover` when the pointer is over, `:focus-visible` when reached by keyboard, and `:nth-child(2)` for the second item.",
    },
    {
      icon: "⚖️",
      ar: "إذا تعارضت قاعدتان تفوز الأكثر **تحديدًا** (specificity): id أقوى من class، و class أقوى من اسم الوسم. وعند التساوي تفوز القاعدة الأخيرة.",
      en: "When two rules clash, the more **specific** wins: an id beats a class, a class beats a tag. On a tie, the later rule wins.",
    },
  ],
  example: {
    code: ".menu a {\n  color: gray;\n}\n\n.menu a:hover {\n  color: royalblue;\n}\n\n.btn:focus-visible {\n  outline: 3px solid orange;\n}",
    note: { ar: "روابط رمادية تصبح زرقاء عند المرور عليها.", en: "Gray links that turn blue on hover." },
    lang: "css",
  },
  modern: {
    old: "a:focus { outline: none; }",
    now: "a:focus-visible { outline: 3px solid orange; }",
    text: {
      ar: "إزالة الإطار تمامًا تجعل الموقع غير قابل للاستخدام بلوحة المفاتيح. `:focus-visible` يُظهره فقط لمن يحتاجه.",
      en: "Removing the outline makes the site unusable by keyboard. `:focus-visible` shows it only to those who need it.",
    },
    since: "Baseline 2022",
  },
  files: ["css", "html"],
  starter: { html: buttons, css: "" },
  solution: {
    html: buttons,
    css: ".menu a {\n  color: gray;\n}\n\n.menu a:hover {\n  color: royalblue;\n}\n\n.btn:focus-visible {\n  outline: 3px solid orange;\n}\n",
  },
  tasks: [
    { id: "desc", label: { ar: "لوّن الروابط داخل القائمة بـ `.menu a`", en: "Color links inside the menu with `.menu a`" }, test: ({ rule }) => has(rule(".menu a", "color")) },
    { id: "hover", label: { ar: "غيّر لونها عند المرور بـ `.menu a:hover`", en: "Change their color on hover with `.menu a:hover`" }, test: ({ rule }) => has(rule(".menu a:hover", "color")) },
    { id: "focus", label: { ar: "أضف `outline` للزر في `.btn:focus-visible`", en: "Add an `outline` to the button in `.btn:focus-visible`" }, test: ({ rule }) => has(rule(".btn:focus-visible", "outline")) || has(rule(".btn:focus-visible", "outline-style")) },
  ],
  hints: [
    { ar: "`.menu a { color: gray; }` ثم `.menu a:hover { color: royalblue; }`", en: "`.menu a { color: gray; }` then `.menu a:hover { color: royalblue; }`" },
    { ar: "`.btn:focus-visible { outline: 3px solid orange; }`", en: "`.btn:focus-visible { outline: 3px solid orange; }`" },
  ],
  xp: 25,
};

const gallery = `<div class="grid">
  <div class="item">1</div>
  <div class="item">2</div>
  <div class="item">3</div>
  <div class="item">4</div>
  <div class="item">5</div>
  <div class="item">6</div>
</div>
`;

export const grid: Lesson = {
  slug: "grid",
  title: { ar: "CSS Grid: شبكة في بعدين", en: "CSS Grid: layout in two dimensions" },
  body: [
    {
      icon: "🔲",
      ar: "Flexbox يرتّب في اتجاه واحد (صف أو عمود). **Grid** يرتّب في صفوف وأعمدة معًا: معارض صور، لوحات تحكم، تخطيط صفحة كاملة.",
      en: "Flexbox arranges in one direction (row or column). **Grid** arranges rows and columns together: galleries, dashboards, whole page layouts.",
    },
    {
      icon: "📐",
      ar: "`display: grid` ثم `grid-template-columns: repeat(3, 1fr)` = ثلاثة أعمدة متساوية. الوحدة `fr` تعني «جزءًا من المساحة المتبقية»، و `gap` للمسافات.",
      en: "`display: grid` then `grid-template-columns: repeat(3, 1fr)` = three equal columns. The `fr` unit means \"a share of the free space\", and `gap` sets spacing.",
    },
    {
      icon: "🪄",
      ar: "سطر سحري متجاوب بلا media query: `repeat(auto-fit, minmax(150px, 1fr))` يضع أكبر عدد من الأعمدة التي عرضها 150px على الأقل.",
      en: "A magic responsive line, no media query: `repeat(auto-fit, minmax(150px, 1fr))` fits as many columns of at least 150px as there's room for.",
    },
  ],
  example: {
    code: ".grid {\n  display: grid;\n  grid-template-columns: repeat(3, 1fr);\n  gap: 12px;\n}\n\n.item {\n  background: #8b5cf6;\n  color: white;\n  padding: 24px;\n  border-radius: 12px;\n}",
    note: { ar: "ستة مربعات في ثلاثة أعمدة متساوية.", en: "Six boxes in three equal columns." },
    lang: "css",
  },
  modern: {
    old: ".item { float: left; width: 33.33%; }\n.grid::after { content: \"\"; clear: both; }",
    now: ".grid { display: grid; grid-template-columns: repeat(3, 1fr); }",
    text: { ar: "Grid أنهى عصر الحسابات بالنسب و float. وهو مدعوم في كل المتصفحات منذ 2017.", en: "Grid ended the era of percentage math and float. Every browser has supported it since 2017." },
    since: "Baseline 2017",
  },
  files: ["css", "html"],
  starter: { html: gallery, css: ".grid {\n  \n}\n\n.item {\n  background: #8b5cf6;\n  color: white;\n  padding: 24px;\n  border-radius: 12px;\n}\n" },
  solution: {
    html: gallery,
    css: ".grid {\n  display: grid;\n  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));\n  gap: 12px;\n}\n\n.item {\n  background: #8b5cf6;\n  color: white;\n  padding: 24px;\n  border-radius: 12px;\n}\n",
  },
  tasks: [
    { id: "grid", label: { ar: "اجعل `.grid` يستخدم `display: grid`", en: "Make `.grid` use `display: grid`" }, test: ({ rule }) => rule(".grid", "display") === "grid" },
    { id: "cols", label: { ar: "عرّف الأعمدة بـ `grid-template-columns` ووحدة `fr`", en: "Define columns with `grid-template-columns` and `fr`" }, test: ({ rule }) => /fr/.test(rule(".grid", "grid-template-columns")) },
    { id: "gap", label: { ar: "أضف `gap` بين المربعات", en: "Add a `gap` between the boxes" }, test: ({ rule }) => has(rule(".grid", "gap")) || has(rule(".grid", "row-gap")) },
  ],
  hints: [
    { ar: "`display: grid; grid-template-columns: repeat(3, 1fr); gap: 12px;`", en: "`display: grid; grid-template-columns: repeat(3, 1fr); gap: 12px;`" },
    { ar: "جرّب الشكل المتجاوب: `repeat(auto-fit, minmax(150px, 1fr))`", en: "Try the responsive form: `repeat(auto-fit, minmax(150px, 1fr))`" },
  ],
  xp: 30,
};

const cardWithBadge = `<div class="card">
  <span class="badge">NEW</span>
  <h2>CSS course</h2>
  <p>Learn layout and style.</p>
</div>
`;

export const position: Lesson = {
  slug: "position",
  title: { ar: "التموضع: relative و absolute و sticky", en: "Positioning: relative, absolute and sticky" },
  body: [
    {
      icon: "📍",
      ar: "`position: absolute` يخرج العنصر من مكانه ويضعه بالإحداثيات `top` و `right` و `bottom` و `left`، بالنسبة لأقرب أب عنده `position: relative`.",
      en: "`position: absolute` lifts an element out of the flow and places it with `top`, `right`, `bottom`, `left`, relative to the nearest parent with `position: relative`.",
    },
    {
      icon: "🏷️",
      ar: "استخدام شائع: شارة «جديد» في زاوية البطاقة. البطاقة `relative`، والشارة `absolute` مع `top: 12px; right: 12px`.",
      en: "A common use: a \"new\" badge in a card's corner. The card is `relative`, the badge is `absolute` with `top: 12px; right: 12px`.",
    },
    {
      icon: "📌",
      ar: "`position: sticky` مع `top: 0` يُبقي العنصر ظاهرًا أعلى الشاشة أثناء التمرير، مثل شريط القائمة. و `z-index` يحدد من يظهر فوق من.",
      en: "`position: sticky` with `top: 0` keeps an element on screen while scrolling, like a menu bar. `z-index` decides what sits on top.",
    },
  ],
  example: {
    code: ".card {\n  position: relative;\n  padding: 24px;\n  border: 1px solid #ddd;\n  border-radius: 16px;\n}\n\n.badge {\n  position: absolute;\n  top: 12px;\n  right: 12px;\n  background: tomato;\n  color: white;\n  padding: 2px 8px;\n  border-radius: 99px;\n}",
    note: { ar: "شارة مثبتة في زاوية البطاقة.", en: "A badge pinned to the card's corner." },
    lang: "css",
  },
  modern: {
    old: "window.onscroll = () => { /* fix the menu with JavaScript */ }",
    now: "header { position: sticky; top: 0; }",
    text: { ar: "تثبيت القائمة كان يحتاج JavaScript. `sticky` يفعلها بسطرين من CSS.", en: "Pinning a menu used to need JavaScript. `sticky` does it in two lines of CSS." },
    since: "Baseline 2019",
  },
  files: ["css", "html"],
  starter: { html: cardWithBadge, css: ".card {\n  padding: 24px;\n  border: 1px solid #ddd;\n  border-radius: 16px;\n}\n\n.badge {\n  background: tomato;\n  color: white;\n  padding: 2px 8px;\n  border-radius: 99px;\n}\n" },
  solution: {
    html: cardWithBadge,
    css: ".card {\n  position: relative;\n  padding: 24px;\n  border: 1px solid #ddd;\n  border-radius: 16px;\n}\n\n.badge {\n  position: absolute;\n  top: 12px;\n  right: 12px;\n  background: tomato;\n  color: white;\n  padding: 2px 8px;\n  border-radius: 99px;\n}\n",
  },
  tasks: [
    { id: "relative", label: { ar: "اجعل `.card` بـ `position: relative`", en: "Give `.card` `position: relative`" }, test: ({ rule }) => rule(".card", "position") === "relative" },
    { id: "absolute", label: { ar: "اجعل `.badge` بـ `position: absolute`", en: "Give `.badge` `position: absolute`" }, test: ({ rule }) => rule(".badge", "position") === "absolute" },
    { id: "corner", label: { ar: "ضعها في الزاوية بـ `top` و `right`", en: "Put it in the corner with `top` and `right`" }, test: ({ rule }) => has(rule(".badge", "top")) && (has(rule(".badge", "right")) || has(rule(".badge", "left"))) },
  ],
  hints: [
    { ar: "في `.card` أضف `position: relative;`", en: "In `.card` add `position: relative;`" },
    { ar: "في `.badge` أضف `position: absolute; top: 12px; right: 12px;`", en: "In `.badge` add `position: absolute; top: 12px; right: 12px;`" },
  ],
  xp: 30,
};

export const transitions: Lesson = {
  slug: "transitions",
  title: { ar: "الحركة: transition و transform", en: "Motion: transition and transform" },
  body: [
    {
      icon: "🎞️",
      ar: "`transform` يحرّك العنصر أو يكبّره أو يديره دون التأثير على ما حوله: `translateY(-4px)` و `scale(1.05)` و `rotate(10deg)`.",
      en: "`transform` moves, scales or rotates an element without affecting its neighbours: `translateY(-4px)`, `scale(1.05)`, `rotate(10deg)`.",
    },
    {
      icon: "⏱️",
      ar: "`transition` يجعل التغيير **تدريجيًا** بدل القفز: `transition: transform 0.2s ease;` ثم غيّر `transform` في `:hover`.",
      en: "`transition` makes a change **gradual** instead of a jump: `transition: transform 0.2s ease;` then change `transform` on `:hover`.",
    },
    {
      icon: "♿",
      ar: "بعض الناس يتضايقون من الحركة. احترم إعدادهم: `@media (prefers-reduced-motion: reduce) { * { transition: none; } }`.",
      en: "Some people are bothered by motion. Respect their setting: `@media (prefers-reduced-motion: reduce) { * { transition: none; } }`.",
    },
  ],
  example: {
    code: ".btn {\n  transition: transform 0.2s ease;\n}\n\n.btn:hover {\n  transform: translateY(-4px) scale(1.05);\n}",
    note: { ar: "زر يرتفع ويكبر قليلًا بنعومة عند المرور عليه.", en: "A button that smoothly lifts and grows on hover." },
    lang: "css",
  },
  modern: {
    old: "$('.btn').animate({ top: '-4px' }); // jQuery",
    now: ".btn { transition: transform 0.2s; }\n.btn:hover { transform: translateY(-4px); }",
    text: { ar: "الحركة بـ CSS أسرع وأنعم من JavaScript، لأن المتصفح يرسمها بكرت الشاشة.", en: "CSS motion is faster and smoother than JavaScript, because the browser draws it on the GPU." },
  },
  files: ["css", "html"],
  starter: { html: buttons, css: ".btn {\n  background: #8b5cf6;\n  color: white;\n  border: 0;\n  padding: 12px 20px;\n  border-radius: 12px;\n}\n" },
  solution: {
    html: buttons,
    css: ".btn {\n  background: #8b5cf6;\n  color: white;\n  border: 0;\n  padding: 12px 20px;\n  border-radius: 12px;\n  transition: transform 0.2s ease;\n}\n\n.btn:hover {\n  transform: translateY(-4px) scale(1.05);\n}\n\n@media (prefers-reduced-motion: reduce) {\n  .btn {\n    transition: none;\n  }\n}\n",
  },
  tasks: [
    { id: "transition", label: { ar: "أضف `transition` للزر `.btn`", en: "Add a `transition` to `.btn`" }, test: ({ rule }) => has(rule(".btn", "transition")) || has(rule(".btn", "transition-property")) },
    { id: "transform", label: { ar: "حرّكه في `.btn:hover` بـ `transform`", en: "Move it in `.btn:hover` with `transform`" }, test: ({ rule }) => has(rule(".btn:hover", "transform")) },
    { id: "reduced", label: { ar: "احترم `prefers-reduced-motion`", en: "Respect `prefers-reduced-motion`" }, test: ({ media }) => media.some((m) => /prefers-reduced-motion/.test(m)) },
  ],
  hints: [
    { ar: "في `.btn`: `transition: transform 0.2s ease;` وفي `.btn:hover`: `transform: translateY(-4px);`", en: "In `.btn`: `transition: transform 0.2s ease;` and in `.btn:hover`: `transform: translateY(-4px);`" },
    { ar: "`@media (prefers-reduced-motion: reduce) { .btn { transition: none; } }`", en: "`@media (prefers-reduced-motion: reduce) { .btn { transition: none; } }`" },
  ],
  xp: 30,
};
