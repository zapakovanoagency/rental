'use client';

import { useState, useEffect } from 'react';
import CarCard from '@/components/CarCard';
import { useRouter } from 'next/navigation';

interface Car {
  _id: string;
  name: string;
  image: string;
  tags: string[];
  deposit: string;
  pricing: { period: string; price: string }[];
}

const ITEMS_PER_PAGE = 6;

export default function AllCarsPage() {
  const router = useRouter();
  const [cars, setCars] = useState<Car[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    fetchCars();
  }, []);

  const fetchCars = async () => {
    try {
      const res = await fetch('/api/cars');
      const data = await res.json();
      if (data.success) {
        setCars(data.data);
      }
    } catch (error) {
      console.error('Помилка завантаження:', error);
    } finally {
      setLoading(false);
    }
  };

  const totalPages = Math.ceil(cars.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const currentCars = cars.slice(startIndex, endIndex);

  const goToPage = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-[#DDDDDD]">
      {/* Header */}
      <div className="bg-white shadow-md">
        <div className="max-w-7xl mx-auto px-8 py-8">
          <button
            onClick={() => router.push('/')}
            className="mb-4 text-[#FF4400] hover:text-[#D91300] font-bold flex items-center gap-2"
          >
            ← Назад на головну
          </button>
          <h1 
            className="text-[60px] leading-none font-black uppercase"
            style={{ fontFamily: 'var(--font-unbounded)' }}
          >
            Всі автомобілі
          </h1>
          <p className="text-gray-600 mt-4">
            Загальна кількість: {cars.length} автомобілів
          </p>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-8 py-12">
        {loading ? (
          <div className="text-center text-2xl">Завантаження...</div>
        ) : cars.length === 0 ? (
          <div className="text-center text-2xl text-gray-600">
            Автомобілі не знайдені
          </div>
        ) : (
          <>
            {/* Сітка автомобілів */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[50px] mb-12">
              {currentCars.map((car) => (
                <CarCard key={car._id} {...car} />
              ))}
            </div>

            {/* Пагінація */}
            {totalPages > 1 && (
              <div className="flex justify-center items-center gap-4">
                <button
                  onClick={() => goToPage(currentPage - 1)}
                  disabled={currentPage === 1}
                  className="px-6 py-3 border-2 border-[#070707] rounded-[10px] hover:bg-[#070707] hover:text-white transition-colors font-bold disabled:opacity-30 disabled:cursor-not-allowed"
                  style={{ fontFamily: 'var(--font-unbounded)' }}
                >
                  ← Попередня
                </button>

                <div className="flex gap-2">
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                    <button
                      key={page}
                      onClick={() => goToPage(page)}
                      className={`w-12 h-12 rounded-[10px] font-bold transition-all ${
                        currentPage === page
                          ? 'text-white'
                          : 'border-2 border-[#070707] hover:bg-[#070707] hover:text-white'
                      }`}
                      style={{
                        fontFamily: 'var(--font-unbounded)',
                        ...(currentPage === page && {
                          background: 'radial-gradient(circle, #FF4400 55%, #D91300 100%)',
                        }),
                      }}
                    >
                      {page}
                    </button>
                  ))}
                </div>

                <button
                  onClick={() => goToPage(currentPage + 1)}
                  disabled={currentPage === totalPages}
                  className="px-6 py-3 border-2 border-[#070707] rounded-[10px] hover:bg-[#070707] hover:text-white transition-colors font-bold disabled:opacity-30 disabled:cursor-not-allowed"
                  style={{ fontFamily: 'var(--font-unbounded)' }}
                >
                  Наступна →
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
