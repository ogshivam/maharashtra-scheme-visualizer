
import { PieChart as RechartsPieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';
import { cn } from '@/lib/utils';

interface PieChartProps {
  value: number;
  target: number;
  unit: string;
  title?: string;
  className?: string;
}

const PieChart = ({ value, target, unit, title, className }: PieChartProps) => {
  // Create the data for the pie chart
  const data = [
    { name: 'Current', value: value },
    { name: 'Remaining', value: Math.max(0, target - value) },
  ];
  
  // Colors for the pie sections
  const COLORS = ['#0088FE', '#EEEEEE'];
  
  // Calculate percentage of target
  const percentage = ((value / target) * 100).toFixed(1);
  
  return (
    <div className={cn("flex flex-col items-center p-4", className)}>
      {title && <h3 className="text-sm font-medium mb-2">{title}</h3>}
      <div className="w-full h-48 relative">
        <ResponsiveContainer width="100%" height="100%">
          <RechartsPieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              labelLine={false}
              outerRadius={60}
              innerRadius={40} // Creates a donut chart
              fill="#8884d8"
              dataKey="value"
              nameKey="name"
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip 
              formatter={(value: number) => `${value}${unit}`}
              labelFormatter={(name) => `${name}`}
            />
            <Legend verticalAlign="bottom" height={36} />
          </RechartsPieChart>
        </ResponsiveContainer>
      </div>
      <div className="mt-2 text-center">
        <p className="text-xs text-muted-foreground">Progress toward target</p>
        <p className="text-sm font-medium">{percentage}% ({value}{unit} of {target}{unit})</p>
      </div>
    </div>
  );
};

export default PieChart;
