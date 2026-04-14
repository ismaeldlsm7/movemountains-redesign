import { useState } from "react";
import { forms, formCategories, formStats } from "../data/mockForms";
import StatusPill from "../components/StatusPill";

const categoryColors = {
  booking: "#8BB8E8",
  planning: "#C9A96E",
  purchases: "#8CCB7A",
  feedback: "#E8C45B",
  support: "#E8572A",
};

export default function FormsHub() {
  const [activeCategory, setActiveCategory] = useState("all");
  const [search, setSearch] = useState("");

  const filtered = forms.filter((f) => {
    const matchCat = activeCategory === "all" || f.category === activeCategory;
    const matchSearch =
      !search ||
      f.name.toLowerCase().includes(search.toLowerCase()) ||
      f.description.toLowerCase().includes(search.toLowerCase());
    return matchCat && matchSearch;
  });

  return (
    <>
      {/* Header */}
      <div className="mm-dash__page-header">
        <div>
          <h1 className="mm-dash__page-title">Forms Hub</h1>
          <p className="mm-dash__page-subtitle">
            All {formStats.totalForms} client forms in one place — no more
            scattered JotForm links.
          </p>
        </div>
      </div>

      {/* Problem callout */}
      <div className="mm-dash__preview-banner" style={{ marginBottom: 24 }}>
        <strong>The problem:</strong>
        <span>
          30+ JotForm links scattered across the portal. Clients get lost, submissions get missed.
          This hub centralizes everything — and in Phase 2, replaces JotForm entirely with native forms.
        </span>
      </div>

      {/* Stats row */}
      <div className="mm-dash__metric-grid" style={{ marginBottom: 28 }}>
        <StatCard label="Total Forms" value={formStats.totalForms} />
        <StatCard label="Total Submissions" value={formStats.totalSubmissions.toLocaleString()} />
        <StatCard label="Active Forms" value={formStats.activeFormsCount} />
        <StatCard label="Avg / Form" value={formStats.avgSubmissionsPerForm} />
      </div>

      {/* Filters */}
      <div
        style={{
          display: "flex",
          gap: 12,
          marginBottom: 24,
          flexWrap: "wrap",
          alignItems: "center",
        }}
      >
        <div className="mm-dash__tabs">
          <button
            className={`mm-dash__tab${activeCategory === "all" ? " mm-dash__tab--active" : ""}`}
            onClick={() => setActiveCategory("all")}
          >
            All ({forms.length})
          </button>
          {formCategories.map((cat) => {
            const count = forms.filter((f) => f.category === cat.id).length;
            return (
              <button
                key={cat.id}
                className={`mm-dash__tab${activeCategory === cat.id ? " mm-dash__tab--active" : ""}`}
                onClick={() => setActiveCategory(cat.id)}
              >
                {cat.label} ({count})
              </button>
            );
          })}
        </div>

        <input
          className="mm-dash__input"
          placeholder="Search forms…"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{ maxWidth: 260, marginLeft: "auto" }}
        />
      </div>

      {/* Forms grid */}
      <div className="mm-dash__forms-grid">
        {filtered.map((form) => (
          <FormCard key={form.id} form={form} />
        ))}
        {filtered.length === 0 && (
          <div className="mm-dash__empty" style={{ gridColumn: "1 / -1" }}>
            <div className="mm-dash__empty-title">No forms match</div>
            <p>Try a different category or search term.</p>
          </div>
        )}
      </div>

      {/* Recent submissions */}
      <div className="mm-dash__card" style={{ marginTop: 32 }}>
        <h2 className="mm-dash__card-title">Recent submissions</h2>
        <p className="mm-dash__card-sub">Latest across all forms</p>

        <div className="mm-dash__table-wrap" style={{ border: "none" }}>
          <table className="mm-dash__table">
            <thead>
              <tr>
                <th>Form</th>
                <th>Client</th>
                <th>Date</th>
                <th>Time</th>
              </tr>
            </thead>
            <tbody>
              {formStats.recentSubmissions.map((s) => (
                <tr key={s.id}>
                  <td data-label="Form">
                    <span className="mm-dash__table-title">{s.formName}</span>
                  </td>
                  <td data-label="Client">{s.client}</td>
                  <td data-label="Date" className="is-secondary">
                    {s.date}
                  </td>
                  <td data-label="Time" className="is-secondary">
                    {s.time}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}

function StatCard({ label, value }) {
  return (
    <div className="mm-dash__metric">
      <div className="mm-dash__metric-label">{label}</div>
      <div className="mm-dash__metric-value">{value}</div>
    </div>
  );
}

function FormCard({ form }) {
  const cat = formCategories.find((c) => c.id === form.category);
  const color = categoryColors[form.category] || "var(--dash-text-sec)";

  return (
    <div className="mm-dash__form-card">
      <div className="mm-dash__form-card-head">
        <div
          className="mm-dash__form-card-dot"
          style={{ background: color }}
        />
        <span className="mm-dash__form-card-cat">{cat?.label}</span>
        <StatusPill status={form.status === "active" ? "published" : "draft"} />
      </div>

      <h3 className="mm-dash__form-card-name">{form.name}</h3>
      <p className="mm-dash__form-card-desc">{form.description}</p>

      <div className="mm-dash__form-card-stats">
        <div className="mm-dash__form-card-stat">
          <span className="mm-dash__form-card-stat-val">{form.submissions}</span>
          <span className="mm-dash__form-card-stat-label">submissions</span>
        </div>
        <div className="mm-dash__form-card-stat">
          <span className="mm-dash__form-card-stat-val">{form.lastSubmission}</span>
          <span className="mm-dash__form-card-stat-label">last entry</span>
        </div>
      </div>

      <div className="mm-dash__form-card-actions">
        <button
          className="mm-dash__btn mm-dash__btn--ghost"
          style={{ fontSize: 12, padding: "6px 10px" }}
          onClick={() =>
            window.open(`https://form.jotform.com/${form.jotformId}`, "_blank")
          }
        >
          Open in JotForm ↗
        </button>
        <button
          className="mm-dash__btn mm-dash__btn--ghost"
          style={{ fontSize: 12, padding: "6px 10px" }}
          title="View submissions (Phase 2)"
          disabled
        >
          View submissions
        </button>
      </div>
    </div>
  );
}
