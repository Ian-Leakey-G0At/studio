
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, PlaySquare, User, Cog } from "lucide-react";
import { cn } from "@/lib/utils";

const navItems = [
  { href: "/", icon: Home, label: "Home" },
  { href: "/courses", icon: PlaySquare, label: "Courses" },
  { href: "/account", icon: User, label: "Account" },
  { href: "/settings", icon: Cog, label: "Settings" },
];

export function Footer() {
  const pathname = usePathname();

  return (
    <footer className="sticky bottom-0 border-t bg-background/80 pb-4 pt-2 backdrop-blur-lg">
      <nav className="flex items-center justify-around">
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex flex-col items-center gap-1 p-2",
                isActive ? "text-primary" : "text-muted-foreground"
              )}
            >
              <item.icon className="h-6 w-6" />
              <span className="text-xs font-medium">{item.label}</span>
            </Link>
          );
        })}
      </nav>
    </footer>
  );
}
