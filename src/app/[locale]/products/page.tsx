"use client";

import { ArrowRight } from "lucide-react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { OFFERS } from "@/data/offers";

export default function ProductsPage() {
    const t = useTranslations();
    const tPage = useTranslations("products");

    const flagship = OFFERS.find((o) => o.kind === "product" && o.segment === "module" && o.status === "flagship");
    const modules = OFFERS.filter((o) => o.kind === "product" && o.segment === "module" && o.id !== flagship?.id);
    const showcases = OFFERS.filter((o) => o.kind === "product" && o.segment === "showcase");
    const references = OFFERS.filter((o) => o.kind === "product" && o.segment === "reference");

    return (
        <div className="pb-24 pt-12">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16">
                    <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">{tPage("pageTitle")}</h1>
                    <p className="text-xl text-gray-400 max-w-3xl mx-auto">
                        {tPage("pageSubtitle")}
                    </p>
                </div>

                {flagship && (
                    <div className="bg-brand-primary border border-brand-accent/20 rounded-3xl overflow-hidden mb-12">
                        <div className="grid grid-cols-1 lg:grid-cols-2">
                            <div className="relative min-h-[280px] lg:min-h-[360px]">
                                <Image
                                    src={flagship.image || "/images/hero-bg.png"}
                                    alt={t(flagship.i18n.titleKey)}
                                    fill
                                    className="object-cover opacity-80"
                                />
                            </div>
                            <div className="p-10 flex flex-col justify-center">
                                <div className="inline-flex items-center gap-2 text-brand-accent text-sm font-semibold mb-4">
                                    <span className="h-2 w-2 rounded-full bg-brand-accent" />
                                    {flagship.i18n.badgeKey ? t(flagship.i18n.badgeKey) : tPage("featured")}
                                </div>
                                <h2 className="text-3xl sm:text-4xl font-bold text-white">
                                    {t(flagship.i18n.titleKey)}
                                </h2>
                                {flagship.i18n.subtitleKey && (
                                    <p className="text-brand-accent/80 mt-2">{t(flagship.i18n.subtitleKey)}</p>
                                )}
                                {flagship.i18n.descriptionKey && (
                                    <p className="text-gray-300 mt-5 leading-relaxed">{t(flagship.i18n.descriptionKey)}</p>
                                )}

                                <div className="mt-8 flex flex-col sm:flex-row gap-4">
                                    <Link
                                        href={flagship.href}
                                        className="inline-flex items-center justify-center gap-2 bg-brand-accent text-brand-dark px-6 py-3 rounded-full font-semibold hover:bg-brand-accent/90 transition-colors"
                                    >
                                        {tPage("learnMore")}
                                        <ArrowRight className="h-4 w-4" />
                                    </Link>
                                    <Link
                                        href="/contact?interest=general"
                                        className="inline-flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 text-white border border-white/10 px-6 py-3 rounded-full font-semibold transition-colors"
                                    >
                                        {tPage("contact")}
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                <div id="modules" className="mt-6 scroll-mt-28">
                    <div className="flex items-end justify-between gap-6 mb-6">
                        <div>
                            <h3 className="text-2xl font-bold text-white">{tPage("categories.modules")}</h3>
                            <p className="text-gray-400 mt-2">{tPage("modulesSubtitle")}</p>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {modules.map((o) => (
                            <div
                                key={o.id}
                                className="bg-brand-primary border border-white/5 rounded-2xl overflow-hidden hover:border-brand-accent/30 transition-colors group"
                            >
                                <div className="h-44 relative overflow-hidden">
                                    <Image
                                        src={o.image || "/images/hero-bg.png"}
                                        alt={t(o.i18n.titleKey)}
                                        fill
                                        className="object-cover group-hover:scale-105 transition-transform duration-300 opacity-90"
                                    />
                                    <div className="absolute top-4 left-4 right-4 flex justify-end items-start">
                                        {o.i18n.badgeKey && (
                                            <span className="bg-white/10 border border-white/10 text-white text-xs font-bold px-2 py-1 rounded">
                                                {t(o.i18n.badgeKey)}
                                            </span>
                                        )}
                                    </div>
                                </div>
                                <div className="p-7">
                                    <h4 className="text-xl font-bold text-white">{t(o.i18n.titleKey)}</h4>
                                    {o.i18n.subtitleKey && (
                                        <p className="text-sm text-brand-accent/80 mt-1">{t(o.i18n.subtitleKey)}</p>
                                    )}
                                    {o.i18n.descriptionKey && (
                                        <p className="text-gray-400 mt-4 leading-relaxed">{t(o.i18n.descriptionKey)}</p>
                                    )}
                                    <Link
                                        href={o.href}
                                        className="mt-6 block w-full text-center bg-white/10 hover:bg-white/20 text-white font-medium py-3 rounded-xl transition-colors"
                                    >
                                        {tPage("learnMore")}
                                    </Link>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {showcases.length > 0 && (
                    <div id="showcase" className="mt-20 border-t border-white/10 pt-16 scroll-mt-28">
                        <div className="mb-8">
                            <h3 className="text-2xl font-bold text-white">{tPage("categories.showcase")}</h3>
                            <p className="text-gray-400 mt-2">{tPage("showcaseSubtitle")}</p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {showcases.map((o) => (
                                <div
                                    key={o.id}
                                    className="bg-brand-primary border border-white/5 rounded-2xl overflow-hidden hover:border-white/20 transition-colors group"
                                >
                                    <div className="h-44 relative overflow-hidden">
                                        <Image
                                            src={o.image || "/images/hero-bg.png"}
                                            alt={t(o.i18n.titleKey)}
                                            fill
                                            className="object-cover group-hover:scale-105 transition-transform duration-300 opacity-80"
                                        />
                                        <div className="absolute top-4 left-4 right-4 flex justify-end items-start">
                                            {o.i18n.badgeKey && (
                                                <span className="bg-white/10 border border-white/10 text-white text-xs font-bold px-2 py-1 rounded">
                                                    {t(o.i18n.badgeKey)}
                                                </span>
                                            )}
                                        </div>
                                    </div>
                                    <div className="p-7">
                                        <h4 className="text-xl font-bold text-white">{t(o.i18n.titleKey)}</h4>
                                        {o.i18n.subtitleKey && (
                                            <p className="text-sm text-gray-400 mt-1">{t(o.i18n.subtitleKey)}</p>
                                        )}
                                        {o.i18n.descriptionKey && (
                                            <p className="text-gray-400 mt-4 leading-relaxed">{t(o.i18n.descriptionKey)}</p>
                                        )}
                                        <Link
                                            href={o.href}
                                            className="mt-6 block w-full text-center bg-white/10 hover:bg-white/20 text-white font-medium py-3 rounded-xl transition-colors"
                                        >
                                            {tPage("learnMore")}
                                        </Link>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {references.length > 0 && (
                    <div id="reference" className="mt-20 border-t border-white/10 pt-16 scroll-mt-28">
                        <div className="mb-8">
                            <h3 className="text-2xl font-bold text-white">{tPage("categories.reference")}</h3>
                            <p className="text-gray-400 mt-2">{tPage("referenceSubtitle")}</p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {references.map((o) => (
                                <div
                                    key={o.id}
                                    className="bg-brand-primary border border-white/5 rounded-2xl overflow-hidden hover:border-white/20 transition-colors group"
                                >
                                    <div className="h-44 relative overflow-hidden">
                                        <Image
                                            src={o.image || "/images/hero-bg.png"}
                                            alt={t(o.i18n.titleKey)}
                                            fill
                                            className="object-cover group-hover:scale-105 transition-transform duration-300 opacity-70"
                                        />
                                        <div className="absolute top-4 left-4 right-4 flex justify-end items-start">
                                            {o.i18n.badgeKey && (
                                                <span className="bg-white/10 border border-white/10 text-white text-xs font-bold px-2 py-1 rounded">
                                                    {t(o.i18n.badgeKey)}
                                                </span>
                                            )}
                                        </div>
                                    </div>
                                    <div className="p-7">
                                        <h4 className="text-xl font-bold text-white">{t(o.i18n.titleKey)}</h4>
                                        {o.i18n.subtitleKey && (
                                            <p className="text-sm text-gray-400 mt-1">{t(o.i18n.subtitleKey)}</p>
                                        )}
                                        {o.i18n.descriptionKey && (
                                            <p className="text-gray-400 mt-4 leading-relaxed">{t(o.i18n.descriptionKey)}</p>
                                        )}
                                        <Link
                                            href={o.href}
                                            className="mt-6 block w-full text-center bg-white/10 hover:bg-white/20 text-white font-medium py-3 rounded-xl transition-colors"
                                        >
                                            {tPage("learnMore")}
                                        </Link>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
