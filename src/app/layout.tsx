
import type { Metadata, Viewport } from 'next';
import './globals.css';
import { Toaster } from '@/components/ui/toaster';
import { Footer } from '@/components/footer';
import { AuthProvider } from '@/hooks/use-auth';
import { cn } from '@/lib/utils';

export const metadata: Metadata = {
  title: 'Revenge Money Academy',
  description: 'Actionable financial education for taking control of your financial destiny.',
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  viewportFit: 'cover',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={cn(
          'font-body antialiased',
          'bg-background'
        )}
      >
        <AuthProvider>
          <div className="relative flex min-h-screen w-full flex-col justify-between overflow-x-hidden">
            <main className="flex-grow">{children}</main>
            <Footer />
          </div>
          <Toaster />
        </AuthProvider>
      </body>
    </html>
  );
}
