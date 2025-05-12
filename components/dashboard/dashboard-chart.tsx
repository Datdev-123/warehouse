"use client";

import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  Legend 
} from "recharts";
import { useTheme } from "next-themes";

const data = [
  { month: "Jan", electronics: 124, clothing: 85, furniture: 42, food: 153, toys: 95 },
  { month: "Feb", electronics: 145, clothing: 97, furniture: 53, food: 165, toys: 87 },
  { month: "Mar", electronics: 132, clothing: 104, furniture: 62, food: 189, toys: 104 },
  { month: "Apr", electronics: 165, clothing: 125, furniture: 75, food: 201, toys: 125 },
  { month: "May", electronics: 187, clothing: 136, furniture: 83, food: 178, toys: 132 },
  { month: "Jun", electronics: 164, clothing: 142, furniture: 96, food: 162, toys: 118 },
];

export function DashboardChart() {
  const { resolvedTheme } = useTheme();
  const isDark = resolvedTheme === "dark";
  
  const chartColors = {
    electronics: "hsl(var(--chart-1))",
    clothing: "hsl(var(--chart-2))",
    furniture: "hsl(var(--chart-3))", 
    food: "hsl(var(--chart-4))",
    toys: "hsl(var(--chart-5))"
  };
  
  const textColor = isDark ? "hsl(var(--muted-foreground))" : "hsl(var(--muted-foreground))";
  const gridColor = isDark ? "hsl(var(--border))" : "hsl(var(--border))";
  
  return (
    <div className="h-80 w-full">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart
          data={data}
          margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
        >
          <defs>
            {Object.entries(chartColors).map(([key, color]) => (
              <linearGradient key={key} id={`color-${key}`} x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor={color} stopOpacity={0.8} />
                <stop offset="95%" stopColor={color} stopOpacity={0.1} />
              </linearGradient>
            ))}
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke={gridColor} vertical={false} />
          <XAxis 
            dataKey="month" 
            tick={{ fill: textColor }} 
            axisLine={{ stroke: gridColor }} 
            tickLine={{ stroke: gridColor }}
          />
          <YAxis 
            tick={{ fill: textColor }} 
            axisLine={{ stroke: gridColor }} 
            tickLine={{ stroke: gridColor }}
          />
          <Tooltip 
            contentStyle={{ 
              backgroundColor: isDark ? "hsl(var(--card))" : "hsl(var(--card))", 
              borderColor: "hsl(var(--border))",
              color: isDark ? "hsl(var(--card-foreground))" : "hsl(var(--card-foreground))"
            }}
          />
          <Legend />
          <Area 
            type="monotone" 
            dataKey="electronics" 
            name="Electronics" 
            stroke={chartColors.electronics} 
            fillOpacity={1}
            fill={`url(#color-electronics)`}
          />
          <Area 
            type="monotone" 
            dataKey="clothing" 
            name="Clothing" 
            stroke={chartColors.clothing} 
            fillOpacity={1}
            fill={`url(#color-clothing)`}
          />
          <Area 
            type="monotone" 
            dataKey="furniture" 
            name="Furniture" 
            stroke={chartColors.furniture} 
            fillOpacity={1}
            fill={`url(#color-furniture)`}
          />
          <Area 
            type="monotone" 
            dataKey="food" 
            name="Food" 
            stroke={chartColors.food} 
            fillOpacity={1}
            fill={`url(#color-food)`}
          />
          <Area 
            type="monotone" 
            dataKey="toys" 
            name="Toys" 
            stroke={chartColors.toys} 
            fillOpacity={1}
            fill={`url(#color-toys)`}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}