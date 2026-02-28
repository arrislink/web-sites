import { ProductHero } from "@/components/sections/ProductHero";
import { setRequestLocale } from 'next-intl/server';
import { getTranslations } from 'next-intl/server';
import { Server, Zap, Code2 } from "lucide-react";
import { Metadata } from "next";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
    const { locale } = await params;
    const t = await getTranslations({ locale, namespace: 'devopsPage' });

    return {
        title: `${t('title')} | Arrislink`,
        description: t('subtitle'),
        openGraph: {
            title: t('title'),
            description: t('subtitle'),
            images: ['/images/devops-hero.png'],
        },
    };
}

/**
 * DevOpsPage - DevOps 与云原生代管
 * 业务分类：企业级解决方案 (Enterprise Solution)
 * 技术基石：K8s 集群管理、CI/CD 流水线、基础设施即代码 (IaC)
 */
export default async function DevOpsPage({ params }: { params: Promise<{ locale: string }> }) {
    const { locale } = await params;
    setRequestLocale(locale);
    const t = await getTranslations("devopsPage");

    return (
        <main className="min-h-screen bg-brand-dark">
            <ProductHero
                badge={t("badge")}
                title={t("title")}
                subtitle={t("subtitle")}
                imageSrc="/images/devops-hero.png"
                primaryCta={t("cta")}
                primaryCtaLink="/contact?from=devops&subject=K8s与云原生咨询"
            />
            <section className="py-24 text-center text-white bg-white/5">
                <div className="max-w-6xl mx-auto px-6">
                    <div className="grid md:grid-cols-3 gap-8">
                        <div className="p-8 bg-brand-dark rounded-xl border border-white/10">
                            <Server className="w-10 h-10 text-brand-accent mx-auto mb-6" />
                            <h3 className="text-xl font-bold mb-3">{t("features.k8sTitle")}</h3>
                            <p className="text-gray-400">{t("features.k8sDesc")}</p>
                        </div>
                        <div className="p-8 bg-brand-dark rounded-xl border border-white/10">
                            <Zap className="w-10 h-10 text-brand-accent mx-auto mb-6" />
                            <h3 className="text-xl font-bold mb-3">{t("features.cicdTitle")}</h3>
                            <p className="text-gray-400">{t("features.cicdDesc")}</p>
                        </div>
                        <div className="p-8 bg-brand-dark rounded-xl border border-white/10">
                            <Code2 className="w-10 h-10 text-brand-accent mx-auto mb-6" />
                            <h3 className="text-xl font-bold mb-3">{t("features.iacTitle")}</h3>
                            <p className="text-gray-400">{t("features.iacDesc")}</p>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    );
}
