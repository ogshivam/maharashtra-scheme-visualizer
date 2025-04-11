import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import schemeData from '../data/schemes.json';

// Define types based on our JSON structure
export interface HistoricalData {
  period: string;
  value: number;
}

export interface KPI {
  id: string;
  name: string;
  currentValue: number;
  targetValue: number;
  unit: string;
  chartType: 'gauge' | 'bar' | 'line' | 'pie';
  trend: 'up' | 'down' | 'stable';
  minValue: number;
  maxValue: number;
  historicalData: HistoricalData[];
}

export interface Scheme {
  id: string;
  name: string;
  description: string;
  kpis: KPI[];
}

export interface SchemeCategory {
  id: string;
  name: string;
  schemes: Scheme[];
}

interface SchemesContextType {
  schemeCategories: SchemeCategory[];
  updateKPI: (categoryId: string, schemeId: string, kpiId: string, updatedKPI: Partial<KPI>) => void;
  addKPI: (categoryId: string, schemeId: string, newKPI: KPI) => void;
  deleteKPI: (categoryId: string, schemeId: string, kpiId: string) => void;
  updateScheme: (categoryId: string, schemeId: string, updatedScheme: Partial<Scheme>) => void;
  addScheme: (categoryId: string, newScheme: Scheme) => void;
  deleteScheme: (categoryId: string, schemeId: string) => void;
}

const SchemesContext = createContext<SchemesContextType | undefined>(undefined);

export const SchemesProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [schemeCategories, setSchemeCategories] = useState<SchemeCategory[]>([]);

  useEffect(() => {
    // Type assertion to ensure the JSON data conforms to our TypeScript types
    const typedSchemeData = schemeData.schemeCategories as unknown as SchemeCategory[];
    setSchemeCategories(typedSchemeData);
  }, []);

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
                  kpis: scheme.kpis.map(kpi => {
                    if (kpi.id === kpiId) {
                      return { ...kpi, ...updatedKPI };
                    }
                    return kpi;
                  })
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

  const addKPI = (categoryId: string, schemeId: string, newKPI: KPI) => {
    setSchemeCategories(prevCategories => {
      return prevCategories.map(category => {
        if (category.id === categoryId) {
          return {
            ...category,
            schemes: category.schemes.map(scheme => {
              if (scheme.id === schemeId) {
                return {
                  ...scheme,
                  kpis: [...scheme.kpis, newKPI]
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

  const deleteKPI = (categoryId: string, schemeId: string, kpiId: string) => {
    setSchemeCategories(prevCategories => {
      return prevCategories.map(category => {
        if (category.id === categoryId) {
          return {
            ...category,
            schemes: category.schemes.map(scheme => {
              if (scheme.id === schemeId) {
                return {
                  ...scheme,
                  kpis: scheme.kpis.filter(kpi => kpi.id !== kpiId)
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

  const addScheme = (categoryId: string, newScheme: Scheme) => {
    setSchemeCategories(prevCategories => {
      return prevCategories.map(category => {
        if (category.id === categoryId) {
          return {
            ...category,
            schemes: [...category.schemes, newScheme]
          };
        }
        return category;
      });
    });
  };

  const deleteScheme = (categoryId: string, schemeId: string) => {
    setSchemeCategories(prevCategories => {
      return prevCategories.map(category => {
        if (category.id === categoryId) {
          return {
            ...category,
            schemes: category.schemes.filter(scheme => scheme.id !== schemeId)
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
        addKPI,
        deleteKPI,
        updateScheme,
        addScheme,
        deleteScheme
      }}
    >
      {children}
    </SchemesContext.Provider>
  );
};

export const useSchemes = () => {
  const context = useContext(SchemesContext);
  if (context === undefined) {
    throw new Error('useSchemes must be used within a SchemesProvider');
  }
  return context;
};
