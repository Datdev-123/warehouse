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
  AlertCircle
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
import { InventoryMovements } from "@/components/inventory/inventory-movements";
import { StockAdjustments } from "@/components/inventory/stock-adjustments";

export default function InventoryPage() {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Inventory Management</h1>
        <div className="flex items-center gap-2">
          <Button variant="outline">
            <History className="mr-2 h-4 w-4" />
            History
          </Button>
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Add Stock
          </Button>
        </div>
      </div>

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
              />
            </div>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="icon">
                  <Filter className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuItem>Warehouse A</DropdownMenuItem>
                <DropdownMenuItem>Warehouse B</DropdownMenuItem>
                <DropdownMenuItem>Warehouse C</DropdownMenuItem>
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
                <DropdownMenuItem>Product Name (A-Z)</DropdownMenuItem>
                <DropdownMenuItem>Product Name (Z-A)</DropdownMenuItem>
                <DropdownMenuItem>Stock Level (Low to High)</DropdownMenuItem>
                <DropdownMenuItem>Stock Level (High to Low)</DropdownMenuItem>
                <DropdownMenuItem>Value (Low to High)</DropdownMenuItem>
                <DropdownMenuItem>Value (High to Low)</DropdownMenuItem>
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
            <InventoryList />
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