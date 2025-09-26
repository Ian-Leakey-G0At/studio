
import { AuthForm } from "@/components/auth/auth-form";
import Link from "next/link";
import { Suspense } from "react";

function SignupPageContent() {
    return (
        <>
            <AuthForm mode="signup" />
            <p className="mt-10 text-center text-sm text-muted-foreground">
                Already have an account?{" "}
                <Link
                href="/login"
                className="font-medium leading-6 text-primary hover:underline"
                >
                Log in
                </Link>
            </p>
        </>
    )
}

export default function SignupPage() {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <SignupPageContent />
        </Suspense>
    );
}
