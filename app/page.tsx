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

  return (
    <div className="min-h-screen bg-white">
      <HeroSection />

      <section id="autopark" className="bg-[#DDDDDD] px-[15px] md:px-[100px] lg:px-[30px] xl:px-[150px] 2xl:px-[250px] py-[60px] md:py-[100px] lg:py-[150px]">
        <CarsSlider cars={carsData} />
      </section>

      <BrandsSlider />

      <RentalConditions />

      <ServicesSection />
    </div>
  );
}
