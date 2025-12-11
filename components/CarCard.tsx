'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useLanguage } from '@/contexts/LanguageContext';
import { useCurrency } from '@/contexts/CurrencyContext';
import { convertCurrency, formatPrice } from '@/lib/currency';

interface CarCardProps {
  name: string;
  image: string;
  tags: string[];
  deposit: string;
  pricing: {
    period: string;
    price: string;
  }[];
}

// Функція для парсингу ціни з тексту (ціни зберігаються в USD)
const parsePrice = (priceStr: string): number => {
  const match = priceStr.match(/(\d+(?:[\s,]\d+)?)/);
  if (!match) return 0;
  const cleanedStr = match[1].replace(/[\s,]/g, '');
  return parseInt(cleanedStr);
};

export default function CarCard({ name, image, tags, deposit, pricing }: CarCardProps) {
  const { t } = useLanguage();
  const { currency } = useCurrency();
  
  // Конвертуємо ціни з USD в вибрану валюту
  const convertedPricing = pricing.map(item => {
    const priceInUSD = parsePrice(item.price);
    const convertedPrice = convertCurrency(priceInUSD, 'USD', currency);
    return {
      period: item.period,
      price: formatPrice(convertedPrice, currency)
    };
  });

  const depositInUSD = parsePrice(deposit);
  const convertedDeposit = formatPrice(convertCurrency(depositInUSD, 'USD', currency), currency);
  
  return (
    <div className="bg-[#98A2A6] rounded-[8px] md:rounded-[10px] flex flex-col md:flex-row gap-[25px] md:gap-[15px] lg:gap-[20px] xl:gap-[30px] 2xl:gap-[50px] p-3 md:pl-3 md:pr-[20px] lg:pl-5 lg:pr-[20px] xl:pr-[20px] 2xl:pr-[30px] md:py-3 lg:py-4 xl:py-5 shadow-[0_0_50px_rgba(0,0,0,0.1),0_0_15px_rgba(0,0,0,0.3)] h-full">
      {/* Фото + кнопка (desktop) */}
      <div className="flex flex-col gap-[8px] md:gap-[10px] md:shrink-0 md:justify-center md:self-center">
        <div className="w-full md:w-[180px] lg:w-[200px] xl:w-[300px] 2xl:w-[317px] h-[199.5px] md:h-[150px] lg:h-[170px] xl:h-[235px] 2xl:h-[265px] bg-gray-300 rounded-[8px] md:rounded-[10px] relative overflow-hidden">
          <Image
            src={image}
            alt={`${name} - оренда авто у Львові`}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, (max-width: 1024px) 180px, (max-width: 1280px) 200px, (max-width: 1536px) 300px, 317px"
            loading="lazy"
            quality={85}
          />
        </div>
        
        {/* Чорна кнопка - Desktop */}
        <a 
          href="https://t.me/rentalviv_bot?start=67b5d38b76593c9f290290aa"
          target="_blank"
          rel="noopener noreferrer"
          className="hidden md:flex w-full md:w-[180px] lg:w-[200px] xl:w-[300px] 2xl:w-[317px] h-[36px] md:h-[38px] lg:h-[40px] xl:h-[45px] bg-[#070707] hover:bg-[#DDDDDD] rounded-[8px] md:rounded-[10px] items-center justify-center gap-[6px] md:gap-[8px] lg:gap-[10px] px-[15px] md:px-[12px] lg:px-[15px] xl:px-[25px] 2xl:px-[30px] py-3 md:py-[10px] lg:py-[12px] xl:py-[15px] transition-colors group"
        >
          <svg className="w-3 h-2.5 md:w-[18px] md:h-[15px]" viewBox="0 0 18 15" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M16.5 1.5L3.5 7.5L7 9.5L14 4.5L9 11L14.5 13.5L16.5 1.5Z" fill="white" className="group-hover:fill-[#070707]"/>
          </svg>
          <span className="text-white group-hover:text-[#070707] text-[10px] md:text-[9px] lg:text-[10px] xl:text-xs font-bold leading-none uppercase" style={{ fontFamily: 'var(--font-unbounded)' }}>
            {t('rentInTelegram')}
          </span>
        </a>
      </div>

      {/* Інформація */}
      <div className="flex flex-col justify-center gap-[15px] md:gap-[6px] lg:gap-[8px] xl:gap-[12px] 2xl:gap-5 md:py-[5px] lg:py-[8px] xl:py-[10px]">
        {/* Назва */}
        <h3 
          className="text-[#070707] text-[18px] md:text-sm lg:text-base xl:text-lg 2xl:text-2xl font-black leading-[120%]"
          style={{ fontFamily: 'var(--font-nunito-sans)' }}
        >
          {name}
        </h3>

        {/* Теги */}
        <div className="flex gap-[3px] md:gap-[4px] lg:gap-[5px] flex-wrap">
          {tags.map((tag, index) => (
            <span
              key={index}
              className="bg-[#070707] text-white text-xs md:text-xs lg:text-sm leading-none px-[8px] md:px-[10px] py-[4px] md:py-[5px] rounded-[8px] md:rounded-[10px]"
              style={{ fontFamily: 'var(--font-nunito-sans)' }}
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Застава */}
        <div className="flex justify-between items-start gap-5">
          <span className="text-[#070707] text-xs md:text-[10px] lg:text-xs xl:text-sm font-black leading-none" style={{ fontFamily: 'var(--font-unbounded)' }}>
            {t('deposit')}
          </span>
          <span className="text-[#070707] text-xs md:text-[10px] lg:text-xs xl:text-sm font-black leading-none" style={{ fontFamily: 'var(--font-unbounded)' }}>
            {convertedDeposit}
          </span>
        </div>

        {/* Ціни */}
        <div className="flex flex-col gap-[6px] md:gap-[8px] lg:gap-[10px]">
          {convertedPricing.map((item, index) => (
            <div key={index} className="flex justify-between items-start gap-5">
              <span className="text-[#070707] text-xs md:text-[10px] lg:text-xs xl:text-sm font-bold leading-none" style={{ fontFamily: 'var(--font-nunito-sans)' }}>
                {item.period}
              </span>
              <span className="text-[#070707] text-xs md:text-[10px] lg:text-xs xl:text-sm font-bold leading-none" style={{ fontFamily: 'var(--font-nunito-sans)' }}>
                {item.price}/доба
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Чорна кнопка - Mobile (внизу картки) */}
      <a 
        href="https://t.me/rentalviv_bot?start=67b5d38b76593c9f290290aa"
        target="_blank"
        rel="noopener noreferrer"
        className="md:hidden w-full h-[36px] bg-[#070707] hover:bg-[#DDDDDD] rounded-[8px] flex items-center justify-center gap-[6px] px-[15px] py-3 transition-colors group"
      >
        <svg className="w-3 h-2.5" viewBox="0 0 18 15" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M16.5 1.5L3.5 7.5L7 9.5L14 4.5L9 11L14.5 13.5L16.5 1.5Z" fill="white" className="group-hover:fill-[#070707]"/>
        </svg>
        <span className="text-white group-hover:text-[#070707] text-[10px] font-bold leading-none uppercase" style={{ fontFamily: 'var(--font-unbounded)' }}>
          {t('rentInTelegram')}
        </span>
      </a>
    </div>
  );
}
