"use client";

import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const ThankYou = ({ lang = 'en' }: { lang?: 'en' | 'vi' }) => {
  const sectionRef = useRef<HTMLElement>(null);

  const t = {
    en: {
      message: "Thank you for being part of our story",
      signature: "With Love, Tommy & Linh",
      date: "January 17, 2027"
    },
    vi: {
      message: "Cảm ơn bạn đã là một phần trong câu chuyện của tụi mình",
      signature: "Thân mến, Tommy & Linh",
      date: "Ngày 17 tháng 01 năm 2027"
    }
  }[lang];

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(".thank-reveal", 
        { opacity: 0, y: 20 },
        { 
          opacity: 1, 
          y: 0, 
          duration: 1.5, 
          ease: "power2.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%",
            toggleActions: "play none none none"
          }
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, [lang]);

  return (
    <section 
      ref={sectionRef} 
      className="relative py-32 md:py-48 bg-burgundy overflow-hidden"
    >
      {/* Texture Overlays */}
      <div className="absolute inset-0 opacity-[0.05] pointer-events-none mix-blend-multiply"
        style={{ backgroundImage: 'url("https://www.transparenttextures.com/patterns/natural-paper.png")' }}
      />
      <div className="absolute inset-0 opacity-[0.08] texture-grain pointer-events-none mix-blend-overlay" />
      
      {/* Decorative SVGs */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
         <div className="absolute top-10 left-10 w-32 h-32 md:w-64 md:h-64 border-t border-l border-white/10" />
         <div className="absolute bottom-10 right-10 w-32 h-32 md:w-64 md:h-64 border-b border-r border-white/10" />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="flex flex-col items-center justify-center text-center thank-reveal">
           {/* Minimal Ornament */}
           <div className="w-1.5 h-1.5 rounded-full bg-[#d4af37] mb-12 shadow-[0_0_10px_#d4af37]" />
           
           <h2 className="text-3xl md:text-5xl lg:text-6xl font-heading text-surface italic leading-tight max-w-4xl mb-16 drop-shadow-lg">
             &quot;{t.message}&quot;
           </h2>

           <div className="space-y-6">
              <div className="h-[0.5px] w-24 bg-gradient-to-r from-transparent via-white/40 to-transparent mx-auto" />
              <p className="text-[12px] md:text-sm tracking-[0.6em] uppercase text-[#d4af37] font-medium drop-shadow-md">
                {t.signature}
              </p>
              <p className="text-[10px] tracking-[0.4em] uppercase text-white/40 font-light translate-y-2">
                {t.date}
              </p>
           </div>
           
           {/* Final Botanical Shadow */}
           <div className="mt-24 opacity-[0.05] text-white">
              <svg viewBox="0 0 512 512" className="w-16 h-16 md:w-20 md:h-20 fill-current">
                 <path d="M383.8 351.7c2.5-2.5 105.2-92.4 105.2-92.4l-17.5-7.5c-10-4.9-7.4-11.5-5-17.4 2.4-7.6 20.1-67.3 20.1-67.3s-47.7 10-57.7 12.5c-7.5 2.4-10-2.5-12.5-7.5s-15-32.4-15-32.4-52.6 59.9-55.1 62.3c-10 7.5-20.1 0-17.6-10 0-10 27.6-129.6 27.6-129.6s-30.1 17.4-40.1 22.4c-7.5 5-12.6 5-17.6-5C293.5 72.3 255.9 0 255.9 0s-37.5 72.3-42.5 79.8c-5 10-10 10-17.6 5-10-5-40.1-22.4-40.1-22.4S183.3 182 183.3 192c2.5 10-7.5 17.5-17.6 10-2.5-2.5-55.1-62.3-55.1-62.3S98.1 167 95.6 172s-5 9.9-12.5 7.5C73 177 25.4 167 25.4 167s17.6 59.7 20.1 67.3c2.4 6 5 12.5-5 17.4L23 259.3s102.6 89.9 105.2 92.4c5.1 5 10 7.5 5.1 22.5-5.1 15-10.1 35.1-10.1 35.1s95.2-20.1 105.3-22.6c8.7-.9 18.3 2.5 18.3 12.5S241 512 241 512h30s-5.8-102.7-5.8-112.8 9.5-13.4 18.4-12.5c10 2.5 105.2 22.6 105.2 22.6s-5-20.1-10-35.1 0-17.5 5-22.5z"/>
              </svg>
           </div>
        </div>
      </div>
    </section>
  );
};

export default ThankYou;
