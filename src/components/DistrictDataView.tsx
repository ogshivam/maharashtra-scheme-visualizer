
import React, { useState, useEffect } from 'react';
import { 
  Select, 
  SelectContent, 
  SelectGroup, 
  SelectItem, 
  SelectLabel, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { getAllDistricts, getDepartments, getSchemes } from '@/utils/dataUtils';
import { District } from '@/types/schemeTypes';

interface DistrictDataViewProps {
  initialDistrict?: District | null;
}

const DistrictDataView: React.FC<DistrictDataViewProps> = ({ initialDistrict }) => {
  // Get all districts
  const districts = getAllDistricts();
  
  // State for selected values
  const [selectedDistrict, setSelectedDistrict] = useState<string>(initialDistrict?.districtCode || '');
  const [selectedDepartment, setSelectedDepartment] = useState<string>('');
  const [selectedScheme, setSelectedScheme] = useState<string>('');
  
  // State for available options based on selections
  const [departments, setDepartments] = useState<any[]>([]);
  const [schemes, setSchemes] = useState<any[]>([]);
  const [selectedSchemeData, setSelectedSchemeData] = useState<any | null>(null);

  // Update departments when district changes
  useEffect(() => {
    if (selectedDistrict) {
      const depts = getDepartments(selectedDistrict);
      setDepartments(depts);
      setSelectedDepartment('');
      setSelectedScheme('');
      setSchemes([]);
      setSelectedSchemeData(null);
    } else {
      setDepartments([]);
      setSelectedDepartment('');
      setSelectedScheme('');
      setSchemes([]);
      setSelectedSchemeData(null);
    }
  }, [selectedDistrict]);

  // Update schemes when department changes
  useEffect(() => {
    if (selectedDistrict && selectedDepartment) {
      const schemesList = getSchemes(selectedDistrict, selectedDepartment);
      setSchemes(schemesList);
      setSelectedScheme('');
      setSelectedSchemeData(null);
    } else {
      setSchemes([]);
      setSelectedScheme('');
      setSelectedSchemeData(null);
    }
  }, [selectedDistrict, selectedDepartment]);

  // Set scheme data when scheme changes
  useEffect(() => {
    if (selectedDistrict && selectedDepartment && selectedScheme) {
      const district = districts.find(d => d.districtCode === selectedDistrict);
      if (district) {
        const department = district.departments.find(d => d.departmentCode === selectedDepartment);
        if (department) {
          const scheme = department.schemes.find(s => s.schemeCode === selectedScheme);
          setSelectedSchemeData(scheme);
        }
      }
    } else {
      setSelectedSchemeData(null);
    }
  }, [selectedDistrict, selectedDepartment, selectedScheme, districts]);

  // Set initial district when prop changes
  useEffect(() => {
    if (initialDistrict) {
      setSelectedDistrict(initialDistrict.districtCode);
    }
  }, [initialDistrict]);

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* District Selection */}
        <div>
          <label className="block text-sm font-medium mb-1">District</label>
          <Select value={selectedDistrict} onValueChange={setSelectedDistrict}>
            <SelectTrigger>
              <SelectValue placeholder="Select District" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Districts</SelectLabel>
                {districts.map(district => (
                  <SelectItem key={district.districtCode} value={district.districtCode}>
                    {district.districtName}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
        
        {/* Department Selection */}
        <div>
          <label className="block text-sm font-medium mb-1">Department</label>
          <Select 
            value={selectedDepartment} 
            onValueChange={setSelectedDepartment} 
            disabled={!selectedDistrict}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select Department" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Departments</SelectLabel>
                {departments.map(department => (
                  <SelectItem key={department.departmentCode} value={department.departmentCode}>
                    {department.departmentName}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
        
        {/* Scheme Selection */}
        <div>
          <label className="block text-sm font-medium mb-1">Scheme</label>
          <Select 
            value={selectedScheme} 
            onValueChange={setSelectedScheme} 
            disabled={!selectedDepartment}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select Scheme" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Schemes</SelectLabel>
                {schemes.map(scheme => (
                  <SelectItem key={scheme.schemeCode} value={scheme.schemeCode}>
                    {scheme.schemeName}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
      </div>
      
      {/* Display selected scheme data */}
      {selectedSchemeData ? (
        <Card>
          <CardHeader>
            <CardTitle>{selectedSchemeData.schemeName}</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="mb-4">{selectedSchemeData.description}</p>
            
            <h3 className="font-semibold mb-2">KPIs:</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {selectedSchemeData.kpis.map((kpi: any) => (
                <Card key={kpi.kpiId}>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-base">{kpi.kpiName}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2 text-sm">
                      <p>{kpi.description}</p>
                      <div className="flex justify-between">
                        <span>Current: {kpi.currentValue} {kpi.unit}</span>
                        <span>Target: {kpi.targetValue} {kpi.unit}</span>
                      </div>
                      <div className="text-xs text-muted-foreground">
                        Last updated: {new Date(kpi.lastUpdated).toLocaleDateString()}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </CardContent>
        </Card>
      ) : (
        <div className="text-center p-8 bg-gray-50 rounded-md">
          <p className="text-muted-foreground">
            {!selectedDistrict 
              ? "Select a district to begin" 
              : !selectedDepartment 
                ? "Select a department to continue" 
                : !selectedScheme 
                  ? "Select a scheme to view KPIs" 
                  : "No data available for the selected scheme."}
          </p>
        </div>
      )}
    </div>
  );
};

export default DistrictDataView;
