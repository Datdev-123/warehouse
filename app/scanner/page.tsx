"use client";

import { useState } from "react";
import {
  ScanLine,
  Package,
  Truck,
  ArrowRight,
  CheckCircle2,
  XCircle,
  AlertTriangle
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export default function ScannerPage() {
  const [scanInput, setScanInput] = useState("");
  const [lastScanned, setLastScanned] = useState<{
    code: string;
    type: "success" | "error" | "warning";
    message: string;
    timestamp: string;
  } | null>(null);

  const handleScan = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Simulate scan result
    const result = {
      code: scanInput,
      type: Math.random() > 0.3 ? "success" : Math.random() > 0.5 ? "error" : "warning",
      message: Math.random() > 0.3 
        ? "Item successfully scanned" 
        : Math.random() > 0.5 
          ? "Invalid barcode" 
          : "Item requires attention",
      timestamp: new Date().toLocaleTimeString()
    };
    
    setLastScanned(result);
    setScanInput("");
  };

  const getStatusIcon = (type: "success" | "error" | "warning") => {
    switch (type) {
      case "success":
        return <CheckCircle2 className="h-8 w-8 text-green-500" />;
      case "error":
        return <XCircle className="h-8 w-8 text-red-500" />;
      case "warning":
        return <AlertTriangle className="h-8 w-8 text-yellow-500" />;
    }
  };

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Barcode Scanner</h1>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Scanned Today</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">234</div>
            <p className="text-xs text-muted-foreground">
              Items processed
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Successful Scans</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">215</div>
            <p className="text-xs text-emerald-500">
              91.8% success rate
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Failed Scans</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">19</div>
            <p className="text-xs text-rose-500">
              8.2% failure rate
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Pending Review</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">5</div>
            <p className="text-xs text-muted-foreground">
              Requires attention
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Scan Item</CardTitle>
            <CardDescription>
              Scan barcodes for inventory tracking
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleScan} className="space-y-4">
              <div className="flex gap-2">
                <div className="relative flex-1">
                  <ScanLine className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  
                  <Input
                    placeholder="Scan or enter barcode..."
                    className="pl-8"
                    value={scanInput}
                    onChange={(e) => setScanInput(e.target.value)}
                    autoFocus
                  />
                </div>
                <Button type="submit">
                  Scan
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>

              <div className="flex gap-4">
                <Button variant="outline" className="flex-1">
                  <Package className="mr-2 h-4 w-4" />
                  Inbound
                </Button>
                <Button variant="outline" className="flex-1">
                  <Truck className="mr-2 h-4 w-4" />
                  Outbound
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Last Scan Result</CardTitle>
            <CardDescription>
              View the status of your last scan
            </CardDescription>
          </CardHeader>
          <CardContent>
            {lastScanned ? (
              <div className="flex items-start gap-4 rounded-lg border p-4">
                {getStatusIcon(lastScanned.type)}
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <p className="font-medium">{lastScanned.code}</p>
                    <Badge
                      variant="outline"
                      className={
                        lastScanned.type === "success"
                          ? "bg-green-500/20 text-green-700 dark:text-green-400"
                          : lastScanned.type === "error"
                          ? "bg-red-500/20 text-red-700 dark:text-red-400"
                          : "bg-yellow-500/20 text-yellow-700 dark:text-yellow-400"
                      }
                    >
                      {lastScanned.type.toUpperCase()}
                    </Badge>
                  </div>
                  <p className="mt-1 text-sm text-muted-foreground">
                    {lastScanned.message}
                  </p>
                  <p className="mt-2 text-xs text-muted-foreground">
                    Scanned at {lastScanned.timestamp}
                  </p>
                </div>
              </div>
            ) : (
              <div className="flex h-[104px] items-center justify-center rounded-lg border border-dashed">
                <p className="text-sm text-muted-foreground">
                  No recent scans
                </p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}