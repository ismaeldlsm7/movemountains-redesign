import { useState, useEffect, useRef } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { posts } from "../data/blogPosts";

const DS = { bg: "var(--mm-bg)", surface: "var(--mm-surface)", surfaceAlt: "var(--mm-surface-alt)", text: "var(--mm-text)", textSec: "var(--mm-text-sec)", gold: "var(--mm-gold)", ember: "var(--mm-ember)", border: "var(--mm-border)" };
const fontLink = "https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,700;1,400&family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;0,700;1,400;1,500&family=DM+Sans:wght@400;500;600;700&family=Bebas+Neue&display=swap";

function FadeIn({ children, delay = 0, y = 24 }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  return <motion.div ref={ref} initial={{ opacity: 0, y }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.65, delay, ease: [0.25, 0.1, 0.25, 1] }}>{children}</motion.div>;
}

const categories = ["All", "Real Wedding", "Planning Tips", "Trends", "Venues", "Engagement"];

function BlogCard({ post, index, large = false }) {
  const [hovered, setHovered] = useState(false);
  return (
    <FadeIn delay={(index % 3) * 0.08}>
      <Link to={`/blog/${post.slug}`} style={{ textDecoration: "none", display: "block" }} onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)}>
        <div style={{ overflow: "hidden", position: "relative" }}>
          <motion.div animate={{ scale: hovered ? 1.04 : 1 }} transition={{ duration: 0.5 }}
            style={{ width: "100%", aspectRatio: large ? "16/9" : "4/3", background: post.color, display: "flex", alignItems: "center", justifyContent: "center" }}>
            <span style={{ fontFamily: "'DM Sans'", fontSize: 11, color: DS.textSec, opacity: 0.2, textTransform: "uppercase", letterSpacing: "0.12em" }}>[ {post.category} ]</span>
          </motion.div>
          <motion.div animate={{ opacity: hovered ? 1 : 0 }} transition={{ duration: 0.3 }}
            style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(10,10,10,0.85) 0%, transparent 50%)" }} />
        </div>

        <div style={{ marginTop: 16 }}>
          <div style={{ display: "flex", gap: 12, alignItems: "center", marginBottom: 8 }}>
            <span style={{ fontFamily: "'DM Sans'", fontSize: 11, color: DS.gold, textTransform: "uppercase", letterSpacing: "0.1em" }}>{post.category}</span>
            <span style={{ width: 3, height: 3, borderRadius: "50%", background: DS.border }} />
            <span style={{ fontFamily: "'DM Sans'", fontSize: 11, color: DS.textSec }}>{post.date}</span>
            <span style={{ width: 3, height: 3, borderRadius: "50%", background: DS.border }} />
            <span style={{ fontFamily: "'DM Sans'", fontSize: 11, color: DS.textSec }}>{post.readTime}</span>
          </div>

          <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: large ? "clamp(24px, 3vw, 34px)" : "clamp(18px, 2vw, 22px)", fontWeight: 700, color: DS.text, lineHeight: 1.25, margin: "0 0 8px", transition: "color 0.3s" }}>
            {post.title}
          </h3>

          <p style={{ fontFamily: "'DM Sans'", fontSize: 14, color: DS.textSec, lineHeight: 1.6, margin: 0 }}>{post.excerpt}</p>

          {post.venue && (
            <div style={{ fontFamily: "'DM Sans'", fontSize: 12, color: DS.textSec, marginTop: 8, opacity: 0.7 }}>📍 {post.venue}</div>
          )}
        </div>
      </Link>
    </FadeIn>
  );
}

