
"use client";

import Link from "next/link";
import Image from "next/image";
import { Card } from "@/components/ui/card";
import type { Course } from "@/lib/types";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { motion } from "framer-motion";

type CourseCardProps = {
  course: Course;
};

export function CourseCard({ course }: CourseCardProps) {
  const image = PlaceHolderImages.find(img => img.id === course.imageId);
  
  const durationValue = course.duration.split(' ')[0];
  const durationUnitRaw = course.duration.split(' ')[1];
  let durationUnit = 'HRS';
  if (durationUnitRaw.toLowerCase().startsWith('hour')) {
    durationUnit = 'HRS';
  } else if (durationUnitRaw.toLowerCase().startsWith('min')) {
    durationUnit = 'MIN';
  } else {
    durationUnit = durationUnitRaw.substring(0,3).toUpperCase();
  }


  return (
    <motion.div
      whileHover={{ y: -8, scale: 1.02 }}
      transition={{ type: "spring", stiffness: 300 }}
      className="h-full interactive-glow rounded-3xl w-full"
    >
      <Link href={`/courses/${course.id}`} className="block h-full">
        <Card className="relative flex flex-col justify-end overflow-hidden h-full aspect-[3/4]">
          {image && (
            <Image
              src={image.imageUrl}
              alt={course.title}
              fill
              className="object-cover"
              data-ai-hint={image.imageHint}
            />
          )}
          
          {/* Gradient Overlay for Text Visibility */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
          
          {/* Content Overlay */}
          <div className="relative flex flex-col justify-end h-full w-full p-6 text-background">
            <h2 className="text-3xl font-black leading-tight text-white" style={{ textShadow: '0 2px 10px rgba(0,0,0,0.5)' }}>
              {course.title}
            </h2>
            
            {/* Glass Info Panel */}
            <div className="mt-4 p-4 rounded-2xl glass-container border border-white/20 bg-black/30 backdrop-blur-md">
              <div className="flex items-center justify-between gap-4">
                {/* Duration Box */}
                <div className="flex flex-col items-center justify-center p-2 rounded-lg bg-white/10 border border-white/20 aspect-square w-16 text-white">
                  <span className="text-2xl font-black">
                    {durationValue}
                  </span>
                  <span className="text-xs font-bold tracking-widest">
                    {durationUnit}
                  </span>
                </div>
                {/* Details */}
                <div className="flex-1 ml-0 space-y-1">
                  <h3 className="font-bold text-white">{course.category}</h3>
                  <p className="text-xs text-white/70 line-clamp-2">{course.description}</p>
                </div>
                {/* Price */}
                <div className="text-right text-white">
                  <div className="text-xl font-bold">${course.price}</div>
                  <div className="text-xs text-white/70">PRICE</div>
                </div>
              </div>
            </div>
          </div>
        </Card>
      </Link>
    </motion.div>
  );
}
