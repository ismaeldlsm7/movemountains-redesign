import { lazy, Suspense, useEffect, useRef } from "react";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { Analytics } from "@vercel/analytics/react";
import Lenis from "lenis";
import "lenis/dist/lenis.css";
import {
  PageTransitionProvider,
  DiaphragmTransition,
} from "./components/PageTransition";
import Homepage from "./pages/movemountains-homepage";
import Portfolio from "./pages/movemountains-portfolio";
import About from "./pages/movemountains-about";
import Team from "./pages/movemountains-team";
import Services from "./pages/movemountains-services";
import Investment from "./pages/movemountains-investment";
import Contact from "./pages/movemountains-contact";
import WeddingDetail from "./pages/movemountains-wedding-detail";
import Academy from "./pages/movemountains-academy";
import Blog from "./pages/movemountains-blog";
import BlogPost from "./pages/movemountains-blog-post";
import Looks from "./pages/movemountains-looks";
import VideoLooks from "./pages/movemountains-video-looks";
import Venues from "./pages/movemountains-venues";
import Testimonials from "./pages/movemountains-testimonials";
import Press from "./pages/movemountains-press";
import Albums from "./pages/movemountains-albums";
import LuxeBooth from "./pages/movemountains-luxebooth";
import Careers from "./pages/movemountains-careers";
import FAQ from "./pages/movemountains-faq";
import Privacy from "./pages/movemountains-privacy";
import Terms from "./pages/movemountains-terms";
import Photography from "./pages/movemountains-photography";
import Videography from "./pages/movemountains-videography";
import Super8 from "./pages/movemountains-super8";
import ContentCreation from "./pages/movemountains-content-creation";
import LiveStreaming from "./pages/movemountains-livestreaming";
import WeddingEditorial from "./pages/movemountains-wedding-editorial";
import Vision from "./pages/movemountains-vision";
import Intern from "./pages/movemountains-intern";
import Rentals from "./pages/movemountains-rentals";
import Portal from "./pages/movemountains-portal";
import MyWedding from "./pages/movemountains-my-wedding";
import WeddingCountdown from "./components/my-wedding/WeddingCountdown";
import PreferredVendors from "./pages/movemountains-preferred-vendors";
import BookingWizard from "./pages/movemountains-book";
import BookingConfirmed from "./pages/movemountains-booking-confirmed";
import GalleryEntry from "./pages/movemountains-gallery-entry";
import GalleryFilms from "./pages/movemountains-gallery-films";
import GalleryPhotos from "./pages/movemountains-gallery-photos";
import NotFound from "./pages/movemountains-404";

// Dashboard is lazy-loaded so its bundle never ships with the public site.
const DashboardLayout = lazy(() => import("./dashboard/DashboardLayout"));
const DashboardHome = lazy(() => import("./dashboard/pages/DashboardHome"));
const BlogList = lazy(() => import("./dashboard/pages/BlogList"));
const BlogEditor = lazy(() => import("./dashboard/pages/BlogEditor"));
const WeddingsList = lazy(() => import("./dashboard/pages/WeddingsList"));
const WeddingEditor = lazy(() => import("./dashboard/pages/WeddingEditor"));
const FormsHub = lazy(() => import("./dashboard/pages/FormsHub"));
const Integrations = lazy(() => import("./dashboard/pages/Integrations"));
const Resources = lazy(() => import("./dashboard/pages/Resources"));
const Bookings = lazy(() => import("./dashboard/pages/Bookings"));
const BookingDetail = lazy(() => import("./dashboard/pages/BookingDetail"));
const Payments = lazy(() => import("./dashboard/pages/Payments"));
const Clients = lazy(() => import("./dashboard/pages/Clients"));
const DashboardCalendar = lazy(() => import("./dashboard/pages/Calendar"));
const Galleries = lazy(() => import("./dashboard/pages/Galleries"));
const GalleryEditor = lazy(() => import("./dashboard/pages/GalleryEditor"));

function SmoothScroll() {
  const { pathname } = useLocation();
  const lenisRef = useRef(null);
  const isDashboard = pathname.startsWith("/dashboard") || pathname.startsWith("/g/");

  useEffect(() => {
    if (isDashboard) return;
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 1.5,
    });
    lenisRef.current = lenis;
    window.__lenis = lenis;
    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);
    return () => {
      lenis.destroy();
      lenisRef.current = null;
      if (window.__lenis === lenis) window.__lenis = null;
    };
  }, [isDashboard]);

  useEffect(() => {
    if (isDashboard) {
      window.scrollTo(0, 0);
      return;
    }
    lenisRef.current?.scrollTo(0, { immediate: true });
  }, [pathname, isDashboard]);

  return null;
}

