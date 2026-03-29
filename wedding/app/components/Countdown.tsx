"use client";

import { useEffect, useState, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

const Countdown = () => {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  const sectionRef = useRef<HTMLElement>(null);
  
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
      <div className="text-[10px] md:text-xs tracking-[0.4em] uppercase text-surface/50 font-light text-center">
        {label}
      </div>
    </div>
  );

  return (
    <section ref={sectionRef} className="relative py-24 md:py-32 bg-burgundy overflow-hidden flex flex-col items-center justify-center">
      {/* Texture Overlay (Royal Damask inspired) */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none mix-blend-overlay"
        style={{ backgroundImage: 'url("https://www.transparenttextures.com/patterns/royal-line.png")' }}
      />
      
      {/* Decorative Border Line */}
      <div className="absolute top-0 inset-x-0 h-[1px] bg-gradient-to-r from-transparent via-surface/20 to-transparent" />
      
      <div className="container mx-auto px-6 relative z-10 flex flex-col items-center">
        {/* Title Accents */}
        <div className="flex flex-col items-center mb-16 space-y-4 countdown-reveal">
          <div className="w-12 h-[1px] bg-surface/30"></div>
          <h2 className="text-xl md:text-2xl font-heading text-surface tracking-[0.3em] uppercase italic px-4 text-center">
            Saving the Celebration
          </h2>
          <div className="w-12 h-[1px] bg-surface/30"></div>
        </div>

        {/* The Grid */}
        <div className="flex flex-wrap justify-center gap-8 md:gap-16">
          <TimeBlock value={timeLeft.days} label="Days" />
          <div className="hidden md:block w-[1px] h-12 bg-surface/10 self-center" />
          <TimeBlock value={timeLeft.hours} label="Hours" />
          <div className="hidden md:block w-[1px] h-12 bg-surface/10 self-center" />
          <TimeBlock value={timeLeft.minutes} label="Minutes" />
          <div className="hidden md:block w-[1px] h-12 bg-surface/10 self-center" />
          <TimeBlock value={timeLeft.seconds} label="Seconds" />
        </div>

        <p className="mt-16 text-[10px] md:text-xs tracking-[0.5em] uppercase text-surface/40 font-light countdown-reveal">
          Until our forever starts
        </p>
      </div>

      {/* Decorative Bottom Corner flourish */}
      <div className="absolute bottom-0 inset-x-0 h-[1px] bg-gradient-to-r from-transparent via-surface/20 to-transparent" />
    </section>
  );
};

export default Countdown;
