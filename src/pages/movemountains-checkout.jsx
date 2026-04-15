import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { DS } from "../components/designSystem";
import {
  PACKAGES, ADD_ONS, formatPrice, calculateRetainer,
  isPaymentPlanEligible, PAYMENT_TERMS,
} from "../data/pricing";

const fontLink = "https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,700;1,400&family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;0,700;1,400;1,500&family=DM+Sans:wght@400;500;600;700&family=Bebas+Neue&display=swap";

/* ── Payment method options ─────────────────────────────────────────── */
const METHODS = [
  { id: "card",   label: "Card",       icon: <CardIcon /> },
  { id: "apple",  label: "Apple Pay",  icon: <AppleIcon /> },
  { id: "google", label: "Google Pay", icon: <GoogleIcon /> },
];

export default function Checkout() {
  const { state } = useLocation();
  const navigate = useNavigate();
  const bookingData = state?.bookingData;

  useEffect(() => {
    if (!bookingData?.selectedPackage) navigate("/book", { replace: true });
  }, []); // eslint-disable-line

  /* ── Derived order values ─────────────────────────────────────────── */
  const pkg = PACKAGES.find((p) => p.id === bookingData?.selectedPackage);
  const selectedAddOns = (bookingData?.selectedAddOns || [])
    .map((id) => ADD_ONS.find((a) => a.id === id))
    .filter(Boolean);
  const extraHours = bookingData?.extraHours || 1;
  const totalCents = pkg
    ? pkg.priceInCents +
      selectedAddOns.reduce(
        (sum, a) => sum + (a.id === "extra-hours" ? a.priceInCents * extraHours : a.priceInCents),
        0
      )
    : 0;
  const retainer = calculateRetainer(totalCents);
  const balance = totalCents - retainer;
  const paymentPlan = isPaymentPlanEligible(totalCents);
  const client = bookingData?.clientData || {};

  const weddingDateFormatted = bookingData?.weddingDate
    ? new Date(bookingData.weddingDate + "T12:00:00").toLocaleDateString("en-US", {
        weekday: "long", month: "long", day: "numeric", year: "numeric",
      })
    : "—";

  const balanceDueDate = bookingData?.weddingDate
    ? (() => {
        const d = new Date(bookingData.weddingDate + "T12:00:00");
        d.setDate(d.getDate() - PAYMENT_TERMS.balanceDueDaysBefore);
        return d.toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" });
      })()
    : "—";

  /* ── Payment state ────────────────────────────────────────────────── */
  const [method, setMethod]           = useState("card");
  const [cardNumber, setCardNumber]   = useState("");
  const [expiry, setExpiry]           = useState("");
  const [cvv, setCvv]                 = useState("");
  const [nameOnCard, setNameOnCard]   = useState("");
  const [focused, setFocused]         = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isDone, setIsDone]           = useState(false);

  const handleCardNumber = (e) => {
    const digits = e.target.value.replace(/\D/g, "").slice(0, 16);
    setCardNumber(digits.replace(/(.{4})/g, "$1 ").trim());
  };

  const handleExpiry = (e) => {
    const raw = e.target.value.replace(/\D/g, "").slice(0, 4);
    setExpiry(raw.length >= 3 ? raw.slice(0, 2) + "/" + raw.slice(2) : raw);
  };

  const handlePay = () => {
    setIsProcessing(true);
    setTimeout(() => {
      setIsDone(true);
      setTimeout(() => navigate("/booking/confirmed"), 900);
    }, 2400);
  };

  const cardBrand = cardNumber.startsWith("4") ? "VISA"
    : cardNumber.startsWith("5") ? "MC"
    : cardNumber.startsWith("3") ? "AMEX"
    : cardNumber.startsWith("6") ? "DISC" : "";

  if (!bookingData?.selectedPackage) return null;

  return (
    <div style={{ background: "#0F0F0F", color: DS.text, minHeight: "100vh" }}>
      <style>{`
        @import url('${fontLink}');
        * { margin: 0; padding: 0; box-sizing: border-box; }
        ::selection { background: ${DS.gold}; color: #0F0F0F; }

        .checkout-grid {
          display: grid;
          grid-template-columns: 44% 56%;
          min-height: 100vh;
        }
        @media (max-width: 860px) {
          .checkout-grid {
            grid-template-columns: 1fr;
          }
          .checkout-left {
            border-right: none !important;
            border-bottom: 1px solid #2A2A2A !important;
            padding: 40px 24px !important;
          }
          .checkout-right {
            padding: 40px 24px !important;
          }
        }

        .pm-tab { transition: background 0.18s, border-color 0.18s, color 0.18s; }
        .pm-tab:hover { border-color: ${DS.gold}66 !important; }

        .checkout-input {
          width: 100%;
          padding: 13px 14px;
          background: #141414;
          border: 1px solid #2A2A2A;
          border-radius: 7px;
          font-family: inherit;
          font-size: 14px;
          color: #F5F0E8;
          outline: none;
          caret-color: ${DS.gold};
          transition: border-color 0.2s, box-shadow 0.2s;
          box-sizing: border-box;
        }
        .checkout-input:focus {
          border-color: ${DS.gold};
          box-shadow: 0 0 0 3px ${DS.gold}18;
        }
        .checkout-input::placeholder { color: #4a4542; }
        .checkout-input.mono {
          font-family: 'Courier New', monospace;
          font-size: 15px;
          letter-spacing: 0.06em;
        }
        .checkout-input:disabled {
          opacity: 0.5;
          cursor: not-allowed;
        }

        .pay-btn {
          width: 100%;
          padding: 18px 32px;
          background: linear-gradient(135deg, ${DS.gold}, ${DS.ember});
          border: none;
          border-radius: 8px;
          cursor: pointer;
          font-family: 'DM Sans', sans-serif;
          font-size: 16px;
          font-weight: 700;
          color: #fff;
          text-transform: uppercase;
          letter-spacing: 0.08em;
          transition: opacity 0.2s, transform 0.15s;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 10px;
        }
        .pay-btn:hover:not(:disabled) { opacity: 0.92; transform: scale(1.01); }
        .pay-btn:active:not(:disabled) { transform: scale(0.99); }
        .pay-btn:disabled { opacity: 0.55; cursor: wait; }

        .apple-pay-btn {
          width: 100%;
          padding: 16px;
          background: #fff;
          border: none;
          border-radius: 8px;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          font-family: -apple-system, 'DM Sans', sans-serif;
          font-size: 17px;
          font-weight: 500;
          color: #000;
          letter-spacing: -0.02em;
          transition: background 0.15s, transform 0.15s;
        }
        .apple-pay-btn:hover { background: #f0f0f0; transform: scale(1.01); }
        .apple-pay-btn:active { transform: scale(0.99); }

        .google-pay-btn {
          width: 100%;
          padding: 15px;
          background: #1a73e8;
          border: none;
          border-radius: 8px;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          font-family: 'Google Sans', 'DM Sans', sans-serif;
          font-size: 15px;
          font-weight: 600;
          color: #fff;
          transition: background 0.15s, transform 0.15s;
        }
        .google-pay-btn:hover { background: #1558b0; transform: scale(1.01); }
        .google-pay-btn:active { transform: scale(0.99); }
      `}</style>

      <div className="checkout-grid">

        {/* ══════════════════════════════════════════════════════════════
            LEFT PANEL — Order Summary
        ══════════════════════════════════════════════════════════════ */}
        <div className="checkout-left" style={{
          background: "#0F0F0F",
          borderRight: "1px solid #1e1e1e",
          padding: "52px 48px",
          display: "flex",
          flexDirection: "column",
          gap: 0,
        }}>
          {/* Brand mark */}
          <div style={{ marginBottom: 48 }}>
            <div style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: 18, fontWeight: 400,
              color: DS.text, letterSpacing: "0.04em",
            }}>
              Move Mountains Co.
            </div>
            <div style={{
              fontFamily: "'DM Sans'", fontSize: 11,
              color: DS.textSec, textTransform: "uppercase",
              letterSpacing: "0.12em", marginTop: 2,
            }}>
              Wedding Photography & Film
            </div>
          </div>

          {/* Section label */}
          <div style={{
            fontFamily: "'DM Sans'", fontSize: 10,
            color: DS.gold, textTransform: "uppercase",
            letterSpacing: "0.14em", fontWeight: 700,
            marginBottom: 20,
          }}>
            Order Summary
          </div>

          {/* Package row */}
          {pkg && (
            <div style={{
              display: "flex", justifyContent: "space-between",
              alignItems: "flex-start",
              paddingBottom: 16, marginBottom: 16,
              borderBottom: "1px solid #1e1e1e",
            }}>
              <div>
                <div style={{
                  fontFamily: "'Playfair Display', serif",
                  fontSize: 19, fontWeight: 400, marginBottom: 4,
                }}>
                  {pkg.name}
                </div>
                <div style={{
                  fontFamily: "'DM Sans'", fontSize: 12,
                  color: DS.textSec, lineHeight: 1.5,
                }}>
                  {pkg.hours} hrs · {pkg.photographers}
                </div>
                {/* Package features preview */}
                <div style={{ marginTop: 8, display: "flex", flexDirection: "column", gap: 3 }}>
                  {pkg.features.filter(f => f.included).slice(0, 3).map((f, i) => (
                    <div key={i} style={{
                      fontFamily: "'DM Sans'", fontSize: 11,
                      color: DS.textSec, display: "flex", alignItems: "center", gap: 6,
                    }}>
                      <span style={{ color: DS.gold, fontSize: 8 }}>✦</span>
                      {f.text}
                    </div>
                  ))}
                </div>
              </div>
              <div style={{
                fontFamily: "'Bebas Neue'", fontSize: 22,
                color: DS.text, flexShrink: 0, marginLeft: 16,
              }}>
                ${formatPrice(pkg.priceInCents)}
              </div>
            </div>
          )}

          {/* Add-ons */}
          {selectedAddOns.length > 0 && (
            <div style={{ marginBottom: 24 }}>
              <div style={{
                fontFamily: "'DM Sans'", fontSize: 10,
                color: DS.textSec, textTransform: "uppercase",
                letterSpacing: "0.12em", marginBottom: 12,
              }}>
                Add-ons
              </div>
              {selectedAddOns.map((addon) => {
                const isExtra = addon.id === "extra-hours";
                const priceCents = isExtra ? addon.priceInCents * extraHours : addon.priceInCents;
                return (
                  <div key={addon.id} style={{
                    display: "flex", justifyContent: "space-between",
                    alignItems: "center", padding: "7px 0",
                    borderBottom: "1px solid #191919",
                  }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                      <span style={{ fontSize: 13, color: DS.gold }}>{addon.icon}</span>
                      <span style={{ fontFamily: "'DM Sans'", fontSize: 13, color: DS.textSec }}>
                        {addon.name}{isExtra ? ` × ${extraHours}` : ""}
                      </span>
                    </div>
                    <span style={{
                      fontFamily: "'DM Sans'", fontSize: 13,
                      color: DS.textSec, flexShrink: 0, marginLeft: 12,
                    }}>
                      ${formatPrice(priceCents)}
                    </span>
                  </div>
                );
              })}
            </div>
          )}

          {/* Pricing breakdown */}
          <div style={{
            background: "#141414",
            borderRadius: 10,
            padding: "20px",
            marginBottom: 24,
          }}>
            <div style={{
              display: "flex", justifyContent: "space-between",
              fontFamily: "'DM Sans'", fontSize: 13,
              paddingBottom: 10, marginBottom: 10,
              borderBottom: "1px solid #1e1e1e",
            }}>
              <span style={{ color: DS.textSec }}>Subtotal</span>
              <span>${formatPrice(totalCents)}</span>
            </div>

            {/* Retainer — highlighted */}
            <div style={{
              display: "flex", justifyContent: "space-between",
              alignItems: "center",
              padding: "10px 12px", margin: "0 -4px",
              background: `${DS.gold}12`,
              borderRadius: 7,
              border: `1px solid ${DS.gold}28`,
              marginBottom: 10,
            }}>
              <div>
                <div style={{
                  fontFamily: "'DM Sans'", fontSize: 11,
                  color: DS.gold, fontWeight: 700,
                  textTransform: "uppercase", letterSpacing: "0.1em",
                }}>
                  Due today
                </div>
                <div style={{
                  fontFamily: "'DM Sans'", fontSize: 11,
                  color: DS.textSec, marginTop: 1,
                }}>
                  30% retainer to secure your date
                </div>
              </div>
              <div style={{
                fontFamily: "'Bebas Neue'", fontSize: 28,
                color: DS.gold, letterSpacing: "0.02em",
              }}>
                ${formatPrice(retainer)}
              </div>
            </div>

            <div style={{
              display: "flex", justifyContent: "space-between",
              fontFamily: "'DM Sans'", fontSize: 12, color: DS.textSec,
            }}>
              <span>Balance due {balanceDueDate}</span>
              <span>${formatPrice(balance)}</span>
            </div>

            {paymentPlan && (
              <div style={{
                marginTop: 10, padding: "10px 12px",
                background: `${DS.gold}08`,
                borderRadius: 6,
                fontFamily: "'DM Sans'", fontSize: 11, color: DS.textSec,
              }}>
                ✦ Qualifies for a <span style={{ color: DS.gold }}>payment plan</span>{" "}
                — 3–4 installments available
              </div>
            )}
          </div>

          {/* Couple + date */}
          {(client.name || client.partnerName || weddingDateFormatted !== "—") && (
            <div style={{
              padding: "16px 0",
              borderTop: "1px solid #1e1e1e",
              marginTop: "auto",
            }}>
              {(client.name || client.partnerName) && (
                <div style={{
                  fontFamily: "'Playfair Display', serif",
                  fontSize: 15, marginBottom: 4,
                  color: DS.textSec,
                }}>
                  {client.name}{client.name && client.partnerName ? " & " : ""}{client.partnerName}
                </div>
              )}
              {weddingDateFormatted !== "—" && (
                <div style={{
                  fontFamily: "'DM Sans'", fontSize: 12,
                  color: DS.textSec,
                }}>
                  {weddingDateFormatted}
                </div>
              )}
              {client.venue && (
                <div style={{
                  fontFamily: "'DM Sans'", fontSize: 11,
                  color: DS.textSec, opacity: 0.6, marginTop: 2,
                }}>
                  {client.venue}
                </div>
              )}
            </div>
          )}

          {/* Trust badges */}
          <div style={{
            display: "flex", alignItems: "center", gap: 16,
            paddingTop: 24, marginTop: "auto",
          }}>
            {["256-bit SSL", "Powered by Stripe", "PCI DSS"].map((badge) => (
              <div key={badge} style={{
                fontFamily: "'DM Sans'", fontSize: 10,
                color: "#3a3a3a", display: "flex",
                alignItems: "center", gap: 4,
              }}>
                <span style={{ fontSize: 9 }}>🔒</span>
                {badge}
              </div>
            ))}
          </div>
        </div>

        {/* ══════════════════════════════════════════════════════════════
            RIGHT PANEL — Payment Form
        ══════════════════════════════════════════════════════════════ */}
        <div className="checkout-right" style={{
          background: "#1a1a1a",
          padding: "52px 48px",
          display: "flex",
          flexDirection: "column",
        }}>
          {/* Back link */}
          <button
            onClick={() => navigate(-1)}
            style={{
              background: "none", border: "none",
              cursor: "pointer", padding: 0,
              fontFamily: "'DM Sans'", fontSize: 12,
              color: DS.textSec,
              display: "flex", alignItems: "center", gap: 6,
              marginBottom: 40,
              alignSelf: "flex-start",
              transition: "color 0.2s",
            }}
            onMouseEnter={(e) => e.currentTarget.style.color = DS.text}
            onMouseLeave={(e) => e.currentTarget.style.color = DS.textSec}
          >
            ← Back to review
          </button>

          <AnimatePresence mode="wait">
            {isDone ? (
              /* ── Success state ──────────────────────────────────── */
              <motion.div
                key="success"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                style={{
                  flex: 1, display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  textAlign: "center", gap: 16,
                }}
              >
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", stiffness: 220, damping: 18, delay: 0.1 }}
                  style={{
                    width: 64, height: 64, borderRadius: "50%",
                    background: `${DS.gold}1e`,
                    border: `1px solid ${DS.gold}44`,
                    display: "flex", alignItems: "center",
                    justifyContent: "center",
                    fontSize: 26, color: DS.gold,
                  }}
                >
                  ✓
                </motion.div>
                <div style={{
                  fontFamily: "'Playfair Display', serif",
                  fontSize: 28, color: DS.gold,
                }}>
                  Payment Confirmed
                </div>
                <div style={{
                  fontFamily: "'DM Sans'", fontSize: 14,
                  color: DS.textSec,
                }}>
                  Taking you to your confirmation…
                </div>
              </motion.div>
            ) : (
              /* ── Payment form ──────────────────────────────────── */
              <motion.div
                key="form"
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.35, ease: [0.25, 0.1, 0.25, 1] }}
                style={{ flex: 1, display: "flex", flexDirection: "column" }}
              >
                {/* Heading */}
                <div style={{ marginBottom: 32 }}>
                  <h1 style={{
                    fontFamily: "'Playfair Display', serif",
                    fontSize: "clamp(24px, 3vw, 32px)",
                    fontWeight: 400, marginBottom: 6,
                  }}>
                    Complete your reservation
                  </h1>
                  <p style={{
                    fontFamily: "'DM Sans'", fontSize: 13,
                    color: DS.textSec, lineHeight: 1.5,
                  }}>
                    Paying{" "}
                    <span style={{ color: DS.gold, fontWeight: 600 }}>
                      ${formatPrice(retainer)} today
                    </span>{" "}
                    secures your date. Balance of ${formatPrice(balance)} due by {balanceDueDate}.
                  </p>
                </div>

                {/* Payment method tabs */}
                <div style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(3, 1fr)",
                  gap: 8,
                  marginBottom: 28,
                }}>
                  {METHODS.map((m) => (
                    <button
                      key={m.id}
                      className="pm-tab"
                      onClick={() => setMethod(m.id)}
                      style={{
                        padding: "11px 8px",
                        background: method === m.id ? `${DS.gold}14` : "#141414",
                        border: `1px solid ${method === m.id ? DS.gold : "#2a2a2a"}`,
                        borderRadius: 8,
                        cursor: "pointer",
                        display: "flex", flexDirection: "column",
                        alignItems: "center", gap: 5,
                        transition: "all 0.18s",
                      }}
                    >
                      <span style={{ color: method === m.id ? DS.gold : DS.textSec, fontSize: 18, lineHeight: 1 }}>
                        {m.icon}
                      </span>
                      <span style={{
                        fontFamily: "'DM Sans'", fontSize: 11,
                        color: method === m.id ? DS.gold : DS.textSec,
                        fontWeight: method === m.id ? 600 : 400,
                        letterSpacing: "0.03em",
                      }}>
                        {m.label}
                      </span>
                    </button>
                  ))}
                </div>

                {/* Form body */}
                <AnimatePresence mode="wait">
                  {method === "card" && (
                    <motion.div
                      key="card-form"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -6 }}
                      transition={{ duration: 0.22 }}
                      style={{ display: "flex", flexDirection: "column", gap: 14, flex: 1 }}
                    >
                      {/* Card number */}
                      <div>
                        <label style={labelStyle}>Card number</label>
                        <div style={{ position: "relative" }}>
                          <input
                            type="text"
                            inputMode="numeric"
                            placeholder="1234 5678 9012 3456"
                            value={cardNumber}
                            onChange={handleCardNumber}
                            className="checkout-input mono"
                            disabled={isProcessing}
                            style={{ paddingRight: 54 }}
                          />
                          {cardBrand && (
                            <span style={{
                              position: "absolute", right: 12,
                              top: "50%", transform: "translateY(-50%)",
                              fontFamily: "'DM Sans'", fontSize: 10,
                              color: DS.gold, fontWeight: 700,
                              letterSpacing: "0.08em",
                            }}>
                              {cardBrand}
                            </span>
                          )}
                        </div>
                      </div>

                      {/* Expiry + CVV */}
                      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
                        <div>
                          <label style={labelStyle}>Expiry</label>
                          <input
                            type="text"
                            inputMode="numeric"
                            placeholder="MM / YY"
                            value={expiry}
                            onChange={handleExpiry}
                            className="checkout-input mono"
                            disabled={isProcessing}
                          />
                        </div>
                        <div>
                          <label style={labelStyle}>Security code</label>
                          <input
                            type="text"
                            inputMode="numeric"
                            placeholder="CVV"
                            maxLength={4}
                            value={cvv}
                            onChange={(e) => setCvv(e.target.value.replace(/\D/g, "").slice(0, 4))}
                            className="checkout-input mono"
                            disabled={isProcessing}
                          />
                        </div>
                      </div>

                      {/* Name */}
                      <div>
                        <label style={labelStyle}>Name on card</label>
                        <input
                          type="text"
                          placeholder="Full name as it appears on card"
                          value={nameOnCard}
                          onChange={(e) => setNameOnCard(e.target.value)}
                          className="checkout-input"
                          disabled={isProcessing}
                        />
                      </div>

                      <div style={{ flex: 1 }} />

                      <PayButton
                        retainer={retainer}
                        isProcessing={isProcessing}
                        onPay={handlePay}
                      />
                    </motion.div>
                  )}

                  {method === "apple" && (
                    <motion.div
                      key="apple-form"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -6 }}
                      transition={{ duration: 0.22 }}
                      style={{ display: "flex", flexDirection: "column", gap: 16 }}
                    >
                      <p style={{
                        fontFamily: "'DM Sans'", fontSize: 13,
                        color: DS.textSec, lineHeight: 1.6,
                      }}>
                        Pay quickly and securely using Face ID, Touch ID, or your device passcode.
                        No card details to type.
                      </p>
                      <button
                        className="apple-pay-btn"
                        onClick={handlePay}
                        disabled={isProcessing}
                        style={{ opacity: isProcessing ? 0.6 : 1, cursor: isProcessing ? "wait" : "pointer" }}
                      >
                        {isProcessing ? (
                          <>
                            <Spinner dark />
                            Processing…
                          </>
                        ) : (
                          <>
                            <span style={{ fontSize: 20, lineHeight: 1 }}>🍎</span>
                            <span>Pay with Apple Pay</span>
                            <span style={{ fontFamily: "'Bebas Neue'", fontSize: 16, marginLeft: 4 }}>
                              ${formatPrice(retainer)}
                            </span>
                          </>
                        )}
                      </button>
                      <ApplePayBadge />
                    </motion.div>
                  )}

                  {method === "google" && (
                    <motion.div
                      key="google-form"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -6 }}
                      transition={{ duration: 0.22 }}
                      style={{ display: "flex", flexDirection: "column", gap: 16 }}
                    >
                      <p style={{
                        fontFamily: "'DM Sans'", fontSize: 13,
                        color: DS.textSec, lineHeight: 1.6,
                      }}>
                        Pay with the card saved in your Google account. Fast, secure, no manual entry.
                      </p>
                      <button
                        className="google-pay-btn"
                        onClick={handlePay}
                        disabled={isProcessing}
                        style={{ opacity: isProcessing ? 0.6 : 1, cursor: isProcessing ? "wait" : "pointer" }}
                      >
                        {isProcessing ? (
                          <>
                            <Spinner />
                            Processing…
                          </>
                        ) : (
                          <>
                            <span style={{ fontSize: 17, fontWeight: 700, letterSpacing: "-0.02em" }}>
                              <span style={{ color: "#4285F4" }}>G</span>
                              <span style={{ color: "#EA4335" }}>o</span>
                              <span style={{ color: "#FBBC04" }}>o</span>
                              <span style={{ color: "#4285F4" }}>g</span>
                              <span style={{ color: "#34A853" }}>l</span>
                              <span style={{ color: "#EA4335" }}>e</span>
                            </span>
                            <span>Pay</span>
                            <span style={{ fontFamily: "'DM Sans'", fontWeight: 700, marginLeft: 4 }}>
                              ${formatPrice(retainer)}
                            </span>
                          </>
                        )}
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Trust footer */}
                <div style={{
                  display: "flex", alignItems: "center", justifyContent: "center",
                  gap: 8, marginTop: 24, paddingTop: 20,
                  borderTop: "1px solid #232323",
                }}>
                  <span style={{ fontSize: 12 }}>🔒</span>
                  <span style={{
                    fontFamily: "'DM Sans'", fontSize: 11,
                    color: DS.textSec,
                  }}>
                    Secure 256-bit SSL encryption
                  </span>
                  <span style={{ color: "#333" }}>·</span>
                  <div style={{
                    padding: "3px 8px",
                    background: "#635BFF1a",
                    border: "1px solid #635BFF33",
                    borderRadius: 4,
                    fontFamily: "'DM Sans'", fontSize: 10,
                    color: "#7c75ff", fontWeight: 700,
                    letterSpacing: "0.04em",
                  }}>
                    stripe
                  </div>
                  <span style={{ color: "#333" }}>·</span>
                  <span style={{
                    fontFamily: "'DM Sans'", fontSize: 11,
                    color: DS.textSec,
                  }}>
                    PCI DSS compliant
                  </span>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}

