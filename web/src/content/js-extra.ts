import type { Lesson } from "./types";

const printed = (logs: string[], value: string) => logs.some((l) => l.trim() === value);

/** JavaScript lessons that round out the stage: decisions, objects and asynchronous code. */
export const conditions: Lesson = {
  slug: "conditions",
  title: { ar: "الشروط: if و else", en: "Conditions: if and else" },
  body: [
    {
      icon: "🔀",
      ar: "البرامج تتخذ **قرارات**: `if (score >= 50) { ... } else { ... }`. الكود داخل `if` يعمل فقط إذا كان الشرط صحيحًا (`true`).",
      en: "Programs make **decisions**: `if (score >= 50) { ... } else { ... }`. The code inside `if` runs only when the condition is `true`.",
    },
    {
      icon: "⚖️",
      ar: "المقارنات: `===` يساوي، `!==` لا يساوي، و `>` و `<` و `>=` و `<=`. استخدم دائمًا `===` الثلاثية لأنها تقارن النوع أيضًا: `\"5\" === 5` خطأ.",
      en: "Comparisons: `===` equal, `!==` not equal, and `>`, `<`, `>=`, `<=`. Always use triple `===`, which compares types too: `\"5\" === 5` is false.",
    },
    {
      icon: "🔗",
      ar: "اجمع الشروط: `&&` تعني «و»، و `||` تعني «أو»، و `!` تعني «ليس». ولقرار سريع في سطر: `const label = age >= 18 ? \"adult\" : \"minor\";`",
      en: "Combine conditions: `&&` means and, `||` means or, `!` means not. For a quick one-line decision: `const label = age >= 18 ? \"adult\" : \"minor\";`",
    },
  ],
  example: {
    code: 'const score = 72;\n\nif (score >= 90) {\n  console.log("Excellent");\n} else if (score >= 50) {\n  console.log("Pass");\n} else {\n  console.log("Try again");\n}',
    note: { ar: "ثلاثة احتمالات، يعمل واحد منها فقط.", en: "Three branches; only one of them runs." },
    lang: "js",
  },
  modern: {
    old: 'if (answer == "5") { … }  // "5" == 5 is true!',
    now: "if (answer === 5) { … }",
    text: { ar: "`==` يحوّل الأنواع بصمت فيسبب أخطاء غريبة. المحترفون يستخدمون `===` دائمًا.", en: "`==` silently converts types and causes strange bugs. Professionals always use `===`." },
  },
  files: ["js", "html"],
  starter: { js: "// اكتب الدالة grade هنا / Write grade here\n", html: "<h1>Conditions</h1>\n" },
  solution: {
    js: 'function grade(score) {\n  if (score >= 50) {\n    return "pass";\n  } else {\n    return "fail";\n  }\n}\n\nconsole.log(grade(80));\n',
    html: "<h1>Conditions</h1>\n",
  },
  harness: 'try { console.log("__g__", grade(50), grade(49), grade(100)); } catch (e) { console.log("__g__", "missing"); }',
  tasks: [
    { id: "pass", label: { ar: "اكتب `grade(score)` تُرجع `\"pass\"` إذا كانت النتيجة 50 أو أكثر", en: "Write `grade(score)` that returns `\"pass\"` for 50 or more" }, test: ({ logs }) => logs.some((l) => /^__g__ pass \w+ pass$/.test(l.trim())) },
    { id: "fail", label: { ar: "وتُرجع `\"fail\"` لأقل من 50", en: "and `\"fail\"` below 50" }, test: ({ logs }) => printed(logs, "__g__ pass fail pass") },
    { id: "strict", label: { ar: "لا تستخدم `==` المزدوجة", en: "Don't use double `==`" }, test: ({ files }) => !/[^=!]==[^=]/.test(files.js ?? "") },
  ],
  hints: [
    { ar: "`function grade(score) { if (score >= 50) { return \"pass\"; } ... }`", en: "`function grade(score) { if (score >= 50) { return \"pass\"; } ... }`" },
    { ar: "أكمل بـ `else { return \"fail\"; }`", en: "Finish with `else { return \"fail\"; }`" },
  ],
  xp: 30,
};

