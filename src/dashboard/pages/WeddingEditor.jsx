import { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { weddings, editors, venueOptions } from "../data/mockWeddings";
import MockEditor from "../components/MockEditor";
import MockUploader from "../components/MockUploader";
import { useToast } from "../components/ToastProvider";
import { IconCheck, IconEye } from "../components/Icons";

export default function WeddingEditor() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const { showToast } = useToast();
  const existing = slug ? weddings.find((w) => w.slug === slug) : null;

  const [couple, setCouple] = useState(existing?.couple || "");
  const [date, setDate] = useState(existing?.date || "");
  const [venue, setVenue] = useState(existing?.venue || venueOptions[0]);
  const [editor, setEditor] = useState(existing?.assignedEditor || "");
  const [status, setStatus] = useState(existing?.status || "Draft");
  const [story, setStory] = useState(
    existing
      ? `Some weddings feel like a dream you don't want to wake up from. ${existing.couple}'s day at ${existing.venue} was one of those — a story that deserves more than a gallery.`
      : ""
  );
  const [featured, setFeatured] = useState(existing?.featured || false);
  const [uploadedCount, setUploadedCount] = useState(existing?.galleryCount || 0);

  const save = (publishState) => {
    if (publishState === "publish") {
      showToast({
        title: "Wedding published",
        description: `${couple || "Wedding"} is now live on the site.`,
      });
      setTimeout(() => navigate("/dashboard/weddings"), 600);
    } else {
      showToast({
        title: "Wedding saved",
        description: "Your changes are saved to this draft. (demo)",
      });
    }
  };

  return (
    <>
      <div className="mm-dash__page-header">
        <div>
          <h1 className="mm-dash__page-title">
            {existing ? `Edit · ${existing.couple}` : "New wedding"}
          </h1>
          <p className="mm-dash__page-subtitle">
            {existing
              ? "Update story, gallery, and publishing details."
              : "Create a new wedding entry for the pipeline. Upload gallery once the edit is ready."}
          </p>
        </div>
        <div className="mm-dash__page-actions">
          {existing && existing.status === "Published" && (
            <Link
              to={`/wedding/${existing.slug}`}
              target="_blank"
              rel="noreferrer"
              className="mm-dash__btn mm-dash__btn--secondary"
            >
              <IconEye width={14} height={14} />
              View live
            </Link>
          )}
          <button type="button" onClick={() => save("draft")} className="mm-dash__btn mm-dash__btn--secondary">
            Save draft
          </button>
          <button type="button" onClick={() => save("publish")} className="mm-dash__btn mm-dash__btn--primary">
            <IconCheck width={14} height={14} />
            Publish wedding
          </button>
        </div>
      </div>

      <div className="mm-dash__preview-banner">
        <strong>Prototype mode</strong>
        <span>
          · Gallery uploads, editor assignments, and publishing run on a mock layer. The real Supabase backend lands in Phase 1.
        </span>
      </div>

      <div className="mm-dash__two-col" style={{ gridTemplateColumns: "minmax(0, 2.2fr) minmax(0, 1fr)" }}>
        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
          <div className="mm-dash__card">
            <h2 className="mm-dash__card-title">Couple & details</h2>
            <p className="mm-dash__card-sub">The essentials shown on the wedding page</p>

            <div className="mm-dash__form-row">
              <div className="mm-dash__field">
                <label className="mm-dash__label">Couple</label>
                <input
                  type="text"
                  className="mm-dash__input"
                  value={couple}
                  onChange={(e) => setCouple(e.target.value)}
                  placeholder="Carey & Luke"
                />
              </div>
              <div className="mm-dash__field">
                <label className="mm-dash__label">Wedding date</label>
                <input
                  type="date"
                  className="mm-dash__input"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                />
              </div>
            </div>

            <div className="mm-dash__form-row">
              <div className="mm-dash__field">
                <label className="mm-dash__label">Venue</label>
                <select className="mm-dash__select" value={venue} onChange={(e) => setVenue(e.target.value)}>
                  {venueOptions.map((v) => (
                    <option key={v} value={v}>{v}</option>
                  ))}
                </select>
              </div>
              <div className="mm-dash__field">
                <label className="mm-dash__label">Status</label>
                <select className="mm-dash__select" value={status} onChange={(e) => setStatus(e.target.value)}>
                  <option>Draft</option>
                  <option>In Editing</option>
                  <option>Awaiting Review</option>
                  <option>Scheduled</option>
                  <option>Published</option>
                </select>
              </div>
            </div>

            <div className="mm-dash__form-row mm-dash__form-row--single">
              <label
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 10,
                  fontSize: 13,
                  color: "var(--dash-text-sec)",
                  cursor: "pointer",
                }}
              >
                <input
                  type="checkbox"
                  checked={featured}
                  onChange={(e) => setFeatured(e.target.checked)}
                  style={{ accentColor: "var(--dash-gold)" }}
                />
                <span>
                  <strong style={{ color: "var(--dash-text)" }}>Feature this wedding</strong>
                  {" "}— shows on the homepage hero and portfolio grid
                </span>
              </label>
            </div>
          </div>

          <div className="mm-dash__card">
            <h2 className="mm-dash__card-title">Gallery</h2>
            <p className="mm-dash__card-sub">
              {uploadedCount > 0
                ? `${uploadedCount.toLocaleString()} images uploaded`
                : "Drag in the final edit to attach it to this wedding"}
            </p>
            {uploadedCount > 0 ? (
              <div>
                <div className="mm-dash__gallery-grid">
                  {Array.from({ length: 12 }).map((_, i) => (
                    <div
                      key={i}
                      className="mm-dash__gallery-cell"
                      style={{
                        background:
                          existing?.coverColor || ["#2a2218", "#1e1a14", "#221e1a", "#241e18"][i % 4],
                      }}
                    />
                  ))}
                </div>
                <button
                  type="button"
                  className="mm-dash__btn mm-dash__btn--secondary"
                  style={{ marginTop: 16 }}
                  onClick={() => setUploadedCount(0)}
                >
                  Replace gallery
                </button>
              </div>
            ) : (
              <MockUploader
                onUploaded={(count) => {
                  setUploadedCount(count * 35);
                  showToast({
                    title: "Gallery uploaded",
                    description: `${count * 35} images processed and ready to publish. (demo)`,
                  });
                }}
              />
            )}
          </div>

          <div className="mm-dash__card">
            <h2 className="mm-dash__card-title">The story</h2>
            <p className="mm-dash__card-sub">Editorial copy shown alongside the gallery</p>
            <MockEditor value={story} onChange={setStory} placeholder="How the day unfolded..." />
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
          <div className="mm-dash__card">
            <h3 className="mm-dash__card-title">Assigned editor</h3>
            <p className="mm-dash__card-sub">Who&apos;s leading the edit</p>
            <select
              className="mm-dash__select"
              value={editor}
              onChange={(e) => setEditor(e.target.value)}
            >
              <option value="">— Unassigned —</option>
              {editors.map((ed) => (
                <option key={ed.id} value={ed.name}>
                  {ed.name} · {ed.activeProjects} active
                </option>
              ))}
            </select>
            {editor && (
              <div
                style={{
                  marginTop: 14,
                  padding: 14,
                  background: "var(--dash-surface-alt)",
                  borderRadius: 6,
                  border: "1px solid var(--dash-border)",
                  fontSize: 12,
                  color: "var(--dash-text-sec)",
                  lineHeight: 1.55,
                }}
              >
                <strong style={{ color: "var(--dash-text)", display: "block", marginBottom: 4 }}>
                  {editor}
                </strong>
                {editors.find((e) => e.name === editor)?.role}
                <br />
                Notified via Slack · can review in Wipster
              </div>
            )}
          </div>

          <div className="mm-dash__card">
            <h3 className="mm-dash__card-title">Integrations</h3>
            <p className="mm-dash__card-sub">Linked records (Phase 3)</p>
            {[
              { label: "Dubsado contract", value: "Signed — 2026-02-14", status: "ok" },
              { label: "Wipster project", value: "Created · 14 clips", status: "ok" },
              { label: "Dropbox folder", value: "Auto-synced · 12 GB", status: "ok" },
              { label: "Stripe invoice", value: "Paid · $12,400", status: "ok" },
            ].map((row) => (
              <div
                key={row.label}
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  padding: "10px 0",
                  borderBottom: "1px solid var(--dash-border)",
                  fontSize: 12,
                }}
              >
                <div style={{ color: "var(--dash-text-sec)" }}>{row.label}</div>
                <div style={{ color: "var(--dash-text)", fontWeight: 500 }}>{row.value}</div>
              </div>
            ))}
            <div
              style={{
                marginTop: 12,
                fontSize: 10,
                color: "var(--dash-text-sec)",
                letterSpacing: "0.08em",
                textTransform: "uppercase",
              }}
            >
              Mock data · Phase 3 roadmap
            </div>
          </div>

          <div className="mm-dash__card">
            <h3 className="mm-dash__card-title">Revision history</h3>
            <p className="mm-dash__card-sub">Last 5 changes</p>
            {[
              { who: "You", what: "Updated story copy", when: "Just now" },
              { who: "Elena Rodriguez", what: "Uploaded v3 edit", when: "Yesterday" },
              { who: "Marcus Chen", what: "Left review note", when: "2 days ago" },
              { who: "Elena Rodriguez", what: "Uploaded v2 edit", when: "4 days ago" },
              { who: "You", what: "Created wedding", when: "1 week ago" },
            ].map((r, i) => (
              <div
                key={i}
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  padding: "8px 0",
                  borderBottom: "1px solid var(--dash-border)",
                  fontSize: 12,
                }}
              >
                <div>
                  <div style={{ color: "var(--dash-text)", fontWeight: 500 }}>{r.who}</div>
                  <div style={{ color: "var(--dash-text-sec)" }}>{r.what}</div>
                </div>
                <div style={{ color: "var(--dash-text-sec)", fontSize: 11 }}>{r.when}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div style={{ marginTop: 20 }}>
        <Link to="/dashboard/weddings" className="mm-dash__btn mm-dash__btn--ghost">
          ← Back to all weddings
        </Link>
      </div>
    </>
  );
}
