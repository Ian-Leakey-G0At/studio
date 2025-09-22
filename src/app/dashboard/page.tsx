"use client";

import { useAuth } from "@/hooks/use-auth";
import { courses } from "@/lib/data";
import { CourseCard } from "@/components/course-card";
import { ToolRecommender } from "@/components/dashboard/tool-recommender";

export default function DashboardPage() {
  const { userProfile, loading } = useAuth();

  if (loading) {
    return (
      <div className="space-y-12">
        <div>
          <div className="h-8 w-1/3 bg-muted rounded animate-pulse mb-4" />
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="bg-card rounded-lg h-96 animate-pulse" />
            ))}
          </div>
        </div>
        <div>
          <div className="h-8 w-1/2 bg-muted rounded animate-pulse mb-4" />
          <div className="bg-card rounded-lg h-64 animate-pulse" />
        </div>
      </div>
    );
  }

  const purchasedCourses = userProfile?.purchasedCourses?.map(id => 
    courses.find(c => c.id === id)
  ).filter(Boolean) || [];

  return (
    <div className="grid gap-12">
      <section>
        <h2 className="text-2xl font-bold font-headline mb-6">My Courses</h2>
        {purchasedCourses.length > 0 ? (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {purchasedCourses.map((course) => (
              course && <CourseCard key={course.id} course={course} />
            ))}
          </div>
        ) : (
          <p className="text-muted-foreground">You haven't purchased any courses yet.</p>
        )}
      </section>
      
      <section>
        <ToolRecommender />
      </section>
    </div>
  );
}
