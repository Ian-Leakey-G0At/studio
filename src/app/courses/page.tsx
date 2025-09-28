
import { CourseCard } from "@/components/course-card";
import { getDb } from "@/lib/firebase/adminApp";
import type { Course } from "@/lib/types";

async function getCourses(): Promise<Course[]> {
    const db = getDb();
    const coursesSnapshot = await db.collection('courses').get();
    const courses: Course[] = [];
    coursesSnapshot.forEach(doc => {
        courses.push({ id: doc.id, ...doc.data() } as Course);
    });
    return courses;
}

export default async function CoursesPage() {
    const courses = await getCourses();

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {courses.map(course => (
                <CourseCard key={course.id} course={course} />
            ))
        }
        </div>
    );
}
