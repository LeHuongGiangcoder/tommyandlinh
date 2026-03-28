import Image from "next/image";

export default function Home() {
  return (
    <main className="min-h-screen w-full relative flex flex-col overflow-hidden bg-surface">
      {/* Immersive Hero Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/1.jpg"
          alt="Tommy & Linh Wedding"
          fill
          priority
          className="object-cover object-center"
        />
        {/* Cinematic gradient overlay: darker at top/bottom for text readability, clear in the middle */}
        <div className="absolute inset-0 bg-gradient-to-b from-surface/80 via-surface/30 to-surface border-b-0" />
      </div>

      {/* Floating Hero Content */}
      <div className="relative z-10 flex-1 flex flex-col items-center justify-center text-center px-6 w-full max-w-5xl mx-auto h-screen">
        {/* Subtle top decoration */}
        <div className="w-[1px] h-24 bg-gradient-to-b from-transparent to-olive/60 absolute top-0 left-1/2 -translate-x-1/2" />
        
        <p className="text-olive/90 tracking-[0.3em] uppercase text-xs sm:text-sm font-light mb-8 mt-12">
          The Wedding Celebration of
        </p>

        <h1 className="text-7xl md:text-[130px] lg:text-[150px] font-medium text-burgundy leading-none tracking-tight drop-shadow-sm">
          Tommy
        </h1>
        <div className="flex items-center gap-6 my-4">
          <div className="w-16 h-[1px] bg-olive/40" />
          <span className="text-5xl md:text-6xl font-light italic text-olive">&amp;</span>
          <div className="w-16 h-[1px] bg-olive/40" />
        </div>
        <h1 className="text-7xl md:text-[130px] lg:text-[150px] font-medium text-burgundy leading-none tracking-tight drop-shadow-sm">
          Linh
        </h1>

        <div className="mt-16 flex flex-col items-center gap-6">
          <p className="text-lg md:text-2xl font-light tracking-[0.4em] text-ink">
            17 . 01 . 2027
          </p>
          <p className="text-xs md:text-sm font-light tracking-[0.3em] uppercase text-ink/80">
            Ha Noi • Vietnam
          </p>
        </div>

        <button className="mt-16 px-10 py-4 bg-burgundy/90 backdrop-blur-md text-surface hover:bg-olive transition-colors duration-500 tracking-[0.2em] uppercase text-xs font-semibold border border-burgundy/50">
          RSVP to Celebration
        </button>
      </div>

      {/* Viewport Frame Decoration (Full screen borders to make it look 'formal' but native to the web) */}
      <div className="absolute inset-6 md:inset-10 border border-olive/30 pointer-events-none z-20 hidden sm:block">
        {/* Corner accents */}
        <div className="absolute -top-[1px] -left-[1px] w-8 h-8 border-t border-l border-olive" />
        <div className="absolute -top-[1px] -right-[1px] w-8 h-8 border-t border-r border-olive" />
        <div className="absolute -bottom-[1px] -left-[1px] w-8 h-8 border-b border-l border-olive" />
        <div className="absolute -bottom-[1px] -right-[1px] w-8 h-8 border-b border-r border-olive" />
      </div>

    </main>
  );
}
