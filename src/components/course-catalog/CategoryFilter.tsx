"use client";

import { Button } from "@/components/ui/button";
import { CourseCategory } from "@/lib/courseCatalogMockData";
import { cn } from "@/lib/utils";

interface CategoryFilterProps {
  selectedCategory: CourseCategory;
  onCategoryChange: (category: CourseCategory) => void;
}

const categories = [
  CourseCategory.ALL,
  CourseCategory.INVESTING,
  CourseCategory.TRADING,
  CourseCategory.CRYPTO,
];

export function CategoryFilter({ selectedCategory, onCategoryChange }: CategoryFilterProps) {
  return (
    <div className="px-4 py-6 bg-gray-50">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-bold text-gray-900">All Courses</h2>
        
        <div className="flex gap-2">
          <Button
            variant="ghost"
            size="icon"
            className="h-10 w-10 bg-white rounded-xl shadow-sm hover:shadow-md"
          >
            <svg className="h-5 w-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="h-10 w-10 bg-white rounded-xl shadow-sm hover:shadow-md"
          >
            <svg className="h-5 w-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
            </svg>
          </Button>
        </div>
      </div>
      
      <div className="flex gap-3 overflow-x-auto scrollbar-hide">
        {categories.map((category) => (
          <Button
            key={category}
            variant={selectedCategory === category ? "default" : "secondary"}
            size="sm"
            onClick={() => onCategoryChange(category)}
            className={cn(
              "rounded-full whitespace-nowrap px-6 py-2 font-medium transition-all",
              selectedCategory === category 
                ? "bg-blue-600 text-white hover:bg-blue-700 shadow-md" 
                : "bg-white text-gray-700 hover:bg-gray-100 shadow-sm border border-gray-200"
            )}
          >
            {category}
          </Button>
        ))}
      </div>
    </div>
  );
}