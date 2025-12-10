import type { Metadata } from "next";
import { Nunito_Sans, Unbounded } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import MobileHeader from "@/components/MobileHeader";
import Footer from "@/components/Footer";
import { LanguageProvider } from "@/contexts/LanguageContext";
import { CurrencyProvider } from "@/contexts/CurrencyContext";

const nunitoSans = Nunito_Sans({
  variable: "--font-nunito-sans",
  subsets: ["latin", "cyrillic"],
  weight: ["400", "600", "700"],
});

const unbounded = Unbounded({
  variable: "--font-unbounded",
  subsets: ["latin", "cyrillic"],
  weight: ["700"],
});

export const metadata: Metadata = {
  metadataBase: new URL('https://www.rentallviv.com'),
  title: {
    default: 'RentalLviv - Оренда автомобілів у Львові | Вигідна оренда авто',
    template: '%s | RentalLviv'
  },
  description: 'Оренда автомобілів у Львові за вигідними цінами. Великий вибір авто преміум та середнього класу. Оренда без застави. Доставка авто. Зручна онлайн-бронювання через Telegram.',
  keywords: ['оренда авто львів', 'оренда автомобілів львів', 'прокат авто львів', 'оренда машини львів', 'rent a car lviv', 'car rental lviv', 'автопрокат львів', 'оренда авто без застави'],
  authors: [{ name: 'RentalLviv' }],
  creator: 'RentalLviv',
  publisher: 'RentalLviv',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: 'website',
    locale: 'uk_UA',
    url: 'https://www.rentallviv.com',
    title: 'RentalLviv - Оренда автомобілів у Львові',
    description: 'Оренда автомобілів у Львові за вигідними цінами. Великий вибір авто преміум та середнього класу.',
    siteName: 'RentalLviv',
    images: [
      {
        url: '/images/hero-banner.webp',
        width: 1200,
        height: 630,
        alt: 'RentalLviv - Оренда автомобілів у Львові',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'RentalLviv - Оренда автомобілів у Львові',
    description: 'Оренда автомобілів у Львові за вигідними цінами. Великий вибір авто.',
    images: ['/images/hero-banner.webp'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    // google: 'your-google-verification-code',
    // yandex: 'your-yandex-verification-code',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="uk">
      <head>
        <link rel="preconnect" href="https://res.cloudinary.com" />
        <link rel="dns-prefetch" href="https://res.cloudinary.com" />
        <link rel="preconnect" href="https://t.me" />
        <meta name="theme-color" content="#FF4400" />
      </head>
      <body
        className={`${nunitoSans.variable} ${unbounded.variable} antialiased`}
      >
        <LanguageProvider>
          <CurrencyProvider>
            <div className="hidden lg:block">
              <Header />
            </div>
            <MobileHeader />
            <main className="pt-[35px] md:pt-[56px] lg:pt-[70px]">
              {children}
            </main>
            <Footer />
          </CurrencyProvider>
        </LanguageProvider>
      </body>
    </html>
  );
}
