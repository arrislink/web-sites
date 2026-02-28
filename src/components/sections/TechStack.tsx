"use client";

import { Terminal, Database, Cloud, Code, Smartphone } from "lucide-react";
import { useTranslations } from "next-intl";
import { motion } from "framer-motion";

export function TechStack() {
    const t = useTranslations("techStack");

    const stack = [
        {
            category: t("cloud"),
            items: ["Kubernetes", "Docker", "Helm", "ArgoCD", "Terraform", "AWS/AliCloud"],
            icon: <Cloud className="h-6 w-6 text-sky-400" />,
            color: "from-sky-500/20 to-transparent"
        },
        {
            category: t("backend"),
            items: ["Go (Golang)", "gRPC", "PostgreSQL", "Redis", "Node.js", "Python"],
            icon: <Terminal className="h-6 w-6 text-emerald-400" />,
            color: "from-emerald-500/20 to-transparent"
        },
        {
            category: t("frontend"),
            items: ["Next.js", "React", "TypeScript", "Tailwind", "Framer Motion", "Three.js"],
            icon: <Code className="h-6 w-6 text-indigo-400" />,
            color: "from-indigo-500/20 to-transparent"
        },
        {
            category: t("mobile"),
            items: ["Flutter", "WXML/WXSS", "WeChat SDK", "Taro", "React Native"],
            icon: <Smartphone className="h-6 w-6 text-orange-400" />,
            color: "from-orange-500/20 to-transparent"
        },
        {
            category: t("aiData"),
            items: ["LLM Integration", "Vector DB", "RAG", "Fine-tuning", "LangChain", "PyTorch"],
            icon: <Database className="h-6 w-6 text-rose-400" />,
            color: "from-rose-500/20 to-transparent"
        }
    ];

    return (
        <section className="py-24 bg-brand-dark relative overflow-hidden bg-grid">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
            
            <div className="max-w-[1920px] mx-auto px-4 sm:px-6 lg:px-12 xl:px-16 relative z-10">
                <div className="text-center max-w-3xl mx-auto mb-20">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        className="inline-block px-4 py-1.5 rounded-full bg-brand-accent/10 border border-brand-accent/20 text-brand-accent text-sm font-bold mb-6 tracking-widest uppercase"
                    >
                        Infrastructure
                    </motion.div>
                    <motion.h2 
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-4xl md:text-5xl font-black text-white mb-6"
                    >
                        {t("title")}
                    </motion.h2>
                    <motion.p 
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        className="text-gray-400 text-lg leading-relaxed"
                    >
                        {t("subtitle")}
                    </motion.p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
                    {stack.map((group, idx) => (
                        <motion.div 
                            key={group.category}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: idx * 0.1 }}
                            className="glass-card p-8 rounded-3xl border border-white/5 hover:border-brand-accent/30 transition-all duration-500 group relative overflow-hidden"
                        >
                            <div className={`absolute inset-0 bg-gradient-to-br ${group.color} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
                            
                            <div className="relative z-10">
                                <div className="h-14 w-14 rounded-2xl bg-white/5 flex items-center justify-center mb-8 group-hover:scale-110 group-hover:bg-white/10 transition-all duration-500">
                                    {group.icon}
                                </div>
                                <h3 className="text-2xl font-bold text-white mb-6">{group.category}</h3>
                                <div className="flex flex-wrap gap-2">
                                    {group.items.map((item) => (
                                        <span 
                                            key={item} 
                                            className="px-3 py-1 rounded-lg bg-white/5 border border-white/5 text-xs text-gray-400 font-medium group-hover:text-white group-hover:border-white/10 transition-colors"
                                        >
                                            {item}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
