"use client";

import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { dirOf, type Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionary";
import { play } from "@/lib/feedback";
import { saveNote, useNotes } from "@/lib/notes";
import { Press } from "./ui";

/** A notebook button for the lesson header: opens a sheet where the learner writes their own notes. */
export function LessonNotes({ lessonKey, title, locale, dark }: { lessonKey: string; title: string; locale: Locale; dark?: boolean }) {
  const d = getDictionary(locale).lesson;
  const notes = useNotes();
  const saved = notes[lessonKey]?.text ?? "";
  const [open, setOpen] = useState(false);
  const [text, setText] = useState(saved);

  useEffect(() => {
    if (open) setText(saved);
  }, [open, saved]);

  function close() {
    saveNote(lessonKey, text);
    setOpen(false);
  }

  return (
    <>
      <button
        type="button"
        onClick={() => {
          play("tap");
          setOpen(true);
        }}
        aria-label={d.notes}
        className={`relative grid size-10 flex-none place-items-center rounded-xl text-xl ${dark ? "hover:bg-white/10" : "hover:bg-surface-2"}`}
      >
        📝
        {saved && <span className="absolute end-1.5 top-1.5 size-2 rounded-full bg-accent" aria-hidden="true" />}
      </button>
      {typeof document !== "undefined" &&
        createPortal(
          <AnimatePresence>
            {open && (
              <motion.div
                className="fixed inset-0 z-[70] flex items-end justify-center bg-black/50 sm:items-center"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={close}
              >
                <motion.div
                  dir={dirOf(locale)}
                  lang={locale}
                  role="dialog"
                  aria-label={d.notes}
                  className="flex w-full max-w-lg flex-col gap-3 rounded-t-3xl bg-paper p-5 shadow-card sm:rounded-3xl"
                  style={{ paddingBottom: "calc(env(safe-area-inset-bottom, 0px) + 20px)" }}
                  initial={{ y: 80 }}
                  animate={{ y: 0 }}
                  exit={{ y: 80 }}
                  transition={{ type: "spring", stiffness: 320, damping: 30 }}
                  onClick={(e) => e.stopPropagation()}
                  // The sheet is portaled, but React events still bubble to the lesson, which blocks copying.
                  onCopy={(e) => e.stopPropagation()}
                  onCut={(e) => e.stopPropagation()}
                  onContextMenu={(e) => e.stopPropagation()}
                >
                  <div>
                    <h2 className="text-xl font-bold">📝 {d.notes}</h2>
                    <p className="text-sm text-muted">{title}</p>
                  </div>
                  <textarea
                    autoFocus
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    placeholder={d.notesPlaceholder}
                    rows={8}
                    className="glass w-full resize-none rounded-2xl p-4 text-base outline-none focus:glow-ring"
                    style={{ unicodeBidi: "plaintext" }}
                  />
                  <Press onClick={close} className="btn-grad h-12 rounded-2xl font-display font-bold">
                    {d.notesSave}
                  </Press>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>,
          document.body,
        )}
    </>
  );
}
