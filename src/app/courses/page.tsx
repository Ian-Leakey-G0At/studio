import { CourseCard } from "@/components/course-card";
import { courses } from "@/lib/data";

export default function CoursesPage() {
  return (
    <div className="container mx-auto px-4 md:px-6 py-12">
      <div className="space-y-4 text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-headline font-bold tracking-tighter text-primary">
          All Courses
        </h1>
        <p className="max-w-[600px] mx-auto text-foreground/80 md:text-xl">
          Explore our full catalog of no-nonsense financial education.
        </p>
      </div>

      {/* TODO: Add filtering UI */}
      
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {courses.map((course) => (
          <CourseCard key={course.id} course={course} />
        ))}
      </div>
    </div>
  );
}
