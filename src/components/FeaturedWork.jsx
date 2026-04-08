import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const weddings = [
  { couple: "Carey & Luke", venue: "Rosecliff, Newport", season: "Summer 2025" },
  { couple: "Howard & Shreya", venue: "OceanCliff, Newport", season: "Fall 2025" },
  { couple: "Ken & Alicia", venue: "Castle Hill Inn", season: "Spring 2025" },
  { couple: "Joel & Corey", venue: "The Chanler, Newport", season: "Summer 2025" },
  { couple: "Tim & Katie", venue: "St. Mary's, Narragansett", season: "Fall 2025" },
  { couple: "Connor & Amanda", venue: "Beavertail, Jamestown", season: "Winter 2025" },
];
const tones = ["#2a1f18", "#1a1e22", "#22201a", "#1e1a22", "#201e1a", "#1a2220"];

function FeaturedWorkSlide({ wedding, tone, index, total, isIntro, currentIndex, slideIndex }) {
  const active = currentIndex >= slideIndex;

  if (isIntro) {
    return (
      <div style={{
        flex: "0 0 100vw", width: "100vw", height: "100vh",
        display: "flex", alignItems: "center", justifyContent: "center",
        background: "var(--mm-bg)",
      }}>
        <div style={{ maxWidth: 720, padding: "0 clamp(24px, 5vw, 80px)", textAlign: "center" }}>
          <div style={{ fontFamily: "'DM Sans'", fontSize: 12, color: "var(--mm-gold)", textTransform: "uppercase", letterSpacing: "0.3em", marginBottom: 24 }}>Selected Work</div>
          <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(48px, 7vw, 96px)", fontWeight: 700, color: "var(--mm-text)", lineHeight: 1.05, margin: "0 0 28px" }}>
            Love Stories<br /><em style={{ color: "var(--mm-gold)", fontStyle: "italic", fontWeight: 400 }}>We've Told</em>
          </h2>
          <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(18px, 2vw, 24px)", color: "var(--mm-text-sec)", fontStyle: "italic", lineHeight: 1.6, margin: 0 }}>
            Six weddings. Six couples. Six stories told the way only we could tell them — keep scrolling.
          </p>
          <div style={{ marginTop: 48, display: "inline-flex", flexDirection: "column", alignItems: "center", gap: 12 }}>
            <span style={{ fontFamily: "'DM Sans'", fontSize: 10, color: "var(--mm-text-sec)", letterSpacing: "0.3em", textTransform: "uppercase" }}>Scroll to explore</span>
            <motion.div animate={{ y: [0, 10, 0] }} transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }} style={{ fontSize: 22, color: "var(--mm-gold)" }}>↓</motion.div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <Link to="/wedding/anthony-justine"
      style={{
        flex: "0 0 100vw", width: "100vw", height: "100vh",
        position: "relative", overflow: "hidden",
        textDecoration: "none", display: "block",
      }}>
      <motion.div
        initial={{ scale: 1.02 }}
        animate={{ scale: active ? 1.12 : 1.02 }}
        transition={{ duration: 2, ease: [0.25, 0.1, 0.25, 1] }}
        style={{
          position: "absolute", inset: 0,
          background: `linear-gradient(135deg, ${tone} 0%, #0F0F0F 100%)`,
          display: "flex", alignItems: "center", justifyContent: "center",
        }}
      >
        <span style={{ fontFamily: "'DM Sans'", fontSize: 11, color: "#F5F0E8", opacity: 0.12, textTransform: "uppercase", letterSpacing: "0.2em" }}>
          [ Wedding Story Image ]
        </span>
      </motion.div>

      <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(15,15,15,0.9) 0%, rgba(15,15,15,0.15) 45%, rgba(15,15,15,0.5) 100%)" }} />

      <div style={{ position: "absolute", top: "10vh", left: "clamp(32px, 6vw, 80px)", fontFamily: "'DM Sans'", fontSize: 12, color: "#C9A96E", letterSpacing: "0.3em", textTransform: "uppercase" }}>
        {String(index).padStart(2, "0")} / {String(total).padStart(2, "0")}
      </div>

      <div style={{ position: "absolute", top: "10vh", right: "clamp(32px, 6vw, 80px)", fontFamily: "'DM Sans'", fontSize: 12, color: "#F5F0E8", letterSpacing: "0.25em", textTransform: "uppercase", opacity: 0.75 }}>
        {wedding.season}
      </div>

      <div style={{ position: "absolute", bottom: "10vh", left: "clamp(32px, 6vw, 80px)", right: "clamp(32px, 6vw, 80px)" }}>
        <div style={{ fontFamily: "'DM Sans'", fontSize: 12, color: "#C9A96E", letterSpacing: "0.25em", textTransform: "uppercase", marginBottom: 20 }}>
          {wedding.venue}
        </div>
        <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(48px, 8vw, 120px)", fontWeight: 700, color: "#F5F0E8", lineHeight: 1, margin: 0, display: "inline-flex", flexWrap: "wrap" }}>
          {wedding.couple.split("").map((ch, ci) => (
            <span key={ci} style={{ position: "relative", display: "inline-block", overflow: "hidden", height: "1em", verticalAlign: "top", lineHeight: 1 }}>
              <span style={{
                display: "block",
                transform: active ? "translateY(0)" : "translateY(110%)",
                opacity: active ? 1 : 0,
                transition: `transform 0.8s cubic-bezier(0.25,0.1,0.25,1) ${ci * 0.04}s, opacity 0.5s ease ${ci * 0.04}s`,
              }}>{ch === " " ? "\u00A0" : ch}</span>
            </span>
          ))}
        </h3>
        <div style={{ display: "flex", alignItems: "center", gap: 14, marginTop: 32 }}>
          <span style={{ fontFamily: "'DM Sans'", fontSize: 11, color: "#F5F0E8", letterSpacing: "0.25em", textTransform: "uppercase", opacity: 0.85 }}>View Story</span>
          <motion.span animate={{ width: active ? 56 : 36 }} transition={{ duration: 0.5 }} style={{ height: 1, background: "#C9A96E", display: "block" }} />
          <motion.span animate={{ x: active ? 6 : 0, opacity: active ? 1 : 0.7 }} style={{ color: "#C9A96E", fontSize: 16 }}>→</motion.span>
        </div>
      </div>
    </Link>
  );
}

