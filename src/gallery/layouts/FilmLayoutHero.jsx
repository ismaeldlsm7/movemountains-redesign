// Film layout: Hero — featured hero card + chapter chips + secondary film grid.
import { FadeIn } from "../GalleryShared";
import { FilmCard, ChapterNav } from "../FilmComponents";

export default function FilmLayoutHero({ films, onPlay }) {
  if (!films || films.length === 0) return null;
  const heroFilm = films[0];
  const otherFilms = films.slice(1);

  return (
    <main style={{ maxWidth: 1100, margin: "0 auto", padding: "clamp(32px, 5vw, 64px) clamp(16px, 4vw, 32px)" }}>
      {/* Hero film */}
      <FadeIn delay={0}>
        <FilmCard film={heroFilm} onPlay={onPlay} size="hero" />
      </FadeIn>

      {/* Chapter navigation for hero */}
      <FadeIn delay={0.1}>
        <div style={{ marginTop: 20, marginBottom: 56, borderTop: "1px solid var(--mm-border)", paddingTop: 20 }}>
          <p style={{
            fontSize: 10, letterSpacing: "0.2em", color: "var(--mm-text-sec)",
            textTransform: "uppercase", marginBottom: 12,
          }}>
            Jump to chapter
          </p>
          <ChapterNav
            chapters={heroFilm.chapters}
            activeChapter={-1}
            onSelect={(i) => onPlay(heroFilm, i)}
          />
        </div>
      </FadeIn>

      {/* Other films */}
      {otherFilms.length > 0 && (
        <>
          <FadeIn delay={0.05}>
            <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 28 }}>
              <p style={{
                fontSize: 10, letterSpacing: "0.24em", color: "var(--mm-text-sec)",
                textTransform: "uppercase", flexShrink: 0,
              }}>
                Full-Length Films
              </p>
              <div style={{ flex: 1, height: 1, background: "var(--mm-border)" }} />
            </div>
          </FadeIn>
          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))",
            gap: "clamp(16px, 3vw, 28px)",
          }}>
            {otherFilms.map((film, i) => (
              <FadeIn key={film.id} delay={0.08 * (i + 1)}>
                <FilmCard film={film} onPlay={onPlay} />
              </FadeIn>
            ))}
          </div>
        </>
      )}
    </main>
  );
}
