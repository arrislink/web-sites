import { ProductHero } from "@/components/sections/ProductHero";
import { FileText, Tag, Link2, MessageSquare, Bell } from "lucide-react";
import { setRequestLocale, getTranslations } from 'next-intl/server';
import { Link } from "@/i18n/navigation";

export default async function SmartReadPage({ params }: { params: Promise<{ locale: string }> }) {
    const { locale } = await params;
    setRequestLocale(locale);
    const t = await getTranslations("smartReadPage");

    const features = [
        { icon: FileText, title: t("features.collect.title"), desc: t("features.collect.desc"), color: "brand-accent" },
        { icon: Tag, title: t("features.summary.title"), desc: t("features.summary.desc"), color: "purple-400" },
        { icon: Link2, title: t("features.connect.title"), desc: t("features.connect.desc"), color: "green-400" },
        { icon: MessageSquare, title: t("features.chat.title"), desc: t("features.chat.desc"), color: "orange-400" },
    ];

    return (
        <main className="min-h-screen bg-brand-dark">
            <ProductHero
                badge={t("hero.badge")}
                title={t("hero.title")}
                subtitle={t("hero.subtitle")}
                imageSrc="/images/hero-bg.png"
                primaryCta={t("hero.cta1")}
                primaryCtaLink="/contact?interest=system&subject=%E6%95%B0%E6%8D%AE%E4%B8%8E%E7%B3%BB%E7%BB%9F%E9%97%AD%E7%8E%AF%E5%90%88%E4%BD%9C%E5%92%A8%E8%AF%A2"
                secondaryCta={t("hero.cta2")}
                secondaryCtaLink="#features"
            />

            {/* Features */}
            <section id="features" className="py-24 bg-white/5">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl font-bold text-white mb-4">{t("features.title")}</h2>
                        <p className="text-gray-400">{t("features.subtitle")}</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {features.map((feature, idx) => (
                            <div key={idx} className="bg-brand-primary border border-white/5 rounded-2xl p-8 hover:border-brand-accent/30 transition-colors">
                                <div className={`w-12 h-12 rounded-xl bg-${feature.color}/10 flex items-center justify-center mb-6`}>
                                    <feature.icon className={`w-6 h-6 text-${feature.color}`} />
                                </div>
                                <h3 className="text-xl font-bold text-white mb-3">{feature.title}</h3>
                                <p className="text-gray-400 leading-relaxed">{feature.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Status Section */}
            <section className="py-24">
                <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-yellow-500/10 text-yellow-400 border border-yellow-500/20 mb-6">
                        <Bell className="w-4 h-4" />
                        <span className="text-sm font-semibold">{t("status.badge")}</span>
                    </div>
                    <h2 className="text-3xl font-bold text-white mb-6">{t("status.title")}</h2>
                    <p className="text-lg text-gray-400 mb-8">{t("status.desc")}</p>
                    <Link
                        href="/contact?interest=system&subject=%E6%95%B0%E6%8D%AE%E4%B8%8E%E7%B3%BB%E7%BB%9F%E9%97%AD%E7%8E%AF%E5%90%88%E4%BD%9C%E5%92%A8%E8%AF%A2"
                        className="inline-flex items-center gap-2 bg-brand-accent text-brand-dark px-8 py-4 rounded-full font-semibold hover:bg-brand-accent/90 transition-colors"
                    >
                        {t("hero.cta1")}
                    </Link>
                </div>
            </section>
        </main>
    );
}
