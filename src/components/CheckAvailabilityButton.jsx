import { Link } from "react-router-dom";
import { DS } from "./designSystem";

export default function CheckAvailabilityButton({
  to = "/contact",
  label = "Check Availability",
  fontSize = 14,
  padding = "16px 40px",
  letterSpacing = "0.1em",
  fontWeight = 600,
  style = {},
  onClick,
}) {
  return (
    <Link to={to} onClick={onClick} className="fill-up-btn cta-rollover" style={{
      fontFamily: "'DM Sans'", fontSize, fontWeight, color: DS.ember, background: "transparent",
      padding, textDecoration: "none", textTransform: "uppercase", letterSpacing, display: "inline-block",
      position: "relative", overflow: "hidden", isolation: "isolate", border: `1px solid ${DS.ember}`,
      ...style,
    }}>
      <span style={{ position: "relative", zIndex: 1, display: "inline-flex", lineHeight: 1.2 }}>
        {label.split("").map((ch, ci) => (
          <span key={ci} className="cta-char" style={{ position: "relative", display: "inline-block", overflow: "hidden", height: "1.2em", verticalAlign: "top" }}>
            <span className="cta-char-top" style={{ display: "block", transform: "translateY(0)", transition: `transform 0.45s cubic-bezier(0.65,0,0.35,1) ${ci * 0.025}s` }}>{ch === " " ? "\u00A0" : ch}</span>
            <span aria-hidden="true" className="cta-char-bot" style={{ position: "absolute", left: 0, top: 0, display: "block", transform: "translateY(120%)", transition: `transform 0.45s cubic-bezier(0.65,0,0.35,1) ${ci * 0.025}s` }}>{ch === " " ? "\u00A0" : ch}</span>
          </span>
        ))}
      </span>
    </Link>
  );
}
