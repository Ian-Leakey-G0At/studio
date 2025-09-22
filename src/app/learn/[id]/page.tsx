"use client";

import { notFound, useRouter } from "next/navigation";
import { useAuth } from "@/hooks/use-auth";
import { courses } from "@/lib/data";
import { VideoPlayer } from "@/components/video-player";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Lock } from "lucide-react";

type LearnPageProps = {
  params: {
    id: string;
  };
};

export default function LearnPage({ params }: LearnPageProps) {
  const { userProfile, loading } = useAuth();
  const router = useRouter();

  const course = courses.find((c) => c.id === params.id);

  // In a real app, this check would be more robust.
  // The middleware protects the route, but we should also check if the *specific* user has purchased *this* course.
  // For this demo, we'll grant access if the user is logged in and the course exists.
  // The purchase logic is simplified.
  const hasAccess = !loading && !!userProfile;

  useEffect(() => {
    if (!loading && !userProfile) {
      router.push(`/login?redirect_to=/learn/${params.id}`);
    }
  }, [loading, userProfile, router, params.id]);

  if (!course) {
    notFound();
  }
  
  if (loading) {
    return <div className="container mx-auto py-12"><div className="w-full aspect-video bg-muted animate-pulse rounded-lg"></div></div>;
  }

  if (!hasAccess) {
     return (
        <div className="container mx-auto py-20 text-center">
            <Lock className="h-12 w-12 mx-auto text-muted-foreground mb-4"/>
            <h1 className="text-3xl font-headline mb-4">Access Denied</h1>
            <p className="text-muted-foreground mb-6">You must purchase this course to view its content.</p>
            <Button asChild>
                <Link href={`/courses/${course.id}`}>View Course Details</Link>
            </Button>
        </div>
     );
  }
  
  return (
    <div className="bg-secondary min-h-[calc(100vh-theme(spacing.14))] py-12">
        <div className="container mx-auto px-4 md:px-6">
            <div className="max-w-4xl mx-auto">
                <div className="mb-8">
                    <p className="text-sm font-semibold text-primary uppercase tracking-wider">{course.category}</p>
                    <h1 className="text-4xl md:text-5xl font-headline font-bold mt-1">
                        {course.title}
                    </h1>
                </div>

                <VideoPlayer courseId={course.id} />
                
                <div className="prose prose-lg max-w-none text-foreground/80 mt-12 bg-background p-8 rounded-lg">
                    <h2 className="font-headline">Course Description</h2>
                    <p>{course.longDescription}</p>
                </div>
            </div>
        </div>
    </div>
  );
}
