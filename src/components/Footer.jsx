import { useState } from "react";
import { motion } from "framer-motion";
import { DS, socialLinks } from "./designSystem";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import subscribeSuccess from "../assets/lotties/subscribe-success.json";

export default function Footer() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);
  const [theme, setTheme] = useState(() => (typeof document !== "undefined" ? document.documentElement.getAttribute("data-theme") || "dark" : "dark"));

  const setMode = (mode) => {
    document.documentElement.setAttribute("data-theme", mode);
    localStorage.setItem("mm-theme", mode);
    setTheme(mode);
  };

  return (
    <footer style={{ background: DS.surface, borderTop: `1px solid ${DS.border}` }}>
      <style>{`
        @media (max-width: 900px) {
          .footer-grid { grid-template-columns: 1fr 1fr !important; gap: 32px !important; }
          .footer-grid > :nth-child(1) { grid-column: 1 / -1 !important; }
          .footer-grid > :nth-child(2) { grid-column: 1 !important; grid-row: 2 !important; }
          .footer-grid > :nth-child(3) { grid-column: 1 !important; grid-row: 3 !important; }
          .footer-grid > :nth-child(4) { grid-column: 2 !important; grid-row: 2 !important; }
          .footer-grid > :nth-child(5) { grid-column: 2 !important; grid-row: 3 !important; }
          .newsletter-row { flex-direction: column !important; align-items: flex-start !important; }
          .newsletter-row > div:last-child { width: 100% !important; max-width: 100% !important; }
        }
        @media (max-width: 600px) {
          .footer-bottom-bar { flex-direction: column !important; text-align: center !important; gap: 10px !important; }
        }
        .footer-theme-toggle { display: none; }
        @media (max-width: 900px) { .footer-theme-toggle { display: flex !important; } }
      `}</style>
      <div style={{ borderBottom: `1px solid ${DS.border}`, padding: "clamp(32px, 6vw, 48px) clamp(20px, 4vw, 32px)" }}>
        <div style={{ maxWidth: 1400, margin: "0 auto", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 24 }} className="newsletter-row">
          <div style={{ maxWidth: 460 }}>
            <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(22px, 2.5vw, 30px)", fontWeight: 700, color: DS.text, margin: "0 0 6px" }}>Stay in the Loop</h3>
            <p style={{ fontFamily: "'DM Sans'", fontSize: 14, color: DS.textSec, margin: 0, lineHeight: 1.5 }}>Wedding tips, behind-the-scenes stories, and first access to open dates.</p>
          </div>
          {subscribed ? (
            <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <div style={{ width: 44, height: 44 }}>
                <DotLottieReact data={subscribeSuccess} autoplay />
              </div>
              <span style={{ fontFamily: "'DM Sans'", fontSize: 14, color: DS.text }}>You're in. Welcome to the list.</span>
            </motion.div>
          ) : (
            <div style={{ display: "flex", gap: 0, maxWidth: 420, width: "100%" }}>
              <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="your@email.com" style={{
                flex: 1, padding: "14px 16px", fontFamily: "'DM Sans'", fontSize: 14, color: DS.text,
                background: DS.surfaceAlt, border: `1px solid ${DS.border}`, borderRight: "none", outline: "none", transition: "border-color 0.3s", minWidth: 0,
              }} onFocus={(e) => e.target.style.borderColor = DS.gold} onBlur={(e) => e.target.style.borderColor = DS.border} />
              <button onClick={() => { if (email) setSubscribed(true); }} style={{
                fontFamily: "'DM Sans'", fontSize: 12, fontWeight: 600, color: DS.bg, background: DS.gold,
                border: "none", padding: "14px 24px", cursor: "pointer", textTransform: "uppercase", letterSpacing: "0.08em", transition: "background 0.3s", whiteSpace: "nowrap",
              }} onMouseEnter={(e) => e.target.style.background = "#D4A853"} onMouseLeave={(e) => e.target.style.background = DS.gold}>Subscribe</button>
            </div>
          )}
        </div>
      </div>

      <div style={{ padding: "clamp(40px, 6vw, 56px) clamp(20px, 4vw, 32px) clamp(28px, 5vw, 40px)" }}>
        <div style={{ maxWidth: 1400, margin: "0 auto", display: "grid", gridTemplateColumns: "1.4fr 1fr 1fr 1fr 1.2fr", gap: "clamp(24px, 3vw, 48px)" }} className="footer-grid">
          <div>
            <a href="/" style={{ fontFamily: "'Playfair Display', serif", fontSize: 22, fontWeight: 700, color: DS.text, textDecoration: "none", display: "inline-block", marginBottom: 16 }}>Move Mountains <span style={{ color: DS.gold }}>Co.</span></a>
            <p style={{ fontFamily: "'DM Sans'", fontSize: 13, color: DS.textSec, lineHeight: 1.65, marginBottom: 20 }}>Luxury wedding photography & videography. Based in Providence, Rhode Island. Serving the entire East Coast and beyond.</p>
            {["Best of The Knot '17–'24", "Featured in British Vogue", "Featured in Brides Magazine"].map((a) => (
              <div key={a} style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 6 }}>
                <span style={{ width: 5, height: 5, background: DS.gold, borderRadius: "50%" }} />
                <span style={{ fontFamily: "'DM Sans'", fontSize: 12, color: DS.textSec }}>{a}</span>
              </div>
            ))}
          </div>
          {[
            { title: "Explore", links: ["Portfolio","About","Team","Services","Investment","Blog","Academy"] },
            { title: "Services", links: [{l:"Photography",h:"/photography"},{l:"Videography",h:"/videography"},{l:"Super 8 Film",h:"/super8"},{l:"Content Creation",h:"/content-creation"},{l:"Luxe Booth",h:"/luxebooth"},{l:"Live Streaming",h:"/livestreaming"},{l:"Albums",h:"/albums"}] },
            { title: "Resources", links: [{l:"Planning Portal",h:"/portal"},{l:"Vendors",h:"/preferred-vendors"},{l:"FAQs",h:"/faq"},{l:"Rentals",h:"/rentals"},{l:"MMC Academy",h:"/academy"},{l:"Careers",h:"/careers"},{l:"Intern Program",h:"/intern"}] },
          ].map((col) => (
            <div key={col.title}>
              <div style={{ fontFamily: "'DM Sans'", fontSize: 11, color: DS.gold, textTransform: "uppercase", letterSpacing: "0.15em", marginBottom: 18 }}>{col.title}</div>
              {col.links.map((link) => { const label = typeof link === "string" ? link : link.l; const href = typeof link === "string" ? `/${link.toLowerCase()}` : link.h; return (
                <a key={label} href={href} style={{ display: "block", fontFamily: "'DM Sans'", fontSize: 14, color: DS.textSec, textDecoration: "none", padding: "6px 0", transition: "color 0.2s, padding-left 0.2s" }}
                  onMouseEnter={(e) => { e.target.style.color = DS.text; e.target.style.paddingLeft = "4px"; }}
                  onMouseLeave={(e) => { e.target.style.color = DS.textSec; e.target.style.paddingLeft = "0"; }}>{label}</a>
              ); })}
            </div>
          ))}
          <div>
            <div style={{ fontFamily: "'DM Sans'", fontSize: 11, color: DS.gold, textTransform: "uppercase", letterSpacing: "0.15em", marginBottom: 18 }}>Get in Touch</div>
            <div style={{ fontFamily: "'DM Sans'", fontSize: 14, color: DS.text, lineHeight: 1.7, marginBottom: 14 }}>28 Wolcott St<br />Providence, RI 02908</div>
            <div style={{ marginBottom: 6 }}><div style={{ fontFamily: "'DM Sans'", fontSize: 10, color: DS.textSec, textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 2 }}>Phone</div><a href="tel:4016164500" style={{ fontFamily: "'DM Sans'", fontSize: 14, color: DS.text, textDecoration: "none" }}>(401) 616-4500</a></div>
            <div style={{ marginBottom: 18 }}><div style={{ fontFamily: "'DM Sans'", fontSize: 10, color: DS.textSec, textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 2 }}>Email</div><a href="mailto:info@movemountains.co" style={{ fontFamily: "'DM Sans'", fontSize: 14, color: DS.gold, textDecoration: "none" }}>info@movemountains.co</a></div>
            <div style={{ display: "flex", gap: 8, marginBottom: 14 }}>
              {socialLinks.map((s) => (
                <a key={s.abbr} href={s.href} target="_blank" rel="noopener noreferrer" style={{ width: 40, height: 40, border: `1px solid ${DS.border}`, display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "'DM Sans'", fontSize: 11, fontWeight: 600, color: DS.textSec, textDecoration: "none", transition: "all 0.3s" }}
                  onMouseEnter={(e) => { e.currentTarget.style.borderColor = DS.gold; e.currentTarget.style.color = DS.gold; }}
                  onMouseLeave={(e) => { e.currentTarget.style.borderColor = DS.border; e.currentTarget.style.color = DS.textSec; }}>{s.abbr}</a>
              ))}
            </div>
            <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
              {["The Knot","WeddingWire","Zola"].map((p) => (
                <a key={p} href="#" style={{ fontFamily: "'DM Sans'", fontSize: 11, color: DS.textSec, textDecoration: "none", padding: "4px 10px", border: `1px solid ${DS.border}`, transition: "all 0.3s" }}
                  onMouseEnter={(e) => { e.target.style.borderColor = DS.gold; e.target.style.color = DS.gold; }}
                  onMouseLeave={(e) => { e.target.style.borderColor = DS.border; e.target.style.color = DS.textSec; }}>{p}</a>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div style={{ borderTop: `1px solid ${DS.border}`, padding: "20px clamp(16px, 4vw, 32px)", textAlign: "center" }}>
        <p style={{ fontFamily: "'DM Sans'", fontSize: 12, color: DS.textSec, lineHeight: 1.6, margin: 0, maxWidth: 1000, marginLeft: "auto", marginRight: "auto" }}>
          <span style={{ color: DS.gold, marginRight: 8 }}>◎</span>RI · MA · CT · NY · NJ · PA · MD · VA · NC · SC · FL · TX · CO<span style={{ color: DS.gold, fontStyle: "italic" }}> — and beyond. No travel restrictions.</span>
        </p>
      </div>

      {/* Mobile-only theme toggle */}
      <div className="footer-theme-toggle" style={{ borderTop: `1px solid ${DS.border}`, padding: "20px clamp(16px, 4vw, 32px)", justifyContent: "center", alignItems: "center", gap: 12 }}>
        <span style={{ fontFamily: "'DM Sans'", fontSize: 10, color: DS.gold, textTransform: "uppercase", letterSpacing: "0.15em" }}>Theme</span>
        <button onClick={() => setMode("dark")} aria-label="Dark mode" style={{
          width: 40, height: 40, cursor: "pointer", background: "transparent",
          border: `1px solid ${theme === "dark" ? DS.gold : DS.border}`,
          color: theme === "dark" ? DS.gold : DS.textSec,
          display: "flex", alignItems: "center", justifyContent: "center", transition: "all 0.3s",
        }}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" /></svg>
        </button>
        <button onClick={() => setMode("light")} aria-label="Light mode" style={{
          width: 40, height: 40, cursor: "pointer", background: "transparent",
          border: `1px solid ${theme === "light" ? DS.gold : DS.border}`,
          color: theme === "light" ? DS.gold : DS.textSec,
          display: "flex", alignItems: "center", justifyContent: "center", transition: "all 0.3s",
        }}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="4" /><path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41" /></svg>
        </button>
      </div>

      <div style={{ borderTop: `1px solid ${DS.border}`, padding: "20px clamp(16px, 4vw, 32px)" }}>
        <div className="footer-bottom-bar" style={{ maxWidth: 1400, margin: "0 auto", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 12 }}>
          <div style={{ fontFamily: "'DM Sans'", fontSize: 12, color: DS.textSec }}>© 2026 Move Mountains Co. All rights reserved.</div>
          <div style={{ fontFamily: "'Playfair Display', serif", fontSize: 14, color: DS.textSec, opacity: 0.4 }}>Making Moments Since Day One</div>
          <div style={{ display: "flex", gap: 20 }}>
            {[
              { l: "Privacy Policy", h: "/privacy-policy" },
              { l: "Terms & Conditions", h: "/terms-and-condition" },
              { l: "Sitemap", h: "#" },
            ].map((item) => (
              <a key={item.l} href={item.h} style={{ fontFamily: "'DM Sans'", fontSize: 12, color: DS.textSec, textDecoration: "none", transition: "color 0.2s" }}
                onMouseEnter={(e) => e.target.style.color = DS.text} onMouseLeave={(e) => e.target.style.color = DS.textSec}>{item.l}</a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
