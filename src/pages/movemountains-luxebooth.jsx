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
  { icon: "◎", title: "Studio-Quality Prints", desc: "Every guest walks away with high-quality photo prints. Not flimsy thermal paper — real, beautiful prints they'll keep." },
  { icon: "◇", title: "Airdrop & Digital Sharing", desc: "Instant photo delivery via Airdrop, SMS, and email. Every image goes straight to guests' phones in seconds." },
  { icon: "▣", title: "Custom Branding", desc: "Your wedding's design language — colors, fonts, monogram — carried into the booth experience. Fully customized to match your day." },
  { icon: "△", title: "Zero Cheesy Props", desc: "No plastic mustaches. No oversized sunglasses. Luxe Booth is built for weddings that take themselves seriously." },
  { icon: "○", title: "Curated Backdrops", desc: "We work with your venue and coordinator to create a backdrop that complements your aesthetic — not competes with it." },
  { icon: "□", title: "Full Digital Gallery", desc: "Every booth photo is delivered in a private online gallery. Use them for thank-you cards, social posts, or just reliving the fun." },
];

const packages = [
  { name: "Standard", hours: "3", price: "900", includes: ["3 hours of booth time", "High-quality instant prints", "Digital gallery of all photos", "Airdrop + SMS sharing", "Standard backdrop", "On-site attendant"] },
  { name: "Premium", hours: "4", price: "1,100", popular: true, includes: ["4 hours of booth time", "High-quality instant prints", "Digital gallery of all photos", "Airdrop + SMS + Email sharing", "Custom branded overlay", "Custom backdrop design", "On-site attendant", "Guest book integration"] },
  { name: "Add to Any Package", hours: "—", price: "+350/hr", includes: ["Additional hours beyond package", "Perfect for extending into late-night reception", "Same quality, same setup"] },
];

