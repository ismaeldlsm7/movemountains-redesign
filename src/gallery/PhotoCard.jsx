import { useState } from "react";
import { motion } from "framer-motion";
import { ease } from "./GalleryShared";

export default function PhotoCard({ photo, favorites, onClick, onFavorite, forcedAspect }) {
  const [hovered, setHovered] = useState(false);
  const isFav = favorites.has(photo.id);
  const aspect = forcedAspect || photo.aspect;

  return (
    <div
      style={{
        position: "relative", breakInside: "avoid", marginBottom: 4,
        overflow: "hidden", cursor: "pointer",
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={onClick}
    >
      <div style={{
        width: "100%", aspectRatio: aspect, background: photo.color,
        display: "flex", alignItems: "center", justifyContent: "center",
        overflow: "hidden", position: "relative",
      }}>
        <motion.div
          animate={{ scale: hovered ? 1.04 : 1 }}
          transition={{ duration: 0.45, ease }}
          style={{ position: "absolute", inset: 0, background: photo.color }}
        />
        <span style={{
          position: "relative", fontFamily: "'DM Sans', sans-serif",
          fontSize: 9, letterSpacing: "0.1em",
          color: "rgba(255,255,255,0.1)", textTransform: "uppercase",
          textAlign: "center", padding: "0 12px", lineHeight: 1.5,
        }}>
          {photo.label}
        </span>

        <motion.div
          animate={{ opacity: hovered ? 1 : 0 }}
          transition={{ duration: 0.2 }}
          style={{
            position: "absolute", inset: 0, background: "rgba(0,0,0,0.32)",
            display: "flex", alignItems: "flex-end", justifyContent: "flex-end", padding: 10,
          }}
        >
          <button
            onClick={(e) => { e.stopPropagation(); onFavorite(photo.id); }}
            style={{
              background: "rgba(0,0,0,0.5)", border: "none",
              color: isFav ? "var(--mm-ember)" : "rgba(255,255,255,0.7)",
              cursor: "pointer", width: 32, height: 32,
              display: "flex", alignItems: "center", justifyContent: "center",
              fontSize: 15, lineHeight: 1, transition: "color 0.18s, transform 0.15s",
              transform: isFav ? "scale(1.15)" : "scale(1)",
            }}
          >
            {isFav ? "♥" : "♡"}
          </button>
        </motion.div>
      </div>
    </div>
  );
}
