import type { Challenge } from "./challenges";
import { printed } from "./check";
import type { Lesson, Question } from "./types";

/**
 * JavaScript Phase 1 (Fundamentals): setup, data types, operators, conditions, switch,
 * loops, break/continue and functions. One idea per lesson, checked by behavior.
 */

const c = (logs: string[], name: string, value: string | number | boolean) => printed(logs, `__c__ ${name} ${value}`);
/** True when the lines `values` appear one after another somewhere in the console output. */
const inOrder = (logs: string[], values: string[]) => {
  const l = logs.map((x) => x.trim().toLowerCase());
  for (let i = 0; i + values.length <= l.length; i++) {
    if (values.every((v, j) => l[i + j] === v.toLowerCase())) return true;
  }
  return false;
};
const count = (logs: string[], value: string) => logs.filter((l) => l.trim().toLowerCase() === value.toLowerCase()).length;

export const setup: Lesson = {
  slug: "setup",
  title: { ar: "تجهيز بيئة العمل", en: "Setting up your tools" },
  body: [
    { icon: "🧰", ar: "تحتاج أداتين فقط: **محرر كود** مثل VS Code (مجاني من `code.visualstudio.com`)، و**متصفح** حديث مثل Chrome أو Firefox أو Edge.", en: "You only need two tools: a **code editor** like VS Code (free from `code.visualstudio.com`), and a modern **browser** like Chrome, Firefox or Edge." },
    { icon: "🛠️", ar: "في المتصفح اضغط `F12` (أو زر الفأرة الأيمن ثم «فحص») لتفتح **أدوات المطور** (DevTools). افتح تبويب **Console**: هنا تظهر رسائل `console.log` والأخطاء.", en: "In the browser press `F12` (or right-click, then Inspect) to open **DevTools**. Open the **Console** tab: this is where `console.log` messages and errors appear." },
    { icon: "📄", ar: "أنشئ مجلدًا فيه ملفان: `index.html` و `script.js`. اربط الملف في آخر `<body>` بالسطر `<script src=\"script.js\"></script>` حتى تُحمَّل الصفحة أولًا ثم يعمل الكود.", en: "Create a folder with two files: `index.html` and `script.js`. Link the script at the end of `<body>` with `<script src=\"script.js\"></script>`, so the page loads first and then the code runs." },
    { icon: "👋", ar: "اكتب في `script.js` أول سطر: `console.log(\"Hello, World!\");` ثم افتح `index.html` في المتصفح وانظر إلى الـ Console.", en: "In `script.js` write your first line: `console.log(\"Hello, World!\");` then open `index.html` in the browser and look at the Console." },
  ],
  example: {
    code: '<!-- index.html -->\n<!DOCTYPE html>\n<html lang="en">\n<head>\n  <meta charset="UTF-8">\n  <title>My first JS</title>\n</head>\n<body>\n  <h1>Hello!</h1>\n\n  <script src="script.js"></script>\n</body>\n</html>\n\n// script.js\nconsole.log("Hello, World!");',
    note: { ar: "ملف HTML يربط ملف JavaScript في آخر body.", en: "An HTML file linking a JavaScript file at the end of body." },
    lang: "none",
  },
  files: [],
  starter: {},
  solution: {},
  tasks: [],
  hints: [],
  deep: {
    more: [
      { icon: "🧩", ar: "إضافة **Live Server** في VS Code تفتح الصفحة وتحدّثها تلقائيًا كلما حفظت الملف.", en: "The **Live Server** extension in VS Code opens your page and refreshes it every time you save." },
      { icon: "⌨️", ar: "يمكنك كتابة JavaScript مباشرة في الـ Console وضغط Enter لتجربة سطر سريع، مثل `2 + 2`.", en: "You can type JavaScript straight into the Console and press Enter to try a quick line, like `2 + 2`." },
      { icon: "🧭", ar: "يمكن وضع `<script defer src=\"script.js\">` داخل `<head>` بدل آخر body، وله النتيجة نفسها: الكود ينتظر الصفحة.", en: "You can also put `<script defer src=\"script.js\">` in `<head>` instead of the end of body; it has the same effect: the code waits for the page." },
    ],
    mistakes: [
      { ar: "اسم الملف في `src` لا يطابق اسم الملف الحقيقي (`Script.js` مقابل `script.js`) ← الاسم يجب أن يتطابق تمامًا.", en: "The name in `src` doesn't match the real file (`Script.js` vs `script.js`) → the names must match exactly." },
      { ar: "البحث عن رسالة `console.log` داخل الصفحة نفسها ← هي تظهر في تبويب Console في أدوات المطور.", en: "Looking for a `console.log` message on the page itself → it shows up in the DevTools Console tab." },
      { ar: "نسيان حفظ الملف قبل تحديث المتصفح ← احفظ (`Ctrl+S`) ثم حدّث الصفحة.", en: "Forgetting to save before refreshing → save (`Ctrl+S`), then refresh the page." },
    ],
  },
  quiz: [
    {
      id: "q1",
      prompt: { ar: "أين تظهر رسائل `console.log`؟", en: "Where do `console.log` messages appear?" },
      options: [
        { ar: "داخل الصفحة تحت العنوان", en: "On the page, under the heading" },
        { ar: "في تبويب Console في أدوات المطور (F12)", en: "In the Console tab of DevTools (F12)" },
        { ar: "في شريط عنوان المتصفح", en: "In the browser's address bar" },
      ],
      answer: 1,
    },
    {
      id: "q2",
      prompt: { ar: "كيف تربط الملف `script.js` بالصفحة؟", en: "How do you link `script.js` to the page?" },
      options: [
        { ar: '`<script src="script.js"></script>`', en: '`<script src="script.js"></script>`' },
        { ar: '`<link href="script.js">`', en: '`<link href="script.js">`' },
        { ar: '`<js file="script.js">`', en: '`<js file="script.js">`' },
      ],
      answer: 0,
    },
    {
      id: "q3",
      prompt: { ar: "لماذا نضع وسم `<script>` في آخر `<body>`؟", en: "Why do we put the `<script>` tag at the end of `<body>`?" },
      options: [
        { ar: "لأن JavaScript لا يعمل في أعلى الصفحة أبدًا", en: "Because JavaScript never works at the top of a page" },
        { ar: "ليصبح الخط أكبر", en: "To make the text bigger" },
        { ar: "لتُحمَّل عناصر الصفحة أولًا ثم يعمل الكود", en: "So the page's elements load first, then the code runs" },
      ],
      answer: 2,
    },
  ],
  xp: 20,
};

