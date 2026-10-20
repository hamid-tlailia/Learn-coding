import { cssExam, cssLessons } from "./css";
import { grid, position, selectorsStates, transitions } from "./css-extra";
import { htmlExam, htmlLessons } from "./html";
import { forms, tables, textElements } from "./html-extra";
import { introLessons } from "./intro";
import { jsExam, jsLessons } from "./js";
import { asyncAwait } from "./js-extra";
import { classes, fetchJson, keyframes, mediaA11y, modernCss, modules } from "./advanced";
import { json, mapFilter, privateFields, saveTheme, throwErrors } from "./js-steps";
import { breakContinue, conditions, dataTypes, examP1, functions, loops, operators, setup, switchCase } from "./js-p1";
import { arrayMethods, arrays, arrowDefault, closures, dateTime, destructuring, examP2, numbersMath, objects, scopeHoisting, spreadRest } from "./js-p2";
import { browserWindow, delegation, domCreate, domEvents, domIntro, domSelect, domStyle, examP3, formsValidation, keyboardMouse, webStorage } from "./js-p3";
import { asyncIntro, cleanCode, debounceThrottle, errors, esModules, examP4, functional, inheritance, promises, regex, timers, todoApp } from "./js-p4";
import { backendExam, backendLessons } from "./backend";
import { gitExam, gitLessons } from "./git";
import { mobileExam, mobileLessons } from "./mobile";
import { proExam, proLessons } from "./pro";
import { backendProject, jsProject, mobileProject, proProject, reactProject } from "./projects";
import { mobileMore, mobileMoreExam, reactMore, reactMoreExam } from "./more";
import { authLogin, authPractice, authRegister, backendWebExam, browserApis, dataLoading, jsMoreExam, reactWebExam, routing, splitJoin, sqlGroup, sqlPractice, sqlWrite, strings } from "./web-more";
import { reactExam, reactLessons } from "./react";
import { cssDeep } from "./deep/css";
import { htmlDeep } from "./deep/html";
import { jsDeep } from "./deep/js";
import { mobileDeep } from "./deep/mobile";
import { stackDeep } from "./deep/stack";
import type { Exam, Lesson, Question, Stage } from "./types";

/** Builds a stage's lesson order from slugs (core lessons) and lesson objects (extras). */
function order(core: Lesson[], items: (string | Lesson)[]): Lesson[] {
  return items.map((item) => (typeof item === "string" ? core.find((l) => l.slug === item)! : item));
}

/**
 * Questions are authored with the right answer anywhere (often first); rotate each one's
 * options by a stable hash of its key so the right answer lands in a varied position.
 */
function mix(q: Question, key: string): Question {
  let h = 0;
  for (const ch of key) h = (h * 31 + ch.charCodeAt(0)) >>> 0;
  const n = q.options.length;
  const shift = h % n;
  if (!shift) return q;
  const options = q.options.map((_, i) => q.options[(i + shift) % n]);
  return { ...q, options, answer: (q.answer - shift + n) % n };
}
const deepNotes = { ...htmlDeep, ...cssDeep, ...jsDeep, ...stackDeep, ...mobileDeep };

const mixLessons = (stage: string, lessons: Lesson[]) =>
  lessons.map((l) => ({
    ...l,
    quiz: l.quiz?.map((q) => mix(q, `${stage}/${l.slug}/${q.id}`)),
    deep: l.deep ?? deepNotes[`${stage}/${l.slug}`],
  }));
const mixExam = (stage: string, exam: Exam): Exam => ({ ...exam, questions: exam.questions.map((q) => mix(q, `${stage}/exam/${q.id}`)) });

const html = order(htmlLessons, ["what-is-html", "page-skeleton", "first-page", textElements, "links-images", "lists", tables, forms, mediaA11y, "semantic-layout"]);
const css = order(cssLessons, ["what-is-css", selectorsStates, "colors-fonts", "box-model", "flexbox", grid, position, "responsive", transitions, keyframes, modernCss]);
const react = order(reactLessons, [modules, "what-is-react", "jsx", "props", "state", "lists-keys", "forms-react", "effects", reactMore[0], dataLoading, ...reactMore.slice(1), routing, "nextjs"]);
const mobile = order(mobileLessons, ["rn-intro", "rn-components", "rn-styles", "rn-touch", "rn-lists", "rn-input", ...mobileMore, "rn-publish"]);
const js = order(jsLessons, [
  // 1 · Fundamentals
  "what-is-js", setup, "variables", dataTypes, operators, conditions, switchCase, loops, breakContinue, functions,
  // 2 · Data and modern JavaScript
  strings, splitJoin, numbersMath, arrays, mapFilter, arrayMethods, objects, json, dateTime, destructuring, spreadRest, arrowDefault, scopeHoisting, closures,
  // 3 · The page: DOM and events
  domIntro, domSelect, domStyle, domCreate, domEvents, keyboardMouse, delegation, formsValidation, browserWindow, webStorage, saveTheme, browserApis,
  // 4 · Objects and asynchronous code
  classes, inheritance, privateFields, asyncIntro, timers, promises, asyncAwait, fetchJson, errors, throwErrors, esModules,
  // 5 · Advanced, then the to-do app
  debounceThrottle, regex, functional, cleanCode, todoApp,
]);

