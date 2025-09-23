
"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { UserNav } from "@/components/auth/user-nav";
import { useAuth } from "@/hooks/use-auth";
import { Coins } from "lucide-react";

export function Header() {
  const { user, loading } = useAuth();

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center">
        <div className="mr-4 flex items-center">
          <Link href="/" className="flex items-center space-x-2">
            <Coins className="h-6 w-6 text-primary" />
            <span className="font-bold font-headline sm:inline-block">
              Revenge Money
            </span>
          </Link>
        </div>
        <nav className="hidden md:flex items-center space-x-6 text-sm font-medium">
          <Link
            href="/courses"
            className="transition-colors hover:text-foreground/80 text-foreground/60"
          >
            Courses
          </Link>
           <Link
            href="/account"
            className="transition-colors hover:text-foreground/80 text-foreground/60"
          >
            My Account
          </Link>
        </nav>
        <div className="flex flex-1 items-center justify-end space-x-4">
          <nav className="flex items-center space-x-2">
            {loading ? (
              <div className="h-8 w-24 animate-pulse rounded-md bg-muted" />
            ) : user ? (
              <UserNav />
            ) : (
              <>
                <Button asChild variant="ghost">
                  <Link href="/login">Log In</Link>
                </Button>
                <Button asChild>
                  <Link href="/signup">Sign Up</Link>
                </Button>
              </>
            )}
          </nav>
        </div>
      </div>
    </header>
  );
}
