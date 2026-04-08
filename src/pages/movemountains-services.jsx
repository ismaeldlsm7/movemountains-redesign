import { useState, useEffect, useRef } from "react";
import { motion, useInView, useScroll, useTransform, AnimatePresence } from "framer-motion";
import Header from "../components/Header";
import Footer from "../components/Footer";
import CheckAvailabilityButton from "../components/CheckAvailabilityButton";

const DS = {
  bg: "#0F0F0F", surface: "#1E1E1E", surfaceAlt: "#161616",
  text: "#F5F0E8", textSec: "#8A8477", gold: "#C9A96E",
  ember: "#E8572A", border: "#2A2A2A",
};

const fontLink = "https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,700;1,400&family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;0,700;1,400;1,500&family=DM+Sans:wght@400;500;600;700&family=Bebas+Neue&display=swap";

/* ── Data ────────────────────────────────────────────────────────── */

const services = [
  {
    id: "photography",
    number: "01",
    name: "Wedding Photography",
    tagline: "Bold. Candid. Yours.",
    description: "Your wedding photography should feel candid, natural, and undeniably yours. We shoot in a contemporary, photojournalistic style — which means we're not pulling you away from your cocktail hour for 45 minutes of posed portraits. We capture what's happening: the surprise kisses, the dance floor energy, the quiet look across the room.",
    features: [
      "Complimentary engagement session",
      "Full-day coverage with dedicated photographer",
      "Second photographer available",
      "Online gallery with print ordering",
      "5 distinct editing styles to choose from",
      "600–1,000 images delivered digitally",
    ],
    color: "#2a2218",
    icon: "◎",
    stats: [
      { value: "600+", label: "Photos Delivered" },
      { value: "5", label: "Editing Styles" },
      { value: "1", label: "Wedding Per Day" },
    ],
  },
  {
    id: "videography",
    number: "02",
    name: "Wedding Videography",
    tagline: "Modern. Moving. Memorable.",
    description: "Every love story deserves a film. Our cinematographers create modern, emotional wedding films that go far beyond a documentation reel. We capture the vows, the toasts, the first dance, and the moments between — edited into a cinematic piece you'll watch on every anniversary. Packages include highlight films and full ceremony edits, delivered in cinema-grade quality.",
    features: [
      "Cinematic highlight film (4–6 min)",
      "Full ceremony edit",
      "Full reception edit available",
      "Professional audio capture",
      "Drone footage available",
      "4K delivery",
    ],
    color: "#1e2024",
    icon: "▶",
    stats: [
      { value: "4K", label: "Cinema Grade" },
      { value: "4-6", label: "Min Highlight" },
      { value: "∞", label: "Rewatches" },
    ],
  },
  {
    id: "super8",
    number: "03",
    name: "Super 8 Film",
    tagline: "Vintage. For the Vibes.",
    description: "This isn't a filter. This is real analog film — shot on vintage Super 8mm cameras, processed in a lab, and delivered with the warmth, grain, and texture that digital can't replicate. Super 8 is for the couple who wants something no one else at their reception will have: a wedding film that looks and feels like a family heirloom from the moment it's made.",
    features: [
      "Shot on authentic Super 8mm film stock",
      "Lab-processed and digitally scanned",
      "Warm, organic film grain texture",
      "3–4 minute highlight reel",
      "Digital delivery in HD",
      "Optional music scoring",
    ],
    color: "#22201a",
    icon: "◉",
    stats: [
      { value: "8", label: "MM Film" },
      { value: "1", label: "Of a Kind" },
      { value: "∞", label: "Nostalgia" },
    ],
  },
  {
    id: "content",
    number: "04",
    name: "Content Creation",
    tagline: "The Moments Between the Moments.",
    description: "Your wedding day is content gold — and most of it disappears into a photographer's hard drive. Our content creation team captures the candid, social-first moments happening between the formal shots: the getting-ready chaos, the bridal party energy, the reception details worth posting. Same-day delivery available for stories and reels.",
    features: [
      "Dedicated content creator on-site",
      "Vertical video for Reels & TikTok",
      "Same-day stories delivery",
      "Behind-the-scenes coverage",
      "Curated for your personal brand",
      "Shareable formats optimized per platform",
    ],
    color: "#1a1e1a",
    icon: "✦",
    stats: [
      { value: "24h", label: "Turnaround" },
      { value: "9:16", label: "Vertical First" },
      { value: "∞", label: "Shareability" },
    ],
  },
  {
    id: "luxebooth",
    number: "05",
    name: "Luxe Booth",
    tagline: "Not Your Average Photo Booth.",
    description: "Luxe Booth is a photo booth experience built for weddings that take themselves seriously. No plastic props, no carnival backdrop. High-quality prints, instant Airdrop sharing, SMS and email delivery, and fully custom branding to match your wedding's design. Your guests get a premium keepsake. You get a guest book that people actually fill out.",
    features: [
      "High-quality instant prints",
      "Airdrop, SMS & email sharing",
      "Custom branding & backdrop",
      "4-hour coverage included",
      "Digital gallery of all booth photos",
      "Zero cheesy props",
    ],
    color: "#201e22",
    icon: "□",
    stats: [
      { value: "4", label: "Hours" },
      { value: "0", label: "Cheesy Props" },
      { value: "100%", label: "Guest Hits" },
    ],
  },
  {
    id: "streaming",
    number: "06",
    name: "Live Streaming",
    tagline: "Because They Deserve to See It.",
    description: "Not everyone can make it to your wedding. Live streaming lets the people who matter most watch your ceremony in real time — professional quality, reliable connection, private link. Simple to set up, meaningful for the people on the other end.",
    features: [
      "Professional quality broadcast",
      "Private, secure viewing link",
      "Multi-camera setup available",
      "Reliable connection guaranteed",
      "Recording available after event",
      "No app download required for viewers",
    ],
    color: "#1a1a1e",
    icon: "◈",
    stats: [
      { value: "HD", label: "Quality" },
      { value: "∞", label: "Guests Reached" },
      { value: "0", label: "Missed Moments" },
    ],
  },
];