function DashboardFallback() {
  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "var(--mm-bg)",
        color: "var(--mm-text-sec)",
        fontFamily: "'DM Sans', sans-serif",
        fontSize: 13,
        letterSpacing: "0.1em",
        textTransform: "uppercase",
      }}
    >
      Loading dashboard…
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <PageTransitionProvider>
        <SmoothScroll />
        <DiaphragmTransition />
        <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/portfolio" element={<Portfolio />} />
        <Route path="/about" element={<About />} />
        <Route path="/team" element={<Team />} />
        <Route path="/services" element={<Services />} />
        <Route path="/investment" element={<Investment />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/wedding/carey-luke" element={<WeddingDetail />} />
        <Route path="/wedding/anthony-justine" element={<WeddingEditorial />} />
        <Route path="/wedding/:slug" element={<WeddingEditorial />} />
        <Route path="/academy" element={<Academy />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/blog/:slug" element={<BlogPost />} />
        <Route path="/looks" element={<Looks />} />
        <Route path="/video-looks" element={<VideoLooks />} />
        <Route path="/venues" element={<Venues />} />
        <Route path="/testimonials" element={<Testimonials />} />
        <Route path="/press" element={<Press />} />
        <Route path="/albums" element={<Albums />} />
        <Route path="/luxebooth" element={<LuxeBooth />} />
        <Route path="/careers" element={<Careers />} />
        <Route path="/faq" element={<FAQ />} />
        <Route path="/privacy-policy" element={<Privacy />} />
        <Route path="/terms-and-condition" element={<Terms />} />
        <Route path="/photography" element={<Photography />} />
        <Route path="/videography" element={<Videography />} />
        <Route path="/super8" element={<Super8 />} />
        <Route path="/content-creation" element={<ContentCreation />} />
        <Route path="/livestreaming" element={<LiveStreaming />} />
        <Route path="/vision" element={<Vision />} />
        <Route path="/intern" element={<Intern />} />
        <Route path="/rentals" element={<Rentals />} />
        <Route path="/book" element={<BookingWizard />} />
        <Route path="/booking/confirmed" element={<BookingConfirmed />} />
        <Route path="/portal" element={<Portal />} />
        <Route path="/my-wedding" element={<MyWedding />} />
        <Route path="/my-wedding/countdown" element={<WeddingCountdown />} />
        <Route path="/preferred-vendors" element={<PreferredVendors />} />
        {/* ── Private client delivery galleries — not linked from public nav ── */}
        <Route path="/g/:token" element={<GalleryEntry />} />
        <Route path="/g/:token/films" element={<GalleryFilms />} />
        <Route path="/g/:token/photos" element={<GalleryPhotos />} />
        <Route
          path="/dashboard"
          element={
            <Suspense fallback={<DashboardFallback />}>
              <DashboardLayout />
            </Suspense>
          }
        >
          <Route
            index
            element={
              <Suspense fallback={null}>
                <DashboardHome />
              </Suspense>
            }
          />
          <Route
            path="blog"
            element={
              <Suspense fallback={null}>
                <BlogList />
              </Suspense>
            }
          />
          <Route
            path="blog/new"
            element={
              <Suspense fallback={null}>
                <BlogEditor />
              </Suspense>
            }
          />
          <Route
            path="blog/:slug"
            element={
              <Suspense fallback={null}>
                <BlogEditor />
              </Suspense>
            }
          />
          <Route
            path="weddings"
            element={
              <Suspense fallback={null}>
                <WeddingsList />
              </Suspense>
            }
          />
          <Route
            path="weddings/new"
            element={
              <Suspense fallback={null}>
                <WeddingEditor />
              </Suspense>
            }
          />
          <Route
            path="weddings/:slug"
            element={
              <Suspense fallback={null}>
                <WeddingEditor />
              </Suspense>
            }
          />
          <Route
            path="forms"
            element={
              <Suspense fallback={null}>
                <FormsHub />
              </Suspense>
            }
          />
          <Route
            path="integrations"
            element={
              <Suspense fallback={null}>
                <Integrations />
              </Suspense>
            }
          />
          <Route
            path="resources"
            element={
              <Suspense fallback={null}>
                <Resources />
              </Suspense>
            }
          />
          <Route
            path="bookings"
            element={
              <Suspense fallback={null}>
                <Bookings />
              </Suspense>
            }
          />
          <Route
            path="bookings/:id"
            element={
              <Suspense fallback={null}>
                <BookingDetail />
              </Suspense>
            }
          />
          <Route
            path="payments"
            element={
              <Suspense fallback={null}>
                <Payments />
              </Suspense>
            }
          />
          <Route
            path="clients"
            element={
              <Suspense fallback={null}>
                <Clients />
              </Suspense>
            }
          />
          <Route
            path="calendar"
            element={
              <Suspense fallback={null}>
                <DashboardCalendar />
              </Suspense>
            }
          />
          <Route
            path="galleries"
            element={
              <Suspense fallback={null}>
                <Galleries />
              </Suspense>
            }
          />
          <Route
            path="galleries/new"
            element={
              <Suspense fallback={null}>
                <GalleryEditor />
              </Suspense>
            }
          />
          <Route
            path="galleries/:id"
            element={
              <Suspense fallback={null}>
                <GalleryEditor />
              </Suspense>
            }
          />
        </Route>
        <Route path="*" element={<NotFound />} />
        </Routes>
        <Analytics />
      </PageTransitionProvider>
    </BrowserRouter>
  );
}
