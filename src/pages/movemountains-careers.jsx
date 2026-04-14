import { useState, useEffect, useRef } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import Header from "../components/Header";
import Footer from "../components/Footer";

const DS = { bg: "var(--mm-bg)", surface: "var(--mm-surface)", surfaceAlt: "var(--mm-surface-alt)", text: "var(--mm-text)", textSec: "var(--mm-text-sec)", gold: "var(--mm-gold)", ember: "var(--mm-ember)", border: "var(--mm-border)" };
const fontLink = "https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,700;1,400&family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;0,700;1,400;1,500&family=DM+Sans:wght@400;500;600;700&family=Bebas+Neue&display=swap";

function FadeIn({ children, delay = 0, y = 24 }) {
  const ref = useRef(null); const inView = useInView(ref, { once: true, margin: "-40px" });
  return <motion.div ref={ref} initial={{ opacity: 0, y }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.65, delay, ease: [0.25, 0.1, 0.25, 1] }}>{children}</motion.div>;
}

const positions = [
  { title: "Wedding Photographer", type: "Freelance / Per-Event", department: "Photography", description: "Join our shooting roster as a lead or second photographer. You'll cover weddings across New England with the MMC team, delivering editorial-quality images that match our visual standard.", requirements: ["2+ years wedding photography experience", "Strong portfolio of 3+ complete weddings", "Own professional camera body + 2 lenses minimum", "Available weekends May–October", "Reliable transportation", "Comfortable directing couples and bridal parties"], color: "#2a2218" },
  { title: "Wedding Videographer / Cinematographer", type: "Freelance / Per-Event", department: "Videography", description: "Create cinematic wedding films as part of the MMC video team. You'll work alongside our photographers to capture ceremony, reception, and highlight footage edited into modern, emotional films.", requirements: ["2+ years video production experience (weddings preferred)", "Proficiency in DaVinci Resolve or Premiere Pro", "Own cinema camera + audio capture equipment", "Strong sense of narrative and editing rhythm", "Available weekends May–October", "Experience with drone footage a plus"], color: "#1e2024" },
  { title: "Content Creator", type: "Freelance / Per-Event", department: "Content", description: "Capture vertical video and social-first content at weddings. You'll work independently from the main photo/video team, focused on behind-the-scenes moments, getting-ready energy, and real-time content for couples' social channels.", requirements: ["Experience creating Reels/TikTok content", "Strong smartphone + gimbal skills", "Eye for candid, authentic moments", "Fast turnaround — same-day delivery expected", "Understanding of social media trends and formats", "Comfortable working independently at events"], color: "#22201a" },
  { title: "Planning Coordinator", type: "Part-Time / Full-Time", department: "Operations", description: "Be the organizational backbone of MMC. You'll work directly with couples post-booking — building photo timelines, coordinating with venues and vendors, managing shot lists, and ensuring every wedding day runs smoothly from the MMC side.", requirements: ["Exceptional organizational and communication skills", "Experience in wedding planning or event coordination", "Comfortable managing multiple clients simultaneously", "Proficiency with project management tools", "Based in or near Providence, RI", "Available for some weekend on-site coordination"], color: "#1a1e1a" },
];

const values = [
  { title: "One Wedding Per Day", desc: "We never double-book. Your full creative energy goes to one couple." },
  { title: "Team Over Ego", desc: "Every shooter, coordinator, and editor is part of a crew — not a solo act." },
  { title: "Beyond the Camera", desc: "We carry dresses, buy umbrellas at 10pm, and hype up nervous couples. The job is bigger than photos." },
  { title: "Growth Is Built In", desc: "From Academy graduate to roster shooter to lead — there's a path here." },
];

