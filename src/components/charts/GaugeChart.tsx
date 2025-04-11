
import { PieChart, Pie, Cell, ResponsiveContainer, Label } from 'recharts';
import { cn } from "@/lib/utils";

interface GaugeChartProps {
  value: number;
  target: number;
  min: number;
  max: number;
  unit: string;
  title?: string;
  className?: string;
}

const GaugeChart = ({ value, target, min, max, unit, title, className }: GaugeChartProps) => {
  // Normalize the value between 0 and 100
  const normalizedValue = Math.max(min, Math.min(max, value));
  const normalizedTarget = Math.max(min, Math.min(max, target));
  
  const percentage = ((normalizedValue - min) / (max - min)) * 100;
  const targetPercentage = ((normalizedTarget - min) / (max - min)) * 100;
  
  // Data for the gauge chart
  const data = [
    { name: 'Value', value: percentage },
    { name: 'Remaining', value: 100 - percentage }
  ];
  
  // Colors for the gauge segments
  const colors = ['#0088FE', '#EEEEEE'];
  
  // Calculate color based on target vs current value
  let valueColor = '#0088FE'; // default blue
  if (value >= target) {
    valueColor = '#4CAF50'; // green if reached target
  } else if (percentage < targetPercentage * 0.7) {
    valueColor = '#FF5722'; // orange/red if far from target
  } else if (percentage < targetPercentage * 0.9) {
    valueColor = '#FFC107'; // yellow if close to target
  }
  
  colors[0] = valueColor;
  
  return (
    <div className={cn("flex flex-col items-center p-4", className)}>
      {title && <h3 className="text-sm font-medium mb-2">{title}</h3>}
      <div className="w-full h-36 relative">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="80%"
              startAngle={180}
              endAngle={0}
              innerRadius={48}
              outerRadius={60}
              paddingAngle={0}
              dataKey="value"
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={colors[index]} />
              ))}
              <Label 
                value={`${value}${unit}`} 
                position="center" 
                className="text-lg font-bold"
                dy={-10}
              />
              <Label 
                value={`Target: ${target}${unit}`} 
                position="center" 
                className="text-xs"
                dy={15}
              />
            </Pie>
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default GaugeChart;
