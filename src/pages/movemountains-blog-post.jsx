import { useState, useEffect, useRef } from "react";
import { motion, useInView, useScroll, useTransform } from "framer-motion";
import { useParams, Link, Navigate } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import CheckAvailabilityButton from "../components/CheckAvailabilityButton";
import { posts, getPostBySlug } from "../data/blogPosts";

const DS = { bg: "var(--mm-bg)", surface: "var(--mm-surface)", surfaceAlt: "var(--mm-surface-alt)", text: "var(--mm-text)", textSec: "var(--mm-text-sec)", gold: "var(--mm-gold)", ember: "var(--mm-ember)", border: "var(--mm-border)" };
const fontLink = "https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,700;1,400&family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;0,700;1,400;1,500&family=DM+Sans:wght@400;500;600;700&family=Bebas+Neue&display=swap";

function FadeIn({ children, delay = 0, y = 24 }) {
  const ref = useRef(null); const inView = useInView(ref, { once: true, margin: "-40px" });
  return <motion.div ref={ref} initial={{ opacity: 0, y }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.65, delay, ease: [0.25, 0.1, 0.25, 1] }}>{children}</motion.div>;
}

function ImageBlock({ color, label, aspect = "16/9" }) {
  return (
    <div style={{ width: "100%", aspectRatio: aspect, background: color, display: "flex", alignItems: "center", justifyContent: "center", margin: "36px 0" }}>
      <span style={{ fontFamily: "'DM Sans'", fontSize: 11, color: DS.textSec, opacity: 0.22, textTransform: "uppercase", letterSpacing: "0.12em" }}>[ {label} ]</span>
    </div>
  );
}

function ReadingProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useTransform(scrollYProgress, [0, 1], [0, 1]);
  return <motion.div style={{ scaleX, position: "fixed", top: 0, left: 0, right: 0, height: 3, background: DS.gold, transformOrigin: "left", zIndex: 200 }} />;
}

