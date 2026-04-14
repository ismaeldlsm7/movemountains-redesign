// ═══════════════════════════════════════════════════════════════════
// movemountains-gallery-films.jsx
// Private client film delivery — theme-switched layouts
// Route: /g/:token/films
// ═══════════════════════════════════════════════════════════════════
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useParams } from "react-router-dom";
import { resolveGallery } from "../gallery/galleryData";
import { GalleryHeader, ease } from "../gallery/GalleryShared";
import { ChapterNav } from "../gallery/FilmComponents";
import FilmLayoutHero      from "../gallery/layouts/FilmLayoutHero";
import FilmLayoutCinematic from "../gallery/layouts/FilmLayoutCinematic";
import FilmLayoutPlaylist  from "../gallery/layouts/FilmLayoutPlaylist";

// ── Video player modal ─────────────────────────────────────────────
function VideoModal({ film, activeChapter, onClose, onChapterSelect }) {
  useEffect(() => {
    const handler = (e) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [onClose]);

  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => (document.body.style.overflow = prev);
  }, []);

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.25 }}
        onClick={onClose}
        style={{
          position: "fixed", inset: 0, zIndex: 200,
          background: "rgba(7,6,5,0.97)",
          display: "flex", flexDirection: "column",
          alignItems: "center", justifyContent: "center",
          padding: "clamp(16px, 3vw, 48px)",
        }}
      >
        <motion.div
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.96, opacity: 0 }}
          transition={{ duration: 0.28, ease }}
          onClick={(e) => e.stopPropagation()}
          style={{ width: "100%", maxWidth: 1080, display: "flex", flexDirection: "column", gap: 20 }}
        >
          {/* 16:9 player */}
          <div style={{
            width: "100%", aspectRatio: "16/9", background: film.color,
            position: "relative", display: "flex", alignItems: "center", justifyContent: "center",
          }}>
            <div style={{ textAlign: "center" }}>
              <p style={{
                fontFamily: "'DM Sans', sans-serif", fontSize: 10,
                letterSpacing: "0.22em", color: "rgba(255,255,255,0.18)",
                textTransform: "uppercase", marginBottom: 10,
              }}>
                Bunny Stream Player
              </p>
              <p style={{
                fontFamily: "'Playfair Display', serif", fontStyle: "italic",
                fontSize: "clamp(18px, 2.5vw, 28px)", color: "rgba(255,255,255,0.22)",
              }}>
                {film.title}
              </p>
              {film.chapters?.[activeChapter] && (
                <p style={{
                  fontFamily: "'DM Sans', sans-serif", fontSize: 11,
                  letterSpacing: "0.14em", color: "rgba(201,169,110,0.45)",
                  textTransform: "uppercase", marginTop: 8,
                }}>
                  → {film.chapters[activeChapter].label} at {film.chapters[activeChapter].time}
                </p>
              )}
            </div>
            <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: 3, background: "rgba(255,255,255,0.08)" }}>
              <div style={{ height: "100%", width: "28%", background: "var(--mm-gold)", opacity: 0.7 }} />
            </div>
          </div>

          {/* Title + download */}
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 16 }}>
            <div>
              <h2 style={{
                fontFamily: "'Playfair Display', serif", fontStyle: "italic",
                fontWeight: 400, fontSize: 20, color: "var(--mm-text)", margin: "0 0 4px",
              }}>
                {film.title}
              </h2>
              <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 11, color: "var(--mm-text-sec)", letterSpacing: "0.06em" }}>
                {film.duration}
              </p>
            </div>
            <button
              style={{
                background: "transparent", border: "1px solid var(--mm-border)",
                color: "var(--mm-text-sec)", fontFamily: "'DM Sans', sans-serif",
                fontSize: 10, letterSpacing: "0.12em", textTransform: "uppercase",
                padding: "8px 16px", cursor: "pointer",
                display: "flex", alignItems: "center", gap: 7, flexShrink: 0,
                transition: "border-color 0.25s, color 0.25s",
              }}
              onMouseEnter={(e) => { e.currentTarget.style.borderColor = "var(--mm-gold)"; e.currentTarget.style.color = "var(--mm-gold)"; }}
              onMouseLeave={(e) => { e.currentTarget.style.borderColor = "var(--mm-border)"; e.currentTarget.style.color = "var(--mm-text-sec)"; }}
            >
              <svg width="11" height="11" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M6 2v6M3 8l3 3 3-3M2 11h8" />
              </svg>
              Download Film
            </button>
          </div>

          <ChapterNav chapters={film.chapters} activeChapter={activeChapter} onSelect={onChapterSelect} />
        </motion.div>

        {/* Close */}
        <button
          onClick={onClose}
          style={{
            position: "absolute", top: 20, right: 20, width: 40, height: 40,
            background: "transparent", border: "1px solid var(--mm-border)",
            color: "var(--mm-text-sec)", cursor: "pointer",
            display: "flex", alignItems: "center", justifyContent: "center",
            transition: "border-color 0.25s, color 0.25s",
          }}
          onMouseEnter={(e) => { e.currentTarget.style.borderColor = "var(--mm-gold)"; e.currentTarget.style.color = "var(--mm-gold)"; }}
          onMouseLeave={(e) => { e.currentTarget.style.borderColor = "var(--mm-border)"; e.currentTarget.style.color = "var(--mm-text-sec)"; }}
        >
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path d="M1 1l12 12M13 1L1 13" />
          </svg>
        </button>
      </motion.div>
    </AnimatePresence>
  );
}

// ── Main page ──────────────────────────────────────────────────────
export default function GalleryFilms() {
  const { token } = useParams();
  const g = resolveGallery(token);
  const theme = g.filmTheme ?? "hero";

  const [playerFilm, setPlayerFilm] = useState(null);
  const [activeChapter, setActiveChapter] = useState(0);

  useEffect(() => {
    const prevTitle = document.title;
    document.title = `${g.couple} Films — Move Mountains Co.`;
    const meta = document.createElement("meta");
    meta.name = "robots";
    meta.content = "noindex, nofollow";
    document.head.appendChild(meta);
    return () => {
      document.title = prevTitle;
      document.head.removeChild(meta);
    };
  }, [g.couple]);

  function openPlayer(film, chapter = 0) {
    setPlayerFilm(film);
    setActiveChapter(typeof chapter === "number" ? chapter : 0);
  }

  function closePlayer() {
    setPlayerFilm(null);
    setActiveChapter(0);
  }

  return (
    <div style={{ minHeight: "100dvh", background: "var(--mm-bg)", fontFamily: "'DM Sans', sans-serif" }}>
      <GalleryHeader couple={g.couple} token={token} activeTab="films" />

      {/* Theme-switched layout */}
      <AnimatePresence mode="wait">
        <motion.div
          key={theme}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.35 }}
        >
          {theme === "hero"      && <FilmLayoutHero      films={g.films} onPlay={openPlayer} />}
          {theme === "cinematic" && <FilmLayoutCinematic films={g.films} onPlay={openPlayer} />}
          {theme === "playlist"  && <FilmLayoutPlaylist  films={g.films} />}
        </motion.div>
      </AnimatePresence>

      {/* Video modal — used by hero + cinematic, not playlist */}
      <AnimatePresence>
        {playerFilm && (
          <VideoModal
            film={playerFilm}
            activeChapter={activeChapter}
            onClose={closePlayer}
            onChapterSelect={setActiveChapter}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
