"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import Image from "next/image";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.08 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0 },
};

export function ProcessSection() {
  const t = useTranslations("process");

  return (
    <section className="py-24 lg:py-32 bg-brand-dark relative overflow-hidden bg-grid">
      <div className="absolute top-0 left-0 w-[520px] h-[520px] ambient-glow opacity-10 -translate-x-1/4 -translate-y-1/4" />
      <div className="absolute bottom-0 right-0 w-[520px] h-[520px] ambient-glow opacity-10 translate-x-1/4 translate-y-1/4" />

      <div className="w-full max-w-[1920px] mx-auto px-4 sm:px-6 lg:px-12 xl:px-16 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
          <div className="lg:col-span-5">
            <h2 className="text-4xl lg:text-5xl xl:text-6xl font-black text-white mb-6 tracking-tight">
              {t("title")}
            </h2>
            <p className="text-xl text-gray-400 leading-relaxed mb-10">
              {t("subtitle")}
            </p>
            <div className="relative rounded-[2rem] overflow-hidden border border-white/10 bg-white/5">
              <Image
                src="/images/tech-stack-viz.png"
                alt="Process"
                width={900}
                height={700}
                className="w-full h-auto opacity-80"
              />
            </div>
          </div>

          <motion.div
            className="lg:col-span-7 space-y-5"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {[1, 2, 3, 4, 5].map((n) => (
              <motion.div
                key={n}
                variants={itemVariants}
                className="glass-card rounded-[2rem] border border-white/10 p-8 lg:p-9"
              >
                <div className="flex items-start gap-5">
                  <div className="h-12 w-12 rounded-2xl bg-brand-accent/10 flex items-center justify-center text-brand-accent font-black text-lg shrink-0">
                    {n}
                  </div>
                  <div>
                    <div className="text-white text-xl font-bold mb-2">
                      {t(`steps.${n}.title`)}
                    </div>
                    <div className="text-gray-400 leading-relaxed">
                      {t(`steps.${n}.desc`)}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}

