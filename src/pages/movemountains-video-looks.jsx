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

const VIDEO_LOOKS = [
  {
    id: "mmcv1",
    code: "MMCV1",
    number: "01",
    name: "Classic",
    tagline: "Natural. Balanced. Enduring.",
    description: "Faithful to the moment — clean color science, accurate skin tones, and natural contrast. The classic grade lets the beauty of your day speak for itself. No heavy LUT, no color manipulation. Just your wedding, rendered beautifully.",
    characteristics: [
      "Natural color science",
      "Accurate skin tone rendering",
      "Clean, balanced contrast",
      "True-to-life whites and blacks",
      "No heavy LUT treatment",
      "Timeless grade that ages well",
    ],
    bestFor: "Traditional venues, daytime ceremonies, bright outdoor celebrations, and couples who want footage that feels real.",
    pairsWithPhoto: "MMC1 Classic",
    pairsWithPhotoId: "mmc1",
    frames: ["#2d2826", "#2a2622", "#302c28", "#2e2a24"],
    frameLabels: ["Getting Ready", "Ceremony", "First Dance", "Golden Hour"],
    bg: "#2d2826",
    bgAlt: "#342e2a",
    accent: "#c8a96e",
    lutLabel: "Natural Grade",
  },
  {
    id: "mmcv2",
    code: "MMCV2",
    number: "02",
    name: "Art",
    tagline: "Warm. Moody. Cinematic.",
    description: "A warm-toned cinematic grade with lifted blacks, orange-teal color separation, and a film-like depth that makes every frame feel intentional. Rich, emotional, and unmistakably artistic. Inspired by feature film color pipelines.",
    characteristics: [
      "Orange / teal color separation",
      "Lifted blacks with film fade",
      "Warm amber highlight treatment",
      "Deep, rich shadow tones",
      "Cinematic LUT-based grade",
      "Emotionally evocative depth",
    ],
    bestFor: "Evening receptions, candlelit ceremonies, fall and winter weddings, and couples who want their film to feel like a movie.",
    pairsWithPhoto: "MMC2 Art",
    pairsWithPhotoId: "mmc2",
    frames: ["#231c18", "#261e1a", "#201a16", "#281e1c"],
    frameLabels: ["Ceremony", "Reception", "Portraits", "Night Shots"],
    bg: "#231c18",
    bgAlt: "#2c2018",
    accent: "#d4956a",
    lutLabel: "Cinematic Grade",
  },
  {
    id: "mmcv3",
    code: "MMCV3",
    number: "03",
    name: "Art 2",
    tagline: "Creative. Expressive. Editorial.",
    description: "A bolder, more aggressive artistic treatment — heightened color separation, channel-specific grading, and a look that pushes the image into editorial territory. This isn't just color correction. It's a creative statement.",
    characteristics: [
      "Bold channel-specific grading",
      "Heightened selective saturation",
      "High-contrast editorial look",
      "Creative color palette treatment",
      "Fashion-forward aesthetic",
      "Stylized shadow and highlight tones",
    ],
    bestFor: "Modern venues, fashion-forward couples, editorial-minded pairs, and anyone who wants their film to feel bold and distinctive.",
    pairsWithPhoto: "MMC4 Art 2",
    pairsWithPhotoId: "mmc4",
    frames: ["#1e1a1e", "#221e22", "#1c1820", "#20181e"],
    frameLabels: ["First Look", "Ceremony", "Detail Shots", "Reception"],
    bg: "#1e1a1e",
    bgAlt: "#26202a",
    accent: "#b088cc",
    lutLabel: "Editorial Grade",
  },
];

