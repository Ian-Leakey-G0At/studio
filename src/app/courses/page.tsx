
"use client";

import * as React from "react";
import Autoplay from "embla-carousel-autoplay";
import { motion } from "framer-motion";

import { CourseCard } from "@/components/course-card";
import { courses } from "@/lib/data";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";

export default function CoursesPage() {
  const bestSellingCourses = courses.slice(3, 6);

  return (
    <div className="container mx-auto px-4 md:px-6 py-8">
      <div className="flex flex-1 flex-col gap-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="w-full text-center p-4 rounded-2xl glass-container"
        >
          <h1 className="text-sm font-bold tracking-widest uppercase">
            All Courses
          </h1>
        </motion.div>

        <section
          className="w-full"
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '1.5rem',
          }}
        >
          {courses.map((course, index) => (
             <motion.div
              key={course.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 * index, duration: 0.5 }}
            >
              <CourseCard course={course} />
            </motion.div>
          ))}
        </section>

        <section className="w-full pt-8">
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
              {bestSellingCourses.map((course) => (
                <CarouselItem key={course.id} className="md:basis-1/2 lg:basis-1/3">
                  <div className="p-1">
                    <div className="glass-container flex aspect-video w-full items-center justify-center p-6 rounded-3xl interactive-glow">
                      <div className="text-center z-10 space-y-2">
                        <h2 className="text-xl font-black uppercase text-foreground">
                          {course.title}
                        </h2>
                        <p className="text-sm text-muted-foreground">
                          Best-selling course
                        </p>
                      </div>
                    </div>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
          </Carousel>
        </section>
      </div>
    </div>
  );
}
