
import { useSchemes } from "@/contexts/SchemesContext";
import Header from "@/components/Header";
import SchemeCard from "@/components/SchemeCard";
import { useState } from "react";
import EditKPIModal from "@/components/EditKPIModal";
import EditSchemeModal from "@/components/EditSchemeModal";
import { KPI, Scheme } from "@/contexts/SchemesContext";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/components/ui/use-toast";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const EconomicGrowthPage = () => {
  const { schemeCategories, updateKPI, updateScheme } = useSchemes();
  const { toast } = useToast();
  const { userRole } = useAuth();
  
  // Find the Economic Growth & Financial Management category
  const category = schemeCategories.find(cat => cat.id === "egfm");
  
  // State for modals
  const [selectedKPI, setSelectedKPI] = useState<{
    kpi: KPI | null;
    categoryId: string;
    schemeId: string;
  }>({
    kpi: null,
    categoryId: "",
    schemeId: ""
  });
  
  const [selectedScheme, setSelectedScheme] = useState<{
    scheme: Scheme | null;
    categoryId: string;
  }>({
    scheme: null,
    categoryId: ""
  });

  // Handle KPI editing
  const handleEditKPI = (categoryId: string, schemeId: string, kpiId: string) => {
    if (!category) return;
    
    const scheme = category.schemes.find(s => s.id === schemeId);
    if (!scheme) return;
    
    const kpi = scheme.kpis.find(k => k.id === kpiId);
    if (!kpi) return;
    
    setSelectedKPI({
      kpi,
      categoryId,
      schemeId
    });
  };
  
  // Handle scheme editing
  const handleEditScheme = (categoryId: string, schemeId: string) => {
    if (!category) return;
    
    const scheme = category.schemes.find(s => s.id === schemeId);
    if (!scheme) return;
    
    setSelectedScheme({
      scheme,
      categoryId
    });
  };
  
  // Save KPI changes
  const handleSaveKPI = (updatedKPI: Partial<KPI>) => {
    if (selectedKPI.kpi) {
      updateKPI(
        selectedKPI.categoryId,
        selectedKPI.schemeId,
        selectedKPI.kpi.id,
        updatedKPI
      );
      
      toast({
        title: "KPI Updated",
        description: `${selectedKPI.kpi.name} has been successfully updated.`,
      });
      
      setSelectedKPI({
        kpi: null,
        categoryId: "",
        schemeId: ""
      });
    }
  };
  
  // Save scheme changes
  const handleSaveScheme = (updatedScheme: Partial<Scheme>) => {
    if (selectedScheme.scheme) {
      updateScheme(
        selectedScheme.categoryId,
        selectedScheme.scheme.id,
        updatedScheme
      );
      
      toast({
        title: "Scheme Updated",
        description: `${selectedScheme.scheme.name} has been successfully updated.`,
      });
      
      setSelectedScheme({
        scheme: null,
        categoryId: ""
      });
    }
  };
  
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />
      
      <main className="flex-1 container py-8">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">Economic Growth & Financial Management</h1>
          <Button asChild variant="outline">
            <Link to="/dashboard">View All Categories</Link>
          </Button>
        </div>
        
        {category ? (
          <div>
            {category.schemes.map((scheme) => (
              <SchemeCard
                key={scheme.id}
                scheme={scheme}
                onEditKPI={(schemeId, kpiId) => 
                  handleEditKPI(category.id, schemeId, kpiId)
                }
                onEditScheme={(schemeId) => 
                  handleEditScheme(category.id, schemeId)
                }
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <h3 className="text-lg font-medium mb-2">Category not found</h3>
            <Button asChild className="mt-4">
              <Link to="/dashboard">Return to Dashboard</Link>
            </Button>
          </div>
        )}
      </main>
      
      {/* Modals */}
      <EditKPIModal
        open={!!selectedKPI.kpi}
        onClose={() => setSelectedKPI({ kpi: null, categoryId: "", schemeId: "" })}
        kpi={selectedKPI.kpi}
        onSave={handleSaveKPI}
      />
      
      <EditSchemeModal
        open={!!selectedScheme.scheme}
        onClose={() => setSelectedScheme({ scheme: null, categoryId: "" })}
        scheme={selectedScheme.scheme}
        onSave={handleSaveScheme}
      />
    </div>
  );
};

export default EconomicGrowthPage;
