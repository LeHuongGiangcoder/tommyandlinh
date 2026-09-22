"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface WeddingDetailsProps {
  lang?: 'en' | 'vi';
}

const WeddingDetails = ({ lang = 'en' }: WeddingDetailsProps) => {
  const sectionRef = useRef<HTMLElement>(null);

  const translations = {
    en: {
      subtitle: "Wedding Details",
      title: "Wedding Timeline",
      description: "Schedule for our celebration at Nắng Sông Hồng",
      timeline: [
        {
          time: "15:00",
          title: "GUEST ARRIVAL",
          desc: "Guests arrive & welcome drinks at Nang song Hong",
        },
        {
          time: "15:30",
          title: "PUPPET SHOW",
          desc: "Traditional Water Puppet Show performance",
        },
        {
          time: "16:15",
          title: "GUEST SEATING",
          desc: "Guests seated for the Vow Ceremony",
        },
        {
          time: "16:30",
          title: "VOW CEREMONY",
          desc: "Vow Ceremony & union celebration",
        },
        {
          time: "17:00",
          title: "BREAK BEFORE DINNER",
          desc: "Take a moment to relax and mingle before dinner",
        },
        {
          time: "17:30",
          title: "RECEPTION",
          desc: "Reception, cocktails & photo moments",
        },
        {
          time: "18:00",
          title: "WEDDING DINNER",
          desc: "Wedding dinner & celebration into the night",
        },
      ]
    },
    vi: {
      subtitle: "Lịch Trình Sự Kiện",
      title: "Chương Trình Lễ Thành Hôn",
      description: "Khung thời gian chi tiết buổi lễ tại Nắng Sông Hồng",
      timeline: [
        {
          time: "15:00",
          title: "ĐÓN KHÁCH",
          desc: "Đón tiếp quý khách tại Nắng Sông Hồng với thức uống chào mừng và không gian giao lưu trước buổi lễ.",
        },
        {
          time: "15:30",
          title: "BIỂU DIỄN MÚA RỐI NƯỚC",
          desc: "Thưởng thức màn trình diễn múa rối nước truyền thống như một món quà văn hóa dành tặng quý khách.",
        },
        {
          time: "16:15",
          title: "ỔN ĐỊNH CHỖ NGỒI",
          desc: "Kính mời quý khách di chuyển vào khu vực làm lễ và ổn định vị trí để chuẩn bị cho nghi thức chính.",
        },
        {
          time: "16:30",
          title: "LỄ VOWS THÂN MẬT",
          desc: "Cô dâu và chú rể cùng trao lời thề nguyện, chính thức bắt đầu hành trình hôn nhân trong sự chứng kiến của gia đình và bạn bè.",
        },
        {
          time: "17:00",
          title: "NGHỈ GIẢI LAO TRƯỚC TIỆC",
          desc: "Quý khách thư giãn, trò chuyện và giao lưu trong ít phút trước khi bữa tiệc bắt đầu.",
        },
        {
          time: "17:30",
          title: "TIỆC COCKTAIL THÂN MẬT",
          desc: "Cùng nâng ly, trò chuyện, chụp ảnh lưu niệm và tận hưởng khoảng thời gian gặp gỡ trong không gian ấm cúng.",
        },
        {
          time: "18:00",
          title: "TIỆC CƯỚI & CHUNG VUI",
          desc: "Thưởng thức bữa tiệc tối, gửi những lời chúc phúc đến cô dâu chú rể và cùng hòa mình vào không khí vui vẻ của buổi tiệc.",
        },
      ]
    }
  };

  const t = translations[lang];

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Header reveal
      gsap.from(".details-reveal", {
        opacity: 0,
        y: 30,
        duration: 1.2,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 85%",
        }
      });

      // Timeline items reveal with stagger
      gsap.from(".timeline-item", {
        opacity: 0,
        y: 25,
        stagger: 0.12,
        duration: 0.9,
        ease: "power2.out",
        scrollTrigger: {
          trigger: ".timeline-container",
          start: "top 85%",
        }
      });
    }, sectionRef);

    return () => ctx.revert();
  }, [lang]);

  return (
    <section
      ref={sectionRef}
      id="details"
      className="relative py-20 md:py-32 bg-surface text-ink overflow-hidden selection:bg-burgundy selection:text-surface"
    >
      {/* Background Subtle Grain Texture */}
      <div className="absolute inset-0 opacity-[0.03] texture-grain pointer-events-none mix-blend-multiply" />

      <div className="container mx-auto px-6 relative z-10 max-w-3xl">
        {/* Header Section */}
        <div className="text-center mb-14 md:mb-20 details-reveal">
          <span className="text-olive text-[11px] md:text-xs tracking-[0.6em] uppercase font-medium block mb-4">
            {t.subtitle}
          </span>
          <h2 className="text-burgundy font-heading italic text-4xl md:text-6xl tracking-tight leading-tight mb-4">
            {t.title}
          </h2>
          <div className="w-16 h-[1px] bg-olive/40 mx-auto mb-4"></div>
          <p className="text-ink/70 font-light italic text-sm md:text-base max-w-lg mx-auto leading-relaxed">
            {t.description}
          </p>
        </div>

        {/* Compact Vertical Timeline (Inspired by reference design) */}
        <div className="timeline-container max-w-xl mx-auto relative px-2 sm:px-4">
          {/* Vertical Connecting Line */}
          <div className="absolute left-[70px] sm:left-[95px] md:left-[115px] top-4 bottom-4 w-[1px] bg-burgundy/25" />

          <div className="space-y-8 sm:space-y-10">
            {t.timeline.map((item, idx) => (
              <div
                key={idx}
                className="timeline-item relative flex items-start gap-5 sm:gap-8 md:gap-10 group"
              >
                {/* Left: Script/Italic Time */}
                <div className="w-[50px] sm:w-[70px] md:w-[90px] text-right flex-shrink-0 pt-0.5">
                  <span className="font-heading italic font-medium text-2xl sm:text-3xl md:text-4xl text-burgundy tracking-tight transition-transform duration-300 group-hover:scale-105 inline-block">
                    {item.time}
                  </span>
                </div>

                {/* Center: Line Node Dot */}
                <div className="relative flex items-center justify-center flex-shrink-0 pt-2 sm:pt-2.5 z-10">
                  <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-burgundy border-2 border-surface group-hover:scale-125 transition-transform duration-300 shadow-sm" />
                </div>

                {/* Right: Uppercase Title & Light Description */}
                <div className="flex-1 pt-1">
                  <h3 className="text-xs sm:text-sm font-medium tracking-[0.2em] uppercase text-burgundy mb-1 leading-snug">
                    {item.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-ink/70 font-light leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default WeddingDetails;
