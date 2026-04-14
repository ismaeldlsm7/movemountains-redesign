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

/* ── Data ───────────────────────────────────────────────────────── */

const equipmentCategories = [
  {
    name: "Camera Bodies",
    items: [
      { name: "Sony A7 IV", rate: "$75/day", desc: "Full-frame mirrorless. 33MP. Ideal for weddings and portraits." },
      { name: "Sony A7S III", rate: "$95/day", desc: "Low-light monster. 4K 120fps. The go-to for cinematic video." },
      { name: "Canon R6 Mark II", rate: "$80/day", desc: "Dual-pixel AF. 24.2MP. Fast burst for action and ceremony." },
      { name: "Sony FX3", rate: "$110/day", desc: "Cinema line. S-Cinetone. Built for professional filmmaking." },
    ],
    icon: "◎",
  },
  {
    name: "Lenses",
    items: [
      { name: "Sony 24-70mm f/2.8 GM II", rate: "$45/day", desc: "The workhorse zoom. Sharp corner-to-corner at every focal length." },
      { name: "Sony 70-200mm f/2.8 GM II", rate: "$50/day", desc: "Ceremony staple. Compression and bokeh that separates subject from crowd." },
      { name: "Sony 35mm f/1.4 GM", rate: "$35/day", desc: "Wide and fast. Perfect for environmental portraits and getting-ready." },
      { name: "Sony 85mm f/1.4 GM", rate: "$35/day", desc: "Portrait king. Creamy bokeh with razor-sharp subject isolation." },
      { name: "Canon RF 28-70mm f/2 L", rate: "$55/day", desc: "The f/2 zoom that changed everything. Unmatched low-light versatility." },
      { name: "Sigma 35mm f/1.4 Art", rate: "$25/day", desc: "Art series sharpness at an accessible price point." },
    ],
    icon: "◇",
  },
  {
    name: "Lighting",
    items: [
      { name: "Profoto B10 Plus", rate: "$60/day", desc: "500Ws portable. HSS and TTL. Overpower the sun." },
      { name: "Profoto A2", rate: "$35/day", desc: "On-camera flash reimagined. Magnetic modifiers, round head." },
      { name: "Godox AD600 Pro", rate: "$40/day", desc: "600Ws beast. Bowens mount. Great for large group setups." },
      { name: "Nanlite Forza 60C", rate: "$30/day", desc: "RGBWW LED. Full color control for creative studio work." },
      { name: "Westcott Ice Light 2", rate: "$20/day", desc: "Handheld LED wand. Elegant accent light for receptions." },
    ],
    icon: "△",
  },
  {
    name: "Audio + Video",
    items: [
      { name: "DJI RS 3 Pro", rate: "$45/day", desc: "3-axis gimbal. 4.5kg payload. Smooth cinematic movement." },
      { name: "DJI Ronin 4D", rate: "$150/day", desc: "Built-in LiDAR focus. 6K cinema camera + gimbal in one." },
      { name: "Rode Wireless Pro", rate: "$25/day", desc: "Dual-channel wireless. 32-bit float. Ceremony audio without the anxiety." },
      { name: "Sennheiser MKE 600", rate: "$20/day", desc: "Shotgun mic. Clean directional audio for vows and speeches." },
      { name: "DJI Mini 4 Pro", rate: "$55/day", desc: "Sub-249g drone. 4K/60fps. No Part 107 required for recreational use." },
    ],
    icon: "▶",
  },
  {
    name: "Grip + Accessories",
    items: [
      { name: "C-Stand Kit (40\")", rate: "$15/day", desc: "Heavy-duty with arm and knuckle. The backbone of any lighting setup." },
      { name: "V-Mount Battery Kit (2x)", rate: "$20/day", desc: "98Wh batteries + dual charger. Keep cinema cameras rolling all day." },
      { name: "Pelican Air 1615", rate: "$15/day", desc: "Travel-ready hard case. TSA-approved. Fits a full camera kit." },
      { name: "5-in-1 Reflector (43\")", rate: "$8/day", desc: "Gold, silver, white, black, translucent. Natural light shaping." },
    ],
    icon: "□",
  },
];

