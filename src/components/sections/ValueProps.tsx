"use client";

import { Zap, MessageSquare, Shield } from "lucide-react";
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

export function ValueProps() {
    const t = useTranslations("valueProps");

    const features = [
        { icon: Zap, title: t("feature1.title"), description: t("feature1.description"), color: "text-yellow-400", bg: "bg-yellow-400/10" },
        { icon: MessageSquare, title: t("feature2.title"), description: t("feature2.description"), color: "text-brand-accent", bg: "bg-brand-accent/10" },
        { icon: Shield, title: t("feature3.title"), description: t("feature3.description"), color: "text-emerald-400", bg: "bg-emerald-400/10" },
    ];

    return (
        <section className="py-24 lg:py-32 bg-brand-dark relative overflow-hidden bg-grid">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
            
            <div className="w-full max-w-[1920px] mx-auto px-4 sm:px-6 lg:px-12 xl:px-16 relative z-10">
                <motion.div 
                    className="text-center mb-20"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                >
                    <h2 className="text-4xl lg:text-5xl xl:text-6xl font-black text-white mb-6 tracking-tight">{t("title")}</h2>
                    <p className="text-xl text-gray-400 max-w-3xl mx-auto leading-relaxed">{t("subtitle")}</p>
                </motion.div>

                <motion.div 
                    className="grid md:grid-cols-3 gap-8 lg:gap-12"
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                >
                    {features.map((feature, index) => (
                        <motion.div
                            key={index}
                            variants={itemVariants}
                            className="group glass-card p-10 rounded-[2.5rem] border border-white/10 hover:border-brand-accent/30 transition-all duration-500 relative overflow-hidden"
                        >
                            <div className={`absolute top-0 right-0 w-32 h-32 ${feature.bg} blur-3xl rounded-full -translate-y-1/2 translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity`} />
                            
                            <div className={`h-16 w-16 ${feature.bg} rounded-2xl flex items-center justify-center ${feature.color} mb-8 group-hover:scale-110 group-hover:rotate-3 transition-all duration-500`}>
                                <feature.icon className="h-8 w-8" />
                            </div>
                            <h3 className="text-2xl font-bold text-white mb-4 group-hover:text-brand-accent transition-colors">{feature.title}</h3>
                            <p className="text-gray-400 leading-relaxed text-lg">{feature.description}</p>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
}
