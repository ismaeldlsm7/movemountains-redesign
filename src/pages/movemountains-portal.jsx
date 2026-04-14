import { useState, useRef } from "react";
import { motion, useInView, useScroll, useTransform, AnimatePresence } from "framer-motion";
import Header from "../components/Header";
import Footer from "../components/Footer";

const DS = {
  bg: "var(--mm-bg)", surface: "var(--mm-surface)", surfaceAlt: "var(--mm-surface-alt)",
  text: "var(--mm-text)", textSec: "var(--mm-text-sec)", gold: "var(--mm-gold)",
  ember: "var(--mm-ember)", border: "var(--mm-border)",
};

const fontLink = "https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,700;1,400&family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;0,700;1,400;1,500&family=DM+Sans:wght@400;500;600;700&family=Bebas+Neue&display=swap";

/* ── Helpers ────────────────────────────────────────────────────── */

function FadeIn({ children, delay = 0, y = 28, style: extraStyle }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });
  return (
    <motion.div ref={ref} initial={{ opacity: 0, y }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.7, delay, ease: [0.25, 0.1, 0.25, 1] }} style={extraStyle}>
      {children}
    </motion.div>
  );
}

function RevealLine({ delay = 0 }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-20px" });
  return (
    <motion.div ref={ref} initial={{ scaleX: 0 }} animate={inView ? { scaleX: 1 } : {}} transition={{ duration: 0.8, delay, ease: "easeOut" }}
      style={{ height: 1, background: DS.border, transformOrigin: "left" }} />
  );
}

/* ── Data ───────────────────────────────────────────────────────── */

const quickLinks = [
  { icon: "◎", label: "Welcome Guide", desc: "Start here — forms, deadlines, and your client journey map", anchor: "welcome" },
  { icon: "◇", label: "Photography", desc: "Photo forms, vision boards, and prep resources", anchor: "photography" },
  { icon: "▶", label: "Videography", desc: "Film vision, timeline forms, and reference guides", anchor: "videography" },
  { icon: "□", label: "Photo Booth", desc: "LuxeBooth setup form and vendor coordination", anchor: "photobooth" },
  { icon: "✦", label: "Albums", desc: "Design your album — tutorials, examples, and ordering", anchor: "albums" },
  { icon: "△", label: "Upgrades", desc: "Add-ons, expediting, and extra coverage options", anchor: "upgrades" },
  { icon: "○", label: "Feedback", desc: "Post-event surveys and service reviews", anchor: "feedback" },
  { icon: "◈", label: "Support", desc: "Submit a ticket or reach the team directly", anchor: "support" },
];

