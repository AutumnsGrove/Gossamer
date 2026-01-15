<script lang="ts">
  import { GossamerClouds, PRESETS, getPresetNames, CHARACTER_SETS } from '@autumnsgrove/gossamer/svelte';
  import { GROVE_COLORS } from '@autumnsgrove/gossamer';
  import { Shuffle, Play, Pause, Info } from 'lucide-svelte';

  // All available patterns (including the new ones!)
  const patterns = ['perlin', 'fbm', 'waves', 'static', 'ripple', 'clouds', 'plasma', 'vortex', 'matrix', 'gradient', 'diamond', 'fractal'] as const;
  type PatternType = typeof patterns[number];

  // All presets
  const presetNames = getPresetNames();

  // Available colors from Grove palette
  const colorOptions = [
    { name: 'Grove', value: GROVE_COLORS.grove },
    { name: 'Grove Light', value: GROVE_COLORS['grove-light'] },
    { name: 'Cream', value: GROVE_COLORS.cream },
    { name: 'Bark', value: GROVE_COLORS['bark-light'] },
    { name: 'White', value: '#ffffff' },
  ];

  // Character set options
  const charsetOptions = Object.entries(CHARACTER_SETS).slice(0, 10).map(([key, set]) => ({
    name: set.name,
    value: set.characters,
    key,
  }));

  // State
  let currentPattern = $state<PatternType>('clouds');
  let currentCharacters = $state(CHARACTER_SETS['glass-mist'].characters);
  let currentColor = $state(GROVE_COLORS.grove);
  let currentOpacity = $state(0.4);
  let currentSpeed = $state(0.6);
  let currentFrequency = $state(0.04);
  let currentAmplitude = $state(0.9);
  let isAnimated = $state(true);
  let selectedPreset = $state<string | null>(null);

  // Generate random configuration
  function randomize() {
    selectedPreset = null;
    currentPattern = patterns[Math.floor(Math.random() * patterns.length)];
    currentCharacters = charsetOptions[Math.floor(Math.random() * charsetOptions.length)].value;
    currentColor = colorOptions[Math.floor(Math.random() * colorOptions.length)].value;
    currentOpacity = 0.2 + Math.random() * 0.5;
    currentSpeed = 0.2 + Math.random() * 0.8;
    currentFrequency = 0.02 + Math.random() * 0.08;
    currentAmplitude = 0.5 + Math.random() * 0.8;
  }

  // Apply a preset
  function applyPreset(name: string) {
    selectedPreset = name;
    const preset = PRESETS[name];
    if (preset) {
      currentPattern = preset.pattern as PatternType;
      currentCharacters = preset.characters;
      currentOpacity = preset.opacity;
      currentSpeed = preset.speed;
      currentFrequency = preset.frequency;
      currentAmplitude = preset.amplitude;
    }
  }
</script>

