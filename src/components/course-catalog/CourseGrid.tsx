"use client";

import { CourseCard } from "./CourseCard";
import { CourseCategory } from "@/lib/courseCatalogMockData";

interface Course {
  id: string;
  title: string;
  category: CourseCategory;
  price: number;
  imageUrl: string;
  backgroundColor: string;
  description: string;
  attribution: string;
}

interface CourseGridProps {
  courses: Course[];
  onCourseClick?: (courseId: string) => void;
}

export function CourseGrid({ courses, onCourseClick }: CourseGridProps) {
  if (courses.length === 0) {
    return (
      <div className="px-4 py-12 text-center">
        <p className="text-gray-500">No courses found for the selected category.</p>
      </div>
    );
  }

  return (
    <div className="px-4 pb-28">
      {/* Single column layout matching the design */}
      <div className="space-y-6">
        {courses.map((course) => (
          <CourseCard
            key={course.id}
            {...course}
            onClick={() => onCourseClick?.(course.id)}
          />
        ))}
      </div>
    </div>
  );
}