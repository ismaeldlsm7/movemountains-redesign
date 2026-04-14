import { Link } from "react-router-dom";
import { MOCK_BOOKINGS, formatBookingDate, formatCents } from "../data/mockBookings";

/* ── Derive payment records from bookings ───────────────────────── */
const payments = MOCK_BOOKINGS.flatMap((b) => {
  const rows = [];
  if (b.retainerPaidAt) {
    rows.push({
      id: `${b.id}-retainer`,
      bookingId: b.id,
      couple: `${b.clientName} & ${b.partnerName}`,
      type: "Retainer",
      amountCents: b.retainerCents,
      date: b.retainerPaidAt,
      status: "paid",
      method: "Stripe",
    });
  }
  // Balance: paid if completed, overdue if due date passed, upcoming otherwise
  const today = "2026-04-13";
  const balanceStatus = b.status === "completed" ? "paid" : b.balanceDueDate < today ? "overdue" : "upcoming";
  rows.push({
    id: `${b.id}-balance`,
    bookingId: b.id,
    couple: `${b.clientName} & ${b.partnerName}`,
    type: "Balance",
    amountCents: b.balanceCents,
    date: b.balanceDueDate,
    status: balanceStatus,
    method: balanceStatus === "paid" ? "Stripe" : "—",
  });
  return rows;
}).sort((a, b) => b.date.localeCompare(a.date));

const PAYMENT_STATUS = {
  paid:     { label: "Paid",     color: "#6ab187", bg: "#6ab18718" },
  upcoming: { label: "Upcoming", color: "#5b8dee", bg: "#5b8dee18" },
  overdue:  { label: "Overdue",  color: "#e05c5c", bg: "#e05c5c18" },
};

/* ── Revenue metrics ─────────────────────────────────────────────── */
const paidPayments = payments.filter((p) => p.status === "paid");
const totalRevenueCents = paidPayments.reduce((s, p) => s + p.amountCents, 0);
const upcomingCents = payments.filter((p) => p.status === "upcoming").reduce((s, p) => s + p.amountCents, 0);
const overdueCents  = payments.filter((p) => p.status === "overdue").reduce((s, p) => s + p.amountCents, 0);

export default function Payments() {
  return (
    <>
      <div className="mm-dash__page-header">
        <div>
          <h1 className="mm-dash__page-title">Payments</h1>
          <p className="mm-dash__page-subtitle">Revenue tracking · all payment activity</p>
        </div>
        <div className="mm-dash__page-actions">
          <button className="mm-dash__btn mm-dash__btn--secondary">Export CSV</button>
          <button className="mm-dash__btn mm-dash__btn--primary">Send invoice</button>
        </div>
      </div>

      {/* Summary cards */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 16, marginBottom: 24 }}>
        {[
          { label: "Total collected", value: formatCents(totalRevenueCents), sub: `${paidPayments.length} payments`, accent: true },
          { label: "Upcoming", value: formatCents(upcomingCents), sub: `${payments.filter(p => p.status === "upcoming").length} payments` },
          { label: "Overdue", value: formatCents(overdueCents), sub: `${payments.filter(p => p.status === "overdue").length} payments`, warn: overdueCents > 0 },
          { label: "Avg package value", value: formatCents(Math.round(MOCK_BOOKINGS.reduce((s, b) => s + b.totalCents, 0) / MOCK_BOOKINGS.length)), sub: "across all bookings" },
        ].map((m) => (
          <div key={m.label} className="mm-dash__card" style={{ padding: "20px 24px" }}>
            <div style={{ fontSize: 11, fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.1em", color: "var(--dash-text-sec)", marginBottom: 8 }}>
              {m.label}
            </div>
            <div style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 32, lineHeight: 1, color: m.warn ? "#e05c5c" : m.accent ? "var(--dash-gold)" : "var(--dash-text)" }}>
              {m.value}
            </div>
            <div style={{ fontSize: 11, color: "var(--dash-text-sec)", marginTop: 6 }}>{m.sub}</div>
          </div>
        ))}
      </div>

      {/* Overdue alert */}
      {overdueCents > 0 && (
        <div style={{
          padding: "12px 16px", borderRadius: "var(--dash-radius-sm)", marginBottom: 16,
          background: "#e05c5c10", border: "1px solid #e05c5c30",
          fontSize: 13, color: "#e05c5c", display: "flex", alignItems: "center", gap: 8,
        }}>
          <span style={{ fontWeight: 700 }}>⚠</span>
          {payments.filter(p => p.status === "overdue").length} balance payment{payments.filter(p => p.status === "overdue").length > 1 ? "s are" : " is"} overdue — send reminders from each booking.
        </div>
      )}

      {/* Payments table */}
      <div className="mm-dash__card" style={{ padding: 0, overflow: "hidden" }}>
        <div style={{ overflowX: "auto" }}>
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead>
              <tr style={{ borderBottom: "1px solid var(--dash-border)" }}>
                {["Couple", "Type", "Amount", "Date", "Method", "Status", ""].map((h) => (
                  <th key={h} style={{
                    padding: "12px 16px", textAlign: "left", fontSize: 11,
                    fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.1em",
                    color: "var(--dash-text-sec)", whiteSpace: "nowrap",
                  }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {payments.map((p) => {
                const s = PAYMENT_STATUS[p.status];
                return (
                  <tr key={p.id} style={{ borderBottom: "1px solid var(--dash-border)" }}
                    onMouseEnter={(e) => e.currentTarget.style.background = "var(--dash-surface-alt)"}
                    onMouseLeave={(e) => e.currentTarget.style.background = "transparent"}
                  >
                    <td style={{ padding: "12px 16px", fontSize: 13, color: "var(--dash-text)", fontWeight: 500 }}>{p.couple}</td>
                    <td style={{ padding: "12px 16px", fontSize: 12, color: "var(--dash-text-sec)" }}>{p.type}</td>
                    <td style={{ padding: "12px 16px" }}>
                      <span style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 18, color: "var(--dash-text)" }}>
                        {formatCents(p.amountCents)}
                      </span>
                    </td>
                    <td style={{ padding: "12px 16px", fontSize: 13, color: "var(--dash-text-sec)", whiteSpace: "nowrap" }}>
                      {formatBookingDate(p.date)}
                    </td>
                    <td style={{ padding: "12px 16px", fontSize: 12, color: "var(--dash-text-sec)" }}>{p.method}</td>
                    <td style={{ padding: "12px 16px" }}>
                      <span style={{
                        display: "inline-block", padding: "3px 10px", borderRadius: 20,
                        fontSize: 11, fontWeight: 600, color: s?.color, background: s?.bg,
                      }}>
                        {s?.label}
                      </span>
                    </td>
                    <td style={{ padding: "12px 16px" }}>
                      <Link to={`/dashboard/bookings/${p.bookingId}`} style={{ fontSize: 12, color: "var(--dash-gold)", textDecoration: "none" }}>
                        View →
                      </Link>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
