import type { Metadata } from 'next';
import { Inter, Montserrat } from 'next/font/google';
import './globals.css';
import { Toaster } from '@/components/ui/toaster';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { AuthProvider } from '@/hooks/use-auth';

const inter = Inter({ 
  subsets: ['latin'], 
  variable: '--font-inter',
  weights: ['400', '500'],
});
const montserrat = Montserrat({
  subsets: ['latin'],
  variable: '--font-montserrat',
  weights: ['600', '700'],
});

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
        className={`${inter.variable} ${montserrat.variable} font-body antialiased`}
      >
        <AuthProvider>
          <div className="flex min-h-screen flex-col bg-gradient-to-r from-[#1A1A1A] to-[#2C1F2F]">
            <Header />
            <main className="flex-1">{children}</main>
            <Footer />
          </div>
          <Toaster />
        </AuthProvider>
      </body>
    </html>
  );
}
