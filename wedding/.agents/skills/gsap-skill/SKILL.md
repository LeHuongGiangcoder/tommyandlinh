---
name: GSAP Animation Guide
description: A comprehensive guide on how to implement and master GSAP animations in React/Next.js applications, covering core concepts, advanced techniques, and best practices.
---

# Master GSAP Animation Guide

This skill document serves as a comprehensive guide for implementing GSAP (GreenSock Animation Platform) effectively, focusing on robust, performant animations, particularly within React/Next.js environments.

## Core Principles

1.  **Always use `gsap.context()` in React (or `useGSAP()`)**: This is the most critical rule for React development. It ensures proper clean-up of animations and prevents memory leaks or conflicting animations, especially during React's strict mode double-invocations.
2.  **Animate Transforms and Opacity**: For maximum performance, strictly animate `transform` properties (`x`, `y`, `rotation`, `scale`) and `opacity`. Avoid animating layout properties like `width`, `height`, `top`, `left`, or `box-shadow` as they trigger expensive browser repaints.
3.  **Use `fromTo` for deterministic states**: When unsure about the starting state or when building scroll-triggered animations where elements might be halfway through an animation on page reload, use `gsap.fromTo()` to explicitly define both the start and end states.

## The `useGSAP` Hook (React/Next.js)

The official `@gsap/react` package provides the `useGSAP` hook, which abstracts away `gsap.context()` for easier cleanup.

```javascript
import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

export function AnimatedComponent() {
  const container = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    // Everything here is scoped to 'container' and automatically cleaned up
    gsap.to(".box", { x: 100, rotation: 360, duration: 1 });
  }, { scope: container });

  return (
    <div ref={container}>
       <div className="box">Animate Me</div>
    </div>
  );
}
```

## Advanced Implementation Patterns

### 1. ScrollTrigger Best Practices

-   **Explicit Triggers**: Always define the `trigger` element explicitly.
-   **Markers during Dev**: Always enable `markers: true` during development to visualize start and end points.
-   **Refresh Intelligently**: If the DOM changes size (e.g., images loading, expanding accordions), call `ScrollTrigger.refresh()` to recalculate trigger positions.
-   **Scrubbing vs. Triggers**: Use `scrub: true` (or a number like `scrub: 1` for smoothing) when the animation should be tied strictly to the scroll bar. Use standard duration animations (no scrub) when the scroll just acts as a trigger point.

```javascript
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);

useGSAP(() => {
  gsap.from(".fade-up", {
    y: 50,
    opacity: 0,
    duration: 1,
    stagger: 0.2, // Animate elements one after another
    scrollTrigger: {
      trigger: ".section-container",
      start: "top 80%", // When top of trigger hits 80% down the viewport
      end: "bottom 20%",
      toggleActions: "play none none reverse", // play on enter, reverse on leave back
      // scrub: true, // uncomment to tie animation to scroll position
    }
  });
});
```

### 2. Timelines for Complex Sequences

Use timelines (`gsap.timeline()`) to string together multiple animations. This makes them easier to manage, pause, reverse, or hook into ScrollTrigger.

```javascript
const tl = gsap.timeline({
    defaults: { ease: "power3.out", duration: 1 },
    scrollTrigger: { trigger: ".hero-section", start: "top center" }
});

tl.from(".hero-title", { y: 30, opacity: 0 })
  .from(".hero-subtitle", { y: 20, opacity: 0 }, "-=0.5") // overlap by 0.5s
  .from(".hero-button", { scale: 0.8, opacity: 0 }, "<"); // start at same time as previous
```

### 3. Smooth Scrolling (Next.js specific)

For a premium feel, integrate a smooth scroll solution. While `ScrollSmoother` is a premium GSAP plugin, you can implement a basic version or use Lenis in combination with ScrollTrigger.

**Crucial Note for Lenis/Custom Smooth Scrollers:** You MUST sync the smooth scroller with ScrollTrigger so triggers evaluate correctly.

```javascript
// Example Lenis Sync
import Lenis from '@studio-freight/lenis'

// ... in a useEffect or similar ...
const lenis = new Lenis()

lenis.on('scroll', ScrollTrigger.update)

gsap.ticker.add((time)=>{
  lenis.raf(time * 1000)
})

// Essential: Disable GSAP's default lag smoothing when using Lenis
gsap.ticker.lagSmoothing(0)
```

## Debugging Checklist

If an animation is failing:

1.  **Is the element rendered?** GSAP cannot animate `display: none` elements or elements that haven't been mounted yet.
2.  **Flash of Unstyled Content (FOUC)?** If elements jump before animating, hide them initially via CSS (`visibility: hidden` or `opacity: 0`), and use GSAP's `.fromTo` or `.to` with `autoAlpha: 1`. `autoAlpha` affects both `opacity` and `visibility`.
3.  **ScrollTriggers in wrong place?** Set `markers: true`. Check if the parent container is pushing things around after render (e.g., images loading without precise height). Add `ScrollTrigger.refresh()` after dynamic content loads.
4.  **React Strict Mode double firing?** Ensure you are using `gsap.context()` or `useGSAP()`.
5.  **Is the plugin registered?** Did you `gsap.registerPlugin(ScrollTrigger)`?

## Useful Resources

-   [GSAP Core Docs](https://gsap.com/docs/v3/GSAP/)
-   [GSAP Easing Visualizer](https://gsap.com/docs/v3/Eases)
-   [GSAP React Integration](https://gsap.com/resources/React)
