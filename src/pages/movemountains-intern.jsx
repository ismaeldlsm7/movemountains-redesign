import { useState, useEffect, useRef } from "react";
import { motion, useInView, useScroll, useTransform, AnimatePresence } from "framer-motion";
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

/* ── Internship Tracks ─────────────────────────────────────────── */

const tracks = [
  {
    title: "Photography Intern",
    type: "Semester-Based / 12 Weeks",
    department: "Photography",
    description: "Shadow lead photographers at real weddings and events. You'll start by assisting with gear, learning lighting setups, and studying our editorial approach — then graduate to second-shooting under direct mentorship. By the end of the program, you'll have a professional wedding portfolio and the confidence to deliver under pressure.",
    learn: [
      "Composition and lighting for editorial wedding photography",
      "Working with couples — directing, posing, and building trust on the fly",
      "Gear management and backup workflows for event-day reliability",
      "Culling and editing in Lightroom to match the MMC visual standard",
      "How to read a room — anticipating moments before they happen",
      "Timeline management and vendor coordination on-site",
    ],
    color: "#2a2218",
  },
  {
    title: "Videography Intern",
    type: "Semester-Based / 12 Weeks",
    department: "Videography",
    description: "Learn cinematic wedding filmmaking from pre-production through final delivery. You'll assist on film shoots, learn audio capture, and work alongside editors to understand narrative structure. The program covers both the technical craft and the storytelling instinct that separates footage from a film.",
    learn: [
      "Cinema camera operation, stabilization, and movement techniques",
      "Audio capture — lavaliers, shotgun mics, and ambient sound design",
      "Non-linear editing in DaVinci Resolve and Premiere Pro",
      "Color grading for consistent, cinematic look across deliverables",
      "Narrative structure — how to tell a love story in 5 minutes",
      "Drone footage basics and FAA Part 107 preparation",
    ],
    color: "#1e2024",
  },
  {
    title: "Content Creation Intern",
    type: "Semester-Based / 12 Weeks",
    department: "Content + Social",
    description: "Build a social-first content practice from the ground up. You'll create Reels, TikToks, and behind-the-scenes content at live events while learning the strategy behind what performs and why. This track is built for creators who think in vertical video and understand the rhythm of social storytelling.",
    learn: [
      "Vertical video shooting techniques — smartphone and gimbal workflows",
      "Same-day editing and delivery for real-time event coverage",
      "Platform-specific content strategy (Instagram, TikTok, Pinterest)",
      "Trend analysis and adapting formats to wedding content",
      "Caption writing, hashtag strategy, and audience engagement",
      "Analytics — reading performance data and adjusting creative accordingly",
    ],
    color: "#22201a",
  },
  {
    title: "Operations + Studio Intern",
    type: "Semester-Based / 12 Weeks",
    department: "Operations",
    description: "See how a creative business actually runs. You'll work alongside the operations team on client communication, timeline building, vendor coordination, and studio management. This track is ideal for students interested in event management, creative production, or starting their own business in the wedding industry.",
    learn: [
      "Client communication — from inquiry to delivery",
      "Wedding timeline construction and day-of logistics",
      "Vendor coordination and relationship management",
      "CRM and project management tools used at scale",
      "Financial basics — invoicing, contracts, and pricing strategy",
      "Studio operations — inventory, scheduling, and quality control",
    ],
    color: "#1a1e1a",
  },
];

/* ── Track Card Component ──────────────────────────────────────── */

