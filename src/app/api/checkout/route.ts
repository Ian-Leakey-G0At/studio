
import { NextResponse } from 'next/server';
import IntaSend from 'intasend-node';
import { v4 as uuidv4 } from 'uuid';
import { getAuthenticatedUser } from '@/lib/firebase/auth';
import { getCourse } from '@/actions/courses';

export async function POST(request: Request) {
    const user = await getAuthenticatedUser();
    if (!user) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    const { courseId } = body;

    if (!courseId) {
        return NextResponse.json({ error: 'courseId is required' }, { status: 400 });
    }

    const course = await getCourse(courseId);
    if (!course) {
        return NextResponse.json({ error: 'Course not found' }, { status: 404 });
    }

    const publishableKey = process.env.INTASEND_PUBLISHABLE_KEY;
    const secretKey = process.env.INTASEND_API_SECRET;

    if (!publishableKey || !secretKey) {
        console.error("IntaSend API keys are not configured.");
        return NextResponse.json({ error: 'Payment gateway is not configured.' }, { status: 500 });
    }

    const intasend = new IntaSend({
        publishableKey,
        secretKey,
        test: process.env.NODE_ENV !== 'production', 
    });

    const host = request.headers.get('host');
    const protocol = host?.includes('localhost') ? 'http' : 'https';
    const redirectUrl = `${protocol}://${host}/courses/${courseId}?purchase=success`;
    const transactionId = uuidv4();

    try {
        const response = await intasend.checkout.create({
            amount: course.price, 
            currency: 'KES',
            email: user.email || 'customer@example.com', // Fallback email if not available
            // IntaSend requires first_name and last_name, but we can use placeholders if not available
            first_name: user.name?.split(' ')[0] || 'Customer',
            last_name: user.name?.split(' ')[1] || 'Name',
            host: redirectUrl, 
            api_ref: transactionId,
            meta: {
                user_id: user.uid,
                course_id: courseId,
            },
        });

        return NextResponse.json(response);

    } catch (error: any) {
        console.error('Error creating IntaSend checkout session:', error.message || error);
        return NextResponse.json({ error: 'Failed to create payment session.' }, { status: 500 });
    }
}
