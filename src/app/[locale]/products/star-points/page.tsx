import { ProductHero } from "@/components/sections/ProductHero";
import {
  Award,
  Bell,
  CheckCircle2,
  ClipboardList,
  Clock,
  FileText,
  Gift,
  HeartHandshake,
  Medal,
  Scale,
  Sparkles,
  Store,
  Target,
  Trophy,
} from "lucide-react";
import { setRequestLocale, getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";

export default async function StarPointsPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("starPointsPage");

  return (
    <main className="min-h-screen bg-brand-dark">
      <ProductHero
        badge={t("hero.badge")}
        title={t("hero.title")}
        subtitle={t("hero.subtitle")}
        imageSrc="/images/hero-bg.png"
        primaryCta={t("hero.cta1")}
        primaryCtaLink="/contact?from=starPoints&subject=Star-Points%20%E5%85%8D%E8%B4%B9%E5%BC%80%E5%A7%8B%E4%BD%BF%E7%94%A8"
        secondaryCta={t("hero.cta2")}
        secondaryCtaLink="#task-system"
      />

      <section id="task-system" className="py-24 bg-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-white mb-4">{t("sections.taskSystem.title")}</h2>
            <p className="text-gray-400">{t("sections.taskSystem.subtitle")}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-brand-primary border border-white/5 rounded-2xl p-8 hover:border-brand-accent/30 transition-colors">
              <div className="w-12 h-12 rounded-xl bg-brand-accent/10 flex items-center justify-center mb-6">
                <ClipboardList className="w-6 h-6 text-brand-accent" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">{t("sections.taskSystem.optional.title")}</h3>
              <p className="text-gray-400 leading-relaxed">{t("sections.taskSystem.optional.desc")}</p>
            </div>

            <div className="bg-brand-primary border border-white/5 rounded-2xl p-8 hover:border-brand-accent/30 transition-colors">
              <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center mb-6">
                <Clock className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">{t("sections.taskSystem.must.title")}</h3>
              <p className="text-gray-400 leading-relaxed">{t("sections.taskSystem.must.desc")}</p>
            </div>

            <div className="bg-brand-primary border border-white/5 rounded-2xl p-8 hover:border-brand-accent/30 transition-colors">
              <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center mb-6">
                <Target className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">{t("sections.taskSystem.quest.title")}</h3>
              <p className="text-gray-400 leading-relaxed">{t("sections.taskSystem.quest.desc")}</p>
            </div>
          </div>

          <div className="mt-12 bg-brand-primary border border-white/5 rounded-3xl p-8">
            <div className="text-white font-semibold">{t("sections.taskSystem.flow.title")}</div>
            <div className="mt-4 grid grid-cols-1 md:grid-cols-5 gap-3 text-sm text-gray-200">
              <div className="bg-white/5 border border-white/5 rounded-2xl px-4 py-3">{t("sections.taskSystem.flow.s1")}</div>
              <div className="bg-white/5 border border-white/5 rounded-2xl px-4 py-3">{t("sections.taskSystem.flow.s2")}</div>
              <div className="bg-white/5 border border-white/5 rounded-2xl px-4 py-3">{t("sections.taskSystem.flow.s3")}</div>
              <div className="bg-white/5 border border-white/5 rounded-2xl px-4 py-3">{t("sections.taskSystem.flow.s4")}</div>
              <div className="bg-white/5 border border-white/5 rounded-2xl px-4 py-3">{t("sections.taskSystem.flow.s5")}</div>
            </div>
            <div className="mt-6 text-sm text-gray-400">{t("sections.taskSystem.flow.note")}</div>
          </div>
        </div>
      </section>

      <section id="rules-window" className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-white mb-4">{t("sections.rulesWindow.title")}</h2>
            <p className="text-gray-400">{t("sections.rulesWindow.subtitle")}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-brand-primary border border-white/5 rounded-2xl p-8">
              <div className="w-12 h-12 rounded-xl bg-brand-accent/10 flex items-center justify-center mb-6">
                <Scale className="w-6 h-6 text-brand-accent" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">{t("sections.rulesWindow.rules.title")}</h3>
              <p className="text-gray-400 leading-relaxed">{t("sections.rulesWindow.rules.desc")}</p>
            </div>
            <div className="bg-brand-primary border border-white/5 rounded-2xl p-8">
              <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center mb-6">
                <Clock className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">{t("sections.rulesWindow.windows.title")}</h3>
              <p className="text-gray-400 leading-relaxed">{t("sections.rulesWindow.windows.desc")}</p>
            </div>
            <div className="bg-brand-primary border border-white/5 rounded-2xl p-8">
              <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center mb-6">
                <FileText className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">{t("sections.rulesWindow.remedy.title")}</h3>
              <p className="text-gray-400 leading-relaxed">{t("sections.rulesWindow.remedy.desc")}</p>
            </div>
          </div>

          <div className="mt-12 bg-white/5 border border-white/5 rounded-3xl p-10">
            <div className="flex items-center justify-between gap-6 flex-col md:flex-row">
              <div>
                <div className="inline-flex items-center gap-2 text-sm text-brand-accent font-semibold">
                  <Award className="w-4 h-4" />
                  {t("sections.rulesWindow.templates.badge")}
                </div>
                <h3 className="text-2xl font-bold text-white mt-3">{t("sections.rulesWindow.templates.title")}</h3>
                <p className="text-gray-400 mt-2">{t("sections.rulesWindow.templates.subtitle")}</p>
              </div>
              <Link
                href="#templates"
                className="inline-flex items-center justify-center bg-white/10 hover:bg-white/20 text-white border border-white/10 px-6 py-3 rounded-full font-semibold transition-colors"
              >
                {t("sections.rulesWindow.templates.cta")}
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section id="templates" className="py-24 bg-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-white mb-4">{t("sections.templates.title")}</h2>
            <p className="text-gray-400">{t("sections.templates.subtitle")}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-brand-primary border border-white/5 rounded-2xl p-8">
              <div className="inline-flex items-center gap-2 text-sm text-brand-accent font-semibold">
                <Award className="w-4 h-4" />
                {t("sections.templates.t35.tag")}
              </div>
              <h3 className="text-xl font-bold text-white mt-4">{t("sections.templates.t35.title")}</h3>
              <p className="text-gray-400 mt-3 leading-relaxed">{t("sections.templates.t35.desc")}</p>
            </div>

            <div className="bg-brand-primary border border-white/5 rounded-2xl p-8">
              <div className="inline-flex items-center gap-2 text-sm text-brand-accent font-semibold">
                <Award className="w-4 h-4" />
                {t("sections.templates.t68.tag")}
              </div>
              <h3 className="text-xl font-bold text-white mt-4">{t("sections.templates.t68.title")}</h3>
              <p className="text-gray-400 mt-3 leading-relaxed">{t("sections.templates.t68.desc")}</p>
            </div>

            <div className="bg-brand-primary border border-white/5 rounded-2xl p-8">
              <div className="inline-flex items-center gap-2 text-sm text-brand-accent font-semibold">
                <Award className="w-4 h-4" />
                {t("sections.templates.t912.tag")}
              </div>
              <h3 className="text-xl font-bold text-white mt-4">{t("sections.templates.t912.title")}</h3>
              <p className="text-gray-400 mt-3 leading-relaxed">{t("sections.templates.t912.desc")}</p>
            </div>
          </div>
        </div>
      </section>

      <section id="ranking-badges" className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-white mb-4">{t("sections.rankingBadges.title")}</h2>
            <p className="text-gray-400">{t("sections.rankingBadges.subtitle")}</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="bg-brand-primary border border-white/5 rounded-3xl p-9">
              <div className="inline-flex items-center gap-2 text-brand-accent text-sm font-semibold">
                <Trophy className="w-4 h-4" />
                {t("sections.rankingBadges.leaderboard.badge")}
              </div>
              <h3 className="text-2xl font-bold text-white mt-4">{t("sections.rankingBadges.leaderboard.title")}</h3>
              <p className="text-gray-400 mt-3 leading-relaxed">{t("sections.rankingBadges.leaderboard.desc")}</p>
              <div className="mt-6 space-y-2 text-gray-300 text-sm">
                <div className="flex items-start gap-3"><CheckCircle2 className="w-5 h-5 text-brand-accent mt-0.5" />{t("sections.rankingBadges.leaderboard.b1")}</div>
                <div className="flex items-start gap-3"><CheckCircle2 className="w-5 h-5 text-brand-accent mt-0.5" />{t("sections.rankingBadges.leaderboard.b2")}</div>
                <div className="flex items-start gap-3"><CheckCircle2 className="w-5 h-5 text-brand-accent mt-0.5" />{t("sections.rankingBadges.leaderboard.b3")}</div>
              </div>
            </div>
            <div className="bg-brand-primary border border-white/5 rounded-3xl p-9">
              <div className="inline-flex items-center gap-2 text-brand-accent text-sm font-semibold">
                <Medal className="w-4 h-4" />
                {t("sections.rankingBadges.badges.badge")}
              </div>
              <h3 className="text-2xl font-bold text-white mt-4">{t("sections.rankingBadges.badges.title")}</h3>
              <p className="text-gray-400 mt-3 leading-relaxed">{t("sections.rankingBadges.badges.desc")}</p>
              <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm text-gray-200">
                <div className="bg-white/5 border border-white/5 rounded-2xl px-4 py-3">{t("sections.rankingBadges.badges.i1")}</div>
                <div className="bg-white/5 border border-white/5 rounded-2xl px-4 py-3">{t("sections.rankingBadges.badges.i2")}</div>
                <div className="bg-white/5 border border-white/5 rounded-2xl px-4 py-3">{t("sections.rankingBadges.badges.i3")}</div>
                <div className="bg-white/5 border border-white/5 rounded-2xl px-4 py-3">{t("sections.rankingBadges.badges.i4")}</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="reward-store" className="py-24 bg-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
            <div>
              <h2 className="text-3xl font-bold text-white">{t("sections.rewardStore.title")}</h2>
              <p className="text-gray-400 mt-4 leading-relaxed">{t("sections.rewardStore.subtitle")}</p>
              <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm text-gray-200">
                <div className="bg-brand-primary border border-white/5 rounded-2xl px-4 py-3">{t("sections.rewardStore.q1")}</div>
                <div className="bg-brand-primary border border-white/5 rounded-2xl px-4 py-3">{t("sections.rewardStore.q2")}</div>
                <div className="bg-brand-primary border border-white/5 rounded-2xl px-4 py-3">{t("sections.rewardStore.q3")}</div>
                <div className="bg-brand-primary border border-white/5 rounded-2xl px-4 py-3">{t("sections.rewardStore.q4")}</div>
              </div>
              <div className="mt-8 space-y-2 text-sm text-gray-300">
                <div className="flex items-start gap-3"><CheckCircle2 className="w-5 h-5 text-brand-accent mt-0.5" />{t("sections.rewardStore.b1")}</div>
                <div className="flex items-start gap-3"><CheckCircle2 className="w-5 h-5 text-brand-accent mt-0.5" />{t("sections.rewardStore.b2")}</div>
                <div className="flex items-start gap-3"><CheckCircle2 className="w-5 h-5 text-brand-accent mt-0.5" />{t("sections.rewardStore.b3")}</div>
              </div>
              <div className="mt-10 flex flex-col sm:flex-row gap-4">
                <Link
                  href="/products/star-points/rewards-sample"
                  className="inline-flex items-center justify-center bg-white/10 hover:bg-white/20 text-white border border-white/10 px-7 py-3 rounded-full font-semibold transition-colors"
                >
                  {t("sections.rewardStore.ctaSample")}
                </Link>
                <Link
                  href="/pricing"
                  className="inline-flex items-center justify-center bg-brand-accent text-brand-dark px-7 py-3 rounded-full font-semibold hover:bg-brand-accent/90 transition-colors"
                >
                  {t("sections.rewardStore.ctaPricing")}
                </Link>
              </div>
            </div>
            <div className="bg-brand-primary border border-white/5 rounded-3xl p-9">
              <div className="w-12 h-12 rounded-xl bg-brand-accent/10 flex items-center justify-center mb-6">
                <Store className="w-6 h-6 text-brand-accent" />
              </div>
              <div className="text-white font-bold text-xl">{t("sections.rewardStore.card.title")}</div>
              <div className="text-gray-400 mt-3 leading-relaxed">{t("sections.rewardStore.card.desc")}</div>
              <div className="mt-6 grid grid-cols-1 gap-3 text-sm text-gray-200">
                <div className="bg-white/5 border border-white/5 rounded-2xl px-4 py-3">{t("sections.rewardStore.card.i1")}</div>
                <div className="bg-white/5 border border-white/5 rounded-2xl px-4 py-3">{t("sections.rewardStore.card.i2")}</div>
                <div className="bg-white/5 border border-white/5 rounded-2xl px-4 py-3">{t("sections.rewardStore.card.i3")}</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="coupon" className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
            <div>
              <h2 className="text-3xl font-bold text-white">{t("sections.tools.title")}</h2>
              <p className="text-gray-400 mt-4 leading-relaxed">{t("sections.tools.subtitle")}</p>
              <div className="mt-8 space-y-3">
                <div className="flex items-start gap-3 text-gray-300">
                  <CheckCircle2 className="w-5 h-5 text-brand-accent mt-0.5" />
                  <span>{t("sections.tools.b1")}</span>
                </div>
                <div className="flex items-start gap-3 text-gray-300">
                  <CheckCircle2 className="w-5 h-5 text-brand-accent mt-0.5" />
                  <span>{t("sections.tools.b2")}</span>
                </div>
                <div className="flex items-start gap-3 text-gray-300">
                  <CheckCircle2 className="w-5 h-5 text-brand-accent mt-0.5" />
                  <span>{t("sections.tools.b3")}</span>
                </div>
              </div>
            </div>

            <div className="bg-brand-primary border border-white/5 rounded-3xl p-9">
              <div className="w-12 h-12 rounded-xl bg-brand-accent/10 flex items-center justify-center mb-6">
                <Gift className="w-6 h-6 text-brand-accent" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">{t("sections.tools.card.title")}</h3>
              <p className="text-gray-400 leading-relaxed">{t("sections.tools.card.desc")}</p>
            </div>
          </div>
        </div>
      </section>

      <section id="theory-assessments" className="py-24 bg-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-white mb-4">{t("sections.theory.title")}</h2>
            <p className="text-gray-400">{t("sections.theory.subtitle")}</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="bg-brand-primary border border-white/5 rounded-3xl p-9">
              <div className="text-white font-semibold">{t("sections.theory.pillars.title")}</div>
              <div className="mt-6 space-y-3 text-gray-300">
                <div className="flex items-start gap-3"><CheckCircle2 className="w-5 h-5 text-brand-accent mt-0.5" />{t("sections.theory.pillars.b1")}</div>
                <div className="flex items-start gap-3"><CheckCircle2 className="w-5 h-5 text-brand-accent mt-0.5" />{t("sections.theory.pillars.b2")}</div>
                <div className="flex items-start gap-3"><CheckCircle2 className="w-5 h-5 text-brand-accent mt-0.5" />{t("sections.theory.pillars.b3")}</div>
              </div>
              <div className="mt-6 text-xs text-gray-500">{t("sections.theory.note")}</div>
            </div>
            <div className="bg-brand-primary border border-white/5 rounded-3xl p-9">
              <div className="text-white font-semibold">{t("sections.theory.assessments.title")}</div>
              <div className="mt-6 grid grid-cols-1 gap-3 text-sm text-gray-200">
                <div className="bg-white/5 border border-white/5 rounded-2xl px-4 py-3">
                  <div className="text-white font-semibold">{t("sections.theory.assessments.a1.title")}</div>
                  <div className="text-gray-400 mt-1">{t("sections.theory.assessments.a1.desc")}</div>
                </div>
                <div className="bg-white/5 border border-white/5 rounded-2xl px-4 py-3">
                  <div className="text-white font-semibold">{t("sections.theory.assessments.a2.title")}</div>
                  <div className="text-gray-400 mt-1">{t("sections.theory.assessments.a2.desc")}</div>
                </div>
                <div className="bg-white/5 border border-white/5 rounded-2xl px-4 py-3">
                  <div className="text-white font-semibold">{t("sections.theory.assessments.a3.title")}</div>
                  <div className="text-gray-400 mt-1">{t("sections.theory.assessments.a3.desc")}</div>
                </div>
              </div>
              <div className="mt-6 text-sm text-gray-300">{t("sections.theory.assessments.output")}</div>
            </div>
          </div>
        </div>
      </section>

      <section id="ai-coach" className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-white mb-4">{t("sections.coach.title")}</h2>
            <p className="text-gray-400">{t("sections.coach.subtitle")}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-brand-primary border border-white/5 rounded-2xl p-8">
              <div className="w-12 h-12 rounded-xl bg-brand-accent/10 flex items-center justify-center mb-6">
                <HeartHandshake className="w-6 h-6 text-brand-accent" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">{t("sections.coach.p1.title")}</h3>
              <p className="text-gray-400 leading-relaxed">{t("sections.coach.p1.desc")}</p>
            </div>

            <div className="bg-brand-primary border border-white/5 rounded-2xl p-8">
              <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center mb-6">
                <Target className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">{t("sections.coach.p2.title")}</h3>
              <p className="text-gray-400 leading-relaxed">{t("sections.coach.p2.desc")}</p>
            </div>

            <div className="bg-brand-primary border border-white/5 rounded-2xl p-8">
              <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center mb-6">
                <Scale className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">{t("sections.coach.p3.title")}</h3>
              <p className="text-gray-400 leading-relaxed">{t("sections.coach.p3.desc")}</p>
            </div>

            <div className="bg-brand-primary border border-white/5 rounded-2xl p-8">
              <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center mb-6">
                <FileText className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">{t("sections.coach.p4.title")}</h3>
              <p className="text-gray-400 leading-relaxed">{t("sections.coach.p4.desc")}</p>
            </div>

            <div className="bg-brand-primary border border-white/5 rounded-2xl p-8 md:col-span-2 lg:col-span-2">
              <div className="w-12 h-12 rounded-xl bg-brand-accent/10 flex items-center justify-center mb-6">
                <Sparkles className="w-6 h-6 text-brand-accent" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">{t("sections.coach.p5.title")}</h3>
              <p className="text-gray-400 leading-relaxed">{t("sections.coach.p5.desc")}</p>
            </div>
          </div>
        </div>
      </section>

      <section id="weekly-report" className="py-24 bg-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-white mb-4">{t("sections.report.title")}</h2>
            <p className="text-gray-400">{t("sections.report.subtitle")}</p>
          </div>

          <div className="bg-brand-primary border border-white/5 rounded-3xl overflow-hidden">
            <div className="px-8 py-6 border-b border-white/5 flex items-center justify-between">
              <div className="text-white font-semibold">{t("sections.report.card.title")}</div>
              <div className="text-xs text-gray-400">{t("sections.report.card.badge")}</div>
            </div>
            <div className="p-8 grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="bg-white/5 border border-white/5 rounded-2xl p-6">
                <div className="text-sm text-gray-400">{t("sections.report.card.kpis.title")}</div>
                <div className="mt-3 space-y-2 text-gray-200">
                  <div>{t("sections.report.card.kpis.i1")}</div>
                  <div>{t("sections.report.card.kpis.i2")}</div>
                  <div>{t("sections.report.card.kpis.i3")}</div>
                </div>
              </div>
              <div className="bg-white/5 border border-white/5 rounded-2xl p-6">
                <div className="text-sm text-gray-400">{t("sections.report.card.highlights.title")}</div>
                <div className="mt-3 space-y-2 text-gray-200">
                  <div>{t("sections.report.card.highlights.i1")}</div>
                  <div>{t("sections.report.card.highlights.i2")}</div>
                  <div>{t("sections.report.card.highlights.i3")}</div>
                </div>
              </div>
              <div className="bg-white/5 border border-white/5 rounded-2xl p-6">
                <div className="text-sm text-gray-400">{t("sections.report.card.next.title")}</div>
                <div className="mt-3 space-y-2 text-gray-200">
                  <div>{t("sections.report.card.next.i1")}</div>
                  <div>{t("sections.report.card.next.i2")}</div>
                  <div>{t("sections.report.card.next.i3")}</div>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-10 flex justify-center">
            <Link
              href="/products/star-points/report-sample"
              className="inline-flex items-center justify-center bg-white/10 hover:bg-white/20 text-white border border-white/10 px-7 py-3 rounded-full font-semibold transition-colors"
            >
              {t("sections.report.ctaSample")}
            </Link>
          </div>
        </div>
      </section>

      <section className="py-24">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-yellow-500/10 text-yellow-400 border border-yellow-500/20 mb-6">
            <Bell className="w-4 h-4" />
            <span className="text-sm font-semibold">{t("status.badge")}</span>
          </div>
          <h2 className="text-3xl font-bold text-white mb-6">{t("status.title")}</h2>
          <p className="text-lg text-gray-400 mb-8">{t("status.desc")}</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/contact?from=starPoints&subject=Star-Points%20%E5%85%8D%E8%B4%B9%E5%BC%80%E5%A7%8B%E4%BD%BF%E7%94%A8"
              className="inline-flex items-center justify-center gap-2 bg-brand-accent text-brand-dark px-8 py-4 rounded-full font-semibold hover:bg-brand-accent/90 transition-colors"
            >
              {t("hero.cta1")}
            </Link>
            <Link
              href="/pricing"
              className="inline-flex items-center justify-center gap-2 bg-white/10 text-white border border-white/10 px-8 py-4 rounded-full font-semibold hover:bg-white/20 transition-colors"
            >
              {t("sections.cta.pricing")}
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
