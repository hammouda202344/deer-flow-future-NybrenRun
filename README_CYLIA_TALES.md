# CyliaTales — Quick start

This branch adds the initial CyliaTales product files and a high-fidelity 3D animated background component (React-Three-Fiber GLSL material).

How to preview locally:
1. Install dependencies: npm install
2. Ensure @react-three/fiber and @react-three/drei are installed
3. Start dev server: npm run dev
4. Import and mount src/components/HighFidelityBackground in your layout with dynamic import (SSR disabled):
   const Background = dynamic(() => import('src/components/HighFidelityBackground'), { ssr: false });

Performance & accessibility:
- The component should be dynamically imported to avoid blocking SSR.
- Add prefers-reduced-motion support and a low-end fallback for mobile.

Files added:
- PRODUCT_SPEC.md
- PITCH_DECK.md
- FIGMA_TOKENS.json
- OPENAPI.yaml
- MVP_BACKLOG.md
- src/components/HighFidelityBackground.tsx
- src/shaders/nebula.{vert,frag}

Next steps (issues & PR): create detailed issues & milestones, add CI smoke tests, visual regression tests.
