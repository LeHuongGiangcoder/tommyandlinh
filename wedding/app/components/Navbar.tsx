"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';

const Navbar: React.FC<{ lang: 'en' | 'vi', setLang: (l: 'en' | 'vi') => void }> = ({ lang, setLang }) => {
  const [scrolled, setScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const t = {
    en: [
      { name: 'Home', href: '#hero' },
      { name: 'Our story', href: '#story' },
      { name: 'Wedding details', href: '#details' },
      { name: 'Gallery', href: '#gallery' },
      { name: 'RSVP', href: '#rsvp' },
      { name: 'Visa & Flight', href: '#travel' },
      { name: 'FAQ', href: '#faq' },
      { name: 'Contact', href: '#contact' },
    ],
    vi: [
      { name: 'Trang chủ', href: '#hero' },
      { name: 'Câu chuyện', href: '#story' },
      { name: 'Sự kiện', href: '#details' },
      { name: 'Bộ sưu tập', href: '#gallery' },
      { name: 'RSVP', href: '#rsvp' },
      { name: 'Thị thực & Di chuyển', href: '#travel' },
      { name: 'FAQ', href: '#faq' },
      { name: 'Liên hệ', href: '#contact' },
    ]
  }[lang];

  const navItems = t;

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav 
      className={`fixed top-0 left-0 right-0 z-[140] transition-all duration-700 ease-in-out ${
        scrolled && !isOpen
          ? 'bg-surface/80 backdrop-blur-md py-4 border-b border-olive/10' 
          : 'bg-transparent py-10 md:py-12'
      }`}
    >
      <div className="max-w-full mx-auto px-6 sm:px-10 md:px-12 lg:px-14 flex justify-between items-center">
        
        <Link href="/" className="relative z-50 group">
          <div className="flex items-center gap-1.5">
            {/* Clear Botanical Leaf Focal Point */}
            <svg className="w-6 h-6 md:w-8 md:h-8 text-burgundy transition-all duration-700 ease-out group-hover:rotate-[15deg] group-hover:scale-110" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12,2C12,2 10.5,6.5 10.5,10.5C10.5,14.5 12,22 12,22C12,22 13.5,14.5 13.5,10.5C13.5,6.5 12,2 12,2M12,2C12,2 16,4.5 18,9C20,13.5 18,18 18,18C18,18 14,20 10,18C6,16 4,11.5 4,11.5C4,11.5 8,9.5 12,2Z"/>
            </svg>
            <span className="text-xl md:text-2xl font-heading font-light text-burgundy tracking-widest uppercase transition-opacity">T&L</span>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden lg:flex items-center gap-8 xl:gap-12">
          {navItems.map((item) => (
            <a
              key={item.name}
              href={item.href}
              className="group relative"
            >
              <span className="text-[10px] xl:text-[11px] font-body tracking-[0.3em] uppercase text-ink/80 group-hover:text-burgundy transition-colors duration-500">
                {item.name}
              </span>
              <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-burgundy/30 transition-all duration-700 ease-in-out group-hover:w-full" />
            </a>
          ))}
        </div>

        {/* Actions: Language (Always) + Menu (Mobile) */}
        <div className="flex items-center gap-4 lg:gap-8 relative z-[160]">
          {/* Language Switcher */}
          <button 
            onClick={() => setLang(lang === 'en' ? 'vi' : 'en')}
            className={`px-3 py-1.5 rounded-full border border-burgundy/10 text-[9px] md:text-[10px] tracking-widest font-medium transition-all duration-500 hover:border-burgundy/30 ${
              scrolled || isOpen ? 'bg-white/40 backdrop-blur-md text-burgundy' : 'bg-white/20 text-burgundy'
            }`}
          >
            <span className={lang === 'en' ? 'font-bold' : 'opacity-40'}>EN</span>
            <span className="mx-1.5 opacity-20">|</span>
            <span className={lang === 'vi' ? 'font-bold' : 'opacity-40'}>VI</span>
          </button>
          
          {/* Toggle Menu Button (Visible only on mobile) */}
          <button 
            onClick={() => setIsOpen(!isOpen)}
            className="lg:hidden w-10 h-10 flex flex-col items-center justify-center gap-1.5 focus:outline-none"
            aria-label="Toggle Menu"
          >
            <div className={`h-[1px] bg-burgundy transition-all duration-500 ${isOpen ? 'rotate-45 translate-y-2 w-8' : 'w-8'}`} />
            <div className={`h-[1px] bg-burgundy transition-all duration-500 ${isOpen ? 'opacity-0' : 'w-6 self-end'}`} />
            <div className={`h-[1px] bg-burgundy transition-all duration-500 ${isOpen ? '-rotate-45 -translate-y-2 w-8' : 'w-8'}`} />
          </button>
        </div>

        {/* Mobile Overlay */}
        <div className={`fixed inset-0 bg-surface/98 backdrop-blur-xl z-[150] flex flex-col items-center justify-center transition-all duration-700 ease-in-out lg:hidden ${
          isOpen ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-full'
        }`}>
          {/* Subtle patterns for overlay background */}
          <div className="absolute inset-0 opacity-[0.05] pointer-events-none overflow-hidden">
             {/* Repeat ornamental divider icon as a backsplash */}
             {[...Array(15)].map((_, i) => (
                <svg key={i} className="absolute w-32 h-32 text-olive" 
                     style={{ 
                        top: `${Math.random() * 100}%`, 
                        left: `${Math.random() * 100}%`,
                        transform: `rotate(${Math.random() * 360}deg)`
                     }} 
                     viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 1L13.5 10.5L23 12L13.5 13.5L12 23L10.5 13.5L1 12L10.5 10.5L12 1Z" />
                </svg>
             ))}
          </div>

          <div className="flex flex-col items-center gap-10 relative z-50">
            {navItems.map((item, idx) => (
              <a
                key={item.name}
                href={item.href}
                onClick={() => setIsOpen(false)}
                className="group flex flex-col items-center no-underline"
              >
                <span 
                  className={`text-sm tracking-[0.5em] uppercase text-burgundy transition-all duration-700 ${
                    isOpen ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
                  }`}
                  style={{ transitionDelay: `${idx * 60}ms` }}
                >
                  {item.name}
                </span>
                <div className="w-0 h-[1.5px] bg-burgundy/20 group-hover:w-full transition-all duration-500 mt-3" />
              </a>
            ))}
          </div>
        </div>

      </div>
    </nav>
  );
};

export default Navbar;
