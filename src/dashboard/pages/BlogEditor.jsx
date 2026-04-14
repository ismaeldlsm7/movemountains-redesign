import { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { posts } from "../../data/blogPosts";
import MockEditor from "../components/MockEditor";
import { useToast } from "../components/ToastProvider";
import { IconEye, IconCheck } from "../components/Icons";

export default function BlogEditor() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const { showToast } = useToast();
  const existing = slug ? posts.find((p) => p.slug === slug) : null;

  const [title, setTitle] = useState(existing?.title || "");
  const [category, setCategory] = useState(existing?.category || "Real Wedding");
  const [excerpt, setExcerpt] = useState(existing?.excerpt || "");
  const [tags, setTags] = useState(existing?.tags?.join(", ") || "");
  const [body, setBody] = useState(
    existing
      ? [existing.lede, ...existing.sections.map((s) => `${s.heading}\n\n${s.body}`)].join("\n\n")
      : ""
  );
  const [mode, setMode] = useState("edit");

  const slugified =
    (title || "untitled")
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "");

  const save = (publishState) => {
    showToast({
      title: publishState === "publish" ? "Post published" : "Draft saved",
      description:
        publishState === "publish"
          ? `"${title || "Untitled"}" is now live on the site.`
          : "Your changes are saved. (demo)",
    });
    if (publishState === "publish") {
      setTimeout(() => navigate("/dashboard/blog"), 600);
    }
  };

  return (
    <>
      <div className="mm-dash__page-header">
        <div>
          <h1 className="mm-dash__page-title">
            {existing ? "Edit post" : "New post"}
          </h1>
          <p className="mm-dash__page-subtitle">
            {existing ? `Editing "${existing.title}"` : "Draft a new editorial feature or real wedding story."}
          </p>
        </div>

        <div className="mm-dash__page-actions">
          <div className="mm-dash__tabs">
            <button
              type="button"
              className={"mm-dash__tab" + (mode === "edit" ? " mm-dash__tab--active" : "")}
              onClick={() => setMode("edit")}
            >
              Edit
            </button>
            <button
              type="button"
              className={"mm-dash__tab" + (mode === "preview" ? " mm-dash__tab--active" : "")}
              onClick={() => setMode("preview")}
            >
              <IconEye width={12} height={12} style={{ marginRight: 4, verticalAlign: "-1px" }} />
              Preview
            </button>
          </div>
          <button
            type="button"
            onClick={() => save("draft")}
            className="mm-dash__btn mm-dash__btn--secondary"
          >
            Save draft
          </button>
          <button
            type="button"
            onClick={() => save("publish")}
            className="mm-dash__btn mm-dash__btn--primary"
          >
            <IconCheck width={14} height={14} />
            Publish
          </button>
        </div>
      </div>

      <div className="mm-dash__preview-banner">
        <strong>Prototype mode</strong>
        <span>
          · Publishing in this build shows a confirmation toast only. The real Supabase sync lands in Phase 1 of development.
        </span>
      </div>

      {mode === "edit" ? (
        <div className="mm-dash__two-col" style={{ gridTemplateColumns: "minmax(0, 2.2fr) minmax(0, 1fr)" }}>
          <div className="mm-dash__card">
            <div className="mm-dash__form-row mm-dash__form-row--single">
              <div className="mm-dash__field">
                <label className="mm-dash__label">Title</label>
                <input
                  type="text"
                  className="mm-dash__input"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="A Gilded Age Love Story at Rosecliff..."
                  style={{ fontSize: 20, fontFamily: "'Playfair Display', serif", padding: "14px 16px" }}
                />
              </div>
            </div>

            <div className="mm-dash__form-row">
              <div className="mm-dash__field">
                <label className="mm-dash__label">Slug</label>
                <input className="mm-dash__input" value={slugified} readOnly />
              </div>
              <div className="mm-dash__field">
                <label className="mm-dash__label">Category</label>
                <select
                  className="mm-dash__select"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                >
                  <option>Real Wedding</option>
                  <option>Editorial</option>
                  <option>Planning Tips</option>
                  <option>Behind the Scenes</option>
                  <option>Venue Spotlight</option>
                </select>
              </div>
            </div>

            <div className="mm-dash__form-row mm-dash__form-row--single">
              <div className="mm-dash__field">
                <label className="mm-dash__label">Excerpt</label>
                <textarea
                  className="mm-dash__textarea"
                  style={{ minHeight: 70, fontFamily: "inherit", fontSize: 14 }}
                  value={excerpt}
                  onChange={(e) => setExcerpt(e.target.value)}
                  placeholder="One or two sentences that preview the post on the blog home..."
                />
              </div>
            </div>

            <div className="mm-dash__form-row mm-dash__form-row--single">
              <div className="mm-dash__field">
                <label className="mm-dash__label">Body</label>
                <MockEditor value={body} onChange={setBody} placeholder="Start telling the story..." />
              </div>
            </div>

            <div className="mm-dash__form-row mm-dash__form-row--single">
              <div className="mm-dash__field">
                <label className="mm-dash__label">Tags</label>
                <input
                  className="mm-dash__input"
                  value={tags}
                  onChange={(e) => setTags(e.target.value)}
                  placeholder="Newport, Rosecliff, Summer Wedding, Editorial"
                />
              </div>
            </div>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
            <div className="mm-dash__card">
              <h3 className="mm-dash__card-title">Cover image</h3>
              <p className="mm-dash__card-sub">Featured across the blog index</p>
              <div
                style={{
                  aspectRatio: "3/2",
                  background: existing?.color || "#22201a",
                  borderRadius: 6,
                  border: "1px solid var(--dash-border)",
                  marginBottom: 12,
                  position: "relative",
                  overflow: "hidden",
                }}
              >
                <div
                  style={{
                    position: "absolute",
                    inset: 0,
                    background: "linear-gradient(180deg, transparent, rgba(0,0,0,0.35))",
                  }}
                />
                <div
                  style={{
                    position: "absolute",
                    bottom: 12,
                    left: 14,
                    fontFamily: "'Cormorant Garamond', serif",
                    fontSize: 13,
                    color: "rgba(245,240,232,0.8)",
                    letterSpacing: "0.08em",
                    textTransform: "uppercase",
                  }}
                >
                  {existing?.category || category}
                </div>
              </div>
              <button type="button" className="mm-dash__btn mm-dash__btn--secondary" style={{ width: "100%" }}>
                Replace cover
              </button>
            </div>

            <div className="mm-dash__card">
              <h3 className="mm-dash__card-title">Author</h3>
              <p className="mm-dash__card-sub">Byline shown on the post</p>
              <select className="mm-dash__select" defaultValue={existing?.author?.name || "Tiahna Lynn"}>
                <option>Tiahna Lynn</option>
                <option>Marcus Chen</option>
                <option>Elena Rodriguez</option>
                <option>Daniel Park</option>
                <option>Sean Thomas</option>
              </select>
            </div>

            <div className="mm-dash__card">
              <h3 className="mm-dash__card-title">SEO</h3>
              <p className="mm-dash__card-sub">Optional overrides</p>
              <div className="mm-dash__field" style={{ marginBottom: 12 }}>
                <label className="mm-dash__label">Meta title</label>
                <input className="mm-dash__input" placeholder="Auto-generated from title" />
              </div>
              <div className="mm-dash__field">
                <label className="mm-dash__label">Meta description</label>
                <input className="mm-dash__input" placeholder="Auto-generated from excerpt" />
              </div>
            </div>
          </div>
        </div>
      ) : (
        <PreviewBlock title={title} category={category} excerpt={excerpt} body={body} />
      )}

      <div style={{ marginTop: 20 }}>
        <Link to="/dashboard/blog" className="mm-dash__btn mm-dash__btn--ghost">
          ← Back to all posts
        </Link>
      </div>
    </>
  );
}

