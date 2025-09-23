
"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/use-auth";
import { LogIn, UserPlus } from "lucide-react";
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
    <header className="sticky top-0 z-50 w-full">
      <div className="container flex items-center justify-between gap-4 py-4">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="secondary" size="lg" className="rounded-xl interactive-glow flex-1">
              MORE
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="start" className="glass-container mt-2 w-56 rounded-2xl">
            <DropdownMenuItem asChild>
              <Link href="/courses">Courses</Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link href="/about">About</Link>
            </DropdownMenuItem>
            {user && (
              <DropdownMenuItem asChild>
                <Link href="/account">My Account</Link>
              </DropdownMenuItem>
            )}
            {!user && !loading && (
              <>
                <DropdownMenuItem asChild>
                  <Link href="/login">
                    <LogIn className="mr-2 h-4 w-4" />
                    Log In
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/signup">
                    <UserPlus className="mr-2 h-4 w-4" />
                    Sign Up
                  </Link>
                </DropdownMenuItem>
              </>
            )}
          </DropdownMenuContent>
        </DropdownMenu>

        <Link href="/" className="flex-1">
          <div className="w-full text-center p-4 rounded-xl glass-container interactive-glow">
            <span className="text-sm font-bold tracking-widest uppercase">
              Revenge Money & Logo
            </span>
          </div>
        </Link>
        
        <div className="hidden sm:flex items-center">
          {loading ? (
            <div className="h-14 w-14 animate-pulse rounded-full bg-muted" />
          ) : user ? (
            <UserNav />
          ) : null}
        </div>
      </div>
    </header>
  );
}
