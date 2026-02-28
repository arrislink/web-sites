import { OFFERS, type Offer, type OfferKind, type OfferPlatform, type OfferStatus } from "./offers";

export type ProductMetadata = Readonly<{
  id: Offer["id"];
  kind: OfferKind;
  status: OfferStatus;
  platform: OfferPlatform;
  route: string;
}>;

export const PRODUCTS: ProductMetadata[] = OFFERS.filter((o) => o.kind === "product").map((o) => ({
  id: o.id,
  kind: o.kind,
  status: o.status,
  platform: o.platform,
  route: o.href,
}));

export const SOLUTIONS: ProductMetadata[] = OFFERS.filter((o) => o.kind === "solution").map((o) => ({
  id: o.id,
  kind: o.kind,
  status: o.status,
  platform: o.platform,
  route: o.href,
}));

export { OFFERS } from "./offers";
