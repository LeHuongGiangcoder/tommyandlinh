"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import gsap from "gsap";
import SnowEffect from "./components/SnowEffect";
import Countdown from "./components/Countdown";
import OurStory from "./components/OurStory";

export default function Home() {
  const [isStarted, setIsStarted] = useState(false);
  const containerRef = useRef<HTMLElement>(null);
  const tommyRef = useRef<HTMLHeadingElement>(null);
  const ampRef = useRef<HTMLSpanElement>(null);
  const linhRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    if (!isStarted) return;
    // Real Camera Shutter Sound (Tách)
    const playShutterSound = () => {
      const audio = new Audio(encodeURI("/camera shutter.mp4"));
      audio.play().catch((err) => {
        console.warn("Shutter sound blocked by browser:", err);
      });
    };

    const ctx = gsap.context(() => {
      // Small Delay before sequence to catch early interactions
      const tl = gsap.timeline({ delay: 0.8 });

      // 0. Cinematic Camera Focus (Lấy Nét)
      tl.fromTo(
        ".hero-image",
        { filter: "blur(20px) brightness(0.8)", scale: 1.1 },
        { filter: "blur(0px) brightness(1)", scale: 1, duration: 2.2, ease: "power2.inOut" }
      )
      // Focus Brackets Pulse
      .fromTo(
        ".focus-brackets",
        { opacity: 0, scale: 1.2 },
        { opacity: 1, scale: 1, duration: 1.2, ease: "back.out(1.7)" },
        "-=2"
      )
      .to(".focus-brackets", { 
        opacity: 0, 
        scale: 0.9, 
        duration: 0.4, 
        ease: "power2.in",
        onComplete: () => {
          playShutterSound();
          gsap.to(".shutter-flash", { opacity: 0.6, duration: 0.05, yoyo: true, repeat: 1 });
        }
      }, "-=0.3")
      
      // Dramatic Pause (1s) after the shutter "Capture"
      .to({}, { duration: 1.2 }) 
      
      // 1. Handwriting Sequence: Starts after the pause
      .add(() => {
        window.dispatchEvent(new CustomEvent('play_wedding_music'));
      })
      .fromTo(
        tommyRef.current,
        { clipPath: "inset(0 100% 0 0)", opacity: 0 },
        { clipPath: "inset(0 0% 0 0)", opacity: 1, duration: 1.6, ease: "power3.inOut" }
      )
      .fromTo(
        ampRef.current,
        { clipPath: "inset(0 100% 0 0)", opacity: 0 },
        { clipPath: "inset(0 0% 0 0)", opacity: 1, duration: 1.2, ease: "power3.inOut" },
        "-=0.8"
      )
      .fromTo(
        linhRef.current,
        { clipPath: "inset(0 100% 0 0)", opacity: 0 },
        { clipPath: "inset(0 0% 0 0)", opacity: 1, duration: 1.6, ease: "power3.inOut" },
        "-=0.8"
      )
      // 2. Detail Reveal
      .fromTo(
        ".fade-up",
        { opacity: 0, y: 15 },
        { opacity: 1, y: 0, duration: 1.2, ease: "power2.out", stagger: 0.2 },
        "-=0.4"
      );

    }, containerRef);

    return () => ctx.revert();
  }, [isStarted]);

  return (
    <main ref={containerRef} className={`min-h-screen w-full relative flex flex-col bg-surface ${!isStarted ? 'overflow-hidden h-screen' : ''}`}>
      {/* Landing Envelope Ritual */}
      {!isStarted && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-olive overflow-hidden">
          {/* Backdrop: Textural Retro Vintage Paper (Olive Tone) */}
          <div className="absolute inset-0 opacity-80 pointer-events-none" 
            style={{ 
              backgroundColor: '#656a52',
              backgroundImage: `url("https://www.transparenttextures.com/patterns/natural-paper.png"), url("https://www.transparenttextures.com/patterns/granite.png")`,
              backgroundBlendMode: 'multiply',
              backgroundSize: '300px, 600px'
            }} 
          />
          <div className="absolute inset-0 bg-gradient-to-tr from-black/20 via-transparent to-black/10 pointer-events-none" />

          <div className="relative flex items-center justify-center animate-in fade-in zoom-in duration-1000">
            
            {/* THE ENVELOPE ASSEMBLY */}
            <div className="relative w-[340px] h-[240px] md:w-[500px] md:h-[350px] bg-surface shadow-[0_50px_100px_-20px_rgba(0,0,0,0.5)] flex items-center justify-center border border-burgundy/5 overflow-visible">
              
              {/* Envelope Texture Layer (Canson 300gsm) */}
              <div className="absolute inset-0 opacity-15 pointer-events-none" 
                style={{ backgroundImage: 'url("https://www.transparenttextures.com/patterns/tileable-wood.png")' }} 
              />

              {/* Envelope Construction: Side and Bottom Flaps */}
              <div className="absolute inset-0 pointer-events-none">
                {/* Left Flap */}
                <div className="absolute inset-0 bg-surface/50 border-r border-burgundy/5" style={{ clipPath: 'polygon(0 0, 50% 50%, 0 100%)' }}></div>
                {/* Right Flap */}
                <div className="absolute inset-0 bg-surface/50 border-l border-burgundy/5" style={{ clipPath: 'polygon(100% 0, 100% 100%, 50% 50%)' }}></div>
                {/* Bottom Flap */}
                <div className="absolute inset-0 bg-[#f8f6f0] border-t border-burgundy/5 shadow-inner" style={{ clipPath: 'polygon(0 100%, 100% 100%, 50% 50%)' }}></div>
              </div>

              {/* THE TOP FLAP (Overlapping others) */}
              <div className="absolute top-0 left-0 w-full h-full pointer-events-none z-20">
                <div className="absolute top-0 left-0 w-full h-[55%] bg-[#fcfbf7] shadow-[0_4px_10px_rgba(0,0,0,0.1)] flex items-center justify-center border-b border-burgundy/5" 
                     style={{ clipPath: 'polygon(0 0, 100% 0, 50% 100%)' }}>
                </div>
              </div>

              {/* BOTANICAL ELEMENTS (Enhanced placement) */}
              <div className="absolute -top-16 -right-16 w-48 h-48 md:w-64 md:h-64 z-40 pointer-events-none drop-shadow-lg opacity-90 scale-90 translate-x-4">
                 <svg viewBox="0 0 200 200" className="w-full h-full text-white fill-current">
                   <path d="M100,60 Q130,20 160,60 T200,60 Q180,100 160,90 T100,130" opacity="0.9" />
                   <path className="text-olive/30" d="M120,80 Q100,40 80,80 T40,80 Q60,110 80,100 T120,130" opacity="0.6" />
                   <circle cx="103" cy="65" r="4" className="text-burgundy/20" />
                 </svg>
              </div>
              <div className="absolute -bottom-16 -left-16 w-48 h-48 md:w-64 md:h-64 z-10 pointer-events-none drop-shadow-lg opacity-80 scale-110">
                 <svg viewBox="0 0 200 200" className="w-full h-full text-white fill-current">
                   <path d="M40,140 Q10,120 40,100 T40,60 Q70,80 60,100 T90,130" />
                   <path className="text-olive/10" d="M60,160 Q30,140 60,120 T60,80 Q90,100 80,120 T110,150" opacity="0.4" />
                 </svg>
              </div>

              {/* The Wax Seal Button (Z-index 50) */}
              <button 
                onClick={() => setIsStarted(true)}
                className="relative z-50 w-24 h-24 md:w-28 md:h-28 rounded-full bg-burgundy shadow-[0_20px_40px_rgba(86,40,50,0.6)] hover:shadow-[0_25px_60px_rgba(86,40,50,0.7)] transition-all duration-700 flex flex-col items-center justify-center group active:scale-95 hover:scale-105"
              >
                <div className="absolute inset-1.5 rounded-full border border-white/20 opacity-30"></div>
                <div className="absolute inset-0 rounded-full bg-gradient-to-br from-white/20 to-transparent opacity-30 pointer-events-none"></div>
                <span className="text-[11px] md:text-xs font-heading text-surface tracking-[0.4em] uppercase mb-1 drop-shadow-lg italic">Open</span>
                <div className="w-6 h-[0.5px] bg-white/40" />
              </button>

              {/* Inner Letter Detail (Barely visible) */}
              <div className="absolute bottom-12 left-0 right-0 flex justify-center opacity-40 z-30">
                 <span className="text-[10px] tracking-[1em] uppercase text-olive font-medium">T & L</span>
              </div>
            </div>

            {/* Overall Ambient Lighting */}
            <div className="absolute inset-0 pointer-events-none bg-radial-gradient(circle, transparent 40%, black 100%) opacity-30" />
          </div>
        </div>
      )}
      {/* Cinematic Hero Section */}
      <section className="relative w-full h-screen overflow-hidden flex flex-col shrink-0">
        {/* Immersive Hero Image */}
        <div className="absolute inset-0 z-0">
        <Image
          src="/1.jpg"
          alt="Tommy & Linh Wedding"
          fill
          priority
          className="hero-image object-cover object-center md:object-[80%_50%]"
        />
        {/* Cinematic gradient overlay sweeping right */}
        <div className="absolute inset-0 bg-gradient-to-r from-surface/95 via-surface/60 to-transparent w-full md:w-[85%]" />
        {/* Subtle top/bottom framing gradients */}
        <div className="absolute inset-0 bg-gradient-to-t from-surface/90 via-transparent to-surface/30" />
      </div>

      {/* Shutter Flash Overlay */}
      <div className="shutter-flash absolute inset-0 bg-white opacity-0 pointer-events-none z-50 pointer-events-none" />

      {/* Camera Focus Brackets (Diểm Lấy Nét) */}
      <div className="focus-brackets absolute inset-0 flex items-center justify-center md:justify-end md:pr-[20%] lg:pr-[25%] pointer-events-none z-40">
        <div className="relative w-24 h-24 md:w-32 md:h-32">
          <div className="absolute top-0 left-0 w-6 h-6 border-t-2 border-l-2 border-white/80" />
          <div className="absolute top-0 right-0 w-6 h-6 border-t-2 border-r-2 border-white/80" />
          <div className="absolute bottom-0 left-0 w-6 h-6 border-b-2 border-l-2 border-white/80" />
          <div className="absolute bottom-0 right-0 w-6 h-6 border-b-2 border-r-2 border-white/80" />
          {/* Subtle sensor dot */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-1 h-1 bg-white/40 rounded-full" />
        </div>
      </div>

      {/* Airy, Dreamy Floating Hero Content */}
      <div className="relative z-10 flex-1 flex flex-col justify-center px-12 sm:px-20 md:px-32 lg:px-44 w-full h-screen">
        
        {/* Unconstrained, flowing text grouping */}
        <div className="flex flex-col items-start w-full relative">
          
          <div className="fade-up opacity-0">
            {/* Centered Divider and Subtitle Block */}
            <div className="flex flex-col items-center self-start mb-6 mt-12 text-center w-full sm:w-auto">
              {/* Classic Ornamental Divider */}
              <div className="flex items-center gap-4 mb-4">
                <div className="h-[1px] w-16 bg-gradient-to-r from-transparent to-olive/60"></div>
                <svg className="w-3.5 h-3.5 text-olive" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 1L13.5 10.5L23 12L13.5 13.5L12 23L10.5 13.5L1 12L10.5 10.5L12 1Z" opacity="0.8" />
                </svg>
                <div className="h-[1px] w-16 bg-gradient-to-l from-transparent to-olive/60"></div>
              </div>

              <p className="text-olive/90 tracking-[0.4em] uppercase text-[10px] sm:text-xs font-light">
                The Wedding Celebration of
              </p>
            </div>
          </div>

          <h1 ref={tommyRef} className="text-7xl md:text-[110px] lg:text-[140px] font-medium italic text-burgundy leading-none tracking-tight drop-shadow-md">
            Tommy
          </h1>
          
          <div className="flex w-full items-center my-0 pl-24 md:pl-44 -mt-2">
            <span ref={ampRef} className="text-5xl md:text-7xl font-light italic text-olive/80 drop-shadow-md">&amp;</span>
          </div>

          <h1 ref={linhRef} className="text-7xl md:text-[110px] lg:text-[140px] font-medium italic text-burgundy leading-none tracking-tight drop-shadow-md ml-12 md:ml-32 -mt-2">
            Linh
          </h1>

          <div className="mt-10 flex flex-col sm:flex-row items-start sm:items-center gap-6 sm:gap-12 ml-6 fade-up opacity-0">
            <p className="text-lg md:text-2xl font-light tracking-[0.5em] text-ink drop-shadow-sm">
              17 . 01 . 2027
            </p>
            <div className="hidden sm:block w-12 h-[1px] bg-olive/30"></div>
            <p className="text-xs md:text-sm font-light tracking-[0.4em] uppercase text-ink/80 drop-shadow-sm">
              Ha Noi • Vietnam
            </p>
          </div>

          <button className="fade-up opacity-0 mt-8 ml-6 px-12 py-5 bg-transparent text-burgundy hover:bg-burgundy hover:text-surface transition-all duration-700 tracking-[0.3em] uppercase text-xs font-light border border-burgundy/40 shadow-sm rounded-none">
            RSVP
          </button>
        </div>

        {/* Ultra-Minimal Scroll Hint - Just a breathing line */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center fade-up opacity-0 pointer-events-none">
          <div className="w-[1px] h-12 bg-gradient-to-b from-olive/40 via-olive/10 to-transparent relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1/2 bg-burgundy/40 animate-scroll-line" />
          </div>
        </div>
      </div>

        {/* Viewport Frame Decoration */}
        <div className="absolute inset-6 md:inset-10 pointer-events-none z-20 hidden sm:block">
          {/* Corner accents */}
          <div className="absolute -top-[1px] -left-[1px] w-8 h-8 border-t border-l border-olive" />
          <div className="absolute -top-[1px] -right-[1px] w-8 h-8 border-t border-r border-olive" />
          <div className="absolute -bottom-[1px] -left-[1px] w-8 h-8 border-b border-l border-olive" />
          <div className="absolute -bottom-[1px] -right-[1px] w-8 h-8 border-b border-r border-olive" />
        </div>

        <SnowEffect />
      </section>

      {/* Countdown Section */}
      <div className="relative z-30">
        <Countdown />
      </div>

      <OurStory />
    </main>
  );
}
