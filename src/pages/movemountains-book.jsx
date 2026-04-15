import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { DS } from "../components/designSystem";
import { getIncludedAddOns } from "../data/pricing";
import BookingProgress from "../components/booking/BookingProgress";
import DatePicker from "../components/booking/DatePicker";
import PackageBuilder from "../components/booking/PackageBuilder";
import ClientIntakeForm from "../components/booking/ClientIntakeForm";
import ContractStep from "../components/booking/ContractStep";
import PreWeddingQuestionnaire from "../components/booking/PreWeddingQuestionnaire";
import BookingReview from "../components/booking/BookingReview";

const fontLink = "https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,700;1,400&family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;0,700;1,400;1,500&family=DM+Sans:wght@400;500;600;700&family=Bebas+Neue&display=swap";

function validateStep(step, data) {
  const errors = {};
  if (step === 1 && !data.weddingDate) return { _valid: false };
  if (step === 2 && !data.selectedPackage) return { _valid: false };
  if (step === 3) {
    if (!data.clientData?.name) errors.name = "Required";
    if (!data.clientData?.partnerName) errors.partnerName = "Required";
    if (!data.clientData?.email) errors.email = "Required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.clientData.email)) errors.email = "Invalid email";
    if (!data.clientData?.phone) errors.phone = "Required";
    if (!data.clientData?.venue) errors.venue = "Required";
    if (!data.clientData?.guestCount) errors.guestCount = "Required";
    if (Object.keys(errors).length > 0) return { _valid: false, ...errors };
  }
  if (step === 4) {
    if (!data.signature) return { _valid: false };
    if (!data.termsAccepted) return { _valid: false };
  }
  // Step 5 (questionnaire) is always valid (can skip)
  return { _valid: true };
}

