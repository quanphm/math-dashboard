---
AI_CONTEXT: true
LAST_UPDATED: 2026-04-10
TECH_STACK: Bun, Turborepo, React 19, Hono, Drizzle ORM, TanStack Router, TanStack Query, Vite, OXC
---

# AGENTS.md

## Quick Reference

### Essential Commands

```bash
# Install dependencies
bun install --ignore-scripts

# Start development (runs apps in parallel via turbo)
bun dev

# Code quality
bun run lint              # oxlint
bun run lint:fix          # oxlint --fix
bun run format            # oxfmt --write .
bun run format:check      # oxfmt --check .

# Build all packages
bun run build
```

### Monorepo Structure

```
├── apps/
│   ├── api/              # Hono backend with Drizzle ORM + Better Auth
│   └── dashboard/        # React frontend with TanStack Router + Query
├── packages/
│   ├── common/           # Shared utilities (@math/common)
│   ├── tsconfig/         # Shared TypeScript configurations
│   └── ui/               # UI component library (@math/ui)
└── package.json          # Workspace root with catalog dependencies
```

## Critical Constraints

### Path Aliases
- **Apps:** Use `"#app/*"` or `"#api/*"` pattern (configured in each app's package.json)
- **Packages:** Use `"@math/<name>/*"` (e.g., `"@math/ui/components/*"`, `"@math/common/*"`)

### Import Rules
- **Include file extensions:** `import { Button } from "./button.tsx"` (Bun requirement)
- **No relative parent imports:** Use path aliases instead of `../../`

### Generated Files to Ignore
- `**/routeTree.gen.ts` (TanStack Router - auto-generated)
- `**/dist/**`, `**/build/**`, `**/.output/**`
- `**/migrations/**` (Drizzle ORM migrations)

## Tooling Configuration

### OXC (Linting & Formatting)

**Linter** (`.oxlintrc.json`):
- Plugins: react, typescript, jsx-a11y, import
- `typescript/no-explicit-any`: off (allowed)
- `correctness`: error, `suspicious`: warn

**Formatter** (`.oxfmtrc.json`):
- Tabs, 2-space width, print width: 100
- Import sorting with TanStack priority group
- Tailwind class sorting for `cn`, `clsx`, `cva`

### VS Code
- Default formatter: `oxc.oxc-vscode`
- Format on save enabled
- Generated files marked read-only

## Package Catalog

Dependencies managed via workspace catalog in root `package.json`:

```json
{
  "react": "^19.2.4",
  "react-dom": "^19.2.4",
  "@types/react": "^19.2.14",
  "zod": "^4.3.6",
  "hono": "^4.12.3",
  "better-auth": "^1.6.2",
  "tailwindcss": "^4.2.2"
}
```

Use `"catalog:"` in package.json to reference:
```json
"dependencies": {
  "react": "catalog:"
}
```

## Current State

- **apps/api/** - Initialized with Hono + Drizzle ORM + Better Auth
- **apps/dashboard/** - Initialized with TanStack Router + Query + Vite
- **packages/common/** - Shared utilities (http-status, generate-id, slugify, etc.)
- **packages/ui/** - Has 8 UI components

## Turbo Tasks

```json
{
  "build": { "dependsOn": ["^build"] },
  "dev": { "cache": false, "persistent": true },
  "lint": {},
  "format": {}
}
```

Run with: `turbo run <task> --filter=<package>`

---

*For app-specific and package-specific instructions, see the respective `AGENTS.md` files in `apps/*/` and `packages/*/` directories.*
