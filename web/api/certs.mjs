// Certificate registry: the app records each certificate it issues, and anyone can check one by its ID.
// Runs as a Vercel Function; certificates are JSON documents in Vercel Blob (certs/<id>.json).
//
//   POST /api/certs  { name, stage, score, grade, photo? }  → 201 { id, date, … }
//   GET  /api/certs?id=CM-2026-ABCD-EFGH                     → 200 { … } or 404
import { randomBytes } from "node:crypto";
import { head, put } from "@vercel/blob";

/** Stages that award a certificate. The titles are kept here so a client can't invent one. */
const CERTS = {
  javascript: { ar: "أساسيات تطوير الويب", en: "Web Development Fundamentals" },
  react: { ar: "شهادة مطوّر Frontend", en: "Frontend Developer certificate" },
  backend: { ar: "شهادة مطوّر Backend", en: "Backend Developer certificate" },
  mobile: { ar: "شهادة مطوّر Mobile", en: "Mobile Developer certificate" },
  pro: { ar: "شهادة مطوّر Full-Stack", en: "Full-Stack Developer certificate" },
};
const GRADES = ["excellent", "veryGood", "good", "pass"];
const ID = /^CM-\d{4}-[A-Z0-9]{4}-[A-Z0-9]{4}$/;
const ALPHABET = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";

function newId(year) {
  const bytes = randomBytes(8);
  const code = Array.from(bytes, (b) => ALPHABET[b % ALPHABET.length]).join("");
  return `CM-${year}-${code.slice(0, 4)}-${code.slice(4)}`;
}

function cors(res) {
  // The Android app calls this from its own origin, so the API is open to any origin.
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
}

async function read(id) {
  try {
    const blob = await head(`certs/${id}.json`);
    const r = await fetch(blob.url, { cache: "no-store" });
    return r.ok ? await r.json() : null;
  } catch {
    return null;
  }
}

export default async function handler(req, res) {
  cors(res);
  if (req.method === "OPTIONS") return res.status(204).end();

  if (req.method === "GET") {
    const id = String(req.query.id ?? "").trim().toUpperCase();
    if (!ID.test(id)) return res.status(400).json({ error: "Invalid certificate ID" });
    const cert = await read(id);
    if (!cert) return res.status(404).json({ error: "Certificate not found" });
    res.setHeader("Cache-Control", "public, max-age=60");
    return res.status(200).json(cert);
  }

  if (req.method === "POST") {
    const body = typeof req.body === "string" ? JSON.parse(req.body || "{}") : (req.body ?? {});
    const name = String(body.name ?? "").trim().replace(/\s+/g, " ");
    const stage = String(body.stage ?? "");
    const score = Number(body.score);
    const grade = String(body.grade ?? "");
    if (name.length < 3 || name.length > 80) return res.status(400).json({ error: "name must be 3–80 characters" });
    if (!CERTS[stage]) return res.status(400).json({ error: "Unknown certificate" });
    if (!Number.isInteger(score) || score < 60 || score > 100) return res.status(400).json({ error: "score must be 60–100" });
    if (!GRADES.includes(grade)) return res.status(400).json({ error: "Unknown grade" });

    const date = new Date().toISOString().slice(0, 10);
    const cert = { id: newId(date.slice(0, 4)), name, stage, title: CERTS[stage], score, grade, date, issuer: "Code Master" };
    await put(`certs/${cert.id}.json`, JSON.stringify(cert), { access: "public", contentType: "application/json", addRandomSuffix: false });
    return res.status(201).json(cert);
  }

  res.setHeader("Allow", "GET, POST, OPTIONS");
  return res.status(405).json({ error: "Method not allowed" });
}
