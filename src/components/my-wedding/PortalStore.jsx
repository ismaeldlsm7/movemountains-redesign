import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { DS } from "../designSystem";

/* ── Product catalog ────────────────────────────────────────────── */
const PRODUCTS = [
  // VIDEO
  { id: "doc-cut", name: "Doc Cut", category: "video", priceCents: 250000, displayPrice: "2,500", icon: "▶", description: "A cinematic documentary film of your wedding day — 10 to 20 minutes of chronological storytelling with music, natural audio, and your vows.", options: [{ id: "length", label: "Length", choices: ["10 min", "15 min", "20 min"] }] },
  { id: "ceremony-film", name: "Ceremony Film", category: "video", priceCents: 80000, displayPrice: "800", icon: "◎", description: "Your full ceremony, uncut — processional, vows, rings, and recessional. Every word, every tear." },
  { id: "speech-films", name: "Speech Films", category: "video", priceCents: 80000, displayPrice: "800", icon: "◈", description: "Individually edited clips of each speech. Includes up to 3 speeches — additional speeches at $200 each.", hasQty: true, qtyMin: 1, qtyMax: 10, qtyLabel: "speeches", qtyIncluded: 3, extraPriceCents: 20000 },
  { id: "dance-films", name: "Dance Films", category: "video", priceCents: 80000, displayPrice: "800", icon: "◇", description: "Individually edited clips of your first dance and parent dances. Each dance is its own keepsake.", options: [{ id: "count", label: "Number of dances", choices: ["3", "4", "5", "6", "7", "8", "9", "10"] }] },
  { id: "super8", name: "Super 8 Film", category: "video", priceCents: 250000, displayPrice: "2,500", icon: "◉", description: "Shot on real analog Super 8mm film. Lab-processed, digitally scanned. A 3–4 minute nostalgic highlight reel unlike anything digital." },
  { id: "raw-timeline", name: "Raw Timeline", category: "video", priceCents: 50000, displayPrice: "500", icon: "□", description: "A chronological compilation of your raw, unedited footage. No music, no cuts — the day exactly as it happened.", requiresLegal: true },
  { id: "social-teaser", name: "Social Media Teaser", category: "video", priceCents: 60000, displayPrice: "600", icon: "✦", description: "A 30–60 second highlight reel optimized for Instagram, TikTok, and social sharing. Vertical 9:16 format." },
  { id: "social-pack", name: "Social Content Pack", category: "video", priceCents: 50000, displayPrice: "500", icon: "△", description: "A set of short-form vertical reels from your wedding day — perfect for sharing your favorite moments.", options: [{ id: "count", label: "Number of reels", choices: ["5", "6", "7", "8", "9", "10"] }] },
  // PHOTO
  { id: "raw-photos", name: "Raw Photos", category: "photo", priceCents: 80000, displayPrice: "800", icon: "◻", description: "Every unedited RAW file from your wedding day — no color corrections or retouching. Full creative control.", requiresLegal: true },
  // PHYSICAL
  { id: "ssd-drive", name: "SSD Drive", category: "physical", priceCents: 59900, displayPrice: "599", icon: "▣", description: "Branded SSD drive loaded with all your photos and/or films. Fast, portable, and permanent.", hasQty: true, qtyMin: 1, qtyMax: 10, qtyLabel: "drives", options: [{ id: "format", label: "Format", choices: ["Mac", "PC"] }] },
  { id: "usb-drive", name: "USB Drive (Photos)", category: "physical", priceCents: 20000, displayPrice: "200", icon: "◳", description: "USB drive loaded with your full edited photo gallery. Great for sharing with family.", hasQty: true, qtyMin: 1, qtyMax: 10, qtyLabel: "drives", options: [{ id: "format", label: "Format", choices: ["Mac", "PC"] }] },
  { id: "video-album", name: "Video Album", category: "physical", priceCents: 50000, displayPrice: "500", icon: "◑", description: "A premium display book with a built-in screen for audio and video playback. A centerpiece for your home." },
  // MERCH
  { id: "mmc-sweater", name: "MMC Sweater", category: "merch", priceCents: 10000, displayPrice: "100", icon: "◐", description: "Embossed MMC logo on a premium cotton blend. Worn by the team — now available for our couples.", options: [{ id: "color", label: "Color", choices: ["White", "Black"] }, { id: "size", label: "Size", choices: ["M", "L", "XL"] }] },
];

