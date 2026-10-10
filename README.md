# Code Master

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

Start here (how the web works, thinking like a programmer, tools) → HTML → CSS → JavaScript → Git →
React.js (+ Next.js) → Backend → Mobile (React Native / Expo) → Mastery.

86 lessons in 9 stages, all available. Every stage after Start ends with an exam, and the
certificate stages also end with a project:

| Stage | Lessons | Certificate |
| --- | --- | --- |
| Start | 3 (reading) | |
| HTML | 10 | |
| CSS | 11 | |
| JavaScript | 16 + project (quiz app) | Web Development Fundamentals |
| Git and GitHub | 5 (reading + quizzes) | |
| React.js | 14 + project (shop with a cart) | Frontend Developer |
| Backend (Node.js / Express, SQLite, auth) | 8 + project (notes API) | Backend Developer |
| Mobile (React Native) | 11 + project (habit tracker) | Mobile Developer |
| Mastery (clean code, tests, performance, security, TypeScript, shipping, capstone, career) | 8 + project (portfolio) | Full-Stack Developer |

Learners pick a **web** or **mobile** track first (mobile: Start → JavaScript → React → React Native);
finishing it opens the other track, and Mastery comes last.

How learning is reinforced:

- **Go deeper**: every lesson has a card on how it works underneath and the most common mistakes (`content/deep/`).
- **Notes**: a 📝 notebook per lesson, listed under Practice.
- **Spaced review** (`lib/review.ts`): each finished lesson returns after 1, 3, 7, 14 and 30 days as short
  questions (its quiz plus its fill-in-the-blank challenges); a mistake brings it back tomorrow. Reviews
  for a track stop once its certificate is issued.
- **Checks**: printed text ignores letter case and extra spaces, while code is checked exactly; friendly
  warnings point out reserved words used as names and wrong letter case (`lib/lint.ts`). The solution
  unlocks only after 3 unsuccessful checks.
- **Projects** (`content/projects.ts`) are scored by a rubric; the certificate needs 60% and shows a grade
  (40% exam + 60% project).

Lessons can set a `runtime`, which decides where the learner's code runs:

- **Default**: the HTML, CSS and JS files in a sandboxed page.
- **`react`**: JSX compiled in the browser with sucrase, rendered with React 18 (vendored in `web/public/vendor`).
- **`native`**: React Native components rendered by `rn-shim.js` inside a phone frame. Elements carry `data-rn` for checks.
- **`server`**: an Express-style API from `server-shim.js` (middleware, headers, `bcryptjs` and `jsonwebtoken`
  look-alikes). Checks send requests with `app.request(method, url, body, headers)`. Code that requires
  `better-sqlite3` gets real SQLite (sql.js, WebAssembly, vendored in `sqlite.js`).

Each lesson has an "old vs modern" card, so learners pick up current practice (HTML Living Standard,
CSS Baseline, ECMAScript 2025).

## Deployment and certificate verification

The web app is deployed on Vercel (project `code-master`, root directory `web`, build `npm run build`,
output `out`): https://code-master-gray.vercel.app

`web/api/certs.mjs` is a Vercel Function. When a certificate is issued, the app asks it to sign the
certificate (HMAC-SHA256 with `CERT_SECRET`, a sensitive environment variable). The signed token goes into
the certificate's QR code, which opens `/verify/?c=<token>`; the page asks the API to check the signature,
so a certificate can't be forged or altered without the key. If a Vercel Blob store is connected to the
project (`BLOB_READ_WRITE_TOKEN`), each certificate is also stored and can be looked up by its ID.
