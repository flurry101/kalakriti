import { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { supabase } from '../../lib/supabase';
import { FcLike, FcComments } from 'react-icons/fc'; // Importing the icons
import { User, Palette, Heart, Plus } from 'lucide-react'; // Import icons
import { SearchBar } from '../../components/artwork/SearchBar';
import { FilterBar } from '../../components/artwork/FilterBar';
import { Header } from '../../components/Header'; // Import Header
import { Footer } from '../../components/Footer'; // Import Footer
import { OnboardingPopup } from '../../components/OnboardingPopup';
import { useAuth } from '../../context/AuthContext';

interface Artwork {
  id: number;
  title: string;
  created_at: string;
  image_url: string;
  user_id: string;
  artist: {
    id: string;
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
  
  const [showOnboarding, setShowOnboarding] = useState(false);
  
  const { user } = useAuth();

  const fetchArtworks = useCallback(async () => {
    if (loading || !hasMore) return;
    
    setLoading(true);
    const from = page * 12;
    const to = from + 11;

    let query = supabase
      .from('artworks')
      .select(`
        *,
        artist:profiles(id, username, full_name, avatar_url)
      `)
      .range(from, to)
      .order('created_at', { ascending: false });

    if (searchQuery) {
      query = query.or(`title.ilike.%${searchQuery}%,description.ilike.%${searchQuery}%,style.ilike.%${searchQuery}%`);
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
    setArtworks([]);
    setPage(0);
    setHasMore(true);
  }, [searchQuery, filters]);

  useEffect(() => {
    fetchArtworks();
  }, [fetchArtworks]);

  // Check if user needs onboarding
  useEffect(() => {
    let isMounted = true;
    
    const checkUserProfile = async () => {
      if (user && isMounted) {
        try {
          const { data: profile } = await supabase
            .from('profiles')
            .select('username, full_name')
            .eq('id', user.id)
            .single();
          
          if (isMounted && (!profile || !profile.username || !profile.full_name)) {
            setShowOnboarding(true);
          }
        } catch (error) {
          console.error('Error checking profile:', error);
        }
      } else if (!user && isMounted) {
        setShowOnboarding(false);
      }
    };

    // Add a small delay to prevent rapid state changes
    const timeoutId = setTimeout(checkUserProfile, 500);

    return () => {
      isMounted = false;
      clearTimeout(timeoutId);
    };
  }, [user]);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  const handleFilterChange = (newFilters: Filters) => {
    setFilters(newFilters);
  };

  const handleLike = async (artworkId: number) => {
    if (!user) {
      alert('Please sign in to like artworks');
      return;
    }

    try {
      // Check if already liked
      const { data: existingLike } = await supabase
        .from('artwork_likes')
        .select('id')
        .eq('artwork_id', artworkId)
        .eq('user_id', user.id)
        .single();

      if (existingLike) {
        // Unlike
        await supabase
          .from('artwork_likes')
          .delete()
          .eq('artwork_id', artworkId)
          .eq('user_id', user.id);
      } else {
        // Like
        await supabase
          .from('artwork_likes')
          .insert({
            artwork_id: artworkId,
            user_id: user.id
          });
      }

      // Refresh artworks to update like count
      setArtworks([]);
      setPage(0);
      setHasMore(true);
    } catch (error) {
      console.error('Error handling like:', error);
    }
  };

  const handleComment = async (artworkId: number) => {
    if (!user) {
      alert('Please sign in to comment on artworks');
      return;
    }

    const comment = prompt('Add a comment:');
    if (!comment) return;

    try {
      await supabase
        .from('artwork_comments')
        .insert({
          artwork_id: artworkId,
          user_id: user.id,
          content: comment
        });

      alert('Comment added successfully!');
      // Refresh artworks to update comment count
      setArtworks([]);
      setPage(0);
      setHasMore(true);
    } catch (error) {
      console.error('Error adding comment:', error);
      alert('Failed to add comment');
    }
  };

  const ProfileSidebar = () => (
    <div className="hidden lg:block w-64 bg-gray-800 text-white p-4 rounded-lg shadow-md">
      {user ? (
        <>
          <div className="text-center mb-6">
            <img
              src={user.user_metadata?.avatar_url || '/default-avatar.jpg'}
              alt="User Avatar"
              className="w-16 h-16 rounded-full mx-auto mb-3"
            />
            <h2 className="text-lg font-semibold">{user.user_metadata?.full_name || user.email}</h2>
            <p className="text-gray-300 text-sm">@{user.user_metadata?.username || 'user'}</p>
          </div>
          
          {/* Navigation Links */}
          <nav className="space-y-2">
            <Link
              to={`/profile/${user.id}`}
              className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-700 transition-colors group"
            >
              <User className="w-5 h-5 text-orange-400 group-hover:text-orange-300" />
              <span className="group-hover:text-white">My Profile</span>
            </Link>
            
            <Link
              to={`/profile/${user.id}`}
              className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-700 transition-colors group"
            >
              <Palette className="w-5 h-5 text-orange-400 group-hover:text-orange-300" />
              <span className="group-hover:text-white">My Portfolio</span>
            </Link>
            
            <Link
              to="/collections"
              className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-700 transition-colors group"
            >
              <Heart className="w-5 h-5 text-orange-400 group-hover:text-orange-300" />
              <span className="group-hover:text-white">My Collections</span>
            </Link>
            
            <Link
              to="/artwork/new"
              className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-700 transition-colors group"
            >
              <Plus className="w-5 h-5 text-orange-400 group-hover:text-orange-300" />
              <span className="group-hover:text-white">Upload Artwork</span>
            </Link>
          </nav>
          
          {/* Stats */}
          <div className="mt-6 pt-4 border-t border-gray-600">
            <div className="grid grid-cols-2 gap-4 text-center">
              <div>
                <p className="text-2xl font-bold text-orange-400">0</p>
                <p className="text-xs text-gray-400">Artworks</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-orange-400">0</p>
                <p className="text-xs text-gray-400">Likes</p>
              </div>
            </div>
          </div>
        </>
      ) : (
        <div className="text-center">
          <div className="w-16 h-16 bg-gray-600 rounded-full mx-auto mb-4 flex items-center justify-center">
            <User className="w-8 h-8 text-gray-400" />
          </div>
          <p className="text-lg font-semibold mb-2">Guest</p>
          <p className="text-gray-400 text-sm mb-4">Sign in to access your profile and collections</p>
          <Link
            to="/signin"
            className="inline-block bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-lg transition-colors"
          >
            Sign In
          </Link>
        </div>
      )}
    </div>
  );

  return (
    <div className="flex flex-col min-h-screen">
      {/* Header */}
      <Header />  {/* Header component here */}

      {/* Main content */}
      <main className="flex-grow container mx-auto px-4 py-8 pt-24 flex flex-col lg:flex-row bg-orange-100">
        <ProfileSidebar />

        <div className="flex-1 lg:ml-8 mt-6 lg:mt-0">
          <div className="flex flex-col gap-6">
            <SearchBar onSearch={handleSearch} />
            <FilterBar onChange={handleFilterChange} />
            
            {/* Responsive Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
              {artworks.map((artwork) => (
                <div key={artwork.id} className="relative group overflow-hidden rounded-lg shadow-lg bg-white aspect-square">
                  <img
                    src={artwork.image_url}
                    alt={artwork.title}
                    className="w-full h-full object-cover transition-transform duration-300 ease-in-out transform group-hover:scale-105"
                    loading="lazy"
                  />
                  
                  <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <p className="text-white text-sm md:text-base font-semibold truncate">{artwork.title}</p>
                    <Link
                      to={`/profile/${artwork.artist.id}`}
                      className="text-white text-xs md:text-sm hover:text-orange-200 transition-colors block truncate"
                      onClick={(e) => e.stopPropagation()}
                    >
                      by {artwork.artist.full_name}
                    </Link>
                  </div>
                  
                  {/* Like and Comment icons on hover */}
                  <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex space-x-1">
                    <button
                      className="bg-white/90 backdrop-blur-sm rounded-full p-1.5 md:p-2 text-gray-700 hover:text-red-500 focus:outline-none focus:ring-2 focus:ring-orange-500 shadow-lg"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleLike(artwork.id);
                      }}
                      title={user ? "Like this artwork" : "Sign in to like"}
                      aria-label={user ? "Like this artwork" : "Sign in to like"}
                    >
                      <FcLike size={20} className="md:w-6 md:h-6" />
                    </button>
                    <button
                      className="bg-white/90 backdrop-blur-sm rounded-full p-1.5 md:p-2 text-gray-700 hover:text-blue-500 focus:outline-none focus:ring-2 focus:ring-orange-500 shadow-lg"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleComment(artwork.id);
                      }}
                      title={user ? "Comment on this artwork" : "Sign in to comment"}
                      aria-label={user ? "Comment on this artwork" : "Sign in to comment"}
                    >
                      <FcComments size={20} className="md:w-6 md:h-6" />
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
                className="w-full py-3 px-6 bg-orange-500 text-white rounded-lg mt-6 hover:bg-orange-600 transition-colors focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2"
                aria-label="Load more artworks"
              >
                Load More
              </button>
            )}
          </div>
        </div>
      </main>

      {/* Footer */}
      <Footer />  {/* Footer component here */}
      
      {/* Onboarding Popup */}
      <OnboardingPopup
        isOpen={showOnboarding}
        onClose={() => setShowOnboarding(false)}
      />
    </div>
  );
};
