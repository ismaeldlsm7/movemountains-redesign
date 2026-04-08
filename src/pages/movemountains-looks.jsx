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

const looks = [
  { id: "classic", name: "Classic", number: "01", tagline: "Timeless and True", description: "Clean, natural, and true to life. Classic is for the couple who wants their photos to look as beautiful in 30 years as they do today. Balanced exposure, natural skin tones, clean whites, and soft warmth. No heavy color grading — just your day, exactly as it was.", characteristics: ["Natural skin tones", "Clean white balance", "Balanced exposure", "Soft warmth without orange", "True-to-life colors", "Timeless editing that won't age"], bestFor: "Traditional venues, garden weddings, couples who value authenticity over aesthetic.", color: "#2a2622", colorAlt: "#342e28", samples: ["#2a2622", "#26221e", "#2e2a24", "#28241e"] },
  { id: "portra", name: "Portra", number: "02", tagline: "Film Without the Film", description: "Inspired by Kodak Portra 400 — the most beloved film stock in photography. Soft pastel tones, gently lifted shadows, and a dreamlike warmth that makes every frame feel like a memory you're looking back on. This is analog romance in a digital world.", characteristics: ["Lifted shadows with film fade", "Soft pastel color palette", "Warm, creamy skin tones", "Gentle grain texture", "Muted greens and blues", "Dreamy, nostalgic quality"], bestFor: "Garden parties, outdoor ceremonies, bohemian aesthetics, couples who love film photography.", color: "#262220", colorAlt: "#302c28", samples: ["#262220", "#24201c", "#2a2622", "#28241e"] },
  { id: "moody", name: "Moody", number: "03", tagline: "Drama in Every Frame", description: "Deep shadows, rich tones, and dramatic contrast. Moody is for weddings with atmosphere — candlelit ballrooms, winter ceremonies, rainy day romance. The editing pulls emotion from every shadow and makes the light feel precious.", characteristics: ["Deep, rich shadows", "High contrast", "Desaturated highlights", "Warm amber accents", "Dramatic light falloff", "Cinematic depth"], bestFor: "Evening receptions, candlelit venues, fall/winter weddings, couples who love drama.", color: "#1a1a1e", colorAlt: "#24242a", samples: ["#1a1a1e", "#18181c", "#1e1e24", "#1c1c20"] },
  { id: "bright", name: "Bright", number: "04", tagline: "Light, Airy, Luminous", description: "High-key, airy, and full of light. Bright is the opposite of moody — it opens everything up, makes whites glow, and gives every image a clean, editorial luminosity. Perfect for couples whose wedding day is all about joy, color, and celebration.", characteristics: ["High-key exposure", "Luminous whites", "Soft, clean colors", "Minimal shadows", "Airy and spacious feel", "Magazine-ready brightness"], bestFor: "Beach weddings, summer celebrations, bright venues, couples who love light and color.", color: "#24221e", colorAlt: "#2e2c26", samples: ["#24221e", "#22201a", "#282620", "#26241c"] },
  { id: "cinematic", name: "Cinematic", number: "05", tagline: "Your Day as a Film", description: "Film-grade color grading borrowed from cinema. Teal-shifted shadows, warm amber highlights, and a depth of color that makes every image feel like a still from a movie. This is for couples who want their wedding to look like it was directed.", characteristics: ["Teal shadow tones", "Amber/gold highlights", "Film-grade color separation", "Rich midtone contrast", "Cinematic color curves", "Movie-like depth and mood"], bestFor: "Dramatic venues, sunset ceremonies, couples who love cinema, editorial-minded pairs.", color: "#1e2024", colorAlt: "#282c30", samples: ["#1e2024", "#1c1e22", "#222428", "#202226"] },
];

