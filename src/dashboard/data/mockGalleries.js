/* ── Mock Gallery Deliveries ──────────────────────────────────────── */

export const PHOTO_THEMES = {
  masonry:   { id: "masonry",   label: "Masonry",   description: "Editorial flow with varied aspect ratios" },
  grid:      { id: "grid",      label: "Grid",       description: "Clean uniform 3-column square grid" },
  editorial: { id: "editorial", label: "Editorial",  description: "Magazine alternating hero/2-col/3-col rows" },
  slideshow: { id: "slideshow", label: "Slideshow",  description: "Full-viewport one photo at a time" },
};

export const FILM_THEMES = {
  hero:      { id: "hero",      label: "Hero",      description: "Featured hero card + secondary film grid" },
  cinematic: { id: "cinematic", label: "Cinematic", description: "Full dark screen, horizontal scroll row" },
  playlist:  { id: "playlist",  label: "Playlist",  description: "Sidebar list + persistent inline player" },
};

export const GALLERY_STATUSES = {
  draft:     { label: "Draft",     color: "#888888", bg: "#88888818" },
  editing:   { label: "Editing",   color: "#f0a500", bg: "#f0a50018" },
  ready:     { label: "Ready",     color: "#3b8fd4", bg: "#3b8fd418" },
  delivered: { label: "Delivered", color: "#6ab187", bg: "#6ab18718" },
};

export const MOCK_GALLERIES = [
  {
    id: "gal-001",
    token: "a8f3c29k",
    bookingId: null,
    couple: "Carey & Luke",
    weddingDate: "2025-06-14",
    venue: "Rosecliff Mansion",
    location: "Newport, Rhode Island",
    photoCount: 842,
    films: [
      { id: "f1", title: "Highlight Reel",  duration: "3:42" },
      { id: "f2", title: "Full Ceremony",   duration: "47:18" },
      { id: "f3", title: "Full Reception",  duration: "1:01:24" },
    ],
    status: "delivered",
    clientEmail: "carey@example.com",
    deliveredAt: "2025-07-28",
    notes: "",
    createdAt: "2025-07-15",
    photoTheme: "masonry",
    filmTheme: "hero",
  },
  {
    id: "gal-002",
    token: "xk2p7qnm",
    bookingId: null,
    couple: "Howard & Shreya",
    weddingDate: "2025-11-08",
    venue: "OceanCliff Hotel",
    location: "Newport, Rhode Island",
    photoCount: 1124,
    films: [
      { id: "f4", title: "Highlight Reel", duration: "4:11" },
      { id: "f5", title: "Full Ceremony",  duration: "52:34" },
    ],
    status: "delivered",
    clientEmail: "howard@example.com",
    deliveredAt: "2025-12-20",
    notes: "",
    createdAt: "2025-12-10",
    photoTheme: "editorial",
    filmTheme: "cinematic",
  },
  {
    id: "gal-003",
    token: "m5v8r1qx",
    bookingId: "bk-006",
    couple: "Mia & Jordan Haynes",
    weddingDate: "2026-04-25",
    venue: "Vanderbilt by Troon",
    location: "Newport, Rhode Island",
    photoCount: 0,
    films: [],
    status: "editing",
    clientEmail: "mia@example.com",
    deliveredAt: null,
    notes: "Wedding April 25. Begin edit week of May 4. Balance overdue — confirm before delivery.",
    createdAt: "2026-04-26",
    photoTheme: "grid",
    filmTheme: "playlist",
  },
  {
    id: "gal-004",
    token: "pn3j7yk2",
    bookingId: "bk-001",
    couple: "Emma & James Carter",
    weddingDate: "2026-06-14",
    venue: "The Rosecliff",
    location: "Newport, Rhode Island",
    photoCount: 0,
    films: [],
    status: "draft",
    clientEmail: "emma@example.com",
    deliveredAt: null,
    notes: "Wedding June 14. Gallery will be prepared post-event.",
    createdAt: "2026-01-08",
    photoTheme: "masonry",
    filmTheme: "hero",
  },
];

/* ── Helpers ──────────────────────────────────────────────────────── */
export function getGalleryById(id) {
  return MOCK_GALLERIES.find((g) => g.id === id) || null;
}

export function getGalleryByToken(token) {
  return MOCK_GALLERIES.find((g) => g.token === token) || null;
}

export function generateToken() {
  return Math.random().toString(36).slice(2, 10);
}

export function galleryUrl(token) {
  return `${window.location.origin}/g/${token}`;
}
