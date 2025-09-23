
"use client";

import * as React from "react";
import Autoplay from "embla-carousel-autoplay";

import { Button } from "@/components/ui/button";
import { CourseCard } from "@/components/course-card";
import { courses } from "@/lib/data";
import { ArrowRight, PartyPopper } from "lucide-react";
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
import { Card, CardContent } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";

export default function Home() {
  const bestSellingCourses = courses.slice(0, 5);
  const featuredCourses = courses.slice(0, 4);
  const { toast } = useToast();

  const handleGoodLuck = () => {
    toast({
      title: "🎉 Good Luck! 🎉",
      description: "May your finances flourish and your investments prosper!",
    });
  };

  return (
    <div className="flex flex-col">
      <section className="w-full py-12 md:py-20 lg:py-28 bg-card">
        <div className="container mx-auto px-4 md:px-6">
          <Carousel
            plugins={[
              Autoplay({
                delay: 5000,
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
                      <Card>
                        <CardContent className="relative aspect-video flex items-center justify-center p-6">
                           {image && (
                            <Image
                              src={image.imageUrl}
                              alt={course.title}
                              fill
                              className="object-cover rounded-lg"
                              data-ai-hint={image.imageHint}
                            />
                          )}
                          <div className="absolute inset-0 bg-black/50 rounded-lg"></div>
                          <div className="relative text-center text-primary-foreground z-10 space-y-4">
                            <h2 className="text-3xl md:text-4xl lg:text-5xl font-headline font-bold">
                              {course.title}
                            </h2>
                            <p className="max-w-2xl mx-auto text-lg md:text-xl">
                                {course.description}
                            </p>
                            <Button asChild>
                                <Link href={`/courses/${course.id}`}>Learn More</Link>
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    </div>
                  </CarouselItem>
                );
              })}
            </CarouselContent>
            <CarouselPrevious className="absolute left-4 top-1/2 -translate-y-1/2" />
            <CarouselNext className="absolute right-4 top-1/2 -translate-y-1/2" />
          </Carousel>
        </div>
      </section>

      <section className="w-full py-12 md:py-16 bg-background">
        <div className="container mx-auto px-4 md:px-6 flex justify-center items-center gap-4">
            <Button asChild size="lg">
                <Link href="/courses">All Courses</Link>
            </Button>
            <Button size="lg" variant="secondary" onClick={handleGoodLuck}>
                <PartyPopper className="mr-2" />
                Tap for Good Luck
            </Button>
        </div>
      </section>

      <section className="w-full py-12 md:py-24 lg:py-32 bg-secondary">
        <div className="container mx-auto px-4 md:px-6">
          <div className="space-y-4 text-center mb-12">
            <h2 className="text-3xl font-headline font-bold tracking-tighter sm:text-5xl">
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
