import { PieChart as RechartsPieChart, Pie, Cell, ResponsiveContainer } from 'recharts';

interface GaugeChartProps {
  value: number;
  target: number;
  min: number;
  max: number;
  unit: string;
}

const GaugeChart = ({ value, target, min, max, unit }: GaugeChartProps) => {
  // Calculate percentage for the gauge
  const percentage = ((value - min) / (max - min)) * 100;
  const targetPercentage = ((target - min) / (max - min)) * 100;
  
  // Create data for the gauge chart
  const data = [
    { name: 'progress', value: percentage },
    { name: 'remaining', value: 100 - percentage }
  ];

  // Colors for different progress levels
  const getProgressColor = (percentage: number, targetPercentage: number) => {
    if (percentage >= targetPercentage) return '#22c55e';
    if (percentage >= targetPercentage * 0.75) return '#eab308';
    return '#ef4444';
  };

  // Format value with unit
  const formatValue = (value: number) => {
    if (value >= 1000) {
      return `${(value / 1000).toFixed(1)}k`;
    }
    return value.toString();
  };

  const progressColor = getProgressColor(percentage, targetPercentage);

  return (
    <div className="w-full h-[200px] relative">
      <ResponsiveContainer width="100%" height="100%">
        <RechartsPieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            startAngle={180}
            endAngle={0}
            innerRadius="60%"
            outerRadius="80%"
            paddingAngle={0}
            dataKey="value"
          >
            <Cell fill={progressColor} />
            <Cell fill="#e5e7eb" />
          </Pie>
        </RechartsPieChart>
      </ResponsiveContainer>
      
      {/* Value display */}
      <div className="absolute inset-0 flex flex-col items-center justify-center -mt-2">
        <div className="flex items-baseline gap-1">
          <span className="text-xl font-bold">{formatValue(value)}</span>
          <span className="text-xs text-muted-foreground">{unit}</span>
        </div>
        <div className="flex items-baseline gap-1 mt-1">
          <span className="text-xs text-muted-foreground">Target:</span>
          <span className="text-xs font-medium">{formatValue(target)}</span>
          <span className="text-xs text-muted-foreground">{unit}</span>
        </div>
        <span className="text-[10px] text-muted-foreground mt-0.5">{percentage.toFixed(1)}%</span>
      </div>
    </div>
  );
};

export default GaugeChart;
