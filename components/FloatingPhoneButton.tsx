'use client';

export default function FloatingPhoneButton() {
  return (
    <>
      <a
        href="tel:+380777877087"
        className="floating-phone-btn fixed top-40 lg:top-auto lg:bottom-8 right-8 z-50 w-[60px] h-[60px] md:w-[70px] md:h-[70px] lg:w-[80px] lg:h-[80px] bg-[#FF4400] rounded-full flex items-center justify-center transition-all duration-300 animate-pulse-shadow group"
        aria-label="Зателефонувати нам"
      >
        <img 
          src="/images/phone-icon.svg" 
          alt="Phone" 
          className="w-[30px] h-[30px] md:w-[35px] md:h-[35px] lg:w-[40px] lg:h-[40px] transition-transform duration-300 group-hover:rotate-12"
        />
      </a>
      
      <style jsx global>{`
        @keyframes pulseShadow {
          0%, 100% {
            box-shadow: 0 0 30px rgba(255, 68, 0, 0.5);
          }
          50% {
            box-shadow: 0 0 50px rgba(255, 68, 0, 0.8), 0 0 80px rgba(255, 68, 0, 0.4);
          }
        }
        
        @keyframes wiggle {
          0%, 100% { transform: rotate(0deg); }
          25% { transform: rotate(-15deg); }
          75% { transform: rotate(15deg); }
        }
        
        .animate-pulse-shadow {
          animation: pulseShadow 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
        }
        
        .floating-phone-btn:hover {
          transform: scale(1.15) translateY(-5px);
          box-shadow: 0 0 60px rgba(255, 68, 0, 1), 0 0 100px rgba(255, 68, 0, 0.6);
          background: linear-gradient(135deg, #FF4400 0%, #FF6B00 100%);
        }
        
        .floating-phone-btn:hover img {
          animation: wiggle 0.5s ease-in-out infinite;
        }
        
        .floating-phone-btn:active {
          transform: scale(1.05) translateY(-2px);
        }
      `}</style>
    </>
  );
}
