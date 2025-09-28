
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
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Terminal } from "lucide-react";
import { doc, updateDoc, arrayUnion, setDoc, getDoc, serverTimestamp } from "firebase/firestore";
import type { UserProfile } from "@/lib/types";
import { cn } from "@/lib/utils";

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
        role: 'user',
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
    <svg className="h-6 w-6" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M22.56,12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26,1.37-1.04,2.53-2.21,3.31v2.77h3.57c2.08-1.92,3.28-4.74,3.28-8.09Z" fill="#4285F4"></path><path d="M12,23c2.97,0,5.46-.98,7.28-2.66l-3.57-2.77c-.98.66-2.23,1.06-3.71,1.06-2.86,0-5.29-1.93-6.16-4.53H2.18v2.84C3.99,20.53,7.7,23,12,23Z" fill="#34A853"></path><path d="M5.84,14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43,.35-2.09V7.07H2.18C1.43,8.55,1,10.22,1,12s.43,3.45,1.18,4.93l3.66-2.84Z" fill="#FBBC05"></path><path d="M12,5.16c1.61,0,3.09,.55,4.25,1.66l3.15-3.15C17.45,1.99,14.97,1,12,1,7.7,1,3.99,3.47,2.18,7.07l3.66,2.84c.87-2.6,3.3-4.53,6.16-4.53Z" fill="#EA4335"></path></svg>
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
                  <FormControl>
                    <Input placeholder="Full Name" {...field} />
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
                <FormControl>
                  <Input placeholder="Email" {...field} />
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
                <FormControl>
                  <Input type="password" placeholder="Password" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="pt-4">
            <Button type="submit" className="w-full bg-accent hover:bg-accent/90 text-accent-foreground shadow-lg shadow-accent/20" disabled={isLoading} size="lg">
              {isLoading ? "Loading..." : mode === "login" ? "Log In" : "Sign Up"}
            </Button>
          </div>
        </form>
      </Form>
      
      <div className="relative flex py-5 items-center">
        <div className="flex-grow border-t border-input"></div>
        <span className="flex-shrink mx-4 text-muted text-sm">OR</span>
        <div className="flex-grow border-t border-input"></div>
      </div>

      <Button
        variant="secondary"
        className="w-full bg-input text-foreground font-bold hover:bg-input/80"
        onClick={handleGoogleSignIn}
        disabled={isLoading}
        size="lg"
      >
        <GoogleIcon />
        Continue with Google
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
