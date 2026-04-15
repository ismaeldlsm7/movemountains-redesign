import { useState, useEffect, useRef } from "react";
import { motion, useInView, useScroll, useTransform, AnimatePresence } from "framer-motion";
import Header from "../components/Header";
import Footer from "../components/Footer";
import CheckAvailabilityButton from "../components/CheckAvailabilityButton";
import FeaturedWork from "../components/FeaturedWork";
import { Link } from "react-router-dom";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import scrollArrow from "../assets/lotties/scroll-arrow.json";

// ─── Design System (Phase 2) ───────────────────────────────────────
const DS = {
  colors: {
    bg: "var(--mm-bg)",
    surface: "var(--mm-surface)",
    surfaceAlt: "var(--mm-surface-alt)",
    text: "var(--mm-text)",
    textSec: "var(--mm-text-sec)",
    gold: "var(--mm-gold)",
    goldHover: "var(--mm-gold-hover)",
    ember: "var(--mm-ember)",
    border: "var(--mm-border)",
  },
};

// ─── Fonts ──────────────────────────────────────────────────────────
const fontLink = "https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;700&family=Cormorant+Garamond:wght@400;500;600;700&family=DM+Sans:wght@400;500;600;700&family=Bebas+Neue&display=swap";

// ─── Reusable Components ────────────────────────────────────────────

function FadeIn({ children, delay = 0, y = 30, className = "", style }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay, ease: [0.25, 0.1, 0.25, 1] }}
      className={className}
      style={style}
    >
      {children}
    </motion.div>
  );
}

function StatCounter({ value, label, suffix = "", delay = 0 }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!inView) return;
    let start = 0;
    const end = parseInt(value);
    const duration = 1800;
    const step = (end / duration) * 16;
    const timer = setInterval(() => {
      start += step;
      if (start >= end) { setCount(end); clearInterval(timer); }
      else setCount(Math.floor(start));
    }, 16);
    return () => clearInterval(timer);
  }, [inView, value]);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay }}
      style={{ textAlign: "center" }}
    >
      <div style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "clamp(48px, 8vw, 80px)", color: DS.colors.gold, lineHeight: 1 }}>
        {count}{suffix}
      </div>
      <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(14px, 1.5vw, 18px)", color: DS.colors.textSec, letterSpacing: "0.12em", textTransform: "uppercase", marginTop: 8 }}>
        {label}
      </div>
    </motion.div>
  );
}

// ─── Hero ───────────────────────────────────────────────────────────

function Hero() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const imgScale = useTransform(scrollYProgress, [0, 1], [1.05, 1.15]);
  const textY = useTransform(scrollYProgress, [0, 1], [0, 60]);
  const opacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);

  return (
    <div ref={ref} style={{ height: "70vh", minHeight: 500, maxHeight: 800, position: "relative", overflow: "hidden" }}>
      {/* Background image placeholder */}
      <motion.div style={{ scale: imgScale, position: "absolute", inset: 0 }}>
        <div style={{
          width: "100%", height: "100%",
          background: `linear-gradient(135deg, var(--mm-surface) 0%, var(--mm-surface-alt) 30%, var(--mm-surface) 70%, var(--mm-bg) 100%)`,
          display: "flex", alignItems: "center", justifyContent: "center",
        }}>
          <div style={{ color: DS.colors.textSec, fontFamily: "'DM Sans'", fontSize: 14, opacity: 0.4, textTransform: "uppercase", letterSpacing: "0.2em" }}>
            [ Hero Image — Golden Hour Cinematic Shot ]
          </div>
        </div>
      </motion.div>

      {/* Gradient overlay */}
      <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to bottom, rgba(15,15,15,0.3) 0%, rgba(15,15,15,0.1) 40%, rgba(15,15,15,0.7) 80%, rgba(15,15,15,1) 100%)" }} />

      {/* Content */}
      <motion.div style={{ y: textY, opacity, position: "absolute", bottom: "12%", left: 0, right: 0, textAlign: "center", padding: "0 24px" }}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
        >
          <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(42px, 7vw, 88px)", fontWeight: 700, color: "#F5F0E8", lineHeight: 1, margin: 0, letterSpacing: "-0.02em" }}>
            Making Moments
          </h1>
          <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(42px, 7vw, 88px)", fontWeight: 700, color: DS.colors.gold, lineHeight: 1, margin: 0, letterSpacing: "-0.02em" }}>
            Since Day One
          </h1>
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 1 }}
          style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(16px, 2vw, 22px)", color: DS.colors.textSec, marginTop: 20, fontWeight: 400, fontStyle: "italic" }}
        >
          Luxury Wedding Photography & Videography — Providence, Rhode Island
        </motion.p>
      </motion.div>

      {/* Scroll indicator */}
      <div style={{ position: "absolute", bottom: 16, left: "50%", transform: "translateX(-50%)", width: 60, height: 60 }}>
        <DotLottieReact data={scrollArrow} loop autoplay />
      </div>
    </div>
  );
}

