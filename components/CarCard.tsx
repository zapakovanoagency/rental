'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useLanguage } from '@/contexts/LanguageContext';
import { useCurrency } from '@/contexts/CurrencyContext';
import { convertCurrency, formatPrice } from '@/lib/currency';

interface CarCardProps {
  name: string;
  nameEn?: string;
  image: string;
  tags: string[];
  tagsEn?: string[];
  deposit: string;
  pricing: {
    period: string;
    periodEn?: string;
    price: string;
  }[];
}

// Функція для парсингу ціни з тексту (ціни зберігаються в EUR)
const parsePrice = (priceStr: string): number => {
  const match = priceStr.match(/(\d+(?:[\s,]\d+)?)/);
  if (!match) return 0;
  const cleanedStr = match[1].replace(/[\s,]/g, '');
  return parseInt(cleanedStr);
};

export default function CarCard({ name, nameEn, image, tags, tagsEn, deposit, pricing }: CarCardProps) {
  const { t, language } = useLanguage();
  const { currency } = useCurrency();
  
  // Використовуємо англійські переводи якщо вони є і мова встановлена на англійську
  const displayName = language === 'en' && nameEn ? nameEn : name;
  const displayTags = language === 'en' && tagsEn && tagsEn.length > 0 ? tagsEn : tags;
  
  // Конвертуємо ціни з EUR в вибрану валюту
  const convertedPricing = pricing.map(item => {
    const priceInEUR = parsePrice(item.price);
    // Якщо ціна 0 або пуста - показуємо "договірна"
    if (!item.price || priceInEUR === 0) {
      return {
        period: language === 'en' && item.periodEn ? item.periodEn : item.period,
        price: 'договірна'
      };
    }
    const convertedPrice = convertCurrency(priceInEUR, 'EUR', currency);
    return {
      period: language === 'en' && item.periodEn ? item.periodEn : item.period,
      price: formatPrice(convertedPrice, currency)
    };
  });

  const depositInEUR = parsePrice(deposit);
  const convertedDeposit = formatPrice(convertCurrency(depositInEUR, 'EUR', currency), currency);
  
  return (
    <div className="bg-[#98A2A6] rounded-[8px] md:rounded-[10px] flex flex-col md:flex-row gap-[8.5vw] md:gap-[35px] lg:gap-[40px] xl:gap-[30px] 2xl:gap-[60px] p-[4vw] md:p-6 lg:p-7 xl:p-6 lg:pl-6 lg:pr-[30px] xl:pr-[25px] 2xl:pr-[40px] lg:py-5 xl:py-5 2xl:py-7 shadow-[0_0_50px_rgba(0,0,0,0.1),0_0_15px_rgba(0,0,0,0.3)] h-full">
      {/* Фото + кнопка (desktop) */}
      <div className="flex flex-col gap-[8px] md:gap-[12px] lg:gap-[14px] xl:gap-[15px] 2xl:gap-[18px] md:shrink-0 md:justify-center md:self-center">
        <div className="w-full md:w-[320px] lg:w-[380px] xl:w-[300px] 2xl:w-[380px] aspect-[4/3] md:aspect-auto md:h-[250px] lg:h-[290px] xl:h-[235px] 2xl:h-[300px] bg-gray-300 rounded-[8px] md:rounded-[10px] relative overflow-hidden">
          <Image
            src={image}
            alt={`${name} - оренда авто у Львові`}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, (max-width: 1024px) 180px, (max-width: 1280px) 200px, (max-width: 1536px) 300px, 380px"
            loading="lazy"
            quality={85}
          />
        </div>
        
        {/* Чорна кнопка - Desktop */}
        <a 
          href="https://t.me/rentalviv_bot?start=67b5d38b76593c9f290290aa"
          target="_blank"
          rel="noopener noreferrer"
          className="hidden md:flex w-full md:w-[320px] lg:w-[380px] xl:w-[300px] 2xl:w-[380px] h-[36px] md:h-[45px] lg:h-[50px] xl:h-[45px] 2xl:h-[55px] bg-[#070707] hover:bg-[#DDDDDD] rounded-[8px] md:rounded-[10px] items-center justify-center gap-[6px] md:gap-[10px] lg:gap-[12px] xl:gap-[12px] 2xl:gap-[15px] px-[15px] md:px-[20px] lg:px-[25px] xl:px-[20px] 2xl:px-[35px] py-3 md:py-[12px] lg:py-[14px] xl:py-[15px] 2xl:py-[18px] transition-colors group"
        >
          <svg className="w-[20px] h-[17px] lg:w-[22px] lg:h-[19px] xl:w-[20px] xl:h-[17px] 2xl:w-[24px] 2xl:h-[20px]" viewBox="0 0 22 18" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M16.5 1.5L3.5 7.5L7 9.5L14 4.5L9 11L14.5 13.5L16.5 1.5Z" fill="white" className="group-hover:fill-[#070707]"/>
          </svg>
          <span className="text-white group-hover:text-[#070707] text-[10px] md:text-[12px] lg:text-[13px] xl:text-[12px] 2xl:text-[14px] font-bold leading-none uppercase" style={{ fontFamily: 'var(--font-unbounded)' }}>
            {t('rentInTelegram')}
          </span>
        </a>
      </div>

      {/* Інформація */}
      <div className="flex flex-col justify-center gap-[5vw] md:gap-[15px] lg:gap-[16px] xl:gap-[12px] 2xl:gap-[18px] md:py-[5px] lg:py-[8px] xl:py-[10px] 2xl:py-[15px]">
        {/* Назва */}
        <h3 
          className="text-[#070707] text-[6vw] md:text-xl lg:text-2xl xl:text-lg 2xl:text-3xl font-black leading-[120%]"
          style={{ fontFamily: 'var(--font-nunito-sans)' }}
        >
          {displayName}
        </h3>

        {/* Теги */}
        <div className="flex gap-[1vw] md:gap-[6px] lg:gap-[7px] xl:gap-[6px] 2xl:gap-[10px] flex-wrap">
          {displayTags.map((tag, index) => (
            <span
              key={index}
              className="bg-[#070707] text-white text-[3.8vw] md:text-sm lg:text-base xl:text-sm 2xl:text-lg leading-none px-[2.7vw] md:px-[12px] lg:px-[14px] xl:px-[12px] 2xl:px-[18px] py-[1.3vw] md:py-[6px] lg:py-[7px] xl:py-[6px] 2xl:py-[10px] rounded-[8px] md:rounded-[10px]"
              style={{ fontFamily: 'var(--font-nunito-sans)' }}
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Застава */}
        <div className="flex justify-between items-start gap-5">
          <span className="text-[#070707] text-[3.8vw] md:text-sm lg:text-base xl:text-sm 2xl:text-lg font-black leading-none uppercase" style={{ fontFamily: 'var(--font-unbounded)' }}>
            {t('deposit')}
          </span>
          <span className="text-[#070707] text-[3.8vw] md:text-sm lg:text-base xl:text-sm 2xl:text-lg font-black leading-none" style={{ fontFamily: 'var(--font-unbounded)' }}>
            {convertedDeposit}
          </span>
        </div>

        {/* Ціни */}
        <div className="flex flex-col gap-[2vw] md:gap-[12px] lg:gap-[13px] xl:gap-[10px] 2xl:gap-[15px]">
          {convertedPricing.map((item, index) => (
            <div key={index} className="flex justify-between items-start gap-5">
              <span className="text-[#070707] text-[3.8vw] md:text-sm lg:text-base xl:text-sm 2xl:text-lg font-bold leading-none" style={{ fontFamily: 'var(--font-nunito-sans)' }}>
                {item.period}
              </span>
              <span className="text-[#070707] text-[3.8vw] md:text-sm lg:text-base xl:text-sm 2xl:text-lg font-bold leading-none" style={{ fontFamily: 'var(--font-nunito-sans)' }}>
                {item.price === 'договірна' ? t('negotiable') : `${item.price}/${t('perDayShort')}`}
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
        className="md:hidden w-full h-[12vw] bg-[#070707] hover:bg-[#DDDDDD] rounded-[8px] flex items-center justify-center gap-[2vw] px-[5vw] transition-colors group"
      >
        <svg className="w-[6vw] h-[5vw]" viewBox="0 0 18 15" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M16.5 1.5L3.5 7.5L7 9.5L14 4.5L9 11L14.5 13.5L16.5 1.5Z" fill="white" className="group-hover:fill-[#070707]"/>
        </svg>
        <span className="text-white group-hover:text-[#070707] text-[3.3vw] font-bold leading-none uppercase" style={{ fontFamily: 'var(--font-unbounded)' }}>
          {t('rentInTelegram')}
        </span>
      </a>
    </div>
  );
}
