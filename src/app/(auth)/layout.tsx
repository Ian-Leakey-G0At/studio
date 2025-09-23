
import Link from "next/link";
import { Coins } from "lucide-react";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-full flex-1 flex-col justify-center items-center px-6 py-12 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <Link href="/" className="flex items-center justify-center space-x-2">
            <Coins className="h-8 w-8 text-primary" />
            <span className="text-2xl font-bold font-headline">Revenge Money</span>
        </Link>
        <h2 className="mt-6 text-center text-2xl font-bold font-headline leading-9 tracking-tight text-foreground">
          Welcome to the Academy
        </h2>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <div className="charcoal-glass-card p-8">
            {children}
        </div>
      </div>
    </div>
  );
}
