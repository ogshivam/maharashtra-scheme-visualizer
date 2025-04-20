
import React, { useState } from 'react';
import { useSchemes } from '@/contexts/SchemesContext';
import { useAuth } from '@/contexts/AuthContext';
import SchemeCard from '@/components/SchemeCard';
import EditKPIModal from '@/components/EditKPIModal';
import EditSchemeModal from '@/components/EditSchemeModal';
import { Button } from '@/components/ui/button';
import { KPI, Scheme } from '@/contexts/SchemesContext';
import { toast } from 'sonner';

const EnvironmentalPage = () => {
  const { getSchemesByCategory, editKPI, editScheme } = useSchemes();
  const { userRole } = useAuth();
  const isAdmin = userRole === 'admin';
  
  const schemes = getSchemesByCategory('eps');
  
  const [editingKPI, setEditingKPI] = useState<{ kpi: KPI | null; schemeId: string | null }>({
    kpi: null,
    schemeId: null,
  });
  
  const [editingScheme, setEditingScheme] = useState<Scheme | null>(null);
  
  const handleEditKPI = (schemeId: string, kpiKey: string) => {
    const scheme = schemes.find((s) => s.id === schemeId);
    if (scheme && scheme.KPIs[kpiKey]) {
      setEditingKPI({
        kpi: { ...scheme.KPIs[kpiKey], id: kpiKey },
        schemeId,
      });
    }
  };
  
  const handleSaveKPI = (updatedKPI: Partial<KPI>) => {
    if (editingKPI.schemeId && editingKPI.kpi?.id) {
      editKPI(editingKPI.schemeId, editingKPI.kpi.id, updatedKPI);
      setEditingKPI({ kpi: null, schemeId: null });
      toast.success("KPI updated successfully");
    }
  };
  
  const handleEditScheme = (schemeId: string) => {
    const scheme = schemes.find((s) => s.id === schemeId);
    if (scheme) {
      setEditingScheme(scheme);
    }
  };
  
  const handleSaveScheme = (updatedScheme: Partial<Scheme>) => {
    if (editingScheme?.id) {
      editScheme(editingScheme.id, updatedScheme);
      setEditingScheme(null);
      toast.success("Scheme updated successfully");
    }
  };

  const handleAddScheme = () => {
    toast.info("Add Scheme functionality will be implemented soon");
    // This would be implemented to add a new scheme
  };
  
  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold">Environmental Protection & Sustainability</h2>
        {isAdmin && (
          <Button variant="outline" size="sm" onClick={handleAddScheme}>
            Add New Scheme
          </Button>
        )}
      </div>
      
      {schemes.length === 0 ? (
        <div className="text-center py-12 border rounded-md bg-gray-50">
          <p className="text-muted-foreground">No environmental schemes found. Add a new scheme to get started.</p>
        </div>
      ) : (
        <div className="space-y-6">
          {schemes.map((scheme) => (
            <SchemeCard
              key={scheme.id}
              scheme={scheme}
              onEditKPI={isAdmin ? handleEditKPI : undefined}
              onEditScheme={isAdmin ? handleEditScheme : undefined}
            />
          ))}
        </div>
      )}
      
      <EditKPIModal
        open={!!editingKPI.kpi}
        onClose={() => setEditingKPI({ kpi: null, schemeId: null })}
        kpi={editingKPI.kpi}
        onSave={handleSaveKPI}
      />
      
      <EditSchemeModal
        open={!!editingScheme}
        onClose={() => setEditingScheme(null)}
        scheme={editingScheme}
        onSave={handleSaveScheme}
      />
    </div>
  );
};

export default EnvironmentalPage;