export default function FeaturedWork() {
  const sectionRef = useRef(null);
  const totalSlides = weddings.length + 1;
  const [currentIndex, setCurrentIndex] = useState(0);
  const indexRef = useRef(0);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const COOLDOWN_MS = 600;
    const MIN_WHEEL_DELTA = 4;
    const MIN_TOUCH_DELTA = 24;
    const EXIT_DURATION = 0.7;

    let active = false;
    let cooldownUntil = 0;
    let exitingUntil = 0;
    let prevScrollY = window.scrollY;
    let prevTop = section.getBoundingClientRect().top;

    const getLenis = () => window.__lenis;

    const setHeaderHidden = (hidden) => {
      document.documentElement.dataset.hideHeader = hidden ? "true" : "false";
      window.dispatchEvent(new CustomEvent("mm-header-visibility", { detail: !hidden }));
    };

    const activate = (initialIndex) => {
      if (active) return;
      active = true;
      indexRef.current = initialIndex;
      setCurrentIndex(initialIndex);
      const lenis = getLenis();
      if (lenis) {
        lenis.scrollTo(section.offsetTop, { immediate: true, force: true });
        lenis.stop();
      } else {
        window.scrollTo({ top: section.offsetTop });
      }
      setHeaderHidden(true);
      cooldownUntil = performance.now() + COOLDOWN_MS;
    };

    const deactivate = () => {
      if (!active) return;
      active = false;
      cooldownUntil = 0;
      getLenis()?.start();
      setHeaderHidden(false);
    };

    const releaseDown = (now) => {
      exitingUntil = now + 900;
      deactivate();
      const lenis = getLenis();
      const target = section.offsetTop + section.offsetHeight;
      if (lenis) {
        lenis.scrollTo(target, { duration: EXIT_DURATION, force: true });
      } else {
        window.scrollTo({ top: target, behavior: "smooth" });
      }
    };

    const releaseUp = (now) => {
      exitingUntil = now + 900;
      deactivate();
      const lenis = getLenis();
      const target = Math.max(0, section.offsetTop - window.innerHeight);
      if (lenis) {
        lenis.scrollTo(target, { duration: EXIT_DURATION, force: true });
      } else {
        window.scrollTo({ top: target, behavior: "smooth" });
      }
    };

    const advance = (dir) => {
      const now = performance.now();
      if (now < cooldownUntil) return;

      const cur = indexRef.current;

      if (dir > 0 && cur >= totalSlides - 1) {
        releaseDown(now);
        return;
      }
      if (dir < 0 && cur <= 0) {
        releaseUp(now);
        return;
      }

      cooldownUntil = now + COOLDOWN_MS;
      const next = cur + dir;
      indexRef.current = next;
      setCurrentIndex(next);
    };

    const onWheel = (e) => {
      const now = performance.now();
      if (now < exitingUntil) {
        // Eat any wheels mid-exit so they don't re-trigger anything
        e.preventDefault();
        e.stopImmediatePropagation();
        return;
      }
      if (!active) return;

      e.preventDefault();
      e.stopImmediatePropagation();

      if (Math.abs(e.deltaY) < MIN_WHEEL_DELTA) return;
      advance(e.deltaY > 0 ? 1 : -1);
    };

    let touchStartY = null;
    const onTouchStart = (e) => {
      if (!active) {
        touchStartY = null;
        return;
      }
      touchStartY = e.touches[0].clientY;
    };

    const onTouchMove = (e) => {
      const now = performance.now();
      if (now < exitingUntil) {
        e.preventDefault();
        e.stopImmediatePropagation();
        return;
      }
      if (!active || touchStartY === null) return;

      const dy = touchStartY - e.touches[0].clientY;
      e.preventDefault();
      e.stopImmediatePropagation();

      if (Math.abs(dy) < MIN_TOUCH_DELTA) return;

      const dir = dy > 0 ? 1 : -1;
      const before = indexRef.current;
      advance(dir);
      // Reset the anchor only if we actually moved (or released) so a single
      // long swipe doesn't trigger multiple advances.
      if (indexRef.current !== before || !active) {
        touchStartY = e.touches[0].clientY;
      }
    };

    const onTouchEnd = () => { touchStartY = null; };

    const onScroll = () => {
      const now = performance.now();
      const r = section.getBoundingClientRect();
      const curTop = r.top;
      const curScrollY = window.scrollY;
      const dir = curScrollY > prevScrollY ? "down" : "up";

      if (!active && now >= exitingUntil) {
        // Engage when the section's top edge crosses the viewport top.
        // Going down: prev was below 0 line, now at or above it → land on intro.
        // Going up:   prev was above 0 line, now at or below it → land on slide 6.
        if (dir === "down" && prevTop > 0 && curTop <= 0) {
          activate(0);
        } else if (dir === "up" && prevTop < 0 && curTop >= 0) {
          activate(totalSlides - 1);
        }
      }

      prevTop = curTop;
      prevScrollY = curScrollY;
    };

    window.addEventListener("wheel", onWheel, { passive: false, capture: true });
    window.addEventListener("touchstart", onTouchStart, { passive: true, capture: true });
    window.addEventListener("touchmove", onTouchMove, { passive: false, capture: true });
    window.addEventListener("touchend", onTouchEnd, { passive: true, capture: true });
    window.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      window.removeEventListener("wheel", onWheel, { capture: true });
      window.removeEventListener("touchstart", onTouchStart, { capture: true });
      window.removeEventListener("touchmove", onTouchMove, { capture: true });
      window.removeEventListener("touchend", onTouchEnd, { capture: true });
      window.removeEventListener("scroll", onScroll);
      if (active) getLenis()?.start();
      setHeaderHidden(false);
    };
  }, [totalSlides]);

  return (
    <section ref={sectionRef} style={{ position: "relative", height: "100vh", overflow: "hidden" }}>
      <motion.div
        animate={{ x: `-${currentIndex * 100}vw` }}
        transition={{ duration: 0.55, ease: [0.76, 0, 0.24, 1] }}
        style={{ display: "flex", width: `${totalSlides * 100}vw`, height: "100vh" }}
      >
        <FeaturedWorkSlide isIntro currentIndex={currentIndex} slideIndex={0} />
        {weddings.map((w, i) => (
          <FeaturedWorkSlide key={w.couple} wedding={w} tone={tones[i]} index={i + 1} total={weddings.length} currentIndex={currentIndex} slideIndex={i + 1} />
        ))}
      </motion.div>
    </section>
  );
}
