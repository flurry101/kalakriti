import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { supabase } from '../lib/supabase';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import { Link } from 'react-router-dom';
import { Heart, ArrowLeft } from 'lucide-react';

interface LikedArtwork {
  id: string;
  artwork: {
    id: string;
    title: string;
    image_url: string;
    user_id: string;
    artist: {
      id: string;
      full_name: string;
      username: string;
    };
  };
  created_at: string;
}

export const CollectionsPage = () => {
  const { user } = useAuth();
  const [likedArtworks, setLikedArtworks] = useState<LikedArtwork[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLikedArtworks = async () => {
      if (!user) return;

      try {
        const { data, error } = await supabase
          .from('artwork_likes')
          .select(`
            id,
            created_at,
            artwork:artworks(
              id,
              title,
              image_url,
              user_id,
              artist:profiles(id, full_name, username)
            )
          `)
          .eq('user_id', user.id)
          .order('created_at', { ascending: false });

        if (error) throw error;
        setLikedArtworks((data as any) || []);
      } catch (error) {
        console.error('Error fetching liked artworks:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchLikedArtworks();
  }, [user]);

  const handleUnlike = async (artworkId: string) => {
    if (!user) return;

    try {
      const { error } = await supabase
        .from('artwork_likes')
        .delete()
        .eq('artwork_id', artworkId)
        .eq('user_id', user.id);

      if (error) throw error;

      // Remove from local state
      setLikedArtworks(prev => 
        prev.filter(item => item.artwork.id !== artworkId)
      );
    } catch (error) {
      console.error('Error unliking artwork:', error);
    }
  };

  if (!user) {
    return (
      <div className="flex flex-col min-h-screen">
        <Header />
        <div className="flex-grow flex items-center justify-center pt-24">
          <div className="text-center">
            <h1 className="text-2xl font-bold mb-4">Sign In Required</h1>
            <p className="text-gray-600 mb-6">Please sign in to view your collections</p>
            <Link
              to="/signin"
              className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-lg transition-colors"
            >
              Sign In
            </Link>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      
      <div className="flex-grow pt-24 px-4">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center space-x-4">
              <Link
                to="/gallery"
                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
              >
                <ArrowLeft className="w-5 h-5" />
              </Link>
              <div>
                <h1 className="text-3xl font-bold text-gray-900">My Collections</h1>
                <p className="text-gray-600">Artworks you've liked and saved</p>
              </div>
            </div>
            <div className="flex items-center space-x-2 text-orange-500">
              <Heart className="w-6 h-6" />
              <span className="text-lg font-semibold">{likedArtworks.length} items</span>
            </div>
          </div>

          {/* Content */}
          {loading ? (
            <div className="flex justify-center items-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500"></div>
            </div>
          ) : likedArtworks.length === 0 ? (
            <div className="text-center py-12">
              <Heart className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <h2 className="text-xl font-semibold text-gray-900 mb-2">No collections yet</h2>
              <p className="text-gray-600 mb-6">Start exploring and like artworks to build your collection</p>
              <Link
                to="/gallery"
                className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-lg transition-colors"
              >
                Explore Gallery
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
              {likedArtworks.map((item) => (
                <div key={item.id} className="group relative">
                  <div className="aspect-square overflow-hidden rounded-lg bg-gray-200">
                    <img
                      src={item.artwork.image_url}
                      alt={item.artwork.title}
                      className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                    
                    {/* Overlay */}
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-all duration-300">
                      <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button
                          onClick={() => handleUnlike(item.artwork.id)}
                          className="p-2 bg-white/90 rounded-full hover:bg-white transition-colors"
                          title="Remove from collection"
                        >
                          <Heart className="w-4 h-4 text-red-500 fill-current" />
                        </button>
                      </div>
                      
                      <div className="absolute bottom-0 left-0 right-0 p-3 text-white opacity-0 group-hover:opacity-100 transition-opacity">
                        <h3 className="font-semibold text-sm truncate">{item.artwork.title}</h3>
                        <Link
                          to={`/profile/${item.artwork.artist.id}`}
                          className="text-xs text-gray-200 hover:text-white transition-colors"
                        >
                          by {item.artwork.artist.full_name}
                        </Link>
                      </div>
                    </div>
                  </div>
                  
                  {/* Info below image */}
                  <div className="mt-2">
                    <h3 className="font-medium text-gray-900 truncate">{item.artwork.title}</h3>
                    <Link
                      to={`/profile/${item.artwork.artist.id}`}
                      className="text-sm text-gray-600 hover:text-orange-500 transition-colors"
                    >
                      {item.artwork.artist.full_name}
                    </Link>
                    <p className="text-xs text-gray-400 mt-1">
                      Liked {new Date(item.created_at).toLocaleDateString()}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
      
      <Footer />
    </div>
  );
};