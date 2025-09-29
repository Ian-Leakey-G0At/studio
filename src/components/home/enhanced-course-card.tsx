"use client";

import Link from "next/link";
import type { Course } from "@/lib/types";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { motion } from "framer-motion";
import { ResponsiveImage } from "@/components/responsive-image";
import { Clock, Users, Star, ArrowRight, BookOpen } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

type EnhancedCourseCardProps = {
  course: Course;
  index?: number;
};

const categoryColors = {
  'Investing': 'from-blue-500 to-indigo-600',
  'Debt': 'from-red-500 to-pink-600', 
  'Budgeting': 'from-green-500 to-emerald-600',
} as const;

const categoryIcons = {
  'Investing': TrendingUp,
  'Debt': CreditCard,
  'Budgeting': PiggyBank,
} as const;

// Import the missing icons
import { TrendingUp, CreditCard, PiggyBank } from "lucide-react";

export function EnhancedCourseCard({ course, index = 0 }: EnhancedCourseCardProps) {
  const image = PlaceHolderImages.find((img) => img.id === course.imageId);
  const categoryGradient = categoryColors[course.category] || categoryColors.Investing;
  const CategoryIcon = categoryIcons[course.category] || TrendingUp;

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      whileHover={{ y: -8 }}
      className="group"
    >
      <Link href={`/courses/${course.id}`} className="block">
        <Card className="premium-card overflow-hidden h-full course-card-hover border-0 shadow-lg hover:shadow-2xl">
          {/* Image Section with Overlay */}
          <div className="relative aspect-[4/3] overflow-hidden">
            {image && (
              <ResponsiveImage
                src={image.imageUrl}
                alt={course.title}
                width={400}
                height={300}
                className="course-image w-full h-full object-cover transition-transform duration-700"
              />
            )}
            
            {/* Category Badge */}
            <div className="absolute top-4 left-4">
              <div className={`bg-gradient-to-r ${categoryGradient} text-white px-3 py-1 rounded-full text-sm font-semibold flex items-center gap-1 shadow-lg`}>
                <CategoryIcon className="w-4 h-4" />
                {course.category}
              </div>
            </div>

            {/* Price Badge */}
            <div className="absolute top-4 right-4">
              <div className="bg-black/70 backdrop-blur-sm text-white px-3 py-1 rounded-full text-lg font-bold">
                ${course.price}
              </div>
            </div>

            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            
            {/* Hover CTA */}
            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300">
              <Button 
                size="sm" 
                className="gradient-primary text-white font-semibold rounded-full transform scale-90 group-hover:scale-100 transition-transform"
              >
                View Course
                <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
            </div>
          </div>

          <CardContent className="p-6">
            {/* Course Title */}
            <h3 className="font-headline text-xl font-bold mb-3 line-clamp-2 group-hover:text-primary transition-colors">
              {course.title}
            </h3>

            {/* Course Description */}
            <p className="text-muted-foreground text-sm mb-4 line-clamp-3 leading-relaxed">
              {course.description}
            </p>

            {/* Course Meta */}
            <div className="flex items-center justify-between text-sm text-muted-foreground mb-4">
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-1">
                  <Clock className="w-4 h-4" />
                  <span>{course.duration}</span>
                </div>
                <div className="flex items-center gap-1">
                  <BookOpen className="w-4 h-4" />
                  <span>{course.format}</span>
                </div>
              </div>
            </div>

            {/* Progress Bar (Mock) */}
            <div className="mb-4">
              <div className="flex items-center justify-between text-xs text-muted-foreground mb-2">
                <span>Course Progress</span>
                <span>0%</span>
              </div>
              <div className="w-full bg-muted rounded-full h-2">
                <div className="bg-gradient-to-r from-primary to-accent h-2 rounded-full w-0 group-hover:w-1/4 transition-all duration-1000 delay-300" />
              </div>
            </div>

            {/* Rating (Mock) */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star 
                    key={i} 
                    className={`w-4 h-4 ${i < 4 ? 'text-yellow-400 fill-current' : 'text-muted-foreground'}`} 
                  />
                ))}
                <span className="text-sm text-muted-foreground ml-1">(4.8)</span>
              </div>
              
              <div className="flex items-center gap-1 text-sm text-muted-foreground">
                <Users className="w-4 h-4" />
                <span>1.2k</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </Link>
    </motion.div>
  );
}