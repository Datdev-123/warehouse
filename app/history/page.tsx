"use client";

import {
  Search,
  Filter,
  SlidersHorizontal,
  ChevronDown,
  ArrowUpDown,
  Package,
  ArrowUp,
  ArrowDown,
  Truck,
  AlertCircle,
  User,
  FileText
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
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

type ActivityType = {
  id: string;
  type: "stock_in" | "stock_out" | "shipment" | "order" | "adjustment" | "user" | "system";
  action: string;
  description: string;
  user: {
    name: string;
    avatar: string;
  };
  timestamp: string;
  metadata?: {
    quantity?: number;
    product?: string;
    reference?: string;
    status?: string;
  };
};

const activities: ActivityType[] = [
  {
    id: "1",
    type: "stock_in",
    action: "Stock Received",
    description: "Received new inventory stock",
    user: {
      name: "John Doe",
      avatar: "https://i.pravatar.cc/150?img=1"
    },
    timestamp: "2024-03-20 14:30",
    metadata: {
      quantity: 50,
      product: "iPhone 13 Pro",
      reference: "PO-12345"
    }
  },
  {
    id: "2",
    type: "order",
    action: "Order Processed",
    description: "New order processed and ready for shipment",
    user: {
      name: "Jane Smith",
      avatar: "https://i.pravatar.cc/150?img=2"
    },
    timestamp: "2024-03-20 13:15",
    metadata: {
      reference: "ORD-67890",
      status: "Processing"
    }
  },
  {
    id: "3",
    type: "shipment",
    action: "Shipment Created",
    description: "New shipment created for order",
    user: {
      name: "Mike Johnson",
      avatar: "https://i.pravatar.cc/150?img=3"
    },
    timestamp: "2024-03-20 12:45",
    metadata: {
      reference: "SHP-34567"
    }
  },
  {
    id: "4",
    type: "adjustment",
    action: "Stock Adjusted",
    description: "Inventory count adjusted after audit",
    user: {
      name: "Sarah Wilson",
      avatar: "https://i.pravatar.cc/150?img=4"
    },
    timestamp: "2024-03-20 11:30",
    metadata: {
      quantity: -3,
      product: "Samsung Galaxy S22",
      reference: "ADJ-89012"
    }
  },
  {
    id: "5",
    type: "user",
    action: "User Added",
    description: "New user account created",
    user: {
      name: "Admin System",
      avatar: "https://i.pravatar.cc/150?img=5"
    },
    timestamp: "2024-03-20 10:15",
    metadata: {
      reference: "USR-45678"
    }
  }
];

export default function HistoryPage() {
  const getActivityIcon = (type: ActivityType["type"]) => {
    switch (type) {
      case "stock_in":
        return (
          <div className="h-8 w-8 rounded-full bg-green-100 dark:bg-green-900/20 flex items-center justify-center text-green-600 dark:text-green-400">
            <ArrowDown className="h-4 w-4" />
          </div>
        );
      case "stock_out":
        return (
          <div className="h-8 w-8 rounded-full bg-blue-100 dark:bg-blue-900/20 flex items-center justify-center text-blue-600 dark:text-blue-400">
            <ArrowUp className="h-4 w-4" />
          </div>
        );
      case "shipment":
        return (
          <div className="h-8 w-8 rounded-full bg-purple-100 dark:bg-purple-900/20 flex items-center justify-center text-purple-600 dark:text-purple-400">
            <Truck className="h-4 w-4" />
          </div>
        );
      case "order":
        return (
          <div className="h-8 w-8 rounded-full bg-amber-100 dark:bg-amber-900/20 flex items-center justify-center text-amber-600 dark:text-amber-400">
            <Package className="h-4 w-4" />
          </div>
        );
      case "adjustment":
        return (
          <div className="h-8 w-8 rounded-full bg-red-100 dark:bg-red-900/20 flex items-center justify-center text-red-600 dark:text-red-400">
            <AlertCircle className="h-4 w-4" />
          </div>
        );
      case "user":
        return (
          <div className="h-8 w-8 rounded-full bg-indigo-100 dark:bg-indigo-900/20 flex items-center justify-center text-indigo-600 dark:text-indigo-400">
            <User className="h-4 w-4" />
          </div>
        );
      default:
        return (
          <div className="h-8 w-8 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center text-gray-600 dark:text-gray-400">
            <Package className="h-4 w-4" />
          </div>
        );
    }
  };

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Activity History</h1>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Total Activities</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1,234</div>
            <p className="text-xs text-muted-foreground">
              Last 30 days
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Stock Changes</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">456</div>
            <p className="text-xs text-muted-foreground">
              Inventory updates
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Order Activities</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">789</div>
            <p className="text-xs text-muted-foreground">
              Order processing events
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">System Events</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">123</div>
            <p className="text-xs text-muted-foreground">
              Automated activities
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="flex flex-col gap-4">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div className="flex items-center gap-2 md:w-96">
            <div className="relative w-full">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search activities..."
                className="w-full pl-8"
              />
            </div>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="icon">
                  <Filter className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuItem>All Activities</DropdownMenuItem>
                <DropdownMenuItem>Stock Changes</DropdownMenuItem>
                <DropdownMenuItem>Orders</DropdownMenuItem>
                <DropdownMenuItem>Shipments</DropdownMenuItem>
                <DropdownMenuItem>Adjustments</DropdownMenuItem>
                <DropdownMenuItem>User Activities</DropdownMenuItem>
                <DropdownMenuItem>System Events</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            <Button variant="outline" size="icon">
              <SlidersHorizontal className="h-4 w-4" />
            </Button>
          </div>
          <div className="flex items-center gap-2">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="flex items-center gap-1">
                  Sort by
                  <ChevronDown className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-40">
                <DropdownMenuItem>Most Recent</DropdownMenuItem>
                <DropdownMenuItem>Oldest First</DropdownMenuItem>
                <DropdownMenuItem>By Type</DropdownMenuItem>
                <DropdownMenuItem>By User</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>

        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Activity</TableHead>
                <TableHead>User</TableHead>
                <TableHead>Description</TableHead>
                <TableHead>Details</TableHead>
                <TableHead>Timestamp</TableHead>
                <TableHead>Reference</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {activities.map((activity) => (
                <TableRow key={activity.id}>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      {getActivityIcon(activity.type)}
                      <div className="font-medium">{activity.action}</div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Avatar className="h-6 w-6">
                        <AvatarImage src={activity.user.avatar} />
                        <AvatarFallback>
                          <User className="h-4 w-4" />
                        </AvatarFallback>
                      </Avatar>
                      <span className="text-sm">{activity.user.name}</span>
                    </div>
                  </TableCell>
                  <TableCell>{activity.description}</TableCell>
                  <TableCell>
                    {activity.metadata?.product && (
                      <div className="text-sm">
                        Product: {activity.metadata.product}
                      </div>
                    )}
                    {activity.metadata?.quantity && (
                      <div className="text-sm">
                        Quantity: {activity.metadata.quantity}
                      </div>
                    )}
                    {activity.metadata?.status && (
                      <div className="text-sm">
                        Status: {activity.metadata.status}
                      </div>
                    )}
                  </TableCell>
                  <TableCell>{activity.timestamp}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2 text-sm">
                      <FileText className="h-4 w-4 text-muted-foreground" />
                      {activity.metadata?.reference}
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
}