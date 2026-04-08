import { useState, useEffect, useRef } from "react";
import { motion, useInView, useScroll, useTransform } from "framer-motion";
import Header from "../components/Header";
import Footer from "../components/Footer";
import CheckAvailabilityButton from "../components/CheckAvailabilityButton";

const DS = { bg: "#0F0F0F", surface: "#1E1E1E", surfaceAlt: "#161616", text: "#F5F0E8", textSec: "#8A8477", gold: "#C9A96E", ember: "#E8572A", border: "#2A2A2A" };
const fontLink = "https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,700;1,400&family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;0,700;1,400;1,500&family=DM+Sans:wght@400;500;600;700&family=Bebas+Neue&display=swap";
function FadeIn({ children, delay = 0, y = 24 }) { const ref = useRef(null); const inView = useInView(ref, { once: true, margin: "-40px" }); return <motion.div ref={ref} initial={{ opacity: 0, y }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.65, delay, ease: [0.25, 0.1, 0.25, 1] }}>{children}</motion.div>; }

const deliverables = [
  { title: "Getting Ready BTS", desc: "The chaos, the champagne, the first look at the dress — raw, real, vertical.", icon: "◎" },
  { title: "Ceremony Moments", desc: "The walk, the vows, the kiss — captured from angles your photographer can't be at simultaneously.", icon: "▶" },
  { title: "Reception Energy", desc: "Dance floor chaos, guest reactions, sparkler exits — the content your followers want to see.", icon: "✦" },
  { title: "Detail Reels", desc: "Rings, flowers, venue details, table settings — the micro-content that racks up saves.", icon: "◇" },
  { title: "Same-Day Stories", desc: "Edited and delivered to your phone before the reception ends. Post while your guests are still there.", icon: "□" },
  { title: "Full Content Package", desc: "15–25 edited vertical videos + curated stills, delivered within 48 hours of your wedding.", icon: "◈" },
];

