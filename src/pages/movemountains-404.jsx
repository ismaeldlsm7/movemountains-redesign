import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { TransitionLink } from "../components/PageTransition";

const fontLink =
  "https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@1,400&family=Cormorant+Garamond:ital,wght@1,400;1,500&family=DM+Sans:wght@400;500&family=Bebas+Neue&display=swap";

function FadeIn({ children, delay = 0, y = 24 }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay, ease: [0.25, 0.1, 0.25, 1] }}
    >
      {children}
    </motion.div>
  );
}

export default function NotFound() {
  return (
    <>
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      <link href={fontLink} rel="stylesheet" />

      <div style={{ background: "var(--mm-bg)", minHeight: "100vh", display: "flex", flexDirection: "column" }}>
        <Header />

        <main
          style={{
            flex: 1,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "120px 24px 80px",
          }}
        >
          <div style={{ textAlign: "center", maxWidth: 640 }}>

            {/* 404 number */}
            <FadeIn delay={0}>
              <div
                style={{
                  fontFamily: "'Bebas Neue', sans-serif",
                  fontSize: "clamp(140px, 22vw, 280px)",
                  lineHeight: 0.88,
                  letterSpacing: "0.04em",
                  color: "var(--mm-gold)",
                  opacity: 0.15,
                  userSelect: "none",
                  marginBottom: 0,
                }}
              >
                404
              </div>
            </FadeIn>

            {/* Headline */}
            <FadeIn delay={0.1} y={20}>
              <h1
                style={{
                  fontFamily: "'Cormorant Garamond', serif",
                  fontStyle: "italic",
                  fontWeight: 400,
                  fontSize: "clamp(26px, 4vw, 40px)",
                  color: "var(--mm-text)",
                  margin: "-16px 0 20px",
                  lineHeight: 1.25,
                }}
              >
                This frame didn't make the final cut.
              </h1>
            </FadeIn>

            {/* Body */}
            <FadeIn delay={0.2} y={16}>
              <p
                style={{
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: 15,
                  color: "var(--mm-text-sec)",
                  lineHeight: 1.7,
                  marginBottom: 48,
                }}
              >
                The page you're looking for has moved, was deleted, or never existed.
                Let's get you somewhere beautiful.
              </p>
            </FadeIn>

            {/* CTAs */}
            <FadeIn delay={0.3} y={12}>
              <div
                style={{
                  display: "flex",
                  flexWrap: "wrap",
                  gap: 12,
                  justifyContent: "center",
                }}
              >
                <TransitionLink
                  to="/"
                  style={{
                    fontFamily: "'DM Sans', sans-serif",
                    fontSize: 13,
                    fontWeight: 500,
                    letterSpacing: "0.12em",
                    textTransform: "uppercase",
                    color: "var(--mm-text)",
                    border: "1px solid var(--mm-border)",
                    padding: "13px 28px",
                    textDecoration: "none",
                    transition: "border-color 0.2s, color 0.2s",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = "var(--mm-gold)";
                    e.currentTarget.style.color = "var(--mm-gold)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = "var(--mm-border)";
                    e.currentTarget.style.color = "var(--mm-text)";
                  }}
                >
                  ← Back home
                </TransitionLink>

                <TransitionLink
                  to="/portfolio"
                  style={{
                    fontFamily: "'DM Sans', sans-serif",
                    fontSize: 13,
                    fontWeight: 500,
                    letterSpacing: "0.12em",
                    textTransform: "uppercase",
                    color: "var(--mm-text)",
                    border: "1px solid var(--mm-border)",
                    padding: "13px 28px",
                    textDecoration: "none",
                    transition: "border-color 0.2s, color 0.2s",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = "var(--mm-gold)";
                    e.currentTarget.style.color = "var(--mm-gold)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = "var(--mm-border)";
                    e.currentTarget.style.color = "var(--mm-text)";
                  }}
                >
                  View our work
                </TransitionLink>

                <TransitionLink
                  to="/book"
                  style={{
                    fontFamily: "'DM Sans', sans-serif",
                    fontSize: 13,
                    fontWeight: 500,
                    letterSpacing: "0.12em",
                    textTransform: "uppercase",
                    color: "var(--mm-bg)",
                    background: "var(--mm-gold)",
                    border: "1px solid var(--mm-gold)",
                    padding: "13px 28px",
                    textDecoration: "none",
                    transition: "opacity 0.2s",
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.85")}
                  onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}
                >
                  Book a date
                </TransitionLink>
              </div>
            </FadeIn>

          </div>
        </main>

        <Footer />
      </div>
    </>
  );
}
