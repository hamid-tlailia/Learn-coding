import type { Exam, Lesson } from "./types";

const text = (el: Element | null) => (el?.textContent ?? "").trim();

/** A small JSON "API" as a data URL, so fetch works offline and in the sandbox. */
const POSTS_URL = `data:application/json,${encodeURIComponent(JSON.stringify([{ id: 1, title: "Learn React" }, { id: 2, title: "Build a portfolio" }, { id: 3, title: "Ship to Vercel" }]))}`;

/** React lessons run real React 18 in the preview; checks read the rendered page. */
export const reactLessons: Lesson[] = [
  {
    slug: "what-is-react",
    runtime: "react",
    title: { ar: "ما هي React؟ المكوّنات", en: "What is React? Components" },
    body: [
      { icon: "⚛️", ar: "**React** مكتبة من Meta لبناء الواجهات، وهي الأكثر طلبًا في سوق العمل. فكرتها: تقسّم الواجهة إلى **مكوّنات** (components) صغيرة قابلة لإعادة الاستخدام.", en: "**React** is Meta's library for building interfaces, and the most in-demand on the job market. The idea: split the UI into small, reusable **components**." },
      { icon: "🧩", ar: "المكوّن دالة اسمها يبدأ بحرف كبير وتُرجع ما يظهر على الشاشة: `function App() { return <h1>Hello</h1>; }`.", en: "A component is a function whose name starts with a capital letter and returns what appears on screen: `function App() { return <h1>Hello</h1>; }`." },
      { icon: "🔁", ar: "React تحدّث الصفحة تلقائيًا عندما تتغير البيانات. لا تكتب `querySelector` ولا `textContent`: تصف **كيف تبدو** الواجهة، و React تتولى التحديث.", en: "React updates the page automatically when data changes. No `querySelector`, no `textContent`: you describe **what** the UI looks like, and React handles the updates." },
    ],
    example: {
      code: 'function App() {\n  return (\n    <main>\n      <h1>Hello, React 👋</h1>\n      <p>My first component.</p>\n    </main>\n  );\n}',
      note: { ar: "مكوّن App يُرجع عنوانًا وفقرة.", en: "An App component that returns a heading and a paragraph." },
    },
    modern: {
      old: 'document.querySelector("#title").textContent = name;\ndocument.querySelector("#count").textContent = count;',
      now: "function App() {\n  return <h1>{name} ({count})</h1>;\n}",
      text: { ar: "بدل تعديل الصفحة يدويًا في كل مكان، تصف الواجهة مرة واحدة و React تبقيها متزامنة مع البيانات.", en: "Instead of editing the page by hand everywhere, you describe the UI once and React keeps it in sync with the data." },
    },
    files: ["js"],
    starter: { js: "function App() {\n  \n}\n" },
    solution: { js: "function App() {\n  return (\n    <main>\n      <h1>Hello, React</h1>\n      <p>I am building components.</p>\n    </main>\n  );\n}\n" },
    tasks: [
      { id: "h1", label: { ar: "اجعل `App` يُرجع عنوانًا `<h1>`", en: "Make `App` return an `<h1>`" }, test: ({ doc }) => text(doc.querySelector("h1")).length > 0 },
      { id: "p", label: { ar: "أضف فقرة `<p>` تحته داخل عنصر واحد يحيط بهما", en: "Add a `<p>` below it, both inside one wrapping element" }, test: ({ doc }) => !!doc.querySelector("body > * > h1 + p, body > * h1 ~ p") },
    ],
    hints: [
      { ar: "`return ( <main> <h1>Hello, React</h1> <p>…</p> </main> );`", en: "`return ( <main> <h1>Hello, React</h1> <p>…</p> </main> );`" },
      { ar: "المكوّن يُرجع عنصرًا **واحدًا** يحيط بالباقي.", en: "A component returns **one** element wrapping the rest." },
    ],
    xp: 25,
  },
  {
    slug: "jsx",
    runtime: "react",
    title: { ar: "JSX: HTML داخل JavaScript", en: "JSX: HTML inside JavaScript" },
    body: [
      { icon: "🧬", ar: "**JSX** يشبه HTML لكنه داخل JavaScript. ضع أي تعبير بين `{ }`: `<h1>Hi {name}</h1>` أو `<p>{2 + 3}</p>`.", en: "**JSX** looks like HTML but lives in JavaScript. Put any expression in `{ }`: `<h1>Hi {name}</h1>` or `<p>{2 + 3}</p>`." },
      { icon: "🏷️", ar: "فروق مهمة: `className` بدل `class`، وكل وسم يجب إغلاقه حتى `<img />`، و `style` يأخذ كائنًا: `style={{ color: \"red\" }}`.", en: "Key differences: `className` instead of `class`, every tag must close even `<img />`, and `style` takes an object: `style={{ color: \"red\" }}`." },
      { icon: "❓", ar: "العرض الشرطي: `{isOnline && <span>🟢</span>}` يظهر فقط إذا كان الشرط صحيحًا، و `{x ? <A /> : <B />}` يختار بين اثنين.", en: "Conditional rendering: `{isOnline && <span>🟢</span>}` shows only when true, and `{x ? <A /> : <B />}` picks one of two." },
    ],
    example: {
      code: 'const user = { name: "Sara", online: true };\n\nfunction App() {\n  return (\n    <div className="card">\n      <h1>Hi {user.name}</h1>\n      {user.online && <span>🟢 Online</span>}\n      <p>{user.online ? "Say hello!" : "Away"}</p>\n    </div>\n  );\n}',
      note: { ar: "متغيرات داخل JSX، وعرض شرطي.", en: "Variables in JSX, and conditional rendering." },
    },
    files: ["js", "css"],
    starter: { js: 'const course = { title: "React", lessons: 8, isNew: true };\n\nfunction App() {\n  \n}\n', css: ".card {\n  padding: 16px;\n  border-radius: 16px;\n  background: #eef;\n}\n" },
    solution: {
      js: 'const course = { title: "React", lessons: 8, isNew: true };\n\nfunction App() {\n  return (\n    <div className="card">\n      <h1>{course.title}</h1>\n      <p>{course.lessons} lessons</p>\n      {course.isNew && <span>NEW</span>}\n    </div>\n  );\n}\n',
      css: ".card {\n  padding: 16px;\n  border-radius: 16px;\n  background: #eef;\n}\n",
    },
    tasks: [
      { id: "class", label: { ar: "غلّف المحتوى بـ `<div className=\"card\">`", en: "Wrap the content in `<div className=\"card\">`" }, test: ({ doc }) => !!doc.querySelector("div.card") },
      { id: "expr", label: { ar: "اعرض `course.title` في `<h1>` و `course.lessons` في `<p>`", en: "Show `course.title` in an `<h1>` and `course.lessons` in a `<p>`" }, test: ({ doc }) => text(doc.querySelector(".card h1")) === "React" && /8/.test(text(doc.querySelector(".card p"))) },
      { id: "cond", label: { ar: "اعرض `<span>NEW</span>` فقط إذا كان `course.isNew`", en: "Show `<span>NEW</span>` only when `course.isNew`" }, test: ({ doc, files }) => /course\.isNew\s*(&&|\?)/.test(files.js ?? "") && text(doc.querySelector(".card span")) === "NEW" },
    ],
    hints: [
      { ar: '`<div className="card"><h1>{course.title}</h1><p>{course.lessons} lessons</p></div>`', en: '`<div className="card"><h1>{course.title}</h1><p>{course.lessons} lessons</p></div>`' },
      { ar: "`{course.isNew && <span>NEW</span>}`", en: "`{course.isNew && <span>NEW</span>}`" },
    ],
    xp: 30,
  },
  {
    slug: "props",
    runtime: "react",
    title: { ar: "الخصائص: props", en: "Props" },
    body: [
      { icon: "📮", ar: "**props** هي مدخلات المكوّن، مثل معاملات الدالة: `<Card title=\"HTML\" />`. داخل المكوّن تقرأها: `function Card({ title }) { … }`.", en: "**Props** are a component's inputs, like function parameters: `<Card title=\"HTML\" />`. Inside, read them: `function Card({ title }) { … }`." },
      { icon: "♻️", ar: "هكذا تكتب مكوّنًا مرة وتستخدمه مرات ببيانات مختلفة: بطاقة لكل دورة، زر لكل إجراء.", en: "That's how you write a component once and reuse it with different data: a card per course, a button per action." },
      { icon: "📦", ar: "الخاصية الخاصة `children` هي ما تضعه بين وسمي المكوّن: `<Card>Text</Card>`. و props للقراءة فقط: لا تعدّلها داخل المكوّن.", en: "The special prop `children` is whatever you put between the tags: `<Card>Text</Card>`. Props are read-only: never change them inside the component." },
    ],
    example: {
      code: 'function Badge({ label, color }) {\n  return <span style={{ background: color, color: "white", padding: "2px 8px", borderRadius: 99 }}>{label}</span>;\n}\n\nfunction App() {\n  return (\n    <p>\n      <Badge label="HTML" color="tomato" /> <Badge label="CSS" color="royalblue" />\n    </p>\n  );\n}',
      note: { ar: "مكوّن واحد، استُخدم مرتين ببيانات مختلفة.", en: "One component, used twice with different data." },
    },
    files: ["js"],
    starter: { js: "function Course({ title, level }) {\n  \n}\n\nfunction App() {\n  return (\n    <section>\n      \n    </section>\n  );\n}\n" },
    solution: {
      js: 'function Course({ title, level }) {\n  return (\n    <article className="course">\n      <h2>{title}</h2>\n      <p>{level}</p>\n    </article>\n  );\n}\n\nfunction App() {\n  return (\n    <section>\n      <Course title="HTML" level="Beginner" />\n      <Course title="React" level="Intermediate" />\n    </section>\n  );\n}\n',
    },
    tasks: [
      { id: "component", label: { ar: "اجعل `Course` يُرجع `<article className=\"course\">` فيه `<h2>{title}</h2>`", en: "Make `Course` return `<article className=\"course\">` with `<h2>{title}</h2>`" }, test: ({ doc }) => !!doc.querySelector("article.course h2") },
      { id: "twice", label: { ar: "استخدم `<Course />` مرتين بعنوانين مختلفين", en: "Use `<Course />` twice with different titles" }, test: ({ doc }) => { const t = Array.from(doc.querySelectorAll("article.course h2")).map(text); return t.length >= 2 && new Set(t).size >= 2; } },
      { id: "level", label: { ar: "اعرض `level` أيضًا داخل كل بطاقة", en: "Show `level` inside each card too" }, test: ({ doc }) => Array.from(doc.querySelectorAll("article.course")).every((a) => text(a.querySelector("p")).length > 0) && doc.querySelectorAll("article.course").length >= 2 },
    ],
    hints: [
      { ar: '`return <article className="course"><h2>{title}</h2><p>{level}</p></article>;`', en: '`return <article className="course"><h2>{title}</h2><p>{level}</p></article>;`' },
      { ar: '`<Course title="HTML" level="Beginner" />` ثم واحدة أخرى', en: '`<Course title="HTML" level="Beginner" />` then another one' },
    ],
    xp: 30,
  },
  {
    slug: "state",
    runtime: "react",
    title: { ar: "الحالة: useState", en: "State: useState" },
    body: [
      { icon: "🧠", ar: "**الحالة** (state) بيانات يتذكرها المكوّن وتتغير: عدد الضغطات، نص البحث، هل القائمة مفتوحة. عند تغيّرها يعيد React رسم المكوّن.", en: "**State** is data a component remembers that changes: a click count, search text, whether a menu is open. When it changes, React re-renders the component." },
      { icon: "🪝", ar: "`const [count, setCount] = useState(0);` تعطيك القيمة الحالية ودالة لتغييرها. القيمة `0` هي البداية.", en: "`const [count, setCount] = useState(0);` gives you the current value and a function to change it. `0` is the starting value." },
      { icon: "👆", ar: "الأحداث في React بأسماء camelCase: `<button onClick={() => setCount(count + 1)}>`. لا تعدّل `count` مباشرة، استخدم دائمًا `setCount`.", en: "React events are camelCase: `<button onClick={() => setCount(count + 1)}>`. Never change `count` directly; always use `setCount`." },
    ],
    example: {
      code: 'import { useState } from "react";\n\nexport default function App() {\n  const [likes, setLikes] = useState(0);\n  return (\n    <button onClick={() => setLikes(likes + 1)}>\n      ❤️ {likes}\n    </button>\n  );\n}',
      note: { ar: "زر يزيد العدد عند كل ضغطة. جرّب الضغط عليه.", en: "A button that counts every click. Try it." },
    },
    modern: {
      old: "class App extends React.Component {\n  state = { count: 0 };\n  render() { … this.setState(…) }\n}",
      now: "function App() {\n  const [count, setCount] = useState(0);\n}",
      text: { ar: "الـ Hooks جعلت المكوّنات دوال بسيطة بدل أصناف طويلة. كل كود React الحديث يستخدمها.", en: "Hooks turned components into simple functions instead of long classes. All modern React code uses them." },
      since: "React 16.8",
    },
    files: ["js"],
    starter: { js: 'import { useState } from "react";\n\nexport default function App() {\n  \n}\n' },
    solution: {
      js: 'import { useState } from "react";\n\nexport default function App() {\n  const [count, setCount] = useState(0);\n  return (\n    <div>\n      <p>Count: {count}</p>\n      <button onClick={() => setCount(count + 1)}>Add</button>\n    </div>\n  );\n}\n',
    },
    harness: 'document.querySelector("button") && document.querySelector("button").click();',
    tasks: [
      { id: "state", label: { ar: "أنشئ حالة `count` تبدأ من 0 بـ `useState`", en: "Create a `count` state starting at 0 with `useState`" }, test: ({ files }) => /useState\(\s*0\s*\)/.test(files.js ?? "") },
      { id: "show", label: { ar: "اعرض العدد في `<p>Count: {count}</p>`", en: "Show it in `<p>Count: {count}</p>`" }, test: ({ doc }) => /Count:\s*\d/.test(text(doc.querySelector("p"))) },
      { id: "click", label: { ar: "زر `<button>` يزيد العدد عند الضغط", en: "A `<button>` that adds one on click" }, test: ({ doc }) => /Count:\s*1\b/.test(text(doc.querySelector("p"))) },
    ],
    hints: [
      { ar: "`const [count, setCount] = useState(0);`", en: "`const [count, setCount] = useState(0);`" },
      { ar: "`<button onClick={() => setCount(count + 1)}>Add</button>`", en: "`<button onClick={() => setCount(count + 1)}>Add</button>`" },
    ],
    xp: 35,
  },
  {
    slug: "lists-keys",
    runtime: "react",
    title: { ar: "القوائم والمفاتيح: map و key", en: "Lists and keys: map and key" },
    body: [
      { icon: "📋", ar: "لعرض قائمة من البيانات، حوّل المصفوفة إلى عناصر بـ `map`: `{todos.map((t) => <li>{t.text}</li>)}`.", en: "To show a list of data, map the array to elements: `{todos.map((t) => <li>{t.text}</li>)}`." },
      { icon: "🔑", ar: "كل عنصر في القائمة يحتاج `key` فريدًا وثابتًا، غالبًا `id`: `<li key={t.id}>`. يساعد React على معرفة ما تغيّر بسرعة.", en: "Each list item needs a unique, stable `key`, usually its `id`: `<li key={t.id}>`. It lets React see quickly what changed." },
      { icon: "🧹", ar: "صفِّ قبل العرض: `todos.filter((t) => !t.done).map(…)` يعرض المهام غير المكتملة فقط.", en: "Filter before rendering: `todos.filter((t) => !t.done).map(…)` shows only unfinished tasks." },
    ],
    example: {
      code: 'const langs = [\n  { id: 1, name: "HTML" },\n  { id: 2, name: "CSS" },\n  { id: 3, name: "JS" },\n];\n\nfunction App() {\n  return (\n    <ul>\n      {langs.map((l) => (\n        <li key={l.id}>{l.name}</li>\n      ))}\n    </ul>\n  );\n}',
      note: { ar: "مصفوفة تتحول إلى قائمة.", en: "An array turned into a list." },
    },
    files: ["js"],
    starter: { js: 'const todos = [\n  { id: 1, text: "Learn JSX", done: true },\n  { id: 2, text: "Learn state", done: false },\n  { id: 3, text: "Build a project", done: false },\n];\n\nfunction App() {\n  \n}\n' },
    solution: {
      js: 'const todos = [\n  { id: 1, text: "Learn JSX", done: true },\n  { id: 2, text: "Learn state", done: false },\n  { id: 3, text: "Build a project", done: false },\n];\n\nfunction App() {\n  return (\n    <ul>\n      {todos\n        .filter((t) => !t.done)\n        .map((t) => (\n          <li key={t.id}>{t.text}</li>\n        ))}\n    </ul>\n  );\n}\n',
    },
    tasks: [
      { id: "map", label: { ar: "اعرض المهام كعناصر `<li>` باستخدام `map`", en: "Render tasks as `<li>` items with `map`" }, test: ({ doc, files }) => /\.map\(/.test(files.js ?? "") && doc.querySelectorAll("li").length > 0 },
      { id: "key", label: { ar: "أعطِ كل `<li>` مفتاح `key={t.id}`", en: "Give each `<li>` a `key={t.id}`" }, test: ({ files }) => /key=\{\s*\w+\.id\s*\}/.test(files.js ?? "") },
      { id: "filter", label: { ar: "اعرض غير المكتملة فقط (عنصران)", en: "Show only unfinished ones (2 items)" }, test: ({ doc }) => doc.querySelectorAll("li").length === 2 && !/Learn JSX/.test(doc.body.textContent ?? "") },
    ],
    hints: [
      { ar: "`<ul>{todos.map((t) => <li key={t.id}>{t.text}</li>)}</ul>`", en: "`<ul>{todos.map((t) => <li key={t.id}>{t.text}</li>)}</ul>`" },
      { ar: "قبل `map` أضف `.filter((t) => !t.done)`", en: "Before `map`, add `.filter((t) => !t.done)`" },
    ],
    xp: 30,
  },
  {
    slug: "forms-react",
    runtime: "react",
    title: { ar: "النماذج في React: حقول متحكم بها", en: "Forms in React: controlled inputs" },
    body: [
      { icon: "⌨️", ar: "الحقل **المتحكم به** (controlled) قيمته تأتي من الحالة: `<input value={name} onChange={(e) => setName(e.target.value)} />`.", en: "A **controlled** input takes its value from state: `<input value={name} onChange={(e) => setName(e.target.value)} />`." },
      { icon: "⚡", ar: "هكذا تعرف ما يكتبه المستخدم لحظة بلحظة: تعرضه مباشرة، تتحقق منه، أو تعطل زر الإرسال حتى يصبح صالحًا.", en: "That way you know what the user types, keystroke by keystroke: show it live, validate it, or disable the submit button until it's valid." },
      { icon: "📨", ar: "عند الإرسال: `<form onSubmit={(e) => { e.preventDefault(); … }}>`. الدالة `preventDefault` تمنع إعادة تحميل الصفحة.", en: "On submit: `<form onSubmit={(e) => { e.preventDefault(); … }}>`. `preventDefault` stops the page from reloading." },
    ],
    example: {
      code: 'import { useState } from "react";\n\nexport default function App() {\n  const [city, setCity] = useState("");\n  return (\n    <div>\n      <input value={city} onChange={(e) => setCity(e.target.value)} placeholder="Your city" />\n      <p>{city ? `You live in ${city}` : "Type your city"}</p>\n    </div>\n  );\n}',
      note: { ar: "النص يتحدّث مع كل حرف تكتبه.", en: "The text updates with every letter you type." },
    },
    files: ["js"],
    starter: { js: 'import { useState } from "react";\n\nexport default function App() {\n  \n}\n' },
    solution: {
      js: 'import { useState } from "react";\n\nexport default function App() {\n  const [name, setName] = useState("");\n  return (\n    <form onSubmit={(e) => e.preventDefault()}>\n      <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Name" />\n      <p>Hello, {name}</p>\n      <button disabled={name.length < 2}>Join</button>\n    </form>\n  );\n}\n',
    },
    harness: 'var i = document.querySelector("input"); if (i) { Object.getOwnPropertyDescriptor(HTMLInputElement.prototype, "value").set.call(i, "Sara"); i.dispatchEvent(new Event("input", { bubbles: true })); }',
    tasks: [
      { id: "controlled", label: { ar: "اجعل `<input>` متحكمًا به بـ `value` و `onChange`", en: "Make the `<input>` controlled with `value` and `onChange`" }, test: ({ files }) => /value=\{\s*\w+\s*\}/.test(files.js ?? "") && /onChange=\{/.test(files.js ?? "") },
      { id: "live", label: { ar: "اعرض `Hello, {name}` في `<p>` يتحدّث مع الكتابة", en: "Show `Hello, {name}` in a `<p>` that updates live" }, test: ({ doc }) => text(doc.querySelector("p")) === "Hello, Sara" },
      { id: "disabled", label: { ar: "زر يكون معطلًا حتى يكون الاسم حرفين على الأقل", en: "A button disabled until the name has at least 2 letters" }, test: ({ files, doc }) => /disabled=\{/.test(files.js ?? "") && !!doc.querySelector("button") && !doc.querySelector("button[disabled]") },
    ],
    hints: [
      { ar: '`const [name, setName] = useState("");` و `<input value={name} onChange={(e) => setName(e.target.value)} />`', en: '`const [name, setName] = useState("");` and `<input value={name} onChange={(e) => setName(e.target.value)} />`' },
      { ar: "`<button disabled={name.length < 2}>Join</button>`", en: "`<button disabled={name.length < 2}>Join</button>`" },
    ],
    xp: 35,
  },
  {
    slug: "effects",
    runtime: "react",
    title: { ar: "التأثيرات وجلب البيانات: useEffect", en: "Effects and data: useEffect" },
    body: [
      { icon: "🔌", ar: "`useEffect` لتنفيذ شيء **بعد** عرض المكوّن: جلب بيانات، مؤقت، الاشتراك في حدث.", en: "`useEffect` runs something **after** the component renders: fetching data, a timer, subscribing to an event." },
      { icon: "📋", ar: "المصفوفة في آخره تحدد متى يعمل: `[]` مرة واحدة عند الظهور، و `[userId]` كلما تغيّر `userId`.", en: "The array at the end says when it runs: `[]` once on mount, `[userId]` every time `userId` changes." },
      { icon: "⏳", ar: "النمط المعتاد: حالة للبيانات وحالة للتحميل. اعرض «جارٍ التحميل…» حتى تصل البيانات، ثم اعرضها.", en: "The usual pattern: one state for data and one for loading. Show \"Loading…\" until the data arrives, then render it." },
    ],
    example: {
      code: `import { useEffect, useState } from "react";\n\nconst POSTS_URL = "${POSTS_URL}";\n\nexport default function App() {\n  const [posts, setPosts] = useState([]);\n  useEffect(() => {\n    fetch(POSTS_URL).then((r) => r.json()).then(setPosts);\n  }, []);\n  return <ul>{posts.map((p) => <li key={p.id}>{p.title}</li>)}</ul>;\n}`,
      note: { ar: "جلب المقالات مرة واحدة عند الظهور، ثم عرضها.", en: "Fetch posts once on mount, then show them." },
    },
    files: ["js"],
    starter: { js: `import { useEffect, useState } from "react";\n\nconst POSTS_URL = "${POSTS_URL}";\n\nexport default function App() {\n  \n}\n` },
    solution: {
      js: `import { useEffect, useState } from "react";\n\nconst POSTS_URL = "${POSTS_URL}";\n\nexport default function App() {\n  const [posts, setPosts] = useState([]);\n  const [loading, setLoading] = useState(true);\n\n  useEffect(() => {\n    async function load() {\n      const res = await fetch(POSTS_URL);\n      setPosts(await res.json());\n      setLoading(false);\n    }\n    load();\n  }, []);\n\n  if (loading) return <p>Loading…</p>;\n  return (\n    <ul>\n      {posts.map((p) => (\n        <li key={p.id}>{p.title}</li>\n      ))}\n    </ul>\n  );\n}\n`,
    },
    tasks: [
      { id: "effect", label: { ar: "اجلب `POSTS_URL` داخل `useEffect` مع `[]`", en: "Fetch `POSTS_URL` inside `useEffect` with `[]`" }, test: ({ files }) => /useEffect\(/.test(files.js ?? "") && /fetch\(\s*POSTS_URL/.test(files.js ?? "") && /\},\s*\[\s*\]\s*\)/.test(files.js ?? "") },
      { id: "loading", label: { ar: "اعرض «Loading…» أثناء التحميل بحالة `loading`", en: "Show \"Loading…\" while loading, with a `loading` state" }, test: ({ files }) => /useState\(\s*true\s*\)/.test(files.js ?? "") && /Loading/.test(files.js ?? "") },
      { id: "list", label: { ar: "اعرض العناوين الثلاثة في `<li>`", en: "Show the three titles in `<li>` items" }, test: ({ doc }) => doc.querySelectorAll("li").length === 3 },
    ],
    hints: [
      { ar: "`useEffect(() => { async function load() { … } load(); }, []);`", en: "`useEffect(() => { async function load() { … } load(); }, []);`" },
      { ar: "`if (loading) return <p>Loading…</p>;` ثم القائمة", en: "`if (loading) return <p>Loading…</p>;` then the list" },
    ],
    xp: 40,
  },
  {
    slug: "nextjs",
    title: { ar: "Next.js: من React إلى موقع كامل", en: "Next.js: from React to a full site" },
    body: [
      { icon: "▲", ar: "**Next.js** إطار عمل مبني على React يضيف ما يحتاجه موقع حقيقي: صفحات وروابط، تحميل سريع، تحسين لمحركات البحث، ونشر سهل. هذا التطبيق نفسه مبني به.", en: "**Next.js** is a framework on top of React that adds what a real site needs: pages and routes, fast loading, SEO, and easy deployment. This very app is built with it." },
      { icon: "📁", ar: "التوجيه بالملفات: المجلد `app/about/page.tsx` يصبح الصفحة `/about` تلقائيًا. و `<Link href=\"/about\">` للتنقل دون إعادة تحميل.", en: "File-based routing: the folder `app/about/page.tsx` automatically becomes the `/about` page. `<Link href=\"/about\">` navigates without a reload." },
      { icon: "🖥️", ar: "**مكوّنات الخادم** (Server Components) تعمل على الخادم وتجلب البيانات قبل الإرسال، فتصل الصفحة جاهزة وسريعة. ومكوّن فيه `useState` يبدأ بالسطر `\"use client\"`.", en: "**Server Components** run on the server and fetch data before sending, so pages arrive ready and fast. A component with `useState` starts with `\"use client\"`." },
      { icon: "🚀", ar: "ابدأ مشروعًا بـ `npx create-next-app@latest`، وانشره على **Vercel** بربط مستودع GitHub: كل push ينشر نسخة جديدة.", en: "Start a project with `npx create-next-app@latest`, and deploy to **Vercel** by connecting your GitHub repo: every push ships a new version." },
    ],
    files: [],
    starter: {},
    solution: {},
    tasks: [],
    hints: [],
    quiz: [
      { id: "q1", prompt: { ar: "أي ملف يصبح الصفحة `/contact`؟", en: "Which file becomes the `/contact` page?" }, options: [{ ar: "`app/contact/page.tsx`", en: "`app/contact/page.tsx`" }, { ar: "`contact.html`", en: "`contact.html`" }, { ar: "`app/page.tsx`", en: "`app/page.tsx`" }], answer: 0 },
      { id: "q2", prompt: { ar: "مكوّن يستخدم `useState` في Next.js يحتاج في أوله:", en: "A Next.js component using `useState` needs at the top:" }, options: [{ ar: "`\"use client\"`", en: "`\"use client\"`" }, { ar: "`\"use server\"`", en: "`\"use server\"`" }, { ar: "لا شيء", en: "Nothing" }], answer: 0 },
      { id: "q3", prompt: { ar: "أين تنشر مشروع Next.js بسهولة؟", en: "Where do you easily deploy a Next.js project?" }, options: [{ ar: "Vercel", en: "Vercel" }, { ar: "داخل ملف CSS", en: "Inside a CSS file" }, { ar: "على USB", en: "On a USB stick" }], answer: 0 },
    ],
    xp: 20,
  },
];

export const reactExam: Exam = {
  passPercent: 80,
  questions: [
    { id: "q1", prompt: { ar: "ما الاسم الصحيح لمكوّن React؟", en: "Which is a valid React component name?" }, options: [{ ar: "`userCard`", en: "`userCard`" }, { ar: "`UserCard`", en: "`UserCard`" }, { ar: "`user-card`", en: "`user-card`" }], answer: 1 },
    { id: "q2", prompt: { ar: "في JSX، كيف تضع class؟", en: "In JSX, how do you set a class?" }, options: [{ ar: "`class=\"card\"`", en: "`class=\"card\"`" }, { ar: "`className=\"card\"`", en: "`className=\"card\"`" }, { ar: "`css=\"card\"`", en: "`css=\"card\"`" }], answer: 1 },
    { id: "q3", prompt: { ar: "ماذا يُرجع `useState(0)`؟", en: "What does `useState(0)` return?" }, options: [{ ar: "القيمة ودالة لتغييرها", en: "The value and a function to change it" }, { ar: "رقمًا فقط", en: "Just a number" }, { ar: "مكوّنًا", en: "A component" }], answer: 0 },
    { id: "q4", prompt: { ar: "لماذا نضع `key` على عناصر القائمة؟", en: "Why put a `key` on list items?" }, options: [{ ar: "ليعرف React ما تغيّر بكفاءة", en: "So React can tell what changed efficiently" }, { ar: "لتلوينها", en: "To color them" }, { ar: "لا حاجة له", en: "It's not needed" }], answer: 0 },
    { id: "q5", prompt: { ar: "`useEffect(() => {…}, [])` يعمل:", en: "`useEffect(() => {…}, [])` runs:" }, options: [{ ar: "مرة واحدة بعد أول عرض", en: "Once, after the first render" }, { ar: "عند كل ضغطة", en: "On every click" }, { ar: "أبدًا", en: "Never" }], answer: 0 },
    { id: "q6", prompt: { ar: "كيف تمرر عنوانًا إلى مكوّن Card؟", en: "How do you pass a title to a Card component?" }, options: [{ ar: '`<Card title="Hi" />`', en: '`<Card title="Hi" />`' }, { ar: "`Card.title = \"Hi\"`", en: "`Card.title = \"Hi\"`" }, { ar: '`<Card>{title: "Hi"}</Card>`', en: '`<Card>{title: "Hi"}</Card>`' }], answer: 0 },
  ],
};
