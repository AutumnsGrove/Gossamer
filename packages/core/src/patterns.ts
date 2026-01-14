/**
 * Gossamer Pattern Generators
 *
 * Provides noise and pattern generation functions for ambient ASCII effects.
 * Includes Perlin noise, wave patterns, and static noise.
 */

/**
 * Configuration for pattern generation
 */
export interface PatternConfig {
  /** Pattern scale - higher values create finer detail */
  frequency: number;
  /** Pattern intensity multiplier */
  amplitude: number;
  /** Animation speed multiplier */
  speed: number;
}

/**
 * Default pattern configuration
 */
export const DEFAULT_PATTERN_CONFIG: PatternConfig = {
  frequency: 0.05,
  amplitude: 1.0,
  speed: 0.5,
};

// Permutation table for Perlin noise
const PERMUTATION = new Uint8Array(512);
const P = new Uint8Array([
  151, 160, 137, 91, 90, 15, 131, 13, 201, 95, 96, 53, 194, 233, 7, 225, 140, 36, 103, 30, 69, 142,
  8, 99, 37, 240, 21, 10, 23, 190, 6, 148, 247, 120, 234, 75, 0, 26, 197, 62, 94, 252, 219, 203,
  117, 35, 11, 32, 57, 177, 33, 88, 237, 149, 56, 87, 174, 20, 125, 136, 171, 168, 68, 175, 74, 165,
  71, 134, 139, 48, 27, 166, 77, 146, 158, 231, 83, 111, 229, 122, 60, 211, 133, 230, 220, 105, 92,
  41, 55, 46, 245, 40, 244, 102, 143, 54, 65, 25, 63, 161, 1, 216, 80, 73, 209, 76, 132, 187, 208,
  89, 18, 169, 200, 196, 135, 130, 116, 188, 159, 86, 164, 100, 109, 198, 173, 186, 3, 64, 52, 217,
  226, 250, 124, 123, 5, 202, 38, 147, 118, 126, 255, 82, 85, 212, 207, 206, 59, 227, 47, 16, 58,
  17, 182, 189, 28, 42, 223, 183, 170, 213, 119, 248, 152, 2, 44, 154, 163, 70, 221, 153, 101, 155,
  167, 43, 172, 9, 129, 22, 39, 253, 19, 98, 108, 110, 79, 113, 224, 232, 178, 185, 112, 104, 218,
  246, 97, 228, 251, 34, 242, 193, 238, 210, 144, 12, 191, 179, 162, 241, 81, 51, 145, 235, 249,
  14, 239, 107, 49, 192, 214, 31, 181, 199, 106, 157, 184, 84, 204, 176, 115, 121, 50, 45, 127, 4,
  150, 254, 138, 236, 205, 93, 222, 114, 67, 29, 24, 72, 243, 141, 128, 195, 78, 66, 215, 61, 156,
  180,
]);

// Initialize permutation table
for (let i = 0; i < 256; i++) {
  PERMUTATION[i] = P[i];
  PERMUTATION[i + 256] = P[i];
}

/**
 * Fade function for smooth interpolation (6t^5 - 15t^4 + 10t^3)
 */
function fade(t: number): number {
  return t * t * t * (t * (t * 6 - 15) + 10);
}

/**
 * Linear interpolation
 */
function lerp(a: number, b: number, t: number): number {
  return a + t * (b - a);
}

/**
 * Gradient function for Perlin noise
 */
function grad(hash: number, x: number, y: number): number {
  const h = hash & 3;
  const u = h < 2 ? x : y;
  const v = h < 2 ? y : x;
  return ((h & 1) === 0 ? u : -u) + ((h & 2) === 0 ? v : -v);
}

/**
 * 2D Perlin noise function
 *
 * @param x - X coordinate
 * @param y - Y coordinate
 * @returns Noise value between -1 and 1
 */
export function perlinNoise2D(x: number, y: number): number {
  // Find unit square containing point
  const xi = Math.floor(x) & 255;
  const yi = Math.floor(y) & 255;

  // Find relative position in square
  const xf = x - Math.floor(x);
  const yf = y - Math.floor(y);

  // Fade curves
  const u = fade(xf);
  const v = fade(yf);

  // Hash coordinates of square corners
  const aa = PERMUTATION[PERMUTATION[xi] + yi];
  const ab = PERMUTATION[PERMUTATION[xi] + yi + 1];
  const ba = PERMUTATION[PERMUTATION[xi + 1] + yi];
  const bb = PERMUTATION[PERMUTATION[xi + 1] + yi + 1];

  // Blend results from 4 corners
  const x1 = lerp(grad(aa, xf, yf), grad(ba, xf - 1, yf), u);
  const x2 = lerp(grad(ab, xf, yf - 1), grad(bb, xf - 1, yf - 1), u);

  return lerp(x1, x2, v);
}

/**
 * Fractal Brownian Motion (fBm) using Perlin noise
 * Creates more organic-looking noise by layering multiple octaves
 *
 * @param x - X coordinate
 * @param y - Y coordinate
 * @param octaves - Number of noise layers (default: 4)
 * @param persistence - Amplitude decay per octave (default: 0.5)
 * @returns Noise value between -1 and 1
 */
export function fbmNoise(x: number, y: number, octaves: number = 4, persistence: number = 0.5): number {
  let total = 0;
  let frequency = 1;
  let amplitude = 1;
  let maxValue = 0;

  for (let i = 0; i < octaves; i++) {
    total += perlinNoise2D(x * frequency, y * frequency) * amplitude;
    maxValue += amplitude;
    amplitude *= persistence;
    frequency *= 2;
  }

  return total / maxValue;
}

