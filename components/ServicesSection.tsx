import Link from 'next/link';
import Image from 'next/image';

interface Service {
  icon: string;
  title: string;
  description: string;
}

const services: Service[] = [
  {
    icon: '/images/posluga1.svg',
    title: 'Оренда авто без водія',
    description: 'Шукаєте авто для поїздок Львовом чи за місто? У нас ви можете взяти сучасний, доглянутий автомобіль без водія на зручних умовах.\n\nМи пропонуємо різні класи авто - від економ до преміум. Оформлення займає всього кілька хвилин, а доставку можна замовити у будь-яку точку Львова. З нами - ніяких зайвих турбот, лише комфорт і свобода руху.'
  },
  {
    icon: '/images/posluga2.svg',
    title: 'Оренда авто з водієм',
    description: 'Потрібен надійний водій і комфортна машина? Наш сервіс оренди авто з водієм у Львові створений саме для цього.\n Професійні водії добре знають місто та маршрути, завжди пунктуальні й ввічливі. Така оренда - чудовий вибір для бізнес-зустрічей, поїздок у аеропорт, туристичних турів або святкових подій. Ми гарантуємо комфорт, конфіденційність і бездоганний сервіс.'
  },
  {
    icon: '/images/posluga3.svg',
    title: 'Довгострокова оренда авто',
    description: 'Шукаєте авто для поїздок Львовом чи за місто? У нас ви можете взяти сучасний, доглянутий автомобіль без водія на зручних умовах.\n\nМи пропонуємо різні класи авто - від економ до преміум. Оформлення займає всього кілька хвилин, а доставку можна замовити у будь-яку точку Львова. З нами - ніяких зайвих турбот, лише комфорт і свобода руху.'
  },
  {
    icon: '/images/posluga4.svg',
    title: 'Оренда авто для бізнесу',
    description: 'Для корпоративних клієнтів ми пропонуємо спеціальні програми оренди авто. Це зручно, коли потрібно забезпечити транспорт для співробітників, партнерів або гостей компанії.\n У нас - різні класи автомобілів і прозорі умови співпраці. Оренда авто для бізнесу у Львові допоможе оптимізувати витрати та підкреслити статус вашої компанії.'
  },
  {
    icon: '/images/posluga5.svg',
    title: 'Трансфер за кордон зі Львова',
    description: 'Плануєте поїздку до Польщі, Чехії чи інших країн Європи? Ми організуємо комфортний трансфер зі Львова за кордон з професійним водієм.\n Ви обираєте напрямок - ми забезпечуємо безпеку, зручність і точність прибуття.'
  },
  {
    icon: '/images/posluga6.svg',
    title: 'Трансфер по Україні зі Львова',
    description: 'Комфортні поїздки зі Львова в будь-яке місто України - швидко, зручно та без стресу. Ми здійснюємо трансфери до Києва, Одеси, Івано-Франківська, Тернополя, Луцька та інших напрямків.\n Наші водії пунктуальні, авто чисті й доглянуті. Це ідеальний варіант для бізнес-подорожей, зустрічей гостей або туристичних поїздок.'
  }
];

export default function ServicesSection() {
  return (
    <section className="bg-[#98A2A6] px-[15px] md:px-[100px] lg:px-[250px] py-[60px] md:py-[100px] lg:py-[150px]">
      {/* Заголовок */}
      <h2 
        className="text-[#070707] text-[25px] md:text-[40px] lg:text-[60px] leading-[120%] font-black text-left md:text-center mb-[30px] md:mb-20 uppercase"
        style={{ fontFamily: 'var(--font-unbounded)' }}
      >
        Послуги, які ми надаємо
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
            className="text-white text-[16px] md:text-2xl font-bold leading-[100%] text-center lowercase"
            style={{ fontFamily: 'var(--font-unbounded)' }}
          >
            обрати авто для оренди
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
