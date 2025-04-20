
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Download, FileSpreadsheet, FileText, Loader2 } from 'lucide-react';
import { toast } from 'sonner';
import { KPI } from '@/contexts/SchemesContext';

interface ExportFunctionalityProps {
  kpis: KPI[];
  schemeName?: string;
  departmentName?: string;
  districtName?: string;
}

const ExportFunctionality: React.FC<ExportFunctionalityProps> = ({ 
  kpis, 
  schemeName = 'All Schemes',
  departmentName = 'All Departments',
  districtName = 'All Districts'
}) => {
  const [isExporting, setIsExporting] = useState(false);

  const handleExport = (format: 'csv' | 'pdf') => {
    setIsExporting(true);
    
    // Simulate export process
    setTimeout(() => {
      setIsExporting(false);

      // In a real implementation, this would generate and download the file
      if (format === 'csv') {
        // Create CSV data
        const headers = ['KPI Name', 'Description', 'Current Value', 'Target Value', 'Unit', 'Progress (%)', 'Trend'];
        const rows = kpis.map(kpi => [
          kpi.name,
          kpi.description,
          kpi.dataPoints.currentValue,
          kpi.dataPoints.targetValue,
          kpi.dataPoints.unit,
          ((kpi.dataPoints.currentValue / kpi.dataPoints.targetValue) * 100).toFixed(1) + '%',
          kpi.trend
        ]);
        
        // Log the CSV data for demo purposes
        console.log('CSV Data:', [headers, ...rows]);
        
        toast.success(`Export successful! ${departmentName} data in ${format.toUpperCase()} format would be downloaded.`);
      } else {
        toast.success(`Export successful! ${departmentName} report in ${format.toUpperCase()} format would be downloaded.`);
      }
    }, 1500);
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="sm" disabled={isExporting} className="flex items-center">
          {isExporting ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Exporting...
            </>
          ) : (
            <>
              <Download className="mr-2 h-4 w-4" />
              Export Data
            </>
          )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-40">
        <DropdownMenuItem onClick={() => handleExport('csv')}>
          <FileSpreadsheet className="mr-2 h-4 w-4" />
          <span>CSV</span>
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => handleExport('pdf')}>
          <FileText className="mr-2 h-4 w-4" />
          <span>PDF Report</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default ExportFunctionality;
