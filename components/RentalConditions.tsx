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

const oldRentalConditions: AccordionItem[] = [
  {
    id: 'driver-requirements',
    title: 'Вимоги до водія',
    content: [
      {
        title: 'Мінімальний вік',
        description: '21 рік'
      },
      {
        title: 'Стаж водіння',
        description: 'від 3 років'
      },
      {
        title: 'Необхідні документи',
        description: [
          'паспорт або ID-картка;',
          'чинне водійське посвідчення категорії «B».'
        ]
      }
    ]
  },
  {
    id: 'payment-deposit',
    title: 'Оплата та застава',
    content: [
      {
        title: 'Передоплата',
        description: '100% вартості оренди'
      },
      {
        title: 'Застава',
        description: 'Встановлюється індивідуально залежно від класу автомобіля. Застава повертається після завершення оренди, за умови дотримання всіх правил та відсутності пошкоджень.'
      }
    ]
  },
  {
    id: 'mileage-limit',
    title: 'Ліміт пробігу',
    content: [
      {
        title: 'Щоденний ліміт пробігу',
        description: 'Від 200 до 300 км/день — залежить від обраного авто.'
      },
      {
        title: 'Розрахунок загального ліміту',
        description: 'Множиться на кількість днів оренди. Наприклад, при оренді на 3 дні - ліміт становить 900 км.'
      },
      {
        title: 'Безлімітний пробіг',
        description: 'Доступний за попередньо погодженням, умови обговорюються індивідуально.'
      }
    ]
  },
  {
    id: 'car-return',
    title: 'Повернення автомобіля',
    content: [
      {
        title: 'Для авто з ДВЗ (двигун внутрішнього згоряння)',
        description: [
          'автомобіль передається з повним баком пального;',
          'повернення має бути із таким самим рівнем пального;',
          'у разі недостатнього рівня - вартість пального компенсується згідно з актуальним тарифом мережі АЗС ОККО.'
        ]
      },
      {
        title: 'Для електромобілів',
        description: [
          'автомобіль передається повністю зарядженим;',
          'повернення має бути з таким самим рівнем заряду;',
          'у разі недостатнього рівня — стягується компенсація за тарифами зарядних станцій Go to-U.'
        ]
      }
    ]
  },
  {
    id: 'territory',
    title: 'Територія використання',
    content: [
      {
        title: 'Використання автомобіля дозволено лише в межах території України',
        description: 'Виїзд за кордон можливий лише за попереднім погодженням із компанією.'
      }
    ]
  },
  {
    id: 'responsibility',
    title: 'Відповідальність клієнта та штрафи',
    content: [
      {
        title: 'Порушення правил дорожнього руху',
        description: 'Усі штрафи, пов\'язані з порушеннями ПДР під час оренди автомобіля перекладаються виключно на Клієнта; передавання порушника ПДР визначає пробачи та забезпечені сигнал світлофора вокол, оскільки згідно з позовом освічу.'
      },
      {
        title: 'У випадку, якщо автомобіль відновлює після завершення оренди, клієнт зобов\'язується її оплатити на підставі офіційного рахунок повідомлення.',
        description: ''
      },
      {
        title: 'Втрата технічного паспорта автомобіля',
        description: 'Штраф становить 300 $.'
      },
      {
        title: 'Втрата ключів від автомобіля',
        description: 'Штраф - від 600 до 900 $, залежно від марки автомобіля.'
      },
      {
        title: 'Повернення автомобіля в іншому місті',
        description: 'Можливе лише за попереднім домовленістю. У таких разі стягується додаткова плата, розмір якої визначається індивідуально з ураховуванням логістичних витрат.'
      },
      {
        title: 'Матеріальна відповідальність клієнта',
        description: [
          'Клієнт несе відповідальність за усі пошкодження автомобіля, що виникли з його вини або внаслідок неналежного користування умов договору. Зокрема:',
          '• використання неякісного або незадовільного пального;',
          '• порушення правил експлуатації (наприклад, транспортний засобу;',
          '• пошкодження колісних дисків або шин;',
          '• ігнорування попереджувальних сигналів на панелі приладів.'
        ]
      },
      {
        title: 'У разі ДТП або інших нештатних ситуацій',
        description: 'Клієнт зобов\'язаний негайно повідомити про інцидент замовнику.'
      }
    ]
  }
];

export default function RentalConditions() {
  const { language, t } = useLanguage();
  const rentalConditions = getRentalConditions(language);
  const [activeAccordion, setActiveAccordion] = useState<string>('driver-requirements');

  const toggleAccordion = (id: string) => {
    setActiveAccordion(activeAccordion === id ? '' : id);
  };

  const activeContent = rentalConditions.find((item: AccordionItem) => item.id === activeAccordion);

  return (
    <section className="bg-[#DDDDDD] px-[15px] md:px-[100px] lg:px-[250px] py-[60px] md:py-[100px] lg:py-[150px]">
      {/* Заголовок */}
      <h2 
        className="text-[#070707] text-[25px] md:text-[40px] lg:text-[60px] leading-[120%] font-black text-left md:text-center mb-[30px] md:mb-20 uppercase"
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
                className={`w-full h-[55px] md:h-[69px] rounded-[10px] px-[20px] md:px-[50px] py-3 md:py-5 flex items-center justify-between transition-all ${
                  activeAccordion === item.id
                    ? 'shadow-[0_0_50px_rgba(0,0,0,0.1),0_0_15px_rgba(0,0,0,0.3)]'
                    : 'border-2 border-[#070707] hover:bg-white'
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
                    activeAccordion === item.id ? 'text-white' : 'text-[#070707]'
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
                    activeAccordion === item.id ? 'rotate-90' : ''
                  }`}
                >
                  <path
                    d="M9 10L0 0H18L9 10Z"
                    fill={activeAccordion === item.id ? '#FFFFFF' : '#070707'}
                  />
                </svg>
              </button>

              {/* Контент під кнопкою */}
              {activeAccordion === item.id && (
                <div className="w-full flex flex-col gap-[10px]">
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
                className={`w-full h-[69px] rounded-[10px] px-[50px] py-5 flex items-center justify-between transition-all ${
                  activeAccordion === item.id
                    ? 'shadow-[0_0_50px_rgba(0,0,0,0.1),0_0_15px_rgba(0,0,0,0.3)]'
                    : 'border-2 border-[#070707] hover:bg-white'
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
                    activeAccordion === item.id ? 'text-white' : 'text-[#070707]'
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
                    activeAccordion === item.id ? 'rotate-90' : ''
                  }`}
                >
                  <path
                    d="M9 10L0 0H18L9 10Z"
                    fill={activeAccordion === item.id ? '#FFFFFF' : '#070707'}
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