export const dataTypes: Lesson = {
  slug: "data-types",
  title: { ar: "أنواع البيانات: رقم ونص ومنطقي", en: "Data types: number, text and boolean" },
  body: [
    { icon: "🔢", ar: "كل قيمة في JavaScript لها **نوع**. أهمها: **الرقم** (number) مثل `21`، و**النص** (string) بين علامتي تنصيص مثل `\"21\"`، و**المنطقي** (boolean) وهو `true` (صحيح) أو `false` (خطأ) فقط.", en: "Every value in JavaScript has a **type**. The main ones: **number** like `21`, **string** (text) in quotes like `\"21\"`, and **boolean**, which is only `true` or `false`." },
    { icon: "🕳️", ar: "وهناك نوعان للفراغ: `undefined` يعني «لا قيمة بعد»، مثل `let phone;` قبل أن تعطيه قيمة. و `null` يعني «لا شيء» وتضعه أنت عن قصد: `let winner = null;`.", en: "There are two kinds of empty: `undefined` means no value yet, like `let phone;` before you give it one. `null` means nothing, and you set it on purpose: `let winner = null;`." },
    { icon: "🏷️", ar: "`typeof` يخبرك بالنوع: `typeof 21` يعطي `\"number\"`، و `typeof \"21\"` يعطي `\"string\"`، و `typeof true` يعطي `\"boolean\"`، و `typeof undefined` يعطي `\"undefined\"`.", en: "`typeof` tells you the type: `typeof 21` gives `\"number\"`, `typeof \"21\"` gives `\"string\"`, `typeof true` gives `\"boolean\"`, and `typeof undefined` gives `\"undefined\"`." },
    { icon: "🔁", ar: "انتبه: `+` مع نص **يلصق** ولا يجمع: `\"21\" + 1` يعطي `\"211\"`. للتحويل: `Number(\"21\")` يعطي الرقم `21` (أو `NaN` أي «ليس رقمًا» إذا لم يكن النص رقمًا)، و `String(21)` يعطي النص `\"21\"`.", en: "Careful: `+` with text **glues** instead of adding: `\"21\" + 1` gives `\"211\"`. To convert: `Number(\"21\")` gives the number `21` (or `NaN`, not a number, if the text isn't a number), and `String(21)` gives the text `\"21\"`." },
  ],
  example: {
    code: 'const price = "5";\nlet phone;\n\nconsole.log(typeof price);        // string\nconsole.log(price + 1);            // 51\nconsole.log(Number(price) + 1);    // 6\nconsole.log(typeof String(10));    // string\nconsole.log(Number("hello"));      // NaN\nconsole.log(typeof false);         // boolean\nconsole.log(phone);                // undefined',
    note: { ar: "نص يُلصق، ورقم يُجمع، ومتغير بلا قيمة يعطي undefined.", en: "Text glues, numbers add, and a variable with no value gives undefined." },
    lang: "js",
  },
  files: ["js"],
  starter: { js: 'const age = "21"; // typed in a form, so it is text\nconst year = 2026;\n\n' },
  solution: { js: 'const age = "21"; // typed in a form, so it is text\nconst year = 2026;\n\nconsole.log(typeof age);\nconsole.log(Number(age) + 1);\nconsole.log(typeof String(year));\nconsole.log(typeof true);\n' },
  tasks: [
    { id: "typeof", label: { ar: "اطبع نوع `age` بـ `typeof` (يظهر `string`)", en: "Print the type of `age` with `typeof` (it shows `string`)" }, test: ({ files, logs }) => /typeof\s*\(?\s*age\b/.test(files.js ?? "") && printed(logs, "string") },
    { id: "number", label: { ar: "حوّل `age` إلى رقم بـ `Number` واطبعه مضافًا إليه 1 (يظهر `22` وليس `211`)", en: "Turn `age` into a number with `Number` and print it plus 1 (it shows `22`, not `211`)" }, test: ({ files, logs }) => /Number\(\s*age\s*\)/.test(files.js ?? "") && printed(logs, "22") },
    { id: "string", label: { ar: "حوّل `year` إلى نص بـ `String` واطبع نوعه (يظهر `string`)", en: "Turn `year` into text with `String` and print its type (it shows `string`)" }, test: ({ files, logs }) => /String\(\s*year\s*\)/.test(files.js ?? "") && count(logs, "string") >= 2 },
    { id: "boolean", label: { ar: "اطبع `typeof true` (يظهر `boolean`)", en: "Print `typeof true` (it shows `boolean`)" }, test: ({ logs }) => printed(logs, "boolean") },
  ],
  hints: [
    { ar: "`console.log(typeof age);` و `console.log(typeof true);`", en: "`console.log(typeof age);` and `console.log(typeof true);`" },
    { ar: "`console.log(Number(age) + 1);` ثم `console.log(typeof String(year));`", en: "`console.log(Number(age) + 1);` then `console.log(typeof String(year));`" },
  ],
  deep: {
    more: [
      { icon: "🤔", ar: "غرابة قديمة: `typeof null` يعطي `\"object\"` وليس `\"null\"`. هذا خطأ قديم في اللغة بقي كما هو؛ للتحقق اكتب `value === null`.", en: "An old quirk: `typeof null` gives `\"object\"`, not `\"null\"`. It's a historic bug kept in the language; to check, write `value === null`." },
      { icon: "🧮", ar: "`-` و `*` و `/` تحوّل النص إلى رقم تلقائيًا: `\"6\" * 2` يعطي `12`. أما `+` فيلصق. لذلك حوّل بنفسك بـ `Number` لتكون واضحًا.", en: "`-`, `*` and `/` turn text into numbers automatically: `\"6\" * 2` gives `12`. Only `+` glues. So convert yourself with `Number` to be clear." },
      { icon: "🔎", ar: "للتحقق من رقم صالح: `Number.isNaN(Number(text))` يعطي `true` إذا لم يكن النص رقمًا.", en: "To check for a valid number: `Number.isNaN(Number(text))` gives `true` when the text isn't a number." },
    ],
    mistakes: [
      { ar: "`\"5\" + 1` ثم الحيرة من `51` ← حوّل أولًا: `Number(\"5\") + 1`.", en: "`\"5\" + 1` and wondering about `51` → convert first: `Number(\"5\") + 1`." },
      { ar: "`\"true\"` بين علامتي تنصيص ← هذا نص وليس منطقيًا. القيمة المنطقية تُكتب بلا علامات: `true`.", en: "`\"true\"` in quotes → that's text, not a boolean. A boolean is written without quotes: `true`." },
      { ar: "`number(age)` بحرف صغير ← الاسم `Number` بحرف كبير، ومثله `String`.", en: "`number(age)` in lowercase → the name is `Number` with a capital, and so is `String`." },
    ],
  },
  xp: 25,
};

export const operators: Lesson = {
  slug: "operators",
  title: { ar: "العمليات: حساب ومقارنة ومنطق", en: "Operators: math, comparison and logic" },
  body: [
    { icon: "➗", ar: "عمليات الحساب: `+` جمع، `-` طرح، `*` ضرب، `/` قسمة، `**` أُس (`2 ** 3` يعطي `8`)، و `%` **باقي القسمة**: `17 % 5` يعطي `2`.", en: "Math operators: `+` add, `-` subtract, `*` multiply, `/` divide, `**` power (`2 ** 3` gives `8`), and `%` the **remainder**: `17 % 5` gives `2`." },
    { icon: "✏️", ar: "لتحديث متغير `let` بسرعة: `score += 5` تعني `score = score + 5`، ومثلها `-=`. و `count++` تزيد واحدًا.", en: "To update a `let` variable quickly: `score += 5` means `score = score + 5`, and `-=` works the same way. `count++` adds one." },
    { icon: "⚖️", ar: "المقارنة تعطي `true` أو `false`: `===` يساوي، `!==` لا يساوي، و `>` و `<` و `>=` و `<=`. استخدم `===` الثلاثية دائمًا.", en: "Comparisons give `true` or `false`: `===` equal, `!==` not equal, and `>`, `<`, `>=`, `<=`. Always use triple `===`." },
    { icon: "🔗", ar: "العمليات المنطقية تجمع الشروط: `&&` (و) صحيحة إذا كان الطرفان صحيحين، `||` (أو) صحيحة إذا كان أحدهما صحيحًا، و `!` (ليس) تقلب القيمة: `!true` يعطي `false`.", en: "Logical operators combine conditions: `&&` (and) is true when both sides are true, `||` (or) when at least one is, and `!` (not) flips a value: `!true` gives `false`." },
  ],
  example: {
    code: "let points = 10;\npoints += 5;\npoints++;\n\nconsole.log(points);          // 16\nconsole.log(10 % 3);          // 1\nconsole.log(2 ** 4);          // 16\nconsole.log(points === 16);   // true\nconsole.log(points > 20 || points < 0); // false\nconsole.log(!false);          // true",
    note: { ar: "تحديث متغير، ثم حساب ومقارنة ومنطق.", en: "Updating a variable, then math, comparison and logic." },
    lang: "js",
  },
  files: ["js"],
  starter: { js: "const a = 17;\nconst b = 5;\nlet score = 10;\nconst age = 20;\nconst hasTicket = false;\n\n" },
  solution: { js: "const a = 17;\nconst b = 5;\nlet score = 10;\nconst age = 20;\nconst hasTicket = false;\n\nconsole.log(a % b);\n\nscore += 5;\nconsole.log(score);\n\nconsole.log(a > b);\n\nconsole.log(age >= 18 && hasTicket);\n" },
  tasks: [
    { id: "remainder", label: { ar: "اطبع باقي قسمة `a` على `b` بـ `%` (يظهر `2`)", en: "Print the remainder of `a` divided by `b` with `%` (it shows `2`)" }, test: ({ files, logs }) => /%/.test(files.js ?? "") && printed(logs, "2") },
    { id: "plus-equals", label: { ar: "أضف 5 إلى `score` بـ `+=` ثم اطبعه (يظهر `15`)", en: "Add 5 to `score` with `+=`, then print it (it shows `15`)" }, test: ({ files, logs }) => /\bscore\s*(\+=|=\s*score\s*\+)/.test(files.js ?? "") && printed(logs, "15") },
    { id: "compare", label: { ar: "اطبع هل `a` أكبر من `b` بـ `>` (يظهر `true`)", en: "Print whether `a` is greater than `b` with `>` (it shows `true`)" }, test: ({ files, logs }) => /\ba\s*>\s*b\b|\bb\s*<\s*a\b/.test(files.js ?? "") && printed(logs, "true") },
    { id: "and", label: { ar: "اطبع `age >= 18 && hasTicket` (يظهر `false` لأن التذكرة غير موجودة)", en: "Print `age >= 18 && hasTicket` (it shows `false`, because there's no ticket)" }, test: ({ files, logs }) => /&&/.test(files.js ?? "") && printed(logs, "false") },
  ],
  hints: [
    { ar: "`console.log(a % b);` ثم `score += 5;` و `console.log(score);`", en: "`console.log(a % b);` then `score += 5;` and `console.log(score);`" },
    { ar: "`console.log(a > b);` ثم `console.log(age >= 18 && hasTicket);`", en: "`console.log(a > b);` then `console.log(age >= 18 && hasTicket);`" },
  ],
  deep: {
    more: [
      { icon: "🔟", ar: "`%` مفيد جدًا: `n % 2 === 0` يعني أن `n` عدد زوجي، و `n % 2 === 1` يعني فردي.", en: "`%` is very handy: `n % 2 === 0` means `n` is even, and `n % 2 === 1` means it's odd." },
      { icon: "🧮", ar: "الترتيب مثل الرياضيات: `*` و `/` قبل `+` و `-`. `2 + 3 * 4` يعطي `14`. استخدم الأقواس لتغيير الترتيب: `(2 + 3) * 4` يعطي `20`.", en: "Order works like in math: `*` and `/` before `+` and `-`. `2 + 3 * 4` gives `14`. Use parentheses to change it: `(2 + 3) * 4` gives `20`." },
      { icon: "🚦", ar: "`&&` تتوقف عند أول قيمة خاطئة، و `||` تتوقف عند أول قيمة صحيحة؛ لذلك لا يُحسب الطرف الثاني أحيانًا.", en: "`&&` stops at the first false value and `||` stops at the first true one, so the second side sometimes isn't even evaluated." },
    ],
    mistakes: [
      { ar: "كتابة `=` للمقارنة `if (a = 5)` ← `=` يضع قيمة، والمقارنة `===`.", en: "Writing `=` to compare, `if (a = 5)` → `=` assigns a value; comparing is `===`." },
      { ar: "`score += 5` على متغير `const` ← يعطي خطأ؛ المتغير الذي يتغير يُعرَّف بـ `let`.", en: "`score += 5` on a `const` → it throws an error; a variable that changes is declared with `let`." },
      { ar: "`&` أو `|` المفردة بدل `&&` و `||` ← المنطق يحتاج الرمز مرتين.", en: "A single `&` or `|` instead of `&&` and `||` → logic needs the symbol twice." },
    ],
  },
  xp: 25,
};

export const conditions: Lesson = {
  slug: "conditions",
  title: { ar: "الشروط: if و else if و else", en: "Conditions: if, else if and else" },
  body: [
    { icon: "🔀", ar: "البرامج تتخذ **قرارات**. `if (score >= 50) { ... }` يشغّل الكود بين `{ }` فقط إذا كان الشرط `true`، و `else { ... }` يعمل في الحالة الأخرى.", en: "Programs make **decisions**. `if (score >= 50) { ... }` runs the code in `{ }` only when the condition is `true`, and `else { ... }` runs otherwise." },
    { icon: "🪜", ar: "لأكثر من احتمالين أضف `else if (شرط) { ... }` بينهما. JavaScript يفحص الشروط من الأعلى، ويشغّل **أول** شرط صحيح فقط ويتجاهل الباقي.", en: "For more than two options, add `else if (condition) { ... }` in between. JavaScript checks from the top and runs only the **first** true branch, skipping the rest." },
    { icon: "❓", ar: "لقرار صغير بين قيمتين استخدم **الشرط المختصر** (ternary): `شرط ? قيمة1 : قيمة2`. مثل: `console.log(age >= 18 ? \"adult\" : \"minor\");`", en: "For a small choice between two values use the **ternary**: `condition ? value1 : value2`. For example: `console.log(age >= 18 ? \"adult\" : \"minor\");`" },
    { icon: "⚖️", ar: "في الشروط قارن دائمًا بـ `===` الثلاثية، لا `==` المزدوجة، لأن `==` تحوّل الأنواع بصمت: `\"5\" == 5` تعطي `true`.", en: "In conditions always compare with triple `===`, not double `==`, because `==` silently converts types: `\"5\" == 5` gives `true`." },
  ],
  example: {
    code: 'const temp = 18;\n\nif (temp >= 30) {\n  console.log("hot");\n} else if (temp >= 15) {\n  console.log("nice");\n} else {\n  console.log("cold");\n}\n\nconst isWeekend = true;\nconsole.log(isWeekend ? "rest" : "work");',
    note: { ar: "ثلاثة احتمالات يعمل واحد منها فقط، ثم شرط مختصر.", en: "Three branches where only one runs, then a ternary." },
    lang: "js",
  },
  modern: {
    old: 'if (answer == "5") { … }  // "5" == 5 is true!',
    now: "if (answer === 5) { … }",
    text: { ar: "`==` يحوّل الأنواع بصمت فيسبب أخطاء غريبة. المحترفون يستخدمون `===` دائمًا.", en: "`==` silently converts types and causes strange bugs. Professionals always use `===`." },
  },
  files: ["js"],
  starter: { js: "const score = 70;\nconst age = 20;\n\n// score: 85 or more → \"excellent\", 50 or more → \"pass\", otherwise \"fail\"\n// age: 18 or more → \"adult\", otherwise \"minor\"\n" },
  solution: { js: 'const score = 70;\nconst age = 20;\n\nif (score >= 85) {\n  console.log("excellent");\n} else if (score >= 50) {\n  console.log("pass");\n} else {\n  console.log("fail");\n}\n\nconsole.log(age >= 18 ? "adult" : "minor");\n' },
  // The code also runs with score = 90, 30 and 50, to check every branch and the boundary.
  variants: { find: "(\\b(?:const|let|var)\\s+score\\s*=\\s*)[^;\\n]+", values: ["90", "30", "50"] },
  tasks: [
    { id: "pass", label: { ar: "مع `score = 70` و `score = 50` يُطبع `pass`", en: "With `score = 70` and `score = 50`, it prints `pass`" }, test: ({ logs, runs }) => [logs, runs[2] ?? []].every((l) => printed(l, "pass") && !printed(l, "excellent") && !printed(l, "fail")) },
    { id: "excellent", label: { ar: "مع `score = 90` يُطبع `excellent` فقط", en: "With `score = 90`, it prints only `excellent`" }, test: ({ runs }) => printed(runs[0] ?? [], "excellent") && !printed(runs[0] ?? [], "pass") && !printed(runs[0] ?? [], "fail") },
    { id: "fail", label: { ar: "مع `score = 30` يُطبع `fail`", en: "With `score = 30`, it prints `fail`" }, test: ({ runs }) => printed(runs[1] ?? [], "fail") && !printed(runs[1] ?? [], "pass") && !printed(runs[1] ?? [], "excellent") },
    { id: "else-if", label: { ar: "استخدم `if` و `else if` و `else` لقرار `score` (واترك اسم المتغير `score`)", en: "Use `if`, `else if` and `else` for the `score` decision (keep the variable named `score`)" }, test: ({ files }) => { const js = files.js ?? ""; return /\bif\s*\(/.test(js) && /\belse\s+if\s*\(/.test(js) && /\belse\b(?!\s+if\b)/.test(js) && /\bscore\b/.test(js); } },
    { id: "ternary", label: { ar: "اطبع `adult` أو `minor` حسب `age` بالشرط المختصر `? :` (يظهر `adult`)", en: "Print `adult` or `minor` from `age` with the ternary `? :` (it shows `adult`)" }, test: ({ files, logs }) => /\bage\b[^;?\n]*\?[^:;\n]+:/.test(files.js ?? "") && printed(logs, "adult") && !printed(logs, "minor") },
    { id: "strict", label: { ar: "لا تستخدم `==` المزدوجة", en: "Don't use double `==`" }, test: ({ files }) => !/[^=!<>]==[^=]/.test(files.js ?? "") },
  ],
  hints: [
    { ar: "`if (score >= 85) { console.log(\"excellent\"); } else if (score >= 50) { ... } else { ... }`", en: "`if (score >= 85) { console.log(\"excellent\"); } else if (score >= 50) { ... } else { ... }`" },
    { ar: "للعمر: `console.log(age >= 18 ? \"adult\" : \"minor\");`", en: "For the age: `console.log(age >= 18 ? \"adult\" : \"minor\");`" },
  ],
  deep: {
    more: [
      { icon: "🔢", ar: "ترتيب `else if` مهم: ضع الشرط الأصعب أولًا. لو بدأت بـ `score >= 50` لدخل الطالب صاحب 90 فيه ولن يصل إلى `excellent`.", en: "The order of `else if` matters: put the hardest condition first. If you start with `score >= 50`, a 90 lands there and never reaches `excellent`." },
      { icon: "🧪", ar: "الشرط يقبل أي قيمة: `0` و `\"\"` و `null` و `undefined` و `NaN` تُعامل كـ `false`، وكل ما عداها كـ `true`.", en: "A condition accepts any value: `0`, `\"\"`, `null`, `undefined` and `NaN` count as `false`, and everything else as `true`." },
      { icon: "✂️", ar: "استخدم الشرط المختصر `? :` لاختيار **قيمة** واحدة، واستخدم `if` عندما تريد تنفيذ عدة أسطر.", en: "Use the ternary `? :` to pick one **value**, and use `if` when you need to run several lines." },
    ],
    mistakes: [
      { ar: "`if (score = 50)` بعلامة واحدة ← هذا يضع القيمة. للمقارنة `===` أو `>=`.", en: "`if (score = 50)` with one sign → that assigns. To compare, use `===` or `>=`." },
      { ar: "كتابة `else (score < 50)` بشرط ← `else` لا تأخذ شرطًا. للشرط اكتب `else if (...)`.", en: "Writing `else (score < 50)` with a condition → `else` takes no condition. For one, write `else if (...)`." },
      { ar: "ترتيب الشروط من الأسهل إلى الأصعب ← أول شرط صحيح يفوز، فابدأ بالأصعب.", en: "Ordering conditions from easiest to hardest → the first true one wins, so start with the hardest." },
    ],
  },
  xp: 30,
};

export const switchCase: Lesson = {
  slug: "switch",
  title: { ar: "switch: اختيار من عدة قيم", en: "switch: choosing between many values" },
  body: [
    { icon: "🎛️", ar: "عندما تقارن متغيرًا واحدًا بعدة قيم ثابتة، يكون `switch` أوضح من سلسلة `else if` طويلة: `switch (day) { ... }`.", en: "When you compare one variable against many fixed values, `switch` is clearer than a long `else if` chain: `switch (day) { ... }`." },
    { icon: "🏷️", ar: "كل احتمال يبدأ بـ `case \"sat\":` ثم الكود. و `break;` يُنهي الـ switch؛ بدونه يستمر التنفيذ إلى الحالة التالية.", en: "Each option starts with `case \"sat\":` followed by its code. `break;` ends the switch; without it, execution falls through to the next case." },
    { icon: "🧺", ar: "لتشارك عدة قيم الكود نفسه، اكتب حالاتها متتالية: `case \"sat\":` ثم `case \"sun\":` ثم الكود مرة واحدة.", en: "To make several values share the same code, stack their cases: `case \"sat\":` then `case \"sun\":`, then the code once." },
    { icon: "🛟", ar: "`default:` يعمل عندما لا تطابق أي حالة، مثل `else` الأخيرة. والمقارنة في `switch` صارمة مثل `===`.", en: "`default:` runs when no case matches, like a final `else`. Comparisons in `switch` are strict, like `===`." },
  ],
  example: {
    code: 'const fruit = "apple";\n\nswitch (fruit) {\n  case "apple":\n  case "pear":\n    console.log("orchard fruit");\n    break;\n  case "banana":\n    console.log("tropical fruit");\n    break;\n  default:\n    console.log("unknown fruit");\n}',
    note: { ar: "حالتان تتشاركان كودًا واحدًا، و default لكل ما عداهما.", en: "Two cases share one block, and default catches everything else." },
    lang: "js",
  },
  files: ["js"],
  starter: { js: 'const day = "sat";\n\n// "sat" or "sun" → print "weekend", anything else → print "weekday"\n' },
  solution: { js: 'const day = "sat";\n\nswitch (day) {\n  case "sat":\n  case "sun":\n    console.log("weekend");\n    break;\n  default:\n    console.log("weekday");\n}\n' },
  // The code also runs with day = "sun" and day = "mon".
  variants: { find: "(\\b(?:const|let|var)\\s+day\\s*=\\s*)[^;\\n]+", values: ['"sun"', '"mon"'] },
  tasks: [
    { id: "sat", label: { ar: "مع `day = \"sat\"` يُطبع `weekend` فقط", en: "With `day = \"sat\"`, it prints only `weekend`" }, test: ({ logs }) => printed(logs, "weekend") && !printed(logs, "weekday") },
    { id: "sun", label: { ar: "مع `day = \"sun\"` يُطبع `weekend` أيضًا (اجمع الحالتين)", en: "With `day = \"sun\"`, it prints `weekend` too (group the two cases)" }, test: ({ runs }) => printed(runs[0] ?? [], "weekend") && !printed(runs[0] ?? [], "weekday") },
    { id: "other", label: { ar: "مع `day = \"mon\"` يُطبع `weekday` فقط", en: "With `day = \"mon\"`, it prints only `weekday`" }, test: ({ runs }) => printed(runs[1] ?? [], "weekday") && !printed(runs[1] ?? [], "weekend") },
    { id: "switch", label: { ar: "استخدم `switch` مع `default` (واترك اسم المتغير `day`)", en: "Use `switch` with `default` (keep the variable named `day`)" }, test: ({ files }) => /\bswitch\s*\(\s*day\s*\)/.test(files.js ?? "") && /\bdefault\s*:/.test(files.js ?? "") },
  ],
  hints: [
    { ar: "`switch (day) { case \"sat\": case \"sun\": ... }`", en: "`switch (day) { case \"sat\": case \"sun\": ... }`" },
    { ar: "بعد `console.log(\"weekend\");` اكتب `break;` ثم `default: console.log(\"weekday\");`", en: "After `console.log(\"weekend\");` write `break;` then `default: console.log(\"weekday\");`" },
  ],
  deep: {
    more: [
      { icon: "⬇️", ar: "«السقوط» (fall-through) بدون `break` هو ما يجعل الحالات المتتالية تتشارك الكود؛ لكنه خطأ شائع عندما تنساه دون قصد.", en: "Fall-through without `break` is what lets stacked cases share code, but it's a common bug when you forget it by accident." },
      { icon: "🔀", ar: "استخدم `switch` لقيم ثابتة محددة (أيام، أوامر، ألوان)، واستخدم `if` للمدى مثل `score >= 50`.", en: "Use `switch` for fixed, exact values (days, commands, colors), and `if` for ranges like `score >= 50`." },
      { icon: "📍", ar: "`default` لا يحتاج `break` إذا كان الأخير، ويمكن وضعه في أي مكان لكن الأوضح أن يكون في النهاية.", en: "`default` needs no `break` when it's last; it can go anywhere, but the end is clearest." },
    ],
    mistakes: [
      { ar: "نسيان `break` ← تعمل الحالة التالية أيضًا فتُطبع رسالتان.", en: "Forgetting `break` → the next case runs too and two messages print." },
      { ar: "`case \"sat\" || \"sun\":` ← هذا لا يعمل كما تتوقع. اكتب حالتين متتاليتين.", en: "`case \"sat\" || \"sun\":` → this doesn't work as you'd expect. Write two stacked cases." },
      { ar: "`case 5:` بينما القيمة النص `\"5\"` ← المقارنة صارمة، فالنوع يجب أن يتطابق.", en: "`case 5:` when the value is the text `\"5\"` → the comparison is strict, so the types must match." },
    ],
  },
  xp: 30,
};

export const loops: Lesson = {
  slug: "loops",
  title: { ar: "الحلقات: for و while و do...while", en: "Loops: for, while and do...while" },
  body: [
    { icon: "🔁", ar: "**الحلقة** تكرر كودًا. حلقة `for` لها ثلاثة أجزاء: البداية، والشرط، والخطوة: `for (let i = 1; i <= 3; i++) { console.log(i); }` تطبع 1 ثم 2 ثم 3.", en: "A **loop** repeats code. A `for` loop has three parts: start, condition and step: `for (let i = 1; i <= 3; i++) { console.log(i); }` prints 1, 2, 3." },
    { icon: "⏳", ar: "`while (شرط) { ... }` تكرر **ما دام** الشرط صحيحًا. مفيدة عندما لا تعرف عدد المرات مسبقًا. غيّر المتغير داخلها وإلا لن تتوقف أبدًا.", en: "`while (condition) { ... }` repeats **as long as** the condition is true. It's useful when you don't know the count in advance. Change the variable inside, or it never stops." },
    { icon: "1️⃣", ar: "`do { ... } while (شرط);` تشبه `while` لكنها تشغّل الكود **مرة واحدة على الأقل**، لأنها تفحص الشرط بعد التنفيذ.", en: "`do { ... } while (condition);` is like `while`, but runs the code **at least once**, because it checks the condition after running." },
  ],
  example: {
    code: 'for (let i = 1; i <= 3; i++) {\n  console.log("lap " + i);\n}\n\nlet coins = 1;\nwhile (coins < 20) {\n  coins = coins * 3;\n}\nconsole.log(coins); // 27\n\nlet tries = 5;\ndo {\n  console.log("try " + tries);\n  tries++;\n} while (tries < 3);   // runs once anyway',
    note: { ar: "for بعدد معروف، while حتى يتحقق شرط، و do...while مرة على الأقل.", en: "for with a known count, while until a condition is met, do...while at least once." },
    lang: "js",
  },
  files: ["js"],
  starter: { js: "let n = 3;\nlet count = 10;\n\n// 1) for: print 1 to 5\n// 2) while: double n until it is more than 100, then print n\n// 3) do...while: print count while count < 5 (it still runs once)\n" },
  solution: { js: "let n = 3;\nlet count = 10;\n\nfor (let i = 1; i <= 5; i++) {\n  console.log(i);\n}\n\nwhile (n <= 100) {\n  n = n * 2;\n}\nconsole.log(n);\n\ndo {\n  console.log(count);\n  count++;\n} while (count < 5);\n" },
  tasks: [
    { id: "for", label: { ar: "اطبع الأرقام من 1 إلى 5 بحلقة `for`", en: "Print the numbers 1 to 5 with a `for` loop" }, test: ({ files, logs }) => /\bfor\s*\(/.test(files.js ?? "") && inOrder(logs, ["1", "2", "3", "4", "5"]) && !inOrder(logs, ["5", "6"]) },
    { id: "while", label: { ar: "بحلقة `while` ضاعف `n` حتى يتجاوز 100، ثم اطبعه مرة واحدة (يظهر `192`)", en: "With a `while` loop, double `n` until it passes 100, then print it once (it shows `192`)" }, test: ({ files, logs }) => (files.js ?? "").split(/\bwhile\s*\(/).length - 1 > (files.js ?? "").split(/\bdo\s*\{/).length - 1 && printed(logs, "192") && !printed(logs, "96") },
    { id: "do-while", label: { ar: "بحلقة `do...while` اطبع `count` ما دام أقل من 5 (يظهر `10` مرة واحدة)", en: "With a `do...while` loop, print `count` while it's less than 5 (it shows `10` once)" }, test: ({ files, logs }) => /\bdo\s*\{/.test(files.js ?? "") && /\}\s*while\s*\(/.test(files.js ?? "") && count(logs, "10") === 1 },
  ],
  hints: [
    { ar: "`for (let i = 1; i <= 5; i++) { console.log(i); }`", en: "`for (let i = 1; i <= 5; i++) { console.log(i); }`" },
    { ar: "`while (n <= 100) { n = n * 2; }` ثم `console.log(n);`، و `do { console.log(count); count++; } while (count < 5);`", en: "`while (n <= 100) { n = n * 2; }` then `console.log(n);`, and `do { console.log(count); count++; } while (count < 5);`" },
  ],
  deep: {
    more: [
      { icon: "🔢", ar: "`i++` تعني `i = i + 1`. ويمكنك العد بخطوات أخرى: `i += 2` للأرقام الزوجية، أو العد التنازلي بـ `i--`.", en: "`i++` means `i = i + 1`. You can count in other steps: `i += 2` for even numbers, or count down with `i--`." },
      { icon: "♾️", ar: "الحلقة اللانهائية تجمّد الصفحة. تأكد أن شيئًا داخل الحلقة يقترب بالشرط من `false`.", en: "An infinite loop freezes the page. Make sure something inside the loop moves the condition toward `false`." },
      { icon: "🗂️", ar: "لاحقًا ستتعلم `for...of` للمرور على عناصر قائمة مباشرة، وهي أسهل من العداد عندما يكون لديك مصفوفة.", en: "Later you'll learn `for...of` to go through the items of a list directly, which is easier than a counter when you have an array." },
    ],
    mistakes: [
      { ar: "`for (let i = 1; i < 5; i++)` لطباعة 1 إلى 5 ← `<` تتوقف عند 4. استخدم `<=`.", en: "`for (let i = 1; i < 5; i++)` to print 1 to 5 → `<` stops at 4. Use `<=`." },
      { ar: "نسيان تغيير المتغير داخل `while` ← الشرط يبقى صحيحًا والحلقة لا تتوقف.", en: "Forgetting to change the variable inside `while` → the condition stays true and the loop never ends." },
      { ar: "فواصل بدل الفاصلة المنقوطة `for (let i = 1, i <= 5, i++)` ← الأجزاء الثلاثة تُفصل بـ `;`.", en: "Commas instead of semicolons `for (let i = 1, i <= 5, i++)` → the three parts are separated by `;`." },
    ],
  },
  xp: 30,
};

export const breakContinue: Lesson = {
  slug: "break-continue",
  title: { ar: "break و continue: التحكم في الحلقة", en: "break and continue: steering a loop" },
  body: [
    { icon: "🛑", ar: "`break` **يوقف** الحلقة فورًا ويخرج منها. مفيد عندما تجد ما تبحث عنه ولا تحتاج إكمال البقية.", en: "`break` **stops** the loop right away and leaves it. It's useful when you've found what you were looking for and don't need the rest." },
    { icon: "⏭️", ar: "`continue` **يتخطى** بقية الدورة الحالية فقط، وينتقل إلى الدورة التالية. الحلقة نفسها تستمر.", en: "`continue` **skips** only the rest of the current round and jumps to the next one. The loop itself keeps going." },
    { icon: "🧩", ar: "غالبًا تضعهما داخل `if`: `if (i % 2 === 0) { continue; }` يتخطى الأرقام الزوجية، و `if (found) { break; }` يوقف البحث.", en: "You usually put them inside an `if`: `if (i % 2 === 0) { continue; }` skips even numbers, and `if (found) { break; }` stops the search." },
  ],
  example: {
    code: 'for (let i = 1; i <= 10; i++) {\n  if (i === 3) {\n    continue;   // skip 3\n  }\n  if (i === 6) {\n    break;      // stop at 6\n  }\n  console.log(i);\n}\n// prints 1, 2, 4, 5',
    note: { ar: "continue يتخطى 3، و break يوقف كل شيء عند 6.", en: "continue skips 3, and break stops everything at 6." },
    lang: "js",
  },
  files: ["js"],
  starter: { js: "// 1) Loop i from 20 to 50. Print the first multiple of 7, then stop with break.\n\n// 2) Loop i from 1 to 9. Skip the even numbers with continue, print the odd ones.\n" },
  solution: { js: "for (let i = 20; i <= 50; i++) {\n  if (i % 7 === 0) {\n    console.log(i);\n    break;\n  }\n}\n\nfor (let i = 1; i <= 9; i++) {\n  if (i % 2 === 0) {\n    continue;\n  }\n  console.log(i);\n}\n" },
  tasks: [
    { id: "break", label: { ar: "من 20 إلى 50 اطبع أول مضاعف للعدد 7 ثم توقف بـ `break` (يظهر `21` فقط)", en: "From 20 to 50, print the first multiple of 7, then stop with `break` (it shows only `21`)" }, test: ({ files, logs }) => /\bbreak\b/.test(files.js ?? "") && printed(logs, "21") && !["28", "35", "42", "49"].some((v) => printed(logs, v)) },
    { id: "continue", label: { ar: "من 1 إلى 9 تخطَّ الزوجية بـ `continue` واطبع الفردية (`1 3 5 7 9`)", en: "From 1 to 9, skip the even numbers with `continue` and print the odd ones (`1 3 5 7 9`)" }, test: ({ files, logs }) => /\bcontinue\b/.test(files.js ?? "") && inOrder(logs, ["1", "3", "5", "7", "9"]) && !["2", "4", "6", "8"].some((v) => printed(logs, v)) },
  ],
  hints: [
    { ar: "داخل الحلقة: `if (i % 7 === 0) { console.log(i); break; }`", en: "Inside the loop: `if (i % 7 === 0) { console.log(i); break; }`" },
    { ar: "`for (let i = 1; i <= 9; i++) { if (i % 2 === 0) { continue; } console.log(i); }`", en: "`for (let i = 1; i <= 9; i++) { if (i % 2 === 0) { continue; } console.log(i); }`" },
  ],
  deep: {
    more: [
      { icon: "🔍", ar: "`break` يجعل البحث أسرع: بدل المرور على ألف عنصر، تتوقف عند أول نتيجة.", en: "`break` makes searching faster: instead of going through a thousand items, you stop at the first match." },
      { icon: "🔁", ar: "الاثنان يعملان في `for` و `while` و `do...while`. و `break` يعمل أيضًا داخل `switch`.", en: "Both work in `for`, `while` and `do...while`. `break` also works inside `switch`." },
      { icon: "🪆", ar: "في الحلقات المتداخلة، `break` يوقف الحلقة الداخلية فقط، لا الخارجية.", en: "In nested loops, `break` stops only the inner loop, not the outer one." },
    ],
    mistakes: [
      { ar: "وضع `console.log` قبل `continue` ← يُطبع الرقم قبل أن يُتخطى. افحص الشرط أولًا.", en: "Putting `console.log` before `continue` → the number prints before it's skipped. Check the condition first." },
      { ar: "`continue` داخل `while` قبل تحديث العداد ← الحلقة لا تتوقف أبدًا.", en: "`continue` inside `while` before updating the counter → the loop never ends." },
      { ar: "وضع `break` خارج `if` ← الحلقة تتوقف من الدورة الأولى.", en: "Putting `break` outside the `if` → the loop stops on the very first round." },
    ],
  },
  xp: 25,
};

export const functions: Lesson = {
  slug: "functions",
  title: { ar: "الدوال: كود تعيد استخدامه", en: "Functions: reusable code" },
  body: [
    { icon: "⚙️", ar: "**الدالة** (function) آلة صغيرة لها اسم: `function add(a, b) { return a + b; }`. تكتبها مرة وتستخدمها مرات. هذا الشكل يسمى **تعريف دالة** (declaration).", en: "A **function** is a small named machine: `function add(a, b) { return a + b; }`. Write it once, use it many times. This form is a **function declaration**." },
    { icon: "📥", ar: "`a` و `b` هي **المدخلات** (parameters). و `return` **تُرجع** النتيجة لمن استدعى الدالة وتنهيها. بدون `return` تُرجع الدالة `undefined`.", en: "`a` and `b` are the **parameters** (inputs). `return` **sends back** the result to whoever called the function and ends it. Without `return`, a function gives `undefined`." },
    { icon: "📞", ar: "تعريف الدالة لا يشغّلها. لتشغيلها **استدعِها** باسمها وقيم بين أقواس: `add(2, 3)` يعطي `5`، ويمكنك طباعته: `console.log(add(2, 3));`.", en: "Defining a function doesn't run it. To run it, **call** it by name with values in parentheses: `add(2, 3)` gives `5`, and you can print it: `console.log(add(2, 3));`." },
    { icon: "📦", ar: "ويمكنك حفظ دالة في متغير، ويسمى **تعبير دالة** (expression): `const multiply = function (a, b) { return a * b; };`. ستتعلم لاحقًا شكلًا أقصر هو الدالة السهمية.", en: "You can also store a function in a variable; that's a **function expression**: `const multiply = function (a, b) { return a * b; };`. Later you'll learn a shorter form, the arrow function." },
  ],
  example: {
    code: 'function greet(name) {\n  return "Hello, " + name + "!";\n}\n\nconst square = function (n) {\n  return n * n;\n};\n\nconsole.log(greet("Sara"));  // Hello, Sara!\nconsole.log(square(4));      // 16',
    note: { ar: "تعريف دالة وتعبير دالة، ثم استدعاؤهما.", en: "A function declaration and a function expression, then calling them." },
    lang: "js",
  },
  files: ["js"],
  starter: { js: "// 1) Write a function add(a, b) that returns the sum\n\n// 2) Write multiply(a, b) as a function expression, stored in a const\n\n// 3) Print add(2, 3)\n" },
  solution: { js: "function add(a, b) {\n  return a + b;\n}\n\nconst multiply = function (a, b) {\n  return a * b;\n};\n\nconsole.log(add(2, 3));\n" },
  harness: 'try { console.log("__c__ add " + add(7, 8)); } catch (e) { console.log("__c__ add missing"); }\ntry { console.log("__c__ multiply " + multiply(4, 6)); } catch (e) { console.log("__c__ multiply missing"); }',
  tasks: [
    { id: "add", label: { ar: "اكتب دالة `add(a, b)` تُرجع مجموع العددين", en: "Write a function `add(a, b)` that returns the sum of the two numbers" }, test: ({ logs }) => c(logs, "add", 15) },
    { id: "multiply", label: { ar: "اكتب دالة `multiply(a, b)` تُرجع حاصل ضرب العددين", en: "Write a function `multiply(a, b)` that returns the product of the two numbers" }, test: ({ logs }) => c(logs, "multiply", 24) },
    { id: "expression", label: { ar: "اكتب `multiply` كتعبير دالة: `const multiply = function (a, b) { … };`", en: "Write `multiply` as a function expression: `const multiply = function (a, b) { … };`" }, test: ({ files }) => /\b(?:const|let)\s+multiply\s*=\s*(?:function\b|\([^)]*\)\s*=>|\w+\s*=>)/.test(files.js ?? "") },
    { id: "call", label: { ar: "اطبع ناتج `add(2, 3)` (يظهر `5`)", en: "Print the result of `add(2, 3)` (it shows `5`)" }, test: ({ files, logs }) => /\badd\s*\(\s*2\s*,\s*3\s*\)/.test(files.js ?? "") && printed(logs, "5") },
  ],
  hints: [
    { ar: "`function add(a, b) { return a + b; }`", en: "`function add(a, b) { return a + b; }`" },
    { ar: "`const multiply = function (a, b) { return a * b; };` ثم `console.log(add(2, 3));`", en: "`const multiply = function (a, b) { return a * b; };` then `console.log(add(2, 3));`" },
  ],
  deep: {
    more: [
      { icon: "🧠", ar: "الدالة المعرّفة بـ `function add` يمكن استدعاؤها حتى قبل سطر تعريفها، أما تعبير الدالة في `const` فلا يعمل إلا بعده.", en: "A `function add` declaration can be called even before its line, but a function expression in a `const` only works after it." },
      { icon: "🔒", ar: "المتغيرات التي تُعرّف داخل الدالة تعيش داخلها فقط، ولا يراها الكود خارجها.", en: "Variables declared inside a function live only there; code outside can't see them." },
      { icon: "🎯", ar: "اجعل كل دالة تقوم بعمل واحد واضح، وسمّها بفعل يصف عملها: `add`، `formatPrice`، `isAdult`.", en: "Give each function one clear job, and name it with a verb that says what it does: `add`, `formatPrice`, `isAdult`." },
    ],
    mistakes: [
      { ar: "`console.log(a + b)` داخل الدالة بدل `return` ← الدالة تطبع لكنها تُرجع `undefined`. استخدم `return`.", en: "`console.log(a + b)` inside the function instead of `return` → it prints but returns `undefined`. Use `return`." },
      { ar: "كتابة `add` بدون أقواس ← هذا اسم الدالة فقط ولا يشغّلها. اكتب `add(2, 3)`.", en: "Writing `add` without parentheses → that's just the function's name and doesn't run it. Write `add(2, 3)`." },
      { ar: "كتابة كود بعد `return` في الدالة نفسها ← لن يعمل أبدًا، لأن `return` تُنهي الدالة.", en: "Writing code after `return` in the same function → it never runs, because `return` ends the function." },
    ],
  },
  xp: 30,
};

export const challengesP1: Challenge[] = [
  { id: "jp1-script-src", after: "javascript/setup", prompt: { ar: "اربط ملف JavaScript بالصفحة", en: "Link the JavaScript file to the page" }, code: '<_ src="script.js"></script>', answers: ["script"], chips: ["script", "link", "js", "src"] },
  { id: "jp1-typeof", after: "javascript/data-types", prompt: { ar: "اطبع نوع القيمة", en: "Print the value's type" }, code: "console.log(_ true); // boolean", answers: ["typeof"], chips: ["typeof", "type", "Number", "String"] },
  { id: "jp1-number", after: "javascript/data-types", prompt: { ar: "حوّل النص إلى رقم ثم اجمع", en: "Turn the text into a number, then add" }, code: 'const age = "21";\nconsole.log(_(age) + 1); // 22', answers: ["Number"], chips: ["Number", "number", "String", "typeof"] },
  { id: "jp1-remainder", after: "javascript/operators", prompt: { ar: "باقي القسمة", en: "The remainder" }, code: "console.log(17 _ 5); // 2", answers: ["%"], chips: ["%", "/", "**", "//"] },
  { id: "jp1-plus-equals", after: "javascript/operators", prompt: { ar: "أضف 5 ثم قارن بشكل صارم", en: "Add 5, then compare strictly" }, code: "let score = 10;\nscore _ 5;\nconsole.log(score _ 15); // true", answers: ["+=", "==="], chips: ["+=", "===", "=+", "=="] },
  { id: "jp1-else-if", after: "javascript/conditions", prompt: { ar: "أكمل سلسلة الشروط", en: "Complete the chain of conditions" }, code: 'if (score >= 85) {\n  console.log("excellent");\n} _ (score >= 50) {\n  console.log("pass");\n} _ {\n  console.log("fail");\n}', answers: ["else if", "else"], chips: ["else if", "else", "elif", "then"] },
  { id: "jp1-ternary", after: "javascript/conditions", prompt: { ar: "أكمل الشرط المختصر", en: "Complete the ternary" }, code: 'console.log(age >= 18 _ "adult" _ "minor");', answers: ["?", ":"], chips: ["?", ":", "&&", "||"] },
  { id: "jp1-switch", after: "javascript/switch", prompt: { ar: "أكمل switch", en: "Complete the switch" }, code: 'switch (day) {\n  _ "sat":\n  case "sun":\n    console.log("weekend");\n    _;\n  _:\n    console.log("weekday");\n}', answers: ["case", "break", "default"], chips: ["case", "break", "default", "else", "stop"] },
  { id: "jp1-for", after: "javascript/loops", prompt: { ar: "اطبع 1 إلى 5", en: "Print 1 to 5" }, code: "_ (let i = 1; i _ 5; i++) {\n  console.log(i);\n}", answers: ["for", "<="], chips: ["for", "<=", "<", "while"] },
  { id: "jp1-do-while", after: "javascript/loops", prompt: { ar: "حلقة تعمل مرة على الأقل", en: "A loop that runs at least once" }, code: "let count = 10;\n_ {\n  console.log(count);\n  count++;\n} _ (count < 5);", answers: ["do", "while"], chips: ["do", "while", "for", "if"] },
  { id: "jp1-break", after: "javascript/break-continue", prompt: { ar: "توقف عند أول مضاعف لـ 7", en: "Stop at the first multiple of 7" }, code: "for (let i = 20; i <= 50; i++) {\n  if (i % 7 === 0) {\n    console.log(i);\n    _;\n  }\n}", answers: ["break"], chips: ["break", "continue", "return", "stop"] },
  { id: "jp1-continue", after: "javascript/break-continue", prompt: { ar: "تخطَّ الأرقام الزوجية", en: "Skip the even numbers" }, code: "for (let i = 1; i <= 9; i++) {\n  if (i % 2 === 0) {\n    _;\n  }\n  console.log(i);\n}", answers: ["continue"], chips: ["continue", "break", "skip", "next"] },
  { id: "jp1-function", after: "javascript/functions", prompt: { ar: "دالة تُرجع المجموع", en: "A function that returns the sum" }, code: "_ add(a, b) {\n  _ a + b;\n}", answers: ["function", "return"], chips: ["function", "return", "def", "log"] },
  { id: "jp1-expression", after: "javascript/functions", prompt: { ar: "أكمل تعبير الدالة", en: "Complete the function expression" }, code: "_ multiply = _ (a, b) {\n  return a * b;\n};", answers: ["const", "function"], chips: ["const", "function", "func", "def"] },
];

export const examP1: Question[] = [
  {
    id: "jx-setup",
    prompt: { ar: "ما الاختصار الذي يفتح أدوات المطور (DevTools) في أغلب المتصفحات؟", en: "Which key opens DevTools in most browsers?" },
    options: [
      { ar: "`F5`", en: "`F5`" },
      { ar: "`F12`", en: "`F12`" },
      { ar: "`Esc`", en: "`Esc`" },
    ],
    answer: 1,
  },
  {
    id: "jx-data-types",
    prompt: { ar: "ما نتيجة `typeof \"21\"`؟", en: "What does `typeof \"21\"` give?" },
    options: [
      { ar: "`\"number\"`", en: "`\"number\"`" },
      { ar: "`\"boolean\"`", en: "`\"boolean\"`" },
      { ar: "`\"string\"`", en: "`\"string\"`" },
    ],
    answer: 2,
  },
  {
    id: "jx-operators",
    prompt: { ar: "ما نتيجة `10 % 4`؟", en: "What does `10 % 4` give?" },
    options: [
      { ar: "`2`", en: "`2`" },
      { ar: "`2.5`", en: "`2.5`" },
      { ar: "`40`", en: "`40`" },
    ],
    answer: 0,
  },
  {
    id: "jx-conditions",
    prompt: { ar: "مع `score = 90`، ماذا يُطبع؟", en: "With `score = 90`, what prints?" },
    code: 'if (score >= 50) {\n  console.log("pass");\n} else if (score >= 85) {\n  console.log("excellent");\n} else {\n  console.log("fail");\n}',
    options: [
      { ar: "`excellent`", en: "`excellent`" },
      { ar: "`pass`، لأن أول شرط صحيح يفوز", en: "`pass`, because the first true condition wins" },
      { ar: "`pass` ثم `excellent`", en: "`pass` then `excellent`" },
    ],
    answer: 1,
  },
  {
    id: "jx-switch",
    prompt: { ar: "ماذا يحدث إذا نسيت `break` في حالة من حالات `switch`؟", en: "What happens if you forget `break` in a `switch` case?" },
    options: [
      { ar: "يظهر خطأ ويتوقف البرنامج", en: "An error appears and the program stops" },
      { ar: "لا شيء، `break` اختياري دائمًا", en: "Nothing, `break` is always optional" },
      { ar: "يستمر التنفيذ إلى الحالة التالية", en: "Execution continues into the next case" },
    ],
    answer: 2,
  },
  {
    id: "jx-loops",
    prompt: { ar: "أي حلقة تشغّل الكود مرة واحدة على الأقل حتى لو كان الشرط خاطئًا؟", en: "Which loop runs its code at least once, even when the condition is false?" },
    options: [
      { ar: "`do...while`", en: "`do...while`" },
      { ar: "`while`", en: "`while`" },
      { ar: "`for`", en: "`for`" },
    ],
    answer: 0,
  },
  {
    id: "jx-break-continue",
    prompt: { ar: "ماذا يفعل `continue` داخل حلقة؟", en: "What does `continue` do inside a loop?" },
    options: [
      { ar: "يوقف الحلقة كلها", en: "Stops the whole loop" },
      { ar: "يتخطى بقية الدورة الحالية وينتقل إلى التالية", en: "Skips the rest of this round and goes to the next one" },
      { ar: "يعيد الحلقة من البداية", en: "Restarts the loop from the beginning" },
    ],
    answer: 1,
  },
  {
    id: "jx-functions",
    prompt: { ar: "ماذا تُرجع هذه الدالة عند استدعاء `add(2, 3)`؟", en: "What does this function return for `add(2, 3)`?" },
    code: "function add(a, b) {\n  console.log(a + b);\n}",
    options: [
      { ar: "`5`", en: "`5`" },
      { ar: "`\"23\"`", en: "`\"23\"`" },
      { ar: "`undefined`، لأنه لا يوجد `return`", en: "`undefined`, because there's no `return`" },
    ],
    answer: 2,
  },
];
