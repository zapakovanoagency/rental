import type { Metadata, Viewport } from "next";
import { Nunito_Sans, Unbounded } from 'next/font/google';
import localFont from 'next/font/local';
import "./globals.css";
import Header from "@/components/Header";
import MobileHeader from "@/components/MobileHeader";
import Footer from "@/components/Footer";
import FloatingPhoneButton from "@/components/FloatingPhoneButton";
import { CurrencyProvider } from "@/contexts/CurrencyContext";
import { LanguageProvider } from "@/contexts/LanguageContext";

const nunitoSans = Nunito_Sans({
  variable: "--font-nunito-sans",
  subsets: ["latin", "cyrillic"],
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

const unbounded = Unbounded({
  variable: "--font-unbounded",
  subsets: ["latin", "cyrillic"],
  weight: ["400", "700", "800", "900"],
});



export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  themeColor: '#FF4400',
};

export const metadata: Metadata = {
  metadataBase: new URL('https://www.rentalviv.com'),
  
  // Основні метадані
  title: {
    default: 'Оренда авто Львів — середній, бізнес і преміум клас | RentalViv',
    template: '%s | RentalViv — Оренда авто Львів'
  },
  description: 'Оренда авто у Львові та трансфер. Сучасні автомобілі середнього, бізнес та преміум класу. Прозорі умови та комфортний сервіс від RentalViv. ✅ Без прихованих платежів ✅ Страховка включена',
  keywords: [
    'оренда авто Львів',
    'прокат авто Львів',
    'оренда автомобілів Львів',
    'оренда машини Львів',
    'автопрокат Львів',
    'rent a car Lviv',
    'car rental Lviv',
    'оренда авто бізнес клас',
    'оренда авто преміум клас',
    'оренда авто середній клас',
    'трансфер Львів',
    'оренда авто з водієм Львів',
    'оренда авто без застави Львів',
    'RentalViv',
    'оренда авто аеропорт Львів'
  ],
  authors: [{ name: 'RentalViv', url: 'https://www.rentalviv.com' }],
  creator: 'RentalViv',
  publisher: 'RentalViv',
  
  // Іконки
  icons: {
    icon: [
      { url: '/logo.ico', sizes: 'any' },
      { url: '/icon-32.png', sizes: '32x32', type: 'image/png' },
      { url: '/icon-16.png', sizes: '16x16', type: 'image/png' },
    ],
    apple: [
      { url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' },
    ],
    shortcut: '/logo.ico',
  },
  
  // Open Graph для соціальних мереж
  openGraph: {
    type: 'website',
    locale: 'uk_UA',
    alternateLocale: 'en_US',
    url: 'https://www.rentalviv.com',
    title: 'Оренда авто Львів — середній, бізнес і преміум клас | RentalViv',
    description: 'Оренда авто у Львові та трансфер. Сучасні автомобілі середнього, бізнес та преміум класу. Прозорі умови та комфортний сервіс від RentalViv.',
    siteName: 'RentalViv',
    images: [
      {
        url: 'https://www.rentalviv.com/images/og-image.webp',
        width: 1200,
        height: 630,
        alt: 'RentalViv - Оренда авто у Львові. Середній, бізнес та преміум клас',
        type: 'image/webp',
      },
      {
        url: 'https://www.rentalviv.com/images/hero-banner.webp',
        width: 1200,
        height: 630,
        alt: 'RentalViv - Оренда автомобілів у Львові',
      },
    ],
  },
  
  // Twitter Card
  twitter: {
    card: 'summary_large_image',
    title: 'Оренда авто Львів — середній, бізнес і преміум клас | RentalViv',
    description: 'Оренда авто у Львові та трансфер. Сучасні автомобілі, прозорі умови та комфортний сервіс від RentalViv.',
    images: ['https://www.rentalviv.com/images/og-image.webp'],
    creator: '@rentalviv',
    site: '@rentalviv',
  },
  
  // Robots
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  
  // Verification
  verification: {
    // google: 'your-google-verification-code',
    // yandex: 'your-yandex-verification-code',
  },
  
  // Інші метадані
  category: 'car rental',
  classification: 'Автопрокат, Оренда автомобілів, Трансфер',
  
  // Alternates
  alternates: {
    canonical: 'https://www.rentalviv.com',
    languages: {
      'uk-UA': 'https://www.rentalviv.com',
      'en-US': 'https://www.rentalviv.com/en',
    },
  },
  
  // App Links
  appLinks: {
    web: {
      url: 'https://www.rentalviv.com',
      should_fallback: true,
    },
  },
  
  // Форматування
  formatDetection: {
    email: false,
    address: false,
    telephone: true,
  },
  
  // Інші
  other: {
    'geo.region': 'UA-46',
    'geo.placename': 'Львів',
    'geo.position': '49.839684;24.029716',
    'ICBM': '49.839684, 24.029716',
    'rating': 'general',
    'revisit-after': '7 days',
    'apple-mobile-web-app-capable': 'yes',
    'apple-mobile-web-app-status-bar-style': 'black-translucent',
    'apple-mobile-web-app-title': 'RentalViv',
    'mobile-web-app-capable': 'yes',
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
        {/* Preconnect для прискорення */}
        <link rel="preconnect" href="https://res.cloudinary.com" />
        <link rel="dns-prefetch" href="https://res.cloudinary.com" />
        <link rel="preconnect" href="https://t.me" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        
        {/* Theme color */}
        <meta name="theme-color" content="#FF4400" />
        <meta name="msapplication-TileColor" content="#FF4400" />
        <meta name="msapplication-navbutton-color" content="#FF4400" />
        
        {/* PWA hints */}
        <link rel="manifest" href="/manifest.json" />
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
            <FloatingPhoneButton />
          </CurrencyProvider>
        </LanguageProvider>
      </body>
    </html>
  );
}
