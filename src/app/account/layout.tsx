
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Cog, ChevronLeft } from "lucide-react";
import { UserNav } from "@/components/auth/user-nav";
import { useRouter } from "next/navigation";
import { Header } from "@/components/header";

export default function AccountLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="container mx-auto px-4 md:px-6 py-4">
        <div className="flex justify-between items-center mb-6">
            <Button asChild variant="ghost" size="icon">
                <Link href="/">
                    <ChevronLeft className="h-6 w-6" />
                </Link>
            </Button>
            <h1 className="text-2xl font-headline font-bold">Account</h1>
            <Button asChild variant="ghost" size="icon">
                <Link href="/account/settings">
                    <Cog className="h-6 w-6" />
                    <span className="sr-only">Settings</span>
                </Link>
            </Button>
        </div>
        {children}
    </div>
  );
}