/** The JavaScript stage's five parts, as shown on the path. */
const jsUnits = [
  { title: { ar: "الأساسيات", en: "Fundamentals" }, from: "what-is-js" },
  { title: { ar: "البيانات و ES6", en: "Data and ES6" }, from: "strings" },
  { title: { ar: "الصفحة: DOM والأحداث", en: "The page: DOM and events" }, from: "dom-intro" },
  { title: { ar: "الكائنات وغير المتزامن", en: "Objects and async" }, from: "classes" },
  { title: { ar: "مفاهيم متقدمة ومشروع", en: "Advanced concepts and a project" }, from: "debounce-throttle" },
];
const backend = order(backendLessons, ["http-apis", "express-basics", "rest-routes", "post-validation", "databases", sqlPractice, sqlWrite, sqlGroup, "auth-security", authRegister, authLogin, authPractice]);

const allStages: Stage[] = [
  {
    slug: "start",
    icon: "start",
    gradient: "linear-gradient(135deg,#22d3ee,#8b5cf6)",
    badge: "Start",
    title: { ar: "البداية: قبل أن تكتب الكود", en: "Start here: before you code" },
    description: {
      ar: "كيف يعمل الويب، كيف تفكر كمبرمج، وتجهيز المحرر على حاسوبك.",
      en: "How the web works, thinking like a programmer, and setting up an editor on your computer.",
    },
    status: "available",
    lessons: introLessons,
  },
  {
    slug: "html",
    icon: "html",
    gradient: "linear-gradient(135deg,#f97316,#e11d48)",
    badge: "HTML",
    title: { ar: "HTML: هيكل الصفحة", en: "HTML: page structure" },
    description: {
      ar: "الوسوم، الروابط، الصور، القوائم والهيكل الدلالي.",
      en: "Tags, links, images, lists and semantic structure.",
    },
    standard: { ar: "HTML Living Standard", en: "HTML Living Standard" },
    status: "available",
    lessons: html,
    exam: htmlExam,
  },
  {
    slug: "css",
    icon: "css",
    gradient: "linear-gradient(135deg,#0ea5e9,#6366f1)",
    badge: "CSS",
    title: { ar: "CSS: التصميم والتنسيق", en: "CSS: styling and layout" },
    description: {
      ar: "الألوان والخطوط، Flexbox و Grid، والتصميم المتجاوب مع الهاتف.",
      en: "Colors and fonts, Flexbox and Grid, and responsive design.",
    },
    standard: { ar: "CSS حسب Baseline 2025", en: "CSS per Baseline 2025" },
    status: "available",
    lessons: css,
    exam: cssExam,
  },
  {
    slug: "javascript",
    icon: "js",
    gradient: "linear-gradient(135deg,#eab308,#f97316)",
    badge: "JS",
    title: { ar: "JavaScript: التفاعل", en: "JavaScript: interactivity" },
    description: {
      ar: "المتغيرات، الدوال، المصفوفات، DOM والأحداث، و fetch.",
      en: "Variables, functions, arrays, the DOM and events, and fetch.",
    },
    standard: { ar: "ECMAScript 2025", en: "ECMAScript 2025" },
    status: "available",
    lessons: js,
    units: jsUnits,
    exam: { ...jsExam, draw: 20, questions: [...jsExam.questions, ...jsMoreExam, ...examP1, ...examP2, ...examP3, ...examP4] },
    project: jsProject,
  },
  {
    slug: "git",
    icon: "git",
    gradient: "linear-gradient(135deg,#ef4444,#a855f7)",
    badge: "Git",
    title: { ar: "Git و GitHub", en: "Git and GitHub" },
    description: {
      ar: "حفظ نسخ مشروعك، العمل مع فريق، ونشر موقعك.",
      en: "Version your project, work with a team, and publish your site.",
    },
    standard: { ar: "Git 2.x", en: "Git 2.x" },
    status: "available",
    lessons: gitLessons,
    exam: gitExam,
  },
  {
    slug: "react",
    icon: "react",
    gradient: "linear-gradient(135deg,#06b6d4,#3b82f6)",
    badge: "React",
    title: { ar: "React.js: بناء الواجهات", en: "React.js: building interfaces" },
    description: {
      ar: "المكوّنات، props و state، الـ hooks، ثم Next.js لبناء مواقع كاملة.",
      en: "Components, props and state, hooks, then Next.js for full sites.",
    },
    standard: { ar: "React 19 و Next.js 15", en: "React 19 and Next.js 15" },
    status: "available",
    lessons: react,
    exam: { ...reactExam, questions: [...reactExam.questions, ...reactMoreExam, ...reactWebExam] },
    project: reactProject,
    certificate: { ar: "شهادة مطوّر Frontend", en: "Frontend Developer certificate" },
  },
  {
    slug: "backend",
    icon: "node",
    gradient: "linear-gradient(135deg,#10b981,#0e7490)",
    badge: "API",
    title: { ar: "Backend: الخادم وقواعد البيانات", en: "Backend: servers and databases" },
    description: {
      ar: "Node.js، بناء API، قواعد البيانات وتسجيل الدخول.",
      en: "Node.js, building APIs, databases and authentication.",
    },
    standard: { ar: "Node.js 22 LTS و Express 5", en: "Node.js 22 LTS and Express 5" },
    status: "available",
    lessons: backend,
    exam: { ...backendExam, questions: [...backendExam.questions, ...backendWebExam] },
    project: backendProject,
    certificate: { ar: "شهادة مطوّر Backend", en: "Backend Developer certificate" },
  },
  {
    slug: "mobile",
    icon: "mobile",
    gradient: "linear-gradient(135deg,#8b5cf6,#d946ef)",
    badge: "App",
    title: { ar: "تطبيقات الموبايل", en: "Mobile apps" },
    description: {
      ar: "React Native و Expo: تطبيق واحد يعمل على Android و iOS.",
      en: "React Native and Expo: one app for Android and iOS.",
    },
    standard: { ar: "React Native و Expo SDK", en: "React Native and Expo SDK" },
    status: "available",
    lessons: mobile,
    exam: { ...mobileExam, questions: [...mobileExam.questions, ...mobileMoreExam] },
    project: mobileProject,
    certificate: { ar: "شهادة مطوّر Mobile", en: "Mobile Developer certificate" },
  },
  {
    slug: "pro",
    icon: "pro",
    gradient: "linear-gradient(135deg,#f59e0b,#e040fb)",
    badge: "Pro",
    title: { ar: "الاحتراف: من متعلّم إلى مطوّر", en: "Mastery: from learner to developer" },
    description: {
      ar: "كود نظيف، اختبارات، أداء، أمان، TypeScript، النشر، مشروع نهائي وأول وظيفة.",
      en: "Clean code, testing, performance, security, TypeScript, shipping, a capstone and your first job.",
    },
    status: "available",
    // Performance (debounce) and clean code are taught in the JavaScript stage now.
    lessons: proLessons.filter((l) => l.slug !== "performance" && l.slug !== "clean-code"),
    exam: proExam,
    project: proProject,
    certificate: { ar: "شهادة مطوّر Full-Stack", en: "Full-Stack Developer certificate" },
  },
];

