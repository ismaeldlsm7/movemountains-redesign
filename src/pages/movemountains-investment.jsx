import { useState, useEffect, useRef } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import CheckAvailabilityButton from "../components/CheckAvailabilityButton";
import { DS, fontLink } from "../components/designSystem";
import { PACKAGES as packages, ADD_ONS as addOns, ELOPEMENT_STARTING_PRICE } from "../data/pricing";

const faqs = [
  { q: "What's included in every package?", a: "Every MMC package includes a complimentary engagement session, full-day coverage, an online gallery with print ordering, all photos delivered digitally, and your choice of 5 editing styles. We only take one wedding per day — your team is fully dedicated to you." },
  { q: "How do payments work?", a: "A 30% retainer is due at booking to secure your date. The remaining balance is due 30 days before your wedding. We accept bank transfers, credit cards, and payment plans for packages over $5,000." },
  { q: "Can we build a custom package?", a: "Absolutely. The packages listed are starting points. We regularly create custom combinations — maybe you want two photographers but no album, or videography plus Super 8 but fewer hours. Tell us what matters to you and we'll build around it." },
  { q: "What are your travel fees?", a: "Venues within 60 miles of Providence, RI are included at no extra charge. 60–100 miles incurs a $200 travel fee. Beyond 100 miles, a $300 fee applies and may require overnight accommodations. Destination weddings quoted separately." },
  { q: "How soon should we book?", a: "Popular dates (May–October Saturdays) book 12–18 months in advance. Weekday and off-season dates have more flexibility. We recommend reaching out as soon as you have a date and venue confirmed." },
  { q: "When will we receive our photos and video?", a: "Sneak peek of 20–30 images: 3–5 days. Full gallery: 6–8 weeks. Highlight film: 8–12 weeks. Full ceremony/reception films: 10–14 weeks. Rush delivery available for an additional fee." },
  { q: "What if we need to reschedule?", a: "Life happens. If you need to change your date, we'll do our best to accommodate. Rescheduling requests made 90+ days before the original date are transferred at no extra cost, subject to availability." },
  { q: "Do you offer elopement packages?", a: `Yes. For elopements and micro-weddings (under 30 guests), we offer streamlined packages starting at $${ELOPEMENT_STARTING_PRICE.displayPrice}. Reach out for a custom quote based on your timeline and location.` },
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

/* ── Nav ──────────────────────────────────────────────────────────── */

/* ── Package Card ────────────────────────────────────────────────── */

function PackageCard({ pkg, index }) {
  const [showFeatures, setShowFeatures] = useState(false);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-30px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.12, ease: [0.25, 0.1, 0.25, 1] }}
      style={{
        border: `1px solid ${pkg.popular ? DS.gold : DS.border}`,
        background: pkg.popular ? DS.surfaceAlt : "transparent",
        position: "relative", overflow: "hidden",
        display: "flex", flexDirection: "column",
        transition: "border-color 0.4s",
      }}
      onMouseEnter={(e) => { if (!pkg.popular) e.currentTarget.style.borderColor = DS.gold; }}
      onMouseLeave={(e) => { if (!pkg.popular) e.currentTarget.style.borderColor = DS.border; }}
    >
      {/* Popular badge */}
      {pkg.popular && (
        <div style={{
          position: "absolute", top: 0, right: 0,
          background: DS.gold, color: DS.bg,
          fontFamily: "'DM Sans'", fontSize: 10, fontWeight: 700,
          padding: "6px 14px", textTransform: "uppercase", letterSpacing: "0.12em",
        }}>Most Popular</div>
      )}

      {/* Header */}
      <div style={{ padding: "32px 28px 0" }}>
        <div style={{ fontFamily: "'DM Sans'", fontSize: 11, color: DS.gold, textTransform: "uppercase", letterSpacing: "0.15em", marginBottom: 8 }}>
          {pkg.subtitle}
        </div>
        <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(28px, 3vw, 36px)", fontWeight: 700, color: DS.text, margin: "0 0 4px" }}>
          {pkg.name}
        </h3>
      </div>

      {/* Price */}
      <div style={{ padding: "20px 28px", borderBottom: `1px solid ${DS.border}` }}>
        <div style={{ display: "flex", alignItems: "baseline", gap: 4 }}>
          <span style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 16, color: DS.textSec, fontWeight: 400 }}>Starting at</span>
        </div>
        <div style={{ display: "flex", alignItems: "baseline", gap: 6, marginTop: 4 }}>
          <span style={{ fontFamily: "'Bebas Neue'", fontSize: "clamp(44px, 5vw, 56px)", color: DS.gold, lineHeight: 1 }}>${pkg.displayPrice}</span>
        </div>
      </div>

      {/* Quick stats */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 1, background: DS.border }}>
        <div style={{ background: pkg.popular ? DS.surfaceAlt : DS.bg, padding: "14px 16px", textAlign: "center" }}>
          <div style={{ fontFamily: "'Bebas Neue'", fontSize: 22, color: DS.text, lineHeight: 1 }}>{pkg.hours}</div>
          <div style={{ fontFamily: "'DM Sans'", fontSize: 10, color: DS.textSec, textTransform: "uppercase", letterSpacing: "0.08em", marginTop: 3 }}>Hours</div>
        </div>
        <div style={{ background: pkg.popular ? DS.surfaceAlt : DS.bg, padding: "14px 16px", textAlign: "center" }}>
          <div style={{ fontFamily: "'Bebas Neue'", fontSize: 22, color: DS.text, lineHeight: 1 }}>{pkg.photographers.split(" ")[0]}</div>
          <div style={{ fontFamily: "'DM Sans'", fontSize: 10, color: DS.textSec, textTransform: "uppercase", letterSpacing: "0.08em", marginTop: 3 }}>
            {pkg.photographers.includes("+") ? "Team" : pkg.photographers === "1" ? "Photographer" : "Photographers"}
          </div>
        </div>
      </div>

      {/* Description */}
      <div style={{ padding: "24px 28px", flex: 1 }}>
        <p style={{ fontFamily: "'DM Sans'", fontSize: 14, color: DS.textSec, lineHeight: 1.65, marginBottom: 20 }}>
          {pkg.description}
        </p>

        {/* Features toggle */}
        <button onClick={() => setShowFeatures(!showFeatures)} style={{
          fontFamily: "'DM Sans'", fontSize: 12, color: DS.gold, background: "none", border: "none",
          cursor: "pointer", padding: 0, display: "flex", alignItems: "center", gap: 8,
          textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 4, transition: "opacity 0.2s",
        }}
          onMouseEnter={(e) => e.currentTarget.style.opacity = 0.7}
          onMouseLeave={(e) => e.currentTarget.style.opacity = 1}
        >
          {showFeatures ? "Hide" : "Show"} Details
          <motion.span animate={{ rotate: showFeatures ? 180 : 0 }} transition={{ duration: 0.25 }} style={{ fontSize: 14, display: "inline-block" }}>↓</motion.span>
        </button>

        <AnimatePresence>
          {showFeatures && (
            <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.3 }} style={{ overflow: "hidden" }}>
              <div style={{ paddingTop: 12 }}>
                {pkg.features.map((f, i) => (
                  <div key={i} style={{ display: "flex", alignItems: "center", gap: 10, padding: "8px 0", borderBottom: i < pkg.features.length - 1 ? `1px solid ${DS.border}` : "none" }}>
                    <span style={{
                      width: 18, height: 18, borderRadius: "50%", flexShrink: 0,
                      display: "flex", alignItems: "center", justifyContent: "center", fontSize: 10,
                      background: f.included ? "rgba(201,169,110,0.12)" : "transparent",
                      border: f.included ? "none" : `1px solid ${DS.border}`,
                      color: f.included ? DS.gold : DS.border,
                    }}>
                      {f.included ? "✓" : "—"}
                    </span>
                    <span style={{ fontFamily: "'DM Sans'", fontSize: 13, color: f.included ? DS.text : DS.textSec, opacity: f.included ? 1 : 0.5 }}>
                      {f.text}
                    </span>
                  </div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* CTA */}
      <div style={{ padding: "0 28px 28px" }}>
        <a href={`/book?package=${pkg?.id || ''}`} style={{
          display: "block", textAlign: "center",
          fontFamily: "'DM Sans'", fontSize: 13, fontWeight: 600,
          color: pkg.popular ? DS.bg : DS.gold,
          background: pkg.popular ? DS.ember : "transparent",
          border: pkg.popular ? "none" : `1px solid ${DS.gold}`,
          padding: "14px 0", textDecoration: "none", textTransform: "uppercase", letterSpacing: "0.08em",
          transition: "all 0.3s",
        }}
          onMouseEnter={(e) => {
            if (pkg.popular) { e.target.style.background = "#ff6b3d"; }
            else { e.target.style.background = DS.gold; e.target.style.color = DS.bg; }
          }}
          onMouseLeave={(e) => {
            if (pkg.popular) { e.target.style.background = DS.ember; }
            else { e.target.style.background = "transparent"; e.target.style.color = DS.gold; }
          }}
        >
          {pkg.popular ? "Book This Package" : "Inquire About " + pkg.name}
        </a>
      </div>
    </motion.div>
  );
}

