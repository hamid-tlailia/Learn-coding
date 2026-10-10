import type { Deep } from "../types";

/** "Go deeper" notes for the Start and HTML stages, keyed by "stage/slug". */
export const htmlDeep: Record<string, Deep> = {
  "start/how-the-web-works": {
    more: [
      {
        icon: "🧭",
        ar: "قبل أن يطلب المتصفح الصفحة، يحتاج إلى عنوان الخادم الرقمي (**IP address**). نظام **DNS** يعمل كدليل هاتف للإنترنت: يحوّل اسمًا مثل `example.com` إلى رقم يصل به المتصفح إلى الخادم.",
        en: "Before the browser can ask for a page, it needs the server's numeric address (**IP address**). **DNS** works like the internet's phone book: it turns a name like `example.com` into a number the browser can reach.",
      },
      {
        icon: "📨",
        ar: "المتصفح والخادم يتحدثان بلغة اسمها **HTTP**: المتصفح يرسل **طلبًا** (request) والخادم يرد **باستجابة** (response) فيها رمز حالة مثل `200` (نجاح) أو `404` (غير موجود). الحرف S في **HTTPS** يعني أن الاتصال مشفّر، وهو المعيار اليوم لكل موقع.",
        en: "Browser and server talk in a language called **HTTP**: the browser sends a **request** and the server answers with a **response** that carries a status code like `200` (OK) or `404` (not found). The S in **HTTPS** means the connection is encrypted, and it's the standard for every site today.",
      },
      {
        icon: "🔍",
        ar: "يمكنك رؤية هذا بنفسك: افتح أدوات المطوّر في المتصفح (F12) ثم تبويب **Network** وأعد تحميل الصفحة. سترى كل ملف طلبه المتصفح: HTML أولًا، ثم CSS و JavaScript والصور.",
        en: "You can watch this yourself: open the browser's developer tools (F12), go to the **Network** tab and reload. You'll see every file the browser requested: the HTML first, then CSS, JavaScript and images.",
      },
    ],
    mistakes: [
      {
        ar: "الظن أن الإنترنت والويب شيء واحد ← الإنترنت هو الشبكة (الأسلاك والأجهزة)، والويب خدمة واحدة تعمل عليها مثل البريد الإلكتروني والألعاب.",
        en: "Thinking the internet and the web are the same → the internet is the network (cables and machines); the web is one service running on it, alongside email, games and more.",
      },
      {
        ar: "وضع كلمات المرور أو المفاتيح السرية في كود الواجهة الأمامية ← كل ما يصل إلى المتصفح يستطيع أي زائر قراءته، فالأسرار مكانها الخادم فقط.",
        en: "Putting passwords or secret keys in frontend code → anything sent to the browser can be read by any visitor, so secrets belong on the server only.",
      },
      {
        ar: "الخلط بين المتصفح ومحرك البحث ← Chrome برنامج يعرض الصفحات، أما Google فموقع يبحث عنها. يمكنك فتح أي موقع بكتابة عنوانه مباشرة.",
        en: "Mixing up the browser and the search engine → Chrome is a program that shows pages; Google is a website that finds them. You can open any site by typing its address directly.",
      },
    ],
  },
  "start/think-like-a-programmer": {
    more: [
      {
        icon: "🦆",
        ar: "حيلة يستخدمها المحترفون اسمها **rubber duck debugging**: اشرح الكود سطرًا سطرًا بصوت عالٍ لبطة مطاطية أو لأي شيء أمامك. كثيرًا ما تكتشف الخطأ وأنت تشرح، لأن الشرح يجبرك على التفكير ببطء.",
        en: "Pros use a trick called **rubber duck debugging**: explain your code line by line, out loud, to a rubber duck or anything nearby. You often spot the bug mid-sentence, because explaining forces you to think slowly.",
      },
      {
        icon: "🪜",
        ar: "اكتب الكود بخطوات صغيرة وجرّب بعد كل خطوة. إذا كتبت 50 سطرًا ثم ظهر خطأ فلن تعرف مصدره، أما إذا جرّبت بعد كل سطرين فالخطأ دائمًا في آخر ما كتبت.",
        en: "Write code in small steps and test after each one. If you write 50 lines and then hit an error, you won't know where it came from; test every couple of lines and the bug is always in what you just wrote.",
      },
      {
        icon: "🔎",
        ar: "البحث جزء من عمل المبرمج وليس غشًا. انسخ أهم جزء من رسالة الخطأ وابحث عنه، واعتمد على مصادر موثوقة مثل **MDN** للويب. المهم أن تفهم الحل قبل أن تنسخه.",
        en: "Searching is part of a programmer's job, not cheating. Copy the key part of the error message and search for it, and lean on trusted sources like **MDN** for the web. Just make sure you understand a fix before you paste it.",
      },
    ],
    mistakes: [
      {
        ar: "البدء بكتابة الكود فورًا ← خذ دقيقتين لكتابة الخطوات بلغتك (pseudocode)، فهذا يوفّر عليك ساعة من الارتباك.",
        en: "Jumping straight into code → spend two minutes writing the steps in plain words (pseudocode); it saves an hour of confusion.",
      },
      {
        ar: "تغيير أشياء كثيرة مرة واحدة عند ظهور خطأ ← غيّر شيئًا واحدًا فقط ثم جرّب، حتى تعرف بالضبط ما الذي أصلح المشكلة أو أفسدها.",
        en: "Changing many things at once when something breaks → change one thing, then test, so you know exactly what fixed or broke it.",
      },
      {
        ar: "تجاهل رسالة الخطأ لأنها تبدو مخيفة ← اقرأها بهدوء: غالبًا تذكر اسم الملف ورقم السطر ونوع المشكلة.",
        en: "Ignoring the error message because it looks scary → read it calmly: it usually names the file, the line number and the kind of problem.",
      },
    ],
  },
  "start/your-tools": {
    more: [
      {
        icon: "🧰",
        ar: "أدوات المطوّر في المتصفح (F12 أو كليك يمين ← **Inspect**) هي أداتك الثانية بعد المحرر. تبويب **Elements** يعرض HTML الصفحة كما فهمها المتصفح، وتبويب **Console** يعرض الأخطاء.",
        en: "The browser's developer tools (F12 or right-click → **Inspect**) are your second tool after the editor. The **Elements** tab shows the page's HTML as the browser understood it, and the **Console** tab shows errors.",
      },
      {
        icon: "💾",
        ar: "فعّل الحفظ التلقائي في VS Code من **File ← Auto Save**، حتى لا تتساءل لماذا لم يتغير شيء في المتصفح. والنقطة البيضاء على اسم التبويب تعني أن الملف لم يُحفظ بعد.",
        en: "Turn on autosave in VS Code with **File → Auto Save**, so you never wonder why the browser didn't change. A white dot on a tab's name means the file isn't saved yet.",
      },
      {
        icon: "🐧",
        ar: "أسماء الملفات بحروف صغيرة ليست ذوقًا فقط: أغلب الخوادم تعمل على Linux حيث `Photo.jpg` و `photo.jpg` ملفان مختلفان. موقع يعمل على حاسوبك قد تختفي صوره بعد نشره بسبب حرف كبير واحد.",
        en: "Lowercase file names aren't just taste: most servers run Linux, where `Photo.jpg` and `photo.jpg` are different files. A site that works on your laptop can lose its images once published because of one capital letter.",
      },
    ],
    mistakes: [
      {
        ar: "فتح ملف واحد بدل المجلد كله ← افتح مجلد المشروع من **Open Folder** حتى يرى المحرر كل الملفات ويعمل Live Server بشكل صحيح.",
        en: "Opening a single file instead of the folder → open the project folder with **Open Folder** so the editor sees every file and Live Server works properly.",
      },
      {
        ar: "حفظ الملف باسم `index.html.txt` دون أن تنتبه ← فعّل إظهار امتدادات الملفات في نظامك، وتأكد أن الاسم ينتهي بـ `.html` فقط.",
        en: "Saving as `index.html.txt` without noticing → turn on file extensions in your system settings and make sure the name ends in `.html` only.",
      },
      {
        ar: "كتابة الكود في Word أو برنامج نصوص منسّق ← هذه البرامج تضيف تنسيقًا مخفيًا وعلامات تنصيص ملتوية مثل `“` تكسر الكود. استخدم محرر أكواد دائمًا.",
        en: "Writing code in Word or a rich-text app → they add hidden formatting and curly quotes like `“` that break code. Always use a code editor.",
      },
    ],
  },
  "html/what-is-html": {
    more: [
      {
        icon: "🌳",
        ar: "المتصفح لا يعرض النص كما كتبته، بل يقرؤه ويبني منه شجرة اسمها **DOM**: كل عنصر فرع، وما بداخله أغصانه. CSS و JavaScript يعملان على هذه الشجرة وليس على الملف النصي.",
        en: "The browser doesn't show your text as typed: it reads it and builds a tree called the **DOM**, where each element is a branch holding its children. CSS and JavaScript work on this tree, not on the text file.",
      },
      {
        icon: "🪆",
        ar: "العناصر تتداخل مثل علب داخل علب، والقاعدة: آخر ما فتحته تغلقه أولًا. `<p><strong>مهم</strong></p>` صحيح، أما `<p><strong>مهم</p></strong>` فمتشابك.",
        en: "Elements nest like boxes inside boxes, and the rule is: the last one opened closes first. `<p><strong>Hi</strong></p>` is right; `<p><strong>Hi</p></strong>` is tangled.",
      },
      {
        icon: "🛟",
        ar: "HTML متسامحة جدًا: إذا أخطأت لا تظهر رسالة خطأ، بل يحاول المتصفح تخمين ما تقصده. هذا يعني أن الأخطاء تختبئ، لذلك افحص الكود بأداة مثل `validator.w3.org`.",
        en: "HTML is very forgiving: a mistake shows no error message, the browser just guesses what you meant. That means mistakes hide, so check your code with a tool like `validator.w3.org`.",
      },
    ],
    mistakes: [
      {
        ar: "نسيان وسم الإغلاق ← بدون `</p>` قد يستمر العنصر أبعد مما تريد. اكتب الفتح والإغلاق معًا ثم ضع المحتوى بينهما.",
        en: "Forgetting the closing tag → without `</p>` an element can run on further than you meant. Type the opening and closing tags together, then fill in between.",
      },
      {
        ar: "كتابة الإغلاق بدون الشرطة `/` ← `<p>Hi<p>` تفتح فقرة ثانية بدل أن تغلق الأولى. الصحيح: `<p>Hi</p>`.",
        en: "Writing the closing tag without the slash → `<p>Hi<p>` opens a second paragraph instead of closing the first. Correct: `<p>Hi</p>`.",
      },
      {
        ar: "استخدام وسم لأنه يعطي شكلًا معينًا ← اختر الوسم حسب **المعنى** (عنوان، فقرة، قائمة)، والشكل تتكفّل به CSS لاحقًا.",
        en: "Picking a tag for how it looks → choose tags by **meaning** (heading, paragraph, list); CSS will handle the look later.",
      },
    ],
  },
  "html/page-skeleton": {
    more: [
      {
        icon: "⚙️",
        ar: "بدون `<!DOCTYPE html>` يدخل المتصفح **وضع التوافق** (quirks mode) ويقلّد سلوك متصفحات التسعينات، فتختلف المقاسات والمسافات بطرق غريبة. هذا السطر القصير يضمن **الوضع القياسي** (standards mode).",
        en: "Without `<!DOCTYPE html>` the browser falls into **quirks mode** and imitates 1990s browsers, so sizes and spacing behave strangely. That one short line guarantees **standards mode**.",
      },
      {
        icon: "↔️",
        ar: "للصفحات العربية أضف `dir=\"rtl\"` بجانب `lang`: `<html lang=\"ar\" dir=\"rtl\">`. الخاصية `lang` تحدد اللغة، و `dir` تحدد اتجاه الكتابة، والمتصفح يقلب ترتيب العناصر تلقائيًا.",
        en: "For Arabic pages add `dir=\"rtl\"` next to `lang`: `<html lang=\"ar\" dir=\"rtl\">`. `lang` names the language and `dir` sets the writing direction, and the browser flips the layout for you.",
      },
      {
        icon: "🏷️",
        ar: "نص `<title>` هو ما يظهر كعنوان أزرق في نتائج Google وعند حفظ الصفحة في المفضلة. اجعله قصيرًا ومميزًا لكل صفحة، مثل `About me | Hamid` بدل `Page 1`.",
        en: "The `<title>` text is what shows as the blue headline in Google results and in bookmarks. Keep it short and unique per page, like `About me | Hamid` instead of `Page 1`.",
      },
    ],
    mistakes: [
      {
        ar: "وضع محتوى مرئي داخل `<head>` ← ما يراه الزائر (عناوين، فقرات، صور) مكانه `<body>` فقط.",
        en: "Putting visible content inside `<head>` → anything visitors should see (headings, paragraphs, images) goes in `<body>` only.",
      },
      {
        ar: "نسيان `<meta charset=\"UTF-8\">` أو وضعه متأخرًا ← قد يظهر النص العربي رموزًا غريبة. اجعله أول سطر داخل `<head>`.",
        en: "Forgetting `<meta charset=\"UTF-8\">` or placing it late → text can show as garbled symbols. Make it the very first line inside `<head>`.",
      },
      {
        ar: "نسيان وسم viewport ← تظهر الصفحة على الهاتف صغيرة جدًا كأنها شاشة حاسوب مصغّرة. أضف `<meta name=\"viewport\" content=\"width=device-width, initial-scale=1\">`.",
        en: "Leaving out the viewport tag → on phones the page shows tiny, like a shrunken desktop screen. Add `<meta name=\"viewport\" content=\"width=device-width, initial-scale=1\">`.",
      },
    ],
  },
  "html/first-page": {
    more: [
      {
        icon: "🗺️",
        ar: "مستخدمو قارئات الشاشة يتنقلون في الصفحة بالقفز من عنوان إلى عنوان، مثلما تتصفح فهرس كتاب. لذلك العناوين ليست مجرد خط كبير، بل هي خريطة الصفحة.",
        en: "Screen-reader users move around a page by jumping from heading to heading, like scanning a book's table of contents. So headings aren't just big text, they're the page's map.",
      },
      {
        icon: "📐",
        ar: "المتصفح يدمج المسافات والأسطر الجديدة المتتالية في مسافة واحدة. لذلك الضغط على Enter عشر مرات في الكود لا يضيف فراغًا في الصفحة، والفراغات مكانها CSS.",
        en: "The browser collapses runs of spaces and line breaks into a single space. So pressing Enter ten times in your code adds no gap on the page; spacing belongs in CSS.",
      },
      {
        icon: "📏",
        ar: "اجعل الفقرة فكرة واحدة. النص المقسّم إلى فقرات قصيرة أسهل للقراءة على الهاتف، وكل فقرة `<p>` تأخذ مسافة تلقائية قبلها وبعدها.",
        en: "Keep one idea per paragraph. Text split into short paragraphs is easier to read on a phone, and each `<p>` gets automatic space above and below.",
      },
    ],
    mistakes: [
      {
        ar: "استخدام `<h1>` لكل نص تريده كبيرًا ← العنوان للعناوين فقط. إذا أردت نصًا أكبر فهذا عمل CSS مثل `font-size`.",
        en: "Using `<h1>` for any text you want big → headings are for headings only. Bigger text is a CSS job, like `font-size`.",
      },
      {
        ar: "كتابة نص خارج أي وسم ← النص الحر يظهر لكنه بلا معنى. ضع كل نص داخل عنصر مناسب مثل `<p>`.",
        en: "Writing text outside any tag → loose text shows up but means nothing. Wrap every piece of text in a fitting element like `<p>`.",
      },
      {
        ar: "وضع عنوان داخل فقرة ← `<p><h2>…</h2></p>` غير صحيح، فالمتصفح يغلق الفقرة قبل العنوان. اجعلهما متجاورين: `<h2>…</h2><p>…</p>`.",
        en: "Putting a heading inside a paragraph → `<p><h2>…</h2></p>` is invalid; the browser closes the paragraph before the heading. Keep them side by side: `<h2>…</h2><p>…</p>`.",
      },
    ],
  },
  "html/text-elements": {
    more: [
      {
        icon: "🔐",
        ar: "بعض الحروف لها معنى خاص في HTML، فلعرضها كنص نكتبها كـ **كيانات** (entities): `&lt;` لـ `<` و `&gt;` لـ `>` و `&amp;` لـ `&`. لهذا يستخدم المثال `&lt;p&gt;` داخل `<code>`.",
        en: "Some characters are special in HTML, so to show them as text we write **entities**: `&lt;` for `<`, `&gt;` for `>` and `&amp;` for `&`. That's why the example uses `&lt;p&gt;` inside `<code>`.",
      },
      {
        icon: "📚",
        ar: "`<b>` و `<i>` لم يُحذفا، بل تغيّر معناهما: `<i>` لمصطلح أجنبي أو اسم كتاب، و `<b>` للفت الانتباه دون أهمية إضافية. القاعدة: إذا كان النص **مهمًا** فاستخدم `<strong>`.",
        en: "`<b>` and `<i>` weren't removed, their meaning changed: `<i>` is for a foreign term or a book title, `<b>` draws attention without extra importance. Rule of thumb: if the text **matters**, use `<strong>`.",
      },
      {
        icon: "🗓️",
        ar: "هناك وسوم دلالية صغيرة مفيدة أيضًا: `<time datetime=\"2026-03-01\">` لتاريخ يفهمه الجهاز، و `<abbr title=\"HyperText Markup Language\">HTML</abbr>` لاختصار مع شرحه، و `<small>` للملاحظات الجانبية.",
        en: "Other handy small semantic tags: `<time datetime=\"2026-03-01\">` for a machine-readable date, `<abbr title=\"HyperText Markup Language\">HTML</abbr>` for an abbreviation with its meaning, and `<small>` for side notes.",
      },
    ],
    mistakes: [
      {
        ar: "تكرار `<br>` لصنع مسافات ← `<br><br><br>` حيلة قديمة. استخدم فقرات منفصلة، والمسافات تضبطها CSS بـ `margin`.",
        en: "Stacking `<br>` to make space → `<br><br><br>` is an old hack. Use separate paragraphs and let CSS `margin` handle spacing.",
      },
      {
        ar: "استخدام `<blockquote>` لإزاحة النص فقط ← هذا الوسم للاقتباس من مصدر آخر. للإزاحة استخدم CSS.",
        en: "Using `<blockquote>` just to indent text → it's for quoting another source. Use CSS for indentation.",
      },
      {
        ar: "وضع `<strong>` على كل جملة ← إذا كان كل شيء مهمًا فلا شيء مهم. احتفظ به لكلمات قليلة تستحق التنبيه.",
        en: "Wrapping every sentence in `<strong>` → if everything is important, nothing is. Save it for the few words that truly deserve it.",
      },
    ],
  },
  "html/links-images": {
    more: [
      {
        icon: "📂",
        ar: "المسار المطلق مثل `https://site.com/cat.jpg` يشير إلى موقع كامل، أما المسار النسبي مثل `images/cat.jpg` فيبدأ من مكان الملف الحالي. استخدم النسبي لملفات موقعك، و `../` يعني «اصعد مجلدًا».",
        en: "An absolute path like `https://site.com/cat.jpg` points to a full address, while a relative path like `images/cat.jpg` starts from the current file's folder. Use relative paths for your own files; `../` means \"go up one folder\".",
      },
      {
        icon: "🔗",
        ar: "نص الرابط يجب أن يصف وجهته: «اقرأ دليل HTML» أفضل من «اضغط هنا»، لأن قارئات الشاشة تعرض قائمة بالروابط وحدها. ولفتح رابط في تبويب جديد استخدم `target=\"_blank\"` فقط عند الحاجة.",
        en: "Link text should describe where it goes: \"Read the HTML guide\" beats \"click here\", because screen readers can list links on their own. Use `target=\"_blank\"` to open a new tab only when it's really needed.",
      },
      {
        icon: "🖼️",
        ar: "الصورة الزخرفية التي لا تضيف معلومة تأخذ `alt` فارغًا: `alt=\"\"`، فيتجاهلها قارئ الشاشة. أما غياب `alt` كليًا فيجعله يقرأ اسم الملف مثل «IMG_2041.jpg».",
        en: "A decorative image that adds no information gets an empty `alt=\"\"`, so screen readers skip it. Leaving `alt` out entirely makes them read the file name, like \"IMG_2041.jpg\".",
      },
    ],
    mistakes: [
      {
        ar: "نسيان `https://` في الروابط الخارجية ← `href=\"google.com\"` يبحث عن ملف داخل موقعك. الصحيح: `href=\"https://google.com\"`.",
        en: "Forgetting `https://` on external links → `href=\"google.com\"` looks for a file inside your own site. Correct: `href=\"https://google.com\"`.",
      },
      {
        ar: "كتابة «صورة لـ…» في `alt` ← قارئ الشاشة يعلن أنها صورة بنفسه. صف المحتوى مباشرة: `alt=\"قطة نائمة على الكنبة\"`.",
        en: "Starting `alt` with \"image of…\" → screen readers already announce it's an image. Describe the content directly: `alt=\"A cat asleep on the sofa\"`.",
      },
      {
        ar: "خطأ في المسار أو حالة الأحرف ← `Images/Cat.JPG` ليس `images/cat.jpg` على الخادم. إذا ظهرت أيقونة صورة مكسورة فافحص المسار حرفًا حرفًا.",
        en: "A wrong path or letter case → `Images/Cat.JPG` is not `images/cat.jpg` on a server. If you see a broken-image icon, check the path letter by letter.",
      },
    ],
  },
  "html/lists": {
    more: [
      {
        icon: "🪺",
        ar: "يمكن وضع قائمة داخل قائمة، لكن القائمة الداخلية توضع **داخل** `<li>` وليس بين عنصرين: `<li>Frontend<ul><li>HTML</li></ul></li>`. هكذا تُبنى القوائم الفرعية في القوائم المنسدلة.",
        en: "Lists can nest, but the inner list goes **inside** an `<li>`, not between items: `<li>Frontend<ul><li>HTML</li></ul></li>`. That's how dropdown submenus are built.",
      },
      {
        icon: "🔢",
        ar: "`<ol>` له خصائص مفيدة: `start=\"5\"` يبدأ العد من 5، و `reversed` يعدّ تنازليًا، و `type=\"a\"` يستخدم الحروف. وقائمة التنقل في أغلب المواقع هي في الحقيقة `<ul>` من الروابط.",
        en: "`<ol>` has handy attributes: `start=\"5\"` begins counting at 5, `reversed` counts down, and `type=\"a\"` uses letters. And most sites' navigation menus are really a `<ul>` of links.",
      },
      {
        icon: "📖",
        ar: "هناك نوع ثالث هو **قائمة الوصف** `<dl>`: فيها مصطلح `<dt>` وشرحه `<dd>`. مناسبة للقواميس والأسئلة الشائعة ومواصفات المنتجات.",
        en: "There's a third kind, the **description list** `<dl>`: a term `<dt>` followed by its description `<dd>`. It suits glossaries, FAQs and product specs.",
      },
    ],
    mistakes: [
      {
        ar: "وضع نص أو وسم آخر مباشرة داخل `<ul>` ← الأبناء المباشرون للقائمة يجب أن يكونوا `<li>` فقط. ضع أي محتوى داخل `<li>`.",
        en: "Putting text or other tags directly in `<ul>` → a list's direct children must be `<li>` only. Wrap any content in an `<li>`.",
      },
      {
        ar: "كتابة الأرقام بيدك داخل `<ul>` ← `<li>1. Boil water</li>` يتكسر عند إضافة خطوة. استخدم `<ol>` ودعه يعدّ عنك.",
        en: "Typing numbers by hand in a `<ul>` → `<li>1. Boil water</li>` breaks when you add a step. Use `<ol>` and let it count for you.",
      },
      {
        ar: "استخدام القائمة فقط للحصول على إزاحة ← القائمة لمجموعة عناصر متشابهة. للإزاحة أو لإخفاء النقاط استخدم CSS مثل `list-style: none`.",
        en: "Using a list just for indentation → lists are for groups of similar items. For indentation or hiding bullets, use CSS like `list-style: none`.",
      },
    ],
  },
  "html/tables": {
    more: [
      {
        icon: "🧾",
        ar: "أضف `<caption>` كأول عنصر داخل `<table>` ليكون عنوانًا للجدول يقرؤه الجميع. وفي الجداول التي لها عناوين في الصفوف أيضًا، استخدم `<th scope=\"row\">` و `<th scope=\"col\">` ليعرف قارئ الشاشة اتجاه كل عنوان.",
        en: "Add a `<caption>` as the first thing inside `<table>` to title it for everyone. When rows have headers too, use `<th scope=\"row\">` and `<th scope=\"col\">` so screen readers know which way each header points.",
      },
      {
        icon: "🔗",
        ar: "لدمج خلايا استخدم `colspan=\"2\"` لتمتد الخلية على عمودين، و `rowspan=\"2\"` لتمتد على صفين. وللمجاميع في آخر الجدول يوجد `<tfoot>`.",
        en: "To merge cells, `colspan=\"2\"` makes a cell span two columns and `rowspan=\"2\"` spans two rows. For totals at the bottom there's `<tfoot>`.",
      },
      {
        icon: "📱",
        ar: "الجداول العريضة تخرج من شاشة الهاتف. الحل الشائع: ضع الجدول داخل `<div>` وأعطه في CSS `overflow-x: auto` ليُمرَّر أفقيًا دون أن يكسر الصفحة.",
        en: "Wide tables spill off phone screens. The common fix: wrap the table in a `<div>` with `overflow-x: auto` in CSS so it scrolls sideways without breaking the page.",
      },
    ],
    mistakes: [
      {
        ar: "وضع `<td>` مباشرة داخل `<table>` بدون `<tr>` ← كل خلية يجب أن تكون داخل صف: `<tr><td>…</td></tr>`.",
        en: "Putting `<td>` straight into `<table>` with no `<tr>` → every cell must sit inside a row: `<tr><td>…</td></tr>`.",
      },
      {
        ar: "اختلاف عدد الخلايا بين الصفوف ← إذا كان صف العناوين فيه 3 خلايا وصف البيانات 2، تنحرف الأعمدة. عدّ الخلايا أو استخدم `colspan`.",
        en: "Rows with different cell counts → if the header row has 3 cells and a data row has 2, columns go out of line. Count cells or use `colspan`.",
      },
      {
        ar: "استخدام `<td>` بخط عريض بدل `<th>` ← الخط العريض لا يجعلها عنوانًا لقارئ الشاشة. خلايا العناوين تُكتب بـ `<th>` دائمًا.",
        en: "Using a bold `<td>` instead of `<th>` → bold text doesn't make it a header for screen readers. Header cells are always `<th>`.",
      },
    ],
  },
  "html/forms": {
    more: [
      {
        icon: "📮",
        ar: "عند الإرسال، يرسل النموذج كل حقل كزوج **اسم = قيمة**، والاسم يأتي من الخاصية `name`. الحقل بدون `name` لا يُرسل أبدًا. و `action` تحدد أين تذهب البيانات و `method` (`get` أو `post`) تحدد الطريقة.",
        en: "On submit, a form sends each field as a **name = value** pair, and the name comes from the `name` attribute. A field without `name` is never sent. `action` sets where the data goes and `method` (`get` or `post`) how.",
      },
      {
        icon: "✨",
        ar: "الخاصية `autocomplete` تساعد المتصفح على ملء البيانات المحفوظة تلقائيًا: `autocomplete=\"email\"` أو `\"current-password\"` أو `\"new-password\"`. ولتجميع حقول مترابطة مثل خيارات الدفع استخدم `<fieldset>` مع عنوان `<legend>`.",
        en: "The `autocomplete` attribute helps the browser fill saved data: `autocomplete=\"email\"`, `\"current-password\"` or `\"new-password\"`. To group related fields like payment options, use `<fieldset>` with a `<legend>` title.",
      },
      {
        icon: "🛡️",
        ar: "التحقق في HTML مثل `required` و `type=\"email\"` و `minlength` يحسّن تجربة الزائر، لكنه **ليس حماية**: أي شخص يستطيع تجاوزه. الخادم يجب أن يتحقق من البيانات مرة أخرى دائمًا.",
        en: "HTML validation like `required`, `type=\"email\"` and `minlength` improves the visitor's experience, but it's **not security**: anyone can bypass it. The server must always check the data again.",
      },
    ],
    mistakes: [
      {
        ar: "نسيان `name` على الحقول ← يبدو النموذج سليمًا لكن البيانات لا تصل. أضف `name` لكل حقل: `<input type=\"email\" id=\"email\" name=\"email\">`.",
        en: "Forgetting `name` on fields → the form looks fine but the data never arrives. Give every field a `name`: `<input type=\"email\" id=\"email\" name=\"email\">`.",
      },
      {
        ar: "زر عادي داخل نموذج يرسله بالخطأ ← نوع `<button>` الافتراضي داخل `<form>` هو `submit`. للأزرار الأخرى اكتب `type=\"button\"` صراحة.",
        en: "A regular button inside a form submits it by accident → a `<button>`'s default type inside a `<form>` is `submit`. For other buttons write `type=\"button\"` explicitly.",
      },
      {
        ar: "تكرار نفس `id` لحقلين ← `id` يجب أن يكون فريدًا في الصفحة، وإلا ارتبط الـ label بالحقل الخطأ.",
        en: "Reusing the same `id` on two fields → an `id` must be unique on the page, or a label links to the wrong field.",
      },
    ],
  },
  "html/media-a11y": {
    more: [
      {
        icon: "🎞️",
        ar: "يمكنك وضع عدة `<source>` بصيغ مختلفة، والمتصفح يختار أول صيغة يدعمها. وأضف ترجمة نصية بالوسم `<track kind=\"captions\" src=\"subs.vtt\" srclang=\"ar\">` لمن لا يسمع أو يشاهد بدون صوت.",
        en: "You can list several `<source>` elements in different formats, and the browser plays the first it supports. Add captions with `<track kind=\"captions\" src=\"subs.vtt\" srclang=\"en\">` for viewers who can't hear or watch muted.",
      },
      {
        icon: "🔇",
        ar: "المتصفحات تمنع التشغيل التلقائي للفيديو بالصوت. إذا أردت `autoplay` (مثل فيديو خلفية) فأضف `muted` و `playsinline` معه، وإلا لن يعمل على أغلب الأجهزة.",
        en: "Browsers block autoplaying video with sound. If you need `autoplay` (say, a background video), add `muted` and `playsinline` with it, or it won't play on most devices.",
      },
      {
        icon: "⌨️",
        ar: "اختبار سريع لإتاحة الوصول: ضع الفأرة جانبًا وتنقّل في صفحتك بزر Tab وحده. يجب أن ترى أين أنت دائمًا، وأن تصل لكل زر ورابط، وأن تضغطه بـ Enter أو المسافة.",
        en: "A quick accessibility test: put the mouse away and move through your page with Tab alone. You should always see where you are, reach every button and link, and press it with Enter or Space.",
      },
    ],
    mistakes: [
      {
        ar: "إضافة `aria-label` لكل شيء ← ARIA للحالات التي لا يكفي فيها HTML. القاعدة الأولى: استخدم الوسم الصحيح أولًا، وزر فيه نص مرئي لا يحتاج `aria-label`.",
        en: "Adding `aria-label` to everything → ARIA is for cases plain HTML can't cover. First rule: use the right element; a button with visible text doesn't need `aria-label`.",
      },
      {
        ar: "إزالة إطار التركيز بـ `outline: none` لأنه يبدو غريبًا ← بدونه لا يعرف مستخدم لوحة المفاتيح أين هو. إذا غيّرت شكله فاستبدله بتصميم واضح، لا تحذفه.",
        en: "Removing the focus ring with `outline: none` because it looks odd → without it keyboard users are lost. Restyle it clearly if you like, but never just delete it.",
      },
      {
        ar: "الاعتماد على اللون وحده لنقل المعنى ← «الحقول الحمراء خاطئة» لا تصل لمن لا يميّز الألوان. أضف نصًا أو أيقونة مع اللون.",
        en: "Relying on color alone to carry meaning → \"red fields are wrong\" fails people who can't tell colors apart. Add text or an icon alongside the color.",
      },
    ],
  },
  "html/semantic-layout": {
    more: [
      {
        icon: "🧭",
        ar: "قارئات الشاشة تحوّل هذه الوسوم إلى **معالم** (landmarks)، فيقفز المستخدم مباشرة إلى `<main>` أو `<nav>` دون سماع كل الصفحة. لذلك يجب أن يكون في الصفحة `<main>` واحد ظاهر فقط.",
        en: "Screen readers turn these tags into **landmarks**, so users can jump straight to `<main>` or `<nav>` without hearing the whole page. That's why a page should have only one visible `<main>`.",
      },
      {
        icon: "📰",
        ar: "داخل `<main>` استخدم `<section>` لقسم له عنوان خاص، و `<article>` لمحتوى مستقل يمكن نشره وحده مثل تدوينة أو بطاقة منتج، و `<aside>` لمحتوى جانبي. ابقَ على `<div>` عندما تحتاج غلافًا للتنسيق فقط.",
        en: "Inside `<main>`, use `<section>` for a part with its own heading, `<article>` for self-contained content that could stand alone like a blog post or product card, and `<aside>` for side content. Keep `<div>` for wrappers that exist only for styling.",
      },
      {
        icon: "🔁",
        ar: "`<header>` و `<footer>` لا يعنيان أعلى وأسفل الصفحة فقط: يمكن أن يكون لكل `<article>` ترويسته وتذييله. واستخدم `<nav>` للقوائم الرئيسية فقط، وليس لكل مجموعة روابط.",
        en: "`<header>` and `<footer>` aren't only the page's top and bottom: each `<article>` can have its own. And use `<nav>` for major navigation blocks only, not every group of links.",
      },
    ],
    mistakes: [
      {
        ar: "استبدال كل `<div>` بـ `<section>` ← `<section>` بدون عنوان لا يضيف معنى. إذا كان الغلاف للتنسيق فقط فاستخدم `<div>`.",
        en: "Swapping every `<div>` for `<section>` → a `<section>` with no heading adds no meaning. If a wrapper is only for styling, use `<div>`.",
      },
      {
        ar: "وضع `<header>` أو `<footer>` داخل `<main>` كترويسة للصفحة ← ترويسة الموقع وتذييله يأتيان خارج `<main>` كأخوة له، لأن `<main>` للمحتوى الفريد لهذه الصفحة.",
        en: "Putting the site's `<header>` or `<footer>` inside `<main>` → the site header and footer sit outside `<main>` as its siblings, since `<main>` holds only this page's unique content.",
      },
      {
        ar: "الظن أن الوسوم الدلالية تغيّر الشكل ← `<nav>` لا يجعل الروابط أفقية ولا `<header>` يلوّن الخلفية. المعنى من HTML والشكل من CSS.",
        en: "Expecting semantic tags to change the look → `<nav>` doesn't line links up and `<header>` doesn't add a background. Meaning comes from HTML, looks from CSS.",
      },
    ],
  },
};
