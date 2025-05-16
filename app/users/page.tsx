"use client";

import {
  User,
  Search,
  Filter,
  Plus,
  SlidersHorizontal,
  ChevronDown,
  ArrowUpDown,
  Mail,
  Phone,
  Shield,
  Edit,
  Trash,
  MoreHorizontal,
  CheckCircle2,
  XCircle,
  UserRoundPlus,
  Building,
  ShieldCheck,
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
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { AddUserModal } from "@/components/modals/add-user-modal";
import { useState, useEffect } from "react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

type UserType = {
  id: string;
  name: string;
  email: string;
  role: "admin" | "manager" | "staff";
  status: "active" | "inactive";
  phone: string;
  avatar: string;
  department: string;
  lastActive: string;
};

const users: UserType[] = [
  {
    id: "1",
    name: "John Doe",
    email: "john@example.com",
    role: "admin",
    status: "active",
    phone: "+1 (555) 000-0000",
    avatar: "https://i.pravatar.cc/150?img=1",
    department: "Management",
    lastActive: "2024-03-20 14:30"
  },
  {
    id: "2",
    name: "Jane Smith",
    email: "jane@example.com",
    role: "manager",
    status: "active",
    phone: "+1 (555) 000-0001",
    avatar: "https://i.pravatar.cc/150?img=2",
    department: "Warehouse",
    lastActive: "2024-03-20 13:15"
  },
  {
    id: "3",
    name: "Mike Johnson",
    email: "mike@example.com",
    role: "staff",
    status: "active",
    phone: "+1 (555) 000-0002",
    avatar: "https://i.pravatar.cc/150?img=3",
    department: "Shipping",
    lastActive: "2024-03-20 12:45"
  },
  {
    id: "4",
    name: "Sarah Wilson",
    email: "sarah@example.com",
    role: "manager",
    status: "inactive",
    phone: "+1 (555) 000-0003",
    avatar: "https://i.pravatar.cc/150?img=4",
    department: "Inventory",
    lastActive: "2024-03-19 16:20"
  }
];

export default function UsersPage() {
  const [sortBy, setSortBy] = useState("name_asc");
  const [filter, setFilter] = useState({ role: "all", status: "all", department: "all" });
  const [layout, setLayout] = useState<"table" | "grid">("table");
  const [searchTerm, setSearchTerm] = useState("");
  const [isFilterActive, setIsFilterActive] = useState(false);

  useEffect(() => {
    setIsFilterActive(filter.role !== "all" || filter.status !== "all" || filter.department !== "all");
  }, [filter]);

  const handleFilterChange = (type: string, value: string) => {
    const newFilter = { ...filter, [type]: value };
    setFilter(newFilter);
    const content = document.getElementById('users-content');
    if (content) {
      content.classList.add('filter-transition');
      setTimeout(() => {
        content.classList.remove('filter-transition');
      }, 300);
    }
  };

  const handleLayoutChange = (value: string) => {
    const newLayout = value as "table" | "grid";
    
    const content = document.getElementById('users-content');
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

  const filteredUsers = users.filter((user) => {
    const roleMatch = filter.role === "all" || user.role === filter.role;
    const statusMatch = filter.status === "all" || user.status === filter.status;
    const departmentMatch = filter.department === "all" || user.department === filter.department;
    return roleMatch && statusMatch && departmentMatch;
  });

  const sortedUsers = [...filteredUsers].sort((a, b) => {
    switch (sortBy) {
      case "name_asc":
        return a.name.localeCompare(b.name);
      case "name_desc":
        return b.name.localeCompare(a.name);
      case "role":
        return a.role.localeCompare(b.role);
      case "department":
        return a.department.localeCompare(b.department);
      case "last_active":
        return Number(new Date(b.lastActive)) - Number(new Date(a.lastActive));
      default:
        return 0;
    }
  });

  const getRoleBadge = (role: UserType["role"]) => {
    switch (role) {
      case "admin":
        return <Badge className="bg-purple-500/20 text-purple-700 dark:text-purple-400">Admin</Badge>;
      case "manager":
        return <Badge className="bg-blue-500/20 text-blue-700 dark:text-blue-400">Manager</Badge>;
      case "staff":
        return <Badge className="bg-green-500/20 text-green-700 dark:text-green-400">Staff</Badge>;
      default:
        return null;
    }
  };

  const getStatusBadge = (status: UserType["status"]) => {
    switch (status) {
      case "active":
        return (
          <div className="flex items-center gap-1">
            <CheckCircle2 className="h-4 w-4 text-green-600" />
            <span className="text-green-600">Active</span>
          </div>
        );
      case "inactive":
        return (
          <div className="flex items-center gap-1">
            <XCircle className="h-4 w-4 text-red-600" />
            <span className="text-red-600">Inactive</span>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Users</h1>
        <AddUserModal />
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Total Users</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">24</div>
            <p className="text-xs text-muted-foreground">
              Across all roles
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Active Users</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">21</div>
            <p className="text-xs text-emerald-500">
              87.5% active rate
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Admins</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">3</div>
            <p className="text-xs text-muted-foreground">
              System administrators
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">New Users</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">5</div>
            <p className="text-xs text-muted-foreground">
              Added this month
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
                placeholder="Search users..."
                className="w-full pl-8"
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
                      <DropdownMenuContent align="end" className="w-60">
                        <DropdownMenuLabel>Filter by Role</DropdownMenuLabel>
                        <DropdownMenuRadioGroup value={filter.role} onValueChange={(value) => handleFilterChange("role", value)}>
                          <DropdownMenuRadioItem value="all">All Roles</DropdownMenuRadioItem>
                          <DropdownMenuRadioItem value="admin">Admin</DropdownMenuRadioItem>
                          <DropdownMenuRadioItem value="manager">Manager</DropdownMenuRadioItem>
                          <DropdownMenuRadioItem value="staff">Staff</DropdownMenuRadioItem>
                        </DropdownMenuRadioGroup>
                        
                        <DropdownMenuSeparator />
                        
                        <DropdownMenuLabel>Filter by Status</DropdownMenuLabel>
                        <DropdownMenuRadioGroup value={filter.status} onValueChange={(value) => handleFilterChange("status", value)}>
                          <DropdownMenuRadioItem value="all">All Statuses</DropdownMenuRadioItem>
                          <DropdownMenuRadioItem value="active">Active</DropdownMenuRadioItem>
                          <DropdownMenuRadioItem value="inactive">Inactive</DropdownMenuRadioItem>
                        </DropdownMenuRadioGroup>
                        
                        {isFilterActive && (
                          <>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem onClick={() => setFilter({ role: "all", status: "all", department: "all" })}>
                              Clear All Filters
                            </DropdownMenuItem>
                          </>
                        )}
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Filter users</p>
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
                <DropdownMenuItem onClick={() => setSortBy("name_asc")}>Name (A-Z)</DropdownMenuItem>
                <DropdownMenuItem onClick={() => setSortBy("name_desc")}>Name (Z-A)</DropdownMenuItem>
                <DropdownMenuItem onClick={() => setSortBy("role")}>Role</DropdownMenuItem>
                <DropdownMenuItem onClick={() => setSortBy("department")}>Department</DropdownMenuItem>
                <DropdownMenuItem onClick={() => setSortBy("last_active")}>Last Active</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>

        <div id="users-content">
          {layout === "table" ? (
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>User</TableHead>
                    <TableHead>Role</TableHead>
                    <TableHead>Department</TableHead>
                    <TableHead>Contact</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Last Active</TableHead>
                    <TableHead className="w-[100px]"></TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {sortedUsers.map((user) => (
                    <TableRow key={user.id}>
                      <TableCell>
                        <div className="flex items-center gap-3">
                          <Avatar>
                            <AvatarImage src={user.avatar} />
                            <AvatarFallback>
                              <User className="h-4 w-4" />
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <div className="font-medium">{user.name}</div>
                            <div className="text-xs text-muted-foreground">
                              {user.email}
                            </div>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>{getRoleBadge(user.role)}</TableCell>
                      <TableCell>{user.department}</TableCell>
                      <TableCell>
                        <div className="space-y-1">
                          <div className="flex items-center gap-1 text-sm">
                            <Mail className="h-3 w-3 text-muted-foreground" />
                            {user.email}
                          </div>
                          <div className="flex items-center gap-1 text-sm">
                            <Phone className="h-3 w-3 text-muted-foreground" />
                            {user.phone}
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>{getStatusBadge(user.status)}</TableCell>
                      <TableCell>{user.lastActive}</TableCell>
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
                                <Edit className="mr-2 h-4 w-4" />
                                Edit User
                              </DropdownMenuItem>
                              <DropdownMenuItem>
                                <Shield className="mr-2 h-4 w-4" />
                                Permissions
                              </DropdownMenuItem>
                              <DropdownMenuItem className="text-destructive">
                                <Trash className="mr-2 h-4 w-4" />
                                Delete User
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
              {sortedUsers.map((user) => (
                <Card key={user.id}>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <Avatar className="h-10 w-10">
                          <AvatarImage src={user.avatar} />
                          <AvatarFallback>
                            <User className="h-6 w-6" />
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <CardTitle className="text-base">{user.name}</CardTitle>
                          <CardDescription>{user.department}</CardDescription>
                        </div>
                      </div>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem>View Profile</DropdownMenuItem>
                          <DropdownMenuItem>Edit User</DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem className="text-red-600">Deactivate</DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-col gap-3">
                      <div className="flex items-center gap-2">
                        <Mail className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm">{user.email}</span>
                      </div>
                      {user.phone && (
                        <div className="flex items-center gap-2">
                          <Phone className="h-4 w-4 text-muted-foreground" />
                          <span className="text-sm">{user.phone}</span>
                        </div>
                      )}
                      <div className="flex flex-wrap items-center gap-2 mt-2">
                        {getRoleBadge(user.role)}
                        {getStatusBadge(user.status)}
                      </div>
                      <div className="text-xs text-muted-foreground mt-2">
                        Last active: {user.lastActive}
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