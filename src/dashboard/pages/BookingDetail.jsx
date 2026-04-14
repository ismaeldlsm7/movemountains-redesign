import { useParams, Link } from "react-router-dom";
import { getBookingById, BOOKING_STATUSES, formatBookingDate, formatCents } from "../data/mockBookings";
import { ADD_ONS } from "../../data/pricing";

function Section({ title, children }) {
  return (
    <div className="mm-dash__card" style={{ marginBottom: 16 }}>
      <h3 style={{
        fontSize: 11, fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.1em",
        color: "var(--dash-gold)", marginBottom: 16,
      }}>
        {title}
      </h3>
      {children}
    </div>
  );
}

function Row({ label, value, highlight }) {
  return (
    <div style={{
      display: "flex", justifyContent: "space-between", alignItems: "baseline",
      padding: "8px 0", borderBottom: "1px solid var(--dash-border)",
    }}>
      <span style={{ fontSize: 12, color: "var(--dash-text-sec)" }}>{label}</span>
      <span style={{
        fontSize: highlight ? 16 : 13, fontWeight: highlight ? 700 : 400,
        color: highlight ? "var(--dash-gold)" : "var(--dash-text)",
        fontFamily: highlight ? "'Bebas Neue', sans-serif" : "inherit",
      }}>
        {value}
      </span>
    </div>
  );
}

const PAYMENT_TIMELINE = [
  { key: "retainer", label: "Retainer (30%)", icon: "◎" },
  { key: "balance", label: "Balance", icon: "◉" },
];