// ─── Services Strip ─────────────────────────────────────────────────

function ServicesStrip() {
  const services = [
    { icon: "◎", name: "Photography", desc: "Bold, candid, yours. Every laugh, every look, every detail." },
    { icon: "▶", name: "Videography", desc: "Cinematic wedding films that make you relive it every time." },
    { icon: "◉", name: "Super 8", desc: "Analog film for the couple who wants something no one else has." },
    { icon: "✦", name: "Content", desc: "Behind-the-scenes content your social media is waiting for." },
    { icon: "□", name: "Luxe Booth", desc: "Not your average photo booth. High-end prints, zero cheesy props." },
    { icon: "◈", name: "Streaming", desc: "Because the people who can't be there still deserve to see it." },
  ];

  return (
    <div style={{ background: DS.colors.surface, padding: "60px 0", borderTop: `1px solid ${DS.colors.border}`, borderBottom: `1px solid ${DS.colors.border}` }}>
      <div style={{ maxWidth: 1400, margin: "0 auto", padding: "0 32px" }}>
        <FadeIn>
          <div style={{ fontFamily: "'DM Sans'", fontSize: 12, color: DS.colors.gold, textTransform: "uppercase", letterSpacing: "0.2em", marginBottom: 32 }}>
            What We Bring to Your Day
          </div>
        </FadeIn>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 24 }}>
          {services.map((s, i) => (
            <FadeIn key={s.name} delay={i * 0.08}>
              <div style={{
                padding: 24, border: `1px solid ${DS.colors.border}`, transition: "all 0.3s", cursor: "pointer",
              }}
                onMouseEnter={(e) => { e.currentTarget.style.borderColor = DS.colors.gold; e.currentTarget.style.background = DS.colors.surfaceAlt; }}
                onMouseLeave={(e) => { e.currentTarget.style.borderColor = DS.colors.border; e.currentTarget.style.background = "transparent"; }}
              >
                <div style={{ fontFamily: "'DM Sans'", fontSize: 24, color: DS.colors.gold, marginBottom: 12 }}>{s.icon}</div>
                <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 22, fontWeight: 600, color: DS.colors.text, marginBottom: 8 }}>{s.name}</div>
                <div style={{ fontFamily: "'DM Sans'", fontSize: 14, color: DS.colors.textSec, lineHeight: 1.5 }}>{s.desc}</div>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </div>
  );
}

// ─── Featured Work moved to ../components/FeaturedWork ─────────────

// ─── Brand Statement ────────────────────────────────────────────────

