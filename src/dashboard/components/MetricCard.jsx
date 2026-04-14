export default function MetricCard({ label, value, delta, hint, trend = "flat" }) {
  return (
    <div className="mm-dash__metric">
      <div className="mm-dash__metric-label">{label}</div>
      <div className="mm-dash__metric-value">{value}</div>
      {delta && (
        <div
          className={
            "mm-dash__metric-delta" +
            (trend === "up" ? " mm-dash__metric-delta--up" : "")
          }
        >
          {delta}
        </div>
      )}
      {hint && <div className="mm-dash__metric-hint">{hint}</div>}
    </div>
  );
}
