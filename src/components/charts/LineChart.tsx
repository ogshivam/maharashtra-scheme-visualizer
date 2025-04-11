
import { LineChart as RechartsLineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceLine } from 'recharts';
import { cn } from '@/lib/utils';

interface LineChartProps {
  data: Array<{
    period: string;
    value: number;
  }>;
  currentValue: number;
  targetValue: number;
  unit: string;
  title?: string;
  trend?: 'up' | 'down' | 'stable';
  className?: string;
}

const LineChart = ({ data, currentValue, targetValue, unit, title, trend = 'up', className }: LineChartProps) => {
  // Combine historical data with current value
  const currentPeriod = "Current";
  
  // Format data for recharts
  const chartData = [
    ...data.map(d => ({ period: d.period, value: d.value })),
    { period: currentPeriod, value: currentValue }
  ];
  
  // Determine the desired trend direction
  const isPositiveTrend = trend === 'up';
  const isNegativeTrend = trend === 'down';
  
  // Check if the current trend is moving in the desired direction
  const isGoodTrend = (isPositiveTrend && currentValue > targetValue) || 
                       (isNegativeTrend && currentValue < targetValue) ||
                       (trend === 'stable' && currentValue === targetValue);
  
  // Get min and max for domain padding
  const values = chartData.map(d => d.value);
  const dataMin = Math.min(...values);
  const dataMax = Math.max(...values);
  const padding = (dataMax - dataMin) * 0.1;
  
  return (
    <div className={cn("flex flex-col w-full p-4", className)}>
      {title && <h3 className="text-sm font-medium mb-2">{title}</h3>}
      <div className="w-full h-48 relative">
        <ResponsiveContainer width="100%" height="100%">
          <RechartsLineChart
            data={chartData}
            margin={{ top: 10, right: 10, left: 10, bottom: 20 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis 
              dataKey="period" 
              tick={{ fontSize: 10 }} 
              tickMargin={8}
              angle={-45}
              textAnchor="end"
              height={50}
            />
            <YAxis 
              domain={[Math.max(0, dataMin - padding), dataMax + padding]} 
              unit={unit} 
              tickFormatter={(value) => `${value}${unit}`} 
              width={40}
              tick={{ fontSize: 10 }}
            />
            <Tooltip 
              formatter={(value: number) => [`${value}${unit}`, 'Value']}
              labelFormatter={(label) => `Period: ${label}`}
            />
            <Line 
              type="monotone" 
              dataKey="value" 
              stroke="#2563EB" 
              strokeWidth={2}
              dot={{ r: 3 }}
              activeDot={{ r: 5, strokeWidth: 1 }}
              animationDuration={1500}
            />
            <ReferenceLine 
              y={targetValue} 
              label={{ 
                value: `Target: ${targetValue}${unit}`, 
                position: 'insideBottomLeft',
                fill: '#FF5722',
                fontSize: 10
              }} 
              stroke="#FF5722" 
              strokeDasharray="3 3" 
            />
          </RechartsLineChart>
        </ResponsiveContainer>
      </div>
      <div className="mt-2 text-xs text-center">
        <span className={isGoodTrend ? "text-green-600 font-medium" : "text-amber-600 font-medium"}>
          {isGoodTrend ? 'On track' : 'Needs attention'}
        </span>
      </div>
    </div>
  );
};

export default LineChart;
