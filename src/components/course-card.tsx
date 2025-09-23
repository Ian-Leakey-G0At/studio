
"use client";

import Link from "next/link";
import Image from "next/image";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import type { Course } from "@/lib/types";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { Clock } from "lucide-react";
import { motion } from "framer-motion";

type CourseCardProps = {
  course: Course;
};

export function CourseCard({ course }: CourseCardProps) {
  const image = PlaceHolderImages.find(img => img.id === course.imageId);

  return (
    <motion.div
      whileHover={{ y: -8, scale: 1.02 }}
      transition={{ type: "spring", stiffness: 300 }}
      className="h-full interactive-glow rounded-3xl"
    >
      <Card className="flex flex-col overflow-hidden h-full">
        <div className="relative w-full aspect-[3/4]">
          {image && (
            <Image
              src={image.imageUrl}
              alt={course.title}
              fill
              className="object-cover rounded-3xl"
              data-ai-hint={image.imageHint}
            />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent rounded-3xl" />
          <div className="absolute inset-0 flex flex-col p-6">
            <div className="flex-1">
              <div className="flex items-center text-xs text-background/80 bg-foreground/20 backdrop-blur-md rounded-md px-2 py-1 w-fit">
                <Clock className="h-3 w-3 mr-1.5"/>
                <span>{course.duration}</span>
              </div>
            </div>
            <div className="space-y-4">
              <CardTitle className="font-black text-2xl text-background">
                <Link href={`/courses/${course.id}`} className="hover:text-primary/90 transition-colors">
                  {course.title}
                </Link>
              </CardTitle>
              <p className="text-background/80 text-sm line-clamp-2">
                {course.description}
              </p>
              <Button asChild className="rounded-full bg-background text-foreground hover:bg-background/90 w-full interactive-glow">
                <Link href={`/courses/${course.id}`}>View Course</Link>
              </Button>
            </div>
          </div>
        </div>
      </Card>
    </motion.div>
  );
}
