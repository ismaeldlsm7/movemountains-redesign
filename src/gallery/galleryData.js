// ── Gallery data resolver ─────────────────────────────────────────────
// Single source of truth for client gallery pages.
// Production: replace resolveGallery with an async Supabase fetch — pages stay unchanged.
import { MOCK_GALLERIES } from "../dashboard/data/mockGalleries";

function formatDate(iso) {
  return new Date(iso + "T12:00:00").toLocaleDateString("en-US", {
    month: "long", day: "numeric", year: "numeric",
  });
}

// Full film data (chapters, colors) not stored in mockGalleries — lives here.
const FILM_DETAILS = {
  "a8f3c29k": [
    {
      id: "highlight", title: "Highlight Reel",
      subtitle: "The story of the day in 3 minutes 42 seconds.",
      duration: "3:42", color: "#2a2218",
      chapters: [
        { label: "Morning Prep", time: "0:00", seconds: 0 },
        { label: "First Look",   time: "1:14", seconds: 74 },
        { label: "Ceremony",     time: "1:48", seconds: 108 },
        { label: "Portraits",    time: "2:16", seconds: 136 },
        { label: "Reception",    time: "2:54", seconds: 174 },
        { label: "Send-Off",     time: "3:29", seconds: 209 },
      ],
    },
    {
      id: "ceremony", title: "Full Ceremony",
      subtitle: "Every moment, unedited and complete.",
      duration: "47:18", color: "#1e1c18",
      chapters: [
        { label: "Processional",  time: "0:00",  seconds: 0 },
        { label: "Readings",      time: "8:24",  seconds: 504 },
        { label: "Vows",          time: "19:10", seconds: 1150 },
        { label: "Ring Exchange", time: "31:42", seconds: 1902 },
        { label: "Kiss",          time: "38:05", seconds: 2285 },
        { label: "Recessional",   time: "40:17", seconds: 2417 },
      ],
    },
    {
      id: "reception", title: "Full Reception",
      subtitle: "The ballroom, the first dance, and the last song.",
      duration: "1:01:24", color: "#201c1a",
      chapters: [
        { label: "Grand Entrance", time: "0:00",  seconds: 0 },
        { label: "First Dance",    time: "4:12",  seconds: 252 },
        { label: "Parent Dances",  time: "10:38", seconds: 638 },
        { label: "Toasts",         time: "18:55", seconds: 1135 },
        { label: "Open Dancing",   time: "29:40", seconds: 1780 },
        { label: "Last Song",      time: "58:30", seconds: 3510 },
      ],
    },
  ],
  "m5v8r1qx": [
    {
      id: "highlight", title: "Highlight Reel",
      subtitle: "Mia & Jordan — Vanderbilt by Troon, April 2026.",
      duration: "4:05", color: "#1c2018",
      chapters: [
        { label: "Getting Ready", time: "0:00", seconds: 0 },
        { label: "First Look",    time: "1:20", seconds: 80 },
        { label: "Ceremony",      time: "1:55", seconds: 115 },
        { label: "Reception",     time: "3:10", seconds: 190 },
      ],
    },
    {
      id: "ceremony", title: "Full Ceremony",
      subtitle: "Complete and unedited.",
      duration: "38:44", color: "#181c14",
      chapters: [
        { label: "Processional",  time: "0:00",  seconds: 0 },
        { label: "Vows",          time: "15:30", seconds: 930 },
        { label: "Ring Exchange", time: "27:10", seconds: 1630 },
        { label: "Kiss",          time: "34:22", seconds: 2062 },
      ],
    },
  ],
  "xk2p7qnm": [
    {
      id: "highlight", title: "Highlight Reel",
      subtitle: "Howard & Shreya — OceanCliff Hotel, November 2025.",
      duration: "4:11", color: "#1e2024",
      chapters: [
        { label: "Getting Ready", time: "0:00", seconds: 0 },
        { label: "First Look",    time: "1:30", seconds: 90 },
        { label: "Ceremony",      time: "2:05", seconds: 125 },
        { label: "Reception",     time: "3:20", seconds: 200 },
      ],
    },
    {
      id: "ceremony", title: "Full Ceremony",
      subtitle: "Complete and unedited.",
      duration: "52:34", color: "#1a1c20",
      chapters: [
        { label: "Processional",  time: "0:00",  seconds: 0 },
        { label: "Vows",          time: "22:10", seconds: 1330 },
        { label: "Ring Exchange", time: "35:00", seconds: 2100 },
        { label: "Kiss",          time: "44:18", seconds: 2658 },
      ],
    },
  ],
};

export function resolveGallery(token) {
  const g = MOCK_GALLERIES.find((x) => x.token === token) ?? MOCK_GALLERIES[0];
  const t = g.token; // resolved token (may have fallen back)
  const films = FILM_DETAILS[t] ??
    g.films.map((f) => ({ ...f, subtitle: "", color: "#2a2218", chapters: [] }));

  return {
    ...g,
    date: formatDate(g.weddingDate),
    films,
    filmCount: films.length,
    photoTheme:  g.photoTheme  ?? "masonry",
    filmTheme:   g.filmTheme   ?? "hero",
    coverColor:  g.coverColor  ?? (films[0]?.color ?? "#2a2218"),
    teamLabel:   g.teamLabel   ?? "Photography & Film by Move Mountains Co.",
  };
}
