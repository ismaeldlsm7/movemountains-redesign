const MAP = {
  Published: "published",
  Draft: "draft",
  "In Editing": "editing",
  "Awaiting Review": "review",
  Scheduled: "scheduled",
};

export default function StatusPill({ status }) {
  const key = MAP[status] || "draft";
  return <span className={`mm-dash__pill mm-dash__pill--${key}`}>{status}</span>;
}
