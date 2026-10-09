import { notFound } from "next/navigation";
import { ProfileView } from "@/components/ProfileView";
import { isLocale } from "@/i18n/config";

export default async function Page({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  return <ProfileView locale={locale} />;
}
