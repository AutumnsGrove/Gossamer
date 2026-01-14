# Contributing to Gossamer

Thank you for your interest in contributing to Gossamer! This document provides guidelines and instructions for contributing.

## Code of Conduct

By participating in this project, you agree to abide by our [Code of Conduct](CODE_OF_CONDUCT.md). Please read it before contributing.

## Getting Started

### Prerequisites

- Node.js 20.10.0 or higher
- pnpm 8.0 or higher

### Setup

1. **Fork the repository** on GitHub

2. **Clone your fork**
   ```bash
   git clone https://github.com/YOUR_USERNAME/Gossamer.git
   cd Gossamer
   ```

3. **Install dependencies**
   ```bash
   pnpm install
   ```

4. **Build packages**
   ```bash
   pnpm build
   ```

5. **Run tests** to verify setup
   ```bash
   pnpm test
   ```

## Project Structure

```
Gossamer/
├── packages/
│   ├── core/              # @autumnsgrove/gossamer (vanilla TS)
│   │   ├── src/           # Source files
│   │   └── tests/         # Unit tests
│   └── svelte/            # @gossamer/svelte (Svelte 5 components)
│       ├── src/           # Components and presets
│       └── tests/         # Component tests
├── docs/                  # Documentation
├── examples/              # Usage examples
└── package.json           # Root monorepo config
```

## Development Workflow

### Running in Development Mode

```bash
# Watch all packages for changes
pnpm dev

# Build all packages
pnpm build

# Run tests
pnpm test

# Run tests with coverage
pnpm test:coverage

# Lint code
pnpm lint

# Format code
pnpm format
```

### Working with Packages

This is a monorepo using pnpm workspaces. Each package can be developed independently:

```bash
# Run commands in a specific package
pnpm --filter @autumnsgrove/gossamer test
pnpm --filter @gossamer/svelte build
```

## Making Changes

### Branch Naming

Create a branch from `main` with a descriptive name:

- `feature/add-new-preset` - New features
- `fix/animation-memory-leak` - Bug fixes
- `docs/update-api-reference` - Documentation updates
- `refactor/simplify-renderer` - Code refactoring
- `test/add-border-tests` - Test additions

### Commit Messages

We use [Conventional Commits](https://www.conventionalcommits.org/). Format:

```
<type>: <description>

[optional body]

[optional footer]
```

**Types:**

| Type | Description |
|------|-------------|
| `feat` | New feature |
| `fix` | Bug fix |
| `docs` | Documentation changes |
| `style` | Formatting (no code change) |
| `refactor` | Code restructuring |
| `test` | Adding/updating tests |
| `chore` | Maintenance tasks |
| `perf` | Performance improvements |

**Examples:**

```bash
feat: add ripple pattern generator

fix: resolve memory leak in animation loop

docs: update GossamerClouds props documentation

test: add unit tests for character set validation
```

### Code Style

- **TypeScript** - Strict mode enabled
- **Formatting** - Prettier (run `pnpm format`)
- **Linting** - ESLint with TypeScript rules

Before committing:

```bash
pnpm format
pnpm lint
```

## Testing

### Running Tests

```bash
# All tests
pnpm test

# Watch mode
pnpm test -- --watch

# Specific package
pnpm --filter @autumnsgrove/gossamer test

# With coverage
pnpm test:coverage
```

### Writing Tests

We use [Vitest](https://vitest.dev/) for testing. Tests go in `tests/` directories within each package.

```typescript
// Example: packages/core/tests/patterns.test.ts
import { describe, it, expect } from 'vitest';
import { perlinNoise2D } from '../src/patterns';

describe('perlinNoise2D', () => {
  it('returns values between -1 and 1', () => {
    const value = perlinNoise2D(0.5, 0.5);
    expect(value).toBeGreaterThanOrEqual(-1);
    expect(value).toBeLessThanOrEqual(1);
  });
});
```

## Pull Request Process

1. **Create your branch** from `main`
   ```bash
   git checkout -b feature/your-feature
   ```

2. **Make your changes** with tests

3. **Ensure all checks pass**
   ```bash
   pnpm format
   pnpm lint
   pnpm test
   pnpm build
   ```

4. **Commit your changes** using conventional commits

5. **Push to your fork**
   ```bash
   git push origin feature/your-feature
   ```

6. **Open a Pull Request** on GitHub
   - Use a clear, descriptive title
   - Reference any related issues
   - Describe your changes

7. **Address review feedback**

### PR Checklist

- [ ] Tests added/updated for changes
- [ ] Documentation updated if needed
- [ ] All tests pass (`pnpm test`)
- [ ] Code formatted (`pnpm format`)
- [ ] Linting passes (`pnpm lint`)
- [ ] Build succeeds (`pnpm build`)

## Reporting Bugs

Open an issue on GitHub with:

- **Clear title** describing the bug
- **Steps to reproduce**
- **Expected behavior**
- **Actual behavior**
- **Environment** (browser, OS, package versions)
- **Code sample** if applicable

## Requesting Features

Open an issue with the "enhancement" label:

- **Clear title** describing the feature
- **Use case** - Why is this useful?
- **Proposed solution** if you have one
- **Alternatives considered**

## Questions?

- Open a [Discussion](https://github.com/AutumnsGrove/Gossamer/discussions) on GitHub
- Check existing issues and discussions first

---

Thank you for contributing to Gossamer!