export default function BlogPage() {
  const [scrolled, setScrolled] = useState(false);
  const [activeCategory, setActiveCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => { const fn = () => setScrolled(window.scrollY > 40); window.addEventListener("scroll", fn); return () => window.removeEventListener("scroll", fn); }, []);

  const featured = posts.find((p) => p.featured);
  const filtered = posts.filter((p) => !p.featured).filter((p) => activeCategory === "All" || p.category === activeCategory).filter((p) => !searchQuery || p.title.toLowerCase().includes(searchQuery.toLowerCase()) || p.excerpt.toLowerCase().includes(searchQuery.toLowerCase()));

  return (
    <div style={{ background: DS.bg, color: DS.text, minHeight: "100vh" }}>
      <style>{`
        @import url('${fontLink}');
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body { background: ${DS.bg}; }
        ::selection { background: ${DS.gold}; color: ${DS.bg}; }
        @media (max-width: 768px) { .nav-links { display: none !important; } .blog-grid { grid-template-columns: 1fr !important; } .featured-grid { grid-template-columns: 1fr !important; } .filter-row { flex-wrap: wrap !important; } }
      `}</style>
      <Header activePage="Blog" />

      {/* Header */}
      <div style={{ paddingTop: 100, maxWidth: 1400, margin: "0 auto", padding: "100px 32px 0" }}>
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }}>
          <div style={{ fontFamily: "'DM Sans'", fontSize: 12, color: DS.textSec, marginBottom: 32 }}>
            <a href="#" style={{ color: DS.textSec, textDecoration: "none" }}>Home</a><span style={{ margin: "0 10px", opacity: 0.4 }}>/</span><span style={{ color: DS.gold }}>Blog</span>
          </div>
        </motion.div>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.35 }}>
          <div style={{ fontFamily: "'DM Sans'", fontSize: 12, color: DS.gold, textTransform: "uppercase", letterSpacing: "0.2em", marginBottom: 12 }}>Stories & Insights</div>
          <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(38px, 5.5vw, 68px)", fontWeight: 700, color: DS.text, lineHeight: 1.05, margin: "0 0 16px" }}>The Journal</h1>
          <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(17px, 2vw, 22px)", color: DS.textSec, fontStyle: "italic", maxWidth: 500 }}>Real weddings, planning wisdom, and behind-the-scenes stories from the MMC team.</p>
        </motion.div>
        <motion.div initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} transition={{ delay: 0.55, duration: 0.8 }} style={{ height: 1, background: DS.border, transformOrigin: "left", marginTop: 32 }} />
      </div>

      {/* Featured Post */}
      {featured && (
        <div style={{ maxWidth: 1400, margin: "0 auto", padding: "48px 32px" }}>
          <FadeIn>
            <div style={{ fontFamily: "'DM Sans'", fontSize: 11, color: DS.gold, textTransform: "uppercase", letterSpacing: "0.15em", marginBottom: 20 }}>Featured Story</div>
          </FadeIn>
          <div className="featured-grid" style={{ display: "grid", gridTemplateColumns: "1.3fr 1fr", gap: 32, alignItems: "center" }}>
            <FadeIn>
              <Link to={`/blog/${featured.slug}`} style={{ textDecoration: "none", display: "block" }}>
                <div style={{ aspectRatio: "16/10", background: featured.color, display: "flex", alignItems: "center", justifyContent: "center", transition: "opacity 0.3s" }}
                  onMouseEnter={(e) => e.currentTarget.style.opacity = 0.85} onMouseLeave={(e) => e.currentTarget.style.opacity = 1}>
                  <span style={{ fontFamily: "'DM Sans'", fontSize: 12, color: DS.textSec, opacity: 0.2, textTransform: "uppercase", letterSpacing: "0.12em" }}>[ Featured Image ]</span>
                </div>
              </Link>
            </FadeIn>
            <FadeIn delay={0.1}>
              <div>
                <div style={{ display: "flex", gap: 12, alignItems: "center", marginBottom: 12 }}>
                  <span style={{ fontFamily: "'DM Sans'", fontSize: 11, color: DS.gold, textTransform: "uppercase", letterSpacing: "0.1em" }}>{featured.category}</span>
                  <span style={{ width: 3, height: 3, borderRadius: "50%", background: DS.border }} />
                  <span style={{ fontFamily: "'DM Sans'", fontSize: 11, color: DS.textSec }}>{featured.date}</span>
                </div>
                <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(26px, 3vw, 36px)", fontWeight: 700, color: DS.text, lineHeight: 1.2, margin: "0 0 14px" }}>{featured.title}</h2>
                <p style={{ fontFamily: "'DM Sans'", fontSize: 15, color: DS.textSec, lineHeight: 1.7, marginBottom: 20 }}>{featured.excerpt}</p>
                {featured.venue && <div style={{ fontFamily: "'DM Sans'", fontSize: 13, color: DS.textSec, marginBottom: 20, opacity: 0.7 }}>📍 {featured.venue}</div>}
                <Link to={`/blog/${featured.slug}`} style={{ fontFamily: "'DM Sans'", fontSize: 13, color: DS.gold, textDecoration: "none", textTransform: "uppercase", letterSpacing: "0.08em", borderBottom: `1px solid ${DS.gold}`, paddingBottom: 3 }}>Read the Story →</Link>
              </div>
            </FadeIn>
          </div>
        </div>
      )}

      {/* Filters + Search */}
      <div style={{ borderTop: `1px solid ${DS.border}`, borderBottom: `1px solid ${DS.border}`, padding: "20px 32px" }}>
        <div className="filter-row" style={{ maxWidth: 1400, margin: "0 auto", display: "flex", justifyContent: "space-between", alignItems: "center", gap: 16 }}>
          <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
            {categories.map((c) => (
              <button key={c} onClick={() => setActiveCategory(c)} style={{
                fontFamily: "'DM Sans'", fontSize: 12, color: activeCategory === c ? DS.bg : DS.textSec,
                background: activeCategory === c ? DS.gold : "transparent", border: `1px solid ${activeCategory === c ? DS.gold : DS.border}`,
                padding: "7px 16px", cursor: "pointer", textTransform: "uppercase", letterSpacing: "0.06em", transition: "all 0.3s",
              }}
                onMouseEnter={(e) => { if (activeCategory !== c) { e.target.style.borderColor = DS.gold; e.target.style.color = DS.gold; } }}
                onMouseLeave={(e) => { if (activeCategory !== c) { e.target.style.borderColor = DS.border; e.target.style.color = DS.textSec; } }}
              >{c}</button>
            ))}
          </div>
          <input type="text" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} placeholder="Search stories..." style={{
            fontFamily: "'DM Sans'", fontSize: 13, color: DS.text, background: "rgba(30,30,30,0.5)", border: `1px solid ${DS.border}`,
            padding: "8px 16px", outline: "none", width: 220, transition: "border-color 0.3s",
          }}
            onFocus={(e) => e.target.style.borderColor = DS.gold} onBlur={(e) => e.target.style.borderColor = DS.border} />
        </div>
      </div>

      {/* Posts Grid */}
      <div style={{ maxWidth: 1400, margin: "0 auto", padding: "48px 32px 80px" }}>
        <AnimatePresence mode="wait">
          <motion.div key={activeCategory + searchQuery} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.3 }}
            className="blog-grid" style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 32 }}>
            {filtered.map((post, i) => <BlogCard key={post.id} post={post} index={i} />)}
          </motion.div>
        </AnimatePresence>
        {filtered.length === 0 && (
          <div style={{ textAlign: "center", padding: "80px 0" }}>
            <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 24, color: DS.textSec, fontStyle: "italic" }}>No stories match your search.</div>
          </div>
        )}
      </div>

      {/* Newsletter CTA */}
      <div style={{ background: DS.surface, borderTop: `1px solid ${DS.border}`, padding: "80px 32px", textAlign: "center" }}>
        <FadeIn>
          <div style={{ fontFamily: "'DM Sans'", fontSize: 12, color: DS.gold, textTransform: "uppercase", letterSpacing: "0.2em", marginBottom: 16 }}>Never Miss a Story</div>
          <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(28px, 3.5vw, 42px)", fontWeight: 700, color: DS.text, margin: "0 0 12px" }}>Subscribe to The Journal</h2>
          <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 20, color: DS.textSec, fontStyle: "italic", marginBottom: 28 }}>Real weddings, planning tips, and behind-the-scenes — once a month, no spam.</p>
          <div style={{ display: "flex", gap: 0, maxWidth: 420, margin: "0 auto" }}>
            <input type="email" placeholder="your@email.com" style={{ flex: 1, padding: "14px 16px", fontFamily: "'DM Sans'", fontSize: 14, color: DS.text, background: "rgba(30,30,30,0.6)", border: `1px solid ${DS.border}`, borderRight: "none", outline: "none", minWidth: 0 }} />
            <button style={{ fontFamily: "'DM Sans'", fontSize: 12, fontWeight: 600, color: DS.bg, background: DS.gold, border: "none", padding: "14px 24px", cursor: "pointer", textTransform: "uppercase", letterSpacing: "0.08em" }}>Subscribe</button>
          </div>
        </FadeIn>
      </div>

      <Footer />
    </div>
  );
}