const looks = [
  { name: "Classic", desc: "Timeless and true to life. Clean whites, natural skin tones, balanced exposure.", color: "#2a2622", tone: "warm" },
  { name: "Portra", desc: "Inspired by Kodak Portra 400. Soft pastels, lifted shadows, dreamy warmth.", color: "#262220", tone: "film" },
  { name: "Moody", desc: "Deep shadows, rich tones, dramatic contrast. For weddings with atmosphere.", color: "#1a1a1e", tone: "dark" },
  { name: "Bright", desc: "Light, airy, and luminous. High-key exposure with soft, clean colors.", color: "#24221e", tone: "light" },
  { name: "Cinematic", desc: "Film-grade color grading. Teal shadows, amber highlights, movie-like depth.", color: "#1e2024", tone: "cinema" },
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
  const inView = useInView(ref, { once: true, margin: "-20px" });
  return <motion.div ref={ref} initial={{ scaleX: 0 }} animate={inView ? { scaleX: 1 } : {}} transition={{ duration: 0.7, delay, ease: "easeOut" }} style={{ height: 1, background: DS.border, transformOrigin: "left" }} />;
}

/* ── Nav ──────────────────────────────────────────────────────────── */

/* ── Service Section ─────────────────────────────────────────────── */

function ServiceSection({ service, index }) {
  const isReversed = index % 2 !== 0;
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const imgY = useTransform(scrollYProgress, [0, 1], [30, -30]);
  const [expanded, setExpanded] = useState(false);

  return (
    <div ref={ref} style={{ padding: "0 32px" }}>
      <div style={{
        maxWidth: 1400, margin: "0 auto",
        display: "grid", gridTemplateColumns: "1fr 1fr",
        gap: "clamp(32px, 5vw, 80px)", alignItems: "center",
        padding: "80px 0",
      }} className="service-grid">

        {/* Image Side */}
        <div style={{ order: isReversed ? 2 : 1 }}>
          <FadeIn delay={0.05}>
            <div style={{ overflow: "hidden", position: "relative" }}>
              <motion.div style={{ y: imgY }}>
                <div style={{
                  width: "100%", aspectRatio: "4/5", background: service.color,
                  display: "flex", alignItems: "center", justifyContent: "center", position: "relative",
                }}>
                  {/* Big number watermark */}
                  <span style={{
                    fontFamily: "'Bebas Neue'", fontSize: "clamp(120px, 18vw, 200px)", color: DS.gold, opacity: 0.04,
                    position: "absolute", fontWeight: 400, lineHeight: 1,
                  }}>{service.number}</span>
                  <span style={{ fontFamily: "'DM Sans'", fontSize: 12, color: DS.textSec, opacity: 0.25, textTransform: "uppercase", letterSpacing: "0.15em", position: "relative" }}>
                    [ {service.name} ]
                  </span>
                </div>
              </motion.div>

              {/* Stats strip at bottom of image */}
              <div style={{
                display: "grid", gridTemplateColumns: `repeat(${service.stats.length}, 1fr)`, gap: 1,
                background: DS.border, marginTop: 1,
              }}>
                {service.stats.map((s) => (
                  <div key={s.label} style={{ background: DS.surface, padding: "14px 8px", textAlign: "center" }}>
                    <div style={{ fontFamily: "'Bebas Neue'", fontSize: 22, color: DS.gold, lineHeight: 1 }}>{s.value}</div>
                    <div style={{ fontFamily: "'DM Sans'", fontSize: 10, color: DS.textSec, textTransform: "uppercase", letterSpacing: "0.08em", marginTop: 3 }}>{s.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </FadeIn>
        </div>

        {/* Text Side */}
        <div style={{ order: isReversed ? 1 : 2 }}>
          <FadeIn>
            <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 20 }}>
              <span style={{ fontFamily: "'DM Sans'", fontSize: 28, color: DS.gold, opacity: 0.6 }}>{service.icon}</span>
              <span style={{ fontFamily: "'DM Sans'", fontSize: 12, color: DS.gold, textTransform: "uppercase", letterSpacing: "0.2em" }}>{service.number}</span>
              <div style={{ height: 1, flex: 1, background: DS.border }} />
            </div>
          </FadeIn>

          <FadeIn delay={0.08}>
            <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(30px, 3.5vw, 46px)", fontWeight: 700, color: DS.text, lineHeight: 1.1, margin: "0 0 8px" }}>
              {service.name}
            </h2>
          </FadeIn>

          <FadeIn delay={0.12}>
            <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(18px, 2vw, 24px)", color: DS.gold, fontStyle: "italic", fontWeight: 500, margin: "0 0 24px" }}>
              {service.tagline}
            </p>
          </FadeIn>

          <FadeIn delay={0.16}>
            <p style={{ fontFamily: "'DM Sans'", fontSize: "clamp(14px, 1.1vw, 16px)", color: DS.textSec, lineHeight: 1.75, marginBottom: 28 }}>
              {service.description}
            </p>
          </FadeIn>

          {/* Features toggle */}
          <FadeIn delay={0.2}>
            <button onClick={() => setExpanded(!expanded)} style={{
              fontFamily: "'DM Sans'", fontSize: 13, color: DS.gold, background: "none", border: "none",
              cursor: "pointer", padding: 0, display: "flex", alignItems: "center", gap: 8,
              textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 16, transition: "opacity 0.2s",
            }}
              onMouseEnter={(e) => e.currentTarget.style.opacity = 0.7}
              onMouseLeave={(e) => e.currentTarget.style.opacity = 1}
            >
              What's Included
              <motion.span animate={{ rotate: expanded ? 180 : 0 }} transition={{ duration: 0.3 }} style={{ fontSize: 16, display: "inline-block" }}>
                ↓
              </motion.span>
            </button>

            <AnimatePresence>
              {expanded && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.35, ease: [0.25, 0.1, 0.25, 1] }}
                  style={{ overflow: "hidden" }}
                >
                  <div style={{ paddingBottom: 24, paddingTop: 4 }}>
                    {service.features.map((f, i) => (
                      <motion.div
                        key={f}
                        initial={{ opacity: 0, x: -8 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.04 }}
                        style={{
                          display: "flex", alignItems: "center", gap: 12,
                          padding: "10px 0", borderBottom: i < service.features.length - 1 ? `1px solid ${DS.border}` : "none",
                        }}
                      >
                        <span style={{ width: 6, height: 6, background: DS.gold, borderRadius: "50%", flexShrink: 0 }} />
                        <span style={{ fontFamily: "'DM Sans'", fontSize: 14, color: DS.text }}>{f}</span>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </FadeIn>

          <FadeIn delay={0.24}>
            <a href="#" style={{
              fontFamily: "'DM Sans'", fontSize: 13, color: DS.gold, textDecoration: "none",
              textTransform: "uppercase", letterSpacing: "0.08em",
              borderBottom: `1px solid ${DS.gold}`, paddingBottom: 3, transition: "opacity 0.2s", display: "inline-block",
            }}
              onMouseEnter={(e) => e.target.style.opacity = 0.7}
              onMouseLeave={(e) => e.target.style.opacity = 1}
            >See Pricing →</a>
          </FadeIn>
        </div>
      </div>

      <RevealLine />
    </div>
  );
}

/* ── Looks Section ───────────────────────────────────────────────── */

function LooksSection() {
  const [activeLook, setActiveLook] = useState(0);

  return (
    <div style={{ background: DS.surface, borderTop: `1px solid ${DS.border}`, borderBottom: `1px solid ${DS.border}`, padding: "100px 32px" }}>
      <div style={{ maxWidth: 1400, margin: "0 auto" }}>
        <FadeIn>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: 48, flexWrap: "wrap", gap: 24 }}>
            <div>
              <div style={{ fontFamily: "'DM Sans'", fontSize: 12, color: DS.gold, textTransform: "uppercase", letterSpacing: "0.2em", marginBottom: 12 }}>
                Personalize Your Photos
              </div>
              <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(30px, 4vw, 48px)", fontWeight: 700, color: DS.text, margin: 0 }}>
                Choose Your Look
              </h2>
            </div>
            <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 18, color: DS.textSec, fontStyle: "italic", maxWidth: 400, textAlign: "right" }}>
              Five distinct editing styles, each designed to match the aesthetic of your day.
            </p>
          </div>
        </FadeIn>

        <div style={{ display: "grid", gridTemplateColumns: "280px 1fr", gap: 32, alignItems: "start" }} className="looks-grid">
          {/* Look tabs */}
          <FadeIn delay={0.1}>
            <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
              {looks.map((look, i) => (
                <button key={look.name} onClick={() => setActiveLook(i)} style={{
                  fontFamily: "'DM Sans'", fontSize: 14, color: activeLook === i ? DS.text : DS.textSec,
                  background: activeLook === i ? DS.surfaceAlt : "transparent",
                  border: "none", borderLeft: activeLook === i ? `2px solid ${DS.gold}` : `2px solid transparent`,
                  padding: "16px 20px", cursor: "pointer", textAlign: "left",
                  transition: "all 0.3s", display: "flex", alignItems: "center", gap: 12,
                }}>
                  <span style={{ fontFamily: "'Bebas Neue'", fontSize: 18, color: DS.gold, opacity: activeLook === i ? 1 : 0.4, width: 28 }}>
                    0{i + 1}
                  </span>
                  <span style={{ fontWeight: activeLook === i ? 600 : 400 }}>{look.name}</span>
                </button>
              ))}
            </div>
          </FadeIn>

          {/* Look preview */}
          <FadeIn delay={0.15}>
            <AnimatePresence mode="wait">
              <motion.div
                key={activeLook}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.3 }}
              >
                {/* Preview images grid */}
                <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr", gap: 12, marginBottom: 24 }}>
                  <div style={{
                    aspectRatio: "3/4", background: looks[activeLook].color,
                    display: "flex", alignItems: "center", justifyContent: "center",
                  }}>
                    <span style={{ fontFamily: "'DM Sans'", fontSize: 12, color: DS.textSec, opacity: 0.25, textTransform: "uppercase", letterSpacing: "0.12em" }}>
                      [ {looks[activeLook].name} — Sample A ]
                    </span>
                  </div>
                  <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                    <div style={{
                      flex: 1, background: looks[activeLook].color, opacity: 0.8,
                      display: "flex", alignItems: "center", justifyContent: "center",
                    }}>
                      <span style={{ fontFamily: "'DM Sans'", fontSize: 10, color: DS.textSec, opacity: 0.2, textTransform: "uppercase", letterSpacing: "0.1em" }}>[ Sample B ]</span>
                    </div>
                    <div style={{
                      flex: 1, background: looks[activeLook].color, opacity: 0.6,
                      display: "flex", alignItems: "center", justifyContent: "center",
                    }}>
                      <span style={{ fontFamily: "'DM Sans'", fontSize: 10, color: DS.textSec, opacity: 0.2, textTransform: "uppercase", letterSpacing: "0.1em" }}>[ Sample C ]</span>
                    </div>
                  </div>
                </div>

                {/* Look info */}
                <div style={{ padding: "24px 0", borderTop: `1px solid ${DS.border}` }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 12 }}>
                    <h3 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 26, fontWeight: 600, color: DS.text, margin: 0 }}>
                      {looks[activeLook].name}
                    </h3>
                    <div style={{
                      fontFamily: "'DM Sans'", fontSize: 10, color: DS.gold, textTransform: "uppercase", letterSpacing: "0.1em",
                      padding: "4px 10px", border: `1px solid ${DS.gold}`, opacity: 0.7,
                    }}>
                      {looks[activeLook].tone}
                    </div>
                  </div>
                  <p style={{ fontFamily: "'DM Sans'", fontSize: 15, color: DS.textSec, lineHeight: 1.65, margin: 0 }}>
                    {looks[activeLook].desc}
                  </p>
                </div>
              </motion.div>
            </AnimatePresence>
          </FadeIn>
        </div>
      </div>
    </div>
  );
}

