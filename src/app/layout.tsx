import './globals.css';
import type { Metadata } from 'next';
import { Inter, VT323, Montserrat } from 'next/font/google';
import { PageTransition } from '@/components/ui/PageTransition';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

const inter = Inter({ subsets: ['latin'] });
const vt323 = VT323({ 
  weight: '400',
  subsets: ['latin'],
  variable: '--font-vt323',
});
const montserrat = Montserrat({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-montserrat',
});

export const metadata: Metadata = {
  title: 'Luke Eddy - Web Developer & Designer',
  description: 'Web developer and designer specializing in creating beautiful, functional websites and web applications.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} ${vt323.variable} ${montserrat.variable}`} suppressHydrationWarning>
        <PageTransition>
          <div className="flex flex-col min-h-screen">
            <Header />
            <main className="flex-grow">{children}</main>
            <Footer />
          </div>
        </PageTransition>
      </body>
    </html>
  );
}
