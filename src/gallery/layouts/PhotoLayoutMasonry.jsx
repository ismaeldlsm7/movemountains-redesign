// Photo layout: Masonry — editorial flow with varied aspect ratios.
import PhotoCard from "../PhotoCard";

export default function PhotoLayoutMasonry({ photos, favorites, onPhotoClick, onFavorite }) {
  return (
    <div style={{ padding: "4px clamp(4px, 1vw, 8px) 0", columns: "3 240px", columnGap: 4 }}>
      {photos.map((photo, i) => (
        <PhotoCard
          key={photo.id}
          photo={photo}
          favorites={favorites}
          onClick={() => onPhotoClick(i)}
          onFavorite={onFavorite}
        />
      ))}
    </div>
  );
}