export default function BookingWizard() {
  const [searchParams] = useSearchParams();
  const [currentStep, setCurrentStep] = useState(1);
  const [direction, setDirection] = useState(1);
  const [formErrors, setFormErrors] = useState({});
  const [bookingData, setBookingData] = useState({
    weddingDate: null,
    selectedPackage: searchParams.get("package") || null,
    selectedAddOns: searchParams.get("addon") ? [searchParams.get("addon")] : [],
    extraHours: 1,
    clientData: {},
    signature: null,
    termsAccepted: false,
    questionnaire: {},
  });

  // If a package or addon was pre-selected, start at step 1 but it'll be pre-filled
  useEffect(() => {
    if (searchParams.get("package") && !searchParams.get("addon")) {
      // Package pre-selected, they still need to pick a date first
    }
  }, [searchParams]);

  const goNext = () => {
    const validation = validateStep(currentStep, bookingData);
    if (!validation._valid) {
      const { _valid, ...errors } = validation;
      setFormErrors(errors);
      return;
    }
    setFormErrors({});
    setDirection(1);
    setCurrentStep((s) => Math.min(s + 1, 6));
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const goBack = () => {
    setFormErrors({});
    setDirection(-1);
    setCurrentStep((s) => Math.max(s - 1, 1));
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const canProceed = (() => {
    const v = validateStep(currentStep, bookingData);
    return v._valid;
  })();

  const slideVariants = {
    enter: (dir) => ({ x: dir > 0 ? 80 : -80, opacity: 0 }),
    center: { x: 0, opacity: 1 },
    exit: (dir) => ({ x: dir > 0 ? -80 : 80, opacity: 0 }),
  };

  return (
    <div style={{ background: DS.bg, color: DS.text, minHeight: "100vh" }}>
      <style>{`
        @import url('${fontLink}');
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body { background: ${DS.bg}; }
        ::selection { background: ${DS.gold}; color: ${DS.bg}; }
        .fill-up-btn { color: ${DS.ember} !important; background: transparent !important; border: 1px solid ${DS.ember}; transition: color 0.45s cubic-bezier(0.65, 0, 0.35, 1); }
        .fill-up-btn::before { content: ""; position: absolute; left: 0; right: 0; bottom: 0; height: 100%; background: ${DS.ember}; transform: translateY(100%); transition: transform 0.45s cubic-bezier(0.65, 0, 0.35, 1); z-index: 0; }
        .fill-up-btn:hover::before { transform: translateY(0); }
        .fill-up-btn:hover { color: ${DS.bg} !important; }
        .cta-rollover .cta-char-top { color: ${DS.ember}; }
        .cta-rollover .cta-char-bot { color: #fff; }
        .cta-rollover:hover .cta-char-top { transform: translateY(-120%) !important; }
        .cta-rollover:hover .cta-char-bot { transform: translateY(0) !important; }
        @media (max-width: 768px) {
          .booking-nav-buttons { flex-direction: column-reverse !important; gap: 12px !important; }
          .booking-nav-buttons button { width: 100% !important; }
        }
      `}</style>
      <Header activePage="Investment" />

      <div style={{ maxWidth: 960, margin: "0 auto", padding: "120px clamp(20px, 4vw, 48px) 80px" }}>
        {/* Progress */}
        <BookingProgress currentStep={currentStep} totalSteps={6} />

        {/* Step content */}
        <AnimatePresence mode="wait" custom={direction}>
          <motion.div
            key={currentStep}
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.35, ease: [0.25, 0.1, 0.25, 1] }}
          >
            {currentStep === 1 && (
              <DatePicker
                selectedDate={bookingData.weddingDate}
                onSelect={(date) => setBookingData({ ...bookingData, weddingDate: date })}
              />
            )}

            {currentStep === 2 && (
              <PackageBuilder
                selectedPackage={bookingData.selectedPackage}
                selectedAddOns={bookingData.selectedAddOns}
                onPackageSelect={(pkg) => {
                  const included = getIncludedAddOns(pkg);
                  setBookingData((prev) => ({
                    ...prev,
                    selectedPackage: pkg,
                    selectedAddOns: prev.selectedAddOns.filter((id) => !included.includes(id)),
                  }));
                }}
                onAddOnsChange={(addons) => setBookingData({ ...bookingData, selectedAddOns: addons })}
                extraHours={bookingData.extraHours}
                onExtraHoursChange={(hours) => setBookingData({ ...bookingData, extraHours: hours })}
              />
            )}

            {currentStep === 3 && (
              <ClientIntakeForm
                data={{ ...bookingData.clientData, weddingDate: bookingData.weddingDate }}
                onChange={(clientData) => setBookingData({ ...bookingData, clientData })}
                errors={formErrors}
              />
            )}

            {currentStep === 4 && (
              <ContractStep
                bookingData={bookingData}
                signature={bookingData.signature}
                onSign={(sig) => setBookingData({ ...bookingData, signature: sig })}
                termsAccepted={bookingData.termsAccepted}
                onTermsChange={(accepted) => setBookingData({ ...bookingData, termsAccepted: accepted })}
              />
            )}

            {currentStep === 5 && (
              <PreWeddingQuestionnaire
                data={bookingData.questionnaire}
                onChange={(q) => setBookingData({ ...bookingData, questionnaire: q })}
                onSkip={goNext}
              />
            )}

            {currentStep === 6 && (
              <BookingReview
                bookingData={bookingData}
              />
            )}
          </motion.div>
        </AnimatePresence>

        {/* Navigation buttons */}
        {currentStep < 6 && (
          <div className="booking-nav-buttons" style={{
            display: "flex", justifyContent: "space-between", alignItems: "center",
            marginTop: 48, gap: 16,
          }}>
            {currentStep > 1 ? (
              <button onClick={goBack} style={{
                background: "none", border: `1px solid ${DS.border}`, color: DS.text,
                padding: "14px 32px", borderRadius: 6, cursor: "pointer",
                fontFamily: "'DM Sans'", fontSize: 14, fontWeight: 500,
                transition: "border-color 0.2s",
              }}>
                ← Back
              </button>
            ) : <div />}

            <motion.button
              onClick={goNext}
              whileHover={canProceed ? { scale: 1.02 } : {}}
              whileTap={canProceed ? { scale: 0.98 } : {}}
              style={{
                background: canProceed ? DS.gold : "transparent",
                border: `1px solid ${canProceed ? DS.gold : DS.border}`,
                color: canProceed ? DS.bg : DS.textSec,
                padding: "14px 40px", borderRadius: 6,
                cursor: canProceed ? "pointer" : "not-allowed",
                fontFamily: "'DM Sans'", fontSize: 14, fontWeight: 600,
                textTransform: "uppercase", letterSpacing: "0.06em",
                transition: "all 0.3s",
              }}
            >
              {currentStep === 5 ? "Continue to Review" : "Continue"} →
            </motion.button>
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
}
