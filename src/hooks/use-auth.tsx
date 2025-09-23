
"use client";

import React, { useState, useEffect, useContext, createContext } from "react";
import { onAuthStateChanged, type User } from "firebase/auth";
import { auth, db } from "@/lib/firebase/clientApp";
import type { AuthContextType, UserProfile } from "@/lib/types";
import { doc, onSnapshot, setDoc, serverTimestamp, getDoc } from "firebase/firestore";
import { useRouter } from "next/navigation";

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setLoading(true);
      if (user) {
        setUser(user);
        const idToken = await user.getIdToken();
        
        // Set session cookie
        await fetch("/api/auth/sessionLogin", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${idToken}`,
          },
        });

        // Get or create user profile in Firestore
        const userRef = doc(db, "users", user.uid);
        const userSnap = await getDoc(userRef);

        if (userSnap.exists()) {
            onSnapshot(userRef, (snapshot) => {
                setUserProfile(snapshot.data() as UserProfile);
            });
        } else {
            const newUserProfile: UserProfile = {
              uid: user.uid,
              email: user.email,
              displayName: user.displayName,
              photoURL: user.photoURL,
              purchasedCourses: [],
            };
            await setDoc(userRef, { ...newUserProfile, createdAt: serverTimestamp() });
            setUserProfile(newUserProfile);
        }
        
      } else {
        setUser(null);
        setUserProfile(null);
        // Clear session cookie
        await fetch("/api/auth/sessionLogout", { method: "POST" });
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, [router]);

  return (
    <AuthContext.Provider value={{ user, userProfile, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
