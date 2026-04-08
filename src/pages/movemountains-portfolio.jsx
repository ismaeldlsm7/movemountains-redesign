import { useState, useEffect, useRef } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import Header from "../components/Header";
import Footer from "../components/Footer";
import CheckAvailabilityButton from "../components/CheckAvailabilityButton";
import { Link } from "react-router-dom";

const slugify = (s) => s.toLowerCase().replace(/&/g, "and").replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");

const DS = {
  bg: "var(--mm-bg)", surface: "var(--mm-surface)", surfaceAlt: "var(--mm-surface-alt)",
  text: "var(--mm-text)", textSec: "var(--mm-text-sec)", gold: "var(--mm-gold)",
  goldHover: "var(--mm-gold-hover)", ember: "var(--mm-ember)", border: "var(--mm-border)",
};

const fontLink = "https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,700;1,400&family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;0,700;1,400&family=DM+Sans:wght@400;500;600;700&family=Bebas+Neue&display=swap";

// ─── Data ───────────────────────────────────────────────────────────

const weddingStories = [
  {
    id: 1, couple: "Carey & Luke", venue: "Rosecliff Mansion", location: "Newport, RI",
    date: "June 2025", style: "Classic", color: "#2a2118",
    tagline: "Old-world elegance meets golden hour on the Newport coast.",
    excerpt: "Carey and Luke's wedding at Rosecliff was the kind of day you dream about — Gilded Age architecture bathed in late afternoon light, a ceremony overlooking the ocean, and a reception that didn't stop until the last song played. Josh and Tiahna captured every frame.",
    images: 12, team: "Josh & Tiahna",
    gallery: ["#2a2118", "#1e1a14", "#221e18", "#2a2420", "#1a1814", "#201c18", "#24201a", "#1e1a16", "#2a2620", "#221e1a", "#201a16", "#1a1612"]
  },
  {
    id: 2, couple: "Howard & Shreya", venue: "OceanCliff Hotel", location: "Newport, RI",
    date: "October 2025", style: "Cinematic", color: "#1e2024",
    tagline: "A multicultural celebration where two worlds became one.",
    excerpt: "Howard and Shreya's wedding blended traditions beautifully — a Hindu ceremony in the morning, a Western reception at sunset. The OceanCliff grounds gave us every backdrop we needed, and the couple's energy carried the entire day.",
    images: 10, team: "Sean & Brandon",
    gallery: ["#1e2024", "#1a1e22", "#22201e", "#1e2226", "#1a1c20", "#20222a", "#1c1e22", "#22242a", "#1a1e20", "#1e2024"]
  },
  {
    id: 3, couple: "Ken & Alicia", venue: "Castle Hill Inn", location: "Newport, RI",
    date: "May 2025", style: "Moody", color: "#1a1e1a",
    tagline: "Fog, cliffside vows, and a love story written in the mist.",
    excerpt: "The fog rolled in right as Ken and Alicia said their vows on the cliffside lawn at Castle Hill. Most couples would have panicked. These two leaned into it — and the photos are unlike anything we've ever shot. Moody, cinematic, unforgettable.",
    images: 11, team: "Tiahna & Amanda",
    gallery: ["#1a1e1a", "#161a16", "#1e221e", "#1a1e1c", "#14181a", "#1c201e", "#181c1a", "#20241e", "#161a18", "#1a1e1c", "#181c18"]
  },
  {
    id: 4, couple: "Joel & Corey", venue: "The Chanler at Cliff Walk", location: "Newport, RI",
    date: "August 2025", style: "Classic", color: "#221e22",
    tagline: "Intimate elegance on the Cliff Walk.",
    excerpt: "Joel and Corey kept their guest list tight and their style impeccable. The Chanler's intimate scale meant every moment felt personal — and our cameras were close enough to catch every one. Their words: 'Nothing about Move Mountains is cookie cutter.'",
    images: 9, team: "Josh & Sisco",
    gallery: ["#221e22", "#1e1a1e", "#26222a", "#201c22", "#1c1820", "#241e26", "#1e1a20", "#221e24", "#201a22"]
  },
  {
    id: 5, couple: "Tim & Katie", venue: "St. Mary's Star of the Sea", location: "Narragansett, RI",
    date: "September 2025", style: "Bright", color: "#22201a",
    tagline: "Rocky coastlines and bridal party energy for days.",
    excerpt: "Tim and Katie brought the energy. After a beautiful ceremony at St. Mary's, we took the entire bridal party to the Black Point Trailhead for a session on the rocks. Bigger-than-life personalities, bigger-than-life photos.",
    images: 10, team: "Brandon & Kaitlyn",
    gallery: ["#22201a", "#1e1c16", "#262418", "#201e18", "#1c1a14", "#24221a", "#1e1c18", "#262220", "#201e1a", "#1a1816"]
  },
  {
    id: 6, couple: "Connor & Amanda", venue: "Beavertail State Park", location: "Jamestown, RI",
    date: "November 2025", style: "Moody", color: "#1a1a1e",
    tagline: "Windswept engagement on the edge of the world.",
    excerpt: "Not a wedding — an engagement session that deserves its own page. Connor and Amanda at Beavertail with the late autumn wind, the crashing waves, and the kind of natural chemistry that makes a photographer's job easy.",
    images: 8, team: "Sean",
    gallery: ["#1a1a1e", "#16161a", "#1e1e24", "#1a1a20", "#14141a", "#1c1c22", "#18181e", "#201e24"]
  },
  {
    id: 7, couple: "Peter & Delaney", venue: "The Dean Hotel", location: "Providence, RI",
    date: "March 2025", style: "Cinematic", color: "#201e1a",
    tagline: "Urban Providence energy with downtown cool.",
    excerpt: "Starting at Bolt Coffee and ending outside The Dean Hotel, Peter and Delaney's engagement session was a love letter to downtown Providence. City textures, warm café light, and two people who couldn't stop laughing.",
    images: 9, team: "Josh",
    gallery: ["#201e1a", "#1c1a16", "#24221e", "#1e1c18", "#1a1814", "#221e1c", "#1e1a18", "#242220", "#201c1a"]
  },
  {
    id: 8, couple: "Rob & Kathleen", venue: "Long Live Beerworks", location: "Providence, RI",
    date: "April 2025", style: "Bright", color: "#1e201a",
    tagline: "Back to where it all began.",
    excerpt: "Rob and Kathleen met at Long Live Beerworks — so that's where we started. From their favorite brewery to the pedestrian bridge overlooking the Providence skyline, every location told a chapter of their story.",
    images: 8, team: "Tati",
    gallery: ["#1e201a", "#1a1c16", "#22241e", "#1e201c", "#161814", "#20221a", "#1a1c18", "#222420"]
  },
  {
    id: 9, couple: "Micaela & Mike", venue: "Private Estate", location: "Warwick, RI",
    date: "July 2025", style: "Classic", color: "#221e1e",
    tagline: "Every detail, every dance, every last song.",
    excerpt: "Sean, Danielle, Brandon, and Amanda covered Micaela and Mike's wedding from first look to last dance. The couple's review said it best: 'So beautiful and EVERYTHING was captured. There was not a photo missed.'",
    images: 11, team: "Sean, Brandon & Amanda",
    gallery: ["#221e1e", "#1e1a1a", "#262222", "#201c1c", "#1c1818", "#242020", "#1e1a1c", "#222020", "#201e1e", "#1a1818", "#1e1c1c"]
  },
];

