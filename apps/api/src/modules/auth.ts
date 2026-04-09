import { auth } from "#api/lib/auth.ts";
import { createHonoInstance } from "#api/lib/create-app.ts";
import { cors } from "hono/cors";

export function authModule() {
	const app = createHonoInstance();

	// Enable CORS for auth routes
	app.use(
		cors({
			origin: process.env.PUBLIC_APP_BASE_URL!,
			allowMethods: ["GET", "POST", "OPTIONS"],
			allowHeaders: ["Content-Type", "Authorization"],
			credentials: true,
		}),
	);

	// Mount Better Auth handlers
	app.on(["POST", "GET"], "/auth/**", (c) => {
		return auth.handler(c.req.raw);
	});

	return app;
}
