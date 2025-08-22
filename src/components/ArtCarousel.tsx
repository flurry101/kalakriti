import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Heart, Eye, Star } from 'lucide-react';

interface Artwork {
  id: string;
  title: string;
  artist: string;
  region: string;
  style: string;
  image: string;
  likes: number;
  views: number;
  rating: number;
}

export const ArtCarousel: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  const artworks: Artwork[] = [
    {
      id: '1',
      title: 'Peacock Dance',
      artist: 'Priya Sharma',
      region: 'Rajasthan',
      style: 'Miniature Painting',
      image: 'https://images.unsplash.com/photo-1575550828602-aff2b22342a7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpbmRpYW4lMjB0cmFkaXRpb25hbCUyMHBhaW50aW5nJTIwbWFkaHViYW5pfGVufDF8fHx8MTc1NTg3MDkyN3ww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      likes: 234,
      views: 1420,
      rating: 4.8
    },
    {
      id: '2',
      title: 'Village Life',
      artist: 'Ramesh Patil',
      region: 'Maharashtra',
      style: 'Warli Painting',
      image: 'https://images.unsplash.com/photo-1755452540355-b0797e93ea03?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpbmRpYW4lMjBoYW5kaWNyYWZ0cyUyMHRyYWRpdGlvbmFsJTIwYXJ0fGVufDF8fHx8MTc1NTg0ODEzNXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      likes: 189,
      views: 956,
      rating: 4.9
    },
    {
      id: '3',
      title: 'Divine Stories',
      artist: 'Anita Das',
      region: 'Karnataka',
      style: 'Channapatna Toys',
      image: 'https://images.pexels.com/photos/1070981/pexels-photo-1070981.jpeg',
      likes: 312,
      views: 2100,
      rating: 4.7
    },
    {
      id: '4',
      title: 'Forest Spirits',
      artist: 'Bharat Singh',
      region: 'Madhya Pradesh',
      style: 'Gond Painting',
      image: 'https://images.unsplash.com/photo-1661847650632-a2e3ef727c65?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpbmRpYW4lMjBjdWx0dXJhbCUyMGhlcml0YWdlJTIwYXJ0fGVufDF8fHx8MTc1NTg3MDkyOHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      likes: 267,
      views: 1680,
      rating: 4.9
    }
  ];

  useEffect(() => {
    if (!isAutoPlaying) return;
    
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % artworks.length);
    }, 4000);

    return () => clearInterval(interval);
  }, [isAutoPlaying, artworks.length]);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % artworks.length);
    setIsAutoPlaying(false);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + artworks.length) % artworks.length);
    setIsAutoPlaying(false);
  };

  return (
    <section className="py-20 bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Featured 
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400"> Artworks</span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Discover exceptional pieces from talented artists across India
          </p>
        </motion.div>

        <div className="relative max-w-5xl mx-auto">
          {/* Main Carousel */}
          <div className="relative h-96 lg:h-[500px] rounded-3xl overflow-hidden shadow-2xl">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentIndex}
                initial={{ opacity: 0, x: 300 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -300 }}
                transition={{ duration: 0.5 }}
                className="absolute inset-0"
              >
                <img
                  src={artworks[currentIndex].image}
                  alt={artworks[currentIndex].title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                
                {/* Content Overlay */}
                <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
                  <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                  >
                    <h3 className="text-3xl lg:text-4xl font-bold mb-2">
                      {artworks[currentIndex].title}
                    </h3>
                    <p className="text-lg text-gray-300 mb-4">
                      by {artworks[currentIndex].artist} • {artworks[currentIndex].region}
                    </p>
                    <div className="flex items-center space-x-6 mb-4">
                      <div className="flex items-center space-x-1">
                        <Heart className="w-5 h-5 text-red-400" />
                        <span>{artworks[currentIndex].likes}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Eye className="w-5 h-5 text-blue-400" />
                        <span>{artworks[currentIndex].views}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Star className="w-5 h-5 text-yellow-400" />
                        <span>{artworks[currentIndex].rating}</span>
                      </div>
                    </div>
                    <span className="inline-block bg-purple-600/50 backdrop-blur-sm px-4 py-2 rounded-full text-sm">
                      {artworks[currentIndex].style}
                    </span>
                  </motion.div>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Navigation Arrows */}
            <button
              onClick={prevSlide}
              className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white/30 transition-all"
            >
              <ChevronLeft className="w-6 h-6 text-white" />
            </button>
            
            <button
              onClick={nextSlide}
              className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white/30 transition-all"
            >
              <ChevronRight className="w-6 h-6 text-white" />
            </button>
          </div>

          {/* Thumbnail Navigation */}
          <div className="flex justify-center mt-8 space-x-4">
            {artworks.map((artwork, index) => (
              <button
                key={artwork.id}
                onClick={() => {
                  setCurrentIndex(index);
                  setIsAutoPlaying(false);
                }}
                className={`relative w-20 h-16 rounded-lg overflow-hidden transition-all ${
                  index === currentIndex 
                    ? 'ring-2 ring-purple-400 scale-110' 
                    : 'opacity-60 hover:opacity-100'
                }`}
              >
                <img
                  src={artwork.image}
                  alt={artwork.title}
                  className="w-full h-full object-cover"
                />
                {index === currentIndex && (
                  <motion.div
                    layoutId="activeIndicator"
                    className="absolute inset-0 bg-purple-500/30"
                  />
                )}
              </button>
            ))}
          </div>

          {/* Progress Indicator */}
          <div className="flex justify-center mt-6">
            <div className="flex space-x-2">
              {artworks.map((_, index) => (
                <div
                  key={index}
                  className={`h-1 rounded-full transition-all duration-300 ${
                    index === currentIndex 
                      ? 'w-8 bg-purple-400' 
                      : 'w-2 bg-gray-600'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};