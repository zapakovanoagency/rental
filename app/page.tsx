import CarCard from '@/components/CarCard';
import BrandsSlider from '@/components/BrandsSlider';
import RentalConditions from '@/components/RentalConditions';
import ServicesSection from '@/components/ServicesSection';
import CarsSlider from '@/components/CarsSlider';
import HeroSection from '@/components/HeroSection';
import connectDB from '@/lib/mongodb';
import Car from '@/models/Car';

export const dynamic = 'force-dynamic';
export const revalidate = 0; // Вимкнути кешування для динамічних даних

async function getCars() {
  try {
    await connectDB();
    const cars = await Car.find({ isActive: true }).sort({ order: 1, createdAt: -1 }).lean();
    
    console.log('Головна сторінка - завантажено', cars.length, 'автомобілів:');
    cars.slice(0, 5).forEach(car => {
      console.log(`  ${car.name} - order: ${car.order}`);
    });
    
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

      <section id="autopark" className="bg-[#DDDDDD] px-[15px] md:px-[20px] lg:px-[20px] xl:px-[60px] 2xl:px-[150px] py-[60px] md:py-[100px] lg:py-[150px] xl:py-[180px] 2xl:py-[200px]">
        <CarsSlider cars={carsData} />
      </section>

      <BrandsSlider />

      <RentalConditions />

      <ServicesSection />
    </div>
  );
}
