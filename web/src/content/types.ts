import type { L } from "@/i18n/config";

export type FileKind = "html" | "css" | "js";
export type Files = Partial<Record<FileKind, string>>;

/** What a task check receives: the learner's files plus the HTML parsed into a DOM. */
export type CheckInput = { files: Files; doc: Document; css: string };

export type Task = {
  id: string;
  label: L;
  test: (input: CheckInput) => boolean;
};

export type Lesson = {
  slug: string;
  title: L;
  /** Paragraphs of explanation. Text inside `backticks` renders as inline code. */
  body: L[];
  /** A worked example shown above the editor, read-only. */
  example?: { code: string; note: L };
  /** "The fastest way" card: the modern shortcut for this lesson's concept. */
  tip?: { text: L; code?: string };
  files: FileKind[];
  starter: Files;
  solution: Files;
  tasks: Task[];
  hints: L[];
  xp: number;
};

export type Question = {
  id: string;
  prompt: L;
  code?: string;
  options: L[];
  answer: number;
};

export type Exam = { passPercent: number; questions: Question[] };

export type Stage = {
  slug: string;
  title: L;
  description: L;
  /** Short label shown on the stage badge, e.g. "HTML". */
  badge: string;
  status: "available" | "soon";
  lessons: Lesson[];
  exam?: Exam;
  /** Stages that end with a verifiable certificate. */
  certificate?: L;
};