/**
 * Wave pattern generator
 *
 * @param x - X coordinate
 * @param y - Y coordinate
 * @param time - Time value for animation
 * @param config - Pattern configuration
 * @returns Value between -1 and 1
 */
export function wavePattern(
  x: number,
  y: number,
  time: number,
  config: PatternConfig = DEFAULT_PATTERN_CONFIG
): number {
  const { frequency, amplitude, speed } = config;
  const wave1 = Math.sin(x * frequency + time * speed);
  const wave2 = Math.cos(y * frequency + time * speed * 0.7);
  const wave3 = Math.sin((x + y) * frequency * 0.5 + time * speed * 0.5);

  return ((wave1 + wave2 + wave3) / 3) * amplitude;
}

/**
 * Ripple pattern (concentric waves from center)
 *
 * @param x - X coordinate
 * @param y - Y coordinate
 * @param centerX - Ripple center X
 * @param centerY - Ripple center Y
 * @param time - Time value for animation
 * @param config - Pattern configuration
 * @returns Value between -1 and 1
 */
export function ripplePattern(
  x: number,
  y: number,
  centerX: number,
  centerY: number,
  time: number,
  config: PatternConfig = DEFAULT_PATTERN_CONFIG
): number {
  const { frequency, amplitude, speed } = config;
  const dx = x - centerX;
  const dy = y - centerY;
  const distance = Math.sqrt(dx * dx + dy * dy);

  return Math.sin(distance * frequency - time * speed) * amplitude;
}

/**
 * Static noise generator (random values)
 *
 * @param seed - Optional seed for reproducible noise
 * @returns Value between 0 and 1
 */
export function staticNoise(seed?: number): number {
  if (seed !== undefined) {
    // Simple seeded random using sine
    const x = Math.sin(seed * 12.9898) * 43758.5453;
    return x - Math.floor(x);
  }
  return Math.random();
}

/**
 * Seeded 2D noise for reproducible patterns
 *
 * @param x - X coordinate
 * @param y - Y coordinate
 * @param seed - Seed value
 * @returns Value between 0 and 1
 */
export function seededNoise2D(x: number, y: number, seed: number = 0): number {
  const n = Math.sin(x * 12.9898 + y * 78.233 + seed) * 43758.5453;
  return n - Math.floor(n);
}

/**
 * Generate a brightness grid for pattern rendering
 *
 * @param cols - Number of columns
 * @param rows - Number of rows
 * @param pattern - Pattern type
 * @param time - Current time in seconds
 * @param config - Pattern configuration
 * @returns 2D array of brightness values (0-255)
 */
export function generateBrightnessGrid(
  cols: number,
  rows: number,
  pattern: 'perlin' | 'waves' | 'static' | 'ripple' | 'fbm',
  time: number = 0,
  config: PatternConfig = DEFAULT_PATTERN_CONFIG
): number[][] {
  const grid: number[][] = [];
  const { frequency, amplitude, speed } = config;

  for (let row = 0; row < rows; row++) {
    grid[row] = [];
    for (let col = 0; col < cols; col++) {
      let value: number;

      switch (pattern) {
        case 'perlin':
          value = perlinNoise2D(
            col * frequency + time * speed * 0.1,
            row * frequency + time * speed * 0.05
          );
          break;

        case 'fbm':
          value = fbmNoise(
            col * frequency + time * speed * 0.1,
            row * frequency + time * speed * 0.05,
            4,
            0.5
          );
          break;

        case 'waves':
          value = wavePattern(col, row, time, config);
          break;

        case 'ripple':
          value = ripplePattern(col, row, cols / 2, rows / 2, time, config);
          break;

        case 'static':
        default:
          // For static, use time as seed for animated static
          value = seededNoise2D(col, row, Math.floor(time * speed * 10)) * 2 - 1;
          break;
      }

      // Normalize from [-1, 1] to [0, 255] with amplitude
      const normalized = (value + 1) * 0.5 * amplitude;
      const brightness = Math.max(0, Math.min(255, Math.floor(normalized * 255)));
      grid[row][col] = brightness;
    }
  }

  return grid;
}

/**
 * Generate ImageData from a brightness grid
 *
 * @param grid - 2D array of brightness values
 * @param cellWidth - Width of each cell
 * @param cellHeight - Height of each cell
 * @returns ImageData object
 */
export function gridToImageData(grid: number[][], cellWidth: number, cellHeight: number): ImageData {
  const rows = grid.length;
  const cols = grid[0]?.length || 0;
  const width = cols * cellWidth;
  const height = rows * cellHeight;
  const data = new Uint8ClampedArray(width * height * 4);

  for (let row = 0; row < rows; row++) {
    for (let col = 0; col < cols; col++) {
      const brightness = grid[row][col];

      // Fill cell region with brightness value
      for (let cy = 0; cy < cellHeight; cy++) {
        for (let cx = 0; cx < cellWidth; cx++) {
          const px = ((row * cellHeight + cy) * width + (col * cellWidth + cx)) * 4;
          data[px] = brightness; // R
          data[px + 1] = brightness; // G
          data[px + 2] = brightness; // B
          data[px + 3] = 255; // A
        }
      }
    }
  }

  return new ImageData(data, width, height);
}

export type PatternType = 'perlin' | 'waves' | 'static' | 'ripple' | 'fbm';
