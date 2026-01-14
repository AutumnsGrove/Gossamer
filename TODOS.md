# Gossamer — Implementation TODOs

This task list is organized by implementation phases as outlined in docs/SPEC.md.

---

## Phase M1: Core Foundation

Core rendering engine and utilities.

- [x] Create component directory structure (packages/core/src/)
- [x] Implement `GossamerRenderer` class (core/src/renderer.ts)
- [x] Implement brightness calculation utilities (core/src/index.ts)
- [x] Implement basic pattern generators (core/src/patterns.ts)
  - [x] Perlin noise pattern
  - [x] Wave pattern
  - [x] Static noise pattern
  - [x] Ripple pattern
  - [x] fBm noise pattern
- [x] Create character set definitions (core/src/characters.ts)
- [x] Add FPS limiting and animation loop (core/src/animation.ts)
- [x] Create canvas utilities (core/src/utils/canvas.ts)
- [x] Create image loading utilities (core/src/utils/image.ts)
- [x] Create performance utilities (core/src/utils/performance.ts)

---

## Phase M2: Primary Components

Build core components with full functionality.

- [x] Build `GossamerClouds.svelte` with all props
  - [x] Pattern selection (perlin, fbm, waves, static, ripple)
  - [x] Character set customization
  - [x] Color and opacity controls
  - [x] Animation settings (speed, FPS)
  - [x] Performance settings (cell size)
- [x] Build `GossamerImage.svelte` with image loading
  - [x] Image source loading
  - [x] ASCII transformation rendering
  - [x] Hover to reveal original
  - [x] Color preservation option
- [x] Implement resize handling with ResizeObserver
- [x] Add visibility-based animation pause (IntersectionObserver)
- [x] Create preset system and initial presets
  - [x] Grove-themed presets (mist, fireflies, rain, dew)
  - [x] Seasonal presets (winter-snow, autumn-leaves, spring-petals, summer-heat)
  - [x] Ambient presets (static, waves, clouds)

---

## Phase M3: Extended Components

Additional effect components.

- [x] Build `GossamerText.svelte` for text effects
- [x] Build `GossamerOverlay.svelte` for compositing
  - [x] Blend mode support
  - [ ] Masking options
- [x] Build `GossamerBorder.svelte` for ASCII borders
  - [x] Multiple border styles (dots, dashes, stars, simple, double, corners)
  - [x] Animated border effects
- [x] Add comprehensive blend mode support

---

## Phase M4: Integration

Framework integration and examples.

- [ ] Create Glass UI integration helpers
- [ ] Add slot support for GlassCard backgrounds
- [ ] Build Terrarium integration example
- [x] Create seasonal preset variants
- [ ] Add to engine component exports
- [ ] Create vanilla JavaScript examples
- [ ] Create SvelteKit integration example

---

## Phase M5: Polish & Documentation

Refinement, testing, and documentation.

- [x] Accessibility audit (partial)
  - [x] Verify `aria-hidden="true"` on all canvas elements
  - [x] Implement `prefers-reduced-motion` support
  - [ ] Ensure no focus indicators are obscured
- [ ] Performance profiling and optimization
  - [ ] Profile rendering performance
  - [ ] Optimize pattern generation
  - [ ] Test on lower-end devices
- [ ] Create usage documentation
  - [ ] API reference (docs/API.md)
  - [ ] Component guide
  - [ ] Integration examples
- [ ] Build interactive demo/playground
- [x] Add TypeScript types to exports
- [ ] Write comprehensive tests
  - [ ] Unit tests for core utilities
  - [ ] Component tests for Svelte components
  - [ ] Integration tests for common use cases

---

## Phase M6: Future (v2.0)

Future enhancements for consideration.

- [ ] Research Threlte/Three.js integration
- [ ] Explore WebGL shader-based rendering
- [ ] Add 3D ASCII post-processing effects
- [ ] Investigate video source support
- [ ] React adapter development
- [ ] Vue adapter development

---

## Setup & Infrastructure

Project setup and tooling.

- [x] Create monorepo directory structure
- [x] Move specification to docs/SPEC.md
- [x] Update AGENT.md with project details
- [x] Create Gossamer-specific README.md
- [x] Create root package.json with workspace scripts
- [x] Create pnpm-workspace.yaml
- [x] Create tsconfig.json (root and per-package)
- [x] Set up Vite build configuration
- [ ] Set up Vitest test runner
- [ ] Configure ESLint and Prettier
- [ ] Set up CI/CD pipeline (GitHub Actions)
- [ ] Create MIT LICENSE file
- [ ] Initialize git hooks (optional)

---

## Documentation

- [x] Project specification (docs/SPEC.md)
- [ ] API reference (docs/API.md)
- [ ] Contributing guidelines (CONTRIBUTING.md)
- [ ] Code of conduct (CODE_OF_CONDUCT.md)
- [ ] Changelog (CHANGELOG.md)

---

**Last Updated:** 2026-01-14
**Status:** Phase M1-M3 complete. Core library and Svelte components implemented.
