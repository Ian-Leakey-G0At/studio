"use client";

import Link from "next/link";
import type { Course } from "@/lib/coursesMockData";
import { formatPrice } from "@/lib/coursesMockData";

interface CourseCardProps {
  course: Course;
}

export function CourseCard({ course }: CourseCardProps) {
  return (
    <Link href={`/courses/${course.id}`} className="block">
      <div 
        className="rounded-2xl p-6 mb-4 relative overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-200"
        style={{ backgroundColor: course.backgroundColor }}
      >
        {/* Course Image */}
        <div className="mb-4 relative">
          <div className="bg-white rounded-xl p-4 shadow-sm">
            <img 
              src={course.image}
              alt={`${course.title} - Course illustration by photographer on Unsplash`}
              className="w-full h-32 object-cover rounded-lg"
              style={{ width: "100%", height: "128px" }}
            />
          </div>
        </div>
        
        {/* Course Content */}
        <div className="text-white">
          <p className="text-sm opacity-80 mb-1">{course.category}</p>
          <h3 className="text-lg font-semibold mb-2 line-clamp-2">
            {course.title}
          </h3>
          <p className="text-xl font-bold">
            {formatPrice(course.price)}
          </p>
        </div>
      </div>
    </Link>
  );
}