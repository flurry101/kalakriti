import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { supabase } from '../../lib/supabase';
import { useAuth } from '../../context/AuthContext';
import { Heart, Share2, Download } from 'lucide-react';

interface Comment {
  id: string;
  content: string;
  created_at: string;
  user: {
    id: string;
    name: string;
    avatar_url: string;
  };
}

interface Artwork {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  artist: {
    id: string;
    name: string;
    avatar_url: string;
  };
  style: string;
  region: string;
  likes: number;
  created_at: string;
}

export const ArtworkDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const { user } = useAuth();
  const [artwork, setArtwork] = useState<Artwork | null>(null);
  const [comments, setComments] = useState<Comment[]>([]);
  const [newComment, setNewComment] = useState('');
  const [isLiked, setIsLiked] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchArtwork = async () => {
      if (!id) return;

      const { data: artworkData, error: artworkError } = await supabase
        .from('artworks')
        .select(`
          *,
          artist:user_id (
            id,
            name,
            avatar_url
          )
        `)
        .eq('id', id)
        .single();

      if (artworkError) {
        console.error('Error fetching artwork:', artworkError);
        return;
      }

      setArtwork(artworkData);

      // Fetch comments
      const { data: commentsData, error: commentsError } = await supabase
        .from('comments')
        .select(`
          *,
          user:user_id (
            id,
            name,
            avatar_url
          )
        `)
        .eq('artwork_id', id)
        .order('created_at', { ascending: false });

      if (commentsError) {
        console.error('Error fetching comments:', commentsError);
        return;
      }

      setComments(commentsData);
      setLoading(false);

      // Check if user has liked the artwork
      if (user) {
        const { data: likeData } = await supabase
          .from('likes')
          .select('id')
          .eq('artwork_id', id)
          .eq('user_id', user.id)
          .single();

        setIsLiked(!!likeData);
      }
    };

    fetchArtwork();
  }, [id, user]);

  const handleLike = async () => {
    if (!user || !artwork) return;

    if (isLiked) {
      await supabase
        .from('likes')
        .delete()
        .eq('artwork_id', artwork.id)
        .eq('user_id', user.id);

      setArtwork((prev) =>
        prev ? { ...prev, likes: prev.likes - 1 } : null
      );
    } else {
      await supabase.from('likes').insert({
        artwork_id: artwork.id,
        user_id: user.id,
      });

      setArtwork((prev) =>
        prev ? { ...prev, likes: prev.likes + 1 } : null
      );
    }

    setIsLiked(!isLiked);
  };

  const handleComment = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user || !artwork || !newComment.trim()) return;

    const { error } = await supabase.from('comments').insert({
      artwork_id: artwork.id,
      user_id: user.id,
      content: newComment.trim(),
    });

    if (error) {
      console.error('Error posting comment:', error);
      return;
    }

    // Refresh comments
    const { data } = await supabase
      .from('comments')
      .select(`
        *,
        user:user_id (
          id,
          name,
          avatar_url
        )
      `)
      .eq('artwork_id', artwork.id)
      .order('created_at', { ascending: false });

    if (data) {
      setComments(data);
    }

    setNewComment('');
  };

  const handleShare = async () => {
    if (!artwork) return;

    const shareData = {
      title: artwork.title,
      text: `Check out this amazing artwork by ${artwork.artist.name} on KalaKriti!`,
      url: window.location.href,
    };

    try {
      if (navigator.share) {
        await navigator.share(shareData);
      } else {
        await navigator.clipboard.writeText(window.location.href);
        // Show toast notification
        alert('Link copied to clipboard!');
      }
    } catch (error) {
      console.error('Error sharing:', error);
    }
  };

  const handleDownload = async () => {
    if (!artwork) return;

    try {
      const response = await fetch(artwork.imageUrl);
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `${artwork.title.replace(/[^a-z0-9]/gi, '_').toLowerCase()}.jpg`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Error downloading image:', error);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500"></div>
      </div>
    );
  }

  if (!artwork) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen">
        <h1 className="text-2xl font-bold mb-4">Artwork not found</h1>
        <Link to="/gallery" className="text-orange-500 hover:underline">
          Return to Gallery
        </Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Image Section */}
        <div className="relative">
          <img
            src={artwork.imageUrl}
            alt={artwork.title}
            className="w-full h-auto rounded-lg shadow-lg"
          />
          <div className="absolute top-4 right-4 flex gap-2">
            <button
              onClick={handleShare}
              className="p-2 bg-white rounded-full shadow-lg hover:bg-gray-100"
            >
              <Share2 className="h-5 w-5 text-gray-600" />
            </button>
            <button
              onClick={handleDownload}
              className="p-2 bg-white rounded-full shadow-lg hover:bg-gray-100"
            >
              <Download className="h-5 w-5 text-gray-600" />
            </button>
          </div>
        </div>

        {/* Info Section */}
        <div className="space-y-6">
          <div>
            <h1 className="text-3xl font-bold mb-2">{artwork.title}</h1>
            <Link
              to={`/profile/${artwork.artist.id}`}
              className="flex items-center gap-2 text-gray-600 hover:text-orange-500"
            >
              <img
                src={artwork.artist.avatar_url}
                alt={artwork.artist.name}
                className="w-8 h-8 rounded-full"
              />
              <span>{artwork.artist.name}</span>
            </Link>
          </div>

          <div className="flex items-center gap-4">
            <button
              onClick={handleLike}
              className={`flex items-center gap-1 ${isLiked ? 'text-red-500' : 'text-gray-500'}`}
            >
              <Heart className={`h-6 w-6 ${isLiked ? 'fill-current' : ''}`} />
              <span>{artwork.likes}</span>
            </button>
          </div>

          <div>
            <h2 className="text-xl font-semibold mb-2">About the Artwork</h2>
            <p className="text-gray-600">{artwork.description}</p>
          </div>

          <div className="flex gap-4">
            <div>
              <span className="text-sm text-gray-500">Style</span>
              <p className="font-medium">{artwork.style}</p>
            </div>
            <div>
              <span className="text-sm text-gray-500">Region</span>
              <p className="font-medium">{artwork.region}</p>
            </div>
          </div>

          {/* Comments Section */}
          <div>
            <h2 className="text-xl font-semibold mb-4">Comments</h2>

            {user ? (
              <form onSubmit={handleComment} className="mb-6">
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                    placeholder="Add a comment..."
                    className="flex-1 p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                  />
                  <button
                    type="submit"
                    className="px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600"
                  >
                    Post
                  </button>
                </div>
              </form>
            ) : (
              <p className="mb-6 text-gray-600">
                <Link to="/signin" className="text-orange-500 hover:underline">
                  Sign in
                </Link>{' '}
                to leave a comment
              </p>
            )}

            <div className="space-y-4">
              {comments.map((comment) => (
                <div key={comment.id} className="flex gap-3">
                  <img
                    src={comment.user.avatar_url}
                    alt={comment.user.name}
                    className="w-8 h-8 rounded-full"
                  />
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-medium">{comment.user.name}</span>
                      <span className="text-sm text-gray-500">
                        {new Date(comment.created_at).toLocaleDateString()}
                      </span>
                    </div>
                    <p className="text-gray-600">{comment.content}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
