import { useState, useEffect, useRef } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import Header from "../components/Header";
import Footer from "../components/Footer";

const DS = { bg: "var(--mm-bg)", surface: "var(--mm-surface)", surfaceAlt: "var(--mm-surface-alt)", text: "var(--mm-text)", textSec: "var(--mm-text-sec)", gold: "var(--mm-gold)", ember: "var(--mm-ember)", border: "var(--mm-border)" };
const fontLink = "https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,700;1,400&family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;0,700;1,400;1,500&family=DM+Sans:wght@400;500;600;700&family=Bebas+Neue&display=swap";

function FadeIn({ children, delay = 0, y = 24 }) {
  const ref = useRef(null); const inView = useInView(ref, { once: true, margin: "-40px" });
  return <motion.div ref={ref} initial={{ opacity: 0, y }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.65, delay, ease: [0.25, 0.1, 0.25, 1] }}>{children}</motion.div>;
}

const faqCategories = [
  { name: "Booking & Availability", icon: "◎", faqs: [
    { q: "How far in advance should we book?", a: "Popular dates (May–October Saturdays) book 12–18 months in advance. Weekday and off-season dates have more flexibility. We recommend reaching out as soon as you have a date and venue confirmed — we only take one wedding per day." },
    { q: "How do we start the booking process?", a: "Fill out our contact form or send us an email. We'll respond within 24 hours to schedule a call or in-person meeting. From there, we'll learn about your vision, walk through packages, and build a custom plan if needed." },
    { q: "Do you require a deposit?", a: "Yes — a 30% retainer is due at booking to secure your date. The remaining balance is due 30 days before your wedding. We accept bank transfers, credit cards, and payment plans for packages over $5,000." },
    { q: "Can we reschedule our wedding date?", a: "Life happens. Rescheduling requests made 90+ days before the original date are transferred at no extra cost, subject to availability. Requests within 90 days may incur a rebooking fee." },
    { q: "Do you offer elopement packages?", a: "Yes. For elopements and micro-weddings (under 30 guests), we offer streamlined packages starting at $2,200. Reach out for a custom quote based on your timeline and location." },
  ]},
  { name: "On Your Wedding Day", icon: "◇", faqs: [
    { q: "Have you shot at my venue?", a: "Most likely, yes. We've shot throughout New England at venues including Ocean Cliff, The Chanler, The Viking Hotel, Belle Mer, Rosecliff, Castle Hill Inn, and many more. If we haven't been there before, we always do a thorough walkthrough or scout in advance." },
    { q: "Who will shoot my wedding?", a: "Every member of our team shoots both photo and video. During your planning sessions we pair you with the shooters whose style and personality best match your vision — and you'll meet them before the day so there are no surprises." },
    { q: "Will we meet our photographer before the wedding?", a: "Absolutely. We schedule planning meetings throughout your engagement to build your timeline, discuss shot lists, and make sure you're comfortable with your creative team before the big day." },
    { q: "How many photos will we receive?", a: "A single-photographer package typically delivers ~600 images. Dual-photographer packages deliver 800–1,000+. The exact count depends on the length of your day and the number of events covered." },
    { q: "Do you direct poses or shoot candidly?", a: "Both. We shoot in a photojournalistic style — capturing real moments as they happen — but we also provide natural direction for portraits, group shots, and couple sessions. We'll never make you feel stiff or over-posed." },
    { q: "What happens if it rains?", a: "Rain has never ruined a wedding on our watch. We've shot in snow, wind, and downpours — and some of our most cinematic images have come from less-than-perfect weather. We also may buy umbrellas at 10pm the night before. We're that team." },
    { q: "Do you only shoot one wedding per day?", a: "Yes. Every MMC package is a one-wedding-per-day commitment. Your creative team is fully dedicated to your celebration from start to finish — no rushing to another event." },
  ]},
  { name: "Photography", icon: "◐", faqs: [
    { q: "How would you describe your style?", a: "Editorial more than purely photojournalistic. We create clean, simple, minimalistic images that still feel natural and organic — and we adapt our vision to your aesthetic instead of forcing a single look on every couple." },
    { q: "Should we get a second shooter?", a: "We strongly recommend it. A second shooter lets us cover getting-ready in two locations at once, capture more angles during the ceremony, double the total image count, and gives the lead more time with you for portraits." },
    { q: "Do you offer engagement sessions?", a: "Yes. Engagement sessions are included in most of our packages and can be added to any of them. Turnaround for engagement galleries is two weeks." },
    { q: "Will we own the rights to the photographs?", a: "Yes. You receive full personal usage rights to every image we deliver — print them, share them, frame them, hand them out to family. They're yours." },
    { q: "Will our images be watermarked?", a: "No. Your final gallery is delivered clean — no watermarks, no logos, no overlays." },
  ]},
  { name: "Videography", icon: "▶", faqs: [
    { q: "What types of films do you offer?", a: "Highlight Film (3–5 min cinematic edit), Stationary Films (key moments cut from fixed-perspective cameras), Teaser (30–60 sec social-ready cut), Doc Cut (10–20 min documentary-style edit), and Raw Footage (unedited clips straight from camera). Most packages combine several of these." },
    { q: "What's the difference between raw footage and stationary films?", a: "Raw Footage is every clip captured during your day, straight out of the camera with no editing. Stationary Films intercut multiple fixed-camera angles of key moments (ceremony, toasts, first dance) with color grading and direct HD audio sources from our recorders." },
    { q: "Can we choose the music for our film?", a: "We prefer to select the music since we know what works against the edit, but couples are absolutely welcome to be involved. We only use properly licensed tracks from MusicBed and Song Freedom — never anything that could get your wedding film taken down." },
    { q: "Should we do a card exchange?", a: "Yes — we love it. Reading letters to each other before the ceremony creates a genuine, emotional moment that becomes one of the strongest beats in your highlight film." },
    { q: "Do you include drone footage?", a: "Yes. Every video package includes drone footage, weather and FAA airspace permitting." },
  ]},
  { name: "Delivery & Editing", icon: "▣", faqs: [
    { q: "How long until we receive our photos?", a: "Sneak peek of 20–30 images: 3–5 days after your wedding. Full gallery delivery: 6–8 weeks. We never sacrifice quality for speed." },
    { q: "How long for video delivery?", a: "Highlight film (4–6 minutes): 8–12 weeks. Full ceremony and reception films: 10–14 weeks. Rush delivery is available for an additional fee." },
    { q: "What are the editing styles ('Looks')?", a: "We offer five distinct color-grading options: Classic, Portra, Moody, Bright, and Cinematic. During your planning session, we'll help you choose the one that fits your wedding's aesthetic. Visit our Looks page for detailed comparisons." },
    { q: "How are photos delivered?", a: "All images are delivered through a private online gallery with options for downloading, sharing, and ordering professional prints through our photo lab partner." },
    { q: "Can we request specific edits or retouching?", a: "Standard editing is included in every package (color grading, exposure correction, crop refinement). Advanced retouching (skin smoothing, object removal) is available as an add-on." },
  ]},
  { name: "Pricing & Packages", icon: "△", faqs: [
    { q: "What are your starting prices?", a: "Essentials (photography) starts at $3,200. Signature (dual photographer + album) starts at $5,400. Cinematic (photo + video) starts at $8,500. Elopements start at $2,200. All packages are customizable." },
    { q: "Can we build a custom package?", a: "Absolutely. The packages listed are starting points. We regularly create custom combinations — maybe you want two photographers but no album, or videography plus Super 8 but fewer hours. Tell us what matters to you." },
    { q: "Is travel included?", a: "Venues within 60 miles of Providence, RI are included at no extra charge. 60–100 miles: $200 travel fee. Beyond 100 miles: $300 fee, may require overnight accommodations. Destination weddings quoted separately." },
    { q: "Do you offer payment plans?", a: "Yes. For packages over $5,000, we offer structured payment plans split across 3–4 installments leading up to your wedding date." },
    { q: "Is it cheaper to book photo and video together?", a: "Yes — considerably. The more services you bundle through MMC, the better the per-service rate. Couples who book photo + video together save significantly versus hiring two separate vendors." },
    { q: "What payment methods do you accept?", a: "Bank transfer, credit card (3% processing fee via Stripe), Cash App ($movemountainsco), Venmo (@movemountainsco), and checks made out to Move Mountains Co. LLC." },
  ]},
  { name: "Gear & Process", icon: "✦", faqs: [
    { q: "What kind of gear do you use?", a: "We shoot on both Canon and Sony bodies with high-end professional lenses from both systems, plus Profoto strobes, DJI drones, and broadcast-grade audio recorders. Every shooter carries full backup gear at all times." },
    { q: "Who edits our wedding?", a: "Almost all of our editing is done in-house — both photo and video. The same team that knows your story is the team coloring it, cutting it, and shaping the final delivery." },
    { q: "Why MMC?", a: "We're a local boutique photo + video house in Providence, RI — young, highly creative, obsessive about gear and craft, and built around a one-wedding-per-day commitment. You're not getting a franchise: you're getting the founders." },
  ]},
  { name: "Albums & Products", icon: "○", faqs: [
    { q: "When can we order an album?", a: "Albums can be ordered anytime after you receive your full gallery — even years later. Most couples order within 3–6 months of delivery while the excitement is fresh." },
    { q: "How does the album design process work?", a: "Our design team selects the strongest images, creates an editorial layout, and sends you a digital proof. You review, request changes (unlimited revisions), and approve the final design. Production takes 4–6 weeks." },
    { q: "Do you offer parent albums?", a: "Yes. The Keepsake album (8×8\") is designed specifically as a parent or gift album. It can match the design of your main album in a compact format." },
  ]},
  { name: "Luxe Booth & Add-Ons", icon: "□", faqs: [
    { q: "What is Luxe Booth?", a: "Luxe Booth is our premium photo booth experience. High-quality prints, instant Airdrop/SMS sharing, custom branding, curated backdrops — and zero cheesy props. It's built for weddings that take themselves seriously." },
    { q: "Can we add services after booking?", a: "Yes. Add-ons (Super 8, content creation, Luxe Booth, extra hours, live streaming) can be added to any existing package up to 30 days before your wedding date, subject to availability." },
    { q: "What is the Content Creation add-on?", a: "A dedicated content creator captures vertical video, behind-the-scenes moments, and social-first content during your wedding — separate from your photographer and videographer. Same-day delivery available for Stories and Reels." },
  ]},
];

