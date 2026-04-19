"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import gsap from "gsap";
import { MotionPathPlugin } from "gsap/MotionPathPlugin";
import Countdown from "./components/Countdown";
import OurStory from "./components/OurStory";
import TravelInfo from "./components/TravelInfo";
import FAQ from "./components/FAQ";

import Navbar from "./components/Navbar";
import SnowEffect from "./components/SnowEffect";
import ThankYou from "./components/ThankYou";

export default function Home() {
  const [isStarted, setIsStarted] = useState(false);
  const [isEnvelopeOpening, setIsEnvelopeOpening] = useState(false);
  const [lang, setLang] = useState<'en' | 'vi'>('en');
  const containerRef = useRef<HTMLElement>(null);
  
  useEffect(() => {
    gsap.registerPlugin(MotionPathPlugin);
  }, []);
  
  // Translation dictionary for current page content
  const t = {
    en: {
      celebration: "The Wedding Celebration of",
      date: "01 . 17 . 2027",
      location: "Ha Noi • Vietnam",
      open: "Open",
      scroll: "Scroll to explore",
      hint: "Kindly open the invitation",
      visaGuide: "Visa guide",
      toggle: "VI"
    },
    vi: {
      celebration: "Lễ Thành Hôn Của",
      date: "17 . 01 . 2027",
      location: "Hà Nội • Việt Nam",
      open: "Mở",
      scroll: "Cuộn để xem tiếp",
      hint: "Trân trọng mời mở thiệp",
      visaGuide: "Hướng dẫn Visa",
      toggle: "EN"
    }
  };

  const currentT = t[lang];
  const tommyRef = useRef<HTMLHeadingElement>(null);
  const ampRef = useRef<HTMLSpanElement>(null);
  const linhRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    if (!isStarted) return;
    // Real Camera Shutter Sound (Tách)
    const playShutterSound = () => {
      // @ts-expect-error - Global window object augmentation for shutter sound
      const audio = window._shutter;
      if (audio) {
        audio.play().catch((err: unknown) => {
          console.warn("Shutter sound blocked by browser:", err);
        });
      }
    };

    const ctx = gsap.context(() => {
      // Small Delay before sequence to catch early interactions
      const tl = gsap.timeline({ delay: 0.1 });

      // 0. Cinematic Camera Focus (Lấy Nét)
      tl.fromTo(
        ".hero-image",
        { filter: "blur(40px) brightness(0.6)" },
        { filter: "blur(0px) brightness(1)", duration: 2.8, ease: "power2.inOut" }
      )
      // Focus Brackets Pulse
      .fromTo(
        ".focus-brackets",
        { opacity: 0, scale: 1.2 },
        { opacity: 1, scale: 1, duration: 1.2, ease: "back.out(1.7)" },
        "-=2.4"
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
        "-=0.6"
      );

    }, containerRef);

    return () => ctx.revert();
  }, [isStarted]);

  const handleOpenEnvelope = () => {
    if (isEnvelopeOpening) return;
    setIsEnvelopeOpening(true);

    // CRITICAL FOR MOBILE: Prime the audio engine on first user click.
    // iOS blocks any audio not started by a direct user action.
    const shutter = new Audio(encodeURI("/camera shutter.mp4"));
    shutter.load(); // Pre-load
    // @ts-expect-error - Adding shutter to global window object
    window._shutter = shutter;

    // Dispatch a "pre-warm" event for the music player too
    window.dispatchEvent(new CustomEvent('warmup_audio'));

    const tl = gsap.timeline({
      onComplete: () => {
        // Complete the sequence by starting the cinematic transition
        setIsStarted(true);
      }
    });

    // 1. Envelope Flap Opens (0-0.8s)
    tl.to(".envelope-flap", {
      rotateX: -180,
      duration: 0.8,
      ease: "power3.inOut"
    }, 0);

    // Swap Z-index at halfway point (0.4s) so flap falls behind letter
    tl.set(".top-flap-wrapper", { zIndex: 5 }, 0.3);

    // Deepen inner shadow of flap as it opens
    tl.to(".envelope-flap-shadow", {
      opacity: 0.1,
      duration: 0.4
    }, 0.4);

    // Fade out button and visual hints
    tl.to([".envelope-button", ".leaf-guide", ".hand-hint"], {
      opacity: 0,
      scale: 0.8,
      duration: 0.4,
      ease: "power2.inOut"
    }, 0);

    // 2. Corner Shapes Morph to Leaves (0.4-1.2s)
    tl.to(".corner-shape-path", {
      opacity: 0,
      duration: 0.4,
      ease: "power1.inOut",
      stagger: 0.2
    }, 0.4);
    tl.to(".leaf-path", {
      opacity: 0.8,
      duration: 0.4,
      ease: "power1.inOut",
      stagger: 0.2
    }, 0.4);

    // 3. Leaves Float Away (1.0-2.5s)
    tl.to(".leaf-container-1", {
      motionPath: {
        path: [{x: 0, y: 0}, {x: 80, y: -150}, {x: 120, y: -250}, {x: 200, y: -400}],
        curviness: 1.5
      },
      scale: 1.1,
      rotation: 360,
      opacity: 0,
      duration: 1.5,
      ease: "power1.in",
    }, 1.0);
    
    tl.to(".leaf-container-2", {
      motionPath: {
        path: [{x: 0, y: 0}, {x: -80, y: -150}, {x: -120, y: -250}, {x: -200, y: -400}],
        curviness: 1.5
      },
      scale: 1.1,
      rotation: -360,
      opacity: 0,
      duration: 1.5,
      ease: "power1.in",
    }, 1.2);

    // Letter Content Reveals (1.5-2.0s)
    // First, show the hidden wrapper
    tl.set(".letter-content", { display: "flex" }, 1.5);
    
    // Shift envelope slightly down to accommodate the top flap on small viewports
    tl.to(".envelope-ritual-container > div:last-child", {
      y: 60,
      duration: 1,
      ease: "power2.inOut"
    }, 0.1);

    tl.fromTo(".letter-content", 
      { yPercent: 0, opacity: 0, scale: 0.95 },
      { yPercent: -45, opacity: 1, scale: 1, duration: 0.8, ease: "back.out(1.4)" },
      1.5
    );
    
    // Smooth transition to main content
    tl.to(".envelope-ritual-container", {
      opacity: 0,
      duration: 1.2,
      ease: "power2.inOut"
    }, "+=0.5");
    
    tl.set({}, { 
      onComplete: () => setIsStarted(true)
    });
  };

  return (
    <main 
      ref={containerRef} 
      className={`min-h-screen w-full relative flex flex-col bg-surface ${lang === 'vi' ? 'font-vi' : ''} ${!isStarted ? 'overflow-hidden h-screen' : ''}`}
    >
      {isStarted && <Navbar lang={lang} setLang={setLang} />}
      {/* Landing Envelope Ritual */}
      {!isStarted && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-olive overflow-hidden envelope-ritual-container">
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
          
          {/* Grain Texture Overlay */}
          <div className="absolute inset-0 opacity-[0.12] texture-grain pointer-events-none mix-blend-overlay" />

          <div className="relative flex items-center justify-center animate-in fade-in zoom-in duration-1000">
            
            {/* THE ENVELOPE ASSEMBLY */}
            <div className="relative w-[340px] h-[240px] md:w-[500px] md:h-[350px] bg-surface shadow-[0_50px_100px_-20px_rgba(0,0,0,0.5)] flex items-center justify-center border border-burgundy/5 overflow-visible">
              
              {/* Envelope Texture Layer (Canson 300gsm) */}
              <div className="absolute inset-0 opacity-15 pointer-events-none" 
                style={{ backgroundImage: 'url("https://www.transparenttextures.com/patterns/tileable-wood.png")' }} 
              />

              {/* Envelope Construction: Side and Bottom Flaps */}
              <div className="absolute inset-0 pointer-events-none z-20">
                <svg className="w-full h-full drop-shadow-[0_-4px_12px_rgba(0,0,0,0.08)]" preserveAspectRatio="none" viewBox="0 0 100 100">
                  {/* Left Flap */}
                  <polygon points="0,0 50,50 0,100" fill="#f0ebe1" stroke="rgba(86,40,50,0.12)" strokeWidth="1" vectorEffect="non-scaling-stroke" />
                  {/* Right Flap */}
                  <polygon points="100,0 50,50 100,100" fill="#eae5db" stroke="rgba(86,40,50,0.12)" strokeWidth="1" vectorEffect="non-scaling-stroke" />
                  {/* Bottom Flap */}
                  <polygon points="0,100 100,100 50,50" fill="#fcfbf7" stroke="rgba(86,40,50,0.08)" strokeWidth="1" vectorEffect="non-scaling-stroke" />
                </svg>
              </div>

              {/* THE TOP FLAP (Overlapping others) */}
              <div className="absolute top-0 left-0 w-full h-[55%] pointer-events-none z-30 top-flap-wrapper" style={{ perspective: '1000px' }}>
                <div className="absolute top-0 left-0 w-full h-full origin-top will-change-transform envelope-flap" style={{ transformStyle: 'preserve-3d' }}>
                  <svg className="w-full h-full drop-shadow-[0_4px_10px_rgba(0,0,0,0.08)]" preserveAspectRatio="none" viewBox="0 0 100 100">
                    <polygon points="0,0 100,0 50,100" fill="#fcfbf7" stroke="rgba(86,40,50,0.15)" strokeWidth="1" vectorEffect="non-scaling-stroke" />
                  </svg>
                  {/* Add inner shadow for flap flip realism */}
                  <div className="absolute inset-0 bg-burgundy/5 opacity-0 envelope-flap-shadow" style={{ clipPath: 'polygon(0 0, 100% 0, 50% 100%)' }}></div>
                </div>
              </div>

              {/* BOTANICAL ELEMENTS (Enhanced placement) */}
              <div className="absolute -top-16 -right-16 w-48 h-48 md:w-64 md:h-64 z-[60] pointer-events-none drop-shadow-lg opacity-90 scale-90 translate-x-4 leaf-container-1 will-change-transform">
                 <svg viewBox="0 0 200 200" className="w-full h-full text-white fill-current">
                   <path className="corner-shape-path" d="M100,60 Q130,20 160,60 T200,60 Q180,100 160,90 T100,130" opacity="0.9" />
                   <path className="corner-shape-path text-olive/30" d="M120,80 Q100,40 80,80 T40,80 Q60,110 80,100 T120,130" opacity="0.6" />
                   <circle cx="103" cy="65" r="4" className="corner-shape-path text-burgundy/20" />
                   {/* Authentic Maple Leaf shape (initially hidden) */}
                   <g className="leaf-path opacity-0 text-[#562832]" transform="scale(0.32) translate(50, 50)">
                     <path d="M383.8 351.7c2.5-2.5 105.2-92.4 105.2-92.4l-17.5-7.5c-10-4.9-7.4-11.5-5-17.4 2.4-7.6 20.1-67.3 20.1-67.3s-47.7 10-57.7 12.5c-7.5 2.4-10-2.5-12.5-7.5s-15-32.4-15-32.4-52.6 59.9-55.1 62.3c-10 7.5-20.1 0-17.6-10 0-10 27.6-129.6 27.6-129.6s-30.1 17.4-40.1 22.4c-7.5 5-12.6 5-17.6-5C293.5 72.3 255.9 0 255.9 0s-37.5 72.3-42.5 79.8c-5 10-10 10-17.6 5-10-5-40.1-22.4-40.1-22.4S183.3 182 183.3 192c2.5 10-7.5 17.5-17.6 10-2.5-2.5-55.1-62.3-55.1-62.3S98.1 167 95.6 172s-5 9.9-12.5 7.5C73 177 25.4 167 25.4 167s17.6 59.7 20.1 67.3c2.4 6 5 12.5-5 17.4L23 259.3s102.6 89.9 105.2 92.4c5.1 5 10 7.5 5.1 22.5-5.1 15-10.1 35.1-10.1 35.1s95.2-20.1 105.3-22.6c8.7-.9 18.3 2.5 18.3 12.5S241 512 241 512h30s-5.8-102.7-5.8-112.8 9.5-13.4 18.4-12.5c10 2.5 105.2 22.6 105.2 22.6s-5-20.1-10-35.1 0-17.5 5-22.5z"/>
                   </g>
                 </svg>
              </div>
              <div className="absolute -bottom-16 -left-16 w-48 h-48 md:w-64 md:h-64 z-[60] pointer-events-none drop-shadow-lg opacity-80 scale-110 leaf-container-2 will-change-transform">
                 <svg viewBox="0 0 200 200" className="w-full h-full text-white fill-current">
                   <path className="corner-shape-path" d="M40,140 Q10,120 40,100 T40,60 Q70,80 60,100 T90,130" />
                   <path className="corner-shape-path text-olive/10" d="M60,160 Q30,140 60,120 T60,80 Q90,100 80,120 T110,150" opacity="0.4" />
                   {/* Authentic Maple Leaf shape (initially hidden) */}
                   <g className="leaf-path opacity-0 text-[#562832]" transform="rotate(180 100 100) scale(0.32) translate(50, 50)">
                     <path d="M383.8 351.7c2.5-2.5 105.2-92.4 105.2-92.4l-17.5-7.5c-10-4.9-7.4-11.5-5-17.4 2.4-7.6 20.1-67.3 20.1-67.3s-47.7 10-57.7 12.5c-7.5 2.4-10-2.5-12.5-7.5s-15-32.4-15-32.4-52.6 59.9-55.1 62.3c-10 7.5-20.1 0-17.6-10 0-10 27.6-129.6 27.6-129.6s-30.1 17.4-40.1 22.4c-7.5 5-12.6 5-17.6-5C293.5 72.3 255.9 0 255.9 0s-37.5 72.3-42.5 79.8c-5 10-10 10-17.6 5-10-5-40.1-22.4-40.1-22.4S183.3 182 183.3 192c2.5 10-7.5 17.5-17.6 10-2.5-2.5-55.1-62.3-55.1-62.3S98.1 167 95.6 172s-5 9.9-12.5 7.5C73 177 25.4 167 25.4 167s17.6 59.7 20.1 67.3c2.4 6 5 12.5-5 17.4L23 259.3s102.6 89.9 105.2 92.4c5.1 5 10 7.5 5.1 22.5-5.1 15-10.1 35.1-10.1 35.1s95.2-20.1 105.3-22.6c8.7-.9 18.3 2.5 18.3 12.5S241 512 241 512h30s-5.8-102.7-5.8-112.8 9.5-13.4 18.4-12.5c10 2.5 105.2 22.6 105.2 22.6s-5-20.1-10-35.1 0-17.5 5-22.5z"/>
                   </g>
                 </svg>
              </div>

              {/* The Wax Seal Button Assembly */}
              <div className="relative z-50 flex flex-col items-center">
                
                {/* Visual Guide: (Simplified per user request: No rings, just pulsing leaf) */}

                <button 
                  onClick={handleOpenEnvelope}
                  className="relative w-24 h-24 md:w-28 md:h-28 rounded-full bg-burgundy transition-all duration-700 flex flex-col items-center justify-center group active:scale-95 hover:scale-105 envelope-button shadow-[0_15px_35px_-5px_rgba(86,40,50,0.5)]"
                >
                  <div className="absolute inset-1.5 rounded-full border border-white/20 opacity-30"></div>
                  <div className="absolute inset-0 rounded-full bg-gradient-to-br from-white/20 to-transparent opacity-20 pointer-events-none"></div>
                  
                  {/* Maple Leaf Ritual Guide (Blinking/Pulsing) */}
                  <div className="absolute inset-0 flex items-center justify-center pointer-events-none leaf-guide animate-touch-pulse">
                    <svg className="w-12 h-12 md:w-16 md:h-16 text-white fill-current opacity-40 translate-y-[-2px]" viewBox="0 0 512 512">
                      <path d="M383.8 351.7c2.5-2.5 105.2-92.4 105.2-92.4l-17.5-7.5c-10-4.9-7.4-11.5-5-17.4 2.4-7.6 20.1-67.3 20.1-67.3s-47.7 10-57.7 12.5c-7.5 2.4-10-2.5-12.5-7.5s-15-32.4-15-32.4-52.6 59.9-55.1 62.3c-10 7.5-20.1 0-17.6-10 0-10 27.6-129.6 27.6-129.6s-30.1 17.4-40.1 22.4c-7.5 5-12.6 5-17.6-5C293.5 72.3 255.9 0 255.9 0s-37.5 72.3-42.5 79.8c-5 10-10 10-17.6 5-10-5-40.1-22.4-40.1-22.4S183.3 182 183.3 192c2.5 10-7.5 17.5-17.6 10-2.5-2.5-55.1-62.3-55.1-62.3S98.1 167 95.6 172s-5 9.9-12.5 7.5C73 177 25.4 167 25.4 167s17.6 59.7 20.1 67.3c2.4 6 5 12.5-5 17.4L23 259.3s102.6 89.9 105.2 92.4c5.1 5 10 7.5 5.1 22.5-5.1 15-10.1 35.1-10.1 35.1s95.2-20.1 105.3-22.6c8.7-.9 18.3 2.5 18.3 12.5S241 512 241 512h30s-5.8-102.7-5.8-112.8 9.5-13.4 18.4-12.5c10 2.5 105.2 22.6 105.2 22.6s-5-20.1-10-35.1 0-17.5 5-22.5z"/>
                    </svg>
                  </div>

                  <span className="text-[11px] md:text-xs font-heading text-surface tracking-[0.4em] uppercase mb-1 drop-shadow-lg italic">{currentT.open}</span>
                  <div className="w-6 h-[0.5px] bg-white/40" />
                </button>

                {/* Elegant Hand Hint (Pointing and tapping) */}
                <div className="absolute -bottom-8 -right-8 md:-bottom-10 md:-right-10 pointer-events-none z-[60] animate-hand-point opacity-0 hand-hint">
                  <svg width="52" height="52" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="opacity-80 drop-shadow-[0_8px_16px_rgba(0,0,0,0.4)] rotate-[-15deg]">
                    <path d="M18 11V6a2 2 0 0 0-2-2v0a2 2 0 0 0-2 2v0" />
                    <path d="M14 10V4a2 2 0 0 0-2-2v0a2 2 0 0 0-2 2v2" />
                    <path d="M10 10.5V6a2 2 0 0 0-2-2v0a2 2 0 0 0-2 2v8" />
                    <path d="M18 8a2 2 0 1 1 4 0v6a8 8 0 0 1-8 8h-2c-2.8 0-4.5-.86-5.99-2.34l-3.6-3.6a2 2 0 0 1 2.82-2.82L9 15" />
                  </svg>
                </div>
              </div>

              {/* Inner Letter Detail */}
              <div className="absolute inset-0 z-10 flex flex-col items-center justify-end pb-2 sm:pb-4 letter-content hidden will-change-transform">
                <div className="w-[90%] h-[85%] bg-[#fdfbf7] shadow-[0_-5px_15px_rgba(0,0,0,0.06)] border border-burgundy/10 flex flex-col items-center justify-center pt-10 pb-4 text-center px-4">
                  <span className="text-[13px] md:text-[18px] font-heading font-light tracking-[0.15em] md:tracking-[0.2em] italic text-olive/80 mb-3 block">We can&apos;t wait to see you!</span>
                  <div className="w-12 h-[1px] bg-olive/20 mb-4 mx-auto" />
                  <span className="text-[17px] md:text-[28px] font-heading font-medium tracking-[0.25em] md:tracking-[0.3em] text-burgundy uppercase drop-shadow-sm">TOMMY & LINH</span>
                </div>
              </div>
            </div>

            {/* Overall Ambient Lighting */}
            <div className="absolute inset-0 pointer-events-none bg-radial-gradient(circle, transparent 40%, black 100%) opacity-30" />
          </div>
        </div>
      )}
      {/* Cinematic Hero Section */}
      <section id="hero" className="relative w-full h-screen overflow-hidden flex flex-col shrink-0">
        {/* Immersive Hero Image */}
        <div className="absolute inset-0 z-0">
        <Image
          src="/1.webp"
          alt="Tommy & Linh Wedding"
          fill
          priority
          sizes="100vw"
          className="hero-image object-cover object-[75%_center] md:object-[80%_50%] will-change-transform translate-z-0"
          style={{ filter: "blur(40px) brightness(0.6)" }}
        />
        {/* Cinematic gradient overlay sweeping right */}
        <div className="absolute inset-0 bg-gradient-to-r from-surface/98 via-surface/40 to-transparent w-full md:w-[85%] z-0" />
        {/* Subtle top/bottom framing gradients */}
        <div className="absolute inset-0 bg-gradient-to-t from-surface/90 via-transparent to-surface/30 z-0" />
        {/* Extra localized soft backdrop for names on mobile */}
        <div className="absolute inset-0 bg-radial-gradient(circle at 30% 50%, white/40, transparent 60%) md:hidden opacity-60 z-0" />
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
          
          {/* Centered Group: Title + Tommy */}
          <div className="flex flex-col items-center w-fit">
            <div className="fade-up opacity-0 flex flex-col items-center mb-6 mt-12 text-center pointer-events-none">
              {/* Classic Ornamental Divider */}
              <div className="flex items-center gap-4 mb-4">
                <div className="h-[1px] w-12 md:w-16 bg-gradient-to-r from-transparent to-olive/60"></div>
                <svg className="w-3 md:w-3.5 h-3 md:h-3.5 text-olive" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 1L13.5 10.5L23 12L13.5 13.5L12 23L10.5 13.5L1 12L10.5 10.5L12 1Z" opacity="0.8" />
                </svg>
                <div className="h-[1px] w-12 md:w-16 bg-gradient-to-l from-transparent to-olive/60"></div>
              </div>

              <p className="text-olive/90 tracking-[0.4em] ml-[0.4em] uppercase text-[10px] md:text-xs font-light">
                {currentT.celebration}
              </p>
            </div>

            <h1 ref={tommyRef} className="text-6xl md:text-[110px] lg:text-[140px] font-heading font-medium italic text-burgundy leading-none tracking-tight drop-shadow-sm opacity-0" style={{ clipPath: "inset(0 100% 0 0)" }}>
              Tommy
            </h1>
          </div>
          
          <div className="flex w-full items-center my-0 pl-20 md:pl-44 -mt-1 md:-mt-2">
            <span ref={ampRef} className="text-4xl md:text-7xl font-heading font-light italic text-olive/80 drop-shadow-sm opacity-0" style={{ clipPath: "inset(0 100% 0 0)" }}>&amp;</span>
          </div>

          <h1 ref={linhRef} className="text-6xl md:text-[110px] lg:text-[140px] font-heading font-medium italic text-burgundy leading-none tracking-tight drop-shadow-sm ml-8 md:ml-32 -mt-1 md:-mt-2 opacity-0" style={{ clipPath: "inset(0 100% 0 0)" }}>
            Linh
          </h1>

          <div className="mt-8 md:mt-10 flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-12 ml-4 md:ml-6 fade-up opacity-0">
            <p className="text-md md:text-2xl font-light tracking-[0.4em] text-ink/90 drop-shadow-sm">
              {currentT.date}
            </p>
            <div className="hidden sm:block w-12 h-[1px] bg-olive/30"></div>
            <p className="text-[10px] md:text-sm font-light tracking-[0.3em] uppercase text-ink/70 drop-shadow-sm">
              {currentT.location}
            </p>
          </div>

          <a href="#travel" className="fade-up opacity-0 mt-8 mb-20 md:mb-0 ml-4 md:ml-6 inline-block">
            <button className="px-10 md:px-12 py-4 md:py-5 bg-white/10 backdrop-blur-[2px] text-burgundy hover:bg-burgundy hover:text-surface transition-all duration-700 tracking-[0.3em] uppercase text-[11px] md:text-xs font-medium border border-burgundy/60 shadow-sm rounded-none">
              {currentT.visaGuide}
            </button>
          </a>
        </div>

        {/* Ultra-Minimal Scroll Hint - Just a breathing line */}
        <div className="absolute bottom-6 md:bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center fade-up opacity-0 pointer-events-none z-30">
          <div className="w-[1px] h-10 md:h-12 bg-gradient-to-b from-olive/40 via-olive/10 to-transparent relative overflow-hidden">
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
        <Countdown lang={lang} />
      </div>

      {isStarted && (
        <>
          <OurStory key={`story-${lang}`} lang={lang} />
          <TravelInfo key={`travel-${lang}`} lang={lang} />
          {/* <RSVP key={`rsvp-${lang}`} lang={lang} /> */}
          <FAQ key={`faq-${lang}`} lang={lang} />
          <ThankYou key={`thank-${lang}`} lang={lang} />
        </>
      )}

    </main>
  );
}
