/**
 * Preset configurations for Gossamer effects
 */

import type { PresetConfig } from 'gossamer';

/**
 * Grove-themed presets
 */
export const grovePresets: Record<string, PresetConfig> = {
  'grove-mist': {
    name: 'Grove Mist',
    description: 'Soft fog effect',
    characters: ' ·∙•◦',
    pattern: 'perlin',
    frequency: 0.03,
    amplitude: 0.8,
    speed: 0.3,
    opacity: 0.2
  },
  'grove-fireflies': {
    name: 'Grove Fireflies',
    description: 'Twinkling points of light',
    characters: ' ·*✦✧',
    pattern: 'static',
    frequency: 0.01,
    amplitude: 1.2,
    speed: 0.8,
    opacity: 0.3
  },
  'grove-rain': {
    name: 'Grove Rain',
    description: 'Gentle rain lines',
    characters: ' │\\|/',
    pattern: 'waves',
    frequency: 0.05,
    amplitude: 1.0,
    speed: 1.5,
    opacity: 0.15
  }
};

/**
 * Seasonal presets
 */
export const seasonalPresets: Record<string, PresetConfig> = {
  'winter-snow': {
    name: 'Winter Snow',
    description: 'Falling snow',
    characters: ' ·∙*❄',
    pattern: 'perlin',
    frequency: 0.04,
    amplitude: 0.9,
    speed: 0.5,
    opacity: 0.25
  },
  'autumn-leaves': {
    name: 'Autumn Leaves',
    description: 'Scattered leaves',
    characters: ' 🍂·∙',
    pattern: 'perlin',
    frequency: 0.06,
    amplitude: 1.1,
    speed: 0.4,
    opacity: 0.2
  },
  'spring-petals': {
    name: 'Spring Petals',
    description: 'Floating petals',
    characters: ' ·✿❀',
    pattern: 'waves',
    frequency: 0.05,
    amplitude: 0.8,
    speed: 0.6,
    opacity: 0.2
  },
  'summer-heat': {
    name: 'Summer Heat',
    description: 'Heat shimmer',
    characters: ' ~≈∿',
    pattern: 'waves',
    frequency: 0.08,
    amplitude: 1.3,
    speed: 1.0,
    opacity: 0.1
  }
};

/**
 * All presets combined
 */
export const PRESETS = {
  ...grovePresets,
  ...seasonalPresets
};
