"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SplitType from "split-type";

gsap.registerPlugin(ScrollTrigger);

const OurStory = ({ lang = 'en' }: { lang?: 'en' | 'vi' }) => {
  const sectionRef = useRef<HTMLElement>(null);

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
    // Prevent layout thrashing on mobile browsers when address bar hides/shows
    // fastScrollEnd: snap scrub to final value when user scrolls faster than scrub can keep up
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    ScrollTrigger.config({ ignoreMobileResize: true, fastScrollEnd: true } as any);

    const splits: SplitType[] = [];

    const ctx = gsap.context(() => {
      
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

      // Sticky Story Scroll Logic Settings
      const pinWrapper = sectionRef.current?.querySelector('.story-pin-wrapper');
      const slides = gsap.utils.toArray('.chapter-slide') as HTMLElement[];
      
      const mm = gsap.matchMedia();

      // DESKTOP: Complex pinned cross-fade
      mm.add("(min-width: 768px)", () => {
        if (pinWrapper) {
          gsap.set('.story-progress-fill', { transformOrigin: 'top center', scaleY: 0 });

          gsap.to('.story-progress-fill', {
            scaleY: 1,
            ease: "none",
            scrollTrigger: {
              trigger: pinWrapper,
              start: "top top",
              end: "+=500%", // Reduced from 800% for tighter pacing
              scrub: 1,
            }
          });

          if (slides.length > 0) {
            const tl = gsap.timeline({
              scrollTrigger: {
                trigger: pinWrapper,
                start: "top top",
                end: "+=500%", // Tighter pacing
                scrub: 1, 
                pin: true,
                pinType: "fixed"
              }
            });

            slides.forEach((slide, i) => {
              const content = slide.querySelector('.chapter-content');
              const images = gsap.utils.toArray(slide.querySelectorAll('.chapter-image-item')) as HTMLElement[];

              // Initialize states for desktop
              if (i > 0) {
                gsap.set(slide, { zIndex: slides.length - i, opacity: 0, pointerEvents: "none" });
                gsap.set(content, { opacity: 0, y: 50 });
                gsap.set(images, { opacity: 0, scale: 0.9, y: 30 });
              } else {
                gsap.set(slide, { opacity: 1, zIndex: slides.length, pointerEvents: "auto" });
                gsap.set(images, { opacity: 1, scale: 1, y: 0 }); // ensure first images are visible
              }

              const readingStep = "read" + i;
              tl.add(readingStep);

              // Phase 1: Scroll to Read & Discard Top Images 
              let accumulatedDuration = 0;
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
              
              tl.to({}, { duration: 1 }, readingStep + "+=" + accumulatedDuration);
              accumulatedDuration += 1;

              // Phase 2: Slide Transition
              if (i < slides.length - 1) {
                const nextSlide = slides[i + 1];
                const nextContent = nextSlide.querySelector('.chapter-content');
                const nextImages = nextSlide.querySelectorAll('.chapter-image-item');
                
                const transStep = "trans" + i;
                tl.add(transStep, readingStep + "+=" + accumulatedDuration);

                tl.set(nextSlide, { opacity: 1 }, transStep)
                  .set(nextSlide, { pointerEvents: "auto" }, transStep)
                  .to(content, { opacity: 0, y: -40, duration: 1.5 }, transStep)
                  .to(images, { opacity: 0, scale: 0.95, y: -20, duration: 1.5 }, transStep)
                  .to(nextContent, { opacity: 1, y: 0, duration: 1.5 }, transStep)
                  .to(nextImages, { opacity: 1, scale: 1, y: 0, duration: 1.5, stagger: 0.1 }, transStep)
                  .set(slide, { pointerEvents: "none" }, transStep + "+=1.5")
                  .set(slide, { opacity: 0 }, transStep + "+=1.5");
              }
            });
          }
        }
      });

      // MOBILE: Pinned stack image reveals
      mm.add("(max-width: 767px)", () => {
        // Clear any desktop GSAP state that may have leaked in
        gsap.set(slides, { clearProps: "opacity,transform,pointerEvents" });
        gsap.set('.chapter-content', { clearProps: "opacity,transform,y" });
        gsap.set('.chapter-image-item', { clearProps: "opacity,transform,scale,y,x,xPercent,yPercent,rotation" });

        /**
         * FIX FOR CHROME MOBILE PREMATURE TRIGGER BUG:
         *
         * Root cause: When slides use `position: sticky`, Chrome mobile calculates
         * their bounding rect at their *stuck* position (top:0), not their natural
         * flow position. GSAP ScrollTrigger reads this stuck position, so triggers
         * for chapters 2/3/4 fire immediately at page load (progress already = 1).
         *
         * Solution: Instead of triggering on each `slide` element (which is sticky
         * and gives wrong rects on Chrome), we anchor ALL triggers to the outer
         * `sectionRef` and compute the correct scroll offset manually per chapter.
         * Each chapter occupies 150vh of scroll space in the DOM flow.
         */
        const CHAPTER_HEIGHT_VH = 150; // matches h-[150vh] on .chapter-slide

        slides.forEach((slide, idx) => {
          const content = slide.querySelector('.chapter-content') as HTMLElement | null;
          const images = gsap.utils.toArray(slide.querySelectorAll('.chapter-image-item')) as HTMLElement[];

          // Ensure text content is always visible on mobile
          if (content) gsap.set(content, { opacity: 1, y: 0 });

          if (images.length === 0) return;

          // Helper: reset images to their natural stacked state (called on enter/leaveBack)
          const resetImages = () => {
            images.forEach((img, i) => {
              gsap.set(img, {
                xPercent: 0,
                yPercent: 0,
                opacity: 1,
                scale: 1,
                rotation: i === 0 ? -2 : i === 1 ? 3 : -1,
              });
            });
          };

          // Set initial state
          resetImages();

          // Build the reveal timeline (scrubbed)
          const tl = gsap.timeline({ paused: true });

          // Brief hold before first image slides away
          tl.to({}, { duration: 0.5 });
          let accumulated = 0.5;

          for (let j = images.length - 1; j > 0; j--) {
            tl.to(
              images[j],
              {
                xPercent: 120,
                yPercent: 20,
                rotation: j % 2 === 0 ? 15 : -15,
                opacity: 0,
                scale: 1.05,
                duration: 1,
                ease: "power2.inOut",
              },
              accumulated
            );
            accumulated += 1.2;
          }

          // Hold final image
          tl.to({}, { duration: 0.5 });

          // --- Anchor trigger to the .story-pin-wrapper, computed at refresh time ---
          //
          // ROOT CAUSE OF CHAPTERS 2-4 BUG:
          //   CSS `h-[150vh]` uses the LARGE viewport height (full screen, no browser chrome).
          //   `window.innerHeight` is the SMALL viewport (with address bar visible).
          //   These differ by ~50-100px on Chrome mobile.
          //   → Chapter 1 (idx=0): 0 * difference = 0px error ✓
          //   → Chapter 2 (idx=1): 1 * ~75px = 75px error ✗
          //   → Chapter 4 (idx=3): 3 * ~75px = 225px error ✗ (trigger starts way too early)
          //
          // FIX: Measure actual pixel heights from the DOM directly. No vh math. No approximation.

          ScrollTrigger.create({
            trigger: sectionRef.current,
            start: () => {
              const pinWrapperEl = sectionRef.current!.querySelector('.story-pin-wrapper') as HTMLElement;
              const pinTop = pinWrapperEl.getBoundingClientRect().top + window.scrollY;
              // Sum the actual rendered heights of all chapters before this one
              let offset = 0;
              for (let i = 0; i < idx; i++) {
                offset += slides[i].getBoundingClientRect().height;
              }
              return pinTop + offset;
            },
            end: () => {
              const pinWrapperEl = sectionRef.current!.querySelector('.story-pin-wrapper') as HTMLElement;
              const pinTop = pinWrapperEl.getBoundingClientRect().top + window.scrollY;
              // Sum heights of this chapter and all preceding ones
              let offset = 0;
              for (let i = 0; i <= idx; i++) {
                offset += slides[i].getBoundingClientRect().height;
              }
              return pinTop + offset;
            },
            scrub: 1,
            invalidateOnRefresh: true,
            refreshPriority: -idx, // process chapters in order
            onUpdate: (self) => {
              tl.progress(self.progress);
            },
            onEnter: () => {
              // Safety net: ensure images are in stacked state when chapter enters
              resetImages();
            },
            onLeaveBack: () => {
              // Scroll backward past this chapter — fully restore stacked images
              resetImages();
            },
          });
        });
      });

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

      // Conclusion Cinematic Animation
      const conclusionText = sectionRef.current?.querySelector('.story-conclusion-text');
      if (conclusionText) {
        const textSplit = new SplitType(conclusionText as HTMLElement, { types: 'lines,words' });
        splits.push(textSplit);
        
        const tlConclusion = gsap.timeline({
          scrollTrigger: {
            trigger: conclusionText,
            start: "top 95%",
            end: "bottom 70%",
            scrub: 1,
          }
        });

        tlConclusion.from(".story-conclusion-deco", { 
           opacity: 0, 
           scale: 0.5, 
           duration: 1, 
           ease: "power2.out" 
        })
        .from(textSplit.words, {
          y: 40,
          opacity: 0,
          rotateX: -50,
          stagger: 0.08,
          duration: 1.2,
          ease: "back.out(1.5)"
        }, "-=0.5")
        .from(".story-conclusion-line-inner", {
           scaleY: 0,
           duration: 1,
           ease: "power2.inOut"
        }, "-=0.8");
      }

    }, sectionRef);

    return () => {
      ctx.revert();
      splits.forEach(s => s.revert());
    };
  }, [lang]);

  return (
    <section id="story" ref={sectionRef} className="relative bg-surface overflow-clip">
      {/* Signature Grain Overlay cho Section (Bị cuộn đi theo thông thường) */}
      <div className="absolute inset-0 opacity-[0.08] texture-grain pointer-events-none mix-blend-multiply transition-opacity duration-1000" />
      <div className="absolute inset-0 opacity-20 pointer-events-none mix-blend-multiply"
        style={{ backgroundImage: 'url("https://www.transparenttextures.com/patterns/natural-paper.png")' }}
      />

      {/* Intro Header */}
      <div className="container mx-auto px-6 md:px-12 relative z-10 w-full">
        <div className="flex flex-col items-center pt-24 pb-12 md:pt-28 md:pb-16 story-header-reveal text-center min-h-[40vh] md:min-h-[30vh] justify-center">
           <span className="text-[10px] md:text-xs tracking-[0.6em] uppercase text-olive font-medium mb-4 md:mb-6 animate-fade-in">{t.journey}</span>
           <h2 className="text-4xl md:text-8xl font-heading text-burgundy italic leading-tight max-w-4xl drop-shadow-sm">{t.storyTitle}</h2>
           <div className="w-20 h-[0.5px] bg-olive/30 mt-8 md:mt-12 mx-auto"></div>
        </div>
      </div>

      {/* GSAP Pin Container for Chapters - Gói trọn Background để khóa chặt */}
      <div className="story-pin-wrapper relative w-full h-auto md:h-[100svh] block md:flex md:flex-row md:items-center md:justify-center bg-surface">
          {/* Static Backgrounds for the Pin Container to prevent sliding parity */}
          <div className="absolute inset-0 opacity-[0.08] texture-grain pointer-events-none mix-blend-multiply md:block hidden" />
          <div className="absolute inset-0 opacity-20 pointer-events-none mix-blend-multiply md:block hidden"
            style={{ backgroundImage: 'url("https://www.transparenttextures.com/patterns/natural-paper.png")' }}
          />
          
          <div className="container mx-auto px-0 md:px-6 relative z-10 w-full h-full">
            
            {/* Global Progress Grid Overlay */}
            <div className="absolute inset-0 w-full h-full pointer-events-none z-30 hidden md:flex items-center justify-center">
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
                className="chapter-slide relative md:absolute md:inset-0 w-full h-[150vh] md:h-full block md:grid md:grid-cols-12 md:items-center md:justify-center p-0 md:py-0 overflow-clip md:overflow-visible"
                style={{ zIndex: chapters.length - idx }}
              >
                {/* CSS STICKY WRAPPER: Avoids GSAP pin overlap bugs on Mobile */}
                <div className="md:relative sticky top-0 h-[100svh] w-full flex flex-col md:grid md:grid-cols-12 md:col-span-12 gap-4 md:gap-8 lg:gap-12 items-center justify-center pt-8 pb-12 md:py-0 overflow-visible md:overflow-visible bg-surface md:bg-transparent">
                
                {/* Left Column: Semantic Storytelling */}
                <div className="chapter-content w-full md:col-span-6 lg:col-span-5 flex flex-col justify-center space-y-3 md:space-y-6 lg:space-y-10 px-6 md:px-0 lg:pl-12 z-20 order-1 md:order-1 pt-0 md:pt-0">
                  <div className="flex items-center gap-4 md:gap-6">
                    <span className="text-[2rem] md:text-6xl lg:text-8xl font-heading text-olive/10 italic select-none leading-none">{chap.num}</span>
                    <div className="flex-1 h-[0.5px] bg-olive/10"></div>
                  </div>
                  
                  <div className="space-y-3 md:space-y-6 lg:space-y-8">
                    <span className="text-[9px] md:text-[10px] tracking-[0.4em] md:tracking-[0.5em] uppercase text-olive/50 font-semibold block">
                      {chap.chapter}
                    </span>
                    <h3 className="text-[1.75rem] sm:text-4xl md:text-5xl lg:text-6xl font-heading text-burgundy leading-tight">
                      {chap.title}
                    </h3>
                    <p className="text-ink/80 leading-relaxed font-normal text-[0.875rem] md:text-lg lg:text-2xl max-w-lg">
                      {chap.content}
                    </p>
                  </div>

                  <div className="flex items-center gap-4 pt-1 lg:pt-0 hidden md:flex">
                     <div className="w-12 h-[0.5px] bg-olive/20"></div>
                     <div className="w-1.5 h-1.5 rounded-full border border-olive/20" />
                  </div>
                </div>

                <div className="lg:col-span-1 hidden lg:block"></div>

                {/* Right Column: Layered Cinematic Gallery */}
                <div className="chapter-images w-full md:col-span-6 lg:col-span-6 relative flex items-center justify-center pointer-events-none order-2 md:order-2 mt-4 md:mt-0 px-0 md:px-0">
                  <div className="chapter-images-wrapper relative w-[80%] sm:w-[75%] md:w-full aspect-[4/5] max-h-[40svh] md:max-h-none block items-center justify-center pointer-events-auto mx-auto max-w-[360px] md:max-w-none">
                    {chap.images.map((img, i) => (
                      <div 
                        key={img} 
                        className={`chapter-image-item absolute w-[80%] sm:w-[80%] md:w-[75%] lg:w-[65%] aspect-[3/4] overflow-hidden shadow-[0_20px_40px_-15px_rgba(0,0,0,0.3)] bg-surface will-change-transform ${
                          i === 0 ? '-rotate-2 left-[4%] md:left-[5%] top-[4%] md:top-[5%]' : 
                          i === 1 ? 'rotate-3 left-[10%] md:left-[17%] top-[10%] md:top-[15%]' : 
                          '-rotate-1 left-[16%] md:left-[29%] top-[16%] md:top-[25%]'
                        }`}
                        style={{ zIndex: 10 + i }}
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
                {/* END STICKY WRAPPER */}
                </div>

              </div>
            ))}
          </div>
        </div>

        {/* Conclusion / Transition to next section */}
        <div className="container mx-auto px-6 md:px-12 relative z-10 w-full pb-16 md:pb-20">
          <div className="py-24 md:py-32 flex flex-col items-center justify-center text-center space-y-8 md:space-y-10">
              <div className="story-conclusion-deco flex items-center justify-center gap-4 md:gap-6 opacity-30">
                  <div className="w-12 md:w-16 h-[0.5px] bg-olive"></div>
                  <div className="w-2 h-2 rotate-45 border border-olive"></div>
                  <div className="w-12 md:w-16 h-[0.5px] bg-olive"></div>
              </div>

              <p className="story-conclusion-text text-3xl md:text-5xl lg:text-6xl font-heading text-burgundy italic leading-relaxed max-w-4xl mx-auto drop-shadow-sm px-4" style={{ perspective: "400px" }}>
                 {lang === 'en' ? "“Five years later, we celebrate where the journey brought us.”" : "“Năm năm sau, tụi mình cùng nhìn lại và ăn mừng nơi hành trình này đã đưa hai đứa đến.”"}
              </p>

              <div className="pt-12 story-conclusion-line">
                 <div className="story-conclusion-line-inner w-[0.5px] h-32 bg-gradient-to-b from-olive/60 to-transparent mx-auto origin-top"></div>
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