/* ── Process Section ─────────────────────────────────────────────── */

function ProcessSection() {
  const steps = [
    { num: "01", title: "Inquire", desc: "Tell us your date, venue, and what services you're interested in. We respond within 24 hours." },
    { num: "02", title: "Connect", desc: "We'll schedule a call or in-person meeting to learn about your vision and walk through our packages." },
    { num: "03", title: "Book", desc: "Choose your package, sign your contract, and secure your date with a retainer. We only take one wedding per day." },
    { num: "04", title: "Plan", desc: "Meet your creative team, build your photo timeline, coordinate with your other vendors, and finalize your shot list." },
    { num: "05", title: "Celebrate", desc: "Your wedding day. We handle everything behind the lens — you just enjoy every moment." },
    { num: "06", title: "Relive", desc: "Receive your sneak peek within days. Full gallery delivered in 6–8 weeks. Films delivered in 8–12 weeks." },
  ];

  return (
    <div style={{ padding: "100px 32px", maxWidth: 1400, margin: "0 auto" }}>
      <FadeIn>
        <div style={{ textAlign: "center", marginBottom: 60 }}>
          <div style={{ fontFamily: "'DM Sans'", fontSize: 12, color: DS.gold, textTransform: "uppercase", letterSpacing: "0.2em", marginBottom: 12 }}>From First Click to Final Delivery</div>
          <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(30px, 4vw, 48px)", fontWeight: 700, color: DS.text, margin: 0 }}>How It Works</h2>
        </div>
      </FadeIn>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 20 }}>
        {steps.map((s, i) => (
          <FadeIn key={s.num} delay={i * 0.06}>
            <div style={{
              padding: "28px 24px", border: `1px solid ${DS.border}`, height: "100%",
              position: "relative", transition: "border-color 0.4s, background 0.4s",
            }}
              onMouseEnter={(e) => { e.currentTarget.style.borderColor = DS.gold; e.currentTarget.style.background = DS.surfaceAlt; }}
              onMouseLeave={(e) => { e.currentTarget.style.borderColor = DS.border; e.currentTarget.style.background = "transparent"; }}
            >
              <div style={{ fontFamily: "'Bebas Neue'", fontSize: 36, color: DS.gold, opacity: 0.25, lineHeight: 1, marginBottom: 12 }}>{s.num}</div>
              <h3 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 22, fontWeight: 600, color: DS.text, marginBottom: 10 }}>{s.title}</h3>
              <p style={{ fontFamily: "'DM Sans'", fontSize: 14, color: DS.textSec, lineHeight: 1.6 }}>{s.desc}</p>
              {i < steps.length - 1 && (
                <div style={{
                  position: "absolute", right: -12, top: "50%", transform: "translateY(-50%)",
                  fontFamily: "'DM Sans'", fontSize: 16, color: DS.border,
                }} className="step-arrow">→</div>
              )}
            </div>
          </FadeIn>
        ))}
      </div>
    </div>
  );
}

