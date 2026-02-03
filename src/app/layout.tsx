import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { ReaderProvider } from '@/context/ReaderContext';

const inter = Inter({ subsets: ['latin'], variable: '--font-sans' });

export const metadata: Metadata = {
  title: 'Reading But Better',
  description: 'Speed read any book with RSVP and reading modes.',
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
          {children}
        </ReaderProvider>
      </body>
    </html>
  );
}
