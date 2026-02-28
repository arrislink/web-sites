"use client";

import { Calendar, Code2, Rocket, FileText, Workflow, LineChart } from "lucide-react";
import { useTranslations } from "next-intl";
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

export default function AboutPage() {
    const t = useTranslations("about");

    return (
        <div className="relative min-h-screen pb-24 pt-12 bg-grid">
            <div className="absolute top-0 left-1/4 w-[500px] h-[500px] ambient-glow -translate-x-1/2 -translate-y-1/2" />
            <div className="absolute bottom-0 right-1/4 w-[600px] h-[600px] ambient-glow translate-x-1/2 translate-y-1/2 opacity-10" />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <motion.div 
                    className="text-center mb-16"
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    variants={containerVariants}
                >
                    <motion.h1 variants={itemVariants} className="text-4xl md:text-6xl font-bold text-white mb-6 tracking-tight">
                        {t("title")}
                    </motion.h1>
                    <motion.p variants={itemVariants} className="text-xl text-gray-400 max-w-3xl mx-auto leading-relaxed">
                        {t("subtitle")}
                    </motion.p>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center mb-24">
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                    >
                        <h2 className="text-3xl font-bold text-white mb-8 border-l-4 border-brand-accent pl-6">
                            {t("missionTitle")}
                        </h2>
                        <div className="space-y-6">
                            <p className="text-gray-300 text-lg leading-relaxed">
                                {t("missionP1")}
                            </p>
                            <p className="text-gray-300 text-lg leading-relaxed">
                                {t("missionP2")}
                            </p>
                        </div>
                    </motion.div>

                    <motion.div
                        className="glass-card p-10 rounded-3xl shimmer-border"
                        initial={{ opacity: 0, x: 30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                    >
                        <h3 className="text-2xl font-bold text-white mb-2">{t("fastFacts")}</h3>
                        <p className="text-gray-400 text-sm mb-8">{t("fastFactsSubtitle")}</p>
                        <ul className="space-y-6">
                            {[
                                { icon: Calendar, label: t("founded"), value: t("foundedValue") },
                                { icon: Rocket, label: t("focus"), value: t("focusValue") },
                                { icon: Code2, label: t("techStack"), value: t("techStackValue") }
                            ].map((fact, i) => (
                                <li key={i} className="flex items-center gap-6 group">
                                    <div className="h-12 w-12 rounded-xl bg-brand-accent/10 flex items-center justify-center text-brand-accent group-hover:scale-110 transition-transform">
                                        <fact.icon className="h-6 w-6" />
                                    </div>
                                    <div>
                                        <span className="block text-gray-500 text-xs uppercase tracking-widest mb-1">{fact.label}</span>
                                        <span className="text-white font-semibold text-lg">{fact.value}</span>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </motion.div>
                </div>

                <motion.div
                    className="mb-24"
                    initial={{ opacity: 0, y: 24 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                >
                    <div className="text-center mb-14">
                        <h2 className="text-3xl md:text-5xl font-black text-white mb-6 tracking-tight">
                            {t("boundary.title")}
                        </h2>
                        <p className="text-lg md:text-xl text-gray-400 max-w-3xl mx-auto leading-relaxed">
                            {t("boundary.subtitle")}
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
                        {[
                            { icon: FileText, k: "content" },
                            { icon: Workflow, k: "productize" },
                            { icon: LineChart, k: "system" }
                        ].map((item) => (
                            <div
                                key={item.k}
                                className="glass-card p-10 rounded-[2.5rem] border border-white/10 hover:border-brand-accent/30 transition-all duration-500"
                            >
                                <div className="h-16 w-16 rounded-2xl bg-brand-accent/10 flex items-center justify-center text-brand-accent mb-8">
                                    <item.icon className="h-8 w-8" />
                                </div>
                                <h3 className="text-2xl font-bold text-white mb-4">{t(`boundary.${item.k}.title`)}</h3>
                                <p className="text-gray-400 leading-relaxed">{t(`boundary.${item.k}.desc`)}</p>
                            </div>
                        ))}
                    </div>

                    <div className="mt-12 flex flex-wrap items-center justify-center gap-3">
                        {[0, 1, 2, 3].map((i) => (
                            <span
                                key={i}
                                className="bg-white/5 border border-white/10 text-gray-200 px-4 py-2 rounded-full font-semibold"
                            >
                                {t(`principles.items.${i}`)}
                            </span>
                        ))}
                    </div>
                </motion.div>

                <motion.div 
                    className="grid grid-cols-2 md:grid-cols-4 gap-8 py-16 border-t border-white/10"
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    variants={containerVariants}
                >
                    {[
                        { key: "founded", label: "foundedLabel", desc: "foundedDesc" },
                        { key: "aiPivot", label: "aiPivotLabel", desc: "aiPivotDesc" },
                        { key: "products", label: "productsLabel", desc: "productsDesc" },
                        { key: "privacy", label: "privacyLabel", desc: "privacyDesc" }
                    ].map((stat) => (
                        <motion.div key={stat.key} variants={itemVariants} className="text-center group">
                            <div className="text-4xl md:text-5xl font-black text-white mb-3 group-hover:text-brand-accent transition-colors">
                                {t(`stats.${stat.key}`)}
                            </div>
                            <div className="text-white font-bold text-sm tracking-wide mb-1">{t(`stats.${stat.label}`)}</div>
                            <div className="text-xs text-gray-500 leading-tight px-4">{t(`stats.${stat.desc}`)}</div>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </div>
    );
}
