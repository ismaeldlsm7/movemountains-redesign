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

/* ── Data ────────────────────────────────────────────────────────── */

const curriculum = [
  {
    month: "01–02",
    phase: "Foundation",
    title: "The Technical Core",
    modules: [
      "Camera systems, lenses, and lighting fundamentals",
      "Exposure, composition, and color theory for weddings",
      "Audio capture for ceremony and reception",
      "Editing workflows: Lightroom, Capture One, DaVinci Resolve",
    ],
    color: "#2a2218",
  },
  {
    month: "03–04",
    phase: "Craft",
    title: "The Wedding Playbook",
    modules: [
      "Timeline building and venue walkthroughs",
      "Posing and directing couples naturally",
      "Ceremony, reception, and detail shot strategies",
      "Working with second shooters and video teams",
    ],
    color: "#1e2024",
  },
  {
    month: "05–06",
    phase: "Field",
    title: "Live Event Experience",
    modules: [
      "Shadow shoots at real MMC weddings",
      "Second shooter assignments with feedback",
      "Real-time problem solving under pressure",
      "Client interaction and professional conduct",
    ],
    color: "#22201a",
  },
  {
    month: "07–08",
    phase: "Business",
    title: "Building Your Career",
    modules: [
      "Pricing, contracts, and business structure",
      "Portfolio curation and personal branding",
      "Social media strategy for photographers",
      "Client acquisition and relationship management",
    ],
    color: "#1a1e1a",
  },
  {
    month: "09",
    phase: "Launch",
    title: "Roster Qualification",
    modules: [
      "Lead shooter evaluation on a live event",
      "Portfolio review and final critique",
      "MMC shooting roster qualification assessment",
      "Graduation and career pathway planning",
    ],
    color: "#201e22",
  },
];

const instructors = [
  {
    name: "Tiahna Lynn",
    title: "Director of Photography",
    role: "Lead Instructor — Photography",
    bio: "Tiahna oversees the entire photography brand at Move Mountains Co. With a keen eye for detail and a passion for creativity, she ensures every image reflects the highest standards of excellence. Her approach blends technical mastery with emotional intuition — teaching students not just how to take photos, but how to see moments before they happen. Multiple couples have called her 'the MVP' of their wedding day.",
    quote: "I don't just teach photography. I teach people how to see the invisible moments that make a wedding unforgettable.",
    stats: { weddings: "300+", years: "7", graduates: "25+" },
    initial: "T",
    color: "#22201e",
  },
  {
    name: "Yan La Mort",
    title: "Talent Development & Videography",
    role: "Lead Instructor — Videography & Business",
    bio: "Yan is the visionary behind talent development at Move Mountains Co. and a gifted cinematographer in his own right. He designed the Academy curriculum from the ground up — not just covering technical skills, but building complete creative professionals. His teaching philosophy: learn by doing, fail fast, and never stop studying the craft. Graduates consistently credit Yan's mentorship as the turning point in their careers.",
    quote: "The wedding industry doesn't need more photographers. It needs storytellers who happen to carry cameras.",
    stats: { weddings: "150+", years: "5", graduates: "25+" },
    initial: "Y",
    color: "#201e22",
  },
];

const testimonials = [
  {
    name: "Academy Graduate",
    year: "Class of 2025",
    text: "Joining MMC Academy was a game-changer for my career and my business. The hands-on experience at real weddings gave me confidence I could never have gotten from YouTube tutorials alone.",
  },
  {
    name: "Academy Graduate",
    year: "Class of 2025",
    text: "Sean, the owner, has a deep understanding of the industry and its challenges. His insights have been invaluable in navigating client acquisition. What sets MMC apart is its personalized approach.",
  },
  {
    name: "Academy Graduate",
    year: "Class of 2024",
    text: "The business modules were worth the entire tuition alone. I left the program with a working portfolio, a pricing strategy, and three booked weddings. The shooting roster access sealed the deal.",
  },
];

