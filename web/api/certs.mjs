// Certificate registry for Code Master, running as a Vercel Function.
//
// Every certificate is signed with CERT_SECRET (HMAC-SHA256), a key that only lives in the
// project's environment variables. The signed token travels in the certificate's QR code, so
// anyone can check it, and nobody can forge or alter one without the key. When a Vercel Blob
// store is connected (BLOB_READ_WRITE_TOKEN), certificates are also kept as certs/<id>.json,
// so they can be looked up by ID alone.
//
//   POST /api/certs  { name, stage, score, grade }   → 201 { cert, token }
//   GET  /api/certs?c=<token>                        → 200 cert (signature checked) or 404
//   GET  /api/certs?id=CM-2026-ABCD-EFGH             → 200 cert (from Blob) or 404
import { createHmac, randomBytes, timingSafeEqual } from "node:crypto";

/** Stages that award a certificate. Titles live here so a client can't invent one. */
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
  const code = Array.from(randomBytes(8), (b) => ALPHABET[b % ALPHABET.length]).join("");
  return `CM-${year}-${code.slice(0, 4)}-${code.slice(4)}`;
}

const b64 = (buf) => Buffer.from(buf).toString("base64url");
const mac = (data) => createHmac("sha256", process.env.CERT_SECRET).update(data).digest();

/** token = base64url(JSON of the fields) + "." + base64url(HMAC of that part) */
function sign(fields) {
  const body = b64(JSON.stringify(fields));
  return `${body}.${b64(mac(body))}`;
}

function verify(token) {
  const [body, sig] = String(token).split(".");
  if (!body || !sig) return null;
  const expected = mac(body);
  const given = Buffer.from(sig, "base64url");
  if (given.length !== expected.length || !timingSafeEqual(given, expected)) return null;
  try {
    return JSON.parse(Buffer.from(body, "base64url").toString("utf8"));
  } catch {
    return null;
  }
}

/** What the verify page shows: the signed fields plus the official title. */
const describe = (f) => ({ ...f, title: CERTS[f.stage], issuer: "Code Master" });

async function blob() {
  if (!process.env.BLOB_READ_WRITE_TOKEN) return null;
  return import("@vercel/blob");
}

function cors(res) {
  // The Android app calls this from its own origin, so the API is open to any origin.
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
}

export default async function handler(req, res) {
  cors(res);
  if (req.method === "OPTIONS") return res.status(204).end();
  if (!process.env.CERT_SECRET) return res.status(503).json({ error: "Registry not configured" });

  if (req.method === "GET") {
    if (req.query.c) {
      const fields = verify(req.query.c);
      if (!fields || !CERTS[fields.stage]) return res.status(404).json({ error: "Certificate not valid" });
      res.setHeader("Cache-Control", "public, max-age=300");
      return res.status(200).json(describe(fields));
    }
    const id = String(req.query.id ?? "").trim().toUpperCase();
    if (!ID.test(id)) return res.status(400).json({ error: "Invalid certificate ID" });
    const store = await blob();
    if (store) {
      try {
        const meta = await store.head(`certs/${id}.json`);
        const r = await fetch(meta.url, { cache: "no-store" });
        const saved = r.ok ? await r.json() : null;
        const fields = saved && verify(saved.token);
        if (fields) return res.status(200).json(describe(fields));
      } catch {
        // Not stored: fall through to 404.
      }
    }
    return res.status(404).json({ error: "Certificate not found" });
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
    const fields = { id: newId(date.slice(0, 4)), name, stage, score, grade, date };
    const token = sign(fields);
    const store = await blob();
    if (store) {
      try {
        await store.put(`certs/${fields.id}.json`, JSON.stringify({ token }), { access: "public", contentType: "application/json", addRandomSuffix: false });
      } catch {
        // The signed token alone still verifies; storage is a bonus.
      }
    }
    return res.status(201).json({ cert: describe(fields), token });
  }

  res.setHeader("Allow", "GET, POST, OPTIONS");
  return res.status(405).json({ error: "Method not allowed" });
}