function BrandStatement() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  const text = "We commit to one wedding per day because yours deserves our full attention. One team. One couple. One unforgettable day.";
  const words = text.split(" ");

  return (
    <div ref={ref} style={{ padding: "100px 32px", maxWidth: 900, margin: "0 auto", textAlign: "center" }}>
      <div style={{ fontFamily: "'DM Sans'", fontSize: 12, color: DS.colors.gold, textTransform: "uppercase", letterSpacing: "0.2em", marginBottom: 32 }}>Our Promise</div>
      <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(24px, 3.5vw, 40px)", fontWeight: 400, color: DS.colors.text, lineHeight: 1.4, margin: 0 }}>
        {words.map((word, i) => (
          <motion.span
            key={i}
            initial={{ opacity: 0.15 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ duration: 0.5, delay: i * 0.04 }}
            style={{ display: "inline-block", marginRight: "0.3em" }}
          >
            {word}
          </motion.span>
        ))}
      </p>
    </div>
  );
}

// ─── Testimonials ───────────────────────────────────────────────────

function Testimonials() {
  const reviews = [
    { text: "Choosing Move Mountains was one of the best vendor decisions we made for our wedding.", couple: "Howard & Shreya" },
    { text: "Nothing about Move Mountains Co. is cookie cutter or common. I can't say enough good things.", couple: "Joel & Corey" },
    { text: "They were a DREAM! Throughout the entire planning process, they were extremely responsive.", couple: "Recent Couple" },
    { text: "Such a modern, fresh perspective on what wedding video and photography should be.", couple: "Yojan & Bel" },
    { text: "We've been married nearly a year and continue to watch our video regularly. It's absolutely perfect.", couple: "Recent Couple" },
    { text: "Tiahna made the day go so smoothly she was seriously the MVP.", couple: "Recent Couple" },
  ];

  const doubled = [...reviews, ...reviews];

  return (
    <div style={{ padding: "80px 0", overflow: "hidden", borderTop: `1px solid ${DS.colors.border}`, borderBottom: `1px solid ${DS.colors.border}` }}>
      <FadeIn>
        <div style={{ textAlign: "center", marginBottom: 40 }}>
          <div style={{ fontFamily: "'DM Sans'", fontSize: 12, color: DS.colors.gold, textTransform: "uppercase", letterSpacing: "0.2em" }}>What Couples Say</div>
        </div>
      </FadeIn>

      <div style={{ display: "flex", gap: 32, animation: "marquee 40s linear infinite", width: "max-content" }}>
        {doubled.map((r, i) => (
          <div key={i} style={{
            minWidth: 380, maxWidth: 380, padding: 32, border: `1px solid ${DS.colors.border}`,
            background: DS.colors.surface, flexShrink: 0,
          }}>
            <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 18, color: DS.colors.text, lineHeight: 1.5, fontStyle: "italic", marginBottom: 16 }}>
              "{r.text}"
            </div>
            <div style={{ fontFamily: "'DM Sans'", fontSize: 13, color: DS.colors.gold, textTransform: "uppercase", letterSpacing: "0.1em" }}>
              — {r.couple}
            </div>
          </div>
        ))}
      </div>

      <FadeIn>
        <div style={{ textAlign: "center", marginTop: 48 }}>
          <Link to="/testimonials" style={{
            fontFamily: "'DM Sans'", fontSize: 14, color: DS.colors.gold,
            padding: "16px 40px", textDecoration: "none", textTransform: "uppercase", letterSpacing: "0.1em",
            fontWeight: 600, border: `1px solid ${DS.colors.gold}`, transition: "all 0.3s",
            display: "inline-block",
          }}
            onMouseEnter={(e) => { e.target.style.background = DS.colors.gold; e.target.style.color = DS.colors.bg; }}
            onMouseLeave={(e) => { e.target.style.background = "transparent"; e.target.style.color = DS.colors.gold; }}
          >Read All Testimonials</Link>
        </div>
      </FadeIn>
    </div>
  );
}

// ─── Stats ──────────────────────────────────────────────────────────

