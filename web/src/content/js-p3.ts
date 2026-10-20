import type { Challenge } from "./challenges";
import { printed } from "./check";
import type { Lesson, Question } from "./types";

/**
 * JavaScript Phase 3: the page (DOM) and events, then the browser around it (BOM) and storage.
 * Checks never see the live page (`doc` is the HTML source), so every harness reads the page
 * after the learner's code and reports what it found as `__c__ name value` lines.
 */

const c = (logs: string[], name: string, value: string | number | boolean) => printed(logs, `__c__ ${name} ${value}`);
/** The value the harness printed after `__c__ name `, or null. */
const marker = (logs: string[], name: string) => {
  const line = logs.find((l) => l.startsWith(`__c__ ${name} `));
  return line === undefined ? null : line.slice(`__c__ ${name} `.length);
};
const js = (files: { js?: string }) => files.js ?? "";
/** Harness code runs in its own function, so its names never clash with the learner's `const`s. */
const wrap = (lines: string[]) => `(function () {\n${lines.join("\n")}\n})();`;

/* ------------------------------------------------------------------ 21 dom-intro */

const INTRO_HTML = "<h1>My shopping list</h1>\n<ul>\n  <li>Milk</li>\n  <li>Bread</li>\n  <li>Eggs</li>\n</ul>\n";

