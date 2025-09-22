import { notFound } from "next/navigation";
import Image from "next/image";
import { courses } from "@/lib/data";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Clock, BarChart, Film, FileText } from "lucide-react";
import Link from "next/link";

type CoursePageProps = {
  params: {
    id: string;
  };
};

export default function CoursePage({ params }: CoursePageProps) {
  const course = courses.find((c) => c.id === params.id);

  if (!course) {
    notFound();
  }

  const image = PlaceHolderImages.find(img => img.id === course.imageId);

  return (
    <div className="bg-secondary">
      <div className="container mx-auto px-4 md:px-6 py-12 md:py-20">
        <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-start">
          <div className="space-y-6">
            <Badge variant="outline">{course.category.toUpperCase()}</Badge>
            <h1 className="text-4xl md:text-5xl font-headline font-bold text-primary">
              {course.title}
            </h1>
            <p className="text-xl text-muted-foreground">
              {course.description}
            </p>
            <div className="flex flex-wrap gap-4 text-sm text-foreground">
              <div className="flex items-center gap-2">
                <Clock className="h-5 w-5 text-primary" />
                <span>{course.duration}</span>
              </div>
              <div className="flex items-center gap-2">
                 {course.format === 'Video' ? <Film className="h-5 w-5 text-primary" /> : <FileText className="h-5 w-5 text-primary" />}
                <span>{course.format} Format</span>
              </div>
            </div>
             <div className="!mt-8">
              {/* In a real app, this would be a proper checkout flow */}
              <Button asChild size="lg" className="w-full md:w-auto font-bold text-lg">
                  <Link href={`/learn/${course.id}`}>
                    Buy Now for ${course.price}
                  </Link>
              </Button>
               <p className="text-xs text-muted-foreground mt-2">
                One-time payment. Lifetime access.
              </p>
            </div>
          </div>
          <div className="relative aspect-[4/3] rounded-lg overflow-hidden shadow-xl">
             {image && (
              <Image
                src={image.imageUrl}
                alt={course.title}
                fill
                className="object-cover"
                data-ai-hint={image.imageHint}
              />
            )}
          </div>
        </div>
      </div>
       <div className="bg-background">
        <div className="container mx-auto px-4 md:px-6 py-12 md:py-20">
            <h2 className="text-3xl font-headline font-bold mb-6">About this course</h2>
            <div className="prose prose-lg max-w-none text-foreground/80">
              <p>{course.longDescription}</p>
            </div>
        </div>
       </div>
    </div>
  );
}
