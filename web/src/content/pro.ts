import type { Exam, Lesson } from "./types";

/** The mastery stage: habits that turn someone who can code into a professional developer. */
import { printed } from "./check";
const reading = (l: Omit<Lesson, "files" | "starter" | "solution" | "tasks" | "hints">): Lesson => ({ ...l, files: [], starter: {}, solution: {}, tasks: [], hints: [] });

const TEST_HELPERS =
  '// A tiny test runner, like Jest or Vitest\nfunction test(name, fn) {\n  try { fn(); console.log("✅", name); }\n  catch (e) { console.log("❌", name, "-", e.message); }\n}\nfunction expect(actual) {\n  return { toBe(expected) { if (actual !== expected) throw new Error(`expected ${expected}, got ${actual}`); } };\n}\n';

const TODO_HTML =
  '<main>\n  <h1>My tasks <span id="count">0</span></h1>\n  <form id="todo-form">\n    <input id="todo-input" placeholder="New task…" />\n    <button>Add</button>\n  </form>\n  <ul id="todo-list"></ul>\n</main>\n';

const TODO_CSS =
  'body { font-family: system-ui, sans-serif; background: #0a0f24; color: #e2e8f0; padding: 24px; }\nmain { max-width: 420px; margin: auto; }\n#count { background: #8b5cf6; border-radius: 99px; padding: 2px 10px; font-size: 16px; }\nform { display: flex; gap: 8px; }\ninput { flex: 1; padding: 10px; border-radius: 10px; border: 1px solid #334155; background: #111833; color: inherit; }\nbutton { padding: 10px 16px; border: 0; border-radius: 10px; background: #22d3ee; color: #0a0f24; font-weight: bold; }\nli { display: flex; justify-content: space-between; padding: 10px; margin-top: 8px; border-radius: 10px; background: #111833; list-style: none; }\nli.done span { text-decoration: line-through; opacity: .5; }\n';

