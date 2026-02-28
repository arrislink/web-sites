import { GatewayHero } from "@/components/sections/GatewayHero";
import { AudienceSection } from "@/components/sections/AudienceSection";
import { ProcessSection } from "@/components/sections/ProcessSection";
import { ValueProps } from "@/components/sections/ValueProps";
import { HomeOffers } from "@/components/sections/HomeOffers";
import { setRequestLocale } from 'next-intl/server';

export default async function Home({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  return (
    <>
      <GatewayHero />
      <AudienceSection />
      <ValueProps />
      <ProcessSection />
      <HomeOffers />
    </>
  );
}
