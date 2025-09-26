
"use client";

import * as React from "react";
import { CourseCard } from "@/components/course-card";
import { courses } from "@/lib/data";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ListFilter, Rows3 } from "lucide-react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";

const categories = ["All", "Investing", "Debt", "Budgeting"];

export default function CoursesPage() {
  const router = useRouter();
  const [activeCategory, setActiveCategory] = React.useState("All");

  const filteredCourses = React.useMemo(() => {
    if (activeCategory === "All") {
      return courses;
    }
    return courses.filter((course) => course.category === activeCategory);
  }, [activeCategory]);

  return (
    <div className="flex flex-col min-h-screen">
      <header className="sticky top-0 z-10 flex items-center justify-between bg-background/80 px-4 py-3 backdrop-blur-sm dark:bg-background/80">
        <Button variant="ghost" size="icon" onClick={() => router.back()}>
          <ArrowLeft className="h-6 w-6" />
        </Button>
        <h1 className="font-heading text-xl font-bold">Courses</h1>
        <div className="h-11 w-11" />
      </header>

      <main className="flex-1 px-4 py-6">
        <div className="mb-6 flex items-center justify-between">
          <h2 className="font-heading text-2xl font-bold">All Courses</h2>
          <div className="flex items-center space-x-2">
            <Button variant="secondary" size="icon" className="rounded-full">
              <Rows3 className="h-5 w-5" />
            </Button>
            <Button variant="secondary" size="icon" className="rounded-full">
              <ListFilter className="h-5 w-5" />
            </Button>
          </div>
        </div>

        <div className="mb-6 flex space-x-3 overflow-x-auto pb-2">
          {categories.map((category) => (
            <Button
              key={category}
              variant={activeCategory === category ? "default" : "secondary"}
              className="h-11 shrink-0 rounded-full px-5 text-sm font-medium"
              onClick={() => setActiveCategory(category)}
            >
              {category}
            </Button>
          ))}
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
          {filteredCourses.map((course, index) => (
            <motion.div
              key={course.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
            >
              <CourseCard course={course} />
            </motion.div>
          ))}
        </div>
      </main>
    </div>
  );
}
