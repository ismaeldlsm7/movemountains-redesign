import { useState, useEffect, useRef } from "react";
import { motion, useInView, useScroll, useTransform } from "framer-motion";
import Header from "../components/Header";
import Footer from "../components/Footer";

const DS = {
  bg: "var(--mm-bg)", surface: "var(--mm-surface)", surfaceAlt: "var(--mm-surface-alt)",
  text: "var(--mm-text)", textSec: "var(--mm-text-sec)", gold: "var(--mm-gold)",
  ember: "var(--mm-ember)", border: "var(--mm-border)",
};

const fontLink = "https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,700;1,400&family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;0,700;1,400;1,500&family=DM+Sans:wght@400;500;600;700&family=Bebas+Neue&display=swap";

/* ── Helpers ────────────────────────────────────────────────────── */

function FadeIn({ children, delay = 0, y = 28 }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });
  return (
    <motion.div ref={ref} initial={{ opacity: 0, y }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.7, delay, ease: [0.25, 0.1, 0.25, 1] }}>
      {children}
    </motion.div>
  );
}

function RevealLine({ delay = 0 }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-20px" });
  return (
    <motion.div ref={ref} initial={{ scaleX: 0 }} animate={inView ? { scaleX: 1 } : {}} transition={{ duration: 0.8, delay, ease: "easeOut" }}
      style={{ height: 1, background: DS.border, transformOrigin: "left" }} />
  );
}

function StatCounter({ value, suffix = "", label, delay = 0 }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-30px" });
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!inView) return;
    let s = 0; const end = parseInt(value); const dur = 1600; const step = (end / dur) * 16;
    const t = setInterval(() => { s += step; if (s >= end) { setCount(end); clearInterval(t); } else setCount(Math.floor(s)); }, 16);
    return () => clearInterval(t);
  }, [inView, value]);
  return (
    <motion.div ref={ref} initial={{ opacity: 0, y: 16 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.5, delay }} style={{ textAlign: "center" }}>
      <div style={{ fontFamily: "'Bebas Neue'", fontSize: "clamp(52px, 9vw, 88px)", color: DS.gold, lineHeight: 1 }}>{count}{suffix}</div>
      <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(13px, 1.4vw, 16px)", color: DS.textSec, letterSpacing: "0.14em", textTransform: "uppercase", marginTop: 6 }}>{label}</div>
    </motion.div>
  );
}

/* ── Parallax Image Block ───────────────────────────────────────── */

function ParallaxImage({ color, label, aspect = "16/10", offset = 40 }) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [offset, -offset]);
  return (
    <div ref={ref} style={{ overflow: "hidden" }}>
      <motion.div style={{ y, aspectRatio: aspect, background: color, display: "flex", alignItems: "center", justifyContent: "center" }}>
        <span style={{ fontFamily: "'DM Sans'", fontSize: 12, color: DS.textSec, opacity: 0.25, textTransform: "uppercase", letterSpacing: "0.15em" }}>[ {label} ]</span>
      </motion.div>
    </div>
  );
}

/* ── Chapter Component ──────────────────────────────────────────── */

function Chapter({ number, title, text, imageColor, imageLabel, imagePosition = "right", imageAspect = "4/5" }) {
  const isLeft = imagePosition === "left";
  return (
    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "clamp(32px, 5vw, 80px)", alignItems: "center", padding: "80px 0" }} className="chapter-grid">
      {/* Text side */}
      <div style={{ order: isLeft ? 2 : 1 }}>
        <FadeIn>
          <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 24 }}>
            <span style={{ fontFamily: "'Bebas Neue'", fontSize: 48, color: DS.gold, opacity: 0.3, lineHeight: 1 }}>{number}</span>
            <div style={{ height: 1, flex: 1, background: DS.border }} />
          </div>
          <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(28px, 3.5vw, 42px)", fontWeight: 700, color: DS.text, lineHeight: 1.15, margin: "0 0 24px" }}>
            {title}
          </h2>
        </FadeIn>
        <FadeIn delay={0.15}>
          <p style={{ fontFamily: "'DM Sans'", fontSize: "clamp(15px, 1.2vw, 17px)", color: DS.textSec, lineHeight: 1.75 }}>
            {text}
          </p>
        </FadeIn>
      </div>

      {/* Image side */}
      <div style={{ order: isLeft ? 1 : 2 }}>
        <FadeIn delay={0.1}>
          <ParallaxImage color={imageColor} label={imageLabel} aspect={imageAspect} />
        </FadeIn>
      </div>
    </div>
  );
}