const CATEGORIES = [
  { id: "all", label: "All" },
  { id: "video", label: "Video" },
  { id: "photo", label: "Photo" },
  { id: "physical", label: "Physical" },
  { id: "merch", label: "Merch" },
];

const LEGAL_CLAUSES = [
  { id: "raw-unedited", label: "I understand that raw/unedited files are delivered as-is — without color correction, cropping, or retouching." },
  { id: "imperfections", label: "I acknowledge that raw files may contain blurry, overexposed, or otherwise imperfect images that would not be in the final gallery." },
  { id: "confidentiality", label: "I agree not to share unedited files publicly or on social media without Move Mountains Co.'s written consent." },
  { id: "final-sale", label: "I understand that all raw file purchases are final and non-refundable." },
];

function formatCents(cents) {
  return "$" + (cents / 100).toLocaleString("en-US");
}

/* ── Product card ───────────────────────────────────────────────── */
function ProductCard({ product, onAddToCart }) {
  const [options, setOptions] = useState(() =>
    Object.fromEntries((product.options || []).map((o) => [o.id, o.choices[0]]))
  );
  const [qty, setQty] = useState(product.qtyMin || 1);
  const [added, setAdded] = useState(false);

  const totalPrice = (() => {
    let total = product.priceCents;
    if (product.hasQty && product.qtyIncluded && qty > product.qtyIncluded) {
      total += (qty - product.qtyIncluded) * product.extraPriceCents;
    }
    if (product.hasQty && !product.qtyIncluded) {
      total = product.priceCents * qty;
    }
    return total;
  })();

  const handleAdd = () => {
    onAddToCart({ product, qty, options, totalPrice });
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  return (
    <motion.div
      whileHover={{ y: -2 }}
      style={{
        padding: "20px", background: DS.surface, border: `1px solid ${DS.border}`,
        borderRadius: 10, display: "flex", flexDirection: "column", gap: 10,
      }}
    >
      {/* Header */}
      <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: 8 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <span style={{ fontSize: 18, flexShrink: 0 }}>{product.icon}</span>
          <div>
            <div style={{ fontFamily: "'DM Sans'", fontSize: 13, fontWeight: 700, color: DS.text, lineHeight: 1.3 }}>
              {product.name}
            </div>
            {product.requiresLegal && (
              <div style={{ fontSize: 10, color: "#f0a500", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.08em", marginTop: 2 }}>
                Requires agreement
              </div>
            )}
          </div>
        </div>
        <div style={{ fontFamily: "'Bebas Neue'", fontSize: 22, color: DS.gold, whiteSpace: "nowrap", lineHeight: 1 }}>
          ${product.displayPrice}
        </div>
      </div>

      <p style={{ fontFamily: "'DM Sans'", fontSize: 11, color: DS.textSec, lineHeight: 1.6, margin: 0 }}>
        {product.description}
      </p>

      {/* Options */}
      {(product.options || []).map((opt) => (
        <div key={opt.id}>
          <div style={{ fontFamily: "'DM Sans'", fontSize: 10, fontWeight: 600, color: DS.textSec, textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 5 }}>
            {opt.label}
          </div>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 5 }}>
            {opt.choices.map((c) => (
              <button
                key={c}
                onClick={() => setOptions((p) => ({ ...p, [opt.id]: c }))}
                style={{
                  padding: "4px 10px", borderRadius: 4, border: "1px solid",
                  borderColor: options[opt.id] === c ? DS.gold : DS.border,
                  background: options[opt.id] === c ? `${DS.gold}15` : "transparent",
                  color: options[opt.id] === c ? DS.gold : DS.textSec,
                  fontFamily: "'DM Sans'", fontSize: 11, cursor: "pointer",
                }}
              >
                {c}
              </button>
            ))}
          </div>
        </div>
      ))}

      {/* Quantity stepper */}
      {product.hasQty && (
        <div>
          <div style={{ fontFamily: "'DM Sans'", fontSize: 10, fontWeight: 600, color: DS.textSec, textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 5 }}>
            {product.qtyLabel ? `How many ${product.qtyLabel}?` : "Quantity"}
            {product.qtyIncluded && <span style={{ color: DS.gold }}> · {product.qtyIncluded} included in base price</span>}
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 0 }}>
            <button onClick={() => setQty((q) => Math.max(product.qtyMin || 1, q - 1))} disabled={qty <= (product.qtyMin || 1)}
              style={{ width: 30, height: 30, borderRadius: "6px 0 0 6px", border: `1px solid ${DS.border}`, borderRight: "none", background: "transparent", color: DS.text, cursor: "pointer", fontSize: 16 }}>−</button>
            <div style={{ width: 40, height: 30, display: "flex", alignItems: "center", justifyContent: "center", border: `1px solid ${DS.border}`, background: DS.bg, fontFamily: "'DM Sans'", fontSize: 13, fontWeight: 700, color: DS.gold }}>{qty}</div>
            <button onClick={() => setQty((q) => Math.min(product.qtyMax || 10, q + 1))} disabled={qty >= (product.qtyMax || 10)}
              style={{ width: 30, height: 30, borderRadius: "0 6px 6px 0", border: `1px solid ${DS.border}`, borderLeft: "none", background: "transparent", color: DS.text, cursor: "pointer", fontSize: 16 }}>+</button>
            {totalPrice !== product.priceCents && (
              <span style={{ marginLeft: 10, fontFamily: "'Bebas Neue'", fontSize: 16, color: DS.gold }}>= {formatCents(totalPrice)}</span>
            )}
          </div>
        </div>
      )}

      {/* Add to cart */}
      <motion.button
        onClick={handleAdd}
        whileTap={{ scale: 0.97 }}
        style={{
          marginTop: 4, padding: "10px", borderRadius: 6, border: "none",
          background: added ? "#6ab187" : `linear-gradient(135deg, ${DS.gold}, ${DS.ember})`,
          color: "#fff", fontFamily: "'DM Sans'", fontSize: 12, fontWeight: 700,
          cursor: "pointer", textTransform: "uppercase", letterSpacing: "0.06em",
          transition: "background 0.3s",
        }}
      >
        {added ? "✓ Added to order" : "Add to order"}
      </motion.button>
    </motion.div>
  );
}

