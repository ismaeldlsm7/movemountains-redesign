import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { DS } from "../designSystem";

const DAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const MONTHS = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

// Mock blocked dates (will be replaced with Supabase query)
const MOCK_BLOCKED = [
  "2026-05-16", "2026-06-06", "2026-06-20", "2026-07-11", "2026-08-01",
  "2026-08-22", "2026-09-05", "2026-09-19", "2026-10-03", "2026-10-17",
  "2026-05-23", "2026-06-27", "2026-07-18", "2026-08-15", "2026-09-12",
];

function isPeakSeason(date) {
  const month = date.getMonth();
  const day = date.getDay();
  return month >= 4 && month <= 9 && day === 6; // May–Oct Saturdays
}

function isBlocked(dateStr) {
  return MOCK_BLOCKED.includes(dateStr);
}

function formatDateStr(d) {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${y}-${m}-${day}`;
}

export default function DatePicker({ selectedDate, onSelect }) {
  const today = new Date();
  const minDate = new Date(today.getFullYear(), today.getMonth() + 2, 1); // at least 2 months out
  const [viewMonth, setViewMonth] = useState(minDate.getMonth());
  const [viewYear, setViewYear] = useState(minDate.getFullYear());

  const daysInMonth = new Date(viewYear, viewMonth + 1, 0).getDate();
  const startDay = new Date(viewYear, viewMonth, 1).getDay();

  const cells = useMemo(() => {
    const arr = [];
    for (let i = 0; i < startDay; i++) arr.push(null);
    for (let d = 1; d <= daysInMonth; d++) arr.push(d);
    return arr;
  }, [startDay, daysInMonth]);

  const prevMonth = () => {
    if (viewMonth === 0) { setViewMonth(11); setViewYear(viewYear - 1); }
    else setViewMonth(viewMonth - 1);
  };
  const nextMonth = () => {
    if (viewMonth === 11) { setViewMonth(0); setViewYear(viewYear + 1); }
    else setViewMonth(viewMonth + 1);
  };

  const canGoPrev = viewYear > minDate.getFullYear() || (viewYear === minDate.getFullYear() && viewMonth > minDate.getMonth());

  return (
    <div>
      <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(28px, 4vw, 42px)", fontWeight: 400, marginBottom: 8 }}>
        When's the big day?
      </h2>
      <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 19, color: DS.textSec, marginBottom: 40, lineHeight: 1.6 }}>
        Select your wedding date to check availability. We take only one wedding per day — your team is fully dedicated to you.
      </p>

      <div style={{ maxWidth: 480, margin: "0 auto" }}>
        {/* Month navigation */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 24 }}>
          <button onClick={prevMonth} disabled={!canGoPrev} style={{
            background: "none", border: `1px solid ${DS.border}`, color: canGoPrev ? DS.text : DS.textSec,
            cursor: canGoPrev ? "pointer" : "not-allowed", width: 40, height: 40, borderRadius: "50%",
            display: "flex", alignItems: "center", justifyContent: "center", fontSize: 18, opacity: canGoPrev ? 1 : 0.3,
            transition: "all 0.2s",
          }}>
            ←
          </button>
          <AnimatePresence mode="wait">
            <motion.span key={`${viewMonth}-${viewYear}`} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.2 }}
              style={{ fontFamily: "'Playfair Display', serif", fontSize: 22, fontWeight: 400 }}>
              {MONTHS[viewMonth]} {viewYear}
            </motion.span>
          </AnimatePresence>
          <button onClick={nextMonth} style={{
            background: "none", border: `1px solid ${DS.border}`, color: DS.text,
            cursor: "pointer", width: 40, height: 40, borderRadius: "50%",
            display: "flex", alignItems: "center", justifyContent: "center", fontSize: 18,
            transition: "all 0.2s",
          }}>
            →
          </button>
        </div>

        {/* Day headers */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(7, 1fr)", gap: 4, marginBottom: 8 }}>
          {DAYS.map((d) => (
            <div key={d} style={{
              textAlign: "center", fontFamily: "'DM Sans'", fontSize: 11, color: DS.textSec,
              textTransform: "uppercase", letterSpacing: "0.08em", padding: "8px 0",
            }}>
              {d}
            </div>
          ))}
        </div>

        {/* Calendar grid */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(7, 1fr)", gap: 4 }}>
          {cells.map((day, i) => {
            if (!day) return <div key={`empty-${i}`} />;

            const date = new Date(viewYear, viewMonth, day);
            const dateStr = formatDateStr(date);
            const isPast = date < today;
            const blocked = isBlocked(dateStr);
            const peak = isPeakSeason(date);
            const isSelected = selectedDate === dateStr;
            const disabled = isPast || blocked;

            return (
              <motion.button
                key={dateStr}
                onClick={() => !disabled && onSelect(dateStr)}
                whileHover={!disabled ? { scale: 1.08 } : {}}
                whileTap={!disabled ? { scale: 0.95 } : {}}
                style={{
                  position: "relative",
                  width: "100%", aspectRatio: "1", borderRadius: "50%",
                  border: isSelected ? `2px solid ${DS.gold}` : `1px solid ${disabled ? "transparent" : DS.border}`,
                  background: isSelected ? DS.gold : "transparent",
                  color: isSelected ? DS.bg : disabled ? "var(--mm-text-sec)" : DS.text,
                  cursor: disabled ? "not-allowed" : "pointer",
                  fontFamily: "'DM Sans'", fontSize: 14, fontWeight: isSelected ? 700 : 400,
                  opacity: disabled ? 0.3 : 1,
                  display: "flex", alignItems: "center", justifyContent: "center",
                  textDecoration: blocked ? "line-through" : "none",
                  transition: "border-color 0.2s, background 0.2s",
                }}
              >
                {day}
                {peak && !disabled && !isSelected && (
                  <span style={{
                    position: "absolute", bottom: 4, left: "50%", transform: "translateX(-50%)",
                    width: 4, height: 4, borderRadius: "50%", background: DS.ember,
                  }} />
                )}
              </motion.button>
            );
          })}
        </div>

        {/* Legend */}
        <div style={{ display: "flex", gap: 24, justifyContent: "center", marginTop: 24, flexWrap: "wrap" }}>
          {[
            { color: DS.gold, label: "Selected" },
            { color: DS.ember, label: "Peak Season", dot: true },
            { color: DS.textSec, label: "Unavailable", strikethrough: true },
          ].map((item) => (
            <div key={item.label} style={{ display: "flex", alignItems: "center", gap: 8 }}>
              {item.dot ? (
                <span style={{ width: 6, height: 6, borderRadius: "50%", background: item.color }} />
              ) : (
                <span style={{
                  width: 16, height: 16, borderRadius: "50%",
                  background: item.strikethrough ? "transparent" : item.color,
                  border: item.strikethrough ? `1px solid ${item.color}` : "none",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontSize: 8, color: item.strikethrough ? item.color : DS.bg,
                  textDecoration: item.strikethrough ? "line-through" : "none",
                }}>
                  {item.strikethrough ? "17" : ""}
                </span>
              )}
              <span style={{ fontFamily: "'DM Sans'", fontSize: 12, color: DS.textSec }}>{item.label}</span>
            </div>
          ))}
        </div>

        {/* Selected date display */}
        <AnimatePresence>
          {selectedDate && (
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              style={{
                marginTop: 32, padding: "20px 24px", background: DS.surface,
                border: `1px solid ${DS.gold}33`, borderRadius: 8, textAlign: "center",
              }}
            >
              <div style={{ fontFamily: "'DM Sans'", fontSize: 12, color: DS.gold, textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: 6 }}>
                Your Wedding Date
              </div>
              <div style={{ fontFamily: "'Playfair Display', serif", fontSize: 24, color: DS.text }}>
                {new Date(selectedDate + "T12:00:00").toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric", year: "numeric" })}
              </div>
              {isPeakSeason(new Date(selectedDate + "T12:00:00")) && (
                <div style={{ fontFamily: "'DM Sans'", fontSize: 12, color: DS.ember, marginTop: 8 }}>
                  ✦ Peak season date — book early to secure your team
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
