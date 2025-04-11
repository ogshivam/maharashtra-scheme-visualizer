import { createContext, useContext, useState, ReactNode } from "react";
import rawData from "../data.json";

export interface KPI {
  id?: string;
  name: string;
  description: string;
  dataPoints: {
    currentValue: number;
    targetValue: number;
    unit: string;
  };
  chartType: 'gauge' | 'bar' | 'line' | 'pie';
  trend: 'up' | 'down' | 'stable';
  minValue: number;
  maxValue: number;
  historicalData: Array<{
    date: string;
    value: number;
  }>;
}

export interface Scheme {
  id?: string;
  name: string;
  description: string;
  KPIs: Record<string, KPI>;
}

export interface SchemeCategory {
  id: string;
  name: string;
  schemes: Scheme[];
}

interface RawKPI {
  description: string;
  dataPoints: {
    currentValue: number;
    targetValue: number;
    unit: string;
  };
  chartType: 'gauge' | 'bar' | 'line' | 'pie';
  trend: 'up' | 'down' | 'stable';
  minValue: number;
  maxValue: number;
  historicalData: Array<{
    date: string;
    value: number;
  }>;
}

interface RawScheme {
  name: string;
  description: string;
  KPIs: Record<string, RawKPI>;
}

// Transform the raw data into the format we need
const transformData = (rawData: Record<string, RawScheme[]>): SchemeCategory[] => {
  return Object.entries(rawData).map(([categoryKey, schemes]) => {
    const categoryMap: Record<string, string> = {
      'PublicServiceDelivery': 'Public Service Delivery',
      'Infrastructure': 'Infrastructure & Urban Development',
      'EconomicGrowth': 'Economic Growth & Financial Management',
      'Environmental': 'Environmental Protection & Sustainability'
    };

    const categoryIdMap: Record<string, string> = {
      'PublicServiceDelivery': 'psd',
      'Infrastructure': 'iud',
      'EconomicGrowth': 'egfm',
      'Environmental': 'eps'
    };

    return {
      id: categoryIdMap[categoryKey] || categoryKey.toLowerCase(),
      name: categoryMap[categoryKey] || categoryKey,
      schemes: schemes.map((scheme, index) => ({
        id: `${categoryIdMap[categoryKey]}-${index}`,
        ...scheme,
        KPIs: Object.entries(scheme.KPIs).reduce((acc, [kpiKey, kpi]) => ({
          ...acc,
          [kpiKey]: {
            id: `${categoryIdMap[categoryKey]}-${index}-${kpiKey.toLowerCase().replace(/\s+/g, '-')}`,
            name: kpiKey,
            ...kpi
          }
        }), {} as Record<string, KPI>)
      }))
    };
  });
};

interface SchemesContextType {
  schemeCategories: SchemeCategory[];
  updateKPI: (categoryId: string, schemeId: string, kpiId: string, updatedKPI: Partial<KPI>) => void;
  updateScheme: (categoryId: string, schemeId: string, updatedScheme: Partial<Scheme>) => void;
}

const SchemesContext = createContext<SchemesContextType | undefined>(undefined);

export const SchemesProvider = ({ children }: { children: ReactNode }) => {
  const [schemeCategories, setSchemeCategories] = useState<SchemeCategory[]>(() => 
    transformData(rawData as Record<string, RawScheme[]>)
  );

  const updateKPI = (categoryId: string, schemeId: string, kpiId: string, updatedKPI: Partial<KPI>) => {
    setSchemeCategories(prevCategories => {
      return prevCategories.map(category => {
        if (category.id === categoryId) {
          return {
            ...category,
            schemes: category.schemes.map(scheme => {
              if (scheme.id === schemeId) {
                return {
                  ...scheme,
                  KPIs: {
                    ...scheme.KPIs,
                    [kpiId]: {
                      ...scheme.KPIs[kpiId],
                      ...updatedKPI
                    }
                  }
                };
              }
              return scheme;
            })
          };
        }
        return category;
      });
    });
  };

  const updateScheme = (categoryId: string, schemeId: string, updatedScheme: Partial<Scheme>) => {
    setSchemeCategories(prevCategories => {
      return prevCategories.map(category => {
        if (category.id === categoryId) {
          return {
            ...category,
            schemes: category.schemes.map(scheme => {
              if (scheme.id === schemeId) {
                return { ...scheme, ...updatedScheme };
              }
              return scheme;
            })
          };
        }
        return category;
      });
    });
  };

  return (
    <SchemesContext.Provider
      value={{
        schemeCategories,
        updateKPI,
        updateScheme
      }}
    >
      {children}
    </SchemesContext.Provider>
  );
};

export const useSchemes = () => {
  const context = useContext(SchemesContext);
  if (context === undefined) {
    throw new Error("useSchemes must be used within a SchemesProvider");
  }
  return context;
};