/* ── FAQ ──────────────────────────────────────────────────────────── */

function FAQ() {
  const [openIndex, setOpenIndex] = useState(null);
  const faqs = [
    { q: "How far in advance should we book?", a: "Popular dates (May–October) book 12–18 months in advance. We recommend reaching out as soon as you have a date secured. We only take one event per day, so availability is limited." },
    { q: "Will we meet our photographer before the wedding?", a: "Yes. We schedule planning meetings throughout your engagement to build your timeline, discuss shot lists, and make sure you're comfortable with your creative team before the big day." },
    { q: "How long until we receive our photos?", a: "Full gallery delivery is typically 6–8 weeks after your wedding date. You'll receive a sneak peek of 20–30 images within 3–5 days." },
    { q: "Do you travel outside New England?", a: "We travel everywhere. Venues within 60 miles of Providence are included. 60–100 miles incurs a $200 travel fee. Beyond 100 miles, a $300 fee applies and may require overnight accommodations." },
    { q: "Can we customize our package?", a: "Absolutely. All packages can be tailored to your needs. Whether you want to add a second photographer, Super 8 film, content creation, or Luxe Booth — we build around you." },
    { q: "What happens if it rains?", a: "Rain has never ruined a wedding on our watch. We've shot in snow, wind, and downpours — and some of our most cinematic images have come from less-than-perfect weather. We also may buy umbrellas at 10pm the night before. We're that team." },
  ];

  return (
    <div style={{ padding: "100px 32px", maxWidth: 800, margin: "0 auto" }}>
      <FadeIn>
        <div style={{ textAlign: "center", marginBottom: 48 }}>
          <div style={{ fontFamily: "'DM Sans'", fontSize: 12, color: DS.gold, textTransform: "uppercase", letterSpacing: "0.2em", marginBottom: 12 }}>Questions</div>
          <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(28px, 3.5vw, 42px)", fontWeight: 700, color: DS.text, margin: 0 }}>Frequently Asked</h2>
        </div>
      </FadeIn>

      <div>
        {faqs.map((faq, i) => (
          <FadeIn key={i} delay={i * 0.04}>
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
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
                    style={{ overflow: "hidden" }}
                  >
                    <p style={{ fontFamily: "'DM Sans'", fontSize: 15, color: DS.textSec, lineHeight: 1.7, paddingBottom: 20, margin: 0 }}>
                      {faq.a}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </FadeIn>
        ))}
      </div>
    </div>
  );
}

