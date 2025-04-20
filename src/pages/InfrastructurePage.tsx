import React, { useState, useEffect } from 'react';
import Header from '@/components/Header';
import SchemeCard from '@/components/SchemeCard';
import { useSchemes } from '@/contexts/SchemesContext';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import EditKPIModal from '@/components/EditKPIModal';
import EditSchemeModal from '@/components/EditSchemeModal';
import { KPI, Scheme } from '@/contexts/SchemesContext';
import { useAuth } from '@/contexts/AuthContext';

const InfrastructurePage = () => {
  const { schemes: allSchemes, editKPI, editScheme } = useSchemes();
  const [schemes, setSchemes] = useState(allSchemes);
  const [editKPIModalOpen, setEditKPIModalOpen] = useState(false);
  const [editSchemeModalOpen, setEditSchemeModalOpen] = useState(false);
  const [selectedSchemeId, setSelectedSchemeId] = useState<string | null>(null);
  const [selectedKPIKey, setSelectedKPIKey] = useState<string | null>(null);
  const navigate = useNavigate();
  const { userRole } = useAuth();
  const isAdmin = userRole === 'admin';
  
  useEffect(() => {
    // Filter schemes based on the category when the component mounts or when allSchemes changes
    const filteredSchemes = allSchemes.filter(scheme => scheme.category === 'iud');
    setSchemes(filteredSchemes);
  }, [allSchemes]);

  const handleEditKPI = (schemeId: string, kpiKey: string) => {
    setSelectedSchemeId(schemeId);
    setSelectedKPIKey(kpiKey);
    setEditKPIModalOpen(true);
  };
  
  const handleEditScheme = (schemeId: string) => {
    setSelectedSchemeId(schemeId);
    setEditSchemeModalOpen(true);
  };

  const closeEditKPIModal = () => {
    setEditKPIModalOpen(false);
    setSelectedSchemeId(null);
    setSelectedKPIKey(null);
  };
  
  const closeEditSchemeModal = () => {
    setEditSchemeModalOpen(false);
    setSelectedSchemeId(null);
  };

  const saveKPIChanges = (updatedKPI: Partial<KPI>) => {
    if (selectedSchemeId && selectedKPIKey) {
      editKPI(selectedSchemeId, selectedKPIKey, updatedKPI);
      closeEditKPIModal();
    }
  };
  
  const saveSchemeChanges = (updatedScheme: Partial<Scheme>) => {
    if (selectedSchemeId) {
      editScheme(selectedSchemeId, updatedScheme);
      closeEditSchemeModal();
    }
  };

  const selectedScheme = selectedSchemeId ? schemes.find(scheme => scheme.id === selectedSchemeId) : null;
  const selectedKPI = selectedSchemeId && selectedKPIKey && selectedScheme?.KPIs ? selectedScheme.KPIs[selectedKPIKey] : null;
  
  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold">Infrastructure & Urban Development</h2>
        <div>
          <Button variant="outline" onClick={() => navigate('/dashboard')}>
            Back to Dashboard
          </Button>
        </div>
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
        
        <EditKPIModal
          open={editKPIModalOpen}
          onClose={closeEditKPIModal}
          kpi={selectedKPI || null}
          onSave={saveKPIChanges}
        />
        
        <EditSchemeModal
          open={editSchemeModalOpen}
          onClose={closeEditSchemeModal}
          scheme={selectedScheme || null}
          onSave={saveSchemeChanges}
        />
      </div>
    </div>
  );
};

export default InfrastructurePage;