function PreviewBlock({ title, category, excerpt, body }) {
  return (
    <div
      className="mm-dash__card"
      style={{
        padding: "56px 72px",
        maxWidth: 820,
        margin: "0 auto",
      }}
    >
      <div
        style={{
          fontFamily: "'Cormorant Garamond', serif",
          fontSize: 12,
          letterSpacing: "0.22em",
          textTransform: "uppercase",
          color: "var(--dash-gold)",
          marginBottom: 14,
        }}
      >
        {category || "Editorial"}
      </div>
      <h1
        style={{
          fontFamily: "'Playfair Display', serif",
          fontSize: 44,
          lineHeight: 1.15,
          margin: "0 0 20px",
          color: "var(--dash-text)",
        }}
      >
        {title || "Untitled draft"}
      </h1>
      <p
        style={{
          fontFamily: "'Cormorant Garamond', serif",
          fontSize: 22,
          lineHeight: 1.55,
          color: "var(--dash-text-sec)",
          fontStyle: "italic",
          marginBottom: 32,
        }}
      >
        {excerpt || "Your excerpt will appear here..."}
      </p>
      <div
        style={{
          fontFamily: "'Cormorant Garamond', serif",
          fontSize: 19,
          lineHeight: 1.75,
          color: "var(--dash-text)",
          whiteSpace: "pre-wrap",
        }}
      >
        {body || "Start writing the body of your post to see the preview..."}
      </div>
    </div>
  );
}
