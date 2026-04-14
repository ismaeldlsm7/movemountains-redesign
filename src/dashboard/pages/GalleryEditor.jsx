import { useState, useRef } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { MOCK_GALLERIES, GALLERY_STATUSES, PHOTO_THEMES, FILM_THEMES, generateToken, galleryUrl } from "../data/mockGalleries";
import { MOCK_BOOKINGS } from "../data/mockBookings";
import { useToast } from "../components/ToastProvider";
import { IconCheck, IconEye, IconPlus, IconClose, IconUpload, IconCamera } from "../components/Icons";
import MockUploader from "../components/MockUploader";

/* ── Film type catalog ────────────────────────────────────────────── */
const FILM_TYPES = [
  { id: "highlight",        label: "Highlight Reel" },
  { id: "wedding-film",     label: "Wedding Film (Full)" },
  { id: "ceremony",         label: "Ceremony (Full)" },
  { id: "reception",        label: "Reception (Full)" },
  { id: "first-look",       label: "First Look" },
  { id: "bridesmaids-look", label: "Bridesmaids' First Look" },
  { id: "getting-ready",    label: "Getting Ready" },
  { id: "rehearsal",        label: "Rehearsal Dinner" },
  { id: "super8",           label: "Super 8 Film" },
  { id: "speeches",         label: "Speeches & Toasts" },
  { id: "custom",           label: "Custom" },
];

/* ── Format seconds → H:MM:SS or M:SS ───────────────────────────── */
function fmtDuration(secs) {
  const s = Math.round(secs);
  const h = Math.floor(s / 3600);
  const m = Math.floor((s % 3600) / 60);
  const sec = s % 60;
  if (h > 0) return `${h}:${String(m).padStart(2, "0")}:${String(sec).padStart(2, "0")}`;
  return `${m}:${String(sec).padStart(2, "0")}`;
}

/* ── Video uploader — reads duration from file metadata ──────────── */
function VideoUploadArea({ filmId, uploaded, fileName, onUploaded, onReplace }) {
  const inputRef              = useRef(null);
  const [dragging, setDragging]   = useState(false);
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress]   = useState(0);
  const [error, setError]         = useState(null);

  function processFile(file) {
    if (!file || !file.type.startsWith("video/")) {
      setError("Please select a valid video file (.mp4, .mov, .m4v).");
      return;
    }
    setError(null);
    setUploading(true);
    setProgress(0);

    // Read duration from video metadata via blob URL
    const blobUrl = URL.createObjectURL(file);
    const vid = document.createElement("video");
    vid.preload = "metadata";
    vid.src = blobUrl;
    vid.onloadedmetadata = () => {
      const detectedDuration = isFinite(vid.duration) ? fmtDuration(vid.duration) : null;
      URL.revokeObjectURL(blobUrl);

      // Simulate upload progress after metadata is read
      let p = 0;
      const tick = () => {
        p += Math.random() * 9 + 4;
        if (p >= 100) {
          setProgress(100);
          setTimeout(() => {
            setUploading(false);
            onUploaded(filmId, file.name, detectedDuration);
          }, 300);
        } else {
          setProgress(Math.round(p));
          setTimeout(tick, 100 + Math.random() * 60);
        }
      };
      setTimeout(tick, 60);
    };
    vid.onerror = () => {
      URL.revokeObjectURL(blobUrl);
      setError("Could not read video metadata. Try another file.");
      setUploading(false);
    };
  }

  function handleDrop(e) {
    e.preventDefault();
    setDragging(false);
    processFile(e.dataTransfer.files[0]);
  }

  if (uploaded) {
    return (
      <div style={{
        display: "flex", alignItems: "center", gap: 8, padding: "10px 12px",
        borderRadius: 6, background: "#6ab18710", border: "1px solid #6ab18730",
        fontSize: 12,
      }}>
        <span style={{ color: "#6ab187" }}>✓</span>
        <span style={{ fontWeight: 600, color: "#6ab187" }}>Video uploaded</span>
        {fileName && (
          <span style={{ color: "var(--dash-text-muted)", fontSize: 11, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", maxWidth: 200 }}>
            — {fileName}
          </span>
        )}
        <button
          onClick={onReplace}
          style={{ marginLeft: "auto", background: "none", border: "none", cursor: "pointer", color: "var(--dash-text-muted)", fontSize: 11, flexShrink: 0 }}
        >
          Replace
        </button>
      </div>
    );
  }

  return (
    <div>
      <input
        ref={inputRef}
        type="file"
        accept="video/mp4,video/quicktime,video/x-m4v,video/*"
        style={{ display: "none" }}
        onChange={(e) => processFile(e.target.files[0])}
      />
      <div
        onClick={() => !uploading && inputRef.current?.click()}
        onDragOver={(e) => { e.preventDefault(); setDragging(true); }}
        onDragLeave={() => setDragging(false)}
        onDrop={handleDrop}
        style={{
          padding: "14px 16px", borderRadius: 6,
          cursor: uploading ? "default" : "pointer",
          border: `1px dashed ${dragging ? "var(--dash-gold)" : "var(--dash-border)"}`,
          background: dragging ? "color-mix(in srgb, var(--dash-gold) 5%, transparent)" : "transparent",
          textAlign: "center", transition: "all 0.15s",
        }}
      >
        {uploading ? (
          <>
            <div style={{ fontSize: 12, color: "var(--dash-text-muted)", marginBottom: 8 }}>
              Uploading… {progress}%
            </div>
            <div style={{ height: 3, background: "var(--dash-border)", borderRadius: 2, overflow: "hidden" }}>
              <div style={{ height: "100%", width: `${progress}%`, background: "var(--dash-gold)", borderRadius: 2, transition: "width 0.12s linear" }} />
            </div>
          </>
        ) : (
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 8, color: "var(--dash-text-muted)", fontSize: 12 }}>
            <IconUpload width={13} height={13} />
            <span>Drag video or <span style={{ color: "var(--dash-gold)", textDecoration: "underline" }}>click to browse</span></span>
            <span style={{ opacity: 0.45 }}>· .mp4 .mov up to 10 GB</span>
          </div>
        )}
      </div>
      {error && (
        <p style={{ fontSize: 11, color: "#e05c5c", marginTop: 6 }}>{error}</p>
      )}
    </div>
  );
}

