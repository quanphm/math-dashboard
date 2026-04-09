---
AI_CONTEXT: true
LAST_UPDATED: 2026-04-10
PARENT: root AGENTS.md
---

# UI Package (@math/ui)

## Style
- Base UI + shadcn/ui (base-lyra theme)
- Tailwind CSS v4 with CSS variables

## Exports
- `@math/ui/components/*` - UI components
- `@math/ui/lib/*` - Utilities (cn, etc.)
- `@math/ui/globals.css` - Global styles
- `@math/ui/hooks/*` - Hooks (use-mobile)

## Current Components
- button
- input
- separator
- sheet
- sidebar
- skeleton
- sonner
- tooltip

## Adding Components
```bash
cd packages/ui && npx shadcn add <component>
```

## Path Alias (Internal)
```json
{
  "imports": {
    "#ui/*": "./src/*"
  }
}
```

## Important Notes
- Components use Base UI primitives (not Radix)
- Theme is `base-lyra` from shadcn/ui
- Import from `@math/ui/components/[name].tsx` in apps
