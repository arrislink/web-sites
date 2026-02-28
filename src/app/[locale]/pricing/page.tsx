"use client";

import { ArrowRight, Check } from "lucide-react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";

export default function PricingPage() {
    const t = useTranslations("pricing");

    const engagementCards = [0, 1, 2].map((i) => ({
        title: t(`engagement.items.${i}.title`),
        desc: t(`engagement.items.${i}.desc`),
        bullets: [0, 1, 2].map((j) => t(`engagement.items.${i}.bullets.${j}`))
    }));

    return (
        <div className="pb-24 pt-12">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16">
                    <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">{t("title")}</h1>
                    <p className="text-xl text-gray-400 max-w-3xl mx-auto">
                        {t("subtitle")}
                    </p>
                    <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
                        <Link
                            href={t("ctaPrimaryHref")}
                            className="inline-flex items-center justify-center gap-2 bg-brand-accent text-brand-dark px-7 py-3 rounded-full font-semibold hover:bg-brand-accent/90 transition-colors"
                        >
                            {t("ctaPrimary")}
                            <ArrowRight className="h-4 w-4" />
                        </Link>
                        <Link
                            href="/products#modules"
                            className="inline-flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 text-white border border-white/10 px-7 py-3 rounded-full font-semibold transition-colors"
                        >
                            {t("ctaSecondary")}
                        </Link>
                    </div>
                    <div className="mt-4 text-xs text-gray-500">{t("note")}</div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    <div className="bg-white/5 border border-white/5 rounded-2xl p-8">
                        <h2 className="text-2xl font-bold text-white">{t("how.title")}</h2>
                        <p className="text-gray-400 mt-3">{t("how.subtitle")}</p>
                        <div className="mt-8 space-y-6">
                            {[0, 1, 2].map((i) => (
                                <div key={i} className="flex gap-4">
                                    <div className="h-10 w-10 rounded-xl bg-brand-accent/10 text-brand-accent flex items-center justify-center font-bold">
                                        {i + 1}
                                    </div>
                                    <div>
                                        <div className="text-white font-semibold">{t(`how.steps.${i}.title`)}</div>
                                        <div className="text-gray-400 mt-1">{t(`how.steps.${i}.desc`)}</div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="bg-white/5 border border-white/5 rounded-2xl p-8">
                        <h2 className="text-2xl font-bold text-white">{t("what.title")}</h2>
                        <p className="text-gray-400 mt-3">{t("what.subtitle")}</p>
                        <ul className="mt-8 space-y-4">
                            {[0, 1, 2, 3].map((i) => (
                                <li key={i} className="flex items-start gap-3">
                                    <Check className="h-5 w-5 text-brand-accent mt-0.5" />
                                    <div>
                                        <div className="text-white font-medium">{t(`what.items.${i}.title`)}</div>
                                        <div className="text-gray-400 mt-1">{t(`what.items.${i}.desc`)}</div>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

                <div className="mt-12">
                    <div className="text-center">
                        <h2 className="text-2xl font-bold text-white">{t("engagement.title")}</h2>
                        <p className="text-gray-400 mt-3">{t("engagement.subtitle")}</p>
                    </div>

                    <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-8">
                        {engagementCards.map((card) => (
                            <div key={card.title} className="bg-brand-primary border border-white/5 rounded-2xl p-8">
                                <h3 className="text-xl font-bold text-white">{card.title}</h3>
                                <p className="text-gray-400 mt-3">{card.desc}</p>
                                <ul className="mt-6 space-y-3">
                                    {card.bullets.map((b) => (
                                        <li key={b} className="text-sm text-gray-300 flex items-start gap-2">
                                            <span className="text-brand-accent mt-0.5">•</span>
                                            <span>{b}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="mt-12 bg-white/5 border border-white/5 rounded-2xl p-8">
                    <div className="text-center">
                        <h2 className="text-2xl font-bold text-white">{t("faq.title")}</h2>
                        <p className="text-gray-400 mt-3">{t("faq.subtitle")}</p>
                    </div>
                    <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-8">
                        {[0, 1, 2, 3].map((i) => (
                            <div key={i} className="bg-white/[0.03] border border-white/10 rounded-2xl p-6">
                                <div className="text-white font-semibold">{t(`faq.items.${i}.q`)}</div>
                                <div className="text-gray-400 mt-2 leading-relaxed">{t(`faq.items.${i}.a`)}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
