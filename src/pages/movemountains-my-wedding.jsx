import { useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { DS } from "../components/designSystem";
import PortalAuth from "../components/my-wedding/PortalAuth";
import PrivateNotes from "../components/my-wedding/PrivateNotes";
import PortalStore from "../components/my-wedding/PortalStore";

const fontLink = "https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,700;1,400&family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;0,700;1,400;1,500&family=DM+Sans:wght@400;500;600;700&family=Bebas+Neue&display=swap";

/* ── Mock booking data ──────────────────────────────────────────── */
const B = {
  clientName: "Emma", partnerName: "James", fullNames: "Emma & James Carter",
  weddingDate: "2026-06-14", venue: "The Rosecliff",
  venueAddress: "548 Bellevue Ave, Newport, RI 02840",
  ceremonyTime: "4:00 PM", packageName: "Signature",
  addOns: ["Super 8 Film"],
  totalCents: 660000, retainerCents: 198000, balanceCents: 462000,
  balanceDueDate: "2026-05-15", retainerPaidAt: "January 8, 2026",
  photographer: "Sean Cummins", photographerPhone: "(401) 555-0100",
  photographerEmail: "sean@movemountains.co", guestCount: "180",
};

const TODAY = new Date("2026-04-13T12:00:00");
const WEDDING = new Date(B.weddingDate + "T12:00:00");
const DAYS_UNTIL = Math.ceil((WEDDING - TODAY) / 86400000);
const IS_AFTER = DAYS_UNTIL < 0;

function fmt(d) {
  return new Date(d + "T12:00:00").toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" });
}
function fmtCents(c) { return "$" + (c / 100).toLocaleString("en-US"); }

/* ── Timeline data ──────────────────────────────────────────────── */
const TIMELINE = [
  { time: "12:00 PM", event: "Getting ready", location: "Vanderbilt by Troon", note: "Coverage starts" },
  { time: "3:30 PM", event: "First look", location: "Rosecliff grounds", note: "Private moment" },
  { time: "4:00 PM", event: "Ceremony", location: "The Rosecliff — Garden", note: "" },
  { time: "5:00 PM", event: "Cocktail hour + portraits", location: "Ocean Terrace", note: "" },
  { time: "6:00 PM", event: "Reception dinner", location: "Rosecliff Ballroom", note: "" },
  { time: "7:00 PM", event: "Toasts & first dances", location: "Ballroom", note: "" },
  { time: "8:30 PM", event: "Open dancing", location: "Ballroom", note: "Super 8 rolls at golden hour" },
  { time: "10:00 PM", event: "Coverage ends", location: "", note: "" },
];

/* ── Checklist ──────────────────────────────────────────────────── */
const INIT_CHECKLIST = [
  { id: "c1", done: true,  label: "Retainer paid & date secured" },
  { id: "c2", done: true,  label: "Contract signed" },
  { id: "c3", done: true,  label: "Engagement session completed" },
  { id: "c4", done: true,  label: "Photo vision questionnaire submitted" },
  { id: "c5", done: false, label: "Video vision questionnaire — due May 1" },
  { id: "c6", done: false, label: "Vendor list submitted" },
  { id: "c7", done: false, label: "Final timeline confirmed" },
  { id: "c8", done: false, label: "Balance paid (due May 15)" },
  { id: "c9", done: false, label: "Pre-wedding call scheduled" },
];

/* ── Nav config ─────────────────────────────────────────────────── */
const NAV = [
  { group: "My Wedding", items: [
    { id: "overview",      label: "Overview",        icon: "◎" },
    { id: "payments",      label: "Payments",        icon: "◇" },
    { id: "timeline",      label: "Timeline",        icon: "◈" },
    { id: "questionnaire", label: "Questionnaire",   icon: "□" },
    { id: "notes",         label: "Private Notes",   icon: "🔒" },
  ]},
  { group: "Deliverables", items: [
    { id: "shop",    label: "Shop",             icon: "◉", badge: "New" },
    { id: "gallery", label: "Gallery Delivery", icon: "▣" },
    { id: "albums",  label: "Albums",           icon: "◳" },
    { id: "contract",label: "Contract",         icon: "△" },
  ]},
];

/* ── Shared primitives ──────────────────────────────────────────── */
function Card({ children, style, gold }) {
  return (
    <div style={{
      padding: "20px 22px", background: DS.surface,
      border: `1px solid ${gold ? DS.gold + "30" : DS.border}`,
      background: gold ? `${DS.gold}05` : DS.surface,
      borderRadius: 10, ...style,
    }}>
      {children}
    </div>
  );
}
function SLabel({ children }) {
  return <div style={{ fontFamily: "'DM Sans'", fontSize: 10, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.14em", color: DS.gold, marginBottom: 12 }}>{children}</div>;
}
function PageTitle({ children, sub }) {
  return (
    <div style={{ marginBottom: 24 }}>
      <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(22px, 3vw, 30px)", fontWeight: 400, color: DS.text, marginBottom: sub ? 6 : 0 }}>{children}</h1>
      {sub && <p style={{ fontFamily: "'DM Sans'", fontSize: 13, color: DS.textSec }}>{sub}</p>}
    </div>
  );
}

/* ══════════════════════════════════════════════════════════════════
   SECTIONS
══════════════════════════════════════════════════════════════════ */

/* ── Overview ───────────────────────────────────────────────────── */
function OverviewSection({ auth, onNav }) {
  const [checklist, setChecklist] = useState(INIT_CHECKLIST);
  const done = checklist.filter((i) => i.done).length;
  const toggle = (id) => setChecklist((p) => p.map((i) => i.id === id ? { ...i, done: !i.done } : i));

  return (
    <div>
      <PageTitle sub={`${B.venue} · ${B.ceremonyTime} · ${fmt(B.weddingDate)}`}>
        {B.fullNames}
      </PageTitle>

      {/* Countdown */}
      <Card gold style={{ textAlign: "center", marginBottom: 16 }}>
        <div style={{ fontFamily: "'DM Sans'", fontSize: 10, textTransform: "uppercase", letterSpacing: "0.14em", color: DS.gold, marginBottom: 12 }}>Days until your wedding</div>
        <div style={{ display: "flex", justifyContent: "center", gap: "clamp(20px, 5vw, 60px)", marginBottom: 12 }}>
          {[
            { v: DAYS_UNTIL, l: "Days" },
            { v: B.guestCount, l: "Guests" },
            { v: B.addOns.length + 1, l: "Services" },
          ].map(({ v, l }) => (
            <div key={l} style={{ textAlign: "center" }}>
              <div style={{ fontFamily: "'Bebas Neue'", fontSize: "clamp(44px, 8vw, 64px)", color: DS.gold, lineHeight: 1 }}>{v}</div>
              <div style={{ fontFamily: "'DM Sans'", fontSize: 10, color: DS.textSec, textTransform: "uppercase", letterSpacing: "0.1em", marginTop: 3 }}>{l}</div>
            </div>
          ))}
        </div>
      </Card>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 14, marginBottom: 14 }}>
        {/* Payment quick-look */}
        <Card>
          <SLabel>Payments</SLabel>
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <span style={{ fontFamily: "'DM Sans'", fontSize: 12, color: DS.textSec }}>Retainer</span>
              <span style={{ fontSize: 11, color: "#6ab187", fontWeight: 700 }}>✓ Paid {fmtCents(B.retainerCents)}</span>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <span style={{ fontFamily: "'DM Sans'", fontSize: 12, color: DS.textSec }}>Balance due May 15</span>
              <span style={{ fontFamily: "'Bebas Neue'", fontSize: 18, color: DS.text }}>{fmtCents(B.balanceCents)}</span>
            </div>
          </div>
          <motion.button onClick={() => onNav("payments")} whileHover={{ x: 2 }} style={{ marginTop: 14, width: "100%", padding: "9px", borderRadius: 6, border: `1px solid ${DS.gold}40`, background: `${DS.gold}08`, color: DS.gold, fontFamily: "'DM Sans'", fontSize: 12, fontWeight: 600, cursor: "pointer", textTransform: "uppercase", letterSpacing: "0.06em" }}>
            Pay balance
          </motion.button>
        </Card>

        {/* Checklist quick-look */}
        <Card>
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 12 }}>
            <SLabel>Checklist</SLabel>
            <span style={{ fontFamily: "'DM Sans'", fontSize: 11, color: DS.textSec }}>{done}/{checklist.length}</span>
          </div>
          <div style={{ height: 3, background: DS.border, borderRadius: 2, marginBottom: 12, overflow: "hidden" }}>
            <motion.div animate={{ width: `${(done / checklist.length) * 100}%` }} style={{ height: "100%", background: `linear-gradient(90deg, ${DS.gold}, ${DS.ember})`, borderRadius: 2 }} />
          </div>
          {checklist.slice(0, 4).map((item) => (
            <div key={item.id} onClick={() => toggle(item.id)} style={{ display: "flex", alignItems: "center", gap: 8, padding: "5px 0", cursor: "pointer", borderBottom: `1px solid ${DS.border}` }}>
              <div style={{ width: 14, height: 14, borderRadius: 3, border: `2px solid ${item.done ? DS.gold : DS.border}`, background: item.done ? DS.gold : "transparent", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, transition: "all 0.15s" }}>
                {item.done && <span style={{ color: DS.bg, fontSize: 9 }}>✓</span>}
              </div>
              <span style={{ fontFamily: "'DM Sans'", fontSize: 11, color: item.done ? DS.textSec : DS.text, textDecoration: item.done ? "line-through" : "none", opacity: item.done ? 0.5 : 1 }}>{item.label}</span>
            </div>
          ))}
          {checklist.length > 4 && (
            <button onClick={() => onNav("questionnaire")} style={{ marginTop: 8, background: "none", border: "none", color: DS.gold, fontFamily: "'DM Sans'", fontSize: 11, cursor: "pointer", textDecoration: "underline" }}>
              View all {checklist.length} items →
            </button>
          )}
        </Card>
      </div>

      {/* Quick nav cards */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(180px, 1fr))", gap: 12 }}>
        {[
          { id: "timeline", icon: "◈", label: "View timeline", sub: `${TIMELINE.length} moments` },
          { id: "notes", icon: "🔒", label: "Private notes", sub: `Logged in as ${auth.name}` },
          { id: "shop", icon: "◉", label: "Shop", sub: "Films, prints & more" },
          { id: "gallery", icon: "▣", label: "Gallery delivery", sub: IS_AFTER ? "In progress" : "After your wedding" },
        ].map((item) => (
          <motion.button key={item.id} onClick={() => onNav(item.id)} whileHover={{ y: -2, borderColor: DS.gold }} style={{ padding: "16px", borderRadius: 8, border: `1px solid ${DS.border}`, background: DS.surface, cursor: "pointer", textAlign: "left", transition: "all 0.2s" }}>
            <div style={{ fontSize: 20, marginBottom: 8 }}>{item.icon}</div>
            <div style={{ fontFamily: "'DM Sans'", fontSize: 12, fontWeight: 600, color: DS.text, marginBottom: 3 }}>{item.label}</div>
            <div style={{ fontFamily: "'DM Sans'", fontSize: 11, color: DS.textSec }}>{item.sub}</div>
          </motion.button>
        ))}
      </div>
    </div>
  );
}

