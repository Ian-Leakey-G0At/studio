import Link from "next/link";
import Image from "next/image";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import type { Course } from "@/lib/types";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { Badge } from "@/components/ui/badge";
import { Clock } from "lucide-react";
import { motion } from "framer-motion";

type CourseCardProps = {
  course: Course;
};

export function CourseCard({ course }: CourseCardProps) {
  const image = PlaceHolderImages.find(img => img.id === course.imageId);

  return (
    <motion.div
      whileHover={{ y: -8, scale: 1.02 }}
      transition={{ type: "spring", stiffness: 300 }}
    >
      <Card className="flex flex-col overflow-hidden h-full">
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
              <Badge className="absolute top-3 right-3 bg-secondary text-secondary-foreground font-bold">${course.price}</Badge>
            </div>
          </Link>
        </CardHeader>
        <CardContent className="p-6 flex-1">
          <Badge variant="outline" className="mb-2 border-secondary text-secondary">{course.category}</Badge>
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
          <Button asChild size="sm" variant="outline">
            <Link href={`/courses/${course.id}`}>View Details</Link>
          </Button>
        </CardFooter>
      </Card>
    </motion.div>
  );
}
