"use client";

import {
  ArrowUpDown,
  ChevronDown,
  Filter,
  Plus,
  Search,
  SlidersHorizontal,
  ArrowUpCircle,
  ArrowDownCircle,
  History,
  AlertCircle,
  LayoutGrid,
  TableIcon
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
import { InventoryList } from "@/components/inventory/inventory-list";
import { InventoryGrid } from "@/components/inventory/inventory-grid";
import { InventoryMovements } from "@/components/inventory/inventory-movements";
import { StockAdjustments } from "@/components/inventory/stock-adjustments";
import { useEffect, useState } from "react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger
} from "@/components/ui/tooltip";
import { AddStockModal } from "@/components/modals/add-stock-modal";

export default function InventoryPage() {
  const [sortBy, setSortBy] = useState("product_asc");
  const [filter, setFilter] = useState({ warehouse: "all" });
  const [layout, setLayout] = useState<"table" | "grid">("table");
  const [searchTerm, setSearchTerm] = useState("");
  const [isFilterActive, setIsFilterActive] = useState(false);

  // Kiểm tra xem filter có đang kích hoạt hay không
  useEffect(() => {
    setIsFilterActive(filter.warehouse !== "all");
  }, [filter]);

  // Xử lý thay đổi filter
  const handleFilterChange = (value: string) => {
    setFilter({ warehouse: value });
    // Thêm hiệu ứng animation khi filter thay đổi
    const content = document.getElementById('inventory-content');
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
    setLayout(newLayout);
    
    // Thêm hiệu ứng chuyển đổi mượt mà
    const content = document.getElementById('inventory-content');
    if (content) {
      content.classList.add('layout-transition');
      setTimeout(() => {
        content.classList.remove('layout-transition');
      }, 300);
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
      @keyframes fadeIn {
        0% { opacity: 0; transform: translateY(10px); }
        100% { opacity: 1; transform: translateY(0); }
      }
      .fade-in {
        animation: fadeIn 0.5s ease-in-out;
      }
      .inventory-grid-container {
        transition: all 0.3s ease-in-out;
      }
      /* Thêm hiệu ứng nổi bật cho hàng trong bảng */
      .inventory-row:hover {
        background-color: rgba(59, 130, 246, 0.1);
        transform: translateY(-2px);
        transition: all 0.2s ease;
        box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
      }
      /* Hiệu ứng cho các card */
      .inventory-card {
        transition: all 0.3s ease;
      }
      .inventory-card:hover {
        transform: translateY(-5px);
        box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
      }
      /* Hiệu ứng cho badge trạng thái */
      .status-badge {
        transition: all 0.2s ease;
      }
      .status-badge:hover {
        transform: scale(1.05);
      }
      /* Hiệu ứng cho nút chuyển đổi */
      .toggle-btn {
        position: relative;
        overflow: hidden;
      }
      .toggle-btn:after {
        content: '';
        position: absolute;
        top: 50%;
        left: 50%;
        width: 5px;
        height: 5px;
        background: rgba(255, 255, 255, 0.5);
        opacity: 0;
        border-radius: 100%;
        transform: scale(1, 1) translate(-50%);
        transform-origin: 50% 50%;
      }
      .toggle-btn:focus:not(:active)::after {
        animation: ripple 1s ease-out;
      }
      @keyframes ripple {
        0% {
          transform: scale(0, 0);
          opacity: 1;
        }
        20% {
          transform: scale(25, 25);
          opacity: 1;
        }
        100% {
          opacity: 0;
          transform: scale(40, 40);
        }
      }
    `;
    document.head.appendChild(style);
    return () => {
      document.head.removeChild(style);
    };
  }, []);

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Inventory Management</h1>
        <div className="flex items-center gap-2">
          <Button variant="outline">
            <History className="mr-2 h-4 w-4" />
            History
          </Button>
          <AddStockModal />
        </div>
      </div>

      {/* Thông báo chế độ xem hiện tại */}
      {/* <div className="px-4 py-2 bg-yellow-100 rounded-md text-yellow-800 flex items-center justify-between">
        <div>
          <span className="font-medium">Chế độ xem hiện tại: </span>
          <span className="bg-white px-2 py-1 rounded-md shadow-sm font-bold">
            {layout === "table" ? "Table" : "Grid"}
          </span>
        </div>
        <div className="flex items-center gap-2">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button 
                  variant="outline" 
                  size="icon"
                  onClick={() => handleLayoutChange(layout === "table" ? "grid" : "table")}
                  className={`toggle-btn ${layout === "grid" ? "border-primary text-primary" : ""}`}
                >
                  {layout === "table" ? <LayoutGrid className="h-4 w-4" /> : <TableIcon className="h-4 w-4" />}
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Switch to {layout === "table" ? "grid" : "table"} view</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      </div> */}

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Total Stock Value</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$284,234.00</div>
            <p className="text-xs text-muted-foreground">
              Across all warehouses
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Stock In (Monthly)</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1,234</div>
            <p className="text-xs text-emerald-500 flex items-center">
              <ArrowUpCircle className="mr-1 h-3 w-3" />
              +12.5% from last month
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Stock Out (Monthly)</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">867</div>
            <p className="text-xs text-rose-500 flex items-center">
              <ArrowDownCircle className="mr-1 h-3 w-3" />
              -5.2% from last month
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Stock Alerts</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-amber-500 flex items-center">
              8
              <AlertCircle className="ml-2 h-5 w-5" />
            </div>
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
                placeholder="Search inventory..."
                className="w-full pl-8"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button 
                  variant="outline" 
                  size="icon"
                  className={isFilterActive ? "filter-active" : ""}
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
                <DropdownMenuItem onClick={() => handleFilterChange("all")}>All Warehouses</DropdownMenuItem>
                <DropdownMenuItem onClick={() => handleFilterChange("Warehouse A")}>Warehouse A</DropdownMenuItem>
                <DropdownMenuItem onClick={() => handleFilterChange("Warehouse B")}>Warehouse B</DropdownMenuItem>
                <DropdownMenuItem onClick={() => handleFilterChange("Warehouse C")}>Warehouse C</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
          <div className="flex items-center gap-2">
            {isFilterActive && (
              <div className="bg-primary/10 text-primary rounded-md px-2 py-1 text-sm flex items-center">
                Filter: {filter.warehouse}
                <button 
                  className="ml-2 text-primary hover:text-primary/70" 
                  onClick={() => handleFilterChange("all")}
                >
                  ✕
                </button>
              </div>
            )}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="flex items-center gap-1">
                  Sort by
                  <ChevronDown className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-40">
                <DropdownMenuItem onClick={() => setSortBy("product_asc")}>Product Name (A-Z)</DropdownMenuItem>
                <DropdownMenuItem onClick={() => setSortBy("product_desc")}>Product Name (Z-A)</DropdownMenuItem>
                <DropdownMenuItem onClick={() => setSortBy("stock_asc")}>Stock Level (Low to High)</DropdownMenuItem>
                <DropdownMenuItem onClick={() => setSortBy("stock_desc")}>Stock Level (High to Low)</DropdownMenuItem>
                <DropdownMenuItem onClick={() => setSortBy("value_asc")}>Value (Low to High)</DropdownMenuItem>
                <DropdownMenuItem onClick={() => setSortBy("value_desc")}>Value (High to Low)</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
        
        <Tabs defaultValue="inventory">
          <TabsList>
            <TabsTrigger value="inventory">Current Stock</TabsTrigger>
            <TabsTrigger value="movements">Stock Movements</TabsTrigger>
            <TabsTrigger value="adjustments">Stock Adjustments</TabsTrigger>
          </TabsList>
          <TabsContent value="inventory" className="pt-4">
            <div id="inventory-content">
              {layout === "table" ? (
                <InventoryList 
                  sortBy={sortBy} 
                  filter={filter}
                  searchTerm={searchTerm}
                />
              ) : (
                <InventoryGrid 
                  sortBy={sortBy} 
                  filter={filter}
                  searchTerm={searchTerm}
                />
              )}
            </div>
          </TabsContent>
          <TabsContent value="movements" className="pt-4">
            <InventoryMovements />
          </TabsContent>
          <TabsContent value="adjustments" className="pt-4">
            <StockAdjustments />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}