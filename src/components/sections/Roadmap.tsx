"use client";

import { useTranslations } from "next-intl";

export function Roadmap() {
    const t = useTranslations("roadmap");

    const phases = [
        {
            title: t("phase1.title"),
            subtitle: t("phase1.subtitle"),
            year: t("phase1.year"),
            description: t("phase1.desc"),
            items: t.raw("phase1.items") as string[]
        },
        {
            title: t("phase2.title"),
            subtitle: t("phase2.subtitle"),
            year: t("phase2.year"),
            description: t("phase2.desc"),
            items: t.raw("phase2.items") as string[]
        },
        {
            title: t("phase3.title"),
            subtitle: t("phase3.subtitle"),
            year: t("phase3.year"),
            description: t("phase3.desc"),
            items: t.raw("phase3.items") as string[]
        }
    ];

    return (
        <section className="py-24 bg-brand-dark relative">
            <div className="absolute top-0 left-0 w-full h-[500px] bg-gradient-to-b from-brand-accent/5 to-transparent pointer-events-none" />

            <div className="max-w-[1920px] mx-auto px-4 sm:px-6 lg:px-12 xl:px-16 relative z-10">
                <div className="text-center mb-16">
                    <h2 className="text-3xl font-bold text-white mb-4">{t("title")}</h2>
                    <p className="text-gray-400">{t("subtitle")}</p>
                </div>

                <div className="relative">
                    {/* Line */}
                    <div className="hidden lg:block absolute top-[50%] left-0 w-full h-1 bg-white/10 -translate-y-1/2 rounded-full" />

                    <div className="grid lg:grid-cols-3 gap-12">
                        {phases.map((phase, i) => (
                            <div key={i} className="relative pt-12 lg:pt-0">
                                {/* Dot on timeline (Desktop) */}
                                <div className="hidden lg:block absolute top-[50%] left-1/2 w-8 h-8 bg-brand-dark border-4 border-brand-accent rounded-full -translate-x-1/2 -translate-y-1/2 z-10 shadow-[0_0_15px_rgba(56,189,248,0.5)]" />

                                {/* Content Card */}
                                <div className={`glass-card p-8 rounded-2xl border border-white/10 relative hover:border-brand-accent/30 transition-all ${i % 2 === 0 ? "lg:mb-32" : "lg:mt-32"}`}>
                                    <div className="text-brand-accent text-sm font-bold uppercase tracking-wider mb-2">{phase.subtitle}</div>
                                    <div className="text-2xl font-bold text-white mb-1">{phase.year}</div>
                                    <h3 className="text-xl font-semibold text-white mb-4">{phase.title}</h3>
                                    <p className="text-gray-400 text-sm mb-6 leading-relaxed">
                                        {phase.description}
                                    </p>
                                    <ul className="space-y-2">
                                        {phase.items.map((item, idx) => (
                                            <li key={idx} className="flex items-center gap-2 text-sm text-gray-300">
                                                <span className="w-1.5 h-1.5 rounded-full bg-brand-accent" />
                                                {item}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
