
import { redirect } from 'next/navigation';
import { getAdminUser } from '@/lib/firebase/auth';
import { getAllCourses } from "@/actions/courses";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { CoursesTable } from './_components/courses-table';

export default async function AdminCoursesPage() {
    const admin = await getAdminUser();
    if (!admin) {
        redirect('/');
    }
    
    const courses = await getAllCourses();

    return (
        <div className="container mx-auto py-10">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-3xl font-bold">Manage Courses</h1>
                <Button asChild>
                    <Link href="/admin/courses/new">Create New Course</Link>
                </Button>
            </div>
            <CoursesTable courses={courses} />
        </div>
    );
}
