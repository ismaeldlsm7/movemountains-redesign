import { useState, useEffect, useRef } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import Header from "../components/Header";
import Footer from "../components/Footer";
import CheckAvailabilityButton from "../components/CheckAvailabilityButton";

const DS = { bg: "var(--mm-bg)", surface: "var(--mm-surface)", surfaceAlt: "var(--mm-surface-alt)", text: "var(--mm-text)", textSec: "var(--mm-text-sec)", gold: "var(--mm-gold)", ember: "var(--mm-ember)", border: "var(--mm-border)" };
const fontLink = "https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,700;1,400&family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;0,700;1,400;1,500&family=DM+Sans:wght@400;500;600;700&family=Bebas+Neue&display=swap";

function FadeIn({ children, delay = 0, y = 20 }) {
  const ref = useRef(null); const inView = useInView(ref, { once: true, margin: "-30px" });
  return <motion.div ref={ref} initial={{ opacity: 0, y }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6, delay, ease: [0.25, 0.1, 0.25, 1] }}>{children}</motion.div>;
}

const reviews = [
  { name: "Ann S.", date: "March 2024", service: "Photography", venue: "Newport, RI", rating: 5, text: "Above and Beyond! They really outdid themselves — when the weather took a turn, they went out and purchased umbrellas ultimately saving my entire day. I could've cried I was so taken aback.", highlight: true },
  { name: "Howard & Shreya", date: "October 2025", service: "Photo + Video", venue: "OceanCliff, Newport", rating: 5, text: "Choosing Move Mountains was one of the best vendor decisions we made for our wedding. Every single photo is a work of art.", highlight: true },
  { name: "Joel & Corey", date: "August 2025", service: "Photography", venue: "The Chanler, Newport", rating: 5, text: "Nothing about Move Mountains Co. is cookie cutter or common. I can't say enough good things about them. I will always be grateful to them for capturing our wedding like no one else could!", highlight: true },
  { name: "Yojan & Bel", date: "2024", service: "Photo + Video", venue: "Rhode Island", rating: 5, text: "Such a modern, fresh perspective on what wedding video and photography should be. They completely changed our expectations.", highlight: false },
  { name: "Micaela & Mike", date: "November 2023", service: "Photography", venue: "Warwick, RI", rating: 5, text: "So beautiful and EVERYTHING was captured. There was not a photo missed. The turn around time for photo delivery was excellent and the online portal is so user friendly.", highlight: false },
  { name: "Recent Couple", date: "2024", service: "Photo + Video", venue: "Rosecliff, Newport", rating: 5, text: "They captured the beauty of the venue and the emotion of the day so effortlessly. His photos are timeless, elegant, and full of life. We felt completely at ease.", highlight: false },
  { name: "Recent Couple", date: "2024", service: "Videography", venue: "Rhode Island", rating: 5, text: "We've been married nearly a year and continue to watch our video regularly. It's absolutely perfect and we're so happy we chose Move Mountains Co. to capture our day.", highlight: false },
  { name: "Recent Couple", date: "2024", service: "Photography", venue: "Newport, RI", rating: 5, text: "Tiahna made the day go so smoothly she was seriously the MVP. When our florist forgot to deliver our bridesmaids bouquets, she came up with a plan to keep the day moving forward.", highlight: true },
  { name: "Recent Couple", date: "2025", service: "Photo + Video", venue: "OceanCliff, Newport", rating: 5, text: "On the day of, they were well versed in our wedding venue. They reported on time and the entire day flowed seamlessly. They made us feel comfortable and at ease at all times.", highlight: false },
  { name: "Recent Couple", date: "2024", service: "Photography", venue: "Providence, RI", rating: 5, text: "Move Mountains was excellent. They have a professional management system that is organized and effective in communication, and the quality of the photographs was phenomenal.", highlight: false },
  { name: "Recent Couple", date: "2025", service: "Photo + Video", venue: "Newport, RI", rating: 5, text: "Their communication style was quick responding, super friendly, and full of great details and ideas that brought our vision to life. The final video is a true work of art.", highlight: false },
  { name: "Recent Couple", date: "2024", service: "Luxe Booth", venue: "Rhode Island", rating: 5, text: "We opted for the Photo Booth which was a HUGE hit with our guests! Videography can definitely be one of the biggest splurges but we're SO glad we did it.", highlight: false },
  { name: "Recent Couple", date: "2025", service: "Photography", venue: "Castle Hill, Newport", rating: 5, text: "The photographers at Move Mountains Co are amazing. They make you feel so comfortable, and do a great job of blending into the background while capturing all the moments you want.", highlight: false },
  { name: "Recent Couple", date: "2024", service: "Photography", venue: "Narragansett, RI", rating: 5, text: "Our photographer brought us back to our first location after noticing the lighting from the sunset, which turned out to be some of our favorite pictures. We were blown away.", highlight: false },
  { name: "Recent Couple", date: "2025", service: "Photo + Video", venue: "Newport, RI", rating: 5, text: "Move Mountains Co. was such a pleasure to work with! Throughout the entire planning process, they were extremely responsive and happy to assist us. The day of the wedding, they were a DREAM!", highlight: false },
];

