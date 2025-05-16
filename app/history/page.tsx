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
  FileText,
  ShoppingCart,
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
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuLabel,
  DropdownMenuSeparator
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useState, useEffect, useRef } from "react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

type ActivityType = {
  id: string;
  type: "stock_received" | "order_processed" | "shipment_created" | "stock_adjusted" | "user_added";
  action: string;
  description: string;
  user: {
    name: string;
    avatar: string;
  };
  timestamp: string;
  details?: {
    product?: string;
    quantity?: number;
    status?: string;
  };
  reference: string;
};

const activities: ActivityType[] = [
  {
    id: "1",
    type: "stock_received",
    action: "Stock Received",
    description: "Received new inventory stock",
    user: {
      name: "John Doe",
      avatar: "https://i.pravatar.cc/150?img=1"
    },
    timestamp: "2024-03-20 14:30",
    details: {
      product: "iPhone 13 Pro",
      quantity: 50
    },
    reference: "PO-12345"
  },
  {
    id: "2",
    type: "order_processed",
    action: "Order Processed",
    description: "New order processed and ready for shipment",
    user: {
      name: "Jane Smith",
      avatar: "https://i.pravatar.cc/150?img=2"
    },
    timestamp: "2024-03-20 13:15",
    details: {
      status: "Processing"
    },
    reference: "ORD-67890"
  },
  {
    id: "3",
    type: "shipment_created",
    action: "Shipment Created",
    description: "New shipment created for order",
    user: {
      name: "Mike Johnson",
      avatar: "https://i.pravatar.cc/150?img=3"
    },
    timestamp: "2024-03-20 12:45",
    reference: "SHP-34567"
  },
  {
    id: "4",
    type: "stock_adjusted",
    action: "Stock Adjusted",
    description: "Inventory count adjusted after audit",
    user: {
      name: "Sarah Wilson",
      avatar: "https://i.pravatar.cc/150?img=4"
    },
    timestamp: "2024-03-20 11:30",
    details: {
      product: "Samsung Galaxy S22",
      quantity: -3
    },
    reference: "ADJ-89012"
  },
  {
    id: "5",
    type: "user_added",
    action: "User Added",
    description: "New user account created",
    user: {
      name: "Admin System",
      avatar: "https://i.pravatar.cc/150?img=5"
    },
    timestamp: "2024-03-20 10:15",
    reference: "USR-45678"
  }
];

