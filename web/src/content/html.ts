import type { Exam, Lesson } from "./types";

const text = (el: Element | null) => (el?.textContent ?? "").trim();

export const htmlLessons: Lesson[] = [
  {
    slug: "what-is-html",
    title: { ar: "ما هي HTML؟", en: "What is HTML?" },
    body: [
      {
        icon: "🧱",
        ar: "**HTML** اختصار لـ HyperText Markup Language. ليست لغة برمجة بالمعنى الكامل، بل **لغة ترميز**: تصف للمتصفح ما هو كل جزء في الصفحة: عنوان، فقرة، صورة، رابط.",
        en: "**HTML** stands for HyperText Markup Language. It isn't a full programming language but a **markup language**: it tells the browser what each part of the page is: a heading, a paragraph, an image, a link.",
      },
      {
        icon: "🏷️",
        ar: "نكتب HTML بـ **وسوم** (tags) بين علامتي `< >`. أغلب الوسوم لها بداية ونهاية: `<p>` تفتح الفقرة و `</p>` تغلقها، والمحتوى بينهما. الكل معًا يسمى **عنصرًا** (element).",
        en: "We write HTML with **tags** between `< >`. Most tags have an opening and a closing part: `<p>` opens a paragraph and `</p>` closes it, with the content in between. Together they form an **element**.",
      },
      {
        icon: "🧭",
        ar: "الفرق بين اللغات الثلاث: HTML تقول «هذا عنوان»، و CSS تقول «العنوان أزرق وكبير»، و JavaScript تقول «عند الضغط على الزر غيّر العنوان». كل واحدة في ملف خاص: `index.html` و `style.css` و `script.js`.",
        en: "The three languages differ: HTML says \"this is a heading\", CSS says \"the heading is big and blue\", and JavaScript says \"when the button is tapped, change the heading\". Each lives in its own file: `index.html`, `style.css`, `script.js`.",
      },
      {
        icon: "🔤",
        ar: "اكتب الوسوم بحروف صغيرة دائمًا: `<p>` وليس `<P>`. المتصفح يقبل الاثنين، لكن الحروف الصغيرة هي المعيار المتفق عليه.",
        en: "Always write tags in lowercase: `<p>`, not `<P>`. Browsers accept both, but lowercase is the agreed standard.",
      },
    ],
    example: {
      code: "<p>I am a paragraph.</p>",
      note: { ar: "عنصر كامل: وسم فتح، محتوى، وسم إغلاق.", en: "A complete element: opening tag, content, closing tag." },
    },
    files: ["html"],
    starter: { html: "" },
    solution: { html: "<p>Hello, HTML!</p>\n" },
    tasks: [
      {
        id: "p",
        label: { ar: "اكتب فقرة `<p>` فيها الجملة Hello, HTML!", en: "Write a `<p>` paragraph that says Hello, HTML!" },
        test: ({ doc }) => /hello,?\s*html/i.test(text(doc.querySelector("p"))),
      },
      {
        id: "closed",
        label: { ar: "أغلق الوسم بـ `</p>`", en: "Close the tag with `</p>`" },
        test: ({ source }) => /<\/p>/i.test(source),
      },
    ],
    hints: [{ ar: "اكتب: `<p>Hello, HTML!</p>`", en: "Type: `<p>Hello, HTML!</p>`" }],
    xp: 15,
  },
  {
    slug: "page-skeleton",
    title: { ar: "هيكل الصفحة: من الصفحة الفارغة", en: "Page skeleton: starting from a blank page" },
    body: [
      {
        icon: "📄",
        ar: "كل ملف HTML يبدأ بنفس الهيكل. أول سطر دائمًا هو `<!DOCTYPE html>`: يخبر المتصفح أن الصفحة مكتوبة بـ HTML الحديثة.",
        en: "Every HTML file starts with the same skeleton. The first line is always `<!DOCTYPE html>`: it tells the browser the page uses modern HTML.",
      },
      {
        icon: "🌳",
        ar: "بعده العنصر `<html lang=\"ar\">` الذي يحتوي الصفحة كلها. الخاصية `lang` تحدد لغة المحتوى، وتساعد قارئات الشاشة ومحركات البحث.",
        en: "Next comes `<html lang=\"en\">`, which holds the whole page. The `lang` attribute names the content's language and helps screen readers and search engines.",
      },
      {
        icon: "🧠",
        ar: "داخله جزآن: `<head>` لمعلومات لا تظهر في الصفحة، مثل الترميز `<meta charset=\"UTF-8\">` (ليظهر العربي صحيحًا) واسم الصفحة `<title>` الذي يظهر في تبويب المتصفح.",
        en: "Inside are two parts: `<head>` for information that isn't shown, like the encoding `<meta charset=\"UTF-8\">` (so every language displays correctly) and the page name `<title>`, shown on the browser tab.",
      },
      {
        icon: "👀",
        ar: "و `<body>` لكل ما يراه الزائر: العناوين والفقرات والصور. وأضف `<meta name=\"viewport\" ...>` لتظهر الصفحة صحيحة على الهاتف.",
        en: "And `<body>` for everything visitors see: headings, paragraphs, images. Add `<meta name=\"viewport\" ...>` so the page fits phone screens.",
      },
    ],
    example: {
      code: '<!DOCTYPE html>\n<html lang="en">\n<head>\n  <meta charset="UTF-8">\n  <meta name="viewport" content="width=device-width, initial-scale=1.0">\n  <title>My first page</title>\n</head>\n<body>\n  <h1>Hello!</h1>\n</body>\n</html>',
      note: { ar: "هذا الهيكل تكتبه في بداية كل صفحة.", en: "You write this skeleton at the start of every page." },
    },
    tip: {
      text: {
        ar: "لا تكتب الهيكل بيدك: في صفحة فارغة اكتب `!` ثم اضغط Tab، وسيكتب Emmet الهيكل كاملًا.",
        en: "Don't type the skeleton by hand: in an empty file type `!` and press Tab, and Emmet writes the whole skeleton.",
      },
      code: "!  →  <!DOCTYPE html>…",
    },
    modern: {
      old: '<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01//EN" "http://www.w3.org/TR/html4/strict.dtd">',
      now: "<!DOCTYPE html>",
      text: {
        ar: "في HTML القديمة كان سطر DOCTYPE طويلًا ومعقدًا. منذ HTML5 أصبح قصيرًا وموحّدًا، وهو المعيار الحالي (HTML Living Standard).",
        en: "Old HTML needed a long, complicated DOCTYPE. Since HTML5 it's short and the same everywhere, and it's today's standard (HTML Living Standard).",
      },
      since: "HTML5",
    },
    files: ["html"],
    starter: { html: "" },
    solution: {
      html: '<!DOCTYPE html>\n<html lang="en">\n<head>\n  <meta charset="UTF-8">\n  <meta name="viewport" content="width=device-width, initial-scale=1.0">\n  <title>My first page</title>\n</head>\n<body>\n  <h1>Hello!</h1>\n</body>\n</html>\n',
    },
    tasks: [
      {
        id: "doctype",
        label: { ar: "ابدأ بـ `<!DOCTYPE html>`", en: "Start with `<!DOCTYPE html>`" },
        test: ({ source }) => /^\s*<!doctype html>/i.test(source),
      },
      {
        id: "lang",
        label: { ar: "أضف `<html>` مع خاصية `lang`", en: "Add `<html>` with a `lang` attribute" },
        test: ({ source }) => /<html[^>]*\blang=["'][a-z-]+["']/i.test(source),
      },
      {
        id: "charset",
        label: { ar: "أضف `<meta charset=\"UTF-8\">`", en: "Add `<meta charset=\"UTF-8\">`" },
        test: ({ doc }) => (doc.querySelector("meta[charset]")?.getAttribute("charset") ?? "").toLowerCase() === "utf-8",
      },
      {
        id: "title",
        label: { ar: "اكتب اسمًا للصفحة في `<title>`", en: "Name the page in `<title>`" },
        test: ({ doc }) => text(doc.querySelector("head title")).length > 0,
      },
      {
        id: "body",
        label: { ar: "ضع عنوانًا `<h1>` داخل `<body>`", en: "Put an `<h1>` inside `<body>`" },
        test: ({ source, doc }) => /<body/i.test(source) && text(doc.querySelector("body h1")).length > 0,
      },
    ],
    hints: [
      { ar: "اكتب `!` ثم اضغط Tab (أو زر Tab فوق لوحة المفاتيح).", en: "Type `!` then press Tab (or the Tab key above the keyboard)." },
      { ar: "بعد Emmet، غيّر نص `<title>` وأضف `<h1>` داخل `<body>`.", en: "After Emmet, change the `<title>` text and add an `<h1>` inside `<body>`." },
    ],
    xp: 25,
  },
  {
    slug: "first-page",
    title: { ar: "صفحتك الأولى: العناوين والفقرات", en: "Your first page: headings and paragraphs" },
    body: [
      {
        ar: "كل صفحة ويب مكتوبة بلغة HTML. هذه اللغة تتكوّن من **وسوم** (tags) تخبر المتصفح بنوع كل جزء من المحتوى.",
        en: "Every web page is written in HTML. The language is made of **tags** that tell the browser what each piece of content is.",
      },
      {
        ar: "الوسم `<h1>` هو أهم عنوان في الصفحة، والوسم `<p>` لكتابة فقرة. أغلب الوسوم لها بداية ونهاية: `<p>` ثم `</p>`، والمحتوى بينهما.",
        en: "`<h1>` is the most important heading on the page, and `<p>` holds a paragraph. Most tags have an opening and a closing part: `<p>` then `</p>`, with the content in between.",
      },
      {
        ar: "توجد ستة مستويات للعناوين من `<h1>` إلى `<h6>`. استخدم `<h1>` مرة واحدة فقط في الصفحة.",
        en: "There are six heading levels, `<h1>` to `<h6>`. Use `<h1>` only once per page.",
      },
    ],
    example: {
      code: "<h1>Welcome</h1>\n<p>This is my first paragraph.</p>",
      note: { ar: "عنوان رئيسي تحته فقرة.", en: "A main heading with a paragraph below it." },
    },
    tip: {
      text: {
        ar: "اكتب `h1` ثم اضغط Tab، وسيكمل المحرر الوسم كاملًا. هذه ميزة Emmet الموجودة في VS Code أيضًا.",
        en: "Type `h1` and press Tab: the editor writes the whole tag for you. This is Emmet, and it works in VS Code too.",
      },
      code: "h1  →  <h1></h1>",
    },
    modern: {
      old: "<b>Important</b>",
      now: "<strong>Important</strong>",
      text: {
        ar: "`<b>` يجعل النص عريضًا فقط. `<strong>` يقول إن النص **مهم**، فتفهمه قارئات الشاشة ومحركات البحث. الشكل تتحكم فيه CSS.",
        en: "`<b>` only makes text bold. `<strong>` says the text is **important**, which screen readers and search engines understand. CSS controls the look.",
      },
    },
    files: ["html"],
    starter: { html: "" },
    solution: { html: "<h1>Hello, I'm Hamid</h1>\n<p>I'm learning to code with Code Master.</p>\n" },
    tasks: [
      {
        id: "h1",
        label: { ar: "أضف عنوانًا رئيسيًا `<h1>` فيه نص", en: "Add an `<h1>` main heading with text" },
        test: ({ doc }) => text(doc.querySelector("h1")).length > 0,
      },
      {
        id: "p",
        label: { ar: "أضف فقرة `<p>` تعرّف فيها بنفسك", en: "Add a `<p>` paragraph introducing yourself" },
        test: ({ doc }) => text(doc.querySelector("p")).length >= 5,
      },
      {
        id: "single-h1",
        label: { ar: "استخدم `<h1>` مرة واحدة فقط", en: "Use `<h1>` only once" },
        test: ({ doc }) => doc.querySelectorAll("h1").length === 1,
      },
    ],
    hints: [
      { ar: "ابدأ بكتابة `<h1>` ثم النص ثم `</h1>`.", en: "Start with `<h1>`, then your text, then `</h1>`." },
      { ar: "الفقرة بنفس الطريقة: `<p>نص الفقرة</p>`.", en: "The paragraph works the same way: `<p>your text</p>`." },
    ],
    xp: 20,
  },
  {
    slug: "links-images",
    title: { ar: "الروابط والصور", en: "Links and images" },
    body: [
      {
        ar: "الرابط يُكتب بالوسم `<a>`، والعنوان الذي ينتقل إليه يوضع في **الخاصية** (attribute) `href`.",
        en: "A link uses the `<a>` tag, and the address it opens goes in the `href` **attribute**.",
      },
      {
        ar: "الصورة تُكتب بالوسم `<img>` وهو وسم بدون إغلاق. الخاصية `src` لمسار الصورة، و `alt` لوصفها نصيًا لمن لا يستطيع رؤيتها.",
        en: "An image uses `<img>`, a tag with no closing part. `src` is the image path, and `alt` describes it in words for people who can't see it.",
      },
      {
        ar: "الخاصية `alt` ليست اختيارية في العمل الحقيقي: قارئات الشاشة ومحركات البحث تعتمد عليها.",
        en: "`alt` is not optional in real work: screen readers and search engines rely on it.",
      },
    ],
    example: {
      code: '<a href="https://developer.mozilla.org">MDN Docs</a>\n<img src="https://picsum.photos/200" alt="A random photo">',
      note: { ar: "رابط إلى موقع MDN وصورة مع وصف.", en: "A link to MDN and an image with a description." },
    },
    tip: {
      text: {
        ar: "اكتب `a:link` ثم Tab لتحصل على رابط جاهز، أو `img` ثم Tab لتحصل على صورة مع `src` و `alt`.",
        en: "Type `a:link` then Tab for a ready link, or `img` then Tab for an image with `src` and `alt`.",
      },
      code: 'img  →  <img src="" alt="">',
    },
    modern: {
      old: '<img src="cat.jpg" border="0" width="300">',
      now: '<img src="cat.jpg" alt="A cat" loading="lazy">',
      text: {
        ar: "الخصائص الشكلية مثل `border` أصبحت قديمة: الشكل مكانه CSS. و `loading=\"lazy\"` يؤجل تحميل الصور البعيدة فتصبح الصفحة أسرع.",
        en: "Styling attributes like `border` are outdated: looks belong in CSS. And `loading=\"lazy\"` delays offscreen images so the page loads faster.",
      },
      since: "Baseline 2023",
    },
    files: ["html"],
    starter: { html: "" },
    solution: {
      html: '<h1>My favourite site</h1>\n<a href="https://developer.mozilla.org">MDN Docs</a>\n<img src="https://picsum.photos/300/200" alt="A landscape photo">\n',
    },
    tasks: [
      {
        id: "link",
        label: { ar: "أضف رابطًا `<a>` له `href` يبدأ بـ https", en: "Add an `<a>` link whose `href` starts with https" },
        test: ({ doc }) => /^https:\/\//.test(doc.querySelector("a")?.getAttribute("href") ?? ""),
      },
      {
        id: "link-text",
        label: { ar: "اكتب نصًا داخل الرابط", en: "Put text inside the link" },
        test: ({ doc }) => text(doc.querySelector("a")).length > 0,
      },
      {
        id: "img",
        label: { ar: "أضف صورة `<img>` لها `src`", en: "Add an `<img>` with a `src`" },
        test: ({ doc }) => (doc.querySelector("img")?.getAttribute("src") ?? "").trim().length > 0,
      },
      {
        id: "alt",
        label: { ar: "أعطِ الصورة وصفًا في `alt`", en: "Give the image a description in `alt`" },
        test: ({ doc }) => (doc.querySelector("img")?.getAttribute("alt") ?? "").trim().length >= 3,
      },
    ],
    hints: [
      { ar: 'الرابط: `<a href="https://...">النص</a>`', en: 'A link: `<a href="https://...">text</a>`' },
      { ar: 'لصورة تجريبية استخدم `https://picsum.photos/300/200`', en: "For a sample image use `https://picsum.photos/300/200`" },
    ],
    xp: 25,
  },
  {
    slug: "lists",
    title: { ar: "القوائم", en: "Lists" },
    body: [
      {
        ar: "القائمة غير المرتبة `<ul>` تعرض نقاطًا، والقائمة المرتبة `<ol>` تعرض أرقامًا. كل عنصر في القائمتين يُكتب داخل `<li>`.",
        en: "An unordered list `<ul>` shows bullets, and an ordered list `<ol>` shows numbers. Each item in either list goes inside `<li>`.",
      },
      {
        ar: "استخدم `<ol>` عندما يكون الترتيب مهمًا، مثل خطوات وصفة، و `<ul>` عندما لا يهم الترتيب.",
        en: "Use `<ol>` when order matters, like recipe steps, and `<ul>` when it doesn't.",
      },
    ],
    example: {
      code: "<ul>\n  <li>HTML</li>\n  <li>CSS</li>\n</ul>",
      note: { ar: "قائمة بنقاط فيها عنصران.", en: "A bulleted list with two items." },
    },
    tip: {
      text: {
        ar: "اكتب `ul>li*3` ثم Tab لتحصل على قائمة فيها ثلاثة عناصر دفعة واحدة. الرمز `>` يعني «بداخل» و `*` يعني «كرّر».",
        en: "Type `ul>li*3` then Tab to get a list with three items at once. `>` means “inside” and `*` means “repeat”.",
      },
      code: "ul>li*3",
    },
    files: ["html"],
    starter: { html: "" },
    solution: {
      html: "<h2>What I want to learn</h2>\n<ul>\n  <li>HTML</li>\n  <li>CSS</li>\n  <li>JavaScript</li>\n</ul>\n<h2>Steps to make tea</h2>\n<ol>\n  <li>Boil water</li>\n  <li>Add tea</li>\n  <li>Wait 3 minutes</li>\n</ol>\n",
    },
    tasks: [
      {
        id: "ul",
        label: { ar: "أنشئ قائمة `<ul>` فيها 3 عناصر على الأقل", en: "Create a `<ul>` with at least 3 items" },
        test: ({ doc }) => doc.querySelectorAll("ul > li").length >= 3,
      },
      {
        id: "ol",
        label: { ar: "أنشئ قائمة مرتبة `<ol>` لخطوات تحضير الشاي", en: "Create an ordered `<ol>` list of tea steps" },
        test: ({ doc }) => doc.querySelectorAll("ol > li").length >= 2,
      },
      {
        id: "li-text",
        label: { ar: "لا تترك أي عنصر `<li>` فارغًا", en: "Leave no `<li>` empty" },
        test: ({ doc }) => {
          const items = Array.from(doc.querySelectorAll("li"));
          return items.length > 0 && items.every((li) => text(li).length > 0);
        },
      },
    ],
    hints: [
      { ar: "جرّب `ul>li*3` ثم Tab تحت العنوان الأول.", en: "Try `ul>li*3` then Tab under the first heading." },
      { ar: "للخطوات: `ol>li*3` ثم Tab، واكتب نص كل خطوة.", en: "For the steps: `ol>li*3` then Tab, and write each step." },
    ],
    xp: 25,
  },
  {
    slug: "semantic-layout",
    title: { ar: "هيكل الصفحة الدلالي", en: "Semantic page structure" },
    body: [
      {
        ar: "الوسوم الدلالية تصف **دور** كل جزء من الصفحة: `<header>` للترويسة، `<nav>` للقائمة، `<main>` للمحتوى الأساسي، و `<footer>` للتذييل.",
        en: "Semantic tags describe the **role** of each part of the page: `<header>` for the top, `<nav>` for navigation, `<main>` for the main content, and `<footer>` for the bottom.",
      },
      {
        ar: "تبدو الصفحة متشابهة في المتصفح، لكن الهيكل الدلالي يساعد قارئات الشاشة ومحركات البحث، ويجعل الكود أسهل للقراءة.",
        en: "The page looks similar in the browser, but semantic structure helps screen readers and search engines, and makes the code easier to read.",
      },
    ],
    example: {
      code: "<header>\n  <nav>...</nav>\n</header>\n<main>...</main>\n<footer>...</footer>",
      note: { ar: "الهيكل الأساسي لأغلب المواقع.", en: "The basic structure of most websites." },
    },
    tip: {
      text: {
        ar: "يمكنك بناء الهيكل كله بسطر واحد: اكتب `header>nav^main+footer` ثم Tab. الرمز `+` يعني «بجانب» و `^` يعني «اصعد مستوى».",
        en: "Build the whole skeleton in one line: type `header>nav^main+footer` then Tab. `+` means “next to” and `^` means “go up a level”.",
      },
      code: "header>nav^main+footer",
    },
    modern: {
      old: '<div id="header">…</div>\n<div id="footer">…</div>',
      now: "<header>…</header>\n<footer>…</footer>",
      text: {
        ar: "قبل HTML5 كانت كل الأجزاء `<div>` بأسماء مختلفة. الوسوم الدلالية الحديثة توضح دور كل جزء دون أسماء إضافية.",
        en: "Before HTML5 every part was a `<div>` with a different name. Modern semantic tags state each part's role without extra names.",
      },
      since: "HTML5",
    },
    files: ["html"],
    starter: { html: "" },
    solution: {
      html: '<header>\n  <h1>Hamid</h1>\n  <nav>\n    <a href="#about">About</a>\n    <a href="#projects">Projects</a>\n  </nav>\n</header>\n<main>\n  <h2 id="about">About me</h2>\n  <p>I am learning web development.</p>\n</main>\n<footer>\n  <p>© 2026 Hamid</p>\n</footer>\n',
    },
    tasks: [
      {
        id: "header-nav",
        label: { ar: "أضف `<header>` بداخله `<nav>`", en: "Add a `<header>` with a `<nav>` inside" },
        test: ({ doc }) => doc.querySelector("header nav") !== null,
      },
      {
        id: "nav-links",
        label: { ar: "ضع رابطين على الأقل داخل `<nav>`", en: "Put at least two links in the `<nav>`" },
        test: ({ doc }) => doc.querySelectorAll("nav a").length >= 2,
      },
      {
        id: "main",
        label: { ar: "أضف `<main>` فيه عنوان وفقرة", en: "Add a `<main>` with a heading and a paragraph" },
        test: ({ doc }) => {
          const main = doc.querySelector("main");
          return !!main && !!main.querySelector("h1,h2,h3") && !!main.querySelector("p");
        },
      },
      {
        id: "footer",
        label: { ar: "أضف `<footer>` في آخر الصفحة", en: "Add a `<footer>` at the end of the page" },
        test: ({ doc }) => {
          const footer = doc.querySelector("footer");
          const main = doc.querySelector("main");
          if (!footer) return false;
          return !main || (main.compareDocumentPosition(footer) & Node.DOCUMENT_POSITION_FOLLOWING) !== 0;
        },
      },
    ],
    hints: [
      { ar: "ابدأ بـ `header>nav^main+footer` ثم Tab.", en: "Start with `header>nav^main+footer` then Tab." },
      { ar: 'روابط القائمة يمكن أن تكون داخلية: `<a href="#about">About</a>`', en: 'Nav links can be internal: `<a href="#about">About</a>`' },
    ],
    xp: 30,
  },
];

export const htmlExam: Exam = {
  passPercent: 80,
  questions: [
    {
      id: "q-form",
      prompt: { ar: "كيف تربط `<label>` بحقل الإدخال؟", en: "How do you link a `<label>` to its field?" },
      options: [
        { ar: "`for` في label يساوي `id` في الحقل", en: "The label's `for` equals the field's `id`" },
        { ar: "تضع الحقل قبل label مباشرة", en: "Put the field right before the label" },
        { ar: "`name` في label", en: "`name` on the label" },
        { ar: "لا حاجة للربط", en: "No link is needed" },
      ],
      answer: 0,
    },
    {
      id: "q-table",
      prompt: { ar: "أي وسم لخلية عنوان في الجدول؟", en: "Which tag is a header cell in a table?" },
      options: [
        { ar: "`<td>`", en: "`<td>`" },
        { ar: "`<th>`", en: "`<th>`" },
        { ar: "`<tr>`", en: "`<tr>`" },
        { ar: "`<head>`", en: "`<head>`" },
      ],
      answer: 1,
    },
    {
      id: "q0",
      prompt: { ar: "ما أول سطر في كل صفحة HTML حديثة؟", en: "What is the first line of every modern HTML page?" },
      options: [
        { ar: "`<html>`", en: "`<html>`" },
        { ar: "`<!DOCTYPE html>`", en: "`<!DOCTYPE html>`" },
        { ar: "`<head>`", en: "`<head>`" },
        { ar: "`<title>`", en: "`<title>`" },
      ],
      answer: 1,
    },
    {
      id: "q00",
      prompt: { ar: "أين يُكتب اسم الصفحة الذي يظهر في تبويب المتصفح؟", en: "Where does the page name shown on the browser tab go?" },
      options: [
        { ar: "`<h1>` داخل `<body>`", en: "`<h1>` inside `<body>`" },
        { ar: "`<title>` داخل `<head>`", en: "`<title>` inside `<head>`" },
        { ar: "في اسم الملف فقط", en: "Only in the file name" },
        { ar: "`<meta charset>`", en: "`<meta charset>`" },
      ],
      answer: 1,
    },
    {
      id: "q1",
      prompt: { ar: "أي وسم يُستخدم لأهم عنوان في الصفحة؟", en: "Which tag is used for the most important heading on the page?" },
      options: [
        { ar: "`<head>`", en: "`<head>`" },
        { ar: "`<h1>`", en: "`<h1>`" },
        { ar: "`<h6>`", en: "`<h6>`" },
        { ar: "`<title>`", en: "`<title>`" },
      ],
      answer: 1,
    },
    {
      id: "q2",
      prompt: { ar: "ما الخطأ في هذا الكود؟", en: "What is wrong with this code?" },
      code: '<img src="cat.jpg">',
      options: [
        { ar: "ينقصه وسم الإغلاق `</img>`", en: "It is missing a closing `</img>`" },
        { ar: "ينقصه وصف `alt`", en: "It is missing an `alt` description" },
        { ar: "يجب استخدام `href` بدل `src`", en: "It should use `href` instead of `src`" },
        { ar: "لا يوجد خطأ إطلاقًا", en: "Nothing at all" },
      ],
      answer: 1,
    },
    {
      id: "q3",
      prompt: { ar: "أي قائمة تناسب خطوات وصفة طبخ؟", en: "Which list fits the steps of a recipe?" },
      options: [
        { ar: "`<ul>`", en: "`<ul>`" },
        { ar: "`<ol>`", en: "`<ol>`" },
        { ar: "`<li>` وحده", en: "`<li>` on its own" },
        { ar: "`<nav>`", en: "`<nav>`" },
      ],
      answer: 1,
    },
    {
      id: "q4",
      prompt: { ar: "ماذا ينتج اختصار Emmet التالي؟", en: "What does this Emmet abbreviation produce?" },
      code: "ul>li*2",
      options: [
        { ar: "قائمتان فارغتان", en: "Two empty lists" },
        { ar: "قائمة فيها عنصران", en: "A list with two items" },
        { ar: "عنصر واحد مكرّر مرتين بدون قائمة", en: "One item repeated twice, no list" },
        { ar: "خطأ في المحرر", en: "An editor error" },
      ],
      answer: 1,
    },
    {
      id: "q5",
      prompt: { ar: "أين يوضع المحتوى الأساسي للصفحة؟", en: "Where does the main content of a page go?" },
      options: [
        { ar: "`<header>`", en: "`<header>`" },
        { ar: "`<footer>`", en: "`<footer>`" },
        { ar: "`<main>`", en: "`<main>`" },
        { ar: "`<nav>`", en: "`<nav>`" },
      ],
      answer: 2,
    },
    { id: "x-alt", prompt: { ar: "لماذا نكتب `alt` لكل صورة؟", en: "Why give every image an `alt`?" }, options: [{ ar: "لقارئ الشاشة وعند فشل تحميل الصورة", en: "For screen readers and when the image fails to load" }, { ar: "لتكبير الصورة", en: "To enlarge the image" }, { ar: "لا فائدة منه", en: "It does nothing" }], answer: 0 },
    { id: "x-video", prompt: { ar: "أي سمة تُظهر أزرار التشغيل في `<video>`؟", en: "Which attribute shows play buttons on a `<video>`?" }, options: [{ ar: "`controls`", en: "`controls`" }, { ar: "`buttons`", en: "`buttons`" }, { ar: "`play`", en: "`play`" }], answer: 0 },
  ],
};
