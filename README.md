# سطر · Satr

منصة لتعليم البرمجة بالعربية والإنجليزية، من الويب إلى الموبايل.
A bilingual (Arabic / English) platform for learning to code, from web to mobile.

## What's here

- `design/brand-identity.html`: the proposed visual identity (name, logo, colors, type, lesson screen).
- `web/`: the web app (Next.js 15, React 19, TypeScript, Tailwind CSS 4), exported as static HTML.
- `web/android/`: the Android app, which wraps the same static site with Capacitor (works offline).

## The web app

App shell with five tabs (Home, Path, Practice, Profile, Settings), a dark neon theme by default with light mode,
six accent colors and animated backgrounds, synthesized sound effects and haptics, page transitions, a full-screen
code editor with quick-tags for phones, fill-in-the-blank challenges, a timed stage exam and celebration screens.

- Arabic (RTL) and English interfaces under `/ar` and `/en`, plus a per-lesson switch for the explanation language.
- Lesson screen: explanation, worked example, a "fastest way" tip, tasks, hints, a CodeMirror editor with Emmet
  (type `ul>li*3` then Tab) and a live sandboxed preview.
- Tasks are checked automatically against the learner's code; passing them awards XP and keeps a daily streak.
- Each stage ends with an exam (80% to pass) that unlocks the next stage.
- Progress is stored in the browser for now (`web/src/lib/progress.ts`); a Supabase backend comes next.

### Run it

```bash
cd web
npm install
npm run dev   # http://localhost:3000
```

### Deploy to Vercel

Import the repository in Vercel and set **Root Directory** to `web`. Vercel detects Next.js and serves the
static export; no other settings are needed. No GitHub Actions are used anywhere in this repository.

### Build the Android APK

Needs JDK 21 and the Android SDK (`ANDROID_HOME`).

```bash
cd web
npm run build             # writes the static site to out/
npx cap sync android      # copies out/ into the Android project
cd android && ./gradlew assembleDebug
# APK: web/android/app/build/outputs/apk/debug/app-debug.apk
```

App icons and splash screens are generated from `web/assets/` with `npx @capacitor/assets generate --android`.
`MainActivity.java` maps folder paths such as `/ar/learn/` to their `index.html`, which the static export needs.

### Add a lesson

Lessons live in `web/src/content/` as typed data (`types.ts` describes the shape). Every learner-facing
string is `{ ar, en }`. Inline `code` and **bold** in lesson text are rendered automatically.
Each task has a `test` function that receives the parsed HTML document and the learner's files.

## Path

HTML → CSS → JavaScript → Git → React.js (+ Next.js) → Backend → Mobile (React Native / Expo).
HTML is available now; the other stages are listed as coming soon.
