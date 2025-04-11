import { PieChart as RechartsPieChart, Pie, Cell, ResponsiveContainer } from 'recharts';

interface PieChartProps {
  value: number;
  target: number;
  unit: string;
}

const PieChart = ({ value, target, unit }: PieChartProps) => {
  // Calculate percentage
  const percentage = (value / target) * 100;
  
  // Create data for the pie chart
  const data = [
    { name: 'progress', value: value },
    { name: 'remaining', value: Math.max(0, target - value) }
  ];

  // Colors for different progress levels
  const getProgressColor = (percentage: number) => {
    if (percentage >= 100) return '#22c55e';
    if (percentage >= 75) return '#eab308';
    return '#ef4444';
  };

  // Format value with unit
  const formatValue = (value: number) => {
    if (value >= 1000) {
      return `${(value / 1000).toFixed(1)}k${unit}`;
    }
    return `${value}${unit}`;
  };

  const progressColor = getProgressColor(percentage);

  return (
    <div className="w-full h-[200px] relative">
      <ResponsiveContainer width="100%" height="100%">
        <RechartsPieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            innerRadius="60%"
            outerRadius="80%"
            paddingAngle={2}
            dataKey="value"
          >
            <Cell fill={progressColor} />
            <Cell fill="#e5e7eb" />
          </Pie>
        </RechartsPieChart>
      </ResponsiveContainer>
      
      {/* Value display */}
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="text-2xl font-bold">{formatValue(value)}</span>
        <span className="text-xs text-muted-foreground mt-1">Target: {formatValue(target)}</span>
        <span className="text-xs text-muted-foreground mt-0.5">{percentage.toFixed(1)}%</span>
      </div>
    </div>
  );
};

export default PieChart;
