
import maharashtraData from '../data/maharashtraData.json';
import { MaharashtraData, findKpiById, getSchemesByCategory } from '../types/schemeTypes';

// Export the data and utility functions
export const getGovData = (): MaharashtraData => {
  return maharashtraData as MaharashtraData;
};

export { findKpiById, getSchemesByCategory };

// Function to get all districts
export const getAllDistricts = () => {
  return maharashtraData.districts;
};

// Function to get departments in a district
export const getDepartments = (districtCode: string) => {
  const district = maharashtraData.districts.find(d => d.districtCode === districtCode);
  return district ? district.departments : [];
};

// Function to get schemes in a department
export const getSchemes = (districtCode: string, departmentCode: string) => {
  const district = maharashtraData.districts.find(d => d.districtCode === districtCode);
  if (!district) return [];
  
  const department = district.departments.find(d => d.departmentCode === departmentCode);
  return department ? department.schemes : [];
};

// Function to get all KPIs
export const getAllKpis = () => {
  const kpis = [];
  
  for (const district of maharashtraData.districts) {
    for (const department of district.departments) {
      for (const scheme of department.schemes) {
        for (const kpi of scheme.kpis) {
          kpis.push({
            ...kpi,
            schemeName: scheme.schemeName,
            schemeCode: scheme.schemeCode,
            departmentName: department.departmentName,
            departmentCode: department.departmentCode,
            districtName: district.districtName,
            districtCode: district.districtCode
          });
        }
      }
    }
  }
  
  return kpis;
};

// Function to get all categories
export const getAllCategories = () => {
  return maharashtraData.categories;
};

// Function to get all roles
export const getAllRoles = () => {
  return maharashtraData.roles;
};
