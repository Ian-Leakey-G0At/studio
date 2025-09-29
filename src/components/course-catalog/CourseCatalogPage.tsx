"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { MobileHeader } from "./MobileHeader";
import { CategoryFilter } from "./CategoryFilter";
import { CourseGrid } from "./CourseGrid";
import { BottomNavigation } from "@/components/mobile/BottomNavigation";
import { CourseCategory, mockQuery } from "@/lib/courseCatalogMockData";

export function CourseCatalogPage() {
  const router = useRouter();
  const [selectedCategory, setSelectedCategory] = useState<CourseCategory>(CourseCategory.ALL);
  
  // Filter courses based on selected category
  const filteredCourses = selectedCategory === CourseCategory.ALL 
    ? mockQuery.courses
    : mockQuery.courses.filter(course => course.category === selectedCategory);

  const handleBack = () => {
    router.back();
  };

  const handleDownload = () => {
    // TODO: Implement download functionality
    console.log("Download courses");
  };

  const handleFilter = () => {
    // TODO: Implement additional filter options
    console.log("Show filter options");
  };

  const handleCourseClick = (courseId: string) => {
    router.push(`/courses/${courseId}`);
  };

  return (
    <div className="min-h-screen bg-background">
      <MobileHeader 
        onBack={handleBack}
        onDownload={handleDownload}
        onFilter={handleFilter}
      />
      
      <CategoryFilter 
        selectedCategory={selectedCategory}
        onCategoryChange={setSelectedCategory}
      />
      
      <CourseGrid 
        courses={filteredCourses}
        onCourseClick={handleCourseClick}
      />
      
      <BottomNavigation />
    </div>
  );
}