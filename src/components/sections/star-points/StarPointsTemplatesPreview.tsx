"use client";

import { ArrowRight, Baby, GraduationCap, Users } from "lucide-react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";

export function StarPointsTemplatesPreview() {
  const t = useTranslations("starPointsLanding.templates");

  const items = [
    { icon: Baby, title: t("t35.title"), desc: t("t35.desc"), tag: t("t35.tag") },
    { icon: Users, title: t("t68.title"), desc: t("t68.desc"), tag: t("t68.tag") },
    { icon: GraduationCap, title: t("t912.title"), desc: t("t912.desc"), tag: t("t912.tag") },
  ] as const;

  return (
    <section className="py-16 sm:py-20 bg-gradient-to-b from-brand-dark to-brand-dark/80">
      <div className="w-full max-w-[1920px] mx-auto px-4 sm:px-6 lg:px-12 xl:px-16">
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6">
          <div className="max-w-3xl">
            <h2 className="text-3xl sm:text-4xl font-bold text-white">{t("title")}</h2>
            <p className="text-gray-400 mt-3 text-lg leading-relaxed">{t("subtitle")}</p>
          </div>
          <Link
            href="/products/star-points#templates"
            className="inline-flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 text-white border border-white/10 px-5 py-3 rounded-full font-semibold transition-colors w-fit"
          >
            {t("cta")}
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-6">
          {items.map((it) => (
            <div key={it.title} className="bg-brand-primary border border-white/5 rounded-2xl p-7">
              <div className="flex items-center justify-between">
                <div className="h-12 w-12 bg-brand-accent/10 rounded-xl flex items-center justify-center text-brand-accent">
                  <it.icon className="h-6 w-6" />
                </div>
                <span className="text-xs font-bold px-2 py-1 rounded bg-white/10 text-gray-200 border border-white/10">
                  {it.tag}
                </span>
              </div>
              <h3 className="mt-5 text-xl font-bold text-white">{it.title}</h3>
              <p className="mt-2 text-gray-400 leading-relaxed">{it.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