export default function HistoryPage() {
  const [sortBy, setSortBy] = useState("date_desc");
  const [filter, setFilter] = useState({ type: "all" });
  const [layout, setLayout] = useState<"table" | "grid">("table");
  const [searchTerm, setSearchTerm] = useState("");
  const [isFilterActive, setIsFilterActive] = useState(false);

  // Kiểm tra xem filter có đang kích hoạt hay không
  useEffect(() => {
    setIsFilterActive(filter.type !== "all");
  }, [filter]);

  // Xử lý thay đổi filter
  const handleFilterChange = (value: string) => {
    setFilter({ type: value });
    // Thêm hiệu ứng animation khi filter thay đổi
    const content = document.getElementById('history-content');
    if (content) {
      content.classList.add('filter-transition');
      setTimeout(() => {
        content.classList.remove('filter-transition');
      }, 300);
    }
  };

  // Xử lý thay đổi layout từ nút trên cùng
  const handleTopButtonLayoutChange = () => {
    const newLayout = layout === "table" ? "grid" : "table";
    handleLayoutChange(newLayout);
  };

  // Xử lý thay đổi layout
  const handleLayoutChange = (value: string) => {
    const newLayout = value as "table" | "grid";
    
    // Thêm hiệu ứng chuyển đổi mượt mà
    const content = document.getElementById('history-content');
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

  const filteredActivities = [...activities].filter(activity => 
    filter.type === "all" || activity.type.includes(filter.type)
  ).sort((a, b) => {
    switch (sortBy) {
      case "date_asc":
        return new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime();
      case "date_desc":
        return new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime();
      case "type":
        return a.action.localeCompare(b.action);
      case "user":
        return a.user.name.localeCompare(b.user.name);
      default:
        return new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime();
    }
  });

  const getActivityIcon = (type: ActivityType["type"]) => {
    switch (type) {
      case "stock_received":
        return (
          <div className="h-9 w-9 rounded-full bg-green-100 dark:bg-green-800/30 flex items-center justify-center text-green-600 dark:text-green-400">
            <ArrowDown className="h-5 w-5" />
          </div>
        );
      case "order_processed":
        return (
          <div className="h-9 w-9 rounded-full bg-yellow-100 dark:bg-yellow-800/30 flex items-center justify-center text-yellow-600 dark:text-yellow-400">
            <ShoppingCart className="h-5 w-5" />
          </div>
        );
      case "shipment_created":
        return (
          <div className="h-9 w-9 rounded-full bg-purple-100 dark:bg-purple-800/30 flex items-center justify-center text-purple-600 dark:text-purple-400">
            <Truck className="h-5 w-5" />
          </div>
        );
      case "stock_adjusted":
        return (
          <div className="h-9 w-9 rounded-full bg-red-100 dark:bg-red-800/30 flex items-center justify-center text-red-600 dark:text-red-400">
            <AlertCircle className="h-5 w-5" />
          </div>
        );
      case "user_added":
        return (
          <div className="h-9 w-9 rounded-full bg-blue-100 dark:bg-blue-800/30 flex items-center justify-center text-blue-600 dark:text-blue-400">
            <User className="h-5 w-5" />
          </div>
        );
      default:
        return (
          <div className="h-9 w-9 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center text-gray-600 dark:text-gray-400">
            <Package className="h-5 w-5" />
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

      <div className="flex items-center gap-3">
        <div className="relative w-96">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search activities..."
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
                    <DropdownMenuLabel>Filter by Type</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuRadioGroup value={filter.type} onValueChange={handleFilterChange}>
                      <DropdownMenuRadioItem value="all">All Activities</DropdownMenuRadioItem>
                      <DropdownMenuRadioItem value="stock">Stock Changes</DropdownMenuRadioItem>
                      <DropdownMenuRadioItem value="order">Orders</DropdownMenuRadioItem>
                      <DropdownMenuRadioItem value="shipment">Shipments</DropdownMenuRadioItem>
                      <DropdownMenuRadioItem value="user">Users</DropdownMenuRadioItem>
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
              <p>Filter activities</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
        
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button 
                variant="outline" 
                size="icon"
                onClick={handleTopButtonLayoutChange}
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
              {filter.type === "stock" ? "Stock Changes" : 
               filter.type === "order" ? "Orders" : 
               filter.type === "shipment" ? "Shipments" : 
               filter.type === "user" ? "Users" : filter.type}
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
            <DropdownMenuContent align="end" className="w-40">
              <DropdownMenuItem onClick={() => setSortBy("date_desc")}>Date (Newest)</DropdownMenuItem>
              <DropdownMenuItem onClick={() => setSortBy("date_asc")}>Date (Oldest)</DropdownMenuItem>
              <DropdownMenuItem onClick={() => setSortBy("type")}>Activity Type</DropdownMenuItem>
              <DropdownMenuItem onClick={() => setSortBy("user")}>User</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      <div id="history-content">
        {layout === "table" ? (
          <div className="rounded-md border bg-card dark:border-border">
            <Table>
              <TableHeader className="bg-muted/50 dark:bg-background">
                <TableRow className="hover:bg-transparent">
                  <TableHead className="w-[180px] font-semibold">Activity</TableHead>
                  <TableHead className="w-[150px] font-semibold">User</TableHead>
                  <TableHead className="font-semibold">Description</TableHead>
                  <TableHead className="font-semibold">Details</TableHead>
                  <TableHead className="w-[150px] font-semibold">Timestamp</TableHead>
                  <TableHead className="w-[120px] font-semibold">Reference</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredActivities.map((activity) => (
                  <TableRow key={activity.id} className="hover:bg-muted/50">
                    <TableCell>
                      <div className="flex items-center gap-3">
                        {getActivityIcon(activity.type)}
                        <div className="font-medium">{activity.action}</div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Avatar className="h-7 w-7 border border-border">
                          <AvatarImage src={activity.user.avatar} />
                          <AvatarFallback>
                            {activity.user.name.charAt(0)}
                          </AvatarFallback>
                        </Avatar>
                        <span className="text-sm">{activity.user.name}</span>
                      </div>
                    </TableCell>
                    <TableCell>{activity.description}</TableCell>
                    <TableCell>
                      {activity.type === "stock_received" && (
                        <>
                          <div>Product: {activity.details?.product}</div>
                          <div>Quantity: {activity.details?.quantity}</div>
                        </>
                      )}
                      {activity.type === "order_processed" && (
                        <div>Status: {activity.details?.status}</div>
                      )}
                      {activity.type === "shipment_created" && (
                        <div></div>
                      )}
                      {activity.type === "stock_adjusted" && (
                        <>
                          <div>Product: {activity.details?.product}</div>
                          <div>Quantity: {activity.details?.quantity}</div>
                        </>
                      )}
                      {activity.type === "user_added" && (
                        <div></div>
                      )}
                    </TableCell>
                    <TableCell>{activity.timestamp}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <FileText className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm font-medium">{activity.reference}</span>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        ) : (
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {filteredActivities.map((activity) => (
              <Card key={activity.id}>
                <CardHeader className="pb-2">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-base">
                      {activity.action}
                    </CardTitle>
                    <Badge variant={
                      activity.type === "stock_received" ? "default" :
                      activity.type === "order_processed" ? "secondary" :
                      activity.type === "shipment_created" ? "outline" :
                      activity.type === "stock_adjusted" ? "destructive" :
                      "default"
                    }>
                      {activity.reference}
                    </Badge>
                  </div>
                  <CardDescription>
                    {activity.timestamp}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center gap-2 mb-2">
                    <Avatar className="h-6 w-6">
                      <AvatarImage src={activity.user.avatar} />
                      <AvatarFallback>{activity.user.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div className="text-sm font-medium">{activity.user.name}</div>
                  </div>
                  <p className="text-sm text-muted-foreground mb-2">
                    {activity.description}
                  </p>
                  {activity.details && (
                    <div className="text-sm bg-muted/50 p-2 rounded-md">
                      {activity.type === "stock_received" && (
                        <>
                          <div>Product: {activity.details.product}</div>
                          <div>Quantity: {activity.details.quantity}</div>
                        </>
                      )}
                      {activity.type === "order_processed" && (
                        <div>Status: {activity.details.status}</div>
                      )}
                      {activity.type === "stock_adjusted" && (
                        <>
                          <div>Product: {activity.details.product}</div>
                          <div>Quantity: {activity.details.quantity}</div>
                        </>
                      )}
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}