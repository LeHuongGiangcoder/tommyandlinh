"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ChevronDown, HelpCircle, Info, MapPin, Wind, Briefcase, CreditCard, Plane, Smartphone, Zap, Pill, Bug, Lightbulb } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

interface FAQItem {
  question: string;
  answer: string;
  icon?: React.ReactNode;
}

const FAQ = ({ lang = 'en' }: { lang?: 'en' | 'vi' }) => {
  const sectionRef = useRef<HTMLElement>(null);
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const translations = {
    en: {
      title: "Common Questions",
      subtitle: "FAQ",
      items: [
        {
          question: "What is the weather in Hanoi around wedding time?",
          answer: "January weather is great for exploring Hanoi without the intense heat, but it is not beach weather. Think cool, cozy, and occasionally foggy rather than tropical. Mid-late January in Hanoi is typically cool and mild, with a slightly misty atmosphere. Daytime temperatures are usually around 60–70°F (16–21°C), while mornings and evenings can feel cooler, dropping to 50–60°F (10–16°C). The weather is often cloudy or overcast, with occasional fog and light drizzle, though heavy rain is uncommon. While it's not tropical, the cooler temperatures make it very comfortable for exploring the city.",
          icon: <Wind className="w-5 h-5" />
        },
        {
          question: "What to pack?",
          answer: "Light layers, a sweater, and a jacket for evenings are recommended. Comfortable closed-toe shoes are also a good idea for walking around the city.",
          icon: <Briefcase className="w-5 h-5" />
        },
        {
          question: "Card or Cash?",
          answer: "Both are useful. At the resort, you can pay by card or charge to your room. Outside the resort, cash is preferred, especially for street vendors. ATMs are widely available at airports and in cities.",
          icon: <CreditCard className="w-5 h-5" />
        },
        {
          question: "What do I need to travel to Vietnam?",
          answer: "You will need a valid passport and visa. Please see the Travel section for visa details.",
          icon: <Plane className="w-5 h-5" />
        },
        {
          question: "How much cash should I bring?",
          answer: "Vietnam is largely a cash-based country, so it's helpful to carry some cash. Many places do not accept cards. Plan to bring or withdraw a few hundred USD, depending on your spending.",
          icon: <CreditCard className="w-5 h-5" />
        },
        {
          question: "How do I exchange or withdraw money?",
          answer: "Withdraw cash from ATMs (VISA/Mastercard accepted). Use reputable exchange shops (avoid deals that seem too good to be true).",
          icon: <Info className="w-5 h-5" />
        },
        {
          question: "How will I get around?",
          answer: "Download Grab (similar to Uber/Lyft). You can book cars, scooters, or food delivery. Taxis are also affordable. Scooters require an international license and experience—we do not recommend renting one. Rent it at your own risk.",
          icon: <MapPin className="w-5 h-5" />
        },
        {
          question: "How do I get phone service?",
          answer: "We recommend purchasing an eSIM or SIM card for data (~$10–20 for 30 days). Data allows you to use apps like FaceTime, WhatsApp, etc. Make sure your phone is unlocked before traveling.",
          icon: <Smartphone className="w-5 h-5" />
        },
        {
          question: "Do I need a power adapter?",
          answer: "Yes. Vietnam uses plug types A, C, and D and 110–220V. Some hotels support US plugs, but bring an adapter and check voltage to avoid damaging devices.",
          icon: <Zap className="w-5 h-5" />
        },
        {
          question: "What medications should I bring?",
          answer: "Bring basics like: Pain relievers (Advil/Tylenol), Stomach meds (Imodium, Tums, Pepto), Cold/allergy meds. You may also ask your doctor about antibiotics for traveler's diarrhea.",
          icon: <Pill className="w-5 h-5" />
        },
        {
          question: "Are there mosquitoes?",
          answer: "Yes—bring bug spray or wipes, especially for evenings.",
          icon: <Bug className="w-5 h-5" />
        },
        {
          question: "What are some more travel recommendations?",
          answer: "Book flights early for the best prices. We recommend arriving at least a day or two before the event to adjust and enjoy Vietnam.",
          icon: <Lightbulb className="w-5 h-5" />
        },
        {
          question: "What is your Travel Itinerary?",
          answer: "TBD — we'll share more details closer to the date.",
          icon: <Info className="w-5 h-5" />
        },
        {
          question: "How long are guests staying?",
          answer: "It varies! Some guests will continue traveling around Asia after the wedding. There are several activities you can do around the cities and places you can visit to make this a memorable trip of your own.",
          icon: <HelpCircle className="w-5 h-5" />
        }
      ]
    },
    vi: {
      title: "Câu Hỏi Thường Gặp",
      subtitle: "FAQs",
      items: [
        {
          question: "Thời tiết Hà Nội vào tháng 1 thế nào?",
          answer: "Khá mát mẻ, dễ chịu (khoảng 10–21°C), đôi khi có sương và mưa nhẹ — rất hợp để đi chơi.",
          icon: <Wind className="w-5 h-5" />
        },
        {
          question: "Nên mang gì?",
          answer: "Áo khoác nhẹ, áo len, đồ mặc nhiều lớp và giày thoải mái.",
          icon: <Briefcase className="w-5 h-5" />
        },
        {
          question: "Dùng tiền mặt hay thẻ?",
          answer: "Cả hai đều dùng được, nhưng tiền mặt sẽ tiện hơn khi đi ngoài.",
          icon: <CreditCard className="w-5 h-5" />
        },
        {
          question: "Cần gì để đi Việt Nam?",
          answer: "Hộ chiếu hợp lệ và visa.",
          icon: <Plane className="w-5 h-5" />
        },
        {
          question: "Mang bao nhiêu tiền?",
          answer: "Tùy nhu cầu, nhưng vài trăm USD là hợp lý.",
          icon: <CreditCard className="w-5 h-5" />
        },
        {
          question: "Di chuyển như thế nào?",
          answer: "Dùng Grab là tiện nhất. Taxi cũng rẻ và dễ gọi.",
          icon: <MapPin className="w-5 h-5" />
        },
        {
          question: "Điện thoại & SIM?",
          answer: "Nên mua SIM/eSIM (~$10–20). Nhớ kiểm tra máy đã unlock.",
          icon: <Smartphone className="w-5 h-5" />
        },
        {
          question: "Ổ điện?",
          answer: "Việt Nam dùng ổ A, C, D (110–220V).",
          icon: <Zap className="w-5 h-5" />
        },
        {
          question: "Thuốc men?",
          answer: "Nên mang thuốc cơ bản như giảm đau, đau bụng, dị ứng.",
          icon: <Pill className="w-5 h-5" />
        },
        {
          question: "Có muỗi không?",
          answer: "Có — nên mang theo thuốc chống muỗi.",
          icon: <Bug className="w-5 h-5" />
        },
        {
          question: "Lời khuyên thêm",
          answer: "Đặt vé sớm và cố gắng đến trước 1–2 ngày để nghỉ ngơi và làm quen múi giờ nha.",
          icon: <Lightbulb className="w-5 h-5" />
        }
      ]
    }
  };

  const t = translations[lang];

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(".faq-header-reveal", 
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 85%",
            toggleActions: "play none none none"
          }
        }
      );

      // Immediate, high-performance fade reveal for FAQ items
      gsap.fromTo(".faq-item-reveal", 
        { opacity: 0, y: 10 },
        {
          opacity: 1,
          y: 0,
          duration: 0.5,
          stagger: 0.04,
          ease: "power1.out",
          scrollTrigger: {
            trigger: ".faq-list",
            start: "top bottom", // Starts as soon as the top of list enters the bottom of viewport
            toggleActions: "play none none none"
          }
        }
      );

      // Simple entry for botanical accents instead of complex scrubbing
      gsap.fromTo([".faq-parallax-1", ".faq-parallax-2"], 
        { opacity: 0, scale: 0.95 },
        { 
          opacity: 0.03, 
          scale: 1,
          duration: 2,
          ease: "power2.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 70%",
            toggleActions: "play none none none"
          }
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, [lang]);

  const currentT = t;
  const { title, subtitle, items } = currentT;

  return (
    <section ref={sectionRef} id="faq" className="relative py-24 md:py-40 bg-surface overflow-hidden">
      {/* Background Accents */}
      <div className="absolute inset-0 opacity-[0.05] pointer-events-none mix-blend-multiply"
        style={{ backgroundImage: 'url("https://www.transparenttextures.com/patterns/natural-paper.png")' }}
      />
      <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-olive/5 to-transparent pointer-events-none" />
      
      {/* Grain Texture Overlay */}
      <div className="absolute inset-0 opacity-[0.4] texture-grain pointer-events-none mix-blend-soft-light" />
      
      {/* Cinematic Ambient Glow Orbs */}
      <div className="absolute top-[10%] right-[-15%] w-[600px] h-[600px] md:w-[900px] md:h-[900px] bg-olive/[0.04] rounded-full filter blur-[120px] pointer-events-none mix-blend-multiply" />
      <div className="absolute bottom-[20%] left-[-15%] w-[500px] h-[500px] md:w-[800px] md:h-[800px] bg-burgundy/[0.03] rounded-full filter blur-[120px] pointer-events-none mix-blend-multiply" />
      
      {/* Decorative Botanical SVGs in background with Parallax */}
      <div className="absolute top-20 right-10 w-64 h-64 md:w-[400px] md:h-[400px] opacity-[0.03] text-olive pointer-events-none faq-parallax-1">
         <svg viewBox="0 0 512 512" className="w-full h-full fill-current">
            <path d="M383.8 351.7c2.5-2.5 105.2-92.4 105.2-92.4l-17.5-7.5c-10-4.9-7.4-11.5-5-17.4 2.4-7.6 20.1-67.3 20.1-67.3s-47.7 10-57.7 12.5c-7.5 2.4-10-2.5-12.5-7.5s-15-32.4-15-32.4-52.6 59.9-55.1 62.3c-10 7.5-20.1 0-17.6-10 0-10 27.6-129.6 27.6-129.6s-30.1 17.4-40.1 22.4c-7.5 5-12.6 5-17.6-5C293.5 72.3 255.9 0 255.9 0s-37.5 72.3-42.5 79.8c-5 10-10 10-17.6 5-10-5-40.1-22.4-40.1-22.4S183.3 182 183.3 192c2.5 10-7.5 17.5-17.6 10-2.5-2.5-55.1-62.3-55.1-62.3S98.1 167 95.6 172s-5 9.9-12.5 7.5C73 177 25.4 167 25.4 167s17.6 59.7 20.1 67.3c2.4 6 5 12.5-5 17.4L23 259.3s102.6 89.9 105.2 92.4c5.1 5 10 7.5 5.1 22.5-5.1 15-10.1 35.1-10.1 35.1s95.2-20.1 105.3-22.6c8.7-.9 18.3 2.5 18.3 12.5S241 512 241 512h30s-5.8-102.7-5.8-112.8 9.5-13.4 18.4-12.5c10 2.5 105.2 22.6 105.2 22.6s-5-20.1-10-35.1 0-17.5 5-22.5z"/>
         </svg>
      </div>

      <div className="absolute -bottom-20 -left-20 w-80 h-80 md:w-[600px] md:h-[600px] opacity-[0.02] text-burgundy pointer-events-none rotate-12 faq-parallax-2">
         <svg viewBox="0 0 512 512" className="w-full h-full fill-current">
            <path d="M383.8 351.7c2.5-2.5 105.2-92.4 105.2-92.4l-17.5-7.5c-10-4.9-7.4-11.5-5-17.4 2.4-7.6 20.1-67.3 20.1-67.3s-47.7 10-57.7 12.5c-7.5 2.4-10-2.5-12.5-7.5s-15-32.4-15-32.4-52.6 59.9-55.1 62.3c-10 7.5-20.1 0-17.6-10 0-10 27.6-129.6 27.6-129.6s-30.1 17.4-40.1 22.4c-7.5 5-12.6 5-17.6-5C293.5 72.3 255.9 0 255.9 0s-37.5 72.3-42.5 79.8c-5 10-10 10-17.6 5-10-5-40.1-22.4-40.1-22.4S183.3 182 183.3 192c2.5 10-7.5 17.5-17.6 10-2.5-2.5-55.1-62.3-55.1-62.3S98.1 167 95.6 172s-5 9.9-12.5 7.5C73 177 25.4 167 25.4 167s17.6 59.7 20.1 67.3c2.4 6 5 12.5-5 17.4L23 259.3s102.6 89.9 105.2 92.4c5.1 5 10 7.5 5.1 22.5-5.1 15-10.1 35.1-10.1 35.1s95.2-20.1 105.3-22.6c8.7-.9 18.3 2.5 18.3 12.5S241 512 241 512h30s-5.8-102.7-5.8-112.8 9.5-13.4 18.4-12.5c10 2.5 105.2 22.6 105.2 22.6s-5-20.1-10-35.1 0-17.5 5-22.5z"/>
         </svg>
      </div>

      <div className="container mx-auto px-6 md:px-12 relative z-10">
        {/* Header */}
        <div className="flex flex-col items-center mb-20 md:mb-32 faq-header-reveal text-center">
          <span className="text-[10px] md:text-xs tracking-[0.6em] uppercase text-olive font-light mb-6">{subtitle}</span>
          <h2 className="text-5xl md:text-7xl font-heading text-burgundy italic tracking-tight">{title}</h2>
          <div className="flex items-center gap-6 mt-12 opacity-30">
            <div className="w-12 h-[1px] bg-olive"></div>
            <div className="w-1.5 h-1.5 rounded-full border border-olive rotate-45"></div>
            <div className="w-12 h-[1px] bg-olive"></div>
          </div>
        </div>

        {/* FAQ Accordion List */}
        <div className="max-w-4xl mx-auto faq-list">
          <div className="grid grid-cols-1 gap-4">
            {items.map((item, index) => (
              <div 
                key={index}
                className="faq-item-reveal group bg-white border border-olive/10 shadow-sm transition-colors duration-300 hover:border-olive/30 overflow-hidden"
              >
                <button
                  onClick={() => setOpenIndex(openIndex === index ? null : index)}
                  className="w-full px-8 py-6 md:px-10 md:py-8 flex items-center justify-between text-left focus:outline-none"
                >
                  <div className="flex items-center gap-6">
                    <div className={`w-10 h-10 rounded-full border border-olive/10 flex items-center justify-center transition-all duration-500 ${openIndex === index ? 'bg-burgundy text-surface' : 'text-olive group-hover:bg-olive/5'}`}>
                      {item.icon || <HelpCircle className="w-4 h-4" />}
                    </div>
                    <h3 className={`text-lg md:text-xl font-heading font-medium transition-colors duration-500 ${openIndex === index ? 'text-burgundy' : 'text-ink/80 group-hover:text-ink'}`}>
                      {item.question}
                    </h3>
                  </div>
                  <ChevronDown className={`w-5 h-5 text-olive/40 transition-transform duration-300 ease-in-out ${openIndex === index ? 'rotate-180 text-burgundy' : ''}`} />
                </button>
                
                <div 
                  className={`transition-all duration-500 ease-in-out px-10 md:px-[88px] overflow-hidden ${
                    openIndex === index ? 'max-h-[500px] opacity-100 pb-8 md:pb-12' : 'max-h-0 opacity-0 pb-0'
                  }`}
                >
                  <div className="pt-2 border-t border-olive/5">
                    <p className="text-ink/80 font-serif font-light italic text-base md:text-lg leading-relaxed pt-6">
                      {item.answer}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Closing Decoration */}
        <div className="mt-24 md:mt-32 text-center opacity-40 faq-header-reveal">
          <p className="text-[10px] tracking-[0.4em] uppercase text-olive mb-6">T & L — Jan 2027</p>
          <div className="w-[1px] h-12 bg-gradient-to-b from-olive to-transparent mx-auto"></div>
        </div>
      </div>
      
      {/* Bottom Border Accent */}
      <div className="absolute bottom-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-olive/20 to-transparent"></div>
    </section>
  );
};

export default FAQ;
