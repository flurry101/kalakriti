import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { supabase } from '../../lib/supabase';
import { useAuth } from '../../context/AuthContext';
import { ArtworkGrid } from '../../components/artwork/ArtworkGrid';
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
  const [artworks, setArtworks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(false);
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
    <div className="container mx-auto px-4 py-8">
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
            <div className="flex justify-between items-start mb-8">
              <div className="flex items-center space-x-4">
                <img
                  src={profile.avatar_url || '/default-avatar.png'}
                  alt={profile.name}
                  className="w-20 h-20 rounded-full"
                />
                <div>
                  <h1 className="text-3xl font-bold">{profile.name}</h1>
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
              {isOwnProfile && (
                <button
                  onClick={() => setEditing(true)}
                  className="p-2 text-gray-600 hover:text-gray-800"
                >
                  <Edit className="h-5 w-5" />
                </button>
              )}
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
  );
};
