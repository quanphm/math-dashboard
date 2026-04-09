---
AI_CONTEXT: true
LAST_UPDATED: 2026-04-10
PARENT: root AGENTS.md
---

# Dashboard App (@math/dashboard)

## Stack
- **Framework:** Vite + React 19
- **Router:** TanStack Router (file-based routing)
- **State:** TanStack Query (React Query)
- **Forms:** TanStack Form
- **Auth:** Better Auth (React client)
- **DevTools:** TanStack Router Devtools, React Query Devtools

## File-based Routing
Routes are defined by files in `src/routes/`:
- `src/routes/__root.tsx` - Root layout
- `src/routes/index.tsx` - Home page (`/`)
- `src/routes/about.tsx` - About page (`/about`)

The `routeTree.gen.ts` is auto-generated - do not edit manually.

## Query Client Configuration
Located in `src/lib/query-client.ts`:
- `staleTime: 86_400_000` (24 hours)
- `refetchOnWindowFocus: true`
- `retry: 2`

## Path Alias
```json
{
  "imports": {
    "#app/*": "./src/*"
  }
}
```

## Better Auth Client
Located in `src/lib/auth-client.ts`:
```typescript
import { useSession, signIn, signOut, signUp } from "#app/lib/auth-client.ts";

// Use in components
const { data: session } = useSession();
```

## Adding New Routes
1. Create file in `src/routes/` following TanStack Router conventions
2. Dev server will auto-generate `routeTree.gen.ts`
3. Import from `#app/routes/[file]` if needed

## Important Notes
- Auth client connects to `PUBLIC_API_URL` (set in .env)
- CORS is configured on the API to allow dashboard origin
- TanStack Devtools are enabled in development
