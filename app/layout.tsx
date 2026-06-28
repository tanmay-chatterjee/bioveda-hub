import type { Metadata } from 'next';
import { Inter, Playfair_Display } from 'next/font/google';
import './globals.css';
import { baseMetadata } from '@/lib/seo';
import { MotionProvider } from '@/components/providers/MotionProvider';
import { ModalProvider } from '@/components/providers/ModalContext';
import { ToastProvider } from '@/components/ui/Toast';
import { Navigation } from '@/components/layout/Navigation';
import { Footer } from '@/components/layout/Footer';
import { FloatingEnquiryCTA } from '@/components/layout/FloatingEnquiryCTA';
import { EnquiryModal } from '@/components/ui/EnquiryModal';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair',
  display: 'swap',
});

export const metadata: Metadata = baseMetadata;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`dark ${inter.variable} ${playfair.variable}`}>
      <body className="bg-surface text-text antialiased">
        <MotionProvider>
          <ToastProvider>
            <ModalProvider>
              <Navigation />
              <main>{children}</main>
              <Footer />
              <FloatingEnquiryCTA />
              <EnquiryModal />
            </ModalProvider>
          </ToastProvider>
        </MotionProvider>
      </body>
    </html>
  );
}
