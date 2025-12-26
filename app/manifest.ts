import { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'RentalViv — Оренда авто Львів',
    short_name: 'RentalViv',
    description: 'Оренда авто у Львові та трансфер. Сучасні автомобілі середнього, бізнес та преміум класу. Прозорі умови та комфортний сервіс.',
    start_url: '/',
    display: 'standalone',
    background_color: '#ffffff',
    theme_color: '#FF4400',
    orientation: 'portrait-primary',
    scope: '/',
    lang: 'uk',
    categories: ['business', 'travel', 'transportation'],
    icons: [
      {
        src: '/logo.ico',
        sizes: '48x48',
        type: 'image/x-icon',
      },
      {
        src: '/icon-72.png',
        sizes: '72x72',
        type: 'image/png',
      },
      {
        src: '/icon-96.png',
        sizes: '96x96',
        type: 'image/png',
      },
      {
        src: '/icon-128.png',
        sizes: '128x128',
        type: 'image/png',
      },
      {
        src: '/icon-144.png',
        sizes: '144x144',
        type: 'image/png',
      },
      {
        src: '/icon-152.png',
        sizes: '152x152',
        type: 'image/png',
      },
      {
        src: '/icon-192.png',
        sizes: '192x192',
        type: 'image/png',
        purpose: 'any maskable',
      },
      {
        src: '/icon-384.png',
        sizes: '384x384',
        type: 'image/png',
      },
      {
        src: '/icon-512.png',
        sizes: '512x512',
        type: 'image/png',
        purpose: 'any maskable',
      },
    ],
    shortcuts: [
      {
        name: 'Каталог авто',
        short_name: 'Авто',
        description: 'Переглянути доступні автомобілі',
        url: '/cars',
        icons: [{ src: '/icon-96.png', sizes: '96x96' }],
      },
      {
        name: 'Трансфер',
        short_name: 'Трансфер',
        description: 'Замовити трансфер',
        url: '/transfer',
        icons: [{ src: '/icon-96.png', sizes: '96x96' }],
      },
    ],
  };
}