/* ── Shared sub-components ─────────────────────────────────────────── */

function PayButton({ retainer, isProcessing, onPay }) {
  return (
    <button className="pay-btn" onClick={onPay} disabled={isProcessing}>
      {isProcessing ? (
        <>
          <Spinner />
          Processing…
        </>
      ) : (
        `Pay $${formatPrice(retainer)} & Confirm Reservation`
      )}
    </button>
  );
}

function Spinner({ dark = false }) {
  return (
    <motion.span
      animate={{ rotate: 360 }}
      transition={{ duration: 0.75, repeat: Infinity, ease: "linear" }}
      style={{
        display: "inline-block", width: 14, height: 14, flexShrink: 0,
        border: `2px solid ${dark ? "rgba(0,0,0,0.2)" : "rgba(255,255,255,0.25)"}`,
        borderTopColor: dark ? "#000" : "#fff",
        borderRadius: "50%",
      }}
    />
  );
}

function ApplePayBadge() {
  return (
    <div style={{
      padding: "10px 14px",
      background: "#141414",
      borderRadius: 8,
      border: "1px solid #222",
      fontFamily: "'DM Sans'", fontSize: 11,
      color: "#5a5a5a", lineHeight: 1.6,
    }}>
      🔒 Apple Pay uses{" "}
      <span style={{ color: "#888" }}>device-based authentication</span>{" "}
      — your card number is never shared with us.
    </div>
  );
}

