# Gossamer — Implementation TODOs

This task list is organized by implementation phases as outlined in docs/SPEC.md.

---

## Next Agent Instructions

**Current Status:** Phases M1-M3 are complete. Package consolidated into single `@autumnsgrove/gossamer` with `./svelte` subpath. Glass integration started but rendering not yet working.

### What's Been Built

1. **Core Package** (`packages/core/src/`):
   - `renderer.ts` - GossamerRenderer class with texture atlas optimization
   - `patterns.ts` - 12 patterns: perlin, fbm, waves, ripple, static, clouds, plasma, vortex, matrix, gradient, diamond, fractal
   - `characters.ts` - 19 character sets (12 standard + 7 glass-optimized)
   - `colors.ts` - Grove color palette (grove-green, cream, bark) + glass schemes
   - `animation.ts` - Animation loop with FPS limiting, easing functions
   - `utils/canvas.ts` - Canvas creation and manipulation
   - `utils/image.ts` - Image loading and pixel sampling
   - `utils/performance.ts` - Visibility observers, reduced-motion detection
   - `scripts/export-gif.ts` - GIF export tool with --glass mode

2. **Svelte Components** (`packages/core/src/svelte/`) - Now in main package!:
   - `GossamerClouds.svelte` - Animated ambient backgrounds
   - `GossamerImage.svelte` - Image-to-ASCII with hover reveal
   - `GossamerText.svelte` - Text with animation effects
   - `GossamerOverlay.svelte` - Compositing with blend modes
   - `GossamerBorder.svelte` - ASCII border decorations
   - `presets.ts` - 11 presets (grove, seasonal, ambient)

3. **GroveEngine Integration** (started):
   - `Glass.svelte` - Added gossamer prop support
   - `GlassCard.svelte` - Added gossamer prop support
   - Vineyard page - Added toggles to test Gossamer effects

### Priority Tasks for Next Session

1. **🔴 FIX: Debug Gossamer rendering in Glass components**
   The integration is wired up but nothing renders visually. Possible issues:
   - Vite bundling of Svelte components (compiled JS vs raw .svelte files)
   - CSS not being injected properly despite import
   - Canvas not receiving proper dimensions from parent
   - ResizeObserver not firing on initial mount

   **Debugging steps to try:**
   ```bash
   # Check browser console for errors
   # Inspect DOM to see if canvas element exists
   # Check if GossamerClouds component is mounting
   # Add console.logs to GossamerClouds.svelte to trace execution
   # Try a standalone test page with just GossamerClouds
   ```

2. **Consider alternative packaging approaches:**
   - Use `svelte-package` instead of Vite for Svelte components
   - Ship raw .svelte files instead of compiled JS
   - Test with published NPM version instead of linked package

3. **Create standalone example** to isolate the issue:
   - Create a minimal SvelteKit app that imports GossamerClouds directly
   - Verify the component works outside of Glass wrapper

4. **Create API documentation** (`docs/API.md`)

### Key Files to Review
- `docs/SPEC.md` - Full specification with API designs
- `packages/core/src/index.ts` - All core exports
- `packages/core/src/svelte/index.ts` - All Svelte exports

### Package Structure
- `@autumnsgrove/gossamer` - Main package (published to NPM as v0.1.0)
  - Import core: `import { GossamerRenderer } from '@autumnsgrove/gossamer'`
  - Import Svelte: `import { GossamerClouds } from '@autumnsgrove/gossamer/svelte'`
  - Import CSS: `import '@autumnsgrove/gossamer/svelte/style.css'`

---

## Phase M1: Core Foundation ✅

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
  - [x] Clouds pattern (soft billowy fbm)
  - [x] Plasma pattern (demoscene classic)
  - [x] Vortex pattern (swirling spiral)
  - [x] Matrix pattern (falling digital rain)
  - [x] Gradient pattern (animated rotating)
  - [x] Diamond pattern (interference)
  - [x] Fractal pattern (animated Julia set)
