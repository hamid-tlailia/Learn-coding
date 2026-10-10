import type { Deep } from "../types";

/** "Go deeper" notes for the Git, React and Backend stages, keyed by "stage/slug". */
export const stackDeep: Record<string, Deep> = {
  // ───────────────────────────── Git ─────────────────────────────
  "git/why-git": {
    more: [
      { icon: "🧬", ar: "كل commit له **بصمة** فريدة (hash) مثل `a1b2c3d`، تُحسب من محتواه ومن الـ commit الذي قبله. لذلك لا يمكن تغيير التاريخ القديم بصمت: أي تعديل ينتج بصمة جديدة.", en: "Every commit has a unique **hash** like `a1b2c3d`, computed from its content and the commit before it. That's why old history can't change silently: any edit produces a new hash." },
      { icon: "🌐", ar: "Git **موزّع** (distributed): كل نسخة من المشروع تحمل التاريخ الكامل، فتعمل بلا إنترنت وتستطيع عمل commit في الطائرة. GitHub مجرد نسخة مشتركة يتفق عليها الفريق.", en: "Git is **distributed**: every copy of the project holds the full history, so you can work offline and commit on a plane. GitHub is just a shared copy the team agrees on." },
      { icon: "⚙️", ar: "نصيحة إعداد: `git config --global init.defaultBranch main` يجعل كل مستودع جديد يبدأ بفرع `main`. وتأكد أن البريد في `user.email` هو نفس بريد حسابك على GitHub حتى تُنسب إليك الـ commits.", en: "Setup tip: `git config --global init.defaultBranch main` makes every new repo start on `main`. And make sure `user.email` matches your GitHub account so commits are credited to you." },
    ],
    mistakes: [
      { ar: "الخلط بين Git و GitHub → Git أداة على حاسوبك تعمل وحدها، و GitHub موقع يستضيف نسخة منها. يمكنك استخدام Git بدون أي حساب.", en: "Mixing up Git and GitHub → Git is a tool on your computer that works on its own; GitHub is a site that hosts a copy. You can use Git without any account." },
      { ar: "حفظ نسخ يدوية مثل `site-final-v2-REAL.zip` → اترك Git يتذكر التاريخ، واعمل commit صغيرًا بعد كل خطوة ناجحة.", en: "Keeping manual copies like `site-final-v2-REAL.zip` → let Git remember the history and make a small commit after each working step." },
      { ar: "نسيان إعداد الاسم والبريد → يرفض Git الـ commit أو يستخدم بيانات خاطئة. نفّذ `git config --global user.name` و `user.email` مرة واحدة على كل حاسوب جديد.", en: "Skipping the name and email setup → Git refuses the commit or uses wrong details. Run `git config --global user.name` and `user.email` once on every new machine." },
    ],
  },
  "git/first-commits": {
    more: [
      { icon: "🗂️", ar: "Git فيه ثلاث مناطق: **مجلد العمل** (ملفاتك)، و**منطقة التجهيز** (staging أو index)، و**المستودع** (الـ commits). `git add` ينقل من الأولى للثانية، و `git commit` من الثانية للثالثة.", en: "Git has three areas: the **working directory** (your files), the **staging area** (the index), and the **repository** (commits). `git add` moves work from the first to the second, `git commit` from the second to the third." },
      { icon: "🔬", ar: "قبل كل commit راجع ما ستحفظه: `git diff` يعرض التغييرات غير المجهّزة، و `git diff --staged` يعرض ما سيدخل الـ commit فعلًا. هذه عادة المحترفين.", en: "Before each commit, review what you're saving: `git diff` shows unstaged changes, and `git diff --staged` shows exactly what will go into the commit. Pros do this every time." },
      { icon: "🩹", ar: "أخطأت في آخر رسالة أو نسيت ملفًا؟ `git commit --amend` يعدّل آخر commit، لكن استخدمه **قبل** الرفع فقط. و `git restore --staged file.js` يلغي تجهيز ملف دون أن يمسح تعديلاته.", en: "Typo in the last message or forgot a file? `git commit --amend` fixes the last commit, but only **before** you push. And `git restore --staged file.js` unstages a file without losing your edits." },
    ],
    mistakes: [
      { ar: "إضافة ملف إلى `.gitignore` بعد أن تم حفظه → Git يستمر بتتبعه. أزله من التتبع بـ `git rm --cached .env` ثم اعمل commit.", en: "Adding a file to `.gitignore` after it was already committed → Git keeps tracking it. Untrack it with `git rm --cached .env`, then commit." },
      { ar: "تشغيل `git init` داخل مجلد المستخدم الرئيسي أو داخل مستودع آخر → شغّله داخل مجلد المشروع فقط، وتحقق بـ `git status` أين أنت.", en: "Running `git init` in your home folder or inside another repo → run it only inside the project folder, and check with `git status` where you are." },
      { ar: "commit واحد ضخم في نهاية اليوم برسالة `stuff` → اعمل commits صغيرة، كل واحد يفعل شيئًا واحدًا برسالة واضحة. هكذا يسهل التراجع عن خطوة واحدة.", en: "One giant end-of-day commit called `stuff` → make small commits that each do one thing with a clear message. That makes undoing a single step easy." },
    ],
  },
  "git/branches": {
    more: [
      { icon: "📌", ar: "الفرع في الحقيقة مجرد **مؤشر** صغير يشير إلى commit، لذلك إنشاؤه فوري ولا ينسخ أي ملفات. و `HEAD` مؤشر يقول لـ Git على أي فرع أنت الآن.", en: "A branch is really just a tiny **pointer** to a commit, so creating one is instant and copies no files. `HEAD` is a pointer telling Git which branch you're on right now." },
      { icon: "⏩", ar: "إذا لم يتغير `main` منذ أن أنشأت فرعك، يكون الدمج **fast-forward**: Git يحرّك المؤشر للأمام فقط. وإلا ينشئ **merge commit** يجمع الطرفين.", en: "If `main` hasn't moved since you branched, the merge is a **fast-forward**: Git just slides the pointer forward. Otherwise it creates a **merge commit** joining both sides." },
      { icon: "🧷", ar: "في التعارض يضع Git علامات `<<<<<<<` و `=======` و `>>>>>>>` حول الجزأين. اختر الصحيح واحذف العلامات، ثم `git add` و `git commit`. ولو تعقّد الأمر: `git merge --abort` يعيدك لما قبل الدمج.", en: "In a conflict Git wraps both sides in `<<<<<<<`, `=======` and `>>>>>>>` markers. Keep the right code, delete the markers, then `git add` and `git commit`. If it gets messy, `git merge --abort` takes you back." },
    ],
    mistakes: [
      { ar: "العمل مباشرة على `main` لكل شيء → أنشئ فرعًا لكل ميزة أو إصلاح: `git switch -c fix-navbar`.", en: "Doing all work directly on `main` → create a branch per feature or fix: `git switch -c fix-navbar`." },
      { ar: "تشغيل `git merge` من الفرع الخطأ → الدمج يجلب الفرع المذكور **إلى** الفرع الحالي. انتقل أولًا إلى `main` ثم `git merge dark-mode`.", en: "Running `git merge` from the wrong branch → a merge pulls the named branch **into** the current one. Switch to `main` first, then `git merge dark-mode`." },
      { ar: "ترك علامات التعارض `<<<<<<<` داخل الكود وعمل commit → ابحث عنها قبل الحفظ، فهي تكسر البرنامج فورًا.", en: "Committing with `<<<<<<<` conflict markers still in the code → search for them before committing; they break the program instantly." },
    ],
  },
  "git/github": {
    more: [
      { icon: "🔄", ar: "`git pull` هو في الحقيقة أمران: `git fetch` (جلب الـ commits الجديدة) ثم `git merge` (دمجها). استخدم `git fetch` وحده عندما تريد أن ترى ما تغيّر قبل الدمج.", en: "`git pull` is really two commands: `git fetch` (download new commits) then `git merge` (combine them). Use `git fetch` alone when you want to see what changed before merging." },
      { icon: "🔑", ar: "GitHub لا يقبل كلمة سر حسابك في الطرفية. سجّل الدخول بـ `gh auth login` أو استخدم مفتاح **SSH** أو **Personal Access Token**.", en: "GitHub doesn't accept your account password in the terminal. Sign in with `gh auth login`, or use an **SSH** key or a **personal access token**." },
      { icon: "🚨", ar: "إذا رفض GitHub الـ push لأن الفرع البعيد فيه commits جديدة، اعمل `git pull` أولًا ثم أعد الرفع. لا تستخدم `--force` على فرع مشترك؛ فهو يمسح عمل زملائك.", en: "If GitHub rejects your push because the remote has new commits, `git pull` first, then push again. Never use `--force` on a shared branch; it wipes out your teammates' work." },
    ],
    mistakes: [
      { ar: "رفع مفتاح سري ثم حذفه في commit جديد → يبقى موجودًا في التاريخ. اعتبره مكشوفًا: ألغِ المفتاح وأنشئ واحدًا جديدًا فورًا.", en: "Pushing a secret key, then deleting it in a new commit → it stays in the history. Treat it as leaked: revoke the key and create a new one right away." },
      { ar: "تشغيل `git clone` داخل مجلد مشروع موجود → تحصل على مستودع داخل مستودع. انسخ في مجلد عادي مثل `~/projects`.", en: "Running `git clone` inside an existing project → you get a repo inside a repo. Clone into a plain folder like `~/projects`." },
      { ar: "نسيان `-u` في أول push ثم الاستغراب من أن `git push` وحده لا يعمل → `git push -u origin main` مرة واحدة يربط الفرع المحلي بالبعيد.", en: "Forgetting `-u` on the first push and wondering why plain `git push` fails → `git push -u origin main` once links the local branch to the remote one." },
    ],
  },
  "git/teamwork": {
    more: [
      { icon: "📏", ar: "الـ PR الصغير (أقل من 300 سطر تقريبًا) يُراجع بسرعة وبعناية، والضخم يُوافق عليه دون قراءة. اجعل كل PR يحل مشكلة واحدة، واكتب وصفًا يشرح **لماذا** ومع لقطة شاشة إن أمكن.", en: "A small PR (roughly under 300 lines) gets reviewed fast and carefully; a huge one gets rubber-stamped. Make each PR solve one problem, and describe **why**, with a screenshot when it helps." },
      { icon: "🔗", ar: "اكتب في وصف الـ PR `Closes #12` فيُغلق GitHub المشكلة رقم 12 تلقائيًا عند الدمج. وكثير من الفرق تختار **Squash and merge** ليصبح كل PR commit واحدًا نظيفًا في `main`.", en: "Write `Closes #12` in the PR description and GitHub closes issue 12 automatically on merge. Many teams use **Squash and merge** so each PR becomes one clean commit on `main`." },
      { icon: "🍴", ar: "بعد الـ fork أضف المستودع الأصلي باسم `upstream`: `git remote add upstream <url>`، ثم `git pull upstream main` لتبقى نسختك محدّثة قبل أي PR جديد.", en: "After forking, add the original repo as `upstream`: `git remote add upstream <url>`, then `git pull upstream main` to stay up to date before each new PR." },
    ],
    mistakes: [
      { ar: "فتح PR من فرع `main` في الـ fork → أنشئ فرعًا خاصًا لكل PR، حتى تبقى `main` نظيفة وتستطيع فتح أكثر من PR.", en: "Opening a PR from your fork's `main` → create a dedicated branch per PR so `main` stays clean and you can open several PRs." },
      { ar: "أخذ تعليقات المراجعة بشكل شخصي أو تجاهلها → المراجعة على الكود لا عليك. رد على كل تعليق، أصلح، ثم ادفع commits جديدة إلى نفس الفرع فيتحدث الـ PR تلقائيًا.", en: "Taking review comments personally or ignoring them → reviews are about the code, not you. Reply to each comment, fix, then push new commits to the same branch and the PR updates itself." },
      { ar: "فتح PR دون تشغيل المشروع أو الاختبارات محليًا → شغّله وتأكد أنه يعمل قبل طلب المراجعة، ولا تنتظر من CI أن يكتشف أخطاء واضحة.", en: "Opening a PR without running the project or tests locally → run it and make sure it works before asking for review; don't rely on CI to catch obvious breaks." },
    ],
  },

  // ──────────────────────────── React ────────────────────────────
  "react/what-is-react": {
    more: [
      { icon: "🔍", ar: "عندما تتغير البيانات، يستدعي React دالة المكوّن من جديد ويقارن النتيجة بالسابقة، ثم يغيّر في الصفحة **فقط** ما اختلف. هذه المقارنة تسمى **reconciliation** وهي سبب سرعته.", en: "When data changes, React calls your component function again, compares the result with the previous one, and touches **only** what differs on the page. This comparison is called **reconciliation**, and it's why React is fast." },
      { icon: "🧼", ar: "المكوّن يجب أن يكون **نقيًا** (pure): نفس المدخلات تعطي نفس الواجهة، دون تعديل متغيرات خارجية أثناء العرض. React قد يستدعيه مرات كثيرة، فلا تضع داخله آثارًا جانبية.", en: "A component should be **pure**: same inputs, same UI, without changing outside variables while rendering. React may call it many times, so keep side effects out of the render." },
      { icon: "📦", ar: "لا تريد عنصرًا إضافيًا يحيط بالمحتوى؟ استخدم **Fragment**: `<>…</>` يجمع العناصر دون أن يضيف شيئًا للصفحة. ولتبدأ مشروعًا على حاسوبك: `npm create vite@latest`.", en: "Don't want an extra wrapper element? Use a **Fragment**: `<>…</>` groups elements without adding anything to the page. To start a project on your computer: `npm create vite@latest`." },
    ],
    mistakes: [
      { ar: "اسم مكوّن بحرف صغير مثل `function card()` → React يظنه وسم HTML ويتجاهله. اكتب `function Card()` واستخدمه `<Card />`.", en: "A lowercase component name like `function card()` → React treats it as an HTML tag. Write `function Card()` and use it as `<Card />`." },
      { ar: "إرجاع عنصرين متجاورين `return <h1/><p/>` → غلّفهما بعنصر واحد أو Fragment: `return <><h1 /><p /></>`.", en: "Returning two siblings `return <h1/><p/>` → wrap them in one element or a Fragment: `return <><h1 /><p /></>`." },
      { ar: "تعريف مكوّن داخل مكوّن آخر → يُنشأ من جديد في كل عرض ويفقد حالته. عرّف كل مكوّن في المستوى الأعلى من الملف.", en: "Defining a component inside another component → it's recreated every render and loses its state. Define each component at the top level of the file." },
    ],
  },
  "react/jsx": {
    more: [
      { icon: "🛠️", ar: "JSX ليس شيئًا يفهمه المتصفح: أداة البناء تحوّله إلى استدعاءات JavaScript عادية تصف العناصر. لذلك داخل `{ }` تضع **تعبيرًا** فقط، لا `if` ولا `for`.", en: "Browsers don't understand JSX: the build tool turns it into plain JavaScript calls that describe elements. That's why `{ }` only takes an **expression**, never an `if` or a `for`." },
      { icon: "🛡️", ar: "React يهرّب (escape) النصوص تلقائيًا: لو كتب المستخدم `<script>` يظهر كنص ولا يُنفَّذ. هذه حماية مجانية من XSS، والخاصية `dangerouslySetInnerHTML` تتجاوزها، فاسمها تحذير.", en: "React escapes text automatically: if a user types `<script>` it shows as text and never runs. That's free XSS protection; `dangerouslySetInnerHTML` bypasses it, and the name is the warning." },
      { icon: "✍️", ar: "خصائص `style` تُكتب camelCase: `backgroundColor` بدل `background-color`، والأرقام تصبح `px` تلقائيًا: `{{ padding: 8 }}`. والتعليق داخل JSX يكتب هكذا: `{/* note */}`. و `for` في label تصبح `htmlFor`.", en: "`style` keys are camelCase: `backgroundColor`, not `background-color`, and numbers become `px`: `{{ padding: 8 }}`. Comments in JSX look like `{/* note */}`. And a label's `for` becomes `htmlFor`." },
    ],
    mistakes: [
      { ar: "استخدام رقم قبل `&&` مثل `{items.length && <List />}` → عندما يكون الطول `0` يظهر الرقم 0 على الشاشة. اكتب `{items.length > 0 && <List />}`.", en: "Putting a number before `&&` like `{items.length && <List />}` → when the length is `0`, a literal 0 appears on screen. Write `{items.length > 0 && <List />}`." },
      { ar: "كتابة `style=\"color: red\"` كنص → `style` يأخذ كائنًا: `style={{ color: \"red\" }}`؛ الأقواس الخارجية لـ JSX والداخلية للكائن.", en: "Writing `style=\"color: red\"` as a string → `style` takes an object: `style={{ color: \"red\" }}`; the outer braces are JSX, the inner ones the object." },
      { ar: "كتابة `if` داخل `{ }` → استخدم `&&` أو `? :`، أو احسب القيمة في متغير قبل `return`.", en: "Writing an `if` inside `{ }` → use `&&` or `? :`, or compute the value in a variable before `return`." },
    ],
  },
  "react/props": {
    more: [
      { icon: "⬇️", ar: "البيانات في React تتدفق **باتجاه واحد**: من الأب إلى الابن عبر props. وليُبلغ الابن أباه بشيء، يمرر له الأب **دالة** كـ prop: `<Button onSelect={handleSelect} />`.", en: "Data in React flows **one way**: parent to child via props. For a child to tell its parent something, the parent passes a **function** as a prop: `<Button onSelect={handleSelect} />`." },
      { icon: "🎛️", ar: "ضع قيمًا افتراضية مباشرة عند التفكيك: `function Button({ size = \"md\", children })`. هكذا يعمل المكوّن حتى لو نسي أحد تمرير الخاصية.", en: "Set defaults right in the destructuring: `function Button({ size = \"md\", children })`. The component then works even when someone forgets a prop." },
      { icon: "🕳️", ar: "عندما تمرر prop عبر طبقات كثيرة لا تستخدمها (prop drilling)، فكّر في **Context**: `createContext` و `useContext` يوصلان القيمة لأي مكوّن في الشجرة مباشرة، مثل السمة أو المستخدم الحالي.", en: "When a prop passes through many layers that don't use it (prop drilling), consider **Context**: `createContext` and `useContext` deliver a value to any component in the tree, like the theme or current user." },
    ],
    mistakes: [
      { ar: "تمرير رقم كنص `<Stars count=\"5\" />` → يصل `\"5\"` نصًا. للأرقام والقيم المنطقية استخدم الأقواس: `<Stars count={5} />`.", en: "Passing a number as text `<Stars count=\"5\" />` → it arrives as the string `\"5\"`. For numbers and booleans use braces: `<Stars count={5} />`." },
      { ar: "تعديل props داخل المكوّن مثل `props.title = \"New\"` → props للقراءة فقط. إذا احتجت قيمة متغيرة فاستخدم state في الأب ومرّرها.", en: "Changing props inside the component like `props.title = \"New\"` → props are read-only. If the value needs to change, keep it in the parent's state and pass it down." },
      { ar: "نسيان الأقواس عند التفكيك `function Card(title)` → `title` هنا هو كائن props كله. اكتب `function Card({ title })`.", en: "Forgetting the braces when destructuring `function Card(title)` → `title` is then the whole props object. Write `function Card({ title })`." },
    ],
  },
  "react/state": {
    more: [
      { icon: "📸", ar: "الحالة **لقطة** ثابتة داخل كل عرض: `setCount` لا يغيّر `count` فورًا، بل يطلب عرضًا جديدًا تكون فيه القيمة الجديدة. لذلك `console.log(count)` بعدها مباشرة يطبع القيمة القديمة.", en: "State is a fixed **snapshot** within each render: `setCount` doesn't change `count` right away, it asks for a new render with the new value. That's why `console.log(count)` right after prints the old value." },
      { icon: "🧮", ar: "عندما تعتمد القيمة الجديدة على القديمة، استخدم **دالة التحديث**: `setCount((c) => c + 1)`. استدعاؤها مرتين يزيد 2 فعلًا، بينما `setCount(count + 1)` مرتين يزيد 1 فقط.", en: "When the new value depends on the old one, use an **updater function**: `setCount((c) => c + 1)`. Calling it twice really adds 2, while `setCount(count + 1)` twice adds only 1." },
      { icon: "🧊", ar: "الكائنات والمصفوفات في الحالة لا تُعدَّل، بل تُستبدل بنسخة جديدة: `setTodos([...todos, newTodo])` أو `setUser({ ...user, name: \"Sara\" })`. React يقارن المرجع، فإن بقي نفسه لن يعيد العرض.", en: "Objects and arrays in state are never modified, they're replaced with a new copy: `setTodos([...todos, newTodo])` or `setUser({ ...user, name: \"Sara\" })`. React compares references, so the same one means no re-render." },
    ],
    mistakes: [
      { ar: "كتابة `onClick={setCount(count + 1)}` → تُنفَّذ أثناء العرض فتحدث حلقة لا نهائية. مرّر دالة: `onClick={() => setCount(count + 1)}`.", en: "Writing `onClick={setCount(count + 1)}` → it runs during render and causes an infinite loop. Pass a function: `onClick={() => setCount(count + 1)}`." },
      { ar: "تعديل الحالة مباشرة `todos.push(item)` → لا يحدث أي تحديث على الشاشة. أنشئ مصفوفة جديدة: `setTodos([...todos, item])`.", en: "Mutating state directly `todos.push(item)` → nothing updates on screen. Create a new array: `setTodos([...todos, item])`." },
      { ar: "استدعاء `useState` داخل `if` أو حلقة → الـ Hooks تُستدعى دائمًا في أعلى المكوّن وبنفس الترتيب في كل عرض.", en: "Calling `useState` inside an `if` or a loop → Hooks must always be called at the top of the component, in the same order every render." },
    ],
  },
  "react/lists-keys": {
    more: [
      { icon: "🧠", ar: "React يستخدم `key` ليطابق كل عنصر بنسخته في العرض السابق. إذا تغيّر الترتيب أو حُذف عنصر، يعرف بالـ key أي عنصر انتقل، فيحافظ على حالته (مثل نص مكتوب في حقل).", en: "React uses `key` to match each item with its version from the last render. When items reorder or one is removed, the key tells React which one moved, so its state (like text typed in an input) stays with it." },
      { icon: "⚠️", ar: "استخدام الفهرس `key={index}` مقبول فقط لقائمة ثابتة لا تتغير. مع الحذف أو الترتيب تنتقل الحالة إلى العنصر الخطأ. أنشئ `id` عند إنشاء العنصر بـ `crypto.randomUUID()`.", en: "Using the index `key={index}` is fine only for a list that never changes. With deletes or reordering, state jumps to the wrong item. Create an `id` when the item is created, with `crypto.randomUUID()`." },
      { icon: "🧩", ar: "الـ key يجب أن يكون فريدًا بين **الإخوة** فقط، لا في كل التطبيق. وهو لا يصل للمكوّن كـ prop؛ إذا احتجت المعرّف داخله فمرّره باسم آخر: `<Todo key={t.id} id={t.id} />`.", en: "A key only needs to be unique among **siblings**, not across the whole app. It isn't passed to the component as a prop; if you need the id inside, pass it separately: `<Todo key={t.id} id={t.id} />`." },
    ],
    mistakes: [
      { ar: "استخدام `key={Math.random()}` → يتغير في كل عرض فيعيد React بناء كل العناصر ويفقد حالتها. استخدم معرّفًا ثابتًا من البيانات.", en: "Using `key={Math.random()}` → it changes every render, so React rebuilds every item and loses its state. Use a stable id from the data." },
      { ar: "نسيان `return` مع الأقواس المعقوفة `todos.map((t) => { <li>{t.text}</li> })` → لا يظهر شيء. استخدم أقواسًا عادية `(t) => (<li …/>)` أو اكتب `return`.", en: "Forgetting `return` with curly braces `todos.map((t) => { <li>{t.text}</li> })` → nothing renders. Use parentheses `(t) => (<li …/>)` or write `return`." },
      { ar: "وضع `key` على عنصر داخلي بدل العنصر الذي تُرجعه `map` → الـ key يوضع على العنصر الخارجي مباشرة: `<Card key={c.id} />` لا على `<li>` داخل Card.", en: "Putting `key` on an inner element instead of the one `map` returns → the key goes on the outermost element: `<Card key={c.id} />`, not on an `<li>` inside Card." },
    ],
  },
  "react/forms-react": {
    more: [
      { icon: "🎚️", ar: "عكس الحقل المتحكم به هو **غير المتحكم به** (uncontrolled): تعطيه `defaultValue` وتقرأ قيمته عند الإرسال فقط. مناسب للنماذج البسيطة، أما المتحكم به فمناسب للتحقق الفوري.", en: "The opposite of controlled is **uncontrolled**: give it a `defaultValue` and read it only on submit. Fine for simple forms; controlled inputs shine when you need live validation." },
      { icon: "☑️", ar: "قيمة `e.target.value` دائمًا **نص**، حتى في `type=\"number\"`، فحوّلها بـ `Number()`. ومربع الاختيار يستخدم `checked` و `e.target.checked` بدل `value`.", en: "`e.target.value` is always a **string**, even with `type=\"number\"`, so convert with `Number()`. A checkbox uses `checked` and `e.target.checked` instead of `value`." },
      { icon: "🆕", ar: "في React 19 يمكن تمرير دالة إلى `<form action={save}>` فتستقبل `FormData` مباشرة، ومعها `useActionState` لحالة الإرسال والأخطاء. الحقول المتحكم بها تبقى مفيدة عندما تحتاج القيمة أثناء الكتابة.", en: "In React 19 you can pass a function to `<form action={save}>` and receive `FormData` directly, with `useActionState` for pending and error state. Controlled inputs still help when you need the value while typing." },
    ],
    mistakes: [
      { ar: "وضع `value={name}` بدون `onChange` → يصبح الحقل للقراءة فقط ولا يقبل الكتابة. أضف `onChange` أو استخدم `defaultValue`.", en: "Setting `value={name}` without `onChange` → the input becomes read-only. Add `onChange`, or use `defaultValue` instead." },
      { ar: "بدء الحالة بـ `useState()` بدون قيمة → الحقل يبدأ غير متحكم به ثم يتحول، ويظهر تحذير. ابدأ دائمًا بنص فارغ: `useState(\"\")`.", en: "Starting state with `useState()` and no value → the input starts uncontrolled then switches, with a warning. Always start with an empty string: `useState(\"\")`." },
      { ar: "كتابة دالة `onChange` مستقلة لكل حقل في نموذج كبير → احفظ الحقول في كائن واحد واستخدم الخاصية `name`: `setForm({ ...form, [e.target.name]: e.target.value })`.", en: "Writing a separate `onChange` for every field in a big form → keep fields in one object and use the `name` attribute: `setForm({ ...form, [e.target.name]: e.target.value })`." },
    ],
  },
  "react/effects": {
    more: [
      { icon: "🧹", ar: "يمكن للتأثير أن يُرجع دالة **تنظيف** (cleanup) يشغّلها React قبل التأثير التالي وعند إزالة المكوّن: `return () => clearInterval(id);`. بدونها تتراكم المؤقتات والاشتراكات.", en: "An effect can return a **cleanup** function that React runs before the next effect and when the component unmounts: `return () => clearInterval(id);`. Without it, timers and subscriptions pile up." },
      { icon: "🔁", ar: "في وضع التطوير مع `StrictMode` يشغّل React التأثير، ثم ينظّفه، ثم يشغّله مرة أخرى، ليكشف التنظيف المفقود. لذلك ترى الطلب مرتين في الكونسول، وهذا لا يحدث في الإنتاج.", en: "In development with `StrictMode`, React runs your effect, cleans it up, then runs it again to expose missing cleanup. That's why you see the request twice in the console; it doesn't happen in production." },
      { icon: "🎯", ar: "التأثيرات لمزامنة شيء **خارج** React (شبكة، مؤقت، DOM). إذا كانت القيمة تُحسب من props أو state فاحسبها مباشرة أثناء العرض بدل `useEffect`. وفي المشاريع الكبيرة تُجلب البيانات بأدوات مثل TanStack Query أو Server Components.", en: "Effects are for syncing with something **outside** React (network, timers, the DOM). If a value can be computed from props or state, compute it during render instead of in `useEffect`. Bigger apps fetch data with tools like TanStack Query or Server Components." },
    ],
    mistakes: [
      { ar: "نسيان مصفوفة الاعتماديات مع `setState` داخل التأثير → يعمل بعد كل عرض فيسبب حلقة لا نهائية. أضف `[]` أو القيم التي يعتمد عليها فعلًا.", en: "Leaving out the dependency array while calling `setState` inside → it runs after every render and loops forever. Add `[]` or the values it truly depends on." },
      { ar: "كتابة `useEffect(async () => { … })` → التأثير يجب ألا يُرجع Promise. عرّف دالة `async` داخله ثم استدعها، كما في الحل.", en: "Writing `useEffect(async () => { … })` → an effect must not return a Promise. Define an `async` function inside and call it, as in the solution." },
      { ar: "افتراض أن `fetch` يفشل عند `404` → هو لا يرفض إلا عند انقطاع الشبكة. تحقق بنفسك: `if (!res.ok) throw new Error(\"Request failed\");`.", en: "Assuming `fetch` fails on a `404` → it only rejects on network errors. Check yourself: `if (!res.ok) throw new Error(\"Request failed\");`." },
    ],
  },
  "react/nextjs": {
    more: [
      { icon: "🪶", ar: "مكوّنات الخادم هي الافتراضية في مجلد `app`، ولا يُرسل كودها إلى المتصفح أبدًا، فتبقى الصفحة خفيفة ويمكنها قراءة قاعدة البيانات مباشرة. `\"use client\"` يرسم **حدًّا**: الملف وكل ما يستورده يصبح كود متصفح.", en: "Server Components are the default in `app`, and their code never ships to the browser, so pages stay light and can read the database directly. `\"use client\"` draws a **boundary**: that file and everything it imports becomes browser code." },
      { icon: "🧱", ar: "ملفات خاصة تبني الصفحات: `layout.tsx` إطار مشترك يبقى عند التنقل، و `loading.tsx` يظهر أثناء التحميل، و `error.tsx` عند الخطأ. والمسار المتغير يُكتب بأقواس مربعة: `app/blog/[slug]/page.tsx`.", en: "Special files shape pages: `layout.tsx` is a shared frame that persists while navigating, `loading.tsx` shows while loading, and `error.tsx` on errors. Dynamic routes use square brackets: `app/blog/[slug]/page.tsx`." },
      { icon: "⏳", ar: "في Next.js 15 أصبح `params` في الصفحات **Promise**: `const { slug } = await params;`. ونتائج `fetch` لم تعد تُخزَّن مؤقتًا افتراضيًا، فتحكّم في التخزين بنفسك عند الحاجة.", en: "In Next.js 15, page `params` is a **Promise**: `const { slug } = await params;`. And `fetch` results are no longer cached by default, so opt into caching yourself when you need it." },
    ],
    mistakes: [
      { ar: "وضع `\"use client\"` في أعلى كل ملف → تخسر فوائد الخادم. اجعل الصفحة مكوّن خادم، وأضف `\"use client\"` فقط للأجزاء التفاعلية الصغيرة مثل زر أو نموذج.", en: "Putting `\"use client\"` at the top of every file → you lose the server benefits. Keep the page a Server Component and mark only small interactive pieces, like a button or form." },
      { ar: "وضع مفتاح سري في متغير يبدأ بـ `NEXT_PUBLIC_` → هذه المتغيرات تُرسل إلى المتصفح ويراها الجميع. الأسرار تبقى بدون هذه البادئة وتُستخدم في كود الخادم فقط.", en: "Putting a secret in a `NEXT_PUBLIC_` variable → those are sent to the browser for everyone to see. Secrets stay unprefixed and are used in server code only." },
      { ar: "استخدام `<a href=\"/about\">` للروابط الداخلية → يعيد تحميل الصفحة كاملة. استخدم `<Link href=\"/about\">` من `next/link`.", en: "Using `<a href=\"/about\">` for internal links → it reloads the whole page. Use `<Link href=\"/about\">` from `next/link`." },
    ],
  },

  // ─────────────────────────── Backend ───────────────────────────
  "backend/http-apis": {
    more: [
      { icon: "📨", ar: "كل طلب واستجابة لهما **رؤوس** (headers) تحمل معلومات إضافية: `Content-Type: application/json` يقول نوع البيانات، و `Authorization` يحمل رمز الدخول. شاهدها كلها في تبويب **Network** في أدوات المطور.", en: "Every request and response carries **headers** with extra info: `Content-Type: application/json` says what the data is, `Authorization` carries the sign-in token. See them all in the DevTools **Network** tab." },
      { icon: "🧠", ar: "HTTP **عديم الحالة** (stateless): الخادم لا يتذكر طلبك السابق، لذلك يرسل المتصفح الكوكيز أو الرمز مع كل طلب. وطلبات `GET` و `PUT` و `DELETE` آمنة للتكرار، أما تكرار `POST` فقد ينشئ عنصرًا مكررًا.", en: "HTTP is **stateless**: the server doesn't remember your last request, so the browser sends cookies or a token every time. `GET`, `PUT` and `DELETE` are safe to repeat, while repeating a `POST` may create a duplicate." },
      { icon: "🧱", ar: "المتصفح يمنع صفحة من موقع ما من قراءة استجابة API من موقع آخر إلا إذا سمح الخادم بذلك، وهذا اسمه **CORS**. الخطأ يظهر في المتصفح لكن الحل دائمًا في إعدادات الخادم.", en: "The browser blocks a page from one site reading an API response from another unless the server allows it; that's **CORS**. The error shows up in the browser, but the fix always lives on the server." },
    ],
    mistakes: [
      { ar: "الرد بـ `200` مع `{ error: \"…\" }` عند الفشل → استخدم رمز الحالة الصحيح (`400` أو `404` أو `500`) حتى تفهم الواجهة والأدوات أن هناك خطأ.", en: "Replying `200` with `{ error: \"…\" }` on failure → use the right status code (`400`, `404`, `500`) so the frontend and tools know something went wrong." },
      { ar: "وضع أفعال في المسار مثل `/api/getUsers` أو `/api/deleteUser` → المسار اسم والطريقة هي الفعل: `GET /api/users` و `DELETE /api/users/7`.", en: "Putting verbs in paths like `/api/getUsers` or `/api/deleteUser` → the path is a noun and the method is the verb: `GET /api/users` and `DELETE /api/users/7`." },
      { ar: "استخدام `GET` لتغيير البيانات → محركات البحث والمتصفح قد يطلبون روابط `GET` تلقائيًا. التعديل والحذف يكونان بـ `POST` أو `PATCH` أو `DELETE` فقط.", en: "Using `GET` to change data → crawlers and browsers may fetch `GET` links on their own. Changes and deletes belong to `POST`, `PATCH` or `DELETE` only." },
    ],
  },
  "backend/express-basics": {
    more: [
      { icon: "🔁", ar: "Node يعمل بخيط واحد مع **حلقة أحداث** (event loop): أثناء انتظار قاعدة البيانات أو الشبكة يخدم طلبات أخرى. لذلك لا تضع حسابًا ثقيلًا متزامنًا داخل المسار، فهو يوقف الخادم كله.", en: "Node runs on one thread with an **event loop**: while waiting on the database or network, it serves other requests. So never put heavy synchronous work in a route; it freezes the whole server." },
      { icon: "🧅", ar: "Express مبني على **middleware**: دوال `(req, res, next)` تمر عليها الطلبات بالترتيب، مثل `express.json()` أو التحقق من الدخول. كل واحدة إما ترد أو تستدعي `next()`، والترتيب الذي تكتبه به هو ترتيب التنفيذ.", en: "Express is built on **middleware**: `(req, res, next)` functions requests pass through in order, like `express.json()` or an auth check. Each one either responds or calls `next()`, and the order you write them is the order they run." },
      { icon: "🧪", ar: "في الإنتاج اقرأ المنفذ من البيئة: `app.listen(process.env.PORT || 3000)`. ومع Node 22 يعيد `node --watch server.js` التشغيل تلقائيًا عند الحفظ. وفي Express 5 تنتقل أخطاء الدوال `async` إلى معالج الأخطاء تلقائيًا.", en: "In production read the port from the environment: `app.listen(process.env.PORT || 3000)`. With Node 22, `node --watch server.js` restarts on save. And in Express 5, errors in `async` handlers reach the error handler automatically." },
    ],
    mistakes: [
      { ar: "نسيان الرد في أحد الفروع → يبقى الطلب معلقًا حتى ينتهي الوقت. تأكد أن كل مسار ينتهي بـ `res.json()` أو `res.send()` أو `res.status(…)`.", en: "Forgetting to respond in one branch → the request hangs until it times out. Make sure every path ends with `res.json()`, `res.send()` or `res.status(…)`." },
      { ar: "الرد مرتين → خطأ `Cannot set headers after they are sent`. ضع `return` قبل الرد المبكر: `return res.status(400).json(…)`.", en: "Responding twice → `Cannot set headers after they are sent`. Put `return` before an early reply: `return res.status(400).json(…)`." },
      { ar: "تشغيل الخادم قبل تثبيت المكتبة → خطأ `Cannot find module 'express'`. نفّذ `npm install express` داخل مجلد المشروع أولًا.", en: "Running the server before installing the library → `Cannot find module 'express'`. Run `npm install express` in the project folder first." },
    ],
  },
  "backend/rest-routes": {
    more: [
      { icon: "❓", ar: "`req.params` لتحديد **عنصر بعينه** (`/courses/2`)، و `req.query` للتصفية والترتيب والصفحات: `/api/courses?level=beginner&page=2` تقرؤه من `req.query.level`. وهو أيضًا نص دائمًا.", en: "`req.params` identifies **one specific item** (`/courses/2`), while `req.query` is for filtering, sorting and paging: `/api/courses?level=beginner&page=2` is read from `req.query.level`. It's always text too." },
      { icon: "🪆", ar: "الموارد المرتبطة تُكتب متداخلة: `GET /api/users/7/orders` يُرجع طلبات المستخدم 7. وكثير من الفرق تضيف رقم إصدار `/api/v1/…` حتى تغيّر الـ API لاحقًا دون كسر التطبيقات القديمة.", en: "Related resources nest: `GET /api/users/7/orders` returns user 7's orders. Many teams also add a version `/api/v1/…` so the API can change later without breaking older apps." },
      { icon: "🧭", ar: "Express يجرّب المسارات بالترتيب الذي كتبتها به. لذلك ضع المسار الثابت `/api/courses/popular` **قبل** `/api/courses/:id`، وإلا يُفهم `popular` على أنه `id`.", en: "Express tries routes in the order you wrote them. So put the fixed route `/api/courses/popular` **before** `/api/courses/:id`, or `popular` gets treated as an `id`." },
    ],
    mistakes: [
      { ar: "مقارنة `c.id === req.params.id` مباشرة → رقم مقابل نص فلا يتطابق أبدًا. حوّل أولًا: `Number(req.params.id)`.", en: "Comparing `c.id === req.params.id` directly → number versus string never matches. Convert first: `Number(req.params.id)`." },
      { ar: "قبول معرّف غير رقمي مثل `/api/courses/abc` → `Number(\"abc\")` يعطي `NaN`. تحقق بـ `Number.isInteger(id)` ورد بـ `400` إن لم يكن صالحًا.", en: "Accepting a non-numeric id like `/api/courses/abc` → `Number(\"abc\")` gives `NaN`. Check with `Number.isInteger(id)` and reply `400` if it isn't valid." },
      { ar: "إرجاع `null` بـ `200` لعنصر غير موجود → العنصر المفقود `404`، أما القائمة الفارغة `[]` بـ `200` فهي صحيحة لمسار القائمة.", en: "Returning `null` with `200` for a missing item → a missing item is `404`, while an empty list `[]` with `200` is correct for a list route." },
    ],
  },
  "backend/post-validation": {
    more: [
      { icon: "🧾", ar: "`express.json()` يقرأ جسم الطلب فقط إذا كان رأسه `Content-Type: application/json`. لذلك في `fetch` أرسل الرأس مع `body: JSON.stringify(data)`، وإلا يصل `req.body` فارغًا أو `undefined`.", en: "`express.json()` only parses the body when the request has `Content-Type: application/json`. So in `fetch`, send that header with `body: JSON.stringify(data)`, or `req.body` arrives empty or `undefined`." },
      { icon: "📐", ar: "في المشاريع الحقيقية تُكتب قواعد التحقق كـ **مخطط** (schema) بمكتبة مثل **Zod**: `const result = schema.safeParse(req.body)`. تحصل على بيانات نظيفة ورسائل خطأ جاهزة، ويمكن مشاركة المخطط مع الواجهة.", en: "Real projects describe validation as a **schema** with a library like **Zod**: `const result = schema.safeParse(req.body)`. You get clean data and ready-made error messages, and can share the schema with the frontend." },
      { icon: "🧽", ar: "نظّف البيانات قبل الحفظ: `email.trim().toLowerCase()` حتى لا يصبح `Sara@Mail.com` و `sara@mail.com` حسابين. وإذا كان البريد مسجلًا من قبل، رد بـ `409 Conflict`.", en: "Normalize before saving: `email.trim().toLowerCase()` so `Sara@Mail.com` and `sara@mail.com` don't become two accounts. If the email is already taken, reply `409 Conflict`." },
    ],
    mistakes: [
      { ar: "نسيان `app.use(express.json())` → يكون `req.body` غير معرّف ويتعطل الكود. أضفه مرة واحدة قبل المسارات.", en: "Forgetting `app.use(express.json())` → `req.body` is undefined and the code crashes. Add it once, before the routes." },
      { ar: "حفظ `req.body` كله كما هو `users.push({ ...req.body })` → قد يرسل أحدهم `isAdmin: true`. اختر الحقول المسموحة فقط: `const { email, password } = req.body`.", en: "Saving the whole body `users.push({ ...req.body })` → someone can send `isAdmin: true`. Pick only allowed fields: `const { email, password } = req.body`." },
      { ar: "الاكتفاء بالتحقق في الواجهة عبر `required` → أي أحد يرسل طلبًا مباشرًا بـ curl متجاوزًا النموذج. التحقق على الخادم هو الحماية الحقيقية.", en: "Relying only on frontend checks like `required` → anyone can send a request with curl and skip the form. Server-side validation is the real protection." },
    ],
  },
  "backend/databases": {
    more: [
      { icon: "🔑", ar: "لكل جدول **مفتاح أساسي** (primary key) فريد مثل `id`، و `user_id` في جدول الطلبات **مفتاح أجنبي** (foreign key) يمنع ربط طلب بمستخدم غير موجود. وقيود مثل `UNIQUE` و `NOT NULL` تحمي البيانات حتى لو أخطأ كودك.", en: "Each table has a unique **primary key** like `id`, and `user_id` in orders is a **foreign key** that blocks linking an order to a missing user. Constraints like `UNIQUE` and `NOT NULL` protect data even when your code slips." },
      { icon: "🔗", ar: "لجلب بيانات من جدولين معًا تستخدم `JOIN`: `SELECT orders.id, users.email FROM orders JOIN users ON users.id = orders.user_id;`. و**الفهرس** (index) على عمود تبحث فيه كثيرًا يجعل البحث أسرع بكثير.", en: "To read from two tables at once, use a `JOIN`: `SELECT orders.id, users.email FROM orders JOIN users ON users.id = orders.user_id;`. An **index** on a column you search often makes lookups far faster." },
      { icon: "🏦", ar: "**المعاملة** (transaction) تجمع عدة أوامر فإما تنجح كلها أو تُلغى كلها، مثل خصم مبلغ من حساب وإضافته لآخر. وتغييرات بنية الجداول تُدار بملفات **migrations** تُحفظ في Git مثل الكود.", en: "A **transaction** groups several statements so they all succeed or all roll back, like moving money between two accounts. Table structure changes are managed with **migration** files kept in Git like code." },
    ],
    mistakes: [
      { ar: "تشغيل `UPDATE` أو `DELETE` بدون `WHERE` → يتغير أو يُحذف كل صف في الجدول. اكتب `WHERE id = 7` دائمًا، وجرّب الشرط أولًا بـ `SELECT`.", en: "Running `UPDATE` or `DELETE` without `WHERE` → every row in the table changes or disappears. Always write `WHERE id = 7`, and test the condition with a `SELECT` first." },
      { ar: "بناء الاستعلام بدمج النصوص `\"… WHERE email = '\" + email + \"'\"` → باب لـ SQL Injection. استخدم المعاملات: `db.query(\"SELECT * FROM users WHERE email = $1\", [email])`.", en: "Building queries by joining strings `\"… WHERE email = '\" + email + \"'\"` → an open door to SQL injection. Use parameters: `db.query(\"SELECT * FROM users WHERE email = $1\", [email])`." },
      { ar: "حفظ قائمة في عمود واحد كنص مثل `tags = \"html,css,js\"` → يصعب البحث والتعديل. أنشئ جدولًا منفصلًا يربط كل عنصر بصاحبه.", en: "Storing a list in one text column like `tags = \"html,css,js\"` → hard to search and update. Create a separate table linking each item to its owner." },
    ],
  },
  "backend/auth-security": {
    more: [
      { icon: "🧂", ar: "الـ hash طريق باتجاه واحد لا يمكن عكسه، و bcrypt يضيف **ملحًا** (salt) عشوائيًا لكل كلمة سر، فتختلف البصمة حتى لو تشابهت كلمتا سر. وهو بطيء عمدًا ليصعّب على المهاجم تجربة ملايين الاحتمالات.", en: "A hash is one-way and can't be reversed, and bcrypt adds a random **salt** per password, so two identical passwords get different hashes. It's slow on purpose, to make trying millions of guesses expensive." },
      { icon: "🍪", ar: "كوكي الجلسة الآمن له خصائص: `HttpOnly` (لا يقرؤه JavaScript فيصعب سرقته بـ XSS)، و `Secure` (عبر HTTPS فقط)، و `SameSite=Lax` (حماية من CSRF). والـ JWT **موقّع لا مشفّر**: أي أحد يستطيع قراءة محتواه، فلا تضع فيه أسرارًا.", en: "A safe session cookie has flags: `HttpOnly` (JavaScript can't read it, so XSS can't steal it), `Secure` (HTTPS only), and `SameSite=Lax` (CSRF protection). A JWT is **signed, not encrypted**: anyone can read it, so keep secrets out of it." },
      { icon: "🧰", ar: "`401` تعني «من أنت؟» (لم تسجل الدخول)، و `403` تعني «أعرفك لكن غير مسموح لك». ولا تبنِ نظام الدخول من الصفر في مشروع حقيقي: استخدم مكتبة موثوقة مثل Auth.js أو خدمة مثل Supabase Auth، وحدّد عدد محاولات الدخول.", en: "`401` means \"who are you?\" (not signed in); `403` means \"I know you, but you're not allowed\". In a real project, don't build auth from scratch: use a trusted library like Auth.js or a service like Supabase Auth, and rate-limit sign-in attempts." },
    ],
    mistakes: [
      { ar: "مقارنة كلمة السر مباشرة `password === user.password` → يعني أنك تحفظها كما هي. احفظ البصمة وقارن بـ `await bcrypt.compare(password, user.passwordHash)`.", en: "Comparing passwords directly `password === user.password` → that means you store them as-is. Store the hash and compare with `await bcrypt.compare(password, user.passwordHash)`." },
      { ar: "رسائل خطأ تكشف الكثير مثل «هذا البريد غير مسجل» → تساعد المهاجم على معرفة الحسابات. استخدم رسالة واحدة: `Invalid email or password`.", en: "Error messages that reveal too much, like \"this email isn't registered\" → they help attackers find accounts. Use one message: `Invalid email or password`." },
      { ar: "رفع ملف `.env` إلى GitHub بالخطأ → أضفه إلى `.gitignore` قبل أول commit، وإن تسرّب فغيّر كل المفاتيح التي فيه فورًا.", en: "Accidentally pushing `.env` to GitHub → add it to `.gitignore` before the first commit, and if it leaks, rotate every key in it immediately." },
    ],
  },
};
