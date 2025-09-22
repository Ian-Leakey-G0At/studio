import type { User as FirebaseUser } from 'firebase/auth';

export interface Course {
  id: string;
  title: string;
  description: string;
  longDescription: string;
  duration: string;
  price: number;
  category: 'Investing' | 'Debt' | 'Budgeting';
  format: 'Video' | 'Text';
  imageId: string;
}

export interface UserProfile {
  uid: string;
  email: string | null;
  displayName: string | null;
  photoURL: string | null;
  purchasedCourses?: string[];
}

export type AuthContextType = {
  user: FirebaseUser | null;
  userProfile: UserProfile | null;
  loading: boolean;
};