const studioFeatures = [
  { title: "Shooting Bay", size: "800 sq ft", desc: "White cyc wall, 14ft ceilings, blackout capability. Pre-lit grid with Profoto and Nanlite fixtures. Fits full bridal parties, product spreads, or content shoots.", icon: "◎" },
  { title: "Edit Suite", size: "220 sq ft", desc: "Dual-monitor color-calibrated workstation. DaVinci Resolve and Lightroom licensed. Sound-isolated for focused post-production sessions.", icon: "◇" },
  { title: "Client Lounge", size: "350 sq ft", desc: "Styled seating area for consultations, album reveals, and styled shoots. Natural light from floor-to-ceiling windows. Available as a backdrop for content.", icon: "○" },
  { title: "Podcast / Content Room", size: "180 sq ft", desc: "Sound-treated walls. Ring light and key light included. Two-camera setup ready. Perfect for interviews, reels, and branded video content.", icon: "△" },
];

const officeOptions = [
  { name: "Hot Desk", rate: "$25/day", monthly: "$350/mo", desc: "Drop in any time. High-speed WiFi, monitor, and access to common areas. First come, first served seating in the open studio.", capacity: "1 person", availability: "Walk-in" },
  { name: "Dedicated Desk", rate: "$45/day", monthly: "$600/mo", desc: "Your own permanent workspace in the shared studio. Lockable storage, dual monitor setup, and 24/7 building access.", capacity: "1 person", availability: "Monthly commitment" },
  { name: "Private Office", rate: "$85/day", monthly: "$1,200/mo", desc: "Enclosed office space with a door that closes. Fits a desk, storage, and a small meeting area. Ideal for editors, planners, or small teams.", capacity: "1–3 people", availability: "6-month minimum" },
  { name: "Meeting Room", rate: "$40/hr", monthly: "—", desc: "Boardroom-style table for 8. Screen for presentations, whiteboard wall, and catering-ready counter. Book by the hour for client meetings or team sessions.", capacity: "Up to 8", availability: "Hourly booking" },
];

/* ── Equipment Category Component ──────────────────────────────── */

function EquipmentCategory({ category, index }) {
  const [expanded, setExpanded] = useState(false);
  return (
    <FadeIn delay={index * 0.06}>
      <div style={{ border: `1px solid ${DS.border}`, transition: "border-color 0.3s" }}
        onMouseEnter={(e) => e.currentTarget.style.borderColor = "rgba(201,169,110,0.3)"}
        onMouseLeave={(e) => e.currentTarget.style.borderColor = DS.border}>
        <button onClick={() => setExpanded(!expanded)} style={{
          width: "100%", display: "flex", justifyContent: "space-between", alignItems: "center",
          padding: "24px 28px", background: "none", border: "none", cursor: "pointer", textAlign: "left",
        }}>
          <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
            <span style={{ fontFamily: "'DM Sans'", fontSize: 24, color: DS.gold, opacity: 0.6 }}>{category.icon}</span>
            <div>
              <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: 22, fontWeight: 700, color: DS.text, margin: 0 }}>{category.name}</h3>
              <span style={{ fontFamily: "'DM Sans'", fontSize: 12, color: DS.textSec }}>{category.items.length} items available</span>
            </div>
          </div>
          <motion.span animate={{ rotate: expanded ? 45 : 0 }} transition={{ duration: 0.2 }}
            style={{ fontFamily: "'DM Sans'", fontSize: 24, color: DS.gold, flexShrink: 0, lineHeight: 1 }}>+</motion.span>
        </button>

        <AnimatePresence>
          {expanded && (
            <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.35 }} style={{ overflow: "hidden" }}>
              <div style={{ padding: "0 28px 28px", borderTop: `1px solid ${DS.border}` }}>
                {category.items.map((item, i) => (
                  <div key={item.name} style={{ display: "grid", gridTemplateColumns: "1fr auto", gap: 16, padding: "16px 0", borderBottom: i < category.items.length - 1 ? `1px solid ${DS.border}` : "none", alignItems: "start" }} className="equipment-row">
                    <div>
                      <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 18, fontWeight: 600, color: DS.text }}>{item.name}</div>
                      <div style={{ fontFamily: "'DM Sans'", fontSize: 13, color: DS.textSec, lineHeight: 1.55, marginTop: 2 }}>{item.desc}</div>
                    </div>
                    <div style={{ fontFamily: "'Bebas Neue'", fontSize: 20, color: DS.gold, whiteSpace: "nowrap", lineHeight: 1, paddingTop: 4 }}>{item.rate}</div>
                  </div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </FadeIn>
  );
}

/* ── Studio Feature Card ───────────────────────────────────────── */

