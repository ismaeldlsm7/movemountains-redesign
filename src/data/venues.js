/* ── Move Mountains Co. — Venue Data ─────────────────────────────── */
/* Shared venue list used in autocomplete and venue pages. */

export const VENUES = [
  { id: "rosecliff", name: "Rosecliff Mansion", location: "Newport, RI", type: "Historic Estate" },
  { id: "oceancliff", name: "OceanCliff Hotel", location: "Newport, RI", type: "Oceanfront Hotel" },
  { id: "castlehill", name: "Castle Hill Inn", location: "Newport, RI", type: "Waterfront Inn" },
  { id: "chanler", name: "The Chanler at Cliff Walk", location: "Newport, RI", type: "Boutique Hotel" },
  { id: "bellemerri", name: "Belle Mer", location: "Newport, RI", type: "Waterfront Venue" },
  { id: "beavertail", name: "Beavertail State Park", location: "Jamestown, RI", type: "Outdoor/Natural" },
  { id: "newport-beach-house", name: "Newport Beach House", location: "Newport, RI", type: "Oceanfront Venue" },
  { id: "shepherds-run", name: "Shepherds Run", location: "South Kingstown, RI", type: "Farmstead Venue" },
];

export function searchVenues(query) {
  if (!query || query.length < 2) return [];
  const q = query.toLowerCase();
  return VENUES.filter(
    (v) => v.name.toLowerCase().includes(q) || v.location.toLowerCase().includes(q) || v.type.toLowerCase().includes(q)
  );
}
