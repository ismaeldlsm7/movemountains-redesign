import { useState, useEffect, useRef } from "react";
import { motion, useInView } from "framer-motion";
import Header from "../components/Header";
import Footer from "../components/Footer";

const DS = { bg: "var(--mm-bg)", surface: "var(--mm-surface)", surfaceAlt: "var(--mm-surface-alt)", text: "var(--mm-text)", textSec: "var(--mm-text-sec)", gold: "var(--mm-gold)", ember: "var(--mm-ember)", border: "var(--mm-border)" };
const fontLink = "https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,700;1,400&family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;0,700;1,400;1,500&family=DM+Sans:wght@400;500;600;700&family=Bebas+Neue&display=swap";

function FadeIn({ children, delay = 0, y = 24 }) {
  const ref = useRef(null); const inView = useInView(ref, { once: true, margin: "-40px" });
  return <motion.div ref={ref} initial={{ opacity: 0, y }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.65, delay, ease: [0.25, 0.1, 0.25, 1] }}>{children}</motion.div>;
}

const features = [
  { publication: "British Vogue", year: "2022", type: "Feature", title: "A Newport Wedding at Rosecliff Mansion", description: "Move Mountains Co.'s editorial work was selected for British Vogue's wedding section, showcasing golden hour portraits on the Newport coastline.", color: "#2a2218" },
  { publication: "Brides Magazine", year: "2022", type: "Feature", title: "Rhode Island's Rising Wedding Photography Studio", description: "Brides Magazine profiled Move Mountains Co. as one of the most innovative wedding media studios in New England.", color: "#1e2024" },
  { publication: "Carats & Cake", year: "2023", type: "Featured Vendor", title: "Move Mountains Co. — Featured Wedding Vendor", description: "Selected as a featured vendor on Carats & Cake for consistently delivering editorial-quality wedding photography and videography.", color: "#22201a" },
  { publication: "The Knot", year: "2017–2024", type: "Award", title: "Best of Weddings — 8 Consecutive Years", description: "Awarded The Knot's Best of Weddings distinction every year from 2017 to 2024 — based on quality, responsiveness, professionalism, and value.", color: "#1a1e1a" },
];

const pressKit = [
  { label: "Company Bio — Long (400 words)", type: "PDF" },
  { label: "Company Bio — Short (100 words)", type: "PDF" },
  { label: "Company Bio — One-liner", type: "TXT" },
  { label: "Logo — Dark Background (PNG + SVG)", type: "ZIP" },
  { label: "Logo — Light Background (PNG + SVG)", type: "ZIP" },
  { label: "Founder Headshot — Sean Edward Brown", type: "JPG" },
  { label: "Team Photo — Full Roster", type: "JPG" },
  { label: "Portfolio Selects — High Resolution (10 images)", type: "ZIP" },
  { label: "Fact Sheet — Company Stats & Awards", type: "PDF" },
];

