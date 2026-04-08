import { useState, useEffect, useRef } from "react";
import { motion, useInView, useScroll, useTransform, AnimatePresence } from "framer-motion";
import Header from "../components/Header";
import Footer from "../components/Footer";
import CheckAvailabilityButton from "../components/CheckAvailabilityButton";

const DS = {
  bg: "#0F0F0F", surface: "#1E1E1E", surfaceAlt: "#161616",
  text: "#F5F0E8", textSec: "#8A8477", gold: "#C9A96E",
  ember: "#E8572A", border: "#2A2A2A",
};

const fontLink = "https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,700;1,400&family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;0,700;1,400;1,500&family=DM+Sans:wght@400;500;600;700&family=Bebas+Neue&display=swap";

/* ── Wedding Story Data ──────────────────────────────────────────── */

const story = {
  couple: "Carey & Luke",
  venue: "Rosecliff Mansion",
  location: "Newport, Rhode Island",
  date: "June 14, 2025",
  season: "Summer",
  style: "Classic",
  guestCount: "185",
  team: [
    { name: "Tiahna Lynn", role: "Lead Photographer" },
    { name: "Josh Mighill", role: "Second Photographer" },
    { name: "Yan La Mort", role: "Cinematographer" },
  ],
  tagline: "Old-world elegance meets golden hour on the Newport coast.",
  lede: "Some weddings whisper. Carey and Luke's roared — in the most elegant way possible. Set against the Gilded Age grandeur of Rosecliff Mansion, their June celebration was a masterclass in blending old-world architecture with new-world love. From the first look on the marble terrace to the last dance under a chandelier-lit ballroom, every frame told a story of two people who knew exactly who they were — and exactly who they wanted to become together.",
  chapters: [
    {
      title: "The Morning",
      text: "The day started in the bridal suite overlooking the Atlantic. Carey's dress — a fitted lace gown with cathedral-length veil — hung in the window light while her bridesmaids filled the room with champagne and chaos. Luke's preparation was quieter, more reflective. A handwritten letter from Carey. A pause. A deep breath. Then the day began.",
      layout: "duo",
      colors: ["#2a2420", "#241e1a"],
      labels: ["Bridal Suite — Window Light", "Groom's Letter — Detail"],
    },
    {
      title: "The First Look",
      text: "They chose to do a first look on the mansion's west terrace. Carey walked toward Luke from behind, tapped his shoulder, and the moment he turned — time stopped. Tiahna captured the exact frame when his expression shifted from composure to complete awe. It's the photo they framed above their fireplace.",
      layout: "hero",
      colors: ["#22201a"],
      labels: ["First Look — West Terrace, Rosecliff"],
    },
    {
      title: "The Ceremony",
      text: "They exchanged vows on the ocean-facing lawn with 185 guests watching from white chairs arranged in a perfect arc. The officiant was Carey's college roommate. The readings were from letters they wrote each other during a year of long-distance. The wind caught the veil at the exact right moment — and Josh was ready.",
      layout: "trio",
      colors: ["#1e1c18", "#24221e", "#201e1a"],
      labels: ["Vows — Ocean Lawn", "Ring Exchange", "The Kiss"],
    },
    {
      title: "The Portraits",
      text: "Golden hour hit at 7:42pm and the light poured through the mansion's colonnades like liquid amber. We had exactly 28 minutes. Carey and Luke moved through the grounds — the rose garden, the reflecting pool, the cliff edge with the Atlantic behind them — while Tiahna and Josh worked from both sides. These are the images that ended up in British Vogue's wedding feature.",
      layout: "cinematic",
      colors: ["#2a2218"],
      labels: ["Golden Hour — Rosecliff Colonnade"],
    },
    {
      title: "The Reception",
      text: "The ballroom at Rosecliff needs no decoration — but Carey and Luke added hundreds of candles, a 12-piece live band, and a dessert table that stretched the length of the room. The first dance was a slow waltz that built into an unexpected dip. The dance floor never emptied after that. Brandon captured the energy; Amanda caught the details. The last song played at midnight.",
      layout: "grid",
      colors: ["#201c1a", "#1e1a18", "#241e1c", "#221e1a"],
      labels: ["Ballroom — Candlelight", "First Dance", "Dance Floor Energy", "The Last Song"],
    },
  ],
  vendors: [
    { role: "Venue", name: "Rosecliff Mansion" },
    { role: "Photography", name: "Move Mountains Co." },
    { role: "Videography", name: "Move Mountains Co." },
    { role: "Florist", name: "Sayles Livingston Design" },
    { role: "Band", name: "The Sultans" },
    { role: "Catering", name: "Russell Morin Catering" },
    { role: "Dress", name: "Mark Ingram Atelier" },
    { role: "Hair & Makeup", name: "Jennie Kay Beauty" },
    { role: "Planner", name: "Gourmet Affairs" },
    { role: "Cake", name: "Sin Bakery" },
  ],
  pullQuote: "Choosing Move Mountains was one of the best vendor decisions we made for our wedding. Every single photo is a work of art.",
  relatedStories: [
    { couple: "Howard & Shreya", venue: "OceanCliff Hotel", style: "Cinematic", color: "#1e2024" },
    { couple: "Joel & Corey", venue: "The Chanler", style: "Classic", color: "#221e22" },
    { couple: "Tim & Katie", venue: "St. Mary's, Narragansett", style: "Bright", color: "#22201a" },
  ],
};

