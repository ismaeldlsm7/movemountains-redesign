export const DS = {
  bg: "var(--mm-bg)",
  surface: "var(--mm-surface)",
  surfaceAlt: "var(--mm-surface-alt)",
  text: "var(--mm-text)",
  textSec: "var(--mm-text-sec)",
  gold: "var(--mm-gold)",
  ember: "var(--mm-ember)",
  border: "var(--mm-border)",
  // For nested-property usage like DS.colors.bg in homepage
  colors: {
    bg: "var(--mm-bg)",
    surface: "var(--mm-surface)",
    surfaceAlt: "var(--mm-surface-alt)",
    text: "var(--mm-text)",
    textSec: "var(--mm-text-sec)",
    gold: "var(--mm-gold)",
    goldHover: "var(--mm-gold-hover)",
    ember: "var(--mm-ember)",
    border: "var(--mm-border)",
  },
};

export const fontLink = "https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,700;1,400&family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;0,700;1,400;1,500&family=DM+Sans:wght@400;500;600;700&family=Bebas+Neue&display=swap";

export const navSections = [
  { label: "Portfolio", href: "/portfolio", subs: [
    { label: "All Stories", href: "/portfolio" }, { label: "Classic", href: "/portfolio?style=classic" },
    { label: "Cinematic", href: "/portfolio?style=cinematic" }, { label: "Moody", href: "/portfolio?style=moody" }, { label: "Bright", href: "/portfolio?style=bright" },
  ]},
  { label: "About", href: "/about", subs: [
    { label: "Our Story", href: "/about" }, { label: "The Crew", href: "/team" }, { label: "Academy", href: "/academy" }, { label: "Careers", href: "/careers" },
  ]},
  { label: "Services", href: "/services", subs: [
    { label: "Photography", href: "/photography" }, { label: "Videography", href: "/videography" }, { label: "Super 8 Film", href: "/super8" },
    { label: "Content Creation", href: "/content-creation" }, { label: "Luxe Booth", href: "/luxebooth" }, { label: "Albums", href: "/albums" }, { label: "Live Streaming", href: "/livestreaming" },
    { label: "Photo Looks", href: "/looks" }, { label: "Video Looks", href: "/video-looks" },
  ]},
  { label: "Investment", href: "/investment" },
  { label: "Blog", href: "/blog" },
  { label: "Contact", href: "/contact" },
];

export const socialLinks = [
  { abbr: "IG", href: "https://instagram.com/movemountainsco", followers: "43K" },
  { abbr: "FB", href: "https://facebook.com/movemountainsco", followers: "5.7K" },
  { abbr: "TK", href: "#", followers: "—" },
  { abbr: "VM", href: "#", followers: "—" },
];