/* ── Add-On Card ─────────────────────────────────────────────────── */

function AddOnCard({ addon, index }) {
  return (
    <FadeIn delay={index * 0.05}>
      <div style={{
        padding: "24px", border: `1px solid ${DS.border}`, height: "100%",
        display: "flex", flexDirection: "column", transition: "border-color 0.4s, background 0.4s",
      }}
        onMouseEnter={(e) => { e.currentTarget.style.borderColor = DS.gold; e.currentTarget.style.background = DS.surfaceAlt; }}
        onMouseLeave={(e) => { e.currentTarget.style.borderColor = DS.border; e.currentTarget.style.background = "transparent"; }}
      >
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 14 }}>
          <span style={{ fontFamily: "'DM Sans'", fontSize: 22, color: DS.gold, opacity: 0.6 }}>{addon.icon}</span>
          <span style={{ fontFamily: "'Bebas Neue'", fontSize: 22, color: DS.gold, lineHeight: 1 }}>{addon.pricePrefix || ""}${addon.displayPrice}</span>
        </div>
        <h4 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 20, fontWeight: 600, color: DS.text, margin: "0 0 8px" }}>{addon.name}</h4>
        <p style={{ fontFamily: "'DM Sans'", fontSize: 13, color: DS.textSec, lineHeight: 1.6, flex: 1 }}>{addon.desc}</p>
      </div>
    </FadeIn>
  );
}

