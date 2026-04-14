// ═══════════════════════════════════════════════════════════════════
// movemountains-gallery-photos.jsx
// Private client photo gallery — theme-switched layouts
// Route: /g/:token/photos
// ═══════════════════════════════════════════════════════════════════
import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link, useParams } from "react-router-dom";
import { resolveGallery } from "../gallery/galleryData";
import { GalleryHeader, ease } from "../gallery/GalleryShared";
import PhotoLayoutMasonry   from "../gallery/layouts/PhotoLayoutMasonry";
import PhotoLayoutGrid      from "../gallery/layouts/PhotoLayoutGrid";
import PhotoLayoutEditorial from "../gallery/layouts/PhotoLayoutEditorial";
import PhotoLayoutSlideshow from "../gallery/layouts/PhotoLayoutSlideshow";

// ── Scene definitions ──────────────────────────────────────────────
const SCENES = [
  { id: "all", label: "All" },
  { id: "getting-ready", label: "Getting Ready" },
  { id: "first-look", label: "First Look" },
  { id: "ceremony", label: "Ceremony" },
  { id: "portraits", label: "Portraits" },
  { id: "reception", label: "Reception" },
];

// ── Photo data ─────────────────────────────────────────────────────
const PHOTOS = [
  // ── Getting Ready ──────────────────────────────────────────────
  { id: 1,  scene: "getting-ready", color: "#2a2420", aspect: "2/3", label: "Bridal Suite — Window Light" },
  { id: 2,  scene: "getting-ready", color: "#241e1a", aspect: "3/4", label: "Dress Detail — Cathedral Veil" },
  { id: 3,  scene: "getting-ready", color: "#2e2620", aspect: "4/3", label: "Bridesmaids — Getting Ready" },
  { id: 4,  scene: "getting-ready", color: "#251f1b", aspect: "3/4", label: "Makeup — Natural Light" },
  { id: 5,  scene: "getting-ready", color: "#2a2420", aspect: "3/4", label: "Champagne Toast — Suite" },
  { id: 6,  scene: "getting-ready", color: "#241e1a", aspect: "2/3", label: "Shoe Detail" },
  { id: 7,  scene: "getting-ready", color: "#2e2620", aspect: "3/4", label: "Groom — Handwritten Letter" },
  { id: 8,  scene: "getting-ready", color: "#2a2218", aspect: "4/3", label: "Groomsmen — Getting Ready" },
  { id: 9,  scene: "getting-ready", color: "#241e1a", aspect: "3/4", label: "Tie Knot Detail" },
  { id: 10, scene: "getting-ready", color: "#251f1b", aspect: "2/3", label: "Bouquet — Garden Roses" },
  { id: 11, scene: "getting-ready", color: "#2a2420", aspect: "3/4", label: "Ring Box — Detail" },
  { id: 12, scene: "getting-ready", color: "#2e2620", aspect: "3/4", label: "Veil in Light" },

  // ── First Look ─────────────────────────────────────────────────
  { id: 13, scene: "first-look", color: "#22201a", aspect: "4/3", label: "First Look — West Terrace, Rosecliff" },
  { id: 14, scene: "first-look", color: "#201e18", aspect: "3/4", label: "First Reaction — Over Shoulder" },
  { id: 15, scene: "first-look", color: "#252118", aspect: "2/3", label: "Hands — First Touch" },
  { id: 16, scene: "first-look", color: "#22201a", aspect: "3/4", label: "Embrace — Terrace" },
  { id: 17, scene: "first-look", color: "#201e18", aspect: "4/3", label: "Candid — After the Moment" },
  { id: 18, scene: "first-look", color: "#252118", aspect: "3/4", label: "Walk Together — Pre-Ceremony" },
  { id: 19, scene: "first-look", color: "#22201a", aspect: "3/4", label: "Luke's Expression — Full Frame" },
  { id: 20, scene: "first-look", color: "#201e18", aspect: "2/3", label: "Carey — Terrace Light" },

  // ── Ceremony ───────────────────────────────────────────────────
  { id: 21, scene: "ceremony", color: "#1e1c18", aspect: "4/3", label: "Ceremony — Ocean Lawn Overview" },
  { id: 22, scene: "ceremony", color: "#24221e", aspect: "3/4", label: "Processional — Carey & Father" },
  { id: 23, scene: "ceremony", color: "#201e1a", aspect: "3/4", label: "Luke Waiting at Altar" },
  { id: 24, scene: "ceremony", color: "#1c1a16", aspect: "2/3", label: "Carey Approaching" },
  { id: 25, scene: "ceremony", color: "#1e1c18", aspect: "3/4", label: "Vows — Luke Speaking" },
  { id: 26, scene: "ceremony", color: "#24221e", aspect: "4/3", label: "Vows — Wide Shot, Ocean Behind" },
  { id: 27, scene: "ceremony", color: "#201e1a", aspect: "3/4", label: "Carey Reading Her Vows" },
  { id: 28, scene: "ceremony", color: "#1c1a16", aspect: "3/4", label: "Ring Exchange — Hands Detail" },
  { id: 29, scene: "ceremony", color: "#1e1c18", aspect: "2/3", label: "The Kiss" },
  { id: 30, scene: "ceremony", color: "#24221e", aspect: "3/4", label: "Guests React" },
  { id: 31, scene: "ceremony", color: "#201e1a", aspect: "4/3", label: "Recessional — Just Married" },
  { id: 32, scene: "ceremony", color: "#1c1a16", aspect: "3/4", label: "Confetti Exit" },
  { id: 33, scene: "ceremony", color: "#1e1c18", aspect: "3/4", label: "Wind Catches Veil" },
  { id: 34, scene: "ceremony", color: "#24221e", aspect: "2/3", label: "Officiant — Carey's Roommate" },
  { id: 35, scene: "ceremony", color: "#201e1a", aspect: "3/4", label: "White Chairs — Ceremony Setup" },
  { id: 36, scene: "ceremony", color: "#1c1a16", aspect: "4/3", label: "Ceremony — Aerial Perspective" },

  // ── Portraits ──────────────────────────────────────────────────
  { id: 37, scene: "portraits", color: "#2a2218", aspect: "4/3", label: "Golden Hour — Rosecliff Colonnade" },
  { id: 38, scene: "portraits", color: "#262014", aspect: "3/4", label: "Rose Garden — Couple" },
  { id: 39, scene: "portraits", color: "#281e12", aspect: "2/3", label: "Reflecting Pool — Carey Close-Up" },
  { id: 40, scene: "portraits", color: "#241e14", aspect: "3/4", label: "Cliff Edge — Atlantic Behind" },
  { id: 41, scene: "portraits", color: "#2a2218", aspect: "3/4", label: "Colonnade — Silhouette" },
  { id: 42, scene: "portraits", color: "#262014", aspect: "4/3", label: "Luke Dips Carey — Golden Light" },
  { id: 43, scene: "portraits", color: "#281e12", aspect: "3/4", label: "Forehead Kiss — Garden" },
  { id: 44, scene: "portraits", color: "#241e14", aspect: "3/4", label: "Walking Together — Grounds" },
  { id: 45, scene: "portraits", color: "#2a2218", aspect: "2/3", label: "Carey — Column Background" },
  { id: 46, scene: "portraits", color: "#262014", aspect: "3/4", label: "Luke — Natural Expression" },
  { id: 47, scene: "portraits", color: "#281e12", aspect: "4/3", label: "Reflecting Pool — Full Frame" },
  { id: 48, scene: "portraits", color: "#241e14", aspect: "3/4", label: "Vogue Feature Shot" },

  // ── Reception ──────────────────────────────────────────────────
  { id: 49, scene: "reception", color: "#201c1a", aspect: "4/3", label: "Ballroom — Candlelight Overview" },
  { id: 50, scene: "reception", color: "#1e1a18", aspect: "3/4", label: "Grand Entrance" },
  { id: 51, scene: "reception", color: "#241e1c", aspect: "3/4", label: "First Dance — Slow Waltz" },
  { id: 52, scene: "reception", color: "#221e1a", aspect: "2/3", label: "First Dance — The Dip" },
  { id: 53, scene: "reception", color: "#201c1a", aspect: "3/4", label: "Father-Daughter Dance" },
  { id: 54, scene: "reception", color: "#1e1a18", aspect: "4/3", label: "Toast — Best Man" },
  { id: 55, scene: "reception", color: "#241e1c", aspect: "3/4", label: "Carey Laughing — Toast" },
  { id: 56, scene: "reception", color: "#221e1a", aspect: "3/4", label: "Dance Floor — Opening" },
  { id: 57, scene: "reception", color: "#201c1a", aspect: "2/3", label: "12-Piece Band — Live Set" },
  { id: 58, scene: "reception", color: "#1e1a18", aspect: "4/3", label: "Dessert Table — Detail" },
  { id: 59, scene: "reception", color: "#241e1c", aspect: "3/4", label: "Dance Floor Energy" },
  { id: 60, scene: "reception", color: "#221e1a", aspect: "3/4", label: "Couple at Midnight — Last Song" },
];

