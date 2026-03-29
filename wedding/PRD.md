# Product Requirements Document: Tommy & Linh Wedding Invitation

**Theme:** Neo-Vietnamese Formalism  
**Concept:** A harmonious blend of traditional Vietnamese aesthetics with modern minimalism and elegance. The design balances contemporary cultural fusion with the requisite ceremonial weight of an international wedding returning home.

## 1. Design System & Aesthetics
To realize the Neo-Vietnamese Formalism concept, the visual language revolves around a rich, grounded palette, classic typography, and subtle, tactile textures that evoke premium stationery.

### Typography
- **Headings & Accents:** *Cormorant Garamond* (Google Fonts) – Imparts a classic, graceful, and highly sophisticated tone.
- **Body Text:** *Lato* (Google Fonts) – Clean, highly readable, and minimalist to contrast the ornate headings.

### Color Palette
- **Burgundy (`#562832`):** Primary focal color. Used for Calls-to-Action (CTAs), prominent headings, and Vietnamese cultural accent elements (symbolizing joy and tradition).
- **Olive (`#656a52`):** Secondary accent color. Ideal for botanical illustrations, elegant vector dividers, and secondary details.
- **Charcoal (`#3a3a3a`):** Primary body text color. Provides softer, warmer contrast compared to pure black.
- **Breathing Room / Canvas (`#d4cfc5`, `#faf7f2`):** Backgrounds, text-box fills, and card surfaces that replicate premium paper stocks.

### Background Textures
- **Hero & RSVP Sections:** A classic, royal damask background texture. This commands attention and establishes an elegant, high-end "wow" factor upon entry and exit.
- **Secondary Sections (Story, Details, Schedule):** A more subdued, tactile "Canson 300gsm" or vintage retro paper texture. This ensures readability while maintaining the physical invitation feel.
- **Pattern Style:** Linear royal vectors serving as decorative crests, corner flourishes, and dividers. Scaling back the opacity/prominence outside the Hero section to maintain breathing room.

## 2. Technical Setup & Global Styles
We are configuring `globals.css` with the design tokens (colors and fonts) mapped to Tailwind's utility system, and laying the baseline texture foundations. 

- Replaced default Next.js fonts with Lato & Cormorant Garamond inside `layout.tsx`.
- Defined `--color-burgundy`, `--color-olive`, `--color-surface`, etc. as CSS inline theme variables.
- Created reusable classes like `.bg-royal` for the Hero/RSVP sections and layered the Canson texture over the `body` via CSS background-image properties.

> [!NOTE]
> Placeholder high-quality texture images (`canson-texture.jpg`, `royal-texture.jpg`) and vector assets will need to be sourced or generated via the `generate_image` tool and added to the absolute asset paths or `/public` folder for the textures to render properly. Let me know if you would like me to generate these placeholder textures for you!

## 3. Implementation Phases

- **Phase 1:** Establish PRD, define the global design system, update `globals.css` and `layout.tsx` for fonts.
- **Phase 2:** Build the **Hero Section** using the royal texture background, bold Cormorant Garamond typography, linear vector crest, and primary Burgundy accents.
- **Phase 3:** Build the **Story / Information Sections** (Gallery, Schedule, Venue) leveraging the minimalistic Canson paper texture.
- **Phase 4:** Build the **RSVP Section** reverting back to the premium royal texture to bookend the experience.

---
*Status: Active Development*