export default function BookingDetail() {
  const { id } = useParams();
  const b = getBookingById(id);

  if (!b) {
    return (
      <div style={{ padding: 40, textAlign: "center", color: "var(--dash-text-sec)" }}>
        Booking not found.{" "}
        <Link to="/dashboard/bookings" style={{ color: "var(--dash-gold)" }}>← Back to bookings</Link>
      </div>
    );
  }

  const status = BOOKING_STATUSES[b.status];
  const addOnDetails = (b.addOns || []).map((id) => ADD_ONS.find((a) => a.id === id)).filter(Boolean);

  return (
    <>
      {/* Header */}
      <div style={{ marginBottom: 24 }}>
        <Link to="/dashboard/bookings" style={{ fontSize: 12, color: "var(--dash-text-sec)", textDecoration: "none", display: "inline-flex", alignItems: "center", gap: 4, marginBottom: 16 }}>
          ← All bookings
        </Link>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: 12 }}>
          <div>
            <h1 className="mm-dash__page-title" style={{ marginBottom: 4 }}>
              {b.clientName} <span style={{ color: "var(--dash-gold)" }}>&</span> {b.partnerName}
            </h1>
            <p style={{ fontSize: 14, color: "var(--dash-text-sec)" }}>
              {formatBookingDate(b.weddingDate)} · {b.venue}
            </p>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <span style={{
              padding: "6px 14px", borderRadius: 20, fontSize: 12, fontWeight: 600,
              textTransform: "capitalize", color: status?.color, background: status?.bg,
            }}>
              {status?.label}
            </span>
            <button className="mm-dash__btn mm-dash__btn--secondary" style={{ fontSize: 12 }}>
              Edit
            </button>
          </div>
        </div>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 340px", gap: 16, alignItems: "start" }}>
        {/* Left column */}
        <div>
          {/* Client info */}
          <Section title="Client Information">
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 0 }}>
              <Row label="Client name" value={b.clientName} />
              <Row label="Partner name" value={b.partnerName} />
              <Row label="Email" value={b.email} />
              <Row label="Phone" value={b.phone} />
              <Row label="Guest count" value={b.guestCount} />
              <Row label="Referral" value={b.referral} />
            </div>
          </Section>

          {/* Event info */}
          <Section title="Event Details">
            <Row label="Wedding date" value={formatBookingDate(b.weddingDate)} />
            <Row label="Venue" value={b.venue} />
            <Row label="Package" value={b.packageName} />
            {addOnDetails.length > 0 && (
              <div style={{ paddingTop: 8 }}>
                <div style={{ fontSize: 11, color: "var(--dash-text-sec)", marginBottom: 8 }}>Add-ons</div>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
                  {addOnDetails.map((a) => (
                    <span key={a.id} style={{
                      padding: "4px 10px", borderRadius: 4, fontSize: 11, fontWeight: 500,
                      background: "var(--dash-surface-alt)", border: "1px solid var(--dash-border)",
                      color: "var(--dash-text)",
                    }}>
                      {a.icon} {a.name}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </Section>

          {/* Notes */}
          <Section title="Internal Notes">
            <p style={{ fontSize: 13, color: "var(--dash-text)", lineHeight: 1.6 }}>
              {b.notes || "No notes."}
            </p>
            <button style={{
              marginTop: 12, background: "none", border: "1px solid var(--dash-border)",
              color: "var(--dash-text-sec)", padding: "7px 14px", borderRadius: "var(--dash-radius-sm)",
              fontSize: 12, cursor: "pointer", fontFamily: "inherit",
            }}>
              + Add note
            </button>
          </Section>

          {/* Contract */}
          <Section title="Contract">
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <div>
                <div style={{ fontSize: 13, color: "var(--dash-text)", fontWeight: 500 }}>
                  {b.status === "inquiry" ? "Not yet sent" : b.retainerPaidAt ? "Signed & retainer paid" : "Sent — awaiting signature"}
                </div>
                {b.retainerPaidAt && (
                  <div style={{ fontSize: 11, color: "var(--dash-text-sec)", marginTop: 4 }}>
                    Signed on {formatBookingDate(b.retainerPaidAt)}
                  </div>
                )}
              </div>
              <div style={{ display: "flex", gap: 8 }}>
                {b.retainerPaidAt && (
                  <button className="mm-dash__btn mm-dash__btn--secondary" style={{ fontSize: 12 }}>
                    View PDF
                  </button>
                )}
                {!b.retainerPaidAt && b.status !== "inquiry" && (
                  <button className="mm-dash__btn mm-dash__btn--primary" style={{ fontSize: 12 }}>
                    Send reminder
                  </button>
                )}
              </div>
            </div>
          </Section>
        </div>

        {/* Right column */}
        <div>
          {/* Payment summary */}
          <Section title="Payment Summary">
            <div style={{ textAlign: "center", padding: "16px 0 8px" }}>
              <div style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 40, color: "var(--dash-gold)", lineHeight: 1 }}>
                {formatCents(b.totalCents)}
              </div>
              <div style={{ fontSize: 11, color: "var(--dash-text-sec)", marginTop: 4, textTransform: "uppercase", letterSpacing: "0.08em" }}>
                Total investment
              </div>
            </div>

            <div style={{ marginTop: 16 }}>
              {/* Retainer */}
              <div style={{
                display: "flex", justifyContent: "space-between", alignItems: "center",
                padding: "10px 12px", borderRadius: 6, marginBottom: 8,
                background: b.retainerPaidAt ? "var(--dash-gold)10" : "var(--dash-surface-alt)",
                border: `1px solid ${b.retainerPaidAt ? "var(--dash-gold)30" : "var(--dash-border)"}`,
              }}>
                <div>
                  <div style={{ fontSize: 12, fontWeight: 600, color: "var(--dash-text)" }}>Retainer (30%)</div>
                  <div style={{ fontSize: 11, color: "var(--dash-text-sec)", marginTop: 2 }}>
                    {b.retainerPaidAt ? `Paid ${formatBookingDate(b.retainerPaidAt)}` : "Not yet paid"}
                  </div>
                </div>
                <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: 4 }}>
                  <span style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 20, color: b.retainerPaidAt ? "var(--dash-gold)" : "var(--dash-text)" }}>
                    {formatCents(b.retainerCents)}
                  </span>
                  {b.retainerPaidAt ? (
                    <span style={{ fontSize: 10, color: "#6ab187", fontWeight: 600, textTransform: "uppercase" }}>✓ Paid</span>
                  ) : (
                    <span style={{ fontSize: 10, color: "#f0a500", fontWeight: 600, textTransform: "uppercase" }}>Pending</span>
                  )}
                </div>
              </div>

              {/* Balance */}
              <div style={{
                display: "flex", justifyContent: "space-between", alignItems: "center",
                padding: "10px 12px", borderRadius: 6,
                background: "var(--dash-surface-alt)", border: "1px solid var(--dash-border)",
              }}>
                <div>
                  <div style={{ fontSize: 12, fontWeight: 600, color: "var(--dash-text)" }}>Balance</div>
                  <div style={{ fontSize: 11, color: "var(--dash-text-sec)", marginTop: 2 }}>
                    Due {formatBookingDate(b.balanceDueDate)}
                  </div>
                </div>
                <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: 4 }}>
                  <span style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 20, color: "var(--dash-text)" }}>
                    {formatCents(b.balanceCents)}
                  </span>
                  <span style={{ fontSize: 10, color: "var(--dash-text-sec)", fontWeight: 600, textTransform: "uppercase" }}>
                    {b.status === "completed" ? "✓ Paid" : "Upcoming"}
                  </span>
                </div>
              </div>
            </div>
          </Section>

          {/* Quick actions */}
          <Section title="Actions">
            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              <button className="mm-dash__btn mm-dash__btn--primary" style={{ width: "100%", justifyContent: "center" }}>
                Send invoice
              </button>
              <button className="mm-dash__btn mm-dash__btn--secondary" style={{ width: "100%", justifyContent: "center" }}>
                Email client
              </button>
              <button className="mm-dash__btn mm-dash__btn--secondary" style={{ width: "100%", justifyContent: "center" }}>
                View questionnaire
              </button>
              <button style={{
                width: "100%", padding: "9px 16px", borderRadius: "var(--dash-radius-sm)",
                border: "1px solid #e05c5c30", background: "#e05c5c08",
                color: "#e05c5c", fontFamily: "inherit", fontSize: 13, cursor: "pointer",
              }}>
                Cancel booking
              </button>
            </div>
          </Section>

          {/* Booking meta */}
          <div className="mm-dash__card">
            <Row label="Booking ID" value={b.id} />
            <Row label="Created" value={formatBookingDate(b.createdAt)} />
          </div>
        </div>
      </div>
    </>
  );
}
