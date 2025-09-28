
"use client";

import Link from "next/link";
import Image from "next/image";
import type { Course } from "@/lib/types";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { motion } from "framer-motion";

type CourseCardProps = {
  course: Course;
};

export function CourseCard({ course }: CourseCardProps) {
  const image = PlaceHolderImages.find(img => img.id === course.imageId) || PlaceHolderImages[0];

  return (
    <Link href={`/courses/${course.id}`} className="block group">
      <motion.div 
        className="flex flex-col overflow-hidden rounded-xl bg-background/50 shadow-lg shadow-black/5 interactive-glow"
        whileHover={{ y: -5 }}
      >
        <div className="relative aspect-[4/3] w-full">
          {image && (
            <Image
              src={image.imageUrl}
              alt={course.title}
              fill
              className="h-full w-full object-cover"
              data-ai-hint={image.imageHint}
            />
          )}
          <div className="absolute bottom-3 left-3 right-3 rounded-lg p-3 glass-container bg-black/30 backdrop-blur-md border border-white/10">
            <p className="text-sm font-medium text-white/80">{course.category}</p>
            <h3 className="font-heading text-lg font-bold text-white truncate">{course.title}</h3>
            <p className="mt-2 text-xl font-bold text-white">${course.price}</p>
          </div>
        </div>
      </motion.div>
    </Link>
  );
}
