import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import { DS, navSections, socialLinks } from "./designSystem";

export default function Header({ activePage }) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [hoveredSection, setHoveredSection] = useState(null);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  const closeMenu = () => setMenuOpen(false);

  return (
    <>
      <style>{`
        .fill-up-btn { color: ${DS.ember} !important; background: transparent !important; border: 1px solid ${DS.ember}; transition: color 0.45s cubic-bezier(0.65, 0, 0.35, 1); }
        .fill-up-btn::before {
          content: "";
          position: absolute;
          left: 0; right: 0; bottom: 0;
          height: 100%;
          background: ${DS.ember};
          transform: translateY(100%);
          transition: transform 0.45s cubic-bezier(0.65, 0, 0.35, 1);
          z-index: 0;
        }
        .fill-up-btn:hover::before { transform: translateY(0); }
        .fill-up-btn:hover { color: ${DS.bg} !important; }
        .cta-rollover .cta-char-top { color: ${DS.ember}; }
        .cta-rollover .cta-char-bot { color: #fff; }
        .cta-rollover:hover .cta-char-top { transform: translateY(-120%) !important; }
        .cta-rollover:hover .cta-char-bot { transform: translateY(0) !important; }

        .menu-subs { max-height: 0; opacity: 0; overflow: hidden; transition: max-height 0.3s ease, opacity 0.3s ease; }
        .menu-subs.open { max-height: 400px; opacity: 1; }

        @media (max-width: 900px) {
          .header-cta { display: none !important; }
          .menu-layout { grid-template-columns: 1fr !important; padding: 90px 24px 32px !important; gap: 24px !important; }
          .menu-right { display: none !important; }
          .menu-contact-grid { grid-template-columns: 1fr 1fr !important; }
          .menu-subs { max-height: 400px !important; opacity: 1 !important; }
        }
        @media (max-width: 540px) {
          .menu-layout { padding: 88px 20px 28px !important; }
          .menu-bottom-bar { padding: 14px 20px 18px !important; flex-direction: column !important; gap: 6px !important; text-align: center !important; }
        }
      `}</style>
      <motion.header initial={{ y: -20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.6, delay: 0.2 }}
        style={{
          position: "fixed", top: 0, left: 0, right: 0, zIndex: 110,
          padding: scrolled ? "12px clamp(16px, 4vw, 32px)" : "18px clamp(16px, 4vw, 32px)",
          background: menuOpen ? "transparent" : (scrolled ? "rgba(15,15,15,0.96)" : "transparent"),
          backdropFilter: menuOpen ? "none" : (scrolled ? "blur(16px)" : "none"),
          borderBottom: menuOpen ? "1px solid transparent" : `1px solid ${scrolled ? DS.border : "transparent"}`,
          display: "flex", alignItems: "center", justifyContent: "space-between", transition: "all 0.4s ease",
        }}>
        <Link to="/" style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(18px, 2vw, 22px)", fontWeight: 700, color: DS.text, textDecoration: "none", position: "relative", zIndex: 112 }}>
          Move Mountains <span style={{ color: DS.gold }}>Co.</span>
        </Link>

        <div style={{ display: "flex", alignItems: "center", gap: 20, position: "relative", zIndex: 112 }}>
          <AnimatePresence>
            {!menuOpen && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.2 }}>
                <Link to="/contact" className="header-cta fill-up-btn cta-rollover" style={{
                  fontFamily: "'DM Sans'", fontSize: 11.5, color: DS.bg, background: DS.ember,
                  padding: "9px 20px", textDecoration: "none", letterSpacing: "0.07em", textTransform: "uppercase", fontWeight: 600, display: "inline-block",
                  position: "relative", overflow: "hidden", isolation: "isolate",
                }}>
                  <span style={{ position: "relative", zIndex: 1, display: "inline-flex", lineHeight: 1.2 }}>
                    {"Check Availability".split("").map((ch, ci) => (
                      <span key={ci} className="cta-char" style={{ position: "relative", display: "inline-block", overflow: "hidden", height: "1.2em", verticalAlign: "top" }}>
                        <span className="cta-char-top" style={{ display: "block", transform: "translateY(0)", transition: `transform 0.45s cubic-bezier(0.65,0,0.35,1) ${ci * 0.025}s` }}>{ch === " " ? "\u00A0" : ch}</span>
                        <span aria-hidden="true" className="cta-char-bot" style={{ position: "absolute", left: 0, top: 0, display: "block", transform: "translateY(120%)", transition: `transform 0.45s cubic-bezier(0.65,0,0.35,1) ${ci * 0.025}s` }}>{ch === " " ? "\u00A0" : ch}</span>
                      </span>
                    ))}
                  </span>
                </Link>
              </motion.div>
            )}
          </AnimatePresence>

          <button onClick={() => { setMenuOpen(!menuOpen); setHoveredSection(null); }} aria-label="Toggle menu" style={{
            background: "none", border: "none", cursor: "pointer", padding: 8, width: 40, height: 40,
            display: "flex", alignItems: "center", justifyContent: "center",
          }}>
            <div style={{ width: 26, height: 16, position: "relative" }}>
              <motion.span animate={{ rotate: menuOpen ? 45 : 0, y: menuOpen ? 7 : 0 }} transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
                style={{ position: "absolute", top: 0, left: 0, width: 26, height: 2, background: DS.text }} />
              <motion.span animate={{ opacity: menuOpen ? 0 : 1, scaleX: menuOpen ? 0 : 1 }} transition={{ duration: 0.2 }}
                style={{ position: "absolute", top: 7, right: 0, width: 18, height: 2, background: DS.gold, transformOrigin: "right" }} />
              <motion.span animate={{ rotate: menuOpen ? -45 : 0, y: menuOpen ? -7 : 0 }} transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
                style={{ position: "absolute", bottom: 0, left: 0, width: 26, height: 2, background: DS.text }} />
            </div>
          </button>
        </div>
      </motion.header>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ clipPath: "circle(0% at calc(100% - 52px) 36px)" }}
            animate={{ clipPath: "circle(150% at calc(100% - 52px) 36px)" }}
            exit={{ clipPath: "circle(0% at calc(100% - 52px) 36px)" }}
            transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
            style={{ position: "fixed", inset: 0, zIndex: 105, background: DS.bg, display: "flex", flexDirection: "column", overflowY: "auto" }}>

            <div style={{ flex: 1, display: "grid", gridTemplateColumns: "1.1fr 1fr", maxWidth: 1400, margin: "0 auto", width: "100%", padding: "100px 48px 48px", gap: "clamp(32px, 5vw, 80px)" }} className="menu-layout">

              <div style={{ display: "flex", flexDirection: "column", justifyContent: "center" }}>
                {navSections.map((section, i) => {
                  const isActive = activePage === section.label;
                  return (
                  <motion.div key={section.label} initial={{ opacity: 0, x: -24 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.18 + i * 0.05, duration: 0.45, ease: [0.25, 0.1, 0.25, 1] }}
                    onMouseEnter={() => setHoveredSection(section.label)} onMouseLeave={() => setHoveredSection(null)}>
                    <Link to={section.href} onClick={closeMenu} style={{
                      fontFamily: "'Playfair Display', serif", fontSize: "clamp(32px, 5vw, 56px)", fontWeight: 700,
                      color: isActive ? DS.gold : (hoveredSection && hoveredSection !== section.label ? "rgba(245,240,232,0.18)" : DS.text),
                      textDecoration: "none", display: "flex", alignItems: "center", gap: 16,
                      padding: "clamp(10px, 1.5vw, 16px) 0", borderBottom: `1px solid ${DS.border}`,
                      transition: "color 0.35s, padding-left 0.35s", paddingLeft: hoveredSection === section.label ? 12 : 0,
                      lineHeight: 1.1,
                    }}>
                      <span style={{ display: "inline-flex", lineHeight: 1.1 }}>
                        {section.label.split("").map((ch, ci) => (
                          <span key={ci} style={{ position: "relative", display: "inline-block", overflow: "hidden", verticalAlign: "bottom", lineHeight: 1.1 }}>
                            <span style={{
                              display: "inline-block",
                              transform: hoveredSection === section.label ? "translateY(-100%)" : "translateY(0)",
                              transition: `transform 0.45s cubic-bezier(0.65, 0, 0.35, 1) ${ci * 0.03}s`,
                            }}>{ch === " " ? "\u00A0" : ch}</span>
                            <span aria-hidden="true" style={{
                              position: "absolute", left: 0, top: 0,
                              color: DS.gold, fontStyle: "italic",
                              transform: hoveredSection === section.label ? "translateY(0)" : "translateY(100%)",
                              transition: `transform 0.45s cubic-bezier(0.65, 0, 0.35, 1) ${ci * 0.03}s`,
                            }}>{ch === " " ? "\u00A0" : ch}</span>
                          </span>
                        ))}
                      </span>
                      {hoveredSection === section.label && (
                        <motion.span initial={{ opacity: 0, x: -8 }} animate={{ opacity: 1, x: 0 }} style={{ fontFamily: "'DM Sans'", fontSize: 14, color: DS.gold }}>→</motion.span>
                      )}
                    </Link>

                    {section.subs && (
                      <div className={`menu-subs ${hoveredSection === section.label ? "open" : ""}`}>
                        <div style={{ padding: "8px 0 12px 4px", display: "flex", flexWrap: "wrap", gap: "4px 20px" }}>
                          {section.subs.map((sub) => (
                            <Link key={sub.label} to={sub.href} onClick={closeMenu}
                              style={{ fontFamily: "'DM Sans'", fontSize: 14, color: DS.textSec, textDecoration: "none", padding: "5px 0", transition: "color 0.2s", display: "inline-block" }}
                              onMouseEnter={(e) => e.target.style.color = DS.gold} onMouseLeave={(e) => e.target.style.color = DS.textSec}
                            >{sub.label}</Link>
                          ))}
                        </div>
                      </div>
                    )}
                  </motion.div>
                  );
                })}

                <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.55 }} style={{ marginTop: 28 }}>
                  <Link to="/contact" onClick={closeMenu} className="fill-up-btn cta-rollover" style={{
                    fontFamily: "'DM Sans'", fontSize: 14, fontWeight: 600, color: DS.bg, background: DS.ember,
                    padding: "16px 40px", textDecoration: "none", textTransform: "uppercase", letterSpacing: "0.1em", display: "inline-block",
                    position: "relative", overflow: "hidden", isolation: "isolate",
                  }}>
                    <span style={{ position: "relative", zIndex: 1, display: "inline-flex", lineHeight: 1.2 }}>
                      {"Check Availability".split("").map((ch, ci) => (
                        <span key={ci} className="cta-char" style={{ position: "relative", display: "inline-block", overflow: "hidden", height: "1.2em", verticalAlign: "top" }}>
                          <span className="cta-char-top" style={{ display: "block", transform: "translateY(0)", transition: `transform 0.45s cubic-bezier(0.65,0,0.35,1) ${ci * 0.025}s` }}>{ch === " " ? "\u00A0" : ch}</span>
                          <span aria-hidden="true" className="cta-char-bot" style={{ position: "absolute", left: 0, top: 0, display: "block", transform: "translateY(120%)", transition: `transform 0.45s cubic-bezier(0.65,0,0.35,1) ${ci * 0.025}s` }}>{ch === " " ? "\u00A0" : ch}</span>
                        </span>
                      ))}
                    </span>
                  </Link>
                </motion.div>
              </div>

              <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", gap: 32 }} className="menu-right">
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}>
                  <div style={{ fontFamily: "'DM Sans'", fontSize: 11, color: DS.gold, textTransform: "uppercase", letterSpacing: "0.18em", marginBottom: 14 }}>Latest Story</div>
                  <Link to="/wedding/carey-luke" onClick={closeMenu} style={{ textDecoration: "none", display: "block" }}>
                    <div style={{ aspectRatio: "16/10", background: "#2a2218", marginBottom: 14, display: "flex", alignItems: "center", justifyContent: "center", transition: "opacity 0.3s" }}
                      onMouseEnter={(e) => e.currentTarget.style.opacity = 0.8} onMouseLeave={(e) => e.currentTarget.style.opacity = 1}>
                      <span style={{ fontFamily: "'DM Sans'", fontSize: 11, color: DS.textSec, opacity: 0.2, textTransform: "uppercase", letterSpacing: "0.12em" }}>[ Featured Wedding ]</span>
                    </div>
                    <div style={{ fontFamily: "'Playfair Display', serif", fontSize: 22, fontWeight: 700, color: DS.text }}>Carey & Luke</div>
                    <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 16, color: DS.textSec, fontStyle: "italic", marginTop: 3 }}>Rosecliff Mansion, Newport</div>
                  </Link>
                </motion.div>

                <motion.div initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} transition={{ delay: 0.5, duration: 0.5 }} style={{ height: 1, background: DS.border, transformOrigin: "left" }} />

                <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}>
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }} className="menu-contact-grid">
                    <div>
                      <div style={{ fontFamily: "'DM Sans'", fontSize: 10, color: DS.gold, textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: 6 }}>Email</div>
                      <a href="mailto:info@movemountains.co" style={{ fontFamily: "'DM Sans'", fontSize: 15, color: DS.text, textDecoration: "none" }}>info@movemountains.co</a>
                    </div>
                    <div>
                      <div style={{ fontFamily: "'DM Sans'", fontSize: 10, color: DS.gold, textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: 6 }}>Phone</div>
                      <a href="tel:4016164500" style={{ fontFamily: "'DM Sans'", fontSize: 15, color: DS.text, textDecoration: "none" }}>(401) 616-4500</a>
                    </div>
                    <div>
                      <div style={{ fontFamily: "'DM Sans'", fontSize: 10, color: DS.gold, textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: 6 }}>Studio</div>
                      <div style={{ fontFamily: "'DM Sans'", fontSize: 14, color: DS.textSec }}>28 Wolcott St<br />Providence, RI 02908</div>
                    </div>
                    <div>
                      <div style={{ fontFamily: "'DM Sans'", fontSize: 10, color: DS.gold, textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: 6 }}>Hours</div>
                      <div style={{ fontFamily: "'DM Sans'", fontSize: 14, color: DS.textSec }}>Mon–Fri: 9am–6pm<br />Weekends: By appt.</div>
                    </div>
                  </div>
                </motion.div>

                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6 }}>
                  <div style={{ display: "flex", gap: 10 }}>
                    {socialLinks.map((s) => (
                      <a key={s.abbr} href={s.href} target="_blank" rel="noopener noreferrer" style={{
                        width: 44, height: 44, border: `1px solid ${DS.border}`, display: "flex", flexDirection: "column",
                        alignItems: "center", justifyContent: "center", textDecoration: "none", transition: "all 0.3s", gap: 2,
                      }}
                        onMouseEnter={(e) => e.currentTarget.style.borderColor = DS.gold}
                        onMouseLeave={(e) => e.currentTarget.style.borderColor = DS.border}>
                        <span style={{ fontFamily: "'DM Sans'", fontSize: 12, fontWeight: 600, color: DS.textSec }}>{s.abbr}</span>
                        <span style={{ fontFamily: "'DM Sans'", fontSize: 9, color: DS.textSec, opacity: 0.5 }}>{s.followers}</span>
                      </a>
                    ))}
                  </div>
                </motion.div>
              </div>
            </div>

            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.65 }} className="menu-bottom-bar"
              style={{ padding: "16px 48px 20px", borderTop: `1px solid ${DS.border}`, display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 8 }}>
              <div style={{ fontFamily: "'DM Sans'", fontSize: 11, color: DS.textSec }}>© 2026 Move Mountains Co.</div>
              <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 14, color: DS.textSec, fontStyle: "italic", opacity: 0.5 }}>Making Moments Since Day One</div>
              <div style={{ display: "flex", gap: 16 }}>
                {[{ l: "Privacy", h: "/privacy-policy" }, { l: "Terms", h: "/terms-and-condition" }].map((item) => (
                  <Link key={item.l} to={item.h} onClick={closeMenu} style={{ fontFamily: "'DM Sans'", fontSize: 11, color: DS.textSec, textDecoration: "none", transition: "color 0.2s" }}
                    onMouseEnter={(e) => e.target.style.color = DS.gold} onMouseLeave={(e) => e.target.style.color = DS.textSec}>{item.l}</Link>
                ))}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