const portalSections = [
  {
    id: "welcome",
    title: "Welcome Guide",
    subtitle: "Everything you need to get started",
    icon: "01",
    description: "Welcome to the MMC Planning Portal — your central hub for everything leading up to your event. All forms and questionnaires should be submitted 90–120 days before your date to give our team enough time to prepare. The earlier you submit, the more tailored your experience will be.",
    items: [
      { type: "form", name: "Photo Vision Form", desc: "Tell us your style preferences, must-have shots, and visual references so we can match your vision." },
      { type: "form", name: "Video Vision Form", desc: "Share your film inspiration, song preferences, and the moments you want highlighted in your cinematic edit." },
      { type: "form", name: "Photo Booth Form", desc: "Customize your LuxeBooth experience — backdrop, props, print layout, and activation timing." },
      { type: "form", name: "Vendors Form", desc: "List every vendor on your team so we can coordinate seamlessly on the day of." },
      { type: "form", name: "Timeline Questionnaire", desc: "Walk us through your day — ceremony time, first look, reception flow — so we never miss a beat." },
      { type: "link", name: "Client Journey Map", desc: "A visual roadmap of your entire MMC experience from booking to final delivery. Open in Canva." },
    ],
  },
  {
    id: "engagement",
    title: "Engagement Sessions",
    subtitle: "Plan your engagement or portrait session",
    icon: "02",
    description: "Your engagement session is more than a photoshoot — it's where we learn how you move together, what makes you laugh, and how to capture you at your most natural. Use the resources below to prepare.",
    items: [
      { type: "link", name: "Resource + Locations Guide", desc: "Curated locations across New England with sample images, best times, and parking details." },
      { type: "link", name: "Session Tips", desc: "What to wear, how to prepare, and how to feel natural in front of the camera." },
      { type: "form", name: "Session Booking Form", desc: "Choose your date, time, and location. We'll confirm within 24 hours." },
      { type: "form", name: "Session Upgrades", desc: "Add extra time, a second location, outfit changes, or a print package to your session." },
      { type: "form", name: "Reschedule Request", desc: "Need to move your date? Submit here — rescheduling is free up to 7 days before your session." },
    ],
  },
  {
    id: "photography",
    title: "Photography",
    subtitle: "Forms and resources for your photo coverage",
    icon: "03",
    description: "These forms help our photography team understand exactly what you're looking for — from family formal groupings to your preferred editing style. The more detail you provide, the more personalized your gallery will be.",
    items: [
      { type: "form", name: "Photography Timeline", desc: "Build your photo timeline with us — key moments, group shots, and creative time blocks." },
      { type: "form", name: "Timeline Upgrades", desc: "Need more coverage hours? Add early getting-ready, after-party, or next-day sessions." },
      { type: "form", name: "Photo Vision Form", desc: "Share Pinterest boards, Instagram saves, and any visual references that represent your style." },
      { type: "form", name: "Vendors List", desc: "Help us coordinate with your planner, florist, DJ, and venue contacts." },
      { type: "link", name: "Prep Photo Guide", desc: "How to prepare your space, your details, and yourself for getting-ready photos that feel effortless." },
      { type: "link", name: "Timeline Crafting Guide", desc: "A walkthrough of how we build photo timelines — golden hour math, travel buffers, and sunset charts." },
      { type: "link", name: "Photography Best Practices", desc: "What our most-loved galleries have in common — and how to set yourself up for the same result." },
    ],
  },
  {
    id: "videography",
    title: "Videography",
    subtitle: "Forms and resources for your film coverage",
    icon: "04",
    description: "Your wedding film is the only way to relive the day in motion — the vows, the speeches, the first dance. These forms help our film team craft something cinematic and deeply personal.",
    items: [
      { type: "form", name: "Videography Timeline", desc: "Sync your film coverage with the day's schedule — ceremony, toasts, dances, and exit." },
      { type: "form", name: "Video Vision Form", desc: "Music preferences, film style references, and the emotional tone you want your edit to carry." },
      { type: "form", name: "Vendors List", desc: "Coordinate audio, lighting, and DJ contacts so we capture clean sound and smooth transitions." },
      { type: "link", name: "Why Prep Coverage Matters", desc: "The getting-ready moments that make your highlight reel feel complete — and how to plan for them." },
      { type: "link", name: "Highlight Film Tips", desc: "What separates a great highlight film from a generic montage — and how your input shapes the edit." },
      { type: "link", name: "Film Reference Guide", desc: "Browse real MMC films by style and mood to help us understand what resonates with you." },
    ],
  },
  {
    id: "photovideo",
    title: "Photo + Video Bundle",
    subtitle: "Combined forms for dual-coverage packages",
    icon: "05",
    description: "Booked both photo and video? This section has everything in one place — combined timelines, shared vendor forms, and coordinated vision questionnaires so both teams are perfectly aligned.",
    items: [
      { type: "form", name: "Combined Timeline", desc: "One unified timeline for both photo and video teams — first look, ceremony, formals, and reception." },
      { type: "form", name: "Photo Vision Form", desc: "Photography style, must-have shots, and visual references for your gallery." },
      { type: "form", name: "Video Vision Form", desc: "Film tone, music, and cinematic preferences for your wedding edit." },
      { type: "form", name: "Vendors List", desc: "Full vendor directory shared across both creative teams." },
    ],
  },
  {
    id: "photobooth",
    title: "Photo Booth",
    subtitle: "Customize your LuxeBooth experience",
    icon: "06",
    description: "The LuxeBooth isn't your average photo booth — it's a fully styled, open-air experience with custom prints, digital sharing, and a guest book option. Customize everything below.",
    items: [
      { type: "form", name: "Photo Booth Setup Form", desc: "Backdrop selection, print template, digital gallery settings, and activation window." },
      { type: "form", name: "Vendor Contact Form", desc: "Share your venue contact and coordinator so we can plan load-in and placement." },
    ],
  },
  {
    id: "rehearsal",
    title: "Rehearsal Coverage",
    subtitle: "Timeline form for your rehearsal dinner",
    icon: "07",
    description: "Adding rehearsal coverage? Submit your rehearsal timeline so we know the venue, schedule, and key moments you want captured the night before.",
    items: [
      { type: "form", name: "Rehearsal Timeline Form", desc: "Venue, arrival time, toasts, dinner flow — everything we need for seamless rehearsal coverage." },
    ],
  },
  {
    id: "content",
    title: "Content Creation",
    subtitle: "Day-of social media coverage",
    icon: "08",
    description: "Our content team works independently from photo and video to capture vertical, social-first content — Reels, TikToks, and Stories delivered same-day or within 48 hours.",
    items: [
      { type: "form", name: "Content Creation Vision Form", desc: "Platforms you use, content style preferences, hashtags, and any specific moments you want captured for social." },
    ],
  },
  {
    id: "livestream",
    title: "Livestreaming",
    subtitle: "Keep everyone connected in real time",
    icon: "09",
    description: "For guests who can't be there in person — grandparents, friends overseas, anyone who would have been in the room if they could. Set up your stream details below.",
    items: [
      { type: "form", name: "Livestream Questionnaire", desc: "Platform preference, stream start time, private link distribution, and any special messaging for remote guests." },
    ],
  },
];

const albumSection = {
  id: "albums",
  title: "Albums + Prints",
  subtitle: "Design and order your keepsake",
  description: "Your album is the final chapter of the MMC experience. We handle the design, you approve it, and we deliver a handcrafted piece that lasts generations. Use the resources below to get started.",
  items: [
    { type: "video", name: "Album Design Tutorial", desc: "Step-by-step Loom walkthrough of the album design process — from selecting images to approving layouts." },
    { type: "video", name: "How to Review Your Album", desc: "Learn how to use our album proofing tool to request changes, swap images, and approve your final design." },
    { type: "link", name: "Photo + Video Examples", desc: "Browse completed albums and film packages to see the quality and style of our finished deliverables." },
    { type: "form", name: "Album Design Form", desc: "Select your album size, cover material, page count, and any special requests for your designer." },
    { type: "form", name: "Album Purchase", desc: "Ready to order? Finalize your album package and complete payment through our secure Stripe portal." },
    { type: "form", name: "Customization Questionnaire", desc: "Engraving, box upgrades, parent copies, and specialty finishes — make it yours." },
  ],
};

