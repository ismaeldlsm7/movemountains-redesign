import { useEffect } from "react";
import { MOCK_LINKS } from "../dashboard/data/mockLinks";

/**
 * Replace with your actual hero photo URL (Bunny.net CDN or any hosted image).
 * Recommended: a cinematic wide-crop of a wedding moment, landscape or couple shot.
 * Ideal dimensions: 900×540px minimum, 16:9 or wider.
 */
const HERO_IMAGE =
  "https://images.unsplash.com/photo-1606800052052-a08af7148866?auto=format&fit=crop&w=900&q=70";

/* ── Icon map ─────────────────────────────────────────────────── */
const ICON_MAP = {
  portfolio: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="7" width="20" height="14" rx="2" />
      <path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2" />
    </svg>
  ),
  calendar: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="4" width="18" height="18" rx="2" />
      <path d="M16 2v4M8 2v4M3 10h18" />
    </svg>
  ),
  dollar: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <line x1="12" y1="1" x2="12" y2="23" />
      <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
    </svg>
  ),
  camera: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z" />
      <circle cx="12" cy="13" r="4" />
    </svg>
  ),
  film: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="2" width="20" height="20" rx="2.18" />
      <path d="M7 2v20M17 2v20M2 12h20M2 7h5M17 7h5M2 17h5M17 17h5" />
    </svg>
  ),
  globe: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" />
      <path d="M2 12h20" />
      <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
    </svg>
  ),
  heart: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M20.8 8.2a5.5 5.5 0 0 0-9.3-3.1A5.5 5.5 0 0 0 3 8.2c0 5.3 9 11.3 9 11.3s9-6 9-11.3z" />
    </svg>
  ),
  instagram: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="2" width="20" height="20" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" />
    </svg>
  ),
  vimeo: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M22 8.5c-.1 2.5-1.9 5.8-5.2 9.9C13.5 22.7 10.6 24 8.2 24c-2.2 0-4-2-5.5-6L1 12c-.5-2.2 0-3.3 1.6-3.3.7 0 1.7.5 3 1.5L7 8.8C8.9 6.3 11 5 13.4 5c1.8 0 2.9 1.2 3.4 3.5h0c.2.9.3 1.8.2 2.7" />
    </svg>
  ),
  book: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
      <path d="M4 4.5A2.5 2.5 0 0 1 6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5z" />
    </svg>
  ),
};

/* ── Social row ───────────────────────────────────────────────── */
const SOCIALS = [
  {
    label: "Instagram",
    href: "https://instagram.com/movemountainsco",
    icon: (
      <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="2" width="20" height="20" rx="5" />
        <circle cx="12" cy="12" r="4" />
        <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" />
      </svg>
    ),
  },
  {
    label: "Vimeo",
    href: "https://vimeo.com/movemountainsco",
    icon: (
      <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M22 8.5c-.1 2.5-1.9 5.8-5.2 9.9C13.5 22.7 10.6 24 8.2 24c-2.2 0-4-2-5.5-6L1 12c-.5-2.2 0-3.3 1.6-3.3.7 0 1.7.5 3 1.5L7 8.8C8.9 6.3 11 5 13.4 5c1.8 0 2.9 1.2 3.4 3.5h0c.2.9.3 1.8.2 2.7" />
      </svg>
    ),
  },
  {
    label: "Facebook",
    href: "https://facebook.com/movemountainsco",
    icon: (
      <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
      </svg>
    ),
  },
  {
    label: "YouTube",
    href: "https://youtube.com/@movemountainsco",
    icon: (
      <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M22.54 6.42a2.78 2.78 0 0 0-1.95-1.97C18.88 4 12 4 12 4s-6.88 0-8.59.45A2.78 2.78 0 0 0 1.46 6.42 29 29 0 0 0 1 12a29 29 0 0 0 .46 5.58 2.78 2.78 0 0 0 1.95 1.97C5.12 20 12 20 12 20s6.88 0 8.59-.45a2.78 2.78 0 0 0 1.96-1.97A29 29 0 0 0 23 12a29 29 0 0 0-.46-5.58z" />
        <polygon points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02" fill="currentColor" stroke="none" />
      </svg>
    ),
  },
];