/* ── Comparison Table ────────────────────────────────────────────── */

function ComparisonTable() {
  const rows = [
    { feature: "Coverage Hours", essentials: "6", signature: "8–10", cinematic: "10+" },
    { feature: "Photographers", essentials: "1", signature: "2", cinematic: "2" },
    { feature: "Cinematographer", essentials: "—", signature: "—", cinematic: "1" },
    { feature: "Engagement Session", essentials: "✓", signature: "✓", cinematic: "✓" },
    { feature: "Images Delivered", essentials: "~600", signature: "~800–1,000", cinematic: "~1,000+" },
    { feature: "Editing Styles", essentials: "7", signature: "7", cinematic: "7 + video", isLooks: true },
    { feature: "Online Gallery", essentials: "✓", signature: "✓", cinematic: "✓" },
    { feature: "Wedding Album", essentials: "—", signature: "✓", cinematic: "✓" },
    { feature: "Highlight Film", essentials: "—", signature: "—", cinematic: "4–6 min" },
    { feature: "Full Ceremony Film", essentials: "—", signature: "—", cinematic: "✓" },
    { feature: "4K Video Delivery", essentials: "—", signature: "—", cinematic: "✓" },
    { feature: "Priority Sneak Peek", essentials: "5 days", signature: "3 days", cinematic: "3 days" },
  ];

  return (
    <div style={{ overflowX: "auto" }}>
      <table style={{ width: "100%", borderCollapse: "collapse", minWidth: 600 }}>
        <thead>
          <tr>
            <th style={{ fontFamily: "'DM Sans'", fontSize: 12, color: DS.textSec, textTransform: "uppercase", letterSpacing: "0.1em", textAlign: "left", padding: "14px 16px", borderBottom: `1px solid ${DS.border}` }}></th>
            {packages.map((p) => (
              <th key={p.id} style={{
                fontFamily: "'Cormorant Garamond', serif", fontSize: 20, fontWeight: 600,
                color: p.popular ? DS.gold : DS.text, textAlign: "center",
                padding: "14px 16px", borderBottom: `1px solid ${DS.border}`,
              }}>{p.name}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, i) => (
            <tr key={row.feature} style={{ background: i % 2 === 0 ? "transparent" : "rgba(30,30,30,0.3)" }}>
              <td style={{ fontFamily: "'DM Sans'", fontSize: 13, color: DS.textSec, padding: "12px 16px", borderBottom: `1px solid ${DS.border}` }}>
                {row.isLooks ? (
                  <span style={{ display: "flex", alignItems: "center", gap: 8 }}>
                    {row.feature}
                    <Link to="/looks" style={{ fontFamily: "'DM Sans'", fontSize: 10, color: DS.gold, textTransform: "uppercase", letterSpacing: "0.08em", textDecoration: "none", opacity: 0.7, whiteSpace: "nowrap" }}
                      onMouseEnter={(e) => e.currentTarget.style.opacity = 1}
                      onMouseLeave={(e) => e.currentTarget.style.opacity = 0.7}>
                      View →
                    </Link>
                  </span>
                ) : row.feature}
              </td>
              {["essentials", "signature", "cinematic"].map((pkg) => (
                <td key={pkg} style={{
                  fontFamily: "'DM Sans'", fontSize: 13, textAlign: "center",
                  color: row[pkg] === "✓" ? DS.gold : row[pkg] === "—" ? DS.border : DS.text,
                  padding: "12px 16px", borderBottom: `1px solid ${DS.border}`,
                }}>
                  {row.isLooks && pkg === "cinematic" ? (
                    <span style={{ display: "inline-flex", alignItems: "center", gap: 6 }}>
                      {row[pkg]}
                      <Link to="/video-looks" style={{ fontFamily: "'DM Sans'", fontSize: 9, color: DS.gold, textTransform: "uppercase", letterSpacing: "0.06em", textDecoration: "none", opacity: 0.7, whiteSpace: "nowrap" }}
                        onMouseEnter={(e) => e.currentTarget.style.opacity = 1}
                        onMouseLeave={(e) => e.currentTarget.style.opacity = 0.7}>↗</Link>
                    </span>
                  ) : row[pkg]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

/* ── FAQ ──────────────────────────────────────────────────────────── */

function FAQ() {
  const [openIndex, setOpenIndex] = useState(null);

  return (
    <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: "0 32px" }}>
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

/* ── Contact Form ────────────────────────────────────────────────── */

function ContactForm() {
  const inputStyle = {
    width: "100%", padding: "14px 16px",
    fontFamily: "'DM Sans'", fontSize: 14, color: DS.text,
    background: DS.surfaceAlt, border: `1px solid ${DS.border}`,
    outline: "none", transition: "border-color 0.3s",
  };

  const labelStyle = {
    fontFamily: "'DM Sans'", fontSize: 11, color: DS.textSec,
    textTransform: "uppercase", letterSpacing: "0.1em",
    display: "block", marginBottom: 8,
  };

  return (
    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }} className="form-grid">
      <div>
        <label style={labelStyle}>Your Name</label>
        <input type="text" placeholder="Full name" style={inputStyle}
          onFocus={(e) => e.target.style.borderColor = DS.gold}
          onBlur={(e) => e.target.style.borderColor = DS.border} />
      </div>
      <div>
        <label style={labelStyle}>Email</label>
        <input type="email" placeholder="you@email.com" style={inputStyle}
          onFocus={(e) => e.target.style.borderColor = DS.gold}
          onBlur={(e) => e.target.style.borderColor = DS.border} />
      </div>
      <div>
        <label style={labelStyle}>Wedding Date</label>
        <input type="text" placeholder="MM / DD / YYYY" style={inputStyle}
          onFocus={(e) => e.target.style.borderColor = DS.gold}
          onBlur={(e) => e.target.style.borderColor = DS.border} />
      </div>
      <div>
        <label style={labelStyle}>Venue</label>
        <input type="text" placeholder="Venue name & location" style={inputStyle}
          onFocus={(e) => e.target.style.borderColor = DS.gold}
          onBlur={(e) => e.target.style.borderColor = DS.border} />
      </div>
      <div>
        <label style={labelStyle}>Package Interest</label>
        <select style={{ ...inputStyle, appearance: "none", cursor: "pointer" }}
          onFocus={(e) => e.target.style.borderColor = DS.gold}
          onBlur={(e) => e.target.style.borderColor = DS.border}>
          <option value="">Select a package...</option>
          <option value="essentials">Essentials — from $3,200</option>
          <option value="signature">Signature — from $5,400</option>
          <option value="cinematic">Cinematic — from $8,500</option>
          <option value="custom">Custom Package</option>
          <option value="elopement">Elopement / Micro-Wedding</option>
        </select>
      </div>
      <div>
        <label style={labelStyle}>How Did You Find Us?</label>
        <select style={{ ...inputStyle, appearance: "none", cursor: "pointer" }}
          onFocus={(e) => e.target.style.borderColor = DS.gold}
          onBlur={(e) => e.target.style.borderColor = DS.border}>
          <option value="">Select...</option>
          <option value="instagram">Instagram</option>
          <option value="theknot">The Knot</option>
          <option value="weddingwire">WeddingWire</option>
          <option value="referral">Venue / Planner Referral</option>
          <option value="google">Google Search</option>
          <option value="friend">Friend / Family</option>
          <option value="other">Other</option>
        </select>
      </div>
      <div style={{ gridColumn: "1 / -1" }}>
        <label style={labelStyle}>Tell Us About Your Day</label>
        <textarea rows={4} placeholder="Anything you'd like us to know — guest count, vibe, special requests, questions..." style={{ ...inputStyle, resize: "vertical" }}
          onFocus={(e) => e.target.style.borderColor = DS.gold}
          onBlur={(e) => e.target.style.borderColor = DS.border} />
      </div>
      <div style={{ gridColumn: "1 / -1" }}>
        <CheckAvailabilityButton padding="16px 44px" style={{ width: "100%", textAlign: "center" }} />
        <p style={{ fontFamily: "'DM Sans'", fontSize: 12, color: DS.textSec, marginTop: 12, textAlign: "center" }}>
          We respond to every inquiry within 24 hours.
        </p>
      </div>
    </div>
  );
}

/* ── Main Investment Page ────────────────────────────────────────── */

export default function InvestmentPage() {
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
        input::placeholder, textarea::placeholder { color: ${DS.textSec}; opacity: 0.5; }
        select { color: ${DS.textSec}; }
        select option { background: ${DS.surface}; color: ${DS.text}; }
        @media (max-width: 768px) {
          .nav-links { display: none !important; }
          .packages-grid { grid-template-columns: 1fr !important; }
          .addons-grid { grid-template-columns: 1fr 1fr !important; }
          .form-grid { grid-template-columns: 1fr !important; }
          .contact-split { grid-template-columns: 1fr !important; }
        }
        @media (max-width: 480px) {
          .addons-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>

      <Header activePage="Investment" />

      {/* ── HEADER ────────────────────────────────────────────────── */}
      <div style={{ paddingTop: 100, maxWidth: 1400, margin: "0 auto", paddingLeft: 32, paddingRight: 32 }}>
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }}>
          <div style={{ fontFamily: "'DM Sans'", fontSize: 12, color: DS.textSec, marginBottom: 32 }}>
            <a href="#" style={{ color: DS.textSec, textDecoration: "none", transition: "color 0.2s" }}
              onMouseEnter={(e) => e.target.style.color = DS.gold} onMouseLeave={(e) => e.target.style.color = DS.textSec}>Home</a>
            <span style={{ margin: "0 10px", opacity: 0.4 }}>/</span>
            <span style={{ color: DS.gold }}>Investment</span>
          </div>
        </motion.div>

        <div style={{ maxWidth: 700, marginBottom: 20 }}>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.35, duration: 0.6 }}>
            <div style={{ fontFamily: "'DM Sans'", fontSize: 12, color: DS.gold, textTransform: "uppercase", letterSpacing: "0.2em", marginBottom: 12 }}>
              Transparent Pricing
            </div>
            <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(38px, 5.5vw, 68px)", fontWeight: 700, color: DS.text, lineHeight: 1.05, margin: "0 0 16px" }}>
              Investment
            </h1>
          </motion.div>
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }} style={{
            fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(17px, 2vw, 22px)", color: DS.textSec, lineHeight: 1.5, fontStyle: "italic",
          }}>
            We believe you should know what you're investing in before the first conversation. Every package includes full-day coverage and a complimentary engagement session.
          </motion.p>
        </div>

        <motion.div initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} transition={{ delay: 0.55, duration: 0.8, ease: "easeOut" }}
          style={{ height: 1, background: DS.border, transformOrigin: "left" }} />
      </div>

      {/* ── PACKAGES ──────────────────────────────────────────────── */}
      <div style={{ maxWidth: 1400, margin: "0 auto", padding: "56px 32px" }}>
        <div className="packages-grid" style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 20, alignItems: "start" }}>
          {packages.map((pkg, i) => (
            <PackageCard key={pkg.id} pkg={pkg} index={i} />
          ))}
        </div>

        {/* Elopement note */}
        <FadeIn>
          <div style={{
            marginTop: 32, padding: "20px 28px", border: `1px solid ${DS.border}`,
            display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 16,
          }}>
            <div>
              <span style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 20, fontWeight: 600, color: DS.text }}>Elopements & Micro-Weddings</span>
              <span style={{ fontFamily: "'DM Sans'", fontSize: 14, color: DS.textSec, marginLeft: 12 }}>Streamlined packages from $2,200</span>
            </div>
            <a href="/contact" style={{
              fontFamily: "'DM Sans'", fontSize: 12, color: DS.gold, textDecoration: "none",
              textTransform: "uppercase", letterSpacing: "0.08em", borderBottom: `1px solid ${DS.gold}`, paddingBottom: 2,
            }}>Get a Quote →</a>
          </div>
        </FadeIn>
      </div>

      {/* ── COMPARISON TABLE ──────────────────────────────────────── */}
      <div style={{ background: DS.surface, borderTop: `1px solid ${DS.border}`, borderBottom: `1px solid ${DS.border}`, padding: "80px 32px" }}>
        <div style={{ maxWidth: 900, margin: "0 auto" }}>
          <FadeIn>
            <div style={{ textAlign: "center", marginBottom: 40 }}>
              <div style={{ fontFamily: "'DM Sans'", fontSize: 12, color: DS.gold, textTransform: "uppercase", letterSpacing: "0.2em", marginBottom: 12 }}>Side by Side</div>
              <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(28px, 3.5vw, 42px)", fontWeight: 700, color: DS.text, margin: 0 }}>Compare Packages</h2>
            </div>
          </FadeIn>
          <FadeIn delay={0.1}>
            <ComparisonTable />
          </FadeIn>
        </div>
      </div>

      {/* ── ADD-ONS ───────────────────────────────────────────────── */}
      <div style={{ maxWidth: 1400, margin: "0 auto", padding: "80px 32px" }}>
        <FadeIn>
          <div style={{ marginBottom: 40 }}>
            <div style={{ fontFamily: "'DM Sans'", fontSize: 12, color: DS.gold, textTransform: "uppercase", letterSpacing: "0.2em", marginBottom: 12 }}>Customize Your Package</div>
            <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(28px, 3.5vw, 42px)", fontWeight: 700, color: DS.text, margin: "0 0 8px" }}>Add-Ons</h2>
            <p style={{ fontFamily: "'DM Sans'", fontSize: 15, color: DS.textSec }}>Enhance any package with these premium extras.</p>
          </div>
        </FadeIn>

        <div className="addons-grid" style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 16 }}>
          {addOns.map((addon, i) => (
            <AddOnCard key={addon.name} addon={addon} index={i} />
          ))}
        </div>
      </div>

      {/* ── FAQ ───────────────────────────────────────────────────── */}
      <div style={{ borderTop: `1px solid ${DS.border}`, padding: "80px 32px" }}>
        <div style={{ maxWidth: 1400, margin: "0 auto" }}>
          <FadeIn>
            <div style={{ textAlign: "center", marginBottom: 40 }}>
              <div style={{ fontFamily: "'DM Sans'", fontSize: 12, color: DS.gold, textTransform: "uppercase", letterSpacing: "0.2em", marginBottom: 12 }}>Common Questions</div>
              <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(28px, 3.5vw, 42px)", fontWeight: 700, color: DS.text, margin: 0 }}>Investment FAQ</h2>
            </div>
          </FadeIn>
          <FAQ />
        </div>
      </div>

      {/* ── CONTACT FORM ──────────────────────────────────────────── */}
      <div id="contact" style={{ background: DS.surface, borderTop: `1px solid ${DS.border}`, padding: "100px 32px" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <div className="contact-split" style={{ display: "grid", gridTemplateColumns: "1fr 1.4fr", gap: "clamp(32px, 5vw, 80px)", alignItems: "start" }}>
            {/* Left info */}
            <FadeIn>
              <div>
                <div style={{ fontFamily: "'DM Sans'", fontSize: 12, color: DS.gold, textTransform: "uppercase", letterSpacing: "0.2em", marginBottom: 16 }}>Let's Start</div>
                <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(30px, 4vw, 44px)", fontWeight: 700, color: DS.text, lineHeight: 1.1, margin: "0 0 16px" }}>
                  Check Availability
                </h2>
                <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 20, color: DS.textSec, fontStyle: "italic", lineHeight: 1.5, marginBottom: 36 }}>
                  Tell us about your day. We respond to every inquiry within 24 hours.
                </p>

                <div style={{ borderTop: `1px solid ${DS.border}`, paddingTop: 28 }}>
                  {[
                    { label: "Email", value: "info@movemountains.co" },
                    { label: "Phone", value: "(401) 616-4500" },
                    { label: "Studio", value: "28 Wolcott St, Providence, RI" },
                  ].map((item) => (
                    <div key={item.label} style={{ marginBottom: 18 }}>
                      <div style={{ fontFamily: "'DM Sans'", fontSize: 11, color: DS.textSec, textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: 4 }}>{item.label}</div>
                      <div style={{ fontFamily: "'DM Sans'", fontSize: 15, color: DS.text }}>{item.value}</div>
                    </div>
                  ))}
                </div>

                {/* Social */}
                <div style={{ display: "flex", gap: 12, marginTop: 20 }}>
                  {["IG", "FB", "TK", "VM"].map((s) => (
                    <a key={s} href="#" style={{
                      width: 36, height: 36, border: `1px solid ${DS.border}`, display: "flex", alignItems: "center", justifyContent: "center",
                      fontFamily: "'DM Sans'", fontSize: 11, color: DS.textSec, textDecoration: "none", transition: "all 0.3s",
                    }}
                      onMouseEnter={(e) => { e.target.style.borderColor = DS.gold; e.target.style.color = DS.gold; }}
                      onMouseLeave={(e) => { e.target.style.borderColor = DS.border; e.target.style.color = DS.textSec; }}
                    >{s}</a>
                  ))}
                </div>
              </div>
            </FadeIn>

            {/* Right form */}
            <FadeIn delay={0.1}>
              <ContactForm />
            </FadeIn>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
