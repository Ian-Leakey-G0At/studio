"use client";

import { Menu } from "lucide-react";
import Link from "next/link";

export function MobileHeader() {
  return (
    <header className="flex items-center justify-between p-4 bg-white">
      <Link href="/" className="font-bold text-xl text-gray-900">
        Revenge Money Academy
      </Link>
      
      <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
        <Menu className="w-6 h-6 text-gray-700" />
      </button>
    </header>
  );
}