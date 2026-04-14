// Shared film UI components — used across film layout variants.
import { useState } from "react";
import { motion } from "framer-motion";
import { ease } from "./GalleryShared";

// ── Play button overlay ────────────────────────────────────────────
export function PlayOverlay({ size = 64 }) {
  return (
    <div style={{
      position: "absolute", inset: 0,
      display: "flex", alignItems: "center", justifyContent: "center",
      background: "rgba(0,0,0,0.28)", transition: "background 0.25s",
    }}>
      <div style={{
        width: size, height: size,
        border: "1.5px solid rgba(255,255,255,0.55)", borderRadius: "50%",
        display: "flex", alignItems: "center", justifyContent: "center",
        backdropFilter: "blur(4px)", transition: "border-color 0.25s, transform 0.25s",
      }}>
        <svg width={size * 0.34} height={size * 0.34} viewBox="0 0 12 14" fill="white">
          <path d="M1 1l11 6-11 6V1z" />
        </svg>
      </div>
    </div>
  );
}

// ── Chapter chips row ──────────────────────────────────────────────
export function ChapterNav({ chapters, activeChapter, onSelect }) {
  if (!chapters || chapters.length === 0) return null;
  return (
    <div style={{
      display: "flex", gap: 8, overflowX: "auto", paddingBottom: 4,
      scrollbarWidth: "none", msOverflowStyle: "none",
    }}>
      {chapters.map((ch, i) => {
        const active = activeChapter === i;
        return (
          <button
            key={i}
            onClick={() => onSelect(i)}
            style={{
              flexShrink: 0, background: "transparent",
              border: `1px solid ${active ? "var(--mm-gold)" : "var(--mm-border)"}`,
              color: active ? "var(--mm-gold)" : "var(--mm-text-sec)",
              fontFamily: "'DM Sans', sans-serif", fontSize: 10, fontWeight: 600,
              letterSpacing: "0.1em", textTransform: "uppercase",
              padding: "7px 14px", cursor: "pointer",
              transition: "border-color 0.25s, color 0.25s", whiteSpace: "nowrap",
            }}
            onMouseEnter={(e) => {
              if (!active) {
                e.currentTarget.style.borderColor = "var(--mm-text-sec)";
                e.currentTarget.style.color = "var(--mm-text)";
              }
            }}
            onMouseLeave={(e) => {
              if (!active) {
                e.currentTarget.style.borderColor = "var(--mm-border)";
                e.currentTarget.style.color = "var(--mm-text-sec)";
              }
            }}
          >
            {ch.label}
            <span style={{ opacity: 0.45, marginLeft: 7, fontWeight: 400 }}>{ch.time}</span>
          </button>
        );
      })}
    </div>
  );
}

// ── Film card ──────────────────────────────────────────────────────
export function FilmCard({ film, onPlay, size = "normal" }) {
  const [hovered, setHovered] = useState(false);
  const isHero = size === "hero";

  return (
    <div
      onClick={() => onPlay(film)}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        cursor: "pointer",
        border: `1px solid ${hovered ? "var(--mm-gold)" : "var(--mm-border)"}`,
        transition: "border-color 0.3s", position: "relative", overflow: "hidden",
      }}
    >
      <div style={{ width: "100%", aspectRatio: "16/9", background: film.color, position: "relative", overflow: "hidden" }}>
        <motion.div
          animate={{ scale: hovered ? 1.03 : 1 }}
          transition={{ duration: 0.5, ease }}
          style={{ width: "100%", height: "100%", background: film.color }}
        />
        <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center" }}>
          <motion.div
            animate={{ opacity: hovered ? 1 : 0.6, scale: hovered ? 1.05 : 1 }}
            transition={{ duration: 0.25 }}
            style={{
              width: isHero ? 72 : 52, height: isHero ? 72 : 52,
              border: "1.5px solid rgba(255,255,255,0.45)", borderRadius: "50%",
              display: "flex", alignItems: "center", justifyContent: "center",
              backdropFilter: "blur(6px)",
            }}
          >
            <svg width={isHero ? 24 : 17} height={isHero ? 24 : 17} viewBox="0 0 12 14" fill="white" style={{ marginLeft: 2 }}>
              <path d="M1 1l11 6-11 6V1z" />
            </svg>
          </motion.div>
        </div>
        <div style={{
          position: "absolute", bottom: 10, right: 10,
          background: "rgba(0,0,0,0.62)", backdropFilter: "blur(4px)",
          fontFamily: "'DM Sans', sans-serif", fontSize: 10, letterSpacing: "0.06em",
          color: "rgba(255,255,255,0.75)", padding: "3px 8px",
        }}>
          {film.duration}
        </div>
      </div>
      <div style={{ padding: isHero ? "20px 0 4px" : "14px 0 2px" }}>
        <h3 style={{
          fontFamily: "'Playfair Display', serif", fontStyle: "italic",
          fontWeight: 400, fontSize: isHero ? 22 : 17,
          color: "var(--mm-text)", margin: "0 0 6px",
        }}>
          {film.title}
        </h3>
        {isHero && film.subtitle && (
          <p style={{
            fontFamily: "'Cormorant Garamond', serif", fontSize: 15,
            color: "var(--mm-text-sec)", margin: "0 0 16px", lineHeight: 1.5,
          }}>
            {film.subtitle}
          </p>
        )}
        <p style={{
          fontFamily: "'DM Sans', sans-serif", fontSize: 11,
          letterSpacing: "0.08em", color: "var(--mm-text-sec)",
        }}>
          {film.chapters?.length > 0 ? `${film.chapters.length} chapters · ` : ""}{film.duration}
        </p>
      </div>
    </div>
  );
}
