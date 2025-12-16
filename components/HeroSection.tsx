'use client';

import Image from 'next/image';
import { useLanguage } from '@/contexts/LanguageContext';

export default function HeroSection() {
  const { t } = useLanguage();
  return (
    <section 
      id="hero" 
      className="relative h-[550px] md:h-[1024px] lg:h-[900px] flex items-start md:items-center justify-start md:justify-center px-[15px] md:px-5 pt-[60px] pb-[60px] md:p-0 overflow-hidden"
    >
      {/* Mobile background */}
      <Image
        src="/images/hero-banner-mob.png"
        alt="Оренда автомобілів у Львові"
        fill
        priority
        quality={90}
        className="object-cover md:hidden"
        sizes="100vw"
      />
      {/* Desktop/Tablet background */}
      <Image
        src="/images/hero-banner.webp"
        alt="Оренда автомобілів у Львові"
        fill
        priority
        quality={90}
        className="object-cover hidden md:block"
        sizes="100vw"
      />
      
      {/* Grain effect overlay */}
      <div 
        className="absolute inset-0 opacity-[0.15] pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
          backgroundRepeat: 'repeat',
        }}
      ></div>
      
      {/* Content */}
      <div className="relative z-10 w-full max-w-[2560px] mx-auto">
        <div className="text-left md:text-center flex flex-col items-start md:items-center gap-[248px] md:gap-[193px] xl:gap-[220px] 2xl:gap-[250px]">
          <h1 
          className="text-white text-[30px] leading-[100%] md:text-[70px] max-w-[290px] md:max-w-none lg:text-[80px] 2xl:text-[100px] md:leading-[100%] lg:leading-[80px] xl:leading-[100px] 2xl:leading-[120px] font-black uppercase whitespace-pre-line"
          style={{ 
            fontFamily: 'var(--font-unbounded)',
            // textShadow: '0 0 50px rgba(0,0,0,1), 0 0 15px rgba(0,0,0,1)'
          }}
        >
          {t('heroTitle')}
        </h1>
        
        <a
          href="https://t.me/rentalviv_bot?start=67b5d38b76593c9f290290aa"
          target="_blank"
          rel="noopener noreferrer"
          className=" w-full md:w-[469px] lg:w-auto h-[42px] md:h-16 lg:h-auto px-5 md:px-[50px] lg:px-[50px] xl:px-[60px] 2xl:px-[70px] py-[14px] md:py-5 xl:py-6 2xl:py-7 rounded-[8px] md:rounded-[10px] text-white text-xs md:text-2xl xl:text-[24px] 2xl:text-4xl font-bold uppercase transition-all duration-300 hover:scale-110 hover:shadow-[0_0_80px_rgba(255,68,0,0.6),0_0_30px_rgba(217,19,0,0.8)] relative overflow-hidden group flex items-center justify-center gap-[10px] "
          style={{ 
            fontFamily: 'var(--font-unbounded)',
            background: 'radial-gradient(circle, #FF4400 55%, #D91300 100%)',
            boxShadow: '0 0 50px rgba(0,0,0,0.1), 0 0 15px rgba(0,0,0,0.3)'
          }}
        >
          <svg className="w-[27px] h-[24px] md:hidden" viewBox="0 0 18 15" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M16.5 1.5L3.5 7.5L7 9.5L14 4.5L9 11L14.5 13.5L16.5 1.5Z" fill="white"/>
          </svg>
          <span className="relative z-10">{t('actualCars')}</span>
          <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-in-out"></span>
        </a>
        </div>
      </div>
    </section>
  );
}
