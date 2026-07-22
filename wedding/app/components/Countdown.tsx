"use client";

import { useEffect, useState, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { MapPin } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

const Countdown = ({ lang = 'en' }: { lang?: 'en' | 'vi' }) => {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  const sectionRef = useRef<HTMLElement>(null);
  
  const translations = {
    en: {
      title: "Saving the Celebration",
      subtitle: "Until our forever starts",
      days: "Days",
      hours: "Hours",
      minutes: "Minutes",
      seconds: "Seconds",
      time: "03:00 PM",
      placeName: "Nang Song Hong Restaurant"
    },
    vi: {
      title: "Ghi dấu ngày hạnh phúc",
      subtitle: "Cho đến khi chúng mình thuộc về nhau",
      days: "Ngày",
      hours: "Giờ",
      minutes: "Phút",
      seconds: "Giây",
      time: "15:00",
      placeName: "Nhà hàng Nắng Sông Hồng"
    }
  };

  const t = translations[lang];

  const daysOfWeek = {
    en: ['MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN'],
    vi: ['T2', 'T3', 'T4', 'T5', 'T6', 'T7', 'CN']
  }[lang];

  const weekDates = [11, 12, 13, 14, 15, 16, 17];

  // Wedding Date: January 17, 2027
  const targetDate = new Date("2027-01-17T10:00:00").getTime();

  useEffect(() => {
    const calculateTimeLeft = () => {
      const now = new Date().getTime();
      const difference = targetDate - now;

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60),
        });
      }
    };

    const timer = setInterval(calculateTimeLeft, 1000);
    calculateTimeLeft();

    // GSAP Scroll Reveal
    const ctx = gsap.context(() => {
       gsap.from(".countdown-reveal", {
          opacity: 0,
          y: 30,
          duration: 1.5,
          ease: "power3.out",
          stagger: 0.2,
          scrollTrigger: {
             trigger: sectionRef.current,
             start: "top 85%",
          }
       });
    }, sectionRef);

    return () => {
       clearInterval(timer);
       ctx.revert();
    };
  }, [targetDate]);

  const TimeBlock = ({ value, label }: { value: number; label: string }) => (
    <div className="flex flex-col items-center min-w-[80px] md:min-w-[120px] countdown-reveal">
      <div className="text-4xl md:text-6xl font-heading text-surface mb-2 leading-none">
        {String(value).padStart(2, '0')}
      </div>
      <div className="text-[10px] md:text-xs tracking-[0.4em] uppercase text-[#d4af37] font-medium text-center">
        {label}
      </div>
    </div>
  );

  return (
    <section ref={sectionRef} className="relative py-24 md:py-32 bg-burgundy overflow-hidden flex flex-col items-center justify-center">
      {/* Signature Grain Texture Overlay */}
      <div className="absolute inset-0 opacity-[0.05] texture-grain pointer-events-none mix-blend-overlay" />
      
      {/* Decorative Border Line */}
      <div className="absolute top-0 inset-x-0 h-[1px] bg-gradient-to-r from-transparent via-surface/20 to-transparent" />
      
      <div className="container mx-auto px-6 relative z-10 flex flex-col items-center">
        {/* Title Accents */}
        <div className="flex flex-col items-center mb-16 space-y-4 countdown-reveal">
          <div className="w-12 h-[1px] bg-surface/30"></div>
          <h2 className="text-xl md:text-2xl font-heading text-surface tracking-[0.3em] uppercase italic px-4 text-center">
            {t.title}
          </h2>
          <div className="w-12 h-[1px] bg-surface/30"></div>
        </div>

        {/* The Grid */}
        <div className="flex flex-wrap justify-center gap-8 md:gap-16">
          <TimeBlock value={timeLeft.days} label={t.days} />
          <div className="hidden md:block w-[1px] h-12 bg-surface/10 self-center" />
          <TimeBlock value={timeLeft.hours} label={t.hours} />
          <div className="hidden md:block w-[1px] h-12 bg-surface/10 self-center" />
          <TimeBlock value={timeLeft.minutes} label={t.minutes} />
          <div className="hidden md:block w-[1px] h-12 bg-surface/10 self-center" />
          <TimeBlock value={timeLeft.seconds} label={t.seconds} />
        </div>

        <p className="mt-14 text-[10px] md:text-xs tracking-[0.5em] uppercase text-[#d4af37] font-medium text-center countdown-reveal">
          {t.subtitle}
        </p>

        {/* Subtle Ornamental Divider */}
        <div className="w-16 h-[1px] bg-[#d4af37]/30 my-8 countdown-reveal" />

        {/* Mini Calendar Strip (Matching reference aesthetic) */}
        <div className="flex flex-col items-center countdown-reveal">
          <div className="text-[11px] md:text-xs tracking-[0.4em] uppercase text-surface/70 font-medium mb-6 italic">
            {lang === 'vi' ? 'Tháng 01 / 2027' : 'January 2027'}
          </div>

          <div className="grid grid-cols-7 gap-3 sm:gap-6 md:gap-8 text-center max-w-sm sm:max-w-md mx-auto mb-8">
            {daysOfWeek.map((day, idx) => {
              const dateNum = weekDates[idx];
              const isWeddingDay = dateNum === 17;

              return (
                <div key={day} className="flex flex-col items-center gap-2">
                  <span className="text-[10px] md:text-[11px] tracking-widest text-[#d4af37]/80 font-medium">
                    {day}
                  </span>
                  <div className="relative flex items-center justify-center w-7 h-7 sm:w-8 sm:h-8">
                    {isWeddingDay ? (
                      <div className="relative flex items-center justify-center">
                        <svg className="w-7 h-7 text-[#d4af37] drop-shadow-sm" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                        </svg>
                        <span className="absolute inset-0 flex items-center justify-center text-[10px] md:text-[11px] font-bold text-burgundy">
                          17
                        </span>
                      </div>
                    ) : (
                      <span className="text-xs md:text-sm font-light text-surface/60">
                        {dateNum}
                      </span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Place & Map Link */}
          <div className="flex flex-col sm:flex-row items-center gap-3 md:gap-5 text-center mt-2">
            <span className="text-sm md:text-base font-light italic text-surface tracking-wider">
              {t.time}
            </span>
            <span className="hidden sm:inline text-[#d4af37]/40">•</span>
            <span className="text-sm md:text-base font-light italic text-surface tracking-wider">
              {t.placeName}
            </span>
            <span className="hidden sm:inline text-[#d4af37]/40">•</span>
            <a 
              href="https://maps.app.goo.gl/7rc24Rsz3fxFfnLh9" 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-xs tracking-[0.2em] uppercase text-[#d4af37] hover:text-surface border-b border-[#d4af37]/40 hover:border-surface pb-0.5 transition-all duration-300 font-medium"
            >
              <MapPin className="w-3.5 h-3.5 text-[#d4af37]" />
              <span>{lang === 'vi' ? 'Xem bản đồ' : 'Google Maps'}</span>
              <span className="text-[10px]">↗</span>
            </a>
          </div>
        </div>
      </div>

      {/* Decorative Bottom Corner flourish */}
      <div className="absolute bottom-0 inset-x-0 h-[1px] bg-gradient-to-r from-transparent via-surface/20 to-transparent" />
    </section>
  );
};

export default Countdown;
