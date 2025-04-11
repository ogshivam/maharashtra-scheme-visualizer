
import { useState } from "react";
import { useParams } from "react-router-dom";
import Header from "@/components/Header";
import CategoryNavigation from "@/components/CategoryNavigation";
import SchemeCard from "@/components/SchemeCard";
import EditKPIModal from "@/components/EditKPIModal";
import EditSchemeModal from "@/components/EditSchemeModal";
import { useSchemes, KPI, Scheme } from "@/contexts/SchemesContext";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";

const Dashboard = () => {
  const { categoryId } = useParams<{ categoryId?: string }>();
  const { schemeCategories, updateKPI, updateScheme } = useSchemes();
  const { toast } = useToast();
  
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
  
  // Filter schemes by category if a category is selected
  const displayedCategories = categoryId
    ? schemeCategories.filter(category => category.id === categoryId)
    : schemeCategories;
  
  // Handle KPI editing
  const handleEditKPI = (categoryId: string, schemeId: string, kpiId: string) => {
    const category = schemeCategories.find(c => c.id === categoryId);
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
    const category = schemeCategories.find(c => c.id === categoryId);
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
        <CategoryNavigation 
          categories={schemeCategories} 
          activeCategory={categoryId || null} 
        />
        
        {displayedCategories.map((category) => (
          <div key={category.id} className="mb-10">
            <div className="flex items-baseline justify-between mb-4">
              <h2 className="text-2xl font-bold">{category.name}</h2>
              <div className="h-[1px] flex-1 bg-gray-200 ml-4"></div>
            </div>
            
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
            
            {/* Spacer for the last category */}
            {category === displayedCategories[displayedCategories.length - 1] && (
              <div className="h-20"></div>
            )}
          </div>
        ))}
        
        {displayedCategories.length === 0 && (
          <div className="text-center py-12">
            <h3 className="text-lg font-medium mb-2">No data available</h3>
            <p className="text-muted-foreground">Select a different category or return to all categories.</p>
            
            <Button 
              className="mt-4 bg-dashboardBlue hover:bg-dashboardBlue/90"
              asChild
            >
              <a href="/dashboard">View All Categories</a>
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

export default Dashboard;
