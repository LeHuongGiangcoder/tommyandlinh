"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Plane, FileText, Globe, Smartphone, MapPin, Compass, ExternalLink } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const TravelInfo = ({ lang = 'en' }: { lang?: 'en' | 'vi' }) => {
  const sectionRef = useRef<HTMLElement>(null);

  const t = {
    en: {
      plan: "Plan Your Trip",
      visaTitle: "Visa & Travel",
      visaSub: "Visa (E-Visa)",
      visaDesc: "If you are a US citizen, you must obtain a visa to enter Vietnam. The process is simple, affordable, and completed entirely online.",
      visaExemption: "Note: Some nationalities may qualify for exemptions (typically 30–45 days).",
      fee: "Fee",
      processing: "Processing",
      need: "What You'll Need",
      needItems: [
        "Passport valid for 6+ months with at least one blank page",
        "Scanned passport bio page & 4×6 cm digital photo",
        "Credit/debit card for online payment"
      ],
      portal: "Vietnam E-Visa Portal",
      stay: "Where to Stay",
      stayDesc: "Hanoi offers amazing value for hotels. We recommend staying near",
      stayHighlight: "Hoan Kiem Lake",
      staySuffix: "to be in the center of everything.",
      oldQuarter: "Old Quarter",
      oldQuarterDesc: "Best for first-time visitors, food, and walkability.",
      frenchQuarter: "French Quarter",
      frenchQuarterDesc: "Quieter, more upscale, beautiful architecture.",
      connectivity: "Connectivity & Apps",
      esim: "E-SIM Options",
      esimDesc: "We recommend ByteSim or Gigago. 5GB/day is more than enough.",
      apps: "Essential Apps",
      appsDesc: "Grab (transport & food), Xanh SM (electric taxi), Zalo (communication).",
      explore: "Let's Explore",
      exploreSub: "A few highlights to discover during your stay",
      hanoi: "Hanoi — Culture & Cuisine",
      hanoiDesc: "Experience the Temple of Literature, Hoan Kiem Lake, and the lively Old Quarter. Unforgettable street food and history awaiting at every corner.",
      halong: "Ha Long Bay — Cruise",
      halongDesc: "One of the New Seven Wonders of Nature. An overnight cruise takes you through thousands of limestone islands. Highly recommended.",
      ninhbinh: "Ninh Binh — Nature",
      ninhbinhDesc: "Known as 'Ha Long Bay on land.' Breathtaking landscapes of limestone mountains, peaceful rivers, and lush rice fields.",
      rsvpTravel: "Please RSVP if you are interested in any of the above activities so we can coordinate with a local travel agency."
    },
    vi: {
      plan: "Chuẩn bị cho chuyến đi",
      visaTitle: "Thị thực & Di chuyển",
      visaSub: "Thị thực (E-Visa)",
      visaDesc: "Nếu bạn là công dân Mỹ, bạn sẽ cần xin visa để nhập cảnh vào Việt Nam. Quy trình khá đơn giản, làm online và không mất nhiều thời gian.",
      visaExemption: "Lưu ý: Một số quốc tịch có thể được miễn visa trong thời gian ngắn. Bạn có thể tham khảo thêm tại Cổng thông tin E-Visa Việt Nam.",
      fee: "Phí",
      processing: "Thời gian xử lý",
      need: "Những gì cần chuẩn bị",
      needItems: [
        "Hộ chiếu còn hạn ít nhất 6 tháng",
        "Bản scan trang thông tin hộ chiếu",
        "Ảnh thẻ nền trắng (4x6 cm, không đeo kính)",
        "Thẻ thanh toán"
      ],
      portal: "Vietnam E-Visa Portal",
      stay: "Nơi lưu trú (Hà Nội)",
      stayDesc: "Hà Nội có rất nhiều lựa chọn chỗ ở với giá hợp lý cho mọi ngân sách. Chúng mình gợi ý",
      stayHighlight: "ở gần Hồ Hoàn Kiếm",
      staySuffix: "là tiện nhất để khám phá Hà Nội.",
      oldQuarter: "Khu vực tham khảo",
      oldQuarterDesc: "Phố Cổ (tiện đi lại) & Phố Pháp (yên tĩnh, sang trọng).",
      frenchQuarter: "Khoảng giá",
      frenchQuarterDesc: "Tiết kiệm ($10-30), Trung bình ($30-60), Cao cấp ($80-200+).",
      connectivity: "Ứng dụng & Kết nối",
      esim: "SIM / eSIM",
      esimDesc: "Khuyên dùng ByteSim hoặc Gigago. Gói 5GB/ngày là hoàn toàn đủ.",
      apps: "Ứng dụng nên có",
      appsDesc: "Grab (vận chuyển), Xanh SM & Be (lựa chọn địa phương), Zalo (liên lạc).",
      explore: "Khám phá",
      exploreSub: "Hà Nội là nơi tụi mình rất mong mọi người được trải nghiệm trọn vẹn",
      hanoi: "Hà Nội — Văn hóa & Ẩm thực",
      hanoiDesc: "Văn Miếu, Hồ Hoàn Kiếm, Lăng Bác và Phố Cổ. Chỉ cần 2 ngày 1 đêm là đủ để cảm nhận nét đặc trưng. RSVP nếu bạn muốn đi tour theo nhóm nha!",
      halong: "Vịnh Hạ Long — Du thuyền",
      halongDesc: "Trải nghiệm du thuyền qua đêm qua hàng nghìn đảo đá vôi tuyệt đẹp. Chèo kayak và cực kỳ relax. Tụi mình rất recommend!",
      ninhbinh: "Ninh Bình — Thiên nhiên",
      ninhbinhDesc: "Được mệnh danh là 'Hạ Long trên cạn' với núi đá vôi và sông nước thơ mộng. Có thể tham quan chùa Bái Đính và các di tích cổ.",
      rsvpTravel: "Các chuyến đi gần Hà Nội: Bát Tràng (làm gốm), Núi Hàm Lợn (trekking), Làng lụa Vạn Phúc. Nhớ RSVP để tụi mình sắp xếp nha!"
    }
  }[lang];

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
  }, [lang]);

  return (
    <section ref={sectionRef} id="travel" className="relative py-24 md:py-40 bg-surface">
      {/* Signature Grain Texture Overlay */}
      <div className="absolute inset-0 opacity-[0.06] texture-grain pointer-events-none mix-blend-multiply" />
      {/* Background Texture Integration */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none mix-blend-multiply"
        style={{ backgroundImage: 'url("https://www.transparenttextures.com/patterns/natural-paper.png")' }}
      />

      <div className="container mx-auto px-6 md:px-12 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col items-center mb-20 md:mb-32 travel-header-reveal">
           <span className="text-xs md:text-sm tracking-[0.5em] uppercase text-olive font-light mb-4 text-center">{t.plan}</span>
           <h2 className="text-4xl md:text-6xl font-heading text-burgundy italic text-center">{t.visaTitle}</h2>
           <div className="w-16 h-[1px] bg-olive/20 mt-8"></div>
        </div>

        {/* Part 5: Plan Your Trip - Essentials */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-32 items-start">
          
          {/* Visa Information */}
          <div className="travel-card bg-white/40 border border-olive/10 p-8 md:p-12 space-y-8 h-full">
            <div className="flex items-center gap-4 text-burgundy">
               <FileText className="w-6 h-6 stroke-1" />
               <h3 className="text-2xl font-heading tracking-wide">{t.visaSub}</h3>
            </div>
            
            <div className="space-y-6 text-ink/80 font-light leading-relaxed">
              <p>
                {t.visaDesc}
                <span className="block mt-2 text-sm italic text-olive">{t.visaExemption}</span>
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-4 border-t border-olive/5">
                <div>
                   <span className="block text-[10px] tracking-[0.2em] uppercase text-olive/60 mb-1">{t.fee}</span>
                   <p className="text-burgundy font-medium">$25 (Single) / $50 (Multiple)</p>
                </div>
                <div>
                   <span className="block text-[10px] tracking-[0.2em] uppercase text-olive/60 mb-1">{t.processing}</span>
                   <p className="text-burgundy font-medium">3–5 {lang === 'en' ? 'Business Days' : 'Ngày làm việc'}</p>
                </div>
              </div>

              <div className="space-y-3">
                <span className="block text-[10px] tracking-[0.2em] uppercase text-olive/60">{t.need}</span>
                <ul className="text-sm space-y-2 list-disc pl-4 marker:text-olive">
                  {t.needItems.map((item, i) => (
                    <li key={i}>{item}</li>
                  ))}
                </ul>
              </div>

              <a href="https://evisa.gov.vn" target="_blank" rel="noopener noreferrer" 
                 className="inline-flex items-center gap-2 px-6 py-3 bg-burgundy text-surface text-xs tracking-widest uppercase hover:bg-burgundy/90 transition-all">
                {t.portal} <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </div>

          {/* Apps & Connectivity */}
          <div className="space-y-8 h-full">
            {/* Where to Stay */}
            <div className="travel-card bg-burgundy/5 border border-burgundy/5 p-8 md:p-10">
               <div className="flex items-center gap-4 text-burgundy mb-6">
                 <MapPin className="w-6 h-6 stroke-1" />
                 <h3 className="text-2xl font-heading tracking-wide">{t.stay}</h3>
               </div>
               <p className="text-ink/80 font-light leading-relaxed mb-6">
                 {t.stayDesc} <strong className="text-burgundy underline decoration-burgundy/20 underline-offset-4">{t.stayHighlight}</strong> {t.staySuffix}
               </p>
               <div className="grid grid-cols-2 gap-4 text-sm">
                 <div className="p-4 bg-white/60">
                    <span className="block text-olive text-[10px] uppercase tracking-tighter mb-1 font-bold">{t.oldQuarter}</span>
                    <p className="text-ink/60 text-xs">{t.oldQuarterDesc}</p>
                 </div>
                 <div className="p-4 bg-white/60">
                    <span className="block text-olive text-[10px] uppercase tracking-tighter mb-1 font-bold">{t.frenchQuarter}</span>
                    <p className="text-ink/60 text-xs">{t.frenchQuarterDesc}</p>
                 </div>
               </div>
            </div>

            {/* Apps */}
            <div className="travel-card bg-olive/[0.03] border border-olive/5 p-8 md:p-10">
               <div className="flex items-center gap-4 text-olive mb-6">
                 <Smartphone className="w-6 h-6 stroke-1" />
                 <h3 className="text-2xl font-heading tracking-wide text-burgundy">{t.connectivity}</h3>
               </div>
               <div className="space-y-6">
                 <div className="flex items-start gap-4">
                   <Globe className="w-5 h-5 text-olive/60 mt-1" />
                   <div>
                     <p className="text-sm font-medium text-ink">{t.esim}</p>
                     <p className="text-xs text-ink/60 mt-1">{t.esimDesc}</p>
                   </div>
                 </div>
                 <div className="flex items-start gap-4">
                   <Compass className="w-5 h-5 text-olive/60 mt-1" />
                   <div>
                     <p className="text-sm font-medium text-ink">{t.apps}</p>
                     <p className="text-xs text-ink/60 mt-1">{t.appsDesc}</p>
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

        <div className="relative">
          <div className="mb-16">
             <h3 className="text-3xl md:text-4xl font-heading text-burgundy">{t.explore}</h3>
             <p className="text-olive/80 font-light mt-2 italic">{t.exploreSub}</p>
          </div>

          <div className="travel-grid grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Hanoi */}
            <div className="travel-card group">
              <div className="relative aspect-[4/5] overflow-hidden mb-6">
                <Image src="/5.jpg" alt="Hanoi" fill className="object-cover transition-transform duration-1000 group-hover:scale-105" />
                <div className="absolute inset-0 bg-burgundy/10 mix-blend-overlay"></div>
              </div>
              <h4 className="text-xl font-heading text-burgundy mb-2">{t.hanoi}</h4>
              <p className="text-sm text-ink/70 font-light leading-relaxed">
                {t.hanoiDesc}
              </p>
            </div>

            {/* Ha Long Bay */}
            <div className="travel-card group">
              <div className="relative aspect-[4/5] overflow-hidden mb-6">
                <Image src="/6.jpg" alt="Ha Long Bay" fill className="object-cover transition-transform duration-1000 group-hover:scale-105" />
                <div className="absolute inset-0 bg-burgundy/10 mix-blend-overlay"></div>
              </div>
              <h4 className="text-xl font-heading text-burgundy mb-2">{t.halong}</h4>
              <p className="text-sm text-ink/70 font-light leading-relaxed">
                {t.halongDesc}
              </p>
            </div>

            {/* Ninh Binh */}
            <div className="travel-card group">
              <div className="relative aspect-[4/5] overflow-hidden mb-6">
                <Image src="/7.jpg" alt="Ninh Binh" fill className="object-cover transition-transform duration-1000 group-hover:scale-105" />
                <div className="absolute inset-0 bg-burgundy/10 mix-blend-overlay"></div>
              </div>
              <h4 className="text-xl font-heading text-burgundy mb-2">{t.ninhbinh}</h4>
              <p className="text-sm text-ink/70 font-light leading-relaxed">
                {t.ninhbinhDesc}
              </p>
            </div>
          </div>

          <div className="mt-20 p-8 border border-dashed border-olive/30 bg-white/40 text-center max-w-4xl mx-auto travel-card">
              <p className="text-burgundy italic font-medium">
                "{t.rsvpTravel}"
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
