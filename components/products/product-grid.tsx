"use client";

import { useState } from "react";
import { 
  Card, 
  CardContent, 
  CardFooter, 
  CardHeader 
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Edit, 
  MoreHorizontal, 
  Trash, 
  Copy, 
  Eye,
  Package
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
  {
    id: "8",
    name: "Apple MacBook Pro 16\"",
    sku: "AP-MBP-16-M1",
    category: "Electronics",
    price: 2499.99,
    stock: 23,
    status: "active",
    thumbnail: "https://images.pexels.com/photos/1229861/pexels-photo-1229861.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"
  },
];

export function ProductGrid() {
  const [selectedProducts, setSelectedProducts] = useState<string[]>([]);

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
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {products.map((product) => (
        <Card key={product.id} className="overflow-hidden transition-all hover:shadow-md">
          <div className="aspect-video relative overflow-hidden bg-muted">
            {product.thumbnail ? (
              <img
                src={product.thumbnail}
                alt={product.name}
                className="h-full w-full object-cover transition-transform duration-300 hover:scale-105"
              />
            ) : (
              <div className="flex h-full w-full items-center justify-center bg-secondary">
                <Package className="h-10 w-10 text-muted-foreground" />
              </div>
            )}
            <div className="absolute top-2 right-2">
              <Checkbox
                checked={selectedProducts.includes(product.id)}
                onCheckedChange={() => handleSelectProduct(product.id)}
                className="h-5 w-5 border-white bg-white/50 backdrop-blur-sm transition-all hover:bg-white/80"
                aria-label={`Select product ${product.name}`}
              />
            </div>
          </div>
          <CardHeader className="p-4">
            <div className="flex justify-between items-center">
              <div className="text-sm font-medium">{product.category}</div>
              {getStatusBadge(product.status)}
            </div>
            <h3 className="font-semibold truncate">{product.name}</h3>
            <div className="text-xs text-muted-foreground">SKU: {product.sku}</div>
          </CardHeader>
          <CardContent className="p-4 pt-0 flex justify-between items-center">
            <div className="font-semibold">${product.price.toFixed(2)}</div>
            <div className={`text-sm ${product.stock === 0 ? "text-destructive" : ""}`}>
              Stock: {product.stock} units
            </div>
          </CardContent>
          <CardFooter className="p-4 pt-0 flex justify-between">
            <Button variant="outline" size="sm">
              <Eye className="mr-2 h-4 w-4" />
              View
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
          </CardFooter>
        </Card>
      ))}
    </div>
  );
}