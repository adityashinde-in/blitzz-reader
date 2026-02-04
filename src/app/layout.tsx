import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { ReaderProvider } from '@/context/ReaderContext';
import Navbar from '@/components/Navbar';

const inter = Inter({ subsets: ['latin'], variable: '--font-sans' });

export const metadata: Metadata = {
  title: 'Reading But Better',
  description: 'Speed read any book with RSVP and reading modes.',
  icons: {
    icon: '/assets/favicon.ico',
    apple: '/assets/apple-touch-icon.png',
    shortcut: '/assets/favicon-32x32.png',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.variable}>
        <ReaderProvider>
          <Navbar />
          {children}
        </ReaderProvider>
      </body>
    </html>
  );
}
