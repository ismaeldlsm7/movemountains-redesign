import { useState } from "react";
import { Link } from "react-router-dom";
import { MOCK_BOOKINGS, BOOKING_STATUSES, formatBookingDate, formatCents } from "../data/mockBookings";
import { IconSearch, IconPlus } from "../components/Icons";

const STATUS_FILTERS = ["all", "inquiry", "pending", "confirmed", "completed", "cancelled"];

const PACKAGE_LABELS = {
  essentials: "Essentials",
  signature: "Signature",
  cinematic: "Cinematic",
};

export default function Bookings() {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [packageFilter, setPackageFilter] = useState("all");

  const filtered = MOCK_BOOKINGS.filter((b) => {
    const q = search.toLowerCase();
    const matchesSearch =
      !q ||
      b.clientName.toLowerCase().includes(q) ||
      b.partnerName.toLowerCase().includes(q) ||
      b.venue.toLowerCase().includes(q) ||
      b.email.toLowerCase().includes(q);
    const matchesStatus = statusFilter === "all" || b.status === statusFilter;
    const matchesPkg = packageFilter === "all" || b.packageId === packageFilter;
    return matchesSearch && matchesStatus && matchesPkg;
  }).sort((a, b) => a.weddingDate.localeCompare(b.weddingDate));

  const counts = STATUS_FILTERS.slice(1).reduce((acc, s) => {
    acc[s] = MOCK_BOOKINGS.filter((b) => b.status === s).length;
    return acc;
  }, {});

  return (
    <>
      <div className="mm-dash__page-header">
        <div>
          <h1 className="mm-dash__page-title">Bookings</h1>
          <p className="mm-dash__page-subtitle">
            {MOCK_BOOKINGS.length} total · {counts.confirmed} confirmed · {counts.pending} pending
          </p>
        </div>
        <div className="mm-dash__page-actions">
          <button className="mm-dash__btn mm-dash__btn--primary" style={{ display: "flex", alignItems: "center", gap: 6 }}>
            <IconPlus width={14} height={14} /> New booking
          </button>
        </div>
      </div>

      {/* Filters row */}
      <div style={{ display: "flex", gap: 12, marginBottom: 20, flexWrap: "wrap", alignItems: "center" }}>
        {/* Search */}
        <div style={{ position: "relative", flex: "1 1 220px", maxWidth: 320 }}>
          <IconSearch style={{ position: "absolute", left: 12, top: "50%", transform: "translateY(-50%)", color: "var(--dash-text-sec)", pointerEvents: "none" }} />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search clients, venue…"
            style={{
              width: "100%", padding: "9px 12px 9px 36px",
              background: "var(--dash-surface-alt)", border: "1px solid var(--dash-border)",
              borderRadius: "var(--dash-radius-sm)", color: "var(--dash-text)",
              fontFamily: "inherit", fontSize: 13, outline: "none",
            }}
          />
        </div>

        {/* Status pills */}
        <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
          {STATUS_FILTERS.map((s) => (
            <button
              key={s}
              onClick={() => setStatusFilter(s)}
              style={{
                padding: "6px 14px", borderRadius: 20, border: "1px solid",
                fontFamily: "inherit", fontSize: 12, fontWeight: 500, cursor: "pointer",
                textTransform: "capitalize", transition: "all 0.15s",
                borderColor: statusFilter === s ? "var(--dash-gold)" : "var(--dash-border)",
                background: statusFilter === s ? "var(--dash-gold)" : "transparent",
                color: statusFilter === s ? "var(--dash-bg)" : "var(--dash-text-sec)",
              }}
            >
              {s === "all" ? `All (${MOCK_BOOKINGS.length})` : `${BOOKING_STATUSES[s]?.label} (${counts[s] || 0})`}
            </button>
          ))}
        </div>

        {/* Package filter */}
        <select
          value={packageFilter}
          onChange={(e) => setPackageFilter(e.target.value)}
          style={{
            padding: "8px 12px", background: "var(--dash-surface-alt)",
            border: "1px solid var(--dash-border)", borderRadius: "var(--dash-radius-sm)",
            color: "var(--dash-text)", fontFamily: "inherit", fontSize: 12, cursor: "pointer",
          }}
        >
          <option value="all">All packages</option>
          <option value="essentials">Essentials</option>
          <option value="signature">Signature</option>
          <option value="cinematic">Cinematic</option>
        </select>
      </div>

      {/* Table */}
      <div className="mm-dash__card" style={{ padding: 0, overflow: "hidden" }}>
        <div style={{ overflowX: "auto" }}>
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead>
              <tr style={{ borderBottom: "1px solid var(--dash-border)" }}>
                {["Couple", "Date", "Venue", "Package", "Total", "Status", ""].map((h) => (
                  <th key={h} style={{
                    padding: "12px 16px", textAlign: "left",
                    fontSize: 11, fontWeight: 600, textTransform: "uppercase",
                    letterSpacing: "0.1em", color: "var(--dash-text-sec)",
                    whiteSpace: "nowrap",
                  }}>
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.length === 0 ? (
                <tr>
                  <td colSpan={7} style={{ padding: "40px 16px", textAlign: "center", color: "var(--dash-text-sec)", fontSize: 14 }}>
                    No bookings match your filters.
                  </td>
                </tr>
              ) : (
                filtered.map((b) => {
                  const status = BOOKING_STATUSES[b.status];
                  const isUpcoming = b.weddingDate >= "2026-04-13" && b.weddingDate <= "2026-04-27";
                  return (
                    <tr
                      key={b.id}
                      style={{
                        borderBottom: "1px solid var(--dash-border)",
                        background: isUpcoming ? "var(--dash-gold)04" : "transparent",
                        transition: "background 0.15s",
                      }}
                      onMouseEnter={(e) => e.currentTarget.style.background = "var(--dash-surface-alt)"}
                      onMouseLeave={(e) => e.currentTarget.style.background = isUpcoming ? "var(--dash-gold)04" : "transparent"}
                    >
                      <td style={{ padding: "14px 16px" }}>
                        <div style={{ fontWeight: 600, fontSize: 13, color: "var(--dash-text)" }}>
                          {b.clientName}
                        </div>
                        <div style={{ fontSize: 11, color: "var(--dash-text-sec)", marginTop: 2 }}>
                          & {b.partnerName}
                        </div>
                      </td>
                      <td style={{ padding: "14px 16px", fontSize: 13, color: "var(--dash-text)", whiteSpace: "nowrap" }}>
                        {formatBookingDate(b.weddingDate)}
                        {isUpcoming && (
                          <div style={{ fontSize: 10, color: "var(--dash-gold)", fontWeight: 600, marginTop: 2, textTransform: "uppercase", letterSpacing: "0.08em" }}>
                            Soon
                          </div>
                        )}
                      </td>
                      <td style={{ padding: "14px 16px", fontSize: 13, color: "var(--dash-text-sec)", maxWidth: 160 }}>
                        <div style={{ overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                          {b.venue}
                        </div>
                      </td>
                      <td style={{ padding: "14px 16px" }}>
                        <span style={{
                          fontSize: 11, fontWeight: 600, padding: "3px 10px", borderRadius: 4,
                          background: "var(--dash-surface-alt)", color: "var(--dash-gold)",
                          border: "1px solid var(--dash-border)", textTransform: "uppercase",
                          letterSpacing: "0.06em", whiteSpace: "nowrap",
                        }}>
                          {PACKAGE_LABELS[b.packageId]}
                        </span>
                      </td>
                      <td style={{ padding: "14px 16px", whiteSpace: "nowrap" }}>
                        <div style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 18, color: "var(--dash-text)", lineHeight: 1 }}>
                          {formatCents(b.totalCents)}
                        </div>
                        <div style={{ fontSize: 11, color: "var(--dash-text-sec)", marginTop: 2 }}>
                          {b.retainerPaidAt ? `Retainer paid` : `Retainer due`}
                        </div>
                      </td>
                      <td style={{ padding: "14px 16px" }}>
                        <span style={{
                          display: "inline-block", padding: "4px 10px", borderRadius: 20,
                          fontSize: 11, fontWeight: 600, textTransform: "capitalize",
                          color: status?.color, background: status?.bg,
                        }}>
                          {status?.label}
                        </span>
                      </td>
                      <td style={{ padding: "14px 16px" }}>
                        <Link
                          to={`/dashboard/bookings/${b.id}`}
                          style={{
                            fontSize: 12, color: "var(--dash-gold)", textDecoration: "none",
                            fontWeight: 500, whiteSpace: "nowrap",
                          }}
                        >
                          View →
                        </Link>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>

      <div style={{ marginTop: 12, fontSize: 12, color: "var(--dash-text-sec)" }}>
        {filtered.length} of {MOCK_BOOKINGS.length} bookings
      </div>
    </>
  );
}
