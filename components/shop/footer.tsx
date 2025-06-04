import Link from "next/link";
import { Package } from "lucide-react";

export function ShopFooter() {
  return (
    <footer className="bg-background border-t">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="py-16">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="space-y-4">
              <Link 
                href="/" 
                className="flex items-center gap-2 font-semibold text-xl text-primary"
              >
                <Package className="h-6 w-6" />
                <span>ShopName</span>
              </Link>
              <p className="text-sm text-muted-foreground">
                Your one-stop shop for quality products at great prices.
              </p>
            </div>
            
            <div>
              <h3 className="text-sm font-semibold mb-4">Shop</h3>
              <ul className="space-y-3">
                <li>
                  <Link href="/categories" className="text-sm text-muted-foreground hover:text-primary">
                    All Categories
                  </Link>
                </li>
                <li>
                  <Link href="/new-arrivals" className="text-sm text-muted-foreground hover:text-primary">
                    New Arrivals
                  </Link>
                </li>
                <li>
                  <Link href="/featured" className="text-sm text-muted-foreground hover:text-primary">
                    Featured Products
                  </Link>
                </li>
                <li>
                  <Link href="/sale" className="text-sm text-muted-foreground hover:text-primary">
                    Sale
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-semibold mb-4">Company</h3>
              <ul className="space-y-3">
                <li>
                  <Link href="/about" className="text-sm text-muted-foreground hover:text-primary">
                    About Us
                  </Link>
                </li>
                <li>
                  <Link href="/contact" className="text-sm text-muted-foreground hover:text-primary">
                    Contact
                  </Link>
                </li>
                <li>
                  <Link href="/terms" className="text-sm text-muted-foreground hover:text-primary">
                    Terms & Conditions
                  </Link>
                </li>
                <li>
                  <Link href="/privacy" className="text-sm text-muted-foreground hover:text-primary">
                    Privacy Policy
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-semibold mb-4">Customer Service</h3>
              <ul className="space-y-3">
                <li>
                  <Link href="/faq" className="text-sm text-muted-foreground hover:text-primary">
                    FAQ
                  </Link>
                </li>
                <li>
                  <Link href="/shipping" className="text-sm text-muted-foreground hover:text-primary">
                    Shipping Information
                  </Link>
                </li>
                <li>
                  <Link href="/returns" className="text-sm text-muted-foreground hover:text-primary">
                    Returns & Exchanges
                  </Link>
                </li>
                <li>
                  <Link href="/track-order" className="text-sm text-muted-foreground hover:text-primary">
                    Track Order
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
        
        <div className="border-t border-border py-8">
          <p className="text-center text-sm text-muted-foreground">
            © {new Date().getFullYear()} ShopName. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}