const faqs = [
  { q: "Who is the Academy for?", a: "MMC Academy welcomes both beginners and experienced creatives. The program is designed to take you from wherever you are to wedding-ready — whether you've never shot a wedding or you're looking to level up from second shooter to lead." },
  { q: "What's the time commitment?", a: "The program runs 9 months. In-person students attend workshops and live shoots on a structured schedule. Online students follow the curriculum at their own pace with scheduled mentorship calls and required live shoot participation." },
  { q: "Is housing included?", a: "No, housing is not included in the program cost. In-person participants in Rhode Island are responsible for arranging their own accommodation." },
  { q: "Do I need my own equipment?", a: "You'll need a camera body and at least one lens to start. We provide detailed gear recommendations during onboarding, and MMC equipment is available for use during supervised shoots." },
  { q: "What happens after graduation?", a: "Graduates who meet the qualification standards are eligible for the MMC shooting roster — meaning real, paid wedding assignments through Move Mountains Co. This isn't theoretical; it's a career launchpad." },
  { q: "How do I apply?", a: "Fill out the application form below. We review applications on a rolling basis and schedule a video interview with every qualified candidate. Class sizes are kept small — typically 8–12 students per cohort." },
];

const programDetails = [
  { label: "Duration", value: "9 Months" },
  { label: "Format", value: "In-Person + Online" },
  { label: "Location", value: "Providence, RI" },
  { label: "Class Size", value: "8–12 Students" },
  { label: "Live Shoots", value: "10+ Events" },
  { label: "Outcome", value: "MMC Roster Eligible" },
];

/* ── Helpers ─────────────────────────────────────────────────────── */

function FadeIn({ children, delay = 0, y = 24 }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  return (
    <motion.div ref={ref} initial={{ opacity: 0, y }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.65, delay, ease: [0.25, 0.1, 0.25, 1] }}>
      {children}
    </motion.div>
  );
}

function RevealLine({ delay = 0 }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });
  return <motion.div ref={ref} initial={{ scaleX: 0 }} animate={inView ? { scaleX: 1 } : {}} transition={{ duration: 0.7, delay, ease: "easeOut" }} style={{ height: 1, background: DS.border, transformOrigin: "left" }} />;
}

function StatCounter({ value, suffix = "", label, delay = 0 }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-30px" });
  const [count, setCount] = useState(0);
  const numVal = parseInt(value);
  useEffect(() => {
    if (!inView || isNaN(numVal)) return;
    let s = 0; const dur = 1400; const step = (numVal / dur) * 16;
    const t = setInterval(() => { s += step; if (s >= numVal) { setCount(numVal); clearInterval(t); } else setCount(Math.floor(s)); }, 16);
    return () => clearInterval(t);
  }, [inView, numVal]);
  return (
    <motion.div ref={ref} initial={{ opacity: 0, y: 14 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.5, delay }} style={{ textAlign: "center" }}>
      <div style={{ fontFamily: "'Bebas Neue'", fontSize: "clamp(40px, 7vw, 64px)", color: DS.gold, lineHeight: 1 }}>{isNaN(numVal) ? value : count}{suffix}</div>
      <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 14, color: DS.textSec, letterSpacing: "0.12em", textTransform: "uppercase", marginTop: 6 }}>{label}</div>
    </motion.div>
  );
}

/* ── Nav ──────────────────────────────────────────────────────────── */

/* ── Instructor Card ─────────────────────────────────────────────── */

