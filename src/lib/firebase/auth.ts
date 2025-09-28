
import { auth } from 'firebase-admin';
import { cookies } from 'next/headers';
import { getDb } from './adminApp';

export async function getAuthenticatedUser() {
  const sessionCookie = cookies().get('__session')?.value;

  if (!sessionCookie) {
    return null;
  }

  try {
    return await auth().verifySessionCookie(sessionCookie, true /** checkRevoked */);
  } catch (error) {
    console.error('Error verifying session cookie:', error);
    return null;
  }
}

export async function getAdminUser() {
    const user = await getAuthenticatedUser();
    if (!user) {
        return null;
    }

    try {
        const db = getDb();
        const userDoc = await db.collection('users').doc(user.uid).get();

        if (userDoc.exists && userDoc.data()?.role === 'admin') {
            return user;
        }
        return null; // Not an admin
    } catch (error) {
        console.error('Error getting user role:', error);
        return null;
    }
}
