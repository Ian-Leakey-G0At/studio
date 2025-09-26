
"use client";

import Link from "next/link";
import Image from "next/image";
import type { Course } from "@/lib/types";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { motion } from "framer-motion";

type HomeCourseCardProps = {
  course: Course;
};

export function HomeCourseCard({ course }: HomeCourseCardProps) {
  const image = PlaceHolderImages.find((img) => img.id === course.imageId);

  return (
    <Link href={`/courses/${course.id}`} className="block group">
      <motion.div
        className="relative flex flex-col justify-end group rounded-2xl p-4 overflow-hidden aspect-[3/4]"
        whileHover={{ y: -5 }}
        transition={{ type: 'spring', stiffness: 300 }}
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
        <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black/80 to-transparent"></div>
        <div className="relative z-10">
          <h3
            className="font-heading font-bold text-xl leading-tight text-white"
            style={{ textShadow: "0 1px 3px rgba(0,0,0,0.5)" }}
          >
            {course.title}
          </h3>
          <p className="text-sm text-white/80 mt-2">{course.duration} course</p>
        </div>
      </motion.div>
    </Link>
  );
}
