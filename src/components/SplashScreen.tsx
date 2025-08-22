import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

interface SplashScreenProps {
  onComplete: () => void;
}

export const SplashScreen: React.FC<SplashScreenProps> = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer);
          setTimeout(onComplete, 500);
          return 100;
        }
        return prev + 2;
      });
    }, 50);

    return () => clearInterval(timer);
  }, [onComplete]);

  return (
    <motion.div 
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="fixed inset-0 z-50 bg-gradient-to-br from-orange-900 via-red-800 to-amber-900 flex items-center justify-center"
    >
      {/* Traditional patterns background */}
      <div className="absolute inset-0 opacity-10">
        <svg className="w-full h-full" viewBox="0 0 400 400" fill="none">
          <pattern id="paisley" x="0" y="0" width="80" height="80" patternUnits="userSpaceOnUse">
            <path d="M40 10C55 10 65 25 60 40C55 55 40 65 25 60C10 55 5 40 10 25C15 10 30 10 40 10Z" fill="currentColor" fillOpacity="0.3"/>
          </pattern>
          <rect width="100%" height="100%" fill="url(#paisley)"/>
        </svg>
      </div>

      <div className="text-center z-10">
        <motion.div
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="mb-8"
        >
          <h2 className="text-6xl md:text-8xl text-amber-200 font-medium">
            KALAKRITI
          </h2>
          <p className="text-lg text-orange-200 mt-2">
            India's Living Canvas
          </p>
        </motion.div>

        <div className="w-64 h-2 bg-orange-800 rounded-full mx-auto overflow-hidden">
          <motion.div
            className="h-full bg-gradient-to-r from-amber-400 to-orange-500 rounded-full"
            style={{ width: `${progress}%` }}
            transition={{ duration: 0.1 }}
          />
        </div>
        
        <p className="text-orange-200 mt-4 text-sm">
          Loading cultural heritage...
        </p>
      </div>
    </motion.div>
  );
};