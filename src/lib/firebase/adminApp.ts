import "server-only";
import * as admin from "firebase-admin";

interface FirebaseAdminApp {
  auth: admin.auth.Auth;
  db: admin.firestore.Firestore;
  storage: admin.storage.Storage;
}

let app: FirebaseAdminApp | null = null;

const serviceAccount: admin.ServiceAccount = {
  projectId: process.env.FIREBASE_PROJECT_ID!,
  clientEmail: process.env.FIREBASE_CLIENT_EMAIL!,
  privateKey: process.env.FIREBASE_PRIVATE_KEY!.replace(/\\n/g, '\n'),
};

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  });
}

const getAdminApp = (): FirebaseAdminApp => {
  if (app) return app;
  
  app = {
    auth: admin.auth(),
    db: admin.firestore(),
    storage: admin.storage(),
  };

  return app;
};

export const getAuth = () => getAdminApp().auth;
export const getDb = () => getAdminApp().db;
export const getStorage = () => getAdminApp().storage;
