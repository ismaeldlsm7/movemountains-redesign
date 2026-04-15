/**
 * CinemaTransition
 *
 * A cinematic entrance overlay for the private gallery — triggered when a
 * client clicks "View Films" or "Browse Photos" from the gallery cover page.
 *
 * Three-beat sequence (total ~6.3 s):
 *
 *   covering  (0–900 ms)   — velvet curtains close from both sides, lights out
 *   title     (900–5300 ms) — studio label → couple name reveal → gold rule → subtitle
 *                             with a slow pull-back zoom on the title card
 *   revealing (5300–6300 ms) — curtains part, daylight returns
 *
 * Props
 *   isOpen   boolean           mount/unmount guard
 *   to       string            react-router target path
 *   couple   string            couple names (e.g. "Anthony & Justine")
 *   type     'film' | 'photo'  controls subtitle copy
 *   onDone   () => void        called after reveal completes — parent resets state
 */

import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

// ── Timing constants (ms) ─────────────────────────────────────────────────────
const COVER_MS    = 900;   // curtains close + backdrop fades in
const NAVIGATE_AT = 540;   // route swap fires while screen is still dark
const TITLE_MS    = 4400;  // full title-card window (long enough to breathe)
const REVEAL_MS   = 1000;  // curtains open + backdrop fades out

// Title-card beat offsets (relative to entering 'title' phase)
const T_STUDIO_IN  = 0;
const T_STUDIO_OUT = 1200;   // studio label held for 1.2 s
const T_NAME_IN    = 1400;   // couple name starts revealing
const T_RULE_IN    = 3100;   // gold rule — after the longest name has finished
const T_SUB_IN     = 3450;   // subtitle fades in
// Hold until TITLE_MS (4400 ms), then fade everything and reveal.

// Shared easing — matches DiaphragmTransition
const SLIDE_EASE = [0.76, 0, 0.24, 1];
const FADE_EASE  = [0.25, 0.1, 0.25, 1];
// Very slow deceleration — used for the pull-back zoom
const ZOOM_EASE  = [0.12, 0, 0.2, 1];

// ── Character-reveal text ─────────────────────────────────────────────────────
function CharReveal({ text, delay = 0 }) {
  return (
    <span aria-label={text}>
      {[...text].map((ch, i) => (
        <motion.span
          key={i}
          initial={{ opacity: 0, y: 22 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.68,
            delay: delay + i * 0.048,
            ease: FADE_EASE,
          }}
          style={{ display: "inline-block" }}
        >
          {ch === " " ? "\u00A0" : ch}
        </motion.span>
      ))}
    </span>
  );
}

// ── Gold rule ─────────────────────────────────────────────────────────────────
function GoldRule({ visible }) {
  return (
    <motion.div
      initial={{ width: 0, opacity: 0 }}
      animate={visible ? { width: 44, opacity: 1 } : { width: 0, opacity: 0 }}
      transition={{ duration: 0.5, ease: FADE_EASE }}
      style={{ height: 1, background: "var(--mm-gold)", margin: "0 auto" }}
    />
  );
}