function FAQSection({ category, sectionIndex }) {
  const [openIndex, setOpenIndex] = useState(null);

  return (
    <div style={{ paddingBottom: 48 }} id={category.name.toLowerCase().replace(/ & /g, "-").replace(/ /g, "-")}>
      <FadeIn>
        <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 24 }}>
          <span style={{ fontFamily: "'DM Sans'", fontSize: 22, color: DS.gold, opacity: 0.5 }}>{category.icon}</span>
          <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(24px, 3vw, 32px)", fontWeight: 700, color: DS.text, margin: 0 }}>{category.name}</h2>
          <div style={{ height: 1, flex: 1, background: DS.border }} />
          <span style={{ fontFamily: "'DM Sans'", fontSize: 12, color: DS.textSec }}>{category.faqs.length} questions</span>
        </div>
      </FadeIn>

      {category.faqs.map((faq, i) => (
        <FadeIn key={i} delay={i * 0.03}>
          <div style={{ borderBottom: `1px solid ${DS.border}` }}>
            <button onClick={() => setOpenIndex(openIndex === i ? null : i)} style={{
              width: "100%", padding: "18px 0", background: "none", border: "none", cursor: "pointer",
              display: "flex", justifyContent: "space-between", alignItems: "center", gap: 16, textAlign: "left",
            }}>
              <span style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 18, color: openIndex === i ? DS.gold : DS.text, fontWeight: 500, transition: "color 0.2s" }}>{faq.q}</span>
              <motion.span animate={{ rotate: openIndex === i ? 45 : 0 }} transition={{ duration: 0.2 }}
                style={{ fontFamily: "'DM Sans'", fontSize: 20, color: DS.gold, flexShrink: 0, lineHeight: 1 }}>+</motion.span>
            </button>
            <AnimatePresence>
              {openIndex === i && (
                <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }} style={{ overflow: "hidden" }}>
                  <p style={{ fontFamily: "'DM Sans'", fontSize: 15, color: DS.textSec, lineHeight: 1.7, paddingBottom: 18, paddingLeft: 4, margin: 0 }}>{faq.a}</p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </FadeIn>
      ))}
    </div>
  );
}

