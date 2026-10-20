import type { Challenge } from "./challenges";
import { printed } from "./check";
import type { Files, Lesson, Question } from "./types";

/**
 * JavaScript Phases 4–5: inheritance, asynchronous code (event loop, timers, promises),
 * errors with finally, ES modules, debounce/throttle, regular expressions, functional style,
 * clean code and a guided to-do app. One idea per lesson, checked by behavior.
 */

const c = (logs: string[], name: string, value: string | number | boolean) => printed(logs, `__c__ ${name} ${value}`);
/** Harness code runs in its own function, so its names never clash with the learner's. */
const iife = (code: string) => `(function () {\n${code}\n})();`;
const js = (files: Files) => files.js ?? "";
/** The learner's code without comments, so words in comments don't count. */
const codeOnly = (files: Files) => js(files).replace(/\/\*[\s\S]*?\*\//g, "").replace(/(^|[^:])\/\/.*$/gm, "$1");
/** The console lines that are one of `values`, in the order they were printed. */
const seq = (logs: string[], values: string[]) => {
  const wanted = values.map((v) => v.toLowerCase());
  return logs.map((l) => l.trim().toLowerCase()).filter((l) => wanted.includes(l));
};
/** True when `a` was printed before `b` (each compared leniently). */
const before = (logs: string[], a: string, b: string) => {
  const l = logs.map((x) => x.trim().toLowerCase());
  const i = l.indexOf(a.toLowerCase());
  const j = l.lastIndexOf(b.toLowerCase());
  return i >= 0 && j > i;
};
/** A list printed as `3,12,7`, `[3, 12, 7]` or `["3","12","7"]`. */
const list = (logs: string[], value: string) => logs.some((l) => l.replace(/[\s[\]"']/g, "") === value);

/* ------------------------------------------------------------------ Inheritance */

const ANIMAL =
  'class Animal {\n  constructor(name) {\n    this.name = name;\n  }\n\n  speak() {\n    return `${this.name} makes a sound`;\n  }\n\n  eat() {\n    return `${this.name} is eating`;\n  }\n}\n';

export const inheritance: Lesson = {
  slug: "inheritance",
  title: { ar: "الوراثة: extends و super", en: "Inheritance: extends and super" },
  body: [
    { icon: "🧬", ar: "أحيانًا يكون صنف **نوعًا خاصًا** من صنف آخر: الكلب حيوان. بدل نسخ الكود نكتب `class Dog extends Animal`، فيحصل `Dog` على كل خصائص ودوال `Animal` مجانًا.", en: "Sometimes a class is a **special kind** of another class: a dog is an animal. Instead of copying code we write `class Dog extends Animal`, and `Dog` gets all of `Animal`'s properties and methods for free." },
    { icon: "📞", ar: "إذا كتبت `constructor` في الصنف الابن فيجب أن تستدعي `super(name)` **أولًا**، قبل أي `this`. `super(...)` يشغّل `constructor` الأب ليجهّز الجزء المشترك، ثم تضيف أنت الجديد: `this.breed = breed;`.", en: "If you write a `constructor` in the child class you must call `super(name)` **first**, before any `this`. `super(...)` runs the parent's `constructor` to set up the shared part, then you add what's new: `this.breed = breed;`." },
    { icon: "🎁", ar: "دوال الأب تعمل على الابن مباشرة: إذا كان في `Animal` دالة `eat()` فإن `rex.eat()` تعمل حتى لو لم تكتبها في `Dog`.", en: "The parent's methods work on the child right away: if `Animal` has an `eat()` method, `rex.eat()` works even though you never wrote it in `Dog`." },
    { icon: "✍️", ar: "**التجاوز (override)**: إذا كتبت في الابن دالة بنفس اسم دالة الأب، تُستخدم نسخة الابن. هكذا يقول الكلب `barks` بدل `makes a sound`، بينما يبقى `Animal` كما هو.", en: "**Overriding**: if the child has a method with the same name as the parent's, the child's version is used. That's how a dog `barks` instead of `makes a sound`, while `Animal` stays the same." },
  ],
  example: {
    code: 'class Vehicle {\n  constructor(wheels) {\n    this.wheels = wheels;\n  }\n\n  describe() {\n    return `I have ${this.wheels} wheels`;\n  }\n}\n\nclass Bike extends Vehicle {\n  constructor(color) {\n    super(2);          // runs Vehicle\'s constructor\n    this.color = color;\n  }\n\n  ring() {\n    return "Ring ring!";\n  }\n}\n\nconst bike = new Bike("red");\nconsole.log(bike.describe()); // I have 2 wheels (from Vehicle)\nconsole.log(bike.ring());     // Ring ring!\nconsole.log(bike.color);      // red',
    note: { ar: "`Bike` ورث `describe` من `Vehicle` وأضاف `ring` و `color`.", en: "`Bike` inherited `describe` from `Vehicle` and added `ring` and `color`." },
    lang: "js",
  },
  files: ["js"],
  starter: { js: `${ANIMAL}\n// 1) Write class Dog that extends Animal, with constructor(name, breed)\n\n// 2) Make a Dog and print its eat()\n\n// 3) Give Dog its own speak()\n` },
  solution: {
    js: `${ANIMAL}\nclass Dog extends Animal {\n  constructor(name, breed) {\n    super(name);\n    this.breed = breed;\n  }\n\n  speak() {\n    return \`\${this.name} barks\`;\n  }\n}\n\nconst rex = new Dog("Rex", "Husky");\nconsole.log(rex.eat());\nconsole.log(rex.speak());\n`,
  },
  harness: iife(
    'try { var __d = new Dog("Max", "Pug"); console.log("__c__ dog " + __d.name + " " + __d.breed + " " + (__d instanceof Animal)); } catch (e) { console.log("__c__ dog missing"); }\ntry { console.log("__c__ speak " + new Dog("Max", "Pug").speak()); } catch (e) { console.log("__c__ speak missing"); }\ntry { console.log("__c__ parent " + new Animal("Cat").speak()); } catch (e) { console.log("__c__ parent missing"); }'),
  tasks: [
    { id: "extends", label: { ar: "اكتب `class Dog extends Animal` فيه `constructor(name, breed)` يستدعي `super(name)` ثم يحفظ `this.breed`", en: "Write `class Dog extends Animal` with a `constructor(name, breed)` that calls `super(name)`, then saves `this.breed`" }, test: ({ logs }) => c(logs, "dog", "Max Pug true") },
    { id: "inherit", label: { ar: 'اصنع كلبًا `new Dog("Rex", "Husky")` واطبع `eat()` الموروثة (تظهر `Rex is eating`)', en: 'Make a dog with `new Dog("Rex", "Husky")` and print its inherited `eat()` (it shows `Rex is eating`)' }, test: ({ files, logs }) => /new\s+Dog\s*\(/.test(js(files)) && printed(logs, "Rex is eating") && c(logs, "dog", "Max Pug true") },
    { id: "override", label: { ar: "تجاوز `speak()` في `Dog` لتُرجع الاسم ثم `barks` (مثل `Max barks`)، دون تغيير `Animal`", en: "Override `speak()` in `Dog` so it returns the name, then `barks` (like `Max barks`), without changing `Animal`" }, test: ({ logs }) => c(logs, "speak", "Max barks") && c(logs, "parent", "Cat makes a sound") },
  ],
  hints: [
    { ar: "`class Dog extends Animal { constructor(name, breed) { super(name); this.breed = breed; } }`", en: "`class Dog extends Animal { constructor(name, breed) { super(name); this.breed = breed; } }`" },
    { ar: 'داخل `Dog` أضف `` speak() { return `${this.name} barks`; } `` ثم `const rex = new Dog("Rex", "Husky"); console.log(rex.eat());`', en: 'Inside `Dog` add `` speak() { return `${this.name} barks`; } ``, then `const rex = new Dog("Rex", "Husky"); console.log(rex.eat());`' },
  ],
  deep: {
    more: [
      { icon: "🔗", ar: "تستطيع استدعاء نسخة الأب من داخل التجاوز بـ `super.speak()`، مثلًا لتضيف شيئًا إلى نتيجتها بدل كتابتها من جديد.", en: "Inside an override you can still call the parent's version with `super.speak()`, for example to add to its result instead of rewriting it." },
      { icon: "🧪", ar: "`rex instanceof Animal` تعطي `true`: الكلب كلب وحيوان في الوقت نفسه.", en: "`rex instanceof Animal` gives `true`: the dog is both a Dog and an Animal." },
      { icon: "⚖️", ar: "لا تبالغ في الوراثة: سلسلة طويلة (أ يرث ب يرث ج…) صعبة الفهم. استخدمها فقط عندما يكون الابن «نوعًا من» الأب فعلًا.", en: "Don't overdo inheritance: a long chain (A extends B extends C…) is hard to follow. Use it only when the child really \"is a kind of\" the parent." },
    ],
    mistakes: [
      { ar: "استخدام `this` قبل `super(...)` في `constructor` الابن ← خطأ `ReferenceError`. استدعِ `super` أولًا.", en: "Using `this` before `super(...)` in the child's `constructor` → a `ReferenceError`. Call `super` first." },
      { ar: "نسيان تمرير الاسم: `super()` بدون `name` ← يصبح `this.name` بقيمة `undefined`.", en: "Forgetting to pass the name: `super()` without `name` → `this.name` becomes `undefined`." },
      { ar: "كتابة `class Dog extend Animal` أو `inherits` ← الكلمة الصحيحة `extends` بحرف s.", en: "Writing `class Dog extend Animal` or `inherits` → the right keyword is `extends`, with an s." },
    ],
  },
  xp: 30,
};

/* ------------------------------------------------------------------ Async intro */

export const asyncIntro: Lesson = {
  slug: "async-intro",
  title: { ar: "متزامن وغير متزامن: حلقة الأحداث", en: "Sync and async: the event loop" },
  body: [
    { icon: "📜", ar: "حتى الآن كان الكود **متزامنًا (sync)**: سطر بعد سطر من الأعلى للأسفل، ولا يبدأ سطر حتى ينتهي الذي قبله.", en: "So far your code has been **synchronous (sync)**: line after line from top to bottom, and a line doesn't start until the one before it is done." },
    { icon: "⏳", ar: "بعض الأعمال تأخذ وقتًا: مؤقت، أو تحميل من الإنترنت. JavaScript **لا تنتظرها**؛ تسجّلها لوقت لاحق وتكمل باقي الكود. هذا هو الكود **غير المتزامن (async)**. مثال: `setTimeout(() => { … }, 1000)` يشغّل الدالة بعد 1000 ملي ثانية (ثانية واحدة).", en: "Some jobs take time: a timer, or loading from the internet. JavaScript **doesn't wait** for them; it notes them for later and carries on with the rest. That's **asynchronous (async)** code. Example: `setTimeout(() => { … }, 1000)` runs the function after 1000 milliseconds (one second)." },
    { icon: "🥞", ar: "**مكدس الاستدعاءات (call stack)** هو قائمة ما يعمل الآن. والدوال المؤجلة تنتظر في **طابور**. و**حلقة الأحداث (event loop)** تراقب: عندما يفرغ المكدس، تأخذ أول دالة من الطابور وتشغّلها.", en: "The **call stack** is the list of what's running right now. Delayed functions wait in a **queue**. The **event loop** keeps watch: when the stack is empty, it takes the first function from the queue and runs it." },
    { icon: "0️⃣", ar: "لذلك `setTimeout(fn, 0)` لا تعمل فورًا! حتى مع 0 ملي ثانية تذهب `fn` إلى الطابور، فتعمل **بعد** انتهاء كل الأسطر المتزامنة.", en: "That's why `setTimeout(fn, 0)` does not run right away! Even with 0 ms, `fn` goes to the queue, so it runs **after** every synchronous line has finished." },
  ],
  example: {
    code: 'console.log("Start");\n\nsetTimeout(() => {\n  console.log("Timer");\n}, 0);\n\nconsole.log("End");\n\n// Prints: Start, End, Timer',
    note: { ar: "`Timer` مكتوب في الوسط لكنه يُطبع أخيرًا.", en: "`Timer` is written in the middle but printed last." },
    lang: "js",
  },
  files: ["js"],
  starter: { js: '// 1) Print "1"\n// 2) Schedule "3" with setTimeout and 0 ms\n// 3) Print "2"\n\n\n// 4) Write a function sayHi() that prints "Hi",\n//    then pass it to setTimeout with 0 ms\n' },
  solution: {
    js: 'console.log("1");\n\nsetTimeout(() => {\n  console.log("3");\n}, 0);\n\nconsole.log("2");\n\nfunction sayHi() {\n  console.log("Hi");\n}\n\nsetTimeout(sayHi, 0);\n',
  },
  settle: 400,
  tasks: [
    {
      id: "order",
      label: { ar: 'اطبع `1`، ثم جدول طباعة `3` بـ `setTimeout` و 0، ثم اطبع `2` (يظهر 1 ثم 2 ثم 3)', en: 'Print `1`, then schedule printing `3` with `setTimeout` and 0, then print `2` (it shows 1, 2, 3)' },
      test: ({ files, logs }) => {
        const code = codeOnly(files);
        const three = code.search(/console\.log\(\s*(["'`]?)3\1\s*\)/);
        const two = code.search(/console\.log\(\s*(["'`]?)2\1\s*\)/);
        return /setTimeout\s*\(/.test(code) && three >= 0 && two > three && seq(logs, ["1", "2", "3"]).join(",") === "1,2,3";
      },
    },
    { id: "pass", label: { ar: "اكتب دالة `sayHi()` تطبع `Hi` ومرّرها باسمها إلى `setTimeout` بـ 0 (بدون أقواس بعد الاسم)", en: "Write a function `sayHi()` that prints `Hi` and pass it by name to `setTimeout` with 0 (no parentheses after the name)" }, test: ({ files, logs }) => /setTimeout\(\s*[A-Za-z_$][\w$]*\s*,/.test(codeOnly(files)) && before(logs, "2", "Hi") },
  ],
  hints: [
    { ar: 'الترتيب في الكود: `console.log("1");` ثم `setTimeout(() => { console.log("3"); }, 0);` ثم `console.log("2");`', en: 'The order in the code: `console.log("1");` then `setTimeout(() => { console.log("3"); }, 0);` then `console.log("2");`' },
    { ar: '`function sayHi() { console.log("Hi"); }` ثم `setTimeout(sayHi, 0);`', en: '`function sayHi() { console.log("Hi"); }` then `setTimeout(sayHi, 0);`' },
  ],
  deep: {
    more: [
      { icon: "🍽️", ar: "تخيّل نادلًا واحدًا: يأخذ طلبك ويذهب لطاولة أخرى بدل الوقوف أمام المطبخ. عندما يجهز الطبق يعود إليك. هكذا تبقى الصفحة سريعة مع خيط تنفيذ واحد.", en: "Picture a single waiter: they take your order and serve other tables instead of standing at the kitchen. When the dish is ready, they come back. That's how a page stays responsive with a single thread." },
      { icon: "🧊", ar: "حلقة طويلة جدًا متزامنة تجمّد الصفحة: لا أزرار ولا مؤقتات حتى تنتهي، لأن المكدس لا يفرغ.", en: "A very long synchronous loop freezes the page: no buttons and no timers until it ends, because the stack never empties." },
      { icon: "🔜", ar: "الأحداث (النقرات) والمؤقتات وطلبات الإنترنت كلها تمر بنفس الطابور. في الدروس القادمة: المؤقتات بالتفصيل ثم الـ Promises.", en: "Events (clicks), timers and network requests all go through the same queue. Coming next: timers in detail, then Promises." },
    ],
    mistakes: [
      { ar: "الظن أن `setTimeout(fn, 0)` تعمل قبل السطر التالي ← تعمل بعد انتهاء كل الكود المتزامن.", en: "Thinking `setTimeout(fn, 0)` runs before the next line → it runs after all the synchronous code." },
      { ar: "`setTimeout(sayHi(), 0)` بأقواس ← تُنفَّذ الدالة فورًا ويُمرَّر ناتجها. مرّر الدالة نفسها: `setTimeout(sayHi, 0)`.", en: "`setTimeout(sayHi(), 0)` with parentheses → the function runs right away and its result is passed. Pass the function itself: `setTimeout(sayHi, 0)`." },
      { ar: "الظن أن الرقم بالثواني ← `1000` ملي ثانية = ثانية واحدة.", en: "Thinking the number is in seconds → `1000` milliseconds = one second." },
    ],
  },
  xp: 25,
};

/* ------------------------------------------------------------------ Timers */

export const timers: Lesson = {
  slug: "timers",
  title: { ar: "المؤقتات: setTimeout و setInterval", en: "Timers: setTimeout and setInterval" },
  body: [
    { icon: "⏲️", ar: "`setTimeout(fn, 500)` يشغّل `fn` **مرة واحدة** بعد 500 ملي ثانية. ويُرجع **رقمًا** يميّز المؤقت: `const id = setTimeout(…)`.", en: "`setTimeout(fn, 500)` runs `fn` **once** after 500 milliseconds. It returns a **number** that identifies the timer: `const id = setTimeout(…)`." },
    { icon: "🛑", ar: "غيّرت رأيك قبل أن يحين الوقت؟ `clearTimeout(id)` يلغي المؤقت فلا تعمل الدالة أبدًا.", en: "Changed your mind before it fires? `clearTimeout(id)` cancels the timer, so the function never runs." },
    { icon: "🔁", ar: "`setInterval(fn, 100)` يشغّل `fn` **كل** 100 ملي ثانية بلا توقف، ويُرجع رقمًا أيضًا.", en: "`setInterval(fn, 100)` runs `fn` **every** 100 milliseconds without stopping, and also returns a number." },
    { icon: "✋", ar: "لإيقافه: `clearInterval(id)`. غالبًا توقفه من داخله عند شرط: `if (n === 0) clearInterval(id);`.", en: "To stop it: `clearInterval(id)`. You often stop it from inside, on a condition: `if (n === 0) clearInterval(id);`." },
  ],
  example: {
    code: 'let n = 1;\nconst id = setInterval(() => {\n  console.log("Tick", n);\n  if (n === 3) clearInterval(id);\n  n++;\n}, 200);\n\nconst alarm = setTimeout(() => {\n  console.log("Wake up!");\n}, 1000);\nclearTimeout(alarm); // cancelled: never prints',
    note: { ar: "ثلاث نبضات ثم يتوقف، والمنبه أُلغي قبل أن يرن.", en: "Three ticks then it stops, and the alarm is cancelled before it rings." },
    lang: "js",
  },
  files: ["js"],
  starter: { js: '// A timer that should NOT go off\nconst bomb = setTimeout(() => {\n  console.log("Boom");\n}, 300);\n\n// 1) Cancel the bomb with clearTimeout\n\n// 2) Countdown: print 3, 2, 1, 0 with setInterval every 100 ms\n\n// 3) Print "Go!" after 600 ms with setTimeout\n' },
  solution: {
    js: '// A timer that should NOT go off\nconst bomb = setTimeout(() => {\n  console.log("Boom");\n}, 300);\n\nclearTimeout(bomb);\n\nlet count = 3;\nconst id = setInterval(() => {\n  console.log(count);\n  if (count === 0) clearInterval(id);\n  count--;\n}, 100);\n\nsetTimeout(() => {\n  console.log("Go!");\n}, 600);\n',
  },
  settle: 1100,
  tasks: [
    { id: "cancel", label: { ar: "ألغِ مؤقت `bomb` بـ `clearTimeout` حتى لا تُطبع `Boom`", en: "Cancel the `bomb` timer with `clearTimeout` so `Boom` never prints" }, test: ({ files, logs }) => /clearTimeout\(/.test(codeOnly(files)) && /Boom/.test(js(files)) && !printed(logs, "Boom") },
    { id: "count", label: { ar: "بـ `setInterval` اطبع `3` ثم `2` ثم `1` ثم `0`، رقمًا كل 100 ملي ثانية", en: "With `setInterval`, print `3`, `2`, `1`, `0`, one number every 100 ms" }, test: ({ files, logs }) => /setInterval\(/.test(codeOnly(files)) && logs.filter((l) => /^-?\d+$/.test(l.trim())).slice(0, 4).map((l) => l.trim()).join(",") === "3,2,1,0" },
    { id: "stop", label: { ar: "أوقف العدّ بـ `clearInterval` عند `0` (لا يُطبع شيء بعده)", en: "Stop the countdown with `clearInterval` at `0` (nothing prints after it)" }, test: ({ files, logs }) => /clearInterval\(/.test(codeOnly(files)) && logs.filter((l) => /^-?\d+$/.test(l.trim())).map((l) => l.trim()).join(",") === "3,2,1,0" },
    { id: "go", label: { ar: "بـ `setTimeout` اطبع `Go!` بعد 600 ملي ثانية", en: "With `setTimeout`, print `Go!` after 600 ms" }, test: ({ files, logs }) => (codeOnly(files).match(/setTimeout\(/g) ?? []).length >= 2 && printed(logs, "Go!") },
  ],
  hints: [
    { ar: "`clearTimeout(bomb);` — وللعدّ: `let count = 3; const id = setInterval(() => { … }, 100);`", en: "`clearTimeout(bomb);` — for the countdown: `let count = 3; const id = setInterval(() => { … }, 100);`" },
    { ar: 'داخل المؤقت: `console.log(count); if (count === 0) clearInterval(id); count--;` ثم `setTimeout(() => { console.log("Go!"); }, 600);`', en: 'Inside the interval: `console.log(count); if (count === 0) clearInterval(id); count--;` then `setTimeout(() => { console.log("Go!"); }, 600);`' },
  ],
  deep: {
    more: [
      { icon: "🎯", ar: "الوقت **أقل حد** وليس موعدًا دقيقًا: إذا كان المكدس مشغولًا تتأخر الدالة قليلًا، كما رأيت في درس حلقة الأحداث.", en: "The delay is a **minimum**, not an exact time: if the stack is busy, the function runs a bit late, as you saw in the event loop lesson." },
      { icon: "📨", ar: "تستطيع تمرير قيم للدالة بعد الوقت: `setTimeout(greet, 500, \"Sara\")` يستدعي `greet(\"Sara\")`.", en: "You can pass values to the function after the delay: `setTimeout(greet, 500, \"Sara\")` calls `greet(\"Sara\")`." },
      { icon: "🔋", ar: "المتصفح يبطئ المؤقتات في التبويبات المخفية لتوفير البطارية، فلا تعتمد عليها لقياس الوقت بدقة؛ استخدم `Date.now()` لذلك.", en: "Browsers slow timers down in hidden tabs to save battery, so don't rely on them to measure time exactly; use `Date.now()` for that." },
    ],
    mistakes: [
      { ar: "نسيان `clearInterval` ← المؤقت يعمل للأبد ويطبع -1 و -2…", en: "Forgetting `clearInterval` → the timer runs forever and prints -1, -2…" },
      { ar: "`clearInterval(setInterval)` أو بدون رقم ← مرّر الرقم المحفوظ: `clearInterval(id)`.", en: "`clearInterval(setInterval)` or no id at all → pass the saved number: `clearInterval(id)`." },
      { ar: "تعريف العدّاد داخل دالة المؤقت `let count = 3` ← يبدأ من 3 في كل مرة. عرّفه خارجها.", en: "Declaring the counter inside the timer function `let count = 3` → it starts at 3 every time. Declare it outside." },
    ],
  },
  xp: 30,
};

/* ------------------------------------------------------------------ Promises */

export const promises: Lesson = {
  slug: "promises",
  title: { ar: "الوعود: Promise و then و catch", en: "Promises: then, catch and finally" },
  body: [
    { icon: "🤝", ar: "**الوعد (Promise)** كائن يمثّل نتيجة ستصل **لاحقًا**: إما أن يُنجَز بقيمة، أو يُرفض بخطأ. تصنعه بـ `new Promise((resolve, reject) => { … })`: استدعِ `resolve(value)` عند النجاح، و `reject(error)` عند الفشل.", en: "A **Promise** is an object for a result that arrives **later**: it either succeeds with a value or fails with an error. Make one with `new Promise((resolve, reject) => { … })`: call `resolve(value)` on success and `reject(error)` on failure." },
    { icon: "✅", ar: "`.then((value) => { … })` تعمل عند النجاح وتستلم القيمة. و `.catch((error) => { … })` تعمل عند الرفض. و `.finally(() => { … })` تعمل **في الحالتين**، مثل إخفاء رسالة «جارٍ التحميل».", en: "`.then((value) => { … })` runs on success and receives the value. `.catch((error) => { … })` runs on failure. `.finally(() => { … })` runs **either way**, like hiding a \"Loading…\" message." },
    { icon: "⛓️", ar: "**السلسلة**: ما تُرجعه `return` داخل `.then` يصل إلى `.then` التالية. هكذا تكتب خطوات متتابعة: `.then((n) => n * 2).then((n) => console.log(n))`.", en: "**Chaining**: whatever you `return` inside a `.then` reaches the next `.then`. That's how you write steps in a row: `.then((n) => n * 2).then((n) => console.log(n))`." },
    { icon: "⚡", ar: "اختصار لوعد ناجح فورًا: `Promise.resolve(2)`. وكما في درس حلقة الأحداث، دوال `.then` تعمل دائمًا **بعد** الكود المتزامن.", en: "A shortcut for a promise that succeeds right away: `Promise.resolve(2)`. And as in the event loop lesson, `.then` functions always run **after** the synchronous code." },
  ],
  example: {
    code: 'function wait(ms) {\n  return new Promise((resolve) => {\n    setTimeout(() => resolve(`waited ${ms} ms`), ms);\n  });\n}\n\nwait(300)\n  .then((text) => {\n    console.log(text);       // waited 300 ms\n    return text.length;\n  })\n  .then((n) => console.log(n)) // 14\n  .catch((error) => console.log(error))\n  .finally(() => console.log("Finished"));',
    note: { ar: "وعد ينتظر، ثم سلسلة `then`، ثم `finally`.", en: "A promise that waits, then a `then` chain, then `finally`." },
    lang: "js",
  },
  modern: {
    old: 'loadUser(1, function (user) {\n  loadPosts(user, function (posts) {\n    show(posts, function () { … });\n  });\n});',
    now: "loadUser(1)\n  .then((user) => loadPosts(user))\n  .then((posts) => show(posts))\n  .catch((error) => console.log(error));",
    text: { ar: "قبل الوعود كانت الدوال تتداخل داخل بعضها (callback hell). الوعود تجعل الخطوات سطرًا تحت سطر مع `catch` واحدة للأخطاء.", en: "Before promises, callbacks nested inside each other (callback hell). Promises line the steps up, with one `catch` for errors." },
    since: "ES2015",
  },
  files: ["js"],
  starter: { js: '// 1) Write checkAge(age): it returns a new Promise that\n//    resolves with "Welcome" when age >= 18,\n//    otherwise rejects with "Too young"\n\n\n// 2) checkAge(20): print the value with .then\n\n// 3) checkAge(12): print the error with .catch, and "Checked" with .finally\n\n// 4) Promise.resolve(2): a .then that returns n * 10, then a .then that prints it\n' },
  solution: {
    js: 'function checkAge(age) {\n  return new Promise((resolve, reject) => {\n    if (age >= 18) resolve("Welcome");\n    else reject("Too young");\n  });\n}\n\ncheckAge(20).then((message) => console.log(message));\n\ncheckAge(12)\n  .catch((error) => console.log(error))\n  .finally(() => console.log("Checked"));\n\nPromise.resolve(2)\n  .then((n) => n * 10)\n  .then((n) => console.log(n));\n',
  },
  harness: iife(
    'try { var __a = checkAge(20); console.log("__c__ isPromise " + (__a instanceof Promise)); __a.then(function (v) { console.log("__c__ yes " + v); }, function () { console.log("__c__ yes rejected"); }); checkAge(10).then(function (v) { console.log("__c__ no resolved " + v); }, function (e) { console.log("__c__ no " + (e && e.message ? e.message : e)); }); } catch (e) { console.log("__c__ isPromise missing"); }'),
  settle: 500,
  tasks: [
    { id: "make", label: { ar: 'اكتب دالة `checkAge(age)` تُرجع `new Promise`: تُنجَز بـ `"Welcome"` إذا كان العمر 18 أو أكثر، وإلا تُرفض بـ `"Too young"`', en: 'Write a function `checkAge(age)` that returns a `new Promise`: it resolves with `"Welcome"` when age is 18 or more, otherwise it rejects with `"Too young"`' }, test: ({ logs }) => c(logs, "isPromise", true) && c(logs, "yes", "Welcome") && c(logs, "no", "Too young") },
    { id: "then", label: { ar: "استدعِ `checkAge(20)` واطبع القيمة بـ `.then` (تظهر `Welcome`)", en: "Call `checkAge(20)` and print the value with `.then` (it shows `Welcome`)" }, test: ({ files, logs }) => /\.then\(/.test(codeOnly(files)) && printed(logs, "Welcome") },
    { id: "catch", label: { ar: "استدعِ `checkAge(12)`: اطبع الخطأ بـ `.catch` (`Too young`)، واطبع `Checked` بـ `.finally`", en: "Call `checkAge(12)`: print the error with `.catch` (`Too young`), and print `Checked` with `.finally`" }, test: ({ files, logs }) => /\.catch\(/.test(codeOnly(files)) && /\.finally\(/.test(codeOnly(files)) && printed(logs, "Too young") && printed(logs, "Checked") },
    { id: "chain", label: { ar: "سلسلة: `Promise.resolve(2)` ثم `.then` تُرجع `n * 10` ثم `.then` تطبعه (يظهر `20`)", en: "A chain: `Promise.resolve(2)`, then a `.then` that returns `n * 10`, then a `.then` that prints it (it shows `20`)" }, test: ({ files, logs }) => /Promise\.resolve\(/.test(codeOnly(files)) && (codeOnly(files).match(/\.then\(/g) ?? []).length >= 3 && printed(logs, "20") },
  ],
  hints: [
    { ar: '`return new Promise((resolve, reject) => { if (age >= 18) resolve("Welcome"); else reject("Too young"); });`', en: '`return new Promise((resolve, reject) => { if (age >= 18) resolve("Welcome"); else reject("Too young"); });`' },
    { ar: '`checkAge(12).catch((error) => console.log(error)).finally(() => console.log("Checked"));` و `Promise.resolve(2).then((n) => n * 10).then((n) => console.log(n));`', en: '`checkAge(12).catch((error) => console.log(error)).finally(() => console.log("Checked"));` and `Promise.resolve(2).then((n) => n * 10).then((n) => console.log(n));`' },
  ],
  deep: {
    more: [
      { icon: "🚦", ar: "للوعد ثلاث حالات: **pending** (ينتظر)، ثم **fulfilled** (نجح) أو **rejected** (رُفض). بعد أن يستقر لا تتغير حالته أبدًا.", en: "A promise has three states: **pending** (waiting), then **fulfilled** (succeeded) or **rejected** (failed). Once it settles, its state never changes again." },
      { icon: "🪢", ar: "`Promise.all([p1, p2])` ينتظر عدة وعود معًا ويعطيك مصفوفة نتائجها، ويُرفض إذا فشل أحدها.", en: "`Promise.all([p1, p2])` waits for several promises together and gives you an array of their results; it rejects if any one fails." },
      { icon: "✨", ar: "في الدرس القادم: `async` و `await`، طريقة أبسط لكتابة نفس الوعود كأنها كود عادي سطرًا بعد سطر.", en: "Next lesson: `async` and `await`, a simpler way to write the same promises as if they were normal line-by-line code." },
    ],
    mistakes: [
      { ar: "نسيان `return` داخل `.then` ذات الأقواس `{ }` ← تستلم `.then` التالية `undefined`.", en: "Forgetting `return` inside a `.then` with `{ }` braces → the next `.then` receives `undefined`." },
      { ar: "نسيان `return` قبل `new Promise` في الدالة ← تُرجع الدالة `undefined` فلا يمكن استدعاء `.then` عليها.", en: "Forgetting `return` before `new Promise` in the function → it returns `undefined`, so you can't call `.then` on it." },
      { ar: "عدم كتابة `.catch` ← خطأ الرفض يظهر كـ «Uncaught (in promise)» ولا تتعامل معه.", en: "Leaving out `.catch` → the rejection shows up as \"Uncaught (in promise)\" and nothing handles it." },
    ],
  },
  xp: 35,
};

/* ------------------------------------------------------------------ Errors (try / catch / finally) */

export const errors: Lesson = {
  slug: "errors",
  title: { ar: "التعامل مع الأخطاء: try و catch و finally", en: "Handling errors: try, catch and finally" },
  body: [
    { icon: "💥", ar: "الأخطاء تحدث: بيانات تالفة، شبكة مقطوعة. إذا لم تتعامل معها يتوقف البرنامج كله عند الخطأ، ولا يُنفَّذ ما بعده.", en: "Errors happen: broken data, no network. Unhandled, the whole program stops at the error and nothing after it runs." },
    { icon: "🥅", ar: "`try { … } catch (error) { … }` يجرّب الكود داخل `try`، فإن حدث خطأ ينتقل إلى `catch` بدل أن يتوقف، ثم يكمل البرنامج بعدها. ونص الخطأ في `error.message`.", en: "`try { … } catch (error) { … }` tries the code inside `try`; if it fails, it jumps to `catch` instead of stopping, and the program carries on after it. The error's text is in `error.message`." },
    { icon: "📄", ar: "تذكّر `JSON.parse(text)` من درس JSON: يحوّل النص إلى كائن. إذا كان النص ناقصًا أو تالفًا **يرمي خطأ**، وهذا ما سنلتقطه.", en: "Remember `JSON.parse(text)` from the JSON lesson: it turns text into an object. If the text is incomplete or broken it **throws an error**, and that's what we'll catch." },
    { icon: "🧹", ar: "`finally { … }` بعد `catch` يعمل **دائمًا**: نجح `try` أو فشل. مكانه المثالي للتنظيف، مثل إخفاء «جارٍ التحميل» أو كتابة `Done`.", en: "`finally { … }` after `catch` runs **always**, whether `try` worked or failed. It's the place for cleanup, like hiding \"Loading…\" or printing `Done`." },
  ],
  example: {
    code: 'const good = \'{"city": "Tunis"}\';\n\ntry {\n  const data = JSON.parse(good);\n  console.log(data.city);\n} catch (error) {\n  console.log("Could not read it");\n} finally {\n  console.log("Finished reading");\n}\n\nconsole.log("Still running");',
    note: { ar: "بنص سليم يعمل `try` كاملًا ثم `finally`. احذف `}` من النص لترى `catch` ثم `finally`.", en: "With good text, `try` runs fully, then `finally`. Delete the `}` from the text to see `catch`, then `finally`." },
    lang: "js",
  },
  files: ["js"],
  starter: { js: 'const text = \'{"name": "Sara"\'; // the closing } is missing\n\n' },
  solution: {
    js: 'const text = \'{"name": "Sara"\'; // the closing } is missing\n\ntry {\n  const user = JSON.parse(text);\n  console.log(user.name);\n} catch (error) {\n  console.log("Bad data");\n} finally {\n  console.log("Done");\n}\n\nconsole.log("Still running");\n',
  },
  // Runs the code again with good JSON, to check that finally runs then too.
  variants: { find: "(\\b(?:const|let|var)\\s+text\\s*=\\s*)[^;\\n]+", values: ['\'{"name": "Sara"}\''] },
  tasks: [
    { id: "try", label: { ar: "ضع `JSON.parse(text)` داخل `try` ومعه `catch`", en: "Put `JSON.parse(text)` inside `try`, with a `catch`" }, test: ({ files }) => /try\s*\{[^}]*JSON\.parse\(\s*text\s*\)/.test(codeOnly(files)) && /catch\s*(\(|\{)/.test(codeOnly(files)) },
    { id: "catch", label: { ar: "في `catch` اطبع `Bad data`", en: "In `catch`, print `Bad data`" }, test: ({ logs }) => printed(logs, "Bad data") },
    { id: "finally", label: { ar: "أضف `finally` يطبع `Done` (يعمل حتى لو كان النص سليمًا)", en: "Add a `finally` that prints `Done` (it runs even when the text is fine)" }, test: ({ files, logs, runs }) => /finally\s*\{/.test(codeOnly(files)) && before(logs, "Bad data", "Done") && printed(runs[0] ?? [], "Done") && !printed(runs[0] ?? [], "Bad data") },
    { id: "after", label: { ar: "بعد الكتلة كلها اطبع `Still running` لترى أن البرنامج أكمل", en: "After the whole block, print `Still running` to see the program carry on" }, test: ({ logs }) => before(logs, "Bad data", "Still running") && (!printed(logs, "Done") || before(logs, "Done", "Still running")) },
  ],
  hints: [
    { ar: "`try { const user = JSON.parse(text); console.log(user.name); } catch (error) { … }`", en: "`try { const user = JSON.parse(text); console.log(user.name); } catch (error) { … }`" },
    { ar: '`catch (error) { console.log("Bad data"); } finally { console.log("Done"); }` ثم بعدها `console.log("Still running");`', en: '`catch (error) { console.log("Bad data"); } finally { console.log("Done"); }` then after it `console.log("Still running");`' },
  ],
  deep: {
    more: [
      { icon: "🔍", ar: "اطبع `error.message` داخل `catch` لترى سبب الخطأ بالضبط، مثل `Expected ',' or '}'`.", en: "Print `error.message` inside `catch` to see exactly what went wrong, like `Expected ',' or '}'`." },
      { icon: "🎯", ar: "ضع داخل `try` الأسطر التي قد تفشل فقط، لا البرنامج كله؛ هكذا تعرف مصدر الخطأ.", en: "Put only the lines that might fail inside `try`, not the whole program; that way you know where the error came from." },
      { icon: "🌐", ar: "نفس الفكرة مع الوعود: `.catch` و `.finally`، ومع `await` تستخدم `try/catch/finally` نفسها.", en: "Same idea with promises: `.catch` and `.finally`; with `await` you use this very `try/catch/finally`." },
    ],
    mistakes: [
      { ar: "`catch` فارغة لا تفعل شيئًا ← الخطأ يختفي ولن تعرف أنه حدث. اطبع رسالة على الأقل.", en: "An empty `catch` that does nothing → the error vanishes and you never learn it happened. At least print a message." },
      { ar: "وضع كود التنظيف في `try` فقط ← لا يعمل عند الخطأ. ضعه في `finally`.", en: "Putting cleanup code only in `try` → it doesn't run when there's an error. Put it in `finally`." },
      { ar: "`try` وحدها بدون `catch` أو `finally` ← خطأ في الكتابة (SyntaxError).", en: "`try` on its own, without `catch` or `finally` → a SyntaxError." },
    ],
  },
  xp: 30,
};

/* ------------------------------------------------------------------ ES modules (reading) */

export const esModules: Lesson = {
  slug: "es-modules",
  title: { ar: "الوحدات: import و export", en: "ES modules: import and export" },
  body: [
    { icon: "📦", ar: "عندما يكبر المشروع تقسّمه إلى ملفات. **الوحدة (module)** ملف JavaScript له نطاقه الخاص: متغيراته لا تصبح عامة (global) ولا تتصادم مع ملفات أخرى. وأنت تختار ما تشاركه بـ `export`.", en: "As a project grows, you split it into files. A **module** is a JavaScript file with its own scope: its variables don't become globals and don't clash with other files. You choose what to share with `export`." },
    { icon: "📤", ar: "**التصدير المسمّى**: `export const PI = 3.14;` و `export function add(a, b) { … }`. وتستورده بين أقواس معقوفة وبنفس الاسم: `import { add, PI } from \"./math.js\";`.", en: "**Named exports**: `export const PI = 3.14;` and `export function add(a, b) { … }`. You import them inside braces, with the same names: `import { add, PI } from \"./math.js\";`." },
    { icon: "⭐", ar: "**التصدير الافتراضي**: شيء رئيسي واحد في الملف: `export default function greet() { … }`. وتستورده **بدون** أقواس وبأي اسم: `import greet from \"./greet.js\";`.", en: "**Default export**: one main thing per file: `export default function greet() { … }`. You import it **without** braces, under any name: `import greet from \"./greet.js\";`." },
    { icon: "🌐", ar: "في المتصفح: `<script type=\"module\" src=\"main.js\"></script>`. الوحدات تحتاج خادمًا (لا تعمل بفتح الملف مباشرة) ولا تعمل هنا في Code Master لأنها تحتاج عدة ملفات، لذلك هذا درس قراءة.", en: "In the browser: `<script type=\"module\" src=\"main.js\"></script>`. Modules need a server (opening the file directly won't work), and they can't run here in Code Master because they need several files, so this is a reading lesson." },
  ],
  example: {
    code: '// math.js\nexport const PI = 3.14;\n\nexport function add(a, b) {\n  return a + b;\n}\n\nexport default function square(n) {\n  return n * n;\n}\n\n// main.js\nimport square, { add, PI } from "./math.js";\n\nconsole.log(add(2, 3)); // 5\nconsole.log(square(4)); // 16\nconsole.log(PI);        // 3.14\n\n<!-- index.html -->\n<script type="module" src="main.js"></script>',
    note: { ar: "ملف يصدّر، وملف يستورد، وصفحة تحمّل الوحدة.", en: "One file exports, one imports, and the page loads the module." },
    lang: "none",
  },
  deep: {
    more: [
      { icon: "🔤", ar: "تستطيع تغيير الاسم عند الاستيراد: `import { add as plus } from \"./math.js\";`.", en: "You can rename on import: `import { add as plus } from \"./math.js\";`." },
      { icon: "🧰", ar: "أدوات مثل **Vite** تجمع الوحدات وتشغّل خادمًا محليًا بأمر واحد، وتستورد منها مكتبات npm مثل `import confetti from \"canvas-confetti\";`.", en: "Tools like **Vite** bundle modules and run a local server with one command, and let you import npm libraries like `import confetti from \"canvas-confetti\";`." },
      { icon: "🕰️", ar: "النظام القديم في Node كان `require(\"./math\")` و `module.exports`. اليوم الوحدات (ESM) هي المعيار في المتصفح و Node معًا.", en: "Node's old system was `require(\"./math\")` and `module.exports`. Today ES modules (ESM) are the standard in both the browser and Node." },
    ],
    mistakes: [
      { ar: "نسيان `type=\"module\"` في وسم `<script>` ← المتصفح يرفض `import` بخطأ.", en: "Forgetting `type=\"module\"` on the `<script>` tag → the browser rejects `import` with an error." },
      { ar: "استيراد تصدير مسمّى بدون أقواس `import add from …` ← تحصل على التصدير الافتراضي لا على `add`.", en: "Importing a named export without braces, `import add from …` → you get the default export, not `add`." },
      { ar: "نسيان `.js` أو `./` في المسار داخل المتصفح ← لا يجد الملف. اكتب `\"./math.js\"`.", en: "Leaving out `.js` or `./` in the path in the browser → the file isn't found. Write `\"./math.js\"`." },
    ],
  },
  files: [],
  starter: {},
  solution: {},
  tasks: [],
  hints: [],
  quiz: [
    { id: "q1", prompt: { ar: "كيف تستورد التصدير المسمّى `add` من `./math.js`؟", en: "How do you import the named export `add` from `./math.js`?" }, options: [{ ar: '`import { add } from "./math.js";`', en: '`import { add } from "./math.js";`' }, { ar: '`import add from "./math.js";`', en: '`import add from "./math.js";`' }, { ar: '`include add in "./math.js";`', en: '`include add in "./math.js";`' }], answer: 0 },
    { id: "q2", prompt: { ar: "أي وسم يسمح للمتصفح باستخدام `import` و `export`؟", en: "Which tag lets the browser use `import` and `export`?" }, options: [{ ar: '`<script module>`', en: '`<script module>`' }, { ar: '`<script type="module">`', en: '`<script type="module">`' }, { ar: '`<script type="import">`', en: '`<script type="import">`' }], answer: 1 },
    { id: "q3", prompt: { ar: "ما الفائدة الأساسية من الوحدات؟", en: "What's the main benefit of modules?" }, options: [{ ar: "تجعل كل الكود أسرع تلقائيًا", en: "They make all code faster automatically" }, { ar: "تُغني عن كتابة الدوال", en: "They replace the need for functions" }, { ar: "لكل ملف نطاقه الخاص، فلا تتصادم المتغيرات العامة", en: "Each file has its own scope, so globals don't clash" }], answer: 2 },
  ],
  xp: 20,
};

/* ------------------------------------------------------------------ Debounce and throttle */

export const debounceThrottle: Lesson = {
  slug: "debounce-throttle",
  title: { ar: "Debounce و Throttle: التحكم في التكرار", en: "Debounce and throttle" },
  body: [
    { icon: "🌧️", ar: "بعض الأحداث تتكرر بسرعة كبيرة: الكتابة في مربع بحث، أو التمرير، أو تغيير حجم النافذة. تنفيذ عمل ثقيل مع كل حدث يبطئ الصفحة ويرسل طلبات كثيرة بلا داعٍ.", en: "Some events fire very fast: typing in a search box, scrolling, resizing the window. Doing heavy work on every single one slows the page and sends lots of needless requests." },
    { icon: "⏱️", ar: "**Debounce**: انتظر حتى **يتوقف** المستخدم لحظة، ثم نفّذ مرة واحدة. كل استدعاء جديد يلغي المؤقت السابق بـ `clearTimeout` ويبدأ مؤقتًا جديدًا بـ `setTimeout`، فلا يكمل إلا الأخير.", en: "**Debounce**: wait until the user **stops** for a moment, then run once. Each new call cancels the old timer with `clearTimeout` and starts a new one with `setTimeout`, so only the last call gets through." },
    { icon: "🚰", ar: "**Throttle**: نفّذ **مرة على الأكثر** كل فترة. أول استدعاء يعمل فورًا، ثم نتجاهل الاستدعاءات حتى تنتهي الفترة. مفيد للتمرير: تحديث كل 100 ملي ثانية بدل مئات المرات.", en: "**Throttle**: run **at most once** per period. The first call runs right away, then calls are ignored until the period is over. Handy for scrolling: update every 100 ms instead of hundreds of times." },
    { icon: "🧠", ar: "الاثنتان **دالة تُرجع دالة** وتتذكّر متغيرًا بالـ closure (`timer` أو `waiting`). وتمرّر القيم بـ `(...args)` ثم `fn(...args)`.", en: "Both are **a function that returns a function**, remembering a variable through a closure (`timer` or `waiting`). Values are passed along with `(...args)`, then `fn(...args)`." },
  ],
  example: {
    code: 'function debounce(fn, ms) {\n  let timer;\n  return (...args) => {\n    clearTimeout(timer);\n    timer = setTimeout(() => fn(...args), ms);\n  };\n}\n\nconst search = debounce((q) => console.log("Searching:", q), 200);\nsearch("r");\nsearch("re");\nsearch("react"); // only this one runs',
    note: { ar: "ثلاثة استدعاءات سريعة، وبحث واحد فقط بآخر قيمة.", en: "Three quick calls, and only one search, with the last value." },
    lang: "js",
  },
  files: ["js"],
  starter: { js: "// 1) Write debounce(fn, ms)\n\n// 2) Write throttle(fn, ms): the first call runs right away,\n//    then calls are ignored for ms milliseconds\n" },
  solution: {
    js: "function debounce(fn, ms) {\n  let timer;\n  return (...args) => {\n    clearTimeout(timer);\n    timer = setTimeout(() => fn(...args), ms);\n  };\n}\n\nfunction throttle(fn, ms) {\n  let waiting = false;\n  return (...args) => {\n    if (waiting) return;\n    fn(...args);\n    waiting = true;\n    setTimeout(() => {\n      waiting = false;\n    }, ms);\n  };\n}\n",
  },
  harness: iife(
    'try { var __n = 0, __last = ""; var __d = debounce(function (q) { __n++; __last = q; }, 100); __d("a"); __d("ab"); __d("abc"); setTimeout(function () { console.log("__c__ debounce " + __n + " " + __last); }, 350); } catch (e) { console.log("__c__ debounce missing"); }\ntry { var __runs = 0, __first = "none"; var __t = throttle(function (v) { __runs++; if (__runs === 1) __first = v; }, 100); for (var __i = 0; __i < 10; __i++) __t(__i); console.log("__c__ throttleNow " + __runs + " " + __first); setTimeout(function () { for (var __j = 0; __j < 10; __j++) __t(__j); console.log("__c__ throttleLater " + __runs); }, 250); } catch (e) { console.log("__c__ throttleNow missing"); }'),
  settle: 700,
  tasks: [
    { id: "once", label: { ar: "اكتب دالة `debounce(fn, ms)` تُرجع دالة جديدة: ثلاثة استدعاءات سريعة = تنفيذ واحد فقط", en: "Write a function `debounce(fn, ms)` that returns a new function: three quick calls = only one run" }, test: ({ logs }) => logs.some((l) => /^__c__ debounce 1(\s|$)/.test(l.trim())) },
    { id: "last", label: { ar: "التنفيذ الوحيد يستلم **آخر** قيمة (`abc`)", en: "That single run receives the **last** value (`abc`)" }, test: ({ logs }) => c(logs, "debounce", "1 abc") },
    {
      id: "throttle",
      label: { ar: "اكتب دالة `throttle(fn, ms)`: أول استدعاء يعمل فورًا، ثم تُتجاهل الاستدعاءات حتى تمر `ms`، وبعدها يعمل استدعاء جديد", en: "Write a function `throttle(fn, ms)`: the first call runs right away, then calls are ignored until `ms` has passed, and after that a new call runs" },
      test: ({ logs }) => {
        const later = logs.map((l) => /^__c__ throttleLater (\d+)$/.exec(l.trim())).find(Boolean);
        const n = later ? Number(later[1]) : 0;
        return c(logs, "throttleNow", "1 0") && n >= 2 && n <= 3;
      },
    },
  ],
  hints: [
    { ar: "debounce: `let timer;` خارج الدالة المُرجعة، وداخلها `clearTimeout(timer); timer = setTimeout(() => fn(...args), ms);`", en: "debounce: `let timer;` outside the returned function, and inside it `clearTimeout(timer); timer = setTimeout(() => fn(...args), ms);`" },
    { ar: "throttle: `let waiting = false; return (...args) => { if (waiting) return; fn(...args); waiting = true; setTimeout(() => { waiting = false; }, ms); };`", en: "throttle: `let waiting = false; return (...args) => { if (waiting) return; fn(...args); waiting = true; setTimeout(() => { waiting = false; }, ms); };`" },
  ],
  deep: {
    more: [
      { icon: "🔎", ar: "استعمل debounce لمربع البحث مع حدث `input`: `input.addEventListener(\"input\", debounce(search, 300))`.", en: "Use debounce for a search box with the `input` event: `input.addEventListener(\"input\", debounce(search, 300))`." },
      { icon: "📜", ar: "استعمل throttle مع `scroll` و `resize` و `mousemove`: تريد تحديثات منتظمة أثناء الحركة، لا بعد توقفها فقط.", en: "Use throttle with `scroll`, `resize` and `mousemove`: you want regular updates during the movement, not only after it stops." },
      { icon: "📦", ar: "مكتبات مثل **lodash** فيها `debounce` و `throttle` جاهزتين بخيارات إضافية، لكن فهم النسخة الصغيرة يكفيك لمعظم الحالات.", en: "Libraries like **lodash** ship ready-made `debounce` and `throttle` with extra options, but understanding the small version covers most cases." },
    ],
    mistakes: [
      { ar: "تعريف `let timer` داخل الدالة المُرجعة ← يُنشأ من جديد كل مرة فلا يُلغى المؤقت القديم أبدًا.", en: "Declaring `let timer` inside the returned function → it's created fresh every call, so the old timer is never cancelled." },
      { ar: "`addEventListener(\"input\", debounce(search, 300))` صحيح، لكن `() => debounce(search, 300)` يصنع debounce جديدًا مع كل حدث ولا يعمل.", en: "`addEventListener(\"input\", debounce(search, 300))` is right, but `() => debounce(search, 300)` makes a new debounce on every event and doesn't work." },
      { ar: "الخلط بينهما ← debounce: «بعد أن يتوقف»، throttle: «مرة كل فترة أثناء الحركة».", en: "Mixing them up → debounce: \"after it stops\"; throttle: \"once per period while it's happening\"." },
    ],
  },
  xp: 35,
};

/* ------------------------------------------------------------------ Regular expressions */

export const regex: Lesson = {
  slug: "regex",
  title: { ar: "التعابير النمطية: RegExp", en: "Regular expressions (RegExp)" },
  body: [
    { icon: "🔍", ar: "**التعبير النمطي** نمط يصف شكل نص، ويُكتب بين شرطتين: `/cat/`. و `pattern.test(text)` تُرجع `true` إذا وجدت النمط في النص: `/cat/.test(\"my cat\")` تعطي `true`.", en: "A **regular expression** is a pattern that describes the shape of text, written between slashes: `/cat/`. `pattern.test(text)` returns `true` when the pattern is found in the text: `/cat/.test(\"my cat\")` gives `true`." },
    { icon: "🔣", ar: "رموز مفيدة: `\\d` رقم واحد، و `\\w` حرف أو رقم أو `_`، و `+` «واحد أو أكثر» مما قبله (`\\d+` رقم كامل مثل `42`)، و `^` بداية النص، و `$` نهايته.", en: "Useful symbols: `\\d` one digit, `\\w` a letter, digit or `_`, `+` \"one or more\" of what's before it (`\\d+` is a whole number like `42`), `^` the start of the text and `$` its end." },
    { icon: "🎣", ar: "`text.match(/\\d+/g)` تُرجع مصفوفة بكل الأجزاء المطابقة. الحرف `g` بعد الشرطة يعني «global»: كل المطابقات لا أولها فقط.", en: "`text.match(/\\d+/g)` returns an array of every matching part. The `g` after the slash means \"global\": all matches, not just the first." },
    { icon: "✏️", ar: "`text.replace(/-/g, \" \")` تستبدل كل `-` بمسافة. وفحص بريد بسيط: `/^\\w+@\\w+\\.\\w+$/` (كلمة ثم `@` ثم كلمة ثم نقطة ثم كلمة). النقطة تُكتب `\\.` لأن `.` وحدها تعني «أي حرف».", en: "`text.replace(/-/g, \" \")` replaces every `-` with a space. And a simple email check: `/^\\w+@\\w+\\.\\w+$/` (a word, `@`, a word, a dot, a word). The dot is written `\\.` because `.` alone means \"any character\"." },
  ],
  example: {
    code: 'const note = "Call 555 before 9";\n\nconsole.log(/\\d/.test(note));                 // true\nconsole.log(note.match(/\\d+/g).join(","));     // 555,9\nconsole.log(note.replace(/\\d/g, "#"));         // Call ### before #\n\nconst isCode = /^\\d+$/;\nconsole.log(isCode.test("2048"));  // true\nconsole.log(isCode.test("20a8"));  // false',
    note: { ar: "`test` تسأل نعم/لا، `match` تجمع، `replace` تستبدل.", en: "`test` asks yes/no, `match` collects, `replace` swaps." },
    lang: "js",
  },
  files: ["js"],
  starter: { js: 'const order = "3 apples, 12 eggs and 7 lemons";\nconst phone = "555-123-4567";\n\n// 1) Write hasNumber(text)\n\n// 2) Print every number in order, joined by commas\n\n// 3) Print phone with every - replaced by a space\n\n// 4) Write isEmail(text)\n' },
  solution: {
    js: 'const order = "3 apples, 12 eggs and 7 lemons";\nconst phone = "555-123-4567";\n\nfunction hasNumber(text) {\n  return /\\d/.test(text);\n}\n\nconsole.log(order.match(/\\d+/g).join(","));\n\nconsole.log(phone.replace(/-/g, " "));\n\nfunction isEmail(text) {\n  return /^\\w+@\\w+\\.\\w+$/.test(text);\n}\n',
  },
  harness: iife(
    'try { console.log("__c__ hasNumber " + hasNumber("room 7") + " " + hasNumber("abc") + " " + hasNumber("2048")); } catch (e) { console.log("__c__ hasNumber missing"); }\ntry { console.log("__c__ email " + [isEmail("sara@mail.com"), isEmail("sara.mail.com"), isEmail("sara@mail"), isEmail("a b@c.com"), isEmail("lina99@site.org")].join(",")); } catch (e) { console.log("__c__ email missing"); }'),
  tasks: [
    { id: "test", label: { ar: "اكتب دالة `hasNumber(text)` تُرجع `true` إذا كان في النص رقم (`\\d`) و `false` إذا لم يكن", en: "Write a function `hasNumber(text)` that returns `true` when the text has a digit (`\\d`), and `false` when it doesn't" }, test: ({ logs }) => c(logs, "hasNumber", "true false true") },
    { id: "match", label: { ar: "اطبع كل الأرقام في `order` بـ `match` و `/g` مفصولة بفواصل (يظهر `3,12,7`)", en: "Print every number in `order` with `match` and `/g`, joined by commas (it shows `3,12,7`)" }, test: ({ files, logs }) => /\.match\(/.test(codeOnly(files)) && list(logs, "3,12,7") },
    { id: "replace", label: { ar: "اطبع `phone` بعد استبدال كل `-` بمسافة بـ `replace` و `/g` (يظهر `555 123 4567`)", en: "Print `phone` with every `-` replaced by a space, using `replace` and `/g` (it shows `555 123 4567`)" }, test: ({ files, logs }) => /\.replace(All)?\(/.test(codeOnly(files)) && printed(logs, "555 123 4567") },
    { id: "email", label: { ar: "اكتب دالة `isEmail(text)` تُرجع `true` لبريد مثل `sara@mail.com` و `false` لنص بلا `@` أو بلا نقطة أو فيه مسافة", en: "Write a function `isEmail(text)` that returns `true` for an email like `sara@mail.com`, and `false` for text with no `@`, no dot, or a space" }, test: ({ logs }) => c(logs, "email", "true,false,false,false,true") },
  ],
  hints: [
    { ar: '`function hasNumber(text) { return /\\d/.test(text); }` و `console.log(order.match(/\\d+/g).join(","));`', en: '`function hasNumber(text) { return /\\d/.test(text); }` and `console.log(order.match(/\\d+/g).join(","));`' },
    { ar: '`console.log(phone.replace(/-/g, " "));` و `function isEmail(text) { return /^\\w+@\\w+\\.\\w+$/.test(text); }`', en: '`console.log(phone.replace(/-/g, " "));` and `function isEmail(text) { return /^\\w+@\\w+\\.\\w+$/.test(text); }`' },
  ],
  deep: {
    more: [
      { icon: "🔠", ar: "الحرف `i` بعد النمط يتجاهل حالة الأحرف: `/hello/i.test(\"HELLO\")` تعطي `true`. ويمكن جمعه مع `g`: `/a/gi`.", en: "The `i` flag ignores letter case: `/hello/i.test(\"HELLO\")` gives `true`. You can combine it with `g`: `/a/gi`." },
      { icon: "🧺", ar: "الأقواس المربعة تعني «أي واحد من هذه»: `[aeiou]` حرف علة، و `[0-9]` مثل `\\d`. و `{3}` تعني ثلاث مرات بالضبط: `/^\\d{4}$/` رمز من 4 أرقام.", en: "Square brackets mean \"any one of these\": `[aeiou]` is a vowel and `[0-9]` is like `\\d`. `{3}` means exactly three times: `/^\\d{4}$/` is a 4-digit code." },
      { icon: "🧪", ar: "جرّب أنماطك على موقع مثل **regex101.com** الذي يشرح كل جزء. فحص البريد الحقيقي أعقد، والأفضل أن ترسل للمستخدم رسالة تأكيد.", en: "Try your patterns on a site like **regex101.com**, which explains each part. Real email checking is more complex; the best check is sending a confirmation email." },
    ],
    mistakes: [
      { ar: "نسيان `g` في `replace` ← يُستبدل أول تطابق فقط: `555 123-4567`.", en: "Forgetting `g` in `replace` → only the first match is replaced: `555 123-4567`." },
      { ar: "كتابة النمط كنص `\"\\d+\"` بين علامتي تنصيص ← النمط الحرفي يُكتب بين شرطتين `/\\d+/`.", en: "Writing the pattern as text in quotes `\"\\d+\"` → a regex literal goes between slashes: `/\\d+/`." },
      { ar: "نسيان `^` و `$` في الفحص ← `/\\w+@\\w+\\.\\w+/` تقبل `a b@c.com` لأنها تجد جزءًا صالحًا داخله.", en: "Leaving out `^` and `$` in a check → `/\\w+@\\w+\\.\\w+/` accepts `a b@c.com` because it finds a valid part inside it." },
    ],
  },
  xp: 35,
};

/* ------------------------------------------------------------------ Functional style */

export const functional: Lesson = {
  slug: "functional",
  title: { ar: "البرمجة الوظيفية: دوال نقية وثبات البيانات", en: "Functional style: pure functions and immutability" },
  body: [
    { icon: "🧼", ar: "**الدالة النقية** تُرجع دائمًا نفس النتيجة لنفس المدخلات، ولا تغيّر شيئًا خارجها. أما تغيير متغير خارجي أو مصفوفة مُمرَّرة أو الصفحة أو الطباعة فهي **آثار جانبية (side effects)**.", en: "A **pure function** always returns the same result for the same inputs, and changes nothing outside itself. Changing an outside variable, an array you were given, the page, or printing are **side effects**." },
    { icon: "🧊", ar: "**الثبات (immutability)**: لا تعدّل المصفوفة التي وصلتك بـ `push`؛ أرجِع مصفوفة **جديدة**: `[...list, item]`، أو `map` و `filter` اللتين تصنعان مصفوفة جديدة دائمًا.", en: "**Immutability**: don't change the array you were given with `push`; return a **new** one: `[...list, item]`, or use `map` and `filter`, which always make a new array." },
    { icon: "🎛️", ar: "**الدالة العليا (higher-order)** تأخذ دالة أو تُرجع دالة. `map` تأخذ دالة، و `makeMultiplier(3)` يمكن أن تُرجع دالة `(x) => x * 3` تتذكّر الرقم 3 بالـ closure.", en: "A **higher-order function** takes a function or returns one. `map` takes a function, and `makeMultiplier(3)` can return a function `(x) => x * 3` that remembers 3 through a closure." },
    { icon: "🧩", ar: "**التركيب (composition)**: تبني عملًا كبيرًا من دوال صغيرة: `compose(f, g)` تُرجع دالة تشغّل `g` أولًا ثم `f` على نتيجتها: `(x) => f(g(x))`.", en: "**Composition**: build a big job out of small functions: `compose(f, g)` returns a function that runs `g` first, then `f` on its result: `(x) => f(g(x))`." },
  ],
  example: {
    code: 'const prices = [10, 20, 30];\n\n// pure: a new array, prices stays the same\nconst withTax = prices.map((p) => p * 2);\nconsole.log(withTax.join(","), prices.join(",")); // 20,40,60 10,20,30\n\n// higher-order: returns a function\nfunction makeGreeter(greeting) {\n  return (name) => `${greeting}, ${name}!`;\n}\nconst hello = makeGreeter("Hello");\nconsole.log(hello("Sara")); // Hello, Sara!',
    note: { ar: "`prices` لم تتغير، و `makeGreeter` تصنع دوالًا.", en: "`prices` didn't change, and `makeGreeter` makes functions." },
    lang: "js",
  },
  files: ["js"],
  starter: { js: "// 1) addItem changes the list it gets! Make it pure:\n//    return a NEW array and leave list as it was\nfunction addItem(list, item) {\n  list.push(item);\n  return list;\n}\n\n// 2) Write makeMultiplier(n): it returns a function that multiplies by n\n\n// 3) Write compose(f, g): it returns a function that runs g, then f\n" },
  solution: {
    js: "function addItem(list, item) {\n  return [...list, item];\n}\n\nfunction makeMultiplier(n) {\n  return (x) => x * n;\n}\n\nfunction compose(f, g) {\n  return (x) => f(g(x));\n}\n\nconst triple = makeMultiplier(3);\nconsole.log(triple(5));\n",
  },
  harness: iife(
    'try { var __a = [1, 2]; var __r = addItem(__a, 3); console.log("__c__ add " + (Array.isArray(__r) ? __r.join(",") : String(__r)) + " " + __a.join(",") + " " + (__r !== __a)); } catch (e) { console.log("__c__ add missing"); }\ntry { var __m = makeMultiplier(3); console.log("__c__ mult " + (typeof __m) + " " + __m(5) + " " + makeMultiplier(10)(2)); } catch (e) { console.log("__c__ mult missing"); }\ntry { var __h = compose(function (n) { return n * 10; }, function (n) { return n + 1; }); console.log("__c__ compose " + (typeof __h) + " " + __h(2)); } catch (e) { console.log("__c__ compose missing"); }'),
  tasks: [
    { id: "pure", label: { ar: "اجعل `addItem(list, item)` نقية: تُرجع مصفوفة **جديدة** فيها العنصر في آخرها، دون تغيير `list` (استخدم `[...list, item]`)", en: "Make `addItem(list, item)` pure: return a **new** array with the item at the end, without changing `list` (use `[...list, item]`)" }, test: ({ logs }) => c(logs, "add", "1,2,3 1,2 true") },
    { id: "higher", label: { ar: "اكتب دالة `makeMultiplier(n)` تُرجع دالة تضرب في `n`: `makeMultiplier(3)(5)` تعطي `15`", en: "Write a function `makeMultiplier(n)` that returns a function multiplying by `n`: `makeMultiplier(3)(5)` gives `15`" }, test: ({ logs }) => c(logs, "mult", "function 15 20") },
    { id: "compose", label: { ar: "اكتب دالة `compose(f, g)` تُرجع دالة تشغّل `g` ثم `f`: `(x) => f(g(x))`", en: "Write a function `compose(f, g)` that returns a function running `g`, then `f`: `(x) => f(g(x))`" }, test: ({ logs }) => c(logs, "compose", "function 30") },
  ],
  hints: [
    { ar: "`function addItem(list, item) { return [...list, item]; }`", en: "`function addItem(list, item) { return [...list, item]; }`" },
    { ar: "`function makeMultiplier(n) { return (x) => x * n; }` و `function compose(f, g) { return (x) => f(g(x)); }`", en: "`function makeMultiplier(n) { return (x) => x * n; }` and `function compose(f, g) { return (x) => f(g(x)); }`" },
  ],
  deep: {
    more: [
      { icon: "🧪", ar: "الدوال النقية أسهل في الاختبار: تعطيها مدخلات وتتحقق من الناتج، دون تجهيز صفحة أو متغيرات خارجية.", en: "Pure functions are easier to test: give them inputs and check the output, with no page or outside variables to set up." },
      { icon: "📦", ar: "للكائنات أيضًا: `{ ...user, age: 22 }` نسخة جديدة بعمر مختلف، بدل `user.age = 22`. هكذا تعمل React مع الحالة (state).", en: "For objects too: `{ ...user, age: 22 }` is a new copy with a different age, instead of `user.age = 22`. That's how React works with state." },
      { icon: "🌍", ar: "الآثار الجانبية ليست سيئة؛ البرنامج يحتاجها ليطبع ويحفظ. الفكرة أن تجمعها في أماكن قليلة واضحة، وتُبقي الحسابات نقية.", en: "Side effects aren't bad; a program needs them to print and save. The idea is to keep them in a few clear places and keep the calculations pure." },
    ],
    mistakes: [
      { ar: "`const copy = list; copy.push(x)` ← ليست نسخة! المتغيران يشيران لنفس المصفوفة. انسخ بـ `[...list]`.", en: "`const copy = list; copy.push(x)` → not a copy! Both names point to the same array. Copy with `[...list]`." },
      { ar: "`sort()` و `reverse()` و `splice()` تغيّر المصفوفة الأصلية ← انسخها أولًا: `[...list].sort()`.", en: "`sort()`, `reverse()` and `splice()` change the original array → copy it first: `[...list].sort()`." },
      { ar: "`return x * n` بدل `return (x) => x * n` في دالة عليا ← تُرجع رقمًا لا دالة.", en: "`return x * n` instead of `return (x) => x * n` in a higher-order function → it returns a number, not a function." },
    ],
  },
  xp: 35,
};

/* ------------------------------------------------------------------ Clean code */

const MESSY =
  "function f(a) {\n  if (a.length > 0) {\n    let t = 0;\n    for (const x of a) {\n      t = t + x;\n    }\n    return t + 15;\n  } else {\n    return 0;\n  }\n}\n\nconsole.log(f([10, 20]));\nconsole.log(f([]));\n";

/** Prints 45, then 0, like the messy starter. */
const sameOutput = (logs: string[]) => seq(logs, ["45", "0"]).join(",") === "45,0";

export const cleanCode: Lesson = {
  slug: "clean-code",
  title: { ar: "الكود النظيف: اكتب للناس لا للحاسوب", en: "Clean code: write for people, not the computer" },
  body: [
    { icon: "🏷️", ar: "**الأسماء أهم شيء.** `f` و `a` و `t` لا تعني شيئًا، أما `getTotal(prices)` و `total` فتشرح نفسها. الدوال أفعال (`getUser`، `sendEmail`)، والقيم المنطقية أسئلة (`isLoggedIn`).", en: "**Names matter most.** `f`, `a` and `t` mean nothing; `getTotal(prices)` and `total` explain themselves. Functions are verbs (`getUser`, `sendEmail`), and booleans are questions (`isLoggedIn`)." },
    { icon: "🔢", ar: "**لا أرقام سحرية**: ما معنى `15` في وسط الكود؟ أعطه اسمًا في ثابت أعلى الملف: `const SHIPPING_COST = 15;`. هكذا يُفهم، وتغيّره من مكان واحد.", en: "**No magic numbers**: what does a `15` in the middle of the code mean? Give it a name in a constant at the top: `const SHIPPING_COST = 15;`. Now it's clear, and you change it in one place." },
    { icon: "↩️", ar: "**الخروج المبكر**: عالج الحالة الخاصة أولًا ثم اخرج: `if (prices.length === 0) return 0;`. هذا أوضح من `if/else` كبيرة متداخلة.", en: "**Return early**: deal with the special case first and leave: `if (prices.length === 0) return 0;`. That's clearer than a big nested `if/else`." },
    { icon: "✂️", ar: "**دوال صغيرة بمهمة واحدة، وأسلوب ثابت**: نفس المسافات والفواصل المنقوطة وعلامات التنصيص في كل الملف. أداة **Prettier** تنسّق ذلك تلقائيًا.", en: "**Small functions with one job, and a consistent style**: the same spacing, semicolons and quotes across the file. The **Prettier** tool formats that for you." },
  ],
  example: {
    code: '// ❌ Hard to read\nfunction c(u) {\n  if (u) {\n    if (u.age >= 18) {\n      return true;\n    }\n  }\n  return false;\n}\n\n// ✅ Clean\nconst ADULT_AGE = 18;\n\nfunction isAdult(user) {\n  if (!user) return false;\n  return user.age >= ADULT_AGE;\n}\n\nconsole.log(isAdult({ age: 20 })); // true',
    note: { ar: "نفس النتيجة، لكن الثانية تُقرأ كجملة.", en: "Same result, but the second reads like a sentence." },
    lang: "js",
  },
  files: ["js"],
  starter: { js: `// This works, but it's hard to read. Clean it up!\n// It must still print 45, then 0.\n\n${MESSY}` },
  solution: {
    js: "const SHIPPING_COST = 15;\n\nfunction getTotal(prices) {\n  if (prices.length === 0) return 0;\n\n  let total = 0;\n  for (const price of prices) {\n    total += price;\n  }\n  return total + SHIPPING_COST;\n}\n\nconsole.log(getTotal([10, 20]));\nconsole.log(getTotal([]));\n",
  },
  tasks: [
    {
      id: "constant",
      label: { ar: "أعطِ الرقم السحري `15` اسمًا في ثابت، مثل `const SHIPPING_COST = 15;`، واستخدمه (والناتج ما زال `45` ثم `0`)", en: "Give the magic number `15` a name in a constant, like `const SHIPPING_COST = 15;`, and use it (the output is still `45`, then `0`)" },
      test: ({ files, logs }) => {
        const code = codeOnly(files);
        const named = /\bconst\s+([A-Za-z_$][\w$]{2,})\s*=\s*15\b/.exec(code);
        return !!named && (code.match(/\b15\b/g) ?? []).length === 1 && new RegExp(`\\b${named[1].replace(/\$/g, "\\$")}\\b`, "g").test(code.replace(named[0], "")) && sameOutput(logs);
      },
    },
    {
      id: "names",
      label: { ar: "سمِّ الدالة بفعل يصف عملها، مثل `getTotal(prices)`، ولا تترك أسماء من حرف واحد (`f` و `a` و `t` و `x`)", en: "Name the function with a verb that says what it does, like `getTotal(prices)`, and leave no one-letter names (`f`, `a`, `t`, `x`)" },
      test: ({ files, logs }) => {
        const code = codeOnly(files);
        const verb = /(?:function\s+|(?:const|let)\s+)(?:get|calc|calculate|compute|count|sum|find|make|build|add|create|format|total)[A-Z]\w*\s*(?:=|\()/.test(code);
        const oneLetter = /\b(?:const|let|var|function)\s+[A-Za-z_$](?![\w$])/.test(code) || /function\s*[\w$]*\s*\(\s*[A-Za-z_$]\s*[,)]/.test(code);
        return verb && !oneLetter && sameOutput(logs);
      },
    },
    { id: "early", label: { ar: "استبدل `if/else` بخروج مبكر في أول الدالة: `if (prices.length === 0) return 0;` (بدون `else`)", en: "Replace the `if/else` with an early return at the top of the function: `if (prices.length === 0) return 0;` (no `else`)" }, test: ({ files, logs }) => { const code = codeOnly(files); return !/\belse\b/.test(code) && /if\s*\([^)]*\)\s*\{?\s*return\b/.test(code) && sameOutput(logs); } },
  ],
  hints: [
    { ar: "في أول الملف `const SHIPPING_COST = 15;` ثم `return total + SHIPPING_COST;`. وغيّر `f` إلى `getTotal` في التعريف وفي سطري الطباعة.", en: "At the top `const SHIPPING_COST = 15;`, then `return total + SHIPPING_COST;`. Rename `f` to `getTotal` in its definition and in both print lines." },
    { ar: "`function getTotal(prices) { if (prices.length === 0) return 0; let total = 0; for (const price of prices) { total += price; } return total + SHIPPING_COST; }`", en: "`function getTotal(prices) { if (prices.length === 0) return 0; let total = 0; for (const price of prices) { total += price; } return total + SHIPPING_COST; }`" },
  ],
  deep: {
    more: [
      { icon: "♻️", ar: "**لا تكرر نفسك (DRY)**: إذا نسخت نفس الكود ثلاث مرات فاجعله دالة. لكن لا تبالغ: البساطة أهم من الذكاء.", en: "**Don't repeat yourself (DRY)**: if you paste the same code three times, make it a function. But don't overdo it: simple beats clever." },
      { icon: "💬", ar: "التعليق الجيد يشرح **لماذا** لا **ماذا**. إذا احتجت تعليقًا لتشرح ماذا يفعل الكود، فغالبًا يحتاج اسمًا أوضح.", en: "A good comment explains **why**, not **what**. If you need a comment to say what the code does, it usually needs a clearer name." },
      { icon: "🧰", ar: "**ESLint** ينبّهك إلى الأخطاء والعادات السيئة قبل التشغيل، و **Prettier** يوحّد الشكل. معًا يجعلان كود الفريق كأن شخصًا واحدًا كتبه.", en: "**ESLint** flags mistakes and bad habits before you run the code, and **Prettier** unifies the look. Together they make a team's code look like one person wrote it." },
    ],
    mistakes: [
      { ar: "أسماء مختصرة جدًا `usrLst` ← اكتب الكلمة كاملة `userList`؛ المحرر يكملها لك.", en: "Over-short names like `usrLst` → write the full word `userList`; the editor completes it for you." },
      { ar: "دالة طويلة تفعل كل شيء ← إذا احتجت كلمة «و» لوصفها فقسّمها.", en: "One long function that does everything → if you need the word \"and\" to describe it, split it." },
      { ar: "تنظيف الكود ثم كسره ← بعد كل تغيير شغّله وتأكد أن الناتج كما هو.", en: "Cleaning code and breaking it → after every change, run it and make sure the output is the same." },
    ],
  },
  xp: 30,
};

/* ------------------------------------------------------------------ Guided project: a to-do app */

const TODO_HTML =
  '<main>\n  <h1>My tasks</h1>\n  <form id="todo-form">\n    <input id="todo-input" placeholder="New task…" />\n    <button>Add</button>\n  </form>\n  <p><span id="count">0</span> left</p>\n  <ul id="todo-list"></ul>\n</main>\n';

const TODO_CSS =
  "body { font-family: system-ui, sans-serif; background: #0a0f24; color: #e2e8f0; padding: 24px; }\nmain { max-width: 420px; margin: auto; }\nform { display: flex; gap: 8px; }\ninput { flex: 1; padding: 10px; border-radius: 10px; border: 1px solid #334155; background: #111833; color: inherit; }\nbutton { padding: 10px 16px; border: 0; border-radius: 10px; background: #22d3ee; color: #0a0f24; font-weight: bold; }\n#count { font-weight: bold; color: #22d3ee; }\nul { padding: 0; }\nli { padding: 10px; margin-top: 8px; border-radius: 10px; background: #111833; list-style: none; cursor: pointer; }\nli.done { text-decoration: line-through; opacity: 0.5; }\n";

const TODO_TOP =
  'const form = document.querySelector("#todo-form");\nconst input = document.querySelector("#todo-input");\nconst list = document.querySelector("#todo-list");\nconst countEl = document.querySelector("#count");\n\nlet todos = []; // each todo looks like { text: "Buy milk", done: false }\n\n';

const TODO_STARTER = `${TODO_TOP}// Draws every todo as an <li> (ready for you)
function render() {
  list.textContent = "";
  todos.forEach((todo) => {
    const li = document.createElement("li");
    li.textContent = todo.text;
    // Step 3: add the "done" class when todo.done is true,
    //         and on click flip todo.done, then render() and save()
    list.append(li);
  });
  // Step 4: show how many todos are not done yet in countEl
}

form.addEventListener("submit", (event) => {
  event.preventDefault();
  // Step 1: read input.value with .trim(), push { text: text, done: false } into todos, then render()
  // Step 2: if the text is empty, stop with return; after adding, empty the input
  // Step 5: call save() after the change
});

// Step 5: save todos as JSON in localStorage under the key "todos"
function save() {
}

// Step 5: if something is saved under "todos", put it back into todos
function load() {
}

load();
render();
`;

const TODO_SOLUTION = `${TODO_TOP}// Draws every todo as an <li> (ready for you)
function render() {
  list.textContent = "";
  todos.forEach((todo) => {
    const li = document.createElement("li");
    li.textContent = todo.text;
    if (todo.done) li.classList.add("done");
    li.addEventListener("click", () => {
      todo.done = !todo.done;
      render();
      save();
    });
    list.append(li);
  });
  countEl.textContent = todos.filter((todo) => !todo.done).length;
}

form.addEventListener("submit", (event) => {
  event.preventDefault();
  const text = input.value.trim();
  if (text === "") return;
  todos.push({ text: text, done: false });
  input.value = "";
  render();
  save();
});

function save() {
  localStorage.setItem("todos", JSON.stringify(todos));
}

function load() {
  const saved = localStorage.getItem("todos");
  if (saved) todos = JSON.parse(saved);
}

load();
render();
`;

const TODO_HARNESS = `(function () {
  var form = document.querySelector("#todo-form"), field = document.querySelector("#todo-input"), ul = document.querySelector("#todo-list"), cnt = document.querySelector("#count");
  var items = function () { return ul ? ul.querySelectorAll("li") : []; };
  var count = function () { return cnt ? cnt.textContent.trim() : ""; };
  var add = function (value) { field.value = value; var b = form.querySelector("button"); if (b) b.click(); else form.dispatchEvent(new Event("submit", { bubbles: true, cancelable: true })); };
  try {
    add("  Buy milk  ");
    var first = items()[0];
    console.log("__c__ add " + items().length + " " + (first ? first.textContent : "none"));
    console.log("__c__ cleared " + (field.value === ""));
    add("   ");
    console.log("__c__ empty " + items().length);
    add("Read");
    console.log("__c__ count " + count());
  } catch (e) { console.log("__c__ add error"); }
  try {
    if (items()[0]) items()[0].click();
    var a = items()[0], b = items()[1];
    console.log("__c__ done " + (a ? a.classList.contains("done") : false) + " " + (b ? b.classList.contains("done") : true));
    console.log("__c__ left " + count());
    if (items()[0]) items()[0].click();
    console.log("__c__ undone " + (items()[0] ? items()[0].classList.contains("done") : true));
  } catch (e) { console.log("__c__ done error"); }
  try {
    var saved = localStorage.getItem("todos") || "";
    console.log("__c__ saved " + (saved.indexOf("Buy milk") >= 0 && saved.indexOf("Read") >= 0));
    localStorage.setItem("todos", JSON.stringify([{ text: "From storage", done: false }]));
    load();
    render();
    var found = false;
    for (var i = 0; i < items().length; i++) if (items()[i].textContent.trim() === "From storage") found = true;
    console.log("__c__ loaded " + found);
  } catch (e) { console.log("__c__ loaded error"); }
})();`;

export const todoApp: Lesson = {
  slug: "todo-app",
  title: { ar: "مشروع موجَّه: تطبيق مهام", en: "Guided project: a to-do app" },
  body: [
    { icon: "📝", ar: "حان وقت جمع ما تعلمته في تطبيق حقيقي: قائمة مهام تضيف إليها وتشطب منها، وتبقى بعد إعادة فتح الصفحة. الصفحة والمتغيرات ودالة `render()` التي ترسم القائمة جاهزة؛ والتعليقات `Step` تقول أين تكتب كل خطوة.", en: "Time to put it all together in a real app: a task list you add to and tick off, which survives reopening the page. The page, the variables and the `render()` function that draws the list are ready; the `Step` comments say where each step goes." },
    { icon: "1️⃣", ar: "**الخطوتان 1 و 2** (حدث `submit`): خذ النص بـ `input.value.trim()`، وإذا كان فارغًا اخرج بـ `return`. وإلا أضف `{ text: text, done: false }` إلى `todos` بـ `push`، وأفرغ الحقل، واستدعِ `render()`.", en: "**Steps 1 and 2** (the `submit` event): take the text with `input.value.trim()`, and if it's empty leave with `return`. Otherwise `push` `{ text: text, done: false }` into `todos`, empty the field and call `render()`." },
    { icon: "3️⃣", ar: "**الخطوتان 3 و 4** (داخل `render()`): إذا كانت `todo.done` صحيحة أضف الصنف `done` بـ `classList.add`، وعند النقر على `li` اقلب القيمة `todo.done = !todo.done` ثم `render()`. وفي آخرها اعرض عدد المهام غير المنجزة: `todos.filter((todo) => !todo.done).length`.", en: "**Steps 3 and 4** (inside `render()`): if `todo.done` is true add the `done` class with `classList.add`, and when the `li` is clicked flip it with `todo.done = !todo.done`, then `render()`. At the end show how many aren't done: `todos.filter((todo) => !todo.done).length`." },
    { icon: "💾", ar: "**الخطوة 5**: `save()` تحفظ `JSON.stringify(todos)` في `localStorage` بالمفتاح `\"todos\"`، واستدعِها بعد كل تغيير. و `load()` تقرأ المفتاح، وإذا وجدت شيئًا تضعه في `todos` بـ `JSON.parse`.", en: "**Step 5**: `save()` stores `JSON.stringify(todos)` in `localStorage` under the key `\"todos\"`; call it after every change. `load()` reads the key and, if something is there, puts it back into `todos` with `JSON.parse`." },
  ],
  files: ["js", "html", "css"],
  starter: { js: TODO_STARTER, html: TODO_HTML, css: TODO_CSS },
  solution: { js: TODO_SOLUTION, html: TODO_HTML, css: TODO_CSS },
  harness: TODO_HARNESS,
  tasks: [
    { id: "add", label: { ar: "الخطوة 1: إرسال النموذج بالنص `  Buy milk  ` يضيف `<li>` نصه `Buy milk` (بدون المسافات)", en: "Step 1: submitting the form with `  Buy milk  ` adds an `<li>` that says `Buy milk` (no extra spaces)" }, test: ({ logs }) => c(logs, "add", "1 Buy milk") },
    { id: "empty", label: { ar: "الخطوة 2: النص الفارغ (أو المسافات فقط) لا يضيف شيئًا، والحقل يفرغ بعد كل إضافة", en: "Step 2: empty text (or only spaces) adds nothing, and the field is emptied after each add" }, test: ({ logs }) => c(logs, "cleared", true) && c(logs, "empty", 1) },
    { id: "toggle", label: { ar: "الخطوة 3: النقر على `li` يضيف الصنف `done`، والنقر مرة ثانية يزيله", en: "Step 3: clicking an `li` adds the `done` class, and clicking again removes it" }, test: ({ logs }) => c(logs, "done", "true false") && c(logs, "undone", false) },
    { id: "count", label: { ar: "الخطوة 4: `#count` يعرض عدد المهام غير المنجزة (`2` بعد مهمتين، و `1` بعد شطب واحدة)", en: "Step 4: `#count` shows how many tasks aren't done (`2` after two tasks, `1` after ticking one off)" }, test: ({ logs }) => c(logs, "count", 2) && c(logs, "left", 1) },
    { id: "storage", label: { ar: 'الخطوة 5: `save()` تحفظ المهام في `localStorage` بالمفتاح `"todos"`، و `load()` تعيدها', en: 'Step 5: `save()` keeps the tasks in `localStorage` under the key `"todos"`, and `load()` brings them back' }, test: ({ logs }) => c(logs, "saved", true) && c(logs, "loaded", true) },
  ],
  hints: [
    { ar: '`const text = input.value.trim(); if (text === "") return; todos.push({ text: text, done: false }); input.value = ""; render(); save();`', en: '`const text = input.value.trim(); if (text === "") return; todos.push({ text: text, done: false }); input.value = ""; render(); save();`' },
    { ar: '`if (todo.done) li.classList.add("done"); li.addEventListener("click", () => { todo.done = !todo.done; render(); save(); });` و `localStorage.setItem("todos", JSON.stringify(todos));`', en: '`if (todo.done) li.classList.add("done"); li.addEventListener("click", () => { todo.done = !todo.done; render(); save(); });` and `localStorage.setItem("todos", JSON.stringify(todos));`' },
  ],
  deep: {
    more: [
      { icon: "🔁", ar: "النمط هنا مهم: **البيانات** (`todos`) هي الأصل، و `render()` ترسم الصفحة منها في كل مرة. هذه نفس فكرة React بالضبط.", en: "The pattern here matters: the **data** (`todos`) is the source of truth, and `render()` redraws the page from it every time. That's exactly the idea behind React." },
      { icon: "🗑️", ar: "حسّنه بنفسك: زر حذف لكل مهمة بـ `filter`، أو زر «احذف المنجزة»، أو عدّاد يكتب `1 task` بدل `1 tasks`.", en: "Improve it yourself: a delete button per task using `filter`, a \"clear done\" button, or a counter that says `1 task` instead of `1 tasks`." },
      { icon: "🧷", ar: "إذا كانت القائمة طويلة جدًا فالتفويض (delegation) أفضل: مستمع واحد على `ul` بدل مستمع لكل `li`.", en: "For a very long list, delegation is better: one listener on the `ul` instead of one per `li`." },
    ],
    mistakes: [
      { ar: "نسيان `event.preventDefault()` ← الصفحة تُعاد تحميلها وتختفي المهمة.", en: "Forgetting `event.preventDefault()` → the page reloads and the task disappears." },
      { ar: "`localStorage.setItem(\"todos\", todos)` بدون `JSON.stringify` ← يُحفظ النص `[object Object]`.", en: "`localStorage.setItem(\"todos\", todos)` without `JSON.stringify` → it saves the text `[object Object]`." },
      { ar: "`JSON.parse(localStorage.getItem(\"todos\"))` عندما لا يوجد شيء ← تعطي `null`، فتحقق أولًا قبل وضعها في `todos`.", en: "`JSON.parse(localStorage.getItem(\"todos\"))` when nothing is saved → gives `null`, so check first before putting it in `todos`." },
    ],
  },
  xp: 50,
};

/* ------------------------------------------------------------------ Challenges and exam */

export const challengesP4: Challenge[] = [
  { id: "jp4-extends", after: "javascript/inheritance", prompt: { ar: "اجعل Dog يرث من Animal", en: "Make Dog inherit from Animal" }, code: "class Dog _ Animal {\n  constructor(name) {\n    _(name);\n  }\n}", answers: ["extends", "super"], chips: ["extends", "super", "inherits", "this"] },
  { id: "jp4-override", after: "javascript/inheritance", prompt: { ar: "استدعِ نسخة الأب من داخل التجاوز", en: "Call the parent's version from the override" }, code: "speak() {\n  return _.speak() + \"!\";\n}", answers: ["super"], chips: ["super", "this", "parent"] },
  { id: "jp4-timeout-zero", after: "javascript/async-intro", prompt: { ar: "أكمل الكود ليطبع 1 ثم 2 ثم 3", en: "Complete it so it prints 1, then 2, then 3" }, code: 'console.log("1");\nsetTimeout(() => console.log("3"), _);\nconsole.log("_");', answers: ["0", "2"], chips: ["0", "2", "3", "1"] },
  { id: "jp4-interval", after: "javascript/timers", prompt: { ar: "مؤقت يتكرر ثم يتوقف", en: "A repeating timer, then stop it" }, code: 'const id = _(() => {\n  console.log("tick");\n}, 1000);\n\n_(id);', answers: ["setInterval", "clearInterval"], chips: ["setInterval", "clearInterval", "setTimeout", "clearTimeout"] },
  { id: "jp4-clear-timeout", after: "javascript/timers", prompt: { ar: "ألغِ المؤقت قبل أن يعمل", en: "Cancel the timer before it fires" }, code: 'const timer = setTimeout(() => console.log("Boom"), 500);\n_(timer);', answers: ["clearTimeout"], chips: ["clearTimeout", "clearInterval", "stopTimeout"] },
  { id: "jp4-promise", after: "javascript/promises", prompt: { ar: "أنشئ وعدًا واستلم نتيجته أو خطأه", en: "Make a promise and handle its result or error" }, code: 'const p = new Promise((_, reject) => {\n  resolve("ok");\n});\n\np._((value) => console.log(value))\n  ._((error) => console.log(error));', answers: ["resolve", "then", "catch"], chips: ["resolve", "then", "catch", "finally", "return"] },
  { id: "jp4-finally", after: "javascript/promises", prompt: { ar: "اطبع Done في الحالتين", en: "Print Done either way" }, code: 'load()\n  .then((data) => console.log(data))\n  .catch((error) => console.log(error))\n  ._(() => console.log("Done"));', answers: ["finally"], chips: ["finally", "then", "always"] },
  { id: "jp4-try-finally", after: "javascript/errors", prompt: { ar: "التقط الخطأ، واطبع Done دائمًا", en: "Catch the error, and always print Done" }, code: 'try {\n  JSON.parse(text);\n} _ (error) {\n  console.log("Bad data");\n} _ {\n  console.log("Done");\n}', answers: ["catch", "finally"], chips: ["catch", "finally", "else", "then"] },
  { id: "jp4-import", after: "javascript/es-modules", prompt: { ar: "صدّر الدالة واستوردها في ملف آخر", en: "Export the function and import it in another file" }, code: '// math.js\n_ function add(a, b) {\n  return a + b;\n}\n\n// main.js\n_ { add } from "./math.js";', answers: ["export", "import"], chips: ["export", "import", "require", "include"] },
  { id: "jp4-module-tag", after: "javascript/es-modules", prompt: { ar: "حمّل الملف كوحدة", en: "Load the file as a module" }, code: '<script _="module" src="main.js"></script>', answers: ["type"], chips: ["type", "src", "lang"] },
  { id: "jp4-debounce", after: "javascript/debounce-throttle", prompt: { ar: "أكمل دالة debounce", en: "Complete debounce" }, code: "function debounce(fn, ms) {\n  let timer;\n  return (...args) => {\n    _(timer);\n    timer = _(() => fn(...args), ms);\n  };\n}", answers: ["clearTimeout", "setTimeout"], chips: ["clearTimeout", "setTimeout", "setInterval", "clearInterval"] },
  { id: "jp4-regex-test", after: "javascript/regex", prompt: { ar: "هل في النص رقم؟", en: "Does the text have a digit?" }, code: 'const hasDigit = /\\d/._("room 7");', answers: ["test"], chips: ["test", "match", "find"] },
  { id: "jp4-regex-global", after: "javascript/regex", prompt: { ar: "استبدل كل الشرطات لا الأولى فقط", en: "Replace every dash, not just the first" }, code: 'console.log("a-b-c".replace(/-/_, " ")); // a b c', answers: ["g"], chips: ["g", "i", "all"] },
  { id: "jp4-pure", after: "javascript/functional", prompt: { ar: "أرجع مصفوفة جديدة دون تغيير الأصل", en: "Return a new array without changing the original" }, code: "function addItem(list, item) {\n  return [_list, item];\n}", answers: ["..."], chips: ["...", "..", "*"] },
  { id: "jp4-higher", after: "javascript/functional", prompt: { ar: "دالة تُرجع دالة", en: "A function that returns a function" }, code: "function makeMultiplier(n) {\n  _ (x) => x * n;\n}", answers: ["return"], chips: ["return", "const", "function"] },
  { id: "jp4-clean", after: "javascript/clean-code", prompt: { ar: "اسم للرقم، اسم فعل للدالة، وخروج مبكر", en: "A name for the number, a verb for the function, and an early return" }, code: "const _ = 15;\n\nfunction _(prices) {\n  if (prices.length === 0) _ 0;\n  return sum(prices) + SHIPPING;\n}", answers: ["SHIPPING", "getTotal", "return"], chips: ["SHIPPING", "getTotal", "return", "x", "f", "else"] },
  { id: "jp4-todo-save", after: "javascript/todo-app", prompt: { ar: "نظّف النص واحفظ المهام", en: "Clean the text and save the tasks" }, code: 'const text = input.value._();\nif (text === "") return;\ntodos.push({ text: text, done: false });\nlocalStorage.setItem("todos", JSON._(todos));', answers: ["trim", "stringify"], chips: ["trim", "stringify", "parse", "split"] },
  { id: "jp4-todo-toggle", after: "javascript/todo-app", prompt: { ar: "اقلب حالة المهمة عند النقر", en: "Flip the task's state on click" }, code: 'li.addEventListener("click", () => {\n  todo.done = _todo.done;\n  render();\n});', answers: ["!"], chips: ["!", "-", "?"] },
];

export const examP4: Question[] = [
  {
    id: "jx-inheritance",
    prompt: { ar: "في `constructor` صنف يرث بـ `extends`، ماذا يجب أن تستدعي قبل استخدام `this`؟", en: "In the `constructor` of a class that uses `extends`, what must you call before using `this`?" },
    options: [{ ar: "`super(...)`", en: "`super(...)`" }, { ar: "`parent(...)`", en: "`parent(...)`" }, { ar: "`new(...)`", en: "`new(...)`" }],
    answer: 0,
  },
  {
    id: "jx-async-intro",
    prompt: { ar: "ماذا يطبع هذا الكود بالترتيب؟", en: "What does this code print, in order?" },
    code: 'console.log("A");\nsetTimeout(() => console.log("B"), 0);\nconsole.log("C");',
    options: [{ ar: "A ثم B ثم C", en: "A, B, C" }, { ar: "A ثم C ثم B", en: "A, C, B" }, { ar: "B ثم A ثم C", en: "B, A, C" }],
    answer: 1,
  },
  {
    id: "jx-timers",
    prompt: { ar: "كيف توقف مؤقتًا بدأته بـ `const id = setInterval(…)`؟", en: "How do you stop a timer started with `const id = setInterval(…)`?" },
    options: [{ ar: "`clearTimeout()`", en: "`clearTimeout()`" }, { ar: "`stopInterval(id)`", en: "`stopInterval(id)`" }, { ar: "`clearInterval(id)`", en: "`clearInterval(id)`" }],
    answer: 2,
  },
  {
    id: "jx-promises",
    prompt: { ar: "أي جزء من الوعد يعمل سواء نجح أو فشل؟", en: "Which part of a promise runs whether it succeeds or fails?" },
    options: [{ ar: "`.then()`", en: "`.then()`" }, { ar: "`.finally()`", en: "`.finally()`" }, { ar: "`.catch()`", en: "`.catch()`" }],
    answer: 1,
  },
  {
    id: "jx-errors",
    prompt: { ar: "متى تعمل كتلة `finally`؟", en: "When does a `finally` block run?" },
    options: [{ ar: "فقط عند حدوث خطأ", en: "Only when there's an error" }, { ar: "فقط عند النجاح", en: "Only on success" }, { ar: "دائمًا، بعد `try` و `catch`", en: "Always, after `try` and `catch`" }],
    answer: 2,
  },
  {
    id: "jx-es-modules",
    prompt: { ar: "الملف فيه `export default function greet() {}`. كيف تستورده؟", en: "A file has `export default function greet() {}`. How do you import it?" },
    options: [{ ar: '`import greet from "./greet.js";`', en: '`import greet from "./greet.js";`' }, { ar: '`import { default } from "./greet.js";`', en: '`import { default } from "./greet.js";`' }, { ar: '`require greet;`', en: '`require greet;`' }],
    answer: 0,
  },
  {
    id: "jx-debounce-throttle",
    prompt: { ar: "تريد البحث فقط بعد أن يتوقف المستخدم عن الكتابة. ماذا تستخدم؟", en: "You want to search only after the user stops typing. What do you use?" },
    options: [{ ar: "throttle", en: "throttle" }, { ar: "debounce", en: "debounce" }, { ar: "setInterval", en: "setInterval" }],
    answer: 1,
  },
  {
    id: "jx-regex",
    prompt: { ar: 'ما ناتج `"a-b-c".replace(/-/g, "+")`؟', en: 'What does `"a-b-c".replace(/-/g, "+")` give?' },
    options: [{ ar: '`"a+b-c"`', en: '`"a+b-c"`' }, { ar: '`"a+b+c"`', en: '`"a+b+c"`' }, { ar: '`"abc"`', en: '`"abc"`' }],
    answer: 1,
  },
  {
    id: "jx-functional",
    prompt: { ar: "أي دالة نقية ولا تغيّر المصفوفة التي تصلها؟", en: "Which function is pure and doesn't change the array it gets?" },
    options: [{ ar: "`(list, x) => [...list, x]`", en: "`(list, x) => [...list, x]`" }, { ar: "`(list, x) => { list.push(x); return list; }`", en: "`(list, x) => { list.push(x); return list; }`" }, { ar: "`(list) => list.sort()`", en: "`(list) => list.sort()`" }],
    answer: 0,
  },
  {
    id: "jx-clean-code",
    prompt: { ar: "أي سطر يتجنب «الرقم السحري»؟", en: "Which line avoids a \"magic number\"?" },
    options: [{ ar: "`if (age >= 18)`", en: "`if (age >= 18)`" }, { ar: "`const ADULT_AGE = 18;` ثم `if (age >= ADULT_AGE)`", en: "`const ADULT_AGE = 18;` then `if (age >= ADULT_AGE)`" }, { ar: "`let x = 18;` ثم `if (age >= x)`", en: "`let x = 18;` then `if (age >= x)`" }],
    answer: 1,
  },
  {
    id: "jx-todo-app",
    prompt: { ar: "كيف تحفظ مصفوفة `todos` في `localStorage`؟", en: "How do you save the `todos` array in `localStorage`?" },
    options: [{ ar: '`localStorage.setItem("todos", todos)`', en: '`localStorage.setItem("todos", todos)`' }, { ar: '`localStorage.todos.push(todos)`', en: '`localStorage.todos.push(todos)`' }, { ar: '`localStorage.setItem("todos", JSON.stringify(todos))`', en: '`localStorage.setItem("todos", JSON.stringify(todos))`' }],
    answer: 2,
  },
];