function TrackCard({ track, index }) {
  const [expanded, setExpanded] = useState(false);
  return (
    <FadeIn delay={index * 0.08}>
      <div style={{ border: `1px solid ${DS.border}`, transition: "border-color 0.3s" }}
        onMouseEnter={(e) => e.currentTarget.style.borderColor = "rgba(201,169,110,0.3)"}
        onMouseLeave={(e) => e.currentTarget.style.borderColor = DS.border}>
        <div style={{ display: "grid", gridTemplateColumns: "80px 1fr", gap: 0 }} className="track-row">
          <div style={{ background: track.color, display: "flex", alignItems: "center", justifyContent: "center" }}>
            <span style={{ fontFamily: "'Playfair Display'", fontSize: 36, color: DS.gold, opacity: 0.1, fontWeight: 700 }}>{track.title[0]}</span>
          </div>
          <div style={{ padding: "24px" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: 12 }}>
              <div>
                <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: 22, fontWeight: 700, color: DS.text, margin: "0 0 4px" }}>{track.title}</h3>
                <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
                  <span style={{ fontFamily: "'DM Sans'", fontSize: 12, color: DS.gold, textTransform: "uppercase", letterSpacing: "0.08em" }}>{track.department}</span>
                  <span style={{ width: 3, height: 3, borderRadius: "50%", background: DS.border }} />
                  <span style={{ fontFamily: "'DM Sans'", fontSize: 12, color: DS.textSec }}>{track.type}</span>
                </div>
              </div>
              <button onClick={() => setExpanded(!expanded)} style={{
                fontFamily: "'DM Sans'", fontSize: 12, color: DS.gold, background: "none", border: `1px solid ${DS.gold}`,
                padding: "8px 16px", cursor: "pointer", textTransform: "uppercase", letterSpacing: "0.06em", transition: "all 0.3s",
              }}
                onMouseEnter={(e) => { e.target.style.background = DS.gold; e.target.style.color = DS.bg; }}
                onMouseLeave={(e) => { e.target.style.background = "transparent"; e.target.style.color = DS.gold; }}
              >{expanded ? "Close" : "View Track"}</button>
            </div>

            <AnimatePresence>
              {expanded && (
                <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.3 }} style={{ overflow: "hidden" }}>
                  <div style={{ paddingTop: 20, borderTop: `1px solid ${DS.border}`, marginTop: 16 }}>
                    <p style={{ fontFamily: "'DM Sans'", fontSize: 14, color: DS.textSec, lineHeight: 1.7, marginBottom: 20 }}>{track.description}</p>
                    <div style={{ fontFamily: "'DM Sans'", fontSize: 11, color: DS.gold, textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: 12 }}>What You'll Learn</div>
                    {track.learn.map((item, i) => (
                      <div key={i} style={{ display: "flex", alignItems: "flex-start", gap: 8, padding: "6px 0" }}>
                        <span style={{ width: 5, height: 5, background: DS.gold, borderRadius: "50%", flexShrink: 0, marginTop: 6 }} />
                        <span style={{ fontFamily: "'DM Sans'", fontSize: 13, color: DS.text, lineHeight: 1.5 }}>{item}</span>
                      </div>
                    ))}
                    <a href="/contact" style={{
                      fontFamily: "'DM Sans'", fontSize: 13, color: DS.bg, background: DS.ember,
                      padding: "12px 28px", textDecoration: "none", textTransform: "uppercase", letterSpacing: "0.08em",
                      fontWeight: 600, display: "inline-block", marginTop: 20, transition: "background 0.3s",
                    }}
                      onMouseEnter={(e) => e.target.style.background = "#ff6b3d"}
                      onMouseLeave={(e) => e.target.style.background = DS.ember}
                    >Apply for This Track</a>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </FadeIn>
  );
}

/* ── Program Timeline ──────────────────────────────────────────── */

function ProgramTimeline() {
  const phases = [
    { week: "Weeks 1–2", title: "Orientation + Foundation", desc: "Studio tour, gear training, shadow days with senior team members. You'll learn the MMC standard before you ever touch a camera at an event." },
    { week: "Weeks 3–5", title: "Assisted Shooting", desc: "Work alongside lead creatives at real weddings as an assistant. Learn setup, positioning, and timing by doing — not watching tutorials." },
    { week: "Weeks 6–8", title: "Second Shooting", desc: "Graduate to second shooter. You'll cover assigned portions of weddings independently while your mentor is on-site for support." },
    { week: "Weeks 9–10", title: "Post-Production Deep Dive", desc: "Editing sprints, color grading sessions, and delivery workflows. Learn how raw footage becomes the polished final product clients receive." },
    { week: "Weeks 11–12", title: "Capstone + Portfolio Review", desc: "Build your professional portfolio from the work you've done. Present to the team. Top performers get invited to join the MMC roster." },
  ];

  return (
    <div style={{ position: "relative", padding: "24px 0" }}>
      <div style={{ position: "absolute", left: "50%", top: 0, bottom: 0, width: 1, background: DS.border, transform: "translateX(-50%)" }} className="timeline-line" />
      {phases.map((p, i) => {
        const isLeft = i % 2 === 0;
        return (
          <FadeIn key={p.week} delay={i * 0.08}>
            <div className="timeline-item" style={{
              display: "flex", alignItems: "flex-start", justifyContent: isLeft ? "flex-end" : "flex-start",
              paddingLeft: isLeft ? 0 : "calc(50% + 32px)", paddingRight: isLeft ? "calc(50% + 32px)" : 0,
              marginBottom: 48, position: "relative",
            }}>
              <div style={{
                position: "absolute", left: "50%", top: 8, width: 10, height: 10,
                background: DS.gold, borderRadius: "50%", transform: "translateX(-50%)",
                boxShadow: `0 0 0 4px ${DS.bg}, 0 0 0 5px ${DS.border}`,
              }} className="timeline-dot" />
              <div style={{ maxWidth: 420 }}>
                <div style={{ fontFamily: "'Bebas Neue'", fontSize: 22, color: DS.gold, lineHeight: 1, marginBottom: 4 }}>{p.week}</div>
                <div style={{ fontFamily: "'Playfair Display', serif", fontSize: 20, fontWeight: 700, color: DS.text, marginBottom: 8 }}>{p.title}</div>
                <div style={{ fontFamily: "'DM Sans'", fontSize: 14, color: DS.textSec, lineHeight: 1.65 }}>{p.desc}</div>
              </div>
            </div>
          </FadeIn>
        );
      })}
    </div>
  );
}

