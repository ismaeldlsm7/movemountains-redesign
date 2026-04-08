import { useState, useEffect, useRef } from "react";
import { motion, useInView, useScroll, useTransform } from "framer-motion";
import Header from "../components/Header";
import Footer from "../components/Footer";
import CheckAvailabilityButton from "../components/CheckAvailabilityButton";

const DS = { bg: "#0F0F0F", surface: "#1E1E1E", surfaceAlt: "#161616", text: "#F5F0E8", textSec: "#8A8477", gold: "#C9A96E", ember: "#E8572A", border: "#2A2A2A" };
const fontLink = "https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,700;1,400&family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;0,700;1,400;1,500&family=DM+Sans:wght@400;500;600;700&family=Bebas+Neue&display=swap";
function FadeIn({ children, delay = 0, y = 24 }) { const ref = useRef(null); const inView = useInView(ref, { once: true, margin: "-40px" }); return <motion.div ref={ref} initial={{ opacity: 0, y }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.65, delay, ease: [0.25, 0.1, 0.25, 1] }}>{children}</motion.div>; }

const deliverables = [
  { title: "Highlight Film", duration: "4–6 min", desc: "The cinematic heart of your wedding day — the best moments, music, and emotion distilled into a film you'll watch on every anniversary." },
  { title: "Full Ceremony", duration: "Full length", desc: "Every word of your vows, every reading, every moment of the ceremony captured and edited with professional audio." },
  { title: "Full Reception", duration: "Full length", desc: "Toasts, first dance, parent dances, bouquet toss, and the dance floor energy — the complete reception story." },
  { title: "Teaser Clip", duration: "60–90 sec", desc: "A social-ready preview delivered within 2 weeks — perfect for sharing with family and posting online." },
];

