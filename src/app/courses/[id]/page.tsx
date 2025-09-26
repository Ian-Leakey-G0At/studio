
"use client";

import { use, Suspense } from "react";
import { notFound, useRouter } from "next/navigation";
import Image from "next/image";
import { courses } from "@/lib/data";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { Button } from "@/components/ui/button";
import { ChevronLeft, Download, Play } from "lucide-react";
import { PurchaseModal } from "@/components/purchase-modal";

type CoursePageProps = {
  params: {
    id: string;
  };
};

function CoursePageContent({ params: paramsProp }: CoursePageProps) {
  const params = use(paramsProp);
  const router = useRouter();
  const { id } = params;
  const course = courses.find((c) => c.id === id);

  if (!course) {
    notFound();
  }

  const image = PlaceHolderImages.find((img) => img.id === course.imageId);

  const courseContent = [
    {
      icon: Play,
      title: "Lesson 1",
      description: "Introduction to Financial Concepts",
    },
    {
      icon: Play,
      title: "Lesson 2",
      description: "Analyzing Your Spending",
    },
    {
      icon: Play,
      title: "Lesson 3",
      description: "Advanced Budgeting Strategies",
    },
    {
      icon: Download,
      title: "Resources",
      description: "Downloadable Worksheets & Guides",
    },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <header className="p-4 sticky top-0 bg-background/80 dark:bg-background/80 backdrop-blur-sm z-10 border-b border-border">
        <div className="flex items-center justify-between">
          <Button
            variant="secondary"
            size="icon"
            className="h-11 w-11 rounded-full"
            onClick={() => router.back()}
          >
            <ChevronLeft className="h-6 w-6" />
          </Button>
          <h1 className="font-heading text-lg font-bold text-center">
            Course Details
          </h1>
          <div className="w-11 h-11"></div>
        </div>
      </header>

      <main className="flex-grow p-4 space-y-6 pb-24">
        <div className="space-y-2">
          <h2 className="font-heading text-3xl font-bold">{course.title}</h2>
          <div className="flex items-center space-x-2 text-muted-foreground">
            <p className="text-sm font-medium">{course.category}</p>
            <span className="text-xs">●</span>
            <p className="text-sm font-medium">{course.duration}</p>
            <span className="text-xs">●</span>
            <p className="text-sm font-medium font-heading text-primary">
              ${course.price}
            </p>
          </div>
        </div>

        <div className="aspect-video w-full relative rounded-lg overflow-hidden">
          <div className="absolute inset-0 bg-black flex items-center justify-center">
            {image && (
              <Image
                src={image.imageUrl}
                alt={course.title}
                fill
                className="absolute inset-0 w-full h-full object-cover opacity-50"
                data-ai-hint={image.imageHint}
              />
            )}
            <Button
              size="icon"
              className="relative h-14 w-14 rounded-full bg-primary text-primary-foreground hover:bg-primary/90"
            >
              <Play className="h-8 w-8 fill-current" />
            </Button>
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="font-heading text-xl font-bold">Course Content</h3>
          <ul className="space-y-3">
            {courseContent.map((item, index) => (
              <li
                key={index}
                className="flex items-center gap-4 p-4 rounded-lg bg-secondary h-[72px]"
              >
                <div className="flex items-center justify-center rounded-full bg-primary/20 shrink-0 size-12 text-primary">
                  <item.icon className="h-6 w-6" />
                </div>
                <div className="flex-grow">
                  <p className="font-body text-base font-medium text-foreground">
                    {item.title}
                  </p>
                  <p className="font-body text-sm text-muted-foreground">
                    {item.description}
                  </p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </main>
      
      <div className="p-4 sticky bottom-0 bg-background/80 dark:bg-background/80 backdrop-blur-sm border-t border-border">
          <PurchaseModal course={course} />
      </div>
    </div>
  );
}

export default function CoursePage({ params }: CoursePageProps) {
  return (
    <Suspense
      fallback={
        <div className="h-screen w-full animate-pulse bg-muted/20" />
      }
    >
      <CoursePageContent params={params} />
    </Suspense>
  );
}
