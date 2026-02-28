import { setRequestLocale, getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { BarChart3, CalendarCheck, FileText } from "lucide-react";

export default async function StarPointsReportSamplePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("starPointsSamples.report");

  return (
    <main className="min-h-screen bg-brand-dark pb-24 pt-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-brand-accent/10 text-brand-accent border border-brand-accent/20">
            <FileText className="w-4 h-4" />
            <span className="text-sm font-semibold">{t("badge")}</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-white mt-6">{t("title")}</h1>
          <p className="text-gray-400 text-lg mt-4 max-w-3xl mx-auto">{t("subtitle")}</p>
        </div>

        <section className="bg-white/5 border border-white/5 rounded-3xl overflow-hidden">
          <div className="px-8 py-6 border-b border-white/5 flex items-center justify-between">
            <div className="text-white font-semibold flex items-center gap-2">
              <CalendarCheck className="w-4 h-4 text-brand-accent" />
              {t("card.title")}
            </div>
            <div className="text-xs text-gray-400">{t("card.badge")}</div>
          </div>
          <div className="p-8 grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="bg-brand-primary border border-white/5 rounded-2xl p-6">
              <div className="text-sm text-gray-400">{t("card.kpis.title")}</div>
              <div className="mt-3 space-y-2 text-gray-200">
                <div>{t("card.kpis.i1")}</div>
                <div>{t("card.kpis.i2")}</div>
                <div>{t("card.kpis.i3")}</div>
              </div>
            </div>
            <div className="bg-brand-primary border border-white/5 rounded-2xl p-6">
              <div className="text-sm text-gray-400">{t("card.highlights.title")}</div>
              <div className="mt-3 space-y-2 text-gray-200">
                <div>{t("card.highlights.i1")}</div>
                <div>{t("card.highlights.i2")}</div>
                <div>{t("card.highlights.i3")}</div>
              </div>
            </div>
            <div className="bg-brand-primary border border-white/5 rounded-2xl p-6">
              <div className="text-sm text-gray-400">{t("card.next.title")}</div>
              <div className="mt-3 space-y-2 text-gray-200">
                <div>{t("card.next.i1")}</div>
                <div>{t("card.next.i2")}</div>
                <div>{t("card.next.i3")}</div>
              </div>
            </div>
          </div>
        </section>

        <section className="mt-8 grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="bg-white/5 border border-white/5 rounded-3xl p-10">
            <div className="inline-flex items-center gap-2 text-brand-accent text-sm font-semibold">
              <BarChart3 className="w-4 h-4" />
              {t("weeklyMeeting.badge")}
            </div>
            <h2 className="text-2xl font-bold text-white mt-4">{t("weeklyMeeting.title")}</h2>
            <p className="text-gray-400 mt-3">{t("weeklyMeeting.subtitle")}</p>
            <div className="mt-6 grid grid-cols-1 gap-3 text-sm text-gray-200">
              <div className="bg-brand-primary border border-white/5 rounded-2xl px-4 py-3">{t("weeklyMeeting.i1")}</div>
              <div className="bg-brand-primary border border-white/5 rounded-2xl px-4 py-3">{t("weeklyMeeting.i2")}</div>
              <div className="bg-brand-primary border border-white/5 rounded-2xl px-4 py-3">{t("weeklyMeeting.i3")}</div>
              <div className="bg-brand-primary border border-white/5 rounded-2xl px-4 py-3">{t("weeklyMeeting.i4")}</div>
            </div>
          </div>
          <div className="bg-white/5 border border-white/5 rounded-3xl p-10">
            <h2 className="text-2xl font-bold text-white">{t("whyWorks.title")}</h2>
            <div className="mt-6 space-y-3 text-gray-300">
              <div>{t("whyWorks.b1")}</div>
              <div>{t("whyWorks.b2")}</div>
              <div>{t("whyWorks.b3")}</div>
            </div>
            <div className="mt-6 text-xs text-gray-500">{t("whyWorks.note")}</div>
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