const styles = ["All", "Classic", "Cinematic", "Moody", "Bright"];

// ─── Helpers ────────────────────────────────────────────────────────

function FadeIn({ children, delay = 0, y = 24, className = "" }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  return (
    <motion.div ref={ref} initial={{ opacity: 0, y }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6, delay, ease: [0.25, 0.1, 0.25, 1] }} className={className}>
      {children}
    </motion.div>
  );
}

// ─── Nav ────────────────────────────────────────────────────────────

// ─── Story Detail Modal ─────────────────────────────────────────────

function StoryDetail({ story, onClose }) {
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = ""; };
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      transition={{ duration: 0.35 }}
      style={{ position: "fixed", inset: 0, zIndex: 200, background: "rgba(10,10,10,0.97)", overflowY: "auto" }}
    >
      {/* Close button */}
      <button onClick={onClose} style={{
        position: "fixed", top: 24, right: 32, zIndex: 210, background: "none", border: `1px solid ${DS.border}`,
        width: 48, height: 48, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center",
        transition: "border-color 0.3s",
      }}
        onMouseEnter={(e) => e.currentTarget.style.borderColor = DS.gold}
        onMouseLeave={(e) => e.currentTarget.style.borderColor = DS.border}
      >
        <span style={{ fontFamily: "'DM Sans'", fontSize: 18, color: DS.text }}>✕</span>
      </button>

      <div style={{ maxWidth: 1000, margin: "0 auto", padding: "80px 32px 60px" }}>
        {/* Header */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15, duration: 0.5 }}>
          <div style={{ fontFamily: "'DM Sans'", fontSize: 12, color: DS.gold, textTransform: "uppercase", letterSpacing: "0.2em", marginBottom: 16 }}>
            {story.style} · {story.date}
          </div>
          <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(36px, 5vw, 60px)", fontWeight: 700, color: DS.text, lineHeight: 1.05, margin: 0 }}>
            {story.couple}
          </h1>
          <div style={{ display: "flex", gap: 24, marginTop: 16, flexWrap: "wrap", alignItems: "center" }}>
            <span style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 20, color: DS.textSec, fontStyle: "italic" }}>{story.venue}</span>
            <span style={{ width: 4, height: 4, borderRadius: "50%", background: DS.border, flexShrink: 0 }} />
            <span style={{ fontFamily: "'DM Sans'", fontSize: 14, color: DS.textSec }}>{story.location}</span>
            <span style={{ width: 4, height: 4, borderRadius: "50%", background: DS.border, flexShrink: 0 }} />
            <span style={{ fontFamily: "'DM Sans'", fontSize: 14, color: DS.textSec }}>Shot by {story.team}</span>
          </div>
        </motion.div>

        {/* Tagline */}
        <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }} style={{
          fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(22px, 3vw, 32px)", fontWeight: 400, color: DS.text,
          lineHeight: 1.4, margin: "48px 0", maxWidth: 700, fontStyle: "italic",
        }}>
          {story.tagline}
        </motion.p>

        {/* Separator */}
        <motion.div initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} transition={{ delay: 0.35, duration: 0.6, ease: "easeOut" }}
          style={{ height: 1, background: DS.border, transformOrigin: "left", marginBottom: 48 }} />

        {/* Story text */}
        <motion.p initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }} style={{
          fontFamily: "'DM Sans'", fontSize: 16, color: DS.textSec, lineHeight: 1.7, maxWidth: 700, marginBottom: 56,
        }}>
          {story.excerpt}
        </motion.p>

        {/* Editorial Gallery */}
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          {/* Hero image — full width */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}>
            <div style={{ width: "100%", aspectRatio: "16/9", background: story.gallery[0], display: "flex", alignItems: "center", justifyContent: "center" }}>
              <span style={{ fontFamily: "'DM Sans'", fontSize: 12, color: DS.textSec, opacity: 0.3, textTransform: "uppercase", letterSpacing: "0.15em" }}>[ Hero — {story.venue} ]</span>
            </div>
          </motion.div>

          {/* 2-column pair */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
            {story.gallery.slice(1, 3).map((c, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.55 + i * 0.08 }}>
                <div style={{ aspectRatio: "4/5", background: c, display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <span style={{ fontFamily: "'DM Sans'", fontSize: 11, color: DS.textSec, opacity: 0.25, textTransform: "uppercase", letterSpacing: "0.15em" }}>[ Detail ]</span>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Full width cinematic */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.7 }}>
            <div style={{ aspectRatio: "21/9", background: story.gallery[3], display: "flex", alignItems: "center", justifyContent: "center" }}>
              <span style={{ fontFamily: "'DM Sans'", fontSize: 12, color: DS.textSec, opacity: 0.25, textTransform: "uppercase", letterSpacing: "0.15em" }}>[ Cinematic Wide ]</span>
            </div>
          </motion.div>

          {/* 3-column strip */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 16 }}>
            {story.gallery.slice(4, 7).map((c, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.8 + i * 0.06 }}>
                <div style={{ aspectRatio: "1/1", background: c, display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <span style={{ fontFamily: "'DM Sans'", fontSize: 10, color: DS.textSec, opacity: 0.2, textTransform: "uppercase", letterSpacing: "0.12em" }}>[ Moment ]</span>
                </div>
              </motion.div>
            ))}
          </div>

          {/* 1 + tall pair */}
          {story.gallery.length >= 9 && (
            <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr", gap: 16 }}>
              <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.95 }}>
                <div style={{ aspectRatio: "3/4", background: story.gallery[7], display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <span style={{ fontFamily: "'DM Sans'", fontSize: 11, color: DS.textSec, opacity: 0.25, letterSpacing: "0.12em", textTransform: "uppercase" }}>[ Portrait ]</span>
                </div>
              </motion.div>
              <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1 }} style={{ flex: 1 }}>
                  <div style={{ width: "100%", height: "100%", background: story.gallery[8], display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <span style={{ fontFamily: "'DM Sans'", fontSize: 10, color: DS.textSec, opacity: 0.2, letterSpacing: "0.12em", textTransform: "uppercase" }}>[ Detail ]</span>
                  </div>
                </motion.div>
                {story.gallery[9] && (
                  <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.05 }} style={{ flex: 1 }}>
                    <div style={{ width: "100%", height: "100%", background: story.gallery[9], display: "flex", alignItems: "center", justifyContent: "center" }}>
                      <span style={{ fontFamily: "'DM Sans'", fontSize: 10, color: DS.textSec, opacity: 0.2, letterSpacing: "0.12em", textTransform: "uppercase" }}>[ Detail ]</span>
                    </div>
                  </motion.div>
                )}
              </div>
            </div>
          )}

          {/* Closing wide */}
          {story.gallery.length >= 11 && (
            <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.1 }}>
              <div style={{ aspectRatio: "16/9", background: story.gallery[10], display: "flex", alignItems: "center", justifyContent: "center" }}>
                <span style={{ fontFamily: "'DM Sans'", fontSize: 12, color: DS.textSec, opacity: 0.25, textTransform: "uppercase", letterSpacing: "0.15em" }}>[ Closing Frame ]</span>
              </div>
            </motion.div>
          )}
        </div>

        {/* Pull Quote */}
        <div style={{ margin: "64px 0", padding: "40px 0", borderTop: `1px solid ${DS.border}`, borderBottom: `1px solid ${DS.border}` }}>
          <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(20px, 2.5vw, 28px)", color: DS.text, fontStyle: "italic", lineHeight: 1.5, maxWidth: 700 }}>
            "Choosing Move Mountains was one of the best vendor decisions we made for our wedding."
          </div>
          <div style={{ fontFamily: "'DM Sans'", fontSize: 13, color: DS.gold, marginTop: 16, textTransform: "uppercase", letterSpacing: "0.1em" }}>
            — {story.couple}
          </div>
        </div>

        {/* Back + Navigation */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 16 }}>
          <button onClick={onClose} style={{
            fontFamily: "'DM Sans'", fontSize: 13, color: DS.gold, background: "none", border: `1px solid ${DS.gold}`,
            padding: "12px 28px", cursor: "pointer", textTransform: "uppercase", letterSpacing: "0.08em", transition: "all 0.3s",
          }}
            onMouseEnter={(e) => { e.target.style.background = DS.gold; e.target.style.color = DS.bg; }}
            onMouseLeave={(e) => { e.target.style.background = "transparent"; e.target.style.color = DS.gold; }}
          >← Back to Portfolio</button>

          <a href="#" style={{
            fontFamily: "'DM Sans'", fontSize: 14, color: DS.bg, background: DS.ember,
            padding: "12px 28px", textDecoration: "none", textTransform: "uppercase", letterSpacing: "0.08em", transition: "background 0.3s",
          }}
            onMouseEnter={(e) => e.target.style.background = "#ff6b3d"}
            onMouseLeave={(e) => e.target.style.background = DS.ember}
          >Book Your Wedding →</a>
        </div>
      </div>
    </motion.div>
  );
}

