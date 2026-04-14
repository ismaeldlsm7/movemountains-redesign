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

const UTM = "?utm_source=movemountains&utm_medium=referral&utm_campaign=preferred_vendors";

/* ── Helpers ────────────────────────────────────────────────────── */

function FadeIn({ children, delay = 0, y = 28 }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });
  return (
    <motion.div ref={ref} initial={{ opacity: 0, y }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.7, delay, ease: [0.25, 0.1, 0.25, 1] }}>
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

/* ── Vendor Data ───────────────────────────────────────────────── */

const vendorCategories = [
  {
    name: "Planning + Design",
    icon: "◎",
    description: "The planners and designers we trust to bring a vision together — from timelines to tablescapes.",
    vendors: [
      { name: "Cristen & Co.", url: "https://www.cristenandco.com", desc: "Full-service luxury wedding planning and design across New England." },
      { name: "Infinite Events", url: "https://infiniteevents.com", desc: "Event planning and coordination with a focus on personalized, stress-free experiences." },
      { name: "Metta Events", url: "http://www.mettaevent.com", desc: "Intentional event design rooted in mindfulness and creative storytelling." },
      { name: "Mint to Be Events", url: "https://www.mint2bevents.com", desc: "Boutique wedding planning with an eye for modern, elegant details." },
      { name: "Mavinhouse Events", url: "https://mavinhouse.com", desc: "High-end event production for weddings, corporate, and social gatherings." },
      { name: "AMC Weddings", url: "https://www.amcweddings.com", desc: "Dedicated wedding coordination and day-of management." },
    ],
  },
  {
    name: "Venues",
    icon: "◇",
    description: "The spaces that set the scene — waterfront estates, historic inns, and hidden gems we've shot at and loved.",
    vendors: [
      { name: "Newport Beach House", url: "https://longwoodvenues.com/venues/newport-beach-house-venue/", desc: "Oceanfront venue in Newport with panoramic views and indoor-outdoor flexibility." },
      { name: "Belle Mer", url: "https://longwoodvenues.com/venues/newport-oceanfront-event-venue/", desc: "Iconic Newport waterfront estate — one of the most photographed venues in New England." },
      { name: "Castle Hill Inn", url: "https://www.castlehillinn.com", desc: "Historic seaside inn on 40 oceanfront acres in Newport. Timeless elegance." },
      { name: "Shepherds Run", url: "https://shepherds.run", desc: "Rustic-luxury farmstead venue with rolling fields and golden-hour magic." },
    ],
  },
  {
    name: "Hotels + Accommodations",
    icon: "△",
    description: "Where your guests stay matters. These are the properties we recommend for comfort, location, and style.",
    vendors: [
      { name: "NYLO Providence Warwick Hotel", url: "https://www.hilton.com/en/hotels/pvdwrup-nylo-providence-warwick-hotel/", desc: "Industrial-chic hotel with modern amenities near Providence venues." },
      { name: "The Dean Hotel", url: "https://www.ash.world/hotels/the-dean/", desc: "Boutique hotel in downtown Providence — design-forward, locally rooted." },
      { name: "Hotel Providence", url: "https://www.hotelprovidence.com", desc: "Classic Providence luxury. Walking distance to downtown venues and restaurants." },
      { name: "East Island Reserve Hotel", url: "https://www.eastislandreserve.com", desc: "Waterfront retreat in Newport with a laid-back coastal atmosphere." },
      { name: "The Newport Lofts", url: "https://www.thenewportlofts.com", desc: "Modern loft-style rentals in the heart of Newport's historic district." },
      { name: "Brenton Hotel", url: "https://brentonhotel.com", desc: "Newly opened luxury boutique hotel overlooking Newport Harbor.", badge: "New" },
    ],
  },
  {
    name: "Florals",
    icon: "✦",
    description: "The florists who consistently deliver arrangements that elevate a space — and hold up beautifully on camera.",
    vendors: [
      { name: "Flowers by Semia", url: "https://flowersbysemia.com", desc: "Lush, romantic floral design for weddings and events throughout Rhode Island." },
      { name: "Franchesca's Florals", url: "https://franchescasflorals.com", desc: "Custom floral installations with a bold, modern aesthetic." },
    ],
  },
  {
    name: "Music + Uplighting",
    icon: "♫",
    description: "Sound and light set the mood for every reception. These are the DJs, bands, and lighting teams we work with most.",
    vendors: [
      { name: "Speechless", url: "https://speechlessmusic.com", desc: "Premium live music and entertainment. Multi-piece bands tailored to your vibe." },
      { name: "Joseph Anthony Weddings", url: "http://josephanthonyweddings.com", desc: "Wedding DJ and MC services with a focus on seamless energy management." },
      { name: "The Pulse of Boston", url: "https://thepulseofboston.com", desc: "High-energy live band that fills every dance floor — every time." },
      { name: "Boston Sound and Light", url: "https://www.bostonsoundandlight.com", desc: "Full-service sound, lighting, and AV production for events of any scale." },
      { name: "DJ Valentina", url: "https://www.djvalentina.com", desc: "Dynamic DJ sets with curated playlists that read the room perfectly." },
      { name: "The Ever After Band", url: "https://everafterband.com", desc: "Live wedding band with a polished, versatile repertoire." },
      { name: "Luke Entertainment", url: "https://lukeentertainment.com", desc: "DJ, photo booth, and lighting packages — one vendor, full reception coverage." },
    ],
  },
  {
    name: "Catering",
    icon: "○",
    description: "Food is one of the first things guests remember. These caterers deliver on presentation, taste, and service.",
    vendors: [
      { name: "Harvest Moon", url: "https://www.hmcatering.com", desc: "Farm-to-table catering with seasonal menus and impeccable plating." },
      { name: "Russell Morin", url: "https://morins.com", desc: "Full-service catering for weddings and galas — a New England institution." },
      { name: "Sol Coffee Cart", url: "https://www.solcoffeecart.com", desc: "Mobile espresso bar for cocktail hour, getting-ready, or late-night fuel." },
      { name: "Nitro Coffee Cart", url: "https://thenitrocart.com", desc: "Nitro cold brew on tap — a crowd-pleaser at outdoor ceremonies and receptions." },
      { name: "Tizzy K's Ice Cream Cart", url: "https://www.tizzyks.com", desc: "Artisan ice cream cart with seasonal flavors and custom branding options." },
      { name: "Bev Cart", url: "https://bevievivi.com", desc: "Mobile cocktail and beverage service — styled carts for any wedding theme." },
    ],
  },
  {
    name: "Desserts + Cakes",
    icon: "◈",
    description: "Beyond the cake cutting — the bakers and dessert artists who make your sweet table unforgettable.",
    vendors: [
      { name: "Kerri Cupcake at Sweet Indulgence", url: "https://www.facebook.com/mysweetindulgence/", desc: "Custom cupcakes and dessert tables — creative flavors and stunning presentation." },
      { name: "Ellie's Bakery", url: "https://elliesprov.com", desc: "Providence bakery known for elegant wedding cakes and artisan pastries." },
    ],
  },
  {
    name: "Hair + Makeup",
    icon: "◎",
    description: "The artists who make sure you look and feel your best — and your look holds up from first look to last dance.",
    vendors: [
      { name: "Pretty Wife Beauty", url: "https://www.facebook.com/prettywifebeauty/", desc: "Bridal hair and makeup with a soft, natural focus that photographs beautifully." },
      { name: "Jaclynn Kate Hair & Makeup Artistry", url: "https://www.theknot.com/marketplace/jaclynn-kate-hair-and-makeup-artistry-cranston-ri-560150", desc: "On-location bridal beauty with a polished, editorial finish." },
      { name: "Ali Lomazzo Beauty", url: "https://www.alilomazzobeauty.com", desc: "Clean beauty and bridal glam — long-lasting looks designed for all-day wear." },
      { name: "Charlotte & Co — Airbrush Makeup + Hair", url: "https://charlottephinney.com/", desc: "Airbrush specialists with flawless, camera-ready results for the full bridal party." },
    ],
  },
  {
    name: "Invitations + Stationery",
    icon: "□",
    description: "First impressions start in the mailbox. These designers create paper goods worthy of your event.",
    vendors: [
      { name: "Wells Makery", url: "https://www.thewellsmakery.com", desc: "Custom letterpress and foil invitations — handcrafted, modern, heirloom quality." },
      { name: "The Paper Perfectionist", url: "https://www.theknot.com/marketplace/the-paper-perfectionist-lynnfield-ma-818294", desc: "Bespoke invitation suites with meticulous attention to typography and layout." },
      { name: "Signed by Manuela", url: "https://www.instagram.com/signedbymanuela/", desc: "Hand-lettered calligraphy and custom signage — elegant and personal." },
    ],
  },
  {
    name: "Signage",
    icon: "▶",
    description: "Custom signage that turns a venue into your venue — welcome boards, seating charts, and everything in between.",
    vendors: [
      { name: "Signs by Viv", url: "https://www.instagram.com/signsbyviv/", desc: "Hand-painted and acrylic signage for weddings and events — custom designs for every style." },
    ],
  },
  {
    name: "Rentals + Formals",
    icon: "◇",
    description: "From suits to specialty décor — the rental vendors we send our clients to.",
    vendors: [
      { name: "Aldo's House of Formals", url: "https://www.aldoshouseofformals.com", desc: "Tuxedo and suit rentals with expert fitting — a Rhode Island staple since 1985." },
    ],
  },
  {
    name: "Transportation",
    icon: "△",
    description: "Grand exits, arrival shots, and getting the bridal party from A to B in style.",
    vendors: [
      { name: "Rockstar Limos", url: "https://www.rockstarlimo.net", desc: "Luxury limo and party bus service across New England — vintage and modern fleet." },
      { name: "P&S Vintage Rentals", url: "https://www.instagram.com/psvintagerentals", desc: "Vintage car rentals for weddings — classic getaway cars that photograph like a dream." },
    ],
  },
];

