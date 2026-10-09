import { notFound } from "next/navigation";
import { StageList } from "@/components/StageList";
import { isLocale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionary";

export default async function LearnPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const dict = getDictionary(locale).learn;

  return (
    <div className="mx-auto flex max-w-4xl flex-col gap-8 px-4 py-10">
      <header className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold">{dict.title}</h1>
        <p className="text-muted">{dict.subtitle}</p>
      </header>
      <StageList locale={locale} />
    </div>
  );
}