export const stages: Stage[] = allStages.map((s) => ({
  ...s,
  lessons: mixLessons(s.slug, s.lessons),
  exam: s.exam && mixExam(s.slug, s.exam),
}));

/** A learner picks web or mobile first; finishing it opens the other, and Mastery comes last. */
export type Track = "web" | "mobile";

const trackOwn: Record<Track, string[]> = {
  web: ["start", "html", "css", "javascript", "git", "react", "backend"],
  // Mobile needs JavaScript and React first, then goes straight to React Native.
  mobile: ["start", "javascript", "react", "mobile"],
};

/** The track's stages in study order, split into its own part, the other track's remaining stages, and the final stage. */
export function trackParts(track: Track) {
  const own = trackOwn[track];
  const other = trackOwn[track === "web" ? "mobile" : "web"].filter((s) => !own.includes(s));
  const pick = (slugs: string[]) => slugs.map((slug) => stages.find((s) => s.slug === slug)!);
  return { own: pick(own), other: pick(other), final: pick(stages.map((s) => s.slug).filter((s) => !own.includes(s) && !other.includes(s))) };
}

export function orderedStages(track: Track): Stage[] {
  const { own, other, final } = trackParts(track);
  return [...own, ...other, ...final];
}

export function getStage(slug: string) {
  return stages.find((s) => s.slug === slug);
}

export function lessonKey(stage: string, lesson: string) {
  return `${stage}/${lesson}`;
}
