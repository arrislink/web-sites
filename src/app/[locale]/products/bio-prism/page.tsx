import { ProductHero } from "@/components/sections/ProductHero";
import { Mic, BookHeart, Wand2, Download } from "lucide-react";
import { setRequestLocale, getTranslations } from 'next-intl/server';
import Image from "next/image";
import { BioPrismPreview } from "@/components/products/BioPrismPreview";

export default async function BioPrismPage({ params }: { params: Promise<{ locale: string }> }) {
    const { locale } = await params;
    setRequestLocale(locale);
    const t = await getTranslations("bioPrismPage");

    return (
        <main className="min-h-screen bg-brand-dark">
            <ProductHero
                badge={t("hero.badge")}
                title={t("hero.title")}
                subtitle={t("hero.subtitle")}
                imageSrc="/images/bio-prism-hero.png"
                primaryCta={t("hero.cta1")}
                primaryCtaLink="/contact?interest=contentUpgrade&subject=%E5%86%85%E5%AE%B9%E8%B5%84%E4%BA%A7%E5%8D%87%E7%BA%A7%E5%90%88%E4%BD%9C%E5%92%A8%E8%AF%A2"
                secondaryCta={t("hero.cta2")}
                secondaryCtaLink="/case-studies"
            />

            {/* Features / How it works */}
            <section className="py-24 bg-white/5">
                <div className="max-w-[1920px] mx-auto px-4 sm:px-6 lg:px-12 xl:px-16">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl font-bold text-white mb-4">{t("howItWorks.title")}</h2>
                        <p className="text-gray-400">{t("howItWorks.subtitle")}</p>
                    </div>

                    <div className="space-y-24">
                        {/* Step 1: Interview */}
                        <div className="flex flex-col md:flex-row items-center gap-12 lg:gap-24">
                            <div className="flex-1 space-y-6">
                                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-brand-accent/10 text-brand-accent border border-brand-accent/20">
                                    <Mic className="w-4 h-4" />
                                    <span className="text-sm font-semibold">{t("howItWorks.step1Title")}</span>
                                </div>
                                <h3 className="text-3xl font-bold text-white">
                                    {t("howItWorks.step1Title")}
                                </h3>
                                <p className="text-lg text-gray-400 leading-relaxed">
                                    {t("howItWorks.step1Desc")}
                                </p>
                            </div>
                            <div className="flex-1 relative">
                                <div className="absolute inset-0 bg-brand-accent/20 blur-3xl rounded-full opacity-20" />
                                <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-white/10">
                                    <Image
                                        src="/images/bio-prism-chat-ui.png"
                                        alt="AI Interview Interface"
                                        width={600}
                                        height={400}
                                        className="w-full h-auto"
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Step 2: Timeline (Reversed) */}
                        <div className="flex flex-col md:flex-row-reverse items-center gap-12 lg:gap-24">
                            <div className="flex-1 space-y-6">
                                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-purple-500/10 text-purple-400 border border-purple-500/20">
                                    <Wand2 className="w-4 h-4" />
                                    <span className="text-sm font-semibold">{t("howItWorks.step2Title")}</span>
                                </div>
                                <h3 className="text-3xl font-bold text-white">
                                    {t("howItWorks.step2Title")}
                                </h3>
                                <p className="text-lg text-gray-400 leading-relaxed">
                                    {t("howItWorks.step2Desc")}
                                </p>
                            </div>
                            <div className="flex-1 relative">
                                <div className="absolute inset-0 bg-purple-500/20 blur-3xl rounded-full opacity-20" />
                                <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-white/10">
                                    <Image
                                        src="/images/bio-prism-timeline-ui.png"
                                        alt="Timeline View"
                                        width={600}
                                        height={400}
                                        className="w-full h-auto"
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Step 3: Book (Standard) */}
                        <div className="flex flex-col md:flex-row items-center gap-12 lg:gap-24">
                            <div className="flex-1 space-y-6">
                                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                                    <BookHeart className="w-4 h-4" />
                                    <span className="text-sm font-semibold">{t("howItWorks.step3Title")}</span>
                                </div>
                                <h3 className="text-3xl font-bold text-white">
                                    {t("howItWorks.step3Title")}
                                </h3>
                                <p className="text-lg text-gray-400 leading-relaxed">
                                    {t("howItWorks.step3Desc")}
                                </p>
                            </div>
                            <div className="flex-1 relative">
                                <div className="absolute inset-0 bg-emerald-500/20 blur-3xl rounded-full opacity-20" />
                                <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-white/10">
                                    <Image
                                        src="/images/bio-prism-book-cover.png"
                                        alt="Digital Book"
                                        width={600}
                                        height={400}
                                        className="w-full h-auto"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Showcase / Sample */}
            <section className="py-24">
                <div className="max-w-[1920px] mx-auto px-4 sm:px-6 lg:px-12 xl:px-16">
                    <div className="grid lg:grid-cols-2 gap-16 items-center">
                        <div className="order-2 lg:order-1">
                            <div className="relative h-[600px] w-full rounded-xl overflow-hidden shadow-2xl border border-white/10 bg-gray-900">
                                {/* Interactive Preview */}
                                <div className="absolute inset-0 bg-[#f8f5f2]">
                                    <BioPrismPreview />
                                </div>
                            </div>
                        </div>
                        <div className="order-1 lg:order-2">
                            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">{t("showcase.title")}</h2>
                            <p className="text-lg text-gray-400 mb-8">
                                {t("showcase.desc")}
                            </p>
                            <ul className="space-y-4 mb-10">
                                <li className="flex items-center gap-3 text-gray-300">
                                    <span className="w-6 h-6 rounded-full bg-brand-accent/20 flex items-center justify-center text-brand-accent text-sm">✓</span>
                                    {t("showcase.feature1")}
                                </li>
                                <li className="flex items-center gap-3 text-gray-300">
                                    <span className="w-6 h-6 rounded-full bg-brand-accent/20 flex items-center justify-center text-brand-accent text-sm">✓</span>
                                    {t("showcase.feature2")}
                                </li>
                                <li className="flex items-center gap-3 text-gray-300">
                                    <span className="w-6 h-6 rounded-full bg-brand-accent/20 flex items-center justify-center text-brand-accent text-sm">✓</span>
                                    {t("showcase.feature3")}
                                </li>
                            </ul>

                            <a href="/contact" className="inline-flex items-center gap-2 text-brand-accent font-semibold hover:gap-3 transition-all">
                                <Download className="w-5 h-5" />
                                {t("showcase.cta")}
                            </a>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    );
}
