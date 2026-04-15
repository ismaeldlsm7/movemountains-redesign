/* ── Move Mountains Co. — Upsell / Order Bump Definitions ─────── */
/* One contextual offer per package, shown in Step 6 before payment. */

export const UPSELL_OFFERS = {
  essentials: {
    id: "second-photographer",
    type: "addon",                    // adds to selectedAddOns
    badge: "Most requested add-on",
    headline: "Don't miss a single moment",
    subhead: "Add a Second Photographer",
    pitch:
      "Two photographers means every angle is covered — from the altar to the dance floor, getting ready to the last dance. Strongly recommended for venues with multiple levels or 150+ guests.",
    priceInCents: 75000,
    displayPrice: "750",
    icon: "◎",
    cta: "Yes — add a second photographer",
    decline: "No thanks, one photographer is fine",
  },

  signature: {
    id: "cinematic-upgrade",
    type: "package-upgrade",          // swaps selectedPackage
    targetPackage: "cinematic",
    badge: "Complete the story",
    headline: "From photos to a film",
    subhead: "Upgrade to Cinematic — Photo + Film",
    pitch:
      "You already have two photographers and a premium album. Add a cinematographer and a 4–6 minute highlight film. Relive the vows, the toasts, and every moment in between. Forever.",
    priceInCents: 310000,             // delta: 850,000 − 540,000
    displayPrice: "3,100",
    icon: "◉",
    cta: "Yes — upgrade to Cinematic",
    ctaSuffix: "+$3,100",
    decline: "No thanks, photography only",
  },

  cinematic: {
    id: "super8",
    type: "addon",
    badge: "Exclusive add-on",
    headline: "Something truly timeless",
    subhead: "Add Super 8 Film",
    pitch:
      "Real analog film, shot on vintage Super 8mm cameras, lab-processed and digitally scanned. A 3–4 minute highlight reel on genuine film grain. There's nothing else like it.",
    priceInCents: 120000,
    displayPrice: "1,200",
    icon: "⬤",
    cta: "Yes — add Super 8 film",
    decline: "No thanks",
  },
};

/**
 * Returns the upsell offer for a given package, or null if:
 *  - No offer exists for this package
 *  - The item is already in the client's selectedAddOns
 *  - It's a package-upgrade offer but the client already has that package
 */
export function getUpsellOffer(packageId, selectedAddOnIds = []) {
  const offer = UPSELL_OFFERS[packageId];
  if (!offer) return null;
  if (offer.type === "addon" && selectedAddOnIds.includes(offer.id)) return null;
  return offer;
}
