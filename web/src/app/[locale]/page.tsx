import Link from "next/link";
import { notFound } from "next/navigation";
import { Logo } from "@/components/Logo";
import { stages } from "@/content/curriculum";
import { isLocale, t } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionary";

export default async function HomePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const dict = getDictionary(locale);
  const first = stages[0];

  return (
    <div className="mx-auto flex max-w-6xl flex-col gap-20 px-4 py-14">
      <section className="grid items-center gap-10 lg:grid-cols-[1.1fr_1fr]">
        <div className="flex flex-col gap-6">
          <Logo locale={locale} size="xl" />
          <h1 className="max-w-[22ch] text-3xl font-bold sm:text-4xl">{dict.hero.title}</h1>
          <p className="max-w-[60ch] text-lg text-muted">{dict.hero.subtitle}</p>
          <div className="flex flex-wrap gap-3">
            <Link
              href={`/${locale}/learn/${first.slug}/${first.lessons[0].slug}`}
              className="rounded-xl bg-teal px-6 py-3 font-display font-semibold text-white"
            >
              {dict.hero.cta}
            </Link>
            <Link href={`/${locale}/learn`} className="rounded-xl border border-line px-6 py-3 font-display font-semibold">
              {dict.hero.secondary}
            </Link>
          </div>
        </div>

        {/* A still of the lesson screen: code on one side, its rendered result on the other. */}
        <div className="overflow-hidden rounded-2xl border border-line bg-surface shadow-[0_18px_50px_-24px_rgba(15,27,30,.4)]">
          <div className="flex gap-1 bg-code-bg px-3 pt-2" dir="ltr">
            <span className="rounded-t-lg bg-[#1d3236] px-3 py-1.5 font-mono text-xs text-code-fg">index.html</span>
          </div>
          <pre className="bg-[#1d3236] p-5 font-mono text-sm leading-7 text-code-fg">
            <span className="text-[#5fd4c5]">&lt;h1&gt;</span>Hello, world<span className="text-[#5fd4c5]">&lt;/h1&gt;</span>
            {"\n"}
            <span className="text-[#5fd4c5]">&lt;p&gt;</span>My first line of code.<span className="text-[#5fd4c5]">&lt;/p&gt;</span>
            {"\n"}
            <span className="text-[#6c8589]">{"<!-- ul>li*3 + Tab -->"}</span>
          </pre>
          <div className="border-t border-line bg-white p-5 text-[#0f1b1e]" dir="ltr">
            <p className="font-serif text-2xl font-bold">Hello, world</p>
            <p className="text-sm">My first line of code.</p>
          </div>
        </div>
      </section>

      <section className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {dict.features.map((f, i) => (
          <div key={f.title} className={`flex flex-col gap-2 border-t-[3px] pt-4 ${["border-teal", "border-saffron", "border-ink", "border-coral"][i]}`}>
            <h2 className="text-lg font-bold">{f.title}</h2>
            <p className="text-sm text-muted">{f.text}</p>
          </div>
        ))}
      </section>

      <section className="flex flex-col gap-5">
        <h2 className="text-2xl font-bold">{dict.learn.title}</h2>
        <ol className="flex flex-wrap items-center gap-2">
          {stages.map((stage, i) => (
            <li key={stage.slug} className="flex items-center gap-2">
              <span
                className={`rounded-xl px-4 py-2 font-mono text-sm font-semibold ${
                  stage.status === "available" ? "bg-teal text-white" : "border border-line bg-surface text-muted"
                }`}
                title={t(stage.title, locale)}
              >
                {stage.badge}
              </span>
              {i < stages.length - 1 && <span className="text-muted" aria-hidden="true">{locale === "ar" ? "←" : "→"}</span>}
            </li>
          ))}
        </ol>
      </section>
    </div>
  );
}
