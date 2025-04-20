
import React, { useState } from 'react';
import { getAllDistricts, getDepartments, getSchemes } from '../utils/dataUtils';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { District, Department, Scheme, KPI } from '../types/schemeTypes';
import KPICard from './KPICard';

const DistrictDataView: React.FC = () => {
  const [selectedDistrict, setSelectedDistrict] = useState<District | null>(null);
  const [selectedDepartment, setSelectedDepartment] = useState<Department | null>(null);
  const [selectedScheme, setSelectedScheme] = useState<Scheme | null>(null);
  
  const districts = getAllDistricts();
  const departments = selectedDistrict ? getDepartments(selectedDistrict.districtCode) : [];
  const schemes = selectedDistrict && selectedDepartment 
    ? getSchemes(selectedDistrict.districtCode, selectedDepartment.departmentCode) 
    : [];

  const handleDistrictSelect = (district: District) => {
    setSelectedDistrict(district);
    setSelectedDepartment(null);
    setSelectedScheme(null);
  };

  const handleDepartmentSelect = (department: Department) => {
    setSelectedDepartment(department);
    setSelectedScheme(null);
  };

  const handleSchemeSelect = (scheme: Scheme) => {
    setSelectedScheme(scheme);
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">District-based Dashboard</h2>
      
      <div className="grid grid-cols-1 gap-4 mb-6">
        <Card>
          <CardHeader>
            <CardTitle>Select District</CardTitle>
            <CardDescription>Choose a district to view its departments</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
              {districts.map((district) => (
                <button
                  key={district.districtCode}
                  className={`p-3 rounded border ${
                    selectedDistrict?.districtCode === district.districtCode
                      ? 'bg-primary text-primary-foreground'
                      : 'bg-card hover:bg-accent'
                  }`}
                  onClick={() => handleDistrictSelect(district)}
                >
                  {district.districtName}
                </button>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
      
      {selectedDistrict && (
        <div className="grid grid-cols-1 gap-4 mb-6">
          <Card>
            <CardHeader>
              <CardTitle>Departments in {selectedDistrict.districtName}</CardTitle>
              <CardDescription>Choose a department to view its schemes</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                {departments.map((department) => (
                  <button
                    key={department.departmentCode}
                    className={`p-3 rounded border ${
                      selectedDepartment?.departmentCode === department.departmentCode
                        ? 'bg-primary text-primary-foreground'
                        : 'bg-card hover:bg-accent'
                    }`}
                    onClick={() => handleDepartmentSelect(department)}
                  >
                    {department.departmentName}
                  </button>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      )}
      
      {selectedDistrict && selectedDepartment && (
        <div className="grid grid-cols-1 gap-4 mb-6">
          <Card>
            <CardHeader>
              <CardTitle>
                Schemes in {selectedDepartment.departmentName}
              </CardTitle>
              <CardDescription>Choose a scheme to view its KPIs</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                {schemes.map((scheme) => (
                  <button
                    key={scheme.schemeCode}
                    className={`p-3 rounded border text-left ${
                      selectedScheme?.schemeCode === scheme.schemeCode
                        ? 'bg-primary text-primary-foreground'
                        : 'bg-card hover:bg-accent'
                    }`}
                    onClick={() => handleSchemeSelect(scheme)}
                  >
                    <div className="font-medium">{scheme.schemeName}</div>
                    <div className="text-xs opacity-70">{scheme.description}</div>
                  </button>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      )}
      
      {selectedScheme && (
        <div className="grid grid-cols-1 gap-4">
          <h3 className="text-xl font-semibold mt-4">KPIs for {selectedScheme.schemeName}</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {selectedScheme.kpis.map((kpi) => (
              <KPICard
                key={kpi.kpiId}
                kpi={{
                  id: kpi.kpiId,
                  name: kpi.kpiName,
                  description: kpi.description,
                  dataPoints: {
                    currentValue: kpi.currentValue,
                    targetValue: kpi.targetValue,
                    unit: kpi.unit
                  },
                  chartType: kpi.chartType as "gauge" | "bar" | "line" | "pie",
                  trend: kpi.trend as "up" | "down" | "stable",
                  minValue: kpi.minValue,
                  maxValue: kpi.maxValue,
                  historicalData: kpi.historicalData.map(item => ({
                    date: item.month,
                    value: item.value
                  }))
                }}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default DistrictDataView;
