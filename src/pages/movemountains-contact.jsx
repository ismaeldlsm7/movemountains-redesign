import { useState, useEffect, useRef } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

const MMC_COORDS = [41.8295914, -71.4340441];

const goldIcon = L.divIcon({
  className: "mmc-pin",
  html: `<div style="width:18px;height:18px;border-radius:50%;background:#C9A96E;border:3px solid #0F0F0F;box-shadow:0 0 0 2px #C9A96E,0 0 18px rgba(201,169,110,0.6);"></div>`,
  iconSize: [18, 18],
  iconAnchor: [9, 9],
});

function DarkMap() {
  return (
    <>
      <style>{`
        .leaflet-container { background: #0F0F0F !important; font-family: 'DM Sans', sans-serif; }
        .leaflet-control-attribution { background: rgba(15,15,15,0.8) !important; color: #8A8477 !important; font-size: 10px !important; }
        .leaflet-control-attribution a { color: #C9A96E !important; }
        .leaflet-control-zoom a { background: rgba(15,15,15,0.92) !important; color: #F5F0E8 !important; border: 1px solid #2A2A2A !important; }
        .leaflet-control-zoom a:hover { background: #1E1E1E !important; color: #C9A96E !important; }
        .leaflet-popup-content-wrapper { background: rgba(15,15,15,0.96) !important; color: #F5F0E8 !important; border: 1px solid #2A2A2A; border-radius: 0; }
        .leaflet-popup-tip { background: #0F0F0F !important; }
        .leaflet-popup-content { margin: 12px 16px !important; font-family: 'DM Sans', sans-serif; font-size: 13px; }
      `}</style>
      <MapContainer center={MMC_COORDS} zoom={15} scrollWheelZoom={false} style={{ width: "100%", height: 460 }}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="https://carto.com/attributions">CARTO</a>'
          url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
        />
        <Marker position={MMC_COORDS} icon={goldIcon}>
          <Popup>
            <strong style={{ fontFamily: "'Playfair Display', serif", fontSize: 15 }}>Move Mountains Co.</strong><br />
            28 Wolcott St<br />Providence, RI 02908
          </Popup>
        </Marker>
      </MapContainer>
    </>
  );
}

const DS = {
  bg: "#0F0F0F", surface: "#1E1E1E", surfaceAlt: "#161616",
  text: "#F5F0E8", textSec: "#8A8477", gold: "#C9A96E",
  ember: "#E8572A", border: "#2A2A2A",
};

const fontLink = "https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,700;1,400&family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;0,700;1,400;1,500&family=DM+Sans:wght@400;500;600;700&family=Bebas+Neue&display=swap";

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

/* ── Inquiry Type Selector ───────────────────────────────────────── */

function InquiryTypeSelector({ selected, onSelect }) {
  const types = [
    { id: "wedding", label: "Wedding Inquiry", icon: "◎", desc: "Book us for your wedding day" },
    { id: "elopement", label: "Elopement", icon: "◇", desc: "Intimate celebrations under 30 guests" },
    { id: "commercial", label: "Commercial", icon: "▣", desc: "Brand, product, or event photography" },
    { id: "academy", label: "MMC Academy", icon: "△", desc: "Training program applications" },
  ];

  return (
    <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 10 }} className="inquiry-grid">
      {types.map((t) => (
        <button key={t.id} onClick={() => onSelect(t.id)} style={{
          padding: "16px 14px", background: selected === t.id ? DS.surfaceAlt : "transparent",
          border: `1px solid ${selected === t.id ? DS.gold : DS.border}`,
          cursor: "pointer", textAlign: "left", transition: "all 0.3s",
          display: "flex", gap: 12, alignItems: "flex-start",
        }}
          onMouseEnter={(e) => { if (selected !== t.id) e.currentTarget.style.borderColor = "rgba(201,169,110,0.4)"; }}
          onMouseLeave={(e) => { if (selected !== t.id) e.currentTarget.style.borderColor = DS.border; }}
        >
          <span style={{ fontFamily: "'DM Sans'", fontSize: 20, color: selected === t.id ? DS.gold : DS.textSec, opacity: selected === t.id ? 1 : 0.5, marginTop: 1, flexShrink: 0 }}>{t.icon}</span>
          <div>
            <div style={{ fontFamily: "'DM Sans'", fontSize: 13, fontWeight: 600, color: selected === t.id ? DS.text : DS.textSec }}>{t.label}</div>
            <div style={{ fontFamily: "'DM Sans'", fontSize: 11, color: DS.textSec, marginTop: 2, opacity: 0.7 }}>{t.desc}</div>
          </div>
        </button>
      ))}
    </div>
  );
}

