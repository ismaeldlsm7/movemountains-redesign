import { useState, useRef, useEffect, useMemo } from "react";
import { useLocation, useNavigate, Link } from "react-router-dom";
import { IconSearch, IconPlus, IconMenu } from "./Icons";
import { weddings } from "../data/mockWeddings";
import { MOCK_BOOKINGS } from "../data/mockBookings";
import { MOCK_GALLERIES } from "../data/mockGalleries";
import { posts as blogPosts } from "../../data/blogPosts";

const titles = {
  "/dashboard": "Overview",
  "/dashboard/blog": "Blog",
  "/dashboard/blog/new": "New Post",
  "/dashboard/weddings": "Weddings",
  "/dashboard/weddings/new": "New Wedding",
  "/dashboard/bookings": "Bookings",
  "/dashboard/clients": "Clients",
  "/dashboard/payments": "Payments",
  "/dashboard/galleries": "Galleries",
  "/dashboard/calendar": "Calendar",
  "/dashboard/forms": "Forms",
  "/dashboard/integrations": "Integrations",
  "/dashboard/resources": "Resources",
};

function titleFor(pathname) {
  if (pathname.startsWith("/dashboard/blog/") && pathname !== "/dashboard/blog/new") return "Edit Post";
  if (pathname.startsWith("/dashboard/weddings/") && pathname !== "/dashboard/weddings/new") return "Edit Wedding";
  if (pathname.startsWith("/dashboard/bookings/")) return "Booking Detail";
  return titles[pathname] || "Dashboard";
}

function quickActionFor(pathname) {
  if (pathname.startsWith("/dashboard/blog")) return { to: "/dashboard/blog/new", label: "New post" };
  if (pathname.startsWith("/dashboard/weddings")) return { to: "/dashboard/weddings/new", label: "New wedding" };
  return null;
}

// ── Search index built from all mock data ──────────────────────────
function buildIndex() {
  const results = [];

  weddings.forEach((w) => {
    results.push({
      id: `w-${w.id}`,
      category: "Weddings",
      label: w.couple,
      sub: w.venue,
      to: `/dashboard/weddings/${w.slug}`,
      status: w.status,
    });
  });

  MOCK_BOOKINGS.forEach((b) => {
    results.push({
      id: `b-${b.id}`,
      category: "Bookings",
      label: `${b.clientName} & ${b.partnerName}`,
      sub: b.venue || b.weddingDate,
      to: `/dashboard/bookings/${b.id}`,
      status: b.status,
    });
  });

  MOCK_GALLERIES.forEach((g) => {
    results.push({
      id: `g-${g.id}`,
      category: "Galleries",
      label: g.couple,
      sub: g.venue,
      to: `/dashboard/galleries`,
      status: g.status,
    });
  });

  blogPosts.forEach((p) => {
    results.push({
      id: `p-${p.id}`,
      category: "Blog",
      label: p.title,
      sub: p.venue || p.category,
      to: `/dashboard/blog/${p.slug}`,
      status: null,
    });
  });

  return results;
}

const INDEX = buildIndex();

const STATUS_COLOR = {
  Published: "var(--dash-gold)",
  Draft: "var(--dash-text-sec)",
  "In Editing": "#f0a500",
  Scheduled: "#3b8fd4",
  delivered: "#6ab187",
  editing: "#f0a500",
  ready: "#3b8fd4",
  Confirmed: "#6ab187",
  Completed: "var(--dash-text-sec)",
};

