import { useState, useEffect, useRef } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import Header from "../components/Header";
import Footer from "../components/Footer";
import CheckAvailabilityButton from "../components/CheckAvailabilityButton";

const DS = {
  bg: "var(--mm-bg)", surface: "var(--mm-surface)", surfaceAlt: "var(--mm-surface-alt)",
  text: "var(--mm-text)", textSec: "var(--mm-text-sec)", gold: "var(--mm-gold)",
  ember: "var(--mm-ember)", border: "var(--mm-border)",
};

const fontLink = "https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,700;1,400&family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;0,700;1,400;1,500&family=DM+Sans:wght@400;500;600;700&family=Bebas+Neue&display=swap";

/* ── Team Data ──────────────────────────────────────────────────── */

const teamMembers = [
  {
    id: "sean",
    name: "Sean Edward Brown",
    role: "Founder & Photographer",
    category: "Leadership",
    specialty: "Natural Light & Golden Hour",
    instagram: "@seanedwardbrown",
    favoriteVenue: "OceanCliff, Newport",
    initial: "S",
    color: "#2a2218",
    colorAlt: "#352c20",
    bio: "Sean started Move Mountains with a simple belief: wedding photography should feel as good as it looks. As the founder and still an active shooter, Sean specializes in natural light portraiture and golden hour sessions — that 30-minute window when everything looks like a movie. When he's not behind the camera, he's building the team and the systems that let MMC serve 500+ couples a year without losing the personal touch.",
    quote: "I started this because I believed couples deserved something more cinematic, more real, more them. That hasn't changed.",
    stats: { weddings: "500+", years: "10", style: "Golden Hour" },
  },
  {
    id: "tiahna",
    name: "Tiahna Lynn",
    role: "Director of Photography",
    category: "Leadership",
    specialty: "Creative Direction & Portraiture",
    instagram: "@tiahnalynn",
    favoriteVenue: "Rosecliff Mansion, Newport",
    initial: "T",
    color: "#22201e",
    colorAlt: "#2d2a28",
    bio: "Tiahna is the creative engine behind everything MMC photographs. As Director of Photography, she oversees the visual standard across every wedding — but on your day, she's the one making you laugh between poses, adjusting your veil mid-wind, and catching the moment your partner sees you for the first time. Multiple reviewers have called her 'the MVP' of their wedding day, and they're not wrong.",
    quote: "My job isn't just to take photos. It's to make you feel like the most beautiful version of yourself — and then capture that.",
    stats: { weddings: "300+", years: "7", style: "Editorial" },
  },
  {
    id: "josh",
    name: "Josh Mighill",
    role: "Lead Photographer",
    category: "Photography",
    specialty: "Documentary & Candid Moments",
    instagram: "@joshmighill",
    favoriteVenue: "Castle Hill Inn, Newport",
    initial: "J",
    color: "#1e2022",
    colorAlt: "#282a2d",
    bio: "Josh is the photographer couples request by name — and for good reason. His documentary approach means he's always in the right place at the right time, catching the surprise kisses, the tears during the vows, and the dance floor chaos that makes every wedding unique. He brings a calm, steady energy that puts even the most camera-shy couples at ease.",
    quote: "The best wedding photos happen when people forget I'm there. That's always the goal.",
    stats: { weddings: "200+", years: "5", style: "Documentary" },
  },
  {
    id: "yan",
    name: "Yan La Mort",
    role: "Talent Development & Videography",
    category: "Leadership",
    specialty: "Cinematic Wedding Films",
    instagram: "@yanlamort",
    favoriteVenue: "The Chanler, Newport",
    initial: "Y",
    color: "#201e22",
    colorAlt: "#2b282d",
    bio: "Yan is the visionary behind talent development at Move Mountains Co. and a gifted cinematographer in his own right. As co-lead of MMC Academy alongside Tiahna, he's shaping the next generation of wedding creatives — not just in technical skill, but in the art of storytelling through film. His wedding films have a distinct cinematic quality that turns real moments into something that feels like a movie.",
    quote: "Film is about feeling. If someone watches their wedding video and doesn't cry, I haven't done my job.",
    stats: { weddings: "150+", years: "5", style: "Cinematic" },
  },
  {
    id: "brandon",
    name: "Brandon",
    role: "Photographer",
    category: "Photography",
    specialty: "Composition & Detail Shots",
    instagram: "@brandon.mmc",
    favoriteVenue: "Private Estates, Warwick",
    initial: "B",
    color: "#221e1a",
    colorAlt: "#2d2822",
    bio: "Brandon brings a meticulous eye for composition and an instinct for the small moments that make a wedding day unforgettable. Whether it's the ring detail shot that ends up framed on the mantle or the candid laugh between the bride and her mother, Brandon has a gift for finding beauty in the quiet spaces between the big events. Couples consistently praise his warmth and his incredible suggestions for poses.",
    quote: "The details tell the story as much as the big moments do. I never want to miss either.",
    stats: { weddings: "120+", years: "4", style: "Detail-Driven" },
  },
  {
    id: "tati",
    name: "Tati",
    role: "Photographer",
    category: "Photography",
    specialty: "Color & Emotion",
    instagram: "@tati.mmc",
    favoriteVenue: "Beavertail State Park, Jamestown",
    initial: "T",
    color: "#1a2020",
    colorAlt: "#242b2b",
    bio: "Tati's photography is defined by rich, emotive color and a deep sensitivity to the emotional current of a wedding day. She has an uncanny ability to read the room — knowing when to step in for the perfect portrait and when to step back and let a moment unfold naturally. Her engagement sessions are particularly beloved, known for making couples feel relaxed, connected, and genuinely themselves.",
    quote: "I want every image to feel like a memory you can step back into.",
    stats: { weddings: "100+", years: "3", style: "Emotive" },
  },
  {
    id: "kaitlyn",
    name: "Kaitlyn",
    role: "Photographer",
    category: "Photography",
    specialty: "Bright & Airy Aesthetics",
    instagram: "@kaitlyn.mmc",
    favoriteVenue: "St. Mary's Star of the Sea, Narragansett",
    initial: "K",
    color: "#201a1e",
    colorAlt: "#2b242a",
    bio: "Kaitlyn specializes in bright, airy photography with a romantic edge. Her work is defined by soft, luminous lighting and a warmth that makes every couple look effortlessly beautiful. She thrives in outdoor settings — particularly coastal New England venues where the natural light does half the work. Couples love her positive energy and her ability to make photo sessions feel like a fun adventure rather than a formal obligation.",
    quote: "Light is everything. Give me golden hour on the coast and I'll give you images you'll treasure forever.",
    stats: { weddings: "80+", years: "3", style: "Bright & Airy" },
  },
  {
    id: "amanda",
    name: "Amanda",
    role: "Photographer",
    category: "Photography",
    specialty: "Photojournalism & Reception Energy",
    instagram: "@amanda.mmc",
    favoriteVenue: "Gurney's, Newport",
    initial: "A",
    color: "#1e2218",
    colorAlt: "#282d22",
    bio: "Amanda is the photographer you want when the dance floor opens. Her photojournalistic instincts and fast reflexes make her the go-to for capturing the high-energy reception moments that other photographers miss — the bouquet toss mid-air, the father-daughter dance tears, the entire bridal party singing along to the last song. She pairs beautifully with more portrait-focused shooters, creating a complete visual story.",
    quote: "Weddings are alive. My job is to keep up with them and not miss a beat.",
    stats: { weddings: "90+", years: "3", style: "Photojournalism" },
  },
  {
    id: "sisco",
    name: "Sisco",
    role: "Photographer",
    category: "Photography",
    specialty: "Architecture & Environmental Portraits",
    instagram: "@sisco.mmc",
    favoriteVenue: "Hotel Providence",
    initial: "S",
    color: "#1e1a1e",
    colorAlt: "#28242a",
    bio: "Sisco has a unique talent for incorporating architecture and environment into wedding portraits. He sees the venue as a character in the love story — using doorways, staircases, gardens, and urban textures to create images that feel like editorial magazine spreads. Couples who book venues with strong architectural character particularly benefit from his eye. His work at Hotel Providence and The Dean Hotel are standout examples.",
    quote: "Every venue has a story to tell. I make sure it shows up in the photos.",
    stats: { weddings: "70+", years: "2", style: "Environmental" },
  },
  {
    id: "danielle",
    name: "Danielle",
    role: "Planning Coordinator",
    category: "Operations",
    specialty: "Timeline & Logistics",
    instagram: "@danielle.mmc",
    favoriteVenue: "All of them",
    initial: "D",
    color: "#1a1e20",
    colorAlt: "#24282b",
    bio: "Danielle is the reason your wedding day runs smoothly from the MMC side. As Planning Coordinator, she builds your photo timeline, coordinates with your venue and other vendors, manages the shot list, and ensures nothing falls through the cracks. She's the first person you meet after booking and the one who keeps the entire day organized behind the scenes. Couples consistently praise her responsiveness, detail, and calming presence.",
    quote: "A great photo needs the right moment. My job is making sure we're in the right place at the right time to catch it.",
    stats: { weddings: "400+", years: "5", style: "Operations" },
  },
  {
    id: "jaffer",
    name: "Jaffer",
    role: "Photographer & Videographer",
    category: "Photography",
    specialty: "Dual Photo & Video",
    instagram: "@jaffer.mmc",
    favoriteVenue: "Crowne Plaza, Warwick",
    initial: "J",
    color: "#20201a",
    colorAlt: "#2b2b24",
    bio: "Jaffer is one of MMC's versatile dual-format creatives — equally skilled behind a photo camera and a cinema rig. This flexibility makes him invaluable on smaller weddings where a single creative needs to deliver both stills and motion. His style leans cinematic, with a keen sense for framing and composition that translates beautifully across both mediums. Couples who've worked with Jaffer consistently note how comfortable and at ease he made them feel.",
    quote: "Photo and video are two ways to tell the same story. I love doing both.",
    stats: { weddings: "60+", years: "2", style: "Hybrid" },
  },
];

