import { ProductHero } from "@/components/sections/ProductHero";
import { Sparkles, Palette, Rocket, Wand2 } from "lucide-react";
import { setRequestLocale, getTranslations } from 'next-intl/server';
import Image from "next/image";
import { KidStoryInteractive } from "@/components/products/KidStoryInteractive";
import { PageDecorations } from "@/components/layout/PageDecorations";
import { AnimatedContainer } from "@/components/layout/ClientMotion";
import { Metadata } from "next";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
    const { locale } = await params;
    const t = await getTranslations({ locale, namespace: 'kidStoryPage' });

    return {
        title: `${t('hero.title')} | Arrislink`,
        description: t('hero.subtitle'),
        openGraph: {
            title: t('hero.title'),
            description: t('hero.subtitle'),
            images: [`/images/kid-story-hero-${locale}.png`],
        },
    };
}

export default async function KidStoryPage({ params }: { params: Promise<{ locale: string }> }) {
    const { locale } = await params;
    setRequestLocale(locale);
    const t = await getTranslations("kidStoryPage");

    return (
        <main className="min-h-screen bg-brand-dark overflow-hidden relative">
            <PageDecorations />

            <ProductHero
                badge={t("hero.badge")}
                title={t("hero.title")}
                subtitle={t("hero.subtitle")}
                imageSrc={`/images/kid-story-hero-${locale}.png`}
                primaryCta={t("hero.cta1")}
                primaryCtaLink="/contact?interest=contentUpgrade&subject=%E5%86%85%E5%AE%B9%E8%B5%84%E4%BA%A7%E5%8D%87%E7%BA%A7%E5%90%88%E4%BD%9C%E5%92%A8%E8%AF%A2"
                secondaryCta={t("hero.cta2")}
                secondaryCtaLink="/case-studies"
            />

            {/* Steps */}
            <section className="py-32 relative">
                <div className="max-w-[1920px] mx-auto px-4 sm:px-6 lg:px-12 xl:px-16 relative z-10">
                    <AnimatedContainer 
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-center mb-20"
                    >
                        <h2 className="text-5xl md:text-7xl font-black text-white mb-6 tracking-tight" style={{ fontFamily: 'var(--font-serif-en)' }}>
                            {t("steps.title")}
                        </h2>
                        <p className="text-xl text-gray-400 max-w-2xl mx-auto font-medium">{t("steps.subtitle")}</p>
                    </AnimatedContainer>

                    <div className="grid md:grid-cols-3 gap-12 text-center">
                        {[
                            { icon: Sparkles, color: "bg-pink-500", text: "step1", delay: 0 },
                            { icon: Palette, color: "bg-blue-500", text: "step2", delay: 0.2 },
                            { icon: Rocket, color: "bg-yellow-500", text: "step3", delay: 0.4 }
                        ].map((step, idx) => (
                            <AnimatedContainer 
                                key={idx}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: step.delay }}
                                className="group p-10 rounded-3xl bg-white/5 border border-white/10 hover:bg-white/10 transition-all duration-500 hover:-translate-y-2"
                            >
                                <div className={`h-20 w-20 mx-auto ${step.color}/20 rounded-2xl flex items-center justify-center ${step.color.replace('bg-', 'text-').replace('-500', '-400')} mb-8 group-hover:scale-110 transition-transform duration-500 shadow-lg`}>
                                    <step.icon className="h-10 w-10" />
                                </div>
                                <h3 className="text-2xl font-black text-white mb-4">{t(`steps.${step.text}Title`)}</h3>
                                <p className="text-gray-400 text-lg leading-relaxed">{t(`steps.${step.text}Desc`)}</p>
                            </AnimatedContainer>
                        ))}
                    </div>
                </div>
                
                {/* Section Glow */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-brand-accent/5 blur-[120px] pointer-events-none rounded-full" />
            </section>

            {/* Combined Interactive Section */}
            <KidStoryInteractive />

            {/* User Stories / Case Studies */}
            <section className="py-32 relative bg-brand-dark">
                <div className="max-w-[1920px] mx-auto px-4 sm:px-6 lg:px-12 xl:px-16 relative z-10">
                    <AnimatedContainer 
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-center mb-20"
                    >
                        <h2 className="text-5xl md:text-7xl font-black text-white mb-6 tracking-tight" style={{ fontFamily: 'var(--font-serif-en)' }}>
                            {t("userStories.title")}
                        </h2>
                        <p className="text-xl text-gray-400 max-w-2xl mx-auto font-medium">{t("userStories.subtitle")}</p>
                    </AnimatedContainer>

                    <div className="grid md:grid-cols-2 gap-16 max-w-6xl mx-auto">
                        {[
                            { img: "/images/kid-story-case-cn-1.png", text: "story1", avatar: "M", color: "orange" },
                            { img: "/images/kid-story-case-cn-2.png", text: "story2", avatar: "D", color: "blue" }
                        ].map((story, idx) => (
                            <AnimatedContainer 
                                key={idx}
                                initial={{ opacity: 0, scale: 0.95 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true }}
                                className="bg-white/5 rounded-[2.5rem] overflow-hidden border border-white/10 shadow-2xl hover:shadow-brand-accent/10 transition-all duration-500"
                            >
                                <div className="relative h-80 w-full overflow-hidden">
                                    <Image
                                        src={story.img}
                                        alt="Story illustration"
                                        fill
                                        className="object-cover transition-transform duration-700 hover:scale-105"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-brand-dark via-transparent to-transparent opacity-60" />
                                </div>
                                <div className="p-10">
                                    <h3 className="text-2xl font-black text-white mb-4">{t(`userStories.${story.text}.title`)}</h3>
                                    <p className="text-gray-400 italic mb-8 text-lg leading-relaxed">
                                        "{t(`userStories.${story.text}.desc`)}"
                                    </p>
                                    <div className="flex items-center gap-4">
                                        <div className={`w-12 h-12 rounded-full bg-${story.color}-500/20 flex items-center justify-center text-${story.color}-400 font-black text-sm border border-${story.color}-500/30`}>
                                            {story.avatar}
                                        </div>
                                        <span className="text-lg font-bold text-gray-300">{t(`userStories.${story.text}.author`)}</span>
                                    </div>
                                </div>
                            </AnimatedContainer>
                        ))}
                    </div>
                </div>
            </section>
        </main>
    );
}
