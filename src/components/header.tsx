
"use client";

import { Menu } from "lucide-react";
import Link from "next/link";
import { Button } from "./ui/button";

export function Header() {
  return (
    <header className="flex items-center justify-between p-4 sticky top-0 z-50 bg-transparent transition-colors duration-300">
      <div className="w-11"></div>
      <Link href="/" className="font-heading text-lg font-bold text-center flex-1">
        Revenge Money Academy
      </Link>
      <Button variant="ghost" size="icon" className="h-11 w-11 flex-shrink-0">
        <Menu className="h-6 w-6" />
        <span className="sr-only">Open menu</span>
      </Button>
    </header>
  );
}
