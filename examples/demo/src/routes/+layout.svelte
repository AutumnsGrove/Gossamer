<script lang="ts">
  import '../app.css';
  import { ThemeToggle, Footer, themeStore } from '@autumnsgrove/groveengine/ui/chrome';
  import { Sparkles, Github, ExternalLink } from 'lucide-svelte';

  let { children } = $props();
</script>

<div class="min-h-screen flex flex-col">
  <!-- Header -->
  <header class="sticky top-0 z-50 backdrop-blur-md bg-[var(--color-background)]/80 border-b border-[var(--color-border)]">
    <div class="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
      <a href="/" class="flex items-center gap-2 hover:opacity-80 transition-opacity">
        <Sparkles class="w-6 h-6 text-grove-500" />
        <span class="text-xl font-semibold">Gossamer</span>
        <span class="text-xs text-[var(--color-foreground-muted)] hidden sm:inline">Demo</span>
      </a>

      <nav class="flex items-center gap-4">
        <a
          href="https://github.com/autumnsgrove/gossamer"
          target="_blank"
          rel="noopener noreferrer"
          class="flex items-center gap-1 text-sm text-[var(--color-foreground-muted)] hover:text-[var(--color-foreground)] transition-colors"
        >
          <Github class="w-4 h-4" />
          <span class="hidden sm:inline">GitHub</span>
        </a>
        <ThemeToggle />
      </nav>
    </div>
  </header>

  <!-- Main Content -->
  <main class="flex-1">
    {@render children()}
  </main>

  <!-- Footer -->
  <footer class="border-t border-[var(--color-border)] py-6 mt-auto">
    <div class="max-w-6xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-[var(--color-foreground-muted)]">
      <p>
        <span class="text-grove-500">Gossamer</span> - ASCII visual effects for the web
      </p>
      <div class="flex items-center gap-4">
        <a
          href="https://autumnsgrove.com"
          target="_blank"
          rel="noopener noreferrer"
          class="flex items-center gap-1 hover:text-[var(--color-foreground)] transition-colors"
        >
          Autumn's Grove
          <ExternalLink class="w-3 h-3" />
        </a>
      </div>
    </div>
  </footer>
</div>
