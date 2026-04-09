---
AI_CONTEXT: true
LAST_UPDATED: 2026-04-10
PARENT: root AGENTS.md
---

# API App (@math/api)

## Stack
- **Framework:** Hono
- **ORM:** Drizzle ORM with PostgreSQL
- **Auth:** Better Auth (with Drizzle adapter)
- **Cache:** Redis (ioredis)
- **Validation:** Zod + @hono/zod-validator
- **Docs:** OpenAPI (hono-openapi + Scalar)

## Path Alias
```json
{
  "imports": {
    "#api/*": "./src/*"
  }
}
```

## Database
- Schema defined in `src/db/schema.ts`
- Migrations in `./migrations/`
- Drizzle config in `drizzle.config.ts`

## Better Auth Configuration
- **Server config:** `src/lib/auth.ts`
- **Middleware:** `src/middlewares/user-session.ts` - attaches user/session to context
- **Routes:** `src/modules/auth.ts` - mounts auth handlers at `/api/auth/*`
- **Tables:** user, session, account, verification (in schema.ts)

## Environment Variables
Required in `apps/api/.env`:
```
AUTH_SECRET=<32-char-secret>
AUTH_URL=http://localhost:4000
PUBLIC_API_URL=http://localhost:4000
# Database credentials...
```

## Scripts
```bash
bun run dev               # Start dev server with watch
bun run db:generate       # Generate Drizzle migrations
bun run db:migrate        # Run pending migrations
bun run auth:migrate      # Generate Better Auth schema (if needed)
bun run build             # Build for production
```

## Important Notes
- Auth routes have CORS enabled for `PUBLIC_APP_BASE_URL`
- Use `trustedOrigins` in auth config for cross-origin requests
- Session middleware attaches `user` and `session` to Hono context
