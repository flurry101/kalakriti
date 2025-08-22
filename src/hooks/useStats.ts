import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';

export const useStats = () => {
  const [stats, setStats] = useState({
    totalArtworks: 0,
    totalArtists: 0,
    totalRegions: 0
  });

  useEffect(() => {
    const fetchStats = async () => {
      const [artworksCount, artistsCount, regionsCount] = await Promise.all([
        supabase.from('artworks').select('id', { count: 'exact' }),
        supabase.from('profiles').select('id', { count: 'exact' }),
        supabase.from('artworks').select('region', { count: 'exact', distinct: true })
      ]);

      setStats({
        totalArtworks: artworksCount.count || 0,
        totalArtists: artistsCount.count || 0,
        totalRegions: regionsCount.count || 0
      });
    };

    fetchStats();
  }, []);

  return stats;
};
