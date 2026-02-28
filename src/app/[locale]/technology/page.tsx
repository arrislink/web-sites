import { ProductHero } from "@/components/sections/ProductHero";
import { TechStack } from "@/components/sections/TechStack";
import { Roadmap } from "@/components/sections/Roadmap";
import { setRequestLocale, getTranslations } from 'next-intl/server';

export default async function TechnologyPage({ params }: { params: Promise<{ locale: string }> }) {
    const { locale } = await params;
    setRequestLocale(locale);
    const t = await getTranslations("technologyPage");

    return (
        <main className="min-h-screen bg-brand-dark">
            <ProductHero
                badge={t("badge")}
                title={t("title")}
                subtitle={t("subtitle")}
                imageSrc="/images/tech-hero.png"
                primaryCta={t("cta")}
                primaryCtaLink="#"
            />

            <TechStack />
            <Roadmap />
        </main>
    );
}
