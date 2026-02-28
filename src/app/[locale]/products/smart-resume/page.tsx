import { ProductHero } from "@/components/sections/ProductHero";
import { setRequestLocale, getTranslations } from 'next-intl/server';
import { FileText, Sparkles, TrendingUp } from "lucide-react";

export default async function SmartResumePage({ params }: { params: Promise<{ locale: string }> }) {
    const { locale } = await params;
    setRequestLocale(locale);
    const t = await getTranslations("smartResumePage");

    return (
        <main className="min-h-screen bg-brand-dark">
            <ProductHero
                badge={t("badge")}
                title={t("title")}
                subtitle={t("subtitle")}
                imageSrc="/images/smart-resume-hero.png"
                primaryCta={t("cta")}
                primaryCtaLink="/contact?interest=productize&subject=%E4%BA%A7%E5%93%81%E5%8C%96%E4%BA%A4%E4%BB%98%E5%90%88%E4%BD%9C%E5%92%A8%E8%AF%A2"
            />

            <section className="py-24 bg-white/5 text-center">
                <div className="max-w-4xl mx-auto px-6">
                    <h2 className="text-3xl font-bold text-white mb-12">{t("features.title")}</h2>
                    <div className="grid md:grid-cols-3 gap-8">
                        <div className="p-6 bg-brand-dark rounded-xl border border-white/10">
                            <FileText className="w-10 h-10 text-brand-accent mx-auto mb-4" />
                            <h3 className="text-xl font-semibold text-white mb-2">{t("features.format")}</h3>
                            <p className="text-gray-400">{t("features.formatDesc")}</p>
                        </div>
                        <div className="p-6 bg-brand-dark rounded-xl border border-white/10">
                            <Sparkles className="w-10 h-10 text-brand-accent mx-auto mb-4" />
                            <h3 className="text-xl font-semibold text-white mb-2">{t("features.polish")}</h3>
                            <p className="text-gray-400">{t("features.polishDesc")}</p>
                        </div>
                        <div className="p-6 bg-brand-dark rounded-xl border border-white/10">
                            <TrendingUp className="w-10 h-10 text-brand-accent mx-auto mb-4" />
                            <h3 className="text-xl font-semibold text-white mb-2">{t("features.gap")}</h3>
                            <p className="text-gray-400">{t("features.gapDesc")}</p>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    );
}
