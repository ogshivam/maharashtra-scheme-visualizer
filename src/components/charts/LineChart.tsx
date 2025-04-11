import { LineChart as RechartsLineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

interface LineChartProps {
  data: Array<{
    date: string;
    value: number;
  }>;
  currentValue: number;
  targetValue: number;
  unit: string;
  trend: 'up' | 'down' | 'stable';
}

const LineChart = ({ data, currentValue, targetValue, unit, trend }: LineChartProps) => {
  // Transform data to include target line
  const chartData = data.map(item => ({
    date: item.date,
    value: item.value,
    target: targetValue
  }));

  // Determine line color based on trend
  const getLineColor = (trend: string) => {
    switch (trend) {
      case 'up':
        return '#22c55e';
      case 'down':
        return '#ef4444';
      default:
        return '#4f46e5';
    }
  };

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
    <div className="w-full h-[200px]">
      <ResponsiveContainer width="100%" height="100%">
        <RechartsLineChart data={chartData} margin={{ top: 10, right: 25, left: leftMargin, bottom: 30 }}>
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
          <Line 
            type="monotone" 
            dataKey="value" 
            stroke={getLineColor(trend)} 
            strokeWidth={2}
            dot={{ fill: getLineColor(trend), r: 4 }}
          />
          <Line 
            type="monotone" 
            dataKey="target" 
            stroke="#ef4444" 
            strokeDasharray="5 5"
            strokeWidth={2}
            dot={false}
          />
        </RechartsLineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default LineChart;
