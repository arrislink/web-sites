"use client";

import { useTranslations } from "next-intl";
import Image from "next/image";
import { motion } from "framer-motion";

export function QuickFacts() {
    const t = useTranslations("about");

    const stats = [
        { label: t("stats.efficiency"), value: "50%", sub: t("stats.efficiencyDesc") },
        { label: t("stats.privacy"), value: "100%", sub: t("stats.privacyDesc") },
        { label: t("stats.uptime"), value: "99.9%", sub: t("stats.uptimeDesc") },
    ];

    return (
        <section className="py-20 lg:py-28 relative overflow-hidden">
            {/* Background Elements */}
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-brand-accent/5 blur-[100px] rounded-full pointer-events-none" />

            <div className="w-full max-w-[1920px] mx-auto px-4 sm:px-6 lg:px-12 xl:px-16 relative z-10">

                {/* Section Header */}
                <div className="text-center mb-16 lg:mb-24">
                    <h2 className="text-3xl lg:text-4xl xl:text-5xl font-bold text-white mb-6">
                        {t("fastFacts")}
                    </h2>
                    <p className="text-lg text-gray-400 max-w-2xl mx-auto">
                        {t("fastFactsSubtitle")}
                    </p>
                </div>

                <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">

                    {/* Left: Tech Stack Visual */}
                    <div className="relative group">
                        <div className="absolute inset-0 bg-brand-accent/10 blur-xl rounded-full transform group-hover:scale-105 transition-transform duration-700" />
                        <div className="relative h-[300px] sm:h-[400px] w-full bg-white/5 border border-white/10 rounded-3xl overflow-hidden p-8 flex items-center justify-center">
                            <Image
                                src="/images/tech-stack-viz.png"
                                alt="Modern Tech Stack"
                                fill
                                sizes="(max-width: 1024px) 100vw, 50vw"
                                className="object-contain hover:scale-110 transition-transform duration-700"
                            />
                        </div>
                        <div className="mt-6">
                            <h3 className="text-2xl font-bold text-white mb-2">{t("techStack")}</h3>
                            <p className="text-gray-400">{t("techStackValue")}</p>
                        </div>
                    </div>

                    {/* Right: Data Impact Visual & Stats */}
                    <div className="space-y-12">
                        <div className="relative h-[300px] sm:h-[400px] w-full bg-white/5 border border-white/10 rounded-3xl overflow-hidden mb-12">
                            <Image
                                src="/images/data-impact-viz.png"
                                alt="Data Impact"
                                fill
                                sizes="(max-width: 1024px) 100vw, 50vw"
                                className="object-cover opacity-80 hover:opacity-100 transition-opacity duration-500"
                            />
                            <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/80 to-transparent">
                                <span className="text-brand-accent font-bold tracking-wider uppercase text-sm">{t("stats.growth")}</span>
                            </div>
                        </div>

                        <div className="grid grid-cols-3 gap-4 sm:gap-8">
                            {stats.map((stat, index) => (
                                <div key={index} className="text-center p-4 rounded-2xl bg-white/5 border border-white/5">
                                    <div className="text-3xl sm:text-4xl font-bold text-white mb-1 bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400">
                                        {stat.value}
                                    </div>
                                    <div className="text-sm font-semibold text-brand-accent mb-1">{stat.label}</div>
                                    <div className="text-xs text-gray-500">{stat.sub}</div>
                                </div>
                            ))}
                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
}
