import { Coins } from "lucide-react";
import Link from "next/link";

export function Footer() {
  return (
    <footer className="w-full border-t border-border/50 bg-background/50">
      <div className="container py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="flex flex-col items-start space-y-4">
            <Link href="/" className="flex items-center space-x-2">
              <Coins className="h-7 w-7 text-primary" />
              <span className="text-xl font-black">Revenge Money</span>
            </Link>
            <p className="text-sm text-text-secondary">
              Actionable financial education for taking control of your financial destiny.
            </p>
          </div>
          <div className="md:col-start-3 grid grid-cols-2 gap-8">
            <div>
              <h4 className="font-bold mb-3">Platform</h4>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link href="/courses" className="text-text-secondary hover:text-text-primary">Courses</Link>
                </li>
                <li>
                  <Link href="/about" className="text-text-secondary hover:text-text-primary">About Us</Link>
                </li>
                 <li>
                  <Link href="/contact" className="text-text-secondary hover:text-text-primary">Contact</Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-3">Legal</h4>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link href="/terms" className="text-text-secondary hover:text-text-primary">Terms of Service</Link>
                </li>
                <li>
                  <Link href="/privacy" className="text-text-secondary hover:text-text-primary">Privacy Policy</Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className="mt-8 border-t border-border/50 pt-8 flex flex-col md:flex-row justify-between items-center text-sm text-text-secondary">
          <p>&copy; {new Date().getFullYear()} Revenge Money Academy. All rights reserved.</p>
          <p className="mt-4 md:mt-0">A demonstration app built in Firebase Studio.</p>
        </div>
      </div>
    </footer>
  );
}