function LookSection({ look, index }) {
  const isReversed = index % 2 !== 0;
  const [activeSlider, setActiveSlider] = useState(50);

  return (
    <div style={{ padding: "80px 32px" }} id={look.id}>
      <div style={{ maxWidth: 1400, margin: "0 auto", display: "grid", gridTemplateColumns: "1fr 1fr", gap: "clamp(32px, 5vw, 80px)", alignItems: "center" }} className="look-grid">
        {/* Image side with slider concept */}
        <div style={{ order: isReversed ? 2 : 1 }}>
          <FadeIn delay={0.05}>
            <div style={{ position: "relative" }}>
              {/* Main sample */}
              <div style={{ aspectRatio: "4/5", background: look.color, display: "flex", alignItems: "center", justifyContent: "center", position: "relative", overflow: "hidden" }}>
                <span style={{ fontFamily: "'Bebas Neue'", fontSize: "clamp(80px, 14vw, 160px)", color: DS.gold, opacity: 0.04, position: "absolute" }}>{look.number}</span>
                <span style={{ fontFamily: "'DM Sans'", fontSize: 12, color: DS.textSec, opacity: 0.25, textTransform: "uppercase", letterSpacing: "0.12em", position: "relative" }}>[ {look.name} — Sample ]</span>
              </div>
              {/* Style slider */}
              <div style={{ marginTop: 12, position: "relative", height: 4, background: DS.border, cursor: "pointer" }}
                onClick={(e) => { const rect = e.currentTarget.getBoundingClientRect(); setActiveSlider(((e.clientX - rect.left) / rect.width) * 100); }}>
                <div style={{ width: `${activeSlider}%`, height: "100%", background: DS.gold, transition: "width 0.1s" }} />
                <div style={{ position: "absolute", top: -6, left: `${activeSlider}%`, transform: "translateX(-50%)", width: 16, height: 16, borderRadius: "50%", background: DS.gold, border: `3px solid ${DS.bg}` }} />
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", marginTop: 8 }}>
                <span style={{ fontFamily: "'DM Sans'", fontSize: 10, color: DS.textSec, textTransform: "uppercase", letterSpacing: "0.1em" }}>Before</span>
                <span style={{ fontFamily: "'DM Sans'", fontSize: 10, color: DS.gold, textTransform: "uppercase", letterSpacing: "0.1em" }}>{look.name} Applied</span>
              </div>
              {/* Sample strip */}
              <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 6, marginTop: 16 }}>
                {look.samples.map((s, i) => (
                  <div key={i} style={{ aspectRatio: "1/1", background: s, display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <span style={{ fontFamily: "'DM Sans'", fontSize: 9, color: DS.textSec, opacity: 0.2 }}>{i + 1}</span>
                  </div>
                ))}
              </div>
            </div>
          </FadeIn>
        </div>

        {/* Text side */}
        <div style={{ order: isReversed ? 1 : 2 }}>
          <FadeIn>
            <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 20 }}>
              <span style={{ fontFamily: "'Bebas Neue'", fontSize: 42, color: DS.gold, opacity: 0.3, lineHeight: 1 }}>{look.number}</span>
              <div style={{ height: 1, flex: 1, background: DS.border }} />
            </div>
            <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(32px, 4vw, 48px)", fontWeight: 700, color: DS.text, lineHeight: 1.1, margin: "0 0 6px" }}>{look.name}</h2>
            <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(18px, 2vw, 24px)", color: DS.gold, fontStyle: "italic", fontWeight: 500, margin: "0 0 24px" }}>{look.tagline}</p>
          </FadeIn>
          <FadeIn delay={0.1}>
            <p style={{ fontFamily: "'DM Sans'", fontSize: 15, color: DS.textSec, lineHeight: 1.75, marginBottom: 28 }}>{look.description}</p>
          </FadeIn>
          <FadeIn delay={0.15}>
            <div style={{ marginBottom: 28 }}>
              <div style={{ fontFamily: "'DM Sans'", fontSize: 11, color: DS.gold, textTransform: "uppercase", letterSpacing: "0.12em", marginBottom: 12 }}>Characteristics</div>
              {look.characteristics.map((c, i) => (
                <div key={c} style={{ display: "flex", alignItems: "center", gap: 10, padding: "8px 0", borderBottom: i < look.characteristics.length - 1 ? `1px solid ${DS.border}` : "none" }}>
                  <span style={{ width: 6, height: 6, background: DS.gold, borderRadius: "50%", flexShrink: 0 }} />
                  <span style={{ fontFamily: "'DM Sans'", fontSize: 14, color: DS.text }}>{c}</span>
                </div>
              ))}
            </div>
          </FadeIn>
          <FadeIn delay={0.2}>
            <div style={{ padding: "16px 20px", background: DS.surfaceAlt, border: `1px solid ${DS.border}` }}>
              <div style={{ fontFamily: "'DM Sans'", fontSize: 10, color: DS.gold, textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: 6 }}>Best For</div>
              <p style={{ fontFamily: "'DM Sans'", fontSize: 14, color: DS.textSec, lineHeight: 1.6, margin: 0 }}>{look.bestFor}</p>
            </div>
          </FadeIn>
        </div>
      </div>
      <div style={{ maxWidth: 1400, margin: "40px auto 0" }}><div style={{ height: 1, background: DS.border }} /></div>
    </div>
  );
}

