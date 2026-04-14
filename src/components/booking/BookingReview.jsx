import { motion } from "framer-motion";
import { DS } from "../designSystem";
import { PACKAGES, ADD_ONS, formatPrice, calculateRetainer, isPaymentPlanEligible, PAYMENT_TERMS } from "../../data/pricing";

export default function BookingReview({ bookingData, onSubmit, isSubmitting }) {
  const pkg = PACKAGES.find((p) => p.id === bookingData.selectedPackage);
  const selectedAddOns = (bookingData.selectedAddOns || []).map((id) => ADD_ONS.find((a) => a.id === id)).filter(Boolean);
  const extraHours = bookingData.extraHours || 1;
  const totalCents = pkg ? pkg.priceInCents + selectedAddOns.reduce((sum, a) => sum + (a.id === "extra-hours" ? a.priceInCents * extraHours : a.priceInCents), 0) : 0;
  const retainer = calculateRetainer(totalCents);
  const balance = totalCents - retainer;
  const paymentPlan = isPaymentPlanEligible(totalCents);
  const client = bookingData.clientData || {};

  const weddingDateFormatted = bookingData.weddingDate
    ? new Date(bookingData.weddingDate + "T12:00:00").toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric", year: "numeric" })
    : "—";

  const balanceDueDate = bookingData.weddingDate
    ? (() => {
        const d = new Date(bookingData.weddingDate + "T12:00:00");
        d.setDate(d.getDate() - PAYMENT_TERMS.balanceDueDaysBefore);
        return d.toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" });
      })()
    : "—";

  return (
    <div>
      <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(28px, 4vw, 42px)", fontWeight: 400, marginBottom: 8, textAlign: "center" }}>
        Everything looks perfect
      </h2>
      <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 19, color: DS.textSec, marginBottom: 48, lineHeight: 1.6, textAlign: "center" }}>
        Review your booking details below, then pay your retainer to secure your date.
      </p>

      <div style={{ maxWidth: 600, margin: "0 auto" }}>
        {/* Couple & Date */}
        <div style={{
          padding: "28px 24px", background: DS.surface, border: `1px solid ${DS.border}`,
          borderRadius: 12, marginBottom: 16, textAlign: "center",
        }}>
          <div style={{ fontFamily: "'Playfair Display', serif", fontSize: 28, marginBottom: 8 }}>
            {client.name || "—"} <span style={{ color: DS.gold }}>&</span> {client.partnerName || "—"}
          </div>
          <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 18, color: DS.textSec }}>
            {weddingDateFormatted}
          </div>
          {client.venue && (
            <div style={{ fontFamily: "'DM Sans'", fontSize: 13, color: DS.textSec, marginTop: 8 }}>
              {client.venue}
            </div>
          )}
        </div>

        {/* Package details */}
        <div style={{
          padding: "24px", background: DS.surface, border: `1px solid ${DS.border}`,
          borderRadius: 12, marginBottom: 16,
        }}>
          <div style={{ fontFamily: "'DM Sans'", fontSize: 11, color: DS.gold, textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: 12 }}>
            Your Package
          </div>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
            <div>
              <div style={{ fontFamily: "'Playfair Display', serif", fontSize: 22 }}>{pkg?.name}</div>
              <div style={{ fontFamily: "'DM Sans'", fontSize: 13, color: DS.textSec }}>{pkg?.hours} hours · {pkg?.photographers}</div>
            </div>
            <div style={{ fontFamily: "'Bebas Neue'", fontSize: 28, color: DS.gold }}>
              ${pkg ? formatPrice(pkg.priceInCents) : "—"}
            </div>
          </div>

          {selectedAddOns.length > 0 && (
            <>
              <div style={{ borderTop: `1px solid ${DS.border}`, paddingTop: 16, marginTop: 8 }}>
                <div style={{ fontFamily: "'DM Sans'", fontSize: 11, color: DS.gold, textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: 12 }}>
                  Add-ons
                </div>
                {selectedAddOns.map((addon) => {
                  const isExtra = addon.id === "extra-hours";
                  return (
                    <div key={addon.id} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "8px 0" }}>
                      <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                        <span style={{ fontSize: 16 }}>{addon.icon}</span>
                        <span style={{ fontFamily: "'DM Sans'", fontSize: 14 }}>
                          {addon.name}{isExtra ? ` × ${extraHours}` : ""}
                        </span>
                      </div>
                      <span style={{ fontFamily: "'DM Sans'", fontSize: 14, color: DS.textSec }}>
                        ${isExtra ? formatPrice(addon.priceInCents * extraHours) : addon.displayPrice}
                      </span>
                    </div>
                  );
                })}
              </div>
            </>
          )}
        </div>

        {/* Payment breakdown */}
        <div style={{
          padding: "24px", background: `${DS.gold}08`, border: `1px solid ${DS.gold}22`,
          borderRadius: 12, marginBottom: 32,
        }}>
          <div style={{ fontFamily: "'DM Sans'", fontSize: 11, color: DS.gold, textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: 16 }}>
            Payment Breakdown
          </div>

          <div style={{ display: "flex", justifyContent: "space-between", padding: "8px 0", fontFamily: "'DM Sans'", fontSize: 14 }}>
            <span style={{ color: DS.textSec }}>Total</span>
            <span style={{ fontWeight: 600 }}>${formatPrice(totalCents)}</span>
          </div>

          <div style={{
            display: "flex", justifyContent: "space-between", padding: "12px 0",
            borderTop: `1px solid ${DS.gold}22`, fontFamily: "'DM Sans'", fontSize: 16, fontWeight: 600,
          }}>
            <span style={{ color: DS.gold }}>Due today (30% retainer)</span>
            <span style={{ color: DS.gold, fontFamily: "'Bebas Neue'", fontSize: 24 }}>${formatPrice(retainer)}</span>
          </div>

          <div style={{ display: "flex", justifyContent: "space-between", padding: "8px 0", fontFamily: "'DM Sans'", fontSize: 14 }}>
            <span style={{ color: DS.textSec }}>Balance due by {balanceDueDate}</span>
            <span>${formatPrice(balance)}</span>
          </div>

          {paymentPlan && (
            <div style={{
              marginTop: 12, padding: "12px 16px", background: `${DS.gold}08`,
              borderRadius: 6, fontFamily: "'DM Sans'", fontSize: 13, color: DS.textSec,
            }}>
              ✦ This package qualifies for a <strong style={{ color: DS.gold }}>payment plan</strong> — split the remaining balance into 3–4 installments.
            </div>
          )}
        </div>

        {/* Contract confirmation */}
        <div style={{
          display: "flex", alignItems: "center", gap: 10, padding: "16px 20px",
          background: DS.surface, borderRadius: 8, marginBottom: 32,
          fontFamily: "'DM Sans'", fontSize: 13, color: DS.textSec,
        }}>
          <span style={{ color: DS.gold, fontSize: 18 }}>✓</span>
          Contract signed and terms accepted
        </div>

        {/* Pay button */}
        <motion.button
          onClick={onSubmit}
          disabled={isSubmitting}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          style={{
            width: "100%", padding: "20px 32px",
            background: `linear-gradient(135deg, ${DS.gold}, ${DS.ember})`,
            border: "none", borderRadius: 8, cursor: isSubmitting ? "wait" : "pointer",
            fontFamily: "'DM Sans'", fontSize: 16, fontWeight: 700,
            color: "#fff", textTransform: "uppercase", letterSpacing: "0.08em",
            opacity: isSubmitting ? 0.7 : 1,
            transition: "opacity 0.2s",
          }}
        >
          {isSubmitting ? "Processing..." : `Pay $${formatPrice(retainer)} & Confirm Reservation`}
        </motion.button>

        <p style={{
          fontFamily: "'DM Sans'", fontSize: 12, color: DS.textSec, textAlign: "center",
          marginTop: 16, lineHeight: 1.6,
        }}>
          You'll be redirected to Stripe's secure checkout to complete your payment.
          <br />Your date is not secured until payment is received.
        </p>
      </div>
    </div>
  );
}