const categories = ["All", "Leadership", "Photography", "Operations"];

/* ── Helpers ─────────────────────────────────────────────────────── */

function FadeIn({ children, delay = 0, y = 24 }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  return (
    <motion.div ref={ref} initial={{ opacity: 0, y }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.65, delay, ease: [0.25, 0.1, 0.25, 1] }}>
      {children}
    </motion.div>
  );
}

/* ── Nav ─────────────────────────────────────────────────────────── */

/* ── Member Expanded Profile ─────────────────────────────────────── */

function MemberProfile({ member, onClose }) {
  useEffect(() => { document.body.style.overflow = "hidden"; return () => { document.body.style.overflow = ""; }; }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.3 }}
      style={{ position: "fixed", inset: 0, zIndex: 200, background: "rgba(8,8,8,0.96)", backdropFilter: "blur(8px)", overflowY: "auto" }}
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
    >
      {/* Close */}
      <button onClick={onClose} style={{
        position: "fixed", top: 24, right: 32, zIndex: 210, background: "none", border: `1px solid ${DS.border}`,
        width: 48, height: 48, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", transition: "border-color 0.3s",
      }}
        onMouseEnter={(e) => e.currentTarget.style.borderColor = DS.gold}
        onMouseLeave={(e) => e.currentTarget.style.borderColor = DS.border}
      >
        <span style={{ fontFamily: "'DM Sans'", fontSize: 18, color: DS.text }}>✕</span>
      </button>

      <div style={{ maxWidth: 1100, margin: "0 auto", padding: "80px 32px 60px" }}>
        <div style={{ display: "grid", gridTemplateColumns: "400px 1fr", gap: "clamp(32px, 5vw, 64px)", alignItems: "start" }} className="profile-grid">

          {/* Left: Photo + Stats */}
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.15, duration: 0.5 }}>
            {/* Portrait */}
            <div style={{
              width: "100%", aspectRatio: "3/4", background: member.colorAlt, marginBottom: 24,
              display: "flex", alignItems: "center", justifyContent: "center", position: "relative", overflow: "hidden",
            }}>
              <span style={{ fontFamily: "'Playfair Display'", fontSize: 120, color: DS.gold, opacity: 0.08, fontWeight: 700, position: "absolute" }}>{member.initial}</span>
              <span style={{ fontFamily: "'DM Sans'", fontSize: 12, color: DS.textSec, opacity: 0.3, textTransform: "uppercase", letterSpacing: "0.15em", position: "relative" }}>[ Portrait ]</span>
            </div>

            {/* Stats */}
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 1, background: DS.border }}>
              {Object.entries(member.stats).map(([key, val]) => (
                <div key={key} style={{ background: DS.surface, padding: "16px 12px", textAlign: "center" }}>
                  <div style={{ fontFamily: "'Bebas Neue'", fontSize: 24, color: DS.gold, lineHeight: 1 }}>{val}</div>
                  <div style={{ fontFamily: "'DM Sans'", fontSize: 10, color: DS.textSec, textTransform: "uppercase", letterSpacing: "0.1em", marginTop: 4 }}>{key}</div>
                </div>
              ))}
            </div>

            {/* Social */}
            <div style={{ marginTop: 20, padding: "16px 0", borderTop: `1px solid ${DS.border}` }}>
              <a href="#" style={{ fontFamily: "'DM Sans'", fontSize: 13, color: DS.gold, textDecoration: "none", display: "flex", alignItems: "center", gap: 8, transition: "opacity 0.2s" }}
                onMouseEnter={(e) => e.currentTarget.style.opacity = 0.7}
                onMouseLeave={(e) => e.currentTarget.style.opacity = 1}
              >
                <span style={{ fontSize: 16 }}>◎</span> {member.instagram}
              </a>
            </div>
          </motion.div>

          {/* Right: Info */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2, duration: 0.5 }}>
            {/* Tag + Name */}
            <div style={{ fontFamily: "'DM Sans'", fontSize: 12, color: DS.gold, textTransform: "uppercase", letterSpacing: "0.18em", marginBottom: 12 }}>
              {member.category} · {member.specialty}
            </div>
            <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(32px, 4vw, 52px)", fontWeight: 700, color: DS.text, lineHeight: 1.1, margin: "0 0 8px" }}>
              {member.name}
            </h1>
            <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 22, color: DS.textSec, fontWeight: 500, marginBottom: 32 }}>
              {member.role}
            </div>

            {/* Divider */}
            <motion.div initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} transition={{ delay: 0.35, duration: 0.6 }}
              style={{ height: 1, background: DS.border, transformOrigin: "left", marginBottom: 32 }} />

            {/* Bio */}
            <p style={{ fontFamily: "'DM Sans'", fontSize: 16, color: DS.textSec, lineHeight: 1.75, marginBottom: 36 }}>
              {member.bio}
            </p>

            {/* Quote */}
            <div style={{ padding: "28px 0 28px 28px", borderLeft: `2px solid ${DS.gold}`, marginBottom: 36 }}>
              <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(18px, 2vw, 24px)", color: DS.text, lineHeight: 1.5, fontStyle: "italic", margin: 0 }}>
                "{member.quote}"
              </p>
            </div>

            {/* Details */}
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20, padding: "24px 0", borderTop: `1px solid ${DS.border}`, borderBottom: `1px solid ${DS.border}` }}>
              <div>
                <div style={{ fontFamily: "'DM Sans'", fontSize: 11, color: DS.textSec, textTransform: "uppercase", letterSpacing: "0.12em", marginBottom: 6 }}>Specialty</div>
                <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 18, color: DS.text, fontWeight: 500 }}>{member.specialty}</div>
              </div>
              <div>
                <div style={{ fontFamily: "'DM Sans'", fontSize: 11, color: DS.textSec, textTransform: "uppercase", letterSpacing: "0.12em", marginBottom: 6 }}>Favorite Venue</div>
                <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 18, color: DS.text, fontWeight: 500 }}>{member.favoriteVenue}</div>
              </div>
            </div>

            {/* CTA */}
            <div style={{ marginTop: 36, display: "flex", gap: 16, flexWrap: "wrap" }}>
              <a href="#" style={{
                fontFamily: "'DM Sans'", fontSize: 13, color: DS.bg, background: DS.ember,
                padding: "14px 32px", textDecoration: "none", textTransform: "uppercase", letterSpacing: "0.08em", fontWeight: 600, transition: "background 0.3s",
              }}
                onMouseEnter={(e) => e.target.style.background = "#ff6b3d"}
                onMouseLeave={(e) => e.target.style.background = DS.ember}
              >Request {member.name.split(" ")[0]} for Your Wedding</a>
              <button onClick={onClose} style={{
                fontFamily: "'DM Sans'", fontSize: 13, color: DS.textSec, background: "none", border: `1px solid ${DS.border}`,
                padding: "14px 28px", cursor: "pointer", textTransform: "uppercase", letterSpacing: "0.08em", transition: "all 0.3s",
              }}
                onMouseEnter={(e) => { e.target.style.borderColor = DS.gold; e.target.style.color = DS.gold; }}
                onMouseLeave={(e) => { e.target.style.borderColor = DS.border; e.target.style.color = DS.textSec; }}
              >Back to Team</button>
            </div>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}

