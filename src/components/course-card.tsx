
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
              className="object-cover w-full h-full max-w-full max-h-full"
              data-ai-hint={image.imageHint}
              style={{ objectFit: 'cover', width: '100%', height: '100%', maxWidth: '100%', maxHeight: '100%' }}
            />
          )}
          {/* Gradient Overlay for Text Visibility */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
          {/* Content Overlay */}
          <div
            className="relative flex flex-col justify-between h-full w-full"
            style={{ padding: 'clamp(1rem, 4vw, 2rem)' }}
          >
            <h2
              className="font-black leading-tight text-white"
              style={{
                textShadow: '0 2px 10px rgba(0,0,0,0.5)',
                fontSize: 'clamp(1.1rem, 4vw, 1.5rem)',
                marginBottom: 'clamp(0.5rem, 2vw, 1rem)',
              }}
            >
              {course.title}
            </h2>
            {/* Glass Info Panel */}
            <div
              className="rounded-2xl glass-container border border-white/20 bg-black/30 backdrop-blur-md"
              style={{
                marginTop: 'clamp(0.5rem, 2vw, 1rem)',
                padding: 'clamp(0.75rem, 2vw, 1.25rem)',
              }}
            >
              <div className="flex flex-col gap-3">
                {/* Duration Box */}
                <div
                  className="flex flex-col items-center justify-center rounded-lg bg-white/10 border border-white/20 aspect-square text-white"
                  style={{
                    padding: 'clamp(0.5rem, 2vw, 1rem)',
                    width: 'clamp(44px, 20vw, 64px)',
                    minHeight: '44px',
                  }}
                >
                  <span
                    className="font-black"
                    style={{ fontSize: 'clamp(1.1rem, 4vw, 1.5rem)' }}
                  >
                    {durationValue}
                  </span>
                  <span
                    className="font-bold tracking-widest"
                    style={{ fontSize: 'clamp(0.7rem, 2vw, 0.85rem)' }}
                  >
                    {durationUnit}
                  </span>
                </div>
                {/* Details */}
                <div className="flex-1 ml-0 space-y-1">
                  <h3
                    className="font-bold text-white"
                    style={{ fontSize: 'clamp(0.9rem, 3vw, 1.1rem)' }}
                  >
                    {course.category}
                  </h3>
                  <p
                    className="text-white/70 line-clamp-2"
                    style={{ fontSize: 'clamp(0.8rem, 2vw, 1rem)' }}
                  >
                    {course.description}
                  </p>
                </div>
                {/* Price */}
                <div className="text-right text-white">
                  <div
                    className="font-bold"
                    style={{ fontSize: 'clamp(1rem, 3vw, 1.25rem)' }}
                  >
                    ${course.price}
                  </div>
                  <div
                    className="text-white/70"
                    style={{ fontSize: 'clamp(0.7rem, 2vw, 0.85rem)' }}
                  >
                    PRICE
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Card>
      </Link>
    </motion.div>
  );
}
