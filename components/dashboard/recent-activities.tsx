import { 
  Package, 
  ArrowDown, 
  ArrowUp, 
  Truck, 
  ShoppingCart,
  AlertCircle 
} from "lucide-react";

type Activity = {
  id: string;
  type: "stock-in" | "stock-out" | "shipped" | "ordered" | "alert";
  description: string;
  timestamp: string;
  user: string;
};

const activities: Activity[] = [
  {
    id: "1",
    type: "stock-in",
    description: "Added 50 units of Samsung Galaxy S22",
    timestamp: "2 hours ago",
    user: "John Doe",
  },
  {
    id: "2",
    type: "stock-out",
    description: "Removed 5 units of iPhone 13 Pro",
    timestamp: "3 hours ago",
    user: "Jane Smith",
  },
  {
    id: "3",
    type: "shipped",
    description: "Order #12345 has been shipped",
    timestamp: "5 hours ago",
    user: "System",
  },
  {
    id: "4",
    type: "ordered",
    description: "New order #12346 received",
    timestamp: "8 hours ago",
    user: "System",
  },
  {
    id: "5",
    type: "alert",
    description: "Low stock alert for Nike Air Max 270",
    timestamp: "12 hours ago",
    user: "System",
  },
];

export function RecentActivities() {
  const getActivityIcon = (type: Activity["type"]) => {
    switch (type) {
      case "stock-in":
        return (
          <div className="h-8 w-8 rounded-full bg-green-100 dark:bg-green-900/20 flex items-center justify-center text-green-600 dark:text-green-400">
            <ArrowDown className="h-4 w-4" />
          </div>
        );
      case "stock-out":
        return (
          <div className="h-8 w-8 rounded-full bg-blue-100 dark:bg-blue-900/20 flex items-center justify-center text-blue-600 dark:text-blue-400">
            <ArrowUp className="h-4 w-4" />
          </div>
        );
      case "shipped":
        return (
          <div className="h-8 w-8 rounded-full bg-purple-100 dark:bg-purple-900/20 flex items-center justify-center text-purple-600 dark:text-purple-400">
            <Truck className="h-4 w-4" />
          </div>
        );
      case "ordered":
        return (
          <div className="h-8 w-8 rounded-full bg-amber-100 dark:bg-amber-900/20 flex items-center justify-center text-amber-600 dark:text-amber-400">
            <ShoppingCart className="h-4 w-4" />
          </div>
        );
      case "alert":
        return (
          <div className="h-8 w-8 rounded-full bg-red-100 dark:bg-red-900/20 flex items-center justify-center text-red-600 dark:text-red-400">
            <AlertCircle className="h-4 w-4" />
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
    <div className="space-y-4">
      {activities.map((activity) => (
        <div
          key={activity.id}
          className="flex items-start space-x-3 border-b border-border pb-3 last:border-0 last:pb-0"
        >
          {getActivityIcon(activity.type)}
          <div className="space-y-1">
            <h4 className="font-medium">{activity.description}</h4>
            <div className="flex items-center text-xs text-muted-foreground">
              <span>{activity.timestamp}</span>
              <span className="mx-1">•</span>
              <span>{activity.user}</span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}