"use client";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { useTheme } from "next-themes";

const data = [
  {
    warehouse: "Warehouse A",
    efficiency: 92,
    utilization: 85,
    errors: 2.1,
  },
  {
    warehouse: "Warehouse B",
    efficiency: 88,
    utilization: 78,
    errors: 3.2,
  },
  {
    warehouse: "Warehouse C",
    efficiency: 95,
    utilization: 90,
    errors: 1.5,
  },
  {
    warehouse: "Warehouse D",
    efficiency: 86,
    utilization: 82,
    errors: 2.8,
  },
];

export function OperationsChart() {
  const { resolvedTheme } = useTheme();
  const isDark = resolvedTheme === "dark";

  const chartColors = {
    efficiency: "hsl(var(--chart-1))",
    utilization: "hsl(var(--chart-2))",
    errors: "hsl(var(--chart-3))",
  };

  const textColor = isDark
    ? "hsl(var(--muted-foreground))"
    : "hsl(var(--muted-foreground))";
  const gridColor = isDark
    ? "hsl(var(--border))"
    : "hsl(var(--border))";

  return (
    <div className="h-[400px] w-full">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" stroke={gridColor} vertical={false} />
          <XAxis
            dataKey="warehouse"
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
              color: isDark
                ? "hsl(var(--card-foreground))"
                : "hsl(var(--card-foreground))",
            }}
          />
          <Legend />
          <Bar
            dataKey="efficiency"
            name="Efficiency (%)"
            fill={chartColors.efficiency}
          />
          <Bar
            dataKey="utilization"
            name="Space Utilization (%)"
            fill={chartColors.utilization}
          />
          <Bar
            dataKey="errors"
            name="Error Rate (%)"
            fill={chartColors.errors}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}