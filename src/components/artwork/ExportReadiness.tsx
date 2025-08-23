import React, { useState, useEffect } from 'react';
import { supabase } from '../../lib/supabase';
import { CheckCircle, AlertCircle, Info } from 'lucide-react';

interface Standard {
  id: string;
  category: string;
  requirement: string;
  description: string;
}

interface ExportReadinessProps {
  artworkId: string;
}

export const ExportReadiness: React.FC<ExportReadinessProps> = ({ artworkId }) => {
  const [standards, setStandards] = useState<Standard[]>([]);
  const [status, setStatus] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStandards = async () => {
      const { data: standardsData } = await supabase
        .from('export_standards')
        .select('*');

      const { data: statusData } = await supabase
        .from('artwork_export_status')
        .select('*')
        .eq('artwork_id', artworkId);

      if (standardsData) {
        setStandards(standardsData);
        const statusMap: Record<string, string> = {};
        statusData?.forEach((status) => {
          statusMap[status.standard_id] = status.status;
        });
        setStatus(statusMap);
      }

      setLoading(false);
    };

    fetchStandards();
  }, [artworkId]);

  const getStatusIcon = (status: string | undefined) => {
    switch (status) {
      case 'approved':
        return <CheckCircle className="w-5 h-5 text-green-500" />;
      case 'rejected':
        return <AlertCircle className="w-5 h-5 text-red-500" />;
      default:
        return <Info className="w-5 h-5 text-gray-400" />;
    }
  };

  if (loading) {
    return (
      <div className="animate-pulse">
        <div className="h-4 bg-gray-200 rounded w-3/4 mb-4"></div>
        <div className="h-4 bg-gray-200 rounded w-1/2"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <h3 className="text-xl font-semibold">Export Readiness Checklist</h3>
      <div className="grid gap-4">
        {standards.map((standard) => (
          <div
            key={standard.id}
            className="p-4 border rounded-lg hover:border-orange-500 transition-colors"
          >
            <div className="flex items-start gap-3">
              {getStatusIcon(status[standard.id])}
              <div>
                <h4 className="font-medium">{standard.requirement}</h4>
                <p className="text-sm text-gray-600">{standard.description}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