/* ── SVG layout previews ──────────────────────────────────────────── */
const THEME_PREVIEWS = {
  masonry: (
    <svg viewBox="0 0 80 48" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="2" y="2" width="22" height="32" rx="1" fill="rgba(255,255,255,0.07)" />
      <rect x="2" y="36" width="22" height="10" rx="1" fill="rgba(255,255,255,0.07)" />
      <rect x="27" y="2" width="22" height="18" rx="1" fill="rgba(255,255,255,0.07)" />
      <rect x="27" y="22" width="22" height="24" rx="1" fill="rgba(255,255,255,0.07)" />
      <rect x="52" y="2" width="26" height="26" rx="1" fill="rgba(255,255,255,0.07)" />
      <rect x="52" y="30" width="26" height="16" rx="1" fill="rgba(255,255,255,0.07)" />
    </svg>
  ),
  grid: (
    <svg viewBox="0 0 80 48" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="2"  y="2"  width="22" height="20" rx="1" fill="rgba(255,255,255,0.07)" />
      <rect x="29" y="2"  width="22" height="20" rx="1" fill="rgba(255,255,255,0.07)" />
      <rect x="56" y="2"  width="22" height="20" rx="1" fill="rgba(255,255,255,0.07)" />
      <rect x="2"  y="26" width="22" height="20" rx="1" fill="rgba(255,255,255,0.07)" />
      <rect x="29" y="26" width="22" height="20" rx="1" fill="rgba(255,255,255,0.07)" />
      <rect x="56" y="26" width="22" height="20" rx="1" fill="rgba(255,255,255,0.07)" />
    </svg>
  ),
  editorial: (
    <svg viewBox="0 0 80 48" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="2" y="2" width="76" height="18" rx="1" fill="rgba(201,169,110,0.15)" />
      <rect x="2" y="23" width="36" height="23" rx="1" fill="rgba(255,255,255,0.07)" />
      <rect x="42" y="23" width="36" height="23" rx="1" fill="rgba(255,255,255,0.07)" />
    </svg>
  ),
  slideshow: (
    <svg viewBox="0 0 80 48" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="10" y="4" width="60" height="34" rx="1" fill="rgba(255,255,255,0.07)" />
      <circle cx="35" cy="43" r="2" fill="rgba(255,255,255,0.15)" />
      <rect x="38" y="41" width="8" height="4" rx="2" fill="rgba(201,169,110,0.5)" />
      <circle cx="50" cy="43" r="2" fill="rgba(255,255,255,0.15)" />
      <polygon points="6,17 6,25 10,21" fill="rgba(255,255,255,0.2)" />
      <polygon points="74,17 74,25 70,21" fill="rgba(255,255,255,0.2)" />
    </svg>
  ),
  hero: (
    <svg viewBox="0 0 80 48" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="2" y="2" width="76" height="26" rx="1" fill="rgba(201,169,110,0.12)" />
      <circle cx="40" cy="15" r="6" stroke="rgba(255,255,255,0.35)" strokeWidth="1" fill="none" />
      <polygon points="38,12 38,18 44,15" fill="rgba(255,255,255,0.35)" />
      <rect x="2"  y="32" width="35" height="14" rx="1" fill="rgba(255,255,255,0.07)" />
      <rect x="43" y="32" width="35" height="14" rx="1" fill="rgba(255,255,255,0.07)" />
    </svg>
  ),
  cinematic: (
    <svg viewBox="0 0 80 48" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="2" y="2" width="76" height="30" rx="1" fill="rgba(201,169,110,0.12)" />
      <circle cx="40" cy="17" r="7" stroke="rgba(201,169,110,0.5)" strokeWidth="1" fill="none" />
      <polygon points="38,14 38,20 45,17" fill="rgba(201,169,110,0.5)" />
      <rect x="2"  y="36" width="22" height="10" rx="1" fill="rgba(255,255,255,0.07)" />
      <rect x="28" y="36" width="22" height="10" rx="1" fill="rgba(255,255,255,0.07)" />
      <rect x="54" y="36" width="22" height="10" rx="1" fill="rgba(255,255,255,0.07)" />
    </svg>
  ),
  playlist: (
    <svg viewBox="0 0 80 48" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="2" y="2" width="18" height="44" rx="1" fill="rgba(255,255,255,0.04)" stroke="rgba(255,255,255,0.07)" strokeWidth="0.5" />
      <rect x="3" y="4"  width="16" height="8" rx="0.5" fill="rgba(201,169,110,0.2)" />
      <rect x="3" y="14" width="16" height="8" rx="0.5" fill="rgba(255,255,255,0.06)" />
      <rect x="3" y="24" width="16" height="8" rx="0.5" fill="rgba(255,255,255,0.06)" />
      <rect x="3" y="34" width="16" height="8" rx="0.5" fill="rgba(255,255,255,0.06)" />
      <rect x="24" y="2" width="54" height="30" rx="1" fill="rgba(255,255,255,0.07)" />
      <circle cx="51" cy="17" r="6" stroke="rgba(255,255,255,0.3)" strokeWidth="1" fill="none" />
      <polygon points="49,14 49,20 55,17" fill="rgba(255,255,255,0.3)" />
    </svg>
  ),
};

