"use client";

import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CourseCategory } from "@/lib/coursesMockData";
import { BookDown, AlignLeft } from "lucide-react";

interface CategoryFilterProps {
  selectedCategory: CourseCategory;
  onCategoryChange: (category: CourseCategory) => void;
}

export function CategoryFilter({ selectedCategory, onCategoryChange }: CategoryFilterProps) {
  const categories = [
    CourseCategory.ALL,
    CourseCategory.INVESTING,
    CourseCategory.TRADING,
    CourseCategory.CRYPTO
  ];

  return (
    <div className="px-4 py-3 bg-white">
      <div className="flex items-center justify-between mb-3">
        <h2 className="text-xl font-bold text-gray-900">All Courses</h2>
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-gray-50 flex items-center justify-center">
            <BookDown size={16} className="text-gray-600" />
          </div>
          <div className="w-8 h-8 rounded-lg bg-gray-50 flex items-center justify-center">
            <AlignLeft size={16} className="text-gray-600" />
          </div>
        </div>
      </div>
      
      <Tabs value={selectedCategory} onValueChange={(value) => onCategoryChange(value as CourseCategory)}>
        <TabsList className="grid w-full grid-cols-4 bg-gray-50 p-1 h-auto">
          {categories.map((category) => (
            <TabsTrigger 
              key={category}
              value={category}
              className="px-4 py-2 text-sm font-medium rounded-lg data-[state=active]:bg-blue-600 data-[state=active]:text-white data-[state=inactive]:text-gray-600"
            >
              {category}
            </TabsTrigger>
          ))}
        </TabsList>
      </Tabs>
    </div>
  );
}