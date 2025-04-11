import { BarChart as RechartsBarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { cn } from '@/lib/utils';

interface BarChartProps {
  data: Array<{
    date: string;
    value: number;
  }>;
  currentValue: number;
  targetValue: number;
  unit: string;
  title?: string;
  className?: string;
}

const BarChart = ({ data, currentValue, targetValue, unit, title, className }: BarChartProps) => {
  // Transform data to include target line
  const chartData = data.map(item => ({
    date: item.date,
    value: item.value,
    target: targetValue
  }));

  // Format date to be more compact
  const formatDate = (date: string) => {
    const [year, month] = date.split('-');
    return `${month}/${year.slice(2)}`;
  };

  // Format value with unit
  const formatValue = (value: number) => {
    if (value >= 1000) {
      return `${(value / 1000).toFixed(1)}k`;
    }
    return value.toString();
  };

  // Calculate left margin based on unit length
  const leftMargin = Math.max(25, Math.min(60, unit.length * 8));

  return (
    <div className={cn("flex flex-col w-full p-4", className)}>
      {title && <h3 className="text-sm font-medium mb-2">{title}</h3>}
      <div className="w-full h-[200px]">
        <ResponsiveContainer width="100%" height="100%">
          <RechartsBarChart data={chartData} margin={{ top: 10, right: 25, left: leftMargin, bottom: 30 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis 
              dataKey="date" 
              angle={-45}
              textAnchor="end"
              height={50}
              interval={0}
              tick={{ fontSize: 10 }}
              tickFormatter={formatDate}
            />
            <YAxis 
              tickFormatter={(value) => `${formatValue(value)}${unit}`}
              tick={{ fontSize: 10 }}
              width={Math.max(45, unit.length * 4 + 30)}
            />
            <Tooltip 
              formatter={(value: number) => [`${value}${unit}`, 'Value']}
              labelFormatter={(label) => `Date: ${formatDate(label)}`}
            />
            <Bar dataKey="value" fill="#4f46e5" />
            <Bar dataKey="target" fill="#ef4444" />
          </RechartsBarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default BarChart;
