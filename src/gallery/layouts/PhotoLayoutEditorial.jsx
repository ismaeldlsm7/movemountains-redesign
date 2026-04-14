// Photo layout: Editorial — magazine hero/2-col/3-col rows.
import { FadeIn } from "../GalleryShared";
import PhotoCard from "../PhotoCard";

// Chunk photos into groups of 6: [0] hero, [1,2] 2-col, [3,4,5] 3-col
function chunkSix(arr) {
  const chunks = [];
  for (let i = 0; i < arr.length; i += 6) chunks.push(arr.slice(i, i + 6));
  return chunks;
}

export default function PhotoLayoutEditorial({ photos, favorites, onPhotoClick, onFavorite }) {
  const groups = chunkSix(photos);
  let globalIndex = 0;

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 4, padding: "4px clamp(4px, 1vw, 8px) 0" }}>
      {groups.map((group, gi) => {
        const hero = group[0];
        const twoCol = group.slice(1, 3);
        const threeCol = group.slice(3, 6);
        const heroIdx = globalIndex;
        const twoColIdxs = [globalIndex + 1, globalIndex + 2];
        const threeColIdxs = [globalIndex + 3, globalIndex + 4, globalIndex + 5];
        globalIndex += group.length;

        return (
          <div key={gi} style={{ display: "flex", flexDirection: "column", gap: 4 }}>
            {/* Full-width hero */}
            {hero && (
              <FadeIn delay={0}>
                <div style={{ width: "100%" }}>
                  <PhotoCard
                    photo={hero}
                    favorites={favorites}
                    onClick={() => onPhotoClick(heroIdx)}
                    onFavorite={onFavorite}
                    forcedAspect="16/7"
                  />
                </div>
              </FadeIn>
            )}
            {/* 2-col row */}
            {twoCol.length > 0 && (
              <FadeIn delay={0.05}>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 4 }}>
                  {twoCol.map((photo, j) => (
                    <PhotoCard
                      key={photo.id}
                      photo={photo}
                      favorites={favorites}
                      onClick={() => onPhotoClick(twoColIdxs[j])}
                      onFavorite={onFavorite}
                      forcedAspect="3/4"
                    />
                  ))}
                </div>
              </FadeIn>
            )}
            {/* 3-col row */}
            {threeCol.length > 0 && (
              <FadeIn delay={0.1}>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 4 }}>
                  {threeCol.map((photo, j) => (
                    <PhotoCard
                      key={photo.id}
                      photo={photo}
                      favorites={favorites}
                      onClick={() => onPhotoClick(threeColIdxs[j])}
                      onFavorite={onFavorite}
                      forcedAspect="4/3"
                    />
                  ))}
                </div>
              </FadeIn>
            )}
          </div>
        );
      })}
    </div>
  );
}
