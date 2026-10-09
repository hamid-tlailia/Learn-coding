# سطر · Satr

منصة لتعليم البرمجة بالعربية والإنجليزية، من الويب إلى الموبايل.
A bilingual (Arabic / English) platform for learning to code, from web to mobile.

## What's here

- `design/brand-identity.html`: the proposed visual identity (name, logo, colors, type, lesson screen).
- `web/`: the web app (Next.js 15, React 19, TypeScript, Tailwind CSS 4).

## The web app

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

### Add a lesson

Lessons live in `web/src/content/` as typed data (`types.ts` describes the shape). Every learner-facing
string is `{ ar, en }`. Inline `code` and **bold** in lesson text are rendered automatically.
Each task has a `test` function that receives the parsed HTML document and the learner's files.

## Path

HTML → CSS → JavaScript → Git → React.js (+ Next.js) → Backend → Mobile (React Native / Expo).
HTML is available now; the other stages are listed as coming soon.
