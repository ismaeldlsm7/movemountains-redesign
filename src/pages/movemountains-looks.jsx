import { useRef } from "react";
import { motion, useInView, useScroll, useTransform } from "framer-motion";
import { Link } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";

const DS = { bg: "var(--mm-bg)", surface: "var(--mm-surface)", surfaceAlt: "var(--mm-surface-alt)", text: "var(--mm-text)", textSec: "var(--mm-text-sec)", gold: "var(--mm-gold)", ember: "var(--mm-ember)", border: "var(--mm-border)" };
const fontLink = "https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,700;1,400&family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;0,700;1,400;1,500&family=DM+Sans:wght@400;500;600;700&family=Bebas+Neue&display=swap";

function FadeIn({ children, delay = 0, y = 24, style }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  return (
    <motion.div ref={ref} initial={{ opacity: 0, y }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.65, delay, ease: [0.25, 0.1, 0.25, 1] }} style={style}>
      {children}
    </motion.div>
  );
}

const LOOKS = [
  {
    id: "mmc1",
    code: "MMC1",
    number: "01",
    name: "Classic",
    tagline: "Timeless and True",
    description: "A timeless and elegant aesthetic with balanced, true-to-life tones that ensure a refined and enduring quality. Your day, exactly as it was — clean exposure, natural skin tones, and a warmth that won't feel dated in 20 years.",
    characteristics: ["Balanced, true-to-life tones", "Natural skin tones", "Clean white balance", "Soft, refined warmth", "Timeless editing", "Elegant restraint"],
    bestFor: "Traditional venues, garden ceremonies, ballrooms, and couples who value authenticity over heavy aesthetic.",
    palette: ["#2d2622", "#322a24", "#2a231e", "#302820"],
    bg: "#2a2622",
    accent: "#c8a96e",
  },
  {
    id: "mmc2",
    code: "MMC2",
    number: "02",
    name: "Art",
    tagline: "Depth. Emotion. Atmosphere.",
    description: "A moody, warm-toned style that enhances depth and emotion, creating an intimate and cinematic feel. Rich shadows pull the eye toward the subject, and warm midtones give every image a sense of story.",
    characteristics: ["Moody, warm shadows", "Enhanced depth and contrast", "Intimate, cinematic feel", "Rich amber midtones", "Emotional color treatment", "Dramatic light falloff"],
    bestFor: "Candlelit receptions, evening ceremonies, fall/winter weddings, and couples drawn to drama and romance.",
    palette: ["#221c18", "#281e1a", "#201a16", "#261c18"],
    bg: "#221c18",
    accent: "#d4956a",
  },
  {
    id: "mmc3",
    code: "MMC3",
    number: "03",
    name: "Light + Bright",
    tagline: "Airy. Luminous. Film-Like.",
    description: "A light, airy, and film-like aesthetic that embraces soft highlights and a natural glow for a romantic and ethereal look. Lifted shadows, creamy whites, and gentle pastel undertones create the feeling of a sun-drenched memory.",
    characteristics: ["High-key luminosity", "Soft, lifted shadows", "Pastel undertones", "Film-inspired glow", "Airy and spacious", "Romantic and ethereal"],
    bestFor: "Outdoor ceremonies, beach weddings, bright venues, and couples who love a romantic, magazine-ready aesthetic.",
    palette: ["#26231e", "#2c2822", "#242020", "#2a2620"],
    bg: "#26231e",
    accent: "#e8c990",
  },
  {
    id: "mmc4",
    code: "MMC4",
    number: "04",
    name: "Art 2",
    tagline: "Classic Meets Creative",
    description: "The perfect blend of classic and artistic elements, offering a refined yet creative approach with a timeless appeal. Clean enough for formal portraits, expressive enough to feel editorial — a versatile look that works everywhere.",
    characteristics: ["Classic-artistic hybrid", "Refined yet expressive", "Timeless with edge", "Balanced color saturation", "Versatile across lighting", "Editorial quality"],
    bestFor: "Formal venues, estate weddings, and couples who want something polished but not predictable.",
    palette: ["#242020", "#2a2420", "#22201e", "#28221e"],
    bg: "#242020",
    accent: "#c9a070",
  },
  {
    id: "mmc5",
    code: "MMC5",
    number: "05",
    name: "Radiant",
    tagline: "Warmth and Depth in Every Frame",
    description: "A rich and vibrant look with warm, glowing tones — especially suited for fall settings, bringing out depth and warmth in every shot. Golden hour light becomes luminous, foliage becomes vivid, and skin glows.",
    characteristics: ["Warm golden color grading", "Vibrant, glowing tones", "Enhanced depth", "Fall-suited palette", "Rich midtone saturation", "Luminous highlights"],
    bestFor: "Autumn weddings, golden hour ceremonies, outdoor celebrations, and warm-toned venue palettes.",
    palette: ["#2a2018", "#301e14", "#28221a", "#2e1e16"],
    bg: "#2a2018",
    accent: "#e8a450",
  },
  {
    id: "mmc6",
    code: "MMC6",
    number: "06",
    name: "Art 3",
    tagline: "Warm, Expressive, Boundary-Pushing",
    description: "A warm, creative aesthetic that pushes artistic boundaries while maintaining a natural, expressive feel. Color is treated with an editorial eye — not for accuracy, but for feeling. This look makes your photos feel like art.",
    characteristics: ["Warm creative treatment", "Expressive color toning", "Artistic color grading", "Natural yet elevated", "Boundary-pushing palette", "Emotionally resonant"],
    bestFor: "Artistic couples, unique venues, colorful celebrations, and anyone who wants their photos to feel like paintings.",
    palette: ["#281e1c", "#2e2220", "#26201e", "#2c201c"],
    bg: "#281e1c",
    accent: "#cc8a62",
  },
  {
    id: "mmc7",
    code: "MMC7",
    number: "07",
    name: "Art 4",
    tagline: "Editorial. Cinematic. Sleek.",
    description: "A modern, editorial aesthetic with rich tones and a high-fashion, cinematic feel. Sleek, sophisticated, and timeless. Inspired by editorial fashion photography — this look is for couples who want their wedding to feel like a campaign shoot.",
    characteristics: ["High-fashion aesthetic", "Rich, editorial tones", "Modern color grading", "Cinematic depth", "Sleek and sophisticated", "Timeless with edge"],
    bestFor: "Modern venues, fashion-forward couples, minimalist aesthetics, and anyone drawn to editorial photography.",
    palette: ["#1e1e22", "#222228", "#1c1c20", "#202026"],
    bg: "#1e1e22",
    accent: "#a090cc",
  },
];

