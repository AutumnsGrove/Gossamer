# Gossamer API Reference

Complete API documentation for the Gossamer ASCII visual effects library.

---

## Table of Contents

1. [Installation](#installation)
2. [Core Package](#core-package-autumnsgrove-gossamer)
   - [GossamerRenderer](#gossamerrenderer)
   - [Pattern Generators](#pattern-generators)
   - [Character Sets](#character-sets)
   - [Animation Utilities](#animation-utilities)
   - [Canvas Utilities](#canvas-utilities)
   - [Image Utilities](#image-utilities)
   - [Performance Utilities](#performance-utilities)
   - [Core Types](#core-types)
3. [Svelte Package](#svelte-package-gossamersvelte)
   - [GossamerClouds](#gossamerclouds)
   - [GossamerImage](#gossamerimage)
   - [GossamerText](#gossamertext)
   - [GossamerOverlay](#gossameroverlay)
   - [GossamerBorder](#gossamerborder)
   - [Presets](#presets)
4. [Examples](#examples)

---

## Installation

### Core Package

```bash
pnpm add @autumnsgrove/gossamer
# or
npm install @autumnsgrove/gossamer
```

### Svelte Package

```bash
pnpm add @gossamer/svelte
# or
npm install @gossamer/svelte
```

---

## Core Package (`@autumnsgrove/gossamer`)

The core package provides the rendering engine and utilities for ASCII visual effects. It's framework-agnostic and can be used with any JavaScript/TypeScript project.

### GossamerRenderer

The main rendering class that handles canvas-based ASCII rendering.

#### Constructor

```typescript
new GossamerRenderer(canvas: HTMLCanvasElement, config?: Partial<RenderConfig>)
```

#### RenderConfig

```typescript
interface RenderConfig {
  canvas: HTMLCanvasElement;        // Canvas element to render to
  characters: string;               // Character set (light to dark)
  cellWidth: number;                // Cell width in pixels (default: 8)
  cellHeight: number;               // Cell height in pixels (default: 12)
  color: string;                    // Foreground color (default: '#ffffff')
  backgroundColor: string;          // Background color (empty = transparent)
  fontFamily: string;               // Font family (default: 'monospace')
  brightnessFunction: (r, g, b) => number;  // Custom brightness calculation
}
```

#### Methods

| Method | Signature | Description |
|--------|-----------|-------------|
| `renderFrame` | `(imageData: ImageData) => void` | Render ASCII from ImageData |
| `renderFromBrightnessGrid` | `(grid: number[][]) => void` | Render from 2D brightness array (0-255) |
| `renderWithColors` | `(data: {char, color, x, y}[]) => void` | Render with per-character colors |
| `startAnimation` | `(updateFn, fps?) => void` | Start animation loop |
| `stopAnimation` | `() => void` | Stop animation loop |
| `pause` | `() => void` | Pause animation (resumable) |
| `isAnimating` | `() => boolean` | Check if animation is running |
| `resize` | `(width, height) => void` | Resize canvas |
| `getDimensions` | `() => {width, height}` | Get canvas dimensions |
| `getCellCount` | `() => {cols, rows}` | Get cell grid dimensions |
| `clear` | `() => void` | Clear canvas |
| `updateConfig` | `(config) => void` | Update renderer configuration |
| `destroy` | `() => void` | Clean up renderer |

#### Usage Example

```typescript
import { GossamerRenderer, generateBrightnessGrid } from '@autumnsgrove/gossamer';

const canvas = document.getElementById('myCanvas') as HTMLCanvasElement;
const renderer = new GossamerRenderer(canvas, {
  characters: ' ·∙•◦○◉●',
  cellWidth: 12,
  cellHeight: 12,
  color: '#22c55e'
});

// Animated rendering
renderer.startAnimation((time, deltaTime) => {
  const { cols, rows } = renderer.getCellCount();
  return generateBrightnessGrid(cols, rows, 'perlin', time * 0.001, {
    frequency: 0.05,
    amplitude: 1.0,
    speed: 0.5
  });
}, 30);

// Clean up
renderer.destroy();
```

---

### Pattern Generators

Functions for generating procedural patterns.

#### perlinNoise2D

```typescript
function perlinNoise2D(x: number, y: number): number
```

2D Perlin noise. Returns value between -1 and 1.

#### fbmNoise

```typescript
function fbmNoise(
  x: number,
  y: number,
  octaves?: number,      // Default: 4
  persistence?: number   // Default: 0.5
): number
```

Fractal Brownian Motion - layered Perlin noise for organic patterns. Returns -1 to 1.

#### wavePattern

```typescript
function wavePattern(
  x: number,
  y: number,
  time: number,
  config?: PatternConfig
): number
```

Sine/cosine wave interference pattern. Returns -1 to 1.

#### ripplePattern

```typescript
function ripplePattern(
  x: number,
  y: number,
  centerX: number,
  centerY: number,
  time: number,
  config?: PatternConfig
): number
```

Concentric circular waves emanating from a center point. Returns -1 to 1.

#### staticNoise

```typescript
function staticNoise(seed?: number): number
```

Random noise. With seed, produces reproducible values. Returns 0 to 1.

#### seededNoise2D

```typescript
function seededNoise2D(x: number, y: number, seed?: number): number
```

Reproducible 2D noise based on coordinates and seed. Returns 0 to 1.

#### generateBrightnessGrid

```typescript
function generateBrightnessGrid(
  cols: number,
  rows: number,
  pattern: PatternType,  // 'perlin' | 'waves' | 'static' | 'ripple' | 'fbm'
  time?: number,         // Default: 0
  config?: PatternConfig
): number[][]
```

Generate a 2D grid of brightness values (0-255) for rendering.

#### gridToImageData

```typescript
function gridToImageData(
  grid: number[][],
  cellWidth: number,
  cellHeight: number
): ImageData
```

Convert a brightness grid to ImageData for canvas rendering.

#### PatternConfig

```typescript
interface PatternConfig {
  frequency: number;   // Pattern scale (default: 0.05)
  amplitude: number;   // Intensity multiplier (default: 1.0)
  speed: number;       // Animation speed (default: 0.5)
}

const DEFAULT_PATTERN_CONFIG: PatternConfig = {
  frequency: 0.05,
  amplitude: 1.0,
  speed: 0.5,
};
```

---

### Character Sets

Predefined character sets for ASCII rendering, ordered from light to dark.

#### Built-in Character Sets

| Name | Characters | Best For |
|------|------------|----------|
| `standard` | ` .:-=+*#%@` | General purpose |
| `dense` | 70+ characters | High detail images |
| `minimal` | ` .:*#` | Subtle backgrounds |
| `grove` | ` ·∙•◦○◉●` | Organic, soft effects |
| `dots` | ` ⋅∘∙●` | Stipple, pointillism |
| `blocks` | ` ░▒▓█` | Retro, pixel art |
| `lines` | ` -─═╌│┃` | Rain, motion effects |
| `stars` | ` ·✧✦✫✬✯★` | Sparkle, night sky |
| `nature` | ` .~≈∿⌇☘` | Decorative |
| `weather` | ` ·.:*❄❅❆` | Snow, weather effects |
| `binary` | ` 01` | Matrix, digital effects |
| `math` | ` +-×÷=≠≈∞` | Abstract patterns |

#### Functions

```typescript
// Get a complete character set object
function getCharacterSet(name: string): CharacterSet | undefined

// Get just the characters string
function getCharacters(name: string): string

// List all available set names
function getCharacterSetNames(): string[]

// Create a custom character set
function createCharacterSet(
  name: string,
  characters: string,
  description?: string,
  bestFor?: string[]
): CharacterSet

// Validate character set (starts with space, 2+ chars)
function validateCharacterSet(characters: string): boolean

// Reverse character order (for inverted mapping)
function invertCharacters(characters: string): string
```

#### CharacterSet Interface

```typescript
interface CharacterSet {
  name: string;
  description: string;
  characters: string;
  bestFor: string[];
}
```

---

### Animation Utilities

Functions for managing animation loops and timing.

#### createAnimationLoop

```typescript
function createAnimationLoop(options: AnimationOptions): {
  start: () => void;
  stop: () => void;
  pause: () => void;
  resume: () => void;
  getState: () => AnimationState;
}
```

Creates a managed animation loop with FPS limiting.

```typescript
interface AnimationOptions {
  fps?: number;                    // Target FPS (default: 30)
  onStart?: () => void;            // Called when animation starts
  onStop?: () => void;             // Called when animation stops
  onFrame: (time, deltaTime, frameCount) => boolean | void;  // Frame callback
}

interface AnimationState {
  isRunning: boolean;
  frameId: number | null;
  lastFrameTime: number;
  frameInterval: number;
  elapsedTime: number;
  frameCount: number;
}
```

#### throttle

```typescript
function throttle<T extends Function>(fn: T, limit: number): T
```

Limit function execution to once per `limit` milliseconds.

#### debounce

```typescript
function debounce<T extends Function>(fn: T, delay: number): T
```

Delay execution until `delay` ms after last call.

#### calculateFPS

```typescript
function calculateFPS(frameTimes: number[], sampleSize?: number): number
```

Calculate actual FPS from an array of frame timestamps.

#### easings

```typescript
const easings = {
  linear: (t) => t,
  easeIn: (t) => t * t,
  easeOut: (t) => t * (2 - t),
  easeInOut: (t) => ...,
  sineIn: (t) => ...,
  sineOut: (t) => ...,
  sineInOut: (t) => ...,
  bounceOut: (t) => ...,
};
```

---

### Canvas Utilities

Helper functions for canvas setup and manipulation.

```typescript
// Create and configure a canvas element
function createCanvas(options?: CanvasOptions): HTMLCanvasElement

// Get device pixel ratio for HiDPI displays
function getDevicePixelRatio(): number

// Resize canvas to fit container while handling pixel ratio
function resizeCanvasToContainer(canvas, container): void

// Create an offscreen canvas for off-DOM rendering
function createOffscreenCanvas(width, height): OffscreenCanvas | HTMLCanvasElement

// Clear canvas (transparent or with background color)
function clearCanvas(ctx, backgroundColor?): void

// Get ImageData from canvas region
function getImageData(ctx, x?, y?, width?, height?): ImageData

// Optimize context for text rendering
function optimizeContext(ctx): void

// Set up text rendering with font and baseline
function setupTextRendering(ctx, fontSize, fontFamily?): void

// Measure text width
function measureTextWidth(ctx, text): number

// Calculate optimal cell size for target cell count
function calculateCellSize(width, height, targetCols, targetRows): {width, height}

// Set canvas blend mode
function setBlendMode(ctx, mode): void
```

---

### Image Utilities

Functions for loading and processing images.

```typescript
// Load an image from URL
function loadImage(src: string, options?: ImageLoadOptions): Promise<HTMLImageElement>

// Load and scale image to target dimensions
function loadAndScaleImage(src, targetWidth, targetHeight): Promise<HTMLImageElement>

// Convert image to pixel data array
function imageToPixelData(img, width?, height?): ImageData

// Extract brightness value from RGB
function extractBrightness(r, g, b): number

// Sample image in a cell grid
function sampleImageCells(imageData, cellWidth, cellHeight): CellData[][]

// Color conversion utilities
function rgbToHex(r, g, b): string
function hexToRgb(hex): {r, g, b} | null
function adjustBrightness(imageData, amount): ImageData
function adjustContrast(imageData, amount): ImageData
function invertColors(imageData): ImageData
function toGrayscale(imageData): ImageData
```

---

### Performance Utilities

Utilities for optimization and accessibility.

```typescript
// Create visibility observer (pauses when off-screen)
function createVisibilityObserver(
  element: HTMLElement,
  callback: (isVisible: boolean) => void,
  threshold?: number  // Default: 0.1
): () => void  // Returns cleanup function

// Create resize observer with debouncing
function createResizeObserver(
  element: HTMLElement,
  callback: (width: number, height: number) => void,
  debounceMs?: number
): () => void

// Check if user prefers reduced motion
function prefersReducedMotion(): boolean

// Watch for reduced motion preference changes
function onReducedMotionChange(callback: (prefers: boolean) => void): () => void

// Check if device is in low power mode
function isLowPowerMode(): boolean

// Get recommended FPS based on device capabilities
function getRecommendedFPS(): number

// Create FPS counter for performance monitoring
function createFPSCounter(): { update(): number; getFPS(): number }

// Environment detection
function isBrowser(): boolean
function isCanvasSupported(): boolean
function isOffscreenCanvasSupported(): boolean

// requestIdleCallback polyfill
function requestIdleCallback(callback): number
function cancelIdleCallback(id): void
```

---

### Core Types

```typescript
type PatternType = 'perlin' | 'waves' | 'static' | 'ripple' | 'fbm';

interface GossamerConfig {
  characters?: string;
  cellWidth?: number;
  cellHeight?: number;
  color?: string;
  backgroundColor?: string;
  fontFamily?: string;
  animate?: boolean;
  fps?: number;
}

interface PresetConfig {
  name: string;
  description: string;
  characters: string;
  pattern: PatternType;
  frequency: number;
  amplitude: number;
  speed: number;
  opacity: number;
}
```

---

## Svelte Package (`@gossamer/svelte`)

Svelte 5 components wrapping the core rendering functionality.

### GossamerClouds

Animated ambient background patterns.

```svelte
<script>
  import { GossamerClouds } from '@gossamer/svelte';
</script>

<GossamerClouds
  pattern="perlin"
  characters=" ·∙•◦"
  color="currentColor"
  opacity={0.3}
  animated
  speed={0.5}
/>
```

#### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `pattern` | `PatternType` | `'perlin'` | Pattern generator type |
| `characters` | `string` | Grove set | Character set (light to dark) |
| `color` | `string` | `'currentColor'` | Foreground color |
| `opacity` | `number` | `0.3` | Overall opacity (0-1) |
| `animated` | `boolean` | `true` | Enable animation |
| `speed` | `number` | `0.5` | Animation speed multiplier |
| `frequency` | `number` | `0.05` | Pattern scale |
| `amplitude` | `number` | `1.0` | Pattern intensity |
| `cellSize` | `number` | `12` | Cell size in pixels |
| `fps` | `number` | `30` | Target frames per second |
| `preset` | `string` | - | Use a named preset |
| `class` | `string` | - | Additional CSS class |

---

### GossamerImage

Convert images to ASCII art with optional hover reveal.

```svelte
<script>
  import { GossamerImage } from '@gossamer/svelte';
</script>

<GossamerImage
  src="/photo.jpg"
  alt="Photo description"
  cellSize={4}
  color="preserve"
  showOriginalOnHover
/>
```

#### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `src` | `string` | **required** | Image source URL |
| `alt` | `string` | **required** | Alt text for accessibility |
| `characters` | `string` | Standard set | Character set |
| `cellSize` | `number` | `8` | Detail level (smaller = more detail) |
| `color` | `string \| 'preserve'` | `'#ffffff'` | Single color or preserve image colors |
| `invert` | `boolean` | `false` | Invert brightness mapping |
| `width` | `number` | - | Output width in pixels |
| `height` | `number` | - | Output height in pixels |
| `showOriginalOnHover` | `boolean` | `false` | Reveal original image on hover |
| `transitionDuration` | `number` | `300` | Hover transition duration (ms) |
| `class` | `string` | - | Additional CSS class |

---

### GossamerText

ASCII-styled text with optional animation effects.

```svelte
<script>
  import { GossamerText } from '@gossamer/svelte';
</script>

<GossamerText
  text="GROVE"
  fontSize={48}
  color="#22c55e"
  animated
/>
```

#### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `text` | `string` | **required** | Text content to display |
| `characters` | `string` | Minimal set | Character set for effects |
| `color` | `string` | `'currentColor'` | Text color |
| `fontSize` | `number` | `48` | Font size in pixels |
| `fontFamily` | `string` | `'monospace'` | Font family |
| `animated` | `boolean` | `false` | Enable animation effect |
| `pattern` | `PatternType` | `'perlin'` | Animation pattern |
| `speed` | `number` | `0.5` | Animation speed |
| `intensity` | `number` | `0.3` | Effect intensity |
| `fps` | `number` | `30` | Target FPS |
| `class` | `string` | - | Additional CSS class |

---

### GossamerOverlay

Composite ASCII patterns over content with blend modes.

```svelte
<script>
  import { GossamerOverlay } from '@gossamer/svelte';
</script>

<div class="relative">
  <GossamerOverlay
    pattern="waves"
    blendMode="soft-light"
    opacity={0.15}
  />
  <p>Content underneath</p>
</div>
```

#### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `pattern` | `PatternType` | `'perlin'` | Pattern type |
| `characters` | `string` | Minimal set | Character set |
| `color` | `string` | `'currentColor'` | Foreground color |
| `opacity` | `number` | `0.15` | Overlay opacity |
| `blendMode` | `BlendMode` | `'overlay'` | CSS blend mode |
| `animated` | `boolean` | `true` | Enable animation |
| `speed` | `number` | `0.3` | Animation speed |
| `frequency` | `number` | `0.03` | Pattern scale |
| `amplitude` | `number` | `0.6` | Pattern intensity |
| `cellSize` | `number` | `16` | Cell size in pixels |
| `fps` | `number` | `30` | Target FPS |
| `class` | `string` | - | Additional CSS class |

#### BlendMode

```typescript
type BlendMode = 'normal' | 'multiply' | 'screen' | 'overlay' | 'soft-light' | 'hard-light' | 'difference';
```

---

### GossamerBorder

Decorative ASCII borders and frames.

```svelte
<script>
  import { GossamerBorder } from '@gossamer/svelte';
</script>

<GossamerBorder style="simple" color="#22c55e">
  <p>Content inside the border</p>
</GossamerBorder>
```

#### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `style` | `BorderStyle` | `'simple'` | Border style preset |
| `characters` | `object` | - | Custom border characters |
| `color` | `string` | `'currentColor'` | Border color |
| `thickness` | `number` | `1` | Border thickness (characters) |
| `charSize` | `number` | `12` | Character size in pixels |
| `animated` | `boolean` | `false` | Enable marching animation |
| `speed` | `number` | `0.5` | Animation speed |
| `padding` | `number` | `0` | Inner padding in pixels |
| `class` | `string` | - | Additional CSS class |

#### BorderStyle

```typescript
type BorderStyle = 'dots' | 'dashes' | 'stars' | 'corners' | 'simple' | 'double';
```

#### Custom Characters

```typescript
interface BorderCharacters {
  horizontal?: string;
  vertical?: string;
  topLeft?: string;
  topRight?: string;
  bottomLeft?: string;
  bottomRight?: string;
}
```

---

### Presets

Pre-configured effect settings for quick setup.

#### Using Presets

```svelte
<GossamerClouds preset="grove-mist" />
<GossamerClouds preset="winter-snow" />
```

#### Available Presets

**Grove Presets** (Nature-inspired):
| Preset | Description | Pattern |
|--------|-------------|---------|
| `grove-mist` | Soft fog drifting through trees | perlin |
| `grove-fireflies` | Twinkling points of light | static |
| `grove-rain` | Gentle rain through canopy | waves |
| `grove-dew` | Morning dew on spider silk | fbm |

**Seasonal Presets**:
| Preset | Description | Pattern |
|--------|-------------|---------|
| `winter-snow` | Gentle snowfall | perlin |
| `autumn-leaves` | Scattered drifting leaves | perlin |
| `spring-petals` | Cherry blossom petals | waves |
| `summer-heat` | Heat shimmer | waves |

**Ambient Presets** (Subtle backgrounds):
| Preset | Description | Pattern |
|--------|-------------|---------|
| `ambient-static` | Gentle static texture | static |
| `ambient-waves` | Soft flowing waves | waves |
| `ambient-clouds` | Drifting cloud patterns | fbm |

#### Preset Utilities

```typescript
import { getPreset, getPresetNames, getPresetsByCategory } from '@gossamer/svelte';

// Get a single preset configuration
const mist = getPreset('grove-mist');

// List all preset names
const names = getPresetNames();
// ['grove-mist', 'grove-fireflies', 'grove-rain', ...]

// Get presets organized by category
const byCategory = getPresetsByCategory();
// { grove: [...], seasonal: [...], ambient: [...] }
```

---

## Examples

### Basic Ambient Background

```svelte
<script>
  import { GossamerClouds } from '@gossamer/svelte';
</script>

<div class="card">
  <GossamerClouds
    preset="grove-mist"
    class="background"
  />
  <div class="content">
    <h2>Card Title</h2>
    <p>Card content with subtle ASCII background</p>
  </div>
</div>

<style>
  .card {
    position: relative;
    padding: 2rem;
    background: rgba(0, 0, 0, 0.8);
    border-radius: 8px;
  }
  .content {
    position: relative;
    z-index: 1;
  }
</style>
```

### Image to ASCII with Hover

```svelte
<GossamerImage
  src="/avatar.jpg"
  alt="User avatar"
  cellSize={4}
  color="preserve"
  showOriginalOnHover
  transitionDuration={500}
  width={300}
/>
```

### Animated Text Header

```svelte
<GossamerText
  text="WELCOME"
  fontSize={64}
  color="var(--accent-color)"
  animated
  speed={0.3}
  intensity={0.2}
/>
```

### Vanilla JavaScript Usage

```typescript
import {
  GossamerRenderer,
  generateBrightnessGrid,
  getCharacters,
  createAnimationLoop,
} from '@autumnsgrove/gossamer';

const canvas = document.querySelector('#canvas') as HTMLCanvasElement;
canvas.width = 800;
canvas.height = 400;

const renderer = new GossamerRenderer(canvas, {
  characters: getCharacters('grove'),
  cellWidth: 12,
  cellHeight: 12,
  color: '#22c55e',
});

const { cols, rows } = renderer.getCellCount();

const animation = createAnimationLoop({
  fps: 30,
  onFrame: (time) => {
    const grid = generateBrightnessGrid(
      cols, rows, 'perlin', time * 0.001,
      { frequency: 0.05, amplitude: 1.0, speed: 0.5 }
    );
    renderer.renderFromBrightnessGrid(grid);
  },
});

animation.start();

// Clean up when done
// animation.stop();
// renderer.destroy();
```

---

## Accessibility

All Gossamer components follow accessibility best practices:

- Canvas elements are marked `aria-hidden="true"` (decorative only)
- Animation respects `prefers-reduced-motion` system preference
- GossamerText includes screen-reader accessible text
- Effects never convey information - purely decorative
- Focus indicators are never obscured by effects

---

## Browser Support

Gossamer requires:
- HTML5 Canvas API
- ResizeObserver API
- IntersectionObserver API

**Supported browsers:**
- Chrome/Edge 76+
- Firefox 69+
- Safari 13+
- Opera 63+

---

*Documentation generated for Gossamer v0.1.0*
