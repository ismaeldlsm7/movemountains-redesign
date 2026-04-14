import { useState, useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import { DS } from "../designSystem";

const fontLink = "https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,700;1,400&family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;0,700;1,400;1,500&family=DM+Sans:wght@400;500;600;700&family=Bebas+Neue&display=swap";

/* ── Wedding data ───────────────────────────────────────────────── */
const NAMES       = "Emma & James";
const WEDDING_STR = "2026-06-14";
const TIME_STR    = "4:00 PM";
const VENUE       = "The Rosecliff";
const LOCATION    = "Newport, Rhode Island";
const WEDDING_DT  = new Date("2026-06-14T16:00:00");

/* ── Time helpers ───────────────────────────────────────────────── */
function getTimeLeft() {
  const diff = WEDDING_DT - new Date();
  if (diff <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0, past: true };
  return {
    days:    Math.floor(diff / 86400000),
    hours:   Math.floor((diff % 86400000) / 3600000),
    minutes: Math.floor((diff % 3600000) / 60000),
    seconds: Math.floor((diff % 60000) / 1000),
    past: false,
  };
}

function fmtDate(str) {
  return new Date(str + "T12:00:00").toLocaleDateString("en-US", {
    weekday: "long", month: "long", day: "numeric", year: "numeric",
  });
}

/* ── Milestone config ───────────────────────────────────────────── */
const MILESTONES = {
  normal:  { hype: 0, badge: null,                           message: null,                                        ring: false, sparkles: 0 },
  day30:   { hype: 1, badge: "One month to go",              message: "One month from today, everything changes.",  ring: true,  sparkles: 0 },
  day14:   { hype: 2, badge: "Two weeks away",               message: "You can almost hear the music.",            ring: true,  sparkles: 3 },
  day7:    { hype: 3, badge: "One week to go",               message: "One week from today, you'll be married.",   ring: true,  sparkles: 5 },
  day3:    { hype: 4, badge: "Three days away",              message: "The butterflies are real. We're ready.",    ring: true,  sparkles: 7 },
  day1:    { hype: 5, badge: "Tomorrow is your wedding day", message: "Tomorrow morning, everything begins.",       ring: true,  sparkles: 10 },
  wedding: { hype: 6, badge: null,                           message: null,                                        ring: false, sparkles: 0 },
};

const DEMO_KEYS = ["normal", "day30", "day14", "day7", "day3", "day1", "wedding"];

function getMilestoneKey(days) {
  if (days <= 0)  return "wedding";
  if (days <= 1)  return "day1";
  if (days <= 3)  return "day3";
  if (days <= 7)  return "day7";
  if (days <= 14) return "day14";
  if (days <= 30) return "day30";
  return "normal";
}

/* ── Background gradient per hype level ─────────────────────────── */
const HYPE_BG = [
  "radial-gradient(ellipse at 50% 100%, #161008 0%, #080604 100%)",   // 0 normal
  "radial-gradient(ellipse at 50% 90%,  #1c1408 0%, #090705 100%)",   // 1 30 days
  "radial-gradient(ellipse at 50% 80%,  #221808 0%, #0a0806 100%)",   // 2 14 days
  "radial-gradient(ellipse at 50% 70%,  #28200a 0%, #0c0906 100%)",   // 3 7 days
  "radial-gradient(ellipse at 50% 55%,  #30260c 0%, #0e0b07 100%)",   // 4 3 days
  "radial-gradient(ellipse at 50% 40%,  #3c2e0e 0%, #120e07 100%)",   // 5 1 day
  "radial-gradient(ellipse at 50% 20%,  #4a3810 0%, #1a1408 100%)",   // 6 wedding
];

/* ── Confetti ───────────────────────────────────────────────────── */
const CONFETTI_COLORS = ["#c9a84c", "#e8d5a0", "#ffffff", "#f0e6c8", "#d4b87a", "#fff8e8", "#c9a84c88"];

function useConfetti(count = 70) {
  return useMemo(() => Array.from({ length: count }, (_, i) => ({
    id: i,
    left: Math.random() * 100,
    width: 4 + Math.random() * 8,
    height: Math.random() > 0.5 ? 4 + Math.random() * 8 : 2 + Math.random() * 4,
    color: CONFETTI_COLORS[Math.floor(Math.random() * CONFETTI_COLORS.length)],
    duration: 3 + Math.random() * 5,
    delay: -(Math.random() * 6), // negative delay = already falling
    rotate: Math.random() * 360,
    drift: (Math.random() - 0.5) * 60,
    isCircle: Math.random() > 0.6,
  })), []);
}

/* ── Digit component (animated flip) ───────────────────────────── */
function Digit({ value, label, hype }) {
  const size = `clamp(56px, ${hype >= 4 ? 16 : 13}vw, ${hype >= 4 ? 130 : 108}px)`;
  return (
    <div style={{ textAlign: "center", flex: 1 }}>
      <div style={{ position: "relative", height: `clamp(64px, ${hype >= 4 ? 17 : 14}vw, ${hype >= 4 ? 142 : 118}px)`, overflow: "hidden" }}>
        <AnimatePresence mode="popLayout">
          <motion.div
            key={value}
            initial={{ y: -24, opacity: 0, scale: 0.95 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            exit={{ y: 24, opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.18, ease: [0.25, 0.1, 0.25, 1] }}
            style={{
              position: "absolute", inset: 0,
              display: "flex", alignItems: "center", justifyContent: "center",
              fontFamily: "'Bebas Neue'", fontSize: size, color: DS.gold,
              lineHeight: 1, letterSpacing: "0.04em",
              textShadow: hype >= 3 ? `0 0 ${hype * 10}px ${DS.gold}60` : "none",
            }}
          >
            {String(value).padStart(2, "0")}
          </motion.div>
        </AnimatePresence>
      </div>
      <div style={{
        fontFamily: "'DM Sans'", fontSize: "clamp(8px, 1.5vw, 11px)",
        textTransform: "uppercase", letterSpacing: "0.2em", color: DS.textSec,
        marginTop: 4,
      }}>
        {label}
      </div>
    </div>
  );
}

/* ── Sparkle ornaments ──────────────────────────────────────────── */
function Sparkles({ count }) {
  const items = useMemo(() => Array.from({ length: count }, (_, i) => ({
    id: i,
    symbol: i % 3 === 0 ? "✦" : i % 3 === 1 ? "✧" : "·",
    x: 10 + Math.random() * 80,
    y: 10 + Math.random() * 80,
    size: 10 + Math.random() * 14,
    delay: Math.random() * 2,
    duration: 1.5 + Math.random() * 2,
  })), [count]);

  return (
    <div style={{ position: "absolute", inset: 0, pointerEvents: "none", overflow: "hidden" }}>
      {items.map((s) => (
        <motion.span
          key={s.id}
          animate={{ scale: [0.7, 1.2, 0.7], opacity: [0.2, 0.9, 0.2] }}
          transition={{ repeat: Infinity, duration: s.duration, delay: s.delay, ease: "easeInOut" }}
          style={{
            position: "absolute", left: `${s.x}%`, top: `${s.y}%`,
            fontSize: s.size, color: DS.gold, transform: "translate(-50%, -50%)",
          }}
        >
          {s.symbol}
        </motion.span>
      ))}
    </div>
  );
}

/* ── Ring glow ──────────────────────────────────────────────────── */
function RingGlow({ hype }) {
  const intensity = (hype - 1) * 0.25;
  return (
    <motion.div
      animate={{
        boxShadow: [
          `0 0 ${20 + hype * 15}px ${hype * 8}px ${DS.gold}${Math.floor(intensity * 80).toString(16).padStart(2, "0")}`,
          `0 0 ${40 + hype * 20}px ${hype * 12}px ${DS.gold}${Math.floor(intensity * 40).toString(16).padStart(2, "0")}`,
          `0 0 ${20 + hype * 15}px ${hype * 8}px ${DS.gold}${Math.floor(intensity * 80).toString(16).padStart(2, "0")}`,
        ],
      }}
      transition={{ repeat: Infinity, duration: 2 + (6 - hype) * 0.4, ease: "easeInOut" }}
      style={{
        position: "absolute", inset: -24,
        borderRadius: 24, pointerEvents: "none",
        border: `1px solid ${DS.gold}${Math.floor(intensity * 50 + 20).toString(16).padStart(2, "0")}`,
      }}
    />
  );
}

/* ── Wedding day celebration ────────────────────────────────────── */
function WeddingDayCelebration({ hideDemo }) {
  const particles = useConfetti(80);
  return (
    <div style={{
      position: "relative", minHeight: "100vh", overflow: "hidden",
      display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
      background: HYPE_BG[6], padding: "40px 24px",
    }}>
      {/* Confetti particles */}
      {particles.map((p) => (
        <div
          key={p.id}
          style={{
            position: "fixed",
            left: `${p.left}%`,
            top: 0,
            width: p.width,
            height: p.height,
            background: p.color,
            borderRadius: p.isCircle ? "50%" : 2,
            animation: `confetti-fall ${p.duration}s ${p.delay}s linear infinite`,
            transform: `rotate(${p.rotate}deg)`,
            "--drift": `${p.drift}px`,
            pointerEvents: "none",
            zIndex: 1,
          }}
        />
      ))}

      {/* Content — screenshot focal point */}
      <div style={{ position: "relative", zIndex: 2, textAlign: "center", maxWidth: 560 }}>
        {/* Ornament top */}
        <motion.div
          animate={{ opacity: [0.4, 1, 0.4] }}
          transition={{ repeat: Infinity, duration: 2.5, ease: "easeInOut" }}
          style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 28, color: DS.gold, letterSpacing: "0.3em", marginBottom: 32 }}
        >
          ✦ ✦ ✦
        </motion.div>

        {/* "Today is your wedding day" */}
        <div style={{ fontFamily: "'DM Sans'", fontSize: "clamp(10px, 2vw, 13px)", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.28em", color: DS.gold, marginBottom: 20 }}>
          Today is your wedding day
        </div>

        {/* Couple names — main focal point */}
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1.2, ease: [0.25, 0.1, 0.25, 1] }}
          style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(44px, 10vw, 88px)", fontWeight: 400, color: "#f5e6c8", lineHeight: 1.1, marginBottom: 24, textShadow: `0 0 60px ${DS.gold}40` }}
        >
          {NAMES}
        </motion.div>

        {/* Date */}
        <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(18px, 3.5vw, 26px)", color: DS.gold, fontStyle: "italic", marginBottom: 12, letterSpacing: "0.04em" }}>
          {fmtDate(WEDDING_STR)}
        </div>

        {/* Venue */}
        <div style={{ fontFamily: "'DM Sans'", fontSize: "clamp(12px, 2vw, 15px)", color: DS.textSec, letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 8 }}>
          {VENUE}
        </div>
        <div style={{ fontFamily: "'DM Sans'", fontSize: "clamp(11px, 1.8vw, 13px)", color: `${DS.textSec}88`, letterSpacing: "0.08em", marginBottom: 40 }}>
          {LOCATION} · Ceremony at {TIME_STR}
        </div>

        {/* Ornament bottom */}
        <motion.div
          animate={{ opacity: [0.4, 1, 0.4] }}
          transition={{ repeat: Infinity, duration: 3, ease: "easeInOut", delay: 0.8 }}
          style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 24, color: `${DS.gold}88`, letterSpacing: "0.3em" }}
        >
          ✧ ✧ ✧
        </motion.div>

        {/* Screenshot hint */}
        {!hideDemo && (
          <motion.div
            animate={{ opacity: [0.3, 0.7, 0.3] }}
            transition={{ repeat: Infinity, duration: 2.5, ease: "easeInOut" }}
            style={{ marginTop: 48, fontFamily: "'DM Sans'", fontSize: 11, color: `${DS.textSec}60`, textTransform: "uppercase", letterSpacing: "0.14em" }}
          >
            Screenshot to save this moment ↓
          </motion.div>
        )}
      </div>
    </div>
  );
}

