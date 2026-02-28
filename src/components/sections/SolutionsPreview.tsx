"use client";

import { ArrowRight } from "lucide-react";
import Image from "next/image";
import { useTranslations, useLocale } from "next-intl";
import { Link } from "@/i18n/navigation";

export function SolutionsPreview() {
    const t = useTranslations("solutions");
    const locale = useLocale();

    const solutions = [
        { image: "/images/private-ai-3d.png", title: t("privateAI.title"), description: t("privateAI.description") },
        { image: "/images/content-creation-3d.png", title: t("contentAutomation.title"), description: t("contentAutomation.description") },
        { image: "/images/smart-chat-3d.png", title: t("dataAnalytics.title"), description: t("dataAnalytics.description") },
    ];

    return (
        <section className="py-20 lg:py-28">
            <div className="w-full max-w-[1920px] mx-auto px-4 sm:px-6 lg:px-12 xl:px-16">
                <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between mb-16">
                    <div>
                        <h2 className="text-3xl lg:text-4xl xl:text-5xl font-bold text-white mb-4">{t("title")}</h2>
                        <p className="text-lg text-gray-400 max-w-xl">{t("subtitle")}</p>
                    </div>
                    <Link
                        href="/solutions"
                        className="mt-6 lg:mt-0 inline-flex items-center gap-2 text-brand-accent hover:underline font-medium"
                    >
                        {t("viewAll")}
                        <ArrowRight className="h-4 w-4" />
                    </Link>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10">
                    {solutions.map((solution, index) => (
                        <Link
                            key={index}
                            href="/solutions"
                            className="group relative bg-white/5 border border-white/10 rounded-2xl p-8 lg:p-10 hover:border-brand-accent/40 transition-all duration-300 overflow-hidden"
                        >
                            <div className="absolute top-0 right-0 w-40 h-40 bg-brand-accent/5 blur-3xl rounded-full pointer-events-none group-hover:bg-brand-accent/10 transition-colors" />

                            <div className="relative">
                                <div className="h-24 w-24 relative mb-6 group-hover:scale-110 transition-transform duration-300">
                                    <Image
                                        src={solution.image}
                                        alt={solution.title}
                                        fill
                                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                        className="object-contain drop-shadow-[0_0_15px_rgba(56,189,248,0.3)]"
                                    />
                                </div>
                                <h3 className="text-xl lg:text-2xl font-bold text-white mb-4">{solution.title}</h3>
                                <p className="text-gray-400 leading-relaxed mb-6">{solution.description}</p>
                                <span className="inline-flex items-center gap-2 text-brand-accent font-medium text-sm group-hover:gap-3 transition-all">
                                    {t("learnMore")}
                                    <ArrowRight className="h-4 w-4" />
                                </span>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </section>
    );
}
