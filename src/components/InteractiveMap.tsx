import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { MAP_REGIONS } from '../constants';
import type { MapRegion } from '../types';

export function InteractiveMap() {
  const [activeRegion, setActiveRegion] = useState<MapRegion | null>(null);

  return (
    <section className="py-20 px-4 bg-gradient-to-br from-orange-50 to-red-50">
      <div className="container mx-auto max-w-7xl">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4 text-gray-900">
            Discover India's Artistic Heritage
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Click on different regions to explore the rich diversity of folk art forms across India
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8 items-start">
          <div className="lg:col-span-2">
            <Card className="p-6">
              <div className="relative w-full h-96 bg-gradient-to-br from-green-100 to-blue-100 rounded-lg overflow-hidden">
                <svg
                  viewBox="350 50 600 550"
                  className="w-full h-full"
                  onMouseLeave={() => setActiveRegion(null)}
                >
                  <g>
                    {MAP_REGIONS.map((region) => (
                      <path
                        key={region.id}
                        d={region.path}
                        className={`transition-all duration-300 cursor-pointer ${
                          activeRegion?.id === region.id
                            ? 'fill-[#D69E2E] stroke-[#4A1D1F] stroke-2'
                            : 'fill-gray-200 hover:fill-[#F6E05E] stroke-white'
                        }`}
                        onMouseEnter={() => setActiveRegion(region)}
                      />
                    ))}
                  </g>
                </svg>
                
                <div className="absolute top-0 right-0 p-4 bg-white/80 backdrop-blur-sm rounded-lg shadow-lg w-64 min-h-[120px] pointer-events-none transition-opacity duration-300">
                  {activeRegion ? (
                    <div>
                      <h3 className="text-xl font-bold text-[#4A1D1F]">{activeRegion?.name}</h3>
                      <ul className="mt-2 text-left list-disc list-inside text-gray-700">
                        {activeRegion?.artForms.map((art) => (
                          <li key={art}>{art}</li>
                        ))}
                      </ul>
                    </div>
                  ) : (
                    <div className="text-center text-gray-500 flex flex-col items-center justify-center h-full">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                      <p className="font-semibold">Hover over a region</p>
                    </div>
                  )}
                </div>
              </div>
            </Card>
          </div>

          <div className="space-y-6">
            {activeRegion ? (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <span className="text-2xl">📍</span>
                    {activeRegion?.name}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-muted-foreground">
                    {activeRegion?.description}
                  </p>
                  
                  <div>
                    <h4 className="font-semibold mb-2">Traditional Art Forms:</h4>
                    <div className="flex flex-wrap gap-2">
                      {activeRegion?.artForms.map((art, index) => (
                        <Badge key={index} variant="secondary" className="bg-orange-100 text-orange-800">
                          {art}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ) : (
              <Card>
                <CardContent className="p-6 text-center">
                  <div className="text-6xl mb-4">🗺️</div>
                  <p className="text-muted-foreground">
                    Click on any region on the map to explore its unique folk art traditions and cultural heritage.
                  </p>
                </CardContent>
              </Card>
            )}

            <Card>
              <CardHeader>
                <CardTitle>Art Diversity</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span>States Covered</span>
                    <Badge>{MAP_REGIONS.length}</Badge>
                  </div>
                  <div className="flex justify-between">
                    <span>Art Forms</span>
                    <Badge>{MAP_REGIONS.reduce((acc, state) => acc + state.artForms.length, 0)}</Badge>
                  </div>
                  <div className="flex justify-between">
                    <span>Cultural Regions</span>
                    <Badge>28+</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}