/* ── Team Card ───────────────────────────────────────────────────── */

function TeamCard({ member, index, onClick }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-30px" });
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 28 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: (index % 4) * 0.08, ease: [0.25, 0.1, 0.25, 1] }}
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{ cursor: "pointer" }}
    >
      {/* Portrait */}
      <div style={{ position: "relative", overflow: "hidden", marginBottom: 16 }}>
        <motion.div
          animate={{ scale: hovered ? 1.04 : 1 }}
          transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
          style={{
            width: "100%", aspectRatio: "3/4", background: member.color,
            display: "flex", alignItems: "center", justifyContent: "center", position: "relative",
          }}
        >
          <span style={{ fontFamily: "'Playfair Display'", fontSize: "clamp(72px, 8vw, 100px)", color: DS.gold, opacity: 0.08, fontWeight: 700, position: "absolute" }}>
            {member.initial}
          </span>
          <span style={{ fontFamily: "'DM Sans'", fontSize: 11, color: DS.textSec, opacity: 0.2, textTransform: "uppercase", letterSpacing: "0.15em", position: "relative" }}>
            [ Portrait ]
          </span>
        </motion.div>

        {/* Hover overlay */}
        <motion.div
          animate={{ opacity: hovered ? 1 : 0 }}
          transition={{ duration: 0.3 }}
          style={{
            position: "absolute", inset: 0,
            background: "linear-gradient(to top, rgba(10,10,10,0.88) 0%, rgba(10,10,10,0.2) 50%, transparent 100%)",
            display: "flex", flexDirection: "column", justifyContent: "flex-end", padding: 20,
          }}
        >
          <motion.div animate={{ y: hovered ? 0 : 10, opacity: hovered ? 1 : 0 }} transition={{ duration: 0.3, delay: 0.05 }}>
            <div style={{ fontFamily: "'DM Sans'", fontSize: 12, color: DS.gold, textTransform: "uppercase", letterSpacing: "0.12em", marginBottom: 4 }}>
              {member.specialty}
            </div>
          </motion.div>
          <motion.div animate={{ y: hovered ? 0 : 10, opacity: hovered ? 1 : 0 }} transition={{ duration: 0.3, delay: 0.1 }}>
            <div style={{ fontFamily: "'DM Sans'", fontSize: 13, color: DS.text, display: "flex", alignItems: "center", gap: 6 }}>
              View Profile <span style={{ fontSize: 14 }}>→</span>
            </div>
          </motion.div>
        </motion.div>

        {/* Category badge */}
        <div style={{
          position: "absolute", top: 12, left: 12,
          fontFamily: "'DM Sans'", fontSize: 10, color: DS.textSec,
          background: "rgba(15,15,15,0.65)", backdropFilter: "blur(6px)",
          padding: "5px 10px", textTransform: "uppercase", letterSpacing: "0.1em",
          opacity: hovered ? 0 : 0.8, transition: "opacity 0.3s",
        }}>
          {member.category}
        </div>
      </div>

      {/* Name + Role */}
      <div>
        <h3 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(20px, 2vw, 24px)", fontWeight: 600, color: DS.text, margin: "0 0 4px", transition: "color 0.3s" }}>
          {member.name.split(" ")[0]}
          {member.name.split(" ").length > 1 && <span style={{ fontWeight: 400, color: DS.textSec }}> {member.name.split(" ").slice(1).join(" ")}</span>}
        </h3>
        <div style={{ fontFamily: "'DM Sans'", fontSize: 13, color: DS.textSec, transition: "color 0.3s" }}>
          {member.role}
        </div>
      </div>
    </motion.div>
  );
}

