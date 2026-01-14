/**
 * Configuration for the Gossamer renderer
 */
export interface RenderConfig {
  /** Canvas element to render to */
  canvas: HTMLCanvasElement;
  /** Character set for ASCII mapping */
  characters: string;
  /** Size of each cell in pixels */
  cellSize: number;
  /** Color for characters */
  color: string;
  /** Brightness calculation function */
  brightness: (r: number, g: number, b: number) => number;
}

/**
 * Configuration for pattern generation
 */
export interface PatternConfig {
  /** Pattern frequency/scale */
  frequency: number;
  /** Pattern intensity/amplitude */
  amplitude: number;
  /** Animation speed multiplier */
  speed: number;
}

/**
 * Supported pattern types
 */
export type PatternType = 'perlin' | 'waves' | 'static' | 'simplex';

/**
 * Preset configuration
 */
export interface PresetConfig {
  name: string;
  description: string;
  characters: string;
  pattern: PatternType;
  frequency: number;
  amplitude: number;
  speed: number;
  color?: string;
  opacity?: number;
}
