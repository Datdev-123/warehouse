"use client";

import { useState } from "react";
import { Filter, Grid, List, SlidersHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ProductGrid } from "@/components/shop/product-grid";
import { ProductList } from "@/components/shop/product-list";

export default function ShopPage() {
  const [view, setView] = useState<"grid" | "list">("grid");
  const [sort, setSort] = useState("featured");
  const [category, setCategory] = useState("all");

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col gap-8">
        <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
          <h1 className="text-3xl font-bold">All Products</h1>
          <div className="flex items-center gap-4">
            <div className="relative w-full md:w-64">
              <Input placeholder="Search products..." className="pl-8" />
              <Filter className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            </div>
            <Select value={sort} onValueChange={setSort}>
              <SelectTrigger className="w-[160px]">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="featured">Featured</SelectItem>
                <SelectItem value="newest">Newest</SelectItem>
                <SelectItem value="price-low">Price: Low to High</SelectItem>
                <SelectItem value="price-high">Price: High to Low</SelectItem>
              </SelectContent>
            </Select>
            <div className="flex items-center gap-1">
              <Button
                variant={view === "grid" ? "default" : "ghost"}
                size="icon"
                onClick={() => setView("grid")}
              >
                <Grid className="h-4 w-4" />
              </Button>
              <Button
                variant={view === "list" ? "default" : "ghost"}
                size="icon"
                onClick={() => setView("list")}
              >
                <List className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          <div className="lg:col-span-1 space-y-4">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <h3 className="font-semibold">Categories</h3>
                <Button variant="ghost" size="sm">
                  <SlidersHorizontal className="h-4 w-4" />
                </Button>
              </div>
              <Select value={category} onValueChange={setCategory}>
                <SelectTrigger>
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  <SelectItem value="electronics">Electronics</SelectItem>
                  <SelectItem value="fashion">Fashion</SelectItem>
                  <SelectItem value="home">Home & Living</SelectItem>
                  <SelectItem value="sports">Sports</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <h3 className="font-semibold">Price Range</h3>
              <div className="flex items-center gap-2">
                <Input type="number" placeholder="Min" />
                <span>-</span>
                <Input type="number" placeholder="Max" />
              </div>
            </div>

            <div className="space-y-2">
              <h3 className="font-semibold">Brand</h3>
              <div className="space-y-1">
                {["Apple", "Samsung", "Sony", "Nike", "Adidas"].map((brand) => (
                  <label key={brand} className="flex items-center gap-2">
                    <input type="checkbox" className="rounded border-gray-300" />
                    <span>{brand}</span>
                  </label>
                ))}
              </div>
            </div>

            <Button className="w-full">Apply Filters</Button>
          </div>

          <div className="lg:col-span-3">
            {view === "grid" ? (
              <ProductGrid />
            ) : (
              <ProductList />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}