"use client";

import { Capacitor } from "@capacitor/core";
import { Directory, Filesystem } from "@capacitor/filesystem";
import { Share } from "@capacitor/share";
import { toPng } from "html-to-image";
import { motion } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { getStage, orderedStages } from "@/content/curriculum";
import { t, type Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionary";
import { celebrate, play } from "@/lib/feedback";
import { registerCert, verifyUrl } from "@/lib/certApi";
import { certEarned, certGrade, dayKey, issueCert, markRegistered, useProgress, type Cert } from "@/lib/progress";
import { updateSettings, useSettings } from "@/lib/settings";
import { Certificate } from "./Certificate";
import type { Tech } from "./TechIcon";
import { Card, PageHeader, Press, Toggle, useMounted } from "./ui";

/** Shows the certificate scaled to the screen while keeping its fixed 1200×850 layout. */
function Scaled({ children }: { children: React.ReactNode }) {
  const box = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(0.3);
  useEffect(() => {
    const el = box.current;
    if (!el) return;
    const fit = () => setScale(Math.min(1, el.clientWidth / 1200));
    fit();
    const ro = new ResizeObserver(fit);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);
  return (
    <div ref={box} className="w-full overflow-hidden rounded-2xl shadow-card" style={{ height: 850 * scale }} dir="ltr">
      <div style={{ transform: `scale(${scale})`, transformOrigin: "top left", width: 1200 }}>{children}</div>
    </div>
  );
}

export function CertificateView({ locale, stageSlug }: { locale: Locale; stageSlug: string }) {
  const mounted = useMounted();
  const dict = getDictionary(locale);
  const c = dict.cert;
  const stage = getStage(stageSlug)!;
  const progress = useProgress();
  const settings = useSettings();
  const [name, setName] = useState("");
  const [withPhoto, setWithPhoto] = useState(true);
  const [busy, setBusy] = useState(false);
  const [issuing, setIssuing] = useState(false);
  const [syncing, setSyncing] = useState(false);
  const node = useRef<HTMLDivElement>(null);
  const issued = progress.certs[stageSlug];

  useEffect(() => setName(settings.fullName || settings.name), [settings.fullName, settings.name]);

  // A certificate issued offline is recorded in the registry as soon as the app is online again.
  async function sync() {
    const current = progress.certs[stageSlug];
    if (!current || current.registered || syncing) return;
    setSyncing(true);
    const grade = certGrade(stageSlug, progress);
    const r = await registerCert({ name: current.name, stage: stageSlug, score: current.score ?? grade.score, grade: current.grade ?? grade.grade });
    if (r) markRegistered(stageSlug, r.cert.id, r.cert.date, r.token);
    setSyncing(false);
  }

  useEffect(() => {
    if (mounted && issued && !issued.registered) sync();
    // Once per visit; the retry button covers later attempts.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mounted, issued?.id]);

  if (!mounted) return <div className="min-h-dvh" />;

  // Skills: the stages studied up to and including this one, in the learner's track order.
  const ordered = orderedStages(settings.track);
  const upTo = ordered.slice(0, ordered.findIndex((s) => s.slug === stage.slug) + 1);
  const skills = upTo.map((s) => s.icon).filter((i): i is Tech => ["html", "css", "js", "react", "node", "mobile"].includes(i));
  const earned = certEarned(stage.slug, progress);
  const cert = progress.certs[stage.slug];
  const preview: Cert = cert ?? {
    id: "CM-0000-XXXX-XXXX",
    name: name || "—",
    date: dayKey(),
    photo: withPhoto ? settings.photo : "",
    ...certGrade(stage.slug, progress),
  };

  async function image() {
    return toPng(node.current!, { pixelRatio: 2, cacheBust: true });
  }

  async function save() {
    setBusy(true);
    try {
      const png = await image();
      const fileName = `code-master-${stage.slug}-certificate.png`;
      if (Capacitor.isNativePlatform()) {
        const file = await Filesystem.writeFile({ path: fileName, data: png.split(",")[1], directory: Directory.Cache });
        await Share.share({ title: c.heading, files: [file.uri] });
      } else {
        const a = document.createElement("a");
        a.href = png;
        a.download = fileName;
        a.click();
      }
      play("correct");
    } finally {
      setBusy(false);
    }
  }

  async function share() {
    const text = `${c.heading}: ${t(stage.certificate!, locale)} · Code Master`;
    const url = cert ? verifyUrl(cert) : "";
    try {
      if (Capacitor.isNativePlatform()) return await save();
      if (navigator.share) await navigator.share({ title: c.heading, text, url });
      else await navigator.clipboard.writeText(`${text}\n${url}`);
    } catch {
      // The person closed the share sheet.
    }
  }

  const linkedin =
    cert &&
    `https://www.linkedin.com/profile/add?startTask=CERTIFICATION_NAME&name=${encodeURIComponent(stage.certificate!.en)}&organizationName=Code%20Master&issueYear=${cert.date.slice(0, 4)}&issueMonth=${Number(cert.date.slice(5, 7))}&certUrl=${encodeURIComponent(verifyUrl(cert))}&certId=${cert.id}`;

  return (
    <div className="mx-auto flex max-w-5xl flex-col gap-5 px-4 py-6 lg:py-10">
      <PageHeader title={c.title} subtitle={t(stage.certificate!, locale)} labels={dict.stats} />

      <motion.div initial={{ opacity: 0, y: 20, rotateX: 12 }} animate={{ opacity: 1, y: 0, rotateX: 0 }} transition={{ type: "spring", stiffness: 160, damping: 20 }}>
        <Scaled>
          <Certificate ref={node} stage={stage} cert={preview} skills={skills} sample={!cert} />
        </Scaled>
      </motion.div>

      {!earned && <Card className="text-center text-muted">🔒 {c.notYet}</Card>}

      {earned && !cert && (
        <Card className="flex flex-col gap-4">
          <div>
            <h2 className="text-xl font-bold">{c.claimTitle}</h2>
            <p className="text-sm text-muted">{c.claimText}</p>
          </div>
          <input
            id="cert-name"
            value={name}
            maxLength={40}
            placeholder={c.fullName}
            onChange={(e) => setName(e.target.value)}
            className="rounded-2xl border border-line bg-surface-2 px-4 py-3 text-lg outline-none focus:border-accent"
          />
          {settings.photo && (
            <label htmlFor="cert-photo" className="flex items-center justify-between font-semibold">
              {c.withPhoto}
              <Toggle id="cert-photo" label={c.withPhoto} checked={withPhoto} onChange={setWithPhoto} />
            </label>
          )}
          <Press
            silent
            disabled={name.trim().split(/\s+/).length < 2 || issuing}
            onClick={async () => {
              setIssuing(true);
              updateSettings({ fullName: name.trim() });
              const grade = certGrade(stage.slug, progress);
              const remote = await registerCert({ name: name.trim(), stage: stage.slug, score: grade.score, grade: grade.grade });
              issueCert(stage.slug, name.trim(), withPhoto ? settings.photo : "", remote && { id: remote.cert.id, date: remote.cert.date, token: remote.token });
              setIssuing(false);
              play("levelUp");
              celebrate(true);
            }}
            className="btn-grad h-14 rounded-2xl font-display text-lg font-bold disabled:opacity-40"
          >
            {issuing ? "…" : `🎓 ${c.issue}`}
          </Press>
        </Card>
      )}

      {cert && (
        <Card className="flex items-center justify-between gap-3">
          {cert.registered ? (
            <>
              <span className="text-sm font-semibold text-ok">✓ {c.registered}</span>
              <a href={verifyUrl(cert)} target="_blank" rel="noreferrer" className="flex-none text-sm font-semibold text-accent">
                🔍 {c.openVerify}
              </a>
            </>
          ) : (
            <>
              <span className="text-sm text-muted">⏳ {c.notRegistered}</span>
              <Press onClick={sync} disabled={syncing} className="flex-none rounded-xl bg-surface-2 px-3 py-2 text-sm font-semibold">
                {syncing ? "…" : c.retry}
              </Press>
            </>
          )}
        </Card>
      )}

      {cert && (
        <div className="grid gap-3 sm:grid-cols-3">
          <Press silent onClick={save} disabled={busy} className="btn-grad h-14 rounded-2xl font-display font-bold disabled:opacity-60">
            ⬇️ {busy ? "…" : c.download}
          </Press>
          <Press onClick={share} className="glass h-14 rounded-2xl font-display font-bold">
            🔗 {c.share}
          </Press>
          <a href={linkedin!} target="_blank" rel="noreferrer" className="grid h-14 place-items-center rounded-2xl bg-[#0a66c2] font-display font-bold text-white">
            in {c.linkedin}
          </a>
        </div>
      )}
    </div>
  );
}
