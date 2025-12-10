import { Language } from './i18n';

interface AccordionItem {
  id: string;
  title: string;
  content: {
    title: string;
    description: string | string[];
  }[];
}

export const getRentalConditions = (lang: Language): AccordionItem[] => {
  if (lang === 'en') {
    return [
      {
        id: 'driver-requirements',
        title: 'Driver requirements',
        content: [
          {
            title: 'Minimum age',
            description: '21 years'
          },
          {
            title: 'Driving experience',
            description: 'from 3 years'
          },
          {
            title: 'Required documents',
            description: [
              'passport or ID card;',
              'valid category "B" driving license.'
            ]
          }
        ]
      },
      {
        id: 'payment-deposit',
        title: 'Payment and deposit',
        content: [
          {
            title: 'Prepayment',
            description: '100% of rental cost'
          },
          {
            title: 'Deposit',
            description: 'Set individually depending on the car class. The deposit is refunded after the rental ends, subject to compliance with all rules and absence of damage.'
          }
        ]
      },
      {
        id: 'mileage-limit',
        title: 'Mileage limit',
        content: [
          {
            title: 'Daily mileage limit',
            description: 'From 200 to 300 km/day - depends on the chosen car.'
          },
          {
            title: 'Total limit calculation',
            description: 'Multiplied by the number of rental days. For example, with a 3-day rental - the limit is 900 km.'
          },
          {
            title: 'Unlimited mileage',
            description: 'Available by prior agreement, terms are discussed individually.'
          }
        ]
      },
      {
        id: 'car-return',
        title: 'Car return',
        content: [
          {
            title: 'For ICE cars (internal combustion engine)',
            description: [
              'the car is delivered with a full tank of fuel;',
              'return must be with the same fuel level;',
              'in case of insufficient level - fuel cost is compensated according to the current OKKO gas station network tariff.'
            ]
          },
          {
            title: 'For electric cars',
            description: [
              'the car is delivered fully charged;',
              'return must be with the same charge level;',
              'in case of insufficient level - compensation is charged according to Go to-U charging station tariffs.'
            ]
          }
        ]
      },
      {
        id: 'territory',
        title: 'Territory of use',
        content: [
          {
            title: 'Car use is allowed only within Ukraine',
            description: 'Going abroad is possible only by prior agreement with the company.'
          }
        ]
      },
      {
        id: 'insurance',
        title: 'Insurance',
        content: [
          {
            title: 'Standard insurance',
            description: 'All cars are insured with CASCO and MTPL. These insurances are included in the rental price.'
          }
        ]
      }
    ];
  }

  // Ukrainian
  return [
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
      id: 'insurance',
      title: 'Страхування',
      content: [
        {
          title: 'Стандартне страхування',
          description: 'Всі автомобілі застраховані за полісами КАСКО та ОСЦПВ. Ці страховки входять у вартість оренди.'
        }
      ]
    }
  ];
};
