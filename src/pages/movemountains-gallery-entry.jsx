// ═══════════════════════════════════════════════════════════════════
// movemountains-gallery-entry.jsx
// Private client delivery cover page — noindex, no public header/footer
// Route: /g/:token
// ═══════════════════════════════════════════════════════════════════
import { useEffect } from "react";
import { motion } from "framer-motion";
import { useParams } from "react-router-dom";
import { resolveGallery } from "../gallery/galleryData";
import { usePageTransition } from "../components/PageTransition";

const ease = [0.25, 0.1, 0.25, 1];

// ── Animation helpers ─────────────────────────────────────────────
function FadeUp({ children, delay = 0, style = {} }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.65, delay, ease }}
      style={style}
    >
      {children}
    </motion.div>
  );
}

function CharReveal({ text, delay = 0 }) {
  return (
    <span>
      {[...text].map((ch, i) => (
        <motion.span
          key={i}
          initial={{ opacity: 0, y: 22 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: delay + i * 0.028, ease }}
          style={{ display: "inline-block" }}
        >
          {ch === " " ? "\u00A0" : ch}
        </motion.span>
      ))}
    </span>
  );
}

// ── Cover page ────────────────────────────────────────────────────
export default function GalleryEntry() {
  const { token } = useParams();
  const g = resolveGallery(token);
  const filmCount = g.films.length;
  const { triggerCinema } = usePageTransition();

  useEffect(() => {
    const prevTitle = document.title;
    document.title = `${g.couple} — Move Mountains Co.`;

    const meta = document.createElement("meta");
    meta.name = "robots";
    meta.content = "noindex, nofollow";
    document.head.appendChild(meta);

    return () => {
      document.title = prevTitle;
      document.head.removeChild(meta);
    };
  }, [g.couple]);

  return (
    <div
      style={{
        minHeight: "100dvh",
        background: "var(--mm-bg)",
        position: "relative",
        overflow: "hidden",
        fontFamily: "'DM Sans', sans-serif",
      }}
    >
      {/* ── Background: warm radial glow + bottom fade ── */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          zIndex: 0,
          background: `radial-gradient(ellipse at 50% 38%, ${g.coverColor}d0 0%, #0c0b09 66%)`,
        }}
      />
      <div
        style={{
          position: "absolute",
          inset: 0,
          zIndex: 0,
          background:
            "linear-gradient(to bottom, rgba(0,0,0,0.05) 40%, rgba(15,15,15,0.88) 100%)",
        }}
      />

      {/* ── Top bar ── */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 20,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "24px clamp(20px, 4vw, 40px)",
        }}
      >
        <FadeUp delay={0.08}>
          <span
            style={{
              fontSize: 10,
              letterSpacing: "0.32em",
              color: "var(--mm-gold)",
              textTransform: "uppercase",
            }}
          >
            Move Mountains Co.
          </span>
        </FadeUp>
        <FadeUp delay={0.14}>
          <span
            style={{
              fontSize: 10,
              letterSpacing: "0.22em",
              color: "var(--mm-text-sec)",
              textTransform: "uppercase",
            }}
          >
            Private Gallery
          </span>
        </FadeUp>
      </div>

      {/* ── Center content ── */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          zIndex: 10,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center",
          padding: "0 clamp(24px, 6vw, 80px)",
        }}
      >
        {/* "The Wedding of" label */}
        <FadeUp delay={0.3}>
          <p
            style={{
              fontSize: 10,
              letterSpacing: "0.4em",
              color: "var(--mm-text-sec)",
              textTransform: "uppercase",
              marginBottom: 20,
            }}
          >
            The Wedding of
          </p>
        </FadeUp>

        {/* Couple name — character reveal */}
        <h1
          style={{
            fontFamily: "'Playfair Display', serif",
            fontStyle: "italic",
            fontWeight: 400,
            fontSize: "clamp(52px, 9vw, 108px)",
            lineHeight: 1.0,
            letterSpacing: "-0.01em",
            color: "var(--mm-text)",
            margin: "0 0 34px",
          }}
        >
          <CharReveal text={g.couple} delay={0.46} />
        </h1>

        {/* Gold divider */}
        <FadeUp delay={1.05}>
          <div
            style={{
              width: 44,
              height: 1,
              background: "var(--mm-gold)",
              margin: "0 auto 26px",
            }}
          />
        </FadeUp>

        {/* Date */}
        <FadeUp delay={1.14}>
          <p
            style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontStyle: "italic",
              fontWeight: 500,
              fontSize: "clamp(16px, 2vw, 21px)",
              color: "var(--mm-text-sec)",
              marginBottom: 8,
            }}
          >
            {g.date}
          </p>
        </FadeUp>

        {/* Venue · location */}
        <FadeUp delay={1.22}>
          <p
            style={{
              fontSize: 10,
              letterSpacing: "0.2em",
              color: "var(--mm-text-sec)",
              textTransform: "uppercase",
              marginBottom: 52,
            }}
          >
            {g.venue}&nbsp;&nbsp;·&nbsp;&nbsp;{g.location}
          </p>
        </FadeUp>

        {/* CTAs */}
        <FadeUp delay={1.35}>
          <div
            style={{
              display: "flex",
              gap: 10,
              flexWrap: "wrap",
              justifyContent: "center",
            }}
          >
            <button
              onClick={() => triggerCinema(`/g/${token}/films`, g.couple, "film")}
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 9,
                background: "var(--mm-ember)",
                color: "#fff",
                fontSize: 11,
                fontWeight: 600,
                fontFamily: "'DM Sans', sans-serif",
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                border: "none",
                padding: "14px 32px",
                cursor: "pointer",
                transition: "opacity 0.2s",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.82")}
              onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}
            >
              <svg
                width="11"
                height="11"
                viewBox="0 0 12 12"
                fill="currentColor"
                style={{ flexShrink: 0 }}
              >
                <path d="M2 1.5l9 4.5-9 4.5V1.5z" />
              </svg>
              View Films
            </button>

            <button
              onClick={() => triggerCinema(`/g/${token}/photos`, g.couple, "photo")}
              style={{
                background: "transparent",
                color: "var(--mm-text)",
                fontSize: 11,
                fontWeight: 600,
                fontFamily: "'DM Sans', sans-serif",
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                border: "1px solid var(--mm-border)",
                padding: "14px 32px",
                cursor: "pointer",
                transition: "border-color 0.3s, color 0.3s",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = "var(--mm-gold)";
                e.currentTarget.style.color = "var(--mm-gold)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = "var(--mm-border)";
                e.currentTarget.style.color = "var(--mm-text)";
              }}
            >
              Browse Photos
            </button>
          </div>
        </FadeUp>
      </div>

      {/* ── Bottom info bar ── */}
      <div
        style={{
          position: "absolute",
          bottom: 32,
          left: 0,
          right: 0,
          zIndex: 20,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 8,
        }}
      >
        <FadeUp delay={1.52}>
          <p
            style={{
              fontSize: 10,
              letterSpacing: "0.24em",
              color: "var(--mm-text-sec)",
              textTransform: "uppercase",
            }}
          >
            {g.photoCount.toLocaleString()} Photos&nbsp;&nbsp;·&nbsp;&nbsp;
            {filmCount} {filmCount === 1 ? "Film" : "Films"}
          </p>
        </FadeUp>
        <FadeUp delay={1.62}>
          <p
            style={{
              fontSize: 10,
              letterSpacing: "0.14em",
              color: "var(--mm-text-sec)",
              opacity: 0.38,
              textTransform: "uppercase",
            }}
          >
            {g.teamLabel}
          </p>
        </FadeUp>
      </div>
    </div>
  );
}
