import { Button } from "@/components/ui/button";
import { CourseCard } from "@/components/course-card";
import { courses } from "@/lib/data";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { placeholderImages } from "@/lib/placeholder-images";

export default function Home() {
  const featuredCourses = courses.slice(0, 3);
  const heroImage = placeholderImages.find(img => img.id === "hero-1");

  return (
    <div className="flex flex-col">
      <section className="relative w-full py-20 md:py-32 lg:py-40 bg-card">
        <div className="container mx-auto px-4 md:px-6 grid md:grid-cols-2 gap-8 items-center">
          <div className="space-y-6 text-center md:text-left">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-headline font-bold tracking-tighter text-primary">
              Take Control of Your Financial Destiny.
            </h1>
            <p className="max-w-[600px] mx-auto md:mx-0 text-foreground/80 md:text-xl">
              Revenge Money provides practical, no-nonsense financial education. We empower you with actionable knowledge to overcome systemic disadvantages and build true wealth.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
              <Button asChild size="lg" className="font-bold">
                <Link href="/courses">
                  Browse Courses <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline">
                <Link href="/about">Learn More</Link>
              </Button>
            </div>
          </div>
          <div className="relative h-64 md:h-auto md:aspect-square rounded-xl overflow-hidden shadow-2xl">
            {heroImage && (
               <Image
                src={heroImage.imageUrl}
                alt={heroImage.description}
                fill
                className="object-cover"
                data-ai-hint={heroImage.imageHint}
              />
            )}
          </div>
        </div>
      </section>

      <section className="w-full py-12 md:py-24 lg:py-32 bg-background">
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h2 className="text-3xl font-headline font-bold tracking-tighter sm:text-5xl">
                Why Revenge Money?
              </h2>
              <p className="max-w-[900px] text-foreground/70 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                We reject confusing jargon and theoretical fluff. Our focus is on practical, immediately applicable knowledge that gets you results.
              </p>
            </div>
          </div>
          <div className="mx-auto grid max-w-5xl items-start gap-12 py-12 lg:grid-cols-3 lg:gap-12">
            <div className="grid gap-1 text-center">
              <CheckCircle2 className="h-10 w-10 text-accent mx-auto" />
              <h3 className="text-xl font-bold font-headline">Actionable Steps</h3>
              <p className="text-foreground/70">
                Every course includes specific, implementable steps you can take today. No theory, just action.
              </p>
            </div>
            <div className="grid gap-1 text-center">
              <CheckCircle2 className="h-10 w-10 text-accent mx-auto" />
              <h3 className="text-xl font-bold font-headline">No-Nonsense Content</h3>
              <p className="text-foreground/70">
                We deliver streamlined, practical knowledge designed for immediate implementation, regardless of your starting point.
              </p>
            </div>
            <div className="grid gap-1 text-center">
              <CheckCircle2 className="h-10 w-10 text-accent mx-auto" />
              <h3 className="text-xl font-bold font-headline">Empowerment</h3>
              <p className="text-foreground/70">
                True financial freedom is the ultimate form of "revenge" against systems designed to keep you dependent.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="w-full py-12 md:py-24 lg:py-32 bg-secondary">
        <div className="container mx-auto px-4 md:px-6">
          <div className="space-y-4 text-center mb-12">
            <h2 className="text-3xl font-headline font-bold tracking-tighter sm:text-5xl">
              Featured Courses
            </h2>
            <p className="max-w-[900px] mx-auto text-foreground/70 md:text-xl/relaxed">
              Start your journey with our most popular courses.
            </p>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {featuredCourses.map((course) => (
              <CourseCard key={course.id} course={course} />
            ))}
          </div>
          <div className="text-center mt-12">
            <Button asChild size="lg" variant="link" className="text-lg">
              <Link href="/courses">View All Courses <ArrowRight className="ml-2 h-5 w-5" /></Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