export const proLessons: Lesson[] = [
  reading({
    slug: "clean-code",
    title: { ar: "الكود النظيف: اكتب لزميلك لا للحاسوب", en: "Clean code: write for people, not the computer" },
    body: [
      { icon: "🏷️", ar: "**الأسماء أهم شيء.** `const d = 7` لا تعني شيئًا، أما `const daysUntilExam = 7` فتشرح نفسها. الدوال أفعال: `getUser` و `sendEmail`، والقيم المنطقية أسئلة: `isLoggedIn` و `hasError`.", en: "**Names matter most.** `const d = 7` means nothing; `const daysUntilExam = 7` explains itself. Functions are verbs, like `getUser` and `sendEmail`, and booleans are questions, like `isLoggedIn` and `hasError`." },
      { icon: "✂️", ar: "**دالة واحدة = مهمة واحدة.** إذا احتجت كلمة \"و\" لوصف دالتك فقسّمها. الدوال القصيرة أسهل في الفهم والاختبار وإعادة الاستخدام.", en: "**One function = one job.** If you need the word \"and\" to describe a function, split it. Short functions are easier to read, test and reuse." },
      { icon: "↩️", ar: "**الخروج المبكر** بدل التداخل: `if (!user) return;` في البداية أوضح من ثلاث طبقات `if` متداخلة.", en: "**Return early** instead of nesting: `if (!user) return;` at the top is clearer than three nested `if` blocks." },
      { icon: "♻️", ar: "**لا تكرر نفسك (DRY)**: إذا نسخت نفس الكود ثلاث مرات فاجعله دالة. لكن لا تبالغ: التبسيط أهم من الذكاء.", en: "**Don't repeat yourself (DRY)**: if you paste the same code three times, make it a function. But don't overdo it: simple beats clever." },
      { icon: "🧰", ar: "دع الأدوات تعمل عنك: **Prettier** ينسّق الكود تلقائيًا، و **ESLint** ينبّهك إلى الأخطاء قبل تشغيلها.", en: "Let tools do the work: **Prettier** formats your code automatically, and **ESLint** flags mistakes before you run them." },
    ],
    example: {
      code: '// ❌ Hard to read\nfunction f(u) {\n  if (u) {\n    if (u.age >= 18) {\n      return true;\n    }\n  }\n  return false;\n}\n\n// ✅ Clean\nfunction isAdult(user) {\n  if (!user) return false;\n  return user.age >= 18;\n}\n\nconsole.log(isAdult({ age: 20 }));',
      note: { ar: "نفس النتيجة، لكن الثانية تُقرأ كجملة.", en: "Same result, but the second reads like a sentence." },
      lang: "js",
    },
    quiz: [
      { id: "q1", prompt: { ar: "أي اسم أفضل لمتغير منطقي؟", en: "Which is the best name for a boolean?" }, options: [{ ar: "`isVisible`", en: "`isVisible`" }, { ar: "`v`", en: "`v`" }, { ar: "`flag2`", en: "`flag2`" }], answer: 0 },
      { id: "q2", prompt: { ar: "دالتك \"تتحقق من البيانات وترسل بريدًا وتحفظ في القاعدة\". ماذا تفعل؟", en: "Your function \"validates data and sends an email and saves to the DB\". What do you do?" }, options: [{ ar: "أقسّمها إلى ثلاث دوال", en: "Split it into three functions" }, { ar: "أتركها، تعمل", en: "Leave it, it works" }, { ar: "أضيف تعليقات فقط", en: "Just add comments" }], answer: 0 },
      { id: "q3", prompt: { ar: "ما الأداة التي تنسّق الكود تلقائيًا؟", en: "Which tool formats code automatically?" }, options: [{ ar: "Prettier", en: "Prettier" }, { ar: "Git", en: "Git" }, { ar: "Expo", en: "Expo" }], answer: 0 },
    ],
    xp: 20,
  }),
  {
    slug: "testing",
    title: { ar: "الاختبارات: كود يتأكد من كودك", en: "Testing: code that checks your code" },
    body: [
      { icon: "🧪", ar: "المحترف لا يجرّب يدويًا كل مرة. يكتب **اختبارات**: كود صغير يستدعي دالته ويتأكد من النتيجة. عند أي تعديل تشغّلها كلها في ثانية.", en: "Pros don't re-check by hand every time. They write **tests**: small code that calls a function and checks the result. After any change, they run them all in a second." },
      { icon: "🎯", ar: "الشكل المعتاد في **Vitest** و **Jest**: `test(\"name\", () => { expect(add(2, 3)).toBe(5); });`. الأداة تطبع ✅ أو ❌ لكل اختبار.", en: "The usual shape in **Vitest** and **Jest**: `test(\"name\", () => { expect(add(2, 3)).toBe(5); });`. The tool prints ✅ or ❌ for each test." },
      { icon: "🧭", ar: "اختبر الحالة العادية **والحالات الحدّية**: نص فارغ، رقم سالب، قيمة ناقصة. الأخطاء تختبئ هناك.", en: "Test the normal case **and the edge cases**: an empty string, a negative number, a missing value. That's where bugs hide." },
      { icon: "🏗️", ar: "في مشروع حقيقي: `npm install -D vitest` ثم ملف `sum.test.js` ثم `npx vitest`. هنا وضعنا لك نسخة مصغّرة من `test` و `expect` في أول الملف.", en: "In a real project: `npm install -D vitest`, a `sum.test.js` file, then `npx vitest`. Here, a mini `test` and `expect` are at the top of the file for you." },
    ],
    example: {
      code: TEST_HELPERS + '\nfunction add(a, b) {\n  return a + b;\n}\n\ntest("adds two numbers", () => expect(add(2, 3)).toBe(5));\ntest("works with negatives", () => expect(add(-1, -1)).toBe(-2));\ntest("a broken test", () => expect(add(1, 1)).toBe(3));',
      note: { ar: "اختباران ينجحان، والثالث يفشل ويشرح السبب.", en: "Two tests pass; the third fails and explains why." },
      lang: "js",
    },
    files: ["js"],
    starter: { js: TEST_HELPERS + "\n// 1) Write isValidEmail(email)\n\n// 2) Write at least 3 tests for it\n" },
    solution: {
      js:
        TEST_HELPERS +
        '\nfunction isValidEmail(email) {\n  return /^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/.test(email);\n}\n\ntest("accepts a normal email", () => expect(isValidEmail("sara@mail.com")).toBe(true));\ntest("rejects a missing @", () => expect(isValidEmail("sara.mail.com")).toBe(false));\ntest("rejects an empty string", () => expect(isValidEmail("")).toBe(false));\n',
    },
    harness: 'console.log("__email__", [isValidEmail("a@b.co"), isValidEmail("ab.co"), isValidEmail(""), isValidEmail("a@b")].join(","));',
    tasks: [
      { id: "fn", label: { ar: "اكتب `isValidEmail(email)` تُرجع `true` أو `false`", en: "Write `isValidEmail(email)` returning `true` or `false`" }, test: ({ logs }) => printed(logs, "__email__ true,false,false,false") },
      { id: "tests", label: { ar: "اكتب 3 اختبارات على الأقل بـ `test` و `expect`", en: "Write at least 3 tests with `test` and `expect`" }, test: ({ logs }) => logs.filter((l) => l.startsWith("✅")).length >= 3 },
      { id: "green", label: { ar: "كل الاختبارات تنجح (لا يوجد ❌)", en: "All tests pass (no ❌)" }, test: ({ logs }) => logs.some((l) => l.startsWith("✅")) && !logs.some((l) => l.startsWith("❌")) },
    ],
    hints: [
      { ar: "`return /^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/.test(email);` أو تحقق من وجود `@` و `.` بعدها.", en: "`return /^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/.test(email);` or check for an `@` and a `.` after it." },
      { ar: '`test("rejects empty", () => expect(isValidEmail("")).toBe(false));`', en: '`test("rejects empty", () => expect(isValidEmail("")).toBe(false));`' },
    ],
    xp: 35,
  },
  {
    slug: "performance",
    title: { ar: "الأداء: تطبيق سريع وخفيف", en: "Performance: fast and light apps" },
    body: [
      { icon: "⚡", ar: "المستخدم يغادر إذا تأخرت الصفحة أكثر من ثلاث ثوانٍ. Google يقيس السرعة بـ **Core Web Vitals** ويؤثر ذلك على ترتيبك في البحث. افحص موقعك بـ **Lighthouse** في أدوات المطوّر.", en: "Users leave if a page takes more than three seconds. Google measures speed with **Core Web Vitals**, and it affects your search ranking. Audit your site with **Lighthouse** in DevTools." },
      { icon: "🖼️", ar: "أسرع مكاسب: صور بصيغة **WebP/AVIF** بحجم مناسب، و `loading=\"lazy\"` للصور البعيدة، وعدم تحميل مكتبات ضخمة لمهمة صغيرة.", en: "The quickest wins: **WebP/AVIF** images at the right size, `loading=\"lazy\"` for images further down, and no huge libraries for a small job." },
      { icon: "⏱️", ar: "**Debounce**: عند الكتابة في مربع بحث لا ترسل طلبًا مع كل حرف. انتظر حتى يتوقف المستخدم لحظة، ثم نفّذ مرة واحدة. توفّر عشرات الطلبات.", en: "**Debounce**: when typing in a search box, don't send a request on every key. Wait until the user pauses, then run once. It saves dozens of requests." },
      { icon: "🧠", ar: "الفكرة: كل استدعاء يلغي المؤقت السابق بـ `clearTimeout` ويبدأ مؤقتًا جديدًا بـ `setTimeout`. فقط الاستدعاء الأخير يكمل.", en: "The idea: each call cancels the previous timer with `clearTimeout` and starts a new one with `setTimeout`. Only the last call gets through." },
    ],
    example: {
      code: 'function debounce(fn, ms) {\n  let timer;\n  return (...args) => {\n    clearTimeout(timer);\n    timer = setTimeout(() => fn(...args), ms);\n  };\n}\n\nconst search = debounce((q) => console.log("Searching:", q), 200);\nsearch("r");\nsearch("re");\nsearch("react"); // only this one runs',
      note: { ar: "ثلاثة استدعاءات سريعة، وطلب واحد فقط.", en: "Three quick calls, and only one request." },
      lang: "js",
    },
    files: ["js"],
    starter: { js: "// Write debounce(fn, ms)\n" },
    solution: { js: "function debounce(fn, ms) {\n  let timer;\n  return (...args) => {\n    clearTimeout(timer);\n    timer = setTimeout(() => fn(...args), ms);\n  };\n}\n" },
    harness: 'let __n = 0, __last = ""; const __d = debounce((q) => { __n++; __last = q; }, 100); __d("a"); __d("ab"); __d("abc"); setTimeout(() => console.log("__calls__", __n, __last), 350);',
    settle: 600,
    tasks: [
      { id: "fn", label: { ar: "اكتب `debounce(fn, ms)` تُرجع دالة جديدة", en: "Write `debounce(fn, ms)` that returns a new function" }, test: ({ files }) => /function\s+debounce|const\s+debounce\s*=/.test(files.js ?? "") },
      { id: "clear", label: { ar: "ألغِ المؤقت السابق بـ `clearTimeout` وابدأ جديدًا بـ `setTimeout`", en: "Cancel the old timer with `clearTimeout` and start one with `setTimeout`" }, test: ({ files }) => /clearTimeout\(/.test(files.js ?? "") && /setTimeout\(/.test(files.js ?? "") },
      { id: "once", label: { ar: "ثلاثة استدعاءات سريعة = تنفيذ واحد بآخر قيمة", en: "Three quick calls = one run with the last value" }, test: ({ logs }) => printed(logs, "__calls__ 1 abc") },
    ],
    hints: [
      { ar: "`let timer;` خارج الدالة المُرجعة حتى تتذكره كل الاستدعاءات.", en: "`let timer;` outside the returned function so every call remembers it." },
      { ar: "`return (...args) => { clearTimeout(timer); timer = setTimeout(() => fn(...args), ms); };`", en: "`return (...args) => { clearTimeout(timer); timer = setTimeout(() => fn(...args), ms); };`" },
    ],
    xp: 35,
  },
  {
    slug: "web-security",
    title: { ar: "الأمان: لا تثق بأي مدخلات", en: "Security: never trust input" },
    body: [
      { icon: "🕷️", ar: "**XSS** أشهر ثغرة في الويب: مستخدم يكتب `<img src=x onerror=alert(1)>` في تعليق، وإذا عرضته بـ `innerHTML` ينفّذ المتصفح كوده عند كل زائر.", en: "**XSS** is the web's most famous hole: a user types `<img src=x onerror=alert(1)>` in a comment, and if you show it with `innerHTML`, the browser runs their code for every visitor." },
      { icon: "🛡️", ar: "الحل البسيط: اعرض نصوص المستخدمين بـ `textContent` دائمًا. React يفعل ذلك تلقائيًا، لذلك تجنّب `dangerouslySetInnerHTML`.", en: "The simple fix: always show user text with `textContent`. React does this automatically, so avoid `dangerouslySetInnerHTML`." },
      { icon: "🔑", ar: "**الأسرار لا توضع في كود الواجهة أبدًا**: مفاتيح API وكلمات سر القاعدة تبقى في الخادم داخل متغيرات البيئة `.env`، و `.env` في `.gitignore`.", en: "**Secrets never go in frontend code**: API keys and database passwords stay on the server in `.env` environment variables, and `.env` goes in `.gitignore`." },
      { icon: "🔒", ar: "وأيضًا: HTTPS دائمًا، تحقق من المدخلات في الخادم (ليس فقط الواجهة)، وحدّث الحزم بـ `npm audit`.", en: "Also: always HTTPS, validate input on the server (not just the frontend), and keep packages updated with `npm audit`." },
    ],
    files: ["html", "js"],
    starter: { html: '<h2>Comments</h2>\n<ul id="comments"></ul>\n', js: 'const comment = \'<img src=x onerror="console.log(\\\'hacked\\\')"> Nice lesson!\';\n\nconst li = document.createElement("li");\nli.innerHTML = comment; // ⚠️ dangerous\ndocument.querySelector("#comments").append(li);\n' },
    solution: { html: '<h2>Comments</h2>\n<ul id="comments"></ul>\n', js: 'const comment = \'<img src=x onerror="console.log(\\\'hacked\\\')"> Nice lesson!\';\n\nconst li = document.createElement("li");\nli.textContent = comment;\ndocument.querySelector("#comments").append(li);\n' },
    harness: 'console.log("__img__", document.querySelectorAll("#comments img").length, document.querySelector("#comments li")?.textContent.includes("Nice lesson") ? "text" : "none");',
    settle: 300,
    tasks: [
      { id: "safe", label: { ar: "استبدل `innerHTML` بـ `textContent`", en: "Replace `innerHTML` with `textContent`" }, test: ({ files }) => /\.textContent\s*=/.test(files.js ?? "") && !/\.innerHTML\s*=/.test(files.js ?? "") },
      { id: "shown", label: { ar: "التعليق يظهر كنص عادي بلا عنصر `<img>`", en: "The comment shows as plain text, with no `<img>` element" }, test: ({ logs }) => printed(logs, "__img__ 0 text") },
      { id: "nohack", label: { ar: "الكود الخبيث لم يُنفَّذ (لا تظهر `hacked`)", en: "The malicious code didn't run (no `hacked`)" }, test: ({ logs }) => logs.some((l) => l.startsWith("__img__")) && !logs.some((l) => l.includes("hacked")) },
    ],
    hints: [{ ar: "غيّر سطرًا واحدًا: `li.textContent = comment;`", en: "Change one line: `li.textContent = comment;`" }],
    xp: 30,
  },
  reading({
    slug: "typescript",
    title: { ar: "TypeScript: JavaScript بأنواع", en: "TypeScript: JavaScript with types" },
    body: [
      { icon: "🔷", ar: "**TypeScript** هو JavaScript مع **أنواع**. تكتب `function greet(name: string)` فينبّهك المحرر فورًا إذا مرّرت رقمًا بالخطأ، قبل أن يصل الخطأ للمستخدم.", en: "**TypeScript** is JavaScript with **types**. You write `function greet(name: string)`, and the editor warns you right away if you pass a number by mistake, before the bug reaches users." },
      { icon: "📐", ar: "تصف شكل البيانات بـ `type`: `type User = { id: number; name: string; email?: string }`. علامة `?` تعني اختياري.", en: "Describe data shapes with `type`: `type User = { id: number; name: string; email?: string }`. The `?` means optional." },
      { icon: "🏢", ar: "معظم الشركات تطلبه اليوم. Next.js و Expo يدعمانه مباشرة: الملفات تصبح `.ts` و `.tsx`. وهذا التطبيق نفسه مكتوب بـ TypeScript!", en: "Most companies ask for it today. Next.js and Expo support it out of the box: files become `.ts` and `.tsx`. This very app is written in TypeScript!" },
      { icon: "🚀", ar: "الخبر الجيد: كل ما تعرفه من JavaScript صالح. ابدأ بإضافة الأنواع تدريجيًا للدوال والـ props.", en: "The good news: everything you know in JavaScript still works. Start by adding types gradually to functions and props." },
    ],
    example: {
      code: 'type User = {\n  id: number;\n  name: string;\n  email?: string;\n};\n\nfunction greet(user: User): string {\n  return `Hi, ${user.name}!`;\n}\n\ngreet({ id: 1, name: "Sara" });   // ✅\ngreet({ id: 1 });                 // ❌ name is missing\n\n// React props\nfunction Card({ title }: { title: string }) {\n  return <h2>{title}</h2>;\n}',
      note: { ar: "المحرر يضع خطًا أحمر تحت الاستدعاء الخاطئ قبل التشغيل.", en: "The editor underlines the wrong call in red before you even run it." },
      lang: "none",
    },
    quiz: [
      { id: "q1", prompt: { ar: "ما الفائدة الأساسية لـ TypeScript؟", en: "What's TypeScript's main benefit?" }, options: [{ ar: "كشف الأخطاء أثناء الكتابة قبل التشغيل", en: "Catching bugs while you type, before running" }, { ar: "تسريع الإنترنت", en: "Faster internet" }, { ar: "تصميم الواجهات", en: "Designing interfaces" }], answer: 0 },
      { id: "q2", prompt: { ar: "في `email?: string` ماذا تعني `?`", en: "In `email?: string`, what does `?` mean?" }, options: [{ ar: "الخاصية اختيارية", en: "The property is optional" }, { ar: "الخاصية سرية", en: "The property is secret" }, { ar: "خطأ في الكتابة", en: "A typo" }], answer: 0 },
      { id: "q3", prompt: { ar: "ما امتداد ملف مكوّن React بـ TypeScript؟", en: "What's the extension of a React component in TypeScript?" }, options: [{ ar: "`.tsx`", en: "`.tsx`" }, { ar: "`.html`", en: "`.html`" }, { ar: "`.java`", en: "`.java`" }], answer: 0 },
    ],
    xp: 20,
  }),
  reading({
    slug: "deploy-ci",
    title: { ar: "النشر على الإنترنت", en: "Shipping to the internet" },
    body: [
      { icon: "▲", ar: "**Vercel** و **Netlify** ينشران موقعك مجانًا: اربط مستودع GitHub، وكل `git push` ينشر نسخة جديدة تلقائيًا خلال دقيقة، مع رابط HTTPS.", en: "**Vercel** and **Netlify** host your site for free: connect a GitHub repo, and every `git push` deploys a new version in about a minute, with an HTTPS link." },
      { icon: "🔍", ar: "كل Pull Request يحصل على **رابط معاينة** خاص به، فيجرّب الفريق التغيير قبل دمجه في الموقع الحقيقي.", en: "Every pull request gets its own **preview link**, so the team can try a change before it reaches the live site." },
      { icon: "🔐", ar: "مفاتيح الخادم تضعها في إعدادات المشروع (**Environment Variables**) وليس في الكود. ويمكنك ربط نطاقك الخاص مثل `mysite.com`.", en: "Server keys go in the project settings (**Environment Variables**), not in the code. You can also connect your own domain like `mysite.com`." },
      { icon: "🤖", ar: "**CI** (التكامل المستمر): خادم يشغّل الاختبارات و ESLint تلقائيًا مع كل push. إذا فشل شيء لا يُنشر الخطأ.", en: "**CI** (continuous integration): a server runs your tests and ESLint on every push. If something fails, the bug doesn't ship." },
    ],
    quiz: [
      { id: "q1", prompt: { ar: "بعد ربط Vercel بـ GitHub، كيف تنشر تحديثًا؟", en: "Once Vercel is linked to GitHub, how do you deploy an update?" }, options: [{ ar: "`git push`", en: "`git push`" }, { ar: "أرسل الملفات بالبريد", en: "Email the files" }, { ar: "أعيد إنشاء المشروع", en: "Recreate the project" }], answer: 0 },
      { id: "q2", prompt: { ar: "أين تضع مفتاح API السري للخادم؟", en: "Where does a secret server API key go?" }, options: [{ ar: "متغيرات البيئة في إعدادات المشروع", en: "Environment variables in the project settings" }, { ar: "داخل مكوّن React", en: "Inside a React component" }, { ar: "في README", en: "In the README" }], answer: 0 },
      { id: "q3", prompt: { ar: "ماذا يفعل CI؟", en: "What does CI do?" }, options: [{ ar: "يشغّل الاختبارات تلقائيًا مع كل push", en: "Runs the tests automatically on every push" }, { ar: "يصمّم الشعار", en: "Designs the logo" }, { ar: "يكتب الكود بدلك", en: "Writes code for you" }], answer: 0 },
    ],
    xp: 20,
  }),
  {
    slug: "capstone",
    title: { ar: "المشروع النهائي: تطبيق مهام كامل", en: "Capstone: a complete to-do app" },
    body: [
      { icon: "🏁", ar: "حان وقت جمع كل شيء: HTML للهيكل، CSS للشكل (جاهز لك)، و JavaScript للمنطق. ستبني تطبيق مهام حقيقيًا.", en: "Time to bring it all together: HTML for structure, CSS for looks (ready for you), and JavaScript for logic. You'll build a real to-do app." },
      { icon: "📝", ar: "عند إرسال النموذج: امنع إعادة تحميل الصفحة بـ `event.preventDefault()`، خذ النص بـ `trim()`، وتجاهل النص الفارغ.", en: "On form submit: stop the page reload with `event.preventDefault()`, take the text with `trim()`, and ignore empty text." },
      { icon: "🧩", ar: "أنشئ `<li>` بـ `createElement`، ضع النص بـ `textContent` (أمان!)، أضفه للقائمة، ثم أفرغ الحقل وحدّث العدّاد `#count`.", en: "Create an `<li>` with `createElement`, set its text with `textContent` (security!), add it to the list, then clear the input and update the `#count` badge." },
      { icon: "🌟", ar: "بعد النجاح طوّره بنفسك: زر حذف، شطب المهمة المنجزة، حفظ في `localStorage`، ثم أعد بناءه بـ React وانشره على Vercel. هذا أول مشروع في الـ Portfolio!", en: "Once it works, level it up: a delete button, crossing out done tasks, saving to `localStorage`, then rebuild it in React and deploy it to Vercel. That's your first portfolio project!" },
    ],
    files: ["js", "html", "css"],
    starter: { js: 'const form = document.querySelector("#todo-form");\nconst input = document.querySelector("#todo-input");\nconst list = document.querySelector("#todo-list");\nconst count = document.querySelector("#count");\n\n', html: TODO_HTML, css: TODO_CSS },
    solution: {
      js: 'const form = document.querySelector("#todo-form");\nconst input = document.querySelector("#todo-input");\nconst list = document.querySelector("#todo-list");\nconst count = document.querySelector("#count");\n\nform.addEventListener("submit", (event) => {\n  event.preventDefault();\n  const text = input.value.trim();\n  if (!text) return;\n\n  const li = document.createElement("li");\n  const span = document.createElement("span");\n  span.textContent = text;\n  li.append(span);\n  li.addEventListener("click", () => li.classList.toggle("done"));\n  list.append(li);\n\n  input.value = "";\n  count.textContent = list.children.length;\n});\n',
      html: TODO_HTML,
      css: TODO_CSS,
    },
    harness:
      'const __f = document.querySelector("#todo-form"), __i = document.querySelector("#todo-input"); const __add = (v) => { __i.value = v; __f.requestSubmit(); }; __add("Learn React"); __add("Ship my app"); __add("   "); console.log("__items__", document.querySelectorAll("#todo-list li").length); console.log("__text__", document.querySelector("#todo-list li")?.textContent.trim() ?? ""); console.log("__input__", JSON.stringify(__i.value)); console.log("__count__", document.querySelector("#count").textContent.trim());',
    tasks: [
      { id: "submit", label: { ar: "استمع لحدث `submit` وامنع إعادة التحميل بـ `preventDefault()`", en: "Listen for `submit` and stop the reload with `preventDefault()`" }, test: ({ files }) => /addEventListener\(\s*["'`]submit["'`]/.test(files.js ?? "") && /preventDefault\(\)/.test(files.js ?? "") },
      { id: "add", label: { ar: "كل إرسال يضيف `<li>` بالنص، والنص الفارغ يُتجاهل", en: "Each submit adds an `<li>` with the text, and empty text is ignored" }, test: ({ logs }) => printed(logs, "__items__ 2") && printed(logs, "__text__ Learn React") },
      { id: "clear", label: { ar: "أفرغ الحقل بعد الإضافة", en: "Clear the input after adding" }, test: ({ logs }) => printed(logs, "__items__ 2") && logs.some((l) => /^__input__ "\s*"$/.test(l.trim())) },
      { id: "count", label: { ar: "حدّث العدّاد `#count` بعدد المهام", en: "Update the `#count` badge with the number of tasks" }, test: ({ logs }) => printed(logs, "__count__ 2") },
    ],
    hints: [
      { ar: '`form.addEventListener("submit", (event) => { event.preventDefault(); … });`', en: '`form.addEventListener("submit", (event) => { event.preventDefault(); … });`' },
      { ar: '`const text = input.value.trim(); if (!text) return;`', en: '`const text = input.value.trim(); if (!text) return;`' },
      { ar: '`const li = document.createElement("li"); li.textContent = text; list.append(li); input.value = ""; count.textContent = list.children.length;`', en: '`const li = document.createElement("li"); li.textContent = text; list.append(li); input.value = ""; count.textContent = list.children.length;`' },
    ],
    xp: 60,
  },
  reading({
    slug: "career",
    title: { ar: "من متعلّم إلى مطوّر: Portfolio وأول وظيفة", en: "From learner to developer: portfolio and first job" },
    body: [
      { icon: "🗂️", ar: "**الـ Portfolio أهم من أي شهادة.** ثلاثة مشاريع حقيقية منشورة على الإنترنت مع كودها على GitHub تقنع أكثر من عشر دورات. مثلًا: تطبيق مهام، متجر صغير بـ React، و API بـ Express.", en: "**A portfolio beats any certificate.** Three real projects live on the web with their code on GitHub convince more than ten courses. For example: a to-do app, a small React store, and an Express API." },
      { icon: "📄", ar: "لكل مشروع **README** واضح: ماذا يفعل، صورة، التقنيات، ورابط النسخة الحية. وصفحة GitHub نشطة بـ commits منتظمة.", en: "Give each project a clear **README**: what it does, a screenshot, the tech used, and the live link. Keep your GitHub active with regular commits." },
      { icon: "💼", ar: "ابحث عن **Junior** و **Internship** على LinkedIn، وجرّب العمل الحر (Upwork, Mostaql). ساهم في مشاريع مفتوحة المصدر: علامة `good first issue` مكان ممتاز للبداية.", en: "Look for **Junior** and **Internship** roles on LinkedIn, and try freelancing (Upwork, Mostaql). Contribute to open source: the `good first issue` label is a great place to start." },
      { icon: "🎤", ar: "في المقابلة فكّر بصوت عالٍ كما تعلّمت في الدرس الأول: افهم المسألة، قسّمها، اشرح خطواتك. قول \"لا أعرف، لكن سأبحث هكذا\" أفضل من التخمين.", en: "In interviews, think out loud like you learned in the first lesson: understand the problem, break it down, explain your steps. \"I don't know, but here's how I'd find out\" beats guessing." },
      { icon: "♾️", ar: "التقنية تتغير دائمًا، والمحترف **يتعلّم باستمرار**: اقرأ التوثيق الرسمي (MDN, react.dev)، ابنِ أشياء صغيرة كل أسبوع، ولا تتوقف. مبروك، أنت الآن مطوّر! 🎉", en: "Tech always changes, and pros **keep learning**: read the official docs (MDN, react.dev), build small things every week, and don't stop. Congratulations, you're a developer now! 🎉" },
    ],
    quiz: [
      { id: "q1", prompt: { ar: "ما الذي يقنع صاحب العمل أكثر؟", en: "What convinces an employer most?" }, options: [{ ar: "مشاريع حقيقية منشورة مع كودها", en: "Real deployed projects with their code" }, { ar: "عدد الدورات فقط", en: "Just the number of courses" }, { ar: "سيرة ذاتية طويلة", en: "A long CV" }], answer: 0 },
      { id: "q2", prompt: { ar: "أين تبدأ المساهمة في مشاريع مفتوحة المصدر؟", en: "Where do you start contributing to open source?" }, options: [{ ar: "مهام `good first issue`", en: "`good first issue` tasks" }, { ar: "إعادة كتابة المشروع كله", en: "Rewriting the whole project" }, { ar: "لا يُسمح للمبتدئين", en: "Beginners aren't allowed" }], answer: 0 },
      { id: "q3", prompt: { ar: "سؤال في المقابلة لا تعرف جوابه. ماذا تفعل؟", en: "An interview question you can't answer. What do you do?" }, options: [{ ar: "أفكّر بصوت عالٍ وأشرح كيف سأصل للحل", en: "Think out loud and explain how I'd find the answer" }, { ar: "أخمّن بثقة", en: "Guess confidently" }, { ar: "أصمت", en: "Stay silent" }], answer: 0 },
    ],
    xp: 25,
  }),
];

export const proExam: Exam = {
  passPercent: 80,
  questions: [
    { id: "q1", prompt: { ar: "أي اسم دالة هو الأوضح؟", en: "Which function name is clearest?" }, options: [{ ar: "`calculateTotalPrice`", en: "`calculateTotalPrice`" }, { ar: "`doIt`", en: "`doIt`" }, { ar: "`fn1`", en: "`fn1`" }], answer: 0 },
    { id: "q2", prompt: { ar: "ماذا يطبع هذا الاختبار إذا كانت `add(2, 2)` تُرجع 5؟", en: "What does this test report if `add(2, 2)` returns 5?" }, code: 'test("adds", () => expect(add(2, 2)).toBe(4));', options: [{ ar: "❌ expected 4, got 5", en: "❌ expected 4, got 5" }, { ar: "✅ adds", en: "✅ adds" }, { ar: "لا شيء", en: "Nothing" }], answer: 0 },
    { id: "q3", prompt: { ar: "مستخدم يكتب كود HTML في تعليق. كيف تعرضه بأمان؟", en: "A user types HTML in a comment. How do you show it safely?" }, options: [{ ar: "`el.textContent = comment`", en: "`el.textContent = comment`" }, { ar: "`el.innerHTML = comment`", en: "`el.innerHTML = comment`" }, { ar: "`eval(comment)`", en: "`eval(comment)`" }], answer: 0 },
    { id: "q4", prompt: { ar: "مربع بحث يرسل طلبًا مع كل حرف. ما الحل؟", en: "A search box sends a request on every key. What's the fix?" }, options: [{ ar: "Debounce", en: "Debounce" }, { ar: "إضافة المزيد من الخوادم", en: "Add more servers" }, { ar: "منع الكتابة", en: "Block typing" }], answer: 0 },
    { id: "q5", prompt: { ar: "أين يوضع مفتاح API سري؟", en: "Where does a secret API key go?" }, options: [{ ar: "متغيرات البيئة في الخادم", en: "Server environment variables" }, { ar: "في كود React", en: "In React code" }, { ar: "في رابط الصفحة", en: "In the page URL" }], answer: 0 },
    { id: "q6", prompt: { ar: "ماذا يضيف TypeScript إلى JavaScript؟", en: "What does TypeScript add to JavaScript?" }, options: [{ ar: "الأنواع وكشف الأخطاء مبكرًا", en: "Types and early bug detection" }, { ar: "قاعدة بيانات", en: "A database" }, { ar: "تصميم جاهز", en: "A ready-made design" }], answer: 0 },
  ],
};
