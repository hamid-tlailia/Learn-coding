import { printed } from "./check";
import type { Lesson } from "./types";

/**
 * Small JavaScript steps split out of longer lessons, so each one teaches a single idea:
 * map and filter, the spread `...`, private fields, throwing errors, and saving a theme.
 */

const c = (logs: string[], name: string, value: string | number | boolean) => printed(logs, `__c__ ${name} ${value}`);
/** An array printed either as `20,50,80` or `[20, 50, 80]`. */
const list = (logs: string[], value: string) => logs.some((l) => l.replace(/[\s[\]]/g, "") === value);

export const mapFilter: Lesson = {
  slug: "map-filter",
  title: { ar: "تحويل وتصفية: map و filter", en: "Transform and pick: map and filter" },
  body: [
    { icon: "🪄", ar: "`map()` تصنع **مصفوفة جديدة** بتحويل كل عنصر. تعطيها دالة تقول ماذا تفعل بكل عنصر: `[1, 2, 3].map((n) => n * 2)` تعطي `[2, 4, 6]`.", en: "`map()` builds a **new array** by transforming each item. You give it a function that says what to do with each one: `[1, 2, 3].map((n) => n * 2)` gives `[2, 4, 6]`." },
    { icon: "🧺", ar: "`filter()` تختار العناصر التي تحقق شرطًا وتترك الباقي: `[5, 20, 8].filter((n) => n > 6)` تعطي `[20, 8]`.", en: "`filter()` keeps the items that pass a test and drops the rest: `[5, 20, 8].filter((n) => n > 6)` gives `[20, 8]`." },
    { icon: "🧷", ar: "الدالتان **لا تغيّران** المصفوفة الأصلية، لذلك احفظ النتيجة في متغير جديد: `const doubled = prices.map(...)`.", en: "Neither one **changes** the original array, so keep the result in a new variable: `const doubled = prices.map(...)`." },
  ],
  example: {
    code: "const nums = [1, 2, 3, 4];\n\nconst tens = nums.map((n) => n * 10);\nconsole.log(tens);  // [10, 20, 30, 40]\n\nconst big = nums.filter((n) => n > 2);\nconsole.log(big);   // [3, 4]",
    note: { ar: "map تحوّل كل عنصر، و filter تختار بعضها.", en: "map transforms every item; filter picks some." },
    lang: "js",
  },
  modern: {
    old: "var doubled = [];\nfor (var i = 0; i < nums.length; i++) {\n  doubled.push(nums[i] * 2);\n}",
    now: "const doubled = nums.map((n) => n * 2);",
    text: { ar: "الحلقة مع `push` تعمل، لكن `map` تقول ما تريده في سطر واحد.", en: "A loop with `push` works, but `map` says what you want in one line." },
    since: "ES2015",
  },
  files: ["js"],
  starter: { js: "const prices = [10, 25, 40];\n\n" },
  solution: { js: "const prices = [10, 25, 40];\n\nconst doubled = prices.map((p) => p * 2);\nconsole.log(doubled);\n\nconst cheap = prices.filter((p) => p < 30);\nconsole.log(cheap);\n" },
  tasks: [
    { id: "map", label: { ar: "ضاعف الأسعار بـ `map` واطبع الناتج: `20,50,80`", en: "Double the prices with `map` and print the result: `20,50,80`" }, test: ({ files, logs }) => /\.map\(/.test(files.js ?? "") && list(logs, "20,50,80") },
    { id: "filter", label: { ar: "اختر الأسعار الأقل من 30 بـ `filter` واطبعها: `10,25`", en: "Keep the prices under 30 with `filter` and print them: `10,25`" }, test: ({ files, logs }) => /\.filter\(/.test(files.js ?? "") && list(logs, "10,25") },
  ],
  hints: [
    { ar: "`const doubled = prices.map((p) => p * 2);` ثم `console.log(doubled);`", en: "`const doubled = prices.map((p) => p * 2);` then `console.log(doubled);`" },
    { ar: "`const cheap = prices.filter((p) => p < 30);` ثم `console.log(cheap);`", en: "`const cheap = prices.filter((p) => p < 30);` then `console.log(cheap);`" },
  ],
  deep: {
    more: [
      { icon: "🔗", ar: "لأن الدالتين تُرجعان مصفوفة، يمكنك **سلسلتهما**: `prices.filter((p) => p < 30).map((p) => p * 2)`.", en: "Since both return an array, you can **chain** them: `prices.filter((p) => p < 30).map((p) => p * 2)`." },
      { icon: "🔢", ar: "الدالة تستقبل أيضًا موقع العنصر: `` names.map((name, i) => `${i + 1}. ${name}`) `` يرقّم القائمة.", en: "The function also receives the item's position: `` names.map((name, i) => `${i + 1}. ${name}`) `` numbers a list." },
      { icon: "🧭", ar: "استخدم `map` عندما تريد **مصفوفة جديدة**، و `for...of` عندما تريد فقط **فعل** شيء لكل عنصر مثل الطباعة.", en: "Use `map` when you want a **new array**, and `for...of` when you just want to **do** something per item, like printing." },
    ],
    mistakes: [
      { ar: "`prices.map((p) => p * 2);` وحدها ← النتيجة تضيع. احفظها: `const doubled = prices.map(...)`.", en: "`prices.map((p) => p * 2);` on its own → the result is lost. Keep it: `const doubled = prices.map(...)`." },
      { ar: "`map((p) => { p * 2 })` بأقواس معقوفة ← تُرجع `undefined`. اكتب `return p * 2;` أو احذف الأقواس.", en: "`map((p) => { p * 2 })` with braces → returns `undefined`. Write `return p * 2;` or drop the braces." },
      { ar: "استخدام `map` للاختيار مثل `map((p) => p < 30)` ← تحصل على `true` و `false`. للاختيار استخدم `filter`.", en: "Using `map` to pick, like `map((p) => p < 30)` → you get `true` and `false`. To pick, use `filter`." },
    ],
  },
  xp: 25,
};

export const spread: Lesson = {
  slug: "spread",
  title: { ar: "النسخ بالنشر: ...", en: "Copying with spread: ..." },
  body: [
    { icon: "🌊", ar: "النقاط الثلاث `...` تفرد محتوى مصفوفة أو كائن داخل واحد جديد. هكذا **تنسخ** دون أن تغيّر الأصل.", en: "Three dots `...` spread the contents of an array or object into a new one. That's how you **copy** without changing the original." },
    { icon: "📋", ar: "للمصفوفة: `const more = [...colors, \"blue\"];` نسخة فيها كل الألوان القديمة ثم `\"blue\"`.", en: "For an array: `const more = [...colors, \"blue\"];` is a copy with all the old colors, then `\"blue\"`." },
    { icon: "🗃️", ar: "للكائن: `const older = { ...user, age: 22 };` نسخة من `user` مع تغيير `age` فقط. الخاصية المكتوبة بعد `...` هي التي تبقى.", en: "For an object: `const older = { ...user, age: 22 };` is a copy of `user` with only `age` changed. The property written after `...` wins." },
  ],
  example: {
    code: 'const a = [1, 2];\nconst b = [...a, 3];\nconsole.log(a, b);  // [1, 2] [1, 2, 3]\n\nconst user = { name: "Sara", city: "Tunis" };\nconst moved = { ...user, city: "Cairo" };\nconsole.log(user.city, moved.city);  // Tunis Cairo',
    note: { ar: "النسخة تتغير، والأصل يبقى كما هو.", en: "The copy changes; the original stays the same." },
    lang: "js",
  },
  modern: {
    old: "var copy = Object.assign({}, user, { age: 22 });\nvar more = colors.concat([\"blue\"]);",
    now: "const copy = { ...user, age: 22 };\nconst more = [...colors, \"blue\"];",
    text: { ar: "`Object.assign` و `concat` ما زالا يعملان، لكن `...` أقصر وأوضح.", en: "`Object.assign` and `concat` still work, but `...` is shorter and clearer." },
    since: "ES2018",
  },
  files: ["js"],
  starter: { js: 'const colors = ["red", "green"];\nconst user = { name: "Sara", age: 21 };\n\n' },
  solution: { js: 'const colors = ["red", "green"];\nconst user = { name: "Sara", age: 21 };\n\nconst moreColors = [...colors, "blue"];\nconsole.log(moreColors.length);\n\nconst older = { ...user, age: 22 };\nconsole.log(older.age);\n' },
  harness: 'try { console.log("__c__ originals " + colors.length + " " + user.age); } catch (e) { console.log("__c__ originals missing"); }',
  tasks: [
    { id: "array", label: { ar: "اصنع `moreColors`: نسخة من `colors` بـ `...` مع `\"blue\"`، واطبع طولها (`3`)", en: "Make `moreColors`: a copy of `colors` with `...` plus `\"blue\"`, and print its length (`3`)" }, test: ({ files, logs }) => /\.\.\.colors\b/.test(files.js ?? "") && printed(logs, "3") },
    { id: "object", label: { ar: "اصنع `older`: نسخة من `user` بـ `...` مع `age: 22`، واطبع `older.age` (`22`)", en: "Make `older`: a copy of `user` with `...` and `age: 22`, and print `older.age` (`22`)" }, test: ({ files, logs }) => /\.\.\.user\b/.test(files.js ?? "") && printed(logs, "22") },
    { id: "same", label: { ar: "الأصل لم يتغير: `colors` فيها لونان و `user.age` ما زال 21", en: "The originals didn't change: `colors` still has two colors and `user.age` is still 21" }, test: ({ files, logs }) => /\.\.\.colors\b/.test(files.js ?? "") && /\.\.\.user\b/.test(files.js ?? "") && c(logs, "originals", "2 21") },
  ],
  hints: [
    { ar: '`const moreColors = [...colors, "blue"];` ثم `console.log(moreColors.length);`', en: '`const moreColors = [...colors, "blue"];` then `console.log(moreColors.length);`' },
    { ar: "`const older = { ...user, age: 22 };` ثم `console.log(older.age);`", en: "`const older = { ...user, age: 22 };` then `console.log(older.age);`" },
  ],
  deep: {
    more: [
      { icon: "🪞", ar: "النسخ بـ `...` **سطحي**: الكائنات الموجودة داخل المصفوفة لا تُنسخ، بل مرجعها فقط. للنسخ الكامل استخدم `structuredClone(obj)`.", en: "Copying with `...` is **shallow**: objects nested inside aren't duplicated, only their references. For a full copy use `structuredClone(obj)`." },
      { icon: "🔀", ar: "يمكنك دمج أكثر من واحد: `[...a, ...b]` أو `{ ...defaults, ...settings }`، والأخير يغلب عند تكرار الاسم.", en: "You can merge several: `[...a, ...b]` or `{ ...defaults, ...settings }`; the last one wins when names repeat." },
      { icon: "⚛️", ar: "في React لا نعدّل الحالة مباشرة، بل نصنع نسخة جديدة بـ `...`. لهذا ستراها كثيرًا هناك.", en: "In React you don't edit state directly; you make a new copy with `...`. That's why you'll see it a lot there." },
    ],
    mistakes: [
      { ar: "`const copy = colors;` ← ليست نسخة، بل اسم ثانٍ لنفس المصفوفة. استخدم `[...colors]`.", en: "`const copy = colors;` → not a copy, just a second name for the same array. Use `[...colors]`." },
      { ar: "`{ age: 22, ...user }` ← `user` يأتي بعدها فيُرجع العمر 21. ضع التغيير **بعد** `...user`.", en: "`{ age: 22, ...user }` → `user` comes after and puts age back to 21. Put the change **after** `...user`." },
      { ar: "`[colors, \"blue\"]` بدون نقاط ← تحصل على مصفوفة داخل مصفوفة. لا تنسَ `...`.", en: "`[colors, \"blue\"]` without dots → you get an array inside an array. Don't forget `...`." },
    ],
  },
  xp: 25,
};

export const privateFields: Lesson = {
  slug: "private-fields",
  title: { ar: "حماية البيانات: #private و get", en: "Protecting data: #private and get" },
  body: [
    { icon: "😬", ar: "في الدرس السابق يستطيع أي كود أن يكتب `acc.balance = 1000000;` فيتغير الرصيد دون إيداع. نريد أن يتغير الرصيد **فقط** عبر `deposit`.", en: "In the last lesson any code could write `acc.balance = 1000000;` and change the balance without a deposit. We want it to change **only** through `deposit`." },
    { icon: "🔒", ar: "الحقل الذي يبدأ بـ `#` **خاص**: يُكتب في أعلى الصنف `#balance = 0;` ويُستعمل بـ `this.#balance` داخل الصنف فقط. من الخارج لا يمكن قراءته أو تغييره.", en: "A field starting with `#` is **private**: declare it at the top of the class, `#balance = 0;`, and use it as `this.#balance` inside the class only. Outside code can't read or change it." },
    { icon: "🔍", ar: "لنسمح بالقراءة فقط نضيف **getter**: `get balance() { return this.#balance; }`. بعدها `acc.balance` (بدون أقواس) يقرأ القيمة، لكن لا يغيّرها.", en: "To allow reading only, add a **getter**: `get balance() { return this.#balance; }`. Then `acc.balance` (no parentheses) reads the value but can't change it." },
  ],
  example: {
    code: "class Counter {\n  #count = 0;\n\n  increment() {\n    this.#count++;\n  }\n\n  get value() {\n    return this.#count;\n  }\n}\n\nconst c = new Counter();\nc.increment();\nconsole.log(c.value);  // 1",
    note: { ar: "العدّاد يتغير فقط بالدالة، ويُقرأ بالـ getter.", en: "The counter changes only through its method and is read with the getter." },
    lang: "js",
  },
  modern: {
    old: "this._balance = 0; // \"please don't touch\"",
    now: "#balance = 0;",
    text: { ar: "قديمًا كنا نكتب `_` قبل الاسم كتنبيه فقط. الحقل `#` محمي فعلًا.", en: "We used to put `_` before the name as a polite warning. A `#` field is truly protected." },
    since: "ES2022",
  },
  files: ["js"],
  starter: { js: 'class Account {\n  constructor(owner) {\n    this.owner = owner;\n    this.balance = 0;\n  }\n\n  deposit(amount) {\n    this.balance += amount;\n  }\n}\n\nconst acc = new Account("Sara");\nacc.deposit(50);\nconsole.log(acc.balance);\n' },
  solution: { js: 'class Account {\n  #balance = 0;\n\n  constructor(owner) {\n    this.owner = owner;\n  }\n\n  deposit(amount) {\n    this.#balance += amount;\n  }\n\n  get balance() {\n    return this.#balance;\n  }\n}\n\nconst acc = new Account("Sara");\nacc.deposit(50);\nconsole.log(acc.balance);\n' },
  harness: 'try { const a = new Account("Ali"); a.deposit(42); console.log("__c__ read " + a.balance); try { a.balance = 1000; } catch (e) {} console.log("__c__ guarded " + a.balance + " " + Object.keys(a).includes("balance")); } catch (e) { console.log("__c__ read missing"); }',
  tasks: [
    { id: "private", label: { ar: "اجعل الرصيد حقلًا خاصًا `#balance` واستعمل `this.#balance` في `deposit`", en: "Make the balance a private `#balance` field and use `this.#balance` in `deposit`" }, test: ({ files, logs }) => /this\.#balance/.test(files.js ?? "") && logs.some((l) => /^__c__ guarded \d+ false$/.test(l.trim())) },
    { id: "getter", label: { ar: "أضف `get balance()` يُرجعه، فيبقى `acc.balance` يطبع `50`", en: "Add `get balance()` that returns it, so `acc.balance` still prints `50`" }, test: ({ logs }) => c(logs, "read", 42) && printed(logs, "50") },
    { id: "guarded", label: { ar: "من الخارج، `acc.balance = 1000` لم يعد يغيّر الرصيد", en: "From outside, `acc.balance = 1000` no longer changes the balance" }, test: ({ logs }) => c(logs, "guarded", "42 false") },
  ],
  hints: [
    { ar: "أضف `#balance = 0;` في أعلى الصنف، واحذف `this.balance = 0;` من `constructor`، واكتب `this.#balance += amount;`", en: "Add `#balance = 0;` at the top of the class, remove `this.balance = 0;` from the `constructor`, and write `this.#balance += amount;`" },
    { ar: "`get balance() { return this.#balance; }`", en: "`get balance() { return this.#balance; }`" },
  ],
  deep: {
    more: [
      { icon: "🧱", ar: "هذا اسمه **التغليف** (encapsulation): الكائن يحمي بياناته ويقدّم دوالًا محددة لتغييرها، مثل `deposit` التي يمكن أن ترفض المبالغ السالبة.", en: "This is called **encapsulation**: the object guards its data and offers specific methods to change it, like a `deposit` that can reject negative amounts." },
      { icon: "✍️", ar: "يمكنك أيضًا كتابة **setter** يتحقق قبل التغيير: `set name(v) { if (v.trim()) this.#name = v; }`.", en: "You can also write a **setter** that checks before changing: `set name(v) { if (v.trim()) this.#name = v; }`." },
      { icon: "🔐", ar: "الدوال يمكن أن تكون خاصة أيضًا: `#log() { … }` تستدعيها بـ `this.#log()` داخل الصنف فقط.", en: "Methods can be private too: `#log() { … }`, called as `this.#log()` inside the class only." },
    ],
    mistakes: [
      { ar: "استعمال `this.#balance` دون كتابة `#balance = 0;` أعلى الصنف ← خطأ صياغة. الحقل الخاص يجب أن يُعلن أولًا.", en: "Using `this.#balance` without declaring `#balance = 0;` at the top → syntax error. A private field must be declared first." },
      { ar: "`acc.balance()` بأقواس ← خطأ لأن الـ getter يُقرأ كخاصية: `acc.balance`.", en: "`acc.balance()` with parentheses → error, a getter is read like a property: `acc.balance`." },
      { ar: "ترك `this.balance = 0;` مع الـ getter ← تعارض بين الخاصية والـ getter. احذف السطر القديم.", en: "Keeping `this.balance = 0;` next to the getter → it clashes with the getter. Remove the old line." },
    ],
  },
  xp: 30,
};

export const throwErrors: Lesson = {
  slug: "throw-errors",
  title: { ar: "رمي الأخطاء: throw", en: "Throwing errors: throw" },
  body: [
    { icon: "🚨", ar: "في الدرس السابق التقطنا خطأً صنعته JavaScript. أحيانًا **أنت** من يقرر أن شيئًا خاطئ: عمر مكتوب بالحروف مثلًا. عندها ترمي خطأً: `throw new Error(\"Age must be a number\");`.", en: "Last lesson we caught an error JavaScript made. Sometimes **you** decide something is wrong, like an age written in letters. Then you throw one: `throw new Error(\"Age must be a number\");`." },
    { icon: "🛑", ar: "`throw` يوقف الدالة فورًا، مثل `return`، لكنه يقفز إلى أقرب `catch`. والنص الذي كتبته يصل إلى `error.message`.", en: "`throw` stops the function immediately, like `return`, but jumps to the nearest `catch`. The text you wrote arrives as `error.message`." },
    { icon: "🔢", ar: "`Number(\"21\")` يعطي `21`، و `Number(\"ten\")` يعطي `NaN` (ليس رقمًا). للتحقق نستعمل `Number.isNaN(age)`.", en: "`Number(\"21\")` gives `21`, and `Number(\"ten\")` gives `NaN` (not a number). To check, use `Number.isNaN(age)`." },
  ],
  example: {
    code: 'function parsePrice(text) {\n  const n = Number(text);\n  if (Number.isNaN(n)) {\n    throw new Error(`"${text}" is not a price`);\n  }\n  return n;\n}\n\ntry {\n  console.log(parsePrice("12"));\n  console.log(parsePrice("abc"));\n} catch (error) {\n  console.log("Oops:", error.message);\n}',
    note: { ar: "الأول ينجح، والثاني يرمي خطأً يُلتقط.", en: "The first works; the second throws an error that gets caught." },
    lang: "js",
  },
  files: ["js"],
  starter: { js: "function parseAge(text) {\n  const age = Number(text);\n  return age;\n}\n\n" },
  solution: { js: 'function parseAge(text) {\n  const age = Number(text);\n  if (Number.isNaN(age)) {\n    throw new Error("Age must be a number");\n  }\n  return age;\n}\n\ntry {\n  parseAge("ten");\n} catch (error) {\n  console.log(error.message);\n}\n' },
  harness: 'try { console.log("__c__ ok " + parseAge("21")); } catch (e) { console.log("__c__ ok threw"); } try { parseAge("x"); console.log("__c__ bad no-throw"); } catch (e) { console.log("__c__ bad " + (e instanceof Error ? "Error" : "other")); console.log("__msg__ " + (e && e.message)); }',
  tasks: [
    { id: "throw", label: { ar: "داخل `parseAge` ارمِ `new Error(...)` عندما لا يكون `age` رقمًا", en: "Inside `parseAge`, throw `new Error(...)` when `age` isn't a number" }, test: ({ logs }) => c(logs, "bad", "Error") },
    { id: "valid", label: { ar: "النص الصحيح ما زال يعمل: `parseAge(\"21\")` يُرجع `21`", en: "Good text still works: `parseAge(\"21\")` returns `21`" }, test: ({ logs }) => c(logs, "ok", 21) && c(logs, "bad", "Error") },
    {
      id: "catch",
      label: { ar: "استدعِ `parseAge(\"ten\")` داخل `try` واطبع `error.message` في `catch`", en: "Call `parseAge(\"ten\")` inside `try` and print `error.message` in `catch`" },
      test: ({ files, logs }) => {
        const msg = logs.find((l) => l.startsWith("__msg__ "))?.slice(8).trim();
        return /try\s*\{[\s\S]*catch\s*\(/.test(files.js ?? "") && !!msg && printed(logs.filter((l) => !l.startsWith("__")), msg);
      },
    },
  ],
  hints: [
    { ar: '`if (Number.isNaN(age)) { throw new Error("Age must be a number"); }` قبل `return age;`', en: '`if (Number.isNaN(age)) { throw new Error("Age must be a number"); }` before `return age;`' },
    { ar: '`try { parseAge("ten"); } catch (error) { console.log(error.message); }`', en: '`try { parseAge("ten"); } catch (error) { console.log(error.message); }`' },
  ],
  deep: {
    more: [
      { icon: "🪜", ar: "الخطأ **يصعد** عبر الدوال حتى يجد `catch`. لذلك الدالة الصغيرة ترمي، والمكان الذي يعرف ماذا يفعل (مثل عرض رسالة) هو الذي يلتقط.", en: "An error **bubbles up** through functions until a `catch` handles it. So the small function throws, and the place that knows what to do (like show a message) catches." },
      { icon: "🧹", ar: "`finally { … }` بعد `catch` يعمل دائمًا، نجح الكود أو فشل: مكان مناسب لإخفاء مؤشر التحميل.", en: "`finally { … }` after `catch` always runs, success or failure: a good place to hide a loading spinner." },
      { icon: "🏷️", ar: "رسالة الخطأ موجّهة للمبرمج وللمستخدم أحيانًا، فاجعلها واضحة: ما الخطأ وما المتوقع.", en: "An error message is for the developer, and sometimes the user, so make it clear: what went wrong and what was expected." },
    ],
    mistakes: [
      { ar: "`throw \"bad age\"` نصًا ← لا يوجد `error.message`. استخدم `throw new Error(\"bad age\")`.", en: "`throw \"bad age\"` as plain text → there's no `error.message`. Use `throw new Error(\"bad age\")`." },
      { ar: "`age === NaN` ← دائمًا `false` لأن `NaN` لا يساوي نفسه. استخدم `Number.isNaN(age)`.", en: "`age === NaN` → always `false`, since `NaN` isn't equal to itself. Use `Number.isNaN(age)`." },
      { ar: "وضع `throw` بعد `return` ← لن يصل إليه الكود أبدًا. تحقق ثم ارمِ **قبل** `return`.", en: "Putting `throw` after `return` → the code never reaches it. Check and throw **before** `return`." },
    ],
  },
  xp: 30,
};

const THEME_HTML = '<style>\n  body.dark { background: #111; color: #eee; }\n</style>\n<h1>My settings</h1>\n<button id="theme">Toggle theme</button>\n';
const THEME_START = '// A previous visit saved this (keep this line):\nlocalStorage.setItem("theme", "dark");\n\n';

export const saveTheme: Lesson = {
  slug: "save-theme",
  title: { ar: "تذكّر اختيار المستخدم: حفظ الثيم", en: "Remember the user's choice: saving the theme" },
  body: [
    { icon: "🌗", ar: "زر يبدّل الثيم مفيد، لكن إن نسيه الموقع بعد إعادة التحميل يصبح مزعجًا. سنجمع ما تعلمته: `classList.toggle` من درس DOM و `setItem`/`getItem` من الدرس السابق.", en: "A theme toggle is handy, but if the site forgets it on reload it's annoying. We'll combine what you know: `classList.toggle` from the DOM lesson and `setItem`/`getItem` from the last lesson." },
    { icon: "💾", ar: "بعد كل ضغطة احفظ الحالة الجديدة: `document.body.classList.contains(\"dark\")` يقول هل الثيم داكن، فاحفظ `\"dark\"` أو `\"light\"`.", en: "After each click, save the new state: `document.body.classList.contains(\"dark\")` says whether it's dark, so save `\"dark\"` or `\"light\"`." },
    { icon: "🚀", ar: "وعند بدء الصفحة اقرأ المحفوظ: إن كان `\"dark\"` أضف الصنف `dark` إلى `<body>`. السطر الأول في المحرر يمثل زيارة سابقة حفظت `dark`.", en: "When the page starts, read what's saved: if it's `\"dark\"`, add the `dark` class to `<body>`. The first line in the editor stands for an earlier visit that saved `dark`." },
  ],
  example: {
    code: 'const box = document.querySelector("#box");\n\nif (localStorage.getItem("open") === "yes") {\n  box.classList.add("open");\n}\n\nbox.addEventListener("click", () => {\n  box.classList.toggle("open");\n  localStorage.setItem("open", box.classList.contains("open") ? "yes" : "no");\n});',
    note: { ar: "نفس الفكرة مع صندوق يُفتح ويُغلق.", en: "The same idea with a box that opens and closes." },
    lang: "none",
  },
  files: ["js", "html"],
  starter: { js: THEME_START, html: THEME_HTML },
  solution: {
    js: `${THEME_START}const button = document.querySelector("#theme");\n\nif (localStorage.getItem("theme") === "dark") {\n  document.body.classList.add("dark");\n}\n\nbutton.addEventListener("click", () => {\n  document.body.classList.toggle("dark");\n  const theme = document.body.classList.contains("dark") ? "dark" : "light";\n  localStorage.setItem("theme", theme);\n});\n`,
    html: THEME_HTML,
  },
  harness: 'var t = document.querySelector("#theme"); var d = function () { return document.body.classList.contains("dark"); }; console.log("__c__ start " + d()); if (t) t.click(); console.log("__c__ one " + d() + " " + localStorage.getItem("theme")); if (t) t.click(); console.log("__c__ two " + d() + " " + localStorage.getItem("theme"));',
  tasks: [
    {
      id: "toggle",
      label: { ar: "زر `#theme` يبدّل الصنف `dark` على `<body>` مع كل ضغطة", en: "The `#theme` button toggles the `dark` class on `<body>` with every click" },
      test: ({ logs }) => {
        const state = (step: string) => logs.find((l) => l.startsWith(`__c__ ${step} `))?.split(" ")[2];
        return !!state("one") && !!state("two") && state("one") !== state("two");
      },
    },
    { id: "save", label: { ar: "بعد كل ضغطة احفظ `\"dark\"` أو `\"light\"` بـ `setItem(\"theme\", ...)`", en: "After each click, save `\"dark\"` or `\"light\"` with `setItem(\"theme\", ...)`" }, test: ({ logs }) => (c(logs, "one", "false light") && c(logs, "two", "true dark")) || (c(logs, "one", "true dark") && c(logs, "two", "false light")) },
    { id: "load", label: { ar: "عند البداية اقرأ `theme` بـ `getItem` وإن كان `\"dark\"` أضف `dark` إلى `<body>`", en: "On start, read `theme` with `getItem` and if it's `\"dark\"`, add `dark` to `<body>`" }, test: ({ files, logs }) => /getItem\(/.test(files.js ?? "") && c(logs, "start", true) },
  ],
  hints: [
    { ar: '`if (localStorage.getItem("theme") === "dark") { document.body.classList.add("dark"); }`', en: '`if (localStorage.getItem("theme") === "dark") { document.body.classList.add("dark"); }`' },
    { ar: 'داخل الضغطة: `document.body.classList.toggle("dark");` ثم `localStorage.setItem("theme", document.body.classList.contains("dark") ? "dark" : "light");`', en: 'Inside the click: `document.body.classList.toggle("dark");` then `localStorage.setItem("theme", document.body.classList.contains("dark") ? "dark" : "light");`' },
  ],
  deep: {
    more: [
      { icon: "🖥️", ar: "يمكنك احترام ثيم الجهاز عند أول زيارة: `matchMedia(\"(prefers-color-scheme: dark)\").matches` يقول هل الجهاز في الوضع الداكن.", en: "You can follow the device's theme on the first visit: `matchMedia(\"(prefers-color-scheme: dark)\").matches` says whether the device is in dark mode." },
      { icon: "⚡", ar: "في المواقع الحقيقية يُقرأ الثيم في `<head>` قبل ظهور الصفحة، حتى لا تومض بيضاء لحظة ثم تصبح داكنة.", en: "On real sites the theme is read in `<head>` before the page shows, so it doesn't flash white for a moment before turning dark." },
      { icon: "🎨", ar: "مع متغيرات CSS يكفي تغيير الألوان مرة: `body.dark { --bg: #111; --text: #eee; }` وكل العناصر تتبعها.", en: "With CSS variables you change colors once: `body.dark { --bg: #111; --text: #eee; }` and every element follows." },
    ],
    mistakes: [
      { ar: "حفظ الثيم قبل `toggle` ← تحفظ الحالة القديمة. بدّل أولًا ثم احفظ.", en: "Saving before `toggle` → you store the old state. Toggle first, then save." },
      { ar: "`if (localStorage.getItem(\"theme\") = \"dark\")` بعلامة واحدة ← هذا إسناد وليس مقارنة. استخدم `===`.", en: "`if (localStorage.getItem(\"theme\") = \"dark\")` with one sign → that's assignment, not comparison. Use `===`." },
      { ar: "قراءة الثيم داخل الضغطة فقط ← الصفحة تبدأ فاتحة دائمًا. اقرأه مرة **خارج** الحدث عند البداية.", en: "Reading the theme only inside the click → the page always starts light. Read it once **outside** the event, on start." },
    ],
  },
  xp: 30,
};

export const dataTypes: Lesson = {
  slug: "data-types",
  title: { ar: "أنواع البيانات: رقم ونص ومنطقي", en: "Data types: number, text and boolean" },
  body: [
    { icon: "🔢", ar: "كل قيمة في JavaScript لها **نوع**. أهمها ثلاثة: **الرقم** (number) مثل `21`، و**النص** (string) بين علامتي تنصيص مثل `\"21\"`، و**المنطقي** (boolean) وهو `true` أو `false` فقط.", en: "Every value in JavaScript has a **type**. The main three: **number** like `21`, **string** (text) in quotes like `\"21\"`, and **boolean**, which is only `true` or `false`." },
    { icon: "🏷️", ar: "`typeof` يخبرك بالنوع: `typeof 21` يعطي `\"number\"`، و `typeof \"21\"` يعطي `\"string\"`، و `typeof true` يعطي `\"boolean\"`.", en: "`typeof` tells you the type: `typeof 21` gives `\"number\"`, `typeof \"21\"` gives `\"string\"`, and `typeof true` gives `\"boolean\"`." },
    { icon: "⚠️", ar: "انتبه: `+` مع نص **يلصق** ولا يجمع: `\"21\" + 1` يعطي `\"211\"`. وما يكتبه المستخدم في الحقول يصل دائمًا نصًا.", en: "Careful: `+` with text **glues** instead of adding: `\"21\" + 1` gives `\"211\"`. And whatever users type in fields always arrives as text." },
    { icon: "🔁", ar: "للتحويل: `Number(\"21\")` يعطي الرقم `21`، و `String(21)` يعطي النص `\"21\"`. وإذا لم يكن النص رقمًا يعطي `Number` القيمة `NaN` (ليس رقمًا).", en: "To convert: `Number(\"21\")` gives the number `21`, and `String(21)` gives the text `\"21\"`. If the text isn't a number, `Number` gives `NaN` (not a number)." },
  ],
  example: {
    code: 'const price = "5";\n\nconsole.log(typeof price);        // string\nconsole.log(price + 1);            // 51\nconsole.log(Number(price) + 1);    // 6\nconsole.log(typeof String(10));    // string\nconsole.log(Number("hello"));      // NaN',
    note: { ar: "نص يُلصق، ورقم يُجمع.", en: "Text glues, numbers add." },
    lang: "js",
  },
  files: ["js"],
  starter: { js: 'const age = "21"; // typed in a form, so it is text\nconst year = 2026;\n\n' },
  solution: { js: 'const age = "21"; // typed in a form, so it is text\nconst year = 2026;\n\nconsole.log(typeof age);\nconsole.log(Number(age) + 1);\nconsole.log(typeof String(year));\n' },
  tasks: [
    { id: "typeof", label: { ar: "اطبع نوع `age` بـ `typeof` (يظهر `string`)", en: "Print the type of `age` with `typeof` (it shows `string`)" }, test: ({ files, logs }) => /typeof\s*\(?\s*age\b/.test(files.js ?? "") && printed(logs, "string") },
    { id: "number", label: { ar: "حوّل `age` إلى رقم بـ `Number` واطبعه مضافًا إليه 1 (يظهر `22` وليس `211`)", en: "Turn `age` into a number with `Number` and print it plus 1 (it shows `22`, not `211`)" }, test: ({ files, logs }) => /Number\(\s*age\s*\)/.test(files.js ?? "") && printed(logs, "22") },
    { id: "string", label: { ar: "حوّل `year` إلى نص بـ `String` واطبع نوعه (يظهر `string`)", en: "Turn `year` into text with `String` and print its type (it shows `string`)" }, test: ({ files, logs }) => /String\(\s*year\s*\)/.test(files.js ?? "") && logs.filter((l) => l.trim().toLowerCase() === "string").length >= 2 },
  ],
  hints: [
    { ar: "`console.log(typeof age);`", en: "`console.log(typeof age);`" },
    { ar: "`console.log(Number(age) + 1);` ثم `console.log(typeof String(year));`", en: "`console.log(Number(age) + 1);` then `console.log(typeof String(year));`" },
  ],
  deep: {
    more: [
      { icon: "🕳️", ar: "نوعان آخران ستراهما: `undefined` (متغير بلا قيمة بعد) و `null` (لا شيء، عن قصد). `typeof undefined` يعطي `\"undefined\"`.", en: "Two more you'll meet: `undefined` (a variable with no value yet) and `null` (nothing, on purpose). `typeof undefined` gives `\"undefined\"`." },
      { icon: "🧮", ar: "`-` و `*` و `/` تحوّل النص إلى رقم تلقائيًا: `\"6\" * 2` يعطي `12`. أما `+` فيلصق. لذلك حوّل بنفسك بـ `Number` لتكون واضحًا.", en: "`-`, `*` and `/` turn text into numbers automatically: `\"6\" * 2` gives `12`. Only `+` glues. So convert yourself with `Number` to be clear." },
      { icon: "🔎", ar: "للتحقق من رقم صالح: `Number.isNaN(Number(text))` يعطي `true` إذا لم يكن النص رقمًا.", en: "To check for a valid number: `Number.isNaN(Number(text))` gives `true` when the text isn't a number." },
    ],
    mistakes: [
      { ar: "`\"5\" + 1` ثم الحيرة من `51` ← حوّل أولًا: `Number(\"5\") + 1`.", en: "`\"5\" + 1` and wondering about `51` → convert first: `Number(\"5\") + 1`." },
      { ar: "`number(age)` بحرف صغير ← الاسم `Number` بحرف كبير، ومثله `String`.", en: "`number(age)` in lowercase → the name is `Number` with a capital, and so is `String`." },
      { ar: "`typeof(age) === string` بدون علامتي تنصيص ← `typeof` يُرجع نصًا: قارن بـ `\"string\"`.", en: "`typeof(age) === string` without quotes → `typeof` returns text: compare with `\"string\"`." },
    ],
  },
  xp: 25,
};

export const json: Lesson = {
  slug: "json",
  title: { ar: "JSON: الكائنات كنص", en: "JSON: objects as text" },
  body: [
    { icon: "📄", ar: "**JSON** طريقة لكتابة الكائنات والمصفوفات **كنص**، لترسلها عبر الإنترنت أو تحفظها. شكله مثل الكائن، لكن الأسماء دائمًا بين علامتي تنصيص مزدوجة: `{\"name\":\"Sara\",\"age\":21}`.", en: "**JSON** is a way to write objects and arrays **as text**, so you can send them over the internet or save them. It looks like an object, but names are always in double quotes: `{\"name\":\"Sara\",\"age\":21}`." },
    { icon: "➡️", ar: "`JSON.stringify(user)` يحوّل الكائن إلى نص JSON.", en: "`JSON.stringify(user)` turns an object into JSON text." },
    { icon: "⬅️", ar: "`JSON.parse(text)` يعكس ذلك: يحوّل نص JSON إلى كائن تقرأ خصائصه بالنقطة: `JSON.parse(text).name`.", en: "`JSON.parse(text)` does the reverse: it turns JSON text into an object whose properties you read with a dot: `JSON.parse(text).name`." },
  ],
  example: {
    code: 'const book = { title: "Clean Code", pages: 464 };\n\nconst text = JSON.stringify(book);\nconsole.log(text);           // {"title":"Clean Code","pages":464}\nconsole.log(typeof text);    // string\n\nconst back = JSON.parse(text);\nconsole.log(back.pages);     // 464',
    note: { ar: "كائن ← نص ← كائن.", en: "Object → text → object." },
    lang: "js",
  },
  files: ["js"],
  starter: { js: 'const user = { name: "Sara", age: 21 };\nconst saved = \'{"name":"Omar","age":30}\';\n\n' },
  solution: { js: 'const user = { name: "Sara", age: 21 };\nconst saved = \'{"name":"Omar","age":30}\';\n\nconst text = JSON.stringify(user);\nconsole.log(text);\n\nconst omar = JSON.parse(saved);\nconsole.log(omar.name);\n' },
  tasks: [
    { id: "stringify", label: { ar: "حوّل `user` إلى نص بـ `JSON.stringify` واطبعه", en: "Turn `user` into text with `JSON.stringify` and print it" }, test: ({ logs }) => logs.some((l) => l.trim() === '{"name":"Sara","age":21}') },
    { id: "parse", label: { ar: "حوّل النص `saved` إلى كائن بـ `JSON.parse` واطبع اسمه (`Omar`)", en: "Turn the text `saved` into an object with `JSON.parse` and print its name (`Omar`)" }, test: ({ files, logs }) => /JSON\.parse\(\s*saved\s*\)/.test(files.js ?? "") && printed(logs, "Omar") },
  ],
  hints: [
    { ar: "`console.log(JSON.stringify(user));`", en: "`console.log(JSON.stringify(user));`" },
    { ar: "`const omar = JSON.parse(saved);` ثم `console.log(omar.name);`", en: "`const omar = JSON.parse(saved);` then `console.log(omar.name);`" },
  ],
  deep: {
    more: [
      { icon: "🎨", ar: "لنص مرتّب يسهل قراءته: `JSON.stringify(user, null, 2)` يضيف أسطرًا ومسافات.", en: "For readable, indented text: `JSON.stringify(user, null, 2)` adds lines and spaces." },
      { icon: "🌐", ar: "معظم الـ APIs على الإنترنت ترسل JSON، وستقرؤه لاحقًا بـ `fetch`. وستحفظ به الكائنات في المتصفح.", en: "Most APIs on the internet send JSON; you'll read it later with `fetch`. You'll also use it to save objects in the browser." },
      { icon: "🚫", ar: "JSON لا يحفظ الدوال ولا `undefined`، فقط النصوص والأرقام و `true`/`false` و `null` والمصفوفات والكائنات.", en: "JSON can't hold functions or `undefined`, only text, numbers, `true`/`false`, `null`, arrays and objects." },
    ],
    mistakes: [
      { ar: "`JSON.parse(user)` على كائن ← `parse` للنص فقط؛ الكائن لا يحتاج تحويلًا.", en: "`JSON.parse(user)` on an object → `parse` is for text only; an object needs no converting." },
      { ar: "كتابة JSON بعلامة تنصيص مفردة `{'name':'Sara'}` ← JSON يقبل `\"` المزدوجة فقط.", en: "Writing JSON with single quotes `{'name':'Sara'}` → JSON accepts only double quotes `\"`." },
      { ar: "`Json.parse` أو `JSON.Parse` ← الاسم الصحيح `JSON.parse` بالضبط.", en: "`Json.parse` or `JSON.Parse` → the right name is exactly `JSON.parse`." },
    ],
  },
  xp: 25,
};

const BOM_HTML = '<p id="msg">Wait…</p>\n<p>Count: <span id="count">0</span></p>\n';

export const browserWindow: Lesson = {
  slug: "browser-window",
  title: { ar: "نافذة المتصفح BOM: window والمؤقتات", en: "The browser window (BOM): window and timers" },
  body: [
    { icon: "🪟", ar: "**DOM** هو الصفحة نفسها. أما **BOM** (Browser Object Model) فهو المتصفح حول الصفحة، ويبدأ من الكائن `window`: حجم النافذة، العنوان، السجل، والمؤقتات.", en: "The **DOM** is the page itself. The **BOM** (Browser Object Model) is the browser around the page, starting from the `window` object: the window size, the address, history and timers." },
    { icon: "📐", ar: "`window.innerWidth` عرض النافذة بالبكسل. و `location.href` عنوان الصفحة، و `history.back()` يرجع للصفحة السابقة، و `navigator.language` لغة المتصفح.", en: "`window.innerWidth` is the window's width in pixels. `location.href` is the page address, `history.back()` goes to the previous page, and `navigator.language` is the browser's language." },
    { icon: "⏲️", ar: "`setTimeout(() => { … }, 500)` ينفّذ الكود **مرة واحدة** بعد 500 ملي ثانية (نصف ثانية).", en: "`setTimeout(() => { … }, 500)` runs code **once** after 500 milliseconds (half a second)." },
    { icon: "🔁", ar: "`setInterval(() => { … }, 100)` ينفّذه **كل** 100 ملي ثانية حتى توقفه. احفظ رقمه: `const id = setInterval(…)` ثم أوقفه بـ `clearInterval(id)`.", en: "`setInterval(() => { … }, 100)` runs it **every** 100 milliseconds until you stop it. Keep its id: `const id = setInterval(…)`, then stop it with `clearInterval(id)`." },
  ],
  example: {
    code: 'console.log(window.innerWidth);\n\nsetTimeout(() => {\n  console.log("Half a second later");\n}, 500);\n\nlet n = 0;\nconst id = setInterval(() => {\n  n++;\n  console.log("Tick", n);\n  if (n === 3) clearInterval(id);\n}, 200);',
    note: { ar: "مؤقت مرة واحدة، ومؤقت يتكرر ثلاث مرات ثم يتوقف.", en: "A one-time timer, and one that repeats three times then stops." },
    lang: "js",
  },
  files: ["js", "html"],
  starter: { js: "", html: BOM_HTML },
  solution: {
    js: 'console.log(window.innerWidth);\n\nsetTimeout(() => {\n  document.querySelector("#msg").textContent = "Time\'s up!";\n}, 300);\n\nlet count = 0;\nconst id = setInterval(() => {\n  count++;\n  document.querySelector("#count").textContent = count;\n  if (count === 3) clearInterval(id);\n}, 100);\n',
    html: BOM_HTML,
  },
  settle: 1400,
  harness: 'var txt = function (s) { var e = document.querySelector(s); return e ? e.textContent.trim() : ""; }; console.log("__c__ early " + txt("#msg")); setTimeout(function () { console.log("__c__ msg " + txt("#msg")); console.log("__c__ count " + txt("#count")); }, 900); setTimeout(function () { console.log("__c__ later " + txt("#count")); }, 1250);',
  tasks: [
    { id: "width", label: { ar: "اطبع عرض النافذة بـ `window.innerWidth`", en: "Print the window's width with `window.innerWidth`" }, test: ({ files, logs }) => /innerWidth/.test(files.js ?? "") && logs.some((l) => /^\d+$/.test(l.trim())) },
    { id: "timeout", label: { ar: "بـ `setTimeout` غيّر نص `#msg` بعد 300 ملي ثانية إلى `Time's up!`", en: "With `setTimeout`, change `#msg` to `Time's up!` after 300 ms" }, test: ({ files, logs }) => /setTimeout\(/.test(files.js ?? "") && printed(logs, "__c__ msg Time's up!") && !printed(logs, "__c__ early Time's up!") },
    { id: "interval", label: { ar: "بـ `setInterval` زِد `#count` كل 100 ملي ثانية، وأوقفه بـ `clearInterval` عند 3", en: "With `setInterval`, add one to `#count` every 100 ms and stop it with `clearInterval` at 3" }, test: ({ files, logs }) => /setInterval\(/.test(files.js ?? "") && /clearInterval\(/.test(files.js ?? "") && printed(logs, "__c__ count 3") && printed(logs, "__c__ later 3") },
  ],
  hints: [
    { ar: '`setTimeout(() => { document.querySelector("#msg").textContent = "Time\'s up!"; }, 300);`', en: '`setTimeout(() => { document.querySelector("#msg").textContent = "Time\'s up!"; }, 300);`' },
    { ar: '`let count = 0; const id = setInterval(() => { count++; document.querySelector("#count").textContent = count; if (count === 3) clearInterval(id); }, 100);`', en: '`let count = 0; const id = setInterval(() => { count++; document.querySelector("#count").textContent = count; if (count === 3) clearInterval(id); }, 100);`' },
  ],
  deep: {
    more: [
      { icon: "🌍", ar: "`window` هو الكائن العام: `console` و `document` و `setTimeout` كلها خصائص فيه، لذلك نكتبها دون `window.` في البداية.", en: "`window` is the global object: `console`, `document` and `setTimeout` all live on it, which is why we can skip the `window.` in front." },
      { icon: "💬", ar: "`alert(\"Hi\")` و `confirm(\"Sure?\")` و `prompt(\"Name?\")` نوافذ جاهزة من المتصفح، لكنها توقف الصفحة وشكلها قديم؛ المواقع الحديثة تصنع نوافذها بـ HTML.", en: "`alert(\"Hi\")`, `confirm(\"Sure?\")` and `prompt(\"Name?\")` are built-in browser dialogs, but they freeze the page and look dated; modern sites build their own with HTML." },
      { icon: "📏", ar: "حدث `resize` يخبرك عندما يتغير حجم النافذة: `window.addEventListener(\"resize\", …)`.", en: "The `resize` event tells you when the window size changes: `window.addEventListener(\"resize\", …)`." },
    ],
    mistakes: [
      { ar: "`setTimeout(update(), 300)` بأقواس ← تنفذ الدالة فورًا. مرّر الدالة نفسها: `setTimeout(update, 300)` أو `() => update()`.", en: "`setTimeout(update(), 300)` with parentheses → runs the function right away. Pass the function itself: `setTimeout(update, 300)` or `() => update()`." },
      { ar: "نسيان `clearInterval` ← المؤقت يعمل للأبد ويستهلك البطارية.", en: "Forgetting `clearInterval` → the timer runs forever and drains the battery." },
      { ar: "الظن أن الرقم بالثواني: `setTimeout(fn, 3)` ← هذا 3 ملي ثانية. لثلاث ثوانٍ اكتب `3000`.", en: "Thinking the number is in seconds: `setTimeout(fn, 3)` → that's 3 milliseconds. For three seconds write `3000`." },
    ],
  },
  xp: 30,
};
