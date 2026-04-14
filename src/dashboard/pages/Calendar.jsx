import { useState } from "react";
import { Link } from "react-router-dom";
import { MOCK_BOOKINGS, BOOKING_STATUSES } from "../data/mockBookings";

// Blocked dates (mock — would come from Supabase)
const BLOCKED_DATES = ["2026-05-09", "2026-05-10", "2026-06-06", "2026-07-04", "2026-09-12"];

// Peak season months (May–October)
const PEAK_MONTHS = [4, 5, 6, 7, 8, 9]; // 0-indexed

function getDaysInMonth(year, month) {
  return new Date(year, month + 1, 0).getDate();
}
function getFirstDayOfMonth(year, month) {
  return new Date(year, month, 1).getDay();
}

const MONTH_NAMES = ["January","February","March","April","May","June","July","August","September","October","November","December"];
const DAY_NAMES = ["Sun","Mon","Tue","Wed","Thu","Fri","Sat"];

const STATUS_COLORS = {
  inquiry:   "#5b8dee",
  pending:   "#f0a500",
  confirmed: "#c9a84c",
  completed: "#6ab187",
};

export default function Calendar() {
  const today = new Date("2026-04-13");
  const [viewYear, setViewYear] = useState(today.getFullYear());
  const [viewMonth, setViewMonth] = useState(today.getMonth());

  const goBack = () => {
    if (viewMonth === 0) { setViewYear(y => y - 1); setViewMonth(11); }
    else setViewMonth(m => m - 1);
  };
  const goForward = () => {
    if (viewMonth === 11) { setViewYear(y => y + 1); setViewMonth(0); }
    else setViewMonth(m => m + 1);
  };

  const daysInMonth = getDaysInMonth(viewYear, viewMonth);
  const firstDay = getFirstDayOfMonth(viewYear, viewMonth);
  const isPeak = PEAK_MONTHS.includes(viewMonth);

  // Map bookings to dates
  const bookingsByDate = MOCK_BOOKINGS.reduce((acc, b) => {
    const [y, m, d] = b.weddingDate.split("-").map(Number);
    if (y === viewYear && m - 1 === viewMonth) {
      const day = d;
      if (!acc[day]) acc[day] = [];
      acc[day].push(b);
    }
    return acc;
  }, {});

  const blockedInMonth = BLOCKED_DATES.filter((d) => {
    const [y, m] = d.split("-").map(Number);
    return y === viewYear && m - 1 === viewMonth;
  }).map((d) => parseInt(d.split("-")[2]));

  const todayDay = today.getFullYear() === viewYear && today.getMonth() === viewMonth ? today.getDate() : null;

  // Build grid: leading empty cells + day cells
  const cells = [];
  for (let i = 0; i < firstDay; i++) cells.push(null);
  for (let d = 1; d <= daysInMonth; d++) cells.push(d);

  // Upcoming weddings list (next 60 days)
  const cutoff = new Date(today);
  cutoff.setDate(cutoff.getDate() + 60);
  const upcomingWeddings = MOCK_BOOKINGS
    .filter((b) => {
      const d = new Date(b.weddingDate + "T12:00:00");
      return d >= today && d <= cutoff && b.status !== "cancelled";
    })
    .sort((a, b) => a.weddingDate.localeCompare(b.weddingDate));

  return (
    <>
      <div className="mm-dash__page-header">
        <div>
          <h1 className="mm-dash__page-title">Calendar</h1>
          <p className="mm-dash__page-subtitle">Wedding dates, availability, and blocked days</p>
        </div>
        <div className="mm-dash__page-actions">
          <button className="mm-dash__btn mm-dash__btn--secondary" style={{ fontSize: 12 }}>
            Block a date
          </button>
        </div>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 280px", gap: 16, alignItems: "start" }}>
        {/* Calendar */}
        <div className="mm-dash__card">
          {/* Nav */}
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
            <button onClick={goBack} style={{ background: "none", border: "1px solid var(--dash-border)", color: "var(--dash-text)", borderRadius: "var(--dash-radius-sm)", padding: "6px 12px", cursor: "pointer", fontSize: 14 }}>←</button>
            <div style={{ textAlign: "center" }}>
              <div style={{ fontFamily: "'Playfair Display', serif", fontSize: 20, fontWeight: 400, color: "var(--dash-text)" }}>
                {MONTH_NAMES[viewMonth]} {viewYear}
              </div>
              {isPeak && (
                <div style={{ fontSize: 10, color: "var(--dash-gold)", textTransform: "uppercase", letterSpacing: "0.1em", marginTop: 2, fontWeight: 600 }}>
                  Peak Season
                </div>
              )}
            </div>
            <button onClick={goForward} style={{ background: "none", border: "1px solid var(--dash-border)", color: "var(--dash-text)", borderRadius: "var(--dash-radius-sm)", padding: "6px 12px", cursor: "pointer", fontSize: 14 }}>→</button>
          </div>

          {/* Day labels */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(7, 1fr)", gap: 2, marginBottom: 4 }}>
            {DAY_NAMES.map((d) => (
              <div key={d} style={{ textAlign: "center", fontSize: 10, fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.08em", color: "var(--dash-text-sec)", padding: "4px 0" }}>
                {d}
              </div>
            ))}
          </div>

          {/* Day cells */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(7, 1fr)", gap: 2 }}>
            {cells.map((day, idx) => {
              if (!day) return <div key={`empty-${idx}`} />;

              const isToday = day === todayDay;
              const isBlocked = blockedInMonth.includes(day);
              const bookings = bookingsByDate[day] || [];
              const hasBooking = bookings.length > 0;

              return (
                <div
                  key={day}
                  style={{
                    minHeight: 64, padding: "6px 4px", borderRadius: 6, border: "1px solid",
                    borderColor: isToday ? "var(--dash-gold)" : isBlocked ? "#e05c5c40" : "var(--dash-border)",
                    background: isBlocked ? "#e05c5c08" : hasBooking ? "var(--dash-gold)06" : "var(--dash-surface-alt)",
                    position: "relative", overflow: "hidden",
                  }}
                >
                  <div style={{
                    fontSize: 12, fontWeight: isToday ? 700 : 400,
                    color: isToday ? "var(--dash-gold)" : isBlocked ? "#e05c5c" : "var(--dash-text)",
                    marginBottom: 4, lineHeight: 1,
                  }}>
                    {day}
                  </div>

                  {isBlocked && (
                    <div style={{ fontSize: 9, color: "#e05c5c", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.06em" }}>
                      Blocked
                    </div>
                  )}

                  {bookings.map((b) => (
                    <Link
                      key={b.id}
                      to={`/dashboard/bookings/${b.id}`}
                      title={`${b.clientName} & ${b.partnerName} · ${b.venue}`}
                      style={{
                        display: "block", marginTop: 2, padding: "2px 4px",
                        borderRadius: 3, fontSize: 9, lineHeight: 1.3,
                        background: STATUS_COLORS[b.status] + "22",
                        borderLeft: `2px solid ${STATUS_COLORS[b.status]}`,
                        color: STATUS_COLORS[b.status],
                        textDecoration: "none", fontWeight: 600,
                        overflow: "hidden", whiteSpace: "nowrap", textOverflow: "ellipsis",
                      }}
                    >
                      {b.clientName.split(" ")[0]}
                    </Link>
                  ))}
                </div>
              );
            })}
          </div>

          {/* Legend */}
          <div style={{ display: "flex", gap: 16, marginTop: 16, flexWrap: "wrap" }}>
            {[
              { color: "#c9a84c", label: "Confirmed" },
              { color: "#f0a500", label: "Pending" },
              { color: "#5b8dee", label: "Inquiry" },
              { color: "#6ab187", label: "Completed" },
              { color: "#e05c5c", label: "Blocked" },
            ].map((l) => (
              <div key={l.label} style={{ display: "flex", alignItems: "center", gap: 5 }}>
                <div style={{ width: 10, height: 10, borderRadius: 2, background: l.color }} />
                <span style={{ fontSize: 11, color: "var(--dash-text-sec)" }}>{l.label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Upcoming sidebar */}
        <div>
          <div className="mm-dash__card">
            <h3 style={{ fontSize: 11, fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.1em", color: "var(--dash-gold)", marginBottom: 14 }}>
              Next 60 days
            </h3>
            {upcomingWeddings.length === 0 ? (
              <p style={{ fontSize: 13, color: "var(--dash-text-sec)" }}>No weddings in the next 60 days.</p>
            ) : (
              <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                {upcomingWeddings.map((b) => {
                  const d = new Date(b.weddingDate + "T12:00:00");
                  const daysUntil = Math.ceil((d - today) / (1000 * 60 * 60 * 24));
                  const s = BOOKING_STATUSES[b.status];
                  return (
                    <Link
                      key={b.id}
                      to={`/dashboard/bookings/${b.id}`}
                      style={{ textDecoration: "none", display: "block", padding: "10px 12px", borderRadius: 6, border: "1px solid var(--dash-border)", background: "var(--dash-surface-alt)" }}
                    >
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 4 }}>
                        <div style={{ fontSize: 12, fontWeight: 600, color: "var(--dash-text)", lineHeight: 1.3 }}>
                          {b.clientName.split(" ")[0]} & {b.partnerName.split(" ")[0]}
                        </div>
                        <span style={{ fontSize: 9, fontWeight: 700, color: daysUntil <= 14 ? "#e05c5c" : "var(--dash-gold)", textTransform: "uppercase" }}>
                          {daysUntil}d
                        </span>
                      </div>
                      <div style={{ fontSize: 11, color: "var(--dash-text-sec)" }}>
                        {d.toLocaleDateString("en-US", { month: "short", day: "numeric" })} · {b.packageName}
                      </div>
                      <div style={{ fontSize: 10, color: "var(--dash-text-sec)", marginTop: 2, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                        {b.venue}
                      </div>
                      <div style={{ marginTop: 6 }}>
                        <span style={{ fontSize: 9, fontWeight: 600, padding: "2px 6px", borderRadius: 10, textTransform: "capitalize", color: s?.color, background: s?.bg }}>
                          {s?.label}
                        </span>
                      </div>
                    </Link>
                  );
                })}
              </div>
            )}
          </div>

          {/* Quick stats */}
          <div className="mm-dash__card" style={{ marginTop: 14 }}>
            <h3 style={{ fontSize: 11, fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.1em", color: "var(--dash-gold)", marginBottom: 12 }}>
              {MONTH_NAMES[viewMonth]} at a glance
            </h3>
            {[
              { label: "Weddings this month", value: Object.values(bookingsByDate).flat().length },
              { label: "Blocked days", value: blockedInMonth.length },
              { label: "Open Saturdays", value: (() => {
                let count = 0;
                for (let d = 1; d <= daysInMonth; d++) {
                  const dow = new Date(viewYear, viewMonth, d).getDay();
                  if (dow === 6 && !bookingsByDate[d] && !blockedInMonth.includes(d)) count++;
                }
                return count;
              })() },
            ].map((s) => (
              <div key={s.label} style={{ display: "flex", justifyContent: "space-between", padding: "7px 0", borderBottom: "1px solid var(--dash-border)" }}>
                <span style={{ fontSize: 12, color: "var(--dash-text-sec)" }}>{s.label}</span>
                <span style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 18, color: "var(--dash-text)" }}>{s.value}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
