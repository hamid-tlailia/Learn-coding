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

/**
 * The public page that confirms a certificate, also encoded in its QR code. With the signed
 * token the page can prove the certificate on its own; a bare ID needs the stored copy.
 */
export const verifyUrl = (cert: { id: string; token?: string }) =>
  cert.token ? `${SITE_URL}/verify/?c=${cert.token}` : `${SITE_URL}/verify/?id=${encodeURIComponent(cert.id)}`;

async function call(url: string, init?: RequestInit) {
  const ctrl = new AbortController();
  const timer = setTimeout(() => ctrl.abort(), 10_000);
  try {
    return await fetch(url, { ...init, signal: ctrl.signal });
  } finally {
    clearTimeout(timer);
  }
}

/** Has the registry sign (and store) a new certificate. Returns null when offline or refused. */
export async function registerCert(input: { name: string; stage: string; score: number; grade: Grade }): Promise<{ cert: RegisteredCert; token: string } | null> {
  try {
    const r = await call(API, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(input) });
    return r.status === 201 ? await r.json() : null;
  } catch {
    return null;
  }
}

/** Checks a certificate by signed token or ID: the record, "missing" when invalid or unknown, or "error" when unreachable. */
export async function lookupCert(query: { token?: string; id?: string }): Promise<RegisteredCert | "missing" | "error"> {
  try {
    const r = await call(query.token ? `${API}?c=${encodeURIComponent(query.token)}` : `${API}?id=${encodeURIComponent(query.id ?? "")}`);
    if (r.status === 404 || r.status === 400) return "missing";
    return r.ok ? await r.json() : "error";
  } catch {
    return "error";
  }
}