function PositionCard({ position, index }) {
  const [expanded, setExpanded] = useState(false);
  return (
    <FadeIn delay={index * 0.08}>
      <div style={{ border: `1px solid ${DS.border}`, transition: "border-color 0.3s" }}
        onMouseEnter={(e) => e.currentTarget.style.borderColor = "rgba(201,169,110,0.3)"} onMouseLeave={(e) => e.currentTarget.style.borderColor = DS.border}>
        <div style={{ display: "grid", gridTemplateColumns: "80px 1fr", gap: 0 }} className="position-row">
          <div style={{ background: position.color, display: "flex", alignItems: "center", justifyContent: "center" }}>
            <span style={{ fontFamily: "'Playfair Display'", fontSize: 36, color: DS.gold, opacity: 0.1, fontWeight: 700 }}>{position.title[0]}</span>
          </div>
          <div style={{ padding: "24px" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: 12 }}>
              <div>
                <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: 22, fontWeight: 700, color: DS.text, margin: "0 0 4px" }}>{position.title}</h3>
                <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
                  <span style={{ fontFamily: "'DM Sans'", fontSize: 12, color: DS.gold, textTransform: "uppercase", letterSpacing: "0.08em" }}>{position.department}</span>
                  <span style={{ width: 3, height: 3, borderRadius: "50%", background: DS.border }} />
                  <span style={{ fontFamily: "'DM Sans'", fontSize: 12, color: DS.textSec }}>{position.type}</span>
                </div>
              </div>
              <button onClick={() => setExpanded(!expanded)} style={{
                fontFamily: "'DM Sans'", fontSize: 12, color: DS.gold, background: "none", border: `1px solid ${DS.gold}`,
                padding: "8px 16px", cursor: "pointer", textTransform: "uppercase", letterSpacing: "0.06em", transition: "all 0.3s",
              }}
                onMouseEnter={(e) => { e.target.style.background = DS.gold; e.target.style.color = DS.bg; }}
                onMouseLeave={(e) => { e.target.style.background = "transparent"; e.target.style.color = DS.gold; }}
              >{expanded ? "Close" : "View Details"}</button>
            </div>

            <AnimatePresence>
              {expanded && (
                <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.3 }} style={{ overflow: "hidden" }}>
                  <div style={{ paddingTop: 20, borderTop: `1px solid ${DS.border}`, marginTop: 16 }}>
                    <p style={{ fontFamily: "'DM Sans'", fontSize: 14, color: DS.textSec, lineHeight: 1.7, marginBottom: 20 }}>{position.description}</p>
                    <div style={{ fontFamily: "'DM Sans'", fontSize: 11, color: DS.gold, textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: 12 }}>Requirements</div>
                    {position.requirements.map((r, i) => (
                      <div key={i} style={{ display: "flex", alignItems: "flex-start", gap: 8, padding: "6px 0" }}>
                        <span style={{ width: 5, height: 5, background: DS.gold, borderRadius: "50%", flexShrink: 0, marginTop: 6 }} />
                        <span style={{ fontFamily: "'DM Sans'", fontSize: 13, color: DS.text, lineHeight: 1.5 }}>{r}</span>
                      </div>
                    ))}
                    <a href="#" style={{ fontFamily: "'DM Sans'", fontSize: 13, color: DS.bg, background: DS.ember, padding: "12px 28px", textDecoration: "none", textTransform: "uppercase", letterSpacing: "0.08em", fontWeight: 600, display: "inline-block", marginTop: 20, transition: "background 0.3s" }}
                      onMouseEnter={(e) => e.target.style.background = "#ff6b3d"} onMouseLeave={(e) => e.target.style.background = DS.ember}>Apply for This Role</a>
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