<div class="max-w-6xl mx-auto px-4 py-8">
  <!-- Hero Section -->
  <section class="text-center mb-12">
    <h1 class="text-4xl sm:text-5xl font-bold mb-4">
      <span class="text-grove-500">Gossamer</span> Demo
    </h1>
    <p class="text-lg text-[var(--color-foreground-muted)] max-w-2xl mx-auto">
      Threads of light. Delicate ASCII textures woven through your space.
      Click <strong>Random</strong> to explore different patterns and configurations.
    </p>
  </section>

  <!-- Main Demo Area -->
  <div class="grid lg:grid-cols-3 gap-6 mb-12">
    <!-- Pattern Preview -->
    <div class="lg:col-span-2">
      <div class="glass-card p-1 relative overflow-hidden" style="min-height: 400px;">
        <div class="absolute inset-0 bg-bark-900/80 dark:bg-bark-900/90 rounded-xl"></div>
        <GossamerClouds
          pattern={currentPattern}
          characters={currentCharacters}
          color={currentColor}
          opacity={currentOpacity}
          speed={currentSpeed}
          frequency={currentFrequency}
          amplitude={currentAmplitude}
          animated={isAnimated}
          fps={60}
          cellSize={12}
        />
        <div class="absolute bottom-4 left-4 right-4 flex items-center justify-between">
          <span class="text-xs text-white/60 font-mono bg-black/30 px-2 py-1 rounded">
            {currentPattern} | {currentCharacters.trim().slice(0, 8)}...
          </span>
          <button
            onclick={() => isAnimated = !isAnimated}
            class="p-2 rounded-lg bg-black/30 text-white/80 hover:bg-black/50 transition-colors"
            aria-label={isAnimated ? 'Pause animation' : 'Play animation'}
          >
            {#if isAnimated}
              <Pause class="w-4 h-4" />
            {:else}
              <Play class="w-4 h-4" />
            {/if}
          </button>
        </div>
      </div>

      <!-- Random Button -->
      <div class="mt-4 flex gap-3">
        <button onclick={randomize} class="btn-primary flex items-center gap-2 flex-1">
          <Shuffle class="w-5 h-5" />
          Random Pattern
        </button>
      </div>
    </div>

    <!-- Controls -->
    <div class="space-y-4">
      <!-- Presets -->
      <div class="glass-card p-4">
        <h3 class="font-semibold mb-3 flex items-center gap-2">
          <Info class="w-4 h-4 text-grove-500" />
          Presets
        </h3>
        <div class="grid grid-cols-2 gap-2 max-h-48 overflow-y-auto">
          {#each presetNames as name}
            <button
              onclick={() => applyPreset(name)}
              class="text-xs px-2 py-1.5 rounded border transition-colors text-left truncate {selectedPreset === name ? 'bg-grove-500/20 border-grove-500 text-grove-500' : 'border-[var(--color-border)] hover:border-grove-400'}"
            >
              {name}
            </button>
          {/each}
        </div>
      </div>

      <!-- Pattern Type -->
      <div class="glass-card p-4">
        <h3 class="font-semibold mb-3">Pattern</h3>
        <select
          bind:value={currentPattern}
          onchange={() => selectedPreset = null}
          class="w-full p-2 rounded border border-[var(--color-border)] bg-transparent"
        >
          {#each patterns as p}
            <option value={p}>{p}</option>
          {/each}
        </select>
      </div>

      <!-- Character Set -->
      <div class="glass-card p-4">
        <h3 class="font-semibold mb-3">Characters</h3>
        <select
          bind:value={currentCharacters}
          onchange={() => selectedPreset = null}
          class="w-full p-2 rounded border border-[var(--color-border)] bg-transparent"
        >
          {#each charsetOptions as opt}
            <option value={opt.value}>{opt.name}</option>
          {/each}
        </select>
      </div>

      <!-- Color -->
      <div class="glass-card p-4">
        <h3 class="font-semibold mb-3">Color</h3>
        <div class="flex gap-2 flex-wrap">
          {#each colorOptions as opt}
            <button
              onclick={() => { currentColor = opt.value; selectedPreset = null; }}
              class="w-8 h-8 rounded-full border-2 transition-transform hover:scale-110 {currentColor === opt.value ? 'border-white ring-2 ring-grove-500' : 'border-transparent'}"
              style="background-color: {opt.value};"
              title={opt.name}
            ></button>
          {/each}
        </div>
      </div>

      <!-- Sliders -->
      <div class="glass-card p-4 space-y-4">
        <label class="block">
          <span class="text-sm flex justify-between mb-1">
            <span>Opacity</span>
            <span class="text-[var(--color-foreground-muted)]">{currentOpacity.toFixed(2)}</span>
          </span>
          <input
            type="range"
            bind:value={currentOpacity}
            oninput={() => selectedPreset = null}
            min="0.05"
            max="1"
            step="0.05"
            class="w-full accent-grove-500"
          />
        </label>
        <label class="block">
          <span class="text-sm flex justify-between mb-1">
            <span>Speed</span>
            <span class="text-[var(--color-foreground-muted)]">{currentSpeed.toFixed(2)}</span>
          </span>
          <input
            type="range"
            bind:value={currentSpeed}
            oninput={() => selectedPreset = null}
            min="0.1"
            max="2"
            step="0.1"
            class="w-full accent-grove-500"
          />
        </label>
        <label class="block">
          <span class="text-sm flex justify-between mb-1">
            <span>Frequency</span>
            <span class="text-[var(--color-foreground-muted)]">{currentFrequency.toFixed(3)}</span>
          </span>
          <input
            type="range"
            bind:value={currentFrequency}
            oninput={() => selectedPreset = null}
            min="0.01"
            max="0.15"
            step="0.005"
            class="w-full accent-grove-500"
          />
        </label>
        <label class="block">
          <span class="text-sm flex justify-between mb-1">
            <span>Amplitude</span>
            <span class="text-[var(--color-foreground-muted)]">{currentAmplitude.toFixed(2)}</span>
          </span>
          <input
            type="range"
            bind:value={currentAmplitude}
            oninput={() => selectedPreset = null}
            min="0.2"
            max="1.5"
            step="0.1"
            class="w-full accent-grove-500"
          />
        </label>
      </div>
    </div>
  </div>

  <!-- Pattern Gallery -->
  <section>
    <h2 class="text-2xl font-bold mb-6">Pattern Gallery</h2>
    <div class="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {#each patterns as p}
        <button
          onclick={() => { currentPattern = p; selectedPreset = null; }}
          class="pattern-card glass-card group cursor-pointer"
        >
          <div class="absolute inset-0 bg-bark-900/80"></div>
          <GossamerClouds
            pattern={p}
            characters={CHARACTER_SETS['glass-mist'].characters}
            color={GROVE_COLORS.grove}
            opacity={0.5}
            speed={0.5}
            frequency={0.04}
            amplitude={0.8}
            animated={true}
            fps={30}
            cellSize={10}
          />
          <div class="absolute inset-0 flex items-end justify-center pb-3">
            <span class="text-sm font-medium text-white/90 bg-black/40 px-3 py-1 rounded-full group-hover:bg-grove-500/80 transition-colors">
              {p}
            </span>
          </div>
        </button>
      {/each}
    </div>
  </section>
</div>
