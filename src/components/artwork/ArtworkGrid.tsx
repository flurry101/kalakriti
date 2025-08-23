import { useCallback, useRef } from 'react';
import { Link } from 'react-router-dom';

interface Artwork {
  id: string;
  title: string;
  imageUrl: string;
  artist: {
    id: string;
    name: string;
  };
  likes: number;
}

interface ArtworkGridProps {
  artworks: Artwork[];
  loading: boolean;
  hasMore: boolean;
  onLoadMore: () => void;
}

export const ArtworkGrid: React.FC<ArtworkGridProps> = ({
  artworks,
  loading,
  hasMore,
  onLoadMore,
}) => {
  const observer = useRef<IntersectionObserver>();
  const lastArtworkRef = useCallback(
    (node: HTMLDivElement | null) => {
      if (loading) return;

      if (observer.current) {
        observer.current.disconnect();
      }

      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore) {
          onLoadMore();
        }
      });

      if (node) {
        observer.current.observe(node);
      }
    },
    [loading, hasMore, onLoadMore]
  );

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {artworks.map((artwork, index) => (
        <div
          key={artwork.id}
          ref={index === artworks.length - 1 ? lastArtworkRef : undefined}
          className="group relative rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300"
        >
          <Link to={`/artwork/${artwork.id}`}>
            <div className="aspect-w-1 aspect-h-1">
              <img
                src={artwork.imageUrl}
                alt={artwork.title}
                className="object-cover w-full h-full transform group-hover:scale-105 transition-transform duration-300"
              />
            </div>
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
                <h3 className="text-lg font-semibold">{artwork.title}</h3>
                <p className="text-sm">by {artwork.artist.name}</p>
                <div className="flex items-center mt-2">
                  <span className="text-sm">{artwork.likes} likes</span>
                </div>
              </div>
            </div>
          </Link>
        </div>
      ))}
      {loading && (
        <div className="col-span-full flex justify-center py-8">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-orange-500"></div>
        </div>
      )}
    </div>
  );
};
