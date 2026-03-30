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
      gsap.from(".faq-header-reveal", {
        opacity: 0,
        y: 30,
        duration: 1.2,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
        }
      });

      // Using fromTo for high reliability as seen in other stable components
      gsap.fromTo(".faq-item-reveal", 
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          stagger: 0.1,
          duration: 1.2,
          ease: "power2.out",
          scrollTrigger: {
            trigger: ".faq-list",
            start: "top 90%",
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
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none mix-blend-multiply"
        style={{ backgroundImage: 'url("https://www.transparenttextures.com/patterns/natural-paper.png")' }}
      />
      <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-olive/5 to-transparent pointer-events-none" />
      
      {/* Decorative Botanical SVG in background */}
      <div className="absolute -bottom-20 -left-20 w-80 h-80 opacity-[0.05] text-burgundy pointer-events-none rotate-12">
        <svg viewBox="0 0 200 200" className="w-full h-full fill-current">
          <path d="M100,20 Q120,60 160,80 T180,140 Q140,160 100,140 T40,120 Q60,60 100,20" />
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
                className="faq-item-reveal group bg-white/40 backdrop-blur-sm border border-olive/10 shadow-sm hover:border-olive/30 transition-all duration-500 overflow-hidden"
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
                  <ChevronDown className={`w-5 h-5 text-olive/40 transition-transform duration-500 ease-out-expo ${openIndex === index ? 'rotate-180 text-burgundy' : ''}`} />
                </button>
                
                <div 
                  className={`transition-all duration-700 ease-in-out-expo px-10 md:px-[88px] overflow-hidden ${
                    openIndex === index ? 'max-h-[500px] pb-8 md:pb-12 opacity-100' : 'max-h-0 opacity-0'
                  }`}
                >
                  <div className="pt-2 border-t border-olive/5">
                    <p className="text-ink/70 font-serif italic text-base md:text-lg leading-relaxed pt-6">
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
