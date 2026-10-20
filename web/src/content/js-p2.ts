import type { Challenge } from "./challenges";
import { printed } from "./check";
import type { Lesson, Question } from "./types";

/**
 * JavaScript Phase 2: working with data and the ES2015+ basics.
 * Numbers and Math, arrays, array methods, objects, dates, destructuring, spread and rest,
 * arrow functions with default parameters, scope and hoisting, and closures.
 * Lessons before `arrowDefault` teach with `function`, but their checks accept arrows too.
 */

const c = (logs: string[], name: string, value: string | number | boolean) => printed(logs, `__c__ ${name} ${value}`);
/** A `__c__` marker whose value matches a pattern (for answers with small wording differences). */
const cm = (logs: string[], name: string, re: RegExp) => logs.some((l) => l.startsWith(`__c__ ${name} `) && re.test(l.slice(`__c__ ${name} `.length).trim()));

/* ------------------------------------------------------------------ 12 numbers-math */

export const numbersMath: Lesson = {
  slug: "numbers-math",
  title: { ar: "الأرقام والرياضيات: Math", en: "Numbers and Math" },
  body: [
    { icon: "🔢", ar: "`toFixed(2)` يكتب الرقم بخانتين بعد الفاصلة: `(4.567).toFixed(2)` يعطي `\"4.57\"`. انتبه: النتيجة **نص**، وهي مناسبة لعرض الأسعار.", en: "`toFixed(2)` writes a number with two decimals: `(4.567).toFixed(2)` gives `\"4.57\"`. Careful: the result is **text**, which is right for showing prices." },
    { icon: "🧮", ar: "الكائن `Math` فيه أدوات جاهزة للتقريب: `Math.round(4.5)` للأقرب (`5`)، و `Math.floor(4.9)` للأسفل (`4`)، و `Math.ceil(4.1)` للأعلى (`5`).", en: "The `Math` object has ready-made rounding tools: `Math.round(4.5)` to the nearest (`5`), `Math.floor(4.9)` down (`4`), and `Math.ceil(4.1)` up (`5`)." },
    { icon: "🏆", ar: "`Math.max(3, 9, 5)` يعطي الأكبر (`9`)، و `Math.min(3, 9, 5)` يعطي الأصغر (`3`). و `Number.isInteger(7)` يعطي `true` لأن 7 عدد صحيح، أما `Number.isInteger(7.5)` فيعطي `false`.", en: "`Math.max(3, 9, 5)` gives the biggest (`9`), and `Math.min(3, 9, 5)` the smallest (`3`). `Number.isInteger(7)` gives `true` because 7 is a whole number, while `Number.isInteger(7.5)` gives `false`." },
    { icon: "🎲", ar: "`Math.random()` يعطي رقمًا عشوائيًا من 0 إلى أقل من 1. لنرد من 1 إلى 6: اضربه في 6، ثم احذف الكسر بـ `Math.floor`، ثم أضف 1: `Math.floor(Math.random() * 6) + 1`.", en: "`Math.random()` gives a random number from 0 up to (but not including) 1. For a dice from 1 to 6: multiply by 6, drop the fraction with `Math.floor`, then add 1: `Math.floor(Math.random() * 6) + 1`." },
  ],
  example: {
    code: "const price = 4.567;\n\nconsole.log(price.toFixed(2));     // 4.57\nconsole.log(Math.round(4.5));      // 5\nconsole.log(Math.floor(4.9));      // 4\nconsole.log(Math.ceil(4.1));       // 5\nconsole.log(Math.max(3, 9, 5));    // 9\nconsole.log(Math.min(3, 9, 5));    // 3\nconsole.log(Number.isInteger(7));  // true\n\nconsole.log(Math.floor(Math.random() * 6) + 1);  // 1 to 6",
    note: { ar: "شغّل المثال أكثر من مرة: السطر الأخير يتغير كل مرة.", en: "Run it a few times: the last line changes every time." },
    lang: "js",
  },
  files: ["js"],
  starter: { js: "const price = 19.987;\nconst score = 7.5;\n\n" },
  solution: { js: "const price = 19.987;\nconst score = 7.5;\n\nconsole.log(price.toFixed(2));\nconsole.log(Math.floor(score));\nconsole.log(Number.isInteger(score));\n\nfunction rollDice() {\n  return Math.floor(Math.random() * 6) + 1;\n}\n\nconsole.log(rollDice());\n" },
  harness: '(function () { try { var __r = []; for (var __i = 0; __i < 300; __i++) { __r.push(rollDice()); } var __ok = __r.every(function (n) { return typeof n === "number" && n === Math.floor(n) && n >= 1 && n <= 6; }); console.log("__c__ dice " + (__ok && __r.indexOf(1) >= 0 && __r.indexOf(6) >= 0)); } catch (e) { console.log("__c__ dice missing"); } })();',
  tasks: [
    { id: "fixed", label: { ar: "اطبع `price` بخانتين بعد الفاصلة بـ `toFixed(2)` (يظهر `19.99`)", en: "Print `price` with two decimals using `toFixed(2)` (it shows `19.99`)" }, test: ({ files, logs }) => /\.toFixed\(\s*2\s*\)/.test(files.js ?? "") && printed(logs, "19.99") },
    { id: "floor", label: { ar: "قرّب `score` للأسفل بـ `Math.floor` واطبعه (يظهر `7`)", en: "Round `score` down with `Math.floor` and print it (it shows `7`)" }, test: ({ files, logs }) => /Math\.floor\(\s*score\s*\)/.test(files.js ?? "") && printed(logs, "7") },
    { id: "integer", label: { ar: "اطبع هل `score` عدد صحيح بـ `Number.isInteger` (يظهر `false`)", en: "Print whether `score` is a whole number with `Number.isInteger` (it shows `false`)" }, test: ({ files, logs }) => /Number\.isInteger\(/.test(files.js ?? "") && printed(logs, "false") },
    { id: "dice", label: { ar: "اكتب دالة `rollDice()` تُرجع رقمًا صحيحًا من 1 إلى 6 بـ `Math.random` و `Math.floor`", en: "Write a function `rollDice()` that returns a whole number from 1 to 6 using `Math.random` and `Math.floor`" }, test: ({ logs }) => c(logs, "dice", "true") },
  ],
  hints: [
    { ar: "`console.log(price.toFixed(2));` ثم `console.log(Math.floor(score));` ثم `console.log(Number.isInteger(score));`", en: "`console.log(price.toFixed(2));` then `console.log(Math.floor(score));` then `console.log(Number.isInteger(score));`" },
    { ar: "`function rollDice() { return Math.floor(Math.random() * 6) + 1; }`", en: "`function rollDice() { return Math.floor(Math.random() * 6) + 1; }`" },
  ],
  deep: {
    more: [
      { icon: "🎯", ar: "لعدد عشوائي من `min` إلى `max`: `Math.floor(Math.random() * (max - min + 1)) + min`. النرد حالة خاصة منه: min = 1 و max = 6.", en: "For a random whole number from `min` to `max`: `Math.floor(Math.random() * (max - min + 1)) + min`. The dice is the case min = 1, max = 6." },
      { icon: "🧾", ar: "`toFixed` يُرجع نصًا. إذا أردت رقمًا مقرّبًا للحساب بعده، حوّله: `Number(price.toFixed(2))`.", en: "`toFixed` returns text. If you need a rounded number to keep calculating, convert it: `Number(price.toFixed(2))`." },
      { icon: "🔬", ar: "`0.1 + 0.2` يعطي `0.30000000000000004` لأن الحاسوب يخزن الكسور بشكل تقريبي. لذلك قرّب الأسعار عند العرض بـ `toFixed(2)`.", en: "`0.1 + 0.2` gives `0.30000000000000004` because computers store fractions approximately. That's why you round prices for display with `toFixed(2)`." },
    ],
    mistakes: [
      { ar: "`Math.round(Math.random() * 6)` ← يعطي من 0 إلى 6، والطرفان أقل احتمالًا. استخدم `Math.floor(...) + 1`.", en: "`Math.round(Math.random() * 6)` → gives 0 to 6, with the ends less likely. Use `Math.floor(...) + 1`." },
      { ar: "`math.floor(x)` بحرف صغير ← الاسم `Math` بحرف كبير.", en: "`math.floor(x)` in lowercase → the name is `Math` with a capital." },
      { ar: "`price.toFixed(2) + 1` ← النتيجة نص فيُلصق: `\"19.991\"`. احسب أولًا ثم استخدم `toFixed` في النهاية.", en: "`price.toFixed(2) + 1` → the result is text, so it glues: `\"19.991\"`. Calculate first, and use `toFixed` at the very end." },
    ],
  },
  xp: 25,
};

/* ------------------------------------------------------------------ 13 arrays */

export const arrays: Lesson = {
  slug: "arrays-loops",
  title: { ar: "المصفوفات", en: "Arrays" },
  body: [
    { icon: "🗂️", ar: "**المصفوفة** (array) قائمة قيم بين `[ ]` تفصل بينها فواصل: `const fruits = [\"apple\", \"banana\"];`. العدّ يبدأ من **صفر**: `fruits[0]` هو `\"apple\"`، و `fruits[1]` هو `\"banana\"`.", en: "An **array** is a list of values in `[ ]`, separated by commas: `const fruits = [\"apple\", \"banana\"];`. Counting starts at **zero**: `fruits[0]` is `\"apple\"`, and `fruits[1]` is `\"banana\"`." },
    { icon: "📏", ar: "`fruits.length` عدد العناصر. لذلك آخر عنصر هو `fruits[fruits.length - 1]`.", en: "`fruits.length` is how many items there are. So the last item is `fruits[fruits.length - 1]`." },
    { icon: "➕", ar: "`push(\"x\")` يضيف في **النهاية** و `pop()` يحذف من النهاية. `unshift(\"x\")` يضيف في **البداية** و `shift()` يحذف من البداية. كلها تغيّر المصفوفة نفسها، حتى لو كانت `const`.", en: "`push(\"x\")` adds to the **end** and `pop()` removes from the end. `unshift(\"x\")` adds to the **start** and `shift()` removes from the start. They all change the array itself, even a `const` one." },
    { icon: "🔁", ar: "`for (const fruit of fruits) { … }` تمر على كل عنصر بالترتيب، وفي كل دورة يكون `fruit` هو العنصر الحالي.", en: "`for (const fruit of fruits) { … }` goes through every item in order; on each turn, `fruit` is the current item." },
  ],
  example: {
    code: "const nums = [10, 20, 30];\n\nconsole.log(nums[0]);      // 10\nconsole.log(nums.length);  // 3\n\nnums.push(40);     // [10, 20, 30, 40]\nnums.pop();        // [10, 20, 30]\nnums.unshift(5);   // [5, 10, 20, 30]\nnums.shift();      // [10, 20, 30]\n\nfor (const n of nums) {\n  console.log(n);\n}",
    note: { ar: "أول عنصر، العدد، الإضافة والحذف، ثم كل عنصر بحلقة.", en: "The first item, the count, adding and removing, then every item with a loop." },
    lang: "js",
  },
  modern: {
    old: "for (var i = 0; i < nums.length; i++) {\n  console.log(nums[i]);\n}",
    now: "for (const n of nums) {\n  console.log(n);\n}",
    text: { ar: "الحلقة بالعداد `i` ما زالت صحيحة، لكن `for...of` أوضح وأقل أخطاء عندما تريد كل عنصر.", en: "The counter loop with `i` still works, but `for...of` is clearer and less error-prone when you want every item." },
    since: "ES2015",
  },
  files: ["js"],
  starter: { js: 'const fruits = ["apple", "banana", "cherry"];\n\n' },
  solution: { js: 'const fruits = ["apple", "banana", "cherry"];\n\nconsole.log(fruits[0]);\nconsole.log(fruits.length);\n\nfruits.push("mango");\n\nfor (const fruit of fruits) {\n  console.log(fruit);\n}\n' },
  harness: '(function () { try { console.log("__c__ fruits " + fruits.join(",")); } catch (e) { console.log("__c__ fruits missing"); } })();',
  tasks: [
    { id: "first", label: { ar: "اطبع أول فاكهة بـ `fruits[0]` (يظهر `apple`)", en: "Print the first fruit with `fruits[0]` (it shows `apple`)" }, test: ({ files, logs }) => /fruits\s*\[\s*0\s*\]/.test(files.js ?? "") && printed(logs, "apple") },
    { id: "length", label: { ar: "اطبع عدد الفواكه بـ `fruits.length` (يظهر `3`)", en: "Print how many fruits there are with `fruits.length` (it shows `3`)" }, test: ({ files, logs }) => /fruits\.length\b/.test(files.js ?? "") && (printed(logs, "3") || printed(logs, "4")) },
    { id: "push", label: { ar: "أضف `\"mango\"` إلى نهاية `fruits` بـ `push`", en: "Add `\"mango\"` to the end of `fruits` with `push`" }, test: ({ files, logs }) => /\.push\(/.test(files.js ?? "") && c(logs, "fruits", "apple,banana,cherry,mango") },
    { id: "forof", label: { ar: "اطبع كل فاكهة في سطر بحلقة `for...of`", en: "Print every fruit on its own line with a `for...of` loop" }, test: ({ files, logs }) => /for\s*\(\s*(const|let)\s+\w+\s+of\s+fruits\s*\)/.test(files.js ?? "") && printed(logs, "banana") && printed(logs, "cherry") },
  ],
  hints: [
    { ar: "`console.log(fruits[0]);` ثم `console.log(fruits.length);` ثم `fruits.push(\"mango\");`", en: "`console.log(fruits[0]);` then `console.log(fruits.length);` then `fruits.push(\"mango\");`" },
    { ar: "`for (const fruit of fruits) { console.log(fruit); }`", en: "`for (const fruit of fruits) { console.log(fruit); }`" },
  ],
  deep: {
    more: [
      { icon: "🧺", ar: "المصفوفة تقبل أي نوع: أرقام ونصوص و `true`/`false`، وحتى مصفوفات داخلها. لكن الأفضل أن تكون عناصرها من نوع واحد.", en: "An array can hold any type: numbers, text, `true`/`false`, even other arrays. But it's best to keep one kind of item per array." },
      { icon: "↩️", ar: "`pop()` و `shift()` تُرجعان العنصر المحذوف: `const last = fruits.pop();` يحفظ آخر فاكهة ويحذفها.", en: "`pop()` and `shift()` return the item they removed: `const last = fruits.pop();` keeps the last fruit and removes it." },
      { icon: "🔍", ar: "`fruits.includes(\"apple\")` يعطي `true` إذا كان العنصر موجودًا، و `fruits.indexOf(\"banana\")` يعطي موقعه (أو `-1`).", en: "`fruits.includes(\"apple\")` gives `true` if the item is there, and `fruits.indexOf(\"banana\")` gives its position (or `-1`)." },
    ],
    mistakes: [
      { ar: "`fruits[3]` في مصفوفة من 3 عناصر ← يعطي `undefined`، لأن آخر موقع هو `2`.", en: "`fruits[3]` in a 3-item array → gives `undefined`, because the last position is `2`." },
      { ar: "`fruits.length()` بأقواس ← `length` خاصية وليست دالة: اكتب `fruits.length`.", en: "`fruits.length()` with parentheses → `length` is a property, not a function: write `fruits.length`." },
      { ar: "`for (const fruit in fruits)` بـ `in` ← تعطيك المواقع `0, 1, 2` لا العناصر. استخدم `of`.", en: "`for (const fruit in fruits)` with `in` → gives you the positions `0, 1, 2`, not the items. Use `of`." },
    ],
  },
  xp: 30,
};

/* ------------------------------------------------------------------ 14b array-methods */

export const arrayMethods: Lesson = {
  slug: "array-methods",
  title: { ar: "دوال المصفوفات: forEach و find و reduce", en: "Array methods: forEach, find and reduce" },
  body: [
    { icon: "🔁", ar: "`forEach` تنفّذ دالة لكل عنصر، مثل `for...of`: `names.forEach(function (n) { console.log(n); });`. لا تُرجع شيئًا؛ هي فقط **تفعل** شيئًا لكل عنصر.", en: "`forEach` runs a function for each item, like `for...of`: `names.forEach(function (n) { console.log(n); });`. It returns nothing; it just **does** something per item." },
    { icon: "🔎", ar: "`find` تُرجع **أول** عنصر يحقق الشرط: `[5, 12, 30].find(function (n) { return n > 10; })` يعطي `12`. أما `filter` فتُرجع **كل** المطابقات في مصفوفة. وإذا لم تجد `find` شيئًا تُرجع `undefined`.", en: "`find` returns the **first** item that passes the test: `[5, 12, 30].find(function (n) { return n > 10; })` gives `12`. `filter` returns **every** match in an array. If `find` finds nothing, it returns `undefined`." },
    { icon: "🧮", ar: "`reduce` تجمع المصفوفة في **قيمة واحدة**: `prices.reduce(function (sum, p) { return sum + p; }, 0)` تحسب المجموع. `sum` هو المجموع حتى الآن، و `0` قيمة البداية.", en: "`reduce` folds an array into **one value**: `prices.reduce(function (sum, p) { return sum + p; }, 0)` adds them up. `sum` is the total so far, and `0` is the starting value." },
    { icon: "✂️", ar: "ستتعلم قريبًا طريقة أقصر لكتابة هذه الدوال الصغيرة: الدوال السهمية `=>`.", en: "Soon you'll learn a shorter way to write these small functions: arrow functions `=>`." },
  ],
  example: {
    code: "const nums = [4, 15, 8, 23];\n\nnums.forEach(function (n) {\n  console.log(n);\n});\n\nconst big = nums.find(function (n) {\n  return n > 10;\n});\nconsole.log(big);    // 15\n\nconst total = nums.reduce(function (sum, n) {\n  return sum + n;\n}, 0);\nconsole.log(total);  // 50",
    note: { ar: "كل عنصر، ثم أول عنصر كبير، ثم المجموع.", en: "Every item, then the first big one, then the total." },
    lang: "js",
  },
  modern: {
    old: "var total = 0;\nfor (var i = 0; i < nums.length; i++) {\n  total += nums[i];\n}",
    now: "const total = nums.reduce(function (sum, n) {\n  return sum + n;\n}, 0);",
    text: { ar: "دوال المصفوفات تصف **ماذا** تريد بدل **كيف** تحسبه خطوة بخطوة. والحلقة `for...of` مع `let total = 0` صحيحة أيضًا.", en: "Array methods describe **what** you want instead of **how** to compute it step by step. A `for...of` loop with `let total = 0` is also correct." },
  },
  files: ["js"],
  starter: { js: 'const names = ["Sara", "Omar", "Lina"];\nconst prices = [20, 40, 5, 60];\n\n' },
  solution: { js: 'const names = ["Sara", "Omar", "Lina"];\nconst prices = [20, 40, 5, 60];\n\nnames.forEach(function (n) {\n  console.log(n);\n});\n\nconst pricey = prices.find(function (p) {\n  return p > 30;\n});\nconsole.log(pricey);\n\nconst total = prices.reduce(function (sum, p) {\n  return sum + p;\n}, 0);\nconsole.log(total);\n' },
  tasks: [
    { id: "foreach", label: { ar: "اطبع كل اسم في `names` بـ `forEach`", en: "Print every name in `names` with `forEach`" }, test: ({ files, logs }) => /\.forEach\(/.test(files.js ?? "") && printed(logs, "Sara") && printed(logs, "Omar") && printed(logs, "Lina") },
    { id: "find", label: { ar: "بـ `find` اطبع أول سعر أكبر من 30 (يظهر `40`)", en: "With `find`, print the first price over 30 (it shows `40`)" }, test: ({ files, logs }) => /\.find\(/.test(files.js ?? "") && printed(logs, "40") },
    { id: "reduce", label: { ar: "احسب مجموع `prices` بـ `reduce` واطبعه (يظهر `125`)", en: "Total `prices` with `reduce` and print it (it shows `125`)" }, test: ({ files, logs }) => /\.reduce\(/.test(files.js ?? "") && printed(logs, "125") },
  ],
  hints: [
    { ar: "`names.forEach(function (n) { console.log(n); });`", en: "`names.forEach(function (n) { console.log(n); });`" },
    { ar: "`console.log(prices.find(function (p) { return p > 30; }));` و `console.log(prices.reduce(function (sum, p) { return sum + p; }, 0));`", en: "`console.log(prices.find(function (p) { return p > 30; }));` and `console.log(prices.reduce(function (sum, p) { return sum + p; }, 0));`" },
  ],
  deep: {
    more: [
      { icon: "🔢", ar: "`forEach` تعطي الدالة موقع العنصر أيضًا: `names.forEach(function (n, i) { console.log(i + 1, n); });` يرقّم القائمة.", en: "`forEach` also gives the function each item's position: `names.forEach(function (n, i) { console.log(i + 1, n); });` numbers the list." },
      { icon: "🏁", ar: "`reduce` لا تجمع فقط: يمكنها إيجاد الأكبر، أو عدّ شيء، أو بناء نص. الفكرة دائمًا: قيمة تكبر خطوة بخطوة.", en: "`reduce` isn't only for sums: it can find the biggest, count things or build text. The idea is always a value that grows step by step." },
      { icon: "🧭", ar: "اختر حسب ما تريد: مصفوفة جديدة ← `map`، بعض العناصر ← `filter`، عنصر واحد ← `find`، قيمة واحدة ← `reduce`، فعل فقط ← `forEach`.", en: "Pick by what you want: a new array → `map`, some items → `filter`, one item → `find`, one value → `reduce`, just an action → `forEach`." },
    ],
    mistakes: [
      { ar: "نسيان `return` داخل دالة `find` أو `reduce` ← تُرجع `undefined` فتفشل النتيجة.", en: "Forgetting `return` inside the `find` or `reduce` function → it returns `undefined` and the result breaks." },
      { ar: "`const all = names.forEach(...)` ← `forEach` لا تُرجع شيئًا، فـ `all` يصبح `undefined`. لمصفوفة جديدة استخدم `map`.", en: "`const all = names.forEach(...)` → `forEach` returns nothing, so `all` is `undefined`. For a new array use `map`." },
      { ar: "نسيان قيمة البداية `0` في `reduce` ← تعمل مع الأرقام غالبًا، لكنها تفشل مع مصفوفة فارغة. اكتبها دائمًا.", en: "Leaving out the starting `0` in `reduce` → usually works with numbers, but fails on an empty array. Always write it." },
    ],
  },
  xp: 30,
};

/* ------------------------------------------------------------------ 15 objects */

export const objects: Lesson = {
  slug: "objects",
  title: { ar: "الكائنات: بيانات منظمة", en: "Objects: organized data" },
  body: [
    { icon: "🗃️", ar: "**الكائن** (object) يجمع معلومات عن شيء واحد بأسماء: `const user = { name: \"Sara\", age: 21 };`. كل زوج `اسم: قيمة` يسمى **خاصية** (property).", en: "An **object** groups facts about one thing by name: `const user = { name: \"Sara\", age: 21 };`. Each `name: value` pair is a **property**." },
    { icon: "🔑", ar: "تقرأ الخاصية بالنقطة `user.name`، أو بالأقواس المربعة `user[\"name\"]`. الأقواس مفيدة عندما يكون اسم الخاصية داخل متغير: `const key = \"age\";` ثم `user[key]` يعطي `21`.", en: "Read a property with a dot `user.name`, or with square brackets `user[\"name\"]`. Brackets help when the property name is inside a variable: `const key = \"age\";` then `user[key]` gives `21`." },
    { icon: "✏️", ar: "تغيّر خاصية بـ `user.age = 22`، وتضيف خاصية جديدة بالطريقة نفسها: `user.city = \"Tunis\"`.", en: "Change a property with `user.age = 22`, and add a new one the same way: `user.city = \"Tunis\"`." },
    { icon: "🛠️", ar: "الكائن يمكن أن يحتوي **دالة**، وتسمى **method**: `greet() { return \"Hi, \" + this.name; }`. داخلها، `this` تعني **هذا الكائن نفسه**، فـ `this.name` هو `user.name`. وتستدعيها بـ `user.greet()`.", en: "An object can hold a **function**, called a **method**: `greet() { return \"Hi, \" + this.name; }`. Inside it, `this` means **this very object**, so `this.name` is `user.name`. Call it with `user.greet()`." },
  ],
  example: {
    code: 'const user = {\n  name: "Sara",\n  age: 21,\n  greet() {\n    return `Hi, I\'m ${this.name}`;\n  },\n};\n\nconsole.log(user.name);      // Sara\nconsole.log(user["age"]);    // 21\n\nuser.age = 22;\nuser.city = "Tunis";\nconsole.log(user.city);      // Tunis\n\nconsole.log(user.greet());   // Hi, I\'m Sara',
    note: { ar: "قراءة بالنقطة وبالأقواس، تغيير وإضافة، ثم method تستخدم `this`.", en: "Reading with a dot and brackets, changing and adding, then a method that uses `this`." },
    lang: "js",
  },
  files: ["js"],
  starter: { js: 'const book = {\n  title: "Clean Code",\n  pages: 400,\n};\n\nconst key = "pages";\n\n' },
  solution: { js: 'const book = {\n  title: "Clean Code",\n  pages: 400,\n  describe() {\n    return `${this.title} has ${this.pages} pages`;\n  },\n};\n\nconst key = "pages";\n\nconsole.log(book.title);\nconsole.log(book[key]);\n\nbook.author = "Robert Martin";\n' },
  harness: '(function () { try { console.log("__c__ author " + book.author); } catch (e) { console.log("__c__ author missing"); } try { console.log("__c__ describe " + book.describe()); var __other = { title: "Dune", pages: 412, describe: book.describe }; console.log("__c__ this " + __other.describe()); } catch (e) { console.log("__c__ describe missing"); } })();',
  tasks: [
    { id: "dot", label: { ar: "اطبع عنوان الكتاب بالنقطة `book.title` (يظهر `Clean Code`)", en: "Print the book's title with a dot, `book.title` (it shows `Clean Code`)" }, test: ({ files, logs }) => /book\s*\.\s*title\b/.test(files.js ?? "") && printed(logs, "Clean Code") },
    { id: "bracket", label: { ar: "اطبع عدد الصفحات بالأقواس `book[key]` (يظهر `400`)", en: "Print the pages with brackets, `book[key]` (it shows `400`)" }, test: ({ files, logs }) => /book\s*\[\s*key\s*\]/.test(files.js ?? "") && printed(logs, "400") },
    { id: "add", label: { ar: "أضف إلى `book` خاصية جديدة `author` قيمتها `\"Robert Martin\"`", en: "Add a new property `author` to `book` with the value `\"Robert Martin\"`" }, test: ({ logs }) => c(logs, "author", "Robert Martin") },
    { id: "method", label: { ar: "داخل `book` أضف method اسمها `describe()` تُرجع `Clean Code has 400 pages` باستخدام `this.title` و `this.pages`", en: "Inside `book`, add a method `describe()` that returns `Clean Code has 400 pages` using `this.title` and `this.pages`" }, test: ({ logs }) => c(logs, "describe", "Clean Code has 400 pages") && c(logs, "this", "Dune has 412 pages") },
  ],
  hints: [
    { ar: "`console.log(book.title);` ثم `console.log(book[key]);` ثم `book.author = \"Robert Martin\";`", en: "`console.log(book.title);` then `console.log(book[key]);` then `book.author = \"Robert Martin\";`" },
    { ar: "داخل الكائن بعد `pages: 400,` اكتب: `` describe() { return `${this.title} has ${this.pages} pages`; }, ``", en: "Inside the object, after `pages: 400,` write: `` describe() { return `${this.title} has ${this.pages} pages`; }, ``" },
  ],
  deep: {
    more: [
      { icon: "🔁", ar: "للمرور على كل الخصائص: `for (const k in user) { console.log(k, user[k]); }`. هنا `in` تعطي **أسماء** الخصائص، ونقرأ القيمة بالأقواس.", en: "To go through every property: `for (const k in user) { console.log(k, user[k]); }`. Here `in` gives the property **names**, and you read each value with brackets." },
      { icon: "🧩", ar: "قيم الكائن يمكن أن تكون أي شيء: مصفوفة `tags: [\"js\", \"web\"]` أو كائنًا آخر `address: { city: \"Tunis\" }`، وتقرؤها `user.address.city`.", en: "Object values can be anything: an array `tags: [\"js\", \"web\"]` or another object `address: { city: \"Tunis\" }`, read as `user.address.city`." },
      { icon: "🗑️", ar: "لحذف خاصية: `delete user.city`. ولمعرفة هل هي موجودة: `\"city\" in user` يعطي `true` أو `false`.", en: "To remove a property: `delete user.city`. To check if one exists: `\"city\" in user` gives `true` or `false`." },
    ],
    mistakes: [
      { ar: "`book.key` بالنقطة ← يبحث عن خاصية اسمها حرفيًا `key`. عندما يكون الاسم في متغير استخدم `book[key]`.", en: "`book.key` with a dot → looks for a property literally named `key`. When the name is in a variable, use `book[key]`." },
      { ar: "`describe: () => this.title` بدالة سهمية ← الدالة السهمية لا تملك `this` خاصًا بها. اكتب الـ method بالشكل `describe() { … }`.", en: "`describe: () => this.title` as an arrow function → arrows have no `this` of their own. Write the method as `describe() { … }`." },
      { ar: "نسيان الفاصلة بين الخصائص `{ title: \"A\" pages: 4 }` ← خطأ في الكتابة. ضع `,` بعد كل خاصية.", en: "Forgetting the comma between properties `{ title: \"A\" pages: 4 }` → a syntax error. Put `,` after each property." },
    ],
  },
  xp: 30,
};

/* ------------------------------------------------------------------ 16 date-time */

export const dateTime: Lesson = {
  slug: "date-time",
  title: { ar: "التاريخ والوقت: Date", en: "Dates and time: Date" },
  body: [
    { icon: "📅", ar: "`new Date()` يعطي **الآن**: التاريخ والوقت الحاليين. ومنه تقرأ الأجزاء: `now.getFullYear()` السنة، و `now.getDate()` يوم الشهر (من 1 إلى 31).", en: "`new Date()` gives **now**: the current date and time. From it you read the parts: `now.getFullYear()` is the year, and `now.getDate()` is the day of the month (1 to 31)." },
    { icon: "⚠️", ar: "`getMonth()` يعدّ الأشهر من **صفر**: يناير `0` وديسمبر `11`، لذلك أضف 1 لتحصل على الرقم المعتاد: `now.getMonth() + 1`. و `getDay()` يوم الأسبوع: الأحد `0` والسبت `6`.", en: "`getMonth()` counts months from **zero**: January is `0` and December `11`, so add 1 to get the usual number: `now.getMonth() + 1`. `getDay()` is the day of the week: Sunday `0`, Saturday `6`." },
    { icon: "📌", ar: "لتاريخ محدد: `new Date(2026, 0, 15)` هو 15 يناير 2026 (الشهر هنا من صفر أيضًا). و `date.toLocaleDateString()` يكتبه بالشكل المألوف في بلد المستخدم.", en: "For a fixed date: `new Date(2026, 0, 15)` is January 15, 2026 (the month counts from zero here too). `date.toLocaleDateString()` writes it the way people write dates in the user's country." },
    { icon: "⏳", ar: "طرح تاريخين يعطي الفرق **بالملي ثانية**. في اليوم `1000 * 60 * 60 * 24` ملي ثانية، فاقسم عليه وقرّب: `Math.round((b - a) / (1000 * 60 * 60 * 24))` هو عدد الأيام.", en: "Subtracting two dates gives the difference in **milliseconds**. A day has `1000 * 60 * 60 * 24` of them, so divide and round: `Math.round((b - a) / (1000 * 60 * 60 * 24))` is the number of days." },
  ],
  example: {
    code: "const now = new Date();\nconsole.log(now.getFullYear());\n\nconst party = new Date(2026, 2, 20);  // March 20, 2026\nconsole.log(party.getMonth() + 1);   // 3\nconsole.log(party.getDate());        // 20\nconsole.log(party.getDay());         // 5 (Friday)\nconsole.log(party.toLocaleDateString());\n\nconst start = new Date(2026, 2, 1);\nconst days = Math.round((party - start) / (1000 * 60 * 60 * 24));\nconsole.log(days);                   // 19",
    note: { ar: "السطر الأول يتغير حسب يومك، والباقي ثابت لأن التاريخ محدد.", en: "The first line depends on today; the rest stays the same because the date is fixed." },
    lang: "js",
  },
  files: ["js"],
  starter: { js: "const exam = new Date(2026, 0, 15);  // January 15, 2026\nconst trip = new Date(2026, 1, 1);   // February 1, 2026\n\n" },
  solution: { js: "const exam = new Date(2026, 0, 15);  // January 15, 2026\nconst trip = new Date(2026, 1, 1);   // February 1, 2026\n\nconst now = new Date();\nconsole.log(now.getFullYear());\n\nconsole.log(exam.getMonth() + 1);\nconsole.log(exam.getDate());\n\nconst days = Math.round((trip - exam) / (1000 * 60 * 60 * 24));\nconsole.log(days);\n" },
  tasks: [
    { id: "year", label: { ar: "اصنع تاريخ الآن بـ `new Date()` واطبع سنته بـ `getFullYear()`", en: "Make today's date with `new Date()` and print its year with `getFullYear()`" }, test: ({ files, logs }) => /new\s+Date\(\s*\)/.test(files.js ?? "") && /getFullYear\(/.test(files.js ?? "") && printed(logs, String(new Date().getFullYear())) },
    { id: "month", label: { ar: "اطبع شهر `exam` كما يقرؤه الناس: `getMonth() + 1` (يظهر `1`)", en: "Print the month of `exam` the way people read it: `getMonth() + 1` (it shows `1`)" }, test: ({ files, logs }) => /getMonth\(/.test(files.js ?? "") && printed(logs, "1") },
    { id: "date", label: { ar: "اطبع يوم الشهر في `exam` بـ `getDate()` (يظهر `15`)", en: "Print the day of the month of `exam` with `getDate()` (it shows `15`)" }, test: ({ files, logs }) => /getDate\(/.test(files.js ?? "") && printed(logs, "15") },
    { id: "days", label: { ar: "اطبع عدد الأيام من `exam` إلى `trip` (يظهر `17`)", en: "Print how many days there are from `exam` to `trip` (it shows `17`)" }, test: ({ logs }) => printed(logs, "17") },
  ],
  hints: [
    { ar: "`const now = new Date(); console.log(now.getFullYear());` ثم `console.log(exam.getMonth() + 1);` و `console.log(exam.getDate());`", en: "`const now = new Date(); console.log(now.getFullYear());` then `console.log(exam.getMonth() + 1);` and `console.log(exam.getDate());`" },
    { ar: "`const days = Math.round((trip - exam) / (1000 * 60 * 60 * 24));` ثم `console.log(days);`", en: "`const days = Math.round((trip - exam) / (1000 * 60 * 60 * 24));` then `console.log(days);`" },
  ],
  deep: {
    more: [
      { icon: "🌍", ar: "`toLocaleDateString(\"ar-EG\")` أو `toLocaleDateString(\"en-GB\")` يختار لغة وشكل التاريخ بنفسك، مثل `15/01/2026`.", en: "`toLocaleDateString(\"ar-EG\")` or `toLocaleDateString(\"en-GB\")` picks the language and format yourself, like `15/01/2026`." },
      { icon: "⏰", ar: "للوقت: `getHours()` و `getMinutes()` و `getSeconds()`. و `Date.now()` يعطي اللحظة الحالية بالملي ثانية، مفيد لقياس المدة.", en: "For the time: `getHours()`, `getMinutes()` and `getSeconds()`. `Date.now()` gives the current moment in milliseconds, handy for measuring how long something takes." },
      { icon: "🔧", ar: "يمكنك تغيير جزء من التاريخ: `date.setDate(date.getDate() + 7)` يقدّمه أسبوعًا، و JavaScript تنقل الشهر تلقائيًا إذا لزم.", en: "You can change part of a date: `date.setDate(date.getDate() + 7)` moves it a week ahead, and JavaScript rolls over the month for you." },
    ],
    mistakes: [
      { ar: "`getMonth()` بدون `+ 1` ← يناير يظهر `0`. أضف 1 عند العرض.", en: "`getMonth()` without `+ 1` → January shows as `0`. Add 1 when you display it." },
      { ar: "الخلط بين `getDate()` (يوم الشهر 1–31) و `getDay()` (يوم الأسبوع 0–6).", en: "Mixing up `getDate()` (day of the month, 1–31) and `getDay()` (day of the week, 0–6)." },
      { ar: "`new Date(2026, 1, 1)` على أنه يناير ← الشهر `1` هو **فبراير** لأن العدّ من صفر.", en: "Reading `new Date(2026, 1, 1)` as January → month `1` is **February**, because counting starts at zero." },
    ],
  },
  xp: 30,
};

/* ------------------------------------------------------------------ 17 destructuring */

export const destructuring: Lesson = {
  slug: "destructuring",
  title: { ar: "التفكيك: destructuring", en: "Destructuring" },
  body: [
    { icon: "📦", ar: "**التفكيك** يأخذ خصائص من كائن إلى متغيرات في سطر واحد: `const { title, pages } = book;` يساوي `const title = book.title;` و `const pages = book.pages;`.", en: "**Destructuring** pulls properties out of an object into variables in one line: `const { title, pages } = book;` is the same as `const title = book.title;` and `const pages = book.pages;`." },
    { icon: "🏷️", ar: "لاسم مختلف ضع نقطتين: `const { title: bookTitle } = book;` يصنع متغيرًا اسمه `bookTitle`. ولقيمة احتياطية إذا لم تكن الخاصية موجودة: `const { color = \"black\" } = book;`.", en: "For a different name use a colon: `const { title: bookTitle } = book;` makes a variable called `bookTitle`. For a fallback when the property is missing: `const { color = \"black\" } = book;`." },
    { icon: "🔢", ar: "مع المصفوفات تستخدم `[ ]` ويكون الأخذ **بالترتيب**: `const [first, second] = [\"red\", \"green\"];` يجعل `first` = `\"red\"` و `second` = `\"green\"`.", en: "With arrays you use `[ ]` and values are taken **in order**: `const [first, second] = [\"red\", \"green\"];` makes `first` `\"red\"` and `second` `\"green\"`." },
    { icon: "🔄", ar: "حيلة مفيدة: تبديل قيمتي متغيرين دون متغير ثالث: `[a, b] = [b, a];`.", en: "A handy trick: swap two variables without a third one: `[a, b] = [b, a];`." },
  ],
  example: {
    code: 'const user = { city: "Cairo", age: 30 };\n\nconst { city, age } = user;\nconsole.log(city, age);            // Cairo 30\n\nconst { age: years, job = "none" } = user;\nconsole.log(years, job);           // 30 none\n\nconst [first, second] = ["red", "green"];\nconsole.log(first);                // red\n\nlet x = 1;\nlet y = 2;\n[x, y] = [y, x];\nconsole.log(x, y);                 // 2 1',
    note: { ar: "تفكيك كائن، اسم جديد وقيمة احتياطية، تفكيك مصفوفة، ثم تبديل.", en: "Destructuring an object, a new name and a fallback, an array, then a swap." },
    lang: "js",
  },
  modern: {
    old: "var brand = phone.brand;\nvar price = phone.price;",
    now: "const { brand, price } = phone;",
    text: { ar: "التفكيك يختصر الأسطر المتكررة، وستراه كثيرًا في React وعند قراءة بيانات JSON.", en: "Destructuring removes repetitive lines; you'll see it all over React and when reading JSON data." },
    since: "ES2015",
  },
  files: ["js"],
  starter: { js: 'const phone = { brand: "Nokia", price: 300 };\nlet a = "left";\nlet b = "right";\n\n' },
  solution: { js: 'const phone = { brand: "Nokia", price: 300 };\nlet a = "left";\nlet b = "right";\n\nconst { brand } = phone;\nconsole.log(brand);\n\nconst { price: cost } = phone;\nconsole.log(cost);\n\nconst { color = "black" } = phone;\nconsole.log(color);\n\n[a, b] = [b, a];\n' },
  harness: '(function () { try { console.log("__c__ swap " + a + " " + b); } catch (e) { console.log("__c__ swap missing"); } })();',
  tasks: [
    { id: "object", label: { ar: "خذ `brand` من `phone` بالتفكيك `const { brand } = phone;` واطبعه (يظهر `Nokia`)", en: "Take `brand` out of `phone` with `const { brand } = phone;` and print it (it shows `Nokia`)" }, test: ({ files, logs }) => /\{[^}]*\bbrand\b[^}]*\}\s*=\s*phone\b/.test(files.js ?? "") && printed(logs, "Nokia") },
    { id: "rename", label: { ar: "خذ `price` باسم جديد `cost`: `const { price: cost } = phone;` واطبعه (يظهر `300`)", en: "Take `price` under a new name `cost`: `const { price: cost } = phone;` and print it (it shows `300`)" }, test: ({ files, logs }) => /\{[^}]*\bprice\s*:\s*[A-Za-z$]\w*[^}]*\}\s*=\s*phone\b/.test(files.js ?? "") && printed(logs, "300") },
    { id: "default", label: { ar: "خذ `color` بقيمة احتياطية `\"black\"` (غير موجودة في `phone`) واطبعه (يظهر `black`)", en: "Take `color` with the fallback `\"black\"` (it isn't in `phone`) and print it (it shows `black`)" }, test: ({ files, logs }) => /\{[^}]*\bcolor\s*=[^}]+\}\s*=\s*phone\b/.test(files.js ?? "") && printed(logs, "black") },
    { id: "swap", label: { ar: "بدّل قيمتي `a` و `b` بتفكيك مصفوفة: `[a, b] = [b, a];`", en: "Swap `a` and `b` with array destructuring: `[a, b] = [b, a];`" }, test: ({ files, logs }) => /\[\s*\w+\s*,\s*\w+\s*\]\s*=\s*\[/.test(files.js ?? "") && c(logs, "swap", "right left") },
  ],
  hints: [
    { ar: "`const { brand } = phone;` ثم `console.log(brand);`، ومثلها `const { price: cost } = phone;`", en: "`const { brand } = phone;` then `console.log(brand);`, and likewise `const { price: cost } = phone;`" },
    { ar: "`const { color = \"black\" } = phone;` ثم `console.log(color);` وفي النهاية `[a, b] = [b, a];`", en: "`const { color = \"black\" } = phone;` then `console.log(color);`, and finally `[a, b] = [b, a];`" },
  ],
  deep: {
    more: [
      { icon: "🧰", ar: "يمكنك جمع كل شيء في سطر واحد: `const { brand, price: cost, color = \"black\" } = phone;`.", en: "You can do it all in one line: `const { brand, price: cost, color = \"black\" } = phone;`." },
      { icon: "📥", ar: "التفكيك يعمل في معاملات الدالة أيضًا: `function show({ brand, price }) { … }` ثم `show(phone)`.", en: "Destructuring works in function parameters too: `function show({ brand, price }) { … }` then `show(phone)`." },
      { icon: "⏭️", ar: "في المصفوفة يمكنك تخطي عنصر بفاصلة فارغة: `const [, second] = [\"red\", \"green\"];` يأخذ الثاني فقط.", en: "In an array you can skip an item with an empty comma: `const [, second] = [\"red\", \"green\"];` takes only the second." },
    ],
    mistakes: [
      { ar: "`const { Brand } = phone;` بحرف كبير ← الاسم يجب أن يطابق الخاصية تمامًا، وإلا تحصل على `undefined`.", en: "`const { Brand } = phone;` with a capital → the name must match the property exactly, or you get `undefined`." },
      { ar: "سطر يبدأ بـ `[` بعد سطر بلا `;` ← قد يلتصق بالسطر السابق ويعطي خطأ. ضع `;` في نهاية السطر الذي قبل `[a, b] = [b, a];`.", en: "A line starting with `[` after a line without `;` → it can stick to the previous line and error. End the line before `[a, b] = [b, a];` with `;`." },
      { ar: "`const [a, b] = [b, a];` لتبديل متغيرات موجودة ← `const` يعرّف متغيرات جديدة. للتبديل اكتب بدون `const`، والمتغيرات معرّفة بـ `let`.", en: "`const [a, b] = [b, a];` to swap existing variables → `const` declares new ones. To swap, leave out `const`, with the variables declared using `let`." },
    ],
  },
  xp: 30,
};

/* ------------------------------------------------------------------ 17b spread-rest */

export const spreadRest: Lesson = {
  slug: "spread",
  title: { ar: "النشر والتجميع: ...", en: "Spread and rest: ..." },
  body: [
    { icon: "🌊", ar: "النقاط الثلاث `...` **تفرد** محتوى مصفوفة أو كائن داخل واحد جديد. هكذا **تنسخ** دون أن تغيّر الأصل.", en: "Three dots `...` **spread** the contents of an array or object into a new one. That's how you **copy** without changing the original." },
    { icon: "📋", ar: "للمصفوفة: `const more = [...colors, \"blue\"];` نسخة فيها كل الألوان القديمة ثم `\"blue\"`. وللكائن: `const older = { ...user, age: 22 };` نسخة من `user` مع تغيير `age` فقط.", en: "For an array: `const more = [...colors, \"blue\"];` is a copy with all the old colors, then `\"blue\"`. For an object: `const older = { ...user, age: 22 };` is a copy of `user` with only `age` changed." },
    { icon: "🥇", ar: "في الكائن، الخاصية المكتوبة **بعد** `...` هي التي تبقى، لذلك ضع التغييرات في النهاية.", en: "In an object, the property written **after** `...` wins, so put your changes at the end." },
    { icon: "🎒", ar: "وفي معاملات الدالة تفعل `...` العكس: **تجمع** (rest). `function sum(...nums)` تضع كل القيم المُمرَّرة في مصفوفة `nums`: `sum(1, 2, 3)` تجعل `nums` = `[1, 2, 3]`.", en: "In a function's parameters, `...` does the opposite: it **gathers** (rest). `function sum(...nums)` puts every value passed in into an array `nums`: `sum(1, 2, 3)` makes `nums` `[1, 2, 3]`." },
  ],
  example: {
    code: 'const a = [1, 2];\nconst b = [...a, 3];\nconsole.log(a, b);  // [1, 2] [1, 2, 3]\n\nconst user = { name: "Sara", city: "Tunis" };\nconst moved = { ...user, city: "Cairo" };\nconsole.log(user.city, moved.city);  // Tunis Cairo\n\nfunction countAll(...items) {\n  return items.length;\n}\nconsole.log(countAll("a", "b", "c"));  // 3',
    note: { ar: "النشر ينسخ ويفرد، والتجميع يضم القيم في مصفوفة.", en: "Spread copies and spreads out; rest gathers values into an array." },
    lang: "js",
  },
  modern: {
    old: "var copy = Object.assign({}, user, { age: 22 });\nvar more = colors.concat([\"blue\"]);\nfunction sum() {\n  var nums = Array.prototype.slice.call(arguments);\n}",
    now: "const copy = { ...user, age: 22 };\nconst more = [...colors, \"blue\"];\nfunction sum(...nums) {}",
    text: { ar: "`Object.assign` و `concat` و `arguments` ما زالت تعمل، لكن `...` أقصر وأوضح.", en: "`Object.assign`, `concat` and `arguments` still work, but `...` is shorter and clearer." },
    since: "ES2018",
  },
  files: ["js"],
  starter: { js: 'const colors = ["red", "green"];\nconst user = { name: "Sara", age: 21 };\n\n' },
  solution: { js: 'const colors = ["red", "green"];\nconst user = { name: "Sara", age: 21 };\n\nconst moreColors = [...colors, "blue"];\nconsole.log(moreColors.length);\n\nconst older = { ...user, age: 22 };\nconsole.log(older.age);\n\nfunction sum(...nums) {\n  let total = 0;\n  for (const n of nums) {\n    total += n;\n  }\n  return total;\n}\n' },
  harness: '(function () { try { console.log("__c__ originals " + colors.length + " " + user.age); } catch (e) { console.log("__c__ originals missing"); } try { console.log("__c__ sum " + sum(1, 2, 3) + " " + sum(5, 10) + " " + sum()); } catch (e) { console.log("__c__ sum missing"); } })();',
  tasks: [
    { id: "array", label: { ar: "اصنع `moreColors`: نسخة من `colors` بـ `...` مع `\"blue\"`، واطبع طولها (`3`)", en: "Make `moreColors`: a copy of `colors` with `...` plus `\"blue\"`, and print its length (`3`)" }, test: ({ files, logs }) => /\.\.\.colors\b/.test(files.js ?? "") && printed(logs, "3") },
    { id: "object", label: { ar: "اصنع `older`: نسخة من `user` بـ `...` مع `age: 22`، واطبع `older.age` (`22`)", en: "Make `older`: a copy of `user` with `...` and `age: 22`, and print `older.age` (`22`)" }, test: ({ files, logs }) => /\.\.\.user\b/.test(files.js ?? "") && printed(logs, "22") },
    { id: "same", label: { ar: "الأصل لم يتغير: `colors` فيها لونان و `user.age` ما زال 21", en: "The originals didn't change: `colors` still has two colors and `user.age` is still 21" }, test: ({ files, logs }) => /\.\.\.colors\b/.test(files.js ?? "") && /\.\.\.user\b/.test(files.js ?? "") && c(logs, "originals", "2 21") },
    { id: "rest", label: { ar: "اكتب دالة `sum(...nums)` تُرجع مجموع كل القيم: `sum(1, 2, 3)` تعطي `6` و `sum()` تعطي `0`", en: "Write a function `sum(...nums)` that returns the total of all values: `sum(1, 2, 3)` gives `6` and `sum()` gives `0`" }, test: ({ files, logs }) => /\(\s*\.\.\.\s*[A-Za-z$]\w*\s*\)/.test(files.js ?? "") && c(logs, "sum", "6 15 0") },
  ],
  hints: [
    { ar: '`const moreColors = [...colors, "blue"];` ثم `console.log(moreColors.length);`، و `const older = { ...user, age: 22 };` ثم `console.log(older.age);`', en: '`const moreColors = [...colors, "blue"];` then `console.log(moreColors.length);`, and `const older = { ...user, age: 22 };` then `console.log(older.age);`' },
    { ar: "`function sum(...nums) { let total = 0; for (const n of nums) { total += n; } return total; }`", en: "`function sum(...nums) { let total = 0; for (const n of nums) { total += n; } return total; }`" },
  ],
  deep: {
    more: [
      { icon: "🪞", ar: "النسخ بـ `...` **سطحي**: الكائنات الموجودة داخل المصفوفة لا تُنسخ، بل مرجعها فقط. للنسخ الكامل استخدم `structuredClone(obj)`.", en: "Copying with `...` is **shallow**: objects nested inside aren't duplicated, only their references. For a full copy use `structuredClone(obj)`." },
      { icon: "🔀", ar: "النشر يعمل عند الاستدعاء أيضًا: `Math.max(...[3, 9, 5])` يفرد المصفوفة كقيم منفصلة ويعطي `9`.", en: "Spread works when calling, too: `Math.max(...[3, 9, 5])` spreads the array into separate values and gives `9`." },
      { icon: "🧷", ar: "يمكن أن يأتي التجميع بعد معاملات عادية: `function log(level, ...messages)` تأخذ الأول وحده، والباقي في مصفوفة.", en: "Rest can come after normal parameters: `function log(level, ...messages)` takes the first one alone and the rest in an array." },
    ],
    mistakes: [
      { ar: "`const copy = colors;` ← ليست نسخة، بل اسم ثانٍ لنفس المصفوفة. استخدم `[...colors]`.", en: "`const copy = colors;` → not a copy, just a second name for the same array. Use `[...colors]`." },
      { ar: "`{ age: 22, ...user }` ← `user` يأتي بعدها فيُرجع العمر 21. ضع التغيير **بعد** `...user`.", en: "`{ age: 22, ...user }` → `user` comes after and puts age back to 21. Put the change **after** `...user`." },
      { ar: "`function f(...nums, last)` ← التجميع يجب أن يكون **آخر** معامل.", en: "`function f(...nums, last)` → rest must be the **last** parameter." },
    ],
  },
  xp: 30,
};

/* ------------------------------------------------------------------ 18 arrow-default */

export const arrowDefault: Lesson = {
  slug: "arrow-default",
  title: { ar: "الدوال السهمية والقيم الافتراضية", en: "Arrow functions and default parameters" },
  body: [
    { icon: "🏹", ar: "**الدالة السهمية** طريقة أقصر لكتابة دالة: بدل `function double(n) { return n * 2; }` تكتب `const double = (n) => n * 2;`. السهم `=>` يربط المعاملات بما تُرجعه الدالة.", en: "An **arrow function** is a shorter way to write a function: instead of `function double(n) { return n * 2; }` you write `const double = (n) => n * 2;`. The arrow `=>` links the parameters to what the function returns." },
    { icon: "📝", ar: "في الشكل القصير (بدون `{ }`) تُرجع النتيجة تلقائيًا. إذا احتجت عدة أسطر، ضع `{ }` واكتب `return` بنفسك: `const area = (w, h) => { const a = w * h; return a; };`.", en: "In the short form (no `{ }`) the result is returned for you. If you need several lines, add `{ }` and write `return` yourself: `const area = (w, h) => { const a = w * h; return a; };`." },
    { icon: "🎁", ar: "**القيمة الافتراضية** تُستخدم عندما لا تُمرَّر قيمة للمعامل: `function greet(name = \"friend\") { … }`. الاستدعاء `greet()` يجعل `name` = `\"friend\"`، و `greet(\"Sara\")` يجعلها `\"Sara\"`.", en: "A **default parameter** is used when no value is passed: `function greet(name = \"friend\") { … }`. Calling `greet()` makes `name` `\"friend\"`, and `greet(\"Sara\")` makes it `\"Sara\"`." },
    { icon: "🧩", ar: "الدوال السهمية مريحة جدًا مع دوال المصفوفات: `nums.map((n) => n * 2)` بدل `nums.map(function (n) { return n * 2; })`.", en: "Arrow functions are very handy with array methods: `nums.map((n) => n * 2)` instead of `nums.map(function (n) { return n * 2; })`." },
  ],
  example: {
    code: "const square = (n) => n * n;\nconsole.log(square(4));          // 16\n\nconst area = (w, h) => {\n  const result = w * h;\n  return result;\n};\nconsole.log(area(3, 5));         // 15\n\nfunction welcome(user = \"guest\") {\n  return `Welcome, ${user}!`;\n}\nconsole.log(welcome());          // Welcome, guest!\nconsole.log(welcome(\"Lina\"));    // Welcome, Lina!",
    note: { ar: "سهم قصير، سهم بأقواس و `return`، ثم قيمة افتراضية.", en: "A short arrow, an arrow with braces and `return`, then a default value." },
    lang: "js",
  },
  modern: {
    old: "var double = function (n) {\n  return n * 2;\n};",
    now: "const double = (n) => n * 2;",
    text: { ar: "تعبير `function` ما زال صحيحًا، لكن السهم أقصر وأوضح للدوال الصغيرة.", en: "A `function` expression still works, but an arrow is shorter and clearer for small functions." },
    since: "ES2015",
  },
  files: ["js"],
  starter: { js: "// 1. double: a short arrow function\n\n\n// 2. fullName: an arrow function with { } and return\n\n\n// 3. greet: a default parameter\n\n" },
  solution: { js: "// 1. double: a short arrow function\nconst double = (n) => n * 2;\n\n// 2. fullName: an arrow function with { } and return\nconst fullName = (first, last) => {\n  const full = first + \" \" + last;\n  return full;\n};\n\n// 3. greet: a default parameter\nfunction greet(name = \"friend\") {\n  return \"Hello, \" + name;\n}\n" },
  harness: '(function () { try { console.log("__c__ double " + double(4) + " " + double(10)); } catch (e) { console.log("__c__ double missing"); } try { console.log("__c__ full " + fullName("Sara", "Ali")); } catch (e) { console.log("__c__ full missing"); } try { console.log("__c__ greet0 " + greet()); console.log("__c__ greet1 " + greet("Sara")); } catch (e) { console.log("__c__ greet missing"); } })();',
  tasks: [
    { id: "short", label: { ar: "اكتب دالة سهمية قصيرة `double` تُرجع الرقم مضروبًا في 2: `double(4)` تعطي `8`", en: "Write a short arrow function `double` that returns a number times 2: `double(4)` gives `8`" }, test: ({ files, logs }) => /\bdouble\s*=\s*(\([^)]*\)|[A-Za-z$]\w*)\s*=>/.test(files.js ?? "") && c(logs, "double", "8 20") },
    { id: "braces", label: { ar: "اكتب دالة سهمية `fullName(first, last)` بـ `{ }` و `return` تُرجع الاسمين بينهما مسافة: `fullName(\"Sara\", \"Ali\")` تعطي `Sara Ali`", en: "Write an arrow function `fullName(first, last)` with `{ }` and `return` that returns both names with a space: `fullName(\"Sara\", \"Ali\")` gives `Sara Ali`" }, test: ({ files, logs }) => /\bfullName\s*=\s*\([^)]*\)\s*=>\s*\{[\s\S]*\breturn\b/.test(files.js ?? "") && c(logs, "full", "Sara Ali") },
    { id: "default", label: { ar: "اكتب `greet(name = \"friend\")` تُرجع `\"Hello, \" + name`: `greet()` تعطي `Hello, friend` و `greet(\"Sara\")` تعطي `Hello, Sara`", en: "Write `greet(name = \"friend\")` that returns `\"Hello, \" + name`: `greet()` gives `Hello, friend` and `greet(\"Sara\")` gives `Hello, Sara`" }, test: ({ files, logs }) => /[A-Za-z$]\w*\s*=\s*["'`]friend["'`]/.test(files.js ?? "") && cm(logs, "greet0", /^hello,?\s*friend!?$/i) && cm(logs, "greet1", /^hello,?\s*sara!?$/i) },
  ],
  hints: [
    { ar: "`const double = (n) => n * 2;` و `const fullName = (first, last) => { return first + \" \" + last; };`", en: "`const double = (n) => n * 2;` and `const fullName = (first, last) => { return first + \" \" + last; };`" },
    { ar: "`function greet(name = \"friend\") { return \"Hello, \" + name; }`", en: "`function greet(name = \"friend\") { return \"Hello, \" + name; }`" },
  ],
  deep: {
    more: [
      { icon: "🎯", ar: "مع معامل واحد يمكن حذف الأقواس: `n => n * 2`. لكن كثيرين يتركونها دائمًا `(n) => n * 2` ليبقى الشكل واحدًا.", en: "With one parameter you can drop the parentheses: `n => n * 2`. Many people keep them anyway, `(n) => n * 2`, so every arrow looks the same." },
      { icon: "📦", ar: "لإرجاع كائن في الشكل القصير ضعه بين أقواس عادية: `const make = (n) => ({ name: n });`، وإلا ظنّت JavaScript أن `{` بداية كتلة.", en: "To return an object in the short form, wrap it in parentheses: `const make = (n) => ({ name: n });`, or JavaScript thinks `{` starts a block." },
      { icon: "🎛️", ar: "القيم الافتراضية تعمل مع الدوال السهمية أيضًا: `const greet = (name = \"friend\") => \"Hello, \" + name;`.", en: "Default parameters work with arrows too: `const greet = (name = \"friend\") => \"Hello, \" + name;`." },
    ],
    mistakes: [
      { ar: "`(n) => { n * 2 }` بأقواس معقوفة بلا `return` ← تُرجع `undefined`. اكتب `return` أو احذف الأقواس.", en: "`(n) => { n * 2 }` with braces and no `return` → returns `undefined`. Write `return` or drop the braces." },
      { ar: "استخدام دالة سهمية كـ method تحتاج `this` ← السهم لا يملك `this` خاصًا به. للـ method استخدم `name() { … }`.", en: "Using an arrow as a method that needs `this` → arrows have no `this` of their own. For methods use `name() { … }`." },
      { ar: "استدعاء `const` سهمية **قبل** سطر تعريفها ← خطأ، بعكس `function`. عرّفها أولًا ثم استدعها.", en: "Calling a `const` arrow **before** the line that defines it → an error, unlike `function`. Define it first, then call it." },
    ],
  },
  xp: 30,
};

/* ------------------------------------------------------------------ 19 scope-hoisting */

const SCOPE_START = '// 1. message only exists inside the { } of the if\nconst price = 50;\nif (price > 20) {\n  let message = "Expensive";\n}\nconsole.log(message);\n\n// 2. total is used before its line\nconsole.log(total);\nlet total = 100;\n\n// 3. add is called here...\nconsole.log(add(2, 3));\n// ...write function add(a, b) below this line\n';

export const scopeHoisting: Lesson = {
  slug: "scope-hoisting",
  title: { ar: "النطاق والرفع: scope و hoisting", en: "Scope and hoisting" },
  body: [
    { icon: "🏠", ar: "**النطاق** (scope) هو المكان الذي يُرى فيه المتغير. المتغير المعرّف خارج كل الدوال **عام** (global) ويُرى في كل مكان، والمعرّف داخل دالة **محلي** (local) لا يُرى خارجها.", en: "**Scope** is where a variable can be seen. A variable declared outside every function is **global** and visible everywhere; one declared inside a function is **local** and invisible outside it." },
    { icon: "📦", ar: "`let` و `const` لهما **نطاق الكتلة**: المتغير المعرّف داخل `{ }` (مثل `if` أو حلقة) يختفي بعد `}`. أما `var` القديمة فتتجاهل الكتلة وتتسرّب خارجها، ولهذا نتجنبها.", en: "`let` and `const` have **block scope**: a variable declared inside `{ }` (like an `if` or a loop) disappears after the `}`. The old `var` ignores blocks and leaks out, which is why we avoid it." },
    { icon: "⬆️", ar: "**الرفع** (hoisting): JavaScript تقرأ تعريفات `function` قبل تشغيل الكود، لذلك يمكنك استدعاء الدالة **قبل** سطر تعريفها.", en: "**Hoisting**: JavaScript reads `function` declarations before running the code, so you can call a function **before** the line that defines it." },
    { icon: "⛔", ar: "أما `let` و `const` فلا تُستخدم قبل سطر تعريفها: `console.log(x); let x = 5;` يعطي الخطأ `Cannot access 'x' before initialization`. المسافة قبل التعريف تسمى **المنطقة الميتة مؤقتًا** (TDZ).", en: "`let` and `const` can't be used before their line: `console.log(x); let x = 5;` gives the error `Cannot access 'x' before initialization`. The stretch before the declaration is called the **temporal dead zone** (TDZ)." },
  ],
  example: {
    code: 'const site = "Code Master";      // global\n\nfunction show() {\n  const page = "Home";           // local\n  console.log(site, page);       // Code Master Home\n}\nshow();\n\nif (true) {\n  let inside = "only here";\n  console.log(inside);           // only here\n}\n// console.log(inside);          // Error: inside is not defined\n\nconsole.log(add(2, 3));          // 5, works before the definition\nfunction add(a, b) {\n  return a + b;\n}',
    note: { ar: "عام ومحلي، كتلة تُخفي متغيرها، ودالة تُستدعى قبل تعريفها.", en: "Global and local, a block hiding its variable, and a function called before its definition." },
    lang: "js",
  },
  modern: {
    old: "if (true) {\n  var x = 1;\n}\nconsole.log(x); // 1: it leaked out",
    now: "if (true) {\n  let x = 1;\n}\n// x only exists inside { }",
    text: { ar: "نطاق الكتلة يُبقي كل متغير في مكانه، فلا تغيّر متغيرًا بالخطأ من مكان بعيد.", en: "Block scope keeps each variable where it belongs, so you don't change one by accident from far away." },
    since: "ES2015",
  },
  files: ["js"],
  starter: { js: SCOPE_START },
  solution: { js: '// 1. message is declared before the if, and changed inside it\nconst price = 50;\nlet message = "";\nif (price > 20) {\n  message = "Expensive";\n}\nconsole.log(message);\n\n// 2. total is declared first, then used\nlet total = 100;\nconsole.log(total);\n\n// 3. add is called here...\nconsole.log(add(2, 3));\n// ...write function add(a, b) below this line\nfunction add(a, b) {\n  return a + b;\n}\n' },
  tasks: [
    { id: "block", label: { ar: "أصلح الجزء 1 ليطبع `Expensive`: عرّف `let message` **قبل** `if`، وغيّر قيمتها فقط داخلها", en: "Fix part 1 so it prints `Expensive`: declare `let message` **before** the `if`, and only change it inside" }, test: ({ files, logs }) => /console\.log\(\s*message\s*\)/.test(files.js ?? "") && printed(logs, "Expensive") },
    { id: "tdz", label: { ar: "أصلح الجزء 2 ليطبع `100`: انقل `console.log(total)` إلى ما بعد `let total = 100;`", en: "Fix part 2 so it prints `100`: move `console.log(total)` below `let total = 100;`" }, test: ({ files, logs }) => /console\.log\(\s*total\s*\)/.test(files.js ?? "") && printed(logs, "100") },
    { id: "hoist", label: { ar: "تحت الاستدعاء عرّف `function add(a, b)` تُرجع `a + b` (يظهر `5` رغم أن الاستدعاء قبلها)", en: "Below the call, declare `function add(a, b)` that returns `a + b` (it prints `5` even though the call comes first)" }, test: ({ files, logs }) => {
      const js = files.js ?? "";
      const call = js.search(/console\.log\(\s*add\s*\(/);
      const decl = js.search(/function\s+add\s*\(/);
      return call >= 0 && decl > call && printed(logs, "5");
    } },
  ],
  hints: [
    { ar: "الجزء 1: `let message = \"\";` قبل `if`، وداخلها `message = \"Expensive\";`. الجزء 2: `let total = 100;` أولًا ثم `console.log(total);`.", en: "Part 1: `let message = \"\";` before the `if`, and inside it `message = \"Expensive\";`. Part 2: `let total = 100;` first, then `console.log(total);`." },
    { ar: "في آخر الملف: `function add(a, b) { return a + b; }`", en: "At the end of the file: `function add(a, b) { return a + b; }`" },
  ],
  deep: {
    more: [
      { icon: "🪆", ar: "الدوال والكتل يمكن أن تتداخل، والكود الداخلي يرى متغيرات كل ما حوله، لكن الخارجي لا يرى ما بداخل. هذه **سلسلة النطاقات**.", en: "Functions and blocks can nest: inner code sees the variables of everything around it, but outer code can't see inside. This is the **scope chain**." },
      { icon: "👥", ar: "يمكن لمتغير داخلي أن يحمل نفس اسم متغير خارجي فيغطيه داخل كتلته فقط (shadowing). هذا مسموح لكنه مربك، فاختر أسماء مختلفة.", en: "An inner variable can reuse an outer variable's name and hide it inside its block only (shadowing). It's allowed but confusing, so pick different names." },
      { icon: "🔁", ar: "مع `let` في الحلقة `for (let i = 0; …)` يحصل كل دور على `i` خاص به. مع `var` يتشارك الجميع نفس المتغير، وهذا سبب أخطاء قديمة شهيرة.", en: "With `let` in a loop `for (let i = 0; …)`, each turn gets its own `i`. With `var` they all share one variable, the cause of some famous old bugs." },
    ],
    mistakes: [
      { ar: "تعريف المتغير داخل `if` ثم استخدامه بعدها ← `is not defined`. عرّفه قبل الكتلة.", en: "Declaring a variable inside an `if` and using it after → `is not defined`. Declare it before the block." },
      { ar: "تحويل `let` إلى `var` لـ\"إصلاح\" الخطأ ← يعمل لكنه يخفي المشكلة ويُرجع `undefined` أحيانًا. رتّب الأسطر بدلًا من ذلك.", en: "Switching `let` to `var` to \"fix\" the error → it runs, but hides the problem and sometimes gives `undefined`. Reorder the lines instead." },
      { ar: "الظن أن `const add = (a, b) => a + b;` تُرفع مثل `function` ← لا؛ استدعاؤها قبل سطرها خطأ.", en: "Thinking `const add = (a, b) => a + b;` is hoisted like `function` → it isn't; calling it before its line is an error." },
    ],
  },
  xp: 30,
};

/* ------------------------------------------------------------------ 20 closures */

export const closures: Lesson = {
  slug: "closures",
  title: { ar: "الإغلاق: دالة تتذكر", en: "Closures: functions that remember" },
  body: [
    { icon: "🎒", ar: "الدالة يمكن أن **تُرجع دالة أخرى**. والدالة الداخلية تتذكر المتغيرات التي حولها حتى بعد انتهاء الدالة الخارجية. هذا يسمى **الإغلاق** (closure).", en: "A function can **return another function**. The inner function remembers the variables around it, even after the outer function has finished. This is called a **closure**." },
    { icon: "🔢", ar: "مثال: `makeCounter()` تعرّف `let count = 0` ثم تُرجع دالة تزيد `count` وتُرجعه. كلما استدعيت الدالة المُرجعة كبر الرقم: 1 ثم 2 ثم 3.", en: "Example: `makeCounter()` declares `let count = 0`, then returns a function that adds 1 to `count` and returns it. Each call to the returned function gives a bigger number: 1, then 2, then 3." },
    { icon: "👯", ar: "كل استدعاء لـ `makeCounter()` يصنع `count` **جديدًا خاصًا به**، لذلك لا يتشارك عدّادان مختلفان الرقم نفسه.", en: "Each call to `makeCounter()` makes a **fresh** `count` of its own, so two different counters never share the same number." },
    { icon: "🔒", ar: "ولا يستطيع أي كود خارجي تغيير `count` مباشرة؛ الطريق الوحيد إليه هو الدالة المُرجعة. هكذا يحمي الإغلاق البيانات.", en: "No outside code can change `count` directly; the only way in is the returned function. That's how closures protect data." },
  ],
  example: {
    code: "function makeGreeter(greeting) {\n  return function (who) {\n    return `${greeting}, ${who}!`;\n  };\n}\n\nconst hello = makeGreeter(\"Hello\");\nconst salam = makeGreeter(\"Salam\");\n\nconsole.log(hello(\"Sara\"));   // Hello, Sara!\nconsole.log(salam(\"Omar\"));   // Salam, Omar!",
    note: { ar: "كل دالة مُرجعة تتذكر التحية التي صُنعت بها.", en: "Each returned function remembers the greeting it was made with." },
    lang: "js",
  },
  files: ["js"],
  starter: { js: "function makeCounter() {\n  // 1. let count = 0;\n  // 2. return a function that adds 1 to count and returns it\n}\n\nconst counter = makeCounter();\nconsole.log(counter());\nconsole.log(counter());\nconsole.log(counter());\n" },
  solution: { js: "function makeCounter() {\n  let count = 0;\n  return function () {\n    count++;\n    return count;\n  };\n}\n\nconst counter = makeCounter();\nconsole.log(counter());\nconsole.log(counter());\nconsole.log(counter());\n" },
  harness: '(function () { try { var __a = makeCounter(); console.log("__c__ type " + typeof __a); console.log("__c__ counts " + __a() + " " + __a() + " " + __a()); var __b = makeCounter(); console.log("__c__ separate " + __b() + " " + __a()); } catch (e) { console.log("__c__ counter missing"); } })();',
  tasks: [
    { id: "returns", label: { ar: "اجعل `makeCounter()` تُرجع دالة", en: "Make `makeCounter()` return a function" }, test: ({ logs }) => c(logs, "type", "function") },
    { id: "counts", label: { ar: "الدالة المُرجعة تعدّ: تُرجع `1` ثم `2` ثم `3`", en: "The returned function counts: it returns `1`, then `2`, then `3`" }, test: ({ logs }) => c(logs, "counts", "1 2 3") },
    { id: "separate", label: { ar: "عدّادان من `makeCounter()` مستقلان: الجديد يبدأ من `1` (ضع `let count = 0` **داخل** `makeCounter`)", en: "Two counters from `makeCounter()` are independent: a new one starts at `1` (put `let count = 0` **inside** `makeCounter`)" }, test: ({ logs }) => c(logs, "separate", "1 4") },
  ],
  hints: [
    { ar: "داخل `makeCounter` اكتب `let count = 0;` ثم `return function () { … };`", en: "Inside `makeCounter` write `let count = 0;` then `return function () { … };`" },
    { ar: "الدالة المُرجعة: `return function () { count++; return count; };`", en: "The returned function: `return function () { count++; return count; };`" },
  ],
  deep: {
    more: [
      { icon: "🏹", ar: "بالدالة السهمية يصبح الشكل أقصر: `return () => ++count;`. `++count` تزيد ثم تُرجع القيمة الجديدة.", en: "With an arrow it gets shorter: `return () => ++count;`. `++count` adds one, then gives the new value." },
      { icon: "🧰", ar: "يمكن أن تُرجع كائنًا فيه عدة دوال تتشارك المتغير نفسه: `return { add() { count++; }, get() { return count; } };`.", en: "You can return an object with several functions sharing the same variable: `return { add() { count++; }, get() { return count; } };`." },
      { icon: "🌐", ar: "الإغلاق في كل مكان: كل دالة تمررها لـ `addEventListener` أو `setTimeout` تتذكر المتغيرات حولها. لهذا يعمل كودك حتى بعد انتهاء الدالة.", en: "Closures are everywhere: every function you pass to `addEventListener` or `setTimeout` remembers the variables around it. That's why your code still works after the outer function has ended." },
    ],
    mistakes: [
      { ar: "وضع `let count = 0` **خارج** `makeCounter` ← كل العدادات تتشارك رقمًا واحدًا. ضعه داخلها.", en: "Putting `let count = 0` **outside** `makeCounter` → every counter shares one number. Put it inside." },
      { ar: "`return count++;` ← تُرجع القيمة **قبل** الزيادة فتبدأ من 0. زِد أولًا ثم أرجع، أو استخدم `++count`.", en: "`return count++;` → returns the value **before** adding, so it starts at 0. Add first, then return, or use `++count`." },
      { ar: "`return makeCounter;` أو نسيان `return` ← لا تُرجع الدالة الداخلية. اكتب `return function () { … };`.", en: "`return makeCounter;` or forgetting `return` → the inner function isn't returned. Write `return function () { … };`." },
    ],
  },
  xp: 35,
};

/* ------------------------------------------------------------------ practice */

export const challengesP2: Challenge[] = [
  { id: "p2-num-fixed", after: "javascript/numbers-math", prompt: { ar: "اعرض السعر بخانتين بعد الفاصلة", en: "Show the price with two decimals" }, code: "const price = 9.456;\nconsole.log(price._(2));", answers: ["toFixed"], chips: ["toFixed", "round", "fixed", "floor"] },
  { id: "p2-num-dice", after: "javascript/numbers-math", prompt: { ar: "رمية نرد من 1 إلى 6", en: "A dice roll from 1 to 6" }, code: "const roll = Math._(Math._() * 6) + 1;", answers: ["floor", "random"], chips: ["floor", "random", "round", "max"] },
  { id: "p2-arr-queue", after: "javascript/arrays-loops", prompt: { ar: "أضف في النهاية، ثم احذف من البداية", en: "Add to the end, then remove from the start" }, code: 'const queue = ["Ali", "Mona"];\nqueue._("Sami");\nqueue._();', answers: ["push", "shift"], chips: ["push", "shift", "pop", "unshift"] },
  { id: "p2-arr-forof", after: "javascript/arrays-loops", prompt: { ar: "مرّ على كل لون في المصفوفة", en: "Go through every color in the array" }, code: "for (const color _ colors) {\n  console.log(color);\n}", answers: ["of"], chips: ["of", "in", "from", "="] },
  { id: "p2-arr-find", after: "javascript/array-methods", prompt: { ar: "أول رقم أكبر من 10", en: "The first number over 10" }, code: "const big = nums._(function (n) {\n  return n > 10;\n});", answers: ["find"], chips: ["find", "forEach", "reduce", "push"] },
  { id: "p2-arr-reduce", after: "javascript/array-methods", prompt: { ar: "اجمع كل الأسعار بدءًا من صفر", en: "Add up all the prices, starting from zero" }, code: "const total = prices._(function (sum, p) {\n  return sum + p;\n}, _);", answers: ["reduce", "0"], chips: ["reduce", "0", "forEach", "1"] },
  { id: "p2-obj-bracket", after: "javascript/objects", prompt: { ar: "اقرأ الخاصية التي اسمها في `key`", en: "Read the property whose name is in `key`" }, code: 'const key = "age";\nconsole.log(user_key_);', answers: ["[", "]"], chips: ["[", "]", ".", "(", ")"] },
  { id: "p2-obj-this", after: "javascript/objects", prompt: { ar: "method تستخدم اسم الكائن نفسه", en: "A method that uses the object's own name" }, code: 'const user = {\n  name: "Sara",\n  greet() {\n    return "Hi, " + _.name;\n  },\n};\nconsole.log(user._());', answers: ["this", "greet"], chips: ["this", "greet", "self", "name"] },
  { id: "p2-date-month", after: "javascript/date-time", prompt: { ar: "اطبع الشهر كما يقرؤه الناس", en: "Print the month the way people read it" }, code: "const now = new _();\nconsole.log(now.getMonth() _ 1);", answers: ["Date", "+"], chips: ["Date", "+", "-", "Time"] },
  { id: "p2-date-year", after: "javascript/date-time", prompt: { ar: "اطبع السنة الحالية", en: "Print the current year" }, code: "const today = new Date();\nconsole.log(today._());", answers: ["getFullYear"], chips: ["getFullYear", "getDay", "getDate", "year"] },
  { id: "p2-destr-default", after: "javascript/destructuring", prompt: { ar: "خذ `name` و `city` بقيمة احتياطية", en: "Take `name`, and `city` with a fallback" }, code: 'const { name, city _ "Unknown" } _ user;', answers: ["=", "="], chips: ["=", "=", ":", "=="] },
  { id: "p2-destr-swap", after: "javascript/destructuring", prompt: { ar: "بدّل القيمتين", en: "Swap the two values" }, code: "let a = 1;\nlet b = 2;\n[a, b] = [_, _];", answers: ["b", "a"], chips: ["b", "a", "1", "2"] },
  { id: "p2-spread-copy", after: "javascript/spread", prompt: { ar: "انسخ الكائن وغيّر العمر فقط", en: "Copy the object and change only the age" }, code: "const older = { _user, age: 22 };", answers: ["..."], chips: ["...", "..", "*", "&"] },
  { id: "p2-rest-sum", after: "javascript/spread", prompt: { ar: "اجمع كل القيم المُمرَّرة في `nums`", en: "Gather every value passed in into `nums`" }, code: "function count(_nums) {\n  return nums.length;\n}", answers: ["..."], chips: ["...", "*", "[]", "&"] },
  { id: "p2-arrow-short", after: "javascript/arrow-default", prompt: { ar: "دالة سهمية قصيرة", en: "A short arrow function" }, code: "const triple = (n) _ n * 3;", answers: ["=>"], chips: ["=>", "->", ">=", "=="] },
  { id: "p2-default-param", after: "javascript/arrow-default", prompt: { ar: "قيمة افتراضية للمعامل", en: "A default value for the parameter" }, code: 'function greet(name _ "friend") {\n  return "Hello, " + name;\n}', answers: ["="], chips: ["=", ":", "==", "=>"] },
  { id: "p2-scope-let", after: "javascript/scope-hoisting", prompt: { ar: "عرّف `message` قبل الكتلة لتُرى بعدها", en: "Declare `message` before the block so it's visible after it" }, code: '_ message = "";\nif (ok) {\n  message = "Done";\n}\nconsole.log(message);', answers: ["let"], chips: ["let", "const", "new", "function"] },
  { id: "p2-closure-counter", after: "javascript/closures", prompt: { ar: "عدّاد يتذكر رقمه", en: "A counter that remembers its number" }, code: "function makeCounter() {\n  let count = 0;\n  _ function () {\n    count++;\n    return _;\n  };\n}", answers: ["return", "count"], chips: ["return", "count", "0", "this"] },
];

export const examP2: Question[] = [
  { id: "jx-numbers-math", prompt: { ar: "ماذا يطبع `Math.floor(4.9)`؟", en: "What does `Math.floor(4.9)` print?" }, options: [{ ar: "`5`", en: "`5`" }, { ar: "`4`", en: "`4`" }, { ar: "`4.9`", en: "`4.9`" }], answer: 1 },
  { id: "jx-arrays-loops", prompt: { ar: "أي دالة تضيف عنصرًا إلى **بداية** المصفوفة؟", en: "Which method adds an item to the **start** of an array?" }, options: [{ ar: "`push`", en: "`push`" }, { ar: "`shift`", en: "`shift`" }, { ar: "`unshift`", en: "`unshift`" }], answer: 2 },
  { id: "jx-array-methods", prompt: { ar: "ماذا تُرجع `[5, 12, 30].find(function (n) { return n > 10; })`؟", en: "What does `[5, 12, 30].find(function (n) { return n > 10; })` return?" }, options: [{ ar: "`12`", en: "`12`" }, { ar: "`[12, 30]`", en: "`[12, 30]`" }, { ar: "`true`", en: "`true`" }], answer: 0 },
  { id: "jx-objects", prompt: { ar: "داخل method في كائن، ماذا تعني `this`؟", en: "Inside an object's method, what does `this` mean?" }, options: [{ ar: "الصفحة كلها", en: "The whole page" }, { ar: "الكائن نفسه الذي فيه الـ method", en: "The object the method belongs to" }, { ar: "آخر متغير تم تعريفه", en: "The last variable declared" }], answer: 1 },
  { id: "jx-date-time", prompt: { ar: "ماذا يُرجع `new Date(2026, 0, 15).getMonth()`؟", en: "What does `new Date(2026, 0, 15).getMonth()` return?" }, options: [{ ar: "`1`", en: "`1`" }, { ar: "`15`", en: "`15`" }, { ar: "`0`", en: "`0`" }], answer: 2 },
  { id: "jx-destructuring", prompt: { ar: "بعد `const { price: cost } = phone;` ما اسم المتغير الجديد؟", en: "After `const { price: cost } = phone;`, what is the new variable called?" }, options: [{ ar: "`cost`", en: "`cost`" }, { ar: "`price`", en: "`price`" }, { ar: "`phone`", en: "`phone`" }], answer: 0 },
  { id: "jx-spread", prompt: { ar: "في `function sum(...nums)`، ما هو `nums` عند استدعاء `sum(1, 2, 3)`؟", en: "In `function sum(...nums)`, what is `nums` when you call `sum(1, 2, 3)`?" }, options: [{ ar: "الرقم `1` فقط", en: "Just the number `1`" }, { ar: "المصفوفة `[1, 2, 3]`", en: "The array `[1, 2, 3]`" }, { ar: "الرقم `6`", en: "The number `6`" }], answer: 1 },
  { id: "jx-arrow-default", prompt: { ar: "ماذا يُرجع `greet()` إذا كانت `const greet = (name = \"friend\") => \"Hi \" + name;`؟", en: "What does `greet()` return if `const greet = (name = \"friend\") => \"Hi \" + name;`?" }, options: [{ ar: "`Hi undefined`", en: "`Hi undefined`" }, { ar: "خطأ", en: "An error" }, { ar: "`Hi friend`", en: "`Hi friend`" }], answer: 2 },
  { id: "jx-scope-hoisting", prompt: { ar: "أي واحدة يمكن استدعاؤها **قبل** سطر تعريفها؟", en: "Which one can be called **before** the line that defines it?" }, options: [{ ar: "`function add(a, b) { … }`", en: "`function add(a, b) { … }`" }, { ar: "`const add = (a, b) => a + b;`", en: "`const add = (a, b) => a + b;`" }, { ar: "`let add = function (a, b) { … };`", en: "`let add = function (a, b) { … };`" }], answer: 0 },
  { id: "jx-closures", prompt: { ar: "لماذا لا يتشارك عدّادان من `makeCounter()` الرقم نفسه؟", en: "Why don't two counters from `makeCounter()` share the same number?" }, options: [{ ar: "لأن JavaScript تمسح المتغيرات كل ثانية", en: "Because JavaScript clears variables every second" }, { ar: "لأن كل استدعاء لـ `makeCounter()` يصنع `count` جديدًا تتذكره دالته", en: "Because each call to `makeCounter()` makes a fresh `count` that its function remembers" }, { ar: "لأن `count` معرّف بـ `const`", en: "Because `count` is declared with `const`" }], answer: 1 },
];
