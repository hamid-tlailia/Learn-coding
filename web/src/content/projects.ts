import { printed } from "./check";
import type { Lesson } from "./types";

/**
 * End-of-stage projects. Each one is a medium-sized build checked against a rubric:
 * the share of rubric items passed is the project score, which counts toward the
 * certificate grade. There is no solution button; `solution` is the reference build
 * the automated tests run against.
 */

const p = (logs: string[], name: string, value: string | number | boolean) => printed(logs, `__p__ ${name} ${value}`);

/* ------------------------------------------------------------------ JavaScript: a quiz app */

const QUIZ_HTML =
  '<main class="quiz">\n  <h1>Code Quiz</h1>\n  <p id="question"></p>\n  <div id="options"></div>\n  <p>Score: <span id="score">0</span></p>\n</main>\n';
const QUIZ_CSS =
  'body { font-family: system-ui, sans-serif; background: #0a0f24; color: #e2e8f0; display: grid; place-items: center; min-height: 90vh; }\n.quiz { width: min(420px, 92vw); background: #111833; padding: 24px; border-radius: 20px; }\n#options { display: grid; gap: 8px; }\n#options button { padding: 12px; border: 0; border-radius: 12px; background: #8b5cf6; color: white; font-size: 16px; }\n';

export const jsProject: Lesson = {
  slug: "project",
  title: { ar: "مشروع: تطبيق اختبار تفاعلي", en: "Project: an interactive quiz app" },
  body: [
    { icon: "🎯", ar: "ابنِ تطبيق اختبار كاملًا بـ JavaScript: أسئلة، أزرار إجابات، نقاط، وشاشة نهاية. الصفحة و CSS جاهزان، والمنطق كله عليك.", en: "Build a complete quiz app in JavaScript: questions, answer buttons, a score and an end screen. The page and CSS are ready; all the logic is yours." },
    { icon: "🗂️", ar: "البيانات: `const questions = [{ q: \"…\", options: [\"…\", \"…\"], answer: 0 }, …]` بثلاثة أسئلة على الأقل. `answer` هو رقم الخيار الصحيح.", en: "The data: `const questions = [{ q: \"…\", options: [\"…\", \"…\"], answer: 0 }, …]` with at least three questions. `answer` is the index of the right option." },
    { icon: "🖥️", ar: "اكتب دالة تعرض السؤال الحالي في `#question` وتنشئ `<button>` لكل خيار داخل `#options`.", en: "Write a function that shows the current question in `#question` and creates one `<button>` per option inside `#options`." },
    { icon: "✅", ar: "عند الضغط على خيار: إذا كان صحيحًا زد النقاط وحدّث `#score`، ثم انتقل للسؤال التالي مباشرة.", en: "When an option is clicked: if it's right, add a point and update `#score`, then move straight to the next question." },
    { icon: "🏁", ar: "بعد آخر سؤال: اكتب `Done!` في `#question`، أفرغ `#options`، واعرض النتيجة في `#score` بالشكل `2/3`.", en: "After the last question: write `Done!` in `#question`, empty `#options`, and show the result in `#score` as `2/3`." },
  ],
  files: ["js", "html", "css"],
  starter: { js: "const questions = [\n  // { q: \"…\", options: [\"…\", \"…\"], answer: 0 },\n];\n\n", html: QUIZ_HTML, css: QUIZ_CSS },
  solution: {
    js: 'const questions = [\n  { q: "Which tag makes a link?", options: ["<a>", "<p>", "<img>"], answer: 0 },\n  { q: "Which language styles pages?", options: ["HTML", "CSS", "SQL"], answer: 1 },\n  { q: "How do you declare a constant?", options: ["var", "let", "const"], answer: 2 },\n];\n\nconst questionEl = document.querySelector("#question");\nconst optionsEl = document.querySelector("#options");\nconst scoreEl = document.querySelector("#score");\nlet current = 0;\nlet score = 0;\n\nfunction render() {\n  const item = questions[current];\n  questionEl.textContent = item.q;\n  optionsEl.innerHTML = "";\n  item.options.forEach((text, index) => {\n    const button = document.createElement("button");\n    button.textContent = text;\n    button.addEventListener("click", () => choose(index));\n    optionsEl.append(button);\n  });\n}\n\nfunction choose(index) {\n  if (index === questions[current].answer) {\n    score++;\n    scoreEl.textContent = score;\n  }\n  current++;\n  if (current < questions.length) render();\n  else finish();\n}\n\nfunction finish() {\n  questionEl.textContent = "Done!";\n  optionsEl.innerHTML = "";\n  scoreEl.textContent = `${score}/${questions.length}`;\n}\n\nrender();\n',
    html: QUIZ_HTML,
    css: QUIZ_CSS,
  },
  harness: `(function () {
  var Q = typeof questions !== "undefined" && Array.isArray(questions) ? questions : [];
  var ok = Q.length >= 3 && Q.every(function (x) { return x && typeof x.q === "string" && Array.isArray(x.options) && x.options.length >= 2 && typeof x.answer === "number"; });
  console.log("__p__ data " + ok);
  if (!ok) return;
  var qEl = document.querySelector("#question"), oEl = document.querySelector("#options"), sEl = document.querySelector("#score");
  var text = function (el) { return el ? el.textContent.trim() : ""; };
  console.log("__p__ first " + (text(qEl) === Q[0].q));
  console.log("__p__ buttons " + (oEl ? oEl.querySelectorAll("button").length === Q[0].options.length : false));
  var b = oEl && oEl.querySelectorAll("button")[Q[0].answer];
  if (b) b.click();
  console.log("__p__ scored " + /(^|\\D)1(\\D|$)/.test(text(sEl)));
  console.log("__p__ moved " + (text(qEl) === Q[1].q));
  for (var i = 1; i < Q.length; i++) {
    var btns = oEl.querySelectorAll("button");
    var idx = i === Q.length - 1 ? (Q[i].answer + 1) % Q[i].options.length : Q[i].answer;
    if (btns[idx]) btns[idx].click();
  }
  console.log("__p__ done " + /done/i.test(text(qEl)));
  console.log("__p__ final " + (text(sEl).replace(/\\s/g, "").indexOf((Q.length - 1) + "/" + Q.length) >= 0));
})();`,
  tasks: [
    { id: "data", label: { ar: "مصفوفة `questions` فيها 3 أسئلة على الأقل بالشكل المطلوب", en: "A `questions` array with at least 3 questions in the right shape" }, test: ({ logs }) => p(logs, "data", true) },
    { id: "first", label: { ar: "السؤال الأول يظهر في `#question`", en: "The first question shows in `#question`" }, test: ({ logs }) => p(logs, "first", true) },
    { id: "buttons", label: { ar: "زر لكل خيار داخل `#options`", en: "One button per option inside `#options`" }, test: ({ logs }) => p(logs, "buttons", true) },
    { id: "scored", label: { ar: "الإجابة الصحيحة تضيف نقطة في `#score`", en: "A right answer adds a point in `#score`" }, test: ({ logs }) => p(logs, "scored", true) },
    { id: "moved", label: { ar: "بعد الإجابة ينتقل للسؤال التالي", en: "After answering, it moves to the next question" }, test: ({ logs }) => p(logs, "moved", true) },
    { id: "done", label: { ar: "بعد آخر سؤال يظهر `Done!`", en: "After the last question, `Done!` shows" }, test: ({ logs }) => p(logs, "done", true) },
    { id: "final", label: { ar: "النتيجة النهائية بالشكل `2/3`", en: "The final score as `2/3`" }, test: ({ logs }) => p(logs, "final", true) },
    { id: "clean", label: { ar: "كود منظم: دوال و `addEventListener`", en: "Organized code: functions and `addEventListener`" }, test: ({ files }) => /function\s+\w+\s*\(|const\s+\w+\s*=\s*\(?[\w,\s]*\)?\s*=>/.test(files.js ?? "") && /addEventListener\(/.test(files.js ?? "") },
  ],
  hints: [],
  xp: 150,
};

/* ------------------------------------------------------------------ React: a shopping cart */

export const reactProject: Lesson = {
  slug: "project",
  runtime: "react",
  title: { ar: "مشروع: متجر وسلة مشتريات بـ React", en: "Project: a shop with a cart in React" },
  body: [
    { icon: "🛒", ar: "ابنِ متجرًا صغيرًا بـ React: قائمة منتجات، بحث، سلة مشتريات بعدد ومجموع، وزر لتفريغها.", en: "Build a small shop in React: a product list, search, a cart with a count and a total, and a button to empty it." },
    { icon: "🗂️", ar: "البيانات: `const products = [{ id: 1, name: \"Keyboard\", price: 30 }, …]` بثلاثة منتجات على الأقل خارج المكوّن.", en: "The data: `const products = [{ id: 1, name: \"Keyboard\", price: 30 }, …]` with at least three products, outside the component." },
    { icon: "📋", ar: "كل منتج في `<li>` فيه الاسم والسعر وزر `Add`. وفوق القائمة `<input>` للبحث يصفّي المنتجات بالاسم دون اعتبار لحالة الأحرف.", en: "Each product is an `<li>` with its name, price and an `Add` button. Above the list, a search `<input>` filters products by name, ignoring letter case." },
    { icon: "🧮", ar: "اعرض عدد العناصر في السلة داخل `<p id=\"count\">` ومجموع الأسعار داخل `<p id=\"total\">`. احسبهما من الحالة، لا تخزّنهما مرتين.", en: "Show the number of items in the cart in `<p id=\"count\">` and the price total in `<p id=\"total\">`. Derive them from state; don't store them twice." },
    { icon: "🧹", ar: "زر `<button id=\"clear\">` يفرغ السلة.", en: "A `<button id=\"clear\">` empties the cart." },
  ],
  files: ["js"],
  starter: { js: 'const products = [\n  // { id: 1, name: "Keyboard", price: 30 },\n];\n\nexport default function App() {\n  \n}\n' },
  solution: {
    js: 'const products = [\n  { id: 1, name: "Keyboard", price: 30 },\n  { id: 2, name: "Mouse", price: 15 },\n  { id: 3, name: "Monitor", price: 120 },\n];\n\nexport default function App() {\n  const [cart, setCart] = useState([]);\n  const [search, setSearch] = useState("");\n  const shown = products.filter((p) => p.name.toLowerCase().includes(search.toLowerCase()));\n  const total = cart.reduce((sum, p) => sum + p.price, 0);\n\n  return (\n    <main>\n      <h1>Code Shop</h1>\n      <input placeholder="Search" value={search} onChange={(e) => setSearch(e.target.value)} />\n      <ul>\n        {shown.map((p) => (\n          <li key={p.id}>\n            {p.name} ${p.price}\n            <button onClick={() => setCart([...cart, p])}>Add</button>\n          </li>\n        ))}\n      </ul>\n      <p id="count">Items: {cart.length}</p>\n      <p id="total">Total: ${total}</p>\n      <button id="clear" onClick={() => setCart([])}>Clear</button>\n    </main>\n  );\n}\n',
  },
  settle: 1200,
  harness: `(async function () {
  var wait = function () { return new Promise(function (r) { setTimeout(r, 40); }); };
  var P = typeof products !== "undefined" && Array.isArray(products) ? products : [];
  var ok = P.length >= 3 && P.every(function (x) { return x && typeof x.name === "string" && typeof x.price === "number"; });
  console.log("__p__ data " + ok);
  var root = document.getElementById("root");
  var lis = function () { return root.querySelectorAll("li"); };
  var t = function (sel) { var el = root.querySelector(sel); return el ? el.textContent : ""; };
  console.log("__p__ list " + (ok && lis().length === P.length && P.every(function (x, i) { return lis()[i] && lis()[i].textContent.indexOf(x.name) >= 0; })));
  if (!ok) return;
  var add = function (i) { var b = lis()[i] && lis()[i].querySelector("button"); if (b) b.click(); };
  add(0); await wait(); add(0); await wait(); add(1); await wait();
  console.log("__p__ count " + /(^|\\D)3(\\D|$)/.test(t("#count")));
  var expected = 2 * P[0].price + P[1].price;
  console.log("__p__ total " + (t("#total").replace(/[^0-9.]/g, " ").split(" ").indexOf(String(expected)) >= 0));
  var input = root.querySelector("input");
  if (input) {
    Object.getOwnPropertyDescriptor(HTMLInputElement.prototype, "value").set.call(input, P[1].name.toUpperCase());
    input.dispatchEvent(new Event("input", { bubbles: true }));
  }
  await wait();
  console.log("__p__ search " + (lis().length === 1 && lis()[0].textContent.indexOf(P[1].name) >= 0));
  var clear = root.querySelector("#clear");
  if (clear) clear.click();
  await wait();
  console.log("__p__ clear " + /(^|\\D)0(\\D|$)/.test(t("#count")));
})();`,
  tasks: [
    { id: "data", label: { ar: "مصفوفة `products` فيها 3 منتجات على الأقل (`name` و `price`)", en: "A `products` array with at least 3 products (`name` and `price`)" }, test: ({ logs }) => p(logs, "data", true) },
    { id: "list", label: { ar: "كل منتج في `<li>` باسمه", en: "Each product in an `<li>` with its name" }, test: ({ logs }) => p(logs, "list", true) },
    { id: "keys", label: { ar: "استخدم `map` مع `key` فريد", en: "Use `map` with a unique `key`" }, test: ({ files }) => /\.map\(/.test(files.js ?? "") && /key=\{/.test(files.js ?? "") },
    { id: "count", label: { ar: "زر `Add` يضيف للسلة و `#count` يعرض العدد", en: "`Add` puts items in the cart and `#count` shows how many" }, test: ({ logs }) => p(logs, "count", true) },
    { id: "total", label: { ar: "`#total` يعرض مجموع الأسعار الصحيح", en: "`#total` shows the right price total" }, test: ({ logs }) => p(logs, "total", true) },
    { id: "search", label: { ar: "البحث يصفّي بالاسم دون اعتبار لحالة الأحرف", en: "Search filters by name, ignoring letter case" }, test: ({ logs }) => p(logs, "search", true) },
    { id: "clear", label: { ar: "زر `#clear` يفرغ السلة", en: "The `#clear` button empties the cart" }, test: ({ logs }) => p(logs, "clear", true) },
    { id: "state", label: { ar: "الحالة بـ `useState` دون تعديل المصفوفة مباشرة (`push`)", en: "State with `useState`, without mutating arrays (`push`)" }, test: ({ files }) => /useState\(/.test(files.js ?? "") && !/\.push\(/.test(files.js ?? "") },
  ],
  hints: [],
  xp: 150,
};

/* ------------------------------------------------------------------ Backend: a notes API */

const notesRequests = [
  ["GET", "/notes"],
  ["GET", "/notes/1"],
  ["GET", "/notes/99"],
  ["POST", "/notes", {}],
  ["POST", "/notes", { title: "Buy milk" }],
  ["GET", "/notes"],
  ["PATCH", "/notes/1", { done: true }],
  ["DELETE", "/notes/1"],
  ["GET", "/notes/1"],
] as const;

const notesHarness = `(async function () {
  if (typeof app === "undefined") { console.log("__p__ app false"); return; }
  var calls = ${JSON.stringify(notesRequests)};
  for (var i = 0; i < calls.length; i++) {
    var c = calls[i];
    var r = await (c[2] ? app.request(c[0], c[1], c[2]) : app.request(c[0], c[1]));
    console.log("__r__ " + i + " " + r.status + " " + JSON.stringify(r.body === undefined ? null : r.body));
  }
})();`;

/** The response to the n-th request of the run above. */
const reply = (logs: string[], n: number) => {
  const line = logs.find((l) => l.startsWith(`__r__ ${n} `));
  if (!line) return null;
  const rest = line.slice(`__r__ ${n} `.length);
  const space = rest.indexOf(" ");
  try {
    return { status: Number(rest.slice(0, space)), body: JSON.parse(rest.slice(space + 1)) };
  } catch {
    return { status: Number(rest.slice(0, space)), body: null };
  }
};

export const backendProject: Lesson = {
  slug: "project",
  runtime: "server",
  title: { ar: "مشروع: API كامل للملاحظات", en: "Project: a complete notes API" },
  body: [
    { icon: "🗒️", ar: "ابنِ API كاملًا (CRUD) لتطبيق ملاحظات بـ Express: قراءة الكل، قراءة واحدة، إنشاء، تعديل، وحذف، مع رموز الحالة الصحيحة.", en: "Build a complete (CRUD) API for a notes app with Express: list, read one, create, update and delete, with the right status codes." },
    { icon: "💾", ar: "البيانات في الذاكرة: `let notes = [{ id: 1, title: \"First note\", done: false }];` والملاحظات الجديدة تأخذ `id` جديدًا.", en: "Data lives in memory: `let notes = [{ id: 1, title: \"First note\", done: false }];` and new notes get a new `id`." },
    { icon: "🛣️", ar: "`GET /notes` ← الكل. `GET /notes/:id` ← ملاحظة واحدة أو `404`. `POST /notes` ← `201` مع الملاحظة الجديدة، أو `400` إذا كان `title` فارغًا.", en: "`GET /notes` → all of them. `GET /notes/:id` → one note or `404`. `POST /notes` → `201` with the new note, or `400` when `title` is empty." },
    { icon: "✏️", ar: "`PATCH /notes/:id` يعدّل `done` أو `title` ويُرجع الملاحظة. `DELETE /notes/:id` يحذفها ويُرجع `204`. وكلاهما يُرجع `404` لملاحظة غير موجودة.", en: "`PATCH /notes/:id` changes `done` or `title` and returns the note. `DELETE /notes/:id` removes it and returns `204`. Both return `404` for a note that doesn't exist." },
    { icon: "🔢", ar: "تذكّر: `req.params.id` نص، فحوّله بـ `Number(...)` قبل المقارنة. ولا تنسَ `app.use(express.json())` و `app.listen(3000)`.", en: "Remember: `req.params.id` is text, so convert it with `Number(...)` before comparing. And don't forget `app.use(express.json())` and `app.listen(3000)`." },
  ],
  files: ["js"],
  starter: { js: 'const express = require("express");\nconst app = express();\napp.use(express.json());\n\nlet notes = [{ id: 1, title: "First note", done: false }];\n\n// Your routes here\n\napp.listen(3000);\n' },
  solution: {
    js: 'const express = require("express");\nconst app = express();\napp.use(express.json());\n\nlet notes = [{ id: 1, title: "First note", done: false }];\nlet nextId = 2;\n\nconst find = (req) => notes.find((n) => n.id === Number(req.params.id));\n\napp.get("/notes", (req, res) => res.json(notes));\n\napp.get("/notes/:id", (req, res) => {\n  const note = find(req);\n  if (!note) return res.status(404).json({ error: "Note not found" });\n  res.json(note);\n});\n\napp.post("/notes", (req, res) => {\n  const title = (req.body.title ?? "").trim();\n  if (!title) return res.status(400).json({ error: "title is required" });\n  const note = { id: nextId++, title, done: false };\n  notes.push(note);\n  res.status(201).json(note);\n});\n\napp.patch("/notes/:id", (req, res) => {\n  const note = find(req);\n  if (!note) return res.status(404).json({ error: "Note not found" });\n  if (typeof req.body.done === "boolean") note.done = req.body.done;\n  if (req.body.title) note.title = req.body.title;\n  res.json(note);\n});\n\napp.delete("/notes/:id", (req, res) => {\n  const note = find(req);\n  if (!note) return res.status(404).json({ error: "Note not found" });\n  notes = notes.filter((n) => n !== note);\n  res.sendStatus(204);\n});\n\napp.listen(3000);\n',
  },
  settle: 900,
  harness: notesHarness,
  tasks: [
    { id: "list", label: { ar: "`GET /notes` يُرجع `200` ومصفوفة", en: "`GET /notes` returns `200` and an array" }, test: ({ logs }) => { const r = reply(logs, 0); return r?.status === 200 && Array.isArray(r.body); } },
    { id: "one", label: { ar: "`GET /notes/1` يُرجع الملاحظة رقم 1", en: "`GET /notes/1` returns note 1" }, test: ({ logs }) => { const r = reply(logs, 1); return r?.status === 200 && r.body?.id === 1; } },
    { id: "missing", label: { ar: "ملاحظة غير موجودة تُرجع `404`", en: "A missing note returns `404`" }, test: ({ logs }) => reply(logs, 2)?.status === 404 },
    { id: "invalid", label: { ar: "`POST` بدون `title` يُرجع `400`", en: "`POST` without a `title` returns `400`" }, test: ({ logs }) => reply(logs, 3)?.status === 400 },
    { id: "create", label: { ar: "`POST` صحيح يُرجع `201` مع `id` و `title`", en: "A valid `POST` returns `201` with an `id` and the `title`" }, test: ({ logs }) => { const r = reply(logs, 4); return r?.status === 201 && r.body?.title === "Buy milk" && typeof r.body?.id === "number"; } },
    { id: "grows", label: { ar: "الملاحظة الجديدة تظهر في `GET /notes`", en: "The new note appears in `GET /notes`" }, test: ({ logs }) => { const r = reply(logs, 5); return Array.isArray(r?.body) && r.body.length === 2; } },
    { id: "patch", label: { ar: "`PATCH /notes/1` يجعل `done` تساوي `true`", en: "`PATCH /notes/1` sets `done` to `true`" }, test: ({ logs }) => { const r = reply(logs, 6); return r?.status === 200 && r.body?.done === true; } },
    { id: "delete", label: { ar: "`DELETE /notes/1` يُرجع `204` ثم تصبح `404`", en: "`DELETE /notes/1` returns `204`, then it's `404`" }, test: ({ logs }) => reply(logs, 7)?.status === 204 && reply(logs, 8)?.status === 404 },
  ],
  hints: [],
  xp: 150,
};

/* ------------------------------------------------------------------ Mobile: a habit tracker */

export const mobileProject: Lesson = {
  slug: "project",
  runtime: "native",
  title: { ar: "مشروع: تطبيق متابعة العادات", en: "Project: a habit tracker app" },
  body: [
    { icon: "🌱", ar: "ابنِ تطبيق هاتف لمتابعة العادات اليومية: تضيف عادة، تراها في قائمة، وتلمسها لتعلّمها كمنجزة، مع عدّاد للتقدم.", en: "Build a phone app that tracks daily habits: add a habit, see it in a list, tap it to mark it done, with a progress counter." },
    { icon: "⌨️", ar: "`<TextInput>` لكتابة العادة مع `onChangeText`، و `<Pressable>` فيه `<Text>Add</Text>` يضيفها. تجاهل النص الفارغ وأفرغ الحقل بعد الإضافة.", en: "A `<TextInput>` for the habit with `onChangeText`, and a `<Pressable>` containing `<Text>Add</Text>` that adds it. Ignore empty text and clear the field after adding." },
    { icon: "📜", ar: "اعرض العادات في `<FlatList>` مع `keyExtractor`. كل عادة `<Pressable>` يبدّل حالتها، ويظهر قبل اسمها `✓` إذا أُنجزت.", en: "Show the habits in a `<FlatList>` with `keyExtractor`. Each habit is a `<Pressable>` that toggles it, with `✓` before its name once done." },
    { icon: "📊", ar: "في الأعلى `<Text>` يعرض التقدم بالشكل `1/2 done`.", en: "At the top, a `<Text>` shows progress as `1/2 done`." },
  ],
  files: ["js"],
  starter: { js: 'import { View, Text, TextInput, Pressable, FlatList, StyleSheet } from "react-native";\n\nexport default function App() {\n  \n}\n' },
  solution: {
    js: 'import { View, Text, TextInput, Pressable, FlatList, StyleSheet } from "react-native";\n\nexport default function App() {\n  const [habits, setHabits] = useState([]);\n  const [text, setText] = useState("");\n  const done = habits.filter((h) => h.done).length;\n\n  function add() {\n    const name = text.trim();\n    if (!name) return;\n    setHabits([...habits, { id: String(Date.now() + habits.length), name, done: false }]);\n    setText("");\n  }\n\n  function toggle(id) {\n    setHabits(habits.map((h) => (h.id === id ? { ...h, done: !h.done } : h)));\n  }\n\n  return (\n    <View style={styles.screen}>\n      <Text style={styles.title}>{done}/{habits.length} done</Text>\n      <View style={styles.row}>\n        <TextInput style={styles.input} value={text} onChangeText={setText} placeholder="New habit" />\n        <Pressable style={styles.add} onPress={add}>\n          <Text style={{ color: "white" }}>Add</Text>\n        </Pressable>\n      </View>\n      <FlatList\n        data={habits}\n        keyExtractor={(item) => item.id}\n        renderItem={({ item }) => (\n          <Pressable style={styles.habit} onPress={() => toggle(item.id)}>\n            <Text>{item.done ? "✓ " : ""}{item.name}</Text>\n          </Pressable>\n        )}\n      />\n    </View>\n  );\n}\n\nconst styles = StyleSheet.create({\n  screen: { flex: 1, padding: 20, gap: 12 },\n  title: { fontSize: 22, fontWeight: "bold" },\n  row: { flexDirection: "row", gap: 8 },\n  input: { flex: 1, borderWidth: 1, borderColor: "#ccc", borderRadius: 10, padding: 10 },\n  add: { backgroundColor: "#8b5cf6", borderRadius: 10, padding: 12 },\n  habit: { padding: 14, borderRadius: 12, backgroundColor: "#f1f0fb", marginBottom: 8 },\n});\n',
  },
  settle: 1200,
  harness: `(async function () {
  var wait = function () { return new Promise(function (r) { setTimeout(r, 40); }); };
  var root = document.getElementById("root");
  var input = root.querySelector("[data-rn=TextInput]");
  var type = function (v) {
    if (!input) return;
    Object.getOwnPropertyDescriptor(HTMLInputElement.prototype, "value").set.call(input, v);
    input.dispatchEvent(new Event("input", { bubbles: true }));
  };
  var addBtn = function () { return Array.prototype.find.call(root.querySelectorAll("[data-rn=Pressable]"), function (b) { return b.textContent.trim().toLowerCase() === "add"; }); };
  var habits = function () { return root.querySelectorAll("[data-rn=FlatList] [data-rn=Pressable]"); };
  var press = function () { var b = addBtn(); if (b) b.click(); };
  type("Read"); await wait(); press(); await wait();
  console.log("__p__ cleared " + (!!input && input.value === ""));
  type("Run"); await wait(); press(); await wait();
  type("   "); await wait(); press(); await wait();
  console.log("__p__ items " + habits().length);
  var first = habits()[0];
  if (first) first.click();
  await wait();
  console.log("__p__ tick " + (!!habits()[0] && habits()[0].textContent.indexOf("✓") >= 0 && !!habits()[1] && habits()[1].textContent.indexOf("✓") < 0));
  console.log("__p__ progress " + /1\\s*\\/\\s*2/.test(root.textContent));
})();`,
  tasks: [
    { id: "input", label: { ar: "`<TextInput>` مع `onChangeText`", en: "A `<TextInput>` with `onChangeText`" }, test: ({ files }) => /<TextInput[\s\S]*onChangeText=/.test(files.js ?? "") },
    { id: "add", label: { ar: "زر `Add` يضيف العادات، والنص الفارغ يُتجاهل", en: "`Add` adds habits, and empty text is ignored" }, test: ({ logs }) => p(logs, "items", 2) },
    { id: "cleared", label: { ar: "الحقل يُفرغ بعد الإضافة", en: "The field clears after adding" }, test: ({ logs }) => p(logs, "cleared", true) },
    { id: "list", label: { ar: "`<FlatList>` مع `keyExtractor`", en: "A `<FlatList>` with `keyExtractor`" }, test: ({ files }) => /<FlatList[\s\S]*keyExtractor=/.test(files.js ?? "") },
    { id: "tick", label: { ar: "لمس العادة يضع `✓` قبلها", en: "Tapping a habit puts `✓` before it" }, test: ({ logs }) => p(logs, "tick", true) },
    { id: "progress", label: { ar: "العدّاد يعرض `1/2 done`", en: "The counter shows `1/2 done`" }, test: ({ logs }) => p(logs, "progress", true) },
    { id: "styles", label: { ar: "الأنماط مجمّعة في `StyleSheet.create`", en: "Styles grouped in `StyleSheet.create`" }, test: ({ files }) => /StyleSheet\.create\(/.test(files.js ?? "") },
  ],
  hints: [],
  xp: 150,
};

/* ------------------------------------------------------------------ Mastery: a portfolio site */

const PORTFOLIO_HTML =
  '<header>\n  <h1>My name</h1>\n  <nav>\n    <a href="#about">About</a>\n    <a href="#projects">Projects</a>\n    <a href="#contact">Contact</a>\n  </nav>\n  <button id="theme">🌙</button>\n</header>\n\n<main>\n  <section id="about">\n    <h2>About me</h2>\n    <p>Web developer learning with Code Master.</p>\n  </section>\n\n  <section id="projects">\n    <h2>Projects</h2>\n    <div id="project-list"></div>\n  </section>\n\n  <section id="contact">\n    <h2>Contact</h2>\n    <form id="contact-form">\n      <label for="email">Email</label>\n      <input id="email" type="text">\n      <label for="message">Message</label>\n      <textarea id="message"></textarea>\n      <button>Send</button>\n      <p id="form-msg"></p>\n    </form>\n  </section>\n</main>\n\n<footer>© 2026</footer>\n';

export const proProject: Lesson = {
  slug: "project",
  title: { ar: "مشروع: موقع Portfolio احترافي", en: "Project: a professional portfolio site" },
  body: [
    { icon: "💼", ar: "ابنِ موقعك الشخصي الذي ستعرضه على أصحاب العمل: هيكل دلالي، مشاريع تُعرض من البيانات، وضع ليلي، تصميم متجاوب، ونموذج تواصل يتحقق من البريد.", en: "Build the personal site you'll show employers: semantic structure, projects rendered from data, dark mode, a responsive layout and a contact form that validates the email." },
    { icon: "🏗️", ar: "HTML جاهز كبداية ويمكنك تعديله، لكن حافظ على المعرّفات: `#project-list` و `#theme` و `#contact-form` و `#email` و `#message` و `#form-msg`.", en: "The HTML is a starting point you can change, but keep the ids: `#project-list`, `#theme`, `#contact-form`, `#email`, `#message` and `#form-msg`." },
    { icon: "🗂️", ar: "في JavaScript: `const projects = [{ title, description }, …]` بثلاثة مشاريع على الأقل، واعرض كل واحد كعنصر `.card` فيه `<h3>` داخل `#project-list`.", en: "In JavaScript: `const projects = [{ title, description }, …]` with at least three projects, each rendered as a `.card` element with an `<h3>` inside `#project-list`." },
    { icon: "🌙", ar: "زر `#theme` يبدّل الصنف `dark` على `<body>`، وفي CSS قاعدة `body.dark { … }` تغيّر الألوان.", en: "The `#theme` button toggles the `dark` class on `<body>`, and a `body.dark { … }` rule in CSS changes the colors." },
    { icon: "📱", ar: "رتّب `#project-list` بـ Grid أو Flexbox، وأضف `@media` للشاشات الصغيرة.", en: "Lay out `#project-list` with Grid or Flexbox, and add an `@media` query for small screens." },
    { icon: "✉️", ar: "عند إرسال النموذج: امنع إعادة التحميل. بريد غير صالح ← رسالة خطأ في `#form-msg` مع الصنف `error`. بريد صالح ← رسالة شكر بدون `error`، وأفرغ الحقول.", en: "On submit: prevent the reload. An invalid email → an error message in `#form-msg` with the `error` class. A valid one → a thank-you message without `error`, and clear the fields." },
  ],
  files: ["js", "html", "css"],
  starter: { js: "const projects = [\n  // { title: \"…\", description: \"…\" },\n];\n\n", html: PORTFOLIO_HTML, css: "body {\n  font-family: system-ui, sans-serif;\n  margin: 0;\n}\n" },
  solution: {
    js: 'const projects = [\n  { title: "Quiz app", description: "An interactive quiz in plain JavaScript." },\n  { title: "Code Shop", description: "A React shop with a cart." },\n  { title: "Notes API", description: "A REST API with Express." },\n];\n\nconst list = document.querySelector("#project-list");\nfor (const project of projects) {\n  const card = document.createElement("article");\n  card.className = "card";\n  const title = document.createElement("h3");\n  title.textContent = project.title;\n  const text = document.createElement("p");\n  text.textContent = project.description;\n  card.append(title, text);\n  list.append(card);\n}\n\ndocument.querySelector("#theme").addEventListener("click", () => {\n  document.body.classList.toggle("dark");\n});\n\nconst form = document.querySelector("#contact-form");\nconst email = document.querySelector("#email");\nconst message = document.querySelector("#message");\nconst msg = document.querySelector("#form-msg");\n\nform.addEventListener("submit", (event) => {\n  event.preventDefault();\n  if (!/^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/.test(email.value)) {\n    msg.textContent = "Please enter a valid email.";\n    msg.classList.add("error");\n    return;\n  }\n  msg.textContent = "Thanks! I will reply soon.";\n  msg.classList.remove("error");\n  form.reset();\n});\n',
    html: PORTFOLIO_HTML,
    css: 'body {\n  font-family: system-ui, sans-serif;\n  margin: 0;\n  background: #f8fafc;\n  color: #0f172a;\n}\n\nbody.dark {\n  background: #0a0f24;\n  color: #e2e8f0;\n}\n\nheader, main, footer {\n  padding: 16px 24px;\n}\n\nnav {\n  display: flex;\n  gap: 16px;\n}\n\n#project-list {\n  display: grid;\n  grid-template-columns: repeat(3, 1fr);\n  gap: 16px;\n}\n\n.card {\n  padding: 16px;\n  border-radius: 16px;\n  background: #8b5cf622;\n}\n\n.error {\n  color: #e11d48;\n}\n\n@media (max-width: 600px) {\n  #project-list {\n    grid-template-columns: 1fr;\n  }\n}\n',
  },
  harness: `(function () {
  var cards = document.querySelectorAll("#project-list .card");
  console.log("__p__ cards " + (typeof projects !== "undefined" && projects.length >= 3 && cards.length === projects.length && Array.prototype.every.call(cards, function (c) { return !!c.querySelector("h3"); })));
  var theme = document.querySelector("#theme");
  if (theme) theme.click();
  var on = document.body.classList.contains("dark");
  if (theme) theme.click();
  console.log("__p__ theme " + (on && !document.body.classList.contains("dark")));
  var form = document.querySelector("#contact-form"), email = document.querySelector("#email"), message = document.querySelector("#message"), msg = document.querySelector("#form-msg");
  if (!form || !email || !msg) { console.log("__p__ form false"); return; }
  var send = function () { if (form.requestSubmit) form.requestSubmit(); else form.dispatchEvent(new Event("submit", { cancelable: true })); };
  email.value = "not-an-email"; if (message) message.value = "Hi";
  send();
  console.log("__p__ invalid " + (msg.classList.contains("error") && msg.textContent.trim().length > 0));
  email.value = "sara@mail.com"; if (message) message.value = "Hello!";
  send();
  console.log("__p__ valid " + (!msg.classList.contains("error") && msg.textContent.trim().length > 0 && email.value === ""));
})();`,
  tasks: [
    { id: "semantic", label: { ar: "هيكل دلالي: `<header>` و `<nav>` بثلاثة روابط و `<main>` و `<footer>`", en: "Semantic structure: `<header>`, a `<nav>` with three links, `<main>` and `<footer>`" }, test: ({ doc }) => !!doc.querySelector("header") && doc.querySelectorAll("nav a[href^='#']").length >= 3 && !!doc.querySelector("main") && !!doc.querySelector("footer") },
    { id: "anchors", label: { ar: "روابط القائمة تشير إلى أقسام موجودة", en: "Menu links point to sections that exist" }, test: ({ doc }) => { const links = Array.from(doc.querySelectorAll("nav a[href^='#']")); return links.length >= 3 && links.every((a) => !!doc.getElementById((a.getAttribute("href") ?? "").slice(1))); } },
    { id: "cards", label: { ar: "3 مشاريع على الأقل تُعرض كـ `.card` فيها `<h3>`", en: "At least 3 projects rendered as `.card` with an `<h3>`" }, test: ({ logs }) => p(logs, "cards", true) },
    { id: "theme", label: { ar: "زر `#theme` يبدّل `dark` على `<body>`", en: "`#theme` toggles `dark` on `<body>`" }, test: ({ logs }) => p(logs, "theme", true) },
    { id: "dark-css", label: { ar: "قاعدة `body.dark` في CSS", en: "A `body.dark` rule in CSS" }, test: ({ css }) => /body\.dark\s*\{/.test(css) },
    { id: "layout", label: { ar: "`#project-list` بـ Grid أو Flexbox، مع `@media`", en: "`#project-list` with Grid or Flexbox, plus `@media`" }, test: ({ rule, media }) => /grid|flex/.test(rule("#project-list", "display")) && media.length > 0 },
    { id: "invalid", label: { ar: "بريد غير صالح ← رسالة خطأ بالصنف `error`", en: "An invalid email → an error message with the `error` class" }, test: ({ logs }) => p(logs, "invalid", true) },
    { id: "valid", label: { ar: "بريد صالح ← رسالة شكر، وتُفرغ الحقول", en: "A valid email → a thank-you message, and the fields clear" }, test: ({ logs }) => p(logs, "valid", true) },
  ],
  hints: [],
  xp: 200,
};
