import { notFound } from "next/navigation";
import { ProjectView } from "@/components/ProjectView";
import { getStage, stages } from "@/content/curriculum";
import { isLocale, locales } from "@/i18n/config";

export function generateStaticParams() {
  return locales.flatMap((locale) => stages.filter((s) => s.project).map((stage) => ({ locale, stage: stage.slug })));
}

export default async function ProjectPage({ params }: { params: Promise<{ locale: string; stage: string }> }) {
  const { locale, stage } = await params;
  if (!isLocale(locale) || !getStage(stage)?.project) notFound();
  return <ProjectView locale={locale} stageSlug={stage} />;
}
