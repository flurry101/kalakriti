import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

export const AuthButtons = () => {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();

  if (user) {
    return (
      <button
        onClick={() => signOut()}
        className="px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-md hover:bg-red-700"
      >
        Sign Out
      </button>
    );
  }

  return (
    <div className="flex space-x-4">
      <button
        onClick={() => navigate('/signin?view=sign_up')}
        className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 transition-all"
      >
        Sign Up
      </button>
      <button
        onClick={() => navigate('/signin')}
        className="px-4 py-2 text-sm font-medium text-white bg-gradient-to-r from-orange-500 to-red-600 rounded-md hover:shadow-lg transition-all"
      >
        Sign In
      </button>
    </div>
  );
};
