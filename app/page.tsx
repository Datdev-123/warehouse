import { 
  BarChart3, 
  ShoppingCart, 
  Package, 
  AlertCircle, 
  TrendingUp, 
  TrendingDown,
  DollarSign,
  Truck,
  ArrowRight
} from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { DashboardChart } from "@/components/dashboard/dashboard-chart";
import { InventorySummary } from "@/components/dashboard/inventory-summary";
import { RecentActivities } from "@/components/dashboard/recent-activities";
import { LowStockAlert } from "@/components/dashboard/low-stock-alert";

export default function Home() {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
        <div className="flex items-center gap-2">
          <Button variant="outline">Export</Button>
          <Button>Refresh Data</Button>
        </div>
      </div>
      
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Total Products</CardTitle>
            <Package className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">2,543</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-emerald-500 font-medium flex items-center">
                <TrendingUp className="h-3 w-3 mr-1" /> +12.2%
              </span>{" "}
              from last month
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Total Orders</CardTitle>
            <ShoppingCart className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12,234</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-emerald-500 font-medium flex items-center">
                <TrendingUp className="h-3 w-3 mr-1" /> +8.4%
              </span>{" "}
              from last month
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Revenue</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$123,456</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-rose-500 font-medium flex items-center">
                <TrendingDown className="h-3 w-3 mr-1" /> -2.1%
              </span>{" "}
              from last month
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Pending Shipments</CardTitle>
            <Truck className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">56</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-emerald-500 font-medium flex items-center">
                <TrendingUp className="h-3 w-3 mr-1" /> +4.5%
              </span>{" "}
              from last month
            </p>
          </CardContent>
        </Card>
      </div>
      
      <Tabs defaultValue="inventory" className="space-y-4">
        <TabsList>
          <TabsTrigger value="inventory">Inventory</TabsTrigger>
          <TabsTrigger value="sales">Sales</TabsTrigger>
          <TabsTrigger value="operations">Operations</TabsTrigger>
        </TabsList>
        
        <TabsContent value="inventory" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            <Card className="col-span-2">
              <CardHeader>
                <CardTitle>Inventory Overview</CardTitle>
                <CardDescription>
                  Monthly inventory levels across categories
                </CardDescription>
              </CardHeader>
              <CardContent className="pl-2">
                <DashboardChart />
              </CardContent>
            </Card>
            
            <Card className="col-span-1">
              <CardHeader>
                <CardTitle>
                  <div className="flex items-center justify-between">
                    <span>Low Stock Alerts</span>
                    <Badge variant="destructive" className="ml-2">4 items</Badge>
                  </div>
                </CardTitle>
                <CardDescription>
                  Products that need replenishing
                </CardDescription>
              </CardHeader>
              <CardContent>
                <LowStockAlert />
              </CardContent>
            </Card>
          </div>
          
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
            <Card className="col-span-4">
              <CardHeader>
                <CardTitle>Inventory Summary</CardTitle>
                <CardDescription>
                  Top products by stock level and category
                </CardDescription>
              </CardHeader>
              <CardContent>
                <InventorySummary />
              </CardContent>
            </Card>
            
            <Card className="col-span-3">
              <CardHeader>
                <CardTitle>Recent Activities</CardTitle>
                <CardDescription>
                  Latest inventory movements and updates
                </CardDescription>
              </CardHeader>
              <CardContent>
                <RecentActivities />
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        <TabsContent value="sales" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Sales Analytics</CardTitle>
              <CardDescription>
                View your sales performance over time
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-80 flex items-center justify-center border border-dashed rounded-md">
                <p className="text-muted-foreground">Sales data visualization will appear here</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="operations" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Operational Metrics</CardTitle>
              <CardDescription>
                Track warehouse operations and efficiency
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-80 flex items-center justify-center border border-dashed rounded-md">
                <p className="text-muted-foreground">Operations data visualization will appear here</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}