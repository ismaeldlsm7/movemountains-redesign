import { useState } from "react";
import {
  IconBold,
  IconItalic,
  IconH1,
  IconH2,
  IconQuote,
  IconList,
  IconLink,
  IconImage,
  IconUndo,
} from "./Icons";

// A purely visual rich-text editor. The toolbar is non-functional — it's here
// to transmit the idea of a WYSIWYG CMS without pulling in Tiptap or ProseMirror.
// The editing surface is a plain textarea so typing works in the demo.

const tools = [
  { id: "bold", icon: IconBold, label: "Bold" },
  { id: "italic", icon: IconItalic, label: "Italic" },
  { id: "sep1", sep: true },
  { id: "h1", icon: IconH1, label: "Heading 1" },
  { id: "h2", icon: IconH2, label: "Heading 2" },
  { id: "quote", icon: IconQuote, label: "Quote" },
  { id: "list", icon: IconList, label: "List" },
  { id: "sep2", sep: true },
  { id: "link", icon: IconLink, label: "Link" },
  { id: "image", icon: IconImage, label: "Image" },
  { id: "sep3", sep: true },
  { id: "undo", icon: IconUndo, label: "Undo" },
];

export default function MockEditor({ value, onChange, placeholder }) {
  const [active, setActive] = useState(null);
  const wordCount = (value || "").trim().split(/\s+/).filter(Boolean).length;

  return (
    <div className="mm-dash__editor">
      <div className="mm-dash__editor-toolbar" role="toolbar" aria-label="Text formatting">
        {tools.map((tool) => {
          if (tool.sep) {
            return <div key={tool.id} className="mm-dash__editor-tool-sep" />;
          }
          const Icon = tool.icon;
          return (
            <button
              key={tool.id}
              type="button"
              title={tool.label}
              className={
                "mm-dash__editor-tool" +
                (active === tool.id ? " mm-dash__editor-tool--active" : "")
              }
              onClick={() => setActive(active === tool.id ? null : tool.id)}
              onMouseDown={(e) => e.preventDefault()}
            >
              <Icon width={15} height={15} />
            </button>
          );
        })}
      </div>

      <textarea
        className="mm-dash__editor-body"
        value={value}
        onChange={(e) => onChange?.(e.target.value)}
        placeholder={placeholder || "Start writing..."}
        rows={12}
      />

      <div className="mm-dash__editor-footer">
        <span>{wordCount} words</span>
        <span>Autosaved just now (demo)</span>
      </div>
    </div>
  );
}
