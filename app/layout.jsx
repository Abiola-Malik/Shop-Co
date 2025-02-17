import Footer from '@/components/Footer';
import './globals.css';
import Navbar from '@/components/Navbar';

import { Poppins } from 'next/font/google';
import { Toaster } from 'sonner';
const poppins = Poppins({
  subsets: ['latin'],
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
  variable: '--font-poppins',
});

export const metadata = {
  title: 'Shop Co',
  description:
    'Shop Co - Your premier destination for modern fashion and lifestyle products. Discover curated collections of clothing, accessories, and more.',
  keywords:
    'shop, fashion, clothing, accessories, online store, retail, lifestyle',
  openGraph: {
    title: 'Shop Co',
    description:
      'Your premier destination for modern fashion and lifestyle products',
    type: 'website',
    locale: 'en_US',
    url: 'https://shopco.com',
    siteName: 'Shop Co',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Shop Co',
    description:
      'Your premier destination for modern fashion and lifestyle products',
  },
  robots: {
    index: true,
    follow: true,
  },
  viewport: 'width=device-width, initial-scale=1',
  themeColor: '#ffffff',
};
export default function RootLayout({ children }) {
  return (
    <html lang='en' className='scroll-smooth'>
      <body className={`${[poppins].variable}  antialiased`}>
        <main className='container mx-auto '>
          <header className='w-full h-20'>
            <Navbar />
          </header>
          {children}
        </main>
        <Toaster />
        <Footer />
      </body>
    </html>
  );
}