export default function PressPage() {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => { const fn = () => setScrolled(window.scrollY > 40); window.addEventListener("scroll", fn); return () => window.removeEventListener("scroll", fn); }, []);

  return (
    <div style={{ background: DS.bg, color: DS.text, minHeight: "100vh" }}>
      <style>{`
        @import url('${fontLink}'); * { margin: 0; padding: 0; box-sizing: border-box; } body { background: ${DS.bg}; } ::selection { background: ${DS.gold}; color: ${DS.bg}; }
        @media (max-width: 768px) { .nav-links { display: none !important; } .feature-grid { grid-template-columns: 1fr !important; } .press-split { grid-template-columns: 1fr !important; } }
      `}</style>
      <Header activePage="About" />

      {/* Header */}
      <div style={{ paddingTop: 100, maxWidth: 1400, margin: "0 auto", padding: "100px 32px 0" }}>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.35 }}>
          <div style={{ fontFamily: "'DM Sans'", fontSize: 12, color: DS.gold, textTransform: "uppercase", letterSpacing: "0.2em", marginBottom: 12 }}>Media & Recognition</div>
          <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(40px, 6vw, 72px)", fontWeight: 700, color: DS.text, lineHeight: 1.05, margin: "0 0 16px" }}>Press</h1>
          <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(17px, 2vw, 22px)", color: DS.textSec, fontStyle: "italic", maxWidth: 500 }}>Featured work, media mentions, and everything you need for coverage.</p>
        </motion.div>
        <div style={{ height: 1, background: DS.border, marginTop: 32 }} />
      </div>

      {/* As Seen In logos */}
      <div style={{ padding: "48px 32px", borderBottom: `1px solid ${DS.border}` }}>
        <div style={{ maxWidth: 1000, margin: "0 auto", display: "flex", gap: "clamp(32px, 6vw, 80px)", justifyContent: "center", alignItems: "center", flexWrap: "wrap" }}>
          {["BRITISH VOGUE", "BRIDES", "CARATS & CAKE", "THE KNOT"].map((l) => (
            <FadeIn key={l}>
              <span style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(18px, 2.5vw, 26px)", fontWeight: 600, color: DS.textSec, letterSpacing: "0.08em", opacity: 0.6, transition: "opacity 0.3s", cursor: "default" }}
                onMouseEnter={(e) => e.target.style.opacity = 1} onMouseLeave={(e) => e.target.style.opacity = 0.6}>{l}</span>
            </FadeIn>
          ))}
        </div>
      </div>

      {/* Features */}
      <div style={{ maxWidth: 1400, margin: "0 auto", padding: "64px 32px" }}>
        <FadeIn><div style={{ fontFamily: "'DM Sans'", fontSize: 12, color: DS.gold, textTransform: "uppercase", letterSpacing: "0.2em", marginBottom: 32 }}>Featured In</div></FadeIn>
        <div className="feature-grid" style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 20 }}>
          {features.map((f, i) => (
            <FadeIn key={f.publication} delay={i * 0.08}>
              <div style={{ border: `1px solid ${DS.border}`, overflow: "hidden", transition: "border-color 0.3s", height: "100%" }}
                onMouseEnter={(e) => e.currentTarget.style.borderColor = DS.gold} onMouseLeave={(e) => e.currentTarget.style.borderColor = DS.border}>
                <div style={{ aspectRatio: "21/9", background: f.color, display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <span style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(20px, 2.5vw, 30px)", fontWeight: 600, color: DS.textSec, opacity: 0.3, letterSpacing: "0.08em" }}>{f.publication}</span>
                </div>
                <div style={{ padding: "24px" }}>
                  <div style={{ display: "flex", gap: 10, alignItems: "center", marginBottom: 10 }}>
                    <span style={{ fontFamily: "'DM Sans'", fontSize: 11, color: DS.gold, textTransform: "uppercase", letterSpacing: "0.1em" }}>{f.type}</span>
                    <span style={{ width: 3, height: 3, borderRadius: "50%", background: DS.border }} />
                    <span style={{ fontFamily: "'DM Sans'", fontSize: 11, color: DS.textSec }}>{f.year}</span>
                  </div>
                  <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: 20, fontWeight: 700, color: DS.text, margin: "0 0 10px" }}>{f.title}</h3>
                  <p style={{ fontFamily: "'DM Sans'", fontSize: 14, color: DS.textSec, lineHeight: 1.6 }}>{f.description}</p>
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>

      {/* Press Kit */}
      <div style={{ background: DS.surface, borderTop: `1px solid ${DS.border}`, borderBottom: `1px solid ${DS.border}`, padding: "80px 32px" }}>
        <div style={{ maxWidth: 1000, margin: "0 auto" }}>
          <FadeIn>
            <div style={{ textAlign: "center", marginBottom: 40 }}>
              <div style={{ fontFamily: "'DM Sans'", fontSize: 12, color: DS.gold, textTransform: "uppercase", letterSpacing: "0.2em", marginBottom: 12 }}>For Media</div>
              <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(28px, 3.5vw, 42px)", fontWeight: 700, color: DS.text, margin: 0 }}>Press Kit</h2>
            </div>
          </FadeIn>
          {pressKit.map((item, i) => (
            <FadeIn key={item.label} delay={i * 0.03}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "16px 0", borderBottom: `1px solid ${DS.border}` }}>
                <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                  <span style={{ fontFamily: "'DM Sans'", fontSize: 10, color: DS.gold, background: "rgba(201,169,110,0.1)", padding: "3px 8px", textTransform: "uppercase", letterSpacing: "0.08em" }}>{item.type}</span>
                  <span style={{ fontFamily: "'DM Sans'", fontSize: 14, color: DS.text }}>{item.label}</span>
                </div>
                <a href="#" style={{ fontFamily: "'DM Sans'", fontSize: 12, color: DS.gold, textDecoration: "none", textTransform: "uppercase", letterSpacing: "0.08em", transition: "opacity 0.2s" }}
                  onMouseEnter={(e) => e.target.style.opacity = 0.7} onMouseLeave={(e) => e.target.style.opacity = 1}>Download</a>
              </div>
            </FadeIn>
          ))}
          <FadeIn delay={0.3}>
            <div style={{ marginTop: 32, textAlign: "center" }}>
              <a href="#" style={{ fontFamily: "'DM Sans'", fontSize: 14, color: DS.bg, background: DS.gold, padding: "14px 36px", textDecoration: "none", textTransform: "uppercase", letterSpacing: "0.1em", fontWeight: 600, display: "inline-block", transition: "background 0.3s" }}
                onMouseEnter={(e) => e.target.style.background = "#D4A853"} onMouseLeave={(e) => e.target.style.background = DS.gold}>Download Full Press Kit (ZIP)</a>
            </div>
          </FadeIn>
        </div>
      </div>

      {/* Media Inquiry */}
      <div style={{ padding: "80px 32px" }}>
        <div style={{ maxWidth: 800, margin: "0 auto" }} className="press-split">
          <FadeIn>
            <div style={{ textAlign: "center", marginBottom: 40 }}>
              <div style={{ fontFamily: "'DM Sans'", fontSize: 12, color: DS.gold, textTransform: "uppercase", letterSpacing: "0.2em", marginBottom: 12 }}>Media Inquiries</div>
              <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(28px, 3.5vw, 42px)", fontWeight: 700, color: DS.text, margin: "0 0 12px" }}>Want to Feature Our Work?</h2>
              <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 20, color: DS.textSec, fontStyle: "italic" }}>For press, partnership, and media requests, reach out directly.</p>
            </div>
          </FadeIn>
          <FadeIn delay={0.1}>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }} className="press-split">
              <div style={{ padding: "24px", border: `1px solid ${DS.border}`, textAlign: "center" }}>
                <div style={{ fontFamily: "'DM Sans'", fontSize: 10, color: DS.gold, textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: 8 }}>Press Email</div>
                <a href="mailto:press@movemountains.co" style={{ fontFamily: "'DM Sans'", fontSize: 16, color: DS.text, textDecoration: "none" }}>press@movemountains.co</a>
              </div>
              <div style={{ padding: "24px", border: `1px solid ${DS.border}`, textAlign: "center" }}>
                <div style={{ fontFamily: "'DM Sans'", fontSize: 10, color: DS.gold, textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: 8 }}>General Email</div>
                <a href="mailto:info@movemountains.co" style={{ fontFamily: "'DM Sans'", fontSize: 16, color: DS.text, textDecoration: "none" }}>info@movemountains.co</a>
              </div>
            </div>
          </FadeIn>
        </div>
      </div>

      <Footer />
    </div>
  );
}