export default function LooksPage() {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => { const fn = () => setScrolled(window.scrollY > 40); window.addEventListener("scroll", fn); return () => window.removeEventListener("scroll", fn); }, []);

  return (
    <div style={{ background: DS.bg, color: DS.text, minHeight: "100vh" }}>
      <style>{`
        @import url('${fontLink}');
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body { background: ${DS.bg}; }
        ::selection { background: ${DS.gold}; color: ${DS.bg}; }
        @media (max-width: 768px) { .nav-links { display: none !important; } .look-grid { grid-template-columns: 1fr !important; } .look-grid > * { order: unset !important; } }
      `}</style>
      <Header activePage="Portfolio" />

      <div style={{ paddingTop: 100, maxWidth: 1400, margin: "0 auto", padding: "100px 32px 0" }}>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.35 }}>
          <div style={{ fontFamily: "'DM Sans'", fontSize: 12, color: DS.gold, textTransform: "uppercase", letterSpacing: "0.2em", marginBottom: 12 }}>Personalize Your Photos</div>
          <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(40px, 6vw, 72px)", fontWeight: 700, color: DS.text, lineHeight: 1.05, margin: "0 0 16px" }}>Choose Your Look</h1>
          <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(17px, 2vw, 22px)", color: DS.textSec, fontStyle: "italic", maxWidth: 600 }}>Five distinct editing styles. Each one changes how your day is remembered — choose the one that feels like you.</p>
        </motion.div>

        {/* Quick nav */}
        <div style={{ display: "flex", gap: 12, marginTop: 32, flexWrap: "wrap" }}>
          {looks.map((l) => (
            <a key={l.id} href={`#${l.id}`} style={{ fontFamily: "'DM Sans'", fontSize: 12, color: DS.textSec, textDecoration: "none", padding: "8px 16px", border: `1px solid ${DS.border}`, textTransform: "uppercase", letterSpacing: "0.06em", transition: "all 0.3s" }}
              onMouseEnter={(e) => { e.target.style.borderColor = DS.gold; e.target.style.color = DS.gold; }}
              onMouseLeave={(e) => { e.target.style.borderColor = DS.border; e.target.style.color = DS.textSec; }}
            >{l.number} {l.name}</a>
          ))}
        </div>
        <div style={{ height: 1, background: DS.border, marginTop: 32 }} />
      </div>

      {looks.map((look, i) => <LookSection key={look.id} look={look} index={i} />)}

      {/* CTA */}
      <div style={{ padding: "100px 32px", textAlign: "center", background: `linear-gradient(160deg, #1a1410 0%, #1a1612 50%, ${DS.bg} 100%)` }}>
        <FadeIn>
          <div style={{ fontFamily: "'DM Sans'", fontSize: 12, color: DS.gold, textTransform: "uppercase", letterSpacing: "0.2em", marginBottom: 16 }}>Can't Decide?</div>
          <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(30px, 4.5vw, 52px)", fontWeight: 700, color: DS.text, margin: "0 0 16px" }}>We'll Help You Choose</h2>
          <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 20, color: DS.textSec, fontStyle: "italic", marginBottom: 36 }}>During your planning session, we'll walk through each look with your actual venue and lighting in mind.</p>
          <a href="#" style={{ fontFamily: "'DM Sans'", fontSize: 14, color: DS.bg, background: DS.ember, padding: "16px 40px", textDecoration: "none", textTransform: "uppercase", letterSpacing: "0.1em", fontWeight: 600, transition: "background 0.3s", display: "inline-block" }}
            onMouseEnter={(e) => e.target.style.background = "#ff6b3d"} onMouseLeave={(e) => e.target.style.background = DS.ember}>Book a Consultation</a>
        </FadeIn>
      </div>

      <Footer />
    </div>
  );
}
