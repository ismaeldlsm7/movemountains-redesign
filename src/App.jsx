import { useEffect, useRef } from "react";
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
import VideoLooks from "./pages/movemountains-video-looks";
import Intern from "./pages/movemountains-intern";
import Rentals from "./pages/movemountains-rentals";
import PreferredVendors from "./pages/movemountains-preferred-vendors";
import NotFound from "./pages/movemountains-404";

function SmoothScroll() {
  const { pathname } = useLocation();
  const lenisRef = useRef(null);

  useEffect(() => {
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
  }, []);

  useEffect(() => {
    lenisRef.current?.scrollTo(0, { immediate: true });
  }, [pathname]);

  return null;
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
        <Route path="/intern" element={<Intern />} />
        <Route path="/rentals" element={<Rentals />} />
        <Route path="/preferred-vendors" element={<PreferredVendors />} />
        <Route path="*" element={<NotFound />} />
        </Routes>
        <Analytics />
      </PageTransitionProvider>
    </BrowserRouter>
  );
}