function LookSection({ look, index }) {
  const isReversed = index % 2 !== 0;
  const sectionRef = useRef(null);
  const inView = useInView(sectionRef, { once: true, margin: "-80px" });

  return (
    <div ref={sectionRef} style={{ padding: "80px 32px" }} id={look.id}>
      <div
        style={{ maxWidth: 1400, margin: "0 auto", display: "grid", gridTemplateColumns: "1fr 1fr", gap: "clamp(32px, 5vw, 80px)", alignItems: "center" }}
        className="look-grid"
      >
        {/* Image side */}
        <div style={{ order: isReversed ? 2 : 1 }}>
          <motion.div
            initial={{ opacity: 0, x: isReversed ? 32 : -32 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.75, ease: [0.25, 0.1, 0.25, 1] }}
          >
            {/* Main sample */}
            <div style={{ aspectRatio: "4/5", background: `linear-gradient(160deg, ${look.bg} 0%, ${look.palette[0]} 100%)`, position: "relative", overflow: "hidden", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <span style={{ fontFamily: "'Bebas Neue'", fontSize: "clamp(80px, 14vw, 160px)", color: look.accent, opacity: 0.06, position: "absolute", userSelect: "none" }}>{look.code}</span>
              <div style={{ textAlign: "center", position: "relative" }}>
                <div style={{ fontFamily: "'DM Sans'", fontSize: 11, color: look.accent, textTransform: "uppercase", letterSpacing: "0.18em", opacity: 0.5, marginBottom: 6 }}>Sample</div>
                <div style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(20px, 3vw, 28px)", color: "rgba(255,255,255,0.15)", fontStyle: "italic" }}>{look.name}</div>
              </div>
              {/* Subtle gradient overlay for depth */}
              <div style={{ position: "absolute", inset: 0, background: `radial-gradient(ellipse at 30% 70%, ${look.accent}12 0%, transparent 60%)` }} />
            </div>

            {/* Sample strip */}
            <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 4, marginTop: 4 }}>
              {look.palette.map((color, i) => (
                <div key={i} style={{ aspectRatio: "3/2", background: color, position: "relative", overflow: "hidden" }}>
                  <div style={{ position: "absolute", inset: 0, background: `linear-gradient(135deg, transparent 50%, rgba(255,255,255,0.03) 100%)` }} />
                </div>
              ))}
            </div>
            <div style={{ display: "flex", justifyContent: "space-between", marginTop: 8 }}>
              <span style={{ fontFamily: "'DM Sans'", fontSize: 10, color: DS.textSec, textTransform: "uppercase", letterSpacing: "0.1em", opacity: 0.5 }}>Color Palette</span>
              <span style={{ fontFamily: "'DM Sans'", fontSize: 10, color: look.accent, textTransform: "uppercase", letterSpacing: "0.1em", opacity: 0.7 }}>{look.code}</span>
            </div>
          </motion.div>
        </div>

        {/* Text side */}
        <div style={{ order: isReversed ? 1 : 2 }}>
          <FadeIn delay={0.1}>
            <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 20 }}>
              <span style={{ fontFamily: "'Bebas Neue'", fontSize: 42, color: look.accent, opacity: 0.25, lineHeight: 1 }}>{look.number}</span>
              <div style={{ height: 1, flex: 1, background: DS.border }} />
              <span style={{ fontFamily: "'DM Sans'", fontSize: 11, color: DS.textSec, letterSpacing: "0.12em", textTransform: "uppercase", opacity: 0.4 }}>{look.code}</span>
            </div>
            <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(32px, 4vw, 48px)", fontWeight: 700, color: DS.text, lineHeight: 1.05, margin: "0 0 6px" }}>{look.name}</h2>
            <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(18px, 2vw, 22px)", color: look.accent, fontStyle: "italic", fontWeight: 500, margin: "0 0 24px" }}>{look.tagline}</p>
          </FadeIn>

          <FadeIn delay={0.15}>
            <p style={{ fontFamily: "'DM Sans'", fontSize: 15, color: DS.textSec, lineHeight: 1.75, marginBottom: 28 }}>{look.description}</p>
          </FadeIn>

          <FadeIn delay={0.2}>
            <div style={{ marginBottom: 28 }}>
              <div style={{ fontFamily: "'DM Sans'", fontSize: 11, color: DS.gold, textTransform: "uppercase", letterSpacing: "0.12em", marginBottom: 12 }}>Characteristics</div>
              {look.characteristics.map((c, i) => (
                <div key={c} style={{ display: "flex", alignItems: "center", gap: 10, padding: "9px 0", borderBottom: i < look.characteristics.length - 1 ? `1px solid ${DS.border}` : "none" }}>
                  <span style={{ width: 5, height: 5, background: look.accent, borderRadius: "50%", flexShrink: 0, opacity: 0.7 }} />
                  <span style={{ fontFamily: "'DM Sans'", fontSize: 14, color: DS.text }}>{c}</span>
                </div>
              ))}
            </div>
          </FadeIn>

          <FadeIn delay={0.25}>
            <div style={{ padding: "16px 20px", background: DS.surfaceAlt, border: `1px solid ${DS.border}` }}>
              <div style={{ fontFamily: "'DM Sans'", fontSize: 10, color: look.accent, textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: 6, opacity: 0.8 }}>Best For</div>
              <p style={{ fontFamily: "'DM Sans'", fontSize: 14, color: DS.textSec, lineHeight: 1.6, margin: 0 }}>{look.bestFor}</p>
            </div>
          </FadeIn>
        </div>
      </div>

      <div style={{ maxWidth: 1400, margin: "60px auto 0" }}>
        <div style={{ height: 1, background: DS.border }} />
      </div>
    </div>
  );
}

