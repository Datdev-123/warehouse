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
  FileText,
  User,
  CheckCircle2,
  XCircle,
  Clock
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

type Adjustment = {
  id: string;
  productName: string;
  sku: string;
  warehouse: string;
  quantity: number;
  reason: string;
  status: "approved" | "pending" | "rejected";
  date: string;
  requestedBy: {
    name: string;
    avatar: string;
  };
  approvedBy?: {
    name: string;
    avatar: string;
  };
  reference: string;
  notes?: string;
};

const adjustments: Adjustment[] = [
  {
    id: "1",
    productName: "iPhone 13 Pro",
    sku: "IP-13PRO-128",
    warehouse: "Warehouse A",
    quantity: -2,
    reason: "Damaged during handling",
    status: "approved",
    date: "2024-03-20 14:30",
    requestedBy: {
      name: "John Doe",
      avatar: "https://i.pravatar.cc/150?img=1"
    },
    approvedBy: {
      name: "Sarah Wilson",
      avatar: "https://i.pravatar.cc/150?img=4"
    },
    reference: "ADJ-12345",
    notes: "Items damaged during unloading"
  },
  {
    id: "2",
    productName: "Samsung Galaxy S22",
    sku: "SG-S22-256",
    warehouse: "Warehouse B",
    quantity: -1,
    reason: "Quality control failure",
    status: "pending",
    date: "2024-03-20 12:15",
    requestedBy: {
      name: "Jane Smith",
      avatar: "https://i.pravatar.cc/150?img=2"
    },
    reference: "ADJ-12346"
  },
  {
    id: "3",
    productName: "MacBook Pro M2",
    sku: "MB-M2-512",
    warehouse: "Warehouse A",
    quantity: -3,
    reason: "Inventory count mismatch",
    status: "rejected",
    date: "2024-03-19 16:45",
    requestedBy: {
      name: "Mike Johnson",
      avatar: "https://i.pravatar.cc/150?img=3"
    },
    approvedBy: {
      name: "Sarah Wilson",
      avatar: "https://i.pravatar.cc/150?img=4"
    },
    reference: "ADJ-12347",
    notes: "Insufficient evidence provided"
  }
];

export function StockAdjustments() {
  const [sortBy, setSortBy] = useState<keyof Adjustment>("date");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");

  const sortedAdjustments = [...adjustments].sort((a, b) => {
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

  const handleSort = (column: keyof Adjustment) => {
    if (sortBy === column) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortBy(column);
      setSortOrder("asc");
    }
  };

  const getStatusBadge = (status: Adjustment["status"]) => {
    switch (status) {
      case "approved":
        return (
          <div className="flex items-center gap-1">
            <CheckCircle2 className="h-4 w-4 text-green-600" />
            <Badge className="bg-green-500/20 text-green-700 dark:text-green-400">
              Approved
            </Badge>
          </div>
        );
      case "pending":
        return (
          <div className="flex items-center gap-1">
            <Clock className="h-4 w-4 text-amber-600" />
            <Badge className="bg-amber-500/20 text-amber-700 dark:text-amber-400">
              Pending
            </Badge>
          </div>
        );
      case "rejected":
        return (
          <div className="flex items-center gap-1">
            <XCircle className="h-4 w-4 text-red-600" />
            <Badge className="bg-red-500/20 text-red-700 dark:text-red-400">
              Rejected
            </Badge>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
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
            <TableHead>Requested By</TableHead>
            <TableHead>Approved By</TableHead>
            <TableHead>Reference</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {sortedAdjustments.map((adjustment) => (
            <TableRow key={adjustment.id}>
              <TableCell>{getStatusBadge(adjustment.status)}</TableCell>
              <TableCell>
                <div>
                  <div className="font-medium">{adjustment.productName}</div>
                  <div className="text-xs text-muted-foreground">
                    SKU: {adjustment.sku}
                  </div>
                </div>
              </TableCell>
              <TableCell>{adjustment.warehouse}</TableCell>
              <TableCell>
                <span className="font-medium text-red-600">
                  {adjustment.quantity}
                </span>
              </TableCell>
              <TableCell>
                <div>
                  <div>{adjustment.reason}</div>
                  {adjustment.notes && (
                    <div className="text-xs text-muted-foreground mt-1">
                      Note: {adjustment.notes}
                    </div>
                  )}
                </div>
              </TableCell>
              <TableCell>{adjustment.date}</TableCell>
              <TableCell>
                <div className="flex items-center gap-2">
                  <Avatar className="h-6 w-6">
                    <AvatarImage src={adjustment.requestedBy.avatar} />
                    <AvatarFallback>
                      <User className="h-4 w-4" />
                    </AvatarFallback>
                  </Avatar>
                  <span className="text-sm">{adjustment.requestedBy.name}</span>
                </div>
              </TableCell>
              <TableCell>
                {adjustment.approvedBy ? (
                  <div className="flex items-center gap-2">
                    <Avatar className="h-6 w-6">
                      <AvatarImage src={adjustment.approvedBy.avatar} />
                      <AvatarFallback>
                        <User className="h-4 w-4" />
                      </AvatarFallback>
                    </Avatar>
                    <span className="text-sm">{adjustment.approvedBy.name}</span>
                  </div>
                ) : (
                  <span className="text-sm text-muted-foreground">-</span>
                )}
              </TableCell>
              <TableCell>
                <div className="flex items-center gap-2 text-sm">
                  <FileText className="h-4 w-4 text-muted-foreground" />
                  {adjustment.reference}
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}