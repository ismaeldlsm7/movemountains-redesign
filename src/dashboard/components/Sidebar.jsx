import { NavLink } from "react-router-dom";
import { IconHome, IconBlog, IconHeart, IconUsers, IconPlug, IconSettings, IconClose, IconClipboard, IconBook, IconCalendar, IconDollar, IconUserCard, IconRing, IconGallery } from "./Icons";

const navGroups = [
  {
    title: "Business",
    items: [
      { to: "/dashboard/bookings", label: "Bookings", icon: IconRing },
      { to: "/dashboard/payments", label: "Payments", icon: IconDollar },
      { to: "/dashboard/clients", label: "Clients", icon: IconUserCard },
      { to: "/dashboard/calendar", label: "Calendar", icon: IconCalendar },
    ],
  },
  {
    title: "Studio",
    items: [
      { to: "/dashboard", label: "Overview", icon: IconHome, end: true },
      { to: "/dashboard/blog",      label: "Blog",              icon: IconBlog },
      { to: "/dashboard/weddings",  label: "Weddings",           icon: IconHeart },
      { to: "/dashboard/galleries", label: "Gallery Deliveries", icon: IconGallery },
    ],
  },
  {
    title: "Operations",
    items: [
      { to: "/dashboard/forms", label: "Forms Hub", icon: IconClipboard },
      { to: "/dashboard/resources", label: "Resources", icon: IconBook },
      { to: "/dashboard/integrations", label: "Integrations", icon: IconPlug },
    ],
  },
  {
    title: "Team",
    items: [
      { to: "/dashboard/editors", label: "Editors", icon: IconUsers, disabled: true },
    ],
  },
  {
    title: "Account",
    items: [
      { to: "/dashboard/settings", label: "Settings", icon: IconSettings, disabled: true },
    ],
  },
];

export default function Sidebar({ isOpen, onClose }) {
  return (
    <>
      {/* Backdrop — visible only on mobile when drawer is open */}
      <div
        className={"mm-dash__backdrop" + (isOpen ? " mm-dash__backdrop--visible" : "")}
        onClick={onClose}
        aria-hidden="true"
      />

      <aside className={"mm-dash__sidebar" + (isOpen ? " mm-dash__sidebar--open" : "")}>
        <div className="mm-dash__sidebar-head">
          <div>
            <div className="mm-dash__brand">
              <span className="mm-dash__brand-mark">M</span>
              Move Mountains
            </div>
            <div className="mm-dash__brand-sub">Studio Command Center</div>
          </div>
          <button
            type="button"
            className="mm-dash__sidebar-close"
            onClick={onClose}
            aria-label="Close navigation"
          >
            <IconClose width={20} height={20} />
          </button>
        </div>

        <nav className="mm-dash__nav">
          {navGroups.map((group) => (
            <div key={group.title}>
              <div className="mm-dash__nav-group-title">{group.title}</div>
              {group.items.map((item) => {
                const Icon = item.icon;
                if (item.disabled) {
                  return (
                    <button
                      key={item.to}
                      className="mm-dash__nav-item"
                      style={{ opacity: 0.45, cursor: "not-allowed" }}
                      title="Coming in Phase 2"
                      disabled
                    >
                      <Icon className="mm-dash__nav-icon" />
                      <span>{item.label}</span>
                      <span
                        style={{
                          marginLeft: "auto",
                          fontSize: 9,
                          letterSpacing: "0.12em",
                          textTransform: "uppercase",
                          color: "var(--dash-gold)",
                          fontWeight: 600,
                        }}
                      >
                        Soon
                      </span>
                    </button>
                  );
                }
                return (
                  <NavLink
                    key={item.to}
                    to={item.to}
                    end={item.end}
                    className={({ isActive }) =>
                      "mm-dash__nav-item" + (isActive ? " mm-dash__nav-item--active" : "")
                    }
                    onClick={onClose}
                  >
                    <Icon className="mm-dash__nav-icon" />
                    <span>{item.label}</span>
                  </NavLink>
                );
              })}
            </div>
          ))}
        </nav>

        <div className="mm-dash__sidebar-footer">
          <strong>Prototype build</strong>
          <br />
          High-fidelity mock — backend pending
        </div>
      </aside>
    </>
  );
}