/* ── Helpers ─────────────────────────────────────────────────────── */

function FadeIn({ children, delay = 0, y = 24 }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  return (
    <motion.div ref={ref} initial={{ opacity: 0, y }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.7, delay, ease: [0.25, 0.1, 0.25, 1] }}>
      {children}
    </motion.div>
  );
}

function ParallaxBlock({ children, offset = 30 }) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [offset, -offset]);
  return <div ref={ref} style={{ overflow: "hidden" }}><motion.div style={{ y }}>{children}</motion.div></div>;
}

function ImagePlaceholder({ color, label, aspect = "16/9", style: extraStyle = {} }) {
  return (
    <div style={{ width: "100%", aspectRatio: aspect, background: color, display: "flex", alignItems: "center", justifyContent: "center", position: "relative", ...extraStyle }}>
      <span style={{ fontFamily: "'DM Sans'", fontSize: 11, color: DS.textSec, opacity: 0.22, textTransform: "uppercase", letterSpacing: "0.12em", textAlign: "center", padding: "0 20px", lineHeight: 1.5 }}>
        [ {label} ]
      </span>
    </div>
  );
}

function RevealLine({ delay = 0 }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });
  return <motion.div ref={ref} initial={{ scaleX: 0 }} animate={inView ? { scaleX: 1 } : {}} transition={{ duration: 0.7, delay, ease: "easeOut" }} style={{ height: 1, background: DS.border, transformOrigin: "left" }} />;
}

/* ── Nav ──────────────────────────────────────────────────────────── */

/* ── Chapter Gallery Layouts ─────────────────────────────────────── */

function ChapterGallery({ chapter }) {
  const { layout, colors, labels } = chapter;

  if (layout === "hero") {
    return (
      <FadeIn>
        <ParallaxBlock offset={24}>
          <ImagePlaceholder color={colors[0]} label={labels[0]} aspect="21/9" />
        </ParallaxBlock>
      </FadeIn>
    );
  }

  if (layout === "duo") {
    return (
      <div style={{ display: "grid", gridTemplateColumns: "1.2fr 1fr", gap: 12 }} className="chapter-duo">
        <FadeIn><ImagePlaceholder color={colors[0]} label={labels[0]} aspect="4/5" /></FadeIn>
        <FadeIn delay={0.08}><ImagePlaceholder color={colors[1]} label={labels[1]} aspect="4/5" /></FadeIn>
      </div>
    );
  }

  if (layout === "trio") {
    return (
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 12 }} className="chapter-trio">
        {colors.map((c, i) => (
          <FadeIn key={i} delay={i * 0.06}><ImagePlaceholder color={c} label={labels[i]} aspect="3/4" /></FadeIn>
        ))}
      </div>
    );
  }

  if (layout === "cinematic") {
    return (
      <FadeIn>
        <ParallaxBlock offset={35}>
          <ImagePlaceholder color={colors[0]} label={labels[0]} aspect="2.39/1" />
        </ParallaxBlock>
      </FadeIn>
    );
  }

  if (layout === "grid") {
    return (
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }} className="chapter-grid-img">
        {colors.map((c, i) => (
          <FadeIn key={i} delay={i * 0.06}><ImagePlaceholder color={c} label={labels[i]} aspect="16/10" /></FadeIn>
        ))}
      </div>
    );
  }

  return null;
}

