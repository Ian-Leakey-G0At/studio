
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

export function Footer() {
  const pathname = usePathname();

  // Do not show footer on single course pages to avoid conflict with sticky purchase footer
  if (pathname.includes('/courses/')) {
    return null;
  }

  return (
    <footer className="sticky bottom-0 border-t bg-background/80 pt-2 backdrop-blur-lg" style={{ paddingBottom: 'calc(1rem + env(safe-area-inset-bottom))' }}>
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
