import { Language } from './i18n';

interface Service {
  icon: string;
  title: string;
  description: string;
}

export const getServices = (lang: Language): Service[] => {
  if (lang === 'en') {
    return [
      {
        icon: '/images/posluga1.svg',
        title: 'Car rental without driver',
        description: 'Looking for a car for trips around Lviv or out of town? You can rent a modern, well-maintained car without a driver on convenient terms.\n\nWe offer different car classes - from economy to premium. Registration takes just a few minutes, and delivery can be ordered anywhere in Lviv. With us - no extra worries, just comfort and freedom of movement.'
      },
      {
        icon: '/images/posluga2.svg',
        title: 'Car rental with driver',
        description: 'Need a reliable driver and comfortable car? Our car rental service with driver in Lviv was created just for this.\nProfessional drivers know the city and routes well, are always punctual and polite. Such rental is an excellent choice for business meetings, airport trips, tourist tours or festive events. We guarantee comfort, confidentiality and impeccable service.'
      },
      {
        icon: '/images/posluga3.svg',
        title: 'Long-term car rental',
        description: 'Looking for a car for trips around Lviv or out of town? You can rent a modern, well-maintained car without a driver on convenient terms.\n\nWe offer different car classes - from economy to premium. Registration takes just a few minutes, and delivery can be ordered anywhere in Lviv. With us - no extra worries, just comfort and freedom of movement.'
      },
      {
        icon: '/images/posluga4.svg',
        title: 'Car rental for business',
        description: 'For corporate clients we offer special car rental programs. This is convenient when you need to provide transport for employees, partners or company guests.\nWe have different car classes and transparent cooperation terms. Car rental for business in Lviv will help optimize costs and emphasize your company\'s status.'
      },
      {
        icon: '/images/posluga5.svg',
        title: 'Transfer abroad from Lviv',
        description: 'Planning a trip to Poland, Czech Republic or other European countries? We organize comfortable transfer from Lviv abroad with a professional driver.\nYou choose the direction - we ensure safety, comfort and arrival accuracy.'
      },
      {
        icon: '/images/posluga6.svg',
        title: 'Transfer around Ukraine from Lviv',
        description: 'Comfortable trips from Lviv to any city of Ukraine - fast, convenient and stress-free. We provide transfers to Kyiv, Odesa, Ivano-Frankivsk, Ternopil, Lutsk and other destinations.\nOur drivers are punctual, cars are clean and well-maintained. This is an ideal option for business trips, meeting guests or tourist trips.'
      }
    ];
  }

  // Ukrainian
  return [
    {
      icon: '/images/posluga1.svg',
      title: 'Оренда авто без водія',
      description: 'Шукаєте авто для поїздок Львовом чи за місто? У нас ви можете взяти сучасний, доглянутий автомобіль без водія на зручних умовах.\n\nМи пропонуємо різні класи авто - від економ до преміум. Оформлення займає всього кілька хвилин, а доставку можна замовити у будь-яку точку Львова. З нами - ніяких зайвих турбот, лише комфорт і свобода руху.'
    },
    {
      icon: '/images/posluga2.svg',
      title: 'Оренда авто з водієм',
      description: 'Потрібен надійний водій і комфортна машина? Наш сервіс оренди авто з водієм у Львові створений саме для цього.\n Професійні водії добре знають місто та маршрути, завжди пунктуальні й ввічливі. Така оренда - чудовий вибір для бізнес-зустрічей, поїздок у аеропорт, туристичних турів або святкових подій. Ми гарантуємо комфорт, конфіденційність і бездоганний сервіс.'
    },
    {
      icon: '/images/posluga3.svg',
      title: 'Довгострокова оренда авто',
      description: 'Шукаєте авто для поїздок Львовом чи за місто? У нас ви можете взяти сучасний, доглянутий автомобіль без водія на зручних умовах.\n\nМи пропонуємо різні класи авто - від економ до преміум. Оформлення займає всього кілька хвилин, а доставку можна замовити у будь-яку точку Львова. З нами - ніяких зайвих турбот, лише комфорт і свобода руху.'
    },
    {
      icon: '/images/posluga4.svg',
      title: 'Оренда авто для бізнесу',
      description: 'Для корпоративних клієнтів ми пропонуємо спеціальні програми оренди авто. Це зручно, коли потрібно забезпечити транспорт для співробітників, партнерів або гостей компанії.\n У нас - різні класи автомобілів і прозорі умови співпраці. Оренда авто для бізнесу у Львові допоможе оптимізувати витрати та підкреслити статус вашої компанії.'
    },
    {
      icon: '/images/posluga5.svg',
      title: 'Трансфер за кордон зі Львова',
      description: 'Плануєте поїздку до Польщі, Чехії чи інших країн Європи? Ми організуємо комфортний трансфер зі Львова за кордон з професійним водієм.\n Ви обираєте напрямок - ми забезпечуємо безпеку, зручність і точність прибуття.'
    },
    {
      icon: '/images/posluga6.svg',
      title: 'Трансфер по Україні зі Львова',
      description: 'Комфортні поїздки зі Львова в будь-яке місто України - швидко, зручно та без стресу. Ми здійснюємо трансфери до Києва, Одеси, Івано-Франківська, Тернополя, Луцька та інших напрямків.\n Наші водії пунктуальні, авто чисті й доглянуті. Це ідеальний варіант для бізнес-подорожей, зустрічей гостей або туристичних поїздок.'
    }
  ];
};
