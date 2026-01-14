/**
 * Gossamer - ASCII Visual Effects Library
 *
 * Core rendering engine for canvas-based ASCII effects.
 *
 * @packageDocumentation
 */

export { GossamerRenderer } from './renderer';
export { generatePatternData, perlinNoise2D, wavePattern } from './patterns';
export { calculateBrightness } from './brightness';
export { CHARACTER_SETS } from './characters';
export { createAnimationLoop } from './animation';

// Utility exports
export * from './utils/canvas';
export * from './utils/image';
export * from './utils/performance';

// Type exports
export type { RenderConfig, PatternConfig } from './types';
