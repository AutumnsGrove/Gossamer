#!/usr/bin/env npx tsx
/**
 * Gossamer GIF Export Tool
 *
 * Exports Gossamer patterns as animated GIFs for testing and preview.
 * Run with: npx tsx scripts/export-gif.ts [options]
 *
 * Examples:
 *   npx tsx scripts/export-gif.ts --pattern perlin --chars standard
 *   npx tsx scripts/export-gif.ts --pattern waves --duration 3 --fps 20
 *   npx tsx scripts/export-gif.ts --pattern ripple --width 400 --height 300
 *   npx tsx scripts/export-gif.ts --all  # Generate all patterns
 */

import { createCanvas, type Canvas, type CanvasRenderingContext2D } from 'canvas';
import GIFEncoder from 'gif-encoder-2';
import * as fs from 'fs';
import * as path from 'path';

// Import from source (relative paths since we're in scripts/)
import { generateBrightnessGrid, type PatternType, type PatternConfig } from '../src/patterns.js';
import { CHARACTER_SETS, getCharacters } from '../src/characters.js';

/**
 * Generate a random 4-digit hex hash for unique filenames
 */
function generateHash(): string {
  return Math.floor(Math.random() * 0xffff)
    .toString(16)
    .padStart(4, '0');
}

interface ExportOptions {
  pattern: PatternType;
  characters: string;
  width: number;
  height: number;
  cellWidth: number;
  cellHeight: number;
  fps: number;
  duration: number;
  color: string;
  backgroundColor: string;
  fontFamily: string;
  outputDir: string;
  filename?: string;
  patternConfig: PatternConfig;
}

const DEFAULT_OPTIONS: ExportOptions = {
  pattern: 'perlin',
  characters: CHARACTER_SETS.standard.characters,
  width: 320,
  height: 240,
  cellWidth: 8,
  cellHeight: 12,
  fps: 15,
  duration: 2,
  color: '#ffffff',
  backgroundColor: '#000000',
  fontFamily: 'monospace',
  outputDir: './output',
  patternConfig: {
    frequency: 0.05,
    amplitude: 1.0,
    speed: 0.5,
  },
};

/**
 * Simple ASCII renderer for node-canvas
 */
function renderFrame(
  ctx: CanvasRenderingContext2D,
  grid: number[][],
  options: ExportOptions
): void {
  const { characters, cellWidth, cellHeight, color, backgroundColor } = options;

  // Clear with background
  ctx.fillStyle = backgroundColor;
  ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);

  // Set text properties
  ctx.fillStyle = color;
  ctx.font = `${cellHeight}px ${options.fontFamily}`;
  ctx.textBaseline = 'top';

  // Render characters
  for (let row = 0; row < grid.length; row++) {
    for (let col = 0; col < grid[row].length; col++) {
      const brightness = grid[row][col];
      const charIndex = Math.floor((brightness / 255) * (characters.length - 1));
      const char = characters[Math.min(charIndex, characters.length - 1)];

      if (char !== ' ') {
        ctx.fillText(char, col * cellWidth, row * cellHeight);
      }
    }
  }
}

/**
 * Export a single pattern as GIF
 */
async function exportGif(options: ExportOptions): Promise<string> {
  const { width, height, cellWidth, cellHeight, fps, duration, pattern, outputDir, filename } =
    options;

  // Calculate grid dimensions
  const cols = Math.ceil(width / cellWidth);
  const rows = Math.ceil(height / cellHeight);
  const totalFrames = Math.ceil(fps * duration);

  console.log(`\n📽️  Exporting ${pattern} pattern...`);
  console.log(`   Canvas: ${width}x${height}px`);
  console.log(`   Grid: ${cols}x${rows} cells`);
  console.log(`   Frames: ${totalFrames} @ ${fps}fps (${duration}s)`);

  // Create canvas
  const canvas = createCanvas(width, height);
  const ctx = canvas.getContext('2d');

  // Create GIF encoder
  const encoder = new GIFEncoder(width, height, 'neuquant', true);
  encoder.setDelay(Math.floor(1000 / fps));
  encoder.setQuality(10);

  // Ensure output directory exists
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  // Output filename with unique hash prefix
  const hash = generateHash();
  const charSetName =
    Object.entries(CHARACTER_SETS).find(([_, v]) => v.characters === options.characters)?.[0] ||
    'custom';
  const outputFilename = filename || `${hash}-gossamer-${pattern}-${charSetName}.gif`;
  const outputPath = path.join(outputDir, outputFilename);
  const writeStream = fs.createWriteStream(outputPath);

  encoder.createReadStream().pipe(writeStream);
  encoder.start();

  // Generate and encode frames
  for (let frame = 0; frame < totalFrames; frame++) {
    const time = (frame / fps) * options.patternConfig.speed;
    const grid = generateBrightnessGrid(cols, rows, pattern, time, options.patternConfig);
    renderFrame(ctx, grid, options);
    encoder.addFrame(ctx as unknown as CanvasRenderingContext2D);

    // Progress indicator
    if (frame % Math.ceil(totalFrames / 10) === 0) {
      process.stdout.write(`   Progress: ${Math.round((frame / totalFrames) * 100)}%\r`);
    }
  }

  encoder.finish();

  // Wait for write to complete
  await new Promise<void>((resolve) => writeStream.on('finish', resolve));

  console.log(`   ✅ Saved: ${outputPath}`);
  return outputPath;
}

/**
 * Export all pattern/character combinations
 */
