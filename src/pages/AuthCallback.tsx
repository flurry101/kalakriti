import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabase';

export const AuthCallback = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const handleAuthCallback = async () => {
      try {
        const { data: { session }, error } = await supabase.auth.getSession();
        
        if (error) {
          console.error('Auth error:', error);
          navigate('/signin');
          return;
        }

        if (session) {
          // Successful authentication - redirect to gallery
          navigate('/gallery');
        } else {
          // No session - redirect to sign in
          navigate('/signin');
        }
      } catch (error) {
        console.error('Error handling auth callback:', error);
        navigate('/signin');
      }
    };

    handleAuthCallback();
  }, [navigate]);

  return null;
};
