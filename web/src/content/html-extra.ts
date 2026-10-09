import type { Lesson } from "./types";

const text = (el: Element | null) => (el?.textContent ?? "").trim();

/** HTML lessons that round out the stage: text elements, tables and forms. */
export const textElements: Lesson = {
  slug: "text-elements",
  title: { ar: "تنسيق النصوص بمعنى", en: "Text with meaning" },
  body: [
    {
      icon: "✒️",
      ar: "HTML تصف **معنى** النص: `<strong>` لكلام مهم، و `<em>` للتأكيد، و `<mark>` لتمييز كلمة، و `<code>` لكود داخل جملة.",
      en: "HTML describes what text **means**: `<strong>` for important words, `<em>` for emphasis, `<mark>` to highlight, and `<code>` for code inside a sentence.",
    },
    {
      icon: "💬",
      ar: "`<blockquote>` لاقتباس طويل، و `<br>` لسطر جديد داخل الفقرة (بدون إغلاق)، و `<hr>` لخط فاصل بين موضوعين.",
      en: "`<blockquote>` holds a long quote, `<br>` breaks a line inside a paragraph (no closing tag), and `<hr>` is a divider between topics.",
    },
    {
      icon: "🪜",
      ar: "رتّب العناوين كدرجات: `<h1>` مرة واحدة، ثم `<h2>` للأقسام، ثم `<h3>` داخلها. لا تقفز من `<h1>` إلى `<h4>` لأن الخط أصغر فقط.",
      en: "Order headings like steps: one `<h1>`, then `<h2>` for sections, then `<h3>` inside them. Don't jump from `<h1>` to `<h4>` just for a smaller font.",
    },
  ],
  example: {
    code: '<h2>My notes</h2>\n<p>Learning <strong>HTML</strong> is <em>fun</em>.</p>\n<p>Use <code>&lt;p&gt;</code> for paragraphs.</p>\n<blockquote>Code is like humor. When you have to explain it, it\'s bad.</blockquote>\n<hr>',
    note: { ar: "كل وسم يضيف معنى، والمتصفح يعطيه شكلًا افتراضيًا.", en: "Each tag adds meaning, and the browser gives it a default look." },
  },
  modern: {
    old: "<b>Warning</b> <i>note</i> <font size=\"5\">Big</font>",
    now: "<strong>Warning</strong> <em>note</em> <h2>Big</h2>",
    text: {
      ar: "`<b>` و `<i>` لا يقولان شيئًا عن المعنى، و `<font>` حُذف من HTML. استخدم الوسوم ذات المعنى، واترك الحجم والشكل لـ CSS.",
      en: "`<b>` and `<i>` say nothing about meaning, and `<font>` was removed from HTML. Use meaningful tags and leave size and style to CSS.",
    },
  },
  files: ["html"],
  starter: { html: "" },
  solution: {
    html: '<h2>Why I code</h2>\n<p>Coding is <strong>powerful</strong> and <em>creative</em>.</p>\n<blockquote>The best way to learn is to build.</blockquote>\n<hr>\n<p>First line<br>Second line</p>\n',
  },
  tasks: [
    { id: "h2", label: { ar: "أضف عنوان قسم `<h2>`", en: "Add a section heading `<h2>`" }, test: ({ doc }) => text(doc.querySelector("h2")).length > 0 },
    { id: "strong-em", label: { ar: "استخدم `<strong>` و `<em>` داخل فقرة", en: "Use `<strong>` and `<em>` inside a paragraph" }, test: ({ doc }) => !!doc.querySelector("p strong") && !!doc.querySelector("p em") },
    { id: "quote", label: { ar: "أضف اقتباسًا `<blockquote>`", en: "Add a `<blockquote>`" }, test: ({ doc }) => text(doc.querySelector("blockquote")).length > 0 },
    { id: "hr", label: { ar: "أضف خطًا فاصلًا `<hr>`", en: "Add a divider `<hr>`" }, test: ({ doc }) => !!doc.querySelector("hr") },
  ],
  hints: [
    { ar: "`<p>Coding is <strong>powerful</strong> and <em>creative</em>.</p>`", en: "`<p>Coding is <strong>powerful</strong> and <em>creative</em>.</p>`" },
    { ar: "`<blockquote>…</blockquote>` ثم `<hr>`", en: "`<blockquote>…</blockquote>` then `<hr>`" },
  ],
  xp: 20,
};

