export const MOCK_LINKS = [
  { id: "lnk-001", label: "Our Portfolio",     url: "/portfolio",                             icon: "portfolio", enabled: true,  order: 1,  clicks: 3842 },
  { id: "lnk-002", label: "Book a Date",        url: "/book",                                  icon: "calendar",  enabled: true,  order: 2,  clicks: 2109 },
  { id: "lnk-003", label: "Services & Pricing", url: "/investment",                            icon: "dollar",    enabled: true,  order: 3,  clicks: 1774 },
  { id: "lnk-004", label: "Photography",         url: "/photography",                           icon: "camera",    enabled: true,  order: 4,  clicks: 987  },
  { id: "lnk-005", label: "Videography",         url: "/videography",                           icon: "film",      enabled: true,  order: 5,  clicks: 814  },
  { id: "lnk-006", label: "Super 8 Film",        url: "/super8",                                icon: "film",      enabled: true,  order: 6,  clicks: 412  },
  { id: "lnk-007", label: "Client Portal",       url: "/portal",                                icon: "globe",     enabled: true,  order: 7,  clicks: 1341 },
  { id: "lnk-008", label: "The Knot",            url: "https://www.theknot.com/marketplace/move-mountains-co-providence-ri-2078489", icon: "heart", enabled: true, order: 8, clicks: 602 },
  { id: "lnk-009", label: "WeddingWire",         url: "https://www.weddingwire.com/biz/move-mountains-co/3a1b2c3d4e5f.html",         icon: "heart", enabled: true, order: 9, clicks: 388 },
  { id: "lnk-010", label: "Instagram",           url: "https://instagram.com/movemountainsco", icon: "instagram", enabled: true,  order: 10, clicks: 5231 },
  { id: "lnk-011", label: "Vimeo",              url: "https://vimeo.com/movemountainsco",     icon: "vimeo",     enabled: true,  order: 11, clicks: 1088 },
  { id: "lnk-012", label: "MMC Academy",         url: "/academy",                               icon: "book",      enabled: false, order: 12, clicks: 203  },
];

export const LINK_STATS = {
  total: MOCK_LINKS.length,
  active: MOCK_LINKS.filter((l) => l.enabled).length,
  totalClicks: MOCK_LINKS.reduce((sum, l) => sum + l.clicks, 0),
};

export const PUBLIC_URL = "https://mmc.social/links";

export const SHARE_PLATFORMS = [
  {
    id: "instagram",
    label: "Instagram",
    source: "instagram",
    medium: "social",
    campaign: "link_in_bio",
  },
  {
    id: "tiktok",
    label: "TikTok",
    source: "tiktok",
    medium: "social",
    campaign: "link_in_bio",
  },
  {
    id: "facebook",
    label: "Facebook",
    source: "facebook",
    medium: "social",
    campaign: "link_in_bio",
  },
  {
    id: "email",
    label: "Email / DM",
    source: "email",
    medium: "email",
    campaign: "bio_link",
  },
];

export const buildUTM = (platform) =>
  `${PUBLIC_URL}?utm_source=${platform.source}&utm_medium=${platform.medium}&utm_campaign=${platform.campaign}`;