/* ── Main countdown view ────────────────────────────────────────── */
function CountdownView({ time, milestoneKey, m }) {
  const hype = m.hype;
  return (
    <div style={{
      position: "relative", minHeight: "100vh", overflow: "hidden",
      display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
      background: HYPE_BG[hype], padding: "40px 24px",
    }}>
      {/* Background sparkles at higher hype */}
      {m.sparkles > 0 && <Sparkles count={m.sparkles} />}

      <div style={{ position: "relative", zIndex: 2, width: "100%", maxWidth: 680, textAlign: "center" }}>

        {/* Couple names */}
        <motion.div
          animate={hype >= 4 ? { textShadow: [`0 0 20px ${DS.gold}30`, `0 0 50px ${DS.gold}60`, `0 0 20px ${DS.gold}30`] } : {}}
          transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
          style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(22px, 5vw, 42px)", fontWeight: 400, color: "#f0e0c0", marginBottom: 8, letterSpacing: "0.04em" }}
        >
          {NAMES}
        </motion.div>

        <div style={{ fontFamily: "'DM Sans'", fontSize: "clamp(10px, 1.8vw, 12px)", color: DS.textSec, textTransform: "uppercase", letterSpacing: "0.2em", marginBottom: hype > 0 ? 28 : 40 }}>
          {fmtDate(WEDDING_STR)}
        </div>

        {/* Milestone badge */}
        <AnimatePresence mode="wait">
          {m.badge && (
            <motion.div
              key={milestoneKey + "-badge"}
              initial={{ opacity: 0, y: -10, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.4 }}
              style={{ marginBottom: 24 }}
            >
              <motion.div
                animate={{ scale: hype >= 4 ? [1, 1.04, 1] : 1 }}
                transition={{ repeat: Infinity, duration: 1.8, ease: "easeInOut" }}
                style={{
                  display: "inline-block", padding: "7px 22px",
                  borderRadius: 24, border: `1px solid ${DS.gold}${hype >= 4 ? "88" : "44"}`,
                  background: `${DS.gold}${hype >= 4 ? "18" : "0c"}`,
                  fontFamily: "'DM Sans'", fontSize: "clamp(10px, 1.8vw, 13px)",
                  fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase",
                  color: DS.gold,
                }}
              >
                ✦ {m.badge} ✦
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Countdown digits */}
        <div style={{ position: "relative", marginBottom: hype > 0 ? 28 : 40 }}>
          {m.ring && <RingGlow hype={hype} />}
          <div style={{
            display: "flex", justifyContent: "center", alignItems: "flex-start",
            gap: "clamp(8px, 3vw, 32px)", padding: "clamp(16px, 4vw, 32px) clamp(16px, 4vw, 40px)",
            position: "relative",
          }}>
            <Digit value={time.days}    label="Days"    hype={hype} />
            <div style={{ fontFamily: "'Bebas Neue'", fontSize: "clamp(40px, 10vw, 80px)", color: `${DS.gold}60`, lineHeight: "1.1", marginTop: 4 }}>:</div>
            <Digit value={time.hours}   label="Hours"   hype={hype} />
            <div style={{ fontFamily: "'Bebas Neue'", fontSize: "clamp(40px, 10vw, 80px)", color: `${DS.gold}60`, lineHeight: "1.1", marginTop: 4 }}>:</div>
            <Digit value={time.minutes} label="Minutes" hype={hype} />
            <div style={{ fontFamily: "'Bebas Neue'", fontSize: "clamp(40px, 10vw, 80px)", color: `${DS.gold}60`, lineHeight: "1.1", marginTop: 4 }}>:</div>
            <Digit value={time.seconds} label="Seconds" hype={hype} />
          </div>
        </div>

        {/* Milestone message */}
        <AnimatePresence mode="wait">
          {m.message && (
            <motion.div
              key={milestoneKey + "-msg"}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(17px, 3vw, 26px)", color: "#d4b87a", fontStyle: "italic", lineHeight: 1.5, marginBottom: 32 }}
            >
              {m.message}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Venue */}
        <div style={{ fontFamily: "'DM Sans'", fontSize: "clamp(10px, 1.6vw, 12px)", color: DS.textSec, textTransform: "uppercase", letterSpacing: "0.16em", opacity: 0.7 }}>
          {VENUE} · {LOCATION}
        </div>
      </div>
    </div>
  );
}

/* ── Demo bar ───────────────────────────────────────────────────── */
const DEMO_LABELS = { normal: ">30d", day30: "30d", day14: "14d", day7: "7d", day3: "3d", day1: "1d", wedding: "Day ✦" };

function DemoBar({ demoKey, onSet, hidden, onHide }) {
  if (hidden) return null;
  return (
    <div style={{
      position: "fixed", bottom: 0, left: 0, right: 0, zIndex: 100,
      padding: "10px 16px", background: "rgba(0,0,0,0.75)", backdropFilter: "blur(8px)",
      borderTop: "1px solid rgba(255,255,255,0.08)",
      display: "flex", alignItems: "center", gap: 8, flexWrap: "wrap", justifyContent: "center",
    }}>
      <span style={{ fontFamily: "'DM Sans'", fontSize: 9, color: "rgba(255,255,255,0.3)", textTransform: "uppercase", letterSpacing: "0.12em", marginRight: 4 }}>
        Preview
      </span>
      {DEMO_KEYS.map((k) => (
        <button key={k} onClick={() => onSet(demoKey === k ? null : k)} style={{
          padding: "4px 10px", borderRadius: 4, border: "1px solid",
          borderColor: demoKey === k ? DS.gold : "rgba(255,255,255,0.15)",
          background: demoKey === k ? `${DS.gold}20` : "transparent",
          color: demoKey === k ? DS.gold : "rgba(255,255,255,0.35)",
          fontFamily: "'DM Sans'", fontSize: 10, cursor: "pointer", fontWeight: 600,
        }}>
          {DEMO_LABELS[k]}
        </button>
      ))}
      <button onClick={onHide} style={{ marginLeft: 8, padding: "4px 8px", borderRadius: 4, border: "1px solid rgba(255,255,255,0.1)", background: "transparent", color: "rgba(255,255,255,0.2)", fontFamily: "'DM Sans'", fontSize: 10, cursor: "pointer" }}>
        Hide for screenshot
      </button>
    </div>
  );
}

/* ── CSS for confetti ───────────────────────────────────────────── */
const CSS = `
  @import url('${fontLink}');
  * { box-sizing: border-box; margin: 0; padding: 0; }
  @keyframes confetti-fall {
    0%   { transform: translateY(-40px) rotate(var(--r, 0deg)) translateX(0); opacity: 1; }
    80%  { opacity: 0.8; }
    100% { transform: translateY(110vh) rotate(calc(var(--r, 0deg) + 1080deg)) translateX(var(--drift, 0px)); opacity: 0; }
  }
`;

/* ── Page root ──────────────────────────────────────────────────── */
export default function WeddingCountdown() {
  const [time, setTime] = useState(getTimeLeft());
  const [demoKey, setDemoKey]   = useState(null);
  const [demoHidden, setDemoHidden] = useState(false);

  useEffect(() => {
    const id = setInterval(() => setTime(getTimeLeft()), 1000);
    return () => clearInterval(id);
  }, []);

  const milestoneKey = demoKey || getMilestoneKey(time.days);
  const m = MILESTONES[milestoneKey];
  const isWedding = milestoneKey === "wedding";

  return (
    <>
      <style>{CSS}</style>

      {/* Back link — fixed top-left, fully separated from the countdown */}
      <Link
        to="/my-wedding"
        style={{
          position: "fixed", top: 20, left: 24, zIndex: 200,
          fontFamily: "'DM Sans'", fontSize: 11, color: "rgba(255,255,255,0.28)",
          textDecoration: "none", display: "flex", alignItems: "center", gap: 5,
          textTransform: "uppercase", letterSpacing: "0.14em",
          transition: "color 0.2s, opacity 0.2s",
        }}
        onMouseEnter={(e) => { e.currentTarget.style.color = DS.gold; }}
        onMouseLeave={(e) => { e.currentTarget.style.color = "rgba(255,255,255,0.28)"; }}
      >
        ← Portal
      </Link>

      <AnimatePresence mode="wait">
        {isWedding ? (
          <motion.div key="wedding" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1 }}>
            <WeddingDayCelebration hideDemo={demoHidden} />
          </motion.div>
        ) : (
          <motion.div key={milestoneKey} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.6 }}>
            <CountdownView time={time} milestoneKey={milestoneKey} m={m} />
          </motion.div>
        )}
      </AnimatePresence>
      <DemoBar demoKey={demoKey} onSet={setDemoKey} hidden={demoHidden} onHide={() => setDemoHidden(true)} />
    </>
  );
}