/* ── Page ─────────────────────────────────────────────────────── */
export default function LinkInBioPage() {
  useEffect(() => {
    document.title = "Move Mountains Co.";
    return () => { document.title = "Move Mountains Co."; };
  }, []);

  const activeLinks = MOCK_LINKS
    .filter((l) => l.enabled)
    .sort((a, b) => a.order - b.order);

  return (
    <div
      style={{
        minHeight: "100svh",
        background: "#0F0F0F",
        fontFamily: "'DM Sans', 'Inter', sans-serif",
        overflowX: "hidden",
      }}
    >
      {/* ── HERO ──────────────────────────────────────────────────── */}
      <div
        style={{
          position: "relative",
          width: "100%",
          height: 360,
          overflow: "hidden",
          /* CSS gradient fallback — always visible behind the photo */
          background:
            "radial-gradient(ellipse 80% 60% at 50% 20%, rgba(201,169,110,0.14) 0%, transparent 70%), " +
            "linear-gradient(180deg, #1f1408 0%, #170f06 40%, #100c05 70%, #0F0F0F 100%)",
        }}
      >
        {/* Background photo */}
        <img
          src={HERO_IMAGE}
          alt=""
          aria-hidden="true"
          loading="eager"
          onError={(e) => { e.currentTarget.style.display = "none"; }}
          style={{
            position: "absolute",
            inset: 0,
            width: "100%",
            height: "100%",
            objectFit: "cover",
            objectPosition: "center 35%",
            opacity: 0.45,
            mixBlendMode: "luminosity",
          }}
        />

        {/* Cinematic dark vignette */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "radial-gradient(ellipse 100% 100% at 50% 0%, rgba(0,0,0,0.15) 0%, rgba(0,0,0,0.65) 100%)",
          }}
        />

        {/* Gold warmth tint */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: "rgba(201, 169, 110, 0.05)",
          }}
        />

        {/* ↓ Gradient fade into page background — the transition */}
        <div
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            height: 200,
            background:
              "linear-gradient(to bottom, transparent 0%, rgba(15,15,15,0.7) 50%, #0F0F0F 100%)",
          }}
        />

        {/* Brand content — sits above all layers */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            zIndex: 2,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            /* push content into upper 60% — clear of the bottom gradient */
            paddingBottom: 120,
            gap: 14,
            textAlign: "center",
            padding: "0 24px 120px",
          }}
        >
          {/* Logo mark */}
          <div
            style={{
              width: 64,
              height: 64,
              borderRadius: "50%",
              background: "linear-gradient(135deg, #C9A96E 0%, #8a5a24 100%)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontFamily: "'Bebas Neue', 'Playfair Display', serif",
              fontSize: 30,
              color: "#0F0F0F",
              fontWeight: 700,
              letterSpacing: "0.02em",
              boxShadow: "0 0 0 6px rgba(201,169,110,0.12), 0 8px 32px rgba(0,0,0,0.5)",
              flexShrink: 0,
            }}
          >
            M
          </div>

          {/* Wordmark */}
          <h1
            style={{
              fontFamily: "'Playfair Display', Georgia, serif",
              fontSize: 26,
              fontWeight: 600,
              color: "#F0EDE8",
              margin: 0,
              letterSpacing: "0.025em",
              textShadow: "0 2px 16px rgba(0,0,0,0.6)",
            }}
          >
            Move Mountains Co.
          </h1>

          {/* Tagline */}
          <p
            style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: 11,
              color: "rgba(240,237,232,0.62)",
              margin: 0,
              letterSpacing: "0.14em",
              textTransform: "uppercase",
              textShadow: "0 1px 8px rgba(0,0,0,0.7)",
            }}
          >
            Rhode Island Wedding Photographers &amp; Videographers
          </p>
        </div>
      </div>

      {/* ── CONTENT ─────────────────────────────────────────────── */}
      <div
        style={{
          maxWidth: 480,
          width: "100%",
          margin: "0 auto",
          padding: "8px 20px 56px",
          display: "flex",
          flexDirection: "column",
          gap: 28,
        }}
      >
        {/* Link stack */}
        <nav style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          {activeLinks.map((link) => (
            <LinkCard key={link.id} link={link} />
          ))}
        </nav>

        {/* Divider */}
        <div
          style={{
            height: 1,
            background:
              "linear-gradient(to right, transparent, rgba(201,169,110,0.2), transparent)",
          }}
        />

        {/* Social icons */}
        <div style={{ display: "flex", justifyContent: "center", gap: 16 }}>
          {SOCIALS.map((s) => (
            <a
              key={s.label}
              href={s.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={s.label}
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                width: 42,
                height: 42,
                borderRadius: "50%",
                border: "1px solid rgba(255,255,255,0.1)",
                color: "rgba(240,237,232,0.45)",
                transition: "border-color 0.2s, color 0.2s, background 0.2s",
                textDecoration: "none",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = "rgba(201,169,110,0.5)";
                e.currentTarget.style.color = "#C9A96E";
                e.currentTarget.style.background = "rgba(201,169,110,0.07)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = "rgba(255,255,255,0.1)";
                e.currentTarget.style.color = "rgba(240,237,232,0.45)";
                e.currentTarget.style.background = "transparent";
              }}
            >
              {s.icon}
            </a>
          ))}
        </div>

        {/* Footer */}
        <footer
          style={{
            textAlign: "center",
            fontSize: 11,
            color: "rgba(255,255,255,0.2)",
            letterSpacing: "0.08em",
          }}
        >
          &copy; 2026 Move Mountains Co. &mdash; Providence, RI
        </footer>
      </div>
    </div>
  );
}

