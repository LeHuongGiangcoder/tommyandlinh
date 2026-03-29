"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SplitType from "split-type";

gsap.registerPlugin(ScrollTrigger);

const OurStory = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const meetingTextRef = useRef<HTMLDivElement>(null);
  const proposalTextRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let splits: SplitType[] = [];

    const ctx = gsap.context(() => {
      // Reveal the main section headers
      gsap.from(".story-header-reveal", {
        opacity: 0,
        y: 40,
        duration: 1.5,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 70%",
        }
      });

      // SEQUENTIAL CHARACTER-BY-CHARACTER reveal for Meeting Story
      if (meetingTextRef.current) {
        const paragraphs = meetingTextRef.current.querySelectorAll("p");
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: meetingTextRef.current,
            start: "top 85%",
            end: "bottom 30%",
            scrub: 1,
          }
        });

        paragraphs.forEach((p) => {
          const split = new SplitType(p, { types: 'chars' });
          splits.push(split);
          
          if (split.chars) {
            tl.fromTo(split.chars, 
              { opacity: 0.05 },
              { 
                opacity: 1, 
                stagger: 0.03, // Slight stagger per char
                ease: "none",
              }
            );
          }
        });
      }

      // SEQUENTIAL CHARACTER-BY-CHARACTER reveal for Proposal Story
      if (proposalTextRef.current) {
        const paragraphs = proposalTextRef.current.querySelectorAll("p");
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: proposalTextRef.current,
            start: "top 80%",
            end: "bottom 80%", // Finish earlier so it reveals before reaching the page floor
            scrub: 1,
          }
        });

        paragraphs.forEach((p) => {
          const split = new SplitType(p, { types: 'chars' });
          splits.push(split);

          if (split.chars) {
            tl.fromTo(split.chars, 
              { opacity: 0.05 },
              { 
                opacity: 1, 
                stagger: 0.02,
                ease: "none",
              }
            );
          }
        });
      }

      // Image Parallax/Reveal
      gsap.from(".story-image", {
        opacity: 0,
        scale: 1.05,
        duration: 2,
        ease: "power2.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 60%",
        }
      });
    }, sectionRef);

    const handleResize = () => {
       splits.forEach(s => s.split());
    };
    window.addEventListener('resize', handleResize);

    return () => {
       ctx.revert();
       window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <section ref={sectionRef} className="relative pt-24 md:pt-40 pb-56 md:pb-80 bg-surface overflow-hidden">
      {/* Background Texture: Canson 300gsm inspired */}
      <div className="absolute inset-0 opacity-20 pointer-events-none mix-blend-multiply"
        style={{ backgroundImage: 'url("https://www.transparenttextures.com/patterns/natural-paper.png")' }}
      />

      <div className="container mx-auto px-6 md:px-12 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col items-center mb-20 md:mb-32 story-header-reveal">
           <span className="text-xs md:text-sm tracking-[0.5em] uppercase text-olive font-light mb-4">Our Journey</span>
           <h2 className="text-4xl md:text-6xl font-heading text-burgundy italic">The Story of Us</h2>
           <div className="w-16 h-[1px] bg-olive/20 mt-8"></div>
        </div>

        {/* Part 1: How We Met (Asymmetric Layout) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center mb-32 md:mb-56">
          <div className="lg:col-span-5 relative story-image">
            <div className="relative aspect-[4/5] w-full overflow-hidden group">
              <Image 
                src="/2.jpg" 
                alt="Our first meeting" 
                fill 
                className="object-cover"
              />
              <div className="absolute inset-0 ring-1 ring-inset ring-black/5"></div>
            </div>
            {/* Corner Accent Detail */}
            <div className="absolute -top-6 -left-6 w-24 h-24 border-t border-l border-olive/30 pointer-events-none"></div>
          </div>

          <div className="lg:col-span-1"></div>

          <div className="lg:col-span-6 space-y-8 pt-8 lg:pt-0" ref={meetingTextRef}>
             <div className="flex items-center gap-4 highlight-reveal">
                <span className="text-[10px] tracking-[0.4em] uppercase text-olive/60 font-medium">Chapter I</span>
                <div className="flex-1 h-[0.5px] bg-olive/10"></div>
             </div>
             <h3 className="text-3xl md:text-4xl font-heading text-burgundy">How we met</h3>
             <p className="text-ink/80 leading-relaxed font-light text-lg md:text-xl md:leading-loose max-w-2xl">
                It all started in the most unexpected way in Colorado. We first crossed paths while working at a small
                marketing company, but it was a business trip to Vail that changed everything. At the time, neither of us
                could have imagined how significant that trip would become.
             </p>
             <p className="text-ink/80 leading-relaxed font-light text-lg md:text-xl md:leading-loose italic border-l border-olive/20 pl-6 py-2">
                &ldquo;We quickly bonded over the things that mattered most to us: our closeness with family, the challenges we had overcome, and our hopes for the future.&rdquo;
             </p>
             <p className="text-ink/80 leading-relaxed font-light text-lg md:text-xl md:leading-loose max-w-2xl">
                What started as a strong friendship slowly grew into something deeper. From navigating long distance to eventually moving in together amidst the pandemic, our relationship grew into a partnership filled with laughter, support, and love.
             </p>
          </div>
        </div>

        {/* Part 2: The Proposal (Reversed Asymmetric) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-6 lg:order-1 order-2 space-y-8" ref={proposalTextRef}>
             <div className="flex items-center gap-4 highlight-reveal">
                <div className="flex-1 h-[0.5px] bg-olive/10"></div>
                <span className="text-[10px] tracking-[0.4em] uppercase text-olive/60 font-medium">Chapter II</span>
             </div>
             <h3 className="text-3xl md:text-4xl font-heading text-burgundy">The Proposal</h3>
             <p className="text-ink/80 leading-relaxed font-light text-lg md:text-xl md:leading-loose">
                On an early autumn day several years ago, what began as a simple day turned into one of the most meaningful moments of our lives.
                Tommy planned a trip to see the golden aspens changing. After an unforgettable 11-mile hike through rugged mountain terrain, we reached the breathtaking Crystal Mill in Colorado.
             </p>
             <p className="text-ink/80 leading-relaxed font-light text-lg md:text-xl md:leading-loose italic border-l border-olive/20 pl-6 py-2">
                &ldquo;Surrounded by the stillness of the mountains and the beauty of the moment, everything seemed to fall into place.&rdquo;
             </p>
             <p className="text-ink/80 leading-relaxed font-light text-lg md:text-xl md:leading-loose">
                There, with a full heart and a quiet certainty, Tommy got down on one knee. Flustered and completely overjoyed, Linh said yes. It wasn’t perfect in the traditional sense, but it was perfect for us: thoughtful, adventurous, and filled with love.
             </p>
             <div className="pt-6">
                <p className="text-ink/60 text-sm tracking-widest font-light italic">
                  Five years later, we celebrate where the journey brought us.
                </p>
             </div>
          </div>

          <div className="lg:col-span-1 lg:order-2"></div>

          <div className="lg:col-span-5 lg:order-3 order-1 relative story-image">
            <div className="relative aspect-[4/5] w-full overflow-hidden group">
              <Image 
                src="/3.jpg" 
                alt="The proposal moment" 
                fill 
                className="object-cover"
              />
              <div className="absolute inset-0 ring-1 ring-inset ring-black/5"></div>
            </div>
            {/* Overlapping small accent img or detail */}
            <div className="absolute -bottom-10 -right-10 w-40 h-40 hidden md:block">
              <div className="relative w-full h-full bg-surface p-2 border border-burgundy/5 rotate-3">
                 <div className="relative w-full h-full overflow-hidden">
                   <Image src="/4.jpg" alt="Detail" fill className="object-cover" />
                 </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Background Floral Accents (Subtle silhouettes) */}
      <div className="absolute bottom-[-10%] left-[-5%] w-[40%] h-[60%] opacity-5 pointer-events-none rotate-12">
        <svg viewBox="0 0 100 100" className="w-full h-full text-olive fill-current">
          <path d="M50 0 C40 20 20 40 0 50 C20 60 40 80 50 100 C60 80 80 60 100 50 C80 40 60 20 50 0" />
        </svg>
      </div>
    </section>
  );
};

export default OurStory;
