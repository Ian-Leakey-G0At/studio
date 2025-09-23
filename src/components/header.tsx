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
    <header className="sticky top-0 z-50 w-full p-4">
      <div className="container mx-auto flex items-center justify-between gap-2">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="secondary" size="lg" className="rounded-2xl interactive-glow px-6">
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
            {!user && !loading && (
              <>
                <DropdownMenuItem asChild>
                    <Link href="/login">
                        <LogIn className="mr-2 h-4 w-4"/>
                        Log In
                    </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                    <Link href="/signup">
                        <UserPlus className="mr-2 h-4 w-4"/>
                        Sign Up
                    </Link>
                </DropdownMenuItem>
              </>
            )}
          </DropdownMenuContent>
        </DropdownMenu>

        <Link href="/" className="flex-1">
          <div className="w-full text-center p-4 rounded-2xl glass-container interactive-glow">
              <span className="text-sm font-bold tracking-widest uppercase">
                Revenge Money & Logo
              </span>
          </div>
        </Link>
        
        <div className="flex items-center">
          {loading ? (
                <div className="h-14 w-14 animate-pulse rounded-full bg-muted" />
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
        </div>
      </div>
    </header>
  );
}
