import Image from 'next/image';
import Link from 'next/link';

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

export default function CarCard({ name, image, tags, deposit, pricing }: CarCardProps) {
  return (
    <div className="bg-[#98A2A6] rounded-[8px] md:rounded-[10px] flex flex-col md:flex-row gap-[25px] md:gap-[20px] lg:gap-[30px] xl:gap-[40px] 2xl:gap-[50px] p-3 md:pl-5 md:pr-[30px] lg:pr-[40px] xl:pr-[50px] md:py-5 shadow-[0_0_50px_rgba(0,0,0,0.1),0_0_15px_rgba(0,0,0,0.3)] h-full">
      {/* Фото + кнопка - на мобільному вертикально */}
      <div className="flex flex-col gap-[10px] md:shrink-0">
        <div className="w-full md:w-[250px] lg:w-[280px] xl:w-[300px] 2xl:w-[317px] h-[199.5px] md:h-[210px] lg:h-[235px] xl:h-[250px] 2xl:h-[265px] bg-gray-300 rounded-[8px] md:rounded-[10px] relative overflow-hidden">
          <Image
            src={image}
            alt={name}
            fill
            className="object-cover"
          />
        </div>
        
        {/* Чорна кнопка */}
        <a 
          href="https://t.me/rentalviv_bot?start=67b5d38b76593c9f290290aa"
          target="_blank"
          rel="noopener noreferrer"
          className="w-full md:w-[250px] lg:w-[280px] xl:w-[300px] 2xl:w-[317px] h-[36px] md:h-[45px] bg-[#070707] rounded-[8px] md:rounded-[10px] flex items-center justify-center gap-[10px] px-[15px] md:px-[20px] lg:px-[25px] xl:px-[30px] py-3 md:py-[15px] hover:bg-[#1a1a1a] transition-colors"
        >
          <svg className="w-3 h-2.5 md:w-[18px] md:h-[15px]" viewBox="0 0 18 15" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M16.5 1.5L3.5 7.5L7 9.5L14 4.5L9 11L14.5 13.5L16.5 1.5Z" fill="white"/>
          </svg>
          <span className="text-white text-[10px] md:text-xs font-bold leading-none uppercase" style={{ fontFamily: 'var(--font-unbounded)' }}>
            актуальні авто в оренду
          </span>
        </a>
      </div>

      {/* Інформація */}
      <div className="flex flex-col justify-center gap-[15px] md:gap-[12px] lg:gap-[15px] xl:gap-[18px] 2xl:gap-5 md:py-[10px]">
        {/* Назва */}
        <h3 
          className="text-[#070707] text-[18px] md:text-lg lg:text-xl xl:text-[22px] 2xl:text-2xl font-black leading-[120%]"
          style={{ fontFamily: 'var(--font-nunito-sans)' }}
        >
          {name}
        </h3>

        {/* Теги */}
        <div className="flex flex-col gap-[5px]">
          {renderTags(tags)}
        </div>

        {/* Застава */}
        <div className="flex justify-between items-start gap-5">
          <span className="text-[#070707] text-xs md:text-sm font-black leading-none" style={{ fontFamily: 'var(--font-unbounded)' }}>
            Застава
          </span>
          <span className="text-[#070707] text-xs md:text-sm font-black leading-none" style={{ fontFamily: 'var(--font-unbounded)' }}>
            {deposit}
          </span>
        </div>

        {/* Ціни */}
        <div className="flex flex-col gap-[10px]">
          {pricing.map((item, index) => (
            <div key={index} className="flex justify-between items-start gap-5">
              <span className="text-[#070707] text-xs md:text-sm font-bold leading-none" style={{ fontFamily: 'var(--font-nunito-sans)' }}>
                {item.period}
              </span>
              <span className="text-[#070707] text-xs md:text-sm font-bold leading-none" style={{ fontFamily: 'var(--font-nunito-sans)' }}>
                {item.price}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function renderTags(tags: string[]) {
  const rows: string[][] = [];
  let currentRow: string[] = [];
  
  tags.forEach((tag, index) => {
    currentRow.push(tag);
    
    if (tag === 'Дизель' || tag === 'Бензин' || tag === 'Бензин/Газ') {
      rows.push([...currentRow]);
      currentRow = [];
    } else if (index === tags.length - 1 && currentRow.length > 0) {
      rows.push([...currentRow]);
    }
  });

  return (
    <>
      {rows.map((row, rowIndex) => (
        <div key={rowIndex} className="flex gap-[5px] flex-wrap">
          {row.map((tag, tagIndex) => (
            <span
              key={tagIndex}
              className="bg-[#070707] text-white text-xs md:text-sm leading-none px-[10px] py-[5px] rounded-[8px] md:rounded-[10px]"
              style={{ fontFamily: 'var(--font-nunito-sans)' }}
            >
              {tag}
            </span>
          ))}
        </div>
      ))}
    </>
  );
}
