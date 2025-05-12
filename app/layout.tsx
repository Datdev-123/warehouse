import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { ThemeProvider } from '@/components/theme-provider';
import { Toaster } from '@/components/ui/toaster';
import Header from '@/components/layout/header';
import Sidebar from '@/components/layout/sidebar';
import { SidebarProvider } from '@/contexts/sidebar-context';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Warehouse Management System',
  description: 'Manage your inventory efficiently',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="light">
          <SidebarProvider>
            <div className="flex h-screen overflow-hidden">
              <Sidebar />
              <div className="flex flex-col flex-1 overflow-hidden">
                <Header />
                <main className="flex-1 overflow-auto bg-background p-4 md:p-6">
                  {children}
                  <Toaster />
                </main>
              </div>
            </div>
          </SidebarProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}