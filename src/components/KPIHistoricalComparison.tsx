
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { HistoricalDataPoint } from '@/types/schemeTypes';
import { TrendingDown, TrendingUp, ArrowRight } from 'lucide-react';

interface KPIHistoricalComparisonProps {
  kpiName: string;
  kpiDescription?: string;
  unit: string;
  historicalData: HistoricalDataPoint[];
  currentValue: number;
  targetValue: number;
  trend: 'up' | 'down' | 'stable';
}

const KPIHistoricalComparison: React.FC<KPIHistoricalComparisonProps> = ({
  kpiName,
  kpiDescription,
  unit,
  historicalData,
  currentValue,
  targetValue,
  trend,
}) => {
  // Calculate growth compared to first month in data
  const firstValue = historicalData.length > 0 ? historicalData[0].value : 0;
  const growth = firstValue !== 0 ? ((currentValue - firstValue) / firstValue) * 100 : 0;
  
  // Determine if we're on track to meet target
  const isOnTrack = trend === 'up' ? currentValue >= targetValue * 0.8 : true;

  // Format data for the chart
  const chartData = [...historicalData];
  
  // Add target line data
  const targetData = chartData.map(item => ({
    month: item.month,
    Target: targetValue,
  }));

  // Combine both datasets
  const combinedData = chartData.map((item, index) => ({
    ...item,
    Target: targetData[index].Target,
  }));

  return (
    <Card className="shadow-sm">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <div>
            <CardTitle className="text-lg">{kpiName}</CardTitle>
            {kpiDescription && <p className="text-sm text-muted-foreground">{kpiDescription}</p>}
          </div>
          <div className="flex items-center gap-1 text-sm">
            {growth > 0 ? (
              <span className="flex items-center text-green-600">
                <TrendingUp size={16} className="mr-1" />
                +{growth.toFixed(1)}%
              </span>
            ) : growth < 0 ? (
              <span className="flex items-center text-red-600">
                <TrendingDown size={16} className="mr-1" />
                {growth.toFixed(1)}%
              </span>
            ) : (
              <span className="flex items-center text-gray-600">
                <ArrowRight size={16} className="mr-1" />
                0%
              </span>
            )}
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="mb-4">
          <div className="flex justify-between items-center mb-1">
            <span className="text-sm text-muted-foreground">Current: {currentValue} {unit}</span>
            <span className="text-sm text-muted-foreground">Target: {targetValue} {unit}</span>
          </div>
          <div className={`text-xs ${isOnTrack ? 'text-green-600' : 'text-amber-600'} font-medium`}>
            {isOnTrack ? 'On track to meet target' : 'Behind target - needs attention'}
          </div>
        </div>

        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={combinedData} margin={{ top: 5, right: 5, left: 0, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" tick={{ fontSize: 12 }} />
              <YAxis tick={{ fontSize: 12 }} />
              <Tooltip 
                formatter={(value) => [`${value} ${unit}`, '']} 
                labelFormatter={(label) => `Month: ${label}`}
              />
              <Legend />
              <Line 
                type="monotone" 
                dataKey="value" 
                name="Actual" 
                stroke="#3b82f6" 
                strokeWidth={2}
                activeDot={{ r: 6 }} 
              />
              <Line 
                type="monotone" 
                dataKey="Target" 
                stroke="#ef4444" 
                strokeDasharray="3 3" 
                strokeWidth={1}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};

export default KPIHistoricalComparison;
