
'use server';

import { revalidatePath } from 'next/cache';
import { z } from 'zod';
import { getDb } from '@/lib/firebase/adminApp';
import type { Course } from '@/lib/types';
import { cache } from 'react';

const courseSchema = z.object({
    title: z.string().min(1, 'Title is required'),
    description: z.string().min(1, 'Description is required'),
    longDescription: z.string().min(1, 'Long description is required'),
    duration: z.string().min(1, 'Duration is required'),
    price: z.coerce.number().min(0, 'Price must be a positive number'),
    category: z.enum(['Investing', 'Debt', 'Budgeting']),
    format: z.enum(['Video', 'Text']),
    imageId: z.string().min(1, 'Image ID is required'),
});

export const getCourse = cache(async (id: string): Promise<Course | null> => {
    const db = getDb();
    const courseDoc = await db.collection('courses').doc(id).get();
    if (!courseDoc.exists) {
        return null;
    }
    return { id: courseDoc.id, ...courseDoc.data() } as Course;
});

export const getAllCourses = cache(async (): Promise<Course[]> => {
    const db = getDb();
    const coursesSnapshot = await db.collection('courses').get();
    if (coursesSnapshot.empty) {
        return [];
    }
    return coursesSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Course));
});

export async function createCourse(values: z.infer<typeof courseSchema>) {
    const validatedFields = courseSchema.safeParse(values);

    if (!validatedFields.success) {
        throw new Error('Invalid course data');
    }

    const db = getDb();
    await db.collection('courses').add(validatedFields.data);

    revalidatePath('/admin/courses');
    revalidatePath('/courses');
}

export async function updateCourse(course: Course) {
    const validatedFields = courseSchema.safeParse(course);

    if (!validatedFields.success) {
        throw new Error('Invalid course data');
    }

    const db = getDb();
    await db.collection('courses').doc(course.id).update(validatedFields.data);

    revalidatePath('/admin/courses');
    revalidatePath('/courses');
    revalidatePath(`/courses/${course.id}`);
}

export async function getCourseById(id: string): Promise<Course | null> {
    const db = getDb();
    const courseDoc = await db.collection('courses').doc(id).get();
    if (!courseDoc.exists) {
        return null;
    }
    return { id: courseDoc.id, ...courseDoc.data() } as Course;
}
