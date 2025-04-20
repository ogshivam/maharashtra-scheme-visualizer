
import React, { useState } from 'react';
import SchemeCard from '@/components/SchemeCard';
import { useSchemes } from '@/contexts/SchemesContext';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';
import EditKPIModal from '@/components/EditKPIModal';
import EditSchemeModal from '@/components/EditSchemeModal';
import { KPI, Scheme } from '@/contexts/SchemesContext';

const EconomicGrowthPage = () => {
  const { getSchemesByCategory, editKPI, editScheme } = useSchemes();
  const { userRole } = useAuth();
  const isAdmin = userRole === 'admin';
  
  const [isEditKPIModalOpen, setIsEditKPIModalOpen] = useState(false);
  const [isEditSchemeModalOpen, setIsEditSchemeModalOpen] = useState(false);
  const [selectedSchemeId, setSelectedSchemeId] = useState<string | null>(null);
  const [selectedKpiKey, setSelectedKpiKey] = useState<string | null>(null);
  
  const schemes = getSchemesByCategory('egfm');
  
  const handleEditKPI = (schemeId: string, kpiKey: string) => {
    setSelectedSchemeId(schemeId);
    setSelectedKpiKey(kpiKey);
    setIsEditKPIModalOpen(true);
  };
  
  const handleEditScheme = (schemeId: string) => {
    setSelectedSchemeId(schemeId);
    setIsEditSchemeModalOpen(true);
  };
  
  const closeEditKPIModal = () => {
    setIsEditKPIModalOpen(false);
    setSelectedSchemeId(null);
    setSelectedKpiKey(null);
  };
  
  const closeEditSchemeModal = () => {
    setIsEditSchemeModalOpen(false);
    setSelectedSchemeId(null);
  };
  
  const getSelectedScheme = () => {
    if (!selectedSchemeId) return null;
    return schemes.find(scheme => scheme.id === selectedSchemeId) || null;
  };
  
  const getSelectedKPI = () => {
    const selectedScheme = getSelectedScheme();
    if (!selectedScheme || !selectedKpiKey) return null;
    return selectedScheme.KPIs[selectedKpiKey] || null;
  };
  
  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold">Economic Growth & Financial Management</h2>
        {isAdmin && (
          <div>
            <Button onClick={() => alert('Add Scheme functionality not implemented yet.')}>
              Add Scheme
            </Button>
          </div>
        )}
      </div>
      
      <div className="space-y-6">
        {schemes.map((scheme) => (
          <SchemeCard
            key={scheme.id}
            scheme={scheme}
            onEditKPI={isAdmin ? handleEditKPI : undefined}
            onEditScheme={isAdmin ? handleEditScheme : undefined}
          />
        ))}
        
        {isEditKPIModalOpen && (
          <EditKPIModal
            open={isEditKPIModalOpen}
            onClose={closeEditKPIModal}
            kpi={getSelectedKPI()}
            onSave={(updatedKPI) => {
              if (selectedSchemeId && selectedKpiKey) {
                editKPI(selectedSchemeId, selectedKpiKey, updatedKPI);
              }
              closeEditKPIModal();
            }}
          />
        )}
        
        {isEditSchemeModalOpen && (
          <EditSchemeModal
            open={isEditSchemeModalOpen}
            onClose={closeEditSchemeModal}
            scheme={getSelectedScheme()}
            onSave={(updatedScheme) => {
              if (selectedSchemeId) {
                editScheme(selectedSchemeId, updatedScheme);
              }
              closeEditSchemeModal();
            }}
          />
        )}
      </div>
    </div>
  );
};

export default EconomicGrowthPage;
