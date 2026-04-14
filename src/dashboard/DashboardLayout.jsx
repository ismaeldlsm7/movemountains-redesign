import { useCallback, useEffect, useState } from "react";
import { Outlet, useLocation } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import TopBar from "./components/TopBar";
import { ToastProvider } from "./components/ToastProvider";
import "./styles/dashboard.css";

export default function DashboardLayout() {
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const { pathname } = useLocation();

  // Close mobile nav on route change
  useEffect(() => {
    setMobileNavOpen(false);
  }, [pathname]);

  // Lock body scroll when drawer is open
  useEffect(() => {
    document.body.style.overflow = mobileNavOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [mobileNavOpen]);

  const openNav = useCallback(() => setMobileNavOpen(true), []);
  const closeNav = useCallback(() => setMobileNavOpen(false), []);

  return (
    <ToastProvider>
      <div className="mm-dash">
        <div className="mm-dash__shell">
          <Sidebar isOpen={mobileNavOpen} onClose={closeNav} />
          <div className="mm-dash__main">
            <TopBar onOpenNav={openNav} />
            <main className="mm-dash__content">
              <Outlet />
            </main>
          </div>
        </div>
      </div>
    </ToastProvider>
  );
}
