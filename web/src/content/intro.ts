import type { Lesson } from "./types";

/** The "Start here" stage: reading lessons that end with a short quiz, no editor yet. */
export const introLessons: Lesson[] = [
  {
    slug: "how-the-web-works",
    title: { ar: "كيف يعمل الويب؟", en: "How does the web work?" },
    body: [
      {
        icon: "🌍",
        ar: "عندما تكتب عنوان موقع في المتصفح، يطلب **المتصفح** (Chrome أو Safari) ملفات الصفحة من **خادم** (server) بعيد، ثم يعرضها لك.",
        en: "When you type a website address, the **browser** (Chrome, Safari) asks a remote **server** for the page's files, then shows them to you.",
      },
      {
        icon: "🏠",
        ar: "كل صفحة ويب تُبنى بثلاث لغات، مثل البيت: **HTML** هي الجدران والغرف (الهيكل)، و **CSS** هي الطلاء والديكور (الشكل)، و **JavaScript** هي الكهرباء والأزرار (التفاعل).",
        en: "Every web page is built with three languages, like a house: **HTML** is the walls and rooms (structure), **CSS** is the paint and decor (look), and **JavaScript** is the electricity and switches (behaviour).",
      },
      {
        icon: "🎨",
        ar: "الواجهة الأمامية (**Frontend**) هي ما تراه وتلمسه في المتصفح. الواجهة الخلفية (**Backend**) تعمل على الخادم: تحفظ الحسابات وقواعد البيانات وترسل البيانات.",
        en: "The **frontend** is what you see and touch in the browser. The **backend** runs on the server: it stores accounts and databases and sends data.",
      },
      {
        icon: "📱",
        ar: "تطبيقات الموبايل تستخدم نفس الأفكار. بعد الويب ستتعلم React Native لتبني تطبيقًا واحدًا يعمل على Android و iOS.",
        en: "Mobile apps use the same ideas. After the web you'll learn React Native to build one app for Android and iOS.",
      },
    ],
    files: [],
    starter: {},
    solution: {},
    tasks: [],
    hints: [],
    quiz: [
      {
        id: "q1",
        prompt: { ar: "أي لغة مسؤولة عن **شكل** الصفحة وألوانها؟", en: "Which language controls a page's **look** and colors?" },
        options: [
          { ar: "HTML", en: "HTML" },
          { ar: "CSS", en: "CSS" },
          { ar: "JavaScript", en: "JavaScript" },
        ],
        answer: 1,
      },
      {
        id: "q2",
        prompt: { ar: "زر يفتح قائمة عند الضغط عليه يحتاج إلى:", en: "A button that opens a menu when tapped needs:" },
        options: [
          { ar: "JavaScript", en: "JavaScript" },
          { ar: "HTML وحدها", en: "HTML alone" },
          { ar: "خادم فقط", en: "Only a server" },
        ],
        answer: 0,
      },
      {
        id: "q3",
        prompt: { ar: "أين تُحفظ كلمات مرور المستخدمين؟", en: "Where are users' passwords stored?" },
        options: [
          { ar: "في الواجهة الأمامية (Frontend)", en: "In the frontend" },
          { ar: "في الواجهة الخلفية (Backend)", en: "In the backend" },
          { ar: "في ملف CSS", en: "In a CSS file" },
        ],
        answer: 1,
      },
    ],
    xp: 15,
  },
  {
    slug: "think-like-a-programmer",
    title: { ar: "كيف تفكر كمبرمج", en: "Think like a programmer" },
    body: [
      {
        icon: "🧠",
        ar: "البرمجة ليست حفظ أوامر، بل **حل مشكلات**. الكمبيوتر سريع جدًا لكنه لا يفهم إلا التعليمات الدقيقة خطوة بخطوة.",
        en: "Programming isn't memorizing commands, it's **solving problems**. A computer is very fast but only understands precise, step-by-step instructions.",
      },
      {
        icon: "🧩",
        ar: "**1. التقسيم:** قسّم المشكلة الكبيرة إلى مشكلات صغيرة. «صفحة شخصية» = عنوان + صورة + نبذة + روابط. كل جزء سهل وحده.",
        en: "**1. Break it down:** split a big problem into small ones. \"A profile page\" = heading + photo + bio + links. Each piece is easy on its own.",
      },
      {
        icon: "📝",
        ar: "**2. الخوارزمية:** اكتب الخطوات بلغتك قبل الكود. مثلًا لتحضير الشاي: اغلِ الماء ← ضع الشاي ← انتظر 3 دقائق ← اسكب. هذا يسمى **pseudocode**.",
        en: "**2. Algorithm:** write the steps in plain words before the code. Making tea: boil water → add tea → wait 3 minutes → pour. This is called **pseudocode**.",
      },
      {
        icon: "🔁",
        ar: "**3. الأنماط:** إذا كررت نفس الشيء كثيرًا، فهناك طريقة لكتابته مرة واحدة (حلقة، دالة، class). المبرمج الجيد كسول بذكاء.",
        en: "**3. Patterns:** if you repeat the same thing, there's a way to write it once (a loop, a function, a class). Good programmers are smartly lazy.",
      },
      {
        icon: "🐞",
        ar: "**4. الأخطاء طبيعية:** كل مبرمج يرى الأخطاء يوميًا. اقرأ رسالة الخطأ، غيّر شيئًا واحدًا، وجرّب مجددًا. هذا يسمى **debugging**.",
        en: "**4. Bugs are normal:** every programmer sees errors daily. Read the error, change one thing, try again. This is called **debugging**.",
      },
    ],
    files: [],
    starter: {},
    solution: {},
    tasks: [],
    hints: [],
    quiz: [
      {
        id: "q1",
        prompt: { ar: "ما أول ما تفعله أمام مشكلة كبيرة؟", en: "What do you do first with a big problem?" },
        options: [
          { ar: "أكتب كل الكود دفعة واحدة", en: "Write all the code at once" },
          { ar: "أقسّمها إلى أجزاء صغيرة", en: "Break it into small parts" },
          { ar: "أبحث عن تطبيق جاهز", en: "Look for a ready-made app" },
        ],
        answer: 1,
      },
      {
        id: "q2",
        prompt: { ar: "ظهر خطأ في الكود. ما التصرف الصحيح؟", en: "Your code shows an error. What's the right move?" },
        options: [
          { ar: "أحذف كل شيء وأبدأ من جديد", en: "Delete everything and start over" },
          { ar: "أقرأ رسالة الخطأ وأغيّر شيئًا واحدًا", en: "Read the error and change one thing" },
          { ar: "أتوقف عن البرمجة", en: "Give up programming" },
        ],
        answer: 1,
      },
      {
        id: "q3",
        prompt: { ar: "كتابة الخطوات بلغتك قبل الكود تسمى:", en: "Writing the steps in plain words before coding is called:" },
        options: [
          { ar: "pseudocode", en: "pseudocode" },
          { ar: "debugging", en: "debugging" },
          { ar: "CSS", en: "CSS" },
        ],
        answer: 0,
      },
    ],
    xp: 15,
  },
  {
    slug: "your-tools",
    title: { ar: "جهّز أدواتك: المحرر والمتصفح", en: "Set up your tools: editor and browser" },
    body: [
      {
        icon: "💻",
        ar: "تكتب الكود في **محرر أكواد**. أشهرها وأفضلها مجانًا هو **Visual Studio Code**. حمّله من الموقع الرسمي `code.visualstudio.com` لنظام Windows أو Mac أو Linux.",
        en: "You write code in a **code editor**. The most popular free one is **Visual Studio Code**. Download it from the official site `code.visualstudio.com` for Windows, Mac or Linux.",
      },
      {
        icon: "📁",
        ar: "أنشئ مجلدًا لمشروعك، مثلًا `my-site`، ثم افتحه في VS Code من **File ← Open Folder**. كل ملفات موقعك تكون داخل هذا المجلد.",
        en: "Create a folder for your project, like `my-site`, then open it in VS Code with **File → Open Folder**. All your site's files live in this folder.",
      },
      {
        icon: "📄",
        ar: "أنشئ ملفًا باسم `index.html`. الامتداد `.html` يخبر الجهاز أنه صفحة ويب. اسم `index` له معنى خاص: هو الصفحة الأولى التي يفتحها الخادم تلقائيًا.",
        en: "Create a file named `index.html`. The `.html` extension tells the computer it's a web page. The name `index` is special: it's the first page a server opens by default.",
      },
      {
        icon: "✍️",
        ar: "قواعد تسمية الملفات: حروف إنجليزية صغيرة، بدون مسافات (استخدم `-` بدلها)، مثل `about-me.html` و `style.css` و `script.js`.",
        en: "File naming rules: lowercase English letters, no spaces (use `-` instead), like `about-me.html`, `style.css` and `script.js`.",
      },
      {
        icon: "🌐",
        ar: "لفتح صفحتك: انقر على `index.html` مرتين فتفتح في المتصفح. والأفضل: ثبّت إضافة **Live Server** في VS Code، فتتحدّث الصفحة تلقائيًا كلما حفظت الملف.",
        en: "To open your page, double-click `index.html` and it opens in the browser. Better: install the **Live Server** extension in VS Code so the page refreshes every time you save.",
      },
      {
        icon: "📲",
        ar: "لا تملك حاسوبًا الآن؟ لا مشكلة: محرر Code Master يعمل داخل التطبيق، وستكتب فيه كل التمارين.",
        en: "No computer right now? No problem: the Code Master editor runs inside the app, and you'll do every exercise in it.",
      },
    ],
    modern: {
      old: "Notepad / Dreamweaver",
      now: "VS Code + Live Server",
      text: {
        ar: "محررات اليوم تكمل الكود تلقائيًا، وتلوّنه، وتكتشف الأخطاء، وتدعم Emmet جاهزًا.",
        en: "Today's editors autocomplete, color your code, catch mistakes and ship with Emmet built in.",
      },
    },
    files: [],
    starter: {},
    solution: {},
    tasks: [],
    hints: [],
    quiz: [
      {
        id: "q1",
        prompt: { ar: "ما الاسم الأفضل للصفحة الرئيسية لموقعك؟", en: "What's the best name for your site's main page?" },
        options: [
          { ar: "`My Page.HTML`", en: "`My Page.HTML`" },
          { ar: "`index.html`", en: "`index.html`" },
          { ar: "`home.txt`", en: "`home.txt`" },
        ],
        answer: 1,
      },
      {
        id: "q2",
        prompt: { ar: "أي اسم ملف مكتوب بطريقة صحيحة؟", en: "Which file name follows the rules?" },
        options: [
          { ar: "`about me.html`", en: "`about me.html`" },
          { ar: "`About_Me.HTML`", en: "`About_Me.HTML`" },
          { ar: "`about-me.html`", en: "`about-me.html`" },
        ],
        answer: 2,
      },
      {
        id: "q3",
        prompt: { ar: "ما فائدة إضافة Live Server؟", en: "What does the Live Server extension do?" },
        options: [
          { ar: "تحدّث الصفحة تلقائيًا عند الحفظ", en: "Refreshes the page automatically on save" },
          { ar: "تكتب الكود بدلًا منك", en: "Writes the code for you" },
          { ar: "تنشر الموقع على الإنترنت", en: "Publishes the site online" },
        ],
        answer: 0,
      },
    ],
    xp: 15,
  },
];
