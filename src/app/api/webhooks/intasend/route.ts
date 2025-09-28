
import { NextResponse } from 'next/server';
import { headers } from 'next/headers';
import admin from '@/lib/firebase/adminApp';


// TODO: Move this to a utils file and import
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
        console.log('Received successful payment event:', event.data);

        const { meta, invoice } = event.data;
        const { user_id, course_id } = meta;
        const { tracking_id } = invoice;

        if (!user_id || !course_id) {
            console.error('Missing user_id or course_id in webhook metadata');
            return NextResponse.json({ error: 'Missing metadata' }, { status: 400 });
        }

        try {
            const firestore = admin.firestore();
            const userRef = firestore.collection('users').doc(user_id);

            // Use a transaction to ensure atomicity
            await firestore.runTransaction(async (transaction) => {
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
                    console.log(`Course ${course_id} added to user ${user_id}.`);
                }
            });

            // Optionally, save the transaction details for auditing
            const paymentRef = firestore.collection('payments').doc(tracking_id);
            await paymentRef.set({
                userId: user_id,
                courseId: course_id,
                status: event.data.state,
                amount: event.data.amount,
                currency: event.data.currency,
                createdAt: new Date(),
            });

        } catch (error: any) {
            console.error('Error updating user courses in Firestore:', error.message);
            return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
        }
    }

    // Acknowledge receipt of the webhook
    return NextResponse.json({ status: 'success' });
}
