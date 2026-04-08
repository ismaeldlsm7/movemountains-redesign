import { useState, useEffect, useRef } from "react";
import { motion, useInView, useScroll, useTransform } from "framer-motion";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { Link } from "react-router-dom";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import playButton from "../assets/lotties/play-button.json";

const DS = { bg: "var(--mm-bg)", surface: "var(--mm-surface)", surfaceAlt: "var(--mm-surface-alt)", text: "var(--mm-text)", textSec: "var(--mm-text-sec)", gold: "var(--mm-gold)", ember: "var(--mm-ember)", border: "var(--mm-border)" };
const fontLink = "https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,700;1,400&family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;0,700;1,400;1,500&family=DM+Sans:wght@400;500;600;700&family=Bebas+Neue&display=swap";

function FadeIn({ children, delay = 0, y = 24 }) {
  const ref = useRef(null); const inView = useInView(ref, { once: true, margin: "-40px" });
  return <motion.div ref={ref} initial={{ opacity: 0, y }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.7, delay, ease: [0.25, 0.1, 0.25, 1] }}>{children}</motion.div>;
}

function Word({ children, progress, range }) {
  const opacity = useTransform(progress, range, [0.15, 1]);
  return <motion.span style={{ opacity, display: "inline-block", marginRight: "0.28em" }}>{children}</motion.span>;
}

function flattenToWords(node) {
  const out = [];
  const walk = (n, italic = false, gold = false) => {
    if (n == null || n === false) return;
    if (typeof n === "string") {
      n.split(/\s+/).forEach((w) => { if (w) out.push({ text: w, italic, gold, br: false }); });
      return;
    }
    if (Array.isArray(n)) { n.forEach((c) => walk(c, italic, gold)); return; }
    if (n.type === "em") { const isGold = n.props?.style?.color === "var(--mm-gold)" || gold; walk(n.props.children, true, isGold); return; }
    if (n.type === "br") { out.push({ br: true }); return; }
    if (n.props && n.props.children != null) { walk(n.props.children, italic, gold); return; }
  };
  walk(node);
  return out;
}

function ScrollText({ children, as: Tag = "p", style = {} }) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "center center"] });
  const words = flattenToWords(children);
  const MotionTag = motion[Tag] || motion.p;
  return (
    <MotionTag ref={ref} style={style}>
      {words.map((w, i) => {
        if (w.br) return <br key={i} />;
        const start = i / words.length;
        const end = Math.min(1, start + 1.4 / words.length);
        return (
          <Word key={i} progress={scrollYProgress} range={[start, end]}>
            <span style={{ fontStyle: w.italic ? "italic" : "inherit", color: w.gold ? "var(--mm-gold)" : "inherit" }}>{w.text}</span>
          </Word>
        );
      })}
    </MotionTag>
  );
}

