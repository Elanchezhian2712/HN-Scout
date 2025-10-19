// app/layout.tsx
import type { Metadata } from "next";
import { Inter } from "next/font/google";
// @ts-ignore - allow side-effect global CSS import without type declarations
import "./globals.css";
import Link from "next/link";
import { Bookmark, Compass } from "lucide-react";
import { Button } from "@/components/ui/button";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "HN Scout 🧭",
  description: "Discover quality Hacker News posts, ranked for you.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body className={`${inter.className} bg-slate-900 text-slate-50`}>
        <main className="container mx-auto max-w-4xl p-4 md:p-6">
          <header className="flex flex-col sm:flex-row justify-between items-start sm:items-center py-6 mb-6 gap-4">
            <div>
              <Link href="/" className="text-4xl font-bold">HN Scout 🧭</Link>
              <p className="text-slate-400 mt-1">Discover quality Hacker News posts, ranked for you.</p>
            </div>
            <nav className="flex items-center gap-2">
              <Link href="/" passHref>
                <Button variant="ghost"><Compass className="mr-2 h-4 w-4"/> Home</Button>
              </Link>
              <Link href="/reading-list" passHref>
                <Button variant="ghost"><Bookmark className="mr-2 h-4 w-4"/> Reading List</Button>
              </Link>
            </nav>
          </header>
          {children}
        </main>
      </body>
    </html>
  );
}