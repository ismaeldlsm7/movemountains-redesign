import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { DS } from "../designSystem";

const CATEGORIES = [
  { id: "surprise", label: "Surprise", icon: "🎁" },
  { id: "moment", label: "Special moment", icon: "✨" },
  { id: "photo", label: "Photo/video request", icon: "📷" },
  { id: "general", label: "General", icon: "📝" },
];

const INITIAL_NOTES = {
  partner_1: [
    {
      id: "n1",
      category: "surprise",
      content: "I ordered James a custom photo book of our relationship as a surprise — please don't mention it in any of the videos! I want to give it to him on our 1-year anniversary.",
      createdAt: "March 2, 2026",
      readByTeam: true,
    },
    {
      id: "n2",
      category: "photo",
      content: "I really want a photo of his face when he sees me for the first time at the first look. Candid — please don't tell him the camera is on him yet.",
      createdAt: "March 15, 2026",
      readByTeam: true,
    },
  ],
  partner_2: [
    {
      id: "n3",
      category: "surprise",
      content: "I'm going to surprise Emma with her late grandmother's ring — I had it converted into a bracelet as a wedding gift. Please have a camera close during the gift exchange (~2pm getting ready).",
      createdAt: "February 20, 2026",
      readByTeam: true,
    },
    {
      id: "n4",
      category: "moment",
      content: "Emma's dad has been battling health issues and this means everything to him. Please make sure we get a genuine moment of me hugging him after the ceremony. Don't stage it — just be nearby.",
      createdAt: "April 1, 2026",
      readByTeam: false,
    },
  ],
};

