
import React from 'react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Badge } from '@/components/ui/badge';
import { AlertCircle, AlertTriangle, CheckCircle2 } from 'lucide-react';
import { KPI } from '@/contexts/SchemesContext';

interface KPIAlertSystemProps {
  kpis: KPI[];
}

const KPIAlertSystem: React.FC<KPIAlertSystemProps> = ({ kpis }) => {
  // Calculate alerts based on KPI performance
  const criticalAlerts = kpis.filter(kpi => {
    const progressPercentage = (kpi.dataPoints.currentValue / kpi.dataPoints.targetValue) * 100;
    return progressPercentage < 60;
  });

  const warningAlerts = kpis.filter(kpi => {
    const progressPercentage = (kpi.dataPoints.currentValue / kpi.dataPoints.targetValue) * 100;
    return progressPercentage >= 60 && progressPercentage < 80;
  });

  const goodPerformers = kpis.filter(kpi => {
    const progressPercentage = (kpi.dataPoints.currentValue / kpi.dataPoints.targetValue) * 100;
    return progressPercentage >= 90;
  });

  return (
    <div className="space-y-4">
      {criticalAlerts.length > 0 && (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Critical KPI Alerts</AlertTitle>
          <AlertDescription>
            <div className="mt-2">
              <p className="text-sm mb-2">The following KPIs need immediate attention:</p>
              <div className="flex flex-wrap gap-2">
                {criticalAlerts.map((kpi) => (
                  <Badge key={kpi.id} variant="destructive" className="text-xs">
                    {kpi.name} ({Math.round((kpi.dataPoints.currentValue / kpi.dataPoints.targetValue) * 100)}%)
                  </Badge>
                ))}
              </div>
            </div>
          </AlertDescription>
        </Alert>
      )}

      {warningAlerts.length > 0 && (
        <Alert className="border-amber-200 bg-amber-50">
          <AlertTriangle className="h-4 w-4 text-amber-600" />
          <AlertTitle className="text-amber-800">KPI Warnings</AlertTitle>
          <AlertDescription className="text-amber-800">
            <div className="mt-2">
              <p className="text-sm mb-2">These KPIs are below target and need attention:</p>
              <div className="flex flex-wrap gap-2">
                {warningAlerts.map((kpi) => (
                  <Badge key={kpi.id} variant="outline" className="text-xs text-amber-800 bg-amber-100 border-amber-200">
                    {kpi.name} ({Math.round((kpi.dataPoints.currentValue / kpi.dataPoints.targetValue) * 100)}%)
                  </Badge>
                ))}
              </div>
            </div>
          </AlertDescription>
        </Alert>
      )}

      {goodPerformers.length > 0 && (
        <Alert variant="default" className="border-green-200 bg-green-50">
          <CheckCircle2 className="h-4 w-4 text-green-600" />
          <AlertTitle className="text-green-800">Good Performance</AlertTitle>
          <AlertDescription className="text-green-800">
            <div className="mt-2">
              <p className="text-sm mb-2">These KPIs are performing well:</p>
              <div className="flex flex-wrap gap-2">
                {goodPerformers.map((kpi) => (
                  <Badge key={kpi.id} className="text-xs bg-green-100 text-green-800 hover:bg-green-200">
                    {kpi.name} ({Math.round((kpi.dataPoints.currentValue / kpi.dataPoints.targetValue) * 100)}%)
                  </Badge>
                ))}
              </div>
            </div>
          </AlertDescription>
        </Alert>
      )}
      
      {criticalAlerts.length === 0 && warningAlerts.length === 0 && goodPerformers.length === 0 && (
        <Alert>
          <AlertTitle>No KPI alerts</AlertTitle>
          <AlertDescription>
            There are currently no KPIs that require attention.
          </AlertDescription>
        </Alert>
      )}
    </div>
  );
};

export default KPIAlertSystem;
