import React, { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(useGSAP, ScrollTrigger);

/**
 * AnimatedSection Template
 * A boilerplate component demonstrating proper GSAP integration in React.
 */
export default function AnimatedSection() {
  const sectionRef = useRef(null);

  useGSAP(() => {
    // 1. Basic Fade In Up
    gsap.from('.fade-up', {
      y: 50,
      opacity: 0,
      duration: 1,
      ease: 'power3.out',
      stagger: 0.2,
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top 80%', // when the top of the trigger hits 80% down the viewport
        end: 'bottom 20%', // when the bottom of the trigger hits 20% down the viewport
        toggleActions: 'play none none reverse', // play, pause, resume, reverse
        // markers: true, // Use this for debugging scroll positions
      },
    });

  }, { scope: sectionRef }); // Crucial: scopes all classes/tags inside this ref, and cleans them up

  return (
    <section 
      ref={sectionRef} 
      style={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '5rem',
        backgroundColor: '#f9fafb'
      }}
    >
      <h2 
        className="fade-up" 
        style={{ fontSize: '3rem', fontWeight: 'bold', marginBottom: '1rem' }}
      >
        Animated Template Pattern
      </h2>
      <p 
        className="fade-up"
        style={{ fontSize: '1.25rem', color: '#4b5563', maxWidth: '600px', textAlign: 'center' }}
      >
        This is a boilerplate React component configured with @gsap/react. 
        It cleanly integrates ScrollTrigger and staggering within the safe context of the useGSAP hook.
      </p>
    </section>
  );
}
