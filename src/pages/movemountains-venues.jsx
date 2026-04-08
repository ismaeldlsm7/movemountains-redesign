import { useState, useEffect, useRef } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import Header from "../components/Header";
import Footer from "../components/Footer";

const DS = { bg: "#0F0F0F", surface: "#1E1E1E", surfaceAlt: "#161616", text: "#F5F0E8", textSec: "#8A8477", gold: "#C9A96E", ember: "#E8572A", border: "#2A2A2A" };
const fontLink = "https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,700;1,400&family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;0,700;1,400;1,500&family=DM+Sans:wght@400;500;600;700&family=Bebas+Neue&display=swap";

function FadeIn({ children, delay = 0, y = 24 }) {
  const ref = useRef(null); const inView = useInView(ref, { once: true, margin: "-40px" });
  return <motion.div ref={ref} initial={{ opacity: 0, y }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.65, delay, ease: [0.25, 0.1, 0.25, 1] }}>{children}</motion.div>;
}

const venues = [
  { id: "rosecliff", name: "Rosecliff Mansion", location: "Newport, RI", type: "Historic Estate", capacity: "200", season: "May–October", color: "#2a2218", weddingsShot: "45+",
    description: "A Gilded Age masterpiece modeled after the Grand Trianon at Versailles. Rosecliff's ocean-facing lawn, heart-shaped staircase, and ballroom with 40-foot ceilings give photographers the kind of architecture that makes every frame look editorial.",
    tips: ["Golden hour hits the west terrace at its best — schedule portraits between 6:30–7:30pm in summer", "The heart-shaped staircase is iconic but crowded. Book a first look here before guests arrive", "The ballroom's chandeliers create stunning bokeh — use them for reception candids", "The ocean lawn ceremony faces east — morning light is soft, afternoon gets harsh. Plan accordingly"] },
  { id: "oceancliff", name: "OceanCliff Hotel", location: "Newport, RI", type: "Oceanfront Hotel", capacity: "250", season: "Year-round", color: "#1e2024", weddingsShot: "38+",
    description: "Dramatic clifftop setting with panoramic ocean views from every angle. OceanCliff's ceremony lawn sits right on the edge — meaning your vows happen with nothing but Atlantic behind you. The indoor spaces are elegant but the exterior is where the magic lives.",
    tips: ["Wind is constant on the cliff — plan for veil management and have backup for hair", "Sunset is behind the building from the ceremony lawn. Use the south garden for golden hour portraits", "The bridal suite has incredible window light for getting-ready shots", "Rain plan moves everything inside — the ballroom is beautiful but schedule extra portrait time outdoors if weather clears"] },
  { id: "castlehill", name: "Castle Hill Inn", location: "Newport, RI", type: "Waterfront Inn", capacity: "150", season: "April–November", color: "#1a1e1a", weddingsShot: "30+",
    description: "Where Narragansett Bay meets the Newport coastline. Castle Hill is intimate, dramatic, and impossible to photograph badly. The Agassiz Mansion provides Gilded Age interiors while the expansive lawn and private beach offer natural backdrops that change with every tide.",
    tips: ["The lighthouse walk is a 5-minute trek but produces some of our most dramatic images", "Fog is common here — embrace it. Some of our best moody work has been at Castle Hill in fog", "The lawn ceremony faces the bay — golden hour portraits on the beach are non-negotiable", "Cocktail hour on the patio overlooks the water. Stay close for candid magic"] },
  { id: "chanler", name: "The Chanler at Cliff Walk", location: "Newport, RI", type: "Boutique Hotel", capacity: "100", season: "Year-round", color: "#221e22", weddingsShot: "22+",
    description: "Intimate, sophisticated, and perched right on the Cliff Walk. The Chanler is for couples who want their wedding to feel like a private affair at a grand estate. Small capacity means every guest is close, every moment is personal, and the photos feel deeply intimate.",
    tips: ["Small venue = every detail matters. The Chanler's interiors photograph beautifully — don't rush through them", "Cliff Walk access is steps away — use it for dramatic couple portraits", "The terrace overlooks the ocean. Golden hour here is unreal", "With 100 guests max, your photographer should know every name. Send us your guest list in advance"] },
  { id: "bellemerri", name: "Belle Mer", location: "Newport, RI", type: "Waterfront Venue", capacity: "300", season: "Year-round", color: "#201e1a", weddingsShot: "28+",
    description: "A modern waterfront venue with floor-to-ceiling glass walls overlooking the harbor. Belle Mer brings natural light indoors and gives photographers the rare gift of dramatic backgrounds without ever stepping outside. The Island House is an architectural dream.",
    tips: ["The glass walls mean reflections — they can be stunning or distracting depending on your photographer's positioning", "Harbor sunset lights up the entire Island House interior in amber. Time your first dance for this", "The lawn ceremony with sailboats in the background is quintessential Newport", "Multiple spaces mean multiple looks in one venue. Plan your timeline to use all of them"] },
  { id: "beavertail", name: "Beavertail State Park", location: "Jamestown, RI", type: "Outdoor/Natural", capacity: "Elopement", season: "Year-round", color: "#1a1a1e", weddingsShot: "15+",
    description: "Raw, windswept, and breathtaking. Beavertail isn't a traditional venue — it's a state park on the southernmost tip of Jamestown with rocky coastline, crashing waves, and some of the most dramatic natural light in New England. Perfect for elopements and engagement sessions.",
    tips: ["Terrain is rocky and uneven — wear shoes you can navigate in, change into heels for static shots", "Late afternoon light creates incredible rim lighting on the cliff edge", "Wind is always a factor. Use it — flowing dresses and veils look incredible in motion", "No facilities on-site. Plan for getting-ready at a nearby hotel and traveling to the park"] },
];

