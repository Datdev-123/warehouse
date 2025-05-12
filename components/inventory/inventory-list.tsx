"use client";

import { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { 
  Edit, 
  MoreHorizontal, 
  ArrowUpDown,
  Eye,
  History,
  AlertTriangle
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Checkbox } from "@/components/ui/checkbox";
import { Progress } from "@/components/ui/progress";

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

export function InventoryList() {
  const [sortBy, setSortBy] = useState<keyof InventoryItem>("productName");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
  const [selectedItems, setSelectedItems] = useState<string[]>([]);

  const sortedInventory = [...inventoryData].sort((a, b) => {
    const valueA = a[sortBy];
    const valueB = b[sortBy];

    if (typeof valueA === "string" && typeof valueB === "string") {
      return sortOrder === "asc"
        ? valueA.localeCompare(valueB)
        : valueB.localeCompare(valueA);
    } else {
      return sortOrder === "asc"
        ? Number(valueA) - Number(valueB)
        : Number(valueB) - Number(valueA);
    }
  });

  const handleSort = (column: keyof InventoryItem) => {
    if (sortBy === column) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortBy(column);
      setSortOrder("asc");
    }
  };

  const handleSelectAll = () => {
    if (selectedItems.length === inventoryData.length) {
      setSelectedItems([]);
    } else {
      setSelectedItems(inventoryData.map((item) => item.id));
    }
  };

  const handleSelectItem = (itemId: string) => {
    if (selectedItems.includes(itemId)) {
      setSelectedItems(selectedItems.filter((id) => id !== itemId));
    } else {
      setSelectedItems([...selectedItems, itemId]);
    }
  };

  const getStatusBadge = (status: InventoryItem["status"]) => {
    switch (status) {
      case "In Stock":
        return <Badge className="bg-green-500/20 text-green-700 dark:text-green-400">In Stock</Badge>;
      case "Low Stock":
        return <Badge className="bg-amber-500/20 text-amber-700 dark:text-amber-400">Low Stock</Badge>;
      case "Out of Stock":
        return <Badge className="bg-red-500/20 text-red-700 dark:text-red-400">Out of Stock</Badge>;
      case "Overstock":
        return <Badge className="bg-blue-500/20 text-blue-700 dark:text-blue-400">Overstock</Badge>;
      default:
        return null;
    }
  };

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[50px]">
              <Checkbox
                checked={selectedItems.length === inventoryData.length}
                onCheckedChange={handleSelectAll}
                aria-label="Select all items"
              />
            </TableHead>
            <TableHead>
              <Button
                variant="ghost"
                onClick={() => handleSort("productName")}
                className="font-medium"
              >
                Product
                <ArrowUpDown className="ml-2 h-3 w-3" />
              </Button>
            </TableHead>
            <TableHead>
              <Button
                variant="ghost"
                onClick={() => handleSort("warehouse")}
                className="font-medium"
              >
                Warehouse
                <ArrowUpDown className="ml-2 h-3 w-3" />
              </Button>
            </TableHead>
            <TableHead>
              <Button
                variant="ghost"
                onClick={() => handleSort("quantity")}
                className="font-medium"
              >
                Stock Level
                <ArrowUpDown className="ml-2 h-3 w-3" />
              </Button>
            </TableHead>
            <TableHead>
              <Button
                variant="ghost"
                onClick={() => handleSort("totalValue")}
                className="font-medium"
              >
                Value
                <ArrowUpDown className="ml-2 h-3 w-3" />
              </Button>
            </TableHead>
            <TableHead>
              <Button
                variant="ghost"
                onClick={() => handleSort("status")}
                className="font-medium"
              >
                Status
                <ArrowUpDown className="ml-2 h-3 w-3" />
              </Button>
            </TableHead>
            <TableHead>Last Updated</TableHead>
            <TableHead className="w-[100px]"></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {sortedInventory.map((item) => (
            <TableRow key={item.id}>
              <TableCell>
                <Checkbox
                  checked={selectedItems.includes(item.id)}
                  onCheckedChange={() => handleSelectItem(item.id)}
                  aria-label={`Select ${item.productName}`}
                />
              </TableCell>
              <TableCell>
                <div>
                  <div className="font-medium">{item.productName}</div>
                  <div className="text-xs text-muted-foreground">
                    SKU: {item.sku}
                  </div>
                </div>
              </TableCell>
              <TableCell>{item.warehouse}</TableCell>
              <TableCell>
                <div className="flex flex-col space-y-1 w-32">
                  <div className="flex justify-between text-xs">
                    <span>{item.quantity}</span>
                    <span className="text-muted-foreground">
                      /{item.maxStock}
                    </span>
                  </div>
                  <Progress
                    value={(item.quantity / item.maxStock) * 100}
                    className="h-2"
                  />
                </div>
              </TableCell>
              <TableCell>${item.totalValue.toLocaleString()}</TableCell>
              <TableCell>{getStatusBadge(item.status)}</TableCell>
              <TableCell>
                <div className="text-sm">{item.lastUpdated}</div>
              </TableCell>
              <TableCell>
                <div className="flex justify-end gap-2">
                  <Button variant="ghost" size="icon">
                    <Eye className="h-4 w-4" />
                  </Button>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem>
                        <Edit className="mr-2 h-4 w-4" />
                        Edit Stock
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <History className="mr-2 h-4 w-4" />
                        View History
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem className="text-destructive">
                        <AlertTriangle className="mr-2 h-4 w-4" />
                        Report Issue
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}