/* ── Payments ───────────────────────────────────────────────────── */
function PaymentsSection() {
  const overdue = B.balanceDueDate < "2026-04-13";
  return (
    <div>
      <PageTitle sub="All payments for your booking">Payments</PageTitle>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))", gap: 12, marginBottom: 20 }}>
        {[
          { label: "Total investment", value: fmtCents(B.totalCents), highlight: true },
          { label: "Retainer paid", value: fmtCents(B.retainerCents), color: "#6ab187" },
          { label: "Balance remaining", value: fmtCents(B.balanceCents), color: overdue ? "#e05c5c" : DS.text },
        ].map((m) => (
          <Card key={m.label}>
            <div style={{ fontFamily: "'DM Sans'", fontSize: 10, fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.1em", color: DS.textSec, marginBottom: 8 }}>{m.label}</div>
            <div style={{ fontFamily: "'Bebas Neue'", fontSize: 28, lineHeight: 1, color: m.color || (m.highlight ? DS.gold : DS.text) }}>{m.value}</div>
          </Card>
        ))}
      </div>
      <Card>
        <SLabel>Payment history</SLabel>
        {[
          { label: "Retainer (30%)", date: B.retainerPaidAt, amount: fmtCents(B.retainerCents), status: "paid" },
          { label: "Balance (70%)", date: `Due ${fmt(B.balanceDueDate)}`, amount: fmtCents(B.balanceCents), status: overdue ? "overdue" : "upcoming" },
        ].map((p) => (
          <div key={p.label} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "14px 0", borderBottom: `1px solid ${DS.border}` }}>
            <div>
              <div style={{ fontFamily: "'DM Sans'", fontSize: 13, fontWeight: 600, color: DS.text }}>{p.label}</div>
              <div style={{ fontFamily: "'DM Sans'", fontSize: 11, color: DS.textSec, marginTop: 2 }}>{p.date}</div>
            </div>
            <div style={{ textAlign: "right" }}>
              <div style={{ fontFamily: "'Bebas Neue'", fontSize: 20, color: DS.text }}>{p.amount}</div>
              <div style={{ fontSize: 10, fontWeight: 700, textTransform: "uppercase", color: p.status === "paid" ? "#6ab187" : p.status === "overdue" ? "#e05c5c" : "#f0a500" }}>
                {p.status === "paid" ? "✓ Paid" : p.status === "overdue" ? "⚠ Overdue" : "Upcoming"}
              </div>
            </div>
          </div>
        ))}
      </Card>
      <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} style={{ marginTop: 16, width: "100%", maxWidth: 320, padding: "14px", borderRadius: 8, border: "none", background: `linear-gradient(135deg, ${DS.gold}, ${DS.ember})`, color: "#fff", fontFamily: "'DM Sans'", fontSize: 14, fontWeight: 700, cursor: "pointer", textTransform: "uppercase", letterSpacing: "0.06em" }}>
        Pay balance — {fmtCents(B.balanceCents)}
      </motion.button>
      <p style={{ fontFamily: "'DM Sans'", fontSize: 11, color: DS.textSec, marginTop: 8 }}>
        You'll be redirected to Stripe's secure checkout.
      </p>
    </div>
  );
}