function InstructorCard({ instructor, index }) {
  const isReversed = index % 2 !== 0;

  return (
    <div style={{
      display: "grid", gridTemplateColumns: "380px 1fr", gap: "clamp(32px, 5vw, 64px)", alignItems: "start",
      padding: "64px 0",
    }} className="instructor-grid">
      {/* Portrait */}
      <div style={{ order: isReversed ? 2 : 1 }}>
        <FadeIn delay={0.05}>
          <div style={{
            width: "100%", aspectRatio: "3/4", background: instructor.color,
            display: "flex", alignItems: "center", justifyContent: "center", position: "relative", overflow: "hidden",
          }}>
            <span style={{ fontFamily: "'Playfair Display'", fontSize: 140, color: DS.gold, opacity: 0.06, fontWeight: 700, position: "absolute" }}>{instructor.initial}</span>
            <span style={{ fontFamily: "'DM Sans'", fontSize: 12, color: DS.textSec, opacity: 0.25, textTransform: "uppercase", letterSpacing: "0.15em", position: "relative" }}>[ Portrait ]</span>
          </div>

          {/* Stats */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 1, background: DS.border, marginTop: 1 }}>
            {Object.entries(instructor.stats).map(([key, val]) => (
              <div key={key} style={{ background: DS.surface, padding: "14px 10px", textAlign: "center" }}>
                <div style={{ fontFamily: "'Bebas Neue'", fontSize: 20, color: DS.gold, lineHeight: 1 }}>{val}</div>
                <div style={{ fontFamily: "'DM Sans'", fontSize: 9, color: DS.textSec, textTransform: "uppercase", letterSpacing: "0.08em", marginTop: 3 }}>{key}</div>
              </div>
            ))}
          </div>
        </FadeIn>
      </div>

      {/* Info */}
      <div style={{ order: isReversed ? 1 : 2 }}>
        <FadeIn delay={0.1}>
          <div style={{ fontFamily: "'DM Sans'", fontSize: 12, color: DS.gold, textTransform: "uppercase", letterSpacing: "0.18em", marginBottom: 10 }}>{instructor.role}</div>
          <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(30px, 3.5vw, 44px)", fontWeight: 700, color: DS.text, lineHeight: 1.1, margin: "0 0 6px" }}>
            {instructor.name}
          </h3>
          <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 20, color: DS.textSec, fontWeight: 500, marginBottom: 28 }}>{instructor.title}</div>
        </FadeIn>

        <FadeIn delay={0.15}>
          <RevealLine />
          <p style={{ fontFamily: "'DM Sans'", fontSize: 15, color: DS.textSec, lineHeight: 1.75, margin: "24px 0 28px" }}>{instructor.bio}</p>
        </FadeIn>

        <FadeIn delay={0.2}>
          <div style={{ padding: "24px 0 24px 24px", borderLeft: `2px solid ${DS.gold}` }}>
            <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(18px, 2vw, 24px)", color: DS.text, lineHeight: 1.5, fontStyle: "italic", margin: 0 }}>
              "{instructor.quote}"
            </p>
          </div>
        </FadeIn>
      </div>
    </div>
  );
}

/* ── Curriculum Timeline ─────────────────────────────────────────── */

