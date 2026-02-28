"use client";

import Image from "next/image";
import { ArrowRight, Beaker } from "lucide-react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { OFFERS } from "@/data/offers";
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

export function HomeOffers() {
  const t = useTranslations();
  const tHome = useTranslations("homeOffers");

  const productMatrix = OFFERS.filter((o) => o.kind === "product" && o.segment === "module");

  return (
    <section className="py-24 lg:py-32 bg-brand-dark relative overflow-hidden bg-grid">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
      
      <div className="w-full max-w-[1920px] mx-auto px-4 sm:px-6 lg:px-12 xl:px-16 relative z-10">
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between mb-20">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl lg:text-5xl xl:text-6xl font-black text-white mb-6 tracking-tight">
              {tHome("title")}
            </h2>
            <p className="text-xl text-gray-400 max-w-2xl leading-relaxed">{tHome("subtitle")}</p>
          </motion.div>
          <motion.div 
            className="mt-8 lg:mt-0 flex items-center gap-8"
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <Link href="/products" className="inline-flex items-center gap-2 text-brand-accent hover:text-white transition-colors font-bold text-lg group">
              {tHome("viewProducts")}
              <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link href="/solutions" className="inline-flex items-center gap-2 text-brand-accent hover:text-white transition-colors font-bold text-lg group">
              {tHome("viewSolutions")}
              <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </motion.div>
        </div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {["content", "productize", "system"].map((k) => (
            <motion.div key={k} variants={itemVariants}>
              <Link
                href={tHome(`services.${k}.href`)}
                className="group block glass-card rounded-[2.5rem] overflow-hidden hover:border-brand-accent/40 transition-all duration-500 relative"
              >
                <div className="h-64 relative overflow-hidden">
                  <Image
                    src={tHome(`services.${k}.image`)}
                    alt={tHome(`services.${k}.title`)}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="object-cover opacity-80 group-hover:scale-110 group-hover:opacity-100 transition-all duration-700 ease-out"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-brand-dark via-brand-dark/20 to-transparent opacity-60" />
                  <div className="absolute top-6 left-6">
                    <span className="bg-brand-accent text-brand-dark text-xs font-black px-3 py-1.5 rounded-full uppercase tracking-wider">
                      {tHome(`services.${k}.badge`)}
                    </span>
                  </div>
                </div>
                <div className="p-10">
                  <h3 className="text-2xl font-bold text-white mb-4 group-hover:text-brand-accent transition-colors">
                    {tHome(`services.${k}.title`)}
                  </h3>
                  <p className="text-gray-400 mb-8 leading-relaxed line-clamp-2">
                    {tHome(`services.${k}.desc`)}
                  </p>
                  <div className="inline-flex items-center gap-2 text-brand-accent font-bold group-hover:gap-4 transition-all">
                    {tHome("learnMore")}
                    <ArrowRight className="h-5 w-5" />
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </motion.div>

        <div className="mt-24 pt-24 border-t border-white/10">
          <motion.div 
            className="flex items-center gap-3 mb-12"
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <div className="h-10 w-10 rounded-xl bg-purple-500/10 flex items-center justify-center text-purple-400">
                <Beaker className="h-6 w-6" />
            </div>
            <div>
              <div className="text-2xl font-bold text-white tracking-tight">{tHome("productsTitle")}</div>
              <div className="text-gray-500 text-sm mt-1 font-medium">{tHome("productsSubtitle")}</div>
              <div className="text-gray-500 text-sm mt-2 font-medium flex flex-wrap items-center gap-x-2 gap-y-1">
                <Link href="/products#showcase" className="hover:text-brand-accent transition-colors">
                  {tHome("showcaseLink")}
                </Link>
                <span className="text-gray-600">·</span>
                <Link href="/products#reference" className="hover:text-brand-accent transition-colors">
                  {tHome("referenceLink")}
                </Link>
              </div>
            </div>
          </motion.div>

          <motion.div 
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {productMatrix.map((o) => (
              <motion.div key={o.id} variants={itemVariants}>
                <Link
                    href={o.href}
                    className="group block h-full bg-white/[0.02] border border-white/5 rounded-3xl p-8 hover:bg-white/[0.05] hover:border-purple-500/30 transition-all duration-300 relative overflow-hidden"
                >
                    <div className="absolute top-0 right-0 w-32 h-32 bg-purple-500/5 blur-3xl rounded-full -translate-y-1/2 translate-x-1/2 group-hover:bg-purple-500/10 transition-colors" />
                    <div className="text-xl font-bold text-white mb-3 group-hover:text-purple-400 transition-colors">{t(o.i18n.titleKey)}</div>
                    {o.i18n.descriptionKey ? (
                    <div className="text-gray-400 text-sm leading-relaxed">{t(o.i18n.descriptionKey)}</div>
                    ) : null}
                    <div className="mt-6 flex items-center gap-2 text-purple-400/50 group-hover:text-purple-400 text-xs font-bold uppercase tracking-widest transition-colors">
                        {tHome("productCta")} <ArrowRight className="h-3 w-3" />
                    </div>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