function TableOfContents({ toc }) {
  const [activeId, setActiveId] = useState("");

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => { if (entry.isIntersecting) setActiveId(entry.target.id); });
    }, { rootMargin: "-30% 0px -60% 0px" });
    toc.forEach((item) => { const el = document.getElementById(item.id); if (el) observer.observe(el); });
    return () => observer.disconnect();
  }, [toc]);

  return (
    <div>
      <div style={{ fontFamily: "'DM Sans'", fontSize: 10, color: DS.gold, textTransform: "uppercase", letterSpacing: "0.15em", marginBottom: 16 }}>In This Article</div>
      {toc.map((item) => (
        <a key={item.id} href={`#${item.id}`} style={{
          display: "block", fontFamily: "'DM Sans'", fontSize: 13, lineHeight: 1.4,
          color: activeId === item.id ? DS.text : DS.textSec,
          textDecoration: "none", padding: "6px 0 6px 12px",
          borderLeft: `2px solid ${activeId === item.id ? DS.gold : DS.border}`,
          transition: "all 0.2s", marginBottom: 2,
        }}
          onMouseEnter={(e) => e.target.style.color = DS.text}
          onMouseLeave={(e) => { if (activeId !== item.id) e.target.style.color = DS.textSec; }}
        >{item.label}</a>
      ))}

      <div style={{ marginTop: 32, paddingTop: 20, borderTop: `1px solid ${DS.border}` }}>
        <div style={{ fontFamily: "'DM Sans'", fontSize: 10, color: DS.gold, textTransform: "uppercase", letterSpacing: "0.15em", marginBottom: 12 }}>Share</div>
        <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
          {["Copy Link", "Twitter", "Facebook"].map((s) => (
            <button key={s} style={{
              fontFamily: "'DM Sans'", fontSize: 11, color: DS.textSec, background: "none", border: `1px solid ${DS.border}`,
              padding: "6px 12px", cursor: "pointer", transition: "all 0.3s",
            }}
              onMouseEnter={(e) => { e.target.style.borderColor = DS.gold; e.target.style.color = DS.gold; }}
              onMouseLeave={(e) => { e.target.style.borderColor = DS.border; e.target.style.color = DS.textSec; }}
            >{s}</button>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function BlogPostDetail() {
  const { slug } = useParams();
  const post = getPostBySlug(slug);
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const heroScale = useTransform(scrollYProgress, [0, 1], [1.05, 1.15]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  if (!post) return <Navigate to="/blog" replace />;

  const toc = post.sections.map((s) => ({ id: s.id, label: s.heading.replace(/^\d+\.\s*/, "") }));
  const relatedPosts = posts.filter((p) => p.slug !== post.slug && p.category === post.category).slice(0, 3);
  const fallbackRelated = posts.filter((p) => p.slug !== post.slug).slice(0, 3);
  const related = relatedPosts.length >= 3 ? relatedPosts : fallbackRelated;

  return (
    <div style={{ background: DS.bg, color: DS.text, minHeight: "100vh" }}>
      <style>{`
        @import url('${fontLink}');
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body { background: ${DS.bg}; }
        html { scroll-behavior: smooth; }
        ::-webkit-scrollbar { width: 5px; }
        ::-webkit-scrollbar-track { background: ${DS.bg}; }
        ::-webkit-scrollbar-thumb { background: ${DS.border}; }
        ::-webkit-scrollbar-thumb:hover { background: ${DS.gold}; }
        ::selection { background: ${DS.gold}; color: ${DS.bg}; }
        @media (max-width: 900px) {
          .article-layout { grid-template-columns: 1fr !important; }
          .toc-sidebar { display: none !important; }
          .related-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>

      <ReadingProgress />
      <Header activePage="Blog" />

      {/* HERO */}
      <div ref={heroRef} style={{ height: "55vh", minHeight: 380, maxHeight: 600, position: "relative", overflow: "hidden" }}>
        <motion.div style={{ scale: heroScale, position: "absolute", inset: 0 }}>
          <div style={{ width: "100%", height: "100%", background: `linear-gradient(160deg, ${post.heroColor} 0%, #1a1a1a 70%, #0f0f0f 100%)`, display: "flex", alignItems: "center", justifyContent: "center" }}>
            <span style={{ fontFamily: "'DM Sans'", fontSize: 13, color: DS.textSec, opacity: 0.2, textTransform: "uppercase", letterSpacing: "0.2em" }}>[ Article Hero Image ]</span>
          </div>
        </motion.div>
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to bottom, rgba(15,15,15,0.2) 0%, rgba(15,15,15,0.1) 40%, rgba(15,15,15,0.8) 82%, var(--mm-bg) 100%)" }} />

        <motion.div style={{ opacity: heroOpacity, position: "absolute", bottom: "10%", left: 0, right: 0, padding: "0 32px" }}>
          <div style={{ maxWidth: 800, margin: "0 auto" }}>
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5, duration: 0.7 }}>
              <div style={{ display: "flex", gap: 12, alignItems: "center", marginBottom: 14, flexWrap: "wrap" }}>
                <span style={{ fontFamily: "'DM Sans'", fontSize: 11, color: DS.gold, textTransform: "uppercase", letterSpacing: "0.12em" }}>{post.category}</span>
                <span style={{ width: 3, height: 3, borderRadius: "50%", background: DS.border }} />
                <span style={{ fontFamily: "'DM Sans'", fontSize: 11, color: DS.textSec }}>{post.date}</span>
                <span style={{ width: 3, height: 3, borderRadius: "50%", background: DS.border }} />
                <span style={{ fontFamily: "'DM Sans'", fontSize: 11, color: DS.textSec }}>{post.readTime}</span>
              </div>
              <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(30px, 4.5vw, 52px)", fontWeight: 700, color: DS.text, lineHeight: 1.12, margin: 0 }}>
                {post.title}
              </h1>
            </motion.div>
          </div>
        </motion.div>
      </div>

      {/* AUTHOR BAR */}
      <div style={{ borderBottom: `1px solid ${DS.border}`, padding: "16px 32px" }}>
        <div style={{ maxWidth: 800, margin: "0 auto", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <div style={{ width: 36, height: 36, borderRadius: "50%", background: post.author.color, display: "flex", alignItems: "center", justifyContent: "center" }}>
              <span style={{ fontFamily: "'Playfair Display'", fontSize: 16, color: DS.gold, opacity: 0.5, fontWeight: 700 }}>{post.author.initial}</span>
            </div>
            <div>
              <div style={{ fontFamily: "'DM Sans'", fontSize: 13, color: DS.text, fontWeight: 500 }}>{post.author.name}</div>
              <div style={{ fontFamily: "'DM Sans'", fontSize: 11, color: DS.textSec }}>{post.author.role}</div>
            </div>
          </div>
          <Link to="/blog" style={{ fontFamily: "'DM Sans'", fontSize: 11, color: DS.textSec, textDecoration: "none", textTransform: "uppercase", letterSpacing: "0.08em", transition: "color 0.2s" }}
            onMouseEnter={(e) => e.target.style.color = DS.gold} onMouseLeave={(e) => e.target.style.color = DS.textSec}>← Back to Journal</Link>
        </div>
      </div>

      {/* ARTICLE BODY + SIDEBAR */}
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "56px 32px 0" }}>
        <div className="article-layout" style={{ display: "grid", gridTemplateColumns: "1fr 240px", gap: "clamp(32px, 5vw, 72px)", alignItems: "start" }}>

          <article>
            <FadeIn>
              <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(20px, 2.2vw, 26px)", color: DS.text, lineHeight: 1.55, fontStyle: "italic", fontWeight: 400, marginBottom: 40 }}>
                {post.lede}
              </p>
            </FadeIn>

            <div style={{ height: 1, background: DS.border, marginBottom: 40 }} />

            {post.sections.map((section) => (
              <FadeIn key={section.id} delay={0.05}>
                <section id={section.id} style={{ marginBottom: 48 }}>
                  <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(22px, 2.5vw, 30px)", fontWeight: 700, color: DS.text, lineHeight: 1.2, margin: "0 0 18px" }}>
                    {section.heading}
                  </h2>
                  <p style={{ fontFamily: "'DM Sans'", fontSize: "clamp(15px, 1.15vw, 17px)", color: DS.textSec, lineHeight: 1.8 }}>
                    {section.body}
                  </p>
                  {section.image && <ImageBlock color={section.image.color} label={section.image.label} />}
                </section>
              </FadeIn>
            ))}

            <FadeIn>
              <div style={{ padding: "32px 0 32px 28px", borderLeft: `2px solid ${DS.gold}`, marginBottom: 48 }}>
                <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(18px, 2vw, 24px)", color: DS.text, lineHeight: 1.5, fontStyle: "italic", margin: 0 }}>
                  {post.conclusion}
                </p>
              </div>
            </FadeIn>

            <FadeIn>
              <div style={{ padding: "40px 32px", background: DS.surface, border: `1px solid ${DS.border}`, textAlign: "center", marginBottom: 48 }}>
                <div style={{ fontFamily: "'DM Sans'", fontSize: 11, color: DS.gold, textTransform: "uppercase", letterSpacing: "0.15em", marginBottom: 12 }}>Ready to Start the Conversation?</div>
                <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: 28, fontWeight: 700, color: DS.text, margin: "0 0 16px" }}>Let's Talk About Your Wedding</h3>
                <p style={{ fontFamily: "'DM Sans'", fontSize: 14, color: DS.textSec, marginBottom: 24 }}>We respond to every inquiry within 24 hours.</p>
                <CheckAvailabilityButton />
              </div>
            </FadeIn>

            <FadeIn>
              <div style={{ display: "flex", gap: 20, padding: "32px 0", borderTop: `1px solid ${DS.border}`, borderBottom: `1px solid ${DS.border}`, marginBottom: 48 }}>
                <div style={{ width: 72, height: 72, borderRadius: "50%", background: post.author.color, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                  <span style={{ fontFamily: "'Playfair Display'", fontSize: 28, color: DS.gold, opacity: 0.4, fontWeight: 700 }}>{post.author.initial}</span>
                </div>
                <div>
                  <div style={{ fontFamily: "'DM Sans'", fontSize: 10, color: DS.gold, textTransform: "uppercase", letterSpacing: "0.12em", marginBottom: 6 }}>Written by</div>
                  <div style={{ fontFamily: "'Playfair Display', serif", fontSize: 22, fontWeight: 700, color: DS.text, marginBottom: 4 }}>{post.author.name}</div>
                  <div style={{ fontFamily: "'DM Sans'", fontSize: 13, color: DS.textSec, marginBottom: 10 }}>{post.author.role} at Move Mountains Co.</div>
                </div>
              </div>
            </FadeIn>

            {post.tags && (
              <FadeIn>
                <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 48 }}>
                  <span style={{ fontFamily: "'DM Sans'", fontSize: 11, color: DS.textSec, marginRight: 8, paddingTop: 6 }}>Tags:</span>
                  {post.tags.map((tag) => (
                    <span key={tag} style={{
                      fontFamily: "'DM Sans'", fontSize: 11, color: DS.textSec, padding: "5px 12px",
                      border: `1px solid ${DS.border}`,
                    }}>{tag}</span>
                  ))}
                </div>
              </FadeIn>
            )}
          </article>

          <aside className="toc-sidebar" style={{ position: "sticky", top: 100 }}>
            <TableOfContents toc={toc} />
          </aside>
        </div>
      </div>

      {/* RELATED POSTS */}
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "80px 32px" }}>
        <FadeIn>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: 32, flexWrap: "wrap", gap: 16 }}>
            <div>
              <div style={{ fontFamily: "'DM Sans'", fontSize: 11, color: DS.gold, textTransform: "uppercase", letterSpacing: "0.15em", marginBottom: 8 }}>Keep Reading</div>
              <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(24px, 3vw, 36px)", fontWeight: 700, color: DS.text, margin: 0 }}>You Might Also Like</h2>
            </div>
            <Link to="/blog" style={{ fontFamily: "'DM Sans'", fontSize: 12, color: DS.gold, textDecoration: "none", textTransform: "uppercase", letterSpacing: "0.08em", borderBottom: `1px solid ${DS.gold}`, paddingBottom: 2 }}>All Articles →</Link>
          </div>
        </FadeIn>

        <div className="related-grid" style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 24 }}>
          {related.map((rp, i) => (
            <FadeIn key={rp.slug} delay={i * 0.08}>
              <Link to={`/blog/${rp.slug}`} style={{ textDecoration: "none", display: "block" }}>
                <div style={{ aspectRatio: "16/10", background: rp.color, display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 14, transition: "opacity 0.3s" }}
                  onMouseEnter={(e) => e.currentTarget.style.opacity = 0.85} onMouseLeave={(e) => e.currentTarget.style.opacity = 1}>
                  <span style={{ fontFamily: "'DM Sans'", fontSize: 10, color: DS.textSec, opacity: 0.2, textTransform: "uppercase", letterSpacing: "0.1em" }}>[ Article ]</span>
                </div>
                <div style={{ display: "flex", gap: 10, alignItems: "center", marginBottom: 8 }}>
                  <span style={{ fontFamily: "'DM Sans'", fontSize: 11, color: DS.gold, textTransform: "uppercase", letterSpacing: "0.08em" }}>{rp.category}</span>
                  <span style={{ width: 3, height: 3, borderRadius: "50%", background: DS.border }} />
                  <span style={{ fontFamily: "'DM Sans'", fontSize: 11, color: DS.textSec }}>{rp.date}</span>
                </div>
                <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: 20, fontWeight: 700, color: DS.text, lineHeight: 1.25, margin: 0 }}>{rp.title}</h3>
              </Link>
            </FadeIn>
          ))}
        </div>
      </div>

      <Footer />
    </div>
  );
}
