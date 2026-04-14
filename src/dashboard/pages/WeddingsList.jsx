import { Link } from "react-router-dom";
import { weddings } from "../data/mockWeddings";
import StatusPill from "../components/StatusPill";
import { IconPlus, IconEye, IconEdit } from "../components/Icons";

const formatDate = (iso) =>
  new Date(iso).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });

export default function WeddingsList() {
  const counts = weddings.reduce((acc, w) => {
    acc[w.status] = (acc[w.status] || 0) + 1;
    return acc;
  }, {});

  return (
    <>
      <div className="mm-dash__page-header">
        <div>
          <h1 className="mm-dash__page-title">Weddings</h1>
          <p className="mm-dash__page-subtitle">
            {weddings.length} bookings in the studio pipeline.
            {" "}
            {counts.Published || 0} published ·{" "}
            {(counts["In Editing"] || 0) + (counts["Awaiting Review"] || 0)} in production ·{" "}
            {counts.Draft || 0} drafts
          </p>
        </div>
        <div className="mm-dash__page-actions">
          <Link to="/dashboard/weddings/new" className="mm-dash__btn mm-dash__btn--primary">
            <IconPlus width={14} height={14} />
            New wedding
          </Link>
        </div>
      </div>

      <div className="mm-dash__table-wrap">
        <table className="mm-dash__table">
          <thead>
            <tr>
              <th style={{ width: "30%" }}>Couple</th>
              <th>Date</th>
              <th>Venue</th>
              <th>Editor</th>
              <th>Gallery</th>
              <th>Status</th>
              <th style={{ textAlign: "right" }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {weddings.map((w) => (
              <tr key={w.id}>
                <td data-label="Couple">
                  <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                    <div
                      style={{
                        width: 38,
                        height: 38,
                        borderRadius: 6,
                        background: w.coverColor,
                        border: "1px solid var(--dash-border)",
                        flexShrink: 0,
                      }}
                    />
                    <div>
                      <span className="mm-dash__table-title">{w.couple}</span>
                      {w.featured && (
                        <span
                          style={{
                            fontSize: 9,
                            letterSpacing: "0.12em",
                            textTransform: "uppercase",
                            color: "var(--dash-gold)",
                            fontWeight: 700,
                            marginLeft: 8,
                          }}
                        >
                          ★ Featured
                        </span>
                      )}
                      <span className="mm-dash__table-sub">/{w.slug}</span>
                    </div>
                  </div>
                </td>
                <td data-label="Date" className="is-secondary">{formatDate(w.date)}</td>
                <td data-label="Venue" className="is-secondary">{w.venue}</td>
                <td data-label="Editor">{w.assignedEditor || <span style={{ color: "var(--dash-text-sec)", fontStyle: "italic" }}>Unassigned</span>}</td>
                <td data-label="Gallery" className="is-secondary">
                  {w.galleryCount > 0 ? `${w.galleryCount.toLocaleString()} images` : "—"}
                </td>
                <td data-label="Status"><StatusPill status={w.status} /></td>
                <td data-label="" className="mm-dash__table-actions">
                  {w.status === "Published" && (
                    <Link
                      to={`/wedding/${w.slug}`}
                      target="_blank"
                      rel="noreferrer"
                      className="mm-dash__btn mm-dash__btn--ghost"
                      style={{ padding: "6px 10px" }}
                    >
                      <IconEye width={14} height={14} />
                      View
                    </Link>
                  )}
                  <Link
                    to={`/dashboard/weddings/${w.slug}`}
                    className="mm-dash__btn mm-dash__btn--ghost"
                    style={{ padding: "6px 10px" }}
                  >
                    <IconEdit width={14} height={14} />
                    Edit
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