export default function VideographyPage() {
  const [scrolled, setScrolled] = useState(false);
  const heroRef = useRef(null); const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const heroScale = useTransform(scrollYProgress, [0, 1], [1.05, 1.15]); const heroOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);
  useEffect(() => { const fn = () => setScrolled(window.scrollY > 60); window.addEventListener("scroll", fn); return () => window.removeEventListener("scroll", fn); }, []);

  return (
    <div style={{ background: DS.bg, color: DS.text, minHeight: "100vh" }}>
      <style>{`@import url('${fontLink}'); * { margin: 0; padding: 0; box-sizing: border-box; } body { background: ${DS.bg}; } ::selection { background: ${DS.gold}; color: ${DS.bg}; } @media (max-width: 768px) { .nav-links { display: none !important; } .split { grid-template-columns: 1fr !important; } .split > * { order: unset !important; } }`}</style>
      <Header activePage="Services" />

      <div ref={heroRef} style={{ height: "65vh", minHeight: 440, maxHeight: 700, position: "relative", overflow: "hidden" }}>
        <motion.div style={{ scale: heroScale, position: "absolute", inset: 0 }}><div style={{ width: "100%", height: "100%", background: "linear-gradient(160deg, #1e2024 0%, #1a1c20 50%, #0f0f0f 100%)", display: "flex", alignItems: "center", justifyContent: "center" }}><span style={{ fontFamily: "'DM Sans'", fontSize: 13, color: DS.textSec, opacity: 0.25, textTransform: "uppercase", letterSpacing: "0.2em" }}>[ Cinematic Wedding Film — Behind the Scenes ]</span></div></motion.div>
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to bottom, rgba(15,15,15,0.2) 0%, rgba(15,15,15,0.1) 40%, rgba(15,15,15,0.8) 82%, #0F0F0F 100%)" }} />
        <motion.div style={{ opacity: heroOpacity, position: "absolute", bottom: "10%", left: 0, right: 0, padding: "0 32px" }}><div style={{ maxWidth: 800, margin: "0 auto" }}><motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}>
          <div style={{ fontFamily: "'DM Sans'", fontSize: 12, color: DS.gold, textTransform: "uppercase", letterSpacing: "0.25em", marginBottom: 16 }}>Move Mountains Co.</div>
          <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(44px, 7vw, 80px)", fontWeight: 700, color: DS.text, lineHeight: 1, margin: "0 0 12px" }}>Wedding <span style={{ color: DS.gold }}>Videography</span></h1>
          <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(18px, 2.2vw, 24px)", color: DS.textSec, fontStyle: "italic" }}>Modern. Moving. Memorable.</p>
        </motion.div></div></motion.div>
      </div>

      {/* Video player placeholder */}
      <div style={{ maxWidth: 1000, margin: "0 auto", padding: "48px 32px" }}>
        <FadeIn><div style={{ aspectRatio: "16/9", background: "#1a1c20", display: "flex", alignItems: "center", justifyContent: "center", position: "relative" }}>
          <div style={{ width: 72, height: 72, borderRadius: "50%", border: `2px solid ${DS.gold}`, display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", transition: "all 0.3s" }}><span style={{ fontFamily: "'DM Sans'", fontSize: 24, color: DS.gold, marginLeft: 4 }}>▶</span></div>
          <div style={{ position: "absolute", bottom: 16, left: 20, fontFamily: "'DM Sans'", fontSize: 12, color: DS.textSec, opacity: 0.5 }}>Carey & Luke — Highlight Film — 5:42</div>
        </div></FadeIn>
      </div>

      {/* Intro */}
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "32px 32px 80px" }}>
        <div className="split" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "clamp(32px, 5vw, 72px)", alignItems: "center" }}>
          <FadeIn><div>
            <div style={{ fontFamily: "'DM Sans'", fontSize: 12, color: DS.gold, textTransform: "uppercase", letterSpacing: "0.2em", marginBottom: 16 }}>Our Approach</div>
            <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(28px, 3.5vw, 42px)", fontWeight: 700, color: DS.text, margin: "0 0 20px" }}>Every Love Story Deserves a Film</h2>
            <p style={{ fontFamily: "'DM Sans'", fontSize: 15, color: DS.textSec, lineHeight: 1.75, marginBottom: 16 }}>Our cinematographers create modern, emotional wedding films that go far beyond a documentation reel. We capture the vows, the toasts, the first dance, and the moments between — edited into a cinematic piece you'll watch on every anniversary.</p>
            <p style={{ fontFamily: "'DM Sans'", fontSize: 15, color: DS.textSec, lineHeight: 1.75 }}>Professional audio capture ensures every word is crystal clear. 4K delivery means your film looks stunning on any screen, from your phone to a theater projection.</p>
          </div></FadeIn>
          <FadeIn delay={0.1}><div style={{ aspectRatio: "4/5", background: "#1c1e22", display: "flex", alignItems: "center", justifyContent: "center" }}><span style={{ fontFamily: "'DM Sans'", fontSize: 11, color: DS.textSec, opacity: 0.2, textTransform: "uppercase", letterSpacing: "0.12em" }}>[ Cinematographer on Set ]</span></div></FadeIn>
        </div>
      </div>

      {/* Deliverables */}
      <div style={{ background: DS.surface, borderTop: `1px solid ${DS.border}`, borderBottom: `1px solid ${DS.border}`, padding: "80px 32px" }}>
        <div style={{ maxWidth: 1000, margin: "0 auto" }}>
          <FadeIn><div style={{ marginBottom: 40 }}><div style={{ fontFamily: "'DM Sans'", fontSize: 12, color: DS.gold, textTransform: "uppercase", letterSpacing: "0.2em", marginBottom: 12 }}>What You Receive</div><h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(28px, 3.5vw, 42px)", fontWeight: 700, color: DS.text, margin: 0 }}>Your Films</h2></div></FadeIn>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 20 }}>
            {deliverables.map((d, i) => <FadeIn key={d.title} delay={i * 0.06}><div style={{ padding: "28px 24px", border: `1px solid ${DS.border}`, height: "100%", transition: "border-color 0.3s" }} onMouseEnter={(e) => e.currentTarget.style.borderColor = DS.gold} onMouseLeave={(e) => e.currentTarget.style.borderColor = DS.border}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 12 }}>
                <h3 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 22, fontWeight: 600, color: DS.text, margin: 0 }}>{d.title}</h3>
                <span style={{ fontFamily: "'Bebas Neue'", fontSize: 16, color: DS.gold, opacity: 0.7, whiteSpace: "nowrap" }}>{d.duration}</span>
              </div>
              <p style={{ fontFamily: "'DM Sans'", fontSize: 13, color: DS.textSec, lineHeight: 1.65 }}>{d.desc}</p>
            </div></FadeIn>)}
          </div>
        </div>
      </div>

      {/* Stats + Pricing */}
      <div style={{ padding: "80px 32px" }}>
        <div style={{ maxWidth: 900, margin: "0 auto", display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(140px, 1fr))", gap: 32, marginBottom: 56 }}>
          {[{ v: "4K", l: "Cinema Grade" }, { v: "4-6", l: "Min Highlight" }, { v: "8-12", l: "Weeks Delivery" }, { v: "∞", l: "Rewatches" }].map((s, i) => <FadeIn key={s.l} delay={i * 0.08}><div style={{ textAlign: "center" }}>
            <div style={{ fontFamily: "'Bebas Neue'", fontSize: 48, color: DS.gold, lineHeight: 1 }}>{s.v}</div>
            <div style={{ fontFamily: "'DM Sans'", fontSize: 11, color: DS.textSec, textTransform: "uppercase", letterSpacing: "0.1em", marginTop: 6 }}>{s.l}</div>
          </div></FadeIn>)}
        </div>
        <FadeIn><div style={{ textAlign: "center", padding: "40px", border: `1px solid ${DS.border}`, maxWidth: 600, margin: "0 auto" }}>
          <div style={{ fontFamily: "'DM Sans'", fontSize: 11, color: DS.gold, textTransform: "uppercase", letterSpacing: "0.15em", marginBottom: 8 }}>Cinematic Package</div>
          <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: 32, fontWeight: 700, color: DS.text, margin: "0 0 4px" }}>Photo + Film</h3>
          <div style={{ fontFamily: "'Bebas Neue'", fontSize: 52, color: DS.gold, margin: "8px 0 16px" }}>$8,500</div>
          <p style={{ fontFamily: "'DM Sans'", fontSize: 14, color: DS.textSec, marginBottom: 24 }}>2 photographers + 1 cinematographer. 10+ hours. Highlight film + full ceremony. Custom album included.</p>
          <a href="#" style={{ fontFamily: "'DM Sans'", fontSize: 14, color: DS.bg, background: DS.ember, padding: "14px 36px", textDecoration: "none", textTransform: "uppercase", letterSpacing: "0.1em", fontWeight: 600, display: "inline-block", transition: "background 0.3s" }} onMouseEnter={(e) => e.target.style.background = "#ff6b3d"} onMouseLeave={(e) => e.target.style.background = DS.ember}>Book Cinematic</a>
        </div></FadeIn>
      </div>

      {/* Testimonial */}
      <div style={{ borderTop: `1px solid ${DS.border}`, borderBottom: `1px solid ${DS.border}`, padding: "64px 32px", textAlign: "center" }}>
        <FadeIn><div style={{ maxWidth: 650, margin: "0 auto" }}>
          <div style={{ fontFamily: "'Playfair Display'", fontSize: 48, color: DS.gold, opacity: 0.2, lineHeight: 1, marginBottom: -8 }}>"</div>
          <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(20px, 2.5vw, 28px)", color: DS.text, lineHeight: 1.5, fontStyle: "italic" }}>We've been married nearly a year and continue to watch our video regularly. It's absolutely perfect.</p>
          <div style={{ fontFamily: "'DM Sans'", fontSize: 13, color: DS.gold, textTransform: "uppercase", letterSpacing: "0.1em", marginTop: 16 }}>— Recent Couple</div>
        </div></FadeIn>
      </div>

      {/* CTA */}
      <div style={{ padding: "100px 32px", textAlign: "center", background: `linear-gradient(160deg, #1a1410 0%, #1a1612 50%, ${DS.bg} 100%)` }}>
        <FadeIn>
          <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(30px, 4.5vw, 52px)", fontWeight: 700, color: DS.text, margin: "0 0 12px" }}>Your Love Story on Film</h2>
          <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 20, color: DS.textSec, fontStyle: "italic", marginBottom: 32 }}>A film you'll watch on every anniversary.</p>
          <CheckAvailabilityButton />
        </FadeIn>
      </div>
      <Footer />
    </div>
  );
}