export const tables: Lesson = {
  slug: "tables",
  title: { ar: "الجداول", en: "Tables" },
  body: [
    {
      icon: "📊",
      ar: "الجدول `<table>` لعرض **بيانات** في صفوف وأعمدة: جدول مواعيد، أسعار، نتائج. كل صف `<tr>`، وكل خلية `<td>`.",
      en: "A `<table>` shows **data** in rows and columns: a schedule, prices, scores. Each row is a `<tr>`, each cell a `<td>`.",
    },
    {
      icon: "🏷️",
      ar: "خلايا العناوين تُكتب بـ `<th>`، ونضع صف العناوين داخل `<thead>` وبقية الصفوف داخل `<tbody>`. هكذا تفهم قارئات الشاشة كل خلية.",
      en: "Header cells use `<th>`. Put the header row in `<thead>` and the other rows in `<tbody>`, so screen readers understand every cell.",
    },
    {
      icon: "🚫",
      ar: "استخدم الجداول للبيانات فقط، **ليس** لترتيب شكل الصفحة. ترتيب الصفحة مكانه CSS (Flexbox و Grid).",
      en: "Use tables for data only, **not** for page layout. Layout belongs to CSS (Flexbox and Grid).",
    },
  ],
  example: {
    code: "<table>\n  <thead>\n    <tr><th>Language</th><th>Use</th></tr>\n  </thead>\n  <tbody>\n    <tr><td>HTML</td><td>Structure</td></tr>\n    <tr><td>CSS</td><td>Style</td></tr>\n  </tbody>\n</table>",
    note: { ar: "صف عناوين ثم صفّا بيانات.", en: "A header row, then two data rows." },
  },
  tip: {
    text: { ar: "اكتب `table>tr*3>td*2` ثم Tab لتحصل على جدول من 3 صفوف وعمودين.", en: "Type `table>tr*3>td*2` then Tab for a table with 3 rows and 2 columns." },
    code: "table>tr*3>td*2",
  },
  modern: {
    old: '<table width="100%" border="1">\n  <!-- the whole page layout -->',
    now: "<table> <!-- data only -->\n.layout { display: grid; }",
    text: {
      ar: "في الماضي كانت المواقع كلها تُبنى بالجداول. اليوم الجداول للبيانات، والتخطيط بـ CSS Grid.",
      en: "Whole websites used to be built from tables. Today tables are for data and layout is CSS Grid.",
    },
  },
  files: ["html"],
  starter: { html: "" },
  solution: {
    html: "<table>\n  <thead>\n    <tr><th>Day</th><th>Lesson</th></tr>\n  </thead>\n  <tbody>\n    <tr><td>Monday</td><td>HTML</td></tr>\n    <tr><td>Tuesday</td><td>CSS</td></tr>\n  </tbody>\n</table>\n",
  },
  tasks: [
    { id: "table", label: { ar: "أنشئ `<table>`", en: "Create a `<table>`" }, test: ({ doc }) => !!doc.querySelector("table") },
    { id: "th", label: { ar: "أضف صف عناوين فيه خليتا `<th>` على الأقل داخل `<thead>`", en: "Add a header row with at least two `<th>` in `<thead>`" }, test: ({ doc }) => doc.querySelectorAll("thead th").length >= 2 },
    { id: "rows", label: { ar: "أضف صفين من البيانات `<tr>` داخل `<tbody>`", en: "Add two data rows `<tr>` in `<tbody>`" }, test: ({ doc }) => Array.from(doc.querySelectorAll("tbody tr")).filter((tr) => tr.querySelectorAll("td").length >= 2).length >= 2 },
  ],
  hints: [
    { ar: "ابدأ بـ `<table><thead><tr><th>Day</th><th>Lesson</th></tr></thead>`", en: "Start with `<table><thead><tr><th>Day</th><th>Lesson</th></tr></thead>`" },
    { ar: "ثم `<tbody>` فيه صفان: `<tr><td>Monday</td><td>HTML</td></tr>`", en: "Then a `<tbody>` with two rows: `<tr><td>Monday</td><td>HTML</td></tr>`" },
  ],
  xp: 25,
};

