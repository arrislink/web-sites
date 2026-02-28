"use client";

import { ArrowRight, Sparkles, Server, Shield, BookOpen, HeadphonesIcon } from "lucide-react";
import { motion } from "framer-motion";
import { useTranslations, useLocale } from "next-intl";
import { Link } from "@/i18n/navigation";

import Image from "next/image"; // Added import

export function Hero() {
    const t = useTranslations("hero");
    const locale = useLocale();

    // Feature highlights with icons - more flexible than hard numbers for startups
    const features = [
        { icon: Server, label: t("stats.clients"), description: t("stats.clientsDesc") },
        { icon: Shield, label: t("stats.privacy"), description: t("stats.privacyDesc") },
        { icon: BookOpen, label: t("stats.stories"), description: t("stats.storiesDesc") },
        { icon: HeadphonesIcon, label: t("stats.support"), description: t("stats.supportDesc") },
    ];

    return (

        <section className="relative overflow-hidden pt-24 pb-16 2xl:pt-32 2xl:pb-28">
            {/* Background Image & Outlook */}
            <div className="absolute inset-0 z-0">
                <Image
                    src="/images/hero-bg.png"
                    alt="Background"
                    fill
                    className="object-cover opacity-60 mix-blend-plus-lighter grayscale-[30%]"
                    priority
                />
                <div className="absolute inset-0 bg-gradient-to-b from-brand-dark/95 via-brand-dark/70 to-brand-dark/95" />
            </div>

            <div className="w-full max-w-[1920px] mx-auto px-4 sm:px-6 lg:px-12 xl:px-16 relative z-10">
                <div className="grid 2xl:grid-cols-2 gap-12 items-center">
                    {/* Left Content */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        className="text-center 2xl:text-left"
                    >
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-brand-accent text-sm font-medium mb-8">
                            <span className="flex h-2 w-2 rounded-full bg-brand-accent animate-pulse"></span>
                            {t("badge")}
                        </div>

                        <h1 className="text-3xl xs:text-4xl sm:text-5xl lg:text-6xl 2xl:text-5xl min-[1800px]:text-7xl font-bold tracking-tight text-white mb-6 leading-tight">
                            {t("title")}
                        </h1>

                        <p className="text-lg lg:text-xl text-gray-300 max-w-xl mb-10 leading-relaxed mx-auto 2xl:mx-0">
                            {t("subtitle")}
                        </p>

                        <div className="flex flex-col sm:flex-row gap-4 justify-center 2xl:justify-start">
                            <Link
                                href="/solutions"
                                className="inline-flex items-center justify-center gap-2 bg-brand-accent text-brand-dark px-8 py-4 rounded-full text-lg font-semibold hover:bg-brand-accent/90 transition-all hover:scale-105"
                            >
                                {t("cta1")}
                                <ArrowRight className="w-5 h-5" />
                            </Link>
                            <Link
                                href="/products"
                                className="inline-flex items-center justify-center gap-2 bg-white/10 text-white border border-white/20 px-8 py-4 rounded-full text-lg font-semibold hover:bg-white/20 transition-all hover:scale-105"
                            >
                                <Sparkles className="w-5 h-5" />
                                {t("cta2")}
                            </Link>
                        </div>
                    </motion.div>

                    {/* Right Features - Icon-based highlights instead of numbers */}
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="hidden 2xl:grid grid-cols-2 gap-6"
                    >
                        {features.map((feature, i) => (
                            <div key={i} className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 hover:bg-white/10 transition-colors group">
                                <div className="h-12 w-12 bg-brand-accent/10 rounded-xl flex items-center justify-center text-brand-accent mb-4 group-hover:scale-110 transition-transform">
                                    <feature.icon className="h-6 w-6" />
                                </div>
                                <h3 className="text-lg font-semibold text-white mb-2">{feature.label}</h3>
                                <p className="text-sm text-gray-400 leading-relaxed">{feature.description}</p>
                            </div>
                        ))}
                    </motion.div>
                </div>

                {/* Mobile Features */}
                <div className="mt-16 pt-8 border-t border-white/5 grid grid-cols-2 md:grid-cols-4 gap-6 2xl:hidden">
                    {features.map((feature, i) => (
                        <div key={i} className="text-center">
                            <div className="h-10 w-10 bg-brand-accent/10 rounded-lg flex items-center justify-center text-brand-accent mx-auto mb-3">
                                <feature.icon className="h-5 w-5" />
                            </div>
                            <span className="text-sm font-medium text-white block mb-1">{feature.label}</span>
                            <span className="text-xs text-gray-400">{feature.description}</span>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
