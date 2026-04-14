import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { DS } from "../designSystem";
import { searchVenues } from "../../data/venues";

const GUEST_COUNTS = ["Under 30", "30–75", "75–150", "150–250", "250+"];
const REFERRAL_SOURCES = ["Instagram", "The Knot", "WeddingWire", "Venue Referral", "Google", "Friend or Family", "Other"];

const inputStyle = {
  width: "100%", padding: "14px 16px", background: "transparent",
  border: `1px solid var(--mm-border)`, borderRadius: 6, color: "var(--mm-text)",
  fontFamily: "'DM Sans'", fontSize: 14, outline: "none",
  transition: "border-color 0.2s",
};

const labelStyle = {
  fontFamily: "'DM Sans'", fontSize: 12, fontWeight: 600, color: "var(--mm-text-sec)",
  textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 8, display: "block",
};

function Field({ label, required, children, error }) {
  return (
    <div style={{ marginBottom: 24 }}>
      <label style={labelStyle}>
        {label} {required && <span style={{ color: DS.ember }}>*</span>}
      </label>
      {children}
      {error && (
        <motion.div initial={{ opacity: 0, y: -4 }} animate={{ opacity: 1, y: 0 }}
          style={{ fontFamily: "'DM Sans'", fontSize: 12, color: DS.ember, marginTop: 6 }}>
          {error}
        </motion.div>
      )}
    </div>
  );
}

