// JSON-LD Structured Data для головної сторінки
// Додайте цей код на початку компонента HomePage

const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'AutoRental',
      '@id': 'https://www.rentalviv.com/#organization',
      name: 'RentalViv',
      alternateName: 'РенталВів',
      description: 'Оренда авто у Львові та трансфер. Сучасні автомобілі середнього, бізнес та преміум класу. Прозорі умови та комфортний сервіс.',
      url: 'https://www.rentalviv.com',
      logo: {
        '@type': 'ImageObject',
        url: 'https://www.rentalviv.com/logo.ico',
        width: 512,
        height: 512,
      },
      image: 'https://www.rentalviv.com/images/og-image.webp',
      telephone: '+380-XX-XXX-XXXX', // Замініть на реальний номер
      email: 'info@rentalviv.com', // Замініть на реальний email
      address: {
        '@type': 'PostalAddress',
        streetAddress: 'вул. Ваша Адреса', // Замініть на реальну адресу
        addressLocality: 'Львів',
        addressRegion: 'Львівська область',
        postalCode: '79000',
        addressCountry: 'UA',
      },
      geo: {
        '@type': 'GeoCoordinates',
        latitude: 49.839684,
        longitude: 24.029716,
      },
      areaServed: {
        '@type': 'City',
        name: 'Львів',
        '@id': 'https://www.wikidata.org/wiki/Q36036',
      },
      priceRange: '$$-$$$',
      currenciesAccepted: 'UAH, USD, EUR',
      paymentAccepted: 'Cash, Credit Card, Bank Transfer',
      openingHoursSpecification: [
        {
          '@type': 'OpeningHoursSpecification',
          dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
          opens: '09:00',
          closes: '20:00',
        },
        {
          '@type': 'OpeningHoursSpecification',
          dayOfWeek: ['Saturday', 'Sunday'],
          opens: '10:00',
          closes: '18:00',
        },
      ],
      aggregateRating: {
        '@type': 'AggregateRating',
        ratingValue: '4.8',
        reviewCount: '50',
        bestRating: '5',
        worstRating: '1',
      },
      sameAs: [
        'https://www.facebook.com/rentalviv', // Замініть на реальні посилання
        'https://www.instagram.com/rentalviv',
        'https://t.me/rentalviv',
      ],
      hasOfferCatalog: {
        '@type': 'OfferCatalog',
        name: 'Автомобілі в оренду',
        itemListElement: [
          {
            '@type': 'OfferCatalog',
            name: 'Середній клас',
            description: 'Комфортні автомобілі для щоденних поїздок',
          },
          {
            '@type': 'OfferCatalog',
            name: 'Бізнес клас',
            description: 'Автомобілі бізнес класу для ділових поїздок',
          },
          {
            '@type': 'OfferCatalog',
            name: 'Преміум клас',
            description: 'Преміальні автомобілі для особливих випадків',
          },
        ],
      },
    },
    {
      '@type': 'WebSite',
      '@id': 'https://www.rentalviv.com/#website',
      url: 'https://www.rentalviv.com',
      name: 'RentalViv — Оренда авто Львів',
      description: 'Оренда авто у Львові та трансфер',
      publisher: {
        '@id': 'https://www.rentalviv.com/#organization',
      },
      inLanguage: ['uk-UA', 'en-US'],
      potentialAction: {
        '@type': 'SearchAction',
        target: {
          '@type': 'EntryPoint',
          urlTemplate: 'https://www.rentalviv.com/cars?search={search_term_string}',
        },
        'query-input': 'required name=search_term_string',
      },
    },
    {
      '@type': 'WebPage',
      '@id': 'https://www.rentalviv.com/#webpage',
      url: 'https://www.rentalviv.com',
      name: 'Оренда авто Львів — середній, бізнес і преміум клас | RentalViv',
      description: 'Оренда авто у Львові та трансфер. Сучасні автомобілі середнього, бізнес та преміум класу. Прозорі умови та комфортний сервіс від RentalViv.',
      isPartOf: {
        '@id': 'https://www.rentalviv.com/#website',
      },
      about: {
        '@id': 'https://www.rentalviv.com/#organization',
      },
      primaryImageOfPage: {
        '@type': 'ImageObject',
        url: 'https://www.rentalviv.com/images/og-image.webp',
      },
      inLanguage: 'uk-UA',
    },
    {
      '@type': 'Service',
      '@id': 'https://www.rentalviv.com/#carRentalService',
      name: 'Оренда автомобілів',
      description: 'Оренда автомобілів середнього, бізнес та преміум класу у Львові',
      provider: {
        '@id': 'https://www.rentalviv.com/#organization',
      },
      serviceType: 'Car Rental',
      areaServed: {
        '@type': 'City',
        name: 'Львів',
      },
    },
    {
      '@type': 'Service',
      '@id': 'https://www.rentalviv.com/#transferService',
      name: 'Трансфер',
      description: 'Послуги трансферу у Львові та області',
      provider: {
        '@id': 'https://www.rentalviv.com/#organization',
      },
      serviceType: 'Transfer Service',
      areaServed: {
        '@type': 'City',
        name: 'Львів',
      },
    },
    {
      '@type': 'BreadcrumbList',
      '@id': 'https://www.rentalviv.com/#breadcrumb',
      itemListElement: [
        {
          '@type': 'ListItem',
          position: 1,
          name: 'Головна',
          item: 'https://www.rentalviv.com',
        },
      ],
    },
  ],
};

// Використання в компоненті:
// <script
//   type="application/ld+json"
//   dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
// />

export default jsonLd;
