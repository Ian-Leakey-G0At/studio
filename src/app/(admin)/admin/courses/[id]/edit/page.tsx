
import { getCourseById } from "@/actions/courses";
import { notFound } from "next/navigation";
import { CourseForm } from "@/components/course-form";

type EditCoursePageProps = {
  params: {
    id: string;
  };
};

export default async function EditCoursePage({ params }: EditCoursePageProps) {
  const course = await getCourseById(params.id);

  if (!course) {
    notFound();
  }

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Edit Course</h1>
      <CourseForm course={course} />
    </div>
  );
}
