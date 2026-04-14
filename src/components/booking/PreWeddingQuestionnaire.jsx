import { motion } from "framer-motion";
import { DS } from "../designSystem";

const STYLES = [
  { id: "romantic", label: "Romantic", desc: "Soft, warm, intimate" },
  { id: "editorial", label: "Editorial", desc: "Clean, magazine-quality" },
  { id: "documentary", label: "Documentary", desc: "Candid, story-driven" },
  { id: "moody", label: "Moody", desc: "Deep tones, cinematic" },
  { id: "bright", label: "Bright & Airy", desc: "Light, fresh, natural" },
  { id: "classic", label: "Classic", desc: "Timeless, elegant" },
];

const inputStyle = {
  width: "100%", padding: "14px 16px", background: "transparent",
  border: `1px solid var(--mm-border)`, borderRadius: 6, color: "var(--mm-text)",
  fontFamily: "'DM Sans'", fontSize: 14, outline: "none", transition: "border-color 0.2s",
};

const labelStyle = {
  fontFamily: "'DM Sans'", fontSize: 12, fontWeight: 600, color: "var(--mm-text-sec)",
  textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 10, display: "block",
};

export default function PreWeddingQuestionnaire({ data, onChange, onSkip }) {
  const update = (field, value) => {
    onChange({ ...data, [field]: value });
  };

  return (
    <div>
      <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(28px, 4vw, 42px)", fontWeight: 400, marginBottom: 8 }}>
        Share your vision
      </h2>
      <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 19, color: DS.textSec, marginBottom: 12, lineHeight: 1.6 }}>
        Help us understand what your dream day looks like. The more we know, the better we can capture it.
      </p>
      <button onClick={onSkip} style={{
        background: "none", border: "none", color: DS.textSec, fontFamily: "'DM Sans'",
        fontSize: 13, cursor: "pointer", textDecoration: "underline", marginBottom: 40,
        display: "block",
      }}>
        Skip for now — you can complete this later from your portal
      </button>

      <div style={{ maxWidth: 640, margin: "0 auto" }}>
        {/* Style preference */}
        <div style={{ marginBottom: 32 }}>
          <label style={labelStyle}>What style resonates with you?</label>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(160px, 1fr))", gap: 12 }}>
            {STYLES.map((style) => (
              <motion.button key={style.id} onClick={() => update("stylePreference", style.id)}
                whileHover={{ y: -2 }} whileTap={{ scale: 0.97 }}
                style={{
                  padding: "16px 14px", borderRadius: 8, cursor: "pointer", textAlign: "left",
                  border: `1px solid ${data.stylePreference === style.id ? DS.gold : DS.border}`,
                  background: data.stylePreference === style.id ? `${DS.gold}0a` : "transparent",
                  transition: "all 0.2s",
                }}>
                <div style={{ fontFamily: "'DM Sans'", fontSize: 14, fontWeight: 600, color: data.stylePreference === style.id ? DS.gold : DS.text, marginBottom: 4 }}>
                  {style.label}
                </div>
                <div style={{ fontFamily: "'DM Sans'", fontSize: 12, color: DS.textSec }}>
                  {style.desc}
                </div>
              </motion.button>
            ))}
          </div>
        </div>

        {/* Must-have moments */}
        <div style={{ marginBottom: 32 }}>
          <label style={labelStyle}>Must-have moments</label>
          <p style={{ fontFamily: "'DM Sans'", fontSize: 13, color: DS.textSec, marginBottom: 10 }}>
            What moments absolutely cannot be missed? First look, parent dances, toasts, sunset portraits?
          </p>
          <textarea value={data.mustHaveMoments || ""} onChange={(e) => update("mustHaveMoments", e.target.value)}
            placeholder="Tell us about the moments that matter most..." rows={4}
            style={{ ...inputStyle, resize: "vertical", lineHeight: 1.6 }} />
        </div>

        {/* Key people */}
        <div style={{ marginBottom: 32 }}>
          <label style={labelStyle}>Key people we should know about</label>
          <p style={{ fontFamily: "'DM Sans'", fontSize: 13, color: DS.textSec, marginBottom: 10 }}>
            VIPs, family members with special roles, anyone we should make sure to photograph
          </p>
          <textarea value={data.keyPeople || ""} onChange={(e) => update("keyPeople", e.target.value)}
            placeholder="e.g. Grandmother flying in from Italy, best friend giving surprise speech..." rows={3}
            style={{ ...inputStyle, resize: "vertical", lineHeight: 1.6 }} />
        </div>

        {/* Timeline notes */}
        <div style={{ marginBottom: 32 }}>
          <label style={labelStyle}>Timeline of your day</label>
          <p style={{ fontFamily: "'DM Sans'", fontSize: 13, color: DS.textSec, marginBottom: 10 }}>
            Any known timing details — ceremony start, sunset time, special events?
          </p>
          <textarea value={data.timelineNotes || ""} onChange={(e) => update("timelineNotes", e.target.value)}
            placeholder="e.g. Ceremony at 4:30pm, golden hour at 7:15pm, sparkler exit at 10pm..." rows={3}
            style={{ ...inputStyle, resize: "vertical", lineHeight: 1.6 }} />
        </div>

        {/* Song requests */}
        <div style={{ marginBottom: 32 }}>
          <label style={labelStyle}>Song requests or special music</label>
          <p style={{ fontFamily: "'DM Sans'", fontSize: 13, color: DS.textSec, marginBottom: 10 }}>
            Any songs that are meaningful to you? We use these for film editing and mood planning.
          </p>
          <input type="text" value={data.songRequests || ""} onChange={(e) => update("songRequests", e.target.value)}
            placeholder="e.g. 'At Last' by Etta James for the first dance" style={inputStyle} />
        </div>

        {/* Venue restrictions */}
        <div style={{ marginBottom: 32 }}>
          <label style={labelStyle}>Venue restrictions or notes</label>
          <p style={{ fontFamily: "'DM Sans'", fontSize: 13, color: DS.textSec, marginBottom: 10 }}>
            Any photography/video restrictions, off-limit areas, or venue-specific requirements?
          </p>
          <textarea value={data.venueRestrictions || ""} onChange={(e) => update("venueRestrictions", e.target.value)}
            placeholder="e.g. No flash during ceremony, drone allowed outdoors only..." rows={3}
            style={{ ...inputStyle, resize: "vertical", lineHeight: 1.6 }} />
        </div>
      </div>
    </div>
  );
}
