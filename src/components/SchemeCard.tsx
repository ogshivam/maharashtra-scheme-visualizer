import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Scheme } from "@/contexts/SchemesContext";
import KPICard from "./KPICard";
import { useAuth } from "@/contexts/AuthContext";

interface SchemeCardProps {
  scheme: Scheme;
  onEditKPI?: (schemeId: string, kpiKey: string) => void;
  onEditScheme?: (schemeId: string) => void;
}

const SchemeCard = ({ scheme, onEditKPI, onEditScheme }: SchemeCardProps) => {
  const { userRole } = useAuth();
  const isAdmin = userRole === 'admin';
  
  // Convert KPIs object to array and ensure consistent order
  const kpiEntries = Object.entries(scheme.KPIs);
  
  // Function to get KPI card if it exists at index
  const getKPICard = (index: number) => {
    if (index < kpiEntries.length) {
      const [kpiKey, kpi] = kpiEntries[index];
      return (
        <KPICard
          key={kpiKey}
          kpi={kpi}
          isAdmin={isAdmin}
          onEdit={isAdmin && onEditKPI ? () => onEditKPI(scheme.id, kpiKey) : undefined}
        />
      );
    }
    return null;
  };
  
  return (
    <Card className="w-full mb-6">
      <CardHeader className="relative pb-2">
        <div className="flex justify-between items-start">
          <div>
            <CardTitle>{scheme.name}</CardTitle>
            <CardDescription>{scheme.description}</CardDescription>
          </div>
          
          {isAdmin && onEditScheme && (
            <button 
              className="px-3 py-1 text-xs bg-dashboardBlue text-white rounded hover:bg-dashboardBlue/90 transition-colors"
              onClick={() => onEditScheme(scheme.id)}
            >
              Edit Scheme
            </button>
          )}
        </div>
      </CardHeader>
      
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 auto-rows-fr">
          {/* Top Left Quadrant */}
          <div className="min-h-[300px]">
            {getKPICard(0)}
          </div>
          
          {/* Top Right Quadrant */}
          <div className="min-h-[300px]">
            {getKPICard(1)}
          </div>
          
          {/* Bottom Left Quadrant */}
          <div className="min-h-[300px]">
            {getKPICard(2)}
          </div>
          
          {/* Bottom Right Quadrant */}
          <div className="min-h-[300px]">
            {getKPICard(3)}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default SchemeCard;
