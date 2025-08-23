import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

export const AuthButtons = () => {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();

  const handleSignOut = async () => {
    try {
      await signOut();
      navigate('/'); // Redirect to home page after sign out
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  if (user) {
    return (
      <button
        onClick={handleSignOut}
        className="px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-md hover:bg-red-700 transition-colors"
      >
        Sign Out
      </button>
    );
  }

  return (
    <button
      onClick={() => navigate('/signin')}
      className="px-4 py-2 text-sm font-medium text-white bg-gradient-to-r from-orange-500 to-red-600 rounded-md hover:shadow-lg transition-all"
    >
      Sign In
    </button>
  );
};