/* ── Timeline ───────────────────────────────────────────────────── */
function TimelineSection() {
  return (
    <div>
      <PageTitle sub="Your wedding day schedule — draft · pending final confirmation">Timeline</PageTitle>
      <Card>
        <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>
          {TIMELINE.map((item, idx) => (
            <div key={idx} style={{ display: "flex", gap: 16, paddingBottom: 20, position: "relative" }}>
              {idx < TIMELINE.length - 1 && (
                <div style={{ position: "absolute", left: 60, top: 20, width: 1, height: "100%", background: `${DS.gold}25` }} />
              )}
              <div style={{ width: 56, flexShrink: 0, fontFamily: "'DM Sans'", fontSize: 11, fontWeight: 600, color: DS.gold, textAlign: "right", paddingTop: 2 }}>{item.time}</div>
              <div style={{ width: 10, height: 10, borderRadius: "50%", border: `2px solid ${DS.gold}`, background: DS.bg, flexShrink: 0, marginTop: 4 }} />
              <div style={{ flex: 1 }}>
                <div style={{ fontFamily: "'DM Sans'", fontSize: 13, fontWeight: 600, color: DS.text }}>{item.event}</div>
                {item.location && <div style={{ fontFamily: "'DM Sans'", fontSize: 11, color: DS.textSec, marginTop: 2 }}>{item.location}</div>}
                {item.note && <div style={{ fontFamily: "'DM Sans'", fontSize: 11, color: `${DS.gold}88`, marginTop: 3, fontStyle: "italic" }}>{item.note}</div>}
              </div>
            </div>
          ))}
        </div>
      </Card>
      <div style={{ marginTop: 14, padding: "12px 16px", borderRadius: 8, background: `${DS.gold}06`, border: `1px solid ${DS.gold}20`, fontFamily: "'DM Sans'", fontSize: 12, color: DS.textSec }}>
        📌 This timeline will be finalized during your pre-wedding call. Changes can be requested anytime via your private notes or by emailing the team.
      </div>
    </div>
  );
}

