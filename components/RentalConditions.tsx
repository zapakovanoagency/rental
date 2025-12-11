'use client';

import { useState } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { getRentalConditions } from '@/lib/rentalConditionsData';

interface AccordionItem {
  id: string;
  title: string;
  content: {
    title: string;
    description: string | string[];
  }[];
}



export default function RentalConditions() {
  const { language, t } = useLanguage();
  const rentalConditions = getRentalConditions(language);
  const [activeAccordion, setActiveAccordion] = useState<string>('driver-requirements');

  const toggleAccordion = (id: string) => {
    // Не дозволяємо закривати вже активний пункт
    if (activeAccordion !== id) {
      setActiveAccordion(id);
    }
  };

  const activeContent = rentalConditions.find((item: AccordionItem) => item.id === activeAccordion);

  return (
    <section id="rental-conditions" className="bg-[#DDDDDD] px-[15px] md:px-[100px] lg:px-[250px] py-[60px] md:py-[100px] lg:py-[150px]">
      {/* Заголовок */}
      <h2 
        className="text-[#070707] text-[30px] text-center max-w-[260px] md:max-w-full mx-auto md:text-[40px] lg:text-[60px] leading-[120%] font-black  md:text-center mb-[30px] md:mb-20 uppercase"
        style={{ fontFamily: 'var(--font-unbounded)' }}
      >
        {t('rentalConditionsPageTitle')}
      </h2>

      {/* Контент */}
      <div className="flex flex-col lg:flex-row gap-[30px] lg:gap-[50px]">
        {/* Mobile/Tablet - Акордеони з контентом під кожним */}
        <div className="lg:hidden w-full flex flex-col gap-[15px]">
          {rentalConditions.map((item) => (
            <div key={item.id} className="flex flex-col gap-[15px]">
              <button
                onClick={() => toggleAccordion(item.id)}
                className={`w-full h-[55px] md:h-[69px] rounded-[10px] px-[20px] md:px-[50px] py-3 md:py-5 flex items-center justify-between transition-all group ${
                  activeAccordion === item.id
                    ? 'shadow-[0_0_50px_rgba(0,0,0,0.1),0_0_15px_rgba(0,0,0,0.3)]'
                    : 'border-2 border-[#070707] hover:border-[#FF4400] hover:bg-white'
                }`}
                style={
                  activeAccordion === item.id
                    ? {
                        background: 'radial-gradient(circle, #FF4400 55%, #D91300 100%)',
                      }
                    : {}
                }
              >
                <span
                  className={`text-[16px] md:text-2xl font-black leading-[120%] ${
                    activeAccordion === item.id ? 'text-white' : 'text-[#070707] group-hover:text-[#FF4400]'
                  }`}
                  style={{ fontFamily: 'var(--font-nunito-sans)' }}
                >
                  {item.title}
                </span>
                
                {/* Стрілка */}
                <svg
                  width="18"
                  height="10"
                  viewBox="0 0 18 10"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className={`transition-transform ${
                    activeAccordion === item.id ? 'rotate-0' : '-rotate-90'
                  }`}
                >
                  <path
                    d="M9 10L0 0H18L9 10Z"
                    className={activeAccordion === item.id ? 'fill-white' : 'fill-[#070707] group-hover:fill-[#FF4400]'}
                  />
                </svg>
              </button>

              {/* Контент під кнопкою */}
              {activeAccordion === item.id && (
                <div className="w-full flex flex-col gap-[10px] px-[10px] md:px-[15px]">
                  {item.content.map((block, index) => (
                    <div
                      key={index}
                      className="bg-[#070707] rounded-[10px] px-[20px] md:px-[50px] py-[20px] md:py-[30px] shadow-[0_0_50px_rgba(0,0,0,0.1),0_0_15px_rgba(0,0,0,0.3)]"
                    >
                      <h3
                        className="text-white text-[14px] md:text-base font-black leading-[120%] mb-[10px] uppercase"
                        style={{ fontFamily: 'var(--font-unbounded)' }}
                      >
                        {block.title}
                      </h3>
                      
                      {Array.isArray(block.description) ? (
                        <div className="text-white text-[12px] md:text-sm leading-[120%]" style={{ fontFamily: 'var(--font-nunito-sans)' }}>
                          {block.description.map((line, lineIndex) => (
                            <p key={lineIndex}>{line}</p>
                          ))}
                        </div>
                      ) : (
                        <p
                          className="text-white text-[12px] md:text-sm leading-[120%]"
                          style={{ fontFamily: 'var(--font-nunito-sans)' }}
                        >
                          {block.description}
                        </p>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Desktop - Колонки поруч */}
        <div className="hidden lg:flex gap-[50px] w-full">
          {/* Ліва колонка - Акордеони */}
          <div className="w-[685px] flex flex-col gap-5">
            {rentalConditions.map((item) => (
              <button
                key={item.id}
                onClick={() => toggleAccordion(item.id)}
                className={`w-full h-[69px] rounded-[10px] px-[50px] py-5 flex items-center justify-between transition-all group ${
                  activeAccordion === item.id
                    ? 'shadow-[0_0_50px_rgba(0,0,0,0.1),0_0_15px_rgba(0,0,0,0.3)]'
                    : 'border-2 border-[#070707] hover:border-[#FF4400] cursor-pointer'
                }`}
                style={
                  activeAccordion === item.id
                    ? {
                        background: 'radial-gradient(circle, #FF4400 55%, #D91300 100%)',
                      }
                    : {}
                }
              >
                <span
                  className={`text-2xl font-black leading-[120%] ${
                    activeAccordion === item.id ? 'text-white' : 'text-[#070707] group-hover:text-[#FF4400]'
                  }`}
                  style={{ fontFamily: 'var(--font-nunito-sans)' }}
                >
                  {item.title}
                </span>
                
                {/* Стрілка */}
                <svg
                  width="18"
                  height="10"
                  viewBox="0 0 18 10"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className={`transition-transform ${
                    activeAccordion === item.id ? 'rotate-0' : '-rotate-90'
                  }`}
                >
                  <path
                    d="M9 10L0 0H18L9 10Z"
                    className={activeAccordion === item.id ? 'fill-white' : 'fill-[#070707] group-hover:fill-[#FF4400]'}
                  />
                </svg>
              </button>
            ))}
          </div>

          {/* Права колонка - Контент */}
          <div className="w-[685px] flex flex-col gap-[10px]">
            {activeContent?.content.map((block, index) => (
              <div
                key={index}
                className="bg-[#070707] rounded-[10px] px-[50px] py-[30px] shadow-[0_0_50px_rgba(0,0,0,0.1),0_0_15px_rgba(0,0,0,0.3)]"
              >
                <h3
                  className="text-white text-base font-black leading-[120%] mb-[10px] uppercase"
                  style={{ fontFamily: 'var(--font-unbounded)' }}
                >
                  {block.title}
                </h3>
                
                {Array.isArray(block.description) ? (
                  <div className="text-white text-sm leading-[120%]" style={{ fontFamily: 'var(--font-nunito-sans)' }}>
                    {block.description.map((line, lineIndex) => (
                      <p key={lineIndex}>{line}</p>
                    ))}
                  </div>
                ) : (
                  <p
                    className="text-white text-sm leading-[120%]"
                    style={{ fontFamily: 'var(--font-nunito-sans)' }}
                  >
                    {block.description}
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
