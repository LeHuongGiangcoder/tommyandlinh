"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Send, User, Users, Utensils, AlertCircle, MessageSquare, CheckCircle2 } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

interface RSVPProps {
  lang?: 'en' | 'vi';
}

const RSVP = ({ lang = 'en' }: RSVPProps) => {
  const sectionRef = useRef<HTMLElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const translations = {
    en: {
      subtitle: "RSVP",
      title: "Kindly Respond",
      deadline: "Please respond by December 15, 2026",
      fields: {
        name: "Full Name",
        attendance: "Will you attend?",
        guests: "Number of Guests",
        meal: "Meal Preference",
        dietary: "Dietary Restrictions",
        message: "Message to us",
        submit: "Send Response",
        submitting: "Sending...",
        success: "Thank you for your response!",
        successDesc: "Your RSVP has been successfully received. We can't wait to celebrate with you!"
      },
      options: {
        yes: "Yes, count me in!",
        no: "Sorry, I can't make it",
        standard: "Standard",
        vegetarian: "Vegetarian",
        vegan: "Vegan"
      }
    },
    vi: {
      subtitle: "Xác nhận tham dự",
      title: "Lời Hồi Đáp",
      deadline: "Vui lòng xác nhận trước ngày 15 tháng 12 năm 2026",
      fields: {
        name: "Họ và Tên",
        attendance: "Bạn sẽ tham dự chứ?",
        guests: "Số lượng khách",
        meal: "Chế độ ăn",
        dietary: "Yêu cầu đặc biệt (Dị ứng...)",
        message: "Lời nhắn gửi đến tụi mình",
        submit: "Gửi phản hồi",
        submitting: "Đang gửi...",
        success: "Cảm ơn bạn đã phản hồi!",
        successDesc: "Thông tin của bạn đã được ghi lại. Chúng mình rất mong chờ được gặp bạn!"
      },
      options: {
        yes: "Có, mình sẽ đến",
        no: "Tiếc quá, mình không đến được",
        standard: "Tiêu chuẩn",
        vegetarian: "Ăn chay",
        vegan: "Ăn thuần chay"
      }
    }
  };

  const t = translations[lang];

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Reveal header
      gsap.from(".rsvp-reveal", {
        opacity: 0,
        y: 40,
        duration: 1.2,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
        }
      });

      // Reveal form fields
      gsap.from(".rsvp-field-reveal", {
        opacity: 0,
        y: 20,
        stagger: 0.1,
        duration: 1,
        ease: "power2.out",
        scrollTrigger: {
          trigger: ".rsvp-form",
          start: "top 85%",
        }
      });
      
      // Floating leaf parallax
      gsap.to(".rsvp-leaf", {
        y: -100,
        rotation: 20,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: true
        }
      });
    }, sectionRef);

    return () => ctx.revert();
  }, [lang]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      if (formRef.current) formRef.current.reset();
    }, 1500);
  };

  return (
    <section ref={sectionRef} id="rsvp" className="relative py-24 md:py-40 bg-burgundy overflow-hidden selection:bg-surface selection:text-burgundy">
      {/* Texture & Effects */}
      <div className="absolute inset-0 opacity-[0.12] texture-grain pointer-events-none mix-blend-overlay" />
      <div className="absolute inset-0 opacity-[0.04] pointer-events-none mix-blend-screen"
        style={{ backgroundImage: 'url("https://www.transparenttextures.com/patterns/natural-paper.png")' }}
      />
      
      {/* Strategic Ambient Lighting for Contrast */}
      <div className="absolute top-[10%] left-[-10%] w-[500px] h-[500px] bg-white/[0.03] rounded-full filter blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[10%] right-[-10%] w-[600px] h-[600px] bg-white/[0.02] rounded-full filter blur-[120px] pointer-events-none" />

      <div className="container mx-auto px-6 relative z-10">
        {/* Centered Header */}
        <div className="max-w-2xl mx-auto text-center mb-16 md:mb-24 rsvp-reveal">
          <span className="text-surface/80 text-[12px] tracking-[0.7em] uppercase font-medium block mb-6 animate-pulse-slow">{t.subtitle}</span>
          <h2 className="text-surface font-heading italic text-5xl md:text-7xl tracking-tight leading-tight mb-8">{t.title}</h2>
          <div className="w-16 h-[1px] bg-[#d4af37]/60 mx-auto mb-8"></div>
          <p className="text-surface/80 font-light italic text-base md:text-lg tracking-wide leading-relaxed">{t.deadline}</p>
        </div>

        {/* Unified Elegant Form Card */}
        <div className="max-w-3xl mx-auto rsvp-form">
          {!isSubmitted ? (
            <form ref={formRef} onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-12 bg-white/[0.02] border border-white/5 p-8 md:p-16 backdrop-blur-md">
              {/* Name (Full Width) */}
              <div className="col-span-full rsvp-field-reveal">
                <label className="block text-surface/90 text-[11px] tracking-[0.34em] uppercase mb-4 ml-1 font-medium">{t.fields.name}</label>
                <div className="relative group">
                  <User className="absolute left-0 top-1/2 -translate-y-1/2 w-4 h-4 text-[#d4af37]/80 transition-colors group-focus-within:text-[#d4af37]" />
                  <input 
                    required
                    type="text"
                    className="w-full bg-transparent border-b border-white/10 px-8 py-4 text-surface placeholder:text-surface/20 focus:outline-none focus:border-[#d4af37]/60 transition-all duration-500 rounded-none font-light"
                  />
                </div>
              </div>

              {/* Attendance (Full Width) */}
              <div className="col-span-full rsvp-field-reveal">
                <label className="block text-surface/90 text-[11px] tracking-[0.34em] uppercase mb-6 ml-1 font-medium">{t.fields.attendance}</label>
                <div className="flex flex-col sm:flex-row gap-6">
                  {['yes', 'no'].map((opt) => (
                    <label key={opt} className="relative cursor-pointer flex-1 group">
                      <input type="radio" name="attendance" className="peer hidden" required />
                      <div className="bg-white/[0.03] border border-white/10 px-8 h-24 flex items-center justify-center text-center transition-all duration-500 peer-checked:bg-white/[0.08] peer-checked:border-[#d4af37]/60 group-hover:border-white/20">
                        <span className="text-[11px] tracking-[0.2em] text-surface uppercase font-light leading-relaxed">
                          {opt === 'yes' ? t.options.yes : t.options.no}
                        </span>
                      </div>
                    </label>
                  ))}
                </div>
              </div>

              {/* Guests */}
              <div className="rsvp-field-reveal">
                <label className="block text-surface/90 text-[11px] tracking-[0.34em] uppercase mb-4 ml-1 font-medium">{t.fields.guests}</label>
                <div className="relative group">
                  <Users className="absolute left-0 top-1/2 -translate-y-1/2 w-4 h-4 text-[#d4af37]/80 transition-colors group-focus-within:text-[#d4af37]" />
                  <input 
                    type="number"
                    min="1"
                    max="10"
                    placeholder="1"
                    className="w-full bg-transparent border-b border-white/10 px-8 py-4 text-surface placeholder:text-surface/20 focus:outline-none focus:border-[#d4af37]/60 transition-all duration-500 rounded-none font-light appearance-none"
                  />
                </div>
              </div>

              {/* Meal */}
              <div className="rsvp-field-reveal">
                <label className="block text-surface/90 text-[11px] tracking-[0.34em] uppercase mb-4 ml-1 font-medium">{t.fields.meal}</label>
                <div className="relative group">
                  <Utensils className="absolute left-0 top-1/2 -translate-y-1/2 w-4 h-4 text-[#d4af37]/80 transition-colors group-focus-within:text-[#d4af37]" />
                  <select className="w-full bg-transparent border-b border-white/10 px-8 py-4 text-surface focus:outline-none focus:border-[#d4af37]/60 transition-all duration-500 rounded-none font-light appearance-none cursor-pointer">
                    <option value="standard" className="bg-burgundy text-surface">{t.options.standard}</option>
                    <option value="vegetarian" className="bg-burgundy text-surface">{t.options.vegetarian}</option>
                    <option value="vegan" className="bg-burgundy text-surface">{t.options.vegan}</option>
                  </select>
                </div>
              </div>

              {/* Dietary */}
              <div className="col-span-full rsvp-field-reveal">
                <label className="block text-surface/90 text-[11px] tracking-[0.34em] uppercase mb-4 ml-1 font-medium">{t.fields.dietary}</label>
                <div className="relative group">
                  <AlertCircle className="absolute left-0 top-5 w-4 h-4 text-[#d4af37]/80 transition-colors group-focus-within:text-[#d4af37]" />
                  <textarea 
                    rows={2}
                    className="w-full bg-transparent border-b border-white/10 px-8 py-4 text-surface placeholder:text-surface/20 focus:outline-none focus:border-[#d4af37]/60 transition-all duration-500 rounded-none font-light resize-none"
                  />
                </div>
              </div>

              {/* Message */}
              <div className="col-span-full rsvp-field-reveal">
                <label className="block text-surface/90 text-[11px] tracking-[0.34em] uppercase mb-4 ml-1 font-medium">{t.fields.message}</label>
                <div className="relative group">
                  <MessageSquare className="absolute left-0 top-5 w-4 h-4 text-[#d4af37]/80 transition-colors group-focus-within:text-[#d4af37]" />
                  <textarea 
                    rows={3}
                    className="w-full bg-transparent border-b border-white/10 px-8 py-4 text-surface placeholder:text-surface/20 focus:outline-none focus:border-[#d4af37]/60 transition-all duration-500 rounded-none font-light resize-none"
                  />
                </div>
              </div>

              {/* Submit Button */}
              <div className="col-span-full pt-6 rsvp-field-reveal">
                <button 
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full group relative overflow-hidden bg-burgundy hover:bg-surface text-surface hover:text-burgundy border border-white/20 py-6 transition-all duration-700 disabled:opacity-50"
                >
                  <div className="relative flex items-center justify-center gap-4 z-10 transition-transform duration-700 group-hover:scale-105">
                    <span className="text-[12px] tracking-[0.5em] uppercase font-semibold">
                      {isSubmitting ? t.fields.submitting : t.fields.submit}
                    </span>
                    {!isSubmitting && <Send className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-500" />}
                  </div>
                </button>
              </div>
            </form>
          ) : (
            <div className="flex flex-col items-center justify-center text-center py-24 bg-white/[0.02] border border-white/5 backdrop-blur-md rsvp-reveal">
              <div className="w-24 h-24 rounded-full border border-olive/30 flex items-center justify-center mb-10">
                <CheckCircle2 className="w-12 h-12 text-surface opacity-80" />
              </div>
              <h3 className="text-4xl font-heading text-surface italic mb-8 tracking-tight">{t.fields.success}</h3>
              <p className="text-surface/80 font-light italic text-lg leading-relaxed max-w-sm mx-auto">{t.fields.successDesc}</p>
            </div>
          )}
        </div>
      </div>
      
      {/* Visual Ending Line */}
      <div className="mt-24 md:mt-32 text-center opacity-20 rsvp-reveal">
        <div className="w-[1px] h-20 bg-gradient-to-b from-white to-transparent mx-auto"></div>
      </div>
    </section>
  );
};

export default RSVP;
