# Gossamer Vanilla JavaScript Examples

Examples of using Gossamer with plain HTML and JavaScript.

## Coming Soon

Interactive examples will be added here demonstrating:
- Basic cloud animations
- Image to ASCII transformation
- Pattern variations
- Performance optimization

## Quick Example

```html
<!DOCTYPE html>
<html>
<head>
  <title>Gossamer Example</title>
</head>
<body>
  <canvas id="gossamer-canvas" width="800" height="600"></canvas>

  <script type="module">
    import { GossamerRenderer, generatePatternData } from 'gossamer';

    const canvas = document.getElementById('gossamer-canvas');
    const renderer = new GossamerRenderer(canvas, {
      characters: ' ·∙•◦○◉●',
      cellSize: 12,
      color: '#22c55e'
    });

    renderer.startAnimation((time) => {
      return generatePatternData(
        canvas.width,
        canvas.height,
        'perlin',
        time * 0.001,
        { frequency: 0.05, amplitude: 1.0, speed: 0.5 }
      );
    }, 30);
  </script>
</body>
</html>
```
