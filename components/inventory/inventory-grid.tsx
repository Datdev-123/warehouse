"use client";

import { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Eye, Edit, MoreHorizontal, AlertTriangle } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

// Sử dụng cùng dữ liệu và kiểu dữ liệu như InventoryList
type InventoryItem = {
  id: string;
  productName: string;
  sku: string;
  warehouse: string;
  quantity: number;
  minStock: number;
  maxStock: number;
  unitPrice: number;
  totalValue: number;
  status: "In Stock" | "Low Stock" | "Out of Stock" | "Overstock";
  lastUpdated: string;
};

const inventoryData: InventoryItem[] = [
  {
    id: "1",
    productName: "iPhone 13 Pro",
    sku: "IP-13PRO-128",
    warehouse: "Warehouse A",
    quantity: 145,
    minStock: 50,
    maxStock: 200,
    unitPrice: 999.99,
    totalValue: 144998.55,
    status: "In Stock",
    lastUpdated: "2024-03-20 14:30"
  },
  {
    id: "2",
    productName: "Samsung Galaxy S22",
    sku: "SG-S22-256",
    warehouse: "Warehouse B",
    quantity: 12,
    minStock: 30,
    maxStock: 150,
    unitPrice: 899.99,
    totalValue: 10799.88,
    status: "Low Stock",
    lastUpdated: "2024-03-20 12:15"
  },
  {
    id: "3",
    productName: "MacBook Pro M2",
    sku: "MB-M2-512",
    warehouse: "Warehouse A",
    quantity: 0,
    minStock: 10,
    maxStock: 50,
    unitPrice: 1999.99,
    totalValue: 0,
    status: "Out of Stock",
    lastUpdated: "2024-03-19 16:45"
  },
  {
    id: "4",
    productName: "AirPods Pro",
    sku: "AP-PRO-2",
    warehouse: "Warehouse C",
    quantity: 250,
    minStock: 100,
    maxStock: 200,
    unitPrice: 249.99,
    totalValue: 62497.50,
    status: "Overstock",
    lastUpdated: "2024-03-20 09:20"
  }
];

export function InventoryGrid({ 
  sortBy, 
  filter, 
  searchTerm 
}: { 
  sortBy?: string, 
  filter?: { warehouse: string },
  searchTerm?: string
}) {
  const [filteredData, setFilteredData] = useState<InventoryItem[]>(inventoryData);
  const [mounted, setMounted] = useState(false);

  // Set mounted state
  useEffect(() => {
    console.log("InventoryGrid mounted");
    setMounted(true);
  }, []);

  // Xử lý filter và search
  useEffect(() => {
    let result = [...inventoryData];
    
    // Lọc theo warehouse
    if (filter?.warehouse && filter.warehouse !== "all") {
      result = result.filter(item => item.warehouse === filter.warehouse);
    }
    
    // Lọc theo từ khóa tìm kiếm
    if (searchTerm) {
      const search = searchTerm.toLowerCase();
      result = result.filter(item => 
        item.productName.toLowerCase().includes(search) || 
        item.sku.toLowerCase().includes(search) ||
        item.warehouse.toLowerCase().includes(search)
      );
    }
    
    setFilteredData(result);
  }, [filter, searchTerm]);

  const sortedInventory = [...filteredData].sort((a, b) => {
    switch (sortBy) {
      case "product_asc":
        return a.productName.localeCompare(b.productName);
      case "product_desc":
        return b.productName.localeCompare(a.productName);
      case "stock_asc":
        return a.quantity - b.quantity;
      case "stock_desc":
        return b.quantity - a.quantity;
      case "value_asc":
        return a.totalValue - b.totalValue;
      case "value_desc":
        return b.totalValue - a.totalValue;
      default:
        return a.productName.localeCompare(b.productName);
    }
  });

  const getStatusBadge = (status: InventoryItem["status"]) => {
    switch (status) {
      case "In Stock":
        return <Badge className="bg-green-500/20 text-green-700 dark:text-green-400 status-badge">In Stock</Badge>;
      case "Low Stock":
        return <Badge className="bg-amber-500/20 text-amber-700 dark:text-amber-400 status-badge">Low Stock</Badge>;
      case "Out of Stock":
        return <Badge className="bg-red-500/20 text-red-700 dark:text-red-400 status-badge">Out of Stock</Badge>;
      case "Overstock":
        return <Badge className="bg-blue-500/20 text-blue-700 dark:text-blue-400 status-badge">Overstock</Badge>;
      default:
        return null;
    }
  };

  return (
    <div className="inventory-grid-container">
      {/* Debug info */}
      <div className="bg-blue-50 p-4 mb-4 rounded-md">
        <p className="font-medium">Grid View Mode</p>
        <p className="text-sm">Items: {filteredData.length}</p>
        <p className="text-sm">Rendered at: {new Date().toLocaleTimeString()}</p>
      </div>

      {filteredData.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-10 text-center">
          <AlertTriangle className="h-10 w-10 text-amber-500 mb-2" />
          <h3 className="text-lg font-medium">No items found</h3>
          <p className="text-sm text-muted-foreground mt-1">
            Try adjusting your search or filter criteria
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {sortedInventory.map((item) => (
            <Card 
              key={item.id} 
              className="inventory-card border-2 overflow-hidden"
            >
              <CardHeader className="pb-2">
                <div className="flex justify-between">
                  <div>
                    <CardTitle>{item.productName}</CardTitle>
                    <CardDescription>SKU: {item.sku}</CardDescription>
                  </div>
                  {getStatusBadge(item.status)}
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium">Location:</span>
                    <span>{item.warehouse}</span>
                  </div>
                  
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>Stock Level:</span>
                      <span className="font-medium">{item.quantity}/{item.maxStock}</span>
                    </div>
                    <Progress
                      value={Math.min((item.quantity / item.maxStock) * 100, 100)}
                      className="h-2"
                    />
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Value:</span>
                    <span className="font-bold">${item.totalValue.toLocaleString()}</span>
                  </div>
                  
                  <div className="text-xs text-right text-muted-foreground">
                    Last updated: {item.lastUpdated}
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex justify-between bg-muted/20 pt-2">
                <Button variant="ghost" size="sm">
                  <Eye className="mr-2 h-4 w-4" />
                  View Details
                </Button>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="sm">
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem>
                      <Edit className="mr-2 h-4 w-4" />
                      Edit
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem className="text-destructive">
                      <AlertTriangle className="mr-2 h-4 w-4" />
                      Report Issue
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </CardFooter>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
} 