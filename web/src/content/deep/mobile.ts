import type { Deep } from "../types";

/** "Go deeper" notes for the Mobile and Mastery stages, keyed by "stage/slug". */
export const mobileDeep: Record<string, Deep> = {
  "mobile/rn-intro": {
    more: [
      { icon: "🌉", ar: "React Native لا يحوّل تطبيقك إلى صفحة ويب. كود JavaScript يعمل في محرك اسمه **Hermes**، و `<View>` يصبح عنصرًا أصليًا حقيقيًا: `UIView` على iOS و `android.view.View` على Android. لذلك يبدو التطبيق ويتصرف كتطبيق أصلي.", en: "React Native doesn't turn your app into a web page. Your JavaScript runs in an engine called **Hermes**, and `<View>` becomes a real native element: a `UIView` on iOS and an `android.view.View` on Android. That's why the app looks and feels native." },
      { icon: "⚙️", ar: "منذ الإصدار 0.76 أصبحت **New Architecture** هي الافتراضية: JavaScript يتكلم مع الكود الأصلي مباشرة عبر **JSI** بدل \"الجسر\" القديم الذي كان يرسل رسائل JSON. النتيجة: تطبيقات أسرع واستجابة أنعم.", en: "Since version 0.76, the **New Architecture** is the default: JavaScript talks to native code directly through **JSI** instead of the old \"bridge\" that passed JSON messages. The result: faster apps and smoother responses." },
      { icon: "🧪", ar: "**Expo Go** ممتاز للبداية، لكنه يحتوي فقط على المكتبات المضمّنة فيه. عندما تحتاج مكتبة أصلية خاصة، تصنع **development build** بأمر `npx expo run:android` أو عبر EAS، وهو مثل Expo Go لكن خاص بتطبيقك.", en: "**Expo Go** is great for starting, but it only includes the libraries bundled inside it. When you need a custom native library, you make a **development build** with `npx expo run:android` or EAS, which is like Expo Go but made for your app." },
    ],
    mistakes: [
      { ar: "كتابة نص مباشرة داخل `<View>` مثل `<View>Hello</View>` يسبب خطأ. الحل: كل نص داخل `<Text>`: `<View><Text>Hello</Text></View>`.", en: "Writing text straight inside a `<View>`, like `<View>Hello</View>`, throws an error. Fix: every string goes in a `<Text>`: `<View><Text>Hello</Text></View>`." },
      { ar: "استخدام وسوم الويب مثل `<div>` و `<button>` و `<img>` في React Native. الحل: استبدلها بـ `<View>` و `<Pressable>` و `<Image>` المستوردة من `react-native`.", en: "Using web tags like `<div>`, `<button>` and `<img>` in React Native. Fix: swap them for `<View>`, `<Pressable>` and `<Image>` imported from `react-native`." },
      { ar: "الهاتف والحاسوب على شبكتين مختلفتين فلا يفتح رمز QR التطبيق. الحل: ضعهما على نفس شبكة Wi-Fi، أو شغّل `npx expo start --tunnel`.", en: "The phone and computer are on different networks, so the QR code won't open the app. Fix: put both on the same Wi-Fi, or run `npx expo start --tunnel`." },
    ],
  },
  "mobile/rn-components": {
    more: [
      { icon: "📏", ar: "الأرقام في الأنماط ليست بكسلات شاشة حقيقية، بل **نقاط مستقلة عن الكثافة** (dp). `width: 120` تبدو بنفس الحجم تقريبًا على هاتف عادي وهاتف بشاشة عالية الدقة. ويمكنك أيضًا استخدام نسب مثل `width: \"50%\"`.", en: "Numbers in styles aren't real screen pixels but **density-independent points** (dp). `width: 120` looks about the same size on a basic phone and a high-resolution one. You can also use percentages like `width: \"50%\"`." },
      { icon: "🖼️", ar: "للصور المحلية استخدم `require`: `source={require(\"./assets/logo.png\")}`، وهنا يعرف React Native أبعاد الصورة بنفسه. أما صور الإنترنت `uri` فلا يعرف حجمها مسبقًا، لذلك يجب أن تعطيها `width` و `height`.", en: "For local images use `require`: `source={require(\"./assets/logo.png\")}`, and React Native knows the size by itself. Network `uri` images have no known size up front, so you must give them `width` and `height`." },
      { icon: "🧩", ar: "`<Text>` يمكن أن يحتوي `<Text>` آخر ليغيّر تنسيق كلمة واحدة: `<Text>Hi <Text style={{ fontWeight: \"bold\" }}>Sara</Text></Text>`. والنص الداخلي يرث الخط واللون من النص الخارجي، لكن `<View>` لا يورّث أي تنسيق نصي لأبنائه.", en: "A `<Text>` can hold another `<Text>` to style one word: `<Text>Hi <Text style={{ fontWeight: \"bold\" }}>Sara</Text></Text>`. Nested text inherits font and color from its parent, but a `<View>` passes no text styles to its children." },
    ],
    mistakes: [
      { ar: "صورة إنترنت بدون أبعاد فلا تظهر أبدًا. الحل: أضف دائمًا `style={{ width: 120, height: 120 }}` لأي صورة `uri`.", en: "A network image with no size never shows up. Fix: always add `style={{ width: 120, height: 120 }}` to any `uri` image." },
      { ar: "كتابة `source=\"https://…\"` كنص عادي. الحل: `source` يأخذ كائنًا: `source={{ uri: \"https://…\" }}`.", en: "Writing `source=\"https://…\"` as a plain string. Fix: `source` takes an object: `source={{ uri: \"https://…\" }}`." },
      { ar: "وضع `color` أو `fontSize` على `<View>` وانتظار أن يتغير النص بداخله. الحل: ضع تنسيق النص على `<Text>` نفسه.", en: "Putting `color` or `fontSize` on a `<View>` and expecting the text inside to change. Fix: put text styles on the `<Text>` itself." },
    ],
  },
  "mobile/rn-styles": {
    more: [
      { icon: "🧮", ar: "Flexbox في React Native له قيم افتراضية مختلفة عن الويب: `flexDirection: \"column\"`، و `alignContent: \"flex-start\"`، و `flexShrink: 0`. والأهم أن `flex: 1` يعني \"املأ المساحة المتبقية\" فقط، وهو أبسط من الويب.", en: "Flexbox in React Native has different defaults from the web: `flexDirection: \"column\"`, `alignContent: \"flex-start\"` and `flexShrink: 0`. Also, `flex: 1` simply means \"fill the remaining space\", which is simpler than on the web." },
      { icon: "🧷", ar: "`style` يقبل **مصفوفة** أنماط، والأخير يفوز: `style={[styles.button, isActive && styles.active]}`. القيم الفارغة مثل `false` تُتجاهل، فهذه أنظف طريقة للتنسيق الشرطي.", en: "`style` accepts an **array** of styles, and the last one wins: `style={[styles.button, isActive && styles.active]}`. Falsy values like `false` are ignored, so this is the cleanest way to do conditional styles." },
      { icon: "🌗", ar: "لا يوجد توريث CSS ولا محددات (selectors) ولا `:hover`. لدعم الوضع الداكن استخدم الخطاف `useColorScheme()` واختر الألوان حسب قيمته `\"dark\"` أو `\"light\"`.", en: "There's no CSS inheritance, no selectors and no `:hover`. For dark mode, use the `useColorScheme()` hook and pick colors based on its value, `\"dark\"` or `\"light\"`." },
    ],
    mistakes: [
      { ar: "كتابة وحدات مثل `padding: \"16px\"`. الحل: أرقام فقط بدون وحدة: `padding: 16`.", en: "Writing units like `padding: \"16px\"`. Fix: plain numbers with no unit: `padding: 16`." },
      { ar: "كتابة الأسماء بشرطة كما في CSS مثل `\"background-color\"`. الحل: camelCase: `backgroundColor`.", en: "Using CSS-style dashed names like `\"background-color\"`. Fix: camelCase: `backgroundColor`." },
      { ar: "الشاشة الرئيسية لا تملأ الهاتف فلا يتوسّط المحتوى عموديًا. الحل: أعط الحاوية الأولى `flex: 1` قبل `justifyContent: \"center\"`.", en: "The root screen doesn't fill the phone, so content won't center vertically. Fix: give the outer container `flex: 1` before `justifyContent: \"center\"`." },
    ],
  },
  "mobile/rn-touch": {
    more: [
      { icon: "🖐️", ar: "`Pressable` يعطيك أكثر من `onPress`: يوجد `onLongPress` للضغط الطويل، و `onPressIn` و `onPressOut` لبداية اللمس ونهايته. وهو البديل الحديث لـ `TouchableOpacity` القديم.", en: "`Pressable` gives you more than `onPress`: there's `onLongPress` for a long press, plus `onPressIn` and `onPressOut` for when a touch starts and ends. It's the modern replacement for the older `TouchableOpacity`." },
      { icon: "🎯", ar: "أصابع البشر أكبر من مؤشر الفأرة. اجعل مساحة اللمس 44 إلى 48 نقطة على الأقل، وإذا كانت الأيقونة صغيرة وسّع المساحة بدون تغيير الشكل باستخدام `hitSlop={10}`.", en: "Fingers are bigger than a mouse pointer. Make touch targets at least 44 to 48 points, and if an icon is small, grow the touch area without changing the look using `hitSlop={10}`." },
      { icon: "♿", ar: "قارئ الشاشة لا يعرف أن `Pressable` زر إلا إذا أخبرته: أضف `accessibilityRole=\"button\"` و `accessibilityLabel=\"Like\"`. هذا مهم جدًا للأزرار التي تحتوي أيقونة فقط.", en: "Screen readers don't know a `Pressable` is a button unless you say so: add `accessibilityRole=\"button\"` and `accessibilityLabel=\"Like\"`. This matters most for icon-only buttons." },
    ],
    mistakes: [
      { ar: "كتابة `onClick` كما في الويب فلا يحدث شيء عند اللمس. الحل: استخدم `onPress={…}`.", en: "Writing `onClick` like on the web, so nothing happens on tap. Fix: use `onPress={…}`." },
      { ar: "كتابة `onPress={setLiked(!liked)}` فتُستدعى الدالة فورًا أثناء الرسم. الحل: مرّر دالة: `onPress={() => setLiked(!liked)}`.", en: "Writing `onPress={setLiked(!liked)}`, which calls it right away during render. Fix: pass a function: `onPress={() => setLiked(!liked)}`." },
      { ar: "استدعاء `setSteps(steps + 1)` مرتين في نفس اللمسة يزيد واحدًا فقط، لأن `steps` قيمة قديمة حتى الرسم التالي. الحل: استخدم صيغة الدالة: `setSteps((s) => s + 1)`.", en: "Calling `setSteps(steps + 1)` twice in one press adds only one, because `steps` stays stale until the next render. Fix: use the updater form: `setSteps((s) => s + 1)`." },
    ],
  },
  "mobile/rn-lists": {
    more: [
      { icon: "♻️", ar: "يسمّى هذا **virtualization**: `FlatList` يرسم العناصر الظاهرة وقليلًا قبلها وبعدها، ويحذف البعيدة من الذاكرة. خاصية `windowSize` تتحكم بعدد الشاشات المرسومة حولك (الافتراضي 21).", en: "This is called **virtualization**: `FlatList` draws the visible items plus a few above and below, and drops far-away ones from memory. The `windowSize` prop controls how many screens' worth are kept around you (default 21)." },
      { icon: "🧰", ar: "`FlatList` فيه أدوات جاهزة: `ListEmptyComponent` لرسالة \"لا توجد عناصر\"، و `ItemSeparatorComponent` للخط بين العناصر، و `onEndReached` لتحميل المزيد، و `refreshing` مع `onRefresh` لسحب الشاشة للتحديث.", en: "`FlatList` has built-in helpers: `ListEmptyComponent` for an \"empty\" message, `ItemSeparatorComponent` for lines between items, `onEndReached` to load more, and `refreshing` with `onRefresh` for pull-to-refresh." },
      { icon: "🗂️", ar: "للقوائم المقسّمة بعناوين (مثل جهات الاتصال حسب الحرف) استخدم `SectionList`. وفي التطبيقات الكبيرة يستخدم كثيرون `FlashList` من Shopify، وهو بنفس الواجهة تقريبًا لكنه يعيد استخدام العناصر فيكون أسرع.", en: "For lists grouped under headings (like contacts by letter), use `SectionList`. Many big apps use Shopify's `FlashList`, which has almost the same API but recycles items, so it's faster." },
    ],
    mistakes: [
      { ar: "نسيان `keyExtractor` أو استخدام رقم الترتيب `index` كمفتاح، فتختلط العناصر عند الحذف أو الترتيب. الحل: `keyExtractor={(item) => item.id}` بمعرّف ثابت وفريد.", en: "Forgetting `keyExtractor`, or using the `index` as the key, so items get mixed up when you delete or reorder. Fix: `keyExtractor={(item) => item.id}` with a stable, unique id." },
      { ar: "كتابة `renderItem={(item) => …}` ثم `item.name` فتظهر `undefined`. الحل: فكّ الكائن: `renderItem={({ item }) => …}`.", en: "Writing `renderItem={(item) => …}` and then `item.name` gives `undefined`. Fix: destructure it: `renderItem={({ item }) => …}`." },
      { ar: "وضع `FlatList` داخل `ScrollView` بنفس الاتجاه فيتعطّل الـ virtualization ويظهر تحذير. الحل: اجعل `FlatList` هو عنصر التمرير، وضع المحتوى العلوي في `ListHeaderComponent`.", en: "Putting a `FlatList` inside a same-direction `ScrollView`, which breaks virtualization and shows a warning. Fix: let the `FlatList` scroll, and put the top content in `ListHeaderComponent`." },
    ],
  },
  "mobile/rn-input": {
    more: [
      { icon: "⌨️", ar: "لوحة المفاتيح قد تغطي الحقل في أسفل الشاشة. لفّ النموذج بـ `KeyboardAvoidingView` مع `behavior=\"padding\"` على iOS، ليصعد المحتوى فوق لوحة المفاتيح.", en: "The keyboard can cover a field at the bottom of the screen. Wrap the form in `KeyboardAvoidingView` with `behavior=\"padding\"` on iOS so the content moves above the keyboard." },
      { icon: "🔁", ar: "للانتقال بين الحقول اجعل زر لوحة المفاتيح يقول \"التالي\": `returnKeyType=\"next\"`، ثم في `onSubmitEditing` انقل التركيز للحقل التالي بـ `ref` واستدعاء `.focus()`.", en: "To move between fields, make the keyboard key say \"next\": `returnKeyType=\"next\"`, then in `onSubmitEditing` focus the next field with a `ref` and `.focus()`." },
      { icon: "🪄", ar: "ساعد النظام على الملء التلقائي: `autoComplete=\"email\"` و `textContentType=\"emailAddress\"` و `autoCapitalize=\"none\"` لحقل البريد. فيقترح الهاتف البريد المحفوظ ولا يكتب الحرف الأول كبيرًا.", en: "Help the system autofill: `autoComplete=\"email\"`, `textContentType=\"emailAddress\"` and `autoCapitalize=\"none\"` on an email field. The phone suggests saved emails and won't capitalize the first letter." },
    ],
    mistakes: [
      { ar: "استخدام `onChange={(e) => setName(e.target.value)}` كما في الويب. الحل: `onChangeText={setName}` يعطيك النص مباشرة.", en: "Using `onChange={(e) => setName(e.target.value)}` like on the web. Fix: `onChangeText={setName}` gives you the text directly." },
      { ar: "حقل بريد يكتب أول حرف كبيرًا فيفشل تسجيل الدخول. الحل: أضف `autoCapitalize=\"none\"` و `autoCorrect={false}`.", en: "An email field capitalizes the first letter, so login fails. Fix: add `autoCapitalize=\"none\"` and `autoCorrect={false}`." },
      { ar: "الحقل غير مرئي لأن `TextInput` بلا حدود افتراضيًا. الحل: أعطه تنسيقًا: `style={{ borderWidth: 1, borderRadius: 8, padding: 12 }}`.", en: "The field is invisible because `TextInput` has no border by default. Fix: style it: `style={{ borderWidth: 1, borderRadius: 8, padding: 12 }}`." },
    ],
  },
  "mobile/rn-publish": {
    more: [
      { icon: "📦", ar: "**AAB** (Android App Bundle) ليس تطبيقًا يُثبَّت مباشرة: Google Play يصنع منه ملفات APK صغيرة مناسبة لكل هاتف. أما APK فيُثبّت مباشرة، لذلك تستخدمه للتجربة على هاتفك أو مع المختبرين.", en: "An **AAB** (Android App Bundle) isn't installed directly: Google Play turns it into small APKs tailored to each phone. An APK installs directly, so you use it for testing on your phone or with testers." },
      { icon: "🔢", ar: "كل رفع للمتجر يحتاج رقم بناء أكبر: `versionCode` على Android و `buildNumber` على iOS، بجانب `version` الظاهر للمستخدم. اجعل EAS يزيده تلقائيًا بإعداد `autoIncrement` في `eas.json`.", en: "Every store upload needs a higher build number: `versionCode` on Android and `buildNumber` on iOS, alongside the user-facing `version`. Let EAS bump it for you with `autoIncrement` in `eas.json`." },
      { icon: "⚠️", ar: "EAS Update يغيّر كود JavaScript والصور فقط. إذا أضفت مكتبة أصلية جديدة أو غيّرت الأذونات فأنت تحتاج بناءً جديدًا ومراجعة جديدة. وجرّب على مختبرين أولًا عبر **TestFlight** أو **Internal testing** قبل النشر للجميع.", en: "EAS Update only changes JavaScript and assets. If you add a new native library or change permissions, you need a new build and a new review. Test with a small group first via **TestFlight** or **Internal testing** before releasing to everyone." },
    ],
    mistakes: [
      { ar: "رفع ملف APK إلى Google Play. الحل: المتجر يطلب AAB، وهذا ما ينتجه `eas build -p android` افتراضيًا مع ملف تعريف production.", en: "Uploading an APK to Google Play. Fix: the store wants an AAB, which `eas build -p android` produces by default with the production profile." },
      { ar: "الرفع يُرفض لأن رقم البناء لم يتغيّر. الحل: زِد `versionCode` أو `buildNumber` مع كل إصدار، أو فعّل `autoIncrement` في EAS.", en: "The upload is rejected because the build number didn't change. Fix: bump `versionCode` or `buildNumber` every release, or enable `autoIncrement` in EAS." },
      { ar: "طلب أذونات كثيرة مثل الموقع والكاميرا دون حاجة فيُرفض التطبيق أو يخاف المستخدم. الحل: اطلب الإذن فقط عند استخدام الميزة، واشرح السبب في رسالة واضحة.", en: "Asking for many permissions like location and camera without need, so the app gets rejected or users get scared. Fix: ask only when the feature is used, and explain why in a clear message." },
    ],
  },

  "pro/clean-code": {
    more: [
      { icon: "📖", ar: "المبرمجون يقرؤون الكود أكثر بكثير مما يكتبونه، تقريبًا عشر مرات. لذلك كل دقيقة تقضيها في اسم أوضح توفّر ساعات على فريقك، وعليك أنت بعد ستة أشهر.", en: "Developers read code far more than they write it, roughly ten times more. So every minute spent on a clearer name saves hours for your team, and for you six months later." },
      { icon: "💬", ar: "التعليق الجيد يشرح **لماذا** وليس **ماذا**. `// add 1 to i` لا يفيد، أما `// the API counts pages from 1, not 0` فيشرح قرارًا لا يظهر في الكود. وإذا احتجت تعليقًا لشرح ماذا يفعل الكود، فحسّن الأسماء أولًا.", en: "A good comment explains **why**, not **what**. `// add 1 to i` is useless, but `// the API counts pages from 1, not 0` explains a decision the code can't show. If you need a comment to explain what code does, improve the names first." },
      { icon: "🔢", ar: "تجنّب **الأرقام السحرية**: `if (password.length < 8)` أوضح عندما تكتب `const MIN_PASSWORD_LENGTH = 8` مرة واحدة. وإذا تغيّر الرقم تعدّله في مكان واحد فقط.", en: "Avoid **magic numbers**: `if (password.length < 8)` is clearer with `const MIN_PASSWORD_LENGTH = 8` defined once. And if the number changes, you edit it in one place only." },
    ],
    mistakes: [
      { ar: "أسماء مختصرة مثل `arr` و `tmp` و `data2`. الحل: صف المحتوى: `students` و `previousScore` و `filteredOrders`.", en: "Short names like `arr`, `tmp` and `data2`. Fix: describe the content: `students`, `previousScore`, `filteredOrders`." },
      { ar: "ترك كود قديم معطّل بالتعليقات \"للاحتياط\". الحل: احذفه، فـ Git يحفظ كل النسخ القديمة إذا احتجتها.", en: "Leaving old code commented out \"just in case\". Fix: delete it; Git keeps every old version if you ever need it." },
      { ar: "الإفراط في DRY: دمج دالتين متشابهتين صدفة في دالة واحدة مليئة بالخيارات `if (type === …)`. الحل: انتظر حتى ترى التكرار الحقيقي ثلاث مرات قبل التجريد.", en: "Overdoing DRY: merging two functions that only look alike into one full of `if (type === …)` options. Fix: wait until you see real repetition three times before abstracting." },
    ],
  },
  "pro/testing": {
    more: [
      { icon: "🔺", ar: "**هرم الاختبارات**: الكثير من **unit tests** السريعة لدوال صغيرة، وعدد أقل من **integration tests** لأجزاء تعمل معًا، وقليل من **end-to-end** بأداة مثل Playwright تفتح متصفحًا حقيقيًا وتنقر كالمستخدم.", en: "The **testing pyramid**: many fast **unit tests** for small functions, fewer **integration tests** for parts working together, and a few **end-to-end** tests with a tool like Playwright that opens a real browser and clicks like a user." },
      { icon: "🧱", ar: "رتّب كل اختبار بنمط **AAA**: Arrange (جهّز البيانات)، Act (نفّذ الدالة)، Assert (تحقق من النتيجة). واجعل اسم الاختبار جملة تصف السلوك، مثل `\"rejects an empty email\"`.", en: "Structure each test as **AAA**: Arrange (set up data), Act (call the function), Assert (check the result). Name the test as a sentence describing behavior, like `\"rejects an empty email\"`." },
      { icon: "🐞", ar: "عادة المحترفين: عندما تجد خطأ، اكتب أولًا اختبارًا يفشل بسببه، ثم أصلحه حتى ينجح. هكذا لا يعود الخطأ نفسه أبدًا دون أن تعرف. ولمقارنة الكائنات والمصفوفات استخدم `toEqual` بدل `toBe`.", en: "A pro habit: when you find a bug, first write a test that fails because of it, then fix it until it passes. That way the same bug never sneaks back. To compare objects and arrays, use `toEqual` instead of `toBe`." },
    ],
    mistakes: [
      { ar: "مقارنة كائنين بـ `toBe` مثل `expect(getUser()).toBe({ id: 1 })` فيفشل دائمًا. الحل: `toEqual` يقارن المحتوى، و `toBe` يقارن المرجع نفسه.", en: "Comparing objects with `toBe`, like `expect(getUser()).toBe({ id: 1 })`, which always fails. Fix: `toEqual` compares contents; `toBe` checks it's the very same reference." },
      { ar: "اختبار الحالة السعيدة فقط. الحل: أضف حالات حدّية مثل `\"\"` و `null` والأرقام السالبة والقوائم الفارغة.", en: "Only testing the happy path. Fix: add edge cases like `\"\"`, `null`, negative numbers and empty lists." },
      { ar: "اختبارات تعتمد على بعضها أو على ترتيب التشغيل فتفشل عشوائيًا. الحل: كل اختبار يجهّز بياناته بنفسه ولا يعتمد على نتيجة اختبار آخر.", en: "Tests that depend on each other or on run order, so they fail randomly. Fix: each test sets up its own data and never relies on another test's result." },
    ],
  },
  "pro/performance": {
    more: [
      { icon: "📊", ar: "**Core Web Vitals** ثلاثة مقاييس: **LCP** (متى يظهر أكبر محتوى، الهدف أقل من 2.5 ثانية)، و **INP** (سرعة الاستجابة للنقر، أقل من 200ms)، و **CLS** (هل تقفز العناصر أثناء التحميل، أقل من 0.1).", en: "**Core Web Vitals** are three metrics: **LCP** (when the largest content appears, aim under 2.5s), **INP** (how fast the page reacts to clicks, under 200ms), and **CLS** (whether things jump while loading, under 0.1)." },
      { icon: "🐢", ar: "Debounce له أخ اسمه **Throttle**: بدل انتظار التوقف، ينفّذ مرة كل فترة ثابتة مهما تكررت الأحداث. استخدمه مع `scroll` و `resize`، واستخدم Debounce مع البحث وحفظ المسودّات.", en: "Debounce has a sibling called **Throttle**: instead of waiting for a pause, it runs at most once per fixed interval no matter how often events fire. Use it for `scroll` and `resize`; use debounce for search and saving drafts." },
      { icon: "📐", ar: "أعط الصور `width` و `height` في HTML حتى يحجز المتصفح مكانها قبل التحميل، فلا تقفز الصفحة ويتحسّن CLS. وقِس قبل أن تحسّن: افحص أولًا بـ Lighthouse أو تبويب Performance، ثم أصلح الأبطأ.", en: "Give images `width` and `height` in HTML so the browser reserves their space before loading, so the page doesn't jump and CLS improves. And measure before optimizing: profile with Lighthouse or the Performance tab first, then fix the slowest part." },
    ],
    mistakes: [
      { ar: "وضع `let timer` داخل الدالة المُرجعة فينسى كل استدعاء المؤقت السابق. الحل: عرّفه خارجها حتى تتذكره كل الاستدعاءات (closure).", en: "Putting `let timer` inside the returned function, so each call forgets the old timer. Fix: declare it outside so every call shares it (a closure)." },
      { ar: "إنشاء دالة debounce جديدة مع كل رسم في React مثل `onChange={debounce(search, 300)}` فلا يعمل التأخير. الحل: أنشئها مرة واحدة بـ `useMemo` أو خارج المكوّن.", en: "Creating a new debounced function on every React render, like `onChange={debounce(search, 300)}`, so the delay never works. Fix: create it once with `useMemo` or outside the component." },
      { ar: "إضافة `loading=\"lazy\"` لصورة الغلاف الكبيرة في أعلى الصفحة فيتأخر LCP. الحل: استخدم lazy فقط للصور البعيدة في الأسفل.", en: "Adding `loading=\"lazy\"` to the big hero image at the top, which delays LCP. Fix: only lazy-load images further down the page." },
    ],
  },
  "pro/web-security": {
    more: [
      { icon: "🧱", ar: "**Content Security Policy** (CSP) خط دفاع ثانٍ: ترويسة من الخادم تخبر المتصفح بالمصادر المسموح تشغيل السكربتات منها فقط. حتى لو تسرّب كود خبيث، يرفض المتصفح تنفيذه.", en: "**Content Security Policy** (CSP) is a second line of defense: a server header telling the browser which sources are allowed to run scripts. Even if malicious code slips in, the browser refuses to run it." },
      { icon: "🍪", ar: "لا تحفظ رموز تسجيل الدخول في `localStorage` لأن أي XSS يستطيع قراءتها. الأفضل كوكي بخصائص `HttpOnly` (لا يقرؤه JavaScript) و `Secure` (عبر HTTPS فقط) و `SameSite` (يحمي من CSRF).", en: "Don't keep login tokens in `localStorage`, because any XSS can read them. Prefer a cookie with `HttpOnly` (JavaScript can't read it), `Secure` (HTTPS only) and `SameSite` (protects against CSRF)." },
      { icon: "💉", ar: "مبدأ \"لا تثق بالمدخلات\" يحمي الخادم أيضًا من **SQL Injection**: لا تلصق نص المستخدم داخل جملة SQL أبدًا. استخدم الاستعلامات ذات المعاملات مثل `db.query(\"SELECT * FROM users WHERE id = $1\", [id])`.", en: "\"Never trust input\" also protects the server from **SQL injection**: never paste user text into an SQL string. Use parameterized queries like `db.query(\"SELECT * FROM users WHERE id = $1\", [id])`." },
    ],
    mistakes: [
      { ar: "وضع مفتاح API سري في متغير `NEXT_PUBLIC_` أو `EXPO_PUBLIC_` ظنًّا أنه مخفي. الحل: هذه المتغيرات تُضمَّن في كود الواجهة ويراها الجميع، فأبقِ الأسرار في الخادم فقط.", en: "Putting a secret API key in a `NEXT_PUBLIC_` or `EXPO_PUBLIC_` variable thinking it's hidden. Fix: those are baked into frontend code for anyone to see, so keep secrets on the server only." },
      { ar: "رفع `.env` إلى GitHub ثم حذفه في commit لاحق. الحل: المفتاح ما زال في تاريخ Git، فغيّره (rotate) فورًا وأضف `.env` إلى `.gitignore`.", en: "Pushing `.env` to GitHub, then deleting it in a later commit. Fix: the key is still in Git history, so rotate it immediately and add `.env` to `.gitignore`." },
      { ar: "الاكتفاء بالتحقق في الواجهة مثل `required` في HTML. الحل: أي شخص يستطيع إرسال طلب مباشرة متجاوزًا الواجهة، فتحقّق دائمًا في الخادم أيضًا.", en: "Relying only on frontend checks like HTML `required`. Fix: anyone can send a request that skips your UI, so always validate on the server too." },
    ],
  },
  "pro/typescript": {
    more: [
      { icon: "🧹", ar: "الأنواع موجودة فقط أثناء الكتابة. عند البناء يحذفها المترجم وينتج JavaScript عاديًا، فلا تحمي برنامجك أثناء التشغيل. لذلك البيانات القادمة من API تحتاج تحققًا حقيقيًا، مثلًا بمكتبة **Zod**.", en: "Types only exist while you write code. At build time the compiler strips them and outputs plain JavaScript, so they don't protect you at runtime. That's why API data still needs real validation, for example with **Zod**." },
      { icon: "🧠", ar: "لا تحتاج أن تكتب كل نوع: TypeScript **يستنتج** الأنواع. `const age = 20` يعرف أنه `number` وحده. اكتب الأنواع بنفسك في معاملات الدوال وشكل البيانات، واترك الباقي للاستنتاج.", en: "You don't need to write every type: TypeScript **infers** them. `const age = 20` is known to be a `number` on its own. Write types yourself on function parameters and data shapes, and let inference handle the rest." },
      { icon: "🔀", ar: "**Union types** قوية جدًا: `type Status = \"loading\" | \"success\" | \"error\"` تسمح بثلاث قيم فقط، والمحرر يكمل لك الكتابة ويرفض أي خطأ إملائي مثل `\"sucess\"`.", en: "**Union types** are very powerful: `type Status = \"loading\" | \"success\" | \"error\"` allows only three values, and the editor autocompletes them and rejects typos like `\"sucess\"`." },
    ],
    mistakes: [
      { ar: "استخدام `any` في كل مكان لإسكات الأخطاء، فتضيع فائدة TypeScript. الحل: صف النوع الصحيح، أو استخدم `unknown` ثم تحقق قبل الاستخدام.", en: "Using `any` everywhere to silence errors, which throws away TypeScript's benefit. Fix: describe the real type, or use `unknown` and check it before use." },
      { ar: "استخدام `user.email.length` مع أن `email?` اختياري فيظهر خطأ. الحل: استخدم `user.email?.length` أو تحقق أولًا: `if (user.email)`.", en: "Writing `user.email.length` when `email?` is optional, so you get an error. Fix: use `user.email?.length` or check first: `if (user.email)`." },
      { ar: "الإكثار من `as User` لإجبار النوع على بيانات غير مضمونة. الحل: `as` لا يغيّر البيانات ولا يتحقق منها، فتحقق منها فعلًا بدل خداع المترجم.", en: "Overusing `as User` to force a type onto data you're not sure about. Fix: `as` neither changes nor checks the data, so actually validate it instead of fooling the compiler." },
    ],
  },
  "pro/deploy-ci": {
    more: [
      { icon: "⚙️", ar: "مع **GitHub Actions** تكتب CI في ملف YAML داخل `.github/workflows/`: عند كل push يجهّز الخادم Node، ويشغّل `npm ci` ثم `npm run lint` ثم `npm test`. ويمكنك جعل الدمج ممنوعًا حتى ينجح كل شيء.", en: "With **GitHub Actions** you write CI in a YAML file under `.github/workflows/`: on every push the server sets up Node and runs `npm ci`, then `npm run lint`, then `npm test`. You can also block merging until everything passes." },
      { icon: "⏪", ar: "كل نشر على Vercel أو Netlify نسخة كاملة محفوظة لا تتغير. إذا ظهر خطأ في الموقع، تستطيع **Rollback** للنسخة السابقة بنقرة واحدة خلال ثوانٍ، دون انتظار إصلاح الكود.", en: "Every deploy on Vercel or Netlify is a complete, saved, unchanging version. If the live site breaks, you can **roll back** to the previous one with a single click in seconds, without waiting for a code fix." },
      { icon: "📦", ar: "في CI استخدم `npm ci` وليس `npm install`: يثبّت الإصدارات الموجودة في `package-lock.json` حرفيًا ويفشل إذا اختلف الملفان. هكذا يبني الخادم نفس ما جرّبته على جهازك.", en: "In CI use `npm ci`, not `npm install`: it installs exactly the versions in `package-lock.json` and fails if the files disagree. That way the server builds exactly what you tested on your machine." },
    ],
    mistakes: [
      { ar: "تغيير متغير بيئة في إعدادات Vercel وانتظار أن يتغير الموقع فورًا. الحل: المتغيرات تُقرأ وقت البناء، فأعد النشر (redeploy) بعد تعديلها.", en: "Changing an environment variable in Vercel's settings and expecting the live site to update. Fix: variables are read at build time, so redeploy after changing them." },
      { ar: "عدم رفع `package-lock.json` إلى Git فيثبّت الخادم إصدارات مختلفة ويفشل البناء. الحل: ارفع ملف القفل دائمًا مع `package.json`.", en: "Not committing `package-lock.json`, so the server installs different versions and the build fails. Fix: always commit the lock file with `package.json`." },
      { ar: "أخطاء حالة الأحرف: `import Logo from \"./logo.png\"` يعمل على Windows و Mac لكن الملف اسمه `Logo.png`، فيفشل البناء على خادم Linux. الحل: طابق اسم الملف حرفيًا في كل import.", en: "Letter-case bugs: `import Logo from \"./logo.png\"` works on Windows and Mac but the file is `Logo.png`, so the build fails on a Linux server. Fix: match file names exactly in every import." },
    ],
  },
  "pro/capstone": {
    more: [
      { icon: "🗃️", ar: "عندما يكبر التطبيق اجعل **المصفوفة هي مصدر الحقيقة**: `let todos = [{ id, text, done }]`، ثم دالة `render()` ترسم القائمة كلها منها. هذه بالضبط فكرة React: البيانات أولًا، والواجهة نتيجة لها.", en: "As the app grows, make **an array the source of truth**: `let todos = [{ id, text, done }]`, then a `render()` function draws the whole list from it. That's exactly React's idea: data first, the UI is its result." },
      { icon: "💾", ar: "للحفظ: `localStorage` يخزن نصوصًا فقط، فاحفظ بـ `localStorage.setItem(\"todos\", JSON.stringify(todos))` واقرأ بـ `JSON.parse(localStorage.getItem(\"todos\") ?? \"[]\")`. الـ `?? \"[]\"` يحمي أول زيارة عندما لا يوجد شيء محفوظ.", en: "For saving: `localStorage` only stores strings, so save with `localStorage.setItem(\"todos\", JSON.stringify(todos))` and load with `JSON.parse(localStorage.getItem(\"todos\") ?? \"[]\")`. The `?? \"[]\"` covers the first visit when nothing is saved yet." },
      { icon: "🎯", ar: "**Event delegation**: بدل إضافة مستمع لكل `<li>`، أضف مستمعًا واحدًا على `<ul>` واعرف العنصر بـ `event.target.closest(\"li\")`. يعمل تلقائيًا مع المهام الجديدة ويوفّر الذاكرة.", en: "**Event delegation**: instead of a listener on every `<li>`, add one listener on the `<ul>` and find the item with `event.target.closest(\"li\")`. It works automatically for new tasks and saves memory." },
    ],
    mistakes: [
      { ar: "الاستماع لـ `click` على الزر بدل `submit` على النموذج، فلا يعمل زر Enter. الحل: `form.addEventListener(\"submit\", …)` يلتقط النقر و Enter معًا.", en: "Listening for `click` on the button instead of `submit` on the form, so Enter doesn't work. Fix: `form.addEventListener(\"submit\", …)` catches both clicks and Enter." },
      { ar: "نسيان `event.preventDefault()` فتُعاد الصفحة وتختفي المهمة فورًا. الحل: اجعله أول سطر في مستمع `submit`.", en: "Forgetting `event.preventDefault()`, so the page reloads and the task vanishes instantly. Fix: make it the first line of the `submit` listener." },
      { ar: "حساب العدّاد بمتغير منفصل `count++` ينسى التحديث عند الحذف. الحل: احسبه من المصدر دائمًا: `list.children.length`.", en: "Tracking the badge with a separate `count++` variable that you forget to update on delete. Fix: always derive it from the source: `list.children.length`." },
    ],
  },
  "pro/career": {
    more: [
      { icon: "🧾", ar: "السيرة الذاتية للمطوّر المبتدئ صفحة واحدة: روابط GitHub والـ Portfolio في الأعلى، ثم المشاريع قبل الخبرة. صف كل مشروع بنتيجة واضحة، مثل \"تطبيق مهام بـ React منشور على Vercel مع اختبارات Vitest\".", en: "A junior developer's CV is one page: GitHub and portfolio links at the top, then projects before experience. Describe each project with a clear result, like \"a React to-do app deployed on Vercel with Vitest tests\"." },
      { icon: "🧠", ar: "مقابلات كثيرة فيها **تحدي كود** أو مشروع منزلي. تدرّب على مسائل صغيرة في مواقع مثل LeetCode أو Exercism، لكن الأهم أن تشرح تفكيرك وتكتب كودًا نظيفًا ومختبرًا كما تعلّمت في هذه المرحلة.", en: "Many interviews include a **coding challenge** or a take-home project. Practice small problems on sites like LeetCode or Exercism, but what matters most is explaining your thinking and writing clean, tested code like you learned in this stage." },
      { icon: "🤝", ar: "كثير من الوظائف الأولى تأتي من **العلاقات** وليس من التقديم البارد. شارك ما تبنيه على LinkedIn، واحضر لقاءات المطوّرين المحلية أو مجتمعات Discord، وساعد غيرك في الأسئلة. الناس يوظّفون من يعرفون عمله.", en: "Many first jobs come from **connections**, not cold applications. Share what you build on LinkedIn, join local meetups or developer Discord communities, and help others with their questions. People hire those whose work they know." },
    ],
    mistakes: [
      { ar: "Portfolio مليء بنسخ مطابقة لدروس تعليمية. الحل: أضف لكل مشروع ميزة من فكرتك أو حلًا لمشكلة حقيقية تعرفها، واذكر ذلك في الـ README.", en: "A portfolio full of exact copies of tutorials. Fix: give each project a feature of your own or solve a real problem you know, and say so in the README." },
      { ar: "انتظار \"الجاهزية الكاملة\" قبل التقديم. الحل: إذا كنت تحقق نصف المتطلبات تقريبًا فقدّم، فإعلانات الوظائف قائمة أمنيات وليست شروطًا صارمة.", en: "Waiting to feel \"fully ready\" before applying. Fix: if you meet about half the requirements, apply; job posts are wish lists, not strict rules." },
      { ar: "روابط معطّلة أو مستودعات بلا README. الحل: افتح كل رابط في سيرتك قبل الإرسال، وتأكد أن كل مستودع فيه وصف وصورة ورابط حي يعمل.", en: "Broken links or repos without a README. Fix: open every link on your CV before sending, and make sure each repo has a description, a screenshot and a working live link." },
    ],
  },
};
