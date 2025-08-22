import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { MapPin, Users, Palette } from 'lucide-react';

interface Region {
  id: string;
  name: string;
  artStyle: string;
  artists: number;
  x: number;
  y: number;
  color: string;
}

export const InteractiveMap: React.FC = () => {
  const [selectedRegion, setSelectedRegion] = useState<Region | null>(null);
  const [hoveredRegion, setHoveredRegion] = useState<string | null>(null);

  const regions: Region[] = [
    { id: 'rajasthan', name: 'Rajasthan', artStyle: 'Miniature Painting', artists: 120, x: 22, y: 35, color: '#F59E0B' },
    { id: 'gujarat', name: 'Gujarat', artStyle: 'Bandhani & Kutch Work', artists: 85, x: 18, y: 45, color: '#EF4444' },
    { id: 'maharashtra', name: 'Maharashtra', artStyle: 'Warli Painting', artists: 95, x: 25, y: 55, color: '#10B981' },
    { id: 'kerala', name: 'Kerala', artStyle: 'Kathakali Masks', artists: 65, x: 28, y: 85, color: '#8B5CF6' },
    { id: 'bengal', name: 'West Bengal', artStyle: 'Kalighat Painting', artists: 110, x: 70, y: 50, color: '#F97316' },
    { id: 'odisha', name: 'Odisha', artStyle: 'Pattachitra', artists: 75, x: 65, y: 60, color: '#06B6D4' },
    { id: 'punjab', name: 'Punjab', artStyle: 'Phulkari', artists: 55, x: 35, y: 15, color: '#EC4899' },
    { id: 'madhyapradesh', name: 'Madhya Pradesh', artStyle: 'Gond Painting', artists: 90, x: 45, y: 45, color: '#84CC16' }
  ];

  return (
    <section id="explore" className="py-20 bg-gradient-to-br from-slate-50 to-orange-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Discover Art Across 
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-600 to-red-600"> India</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Click on any region to explore its unique artistic heritage and connect with local artisans
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-8 items-start">
          {/* Map */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-2 bg-white rounded-3xl shadow-xl overflow-hidden"
          >
            <div className="relative w-full h-96 lg:h-[500px] bg-gradient-to-br from-blue-100 to-green-100">
              <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid meet">
                {/* Simplified India outline */}
                <path
                  d="M15 20 Q20 15 30 18 Q40 12 50 15 Q60 18 70 20 Q80 25 85 35 Q88 45 85 55 Q80 65 75 70 Q70 75 65 80 Q55 85 45 82 Q35 85 25 80 Q15 75 12 65 Q10 55 12 45 Q15 35 15 20 Z"
                  fill="rgba(251, 146, 60, 0.1)"
                  stroke="rgba(251, 146, 60, 0.3)"
                  strokeWidth="0.5"
                />
                
                {/* Region markers */}
                {regions.map((region) => (
                  <g key={region.id}>
                    <motion.circle
                      cx={region.x}
                      cy={region.y}
                      r={hoveredRegion === region.id ? "3" : "2.5"}
                      fill={region.color}
                      className="cursor-pointer drop-shadow-lg"
                      whileHover={{ scale: 1.2 }}
                      onClick={() => setSelectedRegion(region)}
                      onMouseEnter={() => setHoveredRegion(region.id)}
                      onMouseLeave={() => setHoveredRegion(null)}
                    />
                    <text
                      x={region.x}
                      y={region.y - 4}
                      textAnchor="middle"
                      className="text-xs font-medium fill-gray-700 pointer-events-none"
                    >
                      {region.name}
                    </text>
                  </g>
                ))}
              </svg>

              {/* Tooltip */}
              {hoveredRegion && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm rounded-lg p-3 shadow-lg pointer-events-none"
                >
                  {(() => {
                    const region = regions.find(r => r.id === hoveredRegion);
                    return region ? (
                      <div>
                        <h4 className="font-semibold text-gray-900">{region.name}</h4>
                        <p className="text-sm text-gray-600">{region.artStyle}</p>
                        <p className="text-xs text-gray-500 flex items-center mt-1">
                          <Users className="w-3 h-3 mr-1" />
                          {region.artists} Artists
                        </p>
                      </div>
                    ) : null;
                  })()}
                </motion.div>
              )}
            </div>
          </motion.div>

          {/* Region Details */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="bg-white rounded-3xl shadow-xl p-8"
          >
            {selectedRegion ? (
              <div>
                <div className="flex items-center mb-6">
                  <div 
                    className="w-4 h-4 rounded-full mr-3"
                    style={{ backgroundColor: selectedRegion.color }}
                  />
                  <h3 className="text-2xl font-bold text-gray-900">{selectedRegion.name}</h3>
                </div>
                
                <div className="space-y-4">
                  <div className="flex items-center text-gray-600">
                    <Palette className="w-5 h-5 mr-3 text-orange-500" />
                    <span className="font-medium">{selectedRegion.artStyle}</span>
                  </div>
                  
                  <div className="flex items-center text-gray-600">
                    <Users className="w-5 h-5 mr-3 text-orange-500" />
                    <span>{selectedRegion.artists} Active Artists</span>
                  </div>
                  
                  <div className="flex items-center text-gray-600">
                    <MapPin className="w-5 h-5 mr-3 text-orange-500" />
                    <span>Traditional Heritage Region</span>
                  </div>
                </div>

                <div className="mt-8 space-y-4">
                  <button className="w-full bg-gradient-to-r from-orange-500 to-red-600 text-white py-3 rounded-full font-medium hover:shadow-lg transition-all">
                    Explore {selectedRegion.name} Art
                  </button>
                  <button className="w-full border border-gray-300 text-gray-700 py-3 rounded-full font-medium hover:bg-gray-50 transition-all">
                    Connect with Artists
                  </button>
                </div>
              </div>
            ) : (
              <div className="text-center py-8">
                <MapPin className="w-12 h-12 text-orange-500 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  Explore Regional Art
                </h3>
                <p className="text-gray-600">
                  Click on any region on the map to discover its unique artistic traditions and connect with local artisans.
                </p>
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
};