/* ── Theme selector card ──────────────────────────────────────────── */
function ThemeCard({ id, label, description, active, onClick, preview }) {
  return (
    <div
      onClick={onClick}
      style={{
        cursor: "pointer",
        border: `1px solid ${active ? "var(--dash-gold)" : "var(--dash-border)"}`,
        borderRadius: 8,
        background: active ? "color-mix(in srgb, var(--dash-gold) 6%, transparent)" : "transparent",
        overflow: "hidden",
        transition: "border-color 0.2s, background 0.2s",
        flexShrink: 0,
      }}
    >
      {/* SVG preview */}
      <div style={{
        aspectRatio: "16/9",
        background: "rgba(0,0,0,0.25)",
        display: "flex", alignItems: "stretch",
      }}>
        <div style={{ flex: 1, padding: 8, display: "flex", alignItems: "center", justifyContent: "center" }}>
          {preview}
        </div>
      </div>
      {/* Label row */}
      <div style={{ padding: "8px 10px" }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 2 }}>
          <span style={{ fontSize: 12, fontWeight: 600, color: active ? "var(--dash-gold)" : "var(--dash-text)" }}>
            {label}
          </span>
          {active && <span style={{ fontSize: 11, color: "var(--dash-gold)" }}>✓</span>}
        </div>
        <span style={{ fontSize: 11, color: "var(--dash-text-muted)", lineHeight: 1.4 }}>
          {description}
        </span>
      </div>
    </div>
  );
}

const STATUS_ORDER = ["draft", "editing", "ready", "delivered"];

