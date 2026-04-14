import { Link } from "react-router-dom";
import MetricCard from "../components/MetricCard";
import {
  headlineMetrics,
  pipelineMetrics,
  revenueSnapshot,
} from "../data/mockMetrics";
import { recentActivity, upcomingDeadlines } from "../data/mockActivity";
import { UPCOMING_BOOKINGS, MOCK_BOOKINGS, formatBookingDate, formatCents, BOOKING_STATUSES } from "../data/mockBookings";

const pendingBookings = MOCK_BOOKINGS.filter((b) => b.status === "pending");
const overduePay = MOCK_BOOKINGS.filter((b) => b.status !== "completed" && b.status !== "cancelled" && b.balanceDueDate < "2026-04-13" && !["inquiry","pending"].includes(b.status));

export default function DashboardHome() {
  return (
    <>
      <div className="mm-dash__page-header">
        <div>
          <h1 className="mm-dash__page-title">Good afternoon, Sean</h1>
          <p className="mm-dash__page-subtitle">
            Here&apos;s what&apos;s moving across the studio this week.
          </p>
        </div>
        <div className="mm-dash__page-actions">
          <Link to="/dashboard/weddings/new" className="mm-dash__btn mm-dash__btn--secondary">
            New wedding
          </Link>
          <Link to="/dashboard/blog/new" className="mm-dash__btn mm-dash__btn--primary">
            New post
          </Link>
        </div>
      </div>

      <div className="mm-dash__metric-grid">
        {headlineMetrics.map((m) => (
          <MetricCard key={m.id} {...m} />
        ))}
      </div>

      <div className="mm-dash__two-col">
        <div className="mm-dash__card">
          <h2 className="mm-dash__card-title">Recent activity</h2>
          <p className="mm-dash__card-sub">Live feed from the studio</p>
          <div className="mm-dash__feed">
            {recentActivity.map((a) => (
              <div key={a.id} className="mm-dash__feed-item">
                <span className="mm-dash__feed-dot" />
                <div className="mm-dash__feed-body">
                  <strong>{a.actor}</strong> {a.action} <strong>{a.target}</strong>
                  <div className="mm-dash__feed-time">{a.timestamp}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
          <div className="mm-dash__card">
            <h2 className="mm-dash__card-title">Upcoming deadlines</h2>
            <p className="mm-dash__card-sub">Next seven days</p>
            {upcomingDeadlines.map((d) => (
              <div key={d.id} className="mm-dash__deadline">
                <div>
                  <div className="mm-dash__deadline-title">{d.title}</div>
                  <div className="mm-dash__deadline-meta">{d.assignee}</div>
                </div>
                <div className={`mm-dash__deadline-due mm-dash__deadline-due--${d.urgency}`}>
                  {d.due}
                </div>
              </div>
            ))}
          </div>

          <div className="mm-dash__card">
            <h2 className="mm-dash__card-title">Revenue snapshot</h2>
            <p className="mm-dash__card-sub">Year-to-date · 2026</p>
            <div style={{ display: "flex", flexDirection: "column", gap: 14, marginTop: 4 }}>
              <SnapshotRow label="YTD Revenue" value={revenueSnapshot.ytd} highlight />
              <SnapshotRow label="Pipeline" value={revenueSnapshot.pipeline} />
              <SnapshotRow label="Booked this month" value={revenueSnapshot.bookedThisMonth} />
              <SnapshotRow label="Average package" value={revenueSnapshot.avgPackage} />
            </div>
          </div>
        </div>
      </div>

      <div className="mm-dash__card" style={{ marginTop: 4 }}>
        <h2 className="mm-dash__card-title">Pipeline at a glance</h2>
        <p className="mm-dash__card-sub">Studio throughput · updated live</p>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
            gap: 12,
            marginTop: 8,
          }}
        >
          {pipelineMetrics.map((p) => (
            <div
              key={p.id}
              style={{
                border: "1px solid var(--dash-border)",
                borderRadius: "var(--dash-radius-sm)",
                padding: "16px 18px",
                background: "var(--dash-surface-alt)",
              }}
            >
              <div
                style={{
                  fontSize: 11,
                  letterSpacing: "0.14em",
                  textTransform: "uppercase",
                  color: "var(--dash-text-sec)",
                  fontWeight: 600,
                  marginBottom: 6,
                }}
              >
                {p.label}
              </div>
              <div
                style={{
                  fontFamily: "'Bebas Neue', sans-serif",
                  fontSize: 34,
                  color: "var(--dash-text)",
                  lineHeight: 1,
                }}
              >
                {p.value}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Business widgets row */}
      <div className="mm-dash__two-col" style={{ marginTop: 4 }}>
        {/* Upcoming weddings */}
        <div className="mm-dash__card">
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 4 }}>
            <h2 className="mm-dash__card-title">Upcoming weddings</h2>
            <Link to="/dashboard/bookings" style={{ fontSize: 11, color: "var(--dash-gold)", textDecoration: "none" }}>View all →</Link>
          </div>
          <p className="mm-dash__card-sub">Next confirmed bookings</p>
          <div style={{ marginTop: 12, display: "flex", flexDirection: "column", gap: 10 }}>
            {UPCOMING_BOOKINGS.slice(0, 5).map((b) => {
              const s = BOOKING_STATUSES[b.status];
              const daysUntil = Math.ceil((new Date(b.weddingDate + "T12:00:00") - new Date("2026-04-13")) / 86400000);
              return (
                <Link key={b.id} to={`/dashboard/bookings/${b.id}`} style={{ textDecoration: "none", display: "flex", justifyContent: "space-between", alignItems: "center", padding: "8px 10px", borderRadius: 6, border: "1px solid var(--dash-border)", background: "var(--dash-surface-alt)" }}>
                  <div>
                    <div style={{ fontSize: 13, fontWeight: 600, color: "var(--dash-text)" }}>{b.clientName.split(" ")[0]} & {b.partnerName.split(" ")[0]}</div>
                    <div style={{ fontSize: 11, color: "var(--dash-text-sec)", marginTop: 2 }}>{formatBookingDate(b.weddingDate)} · {b.packageName}</div>
                  </div>
                  <div style={{ textAlign: "right" }}>
                    <div style={{ fontSize: 11, fontWeight: 700, color: daysUntil <= 14 ? "#e05c5c" : "var(--dash-gold)" }}>{daysUntil}d</div>
                    <span style={{ fontSize: 9, fontWeight: 600, padding: "1px 6px", borderRadius: 10, color: s?.color, background: s?.bg, textTransform: "capitalize" }}>{s?.label}</span>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>

        {/* Action items */}
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          {/* Pending contracts */}
          <div className="mm-dash__card">
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 4 }}>
              <h2 className="mm-dash__card-title">Pending action</h2>
              <Link to="/dashboard/bookings" style={{ fontSize: 11, color: "var(--dash-gold)", textDecoration: "none" }}>View all →</Link>
            </div>
            <p className="mm-dash__card-sub">Bookings awaiting signature or payment</p>
            <div style={{ marginTop: 12, display: "flex", flexDirection: "column", gap: 8 }}>
              {pendingBookings.map((b) => (
                <Link key={b.id} to={`/dashboard/bookings/${b.id}`} style={{ textDecoration: "none", display: "flex", justifyContent: "space-between", alignItems: "center", padding: "8px 10px", borderRadius: 6, border: "1px solid #f0a50030", background: "#f0a50008" }}>
                  <div>
                    <div style={{ fontSize: 12, fontWeight: 600, color: "var(--dash-text)" }}>{b.clientName.split(" ")[0]} & {b.partnerName.split(" ")[0]}</div>
                    <div style={{ fontSize: 11, color: "var(--dash-text-sec)" }}>Contract pending · {formatBookingDate(b.weddingDate)}</div>
                  </div>
                  <span style={{ fontSize: 12, fontWeight: 700, color: "#f0a500" }}>{formatCents(b.retainerCents)}</span>
                </Link>
              ))}
              {overduePay.map((b) => (
                <Link key={b.id + "-od"} to={`/dashboard/bookings/${b.id}`} style={{ textDecoration: "none", display: "flex", justifyContent: "space-between", alignItems: "center", padding: "8px 10px", borderRadius: 6, border: "1px solid #e05c5c30", background: "#e05c5c08" }}>
                  <div>
                    <div style={{ fontSize: 12, fontWeight: 600, color: "var(--dash-text)" }}>{b.clientName.split(" ")[0]} & {b.partnerName.split(" ")[0]}</div>
                    <div style={{ fontSize: 11, color: "#e05c5c" }}>Balance overdue</div>
                  </div>
                  <span style={{ fontSize: 12, fontWeight: 700, color: "#e05c5c" }}>{formatCents(b.balanceCents)}</span>
                </Link>
              ))}
              {pendingBookings.length === 0 && overduePay.length === 0 && (
                <div style={{ fontSize: 13, color: "var(--dash-text-sec)", padding: "8px 0" }}>All clear — nothing pending.</div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

function SnapshotRow({ label, value, highlight }) {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "baseline",
        paddingBottom: 10,
        borderBottom: "1px solid var(--dash-border)",
      }}
    >
      <span style={{ fontSize: 12, color: "var(--dash-text-sec)", letterSpacing: "0.04em" }}>
        {label}
      </span>
      <span
        style={{
          fontFamily: "'Bebas Neue', sans-serif",
          fontSize: highlight ? 24 : 18,
          color: highlight ? "var(--dash-gold)" : "var(--dash-text)",
          lineHeight: 1,
        }}
      >
        {value}
      </span>
    </div>
  );
}
