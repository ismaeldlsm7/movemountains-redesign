import { useState, useEffect, useRef } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import Header from "../components/Header";
import Footer from "../components/Footer";

const DS = { bg: "var(--mm-bg)", surface: "var(--mm-surface)", surfaceAlt: "var(--mm-surface-alt)", text: "var(--mm-text)", textSec: "var(--mm-text-sec)", gold: "var(--mm-gold)", ember: "var(--mm-ember)", border: "var(--mm-border)" };
const fontLink = "https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,700;1,400&family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;0,700;1,400;1,500&family=DM+Sans:wght@400;500;600;700&family=Bebas+Neue&display=swap";

function FadeIn({ children, delay = 0, y = 24 }) {
  const ref = useRef(null); const inView = useInView(ref, { once: true, margin: "-40px" });
  return <motion.div ref={ref} initial={{ opacity: 0, y }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.65, delay, ease: [0.25, 0.1, 0.25, 1] }}>{children}</motion.div>;
}

const albums = [
  { name: "The Classic", size: '10×10"', pages: "20 spreads (40 pages)", cover: "Linen", price: "From $800", color: "#2a2622", features: ["Lay-flat binding — images span the full spread with no gutter", "Thick, rigid pages — museum-quality paper stock", "Linen cover in 12 color options", "Custom debossing of names and date", "Archival quality — designed to last generations", "Presentation box included"] },
  { name: "The Heirloom", size: '12×12"', pages: "30 spreads (60 pages)", cover: "Genuine Leather", price: "From $1,200", color: "#201e1a", popular: true, features: ["Premium lay-flat binding on thick, rigid pages", "Genuine leather cover — 8 color options", "Foil stamping in gold, silver, or copper", "Gilded page edges available", "Archival inks and paper — 100+ year lifespan", "Linen-lined presentation box", "Up to 30 spreads of editorial-curated images"] },
  { name: "The Keepsake", size: '8×8"', pages: "15 spreads (30 pages)", cover: "Soft Touch", price: "From $500", color: "#1e2020", features: ["Compact format — perfect for parents and gifts", "Soft-touch matte cover with full-bleed photo wrap", "Lay-flat pages, same quality as our larger albums", "Clean, modern design aesthetic", "Matching design to your main album available", "Ideal as parent albums or anniversary gifts"] },
];

const process = [
  { step: "01", title: "Select", desc: "Choose your album size, cover material, and page count during your post-wedding consultation." },
  { step: "02", title: "Curate", desc: "Our design team selects the strongest 60–120 images from your gallery and creates an editorial layout." },
  { step: "03", title: "Review", desc: "You receive a digital proof. Swap images, adjust layouts, and approve the final design — unlimited revisions." },
  { step: "04", title: "Craft", desc: "Your album is printed, bound, and assembled by hand. Production takes 4–6 weeks." },
  { step: "05", title: "Deliver", desc: "Your finished album arrives in a custom presentation box, ready to be opened, loved, and passed down." },
];

