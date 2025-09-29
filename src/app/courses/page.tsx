"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { CoursesHeader } from "@/components/courses/CoursesHeader";
import { CategoryFilter } from "@/components/courses/CategoryFilter";
import { CourseCard } from "@/components/courses/CourseCard";
import { BottomNavigation } from "@/components/mobile/BottomNavigation";
import { mockRootProps, CourseCategory } from "@/lib/coursesMockData";

export default function CoursesPage() {
  const router = useRouter();
  const [selectedCategory, setSelectedCategory] = useState<CourseCategory>(CourseCategory.ALL);
  
  const courses = mockRootProps.courses;

  // Filter courses based on selected category
  const filteredCourses = selectedCategory === CourseCategory.ALL 
    ? courses
    : courses.filter(course => course.category === selectedCategory);

  const handleBack = () => {
    router.back();
  };

  const handleDownload = () => {
    console.log("Download courses");
  };

  const handleMenu = () => {
    console.log("Open menu");
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <CoursesHeader 
        onBack={handleBack}
        onDownload={handleDownload}
        onMenu={handleMenu}
      />
      
      <CategoryFilter 
        selectedCategory={selectedCategory}
        onCategoryChange={setSelectedCategory}
      />
      
      {/* Courses List */}
      <div className="px-4 py-4 pb-24">
        {filteredCourses.map((course) => (
          <CourseCard key={course.id} course={course} />
        ))}
        
        {filteredCourses.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500">No courses found for the selected category.</p>
          </div>
        )}
      </div>
      
      <BottomNavigation />
    </div>
  );
}