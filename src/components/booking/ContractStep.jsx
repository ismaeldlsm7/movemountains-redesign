import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { DS } from "../designSystem";
import { PACKAGES, ADD_ONS, formatPrice, calculateRetainer, PAYMENT_TERMS } from "../../data/pricing";

function SignaturePad({ onSign, signature }) {
  const canvasRef = useRef(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [hasDrawn, setHasDrawn] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    canvas.width = canvas.offsetWidth * 2;
    canvas.height = canvas.offsetHeight * 2;
    ctx.scale(2, 2);
    ctx.strokeStyle = DS.text === "var(--mm-text)" ? "#e8e0d4" : "#1a1a1a";
    ctx.lineWidth = 2;
    ctx.lineCap = "round";
    ctx.lineJoin = "round";
  }, []);

  const getPos = (e) => {
    const canvas = canvasRef.current;
    const rect = canvas.getBoundingClientRect();
    const clientX = e.touches ? e.touches[0].clientX : e.clientX;
    const clientY = e.touches ? e.touches[0].clientY : e.clientY;
    return { x: clientX - rect.left, y: clientY - rect.top };
  };

  const startDraw = (e) => {
    e.preventDefault();
    setIsDrawing(true);
    const ctx = canvasRef.current.getContext("2d");
    const { x, y } = getPos(e);
    ctx.beginPath();
    ctx.moveTo(x, y);
  };

  const draw = (e) => {
    if (!isDrawing) return;
    e.preventDefault();
    const ctx = canvasRef.current.getContext("2d");
    const { x, y } = getPos(e);
    ctx.lineTo(x, y);
    ctx.stroke();
    setHasDrawn(true);
  };

  const endDraw = () => {
    if (!isDrawing) return;
    setIsDrawing(false);
    if (hasDrawn) {
      onSign(canvasRef.current.toDataURL());
    }
  };

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    setHasDrawn(false);
    onSign(null);
  };

  return (
    <div>
      <div style={{ position: "relative", marginBottom: 12 }}>
        <canvas
          ref={canvasRef}
          onMouseDown={startDraw} onMouseMove={draw} onMouseUp={endDraw} onMouseLeave={endDraw}
          onTouchStart={startDraw} onTouchMove={draw} onTouchEnd={endDraw}
          style={{
            width: "100%", height: 120, border: `1px solid ${DS.border}`, borderRadius: 8,
            background: `${DS.surface}`, cursor: "crosshair", touchAction: "none",
          }}
        />
        {!hasDrawn && !signature && (
          <div style={{
            position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center",
            pointerEvents: "none", fontFamily: "'Cormorant Garamond', serif", fontSize: 18,
            color: DS.textSec, fontStyle: "italic", opacity: 0.5,
          }}>
            Sign here
          </div>
        )}
      </div>
      {(hasDrawn || signature) && (
        <button onClick={clearCanvas} style={{
          background: "none", border: "none", color: DS.textSec, fontFamily: "'DM Sans'",
          fontSize: 12, cursor: "pointer", textDecoration: "underline",
        }}>
          Clear signature
        </button>
      )}
    </div>
  );
}

