import type { L } from "@/i18n/config";

/**
 * Fill-in-the-blank code challenges. Each `_` in `code` is a blank, filled in order
 * by `answers`; `chips` holds the answers plus distractors, shown shuffled.
 */
export type Challenge = { id: string; prompt: L; code: string; answers: string[]; chips: string[] };

export const challenges: Challenge[] = [
  {
    id: "heading",
    prompt: { ar: "أكمل العنوان الرئيسي", en: "Complete the main heading" },
    code: "<_>Hello, Code Master</_>",
    answers: ["h1", "h1"],
    chips: ["h1", "p", "h1", "a"],
  },
  {
    id: "link",
    prompt: { ar: "أكمل الرابط", en: "Complete the link" },
    code: '<a _="https://mdn.dev">MDN</_>',
    answers: ["href", "a"],
    chips: ["src", "href", "a", "link"],
  },
  {
    id: "image",
    prompt: { ar: "أكمل الصورة مع وصفها", en: "Complete the image and its description" },
    code: '<_ src="cat.png" _="A sleeping cat">',
    answers: ["img", "alt"],
    chips: ["img", "alt", "href", "title", "image"],
  },
  {
    id: "list",
    prompt: { ar: "أكمل القائمة المرتبة", en: "Complete the ordered list" },
    code: "<_>\n  <_>Boil water</li>\n  <li>Add tea</li>\n</ol>",
    answers: ["ol", "li"],
    chips: ["ul", "ol", "li", "p"],
  },
  {
    id: "layout",
    prompt: { ar: "أكمل هيكل الصفحة", en: "Complete the page structure" },
    code: "<_>\n  <nav>...</nav>\n</header>\n<_>Content</main>\n<_>© 2026</footer>",
    answers: ["header", "main", "footer"],
    chips: ["footer", "header", "main", "body", "section"],
  },
];
