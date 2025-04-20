
import React, { useState } from 'react';
import Header from '@/components/Header';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { getGovData } from '@/utils/dataUtils';
import DistrictDataView from '@/components/DistrictDataView';
import KPIAlertSystem from '@/components/KPIAlertSystem';
import DistrictOverview from '@/components/DistrictOverview';
import ExportFunctionality from '@/components/ExportFunctionality';
import KPIHistoricalComparison from '@/components/KPIHistoricalComparison';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { District, KPI } from '@/types/schemeTypes';
import { useSchemes } from '@/contexts/SchemesContext';
import RoleBasedAccess from '@/components/RoleBasedAccess';

const DistrictView = () => {
  const navigate = useNavigate();
  const maharashtraData = getGovData();
  const [selectedDistrict, setSelectedDistrict] = useState<District | null>(null);
  const { schemes } = useSchemes();
  
  // Convert schemes to KPIs array for alerts
  const kpisForAlerts = schemes.flatMap(scheme => 
    Object.entries(scheme.KPIs).map(([id, kpi]) => ({
      ...kpi,
      id
    }))
  );

  const handleViewDistrict = (districtCode: string) => {
    const district = maharashtraData.districts.find(d => d.districtCode === districtCode);
    if (district) {
      setSelectedDistrict(district);
    }
  };

  // Get a sample KPI for historical comparison
  const getSampleKPI = () => {
    if (maharashtraData.districts.length && 
        maharashtraData.districts[0].departments.length && 
        maharashtraData.districts[0].departments[0].schemes.length &&
        maharashtraData.districts[0].departments[0].schemes[0].kpis.length) {
      
      return maharashtraData.districts[0].departments[0].schemes[0].kpis[0];
    }
    return null;
  };
  
  const sampleKPI = getSampleKPI();

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      <Header />
      
      <div className="container px-4 py-6 mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">District View</h1>
          <div className="flex gap-4">
            <ExportFunctionality kpis={kpisForAlerts} />
            <Button variant="outline" onClick={() => navigate('/dashboard')}>
              Switch to Category View
            </Button>
          </div>
        </div>

        <RoleBasedAccess allowedRoles={['admin', 'commissioner']}>
          <div className="mb-6">
            <KPIAlertSystem kpis={kpisForAlerts} />
          </div>
        </RoleBasedAccess>
        
        <div className="mb-8">
          <DistrictOverview 
            districts={maharashtraData.districts} 
            onViewDistrict={handleViewDistrict} 
          />
        </div>

        <Tabs defaultValue="hierarchy" className="mb-8">
          <TabsList>
            <TabsTrigger value="hierarchy">Hierarchy View</TabsTrigger>
            <TabsTrigger value="comparisons">Historical Comparisons</TabsTrigger>
          </TabsList>
          <TabsContent value="hierarchy">
            <Card>
              <CardHeader>
                <CardTitle>District-Department-Scheme Hierarchy</CardTitle>
              </CardHeader>
              <CardContent>
                <DistrictDataView initialDistrict={selectedDistrict} />
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="comparisons">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {sampleKPI && (
                <KPIHistoricalComparison
                  kpiName={sampleKPI.kpiName}
                  kpiDescription={sampleKPI.description}
                  unit={sampleKPI.unit}
                  historicalData={sampleKPI.historicalData}
                  currentValue={sampleKPI.currentValue}
                  targetValue={sampleKPI.targetValue}
                  trend={sampleKPI.trend}
                />
              )}
              {sampleKPI && (
                <KPIHistoricalComparison
                  kpiName="Monthly Growth Rate"
                  kpiDescription="Rate of improvement in KPI performance month-over-month"
                  unit="%"
                  historicalData={[
                    { month: "Jan 2025", value: 5 },
                    { month: "Feb 2025", value: 7 },
                    { month: "Mar 2025", value: 6 },
                    { month: "Apr 2025", value: 9 }
                  ]}
                  currentValue={9}
                  targetValue={10}
                  trend="up"
                />
              )}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default DistrictView;
