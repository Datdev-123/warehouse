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
  Eye,
  Calendar,
  TableIcon,
  LayoutGrid
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
import { NewOrderModal } from "@/components/modals/new-order-modal";
import { useState, useEffect } from "react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

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
  const [sortBy, setSortBy] = useState("date_desc");
  const [filter, setFilter] = useState({ status: "all" });
  const [layout, setLayout] = useState<"table" | "grid">("table");
  const [searchTerm, setSearchTerm] = useState("");
  const [isFilterActive, setIsFilterActive] = useState(false);

  // Kiểm tra xem filter có đang kích hoạt hay không
  useEffect(() => {
    setIsFilterActive(filter.status !== "all");
  }, [filter]);

  // Xử lý thay đổi filter
  const handleFilterChange = (value: string) => {
    setFilter({ status: value });
    // Thêm hiệu ứng animation khi filter thay đổi
    const content = document.getElementById('orders-content');
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
    const content = document.getElementById('orders-content');
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

  const sortedOrders = [...orders].sort((a, b) => {
    switch (sortBy) {
      case "date_asc":
        return new Date(a.date).getTime() - new Date(b.date).getTime();
      case "date_desc":
        return new Date(b.date).getTime() - new Date(a.date).getTime();
      case "total_asc":
        return a.total - b.total;
      case "total_desc":
        return b.total - a.total;
      default:
        return 0;
    }
  });

  // Lọc dữ liệu theo filter.status và searchTerm
  const filteredOrders = sortedOrders.filter(order => 
    (filter.status === "all" || order.status === filter.status) && 
    (searchTerm === "" || 
     order.orderNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
     order.customer.name.toLowerCase().includes(searchTerm.toLowerCase()))
  );

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

  // Thêm đoạn JSX mới cho phần filter và layout
  const renderFilterAndControls = () => (
    <div className="flex items-center gap-3">
      <div className="relative w-96">
        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search orders..."
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
                  <DropdownMenuLabel>Filter by Status</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuRadioGroup value={filter.status} onValueChange={handleFilterChange}>
                    <DropdownMenuRadioItem value="all">All Orders</DropdownMenuRadioItem>
                    <DropdownMenuRadioItem value="pending">Pending</DropdownMenuRadioItem>
                    <DropdownMenuRadioItem value="processing">Processing</DropdownMenuRadioItem>
                    <DropdownMenuRadioItem value="shipped">Shipped</DropdownMenuRadioItem>
                    <DropdownMenuRadioItem value="delivered">Delivered</DropdownMenuRadioItem>
                    <DropdownMenuRadioItem value="cancelled">Cancelled</DropdownMenuRadioItem>
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
            <p>Filter orders</p>
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
            Status: {filter.status.charAt(0).toUpperCase() + filter.status.slice(1)}
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
          <DropdownMenuContent align="end" className="w-48">
            <DropdownMenuItem onClick={() => setSortBy("date_desc")}>Date (Newest First)</DropdownMenuItem>
            <DropdownMenuItem onClick={() => setSortBy("date_asc")}>Date (Oldest First)</DropdownMenuItem>
            <DropdownMenuItem onClick={() => setSortBy("total_desc")}>Total (High to Low)</DropdownMenuItem>
            <DropdownMenuItem onClick={() => setSortBy("total_asc")}>Total (Low to High)</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Orders</h1>
        <NewOrderModal />
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
          {renderFilterAndControls()}
        </div>

        {layout === "table" ? (
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
                {filteredOrders.map((order) => (
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
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredOrders.map((order) => (
              <Card key={order.id}>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-base">{order.orderNumber}</CardTitle>
                    {getStatusBadge(order.status)}
                  </div>
                  <CardDescription>
                    <div className="flex items-center gap-1">
                      <Calendar className="h-3 w-3" /> {order.date}
                    </div>
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-col gap-3">
                    <div className="flex items-center gap-2">
                      <Avatar className="h-8 w-8">
                        <AvatarImage src={order.customer.avatar} />
                        <AvatarFallback>
                          <User className="h-4 w-4" />
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="font-medium">{order.customer.name}</div>
                        <div className="text-xs text-muted-foreground">{order.customer.email}</div>
                      </div>
                    </div>
                    <div className="flex flex-col gap-1">
                      <div className="flex justify-between">
                        <span className="text-sm font-medium">Items:</span>
                        <span className="text-sm">{order.items}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm font-medium">Total:</span>
                        <span className="text-sm">${order.total.toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm font-medium">Payment:</span>
                        <span className="text-sm">{getPaymentStatusBadge(order.paymentStatus)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm font-medium">Shipping:</span>
                        <span className="text-sm">{order.shippingMethod}</span>
                      </div>
                    </div>
                    <Button variant="ghost" size="sm" className="self-end">
                      <Eye className="mr-2 h-4 w-4" />
                      View Details
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}