const serviceFilters = ["All", "Photography", "Photo + Video", "Videography", "Luxe Booth"];
const platforms = [{ name: "WeddingWire", count: "137+", rating: "4.9" }, { name: "The Knot", count: "85+", rating: "5.0" }, { name: "Zola", count: "40+", rating: "5.0" }];

function ReviewCard({ review, index }) {
  return (
    <FadeIn delay={(index % 3) * 0.06}>
      <div style={{
        padding: "28px 24px", border: `1px solid ${review.highlight ? DS.gold : DS.border}`,
        background: review.highlight ? DS.surfaceAlt : "transparent",
        display: "flex", flexDirection: "column", height: "100%", transition: "border-color 0.3s",
      }}
        onMouseEnter={(e) => { if (!review.highlight) e.currentTarget.style.borderColor = "rgba(201,169,110,0.3)"; }}
        onMouseLeave={(e) => { if (!review.highlight) e.currentTarget.style.borderColor = DS.border; }}
      >
        {/* Stars */}
        <div style={{ display: "flex", gap: 3, marginBottom: 14 }}>
          {Array.from({ length: review.rating }).map((_, i) => (
            <span key={i} style={{ color: DS.gold, fontSize: 14 }}>★</span>
          ))}
        </div>

        {/* Quote */}
        <p style={{ fontFamily: "'DM Sans'", fontSize: 14, color: DS.text, lineHeight: 1.7, flex: 1 }}>"{review.text}"</p>

        {/* Attribution */}
        <div style={{ marginTop: 20, paddingTop: 14, borderTop: `1px solid ${DS.border}` }}>
          <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 17, fontWeight: 600, color: DS.text }}>{review.name}</div>
          <div style={{ display: "flex", gap: 8, alignItems: "center", marginTop: 4, flexWrap: "wrap" }}>
            <span style={{ fontFamily: "'DM Sans'", fontSize: 11, color: DS.gold, textTransform: "uppercase", letterSpacing: "0.08em" }}>{review.service}</span>
            <span style={{ width: 3, height: 3, borderRadius: "50%", background: DS.border }} />
            <span style={{ fontFamily: "'DM Sans'", fontSize: 11, color: DS.textSec }}>{review.venue}</span>
            <span style={{ width: 3, height: 3, borderRadius: "50%", background: DS.border }} />
            <span style={{ fontFamily: "'DM Sans'", fontSize: 11, color: DS.textSec }}>{review.date}</span>
          </div>
        </div>
      </div>
    </FadeIn>
  );
}

