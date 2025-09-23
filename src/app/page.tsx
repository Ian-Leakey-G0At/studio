
"use client";

import * as React from "react";
import { motion } from "framer-motion";

import { Button } from "@/components/ui/button";
import { CourseCard } from "@/components/course-card";
import { courses } from "@/lib/data";
import Link from "next/link";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
} from "@/components/ui/carousel";
import { useToast } from "@/hooks/use-toast";

export default function Home() {
  const featuredCourse = courses[0];
  const featuredCourses = courses.slice(0, 4);

  return (
    <div className="container mx-auto px-4 md:px-6 py-4">
      <div className="flex flex-1 flex-col gap-4">
        {/* Static Hero Card */}
        <section className="w-full">
            <div className="p-1">
                <div className="glass-container flex flex-col justify-between aspect-[3/4] md:aspect-[21/9] w-full p-6 rounded-3xl relative overflow-hidden">
                    <div className="z-10 space-y-2">
                        <h1
                            className="text-4xl md:text-5xl font-black uppercase text-foreground/80"
                            style={{ textShadow: '0 1px 3px rgba(0,0,0,0.3)' }}
                        >
                            Debt Elimination
                        </h1>
                         <p className="text-2xl md:text-3xl font-black text-foreground">101</p>
                    </div>
                    
                    <div className="z-10 space-y-4">
                         <p className="max-w-md text-base md:text-lg text-muted-foreground">
                            Create a sustainable plan to eliminate debt without extreme lifestyle changes.
                        </p>
                        <div className="w-full bg-black/20 backdrop-blur-sm rounded-full h-2.5">
                            <div className="bg-white h-2.5 rounded-full w-1/4" />
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <section className="grid grid-cols-2 gap-4">
            <Button asChild variant="secondary" className="rounded-xl">
                <Link href="/courses">All Courses</Link>
            </Button>
            <Button variant="secondary" className="rounded-xl">
                Tap for Good Luck
            </Button>
        </section>

        <section className="w-full grid grid-cols-1 md:grid-cols-2 gap-4">
            {featuredCourses.map((course) => (
              <CourseCard key={course.id} course={course} />
            ))}
        </section>
      </div>
    </div>
  );
}
