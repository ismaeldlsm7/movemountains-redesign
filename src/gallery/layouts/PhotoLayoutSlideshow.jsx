// Photo layout: Slideshow — full-viewport one photo at a time.
// This layout IS the lightbox: no separate modal needed.
import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ease } from "../GalleryShared";

export default function PhotoLayoutSlideshow({ photos, favorites, initialIndex = 0, onFavorite, onClose }) {
  const [index, setIndex] = useState(initialIndex);
  const [dir, setDir] = useState(1);

  const photo = photos[index] ?? photos[0];
  const isFav = favorites.has(photo?.id);

  const goTo = useCallback((next) => {
    const bounded = (next + photos.length) % photos.length;
    setDir(next > index ? 1 : -1);
    setIndex(bounded);
  }, [index, photos.length]);

  useEffect(() => {
    const handler = (e) => {
      if (e.key === "ArrowRight") goTo(index + 1);
      if (e.key === "ArrowLeft")  goTo(index - 1);
      if (e.key === "Escape" && onClose) onClose();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [goTo, index, onClose]);

  if (!photo) return null;

  return (
    <div style={{
      position: "relative", height: "calc(100dvh - 56px)", background: "#050403",
      display: "flex", flexDirection: "column", overflow: "hidden", userSelect: "none",
    }}>
      {/* Main photo */}
      <div style={{ flex: 1, position: "relative", overflow: "hidden" }}>
        <AnimatePresence mode="wait" custom={dir}>
          <motion.div
            key={photo.id}
            custom={dir}
            initial={{ opacity: 0, x: dir * 60 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: dir * -60 }}
            transition={{ duration: 0.38, ease }}
            style={{
              position: "absolute", inset: 0,
              display: "flex", alignItems: "center", justifyContent: "center",
              background: "#050403",
            }}
          >
            <div style={{
              aspectRatio: photo.aspect,
              maxWidth: "min(90vw, 1200px)",
              maxHeight: "calc(100dvh - 56px - 120px)",
              background: photo.color,
              display: "flex", alignItems: "center", justifyContent: "center",
              position: "relative",
            }}>
              <span style={{
                fontFamily: "'DM Sans', sans-serif", fontSize: 9, letterSpacing: "0.1em",
                color: "rgba(255,255,255,0.08)", textTransform: "uppercase",
                textAlign: "center", padding: "0 20px",
              }}>
                {photo.label}
              </span>

              {/* Favorite button */}
              <button
                onClick={(e) => { e.stopPropagation(); onFavorite(photo.id); }}
                style={{
                  position: "absolute", bottom: 10, right: 12,
                  background: "rgba(0,0,0,0.5)", border: "none",
                  color: isFav ? "var(--mm-ember)" : "rgba(255,255,255,0.5)",
                  cursor: "pointer", width: 32, height: 32,
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontSize: 15, lineHeight: 1, transition: "color 0.18s, transform 0.15s",
                  transform: isFav ? "scale(1.15)" : "scale(1)",
                }}
              >
                {isFav ? "♥" : "♡"}
              </button>

              {/* Counter */}
              <div style={{
                position: "absolute", bottom: 12, left: 12,
                fontFamily: "'DM Sans', sans-serif", fontSize: 10,
                letterSpacing: "0.1em", color: "rgba(255,255,255,0.3)",
              }}>
                {index + 1} / {photos.length}
              </div>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Prev arrow */}
        <button
          onClick={() => goTo(index - 1)}
          style={{
            position: "absolute", left: "clamp(8px, 2vw, 20px)", top: "50%",
            transform: "translateY(-50%)", width: 44, height: 44,
            background: "rgba(255,255,255,0.05)", border: "1px solid var(--mm-border)",
            color: "var(--mm-text-sec)", cursor: "pointer",
            display: "flex", alignItems: "center", justifyContent: "center",
            transition: "border-color 0.22s, background 0.22s", zIndex: 2,
          }}
          onMouseEnter={(e) => { e.currentTarget.style.borderColor = "var(--mm-gold)"; e.currentTarget.style.background = "rgba(201,169,110,0.08)"; }}
          onMouseLeave={(e) => { e.currentTarget.style.borderColor = "var(--mm-border)"; e.currentTarget.style.background = "rgba(255,255,255,0.05)"; }}
        >
          <svg width="13" height="13" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path d="M8 2L4 6l4 4" />
          </svg>
        </button>

        {/* Next arrow */}
        <button
          onClick={() => goTo(index + 1)}
          style={{
            position: "absolute", right: "clamp(8px, 2vw, 20px)", top: "50%",
            transform: "translateY(-50%)", width: 44, height: 44,
            background: "rgba(255,255,255,0.05)", border: "1px solid var(--mm-border)",
            color: "var(--mm-text-sec)", cursor: "pointer",
            display: "flex", alignItems: "center", justifyContent: "center",
            transition: "border-color 0.22s, background 0.22s", zIndex: 2,
          }}
          onMouseEnter={(e) => { e.currentTarget.style.borderColor = "var(--mm-gold)"; e.currentTarget.style.background = "rgba(201,169,110,0.08)"; }}
          onMouseLeave={(e) => { e.currentTarget.style.borderColor = "var(--mm-border)"; e.currentTarget.style.background = "rgba(255,255,255,0.05)"; }}
        >
          <svg width="13" height="13" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path d="M4 2l4 4-4 4" />
          </svg>
        </button>
      </div>

      {/* Thumbnail strip + progress dots */}
      <div style={{
        height: 100, flexShrink: 0, borderTop: "1px solid var(--mm-border)",
        background: "rgba(0,0,0,0.6)", display: "flex", flexDirection: "column",
        alignItems: "center", gap: 8, padding: "10px 0 6px",
      }}>
        {/* Progress dots */}
        <div style={{ display: "flex", gap: 5, alignItems: "center" }}>
          {photos.map((_, i) => (
            <motion.div
              key={i}
              onClick={() => goTo(i)}
              animate={{ width: i === index ? 16 : 5, background: i === index ? "var(--mm-gold)" : "rgba(255,255,255,0.2)" }}
              transition={{ duration: 0.2 }}
              style={{ height: 5, borderRadius: 3, cursor: "pointer", flexShrink: 0 }}
            />
          ))}
        </div>
        {/* Thumbnail strip */}
        <div style={{
          display: "flex", gap: 4, overflowX: "auto", padding: "0 16px",
          scrollbarWidth: "none", msOverflowStyle: "none", width: "100%",
        }}>
          {photos.map((p, i) => (
            <div
              key={p.id}
              onClick={() => goTo(i)}
              style={{
                flexShrink: 0, width: 56, height: 40, background: p.color, cursor: "pointer",
                border: i === index ? "1.5px solid var(--mm-gold)" : "1.5px solid transparent",
                transition: "border-color 0.2s", opacity: i === index ? 1 : 0.5,
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
