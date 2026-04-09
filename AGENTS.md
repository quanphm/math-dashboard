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

# Database operations (in apps/api/)
bun run db:generate       # Generate migrations
bun run db:migrate        # Run migrations
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

## API App (@math/api)

### Stack
- **Framework:** Hono
- **ORM:** Drizzle ORM with PostgreSQL
- **Auth:** Better Auth
- **Cache:** Redis (ioredis)
- **Validation:** Zod + @hono/zod-validator
- **Docs:** OpenAPI (hono-openapi + Scalar)

### Path Alias
```json
{
  "imports": {
    "#api/*": "./src/*"
  }
}
```

### Database
- Schema defined in `src/db/schema.ts`
- Migrations in `./migrations/`
- Drizzle config in `drizzle.config.ts`

### Scripts
```bash
cd apps/api
bun run dev               # Start dev server with watch
bun run db:generate       # Generate Drizzle migrations
bun run db:migrate        # Run pending migrations
bun run build             # Build for production
```

## Dashboard App (@math/dashboard)

### Stack
- **Framework:** Vite + React 19
- **Router:** TanStack Router (file-based routing)
- **State:** TanStack Query (React Query)
- **Forms:** TanStack Form
- **DevTools:** TanStack Router Devtools, React Query Devtools

### File-based Routing
Routes are defined by files in `src/routes/`:
- `src/routes/__root.tsx` - Root layout
- `src/routes/index.tsx` - Home page (`/`)
- `src/routes/about.tsx` - About page (`/about`)

The `routeTree.gen.ts` is auto-generated - do not edit manually.

### Query Client Configuration
Located in `src/lib/query-client.ts`:
- `staleTime: 86_400_000` (24 hours)
- `refetchOnWindowFocus: true`
- `retry: 2`

### Path Alias
```json
{
  "imports": {
    "#app/*": "./src/*"
  }
}
```

### Adding New Routes
1. Create file in `src/routes/` following TanStack Router conventions
2. Dev server will auto-generate `routeTree.gen.ts`
3. Import from `#app/routes/[file]` if needed

## UI Package (@math/ui)

- **Style:** Base UI + shadcn/ui (base-lyra theme)
- **Exports:**
  - `@math/ui/components/*` - UI components
  - `@math/ui/lib/*` - Utilities (cn, etc.)
  - `@math/ui/globals.css` - Global styles
  - `@math/ui/hooks/*` - Hooks (use-mobile)
- **Current components:** button, input, separator, sheet, sidebar, skeleton, sonner, tooltip

### Adding Components
```bash
cd packages/ui && npx shadcn add <component>
```

## Common Package (@math/common)

Shared utilities for the monorepo.

### Path Alias
```json
{
  "imports": {
    "#common/*": "./src/*"
  }
}
```

### Exports
- `@math/common/http-status` - HTTP status codes and reason phrases
- `@math/common/generate-id` - ID generation utilities
- `@math/common/io` - I/O utilities
- `@math/common/slugify` - Slug generation
- `@math/common/standard-validate` - Standard schema validation
- `@math/common/datetime` - Date/time utilities
- `@math/common/noop` - No-op function

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