const labelStyle = {
  display: "block",
  fontFamily: "'DM Sans'",
  fontSize: 11,
  color: "#6a6560",
  textTransform: "uppercase",
  letterSpacing: "0.1em",
  fontWeight: 600,
  marginBottom: 7,
};

/* ── SVG / Icon components ─────────────────────────────────────────── */

function CardIcon() {
  return (
    <svg width="20" height="16" viewBox="0 0 20 16" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="0.5" y="0.5" width="19" height="15" rx="2.5" stroke="currentColor" strokeOpacity="0.7"/>
      <rect x="0" y="4" width="20" height="3.5" fill="currentColor" fillOpacity="0.35"/>
      <rect x="3" y="10" width="5" height="2" rx="1" fill="currentColor" fillOpacity="0.6"/>
      <rect x="11" y="10" width="3" height="2" rx="1" fill="currentColor" fillOpacity="0.4"/>
    </svg>
  );
}

function AppleIcon() {
  return (
    <svg width="16" height="20" viewBox="0 0 814 1000" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
      <path d="M788.1 340.9c-5.8 4.5-108.2 62.2-108.2 190.5 0 148.4 130.3 200.9 134.2 202.2-.6 3.2-20.7 71.9-68.7 141.9-42.8 61.6-87.5 123.1-155.5 123.1s-85.5-39.5-164-39.5c-76 0-103.7 40.8-165.9 40.8s-105-57.8-155.5-127.4C46 376.7 0 249.4 0 128.7c0-79.7 33.4-153.3 87.1-207C139.8 68.6 214 0 327.8 0c87 0 155.7 57.2 206.5 57.2 48.4 0 125.9-60.9 222.8-60.9zM614.5 77.1c-14.6 51.4-57.4 127.3-115.2 165.2-12.4 8.5-50.4 31.5-85.4 31.5-10 0-18.6-1.8-27-5.3v-5.5c0-117.9 90.5-205.5 206.2-205.5 8 0 18.8.5 21.4 5.3z"/>
    </svg>
  );
}

function GoogleIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
      <path d="M44.5 20H24v8.5h11.8C34.7 33.9 30.1 37 24 37c-7.2 0-13-5.8-13-13s5.8-13 13-13c3.1 0 5.9 1.1 8.1 2.9l6.4-6.4C34.6 4.1 29.6 2 24 2 11.8 2 2 11.8 2 24s9.8 22 22 22c11 0 21-8 21-22 0-1.3-.2-2.7-.5-4z" fill="currentColor" fillOpacity="0.9"/>
    </svg>
  );
}