function Stats() {
  return (
    <div style={{ padding: "80px 32px", maxWidth: 1000, margin: "0 auto" }}>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))", gap: 40 }}>
        <StatCounter value="500" suffix="+" label="Weddings Shot" delay={0} />
        <StatCounter value="10" suffix="+" label="Creatives On Roster" delay={0.1} />
        <StatCounter value="43" suffix="K" label="Community on IG" delay={0.2} />
        <StatCounter value="8" suffix="" label="Years Best of Knot" delay={0.3} />
      </div>
    </div>
  );
}

// ─── Team Preview ───────────────────────────────────────────────────

function TeamPreview() {
  const team = [
    { name: "Sean", role: "Founder & Photographer", color: "#2a2218" },
    { name: "Tiahna", role: "Director of Photography", color: "#22201e" },
    { name: "Josh", role: "Lead Photographer", color: "#1e2022" },
    { name: "Yan", role: "Talent Development", color: "#201e22" },
  ];

  return (
    <div style={{ padding: "100px 32px", maxWidth: 1400, margin: "0 auto" }}>
      <FadeIn>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: 48 }}>
          <div>
            <div style={{ fontFamily: "'DM Sans'", fontSize: 12, color: DS.colors.gold, textTransform: "uppercase", letterSpacing: "0.2em", marginBottom: 12 }}>The People Behind the Lens</div>
            <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(32px, 4vw, 48px)", fontWeight: 700, color: DS.colors.text, margin: 0 }}>Meet the Crew</h2>
          </div>
          <Link to="/team" style={{ fontFamily: "'DM Sans'", fontSize: 13, color: DS.colors.gold, textDecoration: "none", textTransform: "uppercase", letterSpacing: "0.08em", borderBottom: `1px solid ${DS.colors.gold}`, paddingBottom: 2 }}>
            Full Team →
          </Link>
        </div>
      </FadeIn>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 24 }}>
        {team.map((t, i) => (
          <FadeIn key={t.name} delay={i * 0.1}>
            <div style={{ cursor: "pointer", transition: "transform 0.3s" }}
              onMouseEnter={(e) => e.currentTarget.style.transform = "translateY(-4px)"}
              onMouseLeave={(e) => e.currentTarget.style.transform = "translateY(0)"}
            >
              <div style={{
                aspectRatio: "4/5", background: t.color, marginBottom: 16,
                display: "flex", alignItems: "center", justifyContent: "center",
                overflow: "hidden",
              }}>
                <span style={{ fontFamily: "'Playfair Display'", fontSize: 64, color: DS.colors.gold, opacity: 0.15, fontWeight: 700 }}>
                  {t.name[0]}
                </span>
              </div>
              <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 22, fontWeight: 600, color: DS.colors.text }}>{t.name}</div>
              <div style={{ fontFamily: "'DM Sans'", fontSize: 13, color: DS.colors.textSec, marginTop: 4 }}>{t.role}</div>
            </div>
          </FadeIn>
        ))}
      </div>
    </div>
  );
}

// ─── As Seen In ─────────────────────────────────────────────────────

function AsSeenIn() {
  const logos = ["BRITISH VOGUE", "BRIDES", "CARATS & CAKE", "THE KNOT"];
  return (
    <FadeIn>
      <div style={{
        padding: "60px 32px", borderTop: `1px solid ${DS.colors.border}`, borderBottom: `1px solid ${DS.colors.border}`,
        display: "flex", flexDirection: "column", alignItems: "center",
      }}>
        <div style={{ fontFamily: "'DM Sans'", fontSize: 11, color: DS.colors.textSec, textTransform: "uppercase", letterSpacing: "0.2em", marginBottom: 32 }}>As Featured In</div>
        <div style={{ display: "flex", gap: "clamp(24px, 5vw, 64px)", alignItems: "center", flexWrap: "wrap", justifyContent: "center" }}>
          {logos.map((l) => (
            <div key={l} style={{
              fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(16px, 2vw, 22px)", fontWeight: 600,
              color: DS.colors.textSec, letterSpacing: "0.08em", opacity: 0.5, transition: "opacity 0.3s",
            }}
              onMouseEnter={(e) => e.target.style.opacity = 1}
              onMouseLeave={(e) => e.target.style.opacity = 0.5}
            >{l}</div>
          ))}
        </div>
      </div>
    </FadeIn>
  );
}

