import type { Deep } from "../types";

/** "Go deeper" notes for the JavaScript stage, keyed by "stage/slug". */
export const jsDeep: Record<string, Deep> = {
  "javascript/what-is-js": {
    more: [
      {
        icon: "⚙️",
        ar: "المتصفح فيه **محرّك** (engine) يقرأ كودك وينفّذه، مثل V8 في Chrome و SpiderMonkey في Firefox. المحرّك ينفّذ الأوامر **من الأعلى إلى الأسفل** سطرًا بعد سطر، وإذا وجد خطأ يتوقف عنده.",
        en: "Every browser has an **engine** that reads and runs your code, like V8 in Chrome and SpiderMonkey in Firefox. It runs statements **top to bottom**, one after another, and stops at the first error it can't handle.",
      },
      {
        icon: "🧪",
        ar: "الكونسول ليس للطباعة فقط: يمكنك كتابة كود فيه مباشرة وتجربته فورًا. وفيه أوامر مفيدة مثل `console.error()` لرسائل الخطأ و `console.table()` لعرض المصفوفات كجدول.",
        en: "The console isn't just for output: you can type code into it and try it instantly. It also has handy helpers like `console.error()` for error messages and `console.table()` to show arrays as a table.",
      },
      {
        icon: "📏",
        ar: "JavaScript **حساسة لحالة الأحرف**: `console` و `Console` كلمتان مختلفتان. واسمها لا علاقة له بلغة Java، والمعيار الرسمي لها اسمه **ECMAScript** ويصدر بنسخة جديدة كل سنة.",
        en: "JavaScript is **case-sensitive**: `console` and `Console` are different words. Despite the name it's unrelated to Java, and its official standard is called **ECMAScript**, with a new edition every year.",
      },
    ],
    mistakes: [
      {
        ar: "كتابة `Console.log(\"Hi\")` بحرف C كبير → يظهر خطأ `Console is not defined`. الصحيح: `console.log(\"Hi\")` بأحرف صغيرة.",
        en: "Writing `Console.log(\"Hi\")` with a capital C → you get `Console is not defined`. The fix: `console.log(\"Hi\")` in lowercase.",
      },
      {
        ar: "نسيان علامات التنصيص حول النص مثل `console.log(Hello)` → تبحث JavaScript عن متغير اسمه `Hello`. ضع النص بين علامتي تنصيص: `\"Hello\"`.",
        en: "Forgetting quotes around text, like `console.log(Hello)` → JavaScript looks for a variable named `Hello`. Wrap text in quotes: `\"Hello\"`.",
      },
      {
        ar: "وضع الحساب داخل علامات تنصيص مثل `console.log(\"10 * 5\")` → يطبع النص كما هو. اكتب `console.log(10 * 5)` ليحسب الناتج `50`.",
        en: "Putting math inside quotes, like `console.log(\"10 * 5\")` → it prints the text as-is. Write `console.log(10 * 5)` to get `50`.",
      },
    ],
  },

  "javascript/variables": {
    more: [
      {
        icon: "📦",
        ar: "`const` تمنع **إعادة الإسناد** فقط، ولا تجمّد القيمة نفسها. لذلك `const list = [];` ثم `list.push(1)` يعمل تمامًا، لكن `list = []` يسبب خطأ.",
        en: "`const` only stops **reassignment**; it doesn't freeze the value itself. So `const list = [];` then `list.push(1)` works fine, but `list = []` throws an error.",
      },
      {
        icon: "🧱",
        ar: "`let` و `const` لهما **نطاق كتلة** (block scope): المتغير يعيش فقط داخل الأقواس `{ }` التي عُرّف فيها. وقبل سطر التعريف لا يمكن استخدامه أصلًا، وهذا يكشف الأخطاء مبكرًا.",
        en: "`let` and `const` have **block scope**: a variable lives only inside the `{ }` where it was declared. You can't use it before its declaration line either, which catches bugs early.",
      },
      {
        icon: "🏷️",
        ar: "سمِّ متغيراتك بأسماء تشرح معناها بأسلوب **camelCase**: `totalPrice` أفضل من `tp` أو `x`. والاسم لا يبدأ برقم ولا يحتوي مسافات.",
        en: "Give variables meaningful names in **camelCase**: `totalPrice` beats `tp` or `x`. A name can't start with a digit or contain spaces.",
      },
    ],
    mistakes: [
      {
        ar: "تسمية متغير بكلمة محجوزة مثل `const class = \"A\";` أو `let new = 5;` → خطأ في الصياغة. اختر اسمًا آخر مثل `className` أو `newValue`.",
        en: "Naming a variable with a reserved word, like `const class = \"A\";` or `let new = 5;` → syntax error. Pick another name, like `className` or `newValue`.",
      },
      {
        ar: "تغيير قيمة `const` مثل `const score = 0; score = 10;` → خطأ `Assignment to constant variable`. استخدم `let` للقيم التي ستتغير.",
        en: "Reassigning a `const`, like `const score = 0; score = 10;` → `Assignment to constant variable`. Use `let` for values that change.",
      },
      {
        ar: "الخلط بين حالة الأحرف: تعريف `userName` ثم كتابة `username` → خطأ `username is not defined`. انسخ الاسم بنفس الأحرف تمامًا.",
        en: "Mixing letter case: declaring `userName` then typing `username` → `username is not defined`. Spell the name with exactly the same casing.",
      },
    ],
  },

  "javascript/conditions": {
    more: [
      {
        icon: "🌗",
        ar: "الشرط لا يحتاج أن يكون `true` أو `false` حرفيًا: كل قيمة تتحول إلى صح أو خطأ. القيم **falsy** هي: `false` و `0` و `\"\"` و `null` و `undefined` و `NaN`، وكل ما عداها **truthy** حتى `\"0\"` والمصفوفة الفارغة `[]`.",
        en: "A condition doesn't need a literal `true` or `false`: every value converts to one. The **falsy** values are `false`, `0`, `\"\"`, `null`, `undefined` and `NaN`; everything else is **truthy**, even `\"0\"` and an empty array `[]`.",
      },
      {
        icon: "⚡",
        ar: "`&&` و `||` يتوقفان مبكرًا (short-circuit): في `a && b` إذا كان `a` خطأ فلا يُقرأ `b` أصلًا. ولإعطاء قيمة افتراضية استخدم `??` الذي يتجاوز `null` و `undefined` فقط: `count ?? 0`.",
        en: "`&&` and `||` short-circuit: in `a && b`, if `a` is falsy then `b` is never evaluated. For a default value use `??`, which only skips `null` and `undefined`: `count ?? 0`.",
      },
      {
        icon: "🚪",
        ar: "نصيحة المحترفين: بدل التداخل العميق لـ `if` داخل `if`، استخدم **الخروج المبكر**: `if (!user) return;` في بداية الدالة. الكود يصبح مسطحًا وأسهل للقراءة.",
        en: "Pro tip: instead of deeply nested `if` blocks, use **early returns**: `if (!user) return;` at the top of a function. The code stays flat and easier to read.",
      },
    ],
    mistakes: [
      {
        ar: "كتابة `=` بدل `===` داخل الشرط مثل `if (score = 50)` → هذا **إسناد** وليس مقارنة، والشرط يصبح صحيحًا دائمًا. اكتب `if (score === 50)`.",
        en: "Writing `=` instead of `===` in a condition, like `if (score = 50)` → that's an **assignment**, not a comparison, and it's always truthy. Write `if (score === 50)`.",
      },
      {
        ar: "ترتيب الشروط بشكل خاطئ: وضع `score >= 50` قبل `score >= 90` → لن يصل الكود أبدًا إلى \"Excellent\". ابدأ بالشرط الأضيق أولًا.",
        en: "Ordering conditions wrongly: checking `score >= 50` before `score >= 90` → \"Excellent\" is never reached. Put the narrowest condition first.",
      },
      {
        ar: "كتابة `If` أو `Else` بحرف كبير → لا تتعرف عليها JavaScript ويظهر خطأ، لأن الكلمات المحجوزة حساسة لحالة الأحرف. اكتب دائمًا `if` و `else`.",
        en: "Writing `If` or `Else` with a capital letter → JavaScript doesn't recognize it and throws an error, since keywords are case-sensitive. Always write `if` and `else`.",
      },
    ],
  },

  "javascript/functions": {
    more: [
      {
        icon: "🔒",
        ar: "كل دالة تصنع **نطاقًا** (scope) خاصًا بها: المتغيرات المعرّفة داخلها لا تُرى من الخارج. لكن الدالة تستطيع قراءة المتغيرات المحيطة بها، وتتذكرها حتى بعد انتهاء الكود الخارجي، وهذا ما يسمى **closure**.",
        en: "Every function creates its own **scope**: variables declared inside aren't visible outside. But a function can read the variables around it and remembers them even after the outer code has finished; that's a **closure**.",
      },
      {
        icon: "🎁",
        ar: "الدالة بدون `return` تُرجع `undefined`. ويمكنك إعطاء المعاملات قيمًا افتراضية: `function greet(name = \"friend\") { ... }` فتُستخدم إذا لم يُمرَّر شيء.",
        en: "A function without `return` gives back `undefined`. You can give parameters default values: `function greet(name = \"friend\") { ... }` is used when nothing is passed.",
      },
      {
        icon: "🧩",
        ar: "الدوال في JavaScript **قيم** مثل الأرقام: تُخزَّن في متغير وتُمرَّر لدالة أخرى، كما في `addEventListener` و `map`. اجعل كل دالة تقوم **بمهمة واحدة** وسمِّها بفعل واضح مثل `calculateTotal`.",
        en: "Functions in JavaScript are **values** like numbers: store them in variables and pass them to other functions, as with `addEventListener` and `map`. Keep each function to **one job** and name it with a clear verb like `calculateTotal`.",
      },
    ],
    mistakes: [
      {
        ar: "طباعة النتيجة داخل الدالة بدل إرجاعها → `add(2, 3)` تُرجع `undefined` ولا يمكن استخدامها لاحقًا. استخدم `return a + b;`.",
        en: "Printing inside the function instead of returning → `add(2, 3)` gives `undefined` and can't be reused. Use `return a + b;`.",
      },
      {
        ar: "نسيان الأقواس عند الاستدعاء مثل `console.log(greet)` → يطبع الدالة نفسها لا نتيجتها. اكتب `greet(\"Sara\")`.",
        en: "Forgetting the parentheses when calling, like `console.log(greet)` → prints the function itself, not its result. Write `greet(\"Sara\")`.",
      },
      {
        ar: "إضافة `{ }` لدالة سهمية دون `return` مثل `(a, b) => { a + b }` → تُرجع `undefined`. احذف الأقواس `(a, b) => a + b` أو أضف `return`.",
        en: "Adding `{ }` to an arrow function without `return`, like `(a, b) => { a + b }` → returns `undefined`. Drop the braces, `(a, b) => a + b`, or add `return`.",
      },
    ],
  },

  "javascript/arrays-loops": {
    more: [
      {
        icon: "🔗",
        ar: "المتغير لا يحمل المصفوفة نفسها بل **مرجعًا** (reference) إليها. لذلك `const b = a;` لا تنسخ شيئًا: تعديل `b` يعدّل `a` أيضًا. وبالمثل `[1] === [1]` نتيجتها `false` لأنهما مصفوفتان مختلفتان في الذاكرة.",
        en: "A variable doesn't hold the array itself but a **reference** to it. So `const b = a;` copies nothing: changing `b` changes `a` too. Likewise `[1] === [1]` is `false`, because they're two different arrays in memory.",
      },
      {
        icon: "🎯",
        ar: "للوصول إلى آخر عنصر استخدم `fruits.at(-1)` بدل `fruits[fruits.length - 1]`. وقراءة رقم غير موجود مثل `fruits[10]` لا تسبب خطأ، بل تُرجع `undefined` بهدوء.",
        en: "To get the last item use `fruits.at(-1)` instead of `fruits[fruits.length - 1]`. Reading a missing index like `fruits[10]` doesn't throw; it quietly returns `undefined`.",
      },
      {
        icon: "🛑",
        ar: "`for...of` تسمح لك بالخروج من الحلقة بـ `break` أو تخطي عنصر بـ `continue`، أما `map` فتمر على كل العناصر دائمًا. استخدم `map` عندما تريد مصفوفة جديدة، و `for...of` عندما تريد فقط **فعل** شيء لكل عنصر.",
        en: "`for...of` lets you leave the loop with `break` or skip an item with `continue`, while `map` always visits every item. Use `map` when you want a new array, and `for...of` when you just want to **do** something per item.",
      },
    ],
    mistakes: [
      {
        ar: "البدء بالعدّ من 1: كتابة `fruits[1]` للحصول على أول عنصر → تحصل على الثاني. أول عنصر هو `fruits[0]` وآخره `fruits[fruits.length - 1]`.",
        en: "Counting from 1: using `fruits[1]` for the first item → you get the second. The first is `fruits[0]` and the last is `fruits[fruits.length - 1]`.",
      },
      {
        ar: "استخدام `for...in` بدل `for...of` مع المصفوفات → تحصل على الأرقام (المفاتيح) كنصوص لا على القيم. استخدم `for (const item of list)`.",
        en: "Using `for...in` instead of `for...of` on arrays → you get the indexes as strings, not the values. Use `for (const item of list)`.",
      },
      {
        ar: "استدعاء `map` دون استخدام نتيجتها مثل `nums.map(n => n * 2);` وحدها → المصفوفة الأصلية لا تتغير. احفظ الناتج: `const doubled = nums.map(n => n * 2);`.",
        en: "Calling `map` and ignoring its result, like `nums.map(n => n * 2);` on its own → the original array doesn't change. Store it: `const doubled = nums.map(n => n * 2);`.",
      },
    ],
  },

  "javascript/array-methods": {
    more: [
      {
        icon: "🔗",
        ar: "لأن `filter` و `map` تُرجعان مصفوفات جديدة، يمكنك **سلسلتها**: `items.filter(i => i.price < 40).map(i => i.name)`. كل خطوة تقرأ مثل جملة واضحة.",
        en: "Since `filter` and `map` return new arrays, you can **chain** them: `items.filter(i => i.price < 40).map(i => i.name)`. Each step reads like a clear sentence.",
      },
      {
        icon: "🪞",
        ar: "النسخ بـ `...` **سطحي** (shallow): الكائنات الموجودة داخل المصفوفة لا تُنسخ، بل يُنسخ مرجعها فقط. للنسخ العميق الكامل استخدم `structuredClone(obj)`.",
        en: "Copying with `...` is **shallow**: objects nested inside aren't duplicated, only their references are. For a full deep copy use `structuredClone(obj)`.",
      },
      {
        icon: "🧷",
        ar: "بعض الدوال **تعدّل الأصل** مثل `sort` و `reverse` و `push`. الإصدارات الحديثة أضافت بدائل آمنة تُرجع نسخة جديدة: `toSorted()` و `toReversed()`، وهي مهمة جدًا في React.",
        en: "Some methods **mutate the original**, like `sort`, `reverse` and `push`. Modern JavaScript added safe versions that return a new copy: `toSorted()` and `toReversed()`, which matter a lot in React.",
      },
    ],
    mistakes: [
      {
        ar: "نسيان القيمة الابتدائية في `reduce` مثل `items.reduce((sum, i) => sum + i.price)` → أول `sum` يصبح كائنًا وتحصل على نص غريب. أضف `0` في النهاية.",
        en: "Forgetting the starting value in `reduce`, like `items.reduce((sum, i) => sum + i.price)` → the first `sum` is an object and you get odd text. Add `0` at the end.",
      },
      {
        ar: "استخدام نتيجة `find` مباشرة مثل `items.find(...).name` → إذا لم يوجد تطابق تُرجع `undefined` ويحدث خطأ. تحقّق أولًا أو استخدم `?.name`.",
        en: "Using `find`'s result directly, like `items.find(...).name` → if nothing matches it returns `undefined` and crashes. Check first, or use `?.name`.",
      },
      {
        ar: "ترتيب الأرقام بـ `nums.sort()` وحدها → تُرتَّب كنصوص فيأتي `10` قبل `9`. مرّر دالة مقارنة: `nums.toSorted((a, b) => a - b)`.",
        en: "Sorting numbers with plain `nums.sort()` → they're sorted as text, so `10` comes before `9`. Pass a compare function: `nums.toSorted((a, b) => a - b)`.",
      },
    ],
  },

  "javascript/objects": {
    more: [
      {
        icon: "🔑",
        ar: "عندما يكون اسم الخاصية داخل متغير، استخدم **الأقواس المربعة**: `user[key]`. الكتابة `user.key` تبحث عن خاصية اسمها حرفيًا \"key\".",
        en: "When a property name is stored in a variable, use **bracket notation**: `user[key]`. Writing `user.key` looks for a property literally named \"key\".",
      },
      {
        icon: "🛟",
        ar: "قراءة خاصية غير موجودة تُرجع `undefined`، لكن قراءة خاصية **داخلها** تسبب خطأ. علامة `?.` تحميك: `user.address?.city` تُرجع `undefined` بدل أن تتعطل.",
        en: "Reading a missing property returns `undefined`, but reading a property **of** it throws. The `?.` operator protects you: `user.address?.city` returns `undefined` instead of crashing.",
      },
      {
        icon: "🗂️",
        ar: "للمرور على كل الخصائص استخدم `Object.keys(user)` أو `Object.entries(user)` التي تُرجع أزواج [اسم، قيمة]. وفي التفكيك يمكنك إعادة التسمية ووضع قيمة افتراضية: `const { name: fullName, city = \"Unknown\" } = user;`.",
        en: "To go through every property use `Object.keys(user)` or `Object.entries(user)`, which returns [name, value] pairs. Destructuring can also rename and set defaults: `const { name: fullName, city = \"Unknown\" } = user;`.",
      },
    ],
    mistakes: [
      {
        ar: "نسخ كائن بـ `const copy = user;` ثم تعديله → الأصل يتغير أيضًا لأن الاثنين يشيران لنفس الكائن. انسخه فعليًا: `const copy = { ...user };`.",
        en: "Copying with `const copy = user;` then editing → the original changes too, since both point to the same object. Make a real copy: `const copy = { ...user };`.",
      },
      {
        ar: "استخدام `=` بدل `:` داخل الكائن مثل `{ name = \"Sara\" }` → خطأ في الصياغة. داخل الكائن نكتب `{ name: \"Sara\" }`.",
        en: "Using `=` instead of `:` inside an object, like `{ name = \"Sara\" }` → syntax error. Inside an object write `{ name: \"Sara\" }`.",
      },
      {
        ar: "طباعة كائن داخل نص مثل `\"User: \" + user` → يظهر `[object Object]`. اطبع خاصية محددة مثل `user.name` أو استخدم `JSON.stringify(user)`.",
        en: "Putting an object inside text, like `\"User: \" + user` → shows `[object Object]`. Print a specific property like `user.name`, or use `JSON.stringify(user)`.",
      },
    ],
  },

  "javascript/classes": {
    more: [
      {
        icon: "🧬",
        ar: "تحت الغطاء، `class` ما زالت تستخدم نظام **prototype**: الدوال تُخزَّن مرة واحدة ويتشاركها كل الكائنات. لذلك ألف حساب بنكي لا تحمل ألف نسخة من `deposit`.",
        en: "Under the hood, `class` still uses **prototypes**: methods are stored once and shared by every instance. So a thousand bank accounts don't carry a thousand copies of `deposit`.",
      },
      {
        icon: "🌳",
        ar: "الوراثة بـ `extends` تبني صنفًا على آخر: `class SavingsAccount extends Account`. وداخل `constructor` الابن يجب استدعاء `super(owner)` قبل استخدام `this`.",
        en: "Inheritance with `extends` builds one class on another: `class SavingsAccount extends Account`. In the child's `constructor` you must call `super(owner)` before touching `this`.",
      },
      {
        icon: "🏛️",
        ar: "`static` تجعل الدالة تابعة للصنف نفسه لا للكائنات: `Account.compare(a, b)`. والعرف المتبع أن يبدأ اسم الصنف بحرف كبير `Account`، بينما الكائنات بحرف صغير `account`.",
        en: "`static` attaches a method to the class itself, not to instances: `Account.compare(a, b)`. By convention class names start with a capital, `Account`, while instances are lowercase, `account`.",
      },
    ],
    mistakes: [
      {
        ar: "نسيان `new` مثل `const c = Counter();` → خطأ `Class constructor cannot be invoked without 'new'`. اكتب `new Counter()`.",
        en: "Forgetting `new`, like `const c = Counter();` → `Class constructor cannot be invoked without 'new'`. Write `new Counter()`.",
      },
      {
        ar: "نسيان `this.` داخل الدوال مثل `#count++` أو `owner` وحدها → خطأ أو متغير غير معرّف. اكتب `this.#count++` و `this.owner`.",
        en: "Forgetting `this.` inside methods, like `#count++` or a bare `owner` → syntax error or undefined variable. Write `this.#count++` and `this.owner`.",
      },
      {
        ar: "استدعاء الـ getter كدالة مثل `c.value()` → خطأ لأن `value` ليست دالة. الـ getter يُقرأ كخاصية: `c.value`.",
        en: "Calling a getter like a function, `c.value()` → error, since `value` isn't a function. A getter is read like a property: `c.value`.",
      },
    ],
  },

  "javascript/errors": {
    more: [
      {
        icon: "🏷️",
        ar: "الأخطاء لها أنواع: `TypeError` عند استخدام قيمة بشكل خاطئ (مثل قراءة خاصية من `undefined`)، و `ReferenceError` عند استخدام اسم غير معرّف. ويمكنك فحص النوع بـ `error instanceof TypeError`.",
        en: "Errors come in types: `TypeError` when a value is misused (like reading a property of `undefined`), and `ReferenceError` when a name isn't defined. Check the type with `error instanceof TypeError`.",
      },
      {
        icon: "🪜",
        ar: "الخطأ **يصعد** عبر الدوال: إذا رمت دالة خطأ ولم تلتقطه، يصعد إلى من استدعاها حتى يجد `catch`. لذلك التقط الخطأ في المكان الذي تعرف فيه **ماذا تفعل** به، لا في كل دالة.",
        en: "An error **bubbles up** through functions: if one throws and doesn't catch, it rises to its caller until a `catch` handles it. So catch errors where you know **what to do** with them, not in every function.",
      },
      {
        icon: "🎯",
        ar: "`try/catch` يلتقط فقط أخطاء **وقت التشغيل**، أما خطأ الصياغة (مثل قوس ناقص) فيمنع الملف كله من العمل. ومع الكود غير المتزامن ضع `await` داخل `try` وإلا لن يُلتقط الخطأ.",
        en: "`try/catch` only catches **runtime** errors; a syntax error (like a missing bracket) stops the whole file from running. With async code, put the `await` inside the `try` or the error won't be caught.",
      },
    ],
    mistakes: [
      {
        ar: "رمي نص بدل كائن خطأ مثل `throw \"bad age\"` → لا يوجد `error.message` ولا معلومات عن مكان الخطأ. استخدم `throw new Error(\"bad age\")`.",
        en: "Throwing a plain string, like `throw \"bad age\"` → there's no `error.message` and no stack trace. Use `throw new Error(\"bad age\")`.",
      },
      {
        ar: "ترك `catch` فارغًا `catch (e) { }` → الخطأ يختفي بصمت ولا تعرف لماذا لا يعمل البرنامج. على الأقل اطبعه بـ `console.error(e)` أو أظهر رسالة للمستخدم.",
        en: "Leaving `catch` empty, `catch (e) { }` → the error vanishes silently and you won't know why things break. At least log it with `console.error(e)` or show the user a message.",
      },
      {
        ar: "التحقق من الرقم بـ `age === NaN` → النتيجة `false` دائمًا لأن `NaN` لا يساوي نفسه. استخدم `Number.isNaN(age)`.",
        en: "Checking a number with `age === NaN` → always `false`, since `NaN` isn't equal to itself. Use `Number.isNaN(age)`.",
      },
    ],
  },

  "javascript/dom-events": {
    more: [
      {
        icon: "🫧",
        ar: "الأحداث **تصعد** (bubbling) من العنصر الذي ضُغط إلى آبائه. لذلك يمكن وضع مستمع واحد على القائمة كلها ومعرفة العنصر المضغوط من `event.target`، وهذا يسمى **event delegation**.",
        en: "Events **bubble** from the clicked element up through its parents. So you can put one listener on a whole list and find the clicked item via `event.target`; this is **event delegation**.",
      },
      {
        icon: "🛡️",
        ar: "`textContent` يضع نصًا عاديًا وهو آمن، أما `innerHTML` فيفسّر النص كـ HTML. إذا وضعت فيه كلامًا كتبه المستخدم قد يُنفَّذ كود خبيث (XSS)، فاستخدم `textContent` للنصوص.",
        en: "`textContent` sets plain text and is safe, while `innerHTML` parses the text as HTML. Putting user-typed text in it can run malicious code (XSS), so use `textContent` for text.",
      },
      {
        icon: "📮",
        ar: "دالة المستمع تستقبل كائن **الحدث**: `(event) => { ... }`. ومع النماذج استدعِ `event.preventDefault()` لمنع إعادة تحميل الصفحة عند الإرسال.",
        en: "The listener receives an **event** object: `(event) => { ... }`. With forms, call `event.preventDefault()` to stop the page from reloading on submit.",
      },
    ],
    mistakes: [
      {
        ar: "نسيان `#` أو `.` في المحدد مثل `querySelector(\"btn\")` → يبحث عن وسم اسمه btn فيُرجع `null`. اكتب `\"#btn\"` للـ id و `\".btn\"` للـ class.",
        en: "Forgetting `#` or `.` in the selector, like `querySelector(\"btn\")` → it looks for a tag named btn and returns `null`. Write `\"#btn\"` for an id and `\".btn\"` for a class.",
      },
      {
        ar: "استدعاء الدالة بدل تمريرها مثل `addEventListener(\"click\", sayHi())` → تعمل فورًا مرة واحدة ولا تعمل عند الضغط. مرّرها بدون أقواس: `sayHi`.",
        en: "Calling the function instead of passing it, like `addEventListener(\"click\", sayHi())` → it runs once immediately, not on click. Pass it without parentheses: `sayHi`.",
      },
      {
        ar: "أخطاء حالة الأحرف مثل `addEventlistener` أو `queryselector` أو `\"Click\"` → الدالة غير موجودة أو الحدث لا يحدث. الصحيح: `addEventListener` و `querySelector` و `\"click\"` بأحرف صغيرة.",
        en: "Casing slips like `addEventlistener`, `queryselector` or `\"Click\"` → the method doesn't exist or the event never fires. Correct: `addEventListener`, `querySelector` and lowercase `\"click\"`.",
      },
    ],
  },

  "javascript/async-await": {
    more: [
      {
        icon: "🔁",
        ar: "JavaScript تنفّذ شيئًا واحدًا في كل لحظة. الأعمال البطيئة يتولاها المتصفح، وعند انتهائها توضع في طابور، ثم تأخذها **حلقة الأحداث** (event loop) عندما يفرغ الكود الحالي. لذلك `await` لا تجمّد الصفحة.",
        en: "JavaScript runs one thing at a time. Slow work is handed to the browser, and when it finishes it's queued; the **event loop** picks it up once the current code is done. That's why `await` doesn't freeze the page.",
      },
      {
        icon: "🏎️",
        ar: "`await` المتتالية تنتظر واحدة بعد الأخرى. إذا كانت الطلبات مستقلة شغّلها معًا: `const [a, b] = await Promise.all([fetch(u1), fetch(u2)]);` فتوفّر الوقت.",
        en: "Consecutive `await`s run one after another. If requests are independent, run them together: `const [a, b] = await Promise.all([fetch(u1), fetch(u2)]);` to save time.",
      },
      {
        icon: "📬",
        ar: "الدالة `async` تُرجع دائمًا **Promise**، حتى لو كتبت `return 5`. لذلك من يستدعيها يحتاج `await` أيضًا للحصول على القيمة. وفي ملفات الوحدات (modules) يمكن استخدام `await` في المستوى الأعلى مباشرة.",
        en: "An `async` function always returns a **Promise**, even if you write `return 5`. So its caller also needs `await` to get the value. In module files you can use `await` at the top level directly.",
      },
    ],
    mistakes: [
      {
        ar: "استخدام `await` داخل دالة عادية → خطأ في الصياغة. أضف `async` قبل الدالة: `async function load() { ... }`.",
        en: "Using `await` inside a normal function → syntax error. Mark the function `async`: `async function load() { ... }`.",
      },
      {
        ar: "نسيان `await` مثل `const data = res.json();` → تحصل على Promise معلّق لا على البيانات. اكتب `const data = await res.json();`.",
        en: "Forgetting `await`, like `const data = res.json();` → you get a pending Promise, not the data. Write `const data = await res.json();`.",
      },
      {
        ar: "استخدام `await` داخل `forEach` وتوقّع الانتظار → `forEach` لا تنتظر الـ Promise. استخدم حلقة `for...of` مع `await` بداخلها.",
        en: "Using `await` inside `forEach` and expecting it to wait → `forEach` ignores Promises. Use a `for...of` loop with `await` inside.",
      },
    ],
  },

  "javascript/fetch-json": {
    more: [
      {
        icon: "🚦",
        ar: "`fetch` لا ترمي خطأ عند ردود مثل 404 أو 500، بل فقط عند فشل الشبكة نفسها. لهذا يجب فحص `res.ok` أو `res.status` بنفسك وإظهار رسالة مناسبة.",
        en: "`fetch` doesn't throw on responses like 404 or 500, only when the network itself fails. That's why you must check `res.ok` or `res.status` yourself and show a fitting message.",
      },
      {
        icon: "📤",
        ar: "لإرسال بيانات إلى الخادم استخدم الخيارات: `fetch(url, { method: \"POST\", headers: { \"Content-Type\": \"application/json\" }, body: JSON.stringify(data) })`. الـ `body` يجب أن يكون نصًا لا كائنًا.",
        en: "To send data to a server, pass options: `fetch(url, { method: \"POST\", headers: { \"Content-Type\": \"application/json\" }, body: JSON.stringify(data) })`. The `body` must be text, not an object.",
      },
      {
        icon: "📄",
        ar: "JSON أكثر صرامة من كائنات JavaScript: المفاتيح بين علامتي تنصيص مزدوجة دائمًا، ولا تعليقات ولا فاصلة زائدة في النهاية. `JSON.parse` يحوّل النص إلى كائن و `JSON.stringify` يعكس ذلك.",
        en: "JSON is stricter than JavaScript objects: keys always in double quotes, no comments, no trailing commas. `JSON.parse` turns text into an object and `JSON.stringify` does the reverse.",
      },
    ],
    mistakes: [
      {
        ar: "قراءة `res.data` أو `res.users` مباشرة → قيمتها `undefined` لأن `res` هو الرد وليس البيانات. حوّله أولًا: `const users = await res.json();`.",
        en: "Reading `res.data` or `res.users` directly → it's `undefined`, because `res` is the response, not the data. Parse it first: `const users = await res.json();`.",
      },
      {
        ar: "استخدام البيانات خارج الدالة `async` قبل وصولها → المتغير ما زال فارغًا. ضع كل ما يعتمد على البيانات **بعد** `await` داخل الدالة.",
        en: "Using the data outside the `async` function before it arrives → the variable is still empty. Put everything that needs the data **after** the `await`, inside the function.",
      },
      {
        ar: "كتابة `JSON.Parse` أو `res.JSON()` بحالة أحرف خاطئة → الدالة غير موجودة. الصحيح `JSON.parse` و `res.json()`.",
        en: "Writing `JSON.Parse` or `res.JSON()` with the wrong casing → the method doesn't exist. Correct: `JSON.parse` and `res.json()`.",
      },
    ],
  },

  "javascript/modules-tooling": {
    more: [
      {
        icon: "🧳",
        ar: "كل وحدة لها **نطاق خاص** بها: المتغيرات لا تتسرب إلى الملفات الأخرى إلا إذا صدّرتها. وفي المتصفح بدون أدوات، تحتاج `<script type=\"module\" src=\"app.js\">` لتعمل `import`.",
        en: "Every module has its **own scope**: variables don't leak into other files unless exported. In a browser without tools, you need `<script type=\"module\" src=\"app.js\">` for `import` to work.",
      },
      {
        icon: "🎁",
        ar: "هناك نوعان من التصدير: **المسمّى** `export function sum` ويُستورد بالأقواس `{ sum }`، و**الافتراضي** `export default` ويُستورد بأي اسم بدون أقواس. الملف يمكن أن يحتوي تصديرًا افتراضيًا واحدًا فقط.",
        en: "There are two kinds of export: **named**, `export function sum`, imported with braces `{ sum }`, and **default**, `export default`, imported under any name without braces. A file can have only one default export.",
      },
      {
        icon: "🔐",
        ar: "ملف `package-lock.json` يحفظ الإصدارات الدقيقة لكل مكتبة كي يحصل الجميع على نفس النسخ، فارفعه إلى Git. أما مجلد `node_modules` فلا ترفعه أبدًا: يُعاد بناؤه بـ `npm install`.",
        en: "`package-lock.json` records the exact version of every library so everyone gets the same code; commit it to Git. Never commit `node_modules`: it's rebuilt with `npm install`.",
      },
    ],
    mistakes: [
      {
        ar: "حذف امتداد الملف أو `./` مثل `import { sum } from \"math\"` → المتصفح يظنها مكتبة من npm. للملفات المحلية اكتب المسار كاملًا: `\"./math.js\"`.",
        en: "Dropping the extension or the `./`, like `import { sum } from \"math\"` → it's treated as an npm package. For local files write the full path: `\"./math.js\"`.",
      },
      {
        ar: "الخلط بين التصدير المسمّى والافتراضي: `import sum from \"./math.js\"` بينما الملف يصدّر `export function sum` → تحصل على خطأ. استخدم الأقواس `{ sum }`.",
        en: "Mixing named and default exports: `import sum from \"./math.js\"` when the file has `export function sum` → you get an error. Use braces: `{ sum }`.",
      },
      {
        ar: "فتح ملف `index.html` مباشرة بنقرتين مع وجود `import` → معظم المتصفحات تمنع الوحدات من `file://`. شغّل خادم تطوير مثل `npm run dev`.",
        en: "Double-clicking `index.html` when it uses `import` → most browsers block modules over `file://`. Run a dev server like `npm run dev`.",
      },
    ],
  },
};
