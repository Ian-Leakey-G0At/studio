
import { AuthForm } from "@/components/auth/auth-form";
import Link from "next/link";
import { Suspense } from "react";

function LoginPageContent() {
    return (
        <>
            <AuthForm mode="login" />
            <p className="mt-10 text-center text-sm text-muted-foreground">
                Don't have an account?{" "}
                <Link
                href="/signup"
                className="font-medium leading-6 text-primary hover:underline"
                >
                Sign up
                </Link>
            </p>
        </>
    )
}

export default function LoginPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <LoginPageContent />
    </Suspense>
  );
}
