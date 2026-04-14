// Film layout: Playlist — sidebar list + persistent inline player. No modal.
import { useState } from "react";
import { motion } from "framer-motion";
import { ease } from "../GalleryShared";
import FilmPlayer from "../FilmPlayer";

export default function FilmLayoutPlaylist({ films }) {
  const [activeFilm, setActiveFilm] = useState(films?.[0] ?? null);
  const [activeChapter, setActiveChapter] = useState(0);

  function selectFilm(film) {
    setActiveFilm(film);
    setActiveChapter(0);
  }

  if (!films || films.length === 0) return null;

  return (
    <div style={{
      display: "grid",
      gridTemplateColumns: "clamp(200px, 25%, 300px) 1fr",
      minHeight: "calc(100dvh - 56px)",
      borderTop: "1px solid var(--mm-border)",
    }}>
      {/* Sidebar list */}
      <div style={{
        borderRight: "1px solid var(--mm-border)",
        overflowY: "auto",
        background: "var(--mm-surface)",
      }}>
        <div style={{
          padding: "16px 16px 10px",
          borderBottom: "1px solid var(--mm-border)",
        }}>
          <p style={{
            fontFamily: "'DM Sans', sans-serif", fontSize: 10,
            letterSpacing: "0.2em", color: "var(--mm-text-sec)",
            textTransform: "uppercase",
          }}>
            Films
          </p>
        </div>

        {films.map((film, i) => {
          const active = activeFilm?.id === film.id;
          return (
            <motion.div
              key={film.id}
              onClick={() => selectFilm(film)}
              initial={{ opacity: 0, x: -8 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.35, delay: i * 0.06, ease }}
              style={{
                display: "flex", gap: 12, padding: "14px 16px",
                cursor: "pointer", borderLeft: `2px solid ${active ? "var(--mm-gold)" : "transparent"}`,
                background: active ? "rgba(201,169,110,0.06)" : "transparent",
                transition: "border-color 0.2s, background 0.2s",
                borderBottom: "1px solid var(--mm-border)",
              }}
              onMouseEnter={(e) => {
                if (!active) {
                  e.currentTarget.style.background = "rgba(255,255,255,0.03)";
                  e.currentTarget.style.borderLeftColor = "var(--mm-border)";
                }
              }}
              onMouseLeave={(e) => {
                if (!active) {
                  e.currentTarget.style.background = "transparent";
                  e.currentTarget.style.borderLeftColor = "transparent";
                }
              }}
            >
              {/* Thumbnail chip */}
              <div style={{
                width: 52, height: 36, background: film.color,
                flexShrink: 0, position: "relative", overflow: "hidden",
                display: "flex", alignItems: "center", justifyContent: "center",
              }}>
                <svg width="10" height="10" viewBox="0 0 12 14" fill={active ? "var(--mm-gold)" : "rgba(255,255,255,0.5)"} style={{ marginLeft: 1 }}>
                  <path d="M1 1l11 6-11 6V1z" />
                </svg>
              </div>
              {/* Info */}
              <div style={{ flex: 1, minWidth: 0 }}>
                <p style={{
                  fontFamily: "'Playfair Display', serif", fontStyle: "italic",
                  fontSize: 13, color: active ? "var(--mm-text)" : "var(--mm-text-sec)",
                  margin: "0 0 3px", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis",
                  transition: "color 0.2s",
                }}>
                  {film.title}
                </p>
                <p style={{
                  fontFamily: "'DM Sans', sans-serif", fontSize: 10,
                  letterSpacing: "0.06em", color: "var(--mm-text-sec)", margin: 0,
                }}>
                  {film.duration}
                </p>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Inline player */}
      <div style={{
        padding: "clamp(20px, 4vw, 48px)",
        display: "flex", alignItems: "flex-start", overflow: "auto",
      }}>
        <div style={{ width: "100%", maxWidth: 860 }}>
          <FilmPlayer
            film={activeFilm}
            activeChapter={activeChapter}
            onChapterSelect={setActiveChapter}
          />
        </div>
      </div>
    </div>
  );
}
