/**
 * Tests for Gossamer presets
 */
import { describe, it, expect } from 'vitest';
import {
  grovePresets,
  seasonalPresets,
  ambientPresets,
  PRESETS,
  getPreset,
  getPresetNames,
  getPresetsByCategory,
} from './presets';

describe('grovePresets', () => {
  it('should contain grove-mist preset', () => {
    expect(grovePresets['grove-mist']).toBeDefined();
    expect(grovePresets['grove-mist'].name).toBe('Grove Mist');
    expect(grovePresets['grove-mist'].pattern).toBe('perlin');
  });

  it('should contain grove-fireflies preset', () => {
    expect(grovePresets['grove-fireflies']).toBeDefined();
    expect(grovePresets['grove-fireflies'].pattern).toBe('static');
  });

  it('should contain grove-rain preset', () => {
    expect(grovePresets['grove-rain']).toBeDefined();
    expect(grovePresets['grove-rain'].pattern).toBe('waves');
  });

  it('should contain grove-dew preset', () => {
    expect(grovePresets['grove-dew']).toBeDefined();
    expect(grovePresets['grove-dew'].pattern).toBe('fbm');
  });

  it('should have all required properties on each preset', () => {
    for (const [name, preset] of Object.entries(grovePresets)) {
      expect(preset.name).toBeDefined();
      expect(preset.description).toBeDefined();
      expect(preset.characters).toBeDefined();
      expect(preset.pattern).toBeDefined();
      expect(preset.frequency).toBeGreaterThan(0);
      expect(preset.amplitude).toBeGreaterThan(0);
      expect(preset.speed).toBeGreaterThanOrEqual(0);
      expect(preset.opacity).toBeGreaterThan(0);
      expect(preset.opacity).toBeLessThanOrEqual(1);
    }
  });
});

describe('seasonalPresets', () => {
  it('should contain all four seasons', () => {
    expect(seasonalPresets['winter-snow']).toBeDefined();
    expect(seasonalPresets['autumn-leaves']).toBeDefined();
    expect(seasonalPresets['spring-petals']).toBeDefined();
    expect(seasonalPresets['summer-heat']).toBeDefined();
  });

  it('should have descriptive names', () => {
    expect(seasonalPresets['winter-snow'].name).toBe('Winter Snow');
    expect(seasonalPresets['autumn-leaves'].name).toBe('Autumn Leaves');
    expect(seasonalPresets['spring-petals'].name).toBe('Spring Petals');
    expect(seasonalPresets['summer-heat'].name).toBe('Summer Heat');
  });
});

describe('ambientPresets', () => {
  it('should contain ambient presets', () => {
    expect(ambientPresets['ambient-static']).toBeDefined();
    expect(ambientPresets['ambient-waves']).toBeDefined();
    expect(ambientPresets['ambient-clouds']).toBeDefined();
  });

  it('should have low opacity for subtle effects', () => {
    for (const preset of Object.values(ambientPresets)) {
      expect(preset.opacity).toBeLessThanOrEqual(0.15);
    }
  });
});

describe('PRESETS', () => {
  it('should contain all presets from all categories', () => {
    const groveCount = Object.keys(grovePresets).length;
    const seasonalCount = Object.keys(seasonalPresets).length;
    const ambientCount = Object.keys(ambientPresets).length;
    const totalCount = Object.keys(PRESETS).length;

    expect(totalCount).toBe(groveCount + seasonalCount + ambientCount);
  });

  it('should include presets from grove category', () => {
    expect(PRESETS['grove-mist']).toBeDefined();
    expect(PRESETS['grove-fireflies']).toBeDefined();
  });

  it('should include presets from seasonal category', () => {
    expect(PRESETS['winter-snow']).toBeDefined();
    expect(PRESETS['summer-heat']).toBeDefined();
  });

  it('should include presets from ambient category', () => {
    expect(PRESETS['ambient-static']).toBeDefined();
    expect(PRESETS['ambient-clouds']).toBeDefined();
  });
});

describe('getPreset', () => {
  it('should return preset by name', () => {
    const preset = getPreset('grove-mist');
    expect(preset).toBeDefined();
    expect(preset?.name).toBe('Grove Mist');
  });

  it('should return undefined for unknown preset', () => {
    const preset = getPreset('nonexistent');
    expect(preset).toBeUndefined();
  });
});

describe('getPresetNames', () => {
  it('should return array of all preset names', () => {
    const names = getPresetNames();
    expect(Array.isArray(names)).toBe(true);
    expect(names).toContain('grove-mist');
    expect(names).toContain('winter-snow');
    expect(names).toContain('ambient-static');
  });

  it('should return correct count of presets', () => {
    const names = getPresetNames();
    expect(names.length).toBe(Object.keys(PRESETS).length);
  });
});

describe('getPresetsByCategory', () => {
  it('should return presets organized by category', () => {
    const categories = getPresetsByCategory();

    expect(categories.grove).toBeDefined();
    expect(categories.seasonal).toBeDefined();
    expect(categories.ambient).toBeDefined();
  });

  it('should have correct presets in grove category', () => {
    const categories = getPresetsByCategory();
    expect(categories.grove).toContain('grove-mist');
    expect(categories.grove).toContain('grove-fireflies');
    expect(categories.grove).toContain('grove-rain');
    expect(categories.grove).toContain('grove-dew');
  });

  it('should have correct presets in seasonal category', () => {
    const categories = getPresetsByCategory();
    expect(categories.seasonal).toContain('winter-snow');
    expect(categories.seasonal).toContain('autumn-leaves');
    expect(categories.seasonal).toContain('spring-petals');
    expect(categories.seasonal).toContain('summer-heat');
  });

  it('should have correct presets in ambient category', () => {
    const categories = getPresetsByCategory();
    expect(categories.ambient).toContain('ambient-static');
    expect(categories.ambient).toContain('ambient-waves');
    expect(categories.ambient).toContain('ambient-clouds');
  });

  it('should have correct count in each category', () => {
    const categories = getPresetsByCategory();
    expect(categories.grove.length).toBe(Object.keys(grovePresets).length);
    expect(categories.seasonal.length).toBe(Object.keys(seasonalPresets).length);
    expect(categories.ambient.length).toBe(Object.keys(ambientPresets).length);
  });
});