export default function PrivateNotes({ auth }) {
  const [notes, setNotes] = useState(INITIAL_NOTES);
  const [composing, setComposing] = useState(false);
  const [newNote, setNewNote] = useState({ content: "", category: "general" });

  const myNotes = notes[auth.partner] || [];

  const addNote = () => {
    if (!newNote.content.trim()) return;
    const note = {
      id: `n${Date.now()}`,
      category: newNote.category,
      content: newNote.content.trim(),
      createdAt: "April 13, 2026",
      readByTeam: false,
    };
    setNotes((prev) => ({
      ...prev,
      [auth.partner]: [...(prev[auth.partner] || []), note],
    }));
    setNewNote({ content: "", category: "general" });
    setComposing(false);
  };

  const getCategoryInfo = (id) => CATEGORIES.find((c) => c.id === id) || CATEGORIES[3];

  return (
    <div style={{
      padding: "28px 24px", background: DS.surface, border: `1px solid ${DS.gold}22`,
      borderRadius: 12, marginTop: 8,
    }}>
      {/* Header */}
      <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: 8 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <span style={{ fontSize: 18 }}>🔒</span>
          <div>
            <div style={{ fontFamily: "'DM Sans'", fontSize: 14, fontWeight: 700, color: DS.text }}>
              Your Private Notes
            </div>
            <div style={{ fontFamily: "'DM Sans'", fontSize: 12, color: DS.textSec, marginTop: 2 }}>
              Only visible to you and the MMC team — {auth.partner === "partner_1" ? "James" : "Emma"} cannot see these
            </div>
          </div>
        </div>
        <motion.button
          onClick={() => setComposing(!composing)}
          whileHover={{ scale: 1.03 }}
          style={{
            padding: "7px 14px", borderRadius: 6, border: `1px solid ${DS.gold}44`,
            background: `${DS.gold}10`, color: DS.gold,
            fontFamily: "'DM Sans'", fontSize: 12, fontWeight: 600, cursor: "pointer",
          }}
        >
          + Add note
        </motion.button>
      </div>

      <div style={{ height: 1, background: `${DS.gold}20`, marginBottom: 20 }} />

      {/* Compose */}
      <AnimatePresence>
        {composing && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            style={{ overflow: "hidden", marginBottom: 16 }}
          >
            <div style={{ padding: "16px", background: `${DS.gold}06`, borderRadius: 8, border: `1px solid ${DS.gold}20` }}>
              {/* Category */}
              <div style={{ display: "flex", gap: 8, marginBottom: 12, flexWrap: "wrap" }}>
                {CATEGORIES.map((c) => (
                  <button
                    key={c.id}
                    onClick={() => setNewNote((p) => ({ ...p, category: c.id }))}
                    style={{
                      padding: "5px 12px", borderRadius: 20, border: "1px solid",
                      borderColor: newNote.category === c.id ? DS.gold : DS.border,
                      background: newNote.category === c.id ? `${DS.gold}15` : "transparent",
                      color: newNote.category === c.id ? DS.gold : DS.textSec,
                      fontFamily: "'DM Sans'", fontSize: 11, cursor: "pointer",
                    }}
                  >
                    {c.icon} {c.label}
                  </button>
                ))}
              </div>
              <textarea
                value={newNote.content}
                onChange={(e) => setNewNote((p) => ({ ...p, content: e.target.value }))}
                placeholder="What do you want the team to know? Be as specific as possible — the more detail, the better we can capture it."
                rows={4}
                style={{
                  width: "100%", padding: "12px", background: DS.bg,
                  border: `1px solid ${DS.border}`, borderRadius: 6,
                  color: DS.text, fontFamily: "'DM Sans'", fontSize: 13,
                  resize: "vertical", outline: "none", lineHeight: 1.6,
                }}
              />
              <div style={{ display: "flex", gap: 8, marginTop: 10, justifyContent: "flex-end" }}>
                <button onClick={() => setComposing(false)} style={{ padding: "8px 16px", borderRadius: 6, border: `1px solid ${DS.border}`, background: "none", color: DS.textSec, fontFamily: "'DM Sans'", fontSize: 12, cursor: "pointer" }}>
                  Cancel
                </button>
                <motion.button onClick={addNote} whileHover={{ scale: 1.02 }} disabled={!newNote.content.trim()} style={{ padding: "8px 16px", borderRadius: 6, border: "none", background: DS.gold, color: DS.bg, fontFamily: "'DM Sans'", fontSize: 12, fontWeight: 700, cursor: "pointer" }}>
                  Save note
                </motion.button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Notes list */}
      {myNotes.length === 0 ? (
        <div style={{ textAlign: "center", padding: "24px 0", color: DS.textSec, fontFamily: "'Cormorant Garamond', serif", fontSize: 17, fontStyle: "italic" }}>
          No notes yet — add anything you'd like the team to know.
        </div>
      ) : (
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          {myNotes.map((note) => {
            const cat = getCategoryInfo(note.category);
            return (
              <motion.div
                key={note.id}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                style={{
                  padding: "14px 16px", borderRadius: 8,
                  background: `${DS.gold}05`, border: `1px solid ${DS.gold}15`,
                }}
              >
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
                  <span style={{
                    fontSize: 11, padding: "2px 8px", borderRadius: 20, fontFamily: "'DM Sans'", fontWeight: 600,
                    background: `${DS.gold}15`, color: DS.gold,
                  }}>
                    {cat.icon} {cat.label}
                  </span>
                  <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                    <span style={{ fontSize: 10, color: DS.textSec, fontFamily: "'DM Sans'" }}>{note.createdAt}</span>
                    {note.readByTeam ? (
                      <span style={{ fontSize: 10, color: "#6ab187", fontWeight: 600, fontFamily: "'DM Sans'" }}>✓ Seen by team</span>
                    ) : (
                      <span style={{ fontSize: 10, color: "#f0a500", fontWeight: 600, fontFamily: "'DM Sans'" }}>● New</span>
                    )}
                  </div>
                </div>
                <p style={{ fontFamily: "'DM Sans'", fontSize: 13, color: DS.text, lineHeight: 1.7 }}>
                  {note.content}
                </p>
              </motion.div>
            );
          })}
        </div>
      )}

      <div style={{ marginTop: 16, padding: "10px 14px", borderRadius: 6, background: `${DS.border}40`, fontFamily: "'DM Sans'", fontSize: 11, color: DS.textSec, lineHeight: 1.5 }}>
        🔒 These notes are private. Your partner ({auth.partner === "partner_1" ? "James" : "Emma"}) will never see them — only you and the MMC team.
      </div>
    </div>
  );
}