function CurriculumTimeline() {
  const [activePhase, setActivePhase] = useState(0);

  return (
    <div>
      {/* Phase selector */}
      <div style={{ display: "flex", gap: 2, marginBottom: 40 }} className="phase-selector">
        {curriculum.map((c, i) => (
          <button key={c.phase} onClick={() => setActivePhase(i)} style={{
            flex: 1, padding: "16px 12px", background: activePhase === i ? DS.surfaceAlt : "transparent",
            border: "none", borderBottom: activePhase === i ? `2px solid ${DS.gold}` : `2px solid ${DS.border}`,
            cursor: "pointer", textAlign: "center", transition: "all 0.3s",
          }}>
            <div style={{ fontFamily: "'Bebas Neue'", fontSize: 14, color: DS.gold, opacity: activePhase === i ? 1 : 0.4, letterSpacing: "0.08em" }}>
              Month {c.month}
            </div>
            <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(14px, 1.3vw, 18px)", fontWeight: 600, color: activePhase === i ? DS.text : DS.textSec, marginTop: 4 }}>
              {c.phase}
            </div>
          </button>
        ))}
      </div>

      {/* Phase detail */}
      <AnimatePresence mode="wait">
        <motion.div key={activePhase} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.3 }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "clamp(24px, 4vw, 56px)", alignItems: "start" }} className="phase-detail">
            {/* Left: image */}
            <div style={{
              width: "100%", aspectRatio: "16/10", background: curriculum[activePhase].color,
              display: "flex", alignItems: "center", justifyContent: "center", position: "relative",
            }}>
              <span style={{ fontFamily: "'Bebas Neue'", fontSize: 100, color: DS.gold, opacity: 0.05, position: "absolute" }}>
                {curriculum[activePhase].month}
              </span>
              <span style={{ fontFamily: "'DM Sans'", fontSize: 11, color: DS.textSec, opacity: 0.25, textTransform: "uppercase", letterSpacing: "0.12em", position: "relative" }}>
                [ {curriculum[activePhase].phase} Phase ]
              </span>
            </div>

            {/* Right: content */}
            <div>
              <div style={{ fontFamily: "'DM Sans'", fontSize: 12, color: DS.gold, textTransform: "uppercase", letterSpacing: "0.15em", marginBottom: 10 }}>
                Months {curriculum[activePhase].month} · {curriculum[activePhase].phase} Phase
              </div>
              <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(24px, 3vw, 34px)", fontWeight: 700, color: DS.text, margin: "0 0 24px" }}>
                {curriculum[activePhase].title}
              </h3>

              {curriculum[activePhase].modules.map((m, i) => (
                <motion.div key={m} initial={{ opacity: 0, x: -8 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.06 }}
                  style={{ display: "flex", alignItems: "flex-start", gap: 12, padding: "12px 0", borderBottom: `1px solid ${DS.border}` }}>
                  <span style={{ fontFamily: "'Bebas Neue'", fontSize: 16, color: DS.gold, opacity: 0.5, marginTop: 2, flexShrink: 0, width: 24 }}>
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span style={{ fontFamily: "'DM Sans'", fontSize: 14, color: DS.text, lineHeight: 1.5 }}>{m}</span>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

/* ── Application Form ────────────────────────────────────────────── */

function ApplicationForm() {
  const [submitted, setSubmitted] = useState(false);
  const inputBase = {
    width: "100%", padding: "14px 16px", fontFamily: "'DM Sans'", fontSize: 14, color: DS.text,
    background: "rgba(30,30,30,0.5)", border: `1px solid ${DS.border}`, outline: "none", transition: "border-color 0.3s",
  };
  const labelStyle = { fontFamily: "'DM Sans'", fontSize: 11, color: DS.textSec, textTransform: "uppercase", letterSpacing: "0.1em", display: "block", marginBottom: 8 };
  const focus = (e) => e.target.style.borderColor = DS.gold;
  const blur = (e) => e.target.style.borderColor = DS.border;

  if (submitted) {
    return (
      <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} style={{ textAlign: "center", padding: "60px 0" }}>
        <div style={{ fontFamily: "'DM Sans'", fontSize: 48, color: DS.gold, marginBottom: 20 }}>✓</div>
        <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: 30, fontWeight: 700, color: DS.text, margin: "0 0 12px" }}>Application Received</h3>
        <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 20, color: DS.textSec, fontStyle: "italic" }}>
          We review every application personally. Expect to hear from us within 5 business days.
        </p>
      </motion.div>
    );
  }

  return (
    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }} className="app-form">
      <div>
        <label style={labelStyle}>Full Name</label>
        <input type="text" placeholder="Your name" style={inputBase} onFocus={focus} onBlur={blur} />
      </div>
      <div>
        <label style={labelStyle}>Email</label>
        <input type="email" placeholder="you@email.com" style={inputBase} onFocus={focus} onBlur={blur} />
      </div>
      <div>
        <label style={labelStyle}>Phone</label>
        <input type="tel" placeholder="(000) 000-0000" style={inputBase} onFocus={focus} onBlur={blur} />
      </div>
      <div>
        <label style={labelStyle}>Location</label>
        <input type="text" placeholder="City, State" style={inputBase} onFocus={focus} onBlur={blur} />
      </div>
      <div>
        <label style={labelStyle}>Experience Level</label>
        <select style={{ ...inputBase, appearance: "none", cursor: "pointer" }} onFocus={focus} onBlur={blur}>
          <option value="">Select...</option>
          <option>Complete Beginner</option>
          <option>Hobbyist / Self-Taught</option>
          <option>Some Professional Work</option>
          <option>Working Professional</option>
        </select>
      </div>
      <div>
        <label style={labelStyle}>Primary Interest</label>
        <select style={{ ...inputBase, appearance: "none", cursor: "pointer" }} onFocus={focus} onBlur={blur}>
          <option value="">Select...</option>
          <option>Photography</option>
          <option>Videography</option>
          <option>Both</option>
        </select>
      </div>
      <div>
        <label style={labelStyle}>Preferred Format</label>
        <select style={{ ...inputBase, appearance: "none", cursor: "pointer" }} onFocus={focus} onBlur={blur}>
          <option value="">Select...</option>
          <option>In-Person (Rhode Island)</option>
          <option>Online</option>
          <option>Either — I'm flexible</option>
        </select>
      </div>
      <div>
        <label style={labelStyle}>Portfolio Link</label>
        <input type="url" placeholder="Instagram, website, or drive link (optional)" style={inputBase} onFocus={focus} onBlur={blur} />
      </div>
      <div style={{ gridColumn: "1 / -1" }}>
        <label style={labelStyle}>Why MMC Academy?</label>
        <textarea rows={5} placeholder="What are your goals? What draws you to the wedding industry? What do you hope to learn?" style={{ ...inputBase, resize: "vertical" }} onFocus={focus} onBlur={blur} />
      </div>
      <div style={{ gridColumn: "1 / -1" }}>
        <button onClick={() => setSubmitted(true)} style={{
          fontFamily: "'DM Sans'", fontSize: 14, fontWeight: 600, color: DS.bg, background: DS.ember,
          border: "none", padding: "16px 0", cursor: "pointer", textTransform: "uppercase", letterSpacing: "0.1em",
          transition: "background 0.3s", width: "100%",
        }}
          onMouseEnter={(e) => e.target.style.background = "#ff6b3d"}
          onMouseLeave={(e) => e.target.style.background = DS.ember}
        >Submit Application</button>
        <p style={{ fontFamily: "'DM Sans'", fontSize: 12, color: DS.textSec, marginTop: 12, textAlign: "center" }}>
          Applications reviewed on a rolling basis. Class sizes are limited.
        </p>
      </div>
    </div>
  );
}

