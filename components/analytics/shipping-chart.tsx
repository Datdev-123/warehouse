"use client";

import {
  LineChart,
  Line,
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
    month: "Jan",
    fedex: 85,
    ups: 78,
    dhl: 72,
    usps: 80,
    amazon: 75,
    ontrac: 70,
  },
  {
    month: "Feb",
    fedex: 88,
    ups: 82,
    dhl: 75,
    usps: 83,
    amazon: 78,
    ontrac: 73,
  },
  {
    month: "Mar",
    fedex: 92,
    ups: 85,
    dhl: 78,
    usps: 87,
    amazon: 82,
    ontrac: 76,
  },
  {
    month: "Apr",
    fedex: 90,
    ups: 83,
    dhl: 76,
    usps: 85,
    amazon: 80,
    ontrac: 75,
  },
  {
    month: "May",
    fedex: 93,
    ups: 87,
    dhl: 80,
    usps: 88,
    amazon: 83,
    ontrac: 78,
  },
  {
    month: "Jun",
    fedex: 95,
    ups: 89,
    dhl: 82,
    usps: 90,
    amazon: 85,
    ontrac: 80,
  },
];

export function ShippingChart() {
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
    fedex: "hsl(var(--chart-1))",
    ups: "hsl(var(--chart-2))",
    dhl: "hsl(var(--chart-3))",
    usps: "hsl(var(--chart-4))",
    amazon: "hsl(var(--chart-5))",
    ontrac: "hsl(var(--primary))",
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
        <LineChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
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
              color: isDark
                ? "hsl(var(--card-foreground))"
                : "hsl(var(--card-foreground))",
            }}
          />
          <Legend />
          <Line
            type="monotone"
            dataKey="fedex"
            name="FedEx"
            stroke={chartColors.fedex}
            strokeWidth={2}
          />
          <Line
            type="monotone"
            dataKey="ups"
            name="UPS"
            stroke={chartColors.ups}
            strokeWidth={2}
          />
          <Line
            type="monotone"
            dataKey="dhl"
            name="DHL"
            stroke={chartColors.dhl}
            strokeWidth={2}
          />
          <Line
            type="monotone"
            dataKey="usps"
            name="USPS"
            stroke={chartColors.usps}
            strokeWidth={2}
          />
          <Line
            type="monotone"
            dataKey="amazon"
            name="Amazon Logistics"
            stroke={chartColors.amazon}
            strokeWidth={2}
          />
          <Line
            type="monotone"
            dataKey="ontrac"
            name="OnTrac"
            stroke={chartColors.ontrac}
            strokeWidth={2}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}