import type { Exam, Lesson } from "./types";

/** Git and GitHub: reading lessons that end with quizzes; commands are drilled in challenges. */
const reading = (l: Omit<Lesson, "files" | "starter" | "solution" | "tasks" | "hints">): Lesson => ({
  ...l,
  files: [],
  starter: {},
  solution: {},
  tasks: [],
  hints: [],
});

export const gitLessons: Lesson[] = [
  reading({
    slug: "why-git",
    title: { ar: "لماذا Git؟ التحكم في النسخ", en: "Why Git? Version control" },
    body: [
      { icon: "💾", ar: "**Git** يحفظ تاريخ مشروعك كله: كل تغيير، متى، ولماذا. إذا أفسدت شيئًا تعود لأي نسخة سابقة في ثوانٍ.", en: "**Git** keeps your project's whole history: every change, when, and why. Break something and you're back to any earlier version in seconds." },
      { icon: "📸", ar: "كل حفظ يسمى **commit**: صورة للمشروع في لحظة معيّنة مع رسالة تصف ما تغيّر، مثل `Add contact form`.", en: "Each save is a **commit**: a snapshot of the project at a moment, with a message describing the change, like `Add contact form`." },
      { icon: "🌍", ar: "**GitHub** موقع يستضيف مشاريع Git على الإنترنت: نسخة احتياطية، تعاون مع فريق، و**Portfolio** يراه أصحاب العمل. كل الشركات تقريبًا تستخدم Git.", en: "**GitHub** hosts Git projects online: a backup, teamwork, and a **portfolio** employers look at. Nearly every company uses Git." },
      { icon: "⬇️", ar: "ثبّت Git من `git-scm.com`، ثم عرّف نفسك مرة واحدة: `git config --global user.name \"Your Name\"` و `git config --global user.email \"you@example.com\"`.", en: "Install Git from `git-scm.com`, then introduce yourself once: `git config --global user.name \"Your Name\"` and `git config --global user.email \"you@example.com\"`." },
    ],
    quiz: [
      { id: "q1", prompt: { ar: "ما هو الـ commit؟", en: "What is a commit?" }, options: [{ ar: "صورة محفوظة للمشروع مع رسالة", en: "A saved snapshot of the project with a message" }, { ar: "موقع لاستضافة الكود", en: "A site that hosts code" }, { ar: "خطأ في الكود", en: "A bug in the code" }], answer: 0 },
      { id: "q2", prompt: { ar: "ما الفرق بين Git و GitHub؟", en: "What's the difference between Git and GitHub?" }, options: [{ ar: "لا فرق", en: "No difference" }, { ar: "Git أداة على حاسوبك، GitHub موقع يستضيف المشاريع", en: "Git is a tool on your computer, GitHub is a site that hosts projects" }, { ar: "GitHub لغة برمجة", en: "GitHub is a programming language" }], answer: 1 },
    ],
    xp: 15,
  }),
  reading({
    slug: "first-commits",
    title: { ar: "أول commit: init و add و commit", en: "First commits: init, add and commit" },
    body: [
      { icon: "🎬", ar: "داخل مجلد مشروعك اكتب في الطرفية (Terminal): `git init`. هذا ينشئ مستودعًا (repository) يتابع الملفات.", en: "Inside your project folder, type in the terminal: `git init`. That creates a repository that tracks your files." },
      { icon: "🔍", ar: "`git status` يُظهر ما تغيّر. ثم تختار ما تريد حفظه بـ `git add index.html` (أو `git add .` لكل الملفات). هذه المرحلة تسمى **staging**.", en: "`git status` shows what changed. Choose what to save with `git add index.html` (or `git add .` for everything). This step is called **staging**." },
      { icon: "✅", ar: "ثم تحفظ: `git commit -m \"Add homepage\"`. اكتب رسائل قصيرة بصيغة الأمر تصف **ماذا** فعلت: `Fix menu on mobile`.", en: "Then save: `git commit -m \"Add homepage\"`. Write short, imperative messages saying **what** you did: `Fix menu on mobile`." },
      { icon: "📜", ar: "`git log --oneline` يعرض تاريخ الـ commits. وملف `.gitignore` يحدد ما لا يُحفظ أبدًا، مثل `node_modules/` وملفات كلمات السر `.env`.", en: "`git log --oneline` lists the history. A `.gitignore` file lists what's never saved, like `node_modules/` and secret `.env` files." },
    ],
    quiz: [
      { id: "q1", prompt: { ar: "ما الترتيب الصحيح لحفظ تغيير؟", en: "What's the right order to save a change?" }, options: [{ ar: "`git commit` ثم `git add`", en: "`git commit` then `git add`" }, { ar: "`git add` ثم `git commit -m \"…\"`", en: "`git add` then `git commit -m \"…\"`" }, { ar: "`git init` فقط", en: "Only `git init`" }], answer: 1 },
      { id: "q2", prompt: { ar: "أي ملف يجب ألا يُرفع أبدًا؟", en: "Which file should never be committed?" }, options: [{ ar: "`index.html`", en: "`index.html`" }, { ar: "`.env` الذي فيه كلمات السر", en: "`.env` with your secrets" }, { ar: "`README.md`", en: "`README.md`" }], answer: 1 },
      { id: "q3", prompt: { ar: "أي رسالة commit أفضل؟", en: "Which commit message is better?" }, options: [{ ar: "`update`", en: "`update`" }, { ar: "`Fix login button on mobile`", en: "`Fix login button on mobile`" }, { ar: "`asdf`", en: "`asdf`" }], answer: 1 },
    ],
    xp: 20,
  }),
  reading({
    slug: "branches",
    title: { ar: "الفروع: branch و merge", en: "Branches: branch and merge" },
    body: [
      { icon: "🌿", ar: "**الفرع** (branch) نسخة موازية تجرّب فيها ميزة جديدة دون أن تكسر النسخة الأساسية `main`.", en: "A **branch** is a parallel line where you try a new feature without breaking the main version, `main`." },
      { icon: "🔀", ar: "`git switch -c dark-mode` ينشئ فرعًا وينتقل إليه. تعمل وتحفظ commits كالمعتاد. و `git switch main` يعيدك.", en: "`git switch -c dark-mode` creates a branch and moves to it. Work and commit as usual. `git switch main` takes you back." },
      { icon: "🤝", ar: "عندما تنتهي، تدمج: من `main` اكتب `git merge dark-mode`. إذا عدّل الفرعان نفس السطر يحدث **تعارض** (conflict) تحلّه يدويًا ثم تعمل commit.", en: "When done, merge: from `main` run `git merge dark-mode`. If both branches changed the same line you get a **conflict**: fix it by hand, then commit." },
    ],
    modern: {
      old: "git checkout -b dark-mode",
      now: "git switch -c dark-mode",
      text: { ar: "`git switch` الأحدث مخصص للتنقل بين الفروع فقط، فهو أوضح وأقل خطورة من `checkout` متعدد الاستخدامات.", en: "The newer `git switch` only moves between branches, so it's clearer and safer than the do-everything `checkout`." },
      since: "Git 2.23",
    },
    quiz: [
      { id: "q1", prompt: { ar: "لماذا نستخدم الفروع؟", en: "Why use branches?" }, options: [{ ar: "لتجربة ميزة دون كسر main", en: "To try a feature without breaking main" }, { ar: "لحذف المشروع", en: "To delete the project" }, { ar: "لتسريع الإنترنت", en: "To speed up the internet" }], answer: 0 },
      { id: "q2", prompt: { ar: "متى يحدث conflict؟", en: "When does a conflict happen?" }, options: [{ ar: "عند إنشاء فرع", en: "When creating a branch" }, { ar: "عندما يعدّل فرعان نفس السطر", en: "When two branches change the same line" }, { ar: "عند كل commit", en: "On every commit" }], answer: 1 },
    ],
    xp: 20,
  }),
  reading({
    slug: "github",
    title: { ar: "GitHub: push و pull و clone", en: "GitHub: push, pull and clone" },
    body: [
      { icon: "☁️", ar: "أنشئ مستودعًا على GitHub ثم اربطه بمشروعك: `git remote add origin https://github.com/you/site.git`.", en: "Create a repository on GitHub, then connect your project: `git remote add origin https://github.com/you/site.git`." },
      { icon: "⬆️", ar: "`git push -u origin main` يرفع commits إلى GitHub. وبعدها يكفي `git push`.", en: "`git push -u origin main` uploads your commits to GitHub. After that, plain `git push` is enough." },
      { icon: "⬇️", ar: "`git pull` يجلب تغييرات زملائك. و `git clone <url>` ينسخ مشروعًا كاملًا من GitHub إلى حاسوبك.", en: "`git pull` brings in your teammates' changes. `git clone <url>` copies a whole project from GitHub to your computer." },
      { icon: "🚀", ar: "انشر موقعك مجانًا: **GitHub Pages** لمواقع HTML/CSS/JS، أو **Vercel** لمشاريع React و Next.js. كل push يحدّث الموقع تلقائيًا.", en: "Publish for free: **GitHub Pages** for HTML/CSS/JS sites, or **Vercel** for React and Next.js. Every push updates the site automatically." },
    ],
    quiz: [
      { id: "q1", prompt: { ar: "أي أمر يرفع commits إلى GitHub؟", en: "Which command uploads commits to GitHub?" }, options: [{ ar: "`git pull`", en: "`git pull`" }, { ar: "`git push`", en: "`git push`" }, { ar: "`git clone`", en: "`git clone`" }], answer: 1 },
      { id: "q2", prompt: { ar: "تريد نسخ مشروع موجود على GitHub إلى حاسوبك:", en: "You want a GitHub project on your computer:" }, options: [{ ar: "`git clone <url>`", en: "`git clone <url>`" }, { ar: "`git init`", en: "`git init`" }, { ar: "`git merge`", en: "`git merge`" }], answer: 0 },
    ],
    xp: 20,
  }),
  reading({
    slug: "teamwork",
    title: { ar: "العمل في فريق: Pull Requests", en: "Teamwork: pull requests" },
    body: [
      { icon: "📬", ar: "في الفرق لا يرفع أحد مباشرة إلى `main`. تعمل على فرع، ترفعه، ثم تفتح **Pull Request** (PR) تطلب فيه دمج تغييراتك.", en: "On teams nobody pushes straight to `main`. You work on a branch, push it, then open a **pull request** (PR) asking to merge your changes." },
      { icon: "👀", ar: "زملاؤك **يراجعون** الكود في الـ PR ويعلّقون على الأسطر، وتعمل اختبارات آلية (CI). بعد الموافقة يُدمج الفرع.", en: "Teammates **review** the code in the PR and comment on lines, and automated tests (CI) run. Once approved, the branch is merged." },
      { icon: "🌟", ar: "المساهمة في مشاريع مفتوحة المصدر (fork ثم PR) من أفضل الطرق لتتعلم وتبني سمعة. ابحث عن مشاكل عليها وسم `good first issue`.", en: "Contributing to open source (fork, then PR) is one of the best ways to learn and build a reputation. Look for issues labeled `good first issue`." },
    ],
    quiz: [
      { id: "q1", prompt: { ar: "ما هو Pull Request؟", en: "What is a pull request?" }, options: [{ ar: "طلب دمج فرعك بعد مراجعته", en: "A request to merge your branch after review" }, { ar: "تحميل المشروع", en: "Downloading the project" }, { ar: "حذف فرع", en: "Deleting a branch" }], answer: 0 },
      { id: "q2", prompt: { ar: "كيف تبدأ المساهمة في مشروع مفتوح المصدر؟", en: "How do you start contributing to open source?" }, options: [{ ar: "fork ثم فرع ثم PR", en: "Fork, branch, then a PR" }, { ar: "push مباشرة إلى main", en: "Push straight to main" }, { ar: "إرسال الكود بالبريد", en: "Email the code" }], answer: 0 },
    ],
    xp: 20,
  }),
];

