import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-[#070707] px-[15px] md:px-[50px] lg:px-[50px] xl:px-[150px] 2xl:px-[250px] py-[60px] md:py-[100px]">
      <div className="flex flex-col gap-[40px] md:gap-[80px]">

        {/* Desktop Layout */}
        <div className="hidden lg:flex justify-between items-center">
          {/* Column 1 - Logo and Description */}
          <div className="flex flex-col gap-5">
            <Link href="/" className="group">
              <img src="/images/logo-footer.svg" alt="RentalLviv" className="w-[273px] h-auto group-hover:brightness-0 group-hover:invert group-hover:sepia group-hover:saturate-[5000%] group-hover:hue-rotate-[-10deg] transition-all" />
            </Link>
            <div className="flex flex-col gap-[10px]">
              <p 
                className="text-white text-base leading-[120%]"
                style={{ fontFamily: 'var(--font-nunito-sans)' }}
              >
                RentaLviv - комфортна оренда авто
              </p>
              <p 
                className="text-white text-sm leading-[120%]"
                style={{ fontFamily: 'var(--font-nunito-sans)' }}
              >
                © 2025 RentaLviv.  Всі права захищені
              </p>
            </div>
          </div>

          {/* Contact info in horizontal layout */}
          <div className="flex gap-[30px] xl:gap-[50px] 2xl:gap-20 items-center">
            {/* Column 2 - Phone, Email and Address */}
            <div className="flex flex-col gap-[50px]">
              {/* Phone and Email row */}
              <div className="flex gap-[30px] xl:gap-[50px]">
                {/* Телефон */}
                <div className="flex flex-col justify-center gap-[10px]">
                  <span 
                    className="text-white text-base leading-[120%]"
                    style={{ fontFamily: 'var(--font-nunito-sans)' }}
                  >
                    Номер телефону
                  </span>
                  <Link 
                  href="tel:+380777877087"
                  className="flex items-center gap-[10px] group transition-colors"
                  >
                    <svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M8 5C7.5 5 7 5.5 7 6V9C7 18 13 24 22 24H25C25.5 24 26 23.5 26 23V19C26 18.5 25.5 18 25 18H22C21.5 18 21 18.5 21 19V21C16 20 11 15 10 10H12C12.5 10 13 9.5 13 9V6C13 5.5 12.5 5 12 5H8Z" fill="white" className="group-hover:fill-[#FF4400]"/>
                    </svg>
                    <span 
                      className="text-white text-base font-black leading-[120%] group-hover:text-[#FF4400] transition-colors"
                      style={{ fontFamily: 'var(--font-unbounded)' }}
                    >
                      +380 777 877 087
                    </span>
                  </Link>
                </div>

                {/* Email */}
                <div className="flex flex-col justify-center gap-[10px]">
                  <span 
                    className="text-white text-base leading-[120%]"
                    style={{ fontFamily: 'var(--font-nunito-sans)' }}
                  >
                    Електронна пошта
                  </span>
                  <Link 
                  href="mailto:rentalviv@gmail.com"
                  className="flex items-center gap-[10px] group transition-colors"
                  >
                    <svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg" className="group-hover:[&_*]:stroke-[#FF4400]">
                      <rect x="4" y="7" width="22" height="16" rx="2" stroke="white" strokeWidth="2"/>
                      <path d="M4 9L15 16L26 9" stroke="white" strokeWidth="2"/>
                    </svg>
                    <span 
                      className="text-white text-base font-black leading-[120%] group-hover:text-[#FF4400] transition-colors"
                      style={{ fontFamily: 'var(--font-unbounded)' }}
                    >
                      rentalviv@gmail.com
                    </span>
                  </Link>
                </div>
              </div>

              {/* Address */}
              <div className="flex flex-col justify-center gap-[10px]">
                <span 
                  className="text-white text-base leading-[120%]"
                  style={{ fontFamily: 'var(--font-nunito-sans)' }}
                >
                  Наша адреса
                </span>
                <div className="flex items-center gap-5">
                  <svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M15 4C10.5 4 7 7.5 7 12C7 18 15 26 15 26C15 26 23 18 23 12C23 7.5 19.5 4 15 4Z" stroke="white" strokeWidth="2"/>
                    <circle cx="15" cy="12" r="3" fill="white"/>
                  </svg>
                  <span 
                    className="text-white text-base font-black leading-[120%]"
                    style={{ fontFamily: 'var(--font-unbounded)' }}
                  >
                    м. Львів вул. Стрийська 200а
                  </span>
                </div>
              </div>
            </div>

            {/* Column 3 - Social networks and Messengers */}
            <div className="flex flex-col justify-center gap-[50px]">
              {/* Social networks */}
              <div className="flex flex-col justify-center gap-[10px]">
                <span 
                  className="text-white text-base leading-[120%]"
                  style={{ fontFamily: 'var(--font-nunito-sans)' }}
                >
                  Слідкуйте за нами в соціальних мережах
                </span>
                <div className="flex gap-[10px]">
                  <Link 
                    href="https://facebook.com" 
                    target="_blank"
                    className="w-[30px] h-[30px] hover:scale-110 transition-transform group"
                  >
                    <svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <rect width="30" height="30" rx="5" fill="white" className="group-hover:fill-[#FF4400]"/>
                      <path d="M17 10H19V7H16C14.3 7 13 8.3 13 10V12H11V15H13V23H16V15H18L19 12H16V10C16 9.4 16.4 10 17 10Z" fill="#070707" className="group-hover:fill-white"/>
                    </svg>
                  </Link>
                  <Link 
                    href="https://instagram.com" 
                    target="_blank"
                    className="w-[30px] h-[30px] hover:scale-110 transition-transform group"
                  >
                    <svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg" className="group-hover:[&_*]:stroke-[#FF4400] group-hover:[&_*]:fill-[#FF4400]">
                      <rect x="6" y="6" width="18" height="18" rx="4" stroke="white" strokeWidth="2"/>
                      <circle cx="15" cy="15" r="4" stroke="white" strokeWidth="2"/>
                      <circle cx="21" cy="9" r="1.5" fill="white"/>
                    </svg>
                  </Link>
                </div>
              </div>

              {/* Messengers */}
              <div className="flex flex-col justify-center gap-[10px]">
                <span 
                  className="text-white text-base leading-[120%]"
                  style={{ fontFamily: 'var(--font-nunito-sans)' }}
                >
                  Пишіть нам у мессенджери
                </span>
                <div className="flex gap-[10px] items-center">
                  <Link 
                    href="https://t.me/yourusername" 
                    target="_blank"
                    className="w-[30px] h-[30px] hover:scale-110 transition-transform group"
                  >
                    <svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <circle cx="15" cy="15" r="15" fill="white" className="group-hover:fill-[#FF4400]"/>
                      <path d="M21.5 8.5L7.5 14.5L11 17L18 11L13 18.5L18.5 21.5L21.5 8.5Z" fill="#070707" className="group-hover:fill-white"/>
                    </svg>
                  </Link>
                  <Link 
                    href="https://wa.me/380777877087" 
                    target="_blank"
                    className="w-[30px] h-[30px] hover:scale-110 transition-transform group"
                  >
                    <svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <circle cx="15" cy="15" r="15" fill="white" className="group-hover:fill-[#FF4400]"/>
                      <path d="M20 9C18.5 7.5 16.5 7 15 7C11 7 7.5 10.5 7.5 14.5C7.5 16 8 17.5 8.5 18.5L7.5 22.5L11.5 21.5C12.5 22 13.5 22.5 15 22.5C19 22.5 22.5 19 22.5 15C22.5 13 21.5 10.5 20 9ZM18 17.5C17.5 18 17 18 16 18C15.5 18 14 17.5 12.5 16.5C11 15 9.5 13 9.5 12.5C9.5 12 9.5 11 10 10.5C10.5 10 11 10 11.5 10C11.5 10 12 11 12.5 12C12.5 12.5 12.5 12.5 12 13C12 13 12 13.5 12.5 14C13 15 14 15.5 14.5 16C15 16.5 15.5 16 16 16C16.5 15.5 17 15 17 15C17.5 15 18 15.5 18 16C18 16.5 18 17 18 17.5Z" fill="#070707" className="group-hover:fill-white"/>
                    </svg>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Контакти - Mobile/Tablet */}
        <div className="lg:hidden flex flex-col gap-[25px] md:gap-[50px] w-full">
          {/* Phone and Email - Row on tablet */}
          <div className="flex flex-col md:flex-row gap-[25px] md:gap-[50px]">
            {/* Телефон */}
            <div className="flex flex-col gap-[10px]">
              <span 
                className="text-white text-[12px] md:text-base leading-[120%]"
                style={{ fontFamily: 'var(--font-nunito-sans)' }}
              >
                Номер телефону
              </span>
              <Link 
                href="tel:+380777877087"
                className="flex items-center gap-[10px]"
              >
                <svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M8 5C7.5 5 7 5.5 7 6V9C7 18 13 24 22 24H25C25.5 24 26 23.5 26 23V19C26 18.5 25.5 18 25 18H22C21.5 18 21 18.5 21 19V21C16 20 11 15 10 10H12C12.5 10 13 9.5 13 9V6C13 5.5 12.5 5 12 5H8Z" fill="white"/>
                </svg>
                <span 
                  className="text-white text-[12px] md:text-base font-black leading-[120%]"
                  style={{ fontFamily: 'var(--font-unbounded)' }}
                >
                  +380 777 877 087
                </span>
              </Link>
            </div>

            {/* Email */}
            <div className="flex flex-col gap-[10px]">
              <span 
                className="text-white text-[12px] md:text-base leading-[120%]"
                style={{ fontFamily: 'var(--font-nunito-sans)' }}
              >
                Електронна пошта
              </span>
              <Link 
                href="mailto:rentalviv@gmail.com"
                className="flex items-center gap-[10px]"
              >
                <svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <rect x="4" y="7" width="22" height="16" rx="2" stroke="white" strokeWidth="2"/>
                  <path d="M4 9L15 16L26 9" stroke="white" strokeWidth="2"/>
                </svg>
                <span 
                  className="text-white text-[12px] md:text-base font-black leading-[120%]"
                  style={{ fontFamily: 'var(--font-unbounded)' }}
                >
                  rentalviv@gmail.com
                </span>
              </Link>
            </div>
          </div>

          {/* Адреса */}
          <div className="flex flex-col gap-[10px]">
            <span 
              className="text-white text-[12px] md:text-base leading-[120%]"
              style={{ fontFamily: 'var(--font-nunito-sans)' }}
            >
              Наша адреса
            </span>
            <div className="flex items-center gap-[10px] md:gap-5">
              <svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M15 4C10.5 4 7 7.5 7 12C7 18 15 26 15 26C15 26 23 18 23 12C23 7.5 19.5 4 15 4Z" stroke="white" strokeWidth="2"/>
                <circle cx="15" cy="12" r="3" fill="white"/>
              </svg>
              <span 
                className="text-white text-[12px] md:text-base font-black leading-[120%]"
                style={{ fontFamily: 'var(--font-unbounded)' }}
              >
                м. Львів вул. Стрийська 200а
              </span>
            </div>
          </div>

          {/* Social and Messengers - Row on tablet */}
          <div className="flex flex-col md:flex-row gap-[25px] md:gap-[50px]">
            {/* Соцмережі */}
            <div className="flex flex-col gap-[10px]">
              <span 
                className="text-white text-[12px] md:text-base leading-[120%]"
                style={{ fontFamily: 'var(--font-nunito-sans)' }}
              >
                Слідкуйте за нами в соціальних мережах
              </span>
              <div className="flex gap-[10px]">
                <Link 
                  href="https://facebook.com" 
                  target="_blank"
                  className="w-[30px] h-[30px]"
                >
                  <svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <rect width="30" height="30" rx="5" fill="white"/>
                    <path d="M17 10H19V7H16C14.3 7 13 8.3 13 10V12H11V15H13V23H16V15H18L19 12H16V10C16 9.4 16.4 10 17 10Z" fill="#070707"/>
                  </svg>
                </Link>
                <Link 
                  href="https://instagram.com" 
                  target="_blank"
                  className="w-[30px] h-[30px]"
                >
                  <svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <rect x="6" y="6" width="18" height="18" rx="4" stroke="white" strokeWidth="2"/>
                    <circle cx="15" cy="15" r="4" stroke="white" strokeWidth="2"/>
                    <circle cx="21" cy="9" r="1.5" fill="white"/>
                  </svg>
                </Link>
              </div>
            </div>

            {/* Месенджери */}
            <div className="flex flex-col gap-[10px]">
              <span 
                className="text-white text-[12px] md:text-base leading-[120%]"
                style={{ fontFamily: 'var(--font-nunito-sans)' }}
              >
                Пишіть нам у мессенджери
              </span>
              <div className="flex gap-[10px]">
                <Link 
                  href="https://t.me/yourusername" 
                  target="_blank"
                  className="w-[30px] h-[30px]"
                >
                  <svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="15" cy="15" r="15" fill="white"/>
                    <path d="M21.5 8.5L7.5 14.5L11 17L18 11L13 18.5L18.5 21.5L21.5 8.5Z" fill="#070707"/>
                  </svg>
                </Link>
                <Link 
                  href="https://wa.me/380777877087" 
                  target="_blank"
                  className="w-[30px] h-[30px]"
                >
                  <svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="15" cy="15" r="15" fill="white"/>
                    <path d="M20 9C18.5 7.5 16.5 7 15 7C11 7 7.5 10.5 7.5 14.5C7.5 16 8 17.5 8.5 18.5L7.5 22.5L11.5 21.5C12.5 22 13.5 22.5 15 22.5C19 22.5 22.5 19 22.5 15C22.5 13 21.5 10.5 20 9ZM18 17.5C17.5 18 17 18 16 18C15.5 18 14 17.5 12.5 16.5C11 15 9.5 13 9.5 12.5C9.5 12 9.5 11 10 10.5C10.5 10 11 10 11.5 10C11.5 10 12 11 12.5 12C12.5 12.5 12.5 12.5 12 13C12 13 12 13.5 12.5 14C13 15 14 15.5 14.5 16C15 16.5 15.5 16 16 16C16.5 15.5 17 15 17 15C17.5 15 18 15.5 18 16C18 16.5 18 17 18 17.5Z" fill="#070707"/>
                  </svg>
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Logo and Description - at bottom on mobile/tablet */}
        <div className="lg:hidden flex flex-col md:flex-row md:items-center gap-[15px] md:gap-[50px]">
          {/* Логотип */}
          <img src="/images/logo-footer.svg" alt="RentalLviv" className="w-[205px] md:w-[309px] h-auto" />
          
          {/* Текст */}
          <p 
            className="text-white text-[10px] md:text-base leading-[120%]"
            style={{ fontFamily: 'var(--font-nunito-sans)' }}
          >
            RentaLviv - комфортна оренда авто
          </p>
        </div>

        {/* Copyright - only on mobile/tablet */}
        <div className="lg:hidden w-full text-center">
          <p 
            className="text-white text-[12px] md:text-sm leading-[120%]"
            style={{ fontFamily: 'var(--font-nunito-sans)' }}
          >
            © 2025 RentaLviv.  Всі права захищені
          </p>
        </div>
      </div>
    </footer>
  );
}
