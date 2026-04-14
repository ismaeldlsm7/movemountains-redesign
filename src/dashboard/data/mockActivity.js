// Mock recent activity feed for the dashboard home.
// Hardcoded with realistic names, actions, and timestamps.

export const recentActivity = [
  {
    id: 1,
    actor: "Tiahna Lynn",
    action: "published a new blog post",
    target: "Carey & Luke — A Gilded Age Love Story at Rosecliff",
    timestamp: "2 hours ago",
    type: "publish",
  },
  {
    id: 2,
    actor: "Marcus Chen",
    action: "uploaded gallery for",
    target: "Howard & Shreya — OceanCliff",
    timestamp: "5 hours ago",
    type: "upload",
  },
  {
    id: 3,
    actor: "You",
    action: "assigned",
    target: "Elena Rodriguez to Anthony & Justine's wedding",
    timestamp: "Yesterday",
    type: "assign",
  },
  {
    id: 4,
    actor: "Elena Rodriguez",
    action: "submitted draft edit for review",
    target: "Bennett & Marie — Vineyard Wedding",
    timestamp: "Yesterday",
    type: "review",
  },
  {
    id: 5,
    actor: "Tiahna Lynn",
    action: "scheduled post",
    target: "10 Questions to Ask Your Wedding Photographer",
    timestamp: "2 days ago",
    type: "schedule",
  },
  {
    id: 6,
    actor: "System",
    action: "synced Dubsado invoice",
    target: "INV-2026-0142 — Paid ($12,400)",
    timestamp: "2 days ago",
    type: "integration",
  },
  {
    id: 7,
    actor: "Marcus Chen",
    action: "commented on",
    target: "Jordan & Theo — First Look review",
    timestamp: "3 days ago",
    type: "comment",
  },
];

export const upcomingDeadlines = [
  {
    id: 1,
    title: "Carey & Luke — Gallery Delivery",
    due: "Tomorrow",
    assignee: "Tiahna Lynn",
    urgency: "high",
  },
  {
    id: 2,
    title: "Winter Editorial Feature — Copy Review",
    due: "Apr 15",
    assignee: "You",
    urgency: "medium",
  },
  {
    id: 3,
    title: "Bennett & Marie — Final Edit",
    due: "Apr 18",
    assignee: "Elena Rodriguez",
    urgency: "medium",
  },
  {
    id: 4,
    title: "Press Feature — Brides Magazine",
    due: "Apr 22",
    assignee: "Marcus Chen",
    urgency: "low",
  },
];