/* ── Questionnaire ──────────────────────────────────────────────── */
function QuestionnaireSection() {
  const [form, setForm] = useState({
    style: "romantic",
    mustHave: "First look, parent dances, cake cutting",
    keyPeople: "Emma's mom Carol, James's dad Robert, flower girl Lily",
    restrictions: "No flash during ceremony",
    songs: "Ceremony: 'Can't Help Falling in Love'. First dance: 'Perfect' by Ed Sheeran.",
    extra: "",
  });
  const [saved, setSaved] = useState(false);
  const set = (k, v) => { setSaved(false); setForm((p) => ({ ...p, [k]: v })); };

  return (
    <div>
      <PageTitle sub="Help us understand your vision — the more you share, the better we prepare">Pre-Wedding Questionnaire</PageTitle>
      <Card style={{ marginBottom: 14 }}>
        <SLabel>Photography style</SLabel>
        <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
          {["Romantic", "Editorial", "Documentary", "Fine Art"].map((s) => (
            <button key={s} onClick={() => set("style", s.toLowerCase())} style={{ padding: "7px 16px", borderRadius: 20, border: "1px solid", borderColor: form.style === s.toLowerCase() ? DS.gold : DS.border, background: form.style === s.toLowerCase() ? `${DS.gold}15` : "transparent", color: form.style === s.toLowerCase() ? DS.gold : DS.textSec, fontFamily: "'DM Sans'", fontSize: 12, cursor: "pointer" }}>{s}</button>
          ))}
        </div>
      </Card>

      {[
        { key: "mustHave", label: "Must-have moments", placeholder: "List the moments you absolutely can't miss…" },
        { key: "keyPeople", label: "Key people to photograph", placeholder: "Family members, VIPs, important guests…" },
        { key: "songs", label: "Important songs / music", placeholder: "Ceremony songs, first dance, any music-tied moments…" },
        { key: "restrictions", label: "Venue or ceremony restrictions", placeholder: "No flash, no photographers during X, etc…" },
        { key: "extra", label: "Anything else", placeholder: "Surprises, sensitivities, extra context for the team…" },
      ].map(({ key, label, placeholder }) => (
        <Card key={key} style={{ marginBottom: 14 }}>
          <SLabel>{label}</SLabel>
          <textarea
            value={form[key]}
            onChange={(e) => set(key, e.target.value)}
            placeholder={placeholder}
            rows={3}
            style={{ width: "100%", padding: "10px 12px", background: DS.bg, border: `1px solid ${DS.border}`, borderRadius: 6, color: DS.text, fontFamily: "'DM Sans'", fontSize: 13, resize: "vertical", outline: "none", lineHeight: 1.6 }}
          />
        </Card>
      ))}

      <motion.button onClick={() => setSaved(true)} whileHover={{ scale: 1.02 }} style={{ padding: "13px 32px", borderRadius: 8, border: "none", background: `linear-gradient(135deg, ${DS.gold}, ${DS.ember})`, color: "#fff", fontFamily: "'DM Sans'", fontSize: 13, fontWeight: 700, cursor: "pointer" }}>
        {saved ? "✓ Saved" : "Save questionnaire"}
      </motion.button>
    </div>
  );
}

