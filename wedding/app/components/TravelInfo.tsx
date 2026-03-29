"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Plane, FileText, Globe, Smartphone, MapPin, Compass, ExternalLink } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const TravelInfo = () => {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Reveal header
      gsap.from(".travel-header-reveal", {
        opacity: 0,
        y: 30,
        duration: 1.2,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
        }
      });

      // Stagger reveal cards
      gsap.from(".travel-card", {
        opacity: 0,
        y: 40,
        stagger: 0.2,
        duration: 1,
        ease: "power2.out",
        scrollTrigger: {
          trigger: ".travel-grid",
          start: "top 85%",
        }
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="travel" className="relative py-24 md:py-40 bg-surface">
      {/* Background Texture Integration */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none mix-blend-multiply"
        style={{ backgroundImage: 'url("https://www.transparenttextures.com/patterns/natural-paper.png")' }}
      />

      <div className="container mx-auto px-6 md:px-12 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col items-center mb-20 md:mb-32 travel-header-reveal">
           <span className="text-xs md:text-sm tracking-[0.5em] uppercase text-olive font-light mb-4 text-center">Plan Your Trip</span>
           <h2 className="text-4xl md:text-6xl font-heading text-burgundy italic text-center">Visa & Travel</h2>
           <div className="w-16 h-[1px] bg-olive/20 mt-8"></div>
        </div>

        {/* Part 5: Plan Your Trip - Essentials */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-32 items-start">
          
          {/* Visa Information */}
          <div className="travel-card bg-white/40 border border-olive/10 p-8 md:p-12 space-y-8 h-full">
            <div className="flex items-center gap-4 text-burgundy">
               <FileText className="w-6 h-6 stroke-1" />
               <h3 className="text-2xl font-heading tracking-wide">Visa (E-Visa)</h3>
            </div>
            
            <div className="space-y-6 text-ink/80 font-light leading-relaxed">
              <p>
                If you are a US citizen, you must obtain a visa to enter Vietnam. The process is simple, affordable, and completed entirely online. 
                <span className="block mt-2 text-sm italic text-olive">Note: Some nationalities may qualify for exemptions (typically 30–45 days).</span>
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-4 border-t border-olive/5">
                <div>
                   <span className="block text-[10px] tracking-[0.2em] uppercase text-olive/60 mb-1">Fee</span>
                   <p className="text-burgundy font-medium">$25 (Single) / $50 (Multiple)</p>
                </div>
                <div>
                   <span className="block text-[10px] tracking-[0.2em] uppercase text-olive/60 mb-1">Processing</span>
                   <p className="text-burgundy font-medium">3–5 Business Days</p>
                </div>
              </div>

              <div className="space-y-3">
                <span className="block text-[10px] tracking-[0.2em] uppercase text-olive/60">What You'll Need</span>
                <ul className="text-sm space-y-2 list-disc pl-4 marker:text-olive">
                  <li>Passport valid for 6+ months with at least one blank page</li>
                  <li>Scanned passport bio page & 4×6 cm digital photo</li>
                  <li>Credit/debit card for online payment</li>
                </ul>
              </div>

              <a href="https://evisa.gov.vn" target="_blank" rel="noopener noreferrer" 
                 className="inline-flex items-center gap-2 px-6 py-3 bg-burgundy text-surface text-xs tracking-widest uppercase hover:bg-burgundy/90 transition-all">
                Vietnam E-Visa Portal <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </div>

          {/* Apps & Connectivity */}
          <div className="space-y-8 h-full">
            {/* Where to Stay */}
            <div className="travel-card bg-burgundy/5 border border-burgundy/5 p-8 md:p-10">
               <div className="flex items-center gap-4 text-burgundy mb-6">
                 <MapPin className="w-6 h-6 stroke-1" />
                 <h3 className="text-2xl font-heading tracking-wide">Where to Stay</h3>
               </div>
               <p className="text-ink/80 font-light leading-relaxed mb-6">
                 Hanoi offers amazing value for hotels. We recommend staying near <strong className="text-burgundy underline decoration-burgundy/20 underline-offset-4">Hoan Kiem Lake</strong> to be in the center of everything.
               </p>
               <div className="grid grid-cols-2 gap-4 text-sm">
                 <div className="p-4 bg-white/60">
                    <span className="block text-olive text-[10px] uppercase tracking-tighter mb-1 font-bold">Old Quarter</span>
                    <p className="text-ink/60 text-xs">Best for first-time visitors, food, and walkability.</p>
                 </div>
                 <div className="p-4 bg-white/60">
                    <span className="block text-olive text-[10px] uppercase tracking-tighter mb-1 font-bold">French Quarter</span>
                    <p className="text-ink/60 text-xs">Quieter, more upscale, beautiful architecture.</p>
                 </div>
               </div>
            </div>

            {/* Apps */}
            <div className="travel-card bg-olive/[0.03] border border-olive/5 p-8 md:p-10">
               <div className="flex items-center gap-4 text-olive mb-6">
                 <Smartphone className="w-6 h-6 stroke-1" />
                 <h3 className="text-2xl font-heading tracking-wide text-burgundy">Connectivity & Apps</h3>
               </div>
               <div className="space-y-6">
                 <div className="flex items-start gap-4">
                   <Globe className="w-5 h-5 text-olive/60 mt-1" />
                   <div>
                     <p className="text-sm font-medium text-ink">E-SIM Options</p>
                     <p className="text-xs text-ink/60 mt-1">We recommend ByteSim or Gigago. 5GB/day is more than enough.</p>
                   </div>
                 </div>
                 <div className="flex items-start gap-4">
                   <Compass className="w-5 h-5 text-olive/60 mt-1" />
                   <div>
                     <p className="text-sm font-medium text-ink">Essential Apps</p>
                     <p className="text-xs text-ink/60 mt-1">Grab (transport & food), Xanh SM (electric taxi), Zalo (communication).</p>
                   </div>
                 </div>
                 <div className="flex gap-4 pt-2">
                    <div className="w-10 h-10 relative bg-white rounded-lg p-1 border border-black/5 shadow-sm overflow-hidden">
                       <Image src="/grab.jpg" alt="Grab" fill className="object-contain" />
                    </div>
                    <div className="w-10 h-10 relative bg-white rounded-lg p-1 border border-black/5 shadow-sm overflow-hidden">
                       <Image src="/xanhsm.png" alt="Xanh SM" fill className="object-contain" />
                    </div>
                    <div className="w-10 h-10 relative bg-white rounded-lg p-1 border border-black/5 shadow-sm overflow-hidden">
                       <Image src="/be.jpeg" alt="Be" fill className="object-contain" />
                    </div>
                    <div className="w-10 h-10 relative bg-white rounded-lg p-1 border border-black/5 shadow-sm overflow-hidden">
                       <Image src="/zalo.jpg" alt="Zalo" fill className="object-contain" />
                    </div>
                 </div>
               </div>
            </div>
          </div>
        </div>

        {/* Section 6: Let's Explore */}
        <div className="relative">
          <div className="mb-16">
             <h3 className="text-3xl md:text-4xl font-heading text-burgundy">Let's Explore</h3>
             <p className="text-olive/80 font-light mt-2 italic">A few highlights to discover during your stay</p>
          </div>

          <div className="travel-grid grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Hanoi */}
            <div className="travel-card group">
              <div className="relative aspect-[4/5] overflow-hidden mb-6">
                <Image src="/5.jpg" alt="Hanoi" fill className="object-cover transition-transform duration-1000 group-hover:scale-105" />
                <div className="absolute inset-0 bg-burgundy/10 mix-blend-overlay"></div>
              </div>
              <h4 className="text-xl font-heading text-burgundy mb-2">Hanoi — Culture & Cuisine</h4>
              <p className="text-sm text-ink/70 font-light leading-relaxed">
                Experience the Temple of Literature, Hoan Kiem Lake, and the lively Old Quarter. Unforgettable street food and history awaiting at every corner.
              </p>
            </div>

            {/* Ha Long Bay */}
            <div className="travel-card group">
              <div className="relative aspect-[4/5] overflow-hidden mb-6">
                <Image src="/6.jpg" alt="Ha Long Bay" fill className="object-cover transition-transform duration-1000 group-hover:scale-105" />
                <div className="absolute inset-0 bg-burgundy/10 mix-blend-overlay"></div>
              </div>
              <h4 className="text-xl font-heading text-burgundy mb-2">Ha Long Bay — Cruise</h4>
              <p className="text-sm text-ink/70 font-light leading-relaxed">
                One of the New Seven Wonders of Nature. An overnight cruise takes you through thousands of limestone islands. Highly recommended.
              </p>
            </div>

            {/* Ninh Binh */}
            <div className="travel-card group">
              <div className="relative aspect-[4/5] overflow-hidden mb-6">
                <Image src="/7.jpg" alt="Ninh Binh" fill className="object-cover transition-transform duration-1000 group-hover:scale-105" />
                <div className="absolute inset-0 bg-burgundy/10 mix-blend-overlay"></div>
              </div>
              <h4 className="text-xl font-heading text-burgundy mb-2">Ninh Binh — Nature</h4>
              <p className="text-sm text-ink/70 font-light leading-relaxed">
                Known as "Ha Long Bay on land." Breathtaking landscapes of limestone mountains, peaceful rivers, and lush rice fields.
              </p>
            </div>
          </div>

          <div className="mt-20 p-8 border border-dashed border-olive/30 bg-white/40 text-center max-w-4xl mx-auto travel-card">
              <p className="text-burgundy italic font-medium">
                "Please RSVP if you are interested in any of the above activities so we can coordinate with a local travel agency."
              </p>
          </div>
        </div>

      </div>

      {/* Aesthetic Border Accent */}
      <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-olive/20 to-transparent"></div>
    </section>
  );
};

export default TravelInfo;