/* ── Cart panel ─────────────────────────────────────────────────── */
function CartPanel({ items, onRemove, onClose, onSubmit }) {
  const [legal, setLegal] = useState({});
  const [notes, setNotes] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const hasRaw = items.some((i) => i.product.requiresLegal);
  const totalCents = items.reduce((s, i) => s + i.totalPrice, 0);
  const allLegalAccepted = !hasRaw || LEGAL_CLAUSES.every((c) => legal[c.id]);

  const handleSubmit = () => {
    setSubmitted(true);
    onSubmit?.();
  };

  if (submitted) {
    return (
      <div style={{ padding: "32px 24px", textAlign: "center" }}>
        <div style={{ fontSize: 40, marginBottom: 16 }}>✓</div>
        <div style={{ fontFamily: "'Playfair Display', serif", fontSize: 22, color: DS.text, marginBottom: 8 }}>Order received</div>
        <p style={{ fontFamily: "'DM Sans'", fontSize: 13, color: DS.textSec, lineHeight: 1.6 }}>
          The MMC team will reach out within 48 hours to confirm your order and send an invoice.
        </p>
      </div>
    );
  }

  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100%" }}>
      <div style={{ padding: "20px 20px 0", display: "flex", justifyContent: "space-between", alignItems: "center", flexShrink: 0 }}>
        <div style={{ fontFamily: "'DM Sans'", fontSize: 12, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.1em", color: DS.gold }}>
          Your order ({items.length})
        </div>
        <button onClick={onClose} style={{ background: "none", border: "none", color: DS.textSec, fontSize: 18, cursor: "pointer" }}>×</button>
      </div>

      {/* Items */}
      <div style={{ flex: 1, overflowY: "auto", padding: "16px 20px" }}>
        {items.length === 0 ? (
          <p style={{ fontFamily: "'DM Sans'", fontSize: 13, color: DS.textSec, textAlign: "center", marginTop: 24 }}>
            No items yet — browse the catalog.
          </p>
        ) : (
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {items.map((item, idx) => (
              <div key={idx} style={{ padding: "12px", borderRadius: 8, background: `${DS.gold}06`, border: `1px solid ${DS.gold}20` }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 6 }}>
                  <div style={{ fontFamily: "'DM Sans'", fontSize: 12, fontWeight: 700, color: DS.text, paddingRight: 8 }}>{item.product.name}</div>
                  <div style={{ fontFamily: "'Bebas Neue'", fontSize: 17, color: DS.gold, whiteSpace: "nowrap" }}>{formatCents(item.totalPrice)}</div>
                </div>
                {Object.entries(item.options || {}).map(([k, v]) => (
                  <div key={k} style={{ fontFamily: "'DM Sans'", fontSize: 10, color: DS.textSec }}>{k}: {v}</div>
                ))}
                {item.qty > 1 && <div style={{ fontFamily: "'DM Sans'", fontSize: 10, color: DS.textSec }}>Qty: {item.qty}</div>}
                <button onClick={() => onRemove(idx)} style={{ marginTop: 6, background: "none", border: "none", color: DS.textSec, fontFamily: "'DM Sans'", fontSize: 10, cursor: "pointer", textDecoration: "underline" }}>
                  Remove
                </button>
              </div>
            ))}
          </div>
        )}

        {/* Legal for raw files */}
        {hasRaw && (
          <div style={{ marginTop: 16, padding: "14px", borderRadius: 8, background: "#f0a50008", border: "1px solid #f0a50030" }}>
            <div style={{ fontFamily: "'DM Sans'", fontSize: 10, fontWeight: 700, color: "#f0a500", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 10 }}>
              ⚠ Required agreements
            </div>
            {LEGAL_CLAUSES.map((c) => (
              <label key={c.id} style={{ display: "flex", alignItems: "flex-start", gap: 8, marginBottom: 8, cursor: "pointer" }}>
                <div onClick={() => setLegal((p) => ({ ...p, [c.id]: !p[c.id] }))}
                  style={{ width: 14, height: 14, borderRadius: 3, border: `2px solid ${legal[c.id] ? DS.gold : DS.border}`, background: legal[c.id] ? DS.gold : "transparent", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, marginTop: 1, cursor: "pointer" }}>
                  {legal[c.id] && <span style={{ color: DS.bg, fontSize: 9, fontWeight: 700 }}>✓</span>}
                </div>
                <span style={{ fontFamily: "'DM Sans'", fontSize: 10, color: DS.textSec, lineHeight: 1.5 }}>{c.label}</span>
              </label>
            ))}
          </div>
        )}

        {/* Notes */}
        <div style={{ marginTop: 14 }}>
          <div style={{ fontFamily: "'DM Sans'", fontSize: 10, fontWeight: 600, color: DS.textSec, textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 6 }}>
            Notes / preferences
          </div>
          <textarea
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            placeholder="Any specific requests, social moments to include, delivery preferences…"
            rows={3}
            style={{ width: "100%", padding: "10px", background: DS.bg, border: `1px solid ${DS.border}`, borderRadius: 6, color: DS.text, fontFamily: "'DM Sans'", fontSize: 11, resize: "vertical", outline: "none", lineHeight: 1.6 }}
          />
        </div>
      </div>

      {/* Footer */}
      {items.length > 0 && (
        <div style={{ padding: "16px 20px", borderTop: `1px solid ${DS.border}`, flexShrink: 0 }}>
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 14 }}>
            <span style={{ fontFamily: "'DM Sans'", fontSize: 12, color: DS.textSec }}>Order total</span>
            <span style={{ fontFamily: "'Bebas Neue'", fontSize: 24, color: DS.gold }}>{formatCents(totalCents)}</span>
          </div>
          <motion.button
            onClick={handleSubmit}
            disabled={!allLegalAccepted}
            whileHover={allLegalAccepted ? { scale: 1.02 } : {}}
            whileTap={allLegalAccepted ? { scale: 0.98 } : {}}
            style={{
              width: "100%", padding: "13px", borderRadius: 8, border: "none",
              background: allLegalAccepted ? `linear-gradient(135deg, ${DS.gold}, ${DS.ember})` : DS.surface,
              color: allLegalAccepted ? "#fff" : DS.textSec,
              fontFamily: "'DM Sans'", fontSize: 13, fontWeight: 700, cursor: allLegalAccepted ? "pointer" : "not-allowed",
              textTransform: "uppercase", letterSpacing: "0.06em",
            }}
          >
            {allLegalAccepted ? "Submit order request" : hasRaw ? "Accept agreements to continue" : "Submit order request"}
          </motion.button>
          <p style={{ fontFamily: "'DM Sans'", fontSize: 10, color: DS.textSec, textAlign: "center", marginTop: 8, lineHeight: 1.5 }}>
            This sends a request to the MMC team. An invoice will follow within 48 hours.
          </p>
        </div>
      )}
    </div>
  );
}