// ── Scene navigation tabs ──────────────────────────────────────────
function SceneNav({ activeScene, onSelect, counts }) {
  return (
    <div style={{
      display: "flex", gap: 0, overflowX: "auto",
      scrollbarWidth: "none", msOverflowStyle: "none",
      borderBottom: "1px solid var(--mm-border)",
      padding: "0 clamp(16px, 4vw, 32px)",
    }}>
      {SCENES.map((scene) => {
        const active = activeScene === scene.id;
        const count = counts[scene.id] ?? 0;
        return (
          <button
            key={scene.id}
            onClick={() => onSelect(scene.id)}
            style={{
              flexShrink: 0, background: "transparent", border: "none",
              borderBottom: active ? "2px solid var(--mm-gold)" : "2px solid transparent",
              color: active ? "var(--mm-text)" : "var(--mm-text-sec)",
              fontFamily: "'DM Sans', sans-serif", fontSize: 11, fontWeight: 600,
              letterSpacing: "0.1em", textTransform: "uppercase",
              padding: "14px 16px", cursor: "pointer",
              transition: "color 0.22s, border-color 0.22s",
              display: "flex", alignItems: "center", gap: 6,
            }}
            onMouseEnter={(e) => { if (!active) e.currentTarget.style.color = "var(--mm-text)"; }}
            onMouseLeave={(e) => { if (!active) e.currentTarget.style.color = "var(--mm-text-sec)"; }}
          >
            {scene.label}
            {scene.id !== "all" && (
              <span style={{
                fontSize: 9, letterSpacing: "0.05em",
                color: active ? "var(--mm-gold)" : "var(--mm-text-sec)",
                opacity: 0.55, transition: "color 0.22s",
              }}>
                {count}
              </span>
            )}
          </button>
        );
      })}
    </div>
  );
}

