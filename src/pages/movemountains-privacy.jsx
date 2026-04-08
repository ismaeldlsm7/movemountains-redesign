import { useState, useEffect, useRef } from "react";
import { motion, useInView } from "framer-motion";
import Header from "../components/Header";
import Footer from "../components/Footer";

const DS = { bg: "var(--mm-bg)", surface: "var(--mm-surface)", surfaceAlt: "var(--mm-surface-alt)", text: "var(--mm-text)", textSec: "var(--mm-text-sec)", gold: "var(--mm-gold)", ember: "var(--mm-ember)", border: "var(--mm-border)" };
const fontLink = "https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,700;1,400&family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;0,700;1,400;1,500&family=DM+Sans:wght@400;500;600;700&family=Bebas+Neue&display=swap";

function FadeIn({ children, delay = 0, y = 20 }) {
  const ref = useRef(null); const inView = useInView(ref, { once: true, margin: "-30px" });
  return <motion.div ref={ref} initial={{ opacity: 0, y }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6, delay, ease: [0.25, 0.1, 0.25, 1] }}>{children}</motion.div>;
}

const lastUpdated = "January 1, 2026";

const sections = [
  {
    id: "info-collect",
    title: "1. Information We Collect",
    content: [
      "When you interact with Move Mountains Co. — whether through our website, contact forms, booking process, or at your event — we may collect the following types of information:",
      "**Contact Information:** Your name, partner's name, email address, phone number, and mailing address provided through inquiry forms, booking contracts, or email correspondence.",
      "**Event Details:** Wedding date, venue location, guest count, timeline preferences, vendor contacts, and shot list requests necessary to deliver our services.",
      "**Payment Information:** Billing details processed through our secure payment partners. Move Mountains Co. does not store credit card numbers on our servers.",
      "**Visual Content:** Photographs and video recordings captured during engagement sessions, weddings, and events as part of our contracted services.",
      "**Website Usage Data:** IP addresses, browser type, pages visited, and interaction patterns collected automatically through cookies and analytics tools to improve our website experience.",
      "**Communications:** Records of email correspondence, contact form submissions, and planning meeting notes related to your project.",
    ],
  },
  {
    id: "info-use",
    title: "2. How We Use Your Information",
    content: [
      "We use the information we collect for the following purposes:",
      "**Service Delivery:** To plan, execute, and deliver photography, videography, and related services as outlined in your contract.",
      "**Communication:** To respond to inquiries, schedule consultations, coordinate event logistics, and deliver final galleries and films.",
      "**Business Operations:** To process payments, manage bookings, maintain records, and fulfill contractual obligations.",
      "**Marketing (with consent):** To feature your wedding on our website, blog, and social media channels. We always request permission before publishing any images publicly. You may opt out at any time.",
      "**Website Improvement:** To analyze website traffic patterns, improve user experience, and optimize our content for potential clients.",
      "**Legal Compliance:** To comply with applicable laws, regulations, and legal processes.",
    ],
  },
  {
    id: "info-share",
    title: "3. How We Share Your Information",
    content: [
      "Move Mountains Co. does not sell, rent, or trade your personal information to third parties. We may share information in the following limited circumstances:",
      "**Service Partners:** With trusted vendors and subcontractors who assist in delivering our services (e.g., album printing companies, online gallery hosting platforms, payment processors). These partners are contractually bound to protect your information.",
      "**With Your Consent:** When you explicitly authorize us to share images or information, such as submitting your wedding for publication in media outlets like Brides Magazine or British Vogue.",
      "**Legal Requirements:** When required by law, regulation, subpoena, or court order.",
      "**Business Transfers:** In the event of a merger, acquisition, or sale of assets, your information may be transferred as part of the transaction. You will be notified of any such change.",
    ],
  },
  {
    id: "photos-rights",
    title: "4. Photographs & Image Rights",
    content: [
      "This section is particularly important to our clients:",
      "**Your Usage Rights:** You receive a personal, non-commercial license to use all delivered images for personal purposes including printing, sharing on social media, and creating personal keepsakes. No additional licensing fees apply for personal use.",
      "**Commercial Use:** Images may not be used for commercial purposes (advertisements, product endorsements, stock photography) without written permission from Move Mountains Co.",
      "**Our Usage Rights:** Unless otherwise specified in your contract, Move Mountains Co. retains the right to use images from your event for portfolio display, marketing, social media, blog posts, award submissions, and educational purposes (such as MMC Academy instruction).",
      "**Opt-Out:** You may request that your images not be used for marketing purposes at any time by contacting us at privacy@movemountains.co. We will honor all opt-out requests within 30 days.",
      "**Image Retention:** We retain original image files for a minimum of 12 months after delivery. After this period, files may be archived or deleted. We recommend downloading and backing up your gallery promptly upon delivery.",
    ],
  },
  {
    id: "cookies",
    title: "5. Cookies & Tracking Technologies",
    content: [
      "Our website uses cookies and similar technologies to enhance your browsing experience:",
      "**Essential Cookies:** Required for basic website functionality including navigation, form submissions, and security features. These cannot be disabled.",
      "**Analytics Cookies:** We use Google Analytics to understand how visitors interact with our website. This data is aggregated and anonymized. You can opt out of Google Analytics by installing the Google Analytics Opt-out Browser Add-on.",
      "**Marketing Cookies:** We may use Facebook Pixel and similar tracking tools to measure the effectiveness of our advertising and deliver relevant content. You can manage these preferences through your browser settings.",
      "**Third-Party Embeds:** Our website may contain embedded content from third-party platforms (Vimeo for video, Instagram for social feeds). These platforms may set their own cookies according to their respective privacy policies.",
    ],
  },
  {
    id: "data-security",
    title: "6. Data Security",
    content: [
      "We implement industry-standard security measures to protect your personal information, including:",
      "Encrypted data transmission (SSL/TLS) across our website and communication channels. Secure cloud storage with access controls for all client files. Regular security audits of our digital infrastructure. Limited employee access to personal information on a need-to-know basis.",
      "While we take every reasonable precaution, no method of electronic transmission or storage is 100% secure. We cannot guarantee absolute security but are committed to protecting your information to the best of our ability.",
    ],
  },
  {
    id: "your-rights",
    title: "7. Your Rights",
    content: [
      "Depending on your location, you may have the following rights regarding your personal information:",
      "**Access:** Request a copy of the personal information we hold about you.",
      "**Correction:** Request that we update or correct inaccurate information.",
      "**Deletion:** Request that we delete your personal information, subject to legal retention requirements and contractual obligations.",
      "**Marketing Opt-Out:** Unsubscribe from marketing communications at any time by clicking the unsubscribe link in any email or contacting us directly.",
      "**Image Opt-Out:** Request that your images be removed from our website, social media, and marketing materials.",
      "To exercise any of these rights, contact us at privacy@movemountains.co. We will respond within 30 days.",
    ],
  },
  {
    id: "children",
    title: "8. Children's Privacy",
    content: [
      "Our website and services are not directed at individuals under the age of 18. We do not knowingly collect personal information from children. If you believe we have inadvertently collected information from a minor, please contact us immediately at privacy@movemountains.co.",
    ],
  },
  {
    id: "changes",
    title: "9. Changes to This Policy",
    content: [
      "We may update this Privacy Policy from time to time to reflect changes in our practices, technology, or legal requirements. When we make material changes, we will update the 'Last Updated' date at the top of this page. We encourage you to review this policy periodically.",
    ],
  },
  {
    id: "contact",
    title: "10. Contact Us",
    content: [
      "If you have questions, concerns, or requests regarding this Privacy Policy or our data practices, please contact us:",
      "**Move Mountains Co.**\n28 Wolcott St\nProvidence, RI 02908\n\n**Email:** privacy@movemountains.co\n**Phone:** (401) 616-4500\n**General Inquiries:** info@movemountains.co",
    ],
  },
];

