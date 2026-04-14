// Mock metrics for the dashboard home overview.
// These feed the MetricCard grid and the activity feed.
// Values are hand-tuned to feel realistic for a busy wedding studio.

export const headlineMetrics = [
  {
    id: "active-weddings",
    label: "Active Weddings",
    value: 14,
    delta: "+3 this month",
    trend: "up",
    hint: "Bookings with a confirmed date in the next 12 months",
  },
  {
    id: "posts-published",
    label: "Posts Published",
    value: 9,
    delta: "+2 this week",
    trend: "up",
    hint: "Editorial and real-wedding features on the live blog",
  },
  {
    id: "galleries-delivered",
    label: "Galleries Delivered",
    value: 47,
    delta: "6 pending review",
    trend: "flat",
    hint: "Full galleries delivered to clients in 2026",
  },
  {
    id: "editors-engaged",
    label: "Editors Engaged",
    value: 6,
    delta: "2 onboarding",
    trend: "up",
    hint: "Freelance editors with active projects assigned",
  },
];

export const pipelineMetrics = [
  { id: "pending-inquiries", label: "Pending Inquiries", value: 11 },
  { id: "upcoming-shoots", label: "Upcoming Shoots (30d)", value: 5 },
  { id: "in-editing", label: "In Editing", value: 8 },
  { id: "awaiting-approval", label: "Awaiting Client Approval", value: 3 },
];

export const revenueSnapshot = {
  ytd: "$412,800",
  pipeline: "$184,500",
  bookedThisMonth: "$38,200",
  avgPackage: "$12,400",
};
