import CarCard from '@/components/CarCard';
import BrandsSlider from '@/components/BrandsSlider';
import RentalConditions from '@/components/RentalConditions';
import ServicesSection from '@/components/ServicesSection';
import CarsSlider from '@/components/CarsSlider';
import HeroSection from '@/components/HeroSection';
import connectDB from '@/lib/mongodb';
import Car from '@/models/Car';

export const revalidate = 60; // Перевалідація кожні 60 секунд

async function getCars() {
  try {
    await connectDB();
    const cars = await Car.find({ isActive: true }).sort({ createdAt: -1 }).lean();
    // Конвертуємо ObjectId в string
    return cars.map(car => ({
      ...car,
      _id: car._id.toString(),
    }));
  } catch (error) {
    console.error('Помилка завантаження автомобілів:', error);
    return [];
  }
}

export default async function Home() {
  const carsData = await getCars();

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'AutoRental',
    name: 'RentalLviv',
    description: 'Оренда автомобілів у Львові за вигідними цінами',
    url: 'https://www.rentallviv.com',
    logo: 'https://www.rentallviv.com/images/hero-banner.webp',
    telephone: '+380-XX-XXX-XX-XX',
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Львів',
      addressCountry: 'UA',
    },
    areaServed: {
      '@type': 'City',
      name: 'Львів',
    },
    priceRange: '$$',
    currenciesAccepted: 'UAH',
    openingHours: 'Mo-Su 00:00-24:00',
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.8',
      reviewCount: '50',
    },
    offers: carsData.slice(0, 5).map((car) => ({
      '@type': 'Offer',
      itemOffered: {
        '@type': 'Car',
        name: car.name,
        image: car.image,
      },
    })),
  };

  return (
    <div className="min-h-screen bg-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <HeroSection />

      <section id="autopark" className="bg-[#DDDDDD] px-[15px] md:px-[20px] lg:px-[20px] xl:px-[100px] 2xl:px-[250px] py-[60px] md:py-[100px] lg:py-[150px]">
        <CarsSlider cars={carsData} />
      </section>

      <BrandsSlider />

      <RentalConditions />

      <ServicesSection />
    </div>
  );
}
