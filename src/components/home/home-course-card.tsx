
"use client";

import Link from "next/link";
import Image from "next/image";
import type { Course } from "@/lib/types";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { Clock } from "lucide-react";

type CourseCardProps = {
  course: Course;
};

export function HomeCourseCard({ course }: CourseCardProps) {
  const image = PlaceHolderImages.find(img => img.id === course.imageId);

  const [durationValue, ...durationUnitParts] = course.duration.split(' ');
  const durationUnit = durationUnitParts.join(' ');
  const unit = durationUnit.toLowerCase().startsWith('hour') ? 'HRS' : 'MIN';

  return (
    <Link href={`/courses/${course.id}`} className="block group">
      <motion.div
        className="relative flex flex-col justify-end w-full aspect-[3/4] overflow-hidden rounded-3xl group interactive-glow"
        whileHover={{ y: -5 }}
      >
        {image && (
            <Image
              src={image.imageUrl}
              alt={course.title}
              fill
              className="absolute inset-0 object-cover w-full h-full transition-transform duration-300 group-hover:scale-105"
              data-ai-hint={image.imageHint}
            />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>

        <div className="relative z-10 p-4 space-y-4">
          <h2
            className="text-2xl font-black text-white"
            style={{ textShadow: "0px 1px 4px rgba(0,0,0,0.5)" }}
          >
            {course.title}
          </h2>

          <div className="glass-container flex items-center justify-between gap-3 rounded-2xl border-white/20 bg-black/30 p-2 text-white">
            <div className="flex h-full flex-col items-center justify-center rounded-lg border border-white/20 bg-white/10 px-2 py-1">
              <span className="text-xl font-black">{durationValue}</span>
              <span className="text-xs font-bold -mt-1">{unit}</span>
            </div>
            <div className="flex-1">
              <p className="text-xs font-bold text-white/80">{course.category}</p>
              <p className="text-xs text-white/60 truncate">{course.description}</p>
            </div>
            <div className="text-right">
              <p className="text-xl font-black">${course.price}</p>
              <p className="text-[10px] font-bold text-white/60 -mt-1">PRICE</p>
            </div>
          </div>
        </div>
      </motion.div>
    </Link>
  );
}
