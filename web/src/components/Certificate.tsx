"use client";

import QRCode from "qrcode";
import { forwardRef, useEffect, useState } from "react";
import type { Stage } from "@/content/types";
import { getDictionary } from "@/i18n/dictionary";
import type { Cert } from "@/lib/progress";
import { SITE_URL } from "@/lib/site";
import { TechIcon, type Tech } from "./TechIcon";

const GRAD = "linear-gradient(110deg, #22d3ee 0%, #8b5cf6 55%, #e040fb 100%)";
const ar = getDictionary("ar").cert;
const en = getDictionary("en").cert;

/** Circuit traces for the corners, drawn once and mirrored. */
function Circuit({ style }: { style: React.CSSProperties }) {
  return (
    <svg width="220" height="160" viewBox="0 0 220 160" fill="none" stroke="#8b5cf6" strokeWidth="2" style={{ position: "absolute", opacity: 0.45, ...style }}>
      <path d="M0 30h60l20 20h60" />
      <path d="M0 70h30l20-20" />
      <path d="M0 110h90l30 30h100" />
      <circle cx="140" cy="50" r="5" fill="#22d3ee" stroke="none" />
      <circle cx="50" cy="50" r="4" fill="#e040fb" stroke="none" />
      <circle cx="220" cy="140" r="5" fill="#22d3ee" stroke="none" />
    </svg>
  );
}

/**
 * The certificate, drawn at a fixed 1200×850 so it exports to an identical image on every
 * device. It ignores the app theme on purpose: a certificate always looks the same.
 */
