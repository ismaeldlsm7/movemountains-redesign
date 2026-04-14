import { motion, AnimatePresence } from "framer-motion";
import { DS } from "../designSystem";

const steps = [
  { label: "Date", icon: "◇" },
  { label: "Package", icon: "◎" },
  { label: "Details", icon: "✦" },
  { label: "Contract", icon: "▣" },
  { label: "Vision", icon: "○" },
  { label: "Review", icon: "□" },
];

export default function BookingProgress({ currentStep, totalSteps = 6 }) {
  const progress = currentStep / totalSteps;
  const isComplete = currentStep >= totalSteps;

  return (
    <div style={{ width: "100%", padding: "0 0 40px" }}>
      {/* Step indicators */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16, position: "relative" }}>
        {steps.map((step, i) => {
          const stepNum = i + 1;
          const isActive = stepNum === currentStep;
          const isDone = stepNum < currentStep;

          return (
            <div key={step.label} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 8, flex: 1, position: "relative", zIndex: 2 }}>
              <motion.div
                animate={{
                  scale: isActive ? [1, 1.12, 1] : 1,
                  borderColor: isDone ? DS.gold : isActive ? DS.ember : "var(--mm-border)",
                  background: isDone ? DS.gold : "transparent",
                  color: isDone ? DS.bg : isActive ? DS.ember : "var(--mm-text-sec)",
                }}
                transition={{
                  scale: { duration: 0.5, ease: "easeOut" },
                  default: { duration: 0.4, ease: [0.25, 0.1, 0.25, 1] },
                }}
                style={{
                  width: 40, height: 40, borderRadius: "50%", border: "2px solid",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontFamily: "'DM Sans'", fontSize: 16, fontWeight: 600,
                }}
              >
                {isDone ? (
                  <motion.span initial={{ scale: 0, rotate: -90 }} animate={{ scale: 1, rotate: 0 }} transition={{ type: "spring", stiffness: 300, damping: 20 }}>
                    ✓
                  </motion.span>
                ) : (
                  step.icon
                )}
              </motion.div>
              <motion.span
                animate={{
                  color: isActive ? DS.text : isDone ? DS.gold : "var(--mm-text-sec)",
                  fontWeight: isActive ? 600 : 400,
                }}
                style={{ fontFamily: "'DM Sans'", fontSize: 11, textTransform: "uppercase", letterSpacing: "0.08em" }}
              >
                {step.label}
              </motion.span>
            </div>
          );
        })}
      </div>

      {/* Progress bar */}
      <div style={{ position: "relative", height: 4, background: "var(--mm-border)", borderRadius: 2, overflow: "hidden" }}>
        <motion.div
          animate={{ width: `${progress * 100}%` }}
          transition={{ type: "spring", stiffness: 80, damping: 18, mass: 0.8 }}
          style={{
            position: "absolute", top: 0, left: 0, height: "100%", borderRadius: 2,
            background: `linear-gradient(90deg, ${DS.gold}, ${DS.ember})`,
          }}
        />
        {/* Glow effect on fill edge */}
        <motion.div
          animate={{ left: `${progress * 100}%`, opacity: progress > 0 ? 1 : 0 }}
          transition={{ type: "spring", stiffness: 80, damping: 18, mass: 0.8 }}
          style={{
            position: "absolute", top: -4, width: 12, height: 12, borderRadius: "50%",
            background: DS.ember, filter: "blur(6px)", transform: "translateX(-50%)",
          }}
        />

        {/* Complete flash */}
        <AnimatePresence>
          {isComplete && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: [0, 0.8, 0] }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              style={{
                position: "absolute", inset: -4,
                background: `linear-gradient(90deg, transparent, ${DS.gold}, transparent)`,
                borderRadius: 4,
              }}
            />
          )}
        </AnimatePresence>
      </div>

      {/* Percentage label */}
      <motion.div
        animate={{ opacity: progress > 0 ? 0.5 : 0 }}
        style={{
          fontFamily: "'DM Sans'", fontSize: 11, color: DS.textSec,
          textAlign: "right", marginTop: 8, letterSpacing: "0.05em",
        }}
      >
        {Math.round(progress * 100)}% complete
      </motion.div>
    </div>
  );
}
