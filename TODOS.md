# Gossamer — Implementation TODOs

This task list is organized by implementation phases as outlined in docs/SPEC.md.

---

## Phase M1: Core Foundation

Core rendering engine and utilities.

- [ ] Create component directory structure (packages/core/src/)
- [ ] Implement `GossamerRenderer` class (core/src/renderer.ts)
- [ ] Implement brightness calculation utilities (core/src/brightness.ts)
- [ ] Implement basic pattern generators (core/src/patterns.ts)
  - [ ] Perlin noise pattern
  - [ ] Wave pattern
  - [ ] Static noise pattern
- [ ] Create character set definitions (core/src/characters.ts)
- [ ] Add FPS limiting and animation loop (core/src/animation.ts)
- [ ] Create canvas utilities (core/src/utils/canvas.ts)
- [ ] Create image loading utilities (core/src/utils/image.ts)
- [ ] Create performance utilities (core/src/utils/performance.ts)

---

## Phase M2: Primary Components

Build core components with full functionality.

- [ ] Build `GossamerClouds.svelte` with all props
  - [ ] Pattern selection (perlin, simplex, waves, static)
  - [ ] Character set customization
  - [ ] Color and opacity controls
  - [ ] Animation settings (speed, FPS)
  - [ ] Performance settings (cell size)
- [ ] Build `GossamerImage.svelte` with image loading
  - [ ] Image source loading
  - [ ] ASCII transformation rendering
  - [ ] Hover to reveal original
  - [ ] Color preservation option
- [ ] Implement resize handling with ResizeObserver
- [ ] Add visibility-based animation pause (IntersectionObserver)
- [ ] Create preset system and initial presets
  - [ ] Grove-themed presets (mist, fireflies, rain)
  - [ ] Seasonal presets (winter-snow, autumn-leaves, spring-petals, summer-heat)

---

## Phase M3: Extended Components

Additional effect components.

- [ ] Build `GossamerText.svelte` for text effects
- [ ] Build `GossamerOverlay.svelte` for compositing
  - [ ] Blend mode support
  - [ ] Masking options
- [ ] Build `GossamerBorder.svelte` for ASCII borders
  - [ ] Multiple border styles (dots, dashes, stars)
  - [ ] Animated border effects
- [ ] Add comprehensive blend mode support

---

## Phase M4: Integration

Framework integration and examples.

- [ ] Create Glass UI integration helpers
- [ ] Add slot support for GlassCard backgrounds
- [ ] Build Terrarium integration example
- [ ] Create seasonal preset variants
- [ ] Add to engine component exports
- [ ] Create vanilla JavaScript examples
- [ ] Create SvelteKit integration example

---

## Phase M5: Polish & Documentation

Refinement, testing, and documentation.

- [ ] Accessibility audit
  - [ ] Verify `aria-hidden="true"` on all canvas elements
  - [ ] Implement `prefers-reduced-motion` support
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
- [ ] Add TypeScript types to exports
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
- [ ] Create root package.json with workspace scripts
- [ ] Create pnpm-workspace.yaml
- [ ] Create tsconfig.json (root and per-package)
- [ ] Set up Vite build configuration
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
**Status:** Project scaffolding complete, ready for core implementation
