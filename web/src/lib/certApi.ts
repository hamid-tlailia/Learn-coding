import { SITE_URL } from "./site";
import type { Grade } from "./progress";

/** A certificate as the public registry stores it. */
export type RegisteredCert = {
  id: string;
  name: string;
  stage: string;
  title: { ar: string; en: string };
  score: number;
  grade: Grade;
  date: string;
  issuer: string;
};

const API = `${SITE_URL}/api/certs`;

/** The public page that confirms a certificate, also encoded in its QR code. */
export const verifyUrl = (id: string) => `${SITE_URL}/verify/?id=${encodeURIComponent(id)}`;

async function call(url: string, init?: RequestInit) {
  const ctrl = new AbortController();
  const timer = setTimeout(() => ctrl.abort(), 10_000);
  try {
    return await fetch(url, { ...init, signal: ctrl.signal });
  } finally {
    clearTimeout(timer);
  }
}

/** Records a new certificate in the registry. Returns null when offline or refused. */
export async function registerCert(input: { name: string; stage: string; score: number; grade: Grade }): Promise<RegisteredCert | null> {
  try {
    const r = await call(API, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(input) });
    return r.status === 201 ? await r.json() : null;
  } catch {
    return null;
  }
}

/** Looks a certificate up: the record, "missing" when it doesn't exist, or "error" when the registry can't be reached. */
export async function lookupCert(id: string): Promise<RegisteredCert | "missing" | "error"> {
  try {
    const r = await call(`${API}?id=${encodeURIComponent(id)}`);
    if (r.status === 404 || r.status === 400) return "missing";
    return r.ok ? await r.json() : "error";
  } catch {
    return "error";
  }
}
