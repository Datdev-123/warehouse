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
  MapPin,
  Package,
  Eye,
  User
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

type Shipment = {
  id: string;
  trackingNumber: string;
  orderNumber: string;
  customer: {
    name: string;
    email: string;
    avatar: string;
  };
  status: "pending" | "in_transit" | "delivered" | "failed";
  carrier: string;
  origin: string;
  destination: string;
  estimatedDelivery: string;
  items: number;
  weight: string;
};

const shipments: Shipment[] = [
  {
    id: "1",
    trackingNumber: "TRK-2024-001",
    orderNumber: "WH-2024-001",
    customer: {
      name: "John Doe",
      email: "john@example.com",
      avatar: "https://i.pravatar.cc/150?img=1"
    },
    status: "in_transit",
    carrier: "FedEx",
    origin: "New York, NY",
    destination: "Los Angeles, CA",
    estimatedDelivery: "2024-03-22",
    items: 3,
    weight: "4.5 kg"
  },
  {
    id: "2",
    trackingNumber: "TRK-2024-002",
    orderNumber: "WH-2024-002",
    customer: {
      name: "Jane Smith",
      email: "jane@example.com",
      avatar: "https://i.pravatar.cc/150?img=2"
    },
    status: "delivered",
    carrier: "UPS",
    origin: "Chicago, IL",
    destination: "Miami, FL",
    estimatedDelivery: "2024-03-21",
    items: 2,
    weight: "2.1 kg"
  },
  {
    id: "3",
    trackingNumber: "TRK-2024-003",
    orderNumber: "WH-2024-003",
    customer: {
      name: "Mike Johnson",
      email: "mike@example.com",
      avatar: "https://i.pravatar.cc/150?img=3"
    },
    status: "pending",
    carrier: "DHL",
    origin: "Seattle, WA",
    destination: "Boston, MA",
    estimatedDelivery: "2024-03-23",
    items: 1,
    weight: "1.8 kg"
  },
  {
    id: "4",
    trackingNumber: "TRK-2024-004",
    orderNumber: "WH-2024-004",
    customer: {
      name: "Sarah Wilson",
      email: "sarah@example.com",
      avatar: "https://i.pravatar.cc/150?img=4"
    },
    status: "failed",
    carrier: "FedEx",
    origin: "Houston, TX",
    destination: "Denver, CO",
    estimatedDelivery: "2024-03-20",
    items: 4,
    weight: "5.2 kg"
  }
];

export default function ShipmentsPage() {
  const getStatusBadge = (status: Shipment["status"]) => {
    switch (status) {
      case "pending":
        return (
          <Badge className="bg-yellow-500/20 text-yellow-700 dark:text-yellow-400">
            <Clock className="mr-1 h-3 w-3" />
            Pending
          </Badge>
        );
      case "in_transit":
        return (
          <Badge className="bg-blue-500/20 text-blue-700 dark:text-blue-400">
            <Truck className="mr-1 h-3 w-3" />
            In Transit
          </Badge>
        );
      case "delivered":
        return (
          <Badge className="bg-green-500/20 text-green-700 dark:text-green-400">
            <CheckCircle2 className="mr-1 h-3 w-3" />
            Delivered
          </Badge>
        );
      case "failed":
        return (
          <Badge className="bg-red-500/20 text-red-700 dark:text-red-400">
            <XCircle className="mr-1 h-3 w-3" />
            Failed
          </Badge>
        );
      default:
        return null;
    }
  };

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Shipments</h1>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Create Shipment
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Total Shipments</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">856</div>
            <p className="text-xs text-muted-foreground">
              Last 30 days
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">In Transit</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">234</div>
            <p className="text-xs text-muted-foreground">
              Currently moving
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Delivered</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">592</div>
            <p className="text-xs text-muted-foreground">
              Successfully completed
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Failed Deliveries</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">30</div>
            <p className="text-xs text-muted-foreground">
              Requires attention
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
                placeholder="Search shipments..."
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
                <DropdownMenuItem>All Shipments</DropdownMenuItem>
                <DropdownMenuItem>Pending</DropdownMenuItem>
                <DropdownMenuItem>In Transit</DropdownMenuItem>
                <DropdownMenuItem>Delivered</DropdownMenuItem>
                <DropdownMenuItem>Failed</DropdownMenuItem>
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
                <DropdownMenuItem>Status</DropdownMenuItem>
                <DropdownMenuItem>Carrier</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>

        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Tracking</TableHead>
                <TableHead>Customer</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Carrier</TableHead>
                <TableHead>Route</TableHead>
                <TableHead>Est. Delivery</TableHead>
                <TableHead>Items</TableHead>
                <TableHead>Weight</TableHead>
                <TableHead className="w-[100px]"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {shipments.map((shipment) => (
                <TableRow key={shipment.id}>
                  <TableCell>
                    <div>
                      <div className="font-medium">{shipment.trackingNumber}</div>
                      <div className="text-xs text-muted-foreground">
                        Order: {shipment.orderNumber}
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Avatar className="h-8 w-8">
                        <AvatarImage src={shipment.customer.avatar} />
                        <AvatarFallback>
                          <User className="h-4 w-4" />
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="font-medium">{shipment.customer.name}</div>
                        <div className="text-xs text-muted-foreground">
                          {shipment.customer.email}
                        </div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>{getStatusBadge(shipment.status)}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Truck className="h-4 w-4 text-muted-foreground" />
                      {shipment.carrier}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1 text-sm">
                      <MapPin className="h-3 w-3 text-muted-foreground" />
                      {shipment.origin}
                      <ArrowUpDown className="h-3 w-3 text-muted-foreground" />
                      <MapPin className="h-3 w-3 text-muted-foreground" />
                      {shipment.destination}
                    </div>
                  </TableCell>
                  <TableCell>{shipment.estimatedDelivery}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1">
                      <Package className="h-4 w-4 text-muted-foreground" />
                      {shipment.items}
                    </div>
                  </TableCell>
                  <TableCell>{shipment.weight}</TableCell>
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