/* ── Form ─────────────────────────────────────────────────────────── */

function ContactForm() {
  const [inquiryType, setInquiryType] = useState("wedding");
  const [formData, setFormData] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const inputBase = {
    width: "100%", padding: "14px 16px",
    fontFamily: "'DM Sans'", fontSize: 14, color: DS.text,
    background: "rgba(30,30,30,0.5)", border: `1px solid ${DS.border}`,
    outline: "none", transition: "border-color 0.3s, background 0.3s",
  };

  const labelStyle = {
    fontFamily: "'DM Sans'", fontSize: 11, color: DS.textSec,
    textTransform: "uppercase", letterSpacing: "0.1em",
    display: "block", marginBottom: 8,
  };

  const focusHandler = (e) => { e.target.style.borderColor = DS.gold; e.target.style.background = "rgba(40,38,34,0.5)"; };
  const blurHandler = (e) => { e.target.style.borderColor = DS.border; e.target.style.background = "rgba(30,30,30,0.5)"; };

  if (submitted) {
    return (
      <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} style={{ textAlign: "center", padding: "60px 0" }}>
        <div style={{ fontFamily: "'DM Sans'", fontSize: 48, color: DS.gold, marginBottom: 20 }}>✓</div>
        <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: 32, fontWeight: 700, color: DS.text, margin: "0 0 12px" }}>Message Sent</h3>
        <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 20, color: DS.textSec, fontStyle: "italic", margin: "0 0 24px" }}>
          We'll be in touch within 24 hours. Can't wait to hear about your day.
        </p>
        <button onClick={() => setSubmitted(false)} style={{
          fontFamily: "'DM Sans'", fontSize: 13, color: DS.gold, background: "none",
          border: `1px solid ${DS.gold}`, padding: "12px 28px", cursor: "pointer",
          textTransform: "uppercase", letterSpacing: "0.08em", transition: "all 0.3s",
        }}
          onMouseEnter={(e) => { e.target.style.background = DS.gold; e.target.style.color = DS.bg; }}
          onMouseLeave={(e) => { e.target.style.background = "transparent"; e.target.style.color = DS.gold; }}
        >Send Another</button>
      </motion.div>
    );
  }

  return (
    <div>
      {/* Inquiry type */}
      <div style={{ marginBottom: 28 }}>
        <label style={{ ...labelStyle, marginBottom: 12 }}>I'm Reaching Out About</label>
        <InquiryTypeSelector selected={inquiryType} onSelect={setInquiryType} />
      </div>

      <motion.div initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} transition={{ duration: 0.5 }}
        style={{ height: 1, background: DS.border, transformOrigin: "left", marginBottom: 28 }} />

      {/* Wedding-specific fields */}
      <AnimatePresence mode="wait">
        <motion.div key={inquiryType} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -4 }} transition={{ duration: 0.25 }}>
          {(inquiryType === "wedding" || inquiryType === "elopement") && (
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 16 }} className="form-row">
              <div>
                <label style={labelStyle}>Your Name</label>
                <input type="text" placeholder="Full name" style={inputBase} onFocus={focusHandler} onBlur={blurHandler} />
              </div>
              <div>
                <label style={labelStyle}>Partner's Name</label>
                <input type="text" placeholder="Partner's full name" style={inputBase} onFocus={focusHandler} onBlur={blurHandler} />
              </div>
              <div>
                <label style={labelStyle}>Email</label>
                <input type="email" placeholder="you@email.com" style={inputBase} onFocus={focusHandler} onBlur={blurHandler} />
              </div>
              <div>
                <label style={labelStyle}>Phone</label>
                <input type="tel" placeholder="(000) 000-0000" style={inputBase} onFocus={focusHandler} onBlur={blurHandler} />
              </div>
              <div>
                <label style={labelStyle}>Wedding Date</label>
                <input type="text" placeholder="MM / DD / YYYY" style={inputBase} onFocus={focusHandler} onBlur={blurHandler} />
              </div>
              <div>
                <label style={labelStyle}>Guest Count</label>
                <select style={{ ...inputBase, appearance: "none", cursor: "pointer" }} onFocus={focusHandler} onBlur={blurHandler}>
                  <option value="">Select range...</option>
                  <option>Under 30 guests</option>
                  <option>30–75 guests</option>
                  <option>75–150 guests</option>
                  <option>150–250 guests</option>
                  <option>250+ guests</option>
                </select>
              </div>
              <div>
                <label style={labelStyle}>Venue</label>
                <input type="text" placeholder="Venue name & city" style={inputBase} onFocus={focusHandler} onBlur={blurHandler} />
              </div>
              <div>
                <label style={labelStyle}>Ceremony Location</label>
                <input type="text" placeholder="If different from reception" style={inputBase} onFocus={focusHandler} onBlur={blurHandler} />
              </div>
              <div>
                <label style={labelStyle}>Services Interested In</label>
                <select style={{ ...inputBase, appearance: "none", cursor: "pointer" }} onFocus={focusHandler} onBlur={blurHandler}>
                  <option value="">Select package...</option>
                  <option>Essentials — Photography</option>
                  <option>Signature — Photography</option>
                  <option>Cinematic — Photo + Film</option>
                  <option>Custom Package</option>
                  <option>Not sure yet</option>
                </select>
              </div>
              <div>
                <label style={labelStyle}>How Did You Find Us?</label>
                <select style={{ ...inputBase, appearance: "none", cursor: "pointer" }} onFocus={focusHandler} onBlur={blurHandler}>
                  <option value="">Select...</option>
                  <option>Instagram</option>
                  <option>The Knot</option>
                  <option>WeddingWire / Zola</option>
                  <option>Venue / Planner Referral</option>
                  <option>Google Search</option>
                  <option>Friend / Family</option>
                  <option>Saw us at another wedding</option>
                  <option>Other</option>
                </select>
              </div>
              <div style={{ gridColumn: "1 / -1" }}>
                <label style={labelStyle}>Tell Us About Your Day</label>
                <textarea rows={5} placeholder="Your vision, must-haves, questions, vibe — anything that helps us understand what you're dreaming of..." style={{ ...inputBase, resize: "vertical" }} onFocus={focusHandler} onBlur={blurHandler} />
              </div>
            </div>
          )}

          {inquiryType === "commercial" && (
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 16 }} className="form-row">
              <div>
                <label style={labelStyle}>Your Name</label>
                <input type="text" placeholder="Full name" style={inputBase} onFocus={focusHandler} onBlur={blurHandler} />
              </div>
              <div>
                <label style={labelStyle}>Company / Brand</label>
                <input type="text" placeholder="Company name" style={inputBase} onFocus={focusHandler} onBlur={blurHandler} />
              </div>
              <div>
                <label style={labelStyle}>Email</label>
                <input type="email" placeholder="you@company.com" style={inputBase} onFocus={focusHandler} onBlur={blurHandler} />
              </div>
              <div>
                <label style={labelStyle}>Phone</label>
                <input type="tel" placeholder="(000) 000-0000" style={inputBase} onFocus={focusHandler} onBlur={blurHandler} />
              </div>
              <div>
                <label style={labelStyle}>Project Type</label>
                <select style={{ ...inputBase, appearance: "none", cursor: "pointer" }} onFocus={focusHandler} onBlur={blurHandler}>
                  <option value="">Select...</option>
                  <option>Brand Photography</option>
                  <option>Product Photography</option>
                  <option>Event Coverage</option>
                  <option>Video Production</option>
                  <option>Other</option>
                </select>
              </div>
              <div>
                <label style={labelStyle}>Timeline</label>
                <input type="text" placeholder="Approximate date or deadline" style={inputBase} onFocus={focusHandler} onBlur={blurHandler} />
              </div>
              <div style={{ gridColumn: "1 / -1" }}>
                <label style={labelStyle}>Project Details</label>
                <textarea rows={5} placeholder="Tell us about the project — scope, deliverables, budget range if known..." style={{ ...inputBase, resize: "vertical" }} onFocus={focusHandler} onBlur={blurHandler} />
              </div>
            </div>
          )}

          {inquiryType === "academy" && (
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 16 }} className="form-row">
              <div>
                <label style={labelStyle}>Your Name</label>
                <input type="text" placeholder="Full name" style={inputBase} onFocus={focusHandler} onBlur={blurHandler} />
              </div>
              <div>
                <label style={labelStyle}>Email</label>
                <input type="email" placeholder="you@email.com" style={inputBase} onFocus={focusHandler} onBlur={blurHandler} />
              </div>
              <div>
                <label style={labelStyle}>Phone</label>
                <input type="tel" placeholder="(000) 000-0000" style={inputBase} onFocus={focusHandler} onBlur={blurHandler} />
              </div>
              <div>
                <label style={labelStyle}>Experience Level</label>
                <select style={{ ...inputBase, appearance: "none", cursor: "pointer" }} onFocus={focusHandler} onBlur={blurHandler}>
                  <option value="">Select...</option>
                  <option>Complete Beginner</option>
                  <option>Hobbyist / Self-Taught</option>
                  <option>Some Professional Work</option>
                  <option>Working Professional</option>
                </select>
              </div>
              <div>
                <label style={labelStyle}>Primary Interest</label>
                <select style={{ ...inputBase, appearance: "none", cursor: "pointer" }} onFocus={focusHandler} onBlur={blurHandler}>
                  <option value="">Select...</option>
                  <option>Photography</option>
                  <option>Videography</option>
                  <option>Both</option>
                </select>
              </div>
              <div>
                <label style={labelStyle}>Preferred Format</label>
                <select style={{ ...inputBase, appearance: "none", cursor: "pointer" }} onFocus={focusHandler} onBlur={blurHandler}>
                  <option value="">Select...</option>
                  <option>In-Person (Rhode Island)</option>
                  <option>Online</option>
                  <option>Either</option>
                </select>
              </div>
              <div style={{ gridColumn: "1 / -1" }}>
                <label style={labelStyle}>Why MMC Academy?</label>
                <textarea rows={5} placeholder="What are your goals? What draws you to the wedding industry? Any portfolio links..." style={{ ...inputBase, resize: "vertical" }} onFocus={focusHandler} onBlur={blurHandler} />
              </div>
            </div>
          )}
        </motion.div>
      </AnimatePresence>

      {/* Submit */}
      <div style={{ marginTop: 8 }}>
        <button onClick={() => setSubmitted(true)} style={{
          fontFamily: "'DM Sans'", fontSize: 14, fontWeight: 600, color: DS.bg, background: DS.ember,
          border: "none", padding: "16px 0", cursor: "pointer", textTransform: "uppercase", letterSpacing: "0.1em",
          transition: "background 0.3s", width: "100%",
        }}
          onMouseEnter={(e) => e.target.style.background = "#ff6b3d"}
          onMouseLeave={(e) => e.target.style.background = DS.ember}
        >Send Inquiry</button>
      </div>
    </div>
  );
}

