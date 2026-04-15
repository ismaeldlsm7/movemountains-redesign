// Shared components used by both gallery-photos and gallery-films pages.
import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { Link } from "react-router-dom";

export const ease = [0.25, 0.1, 0.25, 1];

export function FadeIn({ children, delay = 0, y = 18 }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-30px" });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.65, delay, ease }}
    >
      {children}
    </motion.div>
  );
}

export function GalleryHeader({ couple, token, activeTab }) {
  const [backHover, setBackHover] = useState(false);

  return (
    <header
      style={{
        position: "sticky", top: 0, zIndex: 100,
        background: "var(--mm-bg-blur)",
        backdropFilter: "blur(16px)", WebkitBackdropFilter: "blur(16px)",
        borderBottom: "1px solid var(--mm-border)",
        height: 56, display: "flex", alignItems: "center",
        justifyContent: "space-between",
        padding: "0 clamp(16px, 4vw, 32px)",
      }}
    >
      {/* Back-to-gallery link — instant, no cinematic overlay */}
      <Link
        to={`/g/${token}`}
        data-no-transition
        onMouseEnter={() => setBackHover(true)}
        onMouseLeave={() => setBackHover(false)}
        style={{
          textDecoration: "none", flexShrink: 0,
          display: "flex", alignItems: "center", gap: 5,
        }}
      >
        <motion.span
          animate={{ opacity: backHover ? 1 : 0, x: backHover ? 0 : -5 }}
          transition={{ duration: 0.2, ease: [0.25, 0.1, 0.25, 1] }}
          style={{
            fontFamily: "'DM Sans', sans-serif", fontSize: 10,
            color: "var(--mm-gold)", lineHeight: 1,
          }}
        >
          ←
        </motion.span>
        <span style={{
          fontFamily: "'DM Sans', sans-serif", fontSize: 10,
          letterSpacing: "0.3em", color: "var(--mm-gold)", textTransform: "uppercase",
        }}>
          Move Mountains
        </span>
      </Link>

      <span style={{
        fontFamily: "'Playfair Display', serif", fontStyle: "italic",
        fontSize: 15, color: "var(--mm-text)",
        position: "absolute", left: "50%", transform: "translateX(-50%)",
        whiteSpace: "nowrap", pointerEvents: "none",
      }}>
        {couple}
      </span>

      {/* Tab switcher — instant within gallery context */}
      <nav style={{ display: "flex", gap: 0, flexShrink: 0 }}>
        {[
          { label: "Films",  path: `/g/${token}/films` },
          { label: "Photos", path: `/g/${token}/photos` },
        ].map(({ label, path }) => {
          const active = activeTab === label.toLowerCase();
          return (
            <Link key={label} to={path} data-no-transition style={{ textDecoration: "none" }}>
              <span style={{
                fontFamily: "'DM Sans', sans-serif", fontSize: 11, fontWeight: 600,
                letterSpacing: "0.1em", textTransform: "uppercase",
                color: active ? "var(--mm-gold)" : "var(--mm-text-sec)",
                padding: "0 14px", height: 56, display: "inline-flex", alignItems: "center",
                borderBottom: active ? "2px solid var(--mm-gold)" : "2px solid transparent",
                transition: "color 0.25s, border-color 0.25s", cursor: "pointer",
              }}>
                {label}
              </span>
            </Link>
          );
        })}
      </nav>
    </header>
  );
}