// ── Dropdown ───────────────────────────────────────────────────────
function SearchDropdown({ results, query, onSelect, activeIdx }) {
  if (!results.length) {
    return (
      <div className="mm-dash__search-dropdown">
        <div className="mm-dash__search-empty">
          No results for <strong>"{query}"</strong>
        </div>
      </div>
    );
  }

  // Group by category
  const groups = results.reduce((acc, r) => {
    if (!acc[r.category]) acc[r.category] = [];
    acc[r.category].push(r);
    return acc;
  }, {});

  let flatIdx = 0;
  return (
    <div className="mm-dash__search-dropdown">
      {Object.entries(groups).map(([cat, items]) => (
        <div key={cat} className="mm-dash__search-group">
          <div className="mm-dash__search-group-label">{cat}</div>
          {items.map((item) => {
            const idx = flatIdx++;
            const active = idx === activeIdx;
            return (
              <button
                key={item.id}
                className={`mm-dash__search-result${active ? " mm-dash__search-result--active" : ""}`}
                onClick={() => onSelect(item.to)}
                tabIndex={-1}
              >
                <div className="mm-dash__search-result-label">{item.label}</div>
                <div className="mm-dash__search-result-sub">
                  {item.sub}
                  {item.status && (
                    <span
                      className="mm-dash__search-result-status"
                      style={{ color: STATUS_COLOR[item.status] ?? "var(--dash-text-sec)" }}
                    >
                      · {item.status}
                    </span>
                  )}
                </div>
              </button>
            );
          })}
        </div>
      ))}
    </div>
  );
}

// ── TopBar ─────────────────────────────────────────────────────────
export default function TopBar({ onOpenNav }) {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const quick = quickActionFor(pathname);

  const [query, setQuery] = useState("");
  const [open, setOpen] = useState(false);
  const [activeIdx, setActiveIdx] = useState(-1);

  const inputRef = useRef(null);
  const wrapRef = useRef(null);

  const results = useMemo(() => {
    if (!query.trim()) return [];
    const q = query.toLowerCase();
    return INDEX.filter(
      (r) =>
        r.label.toLowerCase().includes(q) ||
        (r.sub && r.sub.toLowerCase().includes(q))
    ).slice(0, 12);
  }, [query]);

  // Open/close on query change
  useEffect(() => {
    setOpen(query.trim().length > 0);
    setActiveIdx(-1);
  }, [query]);

  // Click outside → close
  useEffect(() => {
    function handler(e) {
      if (wrapRef.current && !wrapRef.current.contains(e.target)) {
        setOpen(false);
        setQuery("");
      }
    }
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  // ⌘K / Ctrl+K → focus search
  useEffect(() => {
    function handler(e) {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        inputRef.current?.focus();
        inputRef.current?.select();
      }
    }
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, []);

  function handleKeyDown(e) {
    if (!open) return;
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActiveIdx((i) => Math.min(i + 1, results.length - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActiveIdx((i) => Math.max(i - 1, -1));
    } else if (e.key === "Enter" && activeIdx >= 0 && results[activeIdx]) {
      goTo(results[activeIdx].to);
    } else if (e.key === "Escape") {
      setOpen(false);
      setQuery("");
      inputRef.current?.blur();
    }
  }

  function goTo(path) {
    navigate(path);
    setOpen(false);
    setQuery("");
    inputRef.current?.blur();
  }

  return (
    <header className="mm-dash__topbar">
      <div className="mm-dash__topbar-left">
        <button
          type="button"
          className="mm-dash__hamburger"
          onClick={onOpenNav}
          aria-label="Open navigation"
        >
          <IconMenu width={20} height={20} />
        </button>
        <div className="mm-dash__topbar-title">{titleFor(pathname)}</div>
      </div>

      <div className="mm-dash__topbar-actions">
        {/* Search */}
        <div className="mm-dash__search-wrap" ref={wrapRef}>
          <IconSearch className="mm-dash__search-icon" />
          <input
            ref={inputRef}
            type="text"
            placeholder="Search… (⌘K)"
            className="mm-dash__search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={handleKeyDown}
            onFocus={() => { if (query.trim()) setOpen(true); }}
            autoComplete="off"
            spellCheck={false}
          />
          {open && (
            <SearchDropdown
              results={results}
              query={query}
              onSelect={goTo}
              activeIdx={activeIdx}
            />
          )}
        </div>

        {quick && (
          <Link to={quick.to} className="mm-dash__btn mm-dash__btn--primary mm-dash__topbar-quick">
            <IconPlus width={14} height={14} />
            <span className="mm-dash__topbar-quick-label">{quick.label}</span>
          </Link>
        )}

        <div className="mm-dash__avatar" title="Sean Thomas">ST</div>
      </div>
    </header>
  );
}
