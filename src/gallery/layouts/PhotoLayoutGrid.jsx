// Photo layout: Grid — clean uniform square grid.
import { motion } from "framer-motion";
import PhotoCard from "../PhotoCard";
import { ease } from "../GalleryShared";

export default function PhotoLayoutGrid({ photos, favorites, onPhotoClick, onFavorite }) {
  return (
    <div style={{
      display: "grid",
      gridTemplateColumns: "repeat(3, 1fr)",
      gap: 4,
      padding: "4px clamp(4px, 1vw, 8px) 0",
    }}>
      {photos.map((photo, i) => (
        <motion.div
          key={photo.id}
          initial={{ opacity: 0, scale: 0.97 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4, delay: i * 0.025, ease }}
        >
          <PhotoCard
            photo={photo}
            favorites={favorites}
            onClick={() => onPhotoClick(i)}
            onFavorite={onFavorite}
            forcedAspect="1/1"
          />
        </motion.div>
      ))}
    </div>
  );
}
