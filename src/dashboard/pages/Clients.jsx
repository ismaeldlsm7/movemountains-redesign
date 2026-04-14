import { Link } from "react-router-dom";
import { MOCK_BOOKINGS, formatBookingDate, formatCents, BOOKING_STATUSES } from "../data/mockBookings";
import { IconSearch } from "../components/Icons";
import { useState } from "react";

// Derive unique clients from bookings
const clients = MOCK_BOOKINGS.map((b) => ({
  id: b.id,
  name: b.clientName,
  partner: b.partnerName,
  email: b.email,
  phone: b.phone,
  weddingDate: b.weddingDate,
  venue: b.venue,
  packageName: b.packageName,
  totalCents: b.totalCents,
  status: b.status,
  referral: b.referral,
  createdAt: b.createdAt,
  bookingId: b.id,
})).sort((a, b) => a.weddingDate.localeCompare(b.weddingDate));

const REFERRAL_SOURCES = [...new Set(clients.map((c) => c.referral))].sort();

export default function Clients() {
  const [search, setSearch] = useState("");
  const [referralFilter, setReferralFilter] = useState("all");

  const filtered = clients.filter((c) => {
    const q = search.toLowerCase();
    const matchesSearch = !q ||
      c.name.toLowerCase().includes(q) ||
      c.partner.toLowerCase().includes(q) ||
      c.email.toLowerCase().includes(q) ||
      c.venue.toLowerCase().includes(q);
    const matchesReferral = referralFilter === "all" || c.referral === referralFilter;
    return matchesSearch && matchesReferral;
  });

  // Referral breakdown
  const referralCounts = REFERRAL_SOURCES.reduce((acc, r) => {
    acc[r] = clients.filter((c) => c.referral === r).length;
    return acc;
  }, {});

  return (
    <>
      <div className="mm-dash__page-header">
        <div>
          <h1 className="mm-dash__page-title">Clients</h1>
          <p className="mm-dash__page-subtitle">{clients.length} couples · all time</p>
        </div>
      </div>

      {/* Referral breakdown */}
      <div style={{ display: "flex", gap: 12, flexWrap: "wrap", marginBottom: 20 }}>
        {REFERRAL_SOURCES.map((r) => (
          <div key={r} style={{
            padding: "10px 16px", borderRadius: "var(--dash-radius-sm)",
            background: "var(--dash-surface)", border: "1px solid var(--dash-border)",
            minWidth: 90, textAlign: "center",
          }}>
            <div style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 24, color: "var(--dash-gold)", lineHeight: 1 }}>
              {referralCounts[r]}
            </div>
            <div style={{ fontSize: 11, color: "var(--dash-text-sec)", marginTop: 4 }}>{r}</div>
          </div>
        ))}
      </div>

      {/* Filters */}
      <div style={{ display: "flex", gap: 12, marginBottom: 16, flexWrap: "wrap", alignItems: "center" }}>
        <div style={{ position: "relative", flex: "1 1 220px", maxWidth: 320 }}>
          <IconSearch style={{ position: "absolute", left: 12, top: "50%", transform: "translateY(-50%)", color: "var(--dash-text-sec)", pointerEvents: "none" }} />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search clients…"
            style={{
              width: "100%", padding: "9px 12px 9px 36px",
              background: "var(--dash-surface-alt)", border: "1px solid var(--dash-border)",
              borderRadius: "var(--dash-radius-sm)", color: "var(--dash-text)",
              fontFamily: "inherit", fontSize: 13, outline: "none",
            }}
          />
        </div>
        <select
          value={referralFilter}
          onChange={(e) => setReferralFilter(e.target.value)}
          style={{
            padding: "8px 12px", background: "var(--dash-surface-alt)",
            border: "1px solid var(--dash-border)", borderRadius: "var(--dash-radius-sm)",
            color: "var(--dash-text)", fontFamily: "inherit", fontSize: 12, cursor: "pointer",
          }}
        >
          <option value="all">All sources</option>
          {REFERRAL_SOURCES.map((r) => (
            <option key={r} value={r}>{r}</option>
          ))}
        </select>
      </div>

      {/* Client cards */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: 14 }}>
        {filtered.map((c) => {
          const status = BOOKING_STATUSES[c.status];
          return (
            <div key={c.id} className="mm-dash__card" style={{ padding: "20px 22px" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 12 }}>
                <div>
                  <div style={{ fontWeight: 600, fontSize: 14, color: "var(--dash-text)", lineHeight: 1.3 }}>
                    {c.name}
                  </div>
                  <div style={{ fontSize: 12, color: "var(--dash-text-sec)", marginTop: 2 }}>
                    & {c.partner}
                  </div>
                </div>
                <span style={{
                  padding: "3px 10px", borderRadius: 20, fontSize: 10, fontWeight: 600,
                  textTransform: "capitalize", color: status?.color, background: status?.bg,
                  whiteSpace: "nowrap",
                }}>
                  {status?.label}
                </span>
              </div>

              <div style={{ display: "flex", flexDirection: "column", gap: 5, marginBottom: 14 }}>
                <div style={{ fontSize: 12, color: "var(--dash-text-sec)" }}>
                  📅 {formatBookingDate(c.weddingDate)}
                </div>
                <div style={{ fontSize: 12, color: "var(--dash-text-sec)" }}>
                  📍 {c.venue}
                </div>
                <div style={{ fontSize: 12, color: "var(--dash-text-sec)" }}>
                  ✉ {c.email}
                </div>
                <div style={{ fontSize: 12, color: "var(--dash-text-sec)" }}>
                  📱 {c.phone}
                </div>
              </div>

              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", paddingTop: 12, borderTop: "1px solid var(--dash-border)" }}>
                <div>
                  <div style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 20, color: "var(--dash-gold)", lineHeight: 1 }}>
                    {formatCents(c.totalCents)}
                  </div>
                  <div style={{ fontSize: 10, color: "var(--dash-text-sec)", marginTop: 2 }}>{c.packageName} · via {c.referral}</div>
                </div>
                <Link
                  to={`/dashboard/bookings/${c.bookingId}`}
                  style={{
                    fontSize: 12, color: "var(--dash-gold)", textDecoration: "none",
                    padding: "6px 12px", border: "1px solid var(--dash-gold)40",
                    borderRadius: "var(--dash-radius-sm)", fontWeight: 500,
                  }}
                >
                  View booking →
                </Link>
              </div>
            </div>
          );
        })}
      </div>

      {filtered.length === 0 && (
        <div style={{ padding: "40px", textAlign: "center", color: "var(--dash-text-sec)", fontSize: 14 }}>
          No clients match your search.
        </div>
      )}
    </>
  );
}
