import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { supabase } from '../../lib/supabase';
import { useAuth } from '../../context/AuthContext';
import { ArtworkGrid } from '../../components/artwork/ArtworkGrid';
import { Header } from '../../components/Header';
import { Footer } from '../../components/Footer';
import { Edit } from 'lucide-react';
import { CheckCircle } from 'lucide-react';

interface Profile {
  id: string;
  name: string;
  avatar_url: string;
  bio: string;
  is_artist: boolean;
  website: string;
  instagram: string;
  is_verified: boolean;
}

export const ProfilePage = () => {
  const { id } = useParams<{ id: string }>();
  const { user } = useAuth();
  const [profile, setProfile] = useState<Profile | null>(null);
  const [artworks, setArtworks] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(false);
  const [isFollowing, setIsFollowing] = useState(false);
  const [followLoading, setFollowLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    bio: '',
    is_artist: false,
    website: '',
    instagram: '',
  });

  const isOwnProfile = user?.id === id;

  useEffect(() => {
    const fetchProfile = async () => {
      if (!id) return;

      try {
        // Fetch profile data
        const { data: profileData, error: profileError } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', id)
          .single();

        if (profileError) throw profileError;
        setProfile(profileData);
        setFormData({
          name: profileData.name || '',
          bio: profileData.bio || '',
          is_artist: profileData.is_artist || false,
          website: profileData.website || '',
          instagram: profileData.instagram || '',
        });

        // Fetch user's artworks
        const { data: artworksData, error: artworksError } = await supabase
          .from('artworks')
          .select('*')
          .eq('user_id', id)
          .order('created_at', { ascending: false });

        if (artworksError) throw artworksError;
        setArtworks(artworksData);

        // Update verification status based on artwork count
        if (profileData.is_artist && artworksData.length >= 3) {
          const { error: updateError } = await supabase
            .from('profiles')
            .update({ is_verified: true })
            .eq('id', id);
          
          if (!updateError) {
            setProfile(prev => prev ? { ...prev, is_verified: true } : null);
          }
        }

        // Check if current user is following this profile
        if (user && user.id !== id) {
          const { data: followData } = await supabase
            .from('user_follows')
            .select('id')
            .eq('follower_id', user.id)
            .eq('following_id', id)
            .single();
          
          setIsFollowing(!!followData);
        }
      } catch (error) {
        console.error('Error fetching profile:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [id]);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value, type } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;

    try {
      const { error } = await supabase
        .from('profiles')
        .update({
          name: formData.name,
          bio: formData.bio,
          is_artist: formData.is_artist,
          website: formData.website,
          instagram: formData.instagram,
          updated_at: new Date().toISOString(),
        })
        .eq('id', user.id);

      if (error) throw error;

      setProfile((prev) => ({
        ...prev!,
        ...formData,
      }));
      setEditing(false);
    } catch (error) {
      console.error('Error updating profile:', error);
      alert('Failed to update profile. Please try again.');
    }
  };

  const handleFollow = async () => {
    if (!user || !id) return;
    
    setFollowLoading(true);
    try {
      if (isFollowing) {
        // Unfollow
        await supabase
          .from('user_follows')
          .delete()
          .eq('follower_id', user.id)
          .eq('following_id', id);
        setIsFollowing(false);
      } else {
        // Follow
        await supabase
          .from('user_follows')
          .insert({
            follower_id: user.id,
            following_id: id
          });
        setIsFollowing(true);
      }
    } catch (error) {
      console.error('Error handling follow:', error);
      alert('Failed to update follow status');
    } finally {
      setFollowLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500"></div>
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen">
        <h1 className="text-2xl font-bold mb-4">Profile not found</h1>
        <Link to="/" className="text-orange-500 hover:underline">
          Return to Home
        </Link>
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <div className="flex-grow container mx-auto px-4 py-8 pt-24">
      <div className="max-w-4xl mx-auto">
        {editing ? (
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="flex justify-between items-center">
              <h1 className="text-3xl font-bold">Edit Profile</h1>
              <button
                type="button"
                onClick={() => setEditing(false)}
                className="text-gray-600 hover:text-gray-800"
              >
                Cancel
              </button>
            </div>

            <div className="grid gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Bio
                </label>
                <textarea
                  name="bio"
                  value={formData.bio}
                  onChange={handleInputChange}
                  rows={4}
                  className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                />
              </div>

              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="is_artist"
                  name="is_artist"
                  checked={formData.is_artist}
                  onChange={handleInputChange}
                  className="h-4 w-4 text-orange-500 focus:ring-orange-500 border-gray-300 rounded"
                />
                <label
                  htmlFor="is_artist"
                  className="text-sm font-medium text-gray-700"
                >
                  I am an artist
                </label>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Website
                </label>
                <input
                  type="url"
                  name="website"
                  value={formData.website}
                  onChange={handleInputChange}
                  className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Instagram
                </label>
                <input
                  type="text"
                  name="instagram"
                  value={formData.instagram}
                  onChange={handleInputChange}
                  className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-2 px-4 bg-orange-500 text-white rounded-lg hover:bg-orange-600"
            >
              Save Changes
            </button>
          </form>
        ) : (
          <>
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start mb-8 space-y-4 sm:space-y-0">
              <div className="flex flex-col sm:flex-row sm:items-center space-y-4 sm:space-y-0 sm:space-x-4">
                <img
                  src={profile.avatar_url || '/default-avatar.png'}
                  alt={profile.name}
                  className="w-20 h-20 sm:w-24 sm:h-24 rounded-full mx-auto sm:mx-0"
                />
                <div className="text-center sm:text-left">
                  <h1 className="text-2xl sm:text-3xl font-bold mb-2">{profile.name}</h1>
                  <div className="flex flex-wrap justify-center sm:justify-start gap-2">
                    {profile.is_artist && (
                      <span className="inline-block px-3 py-1 bg-orange-100 text-orange-800 rounded-full text-sm font-medium">
                        Artist
                      </span>
                    )}
                    {profile.is_verified && (
                      <span className="inline-flex items-center gap-1 px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">
                        <CheckCircle className="w-4 h-4" />
                        Verified Artist
                      </span>
                    )}
                  </div>
                </div>
              </div>
              <div className="flex items-center justify-center sm:justify-end space-x-2">
                {!isOwnProfile && user && (
                  <button
                    onClick={handleFollow}
                    disabled={followLoading}
                    className={`px-4 py-2 rounded-lg font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 ${
                      isFollowing
                        ? 'bg-gray-200 text-gray-700 hover:bg-gray-300 focus:ring-gray-500'
                        : 'bg-orange-500 text-white hover:bg-orange-600 focus:ring-orange-500'
                    } disabled:opacity-50`}
                    aria-label={isFollowing ? 'Unfollow user' : 'Follow user'}
                  >
                    {followLoading ? 'Loading...' : isFollowing ? 'Following' : 'Follow'}
                  </button>
                )}
                {isOwnProfile && (
                  <button
                    onClick={() => setEditing(true)}
                    className="p-2 text-gray-600 hover:text-gray-800 focus:outline-none focus:ring-2 focus:ring-orange-500 rounded-lg"
                    aria-label="Edit profile"
                  >
                    <Edit className="h-5 w-5" />
                  </button>
                )}
              </div>
            </div>

            {profile.bio && (
              <div className="mb-6">
                <h2 className="text-lg font-semibold mb-2">About</h2>
                <p className="text-gray-600">{profile.bio}</p>
              </div>
            )}

            {(profile.website || profile.instagram) && (
              <div className="mb-8">
                <h2 className="text-lg font-semibold mb-2">Links</h2>
                <div className="space-y-2">
                  {profile.website && (
                    <a
                      href={profile.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-orange-500 hover:underline block"
                    >
                      Website
                    </a>
                  )}
                  {profile.instagram && (
                    <a
                      href={`https://instagram.com/${profile.instagram}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-orange-500 hover:underline block"
                    >
                      Instagram
                    </a>
                  )}
                </div>
              </div>
            )}
          </>
        )}

        {!editing && (
          <div>
            <h2 className="text-2xl font-bold mb-4">Artworks</h2>
            <ArtworkGrid
              artworks={artworks}
              loading={false}
              hasMore={false}
              onLoadMore={() => {}}
            />
          </div>
        )}
      </div>
      </div>
      <Footer />
    </div>
  );
};