// ─── CTA Block ──────────────────────────────────────────────────────

function CTABlock() {
  return (
    <div style={{
      position: "relative", padding: "120px 32px", overflow: "hidden",
      background: "var(--mm-surface-alt)",
    }}>
      {/* Subtle grain texture */}
      <div style={{ position: "absolute", inset: 0, opacity: 0.03, backgroundImage: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")" }} />

      <FadeIn>
        <div style={{ maxWidth: 700, margin: "0 auto", textAlign: "center", position: "relative" }}>
          <div style={{ fontFamily: "'DM Sans'", fontSize: 12, color: DS.colors.gold, textTransform: "uppercase", letterSpacing: "0.2em", marginBottom: 24 }}>Let's Start</div>
          <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(36px, 5vw, 56px)", fontWeight: 700, color: DS.colors.text, lineHeight: 1.1, margin: 0 }}>
            Your Date Is Calling
          </h2>
          <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(18px, 2vw, 24px)", color: DS.colors.textSec, marginTop: 16, fontStyle: "italic" }}>
            Tell us about your day. We respond to every inquiry within 24 hours.
          </p>

          <div style={{ display: "flex", gap: 16, justifyContent: "center", marginTop: 40, flexWrap: "wrap" }}>
            <CheckAvailabilityButton />

            <Link to="/investment" style={{
              fontFamily: "'DM Sans'", fontSize: 14, color: DS.colors.gold,
              padding: "16px 40px", textDecoration: "none", textTransform: "uppercase", letterSpacing: "0.1em",
              fontWeight: 600, border: `1px solid ${DS.colors.gold}`, transition: "all 0.3s",
            }}
              onMouseEnter={(e) => { e.target.style.background = DS.colors.gold; e.target.style.color = DS.colors.bg; }}
              onMouseLeave={(e) => { e.target.style.background = "transparent"; e.target.style.color = DS.colors.gold; }}
            >View Packages</Link>
          </div>
        </div>
      </FadeIn>
    </div>
  );
}

// ─── Footer ─────────────────────────────────────────────────────────

// ─── Main App ───────────────────────────────────────────────────────

export default function MoveMountainsHome() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div style={{ background: DS.colors.bg, color: DS.colors.text, minHeight: "100vh" }}>
      {/* Font import */}
      <style>{`
        @import url('${fontLink}');
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body { background: ${DS.colors.bg}; }
        html { scroll-behavior: smooth; }

        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }

        .nav-desktop { display: flex !important; }
        .nav-mobile { display: none !important; }

        @media (max-width: 768px) {
          .nav-desktop { display: none !important; }
          .nav-mobile { display: block !important; }
          .bento-grid { grid-template-columns: 1fr !important; grid-auto-rows: 240px !important; }
          .bento-item { grid-area: auto !important; }
        }

        /* Scrollbar */
        ::-webkit-scrollbar { width: 6px; }
        ::-webkit-scrollbar-track { background: ${DS.colors.bg}; }
        ::-webkit-scrollbar-thumb { background: ${DS.colors.border}; }
        ::-webkit-scrollbar-thumb:hover { background: ${DS.colors.gold}; }

        ::selection { background: ${DS.colors.gold}; color: ${DS.colors.bg}; }
      `}</style>

      <Header />

      <Hero />
      <ServicesStrip />
      <FeaturedWork />
      <BrandStatement />
      <Stats />
      <Testimonials />
      <TeamPreview />
      <AsSeenIn />
      <CTABlock />
      <Footer />
    </div>
  );
}