/* ── Chapter Section ─────────────────────────────────────────────── */

function Chapter({ chapter, index }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const words = chapter.text.split(" ");

  return (
    <div ref={ref} style={{ marginBottom: 80 }}>
      {/* Chapter header */}
      <FadeIn>
        <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 28 }}>
          <span style={{ fontFamily: "'Bebas Neue'", fontSize: 42, color: DS.gold, opacity: 0.25, lineHeight: 1 }}>
            {String(index + 1).padStart(2, "0")}
          </span>
          <div style={{ height: 1, width: 40, background: DS.border }} />
          <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(26px, 3vw, 38px)", fontWeight: 700, color: DS.text, margin: 0 }}>
            {chapter.title}
          </h2>
        </div>
      </FadeIn>

      {/* Text with word-by-word opacity */}
      <div style={{ maxWidth: 720, marginBottom: 36 }}>
        <p style={{ fontFamily: "'DM Sans'", fontSize: "clamp(15px, 1.2vw, 17px)", color: DS.textSec, lineHeight: 1.8 }}>
          {words.map((w, i) => (
            <motion.span key={i} initial={{ opacity: 0.15 }} animate={inView ? { opacity: 1 } : {}} transition={{ duration: 0.3, delay: 0.2 + i * 0.012 }} style={{ display: "inline-block", marginRight: "0.28em" }}>
              {w}
            </motion.span>
          ))}
        </p>
      </div>

      {/* Gallery */}
      <ChapterGallery chapter={chapter} />
    </div>
  );
}

/* ── Lightbox ────────────────────────────────────────────────────── */

function Lightbox({ images, startIndex, onClose }) {
  const [current, setCurrent] = useState(startIndex);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    const handler = (e) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") setCurrent((c) => Math.min(c + 1, images.length - 1));
      if (e.key === "ArrowLeft") setCurrent((c) => Math.max(c - 1, 0));
    };
    window.addEventListener("keydown", handler);
    return () => { document.body.style.overflow = ""; window.removeEventListener("keydown", handler); };
  }, [images.length, onClose]);

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.25 }}
      onClick={onClose}
      style={{ position: "fixed", inset: 0, zIndex: 300, background: "rgba(5,5,5,0.97)", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer" }}>
      
      {/* Counter */}
      <div style={{ position: "absolute", top: 24, left: 32, fontFamily: "'DM Sans'", fontSize: 13, color: DS.textSec }}>
        <span style={{ color: DS.gold }}>{current + 1}</span> / {images.length}
      </div>

      {/* Close */}
      <div style={{ position: "absolute", top: 24, right: 32, fontFamily: "'DM Sans'", fontSize: 14, color: DS.textSec }}>
        ESC to close
      </div>

      {/* Image */}
      <AnimatePresence mode="wait">
        <motion.div key={current} initial={{ opacity: 0, scale: 0.97 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.97 }} transition={{ duration: 0.2 }}
          onClick={(e) => e.stopPropagation()}
          style={{ width: "80vw", maxWidth: 1000, aspectRatio: "16/10", background: images[current].color, display: "flex", alignItems: "center", justifyContent: "center", cursor: "default" }}>
          <span style={{ fontFamily: "'DM Sans'", fontSize: 12, color: DS.textSec, opacity: 0.3, textTransform: "uppercase", letterSpacing: "0.12em" }}>[ {images[current].label} ]</span>
        </motion.div>
      </AnimatePresence>

      {/* Arrows */}
      {current > 0 && (
        <button onClick={(e) => { e.stopPropagation(); setCurrent(current - 1); }} style={{
          position: "absolute", left: 24, top: "50%", transform: "translateY(-50%)",
          background: "none", border: `1px solid ${DS.border}`, width: 48, height: 48, cursor: "pointer",
          fontFamily: "'DM Sans'", fontSize: 18, color: DS.text, display: "flex", alignItems: "center", justifyContent: "center",
          transition: "border-color 0.3s",
        }}
          onMouseEnter={(e) => e.currentTarget.style.borderColor = DS.gold}
          onMouseLeave={(e) => e.currentTarget.style.borderColor = DS.border}
        >←</button>
      )}
      {current < images.length - 1 && (
        <button onClick={(e) => { e.stopPropagation(); setCurrent(current + 1); }} style={{
          position: "absolute", right: 24, top: "50%", transform: "translateY(-50%)",
          background: "none", border: `1px solid ${DS.border}`, width: 48, height: 48, cursor: "pointer",
          fontFamily: "'DM Sans'", fontSize: 18, color: DS.text, display: "flex", alignItems: "center", justifyContent: "center",
          transition: "border-color 0.3s",
        }}
          onMouseEnter={(e) => e.currentTarget.style.borderColor = DS.gold}
          onMouseLeave={(e) => e.currentTarget.style.borderColor = DS.border}
        >→</button>
      )}
    </motion.div>
  );
}