/* ── Gallery ────────────────────────────────────────────────────── */
function GallerySection() {
  const stages = [
    { label: "Wedding day coverage", done: IS_AFTER, active: !IS_AFTER },
    { label: "Culling & editing", done: false, active: IS_AFTER },
    { label: "Sneak peek (3–5 days)", done: false, active: false },
    { label: "Full gallery (6–8 weeks)", done: false, active: false },
    { label: "Gallery approved", done: false, active: false },
  ];
  return (
    <div>
      <PageTitle sub="Estimated delivery: 6–8 weeks after your wedding">Gallery Delivery</PageTitle>
      <Card style={{ marginBottom: 14 }}>
        <SLabel>Delivery pipeline</SLabel>
        {stages.map((s, i) => (
          <div key={s.label} style={{ display: "flex", alignItems: "center", gap: 12, padding: "12px 0", borderBottom: i < stages.length - 1 ? `1px solid ${DS.border}` : "none" }}>
            <div style={{ width: 22, height: 22, borderRadius: "50%", border: `2px solid ${s.done ? DS.gold : s.active ? DS.ember : DS.border}`, background: s.done ? DS.gold : "transparent", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, transition: "all 0.2s" }}>
              {s.done && <span style={{ color: DS.bg, fontSize: 11 }}>✓</span>}
              {s.active && !s.done && <span style={{ width: 8, height: 8, borderRadius: "50%", background: DS.ember, display: "block" }} />}
            </div>
            <span style={{ fontFamily: "'DM Sans'", fontSize: 13, color: s.done || s.active ? DS.text : DS.textSec }}>{s.label}</span>
            {s.active && !s.done && <span style={{ marginLeft: "auto", fontSize: 10, color: DS.ember, fontWeight: 700, textTransform: "uppercase" }}>Current</span>}
            {s.done && <span style={{ marginLeft: "auto", fontSize: 10, color: DS.gold, fontWeight: 700 }}>✓ Done</span>}
          </div>
        ))}
      </Card>
      {!IS_AFTER && (
        <div style={{ padding: "16px 20px", borderRadius: 8, background: `${DS.gold}06`, border: `1px solid ${DS.gold}20`, fontFamily: "'DM Sans'", fontSize: 13, color: DS.textSec, lineHeight: 1.6 }}>
          Your gallery will be accessible here after your wedding day. You'll receive an email the moment your sneak peek is ready.
        </div>
      )}
    </div>
  );
}

/* ── Albums ─────────────────────────────────────────────────────── */
function AlbumsSection({ onNav }) {
  return (
    <div>
      <PageTitle sub="Your custom lay-flat album is included in your Signature package">Albums</PageTitle>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: 14, marginBottom: 20 }}>
        {[
          { name: "The Heirloom", size: '12×12"', cover: "Genuine Leather", pages: "30 spreads", price: "Included", status: "included", desc: "Your included album. Design process begins after gallery approval." },
          { name: "Parent Album", size: '8×8"', cover: "Soft Touch", pages: "15 spreads", price: "$500", status: "add-on", desc: "A smaller matching album — perfect for parents or as a gift." },
          { name: "Extra Copy", size: '10×10"', cover: "Linen", pages: "20 spreads", price: "$800", status: "add-on", desc: "An additional copy of your main album. Same design, same quality." },
        ].map((album) => (
          <Card key={album.name} gold={album.status === "included"}>
            {album.status === "included" && (
              <div style={{ fontSize: 10, fontWeight: 700, color: DS.gold, textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: 10 }}>✓ Included in your package</div>
            )}
            <div style={{ fontFamily: "'Playfair Display', serif", fontSize: 18, color: DS.text, marginBottom: 6 }}>{album.name}</div>
            <div style={{ fontFamily: "'DM Sans'", fontSize: 12, color: DS.textSec, marginBottom: 10 }}>
              {album.size} · {album.cover} · {album.pages}
            </div>
            <p style={{ fontFamily: "'DM Sans'", fontSize: 12, color: DS.textSec, lineHeight: 1.6, marginBottom: 14 }}>{album.desc}</p>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <span style={{ fontFamily: "'Bebas Neue'", fontSize: 22, color: album.status === "included" ? DS.gold : DS.text }}>{album.price}</span>
              {album.status !== "included" && (
                <button onClick={() => onNav("shop")} style={{ padding: "6px 14px", borderRadius: 6, border: `1px solid ${DS.gold}`, background: "transparent", color: DS.gold, fontFamily: "'DM Sans'", fontSize: 11, fontWeight: 600, cursor: "pointer" }}>
                  Add via Shop
                </button>
              )}
            </div>
          </Card>
        ))}
      </div>
      <div style={{ padding: "14px 18px", borderRadius: 8, background: `${DS.border}30`, fontFamily: "'DM Sans'", fontSize: 12, color: DS.textSec, lineHeight: 1.6 }}>
        📖 Album design begins after your full gallery is delivered and approved. The team will reach out with your design proof — you'll have two revision rounds before final print.
      </div>
    </div>
  );
}

