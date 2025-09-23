
import { AuthForm } from "@/components/auth/auth-form";
import Link from "next/link";
import { Suspense } from "react";

function SignupPageContent() {
    return (
        <>
            <AuthForm mode="signup" />
            <p className="mt-8 text-center text-sm text-muted-foreground">
                Already a member?{" "}
                <Link
                href="/login"
                className="font-semibold leading-6 text-primary hover:text-primary/80"
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