// ── Main component ────────────────────────────────────────────────────────────
export default function CinemaTransition({ isOpen, to, couple, type, onDone }) {
  const navigate = useNavigate();
  const [phase, setPhase] = useState("idle"); // idle | covering | title | revealing
  const timers = useRef([]);

  // Title-card beat visibility flags
  const [studioVisible,    setStudioVisible]    = useState(false);
  const [nameVisible,      setNameVisible]      = useState(false);
  const [ruleVisible,      setRuleVisible]      = useState(false);
  const [subtitleVisible,  setSubtitleVisible]  = useState(false);
  const [contentFadeOut,   setContentFadeOut]   = useState(false);
  // Drives the slow pull-back zoom on the title block
  const [zoomActive, setZoomActive] = useState(false);

  function clearTimers() {
    timers.current.forEach(clearTimeout);
    timers.current = [];
  }

  function after(ms, fn) {
    const id = setTimeout(fn, ms);
    timers.current.push(id);
  }

  // ── Kick off when isOpen flips to true ──────────────────────────────────────
  useEffect(() => {
    if (!isOpen) return;

    // Reset all flags
    setStudioVisible(false);
    setNameVisible(false);
    setRuleVisible(false);
    setSubtitleVisible(false);
    setContentFadeOut(false);
    setZoomActive(false);
    clearTimers();

    setPhase("covering");

    // Navigate under cover while the user is in darkness
    after(NAVIGATE_AT, () => navigate(to));

    // Enter title phase
    after(COVER_MS, () => {
      setPhase("title");
      setZoomActive(true); // kicks off the slow pull-back zoom

      after(T_STUDIO_IN,  () => setStudioVisible(true));
      after(T_STUDIO_OUT, () => setStudioVisible(false));
      after(T_NAME_IN,    () => setNameVisible(true));
      after(T_RULE_IN,    () => setRuleVisible(true));
      after(T_SUB_IN,     () => setSubtitleVisible(true));

      // Fade content out and start revealing
      after(TITLE_MS, () => {
        setContentFadeOut(true);
        setPhase("revealing");

        after(REVEAL_MS, () => {
          setPhase("idle");
          onDone?.();
        });
      });
    });

    return () => {
      clearTimers();
      setPhase("idle");
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen]);

  const visible = phase !== "idle";

  // Curtain x positions by phase
  const leftX  = phase === "covering" || phase === "title" ? "0%" : "-105%";
  const rightX = phase === "covering" || phase === "title" ? "0%" : "105%";

  // Backdrop opacity
  const backdropOpacity    = phase === "revealing" ? 0 : phase === "idle" ? 0 : 1;
  const backdropDuration   = phase === "covering" ? 0.45 : phase === "revealing" ? 0.65 : 0;

  const subtitle = type === "film" ? "Their Wedding Film" : "Their Wedding Gallery";

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          key="cinema-root"
          aria-hidden="true"
          initial={false}
          exit={{ opacity: 0, transition: { duration: 0 } }}
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 99999,
            pointerEvents: "auto",
            overflow: "hidden",
          }}
        >
          {/* ── Inline SVG grain filter ── */}
          <svg
            style={{ position: "absolute", width: 0, height: 0 }}
            aria-hidden="true"
          >
            <defs>
              <filter id="cinema-grain" x="0%" y="0%" width="100%" height="100%">
                <feTurbulence
                  type="fractalNoise"
                  baseFrequency="0.65"
                  numOctaves="4"
                  stitchTiles="stitch"
                  result="noise"
                />
                <feColorMatrix type="saturate" values="0" in="noise" result="grayNoise" />
                <feBlend in="SourceGraphic" in2="grayNoise" mode="multiply" result="blend" />
                <feComponentTransfer in="blend">
                  <feFuncA type="linear" slope="1" />
                </feComponentTransfer>
              </filter>
            </defs>
          </svg>

          {/* ── Pure black backdrop ── */}
          <motion.div
            animate={{ opacity: backdropOpacity }}
            transition={{ duration: backdropDuration, ease: "easeOut" }}
            style={{ position: "absolute", inset: 0, background: "#000000" }}
          />

          {/* ── Left curtain ── */}
          <motion.div
            initial={{ x: "-100%" }}
            animate={{
              x: leftX,
              transition: {
                duration:
                  phase === "revealing" ? REVEAL_MS / 1000 : COVER_MS / 1000,
                ease: SLIDE_EASE,
              },
            }}
            style={{
              position: "absolute",
              top: 0,
              bottom: 0,
              left: 0,
              width: "52%",
              background:
                "repeating-linear-gradient(to right, #1e0401 0px, #0d0100 14px, #1e0401 28px)",
              boxShadow:
                "inset -28px 0 60px rgba(0,0,0,0.75), inset -6px 0 16px rgba(160,40,0,0.07)",
              filter: "url(#cinema-grain)",
            }}
          />

          {/* ── Right curtain ── */}
          <motion.div
            initial={{ x: "100%" }}
            animate={{
              x: rightX,
              transition: {
                duration:
                  phase === "revealing" ? REVEAL_MS / 1000 : COVER_MS / 1000,
                ease: SLIDE_EASE,
              },
            }}
            style={{
              position: "absolute",
              top: 0,
              bottom: 0,
              right: 0,
              width: "52%",
              background:
                "repeating-linear-gradient(to left, #1e0401 0px, #0d0100 14px, #1e0401 28px)",
              boxShadow:
                "inset 28px 0 60px rgba(0,0,0,0.75), inset 6px 0 16px rgba(160,40,0,0.07)",
              filter: "url(#cinema-grain)",
            }}
          />

          {/* ── Cinematic vignette ── */}
          <div
            style={{
              position: "absolute",
              inset: 0,
              background:
                "radial-gradient(ellipse at 50% 50%, transparent 25%, rgba(0,0,0,0.78) 100%)",
              pointerEvents: "none",
            }}
          />

          {/* ── Title card — outer fade-out wrapper ── */}
          <motion.div
            animate={{ opacity: contentFadeOut ? 0 : 1 }}
            transition={{ duration: 0.45, ease: "easeOut" }}
            style={{
              position: "absolute",
              inset: 0,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              pointerEvents: "none",
            }}
          >
            {/*
             * Slow pull-back zoom:
             * starts at scale(1.07) + y(14px) when zoomActive=false,
             * animates to scale(1.0) + y(0) over TITLE_MS duration
             * the moment we enter the title phase.
             */}
            <motion.div
              animate={{
                scale: zoomActive ? 1 : 1.07,
                y:     zoomActive ? 0 : 14,
              }}
              transition={{
                duration: TITLE_MS / 1000,
                ease: ZOOM_EASE,
              }}
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                textAlign: "center",
                padding: "0 clamp(24px, 6vw, 80px)",
                width: "100%",
              }}
            >
              {/* Studio label */}
              <motion.p
                animate={{
                  opacity: studioVisible ? 0.55 : 0,
                  y:       studioVisible ? 0    : 8,
                }}
                transition={{ duration: 0.5, ease: FADE_EASE }}
                style={{
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: 10,
                  letterSpacing: "0.38em",
                  color: "var(--mm-gold)",
                  textTransform: "uppercase",
                  marginBottom: 40,
                  margin: "0 0 40px",
                }}
              >
                A Move Mountains Co. Production
              </motion.p>

              {/* Couple name — character reveal */}
              <h2
                style={{
                  fontFamily: "'Playfair Display', serif",
                  fontStyle: "italic",
                  fontWeight: 400,
                  fontSize: "clamp(52px, 8.5vw, 104px)",
                  lineHeight: 1.0,
                  letterSpacing: "-0.01em",
                  color: "var(--mm-text)",
                  margin: "0 0 32px",
                  opacity: nameVisible ? 1 : 0,
                  transition: "opacity 0.1s",
                }}
              >
                {nameVisible && <CharReveal text={couple} delay={0} />}
              </h2>

              {/* Gold rule */}
              <div style={{ marginBottom: 22 }}>
                <GoldRule visible={ruleVisible} />
              </div>

              {/* Subtitle */}
              <motion.p
                animate={{
                  opacity: subtitleVisible ? 1   : 0,
                  y:       subtitleVisible ? 0   : 10,
                }}
                transition={{ duration: 0.5, ease: FADE_EASE }}
                style={{
                  fontFamily: "'Cormorant Garamond', serif",
                  fontStyle: "italic",
                  fontWeight: 500,
                  fontSize: "clamp(15px, 1.9vw, 20px)",
                  letterSpacing: "0.06em",
                  color: "var(--mm-gold)",
                  margin: 0,
                }}
              >
                {subtitle}
              </motion.p>
            </motion.div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
