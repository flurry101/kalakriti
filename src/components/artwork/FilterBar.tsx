import { useState, useEffect } from 'react';
import { supabase } from '../../lib/supabase';

interface FilterBarProps {
  onChange: (filters: { style: string; region: string }) => void;
}

export const FilterBar: React.FC<FilterBarProps> = ({ onChange }) => {
  const [styles, setStyles] = useState<string[]>([]);
  const [regions, setRegions] = useState<string[]>([]);
  const [selectedStyle, setSelectedStyle] = useState('');
  const [selectedRegion, setSelectedRegion] = useState('');

  useEffect(() => {
    const fetchFilters = async () => {
      // Fetch unique styles
      const { data: stylesData } = await supabase
        .from('artworks')
        .select('style')
        .not('style', 'is', null);
      
      // Fetch unique regions
      const { data: regionsData } = await supabase
        .from('artworks')
        .select('region')
        .not('region', 'is', null);

      if (stylesData) {
        const uniqueStyles = [...new Set(stylesData.map(item => item.style))];
        setStyles(uniqueStyles);
      }

      if (regionsData) {
        const uniqueRegions = [...new Set(regionsData.map(item => item.region))];
        setRegions(uniqueRegions);
      }
    };

    fetchFilters();
  }, []);

  const handleStyleChange = (style: string) => {
    setSelectedStyle(style);
    onChange({ style, region: selectedRegion });
  };

  const handleRegionChange = (region: string) => {
    setSelectedRegion(region);
    onChange({ style: selectedStyle, region });
  };

  return (
    <div className="flex flex-wrap gap-4">
      <div className="flex-1 min-w-[200px]">
        <select
          value={selectedStyle}
          onChange={(e) => handleStyleChange(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
        >
          <option value="">All Styles</option>
          {styles.map((style) => (
            <option key={style} value={style}>
              {style}
            </option>
          ))}
        </select>
      </div>
      <div className="flex-1 min-w-[200px]">
        <select
          value={selectedRegion}
          onChange={(e) => handleRegionChange(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
        >
          <option value="">All Regions</option>
          {regions.map((region) => (
            <option key={region} value={region}>
              {region}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};