const regions = ["All", "Newport", "Rhode Island", "Outdoor"];

function VenueCard({ venue, index }) {
  const [hovered, setHovered] = useState(false);
  const [expanded, setExpanded] = useState(false);

  return (
    <FadeIn delay={index * 0.06}>
      <div style={{ borderBottom: `1px solid ${DS.border}`, padding: "48px 0" }}>
        <div style={{ display: "grid", gridTemplateColumns: "1.2fr 1fr", gap: "clamp(24px, 4vw, 56px)", alignItems: "start" }} className="venue-grid">
          {/* Image */}
          <div onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)} style={{ overflow: "hidden", cursor: "pointer" }}>
            <motion.div animate={{ scale: hovered ? 1.03 : 1 }} transition={{ duration: 0.5 }}
              style={{ aspectRatio: "16/10", background: venue.color, display: "flex", alignItems: "center", justifyContent: "center", position: "relative" }}>
              <span style={{ fontFamily: "'Bebas Neue'", fontSize: 100, color: DS.gold, opacity: 0.04, position: "absolute" }}>{venue.weddingsShot}</span>
              <span style={{ fontFamily: "'DM Sans'", fontSize: 11, color: DS.textSec, opacity: 0.2, textTransform: "uppercase", letterSpacing: "0.12em", position: "relative" }}>[ {venue.name} ]</span>
            </motion.div>
            {/* Stats bar */}
            <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 1, background: DS.border, marginTop: 1 }}>
              {[{ l: "Type", v: venue.type }, { l: "Capacity", v: venue.capacity }, { l: "Season", v: venue.season }, { l: "We've Shot", v: venue.weddingsShot }].map((s) => (
                <div key={s.l} style={{ background: DS.surface, padding: "12px 8px", textAlign: "center" }}>
                  <div style={{ fontFamily: "'DM Sans'", fontSize: 9, color: DS.gold, textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 2 }}>{s.l}</div>
                  <div style={{ fontFamily: "'DM Sans'", fontSize: 13, color: DS.text, fontWeight: 500 }}>{s.v}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Content */}
          <div>
            <div style={{ fontFamily: "'DM Sans'", fontSize: 11, color: DS.gold, textTransform: "uppercase", letterSpacing: "0.15em", marginBottom: 8 }}>{venue.location}</div>
            <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(26px, 3vw, 38px)", fontWeight: 700, color: DS.text, lineHeight: 1.15, margin: "0 0 16px" }}>{venue.name}</h2>
            <p style={{ fontFamily: "'DM Sans'", fontSize: 15, color: DS.textSec, lineHeight: 1.75, marginBottom: 24 }}>{venue.description}</p>

            {/* Tips toggle */}
            <button onClick={() => setExpanded(!expanded)} style={{
              fontFamily: "'DM Sans'", fontSize: 12, color: DS.gold, background: "none", border: "none", cursor: "pointer", padding: 0,
              display: "flex", alignItems: "center", gap: 8, textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 8,
            }}>
              Photographer Tips ({venue.tips.length})
              <motion.span animate={{ rotate: expanded ? 180 : 0 }} transition={{ duration: 0.25 }} style={{ fontSize: 14, display: "inline-block" }}>↓</motion.span>
            </button>

            <AnimatePresence>
              {expanded && (
                <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.3 }} style={{ overflow: "hidden" }}>
                  <div style={{ paddingTop: 8, paddingBottom: 8 }}>
                    {venue.tips.map((tip, i) => (
                      <div key={i} style={{ display: "flex", alignItems: "flex-start", gap: 10, padding: "10px 0", borderBottom: i < venue.tips.length - 1 ? `1px solid ${DS.border}` : "none" }}>
                        <span style={{ fontFamily: "'Bebas Neue'", fontSize: 14, color: DS.gold, opacity: 0.5, marginTop: 2, flexShrink: 0 }}>{String(i + 1).padStart(2, "0")}</span>
                        <span style={{ fontFamily: "'DM Sans'", fontSize: 14, color: DS.text, lineHeight: 1.6 }}>{tip}</span>
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            <div style={{ display: "flex", gap: 12, marginTop: 20 }}>
              <a href="#" style={{ fontFamily: "'DM Sans'", fontSize: 12, color: DS.gold, textDecoration: "none", textTransform: "uppercase", letterSpacing: "0.08em", borderBottom: `1px solid ${DS.gold}`, paddingBottom: 2 }}>View Weddings Here →</a>
              <a href="#" style={{ fontFamily: "'DM Sans'", fontSize: 12, color: DS.textSec, textDecoration: "none", textTransform: "uppercase", letterSpacing: "0.08em", borderBottom: `1px solid ${DS.border}`, paddingBottom: 2, transition: "all 0.3s" }}
                onMouseEnter={(e) => { e.target.style.borderColor = DS.gold; e.target.style.color = DS.gold; }}
                onMouseLeave={(e) => { e.target.style.borderColor = DS.border; e.target.style.color = DS.textSec; }}>Book for This Venue →</a>
            </div>
          </div>
        </div>
      </div>
    </FadeIn>
  );
}

export default function VenuesPage() {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => { const fn = () => setScrolled(window.scrollY > 40); window.addEventListener("scroll", fn); return () => window.removeEventListener("scroll", fn); }, []);

  return (
    <div style={{ background: DS.bg, color: DS.text, minHeight: "100vh" }}>
      <style>{`
        @import url('${fontLink}'); * { margin: 0; padding: 0; box-sizing: border-box; } body { background: ${DS.bg}; } ::selection { background: ${DS.gold}; color: ${DS.bg}; }
        @media (max-width: 768px) { .nav-links { display: none !important; } .venue-grid { grid-template-columns: 1fr !important; } }
      `}</style>
      <Header activePage="Portfolio" />

      <div style={{ paddingTop: 100, maxWidth: 1400, margin: "0 auto", padding: "100px 32px 0" }}>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.35 }}>
          <div style={{ fontFamily: "'DM Sans'", fontSize: 12, color: DS.gold, textTransform: "uppercase", letterSpacing: "0.2em", marginBottom: 12 }}>We Know These Places by Heart</div>
          <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(40px, 6vw, 72px)", fontWeight: 700, color: DS.text, lineHeight: 1.05, margin: "0 0 16px" }}>Venues We Love</h1>
          <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(17px, 2vw, 22px)", color: DS.textSec, fontStyle: "italic", maxWidth: 600 }}>500+ weddings means we know every corner, every light angle, and every secret spot at New England's best venues. Here's the insider guide.</p>
        </motion.div>

        {/* Venue count */}
        <div style={{ display: "flex", gap: 40, marginTop: 36 }}>
          {[{ n: "6", l: "Featured Venues" }, { n: "178+", l: "Total Venues Shot" }, { n: "500+", l: "Weddings Covered" }].map((s) => (
            <div key={s.l}>
              <div style={{ fontFamily: "'Bebas Neue'", fontSize: 32, color: DS.gold, lineHeight: 1 }}>{s.n}</div>
              <div style={{ fontFamily: "'DM Sans'", fontSize: 11, color: DS.textSec, textTransform: "uppercase", letterSpacing: "0.08em", marginTop: 4 }}>{s.l}</div>
            </div>
          ))}
        </div>
        <div style={{ height: 1, background: DS.border, marginTop: 32 }} />
      </div>

      <div style={{ maxWidth: 1400, margin: "0 auto", padding: "0 32px" }}>
        {venues.map((v, i) => <VenueCard key={v.id} venue={v} index={i} />)}
      </div>

      {/* CTA */}
      <div style={{ padding: "100px 32px", textAlign: "center", background: `linear-gradient(160deg, #1a1410 0%, #1a1612 50%, ${DS.bg} 100%)` }}>
        <FadeIn>
          <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(28px, 4vw, 48px)", fontWeight: 700, color: DS.text, margin: "0 0 12px" }}>Your Venue. Our Expertise.</h2>
          <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 20, color: DS.textSec, fontStyle: "italic", marginBottom: 32 }}>Don't see your venue? We've shot at 178+ locations and counting.</p>
          <a href="#" style={{ fontFamily: "'DM Sans'", fontSize: 14, color: DS.bg, background: DS.ember, padding: "16px 40px", textDecoration: "none", textTransform: "uppercase", letterSpacing: "0.1em", fontWeight: 600, display: "inline-block", transition: "background 0.3s" }}
            onMouseEnter={(e) => e.target.style.background = "#ff6b3d"} onMouseLeave={(e) => e.target.style.background = DS.ember}>Tell Us Your Venue</a>
        </FadeIn>
      </div>

      <Footer />
    </div>
  );
}
