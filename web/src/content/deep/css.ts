import type { Deep } from "../types";

/** "Go deeper" notes for the CSS stage, keyed by "stage/slug". */
export const cssDeep: Record<string, Deep> = {
  "css/what-is-css": {
    more: [
      {
        icon: "🌊",
        ar: "كلمة **Cascading** تعني «التتابع»: المتصفح يجمع القواعد من عدة مصادر (تنسيقه الافتراضي ثم ملفك) ويقرر أيها يفوز. لهذا يظهر `h1` كبيرًا وعريضًا حتى قبل أن تكتب أي CSS، فهذا تنسيق المتصفح الافتراضي.",
        en: "**Cascading** means rules flow in from several sources (the browser's defaults, then your file) and the browser decides which one wins. That's why an `h1` is already big and bold before you write any CSS: those are the browser's default styles.",
      },
      {
        icon: "🧬",
        ar: "بعض الخصائص **تُورَّث** من الأب إلى أبنائه، مثل `color` و `font-family`، وبعضها لا يُورَّث مثل `border` و `padding`. لذلك يكفي أن تضع `font-family` على `body` مرة واحدة فتصل إلى كل النصوص.",
        en: "Some properties are **inherited** from parent to children, like `color` and `font-family`; others aren't, like `border` and `padding`. That's why setting `font-family` once on `body` reaches every piece of text.",
      },
      {
        icon: "🛟",
        ar: "المتصفح متسامح: إذا أخطأت في كتابة خاصية أو قيمة يتجاهل ذلك السطر فقط ويكمل الباقي دون رسالة خطأ. افتح أدوات المطور (F12) وستجد السطر الخاطئ مشطوبًا أو عليه علامة تحذير.",
        en: "The browser is forgiving: a misspelled property or value just skips that one line, with no error message. Open DevTools (F12) and you'll see the bad line crossed out or flagged with a warning.",
      },
    ],
    mistakes: [
      {
        ar: "نسيان الفاصلة المنقوطة `;` بين الخصائص فيتعطل السطر التالي → أنهِ كل خاصية بـ `;` حتى الأخيرة.",
        en: "Forgetting the `;` between declarations breaks the next line → end every declaration with `;`, even the last one.",
      },
      {
        ar: "نسيان النقطة قبل اسم الـ class: `card { }` تبحث عن وسم اسمه card → اكتب `.card { }`.",
        en: "Leaving out the dot before a class: `card { }` looks for a tag named card → write `.card { }`.",
      },
      {
        ar: "استخدام نفس الـ id لعدة عناصر لتنسيقها معًا → الـ id يجب أن يكون فريدًا في الصفحة، استخدم class بدلًا منه.",
        en: "Reusing one id on several elements to style them together → an id must be unique on the page; use a class instead.",
      },
    ],
  },
  "css/selectors-states": {
    more: [
      {
        icon: "🧮",
        ar: "الـ specificity تُحسب كثلاثة أعداد (ids، classes، وسوم)، فـ `#nav a` = (1,0,1) يغلب `.menu .item a` = (0,2,1) مهما كثرت الـ classes. والحالات مثل `:hover` تُحسب كـ class.",
        en: "Specificity is counted as three numbers (ids, classes, tags), so `#nav a` = (1,0,1) beats `.menu .item a` = (0,2,1) no matter how many classes. Pseudo-classes like `:hover` count as classes.",
      },
      {
        icon: "🔗",
        ar: "ترتيب حالات الروابط مهم لأنها متساوية في القوة: اكتب `:hover` قبل `:active` حتى يظهر لون الضغط. ومحددات حديثة مثل `:is()` و `:where()` تختصر القوائم، و `:where()` قوته صفر فيسهل تجاوزه.",
        en: "Order matters for link states because they have equal weight: write `:hover` before `:active` so the pressed color shows. Modern `:is()` and `:where()` shorten selector lists, and `:where()` has zero specificity so it's easy to override.",
      },
      {
        icon: "🧰",
        ar: "نصيحة احترافية: اجعل المحددات قصيرة ومعتمدة على class واحد قدر الإمكان. المحددات الطويلة والقوية تجبرك لاحقًا على محددات أقوى، وهكذا تبدأ حرب specificity.",
        en: "Pro tip: keep selectors short, ideally one class. Long, heavy selectors force you to write even heavier ones later, and that's how specificity wars start.",
      },
    ],
    mistakes: [
      {
        ar: "استخدام `!important` لحل كل تعارض → افهم سبب الخسارة في أدوات المطور واكتب محددًا مناسبًا بدلًا منه.",
        en: "Reaching for `!important` to win every clash → check in DevTools why the rule loses and write a fitting selector instead.",
      },
      {
        ar: "الخلط بين `.menu a` (روابط داخل .menu) و `.menu, a` (العنصران كلاهما) → الفاصلة تعني «و»، والمسافة تعني «بداخل».",
        en: "Confusing `.menu a` (links inside .menu) with `.menu, a` (both separately) → a comma means \"and\", a space means \"inside\".",
      },
      {
        ar: "تنسيق `:hover` فقط ونسيان مستخدمي لوحة المفاتيح → أضف `:focus-visible` بنفس التنسيق: `a:hover, a:focus-visible { … }`.",
        en: "Styling only `:hover` and forgetting keyboard users → give `:focus-visible` the same look: `a:hover, a:focus-visible { … }`.",
      },
    ],
  },
  "css/colors-fonts": {
    more: [
      {
        icon: "🧬",
        ar: "المتغيرات تُورَّث مثل `color`: إذا عرّفتها في `:root` تصل لكل الصفحة، وإذا أعدت تعريفها داخل `.dark { --main: white; }` تتغير لذلك الجزء فقط. هذا سرّ الثيمات والوضع الداكن.",
        en: "Variables inherit like `color`: define one in `:root` and the whole page sees it; redefine it in `.dark { --main: white; }` and only that part changes. That's the secret behind themes and dark mode.",
      },
      {
        icon: "🎨",
        ar: "`var()` يقبل قيمة احتياطية: `color: var(--accent, tomato)` يستخدم tomato إذا لم يُعرَّف المتغير. ودالة `oklch()` الحديثة تعطي ألوانًا متسقة السطوع ويسهل صنع درجات منها.",
        en: "`var()` takes a fallback: `color: var(--accent, tomato)` uses tomato if the variable isn't defined. The modern `oklch()` function gives colors with consistent lightness, making shades easy to build.",
      },
      {
        icon: "🔤",
        ar: "`font-family` قائمة احتياطية: يجرب المتصفح الخط الأول ثم الذي بعده، فاختم دائمًا بنوع عام مثل `sans-serif`. واجعل `line-height` بين 1.4 و 1.6 بلا وحدة لنص مريح للقراءة.",
        en: "`font-family` is a fallback list: the browser tries the first font, then the next, so always end with a generic family like `sans-serif`. Set a unitless `line-height` around 1.4 to 1.6 for comfortable reading.",
      },
    ],
    mistakes: [
      {
        ar: "نسيان الشرطتين أو `var()`: `color: --main;` لا يعمل → اكتب `color: var(--main);`.",
        en: "Forgetting the dashes or `var()`: `color: --main;` does nothing → write `color: var(--main);`.",
      },
      {
        ar: "نص رمادي فاتح على خلفية بيضاء يصعب قراءته → اختر تباينًا كافيًا (4.5:1 على الأقل للنص العادي) وافحصه في أدوات المطور.",
        en: "Light gray text on white is hard to read → pick enough contrast (at least 4.5:1 for normal text) and check it in DevTools.",
      },
      {
        ar: "كتابة أحجام النص كلها بـ `px` فلا تكبر عندما يكبّر المستخدم الخط → استخدم `rem` للخطوط.",
        en: "Sizing all text in `px` so it ignores the user's font setting → use `rem` for font sizes.",
      },
    ],
  },
  "css/box-model": {
    more: [
      {
        icon: "🤝",
        ar: "الهوامش العمودية بين العناصر المتتالية **تندمج** (margin collapsing): `margin-bottom: 20px` فوق `margin-top: 30px` تعطي 30px فقط لا 50px. لا يحدث هذا داخل flex أو grid.",
        en: "Vertical margins between stacked elements **collapse**: `margin-bottom: 20px` above `margin-top: 30px` gives 30px, not 50px. This doesn't happen inside flex or grid.",
      },
      {
        icon: "🎯",
        ar: "`margin: 0 auto` يوسّط صندوقًا له عرض محدد أفقيًا. واختصارات القيم تدور مع عقارب الساعة: `padding: 8px 16px` = أعلى وأسفل 8، يمين ويسار 16.",
        en: "`margin: 0 auto` centers a box with a set width horizontally. Shorthand values go clockwise: `padding: 8px 16px` = 8 top and bottom, 16 left and right.",
      },
      {
        icon: "🌍",
        ar: "للمواقع العربية استخدم الخصائص المنطقية مثل `margin-inline-start` و `padding-inline` بدل left و right، فتنقلب تلقائيًا مع اتجاه `dir=\"rtl\"`.",
        en: "For Arabic sites use logical properties like `margin-inline-start` and `padding-inline` instead of left and right; they flip automatically with `dir=\"rtl\"`.",
      },
    ],
    mistakes: [
      {
        ar: "استخدام `margin` لصنع مسافة داخل البطاقة → المسافة الداخلية حول النص هي `padding`، و `margin` للمسافة بين البطاقات.",
        en: "Using `margin` for space inside a card → space around the content is `padding`; `margin` is space between cards.",
      },
      {
        ar: "كتابة `border: 1px #ddd` دون نوع الخط فلا يظهر الحد → النوع إلزامي: `border: 1px solid #ddd`.",
        en: "Writing `border: 1px #ddd` without a style so no border shows → the style is required: `border: 1px solid #ddd`.",
      },
      {
        ar: "تحديد `height` ثابت لصندوق نصي فيفيض النص منه → اترك الارتفاع تلقائيًا أو استخدم `min-height`.",
        en: "Giving a text box a fixed `height` so text spills out → let height be automatic or use `min-height`.",
      },
    ],
  },
  "css/flexbox": {
    more: [
      {
        icon: "🧭",
        ar: "Flexbox يعمل بمحورين: **المحور الرئيسي** حسب `flex-direction` والمحور العرضي عموديًا عليه. `justify-content` يعمل دائمًا على الرئيسي و `align-items` على العرضي، فإذا صار الاتجاه `column` تبادلا أدوارهما.",
        en: "Flexbox has two axes: the **main axis** set by `flex-direction`, and the cross axis perpendicular to it. `justify-content` always works on the main axis and `align-items` on the cross axis, so with `column` they swap roles.",
      },
      {
        icon: "🧩",
        ar: "الخاصية `flex` على الأبناء تتحكم في نموهم: `flex: 1` يجعل العنصر يأخذ المساحة المتبقية، مثل حقل بحث بجانب زر. و `margin-left: auto` على عنصر واحد يدفعه إلى الطرف الآخر.",
        en: "The `flex` property on children controls growth: `flex: 1` makes an item take the free space, like a search field next to a button. `margin-left: auto` on one item pushes it to the far end.",
      },
      {
        icon: "🎯",
        ar: "التوسيط الكامل صار ثلاثة أسطر: `display: flex; justify-content: center; align-items: center;`. لكن انتبه: التوسيط العمودي يحتاج ارتفاعًا للأب مثل `min-height: 100vh`.",
        en: "Perfect centering is three lines: `display: flex; justify-content: center; align-items: center;`. But vertical centering needs the parent to have height, like `min-height: 100vh`.",
      },
    ],
    mistakes: [
      {
        ar: "وضع `display: flex` على الأبناء بدل الأب → ضعه على الحاوية التي تريد ترتيب ما بداخلها.",
        en: "Putting `display: flex` on the children instead of the parent → put it on the container whose children you want to arrange.",
      },
      {
        ar: "استخدام `margin-right` على كل عنصر للمسافات ثم إصلاح الأخير → `gap` على الأب يضع المسافات بين العناصر فقط.",
        en: "Adding `margin-right` to every item then fixing the last one → `gap` on the parent spaces only between items.",
      },
      {
        ar: "نص طويل يكسر التخطيط لأن العنصر يرفض أن يصغر → أضف `min-width: 0` للعنصر المرن حتى يسمح بالتصغير.",
        en: "A long word breaks the layout because the item refuses to shrink → add `min-width: 0` to the flex item so it can shrink.",
      },
    ],
  },
  "css/grid": {
    more: [
      {
        icon: "🗺️",
        ar: "`grid-template-areas` يتيح رسم التخطيط بالأسماء: `\"header header\" \"side main\"` ثم `grid-area: main` على العنصر. طريقة مقروءة جدًا لتخطيط صفحة كاملة.",
        en: "`grid-template-areas` lets you draw the layout with names: `\"header header\" \"side main\"` then `grid-area: main` on an item. A very readable way to lay out a whole page.",
      },
      {
        icon: "↔️",
        ar: "عنصر واحد يمكن أن يمتد عدة أعمدة: `grid-column: span 2` أو `grid-column: 1 / -1` ليأخذ كامل العرض. الرقم `-1` يعني الخط الأخير.",
        en: "One item can span several columns: `grid-column: span 2`, or `grid-column: 1 / -1` to take the full width. The `-1` means the last grid line.",
      },
      {
        icon: "⚖️",
        ar: "الفرق بين `auto-fit` و `auto-fill`: `auto-fit` يمدّ العناصر لتملأ الصف إذا كانت قليلة، و `auto-fill` يترك أماكن فارغة لأعمدة غير موجودة. وأسرع توسيط: `display: grid; place-items: center;`.",
        en: "`auto-fit` vs `auto-fill`: `auto-fit` stretches few items to fill the row, while `auto-fill` keeps empty tracks for missing columns. Quickest centering: `display: grid; place-items: center;`.",
      },
    ],
    mistakes: [
      {
        ar: "الظن أن `1fr` يساوي `33%` فيفيض التخطيط مع `gap` → `fr` يقسم المساحة بعد طرح `gap`، فاستخدمه بدل النسب المئوية.",
        en: "Thinking `1fr` equals `33%` and overflowing with `gap` → `fr` divides the space left after `gap`, so prefer it over percentages.",
      },
      {
        ar: "كتابة `grid-template-columns` على الأبناء → خصائص القالب توضع على الحاوية التي فيها `display: grid`.",
        en: "Writing `grid-template-columns` on the children → template properties go on the container with `display: grid`.",
      },
      {
        ar: "استخدام Grid لكل شيء حتى صف أزرار بسيط → صف أو عمود واحد يكفيه Flexbox، و Grid للتخطيط في بعدين.",
        en: "Using Grid for everything, even a simple row of buttons → one row or column suits Flexbox; Grid is for two-dimensional layout.",
      },
    ],
  },
  "css/position": {
    more: [
      {
        icon: "🌊",
        ar: "`position: relative` وحده لا يحرك العنصر، لكنه يجعله مرجعًا لأبنائه الـ absolute. و `absolute` يُخرج العنصر من التدفق، فتتصرف العناصر الأخرى كأنه غير موجود.",
        en: "`position: relative` alone doesn't move an element, but it becomes the reference for its absolute children. `absolute` removes an element from the flow, so the others behave as if it isn't there.",
      },
      {
        icon: "🧱",
        ar: "`position: fixed` يثبت العنصر بالنسبة لنافذة المتصفح مثل زر دردشة في الزاوية، بينما `sticky` يلتصق فقط داخل حدود أبيه. واختصار `inset: 0` يساوي `top`, `right`, `bottom`, `left` كلها صفر.",
        en: "`position: fixed` pins an element to the browser window, like a chat button in the corner, while `sticky` only sticks within its parent's bounds. The `inset: 0` shorthand sets `top`, `right`, `bottom` and `left` to zero.",
      },
      {
        icon: "🥞",
        ar: "`z-index` يعمل داخل **سياق تراص** (stacking context)؛ عناصر مثل `opacity` أقل من 1 أو `transform` تنشئ سياقًا جديدًا. لذلك قد لا يرتفع عنصر فوق غيره مهما كبّرت رقمه.",
        en: "`z-index` works inside a **stacking context**; things like `opacity` below 1 or a `transform` create a new one. That's why an element may never rise above another, however big its number.",
      },
    ],
    mistakes: [
      {
        ar: "نسيان `position: relative` على الأب فتطير الشارة إلى زاوية الصفحة → أضف `relative` للبطاقة التي يجب أن تبقى الشارة داخلها.",
        en: "Forgetting `position: relative` on the parent so the badge flies to the page corner → add `relative` to the card it should stay in.",
      },
      {
        ar: "`sticky` لا يلتصق → أضف `top: 0`، وتأكد أن أحد الآباء لا يملك `overflow: hidden`.",
        en: "`sticky` won't stick → add `top: 0`, and make sure no ancestor has `overflow: hidden`.",
      },
      {
        ar: "بناء تخطيط الصفحة كله بـ `absolute` فيتكسر على الشاشات الأخرى → استخدم Flexbox و Grid للتخطيط، و `absolute` للتفاصيل الصغيرة فقط.",
        en: "Building the whole layout with `absolute` so it breaks on other screens → use Flexbox and Grid for layout, `absolute` only for small details.",
      },
    ],
  },
  "css/responsive": {
    more: [
      {
        icon: "🏷️",
        ar: "بدون `<meta name=\"viewport\" content=\"width=device-width, initial-scale=1\">` يعرض الهاتف الصفحة كأنها شاشة كمبيوتر مصغرة، فلا تعمل الـ media queries كما تتوقع. هذا السطر أساس أي موقع متجاوب.",
        en: "Without `<meta name=\"viewport\" content=\"width=device-width, initial-scale=1\">` a phone renders the page like a shrunken desktop, and media queries don't behave as expected. This line is the foundation of every responsive site.",
      },
      {
        icon: "📱",
        ar: "طريقة **Mobile first**: اكتب تنسيق الهاتف أولًا كأساس، ثم أضف `@media (min-width: 768px)` للشاشات الأكبر. الكود يكون أبسط لأن الشاشة الصغيرة غالبًا عمود واحد.",
        en: "**Mobile first**: write the phone styles as the base, then add `@media (min-width: 768px)` for bigger screens. The code stays simpler because small screens are usually a single column.",
      },
      {
        icon: "🖼️",
        ar: "الصور تحتاج `max-width: 100%; height: auto;` حتى لا تخرج من الشاشة. وفي `clamp()` اخلط وحدة ثابتة مع `vw` مثل `calc(1rem + 2vw)` حتى يبقى النص قابلًا للتكبير.",
        en: "Images need `max-width: 100%; height: auto;` so they never overflow the screen. Inside `clamp()`, mix a fixed unit with `vw`, like `calc(1rem + 2vw)`, so text still responds to zoom.",
      },
    ],
    mistakes: [
      {
        ar: "إعطاء العناصر عرضًا ثابتًا مثل `width: 800px` فيظهر شريط تمرير أفقي على الهاتف → استخدم `max-width: 800px; width: 100%`.",
        en: "Fixed widths like `width: 800px` cause sideways scrolling on phones → use `max-width: 800px; width: 100%`.",
      },
      {
        ar: "وضع الـ media query في أعلى الملف فتلغيها القواعد التي بعدها → ضعها بعد القواعد العادية لأن الأخير يفوز عند التساوي.",
        en: "Placing a media query at the top so later rules override it → put it after the normal rules, since the later rule wins on a tie.",
      },
      {
        ar: "كتابة media query لكل جهاز (آيفون، آيباد…) → اختر نقاط تحول حسب المحتوى: عندما يبدأ التصميم بالتكسر.",
        en: "Writing a media query per device (iPhone, iPad…) → choose breakpoints by content: where the design starts to break.",
      },
    ],
  },
  "css/transitions": {
    more: [
      {
        icon: "⚙️",
        ar: "المتصفح يرسم الصفحة على مراحل: تخطيط (layout) ثم رسم (paint) ثم تركيب (composite). `transform` و `opacity` يغيّران مرحلة التركيب فقط، أما تحريك `width` أو `top` فيعيد حساب التخطيط في كل إطار فيتقطع.",
        en: "The browser renders in stages: layout, then paint, then composite. `transform` and `opacity` only touch compositing, while animating `width` or `top` recalculates layout every frame and stutters.",
      },
      {
        icon: "📈",
        ar: "منحنى التوقيت يغيّر الإحساس: `ease-out` مناسب لما يدخل الشاشة، و `ease-in` لما يخرج. وللتحكم الكامل استخدم `cubic-bezier()`، وأبقِ مدة حركات الواجهة بين 150 و 300ms.",
        en: "The timing curve changes the feel: `ease-out` suits things entering, `ease-in` things leaving. For full control use `cubic-bezier()`, and keep UI motion around 150 to 300ms.",
      },
      {
        icon: "🧭",
        ar: "ضع `transition` على الحالة العادية وليس على `:hover`، فتكون الحركة ناعمة عند الدخول والخروج معًا. ويمكن تحريك عدة خصائص: `transition: transform 0.2s, background-color 0.3s;`.",
        en: "Put `transition` on the normal state, not on `:hover`, so the motion is smooth both in and out. You can animate several properties: `transition: transform 0.2s, background-color 0.3s;`.",
      },
    ],
    mistakes: [
      {
        ar: "كتابة `transition: all` فتتحرك خصائص لم تقصدها ويقل الأداء → سمِّ الخصائص التي تريدها فقط مثل `transition: transform 0.2s`.",
        en: "Writing `transition: all` so unintended properties animate and performance drops → name only what you need, like `transition: transform 0.2s`.",
      },
      {
        ar: "كتابة `transform` مرتين في نفس القاعدة فتلغي الثانية الأولى → اجمعهما في سطر واحد: `transform: translateY(-4px) scale(1.05)`.",
        en: "Writing `transform` twice in one rule so the second cancels the first → combine them in one line: `transform: translateY(-4px) scale(1.05)`.",
      },
      {
        ar: "محاولة تحريك `display: none` إلى `block` بـ transition فتقفز → حرّك `opacity` و `transform` بدلًا منها.",
        en: "Trying to transition `display: none` to `block` and getting a jump → animate `opacity` and `transform` instead.",
      },
    ],
  },
  "css/keyframes": {
    more: [
      {
        icon: "🧩",
        ar: "`animation` اختصار لعدة خصائص: الاسم والمدة والتوقيت والتأخير `animation-delay` وعدد التكرار والاتجاه. مثلًا `alternate` يجعل الحركة تذهب ثم تعود بنعومة بدل القفز للبداية.",
        en: "`animation` is a shorthand for several properties: name, duration, timing, `animation-delay`, iteration count and direction. For example `alternate` plays forward then backward smoothly instead of jumping back to the start.",
      },
      {
        icon: "🏁",
        ar: "بعد انتهاء الحركة يعود العنصر لشكله الأصلي. لإبقائه على آخر إطار استخدم `animation-fill-mode: forwards`، مفيد لحركات الظهور التي تعمل مرة واحدة.",
        en: "When an animation ends, the element snaps back to its original style. To keep the last frame use `animation-fill-mode: forwards`, handy for one-time entrance effects.",
      },
      {
        icon: "⏯️",
        ar: "يمكنك إيقاف الحركة مؤقتًا بـ `animation-play-state: paused`، مثلًا عند `:hover`. وبتأخير مختلف لكل عنصر (`animation-delay: 0.1s` ثم `0.2s`) تصنع مؤشر تحميل من ثلاث نقاط متتابعة.",
        en: "You can pause an animation with `animation-play-state: paused`, for example on `:hover`. With a different delay per item (`animation-delay: 0.1s`, then `0.2s`) you build a three-dot loader that ripples.",
      },
    ],
    mistakes: [
      {
        ar: "تعريف `@keyframes` دون ربطها بعنصر فلا يحدث شيء → أضف `animation: pulse 1s` على العنصر وتأكد أن الاسم مطابق تمامًا.",
        en: "Defining `@keyframes` without applying it so nothing happens → add `animation: pulse 1s` to the element and make sure the name matches exactly.",
      },
      {
        ar: "نسيان المدة في `animation: pulse infinite` فتكون صفرًا ولا تُرى الحركة → المدة إلزامية عمليًا: `animation: pulse 1s infinite`.",
        en: "Leaving out the duration in `animation: pulse infinite` so it's zero and invisible → always give a duration: `animation: pulse 1s infinite`.",
      },
      {
        ar: "حركات لا نهائية كثيرة تشتت القارئ → اجعل `infinite` لمؤشرات التحميل فقط، وأوقفها داخل `prefers-reduced-motion: reduce`.",
        en: "Lots of endless animations distract readers → keep `infinite` for loaders, and stop them inside `prefers-reduced-motion: reduce`.",
      },
    ],
  },
  "css/modern-css": {
    more: [
      {
        icon: "🪆",
        ar: "الرمز `&` في التداخل يعني «الأب نفسه»، لذلك `&:hover` داخل `.btn` = `.btn:hover`، بلا مسافة. ولا تتداخل أكثر من مستويين أو ثلاثة، لأن المحددات تطول وتزيد قوتها.",
        en: "In nesting, `&` means \"the parent itself\", so `&:hover` inside `.btn` = `.btn:hover`, with no space. Don't nest more than two or three levels; selectors get long and heavy.",
      },
      {
        icon: "🔍",
        ar: "`:has()` يتجاوز اختيار الأب: `label:has(+ input:invalid)` يلوّن العنوان قبل حقل خاطئ، و `form:has(:invalid) button` يبهت زر الإرسال. قوته تساوي قوة أقوى محدد بداخله.",
        en: "`:has()` goes beyond parents: `label:has(+ input:invalid)` styles a label before an invalid field, and `form:has(:invalid) button` dims the submit button. Its specificity equals its strongest inner selector.",
      },
      {
        icon: "📏",
        ar: "داخل الحاوية يمكنك استخدام وحدة `cqi` (1% من عرض الحاوية)، مثل `font-size: clamp(1rem, 5cqi, 2rem)`. واستخدم media queries لتخطيط الصفحة و `@container` للمكونات القابلة لإعادة الاستخدام.",
        en: "Inside a container you can use the `cqi` unit (1% of the container's width), like `font-size: clamp(1rem, 5cqi, 2rem)`. Use media queries for page layout and `@container` for reusable components.",
      },
    ],
    mistakes: [
      {
        ar: "كتابة `@container` دون تعريف حاوية فلا يتطبق شيء → أضف `container-type: inline-size` على أب العنصر.",
        en: "Writing `@container` without declaring a container so nothing applies → add `container-type: inline-size` to an ancestor.",
      },
      {
        ar: "جعل العنصر نفسه حاوية ثم الاستعلام عنه لتغيير شكله → الاستعلام يرى الحاوية الأب فقط، فضع `container-type` على الغلاف الخارجي.",
        en: "Making an element its own container and querying it to restyle itself → a query only sees ancestor containers, so put `container-type` on the outer wrapper.",
      },
      {
        ar: "الظن أن `& h2` و `&h2` متساويان → مع المسافة يعني «h2 داخل البطاقة»، وبدونها يعني «البطاقة نفسها إذا كانت h2» أي `h2.card`؛ اكتب `& h2` للأبناء و `&:hover` للحالات.",
        en: "Thinking `& h2` and `&h2` are the same → with a space it means \"an h2 inside the card\", without one it means \"the card itself if it is an h2\" (`h2.card`); write `& h2` for children and `&:hover` for states.",
      },
    ],
  },
};