export default function CareersPage() {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => { const fn = () => setScrolled(window.scrollY > 40); window.addEventListener("scroll", fn); return () => window.removeEventListener("scroll", fn); }, []);

  return (
    <div style={{ background: DS.bg, color: DS.text, minHeight: "100vh" }}>
      <style>{`
        @import url('${fontLink}'); * { margin: 0; padding: 0; box-sizing: border-box; } body { background: ${DS.bg}; } ::selection { background: ${DS.gold}; color: ${DS.bg}; }
        @media (max-width: 768px) { .nav-links { display: none !important; } .position-row { grid-template-columns: 1fr !important; } .position-row > div:first-child { display: none !important; } .values-grid { grid-template-columns: 1fr !important; } }
      `}</style>
      <Header activePage="About" />

      <div style={{ paddingTop: 100, maxWidth: 1000, margin: "0 auto", padding: "100px 32px 0" }}>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.35 }}>
          <div style={{ fontFamily: "'DM Sans'", fontSize: 12, color: DS.gold, textTransform: "uppercase", letterSpacing: "0.2em", marginBottom: 12 }}>Join the Crew</div>
          <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(40px, 6vw, 72px)", fontWeight: 700, color: DS.text, lineHeight: 1.05, margin: "0 0 16px" }}>Careers</h1>
          <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(17px, 2vw, 22px)", color: DS.textSec, fontStyle: "italic", maxWidth: 550 }}>We're always looking for talented creatives who see the world the way we do. No egos — just people who love making moments.</p>
        </motion.div>
        <div style={{ height: 1, background: DS.border, marginTop: 32 }} />
      </div>

      {/* Values */}
      <div style={{ maxWidth: 1000, margin: "0 auto", padding: "48px 32px" }}>
        <FadeIn><div style={{ fontFamily: "'DM Sans'", fontSize: 12, color: DS.gold, textTransform: "uppercase", letterSpacing: "0.15em", marginBottom: 24 }}>What It's Like Here</div></FadeIn>
        <div className="values-grid" style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 16 }}>
          {values.map((v, i) => (
            <FadeIn key={v.title} delay={i * 0.06}>
              <div style={{ padding: "20px", border: `1px solid ${DS.border}`, height: "100%" }}>
                <h3 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 18, fontWeight: 600, color: DS.text, marginBottom: 8 }}>{v.title}</h3>
                <p style={{ fontFamily: "'DM Sans'", fontSize: 13, color: DS.textSec, lineHeight: 1.6 }}>{v.desc}</p>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>

      {/* Positions */}
      <div style={{ borderTop: `1px solid ${DS.border}`, padding: "64px 32px" }}>
        <div style={{ maxWidth: 1000, margin: "0 auto" }}>
          <FadeIn><div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: 32 }}>
            <div>
              <div style={{ fontFamily: "'DM Sans'", fontSize: 12, color: DS.gold, textTransform: "uppercase", letterSpacing: "0.15em", marginBottom: 8 }}>Open Positions</div>
              <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(28px, 3.5vw, 42px)", fontWeight: 700, color: DS.text, margin: 0 }}>Currently Hiring</h2>
            </div>
            <span style={{ fontFamily: "'Bebas Neue'", fontSize: 28, color: DS.gold }}>{positions.length} Roles</span>
          </div></FadeIn>
          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            {positions.map((p, i) => <PositionCard key={p.title} position={p} index={i} />)}
          </div>
        </div>
      </div>

      {/* Academy CTA */}
      <div style={{ background: DS.surface, borderTop: `1px solid ${DS.border}`, padding: "80px 32px", textAlign: "center" }}>
        <FadeIn>
          <div style={{ fontFamily: "'DM Sans'", fontSize: 12, color: DS.gold, textTransform: "uppercase", letterSpacing: "0.2em", marginBottom: 16 }}>Just Starting Out?</div>
          <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(28px, 3.5vw, 42px)", fontWeight: 700, color: DS.text, margin: "0 0 12px" }}>MMC Academy</h2>
          <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 20, color: DS.textSec, fontStyle: "italic", marginBottom: 28, maxWidth: 500, margin: "0 auto 28px" }}>Not ready for the roster yet? Our 9-month Academy program trains aspiring wedding creatives from the ground up — with a direct path to paid MMC assignments.</p>
          <a href="/academy" style={{ fontFamily: "'DM Sans'", fontSize: 14, color: DS.gold, padding: "14px 32px", textDecoration: "none", textTransform: "uppercase", letterSpacing: "0.08em", border: `1px solid ${DS.gold}`, display: "inline-block", transition: "all 0.3s" }}
            onMouseEnter={(e) => { e.target.style.background = DS.gold; e.target.style.color = DS.bg; }} onMouseLeave={(e) => { e.target.style.background = "transparent"; e.target.style.color = DS.gold; }}>Learn About Academy</a>
        </FadeIn>
      </div>

      <Footer />
    </div>
  );
}
