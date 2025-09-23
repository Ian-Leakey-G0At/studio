"use client";

import * as React from "react";
import Autoplay from "embla-carousel-autoplay";
import { motion } from "framer-motion";

import { Button } from "@/components/ui/button";
import { CourseCard } from "@/components/course-card";
import { courses } from "@/lib/data";
import Link from "next/link";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import { useToast } from "@/hooks/use-toast";

export default function Home() {
  const featuredCourses = courses.slice(0, 4);
  const { toast } = useToast();

  const handleGoodLuck = () => {
    toast({
      title: "🎉 Good Luck! 🎉",
      description: "May your finances flourish and your investments prosper!",
      variant: 'default',
    });
  };

  return (
    <div className="container mx-auto px-4 md:px-6 py-8">
      <div className="flex flex-1 flex-col gap-8">
        <section className="w-full">
          <Carousel
            plugins={[
              Autoplay({
                delay: 5000,
                stopOnInteraction: true,
              }),
            ]}
            className="w-full"
            opts={{
              align: "start",
              loop: true,
            }}
          >
            <CarouselContent>
              {courses.slice(0, 3).map((course) => (
                <CarouselItem key={course.id}>
                  <div className="p-1">
                    <div className="glass-container flex aspect-[16/9] md:aspect-[21/9] w-full items-center justify-center p-6 rounded-3xl">
                      <div className="text-center text-white z-10 space-y-4 max-w-3xl mx-auto">
                        <motion.h1 
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.2, duration: 0.5 }}
                          className="text-2xl md:text-4xl lg:text-5xl font-black uppercase text-foreground"
                        >
                          {course.title}
                        </motion.h1>
                        <motion.p 
                           initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.3, duration: 0.5 }}
                          className="max-w-2xl mx-auto text-base md:text-lg text-muted-foreground"
                        >
                            {course.description}
                        </motion.p>
                      </div>
                    </div>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
          </Carousel>
        </section>

        <section className="w-full grid grid-cols-2 gap-4">
          <Button asChild size="lg" variant="secondary" className="interactive-glow rounded-2xl">
              <Link href="/courses">All Courses</Link>
          </Button>
          <Button size="lg" variant="secondary" onClick={handleGoodLuck} className="interactive-glow rounded-2xl">
              Tap for Good Luck
          </Button>
        </section>

        <section className="w-full">
          <div className="grid grid-cols-2 gap-4 md:gap-6">
            {featuredCourses.map((course) => (
              <CourseCard key={course.id} course={course} />
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
