# Gossamer

```
                 ·  ·  ·  ·  ·  ·  ·  ·  ·  ·  ·
              ·                                   ·
           ·    · - - - · - - - · - - - · - - ·     ·
        ·      /                               \      ·
           ·  ·    delicate      threads        ·  ·
        ·    /        catching                    \    ·
           ·          the dawn                      ·
        ·    \                                    /    ·
           ·  · - - - · - - - · - - - · - - - ·  ·
              ·                                   ·
                 ·  ·  ·  ·  ·  ·  ·  ·  ·  ·  ·

                      ╭─────────────╮
                      │  threads of │
                      │    light    │
                      ╰─────────────╯
```

> *Threads of light.*

**ASCII visual effects for the web.** Character-based animations, ambient backgrounds, and image transformations powered by Canvas 2D. Simple, charming, performant.

[![NPM Version](https://img.shields.io/npm/v/gossamer)](https://www.npmjs.com/package/gossamer)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)

---

## Overview

Gossamer brings warmth and whimsy to web interfaces through 2D ASCII visual effects:
- 🌫️ **Floating clouds** — Ambient patterns using Perlin noise
- 🖼️ **Image transformation** — Convert photos to ASCII art
- ✨ **Text effects** — ASCII-styled typography
- 🎨 **Overlay effects** — Composite patterns over content
- 🔲 **Decorative borders** — Character-based frames

Built for **Grove's Glass UI** and beyond. Framework-agnostic core with official adapters for Svelte, React, and Vue.

---

## Features

- ✅ **Framework-agnostic core** — Use with any framework or vanilla JS
- ✅ **2D Canvas rendering** — Fast, lightweight, no WebGL dependencies
- ✅ **Multiple effect types** — Clouds, images, text, overlays, borders
- ✅ **Pattern generators** — Perlin noise, waves, static, and custom patterns
- ✅ **Performance-optimized** — Cell-based rendering, FPS limiting, visibility detection
- ✅ **Accessibility-first** — Respects `prefers-reduced-motion`, decorative-only
- ✅ **TypeScript support** — Full type definitions included
- ✅ **Preset system** — Grove-themed presets (mist, fireflies, rain, snow, etc.)

---

## Installation

### Core Library (Vanilla JS/TS)

```bash
pnpm add gossamer
# or
npm install gossamer
# or
yarn add gossamer
```

### Framework Adapters

```bash
# Svelte 5
pnpm add @gossamer/svelte

# React (coming soon)
pnpm add @gossamer/react

# Vue (coming soon)
pnpm add @gossamer/vue
```

---

## Quick Start

### Svelte

```svelte
<script>
  import { GossamerClouds, GossamerImage } from '@gossamer/svelte';
</script>

<!-- Ambient background -->
<GossamerClouds
  pattern="perlin"
  characters=" ·∙•"
  color="var(--grove-green)"
  opacity={0.15}
/>

<!-- Image transformation -->
<GossamerImage
  src="/avatar.jpg"
  alt="User avatar"
  cellSize={4}
  showOriginalOnHover
/>
```

### Vanilla JavaScript

```typescript
import { GossamerRenderer, generatePatternData } from 'gossamer';

const canvas = document.getElementById('myCanvas');
const renderer = new GossamerRenderer(canvas, {
  characters: ' ·∙•◦○◉●',
  cellSize: 12,
  color: '#22c55e'
});

// Render animated clouds
renderer.startAnimation((time) => {
  return generatePatternData(
    canvas.width,
    canvas.height,
    'perlin',
    time * 0.001,
    { frequency: 0.05, amplitude: 1.0, speed: 0.5 }
  );
}, 30);
```

---

## Effect Types

### 1. GossamerClouds

Floating, organic ambient patterns for backgrounds.

```svelte
<GossamerClouds
  pattern="perlin"
  characters=" ·∙•◦"
  opacity={0.3}
  animated
  speed={0.5}
/>
```

### 2. GossamerImage

Convert images to ASCII art representations.

```svelte
<GossamerImage
  src="/photo.jpg"
  alt="Photo description"
  cellSize={4}
  showOriginalOnHover
/>
```

### 3. GossamerText

Apply ASCII-style rendering to text elements.

```svelte
<GossamerText text="GROVE" preset="block-art" />
```

### 4. GossamerOverlay

Composite ASCII effects over existing content.

```svelte
<GossamerOverlay
  pattern="waves"
  blendMode="soft-light"
  opacity={0.2}
/>
```

### 5. GossamerBorder

ASCII-styled borders and frames.

```svelte
<GossamerBorder style="dots" animated />
```

---

## Presets

Gossamer includes seasonal and themed presets:

| Preset | Description | Characters | Animation |
|--------|-------------|------------|-----------|
| `grove-mist` | Soft fog effect | `·∙•◦` | Slow drift |
| `grove-fireflies` | Twinkling points | `·*✦✧` | Random flicker |
| `grove-rain` | Gentle rain lines | `│\|/` | Downward flow |
| `winter-snow` | Falling snow | `·∙*❄` | Drift + fall |
| `autumn-leaves` | Scattered leaves | `🍂·∙` | Tumble |
| `spring-petals` | Floating petals | `·✿❀` | Float + spin |
| `summer-heat` | Heat shimmer | `~≈∿` | Wave distortion |

```svelte
<GossamerClouds preset="grove-mist" />
```

---

## Documentation

- 📖 **[Full Specification](docs/SPEC.md)** — Complete technical spec
- 🎨 **[API Reference](docs/API.md)** — Detailed API documentation (coming soon)
- 🧪 **[Examples](examples/)** — Interactive demos and use cases
- 🔧 **[Contributing](CONTRIBUTING.md)** — Contribution guidelines (coming soon)

---

## Development Setup

```bash
# Clone the repository
git clone https://github.com/AutumnsGrove/Gossamer.git
cd Gossamer

# Install dependencies
pnpm install

# Build packages
pnpm build

# Run tests
pnpm test

# Start development server
pnpm dev
```

---

## Project Structure

```
Gossamer/
├── packages/
│   ├── core/              # gossamer (vanilla JS/TS)
│   ├── svelte/            # @gossamer/svelte
│   ├── react/             # @gossamer/react (future)
│   └── vue/               # @gossamer/vue (future)
├── examples/
│   ├── vanilla/           # Plain HTML/JS examples
│   ├── svelte-kit/        # SvelteKit integration
│   └── next-js/           # Next.js integration (future)
├── docs/                  # Documentation
└── tests/                 # Test suites
```

---

## Browser Support

Gossamer works in all modern browsers that support:
- HTML5 Canvas API
- ResizeObserver API
- IntersectionObserver API

**Supported:**
- Chrome/Edge 76+
- Firefox 69+
- Safari 13+
- Opera 63+

---

## Performance

Gossamer is optimized for smooth animations even on lower-end devices:

- **Cell-based rendering** — Reduces pixel operations by 8-16x
- **FPS limiting** — Default 30fps for ambient effects
- **Visibility detection** — Pauses animations when off-screen
- **Lightweight** — Core library < 15KB gzipped
- **No dependencies** — Uses native Canvas API

---

## Accessibility

Gossamer follows accessibility best practices:

- ✅ All effects are decorative-only (`aria-hidden="true"`)
- ✅ Respects `prefers-reduced-motion` system preference
- ✅ Never conveys information through effects alone
- ✅ Effects never obscure focus indicators
- ✅ Semantic HTML preserved in all components

---

## Roadmap

### v1.0 (Current)
- [x] Core rendering engine
- [ ] GossamerClouds component
- [ ] GossamerImage component
- [ ] Svelte 5 adapter
- [ ] Preset system
- [ ] Documentation site

### v1.1
- [ ] GossamerText component
- [ ] GossamerOverlay component
- [ ] GossamerBorder component
- [ ] React adapter
- [ ] Vue adapter

### v2.0 (Future)
- [ ] Three.js/Threlte integration
- [ ] WebGL shader-based rendering
- [ ] 3D ASCII post-processing
- [ ] Video source support

---

## License

MIT License — see [LICENSE](LICENSE) for details.

---

## Credits

**Author:** AutumnsGrove
**Repository:** [github.com/AutumnsGrove/Gossamer](https://github.com/AutumnsGrove/Gossamer)
**Icon:** SprayCan (Lucide)

**Inspired by:**
- [caidan.dev/ascii_clouds](https://caidan.dev/portfolio/ascii_clouds/)
- [emilwidlund/ASCII](https://github.com/emilwidlund/ASCII)
- [TresJS ASCII Post-Processing](https://post-processing.tresjs.org/guide/pmndrs/ascii)

---

**Last Updated:** January 2026
**Status:** v1.0 Draft — Core implementation in progress

---

*Walk through the grove at dawn. Spider silk stretches between branches, nearly invisible until the light finds it. Delicate threads catching dew, glittering for a moment, then vanishing into the green. That's what Gossamer brings to interfaces.*