async function exportAll(baseOptions: ExportOptions): Promise<string[]> {
  const patterns: PatternType[] = ['perlin', 'fbm', 'waves', 'ripple', 'static'];
  const charSets = ['standard', 'blocks', 'grove', 'dots', 'minimal'];
  const outputs: string[] = [];

  console.log('\n🎬 Exporting all pattern variations...\n');

  // Generate a single hash for this batch run
  const batchHash = generateHash();

  for (const pattern of patterns) {
    for (const charSet of charSets) {
      const characters = getCharacters(charSet);
      const filename = `${batchHash}-gossamer-${pattern}-${charSet}.gif`;
      const outputPath = await exportGif({
        ...baseOptions,
        pattern,
        characters,
        filename,
      });
      outputs.push(outputPath);
    }
  }

  console.log(`\n✨ Generated ${outputs.length} GIFs in ${baseOptions.outputDir}/`);
  return outputs;
}

/**
 * Parse command line arguments
 */
function parseArgs(): ExportOptions & { all: boolean } {
  const args = process.argv.slice(2);
  const options = { ...DEFAULT_OPTIONS, all: false };

  for (let i = 0; i < args.length; i++) {
    const arg = args[i];
    const nextArg = args[i + 1];

    switch (arg) {
      case '--pattern':
      case '-p':
        if (nextArg && ['perlin', 'fbm', 'waves', 'ripple', 'static'].includes(nextArg)) {
          options.pattern = nextArg as PatternType;
          i++;
        }
        break;

      case '--chars':
      case '-c':
        if (nextArg) {
          options.characters = getCharacters(nextArg) || nextArg;
          i++;
        }
        break;

      case '--width':
      case '-w':
        if (nextArg) {
          options.width = parseInt(nextArg, 10);
          i++;
        }
        break;

      case '--height':
      case '-h':
        if (nextArg && !nextArg.startsWith('-')) {
          options.height = parseInt(nextArg, 10);
          i++;
        }
        break;

      case '--fps':
        if (nextArg) {
          options.fps = parseInt(nextArg, 10);
          i++;
        }
        break;

      case '--duration':
      case '-d':
        if (nextArg) {
          options.duration = parseFloat(nextArg);
          i++;
        }
        break;

      case '--color':
        if (nextArg) {
          options.color = nextArg;
          i++;
        }
        break;

      case '--bg':
        if (nextArg) {
          options.backgroundColor = nextArg;
          i++;
        }
        break;

      case '--output':
      case '-o':
        if (nextArg) {
          options.outputDir = nextArg;
          i++;
        }
        break;

      case '--frequency':
        if (nextArg) {
          options.patternConfig.frequency = parseFloat(nextArg);
          i++;
        }
        break;

      case '--amplitude':
        if (nextArg) {
          options.patternConfig.amplitude = parseFloat(nextArg);
          i++;
        }
        break;

      case '--speed':
        if (nextArg) {
          options.patternConfig.speed = parseFloat(nextArg);
          i++;
        }
        break;

      case '--all':
      case '-a':
        options.all = true;
        break;

      case '--help':
        printHelp();
        process.exit(0);
    }
  }

  return options;
}

/**
 * Print help message
 */
function printHelp(): void {
  console.log(`
╔═══════════════════════════════════════════════════════════════╗
║              🌸 Gossamer GIF Export Tool 🌸                   ║
╚═══════════════════════════════════════════════════════════════╝

Export Gossamer ASCII patterns as animated GIFs for testing.

USAGE:
  npx tsx scripts/export-gif.ts [options]

OPTIONS:
  --pattern, -p <type>    Pattern type: perlin, fbm, waves, ripple, static
                          (default: perlin)

  --chars, -c <set>       Character set: standard, dense, minimal, grove,
                          dots, blocks, lines, stars, nature, weather,
                          binary, math (default: standard)

  --width, -w <px>        Canvas width in pixels (default: 320)
  --height, -h <px>       Canvas height in pixels (default: 240)

  --fps <number>          Frames per second (default: 15)
  --duration, -d <sec>    Animation duration in seconds (default: 2)

  --color <hex>           Character color (default: #ffffff)
  --bg <hex>              Background color (default: #000000)

  --frequency <num>       Pattern frequency/scale (default: 0.05)
  --amplitude <num>       Pattern intensity 0-1 (default: 1.0)
  --speed <num>           Animation speed multiplier (default: 0.5)

  --output, -o <dir>      Output directory (default: ./output)
  --all, -a               Export all pattern/charset combinations
  --help                  Show this help message

EXAMPLES:
  # Basic export with defaults
  npx tsx scripts/export-gif.ts

  # Perlin noise with blocks characters
  npx tsx scripts/export-gif.ts --pattern perlin --chars blocks

  # Slower waves animation
  npx tsx scripts/export-gif.ts --pattern waves --speed 0.2 --duration 4

  # High-res ripple effect
  npx tsx scripts/export-gif.ts --pattern ripple --width 640 --height 480

  # Export ALL combinations (patterns × charsets)
  npx tsx scripts/export-gif.ts --all

  # Custom colors (green on black terminal style)
  npx tsx scripts/export-gif.ts --color "#00ff00" --bg "#000000"
`);
}

/**
 * Main entry point
 */
async function main(): Promise<void> {
  console.log(`
╔═══════════════════════════════════════════════════════════════╗
║              🌸 Gossamer GIF Export Tool 🌸                   ║
╚═══════════════════════════════════════════════════════════════╝
`);

  const options = parseArgs();

  try {
    if (options.all) {
      await exportAll(options);
    } else {
      await exportGif(options);
    }

    console.log('\n🎉 Export complete!\n');
  } catch (error) {
    console.error('\n❌ Export failed:', error);
    process.exit(1);
  }
}

main();
