import { notFound } from "next/navigation";
import { CertificateView } from "@/components/CertificateView";
import { getStage, stages } from "@/content/curriculum";
import { isLocale, locales } from "@/i18n/config";

export function generateStaticParams() {
  return locales.flatMap((locale) => stages.filter((s) => s.certificate).map((s) => ({ locale, stage: s.slug })));
}

export default async function Page({ params }: { params: Promise<{ locale: string; stage: string }> }) {
  const { locale, stage } = await params;
  if (!isLocale(locale) || !getStage(stage)?.certificate) notFound();
  return <CertificateView locale={locale} stageSlug={stage} />;
}
