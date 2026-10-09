import { htmlExam, htmlLessons } from "./html";
import type { Stage } from "./types";

export const stages: Stage[] = [
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
    status: "available",
    lessons: htmlLessons,
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
    status: "soon",
    lessons: [],
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
    status: "soon",
    lessons: [],
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
