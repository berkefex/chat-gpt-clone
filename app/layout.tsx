import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import LayoutSheet from "@/components/layout-sheet";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={cn(
          "min-h-screen bg-background font-sans antialiased",
          inter.className
        )}
      >
        <div className="flex flex-col min-h-screen">
          <header className="sticky top-0 w-full py-6 px-4 shadow-sm backdrop-filter backdrop-blur-md">
            <div className="flex flex-row justify-between items-center 2xl:w-[1024px] 2xl:mx-auto">
              <h1 className="font-bold text-3xl">Chat</h1>
              <LayoutSheet />
            </div>
          </header>
          {children}
        </div>
      </body>
    </html>
  );
}
