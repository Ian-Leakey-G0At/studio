
"use client";

import * as React from "react";
import Autoplay from "embla-carousel-autoplay";
import { motion, AnimatePresence } from "framer-motion";

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
  const featuredCourses = courses.slice(0, 4);
  const carouselCourses = courses.slice(0, 3);
  const { toast } = useToast();

  const [api, setApi] = React.useState<CarouselApi>();
  const [current, setCurrent] = React.useState(0);
  const [progress, setProgress] = React.useState(0);

  React.useEffect(() => {
    if (!api) {
      return;
    }

    const autoplay = api.plugins().autoplay;
    if (!autoplay) {
      return;
    }
    
    const updateProgress = () => {
      // @ts-expect-error - scrollProgress is not in the type definition
      setProgress(autoplay.scrollProgress());
      requestAnimationFrame(updateProgress);
    };
    requestAnimationFrame(updateProgress);


    const onSelect = () => {
      setCurrent(api.selectedScrollSnap());
      setProgress(0);
    };

    api.on("select", onSelect);
    
    return () => {
      api.off("select", onSelect);
    };

  }, [api]);

  const handleGoodLuck = () => {
    toast({
      title: "🎉 Good Luck! 🎉",
      description: "May your finances flourish and your investments prosper!",
      variant: 'default',
    });
  };

  const currentCourse = carouselCourses[current];

  return (
    <div className="container mx-auto px-4 md:px-6 py-4">
      <div className="flex flex-1 flex-col gap-4">
        <section className="w-full">
          <Carousel
            setApi={setApi}
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
              {carouselCourses.map((course, index) => (
                <CarouselItem key={course.id}>
                  <div className="p-1">
                    <div className="glass-container flex aspect-[16/9] md:aspect-[21/9] w-full items-center justify-center p-6 rounded-3xl relative overflow-hidden">
                       <AnimatePresence mode="wait">
                          <motion.div
                            key={current}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            transition={{ duration: 0.8, ease: "easeInOut" }}
                            className="text-center z-10 space-y-4 max-w-3xl mx-auto"
                          >
                            <h1
                              className="text-2xl md:text-4xl lg:text-5xl font-black uppercase text-foreground"
                            >
                              {currentCourse.title}
                            </h1>
                            <p
                              className="max-w-2xl mx-auto text-base md:text-lg text-muted-foreground"
                            >
                               {currentCourse.description}
                            </p>
                          </motion.div>
                        </AnimatePresence>
                    </div>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
             <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex gap-2 p-2 bg-black/20 backdrop-blur-md rounded-full">
              {carouselCourses.map((_, index) => (
                <button
                  key={index}
                  onClick={() => api?.scrollTo(index)}
                  className="w-12 h-1.5 rounded-full overflow-hidden bg-white/10 relative"
                >
                  <motion.div
                    className="absolute top-0 left-0 h-full bg-white"
                    initial={{ width: 0 }}
                    animate={{ width: current === index ? `${progress * 100}%` : (current > index ? '100%' : '0%') }}
                    transition={{ duration: 0.1, ease: "linear" }}
                  />
                </button>
              ))}
            </div>
          </Carousel>
        </section>

        <section className="grid grid-cols-2 gap-4">
            <Button asChild variant="secondary" className="rounded-full">
                <Link href="/courses">All Courses</Link>
            </Button>
            <Button variant="secondary" onClick={handleGoodLuck} className="rounded-full">
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