export default function TestimonialsPage() {
  const [scrolled, setScrolled] = useState(false);
  const [activeFilter, setActiveFilter] = useState("All");
  useEffect(() => { const fn = () => setScrolled(window.scrollY > 40); window.addEventListener("scroll", fn); return () => window.removeEventListener("scroll", fn); }, []);

  const filtered = activeFilter === "All" ? reviews : reviews.filter((r) => r.service === activeFilter);

  return (
    <div style={{ background: DS.bg, color: DS.text, minHeight: "100vh" }}>
      <style>{`
        @import url('${fontLink}'); * { margin: 0; padding: 0; box-sizing: border-box; } body { background: ${DS.bg}; } ::selection { background: ${DS.gold}; color: ${DS.bg}; }
        @media (max-width: 768px) { .nav-links { display: none !important; } .reviews-grid { grid-template-columns: 1fr !important; } }
      `}</style>
      <Header activePage="About" />

      {/* Header */}
      <div style={{ paddingTop: 100, maxWidth: 1400, margin: "0 auto", padding: "100px 32px 0" }}>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.35 }}>
          <div style={{ fontFamily: "'DM Sans'", fontSize: 12, color: DS.gold, textTransform: "uppercase", letterSpacing: "0.2em", marginBottom: 12 }}>262+ Five-Star Reviews</div>
          <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(40px, 6vw, 72px)", fontWeight: 700, color: DS.text, lineHeight: 1.05, margin: "0 0 16px" }}>Wall of Love</h1>
          <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(17px, 2vw, 22px)", color: DS.textSec, fontStyle: "italic", maxWidth: 550 }}>Real words from real couples. Every review below is from a verified platform — unedited, unfiltered.</p>
        </motion.div>
      </div>

      {/* Platform stats */}
      <div style={{ background: DS.surface, borderTop: `1px solid ${DS.border}`, borderBottom: `1px solid ${DS.border}`, padding: "40px 32px", marginTop: 40 }}>
        <div style={{ maxWidth: 1400, margin: "0 auto", display: "flex", justifyContent: "center", gap: "clamp(32px, 5vw, 80px)", flexWrap: "wrap" }}>
          {platforms.map((p) => (
            <FadeIn key={p.name}>
              <div style={{ textAlign: "center" }}>
                <div style={{ fontFamily: "'Bebas Neue'", fontSize: 48, color: DS.gold, lineHeight: 1 }}>{p.rating}</div>
                <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 18, fontWeight: 500, color: DS.text, marginTop: 4 }}>{p.name}</div>
                <div style={{ fontFamily: "'DM Sans'", fontSize: 12, color: DS.textSec, marginTop: 2 }}>{p.count} reviews</div>
              </div>
            </FadeIn>
          ))}
          <FadeIn delay={0.2}>
            <div style={{ textAlign: "center" }}>
              <div style={{ fontFamily: "'Bebas Neue'", fontSize: 48, color: DS.gold, lineHeight: 1 }}>8</div>
              <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 18, fontWeight: 500, color: DS.text, marginTop: 4 }}>Best of The Knot</div>
              <div style={{ fontFamily: "'DM Sans'", fontSize: 12, color: DS.textSec, marginTop: 2 }}>Consecutive years</div>
            </div>
          </FadeIn>
        </div>
      </div>

      {/* Filters */}
      <div style={{ padding: "24px 32px", borderBottom: `1px solid ${DS.border}` }}>
        <div style={{ maxWidth: 1400, margin: "0 auto", display: "flex", gap: 10, flexWrap: "wrap", justifyContent: "center" }}>
          {serviceFilters.map((f) => (
            <button key={f} onClick={() => setActiveFilter(f)} style={{
              fontFamily: "'DM Sans'", fontSize: 12, color: activeFilter === f ? DS.bg : DS.textSec,
              background: activeFilter === f ? DS.gold : "transparent", border: `1px solid ${activeFilter === f ? DS.gold : DS.border}`,
              padding: "8px 18px", cursor: "pointer", textTransform: "uppercase", letterSpacing: "0.06em", transition: "all 0.3s",
            }}>{f}</button>
          ))}
          <span style={{ fontFamily: "'DM Sans'", fontSize: 13, color: DS.textSec, alignSelf: "center", marginLeft: 12 }}>{filtered.length} reviews</span>
        </div>
      </div>

      {/* Reviews Grid - Masonry-like */}
      <div style={{ maxWidth: 1400, margin: "0 auto", padding: "48px 32px 80px" }}>
        <AnimatePresence mode="wait">
          <motion.div key={activeFilter} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.25 }}
            className="reviews-grid" style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 16 }}>
            {filtered.map((r, i) => <ReviewCard key={i} review={r} index={i} />)}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* CTA */}
      <div style={{ borderTop: `1px solid ${DS.border}`, padding: "100px 32px", textAlign: "center", background: `linear-gradient(160deg, #1a1410 0%, #1a1612 50%, ${DS.bg} 100%)` }}>
        <FadeIn>
          <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(28px, 4vw, 48px)", fontWeight: 700, color: DS.text, margin: "0 0 12px" }}>Ready to Write Your Review?</h2>
          <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 20, color: DS.textSec, fontStyle: "italic", marginBottom: 32 }}>It starts with a conversation.</p>
          <CheckAvailabilityButton />
        </FadeIn>
      </div>

      <Footer />
    </div>
  );
}
