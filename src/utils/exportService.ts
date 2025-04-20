
import { KPI } from "@/contexts/SchemesContext";

// Function to convert KPI data to CSV format
export const exportToCSV = (kpis: KPI[], includeHeaders = true): string => {
  // Create headers
  const headers = ['KPI Name', 'Description', 'Current Value', 'Target Value', 'Unit', 'Chart Type', 'Trend'];
  
  // Create rows for each KPI
  const rows = kpis.map(kpi => [
    kpi.name,
    kpi.description,
    kpi.dataPoints.currentValue,
    kpi.dataPoints.targetValue,
    kpi.dataPoints.unit,
    kpi.chartType,
    kpi.trend
  ]);
  
  // Combine headers and rows
  const csvData = includeHeaders ? [headers, ...rows] : rows;
  
  // Convert to CSV format
  const csvString = csvData.map(row => row.map(item => {
    // Handle strings with commas by enclosing in quotes
    if (typeof item === 'string' && item.includes(',')) {
      return `"${item}"`;
    }
    return item;
  }).join(',')).join('\n');
  
  return csvString;
};

// Function to create a CSV file and trigger download
export const downloadCSV = (kpis: KPI[], filename: string = 'kpi-data.csv'): void => {
  const csvString = exportToCSV(kpis);
  
  // Create blob and download link
  const blob = new Blob([csvString], { type: 'text/csv;charset=utf-8;' });
  const link = document.createElement('a');
  
  // Create download link
  if (navigator && 'msSaveBlob' in navigator) {
    // For IE/Edge - type assertion to avoid TS error
    (navigator as any).msSaveBlob(blob, filename);
  } else {
    // For other browsers
    const url = URL.createObjectURL(blob);
    link.href = url;
    link.setAttribute('download', filename);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }
};

// Mock function for PDF export (in a real app, this would use a PDF library)
export const exportToPDF = async (kpis: KPI[], title: string = 'KPI Report'): Promise<string> => {
  // This is a mock function - in a real implementation you would use a library like jsPDF or pdfmake
  
  // Log what would be in the PDF
  console.log('PDF Export:', {
    title,
    date: new Date().toLocaleDateString(),
    totalKPIs: kpis.length,
    kpis: kpis.map(kpi => ({
      name: kpi.name,
      currentValue: kpi.dataPoints.currentValue,
      targetValue: kpi.dataPoints.targetValue,
      unit: kpi.dataPoints.unit,
      progress: `${((kpi.dataPoints.currentValue / kpi.dataPoints.targetValue) * 100).toFixed(1)}%`
    }))
  });
  
  return 'PDF generation would happen here in a real implementation';
};

// Prepare KPI data for various export formats
export const prepareExportData = (kpis: KPI[], exportType: 'csv' | 'pdf' | 'excel', metadata = {}) => {
  // Add metadata and processing logic here
  console.log(`Preparing ${exportType} export with metadata:`, metadata);
  return kpis;
};
