import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { DS } from "./designSystem";

export default function UserIcon({ isAuthenticated = false }) {
  return (
    <Link to={isAuthenticated ? "/my-wedding" : "/my-wedding"} aria-label="Wedding Portal" style={{ textDecoration: "none" }}>
      <motion.div
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        style={{
          position: "relative", width: 32, height: 32, borderRadius: "50%",
          border: `1.5px solid ${DS.textSec}`, display: "flex", alignItems: "center",
          justifyContent: "center", cursor: "pointer", transition: "border-color 0.2s",
        }}
      >
        {/* User silhouette SVG */}
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={DS.textSec} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
          style={{ transition: "stroke 0.2s" }}>
          <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
          <circle cx="12" cy="7" r="4" />
        </svg>

        {/* Gold dot when authenticated */}
        {isAuthenticated && (
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 400, damping: 15 }}
            style={{
              position: "absolute", top: -1, right: -1, width: 8, height: 8,
              borderRadius: "50%", background: DS.gold,
              border: `2px solid ${DS.bg}`,
            }}
          />
        )}
      </motion.div>
    </Link>
  );
}