export const domIntro: Lesson = {
  slug: "dom-intro",
  title: { ar: "ما هو DOM؟ شجرة الصفحة", en: "What is the DOM? The page tree" },
  body: [
    { icon: "🌳", ar: "عندما يقرأ المتصفح ملف HTML يبني منه **شجرة** من العناصر اسمها **DOM** (Document Object Model). JavaScript لا تقرأ ملف HTML نفسه، بل تتعامل مع هذه الشجرة.", en: "When the browser reads an HTML file, it builds a **tree** of elements from it called the **DOM** (Document Object Model). JavaScript doesn't read the HTML file itself; it works with this tree." },
    { icon: "📄", ar: "رأس الشجرة هو الكائن `document`. منه تصل إلى `document.body` (جسم الصفحة) و `document.title` (اسم الصفحة في تبويب المتصفح)، ويمكنك تغييره: `document.title = \"Hi\";`.", en: "The top of the tree is the `document` object. From it you reach `document.body` (the page body) and `document.title` (the page name on the browser tab), which you can change: `document.title = \"Hi\";`." },
    { icon: "👪", ar: "كل عنصر له **أب** (parent) و**أبناء** (children). الـ `<ul>` أب لعناصر `<li>` داخله. `document.body.children` قائمة الأبناء المباشرين للجسم، و `children[0]` أولهم، و `.tagName` اسم وسمه بأحرف كبيرة مثل `H1`.", en: "Every element has a **parent** and **children**. A `<ul>` is the parent of the `<li>` items inside it. `document.body.children` lists the body's direct children, `children[0]` is the first one, and `.tagName` is its tag in capitals, like `H1`." },
    { icon: "🔢", ar: "`document.querySelectorAll(\"li\")` تجمع كل عناصر `<li>` في الصفحة، و `.length` يعطي عددها، تمامًا مثل طول المصفوفة.", en: "`document.querySelectorAll(\"li\")` collects every `<li>` on the page, and `.length` gives how many there are, just like an array's length." },
  ],
  example: {
    code: 'console.log(document.title);\ndocument.title = "Learning the DOM";\nconsole.log(document.title);\n\nconsole.log(document.body.children.length);\nconsole.log(document.querySelectorAll("li").length);',
    note: { ar: "اقرأ اسم الصفحة وغيّره، ثم عُدّ العناصر.", en: "Read the page name and change it, then count elements." },
    lang: "js",
  },
  files: ["js", "html"],
  starter: { js: "", html: INTRO_HTML },
  solution: {
    js: 'document.title = "Shopping";\nconsole.log(document.title);\n\nconsole.log(document.querySelectorAll("li").length);\n\nconsole.log(document.body.children[0].tagName);\n',
    html: INTRO_HTML,
  },
  harness: wrap(['console.log("__c__ title " + document.title);']),
  tasks: [
    { id: "set-title", label: { ar: "غيّر اسم الصفحة: `document.title = \"Shopping\";`", en: "Change the page name: `document.title = \"Shopping\";`" }, test: ({ logs }) => c(logs, "title", "Shopping") },
    { id: "print-title", label: { ar: "بعدها اطبع `document.title` (يظهر `Shopping`)", en: "Then print `document.title` (it shows `Shopping`)" }, test: ({ files, logs }) => /console\.log\([^)]*document\.title/.test(js(files)) && printed(logs, "Shopping") },
    { id: "count", label: { ar: "اطبع عدد عناصر `<li>` بـ `document.querySelectorAll(\"li\").length` (يظهر `3`)", en: "Print how many `<li>` there are with `document.querySelectorAll(\"li\").length` (it shows `3`)" }, test: ({ files, logs }) => /querySelectorAll\(/.test(js(files)) && printed(logs, "3") },
    { id: "first-child", label: { ar: "اطبع اسم وسم أول ابن للجسم: `document.body.children[0].tagName` (يظهر `H1`)", en: "Print the tag of the body's first child: `document.body.children[0].tagName` (it shows `H1`)" }, test: ({ logs }) => logs.some((l) => l.trim() === "H1") },
  ],
  hints: [
    { ar: "السطر الأول: `document.title = \"Shopping\";` ثم `console.log(document.title);`", en: "First line: `document.title = \"Shopping\";` then `console.log(document.title);`" },
    { ar: '`console.log(document.querySelectorAll("li").length);` ثم `console.log(document.body.children[0].tagName);`', en: '`console.log(document.querySelectorAll("li").length);` then `console.log(document.body.children[0].tagName);`' },
  ],
  deep: {
    more: [
      { icon: "🧬", ar: "في الشجرة أيضًا **عُقد نصية** (النص والمسافات بين الوسوم). `children` يعطي العناصر فقط، أما `childNodes` فيعطي كل شيء بما فيه النصوص.", en: "The tree also has **text nodes** (text and the spaces between tags). `children` gives elements only, while `childNodes` gives everything, text included." },
      { icon: "⬆️", ar: "للصعود في الشجرة: `element.parentElement` يعطي الأب. وللتنقل بين الإخوة: `nextElementSibling` و `previousElementSibling`.", en: "To go up the tree: `element.parentElement` gives the parent. To move between siblings: `nextElementSibling` and `previousElementSibling`." },
      { icon: "🛠️", ar: "في أدوات المطور (F12) تبويب **Elements** يعرض شجرة DOM الحية: إن غيّرت JavaScript الصفحة ترى التغيير هناك، لا في ملف HTML.", en: "In DevTools (F12) the **Elements** tab shows the live DOM tree: when JavaScript changes the page you see it there, not in the HTML file." },
    ],
    mistakes: [
      { ar: "كتابة `Document.title` بحرف كبير ← الاسم `document` بحروف صغيرة.", en: "Writing `Document.title` with a capital → the name is `document`, all lowercase." },
      { ar: "توقّع أن `tagName` يعطي `h1` ← يعطيه بأحرف كبيرة `H1`.", en: "Expecting `tagName` to give `h1` → it gives capitals: `H1`." },
      { ar: "تشغيل السكربت في `<head>` قبل بناء الجسم فيجد الصفحة فارغة ← ضع `<script>` آخر `<body>` أو استخدم `defer`.", en: "Running the script in `<head>` before the body exists, so the page looks empty → put `<script>` at the end of `<body>` or use `defer`." },
    ],
  },
  xp: 25,
};

/* ------------------------------------------------------------------ 22 dom-select */

const SELECT_HTML = '<h1 id="title">Hello</h1>\n<p id="note">A note</p>\n<p class="price">25</p>\n';

export const domSelect: Lesson = {
  slug: "dom-select",
  title: { ar: "اختيار العناصر وتغيير نصها", en: "Selecting elements and changing their text" },
  body: [
    { icon: "🎯", ar: "`document.querySelector()` تجلب **أول** عنصر يطابق محدد CSS: `\"p\"` بالوسم، `\"#title\"` بالـ id، `\".price\"` بالـ class. احفظه في متغير: `const title = document.querySelector(\"#title\");`.", en: "`document.querySelector()` grabs the **first** element that matches a CSS selector: `\"p\"` by tag, `\"#title\"` by id, `\".price\"` by class. Keep it in a variable: `const title = document.querySelector(\"#title\");`." },
    { icon: "📚", ar: "`document.querySelectorAll(\"p\")` تجلب **كل** العناصر المطابقة في قائمة، ويمكنك المرور عليها بـ `for...of`.", en: "`document.querySelectorAll(\"p\")` grabs **every** match in a list, and you can loop over it with `for...of`." },
    { icon: "✏️", ar: "`textContent` نص العنصر: اقرأه `title.textContent` أو غيّره `title.textContent = \"Hi\";`. أما `innerHTML` فيقرأ HTML: `note.innerHTML = \"<strong>Hi</strong>\";` يصنع وسمًا حقيقيًا.", en: "`textContent` is an element's text: read it with `title.textContent` or change it with `title.textContent = \"Hi\";`. `innerHTML` reads HTML instead: `note.innerHTML = \"<strong>Hi</strong>\";` makes a real tag." },
    { icon: "🛡️", ar: "لنص كتبه المستخدم استخدم **دائمًا** `textContent`. لو وضعته في `innerHTML` قد يكتب المستخدم وسومًا تُنفَّذ في صفحتك؛ هذه ثغرة اسمها **XSS**.", en: "For text the user typed, **always** use `textContent`. Put it in `innerHTML` and the user could type tags that run in your page; that hole is called **XSS**." },
  ],
  example: {
    code: 'const title = document.querySelector("h1");\nconsole.log(title.textContent);\n\ntitle.textContent = "Changed by JS";\n\nconst items = document.querySelectorAll("p");\nfor (const item of items) {\n  console.log(item.textContent);\n}',
    note: { ar: "اقرأ نص عنصر وغيّره، ثم مرّ على قائمة عناصر.", en: "Read and change an element's text, then loop over a list of elements." },
    lang: "js",
  },
  modern: {
    old: 'document.getElementById("title");\ndocument.getElementsByClassName("price")[0];',
    now: 'document.querySelector("#title");\ndocument.querySelector(".price");',
    text: { ar: "الطرق القديمة ما زالت تعمل، لكن `querySelector` واحدة تفهم كل محددات CSS.", en: "The old methods still work, but one `querySelector` understands every CSS selector." },
  },
  files: ["js", "html"],
  starter: { js: "", html: SELECT_HTML },
  solution: {
    js: 'const title = document.querySelector("#title");\ntitle.textContent = "Welcome!";\n\nconst note = document.querySelector("#note");\nnote.innerHTML = "<strong>Important</strong>";\n\nconst price = document.querySelector(".price");\nconsole.log(price.textContent);\n',
    html: SELECT_HTML,
  },
  harness: wrap([
    'var t = document.querySelector("#title"); console.log("__c__ title " + (t ? t.textContent : ""));',
    'var n = document.querySelector("#note"); var s = n ? n.querySelector("strong") : null; console.log("__c__ strong " + (s ? s.textContent : "none"));',
  ]),
  tasks: [
    { id: "title", label: { ar: "اجلب `#title` وغيّر نصه إلى `Welcome!` بـ `textContent`", en: "Grab `#title` and change its text to `Welcome!` with `textContent`" }, test: ({ logs }) => c(logs, "title", "Welcome!") },
    { id: "strong", label: { ar: "ضع داخل `#note` بـ `innerHTML` النص `<strong>Important</strong>`", en: "Put `<strong>Important</strong>` inside `#note` with `innerHTML`" }, test: ({ logs }) => c(logs, "strong", "Important") },
    { id: "read", label: { ar: "اجلب العنصر `.price` واطبع نصه (يظهر `25`)", en: "Grab the `.price` element and print its text (it shows `25`)" }, test: ({ files, logs }) => /["'`]\s*\.price\s*["'`]/.test(js(files)) && printed(logs, "25") },
  ],
  hints: [
    { ar: '`const title = document.querySelector("#title");` ثم `title.textContent = "Welcome!";`', en: '`const title = document.querySelector("#title");` then `title.textContent = "Welcome!";`' },
    { ar: '`document.querySelector("#note").innerHTML = "<strong>Important</strong>";` و `console.log(document.querySelector(".price").textContent);`', en: '`document.querySelector("#note").innerHTML = "<strong>Important</strong>";` and `console.log(document.querySelector(".price").textContent);`' },
  ],
  deep: {
    more: [
      { icon: "🔎", ar: "المحدد يمكن أن يكون أي محدد CSS: `\"ul li\"` أو `\"button.primary\"` أو `\"input[type=email]\"`. ويمكنك البحث داخل عنصر: `list.querySelector(\"li\")`.", en: "The selector can be any CSS selector: `\"ul li\"`, `\"button.primary\"` or `\"input[type=email]\"`. You can also search inside an element: `list.querySelector(\"li\")`." },
      { icon: "🕳️", ar: "إن لم يوجد عنصر مطابق تعيد `querySelector` القيمة `null`، و `querySelectorAll` قائمة فارغة طولها `0`.", en: "When nothing matches, `querySelector` returns `null`, and `querySelectorAll` returns an empty list with length `0`." },
      { icon: "🧾", ar: "قيمة `textContent` دائمًا **نص**: نص `.price` هو `\"25\"`. للحساب حوّله بـ `Number(price.textContent)`.", en: "`textContent` is always **text**: `.price` holds `\"25\"`. To do math, convert it with `Number(price.textContent)`." },
    ],
    mistakes: [
      { ar: "`querySelector(\"title\")` بدون `#` ← هذا يبحث عن وسم `<title>`. للـ id اكتب `\"#title\"`، وللـ class اكتب `\".price\"`.", en: "`querySelector(\"title\")` without `#` → that looks for a `<title>` tag. For an id write `\"#title\"`, for a class write `\".price\"`." },
      { ar: "`Cannot read properties of null` ← المحدد خطأ أو العنصر غير موجود بعد. راجع الاسم في HTML.", en: "`Cannot read properties of null` → the selector is wrong or the element doesn't exist yet. Check the name in the HTML." },
      { ar: "وضع ما يكتبه المستخدم في `innerHTML` ← استخدم `textContent` لنصوص المستخدم.", en: "Putting what the user typed into `innerHTML` → use `textContent` for user text." },
    ],
  },
  xp: 25,
};

/* ------------------------------------------------------------------ 23 dom-style */

const STYLE_HTML = '<h1 id="title">Style me</h1>\n<div id="box" class="card">A box</div>\n';

export const domStyle: Lesson = {
  slug: "dom-style",
  title: { ar: "تغيير الشكل: style و classList", en: "Changing the look: style and classList" },
  body: [
    { icon: "🎨", ar: "`element.style` يغيّر تنسيق عنصر واحد مباشرة: `title.style.color = \"red\";`. القيمة نص مثل ما تكتبه في CSS.", en: "`element.style` changes one element's styling directly: `title.style.color = \"red\";`. The value is text, just like in CSS." },
    { icon: "🐫", ar: "أسماء CSS التي فيها شرطة تُكتب بطريقة **camelCase**: `background-color` تصبح `backgroundColor`، و `font-size` تصبح `fontSize`.", en: "CSS names with a dash are written in **camelCase**: `background-color` becomes `backgroundColor`, and `font-size` becomes `fontSize`." },
    { icon: "🏷️", ar: "الأفضل غالبًا أن تكتب التنسيق في CSS داخل class، ثم تبدّل الـ class بـ `classList`: `add(\"active\")` تضيف، `remove(\"active\")` تحذف.", en: "Usually it's better to write the styling in CSS inside a class, then switch the class with `classList`: `add(\"active\")` adds it, `remove(\"active\")` removes it." },
    { icon: "🔀", ar: "`toggle(\"dark\")` تضيف الـ class إن لم تكن موجودة وتحذفها إن وُجدت، و `contains(\"dark\")` تُرجع `true` أو `false`.", en: "`toggle(\"dark\")` adds the class if it's missing and removes it if it's there, and `contains(\"dark\")` returns `true` or `false`." },
  ],
  example: {
    code: 'const box = document.querySelector("#box");\nbox.style.backgroundColor = "gold";\nbox.style.fontSize = "24px";\n\nbox.classList.add("big");\nconsole.log(box.classList.contains("big"));  // true\nbox.classList.toggle("big");\nconsole.log(box.classList.contains("big"));  // false',
    note: { ar: "تنسيق مباشر، ثم إضافة class وتبديلها.", en: "Direct styling, then adding and toggling a class." },
    lang: "js",
  },
  files: ["js", "html"],
  starter: { js: "", html: STYLE_HTML },
  solution: {
    js: 'const title = document.querySelector("#title");\ntitle.style.color = "red";\n\nconst box = document.querySelector("#box");\nbox.style.backgroundColor = "yellow";\nbox.classList.add("active");\nbox.classList.remove("card");\n',
    html: STYLE_HTML,
  },
  harness: wrap([
    'var t = document.querySelector("#title"); var b = document.querySelector("#box");',
    'console.log("__c__ color " + (t ? t.style.color : ""));',
    'console.log("__c__ bg " + (b ? b.style.backgroundColor : ""));',
    'console.log("__c__ active " + (b ? b.classList.contains("active") : false));',
    'console.log("__c__ card " + (b ? b.classList.contains("card") : true));',
  ]),
  tasks: [
    { id: "color", label: { ar: "اجعل لون نص `#title` أحمر: `style.color = \"red\"`", en: "Make `#title`'s text red: `style.color = \"red\"`" }, test: ({ logs }) => c(logs, "color", "red") || c(logs, "color", "rgb(255, 0, 0)") },
    { id: "bg", label: { ar: "اجعل خلفية `#box` صفراء: `style.backgroundColor = \"yellow\"`", en: "Make `#box`'s background yellow: `style.backgroundColor = \"yellow\"`" }, test: ({ logs }) => c(logs, "bg", "yellow") || c(logs, "bg", "rgb(255, 255, 0)") },
    { id: "add", label: { ar: "أضف الـ class `active` إلى `#box` بـ `classList.add`", en: "Add the class `active` to `#box` with `classList.add`" }, test: ({ logs }) => c(logs, "active", true) },
    { id: "remove", label: { ar: "احذف الـ class `card` من `#box` بـ `classList.remove`", en: "Remove the class `card` from `#box` with `classList.remove`" }, test: ({ logs }) => c(logs, "card", false) },
  ],
  hints: [
    { ar: '`document.querySelector("#title").style.color = "red";`', en: '`document.querySelector("#title").style.color = "red";`' },
    { ar: '`const box = document.querySelector("#box"); box.style.backgroundColor = "yellow"; box.classList.add("active"); box.classList.remove("card");`', en: '`const box = document.querySelector("#box"); box.style.backgroundColor = "yellow"; box.classList.add("active"); box.classList.remove("card");`' },
  ],
  deep: {
    more: [
      { icon: "⚖️", ar: "`style` يكتب تنسيقًا **داخل العنصر نفسه** فيغلب أغلب قواعد CSS. لذلك استخدمه لقيم تتغير دائمًا (مثل موضع شيء يتحرك)، واستخدم `classList` لباقي الحالات.", en: "`style` writes styling **on the element itself**, so it beats most CSS rules. Use it for values that keep changing (like the position of something moving), and `classList` for everything else." },
      { icon: "👀", ar: "`element.style.color` يقرأ فقط ما وضعته أنت بـ `style`. لقراءة اللون النهائي من CSS استخدم `getComputedStyle(element).color`.", en: "`element.style.color` only reads what you set with `style`. To read the final color from CSS, use `getComputedStyle(element).color`." },
      { icon: "🧺", ar: "`classList.add(\"a\", \"b\")` تضيف أكثر من class مرة واحدة، و `toggle(\"dark\", isNight)` تضيفها إن كان الشرط `true` وتحذفها إن كان `false`.", en: "`classList.add(\"a\", \"b\")` adds several classes at once, and `toggle(\"dark\", isNight)` adds it when the condition is `true` and removes it when `false`." },
    ],
    mistakes: [
      { ar: "`style.background-color` بشرطة ← JavaScript تفهمها طرحًا. اكتب `style.backgroundColor`.", en: "`style.background-color` with a dash → JavaScript reads it as a minus. Write `style.backgroundColor`." },
      { ar: "`style.width = 200` بلا وحدة ← لا يحدث شيء. اكتب `\"200px\"`.", en: "`style.width = 200` without a unit → nothing happens. Write `\"200px\"`." },
      { ar: "`classList.add(\".active\")` بنقطة ← النقطة للمحددات فقط. اكتب `add(\"active\")`.", en: "`classList.add(\".active\")` with a dot → the dot is only for selectors. Write `add(\"active\")`." },
    ],
  },
  xp: 25,
};

/* ------------------------------------------------------------------ 24 dom-create */

const CREATE_HTML = '<ul id="list"></ul>\n<p id="old">Delete me</p>\n';

export const domCreate: Lesson = {
  slug: "dom-create",
  title: { ar: "إنشاء العناصر وحذفها", en: "Creating and removing elements" },
  body: [
    { icon: "🧱", ar: "`document.createElement(\"li\")` تصنع عنصرًا جديدًا **في الذاكرة فقط**؛ لا يظهر بعد. أعطه نصًا: `li.textContent = \"Milk\";`.", en: "`document.createElement(\"li\")` makes a new element **in memory only**; it doesn't show yet. Give it text: `li.textContent = \"Milk\";`." },
    { icon: "📌", ar: "لتظهره ضعه داخل عنصر في الصفحة: `list.append(li);` تضيفه في آخر القائمة. و `appendChild(li)` الطريقة الأقدم وتعمل أيضًا.", en: "To show it, put it inside an element on the page: `list.append(li);` adds it at the end of the list. `appendChild(li)` is the older way and works too." },
    { icon: "🔁", ar: "لتصنع عنصرًا لكل قيمة في مصفوفة استخدم `for...of`: داخل الحلقة اصنع `li` وأعطه النص ثم أضفه.", en: "To make one element per array item, use `for...of`: inside the loop create an `li`, give it the text, then append it." },
    { icon: "🗑️", ar: "`element.remove();` يحذف العنصر من الصفحة. اجلبه أولًا بـ `querySelector` ثم احذفه.", en: "`element.remove();` deletes the element from the page. Grab it with `querySelector` first, then remove it." },
  ],
  example: {
    code: 'const colors = ["red", "green", "blue"];\nconst ul = document.createElement("ul");\n\nfor (const color of colors) {\n  const li = document.createElement("li");\n  li.textContent = color;\n  ul.append(li);\n}\n\ndocument.body.append(ul);\nconsole.log(ul.children.length);  // 3',
    note: { ar: "قائمة تُبنى بالكامل من مصفوفة.", en: "A list built entirely from an array." },
    lang: "js",
  },
  files: ["js", "html"],
  starter: { js: 'const fruits = ["Apple", "Banana", "Cherry"];\n', html: CREATE_HTML },
  solution: {
    js: 'const fruits = ["Apple", "Banana", "Cherry"];\nconst list = document.querySelector("#list");\n\nfor (const fruit of fruits) {\n  const li = document.createElement("li");\n  li.textContent = fruit;\n  list.append(li);\n}\n\ndocument.querySelector("#old").remove();\n',
    html: CREATE_HTML,
  },
  harness: wrap([
    'var l = document.querySelector("#list"); var lis = l ? l.querySelectorAll("li") : [];',
    'console.log("__c__ count " + lis.length);',
    'console.log("__c__ items " + Array.prototype.map.call(lis, function (e) { return e.textContent.trim(); }).join(","));',
    'console.log("__c__ old " + (document.querySelector("#old") ? "yes" : "no"));',
  ]),
  tasks: [
    { id: "count", label: { ar: "بحلقة `for...of` أضف إلى `#list` عنصر `<li>` لكل فاكهة (3 عناصر)", en: "With a `for...of` loop, add one `<li>` per fruit to `#list` (3 items)" }, test: ({ files, logs }) => /createElement\(/.test(js(files)) && c(logs, "count", 3) },
    { id: "text", label: { ar: "اجعل نص كل `<li>` اسم الفاكهة: `Apple` ثم `Banana` ثم `Cherry`", en: "Give each `<li>` the fruit's name: `Apple`, then `Banana`, then `Cherry`" }, test: ({ logs }) => c(logs, "items", "Apple,Banana,Cherry") },
    { id: "remove", label: { ar: "احذف الفقرة `#old` بـ `remove()`", en: "Delete the `#old` paragraph with `remove()`" }, test: ({ logs }) => c(logs, "old", "no") },
  ],
  hints: [
    { ar: '`const list = document.querySelector("#list");` ثم داخل `for (const fruit of fruits) { … }` اصنع `li` وأعطه `fruit`.', en: '`const list = document.querySelector("#list");` then inside `for (const fruit of fruits) { … }` create an `li` and give it `fruit`.' },
    { ar: '`const li = document.createElement("li"); li.textContent = fruit; list.append(li);` وبعد الحلقة `document.querySelector("#old").remove();`', en: '`const li = document.createElement("li"); li.textContent = fruit; list.append(li);` and after the loop `document.querySelector("#old").remove();`' },
  ],
  deep: {
    more: [
      { icon: "⬅️", ar: "`append` تضيف في النهاية، و `prepend` في البداية، و `before` / `after` بجانب العنصر. و `append` تقبل نصًا أيضًا: `p.append(\"Hi\")`.", en: "`append` adds at the end, `prepend` at the start, and `before` / `after` next to the element. `append` also accepts text: `p.append(\"Hi\")`." },
      { icon: "🧹", ar: "لإفراغ عنصر من كل أبنائه: `list.textContent = \"\";` أو `list.replaceChildren();`. مفيد قبل إعادة رسم قائمة.", en: "To empty an element of all its children: `list.textContent = \"\";` or `list.replaceChildren();`. Handy before redrawing a list." },
      { icon: "⚡", ar: "كل إضافة للصفحة تكلّف المتصفح عملًا. لقوائم كبيرة اصنع العناصر أولًا ثم أضفها مرة واحدة: `list.append(...items)`.", en: "Every insert costs the browser some work. For big lists, build the elements first and add them in one go: `list.append(...items)`." },
    ],
    mistakes: [
      { ar: "صنع العنصر ونسيان `append` ← لا يظهر شيء لأنه في الذاكرة فقط.", en: "Creating the element but forgetting `append` → nothing shows because it only lives in memory." },
      { ar: "صنع `li` واحد **قبل** الحلقة وإضافته كل مرة ← يُنقل نفس العنصر ويبقى واحد فقط. اصنعه **داخل** الحلقة.", en: "Creating one `li` **before** the loop and appending it each time → the same element just moves, so only one remains. Create it **inside** the loop." },
      { ar: "`createElement(\"<li>\")` بأقواس الوسم ← اكتب الاسم فقط: `createElement(\"li\")`.", en: "`createElement(\"<li>\")` with angle brackets → write just the name: `createElement(\"li\")`." },
    ],
  },
  xp: 30,
};

/* ------------------------------------------------------------------ 25 dom-events */

const EVENTS_HTML =
  '<button id="btn">Click me</button>\n<p id="out">...</p>\n\n<input id="name" placeholder="Your name">\n<p id="hello">Hello!</p>\n\n<form id="form">\n  <input id="city" placeholder="City">\n  <button>Send</button>\n</form>\n<p id="sent">Not sent</p>\n';

export const domEvents: Lesson = {
  slug: "dom-events",
  title: { ar: "الأحداث: click و input و submit", en: "Events: click, input and submit" },
  body: [
    { icon: "👆", ar: "**الحدث** (event) شيء يفعله المستخدم: ضغطة، كتابة، إرسال نموذج. `btn.addEventListener(\"click\", () => { … })` تقول: «عند كل ضغطة نفّذ هذه الدالة».", en: "An **event** is something the user does: a click, typing, sending a form. `btn.addEventListener(\"click\", () => { … })` says: \"on every click, run this function\"." },
    { icon: "⌨️", ar: "حدث `\"input\"` يحدث مع كل حرف يُكتب في حقل. داخل الدالة اقرأ ما كُتب بـ `input.value`، فتتحدث الصفحة **أثناء الكتابة**.", en: "The `\"input\"` event fires on every character typed in a field. Inside the function read what was typed with `input.value`, so the page updates **while typing**." },
    { icon: "📨", ar: "حدث `\"submit\"` يحدث على `<form>` عند الإرسال. المتصفح يعيد تحميل الصفحة تلقائيًا، فأوقفه بـ `event.preventDefault()`؛ الدالة تستقبل كائن الحدث: `(event) => { event.preventDefault(); … }`.", en: "The `\"submit\"` event fires on a `<form>` when it's sent. The browser reloads the page by default, so stop it with `event.preventDefault()`; the function receives the event object: `(event) => { event.preventDefault(); … }`." },
  ],
  example: {
    code: 'const btn = document.querySelector("#btn");\nlet count = 0;\n\nbtn.addEventListener("click", () => {\n  count++;\n  btn.textContent = `Clicked ${count}`;\n});\n\nbtn.click();\nbtn.click();\nconsole.log(btn.textContent);  // Clicked 2',
    note: { ar: "زر يعدّ الضغطات؛ `btn.click()` تضغطه من الكود. جرّبه في المحرر واضغط بنفسك.", en: "A button that counts clicks; `btn.click()` presses it from code. Try it in the editor and click it yourself." },
    lang: "js",
  },
  modern: {
    old: '<button onclick="doSomething()">',
    now: 'btn.addEventListener("click", doSomething);',
    text: { ar: "كتابة JavaScript داخل HTML بـ `onclick` تخلط اللغتين. `addEventListener` تُبقي كل لغة في ملفها وتسمح بأكثر من دالة للحدث نفسه.", en: "Writing JavaScript inside HTML with `onclick` mixes the languages. `addEventListener` keeps each language in its own file and allows several functions for the same event." },
  },
  files: ["js", "html"],
  starter: { js: "", html: EVENTS_HTML },
  solution: {
    js: 'const btn = document.querySelector("#btn");\nconst out = document.querySelector("#out");\nbtn.addEventListener("click", () => {\n  out.textContent = "Clicked!";\n});\n\nconst nameInput = document.querySelector("#name");\nconst hello = document.querySelector("#hello");\nnameInput.addEventListener("input", () => {\n  hello.textContent = `Hello, ${nameInput.value}!`;\n});\n\nconst form = document.querySelector("#form");\nconst sent = document.querySelector("#sent");\nform.addEventListener("submit", (event) => {\n  event.preventDefault();\n  sent.textContent = "Sent!";\n});\n',
    html: EVENTS_HTML,
  },
  harness: wrap([
    'var txt = function (s) { var e = document.querySelector(s); return e ? e.textContent.trim() : ""; };',
    'console.log("__c__ before " + txt("#out"));',
    'var b = document.querySelector("#btn"); if (b) b.click();',
    'console.log("__c__ out " + txt("#out"));',
    'var n = document.querySelector("#name");',
    'if (n) { n.value = "Sara"; n.dispatchEvent(new Event("input", { bubbles: true })); console.log("__c__ hello1 " + txt("#hello")); n.value = "Omar"; n.dispatchEvent(new Event("input", { bubbles: true })); console.log("__c__ hello2 " + txt("#hello")); }',
    'var f = document.querySelector("#form");',
    'if (f) { f.addEventListener("submit", function (e) { console.log("__c__ prevented " + e.defaultPrevented); }); if (f.requestSubmit) f.requestSubmit(); else f.dispatchEvent(new Event("submit", { cancelable: true, bubbles: true })); }',
    'console.log("__c__ sent " + txt("#sent"));',
  ]),
  tasks: [
    { id: "click", label: { ar: "عند الضغط على `#btn` اجعل نص `#out` يساوي `Clicked!`", en: "When `#btn` is clicked, set `#out`'s text to `Clicked!`" }, test: ({ logs }) => c(logs, "out", "Clicked!") && !c(logs, "before", "Clicked!") },
    { id: "input", label: { ar: "مع حدث `input` على `#name` اعرض في `#hello` النص `Hello, ` + القيمة + `!` (مثلًا `Hello, Sara!`)", en: "On the `input` event of `#name`, show `Hello, ` + its value + `!` in `#hello` (e.g. `Hello, Sara!`)" }, test: ({ logs }) => c(logs, "hello1", "Hello, Sara!") && c(logs, "hello2", "Hello, Omar!") },
    { id: "submit", label: { ar: "مع حدث `submit` على `#form` استدعِ `event.preventDefault()` واجعل نص `#sent` يساوي `Sent!`", en: "On the `submit` event of `#form`, call `event.preventDefault()` and set `#sent`'s text to `Sent!`" }, test: ({ logs }) => c(logs, "prevented", true) && c(logs, "sent", "Sent!") },
  ],
  hints: [
    { ar: '`document.querySelector("#btn").addEventListener("click", () => { document.querySelector("#out").textContent = "Clicked!"; });`', en: '`document.querySelector("#btn").addEventListener("click", () => { document.querySelector("#out").textContent = "Clicked!"; });`' },
    { ar: 'للنموذج: `form.addEventListener("submit", (event) => { event.preventDefault(); sent.textContent = "Sent!"; });` وللحقل: `` hello.textContent = `Hello, ${nameInput.value}!`; ``', en: 'For the form: `form.addEventListener("submit", (event) => { event.preventDefault(); sent.textContent = "Sent!"; });` and for the field: `` hello.textContent = `Hello, ${nameInput.value}!`; ``' },
  ],
  deep: {
    more: [
      { icon: "🧩", ar: "يمكنك تمرير دالة لها اسم بدل دالة مكتوبة في مكانها: `btn.addEventListener(\"click\", sayHi);`. لاحظ: بلا أقواس بعد `sayHi`.", en: "You can pass a named function instead of writing one in place: `btn.addEventListener(\"click\", sayHi);`. Note: no parentheses after `sayHi`." },
      { icon: "🔕", ar: "لإيقاف الاستماع: `btn.removeEventListener(\"click\", sayHi);` بنفس الدالة. ولحدث يعمل مرة واحدة فقط: `addEventListener(\"click\", sayHi, { once: true })`.", en: "To stop listening: `btn.removeEventListener(\"click\", sayHi);` with the same function. For a one-time event: `addEventListener(\"click\", sayHi, { once: true })`." },
      { icon: "🔄", ar: "`\"input\"` يحدث مع كل حرف، أما `\"change\"` فيحدث عندما يغادر المستخدم الحقل بعد تغييره، وهو المناسب لـ `<select>` ومربعات الاختيار.", en: "`\"input\"` fires on every character, while `\"change\"` fires when the user leaves the field after changing it; it suits `<select>` and checkboxes." },
    ],
    mistakes: [
      { ar: "`addEventListener(\"click\", sayHi())` بأقواس ← تُنفَّذ الدالة فورًا مرة واحدة. مرّر `sayHi` بلا أقواس.", en: "`addEventListener(\"click\", sayHi())` with parentheses → the function runs once, right away. Pass `sayHi` without them." },
      { ar: "الاستماع لـ `submit` على الزر بدل `<form>` ← حدث `submit` يحدث على النموذج نفسه.", en: "Listening for `submit` on the button instead of the `<form>` → the `submit` event fires on the form itself." },
      { ar: "قراءة `input.value` مرة واحدة خارج الدالة ← تبقى فارغة. اقرأها **داخل** الدالة لتحصل على أحدث قيمة.", en: "Reading `input.value` once outside the function → it stays empty. Read it **inside** the function to get the latest value." },
    ],
  },
  xp: 35,
};

/* ------------------------------------------------------------------ 26 keyboard-mouse */

const KEYS_HTML = '<input id="box" placeholder="Type, then press Enter">\n<p id="last">Last key: none</p>\n<p id="msg">...</p>\n\n<div id="card">Hover me</div>\n';

export const keyboardMouse: Lesson = {
  slug: "keyboard-mouse",
  title: { ar: "أحداث لوحة المفاتيح والفأرة", en: "Keyboard and mouse events" },
  body: [
    { icon: "⌨️", ar: "حدث `\"keydown\"` يحدث عند الضغط على أي مفتاح. كائن الحدث يخبرك بالمفتاح: `event.key` يكون `\"a\"` أو `\"Enter\"` أو `\"Escape\"` أو `\"ArrowUp\"`.", en: "The `\"keydown\"` event fires when any key is pressed. The event object tells you which: `event.key` is `\"a\"`, `\"Enter\"`, `\"Escape\"` or `\"ArrowUp\"`." },
    { icon: "↩️", ar: "لتفعل شيئًا عند Enter فقط استخدم شرطًا: `if (event.key === \"Enter\") { … }`.", en: "To act on Enter only, use a condition: `if (event.key === \"Enter\") { … }`." },
    { icon: "🖱️", ar: "للفأرة: `\"mouseover\"` عندما يدخل المؤشر فوق العنصر، و `\"mouseout\"` عندما يخرج، و `\"dblclick\"` للضغطة المزدوجة.", en: "For the mouse: `\"mouseover\"` when the pointer moves onto the element, `\"mouseout\"` when it leaves, and `\"dblclick\"` for a double click." },
    { icon: "📦", ar: "كل دالة حدث تستقبل **كائن الحدث** `event`، وفيه تفاصيل ما حدث: `event.key` للمفاتيح، و `event.clientX` / `event.clientY` لمكان الفأرة.", en: "Every event function receives the **event object** `event`, which holds the details: `event.key` for keys, `event.clientX` / `event.clientY` for the mouse position." },
  ],
  example: {
    code: 'document.addEventListener("keydown", (event) => {\n  console.log("You pressed:", event.key);\n  if (event.key === "Escape") {\n    console.log("Closing!");\n  }\n});\n\ndocument.addEventListener("dblclick", (event) => {\n  console.log("Double click at", event.clientX, event.clientY);\n});',
    note: { ar: "انسخه إلى المحرر، اضغط داخل المعاينة، ثم جرّب المفاتيح والضغطة المزدوجة.", en: "Copy it into the editor, click inside the preview, then try keys and a double click." },
    lang: "none",
  },
  files: ["js", "html"],
  starter: { js: "", html: KEYS_HTML },
  solution: {
    js: 'const box = document.querySelector("#box");\nconst last = document.querySelector("#last");\nconst msg = document.querySelector("#msg");\n\nbox.addEventListener("keydown", (event) => {\n  last.textContent = `Last key: ${event.key}`;\n  if (event.key === "Enter") {\n    msg.textContent = `Saved: ${box.value}`;\n  }\n});\n\nconst card = document.querySelector("#card");\ncard.addEventListener("mouseover", () => {\n  card.classList.add("hover");\n});\ncard.addEventListener("mouseout", () => {\n  card.classList.remove("hover");\n});\n',
    html: KEYS_HTML,
  },
  harness: wrap([
    'var txt = function (s) { var e = document.querySelector(s); return e ? e.textContent.trim() : ""; };',
    'var bx = document.querySelector("#box");',
    'if (bx) { bx.value = "Hi"; bx.dispatchEvent(new KeyboardEvent("keydown", { key: "x", bubbles: true })); }',
    'console.log("__c__ last " + txt("#last")); console.log("__c__ early " + txt("#msg"));',
    'if (bx) bx.dispatchEvent(new KeyboardEvent("keydown", { key: "Enter", bubbles: true }));',
    'console.log("__c__ msg " + txt("#msg"));',
    'var cd = document.querySelector("#card");',
    'if (cd) { cd.dispatchEvent(new MouseEvent("mouseover", { bubbles: true })); cd.dispatchEvent(new MouseEvent("mouseenter")); console.log("__c__ over " + cd.classList.contains("hover")); cd.dispatchEvent(new MouseEvent("mouseout", { bubbles: true })); cd.dispatchEvent(new MouseEvent("mouseleave")); console.log("__c__ out " + cd.classList.contains("hover")); }',
  ]),
  tasks: [
    { id: "key", label: { ar: "مع `keydown` على `#box` اعرض في `#last` النص `Last key: ` + `event.key` (مثلًا `Last key: x`)", en: "On `keydown` in `#box`, show `Last key: ` + `event.key` in `#last` (e.g. `Last key: x`)" }, test: ({ logs }) => c(logs, "last", "Last key: x") },
    { id: "enter", label: { ar: "عندما يكون المفتاح `Enter` فقط، اعرض في `#msg` النص `Saved: ` + قيمة `#box` (مثلًا `Saved: Hi`)", en: "Only when the key is `Enter`, show `Saved: ` + `#box`'s value in `#msg` (e.g. `Saved: Hi`)" }, test: ({ logs }) => c(logs, "msg", "Saved: Hi") && !c(logs, "early", "Saved: Hi") },
    { id: "hover", label: { ar: "مع `mouseover` أضف الـ class `hover` إلى `#card`، ومع `mouseout` احذفها", en: "On `mouseover` add the class `hover` to `#card`, and on `mouseout` remove it" }, test: ({ logs }) => c(logs, "over", true) && c(logs, "out", false) },
  ],
  hints: [
    { ar: '`` box.addEventListener("keydown", (event) => { last.textContent = `Last key: ${event.key}`; … }); `` وداخلها `if (event.key === "Enter") { … }`', en: '`` box.addEventListener("keydown", (event) => { last.textContent = `Last key: ${event.key}`; … }); `` and inside it `if (event.key === "Enter") { … }`' },
    { ar: '`card.addEventListener("mouseover", () => { card.classList.add("hover"); });` ومثلها `mouseout` مع `remove`.', en: '`card.addEventListener("mouseover", () => { card.classList.add("hover"); });` and the same for `mouseout` with `remove`.' },
  ],
  deep: {
    more: [
      { icon: "🎹", ar: "`event.key` يعطي الحرف كما كُتب (`\"a\"` أو `\"A\"`)، أما `event.code` فيعطي مكان الزر على اللوحة (`\"KeyA\"`) أيًا كانت اللغة. وهناك `event.shiftKey` و `event.ctrlKey` لمعرفة المفاتيح المضغوطة معه.", en: "`event.key` gives the character as typed (`\"a\"` or `\"A\"`), while `event.code` gives the key's place on the keyboard (`\"KeyA\"`) whatever the language. `event.shiftKey` and `event.ctrlKey` tell you which modifiers are held." },
      { icon: "🫧", ar: "`mouseover` و `mouseout` تحدثان أيضًا عند المرور فوق **أبناء** العنصر. `mouseenter` و `mouseleave` تحدثان مرة واحدة للعنصر نفسه، وغالبًا هما الأنسب.", en: "`mouseover` and `mouseout` also fire when moving over the element's **children**. `mouseenter` and `mouseleave` fire just once for the element itself and are often the better fit." },
      { icon: "📱", ar: "على الهاتف لا توجد فأرة. أحداث **pointer** مثل `pointerdown` و `pointerover` تعمل مع الفأرة واللمس والقلم معًا.", en: "Phones have no mouse. **Pointer** events like `pointerdown` and `pointerover` work for mouse, touch and pen alike." },
    ],
    mistakes: [
      { ar: "`event.key === \"enter\"` بحرف صغير ← الاسم `\"Enter\"` بحرف كبير.", en: "`event.key === \"enter\"` in lowercase → the name is `\"Enter\"` with a capital." },
      { ar: "نسيان كتابة `event` بين القوسين ثم استخدامه ← اكتب `(event) => { … }`.", en: "Forgetting to write `event` in the parentheses, then using it → write `(event) => { … }`." },
      { ar: "الاعتماد على التمرير بالفأرة لإظهار شيء مهم ← مستخدمو اللمس ولوحة المفاتيح لن يروه. أضف طريقة بالضغط أيضًا.", en: "Relying on hover to show something important → touch and keyboard users won't see it. Offer a click way too." },
    ],
  },
  xp: 30,
};

/* ------------------------------------------------------------------ 27 delegation */

const DELEGATION_HTML = '<ul id="list">\n  <li>Milk</li>\n  <li>Bread</li>\n</ul>\n<p id="picked">Nothing yet</p>\n';

export const delegation: Lesson = {
  slug: "delegation",
  title: { ar: "انتشار الأحداث والتفويض", en: "Event bubbling and delegation" },
  body: [
    { icon: "🫧", ar: "عندما تضغط على `<li>` لا يحدث الضغط عليه وحده؛ الحدث **يصعد** بعدها إلى أبيه `<ul>` ثم `body` ثم `document`. هذا يسمى **الفقاعات** (bubbling).", en: "When you click an `<li>`, the click doesn't stay there; the event then **rises** to its parent `<ul>`, then `body`, then `document`. This is called **bubbling**." },
    { icon: "⬇️", ar: "قبل الصعود هناك مرحلة **التقاط** (capturing) ينزل فيها الحدث من `document` إلى العنصر. للاستماع فيها مرّر `{ capture: true }` (أو `true`) معاملًا ثالثًا لـ `addEventListener`؛ نادرًا ما تحتاجها.", en: "Before rising there's a **capturing** phase where the event travels down from `document` to the element. To listen there, pass `{ capture: true }` (or `true`) as the third argument of `addEventListener`; you'll rarely need it." },
    { icon: "🎯", ar: "داخل الدالة `event.target` هو العنصر الذي ضُغط عليه فعلًا، حتى لو كان المستمع على الأب. و `event.target.tagName` يخبرك بنوعه، مثل `\"LI\"`.", en: "Inside the function, `event.target` is the element that was actually clicked, even when the listener is on the parent. `event.target.tagName` tells you its kind, like `\"LI\"`." },
    { icon: "🧑‍💼", ar: "**التفويض** (delegation): مستمع واحد على `<ul>` بدل مستمع لكل `<li>`. يعمل أيضًا مع العناصر التي تُضاف **لاحقًا**، لأن ضغطاتها تصعد إلى نفس الأب.", en: "**Delegation**: one listener on the `<ul>` instead of one per `<li>`. It also works for items added **later**, because their clicks rise to the same parent." },
  ],
  example: {
    code: 'document.addEventListener("click", (event) => {\n  console.log("Clicked:", event.target.tagName);\n});\n\ndocument.body.addEventListener("click", () => {\n  console.log("1. capturing on body");\n}, { capture: true });\n\ndocument.querySelector("li").click();',
    note: { ar: "الالتقاط على `body` يعمل أولًا، ثم يصعد الحدث إلى `document` الذي يعرف ما ضُغط.", en: "Capturing on `body` runs first, then the event bubbles up to `document`, which knows what was clicked." },
    lang: "js",
  },
  files: ["js", "html"],
  starter: { js: "", html: DELEGATION_HTML },
  solution: {
    js: 'const list = document.querySelector("#list");\nconst picked = document.querySelector("#picked");\n\nlist.addEventListener("click", (event) => {\n  if (event.target.tagName === "LI") {\n    picked.textContent = event.target.textContent;\n  }\n});\n',
    html: DELEGATION_HTML,
  },
  harness: wrap([
    'var txt = function (s) { var e = document.querySelector(s); return e ? e.textContent.trim() : ""; };',
    'var ul = document.querySelector("#list");',
    'if (ul) { ul.click(); console.log("__c__ ul " + txt("#picked")); var lis = ul.querySelectorAll("li"); if (lis[1]) lis[1].click(); console.log("__c__ second " + txt("#picked")); var li = document.createElement("li"); li.textContent = "Eggs"; ul.appendChild(li); li.click(); console.log("__c__ added " + txt("#picked")); }',
  ]),
  tasks: [
    { id: "target", label: { ar: "أضف مستمع `click` **واحدًا** على `#list`، واعرض في `#picked` نص `event.target` (الضغط على `Bread` يعرض `Bread`)", en: "Add **one** `click` listener on `#list` and show `event.target`'s text in `#picked` (clicking `Bread` shows `Bread`)" }, test: ({ files, logs }) => /\.target\b/.test(js(files)) && c(logs, "second", "Bread") },
    { id: "later", label: { ar: "تأكد أنه يعمل مع عنصر `<li>` يُضاف لاحقًا (الفحص يضيف `Eggs` ويضغطه)", en: "Make sure it works for an `<li>` added later (the check adds `Eggs` and clicks it)" }, test: ({ logs }) => c(logs, "added", "Eggs") },
    { id: "only-li", label: { ar: "تجاهل الضغط على `<ul>` نفسها: غيّر النص فقط إذا كان `event.target.tagName === \"LI\"`", en: "Ignore clicks on the `<ul>` itself: only change the text when `event.target.tagName === \"LI\"`" }, test: ({ logs }) => c(logs, "ul", "Nothing yet") && c(logs, "added", "Eggs") },
  ],
  hints: [
    { ar: '`list.addEventListener("click", (event) => { picked.textContent = event.target.textContent; });`', en: '`list.addEventListener("click", (event) => { picked.textContent = event.target.textContent; });`' },
    { ar: 'ضع السطر داخل شرط: `if (event.target.tagName === "LI") { picked.textContent = event.target.textContent; }`', en: 'Put that line inside a condition: `if (event.target.tagName === "LI") { picked.textContent = event.target.textContent; }`' },
  ],
  deep: {
    more: [
      { icon: "✋", ar: "`event.stopPropagation()` يوقف صعود الحدث فلا يصل إلى الآباء. استخدمه بحذر: قد يعطّل مستمعات أخرى تنتظر هذا الحدث، مثل إغلاق قائمة عند الضغط خارجها.", en: "`event.stopPropagation()` stops the event from rising, so parents never get it. Use it carefully: it can break other listeners waiting for that event, like closing a menu on an outside click." },
      { icon: "🪝", ar: "إذا كان داخل `<li>` وسم آخر مثل `<strong>` يصبح `event.target` هو `<strong>`. الحل: `event.target.closest(\"li\")` يصعد حتى يجد أقرب `<li>`.", en: "If the `<li>` contains another tag like `<strong>`, `event.target` becomes that `<strong>`. The fix: `event.target.closest(\"li\")` climbs up to the nearest `<li>`." },
      { icon: "🧭", ar: "`event.currentTarget` هو العنصر الذي عليه المستمع (هنا `<ul>`)، بينما `event.target` هو ما ضُغط فعلًا.", en: "`event.currentTarget` is the element the listener is on (here the `<ul>`), while `event.target` is what was actually clicked." },
    ],
    mistakes: [
      { ar: "إضافة مستمع لكل `<li>` بحلقة ← العناصر الجديدة لا تعمل. ضع مستمعًا واحدًا على الأب.", en: "Adding a listener to every `<li>` in a loop → new items don't work. Put one listener on the parent." },
      { ar: "مقارنة `tagName === \"li\"` بحروف صغيرة ← `tagName` بحروف كبيرة: `\"LI\"`. أو استخدم `event.target.matches(\"li\")`.", en: "Comparing `tagName === \"li\"` in lowercase → `tagName` is uppercase: `\"LI\"`. Or use `event.target.matches(\"li\")`." },
      { ar: "الخلط بين `stopPropagation` و `preventDefault` ← الأول يوقف الصعود، والثاني يمنع سلوك المتصفح (مثل إعادة التحميل).", en: "Mixing up `stopPropagation` and `preventDefault` → the first stops the rising, the second blocks the browser's default action (like reloading)." },
    ],
  },
  xp: 30,
};

/* ------------------------------------------------------------------ 28 forms-validation */

const FORM_HTML =
  '<form id="signup">\n  <input id="name" placeholder="Name">\n  <input id="email" placeholder="Email">\n  <button>Sign up</button>\n</form>\n<p id="error"></p>\n<p id="ok"></p>\n';

export const formsValidation: Lesson = {
  slug: "forms-validation",
  title: { ar: "النماذج والتحقق من المدخلات", en: "Forms and validating input" },
  body: [
    { icon: "📝", ar: "عند إرسال النموذج (`submit`) أوقف إعادة التحميل بـ `event.preventDefault()`، ثم اقرأ كل حقل بـ `.value`. نظّفه بـ `trim()` لإزالة المسافات: `const name = nameInput.value.trim();`.", en: "When the form is sent (`submit`), stop the reload with `event.preventDefault()`, then read each field with `.value`. Clean it with `trim()` to drop spaces: `const name = nameInput.value.trim();`." },
    { icon: "✅", ar: "ثم افحص القيم بشروط بسيطة: فارغ؟ `name === \"\"`. قصير؟ `name.length < 2`. بريد بلا `@`؟ `!email.includes(\"@\")`.", en: "Then check the values with simple conditions: empty? `name === \"\"`. Too short? `name.length < 2`. Email without `@`? `!email.includes(\"@\")`." },
    { icon: "🚨", ar: "إذا فشل فحص، اكتب رسالة واضحة في عنصر مثل `#error` وتوقف بـ `return`. وإذا نجحت كل الفحوص امسح الخطأ (`error.textContent = \"\"`) واعرض رسالة النجاح.", en: "If a check fails, write a clear message in an element like `#error` and stop with `return`. If every check passes, clear the error (`error.textContent = \"\"`) and show the success message." },
  ],
  example: {
    code: 'function checkAge(text) {\n  const age = Number(text.trim());\n  if (text.trim() === "") return "Age is required";\n  if (!Number.isInteger(age)) return "Age must be a number";\n  if (age < 13) return "Too young";\n  return "OK";\n}\n\nconsole.log(checkAge("  "));\nconsole.log(checkAge("abc"));\nconsole.log(checkAge(" 20 "));',
    note: { ar: "كل فحص يعيد رسالته ويتوقف؛ إذا نجح كل شيء نصل إلى `OK`.", en: "Each check returns its message and stops; if everything passes we reach `OK`." },
    lang: "js",
  },
  files: ["js", "html"],
  starter: { js: "", html: FORM_HTML },
  solution: {
    js: 'const form = document.querySelector("#signup");\nconst nameInput = document.querySelector("#name");\nconst emailInput = document.querySelector("#email");\nconst error = document.querySelector("#error");\nconst ok = document.querySelector("#ok");\n\nform.addEventListener("submit", (event) => {\n  event.preventDefault();\n  const name = nameInput.value.trim();\n  const email = emailInput.value.trim();\n  ok.textContent = "";\n\n  if (name === "") {\n    error.textContent = "Name is required";\n    return;\n  }\n  if (!email.includes("@")) {\n    error.textContent = "Email is not valid";\n    return;\n  }\n\n  error.textContent = "";\n  ok.textContent = `Welcome, ${name}!`;\n});\n',
    html: FORM_HTML,
  },
  harness: wrap([
    'var txt = function (s) { var e = document.querySelector(s); return e ? e.textContent.trim() : ""; };',
    'var f = document.querySelector("#signup"); var nm = document.querySelector("#name"); var em = document.querySelector("#email");',
    'if (f) f.addEventListener("submit", function (e) { console.log("__c__ prevented " + e.defaultPrevented); });',
    'var send = function (step, name, email) { if (!f || !nm || !em) return; nm.value = name; em.value = email; if (f.requestSubmit) f.requestSubmit(); else f.dispatchEvent(new Event("submit", { cancelable: true, bubbles: true })); console.log("__c__ error" + step + " " + txt("#error")); console.log("__c__ ok" + step + " " + txt("#ok")); };',
    'send(1, "   ", "sara@mail.com"); send(2, "Sara", "sara.mail.com"); send(3, "  Sara  ", "sara@mail.com");',
  ]),
  tasks: [
    { id: "empty", label: { ar: "مع `submit` على `#signup` استدعِ `event.preventDefault()`، وإذا كان الاسم بعد `trim()` فارغًا اكتب في `#error` النص `Name is required`", en: "On `#signup`'s `submit`, call `event.preventDefault()`, and if the name is empty after `trim()`, write `Name is required` in `#error`" }, test: ({ logs }) => c(logs, "prevented", true) && c(logs, "error1", "Name is required") },
    { id: "email", label: { ar: "إذا لم يحتوِ البريد على `@` اكتب في `#error` النص `Email is not valid`", en: "If the email doesn't contain `@`, write `Email is not valid` in `#error`" }, test: ({ logs }) => c(logs, "error2", "Email is not valid") },
    { id: "valid", label: { ar: "إذا كان كل شيء صحيحًا امسح `#error` واعرض في `#ok` النص `Welcome, ` + الاسم بعد `trim()` + `!` (مثلًا `Welcome, Sara!`)", en: "When everything is valid, clear `#error` and show `Welcome, ` + the trimmed name + `!` in `#ok` (e.g. `Welcome, Sara!`)" }, test: ({ logs }) => c(logs, "error3", "") && c(logs, "ok3", "Welcome, Sara!") && !c(logs, "ok1", "Welcome, !") },
  ],
  hints: [
    { ar: 'داخل الدالة: `event.preventDefault(); const name = nameInput.value.trim();` ثم `if (name === "") { error.textContent = "Name is required"; return; }`', en: 'Inside the function: `event.preventDefault(); const name = nameInput.value.trim();` then `if (name === "") { error.textContent = "Name is required"; return; }`' },
    { ar: '`if (!email.includes("@")) { error.textContent = "Email is not valid"; return; }` ثم `error.textContent = "";` و `` ok.textContent = `Welcome, ${name}!`; ``', en: '`if (!email.includes("@")) { error.textContent = "Email is not valid"; return; }` then `error.textContent = "";` and `` ok.textContent = `Welcome, ${name}!`; ``' },
  ],
  deep: {
    more: [
      { icon: "🧰", ar: "HTML نفسها تتحقق أيضًا: `required` و `type=\"email\"` و `minlength=\"2\"`. اجمعها مع فحوص JavaScript لرسائل أوضح.", en: "HTML can validate too: `required`, `type=\"email\"` and `minlength=\"2\"`. Combine them with JavaScript checks for clearer messages." },
      { icon: "🔒", ar: "فحص المتصفح لراحة المستخدم فقط؛ أي شخص يستطيع تجاوزه. **الخادم يجب أن يتحقق مرة أخرى** قبل حفظ أي شيء.", en: "Browser checks are only for the user's comfort; anyone can skip them. **The server must check again** before saving anything." },
      { icon: "♿", ar: "اربط رسالة الخطأ بالحقل بـ `aria-describedby=\"error\"`، وضع على `#error` الخاصية `role=\"alert\"` ليقرأها قارئ الشاشة فور ظهورها.", en: "Link the error to its field with `aria-describedby=\"error\"`, and give `#error` `role=\"alert\"` so screen readers announce it as soon as it appears." },
    ],
    mistakes: [
      { ar: "نسيان `return` بعد رسالة الخطأ ← يكمل الكود ويعرض رسالة النجاح أيضًا.", en: "Forgetting `return` after the error message → the code carries on and shows the success message too." },
      { ar: "فحص `name === \"\"` دون `trim()` ← اسم من مسافات فقط يمر كأنه صحيح.", en: "Checking `name === \"\"` without `trim()` → a name made only of spaces passes as valid." },
      { ar: "نسيان مسح رسالة الخطأ القديمة ← يبقى الخطأ ظاهرًا بعد تصحيح المدخلات.", en: "Forgetting to clear the old error → it stays on screen after the input is fixed." },
    ],
  },
  xp: 35,
};

/* ------------------------------------------------------------------ 28b browser-window */

const BOM_HTML = '<p id="size">Size: ?</p>\n';

export const browserWindow: Lesson = {
  slug: "browser-window",
  title: { ar: "نافذة المتصفح BOM: window و location", en: "The browser window (BOM): window and location" },
  body: [
    { icon: "🪟", ar: "**DOM** هو الصفحة نفسها. أما **BOM** (Browser Object Model) فهو المتصفح حول الصفحة، ويبدأ من الكائن `window`. حتى `document` و `console` خصائص في `window`.", en: "The **DOM** is the page itself. The **BOM** (Browser Object Model) is the browser around the page, starting from the `window` object. Even `document` and `console` live on `window`." },
    { icon: "📐", ar: "`window.innerWidth` و `window.innerHeight` عرض النافذة وارتفاعها بالبكسل. وحدث `\"resize\"` يخبرك كلما تغيّر حجمها: `window.addEventListener(\"resize\", () => { … })`.", en: "`window.innerWidth` and `window.innerHeight` are the window's width and height in pixels. The `\"resize\"` event tells you whenever the size changes: `window.addEventListener(\"resize\", () => { … })`." },
    { icon: "📍", ar: "`location.href` عنوان الصفحة كاملًا، و `location.pathname` الجزء بعد اسم الموقع مثل `/about`. و `history.back()` يرجع للصفحة السابقة مثل زر الرجوع.", en: "`location.href` is the full page address, and `location.pathname` is the part after the site name, like `/about`. `history.back()` goes to the previous page, like the Back button." },
    { icon: "🌐", ar: "`navigator` يصف المتصفح نفسه: `navigator.language` لغة المستخدم مثل `\"ar\"` أو `\"en-US\"`، مفيدة لاختيار لغة موقعك تلقائيًا.", en: "`navigator` describes the browser itself: `navigator.language` is the user's language, like `\"ar\"` or `\"en-US\"`, handy for picking your site's language automatically." },
  ],
  example: {
    code: 'console.log(window.innerWidth, window.innerHeight);\nconsole.log(location.href);\nconsole.log(location.pathname);\nconsole.log(navigator.language);\n\nwindow.addEventListener("resize", () => {\n  console.log("New width:", window.innerWidth);\n});',
    note: { ar: "في المحرر قد يكون العنوان `about:srcdoc`؛ على موقع حقيقي ترى رابطًا عاديًا.", en: "In the editor the address may be `about:srcdoc`; on a real site you'd see a normal link." },
    lang: "js",
  },
  files: ["js", "html"],
  starter: { js: "", html: BOM_HTML },
  solution: {
    js: 'console.log(window.innerWidth);\nconsole.log(window.innerHeight);\n\nconsole.log(location.href);\nconsole.log(navigator.language);\n\nconst size = document.querySelector("#size");\nwindow.addEventListener("resize", () => {\n  size.textContent = `Size: ${window.innerWidth}`;\n});\n',
    html: BOM_HTML,
  },
  harness: wrap([
    'console.log("__c__ href " + location.href); console.log("__c__ lang " + navigator.language);',
    'window.dispatchEvent(new Event("resize"));',
    'var sz = document.querySelector("#size"); console.log("__c__ size " + (sz ? sz.textContent.trim() : "")); console.log("__c__ w " + window.innerWidth);',
  ]),
  tasks: [
    { id: "size", label: { ar: "اطبع `window.innerWidth` ثم `window.innerHeight` (رقمان)", en: "Print `window.innerWidth`, then `window.innerHeight` (two numbers)" }, test: ({ files, logs }) => /innerWidth/.test(js(files)) && /innerHeight/.test(js(files)) && logs.filter((l) => /^\d+(\.\d+)?$/.test(l.trim())).length >= 2 },
    { id: "href", label: { ar: "اطبع عنوان الصفحة `location.href`", en: "Print the page address `location.href`" }, test: ({ logs }) => { const href = marker(logs, "href"); return href !== null && href !== "" && logs.some((l) => !l.startsWith("__") && l.trim() === href.trim()); } },
    { id: "lang", label: { ar: "اطبع لغة المتصفح `navigator.language`", en: "Print the browser's language `navigator.language`" }, test: ({ logs }) => { const lang = marker(logs, "lang"); return lang !== null && lang !== "" && logs.some((l) => !l.startsWith("__") && l.trim() === lang.trim()); } },
    { id: "resize", label: { ar: "مع حدث `resize` على `window` اعرض في `#size` النص `Size: ` + `window.innerWidth` (مثلًا `Size: 800`)", en: "On `window`'s `resize` event, show `Size: ` + `window.innerWidth` in `#size` (e.g. `Size: 800`)" }, test: ({ files, logs }) => { const w = marker(logs, "w"); return /resize/.test(js(files)) && w !== null && c(logs, "size", `Size: ${w}`); } },
  ],
  hints: [
    { ar: "`console.log(window.innerWidth);` و `console.log(window.innerHeight);` ثم `console.log(location.href);` و `console.log(navigator.language);`", en: "`console.log(window.innerWidth);` and `console.log(window.innerHeight);` then `console.log(location.href);` and `console.log(navigator.language);`" },
    { ar: '`` window.addEventListener("resize", () => { document.querySelector("#size").textContent = `Size: ${window.innerWidth}`; }); ``', en: '`` window.addEventListener("resize", () => { document.querySelector("#size").textContent = `Size: ${window.innerWidth}`; }); ``' },
  ],
  deep: {
    more: [
      { icon: "🔗", ar: "`location.href = \"https://example.com\"` ينقل المستخدم إلى صفحة أخرى، و `location.reload()` يعيد تحميل الصفحة. و `location.search` هو الجزء بعد `?` في الرابط.", en: "`location.href = \"https://example.com\"` sends the user to another page, and `location.reload()` reloads it. `location.search` is the part after `?` in the link." },
      { icon: "🕰️", ar: "`history.back()` و `history.forward()` تتنقلان في سجل التبويب. ولا تجرّبهما داخل المحرر هنا؛ جرّبهما في صفحتك الخاصة.", en: "`history.back()` and `history.forward()` move through the tab's history. Don't try them inside this editor; try them on your own page." },
      { icon: "💬", ar: "`alert(\"Hi\")` و `confirm(\"Sure?\")` و `prompt(\"Name?\")` نوافذ جاهزة من `window`، لكنها توقف الصفحة وشكلها قديم؛ المواقع الحديثة تصنع نوافذها بـ HTML.", en: "`alert(\"Hi\")`, `confirm(\"Sure?\")` and `prompt(\"Name?\")` are ready-made `window` dialogs, but they freeze the page and look dated; modern sites build their own with HTML." },
    ],
    mistakes: [
      { ar: "استدعاء `innerWidth()` بأقواس ← هي خاصية وليست دالة. اكتب `window.innerWidth`.", en: "Calling `innerWidth()` with parentheses → it's a property, not a function. Write `window.innerWidth`." },
      { ar: "قراءة العرض مرة واحدة فقط ثم توقّع تغيّره ← اقرأه **داخل** مستمع `resize`.", en: "Reading the width once and expecting it to change → read it **inside** the `resize` listener." },
      { ar: "الاستماع لـ `resize` على `document` ← هذا الحدث يحدث على `window`.", en: "Listening for `resize` on `document` → that event fires on `window`." },
    ],
  },
  xp: 30,
};

/* ------------------------------------------------------------------ 29 web-storage */

const STORAGE_HTML = '<h1>My page</h1>\n<p id="visits">Visits: 0</p>\n';

export const webStorage: Lesson = {
  slug: "web-storage",
  title: { ar: "الحفظ في المتصفح: localStorage والكوكيز", en: "Saving in the browser: localStorage and cookies" },
  body: [
    { icon: "💾", ar: "المتغيرات تُمسح عند إعادة تحميل الصفحة. لحفظ أشياء صغيرة على جهاز المستخدم (الثيم، اللغة، عدد الزيارات) استخدم **localStorage**؛ يبقى حتى بعد إغلاق المتصفح.", en: "Variables vanish when the page reloads. To keep small things on the user's device (theme, language, visit count), use **localStorage**; it stays even after the browser closes." },
    { icon: "🔑", ar: "مفاتيح وقيم نصية: `localStorage.setItem(\"theme\", \"dark\")` للحفظ، و `localStorage.getItem(\"theme\")` للقراءة (تُرجع `null` إن لم يوجد)، و `localStorage.removeItem(\"theme\")` للحذف.", en: "Text keys and values: `localStorage.setItem(\"theme\", \"dark\")` to save, `localStorage.getItem(\"theme\")` to read (it returns `null` if missing), and `localStorage.removeItem(\"theme\")` to delete." },
    { icon: "🔢", ar: "القيم دائمًا نصوص. للأرقام: `Number(localStorage.getItem(\"visits\"))` (و `Number(null)` يساوي `0`). وللكائنات: احفظ `JSON.stringify(obj)` واقرأ بـ `JSON.parse(text)`.", en: "Values are always text. For numbers: `Number(localStorage.getItem(\"visits\"))` (and `Number(null)` is `0`). For objects: save `JSON.stringify(obj)` and read it with `JSON.parse(text)`." },
    { icon: "🍪", ar: "`sessionStorage` له نفس الدوال لكنه يُمسح عند إغلاق التبويب. أما **الكوكيز** فنصوص صغيرة تُرسل للخادم مع كل طلب: `document.cookie = \"lang=ar; max-age=86400\";` تحفظ كوكي ليوم واحد، و `document.cookie` تقرأ كل الكوكيز في نص واحد.", en: "`sessionStorage` has the same methods but clears when the tab closes. **Cookies** are small texts sent to the server with every request: `document.cookie = \"lang=ar; max-age=86400\";` saves one for a day, and `document.cookie` reads all of them as one text." },
  ],
  example: {
    code: 'const saved = localStorage.getItem("profile");\nconsole.log("Before:", saved);\n\nlocalStorage.setItem("profile", JSON.stringify({ name: "Sara", level: 3 }));\nconst profile = JSON.parse(localStorage.getItem("profile"));\nconsole.log("After:", profile.name, profile.level);',
    note: { ar: "حفظ كائن وقراءته بـ JSON. هنا في المحرر يبدأ التخزين فارغًا مع كل تشغيل.", en: "Saving and reading an object with JSON. In this editor storage starts empty on every run." },
    lang: "js",
  },
  files: ["js", "html"],
  starter: { js: 'localStorage.setItem("old", "yes");\n\n', html: STORAGE_HTML },
  solution: {
    js: 'localStorage.setItem("old", "yes");\n\nconst visits = Number(localStorage.getItem("visits")) + 1;\nlocalStorage.setItem("visits", visits);\ndocument.querySelector("#visits").textContent = `Visits: ${visits}`;\n\nconst user = { name: "Sara", level: 3 };\nlocalStorage.setItem("user", JSON.stringify(user));\n\nlocalStorage.removeItem("old");\n',
    html: STORAGE_HTML,
  },
  harness: wrap([
    'console.log("__c__ visits " + localStorage.getItem("visits"));',
    'var vp = document.querySelector("#visits"); console.log("__c__ shown " + (vp ? vp.textContent.trim() : ""));',
    'var un = "none"; try { un = JSON.parse(localStorage.getItem("user")).name; } catch (e) { un = "bad"; } console.log("__c__ user " + un);',
    'console.log("__c__ old " + localStorage.getItem("old"));',
  ]),
  tasks: [
    { id: "count", label: { ar: "اقرأ `visits` بـ `getItem` وحوّله بـ `Number`، زِده واحدًا، واحفظه بـ `setItem(\"visits\", …)`", en: "Read `visits` with `getItem`, turn it into a number with `Number`, add one, and save it with `setItem(\"visits\", …)`" }, test: ({ files, logs }) => /getItem\(\s*["'`]visits["'`]\s*\)/.test(js(files)) && c(logs, "visits", 1) },
    { id: "show", label: { ar: "اعرض العدد في `#visits` بالشكل `Visits: 1`", en: "Show the count in `#visits` as `Visits: 1`" }, test: ({ logs }) => c(logs, "shown", "Visits: 1") },
    { id: "object", label: { ar: "احفظ الكائن `{ name: \"Sara\", level: 3 }` في المفتاح `user` بـ `JSON.stringify`", en: "Save the object `{ name: \"Sara\", level: 3 }` under the key `user` with `JSON.stringify`" }, test: ({ logs }) => c(logs, "user", "Sara") },
    { id: "remove", label: { ar: "احذف المفتاح `old` بـ `removeItem`", en: "Delete the key `old` with `removeItem`" }, test: ({ logs }) => c(logs, "old", "null") },
  ],
  hints: [
    { ar: '`const visits = Number(localStorage.getItem("visits")) + 1;` ثم `localStorage.setItem("visits", visits);` و `` document.querySelector("#visits").textContent = `Visits: ${visits}`; ``', en: '`const visits = Number(localStorage.getItem("visits")) + 1;` then `localStorage.setItem("visits", visits);` and `` document.querySelector("#visits").textContent = `Visits: ${visits}`; ``' },
    { ar: '`localStorage.setItem("user", JSON.stringify({ name: "Sara", level: 3 }));` ثم `localStorage.removeItem("old");`', en: '`localStorage.setItem("user", JSON.stringify({ name: "Sara", level: 3 }));` then `localStorage.removeItem("old");`' },
  ],
  deep: {
    more: [
      { icon: "🍪", ar: "الكوكيز تُحفظ بإعدادات بعد `;`: `max-age` بالثواني، و `path=/` لكل الموقع، و `Secure` لـ HTTPS فقط. ولحذف كوكي اجعل `max-age=0`. داخل المحرر هنا الكوكيز و `sessionStorage` محجوبة، فجرّبها في صفحتك الخاصة.", en: "Cookies take settings after `;`: `max-age` in seconds, `path=/` for the whole site, and `Secure` for HTTPS only. To delete one, set `max-age=0`. In this editor cookies and `sessionStorage` are blocked, so try them on your own page." },
      { icon: "🔐", ar: "localStorage يقرؤه أي سكربت على صفحتك، لذلك **لا تحفظ فيه كلمات سر أو رموز دخول**؛ ثغرة XSS واحدة تكشفها. رموز الدخول مكانها كوكي `HttpOnly` يضعه الخادم ولا تقرؤه JavaScript.", en: "Any script on your page can read localStorage, so **never keep passwords or login tokens there**; one XSS hole exposes them. Login tokens belong in an `HttpOnly` cookie set by the server, which JavaScript can't read." },
      { icon: "📏", ar: "السعة حوالي 5 ميغابايت لكل موقع، والكوكي حوالي 4 كيلوبايت فقط. للبيانات الكبيرة استخدم **IndexedDB**.", en: "The quota is about 5 MB per site, and a cookie only about 4 KB. For big data use **IndexedDB**." },
    ],
    mistakes: [
      { ar: "`localStorage.setItem(\"user\", user)` يحفظ `[object Object]` ← استخدم `JSON.stringify(user)`.", en: "`localStorage.setItem(\"user\", user)` stores `[object Object]` → use `JSON.stringify(user)`." },
      { ar: "`getItem(\"visits\") + 1` يعطي `\"01\"` لأن القيمة نص ← حوّلها بـ `Number(...)` أولًا.", en: "`getItem(\"visits\") + 1` gives `\"01\"` because the value is text → convert with `Number(...)` first." },
      { ar: "`document.cookie = \"a=1; b=2\"` لحفظ كوكيين ← كل سطر يحفظ كوكي واحدًا فقط. اكتب سطرًا لكل كوكي.", en: "`document.cookie = \"a=1; b=2\"` to save two cookies → each assignment saves only one. Write one line per cookie." },
    ],
  },
  xp: 30,
};

/* ------------------------------------------------------------------ challenges & exam */

export const challengesP3: Challenge[] = [
  { id: "js-dom-title", after: "javascript/dom-intro", prompt: { ar: "غيّر اسم الصفحة في التبويب", en: "Change the page name on the tab" }, code: '_.title = "Shop";', answers: ["document"], chips: ["document", "window.page", "html", "body"] },
  { id: "js-dom-count", after: "javascript/dom-intro", prompt: { ar: "اطبع عدد كل عناصر li", en: "Print how many li elements there are" }, code: 'console.log(document._("li")._);', answers: ["querySelectorAll", "length"], chips: ["querySelectorAll", "length", "querySelector", "size", "count"] },
  { id: "js-dom-select", after: "javascript/dom-select", prompt: { ar: "اجلب العنصر الذي id الخاص به title وغيّر نصه", en: "Grab the element with id title and change its text" }, code: 'const title = document.querySelector("_title");\ntitle._ = "Hi";', answers: ["#", "textContent"], chips: ["#", ".", "textContent", "innerText", "value"] },
  { id: "js-dom-safe", after: "javascript/dom-select", prompt: { ar: "اعرض ما كتبه المستخدم بأمان", en: "Show what the user typed, safely" }, code: "message._ = userText;", answers: ["textContent"], chips: ["textContent", "innerHTML", "html"] },
  { id: "js-dom-style", after: "javascript/dom-style", prompt: { ar: "اجعل الخلفية زرقاء", en: "Make the background blue" }, code: 'box.style._ = "blue";', answers: ["backgroundColor"], chips: ["backgroundColor", "background-color", "bgColor", "color"] },
  { id: "js-dom-toggle", after: "javascript/dom-style", prompt: { ar: "بدّل الـ class dark ثم اسأل هل هي موجودة", en: "Toggle the dark class, then ask if it's there" }, code: 'body.classList._("dark");\nconsole.log(body.classList._("dark"));', answers: ["toggle", "contains"], chips: ["toggle", "contains", "add", "has", "switch"] },
  { id: "js-dom-create", after: "javascript/dom-create", prompt: { ar: "اصنع عنصر li وأضفه للقائمة", en: "Create an li and add it to the list" }, code: 'const li = document._("li");\nli.textContent = "Milk";\nlist._(li);', answers: ["createElement", "append"], chips: ["createElement", "append", "newElement", "add", "push"] },
  { id: "js-dom-remove", after: "javascript/dom-create", prompt: { ar: "احذف الإعلان من الصفحة", en: "Delete the ad from the page" }, code: 'document.querySelector("#ad")._();', answers: ["remove"], chips: ["remove", "delete", "pop", "hide"] },
  { id: "js-dom-click", after: "javascript/dom-events", prompt: { ar: "نفّذ دالة عند الضغط على الزر", en: "Run a function when the button is clicked" }, code: 'btn._("_", () => {\n  console.log("Hi");\n});', answers: ["addEventListener", "click"], chips: ["addEventListener", "click", "onClick", "press", "on"] },
  { id: "js-dom-submit", after: "javascript/dom-events", prompt: { ar: "أوقف إعادة تحميل الصفحة عند الإرسال", en: "Stop the page reloading on submit" }, code: 'form.addEventListener("_", (event) => {\n  event._();\n});', answers: ["submit", "preventDefault"], chips: ["submit", "preventDefault", "click", "stop", "stopPropagation"] },
  { id: "js-dom-enter", after: "javascript/keyboard-mouse", prompt: { ar: "افعل شيئًا عند الضغط على Enter", en: "Do something when Enter is pressed" }, code: 'input.addEventListener("_", (event) => {\n  if (event._ === "Enter") {\n    save();\n  }\n});', answers: ["keydown", "key"], chips: ["keydown", "key", "keypress", "code", "value"] },
  { id: "js-dom-hover", after: "javascript/keyboard-mouse", prompt: { ar: "أضف class عندما يمر المؤشر فوق البطاقة", en: "Add a class when the pointer moves onto the card" }, code: 'card.addEventListener("_", () => {\n  card.classList.add("hover");\n});', answers: ["mouseover"], chips: ["mouseover", "hover", "mouseout", "click"] },
  { id: "js-dom-delegate", after: "javascript/delegation", prompt: { ar: "مستمع واحد على القائمة يعرف أي li ضُغط", en: "One listener on the list knows which li was clicked" }, code: 'list.addEventListener("click", (event) => {\n  if (event._.tagName === "_") {\n    console.log(event.target.textContent);\n  }\n});', answers: ["target", "LI"], chips: ["target", "LI", "li", "this", "currentTarget"] },
  { id: "js-dom-stop", after: "javascript/delegation", prompt: { ar: "أوقف صعود الحدث إلى الآباء", en: "Stop the event from rising to the parents" }, code: "event._();", answers: ["stopPropagation"], chips: ["stopPropagation", "preventDefault", "stop", "cancel"] },
  { id: "js-form-check", after: "javascript/forms-validation", prompt: { ar: "نظّف الاسم وافحص البريد", en: "Clean the name and check the email" }, code: 'const name = nameInput.value._();\nif (!email._("@")) {\n  error.textContent = "Email is not valid";\n  _;\n}', answers: ["trim", "includes", "return"], chips: ["trim", "includes", "return", "has", "break"] },
  { id: "js-bom-width", after: "javascript/browser-window", prompt: { ar: "اقرأ عرض النافذة عند تغيّر حجمها", en: "Read the window's width when it's resized" }, code: 'window.addEventListener("_", () => {\n  console.log(window._);\n});', answers: ["resize", "innerWidth"], chips: ["resize", "innerWidth", "width", "change", "screen"] },
  { id: "js-bom-location", after: "javascript/browser-window", prompt: { ar: "اطبع عنوان الصفحة ولغة المتصفح", en: "Print the page address and the browser's language" }, code: "console.log(_.href);\nconsole.log(_.language);", answers: ["location", "navigator"], chips: ["location", "navigator", "document", "window.url"] },
  { id: "js-storage-save", after: "javascript/web-storage", prompt: { ar: "احفظ كائنًا ثم اقرأه", en: "Save an object, then read it" }, code: 'localStorage._("user", JSON.stringify(user));\nconst saved = JSON._(localStorage._("user"));', answers: ["setItem", "parse", "getItem"], chips: ["setItem", "parse", "getItem", "save", "read"] },
  { id: "js-storage-cookie", after: "javascript/web-storage", prompt: { ar: "احفظ كوكي لمدة يوم", en: "Save a cookie for one day" }, code: 'document._ = "lang=ar; _=86400";', answers: ["cookie", "max-age"], chips: ["cookie", "max-age", "cookies", "expires-in"] },
];

export const examP3: Question[] = [
  {
    id: "jx-dom-intro",
    prompt: { ar: "ما هو DOM؟", en: "What is the DOM?" },
    options: [
      { ar: "شجرة العناصر التي يبنيها المتصفح من HTML وتتعامل معها JavaScript", en: "The tree of elements the browser builds from HTML, which JavaScript works with" },
      { ar: "ملف HTML نفسه على القرص", en: "The HTML file itself on disk" },
      { ar: "مكتبة يجب تثبيتها", en: "A library you must install" },
    ],
    answer: 0,
  },
  {
    id: "jx-dom-select",
    prompt: { ar: "أيهما أكثر أمانًا لعرض نص كتبه المستخدم؟", en: "Which is safer for showing text the user typed?" },
    options: [
      { ar: "`innerHTML`", en: "`innerHTML`" },
      { ar: "`textContent`", en: "`textContent`" },
      { ar: "كلاهما متماثلان", en: "Both are the same" },
    ],
    answer: 1,
  },
  {
    id: "jx-dom-style",
    prompt: { ar: "كيف تغيّر `font-size` بـ JavaScript؟", en: "How do you change `font-size` with JavaScript?" },
    options: [
      { ar: "`el.style.font-size = \"20px\"`", en: "`el.style.font-size = \"20px\"`" },
      { ar: "`el.style.fontSize = 20`", en: "`el.style.fontSize = 20`" },
      { ar: "`el.style.fontSize = \"20px\"`", en: "`el.style.fontSize = \"20px\"`" },
    ],
    answer: 2,
  },
  {
    id: "jx-dom-create",
    prompt: { ar: "صنعت عنصرًا بـ `createElement` لكنه لا يظهر. لماذا؟", en: "You made an element with `createElement` but it doesn't show. Why?" },
    options: [
      { ar: "لم تضفه للصفحة بـ `append`", en: "You didn't add it to the page with `append`" },
      { ar: "`createElement` لا تعمل مع `li`", en: "`createElement` doesn't work with `li`" },
      { ar: "يجب إعادة تحميل الصفحة", en: "You must reload the page" },
    ],
    answer: 0,
  },
  {
    id: "jx-dom-events",
    prompt: { ar: "ماذا يفعل `event.preventDefault()` داخل مستمع `submit`؟", en: "What does `event.preventDefault()` do inside a `submit` listener?" },
    options: [
      { ar: "يحذف النموذج", en: "Deletes the form" },
      { ar: "يمنع المتصفح من إعادة تحميل الصفحة", en: "Stops the browser from reloading the page" },
      { ar: "يمسح الحقول", en: "Clears the fields" },
    ],
    answer: 1,
  },
  {
    id: "jx-keyboard-mouse",
    prompt: { ar: "كيف تعرف أن المفتاح المضغوط هو Enter؟", en: "How do you know the pressed key is Enter?" },
    options: [
      { ar: "`event.key === \"Enter\"`", en: "`event.key === \"Enter\"`" },
      { ar: "`event.value === \"enter\"`", en: "`event.value === \"enter\"`" },
      { ar: "`key.isEnter()`", en: "`key.isEnter()`" },
    ],
    answer: 0,
  },
  {
    id: "jx-delegation",
    prompt: { ar: "لماذا يعمل مستمع واحد على `<ul>` مع عناصر `<li>` تُضاف لاحقًا؟", en: "Why does one listener on a `<ul>` work for `<li>` items added later?" },
    options: [
      { ar: "لأن المتصفح ينسخ المستمع لكل عنصر جديد", en: "Because the browser copies the listener to every new item" },
      { ar: "لأن الضغطة تصعد (bubbling) من `<li>` إلى أبيها `<ul>`", en: "Because the click bubbles up from the `<li>` to its parent `<ul>`" },
      { ar: "لا يعمل إلا مع العناصر القديمة", en: "It only works for the old items" },
    ],
    answer: 1,
  },
  {
    id: "jx-forms-validation",
    prompt: { ar: "اسم مكوّن من مسافات فقط مرّ كأنه صحيح. ما الذي نسيته؟", en: "A name made only of spaces passed as valid. What did you forget?" },
    options: [
      { ar: "`trim()` قبل الفحص", en: "`trim()` before checking" },
      { ar: "`toUpperCase()`", en: "`toUpperCase()`" },
      { ar: "`JSON.parse()`", en: "`JSON.parse()`" },
    ],
    answer: 0,
  },
  {
    id: "jx-browser-window",
    prompt: { ar: "أيها يعطي لغة متصفح المستخدم؟", en: "Which gives the user's browser language?" },
    options: [
      { ar: "`location.language`", en: "`location.language`" },
      { ar: "`document.lang`", en: "`document.lang`" },
      { ar: "`navigator.language`", en: "`navigator.language`" },
    ],
    answer: 2,
  },
  {
    id: "jx-web-storage",
    prompt: { ar: "ما الفرق بين `localStorage` و `sessionStorage`؟", en: "What's the difference between `localStorage` and `sessionStorage`?" },
    options: [
      { ar: "`sessionStorage` يُمسح عند إغلاق التبويب، و `localStorage` يبقى", en: "`sessionStorage` clears when the tab closes; `localStorage` stays" },
      { ar: "`localStorage` يحفظ الأرقام فقط", en: "`localStorage` only stores numbers" },
      { ar: "لا فرق بينهما", en: "There's no difference" },
    ],
    answer: 0,
  },
];
