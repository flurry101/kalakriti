import { useState, useEffect, useCallback } from 'react';
import { supabase } from '../../lib/supabase';
import { FcLike, FcComments } from 'react-icons/fc'; // Importing the icons
import { SearchBar } from '../../components/artwork/SearchBar';
import { FilterBar } from '../../components/artwork/FilterBar';
import { Header } from '../../components/Header'; // Import Header
import { Footer } from '../../components/Footer'; // Import Footer

interface Artwork {
  id: number;
  title: string;
  created_at: string;
  image_url: string;
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
  
  // Profile state to simulate a logged-in user or guest
  const [user, setUser] = useState<{ username: string; avatar_url: string } | null>(null);

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

  const ProfileSidebar = () => (
    <div className="hidden lg:block w-64 bg-gray-800 text-white p-4 rounded-lg shadow-md">
      {user ? (
        <>
          <img
            src={user.avatar_url || '/default-avatar.jpg'}
            alt="User Avatar"
            className="w-16 h-16 rounded-full mx-auto mb-4"
          />
          <h2 className="text-xl text-center">{user.username}</h2>
        </>
      ) : (
        <div className="text-center">
          <p className="text-lg">Guest</p>
        </div>
      )}
    </div>
  );

  return (
    <div className="flex flex-col min-h-screen">
      {/* Header */}
      <Header />  {/* Header component here */}

      {/* Main content */}
      <main className="flex-grow container mx-auto px-4 py-8 flex bg-orange-100">
        <ProfileSidebar />

        <div className="flex-1 ml-8">
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
                    <button
                      className="bg-white rounded-full p-2 text-gray-700 hover:text-red-500 focus:outline-none"
                      onClick={() => console.log('Liked', artwork.id)} // Placeholder function
                    >
                      <FcLike size={24} />
                    </button>
                    <button
                      className="bg-white rounded-full p-2 text-gray-700 hover:text-blue-500 focus:outline-none ml-2"
                      onClick={() => console.log('Commented', artwork.id)} // Placeholder function
                    >
                      <FcComments size={24} />
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
      </main>

      {/* Footer */}
      <Footer />  {/* Footer component here */}
    </div>
  );
};
