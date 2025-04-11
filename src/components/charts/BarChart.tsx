
import { BarChart as RechartsBarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceLine } from 'recharts';
import { cn } from '@/lib/utils';

interface BarChartProps {
  data: Array<{
    period: string;
    value: number;
  }>;
  currentValue: number;
  targetValue: number;
  unit: string;
  title?: string;
  className?: string;
}

const BarChart = ({ data, currentValue, targetValue, unit, title, className }: BarChartProps) => {
  // Combine current value with historical data
  const currentPeriod = "Current";
  
  // Format data to ensure consistency for recharts
  const chartData = [
    ...data.map(d => ({ period: d.period, value: d.value })),
    { period: currentPeriod, value: currentValue }
  ];
  
  // Determine if the current value meets the target
  const isTargetMet = currentValue >= targetValue;
  
  return (
    <div className={cn("flex flex-col w-full p-4", className)}>
      {title && <h3 className="text-sm font-medium mb-2">{title}</h3>}
      <div className="w-full h-48 relative">
        <ResponsiveContainer width="100%" height="100%">
          <RechartsBarChart
            data={chartData}
            margin={{ top: 10, right: 10, left: 10, bottom: 20 }}
          >
            <CartesianGrid strokeDasharray="3 3" vertical={false} />
            <XAxis 
              dataKey="period" 
              tick={{ fontSize: 10 }} 
              tickMargin={8}
              angle={-45}
              textAnchor="end"
              height={50}
            />
            <YAxis 
              unit={unit} 
              tickFormatter={(value) => `${value}${unit}`} 
              width={40}
              tick={{ fontSize: 10 }}
            />
            <Tooltip 
              formatter={(value: number) => [`${value}${unit}`, 'Value']}
              labelFormatter={(label) => `Period: ${label}`}
            />
            <Bar 
              dataKey="value" 
              fill="#2563EB" 
              radius={[4, 4, 0, 0]}
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
          </RechartsBarChart>
        </ResponsiveContainer>
      </div>
      <div className="mt-2 text-xs text-center">
        <span className={isTargetMet ? "text-green-600 font-medium" : "text-amber-600 font-medium"}>
          {isTargetMet ? `Target met: ${currentValue}${unit}` : `${((currentValue/targetValue)*100).toFixed(1)}% of target achieved`}
        </span>
      </div>
    </div>
  );
};

export default BarChart;
