"use client";

import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import { useTheme } from "next-themes";

const data = [
  {
    month: "Jan",
    revenue: 45000,
    orders: 234,
    average: 192.31,
  },
  {
    month: "Feb",
    revenue: 52000,
    orders: 256,
    average: 203.13,
  },
  {
    month: "Mar",
    revenue: 61000,
    orders: 298,
    average: 204.70,
  },
  {
    month: "Apr",
    revenue: 58000,
    orders: 275,
    average: 210.91,
  },
  {
    month: "May",
    revenue: 63000,
    orders: 289,
    average: 218.00,
  },
  {
    month: "Jun",
    revenue: 72000,
    orders: 321,
    average: 224.30,
  },
];

export function SalesChart() {
  const { resolvedTheme } = useTheme();
  const isDark = resolvedTheme === "dark";

  const chartColors = {
    revenue: "hsl(var(--chart-1))",
    orders: "hsl(var(--chart-2))",
    average: "hsl(var(--chart-3))",
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
        <AreaChart data={data} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
          <defs>
            {Object.entries(chartColors).map(([key, color]) => (
              <linearGradient key={key} id={`color-${key}`} x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor={color} stopOpacity={0.8} />
                <stop offset="95%" stopColor={color} stopOpacity={0.1} />
              </linearGradient>
            ))}
          </defs>
          <CartesianGrid
            strokeDasharray="3 3"
            stroke={gridColor}
            vertical={false}
          />
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
              color: isDark
                ? "hsl(var(--card-foreground))"
                : "hsl(var(--card-foreground))",
            }}
          />
          <Legend />
          <Area
            type="monotone"
            dataKey="revenue"
            name="Revenue ($)"
            stroke={chartColors.revenue}
            fillOpacity={1}
            fill={`url(#color-revenue)`}
          />
          <Area
            type="monotone"
            dataKey="orders"
            name="Orders"
            stroke={chartColors.orders}
            fillOpacity={1}
            fill={`url(#color-orders)`}
          />
          <Area
            type="monotone"
            dataKey="average"
            name="Average Order Value ($)"
            stroke={chartColors.average}
            fillOpacity={1}
            fill={`url(#color-average)`}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}