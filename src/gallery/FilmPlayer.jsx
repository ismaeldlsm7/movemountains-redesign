// Inner player — used inside VideoModal and FilmLayoutPlaylist.
// Renders the 16:9 player area + title row + chapter nav. No overlay/backdrop.
import { ChapterNav } from "./FilmComponents";

export default function FilmPlayer({ film, activeChapter, onChapterSelect }) {
  if (!film) return null;
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 20, width: "100%" }}>
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
            fontSize: "clamp(14px, 2vw, 24px)", color: "rgba(255,255,255,0.22)",
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
        {/* Scrubber bar (visual only) */}
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
          <p style={{
            fontFamily: "'DM Sans', sans-serif", fontSize: 11,
            color: "var(--mm-text-sec)", letterSpacing: "0.06em",
          }}>
            {film.duration}
          </p>
        </div>
        <button
          style={{
            background: "transparent", border: "1px solid var(--mm-border)",
            color: "var(--mm-text-sec)", fontFamily: "'DM Sans', sans-serif",
            fontSize: 10, letterSpacing: "0.12em", textTransform: "uppercase",
            padding: "8px 16px", cursor: "pointer", display: "flex",
            alignItems: "center", gap: 7, flexShrink: 0, transition: "border-color 0.25s, color 0.25s",
          }}
          onMouseEnter={(e) => { e.currentTarget.style.borderColor = "var(--mm-gold)"; e.currentTarget.style.color = "var(--mm-gold)"; }}
          onMouseLeave={(e) => { e.currentTarget.style.borderColor = "var(--mm-border)"; e.currentTarget.style.color = "var(--mm-text-sec)"; }}
        >
          <svg width="11" height="11" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path d="M6 2v6M3 8l3 3 3-3M2 11h8" />
          </svg>
          Download
        </button>
      </div>

      {/* Chapter nav */}
      <ChapterNav
        chapters={film.chapters}
        activeChapter={activeChapter}
        onSelect={onChapterSelect}
      />
    </div>
  );
}
