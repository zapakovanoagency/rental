import { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'RentalLviv - Оренда автомобілів у Львові',
    short_name: 'RentalLviv',
    description: 'Оренда автомобілів у Львові за вигідними цінами',
    start_url: '/',
    display: 'standalone',
    background_color: '#ffffff',
    theme_color: '#FF4400',
    icons: [
      {
        src: '/icon-192.png',
        sizes: '192x192',
        type: 'image/png',
      },
      {
        src: '/icon-512.png',
        sizes: '512x512',
        type: 'image/png',
      },
    ],
  };
}
