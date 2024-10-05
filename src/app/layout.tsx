import { Inter } from 'next/font/google';
import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Home | Link in bio',
  description: 'A link in bio app created using next js',
};

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en' className={inter.className}>
      <body className={`antialiased bg-black text-white`}>{children}</body>
    </html>
  );
}