const fmtDate = (iso) =>
  iso ? new Date(iso + "T12:00:00").toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }) : "—";

export default function GalleryEditor() {
  const { id }       = useParams();
  const navigate     = useNavigate();
  const { showToast } = useToast();

  const existing = id ? MOCK_GALLERIES.find((g) => g.id === id) : null;
  const isNew    = !existing;

  /* ── Form state ───────────────────────────────────────────────── */
  const [couple,     setCouple]     = useState(existing?.couple || "");
  const [weddingDate,setWeddingDate]= useState(existing?.weddingDate || "");
  const [venue,      setVenue]      = useState(existing?.venue || "");
  const [location,   setLocation]   = useState(existing?.location || "Newport, Rhode Island");
  const [clientEmail,setClientEmail]= useState(existing?.clientEmail || "");
  const [token,      setToken]      = useState(existing?.token || generateToken());
  const [photoCount, setPhotoCount] = useState(existing?.photoCount ?? 0);
  const [films,      setFilms]      = useState(
    (existing?.films || []).map((f) => ({ ...f, type: f.type || "highlight", uploaded: !!f.duration }))
  );
  const [status,     setStatus]     = useState(existing?.status || "draft");
  const [notes,      setNotes]      = useState(existing?.notes || "");
  const [bookingId,  setBookingId]  = useState(existing?.bookingId || "");
  const [copied,     setCopied]     = useState(false);
  const [photoTheme, setPhotoTheme] = useState(existing?.photoTheme ?? "masonry");
  const [filmTheme,  setFilmTheme]  = useState(existing?.filmTheme  ?? "hero");

  /* link to a booking → auto-fill fields */
  function applyBooking(bkId) {
    setBookingId(bkId);
    if (!bkId) return;
    const bk = MOCK_BOOKINGS.find((b) => b.id === bkId);
    if (!bk) return;
    setCouple(`${bk.clientName.split(" ")[0]} & ${bk.partnerName.split(" ")[0]} ${bk.clientName.split(" ").slice(1).join(" ")}`);
    setWeddingDate(bk.weddingDate);
    setVenue(bk.venue);
    setClientEmail(bk.email);
  }

  /* Films management */
  function addFilm() {
    setFilms((prev) => [...prev, { id: `f${Date.now()}`, type: "highlight", title: "Highlight Reel", duration: "", uploaded: false }]);
  }
  function removeFilm(fid) {
    setFilms((prev) => prev.filter((f) => f.id !== fid));
  }
  function updateFilm(fid, field, val) {
    setFilms((prev) => prev.map((f) => {
      if (f.id !== fid) return f;
      const updated = { ...f, [field]: val };
      // auto-fill title when type changes, unless user has customised it
      if (field === "type") {
        const typeLabel = FILM_TYPES.find((t) => t.id === val)?.label || "";
        const currentTypeLabel = FILM_TYPES.find((t) => t.id === f.type)?.label || "";
        if (f.title === currentTypeLabel || f.title === "") updated.title = typeLabel;
      }
      return updated;
    }));
  }
  function markUploaded(fid, name, duration) {
    setFilms((prev) => prev.map((f) => {
      if (f.id !== fid) return f;
      return {
        ...f,
        uploaded: true,
        fileName: name,
        duration: duration || f.duration, // only overwrite if we detected one
      };
    }));
  }
  function markReplace(fid) {
    setFilms((prev) => prev.map((f) => f.id === fid ? { ...f, uploaded: false, fileName: null } : f));
  }

  /* Copy link */
  function copyLink() {
    navigator.clipboard.writeText(galleryUrl(token)).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  }

  /* Save / Publish */
  function save(action) {
    const nextStatus = action === "deliver" ? "delivered" : status;
    if (action === "deliver") {
      showToast({
        title: "Gallery delivered",
        description: `Link sent to ${clientEmail || "client"}. They can now access /g/${token}.`,
      });
    } else {
      showToast({
        title: isNew ? "Gallery created" : "Gallery saved",
        description: `${couple || "Gallery"} saved as ${GALLERY_STATUSES[nextStatus].label}.`,
      });
    }
    setTimeout(() => navigate("/dashboard/galleries"), 600);
  }

  const url = galleryUrl(token);
  const linkedBooking = bookingId ? MOCK_BOOKINGS.find((b) => b.id === bookingId) : null;

  return (
    <>
      {/* Header */}
      <div className="mm-dash__page-header">
        <div>
          <h1 className="mm-dash__page-title">
            {isNew ? "New gallery" : `Gallery · ${existing.couple}`}
          </h1>
          <p className="mm-dash__page-subtitle">
            {isNew ? "Create a private delivery gallery for a client." : "Update films, photo count, and delivery status."}
          </p>
        </div>
        <div className="mm-dash__page-actions">
          {!isNew && status === "delivered" && (
            <a href={`/g/${token}`} target="_blank" rel="noreferrer" className="mm-dash__btn mm-dash__btn--secondary">
              <IconEye width={14} height={14} />
              Preview gallery
            </a>
          )}
          <button onClick={() => save("save")} className="mm-dash__btn mm-dash__btn--secondary">
            Save
          </button>
          {status !== "delivered" && (
            <button onClick={() => save("deliver")} className="mm-dash__btn mm-dash__btn--primary" disabled={!couple || !clientEmail}>
              <IconCheck width={14} height={14} />
              Publish & deliver
            </button>
          )}
        </div>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 320px", gap: 24, alignItems: "start" }}>

        {/* ── Left column ─────────────────────────────────────────── */}
        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>

          {/* Link to booking */}
          <div className="mm-dash__card">
            <div className="mm-dash__card-title">Link to booking</div>
            <p className="mm-dash__card-sub" style={{ marginBottom: 12 }}>
              Select a booking to auto-fill couple name, date, venue, and email.
            </p>
            <select
              value={bookingId}
              onChange={(e) => applyBooking(e.target.value)}
              className="mm-dash__input"
            >
              <option value="">— No booking linked —</option>
              {MOCK_BOOKINGS.filter((b) => b.status === "confirmed" || b.status === "completed").map((b) => (
                <option key={b.id} value={b.id}>
                  {b.clientName} & {b.partnerName} · {fmtDate(b.weddingDate)} · {b.venue}
                </option>
              ))}
            </select>
            {linkedBooking && (
              <div style={{ marginTop: 10 }}>
                <Link to={`/dashboard/bookings/${linkedBooking.id}`} style={{ fontSize: 12, color: "var(--dash-gold)", textDecoration: "none" }}>
                  View booking →
                </Link>
              </div>
            )}
          </div>

          {/* Client info */}
          <div className="mm-dash__card">
            <div className="mm-dash__card-title">Client info</div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 12 }}>
              <div>
                <label className="mm-dash__label">Couple names</label>
                <input className="mm-dash__input" value={couple} onChange={(e) => setCouple(e.target.value)} placeholder="Emma & James" />
              </div>
              <div>
                <label className="mm-dash__label">Wedding date</label>
                <input className="mm-dash__input" type="date" value={weddingDate} onChange={(e) => setWeddingDate(e.target.value)} />
              </div>
              <div>
                <label className="mm-dash__label">Venue</label>
                <input className="mm-dash__input" value={venue} onChange={(e) => setVenue(e.target.value)} placeholder="The Rosecliff" />
              </div>
              <div>
                <label className="mm-dash__label">Location</label>
                <input className="mm-dash__input" value={location} onChange={(e) => setLocation(e.target.value)} placeholder="Newport, Rhode Island" />
              </div>
            </div>
            <div>
              <label className="mm-dash__label">Client email (gallery link will be sent here)</label>
              <input className="mm-dash__input" type="email" value={clientEmail} onChange={(e) => setClientEmail(e.target.value)} placeholder="client@email.com" />
            </div>
          </div>

          {/* Films */}
          <div className="mm-dash__card">
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 16 }}>
              <div>
                <div className="mm-dash__card-title" style={{ margin: 0 }}>Films</div>
                <p className="mm-dash__card-sub" style={{ marginTop: 2 }}>
                  {films.length === 0 ? "No films added yet." : `${films.length} film${films.length !== 1 ? "s" : ""} · ${films.filter((f) => f.uploaded).length} uploaded`}
                </p>
              </div>
              <button onClick={addFilm} className="mm-dash__btn mm-dash__btn--ghost" style={{ padding: "6px 12px", fontSize: 12 }}>
                <IconPlus width={12} height={12} />
                Add film
              </button>
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
              {films.map((f, idx) => (
                <div key={f.id} style={{
                  padding: "14px 16px", borderRadius: 8,
                  border: "1px solid var(--dash-border)",
                  background: "color-mix(in srgb, var(--dash-border) 15%, transparent)",
                }}>
                  {/* Row 1 — type + duration + remove */}
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 110px auto", gap: 8, alignItems: "center", marginBottom: 10 }}>
                    <div>
                      <label className="mm-dash__label" style={{ marginBottom: 4 }}>Film type</label>
                      <select
                        className="mm-dash__input"
                        value={f.type}
                        onChange={(e) => updateFilm(f.id, "type", e.target.value)}
                        style={{ fontFamily: "inherit" }}
                      >
                        {FILM_TYPES.map((t) => (
                          <option key={t.id} value={t.id}>{t.label}</option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="mm-dash__label" style={{ marginBottom: 4 }}>Duration</label>
                      <input
                        className="mm-dash__input"
                        value={f.duration}
                        onChange={(e) => updateFilm(f.id, "duration", e.target.value)}
                        placeholder="3:42"
                      />
                    </div>
                    <button
                      onClick={() => removeFilm(f.id)}
                      style={{ background: "none", border: "none", cursor: "pointer", color: "var(--dash-text-muted)", padding: "4px", borderRadius: 4, marginTop: 18 }}
                      title="Remove film"
                    >
                      <IconClose width={15} height={15} />
                    </button>
                  </div>

                  {/* Row 2 — custom title */}
                  <div style={{ marginBottom: 10 }}>
                    <label className="mm-dash__label" style={{ marginBottom: 4 }}>Display title <span style={{ fontWeight: 400, opacity: 0.6 }}>(shown to client)</span></label>
                    <input
                      className="mm-dash__input"
                      value={f.title}
                      onChange={(e) => updateFilm(f.id, "title", e.target.value)}
                      placeholder="Auto-filled from type — override if needed"
                    />
                  </div>

                  {/* Row 3 — video upload */}
                  <VideoUploadArea
                    filmId={f.id}
                    uploaded={f.uploaded}
                    fileName={f.fileName}
                    onUploaded={markUploaded}
                    onReplace={() => markReplace(f.id)}
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Photos */}
          <div className="mm-dash__card">
            <div className="mm-dash__card-title">Photos</div>
            <p className="mm-dash__card-sub" style={{ marginBottom: 16 }}>
              Drag and drop the full photo gallery. The count updates automatically after upload.
            </p>
            <MockUploader
              onUploaded={(count) => setPhotoCount((prev) => prev + count)}
            />
            {photoCount > 0 && (
              <div style={{ marginTop: 12, display: "flex", alignItems: "center", gap: 10 }}>
                <span style={{ fontSize: 13, color: "var(--dash-text-muted)" }}>Total delivered:</span>
                <strong style={{ fontSize: 15, color: "var(--dash-text)" }}>{photoCount.toLocaleString()} photos</strong>
                <button
                  onClick={() => setPhotoCount(0)}
                  style={{ marginLeft: "auto", fontSize: 11, background: "none", border: "none", cursor: "pointer", color: "var(--dash-text-muted)", textDecoration: "underline" }}
                >
                  Reset
                </button>
              </div>
            )}
          </div>

          {/* Gallery Design */}
          <div className="mm-dash__card">
            <div className="mm-dash__card-title">Gallery design</div>
            <p className="mm-dash__card-sub" style={{ marginBottom: 20 }}>
              Choose how your client experiences their photos and films.
            </p>

            <div className="mm-dash__label" style={{ marginBottom: 10 }}>Photo layout</div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 10, marginBottom: 24 }}>
              {Object.values(PHOTO_THEMES).map((t) => (
                <ThemeCard
                  key={t.id}
                  id={t.id}
                  label={t.label}
                  description={t.description}
                  active={photoTheme === t.id}
                  onClick={() => setPhotoTheme(t.id)}
                  preview={THEME_PREVIEWS[t.id]}
                />
              ))}
            </div>

            <div className="mm-dash__label" style={{ marginBottom: 10 }}>Film layout</div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 10 }}>
              {Object.values(FILM_THEMES).map((t) => (
                <ThemeCard
                  key={t.id}
                  id={t.id}
                  label={t.label}
                  description={t.description}
                  active={filmTheme === t.id}
                  onClick={() => setFilmTheme(t.id)}
                  preview={THEME_PREVIEWS[t.id]}
                />
              ))}
            </div>
          </div>

          {/* Notes */}
          <div className="mm-dash__card">
            <div className="mm-dash__card-title">Internal notes</div>
            <textarea
              className="mm-dash__input"
              rows={3}
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Notes for the team — not visible to clients."
              style={{ resize: "vertical" }}
            />
          </div>
        </div>

        {/* ── Right column ────────────────────────────────────────── */}
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>

          {/* Status */}
          <div className="mm-dash__card">
            <div className="mm-dash__card-title">Status</div>
            <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
              {STATUS_ORDER.map((s) => {
                const st = GALLERY_STATUSES[s];
                const active = status === s;
                return (
                  <button
                    key={s}
                    onClick={() => setStatus(s)}
                    style={{
                      display: "flex", alignItems: "center", gap: 10,
                      padding: "10px 12px", borderRadius: 7,
                      border: `1px solid ${active ? st.color + "60" : "var(--dash-border)"}`,
                      background: active ? st.bg : "transparent",
                      cursor: "pointer", textAlign: "left", transition: "all 0.15s",
                    }}
                  >
                    <span style={{ width: 8, height: 8, borderRadius: "50%", background: active ? st.color : "var(--dash-border)", flexShrink: 0 }} />
                    <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 13, fontWeight: active ? 600 : 400, color: active ? st.color : "var(--dash-text-muted)" }}>
                      {st.label}
                    </span>
                    {active && <span style={{ marginLeft: "auto", fontSize: 12, color: st.color }}>✓</span>}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Gallery token + link */}
          <div className="mm-dash__card">
            <div className="mm-dash__card-title">Gallery link</div>
            <p className="mm-dash__card-sub" style={{ marginBottom: 12 }}>
              This is the private URL your client uses to access their gallery. Never share it publicly.
            </p>

            <div style={{ marginBottom: 10 }}>
              <label className="mm-dash__label">Token</label>
              <div style={{ display: "flex", gap: 6 }}>
                <input
                  className="mm-dash__input"
                  value={token}
                  onChange={(e) => setToken(e.target.value.toLowerCase().replace(/[^a-z0-9]/g, "").slice(0, 12))}
                  style={{ fontFamily: "monospace", fontSize: 13, letterSpacing: "0.06em" }}
                />
                <button
                  onClick={() => setToken(generateToken())}
                  className="mm-dash__btn mm-dash__btn--ghost"
                  style={{ padding: "4px 10px", fontSize: 11, flexShrink: 0 }}
                  title="Generate new token"
                >
                  New
                </button>
              </div>
            </div>

            <div style={{
              padding: "10px 12px", borderRadius: 6,
              background: "color-mix(in srgb, var(--dash-border) 30%, transparent)",
              fontFamily: "monospace", fontSize: 11, color: "var(--dash-text-muted)",
              wordBreak: "break-all", lineHeight: 1.5, marginBottom: 10,
            }}>
              {url}
            </div>

            <button
              onClick={copyLink}
              className="mm-dash__btn mm-dash__btn--secondary"
              style={{ width: "100%" }}
            >
              {copied ? "✓ Copied!" : "Copy gallery link"}
            </button>
          </div>

          {/* Publish tip */}
          {status !== "delivered" && (
            <div style={{
              padding: "12px 14px", borderRadius: 8,
              border: "1px solid color-mix(in srgb, var(--dash-gold) 20%, transparent)",
              background: "color-mix(in srgb, var(--dash-gold) 6%, transparent)",
              fontSize: 12, color: "var(--dash-text-muted)", lineHeight: 1.6,
            }}>
              <strong style={{ color: "var(--dash-gold)", display: "block", marginBottom: 4 }}>Ready to deliver?</strong>
              Click <strong>Publish &amp; deliver</strong> to mark this gallery as delivered and send the link to the client.
              Make sure the couple name and client email are filled in first.
            </div>
          )}

          {status === "delivered" && (
            <div style={{
              padding: "12px 14px", borderRadius: 8,
              border: "1px solid #6ab18730",
              background: "#6ab18710",
              fontSize: 12, color: "var(--dash-text-muted)", lineHeight: 1.6,
            }}>
              <strong style={{ color: "#6ab187", display: "block", marginBottom: 4 }}>✓ Gallery delivered</strong>
              {existing?.deliveredAt && `Delivered on ${fmtDate(existing.deliveredAt)}. `}
              Client can access their gallery at the link above.
            </div>
          )}
        </div>
      </div>
    </>
  );
}