/* ── Main Team Page ──────────────────────────────────────────────── */

export default function TeamPage() {
  const [scrolled, setScrolled] = useState(false);
  const [activeCategory, setActiveCategory] = useState("All");
  const [selectedMember, setSelectedMember] = useState(null);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);

  const filtered = activeCategory === "All" ? teamMembers : teamMembers.filter((m) => m.category === activeCategory);

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
          .nav-links { display: none !important; }
          .team-grid { grid-template-columns: 1fr 1fr !important; }
          .profile-grid { grid-template-columns: 1fr !important; }
          .hero-columns { grid-template-columns: 1fr !important; }
        }
        @media (max-width: 480px) {
          .team-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>

      <Header activePage="About" />

      {/* ── HERO ──────────────────────────────────────────────────── */}
      <div style={{ paddingTop: 100, maxWidth: 1400, margin: "0 auto", paddingLeft: 32, paddingRight: 32 }}>
        {/* Breadcrumb */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }}>
          <div style={{ fontFamily: "'DM Sans'", fontSize: 12, color: DS.textSec, marginBottom: 32 }}>
            <a href="#" style={{ color: DS.textSec, textDecoration: "none", transition: "color 0.2s" }}
              onMouseEnter={(e) => e.target.style.color = DS.gold}
              onMouseLeave={(e) => e.target.style.color = DS.textSec}
            >Home</a>
            <span style={{ margin: "0 10px", opacity: 0.4 }}>/</span>
            <span style={{ color: DS.gold }}>Team</span>
          </div>
        </motion.div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "clamp(24px, 4vw, 64px)", alignItems: "end", marginBottom: 32 }} className="hero-columns">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.35, duration: 0.6 }}>
            <div style={{ fontFamily: "'DM Sans'", fontSize: 12, color: DS.gold, textTransform: "uppercase", letterSpacing: "0.2em", marginBottom: 16 }}>
              The People Behind the Lens
            </div>
            <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(40px, 6vw, 72px)", fontWeight: 700, color: DS.text, lineHeight: 1.05, margin: 0 }}>
              The Crew
            </h1>
          </motion.div>

          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}>
            <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(17px, 1.8vw, 22px)", color: DS.textSec, lineHeight: 1.55, fontStyle: "italic" }}>
              Your photographers aren't assigned — they're matched. Every creative on our roster brings their own style, their own energy, and their own superpower. Here's who you might meet on your day.
            </p>
          </motion.div>
        </div>

        {/* Divider */}
        <motion.div initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} transition={{ delay: 0.55, duration: 0.8, ease: "easeOut" }}
          style={{ height: 1, background: DS.border, transformOrigin: "left" }} />
      </div>

      {/* ── TEAM COUNT STRIP ──────────────────────────────────────── */}
      <div style={{ background: DS.surface, borderTop: `1px solid ${DS.border}`, borderBottom: `1px solid ${DS.border}`, padding: "40px 32px", marginTop: 48 }}>
        <div style={{ maxWidth: 1400, margin: "0 auto", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 24 }}>
          {/* Roster stats */}
          <div style={{ display: "flex", gap: "clamp(24px, 4vw, 56px)", flexWrap: "wrap" }}>
            {[
              { num: "11", label: "Team Members" },
              { num: "3", label: "Leadership" },
              { num: "7", label: "Photographers" },
              { num: "1", label: "Coordinator" },
            ].map((s) => (
              <div key={s.label} style={{ textAlign: "center" }}>
                <div style={{ fontFamily: "'Bebas Neue'", fontSize: 32, color: DS.gold, lineHeight: 1 }}>{s.num}</div>
                <div style={{ fontFamily: "'DM Sans'", fontSize: 11, color: DS.textSec, textTransform: "uppercase", letterSpacing: "0.1em", marginTop: 4 }}>{s.label}</div>
              </div>
            ))}
          </div>

          {/* Filter pills */}
          <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
            {categories.map((c) => (
              <button key={c} onClick={() => setActiveCategory(c)} style={{
                fontFamily: "'DM Sans'", fontSize: 12, color: activeCategory === c ? DS.bg : DS.textSec,
                background: activeCategory === c ? DS.gold : "transparent",
                border: `1px solid ${activeCategory === c ? DS.gold : DS.border}`,
                padding: "8px 18px", cursor: "pointer", textTransform: "uppercase", letterSpacing: "0.06em", transition: "all 0.3s",
              }}
                onMouseEnter={(e) => { if (activeCategory !== c) { e.target.style.borderColor = DS.gold; e.target.style.color = DS.gold; } }}
                onMouseLeave={(e) => { if (activeCategory !== c) { e.target.style.borderColor = DS.border; e.target.style.color = DS.textSec; } }}
              >{c}</button>
            ))}
          </div>
        </div>
      </div>

      {/* ── TEAM GRID ─────────────────────────────────────────────── */}
      <div style={{ maxWidth: 1400, margin: "0 auto", padding: "56px 32px 40px" }}>
        <AnimatePresence mode="wait">
          <motion.div
            key={activeCategory}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.3 }}
            className="team-grid"
            style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "clamp(16px, 2vw, 28px)" }}
          >
            {filtered.map((member, i) => (
              <TeamCard key={member.id} member={member} index={i} onClick={() => setSelectedMember(member)} />
            ))}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* ── TEAM PHILOSOPHY ───────────────────────────────────────── */}
      <div style={{ borderTop: `1px solid ${DS.border}`, padding: "80px 32px" }}>
        <div style={{ maxWidth: 800, margin: "0 auto", textAlign: "center" }}>
          <FadeIn>
            <div style={{ fontFamily: "'Playfair Display', serif", fontSize: 56, color: DS.gold, opacity: 0.2, lineHeight: 1, marginBottom: -12 }}>"</div>
            <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(22px, 3vw, 32px)", color: DS.text, lineHeight: 1.45, fontStyle: "italic", fontWeight: 500, margin: "0 0 20px" }}>
              We don't hire photographers. We find people who see the world the way we do — and then we let them bring their own eye to it.
            </p>
            <div style={{ fontFamily: "'DM Sans'", fontSize: 13, color: DS.gold, textTransform: "uppercase", letterSpacing: "0.12em" }}>— Sean Edward Brown, Founder</div>
          </FadeIn>
        </div>
      </div>

      {/* ── ACADEMY CTA ───────────────────────────────────────────── */}
      <div style={{ background: DS.surface, borderTop: `1px solid ${DS.border}`, borderBottom: `1px solid ${DS.border}`, padding: "80px 32px" }}>
        <div style={{ maxWidth: 1400, margin: "0 auto", display: "grid", gridTemplateColumns: "1fr 1fr", gap: "clamp(24px, 4vw, 64px)", alignItems: "center" }} className="hero-columns">
          <FadeIn>
            <div>
              {/* Academy image placeholder */}
              <div style={{
                width: "100%", aspectRatio: "16/10", background: "#1a1e1a",
                display: "flex", alignItems: "center", justifyContent: "center",
              }}>
                <span style={{ fontFamily: "'DM Sans'", fontSize: 12, color: DS.textSec, opacity: 0.25, textTransform: "uppercase", letterSpacing: "0.15em" }}>[ MMC Academy — Workshop ]</span>
              </div>
            </div>
          </FadeIn>
          <FadeIn delay={0.1}>
            <div>
              <div style={{ fontFamily: "'DM Sans'", fontSize: 12, color: DS.gold, textTransform: "uppercase", letterSpacing: "0.2em", marginBottom: 16 }}>Join the Next Generation</div>
              <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(28px, 3.5vw, 40px)", fontWeight: 700, color: DS.text, lineHeight: 1.15, margin: "0 0 16px" }}>
                Want to Be Part of the Crew?
              </h2>
              <p style={{ fontFamily: "'DM Sans'", fontSize: 15, color: DS.textSec, lineHeight: 1.7, marginBottom: 28 }}>
                MMC Academy is a 9-month program for aspiring wedding photographers and videographers. Led by Tiahna Lynn and Yan La Mort, graduates get access to the MMC shooting roster — and a career in the industry they love.
              </p>
              <div style={{ display: "flex", gap: 16, flexWrap: "wrap" }}>
                <a href="#" style={{
                  fontFamily: "'DM Sans'", fontSize: 13, color: DS.bg, background: DS.ember,
                  padding: "14px 28px", textDecoration: "none", textTransform: "uppercase", letterSpacing: "0.08em", fontWeight: 600, transition: "background 0.3s",
                }}
                  onMouseEnter={(e) => e.target.style.background = "#ff6b3d"}
                  onMouseLeave={(e) => e.target.style.background = DS.ember}
                >Learn About Academy</a>
                <a href="#" style={{
                  fontFamily: "'DM Sans'", fontSize: 13, color: DS.gold, padding: "14px 28px", textDecoration: "none", textTransform: "uppercase", letterSpacing: "0.08em",
                  border: `1px solid ${DS.gold}`, transition: "all 0.3s",
                }}
                  onMouseEnter={(e) => { e.target.style.background = DS.gold; e.target.style.color = DS.bg; }}
                  onMouseLeave={(e) => { e.target.style.background = "transparent"; e.target.style.color = DS.gold; }}
                >Open Positions</a>
              </div>
            </div>
          </FadeIn>
        </div>
      </div>

      {/* ── BOOKING CTA ───────────────────────────────────────────── */}
      <div style={{ padding: "100px 32px", textAlign: "center", background: `linear-gradient(160deg, #1a1410 0%, #1a1612 50%, ${DS.bg} 100%)` }}>
        <FadeIn>
          <div style={{ fontFamily: "'DM Sans'", fontSize: 12, color: DS.gold, textTransform: "uppercase", letterSpacing: "0.2em", marginBottom: 16 }}>Ready?</div>
          <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(30px, 4.5vw, 52px)", fontWeight: 700, color: DS.text, lineHeight: 1.1, margin: "0 0 16px" }}>
            Found Your Match?
          </h2>
          <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 20, color: DS.textSec, fontStyle: "italic", marginBottom: 36 }}>
            Tell us about your wedding and we'll match you with the perfect team.
          </p>
          <CheckAvailabilityButton padding="16px 44px" />
        </FadeIn>
      </div>

      <Footer />

      {/* ── MEMBER MODAL ──────────────────────────────────────────── */}
      <AnimatePresence>
        {selectedMember && <MemberProfile member={selectedMember} onClose={() => setSelectedMember(null)} />}
      </AnimatePresence>
    </div>
  );
}
