
import { auth } from 'firebase-admin';
import { cookies } from 'next/headers';
import { initAdminApp } from './firebase-admin'; // We will create this file next

/**
 * Gets the authenticated user from the session cookie.
 * This is a server-side utility.
 * @returns The decoded user token or null if not authenticated.
 */
export async function getAuthenticatedUser() {
  await initAdminApp(); // Ensure the admin app is initialized
  const sessionCookie = cookies().get('__session')?.value;

  if (!sessionCookie) {
    return null;
  }

  try {
    // Verify the session cookie. In this case an additional check is added to detect
    // if the user's Firebase session was revoked, user deleted/disabled, etc.
    const decodedIdToken = await auth().verifySessionCookie(sessionCookie, true /** checkRevoked */);
    return decodedIdToken;
  } catch (error) {
    console.error('Error verifying session cookie:', error);
    return null;
  }
}