/* ── Contract ───────────────────────────────────────────────────── */
function ContractSection() {
  return (
    <div>
      <PageTitle sub="Your signed agreement">Contract & Documents</PageTitle>
      <Card style={{ marginBottom: 14 }}>
        <SLabel>Status</SLabel>
        <div style={{ display: "flex", alignItems: "center", gap: 12, padding: "12px 0", borderBottom: `1px solid ${DS.border}` }}>
          <span style={{ fontSize: 20, color: "#6ab187" }}>✓</span>
          <div>
            <div style={{ fontFamily: "'DM Sans'", fontSize: 13, fontWeight: 600, color: DS.text }}>Wedding Photography & Film Agreement</div>
            <div style={{ fontFamily: "'DM Sans'", fontSize: 11, color: DS.textSec, marginTop: 2 }}>Signed January 8, 2026 · {B.fullNames}</div>
          </div>
          <button style={{ marginLeft: "auto", padding: "7px 16px", borderRadius: 6, border: `1px solid ${DS.border}`, background: "transparent", color: DS.text, fontFamily: "'DM Sans'", fontSize: 12, cursor: "pointer" }}>
            Download PDF
          </button>
        </div>
      </Card>
      <Card>
        <SLabel>Key terms summary</SLabel>
        {[
          { label: "Package", value: `${B.packageName} · ${fmtCents(B.totalCents)}` },
          { label: "Retainer", value: `${fmtCents(B.retainerCents)} · Non-refundable` },
          { label: "Balance due", value: `${fmtCents(B.balanceCents)} · ${fmt(B.balanceDueDate)}` },
          { label: "Sneak peek", value: "3–5 days after wedding" },
          { label: "Full gallery", value: "6–8 weeks after wedding" },
          { label: "Films", value: "8–14 weeks after wedding" },
          { label: "Usage license", value: "Full personal use granted to client" },
          { label: "Copyright", value: "Retained by Move Mountains Co." },
        ].map((row) => (
          <div key={row.label} style={{ display: "flex", justifyContent: "space-between", padding: "9px 0", borderBottom: `1px solid ${DS.border}` }}>
            <span style={{ fontFamily: "'DM Sans'", fontSize: 12, color: DS.textSec }}>{row.label}</span>
            <span style={{ fontFamily: "'DM Sans'", fontSize: 12, color: DS.text, fontWeight: 500, textAlign: "right", maxWidth: "55%" }}>{row.value}</span>
          </div>
        ))}
      </Card>
    </div>
  );
}

