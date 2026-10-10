import type { Exam, Lesson } from "./types";

const reading = (l: Omit<Lesson, "files" | "starter" | "solution" | "tasks" | "hints">): Lesson => ({ ...l, files: [], starter: {}, solution: {}, tasks: [], hints: [] });

/** Sends requests to the learner's app (the browser Express look-alike) and prints the answers. */
const requests = (calls: [string, string, unknown?][]) =>
  `(async function () { if (typeof app === "undefined") { console.log("__res__ no-app"); return; } ${calls
    .map(([m, u, b]) => `var r = await app.request(${JSON.stringify(m)}, ${JSON.stringify(u)}${b ? `, ${JSON.stringify(b)}` : ""}); console.log("__res__ ${m} ${u} " + r.status + " " + JSON.stringify(r.body));`)
    .join(" ")} })();`;

/** Every response to one method and URL, in the order the requests were sent. */
const all = (logs: string[], method: string, url: string) =>
  logs
    .filter((l) => l.startsWith(`__res__ ${method} ${url} `))
    .map((l) => {
      const rest = l.slice(`__res__ ${method} ${url} `.length);
      const space = rest.indexOf(" ");
      try {
        return { status: Number(rest.slice(0, space)), body: JSON.parse(rest.slice(space + 1)) };
      } catch {
        return { status: Number(rest.slice(0, space)), body: null };
      }
    });

const res = (logs: string[], method: string, url: string) => {
  const line = logs.find((l) => l.startsWith(`__res__ ${method} ${url} `));
  if (!line) return null;
  const rest = line.slice(`__res__ ${method} ${url} `.length);
  const space = rest.indexOf(" ");
  try {
    return { status: Number(rest.slice(0, space)), body: JSON.parse(rest.slice(space + 1)) };
  } catch {
    return null;
  }
};