/* ── Main store ─────────────────────────────────────────────────── */
export default function PortalStore() {
  const [activeCategory, setActiveCategory] = useState("all");
  const [cartItems, setCartItems] = useState([]);
  const [cartOpen, setCartOpen] = useState(false);

  const filtered = activeCategory === "all" ? PRODUCTS : PRODUCTS.filter((p) => p.category === activeCategory);

  const addToCart = (item) => {
    setCartItems((prev) => [...prev, item]);
    setCartOpen(true);
  };
  const removeFromCart = (idx) => setCartItems((prev) => prev.filter((_, i) => i !== idx));
  const cartTotal = cartItems.reduce((s, i) => s + i.totalPrice, 0);

  return (
    <div style={{ display: "flex", gap: 20, alignItems: "flex-start", position: "relative" }}>
      {/* Left: product area */}
      <div style={{ flex: 1, minWidth: 0 }}>
        {/* Header */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 20, flexWrap: "wrap", gap: 12 }}>
          <div>
            <div style={{ fontFamily: "'Playfair Display', serif", fontSize: 26, fontWeight: 400, color: DS.text, marginBottom: 4 }}>
              Post-Wedding Shop
            </div>
            <p style={{ fontFamily: "'DM Sans'", fontSize: 13, color: DS.textSec }}>
              Expand your collection — films, raw files, physical media, and more.
            </p>
          </div>
          {cartItems.length > 0 && (
            <motion.button
              onClick={() => setCartOpen(true)}
              whileHover={{ scale: 1.03 }}
              style={{
                display: "flex", alignItems: "center", gap: 8, padding: "10px 18px",
                borderRadius: 8, border: `1px solid ${DS.gold}`,
                background: `${DS.gold}10`, color: DS.gold,
                fontFamily: "'DM Sans'", fontSize: 13, fontWeight: 700, cursor: "pointer",
              }}
            >
              <span>Order</span>
              <span style={{ background: DS.gold, color: DS.bg, borderRadius: "50%", width: 20, height: 20, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 11, fontWeight: 700 }}>
                {cartItems.length}
              </span>
              <span style={{ fontFamily: "'Bebas Neue'", fontSize: 18 }}>{formatCents(cartTotal)}</span>
            </motion.button>
          )}
        </div>

        {/* Category filter */}
        <div style={{ display: "flex", gap: 6, marginBottom: 20, flexWrap: "wrap" }}>
          {CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              style={{
                padding: "6px 16px", borderRadius: 20, border: "1px solid",
                borderColor: activeCategory === cat.id ? DS.gold : DS.border,
                background: activeCategory === cat.id ? DS.gold : "transparent",
                color: activeCategory === cat.id ? DS.bg : DS.textSec,
                fontFamily: "'DM Sans'", fontSize: 12, fontWeight: 500, cursor: "pointer",
                textTransform: "capitalize", transition: "all 0.15s",
              }}
            >
              {cat.label}
              <span style={{ marginLeft: 5, fontSize: 10, opacity: 0.7 }}>
                ({cat.id === "all" ? PRODUCTS.length : PRODUCTS.filter((p) => p.category === cat.id).length})
              </span>
            </button>
          ))}
        </div>

        {/* Product grid */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))", gap: 14 }}>
          {filtered.map((product) => (
            <ProductCard key={product.id} product={product} onAddToCart={addToCart} />
          ))}
        </div>
      </div>

      {/* Right: Cart drawer */}
      <AnimatePresence>
        {cartOpen && (
          <motion.div
            initial={{ x: 40, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: 40, opacity: 0 }}
            transition={{ duration: 0.25, ease: [0.25, 0.1, 0.25, 1] }}
            style={{
              width: 300, flexShrink: 0, position: "sticky", top: 20,
              background: DS.surface, border: `1px solid ${DS.gold}30`,
              borderRadius: 12, maxHeight: "80vh", display: "flex", flexDirection: "column",
              overflow: "hidden",
            }}
          >
            <CartPanel
              items={cartItems}
              onRemove={removeFromCart}
              onClose={() => setCartOpen(false)}
              onSubmit={() => {}}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
