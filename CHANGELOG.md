# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

## [0.1.0] - 2026-01-14

### Added

#### Core Package (`@autumnsgrove/gossamer`)

- **GossamerRenderer** class for canvas-based ASCII rendering
  - Cell-based rendering with configurable cell size
  - Animation loop with FPS limiting
  - Support for ImageData and brightness grid inputs
  - Per-character color rendering

- **Pattern generators** for procedural effects
  - `perlinNoise2D` - Classic Perlin noise
  - `fbmNoise` - Fractal Brownian Motion for organic patterns
  - `wavePattern` - Sine/cosine wave interference
  - `ripplePattern` - Concentric circular waves
  - `staticNoise` / `seededNoise2D` - Random and reproducible noise
  - `generateBrightnessGrid` - Main pattern-to-grid function

- **12 built-in character sets**
  - Standard, Dense, Minimal, Grove, Dots, Blocks
  - Lines, Stars, Nature, Weather, Binary, Math
  - Utilities: `getCharacterSet`, `createCharacterSet`, `invertCharacters`

- **Animation utilities**
  - `createAnimationLoop` - Managed loop with start/stop/pause/resume
  - `throttle` / `debounce` - Rate limiting functions
  - `calculateFPS` - Performance monitoring
  - `easings` - Animation easing functions (linear, easeIn, easeOut, bounce, etc.)

- **Canvas utilities**
  - `createCanvas`, `resizeCanvasToContainer`, `createOffscreenCanvas`
  - `optimizeContext`, `setupTextRendering`, `setBlendMode`

- **Image utilities**
  - `loadImage`, `loadAndScaleImage`, `imageToPixelData`
  - `sampleImageCells`, `extractBrightness`
  - Color functions: `rgbToHex`, `hexToRgb`, `adjustBrightness`, `adjustContrast`

- **Performance utilities**
  - `createVisibilityObserver` - Pause when off-screen
  - `createResizeObserver` - Handle container resizing
  - `prefersReducedMotion` / `onReducedMotionChange` - Accessibility
  - `isLowPowerMode`, `getRecommendedFPS` - Device adaptation
  - `isBrowser`, `isCanvasSupported` - Environment detection

#### Svelte Package (`@gossamer/svelte`)

- **5 Svelte 5 components**
  - `GossamerClouds` - Animated ambient background patterns
  - `GossamerImage` - Image to ASCII transformation with hover reveal
  - `GossamerText` - ASCII-styled text with animation effects
  - `GossamerOverlay` - Composite effects with blend modes
  - `GossamerBorder` - Decorative ASCII borders (6 styles)

- **11 presets** organized by category
  - Grove: `grove-mist`, `grove-fireflies`, `grove-rain`, `grove-dew`
  - Seasonal: `winter-snow`, `autumn-leaves`, `spring-petals`, `summer-heat`
  - Ambient: `ambient-static`, `ambient-waves`, `ambient-clouds`

- **Preset utilities**
  - `getPreset`, `getPresetNames`, `getPresetsByCategory`

#### Accessibility

- All canvas elements marked `aria-hidden="true"`
- `prefers-reduced-motion` support in all animated components
- Visibility-based animation pausing (IntersectionObserver)
- Screen-reader text for GossamerText component

#### Testing

- 107 unit tests passing
  - Core package: 85 tests (characters, patterns, animation, index)
  - Svelte package: 22 tests (presets)

#### Documentation

- Full project specification (`docs/SPEC.md`)
- API reference (`docs/API.md`)
- Package READMEs

---

*For migration guides and detailed release notes, see [GitHub Releases](https://github.com/AutumnsGrove/Gossamer/releases).*
