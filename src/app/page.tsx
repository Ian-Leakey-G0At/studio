
"use client";

import * as React from "react";
import Autoplay from "embla-carousel-autoplay";
import { motion } from "framer-motion";

import { Button } from "@/components/ui/button";
import { CourseCard } from "@/components/course-card";
import { courses } from "@/lib/data";
import { PartyPopper } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { useToast } from "@/hooks/use-toast";

export default function Home() {
  const bestSellingCourses = courses.slice(0, 5);
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
    <div className="flex flex-1 flex-col">
      <section className="w-full pt-12 md:pt-20 lg:pt-28">
        <div className="container mx-auto px-4 md:px-6">
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
              {bestSellingCourses.map((course) => {
                const image = PlaceHolderImages.find(
                  (img) => img.id === course.imageId
                );
                return (
                  <CarouselItem key={course.id}>
                    <div className="p-1">
                      <div className="relative aspect-video flex items-center justify-center p-6 rounded-lg overflow-hidden">
                         {image && (
                          <Image
                            src={image.imageUrl}
                            alt={course.title}
                            fill
                            className="object-cover"
                            data-ai-hint={image.imageHint}
                          />
                        )}
                        <div className="absolute inset-0 bg-black/60"></div>
                        <div className="relative text-center text-white z-10 space-y-4 max-w-3xl mx-auto">
                          <motion.h1 
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2, duration: 0.5 }}
                            className="text-4xl md:text-5xl lg:text-6xl font-black"
                          >
                            {course.title}
                          </motion.h1>
                          <motion.p 
                             initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.3, duration: 0.5 }}
                            className="max-w-2xl mx-auto text-lg md:text-xl text-text-secondary"
                          >
                              {course.description}
                          </motion.p>
                          
                        </div>
                      </div>
                    </div>
                  </CarouselItem>
                );
              })}
            </CarouselContent>
            <CarouselPrevious className="absolute left-4 top-1/2 -translate-y-1/2 text-primary hidden md:flex" />
            <CarouselNext className="absolute right-4 top-1/2 -translate-y-1/2 text-primary hidden md:flex" />
          </Carousel>
        </div>
      </section>

      <section className="w-full py-12 md:py-16">
        <div className="container mx-auto px-4 md:px-6 flex justify-center items-center gap-4">
            <Button asChild size="lg" variant="secondary">
                <Link href="/courses">All Courses</Link>
            </Button>
            <Button size="lg" variant="secondary" onClick={handleGoodLuck}>
                <PartyPopper className="mr-2" />
                Tap for Good Luck
            </Button>
        </div>
      </section>

      <section className="w-full py-12 md:py-24 lg:py-32">
        <div className="container mx-auto px-4 md:px-6">
          <div className="space-y-4 text-center mb-12">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
              Featured Courses
            </h2>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {featuredCourses.map((course) => (
              <CourseCard key={course.id} course={course} />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