/* ══════════════════════════════════════════════════════════════════
   SIDEBAR
══════════════════════════════════════════════════════════════════ */
function Sidebar({ auth, activeId, onNav, onLogout, mobileOpen, onClose }) {
  return (
    <>
      {/* Mobile backdrop */}
      {mobileOpen && (
        <div onClick={onClose} style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.6)", zIndex: 90 }} />
      )}
      <aside
        className={`portal-sidebar${mobileOpen ? " portal-sidebar--open" : ""}`}
        style={{
          width: 220, flexShrink: 0, overflowY: "auto",
          background: DS.surface, borderRight: `1px solid ${DS.border}`,
          display: "flex", flexDirection: "column",
        }}
      >
        {/* Brand */}
        <div style={{ padding: "20px 18px 16px", borderBottom: `1px solid ${DS.border}` }}>
          <div style={{ fontFamily: "'Playfair Display', serif", fontSize: 15, color: DS.text, marginBottom: 2 }}>
            Move Mountains <span style={{ color: DS.gold }}>Co.</span>
          </div>
          <div style={{ fontFamily: "'DM Sans'", fontSize: 9, color: DS.textSec, textTransform: "uppercase", letterSpacing: "0.12em" }}>
            Client Portal
          </div>
        </div>

        {/* Avatar + identity */}
        <div style={{ padding: "16px 18px 14px", borderBottom: `1px solid ${DS.border}` }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 10 }}>
            <div style={{ width: 32, height: 32, borderRadius: "50%", background: `linear-gradient(135deg, ${DS.gold}, ${DS.ember})`, display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "'Playfair Display', serif", fontSize: 14, color: DS.bg, flexShrink: 0 }}>
              {auth.initial}
            </div>
            <div>
              <div style={{ fontFamily: "'DM Sans'", fontSize: 12, fontWeight: 700, color: DS.text }}>Logged in as {auth.name}</div>
              <div style={{ fontFamily: "'DM Sans'", fontSize: 10, color: DS.textSec, marginTop: 1 }}>{auth.email}</div>
            </div>
          </div>
          <div style={{ padding: "8px 10px", borderRadius: 6, background: `${DS.gold}08`, border: `1px solid ${DS.gold}20` }}>
            <div style={{ fontFamily: "'DM Sans'", fontSize: 10, color: DS.textSec, textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 2 }}>{B.fullNames}</div>
            <div style={{ fontFamily: "'Bebas Neue'", fontSize: 22, color: DS.gold, lineHeight: 1 }}>{DAYS_UNTIL} days</div>
            <div style={{ fontFamily: "'DM Sans'", fontSize: 10, color: DS.textSec }}>until {fmt(B.weddingDate)}</div>
          </div>
        </div>

        {/* Nav */}
        <nav style={{ flex: 1, padding: "12px 10px", overflowY: "auto" }}>
          {NAV.map((group) => (
            <div key={group.group} style={{ marginBottom: 20 }}>
              <div style={{ fontFamily: "'DM Sans'", fontSize: 9, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.14em", color: DS.textSec, padding: "4px 8px", marginBottom: 4 }}>
                {group.group}
              </div>
              {group.items.map((item) => (
                <span key={item.id}>
                  <button
                    onClick={() => { onNav(item.id); onClose?.(); }}
                    style={{
                      width: "100%", display: "flex", alignItems: "center", gap: 8,
                      padding: "8px 10px", borderRadius: 6, border: "none",
                      background: activeId === item.id ? `${DS.gold}15` : "transparent",
                      color: activeId === item.id ? DS.gold : DS.textSec,
                      fontFamily: "'DM Sans'", fontSize: 12, fontWeight: activeId === item.id ? 600 : 400,
                      cursor: "pointer", textAlign: "left", transition: "all 0.15s",
                      marginBottom: 2,
                    }}
                  >
                    <span style={{ fontSize: 13, width: 16, textAlign: "center" }}>{item.icon}</span>
                    <span style={{ flex: 1 }}>{item.label}</span>
                    {item.badge && (
                      <span style={{ fontSize: 8, fontWeight: 700, padding: "2px 5px", borderRadius: 3, background: DS.gold, color: DS.bg, textTransform: "uppercase" }}>
                        {item.badge}
                      </span>
                    )}
                    {activeId === item.id && <span style={{ fontSize: 12, color: DS.gold }}>›</span>}
                  </button>
                  {item.id === "overview" && (
                    <Link
                      to="/my-wedding/countdown"
                      style={{
                        width: "100%", display: "flex", alignItems: "center", gap: 8,
                        padding: "8px 10px", borderRadius: 6,
                        color: DS.textSec, textDecoration: "none",
                        fontFamily: "'DM Sans'", fontSize: 12, fontWeight: 400,
                        transition: "all 0.15s", marginBottom: 2,
                      }}
                      onMouseEnter={(e) => { e.currentTarget.style.background = `${DS.gold}10`; e.currentTarget.style.color = DS.gold; }}
                      onMouseLeave={(e) => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = DS.textSec; }}
                    >
                      <span style={{ fontSize: 13, width: 16, textAlign: "center" }}>⏳</span>
                      <span style={{ flex: 1 }}>Countdown</span>
                      <span style={{ fontSize: 9, color: DS.textSec, opacity: 0.6 }}>↗</span>
                    </Link>
                  )}
                </span>
              ))}
            </div>
          ))}
        </nav>

        {/* Footer */}
        <div style={{ padding: "14px 18px", borderTop: `1px solid ${DS.border}` }}>
          <div style={{ fontFamily: "'DM Sans'", fontSize: 11, color: DS.textSec, marginBottom: 8 }}>
            Questions? Email the team:
          </div>
          <a href="mailto:sean@movemountains.co" style={{ fontFamily: "'DM Sans'", fontSize: 11, color: DS.gold, textDecoration: "none" }}>
            sean@movemountains.co
          </a>
          <button onClick={onLogout} style={{ display: "block", marginTop: 12, background: "none", border: "none", color: DS.textSec, fontFamily: "'DM Sans'", fontSize: 11, cursor: "pointer", textDecoration: "underline", padding: 0 }}>
            Log out
          </button>
        </div>
      </aside>
    </>
  );
}

