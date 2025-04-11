
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Scheme } from "@/contexts/SchemesContext";
import KPICard from "./KPICard";
import { useAuth } from "@/contexts/AuthContext";

interface SchemeCardProps {
  scheme: Scheme;
  onEditKPI?: (schemeId: string, kpiId: string) => void;
  onEditScheme?: (schemeId: string) => void;
}

const SchemeCard = ({ scheme, onEditKPI, onEditScheme }: SchemeCardProps) => {
  const { userRole } = useAuth();
  const isAdmin = userRole === 'admin';
  
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
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {scheme.kpis.map((kpi) => (
            <KPICard
              key={kpi.id}
              kpi={kpi}
              isAdmin={isAdmin}
              onEdit={isAdmin && onEditKPI ? () => onEditKPI(scheme.id, kpi.id) : undefined}
            />
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default SchemeCard;
