
import type { Metadata, Viewport } from 'next';
import './globals.css';
import { Toaster } from '@/components/ui/toaster';
import { AuthProvider } from '@/hooks/use-auth';
import { cn } from '@/lib/utils';

export const metadata: Metadata = {
  title: 'Revenge Money Academy - Glassmorphism Financial Education',
  description: 'Transform your financial future with our revolutionary glassmorphism-styled financial education platform.',
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
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700&family=Inter:wght@300;400;500;600;700&display=swap"
          rel="stylesheet"
        />
        <link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined" rel="stylesheet" />
      </head>
      <body
        className={cn(
          'font-body antialiased text-white',
          'min-h-screen'
        )}
        style={{ 
          background: '#212121',
          fontFamily: 'Inter, system-ui, -apple-system, sans-serif'
        }}
      >
        <AuthProvider>
          <div className="relative flex min-h-screen w-full flex-col overflow-x-hidden">
            <main className="flex-grow mobile-content-spacing">{children}</main>
          </div>
          <Toaster />
        </AuthProvider>
      </body>
    </html>
  );
}
