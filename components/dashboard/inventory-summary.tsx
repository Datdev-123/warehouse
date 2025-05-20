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
import { ArrowUpDown, Package, Eye } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Progress } from "@/components/ui/progress";

type Product = {
  id: string;
  name: string;
  sku: string;
  category: string;
  stock: number;
  maxStock: number;
  status: "In Stock" | "Low Stock" | "Out of Stock";
};

const products: Product[] = [
  {
    id: "1",
    name: "iPhone 13 Pro",
    sku: "IP-13PRO-128",
    category: "Electronics",
    stock: 145,
    maxStock: 200,
    status: "In Stock",
  },
  {
    id: "2",
    name: "Samsung Galaxy S22",
    sku: "SG-S22-256",
    category: "Electronics",
    stock: 89,
    maxStock: 150,
    status: "In Stock",
  },
  {
    id: "3",
    name: "Nike Air Max 270",
    sku: "NKE-AM270-42",
    category: "Clothing",
    stock: 12,
    maxStock: 100,
    status: "Low Stock",
  },
  {
    id: "4",
    name: "Logitech MX Master 3",
    sku: "LOG-MXM3",
    category: "Electronics",
    stock: 0,
    maxStock: 50,
    status: "Out of Stock",
  },
  {
    id: "5",
    name: "IKEA MALM Desk",
    sku: "IKEA-MALM-DESK",
    category: "Furniture",
    stock: 35,
    maxStock: 40,
    status: "In Stock",
  },
];

export function InventorySummary() {
  const [sortBy, setSortBy] = useState<keyof Product>("stock");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");

  const sortedProducts = [...products].sort((a, b) => {
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

  const handleSort = (column: keyof Product) => {
    if (sortBy === column) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortBy(column);
      setSortOrder("asc");
    }
  };

  const getStatusColor = (status: Product["status"]) => {
    switch (status) {
      case "In Stock":
        return "bg-green-500/20 text-green-700 dark:text-green-400 hover:bg-green-500/30";
      case "Low Stock":
        return "bg-yellow-500/20 text-yellow-700 dark:text-yellow-400 hover:bg-yellow-500/30";
      case "Out of Stock":
        return "bg-red-500/20 text-red-700 dark:text-red-400 hover:bg-red-500/30";
      default:
        return "bg-gray-500/20 text-gray-700 dark:text-gray-400 hover:bg-gray-500/30";
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="sm">
              <Package className="mr-2 h-4 w-4" />
              Filter by Category
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem>All Categories</DropdownMenuItem>
            <DropdownMenuItem>Electronics</DropdownMenuItem>
            <DropdownMenuItem>Clothing</DropdownMenuItem>
            <DropdownMenuItem>Furniture</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
        <Button variant="ghost" size="sm" className="text-xs text-muted-foreground">
          View All Products
        </Button>
      </div>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Product</TableHead>
              <TableHead>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleSort("category")}
                  className="font-medium"
                >
                  Category
                  <ArrowUpDown className="ml-2 h-3 w-3" />
                </Button>
              </TableHead>
              <TableHead>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleSort("stock")}
                  className="font-medium"
                >
                  Stock Level
                  <ArrowUpDown className="ml-2 h-3 w-3" />
                </Button>
              </TableHead>
              <TableHead>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleSort("status")}
                  className="font-medium"
                >
                  Status
                  <ArrowUpDown className="ml-2 h-3 w-3" />
                </Button>
              </TableHead>
              <TableHead></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {sortedProducts.map((product) => (
              <TableRow key={product.id}>
                <TableCell className="font-medium">
                  <div>
                    <div>{product.name}</div>
                    <div className="text-xs text-muted-foreground">
                      SKU: {product.sku}
                    </div>
                  </div>
                </TableCell>
                <TableCell>{product.category}</TableCell>
                <TableCell>
                  <div className="flex flex-col space-y-1 w-32">
                    <div className="flex justify-between text-xs">
                      <span>{product.stock}</span>
                      <span className="text-muted-foreground">
                        /{product.maxStock}
                      </span>
                    </div>
                    <Progress
                      value={Math.min((product.stock / product.maxStock) * 100, 100)}
                      className="h-2"
                    />
                  </div>
                </TableCell>
                <TableCell>
                  <Badge
                    className={`${getStatusColor(product.status)}`}
                    variant="outline"
                  >
                    {product.status}
                  </Badge>
                </TableCell>
                <TableCell>
                  <Button size="icon" variant="ghost">
                    <Eye className="h-4 w-4" />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}