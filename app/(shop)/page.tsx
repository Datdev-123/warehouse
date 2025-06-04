import { Hero } from "@/components/shop/hero";
import { FeaturedProducts } from "@/components/shop/featured-products";
import { Categories } from "@/components/shop/categories";
import { NewArrivals } from "@/components/shop/new-arrivals";
import { Testimonials } from "@/components/shop/testimonials";
import { Newsletter } from "@/components/shop/newsletter";

export default function ShopPage() {
  return (
    <div className="flex flex-col gap-16 py-8">
      <Hero />
      <Categories />
      <FeaturedProducts />
      <NewArrivals />
      <Testimonials />
      <Newsletter />
    </div>
  );
}