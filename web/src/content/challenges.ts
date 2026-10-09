import type { L } from "@/i18n/config";

/**
 * Fill-in-the-blank code challenges. Each `_` in `code` is a blank, filled in order by
 * `answers`; `chips` holds the answers plus distractors, shown shuffled.
 * A challenge unlocks once the lesson named in `after` is complete, so practice only
 * covers what the learner has already been taught, and grows with every lesson.
 */
export type Challenge = { id: string; after: string; prompt: L; code: string; answers: string[]; chips: string[] };

export const challenges: Challenge[] = [
  // HTML
  { id: "p-tag", after: "html/what-is-html", prompt: { ar: "أكمل الفقرة", en: "Complete the paragraph" }, code: "<_>Hello, HTML!</_>", answers: ["p", "p"], chips: ["p", "p", "h1", "a"] },
  { id: "close-tag", after: "html/what-is-html", prompt: { ar: "أغلق الوسم بشكل صحيح", en: "Close the tag correctly" }, code: "<p>I love code<_>", answers: ["/p"], chips: ["/p", "p", "\\p", "p/"] },
  { id: "doctype", after: "html/page-skeleton", prompt: { ar: "أكمل أول سطر في الصفحة", en: "Complete the first line of the page" }, code: "<!_ html>", answers: ["DOCTYPE"], chips: ["DOCTYPE", "HTML", "TYPE", "head"] },
  { id: "head-parts", after: "html/page-skeleton", prompt: { ar: "أكمل أجزاء الصفحة", en: "Complete the page parts" }, code: "<html lang=\"en\">\n<_>\n  <meta _=\"UTF-8\">\n  <title>My page</title>\n</head>\n<body>…</body>", answers: ["head", "charset"], chips: ["head", "body", "charset", "lang", "title"] },
  { id: "title-tag", after: "html/page-skeleton", prompt: { ar: "اسم الصفحة في تبويب المتصفح", en: "The page name on the browser tab" }, code: "<head>\n  <_>Code Master</_>\n</head>", answers: ["title", "title"], chips: ["title", "title", "h1", "name"] },
  { id: "heading", after: "html/first-page", prompt: { ar: "أكمل العنوان الرئيسي", en: "Complete the main heading" }, code: "<_>Hello, Code Master</_>", answers: ["h1", "h1"], chips: ["h1", "p", "h1", "a"] },
  { id: "strong", after: "html/first-page", prompt: { ar: "اجعل الكلمة مهمة بالطريقة الحديثة", en: "Mark the word important, the modern way" }, code: "<p>This is <_>important</_>.</p>", answers: ["strong", "strong"], chips: ["strong", "strong", "b", "big"] },
  { id: "link", after: "html/links-images", prompt: { ar: "أكمل الرابط", en: "Complete the link" }, code: '<a _="https://mdn.dev">MDN</_>', answers: ["href", "a"], chips: ["src", "href", "a", "link"] },
  { id: "image", after: "html/links-images", prompt: { ar: "أكمل الصورة مع وصفها", en: "Complete the image and its description" }, code: '<_ src="cat.png" _="A sleeping cat">', answers: ["img", "alt"], chips: ["img", "alt", "href", "title", "image"] },
  { id: "list", after: "html/lists", prompt: { ar: "أكمل القائمة المرتبة", en: "Complete the ordered list" }, code: "<_>\n  <_>Boil water</li>\n  <li>Add tea</li>\n</ol>", answers: ["ol", "li"], chips: ["ul", "ol", "li", "p"] },
  { id: "ul", after: "html/lists", prompt: { ar: "قائمة بنقاط", en: "A bulleted list" }, code: "<_>\n  <li>HTML</li>\n  <li>CSS</li>\n</_>", answers: ["ul", "ul"], chips: ["ul", "ul", "ol", "list"] },
  { id: "layout", after: "html/semantic-layout", prompt: { ar: "أكمل هيكل الصفحة", en: "Complete the page structure" }, code: "<_>\n  <nav>...</nav>\n</header>\n<_>Content</main>\n<_>© 2026</footer>", answers: ["header", "main", "footer"], chips: ["footer", "header", "main", "body", "section"] },
  // CSS
  { id: "css-color", after: "css/what-is-css", prompt: { ar: "لوّن العنوان", en: "Color the heading" }, code: "h1 {\n  _: royalblue;\n}", answers: ["color"], chips: ["color", "background", "font", "text"] },
  { id: "css-class", after: "css/what-is-css", prompt: { ar: "اختر العناصر التي لها class=\"card\"", en: "Select elements with class=\"card\"" }, code: "_card {\n  color: gray;\n}", answers: ["."], chips: [".", "#", "*", "@"] },
  { id: "css-var", after: "css/colors-fonts", prompt: { ar: "استخدم المتغير", en: "Use the variable" }, code: ":root { --main: #7c5cff; }\n\nh1 {\n  color: _(--main);\n}", answers: ["var"], chips: ["var", "use", "get", "$"] },
  { id: "css-rem", after: "css/colors-fonts", prompt: { ar: "حجم خط بالوحدة المرنة", en: "A font size in the flexible unit" }, code: "p {\n  font-size: 1.2_;\n}", answers: ["rem"], chips: ["rem", "pt", "cm", "x"] },
  { id: "css-box", after: "css/box-model", prompt: { ar: "مسافة داخلية وزوايا دائرية", en: "Inner space and rounded corners" }, code: ".card {\n  _: 24px;\n  _: 16px;\n}", answers: ["padding", "border-radius"], chips: ["padding", "margin", "border-radius", "radius"] },
  { id: "css-sizing", after: "css/box-model", prompt: { ar: "القاعدة الحديثة لكل العناصر", en: "The modern rule for every element" }, code: "* {\n  box-sizing: _;\n}", answers: ["border-box"], chips: ["border-box", "content-box", "auto", "box"] },
  { id: "css-flex", after: "css/flexbox", prompt: { ar: "رتّب العناصر في صف مع مسافة", en: "Line items up in a row with spacing" }, code: ".row {\n  display: _;\n  _: 12px;\n}", answers: ["flex", "gap"], chips: ["flex", "gap", "block", "float", "margin"] },
  { id: "css-center", after: "css/flexbox", prompt: { ar: "وسّط العناصر أفقيًا", en: "Center items horizontally" }, code: ".row {\n  display: flex;\n  _: center;\n}", answers: ["justify-content"], chips: ["justify-content", "align-items", "text-align", "center"] },
  { id: "css-media", after: "css/responsive", prompt: { ar: "قاعدة للشاشات الضيقة", en: "A rule for narrow screens" }, code: "@_ (max-width: 600px) {\n  .row { flex-direction: _; }\n}", answers: ["media", "column"], chips: ["media", "screen", "column", "row"] },
  // JavaScript
  { id: "js-log", after: "javascript/what-is-js", prompt: { ar: "اطبع رسالة في الكونسول", en: "Print a message to the console" }, code: 'console._("Hello!");', answers: ["log"], chips: ["log", "print", "write", "echo"] },
  { id: "js-const", after: "javascript/variables", prompt: { ar: "قيمة لن تتغير وقيمة ستتغير", en: "A value that won't change, and one that will" }, code: '_ name = "Sara";\n_ score = 0;\nscore = score + 10;', answers: ["const", "let"], chips: ["const", "let", "var", "int"] },
  { id: "js-template", after: "javascript/variables", prompt: { ar: "ادمج المتغير في النص", en: "Put the variable inside the text" }, code: "console.log(`Hi _{name}!`);", answers: ["$"], chips: ["$", "#", "&", "%"] },
  { id: "js-arrow", after: "javascript/functions", prompt: { ar: "أكمل الدالة السهمية", en: "Complete the arrow function" }, code: "const add = (a, b) _ a + b;", answers: ["=>"], chips: ["=>", "->", "==", ":"] },
  { id: "js-return", after: "javascript/functions", prompt: { ar: "أرجع النتيجة من الدالة", en: "Return the result from the function" }, code: "function square(n) {\n  _ n * n;\n}", answers: ["return"], chips: ["return", "give", "log", "const"] },
  { id: "js-map", after: "javascript/arrays-loops", prompt: { ar: "ضاعف كل الأعداد", en: "Double every number" }, code: "const doubled = nums._((n) => n * 2);", answers: ["map"], chips: ["map", "filter", "for", "each"] },
  { id: "js-forof", after: "javascript/arrays-loops", prompt: { ar: "حلقة على كل عنصر", en: "Loop over every item" }, code: "for (const fruit _ fruits) {\n  console.log(fruit);\n}", answers: ["of"], chips: ["of", "in", "from", "at"] },
  { id: "js-event", after: "javascript/dom-events", prompt: { ar: "نفّذ كودًا عند الضغط", en: "Run code on click" }, code: 'const btn = document._("#btn");\nbtn._("click", () => {\n  btn.textContent = "Hi!";\n});', answers: ["querySelector", "addEventListener"], chips: ["querySelector", "addEventListener", "onClick", "getElement"] },
];
