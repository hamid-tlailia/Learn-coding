import { notFound } from "next/navigation";
import { LessonView } from "@/components/LessonView";
import { getStage, stages } from "@/content/curriculum";
import { isLocale, locales, t } from "@/i18n/config";

export function generateStaticParams() {
  return locales.flatMap((locale) =>
    stages.flatMap((stage) => stage.lessons.map((lesson) => ({ locale, stage: stage.slug, lesson: lesson.slug }))),
  );
}

type Params = Promise<{ locale: string; stage: string; lesson: string }>;

export async function generateMetadata({ params }: { params: Params }) {
  const { locale, stage, lesson } = await params;
  const found = getStage(stage)?.lessons.find((l) => l.slug === lesson);
  return found && isLocale(locale) ? { title: t(found.title, locale) } : {};
}

export default async function LessonPage({ params }: { params: Params }) {
  const { locale, stage, lesson } = await params;
  if (!isLocale(locale)) notFound();
  const found = getStage(stage)?.lessons.find((l) => l.slug === lesson);
  if (!found) notFound();

  return <LessonView key={`${stage}/${lesson}`} locale={locale} stageSlug={stage} lessonSlug={lesson} />;
}