function StudioCard({ feature, index }) {
  return (
    <FadeIn delay={index * 0.08}>
      <div style={{
        border: `1px solid ${DS.border}`, padding: "clamp(24px, 3vw, 36px)", height: "100%",
        transition: "border-color 0.4s, background 0.4s", display: "flex", flexDirection: "column",
      }}
        onMouseEnter={(e) => { e.currentTarget.style.borderColor = DS.gold; e.currentTarget.style.background = DS.surfaceAlt; }}
        onMouseLeave={(e) => { e.currentTarget.style.borderColor = DS.border; e.currentTarget.style.background = "transparent"; }}
      >
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 16 }}>
          <span style={{ fontFamily: "'DM Sans'", fontSize: 28, color: DS.gold, opacity: 0.7 }}>{feature.icon}</span>
          <span style={{ fontFamily: "'Bebas Neue'", fontSize: 14, color: DS.textSec, letterSpacing: "0.08em" }}>{feature.size}</span>
        </div>
        <h3 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 24, fontWeight: 600, color: DS.text, marginBottom: 12 }}>{feature.title}</h3>
        <p style={{ fontFamily: "'DM Sans'", fontSize: 14, color: DS.textSec, lineHeight: 1.65, flex: 1 }}>{feature.desc}</p>
      </div>
    </FadeIn>
  );
}

/* ── Office Option Row ─────────────────────────────────────────── */

function OfficeOption({ option, index }) {
  return (
    <FadeIn delay={index * 0.08}>
      <div style={{ border: `1px solid ${DS.border}`, transition: "border-color 0.3s" }}
        onMouseEnter={(e) => e.currentTarget.style.borderColor = "rgba(201,169,110,0.3)"}
        onMouseLeave={(e) => e.currentTarget.style.borderColor = DS.border}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr auto", gap: 24, padding: "28px", alignItems: "start" }} className="office-row">
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 8, flexWrap: "wrap" }}>
              <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: 22, fontWeight: 700, color: DS.text, margin: 0 }}>{option.name}</h3>
              <div style={{ display: "flex", gap: 8 }}>
                <span style={{ fontFamily: "'DM Sans'", fontSize: 11, color: DS.gold, textTransform: "uppercase", letterSpacing: "0.06em", border: `1px solid ${DS.gold}`, padding: "2px 8px", opacity: 0.7 }}>{option.capacity}</span>
                <span style={{ fontFamily: "'DM Sans'", fontSize: 11, color: DS.textSec, textTransform: "uppercase", letterSpacing: "0.06em", border: `1px solid ${DS.border}`, padding: "2px 8px" }}>{option.availability}</span>
              </div>
            </div>
            <p style={{ fontFamily: "'DM Sans'", fontSize: 14, color: DS.textSec, lineHeight: 1.65 }}>{option.desc}</p>
          </div>
          <div style={{ textAlign: "right", flexShrink: 0 }}>
            <div style={{ fontFamily: "'Bebas Neue'", fontSize: 28, color: DS.gold, lineHeight: 1 }}>{option.rate}</div>
            {option.monthly !== "—" && (
              <div style={{ fontFamily: "'DM Sans'", fontSize: 12, color: DS.textSec, marginTop: 4 }}>or {option.monthly}</div>
            )}
          </div>
        </div>
      </div>
    </FadeIn>
  );
}

/* ── Process Steps ─────────────────────────────────────────────── */

function ProcessSteps() {
  const steps = [
    { number: "01", title: "Browse + Reserve", desc: "Check availability online or reach out directly. Tell us what you need, when, and for how long. We'll confirm stock and hold it for you." },
    { number: "02", title: "Pickup or Delivery", desc: "Grab your gear at the MMC studio in Providence. For multi-day or large rentals, we offer delivery within the greater RI area." },
    { number: "03", title: "Shoot + Create", desc: "Use professional equipment without the professional price tag. Gear is inspected, cleaned, and firmware-updated before every rental." },
    { number: "04", title: "Return + Review", desc: "Bring it back on time, in the same condition. We handle cleaning and maintenance. Late returns incur a flat $25/day fee." },
  ];

  return (
    <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 24 }} className="process-grid">
      {steps.map((step, i) => (
        <FadeIn key={step.number} delay={i * 0.1}>
          <div style={{ textAlign: "center" }}>
            <div style={{ fontFamily: "'Bebas Neue'", fontSize: "clamp(48px, 7vw, 72px)", color: DS.gold, opacity: 0.15, lineHeight: 1, marginBottom: 8 }}>{step.number}</div>
            <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: 19, fontWeight: 700, color: DS.text, marginBottom: 10 }}>{step.title}</h3>
            <p style={{ fontFamily: "'DM Sans'", fontSize: 13, color: DS.textSec, lineHeight: 1.6 }}>{step.desc}</p>
          </div>
        </FadeIn>
      ))}
    </div>
  );
}

