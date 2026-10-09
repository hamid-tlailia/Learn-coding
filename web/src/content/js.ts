import type { Exam, Lesson } from "./types";

const printed = (logs: string[], value: string) => logs.some((l) => l.trim() === value);

export const jsLessons: Lesson[] = [
  {
    slug: "what-is-js",
    title: { ar: "ما هي JavaScript؟", en: "What is JavaScript?" },
    body: [
      {
        icon: "⚡",
        ar: "**JavaScript** هي لغة البرمجة الحقيقية للويب: تجعل الصفحة **تتفاعل**. أزرار، قوائم، ألعاب، جلب بيانات من الإنترنت… كلها JavaScript.",
        en: "**JavaScript** is the web's real programming language: it makes pages **interactive**. Buttons, menus, games, fetching data… it's all JavaScript.",
      },
      {
        icon: "🖨️",
        ar: "أول أمر تتعلمه: `console.log()` يطبع رسالة في **الكونسول** (Console)، وهي نافذة يرى فيها المبرمج ما يحدث داخل الكود. في المتصفح تفتحها بـ F12.",
        en: "Your first command: `console.log()` prints a message to the **console**, a window where programmers see what's happening inside the code. In a browser, open it with F12.",
      },
      {
        icon: "🔗",
        ar: "نكتب JavaScript في ملف `script.js` ونربطه في آخر `<body>`: `<script src=\"script.js\"></script>`. هنا الربط جاهز، والنتيجة تظهر في تبويب النتيجة تحت الصفحة.",
        en: "We write JavaScript in `script.js` and link it at the end of `<body>`: `<script src=\"script.js\"></script>`. Here it's linked for you, and output shows under the page in the Result tab.",
      },
      {
        icon: "📝",
        ar: "النصوص (strings) توضع بين علامتي تنصيص: `\"Hello\"`. والأرقام تُكتب كما هي: `42`. وكل سطر ينتهي عادة بـ `;`.",
        en: "Text (strings) goes between quotes: `\"Hello\"`. Numbers are written as-is: `42`. Each statement usually ends with `;`.",
      },
    ],
    example: {
      code: 'console.log("Hello, Code Master!");\nconsole.log(2 + 3);',
      note: { ar: "يطبع جملة، ثم ناتج 2 + 3.", en: "Prints a sentence, then the result of 2 + 3." },
      lang: "js",
    },
    files: ["js", "html"],
    starter: { js: "// اكتب الكود هنا / Write your code here\n", html: "<h1>JavaScript</h1>\n" },
    solution: { js: 'console.log("Hello, JavaScript!");\nconsole.log(10 * 5);\n', html: "<h1>JavaScript</h1>\n" },
    tasks: [
      {
        id: "hello",
        label: { ar: "اطبع `Hello, JavaScript!` بـ `console.log`", en: "Print `Hello, JavaScript!` with `console.log`" },
        test: ({ logs }) => printed(logs, "Hello, JavaScript!"),
      },
      {
        id: "math",
        label: { ar: "اطبع ناتج `10 * 5`", en: "Print the result of `10 * 5`" },
        test: ({ logs }) => printed(logs, "50"),
      },
    ],
    hints: [
      { ar: '`console.log("Hello, JavaScript!");`', en: '`console.log("Hello, JavaScript!");`' },
      { ar: "`console.log(10 * 5);` بدون علامات تنصيص، ليحسبها.", en: "`console.log(10 * 5);` with no quotes, so it calculates." },
    ],
    xp: 20,
  },
  {
    slug: "variables",
    title: { ar: "المتغيرات: let و const", en: "Variables: let and const" },
    body: [
      {
        icon: "📦",
        ar: "**المتغير** صندوق له اسم نحفظ فيه قيمة. `const name = \"Hamid\";` يحفظ نصًا في صندوق اسمه `name`.",
        en: "A **variable** is a named box that holds a value. `const name = \"Hamid\";` stores text in a box called `name`.",
      },
      {
        icon: "🔒",
        ar: "`const` لقيمة لا تتغير، و `let` لقيمة ستتغير لاحقًا مثل النقاط في لعبة. القاعدة: ابدأ بـ `const`، واستخدم `let` فقط عند الحاجة.",
        en: "`const` is for a value that won't change, `let` for one that will, like a game score. Rule: start with `const`, use `let` only when needed.",
      },
      {
        icon: "🧵",
        ar: "**القوالب النصية** (template literals) بعلامة `` ` `` تدمج المتغيرات داخل النص: `` `Hi ${name}` ``.",
        en: "**Template literals** with backticks `` ` `` drop variables into text: `` `Hi ${name}` ``.",
      },
    ],
    example: {
      code: 'const name = "Hamid";\nlet score = 0;\nscore = score + 10;\nconsole.log(`${name} has ${score} points`);',
      note: { ar: "اسم ثابت، ونقاط تتغير، ثم جملة تدمجهما.", en: "A fixed name, a changing score, then a sentence combining them." },
      lang: "js",
    },
    modern: {
      old: 'var name = "Hamid";\nconsole.log("Hi " + name + "!");',
      now: 'const name = "Hamid";\nconsole.log(`Hi ${name}!`);',
      text: {
        ar: "`var` قديمة وتسبب أخطاء غريبة. منذ ES2015 نستخدم `let` و `const`، والقوالب النصية بدل جمع النصوص بـ `+`.",
        en: "`var` is outdated and causes strange bugs. Since ES2015 we use `let` and `const`, and template literals instead of gluing strings with `+`.",
      },
      since: "ES2015",
    },
    files: ["js", "html"],
    starter: { js: "", html: "<h1>Variables</h1>\n" },
    solution: { js: 'const name = "Hamid";\nlet age = 20;\nage = age + 1;\nconsole.log(`${name} is ${age}`);\n', html: "<h1>Variables</h1>\n" },
    tasks: [
      { id: "const", label: { ar: "عرّف `name` بـ `const`", en: "Declare `name` with `const`" }, test: ({ files }) => /const\s+name\s*=/.test(files.js ?? "") },
      { id: "let", label: { ar: "عرّف `age` بـ `let` ثم زد قيمتها", en: "Declare `age` with `let`, then increase it" }, test: ({ files }) => /let\s+age\s*=/.test(files.js ?? "") && /age\s*(\+\+|\+=|=\s*age\s*\+)/.test(files.js ?? "") },
      { id: "novar", label: { ar: "لا تستخدم `var`", en: "Don't use `var`" }, test: ({ files }) => !/\bvar\s/.test(files.js ?? "") },
      { id: "template", label: { ar: "اطبع جملة بقالب نصي `` `${...}` ``", en: "Print a sentence with a template literal `` `${...}` ``" }, test: ({ files, logs }) => /`[^`]*\$\{[^}]+\}[^`]*`/.test(files.js ?? "") && logs.length > 0 },
    ],
    hints: [
      { ar: '`const name = "Hamid";` ثم `let age = 20;` ثم `age = age + 1;`', en: '`const name = "Hamid";` then `let age = 20;` then `age = age + 1;`' },
      { ar: "`console.log(`${name} is ${age}`);`", en: "`console.log(`${name} is ${age}`);`" },
    ],
    xp: 25,
  },
  {
    slug: "functions",
    title: { ar: "الدوال: كود تعيد استخدامه", en: "Functions: reusable code" },
    body: [
      {
        icon: "⚙️",
        ar: "**الدالة** (function) آلة صغيرة: تعطيها **مدخلات** (parameters)، فتعمل، ثم **تُرجع** نتيجة بـ `return`. تكتبها مرة وتستخدمها مرات.",
        en: "A **function** is a small machine: you give it **inputs** (parameters), it works, then **returns** a result with `return`. Write once, use many times.",
      },
      {
        icon: "📞",
        ar: "تعريف الدالة لا يشغّلها. لتشغيلها **تستدعيها** باسمها وأقواس: `add(2, 3)`.",
        en: "Defining a function doesn't run it. To run it, **call** it by name with parentheses: `add(2, 3)`.",
      },
      {
        icon: "➡️",
        ar: "**الدالة السهمية** (arrow function) طريقة أقصر: `const add = (a, b) => a + b;` إذا كانت سطرًا واحدًا فلا تحتاج `return` ولا `{ }`.",
        en: "An **arrow function** is shorter: `const add = (a, b) => a + b;` For a one-liner you need neither `return` nor `{ }`.",
      },
    ],
    example: {
      code: "function greet(name) {\n  return `Hello, ${name}!`;\n}\n\nconst square = (n) => n * n;\n\nconsole.log(greet(\"Sara\"));\nconsole.log(square(4));",
      note: { ar: "دالة عادية ودالة سهمية، ثم استدعاؤهما.", en: "A regular function and an arrow function, then calling them." },
      lang: "js",
    },
    tip: {
      text: {
        ar: "أقصر طريقة لكتابة دالة: `const name = (params) => result;`. استخدم الدالة العادية `function` عندما تحتاج عدة أسطر وتريد اسمًا واضحًا.",
        en: "The shortest way to write a function: `const name = (params) => result;`. Use a regular `function` when you need several lines and a clear name.",
      },
      code: "const add = (a, b) => a + b;",
    },
    modern: {
      old: "var add = function (a, b) {\n  return a + b;\n};",
      now: "const add = (a, b) => a + b;",
      text: {
        ar: "الدوال السهمية أقصر وأوضح، وهي الشكل الأكثر استخدامًا في الكود الحديث و React.",
        en: "Arrow functions are shorter and clearer, and they're the most common form in modern code and React.",
      },
      since: "ES2015",
    },
    files: ["js", "html"],
    starter: { js: "// اكتب الدالة add هنا\n\n", html: "<h1>Functions</h1>\n" },
    solution: { js: "const add = (a, b) => a + b;\n\nconsole.log(add(2, 3));\n", html: "<h1>Functions</h1>\n" },
    harness: 'try { console.log("__add__", add(7, 8)); } catch (e) { console.log("__add__", "missing"); }',
    tasks: [
      { id: "define", label: { ar: "اكتب دالة `add(a, b)` تُرجع مجموع العددين", en: "Write `add(a, b)` that returns the sum" }, test: ({ logs }) => printed(logs, "__add__ 15") },
      { id: "call", label: { ar: "اطبع ناتج `add(2, 3)`", en: "Print the result of `add(2, 3)`" }, test: ({ logs }) => printed(logs, "5") },
    ],
    hints: [
      { ar: "`const add = (a, b) => a + b;`", en: "`const add = (a, b) => a + b;`" },
      { ar: "`console.log(add(2, 3));`", en: "`console.log(add(2, 3));`" },
    ],
    xp: 30,
  },
  {
    slug: "arrays-loops",
    title: { ar: "المصفوفات والحلقات", en: "Arrays and loops" },
    body: [
      {
        icon: "🗂️",
        ar: "**المصفوفة** (array) قائمة قيم بين `[ ]`: `const fruits = [\"apple\", \"banana\"];`. العدّ يبدأ من صفر: `fruits[0]` هو `\"apple\"`، و `fruits.length` عدد العناصر.",
        en: "An **array** is a list of values in `[ ]`: `const fruits = [\"apple\", \"banana\"];`. Counting starts at zero: `fruits[0]` is `\"apple\"`, and `fruits.length` is the count.",
      },
      {
        icon: "🔁",
        ar: "**الحلقة** تكرر كودًا لكل عنصر. أسهلها: `for (const fruit of fruits) { console.log(fruit); }`.",
        en: "A **loop** repeats code for each item. The simplest: `for (const fruit of fruits) { console.log(fruit); }`.",
      },
      {
        icon: "🪄",
        ar: "`map()` تصنع مصفوفة جديدة بتحويل كل عنصر: `[1, 2, 3].map(n => n * 2)` تعطي `[2, 4, 6]`. و `filter()` تختار العناصر التي تحقق شرطًا.",
        en: "`map()` builds a new array by transforming each item: `[1, 2, 3].map(n => n * 2)` gives `[2, 4, 6]`. `filter()` keeps the items that pass a test.",
      },
    ],
    example: {
      code: "const nums = [1, 2, 3, 4];\n\nfor (const n of nums) {\n  console.log(n);\n}\n\nconsole.log(nums.map((n) => n * 10));\nconsole.log(nums.filter((n) => n > 2));",
      note: { ar: "طباعة كل عنصر، ثم map و filter.", en: "Print each item, then map and filter." },
      lang: "js",
    },
    modern: {
      old: "for (var i = 0; i < nums.length; i++) {\n  doubled.push(nums[i] * 2);\n}",
      now: "const doubled = nums.map((n) => n * 2);",
      text: {
        ar: "الحلقة بالعداد `i` ما زالت صحيحة، لكن `for...of` و `map` أوضح وأقل أخطاء في أغلب الحالات.",
        en: "The counter loop with `i` still works, but `for...of` and `map` are clearer and less error-prone in most cases.",
      },
      since: "ES2015",
    },
    files: ["js", "html"],
    starter: { js: "const prices = [10, 25, 40];\n\n", html: "<h1>Arrays</h1>\n" },
    solution: {
      js: "const prices = [10, 25, 40];\n\nfor (const price of prices) {\n  console.log(price);\n}\n\nconst doubled = prices.map((p) => p * 2);\nconsole.log(doubled.join(\",\"));\n",
      html: "<h1>Arrays</h1>\n",
    },
    tasks: [
      { id: "forof", label: { ar: "اطبع كل سعر بحلقة `for...of`", en: "Print each price with a `for...of` loop" }, test: ({ files, logs }) => /for\s*\(\s*const\s+\w+\s+of\s+prices\s*\)/.test(files.js ?? "") && printed(logs, "10") && printed(logs, "40") },
      { id: "map", label: { ar: "ضاعف الأسعار بـ `map` واطبعها هكذا: `20,50,80`", en: "Double the prices with `map` and print `20,50,80`" }, test: ({ files, logs }) => /\.map\(/.test(files.js ?? "") && logs.some((l) => l.replace(/[\s[\]]/g, "") === "20,50,80") },
    ],
    hints: [
      { ar: "`for (const price of prices) { console.log(price); }`", en: "`for (const price of prices) { console.log(price); }`" },
      { ar: '`console.log(prices.map((p) => p * 2).join(","));`', en: '`console.log(prices.map((p) => p * 2).join(","));`' },
    ],
    xp: 30,
  },
  {
    slug: "dom-events",
    title: { ar: "التفاعل مع الصفحة: DOM والأحداث", en: "Talking to the page: DOM and events" },
    body: [
      {
        icon: "🌳",
        ar: "**DOM** هو نسخة الصفحة التي تراها JavaScript. `document.querySelector(\"#title\")` يجلب العنصر الذي id الخاص به `title`، تمامًا مثل محددات CSS.",
        en: "The **DOM** is the page as JavaScript sees it. `document.querySelector(\"#title\")` grabs the element with id `title`, just like a CSS selector.",
      },
      {
        icon: "✏️",
        ar: "بعدها تغيّره: `title.textContent = \"New text\";` يغير النص، و `title.classList.add(\"active\")` يضيف class.",
        en: "Then change it: `title.textContent = \"New text\";` changes the text, and `title.classList.add(\"active\")` adds a class.",
      },
      {
        icon: "👆",
        ar: "**الأحداث** (events) هي ما يفعله المستخدم: ضغطة، كتابة، تمرير. `button.addEventListener(\"click\", () => { ... })` ينفّذ كودًا عند كل ضغطة.",
        en: "**Events** are what the user does: a click, typing, scrolling. `button.addEventListener(\"click\", () => { ... })` runs code on every click.",
      },
    ],
    example: {
      code: 'const btn = document.querySelector("#btn");\nlet count = 0;\n\nbtn.addEventListener("click", () => {\n  count++;\n  btn.textContent = `Clicked ${count}`;\n});',
      note: { ar: "زر يعدّ الضغطات. جرّبه في المحرر.", en: "A button that counts clicks. Try it in the editor." },
      lang: "js",
    },
    modern: {
      old: '<button onclick="doSomething()">',
      now: 'btn.addEventListener("click", doSomething);',
      text: {
        ar: "كتابة JavaScript داخل HTML بـ `onclick` تخلط اللغتين. `addEventListener` تُبقي كل لغة في ملفها.",
        en: "Writing JavaScript inside HTML with `onclick` mixes the languages. `addEventListener` keeps each language in its own file.",
      },
    },
    files: ["js", "html"],
    starter: {
      js: "// غيّر نص #out عند الضغط على الزر\n",
      html: '<button id="btn">Say hi</button>\n<p id="out">...</p>\n',
    },
    solution: {
      js: 'const btn = document.querySelector("#btn");\nconst out = document.querySelector("#out");\n\nbtn.addEventListener("click", () => {\n  out.textContent = "Hi!";\n});\n',
      html: '<button id="btn">Say hi</button>\n<p id="out">...</p>\n',
    },
    harness: 'document.querySelector("#btn")?.click(); console.log("__out__", document.querySelector("#out")?.textContent ?? "");',
    tasks: [
      { id: "query", label: { ar: "اجلب الزر بـ `querySelector`", en: "Grab the button with `querySelector`" }, test: ({ files }) => /querySelector\(\s*["'`]#btn["'`]\s*\)/.test(files.js ?? "") },
      { id: "listen", label: { ar: "أضف `addEventListener(\"click\", ...)`", en: "Add `addEventListener(\"click\", ...)`" }, test: ({ files }) => /addEventListener\(\s*["'`]click["'`]/.test(files.js ?? "") },
      { id: "text", label: { ar: "عند الضغط اجعل نص `#out` يساوي `Hi!`", en: "On click, set `#out`'s text to `Hi!`" }, test: ({ logs }) => printed(logs, "__out__ Hi!") },
    ],
    hints: [
      { ar: '`const btn = document.querySelector("#btn");` و `const out = document.querySelector("#out");`', en: '`const btn = document.querySelector("#btn");` and `const out = document.querySelector("#out");`' },
      { ar: '`btn.addEventListener("click", () => { out.textContent = "Hi!"; });`', en: '`btn.addEventListener("click", () => { out.textContent = "Hi!"; });`' },
    ],
    xp: 35,
  },
];

export const jsExam: Exam = {
  passPercent: 80,
  questions: [
    {
      id: "q1",
      prompt: { ar: "أي تعريف هو الأنسب لقيمة لن تتغير؟", en: "Which declaration fits a value that won't change?" },
      options: [
        { ar: "`var`", en: "`var`" },
        { ar: "`let`", en: "`let`" },
        { ar: "`const`", en: "`const`" },
      ],
      answer: 2,
    },
    {
      id: "q2",
      prompt: { ar: "ماذا يطبع هذا الكود؟", en: "What does this print?" },
      code: "const add = (a, b) => a + b;\nconsole.log(add(4, 6));",
      options: [
        { ar: "`46`", en: "`46`" },
        { ar: "`10`", en: "`10`" },
        { ar: "`add(4, 6)`", en: "`add(4, 6)`" },
      ],
      answer: 1,
    },
    {
      id: "q3",
      prompt: { ar: "ما قيمة `colors[0]`؟", en: "What is `colors[0]`?" },
      code: 'const colors = ["red", "green", "blue"];',
      options: [
        { ar: '`"red"`', en: '`"red"`' },
        { ar: '`"green"`', en: '`"green"`' },
        { ar: "`undefined`", en: "`undefined`" },
      ],
      answer: 0,
    },
    {
      id: "q4",
      prompt: { ar: "ما نتيجة `[1, 2, 3].map(n => n * 2)`؟", en: "What does `[1, 2, 3].map(n => n * 2)` give?" },
      options: [
        { ar: "`[2, 4, 6]`", en: "`[2, 4, 6]`" },
        { ar: "`12`", en: "`12`" },
        { ar: "`[1, 2, 3, 2]`", en: "`[1, 2, 3, 2]`" },
      ],
      answer: 0,
    },
    {
      id: "q5",
      prompt: { ar: "كيف تنفّذ كودًا عند الضغط على زر؟", en: "How do you run code when a button is clicked?" },
      options: [
        { ar: '`btn.addEventListener("click", fn)`', en: '`btn.addEventListener("click", fn)`' },
        { ar: '`btn.click = fn`', en: '`btn.click = fn`' },
        { ar: '`console.log("click")`', en: '`console.log("click")`' },
      ],
      answer: 0,
    },
  ],
};
