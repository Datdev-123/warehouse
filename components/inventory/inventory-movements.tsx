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
  ArrowUpDown,
  ArrowUp,
  ArrowDown,
  FileText,
  User
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

type Movement = {
  id: string;
  type: "in" | "out" | "transfer" | "adjustment";
  productName: string;
  sku: string;
  quantity: number;
  fromWarehouse?: string;
  toWarehouse?: string;
  reason: string;
  date: string;
  user: {
    name: string;
    avatar: string;
  };
  reference: string;
};

const movements: Movement[] = [
  {
    id: "1",
    type: "in",
    productName: "iPhone 13 Pro",
    sku: "IP-13PRO-128",
    quantity: 50,
    toWarehouse: "Warehouse A",
    reason: "Purchase Order #12345",
    date: "2024-03-20 14:30",
    user: {
      name: "John Doe",
      avatar: "https://i.pravatar.cc/150?img=1"
    },
    reference: "PO-12345"
  },
  {
    id: "2",
    type: "out",
    productName: "Samsung Galaxy S22",
    sku: "SG-S22-256",
    quantity: 5,
    fromWarehouse: "Warehouse B",
    reason: "Sales Order #67890",
    date: "2024-03-20 12:15",
    user: {
      name: "Jane Smith",
      avatar: "https://i.pravatar.cc/150?img=2"
    },
    reference: "SO-67890"
  },
  {
    id: "3",
    type: "transfer",
    productName: "AirPods Pro",
    sku: "AP-PRO-2",
    quantity: 20,
    fromWarehouse: "Warehouse A",
    toWarehouse: "Warehouse C",
    reason: "Stock Rebalancing",
    date: "2024-03-20 09:20",
    user: {
      name: "Mike Johnson",
      avatar: "https://i.pravatar.cc/150?img=3"
    },
    reference: "TR-34567"
  },
  {
    id: "4",
    type: "adjustment",
    productName: "MacBook Pro M2",
    sku: "MB-M2-512",
    quantity: -2,
    fromWarehouse: "Warehouse A",
    reason: "Damaged Items",
    date: "2024-03-19 16:45",
    user: {
      name: "Sarah Wilson",
      avatar: "https://i.pravatar.cc/150?img=4"
    },
    reference: "ADJ-89012"
  }
];

export function InventoryMovements() {
  const [sortBy, setSortBy] = useState<keyof Movement>("date");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");

  const sortedMovements = [...movements].sort((a, b) => {
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

  const handleSort = (column: keyof Movement) => {
    if (sortBy === column) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortBy(column);
      setSortOrder("asc");
    }
  };

  const getMovementBadge = (type: Movement["type"]) => {
    switch (type) {
      case "in":
        return <Badge className="bg-green-500/20 text-green-700 dark:text-green-400">Stock In</Badge>;
      case "out":
        return <Badge className="bg-amber-500/20 text-amber-700 dark:text-amber-400">Stock Out</Badge>;
      case "transfer":
        return <Badge className="bg-blue-500/20 text-blue-700 dark:text-blue-400">Transfer</Badge>;
      case "adjustment":
        return <Badge className="bg-purple-500/20 text-purple-700 dark:text-purple-400">Adjustment</Badge>;
      default:
        return null;
    }
  };

  const getMovementIcon = (type: Movement["type"]) => {
    switch (type) {
      case "in":
        return <ArrowDown className="h-4 w-4 text-green-600" />;
      case "out":
        return <ArrowUp className="h-4 w-4 text-amber-600" />;
      case "transfer":
        return <ArrowUp className="h-4 w-4 text-blue-600" />;
      case "adjustment":
        return <ArrowUp className="h-4 w-4 text-purple-600" />;
      default:
        return null;
    }
  };

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">
              <Button
                variant="ghost"
                onClick={() => handleSort("type")}
                className="font-medium"
              >
                Type
                <ArrowUpDown className="ml-2 h-3 w-3" />
              </Button>
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
            <TableHead>Location</TableHead>
            <TableHead>
              <Button
                variant="ghost"
                onClick={() => handleSort("quantity")}
                className="font-medium"
              >
                Quantity
                <ArrowUpDown className="ml-2 h-3 w-3" />
              </Button>
            </TableHead>
            <TableHead>Reason</TableHead>
            <TableHead>
              <Button
                variant="ghost"
                onClick={() => handleSort("date")}
                className="font-medium"
              >
                Date
                <ArrowUpDown className="ml-2 h-3 w-3" />
              </Button>
            </TableHead>
            <TableHead>User</TableHead>
            <TableHead>Reference</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {sortedMovements.map((movement) => (
            <TableRow key={movement.id}>
              <TableCell>
                <div className="flex items-center gap-2">
                  {getMovementIcon(movement.type)}
                  {getMovementBadge(movement.type)}
                </div>
              </TableCell>
              <TableCell>
                <div>
                  <div className="font-medium">{movement.productName}</div>
                  <div className="text-xs text-muted-foreground">
                    SKU: {movement.sku}
                  </div>
                </div>
              </TableCell>
              <TableCell>
                <div className="text-sm">
                  {movement.type === "transfer" ? (
                    <>
                      <div className="text-muted-foreground">From: {movement.fromWarehouse}</div>
                      <div>To: {movement.toWarehouse}</div>
                    </>
                  ) : (
                    movement.fromWarehouse || movement.toWarehouse
                  )}
                </div>
              </TableCell>
              <TableCell>
                <span className={`font-medium ${movement.quantity < 0 ? "text-red-600" : "text-green-600"}`}>
                  {movement.quantity > 0 ? "+" : ""}{movement.quantity}
                </span>
              </TableCell>
              <TableCell>{movement.reason}</TableCell>
              <TableCell>{movement.date}</TableCell>
              <TableCell>
                <div className="flex items-center gap-2">
                  <Avatar className="h-6 w-6">
                    <AvatarImage src={movement.user.avatar} />
                    <AvatarFallback>
                      <User className="h-4 w-4" />
                    </AvatarFallback>
                  </Avatar>
                  <span className="text-sm">{movement.user.name}</span>
                </div>
              </TableCell>
              <TableCell>
                <div className="flex items-center gap-2 text-sm">
                  <FileText className="h-4 w-4 text-muted-foreground" />
                  {movement.reference}
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}