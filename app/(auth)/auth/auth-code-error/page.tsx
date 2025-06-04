import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Package } from "lucide-react";

export default function AuthErrorPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 text-center">
        <div>
          <Link 
            href="/" 
            className="flex items-center justify-center gap-2 font-semibold text-2xl text-primary mb-8"
          >
            <Package className="h-8 w-8" />
            <span>ShopName</span>
          </Link>
          <h2 className="text-3xl font-bold">Authentication Error</h2>
          <p className="mt-2 text-sm text-muted-foreground">
            There was an error processing your authentication request.
            Please try signing in again.
          </p>
        </div>
        <Button asChild className="w-full">
          <Link href="/login">
            Return to Login
          </Link>
        </Button>
      </div>
    </div>
  );
}