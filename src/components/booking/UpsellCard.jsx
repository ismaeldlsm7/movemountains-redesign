import { motion } from "framer-motion";
import { DS } from "../designSystem";

/**
 * Order bump card shown in Step 6 above the payment form.
 * Two states: pending (default) and accepted (confirmed).
 * Declined state is handled by the parent unmounting this component
 * via AnimatePresence, which triggers the exit animation.
 *
 * Props:
 *   offer       — upsell offer object from upsells.js
 *   isAccepted  — boolean, controlled by parent
 *   onAccept()  — parent handles state update + finalBookingData mutation
 *   onDecline() — parent sets upsellDeclined=true which unmounts this card
 */
export default function UpsellCard({ offer, isAccepted, onAccept, onDecline }) {
  if (!offer) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -16, transition: { duration: 0.28 } }}
      transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
      style={{ marginBottom: 20 }}
    >
      {isAccepted ? (
        /* ── Accepted state ─────────────────────────────────── */
        <motion.div
          initial={{ opacity: 0, scale: 0.97 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          style={{
            padding: "16px 20px",
            background: `${DS.gold}0d`,
            border: `1px solid ${DS.gold}44`,
            borderLeft: `3px solid ${DS.gold}`,
            borderRadius: 10,
            display: "flex",
            alignItems: "center",
            gap: 14,
          }}
        >
          <span style={{
            width: 28, height: 28, borderRadius: "50%",
            background: `${DS.gold}22`, display: "flex",
            alignItems: "center", justifyContent: "center",
            color: DS.gold, fontSize: 14, flexShrink: 0,
          }}>✓</span>
          <div>
            <div style={{
              fontFamily: "'DM Sans'", fontSize: 14, fontWeight: 600,
              color: DS.gold, marginBottom: 2,
            }}>
              {offer.subhead} added
            </div>
            <div style={{
              fontFamily: "'DM Sans'", fontSize: 12, color: DS.textSec,
            }}>
              Your total has been updated below
            </div>
          </div>
        </motion.div>
      ) : (
        /* ── Pending state ──────────────────────────────────── */
        <div style={{
          padding: "24px 24px 20px",
          background: DS.surface,
          border: `1px solid ${DS.gold}33`,
          borderLeft: `3px solid ${DS.gold}`,
          borderRadius: 10,
          position: "relative",
          overflow: "hidden",
        }}>
          {/* Subtle glow in top-right corner */}
          <div style={{
            position: "absolute", top: -40, right: -40,
            width: 120, height: 120, borderRadius: "50%",
            background: `${DS.gold}08`, pointerEvents: "none",
          }} />

          {/* Badge */}
          <div style={{
            display: "inline-flex", alignItems: "center", gap: 6,
            padding: "3px 10px",
            background: `${DS.gold}18`,
            borderRadius: 20,
            fontFamily: "'DM Sans'", fontSize: 10,
            color: DS.gold, fontWeight: 600,
            textTransform: "uppercase", letterSpacing: "0.1em",
            marginBottom: 14,
          }}>
            <span style={{ fontSize: 8 }}>✦</span>
            {offer.badge}
          </div>

          {/* Icon + Headline */}
          <div style={{ display: "flex", alignItems: "flex-start", gap: 16, marginBottom: 12 }}>
            <span style={{
              fontSize: 28, lineHeight: 1, color: DS.gold,
              flexShrink: 0, marginTop: 2,
            }}>
              {offer.icon}
            </span>
            <div>
              <div style={{
                fontFamily: "'Playfair Display', serif",
                fontSize: "clamp(17px, 2.5vw, 21px)",
                fontWeight: 400, marginBottom: 2,
                color: DS.text,
              }}>
                {offer.headline}
              </div>
              <div style={{
                fontFamily: "'DM Sans'", fontSize: 12,
                color: DS.gold, fontWeight: 600,
                textTransform: "uppercase", letterSpacing: "0.08em",
              }}>
                {offer.subhead}
              </div>
            </div>
          </div>

          {/* Pitch */}
          <p style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: 16, color: DS.textSec,
            lineHeight: 1.65, marginBottom: 20,
            paddingLeft: 44,
          }}>
            {offer.pitch}
          </p>

          {/* Price + CTA */}
          <div style={{
            paddingLeft: 44,
            display: "flex", flexDirection: "column", gap: 10,
          }}>
            {/* Accept button */}
            <motion.button
              onClick={onAccept}
              whileHover={{ scale: 1.015 }}
              whileTap={{ scale: 0.985 }}
              style={{
                width: "100%",
                padding: "13px 24px",
                background: `linear-gradient(135deg, ${DS.gold}ee, ${DS.gold}bb)`,
                border: "none", borderRadius: 7,
                cursor: "pointer",
                fontFamily: "'DM Sans'", fontSize: 14, fontWeight: 700,
                color: "#0e0c0a",
                display: "flex", alignItems: "center", justifyContent: "space-between",
              }}
            >
              <span>{offer.cta}</span>
              <span style={{
                fontFamily: "'Bebas Neue'", fontSize: 18,
                letterSpacing: "0.03em",
              }}>
                +${offer.displayPrice}
              </span>
            </motion.button>

            {/* Decline link */}
            <button
              onClick={onDecline}
              style={{
                background: "none", border: "none",
                cursor: "pointer", padding: "4px 0",
                fontFamily: "'DM Sans'", fontSize: 12,
                color: DS.textSec, textDecoration: "underline",
                textDecorationColor: `${DS.textSec}44`,
                textAlign: "left",
                transition: "color 0.2s",
              }}
              onMouseEnter={(e) => e.target.style.color = DS.text}
              onMouseLeave={(e) => e.target.style.color = DS.textSec}
            >
              {offer.decline}
            </button>
          </div>
        </div>
      )}
    </motion.div>
  );
}
