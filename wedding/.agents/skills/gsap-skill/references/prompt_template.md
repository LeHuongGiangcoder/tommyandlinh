# Ideal GSAP Prompt Structure

To ensure the best possible first-time implementation of your GSAP animations, copy this template and fill it out when requesting a new animation effect. This provides all the context needed for a clean, React-safe, and bug-free implementation.

---

### Basic Template

```text
**1. The Goal (Visual Vision):** 
[Describe exactly what should happen. e.g., "I want a hero section where the title fades up, followed by a stagger on the feature cards, and then the background scales down slightly."]

**2. The Trigger:** 
[What causes it? e.g., "On page load / component mount" OR "When the user scrolls to '.section-two', triggered when the top hits 80% of the viewport" OR "On hover over the button."]

**3. Sequence vs. Standalone:** 
[e.g., "Use a timeline because card C must wait for card B," OR "Just a simple standalone ScrollTrigger for these elements."]

**4. The Target Elements (Classes/Structure):** 
[Provide the exact classes or a snippet of the JSX structure you want to animate. e.g., "Animate the '.hero-title' and '.feature-card' elements."]

**5. Responsive / Edge Cases:** 
[e.g., "Disable this complex animation on mobile screens (max-width 768px)" or "Make sure it works with my Lenis smooth scroller."]
```

---

### Example of a Perfect Prompt

> *"I need a GSAP scroll animation in my Next.js page component.*
> 
> ***Goal:** I have a section with the class `.portfolio-grid` containing 6 `.project-card`s. When they enter view, I want the cards to fade in and slide up from `y: 50`.*
> 
> ***Trigger:** When the user scrolls to `.portfolio-grid` and its top reaches `center viewport`.*
> 
> ***Sequence:** They should stagger in by `0.1s`.*
> 
> ***Responsive:** Please use `gsap.matchMedia()` to disable the slide-up part on mobile, only keeping the fade.*
> 
> *Make sure to use `@gsap/react` `useGSAP` hook for safety!"*

--
"I need a GSAP scroll animation in my Next.js page component. Goal: I have a section with the class .portfolio-grid containing 6 .project-cards. Trigger: When the user scrolls to .portfolio-grid and its top reaches center viewport, I want the cards to fade in and slide up from y: 50. Sequence: They should stagger in by 0.1s. Responsiveness: Please use gsap.matchMedia() to disable the slide-up part on mobile, only keeping the fade. Make sure to use @gsap/react useGSAP hook for safety!"