/* ── Main Services Page ──────────────────────────────────────────── */

export default function ServicesPage() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 40);
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
          .nav-links { display: none !important; }
          .service-grid { grid-template-columns: 1fr !important; }
          .service-grid > * { order: unset !important; }
          .looks-grid { grid-template-columns: 1fr !important; }
          .step-arrow { display: none !important; }
        }
      `}</style>

      <Header activePage="Services" />

      {/* ── PAGE HEADER ───────────────────────────────────────────── */}
      <div style={{ paddingTop: 100, maxWidth: 1400, margin: "0 auto", paddingLeft: 32, paddingRight: 32 }}>
        {/* Breadcrumb */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }}>
          <div style={{ fontFamily: "'DM Sans'", fontSize: 12, color: DS.textSec, marginBottom: 32 }}>
            <a href="#" style={{ color: DS.textSec, textDecoration: "none", transition: "color 0.2s" }}
              onMouseEnter={(e) => e.target.style.color = DS.gold} onMouseLeave={(e) => e.target.style.color = DS.textSec}
            >Home</a>
            <span style={{ margin: "0 10px", opacity: 0.4 }}>/</span>
            <span style={{ color: DS.gold }}>Services</span>
          </div>
        </motion.div>

        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", flexWrap: "wrap", gap: 24, marginBottom: 20 }}>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.35, duration: 0.6 }}>
            <div style={{ fontFamily: "'DM Sans'", fontSize: 12, color: DS.gold, textTransform: "uppercase", letterSpacing: "0.2em", marginBottom: 12 }}>
              Everything We Bring to Your Day
            </div>
            <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(38px, 5.5vw, 68px)", fontWeight: 700, color: DS.text, lineHeight: 1.05, margin: 0 }}>
              Services
            </h1>
          </motion.div>

          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }} style={{
            fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(16px, 1.8vw, 20px)", color: DS.textSec,
            maxWidth: 420, fontStyle: "italic", lineHeight: 1.5, textAlign: "right",
          }}>
            No upsells. No mystery packages. Just a clear menu of services designed to capture every version of your story.
          </motion.p>
        </div>

        <motion.div initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} transition={{ delay: 0.55, duration: 0.8, ease: "easeOut" }}
          style={{ height: 1, background: DS.border, transformOrigin: "left" }} />
      </div>

      {/* ── QUICK NAV STRIP ───────────────────────────────────────── */}
      <div style={{ padding: "32px 32px 0" }}>
        <div style={{ maxWidth: 1400, margin: "0 auto", display: "flex", gap: 16, flexWrap: "wrap", justifyContent: "center" }}>
          {services.map((s) => (
            <a key={s.id} href={`#${s.id}`} style={{
              fontFamily: "'DM Sans'", fontSize: 12, color: DS.textSec, textDecoration: "none",
              textTransform: "uppercase", letterSpacing: "0.08em",
              padding: "8px 16px", border: `1px solid ${DS.border}`, transition: "all 0.3s",
              display: "flex", alignItems: "center", gap: 8,
            }}
              onMouseEnter={(e) => { e.currentTarget.style.borderColor = DS.gold; e.currentTarget.style.color = DS.gold; }}
              onMouseLeave={(e) => { e.currentTarget.style.borderColor = DS.border; e.currentTarget.style.color = DS.textSec; }}
            >
              <span style={{ fontSize: 16 }}>{s.icon}</span>
              {s.name.replace("Wedding ", "")}
            </a>
          ))}
        </div>
      </div>

      {/* ── SERVICE SECTIONS ──────────────────────────────────────── */}
      {services.map((service, i) => (
        <div key={service.id} id={service.id}>
          <ServiceSection service={service} index={i} />
        </div>
      ))}

      {/* ── LOOKS ─────────────────────────────────────────────────── */}
      <LooksSection />

      {/* ── PROCESS ───────────────────────────────────────────────── */}
      <ProcessSection />

      {/* ── FAQ ───────────────────────────────────────────────────── */}
      <div style={{ borderTop: `1px solid ${DS.border}` }}>
        <FAQ />
      </div>

      {/* ── CTA ───────────────────────────────────────────────────── */}
      <div style={{ borderTop: `1px solid ${DS.border}`, padding: "100px 32px", textAlign: "center", background: `linear-gradient(160deg, #1a1410 0%, #1a1612 50%, ${DS.bg} 100%)` }}>
        <FadeIn>
          <div style={{ fontFamily: "'DM Sans'", fontSize: 12, color: DS.gold, textTransform: "uppercase", letterSpacing: "0.2em", marginBottom: 16 }}>Ready to Book?</div>
          <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(30px, 4.5vw, 52px)", fontWeight: 700, color: DS.text, lineHeight: 1.1, margin: "0 0 16px" }}>
            Let's Build Your Package
          </h2>
          <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 20, color: DS.textSec, fontStyle: "italic", marginBottom: 36 }}>
            Every package is customizable. Tell us what you need — we'll make it happen.
          </p>
          <div style={{ display: "flex", gap: 16, justifyContent: "center", flexWrap: "wrap" }}>
            <CheckAvailabilityButton />
            <a href="#" style={{
              fontFamily: "'DM Sans'", fontSize: 14, color: DS.gold, padding: "16px 40px", textDecoration: "none", textTransform: "uppercase", letterSpacing: "0.1em", fontWeight: 600,
              border: `1px solid ${DS.gold}`, transition: "all 0.3s",
            }}
              onMouseEnter={(e) => { e.target.style.background = DS.gold; e.target.style.color = DS.bg; }}
              onMouseLeave={(e) => { e.target.style.background = "transparent"; e.target.style.color = DS.gold; }}
            >View Investment</a>
          </div>
        </FadeIn>
      </div>

      <Footer />
    </div>
  );
}