export default function ContractStep({ bookingData, signature, onSign, termsAccepted, onTermsChange }) {
  const pkg = PACKAGES.find((p) => p.id === bookingData.selectedPackage);
  const selectedAddOns = (bookingData.selectedAddOns || []).map((id) => ADD_ONS.find((a) => a.id === id)).filter(Boolean);
  const extraHours = bookingData.extraHours || 1;
  const totalCents = pkg ? pkg.priceInCents + selectedAddOns.reduce((sum, a) => sum + (a.id === "extra-hours" ? a.priceInCents * extraHours : a.priceInCents), 0) : 0;
  const retainer = calculateRetainer(totalCents);
  const balance = totalCents - retainer;

  const weddingDateFormatted = bookingData.weddingDate
    ? new Date(bookingData.weddingDate + "T12:00:00").toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })
    : "TBD";

  const balanceDueDate = bookingData.weddingDate
    ? (() => {
        const d = new Date(bookingData.weddingDate + "T12:00:00");
        d.setDate(d.getDate() - PAYMENT_TERMS.balanceDueDaysBefore);
        return d.toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" });
      })()
    : "30 days before your wedding";

  return (
    <div>
      <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(28px, 4vw, 42px)", fontWeight: 400, marginBottom: 8 }}>
        Review & sign your contract
      </h2>
      <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 19, color: DS.textSec, marginBottom: 40, lineHeight: 1.6 }}>
        Please review the terms below and sign to proceed. This protects both you and our team.
      </p>

      {/* Contract document */}
      <div style={{
        maxWidth: 640, margin: "0 auto", padding: "40px 32px",
        background: DS.surface, border: `1px solid ${DS.border}`,
        borderRadius: 12, maxHeight: 480, overflowY: "auto",
      }}>
        <div style={{ textAlign: "center", marginBottom: 32 }}>
          <div style={{ fontFamily: "'Playfair Display', serif", fontSize: 24, marginBottom: 4 }}>
            Move Mountains <span style={{ color: DS.gold }}>Co.</span>
          </div>
          <div style={{ fontFamily: "'DM Sans'", fontSize: 12, color: DS.textSec, textTransform: "uppercase", letterSpacing: "0.1em" }}>
            Wedding Photography & Film Agreement
          </div>
        </div>

        <div style={{ fontFamily: "'DM Sans'", fontSize: 14, lineHeight: 1.8, color: DS.text }}>
          <p style={{ marginBottom: 16 }}>
            This agreement is between <strong>Move Mountains Co.</strong> ("Photographer") and{" "}
            <strong>{bookingData.clientData?.name || "___"} & {bookingData.clientData?.partnerName || "___"}</strong> ("Client")
            for wedding photography and/or videography services on <strong>{weddingDateFormatted}</strong>.
          </p>

          <h4 style={{ fontFamily: "'Playfair Display', serif", fontSize: 18, fontWeight: 400, marginBottom: 12, marginTop: 24, color: DS.gold }}>
            Services
          </h4>
          <p style={{ marginBottom: 8 }}>
            Package: <strong>{pkg?.name || "—"}</strong> — ${pkg ? formatPrice(pkg.priceInCents) : "—"}
          </p>
          {selectedAddOns.length > 0 && (
            <>
              <p style={{ marginBottom: 4 }}>Add-ons:</p>
              <ul style={{ paddingLeft: 20, marginBottom: 16 }}>
                {selectedAddOns.map((a) => (
                  <li key={a.id} style={{ marginBottom: 4 }}>{a.name} — ${a.displayPrice}</li>
                ))}
              </ul>
            </>
          )}

          <h4 style={{ fontFamily: "'Playfair Display', serif", fontSize: 18, fontWeight: 400, marginBottom: 12, marginTop: 24, color: DS.gold }}>
            Payment Terms
          </h4>
          <ul style={{ paddingLeft: 20, marginBottom: 16 }}>
            <li style={{ marginBottom: 8 }}>Total investment: <strong>${formatPrice(totalCents)}</strong></li>
            <li style={{ marginBottom: 8 }}>Retainer due at signing (30%): <strong>${formatPrice(retainer)}</strong></li>
            <li style={{ marginBottom: 8 }}>Remaining balance: <strong>${formatPrice(balance)}</strong> due by <strong>{balanceDueDate}</strong></li>
          </ul>

          <h4 style={{ fontFamily: "'Playfair Display', serif", fontSize: 18, fontWeight: 400, marginBottom: 12, marginTop: 24, color: DS.gold }}>
            Key Terms
          </h4>
          <ul style={{ paddingLeft: 20, marginBottom: 16, fontSize: 13, color: DS.textSec }}>
            <li style={{ marginBottom: 8 }}>The retainer is non-refundable and secures your date exclusively.</li>
            <li style={{ marginBottom: 8 }}>Rescheduling requests made 90+ days in advance are accommodated at no cost, subject to availability.</li>
            <li style={{ marginBottom: 8 }}>Image delivery: Sneak peek within 3–5 days. Full gallery within 6–8 weeks. Films within 8–14 weeks.</li>
            <li style={{ marginBottom: 8 }}>The Photographer retains copyright. Client receives full personal-use license for all delivered images.</li>
            <li style={{ marginBottom: 8 }}>Client grants permission for images to be used in portfolio, social media, and marketing materials. Opt-out available upon request.</li>
          </ul>
        </div>
      </div>

      {/* Signature area */}
      <div style={{ maxWidth: 640, margin: "32px auto 0" }}>
        <div style={{ fontFamily: "'DM Sans'", fontSize: 12, fontWeight: 600, color: DS.textSec, textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 12 }}>
          Your Signature
        </div>
        <SignaturePad signature={signature} onSign={onSign} />

        {/* Terms checkbox */}
        <motion.label
          whileHover={{ x: 2 }}
          style={{
            display: "flex", alignItems: "flex-start", gap: 12, marginTop: 24, cursor: "pointer",
            padding: "16px 20px", borderRadius: 8,
            border: `1px solid ${termsAccepted ? DS.gold + "44" : DS.border}`,
            background: termsAccepted ? `${DS.gold}08` : "transparent",
            transition: "all 0.2s",
          }}
        >
          <input type="checkbox" checked={termsAccepted} onChange={(e) => onTermsChange(e.target.checked)}
            style={{ display: "none" }} />
          <div style={{
            width: 20, height: 20, borderRadius: 4, flexShrink: 0, marginTop: 1,
            border: `2px solid ${termsAccepted ? DS.gold : DS.border}`,
            background: termsAccepted ? DS.gold : "transparent",
            display: "flex", alignItems: "center", justifyContent: "center",
            transition: "all 0.2s",
          }}>
            {termsAccepted && <span style={{ color: DS.bg, fontSize: 13, fontWeight: 700 }}>✓</span>}
          </div>
          <span style={{ fontFamily: "'DM Sans'", fontSize: 14, color: DS.text, lineHeight: 1.5 }}>
            I have read and agree to the terms of this contract. I understand that the retainer is non-refundable and secures my wedding date.
          </span>
        </motion.label>
      </div>
    </div>
  );
}
