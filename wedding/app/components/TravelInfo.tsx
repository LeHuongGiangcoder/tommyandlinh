import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { FileText, Smartphone, MapPin, ExternalLink, ChevronDown, ChevronRight } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const TravelInfo = ({ lang = 'en' }: { lang?: 'en' | 'vi' }) => {
  const sectionRef = useRef<HTMLElement>(null);

  // Interaction Component for Destinations (3D Flip Journal)
  const DestinationCard = ({ title, desc, img, sub, refLabel }: { id: string, title: string, desc: string, img: string, sub: string, refLabel: string }) => {
    const [isExpanded, setIsExpanded] = useState(false);
    
    return (
      <div 
        className="travel-card group [perspective:1000px] cursor-pointer h-[500px] md:h-[600px] w-full"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <div className={`relative w-full h-full transition-all duration-[800ms] [transform-style:preserve-3d] [will-change:transform] ${isExpanded ? '[transform:rotateY(180deg)]' : ''}`}>
          
          {/* Front Side: Cinematic Image */}
          <div className={`absolute inset-0 [backface-visibility:hidden] w-full h-full ${isExpanded ? 'opacity-0' : 'opacity-100'} transition-opacity duration-300`}>
            <div className="relative w-full h-full overflow-hidden ring-1 ring-burgundy/5 shadow-xl md:shadow-2xl">
              <Image 
                src={img} 
                alt={title} 
                fill 
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                className="object-cover transition-all duration-[3s] group-hover:scale-110" 
              />
              <div className="absolute inset-x-0 bottom-0 h-[60%] bg-gradient-to-t from-black/90 via-black/40 to-transparent opacity-80 group-hover:opacity-90 transition-opacity z-[5]"></div>
              
              <div className="absolute inset-x-0 bottom-0 p-8 md:p-12 text-white z-10">
                 <div className="text-[10px] md:text-[11px] tracking-[0.6em] uppercase font-bold text-white/90 mb-3 drop-shadow-md">{sub}</div>
                 <h4 className="text-3xl md:text-4xl lg:text-5xl font-heading italic font-medium leading-tight text-white drop-shadow-2xl">{title}</h4>
                 
                 <div className="flex items-center gap-2 mt-6 text-white/90">
                    <span className="text-[9px] tracking-[0.8em] uppercase font-bold drop-shadow-sm">{lang === 'en' ? 'Learn More' : 'Xem thêm'}</span>
                    <ChevronDown className="w-3.5 h-3.5 transition-transform duration-500 shadow-sm" />
                 </div>
              </div>
              <div className="absolute inset-8 md:inset-12 border border-white/20 opacity-0 group-hover:opacity-100 transition-all duration-1000 scale-95 group-hover:scale-100"></div>
            </div>
          </div>

          {/* Back Side: Elegant Journal Entry */}
          <div className="absolute inset-0 [backface-visibility:hidden] [transform:rotateY(180deg)] w-full h-full bg-white border border-burgundy/10 shadow-2xl p-8 md:p-12 flex flex-col justify-center overflow-hidden">
             <div className="absolute inset-0 opacity-[0.4] pointer-events-none mix-blend-multiply"
               style={{ backgroundImage: 'url("https://www.transparenttextures.com/patterns/natural-paper.png")' }}
             />
             
             <div className="relative z-10 space-y-8">
                <div className="flex items-center justify-between border-b border-burgundy/10 pb-6">
                   <div className="space-y-1">
                      <span className="text-[10px] text-olive font-serif italic opacity-60 tracking-[0.2em] font-medium">{refLabel}</span>
                      <h4 className="text-3xl font-heading text-burgundy italic font-medium leading-none">{title}</h4>
                   </div>
                   <div className="w-10 h-10 rounded-full border border-burgundy/10 flex items-center justify-center">
                      <div className="w-1.5 h-1.5 rounded-full bg-burgundy/40"></div>
                   </div>
                </div>

                <div className="max-h-[350px] overflow-y-auto custom-scrollbar pr-4">
                  <p className="text-[16px] md:text-[17px] text-ink/90 font-normal leading-relaxed italic whitespace-pre-line font-serif">
                    {desc}
                  </p>
                </div>

                <div className="pt-6 border-t border-burgundy/10 flex justify-between items-center text-[9px] tracking-[0.4em] uppercase text-olive/60 font-bold">
                   <span>TRANSIT JOURNAL</span>
                   <span className="text-burgundy/40">CLOSE ✕</span>
                </div>
             </div>
          </div>
        </div>
      </div>
    );
  };

  // Interaction Component for Day Trips (3D Flip Journal)
  const DayTripCard = ({ trip, idx }: { trip: any; idx: number }) => {
    const [isExpanded, setIsExpanded] = useState(false);

    return (
      <div 
        className="group/trip [perspective:1000px] cursor-pointer h-[450px] md:h-[550px] w-full"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <div className={`relative w-full h-full transition-all duration-[800ms] [transform-style:preserve-3d] [will-change:transform] ${isExpanded ? '[transform:rotateY(180deg)]' : ''}`}>
          
          {/* Front Side: Journey Image */}
          <div className={`absolute inset-0 [backface-visibility:hidden] w-full h-full ${isExpanded ? 'opacity-0' : 'opacity-100'} transition-opacity duration-300`}>
            <div className="relative w-full h-full overflow-hidden ring-1 ring-burgundy/5 shadow-lg">
              <Image 
                src={trip.src} 
                alt={trip.name} 
                fill 
                sizes="(max-width: 1024px) 100vw, 33vw"
                className="object-cover transition-transform duration-[2s] group-hover/trip:scale-110" 
              />
              <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black/80 via-black/30 to-transparent opacity-80 group-hover/trip:opacity-95 transition-opacity"></div>
              
              <div className="absolute inset-x-0 bottom-0 p-6 md:p-10 text-white z-10">
                <div className="text-[10px] md:text-[11px] tracking-[0.4em] uppercase text-white/80 mb-3 font-bold drop-shadow-md">ADVENTURE 0{idx+1}</div>
                <h4 className="text-2xl md:text-3xl font-heading italic leading-tight text-white drop-shadow-lg">{trip.name.split('–')[0]}</h4>
                
                <div className="flex items-center gap-2 mt-6 text-[9px] tracking-[0.4em] uppercase text-white/70 font-bold">
                  <span>{lang === 'en' ? 'DETAILS' : 'CHI TIẾT'}</span>
                  <ChevronRight className="w-3 h-3 group-hover/trip:translate-x-1 transition-transform" />
                </div>
              </div>
            </div>
          </div>

          {/* Back Side: Trip Notes */}
          <div className="absolute inset-0 [backface-visibility:hidden] [transform:rotateY(180deg)] w-full h-full bg-white border border-burgundy/10 shadow-xl p-6 md:p-10 flex flex-col justify-center overflow-hidden">
             <div className="absolute inset-0 opacity-[0.4] pointer-events-none mix-blend-multiply"
               style={{ backgroundImage: 'url("https://www.transparenttextures.com/patterns/natural-paper.png")' }}
             />
             
             <div className="relative z-10 space-y-6">
                <div className="flex items-center justify-between border-b border-burgundy/10 pb-4">
                   <div className="space-y-1">
                      <span className="text-[10px] text-olive font-serif italic opacity-60 tracking-[0.2em] font-medium uppercase">DAY TRIP 0{idx+1}</span>
                      <h4 className="text-2xl font-heading text-burgundy italic font-medium leading-none">{trip.name}</h4>
                   </div>
                </div>

                <div className="max-h-[300px] overflow-y-auto custom-scrollbar pr-2">
                  <p className="text-[15px] md:text-[16px] text-ink/90 font-normal leading-relaxed italic whitespace-pre-line font-serif">
                    {trip.desc}
                  </p>
                </div>

                <div className="pt-4 border-t border-burgundy/5 flex justify-between items-center text-[8px] tracking-[0.4em] uppercase text-olive/50 font-bold">
                   <span>DAY EXCURSION</span>
                   <span className="text-burgundy/30">✕ CLOSE</span>
                </div>
             </div>
          </div>
        </div>
      </div>
    );
  };

  const t = {
    en: {
      plan: "Plan Your Trip",
      visaTitle: "Visa & Travel",
      visaSub: "Visa (E-Visa)",
      visaDesc: "If you are a US citizen, you must obtain a visa to enter Vietnam. The process is simple, affordable, and completed entirely online.",
      visaExemption: "Note: Some nationalities may qualify for exemptions (typically 30–45 days).",
      applyHere: "Apply Here",
      applyLink1: "Vietnam E-Visa Portal",
      applyLink2: "Vietnamese Visas & Entry/Exit Info",
      keyDetails: "Key Details",
      validity: "Valid for up to 90 days (Single or Multiple Entry)",
      feeNote: "Fee: $25 (Single) / $50 (Multiple) — non-refundable",
      processingNote: "Processing Time: 3–5 Business Days (apply 1–2 weeks early)",
      fee: "Fee",
      processing: "Processing",
      need: "What You'll Need",
      needItems: [
        "Passport valid for 6+ months with specialized scanning",
        "Recent digital portrait (4×6 cm, white background)",
        "Credit/debit card for administrative payment"
      ],
      afterApproval: "After Approval",
      afterApprovalItems: [
        "Download and print at least 2 copies of your e-visa",
        "Present your e-visa + passport at immigration upon arrival"
      ],
      arrivalTips: "Arrival Tips",
      arrivalTipsItems: [
        "You must enter/exit through designated international border gates",
        "Keep both digital and printed copies of your visa handy"
      ],
      portal: "Official E-Visa Portal",
      stay: "Boutique Stays",
      stayDesc: "Hanoi offers a curated selection of heritage hotels. We recommend staying near",
      stayHighlight: "Hoan Kiem Lake",
      staySuffix: "to immerse yourself in the city's old-world charm.",
      priceRange: "Typical Price Range",
      prices: [
        { label: "Budget", value: "$10–$30/night" },
        { label: "Mid-range", value: "$30–$60/night" },
        { label: "Luxury", value: "$80–$200+/night" }
      ],
      oldQuarter: "The Old Quarter",
      oldQuarterDesc: "Best for authentic local life, street food, and historic architecture.",
      frenchQuarter: "The French Quarter",
      frenchQuarterDesc: "Quiet, refined, with wide boulevards and luxury boutiques.",
      reviewedHotels: "Well-reviewed Hotels on TripAdvisor",
      hotelList: [
        "Sofitel Legend Metropole — Iconic luxury stay",
        "Peridot Grand Luxury — Stylish + rooftop pool",
        "Hanoi Tirant Hotel — Great location + value",
        "La Siesta Classic Ma May — Popular boutique option"
      ],
      connectivity: "The Digital Toolkit",
      esim: "E-SIM Solutions",
      esimDesc: "Enable seamless roaming with ByteSim or Gigago. Around 5GB/day is more than enough, as Wi-Fi is widely available.",
      apps: "Essential Local Apps",
      appsDesc: "Download Grab/XanhSM/Be for transport and Zalo for local communication.",
      explore: "Let's Explore",
      exploreSub: "A curated collection of destinations to discover during your stay in Vietnam",
      hanoi: "Hanoi — Culture & Cuisine",
      hanoiDesc: "No trip to Hanoi is complete without experiencing its incredible food and history. From iconic landmarks like the Temple of Literature, Hoan Kiem Lake, and Ho Chi Minh Mausoleum, to the lively Old Quarter, the city is full of culture, charm, and unforgettable flavors. We can organize a group experience—please RSVP if you’re interested!",
      halong: "Ha Long Bay — Overnight Cruise",
      halongDesc: "Ha Long Bay is one of the New Seven Wonders of Nature and a true highlight of northern Vietnam. A 2-day, 1-night cruise takes you through thousands of limestone islands, with opportunities for kayaking, swimming, and relaxing on a beautiful boat. A once-in-a-lifetime experience we highly recommend!",
      ninhbinh: "Ninh Binh — Nature & History",
      ninhbinhDesc: "Ninh Binh is known for its breathtaking landscapes of limestone mountains, peaceful rivers, and lush rice fields—often called “Ha Long Bay on land.” Highlights include boat rides through caves, ancient temples like Bai Dinh Pagoda, and historic sites from Vietnam’s early capital.",
      dayTrips: "Easy Day Trips from Hanoi",
      dayTripsSub: "If you have extra time, these are great half- or full-day excursions near Hanoi",
      dayTripList: [
        { name: "Bat Trang Ceramic Village – Get Hands-On with Pottery", desc: "Bat Trang Ceramic Village is a fun and interactive day trip, especially if you enjoy creative activities. Located just 30 minutes from Hanoi, this village has been producing ceramics for centuries. You can try your hand at making pottery, browse markets filled with colorful bowls and vases, and watch skilled artisans at work. It’s an easy and rewarding half-day excursion.", src: "/langgom.webp" },
        { name: "Ham Lon Mountain – A Mini Adventure Close to the City", desc: "If you’re craving a bit of adventure, Ham Lon Mountain is the closest hiking spot to Hanoi. Just about an hour away, it offers forest trails, a manageable climb, and rewarding views from the summit. Many locals come here for day hikes or overnight camping by the nearby lake. It’s a great option if you want a quick nature fix without traveling far.", src: "/hamlon.webp" },
        { name: "Van Phuc Silk Village – Vietnam’s Silk Heritage", desc: "Only about 30–40 minutes from Hanoi, Van Phuc Silk Village is one of the oldest silk-making communities in Vietnam. Walking through its narrow streets, you’ll see vibrant fabrics hanging overhead and hear the rhythmic clatter of weaving looms. It’s a great place to learn about traditional craftsmanship and pick up high-quality silk scarves or garments directly from local artisans.", src: "/vanphuc.webp" }
      ],
      rsvpTravel: "Please RSVP if you are interested in any of the activities so we can coordinate with a local travel agency."
    },
    vi: {
      plan: "Chuẩn bị cho chuyến đi",
      visaTitle: "Thị thực & Di chuyển",
      visaSub: "Thị thực (E-Visa)",
      visaDesc: "Các bạn mang quốc tịch Mỹ cần xin thị thực điện tử để nhập cảnh Việt Nam. Quy trình hoàn toàn trực tuyến và vô cùng thuận tiện.",
      visaExemption: "Lưu ý: Một số quốc tịch được miễn thị thực ngắn hạn. Vui lòng kiểm tra kỹ trước khi khởi hành.",
      applyHere: "Nộp đơn tại",
      applyLink1: "Cổng Thông Tin E-Visa Việt Nam",
      applyLink2: "Thông tin về thị thực & Xuất nhập cảnh",
      keyDetails: "Thông tin chính",
      validity: "Có hiệu lực tối đa 90 ngày (1 hoặc nhiều lần nhập cảnh)",
      feeNote: "Phí: $25 (1 lần) / $50 (nhiều lần) — không hoàn lại",
      processingNote: "Thời gian xử lý: 3–5 ngày làm việc (nên làm trước 1–2 tuần)",
      fee: "Lệ phí",
      processing: "Thời gian xử lý",
      need: "Hồ sơ cần chuẩn bị",
      needItems: [
        "Hộ chiếu còn hạn trên 6 tháng với bản scan rõ nét",
        "Ảnh chân dung kỹ thuật số mới nhất (4x6 cm)",
        "Thẻ thanh toán quốc tế hợp lệ"
      ],
      afterApproval: "Sau khi được cấp thị thực",
      afterApprovalItems: [
        "Tải xuống và in ít nhất 2 bản thị thực điện tử",
        "Xuất trình thị thực + hộ chiếu khi nhập cảnh"
      ],
      arrivalTips: "Lưu ý khi nhập cảnh",
      arrivalTipsItems: [
        "Bạn phải nhập/xuất cảnh qua các cửa khẩu quốc tế được quy định",
        "Luôn mang theo cả bản in và bản kỹ thuật số trên điện thoại"
      ],
      portal: "Cổng Thông Tin E-Visa",
      stay: "Khách sạn & Lưu trú",
      stayDesc: "Hà Nội sở hữu nhiều không gian lưu trú mang đậm dấu ấn di sản. Chúng mình gợi ý bạn nên ở gần khu vực",
      stayHighlight: "Hồ Hoàn Kiếm",
      staySuffix: "để cảm nhận trọn vẹn vẻ đẹp cổ kính của thành phố.",
      priceRange: "Mức giá tham khảo",
      prices: [
        { label: "Tiết kiệm", value: "250k–750k/đêm" },
        { label: "Trung bình", value: "750k–1.5tr/đêm" },
        { label: "Cao cấp", value: "2tr–5tr+/đêm" }
      ],
      oldQuarter: "Khu Phố Cổ",
      oldQuarterDesc: "Trải nghiệm nhịp sống bản địa, ẩm thực đường phố và kiến trúc cổ.",
      frenchQuarter: "Khu Phố Pháp",
      frenchQuarterDesc: "Không gian yên tĩnh, sang trọng với các công trình kiến trúc thuộc địa.",
      reviewedHotels: "Một số khách sạn được đánh giá tốt (TripAdvisor)",
      hotelList: [
        "Sofitel Legend Metropole — Khách sạn di sản đẳng cấp",
        "Peridot Grand Luxury — Sang trọng + hồ bơi tầng thượng",
        "Hanoi Tirant Hotel — Vị trí đẹp + giá tốt",
        "La Siesta Classic Ma May — Khách sạn boutique phổ biến"
      ],
      connectivity: "Giải pháp Kết nối",
      esim: "Giải pháp E-SIM",
      esimDesc: "Sử dụng ByteSim hoặc Gigago để duy trì kết nối (Gói 5GB/ngày là lựa chọn tối ưu).",
      apps: "Ứng dụng Cần thiết",
      appsDesc: "Tải ứng dụng Grab/XanhSM/Be (di chuyển) và Zalo (liên lạc) để thuận tiện hơn.",
      explore: "Khám phá",
      exploreSub: "Bộ sưu tập những điểm đến đặc sắc nhất mà chúng mình mong muốn giới thiệu tới các bạn",
      hanoi: "Hà Nội — Văn hóa & Ẩm thực",
      hanoiDesc: "Hà Nội là nơi tụi mình rất mong mọi người được trải nghiệm trọn vẹn từ những địa điểm nổi tiếng như Văn Miếu, Hồ Hoàn Kiếm, Lăng Bác đến khu phố cổ nhộn nhịp.\\n\\nChỉ cần 2 ngày 1 đêm là đủ để cảm nhận nét đặc trưng của thành phố và thưởng thức rất nhiều món ngon.\\n\\n Tụi mình có thể tổ chức đi theo nhóm — nhớ RSVP nếu bạn quan tâm nha!",
      halong: "Vịnh Hạ Long — Du thuyền qua đêm",
      halongDesc: "Đây là một trong những điểm đến đẹp nhất Việt Nam và cũng là trải nghiệm tụi mình rất recommend.\\n\\nHành trình 2 ngày 1 đêm sẽ đưa bạn qua hàng ngàn đảo đá vôi tuyệt đẹp, kèm theo các hoạt động như chèo kayak, bơi lội và thư giãn trên tàu.\\n\\n Sẽ là một trải nghiệm rất đáng nhớ!",
      ninhbinh: "Ninh Bình — Thiên nhiên & lịch sử",
      ninhbinhDesc: "Ninh Bình nổi tiếng với cảnh quan núi đá vôi, sông nước và ruộng lúa xanh mướt — thường được gọi là “Vịnh Hạ Long trên cạn”.\\n\\nBạn có thể đi thuyền xuyên hang, tham quan chùa Bái Đính và các di tích lịch sử cổ.",
      dayTrips: "Các chuyến đi gần Hà Nội",
      dayTripsSub: "Nếu bạn có thêm thời gian, dưới đây là những lựa chọn tuyệt vời cho chuyến đi trong ngày",
      dayTripList: [
        { 
          name: "Làng gốm Bát Tràng – trải nghiệm làm gốm", 
          desc: "Làng gốm Bát Tràng là một điểm đến thú vị và đầy tính tương tác, đặc biệt dành cho những ai yêu thích các hoạt động sáng tạo. Chỉ cách Hà Nội 30 phút di chuyển, ngôi làng này đã có truyền thống làm gốm từ hàng thế kỷ. Bạn có thể tự tay nhào nặn gốm, dạo quanh các gian hàng rực rỡ sắc màu và tận mắt chiêm ngưỡng các nghệ nhân tài hoa làm việc. Đây là một chuyến đi nửa ngày nhẹ nhàng nhưng đầy ý nghĩa.", 
          src: "/langgom.webp" 
        },
        { 
          name: "Núi Hàm Lợn – trekking nhẹ gần Hà Nội", 
          desc: "Nếu bạn đang tìm kiếm một chút phiêu lưu, Núi Hàm Lợn là địa điểm trekking gần Hà Nội nhất. Chỉ mất khoảng một giờ di chuyển, nơi đây đón bạn bằng những con đường mòn xuyên rừng, dốc leo vừa sức và tầm nhìn tuyệt đẹp từ đỉnh núi. Nhiều người dân địa phương thường đến đây để đi bộ đường dài trong ngày hoặc cắm trại qua đêm bên hồ nước thơ mộng. Một lựa chọn tuyệt vời để 'đổi gió' giữa thiên nhiên mà không cần đi quá xa.", 
          src: "/hamlon.webp" 
        },
        { 
          name: "Làng lụa Vạn Phúc – tìm hiểu nghề dệt truyền thống", 
          desc: "Cách Hà Nội chỉ 30–40 phút, Làng lụa Vạn Phúc là một trong những làng nghề dệt lụa lâu đời nhất Việt Nam. Sải bước trên những con ngõ nhỏ, bạn sẽ thấy những dải lụa rực rỡ sắc màu treo cao và lắng nghe tiếng khung cửi lách cách nhịp nhàng. Đây là nơi lý tưởng để tìm hiểu về nghề thủ công truyền thống và chọn mua những món quà lụa cao cấp trực tiếp từ các nghệ nhân.", 
          src: "/vanphuc.webp" 
        }
      ],
      rsvpTravel: "Nếu bạn muốn tham gia hoạt động nào, nhớ RSVP để tụi mình sắp xếp nha!"
    }
  }[lang];

  useEffect(() => {
    const ctx = gsap.context(() => {
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

      gsap.from(".visa-reveal", {
        opacity: 0,
        y: 40,
        duration: 1.5,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".visa-reveal",
          start: "top 85%",
        }
      });

      gsap.fromTo(".logistics-grid-reveal .travel-card", 
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          stagger: 0.15,
          duration: 1.2,
          ease: "power2.out",
          scrollTrigger: {
            trigger: ".logistics-grid-reveal",
            start: "top 85%",
          }
        }
      );

      gsap.fromTo(".gallery-reveal .travel-card", 
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          stagger: 0.15,
          duration: 1.2,
          ease: "power2.out",
          scrollTrigger: {
            trigger: ".gallery-reveal",
            start: "top 85%",
            onEnter: () => ScrollTrigger.refresh()
          }
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, [lang]);

  return (
    <section ref={sectionRef} id="travel" className="relative py-24 md:py-40 bg-surface">
      <div className="absolute inset-0 opacity-[0.06] texture-grain pointer-events-none mix-blend-multiply" />
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none mix-blend-multiply"
        style={{ backgroundImage: 'url("https://www.transparenttextures.com/patterns/natural-paper.png")' }}
      />

      <div className="container mx-auto px-6 md:px-12 relative z-10">
        <div className="flex flex-col items-center mb-24 md:mb-36 travel-header-reveal">
           <span className="text-[10px] md:text-xs tracking-[0.6em] uppercase text-olive font-light mb-6 text-center">{t.plan}</span>
           <h2 className="text-5xl md:text-7xl font-heading text-burgundy italic text-center tracking-tight">{t.visaTitle}</h2>
           <div className="flex items-center gap-6 mt-12 opacity-40">
              <div className="w-16 h-[1px] bg-olive"></div>
              <div className="w-1.5 h-1.5 rounded-full border border-olive rotate-45"></div>
              <div className="w-16 h-[1px] bg-olive"></div>
           </div>
        </div>

        <div className="space-y-20 md:space-y-32 mb-48">
          <div className="travel-card relative group visa-reveal">
            <div className="absolute -inset-1 border border-olive/5 rounded-sm pointer-events-none transition-all group-hover:border-olive/20"></div>
            <div className="bg-white/60 backdrop-blur-sm border-double border-4 border-olive/10 p-8 md:p-16 relative z-10 shadow-sm transition-all hover:bg-white/80">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-8 mb-14 border-b border-olive/10 pb-12">
                <div className="space-y-3">
                  <span className="text-[9px] tracking-[0.5em] uppercase text-olive/50 block font-medium">DOCUMENTATION REF. 001</span>
                  <h2 className="text-4xl md:text-6xl font-heading text-burgundy italic font-medium leading-tight">{t.visaSub}</h2>
                </div>
                <div className="flex items-center gap-4 opacity-[0.15] grayscale brightness-50">
                   <div className="h-[1px] w-12 bg-black"></div>
                   <FileText className="w-10 h-10 stroke-1" />
                </div>
              </div>
              
              <div className="space-y-16 text-ink/80 font-light leading-relaxed">
                <div className="relative pl-10 border-l-[0.5px] border-olive/30 max-w-4xl">
                  <p className="text-xl md:text-3xl font-heading italic text-burgundy mb-10 leading-[1.4]">{t.visaDesc}</p>
                  <div className="px-8 py-6 bg-olive/[0.05] border-l-4 border-olive/30 rounded-r-sm max-w-2xl shadow-sm">
                    <p className="text-[16px] md:text-[18px] italic text-olive/90 font-serif leading-relaxed">{t.visaExemption}</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 border-t border-olive/10 pt-16">
                   <div className="space-y-10">
                      <h4 className="text-[11px] tracking-[0.4em] uppercase text-olive font-bold">{t.applyHere}</h4>
                      <div className="space-y-8">
                        <a href="https://evisa.gov.vn" target="_blank" rel="noopener noreferrer" 
                           className="group/btn relative inline-flex items-center gap-5 px-12 py-6 bg-burgundy text-surface text-[11px] tracking-[0.5em] uppercase transition-all overflow-hidden font-medium shadow-lg shadow-burgundy/10">
                          <span className="relative z-10">{t.applyLink1}</span>
                          <ExternalLink className="w-4 h-4 relative z-10 transition-transform group-hover/btn:translate-x-1" />
                          <div className="absolute inset-x-0 bottom-0 h-[2px] bg-white transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left"></div>
                        </a>
                        
                        <a href="https://vn.usembassy.gov/vietnamese-visas-and-entry-exit/" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 text-[11px] tracking-[0.1em] group/link text-burgundy/60 hover:text-burgundy transition-colors pl-1">
                           <span className="border-b border-transparent group-hover/link:border-burgundy/30 transition-all italic">{t.applyLink2}</span>
                           <ExternalLink className="w-3 h-3 opacity-0 group-hover/link:opacity-100 transition-all" />
                        </a>
                      </div>
                   </div>

                   <div className="space-y-10">
                      <h4 className="text-[11px] tracking-[0.4em] uppercase text-olive font-bold">{t.keyDetails}</h4>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-10">
                         <div className="flex items-start gap-5">
                            <p className="text-4xl font-heading text-burgundy italic leading-none">90</p>
                            <div className="h-10 w-[1px] bg-olive/10"></div>
                            <div className="space-y-1">
                               <p className="text-[11px] uppercase tracking-[0.2em] text-olive font-bold leading-none">{lang === 'en' ? 'Days' : 'Ngày'}</p>
                               <p className="text-[13px] md:text-[14px] text-ink/80 font-normal italic leading-normal">
                                  {lang === 'en' ? 'Max. Validity (Single/Multiple)' : 'Hiệu lực tối đa (1/Nhiều lần)'}
                               </p>
                            </div>
                         </div>

                         <div className="flex items-start gap-5">
                            <p className="text-4xl font-heading text-burgundy italic leading-none">$25</p>
                            <div className="h-10 w-[1px] bg-olive/10"></div>
                            <div className="space-y-1">
                               <p className="text-[11px] uppercase tracking-[0.2em] text-olive font-bold leading-none">{lang === 'en' ? 'Fee' : 'Lệ phí'}</p>
                               <p className="text-[13px] md:text-[14px] text-ink/80 font-normal italic leading-normal">
                                  {lang === 'en' ? '/ $50 (Multiple) — Non-refundable' : '/ $50 (Nhiều lần) — K.hoàn lại'}
                               </p>
                            </div>
                         </div>
                      </div>

                      <div className="flex items-start gap-5 pt-4">
                         <p className="text-4xl font-heading text-burgundy italic font-semibold leading-none">3-5</p>
                         <div className="h-10 w-[1px] bg-olive/10"></div>
                         <div className="space-y-1">
                            <p className="text-[11px] uppercase tracking-[0.2em] text-olive font-bold leading-none">{lang === 'en' ? 'Business Days' : 'Ngày làm việc'}</p>
                            <p className="text-[13px] md:text-[14px] text-ink/80 font-normal italic leading-normal">
                               {lang === 'en' ? 'Apply 1–2 weeks early for peace of mind' : 'Nên làm trước 1–2 tuần để đảm bảo'}
                            </p>
                         </div>
                      </div>
                   </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-16 pt-16 border-t border-olive/10">
                  <div className="space-y-8">
                    <h4 className="text-[11px] tracking-[0.5em] uppercase text-olive font-bold">{t.need}</h4>
                    <ul className="space-y-6">
                      {t.needItems.map((item, i) => (
                        <li key={i} className="flex gap-4 text-[16px] md:text-[17px] items-start group/item">
                          <span className="text-olive/50 font-serif italic text-xl leading-none mt-[-2px]">0{i+1}.</span>
                          <span className="font-normal leading-relaxed text-ink/90">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="space-y-8">
                    <h4 className="text-[11px] tracking-[0.5em] uppercase text-olive font-bold">{t.afterApproval}</h4>
                    <ul className="space-y-6">
                      {t.afterApprovalItems.map((item, i) => (
                        <li key={i} className="flex gap-4 text-[16px] md:text-[17px] items-start group/item">
                          <span className="text-olive/50 font-serif italic text-xl leading-none mt-[-2px]">0{i+1}.</span>
                          <span className="font-normal leading-relaxed text-ink/90">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="space-y-8">
                    <h4 className="text-[11px] tracking-[0.5em] uppercase text-olive font-bold">{t.arrivalTips}</h4>
                    <ul className="space-y-6">
                      {t.arrivalTipsItems.map((item, i) => (
                        <li key={i} className="flex gap-4 text-[16px] md:text-[17px] items-start group/item">
                          <span className="text-olive/50 font-serif italic text-xl leading-none mt-[-2px]">0{i+1}.</span>
                          <span className="font-normal leading-relaxed text-ink/90">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 md:gap-12 logistics-grid-reveal items-stretch">
            <div className="travel-card bg-surface/40 border border-olive/10 p-8 md:p-14 relative overflow-hidden group shadow-sm transition-all hover:bg-surface/50 flex flex-col h-full min-h-[500px]">
               <div className="absolute -top-16 -right-16 w-48 h-48 opacity-[0.03] bg-burgundy rounded-full group-hover:scale-110 transition-transform duration-[2s]"></div>
               <div className="relative z-10 flex flex-col h-full">
                  <div className="flex items-center justify-between mb-12 pb-8 border-b border-olive/10">
                    <div className="flex items-center gap-6 text-burgundy">
                        <div className="w-10 h-10 rounded-full border border-olive/20 flex items-center justify-center">
                            <MapPin className="w-4 h-4 stroke-1 text-olive" />
                        </div>
                        <h3 className="text-3xl font-heading italic font-medium tracking-tight">{t.stay}</h3>
                    </div>
                  </div>
                  <p className="text-ink/90 font-normal leading-[1.8] mb-12 text-[19px] md:text-[21px] font-serif italic max-w-xl">
                    {t.stayDesc} <strong className="text-burgundy font-semibold border-b border-burgundy/20 pb-1">{t.stayHighlight}</strong> {t.staySuffix}
                  </p>
                  <div className="space-y-14 flex-grow flex flex-col">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                        <div className="flex items-start p-6 bg-white/40 border-l-[0.5px] border-olive/20 transition-all hover:bg-white/80">
                            <div className="space-y-2">
                              <h4 className="text-burgundy text-[12px] uppercase tracking-[0.3em] font-bold">{t.oldQuarter}</h4>
                              <p className="text-ink/80 text-[14px] md:text-[15px] leading-[1.8] font-normal">{t.oldQuarterDesc}</p>
                            </div>
                        </div>
                        <div className="flex items-start p-6 bg-white/40 border-l-[0.5px] border-olive/20 transition-all hover:bg-white/80 h-full">
                            <div className="space-y-2">
                              <h4 className="text-burgundy text-[12px] uppercase tracking-[0.3em] font-bold">{t.frenchQuarter}</h4>
                              <p className="text-ink/80 text-[14px] md:text-[15px] leading-[1.8] font-normal">{t.frenchQuarterDesc}</p>
                            </div>
                        </div>
                      </div>
                      <div className="pt-10 border-t border-olive/10">
                        <h4 className="text-[11px] tracking-[0.5em] uppercase text-olive font-bold mb-10">{t.priceRange}</h4>
                        <div className="grid grid-cols-3 gap-8">
                          {t.prices && t.prices.map((p: any, i: number) => (
                            <div key={i} className="space-y-3">
                              <p className="text-[12px] text-olive/80 uppercase tracking-widest leading-none font-semibold">{p.label}</p>
                              <p className="text-2xl font-heading text-burgundy italic leading-none">{p.value}</p>
                            </div>
                          ))}
                        </div>
                      </div>
                      <div className="pt-10 border-t border-olive/10 mt-auto">
                        <div className="flex items-center gap-4 mb-10">
                          <h4 className="text-[11px] tracking-[0.5em] uppercase text-olive font-bold">{t.reviewedHotels}</h4>
                          <div className="h-[1px] flex-grow bg-olive/5"></div>
                        </div>
                        <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-12 gap-y-5">
                          {t.hotelList && t.hotelList.map((hotel: string, i: number) => (
                            <li key={i} className="flex gap-4 text-[15px] md:text-[16px] items-start group/hotel">
                              <span className="text-olive/50 mt-1 font-bold">✦</span>
                              <span className="font-normal leading-relaxed group-hover/hotel:text-burgundy transition-colors text-ink/90">{hotel}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                  </div>
               </div>
            </div>

            <div className="travel-card bg-olive/[0.04] border-double border-4 border-olive/5 p-8 md:p-14 relative group flex flex-col h-full min-h-[500px] overflow-hidden">
               <div className="absolute -bottom-10 -right-10 w-64 h-64 opacity-[0.03] pointer-events-none rotate-12">
                  <Smartphone className="w-full h-full" />
               </div>
               <div className="relative z-10 flex flex-col h-full">
                  <div className="flex items-center gap-6 text-olive mb-12 pb-8 border-b border-olive/10">
                    <div className="w-10 h-10 rounded-full border border-olive/20 flex items-center justify-center">
                        <Smartphone className="w-4 h-4 stroke-1" />
                    </div>
                    <h3 className="text-3xl font-heading text-burgundy italic font-medium">{t.connectivity}</h3>
                  </div>
                  <div className="space-y-12 flex-grow flex flex-col">
                    <div className="bg-white/40 border border-olive/10 p-8 relative group/sim overflow-hidden shadow-sm transition-all hover:bg-white/60">
                       <div className="absolute top-0 right-0 p-4 opacity-10 group-hover/sim:opacity-20 transition-opacity">
                          <div className="flex gap-1 items-end h-6">
                            <div className="w-1 h-2 bg-olive"></div>
                            <div className="w-1 h-3 bg-olive"></div>
                            <div className="w-1 h-4 bg-olive"></div>
                            <div className="w-1 h-5 bg-burgundy"></div>
                          </div>
                       </div>
                       <h4 className="text-[11px] uppercase tracking-[0.4em] text-olive font-bold mb-6">{t.esim}</h4>
                       <div className="flex items-baseline gap-4 mb-6">
                          <p className="text-5xl font-heading text-burgundy italic">5GB</p>
                          <p className="text-[10px] uppercase tracking-widest text-olive/60 font-bold border-l border-olive/10 pl-4">/ {lang === 'en' ? 'Day' : 'Ngày'}</p>
                       </div>
                       <p className="text-[15px] md:text-[17px] text-ink/90 leading-relaxed font-serif italic max-w-xs">{t.esimDesc}</p>
                    </div>
                    <div className="space-y-8 flex-grow flex flex-col">
                       <h4 className="text-[11px] uppercase tracking-[0.4em] text-olive font-bold">{t.apps}</h4>
                       <div className="grid grid-cols-1 gap-4 flex-grow">
                          {[
                            { src: "/grab.webp", name: "Grab", desc: lang === 'en' ? "Rides, Food & Delivery" : "Di chuyển, Giao đồ ăn", url: "https://www.grab.com/vn/en/" },
                            { src: "/xanhsm.webp", name: "Xanh SM", desc: lang === 'en' ? "Electric Taxi & Bikes" : "Taxi điện & Xe máy điện", url: "https://www.xanhsm.com/" },
                            { src: "/be.webp", name: "Be", desc: lang === 'en' ? "Local Ride-sharing" : "Ứng dụng gọi xe đa dịch vụ", url: "https://be.com.vn/#intro" },
                            { src: "/zalo.webp", name: "Zalo", desc: lang === 'en' ? "Primary Local Messaging" : "Liên lạc & Nhắn tin chính", url: "https://zalo.me/vi/" }
                          ].map((app, idx) => (
                            <a key={idx} href={app.url} target="_blank" rel="noopener noreferrer" className="group/appitem flex items-center gap-5 p-4 bg-white/20 border border-transparent transition-all hover:bg-white/50 hover:border-olive/10 hover:translate-x-2 no-underline">
                               <div className="relative w-14 h-14 bg-white rounded-sm p-3 border border-olive/5 shadow-sm group-hover/appitem:shadow-md transition-all">
                                  <div className="relative w-full h-full grayscale group-hover/appitem:grayscale-0 transition-transform duration-500 group-hover/appitem:scale-110">
                                     <Image src={app.src} alt={app.name} fill sizes="56px" className="object-contain" />
                                  </div>
                               </div>
                               <div className="flex-grow">
                                  <h5 className="text-[11px] uppercase tracking-[0.3em] text-burgundy font-bold mb-1 leading-none">{app.name}</h5>
                                  <p className="text-[13px] text-olive/90 font-serif italic leading-none">{app.desc}</p>
                               </div>
                               <div className="opacity-0 group-hover/appitem:opacity-30 transition-opacity">
                                  <ExternalLink className="w-3 h-3 text-burgundy" />
                                </div>
                            </a>
                          ))}
                       </div>
                    </div>
                  </div>
               </div>
            </div>
          </div>
        </div>

        <div className="relative pt-40 border-t border-olive/10">
          <div className="mb-32 text-center max-w-3xl mx-auto px-6">
             <span className="text-[11px] tracking-[0.8em] uppercase text-olive/50 block mb-8 leading-none font-medium text-center">{lang === 'en' ? 'VOYAGE JOURNAL' : 'NHẬT KÝ HÀNH TRÌNH'}</span>
             <h3 className="text-5xl md:text-7xl font-heading text-burgundy italic font-medium tracking-tight leading-tight">{t.explore}</h3>
             <div className="flex items-center justify-center gap-4 mt-10 opacity-30">
                <div className="w-8 h-[0.5px] bg-olive"></div>
                <div className="w-1.5 h-1.5 rounded-full bg-burgundy"></div>
                <div className="w-8 h-[0.5px] bg-olive"></div>
             </div>
             <p className="text-olive/95 font-normal mt-8 md:mt-12 italic leading-relaxed md:leading-loose font-serif text-lg md:text-[1.3rem] lg:text-[1.4rem] border-x border-olive/10 px-6 md:px-12 mx-auto max-w-2xl">
                {t.exploreSub}
             </p>
          </div>

          <div className="gallery-reveal grid grid-cols-1 lg:grid-cols-3 gap-16 lg:gap-32 pb-24">
            <DestinationCard 
              id="hanoi"
              title={t.hanoi.split('—')[0]}
              desc={t.hanoiDesc}
              img="/hanoi.webp"
              sub="HERITAGE HEART"
              refLabel="REF. 01"
            />
            <DestinationCard 
              id="halong"
              title={t.halong.split('—')[0]}
              desc={t.halongDesc}
              img="/halong.webp"
              sub="EMERALD DREAM"
              refLabel="REF. 02"
            />
            <DestinationCard 
              id="ninhbinh"
              title={t.ninhbinh.split('—')[0]}
              desc={t.ninhbinhDesc}
              img="/ninhbinh.webp"
              sub="INLAND MAJESTY"
              refLabel="REF. 03"
            />
          </div>

          <div className="mt-24 pt-16 border-t border-olive/10">
            <div className="max-w-7xl mx-auto space-y-20">
                <div className="text-center max-w-4xl mx-auto px-6">
                   <h3 className="text-4xl md:text-6xl font-heading text-burgundy italic font-medium leading-tight">{t.dayTrips}</h3>
                   <div className="flex items-center justify-center gap-4 mt-8 opacity-30">
                      <div className="w-1.5 h-1.5 rounded-full bg-burgundy/40"></div>
                      <div className="w-8 h-[0.5px] bg-olive"></div>
                      <div className="w-1.5 h-1.5 rounded-full bg-burgundy/40"></div>
                   </div>
                   <p className="text-olive/95 font-normal mt-8 italic leading-relaxed font-serif text-lg md:text-[1.3rem] border-x border-olive/10 px-6 py-2 inline-block lg:block lg:max-w-3xl lg:mx-auto">
                      {t.dayTripsSub}
                   </p>
                </div>

               <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 lg:gap-16">
                  {t.dayTripList.map((trip: any, idx: number) => (
                    <DayTripCard key={idx} trip={trip} idx={idx} />
                  ))}
               </div>
            </div>
          </div>

          <div className="mt-24 lg:mt-32 p-8 md:p-10 relative w-fit max-w-2xl mx-auto travel-card text-center bg-white/10 backdrop-blur-[1px] group overflow-hidden">
              <div className="absolute inset-0 border border-olive/10 rounded-sm pointer-events-none group-hover:border-burgundy/20 transition-colors"></div>
              <div className="relative z-10 space-y-6">
                 <div className="flex items-center justify-center gap-4 opacity-[0.15]">
                    <div className="w-1 h-1 rounded-full bg-burgundy"></div>
                    <div className="w-8 h-[0.5px] bg-burgundy"></div>
                    <div className="w-1 h-1 rounded-full bg-burgundy"></div>
                 </div>
                 <p className="text-burgundy/80 italic font-heading text-lg md:text-xl leading-relaxed px-4 md:px-8">
                    "{t.rsvpTravel}"
                 </p>
                 <div className="pt-2">
                    <div className="w-[0.5px] h-8 bg-gradient-to-b from-burgundy/20 to-transparent mx-auto"></div>
                 </div>
              </div>
          </div>
        </div>
      </div>
      <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-olive/20 to-transparent"></div>
    </section>
  );
};

export default TravelInfo;
