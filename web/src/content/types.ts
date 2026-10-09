import type { L } from "@/i18n/config";

export type FileKind = "html" | "css" | "js";
export type Files = Partial<Record<FileKind, string>>;

/** What a task check receives: the learner's files, the parsed page, CSS rules and console output. */
export type CheckInput = {
  files: Files;
  doc: Document;
  css: string;
  /** Raw HTML source, before the browser fixes it up (e.g. to see the doctype). */
  source: string;
  /** Lines printed with console.log while the code ran (JavaScript lessons). */
  logs: string[];
  /** The value of a CSS property in the first rule whose selector matches exactly, or "". */
  rule: (selector: string, property: string) => string;
  /** Media query conditions found in the CSS, e.g. "(max-width: 600px)". */
  media: string[];
};

export type Task = {
  id: string;
  label: L;
  test: (input: CheckInput) => boolean;
};

/** A paragraph of explanation, with an optional big illustration emoji. */
export type Para = L & { icon?: string };

/** "Old way vs modern way": keeps learners away from outdated habits. */
export type Modern = {
  old: string;
  now: string;
  text: L;
  /** When the modern way became usable in every major browser, e.g. "Baseline 2017". */
  since?: string;
};

export type Question = {
  id: string;
  prompt: L;
  code?: string;
  options: L[];
  answer: number;
};

export type Lesson = {
  slug: string;
  title: L;
  /** Paragraphs of explanation. Text inside `backticks` renders as inline code. */
  body: Para[];
  /** A worked example shown as its own card, with a live preview. */
  example?: { code: string; note: L; lang?: FileKind };
  /** "The fastest way" card: the modern shortcut for this lesson's concept. */
  tip?: { text: L; code?: string };
  modern?: Modern;
  /** Files in the editor. Empty for reading lessons, which end with `quiz` instead. */
  files: FileKind[];
  starter: Files;
  solution: Files;
  tasks: Task[];
  hints: L[];
  /** Questions that close a reading lesson; each must be answered correctly to go on. */
  quiz?: Question[];
  /** Extra JavaScript run after the learner's code during a check, to test functions and events. */
  harness?: string;
  /** How long to keep listening for console output after the code runs (asynchronous lessons). */
  settle?: number;
  xp: number;
};

export type Exam = { passPercent: number; questions: Question[] };

export type Stage = {
  slug: string;
  title: L;
  description: L;
  /** Short label shown on the stage badge, e.g. "HTML". */
  badge: string;
  icon: "start" | "html" | "css" | "js" | "git" | "react" | "node" | "mobile";
  /** Background of the stage's course card. */
  gradient: string;
  /** The version of the standard the lessons follow. */
  standard?: L;
  status: "available" | "soon";
  lessons: Lesson[];
  exam?: Exam;
  /** Stages that end with a verifiable certificate. */
  certificate?: L;
};
