import type {Metadata} from 'next';
import { Inter } from 'next/font/google'; // Using Inter as a standard Google Font
import './globals.css';
import { cn } from '@/lib/utils'; // For conditional class names

const inter = Inter({
  variable: '--font-inter', // Updated variable name
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'ShopWave Product Showcase',
  description: 'Detailed product page for ShopWave e-commerce platform.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" suppressHydrationWarning>
      <body className={cn(
        "min-h-screen bg-background font-sans antialiased",
        inter.variable // Apply Inter font variable
      )}>
        {children}
      </body>
    </html>
  );
}
