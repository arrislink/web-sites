import { setRequestLocale, getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { Gift, Store } from "lucide-react";

export default async function StarPointsRewardsSamplePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("starPointsSamples.rewards");

  return (
    <main className="min-h-screen bg-brand-dark pb-24 pt-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-brand-accent/10 text-brand-accent border border-brand-accent/20">
            <Store className="w-4 h-4" />
            <span className="text-sm font-semibold">{t("badge")}</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-white mt-6">{t("title")}</h1>
          <p className="text-gray-400 text-lg mt-4 max-w-3xl mx-auto">{t("subtitle")}</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <section className="bg-white/5 border border-white/5 rounded-3xl p-10">
            <h2 className="text-2xl font-bold text-white">{t("principles.title")}</h2>
            <div className="mt-6 space-y-3 text-gray-300">
              <div>{t("principles.b1")}</div>
              <div>{t("principles.b2")}</div>
              <div>{t("principles.b3")}</div>
            </div>
          </section>

          <section className="bg-white/5 border border-white/5 rounded-3xl p-10">
            <h2 className="text-2xl font-bold text-white">{t("budget.title")}</h2>
            <p className="text-gray-400 mt-3">{t("budget.subtitle")}</p>
            <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-3 text-sm text-gray-200">
              <div className="bg-brand-primary border border-white/5 rounded-2xl px-4 py-3">
                <div className="text-white font-semibold">{t("budget.low.title")}</div>
                <div className="text-gray-400 mt-1">{t("budget.low.desc")}</div>
              </div>
              <div className="bg-brand-primary border border-white/5 rounded-2xl px-4 py-3">
                <div className="text-white font-semibold">{t("budget.mid.title")}</div>
                <div className="text-gray-400 mt-1">{t("budget.mid.desc")}</div>
              </div>
              <div className="bg-brand-primary border border-white/5 rounded-2xl px-4 py-3">
                <div className="text-white font-semibold">{t("budget.high.title")}</div>
                <div className="text-gray-400 mt-1">{t("budget.high.desc")}</div>
              </div>
            </div>
          </section>
        </div>

        <section className="mt-8 bg-white/5 border border-white/5 rounded-3xl p-10">
          <div className="flex items-center justify-between gap-6 flex-col md:flex-row">
            <div>
              <h2 className="text-2xl font-bold text-white">{t("catalog.title")}</h2>
              <p className="text-gray-400 mt-3">{t("catalog.subtitle")}</p>
            </div>
            <div className="inline-flex items-center gap-2 text-sm text-gray-300">
              <Gift className="w-4 h-4 text-brand-accent" />
              {t("catalog.hint")}
            </div>
          </div>

          <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-brand-primary border border-white/5 rounded-2xl p-7">
              <div className="text-brand-accent font-semibold">{t("catalog.q1.tag")}</div>
              <div className="text-white font-bold mt-2">{t("catalog.q1.title")}</div>
              <div className="text-gray-400 mt-2">{t("catalog.q1.desc")}</div>
              <div className="mt-4 grid grid-cols-1 gap-2 text-sm text-gray-200">
                <div className="bg-white/5 border border-white/5 rounded-xl px-3 py-2">{t("catalog.q1.i1")}</div>
                <div className="bg-white/5 border border-white/5 rounded-xl px-3 py-2">{t("catalog.q1.i2")}</div>
                <div className="bg-white/5 border border-white/5 rounded-xl px-3 py-2">{t("catalog.q1.i3")}</div>
              </div>
            </div>
            <div className="bg-brand-primary border border-white/5 rounded-2xl p-7">
              <div className="text-brand-accent font-semibold">{t("catalog.q2.tag")}</div>
              <div className="text-white font-bold mt-2">{t("catalog.q2.title")}</div>
              <div className="text-gray-400 mt-2">{t("catalog.q2.desc")}</div>
              <div className="mt-4 grid grid-cols-1 gap-2 text-sm text-gray-200">
                <div className="bg-white/5 border border-white/5 rounded-xl px-3 py-2">{t("catalog.q2.i1")}</div>
                <div className="bg-white/5 border border-white/5 rounded-xl px-3 py-2">{t("catalog.q2.i2")}</div>
                <div className="bg-white/5 border border-white/5 rounded-xl px-3 py-2">{t("catalog.q2.i3")}</div>
              </div>
            </div>
            <div className="bg-brand-primary border border-white/5 rounded-2xl p-7">
              <div className="text-brand-accent font-semibold">{t("catalog.q3.tag")}</div>
              <div className="text-white font-bold mt-2">{t("catalog.q3.title")}</div>
              <div className="text-gray-400 mt-2">{t("catalog.q3.desc")}</div>
              <div className="mt-4 grid grid-cols-1 gap-2 text-sm text-gray-200">
                <div className="bg-white/5 border border-white/5 rounded-xl px-3 py-2">{t("catalog.q3.i1")}</div>
                <div className="bg-white/5 border border-white/5 rounded-xl px-3 py-2">{t("catalog.q3.i2")}</div>
                <div className="bg-white/5 border border-white/5 rounded-xl px-3 py-2">{t("catalog.q3.i3")}</div>
              </div>
            </div>
            <div className="bg-brand-primary border border-white/5 rounded-2xl p-7">
              <div className="text-brand-accent font-semibold">{t("catalog.q4.tag")}</div>
              <div className="text-white font-bold mt-2">{t("catalog.q4.title")}</div>
              <div className="text-gray-400 mt-2">{t("catalog.q4.desc")}</div>
              <div className="mt-4 grid grid-cols-1 gap-2 text-sm text-gray-200">
                <div className="bg-white/5 border border-white/5 rounded-xl px-3 py-2">{t("catalog.q4.i1")}</div>
                <div className="bg-white/5 border border-white/5 rounded-xl px-3 py-2">{t("catalog.q4.i2")}</div>
                <div className="bg-white/5 border border-white/5 rounded-xl px-3 py-2">{t("catalog.q4.i3")}</div>
              </div>
            </div>
          </div>
        </section>

        <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/products/star-points"
            className="inline-flex items-center justify-center bg-white/10 hover:bg-white/20 text-white border border-white/10 px-7 py-3 rounded-full font-semibold transition-colors"
          >
            {t("ctaBack")}
          </Link>
          <Link
            href="/pricing"
            className="inline-flex items-center justify-center bg-brand-accent text-brand-dark px-7 py-3 rounded-full font-semibold hover:bg-brand-accent/90 transition-colors"
          >
            {t("ctaPricing")}
          </Link>
        </div>
      </div>
    </main>
  );
}

