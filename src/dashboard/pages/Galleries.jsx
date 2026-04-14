import { useState } from "react";
import { Link } from "react-router-dom";
import { MOCK_GALLERIES, GALLERY_STATUSES, galleryUrl } from "../data/mockGalleries";
import { useToast } from "../components/ToastProvider";
import { IconPlus, IconEye, IconEdit, IconCamera } from "../components/Icons";
import StatusPill from "../components/StatusPill";

const fmtDate = (iso) =>
  new Date(iso + "T12:00:00").toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });

export default function Galleries() {
  const { showToast } = useToast();
  const [filter, setFilter]   = useState("all");
  const [search, setSearch]   = useState("");
  const [copied, setCopied]   = useState(null);

  const allStatuses = Object.keys(GALLERY_STATUSES);

  const counts = MOCK_GALLERIES.reduce((acc, g) => {
    acc[g.status] = (acc[g.status] || 0) + 1;
    return acc;
  }, {});

  const filtered = MOCK_GALLERIES.filter((g) => {
    const matchStatus = filter === "all" || g.status === filter;
    const q = search.toLowerCase();
    const matchSearch = !q || g.couple.toLowerCase().includes(q) || g.venue.toLowerCase().includes(q) || g.token.includes(q);
    return matchStatus && matchSearch;
  });

  function copyLink(gallery) {
    const url = galleryUrl(gallery.token);
    navigator.clipboard.writeText(url).then(() => {
      setCopied(gallery.id);
      showToast({ title: "Link copied", description: `Gallery link for ${gallery.couple} copied to clipboard.` });
      setTimeout(() => setCopied(null), 2000);
    });
  }

  const delivered = MOCK_GALLERIES.filter((g) => g.status === "delivered").length;
  const inProd    = MOCK_GALLERIES.filter((g) => g.status === "editing" || g.status === "ready").length;
  const draft     = MOCK_GALLERIES.filter((g) => g.status === "draft").length;

  return (
    <>
      <div className="mm-dash__page-header">
        <div>
          <h1 className="mm-dash__page-title">Gallery Deliveries</h1>
          <p className="mm-dash__page-subtitle">
            {MOCK_GALLERIES.length} galleries total · {delivered} delivered · {inProd} in production · {draft} draft
          </p>
        </div>
        <div className="mm-dash__page-actions">
          <Link to="/dashboard/galleries/new" className="mm-dash__btn mm-dash__btn--primary">
            <IconPlus width={14} height={14} />
            New gallery
          </Link>
        </div>
      </div>

      {/* Filters */}
      <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 20, flexWrap: "wrap" }}>
        {/* Status pills */}
        <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
          <button
            onClick={() => setFilter("all")}
            style={{
              padding: "6px 14px", borderRadius: 20, border: "1px solid",
              fontFamily: "inherit", fontSize: 12, fontWeight: 500, cursor: "pointer", transition: "all 0.15s",
              borderColor: filter === "all" ? "var(--dash-gold)" : "var(--dash-border)",
              background:   filter === "all" ? "var(--dash-gold)" : "transparent",
              color:        filter === "all" ? "var(--dash-bg)"   : "var(--dash-text-sec)",
            }}
          >
            All ({MOCK_GALLERIES.length})
          </button>
          {allStatuses.map((s) => {
            const st = GALLERY_STATUSES[s];
            const active = filter === s;
            return (
              <button
                key={s}
                onClick={() => setFilter(s)}
                style={{
                  padding: "6px 14px", borderRadius: 20, border: "1px solid",
                  fontFamily: "inherit", fontSize: 12, fontWeight: 500, cursor: "pointer", transition: "all 0.15s",
                  borderColor: active ? st.color          : "var(--dash-border)",
                  background:  active ? st.bg             : "transparent",
                  color:       active ? st.color          : "var(--dash-text-sec)",
                }}
              >
                {st.label} ({counts[s] || 0})
              </button>
            );
          })}
        </div>

        {/* Search */}
        <div className="mm-dash__search-wrap" style={{ marginLeft: "auto" }}>
          <input
            className="mm-dash__search"
            placeholder="Search couple, venue, token…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </div>

      <div className="mm-dash__table-wrap">
        <table className="mm-dash__table">
          <thead>
            <tr>
              <th style={{ width: "22%" }}>Couple</th>
              <th>Wedding date</th>
              <th>Venue</th>
              <th style={{ textAlign: "center" }}>Photos</th>
              <th style={{ textAlign: "center" }}>Films</th>
              <th>Status</th>
              <th>Token</th>
              <th style={{ textAlign: "right" }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filtered.length === 0 && (
              <tr>
                <td colSpan={8} style={{ textAlign: "center", padding: "40px 0", color: "var(--dash-text-muted)", fontStyle: "italic" }}>
                  No galleries match your filter.
                </td>
              </tr>
            )}
            {filtered.map((g) => {
              const st = GALLERY_STATUSES[g.status];
              return (
                <tr key={g.id}>
                  {/* Couple */}
                  <td>
                    <div style={{ fontWeight: 600, color: "var(--dash-text)" }}>{g.couple}</div>
                    <div style={{ fontSize: 11, color: "var(--dash-text-muted)", marginTop: 2 }}>{g.venue}</div>
                  </td>

                  {/* Date */}
                  <td style={{ color: "var(--dash-text-muted)", fontSize: 13 }}>
                    {fmtDate(g.weddingDate)}
                    {g.deliveredAt && (
                      <div style={{ fontSize: 10, color: "var(--dash-text-muted)", marginTop: 2, opacity: 0.6 }}>
                        Delivered {fmtDate(g.deliveredAt)}
                      </div>
                    )}
                  </td>

                  {/* Venue */}
                  <td style={{ fontSize: 13, color: "var(--dash-text-muted)" }}>{g.location}</td>

                  {/* Photos */}
                  <td style={{ textAlign: "center" }}>
                    {g.photoCount > 0 ? (
                      <span style={{ fontWeight: 600, color: "var(--dash-text)", fontSize: 13 }}>{g.photoCount.toLocaleString()}</span>
                    ) : (
                      <span style={{ color: "var(--dash-text-muted)", fontSize: 12, opacity: 0.5 }}>—</span>
                    )}
                  </td>

                  {/* Films */}
                  <td style={{ textAlign: "center" }}>
                    {g.films.length > 0 ? (
                      <span style={{ fontWeight: 600, color: "var(--dash-text)", fontSize: 13 }}>{g.films.length}</span>
                    ) : (
                      <span style={{ color: "var(--dash-text-muted)", fontSize: 12, opacity: 0.5 }}>—</span>
                    )}
                  </td>

                  {/* Status */}
                  <td>
                    <span style={{
                      display: "inline-block", padding: "3px 10px", borderRadius: 20,
                      fontSize: 11, fontWeight: 700,
                      color: st.color, background: st.bg,
                      border: `1px solid ${st.color}30`,
                      textTransform: "uppercase", letterSpacing: "0.08em",
                    }}>
                      {st.label}
                    </span>
                  </td>

                  {/* Token + copy */}
                  <td>
                    <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                      <code style={{
                        fontSize: 11, fontFamily: "monospace", padding: "3px 7px",
                        background: "var(--dash-surface-2, color-mix(in srgb, var(--dash-border) 30%, transparent))",
                        borderRadius: 4, color: "var(--dash-text-muted)", letterSpacing: "0.06em",
                      }}>
                        {g.token}
                      </code>
                      <button
                        onClick={() => copyLink(g)}
                        title="Copy gallery link"
                        style={{
                          background: "none", border: "1px solid var(--dash-border)", borderRadius: 4,
                          padding: "3px 7px", cursor: "pointer", fontSize: 10,
                          color: copied === g.id ? "var(--dash-gold)" : "var(--dash-text-muted)",
                          transition: "all 0.15s",
                        }}
                      >
                        {copied === g.id ? "✓ Copied" : "Copy link"}
                      </button>
                    </div>
                  </td>

                  {/* Actions */}
                  <td style={{ textAlign: "right" }}>
                    <div style={{ display: "flex", gap: 6, justifyContent: "flex-end" }}>
                      {g.status === "delivered" && (
                        <a
                          href={`/g/${g.token}`}
                          target="_blank"
                          rel="noreferrer"
                          className="mm-dash__btn mm-dash__btn--ghost"
                          style={{ padding: "4px 10px", fontSize: 12 }}
                        >
                          <IconEye width={12} height={12} />
                          Preview
                        </a>
                      )}
                      <Link
                        to={`/dashboard/galleries/${g.id}`}
                        className="mm-dash__btn mm-dash__btn--ghost"
                        style={{ padding: "4px 10px", fontSize: 12 }}
                      >
                        <IconEdit width={12} height={12} />
                        Edit
                      </Link>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </>
  );
}
