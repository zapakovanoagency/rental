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
    <section className="bg-[#DDDDDD] px-[15px] md:px-[50px]  xl:px-[100px] 2xl:px-[200px] py-[60px] md:py-[100px] lg:py-[150px] xl:py-[180px] 2xl:py-[200px]">
      <div className="max-w-[1920px] mx-auto">
        <div className="flex items-center justify-center gap-[20px] md:gap-[50px] xl:gap-[60px] 2xl:gap-[80px]">
          {/* Ліва стрілка */}
          <button
            onClick={handlePrev}
            className="flex-shrink-0 transition-all cursor-pointer group"
            aria-label="Previous brands"
          >
            <svg 
            width="15" 
            height="27" 
            viewBox="0 0 15 27" 
            fill="none" 
            xmlns="http://www.w3.org/2000/svg"
            className="rotate-180 md:w-[15px] md:h-[27px]"
          >
            <path d="M0 2.08639L0 14.1008L0 24.9196C0 26.771 2.27674 27.6966 3.61138 26.3853L13.7782 16.3957C15.4073 14.7951 15.4073 12.1916 13.7782 10.591L9.91168 6.79188L3.61138 0.601456C2.27674 -0.690627 0 0.235043 0 2.08639Z" fill="#070707" className="group-hover:fill-[#FF4400] transition-colors"/>
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
                className="w-[95px] h-[95px] md:w-[100px] md:h-[100px] lg:w-[130px] lg:h-[130px] xl:w-[150px] xl:h-[150px] 2xl:w-[170px] 2xl:h-[170px] border-2 border-[#070707] rounded-[10px] flex items-center justify-center hover:bg-[#070707] active:bg-[#070707] transition-colors cursor-pointer flex-shrink-0 group"
              >
                <div className="w-[60px] h-[60px] md:w-[65px] md:h-[65px] lg:w-[85px] lg:h-[85px] xl:w-[100px] xl:h-[100px] 2xl:w-[115px] 2xl:h-[115px] relative flex items-center justify-center">
                  <Image
                    src={brand.logo}
                    alt={brand.name}
                    width={115}
                    height={115}
                    className="object-contain group-hover:brightness-0 group-hover:invert group-active:brightness-0 group-active:invert transition-all"
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
            width="15" 
            height="27" 
            viewBox="0 0 15 27" 
            fill="none" 
            xmlns="http://www.w3.org/2000/svg"
            className="md:w-[15px] md:h-[27px]"
          >
            <path d="M0 2.08639L0 14.1008L0 24.9196C0 26.771 2.27674 27.6966 3.61138 26.3853L13.7782 16.3957C15.4073 14.7951 15.4073 12.1916 13.7782 10.591L9.91168 6.79188L3.61138 0.601456C2.27674 -0.690627 0 0.235043 0 2.08639Z" fill="#070707" className="group-hover:fill-[#FF4400] transition-colors"/>
          </svg>
        </button>
        </div>
      </div>
    </section>
  );
}
