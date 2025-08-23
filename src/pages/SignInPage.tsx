import { Auth } from '@supabase/auth-ui-react';
import { ThemeSupa } from '@supabase/auth-ui-shared';
import { supabase } from '../lib/supabase';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { X, CheckCircle, AlertCircle } from 'lucide-react';
import { useState, useEffect } from 'react';

export const SignInPage = () => {
  const navigate = useNavigate();
  const [authStatus, setAuthStatus] = useState<'success' | 'error' | null>(null);
  
  useEffect(() => {
    const { data: authListener } = supabase.auth.onAuthStateChange((event) => {
      if (event === 'SIGNED_IN') {
        setAuthStatus('success');
        setTimeout(() => {
          navigate('/gallery');
        }, 2000);
      } else if (event === 'SIGNED_OUT') {
        setAuthStatus('error');
      }
    });

    return () => {
      authListener?.subscription.unsubscribe();
    };
  }, [navigate]);
  const [searchParams] = useState(() => new URLSearchParams(window.location.search));
  const initialView = searchParams.get('view') === 'sign_up' ? 'sign_up' : 'sign_in';

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
    >
      <motion.div
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.95, opacity: 0 }}
        className="bg-white rounded-lg p-8 max-w-md w-full mx-4 relative"
      >
        <button
          onClick={() => navigate('/')}
          className="absolute right-4 top-4 text-gray-500 hover:text-gray-700"
        >
          <X size={24} />
        </button>
        
        <div className="mb-6 text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Welcome to KalaKriti</h2>
          <p className="text-gray-600">Sign in or create an account to continue</p>
          {authStatus && (
            <div className={`mt-4 p-3 rounded-lg ${
              authStatus === 'success' 
                ? 'bg-green-100 text-green-700' 
                : 'bg-red-100 text-red-700'
            }`}>
              <div className="flex items-center gap-2">
                {authStatus === 'success' ? (
                  <>
                    <CheckCircle className="w-5 h-5" />
                    <span>Successfully authenticated! Redirecting to feed...</span>
                  </>
                ) : (
                  <>
                    <AlertCircle className="w-5 h-5" />
                    <span>Authentication failed. Please try again.</span>
                  </>
                )}
              </div>
            </div>
          )}
        </div>

        <Auth
          supabaseClient={supabase}
          view={initialView}
          appearance={{
            theme: ThemeSupa,
            variables: {
              default: {
                colors: {
                  brand: '#f97316',
                  brandAccent: '#ea580c',
                },
                borderWidths: {
                  buttonBorderWidth: '1px',
                  inputBorderWidth: '1px',
                },
                radii: {
                  borderRadiusButton: '8px',
                  buttonBorderRadius: '8px',
                  inputBorderRadius: '8px',
                },
              },
            },
          }}
          providers={['google']}
          redirectTo={`${window.location.origin}/auth/callback`}
          theme="light"
          showLinks={true}
          magicLink={true}
          localization={{
            variables: {
              sign_in: {
                email_label: 'Email address',
                password_label: 'Password',
                button_label: 'Sign in',
                loading_button_label: 'Signing in...',
                social_provider_text: 'Sign in with {{provider}}',
                link_text: 'Already have an account? Sign in'
              },
              sign_up: {
                email_label: 'Email address',
                password_label: 'Create a Password',
                button_label: 'Sign up',
                loading_button_label: 'Creating account...',
                social_provider_text: 'Sign up with {{provider}}',
                link_text: "Don't have an account? Sign up"
              }
            }
          }}
        />
      </motion.div>
    </motion.div>
  );
};
