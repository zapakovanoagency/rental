'use client';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="min-h-screen bg-white flex items-center justify-center px-4">
      <div className="max-w-md w-full text-center">
        <h2 
          className="text-4xl font-black text-[#FF4400] mb-4 uppercase"
          style={{ fontFamily: 'var(--font-unbounded)' }}
        >
          Щось пішло не так!
        </h2>
        <p className="text-gray-600 mb-8">
          {error.message || 'Виникла помилка при завантаженні сторінки'}
        </p>
        <button
          onClick={reset}
          className="px-8 py-4 bg-[#FF4400] text-white font-bold rounded-lg hover:bg-[#D91300] transition-colors"
          style={{ fontFamily: 'var(--font-unbounded)' }}
        >
          Спробувати ще раз
        </button>
      </div>
    </div>
  );
}
