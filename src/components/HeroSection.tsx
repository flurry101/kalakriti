import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { useStats } from '../hooks/useStats';
import { Link } from 'react-router-dom';

export const HeroSection: React.FC = () => {
  const stats = useStats();
  return (
    <section className="min-h-screen relative overflow-hidden bg-gradient-to-br from-orange-900 via-red-900 to-amber-900">
      {/* Animated Background Patterns */}
      <div className="absolute inset-0">
        <svg className="w-full h-full opacity-20" viewBox="0 0 1200 800" fill="none">
          <defs>
            <pattern id="folkPattern" x="0" y="0" width="120" height="120" patternUnits="userSpaceOnUse">
              <circle cx="60" cy="60" r="30" fill="none" stroke="currentColor" strokeWidth="2"/>
              <path d="M30 60 Q45 30, 60 60 Q75 30, 90 60" fill="none" stroke="currentColor" strokeWidth="2"/>
              <polygon points="60,20 70,40 90,40 76,52 82,72 60,60 38,72 44,52 30,40 50,40" fill="currentColor" fillOpacity="0.3"/>
            </pattern>
            <pattern id="mandalaPattern" x="0" y="0" width="200" height="200" patternUnits="userSpaceOnUse">
              <circle cx="100" cy="100" r="80" fill="none" stroke="currentColor" strokeWidth="1" strokeOpacity="0.5"/>
              <circle cx="100" cy="100" r="60" fill="none" stroke="currentColor" strokeWidth="1" strokeOpacity="0.5"/>
              <circle cx="100" cy="100" r="40" fill="none" stroke="currentColor" strokeWidth="1" strokeOpacity="0.5"/>
              <circle cx="100" cy="100" r="20" fill="none" stroke="currentColor" strokeWidth="1" strokeOpacity="0.5"/>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#folkPattern)" className="text-amber-300"/>
          <rect width="100%" height="100%" fill="url(#mandalaPattern)" className="text-orange-200"/>
        </svg>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16">
        <div className="grid lg:grid-cols-2 gap-12 items-center min-h-[80vh]">
          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="text-white"
          >
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-5xl md:text-7xl font-bold leading-tight mb-6"
            >
              Step Into India's
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-orange-500">
                Living Canvas
              </span>
            </motion.h1>
            
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-xl md:text-2xl text-orange-200 mb-8 leading-relaxed"
            >
              Explore, celebrate, and preserve timeless stories through 
              the vibrant world of Indian folk art.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="flex flex-col sm:flex-row gap-4"
            >
              <Link to="/auth/register" className="group bg-gradient-to-r from-amber-500 to-orange-600 text-white px-8 py-4 rounded-full font-semibold text-lg flex items-center justify-center hover:shadow-2xl transition-all transform hover:scale-105">
                Join the Movement
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link 
                to="/gallery" 
                className="group border-2 border-orange-400 text-orange-400 hover:bg-orange-400 hover:text-white px-8 py-4 rounded-full font-semibold text-lg flex items-center justify-center transition-all"
              >
                Browse as Guest
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </motion.div>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
              className="grid grid-cols-3 gap-8 mt-12 pt-8 border-t border-white/20"
            >
              {[
                { number: stats.totalArtists + '+', label: 'Artists' },
                { number: stats.totalArtworks + '+', label: 'Artworks' },
                { number: stats.totalRegions + '+', label: 'Regions' }
              ].map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="text-2xl md:text-3xl font-bold text-amber-400">{stat.number}</div>
                  <div className="text-orange-200 text-sm md:text-base">{stat.label}</div>
                </div>
              ))}
            </motion.div>
          </motion.div>

          {/* Visual Element */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="relative"
          >
            <div className="relative w-full h-96 lg:h-[500px] rounded-3xl overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1703145219083-6037d97decb5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpbmRpYW4lMjBmb2xrJTIwYXJ0JTIwcGF0dGVybnMlMjB0cmFkaXRpb25hbHxlbnwxfHx8fDE3NTU4NzA5Mjd8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                alt="Traditional Indian Folk Art"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
              
              {/* Floating Elements */}
              <motion.div
                animate={{ y: [-10, 10, -10] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm rounded-2xl p-4 shadow-xl"
              >
                <div className="w-12 h-12 bg-gradient-to-br from-orange-400 to-red-500 rounded-xl flex items-center justify-center">
                  <span className="text-white font-bold text-lg">🎨</span>
                </div>
              </motion.div>

              <motion.div
                animate={{ y: [10, -10, 10] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                className="absolute bottom-4 left-4 bg-white/90 backdrop-blur-sm rounded-2xl p-4 shadow-xl"
              >
                <div className="text-center">
                  <div className="text-2xl font-bold text-gray-800">0</div>
                  <div className="text-sm text-gray-600">Artworks</div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};