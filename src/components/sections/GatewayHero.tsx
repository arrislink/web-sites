"use client";

import Image from "next/image";
import { ArrowRight, Check } from "lucide-react";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";

export function GatewayHero() {
  const t = useTranslations("gatewayHero");

  return (
    <section className="relative overflow-hidden pt-24 pb-20 sm:pb-28 2xl:pt-40 bg-grid">
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/content-creation-3d.png"
          alt="Background"
          fill
          priority
          className="object-cover opacity-35 mix-blend-plus-lighter"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-brand-dark/95 via-brand-dark/85 to-brand-dark" />
      </div>

      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[450px] ambient-glow opacity-20" />
      <div className="absolute bottom-0 right-0 w-[520px] h-[520px] ambient-glow opacity-10 translate-x-1/4 translate-y-1/4" />

      <div className="w-full max-w-[1920px] mx-auto px-4 sm:px-6 lg:px-12 xl:px-16 relative z-10">
        <div className="max-w-6xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-brand-accent/10 border border-brand-accent/20 text-brand-accent text-sm font-bold mb-8 backdrop-blur-sm"
          >
            <span className="flex h-2 w-2 rounded-full bg-brand-accent animate-pulse" />
            {t("badge")}
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="text-4xl sm:text-6xl lg:text-7xl xl:text-8xl font-black tracking-tight text-white mb-8 leading-[1.08]"
          >
            {t("title")}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="text-lg lg:text-2xl text-gray-400 max-w-4xl mx-auto mb-10 leading-relaxed font-medium"
          >
            {t("subtitle")}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col sm:flex-row gap-5 justify-center"
          >
            <Link
              href={t("ctaPrimaryHref")}
              className="inline-flex items-center justify-center gap-2 bg-brand-accent text-brand-dark px-10 py-5 rounded-full text-xl font-black hover:scale-105 transition-all shadow-[0_0_30px_rgba(56,189,248,0.3)]"
            >
              {t("ctaPrimary")}
              <ArrowRight className="w-6 h-6" />
            </Link>
            <Link
              href="/case-studies"
              className="inline-flex items-center justify-center gap-2 bg-white/5 text-white border border-white/10 px-10 py-5 rounded-full text-xl font-bold hover:bg-white/10 transition-all hover:scale-105 backdrop-blur-md"
            >
              {t("ctaSecondary")}
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.35 }}
            className="mt-12 flex flex-wrap items-center justify-center gap-3 text-sm"
          >
            <span className="bg-white/5 border border-white/10 text-gray-200 px-4 py-2 rounded-full font-semibold">
              {t("focus1")}
            </span>
            <span className="bg-white/5 border border-white/10 text-gray-200 px-4 py-2 rounded-full font-semibold">
              {t("focus2")}
            </span>
            <span className="bg-white/5 border border-white/10 text-gray-200 px-4 py-2 rounded-full font-semibold">
              {t("focus3")}
            </span>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.05, delay: 0.45 }}
            className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6 text-left"
          >
            {[t("b1"), t("b2"), t("b3")].map((item, i) => (
              <div
                key={i}
                className="glass-card p-8 rounded-[2rem] border border-white/5 hover:border-brand-accent/20"
              >
                <div className="flex items-start gap-3">
                  <div className="h-10 w-10 rounded-2xl bg-brand-accent/10 flex items-center justify-center text-brand-accent shrink-0">
                    <Check className="h-5 w-5" />
                  </div>
                  <div className="text-white font-semibold leading-relaxed">{item}</div>
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}

