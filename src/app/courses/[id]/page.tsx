
"use client";

import { use, Suspense } from "react";
import { notFound } from "next/navigation";
import Image from "next/image";
import { courses } from "@/lib/data";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { Badge } from "@/components/ui/badge";
import { Clock, Film, FileText } from "lucide-react";
import { PurchaseModal } from "@/components/purchase-modal";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import { Button } from "@/components/ui/button";

type CoursePageProps = {
  params: {
    id: string;
  };
};

function CoursePageContent({ params: paramsProp }: CoursePageProps) {
  const params = use(paramsProp);
  const { id } = params;
  const course = courses.find((c) => c.id === id);

  if (!course) {
    notFound();
  }

  const image = PlaceHolderImages.find(img => img.id === course.imageId);

  return (
    <>
      <div className="container mx-auto px-4 md:px-6 py-8 flex flex-col gap-8 pb-32">
        {/* Banner Carousel */}
        <div className="w-full">
          <Carousel
            plugins={[Autoplay({ delay: 5000, stopOnInteraction: true })]}
            className="w-full"
            opts={{ align: "start", loop: true }}
          >
            <CarouselContent>
              <CarouselItem>
                <div className="p-1">
                  <div className="glass-container flex aspect-video w-full items-center justify-center p-6 rounded-3xl interactive-glow">
                    {image && (
                      <Image
                        src={image.imageUrl}
                        alt={course.title}
                        fill
                        className="object-cover rounded-3xl"
                        data-ai-hint={image.imageHint}
                      />
                    )}
                  </div>
                </div>
              </CarouselItem>
              <CarouselItem>
                <div className="p-1">
                  <div className="glass-container flex aspect-video w-full items-center justify-center p-6 rounded-3xl interactive-glow">
                      <div className="text-center z-10 space-y-2">
                        <h2 className="text-xl font-black uppercase text-foreground">
                          30 Second Teaser
                        </h2>
                        <p className="text-sm text-muted-foreground">
                          Video content would play here.
                        </p>
                      </div>
                  </div>
                </div>
              </CarouselItem>
            </CarouselContent>
          </Carousel>
        </div>

        {/* Course Details */}
        <div className="glass-container rounded-3xl p-6 md:p-8 space-y-6">
          <Badge variant="outline">{course.category.toUpperCase()}</Badge>
          <h1 className="text-3xl md:text-4xl font-black text-foreground">
            {course.title}
          </h1>
          <p className="text-base md:text-lg text-muted-foreground">
            {course.longDescription}
          </p>
          <div className="flex flex-wrap gap-4 text-sm text-foreground">
            <div className="flex items-center gap-2">
              <Clock className="h-5 w-5 text-primary" />
              <span>{course.duration}</span>
            </div>
            <div className="flex items-center gap-2">
              {course.format === 'Video' ? <Film className="h-5 w-5 text-primary" /> : <FileText className="h-5 w-5 text-primary" />}
              <span>{course.format} Format</span>
            </div>
          </div>
        </div>

        {/* Reviews */}
        <div className="grid grid-cols-2 gap-4">
            <div className="glass-container rounded-3xl p-6 aspect-square flex items-center justify-center">
                <span className="text-muted-foreground">Review</span>
            </div>
             <div className="glass-container rounded-3xl p-6 aspect-square flex items-center justify-center">
                <span className="text-muted-foreground">Review</span>
            </div>
        </div>

      </div>
      
      {/* Sticky Buy Button */}
      <div className="fixed bottom-0 left-0 right-0 p-4 bg-background/50 backdrop-blur-lg border-t border-border/10 z-50">
        <PurchaseModal course={course} />
      </div>
    </>
  );
}


export default function CoursePage({ params }: CoursePageProps) {
  return (
    <Suspense fallback={<div className="h-screen w-full animate-pulse bg-muted/20" />}>
      <CoursePageContent params={params} />
    </Suspense>
  );
}

