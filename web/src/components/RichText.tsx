import { Fragment } from "react";

const ARABIC = /[\u0600-\u06FF]/;

/** In Arabic text, a code statement (not a single name) gets its own line, so the two directions don't mix. */
const ownLine = (code: string) => code.length > 10 && /[\s(){}[\]=;<>"']/.test(code);

/**
 * Renders lesson text: `code` (or ``code with ` inside``) becomes inline code, **text** becomes bold.
 * Code is always laid out left to right; in Arabic text, longer code sits on its own line.
 */
export function RichText({ text }: { text: string }) {
  // ``code`` (double backticks) may contain single backticks, as in a template literal.
  const parts = text.split(/(``.+?``|`[^`]+`|\*\*[^*]+\*\*)/g);
  const rtl = ARABIC.test(text);
  let afterBlock = false;
  return (
    <>
      {parts.map((part, i) => {
        if (part.startsWith("`") && part.endsWith("`") && part.length > 1) {
          const code = part.startsWith("``") && part.length > 4 ? part.slice(2, -2).trim() : part.slice(1, -1);
          if (rtl && ownLine(code)) {
            afterBlock = true;
            return (
              <code
                key={i}
                dir="ltr"
                className="my-2 block w-fit max-w-full rounded-xl border-l-4 border-accent bg-accent-soft px-3 py-2 text-start font-mono text-[0.85em] leading-relaxed break-words whitespace-pre-wrap text-accent"
              >
                {code}
              </code>
            );
          }
          afterBlock = false;
          return (
            <code key={i} dir="ltr" className="rounded-md bg-accent-soft px-1.5 py-0.5 font-mono text-[0.88em] text-accent">
              {code}
            </code>
          );
        }
        if (part.startsWith("**") && part.endsWith("**") && part.length > 4) {
          afterBlock = false;
          return <strong key={i}>{part.slice(2, -2)}</strong>;
        }
        // A line break already ends the code line, so drop the punctuation that followed it.
        const rest = afterBlock ? part.replace(/^\s*[.,،؛:]?\s*/, "") : part;
        if (rest) afterBlock = false;
        return <Fragment key={i}>{rest}</Fragment>;
      })}
    </>
  );
}
