"use client";

import { useState, useEffect } from "react";
import { Bell, Search, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";
import { useSidebarContext } from "@/contexts/sidebar-context";
import ThemeToggle from "./theme-toggle";

export default function Header() {
  const { isSidebarOpen, toggleSidebar } = useSidebarContext();
  const [mounted, setMounted] = useState(false);
  
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <header className="bg-background border-b border-border h-16 flex items-center px-4 md:px-6">
      <div className="flex items-center gap-2 md:hidden">
        <Button variant="ghost" size="icon" className="text-foreground" onClick={toggleSidebar}>
          {isSidebarOpen ? <X size={20} /> : <Menu size={20} />}
        </Button>
      </div>
      
      <div className="flex-1 flex items-center justify-between">
        <div className="hidden md:flex relative w-96">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search inventory, orders..."
            className="pl-8 bg-muted/30"
          />
        </div>
        
        <div className="flex items-center gap-4">
          <ThemeToggle />
          
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="relative text-foreground">
                <Bell size={20} />
                <span className="absolute top-1 right-1 h-2 w-2 rounded-full bg-destructive" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-80">
              <div className="p-2 font-medium">Notifications</div>
              <DropdownMenuItem className="cursor-pointer flex flex-col items-start">
                <div className="font-medium">Low stock alert</div>
                <div className="text-sm text-muted-foreground">Product XYZ is running low on stock</div>
              </DropdownMenuItem>
              <DropdownMenuItem className="cursor-pointer flex flex-col items-start">
                <div className="font-medium">New order received</div>
                <div className="text-sm text-muted-foreground">Order #12345 has been received</div>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          
          <Avatar>
            <AvatarImage src="https://i.pravatar.cc/150?img=28" />
            <AvatarFallback>AD</AvatarFallback>
          </Avatar>
        </div>
      </div>
    </header>
  );
}