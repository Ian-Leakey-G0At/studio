
import { Header } from "@/components/header";
import { HeroCarousel } from "@/components/home/hero-carousel";
import { GoodLuckButton } from "@/components/home/good-luck-button";
import { HomeCourseCard } from "@/components/home/home-course-card";
import { courses } from "@/lib/data";

export default function Home() {
  const featuredCourses = courses.slice(0, 6);

  return (
    <div className="flex flex-col">
      <Header />
      <div className="p-4 pt-0">
        <HeroCarousel />
      </div>

      <div className="px-4 pb-4">
        <GoodLuckButton />
      </div>

      <section className="p-4">
        <h2 className="font-heading text-2xl font-bold mb-4">Our Courses</h2>
        <div className="grid grid-cols-2 gap-4">
          {featuredCourses.map((course) => (
            <HomeCourseCard key={course.id} course={course} />
          ))}
        </div>
      </section>
    </div>
  );
}
