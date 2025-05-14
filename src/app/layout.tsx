import type {Metadata} from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { cn } from '@/lib/utils'; 

const inter = Inter({
  variable: '--font-inter', 
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'E-commerce',
  description: 'Detailed product page for ShopWave e-commerce platform.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" className={inter.variable} suppressHydrationWarning>
      <body
        className={cn(
          "min-h-screen bg-background font-sans antialiased"
        )}
        suppressHydrationWarning 
      >
        {children}
      </body>
    </html>
  );
}
