'use client';

import Link from 'next/link';
import { useState } from 'react';

export default function Header() {
  const [currency, setCurrency] = useState('$');
  const [language, setLanguage] = useState('UA');
  const [isCurrencyOpen, setIsCurrencyOpen] = useState(false);
  const [isLanguageOpen, setIsLanguageOpen] = useState(false);

  const currencies = ['$', '€', '₴'];
  const languages = ['UA', 'EN'];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-[#070707] h-[70px] shadow-[0_0_70px_rgba(0,0,0,1)]">
      <div className="max-w-[1920px] mx-auto px-[30px] lg:px-[40px] xl:px-[150px] 2xl:px-[250px] h-full flex items-center justify-between">
        {/* Left Part - Navigation */}
        <nav className="flex items-center gap-[20px] xl:gap-[35px] 2xl:gap-[50px]">
          <Link 
            href="/#autopark" 
            className="text-white text-sm xl:text-base 2xl:text-lg font-normal leading-none hover:text-[#FF4400] transition-all relative group"
            style={{ fontFamily: 'Nunito Sans, sans-serif' }}
          >
            Автопарк
            <span className="absolute bottom-[-4px] left-0 w-0 h-[2px] bg-[#FF4400] group-hover:w-full transition-all duration-300"></span>
          </Link>
          <Link 
            href="/#rental-conditions" 
            className="text-white text-sm xl:text-base 2xl:text-lg font-normal leading-none hover:text-[#FF4400] transition-all relative group"
            style={{ fontFamily: 'Nunito Sans, sans-serif' }}
          >
            Умови оренди
            <span className="absolute bottom-[-4px] left-0 w-0 h-[2px] bg-[#FF4400] group-hover:w-full transition-all duration-300"></span>
          </Link>
          <Link 
            href="/#services" 
            className="text-white text-sm xl:text-base 2xl:text-lg font-normal leading-none hover:text-[#FF4400] transition-all relative group"
            style={{ fontFamily: 'Nunito Sans, sans-serif' }}
          >
            Послуги
            <span className="absolute bottom-[-4px] left-0 w-0 h-[2px] bg-[#FF4400] group-hover:w-full transition-all duration-300"></span>
          </Link>
          <Link 
            href="/#contacts" 
            className="text-white text-sm xl:text-base 2xl:text-lg font-normal leading-none hover:text-[#FF4400] transition-all relative group"
            style={{ fontFamily: 'Nunito Sans, sans-serif' }}
          >
            Контакти
            <span className="absolute bottom-[-4px] left-0 w-0 h-[2px] bg-[#FF4400] group-hover:w-full transition-all duration-300"></span>
          </Link>
        </nav>

        {/* Center - Logo */}
        <Link href="/" className="absolute left-1/2 transform -translate-x-1/2 flex items-center justify-center px-8 xl:px-12 2xl:px-14 py-3 xl:py-3.5 2xl:py-4 bg-[#070707] rounded-full top-2 shadow-[0_0_70px_rgba(0,0,0,1)] group">
         <img src="/images/logo.svg" alt="" className="h-8 xl:h-10 2xl:h-12 group-hover:brightness-0 group-hover:invert group-hover:sepia group-hover:saturate-[5000%] group-hover:hue-rotate-[-10deg] transition-all" />
        </Link>

        {/* Right Part */}
        <div className="flex items-center gap-[15px] xl:gap-[20px] 2xl:gap-[30px]">
          {/* Currency Selector */}
          <div className="relative">
            <button 
              onClick={() => {
                setIsCurrencyOpen(!isCurrencyOpen);
                setIsLanguageOpen(false);
              }}
              className="flex items-center gap-[5px] cursor-pointer hover:text-[#FF4400] transition-colors"
            >
              <span className="text-white text-sm xl:text-base 2xl:text-lg">{currency}</span>
              <svg width="9" height="26" viewBox="0 0 9 26" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M4.5 18L0 13L9 13L4.5 18Z" fill="white"/>
              </svg>
            </button>
            {isCurrencyOpen && (
              <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 bg-[#1a1a1a] rounded-[15px] lg:rounded-[20px] p-2 lg:p-3 xl:p-4 shadow-[0_0_50px_rgba(0,0,0,0.8)] min-w-[70px] lg:min-w-[80px] xl:min-w-[100px] z-[60]">
                {currencies.map((curr) => (
                  <button
                    key={curr}
                    onClick={() => {
                      setCurrency(curr);
                      setIsCurrencyOpen(false);
                    }}
                    className={`w-full px-2 lg:px-3 xl:px-4 py-1.5 lg:py-2 xl:py-3 text-lg lg:text-xl xl:text-2xl text-center rounded-[8px] lg:rounded-[10px] transition-all ${
                      currency === curr ? 'text-white bg-[#2a2a2a]' : 'text-gray-500 hover:text-white hover:bg-[#2a2a2a]'
                    }`}
                  >
                    {curr}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Language Selector */}
          <div className="relative">
            <button 
              onClick={() => {
                setIsLanguageOpen(!isLanguageOpen);
                setIsCurrencyOpen(false);
              }}
              className="flex items-center gap-[5px] cursor-pointer hover:text-[#FF4400] transition-colors"
            >
              <span className="text-white text-sm xl:text-base 2xl:text-lg">{language}</span>
              <svg width="9" height="26" viewBox="0 0 9 26" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M4.5 18L0 13L9 13L4.5 18Z" fill="white"/>
              </svg>
            </button>
            {isLanguageOpen && (
              <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 bg-[#1a1a1a] rounded-[15px] lg:rounded-[20px] p-2 lg:p-3 xl:p-4 shadow-[0_0_50px_rgba(0,0,0,0.8)] min-w-[80px] lg:min-w-[100px] xl:min-w-[120px] z-[60]">
                {languages.map((lang) => (
                  <button
                    key={lang}
                    onClick={() => {
                      setLanguage(lang);
                      setIsLanguageOpen(false);
                    }}
                    className={`w-full px-2 lg:px-3 xl:px-4 py-1.5 lg:py-2 xl:py-3 text-lg lg:text-xl xl:text-2xl text-center rounded-[8px] lg:rounded-[10px] transition-all ${
                      language === lang ? 'text-white bg-[#2a2a2a]' : 'text-gray-500 hover:text-white hover:bg-[#2a2a2a]'
                    }`}
                  >
                    {lang}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Messengers */}
          <div className="flex items-center gap-[5px]">
            {/* Telegram */}
            <a 
              href="https://t.me/yourusername" 
              target="_blank" 
              rel="noopener noreferrer"
              className="w-[30px] h-[30px] flex items-center justify-center hover:opacity-80 transition-opacity"
            >
              <svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="15" cy="15" r="15" fill="white"/>
                <path d="M21.5 9.5L8.5 15L12 17L19 12L14 18.5L19.5 21L21.5 9.5Z" fill="#070707"/>
              </svg>
            </a>

            {/* WhatsApp */}
            <a 
              href="https://wa.me/yourphonenumber" 
              target="_blank" 
              rel="noopener noreferrer"
              className="w-[30px] h-[30px] flex items-center justify-center hover:opacity-80 transition-opacity"
            >
              <svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="15" cy="15" r="15" fill="white"/>
                <path d="M20.5 9.5C19 8 17 7 14.5 7C10 7 6.5 10.5 6.5 15C6.5 16.5 7 18 7.5 19L6.5 23L10.5 22C11.5 22.5 13 23 14.5 23C19 23 22.5 19.5 22.5 15C22.5 12.5 21.5 10.5 20.5 9.5ZM18.5 18C18 18.5 17.5 18.5 16.5 18.5C16 18.5 14.5 18 13 17C11 15.5 10 13.5 9.5 13C9.5 12.5 9.5 11.5 10 11C10.5 10.5 11 10.5 11.5 10.5C11.5 10.5 12 11.5 12.5 12.5C12.5 13 12.5 13 12 13.5C12 13.5 12 14 12.5 14.5C13.5 15.5 14.5 16 15 16.5C15.5 17 16 16.5 16.5 16.5C17 16 17.5 15.5 17.5 15.5C18 15.5 18.5 16 18.5 16.5C18.5 17 18.5 17.5 18.5 18Z" fill="#070707"/>
              </svg>
            </a>

            {/* Instagram */}
            <a 
              href="https://instagram.com/yourusername" 
              target="_blank" 
              rel="noopener noreferrer"
              className="w-[30px] h-[30px] flex items-center justify-center hover:opacity-80 transition-opacity"
            >
              <svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="15" cy="15" r="15" fill="white"/>
                <rect x="8" y="8" width="14" height="14" rx="3" stroke="#070707" strokeWidth="1.5" fill="none"/>
                <circle cx="15" cy="15" r="3.5" stroke="#070707" strokeWidth="1.5" fill="none"/>
                <circle cx="19.5" cy="10.5" r="1" fill="#070707"/>
              </svg>
            </a>
          </div>

          {/* Available Cars Button */}
          <a 
            href="https://t.me/rentalviv_bot?start=67b5d38b76593c9f290290aa"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-[10px] h-10 px-5 py-[10px] bg-transparent border border-white rounded-[10px] hover:bg-[#FF4400] hover:border-[#FF4400] transition-colors group"
          >
            <img src="/images/header-btn.svg" alt="" className="transition-all" />
            <span className="text-white text-xs font-bold leading-none tracking-wide transition-colors" style={{ fontFamily: 'Unbounded, sans-serif' }}>
              ДОСТУПНІ АВТО
            </span>
          </a>
        </div>
      </div>
    </header>
  );
}