/* ── Category Accordion ────────────────────────────────────────── */

function CategoryAccordion({ category, index }) {
  const [open, setOpen] = useState(false);
  return (
    <FadeIn delay={index * 0.03}>
      <div style={{ border: `1px solid ${open ? DS.gold : DS.border}`, transition: "border-color 0.4s" }}>
        <button onClick={() => setOpen(!open)} style={{
          width: "100%", display: "flex", justifyContent: "space-between", alignItems: "center",
          padding: "20px 28px", background: "none", border: "none", cursor: "pointer", textAlign: "left", gap: 16,
        }}>
          <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
            <span style={{ fontFamily: "'DM Sans'", fontSize: 22, color: DS.gold, opacity: 0.6 }}>{category.icon}</span>
            <div>
              <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(18px, 2vw, 24px)", fontWeight: 700, color: DS.text, margin: 0 }}>{category.name}</h3>
              <span style={{ fontFamily: "'DM Sans'", fontSize: 12, color: DS.textSec }}>{category.vendors.length} vendor{category.vendors.length !== 1 ? "s" : ""}</span>
            </div>
          </div>
          <motion.span animate={{ rotate: open ? 45 : 0 }} transition={{ duration: 0.2 }}
            style={{ fontFamily: "'DM Sans'", fontSize: 26, color: DS.gold, flexShrink: 0, lineHeight: 1 }}>+</motion.span>
        </button>

        <AnimatePresence>
          {open && (
            <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.35 }} style={{ overflow: "hidden" }}>
              <div style={{ padding: "0 28px 28px" }}>
                <div style={{ borderTop: `1px solid ${DS.border}`, paddingTop: 16 }}>
                  <p style={{ fontFamily: "'DM Sans'", fontSize: 14, color: DS.textSec, lineHeight: 1.65, marginBottom: 20, maxWidth: 650 }}>{category.description}</p>
                  <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: 12 }} className="vendor-cards-grid">
                    {category.vendors.map((vendor) => (
                      <VendorCard key={vendor.name} vendor={vendor} />
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </FadeIn>
  );
}

/* ── Vendor Card ───────────────────────────────────────────────── */

function VendorCard({ vendor }) {
  const href = vendor.url + UTM;
  return (
    <a href={href} target="_blank" rel="noopener noreferrer" style={{
      display: "flex", flexDirection: "column", padding: "18px 20px", border: `1px solid ${DS.border}`,
      textDecoration: "none", transition: "all 0.3s", cursor: "pointer",
    }}
      onMouseEnter={(e) => { e.currentTarget.style.borderColor = DS.gold; e.currentTarget.style.background = DS.surfaceAlt; }}
      onMouseLeave={(e) => { e.currentTarget.style.borderColor = DS.border; e.currentTarget.style.background = "transparent"; }}
    >
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 6, gap: 8 }}>
        <span style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 18, fontWeight: 600, color: DS.text }}>{vendor.name}</span>
        {vendor.badge && (
          <span style={{ fontFamily: "'DM Sans'", fontSize: 10, color: DS.ember, textTransform: "uppercase", letterSpacing: "0.06em", border: `1px solid ${DS.ember}`, padding: "2px 8px", flexShrink: 0, opacity: 0.8 }}>{vendor.badge}</span>
        )}
      </div>
      <p style={{ fontFamily: "'DM Sans'", fontSize: 13, color: DS.textSec, lineHeight: 1.55, margin: 0, flex: 1 }}>{vendor.desc}</p>
      <div style={{ fontFamily: "'DM Sans'", fontSize: 12, color: DS.gold, marginTop: 10, display: "flex", alignItems: "center", gap: 4 }}>
        Visit Website <span style={{ fontSize: 14 }}>→</span>
      </div>
    </a>
  );
}

