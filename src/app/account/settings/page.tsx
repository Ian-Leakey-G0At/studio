
"use client";

import Link from "next/link";
import { ChevronRight, LogOut } from "lucide-react";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { useRouter } from "next/navigation";

// Custom Switch component to match the design
const CustomSwitch = ({ checked, onCheckedChange }) => (
    <label className="relative inline-block w-[52px] h-[32px]">
      <input
        type="checkbox"
        className="opacity-0 w-0 h-0"
        checked={checked}
        onChange={(e) => onCheckedChange(e.target.checked)}
      />
      <span
        className={`absolute cursor-pointer top-0 left-0 right-0 bottom-0 rounded-full transition-colors ${
          checked ? "bg-[#2c2a4a]" : "bg-gray-300"
        }`}
      >
        <span
          className={`absolute content-[''] h-[24px] w-[24px] left-[4px] bottom-[4px] bg-white rounded-full transition-transform ${
            checked ? "translate-x-[20px]" : "translate-x-0"
          }`}
        ></span>
      </span>
    </label>
  );


export default function SettingsPage() {
    const router = useRouter();
  // TODO: Replace with actual state management
  const [notifications, setNotifications] = React.useState({
    email: true,
    push: false,
    newCourses: true,
    promotions: false,
  });
  const [display, setDisplay] = React.useState({
    darkMode: false,
  });

  return (
    <div className="bg-[#f7f7f8] text-[#2c2a4a] min-h-screen font-sans">
      <header className="flex items-center justify-between p-4">
        <button onClick={() => router.back()} className="flex h-11 w-11 items-center justify-center">
        <span className="material-symbols-outlined text-3xl">
            arrow_back_ios_new
          </span>
        </button>
        <h1 className="font-headline text-2xl font-bold">Settings</h1>
        <div className="w-11"></div>
      </header>
      <main className="p-4">
        <div className="space-y-8">
          {/* Account Section */}
          <div>
            <h2 className="font-headline text-xl font-bold text-[#2c2a4a] mb-4">Account</h2>
            <div className="space-y-2 rounded-2xl bg-white/60 p-2">
              <Link href="/account/profile">
                <a className="flex h-14 items-center justify-between rounded-lg px-4 transition-colors hover:bg-white">
                  <span className="font-medium">Manage Profile Information</span>
                  <ChevronRight className="text-gray-400" />
                </a>
              </Link>
              <Link href="/account/change-password">
                <a className="flex h-14 items-center justify-between rounded-lg px-4 transition-colors hover:bg-white">
                  <span className="font-medium">Change Password</span>
                  <ChevronRight className="text-gray-400" />
                </a>
              </Link>
            </div>
          </div>

          {/* Notifications Section */}
          <div>
            <h2 className="font-headline text-xl font-bold text-[#2c2a4a] mb-4">Notifications</h2>
            <div className="space-y-2 rounded-2xl bg-white/60 p-2">
                <div className="flex h-14 items-center justify-between rounded-lg px-4">
                    <span className="font-medium">Email Notifications</span>
                    <CustomSwitch 
                        checked={notifications.email} 
                        onCheckedChange={(val) => setNotifications(p => ({...p, email: val}))} 
                    />
                </div>
                <div className="flex h-14 items-center justify-between rounded-lg px-4">
                    <span className="font-medium">Push Notifications</span>
                    <CustomSwitch 
                        checked={notifications.push} 
                        onCheckedChange={(val) => setNotifications(p => ({...p, push: val}))} 
                    />
                </div>
                 <Accordion type="single" collapsible className="w-full">
                    <AccordionItem value="item-1" className="border-none">
                        <AccordionTrigger className="flex h-14 items-center justify-between rounded-lg px-4 transition-colors hover:bg-white no-underline hover:no-underline">
                             <span className="font-medium">Notification Preferences</span>
                        </AccordionTrigger>
                        <AccordionContent className="pt-2 pl-6 pr-4 space-y-2">
                            <div className="flex h-14 items-center justify-between rounded-lg px-4">
                                <span className="text-sm">New Course Announcements</span>
                                <CustomSwitch 
                                    checked={notifications.newCourses} 
                                    onCheckedChange={(val) => setNotifications(p => ({...p, newCourses: val}))} 
                                />
                            </div>
                            <div className="flex h-14 items-center justify-between rounded-lg px-4">
                                <span className="text-sm">Promotions & Offers</span>
                                 <CustomSwitch 
                                    checked={notifications.promotions} 
                                    onCheckedChange={(val) => setNotifications(p => ({...p, promotions: val}))} 
                                />
                            </div>
                        </AccordionContent>
                    </AccordionItem>
                </Accordion>
            </div>
          </div>

          {/* Display Section */}
          <div>
            <h2 className="font-headline text-xl font-bold text-[#2c2a4a] mb-4">Display</h2>
            <div className="space-y-2 rounded-2xl bg-white/60 p-2">
                <div className="flex h-14 items-center justify-between rounded-lg px-4">
                    <span className="font-medium">Dark Mode</span>
                     <CustomSwitch 
                        checked={display.darkMode} 
                        onCheckedChange={(val) => setDisplay(p => ({...p, darkMode: val}))} 
                    />
                </div>
                <Accordion type="single" collapsible className="w-full">
                    <AccordionItem value="item-1" className="border-none">
                        <AccordionTrigger className="flex h-14 items-center justify-between rounded-lg px-4 transition-colors hover:bg-white no-underline hover:no-underline">
                             <span className="font-medium">Language</span>
                              <div className="flex items-center gap-2">
                                <span className="text-gray-500">English (US)</span>
                            </div>
                        </AccordionTrigger>
                        <AccordionContent className="pt-2 pl-6 pr-4 space-y-2">
                            <a href="#" className="flex h-14 items-center justify-between rounded-lg px-4 transition-colors hover:bg-gray-100">
                                <span className="font-medium text-sm">English (UK)</span>
                            </a>
                            <a href="#" className="flex h-14 items-center justify-between rounded-lg px-4 transition-colors hover:bg-gray-100">
                                <span className="font-medium text-sm">Español</span>
                            </a>
                        </AccordionContent>
                    </AccordionItem>
                </Accordion>
            </div>
          </div>

            <div className="pt-4">
             <Button
                variant="ghost"
                className="flex h-14 w-full items-center justify-center rounded-xl bg-white/80 text-red-500 font-bold transition-colors hover:bg-white"
                >
                Log Out
            </Button>
            </div>
        </div>
      </main>

        <nav className="sticky bottom-0 border-t border-gray-200 bg-white/80 backdrop-blur-sm px-4 pb-3 pt-2">
            <div className="flex justify-around">
                <Link href="/" className="flex h-12 w-16 flex-col items-center justify-center gap-1 py-2 text-gray-500">
                    <span className="material-symbols-outlined">home</span>
                    <span className="text-xs font-medium">Home</span>
                </Link>
                <Link href="/courses" className="flex h-12 w-16 flex-col items-center justify-center gap-1 py-2 text-gray-500">
                    <span className="material-symbols-outlined">school</span>
                    <span className="text-xs font-medium">Courses</span>
                </Link>
                <Link href="/account" className="flex h-12 w-16 flex-col items-center justify-center gap-1 rounded-xl bg-[#2c2a4a]/10 py-2 text-[#2c2a4a]">
                    <span className="material-symbols-outlined">person</span>
                    <span className="text-xs font-bold">Account</span>
                </Link>
            </div>
        </nav>
    </div>
  );
}

// React and state management are not defined, so I'm adding them.
import * as React from 'react';
