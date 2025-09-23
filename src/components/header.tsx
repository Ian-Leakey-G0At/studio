
"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/use-auth";
import { Coins, LogIn, MoreVertical, UserPlus } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import React from "react";
import { UserNav } from "@/components/auth/user-nav";

export function Header() {
  const { user, loading } = useAuth();

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/50 bg-transparent backdrop-blur-lg supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center">
        <div className="mr-auto flex items-center">
          <Link href="/" className="flex items-center space-x-2">
            <Coins className="h-7 w-7 text-primary" />
            <span className="text-xl font-black sm:inline-block">
              Revenge Money
            </span>
          </Link>
        </div>
        
        <nav className="hidden items-center space-x-2 md:flex">
          <Button variant="ghost" asChild>
              <Link href="/courses">Courses</Link>
          </Button>
          <Button variant="ghost" asChild>
              <Link href="/about">About</Link>
          </Button>
        </nav>
        
        <div className="ml-4 flex items-center gap-2">
          {loading ? (
                <div className="h-9 w-9 animate-pulse rounded-full bg-muted" />
          ) : user ? (
              <UserNav />
          ) : (
            <div className='hidden md:flex items-center gap-2'>
              <Button variant="ghost" asChild>
                <Link href="/login">Log In</Link>
              </Button>
              <Button asChild>
                <Link href="/signup">Sign Up</Link>
              </Button>
            </div>
          )}

          <div className='md:hidden'>
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon">
                        <MoreVertical />
                        <span className="sr-only">More options</span>
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                      <DropdownMenuItem asChild>
                        <Link href="/courses">Courses</Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem asChild>
                        <Link href="/about">About</Link>
                      </DropdownMenuItem>
                      {!user && (
                        <>
                          <DropdownMenuItem asChild>
                              <Link href="/login">
                                  <LogIn className="mr-2"/>
                                  Log In
                              </Link>
                          </DropdownMenuItem>
                          <DropdownMenuItem asChild>
                              <Link href="/signup">
                                  <UserPlus className="mr-2"/>
                                  Sign Up
                              </Link>
                          </DropdownMenuItem>
                        </>
                      )}
                </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>

      </div>
    </header>
  );
}
