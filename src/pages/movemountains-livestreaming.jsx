import { useState, useEffect, useRef } from "react";
import { motion, useInView, useScroll, useTransform } from "framer-motion";
import Header from "../components/Header";
import Footer from "../components/Footer";
import CheckAvailabilityButton from "../components/CheckAvailabilityButton";

const DS = { bg: "var(--mm-bg)", surface: "var(--mm-surface)", surfaceAlt: "var(--mm-surface-alt)", text: "var(--mm-text)", textSec: "var(--mm-text-sec)", gold: "var(--mm-gold)", ember: "var(--mm-ember)", border: "var(--mm-border)" };
const fontLink = "https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,700;1,400&family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;0,700;1,400;1,500&family=DM+Sans:wght@400;500;600;700&family=Bebas+Neue&display=swap";
function FadeIn({ children, delay = 0, y = 24 }) { const ref = useRef(null); const inView = useInView(ref, { once: true, margin: "-40px" }); return <motion.div ref={ref} initial={{ opacity: 0, y }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.65, delay, ease: [0.25, 0.1, 0.25, 1] }}>{children}</motion.div>; }

const features = [
  { icon: "◎", title: "Professional HD Quality", desc: "Not a phone propped up on a chair. Professional cameras, professional angles, professional broadcast quality." },
  { icon: "◇", title: "Private Secure Link", desc: "A custom, password-protected link shared only with your approved guest list. No public access, no uninvited viewers." },
  { icon: "▣", title: "Multi-Camera Available", desc: "Single-camera default captures the full ceremony. Multi-camera upgrade adds close-ups, wide shots, and reaction angles." },
  { icon: "△", title: "No App Required", desc: "Your guests click the link and watch — from any device, any browser, anywhere in the world. Zero downloads, zero friction." },
  { icon: "○", title: "Reliable Connection", desc: "We bring our own internet backup equipment. Venue WiFi is never the sole connection. Your stream doesn't drop." },
  { icon: "□", title: "Recording Available", desc: "Can't watch live? The recording is available for 30 days after the event for on-demand viewing." },
];

const useCases = [
  { who: "Elderly grandparents", why: "Who can't travel but shouldn't miss the vows they've been waiting to hear." },
  { who: "International family", why: "Watching from another continent, another timezone, another world — but still part of the moment." },
  { who: "Friends who couldn't make it", why: "The ones who RSVPed no with tears in their eyes. Now they don't have to miss everything." },
  { who: "The couple themselves", why: "Because you're standing at the altar. You can't see what your guests see. Now you can — later." },
];

