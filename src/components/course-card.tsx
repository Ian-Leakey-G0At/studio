
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
  const lessonText = `${course.duration} Lessons`;

  return (
    <Link href={`/courses/${course.id}`} className="block group">
      <Card className="relative flex flex-col justify-end group rounded-lg p-4 overflow-hidden aspect-[3/4]">
        {image && (
          <Image
            src={image.imageUrl}
            alt={course.title}
            fill
            className="absolute inset-0 bg-cover bg-center object-cover"
            data-ai-hint={image.imageHint}
          />
        )}
        <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black/80 to-transparent"></div>
        <div className="relative z-10">
          <h3 className="font-heading font-bold text-base leading-tight text-white">{course.title}</h3>
          <p className="text-sm text-gray-300 mt-2">{lessonText}</p>
        </div>
      </Card>
    </Link>
  );
}