/* ── Response Promise ────────────────────────────────────────────── */

function ResponsePromise() {
  const promises = [
    { icon: "⏱", title: "24-Hour Response", desc: "Every single inquiry gets a personal reply within one business day. No auto-responders, no chatbots." },
    { icon: "◎", title: "No Pressure", desc: "We're here to answer questions, not close deals. If we're not the right fit, we'll tell you — and recommend someone who is." },
    { icon: "◇", title: "Custom Everything", desc: "Don't see exactly what you need? Every package is a starting point. We build around your day, not the other way around." },
  ];

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
      {promises.map((p, i) => (
        <FadeIn key={p.title} delay={i * 0.08}>
          <div style={{
            display: "flex", gap: 16, padding: "20px", border: `1px solid ${DS.border}`,
            transition: "border-color 0.3s",
          }}
            onMouseEnter={(e) => e.currentTarget.style.borderColor = "rgba(201,169,110,0.3)"}
            onMouseLeave={(e) => e.currentTarget.style.borderColor = DS.border}
          >
            <span style={{ fontFamily: "'DM Sans'", fontSize: 22, color: DS.gold, opacity: 0.6, flexShrink: 0, marginTop: 2 }}>{p.icon}</span>
            <div>
              <h4 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 19, fontWeight: 600, color: DS.text, margin: "0 0 6px" }}>{p.title}</h4>
              <p style={{ fontFamily: "'DM Sans'", fontSize: 13, color: DS.textSec, lineHeight: 1.6, margin: 0 }}>{p.desc}</p>
            </div>
          </div>
        </FadeIn>
      ))}
    </div>
  );
}