/* ══════════════════════════════════════════════════════════════════
   PORTAL SHELL
══════════════════════════════════════════════════════════════════ */
function PortalShell({ auth, onLogout }) {
  const [activeId, setActiveId] = useState("overview");
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const [direction, setDirection] = useState(1);

  const allIds = NAV.flatMap((g) => g.items.map((i) => i.id));
  const goNav = (id) => {
    const curr = allIds.indexOf(activeId);
    const next = allIds.indexOf(id);
    setDirection(next >= curr ? 1 : -1);
    setActiveId(id);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const slide = {
    enter: (d) => ({ x: d > 0 ? 30 : -30, opacity: 0 }),
    center: { x: 0, opacity: 1 },
    exit: (d) => ({ x: d > 0 ? -30 : 30, opacity: 0 }),
  };

  return (
    <div style={{ display: "flex", minHeight: "100vh", background: DS.bg, color: DS.text }}>
      <style>{`
        @import url('${fontLink}');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        a { color: inherit; text-decoration: none; }
        /* Topbar only visible on mobile */
        .portal-topbar { display: flex; }
        @media (min-width: 768px) { .portal-topbar { display: none !important; } }
        /* Sidebar: always visible on desktop, drawer on mobile */
        .portal-sidebar { position: sticky; top: 0; height: 100vh; }
        @media (max-width: 767px) {
          .portal-sidebar { position: fixed !important; top: 0; left: -260px; height: 100vh; z-index: 100; transition: left 0.3s ease; }
          .portal-sidebar--open { left: 0 !important; box-shadow: 4px 0 32px rgba(0,0,0,0.5); }
        }
      `}</style>

      <Sidebar auth={auth} activeId={activeId} onNav={goNav} onLogout={onLogout} mobileOpen={mobileNavOpen} onClose={() => setMobileNavOpen(false)} />

      {/* Main */}
      <div style={{ flex: 1, minWidth: 0, display: "flex", flexDirection: "column" }}>
        {/* Mobile topbar — hidden on desktop via .portal-topbar CSS class */}
        <div className="portal-topbar" style={{ alignItems: "center", justifyContent: "space-between", padding: "14px 20px", borderBottom: `1px solid ${DS.border}`, position: "sticky", top: 0, background: `${DS.bg}ee`, backdropFilter: "blur(12px)", zIndex: 50 }}>
          <button onClick={() => setMobileNavOpen(true)} style={{ background: "none", border: "none", color: DS.text, cursor: "pointer", fontSize: 20, lineHeight: 1 }}>☰</button>
          <div style={{ fontFamily: "'Playfair Display', serif", fontSize: 14, color: DS.text }}>
            {NAV.flatMap(g => g.items).find(i => i.id === activeId)?.label || "Portal"}
          </div>
          <div style={{ width: 28, height: 28, borderRadius: "50%", background: `linear-gradient(135deg, ${DS.gold}, ${DS.ember})`, display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "'Playfair Display', serif", fontSize: 12, color: DS.bg }}>
            {auth.initial}
          </div>
        </div>

        {/* Content */}
        <main style={{ flex: 1, padding: "32px clamp(16px, 4vw, 48px) 80px", maxWidth: 900, width: "100%" }}>
          <AnimatePresence mode="wait" custom={direction}>
            <motion.div key={activeId} custom={direction} variants={slide} initial="enter" animate="center" exit="exit" transition={{ duration: 0.25, ease: [0.25, 0.1, 0.25, 1] }}>
              {activeId === "overview"      && <OverviewSection auth={auth} onNav={goNav} />}
              {activeId === "payments"      && <PaymentsSection />}
              {activeId === "timeline"      && <TimelineSection />}
              {activeId === "questionnaire" && <QuestionnaireSection />}
              {activeId === "notes"         && (
                <div>
                  <PageTitle sub={`Only you and the MMC team can see these — ${auth.partner === "partner_1" ? "James" : "Emma"} cannot`}>Private Notes</PageTitle>
                  <PrivateNotes auth={auth} />
                </div>
              )}
              {activeId === "shop"          && <PortalStore />}
              {activeId === "gallery"       && <GallerySection />}
              {activeId === "albums"        && <AlbumsSection onNav={goNav} />}
              {activeId === "contract"      && <ContractSection />}
            </motion.div>
          </AnimatePresence>
        </main>
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════════════════════════════
   PAGE ROOT
══════════════════════════════════════════════════════════════════ */
export default function MyWedding() {
  const [auth, setAuth] = useState(null);
  if (!auth) return <PortalAuth onLogin={setAuth} />;
  return <PortalShell auth={auth} onLogout={() => setAuth(null)} />;
}
