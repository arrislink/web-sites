"use client";

import Image from "next/image";
import { MoveRight, Sparkles, Wand2 } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { motion } from "framer-motion";

interface ProductHeroProps {
    title: string;
    subtitle: string;
    badge: string;
    imageSrc: string;
    primaryCta: string;
    secondaryCta?: string;
    primaryCtaLink?: string;
    secondaryCtaLink?: string;
}

export function ProductHero({
    title,
    subtitle,
    badge,
    imageSrc,
    primaryCta,
    secondaryCta,
    primaryCtaLink = "/contact",
    secondaryCtaLink = "/pricing"
}: ProductHeroProps) {
    return (
        <section className="relative pt-40 pb-24 overflow-hidden">
            {/* Background Gradients & Effects */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0 pointer-events-none">
                <div className="absolute top-[-10%] right-[-5%] w-[600px] h-[600px] bg-brand-accent/10 rounded-full blur-[120px] animate-pulse" />
                <div className="absolute bottom-[-10%] left-[-5%] w-[600px] h-[600px] bg-blue-500/10 rounded-full blur-[120px]" />
                <div className="absolute inset-0 bg-[url('/images/noise.png')] opacity-20 mix-blend-overlay" />
            </div>

            <div className="max-w-[1920px] mx-auto px-4 sm:px-6 lg:px-12 xl:px-16 relative z-10">
                <div className="grid lg:grid-cols-2 gap-16 items-center">
                    <motion.div 
                        initial={{ opacity: 0, x: -30 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                        className="space-y-10"
                    >
                        <motion.div 
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: 0.2 }}
                            className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-brand-accent/10 text-brand-accent border border-brand-accent/20 text-sm font-black tracking-widest uppercase"
                        >
                            <Sparkles className="w-4 h-4 animate-spin-slow" />
                            {badge}
                        </motion.div>

                        <h1 className="text-5xl md:text-7xl lg:text-8xl font-black text-white leading-[1.1] tracking-tighter" style={{ fontFamily: 'var(--font-serif-en)' }}>
                            {title.split(' ').map((word, i) => (
                                <motion.span 
                                    key={i}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.3 + (i * 0.1) }}
                                    className="inline-block mr-4 italic last:not-italic last:text-brand-accent"
                                >
                                    {word}
                                </motion.span>
                            ))}
                        </h1>

                        <motion.p 
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.6 }}
                            className="text-xl text-gray-400 leading-relaxed max-w-xl font-medium"
                        >
                            {subtitle}
                        </motion.p>

                        <motion.div 
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.8 }}
                            className="flex flex-wrap gap-6"
                        >
                            <Link
                                href={primaryCtaLink}
                                className="group relative inline-flex items-center gap-3 bg-brand-accent text-brand-dark px-10 py-5 rounded-2xl font-black text-lg transition-all shadow-[0_15px_30px_-10px_rgba(56,189,248,0.5)] hover:shadow-[0_20px_40px_-10px_rgba(56,189,248,0.6)] hover:-translate-y-1 active:scale-95 overflow-hidden"
                            >
                                <span className="relative z-10 flex items-center gap-3">
                                    {primaryCta}
                                    <MoveRight className="w-6 h-6 group-hover:translate-x-2 transition-transform" />
                                </span>
                                <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-20 transition-opacity" />
                            </Link>
                            
                            {secondaryCta && (
                                <Link
                                    href={secondaryCtaLink}
                                    className="inline-flex items-center gap-2 bg-white/5 text-white border border-white/10 px-10 py-5 rounded-2xl font-black text-lg hover:bg-white/10 transition-all hover:-translate-y-1 active:scale-95 backdrop-blur-md"
                                >
                                    {secondaryCta}
                                </Link>
                            )}
                        </motion.div>
                    </motion.div>

                    <motion.div 
                        initial={{ opacity: 0, scale: 0.9, rotate: 2 }}
                        animate={{ opacity: 1, scale: 1, rotate: 0 }}
                        transition={{ duration: 1, ease: "easeOut" }}
                        className="relative"
                    >
                        <div className="aspect-[4/5] md:aspect-[4/3] relative rounded-[3rem] overflow-hidden border border-white/10 shadow-3xl shadow-brand-accent/20 group">
                            <div className="absolute inset-0 bg-gradient-to-br from-brand-accent/20 to-transparent z-10 pointer-events-none group-hover:opacity-0 transition-opacity duration-700" />
                            <Image
                                src={imageSrc}
                                alt={title}
                                fill
                                className="object-cover z-0 transition-transform duration-[2s] group-hover:scale-110"
                                priority
                            />
                            {/* Decorative Frame */}
                            <div className="absolute inset-0 border-[1.5rem] border-brand-dark/20 z-20 pointer-events-none rounded-[3rem]" />
                            <div className="absolute inset-0 bg-gradient-to-t from-brand-dark/80 via-transparent to-transparent z-10" />
                        </div>
                        
                        {/* Floating badge on image */}
                        <motion.div 
                            animate={{ y: [0, -15, 0] }}
                            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                            className="absolute -bottom-10 -left-10 bg-white/10 backdrop-blur-xl border border-white/20 p-6 rounded-3xl shadow-2xl z-30 hidden md:block"
                        >
                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 bg-brand-accent rounded-2xl flex items-center justify-center text-brand-dark">
                                    <Wand2 className="w-6 h-6" />
                                </div>
                                <div>
                                    <p className="text-white font-black text-lg">AI Driven</p>
                                    <p className="text-gray-400 text-sm font-bold">Uniquely Yours</p>
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