export const forms: Lesson = {
  slug: "forms",
  title: { ar: "النماذج: جمع البيانات من الزائر", en: "Forms: collecting input" },
  body: [
    {
      icon: "📝",
      ar: "`<form>` يجمع ما يكتبه الزائر: تسجيل دخول، اشتراك، بحث. بداخله حقول `<input>` وزر `<button>`.",
      en: "A `<form>` collects what visitors type: sign-in, sign-up, search. Inside are `<input>` fields and a `<button>`.",
    },
    {
      icon: "🔤",
      ar: "للحقل أنواع بالخاصية `type`: `text` و `email` و `password` و `number` و `checkbox`. النوع الصحيح يُظهر لوحة المفاتيح المناسبة على الهاتف ويتحقق من القيمة.",
      en: "Fields have types via `type`: `text`, `email`, `password`, `number`, `checkbox`. The right type shows the right phone keyboard and checks the value.",
    },
    {
      icon: "🏷️",
      ar: "كل حقل يحتاج `<label>` يصف ما يُكتب فيه. اربطهما: `for` في label يساوي `id` في الحقل. والخاصية `required` تمنع الإرسال إذا كان الحقل فارغًا.",
      en: "Every field needs a `<label>` saying what goes in it. Link them: the label's `for` equals the field's `id`. `required` blocks sending an empty field.",
    },
  ],
  example: {
    code: '<form>\n  <label for="email">Email</label>\n  <input type="email" id="email" required>\n\n  <label for="pass">Password</label>\n  <input type="password" id="pass" required>\n\n  <button type="submit">Sign in</button>\n</form>',
    note: { ar: "نموذج تسجيل دخول بحقلين مربوطين بعناوينهما.", en: "A sign-in form with two fields linked to their labels." },
  },
  tip: {
    text: { ar: "اكتب `input:email` ثم Tab لحقل بريد جاهز، و `label+input` ثم Tab لعنوان وحقل معًا.", en: "Type `input:email` then Tab for a ready email field, and `label+input` then Tab for a label with a field." },
    code: "input:email",
  },
  modern: {
    old: '<input type="text" placeholder="Email">',
    now: '<label for="email">Email</label>\n<input type="email" id="email" required>',
    text: {
      ar: "الـ placeholder يختفي عند الكتابة فلا يكفي بديلًا عن label. ونوع `email` يتحقق من البريد دون أي JavaScript.",
      en: "A placeholder disappears as you type, so it's no substitute for a label. And `type=\"email\"` validates the address with no JavaScript.",
    },
  },
  files: ["html"],
  starter: { html: "" },
  solution: {
    html: '<form>\n  <label for="name">Name</label>\n  <input type="text" id="name" required>\n\n  <label for="email">Email</label>\n  <input type="email" id="email" required>\n\n  <button type="submit">Join</button>\n</form>\n',
  },
  tasks: [
    { id: "form", label: { ar: "أنشئ `<form>`", en: "Create a `<form>`" }, test: ({ doc }) => !!doc.querySelector("form") },
    { id: "email", label: { ar: "أضف حقل بريد `type=\"email\"` مع `required`", en: "Add an email field `type=\"email\"` with `required`" }, test: ({ doc }) => !!doc.querySelector('form input[type="email"][required]') },
    {
      id: "labels",
      label: { ar: "اربط كل حقل بـ `<label for>` يساوي `id` الحقل", en: "Link every field to a `<label for>` matching its `id`" },
      test: ({ doc }) => {
        const inputs = Array.from(doc.querySelectorAll("form input"));
        return inputs.length > 0 && inputs.every((i) => i.id && doc.querySelector(`label[for="${i.id}"]`));
      },
    },
    { id: "button", label: { ar: "أضف زر إرسال `<button type=\"submit\">`", en: "Add a submit `<button type=\"submit\">`" }, test: ({ doc }) => !!doc.querySelector('form button[type="submit"], form button:not([type])') },
  ],
  hints: [
    { ar: '`<label for="email">Email</label>` ثم `<input type="email" id="email" required>`', en: '`<label for="email">Email</label>` then `<input type="email" id="email" required>`' },
    { ar: '`<button type="submit">Join</button>` داخل `<form>`', en: '`<button type="submit">Join</button>` inside the `<form>`' },
  ],
  xp: 30,
};