// Simulated film strip with frame placeholders
function FilmStrip({ look }) {
  return (
    <div style={{ position: "relative" }}>
      {/* Main frame — 16:9 */}
      <div
        style={{
          aspectRatio: "16/9",
          background: `linear-gradient(135deg, ${look.bg} 0%, ${look.bgAlt} 100%)`,
          position: "relative",
          overflow: "hidden",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {/* Film grain overlay */}
        <div style={{ position: "absolute", inset: 0, backgroundImage: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.04'/%3E%3C/svg%3E\")", opacity: 0.6 }} />

        {/* Cinematic bars */}
        <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: "10%", background: "rgba(0,0,0,0.45)" }} />
        <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: "10%", background: "rgba(0,0,0,0.45)" }} />

        {/* Radial light bloom */}
        <div style={{ position: "absolute", inset: 0, background: `radial-gradient(ellipse at 35% 55%, ${look.accent}18 0%, transparent 65%)` }} />

        {/* Big code watermark */}
        <span style={{ fontFamily: "'Bebas Neue'", fontSize: "clamp(60px, 12vw, 130px)", color: look.accent, opacity: 0.05, position: "absolute", userSelect: "none", letterSpacing: "0.04em" }}>{look.code}</span>

        {/* Center label */}
        <div style={{ textAlign: "center", position: "relative", zIndex: 1 }}>
          <div style={{ fontFamily: "'DM Sans'", fontSize: 10, color: look.accent, textTransform: "uppercase", letterSpacing: "0.2em", opacity: 0.5, marginBottom: 4 }}>Preview</div>
          <div style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(16px, 2.5vw, 22px)", color: "rgba(255,255,255,0.12)", fontStyle: "italic" }}>{look.name}</div>
        </div>

        {/* LUT badge */}
        <div style={{ position: "absolute", top: "calc(10% + 10px)", right: 12, background: "rgba(0,0,0,0.55)", border: `1px solid ${look.accent}44`, padding: "4px 10px" }}>
          <span style={{ fontFamily: "'DM Sans'", fontSize: 9, color: look.accent, textTransform: "uppercase", letterSpacing: "0.14em", opacity: 0.8 }}>{look.lutLabel}</span>
        </div>

        {/* Timecode strip at bottom */}
        <div style={{ position: "absolute", bottom: "calc(10% + 6px)", left: 12, display: "flex", gap: 8, alignItems: "center" }}>
          <span style={{ fontFamily: "'DM Sans'", fontSize: 9, color: "rgba(255,255,255,0.2)", fontVariantNumeric: "tabular-nums", letterSpacing: "0.08em" }}>00:00:00:00</span>
          <span style={{ width: 1, height: 10, background: "rgba(255,255,255,0.1)" }} />
          <span style={{ fontFamily: "'DM Sans'", fontSize: 9, color: look.accent, opacity: 0.35, textTransform: "uppercase", letterSpacing: "0.08em" }}>{look.code}</span>
        </div>
      </div>

      {/* 4-frame strip */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 3, marginTop: 3 }}>
        {look.frames.map((color, i) => (
          <div key={i} style={{ aspectRatio: "16/9", background: `linear-gradient(135deg, ${color} 0%, ${look.bg} 100%)`, position: "relative", overflow: "hidden", display: "flex", alignItems: "flex-end", justifyContent: "flex-start" }}>
            <div style={{ position: "absolute", inset: 0, background: `radial-gradient(ellipse at 30% 60%, ${look.accent}10 0%, transparent 70%)` }} />
            <div style={{ position: "relative", padding: "0 5px 4px", zIndex: 1 }}>
              <span style={{ fontFamily: "'DM Sans'", fontSize: 8, color: "rgba(255,255,255,0.18)", textTransform: "uppercase", letterSpacing: "0.06em" }}>{look.frameLabels[i]}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Strip label row */}
      <div style={{ display: "flex", justifyContent: "space-between", marginTop: 6, alignItems: "center" }}>
        <span style={{ fontFamily: "'DM Sans'", fontSize: 10, color: DS.textSec, textTransform: "uppercase", letterSpacing: "0.1em", opacity: 0.45 }}>Frame Samples</span>
        <span style={{ fontFamily: "'DM Sans'", fontSize: 10, color: look.accent, textTransform: "uppercase", letterSpacing: "0.1em", opacity: 0.6 }}>{look.code}</span>
      </div>
    </div>
  );
}

function VideoLookSection({ look, index }) {
  const isReversed = index % 2 !== 0;
  const sectionRef = useRef(null);
  const inView = useInView(sectionRef, { once: true, margin: "-80px" });

  return (
    <div ref={sectionRef} style={{ padding: "80px 32px" }} id={look.id}>
      <div
        className="vlook-grid"
        style={{ maxWidth: 1400, margin: "0 auto", display: "grid", gridTemplateColumns: "1.1fr 0.9fr", gap: "clamp(32px, 5vw, 80px)", alignItems: "center" }}
      >
        {/* Video side */}
        <div style={{ order: isReversed ? 2 : 1 }}>
          <motion.div
            initial={{ opacity: 0, x: isReversed ? 32 : -32 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.75, ease: [0.25, 0.1, 0.25, 1] }}
          >
            <FilmStrip look={look} />
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
            <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(30px, 3.8vw, 46px)", fontWeight: 700, color: DS.text, lineHeight: 1.05, margin: "0 0 6px" }}>{look.name}</h2>
            <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(17px, 1.9vw, 22px)", color: look.accent, fontStyle: "italic", fontWeight: 500, margin: "0 0 24px" }}>{look.tagline}</p>
          </FadeIn>

          <FadeIn delay={0.15}>
            <p style={{ fontFamily: "'DM Sans'", fontSize: 15, color: DS.textSec, lineHeight: 1.75, marginBottom: 28 }}>{look.description}</p>
          </FadeIn>

          <FadeIn delay={0.2}>
            <div style={{ marginBottom: 28 }}>
              <div style={{ fontFamily: "'DM Sans'", fontSize: 11, color: DS.gold, textTransform: "uppercase", letterSpacing: "0.12em", marginBottom: 12 }}>Grade Characteristics</div>
              {look.characteristics.map((c, i) => (
                <div key={c} style={{ display: "flex", alignItems: "center", gap: 10, padding: "9px 0", borderBottom: i < look.characteristics.length - 1 ? `1px solid ${DS.border}` : "none" }}>
                  <span style={{ width: 5, height: 5, background: look.accent, borderRadius: "50%", flexShrink: 0, opacity: 0.7 }} />
                  <span style={{ fontFamily: "'DM Sans'", fontSize: 14, color: DS.text }}>{c}</span>
                </div>
              ))}
            </div>
          </FadeIn>

          <FadeIn delay={0.25}>
            <div style={{ padding: "16px 20px", background: DS.surfaceAlt, border: `1px solid ${DS.border}`, marginBottom: 14 }}>
              <div style={{ fontFamily: "'DM Sans'", fontSize: 10, color: look.accent, textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: 6, opacity: 0.8 }}>Best For</div>
              <p style={{ fontFamily: "'DM Sans'", fontSize: 14, color: DS.textSec, lineHeight: 1.6, margin: 0 }}>{look.bestFor}</p>
            </div>

            {/* Pairs with photo look */}
            <Link
              to={`/looks#${look.pairsWithPhotoId}`}
              style={{ display: "flex", alignItems: "center", gap: 10, padding: "12px 16px", border: `1px solid ${DS.border}`, textDecoration: "none", transition: "all 0.25s" }}
              onMouseEnter={(e) => { e.currentTarget.style.borderColor = look.accent + "88"; }}
              onMouseLeave={(e) => { e.currentTarget.style.borderColor = DS.border; }}
            >
              <div style={{ width: 32, height: 32, background: look.frames[0], flexShrink: 0, display: "flex", alignItems: "center", justifyContent: "center" }}>
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none"><rect x="3" y="3" width="7" height="7" stroke={look.accent} strokeWidth="1.5"/><rect x="14" y="3" width="7" height="7" stroke={look.accent} strokeWidth="1.5"/><rect x="3" y="14" width="7" height="7" stroke={look.accent} strokeWidth="1.5"/><rect x="14" y="14" width="7" height="7" stroke={look.accent} strokeWidth="1.5"/></svg>
              </div>
              <div>
                <div style={{ fontFamily: "'DM Sans'", fontSize: 10, color: DS.textSec, textTransform: "uppercase", letterSpacing: "0.08em", opacity: 0.5, lineHeight: 1 }}>Pairs with photo look</div>
                <div style={{ fontFamily: "'DM Sans'", fontSize: 13, color: DS.text, marginTop: 3 }}>{look.pairsWithPhoto}</div>
              </div>
              <span style={{ marginLeft: "auto", fontFamily: "'DM Sans'", fontSize: 12, color: look.accent, opacity: 0.6 }}>→</span>
            </Link>
          </FadeIn>
        </div>
      </div>

      <div style={{ maxWidth: 1400, margin: "60px auto 0" }}>
        <div style={{ height: 1, background: DS.border }} />
      </div>
    </div>
  );
}

export default function VideoLooksPage() {
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
          .vlook-grid { grid-template-columns: 1fr !important; }
          .vlook-grid > * { order: unset !important; }
          .vlooks-nav { gap: 8px !important; }
          .vlooks-nav a { font-size: 11px !important; padding: 6px 12px !important; }
        }
      `}</style>
      <Header activePage="Portfolio" />

      {/* Hero */}
      <div ref={heroRef} style={{ paddingTop: 120, paddingBottom: 48, overflow: "hidden" }}>
        <div style={{ maxWidth: 1400, margin: "0 auto", padding: "0 32px" }}>
          <motion.div style={{ y: heroY, opacity: heroOpacity }}>
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3, duration: 0.7, ease: [0.25, 0.1, 0.25, 1] }}>
              <div style={{ fontFamily: "'DM Sans'", fontSize: 12, color: DS.gold, textTransform: "uppercase", letterSpacing: "0.22em", marginBottom: 14 }}>Personalize Your Film</div>
              <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(44px, 7vw, 80px)", fontWeight: 700, color: DS.text, lineHeight: 1.0, margin: "0 0 16px" }}>
                Choose Your <span style={{ color: DS.gold, fontStyle: "italic" }}>Video Look</span>
              </h1>
              <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(17px, 2vw, 22px)", color: DS.textSec, fontStyle: "italic", maxWidth: 620, lineHeight: 1.6 }}>
                Three cinematic color grades for your wedding film — each one shapes the mood, tone, and feeling of how your story is told.
              </p>
            </motion.div>

            {/* Quick nav */}
            <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5, duration: 0.6 }}>
              <div className="vlooks-nav" style={{ display: "flex", gap: 10, marginTop: 36, flexWrap: "wrap", alignItems: "center" }}>
                {VIDEO_LOOKS.map((l) => (
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
                <span style={{ width: 1, height: 20, background: DS.border, margin: "0 4px" }} />
                <Link
                  to="/looks"
                  style={{ fontFamily: "'DM Sans'", fontSize: 12, color: DS.textSec, textDecoration: "none", padding: "8px 16px", border: `1px solid ${DS.border}`, textTransform: "uppercase", letterSpacing: "0.06em", transition: "all 0.25s", whiteSpace: "nowrap", display: "flex", alignItems: "center", gap: 6 }}
                  onMouseEnter={(e) => { e.currentTarget.style.borderColor = DS.gold; e.currentTarget.style.color = DS.gold; }}
                  onMouseLeave={(e) => { e.currentTarget.style.borderColor = DS.border; e.currentTarget.style.color = DS.textSec; }}
                >
                  <svg width="11" height="11" viewBox="0 0 24 24" fill="none"><rect x="3" y="3" width="7" height="7" stroke="currentColor" strokeWidth="1.8"/><rect x="14" y="3" width="7" height="7" stroke="currentColor" strokeWidth="1.8"/><rect x="3" y="14" width="7" height="7" stroke="currentColor" strokeWidth="1.8"/><rect x="14" y="14" width="7" height="7" stroke="currentColor" strokeWidth="1.8"/></svg>
                  Photo Looks
                </Link>
              </div>
            </motion.div>
          </motion.div>

          <div style={{ height: 1, background: DS.border, marginTop: 40 }} />
        </div>
      </div>

      {/* Video Looks */}
      {VIDEO_LOOKS.map((look, i) => (
        <VideoLookSection key={look.id} look={look} index={i} />
      ))}

      {/* How it works */}
      <FadeIn>
        <div style={{ padding: "0 32px 80px" }}>
          <div style={{ maxWidth: 1400, margin: "0 auto" }}>
            <div style={{ background: DS.surface, border: `1px solid ${DS.border}`, padding: "56px 48px" }} className="how-it-works">
              <div style={{ maxWidth: 720 }}>
                <div style={{ fontFamily: "'DM Sans'", fontSize: 11, color: DS.gold, textTransform: "uppercase", letterSpacing: "0.18em", marginBottom: 16 }}>How It Works</div>
                <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(24px, 3vw, 34px)", fontWeight: 700, color: DS.text, margin: "0 0 20px", lineHeight: 1.2 }}>
                  Your Look is Applied in Post
                </h3>
                <p style={{ fontFamily: "'DM Sans'", fontSize: 15, color: DS.textSec, lineHeight: 1.75, marginBottom: 0 }}>
                  After your wedding day, your footage goes through our full color grading pipeline. We apply your chosen video look as the foundation, then make scene-by-scene adjustments to ensure every clip looks its best — indoors, outdoors, golden hour, and low light. You'll see the results in your full film delivery.
                </p>
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 24, marginTop: 40 }} className="steps-grid">
                {[
                  { n: "01", t: "You Choose", d: "Select your video look during the planning session — or trust us to pick the best match for your venue." },
                  { n: "02", t: "We Grade", d: "Your full footage is color graded using your chosen look, with manual adjustments scene by scene." },
                  { n: "03", t: "You Receive", d: "A cinematic, color-graded wedding film delivered via private gallery — yours to keep and share forever." },
                ].map((step) => (
                  <div key={step.n} style={{ borderTop: `1px solid ${DS.border}`, paddingTop: 20 }}>
                    <div style={{ fontFamily: "'Bebas Neue'", fontSize: 32, color: DS.gold, opacity: 0.2, lineHeight: 1, marginBottom: 8 }}>{step.n}</div>
                    <div style={{ fontFamily: "'DM Sans'", fontSize: 14, color: DS.text, fontWeight: 600, marginBottom: 8 }}>{step.t}</div>
                    <p style={{ fontFamily: "'DM Sans'", fontSize: 13, color: DS.textSec, lineHeight: 1.65, margin: 0 }}>{step.d}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </FadeIn>

      {/* Photo looks banner */}
      <FadeIn>
        <div style={{ padding: "0 32px 80px" }}>
          <div style={{ maxWidth: 1400, margin: "0 auto", background: DS.surfaceAlt, border: `1px solid ${DS.border}`, padding: "40px 40px", display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 24 }}>
            <div>
              <div style={{ fontFamily: "'DM Sans'", fontSize: 11, color: DS.gold, textTransform: "uppercase", letterSpacing: "0.18em", marginBottom: 10 }}>Also Browse</div>
              <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(20px, 2.8vw, 30px)", fontWeight: 700, color: DS.text, margin: "0 0 8px" }}>Photo Looks</h3>
              <p style={{ fontFamily: "'DM Sans'", fontSize: 14, color: DS.textSec, margin: 0, lineHeight: 1.6 }}>Seven editing styles for your wedding photos — each one pairs with a video look above.</p>
            </div>
            <Link
              to="/looks"
              style={{ fontFamily: "'DM Sans'", fontSize: 13, color: DS.text, border: `1px solid ${DS.border}`, padding: "14px 32px", textDecoration: "none", textTransform: "uppercase", letterSpacing: "0.1em", transition: "all 0.25s", whiteSpace: "nowrap", flexShrink: 0 }}
              onMouseEnter={(e) => { e.currentTarget.style.borderColor = DS.gold; e.currentTarget.style.color = DS.gold; }}
              onMouseLeave={(e) => { e.currentTarget.style.borderColor = DS.border; e.currentTarget.style.color = DS.text; }}
            >
              View Photo Looks →
            </Link>
          </div>
        </div>
      </FadeIn>

      {/* CTA */}
      <div style={{ padding: "100px 32px", textAlign: "center", background: `linear-gradient(160deg, #14121a 0%, #161418 50%, ${DS.bg} 100%)` }}>
        <FadeIn>
          <div style={{ fontFamily: "'DM Sans'", fontSize: 12, color: DS.gold, textTransform: "uppercase", letterSpacing: "0.2em", marginBottom: 16 }}>Not Sure Which to Pick?</div>
          <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(30px, 4.5vw, 52px)", fontWeight: 700, color: DS.text, margin: "0 0 16px" }}>Let's Talk About Your Film</h2>
          <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 20, color: DS.textSec, fontStyle: "italic", maxWidth: 520, margin: "0 auto 40px", lineHeight: 1.6 }}>
            During your planning call, we'll walk through each grade and help you find the one that matches your venue, lighting, and vision.
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
