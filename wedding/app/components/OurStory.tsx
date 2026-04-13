"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SplitType from "split-type";

gsap.registerPlugin(ScrollTrigger);

const OurStory = ({ lang = 'en' }: { lang?: 'en' | 'vi' }) => {
  const sectionRef = useRef<HTMLElement>(null);
  const meetingTextRef = useRef<HTMLDivElement>(null);
  const proposalTextRef = useRef<HTMLDivElement>(null);

  const t = {
    en: {
      journey: "Our Journey",
      storyTitle: "The Story of Us",
    },
    vi: {
      journey: "Hành Trình Tình Yêu",
      storyTitle: "Câu Chuyện Của Chúng Mình",
    }
  }[lang];

  const chapters = [
    {
      id: "beginning",
      num: "01",
      chapter: lang === 'en' ? "Chapter I" : "Chương I",
      title: lang === 'en' ? "The Spark" : "Khởi đầu bất ngờ",
      content: lang === 'en' 
        ? "It all started in the most unexpected way in Colorado. We first crossed paths while working at a small marketing company, but it was a business trip to Vail that changed everything. At the time, neither of us could have imagined how significant that trip would become."
        : "Mọi chuyện bắt đầu theo một cách rất bất ngờ tại Colorado. Tụi mình lần đầu gặp nhau khi cùng làm việc tại một công ty marketing nhỏ, nhưng chính chuyến công tác đến Vail đã thay đổi tất cả. Lúc đó, không ai trong tụi mình có thể nghĩ rằng chuyến đi ấy lại trở nên đặc biệt đến vậy.",
      images: ["/7.webp", "/12.webp"]
    },
    {
      id: "growth",
      num: "02",
      chapter: lang === 'en' ? "Chapter II" : "Chương II",
      title: lang === 'en' ? "Growing Together" : "Sự đồng hành",
      content: lang === 'en'
        ? "What started as a strong friendship slowly grew into something deeper. From navigating long distance to eventually moving in together amidst the pandemic, our relationship grew into a partnership filled with laughter, support, and love."
        : "Tụi mình nhanh chóng kết nối qua những điều quan trọng nhất: tình cảm dành cho gia đình, những thử thách đã từng trải qua, những ước mơ và định hướng trong tương lai. Từ một tình bạn mộc mạc, mọi thứ dần trở nên sâu sắc hơn lúc nào không hay. Qua nhiều giai đoạn thăng trầm và những biến cố của cuộc sống, mối quan hệ ấy dần trở thành một sự đồng hành vững chắc, nơi luôn có tiếng cười, sự sẻ chia và tình yêu.",
      images: ["/8.webp", "/11.webp", "/14.webp"]
    },
    {
      id: "adventure",
      num: "03",
      chapter: lang === 'en' ? "Chapter III" : "Chương III",
      title: lang === 'en' ? "The Adventure" : "Hành trình phiêu lưu",
      content: lang === 'en'
        ? "On an early autumn day several years ago, what began as a simple day turned into one of the most meaningful moments of our lives. Tommy planned a trip to see the golden aspens changing. After an unforgettable 11-mile hike through rugged mountain terrain, we reached the breathtaking Crystal Mill in Colorado."
        : "Tommy đã lên kế hoạch cho một chuyến đi thường niên để ngắm lá vàng mùa thu. Nhưng thật ra anh đã âm thầm chuẩn bị cho một điều đặc biệt hơn rất nhiều. Sau hành trình trekking 18 km, gặp cả động vật hoang dã, Tommy và Linh đặt chân đến Crystal Mill, một nơi có khung cảnh thiên nhiên đẹp đến nao lòng.",
      images: ["/6.webp", "/5.webp"]
    },
    {
      id: "proposal",
      num: "04",
      chapter: lang === 'en' ? "Chapter IV" : "Chương IV",
      title: lang === 'en' ? "The Proposal" : "Lời cầu hôn",
      content: lang === 'en'
        ? "There, with a full heart and a quiet certainty, Tommy got down on one knee. Flustered and completely overjoyed, Linh said yes. It wasn’t perfect in the traditional sense, but it was perfect for us: thoughtful, adventurous, and filled with love."
        : "Tại đó, với tất cả sự chân thành, Tommy đã quỳ gối, hỏi câu hỏi mà anh đã giữ trong lòng suốt nhiều tháng: “Em sẽ lấy anh chứ?”. Tuy đó không phải là một màn cầu hôn hoàn hảo theo kiểu truyền thống, nhưng lại hoàn hảo theo cách riêng của tụi mình: đầy chân thành, có chút phiêu lưu, và trọn vẹn yêu thương.",
      images: ["/3.webp", "/10.webp", "/13.webp"]
    }
  ];

  useEffect(() => {
    let splits: SplitType[] = [];

    const ctx = gsap.context(() => {
      // Main Pinning Logic
      const sections = gsap.utils.toArray(".chapter-section");
      
      // Reveal Title initially
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

      // Sticky Story Scroll Logic (Elyse Residence Style)
      const pinWrapper = sectionRef.current?.querySelector('.story-pin-wrapper');
      const slides = gsap.utils.toArray('.chapter-slide') as HTMLElement[];
      
      if (pinWrapper) {
        // Reset transform origin and initial scale safely
        gsap.set('.story-progress-fill', { transformOrigin: 'top center', scaleY: 0 });

        // 1. Global Progress Line Animation
        gsap.to('.story-progress-fill', {
          scaleY: 1,
          ease: "none",
          scrollTrigger: {
            trigger: pinWrapper,
            start: "top top",
            end: "+=800%", 
            scrub: 1,
          }
        });

        // 2. Cross-fade Chapter Animation & Image Reveal
        if (slides.length > 0) {
          const tl = gsap.timeline({
            scrollTrigger: {
              trigger: pinWrapper,
              start: "top top",
              end: "+=800%",
              scrub: 1, 
              pin: true, 
              anticipatePin: 1
            }
          });

          slides.forEach((slide, i) => {
            const content = slide.querySelector('.chapter-content');
            const images = gsap.utils.toArray(slide.querySelectorAll('.chapter-image-item')) as HTMLElement[];

            // Initialize states
            if (i > 0) {
              gsap.set(slide, { zIndex: slides.length - i, autoAlpha: 0 });
              gsap.set(content, { opacity: 0, y: 50 });
              gsap.set(images, { opacity: 0, scale: 0.9, y: 30 });
            } else {
              gsap.set(slide, { opacity: 1, zIndex: slides.length, autoAlpha: 1 });
            }

            const readingStep = "read" + i;
            tl.add(readingStep);

            // Phase 1: Scroll to Read & Discard Top Images 
            let accumulatedDuration = 0;
            // Loop from the top image down, leaving the bottom-most image (j=0)
            for (let j = images.length - 1; j > 0; j--) {
               const img = images[j];
               tl.to(img, { 
                   xPercent: 120, // Slide out to the right
                   yPercent: 20, 
                   rotation: (j % 2 === 0 ? 15 : -15),
                   opacity: 0, 
                   scale: 1.2, 
                   duration: 1.5, 
                   ease: "power2.inOut" 
               }, readingStep + "+=" + accumulatedDuration);
               accumulatedDuration += 1.5;
            }
            
            // Give the last image a pause to be admired
            tl.to({}, { duration: 1 }, readingStep + "+=" + accumulatedDuration);
            accumulatedDuration += 1;

            // Phase 2: Slide Transition
            if (i < slides.length - 1) {
              const nextSlide = slides[i + 1];
              const nextContent = nextSlide.querySelector('.chapter-content');
              const nextImages = nextSlide.querySelectorAll('.chapter-image-item');
              
              const transStep = "trans" + i;
              tl.add(transStep, readingStep + "+=" + accumulatedDuration);

              tl.set(nextSlide, { autoAlpha: 1, pointerEvents: "auto" }, transStep)
                .to(content, { opacity: 0, y: -40, duration: 1.5 }, transStep)
                .to(images, { opacity: 0, scale: 0.95, y: -20, duration: 1.5 }, transStep)
                .to(nextContent, { opacity: 1, y: 0, duration: 1.5 }, transStep)
                .to(nextImages, { opacity: 1, scale: 1, y: 0, duration: 1.5, stagger: 0.1 }, transStep)
                .set(slide, { autoAlpha: 0, pointerEvents: "none" }, transStep + "+=1.5");
            }
          });
        }
      }

      // Background floral parallax
      gsap.to(".floral-bg", {
        y: -150,
        rotate: 15,
        scale: 1.1,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: 1
        }
      });

    }, sectionRef);

    return () => ctx.revert();
  }, [lang]);

  return (
    <section id="story" ref={sectionRef} className="relative bg-surface overflow-visible">
      {/* Signature Grain Overlay cho Section (Bị cuộn đi theo thông thường) */}
      <div className="absolute inset-0 opacity-[0.08] texture-grain pointer-events-none mix-blend-multiply transition-opacity duration-1000" />
      <div className="absolute inset-0 opacity-20 pointer-events-none mix-blend-multiply"
        style={{ backgroundImage: 'url("https://www.transparenttextures.com/patterns/natural-paper.png")' }}
      />

      {/* Intro Header */}
      <div className="container mx-auto px-6 md:px-12 relative z-10 w-full">
        <div className="flex flex-col items-center pt-32 pb-20 story-header-reveal text-center h-[60vh] justify-center">
           <span className="text-[10px] md:text-xs tracking-[0.6em] uppercase text-olive font-medium mb-6 animate-fade-in">{t.journey}</span>
           <h2 className="text-4xl md:text-8xl font-heading text-burgundy italic leading-tight max-w-4xl drop-shadow-sm">{t.storyTitle}</h2>
           <div className="w-20 h-[0.5px] bg-olive/30 mt-12 mx-auto"></div>
        </div>
      </div>

      {/* GSAP Pin Container for Chapters - Gói trọn Background để khóa chặt */}
      <div className="story-pin-wrapper relative w-full h-screen flex items-center justify-center overflow-hidden bg-surface">
          {/* Static Backgrounds for the Pin Container to prevent sliding parity */}
          <div className="absolute inset-0 opacity-[0.08] texture-grain pointer-events-none mix-blend-multiply" />
          <div className="absolute inset-0 opacity-20 pointer-events-none mix-blend-multiply"
            style={{ backgroundImage: 'url("https://www.transparenttextures.com/patterns/natural-paper.png")' }}
          />
          
          <div className="container mx-auto px-6 md:px-12 relative z-10 w-full h-full">
            
            {/* Global Progress Grid Overlay */}
            <div className="absolute inset-0 w-full h-full pointer-events-none z-30 flex items-center justify-center">
               <div className="container mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 h-full">
                  <div className="lg:col-span-5 h-full relative">
                     <div className="absolute left-0 top-1/2 -translate-y-1/2 h-[40vh] w-[1px] bg-olive/20 hidden lg:block overflow-hidden">
                        <div className="story-progress-fill absolute top-0 left-0 w-full h-full bg-burgundy" />
                     </div>
                  </div>
                  <div className="lg:col-span-1 hidden lg:block"></div>
                  <div className="lg:col-span-6"></div>
               </div>
            </div>
            
            {chapters.map((chap, idx) => (
              <div 
                key={chap.id} 
                className="chapter-slide absolute inset-0 w-full h-full grid grid-cols-1 lg:grid-cols-12 gap-12 items-center"
                style={{ opacity: idx === 0 ? 1 : 0, pointerEvents: idx === 0 ? 'auto' : 'none' }}
              >
                
                {/* Left Column: Semantic Storytelling */}
                <div className="chapter-content lg:col-span-5 h-full flex flex-col justify-center space-y-10 py-12 lg:py-0 px-6 md:px-0 lg:pl-12 z-20">
                  <div className="flex items-center gap-6">
                    <span className="text-5xl md:text-8xl font-heading text-olive/10 italic select-none">{chap.num}</span>
                    <div className="flex-1 h-[0.5px] bg-olive/10"></div>
                  </div>
                  
                  <div className="space-y-8">
                    <span className="text-[10px] tracking-[0.5em] uppercase text-olive/50 font-semibold block">
                      {chap.chapter}
                    </span>
                    <h3 className="text-4xl md:text-6xl font-heading text-burgundy leading-tight">
                      {chap.title}
                    </h3>
                    <p className="text-ink/80 leading-relaxed font-normal text-lg md:text-2xl md:leading-relaxed max-w-lg">
                      {chap.content}
                    </p>
                  </div>

                  <div className="flex items-center gap-4">
                     <div className="w-12 h-[0.5px] bg-olive/20"></div>
                     <div className="w-1.5 h-1.5 rounded-full border border-olive/20" />
                  </div>
                </div>

                <div className="lg:col-span-1 hidden lg:block"></div>

                {/* Right Column: Layered Cinematic Gallery */}
                <div className="chapter-images lg:col-span-6 relative h-[50vh] lg:h-full flex items-center justify-center pointer-events-none">
                  <div className="relative w-full aspect-[4/5] flex items-center justify-center pointer-events-auto">
                    {chap.images.map((img, i) => (
                      <div 
                        key={img} 
                        className="chapter-image-item absolute w-[70%] md:w-[65%] aspect-[3/4] overflow-hidden shadow-[0_30px_60px_-15px_rgba(0,0,0,0.3)] bg-surface"
                        style={{ 
                          left: i === 0 ? "5%" : i === 1 ? "20%" : "35%", 
                          top: i === 0 ? "5%" : i === 1 ? "15%" : "25%",
                          zIndex: 10 + i,
                          transform: `rotate(${i === 0 ? '-2deg' : i === 1 ? '3deg' : '-1deg'})`
                        }}
                      >
                        <Image 
                          src={img} 
                          alt={chap.title} 
                          fill 
                          className="object-cover transition-transform duration-[2s] hover:scale-105"
                          sizes="(max-width: 768px) 100vw, 50vw"
                          priority={idx === 0}
                        />
                        <div className="absolute inset-0 ring-1 ring-inset ring-black/5 pointer-events-none"></div>
                        {/* Subtle Vignette */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-40 pointer-events-none" />
                      </div>
                    ))}
                  </div>
                </div>

              </div>
            ))}
          </div>
        </div>

        {/* Conclusion / Transition to next section */}
        <div className="container mx-auto px-6 md:px-12 relative z-10 w-full">
          <div className="min-h-screen flex flex-col items-center justify-center text-center space-y-12">
              <div className="flex items-center justify-center gap-6 opacity-20">
                  <div className="w-12 h-[0.5px] bg-olive"></div>
                  <div className="w-2 h-2 rotate-45 border border-olive"></div>
                  <div className="w-12 h-[0.5px] bg-olive"></div>
              </div>

              <p className="text-3xl md:text-5xl font-heading text-burgundy italic leading-tight max-w-4xl mx-auto drop-shadow-sm px-4">
                 “Five years later, we celebrate where the journey brought us.”
              </p>

              <div className="pt-8">
                 <div className="w-[0.5px] h-24 bg-gradient-to-b from-olive/40 to-transparent mx-auto"></div>
              </div>
          </div>
        </div>

      {/* Background Floral Accents */}
      <div className="floral-bg absolute bottom-[-5%] right-[-5%] w-[40%] h-[60%] opacity-5 pointer-events-none rotate-12">
        <svg viewBox="0 0 100 100" className="w-full h-full text-olive fill-current">
          <path d="M50 0 C40 20 20 40 0 50 C20 60 40 80 50 100 C60 80 80 60 100 50 C80 40 60 20 50 0" />
        </svg>
      </div>
    </section>
  );
};

export default OurStory;
