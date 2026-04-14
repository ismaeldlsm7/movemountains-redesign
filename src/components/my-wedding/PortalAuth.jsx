import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { DS } from "../designSystem";

const fontLink = "https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,700;1,400&family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;0,700;1,400;1,500&family=DM+Sans:wght@400;500;600;700&family=Bebas+Neue&display=swap";

const DEMO_ACCOUNTS = [
  { partner: "partner_1", name: "Emma", email: "emma@example.com", initial: "E" },
  { partner: "partner_2", name: "James", email: "james@example.com", initial: "J" },
];

export default function PortalAuth({ onLogin }) {
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSend = (e) => {
    e.preventDefault();
    if (!email) return;
    setLoading(true);
    setTimeout(() => { setLoading(false); setSent(true); }, 900);
  };

  return (
    <div style={{ background: DS.bg, minHeight: "100vh", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "40px 24px" }}>
      <style>{`@import url('${fontLink}'); * { box-sizing: border-box; margin: 0; padding: 0; }`}</style>

      {/* Brand mark */}
      <motion.div initial={{ opacity: 0, y: -12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} style={{ marginBottom: 48, textAlign: "center" }}>
        <div style={{ fontFamily: "'Playfair Display', serif", fontSize: 22, color: DS.text, letterSpacing: "0.04em" }}>
          Move Mountains <span style={{ color: DS.gold }}>Co.</span>
        </div>
        <div style={{ fontFamily: "'DM Sans'", fontSize: 11, color: DS.textSec, textTransform: "uppercase", letterSpacing: "0.14em", marginTop: 4 }}>
          Client Portal
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.1 }}
        style={{ width: "100%", maxWidth: 400 }}
      >
        <AnimatePresence mode="wait">
          {!sent ? (
            <motion.div key="form" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(28px, 5vw, 38px)", fontWeight: 400, color: DS.text, marginBottom: 12, textAlign: "center" }}>
                Welcome back
              </h1>
              <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 18, color: DS.textSec, textAlign: "center", lineHeight: 1.6, marginBottom: 36 }}>
                Enter your email and we'll send you a magic link to access your wedding portal.
              </p>

              <form onSubmit={handleSend}>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="your@email.com"
                  style={{
                    width: "100%", padding: "14px 16px", marginBottom: 12,
                    background: DS.surface, border: `1px solid ${DS.border}`,
                    borderRadius: 8, color: DS.text, fontFamily: "'DM Sans'",
                    fontSize: 15, outline: "none",
                  }}
                />
                <motion.button
                  type="submit"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  disabled={!email || loading}
                  style={{
                    width: "100%", padding: "14px", borderRadius: 8, border: "none",
                    background: email ? `linear-gradient(135deg, ${DS.gold}, ${DS.ember})` : DS.surface,
                    color: email ? "#fff" : DS.textSec,
                    fontFamily: "'DM Sans'", fontSize: 14, fontWeight: 700,
                    textTransform: "uppercase", letterSpacing: "0.08em",
                    cursor: email ? "pointer" : "not-allowed", transition: "all 0.3s",
                  }}
                >
                  {loading ? "Sending…" : "Send magic link"}
                </motion.button>
              </form>

              {/* Demo shortcut */}
              <div style={{ marginTop: 40, paddingTop: 32, borderTop: `1px solid ${DS.border}` }}>
                <div style={{ fontFamily: "'DM Sans'", fontSize: 11, color: DS.textSec, textAlign: "center", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: 16 }}>
                  Demo — log in as
                </div>
                <div style={{ display: "flex", gap: 10 }}>
                  {DEMO_ACCOUNTS.map((a) => (
                    <motion.button
                      key={a.partner}
                      onClick={() => onLogin(a)}
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.97 }}
                      style={{
                        flex: 1, padding: "12px 16px", border: `1px solid ${DS.gold}44`,
                        borderRadius: 8, background: `${DS.gold}08`,
                        color: DS.text, cursor: "pointer", fontFamily: "'DM Sans'",
                        display: "flex", flexDirection: "column", alignItems: "center", gap: 6,
                      }}
                    >
                      <div style={{
                        width: 36, height: 36, borderRadius: "50%",
                        background: `linear-gradient(135deg, ${DS.gold}, ${DS.ember})`,
                        display: "flex", alignItems: "center", justifyContent: "center",
                        fontFamily: "'Playfair Display', serif", fontSize: 16, color: DS.bg,
                      }}>
                        {a.initial}
                      </div>
                      <div style={{ fontSize: 13, fontWeight: 600 }}>{a.name}</div>
                      <div style={{ fontSize: 11, color: DS.textSec }}>{a.email}</div>
                    </motion.button>
                  ))}
                </div>
              </div>
            </motion.div>
          ) : (
            <motion.div key="sent" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} style={{ textAlign: "center" }}>
              <div style={{ fontSize: 48, marginBottom: 20 }}>✉</div>
              <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 28, fontWeight: 400, color: DS.text, marginBottom: 12 }}>
                Check your inbox
              </h2>
              <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 18, color: DS.textSec, lineHeight: 1.6, marginBottom: 32 }}>
                We sent a secure link to <strong style={{ color: DS.gold }}>{email}</strong>. It expires in 15 minutes.
              </p>
              <div style={{ paddingTop: 24, borderTop: `1px solid ${DS.border}` }}>
                <div style={{ fontFamily: "'DM Sans'", fontSize: 11, color: DS.textSec, textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: 12 }}>
                  Demo shortcut
                </div>
                <div style={{ display: "flex", gap: 10 }}>
                  {DEMO_ACCOUNTS.map((a) => (
                    <motion.button key={a.partner} onClick={() => onLogin(a)} whileHover={{ scale: 1.02 }} style={{ flex: 1, padding: "10px", border: `1px solid ${DS.gold}44`, borderRadius: 8, background: `${DS.gold}08`, color: DS.gold, cursor: "pointer", fontFamily: "'DM Sans'", fontSize: 13, fontWeight: 600 }}>
                      Enter as {a.name}
                    </motion.button>
                  ))}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}
