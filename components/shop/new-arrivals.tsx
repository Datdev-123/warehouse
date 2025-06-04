"use client";

import Link from "next/link";
import { ShoppingCart } from "lucide-react";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

const products = [
  {
    id: 1,
    name: "Premium Leather Bag",
    price: 299.99,
    image: "https://images.pexels.com/photos/1152077/pexels-photo-1152077.jpeg?auto=compress&cs=tinysrgb&w=800",
    category: "Fashion"
  },
  {
    id: 2,
    name: "Wireless Earbuds",
    price: 159.99,
    image: "https://images.pexels.com/photos/3780681/pexels-photo-3780681.jpeg?auto=compress&cs=tinysrgb&w=800",
    category: "Electronics"
  },
  {
    id: 3,
    name: "Smart Home Camera",
    price: 89.99,
    image: "https://images.pexels.com/photos/3841338/pexels-photo-3841338.jpeg?auto=compress&cs=tinysrgb&w=800",
    category: "Electronics"
  },
  {
    id: 4,
    name: "Fitness Tracker",
    price: 79.99,
    image: "https://images.pexels.com/photos/437037/pexels-photo-437037.jpeg?auto=compress&cs=tinysrgb&w=800",
    category: "Electronics"
  },
  {
    id: 5,
    name: "Designer Sunglasses",
    price: 199.99,
    image: "https://images.pexels.com/photos/701877/pexels-photo-701877.jpeg?auto=compress&cs=tinysrgb&w=800",
    category: "Fashion"
  }
];

export function NewArrivals() {
  return (
    <section className="container mx-auto px-4">
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-center">New Arrivals</h2>
        <p className="text-muted-foreground text-center mt-2">
          Check out our latest products
        </p>
      </div>

      <Carousel
        opts={{
          align: "start",
          loop: true,
        }}
        className="w-full"
      >
        <CarouselContent className="-ml-2 md:-ml-4">
          {products.map((product) => (
            <CarouselItem key={product.id} className="pl-2 md:pl-4 md:basis-1/2 lg:basis-1/4">
              <Card>
                <CardContent className="p-0">
                  <div className="relative aspect-square">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="absolute inset-0 h-full w-full object-cover"
                    />
                    <Badge className="absolute top-2 left-2">
                      New
                    </Badge>
                  </div>
                </CardContent>
                <CardFooter className="flex flex-col items-start p-4">
                  <div className="text-sm text-muted-foreground">{product.category}</div>
                  <Link href={`/product/${product.id}`} className="font-semibold hover:underline">
                    {product.name}
                  </Link>
                  <div className="mt-1">
                    <span className="text-lg font-bold">${product.price}</span>
                  </div>
                  <Button className="w-full mt-4">
                    <ShoppingCart className="mr-2 h-4 w-4" />
                    Add to Cart
                  </Button>
                </CardFooter>
              </Card>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </section>
  );
}