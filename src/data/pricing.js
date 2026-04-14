/* ── Move Mountains Co. — Centralized Pricing Data ──────────────── */
/* Single source of truth for all pricing across the website and dashboard. */
/* Prices stored in cents for Stripe compatibility. displayPrice for UI. */

export const PACKAGES = [
  {
    id: "essentials",
    name: "Essentials",
    subtitle: "The Foundation",
    priceInCents: 320000,
    displayPrice: "3,200",
    description: "Everything you need to capture the day beautifully. Perfect for intimate weddings and couples who want one dedicated photographer telling their story from start to finish.",
    hours: "6",
    photographers: "1",
    popular: false,
    features: [
      { text: "6 hours of coverage", included: true },
      { text: "1 dedicated photographer", included: true },
      { text: "Complimentary engagement session", included: true },
      { text: "Online gallery with print ordering", included: true },
      { text: "All photos delivered digitally", included: true },
      { text: "Choice of 5 editing styles", included: true },
      { text: "~600 images delivered", included: true },
      { text: "Second photographer", included: false },
      { text: "Custom wedding album", included: false },
      { text: "Videography", included: false },
    ],
  },
  {
    id: "signature",
    name: "Signature",
    subtitle: "Our Most Popular",
    priceInCents: 540000,
    displayPrice: "5,400",
    description: "The complete MMC experience. Two photographers capturing every angle, extended coverage from getting ready through the last dance, and a premium album to hold forever.",
    hours: "8–10",
    photographers: "2",
    popular: true,
    features: [
      { text: "8–10 hours of coverage", included: true },
      { text: "2 dedicated photographers", included: true },
      { text: "Complimentary engagement session", included: true },
      { text: "Online gallery with print ordering", included: true },
      { text: "All photos delivered digitally", included: true },
      { text: "Choice of 5 editing styles", included: true },
      { text: "~800–1,000 images delivered", included: true },
      { text: "Custom lay-flat wedding album", included: true },
      { text: "Sneak peek within 3 days", included: true },
      { text: "Videography", included: false },
    ],
  },
  {
    id: "cinematic",
    name: "Cinematic",
    subtitle: "Photo + Film",
    priceInCents: 850000,
    displayPrice: "8,500",
    description: "The full story — captured in both stills and motion. Everything in Signature, plus a cinematic wedding film that lets you relive the vows, the toasts, and every moment in between.",
    hours: "10+",
    photographers: "2 + Cinematographer",
    popular: false,
    features: [
      { text: "10+ hours of full-day coverage", included: true },
      { text: "2 photographers + 1 cinematographer", included: true },
      { text: "Complimentary engagement session", included: true },
      { text: "Online gallery with print ordering", included: true },
      { text: "~1,000+ images delivered", included: true },
      { text: "Choice of 5 editing styles", included: true },
      { text: "Custom lay-flat wedding album", included: true },
      { text: "4–6 min cinematic highlight film", included: true },
      { text: "Full ceremony film", included: true },
      { text: "4K delivery", included: true },
    ],
  },
];

export const ADD_ONS = [
  { id: "second-photographer", name: "Second Photographer", priceInCents: 75000, displayPrice: "750", priceType: "flat", desc: "Add a second angle to any single-photographer package. Recommended for weddings with 150+ guests or multiple locations.", icon: "◎" },
  { id: "super8", name: "Super 8 Film", priceInCents: 120000, displayPrice: "1,200", priceType: "flat", desc: "Real analog film shot on vintage Super 8mm cameras. Lab-processed, digitally scanned. 3–4 minute highlight reel.", icon: "◉" },
  { id: "content-creation", name: "Content Creation", priceInCents: 90000, displayPrice: "900", priceType: "flat", desc: "Dedicated content creator for vertical video, same-day stories, and social-first behind-the-scenes coverage.", icon: "✦" },
  { id: "luxebooth", name: "Luxe Booth", priceInCents: 110000, displayPrice: "1,100", priceType: "flat", desc: "4 hours of premium photo booth. High-quality prints, Airdrop sharing, custom branding. Zero cheesy props.", icon: "□" },
  { id: "livestreaming", name: "Live Streaming", priceInCents: 60000, displayPrice: "600", priceType: "flat", desc: "Professional HD broadcast of your ceremony with private, secure link. No app required for viewers.", icon: "◈" },
  { id: "extra-hours", name: "Extra Hours", priceInCents: 35000, displayPrice: "350/hr", priceType: "per_hour", desc: "Extend your coverage beyond your package. Available for both photography and videography.", icon: "+" },
  { id: "custom-album", name: "Custom Album", priceInCents: 80000, displayPrice: "800", pricePrefix: "From ", priceType: "starting", desc: "Lay-flat premium wedding album. Choose from multiple sizes, cover materials, and page counts.", icon: "▣" },
  { id: "rehearsal", name: "Rehearsal Coverage", priceInCents: 50000, displayPrice: "500", priceType: "flat", desc: "Photographer present at your rehearsal dinner to capture the night-before moments and vendor setups.", icon: "◇" },
];

// Add-ons that are already included in each package
export const PACKAGE_INCLUDED_ADDONS = {
  essentials: [],
  signature: ["second-photographer", "custom-album"],
  cinematic: ["second-photographer", "custom-album"],
};