/* ── Timeline ───────────────────────────────────────────────────── */

function Timeline() {
  const milestones = [
    { year: "2015", event: "Sean Edward Brown founds Move Mountains Co. with a single camera and a vision for cinematic wedding storytelling." },
    { year: "2017", event: "First Best of The Knot award. The team grows to three photographers covering weddings across Rhode Island." },
    { year: "2019", event: "Expands to videography — launching cinematic wedding films alongside photography packages." },
    { year: "2020", event: "Introduces Live Streaming during the pandemic, keeping families connected when they couldn't be there in person." },
    { year: "2021", event: "Luxe Booth launches — a premium photo booth experience built for weddings that take themselves seriously." },
    { year: "2022", event: "Featured in British Vogue and Brides Magazine. The team roster grows past ten creatives." },
    { year: "2023", event: "Super 8 Film offering debuts — real analog film for couples who want something no one else has." },
    { year: "2024", event: "MMC Academy opens — a 9-month training program shaping the next generation of wedding creatives. 8th consecutive Best of Knot." },
    { year: "2025", event: "500+ events annually. Content Creation team launches for day-of social media coverage." },
    { year: "2026", event: "Coverage spans the entire East Coast. The mission stays the same: one wedding per day, full attention, every time." },
  ];

  return (
    <div style={{ position: "relative", padding: "24px 0" }}>
      {/* Center line */}
      <div style={{ position: "absolute", left: "50%", top: 0, bottom: 0, width: 1, background: DS.border, transform: "translateX(-50%)" }} className="timeline-line" />

      {milestones.map((m, i) => {
        const isLeft = i % 2 === 0;
        return (
          <FadeIn key={m.year} delay={i * 0.06}>
            <div className="timeline-item" style={{
              display: "flex", alignItems: "flex-start", justifyContent: isLeft ? "flex-end" : "flex-start",
              paddingLeft: isLeft ? 0 : "calc(50% + 32px)", paddingRight: isLeft ? "calc(50% + 32px)" : 0,
              marginBottom: 40, position: "relative",
            }}>
              {/* Dot on line */}
              <div style={{
                position: "absolute", left: "50%", top: 8, width: 10, height: 10,
                background: DS.gold, borderRadius: "50%", transform: "translateX(-50%)",
                boxShadow: `0 0 0 4px ${DS.bg}, 0 0 0 5px ${DS.border}`,
              }} className="timeline-dot" />

              <div style={{ maxWidth: 420 }}>
                <div style={{ fontFamily: "'Bebas Neue'", fontSize: 28, color: DS.gold, lineHeight: 1, marginBottom: 6 }}>{m.year}</div>
                <div style={{ fontFamily: "'DM Sans'", fontSize: 15, color: DS.textSec, lineHeight: 1.65 }}>{m.event}</div>
              </div>
            </div>
          </FadeIn>
        );
      })}
    </div>
  );
}

/* ── Values Grid ────────────────────────────────────────────────── */

function Values() {
  const values = [
    { icon: "◎", title: "One Wedding Per Day", desc: "We never double-book. Your day gets our entire team's full, undivided attention — from first look to last dance." },
    { icon: "◇", title: "Real Over Perfect", desc: "We shoot candid and natural. The surprise kisses, the dance floor chaos, the quiet look across the room — that's where the magic lives." },
    { icon: "△", title: "Team, Not Solo", desc: "A deep roster of creatives means we match the right photographers to your energy, your venue, and your vision." },
    { icon: "○", title: "Beyond the Camera", desc: "We'll carry your dress, buy umbrellas at 10pm, and hype you up between poses. Your day is our day." },
  ];

  return (
    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: 24 }}>
      {values.map((v, i) => (
        <FadeIn key={v.title} delay={i * 0.08}>
          <div style={{
            padding: "clamp(24px, 3vw, 36px)", border: `1px solid ${DS.border}`, height: "100%",
            transition: "border-color 0.4s, background 0.4s",
          }}
            onMouseEnter={(e) => { e.currentTarget.style.borderColor = DS.gold; e.currentTarget.style.background = DS.surfaceAlt; }}
            onMouseLeave={(e) => { e.currentTarget.style.borderColor = DS.border; e.currentTarget.style.background = "transparent"; }}
          >
            <div style={{ fontFamily: "'DM Sans'", fontSize: 28, color: DS.gold, marginBottom: 16, opacity: 0.7 }}>{v.icon}</div>
            <h3 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 22, fontWeight: 600, color: DS.text, marginBottom: 12 }}>{v.title}</h3>
            <p style={{ fontFamily: "'DM Sans'", fontSize: 14, color: DS.textSec, lineHeight: 1.65 }}>{v.desc}</p>
          </div>
        </FadeIn>
      ))}
    </div>
  );
}

