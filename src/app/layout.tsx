
import type { Metadata } from 'next';
import './globals.css';
import { Toaster } from '@/components/ui/toaster';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { AuthProvider } from '@/hooks/use-auth';
import { cn } from '@/lib/utils';

export const metadata: Metadata = {
  title: 'Revenge Money Academy',
  description: 'Actionable financial education for taking control of your financial destiny.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark" style={{ colorScheme: 'dark' }} suppressHydrationWarning>
      <body
        className={cn(
          'font-body antialiased',
          'bg-gradient-to-br from-black to-zinc-900'
        )}
      >
        <AuthProvider>
          <div className="flex min-h-screen flex-col">
            <Header />
            <main className="flex-1 container">{children}</main>
            <Footer />
          </div>
          <Toaster />
        </AuthProvider>
      </body>
    </html>
  );
}