/* ── LinkCard ─────────────────────────────────────────────────── */
function LinkCard({ link }) {
  const isExternal = link.url.startsWith("http");
  const icon = ICON_MAP[link.icon] || ICON_MAP.globe;

  return (
    <a
      href={link.url}
      target={isExternal ? "_blank" : "_self"}
      rel={isExternal ? "noopener noreferrer" : undefined}
      style={{
        display: "flex",
        alignItems: "center",
        gap: 14,
        padding: "14px 18px",
        background: "rgba(255,255,255,0.04)",
        border: "1px solid rgba(255,255,255,0.08)",
        borderRadius: 12,
        color: "#F0EDE8",
        textDecoration: "none",
        fontFamily: "'DM Sans', sans-serif",
        fontWeight: 500,
        fontSize: 15,
        transition: "border-color 0.18s, background 0.18s",
        width: "100%",
        boxSizing: "border-box",
        backdropFilter: "blur(8px)",
        WebkitBackdropFilter: "blur(8px)",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.borderColor = "rgba(201,169,110,0.4)";
        e.currentTarget.style.background = "rgba(201,169,110,0.07)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.borderColor = "rgba(255,255,255,0.08)";
        e.currentTarget.style.background = "rgba(255,255,255,0.04)";
      }}
    >
      {/* Icon badge */}
      <span
        style={{
          width: 38,
          height: 38,
          borderRadius: 10,
          background: "rgba(201,169,110,0.1)",
          border: "1px solid rgba(201,169,110,0.18)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "#C9A96E",
          flexShrink: 0,
        }}
      >
        {icon}
      </span>

      {/* Label */}
      <span style={{ flex: 1, letterSpacing: "0.01em" }}>{link.label}</span>

      {/* Arrow */}
      <span
        style={{
          color: "rgba(201,169,110,0.5)",
          fontSize: 15,
          lineHeight: 1,
          transition: "color 0.18s",
        }}
      >
        {isExternal ? "↗" : "→"}
      </span>
    </a>
  );
}