export const Certificate = forwardRef<HTMLDivElement, { stage: Stage; cert: Cert; skills: Tech[]; sample?: boolean }>(function Certificate(
  { stage, cert, skills, sample },
  ref,
) {
  const [qr, setQr] = useState("");
  const verifyUrl = `${SITE_URL}/?cert=${cert.id}`;

  useEffect(() => {
    QRCode.toDataURL(verifyUrl, { margin: 1, width: 240, color: { dark: "#0a0f24", light: "#ffffff" } }).then(setQr, () => setQr(""));
  }, [verifyUrl]);

  return (
    <div ref={ref} style={{ width: 1200, height: 850, padding: 26, background: "#05081a", fontFamily: "var(--font-readex), var(--font-plex-arabic), system-ui, sans-serif" }} dir="ltr">
      <div style={{ height: "100%", borderRadius: 30, padding: 3, background: GRAD }}>
        <div
          style={{
            position: "relative",
            height: "100%",
            borderRadius: 27,
            overflow: "hidden",
            color: "#e9ecff",
            background:
              "radial-gradient(circle at 15% 10%, rgba(79,70,229,.45), transparent 45%), radial-gradient(circle at 90% 95%, rgba(162,28,175,.4), transparent 45%), radial-gradient(rgba(255,255,255,.07) 1.2px, transparent 1.2px) 0 0/26px 26px, #0a0f24",
          }}
        >
          <Circuit style={{ top: 18, left: 0 }} />
          <Circuit style={{ top: 400, right: 0, transform: "scaleX(-1)" }} />
          {[
            { t: "</>", s: { top: 120, right: 70, fontSize: 70 } },
            { t: "{ }", s: { bottom: 230, left: 60, fontSize: 64 } },
            { t: "=>", s: { top: 330, left: 70, fontSize: 44 } },
            { t: "<h1>", s: { bottom: 300, right: 90, fontSize: 40 } },
          ].map((g) => (
            <span key={g.t} style={{ position: "absolute", fontFamily: "var(--font-jetbrains), monospace", fontWeight: 700, color: "#8b5cf6", opacity: 0.18, ...g.s }}>
              {g.t}
            </span>
          ))}

          {sample && (
            <span style={{ position: "absolute", inset: 0, display: "grid", placeItems: "center", fontSize: 180, fontWeight: 800, color: "rgba(255,255,255,.05)", transform: "rotate(-18deg)" }}>
              {en.sample.toUpperCase()}
            </span>
          )}

          <div style={{ position: "relative", height: "100%", display: "flex", flexDirection: "column", padding: "40px 64px" }}>
            {/* Header */}
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
                <span style={{ width: 56, height: 56, borderRadius: 16, background: GRAD, display: "grid", placeItems: "center", fontFamily: "var(--font-jetbrains), monospace", fontWeight: 800, fontSize: 20, color: "#fff" }}>
                  {"</>"}
                </span>
                <span style={{ fontSize: 28, fontWeight: 700 }}>
                  Code <span style={{ background: GRAD, WebkitBackgroundClip: "text", backgroundClip: "text", color: "transparent" }}>Master</span>
                </span>
              </div>
              <div style={{ textAlign: "right" }}>
                <div style={{ fontSize: 26, fontWeight: 700 }}>{ar.heading}</div>
                <div style={{ fontSize: 14, letterSpacing: 4, color: "#9aa3cc" }}>{en.heading.toUpperCase()}</div>
              </div>
            </div>

            {/* Body */}
            <div style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 14, textAlign: "center" }}>
              <div style={{ fontSize: 22, color: "#c7cdf0" }} dir="rtl">
                {ar.certifies}
              </div>
              <div style={{ fontSize: 15, color: "#9aa3cc", marginTop: -10 }}>{en.certifies}</div>

              <div style={{ display: "flex", alignItems: "center", gap: 26, marginTop: 6 }}>
                {cert.photo && (
                  <span style={{ padding: 4, borderRadius: 999, background: GRAD }}>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={cert.photo} alt="" style={{ width: 112, height: 112, borderRadius: 999, objectFit: "cover", display: "block", border: "4px solid #0a0f24" }} />
                  </span>
                )}
                <div>
                  <div style={{ fontSize: 60, fontWeight: 700, lineHeight: 1.2, color: "#fff" }}>{cert.name}</div>
                  <div style={{ height: 5, marginTop: 8, borderRadius: 9, background: GRAD }} />
                </div>
              </div>

              <div style={{ fontSize: 20, color: "#c7cdf0", marginTop: 8 }} dir="rtl">
                {ar.completed}
              </div>
              <div style={{ fontSize: 15, color: "#9aa3cc", marginTop: -10 }}>{en.completed}</div>
              <div style={{ fontSize: 40, fontWeight: 700, background: GRAD, WebkitBackgroundClip: "text", backgroundClip: "text", color: "transparent" }} dir="rtl">
                {stage.certificate!.ar}
              </div>
              <div style={{ fontSize: 20, fontWeight: 600, color: "#e9ecff", marginTop: -8 }}>{stage.certificate!.en}</div>

              <div style={{ display: "flex", gap: 12, marginTop: 10 }}>
                {skills.map((s) => (
                  <span key={s} style={{ display: "flex", alignItems: "center", gap: 8, padding: "8px 16px", borderRadius: 999, background: "rgba(255,255,255,.07)", border: "1px solid rgba(255,255,255,.12)", fontWeight: 600 }}>
                    <TechIcon tech={s} className="size-6" />
                    {{ html: "HTML", css: "CSS", js: "JavaScript", start: "Web", git: "Git", react: "React", node: "Node.js", mobile: "React Native", pro: "Pro" }[s]}
                  </span>
                ))}
              </div>
            </div>

            {/* Footer: date and ID, seal, QR */}
            <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between" }}>
              <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                <div>
                  <div style={{ fontSize: 13, color: "#9aa3cc" }}>
                    {en.date} · <span dir="rtl">{ar.date}</span>
                  </div>
                  <div style={{ fontSize: 20, fontWeight: 700 }}>{cert.date}</div>
                </div>
                <div>
                  <div style={{ fontSize: 13, color: "#9aa3cc" }}>
                    {en.id} · <span dir="rtl">{ar.id}</span>
                  </div>
                  <div style={{ fontSize: 18, fontWeight: 700, fontFamily: "var(--font-jetbrains), monospace", letterSpacing: 1 }}>{cert.id}</div>
                </div>
              </div>

              {/* Seal */}
              <div style={{ position: "relative", width: 150, height: 150, display: "grid", placeItems: "center" }}>
                <span style={{ position: "absolute", inset: 0, borderRadius: 999, background: "conic-gradient(from 0deg, #fde68a, #f59e0b, #fde68a, #d97706, #fde68a)", boxShadow: "0 0 40px rgba(245,158,11,.45)" }} />
                <span style={{ position: "absolute", inset: 12, borderRadius: 999, border: "2px dashed rgba(120,53,15,.55)", background: "radial-gradient(circle, #fcd34d, #d97706)" }} />
                <span style={{ position: "relative", textAlign: "center", color: "#451a03", fontWeight: 800, lineHeight: 1.1 }}>
                  <span style={{ display: "block", fontFamily: "var(--font-jetbrains), monospace", fontSize: 28 }}>{"</>"}</span>
                  <span style={{ display: "block", fontSize: 13, letterSpacing: 2 }}>CERTIFIED</span>
                </span>
              </div>

              <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 6 }}>
                {qr ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={qr} alt="QR" style={{ width: 118, height: 118, borderRadius: 14, background: "#fff", padding: 6 }} />
                ) : (
                  <span style={{ width: 118, height: 118, borderRadius: 14, background: "#fff" }} />
                )}
                <span style={{ fontSize: 12, color: "#9aa3cc" }}>
                  {en.verify} · <span dir="rtl">{ar.verify}</span>
                </span>
                <span style={{ fontSize: 12, fontFamily: "var(--font-jetbrains), monospace", color: "#c4b5fd" }}>{SITE_URL.replace("https://", "")}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
});