/* ── Main Rentals Page ─────────────────────────────────────────── */

export default function RentalsPage() {
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const heroScale = useTransform(scrollYProgress, [0, 1], [1.05, 1.18]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  const [activeTab, setActiveTab] = useState("equipment");

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
          .chapter-grid { grid-template-columns: 1fr !important; }
          .chapter-grid > * { order: unset !important; }
          .studio-grid { grid-template-columns: 1fr !important; }
          .process-grid { grid-template-columns: 1fr 1fr !important; }
          .office-row { grid-template-columns: 1fr !important; }
          .equipment-row { grid-template-columns: 1fr !important; }
          .tab-bar { flex-direction: column !important; }
          .policies-grid { grid-template-columns: 1fr !important; }
        }
        @media (max-width: 540px) {
          .process-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>

      <Header activePage="Services" />

      {/* ── HERO ──────────────────────────────────────────────────── */}
      <div ref={heroRef} style={{ height: "65vh", minHeight: 440, maxHeight: 720, position: "relative", overflow: "hidden" }}>
        <motion.div style={{ scale: heroScale, position: "absolute", inset: 0 }}>
          <div style={{
            width: "100%", height: "100%",
            background: "linear-gradient(160deg, var(--mm-surface) 0%, var(--mm-surface-alt) 40%, var(--mm-surface) 70%, var(--mm-bg) 100%)",
            display: "flex", alignItems: "center", justifyContent: "center",
          }}>
            <span style={{ fontFamily: "'DM Sans'", fontSize: 13, color: DS.textSec, opacity: 0.3, textTransform: "uppercase", letterSpacing: "0.2em" }}>
              [ MMC Studio — Equipment + Workspace ]
            </span>
          </div>
        </motion.div>

        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to bottom, rgba(15,15,15,0.2) 0%, rgba(15,15,15,0.15) 40%, rgba(15,15,15,0.75) 80%, var(--mm-bg) 100%)" }} />

        <motion.div style={{ opacity: heroOpacity, position: "absolute", bottom: "12%", left: 0, right: 0, padding: "0 32px" }}>
          <div style={{ maxWidth: 1400, margin: "0 auto" }}>
            <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5, duration: 0.7 }}>
              <div style={{ fontFamily: "'DM Sans'", fontSize: 12, color: DS.gold, textTransform: "uppercase", letterSpacing: "0.2em", marginBottom: 16 }}>Equipment + Space Rentals</div>
              <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(38px, 6vw, 72px)", fontWeight: 700, color: DS.text, lineHeight: 1.05, margin: 0, maxWidth: 750 }}>
                Pro Gear.<br /><span style={{ color: DS.gold }}>Creative Space.</span><br />No Commitment.
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
              Not every creative needs to own a $6,000 camera body to produce $6,000 work. We opened our gear room and studio doors so talented people can access professional tools — whether it's for a single shoot or a full production week.
            </p>
          </div>
        </FadeIn>
        <RevealLine delay={0.2} />
      </div>

      {/* ── TAB NAVIGATION ────────────────────────────────────────── */}
      <div style={{ maxWidth: 1400, margin: "0 auto", padding: "60px 32px 0" }}>
        <FadeIn>
          <div style={{ display: "flex", gap: 0, borderBottom: `1px solid ${DS.border}` }} className="tab-bar">
            {[
              { key: "equipment", label: "Equipment Rentals" },
              { key: "studio", label: "Studio Space" },
              { key: "office", label: "Office + Coworking" },
            ].map((tab) => (
              <button key={tab.key} onClick={() => setActiveTab(tab.key)} style={{
                fontFamily: "'DM Sans'", fontSize: 13, color: activeTab === tab.key ? DS.gold : DS.textSec,
                background: "none", border: "none", borderBottom: activeTab === tab.key ? `2px solid ${DS.gold}` : "2px solid transparent",
                padding: "16px 28px", cursor: "pointer", textTransform: "uppercase", letterSpacing: "0.1em", fontWeight: 600,
                transition: "all 0.3s",
              }}
                onMouseEnter={(e) => { if (activeTab !== tab.key) e.target.style.color = DS.text; }}
                onMouseLeave={(e) => { if (activeTab !== tab.key) e.target.style.color = DS.textSec; }}
              >{tab.label}</button>
            ))}
          </div>
        </FadeIn>
      </div>

      {/* ── EQUIPMENT TAB ─────────────────────────────────────────── */}
      {activeTab === "equipment" && (
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
          <div style={{ maxWidth: 1000, margin: "0 auto", padding: "60px 32px 100px" }}>
            <FadeIn>
              <div style={{ marginBottom: 40 }}>
                <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(28px, 3.5vw, 42px)", fontWeight: 700, color: DS.text, margin: "0 0 12px" }}>
                  Equipment Catalog
                </h2>
                <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(17px, 2vw, 22px)", color: DS.textSec, fontStyle: "italic", maxWidth: 550 }}>
                  Professional-grade gear, inspected and ready. Daily and weekly rates available.
                </p>
              </div>
            </FadeIn>

            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              {equipmentCategories.map((cat, i) => (
                <EquipmentCategory key={cat.name} category={cat} index={i} />
              ))}
            </div>

            {/* Rental tiers */}
            <div style={{ marginTop: 60 }}>
              <FadeIn>
                <div style={{ fontFamily: "'DM Sans'", fontSize: 12, color: DS.gold, textTransform: "uppercase", letterSpacing: "0.2em", marginBottom: 20 }}>Bulk Pricing</div>
              </FadeIn>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 16 }} className="policies-grid">
                {[
                  { tier: "Weekend", duration: "Fri–Sun", discount: "2-day rate", desc: "Pick up Friday, return Monday morning. Pay for two days." },
                  { tier: "Weekly", duration: "7 days", discount: "25% off", desc: "Full week access. Best for multi-day shoots or production weeks." },
                  { tier: "Monthly", duration: "30 days", discount: "40% off", desc: "Long-term rentals for ongoing projects. Includes priority reservations." },
                ].map((t, i) => (
                  <FadeIn key={t.tier} delay={i * 0.08}>
                    <div style={{ border: `1px solid ${DS.border}`, padding: "24px", textAlign: "center", transition: "border-color 0.3s" }}
                      onMouseEnter={(e) => e.currentTarget.style.borderColor = DS.gold}
                      onMouseLeave={(e) => e.currentTarget.style.borderColor = DS.border}>
                      <div style={{ fontFamily: "'Bebas Neue'", fontSize: 32, color: DS.gold, lineHeight: 1, marginBottom: 4 }}>{t.discount}</div>
                      <div style={{ fontFamily: "'Playfair Display', serif", fontSize: 18, fontWeight: 700, color: DS.text, marginBottom: 4 }}>{t.tier}</div>
                      <div style={{ fontFamily: "'DM Sans'", fontSize: 12, color: DS.textSec, marginBottom: 10, textTransform: "uppercase", letterSpacing: "0.06em" }}>{t.duration}</div>
                      <div style={{ fontFamily: "'DM Sans'", fontSize: 13, color: DS.textSec, lineHeight: 1.55 }}>{t.desc}</div>
                    </div>
                  </FadeIn>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      )}

      {/* ── STUDIO TAB ────────────────────────────────────────────── */}
      {activeTab === "studio" && (
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
          <div style={{ maxWidth: 1400, margin: "0 auto", padding: "60px 32px 0" }}>
            <FadeIn>
              <div style={{ marginBottom: 48 }}>
                <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(28px, 3.5vw, 42px)", fontWeight: 700, color: DS.text, margin: "0 0 12px" }}>
                  Studio Spaces
                </h2>
                <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(17px, 2vw, 22px)", color: DS.textSec, fontStyle: "italic", maxWidth: 600 }}>
                  The MMC studio in Providence — designed for creatives who need more than a white wall and a ring light.
                </p>
              </div>
            </FadeIn>

            <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 24, marginBottom: 60 }} className="studio-grid">
              {studioFeatures.map((f, i) => (
                <StudioCard key={f.title} feature={f} index={i} />
              ))}
            </div>
          </div>

          {/* Studio gallery strip */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 4, marginBottom: 60 }} className="studio-grid">
            <FadeIn><ParallaxImage color="#2a2218" label="Shooting Bay — Cyc Wall" aspect="16/9" offset={20} /></FadeIn>
            <FadeIn delay={0.1}><ParallaxImage color="#1e2024" label="Edit Suite — Dual Monitor" aspect="16/9" offset={20} /></FadeIn>
            <FadeIn delay={0.2}><ParallaxImage color="#1a1e1a" label="Client Lounge — Natural Light" aspect="16/9" offset={20} /></FadeIn>
          </div>

          {/* Studio rates */}
          <div style={{ maxWidth: 1000, margin: "0 auto", padding: "0 32px 100px" }}>
            <FadeIn>
              <div style={{ fontFamily: "'DM Sans'", fontSize: 12, color: DS.gold, textTransform: "uppercase", letterSpacing: "0.2em", marginBottom: 24 }}>Studio Rates</div>
            </FadeIn>
            <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>
              {[
                { space: "Shooting Bay", half: "$150", full: "$250", note: "Half-day = 4hrs. Full-day = 8hrs. Includes pre-lit grid." },
                { space: "Edit Suite", half: "$60", full: "$100", note: "Software included. Bring your own hard drive." },
                { space: "Client Lounge", half: "$75", full: "$120", note: "Styled furniture included. Catering-ready." },
                { space: "Podcast Room", half: "$50", full: "$80", note: "Audio + lighting included. Bring your own camera or rent ours." },
                { space: "Full Studio", half: "$300", full: "$500", note: "Access to all spaces. Ideal for production days or workshops." },
              ].map((s, i) => (
                <FadeIn key={s.space} delay={i * 0.05}>
                  <div style={{ display: "grid", gridTemplateColumns: "1.5fr 1fr 1fr 2fr", gap: 16, padding: "16px 0", borderBottom: `1px solid ${DS.border}`, alignItems: "center" }} className="equipment-row">
                    <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 18, fontWeight: 600, color: DS.text }}>{s.space}</div>
                    <div>
                      <div style={{ fontFamily: "'Bebas Neue'", fontSize: 22, color: DS.gold, lineHeight: 1 }}>{s.half}</div>
                      <div style={{ fontFamily: "'DM Sans'", fontSize: 11, color: DS.textSec }}>Half-day</div>
                    </div>
                    <div>
                      <div style={{ fontFamily: "'Bebas Neue'", fontSize: 22, color: DS.gold, lineHeight: 1 }}>{s.full}</div>
                      <div style={{ fontFamily: "'DM Sans'", fontSize: 11, color: DS.textSec }}>Full-day</div>
                    </div>
                    <div style={{ fontFamily: "'DM Sans'", fontSize: 13, color: DS.textSec, lineHeight: 1.5 }}>{s.note}</div>
                  </div>
                </FadeIn>
              ))}
            </div>
          </div>
        </motion.div>
      )}

      {/* ── OFFICE TAB ────────────────────────────────────────────── */}
      {activeTab === "office" && (
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
          <div style={{ maxWidth: 1400, margin: "0 auto", padding: "60px 32px 0" }}>
            {/* Intro grid */}
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "clamp(32px, 5vw, 80px)", alignItems: "center", marginBottom: 60 }} className="chapter-grid">
              <div>
                <FadeIn>
                  <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(28px, 3.5vw, 42px)", fontWeight: 700, color: DS.text, lineHeight: 1.15, margin: "0 0 24px" }}>
                    A Workspace Built for Creatives
                  </h2>
                </FadeIn>
                <FadeIn delay={0.15}>
                  <p style={{ fontFamily: "'DM Sans'", fontSize: "clamp(15px, 1.2vw, 17px)", color: DS.textSec, lineHeight: 1.75 }}>
                    The MMC studio isn't just where we work — it's where photographers edit between shoots, videographers color-grade overnight, and planners run client calls with a real backdrop behind them. We opened the space to the local creative community because good work happens faster when you're around other people who take their craft seriously.
                  </p>
                </FadeIn>
              </div>
              <div>
                <FadeIn delay={0.1}>
                  <ParallaxImage color="#201e1a" label="Coworking Space — Open Studio" aspect="4/3" />
                </FadeIn>
              </div>
            </div>
          </div>

          {/* Office options */}
          <div style={{ maxWidth: 1000, margin: "0 auto", padding: "0 32px 60px" }}>
            <FadeIn>
              <div style={{ fontFamily: "'DM Sans'", fontSize: 12, color: DS.gold, textTransform: "uppercase", letterSpacing: "0.2em", marginBottom: 24 }}>Membership Options</div>
            </FadeIn>
            <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
              {officeOptions.map((opt, i) => (
                <OfficeOption key={opt.name} option={opt} index={i} />
              ))}
            </div>
          </div>

          {/* Amenities */}
          <div style={{ borderTop: `1px solid ${DS.border}`, borderBottom: `1px solid ${DS.border}`, padding: "80px 32px", background: DS.surface }}>
            <div style={{ maxWidth: 1200, margin: "0 auto" }}>
              <FadeIn>
                <div style={{ marginBottom: 40 }}>
                  <div style={{ fontFamily: "'DM Sans'", fontSize: 12, color: DS.gold, textTransform: "uppercase", letterSpacing: "0.2em", marginBottom: 12 }}>Included With Every Plan</div>
                  <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(24px, 3vw, 36px)", fontWeight: 700, color: DS.text, margin: 0 }}>Amenities</h2>
                </div>
              </FadeIn>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 20 }} className="policies-grid">
                {[
                  { title: "High-Speed WiFi", desc: "Gigabit fiber. Enough bandwidth to upload full wedding galleries without thinking twice." },
                  { title: "Kitchen + Coffee", desc: "Espresso machine, filtered water, fridge. Keep yourself fueled without leaving the building." },
                  { title: "Print Station", desc: "Large-format printer for proofs, contracts, and client presentations. Ink and standard paper included." },
                  { title: "Secure Storage", desc: "Lockable cabinets for gear, drives, and personal equipment. Monitored 24/7." },
                  { title: "Client Parking", desc: "Dedicated guest spots for when clients visit for album reveals or consultations." },
                  { title: "Community Events", desc: "Monthly mixer nights, portfolio reviews, and vendor meetups. Build relationships while you work." },
                ].map((a, i) => (
                  <FadeIn key={a.title} delay={i * 0.06}>
                    <div style={{ padding: "20px 0", borderTop: `1px solid ${DS.border}` }}>
                      <h4 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 19, fontWeight: 600, color: DS.text, marginBottom: 8 }}>{a.title}</h4>
                      <p style={{ fontFamily: "'DM Sans'", fontSize: 13, color: DS.textSec, lineHeight: 1.6 }}>{a.desc}</p>
                    </div>
                  </FadeIn>
                ))}
              </div>
            </div>
          </div>

          <div style={{ height: 100 }} />
        </motion.div>
      )}

      {/* ── HOW IT WORKS ──────────────────────────────────────────── */}
      <div style={{ background: DS.surface, borderTop: `1px solid ${DS.border}`, borderBottom: `1px solid ${DS.border}`, padding: "100px 32px" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <FadeIn>
            <div style={{ textAlign: "center", marginBottom: 60 }}>
              <div style={{ fontFamily: "'DM Sans'", fontSize: 12, color: DS.gold, textTransform: "uppercase", letterSpacing: "0.2em", marginBottom: 12 }}>Simple Process</div>
              <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(28px, 3.5vw, 42px)", fontWeight: 700, color: DS.text, margin: 0 }}>
                How It Works
              </h2>
            </div>
          </FadeIn>
          <ProcessSteps />
        </div>
      </div>

      {/* ── POLICIES ──────────────────────────────────────────────── */}
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "100px 32px" }}>
        <FadeIn>
          <div style={{ marginBottom: 48 }}>
            <div style={{ fontFamily: "'DM Sans'", fontSize: 12, color: DS.gold, textTransform: "uppercase", letterSpacing: "0.2em", marginBottom: 12 }}>Good to Know</div>
            <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(28px, 3.5vw, 42px)", fontWeight: 700, color: DS.text, margin: 0 }}>
              Rental Policies
            </h2>
          </div>
        </FadeIn>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 24 }} className="policies-grid">
          {[
            { title: "Security Deposit", desc: "A hold (not a charge) equal to 30% of the rental value is placed on your card at pickup. Released within 48 hours of return." },
            { title: "Insurance", desc: "We recommend rental insurance for gear over $1,000. We partner with Athos Insurance for single-event coverage starting at $35." },
            { title: "Cancellation", desc: "Cancel 48+ hours before pickup for a full refund. Within 48 hours, a 50% cancellation fee applies. No-shows forfeit the full amount." },
            { title: "Damage Policy", desc: "Normal wear is expected. Accidental damage is assessed case-by-case. Intentional misuse or negligence results in full replacement cost." },
            { title: "ID + Agreement", desc: "Valid government ID and a signed rental agreement required at pickup. First-time renters complete a 5-minute onboarding form." },
            { title: "MMC Team Discount", desc: "Current MMC team members, Academy students, and interns receive 50% off all equipment and studio rentals. Just show your badge." },
          ].map((p, i) => (
            <FadeIn key={p.title} delay={i * 0.06}>
              <div style={{ borderTop: `1px solid ${DS.border}`, paddingTop: 20 }}>
                <h4 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 20, fontWeight: 600, color: DS.text, marginBottom: 10 }}>{p.title}</h4>
                <p style={{ fontFamily: "'DM Sans'", fontSize: 14, color: DS.textSec, lineHeight: 1.65 }}>{p.desc}</p>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>

      {/* ── FAQ ────────────────────────────────────────────────────── */}
      <div style={{ borderTop: `1px solid ${DS.border}`, padding: "100px 32px", background: DS.surface }}>
        <div style={{ maxWidth: 800, margin: "0 auto" }}>
          <FadeIn>
            <div style={{ textAlign: "center", marginBottom: 48 }}>
              <div style={{ fontFamily: "'DM Sans'", fontSize: 12, color: DS.gold, textTransform: "uppercase", letterSpacing: "0.2em", marginBottom: 12 }}>Questions</div>
              <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(28px, 3.5vw, 42px)", fontWeight: 700, color: DS.text, margin: 0 }}>
                Frequently Asked
              </h2>
            </div>
          </FadeIn>
          {[
            { q: "Do I need to be a professional photographer to rent?", a: "No. Our rentals are open to anyone — hobbyists, students, aspiring pros, content creators. If you know how to handle the gear responsibly, you're welcome. First-time renters get a quick walkthrough at pickup." },
            { q: "Can I rent gear and studio space together?", a: "Absolutely. Combo bookings get 15% off the total. Just mention it when you reserve. We'll have everything ready in the studio when you arrive." },
            { q: "What if something breaks during my rental?", a: "Contact us immediately. Accidents happen and we handle them on a case-by-case basis. If you have rental insurance, we'll work with your provider directly. We never charge for normal wear or minor cosmetic issues." },
            { q: "How far in advance should I book?", a: "Studio space books up 1–2 weeks out, especially on weekends. Popular equipment (A7S III, RS 3 Pro) can sell out during wedding season. We recommend booking 5–7 days in advance for guaranteed availability." },
            { q: "Is there a membership option for frequent renters?", a: "Yes. If you rent more than 4 times in a quarter, ask about our Frequent Creator rate — it locks in a 20% discount on all future rentals for the next 12 months. No monthly fee." },
            { q: "Do you ship equipment?", a: "Not currently. All pickups and returns happen at the MMC studio in Providence. For large production rentals (10+ items), we offer local delivery within 30 miles." },
          ].map((faq, i) => (
            <FAQItem key={i} question={faq.q} answer={faq.a} index={i} />
          ))}
        </div>
      </div>

      {/* ── CTA ────────────────────────────────────────────────────── */}
      <div style={{ padding: "100px 32px", textAlign: "center", background: `linear-gradient(160deg, var(--mm-surface) 0%, var(--mm-surface-alt) 50%, ${DS.bg} 100%)` }}>
        <FadeIn>
          <div style={{ fontFamily: "'DM Sans'", fontSize: 12, color: DS.gold, textTransform: "uppercase", letterSpacing: "0.2em", marginBottom: 16 }}>Ready to Create?</div>
          <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(30px, 4.5vw, 52px)", fontWeight: 700, color: DS.text, lineHeight: 1.1, margin: "0 0 16px" }}>
            Book Your Gear or Space
          </h2>
          <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 20, color: DS.textSec, fontStyle: "italic", marginBottom: 36, maxWidth: 500, margin: "0 auto 36px" }}>
            Same-day reservations available for in-stock equipment. Studio bookings require 24-hour notice.
          </p>
          <div style={{ display: "flex", gap: 16, justifyContent: "center", flexWrap: "wrap" }}>
            <a href="/contact" style={{
              fontFamily: "'DM Sans'", fontSize: 14, color: DS.bg, background: DS.ember,
              padding: "16px 40px", textDecoration: "none", textTransform: "uppercase", letterSpacing: "0.1em", fontWeight: 600, transition: "background 0.3s",
            }}
              onMouseEnter={(e) => e.target.style.background = "#ff6b3d"}
              onMouseLeave={(e) => e.target.style.background = DS.ember}
            >Reserve Now</a>
            <a href="/services" style={{
              fontFamily: "'DM Sans'", fontSize: 14, color: DS.gold, padding: "16px 40px", textDecoration: "none", textTransform: "uppercase", letterSpacing: "0.1em", fontWeight: 600,
              border: `1px solid ${DS.gold}`, transition: "all 0.3s",
            }}
              onMouseEnter={(e) => { e.target.style.background = DS.gold; e.target.style.color = DS.bg; }}
              onMouseLeave={(e) => { e.target.style.background = "transparent"; e.target.style.color = DS.gold; }}
            >View Services</a>
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
