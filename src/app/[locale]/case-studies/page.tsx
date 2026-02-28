import { ProductHero } from "@/components/sections/ProductHero";
import { setRequestLocale } from 'next-intl/server';
import { getTranslations } from 'next-intl/server';
import { ArrowUpRight } from "lucide-react";

export default async function CaseStudiesPage({ params }: { params: Promise<{ locale: string }> }) {
    const { locale } = await params;
    setRequestLocale(locale);
    const t = await getTranslations("caseStudiesPage");

    const cases = ["case1", "case2", "case3", "case4"];

    return (
        <main className="min-h-screen bg-brand-dark">
            <ProductHero
                badge={t("badge")}
                title={t("title")}
                subtitle={t("subtitle")}
                imageSrc="/images/case-studies-hero.png"
                primaryCta={t("cta")}
            />
            <section className="py-24 text-white bg-white/5">
                <div className="max-w-6xl mx-auto px-6">
                    <div className="grid md:grid-cols-2 gap-8">
                        {cases.map((caseKey) => (
                            <a key={caseKey} href={`/${locale}${t(`${caseKey}.link`)}`} className="group relative bg-brand-dark rounded-2xl overflow-hidden border border-white/10 hover:border-brand-accent transition-colors duration-300 block">
                                <div className="p-8">
                                    <div className="flex justify-between items-start mb-6">
                                        <span className="text-brand-accent text-sm font-semibold tracking-wider uppercase">{t(`${caseKey}.category`)}</span>
                                        <ArrowUpRight className="text-gray-500 group-hover:text-brand-accent transition-colors" />
                                    </div>
                                    <h3 className="text-2xl font-bold mb-4">{t(`${caseKey}.title`)}</h3>
                                    <p className="text-gray-400 mb-6">{t(`${caseKey}.desc`)}</p>
                                    <div className="inline-block bg-brand-accent/10 px-4 py-2 rounded-lg">
                                        <span className="text-brand-accent font-bold">{t(`${caseKey}.stat`)}</span>
                                    </div>
                                </div>
                            </a>
                        ))}
                    </div>
                </div>
            </section>
        </main>
    );
}
