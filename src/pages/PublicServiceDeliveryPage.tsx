
import React, { useState } from 'react';
import SchemeCard from '@/components/SchemeCard';
import { useSchemes } from '@/contexts/SchemesContext';
import { Button } from '@/components/ui/button';
import EditKPIModal from '@/components/EditKPIModal';
import EditSchemeModal from '@/components/EditSchemeModal';
import { useAuth } from '@/contexts/AuthContext';
import { KPI, Scheme } from '@/contexts/SchemesContext';

const PublicServiceDeliveryPage = () => {
  const { getSchemesByCategory, editKPI, editScheme } = useSchemes();
  const { userRole } = useAuth();
  const isAdmin = userRole === 'admin';
  
  // Get schemes for public service delivery category
  const schemes = getSchemesByCategory('psd');
  
  const [selectedSchemeId, setSelectedSchemeId] = useState<string | null>(null);
  const [selectedKpiKey, setSelectedKpiKey] = useState<string | null>(null);
  const [isEditKPIModalOpen, setIsEditKPIModalOpen] = useState(false);
  const [isEditSchemeModalOpen, setIsEditSchemeModalOpen] = useState(false);
  
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
  
  const handleSaveKPI = (updatedKPI: any) => {
    if (selectedSchemeId && selectedKpiKey) {
      editKPI(selectedSchemeId, selectedKpiKey, updatedKPI);
      closeEditKPIModal();
    }
  };
  
  const handleSaveScheme = (updatedScheme: any) => {
    if (selectedSchemeId) {
      editScheme(selectedSchemeId, updatedScheme);
      closeEditSchemeModal();
    }
  };
  
  const selectedScheme = selectedSchemeId ? schemes.find(scheme => scheme.id === selectedSchemeId) : null;
  const selectedKPI = selectedScheme && selectedKpiKey ? selectedScheme.KPIs[selectedKpiKey] : null;
  
  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold">Public Service Delivery</h2>
        {isAdmin && (
          <Button>
            Add Scheme
          </Button>
        )}
      </div>
      
      <div className="space-y-6">
        {schemes && schemes.map((scheme) => (
          <SchemeCard
            key={scheme.id}
            scheme={scheme}
            onEditKPI={isAdmin ? handleEditKPI : undefined}
            onEditScheme={isAdmin ? handleEditScheme : undefined}
          />
        ))}
        
        {isAdmin && selectedKPI && (
          <EditKPIModal
            open={isEditKPIModalOpen}
            onClose={closeEditKPIModal}
            kpi={selectedKPI}
            onSave={handleSaveKPI}
          />
        )}
        
        {isAdmin && selectedScheme && (
          <EditSchemeModal
            open={isEditSchemeModalOpen}
            onClose={closeEditSchemeModal}
            scheme={selectedScheme}
            onSave={handleSaveScheme}
          />
        )}
      </div>
    </div>
  );
};

export default PublicServiceDeliveryPage;

