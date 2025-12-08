export default function Loading() {
  return (
    <div className="min-h-screen bg-[#DDDDDD] flex items-center justify-center">
      <div className="flex flex-col items-center gap-4">
        <div className="w-16 h-16 border-4 border-[#FF4400] border-t-transparent rounded-full animate-spin"></div>
        <p className="text-[#070707] text-xl font-bold" style={{ fontFamily: 'var(--font-unbounded)' }}>
          Завантаження...
        </p>
      </div>
    </div>
  );
}
