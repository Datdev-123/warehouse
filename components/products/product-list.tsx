"use client";

import { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { 
  Edit, 
  MoreHorizontal, 
  Trash, 
  Copy, 
  ArrowUpDown,
  Eye
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Checkbox } from "@/components/ui/checkbox";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

type Product = {
  id: string;
  name: string;
  sku: string;
  category: string;
  price: number;
  stock: number;
  status: "active" | "draft" | "archived";
  thumbnail: string;
};

const products: Product[] = [
  {
    id: "1",
    name: "iPhone 13 Pro",
    sku: "IP-13PRO-128",
    category: "Electronics",
    price: 999.99,
    stock: 145,
    status: "active",
    thumbnail: "https://images.pexels.com/photos/8153052/pexels-photo-8153052.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"
  },
  {
    id: "2",
    name: "Samsung Galaxy S22",
    sku: "SG-S22-256",
    category: "Electronics",
    price: 899.99,
    stock: 89,
    status: "active",
    thumbnail: "https://images.pexels.com/photos/11772521/pexels-photo-11772521.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"
  },
  {
    id: "3",
    name: "Nike Air Max 270",
    sku: "NKE-AM270-42",
    category: "Clothing",
    price: 150,
    stock: 12,
    status: "active",
    thumbnail: "https://images.pexels.com/photos/3621247/pexels-photo-3621247.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"
  },
  {
    id: "4",
    name: "Logitech MX Master 3",
    sku: "LOG-MXM3",
    category: "Electronics",
    price: 99.99,
    stock: 0,
    status: "archived",
    thumbnail: "https://images.pexels.com/photos/1337247/pexels-photo-1337247.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"
  },
  {
    id: "5",
    name: "IKEA MALM Desk",
    sku: "IKEA-MALM-DESK",
    category: "Furniture",
    price: 199,
    stock: 35,
    status: "active",
    thumbnail: "https://images.pexels.com/photos/5824883/pexels-photo-5824883.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"
  },
  {
    id: "6",
    name: "Sony WH-1000XM4",
    sku: "SONY-WH1000XM4",
    category: "Electronics",
    price: 349.99,
    stock: 42,
    status: "active",
    thumbnail: "https://images.pexels.com/photos/577769/pexels-photo-577769.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"
  },
  {
    id: "7",
    name: "Canon EOS R5",
    sku: "CANON-EOS-R5",
    category: "Electronics",
    price: 3899.99,
    stock: 5,
    status: "draft",
    thumbnail: "https://images.pexels.com/photos/51383/photo-camera-subject-photographer-51383.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"
  },
];

export function ProductList() {
  const [sortBy, setSortBy] = useState<keyof Product>("name");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
  const [selectedProducts, setSelectedProducts] = useState<string[]>([]);

  const sortedProducts = [...products].sort((a, b) => {
    const valueA = a[sortBy];
    const valueB = b[sortBy];

    if (typeof valueA === "string" && typeof valueB === "string") {
      return sortOrder === "asc"
        ? valueA.localeCompare(valueB)
        : valueB.localeCompare(valueA);
    } else {
      return sortOrder === "asc"
        ? Number(valueA) - Number(valueB)
        : Number(valueB) - Number(valueA);
    }
  });

  const handleSort = (column: keyof Product) => {
    if (sortBy === column) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortBy(column);
      setSortOrder("asc");
    }
  };

  const handleSelectAll = () => {
    if (selectedProducts.length === products.length) {
      setSelectedProducts([]);
    } else {
      setSelectedProducts(products.map((product) => product.id));
    }
  };

  const handleSelectProduct = (productId: string) => {
    if (selectedProducts.includes(productId)) {
      setSelectedProducts(selectedProducts.filter((id) => id !== productId));
    } else {
      setSelectedProducts([...selectedProducts, productId]);
    }
  };

  const getStatusBadge = (status: Product["status"]) => {
    switch (status) {
      case "active":
        return <Badge className="bg-green-500/20 text-green-700 dark:text-green-400 hover:bg-green-500/30">Active</Badge>;
      case "draft":
        return <Badge className="bg-yellow-500/20 text-yellow-700 dark:text-yellow-400 hover:bg-yellow-500/30">Draft</Badge>;
      case "archived":
        return <Badge className="bg-gray-500/20 text-gray-700 dark:text-gray-400 hover:bg-gray-500/30">Archived</Badge>;
      default:
        return null;
    }
  };

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[50px]">
              <Checkbox
                checked={selectedProducts.length === products.length}
                onCheckedChange={handleSelectAll}
                aria-label="Select all products"
              />
            </TableHead>
            <TableHead className="w-[80px]"></TableHead>
            <TableHead>
              <Button
                variant="ghost"
                onClick={() => handleSort("name")}
                className="font-medium"
              >
                Product
                <ArrowUpDown className="ml-2 h-3 w-3" />
              </Button>
            </TableHead>
            <TableHead>
              <Button
                variant="ghost"
                onClick={() => handleSort("category")}
                className="font-medium"
              >
                Category
                <ArrowUpDown className="ml-2 h-3 w-3" />
              </Button>
            </TableHead>
            <TableHead>
              <Button
                variant="ghost"
                onClick={() => handleSort("price")}
                className="font-medium"
              >
                Price
                <ArrowUpDown className="ml-2 h-3 w-3" />
              </Button>
            </TableHead>
            <TableHead>
              <Button
                variant="ghost"
                onClick={() => handleSort("stock")}
                className="font-medium"
              >
                Stock
                <ArrowUpDown className="ml-2 h-3 w-3" />
              </Button>
            </TableHead>
            <TableHead>
              <Button
                variant="ghost"
                onClick={() => handleSort("status")}
                className="font-medium"
              >
                Status
                <ArrowUpDown className="ml-2 h-3 w-3" />
              </Button>
            </TableHead>
            <TableHead className="w-[100px]"></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {sortedProducts.map((product) => (
            <TableRow key={product.id}>
              <TableCell>
                <Checkbox
                  checked={selectedProducts.includes(product.id)}
                  onCheckedChange={() => handleSelectProduct(product.id)}
                  aria-label={`Select product ${product.name}`}
                />
              </TableCell>
              <TableCell>
                <Avatar className="h-10 w-10 rounded">
                  <AvatarImage src={product.thumbnail} alt={product.name} />
                  <AvatarFallback>{product.name.substring(0, 2)}</AvatarFallback>
                </Avatar>
              </TableCell>
              <TableCell className="font-medium">
                <div>
                  <div>{product.name}</div>
                  <div className="text-xs text-muted-foreground">
                    SKU: {product.sku}
                  </div>
                </div>
              </TableCell>
              <TableCell>{product.category}</TableCell>
              <TableCell>${product.price.toFixed(2)}</TableCell>
              <TableCell>
                <span className={product.stock === 0 ? "text-destructive" : ""}>
                  {product.stock}
                </span>
              </TableCell>
              <TableCell>{getStatusBadge(product.status)}</TableCell>
              <TableCell>
                <div className="flex justify-end gap-2">
                  <Button variant="ghost" size="icon">
                    <Eye className="h-4 w-4" />
                  </Button>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem>
                        <Edit className="mr-2 h-4 w-4" />
                        Edit Product
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <Copy className="mr-2 h-4 w-4" />
                        Duplicate
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem className="text-destructive">
                        <Trash className="mr-2 h-4 w-4" />
                        Delete
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
  );
}