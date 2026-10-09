import { notFound } from "next/navigation";
import { ExamView } from "@/components/ExamView";
import { getStage, stages } from "@/content/curriculum";
import { isLocale, locales } from "@/i18n/config";

export function generateStaticParams() {
  return locales.flatMap((locale) => stages.filter((s) => s.exam).map((stage) => ({ locale, stage: stage.slug })));
}

export default async function ExamPage({ params }: { params: Promise<{ locale: string; stage: string }> }) {
  const { locale, stage } = await params;
  if (!isLocale(locale) || !getStage(stage)?.exam) notFound();
  return <ExamView locale={locale} stageSlug={stage} />;
}
