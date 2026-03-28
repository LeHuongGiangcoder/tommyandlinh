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
          className="object-cover object-center md:object-[80%_50%]"
        />
        {/* Cinematic gradient overlay sweeping right: opaque on the left for text, transparent on the right for the couple */}
        <div className="absolute inset-0 bg-gradient-to-r from-surface/95 via-surface/60 to-transparent w-full md:w-[85%]" />
        
        {/* Subtle top/bottom framing gradients */}
        <div className="absolute inset-0 bg-gradient-to-t from-surface/90 via-transparent to-surface/30" />
      </div>

      {/* Airy, Dreamy Floating Hero Content */}
      <div className="relative z-10 flex-1 flex flex-col justify-center px-12 sm:px-20 md:px-32 lg:px-44 w-full h-screen">
        
        {/* Unconstrained, flowing text grouping */}
        <div className="flex flex-col items-start w-full relative">
          
          <p className="text-olive/90 tracking-[0.4em] uppercase text-[10px] sm:text-xs font-light mb-12 ml-4">
            The Wedding Celebration of
          </p>

          <h1 className="text-7xl md:text-[110px] lg:text-[140px] font-medium italic text-burgundy leading-none tracking-tight drop-shadow-md">
            Tommy
          </h1>
          
          <div className="flex w-full items-center my-2 pl-24 md:pl-44">
            <span className="text-5xl md:text-7xl font-light italic text-olive/80 drop-shadow-md">&</span>
          </div>

          <h1 className="text-7xl md:text-[110px] lg:text-[140px] font-medium italic text-burgundy leading-none tracking-tight drop-shadow-md ml-12 md:ml-32">
            Linh
          </h1>

          <div className="mt-20 ml-6 flex flex-col sm:flex-row items-start sm:items-center gap-6 sm:gap-12">
            <p className="text-lg md:text-2xl font-light tracking-[0.5em] text-ink drop-shadow-sm">
              17 . 01 . 2027
            </p>
            <div className="hidden sm:block w-12 h-[1px] bg-olive/30"></div>
            <p className="text-xs md:text-sm font-light tracking-[0.4em] uppercase text-ink/80 drop-shadow-sm">
              Ha Noi • Vietnam
            </p>
          </div>

          <button className="mt-16 ml-6 px-12 py-5 bg-transparent text-burgundy hover:bg-burgundy hover:text-surface transition-all duration-700 tracking-[0.3em] uppercase text-xs font-light border border-burgundy/40 shadow-sm rounded-none">
            RSVP
          </button>
        </div>
      </div>

      {/* Viewport Frame Decoration */}
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
