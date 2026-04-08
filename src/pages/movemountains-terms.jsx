import { useState, useEffect, useRef } from "react";
import { motion, useInView } from "framer-motion";
import Header from "../components/Header";
import Footer from "../components/Footer";

const DS = { bg: "#0F0F0F", surface: "#1E1E1E", surfaceAlt: "#161616", text: "#F5F0E8", textSec: "#8A8477", gold: "#C9A96E", ember: "#E8572A", border: "#2A2A2A" };
const fontLink = "https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,700;1,400&family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;0,700;1,400;1,500&family=DM+Sans:wght@400;500;600;700&family=Bebas+Neue&display=swap";

function FadeIn({ children, delay = 0, y = 20 }) {
  const ref = useRef(null); const inView = useInView(ref, { once: true, margin: "-30px" });
  return <motion.div ref={ref} initial={{ opacity: 0, y }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6, delay, ease: [0.25, 0.1, 0.25, 1] }}>{children}</motion.div>;
}

const lastUpdated = "January 1, 2026";

const sections = [
  {
    id: "acceptance",
    title: "1. Acceptance of Terms",
    content: [
      "By accessing and using the Move Mountains Co. website (movemountains.co) and engaging our services, you agree to be bound by these Terms and Conditions. If you do not agree to these terms, please do not use our website or services.",
      "These terms apply to all visitors, users, clients, and anyone who accesses or uses our website and services. Additional terms may apply to specific services and will be outlined in your individual contract.",
    ],
  },
  {
    id: "services",
    title: "2. Services",
    content: [
      "Move Mountains Co. provides professional wedding photography, videography, content creation, photo booth (Luxe Booth), live streaming, album production, and educational training (MMC Academy) services. Specific services, deliverables, and timelines are defined in individual client contracts.",
      "**Service Agreement:** All booked services are governed by a separate Service Agreement (contract) signed by both parties. In the event of any conflict between these Terms and your Service Agreement, the Service Agreement shall prevail.",
      "**Service Availability:** We commit to one wedding per day. Availability is subject to date and team capacity. Booking is confirmed only upon receipt of a signed contract and retainer payment.",
    ],
  },
  {
    id: "booking",
    title: "3. Booking & Payments",
    content: [
      "**Retainer:** A non-refundable retainer of 30% of the total package price is required to secure your date. This retainer reserves your date exclusively and removes it from availability for other clients.",
      "**Balance Payment:** The remaining balance is due 30 days prior to your event date. Failure to remit the balance by the due date may result in cancellation of services.",
      "**Payment Methods:** We accept bank transfers (ACH), credit cards, and approved payment plan arrangements. Payment plans are available for packages exceeding $5,000.",
      "**Additional Services:** Services added after the initial booking (extra hours, add-ons, additional albums) will be invoiced separately and are due upon delivery or as specified.",
      "**Pricing:** All prices listed on our website are starting prices and may vary based on specific requirements. Final pricing is confirmed in your Service Agreement.",
    ],
  },
  {
    id: "cancellation",
    title: "4. Cancellation & Rescheduling",
    content: [
      "**Client Cancellation:** If you cancel your event, the retainer is non-refundable as it compensates for the reserved date and declined bookings. Cancellations made within 30 days of the event may be subject to the full contract balance.",
      "**Rescheduling:** Date changes requested 90 or more days before the original event date will be accommodated at no additional charge, subject to availability. Requests within 90 days may incur a rebooking fee of $500.",
      "**Photographer/Vendor Cancellation:** In the unlikely event that Move Mountains Co. must cancel due to illness, emergency, or force majeure, we will make every reasonable effort to provide a qualified replacement photographer. If no replacement is available, all payments will be refunded in full.",
      "**Force Majeure:** Neither party shall be liable for failure to perform obligations due to circumstances beyond reasonable control, including natural disasters, pandemics, government restrictions, or severe weather that makes the event impossible.",
    ],
  },
  {
    id: "image-rights",
    title: "5. Image Rights & Usage",
    content: [
      "**Copyright:** All photographs and video content produced by Move Mountains Co. are protected by U.S. Copyright Law. Move Mountains Co. retains copyright ownership of all images and footage.",
      "**Client License:** Upon delivery and full payment, clients receive a non-exclusive, personal-use license to reproduce, print, share, and display images for personal purposes. This license does not include commercial use, resale, or submission to stock photography platforms.",
      "**Portfolio & Marketing Use:** Unless otherwise specified in your Service Agreement, Move Mountains Co. reserves the right to use images and footage for portfolio display, website content, social media marketing, blog posts, advertising, award submissions, and educational materials (including MMC Academy).",
      "**Opt-Out:** Clients may request in writing that their images not be used for marketing purposes. Opt-out requests will be honored within 30 days. Images already published prior to the request may remain live on third-party platforms where removal is not technically feasible.",
      "**Image Editing:** Clients may not alter, distort, or modify delivered images in any way that misrepresents the original work (including applying third-party filters or AI modifications) when crediting Move Mountains Co. Images shared without credit may be edited freely for personal use.",
      "**Vendor & Publication Sharing:** We may share images with other wedding vendors (florists, venues, planners) for mutual portfolio use, and may submit images to wedding publications, blogs, and media outlets for editorial consideration.",
    ],
  },
  {
    id: "deliverables",
    title: "6. Deliverables & Timelines",
    content: [
      "**Photo Delivery:** Sneak peek images (20–30 selects) are delivered within 3–5 business days. Full galleries are delivered within 6–8 weeks of the event date.",
      "**Video Delivery:** Highlight films are delivered within 8–12 weeks. Full ceremony and reception edits are delivered within 10–14 weeks. Rush delivery is available for an additional fee.",
      "**Album Delivery:** Custom wedding albums require 4–6 weeks of production following design approval.",
      "**File Retention:** Move Mountains Co. retains original image and video files for a minimum of 12 months following delivery. After this period, files may be archived or deleted without notice. Clients are responsible for downloading and backing up all delivered files.",
      "**Delivery Method:** All digital files are delivered via private online galleries hosted on our gallery platform. Download links remain active for a minimum of 90 days after delivery.",
      "**Rush Delivery:** Rush delivery services are available at an additional fee of $500 for photography and $750 for videography, reducing delivery times by approximately 50%.",
    ],
  },
  {
    id: "conduct",
    title: "7. Event Day Conduct",
    content: [
      "**Access & Cooperation:** Clients agree to provide reasonable access to the event venue and cooperate with reasonable requests from the photography/videography team regarding timing, lighting, and positioning.",
      "**Timeline Adherence:** Move Mountains Co. is not responsible for missed shots or coverage gaps resulting from timeline changes made without our team's knowledge or input.",
      "**Guest Photographers:** While we cannot prevent guests from taking photos, we request that guests not interfere with our team's positioning, especially during the ceremony. We recommend including a note in your program or signage requesting that guests refrain from standing in the aisle during the processional.",
      "**Safety:** Our team reserves the right to decline any request that poses a safety risk to our crew, equipment, or other individuals at the event.",
      "**Overtime:** If the event runs beyond the contracted coverage hours, additional time will be billed at the overtime rate specified in your Service Agreement.",
    ],
  },
  {
    id: "liability",
    title: "8. Limitation of Liability",
    content: [
      "**Equipment Failure:** While we use professional equipment with redundant systems (dual card slots, backup bodies), in the rare event of catastrophic equipment failure, Move Mountains Co.'s liability is limited to a refund of the contracted fees.",
      "**Coverage Limitations:** Move Mountains Co. is not liable for coverage limitations caused by venue restrictions, lighting conditions, weather, timeline deviations, or other factors beyond our control.",
      "**Maximum Liability:** In no event shall Move Mountains Co.'s total liability exceed the total fees paid by the client under the applicable Service Agreement.",
      "**Consequential Damages:** Move Mountains Co. shall not be liable for any indirect, incidental, special, or consequential damages arising from or related to our services.",
    ],
  },
  {
    id: "website",
    title: "9. Website Terms",
    content: [
      "**Content Accuracy:** While we strive to keep all website content current and accurate, prices, availability, and service descriptions are subject to change without notice. Your Service Agreement governs the specific terms of your booking.",
      "**Intellectual Property:** All content on the Move Mountains Co. website — including text, images, videos, logos, and design elements — is the property of Move Mountains Co. and is protected by copyright and trademark law. Unauthorized reproduction is prohibited.",
      "**Third-Party Links:** Our website may contain links to third-party websites (vendor platforms, social media, gallery hosting). We are not responsible for the content, privacy practices, or terms of these external sites.",
      "**User Submissions:** By submitting content through our website (contact forms, reviews, testimonials), you grant Move Mountains Co. a non-exclusive license to use, display, and reproduce this content for business purposes.",
    ],
  },
  {
    id: "dispute",
    title: "10. Dispute Resolution",
    content: [
      "**Governing Law:** These Terms and Conditions and any disputes arising from them shall be governed by the laws of the State of Rhode Island.",
      "**Mediation:** In the event of a dispute, both parties agree to first attempt resolution through good-faith mediation before pursuing any legal action.",
      "**Jurisdiction:** Any legal proceedings shall be brought exclusively in the courts of Providence County, Rhode Island.",
      "**Severability:** If any provision of these Terms is found to be unenforceable, the remaining provisions shall continue in full force and effect.",
    ],
  },
  {
    id: "changes",
    title: "11. Changes to These Terms",
    content: [
      "Move Mountains Co. reserves the right to modify these Terms and Conditions at any time. Material changes will be reflected by an updated 'Last Updated' date. Continued use of our website or services after changes constitutes acceptance of the updated terms.",
    ],
  },
  {
    id: "contact",
    title: "12. Contact Information",
    content: [
      "For questions about these Terms and Conditions, please contact:",
      "**Move Mountains Co.**\n28 Wolcott St\nProvidence, RI 02908\n\n**Email:** legal@movemountains.co\n**Phone:** (401) 616-4500\n**General Inquiries:** info@movemountains.co",
    ],
  },
];

