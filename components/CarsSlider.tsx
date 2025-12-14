'use client';

import { useState } from 'react';
import CarCard from './CarCard';
import { useLanguage } from '@/contexts/LanguageContext';

interface Car {
  _id: string;
  name: string;
  nameEn?: string;
  image: string;
  tags: string[];
  tagsEn?: string[];
  deposit: string;
  pricing: { period: string; price: string }[];
}

interface CarsSliderProps {
  cars: Car[];
}

const ITEMS_PER_PAGE = 6;

export default function CarsSlider({ cars }: CarsSliderProps) {
  const { t } = useLanguage();
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(cars.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const currentCars = cars.slice(startIndex, endIndex);

  const scrollToSlider = () => {
    const sliderElement = document.getElementById('cars-slider');
    if (sliderElement) {
      sliderElement.scrollIntoView({ behavior: 'instant', block: 'start' });
    }
  };

  const goToPage = (page: number) => {
    scrollToSlider();
    setCurrentPage(page);
  };

  const goToPrevious = () => {
    if (currentPage > 1) {
      scrollToSlider();
      setCurrentPage(currentPage - 1);
    }
  };

  const goToNext = () => {
    if (currentPage < totalPages) {
      scrollToSlider();
      setCurrentPage(currentPage + 1);
    }
  };

  if (cars.length === 0) {
    return (
      <div className="text-center text-2xl text-gray-600">
        Автомобілі завантажуються...
      </div>
    );
  }

  return (
    <div id="cars-slider">
      {/* Заголовок - Mobile */}
      <h2 
        className="md:hidden text-[#070707] text-[30px] text-center leading-[120%] font-black uppercase mb-[30px]"
        style={{ fontFamily: 'var(--font-unbounded)' }}
      >
        {t('autoparkTitle')}
      </h2>

      {/* Заголовок і кнопка - Desktop */}
      <div className="hidden md:flex justify-between items-center mb-20">
        <h2 
          className="text-[#070707] text-[40px] lg:text-[60px] leading-none font-black uppercase"
          style={{ fontFamily: 'var(--font-unbounded)' }}
        >
          {t('autoparkTitle')}
        </h2>
        
        <a
          href="https://t.me/rentalviv_bot?start=67b5d38b76593c9f290290aa"
          target="_blank"
          rel="noopener noreferrer"
          className="border-2 border-[#070707] rounded-[10px] px-[50px] py-5 hover:bg-[#070707] hover:text-white transition-colors"
        >
          <span 
            className="text-2xl font-bold leading-none uppercase"
            style={{ fontFamily: 'var(--font-unbounded)' }}
          >
            {t('viewAllCars')}
          </span>
        </a>
      </div>

      {/* Сітка автомобілів */}
      <div className="flex flex-col lg:grid lg:grid-cols-2 gap-[30px] md:gap-[30px] lg:gap-[50px] mb-[30px] md:mb-12">
        {currentCars.map((car) => (
          <CarCard key={car._id} {...car} />
        ))}
      </div>

      {/* Кнопка - Mobile (після сітки) */}
      <a
        href="https://t.me/rentalviv_bot?start=67b5d38b76593c9f290290aa"
        target="_blank"
        rel="noopener noreferrer"
        className="md:hidden w-full flex justify-center border-2 border-[#070707] rounded-[10px] px-[30px] py-4 hover:bg-[#070707] hover:text-white transition-colors mb-[30px]"
      >
        <span 
          className="text-[14px] md:text-[16px] font-bold leading-none uppercase"
          style={{ fontFamily: 'var(--font-unbounded)' }}
        >
          {t('viewAllCars')}
        </span>
      </a>

      {/* Пагінація - Desktop */}
      {totalPages > 1 && (
        <div className="hidden md:flex justify-center items-center gap-6">
          {/* Попередня сторінка */}
          <button
            onClick={goToPrevious}
            disabled={currentPage === 1}
            className="px-8 py-4 border-2 border-[#070707] rounded-[10px] hover:bg-[#070707] hover:text-white transition-colors font-bold disabled:opacity-30 disabled:cursor-not-allowed"
            style={{ fontFamily: 'var(--font-unbounded)' }}
          >
            ←
          </button>

          {/* Номери сторінок */}
          <div className="flex gap-3">
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <button
                key={page}
                onClick={() => goToPage(page)}
                className={`w-14 h-14 rounded-[10px] font-bold text-xl transition-all ${
                  currentPage === page
                    ? 'bg-[#070707] text-white shadow-lg scale-110'
                    : 'border-2 border-[#070707] text-[#070707] hover:bg-[#070707] hover:text-white'
                }`}
                style={{
                  fontFamily: 'var(--font-unbounded)',
                }}
              >
                {page}
              </button>
            ))}
          </div>

          {/* Наступна сторінка */}
          <button
            onClick={goToNext}
            disabled={currentPage === totalPages}
            className="px-8 py-4 border-2 border-[#070707] rounded-[10px] hover:bg-[#070707] hover:text-white transition-colors font-bold disabled:opacity-30 disabled:cursor-not-allowed"
            style={{ fontFamily: 'var(--font-unbounded)' }}
          >
            →
          </button>
        </div>
      )}

      {/* Пагінація - Mobile (тільки стрілки) */}
      {totalPages > 1 && (
        <div className="flex md:hidden justify-center items-center gap-4">
          <button
            onClick={goToPrevious}
            disabled={currentPage === 1}
            className="px-6 py-3 border-2 border-[#070707] rounded-[10px] hover:bg-[#070707] hover:text-white transition-colors font-bold disabled:opacity-30 disabled:cursor-not-allowed text-xl"
            style={{ fontFamily: 'var(--font-unbounded)' }}
          >
            ←
          </button>
          
          <span className="text-[#070707] font-bold text-lg">
            {currentPage} / {totalPages}
          </span>

          <button
            onClick={goToNext}
            disabled={currentPage === totalPages}
            className="px-6 py-3 border-2 border-[#070707] rounded-[10px] hover:bg-[#070707] hover:text-white transition-colors font-bold disabled:opacity-30 disabled:cursor-not-allowed text-xl"
            style={{ fontFamily: 'var(--font-unbounded)' }}
          >
            →
          </button>
        </div>
      )}
    </div>
  );
}