function VenueAutocomplete({ value, onChange, hasError }) {
  const [focused, setFocused] = useState(false);
  const [highlightIdx, setHighlightIdx] = useState(-1);
  const wrapperRef = useRef(null);
  const suggestions = focused ? searchVenues(value) : [];

  useEffect(() => {
    setHighlightIdx(-1);
  }, [value]);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target)) {
        setFocused(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleKeyDown = (e) => {
    if (!suggestions.length) return;
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setHighlightIdx((i) => Math.min(i + 1, suggestions.length - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setHighlightIdx((i) => Math.max(i - 1, 0));
    } else if (e.key === "Enter" && highlightIdx >= 0) {
      e.preventDefault();
      onChange(suggestions[highlightIdx].name);
      setFocused(false);
    } else if (e.key === "Escape") {
      setFocused(false);
    }
  };

  const selectVenue = (venue) => {
    onChange(venue.name);
    setFocused(false);
  };

  return (
    <div ref={wrapperRef} style={{ position: "relative" }}>
      <input
        type="text"
        value={value}
        onChange={(e) => { onChange(e.target.value); setFocused(true); }}
        onFocus={() => setFocused(true)}
        onKeyDown={handleKeyDown}
        placeholder="Start typing a venue name..."
        style={{ ...inputStyle, borderColor: hasError ? DS.ember : focused && suggestions.length ? DS.gold : undefined }}
      />
      <AnimatePresence>
        {focused && suggestions.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            transition={{ duration: 0.15 }}
            style={{
              position: "absolute", top: "100%", left: 0, right: 0, zIndex: 50,
              marginTop: 4, background: "var(--mm-surface)", border: `1px solid ${DS.gold}33`,
              borderRadius: 8, overflow: "hidden", boxShadow: "0 8px 24px rgba(0,0,0,0.25)",
            }}
          >
            {suggestions.map((venue, i) => (
              <motion.button
                key={venue.id}
                onClick={() => selectVenue(venue)}
                onMouseEnter={() => setHighlightIdx(i)}
                style={{
                  width: "100%", display: "flex", alignItems: "center", justifyContent: "space-between",
                  padding: "12px 16px", border: "none", cursor: "pointer", textAlign: "left",
                  background: i === highlightIdx ? `${DS.gold}12` : "transparent",
                  borderBottom: i < suggestions.length - 1 ? `1px solid var(--mm-border)` : "none",
                  transition: "background 0.1s",
                }}
              >
                <div>
                  <div style={{ fontFamily: "'DM Sans'", fontSize: 14, fontWeight: 600, color: "var(--mm-text)" }}>
                    {venue.name}
                  </div>
                  <div style={{ fontFamily: "'DM Sans'", fontSize: 12, color: "var(--mm-text-sec)", marginTop: 2 }}>
                    {venue.location}
                  </div>
                </div>
                <span style={{
                  fontFamily: "'DM Sans'", fontSize: 10, color: DS.gold,
                  textTransform: "uppercase", letterSpacing: "0.08em", opacity: 0.7,
                }}>
                  {venue.type}
                </span>
              </motion.button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function ClientIntakeForm({ data, onChange, errors = {} }) {
  const update = (field, value) => {
    onChange({ ...data, [field]: value });
  };

  return (
    <div>
      <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(28px, 4vw, 42px)", fontWeight: 400, marginBottom: 8 }}>
        Tell us about you
      </h2>
      <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 19, color: DS.textSec, marginBottom: 40, lineHeight: 1.6 }}>
        We'd love to know more about you and your day. This helps us prepare the best possible experience for your wedding.
      </p>

      <div style={{ maxWidth: 640, margin: "0 auto" }}>
        {/* Names */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
          <Field label="Your Name" required error={errors.name}>
            <input type="text" value={data.name || ""} onChange={(e) => update("name", e.target.value)}
              placeholder="First & Last" style={{ ...inputStyle, borderColor: errors.name ? DS.ember : undefined }} />
          </Field>
          <Field label="Partner's Name" required error={errors.partnerName}>
            <input type="text" value={data.partnerName || ""} onChange={(e) => update("partnerName", e.target.value)}
              placeholder="First & Last" style={{ ...inputStyle, borderColor: errors.partnerName ? DS.ember : undefined }} />
          </Field>
        </div>

        {/* Contact */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
          <Field label="Email" required error={errors.email}>
            <input type="email" value={data.email || ""} onChange={(e) => update("email", e.target.value)}
              placeholder="you@email.com" style={{ ...inputStyle, borderColor: errors.email ? DS.ember : undefined }} />
          </Field>
          <Field label="Partner's Email" error={errors.partnerEmail}>
            <input type="email" value={data.partnerEmail || ""} onChange={(e) => update("partnerEmail", e.target.value)}
              placeholder="partner@email.com" style={inputStyle} />
          </Field>
        </div>

        <Field label="Phone" required error={errors.phone}>
          <input type="tel" value={data.phone || ""} onChange={(e) => update("phone", e.target.value)}
            placeholder="(401) 555-1234" style={{ ...inputStyle, borderColor: errors.phone ? DS.ember : undefined }} />
        </Field>

        {/* Wedding details */}
        <div style={{ borderTop: `1px solid ${DS.border}`, margin: "32px 0", paddingTop: 32 }}>
          <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: 22, fontWeight: 400, marginBottom: 24 }}>
            Wedding Details
          </h3>

          <Field label="Wedding Date" required>
            <div style={{
              ...inputStyle, background: `${DS.gold}08`, borderColor: `${DS.gold}33`,
              color: DS.gold, fontWeight: 600,
            }}>
              {data.weddingDate ? new Date(data.weddingDate + "T12:00:00").toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric", year: "numeric" }) : "—"}
            </div>
          </Field>

          <Field label="Venue" required error={errors.venue}>
            <VenueAutocomplete
              value={data.venue || ""}
              onChange={(v) => update("venue", v)}
              hasError={!!errors.venue}
            />
          </Field>

          <Field label="Ceremony Location" error={errors.ceremonyLocation}>
            <input type="text" value={data.ceremonyLocation || ""} onChange={(e) => update("ceremonyLocation", e.target.value)}
              placeholder="If different from reception venue" style={inputStyle} />
          </Field>

          <Field label="Guest Count" required error={errors.guestCount}>
            <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
              {GUEST_COUNTS.map((count) => (
                <motion.button key={count} onClick={() => update("guestCount", count)}
                  whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}
                  style={{
                    padding: "10px 18px", borderRadius: 6, cursor: "pointer",
                    fontFamily: "'DM Sans'", fontSize: 13,
                    border: `1px solid ${data.guestCount === count ? DS.gold : DS.border}`,
                    background: data.guestCount === count ? `${DS.gold}12` : "transparent",
                    color: data.guestCount === count ? DS.gold : DS.text,
                    transition: "all 0.2s",
                  }}>
                  {count}
                </motion.button>
              ))}
            </div>
          </Field>
        </div>

        {/* How they found MMC */}
        <Field label="How did you find us?">
          <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
            {REFERRAL_SOURCES.map((source) => (
              <motion.button key={source} onClick={() => update("referralSource", source)}
                whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}
                style={{
                  padding: "10px 16px", borderRadius: 6, cursor: "pointer",
                  fontFamily: "'DM Sans'", fontSize: 13,
                  border: `1px solid ${data.referralSource === source ? DS.gold : DS.border}`,
                  background: data.referralSource === source ? `${DS.gold}12` : "transparent",
                  color: data.referralSource === source ? DS.gold : DS.text,
                  transition: "all 0.2s",
                }}>
                {source}
              </motion.button>
            ))}
          </div>
        </Field>

        {/* Vision */}
        <Field label="Tell us about your day">
          <textarea value={data.vision || ""} onChange={(e) => update("vision", e.target.value)}
            placeholder="What's the vibe? What moments matter most? What should we know about your day?"
            rows={5} style={{ ...inputStyle, resize: "vertical", lineHeight: 1.6 }} />
        </Field>
      </div>
    </div>
  );
}
