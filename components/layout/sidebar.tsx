"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  LayoutDashboard, 
  Package, 
  ShoppingCart, 
  BarChart3, 
  Users, 
  Settings, 
  Truck,
  Boxes,
  History,
  ScanLine
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useSidebarContext } from "@/contexts/sidebar-context";

interface NavItem {
  title: string;
  href: string;
  icon: React.ReactNode;
}

const navItems: NavItem[] = [
  {
    title: "Dashboard",
    href: "/",
    icon: <LayoutDashboard className="w-5 h-5" />,
  },
  {
    title: "Products",
    href: "/products",
    icon: <Package className="w-5 h-5" />,
  },
  {
    title: "Inventory",
    href: "/inventory",
    icon: <Boxes className="w-5 h-5" />,
  },
  {
    title: "Orders",
    href: "/orders",
    icon: <ShoppingCart className="w-5 h-5" />,
  },
  {
    title: "Shipments",
    href: "/shipments",
    icon: <Truck className="w-5 h-5" />,
  },
  {
    title: "Scanner",
    href: "/scanner",
    icon: <ScanLine className="w-5 h-5" />,
  },
  {
    title: "History",
    href: "/history",
    icon: <History className="w-5 h-5" />,
  },
  {
    title: "Reports",
    href: "/reports",
    icon: <BarChart3 className="w-5 h-5" />,
  },
  {
    title: "Users",
    href: "/users",
    icon: <Users className="w-5 h-5" />,
  },
  {
    title: "Settings",
    href: "/settings",
    icon: <Settings className="w-5 h-5" />,
  },
];

export default function Sidebar() {
  const pathname = usePathname();
  const { isSidebarOpen } = useSidebarContext();
  const [mounted, setMounted] = useState(false);
  
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <aside 
      className={cn(
        "fixed inset-y-0 left-0 z-20 flex w-64 flex-col border-r border-border bg-card transition-transform duration-300 ease-in-out md:relative md:translate-x-0",
        isSidebarOpen ? "translate-x-0" : "-translate-x-full"
      )}
    >
      <div className="flex h-16 items-center border-b border-border px-6">
        <Link 
          href="/" 
          className="flex items-center gap-2 font-semibold text-xl text-primary"
        >
          <Boxes className="h-6 w-6" />
          <span>WareManage</span>
        </Link>
      </div>
      <ScrollArea className="flex-1 px-3 py-4">
        <nav className="flex flex-col gap-1">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "group flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground",
                pathname === item.href ? "bg-accent text-accent-foreground" : "text-muted-foreground"
              )}
            >
              {item.icon}
              {item.title}
            </Link>
          ))}
        </nav>
      </ScrollArea>
      <div className="border-t border-border p-4">
        <div className="flex items-center gap-3">
          <div className="h-9 w-9 rounded-full bg-primary/10 flex items-center justify-center text-primary">
            <Boxes className="h-5 w-5" />
          </div>
          <div className="flex flex-col">
            <span className="text-sm font-medium">Admin User</span>
            <span className="text-xs text-muted-foreground">admin@waremanage.com</span>
          </div>
        </div>
      </div>
    </aside>
  );
}