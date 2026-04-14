import { useRef } from "react";
import { motion, useInView } from "framer-motion";

/* ── Design tokens ─────────────────────────────────────────────────── */
const DS = {
  bg: "var(--mm-bg)",
  surface: "var(--mm-surface)",
  surfaceAlt: "var(--mm-surface-alt)",
  text: "var(--mm-text)",
  textSec: "var(--mm-text-sec)",
  gold: "var(--mm-gold)",
  goldHover: "var(--mm-gold-hover)",
  ember: "var(--mm-ember)",
  border: "var(--mm-border)",
};

/* ── Animation helpers ─────────────────────────────────────────────── */
const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1], delay: i * 0.1 },
  }),
};

function Reveal({ children, delay = 0, style }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  return (
    <motion.div
      ref={ref}
      variants={fadeUp}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      custom={delay}
      style={style}
    >
      {children}
    </motion.div>
  );
}

/* ── Data ──────────────────────────────────────────────────────────── */
const pillars = [
  {
    number: "01",
    title: "Strategy",
    description:
      "We mapped the full digital landscape of Move Mountains Co. — competitors, client expectations, booking journeys — and designed an architecture that positions MMC not just as photographers, but as the definitive luxury studio experience in their market.",
    detail: "27-page sitemap · User journey mapping · Conversion-first architecture",
  },
  {
    number: "02",
    title: "Narrative & Visual Identity",
    description:
      "Every pixel reflects a deliberate brand decision. A dual dark/light theme system, a gold-and-ember color palette, and a typographic hierarchy built on Playfair Display, Cormorant Garamond, and DM Sans — all working together to communicate prestige, warmth, and craft.",
    detail: "Full design system · CSS token architecture · Dark & light mode",
  },
  {
    number: "03",
    title: "Content Production",
    description:
      "We didn't just build a container — we filled it. Nine original blog articles, nine fully written wedding stories, and copy for every page, every section, every call to action. The site is ready to publish, not just ready to design.",
    detail: "9 blog posts · 9 wedding stories · Copy for 27 pages",
  },
  {
    number: "04",
    title: "Development",
    description:
      "Built on React 19 with a custom animation system that includes a signature diaphragm page transition, 500+ Framer Motion animations, Lenis smooth scroll, Lottie micro-interactions, and a fully responsive layout across every screen size. Production-deployed on Vercel.",
    detail: "React 19 · Framer Motion · Lottie · Smooth scroll · Vercel",
  },
];

const features = [
  { label: "Pages", value: "27", note: "Ready to launch" },
  { label: "Blog Articles", value: "9", note: "Original content" },
  { label: "Wedding Stories", value: "9", note: "Fully written" },
  { label: "Animation hooks", value: "500+", note: "Framer Motion" },
  { label: "Page transitions", value: "Custom", note: "Diaphragm overlay" },
  { label: "Theme modes", value: "2", note: "Dark & light, persistent" },
  { label: "Lottie animations", value: "5", note: "Micro-interactions" },
  { label: "Breakpoints", value: "5", note: "Fully responsive" },
];

const investment = [
  { area: "Strategy", amount: "$4,500" },
  { area: "Narrative & Visual Identity", amount: "$7,500" },
  { area: "Content Production", amount: "$5,500" },
  { area: "Development", amount: "$20,000" },
];

/* ── Section wrapper ───────────────────────────────────────────────── */
function Section({ children, bg, style }) {
  return (
    <section style={{ background: bg || DS.bg, ...style }}>
      <div
        style={{
          maxWidth: 1200,
          margin: "0 auto",
          padding: "clamp(80px, 10vw, 140px) clamp(24px, 5vw, 80px)",
        }}
      >
        {children}
      </div>
    </section>
  );
}

function Label({ children }) {
  return (
    <span
      style={{
        fontFamily: "'Bebas Neue', sans-serif",
        fontSize: 13,
        letterSpacing: "0.2em",
        color: DS.gold,
        display: "block",
        marginBottom: 20,
      }}
    >
      {children}
    </span>
  );
}

