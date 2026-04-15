import { useState } from "react";
import { MOCK_LINKS, LINK_STATS, PUBLIC_URL, SHARE_PLATFORMS, buildUTM } from "../data/mockLinks";
import {
  IconToggleOn,
  IconToggleOff,
  IconArrowUp,
  IconArrowDown,
  IconCopy,
  IconExternalLink,
  IconPlus,
  IconEdit,
} from "../components/Icons";

const ICON_LABELS = {
  portfolio: "Portfolio",
  calendar: "Calendar",
  dollar: "Pricing",
  camera: "Camera",
  film: "Film",
  globe: "Globe",
  heart: "Heart",
  instagram: "Instagram",
  vimeo: "Vimeo",
  book: "Book",
};

export default function LinkInBio() {
  const [links, setLinks] = useState(
    [...MOCK_LINKS].sort((a, b) => a.order - b.order)
  );
  const [addingNew, setAddingNew] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [copied, setCopied] = useState(false);
  const [copiedPlatform, setCopiedPlatform] = useState(null);
  const [newForm, setNewForm] = useState({ label: "", url: "", icon: "globe" });
  const [editForm, setEditForm] = useState({ label: "", url: "", icon: "globe" });
  const [pendingDelete, setPendingDelete] = useState(null);

  const activeCount = links.filter((l) => l.enabled).length;
  const totalClicks = links.reduce((sum, l) => sum + l.clicks, 0);

  /* ── Copy public URL ── */
  const handleCopy = () => {
    navigator.clipboard.writeText(PUBLIC_URL);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  /* ── Copy UTM link per platform ── */
  const handleCopyPlatform = (platform) => {
    navigator.clipboard.writeText(buildUTM(platform));
    setCopiedPlatform(platform.id);
    setTimeout(() => setCopiedPlatform((cur) => (cur === platform.id ? null : cur)), 2000);
  };

  /* ── Toggle enabled ── */
  const toggleEnabled = (id) =>
    setLinks((prev) =>
      prev.map((l) => (l.id === id ? { ...l, enabled: !l.enabled } : l))
    );

  /* ── Reorder ── */
  const moveUp = (index) => {
    if (index === 0) return;
    setLinks((prev) => {
      const next = [...prev];
      [next[index - 1], next[index]] = [next[index], next[index - 1]];
      return next.map((l, i) => ({ ...l, order: i + 1 }));
    });
  };

  const moveDown = (index) => {
    setLinks((prev) => {
      if (index === prev.length - 1) return prev;
      const next = [...prev];
      [next[index], next[index + 1]] = [next[index + 1], next[index]];
      return next.map((l, i) => ({ ...l, order: i + 1 }));
    });
  };

  /* ── Delete (2-click confirm) ── */
  const handleDelete = (id) => {
    if (pendingDelete === id) {
      setLinks((prev) => prev.filter((l) => l.id !== id));
      setPendingDelete(null);
    } else {
      setPendingDelete(id);
      setTimeout(() => setPendingDelete((cur) => (cur === id ? null : cur)), 3000);
    }
  };

  /* ── Edit ── */
  const startEdit = (link) => {
    setEditingId(link.id);
    setEditForm({ label: link.label, url: link.url, icon: link.icon });
  };

  const saveEdit = (id) => {
    setLinks((prev) =>
      prev.map((l) =>
        l.id === id ? { ...l, label: editForm.label, url: editForm.url, icon: editForm.icon } : l
      )
    );
    setEditingId(null);
  };

  /* ── Add new link ── */
  const handleAdd = () => {
    if (!newForm.label || !newForm.url) return;
    const id = "lnk-" + Date.now();
    setLinks((prev) => [
      { id, ...newForm, enabled: true, order: 1, clicks: 0 },
      ...prev.map((l) => ({ ...l, order: l.order + 1 })),
    ]);
    setNewForm({ label: "", url: "", icon: "globe" });
    setAddingNew(false);
  };

  return (
    <>
      {/* Page header */}
      <div className="mm-dash__page-header">
        <div>
          <h1 className="mm-dash__page-title">Link in Bio</h1>
          <p className="mm-dash__page-subtitle">
            Your branded link page for Instagram — manage every link from here.
          </p>
        </div>
        <div className="mm-dash__page-actions">
          <button
            className="mm-dash__btn mm-dash__btn--secondary"
            onClick={handleCopy}
            style={{ display: "flex", alignItems: "center", gap: 6 }}
          >
            <IconCopy width={14} height={14} />
            {copied ? "Copied!" : "Copy URL"}
          </button>
          <a
            href="/link"
            target="_blank"
            rel="noopener noreferrer"
            className="mm-dash__btn mm-dash__btn--primary"
            style={{ display: "flex", alignItems: "center", gap: 6, textDecoration: "none" }}
          >
            <IconExternalLink width={14} height={14} />
            Preview page
          </a>
        </div>
      </div>

      {/* Banner */}
      <div className="mm-dash__preview-banner" style={{ marginBottom: 24 }}>
        <strong>Replacing Linktree:</strong>
        <span>
          Your custom link page lives at{" "}
          <span style={{ color: "var(--dash-gold)", fontWeight: 600 }}>
            mmc.social/links
          </span>
          {" "}— fully on-brand, no third-party branding. Enable or disable links anytime without touching code.
        </span>
      </div>

      {/* Stats */}
      <div className="mm-dash__metric-grid" style={{ marginBottom: 28 }}>
        <div className="mm-dash__metric">
          <div className="mm-dash__metric-label">Total Links</div>
          <div className="mm-dash__metric-value">{links.length}</div>
        </div>
        <div className="mm-dash__metric">
          <div className="mm-dash__metric-label">Active</div>
          <div className="mm-dash__metric-value">{activeCount}</div>
        </div>
        <div className="mm-dash__metric">
          <div className="mm-dash__metric-label">Total Clicks</div>
          <div className="mm-dash__metric-value">{totalClicks.toLocaleString()}</div>
        </div>
      </div>

      {/* Share links with UTM tracking */}
      <div className="mm-dash__card" style={{ marginBottom: 24 }}>
        <h2 className="mm-dash__card-title" style={{ marginBottom: 4 }}>
          Share links
        </h2>
        <p className="mm-dash__card-sub" style={{ marginBottom: 16 }}>
          Each URL has UTMs pre-built — paste the right one into each platform's bio.
          Analytics will show exactly where your traffic comes from.
        </p>
        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          {SHARE_PLATFORMS.map((platform) => {
            const url = buildUTM(platform);
            const isCopied = copiedPlatform === platform.id;
            return (
              <div
                key={platform.id}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 12,
                  padding: "11px 14px",
                  background: "var(--dash-bg)",
                  border: "1px solid var(--dash-border)",
                  borderRadius: 8,
                }}
              >
                <span
                  style={{
                    fontSize: 12,
                    fontWeight: 700,
                    color: "var(--dash-text)",
                    minWidth: 80,
                    letterSpacing: "0.02em",
                  }}
                >
                  {platform.label}
                </span>
                <span
                  style={{
                    flex: 1,
                    fontSize: 11,
                    color: "var(--dash-text-sec)",
                    fontFamily: "monospace",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    whiteSpace: "nowrap",
                  }}
                  title={url}
                >
                  {url}
                </span>
                <button
                  className={`mm-dash__btn${isCopied ? " mm-dash__btn--primary" : " mm-dash__btn--secondary"}`}
                  onClick={() => handleCopyPlatform(platform)}
                  style={{ display: "flex", alignItems: "center", gap: 5, flexShrink: 0, fontSize: 12 }}
                >
                  <IconCopy width={12} height={12} />
                  {isCopied ? "Copied!" : "Copy"}
                </button>
              </div>
            );
          })}
        </div>
        <p style={{ fontSize: 11, color: "var(--dash-text-sec)", marginTop: 12, lineHeight: 1.5 }}>
          <strong style={{ color: "var(--dash-text)" }}>How it works:</strong>{" "}
          Instagram (and other platforms) don't add UTMs automatically — but if you paste a URL that already
          includes them, every click carries the tracking data into Google Analytics.
          This is the same technique Linktree uses on their own bio URL.
        </p>
      </div>

      {/* Links card */}
      <div className="mm-dash__card">
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            marginBottom: 16,
          }}
        >
          <div>
            <h2 className="mm-dash__card-title" style={{ marginBottom: 2 }}>
              Links
            </h2>
            <p className="mm-dash__card-sub">
              Drag order with ↑↓ — changes apply immediately to the public page.
            </p>
          </div>
          <button
            className="mm-dash__btn mm-dash__btn--primary"
            onClick={() => { setAddingNew(true); setEditingId(null); }}
            style={{ display: "flex", alignItems: "center", gap: 6, flexShrink: 0 }}
          >
            <IconPlus width={14} height={14} />
            Add link
          </button>
        </div>

        {/* Add link form */}
        {addingNew && (
          <div
            style={{
              background: "var(--dash-bg)",
              border: "1px solid var(--dash-border)",
              borderRadius: 10,
              padding: "16px 18px",
              marginBottom: 16,
              display: "flex",
              flexDirection: "column",
              gap: 12,
            }}
          >
            <div style={{ fontWeight: 600, fontSize: 13, color: "var(--dash-text)" }}>
              New link
            </div>
            <div className="mm-dash__form-row">
              <div className="mm-dash__field" style={{ flex: 2 }}>
                <label className="mm-dash__label">Label</label>
                <input
                  className="mm-dash__input"
                  placeholder="e.g. Our Portfolio"
                  value={newForm.label}
                  onChange={(e) => setNewForm((f) => ({ ...f, label: e.target.value }))}
                />
              </div>
              <div className="mm-dash__field" style={{ flex: 3 }}>
                <label className="mm-dash__label">URL</label>
                <input
                  className="mm-dash__input"
                  placeholder="e.g. /portfolio or https://..."
                  value={newForm.url}
                  onChange={(e) => setNewForm((f) => ({ ...f, url: e.target.value }))}
                />
              </div>
              <div className="mm-dash__field">
                <label className="mm-dash__label">Icon</label>
                <select
                  className="mm-dash__select"
                  value={newForm.icon}
                  onChange={(e) => setNewForm((f) => ({ ...f, icon: e.target.value }))}
                >
                  {Object.entries(ICON_LABELS).map(([val, label]) => (
                    <option key={val} value={val}>{label}</option>
                  ))}
                </select>
              </div>
            </div>
            <div style={{ display: "flex", gap: 8 }}>
              <button className="mm-dash__btn mm-dash__btn--primary" onClick={handleAdd}>
                Add link
              </button>
              <button
                className="mm-dash__btn"
                onClick={() => { setAddingNew(false); setNewForm({ label: "", url: "", icon: "globe" }); }}
              >
                Cancel
              </button>
            </div>
          </div>
        )}

        {/* Links table */}
        <div className="mm-dash__table-wrap">
          <table className="mm-dash__table">
            <thead>
              <tr>
                <th style={{ width: 64 }}>Order</th>
                <th>Label</th>
                <th>URL</th>
                <th style={{ width: 90 }}>Status</th>
                <th style={{ width: 80 }}>Clicks</th>
                <th style={{ width: 130 }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {links.map((link, index) => (
                <LinkRow
                  key={link.id}
                  link={link}
                  index={index}
                  total={links.length}
                  isEditing={editingId === link.id}
                  editForm={editForm}
                  setEditForm={setEditForm}
                  isPendingDelete={pendingDelete === link.id}
                  onToggle={() => toggleEnabled(link.id)}
                  onMoveUp={() => moveUp(index)}
                  onMoveDown={() => moveDown(index)}
                  onDelete={() => handleDelete(link.id)}
                  onEdit={() => startEdit(link)}
                  onSaveEdit={() => saveEdit(link.id)}
                  onCancelEdit={() => setEditingId(null)}
                />
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Insight */}
      <div className="mm-dash__card" style={{ marginTop: 32 }}>
        <h2 className="mm-dash__card-title">Why own your link page</h2>
        <p className="mm-dash__card-sub">The advantage over Linktree</p>
        <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
          <InsightRow
            title="100% on-brand experience"
            desc="Visitors stay within movemountainsco.com — your domain, your colors, your logo. No Linktree branding or upsell prompts."
          />
          <InsightRow
            title="Future: click analytics per link"
            desc="Track which links drive the most traffic directly in this dashboard — no third-party analytics account needed."
          />
          <InsightRow
            title="SEO juice stays on your domain"
            desc="Every Instagram click that lands on /link is a visit to your own site, not Linktree's CDN. Better for domain authority."
          />
        </div>
      </div>
    </>
  );
}

function LinkRow({
  link, index, total, isEditing, editForm, setEditForm,
  isPendingDelete, onToggle, onMoveUp, onMoveDown,
  onDelete, onEdit, onSaveEdit, onCancelEdit,
}) {
  if (isEditing) {
    return (
      <>
        <tr style={{ background: "var(--dash-bg)" }}>
          <td colSpan={6} style={{ padding: "14px 12px" }}>
            <div style={{ display: "flex", gap: 10, flexWrap: "wrap", alignItems: "flex-end" }}>
              <div className="mm-dash__field" style={{ flex: 2, minWidth: 140 }}>
                <label className="mm-dash__label">Label</label>
                <input
                  className="mm-dash__input"
                  value={editForm.label}
                  onChange={(e) => setEditForm((f) => ({ ...f, label: e.target.value }))}
                />
              </div>
              <div className="mm-dash__field" style={{ flex: 3, minWidth: 200 }}>
                <label className="mm-dash__label">URL</label>
                <input
                  className="mm-dash__input"
                  value={editForm.url}
                  onChange={(e) => setEditForm((f) => ({ ...f, url: e.target.value }))}
                />
              </div>
              <div className="mm-dash__field">
                <label className="mm-dash__label">Icon</label>
                <select
                  className="mm-dash__select"
                  value={editForm.icon}
                  onChange={(e) => setEditForm((f) => ({ ...f, icon: e.target.value }))}
                >
                  {Object.entries(ICON_LABELS).map(([val, label]) => (
                    <option key={val} value={val}>{label}</option>
                  ))}
                </select>
              </div>
              <div style={{ display: "flex", gap: 8 }}>
                <button className="mm-dash__btn mm-dash__btn--primary" onClick={onSaveEdit}>
                  Save
                </button>
                <button className="mm-dash__btn" onClick={onCancelEdit}>
                  Cancel
                </button>
              </div>
            </div>
          </td>
        </tr>
      </>
    );
  }

  return (
    <tr style={{ opacity: link.enabled ? 1 : 0.55 }}>
      {/* Order arrows */}
      <td data-label="Order">
        <div style={{ display: "flex", gap: 2 }}>
          <button
            onClick={onMoveUp}
            disabled={index === 0}
            className="mm-dash__btn"
            style={{ padding: "3px 5px", opacity: index === 0 ? 0.25 : 1, cursor: index === 0 ? "not-allowed" : "pointer" }}
            title="Move up"
          >
            <IconArrowUp width={13} height={13} />
          </button>
          <button
            onClick={onMoveDown}
            disabled={index === total - 1}
            className="mm-dash__btn"
            style={{ padding: "3px 5px", opacity: index === total - 1 ? 0.25 : 1, cursor: index === total - 1 ? "not-allowed" : "pointer" }}
            title="Move down"
          >
            <IconArrowDown width={13} height={13} />
          </button>
        </div>
      </td>

      {/* Label */}
      <td data-label="Label">
        <span className="mm-dash__table-title">{link.label}</span>
      </td>

      {/* URL */}
      <td data-label="URL" className="is-secondary" style={{ fontSize: 12 }}>
        <span
          style={{
            display: "inline-block",
            maxWidth: 220,
            overflow: "hidden",
            textOverflow: "ellipsis",
            whiteSpace: "nowrap",
            color: "var(--dash-text-sec)",
          }}
          title={link.url}
        >
          {link.url}
        </span>
      </td>

      {/* Status toggle */}
      <td data-label="Status">
        <button
          onClick={onToggle}
          title={link.enabled ? "Disable link" : "Enable link"}
          style={{
            background: "none",
            border: "none",
            cursor: "pointer",
            padding: 0,
            display: "flex",
            alignItems: "center",
            gap: 6,
            color: link.enabled ? "var(--dash-gold)" : "var(--dash-text-sec)",
          }}
        >
          {link.enabled ? (
            <IconToggleOn width={24} height={24} />
          ) : (
            <IconToggleOff width={24} height={24} />
          )}
          <span style={{ fontSize: 11, fontWeight: 600, letterSpacing: "0.05em" }}>
            {link.enabled ? "On" : "Off"}
          </span>
        </button>
      </td>

      {/* Clicks */}
      <td data-label="Clicks" className="is-secondary">
        {link.clicks.toLocaleString()}
      </td>

      {/* Actions */}
      <td data-label="Actions">
        <div className="mm-dash__table-actions">
          <button
            className="mm-dash__btn"
            onClick={onEdit}
            style={{ display: "flex", alignItems: "center", gap: 4, fontSize: 12 }}
          >
            <IconEdit width={13} height={13} />
            Edit
          </button>
          <button
            className={`mm-dash__btn${isPendingDelete ? " mm-dash__btn--danger" : ""}`}
            onClick={onDelete}
            style={{ fontSize: 12 }}
          >
            {isPendingDelete ? "Confirm?" : "Delete"}
          </button>
        </div>
      </td>
    </tr>
  );
}

function InsightRow({ title, desc }) {
  return (
    <div style={{ paddingBottom: 14, borderBottom: "1px solid var(--dash-border)" }}>
      <div style={{ fontSize: 14, fontWeight: 600, color: "var(--dash-text)", marginBottom: 4 }}>
        {title}
      </div>
      <div style={{ fontSize: 13, color: "var(--dash-text-sec)", lineHeight: 1.5 }}>
        {desc}
      </div>
    </div>
  );
}
