import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { DS } from "../components/designSystem";

const fontLink = "https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,700;1,400&family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;0,700;1,400;1,500&family=DM+Sans:wght@400;500;600;700&family=Bebas+Neue&display=swap";

// Confetti particle component
function Confetti() {
  const [particles] = useState(() =>
    Array.from({ length: 60 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      delay: Math.random() * 1.5,
      duration: 2 + Math.random() * 2,
      size: 4 + Math.random() * 8,
      rotation: Math.random() * 360,
      color: ["#c8a951", "#d4af37", "#e8d5a3", "#f5e6c8", "#b8941f", "#ffffff"][Math.floor(Math.random() * 6)],
      shape: Math.random() > 0.5 ? "circle" : "rect",
    }))
  );

  return (
    <div style={{ position: "fixed", top: 0, left: 0, right: 0, bottom: 0, pointerEvents: "none", zIndex: 10000, overflow: "hidden" }}>
      {particles.map((p) => (
        <motion.div
          key={p.id}
          initial={{ y: -20, x: `${p.x}vw`, rotate: 0, opacity: 1 }}
          animate={{ y: "110vh", rotate: p.rotation + 720, opacity: [1, 1, 0.8, 0] }}
          transition={{ duration: p.duration, delay: p.delay, ease: "easeIn" }}
          style={{
            position: "absolute", top: 0,
            width: p.shape === "circle" ? p.size : p.size * 0.6,
            height: p.size,
            borderRadius: p.shape === "circle" ? "50%" : 1,
            background: p.color,
          }}
        />
      ))}
    </div>
  );
}

const timeline = [
  { icon: "◎", title: "Welcome Email", desc: "Within 24 hours you'll receive your welcome guide and portal access." },
  { icon: "◇", title: "Pre-Wedding Questionnaire", desc: "Complete your vision questionnaire to help us plan your coverage." },
  { icon: "✦", title: "Planning Call", desc: "We'll schedule a call 4–6 weeks before your wedding to finalize details." },
  { icon: "▣", title: "Your Wedding Day", desc: "We arrive early, stay late, and capture every moment in between." },
  { icon: "□", title: "Sneak Peek", desc: "20–30 hand-edited images delivered within 3–5 days." },
  { icon: "○", title: "Full Delivery", desc: "Complete gallery in 6–8 weeks. Films in 8–14 weeks." },
];

export default function BookingConfirmed() {
  const [showConfetti, setShowConfetti] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setShowConfetti(false), 5000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div style={{ background: DS.bg, color: DS.text, minHeight: "100vh" }}>
      <style>{`
        @import url('${fontLink}');
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body { background: ${DS.bg}; }
        ::selection { background: ${DS.gold}; color: ${DS.bg}; }
        .fill-up-btn { color: ${DS.ember} !important; background: transparent !important; border: 1px solid ${DS.ember}; transition: color 0.45s cubic-bezier(0.65, 0, 0.35, 1); }
        .fill-up-btn::before { content: ""; position: absolute; left: 0; right: 0; bottom: 0; height: 100%; background: ${DS.ember}; transform: translateY(100%); transition: transform 0.45s cubic-bezier(0.65, 0, 0.35, 1); z-index: 0; }
        .fill-up-btn:hover::before { transform: translateY(0); }
        .fill-up-btn:hover { color: ${DS.bg} !important; }
        .cta-rollover .cta-char-top { color: ${DS.ember}; }
        .cta-rollover .cta-char-bot { color: #fff; }
        .cta-rollover:hover .cta-char-top { transform: translateY(-120%) !important; }
        .cta-rollover:hover .cta-char-bot { transform: translateY(0) !important; }
      `}</style>

      {showConfetti && <Confetti />}

      <Header />

      <div style={{ maxWidth: 700, margin: "0 auto", padding: "140px clamp(20px, 4vw, 48px) 80px", textAlign: "center" }}>
        {/* Celebration header */}
        <motion.div initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}>
          <div style={{ fontSize: 56, marginBottom: 16 }}>✦</div>
          <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(32px, 5vw, 52px)", fontWeight: 400, marginBottom: 12 }}>
            You're <span style={{ fontStyle: "italic", color: DS.gold }}>booked</span>
          </h1>
          <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(18px, 2.5vw, 22px)", color: DS.textSec, lineHeight: 1.6, maxWidth: 500, margin: "0 auto" }}>
            Your date is officially secured. We can't wait to be part of your story.
          </p>
        </motion.div>

        {/* Confirmation card */}
        <motion.div initial={{ y: 24, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.3, duration: 0.5 }}
          style={{
            margin: "48px auto", padding: "32px", background: DS.surface,
            border: `1px solid ${DS.gold}33`, borderRadius: 12, maxWidth: 440,
          }}>
          <div style={{ fontFamily: "'DM Sans'", fontSize: 12, color: DS.gold, textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: 8 }}>
            Booking Confirmed
          </div>
          <div style={{ fontFamily: "'DM Sans'", fontSize: 14, color: DS.textSec, marginBottom: 4 }}>
            Confirmation will be sent to your email shortly.
          </div>
          <div style={{
            margin: "16px 0", padding: "16px", background: `${DS.gold}08`, borderRadius: 8,
            fontFamily: "'DM Sans'", fontSize: 13, color: DS.gold,
          }}>
            ✓ Retainer received — your date is secured
          </div>
        </motion.div>

        {/* What happens next */}
        <motion.div initial={{ y: 24, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.5, duration: 0.5 }}>
          <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 28, fontWeight: 400, marginBottom: 32 }}>
            What happens next
          </h2>
          <div style={{ textAlign: "left" }}>
            {timeline.map((item, i) => (
              <motion.div key={item.title} initial={{ x: -16, opacity: 0 }} animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.6 + i * 0.1 }}
                style={{
                  display: "flex", gap: 20, padding: "20px 0",
                  borderBottom: i < timeline.length - 1 ? `1px solid ${DS.border}` : "none",
                }}>
                <div style={{
                  width: 40, height: 40, borderRadius: "50%", border: `1px solid ${DS.gold}33`,
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontSize: 16, color: DS.gold, flexShrink: 0,
                }}>
                  {item.icon}
                </div>
                <div>
                  <div style={{ fontFamily: "'DM Sans'", fontSize: 15, fontWeight: 600, marginBottom: 4 }}>
                    {item.title}
                  </div>
                  <div style={{ fontFamily: "'DM Sans'", fontSize: 13, color: DS.textSec, lineHeight: 1.5 }}>
                    {item.desc}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Portal CTA */}
        <motion.div initial={{ y: 24, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 1.2, duration: 0.5 }}
          style={{ marginTop: 48 }}>
          <Link to="/my-wedding" style={{
            display: "inline-block", padding: "18px 48px",
            background: `linear-gradient(135deg, ${DS.gold}, ${DS.ember})`,
            borderRadius: 8, textDecoration: "none",
            fontFamily: "'DM Sans'", fontSize: 15, fontWeight: 600,
            color: "#fff", textTransform: "uppercase", letterSpacing: "0.06em",
          }}>
            Access Your Wedding Portal →
          </Link>
          <p style={{ fontFamily: "'DM Sans'", fontSize: 13, color: DS.textSec, marginTop: 12 }}>
            View your timeline, complete your questionnaire, and manage everything in one place.
          </p>
        </motion.div>
      </div>

      <Footer />
    </div>
  );
}
