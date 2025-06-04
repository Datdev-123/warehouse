"use client";

import Link from "next/link";
import { useState } from "react";
import { ShoppingCart, Heart } from "lucide-react";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const products = [
  {
    id: 1,
    name: "Wireless Headphones",
    price: 199.99,
    image: "https://images.pexels.com/photos/3945667/pexels-photo-3945667.jpeg?auto=compress&cs=tinysrgb&w=800",
    category: "Electronics",
    rating: 4.5,
    sale: true,
    salePrice: 149.99
  },
  {
    id: 2,
    name: "Smart Watch",
    price: 299.99,
    image: "https://images.pexels.com/photos/437037/pexels-photo-437037.jpeg?auto=compress&cs=tinysrgb&w=800",
    category: "Electronics",
    rating: 4.8
  },
  {
    id: 3,
    name: "Running Shoes",
    price: 89.99,
    image: "https://images.pexels.com/photos/2529148/pexels-photo-2529148.jpeg?auto=compress&cs=tinysrgb&w=800",
    category: "Sports",
    rating: 4.3
  },
  {
    id: 4,
    name: "Coffee Maker",
    price: 79.99,
    image: "https://images.pexels.com/photos/1207918/pexels-photo-1207918.jpeg?auto=compress&cs=tinysrgb&w=800",
    category: "Home & Living",
    rating: 4.7
  }
];

export function FeaturedProducts() {
  const [wishlist, setWishlist] = useState<number[]>([]);

  const toggleWishlist = (productId: number) => {
    setWishlist(prev =>
      prev.includes(productId)
        ? prev.filter(id => id !== productId)
        : [...prev, productId]
    );
  };

  return (
    <section className="container mx-auto px-4">
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-center">Featured Products</h2>
        <p className="text-muted-foreground text-center mt-2">
          Handpicked products that you might like
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {products.map((product) => (
          <Card key={product.id} className="group">
            <CardContent className="p-0">
              <div className="relative aspect-square">
                <img
                  src={product.image}
                  alt={product.name}
                  className="absolute inset-0 h-full w-full object-cover"
                />
                {product.sale && (
                  <Badge className="absolute top-2 left-2 bg-red-500">
                    Sale
                  </Badge>
                )}
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute top-2 right-2 bg-white/80 hover:bg-white"
                  onClick={() => toggleWishlist(product.id)}
                >
                  <Heart
                    className={`h-5 w-5 ${
                      wishlist.includes(product.id)
                        ? "fill-red-500 text-red-500"
                        : "text-gray-600"
                    }`}
                  />
                </Button>
              </div>
            </CardContent>
            <CardFooter className="flex flex-col items-start p-4">
              <div className="text-sm text-muted-foreground">{product.category}</div>
              <Link href={`/product/${product.id}`} className="font-semibold hover:underline">
                {product.name}
              </Link>
              <div className="flex items-center gap-2 mt-1">
                {product.sale ? (
                  <>
                    <span className="text-lg font-bold text-red-500">
                      ${product.salePrice}
                    </span>
                    <span className="text-sm text-muted-foreground line-through">
                      ${product.price}
                    </span>
                  </>
                ) : (
                  <span className="text-lg font-bold">${product.price}</span>
                )}
              </div>
              <Button className="w-full mt-4">
                <ShoppingCart className="mr-2 h-4 w-4" />
                Add to Cart
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </section>
  );
}