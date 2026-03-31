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
      chapter1: "Chapter I",
      metTitle: "How we met",
      chapter2: "Chapter II",
      proposalTitle: "The Proposal"
    },
    vi: {
      journey: "Hành Trình Tình Yêu",
      storyTitle: "Câu Chuyện Của Chúng Mình",
      chapter1: "Chương I",
      metTitle: "Lần đầu gặp gỡ",
      chapter2: "Chương II",
      proposalTitle: "Lời Cầu Hôn"
    }
  }[lang];

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
          const split = new SplitType(p, { types: 'words,chars' });
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
          const split = new SplitType(p, { types: 'words,chars' });
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
       splits.forEach(s => s.split({ types: 'words,chars' }));
    };
    window.addEventListener('resize', handleResize);

    return () => {
       ctx.revert();
       window.removeEventListener('resize', handleResize);
    };
  }, [lang]);

  const content = {
    en: {
      meetingParas: [
        "It all started in the most unexpected way in Colorado. We first crossed paths while working at a small marketing company, but it was a business trip to Vail that changed everything. At the time, neither of us could have imagined how significant that trip would become.",
        "What started as a strong friendship slowly grew into something deeper. From navigating long distance to eventually moving in together amidst the pandemic, our relationship grew into a partnership filled with laughter, support, and love."
      ],
      meetingQuote: "We quickly bonded over the things that mattered most to us: our closeness with family, the challenges we had overcome, and our hopes for the future.",
      proposalParas: [
        "On an early autumn day several years ago, what began as a simple day turned into one of the most meaningful moments of our lives. Tommy planned a trip to see the golden aspens changing. After an unforgettable 11-mile hike through rugged mountain terrain, we reached the breathtaking Crystal Mill in Colorado.",
        "There, with a full heart and a quiet certainty, Tommy got down on one knee. Flustered and completely overjoyed, Linh said yes. It wasn’t perfect in the traditional sense, but it was perfect for us: thoughtful, adventurous, and filled with love."
      ],
      proposalQuote: "Surrounded by the stillness of the mountains and the beauty of the moment, everything seemed to fall into place.",
      footer: "Five years later, we celebrate where the journey brought us."
    },
    vi: {
      meetingParas: [
        "Mọi chuyện bắt đầu theo một cách rất bất ngờ tại Colorado. Tụi mình lần đầu gặp nhau khi cùng làm việc tại một công ty marketing nhỏ, nhưng chính chuyến công tác đến Vail đã thay đổi tất cả. Lúc đó, không ai trong tụi mình có thể nghĩ rằng chuyến đi ấy lại trở nên đặc biệt đến vậy.",
        "Tụi mình nhanh chóng kết nối qua những điều quan trọng nhất: tình cảm dành cho gia đình, những thử thách đã từng trải qua, những ước mơ và định hướng trong tương lai. Từ một tình bạn mộc mạc, mọi thứ dần trở nên sâu sắc hơn lúc nào không hay. Qua nhiều giai đoạn thăng trầm và những biến cố của cuộc sống, mối quan hệ ấy dần trở thành một sự đồng hành vững chắc, nơi luôn có tiếng cười, sự sẻ chia và tình yêu."
      ],
      meetingQuote: "Nhìn lại, thật kỳ diệu khi một khởi đầu giản dị lại trở thành tất cả những gì tụi mình từng mong muốn. Và chúng mình đã tìm thấy nơi mình thuộc về... chính là bên nhau.",
      proposalParas: [
        "Tommy đã lên kế hoạch cho một chuyến đi thường niên để ngắm lá vàng mùa thu. Nhưng thật ra anh đã âm thầm chuẩn bị cho một điều đặc biệt hơn rất nhiều. Sau hành trình trekking 18 km, gặp cả động vật hoang dã, Tommy và Linh đặt chân đến Crystal Mill, một nơi có khung cảnh thiên nhiên đẹp đến nao lòng.",
        "Tại đó, với tất cả sự chân thành, Tommy đã quỳ gối, hỏi câu hỏi mà anh đã giữ trong lòng suốt nhiều tháng: “Em sẽ lấy anh chứ?”. Tuy đó không phải là một màn cầu hôn hoàn hảo theo kiểu truyền thống, nhưng lại hoàn hảo theo cách riêng của tụi mình: đầy chân thành, có chút phiêu lưu, và trọn vẹn yêu thương."
      ],
      proposalQuote: "Giữa không gian yên bình của núi rừng và khoảnh khắc quá đỗi đặc biệt ấy, mọi thứ dường như trở nên trọn vẹn.",
      footer: "Giờ đây, sau 5 năm, tụi mình cuối cùng cũng có thể cùng nhau kỷ niệm khoảnh khắc ấy bên những người thân yêu nhất."
    }
  }[lang];

  return (
    <section id="story" ref={sectionRef} className="relative pt-24 md:pt-40 pb-56 md:pb-80 bg-surface overflow-hidden">
      {/* Signature Grain Texture Overlay */}
      <div className="absolute inset-0 opacity-[0.08] texture-grain pointer-events-none mix-blend-multiply" />
      {/* Background Texture: Canson 300gsm inspired */}
      <div className="absolute inset-0 opacity-20 pointer-events-none mix-blend-multiply"
        style={{ backgroundImage: 'url("https://www.transparenttextures.com/patterns/natural-paper.png")' }}
      />

      <div className="container mx-auto px-6 md:px-12 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col items-center mb-20 md:mb-32 story-header-reveal text-center">
           <span className="text-xs md:text-sm tracking-[0.5em] uppercase text-olive font-light mb-4 text-center">{t.journey}</span>
           <h2 className="text-4xl md:text-6xl font-heading text-burgundy italic text-center leading-tight max-w-2xl">{t.storyTitle}</h2>
           <div className="w-16 h-[1px] bg-olive/20 mt-8 mx-auto"></div>
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
                <span className="text-[10px] tracking-[0.4em] uppercase text-olive/60 font-medium">{t.chapter1}</span>
                <div className="flex-1 h-[0.5px] bg-olive/10"></div>
             </div>
             <h3 className="text-3xl md:text-4xl font-heading text-burgundy">{t.metTitle}</h3>
             <p className="text-ink/80 leading-relaxed font-light text-lg md:text-xl md:leading-loose max-w-2xl">
                {content.meetingParas[0]}
             </p>
             <p className="text-ink/80 leading-relaxed font-light text-lg md:text-xl md:leading-loose italic border-l border-olive/20 pl-6 py-2">
                &ldquo;{content.meetingQuote}&rdquo;
             </p>
             <p className="text-ink/80 leading-relaxed font-light text-lg md:text-xl md:leading-loose max-w-2xl">
                {content.meetingParas[1]}
             </p>
          </div>
        </div>

        {/* Part 2: The Proposal (Reversed Asymmetric) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-6 lg:order-1 order-2 space-y-8" ref={proposalTextRef}>
             <div className="flex items-center gap-4 highlight-reveal">
                <div className="flex-1 h-[0.5px] bg-olive/10"></div>
                <span className="text-[10px] tracking-[0.4em] uppercase text-olive/60 font-medium">{t.chapter2}</span>
             </div>
             <h3 className="text-3xl md:text-4xl font-heading text-burgundy">{t.proposalTitle}</h3>
             <p className="text-ink/80 leading-relaxed font-light text-lg md:text-xl md:leading-loose">
                {content.proposalParas[0]}
             </p>
             <p className="text-ink/80 leading-relaxed font-light text-lg md:text-xl md:leading-loose italic border-l border-olive/20 pl-6 py-2">
                &ldquo;{content.proposalQuote}&rdquo;
             </p>
             <p className="text-ink/80 leading-relaxed font-light text-lg md:text-xl md:leading-loose">
                {content.proposalParas[1]}
             </p>
             <div className="pt-16 mt-16 border-t border-olive/10 text-center space-y-10 group/conclusion relative">
                {/* Visual Flourish Accent */}
                <div className="flex items-center justify-center gap-6 opacity-20 group-hover/conclusion:opacity-40 transition-opacity duration-1000">
                    <div className="w-12 h-[0.5px] bg-olive"></div>
                    <div className="w-2 h-2 rotate-45 border border-olive"></div>
                    <div className="w-12 h-[0.5px] bg-olive"></div>
                </div>

                <p className="text-2xl md:text-4xl font-heading text-burgundy italic leading-tight max-w-3xl mx-auto drop-shadow-sm px-4">
                  “{content.footer}”
                </p>

                <div className="pt-4">
                   <div className="w-[0.5px] h-16 bg-gradient-to-b from-olive/20 to-transparent mx-auto"></div>
                </div>
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