const upgradeOptions = [
  { name: "Engagement Session Upgrade", desc: "Add time, locations, or outfit changes to your engagement session.", tag: "Session" },
  { name: "Timeline Upgrade", desc: "Extend your wedding day coverage — early getting-ready, after-party, or brunch.", tag: "Coverage" },
  { name: "Raw Photo Purchase", desc: "Request unedited RAW files from your gallery. Available 30 days post-delivery.", tag: "Gallery" },
  { name: "Gallery Expediting", desc: "Rush your photo gallery delivery from 6–8 weeks to 2–3 weeks.", tag: "Rush" },
  { name: "Film Expediting", desc: "Rush your wedding film delivery from 12–16 weeks to 4–6 weeks.", tag: "Rush" },
  { name: "Additional Film Package", desc: "Add a ceremony edit, reception edit, or extended highlight to your order.", tag: "Film" },
  { name: "Parent Album Copies", desc: "Smaller-format duplicate albums for parents — same design, different size.", tag: "Album" },
  { name: "Second Shooter Add-On", desc: "Add an extra photographer or videographer for expanded coverage angles.", tag: "Coverage" },
];

const feedbackForms = [
  { name: "Photography Experience", desc: "Rate your photographer, gallery delivery, and overall photo experience." },
  { name: "Videography Experience", desc: "Rate your film team, edit quality, and communication throughout the process." },
  { name: "Photo Booth Experience", desc: "How was the LuxeBooth? Print quality, guest engagement, and overall experience." },
  { name: "Livestream Experience", desc: "Stream quality, reliability, and guest feedback for your live broadcast." },
  { name: "Delivery Experience", desc: "Timeliness, communication, and quality of your final gallery and film deliverables." },
  { name: "Album Quality", desc: "Print quality, binding, packaging, and overall satisfaction with your finished album." },
];

const rewardsTiers = [
  { tier: "Bronze", requirement: "After first booking", discount: "5% off", perks: "Priority booking for future sessions, early access to new services" },
  { tier: "Silver", requirement: "2+ bookings or 1 referral", discount: "10% off", perks: "Free engagement session upgrade, priority editing queue" },
  { tier: "Gold", requirement: "3+ bookings or 2 referrals", discount: "15% off", perks: "Complimentary parent album, VIP scheduling, free expediting on one deliverable" },
];

/* ── Accordion Section Component ───────────────────────────────── */