// ─── Portfolio Card ─────────────────────────────────────────────────

function PortfolioCard({ story, index }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-30px" });
  const [hovered, setHovered] = useState(false);
  const slug = slugify(story.couple);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: (index % 3) * 0.1, ease: [0.25, 0.1, 0.25, 1] }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{ aspectRatio: "4/5" }}
    >
    <Link to={`/wedding/${slug}`} style={{
      display: "block", width: "100%", height: "100%",
      cursor: "pointer", position: "relative", overflow: "hidden", textDecoration: "none",
    }}>
      {/* Image */}
      <motion.div animate={{ scale: hovered ? 1.04 : 1 }} transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
        style={{ width: "100%", height: "100%", background: story.color, display: "flex", alignItems: "center", justifyContent: "center" }}
      >
        <span style={{ fontFamily: "'DM Sans'", fontSize: 12, color: DS.textSec, opacity: 0.25, textTransform: "uppercase", letterSpacing: "0.15em" }}>[ {story.venue} ]</span>
      </motion.div>

      {/* Hover overlay */}
      <motion.div
        animate={{ opacity: hovered ? 1 : 0 }}
        transition={{ duration: 0.35 }}
        style={{
          position: "absolute", inset: 0,
          background: "linear-gradient(to top, rgba(10,10,10,0.92) 0%, rgba(10,10,10,0.4) 50%, transparent 100%)",
          display: "flex", flexDirection: "column", justifyContent: "flex-end", padding: "clamp(20px, 3vw, 32px)",
        }}
      >
        <motion.div animate={{ y: hovered ? 0 : 12, opacity: hovered ? 1 : 0 }} transition={{ duration: 0.35, delay: 0.05 }}>
          <div style={{ fontFamily: "'DM Sans'", fontSize: 11, color: DS.gold, textTransform: "uppercase", letterSpacing: "0.15em", marginBottom: 8 }}>
            {story.style} · {story.images} Images
          </div>
        </motion.div>

        <motion.div animate={{ y: hovered ? 0 : 16, opacity: hovered ? 1 : 0 }} transition={{ duration: 0.35, delay: 0.1 }}>
          <div style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(22px, 2.5vw, 32px)", fontWeight: 700, color: DS.text, lineHeight: 1.1 }}>
            {story.couple}
          </div>
        </motion.div>

        <motion.div animate={{ y: hovered ? 0 : 16, opacity: hovered ? 1 : 0 }} transition={{ duration: 0.35, delay: 0.15 }}>
          <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 16, color: DS.textSec, marginTop: 6, fontStyle: "italic" }}>
            {story.venue}, {story.location}
          </div>
        </motion.div>

        <motion.div animate={{ y: hovered ? 0 : 12, opacity: hovered ? 1 : 0 }} transition={{ duration: 0.35, delay: 0.2 }}>
          <div style={{ fontFamily: "'DM Sans'", fontSize: 13, color: DS.gold, marginTop: 14, display: "flex", alignItems: "center", gap: 8 }}>
            View Story <span style={{ fontSize: 16 }}>→</span>
          </div>
        </motion.div>
      </motion.div>

      {/* Always-visible date badge */}
      <div style={{
        position: "absolute", top: 16, right: 16,
        fontFamily: "'DM Sans'", fontSize: 11, color: DS.textSec,
        background: "rgba(15,15,15,0.6)", backdropFilter: "blur(8px)",
        padding: "6px 12px", textTransform: "uppercase", letterSpacing: "0.1em",
        opacity: hovered ? 0 : 0.7, transition: "opacity 0.3s",
      }}>
        {story.date}
      </div>
    </Link>
    </motion.div>
  );
}

