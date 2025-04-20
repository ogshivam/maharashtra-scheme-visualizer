
import React from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ChevronRight, ArrowUpRight, ArrowDownRight, ArrowRight } from 'lucide-react';
import { District } from '@/types/schemeTypes';

interface DistrictOverviewProps {
  districts: District[];
  onViewDistrict: (districtCode: string) => void;
}

const DistrictOverview: React.FC<DistrictOverviewProps> = ({ districts, onViewDistrict }) => {
  // Calculate district performance metrics
  const getPerformanceMetrics = (district: District) => {
    let totalKPIs = 0;
    let totalProgress = 0;
    let improving = 0;
    let declining = 0;
    let stable = 0;

    district.departments.forEach(dept => {
      dept.schemes.forEach(scheme => {
        scheme.kpis.forEach(kpi => {
          totalKPIs++;
          const progress = (kpi.currentValue / kpi.targetValue) * 100;
          totalProgress += progress;
          
          if (kpi.trend === 'up') improving++;
          else if (kpi.trend === 'down') declining++;
          else stable++;
        });
      });
    });

    const averageProgress = totalKPIs > 0 ? totalProgress / totalKPIs : 0;
    
    return {
      averageProgress,
      totalKPIs,
      improving,
      declining,
      stable
    };
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">District Overview</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {districts.map((district) => {
          const metrics = getPerformanceMetrics(district);
          
          return (
            <Card key={district.districtCode} className="overflow-hidden transition-all hover:shadow-md">
              <CardHeader className="pb-2">
                <CardTitle>{district.districtName}</CardTitle>
                <CardDescription>
                  {district.departments.length} Departments | {metrics.totalKPIs} KPIs
                </CardDescription>
              </CardHeader>
              
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between mb-1 text-sm">
                      <span>Overall Progress</span>
                      <span>{metrics.averageProgress.toFixed(1)}%</span>
                    </div>
                    <Progress value={metrics.averageProgress} className="h-2" />
                  </div>
                  
                  <div className="flex gap-2">
                    {metrics.improving > 0 && (
                      <Badge className="bg-green-100 text-green-800 hover:bg-green-200">
                        <ArrowUpRight className="h-3 w-3 mr-1" />
                        {metrics.improving} Improving
                      </Badge>
                    )}
                    
                    {metrics.declining > 0 && (
                      <Badge variant="destructive" className="bg-red-100 text-red-800 hover:bg-red-200">
                        <ArrowDownRight className="h-3 w-3 mr-1" />
                        {metrics.declining} Declining
                      </Badge>
                    )}
                    
                    {metrics.stable > 0 && (
                      <Badge variant="outline">
                        <ArrowRight className="h-3 w-3 mr-1" />
                        {metrics.stable} Stable
                      </Badge>
                    )}
                  </div>
                </div>
              </CardContent>
              
              <CardFooter className="pt-0">
                <Button variant="ghost" size="sm" className="w-full justify-between" 
                  onClick={() => onViewDistrict(district.districtCode)}>
                  View Details
                  <ChevronRight className="h-4 w-4 ml-2" />
                </Button>
              </CardFooter>
            </Card>
          );
        })}
      </div>
    </div>
  );
};

export default DistrictOverview;
