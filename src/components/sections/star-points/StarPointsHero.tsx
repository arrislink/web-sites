"use client";

import { ArrowRight, Sparkles, ShieldCheck, Stars } from "lucide-react";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import Image from "next/image";

export function StarPointsHero() {
  const t = useTranslations("starPointsLanding.hero");

  return (
    <section className="relative overflow-hidden pt-24 pb-20 sm:pb-32 2xl:pt-40 bg-grid">
      {/* Background Decor */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/hero-bg.png"
          alt="Background"
          fill
          className="object-cover opacity-40 mix-blend-plus-lighter grayscale-[50%]"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-b from-brand-dark/95 via-brand-dark/80 to-brand-dark" />
      </div>

      {/* Ambient Glows */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] ambient-glow opacity-20" />
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] ambient-glow opacity-10 translate-x-1/4 translate-y-1/4" />

      <div className="w-full max-w-[1920px] mx-auto px-4 sm:px-6 lg:px-12 xl:px-16 relative z-10">
        <div className="max-w-5xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-brand-accent/10 border border-brand-accent/20 text-brand-accent text-sm font-bold mb-8 backdrop-blur-sm"
          >
            <span className="flex h-2 w-2 rounded-full bg-brand-accent animate-pulse" />
            {t("badge")}
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="text-4xl sm:text-6xl lg:text-8xl font-black tracking-tight text-white mb-8 leading-[1.1]"
          >
            {t("title")}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="text-lg lg:text-2xl text-gray-400 max-w-3xl mx-auto mb-12 leading-relaxed font-medium"
          >
            {t("subtitle")}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col sm:flex-row gap-6 justify-center"
          >
            <Link
              href="/products/star-points"
              className="inline-flex items-center justify-center gap-2 bg-brand-accent text-brand-dark px-10 py-5 rounded-full text-xl font-black hover:scale-105 transition-all shadow-[0_0_30px_rgba(56,189,248,0.3)]"
            >
              {t("ctaPrimary")}
              <ArrowRight className="w-6 h-6" />
            </Link>
            <Link
              href="/solutions"
              className="inline-flex items-center justify-center gap-2 bg-white/5 text-white border border-white/10 px-10 py-5 rounded-full text-xl font-bold hover:bg-white/10 transition-all hover:scale-105 backdrop-blur-md"
            >
              <Sparkles className="w-6 h-6 text-brand-accent" />
              {t("ctaSecondary")}
            </Link>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.4 }}
            className="mt-24 grid grid-cols-1 md:grid-cols-3 gap-6 text-left"
          >
            {[
              { icon: ShieldCheck, title: t("pillars.rulesTitle"), desc: t("pillars.rulesDesc") },
              { icon: Stars, title: t("pillars.ledgerTitle"), desc: t("pillars.ledgerDesc") },
              { icon: Sparkles, title: t("pillars.aiTitle"), desc: t("pillars.aiDesc") }
            ].map((pillar, i) => (
              <div key={i} className="glass-card p-8 rounded-[2rem] border border-white/5 hover:border-brand-accent/20">
                <div className="h-12 w-12 rounded-2xl bg-brand-accent/10 flex items-center justify-center text-brand-accent mb-6">
                  <pillar.icon className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-bold text-white mb-3">{pillar.title}</h3>
                <p className="text-sm text-gray-500 leading-relaxed font-medium">{pillar.desc}</p>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
