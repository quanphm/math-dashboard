---
AI_CONTEXT: true
LAST_UPDATED: 2026-04-10
PARENT: root AGENTS.md
---

# Common Package (@math/common)

Shared utilities for the monorepo.

## Path Alias (Internal)
```json
{
  "imports": {
    "#common/*": "./src/*"
  }
}
```

## Exports
- `@math/common/http-status` - HTTP status codes and reason phrases
- `@math/common/generate-id` - ID generation utilities
- `@math/common/io` - I/O utilities
- `@math/common/slugify` - Slug generation
- `@math/common/standard-validate` - Standard schema validation
- `@math/common/datetime` - Date/time utilities
- `@math/common/noop` - No-op function

## Important Notes
- Use `@math/common/[export]` when importing from other packages/apps
- Keep utilities framework-agnostic (no React/Node-specific code)
