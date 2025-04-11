
import { Card } from "@/components/ui/card";
import { ArrowDown, ArrowRight, ArrowUp } from "lucide-react";
import { KPI } from "@/contexts/SchemesContext";
import GaugeChart from "./charts/GaugeChart";
import BarChart from "./charts/BarChart";
import LineChart from "./charts/LineChart";
import PieChart from "./charts/PieChart";

interface KPICardProps {
  kpi: KPI;
  isAdmin?: boolean;
  onEdit?: (kpi: KPI) => void;
}

const KPICard = ({ kpi, isAdmin = false, onEdit }: KPICardProps) => {
  const renderTrendIcon = (trend: string) => {
    switch (trend) {
      case 'up':
        return <ArrowUp className="up-trend" />;
      case 'down':
        return <ArrowDown className="down-trend" />;
      default:
        return <ArrowRight className="stable-trend" />;
    }
  };

  const renderChart = (kpi: KPI) => {
    const { chartType, currentValue, targetValue, minValue, maxValue, unit, historicalData } = kpi;
    
    switch (chartType) {
      case 'gauge':
        return (
          <GaugeChart 
            value={currentValue} 
            target={targetValue} 
            min={minValue} 
            max={maxValue} 
            unit={unit} 
          />
        );
      case 'bar':
        return (
          <BarChart 
            data={historicalData} 
            currentValue={currentValue} 
            targetValue={targetValue} 
            unit={unit} 
          />
        );
      case 'line':
        return (
          <LineChart 
            data={historicalData} 
            currentValue={currentValue} 
            targetValue={targetValue} 
            unit={unit}
            trend={kpi.trend}
          />
        );
      case 'pie':
        return (
          <PieChart 
            value={currentValue} 
            target={targetValue} 
            unit={unit} 
          />
        );
      default:
        return (
          <div className="p-4 text-center text-muted-foreground">
            Chart type not supported
          </div>
        );
    }
  };

  return (
    <Card className="overflow-hidden">
      <div className="p-4 border-b flex items-center justify-between">
        <h3 className="text-sm font-semibold">{kpi.name}</h3>
        <div className="flex items-center gap-2">
          <div className="flex items-center text-sm">
            <span className="font-medium">{kpi.currentValue}{kpi.unit}</span>
            <span className="mx-1 text-muted-foreground">/</span>
            <span className="text-muted-foreground">{kpi.targetValue}{kpi.unit}</span>
          </div>
          <div>{renderTrendIcon(kpi.trend)}</div>
        </div>
      </div>
      
      <div className="p-4">
        {renderChart(kpi)}
      </div>
      
      {isAdmin && (
        <div className="p-2 bg-muted/50 border-t">
          <button 
            className="w-full py-1 px-2 text-xs bg-dashboardBlue text-white rounded hover:bg-dashboardBlue/90 transition-colors"
            onClick={() => onEdit && onEdit(kpi)}
          >
            Edit KPI
          </button>
        </div>
      )}
    </Card>
  );
};

export default KPICard;