/* ── FAQ ──────────────────────────────────────────────────────────── */

function FAQ() {
  const [openIndex, setOpenIndex] = useState(null);
  return (
    <div>
      {faqs.map((faq, i) => (
        <FadeIn key={i} delay={i * 0.03}>
          <div style={{ borderBottom: `1px solid ${DS.border}` }}>
            <button onClick={() => setOpenIndex(openIndex === i ? null : i)} style={{
              width: "100%", padding: "20px 0", background: "none", border: "none", cursor: "pointer",
              display: "flex", justifyContent: "space-between", alignItems: "center", gap: 16, textAlign: "left",
            }}>
              <span style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 19, color: DS.text, fontWeight: 500 }}>{faq.q}</span>
              <motion.span animate={{ rotate: openIndex === i ? 45 : 0 }} transition={{ duration: 0.2 }}
                style={{ fontFamily: "'DM Sans'", fontSize: 20, color: DS.gold, flexShrink: 0, lineHeight: 1 }}>+</motion.span>
            </button>
            <AnimatePresence>
              {openIndex === i && (
                <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }} style={{ overflow: "hidden" }}>
                  <p style={{ fontFamily: "'DM Sans'", fontSize: 15, color: DS.textSec, lineHeight: 1.7, paddingBottom: 20, margin: 0 }}>{faq.a}</p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </FadeIn>
      ))}
    </div>
  );
}

/* ── Main Academy Page ───────────────────────────────────────────── */

