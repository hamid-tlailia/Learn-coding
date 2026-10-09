"use client";

import { useSettings } from "@/lib/settings";

const shapes = [
  { kind: "hex", top: "14%", left: "82%", size: 22, color: "#22d3ee" },
  { kind: "tri", top: "38%", left: "6%", size: 24, color: "#e040fb" },
  { kind: "dot", top: "22%", left: "30%", size: 10, color: "#f5b544" },
  { kind: "hex", top: "70%", left: "12%", size: 16, color: "#34d399" },
  { kind: "tri", top: "62%", left: "88%", size: 20, color: "#22d3ee" },
  { kind: "dot", top: "84%", left: "56%", size: 9, color: "#22d3ee" },
  { kind: "dot", top: "8%", left: "58%", size: 8, color: "#e040fb" },
  { kind: "hex", top: "48%", left: "64%", size: 12, color: "#8b5cf6" },
] as const;

const glyphs = ["</>", "{ }", "( )", "=>", "<h1>", "div", "css", "fn()", "[ ]", "&&", "<p>", "const", "#id", ".class", "if", "return"];

/** Slow, ambient motion behind the tab pages. Never behind lessons, where focus matters. */
export function Backdrop() {
  const { backdrop } = useSettings();
  if (backdrop === "none") return null;

  return (
    <div aria-hidden="true" className={`pointer-events-none fixed inset-0 z-0 overflow-hidden backdrop-${backdrop}`}>
      {backdrop === "cosmic" && (
        <>
          <span className="blob" style={{ position: "absolute", width: "70vmax", height: "70vmax", top: "-30vmax", insetInlineEnd: "-25vmax", background: "#4f46e5", filter: "blur(90px)", opacity: 0.28, borderRadius: 9999 }} />
          <span className="blob" style={{ position: "absolute", width: "60vmax", height: "60vmax", bottom: "-30vmax", insetInlineStart: "-20vmax", background: "#a21caf", filter: "blur(90px)", opacity: 0.22, borderRadius: 9999 }} />
          <Wave height="30vh" color="#3b5bdb" d="M0,160 C240,100 480,100 720,160 C960,220 1200,220 1440,160 L1440,320 L0,320Z" duration="30s" />
          {shapes.map((sh, i) => (
            <span key={i} className="shape" style={{ top: sh.top, left: sh.left, color: sh.color, animationDelay: `-${i * 1.3}s`, animationDuration: `${7 + (i % 4) * 2}s` }}>
              <svg width={sh.size} height={sh.size} viewBox="0 0 24 24" fill="currentColor">
                {sh.kind === "hex" && <path d="M12 2 21 7v10l-9 5-9-5V7z" />}
                {sh.kind === "tri" && <path d="M6 3v18l15-9z" />}
                {sh.kind === "dot" && <circle cx="12" cy="12" r="6" />}
              </svg>
            </span>
          ))}
        </>
      )}
      {backdrop === "aurora" && (
        <>
          <span className="blob" style={{ width: "55vmax", height: "55vmax", top: "-20vmax", insetInlineStart: "-15vmax", background: "var(--accent)" }} />
          <span className="blob" style={{ width: "45vmax", height: "45vmax", bottom: "-18vmax", insetInlineEnd: "-12vmax", background: "var(--saffron)", animationDelay: "-8s" }} />
          <span className="blob" style={{ width: "30vmax", height: "30vmax", top: "35%", insetInlineEnd: "25%", background: "var(--accent)", opacity: 0.18, animationDelay: "-14s" }} />
        </>
      )}
      {backdrop === "code" &&
        glyphs.map((g, i) => (
          <span
            key={i}
            className="glyph"
            style={{
              left: `${(i * 37) % 96}%`,
              fontSize: `${14 + ((i * 7) % 18)}px`,
              animationDuration: `${18 + ((i * 5) % 14)}s`,
              animationDelay: `-${(i * 3.3) % 20}s`,
            }}
          >
            {g}
          </span>
        ))}
      {backdrop === "waves" && (
        <>
          <Wave height="36vh" color="var(--accent)" d="M0,160 C240,100 480,100 720,160 C960,220 1200,220 1440,160 L1440,320 L0,320Z" />
          <Wave height="26vh" color="var(--saffron)" d="M0,230 C240,270 480,270 720,230 C960,190 1200,190 1440,230 L1440,320 L0,320Z" duration="26s" />
        </>
      )}
    </div>
  );
}

/** Two copies of a periodic wave side by side, slid by half its width for a seamless loop. */
function Wave({ d, color, height, duration }: { d: string; color: string; height: string; duration?: string }) {
  return (
    <svg viewBox="0 0 2880 320" preserveAspectRatio="none" style={{ height, opacity: 0.13, animationDuration: duration }}>
      <path fill={color} d={d} />
      <path fill={color} d={d} transform="translate(1440 0)" />
    </svg>
  );
}