function GoldLine() {
  return (
    <div
      style={{
        width: 48,
        height: 1,
        background: DS.gold,
        marginBottom: 32,
      }}
    />
  );
}

/* ── Page ──────────────────────────────────────────────────────────── */
export default function Vision() {
  return (
    <div style={{ background: DS.bg, color: DS.text, minHeight: "100vh" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,700;1,400&family=Cormorant+Garamond:ital,wght@0,400;0,600;1,400&family=DM+Sans:wght@400;500;600&family=Bebas+Neue&display=swap');

        .vision-pillar { border-top: 1px solid var(--mm-border); padding: 48px 0; display: grid; grid-template-columns: 80px 1fr 1fr; gap: 40px; align-items: start; }
        .vision-pillar:last-child { border-bottom: 1px solid var(--mm-border); }
        @media (max-width: 768px) {
          .vision-pillar { grid-template-columns: 1fr; gap: 20px; }
        }

        .feature-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 1px; background: var(--mm-border); }
        @media (max-width: 900px) { .feature-grid { grid-template-columns: repeat(2, 1fr); } }
        @media (max-width: 500px) { .feature-grid { grid-template-columns: 1fr; } }

        .invest-row { display: flex; justify-content: space-between; align-items: center; padding: 20px 0; border-bottom: 1px solid var(--mm-border); }
        .invest-row:first-child { border-top: 1px solid var(--mm-border); }

        .cta-btn { display: inline-flex; align-items: center; gap: 10px; padding: 18px 36px; font-family: 'DM Sans', sans-serif; font-size: 14px; font-weight: 600; letter-spacing: 0.05em; cursor: pointer; border: none; transition: all 0.3s ease; text-decoration: none; }
        .cta-primary { background: var(--mm-gold); color: var(--mm-bg); }
        .cta-primary:hover { background: var(--mm-gold-hover); }
        .cta-secondary { background: transparent; color: var(--mm-text); border: 1px solid var(--mm-border); }
        .cta-secondary:hover { border-color: var(--mm-gold); color: var(--mm-gold); }
      `}</style>

      {/* ── 1. HERO ── */}
      <section
        style={{
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-end",
          padding: "clamp(60px, 8vw, 120px) clamp(24px, 5vw, 80px)",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Background text */}
        <div
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            fontFamily: "'Bebas Neue', sans-serif",
            fontSize: "clamp(120px, 20vw, 280px)",
            color: DS.border,
            opacity: 0.3,
            whiteSpace: "nowrap",
            pointerEvents: "none",
            userSelect: "none",
            letterSpacing: "0.05em",
          }}
        >
          MMC
        </div>

        <div style={{ maxWidth: 1200, margin: "0 auto", width: "100%", position: "relative" }}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <Label>A Confidential Proposal</Label>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.76, 0, 0.24, 1], delay: 0.3 }}
            style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: "clamp(48px, 8vw, 110px)",
              fontWeight: 400,
              lineHeight: 1,
              margin: "0 0 32px",
              maxWidth: 900,
            }}
          >
            A New Digital
            <br />
            <em style={{ color: DS.gold }}>Identity</em> for
            <br />
            Move Mountains Co.
          </motion.h1>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.7 }}
            style={{
              display: "flex",
              alignItems: "center",
              gap: 24,
              flexWrap: "wrap",
            }}
          >
            {["Strategy", "Narrative", "Identity", "Development"].map((item, i) => (
              <span key={item} style={{ display: "flex", alignItems: "center", gap: 24 }}>
                <span
                  style={{
                    fontFamily: "'DM Sans', sans-serif",
                    fontSize: 14,
                    color: DS.textSec,
                    letterSpacing: "0.05em",
                  }}
                >
                  {item}
                </span>
                {i < 3 && (
                  <span style={{ width: 4, height: 4, borderRadius: "50%", background: DS.gold, display: "inline-block" }} />
                )}
              </span>
            ))}
          </motion.div>
        </div>

        {/* Scroll hint */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
          style={{
            position: "absolute",
            bottom: 40,
            right: "clamp(24px, 5vw, 80px)",
            fontFamily: "'Bebas Neue', sans-serif",
            fontSize: 11,
            letterSpacing: "0.2em",
            color: DS.textSec,
            writingMode: "vertical-rl",
          }}
        >
          SCROLL
        </motion.div>
      </section>

      {/* ── 2. THE OPPORTUNITY ── */}
      <Section bg={DS.surface}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "clamp(40px, 6vw, 100px)", alignItems: "start" }}>
          <div>
            <Reveal>
              <Label>The Opportunity</Label>
              <GoldLine />
              <h2
                style={{
                  fontFamily: "'Playfair Display', serif",
                  fontSize: "clamp(32px, 4vw, 54px)",
                  fontWeight: 400,
                  lineHeight: 1.15,
                  margin: 0,
                }}
              >
                Your work is world-class.
                <br />
                <em>Your platform should be too.</em>
              </h2>
            </Reveal>
          </div>
          <div>
            <Reveal delay={1}>
              <p
                style={{
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: "clamp(15px, 1.5vw, 17px)",
                  lineHeight: 1.8,
                  color: DS.textSec,
                  margin: "0 0 28px",
                }}
              >
                In the luxury photography market, perception precedes everything. Couples shopping at the $5,000–$15,000 tier aren't just buying coverage — they're buying confidence. They're deciding, in the first thirty seconds on your website, whether you feel like their kind of photographer.
              </p>
              <p
                style={{
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: "clamp(15px, 1.5vw, 17px)",
                  lineHeight: 1.8,
                  color: DS.textSec,
                  margin: 0,
                }}
              >
                Move Mountains Co. has the talent, the portfolio, and the team to compete at the very top of the industry. What it deserves is a digital presence that makes that undeniable — instantly.
              </p>
            </Reveal>
          </div>
        </div>

        {/* Stats bar */}
        <Reveal delay={2}>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(3, 1fr)",
              gap: 1,
              background: DS.border,
              marginTop: "clamp(60px, 8vw, 100px)",
            }}
          >
            {[
              { stat: "72%", note: "of couples choose a vendor based on their website alone" },
              { stat: "8 sec", note: "average time before a visitor decides to stay or leave" },
              { stat: "3×", note: "more inquiries reported after a brand-level site redesign" },
            ].map(({ stat, note }) => (
              <div
                key={stat}
                style={{ background: DS.surface, padding: "clamp(28px, 4vw, 48px)" }}
              >
                <div
                  style={{
                    fontFamily: "'Bebas Neue', sans-serif",
                    fontSize: "clamp(42px, 5vw, 72px)",
                    color: DS.gold,
                    lineHeight: 1,
                    marginBottom: 12,
                  }}
                >
                  {stat}
                </div>
                <div
                  style={{
                    fontFamily: "'DM Sans', sans-serif",
                    fontSize: 14,
                    color: DS.textSec,
                    lineHeight: 1.6,
                  }}
                >
                  {note}
                </div>
              </div>
            ))}
          </div>
        </Reveal>
      </Section>

      {/* ── 3. WHAT WE DID — 4 PILLARS ── */}
      <Section>
        <Reveal>
          <Label>What We Did</Label>
          <GoldLine />
          <h2
            style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: "clamp(32px, 4vw, 54px)",
              fontWeight: 400,
              margin: "0 0 clamp(48px, 6vw, 80px)",
              maxWidth: 600,
              lineHeight: 1.2,
            }}
          >
            A complete engagement,
            <br />
            <em>start to finish.</em>
          </h2>
        </Reveal>

        <div>
          {pillars.map((p, i) => (
            <Reveal key={p.number} delay={i * 0.5}>
              <div className="vision-pillar">
                <div
                  style={{
                    fontFamily: "'Bebas Neue', sans-serif",
                    fontSize: 48,
                    color: DS.border,
                    lineHeight: 1,
                  }}
                >
                  {p.number}
                </div>
                <div>
                  <h3
                    style={{
                      fontFamily: "'Playfair Display', serif",
                      fontSize: "clamp(22px, 2.5vw, 32px)",
                      fontWeight: 400,
                      margin: "0 0 16px",
                    }}
                  >
                    {p.title}
                  </h3>
                  <p
                    style={{
                      fontFamily: "'DM Sans', sans-serif",
                      fontSize: 15,
                      color: DS.textSec,
                      lineHeight: 1.75,
                      margin: 0,
                    }}
                  >
                    {p.description}
                  </p>
                </div>
                <div style={{ paddingTop: 4 }}>
                  <p
                    style={{
                      fontFamily: "'DM Sans', sans-serif",
                      fontSize: 12,
                      color: DS.gold,
                      letterSpacing: "0.05em",
                      lineHeight: 1.8,
                      margin: 0,
                    }}
                  >
                    {p.detail.split(" · ").map((d, j) => (
                      <span key={j}>
                        {d}
                        {j < p.detail.split(" · ").length - 1 && (
                          <>
                            <br />
                          </>
                        )}
                      </span>
                    ))}
                  </p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* ── 4. FEATURE SHOWCASE ── */}
      <Section bg={DS.surfaceAlt}>
        <Reveal>
          <Label>What's Inside</Label>
          <GoldLine />
          <h2
            style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: "clamp(32px, 4vw, 54px)",
              fontWeight: 400,
              margin: "0 0 clamp(48px, 6vw, 80px)",
              lineHeight: 1.2,
            }}
          >
            Built, delivered,
            <br />
            <em>ready to launch.</em>
          </h2>
        </Reveal>

        <Reveal delay={1}>
          <div className="feature-grid">
            {features.map(({ label, value, note }) => (
              <div
                key={label}
                style={{ background: DS.surface, padding: "clamp(24px, 3vw, 40px)" }}
              >
                <div
                  style={{
                    fontFamily: "'Bebas Neue', sans-serif",
                    fontSize: "clamp(36px, 4vw, 56px)",
                    color: DS.text,
                    lineHeight: 1,
                    marginBottom: 8,
                  }}
                >
                  {value}
                </div>
                <div
                  style={{
                    fontFamily: "'DM Sans', sans-serif",
                    fontSize: 13,
                    fontWeight: 600,
                    color: DS.text,
                    marginBottom: 4,
                  }}
                >
                  {label}
                </div>
                <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 12, color: DS.gold }}>
                  {note}
                </div>
              </div>
            ))}
          </div>
        </Reveal>

        {/* Additional qualitative features */}
        <Reveal delay={2}>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
              gap: 16,
              marginTop: 16,
            }}
          >
            {[
              "Multi-step contact & booking form",
              "Portfolio with style-based filtering",
              "Blog with category search",
              "Interactive map with custom dark styling",
              "Newsletter signup with Lottie success state",
              "Services, Academy, Press & Careers pages",
            ].map((feat) => (
              <div
                key={feat}
                style={{
                  background: DS.surface,
                  padding: "20px 24px",
                  display: "flex",
                  alignItems: "center",
                  gap: 12,
                }}
              >
                <div
                  style={{ width: 6, height: 6, borderRadius: "50%", background: DS.gold, flexShrink: 0 }}
                />
                <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 14, color: DS.textSec }}>
                  {feat}
                </span>
              </div>
            ))}
          </div>
        </Reveal>
      </Section>

      {/* ── 5. INVESTMENT ── */}
      <Section>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "clamp(40px, 8vw, 120px)",
            alignItems: "start",
          }}
        >
          <div>
            <Reveal>
              <Label>Investment</Label>
              <GoldLine />
              <h2
                style={{
                  fontFamily: "'Playfair Display', serif",
                  fontSize: "clamp(32px, 4vw, 54px)",
                  fontWeight: 400,
                  lineHeight: 1.15,
                  margin: "0 0 24px",
                }}
              >
                Priced for what
                <br />
                <em>was actually built.</em>
              </h2>
              <p
                style={{
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: 15,
                  color: DS.textSec,
                  lineHeight: 1.75,
                  margin: 0,
                  maxWidth: 420,
                }}
              >
                This wasn't a quote — it was built. Because it was delivered on initiative rather than contract, MMC can move to launch in weeks, not months, and at a fraction of what a typical agency engagement would cost.
              </p>
            </Reveal>
          </div>

          <Reveal delay={1}>
            <div>
              {investment.map(({ area, amount }) => (
                <div key={area} className="invest-row">
                  <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 15, color: DS.textSec }}>
                    {area}
                  </span>
                  <span
                    style={{
                      fontFamily: "'Playfair Display', serif",
                      fontSize: 20,
                      color: DS.text,
                    }}
                  >
                    {amount}
                  </span>
                </div>
              ))}
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  padding: "28px 0 0",
                }}
              >
                <span
                  style={{
                    fontFamily: "'Bebas Neue', sans-serif",
                    fontSize: 14,
                    letterSpacing: "0.15em",
                    color: DS.gold,
                  }}
                >
                  TOTAL INVESTMENT
                </span>
                <span
                  style={{
                    fontFamily: "'Playfair Display', serif",
                    fontSize: "clamp(28px, 3vw, 40px)",
                    color: DS.gold,
                    fontWeight: 700,
                  }}
                >
                  $37,500
                </span>
              </div>
              <p
                style={{
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: 12,
                  color: DS.textSec,
                  marginTop: 12,
                  lineHeight: 1.6,
                }}
              >
                * Comparable agency engagements of this scope typically range between $45,000–$70,000.
              </p>
            </div>
          </Reveal>
        </div>
      </Section>

      {/* ── 6. ROADMAP ── */}
      <Section>
        <Reveal>
          <Label>Beyond Launch</Label>
          <GoldLine />
          <h2
            style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: "clamp(36px, 5vw, 56px)",
              fontWeight: 400,
              lineHeight: 1.1,
              margin: "0 0 24px",
            }}
          >
            What comes{" "}
            <em style={{ color: DS.gold }}>after</em>
          </h2>
          <p
            style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: 16,
              color: DS.textSec,
              lineHeight: 1.75,
              maxWidth: 700,
              margin: "0 0 60px",
            }}
          >
            The site launch is the foundation. The real value compounds over time.
            Here is how the platform evolves — at your pace, on your terms.
          </p>
        </Reveal>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
            gap: 20,
          }}
        >
          {[
            {
              phase: "Phase 1",
              title: "Content Management",
              body: "Every page on the site becomes editable by your team — no developer needed. Blog posts, wedding galleries, team bios, press features, testimonials, and pricing. A full media library, revision history, and draft-to-publish workflow.",
              status: "Included in this proposal",
              highlight: true,
            },
            {
              phase: "Phase 2",
              title: "Studio Operations",
              body: "The dashboard becomes the operational brain of MMC. Wedding pipeline with Kanban view, freelance editor management, assignment workflows, shared calendar, deadline tracking, and a client portal where couples can review and approve their galleries.",
              status: "Next phase",
              highlight: false,
            },
            {
              phase: "Phase 3",
              title: "Integration Hub",
              body: "Your team keeps using the tools they already know — Dubsado, Wipster, Dropbox, Google Calendar, Slack, Stripe — but sees them all connected in one place. No migration, no retraining. Just unified visibility across every platform.",
              status: "Post-launch expansion",
              highlight: false,
            },
            {
              phase: "Phase 4",
              title: "Native Platform",
              body: "Replace external subscriptions with built-in functionality. Native CRM, video review tool, client gallery portal, contract e-signatures, and social scheduling — all custom-built for how MMC works, not a one-size-fits-all product.",
              status: "Long-term vision",
              highlight: false,
            },
          ].map((item, i) => (
            <Reveal key={item.phase} delay={i * 0.5}>
              <div
                style={{
                  background: item.highlight ? DS.surface : DS.surfaceAlt,
                  border: `1px solid ${item.highlight ? DS.gold : DS.border}`,
                  borderRadius: 12,
                  padding: "clamp(28px, 3vw, 40px)",
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                  position: "relative",
                  overflow: "hidden",
                }}
              >
                {item.highlight && (
                  <div
                    style={{
                      position: "absolute",
                      top: 0,
                      left: 0,
                      right: 0,
                      height: 3,
                      background: `linear-gradient(90deg, ${DS.gold}, ${DS.ember})`,
                    }}
                  />
                )}
                <div
                  style={{
                    fontFamily: "'Bebas Neue', sans-serif",
                    fontSize: 12,
                    letterSpacing: "0.2em",
                    color: DS.gold,
                    marginBottom: 10,
                  }}
                >
                  {item.phase}
                </div>
                <h3
                  style={{
                    fontFamily: "'Playfair Display', serif",
                    fontSize: 22,
                    fontWeight: 600,
                    color: DS.text,
                    margin: "0 0 14px",
                    lineHeight: 1.2,
                  }}
                >
                  {item.title}
                </h3>
                <p
                  style={{
                    fontFamily: "'DM Sans', sans-serif",
                    fontSize: 14,
                    color: DS.textSec,
                    lineHeight: 1.7,
                    margin: "0 0 20px",
                    flex: 1,
                  }}
                >
                  {item.body}
                </p>
                <div
                  style={{
                    fontFamily: "'DM Sans', sans-serif",
                    fontSize: 11,
                    fontWeight: 600,
                    letterSpacing: "0.1em",
                    textTransform: "uppercase",
                    color: item.highlight ? DS.gold : DS.textSec,
                    paddingTop: 16,
                    borderTop: `1px solid ${DS.border}`,
                  }}
                >
                  {item.status}
                </div>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal delay={2}>
          <p
            style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: 13,
              color: DS.textSec,
              textAlign: "center",
              marginTop: 40,
              lineHeight: 1.7,
              maxWidth: 600,
              marginLeft: "auto",
              marginRight: "auto",
            }}
          >
            Each phase delivers standalone value. No long-term commitment is required —
            every expansion is a conversation, not a contract. You decide when and if MMC is ready for the next step.
          </p>
        </Reveal>
      </Section>

      {/* ── 7. CTA ── */}
      <Section bg={DS.surface}>
        <div style={{ textAlign: "center", maxWidth: 700, margin: "0 auto" }}>
          <Reveal>
            <Label>Next Steps</Label>
            <GoldLine style={{ margin: "0 auto 32px" }} />
            <h2
              style={{
                fontFamily: "'Playfair Display', serif",
                fontSize: "clamp(36px, 5vw, 72px)",
                fontWeight: 400,
                lineHeight: 1.1,
                margin: "0 0 24px",
              }}
            >
              Ready to make it{" "}
              <em style={{ color: DS.gold }}>yours?</em>
            </h2>
            <p
              style={{
                fontFamily: "'DM Sans', sans-serif",
                fontSize: 16,
                color: DS.textSec,
                lineHeight: 1.75,
                margin: "0 0 48px",
              }}
            >
              The site is built. The brand is defined. The content is written.
              <br />
              All that's missing is your name on it.
            </p>
          </Reveal>

          <Reveal delay={1}>
            <div
              style={{
                display: "flex",
                gap: 16,
                justifyContent: "center",
                flexWrap: "wrap",
              }}
            >
              <a
                href="/"
                target="_blank"
                rel="noopener noreferrer"
                className="cta-btn cta-primary"
              >
                See the Live Preview
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <path d="M3 13L13 3M13 3H7M13 3V9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </a>
              <a
                href="mailto:hello@ismaelmota.com"
                className="cta-btn cta-secondary"
              >
                Schedule a Conversation
              </a>
            </div>
          </Reveal>
        </div>
      </Section>

      {/* ── Footer ── */}
      <div
        style={{
          borderTop: `1px solid ${DS.border}`,
          padding: "32px clamp(24px, 5vw, 80px)",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
          gap: 16,
        }}
      >
        <span
          style={{
            fontFamily: "'Bebas Neue', sans-serif",
            fontSize: 18,
            letterSpacing: "0.1em",
            color: DS.gold,
          }}
        >
          Move Mountains Co.
        </span>
        <span
          style={{
            fontFamily: "'DM Sans', sans-serif",
            fontSize: 12,
            color: DS.textSec,
          }}
        >
          This proposal is confidential and prepared exclusively for Move Mountains Co.
        </span>
      </div>
    </div>
  );
}
