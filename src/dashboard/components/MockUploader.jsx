import { useState } from "react";
import { IconUpload, IconCamera } from "./Icons";

// A visual drag-and-drop area that fakes an upload.
// Accepts up to N placeholder tiles, animates a progress bar, and fills thumbs
// with the color palette passed in (reusing colors from existing weddings).

export default function MockUploader({
  palette = ["#2a2218", "#1e1a14", "#221e1a", "#241e18", "#201e1a", "#1a1814"],
  onUploaded,
}) {
  const [dragging, setDragging] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [thumbs, setThumbs] = useState([]);

  const startUpload = () => {
    if (uploading) return;
    setUploading(true);
    setProgress(0);
    setThumbs([]);

    // Simulate a staged upload
    const totalTiles = 24;
    let current = 0;
    const tick = () => {
      current += 1;
      setProgress(Math.round((current / totalTiles) * 100));
      setThumbs((t) => [
        ...t,
        {
          id: current,
          color: palette[current % palette.length],
        },
      ]);
      if (current < totalTiles) {
        setTimeout(tick, 65);
      } else {
        setTimeout(() => {
          setUploading(false);
          onUploaded?.(totalTiles);
        }, 400);
      }
    };
    setTimeout(tick, 120);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setDragging(false);
    startUpload();
  };

  return (
    <div>
      <div
        className={"mm-dash__uploader" + (dragging ? " mm-dash__uploader--dragging" : "")}
        onClick={startUpload}
        onDragOver={(e) => {
          e.preventDefault();
          setDragging(true);
        }}
        onDragLeave={() => setDragging(false)}
        onDrop={handleDrop}
        role="button"
        tabIndex={0}
      >
        <IconUpload className="mm-dash__uploader-icon" width={44} height={44} />
        <p className="mm-dash__uploader-title">
          {uploading ? "Uploading gallery..." : "Drag & drop the gallery here"}
        </p>
        <p className="mm-dash__uploader-sub">
          {uploading
            ? `${progress}% complete · ${thumbs.length} of 24 images`
            : "or click to browse — .jpg, .raw, .dng up to 50MB each"}
        </p>

        {(uploading || thumbs.length > 0) && (
          <div className="mm-dash__uploader-progress">
            <div className="mm-dash__uploader-bar">
              <div
                className="mm-dash__uploader-bar-fill"
                style={{ width: `${progress}%` }}
              />
            </div>
            <div className="mm-dash__uploader-thumbs">
              {thumbs.map((t) => (
                <div
                  key={t.id}
                  className="mm-dash__uploader-thumb"
                  style={{ background: t.color }}
                />
              ))}
            </div>
          </div>
        )}
      </div>

      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 8,
          marginTop: 10,
          fontSize: 11,
          color: "var(--dash-text-sec)",
        }}
      >
        <IconCamera width={13} height={13} />
        <span>Originals are backed up to R2 storage · EXIF preserved · auto color-corrected</span>
      </div>
    </div>
  );
}
