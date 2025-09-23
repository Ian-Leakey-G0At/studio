
"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/use-auth";
import { Coins, Menu, X } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetClose,
} from "@/components/ui/sheet";
import React from "react";

export function Header() {
  const { user, loading } = useAuth();
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center">
        <div className="mr-auto flex items-center">
          <Link href="/" className="flex items-center space-x-2">
            <Coins className="h-6 w-6 text-primary" />
            <span className="font-bold font-headline sm:inline-block">
              Revenge Money
            </span>
          </Link>
        </div>
        
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
          <SheetTrigger asChild>
            <Button variant="outline" size="icon">
              <Menu />
              <span className="sr-only">Open menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent>
            <nav className="flex flex-col items-start space-y-4 p-4">
                <SheetClose asChild>
                    <Link href="/courses" className="text-lg font-medium hover:text-primary">Courses</Link>
                </SheetClose>
                <SheetClose asChild>
                    <Link href="/account" className="text-lg font-medium hover:text-primary">My Account</Link>
                </SheetClose>
              
              <div className="pt-4 border-t w-full">
                {loading ? (
                  <div className="h-8 w-24 animate-pulse rounded-md bg-muted" />
                ) : user ? (
                   <SheetClose asChild>
                    <Link href="/account" className="text-lg font-medium hover:text-primary">My Account</Link>
                   </SheetClose>
                ) : (
                  <div className="flex flex-col space-y-2">
                    <SheetClose asChild>
                        <Button asChild variant="ghost">
                            <Link href="/login">Log In</Link>
                        </Button>
                    </SheetClose>
                    <SheetClose asChild>
                        <Button asChild>
                            <Link href="/signup">Sign Up</Link>
                        </Button>
                    </SheetClose>
                  </div>
                )}
              </div>
            </nav>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
}
