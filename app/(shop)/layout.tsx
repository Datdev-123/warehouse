"use client";

import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "@/components/ui/toaster";
import { ShopHeader } from "@/components/shop/header";
import { ShopFooter } from "@/components/shop/footer";

export default function ShopLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-background">
      <ThemeProvider attribute="class" defaultTheme="light">
        <ShopHeader />
        <main>{children}</main>
        <ShopFooter />
        <Toaster />
      </ThemeProvider>
    </div>
  );
}