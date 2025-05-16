"use client";

import {
  ArrowUpDown,
  ChevronDown,
  Filter,
  Plus,
  Search,
  SlidersHorizontal,
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
import { ProductList } from "@/components/products/product-list";
import { ProductGrid } from "@/components/products/product-grid";
import { AddProductModal } from "@/components/modals/add-product-modal";
import { useState, useEffect } from "react";
import { Badge } from "@/components/ui/badge";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export default function ProductsPage() {
  const [sortBy, setSortBy] = useState("name_asc");
  const [filter, setFilter] = useState({ category: "all" });
  const [layout, setLayout] = useState<"list" | "grid">("list");
  const [searchTerm, setSearchTerm] = useState("");
  const [isFilterActive, setIsFilterActive] = useState(false);

  // Kiểm tra xem filter có đang kích hoạt hay không
  useEffect(() => {
    setIsFilterActive(filter.category !== "all");
  }, [filter]);

  // Xử lý thay đổi filter
  const handleFilterChange = (value: string) => {
    setFilter({ category: value });
    // Thêm hiệu ứng animation khi filter thay đổi
    const content = document.getElementById('products-content');
    if (content) {
      content.classList.add('filter-transition');
      setTimeout(() => {
        content.classList.remove('filter-transition');
      }, 300);
    }
  };

  // Xử lý thay đổi layout
  const handleLayoutChange = (value: string) => {
    const newLayout = value as "list" | "grid";
    
    // Thêm hiệu ứng chuyển đổi mượt mà
    const content = document.getElementById('products-content');
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

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Products</h1>
        <AddProductModal />
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Total Products</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">2,543</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Active Products</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">2,112</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Low Stock Products</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">45</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Out of Stock Products</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">15</div>
          </CardContent>
        </Card>
      </div>

      <div className="flex flex-col gap-4">
        <div className="flex items-center gap-3">
          <div className="relative w-96">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search products..."
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
                      <DropdownMenuLabel>Filter by Category</DropdownMenuLabel>
                      <DropdownMenuSeparator />
                      <DropdownMenuRadioGroup value={filter.category} onValueChange={handleFilterChange}>
                        <DropdownMenuRadioItem value="all">All Categories</DropdownMenuRadioItem>
                        <DropdownMenuRadioItem value="Electronics">Electronics</DropdownMenuRadioItem>
                        <DropdownMenuRadioItem value="Clothing">Clothing</DropdownMenuRadioItem>
                        <DropdownMenuRadioItem value="Furniture">Furniture</DropdownMenuRadioItem>
                        <DropdownMenuRadioItem value="Food">Food</DropdownMenuRadioItem>
                        <DropdownMenuRadioItem value="Toys">Toys</DropdownMenuRadioItem>
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
                <p>Filter products</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
          
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button 
                  variant="outline" 
                  size="icon"
                  onClick={() => handleLayoutChange(layout === "list" ? "grid" : "list")}
                  className={layout === "grid" ? "border-primary text-primary" : ""}
                >
                  {layout === "list" ? <LayoutGrid className="h-4 w-4" /> : <TableIcon className="h-4 w-4" />}
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Switch to {layout === "list" ? "grid" : "list"} view</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
          
          <div className="ml-auto flex items-center gap-2">
            {isFilterActive && (
              <Badge variant="outline" className="bg-primary/10 text-primary">
                {filter.category}
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
                <DropdownMenuItem onClick={() => setSortBy("name_asc")}>Name (A-Z)</DropdownMenuItem>
                <DropdownMenuItem onClick={() => setSortBy("name_desc")}>Name (Z-A)</DropdownMenuItem>
                <DropdownMenuItem onClick={() => setSortBy("price_asc")}>Price (Low to High)</DropdownMenuItem>
                <DropdownMenuItem onClick={() => setSortBy("price_desc")}>Price (High to Low)</DropdownMenuItem>
                <DropdownMenuItem onClick={() => setSortBy("stock_asc")}>Stock (Low to High)</DropdownMenuItem>
                <DropdownMenuItem onClick={() => setSortBy("stock_desc")}>Stock (High to Low)</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
        <div id="products-content">
          {layout === "list" ? (
            <div className="pt-4">
              <div className="flex items-center justify-end">
                <div className="text-sm text-muted-foreground">
                  Showing <span className="font-medium">1-10</span> of{" "}
                  <span className="font-medium">2,543</span> products
                </div>
              </div>
              <ProductList sortBy={sortBy} filter={filter} />
            </div>
          ) : (
            <div className="pt-4">
              <div className="flex items-center justify-end">
                <div className="text-sm text-muted-foreground">
                  Showing <span className="font-medium">1-10</span> of{" "}
                  <span className="font-medium">2,543</span> products
                </div>
              </div>
              <ProductGrid sortBy={sortBy} filter={filter} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}