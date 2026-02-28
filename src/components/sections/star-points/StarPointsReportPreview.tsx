"use client";

import { ArrowRight, BarChart3, CalendarDays, Sparkles } from "lucide-react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";

export function StarPointsReportPreview() {
  const t = useTranslations("starPointsLanding.report");

  return (
    <section className="py-16 sm:py-20 bg-gradient-to-b from-brand-dark/80 to-brand-dark">
      <div className="w-full max-w-[1920px] mx-auto px-4 sm:px-6 lg:px-12 xl:px-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
          <div className="max-w-xl">
            <h2 className="text-3xl sm:text-4xl font-bold text-white">{t("title")}</h2>
            <p className="text-gray-400 mt-3 text-lg leading-relaxed">{t("subtitle")}</p>
            <div className="mt-8 flex flex-col sm:flex-row gap-4">
              <Link
                href="/products/star-points#weekly-report"
                className="inline-flex items-center justify-center gap-2 bg-brand-accent text-brand-dark px-6 py-3 rounded-full font-semibold hover:bg-brand-accent/90 transition-colors"
              >
                {t("ctaPrimary")}
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href="/pricing"
                className="inline-flex items-center justify-center gap-2 bg-white/10 text-white border border-white/10 px-6 py-3 rounded-full font-semibold hover:bg-white/20 transition-colors"
              >
                <Sparkles className="h-4 w-4" />
                {t("ctaSecondary")}
              </Link>
            </div>
          </div>

          <div className="bg-brand-primary border border-white/5 rounded-3xl overflow-hidden">
            <div className="px-7 py-6 border-b border-white/5 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <CalendarDays className="h-5 w-5 text-brand-accent" />
                <div className="text-white font-semibold">{t("card.title")}</div>
              </div>
              <div className="text-xs text-gray-400">{t("card.badge")}</div>
            </div>

            <div className="p-7 space-y-6">
              <div>
                <div className="text-sm text-gray-400">{t("card.section1.k")}</div>
                <div className="mt-2 grid grid-cols-3 gap-3">
                  <div className="bg-white/5 rounded-2xl p-4 border border-white/5">
                    <div className="text-xs text-gray-400">{t("card.section1.a1.k")}</div>
                    <div className="text-white font-bold text-xl mt-1">{t("card.section1.a1.v")}</div>
                  </div>
                  <div className="bg-white/5 rounded-2xl p-4 border border-white/5">
                    <div className="text-xs text-gray-400">{t("card.section1.a2.k")}</div>
                    <div className="text-white font-bold text-xl mt-1">{t("card.section1.a2.v")}</div>
                  </div>
                  <div className="bg-white/5 rounded-2xl p-4 border border-white/5">
                    <div className="text-xs text-gray-400">{t("card.section1.a3.k")}</div>
                    <div className="text-white font-bold text-xl mt-1">{t("card.section1.a3.v")}</div>
                  </div>
                </div>
              </div>

              <div>
                <div className="flex items-center gap-2 text-sm text-gray-400">
                  <BarChart3 className="h-4 w-4 text-brand-accent" />
                  {t("card.section2.k")}
                </div>
                <ul className="mt-3 space-y-2 text-gray-300">
                  <li className="bg-white/5 border border-white/5 rounded-xl px-4 py-3">{t("card.section2.i1")}</li>
                  <li className="bg-white/5 border border-white/5 rounded-xl px-4 py-3">{t("card.section2.i2")}</li>
                  <li className="bg-white/5 border border-white/5 rounded-xl px-4 py-3">{t("card.section2.i3")}</li>
                </ul>
              </div>

              <div>
                <div className="flex items-center gap-2 text-sm text-gray-400">
                  <Sparkles className="h-4 w-4 text-brand-accent" />
                  {t("card.section3.k")}
                </div>
                <ol className="mt-3 space-y-2 text-gray-300">
                  <li className="bg-white/5 border border-white/5 rounded-xl px-4 py-3">{t("card.section3.i1")}</li>
                  <li className="bg-white/5 border border-white/5 rounded-xl px-4 py-3">{t("card.section3.i2")}</li>
                  <li className="bg-white/5 border border-white/5 rounded-xl px-4 py-3">{t("card.section3.i3")}</li>
                </ol>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