/* ── Success Stories ────────────────────────────────────────────── */

function SuccessStories() {
  const stories = [
    { name: "Brandon", role: "Photography Intern → Lead Photographer", year: "2022", quote: "I walked in knowing how to use a camera. I walked out knowing how to tell a story. The mentorship here doesn't exist anywhere else.", initial: "B", color: "#221e1a" },
    { name: "Kaitlyn", role: "Content Intern → Full Roster Creator", year: "2023", quote: "The first wedding I covered solo, I was terrified. By the tenth, I realized I was ready because someone invested the time to show me — not just tell me.", initial: "K", color: "#201a1e" },
    { name: "Amanda", role: "Operations Intern → Studio Coordinator", year: "2024", quote: "I came in thinking I wanted to be behind the camera. I found out I'm better at making sure everyone else can do their best work. That's its own kind of art.", initial: "A", color: "#1e2218" },
  ];

  return (
    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: 24 }} className="stories-grid">
      {stories.map((s, i) => (
        <FadeIn key={s.name} delay={i * 0.1}>
          <div style={{
            border: `1px solid ${DS.border}`, padding: "clamp(24px, 3vw, 36px)", height: "100%",
            transition: "border-color 0.4s, background 0.4s", display: "flex", flexDirection: "column",
          }}
            onMouseEnter={(e) => { e.currentTarget.style.borderColor = DS.gold; e.currentTarget.style.background = DS.surfaceAlt; }}
            onMouseLeave={(e) => { e.currentTarget.style.borderColor = DS.border; e.currentTarget.style.background = "transparent"; }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 20 }}>
              <div style={{
                width: 52, height: 52, borderRadius: "50%", background: s.color,
                display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0,
              }}>
                <span style={{ fontFamily: "'Playfair Display'", fontSize: 22, color: DS.gold, opacity: 0.3, fontWeight: 700 }}>{s.initial}</span>
              </div>
              <div>
                <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 20, fontWeight: 600, color: DS.text }}>{s.name}</div>
                <div style={{ fontFamily: "'DM Sans'", fontSize: 11, color: DS.gold, textTransform: "uppercase", letterSpacing: "0.06em" }}>{s.role}</div>
              </div>
            </div>
            <div style={{ fontFamily: "'Playfair Display', serif", fontSize: 28, color: DS.gold, opacity: 0.15, lineHeight: 1, marginBottom: -4 }}>"</div>
            <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 17, color: DS.text, lineHeight: 1.55, fontStyle: "italic", flex: 1 }}>
              {s.quote}
            </p>
            <div style={{ fontFamily: "'DM Sans'", fontSize: 12, color: DS.textSec, marginTop: 16 }}>Cohort {s.year}</div>
          </div>
        </FadeIn>
      ))}
    </div>
  );
}

/* ── Main Intern Page ──────────────────────────────────────────── */

