import type {Metadata} from 'next';
import { Inter } from 'next/font/google'; // Using Inter as a standard Google Font
import './globals.css';
import { cn } from '@/lib/utils'; // For conditional class names

const inter = Inter({
  variable: '--font-inter', // This will be the name of the CSS variable
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
    <html lang="pt-BR" className={inter.variable} suppressHydrationWarning> {/* Apply font variable class here */}
      <body className={cn(
        "min-h-screen bg-background font-sans antialiased" // font-sans will now use the CSS var via Tailwind config
      )}>
        {children}
      </body>
    </html>
  );
}
