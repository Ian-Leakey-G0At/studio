
"use client";

import { useAuth } from "@/hooks/use-auth";
import { courses } from "@/lib/data";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Skeleton } from "@/components/ui/skeleton";

function getInitials(name: string | null | undefined) {
    if (!name) return "U";
    const names = name.split(" ");
    if (names.length > 1) {
      return names[0][0] + names[names.length - 1][0];
    }
    return name[0];
}

function AccountPageSkeleton() {
    return (
        <div className="space-y-8">
            <div className="flex flex-col gap-6">
                <div className="flex items-center gap-4">
                    <Skeleton className="h-24 w-24 rounded-full" />
                    <div className="space-y-2">
                        <Skeleton className="h-7 w-40" />
                        <Skeleton className="h-5 w-48" />
                    </div>
                </div>
                <Skeleton className="h-11 w-full rounded-lg" />
            </div>
            <div>
                <Skeleton className="h-7 w-32 mb-4" />
                <div className="space-y-2">
                    <div className="flex items-center gap-4 rounded-lg p-3 bg-muted/50">
                        <Skeleton className="h-16 w-16 rounded-lg" />
                        <div className="flex-1 space-y-2">
                            <Skeleton className="h-5 w-3/4" />
                            <Skeleton className="h-4 w-1/2" />
                        </div>
                    </div>
                    <div className="flex items-center gap-4 rounded-lg p-3 bg-muted/50">
                        <Skeleton className="h-16 w-16 rounded-lg" />
                        <div className="flex-1 space-y-2">
                            <Skeleton className="h-5 w-3/4" />
                            <Skeleton className="h-4 w-1/2" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}


export default function AccountPage() {
  const { userProfile, loading } = useAuth();

  if (loading) {
    return <AccountPageSkeleton />;
  }

  const purchasedCourses = userProfile?.purchasedCourses?.map(id => 
    courses.find(c => c.id === id)
  ).filter(Boolean) || [];

  return (
    <div className="grid gap-8">
        <div className="flex flex-col gap-6">
            <div className="flex items-center gap-4">
                <Avatar className="h-24 w-24">
                    <AvatarImage src={userProfile?.photoURL || ''} alt={userProfile?.displayName || ''} />
                    <AvatarFallback className="text-3xl">
                        {getInitials(userProfile?.displayName)}
                    </AvatarFallback>
                </Avatar>
                <div className="flex flex-col">
                    <p className="font-headline text-2xl font-bold">{userProfile?.displayName}</p>
                    <p className="text-base text-muted-foreground">{userProfile?.email}</p>
                </div>
            </div>
            <Button variant="secondary" className="w-full h-11 text-base font-bold">
                Edit Profile
            </Button>
        </div>

      <section>
        <h2 className="text-xl font-headline font-bold mb-4">Course History</h2>
        {purchasedCourses.length > 0 ? (
          <div className="space-y-2">
            {purchasedCourses.map((course) => {
              if (!course) return null;
              const image = PlaceHolderImages.find(img => img.id === course.imageId);
              return (
                <Link key={course.id} href={`/learn/${course.id}`} className="block">
                    <div className="flex items-center gap-4 rounded-lg p-3 bg-secondary">
                         {image && (
                            <Image 
                                src={image.imageUrl} 
                                alt={course.title} 
                                width={64}
                                height={64}
                                className="h-16 w-16 rounded-lg object-cover"
                                data-ai-hint={image.imageHint}
                            />
                         )}
                        <div className="flex-1">
                            <p className="font-bold text-foreground">{course.title}</p>
                            <p className="text-sm text-muted-foreground">{course.category}</p>
                        </div>
                    </div>
                </Link>
              )
            })}
          </div>
        ) : (
          <div className='text-center border-2 border-dashed border-muted-foreground/30 rounded-lg p-12 mt-4'>
            <p className="text-muted-foreground mb-4">You haven't purchased any courses yet.</p>
            <Button asChild>
                <Link href="/courses">Browse Courses</Link>
            </Button>
          </div>
        )}
      </section>
    </div>
  );
}
