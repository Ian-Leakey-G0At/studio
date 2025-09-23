
"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
  updateProfile,
} from "firebase/auth";
import { auth, db } from "@/lib/firebase/clientApp";
import { useRouter, useSearchParams } from "next/navigation";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Terminal } from "lucide-react";
import { doc, updateDoc, arrayUnion, setDoc, getDoc, serverTimestamp } from "firebase/firestore";
import type { UserProfile } from "@/lib/types";

const loginSchema = z.object({
  email: z.string().email({ message: "Invalid email address." }),
  password: z
    .string()
    .min(6, { message: "Password must be at least 6 characters." }),
});

const signupSchema = z.object({
  displayName: z.string().min(2, { message: "Name is too short." }).max(50, { message: "Name is too long." }),
  email: z.string().email({ message: "Invalid email address." }),
  password: z
    .string()
    .min(6, { message: "Password must be at least 6 characters." }),
});

type AuthFormProps = {
  mode: "login" | "signup";
};

export function AuthForm({ mode }: AuthFormProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectTo = searchParams.get('redirect_to') || '/account';
  const courseId = searchParams.get('courseId');

  const formSchema = mode === "login" ? loginSchema : signupSchema;
  type FormData = z.infer<typeof formSchema>;

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues:
      mode === "signup"
        ? { displayName: "", email: "", password: "" }
        : { email: "", password: "" },
  });

  const getOrCreateUserProfile = async (user: any) => {
    const userRef = doc(db, "users", user.uid);
    const userSnap = await getDoc(userRef);

    if (!userSnap.exists()) {
      const newUserProfile: UserProfile = {
        uid: user.uid,
        email: user.email,
        displayName: user.displayName,
        photoURL: user.photoURL,
        purchasedCourses: [],
      };
      await setDoc(userRef, { ...newUserProfile, createdAt: serverTimestamp() });
    }
  }

  const updatePurchasedCourses = async (userId: string) => {
    if (courseId) {
      const userRef = doc(db, "users", userId);
      await updateDoc(userRef, {
        purchasedCourses: arrayUnion(courseId),
      }, { merge: true });
    }
  };

  const onSubmit = async (data: FormData) => {
    setIsLoading(true);
    setError(null);
    try {
      let user;
      if (mode === "signup") {
        const { displayName, email, password } = data as z.infer<typeof signupSchema>;
        const userCredential = await createUserWithEmailAndPassword(
          auth,
          email,
          password
        );
        await updateProfile(userCredential.user, { displayName });
        await getOrCreateUserProfile(userCredential.user);
        user = userCredential.user;
      } else {
        const { email, password } = data as z.infer<typeof loginSchema>;
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        user = userCredential.user;
      }
      
      const idToken = await user.getIdToken();
      await fetch('/api/auth/sessionLogin', {
        method: 'POST',
        headers: { Authorization: `Bearer ${idToken}` },
      });

      await updatePurchasedCourses(user.uid);
      
      router.push(courseId ? `/learn/${courseId}` : redirectTo);
      router.refresh();


    } catch (e: any) {
      setError(e.message.replace('Firebase: ', '').replace(`(${e.code})`, ''));
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);
      await getOrCreateUserProfile(result.user);

      const idToken = await result.user.getIdToken();
      await fetch('/api/auth/sessionLogin', {
          method: 'POST',
          headers: { Authorization: `Bearer ${idToken}` },
      });

      await updatePurchasedCourses(result.user.uid);
      
      router.push(courseId ? `/learn/${courseId}` : redirectTo);
      router.refresh();

    } catch (e: any) {
      setError(e.message.replace('Firebase: ', '').replace(`(${e.code})`, ''));
    } finally {
      setIsLoading(false);
    }
  };
  
  const GoogleIcon = () => (
    <svg className="mr-2 h-4 w-4" viewBox="0 0 48 48">
        <path fill="#FFC107" d="M43.611 20.083H42V20H24v8h11.303c-1.649 4.657-6.08 8-11.303 8c-6.627 0-12-5.373-12-12s5.373-12 12-12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.268 4 24 4C12.955 4 4 12.955 4 24s8.955 20 20 20s20-8.955 20-20c0-1.341-.138-2.65-.389-3.917z"></path>
        <path fill="#FF3D00" d="M6.306 14.691l6.571 4.819C14.655 15.108 18.961 12 24 12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.268 4 24 4C16.318 4 9.656 8.337 6.306 14.691z"></path>
        <path fill="#4CAF50" d="M24 44c5.166 0 9.86-1.977 13.409-5.192l-6.19-5.238C29.211 35.091 26.715 36 24 36c-5.202 0-9.619-3.317-11.283-7.946l-6.522 5.025C9.505 39.556 16.227 44 24 44z"></path>
        <path fill="#1976D2" d="M43.611 20.083H42V20H24v8h11.303c-.792 2.237-2.231 4.166-4.087 5.571l6.19 5.238C42.021 35.596 44 30.134 44 24c0-1.341-.138-2.65-.389-3.917z"></path>
    </svg>
  );

  return (
    <div className="w-full max-w-sm">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          {mode === "signup" && (
            <FormField
              control={form.control}
              name="displayName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Full Name</FormLabel>
                  <FormControl>
                    <Input placeholder="John Doe" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          )}
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input placeholder="email@example.com" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input type="password" placeholder="••••••••" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" className="w-full" disabled={isLoading} size="lg">
            {isLoading ? "Loading..." : mode === "login" ? "Log In" : "Sign Up"}
          </Button>
        </form>
      </Form>
      <Separator className="my-6 bg-border" />
      <Button
        variant="secondary"
        className="w-full"
        onClick={handleGoogleSignIn}
        disabled={isLoading}
        size="lg"
      >
        <GoogleIcon />
        Sign in with Google
      </Button>

      {error && (
        <Alert variant="destructive" className="mt-6">
          <Terminal className="h-4 w-4" />
          <AlertTitle>Authentication Error</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}
    </div>
  );
}