export default function LuxeBoothPage() {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => { const fn = () => setScrolled(window.scrollY > 40); window.addEventListener("scroll", fn); return () => window.removeEventListener("scroll", fn); }, []);

  return (
    <div style={{ background: DS.bg, color: DS.text, minHeight: "100vh" }}>
      <style>{`
        @import url('${fontLink}'); * { margin: 0; padding: 0; box-sizing: border-box; } body { background: ${DS.bg}; } ::selection { background: ${DS.gold}; color: ${DS.bg}; }
        @media (max-width: 768px) { .nav-links { display: none !important; } .feat-grid { grid-template-columns: 1fr !important; } .pkg-grid { grid-template-columns: 1fr !important; } .booth-hero { grid-template-columns: 1fr !important; } }
      `}</style>
      <Header activePage="Services" />

      {/* Hero */}
      <div style={{ paddingTop: 100, maxWidth: 1400, margin: "0 auto", padding: "100px 32px 64px" }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "clamp(32px, 5vw, 64px)", alignItems: "center" }} className="booth-hero">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.35 }}>
            <div style={{ fontFamily: "'DM Sans'", fontSize: 12, color: DS.gold, textTransform: "uppercase", letterSpacing: "0.2em", marginBottom: 12 }}>A Move Mountains Co. Product</div>
            <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(44px, 6vw, 76px)", fontWeight: 700, color: DS.text, lineHeight: 1.05, margin: "0 0 16px" }}>
              Luxe <span style={{ color: DS.gold }}>Booth</span>
            </h1>
            <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(18px, 2vw, 24px)", color: DS.textSec, fontStyle: "italic", lineHeight: 1.5, marginBottom: 28 }}>
              Not your average photo booth. A premium guest experience built for weddings that take themselves seriously.
            </p>
            <a href="/book?addon=luxebooth" style={{ fontFamily: "'DM Sans'", fontSize: 14, color: DS.bg, background: DS.ember, padding: "16px 36px", textDecoration: "none", textTransform: "uppercase", letterSpacing: "0.1em", fontWeight: 600, display: "inline-block", transition: "background 0.3s" }}
              onMouseEnter={(e) => e.target.style.background = "#ff6b3d"} onMouseLeave={(e) => e.target.style.background = DS.ember}>Add to Your Wedding</a>
          </motion.div>
          <FadeIn delay={0.1}>
            <div style={{ aspectRatio: "4/5", background: "#1e1a18", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <span style={{ fontFamily: "'DM Sans'", fontSize: 12, color: DS.textSec, opacity: 0.25, textTransform: "uppercase", letterSpacing: "0.12em" }}>[ Luxe Booth — Product Shot ]</span>
            </div>
          </FadeIn>
        </div>
      </div>

      {/* Stats */}
      <div style={{ background: DS.surface, borderTop: `1px solid ${DS.border}`, borderBottom: `1px solid ${DS.border}`, padding: "48px 32px" }}>
        <div style={{ maxWidth: 800, margin: "0 auto", display: "flex", justifyContent: "center", gap: "clamp(32px, 6vw, 80px)", flexWrap: "wrap" }}>
          {[{ n: "0", l: "Cheesy Props" }, { n: "100%", l: "Guest Hit Rate" }, { n: "∞", l: "Instant Shares" }, { n: "4hr", l: "Standard Coverage" }].map((s) => (
            <div key={s.l} style={{ textAlign: "center" }}>
              <div style={{ fontFamily: "'Bebas Neue'", fontSize: 40, color: DS.gold, lineHeight: 1 }}>{s.n}</div>
              <div style={{ fontFamily: "'DM Sans'", fontSize: 11, color: DS.textSec, textTransform: "uppercase", letterSpacing: "0.08em", marginTop: 6 }}>{s.l}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Features */}
      <div style={{ maxWidth: 1400, margin: "0 auto", padding: "80px 32px" }}>
        <FadeIn><div style={{ marginBottom: 40 }}>
          <div style={{ fontFamily: "'DM Sans'", fontSize: 12, color: DS.gold, textTransform: "uppercase", letterSpacing: "0.2em", marginBottom: 12 }}>The Experience</div>
          <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(28px, 3.5vw, 42px)", fontWeight: 700, color: DS.text, margin: 0 }}>What Makes It Luxe</h2>
        </div></FadeIn>
        <div className="feat-grid" style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 20 }}>
          {features.map((f, i) => (
            <FadeIn key={f.title} delay={i * 0.06}>
              <div style={{ padding: "28px 24px", border: `1px solid ${DS.border}`, height: "100%", transition: "border-color 0.3s" }}
                onMouseEnter={(e) => e.currentTarget.style.borderColor = DS.gold} onMouseLeave={(e) => e.currentTarget.style.borderColor = DS.border}>
                <div style={{ fontFamily: "'DM Sans'", fontSize: 24, color: DS.gold, opacity: 0.6, marginBottom: 14 }}>{f.icon}</div>
                <h3 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 20, fontWeight: 600, color: DS.text, marginBottom: 10 }}>{f.title}</h3>
                <p style={{ fontFamily: "'DM Sans'", fontSize: 14, color: DS.textSec, lineHeight: 1.65 }}>{f.desc}</p>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>

      {/* Sample strip */}
      <div style={{ padding: "0 32px 80px" }}>
        <div style={{ maxWidth: 1400, margin: "0 auto", display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 12 }}>
          {["#221e1a", "#1e1c18", "#201a1e", "#1a1e1c"].map((c, i) => (
            <FadeIn key={i} delay={i * 0.06}>
              <div style={{ aspectRatio: "3/4", background: c, display: "flex", alignItems: "center", justifyContent: "center" }}>
                <span style={{ fontFamily: "'DM Sans'", fontSize: 10, color: DS.textSec, opacity: 0.2, textTransform: "uppercase" }}>[ Booth Sample ]</span>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>

      {/* Packages */}
      <div style={{ background: DS.surface, borderTop: `1px solid ${DS.border}`, borderBottom: `1px solid ${DS.border}`, padding: "80px 32px" }}>
        <div style={{ maxWidth: 1000, margin: "0 auto" }}>
          <FadeIn><div style={{ textAlign: "center", marginBottom: 40 }}>
            <div style={{ fontFamily: "'DM Sans'", fontSize: 12, color: DS.gold, textTransform: "uppercase", letterSpacing: "0.2em", marginBottom: 12 }}>Simple Pricing</div>
            <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(28px, 3.5vw, 42px)", fontWeight: 700, color: DS.text, margin: 0 }}>Luxe Booth Packages</h2>
          </div></FadeIn>
          <div className="pkg-grid" style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 16 }}>
            {packages.map((p, i) => (
              <FadeIn key={p.name} delay={i * 0.08}>
                <div style={{ border: `1px solid ${p.popular ? DS.gold : DS.border}`, background: p.popular ? DS.surfaceAlt : "transparent", padding: "28px 24px", height: "100%", display: "flex", flexDirection: "column", position: "relative" }}>
                  {p.popular && <div style={{ position: "absolute", top: 0, right: 0, background: DS.gold, color: DS.bg, fontFamily: "'DM Sans'", fontSize: 10, fontWeight: 700, padding: "5px 12px", textTransform: "uppercase", letterSpacing: "0.1em" }}>Popular</div>}
                  <h3 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 22, fontWeight: 600, color: DS.text, margin: "0 0 4px" }}>{p.name}</h3>
                  <div style={{ fontFamily: "'Bebas Neue'", fontSize: 36, color: DS.gold, margin: "8px 0 16px" }}>${p.price}</div>
                  <div style={{ flex: 1 }}>
                    {p.includes.map((inc, ii) => (
                      <div key={ii} style={{ display: "flex", alignItems: "center", gap: 8, padding: "6px 0" }}>
                        <span style={{ width: 5, height: 5, background: DS.gold, borderRadius: "50%", flexShrink: 0 }} />
                        <span style={{ fontFamily: "'DM Sans'", fontSize: 13, color: DS.textSec }}>{inc}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </div>

      {/* CTA */}
      <div style={{ padding: "100px 32px", textAlign: "center" }}>
        <FadeIn>
          <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(28px, 4vw, 48px)", fontWeight: 700, color: DS.text, margin: "0 0 12px" }}>Your Guests Will Thank You</h2>
          <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 20, color: DS.textSec, fontStyle: "italic", marginBottom: 32 }}>Add Luxe Booth to any MMC photography or videography package.</p>
          <a href="/book?addon=luxebooth" style={{ fontFamily: "'DM Sans'", fontSize: 14, color: DS.bg, background: DS.ember, padding: "16px 40px", textDecoration: "none", textTransform: "uppercase", letterSpacing: "0.1em", fontWeight: 600, display: "inline-block", transition: "background 0.3s" }}
            onMouseEnter={(e) => e.target.style.background = "#ff6b3d"} onMouseLeave={(e) => e.target.style.background = DS.ember}>Add Luxe Booth</a>
        </FadeIn>
      </div>

      <Footer />
    </div>
  );
}
