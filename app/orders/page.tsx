"use client";

import {
  ArrowUpDown,
  ChevronDown,
  Filter,
  Plus,
  Search,
  SlidersHorizontal,
  Clock,
  CheckCircle2,
  XCircle,
  Truck,
  FileText,
  User,
  Eye
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

type Order = {
  id: string;
  orderNumber: string;
  customer: {
    name: string;
    email: string;
    avatar: string;
  };
  status: "pending" | "processing" | "shipped" | "delivered" | "cancelled";
  date: string;
  total: number;
  items: number;
  paymentStatus: "paid" | "unpaid" | "refunded";
  shippingMethod: string;
};

const orders: Order[] = [
  {
    id: "1",
    orderNumber: "WH-2024-001",
    customer: {
      name: "John Doe",
      email: "john@example.com",
      avatar: "https://i.pravatar.cc/150?img=1"
    },
    status: "processing",
    date: "2024-03-20 14:30",
    total: 1299.99,
    items: 3,
    paymentStatus: "paid",
    shippingMethod: "Express Delivery"
  },
  {
    id: "2",
    orderNumber: "WH-2024-002",
    customer: {
      name: "Jane Smith",
      email: "jane@example.com",
      avatar: "https://i.pravatar.cc/150?img=2"
    },
    status: "shipped",
    date: "2024-03-20 12:15",
    total: 459.95,
    items: 2,
    paymentStatus: "paid",
    shippingMethod: "Standard Shipping"
  },
  {
    id: "3",
    orderNumber: "WH-2024-003",
    customer: {
      name: "Mike Johnson",
      email: "mike@example.com",
      avatar: "https://i.pravatar.cc/150?img=3"
    },
    status: "pending",
    date: "2024-03-20 10:45",
    total: 789.50,
    items: 4,
    paymentStatus: "unpaid",
    shippingMethod: "Express Delivery"
  },
  {
    id: "4",
    orderNumber: "WH-2024-004",
    customer: {
      name: "Sarah Wilson",
      email: "sarah@example.com",
      avatar: "https://i.pravatar.cc/150?img=4"
    },
    status: "delivered",
    date: "2024-03-19 16:20",
    total: 1599.99,
    items: 1,
    paymentStatus: "paid",
    shippingMethod: "Standard Shipping"
  },
  {
    id: "5",
    orderNumber: "WH-2024-005",
    customer: {
      name: "David Brown",
      email: "david@example.com",
      avatar: "https://i.pravatar.cc/150?img=5"
    },
    status: "cancelled",
    date: "2024-03-19 09:30",
    total: 299.99,
    items: 2,
    paymentStatus: "refunded",
    shippingMethod: "Express Delivery"
  }
];

export default function OrdersPage() {
  const getStatusBadge = (status: Order["status"]) => {
    switch (status) {
      case "pending":
        return (
          <Badge className="bg-yellow-500/20 text-yellow-700 dark:text-yellow-400">
            <Clock className="mr-1 h-3 w-3" />
            Pending
          </Badge>
        );
      case "processing":
        return (
          <Badge className="bg-blue-500/20 text-blue-700 dark:text-blue-400">
            <Clock className="mr-1 h-3 w-3" />
            Processing
          </Badge>
        );
      case "shipped":
        return (
          <Badge className="bg-purple-500/20 text-purple-700 dark:text-purple-400">
            <Truck className="mr-1 h-3 w-3" />
            Shipped
          </Badge>
        );
      case "delivered":
        return (
          <Badge className="bg-green-500/20 text-green-700 dark:text-green-400">
            <CheckCircle2 className="mr-1 h-3 w-3" />
            Delivered
          </Badge>
        );
      case "cancelled":
        return (
          <Badge className="bg-red-500/20 text-red-700 dark:text-red-400">
            <XCircle className="mr-1 h-3 w-3" />
            Cancelled
          </Badge>
        );
      default:
        return null;
    }
  };

  const getPaymentStatusBadge = (status: Order["paymentStatus"]) => {
    switch (status) {
      case "paid":
        return (
          <Badge className="bg-green-500/20 text-green-700 dark:text-green-400">
            Paid
          </Badge>
        );
      case "unpaid":
        return (
          <Badge className="bg-yellow-500/20 text-yellow-700 dark:text-yellow-400">
            Unpaid
          </Badge>
        );
      case "refunded":
        return (
          <Badge className="bg-gray-500/20 text-gray-700 dark:text-gray-400">
            Refunded
          </Badge>
        );
      default:
        return null;
    }
  };

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Orders</h1>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          New Order
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Total Orders</CardTitle>
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
            <CardTitle className="text-sm font-medium">Processing</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">45</div>
            <p className="text-xs text-muted-foreground">
              Requires attention
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Shipped</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">89</div>
            <p className="text-xs text-muted-foreground">
              In transit
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Delivered</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1,100</div>
            <p className="text-xs text-muted-foreground">
              Successfully completed
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
                placeholder="Search orders..."
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
                <DropdownMenuItem>All Orders</DropdownMenuItem>
                <DropdownMenuItem>Pending</DropdownMenuItem>
                <DropdownMenuItem>Processing</DropdownMenuItem>
                <DropdownMenuItem>Shipped</DropdownMenuItem>
                <DropdownMenuItem>Delivered</DropdownMenuItem>
                <DropdownMenuItem>Cancelled</DropdownMenuItem>
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
                <DropdownMenuItem>Date (Newest)</DropdownMenuItem>
                <DropdownMenuItem>Date (Oldest)</DropdownMenuItem>
                <DropdownMenuItem>Total (High to Low)</DropdownMenuItem>
                <DropdownMenuItem>Total (Low to High)</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>

        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Order</TableHead>
                <TableHead>Customer</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Items</TableHead>
                <TableHead>Total</TableHead>
                <TableHead>Payment</TableHead>
                <TableHead>Shipping</TableHead>
                <TableHead className="w-[100px]"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {orders.map((order) => (
                <TableRow key={order.id}>
                  <TableCell>
                    <div>
                      <div className="font-medium">{order.orderNumber}</div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Avatar className="h-8 w-8">
                        <AvatarImage src={order.customer.avatar} />
                        <AvatarFallback>
                          <User className="h-4 w-4" />
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="font-medium">{order.customer.name}</div>
                        <div className="text-xs text-muted-foreground">
                          {order.customer.email}
                        </div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>{getStatusBadge(order.status)}</TableCell>
                  <TableCell>{order.date}</TableCell>
                  <TableCell>{order.items}</TableCell>
                  <TableCell>${order.total.toFixed(2)}</TableCell>
                  <TableCell>{getPaymentStatusBadge(order.paymentStatus)}</TableCell>
                  <TableCell>{order.shippingMethod}</TableCell>
                  <TableCell>
                    <div className="flex justify-end">
                      <Button variant="ghost" size="icon">
                        <Eye className="h-4 w-4" />
                      </Button>
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