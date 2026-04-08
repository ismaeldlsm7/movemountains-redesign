import { useState, useEffect, useRef } from "react";
import { motion, useInView, useScroll, useTransform } from "framer-motion";
import Header from "../components/Header";
import Footer from "../components/Footer";
import CheckAvailabilityButton from "../components/CheckAvailabilityButton";

const DS = { bg: "var(--mm-bg)", surface: "var(--mm-surface)", surfaceAlt: "var(--mm-surface-alt)", text: "var(--mm-text)", textSec: "var(--mm-text-sec)", gold: "var(--mm-gold)", ember: "var(--mm-ember)", border: "var(--mm-border)" };
const fontLink = "https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,700;1,400&family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;0,700;1,400;1,500&family=DM+Sans:wght@400;500;600;700&family=Bebas+Neue&display=swap";
function FadeIn({ children, delay = 0, y = 24 }) { const ref = useRef(null); const inView = useInView(ref, { once: true, margin: "-40px" }); return <motion.div ref={ref} initial={{ opacity: 0, y }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.65, delay, ease: [0.25, 0.1, 0.25, 1] }}>{children}</motion.div>; }

export default function Super8Page() {
  const [scrolled, setScrolled] = useState(false);
  const heroRef = useRef(null); const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const heroScale = useTransform(scrollYProgress, [0, 1], [1.05, 1.15]); const heroOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);
  useEffect(() => { const fn = () => setScrolled(window.scrollY > 60); window.addEventListener("scroll", fn); return () => window.removeEventListener("scroll", fn); }, []);

  return (
    <div style={{ background: DS.bg, color: DS.text, minHeight: "100vh" }}>
      <style>{`@import url('${fontLink}'); * { margin: 0; padding: 0; box-sizing: border-box; } body { background: ${DS.bg}; } ::selection { background: ${DS.gold}; color: ${DS.bg}; } @media (max-width: 768px) { .nav-links { display: none !important; } .split { grid-template-columns: 1fr !important; } .split > * { order: unset !important; } }`}</style>
      <Header activePage="Services" />

      <div ref={heroRef} style={{ height: "65vh", minHeight: 440, maxHeight: 700, position: "relative", overflow: "hidden" }}>
        <motion.div style={{ scale: heroScale, position: "absolute", inset: 0 }}><div style={{ width: "100%", height: "100%", background: "linear-gradient(160deg, var(--mm-surface-alt) 0%, var(--mm-surface) 50%, var(--mm-bg) 100%)", display: "flex", alignItems: "center", justifyContent: "center" }}><span style={{ fontFamily: "'DM Sans'", fontSize: 13, color: DS.textSec, opacity: 0.25, textTransform: "uppercase", letterSpacing: "0.2em" }}>[ Super 8 Film — Analog Warmth ]</span></div></motion.div>
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to bottom, rgba(15,15,15,0.2) 0%, rgba(15,15,15,0.1) 40%, rgba(15,15,15,0.8) 82%, var(--mm-bg) 100%)" }} />
        <motion.div style={{ opacity: heroOpacity, position: "absolute", bottom: "10%", left: 0, right: 0, padding: "0 32px" }}><div style={{ maxWidth: 800, margin: "0 auto" }}><motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}>
          <div style={{ fontFamily: "'DM Sans'", fontSize: 12, color: DS.gold, textTransform: "uppercase", letterSpacing: "0.25em", marginBottom: 16 }}>Move Mountains Co.</div>
          <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(44px, 7vw, 80px)", fontWeight: 700, color: DS.text, lineHeight: 1, margin: "0 0 12px" }}>Super <span style={{ color: DS.gold }}>8</span> Film</h1>
          <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(18px, 2.2vw, 24px)", color: DS.textSec, fontStyle: "italic" }}>Vintage. For the Vibes.</p>
        </motion.div></div></motion.div>
      </div>

      {/* Film strip placeholder */}
      <div style={{ padding: "48px 32px" }}><div style={{ maxWidth: 1000, margin: "0 auto" }}>
        <FadeIn><div style={{ display: "grid", gridTemplateColumns: "repeat(5, 1fr)", gap: 8 }}>
          {["#2a2418", "#241e14", "#28221a", "#221c16", "#261e18"].map((c, i) => <div key={i} style={{ aspectRatio: "4/3", background: c, display: "flex", alignItems: "center", justifyContent: "center", border: `3px solid ${DS.bg}`, boxShadow: "0 0 0 1px rgba(201,169,110,0.1)" }}><span style={{ fontFamily: "'DM Sans'", fontSize: 9, color: DS.textSec, opacity: 0.2 }}>Frame {i + 1}</span></div>)}
        </div></FadeIn>
      </div></div>

      {/* Content */}
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "32px 32px 80px" }}>
        <div className="split" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "clamp(32px, 5vw, 72px)", alignItems: "center" }}>
          <FadeIn><div>
            <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(28px, 3.5vw, 42px)", fontWeight: 700, color: DS.text, margin: "0 0 20px" }}>This Isn't a Filter</h2>
            <p style={{ fontFamily: "'DM Sans'", fontSize: 15, color: DS.textSec, lineHeight: 1.75, marginBottom: 16 }}>This is real analog film — shot on vintage Super 8mm cameras, processed in a lab, and delivered with the warmth, grain, and texture that digital can't replicate.</p>
            <p style={{ fontFamily: "'DM Sans'", fontSize: 15, color: DS.textSec, lineHeight: 1.75, marginBottom: 24 }}>Super 8 is for the couple who wants something no one else at their reception will have: a wedding film that looks and feels like a family heirloom from the moment it's made. The organic grain, the warm color shifts, the soft focus — these aren't imperfections. They're what makes it real.</p>
            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              {["Shot on authentic Super 8mm film stock", "Lab-processed and digitally scanned in HD", "3–4 minute highlight reel with music", "Warm, organic grain texture — not a digital filter", "Delivered as a digital file for easy sharing", "Optional music scoring by our editing team"].map((f, i) => <div key={i} style={{ display: "flex", alignItems: "center", gap: 10 }}><span style={{ width: 6, height: 6, background: DS.gold, borderRadius: "50%", flexShrink: 0 }} /><span style={{ fontFamily: "'DM Sans'", fontSize: 14, color: DS.text }}>{f}</span></div>)}
            </div>
          </div></FadeIn>
          <FadeIn delay={0.1}><div style={{ aspectRatio: "3/4", background: "#241e14", display: "flex", alignItems: "center", justifyContent: "center", position: "relative" }}>
            <span style={{ fontFamily: "'Bebas Neue'", fontSize: 120, color: DS.gold, opacity: 0.04, position: "absolute" }}>8mm</span>
            <span style={{ fontFamily: "'DM Sans'", fontSize: 11, color: DS.textSec, opacity: 0.25, textTransform: "uppercase", letterSpacing: "0.12em", position: "relative" }}>[ Super 8 Camera ]</span>
          </div></FadeIn>
        </div>
      </div>

      {/* Pricing */}
      <div style={{ background: DS.surface, borderTop: `1px solid ${DS.border}`, borderBottom: `1px solid ${DS.border}`, padding: "80px 32px" }}>
        <div style={{ maxWidth: 600, margin: "0 auto", textAlign: "center" }}>
          <FadeIn>
            <div style={{ fontFamily: "'DM Sans'", fontSize: 11, color: DS.gold, textTransform: "uppercase", letterSpacing: "0.15em", marginBottom: 12 }}>Add to Any Package</div>
            <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 36, fontWeight: 700, color: DS.text, margin: "0 0 8px" }}>Super 8 Film</h2>
            <div style={{ fontFamily: "'Bebas Neue'", fontSize: 56, color: DS.gold, margin: "8px 0 20px" }}>$1,200</div>
            <p style={{ fontFamily: "'DM Sans'", fontSize: 14, color: DS.textSec, marginBottom: 28 }}>3–4 minute analog film reel. Shot on vintage Super 8mm cameras. Lab-processed. Digitally delivered. Add to any photography or videography package.</p>
            <a href="#" style={{ fontFamily: "'DM Sans'", fontSize: 14, color: DS.bg, background: DS.ember, padding: "16px 40px", textDecoration: "none", textTransform: "uppercase", letterSpacing: "0.1em", fontWeight: 600, display: "inline-block", transition: "background 0.3s" }} onMouseEnter={(e) => e.target.style.background = "#ff6b3d"} onMouseLeave={(e) => e.target.style.background = DS.ember}>Add Super 8 to Your Wedding</a>
          </FadeIn>
        </div>
      </div>

      {/* Quote */}
      <div style={{ padding: "80px 32px", textAlign: "center" }}>
        <FadeIn><div style={{ maxWidth: 650, margin: "0 auto" }}>
          <div style={{ fontFamily: "'Playfair Display'", fontSize: 48, color: DS.gold, opacity: 0.2, lineHeight: 1, marginBottom: -8 }}>"</div>
          <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(20px, 2.5vw, 28px)", color: DS.text, lineHeight: 1.5, fontStyle: "italic" }}>They were absolutely electric on the dance floor, so much so that our guests continue to rave about how awesome they were!</p>
          <div style={{ fontFamily: "'DM Sans'", fontSize: 13, color: DS.gold, textTransform: "uppercase", letterSpacing: "0.1em", marginTop: 16 }}>— Olivia</div>
        </div></FadeIn>
      </div>

      <div style={{ borderTop: `1px solid ${DS.border}`, padding: "100px 32px", textAlign: "center", background: `linear-gradient(160deg, var(--mm-surface) 0%, var(--mm-surface-alt) 50%, ${DS.bg} 100%)` }}>
        <FadeIn><h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(28px, 4vw, 48px)", fontWeight: 700, color: DS.text, margin: "0 0 12px" }}>Nothing Else Looks Like This</h2><p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 20, color: DS.textSec, fontStyle: "italic", marginBottom: 32 }}>Analog warmth in a digital world.</p>
          <CheckAvailabilityButton />
        </FadeIn>
      </div>
      <Footer />
    </div>
  );
}