function PortalAccordion({ section, defaultOpen = false }) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div id={section.id} style={{ scrollMarginTop: 100 }}>
      <div style={{ border: `1px solid ${DS.border}`, transition: "border-color 0.3s" }}
        onMouseEnter={(e) => { if (!open) e.currentTarget.style.borderColor = "rgba(201,169,110,0.3)"; }}
        onMouseLeave={(e) => { if (!open) e.currentTarget.style.borderColor = DS.border; }}
        style={{ border: `1px solid ${open ? DS.gold : DS.border}`, transition: "border-color 0.4s" }}>
        <button onClick={() => setOpen(!open)} style={{
          width: "100%", display: "flex", justifyContent: "space-between", alignItems: "center",
          padding: "24px 28px", background: "none", border: "none", cursor: "pointer", textAlign: "left", gap: 16,
        }}>
          <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
            <span style={{ fontFamily: "'Bebas Neue'", fontSize: 22, color: DS.gold, opacity: 0.4, lineHeight: 1, minWidth: 28 }}>{section.icon}</span>
            <div>
              <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(18px, 2vw, 24px)", fontWeight: 700, color: DS.text, margin: 0 }}>{section.title}</h3>
              <div style={{ fontFamily: "'DM Sans'", fontSize: 13, color: DS.textSec, marginTop: 2 }}>{section.subtitle}</div>
            </div>
          </div>
          <motion.span animate={{ rotate: open ? 45 : 0 }} transition={{ duration: 0.2 }}
            style={{ fontFamily: "'DM Sans'", fontSize: 26, color: DS.gold, flexShrink: 0, lineHeight: 1 }}>+</motion.span>
        </button>

        <AnimatePresence>
          {open && (
            <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.35 }} style={{ overflow: "hidden" }}>
              <div style={{ padding: "0 28px 28px" }}>
                <div style={{ borderTop: `1px solid ${DS.border}`, paddingTop: 20 }}>
                  <p style={{ fontFamily: "'DM Sans'", fontSize: 14, color: DS.textSec, lineHeight: 1.7, marginBottom: 24, maxWidth: 700 }}>{section.description}</p>

                  <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: 12 }} className="portal-items-grid">
                    {section.items.map((item) => (
                      <PortalItem key={item.name} item={item} />
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

/* ── Portal Item Card ──────────────────────────────────────────── */

function PortalItem({ item }) {
  const typeConfig = {
    form: { label: "Form", color: DS.ember },
    link: { label: "Resource", color: DS.gold },
    video: { label: "Video", color: "var(--mm-text-sec)" },
  };
  const config = typeConfig[item.type] || typeConfig.link;

  return (
    <div style={{
      padding: "16px 20px", border: `1px solid ${DS.border}`, transition: "all 0.3s",
      cursor: "pointer", display: "flex", flexDirection: "column", gap: 8,
    }}
      onMouseEnter={(e) => { e.currentTarget.style.borderColor = DS.gold; e.currentTarget.style.background = DS.surfaceAlt; }}
      onMouseLeave={(e) => { e.currentTarget.style.borderColor = DS.border; e.currentTarget.style.background = "transparent"; }}
    >
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <span style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 17, fontWeight: 600, color: DS.text }}>{item.name}</span>
        <span style={{ fontFamily: "'DM Sans'", fontSize: 10, color: config.color, textTransform: "uppercase", letterSpacing: "0.08em", border: `1px solid ${config.color}`, padding: "2px 8px", flexShrink: 0, opacity: 0.8 }}>{config.label}</span>
      </div>
      <p style={{ fontFamily: "'DM Sans'", fontSize: 13, color: DS.textSec, lineHeight: 1.55, margin: 0 }}>{item.desc}</p>
      <div style={{ fontFamily: "'DM Sans'", fontSize: 12, color: DS.gold, marginTop: "auto", paddingTop: 4 }}>
        {item.type === "form" ? "Open Form →" : item.type === "video" ? "Watch Tutorial →" : "View Resource →"}
      </div>
    </div>
  );
}

/* ── FAQ Item ──────────────────────────────────────────────────── */

function FAQItem({ question, answer, index }) {
  const [open, setOpen] = useState(false);
  return (
    <FadeIn delay={index * 0.05}>
      <div style={{ borderBottom: `1px solid ${DS.border}` }}>
        <button onClick={() => setOpen(!open)} style={{
          width: "100%", display: "flex", justifyContent: "space-between", alignItems: "center",
          padding: "20px 0", background: "none", border: "none", cursor: "pointer", textAlign: "left",
        }}>
          <span style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(16px, 1.6vw, 19px)", fontWeight: 700, color: DS.text, paddingRight: 16 }}>{question}</span>
          <motion.span animate={{ rotate: open ? 45 : 0 }} transition={{ duration: 0.2 }}
            style={{ fontFamily: "'DM Sans'", fontSize: 22, color: DS.gold, flexShrink: 0, lineHeight: 1 }}>+</motion.span>
        </button>
        <AnimatePresence>
          {open && (
            <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.3 }} style={{ overflow: "hidden" }}>
              <p style={{ fontFamily: "'DM Sans'", fontSize: 14, color: DS.textSec, lineHeight: 1.7, paddingBottom: 20 }}>{answer}</p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </FadeIn>
  );
}

/* ── Main Portal Page ──────────────────────────────────────────── */

export default function PortalPage() {
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const heroScale = useTransform(scrollYProgress, [0, 1], [1.05, 1.18]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

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

        @media (max-width: 768px) {
          .quick-grid { grid-template-columns: 1fr 1fr !important; }
          .portal-items-grid { grid-template-columns: 1fr !important; }
          .upgrades-grid { grid-template-columns: 1fr !important; }
          .feedback-grid { grid-template-columns: 1fr !important; }
          .rewards-grid { grid-template-columns: 1fr !important; }
          .chapter-grid { grid-template-columns: 1fr !important; }
          .chapter-grid > * { order: unset !important; }
          .deadline-grid { grid-template-columns: 1fr !important; }
        }
        @media (max-width: 540px) {
          .quick-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>

      <Header activePage="" />

      {/* ── HERO ──────────────────────────────────────────────────── */}
      <div ref={heroRef} style={{ height: "55vh", minHeight: 380, maxHeight: 600, position: "relative", overflow: "hidden" }}>
        <motion.div style={{ scale: heroScale, position: "absolute", inset: 0 }}>
          <div style={{
            width: "100%", height: "100%",
            background: "linear-gradient(160deg, var(--mm-surface) 0%, var(--mm-surface-alt) 40%, var(--mm-surface) 70%, var(--mm-bg) 100%)",
            display: "flex", alignItems: "center", justifyContent: "center",
          }}>
            <span style={{ fontFamily: "'DM Sans'", fontSize: 13, color: DS.textSec, opacity: 0.3, textTransform: "uppercase", letterSpacing: "0.2em" }}>
              [ Client Planning Portal ]
            </span>
          </div>
        </motion.div>

        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to bottom, rgba(15,15,15,0.2) 0%, rgba(15,15,15,0.15) 40%, rgba(15,15,15,0.75) 80%, var(--mm-bg) 100%)" }} />

        <motion.div style={{ opacity: heroOpacity, position: "absolute", bottom: "12%", left: 0, right: 0, padding: "0 32px" }}>
          <div style={{ maxWidth: 1400, margin: "0 auto" }}>
            <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5, duration: 0.7 }}>
              <div style={{ fontFamily: "'DM Sans'", fontSize: 12, color: DS.gold, textTransform: "uppercase", letterSpacing: "0.2em", marginBottom: 16 }}>Client Portal</div>
              <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(38px, 6vw, 72px)", fontWeight: 700, color: DS.text, lineHeight: 1.05, margin: 0, maxWidth: 700 }}>
                Your Planning<br /><span style={{ color: DS.gold }}>Hub.</span>
              </h1>
            </motion.div>
          </div>
        </motion.div>
      </div>

      {/* ── WELCOME BANNER ────────────────────────────────────────── */}
      <div style={{ maxWidth: 1400, margin: "0 auto", padding: "80px 32px 0" }}>
        <FadeIn>
          <div style={{ maxWidth: 700 }}>
            <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(20px, 2.5vw, 28px)", color: DS.text, lineHeight: 1.5, fontWeight: 400, fontStyle: "italic" }}>
              Everything you need to plan, prepare, and stay connected with the MMC team — from your first form submission to your final album delivery. All in one place.
            </p>
          </div>
        </FadeIn>
        <RevealLine delay={0.2} />
      </div>

      {/* ── DEADLINES BANNER ──────────────────────────────────────── */}
      <div style={{ maxWidth: 1400, margin: "0 auto", padding: "48px 32px" }}>
        <FadeIn>
          <div style={{ border: `1px solid ${DS.gold}`, padding: "28px 32px", background: "rgba(201,169,110,0.03)" }}>
            <div style={{ display: "grid", gridTemplateColumns: "auto 1fr", gap: 24, alignItems: "center" }} className="deadline-grid">
              <div style={{ fontFamily: "'Bebas Neue'", fontSize: 48, color: DS.gold, opacity: 0.3, lineHeight: 1 }}>!</div>
              <div>
                <div style={{ fontFamily: "'DM Sans'", fontSize: 11, color: DS.gold, textTransform: "uppercase", letterSpacing: "0.15em", marginBottom: 6 }}>Important Deadline</div>
                <p style={{ fontFamily: "'DM Sans'", fontSize: 15, color: DS.text, lineHeight: 1.6, margin: 0 }}>
                  All planning forms and questionnaires should be submitted <strong style={{ color: DS.gold }}>90–120 days before your event date</strong>. This gives our creative team enough time to review your vision, build your timeline, and coordinate with your vendors. The earlier you submit, the more personalized your experience will be.
                </p>
              </div>
            </div>
          </div>
        </FadeIn>
      </div>

      {/* ── QUICK LINKS ───────────────────────────────────────────── */}
      <div style={{ maxWidth: 1400, margin: "0 auto", padding: "0 32px 60px" }}>
        <FadeIn>
          <div style={{ fontFamily: "'DM Sans'", fontSize: 12, color: DS.gold, textTransform: "uppercase", letterSpacing: "0.2em", marginBottom: 24 }}>Quick Access</div>
        </FadeIn>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 12 }} className="quick-grid">
          {quickLinks.map((link, i) => (
            <FadeIn key={link.label} delay={i * 0.04} style={{ height: "100%" }}>
              <a href={`#${link.anchor}`} style={{
                display: "flex", flexDirection: "column", padding: "20px", border: `1px solid ${DS.border}`,
                textDecoration: "none", transition: "all 0.3s", cursor: "pointer", height: "100%",
              }}
                onMouseEnter={(e) => { e.currentTarget.style.borderColor = DS.gold; e.currentTarget.style.background = DS.surfaceAlt; }}
                onMouseLeave={(e) => { e.currentTarget.style.borderColor = DS.border; e.currentTarget.style.background = "transparent"; }}
              >
                <div style={{ fontFamily: "'DM Sans'", fontSize: 22, color: DS.gold, opacity: 0.6, marginBottom: 10 }}>{link.icon}</div>
                <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 18, fontWeight: 600, color: DS.text, marginBottom: 4 }}>{link.label}</div>
                <div style={{ fontFamily: "'DM Sans'", fontSize: 12, color: DS.textSec, lineHeight: 1.5 }}>{link.desc}</div>
              </a>
            </FadeIn>
          ))}
        </div>
      </div>

      {/* ── PLANNING SECTIONS (ACCORDIONS) ─────────────────────────── */}
      <div style={{ background: DS.surface, borderTop: `1px solid ${DS.border}`, borderBottom: `1px solid ${DS.border}`, padding: "100px 32px" }}>
        <div style={{ maxWidth: 1000, margin: "0 auto" }}>
          <FadeIn>
            <div style={{ marginBottom: 48 }}>
              <div style={{ fontFamily: "'DM Sans'", fontSize: 12, color: DS.gold, textTransform: "uppercase", letterSpacing: "0.2em", marginBottom: 12 }}>Your Services</div>
              <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(28px, 3.5vw, 42px)", fontWeight: 700, color: DS.text, margin: "0 0 12px" }}>
                Planning Forms + Resources
              </h2>
              <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(17px, 2vw, 22px)", color: DS.textSec, fontStyle: "italic", maxWidth: 550 }}>
                Open the section that matches your package. Each one contains every form, guide, and resource you'll need.
              </p>
            </div>
          </FadeIn>

          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            {portalSections.map((section, i) => (
              <FadeIn key={section.id} delay={i * 0.03}>
                <PortalAccordion section={section} defaultOpen={section.id === "welcome"} />
              </FadeIn>
            ))}
          </div>
        </div>
      </div>

      {/* ── ALBUMS SECTION ────────────────────────────────────────── */}
      <div id="albums" style={{ scrollMarginTop: 100, maxWidth: 1000, margin: "0 auto", padding: "100px 32px" }}>
        <FadeIn>
          <div style={{ marginBottom: 40 }}>
            <div style={{ fontFamily: "'DM Sans'", fontSize: 12, color: DS.gold, textTransform: "uppercase", letterSpacing: "0.2em", marginBottom: 12 }}>Keepsakes</div>
            <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(28px, 3.5vw, 42px)", fontWeight: 700, color: DS.text, margin: "0 0 12px" }}>
              Albums + Prints
            </h2>
            <p style={{ fontFamily: "'DM Sans'", fontSize: 15, color: DS.textSec, lineHeight: 1.7, maxWidth: 650 }}>{albumSection.description}</p>
          </div>
        </FadeIn>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: 12 }} className="portal-items-grid">
          {albumSection.items.map((item, i) => (
            <FadeIn key={item.name} delay={i * 0.05}>
              <PortalItem item={item} />
            </FadeIn>
          ))}
        </div>
      </div>

      {/* ── UPGRADES + ADD-ONS ─────────────────────────────────────── */}
      <div id="upgrades" style={{ scrollMarginTop: 100, background: DS.surface, borderTop: `1px solid ${DS.border}`, borderBottom: `1px solid ${DS.border}`, padding: "100px 32px" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <FadeIn>
            <div style={{ marginBottom: 48 }}>
              <div style={{ fontFamily: "'DM Sans'", fontSize: 12, color: DS.gold, textTransform: "uppercase", letterSpacing: "0.2em", marginBottom: 12 }}>Enhance Your Package</div>
              <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(28px, 3.5vw, 42px)", fontWeight: 700, color: DS.text, margin: "0 0 12px" }}>
                Upgrades + Add-Ons
              </h2>
              <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(17px, 2vw, 22px)", color: DS.textSec, fontStyle: "italic", maxWidth: 550 }}>
                Already booked? Add more coverage, rush delivery, or expand your package at any time before your event.
              </p>
            </div>
          </FadeIn>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 12 }} className="upgrades-grid">
            {upgradeOptions.map((upgrade, i) => (
              <FadeIn key={upgrade.name} delay={i * 0.04}>
                <div style={{
                  padding: "20px 24px", border: `1px solid ${DS.border}`, transition: "all 0.3s",
                  cursor: "pointer", display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 16,
                }}
                  onMouseEnter={(e) => { e.currentTarget.style.borderColor = DS.gold; e.currentTarget.style.background = DS.surfaceAlt; }}
                  onMouseLeave={(e) => { e.currentTarget.style.borderColor = DS.border; e.currentTarget.style.background = "transparent"; }}
                >
                  <div>
                    <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 18, fontWeight: 600, color: DS.text, marginBottom: 4 }}>{upgrade.name}</div>
                    <p style={{ fontFamily: "'DM Sans'", fontSize: 13, color: DS.textSec, lineHeight: 1.55, margin: 0 }}>{upgrade.desc}</p>
                    <div style={{ fontFamily: "'DM Sans'", fontSize: 12, color: DS.gold, marginTop: 8 }}>Purchase →</div>
                  </div>
                  <span style={{ fontFamily: "'DM Sans'", fontSize: 10, color: DS.textSec, textTransform: "uppercase", letterSpacing: "0.06em", border: `1px solid ${DS.border}`, padding: "3px 10px", flexShrink: 0, whiteSpace: "nowrap" }}>{upgrade.tag}</span>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </div>

      {/* ── REWARDS PROGRAM ───────────────────────────────────────── */}
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "100px 32px" }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "clamp(32px, 5vw, 80px)", alignItems: "start" }} className="chapter-grid">
          <div>
            <FadeIn>
              <div style={{ fontFamily: "'DM Sans'", fontSize: 12, color: DS.gold, textTransform: "uppercase", letterSpacing: "0.2em", marginBottom: 12 }}>Loyalty</div>
              <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(28px, 3.5vw, 42px)", fontWeight: 700, color: DS.text, lineHeight: 1.15, margin: "0 0 24px" }}>
                Rewards Program
              </h2>
            </FadeIn>
            <FadeIn delay={0.1}>
              <p style={{ fontFamily: "'DM Sans'", fontSize: 15, color: DS.textSec, lineHeight: 1.75, marginBottom: 20 }}>
                Every MMC client is automatically enrolled in our Rewards Program after their first booking. The more you work with us — or refer friends who do — the more you save. Discounts are valid for 2 years from the date earned and apply to all future bookings, upgrades, and add-ons.
              </p>
              <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                {[
                  "Automatic enrollment — no sign-up required",
                  "Discounts stack with seasonal promotions",
                  "Referrals count toward tier upgrades",
                  "Valid for 2 years from date earned",
                  "Priority access to new services and limited releases",
                ].map((item, i) => (
                  <div key={i} style={{ display: "flex", alignItems: "flex-start", gap: 10 }}>
                    <span style={{ width: 5, height: 5, background: DS.gold, borderRadius: "50%", flexShrink: 0, marginTop: 8 }} />
                    <span style={{ fontFamily: "'DM Sans'", fontSize: 14, color: DS.text, lineHeight: 1.6 }}>{item}</span>
                  </div>
                ))}
              </div>
            </FadeIn>
          </div>
          <div>
            <FadeIn delay={0.1}>
              <div style={{ display: "flex", flexDirection: "column", gap: 16 }} className="rewards-grid">
                {rewardsTiers.map((t, i) => (
                  <div key={t.tier} style={{ border: `1px solid ${DS.border}`, padding: "24px", transition: "border-color 0.3s" }}
                    onMouseEnter={(e) => e.currentTarget.style.borderColor = DS.gold}
                    onMouseLeave={(e) => e.currentTarget.style.borderColor = DS.border}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
                      <div style={{ fontFamily: "'Playfair Display', serif", fontSize: 22, fontWeight: 700, color: DS.text }}>{t.tier}</div>
                      <div style={{ fontFamily: "'Bebas Neue'", fontSize: 28, color: DS.gold, lineHeight: 1 }}>{t.discount}</div>
                    </div>
                    <div style={{ fontFamily: "'DM Sans'", fontSize: 12, color: DS.gold, textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: 8 }}>{t.requirement}</div>
                    <p style={{ fontFamily: "'DM Sans'", fontSize: 13, color: DS.textSec, lineHeight: 1.55, margin: 0 }}>{t.perks}</p>
                  </div>
                ))}
              </div>
            </FadeIn>
          </div>
        </div>
      </div>

      {/* ── FEEDBACK ───────────────────────────────────────────────── */}
      <div id="feedback" style={{ scrollMarginTop: 100, background: DS.surface, borderTop: `1px solid ${DS.border}`, borderBottom: `1px solid ${DS.border}`, padding: "100px 32px" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <FadeIn>
            <div style={{ marginBottom: 48 }}>
              <div style={{ fontFamily: "'DM Sans'", fontSize: 12, color: DS.gold, textTransform: "uppercase", letterSpacing: "0.2em", marginBottom: 12 }}>After Your Event</div>
              <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(28px, 3.5vw, 42px)", fontWeight: 700, color: DS.text, margin: "0 0 12px" }}>
                Feedback + Reviews
              </h2>
              <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(17px, 2vw, 22px)", color: DS.textSec, fontStyle: "italic", maxWidth: 550 }}>
                Your honest feedback makes us better. Fill out the surveys that apply to your package — it takes less than 5 minutes.
              </p>
            </div>
          </FadeIn>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 12 }} className="feedback-grid">
            {feedbackForms.map((form, i) => (
              <FadeIn key={form.name} delay={i * 0.05}>
                <div style={{
                  padding: "20px 24px", border: `1px solid ${DS.border}`, transition: "all 0.3s",
                  cursor: "pointer", height: "100%", display: "flex", flexDirection: "column",
                }}
                  onMouseEnter={(e) => { e.currentTarget.style.borderColor = DS.gold; e.currentTarget.style.background = DS.surfaceAlt; }}
                  onMouseLeave={(e) => { e.currentTarget.style.borderColor = DS.border; e.currentTarget.style.background = "transparent"; }}
                >
                  <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 18, fontWeight: 600, color: DS.text, marginBottom: 6 }}>{form.name}</div>
                  <p style={{ fontFamily: "'DM Sans'", fontSize: 13, color: DS.textSec, lineHeight: 1.55, margin: 0, flex: 1 }}>{form.desc}</p>
                  <div style={{ fontFamily: "'DM Sans'", fontSize: 12, color: DS.gold, marginTop: 12 }}>Open Survey →</div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </div>

      {/* ── ADDITIONAL RESOURCES ───────────────────────────────────── */}
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "100px 32px" }}>
        <FadeIn>
          <div style={{ marginBottom: 48 }}>
            <div style={{ fontFamily: "'DM Sans'", fontSize: 12, color: DS.gold, textTransform: "uppercase", letterSpacing: "0.2em", marginBottom: 12 }}>More Tools</div>
            <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(28px, 3.5vw, 42px)", fontWeight: 700, color: DS.text, margin: 0 }}>
              Additional Resources
            </h2>
          </div>
        </FadeIn>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 16 }} className="feedback-grid">
          {[
            { title: "Book a Future Shoot", desc: "Anniversaries, maternity, family portraits — book your next session with the MMC team.", action: "Book Now →", icon: "◎" },
            { title: "Book LuxeBooth", desc: "Need the booth for a non-wedding event? Corporate party, birthday, fundraiser — we do it all.", action: "Reserve →", icon: "□" },
            { title: "Client Film Review", desc: "Watch your Vimeo preview, leave timestamped notes, and request edits before final delivery.", action: "Open Vimeo →", icon: "▶" },
            { title: "Raw Footage Access", desc: "Tips for accessing and managing your raw footage via Dropbox — file organization and download guides.", action: "View Guide →", icon: "◇" },
            { title: "Preferred Vendors", desc: "Our curated list of planners, florists, DJs, venues, and vendors we trust and work with regularly.", action: "View List →", icon: "△" },
            { title: "Support Ticket", desc: "Question, issue, or special request? Submit a ticket and our team will respond within 24 hours.", action: "Submit Ticket →", icon: "○" },
          ].map((resource, i) => (
            <FadeIn key={resource.title} delay={i * 0.05}>
              <div style={{
                padding: "clamp(24px, 3vw, 32px)", border: `1px solid ${DS.border}`, height: "100%",
                transition: "all 0.3s", cursor: "pointer", display: "flex", flexDirection: "column",
              }}
                onMouseEnter={(e) => { e.currentTarget.style.borderColor = DS.gold; e.currentTarget.style.background = DS.surfaceAlt; }}
                onMouseLeave={(e) => { e.currentTarget.style.borderColor = DS.border; e.currentTarget.style.background = "transparent"; }}
              >
                <div style={{ fontFamily: "'DM Sans'", fontSize: 24, color: DS.gold, opacity: 0.6, marginBottom: 14 }}>{resource.icon}</div>
                <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 20, fontWeight: 600, color: DS.text, marginBottom: 8 }}>{resource.title}</div>
                <p style={{ fontFamily: "'DM Sans'", fontSize: 13, color: DS.textSec, lineHeight: 1.6, margin: 0, flex: 1 }}>{resource.desc}</p>
                <div style={{ fontFamily: "'DM Sans'", fontSize: 12, color: DS.gold, marginTop: 14 }}>{resource.action}</div>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>

      {/* ── FAQ ────────────────────────────────────────────────────── */}
      <div id="support" style={{ scrollMarginTop: 100, borderTop: `1px solid ${DS.border}`, padding: "100px 32px", background: DS.surface }}>
        <div style={{ maxWidth: 800, margin: "0 auto" }}>
          <FadeIn>
            <div style={{ textAlign: "center", marginBottom: 48 }}>
              <div style={{ fontFamily: "'DM Sans'", fontSize: 12, color: DS.gold, textTransform: "uppercase", letterSpacing: "0.2em", marginBottom: 12 }}>Portal Help</div>
              <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(28px, 3.5vw, 42px)", fontWeight: 700, color: DS.text, margin: 0 }}>
                Common Questions
              </h2>
            </div>
          </FadeIn>
          {[
            { q: "When should I submit my planning forms?", a: "90–120 days before your event is ideal. This gives our team enough time to review your preferences, build a custom timeline, coordinate with your vendors, and prepare everything for a seamless event day. Late submissions may limit our ability to accommodate special requests." },
            { q: "What if I don't have all the info yet?", a: "Submit what you have — you can update forms later. It's better to start early with partial information than to wait until everything is perfect. Our team will follow up on any missing details as your date approaches." },
            { q: "How do I know which forms apply to my package?", a: "Open the accordion section that matches your service (Photography, Videography, Photo + Video, etc.). Each section contains only the forms relevant to that package. If you booked a bundle, use the 'Photo + Video Bundle' section for combined forms." },
            { q: "Can I change my timeline after submitting?", a: "Yes. Timelines are editable up to 14 days before your event. After that, changes require coordinator approval to ensure all teams are properly briefed. Submit a support ticket for last-minute adjustments." },
            { q: "How does the Rewards Program work?", a: "You're automatically enrolled after your first booking. Book again or refer a friend and you'll move up tiers — Bronze (5% off), Silver (10% off), Gold (15% off). Discounts apply to all future bookings and add-ons for 2 years." },
            { q: "Who do I contact if I have an issue?", a: "Submit a support ticket through the portal — you'll get a response within 24 hours. For urgent day-of issues, call us directly at 401-616-4500. Your coordinator is also available via the contact info in your booking confirmation." },
          ].map((faq, i) => (
            <FAQItem key={i} question={faq.q} answer={faq.a} index={i} />
          ))}
        </div>
      </div>

      {/* ── CTA ────────────────────────────────────────────────────── */}
      <div style={{ padding: "100px 32px", textAlign: "center", background: `linear-gradient(160deg, var(--mm-surface) 0%, var(--mm-surface-alt) 50%, ${DS.bg} 100%)` }}>
        <FadeIn>
          <div style={{ fontFamily: "'DM Sans'", fontSize: 12, color: DS.gold, textTransform: "uppercase", letterSpacing: "0.2em", marginBottom: 16 }}>Need Help?</div>
          <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(30px, 4.5vw, 52px)", fontWeight: 700, color: DS.text, lineHeight: 1.1, margin: "0 0 16px" }}>
            We're Here for You
          </h2>
          <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 20, color: DS.textSec, fontStyle: "italic", marginBottom: 36, maxWidth: 500, margin: "0 auto 36px" }}>
            Questions about your event, your forms, or your package? Our team responds within 24 hours.
          </p>
          <div style={{ display: "flex", gap: 16, justifyContent: "center", flexWrap: "wrap" }}>
            <a href="/contact" style={{
              fontFamily: "'DM Sans'", fontSize: 14, color: DS.bg, background: DS.ember,
              padding: "16px 40px", textDecoration: "none", textTransform: "uppercase", letterSpacing: "0.1em", fontWeight: 600, transition: "background 0.3s",
            }}
              onMouseEnter={(e) => e.target.style.background = "#ff6b3d"}
              onMouseLeave={(e) => e.target.style.background = DS.ember}
            >Contact Us</a>
            <a href="tel:4016164500" style={{
              fontFamily: "'DM Sans'", fontSize: 14, color: DS.gold, padding: "16px 40px", textDecoration: "none", textTransform: "uppercase", letterSpacing: "0.1em", fontWeight: 600,
              border: `1px solid ${DS.gold}`, transition: "all 0.3s",
            }}
              onMouseEnter={(e) => { e.target.style.background = DS.gold; e.target.style.color = DS.bg; }}
              onMouseLeave={(e) => { e.target.style.background = "transparent"; e.target.style.color = DS.gold; }}
            >Call 401-616-4500</a>
          </div>
        </FadeIn>
      </div>

      <Footer />
    </div>
  );
}
