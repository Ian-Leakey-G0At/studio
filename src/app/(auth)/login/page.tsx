
import { AuthForm } from "@/components/auth/auth-form";
import Link from "next/link";
import { Suspense } from "react";

function LoginPageContent() {
    return (
        <>
            <AuthForm mode="login" />
            <p className="mt-8 text-center text-sm text-muted-foreground">
                Not a member?{" "}
                <Link
                href="/signup"
                className="font-semibold leading-6 text-primary hover:text-primary/80"
                >
                Sign up now
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
