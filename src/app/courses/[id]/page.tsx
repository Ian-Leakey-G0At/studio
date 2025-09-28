
import { getAllCourses, getCourse } from "@/actions/courses";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import type { Course } from "@/lib/types";
import { notFound } from 'next/navigation';
import { CheckCircle } from "lucide-react";
import { ResponsiveImage } from "@/components/responsive-image";

export async function generateStaticParams() {
    const courses = await getAllCourses();
    return courses.map((course) => ({
        id: course.id,
    }));
}

export default async function CourseDetailsPage({ 
    params, 
    searchParams 
}: { 
    params: { id: string },
    searchParams: { [key: string]: string | string[] | undefined }
}) {
    const course = await getCourse(params.id);

    if (!course) {
        notFound();
    }

    const purchaseSuccess = searchParams.purchase === 'success';

    return (
        <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto py-12 px-4">
            <div className="flex flex-col gap-4">
                {purchaseSuccess && (
                    <Alert variant="default" className="mb-4 bg-green-100 dark:bg-green-900/20">
                        <CheckCircle className="h-4 w-4" />
                        <AlertTitle>Purchase Successful!</AlertTitle>
                        <AlertDescription>
                            You now have access to this course. Enjoy your learning!
                        </AlertDescription>
                    </Alert>
                )}
                <div className="flex justify-center items-start">
                    <ResponsiveImage 
                        src={course.image} 
                        alt={course.title} 
                        width={500} 
                        height={500} 
                        className="rounded-lg shadow-lg"
                        priority
                    />
                </div>
            </div>
            <div className="flex flex-col gap-6">
                <h1 className="text-4xl font-bold">{course.title}</h1>
                <p className="text-lg text-muted-foreground">{course.description}</p>
                <div className="text-lg font-semibold">${course.price}</div>
                <Button size="lg">Purchase Course</Button>
                <div className="mt-6 space-y-4">
                    <h2 className="text-2xl font-semibold">About this course</h2>
                    <p className="text-muted-foreground">{course.longDescription}</p>
                    <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                            <span className="font-semibold">Duration:</span> {course.duration}
                        </div>
                        <div>
                            <span className="font-semibold">Category:</span> {course.category}
                        </div>
                        <div>
                            <span className="font-semibold">Format:</span> {course.format}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
