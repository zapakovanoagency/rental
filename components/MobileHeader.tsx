'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useLanguage } from '@/contexts/LanguageContext';
import { useCurrency } from '@/contexts/CurrencyContext';
import { Currency, currencies as currencySymbols } from '@/lib/currency';

export default function MobileHeader() {
  const { language: currentLanguage, setLanguage, t } = useLanguage();
  const { currency: currentCurrency, setCurrency, currencySymbol } = useCurrency();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isCurrencyOpen, setIsCurrencyOpen] = useState(false);
  const [isLanguageOpen, setIsLanguageOpen] = useState(false);
  const [isSocialOpen, setIsSocialOpen] = useState(false);

  const currencies: Currency[] = ['USD', 'EUR', 'UAH'];
  const languages = [
    { code: 'uk', label: 'UA' },
    { code: 'en', label: 'EN' }
  ] as const;

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <>
      {/* Header */}
      <header className="lg:hidden fixed top-0 left-0 right-0 z-50 bg-[#070707] h-[35px] md:h-[56px] flex items-center justify-between px-[15px] md:px-5 shadow-[0_0_30px_rgba(0,0,0,1)] md:shadow-[0_0_70px_rgba(0,0,0,1)]">
        {/* Left Part - Navigation */}
        <div className="flex items-center gap-[15px]">
          {/* Menu Button */}
          <button 
            onClick={toggleMenu}
            className="flex items-center gap-[5px] px-[10px]"
            aria-label="Відкрити меню навігації"
            aria-expanded={isMenuOpen}
          >
            <span 
              className="text-white text-[10px] md:text-sm font-extrabold leading-none uppercase"
              style={{ fontFamily: 'var(--font-unbounded)' }}
            >
              {t('menu')}
            </span>
            <svg className="w-[6px] h-[4px] md:w-[9px] md:h-[5px]" viewBox="0 0 9 5" fill="none">
              <path d="M4.5 5L0 0L9 0L4.5 5Z" fill="white"/>
            </svg>
          </button>

          {/* Currency & Language - Tablet only */}
          <div className="hidden md:flex items-center gap-[15px]">
            {/* Currency Selector */}
            <div className="relative">
              <button 
                onClick={() => {
                  setIsCurrencyOpen(!isCurrencyOpen);
                  setIsLanguageOpen(false);
                }}
                className="flex items-center gap-[5px]"
                aria-label={`Вибрати валюту, поточна: ${currencySymbol}`}
                aria-expanded={isCurrencyOpen}
              >
                <span className="text-white text-lg">{currencySymbol}</span>
                <svg width="9" height="30" viewBox="0 0 9 30" fill="none">
                  <path d="M4.5 18L0 13L9 13L4.5 18Z" fill="white"/>
                </svg>
              </button>
              {isCurrencyOpen && (
                <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 bg-[#1a1a1a] rounded-[20px] p-4 shadow-[0_0_50px_rgba(0,0,0,0.8)] min-w-[100px] z-[60]">
                  {currencies.map((curr) => (
                    <button
                      key={curr}
                      onClick={() => {
                        setCurrency(curr);
                        setIsCurrencyOpen(false);
                      }}
                      className={`w-full px-4 py-3 text-2xl text-center rounded-[10px] transition-all ${
                        currentCurrency === curr ? 'text-white bg-[#2a2a2a]' : 'text-gray-500 hover:text-white hover:bg-[#2a2a2a]'
                      }`}
                    >
                      {currencySymbols[curr]}
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
                className="flex items-center gap-[5px]"
                aria-label={`Вибрати мову, поточна: ${languages.find(l => l.code === currentLanguage)?.label}`}
                aria-expanded={isLanguageOpen}
              >
                <span className="text-white text-lg">{languages.find(l => l.code === currentLanguage)?.label}</span>
                <svg width="9" height="30" viewBox="0 0 9 30" fill="none">
                  <path d="M4.5 18L0 13L9 13L4.5 18Z" fill="white"/>
                </svg>
              </button>
              {isLanguageOpen && (
                <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 bg-[#1a1a1a] rounded-[20px] p-4 shadow-[0_0_50px_rgba(0,0,0,0.8)] min-w-[120px] z-[60]">
                  {languages.map((lang) => (
                    <button
                      key={lang.code}
                      onClick={() => {
                        setLanguage(lang.code);
                        setIsLanguageOpen(false);
                      }}
                      className={`w-full px-4 py-3 text-2xl text-center rounded-[10px] transition-all ${
                        currentLanguage === lang.code ? 'text-white bg-[#2a2a2a]' : 'text-gray-500 hover:text-white hover:bg-[#2a2a2a]'
                      }`}
                    >
                      {lang.label}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Logo - Center */}
        <div className="absolute left-1/2 -translate-x-1/2 bg-[#070707] px-8 py-2 rounded-full shadow-[0_0_30px_rgba(0,0,0,1)] top-2">
          <Link href="/">
            <img 
              src="/images/logo.svg" 
              alt="RentalLviv" 
              className="h-[30px] md:h-[45px] transition-all duration-300"
              style={{
                filter: 'brightness(1)',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.filter = 'brightness(0) saturate(100%) invert(35%) sepia(100%) saturate(6500%) hue-rotate(0deg) brightness(110%) contrast(120%)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.filter = 'brightness(1)';
              }}
            />
          </Link>
        </div>

        {/* Right Part */}
        <div className="flex items-center gap-[15px]">
          {/* Social Icons with dropdown - Tablet only */}
          <div className="hidden md:flex items-center gap-[5px] relative">
            <button
              onClick={() => {
                setIsSocialOpen(!isSocialOpen);
                setIsCurrencyOpen(false);
                setIsLanguageOpen(false);
              }}
              className="w-[30px] h-[30px] flex items-center justify-center hover:opacity-80 transition-opacity"
              aria-label="Відкрити меню соціальних мереж"
              aria-expanded={isSocialOpen}
            >
              <svg width="30" height="30" viewBox="0 0 30 30" fill="white">
                <circle cx="15" cy="15" r="15" fill="white"/>
                <path d="M21.5 9.5L8.5 15L12 17L19 12L14 18.5L19.5 21L21.5 9.5Z" fill="#070707"/>
              </svg>
            </button>
            <button onClick={() => {
              setIsSocialOpen(!isSocialOpen);
              setIsCurrencyOpen(false);
              setIsLanguageOpen(false);
            }} aria-label="Розгорнути меню соціальних мереж" aria-expanded={isSocialOpen}>
              <svg width="9" height="30" viewBox="0 0 9 30" fill="none" aria-hidden="true">
                <path d="M4.5 18L0 13L9 13L4.5 18Z" fill="white"/>
              </svg>
            </button>
            {isSocialOpen && (
              <div className="absolute top-full right-0 mt-2 bg-[#1a1a1a] rounded-[20px] p-3 shadow-[0_0_50px_rgba(0,0,0,0.8)] z-[60] flex gap-2">
                <a 
                  href="https://t.me/yourusername" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="w-[30px] h-[30px] flex items-center justify-center hover:opacity-80 transition-opacity"
                  aria-label="Telegram - зв'язатись з нами"
                >
                  <svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="15" cy="15" r="15" fill="white"/>
                    <path d="M21.5 9.5L8.5 15L12 17L19 12L14 18.5L19.5 21L21.5 9.5Z" fill="#070707"/>
                  </svg>
                </a>
                <a 
                  href="https://wa.me/yourphonenumber" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="w-[30px] h-[30px] flex items-center justify-center hover:opacity-80 transition-opacity"
                  aria-label="WhatsApp - зв'язатись з нами"
                >
                  <svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="15" cy="15" r="15" fill="white"/>
                    <path d="M20.5 9.5C19 8 17 7 14.5 7C10 7 6.5 10.5 6.5 15C6.5 16.5 7 18 7.5 19L6.5 23L10.5 22C11.5 22.5 13 23 14.5 23C19 23 22.5 19.5 22.5 15C22.5 12.5 21.5 10.5 20.5 9.5ZM18.5 18C18 18.5 17.5 18.5 16.5 18.5C16 18.5 14.5 18 13 17C11 15.5 10 13.5 9.5 13C9.5 12.5 9.5 11.5 10 11C10.5 10.5 11 10.5 11.5 10.5C11.5 10.5 12 11.5 12.5 12.5C12.5 13 12.5 13 12 13.5C12 13.5 12 14 12.5 14.5C13.5 15.5 14.5 16 15 16.5C15.5 17 16 16.5 16.5 16.5C17 16 17.5 15.5 17.5 15.5C18 15.5 18.5 16 18.5 16.5C18.5 17 18.5 17.5 18.5 18Z" fill="#070707"/>
                  </svg>
                </a>
                <a 
                  href="https://instagram.com/yourusername" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="w-[30px] h-[30px] flex items-center justify-center hover:opacity-80 transition-opacity"
                  aria-label="Instagram - наш профіль"
                >
                  <svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="15" cy="15" r="15" fill="white"/>
                    <rect x="8" y="8" width="14" height="14" rx="3" stroke="#070707" strokeWidth="1.5" fill="none"/>
                    <circle cx="15" cy="15" r="3.5" stroke="#070707" strokeWidth="1.5" fill="none"/>
                    <circle cx="19.5" cy="10.5" r="1" fill="#070707"/>
                  </svg>
                </a>
              </div>
            )}
          </div>

          {/* Social Icons - Mobile only */}
          <div className="flex md:hidden items-center gap-[5px] relative">
            <button
              onClick={() => {
                setIsSocialOpen(!isSocialOpen);
                setIsCurrencyOpen(false);
                setIsLanguageOpen(false);
              }}
              className="w-[20px] h-[20px] flex items-center justify-center"
              aria-label="Відкрити меню соціальних мереж"
              aria-expanded={isSocialOpen}
            >
              <svg width="20" height="20" viewBox="0 0 20 20" fill="white">
                <path d="M10 0C4.477 0 0 4.477 0 10s4.477 10 10 10 10-4.477 10-10S15.523 0 10 0zm4.744 6.5l-1.538 7.25c-.115.52-.415.649-.84.404l-2.32-1.71-1.12 1.077c-.124.124-.227.227-.466.227l.166-2.36 4.29-3.877c.186-.166-.04-.258-.29-.092L7.39 11.217l-2.297-.718c-.5-.156-.51-.5.104-.74l8.977-3.46c.415-.15.78.092.644.74z" />
              </svg>
            </button>
            <button onClick={() => {
              setIsSocialOpen(!isSocialOpen);
              setIsCurrencyOpen(false);
              setIsLanguageOpen(false);
            }} aria-label="Розгорнути меню соціальних мереж" aria-expanded={isSocialOpen}>
              <svg width="6" height="20" viewBox="0 0 6 20" fill="white" aria-hidden="true">
                <path d="M3 13.3333L0 10.3333L6 10.3333L3 13.3333Z" />
              </svg>
            </button>
            {isSocialOpen && (
              <div className="absolute top-full right-0 mt-2 bg-[#1a1a1a] rounded-[20px] p-2 shadow-[0_0_50px_rgba(0,0,0,0.8)] z-[60] flex gap-2">
                <a 
                  href="https://t.me/yourusername" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="w-[20px] h-[20px] flex items-center justify-center hover:opacity-80 transition-opacity"
                  aria-label="Telegram - зв'язатись з нами"
                >
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="white" aria-hidden="true">
                    <path d="M10 0C4.477 0 0 4.477 0 10s4.477 10 10 10 10-4.477 10-10S15.523 0 10 0zm4.744 6.5l-1.538 7.25c-.115.52-.415.649-.84.404l-2.32-1.71-1.12 1.077c-.124.124-.227.227-.466.227l.166-2.36 4.29-3.877c.186-.166-.04-.258-.29-.092L7.39 11.217l-2.297-.718c-.5-.156-.51-.5.104-.74l8.977-3.46c.415-.15.78.092.644.74z" />
                  </svg>
                </a>
                <a 
                  href="https://wa.me/yourphonenumber" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="w-[20px] h-[20px] flex items-center justify-center hover:opacity-80 transition-opacity"
                  aria-label="WhatsApp - зв'язатись з нами"
                >
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="white" aria-hidden="true">
                    <path d="M13.5 6.5C12.5 5.5 11 5 9.5 5C6.5 5 4 7.5 4 10.5C4 11.5 4.5 12.5 5 13L4 16L7 15C7.5 15.5 8.5 16 9.5 16C12.5 16 15 13.5 15 10.5C15 9 14.5 7.5 13.5 6.5ZM12 12C11.5 12.5 11 12.5 10.5 12.5C10 12.5 9 12 8 11C6.5 10 6 8.5 5.5 8C5.5 7.5 5.5 7 6 6.5C6.5 6 7 6 7.5 6C7.5 6 8 7 8.5 7.5C8.5 8 8.5 8 8 8.5C8 8.5 8 9 8.5 9.5C9 10 10 10.5 10.5 11C11 11.5 11.5 11 11.5 11C12 10.5 12 10 12 10C12.5 10 12.5 10.5 12.5 11C12.5 11.5 12 12 12 12Z" />
                  </svg>
                </a>
                <a 
                  href="https://instagram.com/yourusername" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="w-[20px] h-[20px] flex items-center justify-center hover:opacity-80 transition-opacity"
                  aria-label="Instagram - наш профіль"
                >
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="white" aria-hidden="true">
                    <rect x="5" y="5" width="10" height="10" rx="2" stroke="white" strokeWidth="1" fill="none"/>
                    <circle cx="10" cy="10" r="2.5" stroke="white" strokeWidth="1" fill="none"/>
                    <circle cx="13.5" cy="6.5" r="0.7" fill="white"/>
                  </svg>
                </a>
              </div>
            )}
          </div>

          {/* Available Cars Button - Tablet only */}
          <a 
            href="https://t.me/rentalviv_bot?start=67b5d38b76593c9f290290aa"
            target="_blank"
            rel="noopener noreferrer"
            className="hidden md:flex items-center justify-center gap-[10px] h-10 px-5 py-[10px] bg-transparent border border-white rounded-[10px] hover:bg-white hover:text-[#070707] transition-colors group"
          >
            <svg className="w-4 h-5" viewBox="0 0 16 20" fill="none">
              <path d="M8 0C5.79 0 4 1.79 4 4v3H3c-.55 0-1 .45-1 1v11c0 .55.45 1 1 1h10c.55 0 1-.45 1-1V8c0-.55-.45-1-1-1h-1V4c0-2.21-1.79-4-4-4zm0 2c1.1 0 2 .9 2 2v3H6V4c0-1.1.9-2 2-2z" fill="white" className="group-hover:fill-[#070707]"/>
            </svg>
            <span className="text-white text-xs font-bold leading-none tracking-wide group-hover:text-[#070707] transition-colors" style={{ fontFamily: 'var(--font-unbounded)' }}>
              ДОСТУПНІ АВТО
            </span>
          </a>
        </div>
      </header>

      {/* Menu Dropdown - Tablet version */}
      {isMenuOpen && (
        <div 
          className="hidden md:block lg:hidden fixed top-[56px] left-5 z-40 w-[95px]"
        >
          <nav className="bg-[#070707] rounded-[10px] px-[15px] py-[15px] flex flex-col gap-[15px] shadow-[0_0_30px_rgba(0,0,0,1)] ">
            <Link 
              href="#autopark" 
              onClick={toggleMenu}
              className="text-white text-sm leading-none hover:text-[#FF4400] transition-colors"
              style={{ fontFamily: 'var(--font-nunito-sans)' }}
            >
              {t('autopark')}
            </Link>
            <Link 
              href="#rental-conditions" 
              onClick={toggleMenu}
              className="text-white text-sm leading-none hover:text-[#FF4400] transition-colors"
              style={{ fontFamily: 'var(--font-nunito-sans)' }}
            >
              {t('rentalConditions')}
            </Link>
            <Link 
              href="#services" 
              onClick={toggleMenu}
              className="text-white text-sm leading-none hover:text-[#FF4400] transition-colors"
              style={{ fontFamily: 'var(--font-nunito-sans)' }}
            >
              {t('services')}
            </Link>
            <Link 
              href="#contacts" 
              onClick={toggleMenu}
              className="text-white text-sm leading-none hover:text-[#FF4400] transition-colors"
              style={{ fontFamily: 'var(--font-nunito-sans)' }}
            >
              {t('contacts')}
            </Link>
          </nav>
        </div>
      )}

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div 
          className="md:hidden fixed top-[35px] left-0 right-0 z-[45] bg-[#070707] shadow-[0_0_30px_rgba(0,0,0,1)] overflow-y-visible"
          style={{ maxHeight: 'calc(100vh - 35px)' }}
        >
          <div className="flex flex-col items-center pt-[9px] px-[12.5px]">
           

            {/* Menu Items */}
            <nav className="bg-[#070707] rounded-[10px] px-[15px] py-[15px] flex flex-col items-center gap-[15px] w-full max-w-[295px] mb-[30px]">
              <Link 
                href="#autopark" 
                onClick={toggleMenu}
                className="text-white text-[12px] leading-none text-center"
                style={{ fontFamily: 'var(--font-nunito-sans)' }}
              >
                {t('autopark')}
              </Link>
              <Link 
                href="#rental-conditions" 
                onClick={toggleMenu}
                className="text-white text-[12px] leading-none text-center"
                style={{ fontFamily: 'var(--font-nunito-sans)' }}
              >
                {t('rentalConditions')}
              </Link>
              <Link 
                href="#services" 
                onClick={toggleMenu}
                className="text-white text-[12px] leading-none text-center"
                style={{ fontFamily: 'var(--font-nunito-sans)' }}
              >
                {t('services')}
              </Link>
              <Link 
                href="#contacts" 
                onClick={toggleMenu}
                className="text-white text-[12px] leading-none text-center"
                style={{ fontFamily: 'var(--font-nunito-sans)' }}
              >
                {t('contacts')}
              </Link>
            </nav>

            {/* Available Cars Button */}
            <a
              href="https://t.me/rentalviv_bot?start=67b5d38b76593c9f290290aa"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-[10px] bg-transparent border-2 border-white rounded-[8px] px-[20px] py-[10px] mb-[30px]"
              aria-label="Переглянути доступні автомобілі в Telegram"
            >
              <svg width="12" height="14" viewBox="0 0 12 14" fill="white">
                <path d="M6 0C3.79 0 2 1.79 2 4v2H1c-.55 0-1 .45-1 1v6c0 .55.45 1 1 1h10c.55 0 1-.45 1-1V7c0-.55-.45-1-1-1h-1V4c0-2.21-1.79-4-4-4zm0 2c1.1 0 2 .9 2 2v2H4V4c0-1.1.9-2 2-2z"/>
              </svg>
              <span 
                className="text-white text-[10px] font-bold leading-none uppercase"
                style={{ fontFamily: 'var(--font-unbounded)' }}
              >
                {t('availableCars')}
              </span>
            </a>

            {/* Currency & Language */}
            <div className="flex items-center gap-[15px] mb-[20px]">
              {/* Currency Selector */}
              <div className="relative">
                <button 
                  onClick={() => {
                    setIsCurrencyOpen(!isCurrencyOpen);
                    setIsLanguageOpen(false);
                  }}
                  className="flex items-center gap-[5px]"
                  aria-label={`Вибрати валюту, поточна: ${currencySymbol}`}
                  aria-expanded={isCurrencyOpen}
                >
                  <span className="text-white text-[16px] font-bold">{currencySymbol}</span>
                  <svg width="6" height="24" viewBox="0 0 6 24" fill="white">
                    <path d="M3 16L0 13L6 13L3 16Z" />
                  </svg>
                </button>
                {isCurrencyOpen && (
                  <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 bg-[#1a1a1a] rounded-[20px] p-3 shadow-[0_0_50px_rgba(0,0,0,0.8)] min-w-[80px] z-[60]">
                    {currencies.map((curr) => (
                      <button
                        key={curr}
                        onClick={() => {
                          setCurrency(curr);
                          setIsCurrencyOpen(false);
                        }}
                        className={`w-full px-3 py-2 text-xl text-center rounded-[10px] transition-all ${
                          currentCurrency === curr ? 'text-white bg-[#2a2a2a]' : 'text-gray-500 hover:text-white hover:bg-[#2a2a2a]'
                        }`}
                      >
                        {currencySymbols[curr]}
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
                  className="flex items-center gap-[5px]"
                  aria-label={`Вибрати мову, поточна: ${languages.find(l => l.code === currentLanguage)?.label}`}
                  aria-expanded={isLanguageOpen}
                >
                  <span className="text-white text-[16px] font-bold leading-tight">{languages.find(l => l.code === currentLanguage)?.label}</span>
                  <svg width="6" height="24" viewBox="0 0 6 24" fill="white">
                    <path d="M3 16L0 13L6 13L3 16Z" />
                  </svg>
                </button>
                {isLanguageOpen && (
                  <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 bg-[#1a1a1a] rounded-[20px] p-3 shadow-[0_0_50px_rgba(0,0,0,0.8)] min-w-[100px] z-[60]">
                    {languages.map((lang) => (
                      <button
                        key={lang.code}
                        onClick={() => {
                          setLanguage(lang.code);
                          setIsLanguageOpen(false);
                        }}
                        className={`w-full px-3 py-2 text-xl text-center rounded-[10px] transition-all ${
                          currentLanguage === lang.code ? 'text-white bg-[#2a2a2a]' : 'text-gray-500 hover:text-white hover:bg-[#2a2a2a]'
                        }`}
                      >
                        {lang.label}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Backdrop overlay - Mobile only */}
      {isMenuOpen && (
        <div 
          className="md:hidden fixed inset-0 bg-black/50 z-[35]"
          onClick={toggleMenu}
        />
      )}

      {/* Backdrop overlay - Tablet */}
      {isMenuOpen && (
        <div 
          className="hidden md:block lg:hidden fixed inset-0 z-30"
          onClick={toggleMenu}
        />
      )}
    </>
  );
}
