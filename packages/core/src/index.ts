/**
 * Gossamer - ASCII Visual Effects Library
 *
 * Threads of light. Delicate textures woven through your space.
 *
 * @packageDocumentation
 */

/**
 * Core configuration for ASCII rendering
 */
export interface GossamerConfig {
  /** Character set for ASCII rendering (light to dark) */
  characters?: string;
  /** Cell width in pixels */
  cellWidth?: number;
  /** Cell height in pixels */
  cellHeight?: number;
  /** Foreground color */
  color?: string;
  /** Background color (transparent if not set) */
  backgroundColor?: string;
  /** Font family for ASCII characters */
  fontFamily?: string;
  /** Enable animation loop */
  animate?: boolean;
  /** Target FPS for animation */
  fps?: number;
}

/**
 * Default character set ordered from light to dark
 */
export const DEFAULT_CHARACTERS = ' .:-=+*#%@';

/**
 * Default configuration values
 */
export const DEFAULT_CONFIG: Required<GossamerConfig> = {
  characters: DEFAULT_CHARACTERS,
  cellWidth: 8,
  cellHeight: 12,
  color: '#ffffff',
  backgroundColor: '',
  fontFamily: 'monospace',
  animate: false,
  fps: 30,
};

/**
 * Calculate brightness from RGB values using luminance formula
 * Uses the standard luminance coefficients: 0.21 R + 0.72 G + 0.07 B
 */
export function calculateBrightness(r: number, g: number, b: number): number {
  return 0.21 * r + 0.72 * g + 0.07 * b;
}

/**
 * Map a brightness value (0-255) to an ASCII character
 */
export function brightnessToChar(
  brightness: number,
  characters: string = DEFAULT_CHARACTERS
): string {
  const index = Math.floor((brightness / 255) * (characters.length - 1));
  return characters[Math.min(index, characters.length - 1)];
}

/**
 * Gossamer v0.0.1 - Placeholder release
 *
 * Full implementation coming soon. This package will provide:
 * - 2D Canvas ASCII rendering
 * - Ambient pattern generation
 * - Image-to-ASCII conversion
 * - Animation loops
 * - Framework adapters (Svelte, React, Vue)
 *
 * @see https://github.com/AutumnsGrove/Gossamer
 */
export const VERSION = '0.0.1';
