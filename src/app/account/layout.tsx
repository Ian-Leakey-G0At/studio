
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Cog } from "lucide-react";

export default function AccountLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="container mx-auto px-4 md:px-6 py-12">
        <div className="flex justify-between items-center space-y-2 mb-10">
            <div>
                <h1 className="text-4xl font-bold font-headline">My Account</h1>
                <p className="text-muted-foreground">Welcome back! Here are your courses and tools.</p>
            </div>
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
