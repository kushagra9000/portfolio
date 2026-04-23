---
name: Institutional Jade
colors:
  surface: '#f7faf7'
  surface-dim: '#d8dbd8'
  surface-bright: '#f7faf7'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f1f4f1'
  surface-container: '#ecefec'
  surface-container-high: '#e6e9e6'
  surface-container-highest: '#e0e3e0'
  on-surface: '#181c1b'
  on-surface-variant: '#3f4945'
  inverse-surface: '#2d3130'
  inverse-on-surface: '#eff1ee'
  outline: '#6f7975'
  outline-variant: '#bec9c4'
  surface-tint: '#1a6a59'
  primary: '#005243'
  on-primary: '#ffffff'
  primary-container: '#1b6b5a'
  on-primary-container: '#9ee9d3'
  inverse-primary: '#8bd5c0'
  secondary: '#356382'
  on-secondary: '#ffffff'
  secondary-container: '#addafe'
  on-secondary-container: '#32607f'
  tertiary: '#72362a'
  on-tertiary: '#ffffff'
  tertiary-container: '#8f4d40'
  on-tertiary-container: '#ffcfc6'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#a6f1db'
  primary-fixed-dim: '#8bd5c0'
  on-primary-fixed: '#002019'
  on-primary-fixed-variant: '#005142'
  secondary-fixed: '#cae6ff'
  secondary-fixed-dim: '#9fccf0'
  on-secondary-fixed: '#001e2f'
  on-secondary-fixed-variant: '#194b69'
  tertiary-fixed: '#ffdad3'
  tertiary-fixed-dim: '#ffb4a5'
  on-tertiary-fixed: '#390b04'
  on-tertiary-fixed-variant: '#71352a'
  background: '#f7faf7'
  on-background: '#181c1b'
  surface-variant: '#e0e3e0'
typography:
  display:
    fontFamily: Geist
    fontSize: 48px
    fontWeight: '600'
    lineHeight: '1.1'
    letterSpacing: -0.02em
  h1:
    fontFamily: Geist
    fontSize: 32px
    fontWeight: '600'
    lineHeight: '1.2'
    letterSpacing: -0.01em
  h2:
    fontFamily: Geist
    fontSize: 24px
    fontWeight: '500'
    lineHeight: '1.3'
  body-lg:
    fontFamily: Geist
    fontSize: 18px
    fontWeight: '400'
    lineHeight: '1.5'
  body-md:
    fontFamily: Geist
    fontSize: 16px
    fontWeight: '400'
    lineHeight: '1.5'
  label-mono:
    fontFamily: Geist Mono
    fontSize: 14px
    fontWeight: '500'
    lineHeight: '1.2'
    letterSpacing: 0.02em
  caption:
    fontFamily: Geist
    fontSize: 12px
    fontWeight: '400'
    lineHeight: '1.4'
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  base: 8px
  xs: 4px
  sm: 8px
  md: 16px
  lg: 24px
  xl: 48px
  container-max: 1440px
  gutter: 24px
---

## Brand & Style

This design system embodies the "Institutional SaaS" aesthetic—a balance of heritage stability and modern digital efficiency. It is designed for high-value portfolio management where clarity, precision, and trust are paramount. 

The style is rooted in **Minimalism** with a **Corporate Modern** execution. It avoids unnecessary ornamentation, relying instead on a sophisticated, warm-neutral palette and exceptional typography to communicate authority. The interface feels tactile but flat, using subtle shifts in tonal density rather than aggressive shadows to establish hierarchy. The emotional response is one of calm, professional focus and intellectual rigor.

## Colors

The color strategy transitions from a monochromatic jade foundation to a rich, multi-accent system. 

*   **Primary (Deep Jade):** Used for core branding, primary actions, and active navigation states.
*   **Secondary (Muted Slate Blue):** Utilized for information density, secondary data visualizations, and auxiliary navigation.
*   **Backgrounds:** The primary canvas uses **Warm Sand**, providing a paper-like, non-glare reading experience. **Cream** is used as a high-contrast surface to lift specific modules or "flat cards" off the base background.
*   **Accents:** Success and Warning states use high-chroma versions of the core palette (Vibrant Jade and Subtle Gold) to ensure status visibility without breaking the institutional harmony.

## Typography

The system utilizes **Geist** for all UI and prose, taking advantage of its geometric precision and excellent legibility at small scales. **Geist Mono** is strictly reserved for data points, labels, and metadata to reinforce the technical, portfolio-centric nature of the application.

Hierarchy is established through weight and scale rather than color. Large headlines use tight letter-spacing and semi-bold weights, while body text maintains a generous line height for readability. Data tables and financial figures should always be set in Geist Mono to ensure tabular alignment.

## Layout & Spacing

The layout follows a **Fixed Grid** philosophy within a 1440px container for dashboard views, transitioning to a fluid model for mobile. A strict 8px spacing scale governs the rhythm of the UI.

Internal module padding is standardized at 24px (lg) to provide a luxurious sense of space, while density-heavy data grids may scale down to 8px (sm) gutters. Alignment should be crisp, with elements snapping to the grid to maintain a structured, institutional feel.

## Elevation & Depth

This system avoids traditional drop shadows in favor of **Tonal Layers** and **Low-contrast outlines**. 

*   **Flat Cards:** Content blocks are defined by a change in surface color (from Warm Sand to Cream) and a subtle 1px border (#D1CFC2).
*   **Active States:** Selection is indicated by a 2px Deep Jade border or a subtle shift in the background color rather than a lift.
*   **Overlays:** Modals and menus utilize a very soft, diffused ambient shadow (10% opacity) purely to separate the element from the content below, maintaining the flat-design aesthetic.

## Shapes

The design system uses a consistent **8px radius (roundedness: 2)** for all primary components, including cards, buttons, and input fields. This softened geometry prevents the UI from feeling overly clinical while maintaining a professional structure. Smaller components like checkboxes or tags utilize a 4px radius to maintain visual proportion.

## Components

*   **Buttons:** Primary buttons are solid Deep Jade with white text. Secondary buttons use a Cream background with a 1px Jade border. All buttons feature an 8px radius and no shadow.
*   **Flat Cards:** Use the Cream (#F5F4ED) background against the Warm Sand canvas. No elevation; define edges with a 1px neutral border.
*   **Inputs:** Fields are rendered with a white or cream background, 8px radius, and a 1px border that thickens and changes to Deep Jade on focus.
*   **Chips & Tags:** Use Geist Mono for tag content. Backgrounds for tags should be low-opacity versions of the accent colors (e.g., 10% Vibrant Jade for success) with high-contrast text.
*   **Lists/Tables:** Use "zebra-striping" with very subtle shifts between Warm Sand and Cream. Headers should be Geist Mono, all-caps, with a light tracking increase.
*   **Status Indicators:** Small, circular dots or subtle pill-shaped badges using the new multi-accent palette (Blue, Teal, Amber) to denote portfolio health and movement.