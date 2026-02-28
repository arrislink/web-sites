"use client";

import { CheckCircle2, ClipboardList, Gift, Sparkles } from "lucide-react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";

export function StarPointsHowItWorks() {
  const t = useTranslations("starPointsLanding.how");

  const steps = [
    {
      icon: ClipboardList,
      title: t("step1.title"),
      desc: t("step1.desc"),
      bullets: [t("step1.b1"), t("step1.b2")],
    },
    {
      icon: CheckCircle2,
      title: t("step2.title"),
      desc: t("step2.desc"),
      bullets: [t("step2.b1"), t("step2.b2")],
    },
    {
      icon: Gift,
      title: t("step3.title"),
      desc: t("step3.desc"),
      bullets: [t("step3.b1"), t("step3.b2")],
    },
  ] as const;

  return (
    <section className="py-16 sm:py-20">
      <div className="w-full max-w-[1920px] mx-auto px-4 sm:px-6 lg:px-12 xl:px-16">
        <div className="max-w-3xl">
          <h2 className="text-3xl sm:text-4xl font-bold text-white">{t("title")}</h2>
          <p className="text-gray-400 mt-3 text-lg leading-relaxed">{t("subtitle")}</p>
        </div>

        <div className="mt-10 grid grid-cols-1 lg:grid-cols-3 gap-6">
          {steps.map((s) => (
            <div key={s.title} className="bg-brand-primary border border-white/5 rounded-2xl p-7">
              <div className="h-12 w-12 bg-brand-accent/10 rounded-xl flex items-center justify-center text-brand-accent mb-5">
                <s.icon className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-bold text-white">{s.title}</h3>
              <p className="text-gray-400 mt-2 leading-relaxed">{s.desc}</p>
              <div className="mt-4 space-y-2">
                {s.bullets.map((b) => (
                  <div key={b} className="flex items-start gap-2 text-sm text-gray-300">
                    <span className="mt-0.5 h-4 w-4 text-brand-accent">
                      <Sparkles className="h-4 w-4" />
                    </span>
                    <span className="leading-relaxed">{b}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-10">
          <Link
            href="/products/star-points#templates"
            className="inline-flex items-center gap-2 text-brand-accent hover:text-brand-accent/90 font-semibold"
          >
            {t("cta")}
          </Link>
        </div>
      </div>
    </section>
  );
}