export default function ContentCreationPage() {
  const [scrolled, setScrolled] = useState(false);
  const heroRef = useRef(null); const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const heroScale = useTransform(scrollYProgress, [0, 1], [1.05, 1.15]); const heroOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);
  useEffect(() => { const fn = () => setScrolled(window.scrollY > 60); window.addEventListener("scroll", fn); return () => window.removeEventListener("scroll", fn); }, []);

  return (
    <div style={{ background: DS.bg, color: DS.text, minHeight: "100vh" }}>
      <style>{`@import url('${fontLink}'); * { margin: 0; padding: 0; box-sizing: border-box; } body { background: ${DS.bg}; } ::selection { background: ${DS.gold}; color: ${DS.bg}; } @media (max-width: 768px) { .nav-links { display: none !important; } .split { grid-template-columns: 1fr !important; } .split > * { order: unset !important; } }`}</style>
      <Header activePage="Services" />

      <div ref={heroRef} style={{ height: "65vh", minHeight: 440, maxHeight: 700, position: "relative", overflow: "hidden" }}>
        <motion.div style={{ scale: heroScale, position: "absolute", inset: 0 }}><div style={{ width: "100%", height: "100%", background: "linear-gradient(160deg, #1a1e1a 0%, #181c18 50%, #0f0f0f 100%)", display: "flex", alignItems: "center", justifyContent: "center" }}><span style={{ fontFamily: "'DM Sans'", fontSize: 13, color: DS.textSec, opacity: 0.25, textTransform: "uppercase", letterSpacing: "0.2em" }}>[ Behind the Scenes — Wedding Day ]</span></div></motion.div>
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to bottom, rgba(15,15,15,0.2) 0%, rgba(15,15,15,0.1) 40%, rgba(15,15,15,0.8) 82%, #0F0F0F 100%)" }} />
        <motion.div style={{ opacity: heroOpacity, position: "absolute", bottom: "10%", left: 0, right: 0, padding: "0 32px" }}><div style={{ maxWidth: 800, margin: "0 auto" }}><motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}>
          <div style={{ fontFamily: "'DM Sans'", fontSize: 12, color: DS.gold, textTransform: "uppercase", letterSpacing: "0.25em", marginBottom: 16 }}>Move Mountains Co.</div>
          <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(44px, 7vw, 80px)", fontWeight: 700, color: DS.text, lineHeight: 1, margin: "0 0 12px" }}>Content <span style={{ color: DS.gold }}>Creation</span></h1>
          <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(18px, 2.2vw, 24px)", color: DS.textSec, fontStyle: "italic" }}>The Moments Between the Moments.</p>
        </motion.div></div></motion.div>
      </div>

      {/* Phone mockups placeholder */}
      <div style={{ padding: "48px 32px" }}><div style={{ maxWidth: 800, margin: "0 auto", display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 16 }}>
        {["#1a1e1a", "#1c201c", "#181c18"].map((c, i) => <FadeIn key={i} delay={i * 0.08}><div style={{ aspectRatio: "9/16", background: c, borderRadius: 12, display: "flex", alignItems: "center", justifyContent: "center", maxWidth: 200, margin: "0 auto" }}><span style={{ fontFamily: "'DM Sans'", fontSize: 10, color: DS.textSec, opacity: 0.2, textTransform: "uppercase" }}>[ Reel {i + 1} ]</span></div></FadeIn>)}
      </div></div>

      {/* Intro */}
      <div style={{ maxWidth: 800, margin: "0 auto", padding: "32px 32px 64px", textAlign: "center" }}>
        <FadeIn>
          <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(28px, 3.5vw, 42px)", fontWeight: 700, color: DS.text, margin: "0 0 20px" }}>Your Wedding Day Is Content Gold</h2>
          <p style={{ fontFamily: "'DM Sans'", fontSize: 16, color: DS.textSec, lineHeight: 1.75, maxWidth: 600, margin: "0 auto" }}>Most of it disappears into a photographer's hard drive. Our content creation team captures the candid, social-first moments happening between the formal shots — the getting-ready chaos, the bridal party energy, the reception details worth posting. Same-day delivery available for Stories and Reels.</p>
        </FadeIn>
      </div>

      {/* Deliverables */}
      <div style={{ background: DS.surface, borderTop: `1px solid ${DS.border}`, borderBottom: `1px solid ${DS.border}`, padding: "80px 32px" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <FadeIn><div style={{ marginBottom: 40 }}><div style={{ fontFamily: "'DM Sans'", fontSize: 12, color: DS.gold, textTransform: "uppercase", letterSpacing: "0.2em", marginBottom: 12 }}>What You Get</div><h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(28px, 3.5vw, 42px)", fontWeight: 700, color: DS.text, margin: 0 }}>Content Deliverables</h2></div></FadeIn>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: 20 }}>
            {deliverables.map((d, i) => <FadeIn key={d.title} delay={i * 0.06}><div style={{ padding: "24px", border: `1px solid ${DS.border}`, height: "100%", transition: "border-color 0.3s" }} onMouseEnter={(e) => e.currentTarget.style.borderColor = DS.gold} onMouseLeave={(e) => e.currentTarget.style.borderColor = DS.border}>
              <div style={{ fontFamily: "'DM Sans'", fontSize: 22, color: DS.gold, opacity: 0.6, marginBottom: 12 }}>{d.icon}</div>
              <h3 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 20, fontWeight: 600, color: DS.text, marginBottom: 8 }}>{d.title}</h3>
              <p style={{ fontFamily: "'DM Sans'", fontSize: 13, color: DS.textSec, lineHeight: 1.65 }}>{d.desc}</p>
            </div></FadeIn>)}
          </div>
        </div>
      </div>

      {/* How it works */}
      <div style={{ padding: "80px 32px", maxWidth: 1100, margin: "0 auto" }}>
        <div className="split" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "clamp(32px, 5vw, 72px)", alignItems: "center" }}>
          <FadeIn><div style={{ aspectRatio: "4/5", background: "#1a1e1a", display: "flex", alignItems: "center", justifyContent: "center" }}><span style={{ fontFamily: "'DM Sans'", fontSize: 11, color: DS.textSec, opacity: 0.2, textTransform: "uppercase", letterSpacing: "0.12em" }}>[ Content Creator on Set ]</span></div></FadeIn>
          <FadeIn delay={0.1}><div>
            <div style={{ fontFamily: "'DM Sans'", fontSize: 12, color: DS.gold, textTransform: "uppercase", letterSpacing: "0.2em", marginBottom: 16 }}>How It Works</div>
            <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(26px, 3vw, 36px)", fontWeight: 700, color: DS.text, margin: "0 0 20px" }}>A Dedicated Creator, Not Your Photographer Multitasking</h2>
            <p style={{ fontFamily: "'DM Sans'", fontSize: 15, color: DS.textSec, lineHeight: 1.75, marginBottom: 16 }}>Your content creator works independently from the photo/video team. While they capture the formal moments, your creator is catching the candid, vertical, social-first content that your Instagram followers actually want to see.</p>
            <p style={{ fontFamily: "'DM Sans'", fontSize: 15, color: DS.textSec, lineHeight: 1.75 }}>Same-day Stories delivered before the reception ends. Full content package (15–25 edited videos) within 48 hours. Optimized for Reels, TikTok, and Stories.</p>
          </div></FadeIn>
        </div>
      </div>

      {/* Pricing */}
      <div style={{ background: DS.surface, borderTop: `1px solid ${DS.border}`, borderBottom: `1px solid ${DS.border}`, padding: "80px 32px" }}>
        <div style={{ maxWidth: 600, margin: "0 auto", textAlign: "center" }}>
          <FadeIn>
            <div style={{ fontFamily: "'DM Sans'", fontSize: 11, color: DS.gold, textTransform: "uppercase", letterSpacing: "0.15em", marginBottom: 12 }}>Add to Any Package</div>
            <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 36, fontWeight: 700, color: DS.text, margin: "0 0 8px" }}>Content Creation</h2>
            <div style={{ fontFamily: "'Bebas Neue'", fontSize: 56, color: DS.gold, margin: "8px 0 20px" }}>$900</div>
            <p style={{ fontFamily: "'DM Sans'", fontSize: 14, color: DS.textSec, marginBottom: 8 }}>Dedicated content creator on-site. Same-day Stories. 15–25 edited vertical videos. 48-hour full delivery.</p>
            <p style={{ fontFamily: "'DM Sans'", fontSize: 13, color: DS.textSec, opacity: 0.7, marginBottom: 28 }}>Includes all platforms: Instagram Reels, TikTok, Stories, YouTube Shorts.</p>
            <a href="#" style={{ fontFamily: "'DM Sans'", fontSize: 14, color: DS.bg, background: DS.ember, padding: "16px 40px", textDecoration: "none", textTransform: "uppercase", letterSpacing: "0.1em", fontWeight: 600, display: "inline-block", transition: "background 0.3s" }} onMouseEnter={(e) => e.target.style.background = "#ff6b3d"} onMouseLeave={(e) => e.target.style.background = DS.ember}>Add Content Creation</a>
          </FadeIn>
        </div>
      </div>

      <div style={{ padding: "100px 32px", textAlign: "center", background: `linear-gradient(160deg, #1a1410 0%, #1a1612 50%, ${DS.bg} 100%)` }}>
        <FadeIn><h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(28px, 4vw, 48px)", fontWeight: 700, color: DS.text, margin: "0 0 12px" }}>Your Wedding. Your Content. Your Platform.</h2><p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 20, color: DS.textSec, fontStyle: "italic", marginBottom: 32 }}>Don't let the best day of your life disappear into someone else's hard drive.</p>
          <CheckAvailabilityButton /></FadeIn>
      </div>
      <Footer />
    </div>
  );
}
