import { AuthForm } from "@/components/auth/auth-form";
import Link from "next/link";

export default function LoginPage() {
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
  );
}
