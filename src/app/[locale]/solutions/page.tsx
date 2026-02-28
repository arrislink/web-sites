"use client";

import Image from "next/image";
import { ArrowRight, Boxes, FileText, LineChart, Workflow } from "lucide-react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { motion } from "framer-motion";

const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.1
        }
    }
};

const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
};

export default function SolutionsPage() {
    const t = useTranslations("solutionsNew");

    return (
        <div className="relative min-h-screen pb-24 pt-12 bg-grid">
            <div className="absolute inset-0 z-0 pointer-events-none">
                <Image
                    src="/images/tech-hero.png"
                    alt="Background"
                    fill
                    className="object-cover opacity-[0.07]"
                />
            </div>
            <div className="absolute top-0 right-0 w-[600px] h-[600px] ambient-glow -translate-y-1/2 translate-x-1/4 opacity-10" />
            
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <motion.div 
                    className="text-center mb-20"
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 tracking-tight">
                        {t("title")}
                    </h1>
                    <p className="text-xl text-gray-400 max-w-3xl mx-auto leading-relaxed">
                        {t("subtitle")}
                    </p>
                </motion.div>

                <motion.div
                    className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12"
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                >
                    {[
                        { icon: FileText, k: "content" },
                        { icon: Workflow, k: "productize" },
                        { icon: LineChart, k: "system" }
                    ].map((item) => (
                        <motion.div
                            key={item.k}
                            variants={itemVariants}
                            className="glass-card p-10 rounded-[2.5rem] border border-white/10 hover:border-brand-accent/30 transition-all duration-500"
                        >
                            <div className="h-16 w-16 rounded-2xl bg-brand-accent/10 flex items-center justify-center text-brand-accent mb-8">
                                <item.icon className="h-8 w-8" />
                            </div>
                            <h2 className="text-2xl font-bold text-white mb-4">{t(`capabilities.${item.k}.title`)}</h2>
                            <p className="text-gray-400 leading-relaxed mb-6">{t(`capabilities.${item.k}.desc`)}</p>
                            <ul className="space-y-3 text-gray-300 text-sm">
                                {[0, 1, 2].map((i) => (
                                    <li key={i} className="leading-relaxed">
                                        {t(`capabilities.${item.k}.bullets.${i}`)}
                                    </li>
                                ))}
                            </ul>
                        </motion.div>
                    ))}
                </motion.div>

                <motion.section
                    className="mt-20 glass-card rounded-[2.5rem] p-12 border border-white/10 overflow-hidden relative"
                    initial={{ opacity: 0, scale: 0.98 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                >
                    <div className="absolute top-0 right-0 w-[520px] h-[520px] bg-brand-accent/5 blur-[120px] rounded-full -translate-y-1/2 translate-x-1/3" />
                    <div className="relative z-10">
                        <div className="inline-flex items-center gap-2 text-brand-accent text-sm font-bold mb-6 uppercase tracking-widest">
                            <Boxes className="h-4 w-4" />
                            {t("models.badge")}
                        </div>
                        <h3 className="text-3xl font-bold text-white mb-4">{t("models.title")}</h3>
                        <p className="text-gray-400 text-lg mb-12 max-w-3xl">{t("models.subtitle")}</p>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            {["a", "b", "c"].map((k) => (
                                <div
                                    key={k}
                                    className="bg-white/5 p-8 rounded-3xl border border-white/5 hover:bg-white/10 transition-colors"
                                >
                                    <div className="text-white font-bold text-xl mb-3">{t(`models.${k}.title`)}</div>
                                    <div className="text-gray-400 leading-relaxed">{t(`models.${k}.desc`)}</div>
                                </div>
                            ))}
                        </div>

                        <div className="mt-12 flex flex-col sm:flex-row gap-6">
                            <Link
                                href="/contact?interest=general&subject=%E5%90%88%E4%BD%9C%E5%92%A8%E8%AF%A2"
                                className="inline-flex items-center justify-center bg-brand-accent text-brand-dark px-10 py-4 rounded-full font-bold hover:scale-105 transition-transform"
                            >
                                {t("models.ctaPrimary")}
                                <ArrowRight className="h-5 w-5 ml-2" />
                            </Link>
                            <Link
                                href="/case-studies"
                                className="inline-flex items-center justify-center bg-white/10 hover:bg-white/20 text-white border border-white/10 px-10 py-4 rounded-full font-bold transition-all"
                            >
                                {t("models.ctaSecondary")}
                            </Link>
                        </div>
                    </div>
                </motion.section>
            </div>
        </div>
    );
}