/* ── Pull Quote ─────────────────────────────────────────────────── */

function PullQuote({ text, attribution }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const words = text.split(" ");

  return (
    <div ref={ref} style={{ padding: "80px 0", maxWidth: 800, margin: "0 auto", textAlign: "center" }}>
      <div style={{ fontFamily: "'Playfair Display', serif", fontSize: 64, color: DS.gold, opacity: 0.2, lineHeight: 1, marginBottom: -16 }}>"</div>
      <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(22px, 3vw, 34px)", color: DS.text, lineHeight: 1.45, fontStyle: "italic", fontWeight: 500 }}>
        {words.map((w, i) => (
          <motion.span key={i} initial={{ opacity: 0.12 }} animate={inView ? { opacity: 1 } : {}} transition={{ duration: 0.4, delay: i * 0.03 }} style={{ display: "inline-block", marginRight: "0.28em" }}>
            {w}
          </motion.span>
        ))}
      </p>
      <div style={{ fontFamily: "'DM Sans'", fontSize: 13, color: DS.gold, textTransform: "uppercase", letterSpacing: "0.12em", marginTop: 24 }}>— {attribution}</div>
    </div>
  );
}

/* ── Team Teaser Strip ──────────────────────────────────────────── */

function TeamTeaser() {
  const members = [
    { name: "Sean", role: "Founder", initial: "S", color: "#2a2218" },
    { name: "Tiahna", role: "Dir. of Photography", initial: "T", color: "#22201e" },
    { name: "Josh", role: "Lead Photographer", initial: "J", color: "#1e2022" },
    { name: "Yan", role: "Talent Development", initial: "Y", color: "#201e22" },
    { name: "Brandon", role: "Photographer", initial: "B", color: "#221e1a" },
    { name: "Tati", role: "Photographer", initial: "T", color: "#1a2020" },
    { name: "Kaitlyn", role: "Photographer", initial: "K", color: "#201a1e" },
    { name: "Amanda", role: "Photographer", initial: "A", color: "#1e2218" },
  ];

  return (
    <div style={{ display: "flex", gap: 16, overflowX: "auto", paddingBottom: 8, scrollbarWidth: "none" }}>
      {members.map((m, i) => (
        <FadeIn key={m.name} delay={i * 0.06}>
          <div style={{ minWidth: 140, cursor: "pointer", transition: "transform 0.3s" }}
            onMouseEnter={(e) => e.currentTarget.style.transform = "translateY(-4px)"}
            onMouseLeave={(e) => e.currentTarget.style.transform = "translateY(0)"}
          >
            <div style={{
              width: 140, height: 180, background: m.color, marginBottom: 12,
              display: "flex", alignItems: "center", justifyContent: "center", overflow: "hidden",
            }}>
              <span style={{ fontFamily: "'Playfair Display'", fontSize: 56, color: DS.gold, opacity: 0.12, fontWeight: 700 }}>{m.initial}</span>
            </div>
            <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 18, fontWeight: 600, color: DS.text }}>{m.name}</div>
            <div style={{ fontFamily: "'DM Sans'", fontSize: 12, color: DS.textSec, marginTop: 2 }}>{m.role}</div>
          </div>
        </FadeIn>
      ))}
    </div>
  );
}

/* ── Nav ─────────────────────────────────────────────────────────── */

/* ── Main About Page ────────────────────────────────────────────── */

