
import type { Course } from "@/lib/types";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import Link from "next/link";

type CoursesTableProps = {
  courses: Course[];
};

export function CoursesTable({ courses }: CoursesTableProps) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Title</TableHead>
          <TableHead>Price</TableHead>
          <TableHead>Category</TableHead>
          <TableHead>Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {courses.map(course => (
          <TableRow key={course.id}>
            <TableCell>{course.title}</TableCell>
            <TableCell>${course.price}</TableCell>
            <TableCell>{course.category}</TableCell>
            <TableCell>
              <Button asChild>
                <Link href={`/admin/courses/${course.id}/edit`}>Edit</Link>
              </Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