export const backendLessons: Lesson[] = [
  reading({
    slug: "http-apis",
    title: { ar: "كيف يتحدث التطبيق مع الخادم: HTTP و API", en: "How apps talk to servers: HTTP and APIs" },
    body: [
      { icon: "📡", ar: "الواجهة (client) ترسل **طلبًا** (request) إلى الخادم (server)، فيرد بـ**استجابة** (response). اللغة المشتركة بينهما اسمها **HTTP**.", en: "The client sends a **request** to the server, which replies with a **response**. Their shared language is **HTTP**." },
      { icon: "🔤", ar: "لكل طلب **طريقة** (method): `GET` لجلب بيانات، `POST` لإنشاء، `PUT`/`PATCH` لتعديل، `DELETE` لحذف. ومعه **مسار** مثل `/api/courses/2`.", en: "Every request has a **method**: `GET` to read, `POST` to create, `PUT`/`PATCH` to update, `DELETE` to remove. And a **path** like `/api/courses/2`." },
      { icon: "🔢", ar: "الاستجابة فيها **رمز حالة**: `200` نجاح، `201` أُنشئ، `400` طلب خاطئ، `401` غير مسجل، `404` غير موجود، `500` خطأ في الخادم.", en: "The response has a **status code**: `200` OK, `201` created, `400` bad request, `401` not signed in, `404` not found, `500` server error." },
      { icon: "🧾", ar: "البيانات تُرسل غالبًا بصيغة **JSON**. ومجموعة المسارات التي يقدمها الخادم تسمى **API**. أسلوب REST ينظّمها بأسماء: `GET /api/users` و `POST /api/users`.", en: "Data usually travels as **JSON**. The set of paths a server offers is its **API**. The REST style organizes them by nouns: `GET /api/users` and `POST /api/users`." },
    ],
    quiz: [
      { id: "q1", prompt: { ar: "أي طريقة لإنشاء مستخدم جديد؟", en: "Which method creates a new user?" }, options: [{ ar: "`GET`", en: "`GET`" }, { ar: "`POST`", en: "`POST`" }, { ar: "`DELETE`", en: "`DELETE`" }], answer: 1 },
      { id: "q2", prompt: { ar: "الخادم لم يجد الدورة المطلوبة. أي رمز حالة؟", en: "The server can't find the course. Which status?" }, options: [{ ar: "`200`", en: "`200`" }, { ar: "`404`", en: "`404`" }, { ar: "`201`", en: "`201`" }], answer: 1 },
      { id: "q3", prompt: { ar: "المستخدم أرسل بريدًا فارغًا في نموذج التسجيل:", en: "The user sent an empty email in the sign-up form:" }, options: [{ ar: "`400 Bad Request`", en: "`400 Bad Request`" }, { ar: "`500`", en: "`500`" }, { ar: "`200`", en: "`200`" }], answer: 0 },
    ],
    xp: 20,
  }),
  {
    slug: "express-basics",
    runtime: "server",
    title: { ar: "أول خادم: Node.js و Express", en: "Your first server: Node.js and Express" },
    body: [
      { icon: "🟢", ar: "**Node.js** يشغّل JavaScript على الخادم. و **Express** أشهر مكتبة لبناء API فيه. نفس اللغة التي تعرفها، لكن على الطرف الآخر.", en: "**Node.js** runs JavaScript on the server. **Express** is its most popular library for building APIs. The same language you know, on the other side." },
      { icon: "🛣️", ar: "تعرّف **مسارًا** (route): `app.get(\"/api/hello\", (req, res) => { res.json({ message: \"Hi\" }); })`. الدالة تستقبل الطلب `req` وترد عبر `res`.", en: "Define a **route**: `app.get(\"/api/hello\", (req, res) => { res.json({ message: \"Hi\" }); })`. The handler receives the request `req` and replies through `res`." },
      { icon: "🎧", ar: "`app.listen(3000)` يبدأ الاستماع للطلبات. على حاسوبك تشغّله بـ `node server.js`. وهنا الخادم يعمل داخل التطبيق، والنتائج في الكونسول.", en: "`app.listen(3000)` starts listening for requests. On your computer you'd run `node server.js`. Here the server runs inside the app, with results in the console." },
    ],
    example: {
      code: 'const express = require("express");\nconst app = express();\n\napp.get("/api/time", (req, res) => {\n  res.json({ now: "12:00" });\n});\n\napp.listen(3000);\n\n// Try a request:\napp.request("GET", "/api/time").then((r) => console.log(r.status, r.body));',
      note: { ar: "خادم بمسار واحد، ثم طلب تجريبي.", en: "A server with one route, then a test request." },
    },
    files: ["js"],
    starter: { js: 'const express = require("express");\nconst app = express();\n\n' },
    solution: { js: 'const express = require("express");\nconst app = express();\n\napp.get("/api/hello", (req, res) => {\n  res.json({ message: "Hello from the server" });\n});\n\napp.listen(3000, () => console.log("Ready"));\n' },
    harness: requests([["GET", "/api/hello"]]),
    settle: 500,
    tasks: [
      { id: "route", label: { ar: "أضف المسار `GET /api/hello`", en: "Add the route `GET /api/hello`" }, test: ({ logs }) => res(logs, "GET", "/api/hello")?.status === 200 },
      { id: "json", label: { ar: "رد بـ JSON فيه خاصية `message`", en: "Reply with JSON that has a `message`" }, test: ({ logs }) => typeof res(logs, "GET", "/api/hello")?.body?.message === "string" },
      { id: "listen", label: { ar: "شغّل الخادم بـ `app.listen(3000)`", en: "Start the server with `app.listen(3000)`" }, test: ({ logs }) => logs.some((l) => l.includes("Server listening on http://localhost:3000")) },
    ],
    hints: [
      { ar: '`app.get("/api/hello", (req, res) => { res.json({ message: "Hello" }); });`', en: '`app.get("/api/hello", (req, res) => { res.json({ message: "Hello" }); });`' },
      { ar: "`app.listen(3000);`", en: "`app.listen(3000);`" },
    ],
    xp: 35,
  },
  {
    slug: "rest-routes",
    runtime: "server",
    title: { ar: "مسارات REST والمعاملات: req.params", en: "REST routes and parameters: req.params" },
    body: [
      { icon: "🧭", ar: "في REST: `GET /api/courses` يُرجع القائمة كلها، و `GET /api/courses/:id` يُرجع عنصرًا واحدًا. الجزء `:id` متغير تقرؤه من `req.params.id`.", en: "In REST, `GET /api/courses` returns the whole list and `GET /api/courses/:id` returns one item. `:id` is a variable you read from `req.params.id`." },
      { icon: "🔢", ar: "المعاملات تصل **نصًا**: حوّلها لرقم `Number(req.params.id)` قبل المقارنة.", en: "Parameters arrive as **text**: convert with `Number(req.params.id)` before comparing." },
      { icon: "🚫", ar: "إذا لم يوجد العنصر، رد برمز مناسب: `res.status(404).json({ error: \"Not found\" })`. الرموز الصحيحة تساعد الواجهة على عرض الرسالة المناسبة.", en: "If the item doesn't exist, reply with the right code: `res.status(404).json({ error: \"Not found\" })`. Correct codes help the frontend show the right message." },
    ],
    example: {
      code: 'const express = require("express");\nconst app = express();\nconst books = [{ id: 1, title: "Clean Code" }];\n\napp.get("/api/books/:id", (req, res) => {\n  const book = books.find((b) => b.id === Number(req.params.id));\n  if (!book) return res.status(404).json({ error: "Not found" });\n  res.json(book);\n});\n\napp.request("GET", "/api/books/1").then((r) => console.log(r.status, r.body));\napp.request("GET", "/api/books/7").then((r) => console.log(r.status, r.body));',
      note: { ar: "كتاب موجود (200) وآخر غير موجود (404).", en: "One book found (200), one missing (404)." },
    },
    files: ["js"],
    starter: { js: 'const express = require("express");\nconst app = express();\n\nconst courses = [\n  { id: 1, title: "HTML" },\n  { id: 2, title: "CSS" },\n  { id: 3, title: "JavaScript" },\n];\n\n' },
    solution: {
      js: 'const express = require("express");\nconst app = express();\n\nconst courses = [\n  { id: 1, title: "HTML" },\n  { id: 2, title: "CSS" },\n  { id: 3, title: "JavaScript" },\n];\n\napp.get("/api/courses", (req, res) => {\n  res.json(courses);\n});\n\napp.get("/api/courses/:id", (req, res) => {\n  const course = courses.find((c) => c.id === Number(req.params.id));\n  if (!course) return res.status(404).json({ error: "Course not found" });\n  res.json(course);\n});\n',
    },
    harness: requests([["GET", "/api/courses"], ["GET", "/api/courses/2"], ["GET", "/api/courses/99"]]),
    settle: 500,
    tasks: [
      { id: "list", label: { ar: "`GET /api/courses` يُرجع الدورات الثلاث", en: "`GET /api/courses` returns all three courses" }, test: ({ logs }) => Array.isArray(res(logs, "GET", "/api/courses")?.body) && res(logs, "GET", "/api/courses")!.body.length === 3 },
      { id: "one", label: { ar: "`GET /api/courses/:id` يُرجع الدورة المطلوبة", en: "`GET /api/courses/:id` returns the requested course" }, test: ({ logs }) => res(logs, "GET", "/api/courses/2")?.body?.title === "CSS" },
      { id: "404", label: { ar: "ويُرجع `404` لدورة غير موجودة", en: "and `404` for a course that doesn't exist" }, test: ({ logs }) => res(logs, "GET", "/api/courses/99")?.status === 404 },
    ],
    hints: [
      { ar: '`app.get("/api/courses/:id", (req, res) => { const course = courses.find((c) => c.id === Number(req.params.id)); … });`', en: '`app.get("/api/courses/:id", (req, res) => { const course = courses.find((c) => c.id === Number(req.params.id)); … });`' },
      { ar: '`if (!course) return res.status(404).json({ error: "Course not found" });`', en: '`if (!course) return res.status(404).json({ error: "Course not found" });`' },
    ],
    xp: 40,
  },
  {
    slug: "post-validation",
    runtime: "server",
    title: { ar: "استقبال البيانات والتحقق منها: POST", en: "Receiving and validating data: POST" },
    body: [
      { icon: "📥", ar: "`app.post(\"/api/signup\", …)` يستقبل بيانات يرسلها المستخدم في `req.body`. في Express الحقيقي تضيف قبلها `app.use(express.json())`.", en: "`app.post(\"/api/signup\", …)` receives data the user sends in `req.body`. In real Express you add `app.use(express.json())` first." },
      { icon: "🛡️", ar: "**لا تثق أبدًا** بالبيانات القادمة: تحقق منها على الخادم حتى لو تحققت الواجهة. إذا كانت ناقصة رد بـ `400` ورسالة واضحة.", en: "**Never trust** incoming data: validate on the server even if the frontend did. If something's missing, reply `400` with a clear message." },
      { icon: "🆕", ar: "عند النجاح أنشئ العنصر ورد بـ `201 Created` مع البيانات الجديدة، **بدون** كلمة السر طبعًا.", en: "On success, create the item and reply `201 Created` with the new data, **without** the password, of course." },
    ],
    example: {
      code: 'const express = require("express");\nconst app = express();\nconst notes = [];\n\napp.post("/api/notes", (req, res) => {\n  if (!req.body.text) return res.status(400).json({ error: "Text is required" });\n  const note = { id: notes.length + 1, text: req.body.text };\n  notes.push(note);\n  res.status(201).json(note);\n});\n\napp.request("POST", "/api/notes", { text: "Hi" }).then((r) => console.log(r.status, r.body));\napp.request("POST", "/api/notes", {}).then((r) => console.log(r.status, r.body));',
      note: { ar: "طلب صحيح (201) وطلب ناقص (400).", en: "A valid request (201) and an incomplete one (400)." },
    },
    files: ["js"],
    starter: { js: 'const express = require("express");\nconst app = express();\napp.use(express.json());\n\nconst users = [];\n\n' },
    solution: {
      js: 'const express = require("express");\nconst app = express();\napp.use(express.json());\n\nconst users = [];\n\napp.post("/api/signup", (req, res) => {\n  const { email, password } = req.body;\n  if (!email || !email.includes("@")) {\n    return res.status(400).json({ error: "A valid email is required" });\n  }\n  if (!password || password.length < 8) {\n    return res.status(400).json({ error: "Password must be at least 8 characters" });\n  }\n  const user = { id: users.length + 1, email };\n  users.push(user);\n  res.status(201).json(user);\n});\n',
    },
    harness: requests([
      ["POST", "/api/signup", { email: "sara@mail.com", password: "longenough" }],
      ["POST", "/api/signup", { email: "nope", password: "longenough" }],
      ["POST", "/api/signup", { email: "ali@mail.com", password: "short" }],
    ]),
    settle: 500,
    tasks: [
      { id: "created", label: { ar: "طلب صحيح يُرجع `201` مع `id` و `email`", en: "A valid request returns `201` with `id` and `email`" }, test: ({ logs }) => { const r = all(logs, "POST", "/api/signup")[0]; return r?.status === 201 && !!r.body?.id && r.body?.email === "sara@mail.com"; } },
      { id: "email", label: { ar: "بريد بدون `@` يُرجع `400`", en: "An email without `@` returns `400`" }, test: ({ logs }) => all(logs, "POST", "/api/signup")[1]?.status === 400 },
      { id: "password", label: { ar: "كلمة سر أقصر من 8 أحرف تُرجع `400`، ولا تُرجع كلمة السر أبدًا", en: "A password under 8 characters returns `400`, and the password is never returned" }, test: ({ logs }) => all(logs, "POST", "/api/signup")[2]?.status === 400 && !logs.some((l) => l.includes("longenough")) },
    ],
    hints: [
      { ar: '`if (!email || !email.includes("@")) return res.status(400).json({ error: "…" });`', en: '`if (!email || !email.includes("@")) return res.status(400).json({ error: "…" });`' },
      { ar: "`res.status(201).json({ id, email })` بدون `password`", en: "`res.status(201).json({ id, email })` without the `password`" },
    ],
    xp: 40,
  },
  reading({
    slug: "databases",
    title: { ar: "قواعد البيانات و SQL", en: "Databases and SQL" },
    body: [
      { icon: "🗄️", ar: "المصفوفات تختفي عند إعادة تشغيل الخادم. البيانات الدائمة مكانها **قاعدة بيانات**. الأشهر: **PostgreSQL** (جداول وعلاقات) و MongoDB (مستندات).", en: "Arrays vanish when the server restarts. Lasting data lives in a **database**. The most popular: **PostgreSQL** (tables and relations) and MongoDB (documents)." },
      { icon: "📊", ar: "البيانات في **جداول**: صفوف وأعمدة، مثل `users(id, email, created_at)`. والعلاقات تربطها: كل `order` فيه `user_id` يشير إلى مستخدم.", en: "Data sits in **tables**: rows and columns, like `users(id, email, created_at)`. Relations link them: each `order` has a `user_id` pointing to a user." },
      { icon: "💬", ar: "**SQL** لغة الحديث معها: `SELECT * FROM users WHERE id = 1;` للقراءة، و `INSERT INTO users (email) VALUES ('a@b.com');` للإضافة، و `UPDATE` و `DELETE`.", en: "**SQL** is how you talk to it: `SELECT * FROM users WHERE id = 1;` to read, `INSERT INTO users (email) VALUES ('a@b.com');` to add, plus `UPDATE` and `DELETE`." },
      { icon: "🧰", ar: "في JavaScript تستخدم غالبًا **ORM** مثل Prisma أو Drizzle بدل كتابة SQL يدويًا، أو خدمة جاهزة مثل **Supabase** (قاعدة Postgres مع تسجيل دخول).", en: "In JavaScript you'll often use an **ORM** like Prisma or Drizzle instead of hand-written SQL, or a hosted service like **Supabase** (Postgres plus auth)." },
    ],
    quiz: [
      { id: "q1", prompt: { ar: "أي أمر SQL يقرأ كل المستخدمين؟", en: "Which SQL reads every user?" }, options: [{ ar: "`SELECT * FROM users;`", en: "`SELECT * FROM users;`" }, { ar: "`GET users;`", en: "`GET users;`" }, { ar: "`READ users;`", en: "`READ users;`" }], answer: 0 },
      { id: "q2", prompt: { ar: "كيف يرتبط الطلب order بصاحبه؟", en: "How does an order link to its owner?" }, options: [{ ar: "عمود `user_id` في جدول orders", en: "A `user_id` column in the orders table" }, { ar: "نسخ اسم المستخدم في كل طلب", en: "Copying the user's name into each order" }, { ar: "لا يمكن ربطهما", en: "They can't be linked" }], answer: 0 },
      { id: "q3", prompt: { ar: "ما هو Prisma؟", en: "What is Prisma?" }, options: [{ ar: "ORM للتعامل مع قاعدة البيانات من JavaScript", en: "An ORM to work with the database from JavaScript" }, { ar: "متصفح", en: "A browser" }, { ar: "لغة CSS", en: "A CSS language" }], answer: 0 },
    ],
    xp: 20,
  }),
  reading({
    slug: "auth-security",
    title: { ar: "تسجيل الدخول والأمان", en: "Authentication and security" },
    body: [
      { icon: "🔐", ar: "**لا تحفظ كلمات السر كما هي أبدًا**. احفظ **بصمتها** (hash) بخوارزمية مثل bcrypt أو argon2. عند الدخول تقارن البصمات فقط.", en: "**Never store passwords as-is.** Store a **hash** made with bcrypt or argon2. On sign-in, you compare hashes only." },
      { icon: "🎟️", ar: "بعد الدخول يعطي الخادم المستخدم **جلسة** (session cookie) أو **رمزًا** (JWT) يرسله مع كل طلب ليثبت هويته. المسارات المحمية ترد بـ `401` بدونه.", en: "After sign-in the server gives a **session cookie** or a **token** (JWT) that's sent with each request to prove identity. Protected routes reply `401` without it." },
      { icon: "🧯", ar: "أخطر الثغرات: **SQL Injection** (استخدم الاستعلامات المعلّمة أو ORM دائمًا)، و **XSS** (لا تُدخل نص المستخدم كـ HTML)، وكشف الأسرار.", en: "The worst holes: **SQL injection** (always use parameterized queries or an ORM), **XSS** (never inject user text as HTML), and leaked secrets." },
      { icon: "🗝️", ar: "المفاتيح السرية (مثل مفتاح Gemini أو قاعدة البيانات) توضع في **متغيرات البيئة** `.env` على الخادم، لا في كود الواجهة ولا في GitHub. واستخدم **HTTPS** دائمًا.", en: "Secret keys (a Gemini or database key) go in **environment variables** `.env` on the server, never in frontend code or GitHub. And always use **HTTPS**." },
    ],
    quiz: [
      { id: "q1", prompt: { ar: "كيف تحفظ كلمة السر؟", en: "How do you store a password?" }, options: [{ ar: "كما هي في قاعدة البيانات", en: "As-is in the database" }, { ar: "بصمة (hash) بـ bcrypt أو argon2", en: "A hash with bcrypt or argon2" }, { ar: "في ملف نصي", en: "In a text file" }], answer: 1 },
      { id: "q2", prompt: { ar: "أين تضع مفتاح API السري؟", en: "Where does a secret API key go?" }, options: [{ ar: "في كود React", en: "In React code" }, { ar: "في متغيرات البيئة على الخادم", en: "In server environment variables" }, { ar: "في README", en: "In the README" }], answer: 1 },
      { id: "q3", prompt: { ar: "مسار محمي وصله طلب بدون تسجيل دخول:", en: "A protected route gets a request without sign-in:" }, options: [{ ar: "`401 Unauthorized`", en: "`401 Unauthorized`" }, { ar: "`200`", en: "`200`" }, { ar: "`201`", en: "`201`" }], answer: 0 },
    ],
    xp: 25,
  }),
];

