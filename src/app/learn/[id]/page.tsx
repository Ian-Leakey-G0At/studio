
import { notFound } from "next/navigation";
import { doc, getDoc } from "firebase/firestore";
import { db } from "@/lib/firebase/clientApp"; // Assuming you have a firebase config file
import { VideoPlayer } from "@/components/video-player";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Lock } from "lucide-react";
import { getAuthenticatedUser } from "@/lib/firebase/auth"; // You will need to create this helper
import { supabaseAdmin } from "@/utils/supabase/admin";

type LearnPageProps = {
  params: {
    id: string;
  };
};

// This is now a Server Component
export default async function LearnPage({ params }: LearnPageProps) {
  const { id } = params;

  // 1. Get the authenticated user on the server
  const user = await getAuthenticatedUser();

  // Redirect to login if no user
  if (!user) {
    const loginUrl = new URL('/login', 'http://localhost:3000');
    loginUrl.searchParams.set('courseId', id);
    loginUrl.searchParams.set('redirect_to', `/learn/${id}`);
    return <meta http-equiv="refresh" content={`0;url=${loginUrl.toString()}`} />;
  }

  // 2. Fetch course and user profile from Firestore
  const courseDocRef = doc(db, "courses", id);
  const userDocRef = doc(db, "users", user.uid);
  
  const [courseSnap, userSnap] = await Promise.all([
    getDoc(courseDocRef),
    getDoc(userDocRef),
  ]);

  if (!courseSnap.exists()) {
    notFound();
  }

  const course = { id: courseSnap.id, ...courseSnap.data() };
  const userProfile = userSnap.exists() ? userSnap.data() : null;

  // 3. Verify if the user has purchased the course
  const hasAccess = userProfile?.purchasedCourses?.includes(id);

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

  // 4. Generate a secure, time-limited URL for the video
  // Assumes your videos are in a bucket named 'course-videos' and organized by course ID.
  // e.g., /course-videos/course-101/video.mp4
  const videoPath = `${id}/video.mp4`; // Example path, adjust if necessary
  const { data, error } = await supabaseAdmin.storage
    .from('course-videos') // Make sure this is your bucket name
    .createSignedUrl(videoPath, 3600); // URL expires in 1 hour (3600 seconds)

  if (error || !data) {
    console.error("Error creating signed URL:", error);
    // You might want to show a more user-friendly error page here
    return <div className="container mx-auto py-12">Error loading video. Please try again later.</div>;
  }

  const videoUrl = data.signedUrl;

  // 5. Render the page with the secure video URL
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

                <VideoPlayer src={videoUrl} />
                
                <div className="prose prose-lg max-w-none text-foreground/80 mt-12 bg-background p-8 rounded-lg">
                    <h2 className="font-headline">Course Description</h2>
                    <p>{course.longDescription}</p>
                </div>
            </div>
        </div>
    </div>
  );
}
