import Link from "next/link";
import Image from "next/image";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import type { Course } from "@/lib/types";
import { placeholderImages } from "@/lib/placeholder-images";
import { Badge } from "@/components/ui/badge";
import { Clock } from "lucide-react";

type CourseCardProps = {
  course: Course;
};

export function CourseCard({ course }: CourseCardProps) {
  const image = placeholderImages.find(img => img.id === course.imageId);

  return (
    <Card className="flex flex-col overflow-hidden h-full transition-transform transform hover:-translate-y-2 hover:shadow-xl">
      <CardHeader className="p-0">
        <Link href={`/courses/${course.id}`} className="block">
          <div className="aspect-[3/2] relative">
            {image && (
              <Image
                src={image.imageUrl}
                alt={course.title}
                fill
                className="object-cover"
                data-ai-hint={image.imageHint}
              />
            )}
             <Badge className="absolute top-3 right-3 bg-accent text-accent-foreground">${course.price}</Badge>
          </div>
        </Link>
      </CardHeader>
      <CardContent className="p-6 flex-1">
        <Badge variant="secondary" className="mb-2">{course.category}</Badge>
        <CardTitle className="font-headline text-xl mb-2">
          <Link href={`/courses/${course.id}`} className="hover:text-primary transition-colors">
            {course.title}
          </Link>
        </CardTitle>
        <p className="text-muted-foreground text-sm line-clamp-3">
          {course.description}
        </p>
      </CardContent>
      <CardFooter className="p-6 pt-0 flex justify-between items-center">
         <div className="flex items-center text-sm text-muted-foreground">
            <Clock className="h-4 w-4 mr-1.5"/>
            {course.duration}
        </div>
        <Button asChild size="sm">
          <Link href={`/courses/${course.id}`}>View Details</Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