function renderContent(text) {
  if (text.includes("**")) {
    const parts = text.split(/(\*\*[^*]+\*\*)/g);
    return parts.map((part, i) => {
      if (part.startsWith("**") && part.endsWith("**")) return <strong key={i} style={{ color: DS.text, fontWeight: 600 }}>{part.replace(/\*\*/g, "")}</strong>;
      return <span key={i}>{part}</span>;
    });
  }
  return text;
}


export default function TermsPage() {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => { const fn = () => setScrolled(window.scrollY > 40); window.addEventListener("scroll", fn); return () => window.removeEventListener("scroll", fn); }, []);

  return (
    <div style={{ background: DS.bg, color: DS.text, minHeight: "100vh" }}>
      <style>{`
        @import url('${fontLink}'); * { margin: 0; padding: 0; box-sizing: border-box; } body { background: ${DS.bg}; } ::selection { background: ${DS.gold}; color: ${DS.bg}; }
        @media (max-width: 768px) { .nav-links { display: none !important; } .legal-layout { grid-template-columns: 1fr !important; } .legal-sidebar { display: none !important; } }
      `}</style>
      <Header />

      {/* Header */}
      <div style={{ paddingTop: 100, maxWidth: 1000, margin: "0 auto", padding: "100px 32px 0" }}>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.35 }}>
          <div style={{ fontFamily: "'DM Sans'", fontSize: 12, color: DS.textSec, marginBottom: 32 }}>
            <a href="#" style={{ color: DS.textSec, textDecoration: "none" }}>Home</a><span style={{ margin: "0 10px", opacity: 0.4 }}>/</span><span style={{ color: DS.gold }}>Terms & Conditions</span>
          </div>
          <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(36px, 5vw, 56px)", fontWeight: 700, color: DS.text, lineHeight: 1.1, margin: "0 0 16px" }}>Terms & Conditions</h1>
          <p style={{ fontFamily: "'DM Sans'", fontSize: 14, color: DS.textSec }}>Last updated: {lastUpdated}</p>
          <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(17px, 2vw, 22px)", color: DS.textSec, fontStyle: "italic", marginTop: 16, maxWidth: 600 }}>
            Please read these terms carefully before using our website or engaging our services. By booking with Move Mountains Co., you agree to be bound by these terms.
          </p>
        </motion.div>
        <div style={{ height: 1, background: DS.border, marginTop: 32 }} />
      </div>

      {/* Body */}
      <div style={{ maxWidth: 1000, margin: "0 auto", padding: "48px 32px 80px" }}>
        <div className="legal-layout" style={{ display: "grid", gridTemplateColumns: "1fr 220px", gap: "clamp(32px, 5vw, 64px)", alignItems: "start" }}>
          <div>
            {sections.map((section, si) => (
              <FadeIn key={section.id} delay={si * 0.02}>
                <section id={section.id} style={{ marginBottom: 48 }}>
                  <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 24, fontWeight: 600, color: DS.text, margin: "0 0 16px" }}>{section.title}</h2>
                  {section.content.map((p, pi) => (
                    <p key={pi} style={{ fontFamily: "'DM Sans'", fontSize: 15, color: DS.textSec, lineHeight: 1.8, marginBottom: 12, whiteSpace: "pre-line" }}>
                      {renderContent(p)}
                    </p>
                  ))}
                </section>
              </FadeIn>
            ))}
          </div>

          {/* Sidebar */}
          <aside className="legal-sidebar" style={{ position: "sticky", top: 100 }}>
            <div style={{ fontFamily: "'DM Sans'", fontSize: 10, color: DS.gold, textTransform: "uppercase", letterSpacing: "0.15em", marginBottom: 16 }}>Sections</div>
            {sections.map((s) => (
              <a key={s.id} href={`#${s.id}`} style={{
                display: "block", fontFamily: "'DM Sans'", fontSize: 12, color: DS.textSec, textDecoration: "none",
                padding: "6px 0 6px 12px", borderLeft: `1px solid ${DS.border}`, transition: "all 0.2s", marginBottom: 2,
              }}
                onMouseEnter={(e) => { e.target.style.color = DS.text; e.target.style.borderLeftColor = DS.gold; }}
                onMouseLeave={(e) => { e.target.style.color = DS.textSec; e.target.style.borderLeftColor = DS.border; }}
              >{s.title.replace(/^\d+\.\s*/, "")}</a>
            ))}
            <div style={{ marginTop: 24, paddingTop: 16, borderTop: `1px solid ${DS.border}` }}>
              <a href="#" style={{ fontFamily: "'DM Sans'", fontSize: 12, color: DS.gold, textDecoration: "none", display: "block", marginBottom: 8 }}>Privacy Policy →</a>
              <a href="#" style={{ fontFamily: "'DM Sans'", fontSize: 12, color: DS.textSec, textDecoration: "none" }}>Contact Us →</a>
            </div>
          </aside>
        </div>
      </div>

      <Footer />
    </div>
  );
}
