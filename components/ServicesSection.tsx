'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useLanguage } from '@/contexts/LanguageContext';
import { getServices } from '@/lib/servicesData';

interface Service {
  icon: string;
  title: string;
  description: string;
}



export default function ServicesSection() {
  const { language, t } = useLanguage();
  const services = getServices(language);
  
  return (
    <section id="services" className="bg-[#98A2A6] px-[15px] md:px-[50px] lg:px-[250px] xl:px-[100px] 2xl:px-[200px] py-[60px] md:py-[100px] lg:py-[150px] xl:py-[180px] 2xl:py-[200px]">
      {/* Заголовок */}
      <h2 
        className="text-[#070707] text-[25px] md:text-[40px] lg:text-[60px] xl:text-[70px] 2xl:text-[80px] leading-[120%] font-black text-center mb-[30px] md:mb-20 xl:mb-24 2xl:mb-28 uppercase"
        style={{ fontFamily: 'var(--font-unbounded)' }}
      >
        {t('servicesWeProvide')}
      </h2>

      {/* Сітка послуг */}
      <div className="flex flex-col gap-[30px] md:gap-[40px] lg:gap-0 mb-[30px] md:mb-20 xl:mb-24 2xl:mb-28">
        {/* Мобільна версія - всі послуги підряд */}
        <div className="flex flex-col gap-[30px] lg:hidden">
          {services.map((service, index) => (
            <ServiceCard key={index} {...service} />
          ))}
        </div>
        
        {/* Десктопна версія - два ряди на lg, три колонки на xl/2xl */}
        <div className="hidden lg:flex lg:flex-col xl:grid xl:grid-cols-3 gap-20 xl:gap-x-16 xl:gap-y-20 2xl:gap-x-20 2xl:gap-y-24">
          {/* На lg - два ряди */}
          <div className="lg:flex lg:flex-col xl:contents gap-20">
            <div className="flex gap-20 xl:contents">
              {services.slice(0, 3).map((service, index) => (
                <ServiceCard key={index} {...service} />
              ))}
            </div>
            <div className="flex gap-20 xl:contents">
              {services.slice(3, 6).map((service, index) => (
                <ServiceCard key={index + 3} {...service} />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Кнопка */}
      <div className="flex justify-center">
        <a
          href="https://t.me/rentalviv_bot?start=67b5d38b76593c9f290290aa"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center gap-[10px] xl:gap-[12px] 2xl:gap-[15px] px-[30px] md:px-[50px] xl:px-[60px] 2xl:px-[70px] py-4 md:py-5 xl:py-6 2xl:py-7 rounded-[10px] transition-all hover:scale-105 w-full md:w-auto"
          style={{
            background: 'radial-gradient(circle, #FF4400 55%, #D91300 100%)',
            boxShadow: '0 0 50px rgba(0,0,0,0.1), 0 0 15px rgba(0,0,0,0.3)'
          }}
        >
          <img src="/images/tg-btn.svg" alt="" className="w-[20px] h-[20px] md:w-[24px] md:h-[24px] xl:w-[28px] xl:h-[28px] 2xl:w-[32px] 2xl:h-[32px]" />
          <span 
            className="text-white text-[12px] md:text-2xl xl:text-3xl 2xl:text-4xl font-bold leading-[100%] text-center uppercase"
            style={{ fontFamily: 'var(--font-unbounded)' }}
          >
            {t('chooseCar')}
          </span>
        </a>
      </div>
    </section>
  );
}

function ServiceCard({ icon, title, description }: Service) {
  return (
    <div className="w-full lg:w-[420px] xl:w-full 2xl:w-full flex flex-col gap-[15px] md:gap-5 xl:gap-6 2xl:gap-7">
      {/* Заголовок з іконкою */}
      <div className="flex items-center gap-[10px] xl:gap-[12px] 2xl:gap-[15px]">
        <Image
          src={icon}
          alt={title}
          width={30}
          height={30}
          className="flex-shrink-0 xl:w-[35px] xl:h-[35px] 2xl:w-[40px] 2xl:h-[40px]"
        />
        <h3 
          className="text-[#070707] text-[16px] md:text-2xl xl:text-3xl 2xl:text-4xl font-black leading-[120%]"
          style={{ fontFamily: 'var(--font-nunito-sans)' }}
        >
          {title}
        </h3>
      </div>
      
      {/* Опис */}
      <p 
        className="text-[#070707] text-[12px] md:text-sm xl:text-base 2xl:text-lg leading-[120%] whitespace-pre-line"
        style={{ fontFamily: 'var(--font-nunito-sans)' }}
      >
        {description}
      </p>
    </div>
  );
}