export default function FAQPage() {
  const [scrolled, setScrolled] = useState(false);
  const totalQuestions = faqCategories.reduce((sum, c) => sum + c.faqs.length, 0);
  useEffect(() => { const fn = () => setScrolled(window.scrollY > 40); window.addEventListener("scroll", fn); return () => window.removeEventListener("scroll", fn); }, []);

  return (
    <div style={{ background: DS.bg, color: DS.text, minHeight: "100vh" }}>
      <style>{`
        @import url('${fontLink}'); * { margin: 0; padding: 0; box-sizing: border-box; } body { background: ${DS.bg}; } ::selection { background: ${DS.gold}; color: ${DS.bg}; }
        @media (max-width: 768px) { .nav-links { display: none !important; } .cat-nav { flex-wrap: wrap !important; } }
      `}</style>
      <Header activePage="Contact" />

      <div style={{ paddingTop: 100, maxWidth: 900, margin: "0 auto", padding: "100px 32px 0" }}>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.35 }}>
          <div style={{ fontFamily: "'DM Sans'", fontSize: 12, color: DS.gold, textTransform: "uppercase", letterSpacing: "0.2em", marginBottom: 12 }}>{totalQuestions} Questions Answered</div>
          <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(40px, 6vw, 72px)", fontWeight: 700, color: DS.text, lineHeight: 1.05, margin: "0 0 16px" }}>FAQ</h1>
          <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(17px, 2vw, 22px)", color: DS.textSec, fontStyle: "italic", maxWidth: 500 }}>Everything couples ask us — answered in one place. Can't find what you need? Just reach out.</p>
        </motion.div>

        {/* Category quick nav */}
        <div className="cat-nav" style={{ display: "flex", gap: 10, marginTop: 32, flexWrap: "wrap" }}>
          {faqCategories.map((c) => (
            <a key={c.name} href={`#${c.name.toLowerCase().replace(/ & /g, "-").replace(/ /g, "-")}`} style={{
              fontFamily: "'DM Sans'", fontSize: 11, color: DS.textSec, textDecoration: "none", padding: "6px 14px",
              border: `1px solid ${DS.border}`, transition: "all 0.3s", display: "flex", alignItems: "center", gap: 6,
            }}
              onMouseEnter={(e) => { e.currentTarget.style.borderColor = DS.gold; e.currentTarget.style.color = DS.gold; }}
              onMouseLeave={(e) => { e.currentTarget.style.borderColor = DS.border; e.currentTarget.style.color = DS.textSec; }}
            ><span style={{ fontSize: 14 }}>{c.icon}</span> {c.name}</a>
          ))}
        </div>

        <div style={{ height: 1, background: DS.border, marginTop: 32, marginBottom: 48 }} />

        {/* FAQ Sections */}
        {faqCategories.map((c, i) => <FAQSection key={c.name} category={c} sectionIndex={i} />)}
      </div>

      {/* CTA */}
      <div style={{ borderTop: `1px solid ${DS.border}`, padding: "80px 32px", textAlign: "center", background: DS.surface }}>
        <FadeIn>
          <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(28px, 3.5vw, 42px)", fontWeight: 700, color: DS.text, margin: "0 0 12px" }}>Still Have Questions?</h2>
          <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 20, color: DS.textSec, fontStyle: "italic", marginBottom: 28 }}>We respond to every inquiry within 24 hours.</p>
          <div style={{ display: "flex", gap: 16, justifyContent: "center", flexWrap: "wrap" }}>
            <a href="#" style={{ fontFamily: "'DM Sans'", fontSize: 14, color: DS.bg, background: DS.ember, padding: "16px 36px", textDecoration: "none", textTransform: "uppercase", letterSpacing: "0.1em", fontWeight: 600, transition: "background 0.3s" }}
              onMouseEnter={(e) => e.target.style.background = "#ff6b3d"} onMouseLeave={(e) => e.target.style.background = DS.ember}>Contact Us</a>
            <a href="#" style={{ fontFamily: "'DM Sans'", fontSize: 14, color: DS.gold, padding: "16px 36px", textDecoration: "none", textTransform: "uppercase", letterSpacing: "0.1em", border: `1px solid ${DS.gold}`, transition: "all 0.3s" }}
              onMouseEnter={(e) => { e.target.style.background = DS.gold; e.target.style.color = DS.bg; }} onMouseLeave={(e) => { e.target.style.background = "transparent"; e.target.style.color = DS.gold; }}>View Investment</a>
          </div>
        </FadeIn>
      </div>

      <Footer />
    </div>
  );
}
