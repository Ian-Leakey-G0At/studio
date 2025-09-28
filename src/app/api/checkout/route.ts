
import { NextResponse } from 'next/server';
import IntaSend from 'intasend-node';
import { v4 as uuidv4 } from 'uuid';

export async function POST(request: Request) {
    const body = await request.json();
    const { amount, email, firstName, lastName, courseId, userId } = body;

    // Validate environment variables
    const publishableKey = process.env.INTASEND_PUBLISHABLE_KEY;
    const secretKey = process.env.INTASEND_API_SECRET;

    if (!publishableKey || !secretKey) {
        console.error("IntaSend API keys are not configured.");
        return NextResponse.json({ error: 'Payment gateway is not configured.' }, { status: 500 });
    }

    const intasend = new IntaSend({
        publishableKey,
        secretKey,
        test: false, // Set to false for live environment
    });

    const host = request.headers.get('host');
    const protocol = host?.includes('localhost') ? 'http' : 'https';
    const redirectUrl = `${protocol}://${host}/courses`; // Redirect to courses page after payment
    const transactionId = uuidv4();

    try {
        const response = await intasend.checkout.create({
            amount: Number(amount), // Ensure amount is a number
            currency: 'KES',
            email,
            first_name: firstName,
            last_name: lastName,
            method: 'mpesa-stk-push',
            host: redirectUrl, 
            api_ref: transactionId, // Unique reference for the transaction
            meta: {
                user_id: userId,
                course_id: courseId,
            },
        });

        return NextResponse.json(response);

    } catch (error: any) {
        console.error('Error creating IntaSend checkout session:', error.message || error);
        return NextResponse.json({ error: 'Failed to create payment session.' }, { status: 500 });
    }
}
