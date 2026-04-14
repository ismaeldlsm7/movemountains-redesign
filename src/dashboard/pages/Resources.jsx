import { resources, resourceStats } from "../data/mockResources";

const typeConfig = {
  guide: { label: "Guide", color: "#C9A96E" },
  tutorial: { label: "Tutorial", color: "#8BB8E8" },
  video: { label: "Video", color: "#625DF5" },
  external: { label: "External", color: "#00C4CC" },
  page: { label: "Page", color: "#8CCB7A" },
};

export default function Resources() {
  return (
    <>
      <div className="mm-dash__page-header">
        <div>
          <h1 className="mm-dash__page-title">Resources</h1>
          <p className="mm-dash__page-subtitle">
            Client-facing guides, tutorials, and reference materials — all
            managed from here.
          </p>
        </div>
        <div className="mm-dash__page-actions">
          <button className="mm-dash__btn mm-dash__btn--primary" disabled title="Phase 2">
            New resource
          </button>
        </div>
      </div>

      <div className="mm-dash__metric-grid" style={{ marginBottom: 28 }}>
        <div className="mm-dash__metric">
          <div className="mm-dash__metric-label">Total Resources</div>
          <div className="mm-dash__metric-value">{resourceStats.totalResources}</div>
        </div>
        <div className="mm-dash__metric">
          <div className="mm-dash__metric-label">Total Views</div>
          <div className="mm-dash__metric-value">
            {resourceStats.totalViews.toLocaleString()}
          </div>
        </div>
        <div className="mm-dash__metric">
          <div className="mm-dash__metric-label">Guides</div>
          <div className="mm-dash__metric-value">{resourceStats.guides}</div>
        </div>
        <div className="mm-dash__metric">
          <div className="mm-dash__metric-label">Videos</div>
          <div className="mm-dash__metric-value">{resourceStats.videos}</div>
        </div>
      </div>

      {/* Resources table */}
      <div className="mm-dash__table-wrap">
        <table className="mm-dash__table">
          <thead>
            <tr>
              <th>Resource</th>
              <th>Type</th>
              <th>Location</th>
              <th>Views</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {resources.map((r) => {
              const tc = typeConfig[r.type] || typeConfig.guide;
              const isExternal = r.type === "video" || r.type === "external";
              return (
                <tr key={r.id}>
                  <td data-label="">
                    <span className="mm-dash__table-title">{r.title}</span>
                    <span className="mm-dash__table-sub">{r.description}</span>
                  </td>
                  <td data-label="Type">
                    <span
                      className="mm-dash__pill"
                      style={{
                        color: tc.color,
                        borderColor: `${tc.color}55`,
                        background: `${tc.color}14`,
                      }}
                    >
                      {tc.label}
                    </span>
                  </td>
                  <td data-label="Location" className="is-secondary" style={{ fontSize: 12 }}>
                    {isExternal ? (
                      <span style={{ color: "var(--dash-ember)" }}>
                        External ↗
                      </span>
                    ) : (
                      <span>Internal page</span>
                    )}
                  </td>
                  <td data-label="Views" className="is-secondary">
                    {r.views.toLocaleString()}
                  </td>
                  <td data-label="Status">
                    <span className="mm-dash__pill mm-dash__pill--published">
                      Published
                    </span>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Insight card */}
      <div className="mm-dash__card" style={{ marginTop: 32 }}>
        <h2 className="mm-dash__card-title">Opportunity</h2>
        <p className="mm-dash__card-sub">What the Command Center unlocks</p>
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          <InsightRow
            title="Replace Loom with native tutorials"
            desc="Embed video walkthroughs directly in the portal — no more leaving the site."
          />
          <InsightRow
            title="Track engagement per resource"
            desc="See which guides clients actually read vs. skip. Optimize onboarding accordingly."
          />
          <InsightRow
            title="Contextual resources"
            desc="Surface the right guide at the right time — timeline guide appears after booking, not before."
          />
        </div>
      </div>
    </>
  );
}

function InsightRow({ title, desc }) {
  return (
    <div
      style={{
        paddingBottom: 14,
        borderBottom: "1px solid var(--dash-border)",
      }}
    >
      <div
        style={{
          fontSize: 14,
          fontWeight: 600,
          color: "var(--dash-text)",
          marginBottom: 4,
        }}
      >
        {title}
      </div>
      <div style={{ fontSize: 13, color: "var(--dash-text-sec)", lineHeight: 1.5 }}>
        {desc}
      </div>
    </div>
  );
}
