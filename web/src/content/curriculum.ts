import { cssExam, cssLessons } from "./css";
import { grid, position, selectorsStates, transitions } from "./css-extra";
import { htmlExam, htmlLessons } from "./html";
import { forms, tables, textElements } from "./html-extra";
import { introLessons } from "./intro";
import { jsExam, jsLessons } from "./js";
import { asyncAwait, conditions, objects } from "./js-extra";
import type { Lesson, Stage } from "./types";

/** Builds a stage's lesson order from slugs (core lessons) and lesson objects (extras). */
function order(core: Lesson[], items: (string | Lesson)[]): Lesson[] {
  return items.map((item) => (typeof item === "string" ? core.find((l) => l.slug === item)! : item));
}

const html = order(htmlLessons, ["what-is-html", "page-skeleton", "first-page", textElements, "links-images", "lists", tables, forms, "semantic-layout"]);
const css = order(cssLessons, ["what-is-css", selectorsStates, "colors-fonts", "box-model", "flexbox", grid, position, "responsive", transitions]);
const js = order(jsLessons, ["what-is-js", "variables", conditions, "functions", "arrays-loops", objects, "dom-events", asyncAwait]);

export const stages: Stage[] = [
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
    exam: jsExam,
    certificate: { ar: "أساسيات تطوير الويب", en: "Web Development Fundamentals" },
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
    status: "soon",
    lessons: [],
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
    status: "soon",
    lessons: [],
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
    status: "soon",
    lessons: [],
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
    status: "soon",
    lessons: [],
    certificate: { ar: "شهادة مطوّر Mobile", en: "Mobile Developer certificate" },
  },
];

export function getStage(slug: string) {
  return stages.find((s) => s.slug === slug);
}

export function lessonKey(stage: string, lesson: string) {
  return `${stage}/${lesson}`;
}