export default function LiveStreamingPage() {
  const [scrolled, setScrolled] = useState(false);
  const heroRef = useRef(null); const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const heroScale = useTransform(scrollYProgress, [0, 1], [1.05, 1.15]); const heroOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);
  useEffect(() => { const fn = () => setScrolled(window.scrollY > 60); window.addEventListener("scroll", fn); return () => window.removeEventListener("scroll", fn); }, []);

  return (
    <div style={{ background: DS.bg, color: DS.text, minHeight: "100vh" }}>
      <style>{`@import url('${fontLink}'); * { margin: 0; padding: 0; box-sizing: border-box; } body { background: ${DS.bg}; } ::selection { background: ${DS.gold}; color: ${DS.bg}; } @media (max-width: 768px) { .nav-links { display: none !important; } .split { grid-template-columns: 1fr !important; } .split > * { order: unset !important; } .feat-grid { grid-template-columns: 1fr !important; } }`}</style>
      <Header activePage="Services" />

      <div ref={heroRef} style={{ height: "65vh", minHeight: 440, maxHeight: 700, position: "relative", overflow: "hidden" }}>
        <motion.div style={{ scale: heroScale, position: "absolute", inset: 0 }}><div style={{ width: "100%", height: "100%", background: "linear-gradient(160deg, var(--mm-surface-alt) 0%, var(--mm-surface) 50%, var(--mm-bg) 100%)", display: "flex", alignItems: "center", justifyContent: "center" }}><span style={{ fontFamily: "'DM Sans'", fontSize: 13, color: DS.textSec, opacity: 0.25, textTransform: "uppercase", letterSpacing: "0.2em" }}>[ Live Stream — Ceremony Broadcast ]</span></div></motion.div>
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to bottom, rgba(15,15,15,0.2) 0%, rgba(15,15,15,0.1) 40%, rgba(15,15,15,0.8) 82%, var(--mm-bg) 100%)" }} />
        <motion.div style={{ opacity: heroOpacity, position: "absolute", bottom: "10%", left: 0, right: 0, padding: "0 32px" }}><div style={{ maxWidth: 800, margin: "0 auto" }}><motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}>
          <div style={{ fontFamily: "'DM Sans'", fontSize: 12, color: DS.gold, textTransform: "uppercase", letterSpacing: "0.25em", marginBottom: 16 }}>Move Mountains Co.</div>
          <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(44px, 7vw, 80px)", fontWeight: 700, color: DS.text, lineHeight: 1, margin: "0 0 12px" }}>Live <span style={{ color: DS.gold }}>Streaming</span></h1>
          <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(18px, 2.2vw, 24px)", color: DS.textSec, fontStyle: "italic" }}>Because They Deserve to See It.</p>
        </motion.div></div></motion.div>
      </div>

      {/* Live indicator mock */}
      <div style={{ padding: "48px 32px" }}><div style={{ maxWidth: 800, margin: "0 auto" }}>
        <FadeIn><div style={{ aspectRatio: "16/9", background: "#18181c", display: "flex", alignItems: "center", justifyContent: "center", position: "relative" }}>
          <div style={{ position: "absolute", top: 16, left: 16, display: "flex", alignItems: "center", gap: 8 }}>
            <div style={{ width: 10, height: 10, borderRadius: "50%", background: "#e8572a", animation: "pulse 2s infinite" }} />
            <span style={{ fontFamily: "'DM Sans'", fontSize: 12, color: DS.text, fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.1em" }}>LIVE</span>
          </div>
          <div style={{ position: "absolute", top: 16, right: 16, fontFamily: "'DM Sans'", fontSize: 12, color: DS.textSec }}>47 watching</div>
          <span style={{ fontFamily: "'DM Sans'", fontSize: 12, color: DS.textSec, opacity: 0.25, textTransform: "uppercase", letterSpacing: "0.12em" }}>[ Live Stream Preview ]</span>
          <div style={{ position: "absolute", bottom: 16, left: 16, fontFamily: "'DM Sans'", fontSize: 12, color: DS.textSec, opacity: 0.6 }}>Carey & Luke's Wedding — Ceremony</div>
        </div></FadeIn>
        <style>{`@keyframes pulse { 0%, 100% { opacity: 1; } 50% { opacity: 0.4; } }`}</style>
      </div></div>

      {/* Intro */}
      <div style={{ maxWidth: 700, margin: "0 auto", padding: "32px 32px 64px", textAlign: "center" }}>
        <FadeIn>
          <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(28px, 3.5vw, 42px)", fontWeight: 700, color: DS.text, margin: "0 0 20px" }}>Not Everyone Can Be There. Now They Don't Have to Miss It.</h2>
          <p style={{ fontFamily: "'DM Sans'", fontSize: 16, color: DS.textSec, lineHeight: 1.75 }}>Not everyone can make it to your wedding. Live streaming lets the people who matter most watch your ceremony in real time — professional quality, reliable connection, private link. Simple to set up, meaningful for the people on the other end.</p>
        </FadeIn>
      </div>

      {/* Who it's for */}
      <div style={{ borderTop: `1px solid ${DS.border}`, borderBottom: `1px solid ${DS.border}`, padding: "64px 32px" }}>
        <div style={{ maxWidth: 900, margin: "0 auto" }}>
          <FadeIn><div style={{ fontFamily: "'DM Sans'", fontSize: 12, color: DS.gold, textTransform: "uppercase", letterSpacing: "0.2em", marginBottom: 24 }}>Who It's For</div></FadeIn>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 16 }}>
            {useCases.map((u, i) => <FadeIn key={u.who} delay={i * 0.06}><div style={{ padding: "24px", border: `1px solid ${DS.border}`, height: "100%" }}>
              <h3 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 20, fontWeight: 600, color: DS.text, marginBottom: 8 }}>{u.who}</h3>
              <p style={{ fontFamily: "'DM Sans'", fontSize: 13, color: DS.textSec, lineHeight: 1.6 }}>{u.why}</p>
            </div></FadeIn>)}
          </div>
        </div>
      </div>

      {/* Features */}
      <div style={{ padding: "80px 32px", maxWidth: 1100, margin: "0 auto" }}>
        <FadeIn><div style={{ marginBottom: 40 }}><div style={{ fontFamily: "'DM Sans'", fontSize: 12, color: DS.gold, textTransform: "uppercase", letterSpacing: "0.2em", marginBottom: 12 }}>The Experience</div><h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(28px, 3.5vw, 42px)", fontWeight: 700, color: DS.text, margin: 0 }}>How It Works</h2></div></FadeIn>
        <div className="feat-grid" style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 20 }}>
          {features.map((f, i) => <FadeIn key={f.title} delay={i * 0.06}><div style={{ padding: "24px", border: `1px solid ${DS.border}`, height: "100%", transition: "border-color 0.3s" }} onMouseEnter={(e) => e.currentTarget.style.borderColor = DS.gold} onMouseLeave={(e) => e.currentTarget.style.borderColor = DS.border}>
            <div style={{ fontFamily: "'DM Sans'", fontSize: 22, color: DS.gold, opacity: 0.6, marginBottom: 12 }}>{f.icon}</div>
            <h3 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 20, fontWeight: 600, color: DS.text, marginBottom: 8 }}>{f.title}</h3>
            <p style={{ fontFamily: "'DM Sans'", fontSize: 13, color: DS.textSec, lineHeight: 1.65 }}>{f.desc}</p>
          </div></FadeIn>)}
        </div>
      </div>

      {/* Pricing */}
      <div style={{ background: DS.surface, borderTop: `1px solid ${DS.border}`, borderBottom: `1px solid ${DS.border}`, padding: "80px 32px" }}>
        <div style={{ maxWidth: 700, margin: "0 auto" }}>
          <FadeIn><div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }} className="split">
            <div style={{ padding: "32px 28px", border: `1px solid ${DS.border}`, textAlign: "center" }}>
              <div style={{ fontFamily: "'DM Sans'", fontSize: 11, color: DS.gold, textTransform: "uppercase", letterSpacing: "0.12em", marginBottom: 8 }}>Single Camera</div>
              <div style={{ fontFamily: "'Bebas Neue'", fontSize: 48, color: DS.gold, margin: "8px 0 12px" }}>$600</div>
              <p style={{ fontFamily: "'DM Sans'", fontSize: 13, color: DS.textSec, lineHeight: 1.6 }}>One professional camera angle. Full ceremony broadcast. Private link. Recording included.</p>
            </div>
            <div style={{ padding: "32px 28px", border: `1px solid ${DS.gold}`, background: DS.surfaceAlt, textAlign: "center" }}>
              <div style={{ fontFamily: "'DM Sans'", fontSize: 11, color: DS.gold, textTransform: "uppercase", letterSpacing: "0.12em", marginBottom: 8 }}>Multi-Camera</div>
              <div style={{ fontFamily: "'Bebas Neue'", fontSize: 48, color: DS.gold, margin: "8px 0 12px" }}>$950</div>
              <p style={{ fontFamily: "'DM Sans'", fontSize: 13, color: DS.textSec, lineHeight: 1.6 }}>Two camera angles with live switching. Close-ups + wide shot. Private link. Recording included.</p>
            </div>
          </div></FadeIn>
          <FadeIn delay={0.1}><div style={{ textAlign: "center", marginTop: 28 }}>
            <a href="#" style={{ fontFamily: "'DM Sans'", fontSize: 14, color: DS.bg, background: DS.ember, padding: "16px 40px", textDecoration: "none", textTransform: "uppercase", letterSpacing: "0.1em", fontWeight: 600, display: "inline-block", transition: "background 0.3s" }} onMouseEnter={(e) => e.target.style.background = "#ff6b3d"} onMouseLeave={(e) => e.target.style.background = DS.ember}>Add Live Streaming</a>
          </div></FadeIn>
        </div>
      </div>

      <div style={{ padding: "100px 32px", textAlign: "center", background: `linear-gradient(160deg, var(--mm-surface) 0%, var(--mm-surface-alt) 50%, ${DS.bg} 100%)` }}>
        <FadeIn><h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(28px, 4vw, 48px)", fontWeight: 700, color: DS.text, margin: "0 0 12px" }}>Every Seat Is the Best Seat</h2><p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 20, color: DS.textSec, fontStyle: "italic", marginBottom: 32 }}>Whether they're in the front row or on another continent.</p>
          <CheckAvailabilityButton /></FadeIn>
      </div>
      <Footer />
    </div>
  );
}
