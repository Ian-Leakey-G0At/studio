"use client";

import Link from "next/link";
import { BookOpen } from "lucide-react";

type Course = {
  id: string;
  title: string;
  lessons: number;
  category: string;
};

type MobileCourseCardProps = {
  course: Course;
};

export function MobileCourseCard({ course }: MobileCourseCardProps) {
  return (
    <Link href={`/courses/${course.id}`} className="block">
      <div className="relative bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl p-6 h-40 overflow-hidden group hover:scale-[1.02] transition-transform duration-200">
        {/* Background Pattern */}
        <div className="absolute inset-0 bg-gradient-to-br from-black/20 to-black/60" />
        
        {/* Icon */}
        <div className="absolute top-4 right-4 opacity-30">
          <BookOpen className="w-8 h-8 text-white" />
        </div>
        
        {/* Content */}
        <div className="relative z-10 h-full flex flex-col justify-between">
          <div>
            <h3 className="text-white font-bold text-lg leading-tight mb-2 line-clamp-2">
              {course.title}
            </h3>
          </div>
          
          <div>
            <p className="text-white/80 text-sm font-medium">
              {course.lessons} Lessons
            </p>
          </div>
        </div>
      </div>
    </Link>
  );
}