export function getIncludedAddOns(packageId) {
  return PACKAGE_INCLUDED_ADDONS[packageId] || [];
}

export const ALBUMS = [
  {
    id: "classic",
    name: "The Classic",
    size: '10×10"',
    pages: "20 spreads (40 pages)",
    cover: "Linen",
    priceInCents: 80000,
    displayPrice: "800",
    pricePrefix: "From ",
    color: "#2a2622",
    popular: false,
    features: [
      "Lay-flat binding — images span the full spread with no gutter",
      "Thick, rigid pages — museum-quality paper stock",
      "Linen cover in 12 color options",
      "Custom debossing of names and date",
      "Archival quality — designed to last generations",
      "Presentation box included",
    ],
  },
  {
    id: "heirloom",
    name: "The Heirloom",
    size: '12×12"',
    pages: "30 spreads (60 pages)",
    cover: "Genuine Leather",
    priceInCents: 120000,
    displayPrice: "1,200",
    pricePrefix: "From ",
    color: "#201e1a",
    popular: true,
    features: [
      "Premium lay-flat binding on thick, rigid pages",
      "Genuine leather cover — 8 color options",
      "Foil stamping in gold, silver, or copper",
      "Gilded page edges available",
      "Archival inks and paper — 100+ year lifespan",
      "Linen-lined presentation box",
      "Up to 30 spreads of editorial-curated images",
    ],
  },
  {
    id: "keepsake",
    name: "The Keepsake",
    size: '8×8"',
    pages: "15 spreads (30 pages)",
    cover: "Soft Touch",
    priceInCents: 50000,
    displayPrice: "500",
    pricePrefix: "From ",
    color: "#1e2020",
    popular: false,
    features: [
      "Compact format — perfect for parents and gifts",
      "Soft-touch matte cover with full-bleed photo wrap",
      "Lay-flat pages, same quality as our larger albums",
      "Clean, modern design aesthetic",
      "Matching design to your main album available",
      "Ideal as parent albums or anniversary gifts",
    ],
  },
];

export const LIVESTREAMING_PACKAGES = [
  { id: "single-camera", name: "Single Camera", priceInCents: 60000, displayPrice: "600", features: ["Full ceremony broadcast", "Private secure link", "Recording available for 30 days"] },
  { id: "multi-camera", name: "Multi-Camera", priceInCents: 95000, displayPrice: "950", features: ["Two angles with live switching", "Private secure link", "Recording available for 30 days"] },
];

export const LUXEBOOTH_PACKAGES = [
  {
    id: "standard",
    name: "Standard",
    hours: "3",
    priceInCents: 90000,
    displayPrice: "900",
    popular: false,
    includes: ["3 hours of booth time", "High-quality instant prints", "Digital gallery of all photos", "Airdrop + SMS sharing", "Standard backdrop", "On-site attendant"],
  },
  {
    id: "premium",
    name: "Premium",
    hours: "4",
    priceInCents: 110000,
    displayPrice: "1,100",
    popular: true,
    includes: ["4 hours of booth time", "High-quality instant prints", "Digital gallery of all photos", "Airdrop + SMS + Email sharing", "Custom branded overlay", "Custom backdrop design", "On-site attendant", "Guest book integration"],
  },
];

export const TRAVEL_FEES = {
  included: { maxMiles: 60, feeInCents: 0, displayFee: "0", description: "Venues within 60 miles of Providence, RI are included at no extra charge." },
  tier1: { minMiles: 60, maxMiles: 100, feeInCents: 20000, displayFee: "200", description: "60–100 miles: $200 travel fee." },
  tier2: { minMiles: 100, maxMiles: null, feeInCents: 30000, displayFee: "300", description: "Beyond 100 miles: $300 fee. May require overnight accommodations. Destination weddings quoted separately." },
};

export const PAYMENT_TERMS = {
  retainerPercent: 30,
  balanceDueDaysBefore: 30,
  paymentPlanMinimumInCents: 500000,
  paymentPlanInstallments: [3, 4],
};

export const ELOPEMENT_STARTING_PRICE = {
  priceInCents: 220000,
  displayPrice: "2,200",
};

/* ── Helpers ──────────────────────────────────────────────────────── */

export function formatPrice(cents) {
  return (cents / 100).toLocaleString("en-US");
}

export function getPackageById(id) {
  return PACKAGES.find((p) => p.id === id);
}

export function getAddOnById(id) {
  return ADD_ONS.find((a) => a.id === id);
}

export function getAlbumById(id) {
  return ALBUMS.find((a) => a.id === id);
}

export function calculateRetainer(totalCents) {
  return Math.round(totalCents * (PAYMENT_TERMS.retainerPercent / 100));
}

export function calculateTotal(packageId, addOnIds = [], extraHours = 1) {
  const pkg = getPackageById(packageId);
  if (!pkg) return 0;
  const addOnsTotal = addOnIds.reduce((sum, id) => {
    const addon = getAddOnById(id);
    if (!addon) return sum;
    if (id === "extra-hours") return sum + addon.priceInCents * extraHours;
    return sum + addon.priceInCents;
  }, 0);
  return pkg.priceInCents + addOnsTotal;
}

export function isPaymentPlanEligible(totalCents) {
  return totalCents >= PAYMENT_TERMS.paymentPlanMinimumInCents;
}
