import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import routeLoader from "../assets/lotties/route-loader.json";

/**
 * Slide-cover page transition with three explicit beats:
 *
 *   1. covering  — overlay slides DOWN from above (y: -100% → 0%) and
 *                  the Lottie is hidden during this beat.
 *   2. playing   — overlay sits still, Lottie fades in and plays its
 *                  animation through once.
 *   3. revealing — overlay slides UP off the top (y: 0% → -100%),
 *                  uncovering the new route underneath.
 *
 * The route swap happens at the boundary between covering and playing,
 * while the panel fully covers the screen.
 *
 * Total target duration: ~2.5s.
 */

// Tunables — change these to retime the transition.
const COVER_MS = 600; // slide-in (down)
const PLAY_MS = 1300; // hold + lottie window
const REVEAL_MS = 600; // slide-out (up)
const LOTTIE_FADE_MS = 220; // how long the lottie takes to fade in
const SLIDE_EASE = [0.76, 0, 0.24, 1];

const PageTransitionContext = createContext(null);

export function usePageTransition() {
  const ctx = useContext(PageTransitionContext);
  if (!ctx) {
    throw new Error(
      "usePageTransition must be used inside <PageTransitionProvider>"
    );
  }
  return ctx;
}

export function PageTransitionProvider({ children }) {
  const navigate = useNavigate();
  const location = useLocation();
  const [phase, setPhase] = useState("idle"); // 'idle' | 'covering' | 'playing' | 'revealing'
  const pendingPathRef = useRef(null);
  const phaseRef = useRef("idle");
  phaseRef.current = phase;

  // ── Cinema transition state (for gallery entrances) ───────────────
  const [cinemaData, setCinemaData] = useState(null); // { to, couple, type } | null
  const triggerCinema = useCallback((to, couple, type) => {
    setCinemaData({ to, couple, type });
  }, []);

  const navigateTo = useCallback(
    (path, { replace = false } = {}) => {
      if (!path) return;
      if (phaseRef.current !== "idle") return; // ignore while a transition is running
      if (path === location.pathname + location.search + location.hash) return;
      pendingPathRef.current = { path, replace };
      setPhase("covering");
    },
    [location.pathname, location.search, location.hash]
  );

  // Cover slide finished — panel is fully on screen. Swap the route NOW
  // (under the cover) and move into the playing beat.
  const finishCover = useCallback(() => {
    const target = pendingPathRef.current;
    pendingPathRef.current = null;
    if (target) navigate(target.path, { replace: target.replace });
    setPhase("playing");
  }, [navigate]);

  // Playing beat finished — start the reveal slide.
  const finishPlaying = useCallback(() => {
    setPhase("revealing");
  }, []);

  // Reveal slide finished — back to idle.
  const finishReveal = useCallback(() => {
    setPhase("idle");
  }, []);

  // Global click interceptor: catches every internal anchor (both <Link> and
  // plain <a href="/...">) so existing pages don't have to be touched. Add
  // `data-no-transition` on any anchor to opt out.
  useEffect(() => {
    const handler = (e) => {
      if (e.defaultPrevented) return;
      if (e.button !== 0) return;
      if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;

      const anchor = e.target.closest && e.target.closest("a");
      if (!anchor) return;
      if (anchor.hasAttribute("data-no-transition")) return;
      if (anchor.hasAttribute("download")) return;
      if (anchor.target && anchor.target !== "" && anchor.target !== "_self") return;

      const href = anchor.getAttribute("href");
      if (!href) return;
      if (href.startsWith("#")) return;
      if (href.startsWith("mailto:") || href.startsWith("tel:")) return;

      let path;
      try {
        const url = new URL(href, window.location.href);
        if (url.origin !== window.location.origin) return; // external
        path = url.pathname + url.search + url.hash;
      } catch {
        return;
      }

      if (path === location.pathname + location.search + location.hash) return;

      // Dashboard-internal navigation skips the cinematic transition entirely:
      // it should feel like a web app, not an editorial site. We only use the
      // slide-cover transition when crossing the boundary between public/dash.
      const fromDash = location.pathname.startsWith("/dashboard");
      const toDash = path.startsWith("/dashboard");
      if (fromDash && toDash) return;

      e.preventDefault();
      navigateTo(path);
    };

    document.addEventListener("click", handler, true);
    return () => document.removeEventListener("click", handler, true);
  }, [navigateTo, location.pathname, location.search, location.hash]);

  const value = {
    phase,
    navigateTo,
    finishCover,
    finishPlaying,
    finishReveal,
    cinemaData,
    triggerCinema,
    clearCinema: useCallback(() => setCinemaData(null), []),
  };

  return (
    <PageTransitionContext.Provider value={value}>
      {children}
    </PageTransitionContext.Provider>
  );
}

// How long to wait after calling closeMenu() before starting the page
// transition — gives the menu collapse animation a head-start so the user
// sees the menu visibly closing before the overlay drops.
const MENU_CLOSE_DELAY_MS = 400;

/**
 * Drop-in replacement for react-router-dom's <Link>. Routes the click
 * through the page transition instead of navigating immediately.
 */
export function TransitionLink({ to, replace, children, onClick, ...rest }) {
  const { navigateTo } = usePageTransition();

  const handleClick = (e) => {
    if (onClick) onClick(e);
    if (e.defaultPrevented) return;
    if (e.button !== 0) return;
    if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
    if (rest.target && rest.target !== "" && rest.target !== "_self") return;

    const path =
      typeof to === "string"
        ? to
        : to && typeof to === "object"
          ? `${to.pathname || ""}${to.search || ""}${to.hash || ""}`
          : "";
    if (!path) return;

    e.preventDefault();
    navigateTo(path, { replace });
  };

  return (
    <Link to={to} replace={replace} onClick={handleClick} {...rest}>
      {children}
    </Link>
  );
}

