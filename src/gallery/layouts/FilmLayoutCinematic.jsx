// Film layout: Cinematic — full dark full-width hero + horizontal scroll row.
import { useState } from "react";
import { motion } from "framer-motion";
import { FadeIn, ease } from "../GalleryShared";
import { FilmCard } from "../FilmComponents";

export default function FilmLayoutCinematic({ films, onPlay }) {
  if (!films || films.length === 0) return null;
  const heroFilm = films[0];
  const otherFilms = films.slice(1);
  const [hovered, setHovered] = useState(false);

  return (
    <div style={{ background: "#080706", minHeight: "calc(100dvh - 56px)" }}>
      {/* Full-width hero */}
      <FadeIn delay={0}>
        <div
          onClick={() => onPlay(heroFilm)}
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
          style={{
            width: "100%", aspectRatio: "21/9", background: heroFilm.color,
            position: "relative", overflow: "hidden", cursor: "pointer",
            borderBottom: `1px solid ${hovered ? "var(--mm-gold)" : "var(--mm-border)"}`,
            transition: "border-color 0.3s",
          }}
        >
          <motion.div
            animate={{ scale: hovered ? 1.02 : 1 }}
            transition={{ duration: 0.6, ease }}
            style={{ position: "absolute", inset: 0, background: heroFilm.color }}
          />

          {/* Gradient overlay */}
          <div style={{
            position: "absolute", inset: 0,
            background: "linear-gradient(to top, rgba(8,7,6,0.7) 0%, transparent 60%)",
          }} />

          {/* Play button */}
          <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center" }}>
            <motion.div
              animate={{ opacity: hovered ? 1 : 0.55, scale: hovered ? 1.08 : 1 }}
              transition={{ duration: 0.25 }}
              style={{
                width: 88, height: 88,
                border: `1.5px solid ${hovered ? "var(--mm-gold)" : "rgba(255,255,255,0.4)"}`,
                borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center",
                backdropFilter: "blur(6px)", transition: "border-color 0.25s",
              }}
            >
              <svg width="28" height="28" viewBox="0 0 12 14" fill={hovered ? "var(--mm-gold)" : "white"} style={{ marginLeft: 3, transition: "fill 0.25s" }}>
                <path d="M1 1l11 6-11 6V1z" />
              </svg>
            </motion.div>
          </div>

          {/* Title + duration at bottom */}
          <div style={{
            position: "absolute", bottom: 0, left: 0, right: 0,
            padding: "clamp(20px, 3vw, 40px)",
          }}>
            <h2 style={{
              fontFamily: "'Playfair Display', serif", fontStyle: "italic",
              fontWeight: 400, fontSize: "clamp(22px, 3vw, 38px)",
              color: "var(--mm-text)", margin: "0 0 6px",
            }}>
              {heroFilm.title}
            </h2>
            {heroFilm.subtitle && (
              <p style={{
                fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(13px, 1.5vw, 17px)",
                color: "var(--mm-text-sec)", margin: "0 0 8px", lineHeight: 1.5,
              }}>
                {heroFilm.subtitle}
              </p>
            )}
            <p style={{
              fontFamily: "'DM Sans', sans-serif", fontSize: 11,
              letterSpacing: "0.1em", color: "rgba(255,255,255,0.4)",
            }}>
              {heroFilm.chapters?.length > 0 ? `${heroFilm.chapters.length} chapters · ` : ""}{heroFilm.duration}
            </p>
          </div>

          {/* Duration badge */}
          <div style={{
            position: "absolute", top: 16, right: 16,
            background: "rgba(0,0,0,0.6)", backdropFilter: "blur(4px)",
            fontFamily: "'DM Sans', sans-serif", fontSize: 10,
            letterSpacing: "0.06em", color: "rgba(255,255,255,0.7)", padding: "4px 10px",
          }}>
            {heroFilm.duration}
          </div>
        </div>
      </FadeIn>

      {/* Horizontal scroll row */}
      {otherFilms.length > 0 && (
        <FadeIn delay={0.1}>
          <div style={{ padding: "32px clamp(16px, 4vw, 40px)" }}>
            <p style={{
              fontSize: 10, letterSpacing: "0.24em", color: "var(--mm-text-sec)",
              textTransform: "uppercase", marginBottom: 20,
            }}>
              Full-Length Films
            </p>
            <div style={{
              display: "flex", gap: 16, overflowX: "auto",
              scrollbarWidth: "none", msOverflowStyle: "none",
              paddingBottom: 4,
            }}>
              {otherFilms.map((film) => (
                <div key={film.id} style={{ flexShrink: 0, width: 280 }}>
                  <FilmCard film={film} onPlay={onPlay} />
                </div>
              ))}
            </div>
          </div>
        </FadeIn>
      )}
    </div>
  );
}