/* ── Main Contact Page ───────────────────────────────────────────── */

export default function ContactPage() {
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
        input::placeholder, textarea::placeholder { color: ${DS.textSec}; opacity: 0.45; }
        select { color: ${DS.textSec}; }
        select option { background: ${DS.surface}; color: ${DS.text}; }
        @media (max-width: 900px) {
          .nav-links { display: none !important; }
          .contact-main { grid-template-columns: 1fr !important; }
          .form-row { grid-template-columns: 1fr !important; }
          .inquiry-grid { grid-template-columns: 1fr !important; }
          .info-stats { grid-template-columns: 1fr 1fr !important; }
        }
      `}</style>

      <Header activePage="Contact" />

      {/* ── HEADER ────────────────────────────────────────────────── */}
      <div style={{ paddingTop: 100, maxWidth: 1400, margin: "0 auto", paddingLeft: 32, paddingRight: 32 }}>
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }}>
          <div style={{ fontFamily: "'DM Sans'", fontSize: 12, color: DS.textSec, marginBottom: 32 }}>
            <a href="#" style={{ color: DS.textSec, textDecoration: "none", transition: "color 0.2s" }}
              onMouseEnter={(e) => e.target.style.color = DS.gold} onMouseLeave={(e) => e.target.style.color = DS.textSec}>Home</a>
            <span style={{ margin: "0 10px", opacity: 0.4 }}>/</span>
            <span style={{ color: DS.gold }}>Contact</span>
          </div>
        </motion.div>

        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", flexWrap: "wrap", gap: 24, marginBottom: 20 }}>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.35, duration: 0.6 }}>
            <div style={{ fontFamily: "'DM Sans'", fontSize: 12, color: DS.gold, textTransform: "uppercase", letterSpacing: "0.2em", marginBottom: 12 }}>
              Let's Start the Conversation
            </div>
            <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(40px, 6vw, 72px)", fontWeight: 700, color: DS.text, lineHeight: 1.05, margin: 0 }}>
              Get in Touch
            </h1>
          </motion.div>

          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }} style={{
            fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(16px, 1.8vw, 20px)", color: DS.textSec,
            maxWidth: 380, fontStyle: "italic", lineHeight: 1.5, textAlign: "right",
          }}>
            Tell us about your day. We respond to every inquiry within 24 hours.
          </motion.p>
        </div>

        <motion.div initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} transition={{ delay: 0.55, duration: 0.8, ease: "easeOut" }}
          style={{ height: 1, background: DS.border, transformOrigin: "left" }} />
      </div>

      {/* ── MAIN CONTENT ──────────────────────────────────────────── */}
      <div style={{ maxWidth: 1400, margin: "0 auto", padding: "56px 32px 80px" }}>
        <div className="contact-main" style={{ display: "grid", gridTemplateColumns: "1fr 420px", gap: "clamp(32px, 5vw, 80px)", alignItems: "start" }}>

          {/* ── LEFT: FORM ────────────────────────────────────────── */}
          <FadeIn>
            <div>
              <div style={{ marginBottom: 28 }}>
                <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 26, fontWeight: 600, color: DS.text, margin: "0 0 8px" }}>
                  Inquiry Form
                </h2>
                <p style={{ fontFamily: "'DM Sans'", fontSize: 14, color: DS.textSec, lineHeight: 1.6 }}>
                  Select your inquiry type below and fill in the details. The more you share, the better we can prepare for our first conversation.
                </p>
              </div>

              <ContactForm />
            </div>
          </FadeIn>

          {/* ── RIGHT: INFO ───────────────────────────────────────── */}
          <div>
            {/* Studio image */}
            <FadeIn delay={0.1}>
              <div style={{
                width: "100%", aspectRatio: "4/3", background: "#1e1a16", marginBottom: 24,
                display: "flex", alignItems: "center", justifyContent: "center",
              }}>
                <span style={{ fontFamily: "'DM Sans'", fontSize: 12, color: DS.textSec, opacity: 0.25, textTransform: "uppercase", letterSpacing: "0.15em" }}>
                  [ MMC Studio — Providence, RI ]
                </span>
              </div>
            </FadeIn>

            {/* Contact info */}
            <FadeIn delay={0.15}>
              <div style={{ padding: "24px", border: `1px solid ${DS.border}`, marginBottom: 20 }}>
                <h3 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 20, fontWeight: 600, color: DS.text, margin: "0 0 20px" }}>Studio</h3>

                {[
                  { label: "Address", value: "28 Wolcott St\nProvidence, RI 02908", link: false },
                  { label: "Phone", value: "(401) 616-4500", link: false },
                  { label: "Email", value: "info@movemountains.co", link: true },
                ].map((item) => (
                  <div key={item.label} style={{ marginBottom: 18 }}>
                    <div style={{ fontFamily: "'DM Sans'", fontSize: 10, color: DS.gold, textTransform: "uppercase", letterSpacing: "0.12em", marginBottom: 4 }}>{item.label}</div>
                    {item.link ? (
                      <a href={`mailto:${item.value}`} style={{ fontFamily: "'DM Sans'", fontSize: 15, color: DS.text, textDecoration: "none", borderBottom: `1px solid ${DS.border}`, paddingBottom: 1, transition: "border-color 0.2s" }}
                        onMouseEnter={(e) => e.target.style.borderColor = DS.gold}
                        onMouseLeave={(e) => e.target.style.borderColor = DS.border}
                      >{item.value}</a>
                    ) : (
                      <div style={{ fontFamily: "'DM Sans'", fontSize: 15, color: DS.text, whiteSpace: "pre-line" }}>{item.value}</div>
                    )}
                  </div>
                ))}

                {/* Hours */}
                <div style={{ marginTop: 20, paddingTop: 16, borderTop: `1px solid ${DS.border}` }}>
                  <div style={{ fontFamily: "'DM Sans'", fontSize: 10, color: DS.gold, textTransform: "uppercase", letterSpacing: "0.12em", marginBottom: 8 }}>Response Hours</div>
                  <div style={{ fontFamily: "'DM Sans'", fontSize: 14, color: DS.textSec, lineHeight: 1.6 }}>
                    Mon–Fri: 9am–6pm EST<br />
                    Weekends: By appointment<br />
                    <span style={{ color: DS.text, fontSize: 13 }}>Wedding days: we're on your timeline</span>
                  </div>
                </div>
              </div>
            </FadeIn>

            {/* Social */}
            <FadeIn delay={0.2}>
              <div style={{ padding: "20px 24px", border: `1px solid ${DS.border}`, marginBottom: 20 }}>
                <div style={{ fontFamily: "'DM Sans'", fontSize: 10, color: DS.gold, textTransform: "uppercase", letterSpacing: "0.12em", marginBottom: 14 }}>Follow Along</div>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 8 }} className="info-stats">
                  {[
                    { platform: "Instagram", handle: "@movemountainsco", followers: "43K", abbr: "IG" },
                    { platform: "Facebook", handle: "movemountainsco", followers: "5.7K", abbr: "FB" },
                    { platform: "TikTok", handle: "@movemountainsco", followers: "—", abbr: "TK" },
                    { platform: "Vimeo", handle: "movemountainsco", followers: "—", abbr: "VM" },
                  ].map((s) => (
                    <a key={s.abbr} href="#" style={{
                      textDecoration: "none", textAlign: "center", padding: "12px 8px",
                      border: `1px solid ${DS.border}`, transition: "all 0.3s",
                    }}
                      onMouseEnter={(e) => { e.currentTarget.style.borderColor = DS.gold; }}
                      onMouseLeave={(e) => { e.currentTarget.style.borderColor = DS.border; }}
                    >
                      <div style={{ fontFamily: "'Bebas Neue'", fontSize: 20, color: DS.gold, lineHeight: 1 }}>{s.abbr}</div>
                      <div style={{ fontFamily: "'DM Sans'", fontSize: 10, color: DS.textSec, marginTop: 4 }}>{s.followers}</div>
                    </a>
                  ))}
                </div>
              </div>
            </FadeIn>

            {/* Service areas */}
            <FadeIn delay={0.25}>
              <div style={{ padding: "20px 24px", border: `1px solid ${DS.border}`, marginBottom: 20 }}>
                <div style={{ fontFamily: "'DM Sans'", fontSize: 10, color: DS.gold, textTransform: "uppercase", letterSpacing: "0.12em", marginBottom: 12 }}>Service Areas</div>
                <p style={{ fontFamily: "'DM Sans'", fontSize: 13, color: DS.textSec, lineHeight: 1.7, margin: 0 }}>
                  Rhode Island, Massachusetts, Connecticut, New Hampshire, Vermont, Maine, New York, New Jersey, Pennsylvania, Maryland, Virginia, North Carolina, South Carolina, Florida, Texas, Colorado — and beyond.
                </p>
                <div style={{ fontFamily: "'DM Sans'", fontSize: 12, color: DS.gold, marginTop: 10, opacity: 0.7 }}>
                  No travel restrictions. Destination weddings welcome.
                </div>
              </div>
            </FadeIn>

            {/* Vendor networks */}
            <FadeIn delay={0.3}>
              <div style={{ padding: "20px 24px", border: `1px solid ${DS.border}` }}>
                <div style={{ fontFamily: "'DM Sans'", fontSize: 10, color: DS.gold, textTransform: "uppercase", letterSpacing: "0.12em", marginBottom: 12 }}>Find Us On</div>
                <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
                  {["The Knot", "WeddingWire", "Zola"].map((p) => (
                    <a key={p} href="#" style={{
                      fontFamily: "'DM Sans'", fontSize: 12, color: DS.textSec, textDecoration: "none",
                      padding: "6px 14px", border: `1px solid ${DS.border}`, transition: "all 0.3s",
                    }}
                      onMouseEnter={(e) => { e.target.style.borderColor = DS.gold; e.target.style.color = DS.gold; }}
                      onMouseLeave={(e) => { e.target.style.borderColor = DS.border; e.target.style.color = DS.textSec; }}
                    >{p}</a>
                  ))}
                </div>
              </div>
            </FadeIn>
          </div>
        </div>
      </div>

      {/* ── RESPONSE PROMISE ──────────────────────────────────────── */}
      <div style={{ background: DS.surface, borderTop: `1px solid ${DS.border}`, borderBottom: `1px solid ${DS.border}`, padding: "80px 32px" }}>
        <div style={{ maxWidth: 900, margin: "0 auto" }}>
          <FadeIn>
            <div style={{ textAlign: "center", marginBottom: 40 }}>
              <div style={{ fontFamily: "'DM Sans'", fontSize: 12, color: DS.gold, textTransform: "uppercase", letterSpacing: "0.2em", marginBottom: 12 }}>Our Commitment</div>
              <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(28px, 3.5vw, 42px)", fontWeight: 700, color: DS.text, margin: 0 }}>What to Expect</h2>
            </div>
          </FadeIn>
          <ResponsePromise />
        </div>
      </div>

      {/* ── MAP ───────────────────────────────────────────────────── */}
      <div style={{ position: "relative", lineHeight: 0 }}>
        <DarkMap />

        {/* Floating card on map */}
        <div style={{
          position: "absolute", bottom: 24, left: 32, zIndex: 1000,
          background: "rgba(15,15,15,0.92)", backdropFilter: "blur(12px)",
          border: `1px solid ${DS.border}`, padding: "20px 24px", maxWidth: 280,
          lineHeight: 1.4,
        }}>
          <div style={{ fontFamily: "'Playfair Display', serif", fontSize: 18, fontWeight: 700, color: DS.text, marginBottom: 4 }}>
            Move Mountains <span style={{ color: DS.gold }}>Co.</span>
          </div>
          <div style={{ fontFamily: "'DM Sans'", fontSize: 13, color: DS.textSec, lineHeight: 1.5 }}>
            28 Wolcott St<br />Providence, RI 02908
          </div>
          <a href="https://www.google.com/maps/place/Move+Mountains+Co./@41.8295914,-71.436619,1035m/data=!3m2!1e3!4b1!4m6!3m5!1s0x89e44a51d0ddeee7:0x8af0fa2164e7e541!8m2!3d41.8295914!4d-71.4340441!16s%2Fg%2F11bc6z7s5r" target="_blank" rel="noopener noreferrer" style={{
            fontFamily: "'DM Sans'", fontSize: 12, color: DS.gold, textDecoration: "none",
            textTransform: "uppercase", letterSpacing: "0.08em", marginTop: 10, display: "inline-block",
            borderBottom: `1px solid ${DS.gold}`, paddingBottom: 2,
          }}>Get Directions →</a>
        </div>
      </div>

      {/* ── BOTTOM PULL QUOTE ─────────────────────────────────────── */}
      <div style={{ padding: "80px 32px", textAlign: "center" }}>
        <FadeIn>
          <div style={{ maxWidth: 700, margin: "0 auto" }}>
            <div style={{ fontFamily: "'Playfair Display', serif", fontSize: 56, color: DS.gold, opacity: 0.2, lineHeight: 1, marginBottom: -12 }}>"</div>
            <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(20px, 2.5vw, 28px)", color: DS.text, lineHeight: 1.5, fontStyle: "italic", fontWeight: 500 }}>
              Move Mountains Co. was such a pleasure to work with. Throughout the entire planning process, they were extremely responsive and happy to assist us with our questions and needs. The day of the wedding, they were a dream.
            </p>
            <div style={{ fontFamily: "'DM Sans'", fontSize: 13, color: DS.gold, textTransform: "uppercase", letterSpacing: "0.12em", marginTop: 20 }}>— Recent Couple, WeddingWire Review</div>
          </div>
        </FadeIn>
      </div>

      <Footer />
    </div>
  );
}