/**
 * Use this instead of TransitionLink for links that live inside an
 * animated menu overlay (e.g. the fullscreen nav). It sequences:
 *
 *   1. onClick (closeMenu) fires immediately → menu collapse begins
 *   2. After MENU_CLOSE_DELAY_MS the page-transition overlay starts
 *
 * It also sets `data-no-transition` so the global capture interceptor
 * skips it and doesn't race with the delayed navigateTo call.
 */
export function MenuTransitionLink({ to, replace, onClick, children, ...rest }) {
  const { navigateTo } = usePageTransition();

  const handleClick = (e) => {
    if (e.button !== 0) return;
    if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
    if (rest.target && rest.target !== "" && rest.target !== "_self") return;

    const path =
      typeof to === "string"
        ? to
        : to && typeof to === "object"
          ? `${to.pathname || ""}${to.search || ""}${to.hash || ""}`
          : "";
    if (!path) return;

    e.preventDefault();
    if (onClick) onClick(e); // closeMenu — starts the 600ms collapse
    setTimeout(() => navigateTo(path, { replace }), MENU_CLOSE_DELAY_MS);
  };

  return (
    <Link to={to} replace={replace} onClick={handleClick} data-no-transition {...rest}>
      {children}
    </Link>
  );
}

/**
 * Fullscreen slide-cover overlay. Mounted while a transition is running,
 * unmounted when idle. The Lottie sits centered on the panel and only
 * appears (with a fade-in) during the `playing` beat.
 */
export function DiaphragmTransition() {
  const { phase, finishCover, finishPlaying, finishReveal } =
    usePageTransition();
  const [dotLottie, setDotLottie] = useState(null);
  const [ready, setReady] = useState(false);

  // Track when the underlying dotLottie instance has loaded its data so we
  // can safely call play() / setFrame() / setSpeed().
  useEffect(() => {
    if (!dotLottie) return;
    setReady(false);

    const markReady = () => setReady(true);
    dotLottie.addEventListener("ready", markReady);
    dotLottie.addEventListener("load", markReady);
    if (dotLottie.totalFrames && dotLottie.totalFrames > 0) markReady();

    return () => {
      dotLottie.removeEventListener("ready", markReady);
      dotLottie.removeEventListener("load", markReady);
    };
  }, [dotLottie]);

  // Drive the playing beat: when we enter `playing`, fade in the Lottie,
  // start it from frame 0, scale its speed so it fits the playing window,
  // and schedule the advance into `revealing`.
  //
  // The advance timer is always set regardless of Lottie readiness so the
  // transition can never hang if the animation file loads slowly.
  useEffect(() => {
    if (phase !== "playing") return;

    const timers = [];

    // ── Lottie playback (only if the instance is ready) ──────────────────
    if (dotLottie && ready) {
      const lottieWindowMs = PLAY_MS - LOTTIE_FADE_MS;
      const naturalSec = dotLottie.duration || 0;
      if (naturalSec > 0) {
        dotLottie.setSpeed((naturalSec * 1000) / lottieWindowMs);
      }
      dotLottie.setFrame(0);
      dotLottie.setMode("forward");

      // Start playback after the fade-in so the user sees frame 0 first.
      timers.push(setTimeout(() => dotLottie.play(), LOTTIE_FADE_MS));
    }

    // ── Hard cap — always fires to guarantee forward progress ────────────
    timers.push(setTimeout(finishPlaying, PLAY_MS));

    return () => timers.forEach(clearTimeout);
  }, [phase, dotLottie, ready, finishPlaying]);

  const visible = phase !== "idle";
  // Where the panel should sit:
  //   covering  → 0%    (fully on screen, having dropped from above)
  //   playing   → 0%    (held in place)
  //   revealing → -100% (slid back up off the top)
  //   idle      → -100% (off screen, used as initial mount position too)
  const targetY = phase === "covering" || phase === "playing" ? "0%" : "-100%";

  const handleAnimationComplete = () => {
    if (phase === "covering") finishCover();
    else if (phase === "revealing") finishReveal();
    // 'playing' has no slide motion → no completion event here
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          key="page-transition-panel"
          aria-hidden="true"
          initial={{ y: "-100%" }}
          animate={{ y: targetY }}
          exit={{ y: "-100%", transition: { duration: 0 } }}
          transition={{
            duration: (phase === "revealing" ? REVEAL_MS : COVER_MS) / 1000,
            ease: SLIDE_EASE,
          }}
          onAnimationComplete={handleAnimationComplete}
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 99999,
            background: "var(--mm-bg)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            pointerEvents: "auto",
            willChange: "transform",
          }}
        >
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: phase === "playing" ? 1 : 0 }}
            transition={{ duration: LOTTIE_FADE_MS / 1000, ease: "easeOut" }}
            style={{
              width: "clamp(180px, 24vw, 320px)",
              aspectRatio: "1 / 1",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <DotLottieReact
              data={routeLoader}
              autoplay={false}
              loop={false}
              backgroundColor="transparent"
              layout={{ fit: "contain", align: [0.5, 0.5] }}
              style={{
                width: "100%",
                height: "100%",
                display: "block",
                background: "transparent",
              }}
              dotLottieRefCallback={setDotLottie}
            />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
