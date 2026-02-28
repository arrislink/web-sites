"use client";

import { HeartHandshake, Scale, Sparkles, Target, BookOpenText, Brain } from "lucide-react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";

export function StarPointsCoachPreview() {
  const t = useTranslations("starPointsLanding.coach");

  const personas = [
    { icon: HeartHandshake, title: t("p1.title"), desc: t("p1.desc") },
    { icon: Target, title: t("p2.title"), desc: t("p2.desc") },
    { icon: Scale, title: t("p3.title"), desc: t("p3.desc") },
    { icon: BookOpenText, title: t("p4.title"), desc: t("p4.desc") },
    { icon: Brain, title: t("p5.title"), desc: t("p5.desc") },
  ] as const;

  return (
    <section className="py-16 sm:py-20">
      <div className="w-full max-w-[1920px] mx-auto px-4 sm:px-6 lg:px-12 xl:px-16">
        <div className="max-w-3xl">
          <h2 className="text-3xl sm:text-4xl font-bold text-white">{t("title")}</h2>
          <p className="text-gray-400 mt-3 text-lg leading-relaxed">{t("subtitle")}</p>
        </div>

        <div className="mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {personas.map((p) => (
            <div key={p.title} className="bg-brand-primary border border-white/5 rounded-2xl p-7">
              <div className="h-12 w-12 bg-brand-accent/10 rounded-xl flex items-center justify-center text-brand-accent mb-5">
                <p.icon className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-bold text-white">{p.title}</h3>
              <p className="text-gray-400 mt-2 leading-relaxed">{p.desc}</p>
            </div>
          ))}
          <div className="bg-gradient-to-b from-brand-primary to-brand-primary/40 border border-white/5 rounded-2xl p-7 md:col-span-2 lg:col-span-3">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-5">
              <div>
                <div className="inline-flex items-center gap-2 text-brand-accent font-semibold">
                  <Sparkles className="h-5 w-5" />
                  {t("ctaTag")}
                </div>
                <p className="text-gray-300 mt-2 leading-relaxed">{t("ctaDesc")}</p>
              </div>
              <Link
                href="/products/star-points#ai-coach"
                className="inline-flex items-center justify-center bg-white/10 hover:bg-white/20 text-white border border-white/10 px-6 py-3 rounded-full font-semibold transition-colors w-fit"
              >
                {t("cta")}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

