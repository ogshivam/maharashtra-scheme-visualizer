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
        return <ArrowUp className="up-trend text-green-500" />;
      case 'down':
        return <ArrowDown className="down-trend text-red-500" />;
      default:
        return <ArrowRight className="stable-trend text-blue-500" />;
    }
  };

  const formatValue = (value: number, unit: string) => {
    if (value >= 1000) {
      return `${(value / 1000).toFixed(1)}k${unit}`;
    }
    return `${value}${unit}`;
  };

  const renderChart = (kpi: KPI) => {
    const { chartType, dataPoints, minValue, maxValue, historicalData } = kpi;
    const { currentValue, targetValue, unit } = dataPoints;
    
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
      <div className="p-4 border-b">
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1 min-w-0">
            <h3 className="text-sm font-semibold leading-tight line-clamp-2">{kpi.name}</h3>
            <p className="text-xs text-muted-foreground mt-1 line-clamp-2">{kpi.description}</p>
          </div>
          <div className="flex items-center gap-2 flex-shrink-0">
            <div className="flex items-center text-sm whitespace-nowrap">
              <span className="font-medium">{formatValue(kpi.dataPoints.currentValue, kpi.dataPoints.unit)}</span>
              <span className="mx-1 text-muted-foreground">/</span>
              <span className="text-muted-foreground">{formatValue(kpi.dataPoints.targetValue, kpi.dataPoints.unit)}</span>
            </div>
            <div>{renderTrendIcon(kpi.trend)}</div>
          </div>
        </div>
      </div>
      
      <div className="p-4">
        {renderChart(kpi)}
      </div>
      
      {isAdmin && onEdit && (
        <div className="p-2 bg-muted/50 border-t">
          <button 
            className="w-full py-1 px-2 text-xs bg-dashboardBlue text-white rounded hover:bg-dashboardBlue/90 transition-colors"
            onClick={() => onEdit(kpi)}
          >
            Edit KPI
          </button>
        </div>
      )}
    </Card>
  );
};

export default KPICard;