const story = {
  couple: "Anthony", amp: "&", couple2: "Justine",
  venue: "Rosecliff Mansion", location: "Newport, Rhode Island", season: "Autumn 2026", coverage: "Photo + Film + Super 8",
  chapters: [
    { label: null, title: null, dropcap: true,
      paragraphs: [
        "There are mornings that feel ordinary and mornings that carry the quiet weight of something extraordinary about to unfold. For Anthony and Justine, this was the latter — a crisp October dawn over Newport, the salt air slipping through the half-open windows of Rosecliff Mansion as two lives prepared, in separate rooms, to become one.",
        ["Justine's suite was a study in controlled elegance. ", "em:Chanel No. 5 atomized into golden light.", " Her mother's hands trembling as they fastened the last pearl button on the cathedral-length veil. Across the estate, Anthony stood at the window overlooking the Atlantic, adjusting his cufflinks — a gift from Justine, engraved with the coordinates of the café in Rome where he first told her he loved her."],
      ],
      photos: { type: "duo", colors: ["#2a2420", "#241e1a"], labels: ["Getting Ready — Bridal Suite", "Groom's Details — Window Light"] },
    },
    { label: "Chapter II", titleParts: ["The vows that stopped ", "em:time"],
      paragraphs: [
        "Rosecliff's Grand Hall has hosted a century of celebrations, but few have ever quieted it the way Justine did when she appeared at the far end of the corridor. Two hundred guests rose in unison. Anthony's composure broke — the kind of beautiful, unguarded fracture that no rehearsal can prepare you for and no camera should ever miss.",
        ["Their officiant — a college friend who'd introduced them six years earlier at a mutual friend's dinner party in Boston — wove their story with the precision of someone who'd watched their love from the very first glance. ", "em:When Justine read her vows, her voice cracked exactly once, and the room cracked with her."],
      ],
      photos: { type: "full+asym", colors: ["#22201a", "#1e1c18", "#201e1a"], labels: ["Ceremony — Grand Hall", "Vow Exchange", "Ring Detail"] },
      quote: "I looked at him and realized I wasn't nervous anymore. I was just ready. Everything before this moment was the prologue.",
    },
    { label: "Chapter III", titleParts: ["Golden hour at ", "em:the cliff's edge"],
      paragraphs: [
        "We stole them away for twenty minutes. That's all it takes when the light is right and the couple is this comfortable — twenty minutes and the coastline of Newport at golden hour. The Atlantic turned copper. Justine's train caught the wind like it was choreographed. Anthony pulled her close and whispered something that made her laugh with her whole body, and we were there for all of it.",
      ],
      photos: { type: "centered+asym-r", colors: ["#2a2218", "#241e18", "#201c16"], labels: ["Golden Hour — Colonnade", "Cliff Edge Portrait", "Sunset — Atlantic"] },
    },
    { label: "Chapter IV", titleParts: ["Where the ", "em:night came alive"],
      paragraphs: [
        ["The reception was not a dinner — it was a declaration. Rosecliff's ballroom, dressed in candlelight and trailing white orchids, transformed into something between a gallery opening and a Gatsby revival. The toasts were devastating in the best way: Anthony's brother recalled a phone call at 2 AM the night they met — ", "em:\"She's the one. I'm telling you, she's the one.\""],
        "And then the floor opened. The band shifted from Sinatra to Beyoncé without warning, and two hundred people who'd been holding champagne flutes were suddenly moving. Justine kicked off her heels at exactly 10:47 PM. Anthony loosened his tie at 10:48. The rest of the night belonged to the dance floor.",
      ],
      photos: { type: "triple+full", colors: ["#201c1a", "#1e1a18", "#241e1c", "#1a1816"], labels: ["Ballroom — Candlelight", "First Dance", "Dance Floor Energy", "The Last Song"] },
    },
  ],
};

function renderParagraph(p) {
  if (typeof p === "string") return p;
  return p.map((part, i) => {
    if (typeof part === "string" && part.startsWith("em:")) return <em key={i} style={{ color: DS.text, fontStyle: "italic" }}>{part.slice(3)}</em>;
    return <span key={i}>{part}</span>;
  });
}

function renderTitle(parts) {
  return parts.map((part, i) => {
    if (part.startsWith("em:")) return <em key={i} style={{ fontStyle: "italic", color: DS.gold }}>{part.slice(3)}</em>;
    return <span key={i}>{part}</span>;
  });
}

function Img({ color, label, height = "55vh" }) {
  return (
    <div style={{ width: "100%", height, background: color, display: "flex", alignItems: "center", justifyContent: "center", transition: "opacity 0.6s" }}
      onMouseEnter={(e) => e.currentTarget.style.opacity = 0.85} onMouseLeave={(e) => e.currentTarget.style.opacity = 1}>
      <span style={{ fontFamily: "'DM Sans'", fontSize: 11, color: DS.textSec, opacity: 0.22, textTransform: "uppercase", letterSpacing: "0.12em", textAlign: "center", padding: "0 16px" }}>[ {label} ]</span>
    </div>
  );
}

function Photos({ photos }) {
  if (!photos) return null;
  const { type, colors: c, labels: l } = photos;

  if (type === "duo") return <FadeIn><div className="pg" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, padding: "16px 48px" }}><Img color={c[0]} label={l[0]} /><Img color={c[1]} label={l[1]} /></div></FadeIn>;

  if (type === "full+asym") return <>
    <FadeIn><div style={{ padding: "2rem 0" }}><Img color={c[0]} label={l[0]} height="75vh" /></div></FadeIn>
    <FadeIn><div className="pg" style={{ display: "grid", gridTemplateColumns: "1.4fr 1fr", gap: 16, padding: "16px 48px" }}><Img color={c[1]} label={l[1]} height="60vh" /><Img color={c[2]} label={l[2]} height="60vh" /></div></FadeIn>
  </>;

  if (type === "centered+asym-r") return <>
    <FadeIn><div className="pc" style={{ padding: "2rem 8rem" }}><Img color={c[0]} label={l[0]} height="70vh" /></div></FadeIn>
    <FadeIn><div className="pg" style={{ display: "grid", gridTemplateColumns: "1fr 1.4fr", gap: 16, padding: "16px 48px" }}><Img color={c[1]} label={l[1]} height="60vh" /><Img color={c[2]} label={l[2]} height="60vh" /></div></FadeIn>
  </>;

  if (type === "triple+full") return <>
    <FadeIn><div className="pg" style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 16, padding: "16px 48px" }}>{c.slice(0, 3).map((co, i) => <Img key={i} color={co} label={l[i]} height="50vh" />)}</div></FadeIn>
    {c[3] && <FadeIn><div style={{ padding: "2rem 0" }}><Img color={c[3]} label={l[3]} height="75vh" /></div></FadeIn>}
  </>;

  return null;
}