- [x] Create character set definitions (core/src/characters.ts)
  - [x] 12 standard character sets
  - [x] 7 glass-optimized character sets (glass-dots, glass-mist, glass-dust, etc.)
- [x] Create Grove color palette (core/src/colors.ts)
  - [x] Grove green, cream, bark color scales
  - [x] Glass-optimized color schemes
- [x] Add FPS limiting and animation loop (core/src/animation.ts)
- [x] Create canvas utilities (core/src/utils/canvas.ts)
- [x] Create image loading utilities (core/src/utils/image.ts)
- [x] Create performance utilities (core/src/utils/performance.ts)

---

## Phase M2: Primary Components ✅

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

## Phase M3: Extended Components ✅

Additional effect components.

- [x] Build `GossamerText.svelte` for text effects
- [x] Build `GossamerOverlay.svelte` for compositing
  - [x] Blend mode support
  - [ ] Masking options (future enhancement)
- [x] Build `GossamerBorder.svelte` for ASCII borders
  - [x] Multiple border styles (dots, dashes, stars, simple, double, corners)
  - [x] Animated border effects
- [x] Add comprehensive blend mode support

---

## Phase M4: Integration 🔄

Framework integration and examples.

- [ ] Create Glass UI integration helpers
- [ ] Add slot support for GlassCard backgrounds
- [ ] Build Terrarium integration example
- [x] Create seasonal preset variants
- [ ] Add to engine component exports
- [ ] Create vanilla JavaScript examples (`examples/vanilla/`)
- [ ] Create SvelteKit integration example (`examples/svelte-kit/`)

---

## Phase M5: Polish & Documentation 🔄

Refinement, testing, and documentation.

- [x] Accessibility audit (partial)
  - [x] Verify `aria-hidden="true"` on all canvas elements
  - [x] Implement `prefers-reduced-motion` support
  - [ ] Ensure no focus indicators are obscured
- [x] Performance profiling and optimization
  - [x] Optimize pattern generation (BrightnessBuffer + Uint8Array)
  - [x] Add character texture atlas (5-10x faster rendering)
  - [x] Zero-allocation fillBrightnessBuffer for animation loops
  - [ ] Profile rendering performance
  - [ ] Test on lower-end devices
- [ ] Create usage documentation
  - [ ] API reference (docs/API.md)
  - [ ] Component guide
  - [ ] Integration examples
- [ ] Build interactive demo/playground
- [x] Add TypeScript types to exports
- [x] Write comprehensive tests
  - [x] Unit tests for core utilities (85 tests passing)
    - [x] characters.ts - 17 tests
    - [x] patterns.ts - 26 tests (3 skipped for browser-only)
    - [x] animation.ts - 26 tests
    - [x] index.ts - 16 tests
  - [x] Svelte package tests (22 tests passing)
    - [x] presets.ts - 22 tests
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
- [x] Set up Vitest test runner (use `javascript-testing` skill)
- [ ] Configure ESLint and Prettier (use `code-quality` skill)
- [ ] Set up CI/CD pipeline (use `cicd-automation` skill)
- [ ] Create MIT LICENSE file
- [ ] Initialize git hooks (use `git-hooks` skill)

---

## Documentation

- [x] Project specification (docs/SPEC.md)
- [ ] API reference (docs/API.md)
- [ ] Contributing guidelines (CONTRIBUTING.md)
- [ ] Code of conduct (CODE_OF_CONDUCT.md)
- [ ] Changelog (CHANGELOG.md)

---

**Last Updated:** 2026-01-15
**Status:** Phase M1-M3 complete + major enhancements. Added 7 new patterns (clouds, plasma, vortex, matrix, gradient, diamond, fractal), Grove color palette, glass-optimized character sets, and performance optimizations (BrightnessBuffer, texture atlas). GIF export tool with --glass mode for testing. GroveEngine Glass integration still needs debugging. 107 tests passing.
