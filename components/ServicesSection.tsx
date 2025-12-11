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
    <section className="bg-[#98A2A6] px-[15px] md:px-[100px] lg:px-[250px] py-[60px] md:py-[100px] lg:py-[150px]">
      {/* Заголовок */}
      <h2 
        className="text-[#070707] text-[25px] md:text-[40px] lg:text-[60px] leading-[120%] font-black text-left md:text-center mb-[30px] md:mb-20 uppercase"
        style={{ fontFamily: 'var(--font-unbounded)' }}
      >
        {t('servicesWeProvide')}
      </h2>

      {/* Сітка послуг */}
      <div className="flex flex-col gap-[30px] md:gap-[40px] lg:gap-0 mb-[30px] md:mb-20">
        {/* Мобільна версія - всі послуги підряд */}
        <div className="flex flex-col gap-[30px] lg:hidden">
          {services.map((service, index) => (
            <ServiceCard key={index} {...service} />
          ))}
        </div>
        
        {/* Десктопна версія - два ряди */}
        <div className="hidden lg:flex flex-col gap-20">
          {/* Ряд 1 */}
          <div className="flex gap-20">
            {services.slice(0, 3).map((service, index) => (
              <ServiceCard key={index} {...service} />
            ))}
          </div>
          
          {/* Ряд 2 */}
          <div className="flex gap-20">
            {services.slice(3, 6).map((service, index) => (
              <ServiceCard key={index + 3} {...service} />
            ))}
          </div>
        </div>
      </div>

      {/* Кнопка */}
      <div className="flex justify-center">
        <a
          href="https://t.me/rentalviv_bot?start=67b5d38b76593c9f290290aa"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center gap-[10px] px-[30px] md:px-[50px] py-4 md:py-5 rounded-[10px] transition-all hover:scale-105 w-full md:w-auto"
          style={{
            background: 'radial-gradient(circle, #FF4400 55%, #D91300 100%)',
            boxShadow: '0 0 50px rgba(0,0,0,0.1), 0 0 15px rgba(0,0,0,0.3)'
          }}
        >
          <img src="/images/tg-btn.svg" alt="" className="w-[20px] h-[20px] md:w-[24px] md:h-[24px]" />
          <span 
            className="text-white text-[16px] md:text-2xl font-bold leading-[100%] text-center uppercase"
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
    <div className="w-full lg:w-[420px] flex flex-col gap-[15px] md:gap-5">
      {/* Заголовок з іконкою */}
      <div className="flex items-center gap-[10px]">
        <Image
          src={icon}
          alt={title}
          width={30}
          height={30}
          className="flex-shrink-0"
        />
        <h3 
          className="text-[#070707] text-[16px] md:text-2xl font-black leading-[120%]"
          style={{ fontFamily: 'var(--font-nunito-sans)' }}
        >
          {title}
        </h3>
      </div>
      
      {/* Опис */}
      <p 
        className="text-[#070707] text-[12px] md:text-sm leading-[120%] whitespace-pre-line"
        style={{ fontFamily: 'var(--font-nunito-sans)' }}
      >
        {description}
      </p>
    </div>
  );
}
