"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { lookupCert, type RegisteredCert } from "@/lib/certApi";
import { Logo } from "./Logo";

const GRADES = {
  excellent: { ar: "ممتاز", en: "Excellent" },
  veryGood: { ar: "جيد جدًا", en: "Very good" },
  good: { ar: "جيد", en: "Good" },
  pass: { ar: "مقبول", en: "Pass" },
};

type State = { kind: "idle" } | { kind: "loading" } | { kind: "found"; cert: RegisteredCert } | { kind: "missing" } | { kind: "error" };

/** Bilingual, since whoever scans a certificate may read either language. */
export function VerifyView() {
  const [id, setId] = useState("");
  const [state, setState] = useState<State>({ kind: "idle" });

  async function check(query: { token?: string; id?: string }) {
    if (!query.token && !query.id?.trim()) return;
    setState({ kind: "loading" });
    const r = await lookupCert(query.token ? { token: query.token } : { id: query.id!.trim().toUpperCase() });
    setState(r === "missing" ? { kind: "missing" } : r === "error" ? { kind: "error" } : { kind: "found", cert: r });
  }

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const token = params.get("c");
    const fromLink = params.get("id") ?? "";
    if (token) check({ token });
    else if (fromLink) {
      setId(fromLink);
      check({ id: fromLink });
    }
  }, []);

  return (
    <main className="mx-auto flex min-h-dvh max-w-xl flex-col gap-6 bg-paper px-5 py-10">
      <div className="flex items-center justify-between">
        <Logo size="md" />
        <Link href="/" className="text-sm font-semibold text-accent">
          Code Master ›
        </Link>
      </div>

      <div>
        <h1 className="text-3xl font-bold">التحقق من شهادة</h1>
        <p className="text-lg text-muted" dir="ltr">
          Verify a certificate
        </p>
      </div>

      <form
        className="flex gap-2"
        onSubmit={(e) => {
          e.preventDefault();
          window.history.replaceState(null, "", `?id=${encodeURIComponent(id.trim().toUpperCase())}`);
          check({ id });
        }}
      >
        <input
          dir="ltr"
          value={id}
          onChange={(e) => setId(e.target.value)}
          placeholder="CM-2026-XXXX-XXXX"
          className="min-w-0 flex-1 rounded-2xl border border-line bg-surface-2 px-4 py-3 font-mono text-lg uppercase outline-none focus:border-accent"
        />
        <button className="btn-grad flex-none rounded-2xl px-5 font-bold">تحقق · Check</button>
      </form>

      {state.kind === "loading" && <p className="text-center text-muted">…</p>}

      {state.kind === "found" && (
        <section className="flex flex-col gap-4 rounded-3xl border-2 border-ok bg-ok/10 p-6">
          <div className="flex items-center gap-3">
            <span className="grid size-12 place-items-center rounded-full bg-ok text-2xl text-white">✓</span>
            <div>
              <p className="text-xl font-bold">شهادة صحيحة وموثّقة</p>
              <p className="text-sm text-muted" dir="ltr">
                Valid certificate, issued by {state.cert.issuer}
              </p>
            </div>
          </div>
          <dl className="grid grid-cols-[auto_1fr] gap-x-4 gap-y-3">
            <dt className="text-sm text-muted">الاسم · Name</dt>
            <dd className="text-lg font-bold" style={{ unicodeBidi: "plaintext" }}>
              {state.cert.name}
            </dd>
            <dt className="text-sm text-muted">الشهادة · Certificate</dt>
            <dd>
              <span className="block font-semibold">{state.cert.title.ar}</span>
              <span className="block text-sm" dir="ltr">
                {state.cert.title.en}
              </span>
            </dd>
            <dt className="text-sm text-muted">التقدير · Grade</dt>
            <dd className="font-semibold">
              <bdi>{GRADES[state.cert.grade].ar}</bdi> · <bdi>{GRADES[state.cert.grade].en}</bdi> · <bdi>{state.cert.score}%</bdi>
            </dd>
            <dt className="text-sm text-muted">التاريخ · Date</dt>
            <dd className="font-mono">{state.cert.date}</dd>
            <dt className="text-sm text-muted">الرقم · ID</dt>
            <dd className="font-mono">{state.cert.id}</dd>
          </dl>
        </section>
      )}

      {state.kind === "missing" && (
        <section className="flex items-center gap-3 rounded-3xl border-2 border-coral bg-coral/10 p-6">
          <span className="grid size-12 flex-none place-items-center rounded-full bg-coral text-2xl text-white">✕</span>
          <div>
            <p className="text-xl font-bold">لا توجد شهادة بهذا الرقم</p>
            <p className="text-sm text-muted" dir="ltr">
              No certificate with this ID exists in the registry.
            </p>
          </div>
        </section>
      )}

      {state.kind === "error" && (
        <p className="rounded-2xl bg-surface-2 p-4 text-center">
          تعذّر الاتصال بالسجل، حاول مرة أخرى.
          <span className="block text-sm text-muted" dir="ltr">
            Couldn&apos;t reach the registry. Please try again.
          </span>
        </p>
      )}

      <p className="mt-auto text-center text-xs text-muted">
        يتحقق هذا السجل من أن Code Master أصدرت الشهادة لهذا الاسم.
        <span className="block" dir="ltr">
          This registry confirms Code Master issued the certificate to this name.
        </span>
      </p>
    </main>
  );
}