export default function AlbumsPage() {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => { const fn = () => setScrolled(window.scrollY > 40); window.addEventListener("scroll", fn); return () => window.removeEventListener("scroll", fn); }, []);

  return (
    <div style={{ background: DS.bg, color: DS.text, minHeight: "100vh" }}>
      <style>{`
        @import url('${fontLink}'); * { margin: 0; padding: 0; box-sizing: border-box; } body { background: ${DS.bg}; } ::selection { background: ${DS.gold}; color: ${DS.bg}; }
        @media (max-width: 768px) { .nav-links { display: none !important; } .albums-grid { grid-template-columns: 1fr !important; } .process-grid { grid-template-columns: 1fr 1fr !important; } }
      `}</style>
      <Header activePage="Services" />

      {/* Header */}
      <div style={{ paddingTop: 100, maxWidth: 1400, margin: "0 auto", padding: "100px 32px 0" }}>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.35 }}>
          <div style={{ fontFamily: "'DM Sans'", fontSize: 12, color: DS.gold, textTransform: "uppercase", letterSpacing: "0.2em", marginBottom: 12 }}>Hold Your Memories</div>
          <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(40px, 6vw, 72px)", fontWeight: 700, color: DS.text, lineHeight: 1.05, margin: "0 0 16px" }}>Wedding Albums</h1>
          <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(17px, 2vw, 22px)", color: DS.textSec, fontStyle: "italic", maxWidth: 550 }}>Custom-made, lay-flat albums designed to last generations. Because your photos deserve more than a hard drive.</p>
        </motion.div>
        <div style={{ height: 1, background: DS.border, marginTop: 32 }} />
      </div>

      {/* Hero image */}
      <div style={{ maxWidth: 1400, margin: "0 auto", padding: "48px 32px" }}>
        <FadeIn>
          <div style={{ aspectRatio: "21/9", background: "#1e1a16", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <span style={{ fontFamily: "'DM Sans'", fontSize: 13, color: DS.textSec, opacity: 0.25, textTransform: "uppercase", letterSpacing: "0.15em" }}>[ Album Product Photography — Open Spread ]</span>
          </div>
        </FadeIn>
      </div>

      {/* Album Options */}
      <div style={{ maxWidth: 1400, margin: "0 auto", padding: "32px 32px 80px" }}>
        <FadeIn><div style={{ fontFamily: "'DM Sans'", fontSize: 12, color: DS.gold, textTransform: "uppercase", letterSpacing: "0.2em", marginBottom: 32 }}>Choose Your Album</div></FadeIn>
        <div className="albums-grid" style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 20 }}>
          {albums.map((a, i) => (
            <FadeIn key={a.name} delay={i * 0.1}>
              <div style={{ border: `1px solid ${a.popular ? DS.gold : DS.border}`, background: a.popular ? DS.surfaceAlt : "transparent", position: "relative", height: "100%", display: "flex", flexDirection: "column" }}>
                {a.popular && <div style={{ position: "absolute", top: 0, right: 0, background: DS.gold, color: DS.bg, fontFamily: "'DM Sans'", fontSize: 10, fontWeight: 700, padding: "6px 14px", textTransform: "uppercase", letterSpacing: "0.1em" }}>Most Popular</div>}
                <div style={{ aspectRatio: "1/1", background: a.color, display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <span style={{ fontFamily: "'DM Sans'", fontSize: 11, color: DS.textSec, opacity: 0.2, textTransform: "uppercase", letterSpacing: "0.1em" }}>[ {a.name} ]</span>
                </div>
                <div style={{ padding: "28px 24px", flex: 1, display: "flex", flexDirection: "column" }}>
                  <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: 26, fontWeight: 700, color: DS.text, margin: "0 0 4px" }}>{a.name}</h3>
                  <div style={{ fontFamily: "'Bebas Neue'", fontSize: 28, color: DS.gold, margin: "8px 0 16px" }}>{a.price}</div>
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 1, background: DS.border, marginBottom: 20 }}>
                    {[{ l: "Size", v: a.size }, { l: "Pages", v: a.pages.split(" ")[0] + " spreads" }, { l: "Cover", v: a.cover }].map((s) => (
                      <div key={s.l} style={{ background: a.popular ? DS.surfaceAlt : DS.bg, padding: "10px 6px", textAlign: "center" }}>
                        <div style={{ fontFamily: "'DM Sans'", fontSize: 9, color: DS.gold, textTransform: "uppercase", letterSpacing: "0.08em" }}>{s.l}</div>
                        <div style={{ fontFamily: "'DM Sans'", fontSize: 12, color: DS.text, marginTop: 2 }}>{s.v}</div>
                      </div>
                    ))}
                  </div>
                  <div style={{ flex: 1 }}>
                    {a.features.map((f, fi) => (
                      <div key={fi} style={{ display: "flex", alignItems: "flex-start", gap: 8, padding: "6px 0" }}>
                        <span style={{ width: 5, height: 5, background: DS.gold, borderRadius: "50%", flexShrink: 0, marginTop: 6 }} />
                        <span style={{ fontFamily: "'DM Sans'", fontSize: 13, color: DS.textSec, lineHeight: 1.5 }}>{f}</span>
                      </div>
                    ))}
                  </div>
                  <a href="/book?addon=custom-album" style={{ display: "block", textAlign: "center", fontFamily: "'DM Sans'", fontSize: 13, fontWeight: 600, color: a.popular ? DS.bg : DS.gold, background: a.popular ? DS.ember : "transparent", border: a.popular ? "none" : `1px solid ${DS.gold}`, padding: "14px 0", textDecoration: "none", textTransform: "uppercase", letterSpacing: "0.08em", marginTop: 20, transition: "all 0.3s" }}
                    onMouseEnter={(e) => { if (a.popular) e.target.style.background = "#ff6b3d"; else { e.target.style.background = DS.gold; e.target.style.color = DS.bg; } }}
                    onMouseLeave={(e) => { if (a.popular) e.target.style.background = DS.ember; else { e.target.style.background = "transparent"; e.target.style.color = DS.gold; } }}
                  >Order This Album</a>
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>

      {/* Process */}
      <div style={{ background: DS.surface, borderTop: `1px solid ${DS.border}`, borderBottom: `1px solid ${DS.border}`, padding: "80px 32px" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <FadeIn><div style={{ textAlign: "center", marginBottom: 48 }}>
            <div style={{ fontFamily: "'DM Sans'", fontSize: 12, color: DS.gold, textTransform: "uppercase", letterSpacing: "0.2em", marginBottom: 12 }}>From Gallery to Heirloom</div>
            <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(28px, 3.5vw, 42px)", fontWeight: 700, color: DS.text, margin: 0 }}>How Albums Are Made</h2>
          </div></FadeIn>
          <div className="process-grid" style={{ display: "grid", gridTemplateColumns: "repeat(5, 1fr)", gap: 16 }}>
            {process.map((p, i) => (
              <FadeIn key={p.step} delay={i * 0.06}>
                <div style={{ padding: "24px 20px", border: `1px solid ${DS.border}`, height: "100%", transition: "border-color 0.3s" }}
                  onMouseEnter={(e) => e.currentTarget.style.borderColor = DS.gold} onMouseLeave={(e) => e.currentTarget.style.borderColor = DS.border}>
                  <div style={{ fontFamily: "'Bebas Neue'", fontSize: 32, color: DS.gold, opacity: 0.25, lineHeight: 1, marginBottom: 10 }}>{p.step}</div>
                  <h3 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 20, fontWeight: 600, color: DS.text, marginBottom: 8 }}>{p.title}</h3>
                  <p style={{ fontFamily: "'DM Sans'", fontSize: 13, color: DS.textSec, lineHeight: 1.6 }}>{p.desc}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </div>

      {/* CTA */}
      <div style={{ padding: "100px 32px", textAlign: "center" }}>
        <FadeIn>
          <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(28px, 4vw, 48px)", fontWeight: 700, color: DS.text, margin: "0 0 12px" }}>Already Have Your Photos?</h2>
          <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 20, color: DS.textSec, fontStyle: "italic", marginBottom: 32 }}>Albums can be ordered anytime after your wedding — even years later.</p>
          <a href="/book?addon=custom-album" style={{ fontFamily: "'DM Sans'", fontSize: 14, color: DS.bg, background: DS.ember, padding: "16px 40px", textDecoration: "none", textTransform: "uppercase", letterSpacing: "0.1em", fontWeight: 600, display: "inline-block", transition: "background 0.3s" }}
            onMouseEnter={(e) => e.target.style.background = "#ff6b3d"} onMouseLeave={(e) => e.target.style.background = DS.ember}>Start Your Album</a>
        </FadeIn>
      </div>

      <Footer />
    </div>
  );
}
