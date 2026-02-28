import { ProductHero } from "@/components/sections/ProductHero";
import { ShieldAlert, Database, Lock, Cpu } from "lucide-react";
import { setRequestLocale } from 'next-intl/server';
import { getTranslations } from 'next-intl/server';
import { Metadata } from "next";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
    const { locale } = await params;
    const tSolutions = await getTranslations({ locale, namespace: 'solutionItems.privateAI' });

    return {
        title: `${tSolutions('title')} | Arrislink`,
        description: tSolutions('description'),
        openGraph: {
            title: tSolutions('title'),
            description: tSolutions('description'),
            images: ['/images/private-ai-hero.png'],
        },
    };
}

export default async function PrivateAIPage({ params }: { params: Promise<{ locale: string }> }) {
    const { locale } = await params;
    setRequestLocale(locale);
    const t = await getTranslations("privateAIPage");
    const tSolutions = await getTranslations("solutionItems.privateAI"); // Re-use hero content from solution items

    return (
        <main className="min-h-screen bg-brand-dark">
            <ProductHero
                badge={t("badge")}
                title={tSolutions("title")}
                subtitle={tSolutions("description")}
                imageSrc="/images/private-ai-hero.png"
                primaryCta={t("cta")}
                primaryCtaLink="/contact?from=privateAI&subject=咨询私有化AI部署方案"
            />

            <section className="py-24 bg-white/5">
                <div className="max-w-[1920px] mx-auto px-4 sm:px-6 lg:px-12 xl:px-16">
                    <div className="grid lg:grid-cols-2 gap-12">
                        <div>
                            <h2 className="text-3xl font-bold text-white mb-6">{t("securityTitle")}</h2>
                            <p className="text-gray-400 mb-8 text-lg">
                                {t("securityDesc")}
                            </p>

                            <div className="grid sm:grid-cols-2 gap-6">
                                <div className="bg-brand-dark p-6 rounded-xl border border-white/10">
                                    <Lock className="w-8 h-8 text-brand-accent mb-4" />
                                    <h3 className="text-white font-semibold mb-2">{t("sovereigntyTitle")}</h3>
                                    <p className="text-sm text-gray-400">{t("sovereigntyDesc")}</p>
                                </div>
                                <div className="bg-brand-dark p-6 rounded-xl border border-white/10">
                                    <ShieldAlert className="w-8 h-8 text-brand-accent mb-4" />
                                    <h3 className="text-white font-semibold mb-2">{t("complianceTitle")}</h3>
                                    <p className="text-sm text-gray-400">{t("complianceDesc")}</p>
                                </div>
                            </div>
                        </div>
                        <div className="relative">
                            {/* Enhanced Architecture Diagram */}
                            <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl border border-white/10 p-8">
                                <div className="flex flex-col gap-4">
                                    {/* Row 1: Your Firewall */}
                                    <div className="flex items-center justify-center">
                                        <div className="inline-flex items-center gap-3 bg-red-500/10 px-6 py-3 rounded-xl border border-red-500/30">
                                            <ShieldAlert className="w-5 h-5 text-red-400" />
                                            <span className="text-red-300 font-mono text-sm">{t("diagramFirewall")}</span>
                                        </div>
                                    </div>

                                    {/* Connector */}
                                    <div className="h-6 w-0.5 bg-gradient-to-b from-red-500/30 to-green-500/30 mx-auto" />

                                    {/* Row 2: Secure Intranet Zone */}
                                    <div className="bg-green-500/5 rounded-xl border border-green-500/20 p-6">
                                        <div className="text-center text-green-400 text-xs font-semibold uppercase tracking-wider mb-4">
                                            {t("diagramSecureZone")}
                                        </div>

                                        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                                            {/* Data Source */}
                                            <div className="inline-flex items-center gap-2 bg-black/40 px-4 py-2 rounded-lg border border-white/10">
                                                <Database className="w-4 h-4 text-brand-accent" />
                                                <span className="text-white font-mono text-sm">{t("diagramDataCenter")}</span>
                                            </div>

                                            {/* Arrow */}
                                            <div className="hidden sm:block text-gray-500">→</div>
                                            <div className="block sm:hidden h-4 w-0.5 bg-gray-500 mx-auto" />

                                            {/* Model Inference */}
                                            <div className="inline-flex items-center gap-2 bg-brand-accent/10 px-4 py-2 rounded-lg border border-brand-accent">
                                                <Cpu className="w-4 h-4 text-brand-accent" />
                                                <span className="text-white font-mono text-sm">{t("diagramInference")}</span>
                                            </div>

                                            {/* Arrow */}
                                            <div className="hidden sm:block text-gray-500">→</div>
                                            <div className="block sm:hidden h-4 w-0.5 bg-gray-500 mx-auto" />

                                            {/* API Output */}
                                            <div className="inline-flex items-center gap-2 bg-black/40 px-4 py-2 rounded-lg border border-white/10">
                                                <Lock className="w-4 h-4 text-green-400" />
                                                <span className="text-white font-mono text-sm">{t("diagramAPI")}</span>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Note */}
                                    <div className="text-center text-gray-500 text-xs mt-2">
                                        {t("diagramNote")}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="mt-16">
                        <h2 className="text-3xl font-bold text-white mb-4">{t("stageTitle")}</h2>
                        <p className="text-gray-400 mb-10 text-lg">{t("stageSubtitle")}</p>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            <div className="bg-brand-dark p-7 rounded-2xl border border-white/10">
                                <div className="text-brand-accent font-semibold">{t("stage0.tag")}</div>
                                <div className="text-white font-bold text-xl mt-2">{t("stage0.title")}</div>
                                <div className="text-gray-400 mt-3 leading-relaxed">{t("stage0.desc")}</div>
                            </div>
                            <div className="bg-brand-dark p-7 rounded-2xl border border-white/10">
                                <div className="text-brand-accent font-semibold">{t("stage1.tag")}</div>
                                <div className="text-white font-bold text-xl mt-2">{t("stage1.title")}</div>
                                <div className="text-gray-400 mt-3 leading-relaxed">{t("stage1.desc")}</div>
                            </div>
                            <div className="bg-brand-dark p-7 rounded-2xl border border-white/10">
                                <div className="text-brand-accent font-semibold">{t("stage2.tag")}</div>
                                <div className="text-white font-bold text-xl mt-2">{t("stage2.title")}</div>
                                <div className="text-gray-400 mt-3 leading-relaxed">{t("stage2.desc")}</div>
                            </div>
                        </div>
                    </div>

                    <div className="mt-16 grid grid-cols-1 lg:grid-cols-2 gap-8">
                        <div className="bg-brand-dark p-8 rounded-2xl border border-white/10">
                            <h3 className="text-white font-bold text-xl mb-4">{t("reliabilityTitle")}</h3>
                            <div className="space-y-3 text-gray-300">
                                <div className="flex items-start gap-3"><Lock className="w-5 h-5 text-brand-accent mt-0.5" />{t("reliability.b1")}</div>
                                <div className="flex items-start gap-3"><ShieldAlert className="w-5 h-5 text-brand-accent mt-0.5" />{t("reliability.b2")}</div>
                                <div className="flex items-start gap-3"><Database className="w-5 h-5 text-brand-accent mt-0.5" />{t("reliability.b3")}</div>
                            </div>
                        </div>
                        <div className="bg-brand-dark p-8 rounded-2xl border border-white/10">
                            <h3 className="text-white font-bold text-xl mb-4">{t("boundaryTitle")}</h3>
                            <p className="text-gray-400 leading-relaxed">{t("boundaryDesc")}</p>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    );
}