export const gitExam: Exam = {
  passPercent: 80,
  questions: [
    { id: "q1", prompt: { ar: "أي أمر ينشئ مستودع Git جديدًا؟", en: "Which command creates a new Git repository?" }, options: [{ ar: "`git init`", en: "`git init`" }, { ar: "`git new`", en: "`git new`" }, { ar: "`git start`", en: "`git start`" }], answer: 0 },
    { id: "q2", prompt: { ar: "ماذا يفعل `git add .`؟", en: "What does `git add .` do?" }, options: [{ ar: "يجهّز كل التغييرات للـ commit", en: "Stages every change for the commit" }, { ar: "يرفع إلى GitHub", en: "Uploads to GitHub" }, { ar: "يحذف الملفات", en: "Deletes files" }], answer: 0 },
    { id: "q3", prompt: { ar: "كيف تنشئ فرعًا وتنتقل إليه؟", en: "How do you create a branch and switch to it?" }, options: [{ ar: "`git switch -c feature`", en: "`git switch -c feature`" }, { ar: "`git commit feature`", en: "`git commit feature`" }, { ar: "`git push feature`", en: "`git push feature`" }], answer: 0 },
    { id: "q4", prompt: { ar: "أين تضع `node_modules/` حتى لا تُرفع؟", en: "Where do you list `node_modules/` so it's never committed?" }, options: [{ ar: "`.gitignore`", en: "`.gitignore`" }, { ar: "`package.json`", en: "`package.json`" }, { ar: "`README.md`", en: "`README.md`" }], answer: 0 },
    { id: "q5", prompt: { ar: "زميلك رفع تغييرات. كيف تجلبها؟", en: "A teammate pushed changes. How do you get them?" }, options: [{ ar: "`git pull`", en: "`git pull`" }, { ar: "`git init`", en: "`git init`" }, { ar: "`git log`", en: "`git log`" }], answer: 0 },
  ],
};
