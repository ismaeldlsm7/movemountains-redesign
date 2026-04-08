import { useState, useEffect, useRef } from "react";
import { motion, useInView, useScroll, useTransform, AnimatePresence } from "framer-motion";
import Header from "../components/Header";
import Footer from "../components/Footer";
import CheckAvailabilityButton from "../components/CheckAvailabilityButton";

const DS = { bg: "var(--mm-bg)", surface: "var(--mm-surface)", surfaceAlt: "var(--mm-surface-alt)", text: "var(--mm-text)", textSec: "var(--mm-text-sec)", gold: "var(--mm-gold)", ember: "var(--mm-ember)", border: "var(--mm-border)" };
const fontLink = "https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,700;1,400&family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;0,700;1,400;1,500&family=DM+Sans:wght@400;500;600;700&family=Bebas+Neue&display=swap";

function FadeIn({ children, delay = 0, y = 24, style }) {
  const ref = useRef(null); const inView = useInView(ref, { once: true, margin: "-40px" });
  return <motion.div ref={ref} initial={{ opacity: 0, y }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.65, delay, ease: [0.25, 0.1, 0.25, 1] }} style={style}>{children}</motion.div>;
}
function StatCounter({ value, suffix = "", label, delay = 0 }) {
  const ref = useRef(null); const inView = useInView(ref, { once: true, margin: "-30px" }); const [count, setCount] = useState(0);
  const n = parseInt(value); useEffect(() => { if (!inView || isNaN(n)) return; let s = 0; const step = (n / 1400) * 16; const t = setInterval(() => { s += step; if (s >= n) { setCount(n); clearInterval(t); } else setCount(Math.floor(s)); }, 16); return () => clearInterval(t); }, [inView, n]);
  return <motion.div ref={ref} initial={{ opacity: 0, y: 14 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.5, delay }} style={{ textAlign: "center" }}>
    <div style={{ fontFamily: "'Bebas Neue'", fontSize: "clamp(44px, 8vw, 72px)", color: DS.gold, lineHeight: 1 }}>{isNaN(n) ? value : count}{suffix}</div>
    <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 14, color: DS.textSec, letterSpacing: "0.12em", textTransform: "uppercase", marginTop: 6 }}>{label}</div>
  </motion.div>;
}

const packages = [
  { name: "Essentials", price: "3,200", hours: "6", shooters: "1", images: "~600", includes: ["6 hours coverage", "1 photographer", "Engagement session", "Online gallery", "Choice of 5 editing styles", "All images delivered digitally"] },
  { name: "Signature", price: "5,400", hours: "8–10", shooters: "2", images: "~1,000", popular: true, includes: ["8–10 hours coverage", "2 photographers", "Engagement session", "Online gallery", "Choice of 5 editing styles", "Custom lay-flat album", "Sneak peek in 3 days", "~800–1,000 images"] },
];

const process = [
  { n: "01", t: "Consultation", d: "We learn about your day — venue, vibe, timeline, vision. No sales pressure." },
  { n: "02", t: "Engagement Session", d: "A complimentary shoot to get comfortable in front of the camera and bond with your photographer." },
  { n: "03", t: "Timeline Building", d: "We build your photo timeline, coordinate with vendors, and plan every shot." },
  { n: "04", t: "Wedding Day", d: "Your dedicated team captures every moment — candid, emotional, editorial." },
  { n: "05", t: "Sneak Peek", d: "20–30 of our favorite images, delivered within 3–5 days." },
  { n: "06", t: "Full Gallery", d: "600–1,000 edited images delivered via private online gallery in 6–8 weeks." },
];

