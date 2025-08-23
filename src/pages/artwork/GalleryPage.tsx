import { useState, useEffect, useCallback } from 'react';
import { supabase } from '../../lib/supabase';
import { ArtworkGrid } from '../../components/artwork/ArtworkGrid';
import { SearchBar } from '../../components/artwork/SearchBar';
import { FilterBar } from '../../components/artwork/FilterBar';

interface Artwork {
  id: number;
  title: string;
  created_at: string;
  image_url: string; // Added image_url field for each artwork
  artist: {
    username: string;
    full_name: string;
    avatar_url: string;
  };
}

interface Filters {
  style: string;
  region: string;
}

export const GalleryPage = () => {
  const [artworks, setArtworks] = useState<Artwork[]>([]);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');
  const [filters, setFilters] = useState<Filters>({
    style: '',
    region: '',
  });

  const fetchArtworks = useCallback(async () => {
    if (loading || !hasMore) return;
    
    setLoading(true);
    const from = page * 12;
    const to = from + 11;

    let query = supabase
      .from('artworks')
      .select(`
        *,
        artist:profiles(username, full_name, avatar_url)
      `)
      .range(from, to)
      .order('created_at', { ascending: false });

    if (searchQuery) {
      query = query.textSearch('title', searchQuery);
    }

    if (filters.style) {
      query = query.eq('style', filters.style);
    }

    if (filters.region) {
      query = query.eq('region', filters.region);
    }

    try {
      const { data, error } = await query;

      if (error) {
        throw new Error(error.message);
      }

      if (data.length < 12) {
        setHasMore(false);
      }

      setArtworks((prev) => [...prev, ...data]);
      setPage((prev) => prev + 1);
    } catch (error) {
      console.error('Error fetching artworks:', error);
    } finally {
      setLoading(false);
    }
  }, [page, searchQuery, filters, loading, hasMore]);

  useEffect(() => {
    fetchArtworks();
  }, [fetchArtworks]);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    setArtworks([]);  // Reset artworks on new search
    setPage(0);       // Reset to the first page
    setHasMore(true); // Reset 'hasMore' for new search
  };

  const handleFilterChange = (newFilters: Filters) => {
    setFilters(newFilters);
    setArtworks([]);  // Reset artworks on filter change
    setPage(0);       // Reset to the first page
    setHasMore(true); // Reset 'hasMore' for new filter
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col gap-6">
        <SearchBar onSearch={handleSearch} />
        <FilterBar onChange={handleFilterChange} />
        
        {/* Masonry-style Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {artworks.map((artwork) => (
            <div key={artwork.id} className="relative group overflow-hidden rounded-lg shadow-lg bg-white">
              <img
                src={artwork.image_url}
                alt={artwork.title}
                className="w-full h-full object-cover transition-transform duration-300 ease-in-out transform group-hover:scale-105"
              />
              
              <div className="absolute bottom-4 left-4 right-4 p-2 bg-gradient-to-t from-black to-transparent opacity-60 group-hover:opacity-100 transition-opacity">
                <p className="text-white text-lg font-semibold">{artwork.title}</p>
                <p className="text-white text-sm">{artwork.artist.full_name}</p>
              </div>
              
              {/* Like and Comment icons on hover */}
              <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
                <button className="bg-white rounded-full p-2 text-gray-700 hover:text-red-500 focus:outline-none">
                  ❤️
                </button>
                <button className="bg-white rounded-full p-2 text-gray-700 hover:text-blue-500 focus:outline-none ml-2">
                  💬
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Infinite Scroll */}
        {loading && (
          <div className="text-center py-4">
            <p>Loading...</p>
          </div>
        )}
        
        {!loading && hasMore && (
          <button
            onClick={fetchArtworks}
            className="w-full py-2 px-4 bg-orange-500 text-white rounded-lg mt-6"
          >
            Load More
          </button>
        )}
      </div>
    </div>
  );
};