// ─── Main Portfolio Page ────────────────────────────────────────────

export default function PortfolioPage() {
  const [scrolled, setScrolled] = useState(false);
  const [activeStyle, setActiveStyle] = useState("All");
  const [selectedStory, setSelectedStory] = useState(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const filtered = activeStyle === "All" ? weddingStories : weddingStories.filter((s) => s.style === activeStyle);

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
        @media (max-width: 640px) {
          .portfolio-grid { grid-template-columns: 1fr !important; }
          .portfolio-grid > * { grid-row: span 1 !important; }
          .filter-bar { gap: 8px !important; flex-wrap: wrap !important; }
          .nav-links { display: none !important; }
        }
      `}</style>

      <Header activePage="Portfolio" />

      {/* Page Header */}
      <div style={{ paddingTop: 100, paddingBottom: 0, maxWidth: 1400, margin: "0 auto", paddingLeft: 32, paddingRight: 32 }}>
        {/* Breadcrumb */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }}>
          <div style={{ fontFamily: "'DM Sans'", fontSize: 12, color: DS.textSec, marginBottom: 24 }}>
            <a href="#" style={{ color: DS.textSec, textDecoration: "none", transition: "color 0.2s" }}
              onMouseEnter={(e) => e.target.style.color = DS.gold}
              onMouseLeave={(e) => e.target.style.color = DS.textSec}
            >Home</a>
            <span style={{ margin: "0 10px", opacity: 0.4 }}>/</span>
            <span style={{ color: DS.gold }}>Portfolio</span>
          </div>
        </motion.div>

        {/* Title block */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", flexWrap: "wrap", gap: 24, marginBottom: 20 }}>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.35, duration: 0.6 }}>
            <div style={{ fontFamily: "'DM Sans'", fontSize: 12, color: DS.gold, textTransform: "uppercase", letterSpacing: "0.2em", marginBottom: 12 }}>
              Selected Work
            </div>
            <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(36px, 5vw, 64px)", fontWeight: 700, color: DS.text, lineHeight: 1.05, margin: 0 }}>
              Portfolio
            </h1>
          </motion.div>

          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }} style={{
            fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(16px, 1.8vw, 20px)", color: DS.textSec,
            maxWidth: 440, fontStyle: "italic", lineHeight: 1.5, textAlign: "right",
          }}>
            Every couple. Every love story. All different. All ours.
          </motion.p>
        </div>

        {/* Divider */}
        <motion.div initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} transition={{ delay: 0.55, duration: 0.8, ease: "easeOut" }}
          style={{ height: 1, background: DS.border, transformOrigin: "left", marginBottom: 32 }} />

        {/* Filter bar */}
        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }}
          className="filter-bar" style={{ display: "flex", gap: 12, marginBottom: 48, alignItems: "center" }}
        >
          <span style={{ fontFamily: "'DM Sans'", fontSize: 12, color: DS.textSec, textTransform: "uppercase", letterSpacing: "0.1em", marginRight: 8 }}>Filter:</span>
          {styles.map((s) => (
            <button key={s} onClick={() => setActiveStyle(s)} style={{
              fontFamily: "'DM Sans'", fontSize: 13, color: activeStyle === s ? DS.bg : DS.textSec,
              background: activeStyle === s ? DS.gold : "transparent",
              border: `1px solid ${activeStyle === s ? DS.gold : DS.border}`,
              padding: "8px 20px", cursor: "pointer", textTransform: "uppercase", letterSpacing: "0.06em",
              transition: "all 0.3s",
            }}
              onMouseEnter={(e) => { if (activeStyle !== s) { e.target.style.borderColor = DS.gold; e.target.style.color = DS.gold; } }}
              onMouseLeave={(e) => { if (activeStyle !== s) { e.target.style.borderColor = DS.border; e.target.style.color = DS.textSec; } }}
            >{s}</button>
          ))}

          <div style={{ marginLeft: "auto", fontFamily: "'DM Sans'", fontSize: 13, color: DS.textSec }}>
            {filtered.length} {filtered.length === 1 ? "story" : "stories"}
          </div>
        </motion.div>
      </div>

      {/* Portfolio Grid */}
      <div style={{ maxWidth: 1400, margin: "0 auto", paddingLeft: 32, paddingRight: 32, paddingBottom: 80 }}>
        <AnimatePresence mode="wait">
          <motion.div
            key={activeStyle}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.35 }}
            className="portfolio-grid"
            style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 16 }}
          >
            {filtered.map((story, i) => (
              <PortfolioCard key={story.id} story={story} index={i} />
            ))}
          </motion.div>
        </AnimatePresence>

        {filtered.length === 0 && (
          <div style={{ textAlign: "center", padding: "80px 0" }}>
            <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 24, color: DS.textSec, fontStyle: "italic" }}>
              No stories in this style yet.
            </div>
          </div>
        )}
      </div>

      {/* Bottom CTA */}
      <div style={{ borderTop: `1px solid ${DS.border}`, padding: "80px 32px", textAlign: "center" }}>
        <FadeIn>
          <div style={{ fontFamily: "'DM Sans'", fontSize: 12, color: DS.gold, textTransform: "uppercase", letterSpacing: "0.2em", marginBottom: 16 }}>Your Story Starts Here</div>
          <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(28px, 4vw, 44px)", fontWeight: 700, color: DS.text, margin: "0 0 12px" }}>
            Want to see your wedding here?
          </h2>
          <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 20, color: DS.textSec, fontStyle: "italic", marginBottom: 32 }}>
            We only take one wedding per day. Let's make sure it's yours.
          </p>
          <CheckAvailabilityButton padding="16px 44px" />
        </FadeIn>
      </div>

      <Footer />

      {/* Story Detail Modal */}
      <AnimatePresence>
        {selectedStory && <StoryDetail story={selectedStory} onClose={() => setSelectedStory(null)} />}
      </AnimatePresence>
    </div>
  );
}
