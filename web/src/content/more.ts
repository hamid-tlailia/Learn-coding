import { printed } from "./check";
import type { Exam, Lesson } from "./types";

/**
 * Deeper React and React Native lessons: conditional rendering, lifting state, context,
 * custom hooks; screens, storage, fetching data and device features.
 * Interactive checks run a short script that clicks and types, then prints `__c__` lines.
 */

const c = (logs: string[], name: string, value: string | number | boolean) => printed(logs, `__c__ ${name} ${value}`);
const reading = (l: Omit<Lesson, "files" | "starter" | "solution" | "tasks" | "hints">): Lesson => ({ ...l, files: [], starter: {}, solution: {}, tasks: [], hints: [] });

/** Wraps interaction steps: `wait()` lets React re-render between them. */
const steps = (body: string) =>
  `(async function () { var wait = function () { return new Promise(function (r) { setTimeout(r, 40); }); }; var root = document.getElementById("root"); var txt = function () { return root.textContent; }; var btn = function (label) { return Array.prototype.find.call(root.querySelectorAll("button"), function (b) { return b.textContent.trim().toLowerCase() === label.toLowerCase(); }); }; ${body} })();`;

/* ------------------------------------------------------------------ React */

export const reactMore: Lesson[] = [
  {
    slug: "conditional",
    runtime: "react",
    title: { ar: "العرض الشرطي: أظهر هذا أو ذاك", en: "Conditional rendering: show this or that" },
    body: [
      { icon: "🔀", ar: "الواجهة تتغير حسب الحالة: مستخدم مسجّل أو لا، تحميل أو بيانات، قائمة فارغة أو ممتلئة. في JSX نختار ما يظهر بتعبيرات JavaScript عادية.", en: "The interface changes with state: logged in or not, loading or loaded, an empty list or a full one. In JSX we pick what shows with plain JavaScript expressions." },
      { icon: "❓", ar: "**المعامل الثلاثي** لاختيار أحد شيئين: `{loggedIn ? <Welcome /> : <Login />}`.", en: "The **ternary operator** picks one of two things: `{loggedIn ? <Welcome /> : <Login />}`." },
      { icon: "➕", ar: "**`&&`** لإظهار شيء أو لا شيء: `{error && <p>{error}</p>}`. إذا كان `error` فارغًا لا يظهر شيء.", en: "**`&&`** shows something or nothing: `{error && <p>{error}</p>}`. If `error` is empty, nothing renders." },
      { icon: "↩️", ar: "أو **الإرجاع المبكر** داخل المكوّن: `if (loading) return <p>Loading…</p>;` ثم أكمل العرض العادي.", en: "Or **return early** inside the component: `if (loading) return <p>Loading…</p>;` then carry on with the normal render." },
    ],
    example: {
      code: 'function App() {\n  const [open, setOpen] = useState(false);\n  return (\n    <div>\n      <button onClick={() => setOpen(!open)}>{open ? "Hide" : "Show"}</button>\n      {open && <p>Surprise! 🎉</p>}\n    </div>\n  );\n}',
      note: { ar: "زر يُظهر الفقرة ويخفيها، ونصه يتغير معها.", en: "A button shows and hides the paragraph, and its label changes too." },
    },
    files: ["js"],
    starter: { js: "export default function App() {\n  \n}\n" },
    solution: {
      js: 'export default function App() {\n  const [loggedIn, setLoggedIn] = useState(false);\n\n  return (\n    <main>\n      {loggedIn ? <h1>Welcome back!</h1> : <h1>Please log in</h1>}\n      <button onClick={() => setLoggedIn(!loggedIn)}>{loggedIn ? "Log out" : "Log in"}</button>\n    </main>\n  );\n}\n',
    },
    settle: 900,
    harness: steps(`console.log("__c__ before " + /please log in/i.test(txt()) + " " + !/welcome back/i.test(txt()));
      var b = btn("log in"); console.log("__c__ login " + !!b); if (b) b.click(); await wait();
      console.log("__c__ after " + /welcome back/i.test(txt()) + " " + !/please log in/i.test(txt()));
      var o = btn("log out"); console.log("__c__ logout " + !!o); if (o) o.click(); await wait();
      console.log("__c__ back " + /please log in/i.test(txt()));`),
    tasks: [
      { id: "state", label: { ar: "حالة `loggedIn` تبدأ بـ `false`", en: "A `loggedIn` state starting at `false`" }, test: ({ files }) => /useState\(\s*false\s*\)/.test(files.js ?? "") },
      { id: "before", label: { ar: "قبل الدخول يظهر `Please log in` وزر `Log in`", en: "Before logging in: `Please log in` and a `Log in` button" }, test: ({ logs }) => c(logs, "before", "true true") && c(logs, "login", true) },
      { id: "after", label: { ar: "بعد الضغط يظهر `Welcome back!` وزر `Log out`", en: "After the click: `Welcome back!` and a `Log out` button" }, test: ({ logs }) => c(logs, "after", "true true") && c(logs, "logout", true) },
      { id: "back", label: { ar: "`Log out` يعيد الحالة الأولى", en: "`Log out` brings back the first state" }, test: ({ logs }) => c(logs, "back", true) },
    ],
    hints: [
      { ar: "`const [loggedIn, setLoggedIn] = useState(false);`", en: "`const [loggedIn, setLoggedIn] = useState(false);`" },
      { ar: '`{loggedIn ? <h1>Welcome back!</h1> : <h1>Please log in</h1>}` ونص الزر بنفس الطريقة.', en: '`{loggedIn ? <h1>Welcome back!</h1> : <h1>Please log in</h1>}` and the button label the same way.' },
    ],
    deep: {
      more: [
        { icon: "🧮", ar: "JSX يقبل **تعبيرات** فقط داخل `{ }`، لذلك لا تكتب `if` داخلها. استخدم الثلاثي أو `&&`، أو جهّز متغيرًا قبل `return`: `const message = loggedIn ? \"Hi\" : \"Login\";`.", en: "JSX only accepts **expressions** inside `{ }`, so you can't write `if` there. Use a ternary or `&&`, or prepare a variable before `return`: `const message = loggedIn ? \"Hi\" : \"Login\";`." },
        { icon: "🧩", ar: "عندما تكبر الشروط، اجعل كل حالة مكوّنًا مستقلًا: `<LoginForm />` و `<Dashboard />`. يصبح المكوّن الأب قصيرًا ويقرأ كقائمة قرارات.", en: "When conditions grow, make each state its own component: `<LoginForm />` and `<Dashboard />`. The parent stays short and reads like a list of decisions." },
        { icon: "🫥", ar: "إرجاع `null` من مكوّن يعني \"لا تعرض شيئًا\". مفيد لمكوّن مثل `<Toast>` يختفي عندما لا توجد رسالة.", en: "Returning `null` from a component means \"render nothing\". Handy for something like a `<Toast>` that hides when there's no message." },
      ],
      mistakes: [
        { ar: "`{items.length && <List />}` يعرض الرقم `0` على الشاشة عندما تكون القائمة فارغة ← استخدم `{items.length > 0 && <List />}`.", en: "`{items.length && <List />}` shows a `0` on screen when the list is empty → use `{items.length > 0 && <List />}`." },
        { ar: "كتابة `if` داخل JSX يسبب خطأ ← انقل الشرط قبل `return` أو استخدم الثلاثي.", en: "Writing `if` inside JSX is a syntax error → move the condition before `return` or use a ternary." },
        { ar: "تكرار نفس الكود في الفرعين ← ضع الجزء المشترك خارج الشرط وغيّر فقط ما يختلف.", en: "Repeating the same markup in both branches → keep the shared part outside the condition and switch only what differs." },
      ],
    },
    xp: 30,
  },
  {
    slug: "lifting-state",
    runtime: "react",
    title: { ar: "رفع الحالة: مكوّنات تتشارك البيانات", en: "Lifting state up: components that share data" },
    body: [
      { icon: "🏗️", ar: "التطبيقات الحقيقية مكوّنات كثيرة. عندما يحتاج مكوّنان **نفس البيانات**، ارفع الحالة إلى أقرب أب مشترك، ومرّرها لهما.", en: "Real apps are many components. When two components need **the same data**, lift the state to their closest shared parent and pass it down." },
      { icon: "⬇️", ar: "البيانات تنزل كـ props: `<Display value={count} />`. والتغييرات تصعد بدالة تمرّرها كـ prop: `<Controls onAdd={() => setCount(count + 1)} />`.", en: "Data flows down as props: `<Display value={count} />`. Changes flow up through a function you pass as a prop: `<Controls onAdd={() => setCount(count + 1)} />`." },
      { icon: "🎯", ar: "هكذا يبقى **مصدر حقيقة واحد**: الحالة في مكان واحد، وكل المكوّنات تعرض نفس القيمة دائمًا.", en: "That keeps **one source of truth**: the state lives in one place, and every component always shows the same value." },
    ],
    example: {
      code: 'function Display({ value }) {\n  return <h2>Likes: {value}</h2>;\n}\n\nfunction LikeButton({ onLike }) {\n  return <button onClick={onLike}>👍</button>;\n}\n\nfunction App() {\n  const [likes, setLikes] = useState(0);\n  return (\n    <div>\n      <Display value={likes} />\n      <LikeButton onLike={() => setLikes(likes + 1)} />\n    </div>\n  );\n}',
      note: { ar: "الزر والعنوان مكوّنان منفصلان، والحالة في الأب.", en: "The button and the heading are separate components; the state lives in the parent." },
    },
    files: ["js"],
    starter: { js: "function Display({ value }) {\n  \n}\n\nfunction Controls({ onAdd, onReset }) {\n  \n}\n\nexport default function App() {\n  \n}\n" },
    solution: {
      js: 'function Display({ value }) {\n  return <h2>Count: {value}</h2>;\n}\n\nfunction Controls({ onAdd, onReset }) {\n  return (\n    <div>\n      <button onClick={onAdd}>Add</button>\n      <button onClick={onReset}>Reset</button>\n    </div>\n  );\n}\n\nexport default function App() {\n  const [count, setCount] = useState(0);\n  return (\n    <main>\n      <Display value={count} />\n      <Controls onAdd={() => setCount(count + 1)} onReset={() => setCount(0)} />\n    </main>\n  );\n}\n',
    },
    settle: 900,
    harness: steps(`console.log("__c__ start " + /count:\\s*0/i.test(txt()));
      var a = btn("add"); if (a) { a.click(); await wait(); a = btn("add"); a.click(); await wait(); }
      console.log("__c__ added " + /count:\\s*2/i.test(txt()));
      var r = btn("reset"); if (r) r.click(); await wait();
      console.log("__c__ reset " + /count:\\s*0/i.test(txt()));`),
    tasks: [
      { id: "display", label: { ar: "`Display` يعرض `Count: {value}` من props", en: "`Display` shows `Count: {value}` from props" }, test: ({ logs, files }) => c(logs, "start", true) && /(function\s+Display\b|(const|let)\s+Display\s*=)/.test(files.js ?? "") },
      { id: "controls", label: { ar: "`Controls` فيه زرّا `Add` و `Reset` يستدعيان `onAdd` و `onReset`", en: "`Controls` has `Add` and `Reset` buttons calling `onAdd` and `onReset`" }, test: ({ files }) => { const js = files.js ?? ""; const calls = (name: string) => new RegExp(`onClick=\\{\\s*((\\w+\\.)?${name}\\b|\\(\\)\\s*=>\\s*\\{?\\s*(\\w+\\.)?${name}\\()`).test(js); return calls("onAdd") && calls("onReset"); } },
      { id: "state", label: { ar: "الحالة في `App` فقط، و `Add` يزيد العدد", en: "The state lives only in `App`, and `Add` increases the count" }, test: ({ logs, files }) => c(logs, "added", true) && (files.js?.match(/useState\(/g) ?? []).length === 1 },
      { id: "reset", label: { ar: "`Reset` يعيده إلى 0", en: "`Reset` sets it back to 0" }, test: ({ logs }) => c(logs, "reset", true) },
    ],
    hints: [
      { ar: "`function Display({ value }) { return <h2>Count: {value}</h2>; }`", en: "`function Display({ value }) { return <h2>Count: {value}</h2>; }`" },
      { ar: "في `App`: `<Controls onAdd={() => setCount(count + 1)} onReset={() => setCount(0)} />`", en: "In `App`: `<Controls onAdd={() => setCount(count + 1)} onReset={() => setCount(0)} />`" },
    ],
    deep: {
      more: [
        { icon: "🌊", ar: "React يعمل بـ **تدفق بيانات باتجاه واحد**: من الأب إلى الابن. هذا يجعل تتبّع الأخطاء سهلًا: إذا كانت القيمة خاطئة فابحث عند من يملك الحالة.", en: "React uses **one-way data flow**: parent to child. That makes bugs easy to trace: if a value is wrong, look at whoever owns the state." },
        { icon: "🎁", ar: "الخاصية `children` تجعل المكوّن **غلافًا**: `function Card({ children }) { return <div className=\"card\">{children}</div>; }` ثم `<Card><p>Hi</p></Card>`. هذه هي **التركيب** (composition).", en: "The `children` prop turns a component into a **wrapper**: `function Card({ children }) { return <div className=\"card\">{children}</div>; }` then `<Card><p>Hi</p></Card>`. That's **composition**." },
        { icon: "📛", ar: "سمِّ دوال الأحداث في props بـ `on…` (`onAdd`) والدوال التي تنفذها بـ `handle…` (`handleAdd`). هذا عرف يفهمه كل مطوري React.", en: "Name event props `on…` (`onAdd`) and the functions that handle them `handle…` (`handleAdd`). Every React developer recognizes this convention." },
      ],
      mistakes: [
        { ar: "نسخ نفس الحالة في مكوّنين فتختلف القيم ← ارفعها للأب واجعلها في مكان واحد.", en: "Copying the same state into two components so values drift apart → lift it to the parent and keep it in one place." },
        { ar: "`onClick={onAdd()}` يستدعي الدالة فورًا أثناء العرض ← اكتب `onClick={onAdd}` بدون أقواس.", en: "`onClick={onAdd()}` calls the function immediately during render → write `onClick={onAdd}` without parentheses." },
        { ar: "تعديل props داخل الابن (`props.value = 5`) ← props للقراءة فقط؛ اطلب التغيير من الأب بدالة.", en: "Changing props inside the child (`props.value = 5`) → props are read-only; ask the parent to change it through a function." },
      ],
    },
    xp: 30,
  },
  {
    slug: "context",
    runtime: "react",
    title: { ar: "Context: بيانات لكل التطبيق", en: "Context: data for the whole app" },
    body: [
      { icon: "🚚", ar: "تمرير prop عبر خمسة مستويات ليصل لمكوّن عميق مزعج (prop drilling). **Context** يجعل قيمة متاحة لكل المكوّنات تحته مباشرة.", en: "Passing a prop through five levels to reach a deep component is painful (prop drilling). **Context** makes a value directly available to every component below it." },
      { icon: "🏭", ar: "ثلاث خطوات: أنشئه `const ThemeContext = createContext(\"light\");`، ثم غلّف التطبيق `<ThemeContext.Provider value={theme}>`، ثم اقرأه في أي مكان `const theme = useContext(ThemeContext);`.", en: "Three steps: create it `const ThemeContext = createContext(\"light\");`, wrap the app `<ThemeContext.Provider value={theme}>`, then read it anywhere `const theme = useContext(ThemeContext);`." },
      { icon: "🎨", ar: "استخدامات شائعة: الثيم (فاتح/داكن)، اللغة، والمستخدم المسجّل. عندما تتغير قيمة الـ Provider يُعاد عرض كل من يقرأها.", en: "Common uses: the theme (light/dark), the language and the logged-in user. When the Provider's value changes, everyone reading it re-renders." },
    ],
    example: {
      code: 'const UserContext = createContext(null);\n\nfunction Avatar() {\n  const user = useContext(UserContext);\n  return <p>👤 {user}</p>;\n}\n\nfunction App() {\n  return (\n    <UserContext.Provider value="Sara">\n      <Avatar />\n    </UserContext.Provider>\n  );\n}',
      note: { ar: "`Avatar` يقرأ اسم المستخدم دون أن يمرَّر له.", en: "`Avatar` reads the user name without it being passed in." },
    },
    files: ["js"],
    starter: { js: 'const ThemeContext = createContext("light");\n\nfunction ThemeLabel() {\n  \n}\n\nexport default function App() {\n  \n}\n' },
    solution: {
      js: 'const ThemeContext = createContext("light");\n\nfunction ThemeLabel() {\n  const theme = useContext(ThemeContext);\n  return <p>Theme: {theme}</p>;\n}\n\nexport default function App() {\n  const [theme, setTheme] = useState("dark");\n  return (\n    <ThemeContext.Provider value={theme}>\n      <ThemeLabel />\n      <button onClick={() => setTheme(theme === "dark" ? "light" : "dark")}>Toggle</button>\n    </ThemeContext.Provider>\n  );\n}\n',
    },
    settle: 900,
    harness: steps(`console.log("__c__ dark " + /theme:\\s*dark/i.test(txt()));
      var t = btn("toggle"); if (t) t.click(); await wait();
      console.log("__c__ light " + /theme:\\s*light/i.test(txt()));`),
    tasks: [
      { id: "read", label: { ar: "`ThemeLabel` يقرأ السياق بـ `useContext(ThemeContext)`", en: "`ThemeLabel` reads it with `useContext(ThemeContext)`" }, test: ({ files }) => /useContext\(\s*ThemeContext\s*\)/.test(files.js ?? "") },
      { id: "provider", label: { ar: "`App` يغلّف بـ `<ThemeContext.Provider value={theme}>`", en: "`App` wraps with `<ThemeContext.Provider value={theme}>`" }, test: ({ files }) => /<ThemeContext\.Provider\s+value=\{/.test(files.js ?? "") },
      { id: "dark", label: { ar: "يبدأ بعرض `Theme: dark`", en: "It starts by showing `Theme: dark`" }, test: ({ logs }) => c(logs, "dark", true) },
      { id: "toggle", label: { ar: "زر `Toggle` يبدّله إلى `Theme: light`", en: "A `Toggle` button switches it to `Theme: light`" }, test: ({ logs }) => c(logs, "light", true) },
    ],
    hints: [
      { ar: "`const theme = useContext(ThemeContext); return <p>Theme: {theme}</p>;`", en: "`const theme = useContext(ThemeContext); return <p>Theme: {theme}</p>;`" },
      { ar: '`const [theme, setTheme] = useState("dark");` ثم `<ThemeContext.Provider value={theme}> … </ThemeContext.Provider>`', en: '`const [theme, setTheme] = useState("dark");` then `<ThemeContext.Provider value={theme}> … </ThemeContext.Provider>`' },
    ],
    deep: {
      more: [
        { icon: "🧭", ar: "القيمة الافتراضية في `createContext(\"light\")` تُستخدم فقط إذا لم يوجد Provider فوق المكوّن. مفيدة للاختبار، لكن لا تعتمد عليها في التطبيق.", en: "The default in `createContext(\"light\")` is used only when there's no Provider above the component. Useful for tests, but don't rely on it in the app." },
        { icon: "🧰", ar: "نمط احترافي: ضع الحالة والـ Provider في مكوّن خاص `ThemeProvider`، وصدّر hook جاهزًا `useTheme()` يستدعي `useContext`. هكذا لا يتعامل باقي الكود مع التفاصيل.", en: "A pro pattern: put the state and Provider in a `ThemeProvider` component, and export a ready hook `useTheme()` that calls `useContext`. The rest of the code never deals with the details." },
        { icon: "⚖️", ar: "Context ليس بديلًا عن كل props. للبيانات التي تحتاجها مكوّنات قليلة قريبة، props أوضح. احتفظ بـ Context للأشياء العامة فعلًا.", en: "Context doesn't replace all props. For data a few nearby components need, props are clearer. Keep Context for truly app-wide things." },
      ],
      mistakes: [
        { ar: "قراءة السياق في مكوّن خارج الـ Provider فتحصل على القيمة الافتراضية ← تأكد أن الـ Provider يغلّف الشجرة كلها.", en: "Reading context in a component outside the Provider gives you the default → make sure the Provider wraps the whole tree." },
        { ar: "`useContext(ThemeContext.Provider)` ← مرّر السياق نفسه: `useContext(ThemeContext)`.", en: "`useContext(ThemeContext.Provider)` → pass the context itself: `useContext(ThemeContext)`." },
        { ar: "وضع كل حالة التطبيق في Context واحد كبير يعيد عرض كل شيء ← قسّمه إلى سياقات صغيرة حسب الموضوع.", en: "Putting all app state in one big Context re-renders everything → split it into small contexts by topic." },
      ],
    },
    xp: 35,
  },
  {
    slug: "custom-hooks",
    runtime: "react",
    title: { ar: "Hooks خاصة بك: أعد استخدام المنطق", en: "Your own hooks: reuse logic" },
    body: [
      { icon: "🪝", ar: "الـ **custom hook** دالة اسمها يبدأ بـ `use` وتستخدم hooks أخرى بداخلها. تجمع منطقًا يتكرر لتستخدمه في أي مكوّن.", en: "A **custom hook** is a function whose name starts with `use` and that calls other hooks inside. It packages logic you repeat so any component can use it." },
      { icon: "🔁", ar: "مثال: `useToggle` يحفظ قيمة صح/خطأ ويُرجع دالة تقلبها: `const [open, toggle] = useToggle(false);`.", en: "Example: `useToggle` keeps a true/false value and returns a function that flips it: `const [open, toggle] = useToggle(false);`." },
      { icon: "🧠", ar: "كل مكوّن يستدعي الـ hook يحصل على **حالته الخاصة**. الـ hook يشارك المنطق، وليس البيانات.", en: "Each component that calls the hook gets **its own state**. A hook shares logic, not data." },
    ],
    example: {
      code: 'function useCounter(start) {\n  const [n, setN] = useState(start);\n  return { n, inc: () => setN(n + 1) };\n}\n\nfunction App() {\n  const a = useCounter(0);\n  const b = useCounter(10);\n  return (\n    <div>\n      <button onClick={a.inc}>A: {a.n}</button>\n      <button onClick={b.inc}>B: {b.n}</button>\n    </div>\n  );\n}',
      note: { ar: "نفس الـ hook مرتين، ولكل عدّاد حالته.", en: "The same hook twice, and each counter has its own state." },
    },
    files: ["js"],
    starter: { js: "function useToggle(initial) {\n  \n}\n\nexport default function App() {\n  \n}\n" },
    solution: {
      js: 'function useToggle(initial) {\n  const [value, setValue] = useState(initial);\n  const toggle = () => setValue((v) => !v);\n  return [value, toggle];\n}\n\nexport default function App() {\n  const [open, toggle] = useToggle(false);\n  return (\n    <main>\n      <button onClick={toggle}>Details</button>\n      {open && <p id="details">Code Master teaches web and mobile.</p>}\n    </main>\n  );\n}\n',
    },
    settle: 900,
    harness: steps(`console.log("__c__ hidden " + !root.querySelector("#details"));
      var b = btn("details"); if (b) b.click(); await wait();
      console.log("__c__ shown " + !!root.querySelector("#details"));
      b = btn("details"); if (b) b.click(); await wait();
      console.log("__c__ again " + !root.querySelector("#details"));`),
    tasks: [
      { id: "hook", label: { ar: "اكتب `useToggle(initial)` يستخدم `useState` ويُرجع `[value, toggle]`", en: "Write `useToggle(initial)` using `useState` and returning `[value, toggle]`" }, test: ({ files }) => /function\s+useToggle\s*\([\s\S]*?useState\([\s\S]*?return\s*\[/.test(files.js ?? "") },
      { id: "use", label: { ar: "استخدمه في `App`: `const [open, toggle] = useToggle(false);`", en: "Use it in `App`: `const [open, toggle] = useToggle(false);`" }, test: ({ files }) => /=\s*useToggle\(\s*false\s*\)/.test(files.js ?? "") },
      { id: "show", label: { ar: "زر `Details` يُظهر `<p id=\"details\">`", en: "A `Details` button shows `<p id=\"details\">`" }, test: ({ logs }) => c(logs, "hidden", true) && c(logs, "shown", true) },
      { id: "hide", label: { ar: "الضغط مرة أخرى يخفيه", en: "Pressing again hides it" }, test: ({ logs }) => c(logs, "again", true) },
    ],
    hints: [
      { ar: "`const [value, setValue] = useState(initial); const toggle = () => setValue((v) => !v); return [value, toggle];`", en: "`const [value, setValue] = useState(initial); const toggle = () => setValue((v) => !v); return [value, toggle];`" },
      { ar: '`{open && <p id="details">…</p>}`', en: '`{open && <p id="details">…</p>}`' },
    ],
    deep: {
      more: [
        { icon: "📏", ar: "**قواعد الـ hooks**: استدعِها في أعلى المكوّن أو الـ hook فقط، لا داخل `if` أو حلقة. React يتعرف على كل hook بترتيب استدعائه في كل عرض.", en: "**The rules of hooks**: call them only at the top of a component or hook, never inside an `if` or a loop. React identifies each hook by the order it's called on every render." },
        { icon: "🌐", ar: "hooks مفيدة في مشاريع حقيقية: `useFetch(url)` للبيانات مع التحميل والخطأ، `useLocalStorage(key)` لحفظ قيمة، `useDebounce(value)` للبحث.", en: "Useful hooks in real projects: `useFetch(url)` for data with loading and error, `useLocalStorage(key)` to persist a value, `useDebounce(value)` for search." },
        { icon: "🔄", ar: "`setValue((v) => !v)` يستخدم **التحديث الوظيفي**: يعتمد على أحدث قيمة دائمًا حتى لو تكرر الاستدعاء بسرعة. أفضل من `setValue(!value)` في الـ hooks.", en: "`setValue((v) => !v)` is a **functional update**: it always builds on the latest value, even when called quickly in a row. Safer than `setValue(!value)` inside hooks." },
      ],
      mistakes: [
        { ar: "تسمية الـ hook بدون `use` مثل `toggleHook` ← الأدوات لن تتحقق من قواعده؛ ابدأ الاسم دائمًا بـ `use`.", en: "Naming a hook without `use`, like `toggleHook` → tools won't check its rules; always start the name with `use`." },
        { ar: "استدعاء hook داخل شرط `if (show) useToggle()` ← استدعِه دائمًا، واستخدم القيمة داخل الشرط.", en: "Calling a hook inside a condition `if (show) useToggle()` → always call it, and use the value inside the condition." },
        { ar: "الظن أن مكوّنين يتشاركان نفس الحالة لأنهما يستخدمان نفس الـ hook ← لكلٍّ حالته؛ للمشاركة استخدم رفع الحالة أو Context.", en: "Assuming two components share state because they use the same hook → each has its own; to share, lift state or use Context." },
      ],
    },
    xp: 35,
  },
];

/* ------------------------------------------------------------------ React Native */

const PLACES_URL = `data:application/json,${encodeURIComponent(JSON.stringify([{ id: 1, name: "Tunis" }, { id: 2, name: "Cairo" }, { id: 3, name: "Rabat" }]))}`;

export const mobileMore: Lesson[] = [
  {
    slug: "rn-navigation",
    runtime: "native",
    title: { ar: "الشاشات والتنقل بينها", en: "Screens and navigating between them" },
    body: [
      { icon: "🗺️", ar: "التطبيق الحقيقي عدة **شاشات**: الرئيسية، الملف الشخصي، الإعدادات. التنقل يعني تبديل الشاشة الظاهرة، مع زر رجوع.", en: "A real app has several **screens**: home, profile, settings. Navigating means switching the visible screen, with a way back." },
      { icon: "📁", ar: "في Expo نستخدم **Expo Router**: كل ملف في مجلد `app/` شاشة. `app/index.tsx` هي الرئيسية و `app/profile.tsx` هي `/profile`. ننتقل بـ `<Link href=\"/profile\">` أو `router.push(\"/profile\")`، ونرجع بـ `router.back()`.", en: "In Expo we use **Expo Router**: every file in the `app/` folder is a screen. `app/index.tsx` is home and `app/profile.tsx` is `/profile`. Navigate with `<Link href=\"/profile\">` or `router.push(\"/profile\")`, and go back with `router.back()`." },
      { icon: "🧠", ar: "الفكرة تحتها بسيطة: حالة تحفظ **الشاشة الحالية**. هنا سنبنيها بأنفسنا بـ `useState(\"home\")` لنفهم ما يحدث داخل أي مكتبة تنقّل.", en: "The idea underneath is simple: state that holds the **current screen**. Here we'll build it ourselves with `useState(\"home\")` to understand what any navigation library does inside." },
    ],
    example: {
      code: 'import { View, Text, Pressable } from "react-native";\n\nfunction Home({ go }) {\n  return (\n    <View style={{ padding: 24, gap: 12 }}>\n      <Text style={{ fontSize: 24 }}>🏠 Home</Text>\n      <Pressable onPress={() => go("settings")}><Text>Open settings ›</Text></Pressable>\n    </View>\n  );\n}\n\nfunction Settings({ go }) {\n  return (\n    <View style={{ padding: 24, gap: 12 }}>\n      <Pressable onPress={() => go("home")}><Text>‹ Back</Text></Pressable>\n      <Text style={{ fontSize: 24 }}>⚙️ Settings</Text>\n    </View>\n  );\n}\n\nexport default function App() {\n  const [screen, setScreen] = useState("home");\n  return screen === "home" ? <Home go={setScreen} /> : <Settings go={setScreen} />;\n}',
      note: { ar: "اضغط لتنتقل بين الشاشتين.", en: "Tap to move between the two screens." },
    },
    files: ["js"],
    starter: { js: 'import { View, Text, Pressable } from "react-native";\n\nexport default function App() {\n  \n}\n' },
    solution: {
      js: 'import { View, Text, Pressable } from "react-native";\n\nfunction Home({ go }) {\n  return (\n    <View style={{ padding: 24, gap: 12 }}>\n      <Text style={{ fontSize: 24 }}>Home</Text>\n      <Pressable onPress={() => go("profile")}>\n        <Text>Open profile</Text>\n      </Pressable>\n    </View>\n  );\n}\n\nfunction Profile({ go }) {\n  return (\n    <View style={{ padding: 24, gap: 12 }}>\n      <Pressable onPress={() => go("home")}>\n        <Text>Back</Text>\n      </Pressable>\n      <Text style={{ fontSize: 24 }}>Profile</Text>\n    </View>\n  );\n}\n\nexport default function App() {\n  const [screen, setScreen] = useState("home");\n  return screen === "home" ? <Home go={setScreen} /> : <Profile go={setScreen} />;\n}\n',
    },
    settle: 900,
    harness: steps(`var press = function (label) { return Array.prototype.find.call(root.querySelectorAll("[data-rn=Pressable]"), function (b) { return b.textContent.trim().toLowerCase() === label; }); };
      console.log("__c__ home " + (/home/i.test(txt()) && !!press("open profile")));
      var o = press("open profile"); if (o) o.click(); await wait();
      console.log("__c__ profile " + (/profile/i.test(txt()) && !press("open profile") && !!press("back")));
      var b = press("back"); if (b) b.click(); await wait();
      console.log("__c__ back " + !!press("open profile"));`),
    tasks: [
      { id: "state", label: { ar: "حالة `screen` تبدأ بـ `\"home\"`", en: "A `screen` state starting at `\"home\"`" }, test: ({ files }) => /useState\(\s*["'`]home["'`]\s*\)/.test(files.js ?? "") },
      { id: "home", label: { ar: "شاشة Home فيها `Pressable` بنص `Open profile`", en: "A Home screen with a `Pressable` labelled `Open profile`" }, test: ({ logs }) => c(logs, "home", true) },
      { id: "profile", label: { ar: "الضغط يفتح شاشة Profile فيها زر `Back`", en: "Tapping opens a Profile screen with a `Back` button" }, test: ({ logs }) => c(logs, "profile", true) },
      { id: "back", label: { ar: "`Back` يعيد إلى Home", en: "`Back` returns to Home" }, test: ({ logs }) => c(logs, "back", true) },
    ],
    hints: [
      { ar: '`const [screen, setScreen] = useState("home");` ثم `return screen === "home" ? <Home go={setScreen} /> : <Profile go={setScreen} />;`', en: '`const [screen, setScreen] = useState("home");` then `return screen === "home" ? <Home go={setScreen} /> : <Profile go={setScreen} />;`' },
      { ar: '`<Pressable onPress={() => go("profile")}><Text>Open profile</Text></Pressable>`', en: '`<Pressable onPress={() => go("profile")}><Text>Open profile</Text></Pressable>`' },
    ],
    deep: {
      more: [
        { icon: "📚", ar: "مكتبات التنقل تحفظ **مكدّسًا** (stack) من الشاشات، لا شاشة واحدة: كل `push` يضيف شاشة فوق الأخرى، و `back` يزيل العليا. لذلك يعمل زر الرجوع في Android تلقائيًا.", en: "Navigation libraries keep a **stack** of screens, not just one: each `push` adds a screen on top, and `back` removes the top one. That's why Android's back button just works." },
        { icon: "🔗", ar: "في Expo Router، المجلد `app/(tabs)/` يصنع شريط تبويبات، والملف `app/product/[id].tsx` شاشة ديناميكية تقرأ `id` بـ `useLocalSearchParams()`.", en: "In Expo Router, an `app/(tabs)/` folder makes a tab bar, and `app/product/[id].tsx` is a dynamic screen that reads `id` with `useLocalSearchParams()`." },
        { icon: "🌍", ar: "ميزة كبيرة لـ Expo Router: كل شاشة لها رابط، فيمكن فتح التطبيق مباشرة على شاشة معينة من إشعار أو رابط ويب (deep linking).", en: "A big win of Expo Router: every screen has a URL, so a notification or a web link can open the app straight on a given screen (deep linking)." },
      ],
      mistakes: [
        { ar: "وضع كل الشاشات في ملف واحد ضخم ← اجعل كل شاشة مكوّنًا أو ملفًا مستقلًا.", en: "Putting every screen in one huge file → make each screen its own component or file." },
        { ar: "`onPress={go(\"profile\")}` ينتقل فورًا أثناء العرض ← غلّفه بدالة: `onPress={() => go(\"profile\")}`.", en: "`onPress={go(\"profile\")}` navigates immediately during render → wrap it: `onPress={() => go(\"profile\")}`." },
        { ar: "نسيان طريق للرجوع في الشاشات الفرعية ← أضف زر رجوع أو استخدم ترويسة المكدّس التي تضيفه تلقائيًا.", en: "Forgetting a way back on inner screens → add a back button or use the stack header, which adds one for you." },
      ],
    },
    xp: 35,
  },
  {
    slug: "rn-storage",
    runtime: "native",
    title: { ar: "الحفظ على الهاتف: AsyncStorage", en: "Saving on the phone: AsyncStorage" },
    body: [
      { icon: "💾", ar: "الحالة تُمسح عند إغلاق التطبيق. لحفظ إعدادات أو ملاحظات على الهاتف نستخدم **AsyncStorage**: مخزن مفاتيح وقيم نصية.", en: "State is wiped when the app closes. To keep settings or notes on the phone we use **AsyncStorage**: a store of text keys and values." },
      { icon: "📦", ar: "التثبيت: `npx expo install @react-native-async-storage/async-storage` ثم `import AsyncStorage from \"@react-native-async-storage/async-storage\";`.", en: "Install: `npx expo install @react-native-async-storage/async-storage` then `import AsyncStorage from \"@react-native-async-storage/async-storage\";`." },
      { icon: "⏳", ar: "كل دواله **غير متزامنة**: `await AsyncStorage.setItem(\"name\", name)` للحفظ، و `await AsyncStorage.getItem(\"name\")` للقراءة (تُرجع `null` إن لم يوجد).", en: "All its functions are **asynchronous**: `await AsyncStorage.setItem(\"name\", name)` to save, and `await AsyncStorage.getItem(\"name\")` to read (it returns `null` if missing)." },
      { icon: "🔄", ar: "للتحميل عند فتح الشاشة: `useEffect` ودالة async بداخله. وللكائنات احفظ `JSON.stringify(obj)` واقرأ بـ `JSON.parse(text)`.", en: "To load when the screen opens: `useEffect` with an async function inside. For objects, save `JSON.stringify(obj)` and read with `JSON.parse(text)`." },
    ],
    example: {
      code: 'import AsyncStorage from "@react-native-async-storage/async-storage";\nimport { View, Text, Pressable } from "react-native";\n\nexport default function App() {\n  const [visits, setVisits] = useState(0);\n\n  useEffect(() => {\n    async function load() {\n      const saved = await AsyncStorage.getItem("visits");\n      const n = Number(saved ?? 0) + 1;\n      setVisits(n);\n      await AsyncStorage.setItem("visits", String(n));\n    }\n    load();\n  }, []);\n\n  return <View style={{ padding: 24 }}><Text>Visits: {visits}</Text></View>;\n}',
      note: { ar: "يعدّ مرات فتح التطبيق ويحفظها.", en: "Counts app opens and saves them." },
    },
    files: ["js"],
    starter: { js: 'import AsyncStorage from "@react-native-async-storage/async-storage";\nimport { View, Text, TextInput, Pressable } from "react-native";\n\nexport default function App() {\n  \n}\n' },
    solution: {
      js: 'import AsyncStorage from "@react-native-async-storage/async-storage";\nimport { View, Text, TextInput, Pressable } from "react-native";\n\nexport default function App() {\n  const [name, setName] = useState("");\n  const [status, setStatus] = useState("");\n\n  useEffect(() => {\n    async function load() {\n      const saved = await AsyncStorage.getItem("name");\n      if (saved) setName(saved);\n    }\n    load();\n  }, []);\n\n  async function save() {\n    await AsyncStorage.setItem("name", name);\n    setStatus("Saved!");\n  }\n\n  return (\n    <View style={{ padding: 24, gap: 12 }}>\n      <TextInput value={name} onChangeText={setName} placeholder="Your name" />\n      <Pressable onPress={save}>\n        <Text>Save</Text>\n      </Pressable>\n      <Text>{status}</Text>\n    </View>\n  );\n}\n',
    },
    settle: 900,
    harness: steps(`var input = root.querySelector("[data-rn=TextInput]");
      if (input) { Object.getOwnPropertyDescriptor(HTMLInputElement.prototype, "value").set.call(input, "Omar"); input.dispatchEvent(new Event("input", { bubbles: true })); }
      await wait();
      var s = Array.prototype.find.call(root.querySelectorAll("[data-rn=Pressable]"), function (b) { return b.textContent.trim().toLowerCase() === "save"; });
      if (s) s.click(); await wait(); await wait();
      var stored = await window.AsyncStorage.getItem("name");
      console.log("__c__ stored " + stored);
      console.log("__c__ saved " + /saved!/i.test(txt()));`),
    tasks: [
      { id: "load", label: { ar: "اقرأ `name` بـ `AsyncStorage.getItem` داخل `useEffect`", en: "Read `name` with `AsyncStorage.getItem` inside `useEffect`" }, test: ({ files }) => /useEffect\([\s\S]*AsyncStorage\.getItem\(\s*["'`]name["'`]/.test(files.js ?? "") },
      { id: "input", label: { ar: "`TextInput` مربوط بحالة `name`", en: "A `TextInput` bound to a `name` state" }, test: ({ files }) => /<TextInput[\s\S]*value=\{\s*name\s*\}[\s\S]*onChangeText=/.test(files.js ?? "") || /<TextInput[\s\S]*onChangeText=[\s\S]*value=\{\s*name\s*\}/.test(files.js ?? "") },
      { id: "save", label: { ar: "زر `Save` يحفظ بـ `await AsyncStorage.setItem(\"name\", name)`", en: "A `Save` button stores it with `await AsyncStorage.setItem(\"name\", name)`" }, test: ({ logs }) => c(logs, "stored", "Omar") },
      { id: "status", label: { ar: "بعد الحفظ يظهر `Saved!`", en: "After saving, `Saved!` shows" }, test: ({ logs }) => c(logs, "saved", true) },
    ],
    hints: [
      { ar: '`useEffect(() => { async function load() { const saved = await AsyncStorage.getItem("name"); if (saved) setName(saved); } load(); }, []);`', en: '`useEffect(() => { async function load() { const saved = await AsyncStorage.getItem("name"); if (saved) setName(saved); } load(); }, []);`' },
      { ar: '`async function save() { await AsyncStorage.setItem("name", name); setStatus("Saved!"); }`', en: '`async function save() { await AsyncStorage.setItem("name", name); setStatus("Saved!"); }`' },
    ],
    deep: {
      more: [
        { icon: "🔐", ar: "AsyncStorage **غير مشفّر**. للأسرار مثل رموز الدخول استخدم `expo-secure-store` الذي يحفظ في Keychain على iOS و Keystore على Android.", en: "AsyncStorage is **not encrypted**. For secrets like login tokens use `expo-secure-store`, which saves to the Keychain on iOS and the Keystore on Android." },
        { icon: "🧱", ar: "لبيانات كثيرة أو منظّمة (آلاف السجلات، بحث، ترتيب) استخدم قاعدة بيانات محلية مثل `expo-sqlite`. AsyncStorage مناسب للإعدادات والقيم الصغيرة.", en: "For lots of structured data (thousands of records, search, sorting) use a local database like `expo-sqlite`. AsyncStorage suits settings and small values." },
        { icon: "🛡️", ar: "غلّف القراءة والكتابة بـ `try/catch`: الذاكرة قد تمتلئ، و `JSON.parse` يفشل إذا تغيّر شكل البيانات بين إصدارين من تطبيقك.", en: "Wrap reads and writes in `try/catch`: storage can fill up, and `JSON.parse` fails if the data shape changed between two versions of your app." },
      ],
      mistakes: [
        { ar: "`const name = AsyncStorage.getItem(\"name\")` بدون `await` يعطيك Promise وليس النص ← أضف `await` داخل دالة async.", en: "`const name = AsyncStorage.getItem(\"name\")` without `await` gives you a Promise, not the text → add `await` inside an async function." },
        { ar: "حفظ كائن مباشرة `setItem(\"user\", user)` فيُحفظ `[object Object]` ← استخدم `JSON.stringify(user)`.", en: "Saving an object directly `setItem(\"user\", user)` stores `[object Object]` → use `JSON.stringify(user)`." },
        { ar: "جعل دالة `useEffect` نفسها async ← عرّف دالة async بداخلها ثم استدعها.", en: "Making the `useEffect` callback itself async → define an async function inside it and call it." },
      ],
    },
    xp: 35,
  },
  {
    slug: "rn-fetch",
    runtime: "native",
    title: { ar: "جلب البيانات في التطبيق: التحميل والأخطاء", en: "Fetching data in the app: loading and errors" },
    body: [
      { icon: "🌐", ar: "معظم التطبيقات تعرض بيانات من خادم. في React Native نستخدم نفس `fetch` الذي تعرفه، داخل `useEffect`.", en: "Most apps show data from a server. In React Native we use the same `fetch` you know, inside `useEffect`." },
      { icon: "⏳", ar: "الشبكة على الهاتف قد تكون بطيئة، فاعرض **حالة تحميل**: `const [loading, setLoading] = useState(true);` و `<ActivityIndicator />` (دائرة تدور) حتى تصل البيانات.", en: "Phone networks can be slow, so show a **loading state**: `const [loading, setLoading] = useState(true);` and an `<ActivityIndicator />` (a spinner) until the data arrives." },
      { icon: "🧯", ar: "وقد تفشل الشبكة: التقط الخطأ بـ `try/catch` واعرض رسالة، ثم أوقف التحميل في `finally`.", en: "And the network can fail: catch the error with `try/catch` and show a message, then stop loading in `finally`." },
    ],
    example: {
      code: 'import { View, Text, ActivityIndicator } from "react-native";\n\nexport default function App() {\n  const [loading, setLoading] = useState(true);\n  useEffect(() => {\n    const id = setTimeout(() => setLoading(false), 1500);\n    return () => clearTimeout(id);\n  }, []);\n  return (\n    <View style={{ padding: 24 }}>\n      {loading ? <ActivityIndicator size="large" /> : <Text>Ready ✅</Text>}\n    </View>\n  );\n}',
      note: { ar: "مؤشر تحميل لثانية ونصف ثم المحتوى.", en: "A spinner for a second and a half, then the content." },
    },
    files: ["js"],
    starter: { js: `import { View, Text, FlatList, ActivityIndicator } from "react-native";\n\nconst PLACES_URL = "${PLACES_URL}";\n\nexport default function App() {\n  \n}\n` },
    solution: {
      js: `import { View, Text, FlatList, ActivityIndicator } from "react-native";\n\nconst PLACES_URL = "${PLACES_URL}";\n\nexport default function App() {\n  const [places, setPlaces] = useState([]);\n  const [loading, setLoading] = useState(true);\n  const [error, setError] = useState("");\n\n  useEffect(() => {\n    async function load() {\n      try {\n        const res = await fetch(PLACES_URL);\n        setPlaces(await res.json());\n      } catch (e) {\n        setError("Could not load places");\n      } finally {\n        setLoading(false);\n      }\n    }\n    load();\n  }, []);\n\n  if (loading) return <ActivityIndicator size="large" />;\n  if (error) return <Text>{error}</Text>;\n\n  return (\n    <FlatList\n      data={places}\n      keyExtractor={(item) => String(item.id)}\n      renderItem={({ item }) => <Text style={{ padding: 12, fontSize: 18 }}>{item.name}</Text>}\n    />\n  );\n}\n`,
    },
    settle: 1200,
    harness: `(function () {
      var root = document.getElementById("root");
      console.log("__c__ spinner " + !!root.querySelector("[data-rn=ActivityIndicator]"));
      setTimeout(function () {
        var t = root.textContent;
        console.log("__c__ list " + (/Tunis/.test(t) && /Cairo/.test(t) && /Rabat/.test(t) && !!root.querySelector("[data-rn=FlatList]")));
        console.log("__c__ done " + !root.querySelector("[data-rn=ActivityIndicator]"));
      }, 500);
    })();`,
    tasks: [
      { id: "spinner", label: { ar: "اعرض `<ActivityIndicator />` أثناء التحميل", en: "Show an `<ActivityIndicator />` while loading" }, test: ({ logs, files }) => /ActivityIndicator/.test(files.js ?? "") && (c(logs, "spinner", true) || /loading\s*\?|if\s*\(\s*loading\s*\)/.test(files.js ?? "")) },
      { id: "fetch", label: { ar: "اجلب `PLACES_URL` بـ `fetch` داخل `useEffect`", en: "Fetch `PLACES_URL` with `fetch` inside `useEffect`" }, test: ({ files }) => /useEffect\([\s\S]*fetch\(\s*PLACES_URL\s*\)/.test(files.js ?? "") },
      { id: "list", label: { ar: "اعرض أسماء المدن في `<FlatList>`", en: "Show the city names in a `<FlatList>`" }, test: ({ logs }) => c(logs, "list", true) },
      { id: "errors", label: { ar: "تعامل مع الخطأ بـ `try/catch` وأوقف التحميل بعدها", en: "Handle errors with `try/catch` and stop loading afterwards" }, test: ({ logs, files }) => /try\s*\{[\s\S]*catch\s*\(/.test(files.js ?? "") && c(logs, "done", true) },
    ],
    hints: [
      { ar: "`const [loading, setLoading] = useState(true);` و `if (loading) return <ActivityIndicator size=\"large\" />;`", en: "`const [loading, setLoading] = useState(true);` and `if (loading) return <ActivityIndicator size=\"large\" />;`" },
      { ar: "داخل `useEffect`: `try { const res = await fetch(PLACES_URL); setPlaces(await res.json()); } catch (e) { … } finally { setLoading(false); }`", en: "Inside `useEffect`: `try { const res = await fetch(PLACES_URL); setPlaces(await res.json()); } catch (e) { … } finally { setLoading(false); }`" },
    ],
    deep: {
      more: [
        { icon: "🔁", ar: "أضف إمكانية **السحب للتحديث**: `FlatList` يقبل `refreshing={loading}` و `onRefresh={load}`، وهي حركة يتوقعها كل مستخدم هاتف.", en: "Add **pull to refresh**: `FlatList` accepts `refreshing={loading}` and `onRefresh={load}`, a gesture every phone user expects." },
        { icon: "🏠", ar: "على المحاكي، `localhost` يعني الهاتف نفسه وليس حاسوبك. لخادمك المحلي استخدم عنوان IP حاسوبك في الشبكة، مثل `http://192.168.1.5:3000`.", en: "On a device or emulator, `localhost` means the phone itself, not your computer. For your local server use your computer's network IP, like `http://192.168.1.5:3000`." },
        { icon: "🧰", ar: "في التطبيقات الكبيرة يستخدم المحترفون مكتبة **TanStack Query** لإدارة التحميل والتخزين المؤقت وإعادة المحاولة تلقائيًا بدل كتابتها كل مرة.", en: "In bigger apps, pros use **TanStack Query** to handle loading, caching and retries automatically instead of hand-writing them each time." },
      ],
      mistakes: [
        { ar: "نسيان `setLoading(false)` عند الخطأ فيدور المؤشر للأبد ← ضعها في `finally`.", en: "Forgetting `setLoading(false)` on error so the spinner spins forever → put it in `finally`." },
        { ar: "طلب `http://` عادي يُرفض في الإنتاج على iOS و Android ← استخدم خوادم `https://`.", en: "Plain `http://` requests are blocked in production on iOS and Android → use `https://` servers." },
        { ar: "تحديث الحالة بعد مغادرة الشاشة ← تجاهل النتيجة إذا أُغلقت الشاشة (متغير `cancelled` في دالة التنظيف).", en: "Updating state after leaving the screen → ignore the result once the screen is gone (a `cancelled` flag set in the cleanup)." },
      ],
    },
    xp: 35,
  },
  reading({
    slug: "rn-device",
    title: { ar: "قدرات الهاتف: الكاميرا والموقع والإشعارات", en: "Phone powers: camera, location and notifications" },
    body: [
      { icon: "📸", ar: "ميزة التطبيقات على المواقع: الوصول لقدرات الهاتف. Expo يوفر مكتبات جاهزة: `expo-camera` و `expo-image-picker` للصور، `expo-location` للموقع، `expo-notifications` للإشعارات، و `expo-haptics` للاهتزاز.", en: "Apps' edge over websites: access to the phone's powers. Expo provides ready libraries: `expo-camera` and `expo-image-picker` for photos, `expo-location` for location, `expo-notifications` for notifications, and `expo-haptics` for vibration." },
      { icon: "🙋", ar: "كل قدرة حساسة تحتاج **إذن المستخدم** أولًا: `const { status } = await Location.requestForegroundPermissionsAsync();` ثم تحقق أن `status === \"granted\"` قبل الاستخدام.", en: "Every sensitive power needs the **user's permission** first: `const { status } = await Location.requestForegroundPermissionsAsync();` then check `status === \"granted\"` before using it." },
      { icon: "📍", ar: "بعد الإذن: `const pos = await Location.getCurrentPositionAsync();` يعطيك `pos.coords.latitude` و `pos.coords.longitude`. ولاختيار صورة: `await ImagePicker.launchImageLibraryAsync()`.", en: "After permission: `const pos = await Location.getCurrentPositionAsync();` gives you `pos.coords.latitude` and `pos.coords.longitude`. To pick a photo: `await ImagePicker.launchImageLibraryAsync()`." },
      { icon: "💬", ar: "اطلب الإذن **في اللحظة المناسبة** مع شرح السبب (\"لنعرض المطاعم القريبة\")، وليس عند أول فتح للتطبيق. ووفّر بديلًا إذا رفض المستخدم.", en: "Ask for permission **at the right moment** with a reason (\"to show nearby restaurants\"), not on first launch. And offer a fallback if the user says no." },
    ],
    example: {
      code: 'import * as Location from "expo-location";\n\nasync function whereAmI() {\n  const { status } = await Location.requestForegroundPermissionsAsync();\n  if (status !== "granted") {\n    return "Permission denied";\n  }\n  const pos = await Location.getCurrentPositionAsync();\n  return `${pos.coords.latitude}, ${pos.coords.longitude}`;\n}',
      note: { ar: "اطلب الإذن، ثم اقرأ الموقع.", en: "Ask for permission, then read the location." },
      lang: "none",
    },
    quiz: [
      { id: "q1", prompt: { ar: "ماذا تفعل قبل قراءة موقع المستخدم؟", en: "What do you do before reading the user's location?" }, options: [{ ar: "أطلب الإذن وأتحقق أنه `granted`", en: "Ask for permission and check it's `granted`" }, { ar: "أقرأه مباشرة", en: "Read it right away" }, { ar: "أطلب كلمة سره", en: "Ask for their password" }], answer: 0 },
      { id: "q2", prompt: { ar: "أي مكتبة لاختيار صورة من المعرض؟", en: "Which library picks a photo from the gallery?" }, options: [{ ar: "`expo-image-picker`", en: "`expo-image-picker`" }, { ar: "`expo-location`", en: "`expo-location`" }, { ar: "`expo-router`", en: "`expo-router`" }], answer: 0 },
      { id: "q3", prompt: { ar: "متى أفضل وقت لطلب الإذن؟", en: "When is the best time to ask for permission?" }, options: [{ ar: "عندما يحتاجه المستخدم مع شرح السبب", en: "When the user needs it, with a reason" }, { ar: "عند أول فتح للتطبيق دائمًا", en: "Always on first launch" }, { ar: "لا داعي للسؤال", en: "No need to ask" }], answer: 0 },
    ],
    deep: {
      more: [
        { icon: "🧪", ar: "بعض المكتبات الأصلية لا تعمل في Expo Go، وتحتاج **development build**: `npx expo run:android` أو عبر EAS. هي نسخة من تطبيقك فيها المكتبات التي تختارها.", en: "Some native libraries don't run in Expo Go and need a **development build**: `npx expo run:android` or via EAS. It's a build of your app with the libraries you choose." },
        { icon: "🔋", ar: "تتبّع الموقع المستمر يستهلك البطارية. اطلب الدقة التي تحتاجها فقط (`Accuracy.Balanced`)، وأوقف المتابعة عند مغادرة الشاشة.", en: "Continuous location tracking drains the battery. Ask only for the accuracy you need (`Accuracy.Balanced`), and stop watching when the screen closes." },
        { icon: "📝", ar: "المتاجر ترفض التطبيقات التي تطلب أذونات بلا شرح. اكتب سبب كل إذن في `app.json` (مثل `NSLocationWhenInUseUsageDescription` على iOS).", en: "Stores reject apps that request permissions without explanation. Write each permission's reason in `app.json` (like `NSLocationWhenInUseUsageDescription` on iOS)." },
      ],
      mistakes: [
        { ar: "عدم التعامل مع رفض الإذن فيتعطل التطبيق ← تحقق من `status` واعرض رسالة أو بديلًا.", en: "Not handling a denied permission so the app breaks → check `status` and show a message or a fallback." },
        { ar: "طلب كل الأذونات دفعة واحدة عند البداية ← اطلب كل إذن عندما تحتاجه الميزة فقط.", en: "Requesting every permission at once on launch → ask for each one only when its feature needs it." },
        { ar: "تجربة الكاميرا على المحاكي فقط ← جرّب على هاتف حقيقي، فالمحاكي لا يمثل الكاميرا والحساسات جيدًا.", en: "Testing the camera only on an emulator → try a real phone; emulators fake the camera and sensors poorly." },
      ],
    },
    xp: 20,
  }),
];

/** Extra exam questions for the new lessons. */
export const reactMoreExam: Exam["questions"] = [
  { id: "m1", prompt: { ar: "ماذا يعرض `{items.length && <List />}` عندما تكون المصفوفة فارغة؟", en: "What does `{items.length && <List />}` show when the array is empty?" }, options: [{ ar: "الرقم `0`", en: "The number `0`" }, { ar: "لا شيء", en: "Nothing" }, { ar: "خطأ", en: "An error" }], answer: 0 },
  { id: "m2", prompt: { ar: "مكوّنان يحتاجان نفس الحالة. أين تضعها؟", en: "Two components need the same state. Where does it go?" }, options: [{ ar: "في أقرب أب مشترك", en: "In their closest shared parent" }, { ar: "نسخة في كل مكوّن", en: "A copy in each component" }, { ar: "في متغير عام", en: "In a global variable" }], answer: 0 },
  { id: "m3", prompt: { ar: "كيف تقرأ قيمة Context؟", en: "How do you read a Context value?" }, options: [{ ar: "`useContext(MyContext)`", en: "`useContext(MyContext)`" }, { ar: "`MyContext.value`", en: "`MyContext.value`" }, { ar: "`useState(MyContext)`", en: "`useState(MyContext)`" }], answer: 0 },
];

export const mobileMoreExam: Exam["questions"] = [
  { id: "m1", prompt: { ar: "في Expo Router، ما الشاشة التي يمثلها الملف `app/profile.tsx`؟", en: "In Expo Router, which screen is the file `app/profile.tsx`?" }, options: [{ ar: "`/profile`", en: "`/profile`" }, { ar: "الرئيسية", en: "Home" }, { ar: "لا شيء", en: "None" }], answer: 0 },
  { id: "m2", prompt: { ar: "كيف تحفظ كائنًا في AsyncStorage؟", en: "How do you save an object in AsyncStorage?" }, options: [{ ar: "`setItem(\"user\", JSON.stringify(user))`", en: "`setItem(\"user\", JSON.stringify(user))`" }, { ar: "`setItem(\"user\", user)`", en: "`setItem(\"user\", user)`" }, { ar: "`save(user)`", en: "`save(user)`" }], answer: 0 },
  { id: "m3", prompt: { ar: "ماذا تعرض أثناء انتظار البيانات من الشبكة؟", en: "What do you show while waiting for network data?" }, options: [{ ar: "`<ActivityIndicator />`", en: "`<ActivityIndicator />`" }, { ar: "شاشة فارغة", en: "An empty screen" }, { ar: "رسالة خطأ", en: "An error message" }], answer: 0 },
];