export const backendExam: Exam = {
  passPercent: 80,
  questions: [
    { id: "q1", prompt: { ar: "ما رمز الحالة لإنشاء عنصر بنجاح؟", en: "Which status means an item was created?" }, options: [{ ar: "`201`", en: "`201`" }, { ar: "`404`", en: "`404`" }, { ar: "`500`", en: "`500`" }], answer: 0 },
    { id: "q2", prompt: { ar: "كيف تقرأ `:id` في المسار `/api/users/:id`؟", en: "How do you read `:id` in `/api/users/:id`?" }, options: [{ ar: "`req.params.id`", en: "`req.params.id`" }, { ar: "`req.body.id`", en: "`req.body.id`" }, { ar: "`res.id`", en: "`res.id`" }], answer: 0 },
    { id: "q3", prompt: { ar: "أين تصل بيانات طلب POST؟", en: "Where does POST data arrive?" }, options: [{ ar: "`req.body`", en: "`req.body`" }, { ar: "`req.params`", en: "`req.params`" }, { ar: "`res.json`", en: "`res.json`" }], answer: 0 },
    { id: "q4", prompt: { ar: "لماذا نتحقق من البيانات على الخادم أيضًا؟", en: "Why validate on the server too?" }, options: [{ ar: "لأن أي أحد يستطيع إرسال طلب مباشرة متجاوزًا الواجهة", en: "Anyone can send a request directly, skipping the frontend" }, { ar: "لا داعي لذلك", en: "There's no need" }, { ar: "لتسريع الصفحة", en: "To speed up the page" }], answer: 0 },
    { id: "q5", prompt: { ar: "ما الحماية من SQL Injection؟", en: "What protects against SQL injection?" }, options: [{ ar: "الاستعلامات المعلّمة أو ORM", en: "Parameterized queries or an ORM" }, { ar: "CSS", en: "CSS" }, { ar: "إطالة كلمة السر", en: "Longer passwords" }], answer: 0 },
  ],
};