// ── Lightbox modal ─────────────────────────────────────────────────
function Lightbox({ photos, index, favorites, onClose, onNav, onFavorite }) {
  const photo = photos[index];
  const total = photos.length;
  const isFav = favorites.has(photo.id);

  const handleKey = useCallback((e) => {
    if (e.key === "Escape") onClose();
    if (e.key === "ArrowLeft") onNav(-1);
    if (e.key === "ArrowRight") onNav(1);
  }, [onClose, onNav]);

  useEffect(() => {
    window.addEventListener("keydown", handleKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", handleKey);
      document.body.style.overflow = prev;
    };
  }, [handleKey]);

  return (
    <motion.div
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      transition={{ duration: 0.22 }} onClick={onClose}
      style={{
        position: "fixed", inset: 0, zIndex: 200, background: "rgba(7,6,5,0.97)",
        display: "flex", alignItems: "center", justifyContent: "center",
        padding: "clamp(16px, 3vw, 48px)",
      }}
    >
      <AnimatePresence mode="wait">
        <motion.div
          key={photo.id}
          initial={{ opacity: 0, scale: 0.97 }} animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.97 }} transition={{ duration: 0.2, ease }}
          onClick={(e) => e.stopPropagation()}
          style={{
            aspectRatio: photo.aspect, maxWidth: "min(90vw, 1000px)", maxHeight: "82dvh",
            background: photo.color, position: "relative",
            display: "flex", alignItems: "center", justifyContent: "center",
          }}
        >
          <span style={{
            fontFamily: "'DM Sans', sans-serif", fontSize: 10, letterSpacing: "0.12em",
            color: "rgba(255,255,255,0.14)", textTransform: "uppercase",
            textAlign: "center", padding: "0 20px", lineHeight: 1.6,
          }}>
            {photo.label}
          </span>
          <div style={{
            position: "absolute", bottom: 12, left: 14,
            fontFamily: "'DM Sans', sans-serif", fontSize: 10,
            letterSpacing: "0.1em", color: "rgba(255,255,255,0.35)",
          }}>
            {index + 1} / {total}
          </div>
          <button
            onClick={(e) => { e.stopPropagation(); onFavorite(photo.id); }}
            style={{
              position: "absolute", bottom: 10, right: 14,
              background: "transparent", border: "none", cursor: "pointer", padding: 4,
              color: isFav ? "var(--mm-ember)" : "rgba(255,255,255,0.3)",
              fontSize: 18, lineHeight: 1, transition: "color 0.2s, transform 0.15s",
              transform: isFav ? "scale(1.15)" : "scale(1)",
            }}
          >
            {isFav ? "♥" : "♡"}
          </button>
        </motion.div>
      </AnimatePresence>

      {/* Prev */}
      <button
        onClick={(e) => { e.stopPropagation(); onNav(-1); }}
        style={{
          position: "fixed", left: "clamp(8px, 2vw, 24px)", top: "50%", transform: "translateY(-50%)",
          width: 44, height: 44, background: "rgba(255,255,255,0.05)",
          border: "1px solid var(--mm-border)", color: "var(--mm-text-sec)",
          cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center",
          transition: "border-color 0.22s, background 0.22s",
        }}
        onMouseEnter={(e) => { e.currentTarget.style.borderColor = "var(--mm-gold)"; e.currentTarget.style.background = "rgba(201,169,110,0.08)"; }}
        onMouseLeave={(e) => { e.currentTarget.style.borderColor = "var(--mm-border)"; e.currentTarget.style.background = "rgba(255,255,255,0.05)"; }}
      >
        <svg width="13" height="13" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M8 2L4 6l4 4" /></svg>
      </button>

      {/* Next */}
      <button
        onClick={(e) => { e.stopPropagation(); onNav(1); }}
        style={{
          position: "fixed", right: "clamp(8px, 2vw, 24px)", top: "50%", transform: "translateY(-50%)",
          width: 44, height: 44, background: "rgba(255,255,255,0.05)",
          border: "1px solid var(--mm-border)", color: "var(--mm-text-sec)",
          cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center",
          transition: "border-color 0.22s, background 0.22s",
        }}
        onMouseEnter={(e) => { e.currentTarget.style.borderColor = "var(--mm-gold)"; e.currentTarget.style.background = "rgba(201,169,110,0.08)"; }}
        onMouseLeave={(e) => { e.currentTarget.style.borderColor = "var(--mm-border)"; e.currentTarget.style.background = "rgba(255,255,255,0.05)"; }}
      >
        <svg width="13" height="13" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M4 2l4 4-4 4" /></svg>
      </button>

      {/* Close */}
      <button
        onClick={onClose}
        style={{
          position: "fixed", top: 18, right: 18, width: 40, height: 40,
          background: "transparent", border: "1px solid var(--mm-border)",
          color: "var(--mm-text-sec)", cursor: "pointer",
          display: "flex", alignItems: "center", justifyContent: "center",
          transition: "border-color 0.22s, color 0.22s",
        }}
        onMouseEnter={(e) => { e.currentTarget.style.borderColor = "var(--mm-gold)"; e.currentTarget.style.color = "var(--mm-gold)"; }}
        onMouseLeave={(e) => { e.currentTarget.style.borderColor = "var(--mm-border)"; e.currentTarget.style.color = "var(--mm-text-sec)"; }}
      >
        <svg width="13" height="13" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M1 1l12 12M13 1L1 13" /></svg>
      </button>
    </motion.div>
  );
}

