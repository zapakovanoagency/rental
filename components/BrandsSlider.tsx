'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';

const brands = [
  { id: 1, name: 'BMW', logo: '/images/bmw.svg' },
  { id: 2, name: 'Mercedes', logo: '/images/mercedec.svg' },
  { id: 3, name: 'Audi', logo: '/images/audi.svg' },
  { id: 4, name: 'Lexus', logo: '/images/lexus.svg' },
  { id: 5, name: 'Tesla', logo: '/images/tesla.svg' },
  { id: 6, name: 'Jaguar', logo: '/images/jaguar.svg' },
  { id: 7, name: 'Ford', logo: '/images/ford.svg' },
];

export default function BrandsSlider() {
  const [offset, setOffset] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [cardWidth, setCardWidth] = useState(145); // 130px + 15px gap

  // Створюємо безкінечний масив брендів
  const infiniteBrands = [...brands, ...brands, ...brands, ...brands];

  // Відслідковуємо розмір екрану для адаптивного зміщення
  useEffect(() => {
    const updateCardWidth = () => {
      if (window.innerWidth < 768) {
        setCardWidth(95); // 80px + 15px gap
      } else if (window.innerWidth < 1024) {
        setCardWidth(115); // 100px + 15px gap
      } else {
        setCardWidth(145); // 130px + 15px gap
      }
    };

    updateCardWidth();
    window.addEventListener('resize', updateCardWidth);
    return () => window.removeEventListener('resize', updateCardWidth);
  }, []);

  const handlePrev = () => {
    setOffset((prev) => prev + cardWidth);
  };

  const handleNext = () => {
    setOffset((prev) => prev - cardWidth);
  };

  // Плавний безкінечний слайдинг з requestAnimationFrame
  useEffect(() => {
    let animationFrameId: number;
    let lastTime = Date.now();

    const animate = () => {
      if (!isPaused) {
        const currentTime = Date.now();
        const deltaTime = currentTime - lastTime;
        lastTime = currentTime;

        setOffset((prev) => {
          const newOffset = prev - (deltaTime * 0.03); // Швидкість руху
          const resetPoint = -(brands.length * cardWidth);
          
          // Безкінечний цикл
          if (newOffset <= resetPoint * 2) {
            return resetPoint;
          }
          
          return newOffset;
        });
      }

      animationFrameId = requestAnimationFrame(animate);
    };

    animationFrameId = requestAnimationFrame(animate);

    return () => cancelAnimationFrame(animationFrameId);
  }, [isPaused, cardWidth]);

  return (
    <section className="bg-[#DDDDDD] px-[15px] md:px-[50px] lg:px-[150px] xl:px-[100px] 2xl:px-[200px] py-[60px] md:py-[100px] lg:py-[150px] xl:py-[180px] 2xl:py-[200px]">
      <div className="flex items-center justify-center gap-[20px] md:gap-[50px] xl:gap-[60px] 2xl:gap-[80px]">
        {/* Ліва стрілка */}
        <button
          onClick={handlePrev}
          className="flex-shrink-0 transition-all cursor-pointer group"
          aria-label="Previous brands"
        >
          <svg 
            width="18" 
            height="10" 
            viewBox="0 0 27 15" 
            fill="none" 
            xmlns="http://www.w3.org/2000/svg"
            className="rotate-[-90deg] md:w-[27px] md:h-[15px]"
          >
            <path d="M13.5 0L0 15H27L13.5 0Z" fill="#070707" className="group-hover:fill-[#FF4400] transition-colors"/>
          </svg>
        </button>

        {/* Логотипи брендів */}
        <div 
          className="relative w-[260px] md:w-[600px] lg:w-[1050px] xl:w-[1200px] 2xl:w-[1400px] overflow-hidden"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          <div 
            className="flex items-center gap-[15px] xl:gap-[20px] 2xl:gap-[25px]"
            style={{
              transform: `translateX(${offset}px)`,
              willChange: 'transform'
            }}
          >
            {infiniteBrands.map((brand, index) => (
              <div
                key={`${brand.id}-${index}`}
                className="w-[80px] h-[80px] md:w-[100px] md:h-[100px] lg:w-[130px] lg:h-[130px] xl:w-[150px] xl:h-[150px] 2xl:w-[170px] 2xl:h-[170px] border-2 border-[#070707] rounded-[10px] flex items-center justify-center hover:bg-gray-50 transition-colors cursor-pointer flex-shrink-0"
              >
                <div className="w-[50px] h-[50px] md:w-[65px] md:h-[65px] lg:w-[85px] lg:h-[85px] xl:w-[100px] xl:h-[100px] 2xl:w-[115px] 2xl:h-[115px] relative flex items-center justify-center">
                  <Image
                    src={brand.logo}
                    alt={brand.name}
                    width={115}
                    height={115}
                    className="object-contain"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Права стрілка */}
        <button
          onClick={handleNext}
          className="flex-shrink-0 transition-all cursor-pointer group"
          aria-label="Next brands"
        >
          <svg 
            width="18" 
            height="10" 
            viewBox="0 0 27 15" 
            fill="none" 
            xmlns="http://www.w3.org/2000/svg"
            className="rotate-90 md:w-[27px] md:h-[15px]"
          >
            <path d="M13.5 0L0 15H27L13.5 0Z" fill="#070707" className="group-hover:fill-[#FF4400] transition-colors"/>
          </svg>
        </button>
      </div>
    </section>
  );
}
