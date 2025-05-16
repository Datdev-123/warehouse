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
  User,
  FileText,
  TableIcon,
  LayoutGrid,
  MoreHorizontal,
  Edit
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
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem
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
import { CreateShipmentModal } from "@/components/modals/create-shipment-modal";
import { useState, useEffect } from "react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

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
  reference?: string;
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
    weight: "4.5 kg",
    reference: "ORD-67890"
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
    weight: "2.1 kg",
    reference: "SO-67890"
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
    weight: "1.8 kg",
    reference: "SHP-34567"
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
    weight: "5.2 kg",
    reference: "ADJ-89012"
  }
];

export default function ShipmentsPage() {
  const [sortBy, setSortBy] = useState("date_desc");
  const [filter, setFilter] = useState({ carrier: "all" });
  const [layout, setLayout] = useState<"table" | "grid">("table");
  const [searchTerm, setSearchTerm] = useState("");
  const [isFilterActive, setIsFilterActive] = useState(false);

  // Kiểm tra xem filter có đang kích hoạt hay không
  useEffect(() => {
    setIsFilterActive(filter.carrier !== "all");
  }, [filter]);

  // Xử lý thay đổi filter
  const handleFilterChange = (value: string) => {
    setFilter({ carrier: value });
    // Thêm hiệu ứng animation khi filter thay đổi
    const content = document.getElementById('shipments-content');
    if (content) {
      content.classList.add('filter-transition');
      setTimeout(() => {
        content.classList.remove('filter-transition');
      }, 300);
    }
  };

  // Xử lý thay đổi layout
  const handleLayoutChange = (value: string) => {
    const newLayout = value as "table" | "grid";
    
    // Thêm hiệu ứng chuyển đổi mượt mà
    const content = document.getElementById('shipments-content');
    if (content) {
      content.classList.add('layout-transition');
      setTimeout(() => {
        setLayout(newLayout);
        setTimeout(() => {
          content.classList.remove('layout-transition');
        }, 300);
      }, 50);
    } else {
      setLayout(newLayout);
    }
  };

  // Thêm CSS cho animation
  useEffect(() => {
    const style = document.createElement('style');
    style.innerHTML = `
      .filter-transition {
        opacity: 0.7;
        transition: opacity 0.3s ease;
      }
      .layout-transition {
        opacity: 0.7;
        transform: scale(0.98);
        transition: all 0.3s ease;
      }
      @keyframes pulse {
        0% { box-shadow: 0 0 0 0 rgba(59, 130, 246, 0.5); }
        70% { box-shadow: 0 0 0 6px rgba(59, 130, 246, 0); }
        100% { box-shadow: 0 0 0 0 rgba(59, 130, 246, 0); }
      }
      .filter-active {
        animation: pulse 1.5s infinite;
      }
    `;
    document.head.appendChild(style);
    return () => {
      document.head.removeChild(style);
    };
  }, []);

  const filteredShipments = [...shipments].filter(shipment => 
    (filter.carrier === "all" || shipment.carrier === filter.carrier) &&
    (searchTerm === "" || 
    shipment.trackingNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
    shipment.orderNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
    shipment.customer.name.toLowerCase().includes(searchTerm.toLowerCase()))
  ).sort((a, b) => {
    switch (sortBy) {
      case "date_asc":
        return Number(new Date(a.estimatedDelivery)) - Number(new Date(b.estimatedDelivery));
      case "date_desc":
        return Number(new Date(b.estimatedDelivery)) - Number(new Date(a.estimatedDelivery));
      case "status":
        return a.status.localeCompare(b.status);
      case "carrier":
        return a.carrier.localeCompare(b.carrier);
      default:
        return 0;
    }
  });

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
        <CreateShipmentModal />
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Total Shipments</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">542</div>
            <p className="text-xs text-muted-foreground">
              Last 30 days
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Pending</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">23</div>
            <p className="text-xs text-muted-foreground">
              Awaiting processing
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">In Transit</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">89</div>
            <p className="text-xs text-muted-foreground">
              On the way
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Delivered</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">430</div>
            <p className="text-xs text-muted-foreground">
              Successfully delivered
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="flex flex-col gap-4">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div className="flex items-center gap-3">
            <div className="relative w-96">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search shipments..."
                className="w-full h-9 pl-8 bg-background border-border"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <div>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button 
                          variant="outline" 
                          size="icon"
                          className={isFilterActive ? "filter-active border-primary text-primary" : ""}
                        >
                          <Filter className="h-4 w-4" />
                          {isFilterActive && (
                            <span className="absolute -top-1 -right-1 flex h-3 w-3 items-center justify-center rounded-full bg-primary">
                              <span className="h-2 w-2 rounded-full bg-white"></span>
                            </span>
                          )}
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end" className="w-56">
                        <DropdownMenuLabel>Filter by Carrier</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuRadioGroup value={filter.carrier} onValueChange={handleFilterChange}>
                          <DropdownMenuRadioItem value="all">All Carriers</DropdownMenuRadioItem>
                          <DropdownMenuRadioItem value="FedEx">FedEx</DropdownMenuRadioItem>
                          <DropdownMenuRadioItem value="UPS">UPS</DropdownMenuRadioItem>
                          <DropdownMenuRadioItem value="DHL">DHL</DropdownMenuRadioItem>
                          <DropdownMenuRadioItem value="USPS">USPS</DropdownMenuRadioItem>
                        </DropdownMenuRadioGroup>
                        {isFilterActive && (
                          <>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem onClick={() => handleFilterChange("all")}>
                              Clear Filter
                            </DropdownMenuItem>
                          </>
                        )}
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Filter shipments</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
            
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button 
                    variant="outline" 
                    size="icon"
                    onClick={() => handleLayoutChange(layout === "table" ? "grid" : "table")}
                    className={layout === "grid" ? "border-primary text-primary" : ""}
                  >
                    {layout === "table" ? <LayoutGrid className="h-4 w-4" /> : <TableIcon className="h-4 w-4" />}
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Switch to {layout === "table" ? "grid" : "table"} view</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
            
            <div className="ml-auto flex items-center gap-2">
              {isFilterActive && (
                <Badge variant="outline" className="bg-primary/10 text-primary">
                  Carrier: {filter.carrier}
                  <button 
                    className="ml-2 text-primary hover:text-primary/70" 
                    onClick={() => handleFilterChange("all")}
                  >
                    ✕
                  </button>
                </Badge>
              )}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" className="flex items-center gap-1">
                    Sort by
                    <ChevronDown className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  <DropdownMenuItem onClick={() => setSortBy("date_desc")}>Date (Newest First)</DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setSortBy("date_asc")}>Date (Oldest First)</DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setSortBy("status")}>Status</DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setSortBy("carrier")}>Carrier</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </div>

        <div id="shipments-content">
          {layout === "table" ? (
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Shipment ID</TableHead>
                    <TableHead>Order</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Customer</TableHead>
                    <TableHead>Shipping Method</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Tracking</TableHead>
                    <TableHead className="w-[80px]"></TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredShipments.map((shipment) => (
                    <TableRow key={shipment.id}>
                      <TableCell className="font-medium">{shipment.id}</TableCell>
                      <TableCell>{shipment.orderNumber}</TableCell>
                      <TableCell>{getStatusBadge(shipment.status)}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Avatar className="h-8 w-8">
                            <AvatarImage src={shipment.customer.avatar} />
                            <AvatarFallback>
                              {shipment.customer.name.charAt(0)}
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
                      <TableCell>{shipment.carrier}</TableCell>
                      <TableCell>{shipment.estimatedDelivery}</TableCell>
                      <TableCell>
                        {shipment.trackingNumber ? (
                          <div className="flex items-center gap-2">
                            <Truck className="h-4 w-4 text-muted-foreground" />
                            <span className="text-xs">{shipment.trackingNumber}</span>
                          </div>
                        ) : (
                          <Badge variant="outline">Not Available</Badge>
                        )}
                      </TableCell>
                      <TableCell>
                        <div className="flex justify-end">
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="icon">
                                <MoreHorizontal className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem>
                                <Eye className="mr-2 h-4 w-4" />
                                View Details
                              </DropdownMenuItem>
                              <DropdownMenuItem>
                                <Edit className="mr-2 h-4 w-4" />
                                Update Status
                              </DropdownMenuItem>
                              <DropdownMenuItem>
                                <FileText className="mr-2 h-4 w-4" />
                                Print Label
                              </DropdownMenuItem>
                              <DropdownMenuSeparator />
                              <DropdownMenuItem className="text-red-600">
                                <XCircle className="mr-2 h-4 w-4" />
                                Cancel Shipment
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
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredShipments.map((shipment) => (
                <Card key={shipment.id}>
                  <CardHeader className="pb-2">
                    <div className="flex items-center justify-between">
                      <div>
                        <CardTitle className="text-base">{shipment.id}</CardTitle>
                        <CardDescription>Order: {shipment.orderNumber}</CardDescription>
                      </div>
                      {getStatusBadge(shipment.status)}
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-center gap-2">
                        <Avatar className="h-8 w-8">
                          <AvatarImage src={shipment.customer.avatar} />
                          <AvatarFallback>{shipment.customer.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <div>
                          <div className="font-medium">{shipment.customer.name}</div>
                          <div className="text-xs text-muted-foreground">{shipment.customer.email}</div>
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-2 gap-2 text-sm">
                        <div>
                          <div className="text-muted-foreground">Shipping Method:</div>
                          <div>{shipment.carrier}</div>
                        </div>
                        <div>
                          <div className="text-muted-foreground">Date:</div>
                          <div>{shipment.estimatedDelivery}</div>
                        </div>
                      </div>
                      
                      <div>
                        <div className="text-muted-foreground text-sm mb-1">Tracking:</div>
                        {shipment.trackingNumber ? (
                          <div className="flex items-center gap-2">
                            <Truck className="h-4 w-4 text-muted-foreground" />
                            <span>{shipment.trackingNumber}</span>
                          </div>
                        ) : (
                          <Badge variant="outline">Not Available</Badge>
                        )}
                      </div>
                      
                      <div className="flex justify-end gap-2">
                        <Button variant="outline" size="sm">
                          <Eye className="mr-2 h-4 w-4" />
                          Details
                        </Button>
                        <Button variant="outline" size="sm">
                          <FileText className="mr-2 h-4 w-4" />
                          Label
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}