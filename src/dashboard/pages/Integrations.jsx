import { integrations, integrationStats } from "../data/mockIntegrations";

const statusConfig = {
  connected: { label: "Connected", color: "#8CCB7A", bg: "rgba(140, 203, 122, 0.08)", border: "rgba(140, 203, 122, 0.35)" },
  not_connected: { label: "Not connected", color: "var(--dash-text-sec)", bg: "transparent", border: "var(--dash-border)" },
  planned: { label: "Phase 2", color: "#8BB8E8", bg: "rgba(139, 184, 232, 0.08)", border: "rgba(139, 184, 232, 0.35)" },
};

export default function Integrations() {
  return (
    <>
      <div className="mm-dash__page-header">
        <div>
          <h1 className="mm-dash__page-title">Integrations</h1>
          <p className="mm-dash__page-subtitle">
            Every external tool the studio relies on — connected and visible in
            one place.
          </p>
        </div>
      </div>

      <div className="mm-dash__preview-banner" style={{ marginBottom: 24 }}>
        <strong>Why this matters:</strong>
        <span>
          Today MMC uses 7+ disconnected platforms. Clients bounce between
          JotForm, Stripe, Tave, Pic-Time, and Loom links. The Command Center
          unifies these — reducing friction for both clients and your team.
        </span>
      </div>

      {/* Stats */}
      <div className="mm-dash__metric-grid" style={{ marginBottom: 28 }}>
        <div className="mm-dash__metric">
          <div className="mm-dash__metric-label">Connected</div>
          <div className="mm-dash__metric-value">{integrationStats.connected}</div>
        </div>
        <div className="mm-dash__metric">
          <div className="mm-dash__metric-label">Planned</div>
          <div className="mm-dash__metric-value">{integrationStats.planned}</div>
        </div>
        <div className="mm-dash__metric">
          <div className="mm-dash__metric-label">Not Connected</div>
          <div className="mm-dash__metric-value">{integrationStats.notConnected}</div>
        </div>
        <div className="mm-dash__metric">
          <div className="mm-dash__metric-label">Total Platforms</div>
          <div className="mm-dash__metric-value">{integrationStats.total}</div>
        </div>
      </div>

      {/* Integration cards */}
      <div className="mm-dash__integrations-grid">
        {integrations.map((integ) => (
          <IntegrationCard key={integ.id} integ={integ} />
        ))}
      </div>

      {/* Data flow diagram */}
      <div className="mm-dash__card" style={{ marginTop: 32 }}>
        <h2 className="mm-dash__card-title">Data flow — before vs. after</h2>
        <p className="mm-dash__card-sub">
          How the Command Center simplifies the client experience
        </p>

        <div className="mm-dash__flow-compare">
          <div className="mm-dash__flow-col">
            <div className="mm-dash__flow-label mm-dash__flow-label--before">
              Current state
            </div>
            <div className="mm-dash__flow-list">
              <FlowItem text="Client visits portal" />
              <FlowArrow />
              <FlowItem text="Clicks JotForm link (1 of 30+)" warn />
              <FlowArrow />
              <FlowItem text="Leaves MMC website" warn />
              <FlowArrow />
              <FlowItem text="Fills form on JotForm.com" />
              <FlowArrow />
              <FlowItem text="Sean checks JotForm dashboard separately" warn />
            </div>
          </div>

          <div className="mm-dash__flow-col">
            <div className="mm-dash__flow-label mm-dash__flow-label--after">
              With Command Center
            </div>
            <div className="mm-dash__flow-list">
              <FlowItem text="Client visits portal" />
              <FlowArrow />
              <FlowItem text="Fills native form on MMC site" good />
              <FlowArrow />
              <FlowItem text="Data saved to Supabase" good />
              <FlowArrow />
              <FlowItem text="Sean sees it instantly in dashboard" good />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

function IntegrationCard({ integ }) {
  const cfg = statusConfig[integ.status];

  return (
    <div className="mm-dash__integ-card">
      <div className="mm-dash__integ-card-head">
        <div
          className="mm-dash__integ-logo"
          style={{ background: integ.color }}
        >
          {integ.logo}
        </div>
        <div>
          <h3 className="mm-dash__integ-name">{integ.name}</h3>
          <span className="mm-dash__integ-category">{integ.category}</span>
        </div>
        <span
          className="mm-dash__integ-status"
          style={{
            color: cfg.color,
            borderColor: cfg.border,
            background: cfg.bg,
          }}
        >
          {cfg.label}
        </span>
      </div>

      <p className="mm-dash__integ-desc">{integ.description}</p>

      <div className="mm-dash__integ-footer">
        <div className="mm-dash__integ-stat">
          <span className="mm-dash__integ-stat-label">{integ.stats.label}</span>
          <span className="mm-dash__integ-stat-value">{integ.stats.value}</span>
        </div>
        <div className="mm-dash__integ-stat">
          <span className="mm-dash__integ-stat-label">Last sync</span>
          <span className="mm-dash__integ-stat-value">{integ.lastSync}</span>
        </div>
      </div>
    </div>
  );
}

function FlowItem({ text, warn, good }) {
  let style = {};
  if (warn) style = { borderColor: "rgba(232, 87, 42, 0.4)", color: "var(--dash-ember)" };
  if (good) style = { borderColor: "rgba(140, 203, 122, 0.4)", color: "#8CCB7A" };

  return (
    <div className="mm-dash__flow-item" style={style}>
      {text}
    </div>
  );
}

function FlowArrow() {
  return (
    <div style={{ textAlign: "center", color: "var(--dash-text-sec)", fontSize: 14, lineHeight: 1 }}>
      ↓
    </div>
  );
}
