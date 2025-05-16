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
import { useEffect, useState } from "react";

const data = [
  {
    category: "Phones",
    stock: 450,
    value: 450000,
    maxStock: 600,
  },
  {
    category: "Laptops",
    stock: 280,
    value: 840000,
    maxStock: 400,
  },
  {
    category: "Accessories",
    stock: 800,
    value: 160000,
    maxStock: 1000,
  },
  {
    category: "Tablets",
    stock: 150,
    value: 225000,
    maxStock: 200,
  },
  {
    category: "Watches",
    stock: 320,
    value: 192000,
    maxStock: 400,
  },
];

export function InventoryChart() {
  const { resolvedTheme } = useTheme();
  const isDark = resolvedTheme === "dark";
  const [mounted, setMounted] = useState(false);
  
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <div className="h-[400px] w-full bg-muted animate-pulse rounded-lg" />;
  }

  const chartColors = {
    stock: "hsl(var(--chart-1))",
    value: "hsl(var(--chart-2))",
    maxStock: "hsl(var(--chart-3))",
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
            dataKey="category"
            tick={{ fill: textColor }}
            axisLine={{ stroke: gridColor }}
            tickLine={{ stroke: gridColor }}
          />
          <YAxis
            yAxisId="left"
            tick={{ fill: textColor }}
            axisLine={{ stroke: gridColor }}
            tickLine={{ stroke: gridColor }}
          />
          <YAxis
            yAxisId="right"
            orientation="right"
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
            yAxisId="left"
            dataKey="stock"
            name="Current Stock (units)"
            fill={chartColors.stock}
          />
          <Bar
            yAxisId="right"
            dataKey="value"
            name="Value ($)"
            fill={chartColors.value}
          />
          <Bar
            yAxisId="left"
            dataKey="maxStock"
            name="Maximum Stock"
            fill={chartColors.maxStock}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}