export const objects: Lesson = {
  slug: "objects",
  title: { ar: "الكائنات: بيانات منظمة", en: "Objects: organized data" },
  body: [
    {
      icon: "🗃️",
      ar: "**الكائن** (object) يجمع معلومات عن شيء واحد بأسماء: `const user = { name: \"Sara\", age: 21 };`. كل اسم يسمى **خاصية** (property).",
      en: "An **object** groups facts about one thing by name: `const user = { name: \"Sara\", age: 21 };`. Each name is a **property**.",
    },
    {
      icon: "🔑",
      ar: "تقرأ الخاصية بالنقطة `user.name`، وتغيّرها `user.age = 22`، وتضيف جديدة `user.city = \"Tunis\"`.",
      en: "Read a property with a dot `user.name`, change it with `user.age = 22`, and add one with `user.city = \"Tunis\"`.",
    },
    {
      icon: "📦",
      ar: "**التفكيك** (destructuring) يأخذ عدة خصائص في سطر: `const { name, age } = user;`. وأغلب بيانات الإنترنت (JSON) عبارة عن كائنات ومصفوفات.",
      en: "**Destructuring** takes several properties in one line: `const { name, age } = user;`. Most data on the internet (JSON) is objects and arrays.",
    },
  ],
  example: {
    code: 'const course = {\n  title: "JavaScript",\n  lessons: 8,\n  free: true,\n};\n\nconsole.log(course.title);\ncourse.lessons = 9;\nconst { title, lessons } = course;\nconsole.log(`${title}: ${lessons} lessons`);',
    note: { ar: "كائن بثلاث خصائص، نقرأه ونعدّله ونفككه.", en: "An object with three properties: read, changed and destructured." },
    lang: "js",
  },
  modern: {
    old: "var name = user.name;\nvar age = user.age;",
    now: "const { name, age } = user;",
    text: { ar: "التفكيك يختصر الأسطر المتكررة، وستراه في كل كود React.", en: "Destructuring removes repetitive lines, and you'll see it in all React code." },
    since: "ES2015",
  },
  files: ["js", "html"],
  starter: { js: "", html: "<h1>Objects</h1>\n" },
  solution: {
    js: 'const book = {\n  title: "Clean Code",\n  pages: 400,\n};\n\nbook.pages = 464;\nconst { title, pages } = book;\nconsole.log(`${title} has ${pages} pages`);\n',
    html: "<h1>Objects</h1>\n",
  },
  harness: 'try { console.log("__b__", typeof book, book.title ? "t" : "-", book.pages); } catch (e) { console.log("__b__", "missing"); }',
  tasks: [
    { id: "object", label: { ar: "أنشئ كائنًا `book` فيه `title` و `pages`", en: "Create a `book` object with `title` and `pages`" }, test: ({ logs }) => logs.some((l) => /^__b__ object t \d+$/.test(l.trim())) },
    { id: "change", label: { ar: "غيّر `book.pages` إلى 464", en: "Change `book.pages` to 464" }, test: ({ logs }) => printed(logs, "__b__ object t 464") },
    { id: "destructure", label: { ar: "فكّك `title` و `pages` واطبع جملة بهما", en: "Destructure `title` and `pages` and print a sentence" }, test: ({ files, logs }) => /const\s*\{\s*\w+\s*,\s*\w+\s*\}\s*=\s*book/.test(files.js ?? "") && logs.some((l) => /464/.test(l) && !l.startsWith("__b__")) },
  ],
  hints: [
    { ar: '`const book = { title: "Clean Code", pages: 400 };` ثم `book.pages = 464;`', en: '`const book = { title: "Clean Code", pages: 400 };` then `book.pages = 464;`' },
    { ar: "`const { title, pages } = book;` ثم `console.log(`${title} has ${pages} pages`);`", en: "`const { title, pages } = book;` then `console.log(`${title} has ${pages} pages`);`" },
  ],
  xp: 30,
};