export default function PhotographyPage() {
  const [scrolled, setScrolled] = useState(false);
  const heroRef = useRef(null); const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const heroScale = useTransform(scrollYProgress, [0, 1], [1.05, 1.15]); const heroOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);
  useEffect(() => { const fn = () => setScrolled(window.scrollY > 60); window.addEventListener("scroll", fn); return () => window.removeEventListener("scroll", fn); }, []);

  return (
    <div style={{ background: DS.bg, color: DS.text, minHeight: "100vh" }}>
      <style>{`@import url('${fontLink}'); * { margin: 0; padding: 0; box-sizing: border-box; } body { background: ${DS.bg}; } ::selection { background: ${DS.gold}; color: ${DS.bg}; }
        @media (max-width: 900px) { .incl-grid { grid-template-columns: 1fr 1fr !important; } .recent-grid { grid-template-columns: 1fr 1fr !important; grid-auto-rows: 220px !important; } .recent-grid > * { grid-area: auto !important; } }
        @media (max-width: 768px) { .nav-links { display: none !important; } .split { grid-template-columns: 1fr !important; } .split > * { order: unset !important; } .pkg-grid { grid-template-columns: 1fr !important; } .process-grid { grid-template-columns: 1fr 1fr !important; } }
        @media (max-width: 540px) { .incl-grid { grid-template-columns: 1fr !important; } .recent-grid { grid-template-columns: 1fr !important; } }`}</style>
      <Header activePage="Services" />

      {/* Hero */}
      <div ref={heroRef} style={{ height: "65vh", minHeight: 440, maxHeight: 700, position: "relative", overflow: "hidden" }}>
        <motion.div style={{ scale: heroScale, position: "absolute", inset: 0 }}><div style={{ width: "100%", height: "100%", background: "linear-gradient(160deg, var(--mm-surface-alt) 0%, var(--mm-surface) 50%, var(--mm-bg) 100%)", display: "flex", alignItems: "center", justifyContent: "center" }}><span style={{ fontFamily: "'DM Sans'", fontSize: 13, color: DS.textSec, opacity: 0.25, textTransform: "uppercase", letterSpacing: "0.2em" }}>[ Wedding Photography — Golden Hour ]</span></div></motion.div>
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to bottom, rgba(15,15,15,0.2) 0%, rgba(15,15,15,0.1) 40%, rgba(15,15,15,0.8) 82%, var(--mm-bg) 100%)" }} />
        <motion.div style={{ opacity: heroOpacity, position: "absolute", bottom: "10%", left: 0, right: 0, padding: "0 32px" }}>
          <div style={{ maxWidth: 800, margin: "0 auto" }}>
            <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5, duration: 0.7 }}>
              <div style={{ fontFamily: "'DM Sans'", fontSize: 12, color: DS.gold, textTransform: "uppercase", letterSpacing: "0.25em", marginBottom: 16 }}>Move Mountains Co.</div>
              <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(44px, 7vw, 80px)", fontWeight: 700, color: DS.text, lineHeight: 1, margin: "0 0 12px" }}>Wedding <span style={{ color: DS.gold }}>Photography</span></h1>
              <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(18px, 2.2vw, 24px)", color: DS.textSec, fontStyle: "italic" }}>Bold. Candid. Yours.</p>
            </motion.div>
          </div>
        </motion.div>
      </div>

      {/* Stats */}
      <div style={{ background: DS.surface, borderTop: `1px solid ${DS.border}`, borderBottom: `1px solid ${DS.border}`, padding: "48px 32px" }}>
        <div style={{ maxWidth: 900, margin: "0 auto", display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(120px, 1fr))", gap: 32 }}>
          <StatCounter value="500" suffix="+" label="Weddings Shot" /><StatCounter value="1000" suffix="+" label="Images Per Wedding" delay={0.1} /><StatCounter value="5" label="Editing Styles" delay={0.2} /><StatCounter value="1" label="Wedding Per Day" delay={0.3} />
        </div>
      </div>

      {/* Intro */}
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "80px 32px" }}>
        <div className="split" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "clamp(32px, 5vw, 72px)", alignItems: "center" }}>
          <FadeIn>
            <div>
              <div style={{ fontFamily: "'DM Sans'", fontSize: 12, color: DS.gold, textTransform: "uppercase", letterSpacing: "0.2em", marginBottom: 16 }}>Our Approach</div>
              <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(28px, 3.5vw, 42px)", fontWeight: 700, color: DS.text, margin: "0 0 20px" }}>We Capture What's Real</h2>
              <p style={{ fontFamily: "'DM Sans'", fontSize: 15, color: DS.textSec, lineHeight: 1.75, marginBottom: 16 }}>Your wedding photography should feel candid, natural, and undeniably yours. We shoot in a contemporary, photojournalistic style — which means we're not pulling you away from your cocktail hour for 45 minutes of posed portraits.</p>
              <p style={{ fontFamily: "'DM Sans'", fontSize: 15, color: DS.textSec, lineHeight: 1.75 }}>We capture what's happening: the surprise kisses, the dance floor energy, the quiet look across the room. Every package includes a complimentary engagement session, full-day coverage, and access to our online gallery with printing options.</p>
            </div>
          </FadeIn>
          <FadeIn delay={0.1}><div style={{ aspectRatio: "4/5", background: "#241e18", display: "flex", alignItems: "center", justifyContent: "center" }}><span style={{ fontFamily: "'DM Sans'", fontSize: 11, color: DS.textSec, opacity: 0.2, textTransform: "uppercase", letterSpacing: "0.12em" }}>[ Candid Wedding Moment ]</span></div></FadeIn>
        </div>
      </div>

      {/* What You Get */}
      <div style={{ borderTop: `1px solid ${DS.border}`, borderBottom: `1px solid ${DS.border}`, padding: "80px 32px" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <FadeIn><div style={{ marginBottom: 40 }}><div style={{ fontFamily: "'DM Sans'", fontSize: 12, color: DS.gold, textTransform: "uppercase", letterSpacing: "0.2em", marginBottom: 12 }}>What's Included</div><h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(28px, 3.5vw, 42px)", fontWeight: 700, color: DS.text, margin: 0 }}>Every Package Includes</h2></div></FadeIn>
          <div className="incl-grid" style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 20 }}>
            {[{ i: "◎", t: "Full-Day Coverage", d: "One wedding per day. Your team is fully dedicated from getting ready to the last dance." },
              { i: "◇", t: "Engagement Session", d: "A complimentary pre-wedding shoot to build chemistry with your photographer and get comfortable on camera." },
              { i: "▣", t: "Online Gallery", d: "A private, beautifully designed gallery for viewing, downloading, and ordering professional prints." },
              { i: "△", t: "5 Editing Styles", d: "Choose from Classic, Portra, Moody, Bright, or Cinematic — each transforms the mood of your images." },
              { i: "○", t: "Digital Delivery", d: "All images delivered in full resolution. Print anywhere, share everywhere, keep forever." },
              { i: "□", t: "Planning Support", d: "Timeline building, shot list coordination, and vendor communication handled by our planning team." },
            ].map((f, i) => (
              <FadeIn key={f.t} delay={i * 0.06}><div style={{ padding: "24px", border: `1px solid ${DS.border}`, height: "100%", transition: "border-color 0.3s" }} onMouseEnter={(e) => e.currentTarget.style.borderColor = DS.gold} onMouseLeave={(e) => e.currentTarget.style.borderColor = DS.border}>
                <div style={{ fontFamily: "'DM Sans'", fontSize: 22, color: DS.gold, opacity: 0.6, marginBottom: 12 }}>{f.i}</div>
                <h3 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 20, fontWeight: 600, color: DS.text, marginBottom: 8 }}>{f.t}</h3>
                <p style={{ fontFamily: "'DM Sans'", fontSize: 13, color: DS.textSec, lineHeight: 1.6 }}>{f.d}</p>
              </div></FadeIn>
            ))}
          </div>
        </div>
      </div>

      {/* Gallery */}
      <div style={{ padding: "80px 32px" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <FadeIn><div style={{ fontFamily: "'DM Sans'", fontSize: 12, color: DS.gold, textTransform: "uppercase", letterSpacing: "0.2em", marginBottom: 24 }}>Recent Work</div></FadeIn>
          <div className="recent-grid" style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gridAutoRows: "180px", gap: 12 }}>
            {[
              { c: "#2a2218", area: "1 / 1 / 3 / 3" },
              { c: "#1e1c18", area: "1 / 3 / 2 / 4" },
              { c: "#22201a", area: "1 / 4 / 2 / 5" },
              { c: "#201e1a", area: "2 / 3 / 3 / 5" },
              { c: "#1a1e1c", area: "3 / 1 / 4 / 3" },
              { c: "#241e20", area: "3 / 3 / 4 / 5" },
            ].map((item, i) => (
              <FadeIn key={i} delay={i * 0.06} style={{ gridArea: item.area }}>
                <div style={{ width: "100%", height: "100%", background: item.c, display: "flex", alignItems: "center", justifyContent: "center", overflow: "hidden" }}>
                  <span style={{ fontFamily: "'DM Sans'", fontSize: 10, color: DS.textSec, opacity: 0.2, textTransform: "uppercase" }}>[ Sample ]</span>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </div>

      {/* Packages */}
      <div style={{ background: DS.surface, borderTop: `1px solid ${DS.border}`, borderBottom: `1px solid ${DS.border}`, padding: "80px 32px" }}>
        <div style={{ maxWidth: 900, margin: "0 auto" }}>
          <FadeIn><div style={{ textAlign: "center", marginBottom: 40 }}><div style={{ fontFamily: "'DM Sans'", fontSize: 12, color: DS.gold, textTransform: "uppercase", letterSpacing: "0.2em", marginBottom: 12 }}>Investment</div><h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(28px, 3.5vw, 42px)", fontWeight: 700, color: DS.text, margin: 0 }}>Photography Packages</h2></div></FadeIn>
          <div className="pkg-grid" style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 20 }}>
            {packages.map((p, i) => (
              <FadeIn key={p.name} delay={i * 0.1}><div style={{ border: `1px solid ${p.popular ? DS.gold : DS.border}`, background: p.popular ? DS.surfaceAlt : "transparent", padding: "32px 28px", position: "relative" }}>
                {p.popular && <div style={{ position: "absolute", top: 0, right: 0, background: DS.gold, color: DS.bg, fontFamily: "'DM Sans'", fontSize: 10, fontWeight: 700, padding: "6px 14px", textTransform: "uppercase", letterSpacing: "0.1em" }}>Most Popular</div>}
                <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: 28, fontWeight: 700, color: DS.text, margin: "0 0 4px" }}>{p.name}</h3>
                <div style={{ fontFamily: "'Bebas Neue'", fontSize: 44, color: DS.gold, margin: "8px 0 20px" }}>${p.price}</div>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 1, background: DS.border, marginBottom: 20 }}>
                  {[{ l: "Hours", v: p.hours }, { l: "Shooters", v: p.shooters }, { l: "Images", v: p.images }].map((s) => <div key={s.l} style={{ background: p.popular ? DS.surfaceAlt : DS.bg, padding: "12px 8px", textAlign: "center" }}><div style={{ fontFamily: "'DM Sans'", fontSize: 9, color: DS.gold, textTransform: "uppercase", letterSpacing: "0.08em" }}>{s.l}</div><div style={{ fontFamily: "'DM Sans'", fontSize: 14, color: DS.text, marginTop: 2, fontWeight: 500 }}>{s.v}</div></div>)}
                </div>
                {p.includes.map((inc, ii) => <div key={ii} style={{ display: "flex", alignItems: "center", gap: 8, padding: "6px 0" }}><span style={{ width: 5, height: 5, background: DS.gold, borderRadius: "50%", flexShrink: 0 }} /><span style={{ fontFamily: "'DM Sans'", fontSize: 13, color: DS.textSec }}>{inc}</span></div>)}
                <a href="#" style={{ display: "block", textAlign: "center", fontFamily: "'DM Sans'", fontSize: 13, fontWeight: 600, color: p.popular ? DS.bg : DS.gold, background: p.popular ? DS.ember : "transparent", border: p.popular ? "none" : `1px solid ${DS.gold}`, padding: "14px 0", textDecoration: "none", textTransform: "uppercase", letterSpacing: "0.08em", marginTop: 20, transition: "all 0.3s" }}
                  onMouseEnter={(e) => { if (p.popular) e.target.style.background = "#ff6b3d"; else { e.target.style.background = DS.gold; e.target.style.color = DS.bg; } }}
                  onMouseLeave={(e) => { if (p.popular) e.target.style.background = DS.ember; else { e.target.style.background = "transparent"; e.target.style.color = DS.gold; } }}>Book {p.name}</a>
              </div></FadeIn>
            ))}
          </div>
        </div>
      </div>

      {/* Process */}
      <div style={{ padding: "80px 32px", maxWidth: 1200, margin: "0 auto" }}>
        <FadeIn><div style={{ textAlign: "center", marginBottom: 40 }}><div style={{ fontFamily: "'DM Sans'", fontSize: 12, color: DS.gold, textTransform: "uppercase", letterSpacing: "0.2em", marginBottom: 12 }}>Your Journey</div><h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(28px, 3.5vw, 42px)", fontWeight: 700, color: DS.text, margin: 0 }}>From Booking to Gallery</h2></div></FadeIn>
        <div className="process-grid" style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 16 }}>
          {process.map((p, i) => <FadeIn key={p.n} delay={i * 0.05}><div style={{ padding: "24px 20px", border: `1px solid ${DS.border}`, height: "100%", transition: "border-color 0.3s" }} onMouseEnter={(e) => e.currentTarget.style.borderColor = DS.gold} onMouseLeave={(e) => e.currentTarget.style.borderColor = DS.border}>
            <div style={{ fontFamily: "'Bebas Neue'", fontSize: 28, color: DS.gold, opacity: 0.25, marginBottom: 8 }}>{p.n}</div>
            <h3 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 20, fontWeight: 600, color: DS.text, marginBottom: 8 }}>{p.t}</h3>
            <p style={{ fontFamily: "'DM Sans'", fontSize: 13, color: DS.textSec, lineHeight: 1.6 }}>{p.d}</p>
          </div></FadeIn>)}
        </div>
      </div>

      {/* CTA */}
      <div style={{ borderTop: `1px solid ${DS.border}`, padding: "100px 32px", textAlign: "center", background: `linear-gradient(160deg, var(--mm-surface) 0%, var(--mm-surface-alt) 50%, ${DS.bg} 100%)` }}>
        <FadeIn>
          <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(30px, 4.5vw, 52px)", fontWeight: 700, color: DS.text, margin: "0 0 12px" }}>Ready to See Your Day Through Our Lens?</h2>
          <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 20, color: DS.textSec, fontStyle: "italic", marginBottom: 32 }}>One wedding per day. Let's make sure it's yours.</p>
          <div style={{ display: "flex", gap: 16, justifyContent: "center", flexWrap: "wrap" }}>
            <CheckAvailabilityButton />
            <a href="#" style={{ fontFamily: "'DM Sans'", fontSize: 14, color: DS.gold, padding: "16px 40px", textDecoration: "none", textTransform: "uppercase", letterSpacing: "0.1em", border: `1px solid ${DS.gold}`, transition: "all 0.3s" }} onMouseEnter={(e) => { e.target.style.background = DS.gold; e.target.style.color = DS.bg; }} onMouseLeave={(e) => { e.target.style.background = "transparent"; e.target.style.color = DS.gold; }}>View Portfolio</a>
          </div>
        </FadeIn>
      </div>

<Footer />
    </div>
  );
}