export default function InternPage() {
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const heroScale = useTransform(scrollYProgress, [0, 1], [1.05, 1.18]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

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
          .track-row { grid-template-columns: 1fr !important; }
          .track-row > div:first-child { display: none !important; }
          .chapter-grid { grid-template-columns: 1fr !important; }
          .chapter-grid > * { order: unset !important; }
          .stories-grid { grid-template-columns: 1fr !important; }
          .timeline-item { padding-left: 40px !important; padding-right: 0 !important; justify-content: flex-start !important; }
          .timeline-line { left: 12px !important; }
          .timeline-dot { left: 12px !important; }
          .perks-grid { grid-template-columns: 1fr !important; }
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
              [ Interns + Team — Workshop Day ]
            </span>
          </div>
        </motion.div>

        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to bottom, rgba(15,15,15,0.2) 0%, rgba(15,15,15,0.15) 40%, rgba(15,15,15,0.75) 80%, var(--mm-bg) 100%)" }} />

        <motion.div style={{ opacity: heroOpacity, position: "absolute", bottom: "12%", left: 0, right: 0, padding: "0 32px" }}>
          <div style={{ maxWidth: 1400, margin: "0 auto" }}>
            <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5, duration: 0.7 }}>
              <div style={{ fontFamily: "'DM Sans'", fontSize: 12, color: DS.gold, textTransform: "uppercase", letterSpacing: "0.2em", marginBottom: 16 }}>Internships + Student Development</div>
              <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(38px, 6vw, 72px)", fontWeight: 700, color: DS.text, lineHeight: 1.05, margin: 0, maxWidth: 750 }}>
                We Don't Hire Interns.<br /><span style={{ color: DS.gold }}>We Build Careers.</span>
              </h1>
            </motion.div>
          </div>
        </motion.div>
      </div>

      {/* ── INTRO ─────────────────────────────────────────────────── */}
      <div style={{ maxWidth: 1400, margin: "0 auto", padding: "80px 32px 0" }}>
        <FadeIn>
          <div style={{ maxWidth: 700 }}>
            <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(20px, 2.5vw, 28px)", color: DS.text, lineHeight: 1.5, fontWeight: 400, fontStyle: "italic" }}>
              Most internships give you coffee runs and a line on your resume. Ours puts you on-site at real weddings, learning from creatives who do this for a living — because the best way to learn is to do the work, not watch someone else do it.
            </p>
          </div>
        </FadeIn>

        <RevealLine delay={0.2} />
      </div>

      {/* ── PHILOSOPHY SECTION ────────────────────────────────────── */}
      <div style={{ maxWidth: 1400, margin: "0 auto", padding: "80px 32px" }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "clamp(32px, 5vw, 80px)", alignItems: "center" }} className="chapter-grid">
          <div>
            <FadeIn>
              <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 24 }}>
                <span style={{ fontFamily: "'Bebas Neue'", fontSize: 48, color: DS.gold, opacity: 0.3, lineHeight: 1 }}>01</span>
                <div style={{ height: 1, flex: 1, background: DS.border }} />
              </div>
              <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(28px, 3.5vw, 42px)", fontWeight: 700, color: DS.text, lineHeight: 1.15, margin: "0 0 24px" }}>
                Why We Invest in Students
              </h2>
            </FadeIn>
            <FadeIn delay={0.15}>
              <p style={{ fontFamily: "'DM Sans'", fontSize: "clamp(15px, 1.2vw, 17px)", color: DS.textSec, lineHeight: 1.75 }}>
                The wedding industry doesn't have a clear path in. There's no residency program, no apprenticeship pipeline. Most new creatives learn by trial and error — shooting for free, watching YouTube, hoping someone gives them a shot. We think that's broken. MMC's internship program exists because every photographer, videographer, and coordinator on our team was once the person who just needed someone to open the door. Now we're the ones holding it open.
              </p>
            </FadeIn>
          </div>
          <div>
            <FadeIn delay={0.1}>
              <ParallaxImage color="#2a2218" label="Intern Workshop — Studio Day" aspect="4/5" />
            </FadeIn>
          </div>
        </div>

        <RevealLine />

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "clamp(32px, 5vw, 80px)", alignItems: "center", padding: "80px 0" }} className="chapter-grid">
          <div style={{ order: 2 }}>
            <FadeIn>
              <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 24 }}>
                <span style={{ fontFamily: "'Bebas Neue'", fontSize: 48, color: DS.gold, opacity: 0.3, lineHeight: 1 }}>02</span>
                <div style={{ height: 1, flex: 1, background: DS.border }} />
              </div>
              <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(28px, 3.5vw, 42px)", fontWeight: 700, color: DS.text, lineHeight: 1.15, margin: "0 0 24px" }}>
                Real Work, Not Busy Work
              </h2>
            </FadeIn>
            <FadeIn delay={0.15}>
              <p style={{ fontFamily: "'DM Sans'", fontSize: "clamp(15px, 1.2vw, 17px)", color: DS.textSec, lineHeight: 1.75 }}>
                You won't spend twelve weeks organizing a hard drive. From week one, you're embedded with the team — on-site at events, in the editing suite, on calls with clients. The program is structured so you learn by contributing, not observing. Every intern works on real deliverables for real couples. The stakes are real. The growth is real. And when you're done, the portfolio you walk away with is proof that you can do this.
              </p>
            </FadeIn>
          </div>
          <div style={{ order: 1 }}>
            <FadeIn delay={0.1}>
              <ParallaxImage color="#1e2024" label="Second Shooting — On Location" aspect="3/4" />
            </FadeIn>
          </div>
        </div>
      </div>

      {/* ── STATS ─────────────────────────────────────────────────── */}
      <div style={{ padding: "80px 32px", background: DS.surface, borderTop: `1px solid ${DS.border}`, borderBottom: `1px solid ${DS.border}` }}>
        <div style={{ maxWidth: 1000, margin: "0 auto", display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(140px, 1fr))", gap: 40 }}>
          <StatCounter value="30" suffix="+" label="Interns Trained" delay={0} />
          <StatCounter value="12" suffix="" label="Hired to Roster" delay={0.1} />
          <StatCounter value="85" suffix="%" label="Completion Rate" delay={0.2} />
          <StatCounter value="4" suffix="" label="Tracks Available" delay={0.3} />
        </div>
      </div>

      {/* ── INTERNSHIP TRACKS ─────────────────────────────────────── */}
      <div style={{ maxWidth: 1000, margin: "0 auto", padding: "100px 32px" }}>
        <FadeIn>
          <div style={{ marginBottom: 48 }}>
            <div style={{ fontFamily: "'DM Sans'", fontSize: 12, color: DS.gold, textTransform: "uppercase", letterSpacing: "0.2em", marginBottom: 12 }}>Choose Your Path</div>
            <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(28px, 3.5vw, 42px)", fontWeight: 700, color: DS.text, margin: "0 0 12px" }}>
              Internship Tracks
            </h2>
            <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(17px, 2vw, 22px)", color: DS.textSec, fontStyle: "italic", maxWidth: 550 }}>
              Four tracks. Twelve weeks. One standard — the same one we hold for our full team.
            </p>
          </div>
        </FadeIn>

        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          {tracks.map((track, i) => (
            <TrackCard key={track.title} track={track} index={i} />
          ))}
        </div>
      </div>

      {/* ── PROGRAM TIMELINE ──────────────────────────────────────── */}
      <div style={{ background: DS.surface, borderTop: `1px solid ${DS.border}`, borderBottom: `1px solid ${DS.border}`, padding: "100px 32px" }}>
        <div style={{ maxWidth: 1000, margin: "0 auto" }}>
          <FadeIn>
            <div style={{ textAlign: "center", marginBottom: 60 }}>
              <div style={{ fontFamily: "'DM Sans'", fontSize: 12, color: DS.gold, textTransform: "uppercase", letterSpacing: "0.2em", marginBottom: 12 }}>12-Week Structure</div>
              <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(28px, 3.5vw, 42px)", fontWeight: 700, color: DS.text, margin: 0 }}>
                How the Program Works
              </h2>
            </div>
          </FadeIn>
          <ProgramTimeline />
        </div>
      </div>

      {/* ── SUCCESS STORIES ───────────────────────────────────────── */}
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "100px 32px" }}>
        <FadeIn>
          <div style={{ marginBottom: 48 }}>
            <div style={{ fontFamily: "'DM Sans'", fontSize: 12, color: DS.gold, textTransform: "uppercase", letterSpacing: "0.2em", marginBottom: 12 }}>From Intern to Team</div>
            <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(28px, 3.5vw, 42px)", fontWeight: 700, color: DS.text, margin: 0 }}>
              Where They Are Now
            </h2>
          </div>
        </FadeIn>
        <SuccessStories />
      </div>

      {/* ── PERKS ─────────────────────────────────────────────────── */}
      <div style={{ borderTop: `1px solid ${DS.border}`, borderBottom: `1px solid ${DS.border}`, padding: "100px 32px", background: DS.surface }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <FadeIn>
            <div style={{ marginBottom: 48 }}>
              <div style={{ fontFamily: "'DM Sans'", fontSize: 12, color: DS.gold, textTransform: "uppercase", letterSpacing: "0.2em", marginBottom: 12 }}>What You Get</div>
              <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(28px, 3.5vw, 42px)", fontWeight: 700, color: DS.text, margin: 0 }}>
                More Than Experience
              </h2>
            </div>
          </FadeIn>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 24 }} className="perks-grid">
            {[
              { icon: "◎", title: "Paid Stipend", desc: "All internship tracks include a per-event stipend. You're doing professional work — you should be compensated for it." },
              { icon: "△", title: "Professional Portfolio", desc: "Leave with a curated portfolio of work from real weddings — reviewed, edited, and approved by MMC senior creatives." },
              { icon: "◇", title: "1-on-1 Mentorship", desc: "Every intern is paired with a senior team member. Weekly check-ins, real-time feedback at events, and honest career guidance." },
              { icon: "▶", title: "Gear Access", desc: "Use MMC's professional equipment during your program. Learn on the same cameras, lenses, and stabilizers we use for clients." },
              { icon: "○", title: "Industry Network", desc: "Meet planners, venue managers, florists, and DJs at every event. The wedding industry runs on relationships — you'll start building yours." },
              { icon: "□", title: "Path to Roster", desc: "Top-performing interns are invited to join the MMC roster after completion. Over 40% of our current team started as interns." },
            ].map((perk, i) => (
              <FadeIn key={perk.title} delay={i * 0.06}>
                <div style={{
                  padding: "clamp(24px, 3vw, 36px)", border: `1px solid ${DS.border}`, height: "100%",
                  transition: "border-color 0.4s, background 0.4s",
                }}
                  onMouseEnter={(e) => { e.currentTarget.style.borderColor = DS.gold; e.currentTarget.style.background = DS.surfaceAlt; }}
                  onMouseLeave={(e) => { e.currentTarget.style.borderColor = DS.border; e.currentTarget.style.background = "transparent"; }}
                >
                  <div style={{ fontFamily: "'DM Sans'", fontSize: 28, color: DS.gold, marginBottom: 16, opacity: 0.7 }}>{perk.icon}</div>
                  <h3 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 22, fontWeight: 600, color: DS.text, marginBottom: 12 }}>{perk.title}</h3>
                  <p style={{ fontFamily: "'DM Sans'", fontSize: 14, color: DS.textSec, lineHeight: 1.65 }}>{perk.desc}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </div>

      {/* ── ELIGIBILITY ───────────────────────────────────────────── */}
      <div style={{ maxWidth: 1400, margin: "0 auto", padding: "100px 32px" }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "clamp(32px, 5vw, 80px)", alignItems: "start" }} className="chapter-grid">
          <div>
            <FadeIn>
              <div style={{ fontFamily: "'DM Sans'", fontSize: 12, color: DS.gold, textTransform: "uppercase", letterSpacing: "0.2em", marginBottom: 12 }}>Who Should Apply</div>
              <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(28px, 3.5vw, 42px)", fontWeight: 700, color: DS.text, lineHeight: 1.15, margin: "0 0 24px" }}>
                Eligibility + Requirements
              </h2>
            </FadeIn>
            <FadeIn delay={0.1}>
              <p style={{ fontFamily: "'DM Sans'", fontSize: "clamp(15px, 1.2vw, 17px)", color: DS.textSec, lineHeight: 1.75, marginBottom: 24 }}>
                We accept applications from college students, recent graduates, and career changers. No prior wedding industry experience required — we're looking for hunger, reliability, and a creative eye. If you show up ready to learn, we'll teach you the rest.
              </p>
            </FadeIn>
            <FadeIn delay={0.2}>
              <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                {[
                  "Currently enrolled in college or graduated within the last 2 years",
                  "Based in or willing to commute to Providence, RI metro area",
                  "Available for weekend events (primarily May–October)",
                  "Own a camera body for photography/videography tracks (entry-level is fine)",
                  "Portfolio or sample work — even personal projects count",
                  "Reliable transportation to venues across New England",
                ].map((req, i) => (
                  <div key={i} style={{ display: "flex", alignItems: "flex-start", gap: 10 }}>
                    <span style={{ width: 5, height: 5, background: DS.gold, borderRadius: "50%", flexShrink: 0, marginTop: 8 }} />
                    <span style={{ fontFamily: "'DM Sans'", fontSize: 15, color: DS.text, lineHeight: 1.6 }}>{req}</span>
                  </div>
                ))}
              </div>
            </FadeIn>
          </div>
          <div>
            <FadeIn delay={0.1}>
              <div style={{ border: `1px solid ${DS.border}`, padding: "clamp(28px, 3vw, 40px)" }}>
                <div style={{ fontFamily: "'DM Sans'", fontSize: 11, color: DS.gold, textTransform: "uppercase", letterSpacing: "0.15em", marginBottom: 20 }}>Application Windows</div>
                {[
                  { cohort: "Summer Cohort", dates: "Apply by March 15 — Program runs May–July", status: "Most Popular" },
                  { cohort: "Fall Cohort", dates: "Apply by August 1 — Program runs September–November", status: "Limited Spots" },
                  { cohort: "Winter Cohort", dates: "Apply by November 15 — Program runs January–March", status: "Studio Focus" },
                ].map((c, i) => (
                  <div key={c.cohort} style={{ padding: "16px 0", borderBottom: i < 2 ? `1px solid ${DS.border}` : "none" }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 8 }}>
                      <div style={{ fontFamily: "'Playfair Display', serif", fontSize: 18, fontWeight: 700, color: DS.text }}>{c.cohort}</div>
                      <span style={{ fontFamily: "'DM Sans'", fontSize: 11, color: DS.gold, textTransform: "uppercase", letterSpacing: "0.06em", border: `1px solid ${DS.gold}`, padding: "3px 10px", opacity: 0.7 }}>{c.status}</span>
                    </div>
                    <div style={{ fontFamily: "'DM Sans'", fontSize: 13, color: DS.textSec, marginTop: 4 }}>{c.dates}</div>
                  </div>
                ))}
              </div>
            </FadeIn>

            <FadeIn delay={0.2}>
              <div style={{ border: `1px solid ${DS.border}`, padding: "clamp(28px, 3vw, 40px)", marginTop: 24 }}>
                <div style={{ fontFamily: "'DM Sans'", fontSize: 11, color: DS.gold, textTransform: "uppercase", letterSpacing: "0.15em", marginBottom: 16 }}>Partner Institutions</div>
                <p style={{ fontFamily: "'DM Sans'", fontSize: 14, color: DS.textSec, lineHeight: 1.65, marginBottom: 16 }}>
                  We work with universities across New England to offer academic credit for qualifying students. Current partners include:
                </p>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                  {["URI", "RIC", "RISD", "Providence College", "Brown", "Salve Regina", "Bryant"].map((school) => (
                    <span key={school} style={{
                      fontFamily: "'DM Sans'", fontSize: 12, color: DS.textSec, padding: "5px 12px",
                      border: `1px solid ${DS.border}`, letterSpacing: "0.04em",
                    }}>{school}</span>
                  ))}
                </div>
              </div>
            </FadeIn>
          </div>
        </div>
      </div>

      {/* ── FAQ ────────────────────────────────────────────────────── */}
      <div style={{ borderTop: `1px solid ${DS.border}`, padding: "100px 32px", background: DS.surface }}>
        <div style={{ maxWidth: 800, margin: "0 auto" }}>
          <FadeIn>
            <div style={{ textAlign: "center", marginBottom: 48 }}>
              <div style={{ fontFamily: "'DM Sans'", fontSize: 12, color: DS.gold, textTransform: "uppercase", letterSpacing: "0.2em", marginBottom: 12 }}>Common Questions</div>
              <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(28px, 3.5vw, 42px)", fontWeight: 700, color: DS.text, margin: 0 }}>
                What You're Probably Wondering
              </h2>
            </div>
          </FadeIn>
          {[
            { q: "Do I need professional experience to apply?", a: "No. We're looking for potential, not polish. If you have a camera, some sample work (even from personal projects), and the drive to learn — that's enough. The whole point of the program is to bridge the gap between student and professional." },
            { q: "Is this a paid internship?", a: "Yes. All tracks include a per-event stipend. The amount varies by track and increases as you take on more responsibility throughout the program. We believe if you're contributing to client deliverables, you should be compensated." },
            { q: "Can I get college credit?", a: "Yes, if your institution allows it. We have existing partnerships with several Rhode Island universities and will work with your academic advisor to structure the experience for credit eligibility." },
            { q: "What happens after the 12 weeks?", a: "Top performers are invited to join the MMC roster as freelance team members. Even if you don't join the roster, you leave with a professional portfolio, industry connections, and a reference from one of New England's top wedding media companies." },
            { q: "How many interns do you accept per cohort?", a: "We keep cohorts small — typically 3 to 5 interns per cycle across all tracks. This ensures every intern gets meaningful mentorship and real event experience, not just a seat in the back of the room." },
            { q: "I'm not in Rhode Island. Can I still apply?", a: "The program is based in Providence with events across New England. You'll need to be able to commute to the studio and venues. We don't offer remote internships — the learning happens on-site." },
          ].map((faq, i) => (
            <FAQItem key={i} question={faq.q} answer={faq.a} index={i} />
          ))}
        </div>
      </div>

      {/* ── CTA ────────────────────────────────────────────────────── */}
      <div style={{ padding: "100px 32px", textAlign: "center", background: `linear-gradient(160deg, var(--mm-surface) 0%, var(--mm-surface-alt) 50%, ${DS.bg} 100%)` }}>
        <FadeIn>
          <div style={{ fontFamily: "'DM Sans'", fontSize: 12, color: DS.gold, textTransform: "uppercase", letterSpacing: "0.2em", marginBottom: 16 }}>Ready to Start?</div>
          <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(30px, 4.5vw, 52px)", fontWeight: 700, color: DS.text, lineHeight: 1.1, margin: "0 0 16px" }}>
            Your Career Starts Here
          </h2>
          <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 20, color: DS.textSec, fontStyle: "italic", marginBottom: 36, maxWidth: 500, margin: "0 auto 36px" }}>
            Applications are reviewed on a rolling basis. The sooner you apply, the better your chances.
          </p>
          <div style={{ display: "flex", gap: 16, justifyContent: "center", flexWrap: "wrap" }}>
            <a href="/contact" style={{
              fontFamily: "'DM Sans'", fontSize: 14, color: DS.bg, background: DS.ember,
              padding: "16px 40px", textDecoration: "none", textTransform: "uppercase", letterSpacing: "0.1em", fontWeight: 600, transition: "background 0.3s",
            }}
              onMouseEnter={(e) => e.target.style.background = "#ff6b3d"}
              onMouseLeave={(e) => e.target.style.background = DS.ember}
            >Apply Now</a>
            <a href="/academy" style={{
              fontFamily: "'DM Sans'", fontSize: 14, color: DS.gold, padding: "16px 40px", textDecoration: "none", textTransform: "uppercase", letterSpacing: "0.1em", fontWeight: 600,
              border: `1px solid ${DS.gold}`, transition: "all 0.3s",
            }}
              onMouseEnter={(e) => { e.target.style.background = DS.gold; e.target.style.color = DS.bg; }}
              onMouseLeave={(e) => { e.target.style.background = "transparent"; e.target.style.color = DS.gold; }}
            >Explore Academy</a>
          </div>
        </FadeIn>
      </div>

      <Footer />
    </div>
  );
}

/* ── FAQ Item ──────────────────────────────────────────────────── */

function FAQItem({ question, answer, index }) {
  const [open, setOpen] = useState(false);
  return (
    <FadeIn delay={index * 0.05}>
      <div style={{ borderBottom: `1px solid ${DS.border}` }}>
        <button onClick={() => setOpen(!open)} style={{
          width: "100%", display: "flex", justifyContent: "space-between", alignItems: "center",
          padding: "20px 0", background: "none", border: "none", cursor: "pointer", textAlign: "left",
        }}>
          <span style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(16px, 1.6vw, 19px)", fontWeight: 700, color: DS.text, paddingRight: 16 }}>{question}</span>
          <motion.span animate={{ rotate: open ? 45 : 0 }} transition={{ duration: 0.2 }}
            style={{ fontFamily: "'DM Sans'", fontSize: 22, color: DS.gold, flexShrink: 0, lineHeight: 1 }}>+</motion.span>
        </button>
        <AnimatePresence>
          {open && (
            <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.3 }} style={{ overflow: "hidden" }}>
              <p style={{ fontFamily: "'DM Sans'", fontSize: 14, color: DS.textSec, lineHeight: 1.7, paddingBottom: 20 }}>{answer}</p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </FadeIn>
  );
}
