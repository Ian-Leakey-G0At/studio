
import { NextResponse } from 'next/server';
import { headers } from 'next/headers';
import { getDb } from '@/lib/firebase/adminApp';

function verifyIntaSendSignature(payload: string, signature: string, secret: string): boolean {
    const crypto = require('crypto');
    const hmac = crypto.createHmac('sha256', secret);
    hmac.update(payload);
    const generatedSignature = hmac.digest('hex');
    return generatedSignature === signature;
}

export async function POST(request: Request) {
    const body = await request.text();
    const signature = headers().get('x-intasend-signature');
    const webhookSecret = process.env.INTASEND_WEBHOOK_SECRET;

    if (!webhookSecret) {
        console.error('IntaSend webhook secret is not configured.');
        return NextResponse.json({ error: 'Webhook service is not configured.' }, { status: 500 });
    }

    if (!signature || !verifyIntaSendSignature(body, signature, webhookSecret)) {
        console.warn('Received a request with an invalid signature.');
        return NextResponse.json({ error: 'Invalid signature' }, { status: 401 });
    }

    const event = JSON.parse(body);

    if (event.type === 'payment.succeeded') {
        const { meta, invoice } = event.data;
        const { user_id, course_id } = meta;
        const { tracking_id } = invoice;

        if (!user_id || !course_id || !tracking_id) {
            console.error('Missing user_id, course_id, or tracking_id in webhook payload');
            return NextResponse.json({ error: 'Missing required metadata' }, { status: 400 });
        }

        try {
            const db = getDb();
            const paymentRef = db.collection('payments').doc(tracking_id);
            const userRef = db.collection('users').doc(user_id);

            const paymentDoc = await paymentRef.get();
            if (paymentDoc.exists) {
                console.log(`Webhook event for tracking_id: ${tracking_id} already processed.`);
                return NextResponse.json({ status: 'success', message: 'Already processed' });
            }

            await db.runTransaction(async (transaction) => {
                const userDoc = await transaction.get(userRef);
                if (!userDoc.exists) {
                    throw new Error(`User with ID ${user_id} not found.`);
                }

                const userData = userDoc.data();
                const purchasedCourses = userData?.purchasedCourses || [];

                if (!purchasedCourses.includes(course_id)) {
                    transaction.update(userRef, {
                        purchasedCourses: [...purchasedCourses, course_id],
                    });
                } else {
                    console.log(`User ${user_id} already owns course ${course_id}. No update needed.`)
                }
            });

            await paymentRef.set({
                userId: user_id,
                courseId: course_id,
                status: event.data.state,
                amount: event.data.amount,
                currency: event.data.currency,
                createdAt: new Date(),
            });

            console.log(`Successfully processed payment for user ${user_id} and course ${course_id}.`);

        } catch (error: any) {
            console.error('Error processing webhook:', error.message);
            return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
        }
    }

    return NextResponse.json({ status: 'success' });
}