/* ── Main Page ─────────────────────────────────────────────────── */

export default function PreferredVendorsPage() {
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const heroScale = useTransform(scrollYProgress, [0, 1], [1.05, 1.18]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  const [filter, setFilter] = useState("all");
  const totalVendors = vendorCategories.reduce((sum, c) => sum + c.vendors.length, 0);

  const filteredCategories = filter === "all"
    ? vendorCategories
    : vendorCategories.filter((c) => c.name === filter);

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
          .vendor-cards-grid { grid-template-columns: 1fr !important; }
          .stats-row { grid-template-columns: 1fr 1fr !important; }
          .filter-bar { flex-wrap: wrap !important; }
          .chapter-grid { grid-template-columns: 1fr !important; }
          .chapter-grid > * { order: unset !important; }
        }
      `}</style>

      <Header activePage="" />

      {/* ── HERO ──────────────────────────────────────────────────── */}
      <div ref={heroRef} style={{ height: "60vh", minHeight: 400, maxHeight: 680, position: "relative", overflow: "hidden" }}>
        <motion.div style={{ scale: heroScale, position: "absolute", inset: 0 }}>
          <div style={{
            width: "100%", height: "100%",
            background: "linear-gradient(160deg, var(--mm-surface) 0%, var(--mm-surface-alt) 40%, var(--mm-surface) 70%, var(--mm-bg) 100%)",
            display: "flex", alignItems: "center", justifyContent: "center",
          }}>
            <span style={{ fontFamily: "'DM Sans'", fontSize: 13, color: DS.textSec, opacity: 0.3, textTransform: "uppercase", letterSpacing: "0.2em" }}>
              [ Our Trusted Vendor Network ]
            </span>
          </div>
        </motion.div>

        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to bottom, rgba(15,15,15,0.2) 0%, rgba(15,15,15,0.15) 40%, rgba(15,15,15,0.75) 80%, var(--mm-bg) 100%)" }} />

        <motion.div style={{ opacity: heroOpacity, position: "absolute", bottom: "12%", left: 0, right: 0, padding: "0 32px" }}>
          <div style={{ maxWidth: 1400, margin: "0 auto" }}>
            <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5, duration: 0.7 }}>
              <div style={{ fontFamily: "'DM Sans'", fontSize: 12, color: DS.gold, textTransform: "uppercase", letterSpacing: "0.2em", marginBottom: 16 }}>Preferred Vendors</div>
              <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(38px, 6vw, 72px)", fontWeight: 700, color: DS.text, lineHeight: 1.05, margin: 0, maxWidth: 750 }}>
                The People We<br /><span style={{ color: DS.gold }}>Trust Most.</span>
              </h1>
            </motion.div>
          </div>
        </motion.div>
      </div>

      {/* ── INTRO ─────────────────────────────────────────────────── */}
      <div style={{ maxWidth: 1400, margin: "0 auto", padding: "80px 32px 0" }}>
        <FadeIn>
          <div style={{ maxWidth: 700 }}>
            <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(20px, 2.5vw, 28px)", color: DS.text, lineHeight: 1.5, fontWeight: 400, fontStyle: "italic" }}>
              We've taken the time to vet and hand-select the best vendors in the industry. These are the planners, florists, DJs, venues, and artists we've worked alongside at hundreds of weddings — and the ones we'd recommend to our own families.
            </p>
          </div>
        </FadeIn>
        <RevealLine delay={0.2} />
      </div>

      {/* ── STATS ROW ─────────────────────────────────────────────── */}
      <div style={{ maxWidth: 1400, margin: "0 auto", padding: "48px 32px" }}>
        <FadeIn>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 24 }} className="stats-row">
            {[
              { value: totalVendors + "+", label: "Trusted Vendors" },
              { value: vendorCategories.length, label: "Categories" },
              { value: "500+", label: "Weddings Together" },
            ].map((stat) => (
              <div key={stat.label} style={{ textAlign: "center", padding: "24px 16px", border: `1px solid ${DS.border}` }}>
                <div style={{ fontFamily: "'Bebas Neue'", fontSize: "clamp(36px, 5vw, 56px)", color: DS.gold, lineHeight: 1 }}>{stat.value}</div>
                <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(13px, 1.4vw, 16px)", color: DS.textSec, letterSpacing: "0.1em", textTransform: "uppercase", marginTop: 6 }}>{stat.label}</div>
              </div>
            ))}
          </div>
        </FadeIn>
      </div>

      {/* ── FILTER BAR ────────────────────────────────────────────── */}
      <div style={{ maxWidth: 1000, margin: "0 auto", padding: "0 32px 20px" }}>
        <FadeIn>
          <div style={{ fontFamily: "'DM Sans'", fontSize: 12, color: DS.gold, textTransform: "uppercase", letterSpacing: "0.2em", marginBottom: 16 }}>Filter by Category</div>
          <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }} className="filter-bar">
            <button onClick={() => setFilter("all")} style={{
              fontFamily: "'DM Sans'", fontSize: 12, padding: "8px 16px", cursor: "pointer",
              textTransform: "uppercase", letterSpacing: "0.06em", transition: "all 0.3s",
              background: filter === "all" ? DS.gold : "transparent",
              color: filter === "all" ? DS.bg : DS.textSec,
              border: `1px solid ${filter === "all" ? DS.gold : DS.border}`,
            }}>All</button>
            {vendorCategories.map((cat) => (
              <button key={cat.name} onClick={() => setFilter(cat.name)} style={{
                fontFamily: "'DM Sans'", fontSize: 12, padding: "8px 16px", cursor: "pointer",
                textTransform: "uppercase", letterSpacing: "0.06em", transition: "all 0.3s",
                background: filter === cat.name ? DS.gold : "transparent",
                color: filter === cat.name ? DS.bg : DS.textSec,
                border: `1px solid ${filter === cat.name ? DS.gold : DS.border}`,
              }}>{cat.name}</button>
            ))}
          </div>
        </FadeIn>
      </div>

      {/* ── VENDOR ACCORDIONS ─────────────────────────────────────── */}
      <div style={{ maxWidth: 1000, margin: "0 auto", padding: "40px 32px 100px" }}>
        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          {filteredCategories.map((cat, i) => (
            <CategoryAccordion key={cat.name} category={cat} index={i} />
          ))}
        </div>
      </div>

      {/* ── VENDOR NOTE ───────────────────────────────────────────── */}
      <div style={{ borderTop: `1px solid ${DS.border}`, borderBottom: `1px solid ${DS.border}`, padding: "80px 32px", background: DS.surface }}>
        <div style={{ maxWidth: 1000, margin: "0 auto" }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "clamp(32px, 5vw, 80px)", alignItems: "start" }} className="chapter-grid">
            <div>
              <FadeIn>
                <div style={{ fontFamily: "'DM Sans'", fontSize: 12, color: DS.gold, textTransform: "uppercase", letterSpacing: "0.2em", marginBottom: 12 }}>How We Choose</div>
                <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(28px, 3.5vw, 42px)", fontWeight: 700, color: DS.text, lineHeight: 1.15, margin: "0 0 24px" }}>
                  Vetted, Not Sponsored
                </h2>
              </FadeIn>
              <FadeIn delay={0.1}>
                <p style={{ fontFamily: "'DM Sans'", fontSize: 15, color: DS.textSec, lineHeight: 1.75 }}>
                  Every vendor on this list has been hand-selected based on real experience working alongside them at weddings. We don't accept paid placements or trade features for referrals. If they're here, it's because their work, reliability, and professionalism have earned it — wedding after wedding.
                </p>
              </FadeIn>
            </div>
            <div>
              <FadeIn delay={0.1}>
                <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                  {[
                    { title: "Worked Together", desc: "Every listed vendor has collaborated with MMC on at least 3 weddings. We know their work firsthand." },
                    { title: "Client Approved", desc: "Couples who've booked these vendors consistently rate them highly in our post-event surveys." },
                    { title: "Regularly Updated", desc: "We review this list every season — adding vendors who've earned their place and removing those who haven't." },
                  ].map((item, i) => (
                    <div key={item.title} style={{ borderTop: `1px solid ${DS.border}`, paddingTop: 16 }}>
                      <h4 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 19, fontWeight: 600, color: DS.text, marginBottom: 6 }}>{item.title}</h4>
                      <p style={{ fontFamily: "'DM Sans'", fontSize: 13, color: DS.textSec, lineHeight: 1.6 }}>{item.desc}</p>
                    </div>
                  ))}
                </div>
              </FadeIn>
            </div>
          </div>
        </div>
      </div>

      {/* ── VENDOR SUBMISSION ─────────────────────────────────────── */}
      <div style={{ maxWidth: 800, margin: "0 auto", padding: "100px 32px", textAlign: "center" }}>
        <FadeIn>
          <div style={{ fontFamily: "'DM Sans'", fontSize: 12, color: DS.gold, textTransform: "uppercase", letterSpacing: "0.2em", marginBottom: 16 }}>Are You a Vendor?</div>
          <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(28px, 3.5vw, 42px)", fontWeight: 700, color: DS.text, lineHeight: 1.15, margin: "0 0 16px" }}>
            Want to Be on This List?
          </h2>
          <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(17px, 2vw, 22px)", color: DS.textSec, fontStyle: "italic", maxWidth: 550, margin: "0 auto 32px" }}>
            We're always open to meeting new vendors who share our standard. If you think you'd be a great fit, reach out — we'd love to see your work.
          </p>
          <a href="/contact" style={{
            fontFamily: "'DM Sans'", fontSize: 14, color: DS.bg, background: DS.ember,
            padding: "16px 40px", textDecoration: "none", textTransform: "uppercase", letterSpacing: "0.1em",
            fontWeight: 600, transition: "background 0.3s", display: "inline-block",
          }}
            onMouseEnter={(e) => e.target.style.background = "#ff6b3d"}
            onMouseLeave={(e) => e.target.style.background = DS.ember}
          >Get in Touch</a>
        </FadeIn>
      </div>

      {/* ── CTA ────────────────────────────────────────────────────── */}
      <div style={{ padding: "100px 32px", textAlign: "center", background: `linear-gradient(160deg, var(--mm-surface) 0%, var(--mm-surface-alt) 50%, ${DS.bg} 100%)` }}>
        <FadeIn>
          <div style={{ fontFamily: "'DM Sans'", fontSize: 12, color: DS.gold, textTransform: "uppercase", letterSpacing: "0.2em", marginBottom: 16 }}>Ready to Plan?</div>
          <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(30px, 4.5vw, 52px)", fontWeight: 700, color: DS.text, lineHeight: 1.1, margin: "0 0 16px" }}>
            Build Your Dream Team
          </h2>
          <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 20, color: DS.textSec, fontStyle: "italic", marginBottom: 36, maxWidth: 500, margin: "0 auto 36px" }}>
            Great vendors make great weddings. Start with the team that knows how to work together.
          </p>
          <div style={{ display: "flex", gap: 16, justifyContent: "center", flexWrap: "wrap" }}>
            <a href="/contact" style={{
              fontFamily: "'DM Sans'", fontSize: 14, color: DS.bg, background: DS.ember,
              padding: "16px 40px", textDecoration: "none", textTransform: "uppercase", letterSpacing: "0.1em", fontWeight: 600, transition: "background 0.3s",
            }}
              onMouseEnter={(e) => e.target.style.background = "#ff6b3d"}
              onMouseLeave={(e) => e.target.style.background = DS.ember}
            >Check Availability</a>
            <a href="/portal" style={{
              fontFamily: "'DM Sans'", fontSize: 14, color: DS.gold, padding: "16px 40px", textDecoration: "none", textTransform: "uppercase", letterSpacing: "0.1em", fontWeight: 600,
              border: `1px solid ${DS.gold}`, transition: "all 0.3s",
            }}
              onMouseEnter={(e) => { e.target.style.background = DS.gold; e.target.style.color = DS.bg; }}
              onMouseLeave={(e) => { e.target.style.background = "transparent"; e.target.style.color = DS.gold; }}
            >Planning Portal</a>
          </div>
        </FadeIn>
      </div>

      <Footer />
    </div>
  );
}