export default function LooksPage() {
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const heroY = useTransform(scrollYProgress, [0, 1], [0, 40]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);

  return (
    <div style={{ background: DS.bg, color: DS.text, minHeight: "100vh" }}>
      <style>{`
        @import url('${fontLink}');
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body { background: ${DS.bg}; }
        ::selection { background: var(--mm-gold); color: ${DS.bg}; }
        @media (max-width: 768px) {
          .look-grid { grid-template-columns: 1fr !important; }
          .look-grid > * { order: unset !important; }
          .looks-nav { gap: 8px !important; }
          .looks-nav a { font-size: 11px !important; padding: 6px 12px !important; }
        }
        @media (max-width: 540px) {
          .looks-nav a { font-size: 10px !important; }
        }
      `}</style>
      <Header activePage="Portfolio" />

      {/* Hero */}
      <div ref={heroRef} style={{ paddingTop: 120, paddingBottom: 48, overflow: "hidden" }}>
        <div style={{ maxWidth: 1400, margin: "0 auto", padding: "0 32px" }}>
          <motion.div style={{ y: heroY, opacity: heroOpacity }}>
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3, duration: 0.7, ease: [0.25, 0.1, 0.25, 1] }}>
              <div style={{ fontFamily: "'DM Sans'", fontSize: 12, color: DS.gold, textTransform: "uppercase", letterSpacing: "0.22em", marginBottom: 14 }}>Personalize Your Photos</div>
              <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(44px, 7vw, 80px)", fontWeight: 700, color: DS.text, lineHeight: 1.0, margin: "0 0 16px" }}>
                Choose Your <span style={{ color: DS.gold, fontStyle: "italic" }}>Look</span>
              </h1>
              <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(17px, 2vw, 22px)", color: DS.textSec, fontStyle: "italic", maxWidth: 600, lineHeight: 1.6 }}>
                Seven distinct editing styles. Each one changes how your day is remembered — choose the one that feels like you.
              </p>
            </motion.div>

            {/* Quick nav */}
            <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5, duration: 0.6 }}>
              <div className="looks-nav" style={{ display: "flex", gap: 10, marginTop: 36, flexWrap: "wrap" }}>
                {LOOKS.map((l) => (
                  <a
                    key={l.id}
                    href={`#${l.id}`}
                    style={{ fontFamily: "'DM Sans'", fontSize: 12, color: DS.textSec, textDecoration: "none", padding: "8px 16px", border: `1px solid ${DS.border}`, textTransform: "uppercase", letterSpacing: "0.06em", transition: "all 0.25s", whiteSpace: "nowrap" }}
                    onMouseEnter={(e) => { e.currentTarget.style.borderColor = DS.gold; e.currentTarget.style.color = DS.gold; }}
                    onMouseLeave={(e) => { e.currentTarget.style.borderColor = DS.border; e.currentTarget.style.color = DS.textSec; }}
                  >
                    {l.code}
                  </a>
                ))}
              </div>
            </motion.div>
          </motion.div>

          <div style={{ height: 1, background: DS.border, marginTop: 40 }} />
        </div>
      </div>

      {/* Looks */}
      {LOOKS.map((look, i) => <LookSection key={look.id} look={look} index={i} />)}

      {/* Video Looks Banner */}
      <FadeIn>
        <div style={{ margin: "0 32px 0", maxWidth: 1400, marginLeft: "auto", marginRight: "auto", padding: "0 32px" }}>
          <div style={{ background: DS.surface, border: `1px solid ${DS.border}`, padding: "48px 40px", display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 24 }} className="video-banner">
            <div>
              <div style={{ fontFamily: "'DM Sans'", fontSize: 11, color: DS.gold, textTransform: "uppercase", letterSpacing: "0.18em", marginBottom: 10 }}>Also Available</div>
              <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(22px, 3vw, 32px)", fontWeight: 700, color: DS.text, margin: "0 0 8px" }}>Video Looks</h3>
              <p style={{ fontFamily: "'DM Sans'", fontSize: 14, color: DS.textSec, margin: 0, lineHeight: 1.6 }}>Browse our cinematic color grades for videography — each one pairs with a photo look.</p>
            </div>
            <Link
              to="/video-looks"
              style={{ fontFamily: "'DM Sans'", fontSize: 13, color: DS.text, border: `1px solid ${DS.border}`, padding: "14px 32px", textDecoration: "none", textTransform: "uppercase", letterSpacing: "0.1em", transition: "all 0.25s", whiteSpace: "nowrap", flexShrink: 0 }}
              onMouseEnter={(e) => { e.currentTarget.style.borderColor = DS.gold; e.currentTarget.style.color = DS.gold; }}
              onMouseLeave={(e) => { e.currentTarget.style.borderColor = DS.border; e.currentTarget.style.color = DS.text; }}
            >
              View Video Looks →
            </Link>
          </div>
        </div>
      </FadeIn>

      {/* CTA */}
      <div style={{ padding: "100px 32px", textAlign: "center", background: `linear-gradient(160deg, #1a1410 0%, #1a1612 50%, ${DS.bg} 100%)`, marginTop: 80 }}>
        <FadeIn>
          <div style={{ fontFamily: "'DM Sans'", fontSize: 12, color: DS.gold, textTransform: "uppercase", letterSpacing: "0.2em", marginBottom: 16 }}>Can't Decide?</div>
          <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(30px, 4.5vw, 52px)", fontWeight: 700, color: DS.text, margin: "0 0 16px" }}>We'll Help You Choose</h2>
          <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 20, color: DS.textSec, fontStyle: "italic", marginBottom: 40, maxWidth: 560, margin: "0 auto 40px" }}>
            During your planning session, we'll walk through each look with your actual venue and lighting in mind.
          </p>
          <Link
            to="/contact"
            style={{ fontFamily: "'DM Sans'", fontSize: 14, color: DS.bg, background: DS.ember, padding: "16px 44px", textDecoration: "none", textTransform: "uppercase", letterSpacing: "0.1em", fontWeight: 600, transition: "background 0.25s", display: "inline-block" }}
            onMouseEnter={(e) => e.currentTarget.style.background = "#ff6b3d"}
            onMouseLeave={(e) => e.currentTarget.style.background = DS.ember}
          >
            Book a Consultation
          </Link>
        </FadeIn>
      </div>

      <Footer />
    </div>
  );
}
