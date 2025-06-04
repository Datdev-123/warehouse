"use client";

import { Button } from "@/components/ui/button";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

export function Hero() {
  return (
    <div className="container mx-auto px-4">
      <Carousel className="w-full">
        <CarouselContent>
          <CarouselItem>
            <div className="relative h-[500px] w-full overflow-hidden rounded-lg">
              <img
                src="https://images.pexels.com/photos/5632402/pexels-photo-5632402.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
                alt="Hero 1"
                className="absolute inset-0 h-full w-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-transparent">
                <div className="flex h-full items-center">
                  <div className="ml-16 max-w-lg text-white">
                    <h1 className="mb-4 text-5xl font-bold">New Collection</h1>
                    <p className="mb-8 text-lg">
                      Discover our latest arrivals and trending items
                    </p>
                    <Button size="lg" variant="default">
                      Shop Now
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </CarouselItem>
          <CarouselItem>
            <div className="relative h-[500px] w-full overflow-hidden rounded-lg">
              <img
                src="https://images.pexels.com/photos/5632398/pexels-photo-5632398.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
                alt="Hero 2"
                className="absolute inset-0 h-full w-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-transparent">
                <div className="flex h-full items-center">
                  <div className="ml-16 max-w-lg text-white">
                    <h1 className="mb-4 text-5xl font-bold">Summer Sale</h1>
                    <p className="mb-8 text-lg">
                      Up to 50% off on selected items
                    </p>
                    <Button size="lg" variant="default">
                      View Offers
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </CarouselItem>
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </div>
  );
}