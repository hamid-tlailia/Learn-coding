import type { Exam, Lesson } from "./types";

const text = (el: Element | null) => (el?.textContent ?? "").trim();
const reading = (l: Omit<Lesson, "files" | "starter" | "solution" | "tasks" | "hints">): Lesson => ({ ...l, files: [], starter: {}, solution: {}, tasks: [], hints: [] });

/**
 * Mobile lessons: React Native code rendered by a look-alike of its core components
 * inside a phone frame. Rendered elements carry data-rn="View" / "Text" / … for checks.
 */
export const mobileLessons: Lesson[] = [
  reading({
    slug: "rn-intro",
    title: { ar: "React Native و Expo: تطبيق واحد لكل الهواتف", en: "React Native and Expo: one app for every phone" },
    body: [
      { icon: "📱", ar: "**React Native** يبني تطبيقات هاتف حقيقية بـ React و JavaScript. كود واحد يعمل على **Android و iOS**. تطبيقات مثل Instagram و Discord تستخدمه.", en: "**React Native** builds real phone apps with React and JavaScript. One codebase runs on **Android and iOS**. Apps like Instagram and Discord use it." },
      { icon: "🧱", ar: "الفرق عن الويب: لا يوجد `<div>` ولا `<p>`. بدلها مكوّنات أصلية: `<View>` للحاويات، `<Text>` لكل نص، `<Image>` للصور، و `<Pressable>` للمس.", en: "The difference from the web: no `<div>` or `<p>`. Native components instead: `<View>` for containers, `<Text>` for all text, `<Image>` for images, and `<Pressable>` for touch." },
      { icon: "⚡", ar: "**Expo** يجعل البداية سهلة: `npx create-expo-app@latest my-app` ثم `npx expo start`، وامسح رمز QR بتطبيق **Expo Go** على هاتفك فيعمل تطبيقك فورًا.", en: "**Expo** makes starting easy: `npx create-expo-app@latest my-app`, then `npx expo start`, and scan the QR code with the **Expo Go** app on your phone to run it instantly." },
      { icon: "🧠", ar: "كل ما تعلمته في React (المكوّنات، props، useState، useEffect) يعمل كما هو. أنت جاهز تقريبًا!", en: "Everything you learned in React (components, props, useState, useEffect) works exactly the same. You're almost ready!" },
    ],
    quiz: [
      { id: "q1", prompt: { ar: "بماذا تستبدل `<div>` في React Native؟", en: "What replaces `<div>` in React Native?" }, options: [{ ar: "`<View>`", en: "`<View>`" }, { ar: "`<Box>`", en: "`<Box>`" }, { ar: "`<Section>`", en: "`<Section>`" }], answer: 0 },
      { id: "q2", prompt: { ar: "أين يجب أن يوضع أي نص؟", en: "Where must any text go?" }, options: [{ ar: "داخل `<Text>`", en: "Inside `<Text>`" }, { ar: "مباشرة داخل `<View>`", en: "Directly inside `<View>`" }, { ar: "داخل `<p>`", en: "Inside `<p>`" }], answer: 0 },
      { id: "q3", prompt: { ar: "كيف تجرّب تطبيق Expo على هاتفك بسرعة؟", en: "How do you quickly try an Expo app on your phone?" }, options: [{ ar: "تطبيق Expo Go ومسح رمز QR", en: "The Expo Go app and scanning a QR code" }, { ar: "نشره على المتجر أولًا", en: "Publish to the store first" }, { ar: "لا يمكن", en: "You can't" }], answer: 0 },
    ],
    xp: 20,
  }),
  {
    slug: "rn-components",
    runtime: "native",
    title: { ar: "المكوّنات الأساسية: View و Text و Image", en: "Core components: View, Text and Image" },
    body: [
      { icon: "📦", ar: "تستورد المكوّنات من `react-native`: `import { View, Text, Image } from \"react-native\";`.", en: "Import components from `react-native`: `import { View, Text, Image } from \"react-native\";`." },
      { icon: "🖼️", ar: "الصورة تأخذ `source={{ uri: \"https://…\" }}` ولا بد من أبعاد: `style={{ width: 120, height: 120 }}`. الأرقام بدون `px`.", en: "An image takes `source={{ uri: \"https://…\" }}` and needs a size: `style={{ width: 120, height: 120 }}`. Numbers, no `px`." },
      { icon: "📐", ar: "`View` يرتّب أبناءه **عموديًا** افتراضيًا (عكس الويب). والنتيجة تظهر داخل إطار الهاتف في المعاينة.", en: "`View` stacks its children **vertically** by default (the opposite of the web). The result shows inside the phone frame in the preview." },
    ],
    example: {
      code: 'import { View, Text, Image } from "react-native";\n\nexport default function App() {\n  return (\n    <View style={{ padding: 24, alignItems: "center", gap: 12 }}>\n      <Image source={{ uri: "https://picsum.photos/200" }} style={{ width: 120, height: 120, borderRadius: 60 }} />\n      <Text style={{ fontSize: 24, fontWeight: "bold" }}>Sara</Text>\n      <Text>Mobile developer</Text>\n    </View>\n  );\n}',
      note: { ar: "بطاقة ملف شخصي على الهاتف.", en: "A profile card on a phone." },
    },
    files: ["js"],
    starter: { js: 'import { View, Text, Image } from "react-native";\n\nexport default function App() {\n  \n}\n' },
    solution: {
      js: 'import { View, Text, Image } from "react-native";\n\nexport default function App() {\n  return (\n    <View style={{ padding: 24, alignItems: "center", gap: 12 }}>\n      <Image source={{ uri: "https://picsum.photos/200" }} style={{ width: 120, height: 120, borderRadius: 60 }} />\n      <Text style={{ fontSize: 24, fontWeight: "bold" }}>Code Master</Text>\n      <Text>Learning React Native</Text>\n    </View>\n  );\n}\n',
    },
    tasks: [
      { id: "view", label: { ar: "أرجع `<View>` كحاوية رئيسية", en: "Return a `<View>` as the main container" }, test: ({ doc }) => !!doc.querySelector('[data-rn="View"]') },
      { id: "texts", label: { ar: "ضع بداخلها `<Text>` اثنين على الأقل", en: "Put at least two `<Text>` inside it" }, test: ({ doc }) => doc.querySelectorAll('[data-rn="View"] [data-rn="Text"]').length >= 2 },
      { id: "image", label: { ar: "أضف `<Image>` لها `source={{ uri }}` وعرض وارتفاع", en: "Add an `<Image>` with `source={{ uri }}`, width and height" }, test: ({ doc }) => { const img = doc.querySelector('[data-rn="Image"]'); return !!img?.getAttribute("src") && /width/.test(img.getAttribute("style") ?? "") && /height/.test(img.getAttribute("style") ?? ""); } },
    ],
    hints: [
      { ar: "`return ( <View> <Text>…</Text> <Text>…</Text> </View> );`", en: "`return ( <View> <Text>…</Text> <Text>…</Text> </View> );`" },
      { ar: '`<Image source={{ uri: "https://picsum.photos/200" }} style={{ width: 120, height: 120 }} />`', en: '`<Image source={{ uri: "https://picsum.photos/200" }} style={{ width: 120, height: 120 }} />`' },
    ],
    xp: 30,
  },
  {
    slug: "rn-styles",
    runtime: "native",
    title: { ar: "التنسيق: StyleSheet و Flexbox", en: "Styling: StyleSheet and Flexbox" },
    body: [
      { icon: "🎨", ar: "لا يوجد CSS في React Native. التنسيق كائنات JavaScript بأسماء camelCase: `backgroundColor` و `fontSize` و `borderRadius`.", en: "There's no CSS in React Native. Styles are JavaScript objects in camelCase: `backgroundColor`, `fontSize`, `borderRadius`." },
      { icon: "📒", ar: "اجمعها في `StyleSheet.create({ card: { … }, title: { … } })` ثم استخدمها: `style={styles.card}`. أنظف وأسرع من الكتابة داخل كل عنصر.", en: "Group them in `StyleSheet.create({ card: { … }, title: { … } })`, then use `style={styles.card}`. Cleaner and faster than inline everywhere." },
      { icon: "↔️", ar: "التخطيط كله **Flexbox**: العناصر تُرتّب في صف أو عمود. `flexDirection: \"row\"` لصف، `justifyContent` و `alignItems`، و `flex: 1` ليملأ المساحة.", en: "Layout is all **Flexbox**: items line up in a row or a column. `flexDirection: \"row\"` for a row, `justifyContent` and `alignItems`, and `flex: 1` to fill the space." },
      { icon: "📐", ar: "معاني الخصائص: `padding` مسافة داخلية، `margin` مسافة خارجية، `borderRadius` زوايا مستديرة، `backgroundColor` لون الخلفية، `gap` مسافة بين الأبناء. و `justifyContent` يرتّب على المحور الرئيسي، و `alignItems` على المحور العرضي.", en: "What the properties mean: `padding` is inner space, `margin` outer space, `borderRadius` round corners, `backgroundColor` the background, `gap` space between children. `justifyContent` places items along the main axis, `alignItems` across it." },
    ],
    example: {
      code: 'import { View, Text, StyleSheet } from "react-native";\n\nexport default function App() {\n  return (\n    <View style={styles.row}>\n      <View style={[styles.box, { backgroundColor: "#22d3ee" }]} />\n      <View style={[styles.box, { backgroundColor: "#8b5cf6" }]} />\n      <View style={[styles.box, { backgroundColor: "#e040fb" }]} />\n    </View>\n  );\n}\n\nconst styles = StyleSheet.create({\n  row: { flexDirection: "row", gap: 12, padding: 24 },\n  box: { width: 60, height: 60, borderRadius: 12 },\n});',
      note: { ar: "ثلاثة مربعات في صف بأنماط مجمّعة.", en: "Three boxes in a row with grouped styles." },
    },
    files: ["js"],
    starter: { js: 'import { View, Text, StyleSheet } from "react-native";\n\nexport default function App() {\n  return (\n    <View>\n      <Text>Code Master</Text>\n    </View>\n  );\n}\n' },
    solution: {
      js: 'import { View, Text, StyleSheet } from "react-native";\n\nexport default function App() {\n  return (\n    <View style={styles.screen}>\n      <View style={styles.card}>\n        <Text style={styles.title}>Code Master</Text>\n      </View>\n    </View>\n  );\n}\n\nconst styles = StyleSheet.create({\n  screen: { flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: "#0a0f24" },\n  card: { padding: 24, borderRadius: 20, backgroundColor: "#8b5cf6" },\n  title: { color: "white", fontSize: 24, fontWeight: "bold" },\n});\n',
    },
    tasks: [
      { id: "sheet", label: { ar: "أنشئ الأنماط بـ `StyleSheet.create`", en: "Create styles with `StyleSheet.create`" }, test: ({ files }) => /StyleSheet\.create\(/.test(files.js ?? "") },
      { id: "center", label: { ar: "وسّط المحتوى بـ `justifyContent` و `alignItems` على `\"center\"`", en: "Center content with `justifyContent` and `alignItems` set to `\"center\"`" }, test: ({ doc }) => Array.from(doc.querySelectorAll('[data-rn="View"]')).some((v) => /justify-content:\s*center/.test(v.getAttribute("style") ?? "") && /align-items:\s*center/.test(v.getAttribute("style") ?? "")) },
      { id: "card", label: { ar: "بطاقة لها `padding` و `borderRadius` و `backgroundColor`", en: "A card with `padding`, `borderRadius` and `backgroundColor`" }, test: ({ doc }) => Array.from(doc.querySelectorAll('[data-rn="View"]')).some((v) => { const st = v.getAttribute("style") ?? ""; return /padding/.test(st) && /border-radius/.test(st) && /background-color/.test(st); }) },
    ],
    hints: [
      { ar: '`const styles = StyleSheet.create({ screen: { flex: 1, justifyContent: "center", alignItems: "center" } });`', en: '`const styles = StyleSheet.create({ screen: { flex: 1, justifyContent: "center", alignItems: "center" } });`' },
      { ar: '`card: { padding: 24, borderRadius: 20, backgroundColor: "#8b5cf6" }` ثم `style={styles.card}`', en: '`card: { padding: 24, borderRadius: 20, backgroundColor: "#8b5cf6" }` then `style={styles.card}`' },
    ],
    xp: 30,
  },
  {
    slug: "rn-touch",
    runtime: "native",
    title: { ar: "اللمس والحالة: Pressable و useState", en: "Touch and state: Pressable and useState" },
    body: [
      { icon: "👆", ar: "`<Pressable onPress={…}>` يجعل أي شيء قابلًا للمس. لاحظ: `onPress` وليس `onClick`.", en: "`<Pressable onPress={…}>` makes anything touchable. Note: `onPress`, not `onClick`." },
      { icon: "🧠", ar: "الحالة تعمل كما في React تمامًا: `const [liked, setLiked] = useState(false);` ثم `onPress={() => setLiked(!liked)}`.", en: "State works exactly like React: `const [liked, setLiked] = useState(false);` then `onPress={() => setLiked(!liked)}`." },
      { icon: "📳", ar: "في التطبيق الحقيقي أضف ردود فعل: تغيير اللون عند الضغط بـ `style={({ pressed }) => …}`، أو اهتزاز بمكتبة `expo-haptics`.", en: "In a real app add feedback: change color while pressed with `style={({ pressed }) => …}`, or vibrate with `expo-haptics`." },
    ],
    example: {
      code: 'import { useState } from "react";\nimport { View, Text, Pressable } from "react-native";\n\nexport default function App() {\n  const [liked, setLiked] = useState(false);\n  return (\n    <View style={{ padding: 32, alignItems: "center" }}>\n      <Pressable onPress={() => setLiked(!liked)}>\n        <Text style={{ fontSize: 48 }}>{liked ? "❤️" : "🤍"}</Text>\n      </Pressable>\n    </View>\n  );\n}',
      note: { ar: "اضغط القلب ليتغير.", en: "Tap the heart to toggle it." },
    },
    files: ["js"],
    starter: { js: 'import { useState } from "react";\nimport { View, Text, Pressable } from "react-native";\n\nexport default function App() {\n  \n}\n' },
    solution: {
      js: 'import { useState } from "react";\nimport { View, Text, Pressable } from "react-native";\n\nexport default function App() {\n  const [steps, setSteps] = useState(0);\n  return (\n    <View style={{ padding: 32, alignItems: "center", gap: 16 }}>\n      <Text style={{ fontSize: 32 }}>Steps: {steps}</Text>\n      <Pressable onPress={() => setSteps(steps + 1)} style={{ backgroundColor: "#8b5cf6", padding: 16, borderRadius: 12 }}>\n        <Text style={{ color: "white" }}>Walk</Text>\n      </Pressable>\n    </View>\n  );\n}\n',
    },
    harness: 'var b = document.querySelector("[data-rn=Pressable]"); if (b) { b.click(); }',
    tasks: [
      { id: "state", label: { ar: "حالة `steps` تبدأ من 0", en: "A `steps` state starting at 0" }, test: ({ files }) => /useState\(\s*0\s*\)/.test(files.js ?? "") },
      { id: "press", label: { ar: "`<Pressable onPress>` يزيدها عند اللمس", en: "A `<Pressable onPress>` that adds one on tap" }, test: ({ files }) => /onPress=\{/.test(files.js ?? "") && /<Pressable/.test(files.js ?? "") },
      { id: "show", label: { ar: "اعرض `Steps: {steps}` في `<Text>`", en: "Show `Steps: {steps}` in a `<Text>`" }, test: ({ doc }) => Array.from(doc.querySelectorAll('[data-rn="Text"]')).some((t) => /Steps:\s*1\b/.test(text(t))) },
    ],
    hints: [
      { ar: "`const [steps, setSteps] = useState(0);`", en: "`const [steps, setSteps] = useState(0);`" },
      { ar: "`<Pressable onPress={() => setSteps(steps + 1)}><Text>Walk</Text></Pressable>`", en: "`<Pressable onPress={() => setSteps(steps + 1)}><Text>Walk</Text></Pressable>`" },
    ],
    xp: 35,
  },
  {
    slug: "rn-lists",
    runtime: "native",
    title: { ar: "القوائم الطويلة: FlatList", en: "Long lists: FlatList" },
    body: [
      { icon: "📜", ar: "للقوائم الطويلة استخدم `<FlatList>` وليس `map`: يرسم فقط ما يظهر على الشاشة، فيبقى التطبيق سريعًا مع آلاف العناصر.", en: "For long lists use `<FlatList>`, not `map`: it only draws what's on screen, so the app stays fast with thousands of items." },
      { icon: "🔧", ar: "تعطيه `data` (المصفوفة) و `renderItem` (كيف يبدو كل عنصر) و `keyExtractor` (مفتاح فريد): `keyExtractor={(item) => item.id}`.", en: "Give it `data` (the array), `renderItem` (how each item looks) and `keyExtractor` (a unique key): `keyExtractor={(item) => item.id}`." },
      { icon: "📱", ar: "`renderItem` يستقبل `{ item }`: `renderItem={({ item }) => <Text>{item.name}</Text>}`.", en: "`renderItem` receives `{ item }`: `renderItem={({ item }) => <Text>{item.name}</Text>}`." },
    ],
    example: {
      code: 'import { FlatList, Text, View } from "react-native";\n\nconst contacts = [\n  { id: "1", name: "Sara" },\n  { id: "2", name: "Omar" },\n  { id: "3", name: "Lina" },\n];\n\nexport default function App() {\n  return (\n    <FlatList\n      data={contacts}\n      keyExtractor={(item) => item.id}\n      renderItem={({ item }) => (\n        <View style={{ padding: 16, borderBottomWidth: 1, borderColor: "#eee" }}>\n          <Text>{item.name}</Text>\n        </View>\n      )}\n    />\n  );\n}',
      note: { ar: "قائمة جهات اتصال.", en: "A contact list." },
    },
    files: ["js"],
    starter: { js: 'import { FlatList, Text, View } from "react-native";\n\nconst lessons = [\n  { id: "1", title: "Components" },\n  { id: "2", title: "Styles" },\n  { id: "3", title: "Touch" },\n  { id: "4", title: "Lists" },\n];\n\nexport default function App() {\n  \n}\n' },
    solution: {
      js: 'import { FlatList, Text, View } from "react-native";\n\nconst lessons = [\n  { id: "1", title: "Components" },\n  { id: "2", title: "Styles" },\n  { id: "3", title: "Touch" },\n  { id: "4", title: "Lists" },\n];\n\nexport default function App() {\n  return (\n    <FlatList\n      data={lessons}\n      keyExtractor={(item) => item.id}\n      renderItem={({ item }) => (\n        <View style={{ padding: 16 }}>\n          <Text>{item.title}</Text>\n        </View>\n      )}\n    />\n  );\n}\n',
    },
    tasks: [
      { id: "flatlist", label: { ar: "استخدم `<FlatList>` مع `data={lessons}`", en: "Use `<FlatList>` with `data={lessons}`" }, test: ({ doc, files }) => /<FlatList/.test(files.js ?? "") && /data=\{\s*lessons\s*\}/.test(files.js ?? "") && !!doc.querySelector('[data-rn="FlatList"]') },
      { id: "key", label: { ar: "أضف `keyExtractor`", en: "Add a `keyExtractor`" }, test: ({ files }) => /keyExtractor=\{/.test(files.js ?? "") },
      { id: "items", label: { ar: "اعرض الدروس الأربعة بـ `renderItem`", en: "Render all four lessons with `renderItem`" }, test: ({ doc }) => ["Components", "Styles", "Touch", "Lists"].every((t) => (doc.body.textContent ?? "").includes(t)) },
    ],
    hints: [
      { ar: "`<FlatList data={lessons} keyExtractor={(item) => item.id} renderItem={…} />`", en: "`<FlatList data={lessons} keyExtractor={(item) => item.id} renderItem={…} />`" },
      { ar: "`renderItem={({ item }) => <Text>{item.title}</Text>}`", en: "`renderItem={({ item }) => <Text>{item.title}</Text>}`" },
    ],
    xp: 35,
  },
  {
    slug: "rn-input",
    runtime: "native",
    title: { ar: "الإدخال: TextInput", en: "Input: TextInput" },
    body: [
      { icon: "⌨️", ar: "`<TextInput>` حقل الكتابة. بدل `onChange` يستخدم `onChangeText` الذي يعطيك النص مباشرة: `onChangeText={setName}`.", en: "`<TextInput>` is the text field. Instead of `onChange` it has `onChangeText`, which hands you the text directly: `onChangeText={setName}`." },
      { icon: "🔒", ar: "`secureTextEntry` لكلمات السر، و `keyboardType=\"email-address\"` لإظهار لوحة البريد، و `placeholder` للتلميح.", en: "`secureTextEntry` for passwords, `keyboardType=\"email-address\"` for the email keyboard, and `placeholder` for a hint." },
      { icon: "✅", ar: "تحقق قبل الإرسال وأظهر رسالة واضحة. هذا نفس منطق النماذج في React، بمكوّنات الهاتف.", en: "Validate before sending and show a clear message. It's the same logic as React forms, with phone components." },
    ],
    example: {
      code: 'import { useState } from "react";\nimport { View, Text, TextInput } from "react-native";\n\nexport default function App() {\n  const [city, setCity] = useState("");\n  return (\n    <View style={{ padding: 24, gap: 12 }}>\n      <TextInput value={city} onChangeText={setCity} placeholder="Your city" />\n      <Text>{city ? `Weather in ${city}` : "Type a city"}</Text>\n    </View>\n  );\n}',
      note: { ar: "اكتب مدينة وشاهد النص يتغير.", en: "Type a city and watch the text change." },
    },
    files: ["js"],
    starter: { js: 'import { useState } from "react";\nimport { View, Text, TextInput } from "react-native";\n\nexport default function App() {\n  \n}\n' },
    solution: {
      js: 'import { useState } from "react";\nimport { View, Text, TextInput } from "react-native";\n\nexport default function App() {\n  const [name, setName] = useState("");\n  return (\n    <View style={{ padding: 24, gap: 12 }}>\n      <TextInput value={name} onChangeText={setName} placeholder="Your name" />\n      <Text>Welcome, {name}</Text>\n    </View>\n  );\n}\n',
    },
    harness: 'var i = document.querySelector("[data-rn=TextInput]"); if (i) { Object.getOwnPropertyDescriptor(HTMLInputElement.prototype, "value").set.call(i, "Omar"); i.dispatchEvent(new Event("input", { bubbles: true })); }',
    tasks: [
      { id: "input", label: { ar: "أضف `<TextInput>` مع `value` و `onChangeText`", en: "Add a `<TextInput>` with `value` and `onChangeText`" }, test: ({ files }) => /<TextInput/.test(files.js ?? "") && /onChangeText=\{/.test(files.js ?? "") && /value=\{/.test(files.js ?? "") },
      { id: "placeholder", label: { ar: "أعطه `placeholder`", en: "Give it a `placeholder`" }, test: ({ doc }) => !!doc.querySelector('[data-rn="TextInput"][placeholder]') },
      { id: "live", label: { ar: "اعرض `Welcome, {name}` يتحدّث مع الكتابة", en: "Show `Welcome, {name}` updating as you type" }, test: ({ doc }) => Array.from(doc.querySelectorAll('[data-rn="Text"]')).some((t) => text(t) === "Welcome, Omar") },
    ],
    hints: [
      { ar: '`const [name, setName] = useState("");` و `<TextInput value={name} onChangeText={setName} placeholder="Your name" />`', en: '`const [name, setName] = useState("");` and `<TextInput value={name} onChangeText={setName} placeholder="Your name" />`' },
      { ar: "`<Text>Welcome, {name}</Text>`", en: "`<Text>Welcome, {name}</Text>`" },
    ],
    xp: 35,
  },
  reading({
    slug: "rn-publish",
    title: { ar: "النشر على المتاجر", en: "Publishing to the stores" },
    body: [
      { icon: "🏗️", ar: "**EAS Build** من Expo يبني تطبيقك في السحابة: `eas build -p android` يعطيك ملف AAB/APK، و `eas build -p ios` لآيفون، دون الحاجة لـ Android Studio أو Mac.", en: "Expo's **EAS Build** builds your app in the cloud: `eas build -p android` gives you an AAB/APK, and `eas build -p ios` for iPhone, no Android Studio or Mac required." },
      { icon: "🛒", ar: "**Google Play**: حساب مطوّر برسوم مرة واحدة (25$)، ترفع ملف AAB مع الصور والوصف وسياسة الخصوصية. **App Store**: اشتراك سنوي (99$) ومراجعة أدق.", en: "**Google Play**: a one-time developer fee ($25), then upload an AAB with screenshots, description and a privacy policy. **App Store**: a yearly membership ($99) and a stricter review." },
      { icon: "🎨", ar: "جهّز: أيقونة 1024×1024، شاشة بداية، اسم ووصف بالعربية والإنجليزية، وصور شاشة. واطلب فقط الأذونات التي تحتاجها فعلًا.", en: "Prepare a 1024×1024 icon, a splash screen, name and description in Arabic and English, and screenshots. Request only the permissions you really need." },
      { icon: "🔄", ar: "بعد النشر: **EAS Update** يرسل تحديثات JavaScript الصغيرة مباشرة للمستخدمين دون مراجعة جديدة.", en: "After launch, **EAS Update** ships small JavaScript updates straight to users without a new store review." },
    ],
    quiz: [
      { id: "q1", prompt: { ar: "أي أمر يبني نسخة Android في السحابة؟", en: "Which command builds the Android version in the cloud?" }, options: [{ ar: "`eas build -p android`", en: "`eas build -p android`" }, { ar: "`npm run dev`", en: "`npm run dev`" }, { ar: "`git push`", en: "`git push`" }], answer: 0 },
      { id: "q2", prompt: { ar: "ما الذي يُرفع إلى Google Play؟", en: "What do you upload to Google Play?" }, options: [{ ar: "ملف AAB", en: "An AAB file" }, { ar: "ملف HTML", en: "An HTML file" }, { ar: "مجلد node_modules", en: "The node_modules folder" }], answer: 0 },
      { id: "q3", prompt: { ar: "كيف ترسل إصلاحًا صغيرًا بسرعة بعد النشر؟", en: "How do you ship a small fix quickly after launch?" }, options: [{ ar: "EAS Update", en: "EAS Update" }, { ar: "حذف التطبيق", en: "Delete the app" }, { ar: "إرسال APK بالبريد", en: "Email an APK" }], answer: 0 },
    ],
    xp: 20,
  }),
];

export const mobileExam: Exam = {
  passPercent: 80,
  questions: [
    { id: "q1", prompt: { ar: "أي مكوّن لعرض نص في React Native؟", en: "Which component shows text in React Native?" }, options: [{ ar: "`<Text>`", en: "`<Text>`" }, { ar: "`<p>`", en: "`<p>`" }, { ar: "`<span>`", en: "`<span>`" }], answer: 0 },
    { id: "q2", prompt: { ar: "ما اتجاه `View` الافتراضي؟", en: "What's a `View`'s default direction?" }, options: [{ ar: "عمودي (column)", en: "Column" }, { ar: "أفقي (row)", en: "Row" }, { ar: "شبكة", en: "Grid" }], answer: 0 },
    { id: "q3", prompt: { ar: "أي خاصية لللمس على Pressable؟", en: "Which prop handles a tap on Pressable?" }, options: [{ ar: "`onPress`", en: "`onPress`" }, { ar: "`onClick`", en: "`onClick`" }, { ar: "`onTouch`", en: "`onTouch`" }], answer: 0 },
    { id: "q4", prompt: { ar: "لقائمة من 5000 عنصر نستخدم:", en: "For a list of 5,000 items we use:" }, options: [{ ar: "`<FlatList>`", en: "`<FlatList>`" }, { ar: "`map` داخل `<View>`", en: "`map` inside a `<View>`" }, { ar: "`<table>`", en: "`<table>`" }], answer: 0 },
    { id: "q5", prompt: { ar: "كيف تكتب لون الخلفية في الأنماط؟", en: "How do you write background color in styles?" }, options: [{ ar: "`backgroundColor`", en: "`backgroundColor`" }, { ar: "`background-color`", en: "`background-color`" }, { ar: "`bg`", en: "`bg`" }], answer: 0 },
  ],
};
