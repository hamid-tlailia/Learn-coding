import type { Exam, Lesson } from "./types";

const text = (el: Element | null) => (el?.textContent ?? "").trim();

export const htmlLessons: Lesson[] = [
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
    files: ["html"],
    starter: { html: "<!-- اكتب الكود هنا / Write your code here -->\n" },
    solution: { html: "<h1>Hello, I'm Hamid</h1>\n<p>I'm learning to code with Satr.</p>\n" },
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
    files: ["html"],
    starter: { html: "<h1>My favourite site</h1>\n\n" },
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
    starter: { html: "<h2>What I want to learn</h2>\n\n<h2>Steps to make tea</h2>\n\n" },
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
    files: ["html"],
    starter: { html: "<!-- My portfolio page -->\n" },
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
  ],
};
