/**
 * Gossamer - Svelte 5 Components
 *
 * ASCII visual effects components for Svelte applications.
 *
 * @packageDocumentation
 */

export { default as GossamerClouds } from './GossamerClouds.svelte';
export { default as GossamerImage } from './GossamerImage.svelte';
export { default as GossamerText } from './GossamerText.svelte';
export { default as GossamerOverlay } from './GossamerOverlay.svelte';
export { default as GossamerBorder } from './GossamerBorder.svelte';

// Re-export core utilities
export { CHARACTER_SETS } from 'gossamer';

// Export presets
export { PRESETS, grovePresets, seasonalPresets } from './presets';

// Type exports
export type { GossamerCloudsProps } from './GossamerClouds.svelte';
export type { GossamerImageProps } from './GossamerImage.svelte';