/* ── Main Wedding Detail Page ────────────────────────────────────── */

export default function WeddingDetailPage() {
  const [scrolled, setScrolled] = useState(false);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);

  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const heroScale = useTransform(scrollYProgress, [0, 1], [1.05, 1.2]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);

  // Flatten all images for lightbox
  const allImages = story.chapters.flatMap((ch) =>
    ch.colors.map((c, i) => ({ color: c, label: ch.labels[i] }))
  );

  const openLightbox = (chapterIdx, imgIdx) => {
    let flatIndex = 0;
    for (let i = 0; i < chapterIdx; i++) flatIndex += story.chapters[i].colors.length;
    flatIndex += imgIdx;
    setLightboxIndex(flatIndex);
    setLightboxOpen(true);
  };

  return (
    <div style={{ background: DS.bg, color: DS.text, minHeight: "100vh" }}>
      <style>{`
        @import url('${fontLink}');
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body { background: ${DS.bg}; }
        html { scroll-behavior: smooth; }
        ::-webkit-scrollbar { width: 5px; }
        ::-webkit-scrollbar-track { background: ${DS.bg}; }
        ::-webkit-scrollbar-thumb { background: ${DS.border}; }
        ::-webkit-scrollbar-thumb:hover { background: ${DS.gold}; }
        ::selection { background: ${DS.gold}; color: ${DS.bg}; }
        @media (max-width: 768px) {
          .nav-links { display: none !important; }
          .meta-grid { grid-template-columns: 1fr 1fr !important; }
          .chapter-duo, .chapter-trio, .chapter-grid-img { grid-template-columns: 1fr !important; }
          .story-body { padding-left: 24px !important; padding-right: 24px !important; }
          .related-grid { grid-template-columns: 1fr !important; }
          .vendor-grid { grid-template-columns: 1fr 1fr !important; }
        }
      `}</style>

      <Header activePage="Portfolio" />

      {/* ── HERO ──────────────────────────────────────────────────── */}
      <div ref={heroRef} style={{ height: "75vh", minHeight: 480, maxHeight: 800, position: "relative", overflow: "hidden" }}>
        <motion.div style={{ scale: heroScale, position: "absolute", inset: 0 }}>
          <div style={{
            width: "100%", height: "100%",
            background: "linear-gradient(160deg, #2a2218 0%, #221e18 40%, #1a1a16 70%, #0f0f0f 100%)",
            display: "flex", alignItems: "center", justifyContent: "center",
          }}>
            <span style={{ fontFamily: "'DM Sans'", fontSize: 13, color: DS.textSec, opacity: 0.25, textTransform: "uppercase", letterSpacing: "0.2em" }}>
              [ Hero — Carey & Luke, Rosecliff Mansion ]
            </span>
          </div>
        </motion.div>

        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to bottom, rgba(15,15,15,0.15) 0%, rgba(15,15,15,0.1) 40%, rgba(15,15,15,0.75) 80%, #0F0F0F 100%)" }} />

        <motion.div style={{ opacity: heroOpacity, position: "absolute", bottom: "10%", left: 0, right: 0, padding: "0 32px" }}>
          <div style={{ maxWidth: 1000, margin: "0 auto" }}>
            <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5, duration: 0.7 }}>
              <div style={{ fontFamily: "'DM Sans'", fontSize: 12, color: DS.gold, textTransform: "uppercase", letterSpacing: "0.2em", marginBottom: 16 }}>
                Wedding Story · {story.style}
              </div>
              <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(44px, 7vw, 84px)", fontWeight: 700, color: DS.text, lineHeight: 1, margin: "0 0 12px", letterSpacing: "-0.02em" }}>
                {story.couple}
              </h1>
              <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(18px, 2.2vw, 26px)", color: DS.textSec, fontStyle: "italic", fontWeight: 400 }}>
                {story.venue} · {story.location}
              </p>
            </motion.div>
          </div>
        </motion.div>
      </div>

      {/* ── META STRIP ────────────────────────────────────────────── */}
      <div style={{ borderBottom: `1px solid ${DS.border}`, padding: "0 32px" }}>
        <div style={{ maxWidth: 1000, margin: "0 auto", display: "grid", gridTemplateColumns: "repeat(5, 1fr)", gap: 1, background: DS.border }} className="meta-grid">
          {[
            { label: "Date", value: story.date },
            { label: "Venue", value: story.venue },
            { label: "Guests", value: story.guestCount },
            { label: "Style", value: story.style },
            { label: "Season", value: story.season },
          ].map((m) => (
            <div key={m.label} style={{ background: DS.bg, padding: "20px 16px", textAlign: "center" }}>
              <div style={{ fontFamily: "'DM Sans'", fontSize: 10, color: DS.gold, textTransform: "uppercase", letterSpacing: "0.12em", marginBottom: 4 }}>{m.label}</div>
              <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 17, fontWeight: 500, color: DS.text }}>{m.value}</div>
            </div>
          ))}
        </div>
      </div>

      {/* ── LEDE ──────────────────────────────────────────────────── */}
      <div className="story-body" style={{ maxWidth: 1000, margin: "0 auto", padding: "72px 32px 0" }}>
        <FadeIn>
          <div style={{ maxWidth: 720 }}>
            <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(20px, 2.5vw, 28px)", color: DS.text, lineHeight: 1.55, fontWeight: 400, fontStyle: "italic" }}>
              {story.tagline}
            </p>
          </div>
        </FadeIn>

        <FadeIn delay={0.1}>
          <div style={{ maxWidth: 720, marginTop: 28 }}>
            <p style={{ fontFamily: "'DM Sans'", fontSize: "clamp(15px, 1.2vw, 17px)", color: DS.textSec, lineHeight: 1.8 }}>
              {story.lede}
            </p>
          </div>
        </FadeIn>

        {/* Team strip */}
        <FadeIn delay={0.15}>
          <div style={{ display: "flex", gap: 24, marginTop: 36, paddingTop: 24, borderTop: `1px solid ${DS.border}`, flexWrap: "wrap" }}>
            <div style={{ fontFamily: "'DM Sans'", fontSize: 11, color: DS.gold, textTransform: "uppercase", letterSpacing: "0.12em", marginRight: 8, paddingTop: 2 }}>Shot by</div>
            {story.team.map((t) => (
              <div key={t.name} style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <div style={{ width: 32, height: 32, borderRadius: "50%", background: DS.surface, display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <span style={{ fontFamily: "'Playfair Display'", fontSize: 14, color: DS.gold, opacity: 0.5, fontWeight: 700 }}>{t.name[0]}</span>
                </div>
                <div>
                  <div style={{ fontFamily: "'DM Sans'", fontSize: 13, color: DS.text, fontWeight: 500 }}>{t.name}</div>
                  <div style={{ fontFamily: "'DM Sans'", fontSize: 11, color: DS.textSec }}>{t.role}</div>
                </div>
              </div>
            ))}
          </div>
        </FadeIn>

        <div style={{ marginTop: 48 }}><RevealLine /></div>
      </div>

      {/* ── CHAPTERS ──────────────────────────────────────────────── */}
      <div className="story-body" style={{ maxWidth: 1000, margin: "0 auto", padding: "56px 32px 0" }}>
        {story.chapters.map((ch, i) => (
          <Chapter key={ch.title} chapter={ch} index={i} />
        ))}
      </div>

      {/* ── FULL GALLERY STRIP ────────────────────────────────────── */}
      <div style={{ borderTop: `1px solid ${DS.border}`, borderBottom: `1px solid ${DS.border}`, padding: "60px 32px" }}>
        <div style={{ maxWidth: 1000, margin: "0 auto" }}>
          <FadeIn>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: 32 }}>
              <div>
                <div style={{ fontFamily: "'DM Sans'", fontSize: 12, color: DS.gold, textTransform: "uppercase", letterSpacing: "0.2em", marginBottom: 8 }}>Full Gallery</div>
                <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(24px, 3vw, 36px)", fontWeight: 700, color: DS.text, margin: 0 }}>
                  All {allImages.length} Selects
                </h2>
              </div>
              <div style={{ fontFamily: "'DM Sans'", fontSize: 13, color: DS.textSec }}>Click any image to enlarge</div>
            </div>
          </FadeIn>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(120px, 1fr))", gap: 6 }}>
            {allImages.map((img, i) => (
              <FadeIn key={i} delay={i * 0.02}>
                <div onClick={() => { setLightboxIndex(i); setLightboxOpen(true); }}
                  style={{ aspectRatio: "1/1", background: img.color, cursor: "pointer", transition: "opacity 0.3s, transform 0.3s" }}
                  onMouseEnter={(e) => { e.currentTarget.style.opacity = 0.7; e.currentTarget.style.transform = "scale(1.03)"; }}
                  onMouseLeave={(e) => { e.currentTarget.style.opacity = 1; e.currentTarget.style.transform = "scale(1)"; }}
                />
              </FadeIn>
            ))}
          </div>
        </div>
      </div>

      {/* ── PULL QUOTE ────────────────────────────────────────────── */}
      <div style={{ padding: "80px 32px", textAlign: "center" }}>
        <FadeIn>
          <div style={{ maxWidth: 750, margin: "0 auto" }}>
            <div style={{ fontFamily: "'Playfair Display', serif", fontSize: 64, color: DS.gold, opacity: 0.18, lineHeight: 1, marginBottom: -16 }}>"</div>
            <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(22px, 3vw, 32px)", color: DS.text, lineHeight: 1.45, fontStyle: "italic", fontWeight: 500 }}>
              {story.pullQuote}
            </p>
            <div style={{ fontFamily: "'DM Sans'", fontSize: 13, color: DS.gold, textTransform: "uppercase", letterSpacing: "0.12em", marginTop: 20 }}>— {story.couple}</div>
          </div>
        </FadeIn>
      </div>

      {/* ── VENDOR CREDITS ────────────────────────────────────────── */}
      <div style={{ background: DS.surface, borderTop: `1px solid ${DS.border}`, borderBottom: `1px solid ${DS.border}`, padding: "64px 32px" }}>
        <div style={{ maxWidth: 800, margin: "0 auto" }}>
          <FadeIn>
            <div style={{ textAlign: "center", marginBottom: 36 }}>
              <div style={{ fontFamily: "'DM Sans'", fontSize: 12, color: DS.gold, textTransform: "uppercase", letterSpacing: "0.2em", marginBottom: 8 }}>The Team Behind the Day</div>
              <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(24px, 3vw, 36px)", fontWeight: 700, color: DS.text, margin: 0 }}>Vendor Credits</h2>
            </div>
          </FadeIn>

          <FadeIn delay={0.1}>
            <div className="vendor-grid" style={{ display: "grid", gridTemplateColumns: "repeat(5, 1fr)", gap: 1, background: DS.border }}>
              {story.vendors.map((v) => (
                <div key={v.role} style={{ background: DS.surface, padding: "18px 14px", textAlign: "center" }}>
                  <div style={{ fontFamily: "'DM Sans'", fontSize: 10, color: DS.gold, textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: 6 }}>{v.role}</div>
                  <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 15, fontWeight: 500, color: DS.text }}>{v.name}</div>
                </div>
              ))}
            </div>
          </FadeIn>
        </div>
      </div>

      {/* ── RELATED STORIES ───────────────────────────────────────── */}
      <div style={{ padding: "80px 32px", maxWidth: 1200, margin: "0 auto" }}>
        <FadeIn>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: 36, flexWrap: "wrap", gap: 16 }}>
            <div>
              <div style={{ fontFamily: "'DM Sans'", fontSize: 12, color: DS.gold, textTransform: "uppercase", letterSpacing: "0.2em", marginBottom: 8 }}>More Love Stories</div>
              <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(24px, 3vw, 36px)", fontWeight: 700, color: DS.text, margin: 0 }}>You Might Also Love</h2>
            </div>
            <a href="#" style={{ fontFamily: "'DM Sans'", fontSize: 13, color: DS.gold, textDecoration: "none", textTransform: "uppercase", letterSpacing: "0.08em", borderBottom: `1px solid ${DS.gold}`, paddingBottom: 2 }}>
              All Stories →
            </a>
          </div>
        </FadeIn>

        <div className="related-grid" style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 16 }}>
          {story.relatedStories.map((rs, i) => (
            <FadeIn key={rs.couple} delay={i * 0.08}>
              <a href="#" style={{ textDecoration: "none", display: "block" }}>
                <div style={{ position: "relative", overflow: "hidden", cursor: "pointer" }}
                  onMouseEnter={(e) => { e.currentTarget.querySelector('.rs-img').style.transform = "scale(1.04)"; e.currentTarget.querySelector('.rs-ov').style.opacity = 1; }}
                  onMouseLeave={(e) => { e.currentTarget.querySelector('.rs-img').style.transform = "scale(1)"; e.currentTarget.querySelector('.rs-ov').style.opacity = 0; }}
                >
                  <div className="rs-img" style={{ width: "100%", aspectRatio: "4/5", background: rs.color, display: "flex", alignItems: "center", justifyContent: "center", transition: "transform 0.6s ease" }}>
                    <span style={{ fontFamily: "'DM Sans'", fontSize: 11, color: DS.textSec, opacity: 0.2, textTransform: "uppercase", letterSpacing: "0.12em" }}>[ Wedding Story ]</span>
                  </div>
                  <div className="rs-ov" style={{
                    position: "absolute", inset: 0,
                    background: "linear-gradient(to top, rgba(10,10,10,0.9) 0%, transparent 60%)",
                    display: "flex", flexDirection: "column", justifyContent: "flex-end", padding: 24,
                    opacity: 0, transition: "opacity 0.35s",
                  }}>
                    <div style={{ fontFamily: "'DM Sans'", fontSize: 11, color: DS.gold, textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: 6 }}>{rs.style}</div>
                    <div style={{ fontFamily: "'Playfair Display', serif", fontSize: 24, fontWeight: 700, color: DS.text }}>{rs.couple}</div>
                    <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 16, color: DS.textSec, fontStyle: "italic", marginTop: 4 }}>{rs.venue}</div>
                  </div>
                </div>
              </a>
            </FadeIn>
          ))}
        </div>
      </div>

      {/* ── CTA ───────────────────────────────────────────────────── */}
      <div style={{ borderTop: `1px solid ${DS.border}`, padding: "100px 32px", textAlign: "center", background: `linear-gradient(160deg, #1a1410 0%, #1a1612 50%, ${DS.bg} 100%)` }}>
        <FadeIn>
          <div style={{ fontFamily: "'DM Sans'", fontSize: 12, color: DS.gold, textTransform: "uppercase", letterSpacing: "0.2em", marginBottom: 16 }}>Your Story Is Next</div>
          <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(30px, 4.5vw, 52px)", fontWeight: 700, color: DS.text, lineHeight: 1.1, margin: "0 0 16px" }}>
            Want Photos Like These?
          </h2>
          <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 20, color: DS.textSec, fontStyle: "italic", marginBottom: 36 }}>
            We only take one wedding per day. Let's make sure it's yours.
          </p>
          <div style={{ display: "flex", gap: 16, justifyContent: "center", flexWrap: "wrap" }}>
            <CheckAvailabilityButton />
            <a href="#" style={{
              fontFamily: "'DM Sans'", fontSize: 14, color: DS.gold, padding: "16px 40px", textDecoration: "none", textTransform: "uppercase", letterSpacing: "0.1em", fontWeight: 600,
              border: `1px solid ${DS.gold}`, transition: "all 0.3s",
            }}
              onMouseEnter={(e) => { e.target.style.background = DS.gold; e.target.style.color = DS.bg; }}
              onMouseLeave={(e) => { e.target.style.background = "transparent"; e.target.style.color = DS.gold; }}
            >View All Stories</a>
          </div>
        </FadeIn>
      </div>

      <Footer />

      {/* ── LIGHTBOX ──────────────────────────────────────────────── */}
      <AnimatePresence>
        {lightboxOpen && <Lightbox images={allImages} startIndex={lightboxIndex} onClose={() => setLightboxOpen(false)} />}
      </AnimatePresence>
    </div>
  );
}