// ── Favorites drawer ───────────────────────────────────────────────
function FavoritesPanel({ favorites, photos, onClose, onRemove }) {
  const favPhotos = photos.filter((p) => favorites.has(p.id));

  return (
    <motion.div
      initial={{ x: "100%" }} animate={{ x: 0 }} exit={{ x: "100%" }}
      transition={{ duration: 0.35, ease }}
      style={{
        position: "fixed", top: 0, right: 0, bottom: 0,
        width: "min(380px, 92vw)", background: "var(--mm-surface)",
        borderLeft: "1px solid var(--mm-border)", zIndex: 150,
        display: "flex", flexDirection: "column", overflow: "hidden",
      }}
    >
      <div style={{
        padding: "20px 20px 16px", borderBottom: "1px solid var(--mm-border)",
        display: "flex", alignItems: "center", justifyContent: "space-between", flexShrink: 0,
      }}>
        <div>
          <p style={{
            fontFamily: "'DM Sans', sans-serif", fontSize: 10, letterSpacing: "0.2em",
            color: "var(--mm-text-sec)", textTransform: "uppercase", marginBottom: 4,
          }}>
            Favorites
          </p>
          <p style={{ fontFamily: "'Playfair Display', serif", fontStyle: "italic", fontSize: 20, color: "var(--mm-text)" }}>
            {favPhotos.length} selected
          </p>
        </div>
        <button
          onClick={onClose}
          style={{
            width: 36, height: 36, background: "transparent",
            border: "1px solid var(--mm-border)", color: "var(--mm-text-sec)",
            cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center",
            transition: "border-color 0.22s",
          }}
          onMouseEnter={(e) => (e.currentTarget.style.borderColor = "var(--mm-gold)")}
          onMouseLeave={(e) => (e.currentTarget.style.borderColor = "var(--mm-border)")}
        >
          <svg width="12" height="12" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M1 1l12 12M13 1L1 13" /></svg>
        </button>
      </div>

      <div style={{
        flex: 1, overflow: "auto", padding: 12,
        display: "grid", gridTemplateColumns: "1fr 1fr", gap: 6, alignContent: "start",
      }}>
        {favPhotos.length === 0 && (
          <div style={{ gridColumn: "1 / -1", textAlign: "center", padding: "40px 20px" }}>
            <p style={{
              fontFamily: "'Cormorant Garamond', serif", fontStyle: "italic",
              fontSize: 17, color: "var(--mm-text-sec)", lineHeight: 1.5,
            }}>
              Tap ♡ on any photo<br />to add it here.
            </p>
          </div>
        )}
        {favPhotos.map((p) => (
          <div key={p.id} style={{ position: "relative", aspectRatio: p.aspect, background: p.color }}>
            <button
              onClick={() => onRemove(p.id)}
              style={{
                position: "absolute", top: 4, right: 4, width: 22, height: 22,
                background: "rgba(0,0,0,0.5)", border: "none", color: "var(--mm-ember)",
                cursor: "pointer", fontSize: 11, display: "flex",
                alignItems: "center", justifyContent: "center", lineHeight: 1,
              }}
            >
              ♥
            </button>
          </div>
        ))}
      </div>

      {favPhotos.length > 0 && (
        <div style={{
          padding: "16px 20px", borderTop: "1px solid var(--mm-border)",
          display: "flex", flexDirection: "column", gap: 8, flexShrink: 0,
        }}>
          <button
            style={{
              width: "100%", background: "var(--mm-ember)", color: "#fff",
              fontFamily: "'DM Sans', sans-serif", fontSize: 11, fontWeight: 600,
              letterSpacing: "0.1em", textTransform: "uppercase",
              border: "none", padding: "12px", cursor: "pointer", transition: "opacity 0.2s",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.82")}
            onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}
          >
            Download Selection ({favPhotos.length})
          </button>
          <button
            style={{
              width: "100%", background: "transparent", color: "var(--mm-text-sec)",
              fontFamily: "'DM Sans', sans-serif", fontSize: 10, letterSpacing: "0.12em",
              textTransform: "uppercase", border: "1px solid var(--mm-border)",
              padding: "10px", cursor: "pointer", transition: "border-color 0.25s, color 0.25s",
            }}
            onMouseEnter={(e) => { e.currentTarget.style.borderColor = "var(--mm-gold)"; e.currentTarget.style.color = "var(--mm-gold)"; }}
            onMouseLeave={(e) => { e.currentTarget.style.borderColor = "var(--mm-border)"; e.currentTarget.style.color = "var(--mm-text-sec)"; }}
          >
            Send to Photographer
          </button>
        </div>
      )}
    </motion.div>
  );
}

// ── Main page ──────────────────────────────────────────────────────
export default function GalleryPhotos() {
  const { token } = useParams();
  const g = resolveGallery(token);
  const theme = g.photoTheme ?? "masonry";

  const [activeScene, setActiveScene] = useState("all");
  const [lightboxIndex, setLightboxIndex] = useState(null);
  const [favorites, setFavorites] = useState(new Set());
  const [showFavorites, setShowFavorites] = useState(false);

  const displayPhotos = activeScene === "all" ? PHOTOS : PHOTOS.filter((p) => p.scene === activeScene);

  const counts = SCENES.reduce((acc, s) => {
    acc[s.id] = s.id === "all" ? PHOTOS.length : PHOTOS.filter((p) => p.scene === s.id).length;
    return acc;
  }, {});

  function toggleFavorite(id) {
    setFavorites((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  }

  useEffect(() => {
    const prevTitle = document.title;
    document.title = `${g.couple} Photos — Move Mountains Co.`;
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
    <div style={{ minHeight: "100dvh", background: "var(--mm-bg)", fontFamily: "'DM Sans', sans-serif" }}>
      <GalleryHeader couple={g.couple} token={token} activeTab="photos" favCount={favorites.size} />

      {/* Scene navigation — always visible regardless of theme */}
      {theme !== "slideshow" && (
        <SceneNav
          activeScene={activeScene}
          onSelect={(s) => { setActiveScene(s); setLightboxIndex(null); }}
          counts={counts}
        />
      )}

      {/* Theme-switched layout */}
      <AnimatePresence mode="wait">
        <motion.div
          key={theme}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.35 }}
        >
          {theme === "masonry"   && (
            <PhotoLayoutMasonry
              photos={displayPhotos}
              favorites={favorites}
              onPhotoClick={(i) => setLightboxIndex(i)}
              onFavorite={toggleFavorite}
            />
          )}
          {theme === "grid"      && (
            <PhotoLayoutGrid
              photos={displayPhotos}
              favorites={favorites}
              onPhotoClick={(i) => setLightboxIndex(i)}
              onFavorite={toggleFavorite}
            />
          )}
          {theme === "editorial" && (
            <PhotoLayoutEditorial
              photos={displayPhotos}
              favorites={favorites}
              onPhotoClick={(i) => setLightboxIndex(i)}
              onFavorite={toggleFavorite}
            />
          )}
          {theme === "slideshow" && (
            <PhotoLayoutSlideshow
              photos={displayPhotos}
              favorites={favorites}
              initialIndex={0}
              onFavorite={toggleFavorite}
            />
          )}
        </motion.div>
      </AnimatePresence>

      {/* Footer — hidden in slideshow (it IS the layout) */}
      {theme !== "slideshow" && (
        <div style={{
          padding: "28px clamp(16px, 4vw, 32px) 48px",
          display: "flex", alignItems: "center", justifyContent: "space-between",
          flexWrap: "wrap", gap: 16,
          borderTop: "1px solid var(--mm-border)", marginTop: 4,
        }}>
          <p style={{ fontSize: 10, letterSpacing: "0.18em", color: "var(--mm-text-sec)", textTransform: "uppercase" }}>
            {displayPhotos.length} of {PHOTOS.length} photos shown
            {activeScene !== "all" && (
              <span style={{ color: "var(--mm-gold)", marginLeft: 8 }}>
                · {SCENES.find((s) => s.id === activeScene)?.label}
              </span>
            )}
          </p>
          <Link to={`/g/${token}/films`} style={{ textDecoration: "none" }}>
            <button
              style={{
                background: "transparent", border: "1px solid var(--mm-border)",
                color: "var(--mm-text-sec)", fontFamily: "'DM Sans', sans-serif",
                fontSize: 10, letterSpacing: "0.14em", textTransform: "uppercase",
                padding: "9px 18px", cursor: "pointer",
                display: "flex", alignItems: "center", gap: 8,
                transition: "border-color 0.25s, color 0.25s",
              }}
              onMouseEnter={(e) => { e.currentTarget.style.borderColor = "var(--mm-gold)"; e.currentTarget.style.color = "var(--mm-gold)"; }}
              onMouseLeave={(e) => { e.currentTarget.style.borderColor = "var(--mm-border)"; e.currentTarget.style.color = "var(--mm-text-sec)"; }}
            >
              <svg width="10" height="10" viewBox="0 0 12 14" fill="currentColor"><path d="M1 1l11 6-11 6V1z" /></svg>
              Watch Films
            </button>
          </Link>
        </div>
      )}

      {/* Floating favorites button */}
      <AnimatePresence>
        {favorites.size > 0 && (
          <motion.button
            initial={{ opacity: 0, y: 16, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.9 }}
            transition={{ duration: 0.3, ease }}
            onClick={() => setShowFavorites(true)}
            style={{
              position: "fixed", bottom: 28, right: 24, zIndex: 120,
              background: "var(--mm-surface)", border: "1px solid var(--mm-border)",
              color: "var(--mm-text)", fontFamily: "'DM Sans', sans-serif",
              fontSize: 11, fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase",
              padding: "12px 20px", cursor: "pointer",
              display: "flex", alignItems: "center", gap: 10,
              boxShadow: "0 4px 32px rgba(0,0,0,0.5)", transition: "border-color 0.25s",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.borderColor = "var(--mm-gold)")}
            onMouseLeave={(e) => (e.currentTarget.style.borderColor = "var(--mm-border)")}
          >
            <span style={{ color: "var(--mm-ember)", fontSize: 14 }}>♥</span>
            {favorites.size} Favorite{favorites.size !== 1 ? "s" : ""}
          </motion.button>
        )}
      </AnimatePresence>

      {/* Lightbox — suppressed when theme is slideshow */}
      {theme !== "slideshow" && (
        <AnimatePresence>
          {lightboxIndex !== null && (
            <Lightbox
              photos={displayPhotos}
              index={lightboxIndex}
              favorites={favorites}
              onClose={() => setLightboxIndex(null)}
              onNav={(dir) => setLightboxIndex((prev) => (prev + dir + displayPhotos.length) % displayPhotos.length)}
              onFavorite={toggleFavorite}
            />
          )}
        </AnimatePresence>
      )}

      {/* Favorites panel */}
      <AnimatePresence>
        {showFavorites && (
          <>
            <motion.div
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              transition={{ duration: 0.22 }}
              onClick={() => setShowFavorites(false)}
              style={{ position: "fixed", inset: 0, zIndex: 140, background: "rgba(0,0,0,0.5)" }}
            />
            <FavoritesPanel
              favorites={favorites}
              photos={PHOTOS}
              onClose={() => setShowFavorites(false)}
              onRemove={toggleFavorite}
            />
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
