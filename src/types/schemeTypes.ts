
// District-Department-Scheme-KPI hierarchy types
export interface HistoricalDataPoint {
  month: string;
  value: number;
}

export interface KPI {
  kpiName: string;
  kpiId: string;
  description: string;
  unit: string;
  currentValue: number;
  targetValue: number;
  chartType: 'gauge' | 'bar' | 'line' | 'pie';
  trend: 'up' | 'down' | 'stable';
  minValue: number;
  maxValue: number;
  lastUpdated: string;
  updatedBy: string;
  historicalData: HistoricalDataPoint[];
}

export interface Scheme {
  schemeName: string;
  schemeCode: string;
  category: string;
  description: string;
  kpis: KPI[];
}

export interface Department {
  departmentName: string;
  departmentCode: string;
  schemes: Scheme[];
}

export interface District {
  districtName: string;
  districtCode: string;
  departments: Department[];
}

export interface Category {
  id: string;
  name: string;
}

export interface Role {
  accessLevel: 'all' | 'district' | 'department' | 'scheme' | 'readonly';
  description: string;
}

export interface MaharashtraData {
  districts: District[];
  categories: Category[];
  roles: {
    [key: string]: Role;
  };
}

// Helper function to find a KPI by ID across all districts/departments/schemes
export const findKpiById = (data: MaharashtraData, kpiId: string): { 
  kpi: KPI | null;
  district: District | null;
  department: Department | null;
  scheme: Scheme | null;
} => {
  for (const district of data.districts) {
    for (const department of district.departments) {
      for (const scheme of department.schemes) {
        const kpi = scheme.kpis.find(k => k.kpiId === kpiId);
        if (kpi) {
          return { kpi, district, department, scheme };
        }
      }
    }
  }
  return { kpi: null, district: null, department: null, scheme: null };
};

// Helper function to get all schemes by category
export const getSchemesByCategory = (data: MaharashtraData, categoryId: string): Array<{
  scheme: Scheme;
  district: District;
  department: Department;
}> => {
  const result: Array<{
    scheme: Scheme;
    district: District;
    department: Department;
  }> = [];
  
  for (const district of data.districts) {
    for (const department of district.departments) {
      for (const scheme of department.schemes) {
        // Convert category IDs like "PublicServiceDelivery" to "psd" for comparison
        const schemeCategory = getCategoryIdFromName(scheme.category);
        if (schemeCategory === categoryId) {
          result.push({ scheme, district, department });
        }
      }
    }
  }
  
  return result;
};

// Helper to convert full category name to ID
export const getCategoryIdFromName = (categoryName: string): string => {
  const categoryMap: Record<string, string> = {
    'PublicServiceDelivery': 'psd',
    'InfrastructureUrbanDevelopment': 'iud',
    'EconomicGrowthFinancialManagement': 'egfm',
    'EnvironmentalProtectionSustainability': 'eps'
  };
  
  return categoryMap[categoryName] || categoryName.toLowerCase();
};