function renderContent(text) {
  if (text.startsWith("**") || text.includes("**")) {
    const parts = text.split(/(\*\*[^*]+\*\*)/g);
    return parts.map((part, i) => {
      if (part.startsWith("**") && part.endsWith("**")) {
        return <strong key={i} style={{ color: DS.text, fontWeight: 600 }}>{part.replace(/\*\*/g, "")}</strong>;
      }
      return <span key={i}>{part}</span>;
    });
  }
  return text;
}

export default function PrivacyPage() {
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
            <a href="#" style={{ color: DS.textSec, textDecoration: "none" }}>Home</a><span style={{ margin: "0 10px", opacity: 0.4 }}>/</span><span style={{ color: DS.gold }}>Privacy Policy</span>
          </div>
          <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(36px, 5vw, 56px)", fontWeight: 700, color: DS.text, lineHeight: 1.1, margin: "0 0 16px" }}>Privacy Policy</h1>
          <p style={{ fontFamily: "'DM Sans'", fontSize: 14, color: DS.textSec }}>Last updated: {lastUpdated}</p>
          <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(17px, 2vw, 22px)", color: DS.textSec, fontStyle: "italic", marginTop: 16, maxWidth: 600 }}>
            Your privacy matters to us. This policy explains how Move Mountains Co. collects, uses, and protects your personal information.
          </p>
        </motion.div>
        <div style={{ height: 1, background: DS.border, marginTop: 32 }} />
      </div>

      {/* Body */}
      <div style={{ maxWidth: 1000, margin: "0 auto", padding: "48px 32px 80px" }}>
        <div className="legal-layout" style={{ display: "grid", gridTemplateColumns: "1fr 220px", gap: "clamp(32px, 5vw, 64px)", alignItems: "start" }}>
          {/* Content */}
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

          {/* Sidebar nav */}
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
              <a href="#" style={{ fontFamily: "'DM Sans'", fontSize: 12, color: DS.gold, textDecoration: "none", display: "block", marginBottom: 8 }}>Terms & Conditions →</a>
              <a href="#" style={{ fontFamily: "'DM Sans'", fontSize: 12, color: DS.textSec, textDecoration: "none" }}>Contact Us →</a>
            </div>
          </aside>
        </div>
      </div>

      <Footer />
    </div>
  );
}
