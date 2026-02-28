"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 18 },
  visible: { opacity: 1, y: 0 },
};

export function AudienceSection() {
  const t = useTranslations("audience");

  return (
    <section className="py-24 lg:py-32 bg-brand-dark relative overflow-hidden bg-grid">
      <div className="absolute inset-0 z-0 pointer-events-none">
        <Image
          src="/images/data-impact-viz.png"
          alt="Decoration"
          fill
          className="object-cover opacity-[0.06]"
        />
      </div>

      <div className="w-full max-w-[1920px] mx-auto px-4 sm:px-6 lg:px-12 xl:px-16 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl xl:text-6xl font-black text-white mb-6 tracking-tight">
            {t("title")}
          </h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto leading-relaxed">
            {t("subtitle")}
          </p>
        </div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {[0, 1, 2].map((idx) => (
            <motion.div
              key={idx}
              variants={itemVariants}
              className="glass-card p-10 rounded-[2.5rem] border border-white/10 hover:border-brand-accent/30 transition-all duration-500"
            >
              <div className="text-brand-accent text-xs font-black uppercase tracking-widest mb-4">
                {t(`items.${idx}.tag`)}
              </div>
              <h3 className="text-2xl font-bold text-white mb-6">
                {t(`items.${idx}.title`)}
              </h3>
              <ul className="space-y-3 text-gray-300">
                {[0, 1, 2, 3].map((b) => (
                  <li key={b} className="text-sm leading-relaxed">
                    {t(`items.${idx}.bullets.${b}`)}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

