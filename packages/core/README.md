# gossamer (core)

Core rendering engine for Gossamer ASCII visual effects.

## Installation

```bash
pnpm add gossamer
# or
npm install gossamer
```

## Usage

```typescript
import { GossamerRenderer, generatePatternData } from 'gossamer';

const canvas = document.getElementById('myCanvas') as HTMLCanvasElement;
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

## Documentation

See the [main repository](https://github.com/AutumnsGrove/Gossamer) for full documentation.
