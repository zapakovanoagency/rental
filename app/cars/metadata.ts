import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Каталог авто в оренду — середній, бізнес і преміум клас',
  description: 'Повний каталог автомобілів в оренду у Львові від RentalViv. Середній клас, бізнес клас та преміум авто. Актуальні ціни, прозорі умови оренди та безкоштовна доставка.',
  keywords: [
    'каталог авто Львів',
    'авто в оренду Львів',
    'прокат авто каталог',
    'оренда бізнес авто',
    'оренда преміум авто',
    'оренда авто середній клас',
  ],
  openGraph: {
    title: 'Каталог авто в оренду — RentalViv Львів',
    description: 'Повний каталог автомобілів в оренду у Львові. Середній, бізнес та преміум клас. Актуальні ціни та умови оренди.',
    url: 'https://www.rentalviv.com/cars',
    images: [
      {
        url: '/images/cars-catalog-og.webp',
        width: 1200,
        height: 630,
        alt: 'RentalViv — Каталог автомобілів в оренду',
      },
    ],
  },
  twitter: {
    title: 'Каталог авто в оренду — RentalViv Львів',
    description: 'Повний каталог автомобілів в оренду у Львові. Середній, бізнес та преміум клас.',
    images: ['/images/cars-catalog-og.webp'],
  },
  alternates: {
    canonical: 'https://www.rentalviv.com/cars',
  },
};

// JSON-LD для сторінки каталогу
export const carsJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'CollectionPage',
  '@id': 'https://www.rentalviv.com/cars',
  name: 'Каталог автомобілів в оренду — RentalViv',
  description: 'Повний каталог автомобілів в оренду у Львові від RentalViv',
  url: 'https://www.rentalviv.com/cars',
  isPartOf: {
    '@id': 'https://www.rentalviv.com/#website',
  },
  breadcrumb: {
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Головна',
        item: 'https://www.rentalviv.com',
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Каталог авто',
        item: 'https://www.rentalviv.com/cars',
      },
    ],
  },
  mainEntity: {
    '@type': 'ItemList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Автомобілі середнього класу',
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Автомобілі бізнес класу',
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: 'Автомобілі преміум класу',
      },
    ],
  },
};
