# @gossamer/svelte

Svelte 5 components for Gossamer ASCII visual effects.

## Installation

```bash
pnpm add @gossamer/svelte
# or
npm install @gossamer/svelte
```

## Usage

```svelte
<script>
  import { GossamerClouds, GossamerImage } from '@gossamer/svelte';
</script>

<GossamerClouds
  pattern="perlin"
  characters=" ·∙•"
  opacity={0.15}
/>

<GossamerImage
  src="/photo.jpg"
  alt="Photo"
  cellSize={4}
  showOriginalOnHover
/>
```

## Components

- `GossamerClouds` - Floating ambient patterns
- `GossamerImage` - Image to ASCII transformation
- `GossamerText` - ASCII-styled text effects
- `GossamerOverlay` - Composite effects
- `GossamerBorder` - Decorative borders

## Presets

Use built-in presets for quick setup:

```svelte
<GossamerClouds preset="grove-mist" />
<GossamerClouds preset="winter-snow" />
```

Available presets: `grove-mist`, `grove-fireflies`, `grove-rain`, `winter-snow`, `autumn-leaves`, `spring-petals`, `summer-heat`

## Documentation

See the [main repository](https://github.com/AutumnsGrove/Gossamer) for full documentation.