export default function AcademyPage() {
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
        input::placeholder, textarea::placeholder { color: ${DS.textSec}; opacity: 0.45; }
        select { color: ${DS.textSec}; }
        select option { background: ${DS.surface}; color: ${DS.text}; }
        @media (max-width: 768px) {
          .nav-links { display: none !important; }
          .instructor-grid { grid-template-columns: 1fr !important; }
          .instructor-grid > * { order: unset !important; }
          .phase-detail { grid-template-columns: 1fr !important; }
          .phase-selector { flex-wrap: wrap !important; }
          .phase-selector button { flex: unset !important; width: calc(50% - 1px) !important; }
          .app-form { grid-template-columns: 1fr !important; }
          .program-grid { grid-template-columns: repeat(3, 1fr) !important; }
        }
      `}</style>

      <Header activePage="About" />

      {/* ── HERO ──────────────────────────────────────────────────── */}
      <div ref={heroRef} style={{ height: "68vh", minHeight: 460, maxHeight: 740, position: "relative", overflow: "hidden" }}>
        <motion.div style={{ scale: heroScale, position: "absolute", inset: 0 }}>
          <div style={{
            width: "100%", height: "100%",
            background: "linear-gradient(160deg, #1a1e1a 0%, #1e201c 40%, #161816 70%, #0f0f0f 100%)",
            display: "flex", alignItems: "center", justifyContent: "center",
          }}>
            <span style={{ fontFamily: "'DM Sans'", fontSize: 13, color: DS.textSec, opacity: 0.25, textTransform: "uppercase", letterSpacing: "0.2em" }}>
              [ Academy Workshop — Live Training Session ]
            </span>
          </div>
        </motion.div>

        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to bottom, rgba(15,15,15,0.25) 0%, rgba(15,15,15,0.1) 40%, rgba(15,15,15,0.8) 82%, var(--mm-bg) 100%)" }} />

        <motion.div style={{ opacity: heroOpacity, position: "absolute", bottom: "10%", left: 0, right: 0, padding: "0 32px" }}>
          <div style={{ maxWidth: 1000, margin: "0 auto" }}>
            <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5, duration: 0.7 }}>
              <div style={{ fontFamily: "'DM Sans'", fontSize: 12, color: DS.gold, textTransform: "uppercase", letterSpacing: "0.25em", marginBottom: 16 }}>
                Move Mountains Co.
              </div>
              <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(44px, 7vw, 84px)", fontWeight: 700, color: DS.text, lineHeight: 1, margin: "0 0 12px", letterSpacing: "-0.02em" }}>
                MMC <span style={{ color: DS.gold }}>Academy</span>
              </h1>
              <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(18px, 2.2vw, 26px)", color: DS.textSec, fontStyle: "italic" }}>
                Where the next generation of wedding creatives gets built.
              </p>
            </motion.div>
          </div>
        </motion.div>
      </div>

      {/* ── PROGRAM STATS ─────────────────────────────────────────── */}
      <div style={{ borderBottom: `1px solid ${DS.border}`, padding: "0 32px" }}>
        <div style={{ maxWidth: 1000, margin: "0 auto", display: "grid", gridTemplateColumns: "repeat(6, 1fr)", gap: 1, background: DS.border }} className="program-grid">
          {programDetails.map((d) => (
            <div key={d.label} style={{ background: DS.bg, padding: "20px 12px", textAlign: "center" }}>
              <div style={{ fontFamily: "'DM Sans'", fontSize: 10, color: DS.gold, textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: 4 }}>{d.label}</div>
              <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 16, fontWeight: 600, color: DS.text }}>{d.value}</div>
            </div>
          ))}
        </div>
      </div>

      {/* ── INTRO ─────────────────────────────────────────────────── */}
      <div style={{ maxWidth: 1000, margin: "0 auto", padding: "72px 32px" }}>
        <FadeIn>
          <div style={{ maxWidth: 720 }}>
            <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(20px, 2.5vw, 28px)", color: DS.text, lineHeight: 1.5, fontStyle: "italic", marginBottom: 24 }}>
              This isn't a weekend workshop. This isn't a YouTube tutorial playlist. MMC Academy is a 9-month, hands-on training program that turns aspiring creatives into working wedding professionals.
            </p>
            <p style={{ fontFamily: "'DM Sans'", fontSize: 16, color: DS.textSec, lineHeight: 1.75 }}>
              Developed by Move Mountains Co. — a studio with over 500 events annually, features in British Vogue and Brides Magazine, and 8 consecutive years as a Best of The Knot winner — the Academy gives you something no course can: real-world experience at real weddings, mentorship from working professionals, and a direct pathway to paid assignments on the MMC shooting roster.
            </p>
          </div>
        </FadeIn>
      </div>

      {/* ── STATS ─────────────────────────────────────────────────── */}
      <div style={{ background: DS.surface, borderTop: `1px solid ${DS.border}`, borderBottom: `1px solid ${DS.border}`, padding: "64px 32px" }}>
        <div style={{ maxWidth: 900, margin: "0 auto", display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(120px, 1fr))", gap: 32 }}>
          <StatCounter value="500" suffix="+" label="Events Annually" delay={0} />
          <StatCounter value="25" suffix="+" label="Graduates" delay={0.1} />
          <StatCounter value="9" suffix="" label="Month Program" delay={0.2} />
          <StatCounter value="10" suffix="+" label="Live Shoots" delay={0.3} />
          <StatCounter value="100" suffix="%" label="Roster Eligible" delay={0.4} />
        </div>
      </div>

      {/* ── INSTRUCTORS ───────────────────────────────────────────── */}
      <div style={{ maxWidth: 1100, margin: "0 auto", padding: "80px 32px 0" }}>
        <FadeIn>
          <div style={{ marginBottom: 16 }}>
            <div style={{ fontFamily: "'DM Sans'", fontSize: 12, color: DS.gold, textTransform: "uppercase", letterSpacing: "0.2em", marginBottom: 12 }}>Learn From the Best</div>
            <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(30px, 4vw, 48px)", fontWeight: 700, color: DS.text, margin: 0 }}>Your Instructors</h2>
          </div>
        </FadeIn>

        {instructors.map((inst, i) => (
          <div key={inst.name}>
            <InstructorCard instructor={inst} index={i} />
            {i < instructors.length - 1 && <RevealLine />}
          </div>
        ))}
      </div>

      {/* ── CURRICULUM ────────────────────────────────────────────── */}
      <div style={{ background: DS.surface, borderTop: `1px solid ${DS.border}`, borderBottom: `1px solid ${DS.border}`, padding: "80px 32px" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <FadeIn>
            <div style={{ textAlign: "center", marginBottom: 48 }}>
              <div style={{ fontFamily: "'DM Sans'", fontSize: 12, color: DS.gold, textTransform: "uppercase", letterSpacing: "0.2em", marginBottom: 12 }}>9-Month Journey</div>
              <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(30px, 4vw, 48px)", fontWeight: 700, color: DS.text, margin: 0 }}>Curriculum</h2>
            </div>
          </FadeIn>
          <FadeIn delay={0.1}>
            <CurriculumTimeline />
          </FadeIn>
        </div>
      </div>

      {/* ── TESTIMONIALS ──────────────────────────────────────────── */}
      <div style={{ padding: "80px 32px", maxWidth: 1100, margin: "0 auto" }}>
        <FadeIn>
          <div style={{ textAlign: "center", marginBottom: 48 }}>
            <div style={{ fontFamily: "'DM Sans'", fontSize: 12, color: DS.gold, textTransform: "uppercase", letterSpacing: "0.2em", marginBottom: 12 }}>From Our Graduates</div>
            <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(28px, 3.5vw, 42px)", fontWeight: 700, color: DS.text, margin: 0 }}>What They're Saying</h2>
          </div>
        </FadeIn>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 20 }}>
          {testimonials.map((t, i) => (
            <FadeIn key={i} delay={i * 0.08}>
              <div style={{ padding: "32px 28px", border: `1px solid ${DS.border}`, height: "100%", display: "flex", flexDirection: "column" }}>
                <div style={{ fontFamily: "'Playfair Display', serif", fontSize: 36, color: DS.gold, opacity: 0.2, lineHeight: 1, marginBottom: 8 }}>"</div>
                <p style={{ fontFamily: "'DM Sans'", fontSize: 14, color: DS.textSec, lineHeight: 1.7, flex: 1 }}>{t.text}</p>
                <div style={{ marginTop: 20, paddingTop: 16, borderTop: `1px solid ${DS.border}` }}>
                  <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 17, fontWeight: 600, color: DS.text }}>{t.name}</div>
                  <div style={{ fontFamily: "'DM Sans'", fontSize: 12, color: DS.gold, marginTop: 2 }}>{t.year}</div>
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>

      {/* ── FAQ ───────────────────────────────────────────────────── */}
      <div style={{ borderTop: `1px solid ${DS.border}`, padding: "80px 32px" }}>
        <div style={{ maxWidth: 800, margin: "0 auto" }}>
          <FadeIn>
            <div style={{ textAlign: "center", marginBottom: 40 }}>
              <div style={{ fontFamily: "'DM Sans'", fontSize: 12, color: DS.gold, textTransform: "uppercase", letterSpacing: "0.2em", marginBottom: 12 }}>Common Questions</div>
              <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(28px, 3.5vw, 42px)", fontWeight: 700, color: DS.text, margin: 0 }}>Academy FAQ</h2>
            </div>
          </FadeIn>
          <FAQ />
        </div>
      </div>

      {/* ── APPLICATION ───────────────────────────────────────────── */}
      <div id="apply" style={{ background: DS.surface, borderTop: `1px solid ${DS.border}`, borderBottom: `1px solid ${DS.border}`, padding: "100px 32px" }}>
        <div style={{ maxWidth: 800, margin: "0 auto" }}>
          <FadeIn>
            <div style={{ textAlign: "center", marginBottom: 48 }}>
              <div style={{ fontFamily: "'DM Sans'", fontSize: 12, color: DS.gold, textTransform: "uppercase", letterSpacing: "0.2em", marginBottom: 12 }}>Start Your Journey</div>
              <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(30px, 4vw, 48px)", fontWeight: 700, color: DS.text, margin: "0 0 12px" }}>Apply to MMC Academy</h2>
              <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 20, color: DS.textSec, fontStyle: "italic" }}>
                Class sizes are limited. Every application is reviewed personally.
              </p>
            </div>
          </FadeIn>
          <FadeIn delay={0.1}>
            <ApplicationForm />
          </FadeIn>
        </div>
      </div>

      {/* ── CTA ───────────────────────────────────────────────────── */}
      <div style={{ padding: "80px 32px", textAlign: "center" }}>
        <FadeIn>
          <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(20px, 2.5vw, 28px)", color: DS.text, lineHeight: 1.5, fontStyle: "italic", maxWidth: 600, margin: "0 auto 24px" }}>
            Not ready to apply? Follow our work and see the standard we're building.
          </p>
          <div style={{ display: "flex", gap: 16, justifyContent: "center", flexWrap: "wrap" }}>
            <a href="#" style={{
              fontFamily: "'DM Sans'", fontSize: 13, color: DS.gold, padding: "14px 28px", textDecoration: "none", textTransform: "uppercase", letterSpacing: "0.08em",
              border: `1px solid ${DS.gold}`, transition: "all 0.3s",
            }}
              onMouseEnter={(e) => { e.target.style.background = DS.gold; e.target.style.color = DS.bg; }}
              onMouseLeave={(e) => { e.target.style.background = "transparent"; e.target.style.color = DS.gold; }}
            >View Portfolio</a>
            <a href="#" style={{
              fontFamily: "'DM Sans'", fontSize: 13, color: DS.gold, padding: "14px 28px", textDecoration: "none", textTransform: "uppercase", letterSpacing: "0.08em",
              border: `1px solid ${DS.gold}`, transition: "all 0.3s",
            }}
              onMouseEnter={(e) => { e.target.style.background = DS.gold; e.target.style.color = DS.bg; }}
              onMouseLeave={(e) => { e.target.style.background = "transparent"; e.target.style.color = DS.gold; }}
            >Meet the Team</a>
            <a href="#" style={{
              fontFamily: "'DM Sans'", fontSize: 13, color: DS.textSec, padding: "14px 28px", textDecoration: "none", textTransform: "uppercase", letterSpacing: "0.08em",
              border: `1px solid ${DS.border}`, transition: "all 0.3s",
            }}
              onMouseEnter={(e) => { e.target.style.borderColor = DS.gold; e.target.style.color = DS.gold; }}
              onMouseLeave={(e) => { e.target.style.borderColor = DS.border; e.target.style.color = DS.textSec; }}
            >Follow @movemountainsco</a>
          </div>
        </FadeIn>
      </div>

      <Footer />
    </div>
  );
}