export default function AboutPage() {
  const [scrolled, setScrolled] = useState(false);
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const heroScale = useTransform(scrollYProgress, [0, 1], [1.05, 1.18]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);

  return (
    <div style={{ background: DS.bg, color: DS.text, minHeight: "100vh" }}>
      <style>{`
        @import url('${fontLink}');
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body { background: ${DS.bg}; }
        html { scroll-behavior: smooth; }
        ::-webkit-scrollbar { width: 5px; }
        ::-webkit-scrollbar-track { background: ${DS.bg}; }
        ::-webkit-scrollbar-thumb { background: ${DS.border}; }
        ::-webkit-scrollbar-thumb:hover { background: ${DS.gold}; }
        ::selection { background: ${DS.gold}; color: ${DS.bg}; }

        @media (max-width: 768px) {
          .chapter-grid { grid-template-columns: 1fr !important; }
          .chapter-grid > * { order: unset !important; }
          .nav-links { display: none !important; }
          .timeline-item { padding-left: 40px !important; padding-right: 0 !important; justify-content: flex-start !important; }
          .timeline-line { left: 12px !important; }
          .timeline-dot { left: 12px !important; }
        }
      `}</style>

      <Header activePage="About" />

      {/* ── HERO ──────────────────────────────────────────────────── */}
      <div ref={heroRef} style={{ height: "65vh", minHeight: 440, maxHeight: 720, position: "relative", overflow: "hidden" }}>
        <motion.div style={{ scale: heroScale, position: "absolute", inset: 0 }}>
          <div style={{
            width: "100%", height: "100%",
            background: "linear-gradient(160deg, var(--mm-surface) 0%, var(--mm-surface-alt) 40%, var(--mm-surface) 70%, var(--mm-bg) 100%)",
            display: "flex", alignItems: "center", justifyContent: "center",
          }}>
            <span style={{ fontFamily: "'DM Sans'", fontSize: 13, color: DS.textSec, opacity: 0.3, textTransform: "uppercase", letterSpacing: "0.2em" }}>
              [ Candid Team Photo — Behind the Scenes ]
            </span>
          </div>
        </motion.div>

        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to bottom, rgba(15,15,15,0.2) 0%, rgba(15,15,15,0.15) 40%, rgba(15,15,15,0.75) 80%, var(--mm-bg) 100%)" }} />

        <motion.div style={{ opacity: heroOpacity, position: "absolute", bottom: "12%", left: 0, right: 0, padding: "0 32px" }}>
          <div style={{ maxWidth: 1400, margin: "0 auto" }}>
            <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5, duration: 0.7 }}>
              <div style={{ fontFamily: "'DM Sans'", fontSize: 12, color: DS.gold, textTransform: "uppercase", letterSpacing: "0.2em", marginBottom: 16 }}>Our Story</div>
              <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(38px, 6vw, 72px)", fontWeight: 700, color: DS.text, lineHeight: 1.05, margin: 0, maxWidth: 700 }}>
                One Camera.<br /><span style={{ color: DS.gold }}>One Vision.</span><br />Ten Years Later.
              </h1>
            </motion.div>
          </div>
        </motion.div>
      </div>

      {/* ── INTRO TEXT ────────────────────────────────────────────── */}
      <div style={{ maxWidth: 1400, margin: "0 auto", padding: "80px 32px 0" }}>
        <FadeIn>
          <div style={{ maxWidth: 700 }}>
            <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(20px, 2.5vw, 28px)", color: DS.text, lineHeight: 1.5, fontWeight: 400, fontStyle: "italic" }}>
              Move Mountains Co. didn't start with a business plan or a studio lease. It started with Sean Edward Brown, a camera, and the belief that wedding photography could be more than posed portraits in front of a gazebo.
            </p>
          </div>
        </FadeIn>

        <RevealLine delay={0.2} />

        {/* ── CHAPTER 1 ──────────────────────────────────────────── */}
        <Chapter
          number="01"
          title="The Beginning"
          text="Move Mountains Co. started with Sean Edward Brown and a single camera. No studio, no team, no business plan — just an obsession with light, a sharp eye for moments, and the belief that wedding photography could be more than posed portraits in front of a gazebo. The early days were solo missions: one photographer, one couple, one chance to get it right. Every wedding was proof that the vision worked."
          imageColor="#2a2218"
          imageLabel="Sean — Early Days, Providence RI"
          imagePosition="right"
        />

        <RevealLine />

        {/* ── CHAPTER 2 ──────────────────────────────────────────── */}
        <Chapter
          number="02"
          title="The Team"
          text="One camera became two, then five, then ten. What started as a solo operation grew into something bigger — not by accident, but by design. Every creative who joins MMC is chosen for the same thing Sean looks for in a photograph: authenticity. The team now includes photographers, videographers, editors, coordinators, and Academy instructors. Each one brings their own eye, their own energy. Together, they cover 500+ events every year without ever treating a wedding like a number."
          imageColor="#1e2024"
          imageLabel="The Crew — Golden Hour Setup"
          imagePosition="left"
          imageAspect="3/4"
        />

        <RevealLine />
      </div>

      {/* ── STATS SECTION ─────────────────────────────────────────── */}
      <div style={{ padding: "80px 32px", background: DS.surface, borderTop: `1px solid ${DS.border}`, borderBottom: `1px solid ${DS.border}` }}>
        <div style={{ maxWidth: 1000, margin: "0 auto", display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(140px, 1fr))", gap: 40 }}>
          <StatCounter value="500" suffix="+" label="Weddings Shot" delay={0} />
          <StatCounter value="10" suffix="+" label="Creatives" delay={0.1} />
          <StatCounter value="43" suffix="K" label="IG Community" delay={0.2} />
          <StatCounter value="8" suffix="" label="Years Best of Knot" delay={0.3} />
          <StatCounter value="137" suffix="+" label="5-Star Reviews" delay={0.4} />
        </div>
      </div>

      {/* ── CHAPTERS 3 & 4 ────────────────────────────────────────── */}
      <div style={{ maxWidth: 1400, margin: "0 auto", padding: "0 32px" }}>
        <Chapter
          number="03"
          title="The Standard"
          text="There's a reason MMC commits to one event per day. It's the same reason Tiahna carried a bride's dress across a rocky beach, and the same reason the team bought umbrellas at 10pm the night before a wedding when rain threatened to ruin the plan. The work doesn't stop at photography — it stops when the couple has everything they need. This standard is why British Vogue came calling, why Brides Magazine featured the work, and why couples book two years in advance."
          imageColor="#1a1e1a"
          imageLabel="Tiahna — On Location, Castle Hill"
          imagePosition="right"
          imageAspect="3/4"
        />

        <RevealLine />

        <Chapter
          number="04"
          title="What's Next"
          text="In 2024, MMC launched the Academy — a 9-month program that trains the next generation of wedding creatives. Led by Tiahna Lynn and Yan La Mort, it's not a photography class. It's a career accelerator. The vision is clear: build the standard for wedding media in New England, and then raise it again. From one camera to a crew of ten — the mission hasn't changed. Make moments. Capture them. Give people something beautiful to hold onto forever."
          imageColor="#201e1a"
          imageLabel="MMC Academy — Workshop Session"
          imagePosition="left"
        />
      </div>

      {/* ── PULL QUOTE ────────────────────────────────────────────── */}
      <div style={{ padding: "20px 32px", borderTop: `1px solid ${DS.border}`, borderBottom: `1px solid ${DS.border}` }}>
        <PullQuote
          text="Sean not only takes creative and thoughtful images, but is also a joy to work with. He makes the subject of his photos shine no matter what their special occasion is."
          attribution="Client Review"
        />
      </div>

      {/* ── VALUES ────────────────────────────────────────────────── */}
      <div style={{ maxWidth: 1400, margin: "0 auto", padding: "100px 32px" }}>
        <FadeIn>
          <div style={{ marginBottom: 48 }}>
            <div style={{ fontFamily: "'DM Sans'", fontSize: 12, color: DS.gold, textTransform: "uppercase", letterSpacing: "0.2em", marginBottom: 12 }}>What We Stand For</div>
            <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(28px, 3.5vw, 42px)", fontWeight: 700, color: DS.text, margin: 0 }}>
              The Non-Negotiables
            </h2>
          </div>
        </FadeIn>
        <Values />
      </div>

      {/* ── TIMELINE ──────────────────────────────────────────────── */}
      <div style={{ background: DS.surface, borderTop: `1px solid ${DS.border}`, borderBottom: `1px solid ${DS.border}`, padding: "100px 32px" }}>
        <div style={{ maxWidth: 1000, margin: "0 auto" }}>
          <FadeIn>
            <div style={{ textAlign: "center", marginBottom: 60 }}>
              <div style={{ fontFamily: "'DM Sans'", fontSize: 12, color: DS.gold, textTransform: "uppercase", letterSpacing: "0.2em", marginBottom: 12 }}>The Journey</div>
              <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(28px, 3.5vw, 42px)", fontWeight: 700, color: DS.text, margin: 0 }}>
                A Decade in the Making
              </h2>
            </div>
          </FadeIn>
          <Timeline />
        </div>
      </div>

      {/* ── TEAM TEASER ───────────────────────────────────────────── */}
      <div style={{ maxWidth: 1400, margin: "0 auto", padding: "100px 32px" }}>
        <FadeIn>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: 40, flexWrap: "wrap", gap: 16 }}>
            <div>
              <div style={{ fontFamily: "'DM Sans'", fontSize: 12, color: DS.gold, textTransform: "uppercase", letterSpacing: "0.2em", marginBottom: 12 }}>The People Behind the Lens</div>
              <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(28px, 3.5vw, 42px)", fontWeight: 700, color: DS.text, margin: 0 }}>Meet the Crew</h2>
            </div>
            <a href="#" style={{ fontFamily: "'DM Sans'", fontSize: 13, color: DS.gold, textDecoration: "none", textTransform: "uppercase", letterSpacing: "0.08em", borderBottom: `1px solid ${DS.gold}`, paddingBottom: 2 }}>
              Full Team Page →
            </a>
          </div>
        </FadeIn>
        <TeamTeaser />
      </div>

      {/* ── AS SEEN IN ────────────────────────────────────────────── */}
      <div style={{ borderTop: `1px solid ${DS.border}`, padding: "56px 32px", display: "flex", flexDirection: "column", alignItems: "center" }}>
        <FadeIn>
          <div style={{ fontFamily: "'DM Sans'", fontSize: 11, color: DS.textSec, textTransform: "uppercase", letterSpacing: "0.2em", marginBottom: 28, textAlign: "center" }}>As Featured In</div>
          <div style={{ display: "flex", gap: "clamp(24px, 5vw, 56px)", flexWrap: "wrap", justifyContent: "center" }}>
            {["BRITISH VOGUE", "BRIDES", "CARATS & CAKE", "THE KNOT"].map((l) => (
              <span key={l} style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(15px, 1.8vw, 20px)", fontWeight: 600, color: DS.textSec, letterSpacing: "0.08em", opacity: 0.5, transition: "opacity 0.3s", cursor: "default" }}
                onMouseEnter={(e) => e.target.style.opacity = 1}
                onMouseLeave={(e) => e.target.style.opacity = 0.5}
              >{l}</span>
            ))}
          </div>
        </FadeIn>
      </div>

      {/* ── CTA ───────────────────────────────────────────────────── */}
      <div style={{ padding: "100px 32px", textAlign: "center", background: `linear-gradient(160deg, var(--mm-surface) 0%, var(--mm-surface-alt) 50%, ${DS.bg} 100%)` }}>
        <FadeIn>
          <div style={{ fontFamily: "'DM Sans'", fontSize: 12, color: DS.gold, textTransform: "uppercase", letterSpacing: "0.2em", marginBottom: 16 }}>Ready?</div>
          <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(30px, 4.5vw, 52px)", fontWeight: 700, color: DS.text, lineHeight: 1.1, margin: "0 0 16px" }}>
            Want Us at Your Wedding?
          </h2>
          <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 20, color: DS.textSec, fontStyle: "italic", marginBottom: 36 }}>
            We'd love to hear your story.
          </p>
          <div style={{ display: "flex", gap: 16, justifyContent: "center", flexWrap: "wrap" }}>
            <a href="#" style={{
              fontFamily: "'DM Sans'", fontSize: 14, color: DS.bg, background: DS.ember,
              padding: "16px 40px", textDecoration: "none", textTransform: "uppercase", letterSpacing: "0.1em", fontWeight: 600, transition: "background 0.3s",
            }}
              onMouseEnter={(e) => e.target.style.background = "#ff6b3d"}
              onMouseLeave={(e) => e.target.style.background = DS.ember}
            >Get in Touch</a>
            <a href="/contact" style={{
              fontFamily: "'DM Sans'", fontSize: 14, color: DS.gold, padding: "16px 40px", textDecoration: "none", textTransform: "uppercase", letterSpacing: "0.1em", fontWeight: 600,
              border: `1px solid ${DS.gold}`, transition: "all 0.3s",
            }}
              onMouseEnter={(e) => { e.target.style.background = DS.gold; e.target.style.color = DS.bg; }}
              onMouseLeave={(e) => { e.target.style.background = "transparent"; e.target.style.color = DS.gold; }}
            >View Portfolio</a>
          </div>
        </FadeIn>
      </div>

      <Footer />
    </div>
  );
}
