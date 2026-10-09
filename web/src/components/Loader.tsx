"use client";

import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState } from "react";

/**
 * The launch screen. It is part of the static HTML, so it shows the moment the app
 * opens, and fades out once the app is ready (and after a short minimum, so it never flickers).
 */
export function Loader({ label }: { label: string }) {
  const [show, setShow] = useState(true);

  useEffect(() => {
    let seen = false;
    try {
      seen = window.sessionStorage.getItem("cm-launched") === "1";
      window.sessionStorage.setItem("cm-launched", "1");
    } catch {
      // First launch behaviour is fine without storage.
    }
    const id = window.setTimeout(() => setShow(false), seen ? 150 : 1300);
    return () => window.clearTimeout(id);
  }, []);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          className="fixed inset-0 z-[100] grid place-items-center bg-paper"
          exit={{ opacity: 0, scale: 1.04 }}
          transition={{ duration: 0.35 }}
          role="status"
          aria-label={label}
        >
          <div className="flex flex-col items-center gap-6" dir="ltr">
            <div className="relative">
              <span className="loader-glow absolute inset-0 rounded-[1.8rem]" aria-hidden="true" />
              <span className="btn-grad relative grid size-24 place-items-center rounded-[1.8rem] font-mono text-3xl font-bold">{"</>"}</span>
            </div>
            <span className="font-display text-2xl font-bold">
              Code <span className="text-grad">Master</span>
            </span>
            <span className="h-1.5 w-40 overflow-hidden rounded-full bg-line">
              <span className="loader-bar btn-grad block h-full w-1/3 rounded-full" />
            </span>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
