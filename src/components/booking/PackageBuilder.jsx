import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { DS } from "../designSystem";
import { PACKAGES, ADD_ONS, formatPrice, calculateRetainer, isPaymentPlanEligible, getIncludedAddOns } from "../../data/pricing";

function PackageCard({ pkg, isSelected, onSelect }) {
  const [expanded, setExpanded] = useState(false);

  return (
    <motion.div
      onClick={() => onSelect(pkg.id)}
      whileHover={{ y: -4 }}
      animate={{
        borderColor: isSelected ? DS.gold : "var(--mm-border)",
        background: isSelected ? `${DS.gold}08` : "transparent",
      }}
      transition={{ duration: 0.3 }}
      style={{
        position: "relative", padding: "32px 28px", border: "1px solid",
        borderRadius: 12, cursor: "pointer", overflow: "hidden",
        transition: "box-shadow 0.3s",
        boxShadow: isSelected ? `0 0 24px ${DS.gold}15` : "none",
      }}
    >
      {pkg.popular && (
        <div style={{
          position: "absolute", top: 16, right: -28, background: DS.gold, color: DS.bg,
          fontFamily: "'DM Sans'", fontSize: 10, fontWeight: 700, textTransform: "uppercase",
          letterSpacing: "0.12em", padding: "5px 36px", transform: "rotate(45deg)",
        }}>
          Popular
        </div>
      )}

      {/* Selection indicator */}
      <div style={{
        position: "absolute", top: 16, left: 16, width: 22, height: 22, borderRadius: "50%",
        border: `2px solid ${isSelected ? DS.gold : DS.border}`,
        display: "flex", alignItems: "center", justifyContent: "center",
        transition: "border-color 0.2s",
      }}>
        <AnimatePresence>
          {isSelected && (
            <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }}
              transition={{ type: "spring", stiffness: 400, damping: 20 }}
              style={{ width: 12, height: 12, borderRadius: "50%", background: DS.gold }}
            />
          )}
        </AnimatePresence>
      </div>

      <div style={{ fontFamily: "'DM Sans'", fontSize: 11, color: DS.gold, textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: 8, marginLeft: 30 }}>
        {pkg.subtitle}
      </div>
      <div style={{ fontFamily: "'Playfair Display', serif", fontSize: 28, fontWeight: 400, marginBottom: 4, marginLeft: 30 }}>
        {pkg.name}
      </div>
      <div style={{ fontFamily: "'Bebas Neue'", fontSize: 42, color: DS.gold, margin: "8px 0 12px", marginLeft: 30 }}>
        ${pkg.displayPrice}
      </div>
      <div style={{ fontFamily: "'DM Sans'", fontSize: 13, color: DS.textSec, marginBottom: 16, lineHeight: 1.5, marginLeft: 30 }}>
        {pkg.hours} hours · {pkg.photographers}
      </div>

      <button onClick={(e) => { e.stopPropagation(); setExpanded(!expanded); }} style={{
        background: "none", border: "none", color: DS.gold, fontFamily: "'DM Sans'",
        fontSize: 12, cursor: "pointer", textTransform: "uppercase", letterSpacing: "0.08em",
        padding: "8px 0", display: "flex", alignItems: "center", gap: 6, marginLeft: 30,
      }}>
        {expanded ? "Hide" : "Show"} Details
        <motion.span animate={{ rotate: expanded ? 180 : 0 }} transition={{ duration: 0.2 }}>↓</motion.span>
      </button>

      <AnimatePresence>
        {expanded && (
          <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }} style={{ overflow: "hidden" }}>
            <div style={{ paddingTop: 16, marginLeft: 30 }}>
              <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 16, color: DS.textSec, lineHeight: 1.6, marginBottom: 16 }}>
                {pkg.description}
              </p>
              {pkg.features.map((f) => (
                <div key={f.text} style={{
                  display: "flex", alignItems: "center", gap: 10, padding: "5px 0",
                  fontFamily: "'DM Sans'", fontSize: 13, color: f.included ? DS.text : DS.textSec,
                  opacity: f.included ? 1 : 0.4,
                }}>
                  <span style={{ color: f.included ? DS.gold : DS.textSec, fontSize: 14 }}>
                    {f.included ? "✓" : "—"}
                  </span>
                  {f.text}
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

function HoursStepper({ value, onChange }) {
  return (
    <motion.div
      initial={{ height: 0, opacity: 0 }}
      animate={{ height: "auto", opacity: 1 }}
      exit={{ height: 0, opacity: 0 }}
      transition={{ duration: 0.25, ease: [0.25, 0.1, 0.25, 1] }}
      onClick={(e) => e.stopPropagation()}
      style={{ overflow: "hidden" }}
    >
      <div style={{
        display: "flex", flexDirection: "column", gap: 8, marginTop: 8,
        padding: "10px 14px", background: `${DS.gold}08`, borderRadius: 6,
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <span style={{ fontFamily: "'DM Sans'", fontSize: 12, color: DS.textSec, whiteSpace: "nowrap" }}>
            How many?
          </span>
          <div style={{ display: "flex", alignItems: "center", gap: 0 }}>
            <motion.button
              whileTap={{ scale: 0.9 }}
              onClick={() => onChange(Math.max(1, value - 1))}
              disabled={value <= 1}
              style={{
                width: 32, height: 32, borderRadius: "6px 0 0 6px",
                border: `1px solid ${DS.border}`, borderRight: "none",
                background: "transparent", color: value <= 1 ? DS.textSec : DS.text,
                cursor: value <= 1 ? "not-allowed" : "pointer",
                fontFamily: "'DM Sans'", fontSize: 18, fontWeight: 600,
                display: "flex", alignItems: "center", justifyContent: "center",
                opacity: value <= 1 ? 0.3 : 1,
              }}
            >
              −
            </motion.button>
            <div style={{
              width: 44, height: 32, display: "flex", alignItems: "center", justifyContent: "center",
              border: `1px solid ${DS.border}`, background: DS.surface,
              fontFamily: "'DM Sans'", fontSize: 15, fontWeight: 700, color: DS.gold,
            }}>
              {value}
            </div>
            <motion.button
              whileTap={{ scale: 0.9 }}
              onClick={() => onChange(Math.min(6, value + 1))}
              disabled={value >= 6}
              style={{
                width: 32, height: 32, borderRadius: "0 6px 6px 0",
                border: `1px solid ${DS.border}`, borderLeft: "none",
                background: "transparent", color: value >= 6 ? DS.textSec : DS.text,
                cursor: value >= 6 ? "not-allowed" : "pointer",
                fontFamily: "'DM Sans'", fontSize: 18, fontWeight: 600,
                display: "flex", alignItems: "center", justifyContent: "center",
                opacity: value >= 6 ? 0.3 : 1,
              }}
            >
              +
            </motion.button>
          </div>
        </div>
        <span style={{ fontFamily: "'DM Sans'", fontSize: 12, color: DS.gold, fontWeight: 600 }}>
          {value} hr{value > 1 ? "s" : ""} · +${formatPrice(value * 35000)}
        </span>
      </div>
    </motion.div>
  );
}

function AddOnToggle({ addon, isSelected, onToggle, isIncluded, extraHours, onExtraHoursChange }) {
  const isExtraHours = addon.id === "extra-hours";

  return (
    <motion.button
      onClick={() => !isIncluded && onToggle(addon.id)}
      whileHover={!isIncluded ? { y: -2 } : {}}
      animate={{
        borderColor: isIncluded ? `${DS.gold}44` : isSelected ? DS.gold : "var(--mm-border)",
        background: isIncluded ? `${DS.gold}06` : isSelected ? `${DS.gold}0a` : "transparent",
      }}
      style={{
        display: "flex", flexDirection: "column", gap: 8, padding: "20px 16px",
        border: "1px solid", borderRadius: 8,
        cursor: isIncluded ? "default" : "pointer",
        textAlign: "left", position: "relative", width: "100%",
        opacity: isIncluded ? 0.55 : 1,
        transition: "opacity 0.3s",
      }}
    >
      {/* Included badge or toggle indicator */}
      {isIncluded ? (
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 400, damping: 20 }}
          style={{
            position: "absolute", top: 12, right: 12,
            background: DS.gold, borderRadius: 4, padding: "3px 10px",
            fontFamily: "'DM Sans'", fontSize: 10, fontWeight: 700,
            color: DS.bg, textTransform: "uppercase", letterSpacing: "0.08em",
          }}
        >
          Included
        </motion.div>
      ) : (
        <div style={{
          position: "absolute", top: 12, right: 12, width: 18, height: 18, borderRadius: 4,
          border: `2px solid ${isSelected ? DS.gold : DS.border}`,
          background: isSelected ? DS.gold : "transparent",
          display: "flex", alignItems: "center", justifyContent: "center",
          transition: "all 0.2s",
        }}>
          {isSelected && <span style={{ color: DS.bg, fontSize: 12, fontWeight: 700 }}>✓</span>}
        </div>
      )}

      <span style={{ fontSize: 20 }}>{addon.icon}</span>
      <span style={{ fontFamily: "'DM Sans'", fontSize: 14, fontWeight: 600, color: DS.text, paddingRight: 24 }}>
        {addon.name}
      </span>
      <span style={{ fontFamily: "'DM Sans'", fontSize: 12, color: DS.textSec, lineHeight: 1.5 }}>
        {addon.desc}
      </span>
      <span style={{ fontFamily: "'Bebas Neue'", fontSize: 22, color: DS.gold, marginTop: 4 }}>
        {isIncluded ? (
          <span style={{ textDecoration: "line-through", opacity: 0.5 }}>{addon.pricePrefix || ""}${addon.displayPrice}</span>
        ) : (
          <>{addon.pricePrefix || ""}${addon.displayPrice}</>
        )}
      </span>

      {/* Extra hours stepper */}
      <AnimatePresence>
        {isExtraHours && isSelected && (
          <HoursStepper value={extraHours} onChange={onExtraHoursChange} />
        )}
      </AnimatePresence>
    </motion.button>
  );
}

export default function PackageBuilder({ selectedPackage, selectedAddOns, onPackageSelect, onAddOnsChange, extraHours = 1, onExtraHoursChange }) {
  const includedAddOns = getIncludedAddOns(selectedPackage);

  const handlePackageSelect = (pkgId) => {
    onPackageSelect(pkgId);
  };

  const totalCents = (() => {
    const pkg = PACKAGES.find((p) => p.id === selectedPackage);
    if (!pkg) return 0;
    const addOnsTotal = selectedAddOns.reduce((sum, id) => {
      const addon = ADD_ONS.find((a) => a.id === id);
      if (!addon) return sum;
      if (id === "extra-hours") return sum + addon.priceInCents * extraHours;
      return sum + addon.priceInCents;
    }, 0);
    return pkg.priceInCents + addOnsTotal;
  })();

  const retainerCents = calculateRetainer(totalCents);
  const paymentPlan = isPaymentPlanEligible(totalCents);

  const toggleAddOn = (id) => {
    if (selectedAddOns.includes(id)) {
      onAddOnsChange(selectedAddOns.filter((a) => a !== id));
    } else {
      onAddOnsChange([...selectedAddOns, id]);
    }
  };

  return (
    <div>
      <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(28px, 4vw, 42px)", fontWeight: 400, marginBottom: 8 }}>
        Build your package
      </h2>
      <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 19, color: DS.textSec, marginBottom: 40, lineHeight: 1.6 }}>
        Choose your coverage level, then add any extras. Every package includes an engagement session, online gallery, and your choice of editing styles.
      </p>

      {/* Packages */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 20, marginBottom: 48 }}>
        {PACKAGES.map((pkg) => (
          <PackageCard key={pkg.id} pkg={pkg} isSelected={selectedPackage === pkg.id} onSelect={handlePackageSelect} />
        ))}
      </div>

      {/* Add-ons */}
      <div style={{ marginBottom: 40 }}>
        <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: 24, fontWeight: 400, marginBottom: 8 }}>
          Enhance your day
        </h3>
        <p style={{ fontFamily: "'DM Sans'", fontSize: 14, color: DS.textSec, marginBottom: 24 }}>
          Add any of these to your selected package
        </p>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))", gap: 16 }}>
          {ADD_ONS.map((addon) => (
            <AddOnToggle key={addon.id} addon={addon} isSelected={selectedAddOns.includes(addon.id)} onToggle={toggleAddOn} isIncluded={includedAddOns.includes(addon.id)} extraHours={extraHours} onExtraHoursChange={onExtraHoursChange} />
          ))}
        </div>
      </div>

      {/* Running total */}
      <AnimatePresence>
        {selectedPackage && (
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            style={{
              position: "sticky", bottom: 24, padding: "20px 28px",
              background: DS.surface, border: `1px solid ${DS.gold}33`,
              borderRadius: 12, backdropFilter: "blur(16px)",
              display: "flex", alignItems: "center", justifyContent: "space-between",
              flexWrap: "wrap", gap: 16,
              boxShadow: "0 -4px 24px rgba(0,0,0,0.2)",
            }}
          >
            <div>
              <div style={{ fontFamily: "'DM Sans'", fontSize: 12, color: DS.textSec, textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 4 }}>
                Estimated Total
              </div>
              <motion.div
                key={totalCents}
                initial={{ scale: 1.06 }}
                animate={{ scale: 1 }}
                style={{ fontFamily: "'Bebas Neue'", fontSize: 36, color: DS.gold }}
              >
                ${formatPrice(totalCents)}
              </motion.div>
            </div>
            <div style={{ textAlign: "right" }}>
              <div style={{ fontFamily: "'DM Sans'", fontSize: 13, color: DS.text }}>
                Retainer (30%): <span style={{ color: DS.gold, fontWeight: 600 }}>${formatPrice(retainerCents)}</span>
              </div>
              {paymentPlan && (
                <div style={{ fontFamily: "'DM Sans'", fontSize: 12, color: DS.textSec, marginTop: 4 }}>
                  ✦ Payment plan available
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
