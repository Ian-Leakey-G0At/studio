"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, PlaySquare, User } from "lucide-react";
import { cn } from "@/lib/utils";

const navItems = [
  { href: "/", icon: Home, label: "Home" },
  { href: "/courses", icon: PlaySquare, label: "Courses" },
  { href: "/account", icon: User, label: "Account" },
];

export function BottomNavigation() {
  const pathname = usePathname();

  return (
    <footer className="fixed bottom-0 left-0 right-0 bg-card border-t border-border z-50 safe-area-bottom" 
            style={{ 
              paddingBottom: 'calc(1rem + env(safe-area-inset-bottom))',
              paddingLeft: 'env(safe-area-inset-left)',
              paddingRight: 'env(safe-area-inset-right)'
            }}>
      <nav className="flex items-center justify-around px-4 py-3">
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex flex-col items-center gap-1 p-3 rounded-xl transition-all duration-200",
                isActive 
                  ? "text-primary" 
                  : "text-muted-foreground hover:text-foreground"
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