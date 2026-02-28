export type OfferId =
  | "institution-edition"
  | "private-deploy"
  | "kid-story"
  | "bio-prism"
  | "smart-read"
  | "smart-resume"
  | "star-points";

export type OfferKind = "product" | "solution" | "lab";

export type OfferStatus = "flagship" | "available" | "incubating" | "lab";

export type OfferPlatform = "web" | "miniprogram" | "app" | "hybrid";

export type OfferProductSegment = "module" | "showcase" | "reference";

export type BaseOffer = Readonly<{
  id: OfferId;
  kind: OfferKind;
  status: OfferStatus;
  platform: OfferPlatform;
  href: string;
  image?: string;
  i18n: Readonly<{
    titleKey: string;
    subtitleKey?: string;
    descriptionKey?: string;
    badgeKey?: string;
  }>;
}>;

export type ProductOffer = BaseOffer &
  Readonly<{
    kind: "product";
    segment: OfferProductSegment;
  }>;

export type SolutionOffer = BaseOffer &
  Readonly<{
    kind: "solution";
  }>;

export type Offer = ProductOffer | SolutionOffer;

export const OFFERS: readonly Offer[] = [
  {
    id: "institution-edition",
    kind: "solution",
    status: "available",
    platform: "web",
    href: "/solutions",
    image: "/images/content-creation-3d.png",
    i18n: {
      titleKey: "offers.institution.title",
      subtitleKey: "offers.institution.subtitle",
      descriptionKey: "offers.institution.description",
      badgeKey: "offers.institution.badge",
    },
  },
  {
    id: "private-deploy",
    kind: "solution",
    status: "available",
    platform: "hybrid",
    href: "/solutions/private-ai",
    image: "/images/private-ai-3d.png",
    i18n: {
      titleKey: "offers.privateDeploy.title",
      subtitleKey: "offers.privateDeploy.subtitle",
      descriptionKey: "offers.privateDeploy.description",
      badgeKey: "offers.privateDeploy.badge",
    },
  },
  {
    id: "smart-read",
    kind: "product",
    segment: "module",
    status: "flagship",
    platform: "web",
    href: "/products/smart-read",
    image: "/images/smart-chat-3d.png",
    i18n: {
      titleKey: "offers.smartRead.title",
      subtitleKey: "offers.smartRead.subtitle",
      descriptionKey: "offers.smartRead.description",
      badgeKey: "offers.smartRead.badge",
    },
  },
  {
    id: "star-points",
    kind: "product",
    segment: "reference",
    status: "incubating",
    platform: "miniprogram",
    href: "/products/star-points",
    image: "/images/hero-bg.png",
    i18n: {
      titleKey: "offers.starPoints.title",
      subtitleKey: "offers.starPoints.subtitle",
      descriptionKey: "offers.starPoints.description",
      badgeKey: "offers.starPoints.badge",
    },
  },
  {
    id: "bio-prism",
    kind: "product",
    segment: "showcase",
    status: "available",
    platform: "web",
    href: "/products/bio-prism",
    image: "/images/biography.png",
    i18n: {
      titleKey: "offers.bioPrism.title",
      subtitleKey: "offers.bioPrism.subtitle",
      descriptionKey: "offers.bioPrism.description",
      badgeKey: "offers.bioPrism.badge",
    },
  },
  {
    id: "kid-story",
    kind: "product",
    segment: "showcase",
    status: "available",
    platform: "app",
    href: "/products/kid-story",
    image: "/images/kids-book.png",
    i18n: {
      titleKey: "offers.kidStory.title",
      subtitleKey: "offers.kidStory.subtitle",
      descriptionKey: "offers.kidStory.description",
      badgeKey: "offers.kidStory.badge",
    },
  },
  {
    id: "smart-resume",
    kind: "product",
    segment: "module",
    status: "available",
    platform: "web",
    href: "/products/smart-resume",
    image: "/images/resume.png",
    i18n: {
      titleKey: "offers.smartResume.title",
      subtitleKey: "offers.smartResume.subtitle",
      descriptionKey: "offers.smartResume.description",
      badgeKey: "offers.smartResume.badge",
    },
  },
] as const;

export function getOffersByKind(kind: OfferKind): Offer[] {
  return OFFERS.filter((o) => o.kind === kind);
}

export function getOffersForMainNav(): Offer[] {
  return OFFERS.filter((o) => o.kind === "solution");
}