export const asyncAwait: Lesson = {
  slug: "async-await",
  title: { ar: "الكود غير المتزامن: async و await", en: "Asynchronous code: async and await" },
  body: [
    {
      icon: "⏳",
      ar: "بعض المهام تأخذ وقتًا: جلب بيانات من الإنترنت أو انتظار مؤقت. JavaScript لا تتوقف لتنتظر، بل تَعِد بالنتيجة لاحقًا عبر **Promise**.",
      en: "Some work takes time: fetching data from the internet or waiting on a timer. JavaScript doesn't freeze to wait; it promises the result later with a **Promise**.",
    },
    {
      icon: "✋",
      ar: "داخل دالة `async` تكتب `await` قبل الـ Promise فتنتظر نتيجتها ثم تكمل، ويبدو الكود مرتبًا سطرًا بعد سطر.",
      en: "Inside an `async` function, put `await` before a Promise to wait for its result and continue, so the code reads line by line.",
    },
    {
      icon: "🌐",
      ar: "أشهر استخدام: `const res = await fetch(url); const data = await res.json();` لجلب بيانات من API. ولالتقاط الأخطاء نضع الكود داخل `try { } catch (e) { }`.",
      en: "The classic use: `const res = await fetch(url); const data = await res.json();` to get data from an API. To catch errors, wrap it in `try { } catch (e) { }`.",
    },
  ],
  example: {
    code: 'const wait = (ms) => new Promise((done) => setTimeout(done, ms));\n\nasync function start() {\n  console.log("Loading…");\n  await wait(300);\n  console.log("Done!");\n}\n\nstart();',
    note: { ar: "يطبع Loading ثم ينتظر 300 ملي ثانية ثم يطبع Done.", en: "Prints Loading, waits 300 ms, then prints Done." },
    lang: "js",
  },
  modern: {
    old: "fetch(url).then((res) => res.json()).then((data) => {\n  console.log(data);\n});",
    now: "const res = await fetch(url);\nconst data = await res.json();\nconsole.log(data);",
    text: { ar: "سلاسل `.then()` تصبح صعبة القراءة. `async/await` يكتب نفس المنطق كخطوات واضحة.", en: "Chains of `.then()` get hard to read. `async/await` writes the same logic as clear steps." },
    since: "ES2017",
  },
  files: ["js", "html"],
  starter: { js: "const wait = (ms) => new Promise((done) => setTimeout(done, ms));\n\n", html: "<h1>Async</h1>\n" },
  solution: {
    js: 'const wait = (ms) => new Promise((done) => setTimeout(done, ms));\n\nasync function load() {\n  console.log("Loading");\n  await wait(200);\n  console.log("Ready");\n}\n\nload();\n',
    html: "<h1>Async</h1>\n",
  },
  settle: 700,
  tasks: [
    { id: "async", label: { ar: "اكتب دالة `async` اسمها `load`", en: "Write an `async` function called `load`" }, test: ({ files }) => /async\s+function\s+load|const\s+load\s*=\s*async/.test(files.js ?? "") },
    { id: "await", label: { ar: "داخلها استخدم `await wait(200)`", en: "Inside it, use `await wait(200)`" }, test: ({ files }) => /await\s+wait\(/.test(files.js ?? "") },
    { id: "order", label: { ar: "اطبع `Loading` قبل الانتظار و `Ready` بعده، ثم استدعِ `load()`", en: "Print `Loading` before the wait and `Ready` after, then call `load()`" }, test: ({ logs }) => logs.indexOf("Loading") >= 0 && logs.indexOf("Ready") > logs.indexOf("Loading") },
  ],
  hints: [
    { ar: '`async function load() { console.log("Loading"); await wait(200); console.log("Ready"); }`', en: '`async function load() { console.log("Loading"); await wait(200); console.log("Ready"); }`' },
    { ar: "لا تنسَ استدعاءها في الأسفل: `load();`", en: "Don't forget to call it at the end: `load();`" },
  ],
  xp: 35,
};