export default function WeddingEditorialPage() {
  const [scrolled, setScrolled] = useState(false);
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const heroScale = useTransform(scrollYProgress, [0, 1], [1, 1.08]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);
  useEffect(() => { const fn = () => setScrolled(window.scrollY > 80); window.addEventListener("scroll", fn); return () => window.removeEventListener("scroll", fn); }, []);

  return (
    <div style={{ background: DS.bg, color: DS.text, minHeight: "100vh", overflowX: "hidden" }}>
      <style>{`
        @import url('${fontLink}');
        * { margin: 0; padding: 0; box-sizing: border-box; }
        html { scroll-behavior: smooth; } body { background: ${DS.bg}; }
        ::selection { background: ${DS.gold}; color: ${DS.bg}; }
        ::-webkit-scrollbar { width: 5px; } ::-webkit-scrollbar-track { background: ${DS.bg}; }
        ::-webkit-scrollbar-thumb { background: ${DS.border}; } ::-webkit-scrollbar-thumb:hover { background: ${DS.gold}; }
        .dropcap::first-letter { font-family: 'Cormorant Garamond', serif; font-size: 4.5rem; float: left; line-height: 0.8; margin-right: 0.6rem; margin-top: 0.15rem; color: ${DS.gold}; font-weight: 300; }
        @media (max-width: 768px) {
          .pg { grid-template-columns: 1fr !important; padding: 0.5rem 1.5rem !important; gap: 0.5rem !important; }
          .pg > div { height: 40vh !important; }
          .pc { padding: 1rem 1.5rem !important; }
          .pc > div { height: 45vh !important; }
          .etb { padding-left: 1.5rem !important; padding-right: 1.5rem !important; }
          .ch { padding-left: 1.5rem !important; padding-right: 1.5rem !important; }
          .qs { padding: 3rem 1.5rem !important; }
          .fs { padding: 5rem 1.5rem !important; }
          .cs { padding: 5rem 1.5rem 7rem !important; }
          .hc { padding: 0 1.5rem 3.5rem !important; }
          .hd { gap: 1.5rem !important; flex-wrap: wrap !important; }
        }
      `}</style>

      <Header activePage="Portfolio" />

      {/* HERO */}
      <div ref={heroRef} style={{ position: "relative", height: "100vh", overflow: "hidden" }}>
        <motion.div style={{ scale: heroScale, position: "absolute", inset: 0 }}>
          <div style={{ width: "100%", height: "100%", background: "linear-gradient(160deg, #2a2218 0%, #201c16 30%, #1a1816 60%, #0f0f0f 100%)", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <span style={{ fontFamily: "'DM Sans'", fontSize: 13, color: DS.textSec, opacity: 0.2, textTransform: "uppercase", letterSpacing: "0.2em" }}>[ Hero — {story.couple} {story.amp} {story.couple2}, {story.venue} ]</span>
          </div>
        </motion.div>
        <div style={{ position: "absolute", inset: 0, background: `linear-gradient(to bottom, rgba(15,15,15,0.3) 0%, transparent 30%, transparent 50%, ${DS.bg} 100%), linear-gradient(to right, rgba(15,15,15,0.5) 0%, transparent 60%)` }} />
        <motion.div className="hc" style={{ opacity: heroOpacity, position: "absolute", bottom: 0, left: 0, right: 0, padding: "0 48px 80px", zIndex: 2 }}>
          <motion.p initial={{ opacity: 0, y: 25 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }} style={{ fontFamily: "'DM Sans'", fontSize: 10, letterSpacing: "0.35em", textTransform: "uppercase", color: DS.gold, marginBottom: 20 }}>A Move Mountains Wedding</motion.p>
          <motion.h1 initial={{ opacity: 0, y: 25 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }} style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(3.5rem, 9vw, 8rem)", fontWeight: 700, lineHeight: 0.95, letterSpacing: "-0.03em", color: DS.text }}>
            {story.couple} <span style={{ fontFamily: "'Cormorant Garamond', serif", fontStyle: "italic", color: DS.gold, fontWeight: 300 }}>{story.amp}</span> {story.couple2}
          </motion.h1>
          <motion.div className="hd" initial={{ opacity: 0, y: 25 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.9 }} style={{ display: "flex", gap: 48, marginTop: 32 }}>
            {[{ l: "Venue", v: story.venue }, { l: "Location", v: story.location }, { l: "Season", v: story.season }, { l: "Coverage", v: story.coverage }].map((d) => (
              <div key={d.l} style={{ display: "flex", flexDirection: "column", gap: 4 }}>
                <span style={{ fontFamily: "'DM Sans'", fontSize: 9, letterSpacing: "0.25em", textTransform: "uppercase", color: DS.textSec }}>{d.l}</span>
                <span style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 16, color: DS.text }}>{d.v}</span>
              </div>
            ))}
          </motion.div>
        </motion.div>
      </div>

      {/* CHAPTERS */}
      {story.chapters.map((ch, ci) => (
        <div key={ci}>
          {ch.label && <div className="ch" style={{ padding: "80px 48px 32px", maxWidth: 720, margin: "0 auto" }}>
            <ScrollText as="p" style={{ fontFamily: "'DM Sans'", fontSize: 9, letterSpacing: "0.4em", textTransform: "uppercase", color: DS.gold, opacity: 0.7, marginBottom: 12 }}>{ch.label}</ScrollText>
            <ScrollText as="h2" style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(1.8rem, 3.5vw, 2.8rem)", fontWeight: 700, color: DS.text, lineHeight: 1.2, margin: 0 }}>{renderTitle(ch.titleParts)}</ScrollText>
          </div>}

          <div className="etb" style={{ maxWidth: 720, margin: "0 auto", padding: ch.label ? "2rem 48px 5rem" : "7rem 48px 5rem" }}>
            {ch.paragraphs.map((p, pi) => (
              <ScrollText as="p" key={pi} style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(17px, 1.3vw, 19px)", fontWeight: 300, lineHeight: 1.9, color: DS.textSec, marginTop: pi > 0 ? 24 : 0 }}>
                {renderParagraph(p)}
              </ScrollText>
            ))}
          </div>

          <Photos photos={ch.photos} />

          {ch.quote && <div className="qs" style={{ maxWidth: 600, margin: "0 auto", padding: "80px 48px", textAlign: "center" }}>
            <span style={{ display: "block", fontFamily: "'Playfair Display', serif", fontSize: 64, color: DS.gold, opacity: 0.2, lineHeight: 1, marginBottom: -8 }}>"</span>
            <ScrollText as="blockquote" style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(1.3rem, 2.5vw, 1.8rem)", fontWeight: 400, fontStyle: "italic", lineHeight: 1.7, color: DS.text }}>{ch.quote}</ScrollText>
          </div>}

          {ci === 0 && <FadeIn><div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 24, padding: "2rem 48px" }}>
            <div style={{ width: 60, height: 1, background: "rgba(201,169,110,0.12)" }} />
            <div style={{ width: 5, height: 5, border: `1px solid ${DS.gold}`, transform: "rotate(45deg)", opacity: 0.4 }} />
            <div style={{ width: 60, height: 1, background: "rgba(201,169,110,0.12)" }} />
          </div></FadeIn>}
        </div>
      ))}

      {/* FILM */}
      <FadeIn><section className="fs" style={{ padding: "120px 48px", textAlign: "center" }}>
        <ScrollText as="p" style={{ fontFamily: "'DM Sans'", fontSize: 10, letterSpacing: "0.35em", textTransform: "uppercase", color: DS.gold, marginBottom: 20 }}>The Film</ScrollText>
        <ScrollText as="h2" style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(2rem, 4vw, 3rem)", fontWeight: 700, color: DS.text, marginBottom: 16 }}>
          {story.couple} <span style={{ fontFamily: "'Cormorant Garamond', serif", fontStyle: "italic", color: DS.gold, fontWeight: 300 }}>&</span> {story.couple2} — The Highlight Film
        </ScrollText>
        <ScrollText as="p" style={{ fontFamily: "'DM Sans'", fontSize: 13, color: DS.textSec, marginBottom: 48, maxWidth: 500, marginLeft: "auto", marginRight: "auto", lineHeight: 1.7 }}>
          A cinematic retelling of an October evening at {story.venue}. Two cameras. One love story. Five minutes that will make you feel everything.
        </ScrollText>
        <div style={{ position: "relative", maxWidth: 1000, margin: "0 auto", aspectRatio: "16/9", background: DS.surfaceAlt, border: `1px solid ${DS.border}` }}>
          <div style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", cursor: "pointer", background: `linear-gradient(135deg, rgba(15,15,15,0.9), rgba(30,27,24,0.95))` }}>
            <div style={{ width: 110, height: 110 }}>
              <DotLottieReact data={playButton} loop autoplay />
            </div>
            <span style={{ fontFamily: "'DM Sans'", fontSize: 10, letterSpacing: "0.3em", textTransform: "uppercase", color: DS.textSec, marginTop: 20 }}>Play the highlight film</span>
            <span style={{ fontFamily: "'DM Sans'", fontSize: 9, color: DS.textSec, marginTop: 6, opacity: 0.5, letterSpacing: "0.15em" }}>05:42</span>
          </div>
        </div>
      </section></FadeIn>

      {/* CTA */}
      <section className="cs" style={{ position: "relative", padding: "120px 48px 160px", textAlign: "center", overflow: "hidden" }}>
        <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse at center bottom, rgba(201,169,110,0.05) 0%, transparent 65%)" }} />
        <FadeIn><p style={{ fontFamily: "'DM Sans'", fontSize: 10, letterSpacing: "0.35em", textTransform: "uppercase", color: DS.gold, marginBottom: 24, position: "relative" }}>Your story is next</p></FadeIn>
        <FadeIn><h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(2.2rem, 5vw, 3.8rem)", fontWeight: 700, lineHeight: 1.15, color: DS.text, maxWidth: 650, margin: "0 auto", position: "relative" }}>
          Ready to see your<br />wedding told <em style={{ fontStyle: "italic", color: DS.gold }}>like this?</em>
        </h2></FadeIn>
        <FadeIn><p style={{ fontFamily: "'DM Sans'", fontSize: 14, color: DS.textSec, maxWidth: 480, margin: "24px auto 0", lineHeight: 1.7, position: "relative" }}>
          We take on a limited number of weddings each season to ensure every couple receives our full creative attention.
        </p></FadeIn>
        <FadeIn><Link to="/contact" style={{ display: "inline-block", marginTop: 40, padding: "16px 48px", fontFamily: "'DM Sans'", fontSize: 11, fontWeight: 600, letterSpacing: "0.25em", textTransform: "uppercase", color: DS.bg, background: DS.gold, textDecoration: "none", transition: "all 0.35s", position: "relative" }}
          onMouseEnter={(e) => { e.target.style.background = DS.text; e.target.style.transform = "translateY(-2px)"; }}
          onMouseLeave={(e) => { e.target.style.background = DS.gold; e.target.style.transform = "translateY(0)"; }}>Inquire About Your Date</Link></FadeIn>
        <FadeIn><div style={{ display: "flex", justifyContent: "center", gap: 32, marginTop: 48, flexWrap: "wrap", position: "relative" }}>
          {[
            { l: "Photo packages", h: "/photography" },
            { l: "Film packages", h: "/videography" },
            { l: "Photo + Film bundles", h: "/investment" },
            { l: "Super 8 add-on", h: "/super8" },
          ].map((item) => (
            <Link key={item.l} to={item.h} style={{ fontFamily: "'DM Sans'", fontSize: 10, letterSpacing: "0.2em", textTransform: "uppercase", color: DS.textSec, textDecoration: "none", paddingBottom: 2, borderBottom: "1px solid transparent", transition: "all 0.3s" }}
              onMouseEnter={(e) => { e.target.style.color = DS.gold; e.target.style.borderColor = DS.gold; }}
              onMouseLeave={(e) => { e.target.style.color = DS.textSec; e.target.style.borderColor = "transparent"; }}>{item.l}</Link>
          ))}
        </div></FadeIn>
        <FadeIn><p style={{ fontFamily: "'DM Sans'", fontSize: 10, letterSpacing: "0.25em", textTransform: "uppercase", color: DS.textSec, marginTop: 40, position: "relative", opacity: 0.6 }}>Now booking Spring & Fall 2026 — Limited dates remain</p></FadeIn>
      </section>

      <Footer />
    </div>
  );
}
